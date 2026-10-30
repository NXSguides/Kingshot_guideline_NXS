/* NXS officer page — scout tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.scout) */
(function () {
const ROOT = document.getElementById('pg-scout');
const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const esc = OFFICER.util.esc;
const { owner: OWNER, name: REPO } = OFFICER.repo;
const BRANCH = OFFICER.repo.branch, CONFIG = "data/scout-config.json", DATA = "data/scout-x7k2p9.json", OUR_KID = 2189;
const { b64ToUtf8, utf8ToB64 } = OFFICER.util;
const big = (n) => n == null ? "" : Math.abs(n) >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + "M" : Math.abs(n) >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);
let lang = OFFICER.lang, TOKEN = null, cfg = { kingdoms: [] }, cfgSha = null, data = null, waiting = null;
const LS = "nxs-scout-v1";
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} };
store.hide = store.hide || {};                         // kingdoms taken out of the ranking (this browser only)
let sortKey = store.sortKey || "migrant", sortDir = store.sortDir || -1;

const T = { ko: {"colSp": "부대 전투력 (추정)", "colMigrant": "이주 점수", "onlyPower": "전투력 상위 20만", "onlyMigrant": "이주 점수 상위 20만", "title": "NXS 정찰", "addTitle": "왕국 정찰", "fetch": "지금 가져오기", "auto": "매일 업데이트", "include": "랭킹에 포함", "remove": "삭제", "colKingdom": "왕국", "ranking": "랭킹", "rankingNote": "왕국에서 “랭킹에 포함”을 체크하면 그 왕국의 플레이어가 여기에 표시됩니다. 정렬 기준 열은 이름 바로 옆에 표시돼요.", "sortBy": "정렬 기준", "desc": "높음 → 낮음", "asc": "낮음 → 높음", "addNote": "왕국 번호를 입력하고 지금 가져오기를 누르세요. GitHub 작업이 MightPulse에서 그 왕국의 이주 점수 상위 20명과 전투력 상위 20명(겹치는 사람은 한 번만)의 정보(전투력, 도시 센터, 신비한 시련, 처치, VIP, 이주 점수)를 읽어 옵니다. 이주 점수는 부대 전투력에 가까워 실제 전력을 더 정확히 보여 주고, 전투력은 활동량도 어느 정도 보여 줍니다. 약 2–3분 걸리며 이 페이지는 자동으로 새로고침됩니다. KvK 상대 왕국은 “매일 업데이트”를 체크하면 멤버 명단과 함께 매일 갱신됩니다.", "needKid": "왕국 번호를 입력하세요.", "noKey": "저장하려면 GitHub 키가 필요합니다. 먼저 공지 탭에서 설정하세요.", "saving": "요청 보내는 중…", "requested": "요청 완료 — 가져오는 데 약 2–3분 걸립니다. 완료되면 여기에 표가 나타나요.", "stillWaiting": "아직 가져오는 중… (5분 넘게 걸리면 GitHub → Actions → Scout Kingdom을 확인하세요)", "done": "업데이트 완료 ✅", "errAuth": "GitHub가 키를 거부했습니다.", "errBusy": "GitHub가 바쁩니다 — 다시 시도하세요.", "errNet": "네트워크 문제 — 다시 시도하세요.", "updated": "데이터: {t}", "noData": "아직 정찰한 왕국이 없습니다. 위에서 추가하세요.", "ours": "우리 왕국", "players": "상위 {n}명 플레이어", "alliances": "최강 연맹", "colRank": "#", "colName": "이름", "colAlliance": "연맹", "colPower": "전투력", "colTc": "도시 센터", "colMystic": "신비한 시련", "colKills": "처치", "colVip": "VIP", "openRec": "MightPulse", "asOf": "{t} 기준", "source": "출처: {s}"},
 ar: {"colSp": "قوة الفرقة (تقديري)", "colMigrant": "نقاط الهجرة", "onlyPower": "ضمن أفضل 20 بالقوة فقط", "onlyMigrant": "ضمن أفضل 20 بنقاط الهجرة فقط", "title": "استطلاع NXS", "addTitle": "استطلاع مملكة", "fetch": "جلب الآن", "auto": "تحديث يومي", "include": "في التصنيف", "remove": "إزالة", "colKingdom": "المملكة", "ranking": "التصنيف", "rankingNote": "ضع علامة على «في التصنيف» لمملكة ما لعرض لاعبيها هنا. يظهر العمود الذي ترتّب حسبه بجوار الاسم مباشرة.", "sortBy": "ترتيب حسب", "desc": "الأعلى → الأدنى", "asc": "الأدنى → الأعلى", "addNote": "اكتب رقم المملكة واضغط «جلب الآن»: تقرأ مهمة على GitHub من MightPulse أفضل 20 لاعبًا في تلك المملكة بنقاط الهجرة وأفضل 20 بالقوة (من يظهر في القائمتين يُحسب مرة واحدة): القوة، مركز البلدة، الاختبارات الغامضة، القتلى، VIP، نقاط الهجرة. نقاط الهجرة قريبة من قوة الفرقة فتُظهر القوة القتالية الحقيقية بدقة أكبر، والقوة تدل أيضًا على النشاط إلى حدّ ما. يستغرق ذلك 2–3 دقائق تقريبًا؛ وتتحدث هذه الصفحة تلقائيًا. ضع علامة على «تحديث يومي» لخصم KvK ليتم تحديثه كل يوم مع قائمة الأعضاء.", "needKid": "أدخل رقم المملكة.", "noKey": "الحفظ يحتاج إلى مفتاح GitHub — قم بإعداده في تبويب النشر أولًا.", "saving": "جارٍ إرسال الطلب…", "requested": "تم الطلب — يستغرق الجلب 2–3 دقائق تقريبًا. سيظهر الجدول هنا عند الانتهاء.", "stillWaiting": "لا يزال الجلب جاريًا… (تحقق من GitHub → Actions → Scout Kingdom إذا استغرق أكثر من 5 دقائق)", "done": "تم التحديث ✅", "errAuth": "رفض GitHub المفتاح.", "errBusy": "كان GitHub مشغولًا — حاول مرة أخرى.", "errNet": "مشكلة في الشبكة — حاول مرة أخرى.", "updated": "البيانات: {t}", "noData": "لم يتم استطلاع أي مملكة بعد. أضف واحدة أعلاه.", "ours": "مملكتنا", "players": "أفضل {n} لاعبين", "alliances": "أقوى التحالفات", "colRank": "#", "colName": "الاسم", "colAlliance": "التحالف", "colPower": "القوة", "colTc": "مركز البلدة", "colMystic": "الاختبارات الغامضة", "colKills": "القتلى", "colVip": "VIP", "openRec": "MightPulse", "asOf": "بتاريخ {t}", "source": "القائمة من {s}"},
 pt: {"colSp": "Poder do esquadrão (est.)", "colMigrant": "Pontuação de migração", "onlyPower": "só no top 20 de poder", "onlyMigrant": "só no top 20 de migração", "title": "Reconhecimento NXS", "addTitle": "Reconhecer um reino", "fetch": "Buscar agora", "auto": "atualizar todo dia", "include": "no ranking", "remove": "Remover", "colKingdom": "Reino", "ranking": "Ranking", "rankingNote": "Marque “no ranking” num reino para listar os jogadores dele aqui. A coluna usada para ordenar aparece logo ao lado do nome.", "sortBy": "Ordenar por", "desc": "maior → menor", "asc": "menor → maior", "addNote": "Digite o número de um reino e toque em Buscar: uma tarefa do GitHub lê no MightPulse os 20 melhores desse reino por Pontuação de Migração e os 20 melhores por poder (quem está nas duas listas conta uma vez): poder, Centro da Cidade, Prova Mística, abates, VIP, Pontuação de Migração. A Pontuação de Migração acompanha o Poder do Esquadrão, então mostra a força real com mais precisão; o poder também indica um pouco a atividade. Leva cerca de 2–3 minutos; esta página se atualiza sozinha. Marque “atualizar todo dia” para o adversário do KvK, assim ele se atualiza todo dia junto com a lista.", "needKid": "Digite o número de um reino.", "noKey": "Para salvar é preciso a chave do GitHub — configure na aba Post primeiro.", "saving": "Enviando o pedido…", "requested": "Pedido feito — a busca leva cerca de 2–3 minutos. A tabela aparece aqui quando terminar.", "stillWaiting": "Ainda buscando… (veja GitHub → Actions → Scout Kingdom se passar de 5 minutos)", "done": "Atualizado ✅", "errAuth": "O GitHub recusou a chave.", "errBusy": "O GitHub estava ocupado — tente de novo.", "errNet": "Problema de rede — tente de novo.", "updated": "Dados: {t}", "noData": "Nenhum reino reconhecido ainda. Adicione um acima.", "ours": "nosso reino", "players": "Top {n} jogadores", "alliances": "Alianças mais fortes", "colRank": "#", "colName": "Nome", "colAlliance": "Aliança", "colPower": "Poder", "colTc": "CC", "colMystic": "Prova Mística", "colKills": "Abates", "colVip": "VIP", "openRec": "MightPulse", "asOf": "em {t}", "source": "lista de {s}"},

  en: { title: "NXS Scout", addTitle: "Scout a kingdom", fetch: "Fetch now", auto: "update daily", include: "in ranking", remove: "Remove", colKingdom: "Kingdom", ranking: "Ranking", rankingNote: "Tick “in ranking” on a kingdom to list its players here. The column you sort by is shown right next to the name.", sortBy: "Sort by", desc: "high → low", asc: "low → high",
    addNote: "Type a kingdom number and press Fetch: a GitHub job reads that kingdom's top 20 by Migrant Score and top 20 by power from MightPulse (anyone on both lists counts once): power, Town Center, Mystic Trial, kills, VIP, Migrant Score. Migrant Score tracks Squad Power, so it shows real strength more accurately; power also hints at how active someone is. It takes about 2–3 minutes; this page refreshes by itself. Tick “update daily” for the KvK opponent so it refreshes every day with the roster.",
    needKid: "Enter a kingdom number.", noKey: "Saving needs the GitHub key — set it up on the Post tab first.", saving: "Sending the request…",
    requested: "Requested — fetching takes about 2–3 minutes. The table appears here when it's done.", stillWaiting: "Still fetching… (check GitHub → Actions → Scout Kingdom if it takes more than 5 minutes)",
    done: "Updated ✅", errAuth: "GitHub rejected the key.", errBusy: "GitHub was busy — try again.", errNet: "Network problem — try again.",
    updated: "Data: {t}", noData: "No kingdom scouted yet. Add one above.", ours: "our kingdom", players: "Top {n} players", alliances: "Strongest alliances",
    colRank: "#", colName: "Name", colAlliance: "Alliance", colPower: "Power", colTc: "TC", colMystic: "Mystic Trial", colKills: "Kills", colVip: "VIP", colSp: "Squad Power (est.)", colMigrant: "Migrant Score", openRec: "MightPulse",
    asOf: "as of {t}", source: "list from {s}", onlyPower: "power top 20 only", onlyMigrant: "Migrant top 20 only" },
  zh: { title: "NXS 偵察", addTitle: "偵察一個王國", fetch: "立即抓取", auto: "每天更新", include: "列入排序", remove: "移除", colKingdom: "王國", ranking: "排序", rankingNote: "勾選王國的「列入排序」就會把它的玩家列進這張表。目前用來排序的欄位會顯示在名字旁邊。", sortBy: "排序依據", desc: "高 → 低", asc: "低 → 高",
    addNote: "輸入王國編號後按「立即抓取」：GitHub 會從 MightPulse 讀那個王國遷城分數前 20 名和戰力前 20 名的玩家（兩邊都有的只算一次）：戰力、城鎮中心、秘境試煉、擊殺、VIP、遷城分數。遷城分數接近部隊戰力，比較能看出真正的戰力；總戰力也多少代表活躍度。大約 2–3 分鐘，這頁會自己更新。KvK 對手可以勾「每天更新」，就會跟成員資料一起每天刷新。",
    needKid: "請輸入王國編號。", noKey: "儲存需要 GitHub 金鑰，請先到「發布公告」設定。", saving: "送出請求中…",
    requested: "已送出，抓取約需 2–3 分鐘，完成後表格會出現在這裡。", stillWaiting: "還在抓取…（超過 5 分鐘的話，到 GitHub → Actions → Scout Kingdom 看看）",
    done: "已更新 ✅", errAuth: "GitHub 不接受這把金鑰。", errBusy: "GitHub 忙碌中，請再試一次。", errNet: "網路有問題，請再試一次。",
    updated: "資料：{t}", noData: "還沒有偵察過任何王國，請在上面新增。", ours: "我們的王國", players: "前 {n} 名玩家", alliances: "最強聯盟",
    colRank: "#", colName: "名字", colAlliance: "聯盟", colPower: "戰力", colTc: "主城", colMystic: "秘境試煉", colKills: "擊殺", colVip: "VIP", colSp: "部隊戰力（估）", colMigrant: "遷城分數", openRec: "MightPulse",
    asOf: "資料時間 {t}", source: "名單來源：{s}", onlyPower: "只在戰力前 20", onlyMigrant: "只在遷城分數前 20" },
};
/* 📦 history card texts */
const HT = {"en": {"hT": "📦 MightPulse history (for the battle analysis)", "hNote": "One encrypted snapshot a day (20:45 UTC): kingdom totals, all 18 boards (top 100), every NXS member and the Scout kingdoms' top players (base, ranks, heroes with gear). Pick dates and download — the file is for the analysis chat; don't post it anywhere public.", "hFrom": "From", "hTo": "To", "hDl": "⬇️ Download JSON", "hBusy": "Reading {d}…", "hNone": "No snapshots in these dates.", "hDone": "{n} days downloaded."}, "zh": {"hT": "📦 MightPulse 歷史資料（戰鬥分析用）", "hNote": "每天存一份加密快照（20:45 UTC）：王國總數、全部 18 個排行榜（前 100 名）、所有 NXS 成員，以及偵查王國的主力（基本資料、排名、英雄和裝備）。選日期下載——這個檔案是給分析用的聊天，不要貼到公開的地方。", "hFrom": "從", "hTo": "到", "hDl": "⬇️ 下載 JSON", "hBusy": "讀取 {d}…", "hNone": "這段日期沒有資料。", "hDone": "已下載 {n} 天。"}, "pt": {"hT": "📦 Histórico do MightPulse (para a análise de batalha)", "hNote": "Um retrato criptografado por dia (20:45 UTC): totais do reino, os 18 rankings (top 100), todos os membros da NXS e os principais jogadores dos reinos do Scout (base, rankings, heróis com equipamento). Escolha as datas e baixe — o arquivo é para o chat de análise; não publique em lugar público.", "hFrom": "De", "hTo": "Até", "hDl": "⬇️ Baixar JSON", "hBusy": "Lendo {d}…", "hNone": "Sem dados nessas datas.", "hDone": "{n} dias baixados."}, "ar": {"hT": "📦 سجل MightPulse (لتحليل المعارك)", "hNote": "لقطة مشفّرة كل يوم (20:45 UTC): إجماليات المملكة، كل اللوحات الـ18 (أفضل 100)، كل أعضاء NXS وأقوى لاعبي ممالك الاستطلاع (الأساس، الترتيب، الأبطال مع العتاد). اختر التواريخ ونزّل — الملف لمحادثة التحليل؛ لا تنشره في مكان عام.", "hFrom": "من", "hTo": "إلى", "hDl": "⬇️ تنزيل JSON", "hBusy": "قراءة {d}…", "hNone": "لا بيانات في هذه التواريخ.", "hDone": "نُزّلت {n} أيام."}, "ko": {"hT": "📦 MightPulse 기록 (전투 분석용)", "hNote": "매일 암호화된 스냅샷 하나 (20:45 UTC): 왕국 합계, 랭킹 18개 전부 (상위 100), NXS 연맹원 전원, 정찰 왕국의 주력 (기본, 랭킹, 영웅과 장비). 날짜를 골라 내려받으세요 — 분석 채팅용 파일이니 공개된 곳에 올리지 마세요.", "hFrom": "부터", "hTo": "까지", "hDl": "⬇️ JSON 내려받기", "hBusy": "{d} 읽는 중…", "hNone": "이 기간에는 데이터가 없어요.", "hDone": "{n}일치 내려받음."}};
const tr = (k, v) => { let s = (T[lang] || T.en)[k] ?? T.en[k] ?? k; for (const x in v || {}) s = s.replace("{" + x + "}", v[x]); return s; };
const fmtT = (iso) => iso ? new Date(iso).toLocaleString(LOCALE(lang), { dateStyle: "short", timeStyle: "short" }) : "";

const gh = (method, path, body, token = TOKEN) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
async function loadConfig() {
  try {
    if (TOKEN) { const f = await gh("GET", CONFIG); if (f) { cfgSha = f.sha; cfg = JSON.parse(b64ToUtf8(f.content)); } }
    else { const r = await fetch(CONFIG + "?t=" + Date.now(), { cache: "no-store" }); if (r.ok) cfg = await r.json(); }
  } catch (e) {}
  cfg.kingdoms = (cfg.kingdoms || []).filter((k) => k && k.kid);
}
async function saveConfig(message) {
  const m = $("sc_msg");
  if (!TOKEN) { m.className = "msg warn"; m.textContent = tr("noKey"); return false; }
  m.className = "msg"; m.textContent = tr("saving");
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await gh("PUT", CONFIG, { message, content: utf8ToB64(JSON.stringify(cfg, null, 1) + "\n"), sha: cfgSha || undefined, branch: BRANCH });
        cfgSha = r && r.content ? r.content.sha : cfgSha; return true;
      } catch (e) { if (e.message !== "busy" || attempt) throw e; const f = await gh("GET", CONFIG); cfgSha = f ? f.sha : null; }
    }
  } catch (e) { m.className = "msg warn"; m.textContent = tr(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  return false;
}
async function loadData() {
  try { data = await OfficerData.fetchJsonFast(DATA, (d) => { data = d; render(); }); } catch (e) { data = null; }
}
function applyTexts() {
  ROOT.querySelectorAll("[data-t]").forEach((el) => { el.textContent = tr(el.dataset.t); });
  $("sc_meta").textContent = data && data.updated ? tr("updated", { t: fmtT(data.updated) }) : "";
}
function renderList() {
  // every kingdom we have data for gets a chip, even if it is no longer in the daily list
  const list = [...cfg.kingdoms];
  for (const kid of Object.keys((data && data.kingdoms) || {})) if (!list.some((k) => String(k.kid) === kid)) list.push({ kid: Number(kid), auto: false });
  $("sc_list").innerHTML = list.map((k) => `<span class="sc-chip"><b>#${esc(k.kid)}</b>${k.kid === OUR_KID ? ` <i>(${esc(tr("ours"))})</i>` : ""}
    <label><input type="checkbox" data-inc="${esc(k.kid)}" ${store.hide[k.kid] ? "" : "checked"}> ${esc(tr("include"))}</label>
    <label><input type="checkbox" data-auto="${esc(k.kid)}" ${k.auto ? "checked" : ""}> ${esc(tr("auto"))}</label>
    <button class="btn mini" data-refetch="${esc(k.kid)}" title="${esc(tr("fetch"))}">⟳</button><button class="btn mini" data-rm="${esc(k.kid)}" title="${esc(tr("remove"))}">✕</button></span>`).join("");
}
const COLS = [["rank", "colRank", 1], ["name", "colName"], ["alliance", "colAlliance"], ["power", "colPower", 1], ["tc", "colTc", 1], ["mystic", "colMystic", 1], ["kills", "colKills", 1], ["vip", "colVip", 1], ["sp", "colSp", 1], ["migrant", "colMigrant", 1]];
function rowsAll() {
  const ks = data && data.kingdoms ? Object.entries(data.kingdoms) : [];
  const rows = [];
  for (const [kid, k] of ks) { if (store.hide[kid]) continue; for (const p of k.players) rows.push({ ...p, kid: Number(kid), migrant: OFFICER.migrantOf(p) || null, sp: OFFICER.squadPower(p), spFb: OFFICER.spIsFallback(p) }); }
  const num = (v) => (v == null || v === "" ? -Infinity : Number(v));
  rows.sort((a, b) => {
    if (sortKey === "name" || sortKey === "alliance") return sortDir * String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""));
    return sortDir * (num(a[sortKey]) - num(b[sortKey]));
  });
  return rows;
}
function render() {
  applyTexts(); renderList();
  const ks = data && data.kingdoms ? Object.entries(data.kingdoms) : [];
  if (!ks.length) { $("sc_kingdoms").innerHTML = `<div class="card muted">${esc(tr("noData"))}</div>`; return; }
  const order = cfg.kingdoms.map((k) => String(k.kid));
  ks.sort((a, b) => (order.indexOf(a[0]) + 1 || 99) - (order.indexOf(b[0]) + 1 || 99));
  const shown = ks.filter(([kid]) => !store.hide[kid]);
  const rows = rowsAll();
  // columns: #, name, then the sort column, then the rest (so the sorted value is visible on a phone)
  let cols = COLS.slice();
  const kidColor = (kid) => String(kid) === String(OUR_KID) ? "ours" : "k" + (Math.max(0, order.indexOf(String(kid))) % 5);
  const sortCol = cols.find(([k]) => k === sortKey && k !== "name");
  if (sortCol) cols = [cols[0], cols[1], sortCol, ...cols.filter((c) => c !== cols[0] && c !== cols[1] && c !== sortCol)];
  const cell = (p, k, i) => {
    const cls = (COLS.find(([c]) => c === k)[2] ? "num" : "") + (k === sortKey ? " sorted" : "") + (k === "name" ? " kc " + kidColor(p.kid) : "");
    let v = "";
    if (k === "rank") v = String(i + 1);
    else if (k === "name") v = `<div class="name" dir="auto">${esc(p.name)}</div><div class="id">${shown.length > 1 ? `<b class="kidtag">#${esc(p.kid)}</b> · ` : ""}ID ${esc(p.id)}${p.uid ? ` · <a href="https://mightpulse.com/player/${encodeURIComponent(p.uid)}" target="_blank" rel="noopener">${esc(tr("openRec"))}</a>` : ""}${p.top && p.top.length === 1 ? ` · <span class="muted">${esc(tr(p.top[0] === "power" ? "onlyPower" : "onlyMigrant"))}</span>` : ""}</div>`;
    else if (k === "alliance") v = esc(p.alliance || "");
    else if (k === "power" || k === "kills" || k === "migrant") v = p[k] ? big(p[k]) : "";
    else if (k === "sp") v = p.sp ? (p.spFb ? "~" : "") + Math.round(p.sp) : "";
    else if (k === "mystic") v = p.mystic != null ? big(p.mystic) + (p.mysticRank != null ? ` <span class="muted">#${esc(p.mysticRank)}</span>` : "") : "";
    else v = esc(p[k] ?? "");
    return `<td class="${cls.trim()}">${v}</td>`;
  };
  const head = cols.map(([k, t, num]) => `<th class="${num ? "num" : ""}${k === "rank" ? "" : " sortable"}${k === sortKey ? " sorted" : ""}" data-k="${k}">${esc(tr(t))}${sortKey === k ? (sortDir > 0 ? " ▲" : " ▼") : ""}</th>`).join("");
  const sortOpts = COLS.filter(([k]) => k !== "rank").map(([k, t]) => `<option value="${k}"${k === sortKey ? " selected" : ""}>${esc(tr(t))}</option>`).join("");
  $("sc_kingdoms").innerHTML = `
    <div class="card">
      <h2 style="margin:0 0 4px">${esc(tr("ranking"))}${shown.length ? ` <small class="muted">${shown.map(([kid]) => "#" + esc(kid)).join(" + ")}</small>` : ""}</h2>
      <div class="muted msg">${esc(tr("rankingNote"))}</div>
      ${shown.map(([kid, k]) => `<div class="muted" style="font-size:13px;margin-top:4px"><b class="kc ${kidColor(kid)} kidtag">#${esc(kid)}</b>${String(kid) === String(OUR_KID) ? ` (${esc(tr("ours"))})` : ""} · ${esc(tr("asOf", { t: fmtT(k.asOf) }))}${k.alliances && k.alliances.length ? ` · ${esc(tr("alliances"))}: ${k.alliances.slice(0, 6).map((a) => `<b>${esc(a.tag)}</b> ${big(a.power)}`).join(", ")}` : ""}</div>`).join("")}
      <div class="row sc-sort" style="margin-top:10px"><label>${esc(tr("sortBy"))} <select id="sc_sortKey">${sortOpts}</select></label><button class="btn small" id="sc_sortDir">${sortDir > 0 ? "▲ " + esc(tr("asc")) : "▼ " + esc(tr("desc"))}</button></div>
      <div class="tbl-wrap" style="margin-top:8px"><table class="sc-tbl"><thead><tr>${head}</tr></thead><tbody>
      ${rows.length ? rows.map((p, i) => `<tr>${cols.map(([k]) => cell(p, k, i)).join("")}</tr>`).join("")
        : `<tr><td colspan="${cols.length}" class="muted">${esc(tr("noData"))}</td></tr>`}
      </tbody></table></div>
    </div>`;
  // sticky offsets follow the real column widths (table columns grow with their content)
  const ths = $("sc_kingdoms").querySelectorAll("thead th"), tbl = $("sc_kingdoms").querySelector(".sc-tbl");
  if (ths.length > 2 && tbl) { const w1 = ths[0].getBoundingClientRect().width, w2 = ths[1].getBoundingClientRect().width; tbl.style.setProperty("--sc-l2", w1 + "px"); tbl.style.setProperty("--sc-l3", (w1 + w2) + "px"); }
  $("sc_sortKey").onchange = (e) => { sortKey = e.target.value; sortDir = (sortKey === "name" || sortKey === "alliance") ? 1 : -1; store.sortKey = sortKey; store.sortDir = sortDir; save(); render(); };
  $("sc_sortDir").onclick = () => { sortDir = -sortDir; store.sortDir = sortDir; save(); render(); };
  $("sc_kingdoms").querySelectorAll("th.sortable").forEach((th) => th.onclick = () => {
    const k = th.dataset.k;
    if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = (k === "name" || k === "alliance") ? 1 : -1; }
    store.sortKey = sortKey; store.sortDir = sortDir; save(); render();
  });
}
async function requestFetch(kid) {
  kid = Number(kid);
  if (!(kid > 0)) { $("sc_msg").className = "msg warn"; $("sc_msg").textContent = tr("needKid"); return; }
  if (!cfg.kingdoms.some((k) => k.kid === kid)) cfg.kingdoms.push({ kid, auto: false });
  cfg.requested = [kid];
  if (!(await saveConfig(`Scout kingdom ${kid}`))) return;
  renderList();
  const m = $("sc_msg"); m.className = "msg okmsg"; m.textContent = tr("requested");
  // wait for the job: poll the data file until it carries a newer copy of this kingdom
  const since = Date.now(); clearInterval(waiting);
  waiting = setInterval(async () => {
    let d = null; try { d = await OfficerData.fetchJson(DATA); } catch (e) {}
    const k = d && d.kingdoms && d.kingdoms[kid];
    if (k && Date.parse(k.asOf) > since - 60000) { clearInterval(waiting); data = d; render(); m.className = "msg okmsg"; m.textContent = tr("done"); OfficerData.cacheSet && OfficerData.cacheSet(DATA.replace(/^/, ""), d); return; }
    if (Date.now() - since > 5 * 60000) { m.className = "msg"; m.textContent = tr("stillWaiting"); }
  }, 30000);
}
$("sc_fetch").onclick = () => requestFetch($("sc_kid").value);
$("sc_kid").onkeydown = (e) => { if (e.key === "Enter") requestFetch($("sc_kid").value); };
$("sc_list").onclick = async (e) => {
  const rf = e.target.closest("[data-refetch]"); if (rf) return requestFetch(rf.dataset.refetch);
  const rm = e.target.closest("[data-rm]");
  if (rm) {   // remove from the daily list AND ask the Action to delete its scouted data (else its chip comes back)
    const kid = rm.dataset.rm;
    cfg.kingdoms = cfg.kingdoms.filter((k) => String(k.kid) !== kid); delete cfg.requested; cfg.drop = [...new Set([...(cfg.drop || []), Number(kid)])];
    if (await saveConfig(`Scout: remove ${kid}`)) { if (data && data.kingdoms) delete data.kingdoms[kid]; delete store.hide[kid]; save(); $("sc_msg").textContent = ""; render(); }
  }
};
$("sc_list").onchange = async (e) => {
  const inc = e.target.closest("[data-inc]");
  if (inc) { if (inc.checked) delete store.hide[inc.dataset.inc]; else store.hide[inc.dataset.inc] = 1; save(); render(); return; }
  const cb = e.target.closest("[data-auto]"); if (!cb) return;
  let k = cfg.kingdoms.find((x) => String(x.kid) === cb.dataset.auto);
  if (!k) { k = { kid: Number(cb.dataset.auto), auto: false }; cfg.kingdoms.push(k); }
  k.auto = cb.checked;
  delete cfg.requested;
  if (await saveConfig(`Scout: ${cb.dataset.auto} daily ${cb.checked ? "on" : "off"}`)) $("sc_msg").textContent = "";
};
async function init() {
  TOKEN = OFFICER.token;
  applyTexts();
  await Promise.all([loadConfig(), loadData()]);
  render(); histCard();
}
/* 📦 MightPulse history: one encrypted file per day (data/mp-history/YYYY-MM-DD-x7k2p9.json, written by scripts/mp-history.js);
   the card decrypts the chosen days in the browser and downloads them as one JSON for the analysis chat */
function histCard() {
  const el = $("sc_hist"); if (!el) return;
  const h = (k) => (HT[lang] || HT.en)[k] || HT.en[k], day = (d) => d.toISOString().slice(0, 10), today = new Date();
  el.innerHTML = `<h3 style="margin:0 0 4px">${h("hT")}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${h("hNote")}</div>
    <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">${h("hFrom")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="sc_hf" value="${day(new Date(today - 6 * 864e5))}">
    ${h("hTo")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="sc_ht" value="${day(today)}"> <button type="button" class="btn" id="sc_hdl">${h("hDl")}</button> <span class="muted" id="sc_hmsg" style="font-size:12.5px"></span></div>`;
  $("sc_hdl").onclick = async () => {
    const a = new Date($("sc_hf").value + "T00:00:00Z"), b = new Date($("sc_ht").value + "T00:00:00Z"), out = {}, m = $("sc_hmsg");
    if (isNaN(a) || isNaN(b) || b < a || b - a > 120 * 864e5) return;
    for (let t = +a; t <= +b; t += 864e5) { const d = day(new Date(t)); m.textContent = h("hBusy").replace("{d}", d);
      try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x) out[d] = x; } catch (e) {} }
    const n = Object.keys(out).length; if (!n) { m.textContent = h("hNone"); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: "application/json" })), l = document.createElement("a");
    l.href = url; l.download = `mightpulse-history-${$("sc_hf").value}_${$("sc_ht").value}.json`; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
    m.textContent = h("hDone").replace("{n}", n); };
}
function setLang(l) { lang = l; render(); histCard(); }
OFFICER_PAGES.scout = { init, applyTexts, setLang };
})();
