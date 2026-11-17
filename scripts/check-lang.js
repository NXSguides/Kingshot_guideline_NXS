/* 🔤 Language check (Sherry 2026-11-16, after a German title sat in the English guide for a month and Chinese showed in the English UI):
   node scripts/check-lang.js          → lists what looks wrong; exit 1 on the hard errors (wrong script / wrong language / missing language)
   1) data/content.js guides: every language present, the same blocks as English, each text really in its language
      (script for zh ko ru th ar; common-word scoring between en de fr pt tr id es)
   2) officer pages (js/officer/*.js, js/sparrow.js, js/officer-data.js): text tables with en + zh — a key missing in zh,
      a zh text with no Chinese in it, an en text with Chinese in it. */
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.join(__dirname, "..");
const LANGS = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar", "es"];
const SCRIPT = { zh: /[一-鿿]/g, ko: /[가-힯]/g, ru: /[Ѐ-ӿ]/g, th: /[฀-๿]/g, ar: /[؀-ۿ]/g };
const STOP = {
  en: "the and you your with for are is this that from have will can not each when before after only than them their",
  de: "der die das und nicht mit für ist ein eine den dem auf sich auch wird sind oder wenn dein deine nur noch nach",
  fr: "le la les des et pas pour est une un dans que qui sur avec vous ton tes plus par ou au aux chaque avant après",
  pt: "o os as e não para com uma um que em do da dos das seu sua você mais por ou ao cada antes depois são",
  tr: "ve bir için ile bu her çok daha gibi kadar sonra önce olan olarak değil veya ama ise",
  id: "dan yang untuk dengan di ke dari ini itu tidak akan bisa setiap atau jika kamu lebih hanya sebelum setelah",
  es: "el los las y no para con una un que del tu tus más por al cada antes después son",
};
const SW = Object.fromEntries(Object.entries(STOP).map(([l, s]) => [l, new Set(s.split(" "))]));
const plain = (s) => String(s).replace(/\{\w+\}|::\w+\+?::|\[\[[^\]]*\]\]|https?:\S+|[*_=#`]/g, " ");
function latinGuess(text) {
  const w = plain(text).toLowerCase().split(/[^a-zà-ÿğışçöüâêîôûœæ']+/).filter(Boolean); if (w.length < 8) return null;
  const sc = Object.fromEntries(Object.keys(SW).map((l) => [l, w.filter((x) => SW[l].has(x)).length]));
  const top = Object.entries(sc).sort((a, b) => b[1] - a[1]); return { best: top[0][0], n: top[0][1], sc, words: w.length };
}
const out = { err: [], warn: [] };
function checkText(where, lang, text) {
  const t = plain(text); if (t.replace(/[\s\d\W]/g, "").length < 12) return;
  if (SCRIPT[lang]) { const n = (t.match(SCRIPT[lang]) || []).length, letters = t.replace(/[\s\d\p{P}\p{S}]/gu, "").length; if (n < 2 || (n / Math.max(1, letters) < 0.25 && letters > 60)) out.err.push(`${where} [${lang}] is not in its own script: ${text.slice(0, 70)}`); return; }
  for (const [l, re] of Object.entries(SCRIPT)) if ((t.match(re) || []).length > 6) { out.err.push(`${where} [${lang}] has ${l} text in it: ${text.slice(0, 70)}`); return; }
  const g = latinGuess(t); if (g && g.best !== lang && g.n >= 4 && g.n >= (g.sc[lang] || 0) * 2 + 2) out.err.push(`${where} [${lang}] looks like ${g.best}: ${text.slice(0, 70)}`);
}
/* ---- 1) guides ---- */
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data/content.js"), "utf8") + "\n;this.GUIDES = GUIDES;", ctx);
const blockText = (b) => [b.text, b.title, ...(b.items || []), ...(b.rows || []).flat(), ...(b.head || [])].filter((x) => typeof x === "string");
for (const [id, g] of Object.entries(ctx.GUIDES)) {
  const sec = g.sections || {}; if (!sec.en) continue;
  for (const l of LANGS) {
    if (g.name && !g.name[l]) out.warn.push(`guide ${id}: no name in ${l}`);
    const s = sec[l]; if (!s) { out.warn.push(`guide ${id}: no ${l} version`); continue; }
    if (typeof s.title === "string") checkText(`guide ${id} title`, l, s.title.length < 30 ? s.title + " " + s.title : s.title);
    /* a title copied from another language (the German title sat in the English Swordland guide for a month) */
    for (const o of LANGS) if (o !== l && sec[o] && typeof s.title === "string" && s.title === sec[o].title && g.name && g.name[l] && g.name[o] && g.name[l] !== g.name[o] && s.title !== g.name[l])
      out.err.push(`guide ${id} [${l}] title "${s.title}" is the ${o} title (the ${l} name is "${g.name[l]}")`);
    const B = s.blocks || [], E = sec.en.blocks || [];
    if (B.length !== E.length) out.warn.push(`guide ${id} [${l}]: ${B.length} blocks, English has ${E.length}`);
    checkText(`guide ${id} text`, l, B.flatMap(blockText).join(" ").slice(0, 6000));
    B.forEach((b, i) => blockText(b).forEach((t) => { if (t.length > 60) checkText(`guide ${id} block ${i + 1}`, l, t); }));
  }
}
/* ---- 2) officer text tables ---- */
function objectAt(src, i) { let d = 0, q = null; for (let k = i; k < src.length; k++) { const c = src[k];
    if (q) { if (c === "\\") k++; else if (c === q) q = null; else if (q === "`" && c === "$" && src[k + 1] === "{") { /* template expr: skip to matching } */ let dd = 1; k += 2; while (k < src.length && dd) { if (src[k] === "{") dd++; else if (src[k] === "}") dd--; k++; } k--; } continue; }
    if (c === '"' || c === "'" || c === "`") q = c; else if (c === "{") d++; else if (c === "}") { d--; if (!d) return src.slice(i, k + 1); } } return null; }
const CJK = /[一-鿿]/;
const files = [...fs.readdirSync(path.join(root, "js/officer")).map((f) => "js/officer/" + f), "js/sparrow.js", "js/officer-data.js", "js/battle-table.js", "js/app.js"].filter((f) => f.endsWith(".js"));
let tables = 0, keysN = 0;
for (const f of files) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  for (const m of src.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\{/g)) {
    const lit = objectAt(src, m.index + m[0].length - 1); if (!lit || !/\ben\s*:/.test(lit.slice(0, 4000)) && !/"en"\s*:/.test(lit.slice(0, 4000))) continue;
    let T; try { T = vm.runInNewContext("(" + lit + ")", {}, { timeout: 2000 }); } catch (e) { continue; }
    if (!T || typeof T.en !== "object" || typeof T.zh !== "object" || Array.isArray(T.en)) continue; tables++;
    const walk = (a, b, p) => { for (const k of Object.keys(a)) { const x = a[k], y = b == null ? undefined : b[k], w = `${f} ${m[1]}.${p}${k}`;
        if (x && typeof x === "object") { walk(x, y && typeof y === "object" ? y : null, p + k + "."); continue; }
        if (typeof x !== "string") continue; keysN++;
        if (CJK.test(x) && x.replace(/[^一-鿿]/g, "").length > 2) out.err.push(`${w} [en] has Chinese: ${x.slice(0, 60)}`);
        if (y === undefined) { out.warn.push(`${w} missing in zh (English shows instead)`); continue; }
        if (typeof y === "string" && y === x && /[a-z]{4,} [a-z]{3,} [a-z]{3,}/i.test(x)) out.warn.push(`${w} zh is the same English text: ${x.slice(0, 50)}`);
        else if (typeof y === "string" && !CJK.test(y) && /[a-z]{4,} [a-z]{3,} [a-z]{3,}/i.test(y)) out.warn.push(`${w} zh has no Chinese: ${y.slice(0, 50)}`); } };
    walk(T.en, T.zh, "");
  }
}
console.log(`checked ${Object.keys(ctx.GUIDES).length} guides × ${LANGS.length} languages, ${tables} officer text tables (${keysN} texts)`);
for (const e of out.err) console.log("❌ " + e);
if (process.argv.includes("--all")) for (const w of out.warn) console.log("⚠️ " + w); else console.log(`⚠️ ${out.warn.length} softer notes (run with --all to list)`);
console.log(out.err.length ? `❌ ${out.err.length} language errors` : "✅ no language errors");
process.exit(out.err.length ? 1 : 0);
