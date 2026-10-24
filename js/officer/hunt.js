/* NXS officer page — 🎯 All Out watch list (registers OFFICER_PAGES.hunt; own tab, nobody by default, admins always).
   Officers keep a list of player IDs (data/blacklist-x7k2p9.json, encrypted: { list: [{ id, note }], by, at }).
   A GitHub job (.github/workflows/blacklist-track.yml → scripts/blacklist-track.js) reads each player's map location and shield
   from MightPulse every 15 minutes while All Out runs (Events tab schedule) and right after the list is saved, into
   data/blacklist-live-x7k2p9.json (encrypted). Every time on this page is written "MM-DD HH:MM UTC (MM-DD HH:MM local)". */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const LIST = "data/blacklist-x7k2p9.json", LIVE = "data/blacklist-live-x7k2p9.json";
const T = {
  en: { title: "🎯 All Out watch list", intro: "Officers only. Add players by their ID (the number on their profile). While All Out runs, everyone on the list is looked up every 15 minutes (MightPulse refreshes about every 15 minutes): where their castle is and whether their shield is up.",
    win: "All Out {s} – {e}", on: "tracking every 15 minutes now", off: "not running — the list is looked up only when it is saved", next: "next All Out {s} – {e}",
    fetched: "Data fetched {t}", never: "Not fetched yet — save the list and the first look-up arrives in about 2 minutes.", reload: "↻ Reload",
    cNo: "#", cName: "Player", cAll: "Alliance", cKid: "Kingdom", cPos: "Castle X:Y", cShield: "Shield", cOn: "Online", cAsOf: "Data from",
    shieldUntil: "🛡️ until {t}", noShield: "— none", online: "🟢 online", lastLogin: "last login {t}", unknown: "?", notFound: "not found (check the ID)",
    copy: "📋", copied: "✅", addT: "➕ Add a player", id: "Player ID", note: "Note (name, why…)", add: "Add", del: "✕", dup: "Already on the list.", badId: "Type the player ID (numbers only).",
    save: "💾 Save list", by: "Your name", saving: "Saving…", saved: "Saved ✅ The look-up runs in about 2 minutes.", unsaved: "Not saved yet.",
    errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — refresh and try again.", errNet: "Couldn't reach GitHub — try again.",
    noKey: "Saving needs the officers' GitHub key (set up on the Post tab).", locked: "Unlock the officer data to see the watch list.", empty: "The list is empty.", local: "local", count: "{n} players" },
  zh: { title: "🎯 全軍出擊黑名單", intro: "只有幹部看得到。用玩家 ID（個人資料上的那串數字）加人。全軍出擊期間每 15 分鐘查一次名單上每個人的城在哪裡、有沒有開護盾（MightPulse 大約 15 分鐘更新一次）。",
    win: "全軍出擊 {s} – {e}", on: "現在每 15 分鐘更新", off: "現在沒有活動——只有儲存名單時會查一次", next: "下次全軍出擊 {s} – {e}",
    fetched: "資料抓取時間 {t}", never: "還沒抓過——儲存名單後大約 2 分鐘會有第一次結果。", reload: "↻ 重新整理",
    cNo: "#", cName: "玩家", cAll: "聯盟", cKid: "王國", cPos: "城堡 X:Y", cShield: "護盾", cOn: "上線", cAsOf: "資料時間",
    shieldUntil: "🛡️ 到 {t}", noShield: "— 沒有", online: "🟢 在線上", lastLogin: "最後上線 {t}", unknown: "?", notFound: "找不到（確認一下 ID）",
    copy: "📋", copied: "✅", addT: "➕ 加入玩家", id: "玩家 ID", note: "備註（名字、原因…）", add: "加入", del: "✕", dup: "已經在名單上了。", badId: "請輸入玩家 ID（只要數字）。",
    save: "💾 儲存名單", by: "你的名字", saving: "儲存中…", saved: "已儲存 ✅ 大約 2 分鐘後會查一次。", unsaved: "還沒儲存。",
    errAuth: "存著的 GitHub 金鑰不能用了——請找 Sherry。", errBusy: "有人同時儲存——重新整理後再試一次。", errNet: "連不到 GitHub——請再試一次。",
    noKey: "儲存需要幹部的 GitHub 金鑰（在公告分頁設定）。", locked: "要先解鎖幹部資料才看得到黑名單。", empty: "名單是空的。", local: "當地", count: "{n} 人" },
  pt: { title: "🎯 Lista de alvos do All Out", intro: "Só oficiais. Adicione jogadores pelo ID (o número no perfil). Durante o All Out, todos da lista são consultados a cada 15 minutos (a MightPulse atualiza mais ou menos a cada 15 minutos): onde está o castelo e se o escudo está ativo.",
    win: "All Out {s} – {e}", on: "atualizando a cada 15 minutos", off: "fora do evento — a lista só é consultada quando é salva", next: "próximo All Out {s} – {e}",
    fetched: "Dados buscados {t}", never: "Ainda não buscado — salve a lista e a primeira consulta chega em uns 2 minutos.", reload: "↻ Recarregar",
    cNo: "#", cName: "Jogador", cAll: "Aliança", cKid: "Reino", cPos: "Castelo X:Y", cShield: "Escudo", cOn: "Online", cAsOf: "Dados de",
    shieldUntil: "🛡️ até {t}", noShield: "— nenhum", online: "🟢 online", lastLogin: "último login {t}", unknown: "?", notFound: "não encontrado (confira o ID)",
    copy: "📋", copied: "✅", addT: "➕ Adicionar jogador", id: "ID do jogador", note: "Nota (nome, motivo…)", add: "Adicionar", del: "✕", dup: "Já está na lista.", badId: "Digite o ID do jogador (só números).",
    save: "💾 Salvar lista", by: "Seu nome", saving: "Salvando…", saved: "Salvo ✅ A consulta roda em uns 2 minutos.", unsaved: "Ainda não salvo.",
    errAuth: "A chave do GitHub salva não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — recarregue e tente de novo.", errNet: "Não deu para acessar o GitHub — tente de novo.",
    noKey: "Salvar precisa da chave do GitHub dos oficiais (configurada na aba Anúncios).", locked: "Desbloqueie os dados dos oficiais para ver a lista.", empty: "A lista está vazia.", local: "local", count: "{n} jogadores" },
  ar: { title: "🎯 قائمة المراقبة في All Out", intro: "للضباط فقط. أضف اللاعبين بالمعرّف (الرقم في ملفهم الشخصي). أثناء All Out يُبحث عن كل من في القائمة كل 15 دقيقة (تتحدث MightPulse كل 15 دقيقة تقريبًا): مكان القلعة وهل الدرع مفعّل.",
    win: "All Out {s} – {e}", on: "التحديث كل 15 دقيقة الآن", off: "الحدث غير جارٍ — يُبحث في القائمة فقط عند حفظها", next: "All Out القادم {s} – {e}",
    fetched: "وقت جلب البيانات {t}", never: "لم تُجلب بعد — احفظ القائمة وستصل أول نتيجة بعد نحو دقيقتين.", reload: "↻ تحديث",
    cNo: "#", cName: "اللاعب", cAll: "التحالف", cKid: "المملكة", cPos: "القلعة X:Y", cShield: "الدرع", cOn: "متصل", cAsOf: "وقت البيانات",
    shieldUntil: "🛡️ حتى {t}", noShield: "— لا يوجد", online: "🟢 متصل", lastLogin: "آخر دخول {t}", unknown: "?", notFound: "غير موجود (تحقق من المعرّف)",
    copy: "📋", copied: "✅", addT: "➕ إضافة لاعب", id: "معرّف اللاعب", note: "ملاحظة (الاسم، السبب…)", add: "إضافة", del: "✕", dup: "موجود في القائمة بالفعل.", badId: "اكتب معرّف اللاعب (أرقام فقط).",
    save: "💾 حفظ القائمة", by: "اسمك", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅ يجري البحث بعد نحو دقيقتين.", unsaved: "لم يُحفظ بعد.",
    errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حدّث الصفحة وحاول مجددًا.", errNet: "تعذّر الوصول إلى GitHub — حاول مجددًا.",
    noKey: "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في صفحة النشر).", locked: "افتح بيانات الضباط لرؤية القائمة.", empty: "القائمة فارغة.", local: "محلي", count: "{n} لاعبين" },
  ko: { title: "🎯 전군 출격 감시 명단", intro: "간부 전용. 플레이어 ID(프로필에 있는 숫자)로 추가하세요. 전군 출격 동안 명단의 모두를 15분마다 조회해요 (MightPulse는 약 15분마다 갱신): 성 위치와 보호막 여부.",
    win: "전군 출격 {s} – {e}", on: "지금 15분마다 갱신 중", off: "이벤트 기간 아님 — 명단을 저장할 때만 조회해요", next: "다음 전군 출격 {s} – {e}",
    fetched: "데이터 가져온 시각 {t}", never: "아직 조회 전 — 명단을 저장하면 약 2분 뒤 첫 결과가 나와요.", reload: "↻ 새로고침",
    cNo: "#", cName: "플레이어", cAll: "연맹", cKid: "왕국", cPos: "성 X:Y", cShield: "보호막", cOn: "접속", cAsOf: "데이터 시각",
    shieldUntil: "🛡️ {t}까지", noShield: "— 없음", online: "🟢 접속 중", lastLogin: "마지막 접속 {t}", unknown: "?", notFound: "찾을 수 없음 (ID 확인)",
    copy: "📋", copied: "✅", addT: "➕ 플레이어 추가", id: "플레이어 ID", note: "메모 (이름, 이유…)", add: "추가", del: "✕", dup: "이미 명단에 있어요.", badId: "플레이어 ID를 입력하세요 (숫자만).",
    save: "💾 명단 저장", by: "이름", saving: "저장 중…", saved: "저장됨 ✅ 약 2분 뒤 조회해요.", unsaved: "아직 저장 안 됨.",
    errAuth: "저장된 GitHub 키가 더 이상 작동하지 않아요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 새로고침 후 다시 시도하세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 시도하세요.",
    noKey: "저장하려면 간부 GitHub 키가 필요해요 (공지 탭에서 설정).", locked: "간부 데이터를 잠금 해제해야 명단이 보여요.", empty: "명단이 비어 있어요.", local: "현지", count: "{n}명" },
};
let lang = OFFICER.lang || "en", L = { list: [] }, SAVED = "[]", LV = null, msg = "", sched = null, timer = null;
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const ED = () => OFFICER.can("hunt", "edit");
const pad = (n) => String(n).padStart(2, "0");
/* "10-24 03:15 UTC (10-24 11:15 local)" — never "x minutes ago" */
function when(v) {
  if (v == null || v === "") return "";
  let ms = typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v); if (!Number.isFinite(ms)) return "";
  const d = new Date(ms), u = `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
  const l = `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return `${u} (${l} ${t("local")})`;
}
const toMs = (v) => v == null ? null : typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v);
function windowNow() {
  const s = (sched && sched["all-out"]) || { anchor: "2026-09-25", periodDays: 28, activeDays: 2 };
  const a = Date.parse(s.anchor + "T00:00:00Z"), P = s.periodDays * 864e5, now = Date.now();
  let start = a + Math.floor((now - a) / P) * P, end = start + s.activeDays * 864e5;
  const on = now >= start - 36e5 && now < end + 36e5;
  if (!on && now >= end) { start += P; end += P; }
  return { start, end, on };
}
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
async function read(path) {
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", path, null, OFFICER.token); if (f) return { d: await OfficerData.open(JSON.parse(b64u8(f.content))), sha: f.sha }; } catch (e) {} }
  try { return { d: await OfficerData.fetchJson(path) }; } catch (e) { return { d: null }; }
}
async function loadLive() { const r = await read(LIVE); LV = r.d; render(); }
function table() {
  const rows = (LV && LV.rows) || [], byId = {}; rows.forEach((r) => byId[r.id] = r);
  const list = L.list || []; if (!list.length) return `<div class="muted">${esc(t("empty"))}</div>`;
  const ed = ED(), now = Date.now();
  return `<div class="mm-tw"><table class="mm-t hn-t"><thead><tr><th>${esc(t("cNo"))}</th><th>${esc(t("cName"))}</th><th>${esc(t("cAll"))}</th><th>${esc(t("cKid"))}</th><th>${esc(t("cPos"))}</th><th>${esc(t("cShield"))}</th><th>${esc(t("cOn"))}</th><th>${esc(t("cAsOf"))}</th>${ed ? "<th></th>" : ""}</tr></thead><tbody>`
    + list.map((it, i) => { const r = byId[String(it.id)];
      const pos = r && r.x != null && r.y != null ? `<button type="button" class="btn small hn-cp" data-c="X:${r.x} Y:${r.y}">X:${r.x} Y:${r.y} ${esc(t("copy"))}</button>` : r && !r.ok ? `<span class="muted">${esc(t("notFound"))}</span>` : esc(t("unknown"));
      const sh = r ? toMs(r.shield) : null, shield = !r ? "" : sh && sh > now ? `<span class="hn-sh">${esc(t("shieldUntil").replace("{t}", when(sh)))}</span>` : esc(t("noShield"));
      const on = !r ? "" : r.online ? esc(t("online")) : r.lastLogin ? esc(t("lastLogin").replace("{t}", when(r.lastLogin))) : "";
      return `<tr><td>${i + 1}</td><td><b dir="auto">${esc((r && r.name) || it.note || it.id)}</b>${it.note && r && r.name ? `<div class="muted" style="font-size:12px" dir="auto">${esc(it.note)}</div>` : ""}<div class="muted" style="font-size:11.5px">ID ${esc(it.id)}</div></td>`
        + `<td>${esc((r && r.alliance) || "")}</td><td>${r && r.kid ? "#" + esc(r.kid) : ""}</td><td>${pos}</td><td>${shield}</td><td style="font-size:12.5px">${on}</td><td style="font-size:12px">${r ? esc(when(r.asOf)) : ""}</td>`
        + (ed ? `<td><button type="button" class="btn small" data-del="${i}" title="${esc(t("del"))}">${esc(t("del"))}</button></td>` : "") + `</tr>`; }).join("")
    + `</tbody></table></div>`;
}
function render() {
  const el = $("hn_root"); if (!el) return;
  const w = windowNow(), ed = ED(), dirty = JSON.stringify(L.list || []) !== SAVED;
  let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
  el.innerHTML = `<div class="hn-st ${w.on ? "on" : ""}">${w.on ? `🟢 ${esc(t("win").replace("{s}", when(w.start)).replace("{e}", when(w.end)))} · ${esc(t("on"))}` : `⚪ ${esc(t("off"))} · ${esc(t("next").replace("{s}", when(w.start)).replace("{e}", when(w.end)))}`}</div>
    <div class="row" style="gap:8px;align-items:center;margin:8px 0"><b>${esc(LV && LV.fetched ? t("fetched").replace("{t}", when(LV.fetched)) : t("never"))}</b> <span class="muted" style="font-size:12.5px">${esc(t("count").replace("{n}", (L.list || []).length))}</span>
      <button type="button" class="btn small" id="hn_reload">${esc(t("reload"))}</button></div>
    ${table()}
    ${ed ? `<div style="margin-top:12px"><b>${esc(t("addT"))}</b><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center">
      <input class="inp" id="hn_id" inputmode="numeric" placeholder="${esc(t("id"))}" style="width:150px"><input class="inp" id="hn_note" placeholder="${esc(t("note"))}" style="width:220px">
      <button type="button" class="btn small primary" id="hn_add">${esc(t("add"))}</button></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center">${dirty ? `<input class="inp" id="hn_by" value="${esc(by)}" placeholder="${esc(t("by"))}" style="width:130px"><button type="button" class="btn primary" id="hn_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(msg)}</span></div></div>` : ""}`;
  $("hn_reload").onclick = () => { msg = ""; loadLive(); };
  el.querySelectorAll(".hn-cp").forEach((b) => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = t("copied"); } catch (e) {} });
  if (!ed) return;
  el.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { L.list.splice(+b.dataset.del, 1); msg = t("unsaved"); render(); });
  $("hn_add").onclick = () => { const id = $("hn_id").value.replace(/\D/g, ""), note = $("hn_note").value.trim().slice(0, 60);
    if (!id) { msg = t("badId"); return render(); }
    if ((L.list || []).some((x) => String(x.id) === id)) { msg = t("dup"); return render(); }
    (L.list = L.list || []).push({ id, note }); msg = t("unsaved"); render(); };
  if ($("hn_save")) $("hn_save").onclick = save;
}
async function save() {
  if (!ED()) return;
  if (!OFFICER.token) { msg = t("noKey"); render(); return; }
  const by = ($("hn_by").value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  msg = t("saving"); render();
  const next = { list: L.list || [], by, at: new Date().toISOString() };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", LIST, null, OFFICER.token);
      try { await OFFICER.gh("PUT", LIST, { message: `All Out watch list (${by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: "main" }, OFFICER.token); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    L = next; SAVED = JSON.stringify(L.list); msg = t("saved");
  } catch (e) { msg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  render();
}
function applyTexts() { if ($("hn_title")) { $("hn_title").textContent = t("title"); $("hn_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  const el = $("hn_root"); if (!el) return;
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<div class="muted">${esc(t("locked"))}</div>`; return; }
  try { sched = (await fetch("data/events-x7k2p9.json?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json())).sched || null; } catch (e) {}
  const r = await read(LIST); L = r.d && Array.isArray(r.d.list) ? r.d : { list: [] }; SAVED = JSON.stringify(L.list);
  await loadLive();
  clearInterval(timer); timer = setInterval(() => { if (!document.hidden && location.hash.startsWith("#hunt") && JSON.stringify(L.list || []) === SAVED) loadLive(); }, 60000);   // the job writes every 15 min; look every minute
}
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.hunt = { init, applyTexts, setLang, onShow: () => render() };
})();
