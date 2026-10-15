/* NXS officer page — views tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.views) */
/* ===== Views tab: site statistics from GoatCounter via the Worker (officers only) ===== */
(function () {
const ROOT = document.getElementById("pg-views"), $ = (id) => document.getElementById(id);
const AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
let lang = OFFICER.lang, DATA = null, proof = null;
const T = { ko: {"title": "📈 사이트 조회수", "meta": "일별 방문자 · 어떤 가이드와 언어를 여는지 · 어디서 오는지. 간부(간부 비밀번호가 저장된 브라우저)와 이 페이지는 집계되지 않습니다.", "note": "이 브라우저: 집계 안 됨(간부). 집계는 익명입니다 — 쿠키, 이름, IP를 저장하지 않습니다.", "days": "일", "loading": "불러오는 중…", "daily": "일별 방문자", "pages": "페이지 / 가이드", "langs": "사이트 언어", "loc": "국가", "refs": "유입 경로", "sys": "기기", "total": "최근 {d}일간 방문자 {n}명", "err": "불러오지 못했습니다: {e}", "noToken": "Worker에 GoatCounter 토큰이 아직 설정되지 않았습니다(GOATCOUNTER_TOKEN).", "direct": "(직접 / 앱)"},
 ar: {"title": "📈 زيارات الموقع", "meta": "الزوار يوميًا · الأدلة واللغات التي يفتحها الناس · من أين يأتون. لا يُحتسب المسؤولون (أي متصفح حُفظت فيه كلمة مرور المسؤولين) ولا هذه الصفحة.", "note": "هذا المتصفح: غير محتسب (مسؤول). الإحصاء مجهول الهوية — بلا ملفات تعريف ارتباط، بلا أسماء، ولا تُخزَّن عناوين IP.", "days": "أيام", "loading": "جارٍ التحميل…", "daily": "الزوار يوميًا", "pages": "الصفحات / الأدلة", "langs": "لغات الموقع", "loc": "الدول", "refs": "مصدر الزيارة", "sys": "الأجهزة", "total": "{n} زائر في آخر {d} أيام", "err": "تعذّر التحميل: {e}", "noToken": "لم يُضبط رمز GoatCounter في الـ Worker بعد (GOATCOUNTER_TOKEN).", "direct": "(مباشر / تطبيق)"},
 pt: {"title": "📈 Visitas ao site", "meta": "Visitantes por dia · quais guias e idiomas as pessoas abrem · de onde vêm. Oficiais (qualquer navegador com a senha dos oficiais salva) e esta página não contam.", "note": "Este navegador: não conta (oficial). A contagem é anônima — sem cookies, sem nomes, sem IPs salvos.", "days": "dias", "loading": "Carregando…", "daily": "Visitantes por dia", "pages": "Páginas / guias", "langs": "Idiomas do site", "loc": "Países", "refs": "Vieram de", "sys": "Aparelhos", "total": "{n} visitantes nos últimos {d} dias", "err": "Não foi possível carregar: {e}", "noToken": "O token do GoatCounter ainda não foi configurado no Worker (GOATCOUNTER_TOKEN).", "direct": "(direto / app)"},

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
    // one quiet retry: a phone switching networks or a brief GoatCounter hiccup shouldn't show an error right away
    const ask = () => fetch(AI_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ stats: 1, days, officerProof: p }) }).then((r) => r.json());
    let d; try { d = await ask(); if (d.error === "goatcounter") throw 0; } catch (e) { await new Promise((r) => setTimeout(r, 1500)); d = await ask(); }
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
