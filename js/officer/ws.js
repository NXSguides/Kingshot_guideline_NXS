/* NXS officer page — 🗂️ My workspace (registers OFFICER_PAGES.ws). Sherry 2026-11-22.
   A private page per login: things to follow up, people to remind, questions to look up. Admins only.
   Stored on the Worker under the person's own Discord id (/ws), apart from every other officer data and from site updates.
   Only that person can open and change it; Sparrow (the site owner) can also open another person's page, read-only, to check for problems.
   Nothing from it goes to the site AI or to Little Sparrow. No names in this file: the "for" list is part of each person's own data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const DAY = 86400000;
let lang = OFFICER.lang || "en";
let D = null, MINE = null, VIEW = "", OTHERS = [], EDIT = null, BUSY = false, ERR = "";
const T = {
  en: { title: "🗂️ My workspace", lead: "Only you can see and change this page. The site AI and Little Sparrow never read it.", leadO: "Sparrow can also open it (read only) to check that it works.",
    seeing: "Whose page", mine: "Mine", ro: "👁️ You are looking at {n}'s page. You can't change it.", empty: "Nothing here yet.",
    today: "Today", utc: "UTC", none: "Nothing for today.", late: "late", daily: "🔁 Every day", event: "📅 With an event", once: "📌 One time", q: "❓ To look up",
    next: "Next 2 days", tomorrow: "Tomorrow", day: "Day {a} of {b}", ours: "our times", noEv: "No events.",
    brief: "📋 Briefing", briefSub: "Today's and tomorrow's events, timed to-dos, and your items for the chosen person, as English text to copy.", briefFor: "For", briefBtn: "📋 Copy briefing", copied: "Copied ✓", sel: "Select the text and copy it.",
    all: "All items", add: "+ Add", save: "💾 Save", cancel: "Cancel", del: "🗑", edit: "✏️", kind: "Kind", text: "What", who: "For (empty = me)", note: "Note", ev: "Event", dayN: "Day of the event (1 = first day, 0 = the day before)", at: "Time (UTC, optional)", date: "Date (optional)", ans: "Answer", found: "Found",
    needText: "Write what it is first.", needEv: "Pick an event.", saved: "Saved ✓", saving: "Saving…", conflict: "This page was changed on another device. It has been reloaded — do the change again.", fail: "Could not save. Try again.", loadFail: "Could not load the page.",
    ann: "📣 Coming on the kingdom timeline", annSub: "Everything that arrives before the 3rd KvK from now ({d}). Tick it once it has been announced.", annDone: "announced", annNone: "Nothing new before then.", inDays: "in {n} days", me: "me" },
  zh: { title: "🗂️ 我的工作區", lead: "這一頁只有你自己看得到、能改。網站 AI 和小麻雀都不會讀這裡的內容。", leadO: "Sparrow 也能打開（只能看），用來確認有沒有問題。",
    seeing: "看誰的", mine: "我的", ro: "👁️ 你正在看 {n} 的頁面，不能修改。", empty: "還沒有東西。",
    today: "今天", utc: "UTC", none: "今天沒有項目。", late: "逾期", daily: "🔁 每天", event: "📅 跟著活動", once: "📌 一次性", q: "❓ 待查問題",
    next: "未來 2 天", tomorrow: "明天", day: "第 {a} 天／共 {b} 天", ours: "我們的時間", noEv: "沒有活動。",
    brief: "📋 簡報", briefSub: "把今天、明天的活動、有時間的待辦，以及給所選對象的項目，整理成一段英文，可以直接複製。", briefFor: "對象", briefBtn: "📋 複製簡報", copied: "已複製 ✓", sel: "請選取文字後複製。",
    all: "全部項目", add: "＋ 新增", save: "💾 儲存", cancel: "取消", del: "🗑", edit: "✏️", kind: "種類", text: "內容", who: "對象（空白＝自己）", note: "備註", ev: "活動", dayN: "活動的第幾天（1＝第一天，0＝前一天）", at: "時間（UTC，可不填）", date: "日期（可不填）", ans: "答案", found: "已查到",
    needText: "請先寫內容。", needEv: "請選一個活動。", saved: "已儲存 ✓", saving: "儲存中…", conflict: "這一頁在另一台裝置上改過，已重新載入，請再改一次。", fail: "儲存失敗，請再試一次。", loadFail: "讀取失敗。",
    ann: "📣 王國時間表上即將開放的內容", annSub: "從現在算起第 3 次 KvK（{d}）之前會開放的所有內容。公告過就打勾。", annDone: "已公告", annNone: "那之前沒有新內容。", inDays: "{n} 天後", me: "自己" },
  pt: { title: "🗂️ Meu espaço", lead: "Só você vê e muda esta página. A IA do site e o Pardalzinho nunca leem o que está aqui.", leadO: "Sparrow também pode abrir (só leitura) para ver se funciona.",
    seeing: "Página de", mine: "Minha", ro: "👁️ Você está vendo a página de {n}. Não dá para mudar.", empty: "Ainda não há nada.",
    today: "Hoje", utc: "UTC", none: "Nada para hoje.", late: "atrasado", daily: "🔁 Todo dia", event: "📅 Com um evento", once: "📌 Uma vez", q: "❓ Para pesquisar",
    next: "Próximos 2 dias", tomorrow: "Amanhã", day: "Dia {a} de {b}", ours: "nossos horários", noEv: "Sem eventos.",
    brief: "📋 Resumo", briefSub: "Os eventos de hoje e de amanhã, tarefas com horário e seus itens para a pessoa escolhida, em inglês, para copiar.", briefFor: "Para", briefBtn: "📋 Copiar resumo", copied: "Copiado ✓", sel: "Selecione o texto e copie.",
    all: "Todos os itens", add: "+ Adicionar", save: "💾 Salvar", cancel: "Cancelar", del: "🗑", edit: "✏️", kind: "Tipo", text: "O quê", who: "Para (vazio = eu)", note: "Nota", ev: "Evento", dayN: "Dia do evento (1 = primeiro dia, 0 = dia anterior)", at: "Hora (UTC, opcional)", date: "Data (opcional)", ans: "Resposta", found: "Encontrado",
    needText: "Escreva o que é primeiro.", needEv: "Escolha um evento.", saved: "Salvo ✓", saving: "Salvando…", conflict: "Esta página foi mudada em outro aparelho. Ela foi recarregada — faça a mudança de novo.", fail: "Não deu para salvar. Tente de novo.", loadFail: "Não deu para carregar a página.",
    ann: "📣 Chegando na linha do tempo do reino", annSub: "Tudo o que chega antes do 3º KvK a partir de agora ({d}). Marque quando já foi anunciado.", annDone: "anunciado", annNone: "Nada novo até lá.", inDays: "em {n} dias", me: "eu" },
  ar: { title: "🗂️ مساحتي", lead: "أنت فقط ترى هذه الصفحة وتعدّلها. ذكاء الموقع والعصفور الصغير لا يقرآن ما فيها أبدًا.", leadO: "يستطيع Sparrow فتحها أيضًا (للعرض فقط) للتأكد من أنها تعمل.",
    seeing: "صفحة مَن", mine: "صفحتي", ro: "👁️ أنت تشاهد صفحة {n}. لا يمكنك تعديلها.", empty: "لا شيء هنا بعد.",
    today: "اليوم", utc: "UTC", none: "لا شيء لليوم.", late: "متأخر", daily: "🔁 كل يوم", event: "📅 مع حدث", once: "📌 مرة واحدة", q: "❓ للبحث عنه",
    next: "اليومان القادمان", tomorrow: "غدًا", day: "اليوم {a} من {b}", ours: "أوقاتنا", noEv: "لا أحداث.",
    brief: "📋 ملخص", briefSub: "أحداث اليوم والغد، والمهام ذات الوقت، وبنودك للشخص المختار، كنص إنجليزي للنسخ.", briefFor: "إلى", briefBtn: "📋 نسخ الملخص", copied: "تم النسخ ✓", sel: "حدّد النص وانسخه.",
    all: "كل البنود", add: "+ إضافة", save: "💾 حفظ", cancel: "إلغاء", del: "🗑", edit: "✏️", kind: "النوع", text: "ماذا", who: "إلى (فارغ = أنا)", note: "ملاحظة", ev: "الحدث", dayN: "يوم الحدث (1 = اليوم الأول، 0 = اليوم السابق)", at: "الوقت (UTC، اختياري)", date: "التاريخ (اختياري)", ans: "الإجابة", found: "وُجدت",
    needText: "اكتب ما هو أولًا.", needEv: "اختر حدثًا.", saved: "تم الحفظ ✓", saving: "جارٍ الحفظ…", conflict: "تم تعديل هذه الصفحة من جهاز آخر. أُعيد تحميلها — أعد التعديل.", fail: "تعذّر الحفظ. حاول مرة أخرى.", loadFail: "تعذّر تحميل الصفحة.",
    ann: "📣 قادم في الجدول الزمني للمملكة", annSub: "كل ما يصل قبل ثالث KvK من الآن ({d}). ضع علامة بعد الإعلان عنه.", annDone: "أُعلن", annNone: "لا جديد قبل ذلك.", inDays: "بعد {n} يوم", me: "أنا" },
  ko: { title: "🗂️ 내 작업 공간", lead: "이 페이지는 본인만 보고 고칠 수 있어요. 사이트 AI와 작은 참새는 여기 내용을 읽지 않아요.", leadO: "Sparrow도 열어 볼 수 있어요(보기 전용). 문제가 없는지 확인하려는 거예요.",
    seeing: "누구 페이지", mine: "내 것", ro: "👁️ {n}의 페이지를 보고 있어요. 수정할 수 없어요.", empty: "아직 아무것도 없어요.",
    today: "오늘", utc: "UTC", none: "오늘 항목이 없어요.", late: "지남", daily: "🔁 매일", event: "📅 이벤트와 함께", once: "📌 한 번", q: "❓ 알아볼 것",
    next: "앞으로 2일", tomorrow: "내일", day: "{b}일 중 {a}일차", ours: "우리 시간", noEv: "이벤트 없음.",
    brief: "📋 브리핑", briefSub: "오늘과 내일의 이벤트, 시간이 있는 할 일, 선택한 사람에게 줄 항목을 영어 텍스트로 만들어 복사해요.", briefFor: "대상", briefBtn: "📋 브리핑 복사", copied: "복사됨 ✓", sel: "텍스트를 선택해 복사하세요.",
    all: "전체 항목", add: "+ 추가", save: "💾 저장", cancel: "취소", del: "🗑", edit: "✏️", kind: "종류", text: "내용", who: "대상 (비우면 나)", note: "메모", ev: "이벤트", dayN: "이벤트 며칠째 (1 = 첫날, 0 = 전날)", at: "시간 (UTC, 선택)", date: "날짜 (선택)", ans: "답", found: "찾음",
    needText: "내용을 먼저 적어 주세요.", needEv: "이벤트를 고르세요.", saved: "저장됨 ✓", saving: "저장 중…", conflict: "다른 기기에서 이 페이지가 바뀌었어요. 다시 불러왔으니 한 번 더 고쳐 주세요.", fail: "저장하지 못했어요. 다시 해 보세요.", loadFail: "페이지를 불러오지 못했어요.",
    ann: "📣 왕국 타임라인에 곧 열리는 것", annSub: "지금부터 3번째 KvK({d}) 전에 열리는 모든 것. 공지했으면 체크하세요.", annDone: "공지함", annNone: "그 전에 새로 열리는 것이 없어요.", inDays: "{n}일 후", me: "나" } };
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const KINDS = ["daily", "event", "once", "q"];
const utcDay = (x) => Math.floor(x / DAY) * DAY, iso = (x) => new Date(x).toISOString().slice(0, 10), md = (x) => iso(x).slice(5);
const EV = () => OFFICER_PAGES.events || {};
const blank = () => ({ v: 1, rev: 0, items: [], done: {}, ann: {}, targets: [] });
const norm = (d) => { const o = d && typeof d === "object" ? d : {}; return { v: 1, rev: +o.rev || 0, items: Array.isArray(o.items) ? o.items : [], done: o.done && typeof o.done === "object" ? o.done : {}, ann: o.ann && typeof o.ann === "object" ? o.ann : {}, targets: Array.isArray(o.targets) ? o.targets : [] }; };

async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/ws", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if ((!r.ok || j.error) && j.error !== "conflict") throw new Error(j.error || "HTTP " + r.status);
  return j;
}
async function load(uid) {
  const j = await api("get", uid ? { uid } : {});
  if (!uid) { MINE = norm(j.ws); OTHERS = Array.isArray(j.others) ? j.others : []; }
  D = uid ? norm(j.ws) : MINE; VIEW = uid || "";
  return D;
}
const RO = () => !!VIEW;
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

/* ---- what is due ---- */
const runsOf = (from, to) => { try { return EV().runs ? EV().runs(from, to) : []; } catch (e) { return []; } };
const evName = (k) => { try { return EV().evName ? EV().evName(k) : k; } catch (e) { return k; } };
const evEn = (k) => { try { const e = (EV().list() || []).find((x) => x.id === k); return e ? e.en || k : k; } catch (e) { return k; } };
/* items that fall on one UTC day: { it, key (tick key), at, late } */
function dueOn(d, day, withOpen) {
  const out = [], rs = runsOf(day - 45 * DAY, day + 10 * DAY);
  for (const it of d.items) {
    if (it.k === "daily") out.push({ it, key: it.id + "|" + iso(day), at: it.at || "" });
    else if (it.k === "event") { for (const r of rs) if (r.k === it.ev && r.st + (Number(it.due) || 0) * DAY === day) out.push({ it, key: it.id + "|" + iso(r.st), at: it.at || "" }); }
    else if (it.k === "once" && withOpen && !it.done) { if (!it.date || it.date <= iso(day)) out.push({ it, at: it.at || "", late: !!it.date && it.date < iso(day) }); }
    else if (it.k === "once" && !withOpen && it.date === iso(day) && !it.done) out.push({ it, at: it.at || "" });
  }
  return out.sort((a, b) => (a.at || "99") < (b.at || "99") ? -1 : (a.at || "99") > (b.at || "99") ? 1 : 0);
}
const isDone = (d, x) => x.key ? !!d.done[x.key] : !!x.it.done;
/* events running on a day: [{ k, n, of, times }] */
function eventsOn(day) {
  let times = {}; try { times = (EV().times && EV().times()) || {}; } catch (e) {}
  return runsOf(day, day + DAY).filter((r) => r.st <= day && r.en > day).map((r) => { const tm = times[r.k]; return { k: r.k, n: Math.round((day - r.st) / DAY) + 1, of: r.days, times: Array.isArray(tm) ? tm.filter(Boolean) : [] }; });
}
/* officer to-dos of the shared calendar that have an exact time on that day (registration closes 23:00 and the like) */
function timedTodos(day) {
  const out = []; let list = []; try { list = EV().list() || []; } catch (e) {}
  for (const r of runsOf(day - 10 * DAY, day + 10 * DAY)) { const e = list.find((x) => x.id === r.k); if (!e) continue;
    for (const x of e.todo || []) if (x.at && r.st + (Number(x.due) || 0) * DAY === day) out.push({ at: x.at, ev: e.en || r.k, txt: String(x.en || x.zh || "").replace(/\*\*/g, "").trim() }); }
  return out.sort((a, b) => a.at < b.at ? -1 : 1);
}
/* 📣 timeline: everything that arrives before the 3rd KvK from now (the R5's rule, 2026-11-22) */
function announce() {
  const today = utcDay(Date.now());
  let bd = 6; try { bd = Number(((EV().times() || {}).days || {}).kvk) || 6; } catch (e) {}   // KvK battle day: day 6 of the run (Saturday) unless 📅 Events says otherwise
  const kv = runsOf(today, today + 120 * DAY).filter((r) => r.k === "kvk").map((r) => r.st + (bd - 1) * DAY).filter((x) => x >= today);
  const lim = kv[2] || 0; let ms = []; try { ms = EV().milestones ? EV().milestones() : []; } catch (e) {}
  return { lim, list: lim ? ms.filter((m) => m.t >= today && m.t < lim) : [] };
}

/* ---- drawing ---- */
const whoList = (d) => [...new Set([...(d.targets || []), ...d.items.map((x) => x.who || "")].map((x) => String(x).trim()).filter(Boolean))];
const whoTag = (it) => it.who ? `<span class="ws-who">→ ${esc(it.who)}</span>` : "";
const kindTag = (it) => `<span class="ws-k">${esc(t(it.k).split(" ")[0])}</span>`;
function rowHtml(d, x) {
  const it = x.it, on = isDone(d, x);
  const box = RO() ? `<span>${on ? "✅" : "⬜"}</span>` : `<input type="checkbox" data-tick="${esc(x.key || "")}" data-id="${esc(it.id)}"${on ? " checked" : ""}>`;
  return `<label class="ws-row${on ? " done" : ""}">${box}<span class="ws-tx">${x.at ? `<b>${esc(x.at)}</b> ` : ""}${kindTag(it)} ${esc(it.text)}${it.k === "event" ? ` <span class="muted">· ${esc(evName(it.ev))}</span>` : ""} ${whoTag(it)}${x.late ? ` <span class="ws-late">${esc(t("late"))}${it.date ? " " + esc(it.date.slice(5)) : ""}</span>` : ""}${it.note ? `<small>${esc(it.note)}</small>` : ""}</span></label>`;
}
function qHtml(it) {
  return `<div class="ws-q${it.done ? " done" : ""}"><div>${it.done ? "✅" : "❓"} ${esc(it.text)} ${whoTag(it)}</div>${it.note ? `<small>${esc(it.note)}</small>` : ""}${it.ans ? `<div class="ws-ans">${esc(it.ans)}</div>` : ""}</div>`;
}
function todayCard(d) {
  const today = utcDay(Date.now()), due = dueOn(d, today, true), qs = d.items.filter((x) => x.k === "q" && !x.done);
  let h = `<div class="card"><h2>${esc(t("today"))} · ${esc(iso(today))} <span class="muted" style="font-weight:400">(${esc(t("utc"))})</span></h2>`;
  h += due.length ? due.map((x) => rowHtml(d, x)).join("") : `<div class="muted">${esc(t("none"))}</div>`;
  if (qs.length) h += `<h3>${esc(t("q"))}</h3>` + qs.map(qHtml).join("");
  h += `<h3>${esc(t("next"))}</h3>`;
  for (let i = 0; i <= 2; i++) { const day = today + i * DAY, evs = eventsOn(day), tt = timedTodos(day), mine = i ? dueOn(d, day, false).filter((x) => x.it.k !== "daily") : [];
    h += `<div class="ws-day"><b>${esc(i === 0 ? t("today") : i === 1 ? t("tomorrow") : md(day))}</b>${i < 2 ? ` <span class="muted">${esc(md(day))}</span>` : ""}`;
    h += evs.length ? evs.map((e) => `<div>· ${esc(evName(e.k))} <span class="muted">${esc(t("day").replace("{a}", e.n).replace("{b}", e.of))}${e.times.length ? " · " + esc(t("ours")) + " " + esc(e.times.join(", ")) : ""}</span></div>`).join("") : `<div class="muted">${esc(t("noEv"))}</div>`;
    h += tt.map((x) => `<div class="ws-tt">⏰ <b>${esc(x.at)}</b> ${esc(x.txt)} <span class="muted">· ${esc(x.ev)}</span></div>`).join("");
    h += mine.map((x) => `<div class="ws-tt">📝 ${x.at ? `<b>${esc(x.at)}</b> ` : ""}${esc(x.it.text)} ${whoTag(x.it)}</div>`).join("");
    h += `</div>`; }
  return h + `</div>`;
}
function annCard(d) {
  const a = announce(), today = utcDay(Date.now()); if (!a.lim) return "";
  const rows = a.list.map((m) => { const k = iso(m.t), on = !!d.ann[k];
    return `<label class="ws-row${on ? " done" : ""}">${RO() ? `<span>${on ? "✅" : "⬜"}</span>` : `<input type="checkbox" data-ann="${k}"${on ? " checked" : ""}>`}<span class="ws-tx"><b>${esc(k)}</b> <span class="muted">${esc(t("inDays").replace("{n}", Math.round((m.t - today) / DAY)))}</span>${on ? ` <span class="ws-who">${esc(t("annDone"))}</span>` : ""}<small>${esc(m.l.join(" · "))}</small></span></label>`; }).join("");
  return `<div class="card" id="ws_ann"><h2>${esc(t("ann"))}</h2><div class="muted ws-sub">${esc(t("annSub").replace("{d}", iso(a.lim)))}</div>${rows || `<div class="muted">${esc(t("annNone"))}</div>`}</div>`;
}
function briefCard(d) {
  const ws = whoList(d);
  return `<div class="card" id="ws_brief"><h2>${esc(t("brief"))}</h2><div class="muted ws-sub">${esc(t("briefSub"))}</div>
    <div class="row" style="gap:8px;align-items:center"><span>${esc(t("briefFor"))}</span><select class="inp" id="ws_bwho">${ws.map((w) => `<option>${esc(w)}</option>`).join("")}<option value="">${esc(t("me"))}</option></select><button type="button" class="btn primary" id="ws_bcopy">${esc(t("briefBtn"))}</button><span class="msg" id="ws_bmsg"></span></div>
    <textarea class="inp" id="ws_bout" rows="9" readonly hidden style="width:100%;margin-top:8px;font-size:12.5px"></textarea></div>`;
}
/* the English text for one person: events today and tomorrow, timed to-dos, and the items marked for them */
function briefText(d, who) {
  const today = utcDay(Date.now()), L = [`Daily briefing — ${iso(today)} (all times UTC)`];
  for (let i = 0; i <= 1; i++) { const day = today + i * DAY, evs = eventsOn(day), tt = timedTodos(day);
    L.push("", i ? `Tomorrow (${md(day)}):` : `Today (${md(day)}):`);
    if (!evs.length) L.push("- no events");
    for (const e of evs) L.push(`- ${evEn(e.k)} (day ${e.n} of ${e.of})${e.times.length ? " · our times " + e.times.join(", ") : ""}`);
    for (const x of tt) L.push(`- ${x.at} ${x.txt} (${x.ev})`);
    const mine = dueOn(d, day, i === 0).filter((x) => (x.it.who || "") === who && !isDone(d, x));
    if (mine.length) { L.push(who ? "For you:" : "Mine:"); for (const x of mine) L.push(`- ${x.at ? x.at + " " : ""}${x.it.text}${x.it.note ? " — " + x.it.note : ""}`); }
  }
  const qs = d.items.filter((x) => x.k === "q" && (x.who || "") === who);
  if (qs.length) { L.push("", "Questions:"); for (const x of qs) L.push(`- ${x.text}${x.ans ? " → " + x.ans : " (not answered yet)"}`); }
  return L.join("\n");
}
function itemLine(it) {
  const when = it.k === "event" ? `${evName(it.ev)} · ${Number(it.due) >= 0 ? "D" + (Number(it.due) + 1) : it.due + "d"}${it.at ? " " + it.at : ""}` : it.k === "once" ? (it.date || "") + (it.at ? " " + it.at : "") : it.at || "";
  return `<div class="ws-it${it.done ? " done" : ""}" data-it="${esc(it.id)}"><div class="ws-tx">${it.k === "q" || it.k === "once" ? (it.done ? "✅ " : "") : ""}${esc(it.text)} ${whoTag(it)}${when ? ` <span class="muted">· ${esc(when)}</span>` : ""}${it.note ? `<small>${esc(it.note)}</small>` : ""}${it.ans ? `<div class="ws-ans">${esc(it.ans)}</div>` : ""}</div>${RO() ? "" : `<span class="ws-bt"><button type="button" class="btn small" data-edit="${esc(it.id)}">${t("edit")}</button><button type="button" class="btn small" data-del="${esc(it.id)}">${t("del")}</button></span>`}</div>`;
}
function formHtml(d) {
  const it = EDIT, evs = (() => { try { return (EV().list() || []).filter((e) => e.start && e.every > 0); } catch (e) { return []; } })();
  const f = (lbl, inner) => `<label class="ws-f"><span>${esc(lbl)}</span>${inner}</label>`;
  return `<div class="ws-form" id="ws_form">
    ${f(t("kind"), `<select class="inp" id="wf_k">${KINDS.map((k) => `<option value="${k}"${it.k === k ? " selected" : ""}>${esc(t(k))}</option>`).join("")}</select>`)}
    ${f(t("text"), `<textarea class="inp" id="wf_text" rows="2">${esc(it.text || "")}</textarea>`)}
    ${f(t("who"), `<input class="inp" id="wf_who" list="wf_wl" value="${esc(it.who || "")}"><datalist id="wf_wl">${whoList(d).map((w) => `<option value="${esc(w)}">`).join("")}</datalist>`)}
    <div data-for="event">${f(t("ev"), `<select class="inp" id="wf_ev"><option value=""></option>${evs.map((e) => `<option value="${esc(e.id)}"${it.ev === e.id ? " selected" : ""}>${esc(evName(e.id))}</option>`).join("")}</select>`)}
      ${f(t("dayN"), `<input class="inp" id="wf_due" type="number" min="-6" max="30" style="width:90px" value="${(Number(it.due) || 0) + 1}">`)}</div>
    <div data-for="once">${f(t("date"), `<input class="inp" id="wf_date" type="date" value="${esc(it.date || "")}">`)}</div>
    <div data-for="daily event once">${f(t("at"), `<input class="inp" id="wf_at" placeholder="23:00" style="width:90px" value="${esc(it.at || "")}">`)}</div>
    <div data-for="q">${f(t("ans"), `<textarea class="inp" id="wf_ans" rows="2">${esc(it.ans || "")}</textarea>`)}
      <label class="ws-f" style="flex-direction:row;align-items:center;gap:6px"><input type="checkbox" id="wf_done"${it.done ? " checked" : ""}> ${esc(t("found"))}</label></div>
    ${f(t("note"), `<textarea class="inp" id="wf_note" rows="2">${esc(it.note || "")}</textarea>`)}
    <div class="row" style="gap:8px;margin-top:8px"><button type="button" class="btn primary" id="wf_save">${esc(t("save"))}</button><button type="button" class="btn" id="wf_cancel">${esc(t("cancel"))}</button><span class="msg" id="wf_msg"></span></div></div>`;
}
function allCard(d) {
  let h = `<div class="card" id="ws_all"><h2>${esc(t("all"))}</h2>`;
  for (const k of KINDS) { const list = d.items.filter((x) => x.k === k); if (!list.length) continue; h += `<h3>${esc(t(k))}</h3>` + list.map(itemLine).join(""); }
  if (!d.items.length) h += `<div class="muted">${esc(t("empty"))}</div>`;
  if (!RO()) h += EDIT ? formHtml(d) : `<div class="row" style="margin-top:10px"><button type="button" class="btn primary" id="ws_add">${esc(t("add"))}</button></div>`;
  return h + `</div>`;
}
function render() {
  const root = $("ws_root"); if (!root) return;
  if (!D) { root.innerHTML = `<div class="card muted">${esc(ERR || "…")}</div>`; return; }
  const owner = OFFICER.user && OFFICER.user.id === OFFICER.OWNER, d = D;
  let h = `<div class="muted ws-sub">${esc(t("lead"))}${owner ? "" : " " + esc(t("leadO"))}</div>`;
  if (owner && OTHERS.length) h += `<div class="row" style="gap:8px;align-items:center;margin:8px 0"><span>${esc(t("seeing"))}</span><select class="inp" id="ws_view"><option value="">${esc(t("mine"))}</option>${OTHERS.map((o) => `<option value="${esc(o.id)}"${VIEW === o.id ? " selected" : ""}>${esc(o.name || o.id)}</option>`).join("")}</select></div>`;
  if (RO()) h += `<div class="card msg">${esc(t("ro").replace("{n}", (OTHERS.find((o) => o.id === VIEW) || {}).name || VIEW))}</div>`;
  h += `<div class="msg ${ERR ? "warn" : ""}" id="ws_msg">${esc(ERR)}</div>`;
  h += todayCard(d) + annCard(d) + briefCard(d) + allCard(d);
  root.innerHTML = h; ERR = "";
  wire(d);
}
function formShow() { const k = $("wf_k") && $("wf_k").value; document.querySelectorAll("#ws_form [data-for]").forEach((el) => { el.hidden = !el.dataset.for.split(" ").includes(k); }); }
const newId = () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const cleanAt = (v) => { const m = /^(\d{1,2}):?(\d{2})$/.exec(String(v || "").trim().replace(/[：.．]/g, ":")); return m && +m[1] < 24 && +m[2] < 60 ? m[1].padStart(2, "0") + ":" + m[2] : ""; };
function wire(d) {
  const root = $("ws_root");
  const v = $("ws_view"); if (v) v.onchange = async () => { EDIT = null; try { await load(v.value); } catch (e) { ERR = t("loadFail"); D = MINE; VIEW = ""; } render(); };
  const bc = $("ws_bcopy"); if (bc) bc.onclick = async () => { const txt = briefText(d, $("ws_bwho").value), out = $("ws_bout"); out.value = txt; out.hidden = false;
    try { await navigator.clipboard.writeText(txt); $("ws_bmsg").textContent = t("copied"); } catch (e) { out.focus(); out.select(); $("ws_bmsg").textContent = t("sel"); } };
  if (RO()) return;
  root.querySelectorAll("input[data-tick]").forEach((el) => { el.onchange = async () => { const key = el.dataset.tick, it = MINE.items.find((x) => x.id === el.dataset.id);
    if (key) { if (el.checked) MINE.done[key] = 1; else delete MINE.done[key]; } else if (it) it.done = el.checked;
    await save(); render(); }; });
  root.querySelectorAll("input[data-ann]").forEach((el) => { el.onchange = async () => { if (el.checked) MINE.ann[el.dataset.ann] = 1; else delete MINE.ann[el.dataset.ann]; await save(); render(); }; });
  root.querySelectorAll("[data-edit]").forEach((b) => { b.onclick = () => { const it = MINE.items.find((x) => x.id === b.dataset.edit); if (it) { EDIT = { ...it }; render(); const f = $("ws_form"); if (f) f.scrollIntoView({ block: "nearest" }); } }; });
  root.querySelectorAll("[data-del]").forEach((b) => { b.onclick = async () => { if (b.dataset.sure) { MINE.items = MINE.items.filter((x) => x.id !== b.dataset.del); await save(); render(); } else { b.dataset.sure = 1; b.textContent = "🗑 ?"; } }; });
  const add = $("ws_add"); if (add) add.onclick = () => { EDIT = { id: "", k: "daily", text: "" }; render(); const f = $("ws_form"); if (f) f.scrollIntoView({ block: "nearest" }); };
  if ($("ws_form")) {
    formShow(); $("wf_k").onchange = formShow;
    $("wf_cancel").onclick = () => { EDIT = null; render(); };
    $("wf_save").onclick = async () => {
      const k = $("wf_k").value, it = { id: EDIT.id || newId(), k, text: $("wf_text").value.trim() };
      if (!it.text) { $("wf_msg").className = "msg warn"; $("wf_msg").textContent = t("needText"); return; }
      const who = $("wf_who").value.trim(), note = $("wf_note").value.trim(); if (who) it.who = who; if (note) it.note = note;
      if (k !== "q") { const at = cleanAt($("wf_at").value); if (at) it.at = at; }
      if (k === "event") { it.ev = $("wf_ev").value; it.due = Math.round(+$("wf_due").value || 1) - 1; if (!it.ev) { $("wf_msg").className = "msg warn"; $("wf_msg").textContent = t("needEv"); return; } }
      if (k === "once") { if ($("wf_date").value) it.date = $("wf_date").value; if (EDIT.done) it.done = true; }
      if (k === "q") { const ans = $("wf_ans").value.trim(); if (ans) it.ans = ans; if ($("wf_done").checked) it.done = true; }
      const i = MINE.items.findIndex((x) => x.id === it.id); if (i >= 0) MINE.items[i] = it; else MINE.items.push(it);
      if (who && !MINE.targets.includes(who)) MINE.targets.push(who);
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
    const when = it.k === "daily" ? "every day" : it.k === "event" ? `with [${it.ev}] day ${(Number(it.due) || 0) + 1}` : it.k === "once" ? "one time" + (it.date ? " " + it.date : "") : "question";
    L.push(`${it.k === "q" ? (it.done ? "✅" : "❓") : it.done ? "✅" : "⬜"} (${it.id}) ${when}${it.at ? " " + it.at : ""}${it.who ? " → " + it.who : ""}: ${it.text}${it.note ? " — note: " + it.note : ""}${it.k === "q" ? " — answer: " + (it.ans || "(none yet)") : ""}`);
  }
  if (!d.items.length) L.push("(no items yet)");
  L.push("\nPersonal data (JSON) — for NXS-PATCH \"personal\": { \"set\": [items; an item with a known id replaces it, without id it is added], \"delete\": [ids] }. k = daily | event | once | q; event items need ev (event id) and due (0 = first day, -1 = the day before); at = HH:MM UTC; date = YYYY-MM-DD; q items may carry ans and done.\n" + JSON.stringify(d.items));
  return L.join("\n");
}
/* check a "personal" patch: returns { html, apply } or throws */
async function patch(p) {
  if (!MINE) await load("");
  if (!p || typeof p !== "object") throw new Error("personal: not an object");
  const bad = Object.keys(p).filter((k) => !["set", "delete"].includes(k)); if (bad.length) throw new Error("personal: unknown key " + bad.join(", "));
  for (const k of ["set", "delete"]) if (p[k] !== undefined && !Array.isArray(p[k])) throw new Error(`personal.${k} must be a list`);
  const next = MINE.items.map((x) => ({ ...x })), parts = [], s = (v) => String(v == null ? "" : v).replace(/\r/g, "").trim();
  for (const id of p.delete || []) { const i = next.findIndex((x) => x.id === String(id)); if (i < 0) throw new Error("personal.delete: no item " + id); parts.push(`<div class="del">− ${esc(next[i].text)}</div>`); next.splice(i, 1); }
  for (const x of p.set || []) {
    const k = s(x && x.k); if (!KINDS.includes(k)) throw new Error("personal.set: k must be daily, event, once or q");
    const it = { id: s(x.id) || newId(), k, text: s(x.text) }; if (!it.text) throw new Error("personal.set: an item has no text");
    if (!/^[\w-]{1,24}$/.test(it.id)) throw new Error("personal.set: bad id " + it.id);
    if (s(x.who)) it.who = s(x.who); if (s(x.note)) it.note = s(x.note);
    if (k !== "q" && cleanAt(x.at)) it.at = cleanAt(x.at);
    if (k === "event") { it.ev = s(x.ev); it.due = Math.round(+x.due || 0); let ok = false; try { ok = (EV().list() || []).some((e) => e.id === it.ev); } catch (e) {} if (!ok) throw new Error("personal.set: no event " + it.ev); }
    if (k === "once" && /^\d{4}-\d{2}-\d{2}$/.test(s(x.date))) it.date = s(x.date);
    if (k === "q" && s(x.ans)) it.ans = s(x.ans);
    if ((k === "q" || k === "once") && x.done) it.done = true;
    const i = next.findIndex((y) => y.id === it.id);
    if (i >= 0 && JSON.stringify(next[i]) === JSON.stringify(it)) continue;
    parts.push(`<div class="add">${i >= 0 ? "✏️" : "+"} ${esc(t(k))}: ${esc(it.text)}${it.who ? " → " + esc(it.who) : ""}${it.ans ? " — " + esc(it.ans) : ""}</div>`);
    if (i >= 0) next[i] = it; else next.push(it);
  }
  return { html: parts.length ? `<div class="ev">🗂️ ${esc(t("title").replace(/^\S+\s/, ""))}</div>${parts.join("")}` : "",
    apply: async () => { MINE.items = next; for (const it of next) if (it.who && !MINE.targets.includes(it.who)) MINE.targets.push(it.who); const ok = await save(); if (!VIEW) D = MINE; render(); return ok; } };
}
OFFICER.ws = { forClaude, patch };

function applyTexts() { if ($("ws_title")) { $("ws_title").textContent = t("title"); $("ws_intro").textContent = ""; } }
async function init() {
  applyTexts(); render();
  try { await OFFICER.ensure("events"); } catch (e) {}
  try { await load(""); } catch (e) { ERR = t("loadFail"); }
  render();
}
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ws = { init, applyTexts, setLang, onShow: () => { if (D && !EDIT && !BUSY) render(); } };
})();
