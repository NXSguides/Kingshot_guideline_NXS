/* NXS officer page — ⚔️ Attack planner (registers OFFICER_PAGES.attack; own tab, nobody by default, admins always).
   Simple version (Sherry, 2026-10-30): everything comes from TODAY's MightPulse boards — no old battle-report stats to keep up.
   - Strength of a leader S = Governor gear + Hero equip + Master power (millions), from the newest daily snapshot
     (data/mp-history/, scripts/mp-history.js). Only players in the kingdom top 100 of all three boards have it.
   - r = (S_us / S_them)^B × (tier_us / tier_them)² × buffs. B = 1.06 comes from 7 NXS rally leaders whose real troop stats
     we saw on rally screens (10/28–29): stat quality ∝ S^1.06, R² 0.95 (Project doc claude/mightpulse-stat-check.md).
     That relation stays; the S values themselves are read fresh every day.
   - Per rally R vs garrison G (p ≈ 1.75): G^p − r R^p stays constant; r R^p > G^p → we take it and (R^p − G^p / r)^(1/p) of ours
     stay as the new garrison; else their garrison drops to (G^p − r R^p)^(1/p) (+ reinforcements). Spec: claude/attack-planner-spec.md. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const B = 1.06;
const TIER = { T9: 1.0, T10: 1.18, TG1: 1.228, TG2: 1.289, TG3: 1.353 };
const T = {
  en: { title: "⚔️ Attack planner", intro: "How many rallies a target needs, and who goes last — from today's MightPulse boards. Our side: Chenko joiners, 50 : 20 : 30.",
    aT: "⚔️ Plan the attack", tgt: "Target", tLead: "Their garrison leader", tG: "Garrison troops", tTier: "Their tier", terr: "In their own territory (+10% all)", us: "Our rallies (in order)", lead: "Leader", size: "Troops", tier: "Tier", addR: "➕ Rally", more: "More settings", debUs: "Their debuff on us (attack/defense −%)", debThem: "Our debuff on them (−%)", p: "p (1.5 – 2)", reinf: "Reinforcements between rallies", pick: "— choose —",
    res: "Result", colR: "Rally", colS: "Strength", colOut: "Result", win: "✅ We take it — {s} of ours stay", lose: "❌ Lost — {g} of theirs left", need: "Rallies like #1 needed: about {n}.", last: "Send expendable rallies first and the strongest leader last — the last rally's survivors hold the building.", one: "One of their troops ≈ {x} of ours (r = {r}).",
    unc: "Rallies like #1 needed for other garrison sizes and p:", caveat: "Rough estimate: it under-rates attackers (B24: model ≈ 300k left, real 587k). Not counted: hero skill kills, troop counters; a garrison may use its strongest member's stats.", noR: "Choose their garrison leader and at least one of our leaders.",
    bT: "📊 Today's strength", bNote: "Strength = Governor gear + Hero equip + Master power (millions). Only players in the kingdom top 100 of all three boards have one; others can't be chosen.", bData: "Boards from {d} · kingdom {k}", bNoData: "No MightPulse boards yet (saved every day at 20:45 UTC).", bOurs: "NXS", bThem: "Others", bFind: "Search a player…", bMiss: "below the top 100 on {b}", gear: "Gov gear", heq: "Hero equip", mst: "Master" },
  zh: { title: "⚔️ 攻擊規劃", intro: "一個目標要打幾波集結、最後派誰——用今天的 MightPulse 排行榜算。我們這邊：琴科加入者、50 : 20 : 30。",
    aT: "⚔️ 規劃進攻", tgt: "目標", tLead: "對方駐守隊長", tG: "守軍兵數", tTier: "對方兵等", terr: "在他們自己的領地（四項 +10%）", us: "我們的集結（照順序）", lead: "隊長", size: "兵數", tier: "兵等", addR: "➕ 集結", more: "更多設定", debUs: "對方給我們的減益（攻擊／防禦 −%）", debThem: "我們給對方的減益（−%）", p: "p（1.5 – 2）", reinf: "每波之間對方補兵", pick: "— 選擇 —",
    res: "結果", colR: "集結", colS: "強度", colOut: "結果", win: "✅ 打下來了——我們剩 {s}", lose: "❌ 輸了——對方剩 {g}", need: "照第 1 波這種集結：大約要 {n} 波。", last: "可以犧牲的集結先上，最強的隊長最後——最後一波的生還者會守建築。", one: "對方一個兵 ≈ 我們 {x} 個兵（r = {r}）。",
    unc: "換成其他守軍兵數和 p，照第 1 波這種集結要幾波：", caveat: "粗估：會低估攻方（B24：模型剩約 30 萬，實際 58.7 萬）。沒算到：英雄技能擊殺、兵種相剋；守軍可能用裡面最強的人的屬性。", noR: "請選對方駐守隊長，和至少一位我們的隊長。",
    bT: "📊 今天的強度", bNote: "強度 = 領主裝備 + 英雄裝備 + 大師戰力（百萬）。三個榜都在王國前 100 名的人才有強度，其他人不能選。", bData: "排行榜日期 {d} · 王國 {k}", bNoData: "還沒有 MightPulse 排行榜資料（每天 20:45 UTC 存一份）。", bOurs: "NXS", bThem: "其他聯盟", bFind: "搜尋玩家…", bMiss: "{b} 不在前 100 名", gear: "領主裝備", heq: "英雄裝備", mst: "大師" },
  pt: { title: "⚔️ Planejar ataque", intro: "Quantos rallies um alvo precisa e quem vai por último — pelos rankings de hoje do MightPulse. Nosso lado: Chenko, 50 : 20 : 30.",
    aT: "⚔️ Planejar o ataque", tgt: "Alvo", tLead: "Líder da guarnição deles", tG: "Tropas da guarnição", tTier: "Nível deles", terr: "No território deles (+10% em tudo)", us: "Nossos rallies (em ordem)", lead: "Líder", size: "Tropas", tier: "Nível", addR: "➕ Rally", more: "Mais opções", debUs: "Debuff deles em nós (ataque/defesa −%)", debThem: "Nosso debuff neles (−%)", p: "p (1,5 – 2)", reinf: "Reforços entre rallies", pick: "— escolha —",
    res: "Resultado", colR: "Rally", colS: "Força", colOut: "Resultado", win: "✅ Tomamos — ficam {s} nossos", lose: "❌ Perdemos — restam {g} deles", need: "Rallies como o nº 1 necessários: cerca de {n}.", last: "Mande os rallies dispensáveis primeiro e o líder mais forte por último — os sobreviventes do último seguram o prédio.", one: "Uma tropa deles ≈ {x} das nossas (r = {r}).",
    unc: "Rallies como o nº 1 necessários para outros tamanhos e p:", caveat: "Estimativa: subestima o atacante (B24: modelo ≈ 300 mil, real 587 mil). Fora: mortes por habilidades, vantagens de tipo; a guarnição pode usar os atributos do membro mais forte.", noR: "Escolha o líder da guarnição deles e pelo menos um líder nosso.",
    bT: "📊 Força de hoje", bNote: "Força = Equip. do governador + Equip. de heróis + Poder de mestre (milhões). Só quem está no top 100 do reino nos três tem força; os outros não podem ser escolhidos.", bData: "Rankings de {d} · reino {k}", bNoData: "Ainda sem rankings do MightPulse (salvos todo dia às 20:45 UTC).", bOurs: "NXS", bThem: "Outros", bFind: "Procurar jogador…", bMiss: "fora do top 100 em {b}", gear: "Equip. gov.", heq: "Equip. heróis", mst: "Mestre" },
  ar: { title: "⚔️ تخطيط الهجوم", intro: "كم حشدًا يحتاج الهدف ومن يذهب أخيرًا — من لوحات MightPulse اليوم. جانبنا: Chenko و50 : 20 : 30.",
    aT: "⚔️ خطّط الهجوم", tgt: "الهدف", tLead: "قائد حاميتهم", tG: "جنود الحامية", tTier: "مستواهم", terr: "في أرضهم (+10% للكل)", us: "حشودنا (بالترتيب)", lead: "القائد", size: "الجنود", tier: "المستوى", addR: "➕ حشد", more: "إعدادات أخرى", debUs: "إضعافهم علينا (هجوم/دفاع −%)", debThem: "إضعافنا عليهم (−%)", p: "p (1.5 – 2)", reinf: "تعزيزات بين الحشود", pick: "— اختر —",
    res: "النتيجة", colR: "حشد", colS: "القوة", colOut: "النتيجة", win: "✅ نأخذه — يبقى {s} من جنودنا", lose: "❌ خسرنا — يبقى {g} من جنودهم", need: "حشود مثل رقم 1 المطلوبة: نحو {n}.", last: "أرسل الحشود التي يمكن التضحية بها أولًا والقائد الأقوى أخيرًا — الناجون من آخر حشد يحمون المبنى.", one: "جندي واحد منهم ≈ {x} من جنودنا (r = {r}).",
    unc: "عدد الحشود مثل رقم 1 لأحجام وقيم p أخرى:", caveat: "تقدير تقريبي: يقلّل من قوة المهاجم (B24: النموذج ≈ 300 ألف، الفعلي 587 ألفًا). غير محسوب: قتلى المهارات وأفضلية الأنواع؛ قد تستخدم الحامية إحصاءات أقوى عضو.", noR: "اختر قائد حاميتهم وقائدًا واحدًا على الأقل منا.",
    bT: "📊 قوة اليوم", bNote: "القوة = عتاد الحاكم + عتاد الأبطال + قوة المعلّم (بالملايين). فقط من هو ضمن أفضل 100 في المملكة في اللوحات الثلاث له قوة؛ لا يمكن اختيار غيرهم.", bData: "لوحات {d} · المملكة {k}", bNoData: "لا توجد لوحات MightPulse بعد (تُحفظ يوميًا 20:45 UTC).", bOurs: "NXS", bThem: "آخرون", bFind: "ابحث عن لاعب…", bMiss: "خارج أفضل 100 في {b}", gear: "عتاد الحاكم", heq: "عتاد الأبطال", mst: "المعلّم" },
  ko: { title: "⚔️ 공격 계획", intro: "목표 하나에 집결이 몇 번 필요한지, 마지막은 누가 갈지 — 오늘의 MightPulse 랭킹으로 계산해요. 우리: Chenko 참가자, 50 : 20 : 30.",
    aT: "⚔️ 공격 계획 세우기", tgt: "목표", tLead: "그들 주둔 대장", tG: "주둔 병력", tTier: "그들 등급", terr: "그들 영토 안 (전부 +10%)", us: "우리 집결 (순서대로)", lead: "대장", size: "병력", tier: "등급", addR: "➕ 집결", more: "추가 설정", debUs: "그들이 우리에게 거는 디버프 (공격/방어 −%)", debThem: "우리가 거는 디버프 (−%)", p: "p (1.5 – 2)", reinf: "집결 사이 그들의 증원", pick: "— 선택 —",
    res: "결과", colR: "집결", colS: "강도", colOut: "결과", win: "✅ 점령 — 우리 {s} 남음", lose: "❌ 패배 — 그들 {g} 남음", need: "1번 같은 집결이 약 {n}번 필요해요.", last: "희생해도 되는 집결을 먼저, 가장 강한 대장을 마지막에 — 마지막 집결의 생존자가 건물을 지켜요.", one: "그들 병사 1명 ≈ 우리 {x}명 (r = {r}).",
    unc: "다른 주둔 병력과 p에서 1번 같은 집결이 몇 번 필요한지:", caveat: "대략적인 계산: 공격 쪽을 낮게 봐요 (B24: 모델 약 30만, 실제 58.7만). 계산에 없는 것: 영웅 스킬 처치, 병종 상성; 주둔군이 가장 강한 멤버의 능력치를 쓸 수도 있어요.", noR: "그들 주둔 대장과 우리 대장을 한 명 이상 고르세요.",
    bT: "📊 오늘의 강도", bNote: "강도 = 영주 장비 + 영웅 장비 + 마스터 전투력 (백만). 세 랭킹 모두 왕국 상위 100 안인 사람만 강도가 있어요. 나머지는 고를 수 없어요.", bData: "랭킹 날짜 {d} · 왕국 {k}", bNoData: "아직 MightPulse 랭킹이 없어요 (매일 20:45 UTC 저장).", bOurs: "NXS", bThem: "다른 연맹", bFind: "플레이어 찾기…", bMiss: "{b} 상위 100 밖", gear: "영주 장비", heq: "영웅 장비", mst: "마스터" },
};
const HT = {"en": {"hT": "📦 MightPulse history (for the battle analysis)", "hNote": "This tab already reads the newest day by itself (📊 above) — nothing to import. One encrypted snapshot a day (20:45 UTC): kingdom totals, all 18 boards (top 100), every NXS member and the Scout kingdoms' top players (base, ranks, heroes with gear). Pick dates and download — the file is for the analysis chat; don't post it anywhere public.", "hFrom": "From", "hTo": "To", "hDl": "⬇️ Download JSON", "hBusy": "Reading {d}…", "hNone": "No snapshots in these dates.", "hDone": "{n} days downloaded."}, "zh": {"hT": "📦 MightPulse 歷史資料（戰鬥分析用）", "hNote": "這個分頁會自己讀最新一天的資料（上面的 📊）——不用匯入。每天存一份加密快照（20:45 UTC）：王國總數、全部 18 個排行榜（前 100 名）、所有 NXS 成員，以及偵查王國的主力（基本資料、排名、英雄和裝備）。選日期下載——這個檔案是給分析用的聊天，不要貼到公開的地方。", "hFrom": "從", "hTo": "到", "hDl": "⬇️ 下載 JSON", "hBusy": "讀取 {d}…", "hNone": "這段日期沒有資料。", "hDone": "已下載 {n} 天。"}, "pt": {"hT": "📦 Histórico do MightPulse (para a análise de batalha)", "hNote": "Esta aba já lê o dia mais novo sozinha (📊 acima) — nada para importar. Um retrato criptografado por dia (20:45 UTC): totais do reino, os 18 rankings (top 100), todos os membros da NXS e os principais jogadores dos reinos do Scout (base, rankings, heróis com equipamento). Escolha as datas e baixe — o arquivo é para o chat de análise; não publique em lugar público.", "hFrom": "De", "hTo": "Até", "hDl": "⬇️ Baixar JSON", "hBusy": "Lendo {d}…", "hNone": "Sem dados nessas datas.", "hDone": "{n} dias baixados."}, "ar": {"hT": "📦 سجل MightPulse (لتحليل المعارك)", "hNote": "هذا القسم يقرأ أحدث يوم وحده (📊 أعلاه) — لا حاجة للاستيراد. لقطة مشفّرة كل يوم (20:45 UTC): إجماليات المملكة، كل اللوحات الـ18 (أفضل 100)، كل أعضاء NXS وأقوى لاعبي ممالك الاستطلاع (الأساس، الترتيب، الأبطال مع العتاد). اختر التواريخ ونزّل — الملف لمحادثة التحليل؛ لا تنشره في مكان عام.", "hFrom": "من", "hTo": "إلى", "hDl": "⬇️ تنزيل JSON", "hBusy": "قراءة {d}…", "hNone": "لا بيانات في هذه التواريخ.", "hDone": "نُزّلت {n} أيام."}, "ko": {"hT": "📦 MightPulse 기록 (전투 분석용)", "hNote": "이 탭은 최신 날짜를 알아서 읽어요 (위의 📊) — 가져올 필요 없어요. 매일 암호화된 스냅샷 하나 (20:45 UTC): 왕국 합계, 랭킹 18개 전부 (상위 100), NXS 연맹원 전원, 정찰 왕국의 주력 (기본, 랭킹, 영웅과 장비). 날짜를 골라 내려받으세요 — 분석 채팅용 파일이니 공개된 곳에 올리지 마세요.", "hFrom": "부터", "hTo": "까지", "hDl": "⬇️ JSON 내려받기", "hBusy": "{d} 읽는 중…", "hNone": "이 기간에는 데이터가 없어요.", "hDone": "{n}일치 내려받음."}};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const norm = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const fmtN = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "k" : String(Math.round(n));

let SNAP = null, snapDay = null, findQ = "";
const PDEF = { tgt: "", G: 1000000, gt: "TG2", terr: true, dUs: 0, dThem: 0, p: 1.75, re: 0, rallies: [{ lead: "", R: 1200000, tier: "TG2" }] };
let PLAN = (() => { try { const p = JSON.parse(localStorage.getItem("nxs-attack-v2")); return p && Array.isArray(p.rallies) ? p : null; } catch (e) { return null; } })() || JSON.parse(JSON.stringify(PDEF));
const keep = () => { try { localStorage.setItem("nxs-attack-v2", JSON.stringify(PLAN)); } catch (e) {} };

/* players on the newest snapshot's boards: gid → { name, al, kid, b: { board: score } } */
const B3 = ["gov_gear", "hero_equip", "master_power"];
let PL = {};
function buildPlayers() {
  PL = {}; if (!SNAP || !SNAP.boards) return;
  for (const [key, bd] of Object.entries(SNAP.boards)) { const [kid, board] = key.split(":");
    for (const r of bd.rows || []) { const id = String(r.governor_id); const p = PL[id] = PL[id] || { id, name: r.nick_name, al: r.alliance_abbr || "", kid: +kid, b: {} }; p.b[board] = r.score; } }
}
const sOf = (p) => p && B3.every((b) => p.b[b] != null) ? B3.reduce((s, b) => s + p.b[b] / 1e6, 0) : null;
const ours = (p) => /^nxs$/i.test(p.al || "");
const nameOf = (id) => { const p = PL[id]; return p ? p.name : ""; };
const strong = (side) => Object.values(PL).filter((p) => sOf(p) && (side ? ours(p) : !ours(p))).sort((a, b) => sOf(b) - sOf(a));

/* ---------- math ---------- */
function ratio(lead, tier) {
  const su = sOf(PL[lead]), st = sOf(PL[PLAN.tgt]); if (!su || !st) return null;
  return Math.pow(su / st, B) * (TIER[tier] / TIER[PLAN.gt]) ** 2 * (1 - PLAN.dUs / 100) ** 2 / ((PLAN.terr ? 1.06 : 1) * (1 - PLAN.dThem / 100) ** 2);
}
function chain() {
  let G = +PLAN.G || 0; const out = [];
  for (const [i, r] of PLAN.rallies.entries()) {
    const k = ratio(r.lead, r.tier); if (!k) continue; const R = +r.R || 0, P = PLAN.p;
    if (k * R ** P > G ** P) { out.push({ i, k, win: true, left: Math.pow(R ** P - G ** P / k, 1 / P) }); break; }
    G = Math.pow(G ** P - k * R ** P, 1 / P); out.push({ i, k, win: false, left: G }); G += +PLAN.re || 0;
  }
  return out;
}
function needN(G, P) { const r0 = PLAN.rallies[0], k = r0 && ratio(r0.lead, r0.tier); return k ? G ** P / (k * (+r0.R) ** P) : null; }

/* ---------- render ---------- */
const sel = (attr, v, list) => `<select class="inp" ${attr}><option value="">${esc(t("pick"))}</option>${list.map((p) => `<option value="${esc(p.id)}"${v === p.id ? " selected" : ""}>${esc(p.name)}${p.al && !ours(p) ? ` [${esc(p.al)}]` : ""} · ${sOf(p).toFixed(1)}</option>`).join("")}</select>`;
const tierSel = (attr, v) => `<select class="inp" ${attr}>${Object.keys(TIER).map((k) => `<option${k === v ? " selected" : ""}>${k}</option>`).join("")}</select>`;
function planCard() {
  const them = strong(false), us = strong(true), c = chain();
  const rallies = PLAN.rallies.map((r, i) => `<div class="ak-r"><b>#${i + 1}</b> ${sel(`data-rl="${i}"`, r.lead, us)}
    <div class="ak-rr"><input class="inp" type="number" data-rr="${i}" value="${r.R}" step="10000" aria-label="${esc(t("size"))}">${tierSel(`data-rt="${i}"`, r.tier)}${PLAN.rallies.length > 1 ? `<button class="btn small" data-rx="${i}">✕</button>` : ""}</div></div>`).join("");
  let res = "";
  if (!c.length) res = `<div class="muted">${esc(t("noR"))}</div>`;
  else { const n = needN(+PLAN.G, PLAN.p);
    res = `<div style="font-size:13.5px;margin:6px 0">${esc(fill(t("one"), { x: (1 / c[0].k).toFixed(2), r: c[0].k.toFixed(2) }))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>${esc(t("colR"))}</th><th>${esc(t("lead"))}</th><th>r</th><th>${esc(t("colOut"))}</th></tr></thead><tbody>
      ${c.map((o) => `<tr class="${o.win ? "ok" : ""}"><td>#${o.i + 1}</td><td dir="auto">${esc(nameOf(PLAN.rallies[o.i].lead))}</td><td>${o.k.toFixed(2)}</td><td>${esc(o.win ? fill(t("win"), { s: fmtN(o.left) }) : fill(t("lose"), { g: fmtN(o.left) }))}</td></tr>`).join("")}</tbody></table></div>
      ${n ? `<div style="margin-top:6px"><b>${esc(fill(t("need"), { n: n <= 1 ? "1" : n.toFixed(1) }))}</b></div>` : ""}
      <div class="muted" style="font-size:12.5px;margin-top:4px">💡 ${esc(t("last"))}</div>
      <div style="margin-top:10px;font-size:13px">${esc(t("unc"))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>G \\ p</th>${[1.5, 1.75, 2].map((p) => `<th>${p}</th>`).join("")}</tr></thead><tbody>
      ${[1.0e6, 1.3e6, 1.6e6].map((G) => `<tr><td>${fmtN(G)}</td>${[1.5, 1.75, 2].map((p) => { const x = needN(G, p); return `<td>${x ? (x <= 1 ? "1" : x.toFixed(1)) : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`; }
  return `<h3 style="margin:0 0 6px">${esc(t("aT"))}</h3>
    <div class="ak-box"><b>${esc(t("tgt"))}</b>
      <div class="ak-f"><span>${esc(t("tLead"))}</span>${sel('id="ak_tgt"', PLAN.tgt, them)}</div>
      <div class="ak-f"><span>${esc(t("tG"))}</span><input class="inp" type="number" id="ak_G" value="${PLAN.G}" step="50000"></div>
      <div class="ak-f"><span>${esc(t("tTier"))}</span>${tierSel('id="ak_gt"', PLAN.gt)}</div>
      <label class="row" style="gap:6px;font-size:13px;margin-top:4px"><input type="checkbox" id="ak_terr"${PLAN.terr ? " checked" : ""}> ${esc(t("terr"))}</label></div>
    <div class="ak-box"><b>${esc(t("us"))}</b> <span class="muted" style="font-size:12px">${esc(t("lead"))} · ${esc(t("size"))} · ${esc(t("tier"))}</span>${rallies}<button class="btn small" id="ak_addR">${esc(t("addR"))}</button></div>
    <details class="ak-more"><summary>${esc(t("more"))}</summary>
      <div class="ak-f"><span>${esc(t("debUs"))}</span><input class="inp" type="number" id="ak_dUs" value="${PLAN.dUs}"></div>
      <div class="ak-f"><span>${esc(t("debThem"))}</span><input class="inp" type="number" id="ak_dThem" value="${PLAN.dThem}"></div>
      <div class="ak-f"><span>${esc(t("p"))}</span><input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5"></div>
      <div class="ak-f"><span>${esc(t("reinf"))}</span><input class="inp" type="number" id="ak_re" value="${PLAN.re}" step="10000"></div></details>
    <h4 style="margin:12px 0 4px">${esc(t("res"))}</h4>${res}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("caveat"))}</div>`;
}
function boardsCard() {
  if (!SNAP) return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted">${esc(t("bNoData"))}</div>`;
  const kids = [...new Set(Object.keys(SNAP.boards).map((k) => k.split(":")[0]))].join(", ");
  const row = (p) => `<tr><td dir="auto">${esc(p.name)}${!ours(p) && p.al ? ` <span class="muted">[${esc(p.al)}]</span>` : ""}</td><td><b>${sOf(p).toFixed(1)}</b></td><td>${(p.b.gov_gear / 1e6).toFixed(1)}</td><td>${(p.b.hero_equip / 1e6).toFixed(1)}</td><td>${(p.b.master_power / 1e6).toFixed(1)}</td></tr>`;
  const head = `<thead><tr><th></th><th>${esc(t("colS"))}</th><th>${esc(t("gear"))}</th><th>${esc(t("heq"))}</th><th>${esc(t("mst"))}</th></tr></thead>`;
  const q = norm(findQ), hits = q.length >= 2 ? Object.values(PL).filter((p) => norm(p.name).includes(q)).slice(0, 8) : [];
  const lbl = { gov_gear: t("gear"), hero_equip: t("heq"), master_power: t("mst") };
  return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted" style="font-size:12.5px">${esc(t("bNote"))}</div>
    <div class="muted" style="font-size:12.5px;margin:4px 0 8px">${esc(fill(t("bData"), { d: snapDay, k: kids }))}</div>
    <input class="inp" id="ak_find" placeholder="${esc(t("bFind"))}" value="${esc(findQ)}" style="max-width:260px">
    <div id="ak_hits">${hits.map((p) => sOf(p) ? `<div class="ak-hit">${esc(p.name)} <span class="muted">[${esc(p.al)}]</span> · ${esc(t("colS"))} <b>${sOf(p).toFixed(1)}</b></div>`
      : `<div class="ak-hit">${esc(p.name)} <span class="muted">[${esc(p.al)}] · ${esc(fill(t("bMiss"), { b: B3.filter((b) => p.b[b] == null).map((b) => lbl[b]).join(", ") }))}</span></div>`).join("")}</div>
    <div class="ak-cols"><div><h4>${esc(t("bOurs"))}</h4><div class="ak-tw"><table class="ak-t">${head}<tbody>${strong(true).slice(0, 15).map(row).join("")}</tbody></table></div></div>
      <div><h4>${esc(t("bThem"))}</h4><div class="ak-tw"><table class="ak-t">${head}<tbody>${strong(false).slice(0, 15).map(row).join("")}</tbody></table></div></div></div>`;
}
function render() {
  const root = $("ak_root"); if (!root) return;
  root.innerHTML = `<div class="card" id="ak_plan">${planCard()}</div><div class="card" id="ak_board">${boardsCard()}</div><div class="card" id="ak_hist"></div>`;
  bind(); histCard();
}
function bind() {
  const re = () => { keep(); render(); };
  const on = (id, f) => { const e = $(id); if (e) e.onchange = f; };
  on("ak_tgt", (e) => { PLAN.tgt = e.target.value; re(); }); on("ak_G", (e) => { PLAN.G = Math.max(0, +e.target.value || 0); re(); });
  on("ak_gt", (e) => { PLAN.gt = e.target.value; re(); }); on("ak_terr", (e) => { PLAN.terr = e.target.checked; re(); });
  on("ak_dUs", (e) => { PLAN.dUs = Math.min(90, Math.max(0, +e.target.value || 0)); re(); }); on("ak_dThem", (e) => { PLAN.dThem = Math.min(90, Math.max(0, +e.target.value || 0)); re(); });
  on("ak_p", (e) => { PLAN.p = Math.min(2.5, Math.max(1.2, +e.target.value || 1.75)); re(); }); on("ak_re", (e) => { PLAN.re = Math.max(0, +e.target.value || 0); re(); });
  document.querySelectorAll("[data-rl]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rl].lead = s.value; re(); });
  document.querySelectorAll("[data-rr]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rr].R = Math.max(0, +s.value || 0); re(); });
  document.querySelectorAll("[data-rt]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rt].tier = s.value; re(); });
  document.querySelectorAll("[data-rx]").forEach((b) => b.onclick = () => { PLAN.rallies.splice(+b.dataset.rx, 1); re(); });
  if ($("ak_addR")) $("ak_addR").onclick = () => { const l = PLAN.rallies[PLAN.rallies.length - 1] || {}; PLAN.rallies.push({ lead: "", R: l.R || 1200000, tier: l.tier || "TG2" }); re(); };
  const f = $("ak_find"); if (f) f.oninput = () => { findQ = f.value; const pos = f.selectionStart; $("ak_board").innerHTML = boardsCard(); bind(); histCard(); const g = $("ak_find"); g.focus(); try { g.setSelectionRange(pos, pos); } catch (e) {} };
}
async function loadSnap() {
  for (let i = 0; i < 8; i++) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x && x.boards) { SNAP = x; snapDay = d; break; } } catch (e) {} }
  buildPlayers();
}
/* 📦 MightPulse history: one encrypted file per day (data/mp-history/YYYY-MM-DD-x7k2p9.json, written by scripts/mp-history.js);
   the card decrypts the chosen days in the browser and downloads them as one JSON for the analysis chat */
function histCard() {
  const el = $("ak_hist"); if (!el) return;
  const h = (k) => (HT[lang] || HT.en)[k] || HT.en[k], day = (d) => d.toISOString().slice(0, 10), today = new Date();
  el.innerHTML = `<h3 style="margin:0 0 4px">${h("hT")}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${h("hNote")}</div>
    <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">${h("hFrom")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="ak_hf" value="${day(new Date(today - 6 * 864e5))}">
    ${h("hTo")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="ak_ht" value="${day(today)}"> <button type="button" class="btn" id="ak_hdl">${h("hDl")}</button> <span class="muted" id="ak_hmsg" style="font-size:12.5px"></span></div>`;
  $("ak_hdl").onclick = async () => {
    const a = new Date($("ak_hf").value + "T00:00:00Z"), b = new Date($("ak_ht").value + "T00:00:00Z"), out = {}, m = $("ak_hmsg");
    if (isNaN(a) || isNaN(b) || b < a || b - a > 120 * 864e5) return;
    for (let t = +a; t <= +b; t += 864e5) { const d = day(new Date(t)); m.textContent = h("hBusy").replace("{d}", d);
      try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x) out[d] = x; } catch (e) {} }
    const n = Object.keys(out).length; if (!n) { m.textContent = h("hNone"); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: "application/json" })), l = document.createElement("a");
    l.href = url; l.download = `mightpulse-history-${$("ak_hf").value}_${$("ak_ht").value}.json`; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
    m.textContent = h("hDone").replace("{n}", n); };
}
function applyTexts() { if ($("ak_title")) { $("ak_title").textContent = t("title"); $("ak_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("ak_root").innerHTML = `<div class="card muted">🔒</div>`; return; }
  await loadSnap(); render();
}
function setLang(l) { lang = l; applyTexts(); if ($("ak_root") && $("ak_root").innerHTML) render(); }
OFFICER_PAGES.attack = { init, applyTexts, setLang, onShow: () => { if (SNAP) render(); } };
})();
