/* NXS officer page — 📋 attendance tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.attend)
   One sheet per event type (Swordland, Tri-Alliance…). Each record on a sheet = one date + ONE list (usually imported from one
   shared plan of the 📊 Ranking tab): who confirmed (with substitutes marked), and after the battle who showed up.
   Kept on the Worker (Discord login). Names are matched against the roster like the ranking tab's paste box. */
(function () {
const ROOT = document.getElementById("pg-attend");
const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document.getElementById(id);
const esc = OFFICER.util.esc;
const ROSTER_URL = "data/roster-x7k2p9.json", PLAN_URL = "data/ranking-plans-x7k2p9.json";
const T = {
  zh: { planDeleted: "（計畫已刪除，名單保留）", planGoneKeep: "這份名單的計畫已經刪除了，名單照原樣保留，不會再變動。", planSec: "📋 共用計畫（來自排名分頁）", planNote: "每個活動先在排名分頁建一個共用計畫、勾人（可標替補），這裡就會出現它的出席名單。", makeList: "建立出席名單", noPlans: "還沒有共用計畫。先到排名分頁建立計畫並勾人。", reload: "🔄 依計畫更新名單", reloaded: "名單已依計畫更新（出席勾選保留）。", planGone: "這份名單的計畫已被刪除。", title: "📋 出席", sub: "每種活動一張表（聖劍、三盟…），表裡每個日期一份名單：說會來的人（可標替補），打完後勾誰真的到了。缺席會累計：第 2 次橘、第 3 次紅；⭐ 是戰力前 20。", login: "要先用 Discord 登入才能看出席名單。", loginBtn: "用 Discord 登入",
    newBtn: "＋ 新名單", sheet: "活動表", sheetPh: "活動名稱（例如 聖劍爭奪、三盟爭霸）", date: "日期", plan: "從排名分頁的共用計畫匯入", planNone: "（不匯入，手動加人）", planHint: "一份名單只放一個計畫。兩個軍團就分別建兩份。", create: "建立名單",
    confirmed: "① 說會來的人", paste: "貼上名單（一行一個，或用逗號分隔）", shot: "📷 或上傳投票者截圖", match: "比對成員表", ocrWait: "辨識中…", matched: "比對到 {n} 人", miss: "找不到（請手動加）：{list}", addMember: "手動加入成員…", subHint: "點名字切換「替補」，點 × 移除。替補沒到不算缺席。",
    present: "② 打完後：誰有到", presentNote: "點名字切換：✓ 有到 · X 沒到 · 🛌 請假（不算缺席）", allPresent: "全部有到", keysLine: "Keys: X = 沒到 · 橘 = 第 2 次缺席 · 紅 = 第 3 次以上 · 🛌 = 請假 · 替 = 替補 · ⭐ = 戰力前 20（次數自動累計）",
    save: "儲存", saved: "已儲存。", del: "刪除這份名單", delAsk: "確定刪除這份名單？", back: "‹ 全部活動表", empty: "還沒有名單。按「＋ 新名單」開始。",
    rate: "出席率", rateNote: "正選有到 ÷ 正選人數（請假不算、替補不算）。", missN: "缺席", events: "場次", name: "成員", noData: "成員表載不進來，無法比對名字。",
    copy: "複製給 Discord", copied: "已複製", nobody: "還沒有人。", sub2: "替補", err: "出了點問題：{e}", dbLimit: "⚠️ 伺服器今天的免費額度用完了，UTC 00:00 重置。" },
  en: { planDeleted: "(plan deleted, list kept)", planGoneKeep: "The plan behind this list was deleted; the list is kept exactly as it is.", planSec: "📋 Shared plans (from the Ranking tab)", planNote: "For each event, make a shared plan on the Ranking tab and tick people (subs can be marked); its attendance list appears here.", makeList: "Create attendance list", noPlans: "No shared plans yet. Make one on the Ranking tab and tick people.", reload: "🔄 Update from the plan", reloaded: "List updated from the plan (attendance marks kept).", planGone: "The plan behind this list was deleted.", title: "📋 Attendance", sub: "One sheet per event (Swordland, Tri-Alliance…); each date on a sheet is one list: who confirmed (subs can be marked), and after the battle who showed up. Misses add up: 2nd orange, 3rd red; ⭐ = top 20 by power.", login: "Log in with Discord to see attendance lists.", loginBtn: "Log in with Discord",
    newBtn: "＋ New list", sheet: "Event sheet", sheetPh: "Event (e.g. Swordland Showdown, Tri-Alliance Clash)", date: "Date", plan: "Import from a shared plan on the Ranking tab", planNone: "(no import, add people by hand)", planHint: "One list holds one plan. For two legions make two lists.", create: "Create list",
    confirmed: "① Confirmed (said yes)", paste: "Paste names (one per line or comma-separated)", shot: "📷 or upload voter screenshots", match: "Match roster", ocrWait: "Reading…", matched: "Matched {n}", miss: "Not found (add by hand): {list}", addMember: "Add a member by hand…", subHint: "Tap a name to toggle “sub”, × removes. A sub who doesn't show isn't a miss.",
    present: "② After the battle: who showed up", presentNote: "Tap a name to cycle: ✓ showed up · X no-show · 🛌 excused (not counted)", allPresent: "All showed up", keysLine: "Keys: X = missed · orange = 2nd miss · red = 3rd+ · 🛌 = excused · sub = substitute · ⭐ = top 20 (counted automatically)",
    save: "Save", saved: "Saved.", del: "Delete this list", delAsk: "Delete this list?", back: "‹ All sheets", empty: "No lists yet. Tap “＋ New list” to start.",
    rate: "Attendance", rateNote: "Starters who showed up ÷ starters (excused and subs not counted).", missN: "Missed", events: "Events", name: "Member", noData: "The roster didn't load, so names can't be matched.",
    copy: "Copy for Discord", copied: "Copied", nobody: "Nobody yet.", sub2: "sub", err: "Something went wrong: {e}", dbLimit: "⚠️ The server's free daily allowance is used up; it resets at 00:00 UTC." },
  pt: { planDeleted: "(plano excluído, lista mantida)", planGoneKeep: "O plano desta lista foi excluído; a lista fica exatamente como está.", planSec: "📋 Planos compartilhados (da aba Ranking)", planNote: "Para cada evento, crie um plano compartilhado na aba Ranking e marque as pessoas (reservas podem ser marcados); a lista de presença aparece aqui.", makeList: "Criar lista de presença", noPlans: "Ainda não há planos compartilhados. Crie um na aba Ranking e marque as pessoas.", reload: "🔄 Atualizar pelo plano", reloaded: "Lista atualizada pelo plano (marcações de presença mantidas).", planGone: "O plano desta lista foi excluído.", title: "📋 Presença", sub: "Uma planilha por evento (Confronto entre Espadas, Tri-Aliança…); cada data é uma lista: quem confirmou (reservas podem ser marcados) e, depois da batalha, quem apareceu. Faltas acumulam: 2ª laranja, 3ª vermelha; ⭐ = top 20 em poder.", login: "Entre com o Discord para ver as listas.", loginBtn: "Entrar com Discord",
    newBtn: "＋ Nova lista", sheet: "Planilha do evento", sheetPh: "Evento (ex.: Confronto entre Espadas, Confronto Tri-Aliança)", date: "Data", plan: "Importar de um plano compartilhado da aba Ranking", planNone: "(sem importar, adicionar à mão)", planHint: "Uma lista guarda um plano. Para duas legiões, faça duas listas.", create: "Criar lista",
    confirmed: "① Confirmados", paste: "Cole os nomes (um por linha ou separados por vírgula)", shot: "📷 ou envie capturas dos votantes", match: "Comparar com a lista", ocrWait: "Lendo…", matched: "{n} encontrados", miss: "Não encontrados (adicione à mão): {list}", addMember: "Adicionar membro à mão…", subHint: "Toque no nome para marcar “reserva”, × remove. Reserva que não aparece não conta como falta.",
    present: "② Depois da batalha: quem apareceu", presentNote: "Toque no nome para alternar: ✓ apareceu · X faltou · 🛌 justificado (não conta)", allPresent: "Todos apareceram", keysLine: "Legenda: X = faltou · laranja = 2ª falta · vermelho = 3ª ou mais · 🛌 = justificado · res = reserva · ⭐ = top 20 (contado automaticamente)",
    save: "Salvar", saved: "Salvo.", del: "Excluir esta lista", delAsk: "Excluir esta lista?", back: "‹ Todas as planilhas", empty: "Ainda não há listas. Toque em “＋ Nova lista”.",
    rate: "Presença", rateNote: "Titulares que apareceram ÷ titulares (justificados e reservas não contam).", missN: "Faltas", events: "Eventos", name: "Membro", noData: "A lista de membros não carregou; não dá para comparar nomes.",
    copy: "Copiar para o Discord", copied: "Copiado", nobody: "Ninguém ainda.", sub2: "res", err: "Algo deu errado: {e}", dbLimit: "⚠️ A cota gratuita diária do servidor acabou; volta às 00:00 UTC." },
  ar: { planDeleted: "(حُذفت الخطة، القائمة محفوظة)", planGoneKeep: "حُذفت الخطة الخاصة بهذه القائمة؛ تبقى القائمة كما هي تمامًا.", planSec: "📋 الخطط المشتركة (من تبويب الترتيب)", planNote: "لكل فعالية أنشئ خطة مشتركة في تبويب الترتيب وحدّد الأشخاص (يمكن تمييز البدلاء)؛ تظهر قائمة الحضور هنا.", makeList: "إنشاء قائمة حضور", noPlans: "لا توجد خطط مشتركة بعد. أنشئ واحدة في تبويب الترتيب وحدّد الأشخاص.", reload: "🔄 تحديث من الخطة", reloaded: "تم تحديث القائمة من الخطة (علامات الحضور محفوظة).", planGone: "حُذفت الخطة الخاصة بهذه القائمة.", title: "📋 الحضور", sub: "جدول لكل فعالية (أرض السيوف، التحالف الثلاثي…)؛ كل تاريخ في الجدول قائمة واحدة: من أكّد (يمكن تمييز البدلاء)، وبعد المعركة من حضر. الغيابات تتراكم: الثاني برتقالي، الثالث أحمر؛ ⭐ = أقوى 20.", login: "سجّل الدخول عبر Discord لرؤية القوائم.", loginBtn: "تسجيل الدخول عبر Discord",
    newBtn: "＋ قائمة جديدة", sheet: "جدول الفعالية", sheetPh: "الفعالية (مثل مواجهة أرض السيوف، صراع التحالف الثلاثي)", date: "التاريخ", plan: "استيراد من خطة مشتركة في تبويب الترتيب", planNone: "(بدون استيراد، إضافة يدوية)", planHint: "القائمة الواحدة تحمل خطة واحدة. لكتيبتين أنشئ قائمتين.", create: "إنشاء القائمة",
    confirmed: "① المؤكدون", paste: "الصق الأسماء (اسم في كل سطر أو مفصولة بفواصل)", shot: "📷 أو ارفع لقطات المصوّتين", match: "مطابقة مع القائمة", ocrWait: "جارٍ القراءة…", matched: "تمت مطابقة {n}", miss: "غير موجود (أضفه يدويًا): {list}", addMember: "إضافة عضو يدويًا…", subHint: "اضغط على الاسم لتبديل «بديل»، × للحذف. غياب البديل لا يُحتسب.",
    present: "② بعد المعركة: من حضر", presentNote: "اضغط على الاسم للتبديل: ✓ حضر · X غاب · 🛌 معذور (لا يُحتسب)", allPresent: "حضر الجميع", keysLine: "المفتاح: X = غاب · برتقالي = الغياب الثاني · أحمر = الثالث فأكثر · 🛌 = معذور · بديل · ⭐ = أقوى 20 (يُحسب تلقائيًا)",
    save: "حفظ", saved: "تم الحفظ.", del: "حذف هذه القائمة", delAsk: "حذف هذه القائمة؟", back: "‹ كل الجداول", empty: "لا توجد قوائم بعد. اضغط «＋ قائمة جديدة».",
    rate: "الحضور", rateNote: "الأساسيون الحاضرون ÷ الأساسيون (المعذورون والبدلاء لا يُحسبون).", missN: "غياب", events: "الفعاليات", name: "العضو", noData: "لم تُحمَّل قائمة الأعضاء، فلا يمكن مطابقة الأسماء.",
    copy: "نسخ إلى Discord", copied: "تم النسخ", nobody: "لا أحد بعد.", sub2: "بديل", err: "حدث خطأ: {e}", dbLimit: "⚠️ نفدت حصة الخادم المجانية لليوم، وتتجدد عند 00:00 UTC." },
  ko: { planDeleted: "(계획 삭제됨, 명단 유지)", planGoneKeep: "이 명단의 계획은 삭제되었어요. 명단은 지금 그대로 유지돼요.", planSec: "📋 공유 계획 (순위 탭)", planNote: "이벤트마다 순위 탭에서 공유 계획을 만들고 사람을 체크하면(후보 표시 가능) 여기에 출석 명단이 생깁니다.", makeList: "출석 명단 만들기", noPlans: "아직 공유 계획이 없어요. 순위 탭에서 계획을 만들고 사람을 체크하세요.", reload: "🔄 계획대로 명단 갱신", reloaded: "계획대로 명단을 갱신했어요 (출석 표시는 유지).", planGone: "이 명단의 계획이 삭제되었어요.", title: "📋 출석", sub: "이벤트마다 시트 하나(성검, 삼대 연맹전…); 시트의 각 날짜가 명단 하나: 온다고 한 사람(후보 표시 가능), 전투 후 실제로 온 사람. 불참은 누적: 2번째 주황, 3번째 빨강; ⭐ = 전투력 상위 20.", login: "출석 명단을 보려면 Discord로 로그인하세요.", loginBtn: "Discord로 로그인",
    newBtn: "＋ 새 명단", sheet: "이벤트 시트", sheetPh: "이벤트 (예: 성검 쟁탈, 삼대 연맹전)", date: "날짜", plan: "순위 탭의 공유 계획에서 가져오기", planNone: "(가져오지 않고 직접 추가)", planHint: "명단 하나에 계획 하나. 군단이 둘이면 명단을 둘 만드세요.", create: "명단 만들기",
    confirmed: "① 온다고 한 사람", paste: "명단 붙여넣기 (한 줄에 하나 또는 쉼표로 구분)", shot: "📷 또는 투표자 스크린샷 업로드", match: "명단과 대조", ocrWait: "읽는 중…", matched: "{n}명 일치", miss: "못 찾음 (직접 추가): {list}", addMember: "직접 추가…", subHint: "이름을 누르면 “후보” 전환, ×는 제거. 후보의 불참은 세지 않아요.",
    present: "② 전투 후: 누가 왔나", presentNote: "이름을 눌러 전환: ✓ 옴 · X 불참 · 🛌 양해 (세지 않음)", allPresent: "전원 참석", keysLine: "Keys: X = 불참 · 주황 = 2번째 · 빨강 = 3번째 이상 · 🛌 = 양해 · 후보 · ⭐ = 상위 20 (자동 집계)",
    save: "저장", saved: "저장됨.", del: "이 명단 삭제", delAsk: "이 명단을 삭제할까요?", back: "‹ 전체 시트", empty: "아직 명단이 없어요. “＋ 새 명단”을 누르세요.",
    rate: "출석률", rateNote: "참석한 주전 ÷ 주전 인원 (양해·후보 제외).", missN: "불참", events: "횟수", name: "멤버", noData: "멤버 명단을 불러오지 못해 이름을 대조할 수 없어요.",
    copy: "Discord용 복사", copied: "복사됨", nobody: "아직 아무도 없어요.", sub2: "후보", err: "문제가 생겼어요: {e}", dbLimit: "⚠️ 서버의 오늘 무료 할당량을 다 썼어요. UTC 00:00에 초기화돼요." },
};
let lang = OFFICER.lang;
const t = (k, v = {}) => String((T[lang] && T[lang][k]) ?? T.en[k] ?? k).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const token = () => { try { return localStorage.getItem(DISCORD_LS); } catch (e) { return null; } };
const core = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/nexus/g, "").replace(/[^\p{L}\p{N}]/gu, "");
let roster = null, plans = {}, events = [], cur = null, lastErr = null, busy = false;
const canEdit = () => OFFICER.can("attend", "edit");
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const S = (x) => String(x);

async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/attend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw Object.assign(new Error(j.error || "HTTP " + r.status), { code: j.error, detail: j.detail });
  return j;
}
const errText = (e) => (e.code === "db_limit" || /limit|exceed|quota|allow/i.test(String(e.message))) ? t("dbLimit") : t("err", { e: e.message + (e.detail ? " — " + [].concat(e.detail).join("; ").slice(0, 160) : "") });

function matchNames(names) {
  const hit = [], miss = [];
  for (const nm of names) {
    const c = core(nm); if (!c) continue;
    let m = roster.members.filter((x) => core(x.name) === c);
    if (!m.length && c.length >= 3) m = roster.members.filter((x) => core(x.name).includes(c) || c.includes(core(x.name)));
    if (m.length === 1) hit.push({ id: S(m[0].id), name: m[0].name }); else miss.push(nm + (m.length > 1 ? " (?)" : ""));
  }
  return { hit, miss };
}
const top20 = () => { if (!roster) return new Set(); return new Set([...roster.members].filter((m) => m.power > 0).sort((a, b) => b.power - a.power).slice(0, 20).map((m) => S(m.id))); };
let TOP = new Set();
const star = (id) => TOP.has(S(id)) ? "⭐ " : "";
/* one list per record: ev.slots[0] */
const slot = (ev) => ev.slots[0];
const statusOf = (sl, id) => { id = S(id); return sl.present.map(S).includes(id) ? "ok" : sl.excused.map(S).includes(id) ? "ex" : "no"; };
/* starters only (subs don't count as misses): id → { name, miss } */
const missesOf = (ev) => { const out = new Map(); const sl = slot(ev); for (const m of sl.confirmed) { if (m.sub) continue; const st = statusOf(sl, m.id); if (st !== "ex") out.set(S(m.id), { name: m.name, miss: st === "no" }); } return out; };
const rateOf = (ev) => { const m = [...missesOf(ev).values()]; const n = m.length, ok = m.filter((x) => !x.miss).length; return { n, ok, pct: n ? Math.round(ok / n * 100) : null }; };
const sheetOf = (ev) => (ev.sheet || ev.title || "").trim();
/* misses on the same sheet, counting this record and every saved one up to its date */
function missCounts(ev) {
  const cnt = new Map(), list = [ev, ...events.filter((e) => e.id !== ev.id && sheetOf(e) === sheetOf(ev) && (e.date || "") <= (ev.date || ""))];
  for (const e of list) for (const [id, v] of missesOf(e)) if (v.miss) cnt.set(id, (cnt.get(id) || 0) + 1);
  return cnt;
}
const nth = (n) => n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : n + "th";
const ssName = () => { const ss = typeof EVENT_NAMES !== "undefined" && EVENT_NAMES["Swordland Showdown"]; return (ss && (ss[lang] || ss.en)) || "Swordland Showdown"; };

/* ---------- views ---------- */
function applyTexts() {
  document.documentElement.lang = HTML_LANG(lang);
  $("at_title").textContent = t("title"); $("at_sub").textContent = t("sub");
  $("at_login").innerHTML = `<p style="margin:0 0 10px">${esc(t("login"))}</p><a class="btn" style="background:#5865F2;border-color:#5865F2;color:#fff;font-weight:700" href="${esc(discordStart())}">${esc(t("loginBtn"))}</a>`;
  $("at_newBtn").textContent = t("newBtn"); $("at_back").textContent = t("back");
  render();
}
function render() {
  const logged = !!((OFFICER.user && token()) || OFFICER.pw);
  $("at_login").hidden = logged; $("at_app").hidden = !logged;
  if (!logged) return;
  $("at_list").hidden = !!cur; $("at_edit").hidden = !cur; $("at_newBtn").hidden = true;
  if (cur) renderEdit(); else renderList();
}
function renderList() {
  const err = lastErr ? `<div class="msg warn">${esc(errText(lastErr))}</div>` : "";
  let h = err + plansHtml();
  if (!events.length) { $("at_list").innerHTML = h; wirePlans(); return; }
  const sheets = new Map();
  for (const ev of events) { const k = sheetOf(ev); if (!sheets.has(k)) sheets.set(k, []); sheets.get(k).push(ev); }
  for (const [name, list] of sheets) {
    list.sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.at - a.at);
    // per-member misses on this sheet (recent 8), for the summary
    const recent = list.slice(0, 8), rows = new Map();
    recent.forEach((ev, i) => { for (const [id, v] of missesOf(ev)) { const r = rows.get(id) || { name: v.name, n: 0, miss: 0, seq: [] }; r.n++; if (v.miss) r.miss++; r.seq[i] = v.miss ? "X" : "✓"; r.name = v.name; rows.set(id, r); } });
    const bad = [...rows.entries()].filter(([, r]) => r.miss > 0).sort((a, b) => b[1].miss - a[1].miss || (TOP.has(b[0]) - TOP.has(a[0])) || a[1].name.localeCompare(b[1].name));
    const cls = (r) => r.miss >= 3 ? "red" : r.miss === 2 ? "orange" : "";
    h += `<div class="card at-sheet"><h3 style="margin:0 0 6px" dir="auto">${esc(name || "—")}</h3>
      <table class="at-sum"><thead><tr><th>${esc(t("date"))}</th><th></th><th>${esc(t("rate"))}</th><th></th></tr></thead><tbody>${list.map((ev) => { const r = rateOf(ev), sl = slot(ev);
        return `<tr class="at-ev" data-id="${esc(ev.id)}" style="cursor:pointer"><td>${esc(ev.date || "")}</td><td dir="auto" class="muted">${esc(sl.name || "")}</td><td><b>${r.pct == null ? "—" : r.pct + "%"}</b> <span class="muted">${r.ok}/${r.n}</span></td><td>›</td></tr>`; }).join("")}</tbody></table>
      <div class="muted" style="font-size:12px;margin-top:4px">${esc(t("rateNote"))}</div>` +
      (bad.length ? `<table class="at-sum" style="margin-top:10px"><thead><tr><th>${esc(t("name"))}</th><th>${esc(t("missN"))}</th><th>${esc(t("events"))}</th><th></th></tr></thead><tbody>${bad.map(([id, r]) => `<tr class="${cls(r)}"><td dir="auto">${star(id)}${esc(r.name)}</td><td><b>${r.miss}</b></td><td>${r.n}</td><td class="seq">${recent.map((_, i) => r.seq[i] || "·").join(" ")}</td></tr>`).join("")}</tbody></table>` : "") + `</div>`;
  }
  $("at_list").innerHTML = h;
  $("at_list").querySelectorAll(".at-ev").forEach((b) => b.onclick = () => { cur = JSON.parse(JSON.stringify(events.find((e) => e.id === b.dataset.id))); render(); });
  wirePlans();
}
/* 📋 one shared plan (Ranking tab) = one event: its attendance list is made from here */
const planList = () => Object.entries(plans).filter(([, p]) => (p.picked || []).length).sort((a, b) => (b[1].at || 0) - (a[1].at || 0));
function plansHtml() {
  const pl = planList();
  const rows = pl.map(([id, p]) => { const n = (p.picked || []).length, k = (p.subs || []).length, ev = events.filter((e) => e.plan === id).sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0];
    return `<tr><td dir="auto"><b>${esc(p.name || id)}</b> <span class="muted">${n - k}${k ? " +" + k + " " + esc(t("sub2")) : ""}</span></td><td style="text-align:end">${ev ? `<button type="button" class="btn small at-open" data-id="${esc(ev.id)}">${esc(ev.date || "")} ›</button>` : canEdit() ? `<button type="button" class="btn small at-make" data-plan="${esc(id)}">${esc(t("makeList"))}</button>` : ""}</td></tr>`; }).join("");
  // a plan deleted on the Ranking tab stays here if a list was made from it (that list is kept as it was); otherwise it just disappears
  const gone = new Map(); for (const e of events) if (e.plan && !plans[e.plan]) { const g = gone.get(e.plan); if (!g || (e.date || "") > (g.date || "")) gone.set(e.plan, e); }
  const goneRows = [...gone.values()].map((ev) => `<tr><td dir="auto"><b>${esc(slot(ev).name || sheetOf(ev))}</b> <span class="muted">${esc(t("planDeleted"))}</span></td><td style="text-align:end"><button type="button" class="btn small at-open" data-id="${esc(ev.id)}">${esc(ev.date || "")} ›</button></td></tr>`).join("");
  return `<div class="card"><h3 style="margin:0 0 4px">${esc(t("planSec"))}</h3><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("planNote"))}</div>${pl.length || goneRows ? `<table class="at-sum"><tbody>${rows}${goneRows}</tbody></table>` : `<div class="muted">${esc(t("noPlans"))}</div>`}</div>`;
}
function wirePlans() {
  $("at_list").querySelectorAll(".at-make").forEach((b) => b.onclick = () => createFromPlan(b.dataset.plan));
  $("at_list").querySelectorAll(".at-open").forEach((b) => b.onclick = () => { cur = JSON.parse(JSON.stringify(events.find((e) => e.id === b.dataset.id))); render(); });
}
/* the plan's ticked people → confirmed list (subs flagged). Date guessed from "10/18" in the plan name. */
function planPeople(p) {
  const byId = new Map(((roster && roster.members) || []).map((m) => [S(m.id), m])), subs = new Set((p.subs || []).map(S));
  return (p.picked || []).map((id) => byId.get(S(id))).filter(Boolean).map((m) => ({ id: S(m.id), name: m.name, ...(subs.has(S(m.id)) ? { sub: 1 } : {}) }));
}
function createFromPlan(pid) {
  const p = plans[pid]; if (!p) return;
  const now = new Date(); let date = now.toISOString().slice(0, 10);
  const m = String(p.name || "").match(/(\d{1,2})[\/.](\d{1,2})/);
  if (m) { const d = new Date(Date.UTC(now.getUTCFullYear(), +m[1] - 1, +m[2])); if (d.getTime() < now.getTime() - 200 * 864e5) d.setUTCFullYear(d.getUTCFullYear() + 1); date = d.toISOString().slice(0, 10); }
  cur = { id: rid(), plan: pid, title: ssName(), sheet: ssName(), date, slots: [{ name: p.name || "", confirmed: planPeople(p), present: [], excused: [] }] };
  render();
}
function reloadFromPlan() {
  const p = plans[cur.plan], sl = slot(cur); const msg = $("at_msg");
  if (!p) { if (msg) msg.textContent = t("planGone"); return; }
  const fresh = planPeople(p), keep = new Set(fresh.map((m) => m.id));
  sl.confirmed = fresh; if (p.name) sl.name = p.name;   // a renamed plan renames the list too sl.present = sl.present.filter((x) => keep.has(S(x))); sl.excused = sl.excused.filter((x) => keep.has(S(x)));
  renderEdit(); $("at_msg").textContent = t("reloaded");
}
function renderEdit() {
  const ro = !canEdit(), sl = slot(cur), cnt = missCounts(cur);
  const chips = sl.confirmed.length ? sl.confirmed.map((m) => `<span class="chip${m.sub ? " is-sub" : ""}" dir="auto"><button type="button" class="chip-n" data-sub="${esc(m.id)}" ${ro ? "disabled" : ""}>${star(m.id)}${esc(m.name)}${m.sub ? ` <small>${esc(t("sub2"))}</small>` : ""}</button>${ro ? "" : `<button type="button" class="chip-x" data-del="${esc(m.id)}">×</button>`}</span>`).join("") : `<span class="muted">${esc(t("nobody"))}</span>`;
  const plist = sl.confirmed.map((m) => { const st = statusOf(sl, m.id), n = st === "no" && !m.sub ? (cnt.get(S(m.id)) || 1) : 0;
    return `<button type="button" class="at-p ${st}${m.sub ? " issub" : ""}${n >= 3 ? " m3" : n === 2 ? " m2" : ""}" data-tog="${esc(m.id)}" ${ro ? "disabled" : ""} dir="auto">${st === "ok" ? "✓" : st === "ex" ? "🛌" : "X"} ${star(m.id)}${esc(m.name)}${m.sub ? ` <small>${esc(t("sub2"))}</small>` : ""}${n >= 2 ? ` <small>(${nth(n)})</small>` : ""}</button>`; }).join("");
  const r = rateOf(cur);
  let h = `<div class="card"><div class="row"><input class="inp" id="at_evSheet" placeholder="${esc(t("sheetPh"))}" value="${esc(sheetOf(cur))}" ${ro ? "disabled" : ""} style="flex:1;min-width:160px"><input class="inp" id="at_evDate" type="date" value="${esc(cur.date || "")}" ${ro ? "disabled" : ""}><input class="inp" id="at_evSlot" placeholder="Legion 1" value="${esc(sl.name || "")}" ${ro ? "disabled" : ""} style="width:110px">${!ro && cur.plan && plans[cur.plan] ? `<button type="button" class="btn" id="at_reload">${esc(t("reload"))}</button>` : ""}</div>${cur.plan && !plans[cur.plan] && Object.keys(plans).length ? `<div class="muted" style="font-size:12.5px;margin-top:6px">${esc(t("planGoneKeep"))}</div>` : ""}</div>
    <div class="card"><h4>${esc(t("confirmed"))} · ${sl.confirmed.length}</h4><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("subHint"))}</div><div class="chips">${chips}</div>
      ${ro ? "" : `<textarea class="inp" id="at_paste" rows="2" placeholder="${esc(t("paste"))}" style="width:100%;margin-top:8px"></textarea>
      <div class="row" style="margin-top:6px;align-items:center"><button type="button" class="btn" id="at_match">${esc(t("match"))}</button><label class="btn" style="cursor:pointer">${esc(t("shot"))}<input type="file" accept="image/*" multiple id="at_shot" hidden></label>
      <select class="inp" id="at_add" style="max-width:200px"><option value="">${esc(t("addMember"))}</option>${roster ? roster.members.filter((m) => !sl.confirmed.some((c) => S(c.id) === S(m.id))).sort((a, b) => a.name.localeCompare(b.name)).map((m) => `<option value="${esc(m.id)}">${esc(m.name)}</option>`).join("") : ""}</select></div>
      <div class="msg" id="at_pmsg"></div>`}</div>
    <div class="card"><h4>${esc(t("present"))} · ${esc(t("rate"))} ${r.pct == null ? "—" : r.pct + "%"} <span class="muted">(${r.ok}/${r.n})</span></h4>
      <div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("presentNote"))}<br><b>${esc(t("keysLine"))}</b></div>
      ${ro || !sl.confirmed.length ? "" : `<button type="button" class="btn small" id="at_all" style="margin-bottom:6px">${esc(t("allPresent"))}</button>`}<div class="at-plist">${plist}</div></div>
    <div class="row" style="margin-top:4px;align-items:center">${ro ? "" : `<button type="button" class="btn primary" id="at_save">${esc(t("save"))}</button>`}<button type="button" class="btn" id="at_copy">${esc(t("copy"))}</button>${ro || !events.some((e) => e.id === cur.id) ? "" : `<button type="button" class="btn danger" id="at_del">${esc(t("del"))}</button>`}<span class="msg" id="at_msg"></span></div>`;
  if (!roster) h = `<div class="msg warn">${esc(t("noData"))}</div>` + h;
  const box = $("at_edit_body"); box.innerHTML = h;
  wireCopy();
  if (ro) return;
  $("at_evSheet").oninput = (e) => { cur.sheet = cur.title = e.target.value; };
  $("at_evDate").oninput = (e) => { cur.date = e.target.value; };
  $("at_evSlot").oninput = (e) => { sl.name = e.target.value; };
  box.querySelectorAll("[data-sub]").forEach((el) => el.onclick = () => { const m = sl.confirmed.find((x) => S(x.id) === el.dataset.sub); if (m) { if (m.sub) delete m.sub; else m.sub = 1; } renderEdit(); });
  box.querySelectorAll("[data-del]").forEach((el) => el.onclick = () => { const id = el.dataset.del; sl.confirmed = sl.confirmed.filter((m) => S(m.id) !== id); sl.present = sl.present.filter((x) => S(x) !== id); sl.excused = sl.excused.filter((x) => S(x) !== id); renderEdit(); });
  $("at_match").onclick = () => addNames($("at_paste").value.split(/[\n,，]+/).map((s) => s.replace(/^[\s\-•*\d.)]+/, "").trim()).filter(Boolean));
  $("at_shot").onchange = () => ocr([...$("at_shot").files]);
  $("at_add").onchange = () => { const m = roster && roster.members.find((x) => S(x.id) === $("at_add").value); if (m) addMembers([{ id: S(m.id), name: m.name }]); };
  box.querySelectorAll("[data-tog]").forEach((el) => el.onclick = () => { const id = el.dataset.tog, st = statusOf(sl, id);
    sl.present = sl.present.filter((x) => S(x) !== id); sl.excused = sl.excused.filter((x) => S(x) !== id);
    if (st === "no") sl.present.push(id); else if (st === "ok") sl.excused.push(id);   // no → ok → excused → no
    renderEdit(); });
  if ($("at_all")) $("at_all").onclick = () => { sl.present = sl.confirmed.map((m) => S(m.id)); sl.excused = []; renderEdit(); };
  $("at_save").onclick = save;
  if ($("at_reload")) $("at_reload").onclick = reloadFromPlan;
  if ($("at_del")) $("at_del").onclick = async () => { if (!confirm(t("delAsk"))) return; try { await api("del", { id: cur.id }); events = events.filter((e) => e.id !== cur.id); cur = null; render(); } catch (e) { $("at_msg").textContent = errText(e); } };
}
function wireCopy() { $("at_copy").onclick = () => {
  const cnt = missCounts(cur), sl = slot(cur), r = rateOf(cur);
  const lines = [`${sheetOf(cur)} ${cur.date || ""}${sl.name ? " — " + sl.name : ""} · ${r.ok}/${r.n}${r.pct == null ? "" : " (" + r.pct + "%)"}`, "Keys: X = missed · (2nd) / (3rd) = repeat miss · 🛌 = excused · (sub) = substitute · ⭐ = top 20", ""];
  for (const m of sl.confirmed) { const st = statusOf(sl, m.id), n = m.sub ? 0 : (cnt.get(S(m.id)) || 0);
    lines.push(`- ${star(m.id)}${m.name}${m.sub ? " (sub)" : ""}${st === "no" ? ": X" + (n >= 2 ? ` (${nth(n)} miss)` : "") : st === "ex" ? ": 🛌" : ""}`); }
  navigator.clipboard.writeText(lines.join("\n")).then(() => { $("at_msg").textContent = t("copied"); }); }; }
function addMembers(list) { const sl = slot(cur); for (const m of list) { const id = S(m.id); if (!sl.confirmed.some((c) => S(c.id) === id)) sl.confirmed.push({ id, name: m.name }); } renderEdit(); }
function addNames(names) {
  if (!roster) return;
  const { hit, miss } = matchNames(names);
  addMembers(hit);
  const el = $("at_pmsg");
  if (el) el.innerHTML = esc(t("matched", { n: hit.length })) + (miss.length ? `<br><span class="warn">${esc(t("miss", { list: miss.join(", ") }))}</span>` : "");
}
async function ocr(files) {
  if (!files.length || busy) return; busy = true;
  const el = $("at_pmsg"); if (el) el.textContent = t("ocrWait");
  try { const images = await Promise.all(files.slice(0, 6).map(shrink)); const r = await api("ocr", { images }); addNames(r.names); }
  catch (e) { if (el) el.textContent = errText(e); }
  busy = false;
}
function shrink(file) { return new Promise((res, rej) => { const img = new Image(); img.onload = () => { const k = Math.min(1, 1400 / Math.max(img.width, img.height)); const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", 0.85)); }; img.onerror = rej; img.src = URL.createObjectURL(file); }); }
async function save() {
  const msg = $("at_msg"); msg.textContent = "…";
  try { await api("save", { ev: cur }); const i = events.findIndex((e) => e.id === cur.id); const copy = JSON.parse(JSON.stringify(cur)); if (i < 0) events.unshift(copy); else events[i] = copy; msg.textContent = t("saved"); }
  catch (e) { msg.textContent = errText(e); }
}
async function load() {
  lastErr = null;
  try { const r = await api("list"); events = r.events.map((e) => { const sl = (e.slots || [])[0] || {}; return { ...e, plan: e.plan || "", sheet: e.sheet || e.title || "", slots: [{ name: sl.name || "", confirmed: (sl.confirmed || []).map((m) => ({ ...m, id: S(m.id) })), present: (sl.present || []).map(S), excused: (sl.excused || []).map(S) }] }; }); }
  catch (e) { lastErr = e; }
  render();
}
function init() {
  $("at_back").onclick = () => { cur = null; render(); };
  OfficerData.fetchJsonFast(ROSTER_URL, (d) => { roster = d; TOP = top20(); render(); }).then((d) => { if (d) roster = d; TOP = top20(); render(); }).catch(() => {});
  OfficerData.fetchJsonFast(PLAN_URL, (d) => { plans = (d && d.plans) || {}; render(); }).then((d) => { if (d) plans = d.plans || {}; render(); }).catch(() => {});
  applyTexts();
}
async function freshPlans() {
  try { const r = OFFICER_PAGES.ranking; const p = r && r.freshPlans ? await r.freshPlans() : null; if (p && Object.keys(p).length) { plans = p; render(); return; } } catch (e) {}
  try { const d = await OfficerData.fetchJsonFast(PLAN_URL, (d) => { plans = (d && d.plans) || {}; render(); }); if (d) { plans = d.plans || {}; render(); } } catch (e) {}
}
function onShow() {
  if ((OFFICER.user && token()) || OFFICER.pw) load(); else render();
  freshPlans();   // plans edited on the Ranking tab just now
}
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.attend = { init, onShow, applyTexts, setLang };
})();
