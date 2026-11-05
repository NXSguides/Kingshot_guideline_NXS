/* NXS officer page — 🎯 KvK opponent intel (Sherry, 2026-11-01: "all the opponent data, in ⚔️ Battle → KvK, at the top").
   Drawn by js/officer/attack.js at the top of ⚔️ KvK: window.KvkIntel.html(snap) / .bind(rerender).
   Data: the 🔭 Scout file (data/scout-x7k2p9.json, scripts/scout-kingdom.js) — per kingdom: kingdom overview, 10 boards (top 100),
   the strongest alliances with a short member list, and the top players' own records (castle, shield, heroes);
   + our side from the newest daily MightPulse snapshot (data/mp-history/, the same file ⚔️ uses). Read only. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const HOME = 2189, B3 = ["gov_gear", "hero_equip", "master_power"];
const T = {
  en: { title: "🎯 KvK opponent intel", pick: "Opponent:", none: "No other kingdom scouted yet. Use 🔭 Scout below: type their kingdom number → Fetch now.",
    old: "This kingdom was scouted before the intel parts existed — press 🔄 Fetch again in 🔭 Scout below (2–3 min) to fill everything in.",
    data: "Data: {t}", kT: "🏰 Kingdom side by side", kH: ["", "Us #{a}", "Them #{b}", "They vs us"],
    k: { power: "Total power", avg_power: "Average power", player_count: "Players", active_7d: "Active (7 days)", active_30d: "Active (30 days)", alliance_count: "Alliances",
      hero_power: "Heroes", troop_power: "Troops", hero_equip: "Hero gear", governor_gear_power: "Governor gear", governor_charm_power: "Governor charms", pet_power: "Pets",
      master_power: "Masters", research_power: "Research", kills: "Kills", power_gain_7d: "Power gained (7 days)", tc_pushers_7d: "TC upgrades (7 days)", age_days: "Kingdom age (days)" },
    ahead: "us ahead", behind: "them ahead",
    mT: "⚔️ Main fighters, rank by rank", mNote: "Strength = Governor gear + Hero gear + Master power (millions), the same number ⚔️ uses. Only players in the top 100 of all three boards.",
    mH: ["#", "Them", "Us", "Gap"],
    dT: "📋 Their main fighters in detail", dNote: "Millions; the small number = their kingdom rank on that board.",
    dH: ["Player", "Strength", "Hero gear", "Gov gear", "Charms", "Master", "Troops", "Best hero", "Pets"],
    hT: "🦸 Their main fighters' heroes", hNote: "Level · ★ stars · ⚙️ exclusive gear (Widget) level. From each player's own record (the top players of 🔭 Scout).",
    hCommon: "Most used:", hNone: "No hero data yet — press 🔄 Fetch in 🔭 Scout.",
    aT: "🛡️ Their alliances", aH: ["Alliance", "Power", "Members", "Active 24 h", "Active 3 days", "Online now", "TC max / avg"], aLead: "R4 / R5:",
    pT: "📍 Castles and shields", pNote: "From MightPulse — positions and shields only change after someone presses “Update Map” on the MightPulse map.",
    pH: ["Player", "X:Y", "Shield until", "Last login"], noShield: "—" },
  zh: { title: "🎯 KvK 對手情報", pick: "對手：", none: "還沒有偵察其他王國。用下面的 🔭 偵察：輸入對方王國編號 → 立即抓取。",
    old: "這個王國是在情報功能出來之前偵察的——在下面 🔭 偵察按一次 🔄 重新抓取（2–3 分鐘），就會補齊全部資料。",
    data: "資料：{t}", kT: "🏰 王國對照", kH: ["", "我們 #{a}", "對方 #{b}", "對方比我們"],
    k: { power: "總戰力", avg_power: "平均戰力", player_count: "人數", active_7d: "活躍（7 天）", active_30d: "活躍（30 天）", alliance_count: "聯盟數",
      hero_power: "英雄", troop_power: "部隊", hero_equip: "英雄裝備", governor_gear_power: "領主裝備", governor_charm_power: "領主魅力", pet_power: "寵物",
      master_power: "大師", research_power: "研究", kills: "擊殺", power_gain_7d: "7 天戰力成長", tc_pushers_7d: "7 天升城鎮中心人數", age_days: "開服天數" },
    ahead: "我們領先", behind: "對方領先",
    mT: "⚔️ 主力逐名對照", mNote: "強度 = 領主裝備 + 英雄裝備 + 大師戰力（百萬），跟 ⚔️ 用的同一個數字。只算三個排行榜都在前 100 名的人。",
    mH: ["#", "對方", "我們", "差距"],
    dT: "📋 對方主力明細", dNote: "單位百萬；小數字 = 他在自己王國那個排行榜的名次。",
    dH: ["玩家", "強度", "英雄裝備", "領主裝備", "魅力", "大師", "部隊", "單一英雄", "寵物"],
    hT: "🦸 對方主力的英雄", hNote: "等級 · ★ 星級 · ⚙️ 專屬裝備（零件）等級。來自每個人自己的資料（🔭 偵察抓的前段玩家）。",
    hCommon: "最常帶：", hNone: "還沒有英雄資料——在 🔭 偵察按 🔄 重新抓取。",
    aT: "🛡️ 對方聯盟", aH: ["聯盟", "戰力", "人數", "24 小時內上線", "3 天內上線", "現在在線", "城鎮中心 最高／平均"], aLead: "R4／R5：",
    pT: "📍 城堡位置和護盾", pNote: "來自 MightPulse——要有人在 MightPulse 地圖按「Update Map」，位置和護盾才會更新。",
    pH: ["玩家", "X:Y", "護盾到", "最後登入"], noShield: "—" },
  pt: { title: "🎯 Informações do adversário (KvK)", pick: "Adversário:", none: "Nenhum outro reino espiado ainda. Use 🔭 Espiar abaixo: número do reino → Buscar agora.",
    old: "Este reino foi espiado antes destas informações existirem — aperte 🔄 Buscar de novo em 🔭 Espiar abaixo (2–3 min) para preencher tudo.",
    data: "Dados: {t}", kT: "🏰 Reinos lado a lado", kH: ["", "Nós #{a}", "Eles #{b}", "Eles vs nós"],
    k: { power: "Poder total", avg_power: "Poder médio", player_count: "Jogadores", active_7d: "Ativos (7 dias)", active_30d: "Ativos (30 dias)", alliance_count: "Alianças",
      hero_power: "Heróis", troop_power: "Tropas", hero_equip: "Equip. de heróis", governor_gear_power: "Equip. do governador", governor_charm_power: "Amuletos do governador", pet_power: "Mascotes",
      master_power: "Mestres", research_power: "Pesquisa", kills: "Abates", power_gain_7d: "Poder ganho (7 dias)", tc_pushers_7d: "Upgrades de CC (7 dias)", age_days: "Idade do reino (dias)" },
    ahead: "nós na frente", behind: "eles na frente",
    mT: "⚔️ Lutadores principais, posição a posição", mNote: "Força = Equip. do governador + Equip. de heróis + Poder de mestre (milhões), o mesmo número do ⚔️. Só quem está no top 100 dos três rankings.",
    mH: ["#", "Eles", "Nós", "Diferença"],
    dT: "📋 Os lutadores principais deles", dNote: "Milhões; o número pequeno = a posição no reino deles nesse ranking.",
    dH: ["Jogador", "Força", "Equip. heróis", "Equip. gov.", "Amuletos", "Mestre", "Tropas", "Melhor herói", "Mascotes"],
    hT: "🦸 Heróis dos lutadores principais", hNote: "Nível · ★ estrelas · ⚙️ nível da Ferramenta. Do registro de cada jogador (os primeiros do 🔭 Espiar).",
    hCommon: "Mais usados:", hNone: "Ainda sem heróis — aperte 🔄 Buscar no 🔭 Espiar.",
    aT: "🛡️ Alianças deles", aH: ["Aliança", "Poder", "Membros", "Ativos 24 h", "Ativos 3 dias", "Online agora", "CC máx / média"], aLead: "R4 / R5:",
    pT: "📍 Castelos e escudos", pNote: "Do MightPulse — posições e escudos só mudam depois que alguém aperta “Update Map” no mapa do MightPulse.",
    pH: ["Jogador", "X:Y", "Escudo até", "Último login"], noShield: "—" },
  ar: { title: "🎯 معلومات الخصم (KvK)", pick: "الخصم:", none: "لم تُستطلع مملكة أخرى بعد. استخدم 🔭 الاستطلاع بالأسفل: رقم المملكة ← اجلب الآن.",
    old: "استُطلعت هذه المملكة قبل وجود هذه المعلومات — اضغط 🔄 اجلب مجددًا في 🔭 الاستطلاع بالأسفل (2–3 دقائق) لملء كل شيء.",
    data: "البيانات: {t}", kT: "🏰 المملكتان جنبًا إلى جنب", kH: ["", "نحن #{a}", "هم #{b}", "هم مقارنة بنا"],
    k: { power: "القوة الكلية", avg_power: "متوسط القوة", player_count: "اللاعبون", active_7d: "النشطون (7 أيام)", active_30d: "النشطون (30 يومًا)", alliance_count: "التحالفات",
      hero_power: "الأبطال", troop_power: "القوات", hero_equip: "معدات الأبطال", governor_gear_power: "معدات الحاكم", governor_charm_power: "تمائم الحاكم", pet_power: "الحيوانات",
      master_power: "الأساتذة", research_power: "الأبحاث", kills: "القتلى", power_gain_7d: "القوة المكتسبة (7 أيام)", tc_pushers_7d: "ترقيات مركز المدينة (7 أيام)", age_days: "عمر المملكة (أيام)" },
    ahead: "نحن متقدمون", behind: "هم متقدمون",
    mT: "⚔️ المقاتلون الرئيسيون مرتبة بمرتبة", mNote: "القوة = معدات الحاكم + معدات الأبطال + قوة الأستاذ (بالملايين)، الرقم نفسه في ⚔️. فقط من هم في أفضل 100 في القوائم الثلاث.",
    mH: ["#", "هم", "نحن", "الفرق"],
    dT: "📋 مقاتلوهم الرئيسيون بالتفصيل", dNote: "بالملايين؛ الرقم الصغير = ترتيبه في مملكته في تلك القائمة.",
    dH: ["اللاعب", "القوة", "معدات الأبطال", "معدات الحاكم", "التمائم", "الأستاذ", "القوات", "أفضل بطل", "الحيوانات"],
    hT: "🦸 أبطال مقاتليهم الرئيسيين", hNote: "المستوى · ★ النجوم · ⚙️ مستوى الأداة. من سجل كل لاعب (أوائل 🔭 الاستطلاع).",
    hCommon: "الأكثر استخدامًا:", hNone: "لا توجد بيانات أبطال بعد — اضغط 🔄 اجلب في 🔭 الاستطلاع.",
    aT: "🛡️ تحالفاتهم", aH: ["التحالف", "القوة", "الأعضاء", "نشط 24 س", "نشط 3 أيام", "متصل الآن", "مركز المدينة أعلى / متوسط"], aLead: "R4 / R5:",
    pT: "📍 القلاع والدروع", pNote: "من MightPulse — المواقع والدروع لا تتغير إلا بعد أن يضغط أحد «Update Map» على خريطة MightPulse.",
    pH: ["اللاعب", "X:Y", "الدرع حتى", "آخر دخول"], noShield: "—" },
  ko: { title: "🎯 KvK 상대 정보", pick: "상대:", none: "아직 다른 왕국을 정찰하지 않았어요. 아래 🔭 정찰에서 왕국 번호 → 지금 가져오기.",
    old: "이 왕국은 정보 기능이 생기기 전에 정찰했어요 — 아래 🔭 정찰에서 🔄 다시 가져오기를 누르면 (2–3분) 전부 채워져요.",
    data: "데이터: {t}", kT: "🏰 왕국 비교", kH: ["", "우리 #{a}", "상대 #{b}", "상대 대비"],
    k: { power: "총 전투력", avg_power: "평균 전투력", player_count: "인원", active_7d: "활동 (7일)", active_30d: "활동 (30일)", alliance_count: "연맹 수",
      hero_power: "영웅", troop_power: "병력", hero_equip: "영웅 장비", governor_gear_power: "영주 장비", governor_charm_power: "영주 매력", pet_power: "펫",
      master_power: "마스터", research_power: "연구", kills: "처치", power_gain_7d: "7일 전투력 증가", tc_pushers_7d: "7일 도시센터 업그레이드", age_days: "왕국 나이 (일)" },
    ahead: "우리가 앞섬", behind: "상대가 앞섬",
    mT: "⚔️ 주력 순위별 비교", mNote: "강도 = 영주 장비 + 영웅 장비 + 마스터 전투력 (백만), ⚔️와 같은 숫자. 세 랭킹 모두 상위 100위 안인 사람만.",
    mH: ["#", "상대", "우리", "차이"],
    dT: "📋 상대 주력 상세", dNote: "단위 백만; 작은 숫자 = 그 랭킹의 자기 왕국 순위.",
    dH: ["플레이어", "강도", "영웅 장비", "영주 장비", "매력", "마스터", "병력", "최고 영웅", "펫"],
    hT: "🦸 상대 주력의 영웅", hNote: "레벨 · ★ 별 · ⚙️ 전용 장비(부속품) 레벨. 각자 기록에서 (🔭 정찰의 상위 플레이어).",
    hCommon: "가장 많이 씀:", hNone: "아직 영웅 데이터 없음 — 🔭 정찰에서 🔄 가져오기.",
    aT: "🛡️ 상대 연맹", aH: ["연맹", "전투력", "인원", "24시간 내 접속", "3일 내 접속", "지금 접속", "도시센터 최고 / 평균"], aLead: "R4 / R5:",
    pT: "📍 성 위치와 보호막", pNote: "MightPulse 기준 — 누가 MightPulse 지도에서 “Update Map”을 눌러야 위치와 보호막이 바뀌어요.",
    pH: ["플레이어", "X:Y", "보호막 종료", "마지막 접속"], noShield: "—" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const LOC = () => ({ zh: "zh-TW", ko: "ko-KR", ar: "ar", pt: "pt-BR" }[lang] || "en-GB");
const when = (v) => { if (v == null || v === "") return "—"; const ms = typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v); return Number.isFinite(ms) ? new Date(ms).toLocaleString(LOC(), { dateStyle: "short", timeStyle: "short" }) : "—"; };
const big = (n) => n == null ? "—" : Math.abs(n) >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + "M" : Math.abs(n) >= 1e4 ? Math.round(n / 1e3) + "k" : String(Math.round(n));
const M = (n) => n == null ? "—" : (n / 1e6).toFixed(1);
/* hero names → our picture (figures/heroes/hero_<id>.webp) and the official Chinese name */
const HZH = { amadeus: "阿瑪迪斯", amane: "雨音", chenko: "琴科", diana: "狄安娜", edwin: "艾德溫", eric: "艾瑞克", fahd: "法赫德", forrest: "福斯特", gordon: "戈登", helga: "赫爾加",
  hilde: "希爾德", howard: "霍華德", jabel: "潔貝爾", jaeger: "耶格爾", marlin: "馬林", olive: "奧麗芙", petra: "小佩拉", quinn: "奎恩", saul: "薩洛", seth: "史密斯", yeonwoo: "妍羽",
  zoe: "佐伊", alcar: "艾爾卡", longfei: "龍飛", margot: "瑪歌", rosa: "蘿莎", thrud: "索德", vivian: "薇薇安", triton: "崔頓", sophia: "蘇菲亞", yang: "楊", charles: "查爾斯",
  ava: "艾娃", weewoo: "Wee & Woo", liz: "莉茲", diego: "迪亞哥", luna: "露娜" };
const HAVE = new Set(Object.keys(HZH));
const hid = (n) => String(n || "").toLowerCase().replace(/[^a-z]/g, "");
const hname = (n) => lang === "zh" && HZH[hid(n)] ? HZH[hid(n)] : String(n || "");

let SC = null, loading = null, pick = (() => { try { return localStorage.getItem("nxs-intel-kid") || ""; } catch (e) { return ""; } })();
const OPEN = new Set(["in_k", "in_m"]);
function load(after) {
  if (SC || loading) return;
  loading = (async () => { try { SC = await OfficerData.fetchJson("data/scout-x7k2p9.json"); } catch (e) { SC = { kingdoms: {} }; } loading = null; after && after(); })();
}
const kids = () => Object.keys((SC && SC.kingdoms) || {}).map(Number).filter((k) => k && k !== HOME).sort((a, b) => b - a);

/* players of one kingdom from the snapshot boards (and the scout boards): id → { name, al, rank: {board: n}, b: {board: score} } */
function boardPlayers(snap, kid, scBoards) {
  const P = {};
  const put = (board, rank, id, name, al, score) => { if (id == null) return; const k = String(id); const p = P[k] = P[k] || { id: k, name, al, b: {}, rank: {} }; p.b[board] = score; p.rank[board] = rank; if (!p.name) p.name = name; };
  for (const [key, bd] of Object.entries((snap && snap.boards) || {})) { const [k, board] = key.split(":"); if (+k !== kid) continue;
    for (const r of bd.rows || []) put(board, r.rank, r.governor_id, r.nick_name, r.alliance_abbr || "", r.score); }
  for (const [board, rows] of Object.entries(scBoards || {})) for (const [rank, id, name, al, score] of rows) put(board, rank, id, name, al, score);
  return P;
}
const sOf = (p) => p && B3.every((b) => p.b[b] != null) ? B3.reduce((s, b) => s + p.b[b] / 1e6, 0) : null;
const ranked = (P) => Object.values(P).filter(sOf).sort((a, b) => sOf(b) - sOf(a));

function html(snap) {
  lang = OFFICER.lang || lang;
  if (!SC) { load(() => window.KvkIntel.rerender && window.KvkIntel.rerender()); return `<h3 style="margin:0">${esc(t("title"))}</h3><div class="muted">…</div>`; }
  const ks = kids();
  if (!ks.length) return `<h3 style="margin:0 0 4px">${esc(t("title"))}</h3><div class="muted">${esc(t("none"))}</div>`;
  const kid = ks.includes(+pick) ? +pick : ks[0], K = SC.kingdoms[kid] || {};
  const det = (id, title, body) => `<details class="in-sec" id="${id}"${OPEN.has(id) ? " open" : ""}><summary><b>${esc(title)}</b></summary>${body}</details>`;
  const bar = ks.length > 1 ? `<div class="row" style="gap:6px;margin:4px 0 8px;align-items:center"><span class="muted">${esc(t("pick"))}</span>${ks.map((k) => `<button class="btn small${k === kid ? " on" : ""}" data-inkid="${k}">#${k}</button>`).join("")}</div>` : "";
  const fresh = !!(K.kingdom || K.boards);
  let out = `<h3 style="margin:0 0 4px">${esc(t("title"))} · #${kid}</h3>${bar}<div class="muted" style="font-size:12.5px">${esc(fill(t("data"), { t: when(K.asOf) }))}</div>`
    + (fresh ? "" : `<div class="mv-warn" style="font-size:12.5px;margin:6px 0">${esc(t("old"))}</div>`);

  /* 🏰 kingdoms */
  const us = (SC.home && SC.home.kingdom) || (snap && snap.kingdoms && snap.kingdoms[HOME]) || null;
  const them = K.kingdom || (snap && snap.kingdoms && snap.kingdoms[kid]) || null;
  if (us && them) {
    const L = t("k"), h = t("kH");
    const rows = Object.keys(L).filter((k) => us[k] != null || them[k] != null).map((k) => {
      const a = +us[k], b = +them[k], d = a && Number.isFinite(b) ? (b - a) / a * 100 : null;
      const good = k === "age_days" ? null : d == null ? null : d <= 0;   // they have less = good for us
      return `<tr><th>${esc(L[k])}</th><td>${big(a)}</td><td>${big(b)}</td><td class="${good == null ? "" : good ? "in-good" : "in-bad"}">${d == null ? "—" : (d > 0 ? "+" : "") + d.toFixed(0) + "%"}</td></tr>`; }).join("");
    out += det("in_k", t("kT"), `<div class="ak-tw"><table class="ak-t in-t"><thead><tr>${h.map((x) => `<th>${esc(fill(x, { a: HOME, b: kid }))}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>
      <div class="muted" style="font-size:12px;margin-top:4px"><span class="in-good">■</span> ${esc(t("ahead"))} · <span class="in-bad">■</span> ${esc(t("behind"))}</div>`);
  }

  /* ⚔️ rank by rank + 📋 details */
  const TP = boardPlayers(snap, kid, K.boards), UP = boardPlayers(snap, HOME, null);
  const tl = ranked(TP), ul = ranked(UP);
  if (tl.length) {
    const n = Math.min(20, tl.length);
    const rows = Array.from({ length: n }, (_, i) => { const a = tl[i], b = ul[i], d = b ? sOf(b) - sOf(a) : null;
      return `<tr><td>${i + 1}</td><td><bdi>${esc(a.name)}</bdi> <span class="muted">[${esc(a.al)}]</span> <b>${sOf(a).toFixed(1)}</b></td><td>${b ? `<bdi>${esc(b.name)}</bdi> <b>${sOf(b).toFixed(1)}</b>` : "—"}</td><td class="${d == null ? "" : d >= 0 ? "in-good" : "in-bad"}">${d == null ? "—" : (d >= 0 ? "+" : "") + d.toFixed(1)}</td></tr>`; }).join("");
    out += det("in_m", t("mT"), `<div class="muted" style="font-size:12px;margin-bottom:4px">${esc(t("mNote"))}</div><div class="ak-tw"><table class="ak-t in-t"><thead><tr>${t("mH").map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`);
    const cols = ["hero_equip", "gov_gear", "gov_charm", "master_power", "troop_power", "single_hero", "pet_power"];
    const drow = (p) => `<tr><td><bdi>${esc(p.name)}</bdi> <span class="muted">[${esc(p.al)}]</span></td><td><b>${sOf(p).toFixed(1)}</b></td>${cols.map((c) => `<td>${M(p.b[c])}${p.rank[c] ? `<small class="muted"> #${p.rank[c]}</small>` : ""}</td>`).join("")}</tr>`;
    out += det("in_d", t("dT"), `<div class="muted" style="font-size:12px;margin-bottom:4px">${esc(t("dNote"))}</div><div class="ak-tw"><table class="ak-t in-t"><thead><tr>${t("dH").map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${tl.slice(0, 20).map(drow).join("")}</tbody></table></div>`);
  }

  /* 🦸 heroes, 📍 castles: the players' own records (Scout file + snapshot players of that kingdom) */
  const rec = {};
  for (const [id, x] of Object.entries((snap && snap.players) || {})) { const pl = x && x.player; if (pl && +pl.kid === kid) rec[id] = { name: pl.nick_name, al: (pl.alliance && pl.alliance.abbr) || "", player: pl, heroes: x.heroes }; }
  for (const p of K.players || []) if (p.raw && p.raw.player) rec[String(p.id)] = { name: p.name, al: p.alliance || "", player: p.raw.player, heroes: p.raw.heroes };
  const order = (id) => { const i = tl.findIndex((p) => p.id === id); return i < 0 ? 999 : i; };
  const recs = Object.entries(rec).sort((a, b) => order(a[0]) - order(b[0]) || ((b[1].player.power || 0) - (a[1].player.power || 0)));
  const withH = recs.filter(([, r]) => Array.isArray(r.heroes) && r.heroes.length);
  if (withH.length) {
    const cnt = {}; withH.slice(0, 20).forEach(([, r]) => r.heroes.forEach((h) => { const k = hid(h.name); if (k) cnt[k] = (cnt[k] || 0) + 1; }));
    const common = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const pic = (h) => { const k = hid(h.name), src = HAVE.has(k) ? `figures/heroes/hero_${k}.webp` : (h.icon || ""); return src ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : `<span class="in-noimg"></span>`; };
    const chip = (h) => `<span class="in-h">${pic(h)}<b><bdi>${esc(hname(h.name))}</bdi></b><small>Lv${h.level ?? "?"} · ★${h.stars ?? h.star ?? "?"}${h.exclusive_gear_level ? ` · ⚙️${h.exclusive_gear_level}` : ""}</small></span>`;
    out += det("in_h", t("hT"), `<div class="muted" style="font-size:12px;margin-bottom:6px">${esc(t("hNote"))}</div>
      <div class="in-common"><b>${esc(t("hCommon"))}</b> ${common.map(([k, n]) => `<span class="in-tag">${esc(lang === "zh" && HZH[k] ? HZH[k] : k)} ×${n}</span>`).join(" ")}</div>
      ${withH.slice(0, 15).map(([id, r]) => `<div class="in-hrow"><div class="in-hname"><bdi>${esc(r.name)}</bdi> <span class="muted">[${esc(r.al)}]</span>${sOf(TP[id]) ? ` · <b>${sOf(TP[id]).toFixed(1)}</b>` : ""}</div>
        <div class="in-hs">${[...r.heroes].sort((a, b) => (a.position ?? 9) - (b.position ?? 9)).map(chip).join("")}</div></div>`).join("")}`);
  } else if (fresh) out += det("in_h", t("hT"), `<div class="muted">${esc(t("hNone"))}</div>`);

  /* 🛡️ alliances */
  const al = (K.alliances || []).filter((a) => a && a.tag);
  if (al.length) {
    const r4 = (a) => (a.members || []).filter((m) => m[4] >= 4).sort((x, y) => y[4] - x[4]).map((m) => `${m[1]}${m[4] >= 5 ? " (R5)" : ""}`);
    out += det("in_a", t("aT"), `<div class="ak-tw"><table class="ak-t in-t"><thead><tr>${t("aH").map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>
      ${al.map((a) => `<tr><td><b>${esc(a.tag)}</b>${a.name ? `<br><small class="muted"><bdi>${esc(a.name)}</bdi></small>` : ""}</td><td>${big(a.power)}</td><td>${a.count ?? "—"}</td><td>${a.active24 ?? "—"}</td><td>${a.active72 ?? "—"}</td><td>${a.online ?? "—"}</td><td>${a.tcMax ?? "—"} / ${a.tcAvg ?? "—"}</td></tr>`).join("")}</tbody></table></div>
      ${al.filter((a) => r4(a).length).map((a) => `<div class="in-lead"><b>${esc(a.tag)}</b> ${esc(t("aLead"))} <span><bdi>${esc(r4(a).join(", "))}</bdi></span></div>`).join("")}`);
  }

  /* 📍 castles and shields */
  const pos = recs.filter(([, r]) => r.player.x != null && r.player.y != null);
  if (pos.length) {
    const now = Date.now(), sh = (v) => { if (!v) return t("noShield"); const ms = v < 1e12 ? v * 1000 : v; return ms > now ? "🛡️ " + when(ms) : t("noShield"); };
    out += det("in_p", t("pT"), `<div class="muted" style="font-size:12px;margin-bottom:4px">${esc(t("pNote"))}</div><div class="ak-tw"><table class="ak-t in-t"><thead><tr>${t("pH").map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>
      ${pos.slice(0, 40).map(([, r]) => `<tr><td><bdi>${esc(r.name)}</bdi> <span class="muted">[${esc(r.al)}]</span></td><td>${r.player.x}:${r.player.y}</td><td>${sh(r.player.shield_endtime)}</td><td>${when(r.player.last_login || r.player.last_active_at)}</td></tr>`).join("")}</tbody></table></div>`);
  }
  return out;
}
function bind(rerender) {
  window.KvkIntel.rerender = rerender;
  document.querySelectorAll("[data-inkid]").forEach((b) => b.onclick = () => { pick = b.dataset.inkid; try { localStorage.setItem("nxs-intel-kid", pick); } catch (e) {} rerender(); });
  document.querySelectorAll("details.in-sec").forEach((d) => d.ontoggle = () => { if (d.open) OPEN.add(d.id); else OPEN.delete(d.id); });
}
/* 🔭 Scout fetched something new → read the file again next time */
function reset() { SC = null; }
window.KvkIntel = { html, bind, reset, rerender: null };
})();
