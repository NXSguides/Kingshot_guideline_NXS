/* Builds data/ai-context.txt — the public guide text the AI assistant answers from.
   Only PUBLIC content goes here (guides + announcements). Officer data is added
   by the Cloudflare Worker, and only for verified officers. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data/ai-context.txt");

const src = fs.readFileSync(path.join(ROOT, "data/content.js"), "utf8");
const D = {};
new Function("D", src + "\nD.GUIDES = GUIDES; D.GLOSSARY = GLOSSARY; D.HEROES = HEROES;" +
  "\nD.JOURNEY = typeof JOURNEY !== 'undefined' ? JOURNEY : [];")(D);

const en = (m) => (m && (m.en || m.zh || Object.values(m)[0])) || "";
const SKIP_KEYS = new Set(["type", "src", "url", "guide", "color", "id", "icon", "emoji", "priority", "c", "k", "alt"]);

function clean(s) {
  return String(s)
    .replace(/\{(\w+)\}/g, (m, id) => (D.GLOSSARY[id] ? en(D.GLOSSARY[id]) : D.HEROES[id] ? en(D.HEROES[id]) : id))
    .replace(/\[\[link:([\w-]+)\]\]/g, (m, g) => (D.GUIDES[g] ? `(see guide #${g})` : ""))
    .replace(/\[\[img:[^\]]+\]\]/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .trim();
}

function walk(v, out, key) {
  if (typeof v === "string") {
    if (SKIP_KEYS.has(key) || /^https?:|\.(png|jpe?g|webp|gif|mp4)$/i.test(v)) return;
    const c = clean(v);
    if (c) out.push(D.HEROES[c] ? en(D.HEROES[c]) : c);
  } else if (Array.isArray(v)) v.forEach((x) => walk(x, out, key));
  else if (v && typeof v === "object") for (const k in v) walk(v[k], out, k);
}

const parts = [];
for (const [id, g] of Object.entries(D.GUIDES)) {
  if (id === "recent-events") continue; // only a list of links
  const s = (g.sections && (g.sections.en || g.sections.zh)) || null;
  if (!s) continue;
  const lines = [];
  walk(s.blocks || s, lines);
  // extra per-guide data (e.g. bear-hunt joiners/leaders, swordland buildings/zones)
  for (const k of Object.keys(g)) {
    if (["emoji", "name", "sections", "hidden"].includes(k)) continue;
    const extra = [];
    walk(g[k].en || g[k], extra);
    if (extra.length) lines.push(`[${k}] ` + extra.join(" | "));
  }
  parts.push(`### GUIDE #${id} — ${en(g.name)}\n${[...new Set(lines)].join("\n")}`);
}

if (D.JOURNEY.length) {
  const j = D.JOURNEY.map((e) => `${clean(e.t)}: ` + e.o.map((o) => `${clean(o[0])} → ${clean(o[1])}${o[2] ? " (best)" : ""}`).join("; "));
  parts.push(`### JOURNEY CHOICES (shown inside the general guides)\n${j.join("\n")}`);
}

try {
  const anns = JSON.parse(fs.readFileSync(path.join(ROOT, "data/announcements.json"), "utf8"));
  const recent = anns.slice(0, 15).map((a) =>
    `[${String(a.createdAt).slice(0, 10)} by ${a.author}] ${clean(en(a.title))}\n${clean(en(a.content))}`);
  if (recent.length) parts.push(`### ANNOUNCEMENTS (newest first, see guide #recent-events)\n${recent.join("\n\n")}`);
} catch (e) { console.warn("announcements skipped:", e.message); }

fs.writeFileSync(OUT, parts.join("\n\n") + "\n");
console.log(`wrote ${OUT}: ${fs.statSync(OUT).size} bytes, ${parts.length} sections`);
