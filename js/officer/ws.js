/* NXS officer page — 🗂️ My workspace (registers OFFICER_PAGES.ws). Sherry 2026-11-22, replanned 2026-11-23.
   A private page per admin, built around what that person is responsible for:
     🎯 My events    — the events they own (who owns what is kept on the Worker by Discord id), running now or starting within 2 days,
                       with that event's officer to-dos; nothing to type.
     📨 From Sparrow — things Sparrow sent them: tick, or answer if it is a question. On Sparrow's own page this card is "For <person>".
     📣 Kingdom timeline to announce (before the 3rd KvK from now).
     📝 Notes.
   Sparrow's own page has more: today's repeating items, ongoing work, questions to look up, her own list, and her "📤 For Claude" part.
   Stored on the Worker (/ws), apart from every other officer data. Only the person opens their page; Sparrow can also open another
   person's page, read-only. Nothing from it goes to the site AI or to Little Sparrow. No names in this file. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const DAY = 86400000;
let lang = OFFICER.lang || "en";
let D = null, MINE = null, VIEW = "", OTHERS = [], PEOPLE = [], OUT = {}, OWNERS = {}, INBOX = [], MYEV = [], MYPARTS = {}, MYDUTY = [], EDIT = null, PICK = false, TO = "", BUSY = false, ERR = "";
const T = {
  en: { title: "🗂️ My workspace", lead: "Only you can see this page. The site AI and Little Sparrow never read it.", leadO: "Sparrow can also open it (read only) to check that it works.",
    seeing: "Whose page", mine: "Mine", ro: "👁️ You are looking at {n}'s page. You can't change it.", utc: "UTC",
    ev: "🎯 My events", evNone: "None of your events is running today or starts in the next 2 days.", evLater: "Later", evOther: "Also on today:", evPick: "✏️ Choose my events", evPickFor: "Tick the events this person is responsible for.", evNoPick: "No events chosen yet.",
    duty: "📌 Standing duties", partPh: "their part of it (optional)", dutyPh: "Standing duties that are not an event — one per line",
    day: "Day {a} of {b}", starts: "starts in {n} d · {d}", ours: "our times", today: "Today", tomorrow: "Tomorrow",
    bearOn: "{b} is on the registration deadline day ({d}, our times {t}).", bearBefore: "{b} is the day before the registration deadline ({d}, our times {t}); none on the deadline day itself.",
    box: "📨 From Sparrow", boxNone: "Nothing right now.", ansPh: "Your answer…", send: "Send", isQ: "It is a question (they can answer here)", boxFor: "📨 For", boxPh: "What do you want to tell or ask them?", copyMsg: "📋 Copy as a message", copied: "Copied ✓", sel: "Select the text and copy it.", noPeople: "No other admin yet.", answered: "answered", seen: "done", waiting: "waiting",
    ann: "📣 Coming on the kingdom timeline", annSub: "Everything that arrives before the 3rd KvK from now ({d}). Tick it once it has been announced.", annDone: "announced", annNone: "Nothing new before then.", inDays: "in {n} days",
    peek: "🔮 Sneak peek", peekSub: "Official previews of coming events, from the Kingshot Wiki. Checked three times a day. Tick one once you have read it.", peekNew: "new", peekNone: "No preview in the last 30 days.", peekLast: "Last one:", todayC: "Today", none: "Nothing for today.", late: "late", rep: "+ Repeating item", daily: "🔁 Every day", event: "📅 With an event", once: "📝 My own", q: "❓ To look up", proj: "🚧 Ongoing", notes: "📝 My notes",
    addPh: "Add… (Enter)", save: "💾 Save", cancel: "Cancel", del: "🗑", edit: "✏️", kind: "Kind", text: "What", note: "Note / next step", evF: "Event", dayN: "Day of the event (1 = first day, 0 = the day before)", at: "Time (UTC, optional)", date: "Date (optional)", ans: "Answer", found: "Found",
    needText: "Write what it is first.", needEv: "Pick an event.", saved: "Saved ✓", saving: "Saving…", conflict: "This page was changed on another device. It has been reloaded — do the change again.", fail: "Could not save. Try again.", loadFail: "Could not load the page." },
  zh: { title: "🗂️ 我的工作區", lead: "這一頁只有你自己看得到。網站 AI 和小麻雀都不會讀這裡的內容。", leadO: "Sparrow 也能打開（只能看），用來確認有沒有問題。",
    seeing: "看誰的", mine: "我的", ro: "👁️ 你正在看 {n} 的頁面，不能修改。", utc: "UTC",
    ev: "🎯 我負責的活動", evNone: "今天和未來 2 天沒有你負責的活動。", evLater: "之後", evOther: "今天還有：", evPick: "✏️ 選擇我負責的活動", evPickFor: "勾選這個人負責的活動。", evNoPick: "還沒選活動。",
    duty: "📌 固定職責", partPh: "負責的部分（可不填）", dutyPh: "不屬於活動的固定職責，一行一項",
    day: "第 {a} 天／共 {b} 天", starts: "{n} 天後開始 · {d}", ours: "我們的時間", today: "今天", tomorrow: "明天",
    bearOn: "{b}在報名截止當天（{d}，我們的時間 {t}）。", bearBefore: "{b}在報名截止前一天（{d}，我們的時間 {t}）；截止當天沒有熊。",
    box: "📨 Sparrow 給我的事", boxNone: "目前沒有。", ansPh: "你的回答…", send: "送出", isQ: "這是一個問題（對方可以在這裡回答）", boxFor: "📨 給", boxPh: "想告訴他或問他什麼？", copyMsg: "📋 複製成訊息", copied: "已複製 ✓", sel: "請選取文字後複製。", noPeople: "還沒有其他管理員。", answered: "已回答", seen: "已完成", waiting: "等待中",
    ann: "📣 王國時間表上即將開放的內容", annSub: "從現在算起第 3 次 KvK（{d}）之前會開放的所有內容。公告過就打勾。", annDone: "已公告", annNone: "那之前沒有新內容。", inDays: "{n} 天後",
    peek: "🔮 活動搶先看", peekSub: "官方的活動預告，來源是 Kingshot Wiki，每天檢查三次。看過就打勾。", peekNew: "新", peekNone: "最近 30 天沒有新的預告。", peekLast: "上一篇：", todayC: "今天要做的", none: "今天沒有項目。", late: "逾期", rep: "＋ 重複的項目", daily: "🔁 每天", event: "📅 跟著活動", once: "📝 我自己的事", q: "❓ 待查問題", proj: "🚧 進行中的事", notes: "📝 我的筆記",
    addPh: "新增…（Enter）", save: "💾 儲存", cancel: "取消", del: "🗑", edit: "✏️", kind: "種類", text: "內容", note: "備註／下一步", evF: "活動", dayN: "活動的第幾天（1＝第一天，0＝前一天）", at: "時間（UTC，可不填）", date: "日期（可不填）", ans: "答案", found: "已查到",
    needText: "請先寫內容。", needEv: "請選一個活動。", saved: "已儲存 ✓", saving: "儲存中…", conflict: "這一頁在另一台裝置上改過，已重新載入，請再改一次。", fail: "儲存失敗，請再試一次。", loadFail: "讀取失敗。" },
  pt: { title: "🗂️ Meu espaço", lead: "Só você vê esta página. A IA do site e o Pardalzinho nunca leem o que está aqui.", leadO: "Sparrow também pode abrir (só leitura) para ver se funciona.",
    seeing: "Página de", mine: "Minha", ro: "👁️ Você está vendo a página de {n}. Não dá para mudar.", utc: "UTC",
    ev: "🎯 Meus eventos", evNone: "Nenhum evento seu está ativo hoje nem começa nos próximos 2 dias.", evLater: "Depois", evOther: "Hoje também:", evPick: "✏️ Escolher meus eventos", evPickFor: "Marque os eventos pelos quais esta pessoa é responsável.", evNoPick: "Nenhum evento escolhido ainda.",
    duty: "📌 Funções fixas", partPh: "a parte dela (opcional)", dutyPh: "Funções fixas que não são um evento — uma por linha",
    day: "Dia {a} de {b}", starts: "começa em {n} d · {d}", ours: "nossos horários", today: "Hoje", tomorrow: "Amanhã",
    bearOn: "{b} cai no dia do prazo de inscrição ({d}, nossos horários {t}).", bearBefore: "{b} é no dia antes do prazo de inscrição ({d}, nossos horários {t}); não há urso no dia do prazo.",
    box: "📨 De Sparrow", boxNone: "Nada no momento.", ansPh: "Sua resposta…", send: "Enviar", isQ: "É uma pergunta (a pessoa responde aqui)", boxFor: "📨 Para", boxPh: "O que você quer dizer ou perguntar?", copyMsg: "📋 Copiar como mensagem", copied: "Copiado ✓", sel: "Selecione o texto e copie.", noPeople: "Ainda não há outro admin.", answered: "respondido", seen: "feito", waiting: "aguardando",
    ann: "📣 Chegando na linha do tempo do reino", annSub: "Tudo o que chega antes do 3º KvK a partir de agora ({d}). Marque quando já foi anunciado.", annDone: "anunciado", annNone: "Nada novo até lá.", inDays: "em {n} dias",
    peek: "🔮 Prévia de eventos", peekSub: "Prévias oficiais dos próximos eventos, da Kingshot Wiki. Verificado três vezes por dia. Marque quando tiver lido.", peekNew: "novo", peekNone: "Nenhuma prévia nos últimos 30 dias.", peekLast: "A última:", todayC: "Hoje", none: "Nada para hoje.", late: "atrasado", rep: "+ Item que se repete", daily: "🔁 Todo dia", event: "📅 Com um evento", once: "📝 Minhas coisas", q: "❓ Para pesquisar", proj: "🚧 Em andamento", notes: "📝 Minhas notas",
    addPh: "Adicionar… (Enter)", save: "💾 Salvar", cancel: "Cancelar", del: "🗑", edit: "✏️", kind: "Tipo", text: "O quê", note: "Nota / próximo passo", evF: "Evento", dayN: "Dia do evento (1 = primeiro dia, 0 = dia anterior)", at: "Hora (UTC, opcional)", date: "Data (opcional)", ans: "Resposta", found: "Encontrado",
    needText: "Escreva o que é primeiro.", needEv: "Escolha um evento.", saved: "Salvo ✓", saving: "Salvando…", conflict: "Esta página foi mudada em outro aparelho. Ela foi recarregada — faça a mudança de novo.", fail: "Não deu para salvar. Tente de novo.", loadFail: "Não deu para carregar a página." },
  ar: { title: "🗂️ مساحتي", lead: "أنت فقط ترى هذه الصفحة. ذكاء الموقع والعصفور الصغير لا يقرآن ما فيها أبدًا.", leadO: "يستطيع Sparrow فتحها أيضًا (للعرض فقط) للتأكد من أنها تعمل.",
    seeing: "صفحة مَن", mine: "صفحتي", ro: "👁️ أنت تشاهد صفحة {n}. لا يمكنك تعديلها.", utc: "UTC",
    ev: "🎯 أحداثي", evNone: "لا يوجد حدث من أحداثك اليوم ولا يبدأ خلال اليومين القادمين.", evLater: "لاحقًا", evOther: "اليوم أيضًا:", evPick: "✏️ اختيار أحداثي", evPickFor: "ضع علامة على الأحداث التي يتولاها هذا الشخص.", evNoPick: "لم تُختر أحداث بعد.",
    duty: "📌 مهام ثابتة", partPh: "الجزء الخاص به (اختياري)", dutyPh: "المهام الثابتة التي ليست حدثًا — واحدة في كل سطر",
    day: "اليوم {a} من {b}", starts: "يبدأ بعد {n} يوم · {d}", ours: "أوقاتنا", today: "اليوم", tomorrow: "غدًا",
    bearOn: "{b} في يوم انتهاء التسجيل ({d}، أوقاتنا {t}).", bearBefore: "{b} في اليوم السابق لانتهاء التسجيل ({d}، أوقاتنا {t})؛ لا دب في يوم الانتهاء.",
    box: "📨 من Sparrow", boxNone: "لا شيء الآن.", ansPh: "إجابتك…", send: "إرسال", isQ: "هذا سؤال (يمكنه الإجابة هنا)", boxFor: "📨 إلى", boxPh: "ماذا تريد أن تخبره أو تسأله؟", copyMsg: "📋 نسخ كرسالة", copied: "تم النسخ ✓", sel: "حدّد النص وانسخه.", noPeople: "لا يوجد مشرف آخر بعد.", answered: "تمت الإجابة", seen: "تم", waiting: "بانتظار",
    ann: "📣 قادم في الجدول الزمني للمملكة", annSub: "كل ما يصل قبل ثالث KvK من الآن ({d}). ضع علامة بعد الإعلان عنه.", annDone: "أُعلن", annNone: "لا جديد قبل ذلك.", inDays: "بعد {n} يوم",
    peek: "🔮 معاينة الفعاليات", peekSub: "المعاينات الرسمية للفعاليات القادمة، من Kingshot Wiki. يتم التحقق ثلاث مرات يوميًا. ضع علامة بعد قراءتها.", peekNew: "جديد", peekNone: "لا توجد معاينة في آخر 30 يومًا.", peekLast: "آخر واحدة:", todayC: "اليوم", none: "لا شيء لليوم.", late: "متأخر", rep: "+ بند متكرر", daily: "🔁 كل يوم", event: "📅 مع حدث", once: "📝 أموري", q: "❓ للبحث عنه", proj: "🚧 قيد العمل", notes: "📝 ملاحظاتي",
    addPh: "أضف… (Enter)", save: "💾 حفظ", cancel: "إلغاء", del: "🗑", edit: "✏️", kind: "النوع", text: "ماذا", note: "ملاحظة / الخطوة التالية", evF: "الحدث", dayN: "يوم الحدث (1 = اليوم الأول، 0 = اليوم السابق)", at: "الوقت (UTC، اختياري)", date: "التاريخ (اختياري)", ans: "الإجابة", found: "وُجدت",
    needText: "اكتب ما هو أولًا.", needEv: "اختر حدثًا.", saved: "تم الحفظ ✓", saving: "جارٍ الحفظ…", conflict: "تم تعديل هذه الصفحة من جهاز آخر. أُعيد تحميلها — أعد التعديل.", fail: "تعذّر الحفظ. حاول مرة أخرى.", loadFail: "تعذّر تحميل الصفحة." },
  ko: { title: "🗂️ 내 작업 공간", lead: "이 페이지는 본인만 볼 수 있어요. 사이트 AI와 작은 참새는 여기 내용을 읽지 않아요.", leadO: "Sparrow도 열어 볼 수 있어요(보기 전용). 문제가 없는지 확인하려는 거예요.",
    seeing: "누구 페이지", mine: "내 것", ro: "👁️ {n}의 페이지를 보고 있어요. 수정할 수 없어요.", utc: "UTC",
    ev: "🎯 내 담당 이벤트", evNone: "오늘과 앞으로 2일 동안 담당 이벤트가 없어요.", evLater: "이후", evOther: "오늘 다른 이벤트:", evPick: "✏️ 내 담당 이벤트 고르기", evPickFor: "이 사람이 담당하는 이벤트에 체크하세요.", evNoPick: "아직 고른 이벤트가 없어요.",
    duty: "📌 고정 담당", partPh: "맡은 부분 (선택)", dutyPh: "이벤트가 아닌 고정 담당 — 한 줄에 하나",
    day: "{b}일 중 {a}일차", starts: "{n}일 후 시작 · {d}", ours: "우리 시간", today: "오늘", tomorrow: "내일",
    bearOn: "{b}: 등록 마감일에 있어요 ({d}, 우리 시간 {t}).", bearBefore: "{b}: 등록 마감 전날에 있어요 ({d}, 우리 시간 {t}). 마감일에는 없어요.",
    box: "📨 Sparrow가 보낸 것", boxNone: "지금은 없어요.", ansPh: "답변…", send: "보내기", isQ: "질문이에요 (상대가 여기서 답할 수 있어요)", boxFor: "📨 받는 사람", boxPh: "무엇을 알리거나 묻고 싶나요?", copyMsg: "📋 메시지로 복사", copied: "복사됨 ✓", sel: "텍스트를 선택해 복사하세요.", noPeople: "아직 다른 관리자가 없어요.", answered: "답변함", seen: "완료", waiting: "대기 중",
    ann: "📣 왕국 타임라인에 곧 열리는 것", annSub: "지금부터 3번째 KvK({d}) 전에 열리는 모든 것. 공지했으면 체크하세요.", annDone: "공지함", annNone: "그 전에 새로 열리는 것이 없어요.", inDays: "{n}일 후",
    peek: "🔮 이벤트 미리보기", peekSub: "다가오는 이벤트의 공식 예고예요 (Kingshot Wiki). 하루 세 번 확인해요. 읽었으면 체크하세요.", peekNew: "새 글", peekNone: "최근 30일 동안 새 예고가 없어요.", peekLast: "지난 글:", todayC: "오늘 할 일", none: "오늘 항목이 없어요.", late: "지남", rep: "+ 반복 항목", daily: "🔁 매일", event: "📅 이벤트와 함께", once: "📝 내 일", q: "❓ 알아볼 것", proj: "🚧 진행 중", notes: "📝 내 메모",
    addPh: "추가… (Enter)", save: "💾 저장", cancel: "취소", del: "🗑", edit: "✏️", kind: "종류", text: "내용", note: "메모 / 다음 단계", evF: "이벤트", dayN: "이벤트 며칠째 (1 = 첫날, 0 = 전날)", at: "시간 (UTC, 선택)", date: "날짜 (선택)", ans: "답", found: "찾음",
    needText: "내용을 먼저 적어 주세요.", needEv: "이벤트를 고르세요.", saved: "저장됨 ✓", saving: "저장 중…", conflict: "다른 기기에서 이 페이지가 바뀌었어요. 다시 불러왔으니 한 번 더 고쳐 주세요.", fail: "저장하지 못했어요. 다시 해 보세요.", loadFail: "페이지를 불러오지 못했어요." } };
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const KINDS = ["daily", "event", "once", "proj", "q"];
const utcDay = (x) => Math.floor(x / DAY) * DAY, iso = (x) => new Date(x).toISOString().slice(0, 10), md = (x) => iso(x).slice(5);
const EV = () => OFFICER_PAGES.events || {};
const norm = (d) => { const o = d && typeof d === "object" ? d : {}; return { v: 1, rev: +o.rev || 0, items: Array.isArray(o.items) ? o.items : [], done: o.done && typeof o.done === "object" ? o.done : {}, ann: o.ann && typeof o.ann === "object" ? o.ann : {}, targets: Array.isArray(o.targets) ? o.targets : [] }; };
const isOwner = () => !!(OFFICER.user && OFFICER.user.id === OFFICER.OWNER);
const FULL = () => isOwner() && !VIEW;   // Sparrow's own page has the extra cards
const RO = () => !!VIEW;

async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/ws", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if ((!r.ok || j.error) && j.error !== "conflict") throw new Error(j.error || "HTTP " + r.status);
  return j;
}
async function load(uid) {
  const j = await api("get", uid ? { uid } : {});
  if (!uid) { MINE = norm(j.ws); OTHERS = Array.isArray(j.others) ? j.others : []; PEOPLE = Array.isArray(j.people) ? j.people : []; OUT = j.out && typeof j.out === "object" ? j.out : {}; OWNERS = j.owners && typeof j.owners === "object" ? j.owners : {}; if (!TO || !PEOPLE.some((p) => p.id === TO)) TO = PEOPLE.length ? PEOPLE[0].id : ""; }
  D = uid ? norm(j.ws) : MINE; VIEW = uid || ""; MYEV = Array.isArray(j.mine) ? j.mine : []; MYPARTS = j.parts && typeof j.parts === "object" ? j.parts : {}; MYDUTY = Array.isArray(j.duties) ? j.duties : []; INBOX = Array.isArray(j.inbox) ? j.inbox : [];
  return D;
}
/* keep only the ticks that can still matter (daily and event ticks older than 45 days go) */
function prune(d) { const lim = iso(Date.now() - 45 * DAY), ids = new Set(d.items.map((x) => x.id)); for (const k of Object.keys(d.done)) { const [id, day] = k.split("|"); if (!ids.has(id) || day < lim) delete d.done[k]; } }
async function save() {
  if (RO() || !MINE) return false;
  prune(MINE); BUSY = true; ERR = ""; status(t("saving"));
  try {
    const j = await api("save", { ws: MINE, rev: MINE.rev });
    if (j.error === "conflict") { MINE = norm(j.ws); D = MINE; ERR = t("conflict"); render(); return false; }
    MINE.rev = j.rev; status(t("saved"), "okmsg"); return true;
  } catch (e) { ERR = t("fail"); status(ERR, "warn"); return false; }
  finally { BUSY = false; }
}
function status(txt, cls) { const el = $("ws_msg"); if (el) { el.className = "msg " + (cls || ""); el.textContent = txt; } }
async function call(op, extra) { status(t("saving")); try { const j = await api(op, extra); status(t("saved"), "okmsg"); return j; } catch (e) { ERR = t("fail"); status(ERR, "warn"); return null; } }

/* ---- the shared calendar ---- */
const runsOf = (from, to) => { try { return EV().runs ? EV().runs(from, to) : []; } catch (e) { return []; } };
const evList = () => { try { return EV().list() || []; } catch (e) { return []; } };
const evName = (k) => { try { return EV().evName ? EV().evName(k) : k; } catch (e) { return k; } };
const evEn = (k) => { const e = evList().find((x) => x.id === k); return e ? e.en || k : k; };
const timesOf = (k) => { try { const tm = ((EV().times && EV().times()) || {})[k]; return Array.isArray(tm) ? tm.filter(Boolean) : []; } catch (e) { return []; } };
const todoTxt = (x, en) => String((!en && x[lang]) || x.en || x.zh || "").replace(/\*\*/g, "").trim();
/* the officer to-dos of one run that fall on one day */
const todosOn = (r, day, en) => { const e = evList().find((x) => x.id === r.k); return ((e && e.todo) || []).filter((x) => r.st + (Number(x.due) || 0) * DAY === day).map((x) => ({ at: x.at || "", txt: todoTxt(x, en) })).filter((x) => x.txt).sort((a, b) => (a.at || "99") < (b.at || "99") ? -1 : 1); };
/* runs of the given events that are on now or start within 2 days */
function near(ids) { const today = utcDay(Date.now()); return runsOf(today - 40 * DAY, today + 3 * DAY).filter((r) => ids.includes(r.k) && r.en > today && r.st <= today + 2 * DAY).sort((a, b) => a.st - b.st); }
/* Alliance Championship: registration closes on the run's last day — is Bear Hunt on that day, or only the day before? (Sherry 2026-11-23) */
function bearLine(r, en) {
  if (r.k !== "alliance-championship") return "";
  const last = r.en - DAY, bears = runsOf(r.st - DAY, r.en).filter((x) => x.k === "bear-hunt").map((x) => x.st), tm = timesOf("bear-hunt").join(", ") || "—";
  const T2 = en ? T.en : (T[lang] || T.en), on = bears.includes(last), before = bears.includes(last - DAY);
  const bn = en ? evEn("bear-hunt") : evName("bear-hunt");
  return (on ? T2.bearOn.replace("{d}", md(last)) : before ? T2.bearBefore.replace("{d}", md(last - DAY)) : "").replace("{b}", bn).replace("{t}", tm);
}
/* 📣 timeline: everything that arrives before the 3rd KvK from now (the R5's rule, 2026-11-22) */
function announce() {
  const today = utcDay(Date.now());
  let bd = 6; try { bd = Number(((EV().times() || {}).days || {}).kvk) || 6; } catch (e) {}   // KvK battle day: day 6 of the run (Saturday) unless 📅 Events says otherwise
  const kv = runsOf(today, today + 120 * DAY).filter((r) => r.k === "kvk").map((r) => r.st + (bd - 1) * DAY).filter((x) => x >= today);
  const lim = kv[2] || 0; let ms = []; try { ms = EV().milestones ? EV().milestones() : []; } catch (e) {}
  return { lim, list: lim ? ms.filter((m) => m.t >= today && m.t < lim) : [] };
}
/* own repeating / dated items that fall on one UTC day: { it, key (tick key), at, late } */
function dueOn(d, day) {
  const out = [], rs = runsOf(day - 45 * DAY, day + 10 * DAY);
  for (const it of d.items) {
    if (it.k === "daily") out.push({ it, key: it.id + "|" + iso(day), at: it.at || "" });
    else if (it.k === "event") { for (const r of rs) if (r.k === it.ev && r.st + (Number(it.due) || 0) * DAY === day) out.push({ it, key: it.id + "|" + iso(r.st), at: it.at || "" }); }
    else if (it.k === "once" && it.date && !it.done && it.date <= iso(day)) out.push({ it, at: it.at || "", late: it.date < iso(day) });
  }
  return out.sort((a, b) => (a.at || "99") < (b.at || "99") ? -1 : (a.at || "99") > (b.at || "99") ? 1 : 0);
}
const isDone = (d, x) => x.key ? !!d.done[x.key] : !!x.it.done;

/* ---- cards ---- */
function evCard() {
  const today = utcDay(Date.now()), rs = near(MYEV), canPick = !RO() || isOwner();
  let h = `<div class="card" id="ws_mine"><h2>${esc(t("ev"))}</h2>`;
  if (PICK) {
    h += `<div class="muted ws-sub">${esc(t("evPickFor"))}</div><div class="ws-pick">${evList().filter((e) => e.start && e.every > 0).map((e) => `<div class="ws-pr"><label><input type="checkbox" data-pk="${esc(e.id)}"${MYEV.includes(e.id) ? " checked" : ""}> ${esc(evName(e.id))}</label><input class="inp" data-pp="${esc(e.id)}" placeholder="${esc(t("partPh"))}" value="${esc(MYPARTS[e.id] || "")}"${MYEV.includes(e.id) ? "" : " hidden"}></div>`).join("")}</div>
      <h3>${esc(t("duty"))}</h3><textarea class="inp" id="ws_pkDuty" rows="4" style="width:100%;box-sizing:border-box;font-size:16px" placeholder="${esc(t("dutyPh"))}">${esc(MYDUTY.join("\n"))}</textarea>
      <div class="row" style="gap:8px;margin-top:8px"><button type="button" class="btn primary" id="ws_pkSave">${esc(t("save"))}</button><button type="button" class="btn" id="ws_pkCancel">${esc(t("cancel"))}</button></div></div>`;
    return h;
  }
  for (const r of rs) {
    const n = Math.round((today - r.st) / DAY) + 1, tm = timesOf(r.k), bl = bearLine(r);
    h += `<div class="ws-ev"><div class="ws-evh"><b>${esc(evName(r.k))}</b> <span class="muted">${esc(r.st <= today ? t("day").replace("{a}", n).replace("{b}", r.days) : t("starts").replace("{n}", Math.round((r.st - today) / DAY)).replace("{d}", md(r.st)))}${tm.length ? " · " + esc(t("ours")) + " " + esc(tm.join(", ")) : ""}</span></div>${MYPARTS[r.k] ? `<div class="ws-part">${esc(MYPARTS[r.k])}</div>` : ""}`;
    for (let i = 0; i <= 1; i++) { const td = todosOn(r, today + i * DAY); if (!td.length) continue;
      h += `<div class="ws-evd"><span class="ws-k">${esc(i ? t("tomorrow") : t("today"))}</span>${td.map((x) => `<div>${x.at ? `⏰ <b>${esc(x.at)}</b> ` : "· "}${esc(x.txt)}</div>`).join("")}</div>`; }
    if (bl) h += `<div class="ws-evd">${esc(bl)}</div>`;
    h += `</div>`;
  }
  if (!rs.length) h += `<div class="muted">${esc(MYEV.length ? t("evNone") : t("evNoPick"))}</div>`;
  /* the person's other events: when each one comes next, with their part of it */
  const seen = new Set(rs.map((r) => r.k)), later = [];
  for (const r of runsOf(today, today + 70 * DAY).sort((a, b) => a.st - b.st)) if (MYEV.includes(r.k) && !seen.has(r.k) && r.st > today) { seen.add(r.k); later.push(r); }
  if (later.length) h += `<h3>${esc(t("evLater"))}</h3>` + later.map((r) => `<div class="ws-du"><b>${esc(md(r.st))}</b> ${esc(evName(r.k))}${MYPARTS[r.k] ? `<div class="ws-part">${esc(MYPARTS[r.k])}</div>` : ""}</div>`).join("");
  const other = runsOf(today, today + DAY).filter((r) => r.st <= today && r.en > today && !MYEV.includes(r.k));
  if (other.length) h += `<div class="muted ws-other">${esc(t("evOther"))} ${esc([...new Set(other.map((r) => evName(r.k)))].join(" · "))}</div>`;
  if (MYDUTY.length) h += `<div id="ws_duty"><h3>${esc(t("duty"))}</h3>${MYDUTY.map((x) => `<div class="ws-du">· ${esc(x)}</div>`).join("")}</div>`;
  if (canPick) h += `<div class="row" style="margin-top:8px"><button type="button" class="btn small" id="ws_pk">${esc(t("evPick"))}</button></div>`;
  return h + `</div>`;
}
/* the person's side: what Sparrow sent them */
function inboxCard() {
  const rows = INBOX.map((m) => `<div class="ws-m${m.done ? " done" : ""}"><label class="ws-row">${RO() ? `<span>${m.done ? "✅" : "⬜"}</span>` : `<input type="checkbox" data-mdone="${esc(m.id)}"${m.done ? " checked" : ""}>`}<span class="ws-tx">${m.q ? "❓ " : ""}${esc(m.text)}</span></label>${m.q ? (RO() ? (m.ans ? `<div class="ws-ans">${esc(m.ans)}</div>` : "") : `<textarea class="inp ws-a" rows="2" data-mans="${esc(m.id)}" placeholder="${esc(t("ansPh"))}">${esc(m.ans || "")}</textarea>`) : ""}</div>`).join("");
  return `<div class="card" id="ws_box"><h2>${esc(t("box"))}</h2>${rows || `<div class="muted">${esc(t("boxNone"))}</div>`}</div>`;
}
/* Sparrow's side: what she sends to one person, with what came back */
function outboxCard() {
  if (!PEOPLE.length) return `<div class="card" id="ws_box"><h2>${esc(t("boxFor"))}</h2><div class="muted">${esc(t("noPeople"))}</div></div>`;
  const list = OUT[TO] || [];
  const rows = list.map((m) => `<div class="ws-it${m.done ? " done" : ""}"><div class="ws-tx">${m.q ? "❓ " : ""}${esc(m.text)} <span class="ws-who">${esc(m.q && m.ans ? t("answered") : m.done ? t("seen") : t("waiting"))}</span>${m.ans ? `<div class="ws-ans">${esc(m.ans)}</div>` : ""}</div><span class="ws-bt"><button type="button" class="btn small" data-unsend="${esc(m.id)}">${t("del")}</button></span></div>`).join("");
  return `<div class="card" id="ws_box"><h2>${esc(t("boxFor"))} <select class="inp" id="ws_to" style="font-size:15px">${PEOPLE.map((p) => `<option value="${esc(p.id)}"${p.id === TO ? " selected" : ""}>${esc(p.name)}</option>`).join("")}</select></h2>
    ${rows}
    <textarea class="inp" id="ws_send" rows="2" style="width:100%;box-sizing:border-box;margin-top:8px;font-size:16px" placeholder="${esc(t("boxPh"))}"></textarea>
    <div class="row" style="gap:8px;align-items:center;margin-top:6px;flex-wrap:wrap"><label style="display:flex;gap:6px;align-items:center;font-size:13px"><input type="checkbox" id="ws_sendQ"> ${esc(t("isQ"))}</label><button type="button" class="btn primary" id="ws_sendBtn">${esc(t("send"))}</button></div>
    <div class="row" style="gap:8px;align-items:center;margin-top:10px"><button type="button" class="btn" id="ws_copy">${esc(t("copyMsg"))}</button><span class="msg" id="ws_cmsg"></span></div>
    <textarea class="inp" id="ws_cout" rows="8" readonly hidden style="width:100%;box-sizing:border-box;margin-top:8px;font-size:12.5px"></textarea></div>`;
}
/* the same content as an English message, for sending outside the site: that person's events (today, tomorrow) and what is still open for them */
function msgText(uid, evIds) {
  const today = utcDay(Date.now()), L = [`${iso(today)} (all times UTC)`];
  for (const r of near(evIds)) { const n = Math.round((today - r.st) / DAY) + 1, tm = timesOf(r.k);
    L.push("", `${evEn(r.k)} — ${r.st <= today ? `day ${n} of ${r.days}` : `starts ${md(r.st)}`}${tm.length ? " · our times " + tm.join(", ") : ""}`);
    for (let i = 0; i <= 1; i++) for (const x of todosOn(r, today + i * DAY, true)) L.push(`- ${i ? "Tomorrow" : "Today"}${x.at ? " " + x.at : ""}: ${x.txt}`);
    const bl = bearLine(r, true); if (bl) L.push("- " + bl.replace(/^🐻\s*/, "")); }
  const open = (OUT[uid] || []).filter((m) => !m.done && !(m.q && m.ans));
  if (open.some((m) => !m.q)) { L.push("", "For you:"); for (const m of open.filter((m) => !m.q)) L.push("- " + m.text); }
  if (open.some((m) => m.q)) { L.push("", "Questions:"); for (const m of open.filter((m) => m.q)) L.push("- " + m.text); }
  return L.join("\n");
}
/* 🔮 official event previews (Sparrow's page): data/sneak-peek.json is kept by a workflow — titles, dates and links only. A tick = read. */
let PEEK = null;
const PEEK_FROM = Date.UTC(2026, 10, 24);   // the card started on 2026-11-24: posts from before that day are shown as already read
async function loadPeek() { try { const j = await (await fetch("data/sneak-peek.json?t=" + Math.floor(Date.now() / 3600000), { cache: "no-store" })).json(); PEEK = Array.isArray(j.items) ? j.items : []; } catch (e) { PEEK = []; } }
function peekCard(d) {
  if (!PEEK) return "";
  const now = Date.now(), ok = (u) => /^https:\/\/kingshotwiki\.com\//.test(String(u || "")), lk = (u, n) => ok(u) ? `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>` : "";
  const links = (x) => [lk(x.tw, "繁中"), lk(x.en, "EN"), lk(x.ko, "한국어")].filter(Boolean).join(" · ");
  const recent = PEEK.filter((x) => now - Date.parse(x.date) < 30 * DAY);
  const rows = recent.map((x) => { const k = "peek|" + String(x.date).slice(0, 10), on = !!d.done[k] || Date.parse(x.date) < PEEK_FROM;
    return `<label class="ws-row${on ? " done" : ""}"><input type="checkbox" data-peek="${esc(k)}"${on ? " checked" : ""}><span class="ws-tx"><b>${esc(String(x.date).slice(0, 10))}</b>${on ? "" : ` <span class="ws-tag">${esc(t("peekNew"))}</span>`} ${esc(x.title)}<br><span class="muted">${links(x)}</span></span></label>`; }).join("");
  const last = !recent.length && PEEK[0] ? `<div class="muted">${esc(t("peekNone"))} ${esc(t("peekLast"))} ${esc(String(PEEK[0].date).slice(0, 10))} ${esc(PEEK[0].title)} · ${links(PEEK[0])}</div>` : "";
  return `<div class="card" id="ws_peek"><h2>${esc(t("peek"))}</h2><div class="muted ws-sub">${esc(t("peekSub"))}</div>${rows || last || `<div class="muted">${esc(t("peekNone"))}</div>`}</div>`;
}
function annCard(d) {
  const a = announce(), today = utcDay(Date.now()); if (!a.lim) return "";
  const rows = a.list.map((m) => { const k = iso(m.t), on = !!d.ann[k];
    return `<label class="ws-row${on ? " done" : ""}">${RO() ? `<span>${on ? "✅" : "⬜"}</span>` : `<input type="checkbox" data-ann="${k}"${on ? " checked" : ""}>`}<span class="ws-tx"><b>${esc(k)}</b> <span class="muted">${esc(t("inDays").replace("{n}", Math.round((m.t - today) / DAY)))}</span>${on ? ` <span class="ws-who">${esc(t("annDone"))}</span>` : ""}<small>${esc(m.l.join(" · "))}</small></span></label>`; }).join("");
  return `<div class="card" id="ws_ann"><h2>${esc(t("ann"))}</h2><div class="muted ws-sub">${esc(t("annSub").replace("{d}", iso(a.lim)))}</div>${rows || `<div class="muted">${esc(t("annNone"))}</div>`}</div>`;
}
function todayCard(d) {
  const today = utcDay(Date.now()), due = dueOn(d, today);
  const row = (x) => { const it = x.it, on = isDone(d, x);
    return `<div class="ws-it${on ? " done" : ""}"><label class="ws-row" style="flex:1;border:0;padding:0"><input type="checkbox" data-tick="${esc(x.key || "")}" data-id="${esc(it.id)}"${on ? " checked" : ""}><span class="ws-tx">${x.at ? `<b>${esc(x.at)}</b> ` : ""}${esc(it.text)}${it.k === "event" ? ` <span class="muted">· ${esc(evName(it.ev))}</span>` : ""}${x.late ? ` <span class="ws-late">${esc(t("late"))} ${esc(it.date.slice(5))}</span>` : ""}${it.note ? `<small>${esc(it.note)}</small>` : ""}</span></label><span class="ws-bt"><button type="button" class="btn small" data-edit="${esc(it.id)}">${t("edit")}</button></span></div>`; };
  return `<div class="card" id="ws_today"><h2>${esc(t("todayC"))} · ${esc(md(today))} <span class="muted" style="font-weight:400">(${esc(t("utc"))})</span></h2>${due.length ? due.map(row).join("") : `<div class="muted">${esc(t("none"))}</div>`}
    <div class="row" style="margin-top:8px"><button type="button" class="btn small" id="ws_rep">${esc(t("rep"))}</button></div></div>`;
}
/* one simple list of a kind: tick, quick add, edit, delete */
function listCard(d, k, id, title, fold) {
  const list = d.items.filter((x) => x.k === k && !(k === "once" && x.date)), ro = RO();
  const row = (it) => `<div class="ws-it${it.done ? " done" : ""}"><label class="ws-row" style="flex:1;border:0;padding:0">${ro ? `<span>${it.done ? "✅" : "⬜"}</span>` : `<input type="checkbox" data-tick="" data-id="${esc(it.id)}"${it.done ? " checked" : ""}>`}<span class="ws-tx">${esc(it.text)}${it.note ? `<small>${esc(it.note)}</small>` : ""}${k === "q" && ro && it.ans ? `<div class="ws-ans">${esc(it.ans)}</div>` : ""}</span></label>${ro ? "" : `<span class="ws-bt"><button type="button" class="btn small" data-edit="${esc(it.id)}">${t("edit")}</button><button type="button" class="btn small" data-del="${esc(it.id)}">${t("del")}</button></span>`}</div>${k === "q" && !ro ? `<textarea class="inp ws-a" rows="2" data-qans="${esc(it.id)}" placeholder="${esc(t("ans"))}">${esc(it.ans || "")}</textarea>` : ""}`;
  const body = `${list.filter((x) => !x.done).map(row).join("")}${list.filter((x) => x.done).map(row).join("")}${ro ? (list.length ? "" : `<div class="muted">—</div>`) : `<input class="inp ws-add" data-add="${k}" placeholder="${esc(t("addPh"))}" enterkeyhint="done">`}`;
  return fold ? `<details class="card" id="${id}"${list.some((x) => !x.done) ? " open" : ""}><summary><b>${esc(title)}</b></summary>${body}</details>` : `<div class="card" id="${id}"><h2>${esc(title)}</h2>${body}</div>`;
}
function formHtml() {
  const it = EDIT, evs = evList().filter((e) => e.start && e.every > 0);
  const f = (lbl, inner) => `<label class="ws-f"><span>${esc(lbl)}</span>${inner}</label>`;
  return `<div class="card ws-form" id="ws_form">
    ${f(t("kind"), `<select class="inp" id="wf_k">${KINDS.map((k) => `<option value="${k}"${it.k === k ? " selected" : ""}>${esc(t(k))}</option>`).join("")}</select>`)}
    ${f(t("text"), `<textarea class="inp" id="wf_text" rows="2">${esc(it.text || "")}</textarea>`)}
    <div data-for="event">${f(t("evF"), `<select class="inp" id="wf_ev"><option value=""></option>${evs.map((e) => `<option value="${esc(e.id)}"${it.ev === e.id ? " selected" : ""}>${esc(evName(e.id))}</option>`).join("")}</select>`)}
      ${f(t("dayN"), `<input class="inp" id="wf_due" type="number" min="-6" max="30" style="width:90px" value="${(Number(it.due) || 0) + 1}">`)}</div>
    <div data-for="once">${f(t("date"), `<input class="inp" id="wf_date" type="date" value="${esc(it.date || "")}">`)}</div>
    <div data-for="daily event once">${f(t("at"), `<input class="inp" id="wf_at" placeholder="23:00" style="width:90px" value="${esc(it.at || "")}">`)}</div>
    <div data-for="q">${f(t("ans"), `<textarea class="inp" id="wf_ans" rows="2">${esc(it.ans || "")}</textarea>`)}</div>
    ${f(t("note"), `<textarea class="inp" id="wf_note" rows="2">${esc(it.note || "")}</textarea>`)}
    <div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap"><button type="button" class="btn primary" id="wf_save">${esc(t("save"))}</button><button type="button" class="btn" id="wf_cancel">${esc(t("cancel"))}</button>${it.id ? `<button type="button" class="btn" data-del="${esc(it.id)}">${t("del")}</button>` : ""}<span class="msg" id="wf_msg"></span></div></div>`;
}
function render() {
  const root = $("ws_root"); if (!root) return;
  if (!D) { root.innerHTML = `<div class="card muted">${esc(ERR || "…")}</div>`; return; }
  const d = D;
  let h = `<div class="muted ws-sub">${esc(t("lead"))}${isOwner() ? "" : " " + esc(t("leadO"))}</div>`;
  if (isOwner() && OTHERS.length + PEOPLE.length) { const ppl = [...PEOPLE, ...OTHERS.filter((o) => !PEOPLE.some((p) => p.id === o.id))];
    h += `<div class="row" style="gap:8px;align-items:center;margin:8px 0"><span>${esc(t("seeing"))}</span><select class="inp" id="ws_view"><option value="">${esc(t("mine"))}</option>${ppl.map((o) => `<option value="${esc(o.id)}"${VIEW === o.id ? " selected" : ""}>${esc(o.name || o.id)}</option>`).join("")}</select></div>`; }
  if (RO()) h += `<div class="card msg">${esc(t("ro").replace("{n}", ([...PEOPLE, ...OTHERS].find((o) => o.id === VIEW) || {}).name || VIEW))}</div>`;
  h += `<div class="msg ${ERR ? "warn" : ""}" id="ws_msg">${esc(ERR)}</div>`;
  if (EDIT) h += formHtml();
  else if (FULL()) h += evCard() + peekCard(d) + todayCard(d) + outboxCard() + listCard(d, "proj", "ws_proj", t("proj")) + listCard(d, "q", "ws_q", t("q")) + listCard(d, "once", "ws_all", t("once")) + annCard(d);
  else h += evCard() + inboxCard() + annCard(d) + listCard(d, "once", "ws_all", t("notes"), true);
  root.innerHTML = h; ERR = "";
  wire(d);
}
function formShow() { const k = $("wf_k") && $("wf_k").value; document.querySelectorAll("#ws_form [data-for]").forEach((el) => { el.hidden = !el.dataset.for.split(" ").includes(k); }); }
const newId = () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const cleanAt = (v) => { const m = /^(\d{1,2}):?(\d{2})$/.exec(String(v || "").trim().replace(/[：.．]/g, ":")); return m && +m[1] < 24 && +m[2] < 60 ? m[1].padStart(2, "0") + ":" + m[2] : ""; };
function wire(d) {
  const root = $("ws_root"), on = (sel, ev, fn) => root.querySelectorAll(sel).forEach((el) => { el[ev] = () => fn(el); });
  const v = $("ws_view"); if (v) v.onchange = async () => { EDIT = null; PICK = false; try { await load(v.value); } catch (e) { ERR = t("loadFail"); D = MINE; VIEW = ""; } render(); };
  /* 🎯 choose the events (Sparrow can do it for the person she is looking at) */
  if ($("ws_pk")) $("ws_pk").onclick = () => { PICK = true; render(); };
  if ($("ws_pkCancel")) $("ws_pkCancel").onclick = () => { PICK = false; render(); };
  root.querySelectorAll("input[data-pk]").forEach((el) => { el.onchange = () => { const p = root.querySelector(`input[data-pp="${el.dataset.pk}"]`); if (p) p.hidden = !el.checked; }; });
  if ($("ws_pkSave")) $("ws_pkSave").onclick = async () => { const ev = [...root.querySelectorAll("input[data-pk]:checked")].map((el) => el.dataset.pk), parts = {};
    for (const k of ev) { const p = root.querySelector(`input[data-pp="${k}"]`); if (p && p.value.trim()) parts[k] = p.value.trim(); }
    const duties = $("ws_pkDuty").value.split("\n").map((x) => x.trim()).filter(Boolean);
    const j = await call("owners", { ...(VIEW ? { uid: VIEW } : {}), ev, parts, duties }); if (j) { MYEV = j.mine || ev; MYPARTS = j.parts || parts; MYDUTY = j.duties || duties; if (VIEW) OWNERS[VIEW] = MYEV; PICK = false; } render(); };
  if (RO()) return;
  /* 📨 the person's side */
  on("input[data-mdone]", "onchange", async (el) => { const j = await call("reply", { id: el.dataset.mdone, done: el.checked }); if (j) INBOX = j.items; render(); });
  on("textarea[data-mans]", "onchange", async (el) => { const j = await call("reply", { id: el.dataset.mans, ans: el.value }); if (j) INBOX = j.items; });
  /* 📨 Sparrow's side */
  if ($("ws_to")) $("ws_to").onchange = () => { TO = $("ws_to").value; render(); };
  if ($("ws_sendBtn")) $("ws_sendBtn").onclick = async () => { const text = $("ws_send").value.trim(); if (!text) return; const j = await call("send", { to: TO, text, q: $("ws_sendQ").checked }); if (j) OUT[TO] = j.items; render(); };
  on("[data-unsend]", "onclick", async (b) => { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = "🗑 ?"; return; } const j = await call("unsend", { to: TO, id: b.dataset.unsend }); if (j) OUT[TO] = j.items; render(); });
  if ($("ws_copy")) $("ws_copy").onclick = async () => { const txt = msgText(TO, OWNERS[TO] || []), out = $("ws_cout"); out.value = txt; out.hidden = false;
    try { await navigator.clipboard.writeText(txt); $("ws_cmsg").textContent = t("copied"); } catch (e) { out.focus(); out.select(); $("ws_cmsg").textContent = t("sel"); } };
  /* own items */
  on("input[data-tick]", "onchange", async (el) => { const key = el.dataset.tick, it = MINE.items.find((x) => x.id === el.dataset.id);
    if (key) { if (el.checked) MINE.done[key] = 1; else delete MINE.done[key]; } else if (it) { if (el.checked) it.done = true; else delete it.done; }
    await save(); render(); });
  on("input[data-peek]", "onchange", async (el) => { if (el.checked) MINE.done[el.dataset.peek] = 1; else delete MINE.done[el.dataset.peek]; await save(); render(); });
  on("input[data-ann]", "onchange", async (el) => { if (el.checked) MINE.ann[el.dataset.ann] = 1; else delete MINE.ann[el.dataset.ann]; await save(); render(); });
  on("textarea[data-qans]", "onchange", async (el) => { const it = MINE.items.find((x) => x.id === el.dataset.qans); if (!it) return; const a = el.value.trim(); if (a) it.ans = a; else delete it.ans; await save(); });
  root.querySelectorAll("input[data-add]").forEach((el) => { el.onkeydown = async (e) => { if (e.key !== "Enter" || e.isComposing) return; const text = el.value.trim(); if (!text) return; MINE.items.push({ id: newId(), k: el.dataset.add, text }); await save(); render(); const again = root.querySelector(`input[data-add="${el.dataset.add}"]`); if (again) again.focus(); }; });
  on("[data-edit]", "onclick", (b) => { const it = MINE.items.find((x) => x.id === b.dataset.edit); if (it) { EDIT = { ...it }; render(); } });
  on("[data-del]", "onclick", async (b) => { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = "🗑 ?"; return; } MINE.items = MINE.items.filter((x) => x.id !== b.dataset.del); EDIT = null; await save(); render(); });
  if ($("ws_rep")) $("ws_rep").onclick = () => { EDIT = { id: "", k: "daily", text: "" }; render(); };
  if ($("ws_form")) {
    formShow(); $("wf_k").onchange = formShow;
    $("wf_cancel").onclick = () => { EDIT = null; render(); };
    $("wf_save").onclick = async () => {
      const k = $("wf_k").value, it = { id: EDIT.id || newId(), k, text: $("wf_text").value.trim() }, bad = (m) => { $("wf_msg").className = "msg warn"; $("wf_msg").textContent = m; };
      if (!it.text) return bad(t("needText"));
      const note = $("wf_note").value.trim(); if (note) it.note = note; if (EDIT.who) it.who = EDIT.who;
      if (k === "daily" || k === "event" || k === "once") { const at = cleanAt($("wf_at").value); if (at) it.at = at; }
      if (k === "event") { it.ev = $("wf_ev").value; it.due = Math.round(+$("wf_due").value || 1) - 1; if (!it.ev) return bad(t("needEv")); }
      if (k === "once" && $("wf_date").value) it.date = $("wf_date").value;
      if (k === "q") { const ans = $("wf_ans").value.trim(); if (ans) it.ans = ans; }
      if (EDIT.done && k !== "daily" && k !== "event") it.done = true;
      const i = MINE.items.findIndex((x) => x.id === it.id); if (i >= 0) MINE.items[i] = it; else MINE.items.push(it);
      EDIT = null; await save(); render();
    };
  }
}

/* ---- 📤 For Claude / 📥 NXS-PATCH (Events tab, Sparrow's card): her own items as text, and edits coming back ---- */
/* not async: copying to the clipboard must happen right in the click (the Events tab starts this page when Sparrow's card is drawn) */
function forClaude() {
  if (!MINE) return "";
  const d = MINE, L = ["\n\n===== Sparrow personal (private workspace; not shared with officers) ====="];
  for (const it of d.items) {
    const when = it.k === "daily" ? "every day" : it.k === "event" ? `with [${it.ev}] day ${(Number(it.due) || 0) + 1}` : it.k === "once" ? "own list" + (it.date ? " " + it.date : "") : it.k === "proj" ? "ongoing" : "question";
    L.push(`${it.done ? "✅" : it.k === "q" ? "❓" : "⬜"} (${it.id}) ${when}${it.at ? " " + it.at : ""}: ${it.text}${it.note ? " — note: " + it.note : ""}${it.k === "q" ? " — answer: " + (it.ans || "(none yet)") : ""}`);
  }
  if (!d.items.length) L.push("(no items yet)");
  for (const p of PEOPLE) { const list = OUT[p.id] || []; if (!list.length) continue; L.push(`\nSent to ${p.name} (shown on their workspace):`); for (const m of list) L.push(`${m.done ? "✅" : "⬜"} ${m.q ? "question: " : ""}${m.text}${m.ans ? " — their answer: " + m.ans : ""}`); }
  L.push("\nPersonal data (JSON) — for NXS-PATCH \"personal\": { \"set\": [items; an item with a known id replaces it, without id it is added], \"delete\": [ids] }. \"owners\": { \"me\" or \"<discord id>\": { \"parts\": { \"<event id>\": \"that person's part of the event (may be empty)\" }, \"duties\": [\"standing duty\", …] } } sets who is responsible for which events (replaces that person's whole list). k = daily | event | once (her own list) | proj (ongoing work) | q (question); event items need ev (event id) and due (0 = first day, -1 = the day before); at = HH:MM UTC; date = YYYY-MM-DD; note = note or next step; q items may carry ans; once / proj / q may carry done.\n" + JSON.stringify(d.items));
  return L.join("\n");
}
/* check a "personal" patch: returns { html, apply } or throws */
async function patch(p) {
  if (!MINE) await load("");
  if (!p || typeof p !== "object") throw new Error("personal: not an object");
  const bad = Object.keys(p).filter((k) => !["set", "delete", "owners"].includes(k)); if (bad.length) throw new Error("personal: unknown key " + bad.join(", "));
  /* "owners": { "me" | "<discord id>": { "parts": { "<event id>": "their part" }, "duties": [...] } } — who is responsible for what (ids only, never names) */
  const own = [], known = new Set(evList().map((e) => e.id));
  if (p.owners !== undefined) { if (!p.owners || typeof p.owners !== "object" || Array.isArray(p.owners)) throw new Error("personal.owners must be an object");
    for (const [who, v] of Object.entries(p.owners)) { if (who !== "me" && !/^\d{15,21}$/.test(who)) throw new Error("personal.owners: use \"me\" or a Discord id, not " + who);
      const parts = (v && v.parts && typeof v.parts === "object" && v.parts) || {}, miss = Object.keys(parts).filter((k) => !known.has(k)); if (miss.length) throw new Error("personal.owners: no event " + miss.join(", "));
      own.push({ who, ev: Object.keys(parts), parts, duties: Array.isArray(v && v.duties) ? v.duties.map(String) : [] }); } }
  for (const k of ["set", "delete"]) if (p[k] !== undefined && !Array.isArray(p[k])) throw new Error(`personal.${k} must be a list`);
  const next = MINE.items.map((x) => ({ ...x })), parts = [], s = (v) => String(v == null ? "" : v).replace(/\r/g, "").trim();
  for (const id of p.delete || []) { const i = next.findIndex((x) => x.id === String(id)); if (i < 0) throw new Error("personal.delete: no item " + id); parts.push(`<div class="del">− ${esc(next[i].text)}</div>`); next.splice(i, 1); }
  for (const x of p.set || []) {
    const k = s(x && x.k); if (!KINDS.includes(k)) throw new Error("personal.set: k must be daily, event, once, proj or q");
    const it = { id: s(x.id) || newId(), k, text: s(x.text) }; if (!it.text) throw new Error("personal.set: an item has no text");
    if (!/^[\w-]{1,24}$/.test(it.id)) throw new Error("personal.set: bad id " + it.id);
    if (s(x.who)) it.who = s(x.who); if (s(x.note)) it.note = s(x.note);
    if (k !== "q" && k !== "proj" && cleanAt(x.at)) it.at = cleanAt(x.at);
    if (k === "event") { it.ev = s(x.ev); it.due = Math.round(+x.due || 0); if (!evList().some((e) => e.id === it.ev)) throw new Error("personal.set: no event " + it.ev); }
    if (k === "once" && /^\d{4}-\d{2}-\d{2}$/.test(s(x.date))) it.date = s(x.date);
    if (k === "q" && s(x.ans)) it.ans = s(x.ans);
    if ((k === "q" || k === "once" || k === "proj") && x.done) it.done = true;
    const i = next.findIndex((y) => y.id === it.id);
    if (i >= 0 && JSON.stringify(next[i]) === JSON.stringify(it)) continue;
    parts.push(`<div class="add">${i >= 0 ? "✏️" : "+"} ${esc(t(k))}: ${esc(it.text)}${it.ans ? " — " + esc(it.ans) : ""}</div>`);
    if (i >= 0) next[i] = it; else next.push(it);
  }
  for (const o of own) { const nm = o.who === "me" ? t("mine") : (PEOPLE.find((x) => x.id === o.who) || {}).name || o.who;
    parts.push(`<div class="add">🎯 ${esc(nm)}: ${esc(o.ev.map(evName).join(" · "))}${o.duties.length ? `<br>📌 ${esc(o.duties.join(" · "))}` : ""}</div>`); }
  const changed = parts.length - own.length > 0;
  return { html: parts.length ? `<div class="ev">🗂️ ${esc(t("title").replace(/^\S+\s/, ""))}</div>${parts.join("")}` : "",
    apply: async () => { let ok = true;
      for (const o of own) { const j = await call("owners", { ...(o.who === "me" ? {} : { uid: o.who }), ev: o.ev, parts: Object.fromEntries(Object.entries(o.parts).map(([k, v]) => [k, String(v || "")])), duties: o.duties }); if (!j) ok = false; }
      if (changed) { MINE.items = next; ok = (await save()) && ok; }
      try { await load(VIEW); } catch (e) {}
      render(); return ok; } };
}
OFFICER.ws = { forClaude, patch };

function applyTexts() { if ($("ws_title")) { $("ws_title").textContent = t("title"); $("ws_intro").textContent = ""; } }
async function init() {
  applyTexts(); render();
  try { await OFFICER.ensure("events"); } catch (e) {}
  try { await load(""); } catch (e) { ERR = t("loadFail"); }
  render();
  if (isOwner()) { await loadPeek(); if (D && !EDIT && !PICK && !BUSY) render(); }
}
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ws = { init, applyTexts, setLang, onShow: () => { if (D && !EDIT && !PICK && !BUSY) render(); } };
})();
