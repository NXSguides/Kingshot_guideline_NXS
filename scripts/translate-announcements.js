const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const crypto = require("crypto");

const SOURCE = path.join(__dirname, "../data/announcements-source.md");
const OUTPUT = path.join(__dirname, "../data/announcements.json");
const PROCESSED = path.join(__dirname, "../data/announcements-processed.json");
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
3. 只回傳一個 JSON 物件，key 是語言代碼，value 是翻譯，不要其他文字，不要 markdown 標記

對照表：
${glossaryText}`;

  const json = await callGemini(entry, systemPrompt);

  if (!json.candidates || !json.candidates[0]) {
    throw new Error(`Gemini API 回傳格式異常: ${JSON.stringify(json)}`);
  }

  const translations = JSON.parse(json.candidates[0].content.parts[0].text);
  translations[entry.lang] = entry.content;
  return translations;
}

async function main() {
  const entries = parseEntries(fs.readFileSync(SOURCE, "utf8"));
  const processed = fs.existsSync(PROCESSED) ? JSON.parse(fs.readFileSync(PROCESSED, "utf8")) : [];
  const published = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, "utf8")) : [];
  const glossaryText = buildGlossaryText(loadTerms());
  let changed = false;

  for (const entry of entries) {
    if (processed.includes(entry.id)) continue;
    const content = await translateOne(entry, glossaryText);
    published.unshift({
      id: entry.id,
      author: entry.author,
      createdAt: new Date().toISOString(),
      images: entry.images || [],
      content,
    });
    processed.push(entry.id);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(OUTPUT, JSON.stringify(published, null, 2));
    fs.writeFileSync(PROCESSED, JSON.stringify(processed, null, 2));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
