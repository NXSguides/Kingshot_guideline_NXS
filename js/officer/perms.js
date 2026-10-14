/* NXS officer page — 👥 Officers tab: who may see / edit which tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.perms)
   FIRST VERSION, kept on this device only (localStorage) so the page and its effect can be tried out.
   Final goal: the same table lives on the Worker next to the Discord login — the Worker checks it on every save,
   and the tab list is managed here by the admins. The data shape below is the one the Worker will store. */
(function () {
const ROOT = document.getElementById("pg-perms");
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const T = { ko: {"title": "👥 간부 권한", "sub": "각 간부가 탭별로 할 수 있는 일: ✏️ 수정 · 👁️ 보기만 · — 숨김. 새로 추가된 간부는 이벤트 👁️만 가능합니다.", "trial": "🧪 체험판: 이 표는 이 기기에만 저장되며 페이지와 효과를 시험해 보기 위한 것입니다. 정식판은 Worker에 저장되어 Discord 로그인과 연동되고, 모든 저장을 그곳에서 확인합니다.", "you": "(나)", "admin": "관리자", "adminNote": "관리자는 이 탭을 볼 수 있고, 모든 탭을 수정할 수 있으며, 다른 사람을 관리자로 지정할 수 있습니다. Sparrow는 항상 관리자입니다.", "mkAdmin": "관리자로 지정", "unAdmin": "관리자 해제", "add": "+ 간부 추가", "addName": "이름", "addId": "Discord 사용자 ID (18자리)", "addBtn": "추가", "remove": "삭제", "tabs": {"events": "📅 이벤트", "map": "🗺️ 지도", "ranking": "📊 랭킹", "post": "📢 공지", "watch": "🕵️ 감시", "scout": "🔭 정찰", "views": "📈 조회수", "board": "💬 게시판", "bt": "🐻 베어 계산기"}, "lv": {"edit": "✏️ 수정", "view": "👁️ 보기", "none": "— 숨김"}, "saved": "저장됨 (이 기기에만)", "reset": "기본값으로 초기화", "preview": "👁️ 미리보기 대상", "previewOff": "내 권한으로 돌아가기", "previewing": "{name} 님의 권한으로 미리보는 중 — 탭 목록과 버튼이 해당 권한대로 표시됩니다.", "roOn": "👁️ 보기 전용: 이 탭은 볼 수만 있고 수정할 수 없습니다."},
 ar: {"title": "👥 صلاحيات الضباط", "sub": "ما يمكن لكل ضابط فعله في كل تبويب: ✏️ تعديل · 👁️ عرض فقط · — مخفي. الضابط المضاف حديثًا يبدأ بـ الفعاليات 👁️ فقط.", "trial": "🧪 نسخة تجريبية: هذا الجدول موجود على هذا الجهاز فقط، لتجربة الصفحة وتأثيرها. النسخة الحقيقية ستكون على الخادم (Worker)، مرتبطة بتسجيل الدخول عبر Discord، وسيُتحقق من كل حفظ هناك.", "you": "(أنت)", "admin": "مشرف", "adminNote": "يرى المشرفون هذا التبويب، ويمكنهم تعديل كل التبويبات وتعيين آخرين مشرفين. Sparrow مشرف دائمًا.", "mkAdmin": "تعيين مشرفًا", "unAdmin": "إزالة الإشراف", "add": "+ إضافة ضابط", "addName": "الاسم", "addId": "معرّف مستخدم Discord (18 رقمًا)", "addBtn": "إضافة", "remove": "إزالة", "tabs": {"events": "📅 الفعاليات", "map": "🗺️ الخريطة", "ranking": "📊 التصنيف", "post": "📢 النشر", "watch": "🕵️ المراقبة", "scout": "🔭 الاستطلاع", "views": "📈 المشاهدات", "board": "💬 لوحة النقاش", "bt": "🐻 حاسبة الدببة"}, "lv": {"edit": "✏️ تعديل", "view": "👁️ عرض", "none": "— مخفي"}, "saved": "تم الحفظ (على هذا الجهاز فقط)", "reset": "استعادة الإعدادات الافتراضية", "preview": "👁️ معاينة بصلاحيات", "previewOff": "العودة إلى حسابي", "previewing": "معاينة بصلاحيات {name} — قائمة التبويبات والأزرار تتبع صلاحياته.", "roOn": "👁️ عرض فقط: يمكنك رؤية هذا التبويب لكن لا يمكنك تغييره."},

  zh: { title: "👥 幹部權限", sub: "每個幹部在每個分頁可以做什麼：✏️ 可以編輯 · 👁️ 只能看 · — 看不到。新加入的幹部預設只能看「活動」。",
    trial: "🧪 試用版：這張表目前只存在這台裝置上，用來試試看頁面和效果；正式版會存在伺服器上，和 Discord 登入綁在一起，每一次儲存都由伺服器檢查。",
    you: "（你）", admin: "管理員", adminNote: "管理員看得到這個分頁、所有分頁都可以編輯，也可以把別人設成管理員。Sparrow 固定是管理員。", mkAdmin: "設為管理員", unAdmin: "取消管理員", add: "＋ 加幹部", addName: "名字", addId: "Discord 使用者 ID（18 位數字）", addBtn: "加入", remove: "移除",
    tabs: { events: "📅 活動", map: "🗺️ 地圖", ranking: "📊 排名", post: "📢 公告", watch: "🕵️ 監看", scout: "🔭 偵察", views: "📈 瀏覽", board: "💬 留言板", bt: "🐻 熊隊計算" },
    lv: { edit: "✏️ 編輯", view: "👁️ 只看", none: "— 隱藏" }, saved: "已儲存（只在這台裝置）", reset: "恢復預設", preview: "👁️ 用這個身分預覽", previewOff: "回到自己", previewing: "正在用 {name} 的權限預覽，分頁列和按鈕會照他的權限顯示。",
    roOn: "👁️ 這個分頁你只能看，不能修改。" },
  en: { title: "👥 Officer rights", sub: "What each officer may do on each tab: ✏️ edit · 👁️ view only · — hidden. A newly added officer starts with Events 👁️ only.",
    trial: "🧪 Trial version: this table lives only on this device, to try the page and its effect. The real one will live on the Worker, tied to the Discord login, and every save will be checked there.",
    you: "(you)", admin: "admin", adminNote: "Admins see this tab, may edit every tab and may make others admins. Sparrow is always an admin.", mkAdmin: "Make admin", unAdmin: "Remove admin", add: "+ Add officer", addName: "Name", addId: "Discord user ID (18 digits)", addBtn: "Add", remove: "Remove",
    tabs: { events: "📅 Events", map: "🗺️ Map", ranking: "📊 Ranking", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", board: "💬 Board", bt: "🐻 Bear calc" },
    lv: { edit: "✏️ Edit", view: "👁️ View", none: "— Hidden" }, saved: "Saved (this device only)", reset: "Reset to defaults", preview: "👁️ Preview as", previewOff: "Back to myself", previewing: "Previewing with {name}'s rights — the tab list and buttons follow their rights.",
    roOn: "👁️ View only: you can look at this tab but not change it." },
  pt: { title: "👥 Permissões dos oficiais", sub: "O que cada oficial pode fazer em cada aba: ✏️ editar · 👁️ só ver · — escondida. Um oficial novo começa só com Eventos 👁️.",
    trial: "🧪 Versão de teste: esta tabela fica só neste aparelho, para testar a página e o efeito. A versão final ficará no Worker, ligada ao login do Discord, e cada salvamento será checado lá.",
    you: "(você)", admin: "admin", adminNote: "Admins veem esta aba, podem editar todas as abas e tornar outros admins. Sparrow é sempre admin.", mkAdmin: "Tornar admin", unAdmin: "Tirar admin", add: "+ Adicionar oficial", addName: "Nome", addId: "ID de usuário do Discord (18 dígitos)", addBtn: "Adicionar", remove: "Remover",
    tabs: { events: "📅 Eventos", map: "🗺️ Mapa", ranking: "📊 Ranking", post: "📢 Anúncios", watch: "🕵️ Vigilância", scout: "🔭 Reconhecimento", views: "📈 Visitas", board: "💬 Mural", bt: "🐻 Calc. do Urso" },
    lv: { edit: "✏️ Editar", view: "👁️ Ver", none: "— Escondida" }, saved: "Salvo (só neste aparelho)", reset: "Voltar ao padrão", preview: "👁️ Ver como", previewOff: "Voltar a mim", previewing: "Vendo com as permissões de {name} — as abas e os botões seguem as permissões dele.",
    roOn: "👁️ Só leitura: você pode ver esta aba mas não mudar nada." },
};
let lang = OFFICER.lang;
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const P = OFFICER.perms;   // { users: { id: { name, perms: { tab: "edit"|"view"|"none" } } } } — shared with core.js
const TABS_P = ["events", "map", "ranking", "post", "watch", "scout", "views", "board", "bt"];
function render() {
  const tt = t("tabs"), lv = t("lv"), me = OFFICER.user && OFFICER.user.id;
  const rows = Object.entries(P.users);
  $("pm_tbl").innerHTML = `<table class="pm-tbl"><thead><tr><th></th>${TABS_P.map((k) => `<th>${esc(tt[k])}</th>`).join("")}<th></th></tr></thead><tbody>${rows.map(([id, u]) => {
    const admin = !!u.admin, owner = id === OFFICER.OWNER;
    return `<tr${OFFICER.previewAs === id ? ' class="pv"' : ""}><th><div>${esc(u.name)} ${id === me ? `<span class="muted">${esc(t("you"))}</span>` : ""}</div>${admin ? `<span class="pm-adm">${esc(t("admin"))}</span> ` : ""}<span class="muted" style="font-weight:400;font-size:11px">${esc(id)}</span></th>
      ${TABS_P.map((k) => admin ? `<td class="muted">✏️</td>` : `<td><select class="btn pm-sel" data-u="${esc(id)}" data-t="${k}">${["edit", "view", "none"].map((l) => `<option value="${l}"${(u.perms[k] || "none") === l ? " selected" : ""}>${esc(lv[l])}</option>`).join("")}</select></td>`).join("")}
      <td class="pm-acts">${id !== me ? `<button class="btn small" data-pv="${esc(id)}">${esc(OFFICER.previewAs === id ? t("previewOff") : t("preview"))}</button>` : ""}${owner || id === me ? "" : `<button class="btn small" data-adm="${esc(id)}">${esc(admin ? t("unAdmin") : t("mkAdmin"))}</button><button class="btn small" data-rm="${esc(id)}">${esc(t("remove"))}</button>`}</td></tr>`; }).join("")}</tbody></table>`;
  const pv = OFFICER.previewAs && P.users[OFFICER.previewAs];
  $("pm_preview").hidden = !pv; if (pv) $("pm_preview").textContent = t("previewing").replace("{name}", pv.name);
}
function applyTexts() {
  $("pm_title").textContent = t("title"); $("pm_sub").textContent = t("sub"); $("pm_trial").textContent = t("trial"); $("pm_adminNote").textContent = t("adminNote");
  $("pm_addBtn").textContent = t("addBtn"); $("pm_name").placeholder = t("addName"); $("pm_id").placeholder = t("addId"); $("pm_addH").textContent = t("add"); $("pm_reset").textContent = t("reset");
  if (ROOT && !ROOT.hidden) render();
}
function changed() { OFFICER.savePerms(); render(); $("pm_msg").textContent = t("saved"); OFFICER.applyPerms(); }
function init() {
  applyTexts(); render();
  ROOT.addEventListener("change", (e) => { const s = e.target.closest(".pm-sel"); if (!s) return; P.users[s.dataset.u].perms[s.dataset.t] = s.value; changed(); });
  ROOT.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.rm) { delete P.users[b.dataset.rm]; if (OFFICER.previewAs === b.dataset.rm) OFFICER.previewAs = null; changed(); }
    if (b.dataset.pv) { OFFICER.previewAs = OFFICER.previewAs === b.dataset.pv ? null : b.dataset.pv; render(); OFFICER.applyPerms(); }
    if (b.dataset.adm) { const u = P.users[b.dataset.adm]; u.admin = !u.admin; if (u.admin) u.perms = {}; else u.perms = u.perms && Object.keys(u.perms).length ? u.perms : OFFICER.defaultPerms(); changed(); }
  });
  $("pm_addBtn").onclick = () => {
    const id = $("pm_id").value.trim(), name = $("pm_name").value.trim();
    if (!/^\d{17,20}$/.test(id) || !name) { $("pm_id").focus(); return; }
    P.users[id] = P.users[id] || { name, perms: OFFICER.defaultPerms() }; P.users[id].name = name; if (id === OFFICER.OWNER) P.users[id].admin = true;
    $("pm_id").value = ""; $("pm_name").value = ""; changed();
  };
  $("pm_reset").onclick = () => { OFFICER.resetPerms(); OFFICER.previewAs = null; changed(); };
}
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.perms = { init, onShow: render, applyTexts, setLang };
})();
