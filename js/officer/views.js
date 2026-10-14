/* NXS officer page — views tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.views) */
/* ===== Views tab: site statistics from GoatCounter via the Worker (officers only) ===== */
(function () {
const ROOT = document.getElementById("pg-views"), $ = (id) => document.getElementById(id);
const AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
let lang = OFFICER.lang, DATA = null, proof = null;
const T = { pt: {"title": "📈 Visitas ao site", "meta": "Visitantes por dia · quais guias e idiomas as pessoas abrem · de onde vêm. Oficiais (qualquer navegador com a senha dos oficiais salva) e esta página não contam.", "note": "Este navegador: não conta (oficial). A contagem é anônima — sem cookies, sem nomes, sem IPs salvos.", "days": "dias", "loading": "Carregando…", "daily": "Visitantes por dia", "pages": "Páginas / guias", "langs": "Idiomas do site", "loc": "Países", "refs": "Vieram de", "sys": "Aparelhos", "total": "{n} visitantes nos últimos {d} dias", "err": "Não foi possível carregar: {e}", "noToken": "O token do GoatCounter ainda não foi configurado no Worker (GOATCOUNTER_TOKEN).", "direct": "(direto / app)"},

  en: { title: "📈 Site views", meta: "Visitors per day · which guides and languages people open · where they come from. Officers (any browser with the officer password saved) and this page are not counted.",
        note: "This browser: not counted (officer). Counting is anonymous — no cookies, no names, no IPs stored.", days: "days", loading: "Loading…",
        daily: "Visitors per day", pages: "Pages / guides", langs: "Site languages", loc: "Countries", refs: "Came from", sys: "Devices",
        total: "{n} visitors in the last {d} days", err: "Couldn't load: {e}", noToken: "GoatCounter token not set in the Worker yet (GOATCOUNTER_TOKEN).", direct: "(direct / app)" },
  zh: { title: "📈 網站瀏覽", meta: "每天幾個人看、打開哪些指南和語言、從哪裡來。幹部（記住密碼的瀏覽器）和這一頁本身不會被計入。",
        note: "這個瀏覽器：不計入（幹部）。統計是匿名的——沒有 cookie，不存名字，不存 IP。", days: "天", loading: "載入中…",
        daily: "每天人數", pages: "頁面／指南", langs: "網站語言", loc: "國家", refs: "來源", sys: "裝置",
        total: "最近 {d} 天共 {n} 人", err: "讀不到：{e}", noToken: "Worker 還沒設定 GoatCounter 的 token（GOATCOUNTER_TOKEN）。", direct: "（直接開啟／App）" },
};
const L = () => T[lang] || T.en;
const f = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);
const esc = OFFICER.util.esc;
const LANG_NAMES = { en: "English", zh: "中文", ko: "한국어", de: "Deutsch", fr: "Français", pt: "Português", es: "Español", tr: "Türkçe", id: "Bahasa Indonesia", ru: "Русский", th: "ไทย", ar: "العربية" };
const PAGE_NAMES = { "/index.html": { en: "Home (language picker)", zh: "首頁（選語言）" }, "/kvk-optimizer.html": { en: "KvK Points Planner", zh: "KvK 積分規劃" }, "/booking-guide.html": { en: "Booking guide", zh: "預約教學" }, "/squad-guide.html": { en: "Squad guide", zh: "部隊編組教學" }, "/kvk-calculator.html": { en: "KvK calculator", zh: "KvK 計算器" } };
function applyTexts() {
  const t = L();
  $("vw_title").textContent = t.title; $("vw_meta").textContent = t.meta; $("vw_note").textContent = t.note;
  for (const k of ["daily", "pages", "langs", "loc", "refs", "sys"]) $("vw_h_" + k).textContent = t[k];
  const sel = $("vw_days"), cur = sel.value || "7";
  sel.innerHTML = [7, 30, 90].map((d) => `<option value="${d}"${String(d) === cur ? " selected" : ""}>${d} ${t.days}</option>`).join("");
  document.documentElement.lang = HTML_LANG(lang);
}
async function proofCompute() {
  if (proof) return proof;
  try {
    const blob = await OfficerData.dataKeyBlob();
    const key = await OfficerData.pbkdf(OFFICER.pw, blob.salt, blob.iter, ["decrypt"]);
    const b64 = (x) => Uint8Array.from(atob(x), (c) => c.charCodeAt(0));
    const raw = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.data)));
    let k64 = ""; raw.forEach((x) => (k64 += String.fromCharCode(x))); k64 = btoa(k64);
    const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("nxs-officer:" + k64));
    proof = [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
  } catch (e) { proof = null; }
  return proof;
}
async function load() {
  const days = +$("vw_days").value || 7;
  $("vw_err").hidden = true; $("vw_daily").innerHTML = `<div class="muted">${L().loading}</div>`;
  try {
    const p = await proofCompute();
    const r = await fetch(AI_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ stats: 1, days, officerProof: p }) });
    const d = await r.json();
    if (d.error) throw new Error(d.error === "no_token" ? L().noToken : (d.detail || d.error));
    DATA = d; render();
  } catch (e) { $("vw_daily").innerHTML = ""; $("vw_err").hidden = false; $("vw_err").textContent = f(L().err, { e: e.message || e }); }
}
// "/index.html#/zh/kvk" → guide "kvk" in language "zh"
function splitPath(p) {
  const m = p.match(/^([^#]*)#\/?([a-z]{2})(?:\/([\w-]+))?/);
  return { file: (m ? m[1] : p.split("#")[0]) || "/index.html", lang: m ? m[2] : null, guide: m ? (m[3] || "recent-events") : null };
}
function rows(el, list, max) {
  const top = Math.max(1, ...list.map((x) => x.n));
  el.innerHTML = list.slice(0, max || 15).map((x) => `<div class="vw-row"><span title="${esc(x.k)}">${esc(x.k)}<i style="width:${x.n / top * 100}%"></i></span><b>${x.n}</b></div>`).join("") || `<div class="muted">—</div>`;
}
function render() {
  applyTexts();
  if (!DATA) return;
  const t = L(), days = DATA.days;
  // daily
  const st = DATA.total.stats || [];
  const top = Math.max(1, ...st.map((x) => x.daily || 0));
  $("vw_daily").innerHTML = st.map((x) => `<div class="b" style="height:${Math.max(2, (x.daily || 0) / top * 100)}%" data-l="${x.day.slice(5)} · ${x.daily || 0}"></div>`).join("");
  $("vw_meta").textContent = f(t.total, { n: DATA.total.total, d: days }) + " · " + t.meta;
  // pages + languages from the path
  const pages = {}, langs = {};
  for (const h of DATA.hits || []) {
    const { file, lang: lg, guide } = splitPath(h.path);
    let name = PAGE_NAMES[file] ? PAGE_NAMES[file][lang] || ptOf(PAGE_NAMES[file].en) : file;
    if (guide && file === "/index.html") { const g = typeof GUIDES !== "undefined" && GUIDES[guide]; name = (g && g.name ? (g.name[lang] || ptOf(g.name.en)) : guide); }
    pages[name] = (pages[name] || 0) + h.count;
    if (lg) langs[LANG_NAMES[lg] || lg] = (langs[LANG_NAMES[lg] || lg] || 0) + h.count;
  }
  const toList = (o) => Object.entries(o).map(([k, n]) => ({ k, n })).sort((a, b) => b.n - a.n);
  rows($("vw_pages"), toList(pages), 20); rows($("vw_langs"), toList(langs), 12);
  rows($("vw_loc"), (DATA.locations || []).map((x) => ({ k: x.name || x.id || "?", n: x.count })));
  rows($("vw_refs"), (DATA.toprefs || []).map((x) => ({ k: x.name || t.direct, n: x.count })));
  rows($("vw_sys"), (DATA.systems || []).map((x) => ({ k: x.name || "?", n: x.count })), 8);
}
async function init() { applyTexts(); $("vw_days").onchange = load; $("vw_reload").onclick = load; await load(); }
function setLang(l) { lang = l; render(); }
// guide names for the Pages list come from data/content.js (shared with the Post tab, loaded once)
OFFICER_PAGES.views = { init: () => loadScripts(["data/content.js"]).then(init, init), applyTexts, setLang };
})();
