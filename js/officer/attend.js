/* NXS officer page — 📋 attendance tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.attend)
   Who confirmed for an event (poll) and who actually showed up. One list per event, kept on the Worker (Discord login).
   Names are matched against the roster (data/roster-x7k2p9.json) the same way the ranking tab's paste box does. */
(function () {
const ROOT = document.getElementById("pg-attend");
const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document.getElementById(id);
const esc = OFFICER.util.esc;
const ROSTER_URL = "data/roster-x7k2p9.json";
const T = {
  zh: { title: "📋 出席", sub: "每場活動一份名單：投票說會來的人，打完後勾誰真的到了。缺席會累計，連續兩次以上標紅。", login: "要先用 Discord 登入才能看出席名單。", loginBtn: "用 Discord 登入",
    newBtn: "＋ 新活動", evTitle: "活動名稱（例如 聖劍爭奪）", evDate: "日期", slot: "時段", addSlot: "＋ 時段", slotName: "時段名稱（例如 02:00 UTC）",
    confirmed: "① 說會來的人", paste: "貼上投票名單（一行一個，或用逗號分隔）", shot: "📷 或上傳投票者截圖", match: "比對成員表", ocrWait: "辨識中…",
    matched: "比對到 {n} 人", miss: "找不到（請手動加）：{list}", addMember: "手動加入成員…",
    present: "② 打完後：誰有到", presentNote: "點名字切換：✓ 有到 · ✗ 沒到 · 🛌 請假（不算缺席）", allPresent: "全部有到", noshow: "沒到", excused: "請假",
    save: "儲存", saved: "已儲存。", del: "刪除這場", delAsk: "確定刪除這場的名單？", back: "‹ 名單列表", empty: "還沒有名單。按「＋ 新活動」開始。",
    summary: "缺席統計", sumNote: "最近 {n} 場。數字 = 缺席次數，紅色 = 最近兩場都缺席。", name: "成員", events: "場次", missN: "缺席", noData: "成員表載不進來，無法比對名字。",
    copy: "複製給 Discord", copied: "已複製", legend: "X = 沒到 · 🛌 = 請假 · 紅 = 連續缺席", nobody: "這個時段還沒有人。", err: "出了點問題：{e}", dbLimit: "⚠️ 伺服器今天的免費額度用完了，UTC 00:00 重置。" },
  en: { title: "📋 Attendance", sub: "One list per event: who said yes in the poll, and after the battle, who actually showed up. Misses add up; two in a row turns red.", login: "Log in with Discord to see attendance lists.", loginBtn: "Log in with Discord",
    newBtn: "＋ New event", evTitle: "Event (e.g. Swordland Showdown)", evDate: "Date", slot: "Time slot", addSlot: "＋ Slot", slotName: "Slot name (e.g. 02:00 UTC)",
    confirmed: "① Confirmed (said yes)", paste: "Paste the poll names (one per line or comma-separated)", shot: "📷 or upload voter screenshots", match: "Match roster", ocrWait: "Reading…",
    matched: "Matched {n}", miss: "Not found (add by hand): {list}", addMember: "Add a member by hand…",
    present: "② After the battle: who showed up", presentNote: "Tap a name to cycle: ✓ showed up · ✗ no-show · 🛌 excused (not counted)", allPresent: "All showed up", noshow: "No-show", excused: "Excused",
    save: "Save", saved: "Saved.", del: "Delete this event", delAsk: "Delete this event's list?", back: "‹ All lists", empty: "No lists yet. Tap “＋ New event” to start.",
    summary: "Missed events", sumNote: "Last {n} events. Number = misses, red = missed the last two.", name: "Member", events: "Events", missN: "Missed", noData: "The roster didn't load, so names can't be matched.",
    copy: "Copy for Discord", copied: "Copied", legend: "X = no-show · 🛌 = excused · red = missed in a row", nobody: "Nobody in this slot yet.", err: "Something went wrong: {e}", dbLimit: "⚠️ The server's free daily allowance is used up; it resets at 00:00 UTC." },
  pt: { title: "📋 Presença", sub: "Uma lista por evento: quem disse sim na enquete e, depois da batalha, quem realmente apareceu. Faltas acumulam; duas seguidas ficam em vermelho.", login: "Entre com o Discord para ver as listas de presença.", loginBtn: "Entrar com Discord",
    newBtn: "＋ Novo evento", evTitle: "Evento (ex.: Confronto entre Espadas)", evDate: "Data", slot: "Horário", addSlot: "＋ Horário", slotName: "Nome do horário (ex.: 02:00 UTC)",
    confirmed: "① Confirmados (disseram sim)", paste: "Cole os nomes da enquete (um por linha ou separados por vírgula)", shot: "📷 ou envie capturas dos votantes", match: "Comparar com a lista", ocrWait: "Lendo…",
    matched: "{n} encontrados", miss: "Não encontrados (adicione à mão): {list}", addMember: "Adicionar membro à mão…",
    present: "② Depois da batalha: quem apareceu", presentNote: "Toque no nome para alternar: ✓ apareceu · ✗ faltou · 🛌 justificado (não conta)", allPresent: "Todos apareceram", noshow: "Faltou", excused: "Justificado",
    save: "Salvar", saved: "Salvo.", del: "Excluir este evento", delAsk: "Excluir a lista deste evento?", back: "‹ Todas as listas", empty: "Ainda não há listas. Toque em “＋ Novo evento”.",
    summary: "Faltas", sumNote: "Últimos {n} eventos. Número = faltas, vermelho = faltou nos dois últimos.", name: "Membro", events: "Eventos", missN: "Faltas", noData: "A lista de membros não carregou; não dá para comparar nomes.",
    copy: "Copiar para o Discord", copied: "Copiado", legend: "X = faltou · 🛌 = justificado · vermelho = faltas seguidas", nobody: "Ninguém neste horário ainda.", err: "Algo deu errado: {e}", dbLimit: "⚠️ A cota gratuita diária do servidor acabou; volta às 00:00 UTC." },
  ar: { title: "📋 الحضور", sub: "قائمة لكل فعالية: من قال نعم في التصويت، وبعد المعركة من حضر فعلًا. الغيابات تتراكم، ومرتان متتاليتان تظهران بالأحمر.", login: "سجّل الدخول عبر Discord لرؤية قوائم الحضور.", loginBtn: "تسجيل الدخول عبر Discord",
    newBtn: "＋ فعالية جديدة", evTitle: "الفعالية (مثل مواجهة أرض السيوف)", evDate: "التاريخ", slot: "الفترة", addSlot: "＋ فترة", slotName: "اسم الفترة (مثل 02:00 UTC)",
    confirmed: "① المؤكدون (قالوا نعم)", paste: "الصق أسماء التصويت (اسم في كل سطر أو مفصولة بفواصل)", shot: "📷 أو ارفع لقطات شاشة للمصوّتين", match: "مطابقة مع القائمة", ocrWait: "جارٍ القراءة…",
    matched: "تمت مطابقة {n}", miss: "غير موجود (أضفه يدويًا): {list}", addMember: "إضافة عضو يدويًا…",
    present: "② بعد المعركة: من حضر", presentNote: "اضغط على الاسم للتبديل: ✓ حضر · ✗ غاب · 🛌 معذور (لا يُحتسب)", allPresent: "حضر الجميع", noshow: "غاب", excused: "معذور",
    save: "حفظ", saved: "تم الحفظ.", del: "حذف هذه الفعالية", delAsk: "حذف قائمة هذه الفعالية؟", back: "‹ كل القوائم", empty: "لا توجد قوائم بعد. اضغط «＋ فعالية جديدة».",
    summary: "الغيابات", sumNote: "آخر {n} فعاليات. الرقم = الغيابات، الأحمر = غاب في آخر فعاليتين.", name: "العضو", events: "الفعاليات", missN: "غياب", noData: "لم تُحمَّل قائمة الأعضاء، فلا يمكن مطابقة الأسماء.",
    copy: "نسخ إلى Discord", copied: "تم النسخ", legend: "X = غاب · 🛌 = معذور · أحمر = غيابات متتالية", nobody: "لا أحد في هذه الفترة بعد.", err: "حدث خطأ: {e}", dbLimit: "⚠️ نفدت حصة الخادم المجانية لليوم، وتتجدد عند 00:00 UTC." },
  ko: { title: "📋 출석", sub: "이벤트마다 명단 하나: 투표에서 온다고 한 사람, 전투 후 실제로 온 사람. 불참은 누적되고 두 번 연속이면 빨간색.", login: "출석 명단을 보려면 Discord로 로그인하세요.", loginBtn: "Discord로 로그인",
    newBtn: "＋ 새 이벤트", evTitle: "이벤트 (예: 성검 쟁탈)", evDate: "날짜", slot: "시간대", addSlot: "＋ 시간대", slotName: "시간대 이름 (예: 02:00 UTC)",
    confirmed: "① 온다고 한 사람", paste: "투표 명단 붙여넣기 (한 줄에 하나 또는 쉼표로 구분)", shot: "📷 또는 투표자 스크린샷 업로드", match: "명단과 대조", ocrWait: "읽는 중…",
    matched: "{n}명 일치", miss: "못 찾음 (직접 추가): {list}", addMember: "직접 추가…",
    present: "② 전투 후: 누가 왔나", presentNote: "이름을 눌러 전환: ✓ 옴 · ✗ 불참 · 🛌 사전 양해 (불참으로 세지 않음)", allPresent: "전원 참석", noshow: "불참", excused: "양해",
    save: "저장", saved: "저장됨.", del: "이 이벤트 삭제", delAsk: "이 이벤트의 명단을 삭제할까요?", back: "‹ 전체 명단", empty: "아직 명단이 없어요. “＋ 새 이벤트”를 누르세요.",
    summary: "불참 집계", sumNote: "최근 {n}회. 숫자 = 불참 횟수, 빨간색 = 최근 두 번 모두 불참.", name: "멤버", events: "횟수", missN: "불참", noData: "멤버 명단을 불러오지 못해 이름을 대조할 수 없어요.",
    copy: "Discord용 복사", copied: "복사됨", legend: "X = 불참 · 🛌 = 양해 · 빨강 = 연속 불참", nobody: "이 시간대에 아직 아무도 없어요.", err: "문제가 생겼어요: {e}", dbLimit: "⚠️ 서버의 오늘 무료 할당량을 다 썼어요. UTC 00:00에 초기화돼요." },
};
let lang = OFFICER.lang;
const t = (k, v = {}) => String((T[lang] && T[lang][k]) ?? T.en[k] ?? k).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const token = () => { try { return localStorage.getItem(DISCORD_LS); } catch (e) { return null; } };
const core = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/nexus/g, "").replace(/[^\p{L}\p{N}]/gu, "");
let roster = null, events = [], cur = null, lastErr = null, busy = false;
const canEdit = () => OFFICER.can("attend", "edit");
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/attend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: token(), op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw Object.assign(new Error(j.error || "HTTP " + r.status), { code: j.error, detail: j.detail });
  return j;
}
const errText = (e) => (e.code === "db_limit" || /limit|exceed|quota|allow/i.test(String(e.message))) ? t("dbLimit") : t("err", { e: e.message + (e.detail ? " — " + [].concat(e.detail).join("; ").slice(0, 160) : "") });

/* match pasted / OCR'd names against the roster: exact core match, else unique substring */
function matchNames(names) {
  const hit = [], miss = [];
  for (const nm of names) {
    const c = core(nm); if (!c) continue;
    let m = roster.members.filter((x) => core(x.name) === c);
    if (!m.length && c.length >= 3) m = roster.members.filter((x) => core(x.name).includes(c) || c.includes(core(x.name)));
    if (m.length === 1) hit.push({ id: m[0].id, name: m[0].name }); else miss.push(nm + (m.length > 1 ? " (?)" : ""));
  }
  return { hit, miss };
}
const statusOf = (sl, id) => sl.present.includes(id) ? "ok" : sl.excused.includes(id) ? "ex" : "no";
const missesOf = (ev) => { const out = new Map(); for (const sl of ev.slots) for (const m of sl.confirmed) { const st = statusOf(sl, m.id); if (st !== "ex") out.set(m.id, { name: m.name, miss: st === "no" }); } return out; };

/* ---------- views ---------- */
function applyTexts() {
  document.documentElement.lang = HTML_LANG(lang);
  $("at_title").textContent = t("title"); $("at_sub").textContent = t("sub");
  $("at_login").innerHTML = `<p style="margin:0 0 10px">${esc(t("login"))}</p><a class="btn" style="background:#5865F2;border-color:#5865F2;color:#fff;font-weight:700" href="${esc(discordStart())}">${esc(t("loginBtn"))}</a>`;
  $("at_newBtn").textContent = t("newBtn"); $("at_back").textContent = t("back");
  render();
}
function render() {
  const logged = !!(OFFICER.user && token());
  $("at_login").hidden = logged; $("at_app").hidden = !logged;
  if (!logged) return;
  $("at_list").hidden = !!cur; $("at_edit").hidden = !cur; $("at_newBtn").hidden = !!cur || !canEdit();
  if (cur) renderEdit(); else renderList();
}
function renderList() {
  const err = lastErr ? `<div class="msg warn">${esc(errText(lastErr))}</div>` : "";
  if (!events.length) { $("at_list").innerHTML = err + `<div class="muted">${esc(t("empty"))}</div>`; return; }
  const recent = events.slice(0, 8);
  // per member: misses over the recent events, newest first
  const rows = new Map();
  recent.forEach((ev, i) => { for (const [id, v] of missesOf(ev)) { const r = rows.get(id) || { name: v.name, n: 0, miss: 0, seq: [] }; r.n++; if (v.miss) r.miss++; r.seq[i] = v.miss ? "X" : "✓"; r.name = v.name; rows.set(id, r); } });
  const list = [...rows.values()].filter((r) => r.miss > 0).sort((a, b) => b.miss - a.miss || a.name.localeCompare(b.name));
  const red = (r) => r.seq[0] === "X" && r.seq[1] === "X";
  const sum = list.length ? `<div class="card"><h3 style="margin:0 0 4px">${esc(t("summary"))}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(t("sumNote", { n: recent.length }))}</div>
    <table class="at-sum"><thead><tr><th>${esc(t("name"))}</th><th>${esc(t("missN"))}</th><th>${esc(t("events"))}</th><th></th></tr></thead><tbody>${list.map((r) => `<tr class="${red(r) ? "red" : ""}"><td dir="auto">${esc(r.name)}</td><td><b>${r.miss}</b></td><td>${r.n}</td><td class="seq">${recent.map((_, i) => r.seq[i] || "·").join(" ")}</td></tr>`).join("")}</tbody></table></div>` : "";
  $("at_list").innerHTML = err + sum + events.map((ev) => { const m = missesOf(ev), miss = [...m.values()].filter((x) => x.miss).length, tot = m.size;
    return `<button type="button" class="at-ev" data-id="${esc(ev.id)}"><b dir="auto">${esc(ev.title || "—")}</b><span class="muted">${esc(ev.date || "")} · ${ev.slots.length} ${esc(t("slot"))} · ${tot - miss}/${tot} ✓${miss ? ` · <span class="bad">${miss} X</span>` : ""}</span></button>`; }).join("");
  $("at_list").querySelectorAll(".at-ev").forEach((b) => b.onclick = () => { cur = JSON.parse(JSON.stringify(events.find((e) => e.id === b.dataset.id))); render(); });
}
function renderEdit() {
  const ro = !canEdit();
  let h = `<div class="card"><div class="row"><input class="inp" id="at_evTitle" placeholder="${esc(t("evTitle"))}" value="${esc(cur.title || "")}" ${ro ? "disabled" : ""} style="flex:1;min-width:160px"><input class="inp" id="at_evDate" type="date" value="${esc(cur.date || "")}" ${ro ? "disabled" : ""}></div></div>`;
  cur.slots.forEach((sl, i) => {
    const rowsC = sl.confirmed.length ? sl.confirmed.map((m) => `<span class="chip" data-del="${i}:${esc(m.id)}" dir="auto">${esc(m.name)}${ro ? "" : " ×"}</span>`).join("") : `<span class="muted">${esc(t("nobody"))}</span>`;
    const rowsP = sl.confirmed.map((m) => { const st = statusOf(sl, m.id); return `<button type="button" class="at-p ${st}" data-tog="${i}:${esc(m.id)}" ${ro ? "disabled" : ""} dir="auto">${st === "ok" ? "✓" : st === "ex" ? "🛌" : "✗"} ${esc(m.name)}</button>`; }).join("");
    h += `<div class="card at-slot" data-i="${i}"><div class="row" style="align-items:center"><b>${esc(t("slot"))} ${i + 1}</b><input class="inp" data-sn="${i}" placeholder="${esc(t("slotName"))}" value="${esc(sl.name || "")}" ${ro ? "disabled" : ""} style="flex:1">${ro || cur.slots.length < 2 ? "" : `<button type="button" class="btn small" data-rm="${i}">×</button>`}</div>
      <h4>${esc(t("confirmed"))} · ${sl.confirmed.length}</h4><div class="chips">${rowsC}</div>
      ${ro ? "" : `<textarea class="inp" data-paste="${i}" rows="2" placeholder="${esc(t("paste"))}" style="width:100%;margin-top:6px"></textarea>
      <div class="row" style="margin-top:6px;align-items:center"><button type="button" class="btn small" data-match="${i}">${esc(t("match"))}</button><label class="btn small" style="cursor:pointer">${esc(t("shot"))}<input type="file" accept="image/*" multiple data-shot="${i}" hidden></label>
      <select class="inp" data-add="${i}" style="max-width:200px"><option value="">${esc(t("addMember"))}</option>${roster ? roster.members.filter((m) => !sl.confirmed.some((c) => c.id === m.id)).sort((a, b) => a.name.localeCompare(b.name)).map((m) => `<option value="${esc(m.id)}">${esc(m.name)}</option>`).join("") : ""}</select></div>
      <div class="msg" data-msg="${i}"></div>`}
      <h4>${esc(t("present"))}</h4><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("presentNote"))}</div>
      ${ro || !sl.confirmed.length ? "" : `<button type="button" class="btn small" data-all="${i}" style="margin-bottom:6px">${esc(t("allPresent"))}</button>`}<div class="at-plist">${rowsP}</div></div>`;
  });
  h += `<div class="row" style="margin-top:4px;align-items:center">${ro ? "" : `<button type="button" class="btn small" id="at_addSlot">${esc(t("addSlot"))}</button><button type="button" class="btn" id="at_save">${esc(t("save"))}</button>`}<button type="button" class="btn small" id="at_copy">${esc(t("copy"))}</button>${ro || !events.some((e) => e.id === cur.id) ? "" : `<button type="button" class="btn small danger" id="at_del">${esc(t("del"))}</button>`}<span class="msg" id="at_msg"></span></div>
    <div class="muted" style="font-size:12px;margin-top:6px">${esc(t("legend"))}</div>`;
  if (!roster) h = `<div class="msg warn">${esc(t("noData"))}</div>` + h;
  const box = $("at_edit_body"); box.innerHTML = h;
  if (ro) return wireCopy();
  $("at_evTitle").oninput = (e) => { cur.title = e.target.value; };
  $("at_evDate").oninput = (e) => { cur.date = e.target.value; };
  box.querySelectorAll("[data-sn]").forEach((el) => el.oninput = () => { cur.slots[+el.dataset.sn].name = el.value; });
  box.querySelectorAll("[data-rm]").forEach((el) => el.onclick = () => { cur.slots.splice(+el.dataset.rm, 1); renderEdit(); });
  box.querySelectorAll("[data-del]").forEach((el) => el.onclick = () => { const [i, id] = el.dataset.del.split(":"); const sl = cur.slots[+i]; sl.confirmed = sl.confirmed.filter((m) => m.id !== id); sl.present = sl.present.filter((x) => x !== id); sl.excused = sl.excused.filter((x) => x !== id); renderEdit(); });
  box.querySelectorAll("[data-match]").forEach((el) => el.onclick = () => { const i = +el.dataset.match; const names = box.querySelector(`[data-paste="${i}"]`).value.split(/[\n,，]+/).map((s) => s.replace(/^[\s\-•*\d.)]+/, "").trim()).filter(Boolean); addNames(i, names); });
  box.querySelectorAll("[data-shot]").forEach((el) => el.onchange = () => ocr(+el.dataset.shot, [...el.files]));
  box.querySelectorAll("[data-add]").forEach((el) => el.onchange = () => { const m = roster && roster.members.find((x) => x.id === el.value); if (m) addMembers(+el.dataset.add, [{ id: m.id, name: m.name }]); });
  box.querySelectorAll("[data-tog]").forEach((el) => el.onclick = () => { const [i, id] = el.dataset.tog.split(":"); const sl = cur.slots[+i], st = statusOf(sl, id);
    sl.present = sl.present.filter((x) => x !== id); sl.excused = sl.excused.filter((x) => x !== id);
    if (st === "no") sl.present.push(id); else if (st === "ok") sl.excused.push(id);   // no → ok → excused → no
    renderEdit(); });
  box.querySelectorAll("[data-all]").forEach((el) => el.onclick = () => { const sl = cur.slots[+el.dataset.all]; sl.present = sl.confirmed.map((m) => m.id); sl.excused = []; renderEdit(); });
  $("at_addSlot").onclick = () => { cur.slots.push({ name: "", confirmed: [], present: [], excused: [] }); renderEdit(); };
  $("at_save").onclick = save;
  if ($("at_del")) $("at_del").onclick = async () => { if (!confirm(t("delAsk"))) return; try { await api("del", { id: cur.id }); events = events.filter((e) => e.id !== cur.id); cur = null; render(); } catch (e) { $("at_msg").textContent = errText(e); } };
  wireCopy();
}
function wireCopy() { $("at_copy").onclick = () => { const lines = [`${cur.title || ""} ${cur.date || ""} (X = missed, 🛌 = excused)`];
  for (const sl of cur.slots) { if (cur.slots.length > 1) lines.push(`— ${sl.name || t("slot")} —`); for (const m of sl.confirmed) { const st = statusOf(sl, m.id); lines.push(`- ${m.name}${st === "no" ? ": X" : st === "ex" ? ": 🛌" : ""}`); } }
  navigator.clipboard.writeText(lines.join("\n")).then(() => { $("at_msg").textContent = t("copied"); }); }; }
function addMembers(i, list) { const sl = cur.slots[i]; for (const m of list) if (!sl.confirmed.some((c) => c.id === m.id)) sl.confirmed.push(m); renderEdit(); }   // duplicates (overlapping screenshots) are skipped
function addNames(i, names) {
  if (!roster) return;
  const { hit, miss } = matchNames(names);
  addMembers(i, hit);
  const el = $("at_edit_body").querySelector(`[data-msg="${i}"]`);
  if (el) el.innerHTML = esc(t("matched", { n: hit.length })) + (miss.length ? `<br><span class="warn">${esc(t("miss", { list: miss.join(", ") }))}</span>` : "");
}
async function ocr(i, files) {
  if (!files.length || busy) return; busy = true;
  const el = $("at_edit_body").querySelector(`[data-msg="${i}"]`); if (el) el.textContent = t("ocrWait");
  try {
    const images = await Promise.all(files.slice(0, 6).map(shrink));
    const r = await api("ocr", { images });
    addNames(i, r.names);
  } catch (e) { if (el) el.textContent = errText(e); }
  busy = false;
}
/* phone screenshots are big: scale to ≤1400 px JPEG before upload */
function shrink(file) { return new Promise((res, rej) => { const img = new Image(); img.onload = () => { const k = Math.min(1, 1400 / Math.max(img.width, img.height)); const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", 0.85)); }; img.onerror = rej; img.src = URL.createObjectURL(file); }); }
async function save() {
  const msg = $("at_msg"); msg.textContent = "…";
  try { await api("save", { ev: cur }); const i = events.findIndex((e) => e.id === cur.id); const copy = JSON.parse(JSON.stringify(cur)); if (i < 0) events.unshift(copy); else events[i] = copy; msg.textContent = t("saved"); }
  catch (e) { msg.textContent = errText(e); }
}
async function load() {
  lastErr = null;
  try { const r = await api("list"); events = r.events.map((e) => ({ ...e, slots: (e.slots || []).map((s) => ({ name: s.name || "", confirmed: s.confirmed || [], present: s.present || [], excused: s.excused || [] })) })); }
  catch (e) { lastErr = e; }
  render();
}
function init() {
  $("at_newBtn").onclick = () => { cur = { id: rid(), title: "", date: new Date().toISOString().slice(0, 10), slots: [{ name: "", confirmed: [], present: [], excused: [] }] }; render(); };
  $("at_back").onclick = () => { cur = null; render(); };
  OfficerData.fetchJsonFast(ROSTER_URL, (d) => { roster = d; if (cur) renderEdit(); }).then((d) => { if (d) roster = d; if (cur) renderEdit(); }).catch(() => {});
  applyTexts();
}
function onShow() { if (OFFICER.user && token()) load(); else render(); }
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.attend = { init, onShow, applyTexts, setLang };
})();
