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
  for (const group of TERMS) for (const row of group.rows) {
    const [en, ...rest] = row;
    const pairs = TERM_LANGS.slice(1).map((c, i) => `${c}:${rest[i]}`).filter(p => !p.endsWith(":—"));
    const note = row.length > TERM_LANGS.length ? ` (note: ${row[row.length - 1]})` : "";
    lines.push(`${en} → ${pairs.join(", ")}${note}`);
  }
  return lines.join("\n");
}

function parseEntries(md) {
  return md.split(/^---$/m).map(s => s.trim()).filter(Boolean).map(b => {
    const data = yaml.load(b);
    const id = crypto.createHash("sha1").update(JSON.stringify(data)).digest("hex").slice(0, 10);
    return { id, ...data };
  });
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

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
