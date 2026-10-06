const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const crypto = require("crypto");

const SOURCE = path.join(__dirname, "../data/announcements-source.md");
const OUTPUT = path.join(__dirname, "../data/announcements.json");
const CACHE = path.join(__dirname, "../data/announcements-cache.json");
// One-language fixes made by hand on the Post page: { id: { lang: { title, content, by, at } } }
const FIXES = path.join(__dirname, "../data/announcements-fixes.json");
const TERMS_PATH = path.join(__dirname, "../data/terms.js");
const TERM_LANGS = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar", "es"];

function loadTerms() {
  const src = fs.readFileSync(TERMS_PATH, "utf8");
  const sandbox = {};
  new Function("exports", src + "\nexports.TERMS = TERMS;")(sandbox);
  return sandbox.TERMS;
}

function buildGlossaryText(TERMS) {
  const lines = [];
  let skipped = 0;
  for (const group of TERMS) {
    if (!group || !Array.isArray(group.rows)) continue;
    for (const row of group.rows) {
      if (!Array.isArray(row)) { skipped++; continue; }
      const [en, ...rest] = row;
      const pairs = TERM_LANGS.slice(1).map((c, i) => `${c}:${rest[i]}`).filter(p => !p.endsWith(":—"));
      const note = row.length > TERM_LANGS.length ? ` (note: ${row[row.length - 1]})` : "";
      lines.push(`${en} → ${pairs.join(", ")}${note}`);
    }
  }
  if (skipped > 0) console.warn(`跳過了 ${skipped} 筆格式不符的對照表項目`);
  return lines.join("\n");
}

function parseEntries(md) {
  return md.split(/^---$/m).map(s => s.trim()).filter(Boolean).map(b => {
    const data = yaml.load(b);
    const id = crypto.createHash("sha1").update(JSON.stringify(data)).digest("hex").slice(0, 10);
    return { id, ...data };
  });
}

const MODELS = [
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

async function callGemini(entry, systemPrompt) {
  const errors = [];
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: entry.content }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );
      const json = await res.json();
      if (res.ok) {
        console.log(`使用模型：${model}`);
        return json;
      }
      if (res.status === 503 && attempt < 3) {
        console.warn(`${model} 忙碌中 (503)，${attempt * 5} 秒後重試...`);
        await new Promise(r => setTimeout(r, attempt * 5000));
        continue;
      }
      if (res.status === 429 || res.status === 404 || res.status === 503) {
        console.warn(`${model} 無法使用 (HTTP ${res.status})，改用下一個模型`);
        errors.push(`${model}: ${res.status}`);
        break;
      }
      throw new Error(`Gemini API 回傳錯誤 (${model}, HTTP ${res.status}): ${JSON.stringify(json)}`);
    }
  }
  throw new Error(`所有模型都無法使用：${errors.join(", ")}`);
}

async function translateOne(entry, glossaryText) {
  const targetLangs = TERM_LANGS.filter(l => l !== entry.lang);
  const systemPrompt = `你是 Kingshot 聯盟公告的翻譯員。將公告從 ${entry.lang} 翻成以下語言：${targetLangs.join(", ")}。
規則：
1. 人名（"(NNM)" 前的文字）絕對不要翻譯或更動
2. 遇到對照表列出的遊戲用語，一律使用官方譯名；沒列出的詞照字面翻譯
3. 公告裡出現的英雄名稱、活動代號（例如 KvK、Gen 3 等）如果不在下方對照表中，代表官方譯名尚未確認，一律保留英文原文，不要翻譯或音譯
4. 輸入是一個 JSON 物件 {"title": "...", "content": "..."}
5. 內文裡的標記一律原封不動照抄、位置不變：[[img:路徑]]、[[link:代號]]、{代號}（大括號內的英文代號）
6. 只回傳一個 JSON 物件，key 是語言代碼，value 是 {"title": "翻譯後標題", "content": "翻譯後內文"} 的物件，不要其他文字，不要 markdown 標記

對照表：
${glossaryText}`;

  const userInput = JSON.stringify({ title: entry.title || "", content: entry.content });
  const json = await callGemini({ ...entry, content: userInput }, systemPrompt);

  if (!json.candidates || !json.candidates[0]) {
    throw new Error(`Gemini API 回傳格式異常: ${JSON.stringify(json)}`);
  }

  const translations = JSON.parse(json.candidates[0].content.parts[0].text);

  // 保險：如果翻譯把圖片／指南按鈕標記弄丟了，就補回內文最後面
  const markers = (entry.content.match(/\[\[(?:img|link):[^\]]+\]\]/g) || []);
  for (const v of Object.values(translations)) {
    if (!v || typeof v.content !== "string") continue;
    for (const m of markers) if (!v.content.includes(m)) v.content = v.content.trimEnd() + "\n\n" + m;
  }
  translations[entry.lang] = { title: entry.title || "", content: entry.content };
  return translations;
}

async function main() {
  const rawEntries = parseEntries(fs.readFileSync(SOURCE, "utf8"));
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
  const glossaryText = buildGlossaryText(loadTerms());

  // 只翻譯快取裡還沒有的（也就是真正新增的）公告
for (const entry of rawEntries) {
  const cached = cache[entry.id];
  const hasAllLangs = cached && TERM_LANGS.every(l => cached.title && l in cached.title);
  if (hasAllLangs) continue;
  const result = await translateOne(entry, glossaryText);
  const titleMap = {};
  const contentMap = {};
  for (const [lang, v] of Object.entries(result)) {
    titleMap[lang] = v.title;
    contentMap[lang] = v.content;
  }
  cache[entry.id] = {
    author: entry.author,
    createdAt: entry.created || new Date().toISOString(),   // an edited announcement keeps its first date
    images: entry.images || [],
    links: entry.links || [],
    title: titleMap,
    content: contentMap,
  };
}

  // 清掉快取裡「來源檔案已經沒有了」的公告 → 這就是支援刪除的關鍵
  const currentIds = new Set(rawEntries.map(e => e.id));
  for (const id of Object.keys(cache)) {
    if (!currentIds.has(id)) delete cache[id];
  }

  // 輸出結果永遠依照來源檔案「目前實際存在」的內容重建，新的在最前面
  // 手動修正過的單一語言蓋在自動翻譯上面（快取裡仍保留自動翻譯，取消修正就會回來）
  let fixes = {};
  try { if (fs.existsSync(FIXES)) fixes = JSON.parse(fs.readFileSync(FIXES, "utf8") || "{}"); }
  catch (e) { console.warn("announcements-fixes.json 格式有誤，先略過手動修正"); }
  const published = rawEntries.slice().reverse().map(e => {
    const item = { id: e.id, ...cache[e.id] };
    const f = fixes[e.id];
    if (f && item.title && item.content) {
      item.title = { ...item.title }; item.content = { ...item.content }; item.fixed = {};
      for (const [lang, v] of Object.entries(f)) {
        if (!v) continue;
        if (typeof v.title === "string") item.title[lang] = v.title;
        if (typeof v.content === "string") item.content[lang] = v.content;
        item.fixed[lang] = v.by || "";
      }
    }
    return item;
  });

  fs.writeFileSync(OUTPUT, JSON.stringify(published, null, 2));
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
