/* Builds the public text the AI assistant answers from — one file per language:
     data/ai-context-<lang>.txt  = that language's guides + announcements + game-term list
     data/ai-context.txt         = English copy (kept for older Worker versions)
   Only PUBLIC content goes here. Officer data is added by the Cloudflare Worker,
   and only for verified officers. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

const D = {};
new Function("D", read("data/content.js") + "\nD.LANGS = LANGS; D.GUIDES = GUIDES; D.GLOSSARY = GLOSSARY; D.HEROES = HEROES;" +
  "\nD.JOURNEY = typeof JOURNEY !== 'undefined' ? JOURNEY : [];" +
  "\nD.JOURNEY_TR = typeof JOURNEY_TR !== 'undefined' ? JOURNEY_TR : {};")(D);
const T = {};
try { new Function("T", read("data/terms.js") + "\nT.TERMS = TERMS; T.TERM_LANGS = TERM_LANGS;")(T); }
catch (e) { console.warn("terms.js skipped:", e.message); }

let anns = [];
try { anns = JSON.parse(read("data/announcements.json")); } catch (e) { console.warn("announcements skipped:", e.message); }

const SKIP_KEYS = new Set(["type", "src", "url", "guide", "color", "id", "icon", "emoji", "priority", "c", "k", "alt"]);

function build(lang) {
  const pick = (m) => (m && (m[lang] || m.en || m.zh || Object.values(m)[0])) || "";
  const clean = (s) => String(s)
    .replace(/\{(\w+)\}/g, (m, id) => (D.GLOSSARY[id] ? pick(D.GLOSSARY[id]) : D.HEROES[id] ? pick(D.HEROES[id]) : id))
    .replace(/\[\[link:([\w-]+)\]\]/g, (m, g) => (D.GUIDES[g] ? `(see guide #${g})` : ""))
    .replace(/\[\[img:[^\]]+\]\]/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .trim();
  const walk = (v, out, key) => {
    if (typeof v === "string") {
      if (SKIP_KEYS.has(key) || /^https?:|\.(png|jpe?g|webp|gif|mp4)$/i.test(v)) return;
      const c = clean(v);
      if (c) out.push(D.HEROES[c] ? pick(D.HEROES[c]) : c);
    } else if (Array.isArray(v)) v.forEach((x) => walk(x, out, key));
    else if (v && typeof v === "object") for (const k in v) walk(v[k], out, k);
  };

  const parts = [];
  for (const [id, g] of Object.entries(D.GUIDES)) {
    if (id === "recent-events") continue; // only a list of links
    const s = (g.sections && (g.sections[lang] || g.sections.en || g.sections.zh)) || null;
    if (!s) continue;
    const lines = [];
    walk(s.blocks || s, lines);
    // extra per-guide data (e.g. bear-hunt joiners/leaders, swordland buildings/zones)
    for (const k of Object.keys(g)) {
      if (["emoji", "name", "sections", "hidden"].includes(k)) continue;
      const extra = [];
      walk(g[k][lang] || g[k].en || g[k], extra);
      if (extra.length) lines.push(`[${k}] ` + extra.join(" | "));
    }
    parts.push(`### GUIDE #${id} — ${pick(g.name)}\n${[...new Set(lines)].join("\n")}`);
  }

  if (D.JOURNEY.length) {
    const tr = D.JOURNEY_TR[lang] || {};
    const jt = (s) => clean(tr[s] || s);
    const j = D.JOURNEY.map((e) => `${jt(e.t)}: ` + e.o.map((o) => `${jt(o[0])} → ${jt(o[1])}${o[2] ? " (best)" : ""}`).join("; "));
    parts.push(`### JOURNEY CHOICES (shown inside the general guides)\n${j.join("\n")}`);
  }

  const recent = anns.slice(0, 15).map((a) =>
    `[${String(a.createdAt).slice(0, 10)} by ${a.author}] ${clean(pick(a.title))}\n${clean(pick(a.content))}`);
  if (recent.length) parts.push(`### ANNOUNCEMENTS (newest first, see guide #recent-events)\n${recent.join("\n\n")}`);

  // official in-game names: the AI must use these instead of leaving terms in English
  const col = T.TERM_LANGS ? T.TERM_LANGS.indexOf(lang) : -1;
  if (lang !== "en" && col > 0) {
    const rows = [];
    for (const grp of T.TERMS || []) for (const r of (grp && grp.rows) || [])
      if (Array.isArray(r) && r[col] && r[col] !== "—" && r[col] !== r[0]) rows.push(`${r[0]} = ${r[col]}`);
    for (const m of [...Object.values(D.GLOSSARY), ...Object.values(D.HEROES)])
      if (m && m.en && m[lang] && m[lang] !== m.en) rows.push(`${m.en} = ${m[lang]}`);
    if (rows.length) parts.push(`### GAME TERMS (English = official ${lang} name)\n${[...new Set(rows)].join("\n")}`);
  }
  return parts.join("\n\n") + "\n";
}

for (const { code } of D.LANGS) {
  const text = build(code);
  fs.writeFileSync(path.join(ROOT, `data/ai-context-${code}.txt`), text);
  if (code === "en") fs.writeFileSync(path.join(ROOT, "data/ai-context.txt"), text);
  console.log(`ai-context-${code}.txt: ${Buffer.byteLength(text)} bytes`);
}
