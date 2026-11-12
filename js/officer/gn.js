/* NXS officer page — 📺 Guide notes (registers OFFICER_PAGES.gn; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry 2026-11-12: the public guides were mostly written by others and stay as they are; where well-known guide videos differ from them,
   add details, or show other alliances' ideas, it goes here. Data + renderer: js/officer/vid.js (Project docs claude/videos-*.md). No member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
let lang = OFFICER.lang || "en";
const T = {
  en: { title: "📺 Guide notes", lead: "Where well-known guide videos differ from our public guides (≠), add to them (+), or show other alliances' ideas. The public guides stay as they are.", badge: "🔬 From guide videos · updated 2026-11-12" },
  zh: { title: "📺 攻略補充", lead: "知名攻略影片跟我們公開攻略不一樣的地方（≠）、可以補充的細節（＋），以及別的聯盟的做法。公開攻略本身不改。", badge: "🔬 來自攻略影片 · 更新 2026-11-12" },
  pt: { title: "📺 Notas de guias", lead: "Onde vídeos de guias conhecidos diferem dos nossos guias públicos (≠), acrescentam detalhes (+) ou mostram ideias de outras alianças. Os guias públicos ficam como estão.", badge: "🔬 Dos vídeos de guias · atualizado 2026-11-12" },
  ar: { title: "📺 ملاحظات الأدلة", lead: "حيث تختلف فيديوهات الأدلة المعروفة عن أدلتنا العامة (≠)، أو تضيف تفاصيل (+)، أو تعرض أفكار تحالفات أخرى. الأدلة العامة تبقى كما هي.", badge: "🔬 من فيديوهات الأدلة · تحديث 2026-11-12" },
  ko: { title: "📺 공략 보충", lead: "유명 공략 영상이 우리 공개 공략과 다른 부분(≠), 보충할 내용(+), 다른 연맹의 방식을 모았어. 공개 공략 자체는 그대로 둬.", badge: "🔬 공략 영상에서 · 업데이트 2026-11-12" } };
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
function render() {
  const root = $("gn_root"); if (!root) return;
  root.innerHTML = `<div class="muted" style="font-size:12.5px;margin:2px 0 10px">${esc(t("badge"))}</div>
  <div class="card rs-do"><p style="margin:0">${esc(t("lead"))}</p><p class="muted vid-p" style="margin:8px 0 0">${esc(OFFICER.vidIntro(lang))}</p></div>
  ${OFFICER.vidNotes(lang)}`;
}
function applyTexts() { if ($("gn_title")) { $("gn_title").textContent = t("title"); $("gn_intro").textContent = ""; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.gn = { init, applyTexts, setLang };
})();
