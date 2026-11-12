/* NXS officer page — 📺 Guide notes (registers OFFICER_PAGES.gn; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry 2026-11-12: the public guides were mostly written by others and stay as they are; where well-known guide videos differ from them,
   add details, or show other alliances' ideas, it goes here. Data + renderer: js/officer/vid.js (Project docs claude/videos-*.md). No member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
let lang = OFFICER.lang || "en";
const T = {
  en: { title: "📺 Guide notes", lead: "Extra notes from guide videos.", badge: "🔬 From guide videos · updated 2026-11-12" },
  zh: { title: "📺 攻略補充", lead: "攻略影片的資料補充。", badge: "🔬 來自攻略影片 · 更新 2026-11-12" },
  pt: { title: "📺 Notas de guias", lead: "Notas extras dos vídeos de guias.", badge: "🔬 Dos vídeos de guias · atualizado 2026-11-12" },
  ar: { title: "📺 ملاحظات الأدلة", lead: "ملاحظات إضافية من فيديوهات الأدلة.", badge: "🔬 من فيديوهات الأدلة · تحديث 2026-11-12" },
  ko: { title: "📺 공략 보충", lead: "공략 영상의 자료 보충.", badge: "🔬 공략 영상에서 · 업데이트 2026-11-12" } };
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
function render() {
  const root = $("gn_root"); if (!root) return;
  root.innerHTML = `<div class="muted" style="font-size:12.5px;margin:2px 0 10px">${esc(t("badge"))}</div>
  <div class="card rs-do"><p style="margin:0">${esc(t("lead"))}</p></div>
  ${OFFICER.vidNotes(lang)}`;
}
function applyTexts() { if ($("gn_title")) { $("gn_title").textContent = t("title"); $("gn_intro").textContent = ""; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.gn = { init, applyTexts, setLang };
})();
