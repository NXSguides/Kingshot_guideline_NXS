/* NXS officer page — 👥 Officers tab: who may see / edit which tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.perms)
   The table is kept on the Worker (/perms, next to the Discord login): every device shows the same one and only admins can change it.
   Still a trial: OFFICER.PERMS_TRIAL keeps every tab open until the login system goes live. */
(function () {
const ROOT = document.getElementById("pg-perms");
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const T = { ko: {"rename": "이름을 눌러 바꿀 수 있어요 (사이트에 보이는 이름일 뿐, 권한은 Discord ID를 따라가요)", "saving": "저장 중…", "saveErr": "⚠️ 서버에 저장되지 않았어요: {e} (변경 내용은 이 기기에 남아 있고 다시 시도해요)", "notAdmin": "⚠️ 관리자만 이 표를 바꿀 수 있어요.", "needLogin": "⚠️ 서버에 저장하려면 Discord로 로그인하세요.", "dbLimit": "⚠️ 서버의 오늘 무료 할당량을 다 썼어요. UTC 00:00에 초기화돼요.", "title": "👥 간부 권한", "sub": "각 간부가 탭별로 할 수 있는 일: ✏️ 수정 · 👁️ 보기만 · — 숨김. 새로 추가된 간부는 이벤트 👁️만 가능합니다.", "trial": "이 표는 서버에 저장됩니다. 모든 기기에서 같은 표가 보이고, 관리자만 바꿀 수 있어요. 아직 체험판: 로그인 시스템이 정식으로 열리기 전까지는 모든 탭이 모든 간부에게 열려 있어요 (👥는 관리자만).", "you": "(나)", "admin": "관리자", "adminNote": "관리자는 이 탭을 볼 수 있고, 모든 탭을 수정할 수 있으며, 다른 사람을 관리자로 지정할 수 있습니다. Sparrow는 항상 관리자입니다.", "mkAdmin": "관리자로 지정", "unAdmin": "관리자 해제", "add": "+ 간부 추가", "addName": "이름", "addId": "Discord 사용자 ID (18자리)", "addBtn": "추가", "remove": "삭제", "tabs": {"events": "📅 이벤트", "map": "🗺️ 지도", "ranking": "📊 랭킹", "post": "📢 공지", "watch": "🕵️ 감시", "scout": "🔭 정찰", "views": "📈 조회수", "board": "💬 게시판", "bt": "🐻 베어 계산기", "attend": "📋 출석"}, "lv": {"edit": "✏️ 수정", "view": "👁️ 보기", "none": "— 숨김"}, "saved": "✓ 서버에 저장됨 (모든 기기 동일)", "reset": "기본값으로 초기화", "preview": "👁️ 미리보기 대상", "previewOff": "내 권한으로 돌아가기", "previewing": "{name} 님의 권한으로 미리보는 중 — 탭 목록과 버튼이 해당 권한대로 표시됩니다.", "roOn": "👁️ 보기 전용: 이 탭은 볼 수만 있고 수정할 수 없습니다."},
 ar: {"rename": "اضغط على الاسم لتغييره (هو فقط ما يظهر على الموقع؛ الصلاحيات تتبع معرّف Discord)", "saving": "جارٍ الحفظ…", "saveErr": "⚠️ لم يُحفظ على الخادم: {e} (التغيير باقٍ على هذا الجهاز وستُعاد المحاولة)", "notAdmin": "⚠️ المشرفون فقط يمكنهم تعديل هذا الجدول.", "needLogin": "⚠️ سجّل الدخول عبر Discord للحفظ على الخادم.", "dbLimit": "⚠️ نفدت حصة الخادم المجانية لليوم، وتتجدد عند 00:00 UTC.", "title": "👥 صلاحيات الضباط", "sub": "ما يمكن لكل ضابط فعله في كل تبويب: ✏️ تعديل · 👁️ عرض فقط · — مخفي. الضابط المضاف حديثًا يبدأ بـ الفعاليات 👁️ فقط.", "trial": "هذا الجدول محفوظ على الخادم: كل الأجهزة ترى الجدول نفسه، والمشرفون فقط يمكنهم تعديله. ما زال تجريبيًا: حتى يبدأ نظام الدخول رسميًا تبقى كل التبويبات مفتوحة لكل الضباط (👥 للمشرفين فقط).", "you": "(أنت)", "admin": "مشرف", "adminNote": "يرى المشرفون هذا التبويب، ويمكنهم تعديل كل التبويبات وتعيين آخرين مشرفين. Sparrow مشرف دائمًا.", "mkAdmin": "تعيين مشرفًا", "unAdmin": "إزالة الإشراف", "add": "+ إضافة ضابط", "addName": "الاسم", "addId": "معرّف مستخدم Discord (18 رقمًا)", "addBtn": "إضافة", "remove": "إزالة", "tabs": {"events": "📅 الفعاليات", "map": "🗺️ الخريطة", "ranking": "📊 التصنيف", "post": "📢 النشر", "watch": "🕵️ المراقبة", "scout": "🔭 الاستطلاع", "views": "📈 المشاهدات", "board": "💬 لوحة النقاش", "bt": "🐻 حاسبة الدببة", "attend": "📋 الحضور"}, "lv": {"edit": "✏️ تعديل", "view": "👁️ عرض", "none": "— مخفي"}, "saved": "✓ حُفظ على الخادم (متطابق في كل الأجهزة)", "reset": "استعادة الإعدادات الافتراضية", "preview": "👁️ معاينة بصلاحيات", "previewOff": "العودة إلى حسابي", "previewing": "معاينة بصلاحيات {name} — قائمة التبويبات والأزرار تتبع صلاحياته.", "roOn": "👁️ عرض فقط: يمكنك رؤية هذا التبويب لكن لا يمكنك تغييره."},

  zh: { rename: "點名字可以改（只是網站上顯示的名稱，權限跟著 Discord ID 走）", title: "👥 幹部權限", sub: "每個幹部在每個分頁可以做什麼：✏️ 可以編輯 · 👁️ 只能看 · — 看不到。新加入的幹部預設只能看「活動」。",
    trial: "這張表存在伺服器上，所有裝置看到的都一樣，只有管理員能改。目前還在試用：在登入系統正式上線前，所有分頁仍然對每位幹部開放（👥 只有管理員看得到）。", saving: "儲存中…", saveErr: "⚠️ 沒存到伺服器：{e}（這台裝置上的改動還在，會再試一次）", notAdmin: "⚠️ 只有管理員可以改這張表。", needLogin: "⚠️ 要先用 Discord 登入才能存到伺服器。", dbLimit: "⚠️ 伺服器今天的免費額度用完了，UTC 00:00 重置。",
    you: "（你）", admin: "管理員", adminNote: "管理員看得到這個分頁、所有分頁都可以編輯，也可以把別人設成管理員。Sparrow 固定是管理員。", mkAdmin: "設為管理員", unAdmin: "取消管理員", add: "＋ 加幹部", addName: "名字", addId: "Discord 使用者 ID（18 位數字）", addBtn: "加入", remove: "移除",
    tabs: { events: "📅 活動", map: "🗺️ 地圖", ranking: "📊 排名", post: "📢 公告", watch: "🕵️ 監看", scout: "🔭 偵察", views: "📈 瀏覽", board: "💬 留言板", attend: "📋 出席", bt: "🐻 熊隊計算" },
    lv: { edit: "✏️ 編輯", view: "👁️ 只看", none: "— 隱藏" }, saved: "✓ 已存到伺服器（所有裝置同步）", reset: "恢復預設", preview: "👁️ 用這個身分預覽", previewOff: "回到自己", previewing: "正在用 {name} 的權限預覽，分頁列和按鈕會照他的權限顯示。",
    roOn: "👁️ 這個分頁你只能看，不能修改。" },
  en: { rename: "Tap the name to change it (only how it's shown on the site; rights follow the Discord ID)", title: "👥 Officer rights", sub: "What each officer may do on each tab: ✏️ edit · 👁️ view only · — hidden. A newly added officer starts with Events 👁️ only.",
    trial: "This table is kept on the server: every device shows the same one, and only admins can change it. Still a trial: until the login system goes live, every tab stays open to every officer (👥 is admin-only).", saving: "Saving…", saveErr: "⚠️ Not saved on the server: {e} (your change is kept on this device; it will try again)", notAdmin: "⚠️ Only admins can change this table.", needLogin: "⚠️ Log in with Discord to save it on the server.", dbLimit: "⚠️ The server's free daily allowance is used up; it resets at 00:00 UTC.",
    you: "(you)", admin: "admin", adminNote: "Admins see this tab, may edit every tab and may make others admins. Sparrow is always an admin.", mkAdmin: "Make admin", unAdmin: "Remove admin", add: "+ Add officer", addName: "Name", addId: "Discord user ID (18 digits)", addBtn: "Add", remove: "Remove",
    tabs: { events: "📅 Events", map: "🗺️ Map", ranking: "📊 Ranking", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", board: "💬 Board", attend: "📋 Attendance", bt: "🐻 Bear calc" },
    lv: { edit: "✏️ Edit", view: "👁️ View", none: "— Hidden" }, saved: "✓ Saved on the server (same on every device)", reset: "Reset to defaults", preview: "👁️ Preview as", previewOff: "Back to myself", previewing: "Previewing with {name}'s rights — the tab list and buttons follow their rights.",
    roOn: "👁️ View only: you can look at this tab but not change it." },
  pt: { rename: "Toque no nome para mudar (só como aparece no site; as permissões seguem o ID do Discord)", title: "👥 Permissões dos oficiais", sub: "O que cada oficial pode fazer em cada aba: ✏️ editar · 👁️ só ver · — escondida. Um oficial novo começa só com Eventos 👁️.",
    trial: "Esta tabela fica no servidor: todos os aparelhos veem a mesma, e só admins podem mudar. Ainda em teste: até o login entrar no ar, todas as abas continuam abertas para todos os oficiais (👥 só para admins).", saving: "Salvando…", saveErr: "⚠️ Não foi salvo no servidor: {e} (a mudança fica neste aparelho; vai tentar de novo)", notAdmin: "⚠️ Só admins podem mudar esta tabela.", needLogin: "⚠️ Entre com o Discord para salvar no servidor.", dbLimit: "⚠️ A cota gratuita diária do servidor acabou; volta às 00:00 UTC.",
    you: "(você)", admin: "admin", adminNote: "Admins veem esta aba, podem editar todas as abas e tornar outros admins. Sparrow é sempre admin.", mkAdmin: "Tornar admin", unAdmin: "Tirar admin", add: "+ Adicionar oficial", addName: "Nome", addId: "ID de usuário do Discord (18 dígitos)", addBtn: "Adicionar", remove: "Remover",
    tabs: { events: "📅 Eventos", map: "🗺️ Mapa", ranking: "📊 Ranking", post: "📢 Anúncios", watch: "🕵️ Vigilância", scout: "🔭 Reconhecimento", views: "📈 Visitas", board: "💬 Mural", attend: "📋 Presença", bt: "🐻 Calc. do Urso" },
    lv: { edit: "✏️ Editar", view: "👁️ Ver", none: "— Escondida" }, saved: "✓ Salvo no servidor (igual em todos os aparelhos)", reset: "Voltar ao padrão", preview: "👁️ Ver como", previewOff: "Voltar a mim", previewing: "Vendo com as permissões de {name} — as abas e os botões seguem as permissões dele.",
    roOn: "👁️ Só leitura: você pode ver esta aba mas não mudar nada." },
};
let lang = OFFICER.lang;
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const PP = () => OFFICER.perms;   // { users: { id: { name, perms: { tab: "edit"|"view"|"none" } } } } — shared with core.js (replaced when the server copy arrives)
const TABS_P = ["events", "board", "map", "ranking", "attend", "post", "watch", "scout", "views"];   // same order as the tab bar   // 🐻 bear calculator is a public page now
function render() {
  const tt = t("tabs"), lv = t("lv"), me = OFFICER.user && OFFICER.user.id;
  const rows = Object.entries(PP().users);
  $("pm_tbl").innerHTML = `<table class="pm-tbl"><thead><tr><th></th>${TABS_P.map((k) => `<th>${esc(tt[k])}</th>`).join("")}<th></th></tr></thead><tbody>${rows.map(([id, u]) => {
    const admin = !!u.admin, owner = id === OFFICER.OWNER;
    return `<tr${OFFICER.previewAs === id ? ' class="pv"' : ""}><th><div><input class="pm-name" data-nm="${esc(id)}" value="${esc(u.name)}" maxlength="40" dir="auto" title="${esc(t("rename"))}"> ${id === me ? `<span class="muted">${esc(t("you"))}</span>` : ""}</div>${admin ? `<span class="pm-adm">${esc(t("admin"))}</span> ` : ""}<span class="muted" style="font-weight:400;font-size:11px">${esc(id)}</span></th>
      ${TABS_P.map((k) => admin ? `<td class="muted">✏️</td>` : `<td><select class="btn pm-sel" data-u="${esc(id)}" data-t="${k}">${["edit", "view", "none"].map((l) => `<option value="${l}"${(u.perms[k] || "none") === l ? " selected" : ""}>${esc(lv[l])}</option>`).join("")}</select></td>`).join("")}
      <td class="pm-acts">${id !== me ? `<button class="btn small" data-pv="${esc(id)}">${esc(OFFICER.previewAs === id ? t("previewOff") : t("preview"))}</button>` : ""}${owner || id === me ? "" : `<button class="btn small" data-adm="${esc(id)}">${esc(admin ? t("unAdmin") : t("mkAdmin"))}</button><button class="btn small" data-rm="${esc(id)}">${esc(t("remove"))}</button>`}</td></tr>`; }).join("")}</tbody></table>`;
  const pv = OFFICER.previewAs && PP().users[OFFICER.previewAs];
  $("pm_preview").hidden = !pv; if (pv) $("pm_preview").textContent = t("previewing").replace("{name}", pv.name);
}
function applyTexts() {
  $("pm_title").textContent = t("title"); $("pm_sub").textContent = t("sub"); $("pm_trial").textContent = t("trial"); $("pm_trial").hidden = !OFFICER.PERMS_TRIAL; $("pm_adminNote").textContent = t("adminNote");
  $("pm_addBtn").textContent = t("addBtn"); $("pm_name").placeholder = t("addName"); $("pm_id").placeholder = t("addId"); $("pm_addH").textContent = t("add"); $("pm_reset").textContent = t("reset");
  if (ROOT && !ROOT.hidden) render();
}
function stateText() { const st = OFFICER.permsState || ""; if (st === "saving") return t("saving"); if (st === "saved") return t("saved");
  if (st.startsWith("error:")) { const c = st.slice(6); return c === "not_admin" ? t("notAdmin") : c === "logged_out" ? t("needLogin") : c === "db_limit" ? t("dbLimit") : t("saveErr").replace("{e}", c); } return ""; }
function changed() { OFFICER.savePerms(); render(); }
window.addEventListener("nxs-perms", () => { if ($("pm_msg")) $("pm_msg").textContent = stateText(); if (ROOT && !ROOT.hidden && !(document.activeElement && document.activeElement.closest && document.activeElement.closest(".pm-name"))) render(); });
function init() {
  applyTexts(); render();
  ROOT.addEventListener("change", (e) => {
    const nm = e.target.closest(".pm-name");   // ✏️ the name is only a label on this site (the Discord ID is what counts), so admins can change it
    if (nm) { const v = nm.value.trim().slice(0, 40), u = PP().users[nm.dataset.nm]; if (!u) return; if (!v) { nm.value = u.name; return; } if (v !== u.name) { u.name = v; changed(); } return; }
    const s = e.target.closest(".pm-sel"); if (!s) return; PP().users[s.dataset.u].perms[s.dataset.t] = s.value; changed(); });
  ROOT.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.closest(".pm-name")) e.target.blur(); });
  ROOT.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.rm) { delete PP().users[b.dataset.rm]; if (OFFICER.previewAs === b.dataset.rm) OFFICER.previewAs = null; changed(); }
    if (b.dataset.pv) { OFFICER.setPreview(OFFICER.previewAs === b.dataset.pv ? null : b.dataset.pv); render(); }   // the 👥 tab hides itself; the bar at the bottom brings you back
    if (b.dataset.adm) { const u = PP().users[b.dataset.adm]; u.admin = !u.admin; if (u.admin) u.perms = {}; else u.perms = u.perms && Object.keys(u.perms).length ? u.perms : OFFICER.defaultPerms(); changed(); }
  });
  $("pm_addBtn").onclick = () => {
    const id = $("pm_id").value.trim(), name = $("pm_name").value.trim();
    if (!/^\d{17,20}$/.test(id) || !name) { $("pm_id").focus(); return; }
    PP().users[id] = PP().users[id] || { name, perms: OFFICER.defaultPerms() }; PP().users[id].name = name; if (id === OFFICER.OWNER) PP().users[id].admin = true;
    $("pm_id").value = ""; $("pm_name").value = ""; changed();
  };
  $("pm_reset").onclick = () => { OFFICER.resetPerms(); OFFICER.previewAs = null; changed(); };
}
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.perms = { init, onShow: () => { render(); OFFICER.fetchPerms(); OFFICER.ensure("post"); }, applyTexts, setLang };
})();
