const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const crypto = require("crypto");

const SOURCE = path.join(__dirname, "../data/announcements-source.md");
const OUTPUT = path.join(__dirname, "../data/announcements.json");
const CACHE = path.join(__dirname, "../data/announcements-cache.json");
const TERMS_PATH = path.join(__dirname, "../data/terms.js");
const TERM_LANGS = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar"];

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

async function callGemini(entry, systemPrompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
    if (res.ok) return json;
    const isRetryable = res.status === 503 || res.status === 429;
    if (isRetryable && attempt < retries) {
      console.warn(`Gemini 回傳 ${res.status}，${attempt}/${retries} 次重試，等待 ${attempt * 5} 秒...`);
      await new Promise(r => setTimeout(r, attempt * 5000));
      continue;
    }
    throw new Error(`Gemini API 回傳錯誤 (HTTP ${res.status}): ${JSON.stringify(json)}`);
  }
}

async function translateOne(entry, glossaryText) {
  const targetLangs = TERM_LANGS.filter(l => l !== entry.lang);
  const systemPrompt = `你是 Kingshot 聯盟公告的翻譯員。將公告從 ${entry.lang} 翻成以下語言：${targetLangs.join(", ")}。
規則：
1. 人名（"(NNM)" 前的文字）絕對不要翻譯或更動
2. 遇到對照表列出的遊戲用語，一律使用官方譯名；沒列出的詞照字面翻譯
3. 公告裡出現的英雄名稱、活動代號（例如 KvK、Gen 3 等）如果不在下方對照表中，代表官方譯名尚未確認，一律保留英文原文，不要翻譯或音譯
4. 輸入是一個 JSON 物件 {"title": "...", "content": "..."}
5. 只回傳一個 JSON 物件，key 是語言代碼，value 是 {"title": "翻譯後標題", "content": "翻譯後內文"} 的物件，不要其他文字，不要 markdown 標記

對照表：
${glossaryText}`;

  const userInput = JSON.stringify({ title: entry.title || "", content: entry.content });
  const json = await callGemini({ ...entry, content: userInput }, systemPrompt);

  if (!json.candidates || !json.candidates[0]) {
    throw new Error(`Gemini API 回傳格式異常: ${JSON.stringify(json)}`);
  }

  const translations = JSON.parse(json.candidates[0].content.parts[0].text);
  translations[entry.lang] = { title: entry.title || "", content: entry.content };
  return translations;
}

async function main() {
  const rawEntries = parseEntries(fs.readFileSync(SOURCE, "utf8"));
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
  const glossaryText = buildGlossaryText(loadTerms());

  // 只翻譯快取裡還沒有的（也就是真正新增的）公告
  for (const entry of rawEntries) {
    if (cache[entry.id]) continue;
    const result = await translateOne(entry, glossaryText);
    const titleMap = {};
    const contentMap = {};
    for (const [lang, v] of Object.entries(result)) {
      titleMap[lang] = v.title;
      contentMap[lang] = v.content;
    }
    cache[entry.id] = {
      author: entry.author,
      createdAt: new Date().toISOString(),
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
  const published = rawEntries.slice().reverse().map(e => ({ id: e.id, ...cache[e.id] }));

  fs.writeFileSync(OUTPUT, JSON.stringify(published, null, 2));
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
