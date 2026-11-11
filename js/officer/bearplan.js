/* NXS officer page — 🐻 Bear plan (registers OFFICER_PAGES.bearplan; own tab, nobody by default, admins always).
   A discussion draft for Armada (Sherry, 2026-11-01; spec: Project doc claude/bear-optimizer-spec.md, first version = the
   "BT2 Rally Plan" artifact): one Bear wave now vs. fewer, stronger rallies that fill in a fixed order (strong → weak, ~14 marches
   each, only the last rally takes the turnout swings). Nothing here is decided.
   The leaders' names, K and types are member data → kept ONLY in the encrypted file data/bearplan-x7k2p9.json
   ({ v, title, date, cap, gap, gain, turnout, now: [[name, type, openSec, fill]], order: [[name, type]], rows: [[name, type, K, marchesNow]], src, by, at }).
   An admin pastes that JSON once (📥 Update data) — it is sealed in the browser with the officer data key and saved through GitHub. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const PATH = "data/bearplan-x7k2p9.json";
const RPATH = "data/bearreview-x7k2p9.json";   // 🐻 latest hunt review (Sherry 2026-11-05): leader strength K side by side + where a march scores most; names → encrypted file only
/* review file: { review: 1, date, stats: [{ v, k: {en, zh}, s: {en, zh} }], rows: [[name, tier, "atk / leth", buffKey, K, KwithBuffs, label?]],
   kfoot: {en, zh}, place: {en: [[where, value, note]], zh: [...]}, notes: {en: [], zh: []}, unknowns: {en: [], zh: []}, foot: {en, zh} } */
const RT = { en: { h: "📋 Latest hunt review · {d}", kh: "Leader strength, side by side", kp: "K = (1 + archer attack)(1 + archer lethality) × City Bonus, from that hunt's rally bonus pages, scaled so the strongest regular leader = 1.00. Bear damage is mostly archers, so K tracks how much the same march scores in that leader's rally. The faint part of a bar = with both City Bonuses on.",
    tBuff: "with both City Bonuses", cols: ["Leader", "Type", "Archer atk / leth %", "City Bonus", "K", "With bonus"], buff: { both: "atk + leth", leth: "leth only", atk: "atk only", none: "none", both2: "atk + leth + title" },
    xh: "Where a march scores the most, as things run now", xp: "Your score from one march ≈ leader K × (your own archer and cavalry troops). Other people's troops in the rally don't change yours — so for each march the only question is which leader it lands with.", xcols: ["The same 100k march goes into…", "Score", ""],
    unh: "What we don't know yet", planH: "📐 Rally plan draft (earlier)",
    kpFit: "K from the rally mails: one model fitted on every march of that hunt (damage = rally K × the player's own factor × troops), first rally of the reference leader = 1.00. Two numbers = two waves. More reliable than the bonus-page K, which missed joiner skills and hero skills.", fcols: ["Leader", "Type", "Each wave", "K"],
    coefH: "Each player's troop factor", coefP: "The same march scores more for some players: what's left after taking out the leader's K and the troop mix — mostly troop tier (T10 / TG1–TG3). Reference player = 1.00. Few mails = less sure.", coefN: "{n} mails",
    grH: "Each player's total, hunt by hunt", grP: "Final leaderboard (M). Arrow = change from the hunt before.", data: "Data: {n} hunts · updated {d}" },
  zh: { h: "📋 最近一次熊獵復盤 · {d}", kh: "隊長強度對照", kp: "K = (1 + 弓兵攻擊力)(1 + 弓兵殺傷力) × 城鎮增益，取自那次的集結加成頁，以最強的常駐隊長 = 1.00。熊獵傷害幾乎都是弓兵，所以 K 就代表同一支部隊在這位隊長的團裡能拿幾分。長條淡色的部分＝兩個城鎮增益都開時的值。",
    tBuff: "兩個城鎮增益都開", cols: ["隊長", "類型", "弓兵 攻／殺 %", "城鎮增益", "K", "開增益後"], buff: { both: "攻＋殺", leth: "只有殺", atk: "只有攻", none: "沒有", both2: "攻＋殺＋官職" },
    xh: "照現在的方式，部隊放哪裡分數最高", xp: "一支部隊的分數 ≈ 隊長 K ×（你自己的弓兵、騎兵）。團裡其他人帶了什麼不影響你的分數——所以每一支部隊要看的只有：它進了誰的團。", xcols: ["同一支 10 萬的部隊放進…", "分數", ""],
    unh: "還不知道的", planH: "📐 排團草稿（之前的）",
    kpFit: "K 取自集結信件：用那次熊獵每一支部隊一起擬合（傷害 = 團 K × 個人係數 × 兵種），以參考隊長第一團 = 1.00。兩個數字 = 兩波。比加成頁算的 K 準——加成頁漏了加入者技能和英雄技能。", fcols: ["隊長", "類型", "每一波", "K"],
    coefH: "每人兵等係數", coefP: "同一支部隊，有些人就是打得比較多：扣掉隊長 K 和兵種比例後剩下的差，主要是兵等（T10／TG1–TG3）。參考的人 = 1.00。信件少的比較不準。", coefN: "{n} 封",
    grH: "每人每場總傷害", grP: "最終排行（M）。箭頭 = 跟上一場比。", data: "資料：{n} 場 · 更新 {d}" },
  pt: { h: "📋 Última revisão da caçada · {d}", kh: "Força dos líderes, lado a lado", kp: "K = (1 + ataque da Arquearia)(1 + letalidade da Arquearia) × Bônus da Cidade, tirado das páginas de bônus do rally daquela caçada, com o líder fixo mais forte = 1.00. O dano no urso vem quase todo da Arquearia, então o K mostra quanto a mesma marcha pontua no rally desse líder. A parte clara da barra = com os dois Bônus da Cidade ativos.",
    tBuff: "com os dois Bônus da Cidade", cols: ["Líder", "Tipo", "Arquearia ataque / letal. %", "Bônus da Cidade", "K", "Com bônus"], buff: { both: "ataque + letal.", leth: "só letal.", atk: "só ataque", none: "nenhum", both2: "ataque + letal. + cargo" },
    xh: "Onde uma marcha pontua mais, do jeito atual", xp: "Sua pontuação de uma marcha ≈ K do líder × (sua própria Arquearia e Cavalaria). As tropas dos outros no rally não mudam a sua — então, para cada marcha, a única pergunta é: com qual líder ela entra.", xcols: ["A mesma marcha de 100 mil vai para…", "Pontos", ""],
    unh: "O que ainda não sabemos", planH: "📐 Rascunho do plano de rallies (anterior)",
    kpFit: "K dos relatórios de rally: um só modelo ajustado com todas as marchas daquela caçada (dano = K do rally × fator do próprio jogador × tropas), primeiro rally do líder de referência = 1.00. Dois números = duas ondas. Mais confiável que o K da página de bônus, que não contava as habilidades de participante nem as habilidades de herói.", fcols: ["Líder", "Tipo", "Cada onda", "K"],
    coefH: "Fator de tropa de cada jogador", coefP: "A mesma marcha pontua mais para alguns jogadores: é o que sobra depois de tirar o K do líder e a mistura de tropas — principalmente o nível da tropa (T10 / TG1–TG3). Jogador de referência = 1.00. Poucos relatórios = menos certeza.", coefN: "{n} relatórios",
    grH: "Total de cada jogador, caçada por caçada", grP: "Ranking final (M). Seta = mudança desde a caçada anterior.", data: "Dados: {n} caçadas · atualizado {d}" },
  ar: { h: "📋 آخر مراجعة للصيد · {d}", kh: "قوة القادة جنبًا إلى جنب", kp: "K = (1 + هجوم الرماة)(1 + قوة فتك الرماة) × مكافأة المدينة، من صفحات مكافآت الحشد في ذلك الصيد، وأقوى قائد دائم = 1.00. ضرر الدب يأتي غالبًا من الرماة، لذلك يبيّن K كم يسجّل الزحف نفسه في حشد هذا القائد. الجزء الفاتح من الشريط = مع تفعيل مكافأتَي المدينة.",
    tBuff: "مع مكافأتَي المدينة", cols: ["القائد", "النوع", "الرماة هجوم / فتك %", "مكافأة المدينة", "K", "مع المكافأة"], buff: { both: "هجوم + فتك", leth: "فتك فقط", atk: "هجوم فقط", none: "لا شيء", both2: "هجوم + فتك + منصب" },
    xh: "أين يسجّل الزحف أكثر، بالطريقة الحالية", xp: "نقاطك من زحف واحد ≈ K القائد × (رماتك وفرسانك أنت). قوات الآخرين في الحشد لا تغيّر نقاطك — لذلك السؤال الوحيد لكل زحف: مع أي قائد يدخل.", xcols: ["الزحف نفسه بـ 100 ألف يدخل إلى…", "النقاط", ""],
    unh: "ما لا نعرفه بعد", planH: "📐 مسودة خطة الحشود (سابقة)",
    kpFit: "K من رسائل الحشد: نموذج واحد مطابق على كل زحف في ذلك الصيد (الضرر = K الحشد × عامل اللاعب نفسه × القوات)، وأول حشد للقائد المرجعي = 1.00. رقمان = موجتان. أدق من K صفحة المكافآت، التي لم تحسب مهارات المنضمّين ومهارات الأبطال.", fcols: ["القائد", "النوع", "كل موجة", "K"],
    coefH: "عامل القوات لكل لاعب", coefP: "الزحف نفسه يسجّل أكثر عند بعض اللاعبين: هذا ما يبقى بعد إزالة K القائد وخليط القوات — غالبًا مستوى القوات (T10 / TG1–TG3). اللاعب المرجعي = 1.00. رسائل قليلة = دقة أقل.", coefN: "{n} رسائل",
    grH: "مجموع كل لاعب، صيدًا بعد صيد", grP: "الترتيب النهائي (M). السهم = التغيّر عن الصيد السابق.", data: "البيانات: {n} مرات صيد · تحديث {d}" },
  ko: { h: "📋 최근 사냥 리뷰 · {d}", kh: "대장 강도 비교", kp: "K = (1 + 궁병 공격력)(1 + 궁병 파괴력) × 도시 버프. 그 사냥의 집결 버프 화면에서 가져왔고, 가장 강한 고정 대장 = 1.00. 곰 피해는 대부분 궁병이라서, K는 같은 부대가 그 대장의 집결에서 얼마나 점수를 내는지 보여줍니다. 막대의 연한 부분 = 도시 버프 2개를 모두 켰을 때.",
    tBuff: "도시 버프 2개 모두 켬", cols: ["대장", "유형", "궁병 공격 / 파괴 %", "도시 버프", "K", "버프 후"], buff: { both: "공격 + 파괴", leth: "파괴만", atk: "공격만", none: "없음", both2: "공격 + 파괴 + 관직" },
    xh: "지금 방식에서 부대를 어디에 넣으면 점수가 가장 높은가", xp: "부대 1개의 점수 ≈ 대장 K × (내 궁병과 기병). 집결 안의 다른 사람 부대는 내 점수를 바꾸지 않습니다 — 그래서 각 부대는 어느 대장의 집결에 들어가는지만 보면 됩니다.", xcols: ["같은 10만 부대를 넣으면…", "점수", ""],
    unh: "아직 모르는 것", planH: "📐 집결 계획 초안 (이전)",
    kpFit: "K는 집결 메일에서 계산: 그 사냥의 모든 부대를 하나의 모델로 맞췄습니다 (피해 = 집결 K × 개인 계수 × 병력). 기준 대장의 첫 집결 = 1.00. 숫자 2개 = 2웨이브. 버프 화면 K보다 정확합니다 — 버프 화면은 참여자 스킬과 영웅 스킬을 빠뜨렸습니다.", fcols: ["대장", "유형", "웨이브별", "K"],
    coefH: "개인별 병력 계수", coefP: "같은 부대라도 점수를 더 내는 사람이 있습니다: 대장 K와 병종 비율을 빼고 남은 차이 — 주로 병력 티어 (T10 / TG1–TG3). 기준 플레이어 = 1.00. 메일이 적으면 덜 정확합니다.", coefN: "메일 {n}통",
    grH: "사냥별 개인 총점", grP: "최종 랭킹 (M). 화살표 = 이전 사냥과 비교.", data: "데이터: 사냥 {n}회 · 업데이트 {d}" } };
const rt = (k) => (RT[lang] || RT.en)[k] ?? RT.en[k];
const LL = (o) => o ? (o[lang] ?? o.en ?? o.zh ?? "") : "";
let RV = null;
/* 🐻 measured analysis (Sherry 2026-11-07: "the whole Bear plan should be a measured analysis — merge things, don't pile them up;
   correct old ideas instead of keeping them"). File shape: { review: 1, analysis: 1, date, data: {txt}, stats: [...],
   leaders: [{ title, note, rows: [[name, K, mailK, city, flag]] }], place: { text: [..], rows: [[where, value, note]] },
   coef: [[name, v]], coefNote, growth: [{ title, dates, rows }], detail: { cols, rows, num } (folded), unknowns } — all text {en, zh}. */
const AT = { en: { obsH: "🔎 What we saw", sugH: "💡 Suggestions", lh: "👑 Leaders", lp: "K = leader strength: archer Attack × Lethality with City Bonus and rally Exclusive Gear in the same slot (bonus page), ASHISH 11/06 = 1.00. Mails = what the rally mails measured.", lc: ["Leader", "K", "Mails", "City Atk / Leth"], role: { A: "A", B: "B", fill: "fill-in" }, rosterH: "📋 Official leader list", rosterP: "A team opens at 0:00, B team at +0:45; everyone else only with 6:30 left (fill-in rallies).", rcols: ["Trap", "A team (0:00)", "B team (+0:45)"],
    ph: "🚩 Where marches score most", ch: "🎯 Each player", cp: "Troop factor = troop tier × (1 + Valora's Hunter Instinct); reference player = 1.00.", gh: "📈 Totals, hunt by hunt", det: "📋 Full leader table (every input)", nx: "📸 Next hunt, please capture" },
  zh: { obsH: "🔎 我們觀察到", sugH: "💡 建議", lh: "👑 隊長", lp: "K = 隊長強度：加成頁的弓兵攻擊力 × 殺傷力，城鎮增益和集結專屬加在同一格，ASHISH 11/06 = 1.00。信件 = 集結信件實測。", lc: ["隊長", "K", "信件", "城鎮 攻／殺"], role: { A: "A", B: "B", fill: "補位" }, rosterH: "📋 正式隊長名單", rosterP: "A 隊 0:00 開、B 隊 +0:45 開；其他人剩 6:30 才能開（補位團）。", rcols: ["陷阱", "A 隊（0:00）", "B 隊（+0:45）"],
    ph: "🚩 部隊放哪裡最好", ch: "🎯 每個人", cp: "兵等係數 = 兵等 ×（1 + 維拉「狩獵本能」）；參考的人 = 1.00。", gh: "📈 每場總傷害", det: "📋 完整隊長表（所有數字）", nx: "📸 下次熊獵請拍" },
  pt: { obsH: "🔎 O que observamos", sugH: "💡 Sugestões", lh: "👑 Líderes", lp: "K = força do líder: Ataque × Letalidade da Arquearia, com Bônus da Cidade e Equipamento Exclusivo de rally na mesma conta (página de bônus), ASHISH 11/06 = 1.00. Relatórios = o que os relatórios do rally mediram.", lc: ["Líder", "K", "Relatórios", "Cidade Atq / Let"], role: { A: "A", B: "B", fill: "extra" }, rosterH: "📋 Lista oficial de líderes", rosterP: "O time A abre em 0:00, o time B em +0:45; os outros só com 6:30 restantes (rallies extras).", rcols: ["Armadilha", "Time A (0:00)", "Time B (+0:45)"],
    ph: "🚩 Onde as marchas pontuam mais", ch: "🎯 Cada jogador", cp: "Fator de tropa = nível da tropa × (1 + Instinto de Caçador da Valora); jogador de referência = 1.00.", gh: "📈 Totais, caçada por caçada", det: "📋 Tabela completa dos líderes (todos os dados)", nx: "📸 Na próxima caçada, por favor capture" },
  ar: { obsH: "🔎 ما لاحظناه", sugH: "💡 اقتراحات", lh: "👑 القادة", lp: "K = قوة القائد: هجوم × قوة فتك الرماة، مع مكافأة المدينة والعتاد الحصري للحشد في نفس الخانة (صفحة المكافآت)، ASHISH 11/06 = 1.00. الرسائل = ما قاسته رسائل الحشد.", lc: ["القائد", "K", "الرسائل", "المدينة هجوم / فتك"], role: { A: "A", B: "B", fill: "إضافي" }, rosterH: "📋 قائمة القادة الرسمية", rosterP: "الفريق A يفتح عند 0:00، والفريق B عند +0:45؛ الباقون فقط عندما يتبقى 6:30 (حشود إضافية).", rcols: ["الفخ", "الفريق A (0:00)", "الفريق B (+0:45)"],
    ph: "🚩 أين تسجّل الزحوف أكثر", ch: "🎯 كل لاعب", cp: "عامل القوات = مستوى القوات × (1 + غريزة الصياد لدى فالورا)؛ اللاعب المرجعي = 1.00.", gh: "📈 المجموع، صيدًا بعد صيد", det: "📋 جدول القادة الكامل (كل المدخلات)", nx: "📸 في الصيد القادم، صوّروا من فضلكم" },
  ko: { obsH: "🔎 우리가 관찰한 것", sugH: "💡 제안", lh: "👑 대장", lp: "K = 대장 강도: 버프 화면의 궁병 공격력 × 파괴력, 도시 버프와 집결 전용 장비를 같은 칸에 합산, ASHISH 11/06 = 1.00. 메일 = 집결 메일 실측값.", lc: ["대장", "K", "메일", "도시 공격 / 파괴"], role: { A: "A", B: "B", fill: "보충" }, rosterH: "📋 공식 대장 명단", rosterP: "A팀은 0:00, B팀은 +0:45에 엽니다. 나머지는 6:30 남았을 때만 열 수 있습니다 (보충 집결).", rcols: ["함정", "A팀 (0:00)", "B팀 (+0:45)"],
    ph: "🚩 부대를 어디에 넣으면 좋은가", ch: "🎯 개인별", cp: "병력 계수 = 병력 티어 × (1 + 베라 「사냥 본능」); 기준 플레이어 = 1.00.", gh: "📈 사냥별 총점", det: "📋 전체 대장 표 (모든 수치)", nx: "📸 다음 사냥 때 찍어 주세요" } };
const at = (k) => (AT[lang] || AT.en)[k] ?? AT.en[k];
function analysisHtml() {
  const r = RV, num = (v) => (v == null ? "—" : (+v).toFixed(0));
  const kmax = Math.max(1.2, ...(r.leaders || []).flatMap((g) => g.rows.map((x) => +String(x[1]).replace(/[^\d.]/g, "") || 0)));
  const leaders = (r.leaders || []).map((g) => `<h4 style="margin:12px 0 6px">${esc(LL(g.title))}</h4>
    <div class="bp-tw"><table class="bp-t" style="min-width:0"><thead><tr>${at("lc").map((c, i) => `<th${i === 1 || i === 2 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}<th></th></tr></thead>
      <tbody>${g.rows.map((x) => `<tr><td><bdi>${esc(x[0])}</bdi>${x[5] ? ` <span class="bp-pill ${x[5] === "fill" ? "weak" : x[5] === "B" ? "second" : "main"}" style="font-size:11px;padding:0 6px">${esc(at("role")[x[5]] || x[5])}</span>` : ""}</td><td class="n"><b>${esc(String(x[1]))}</b></td><td class="n">${esc(x[2] || "—")}</td><td style="white-space:nowrap" class="muted">${esc(LL(x[3]) || x[3] || "")}</td>
        <td style="width:22%;min-width:50px"><span class="bp-kt" style="display:block"><i class="bp-kf" style="width:${(Math.min(1, (+String(x[1]).replace(/[^\d.]/g, "") || 0) / kmax) * 100).toFixed(1)}%;background:var(--bp-main)"></i></span></td></tr>`).join("")}</tbody></table></div>
    ${LL(g.note) ? `<p class="muted bp-p" style="font-size:12.5px;margin-top:6px">${esc(LL(g.note))}</p>` : ""}`).join("");
  const pl = r.place || {};
  const cm = Math.max(...(r.coef || [[0, 1]]).map((x) => +x[1]));
  const growthT = (g) => `<div class="bp-tw" style="margin-top:6px"><table class="bp-t" style="min-width:0"><thead><tr><th></th>${g.dates.map((d) => `<th class="n">${esc(d)}</th>`).join("")}</tr></thead>
      <tbody>${g.rows.map((x) => `<tr><td><bdi>${esc(x[0])}</bdi></td>${x.slice(1).map((v, i) => { const p = i ? x.slice(1, i + 1).reverse().find((y) => y != null) : null; return `<td class="n">${num(v)}${v != null && p != null ? ` <small class="${+v >= +p ? "bp-up" : "bp-no"}">${+v >= +p ? "▲" : "▼"}</small>` : ""}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
  const B = {   // the blocks a report can show (data stays in the same top-level keys of the file)
    leaders: () => `<div class="card"><h3>${esc(at("lh"))}</h3><p class="bp-p">${esc(LL(r.kp) || at("lp"))}</p>${leaders}</div>`,
    roster: () => (r.roster || []).length ? `<div class="card"><h3>${esc(at("rosterH"))}</h3><p class="bp-p">${esc(at("rosterP"))}</p><div class="bp-tw"><table class="bp-t" style="min-width:0"><thead><tr>${at("rcols").map((c, i) => `<th${i ? "" : ' style="white-space:nowrap"'}>${esc(c)}</th>`).join("")}</tr></thead><tbody>${r.roster.map((x) => `<tr><td style="white-space:nowrap"><b>${esc(LL(x[0]) || x[0])}</b></td><td>${esc(x[1])}</td><td>${esc(x[2])}</td></tr>`).join("")}</tbody></table></div>${LL(r.rosterNote) ? `<p class="muted bp-p" style="font-size:12.5px;margin-top:6px">${esc(LL(r.rosterNote))}</p>` : ""}</div>` : "",
    place: () => (LL(pl.rows) || []).length ? `<div class="card"><h3>${esc(LL(pl.title) || at("ph"))}</h3><div class="bp-tw"><table class="bp-t" style="min-width:0"><tbody>${LL(pl.rows).map((x) => `<tr><td>${esc(x[0])}</td><td class="n"><b>${esc(x[1])}</b></td><td class="muted">${esc(x[2] || "")}</td></tr>`).join("")}</tbody></table></div></div>` : "",
    coef: () => (r.coef || []).length ? `<div class="card"><h3>${esc(at("ch"))}</h3><p class="bp-p">${esc(LL(r.coefNote) || at("cp"))}</p><div class="bp-kb">${r.coef.map((x) => `<div class="bp-kr"><span class="bp-kn"><bdi>${esc(x[0])}</bdi></span><span class="bp-kt"><i class="bp-kf" style="width:${(+x[1] / cm * 100).toFixed(1)}%;background:var(--bp-second)"></i></span><b>${(+x[1]).toFixed(2)}</b></div>`).join("")}</div></div>` : "",
    growth: () => [].concat(r.growth || []).filter((g) => (g.rows || []).length).map((g) => `<div class="card"><h3>${esc(at("gh"))} · ${esc(LL(g.title))}</h3>${growthT(g)}</div>`).join(""),
    detail: () => r.detail ? `<details class="card"><summary><b>${esc(at("det"))}</b></summary><div class="bp-tw" style="margin-top:8px"><table class="bp-t" style="min-width:1100px;white-space:nowrap"><thead><tr>${LL(r.detail.cols).map((c, i) => `<th${(r.detail.num || []).includes(i) ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${r.detail.rows.map((x) => `<tr>${x.map((v, i) => `<td${(r.detail.num || []).includes(i) ? ' class="n"' : ""}>${i === 0 ? `<bdi>${esc(v)}</bdi>` : esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    ${LL(r.foot) ? `<div class="muted" style="font-size:12px;margin-top:8px">${esc(LL(r.foot))}</div>` : ""}</details>` : "",
  };
  const data = r.data ? `<div class="muted" style="font-size:12.5px;margin:2px 0 8px">${esc(LL(r.data.txt))}</div>` : "";
  if (Array.isArray(r.reports) && r.reports.length) {   // 🐻 one Bear page, several short reports: 🔎 what we saw → 💡 suggestions → the numbers behind it (Sherry 2026-11-11)
    const cur = ((location.hash || "").match(/[?&]r=(\w+)/) || [])[1], rep = r.reports.find((x) => x.id === cur) || r.reports[0];
    const li = (arr) => (arr || []).map((x) => `<li>${esc(x)}</li>`).join("");
    return `${OFFICER.bearChips(rep.id, lang)}${data}
  <div class="card rs-do"><h3>${esc(at("obsH"))}</h3><ul class="rs-dol">${li(LL(rep.obs))}</ul>${(LL(rep.sug) || []).length ? `<h3 class="rs-h2">${esc(at("sugH"))}</h3><ul class="rs-dol">${li(LL(rep.sug))}</ul>` : ""}</div>
  ${(rep.show || []).map((k) => (B[k] ? B[k]() : "")).join("\n  ")}`;
  }
  return `${OFFICER.bearChips("leaders", lang)}<div class="card bp-rv">${r.data ? `<div class="muted" style="font-size:12.5px">${esc(LL(r.data.txt))}</div>` : ""}
    ${r.stats ? `<div class="bp-stats" style="margin:6px 0 4px">${r.stats.map((x) => `<div class="bp-stat"><span class="k">${esc(LL(x.k))}</span><span class="v">${esc(x.v)}</span><span class="s">${esc(LL(x.s))}</span></div>`).join("")}</div>` : ""}</div>
  <div class="card rs-do"><h3>${esc(at("ph"))}</h3>${(LL(pl.text) || []).length ? `<ul class="rs-dol">${LL(pl.text).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>
  ${B.place()}${B.leaders()}${B.roster()}${B.coef()}${B.growth()}${B.detail()}`;
}
function reviewHtml() {
  const r = RV; if (!r) return "";
  const max = Math.max(1.2, ...r.rows.map((x) => +x[5] || +x[4] || 0)), pc = (v) => (v / max * 100).toFixed(1) + "%";
  const fit = !!r.kfit, tn = (k) => LL((r.tierNames || {})[k]) || tier(k);
  return `<div class="card bp-rv"><h3>${esc(fill(rt("h"), { d: r.date || "" }))}</h3>${r.data ? `<div class="muted" style="font-size:12.5px">${esc(LL(r.data.txt) || fill(rt("data"), r.data))}</div>` : ""}
    ${r.stats ? `<div class="bp-stats" style="margin:6px 0 4px">${r.stats.map((x) => `<div class="bp-stat"><span class="k">${esc(LL(x.k))}</span><span class="v">${esc(x.v)}</span><span class="s">${esc(LL(x.s))}</span></div>`).join("")}</div>` : ""}</div>
  <div class="card"><h3>${esc(rt("kh"))}</h3><p class="bp-p">${esc(LL(r.kp) || rt(fit ? "kpFit" : "kp"))}</p>
    <div class="bp-legend">${(r.tierNames ? Object.keys(r.tierNames) : ["main", "second", "weak"]).map((k) => `<span><i class="bp-sw" style="background:var(--bp-${k})"></i>${esc(tn(k))}</span>`).join("")}${fit || r.ktable ? "" : `<span><i class="bp-sw" style="background:var(--bp-idle);border:1px solid var(--rule)"></i>${esc(rt("tBuff"))}</span>`}</div>
    <div class="bp-kb">${r.rows.map((x) => `<div class="bp-kr"><span class="bp-kn"><bdi>${esc(x[0])}</bdi></span><span class="bp-kt">${+x[5] > +x[4] ? `<i class="bp-kg" style="width:${pc(+x[5])}"></i>` : ""}<i class="bp-kf" style="width:${pc(+x[4])};background:var(--bp-${esc(x[1])})"></i></span><b>${esc(x[6] || (+x[4]).toFixed(2))}${+x[5] > +x[4] ? ` → ${(+x[5]).toFixed(2)}` : ""}</b></div>`).join("")}</div>
    ${r.ktable ? `<div class="bp-tw" style="margin-top:10px"><table class="bp-t" style="min-width:${r.ktable.minw || 1100}px;white-space:nowrap"><thead><tr>${LL(r.ktable.cols).map((c, i) => `<th${(r.ktable.num || []).includes(i) ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${r.ktable.rows.map((x) => `<tr>${x.map((v, i) => `<td${(r.ktable.num || []).includes(i) ? ' class="n"' : ""}>${i === 0 ? `<bdi>${esc(LL(v) || v)}</bdi>` : (r.ktable.bold || []).includes(i) ? `<b>${esc(LL(v) || v)}</b>` : esc(typeof v === "object" ? LL(v) : v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : fit ? `<div class="bp-tw" style="margin-top:10px"><table class="bp-t" style="min-width:0"><thead><tr>${rt("fcols").map((c, i) => `<th${i > 1 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${r.rows.map((x) => `<tr><td><bdi>${esc(x[0])}</bdi></td><td><span class="bp-pill ${esc(x[1])}">${esc(tn(x[1]))}</span></td><td class="n">${esc(x[2] || "")}</td><td class="n"><b>${esc(x[6] || (+x[4]).toFixed(2))}</b></td></tr>`).join("")}</tbody></table></div>` : `<div class="bp-tw" style="margin-top:10px"><table class="bp-t"><thead><tr>${rt("cols").map((c, i) => `<th${i > 3 || i === 2 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${r.rows.map((x) => `<tr><td><bdi>${esc(x[0])}</bdi></td><td><span class="bp-pill ${esc(x[1])}">${esc(tier(x[1]))}</span></td><td class="n">${esc(x[2])}</td><td${x[3] === "none" ? ' class="bp-no"' : ""}>${esc(rt("buff")[x[3]] || x[3])}</td><td class="n">${esc(x[6] || (+x[4]).toFixed(2))}</td><td class="n${+x[5] > +x[4] ? " bp-up" : ""}">${(+x[5]).toFixed(2)}</td></tr>`).join("")}</tbody></table></div>`}
    ${LL(r.kfoot) ? `<p class="muted bp-p" style="font-size:12.5px;margin-top:8px">${esc(LL(r.kfoot))}</p>` : ""}</div>
  ${(r.coef || []).length ? `<div class="card"><h3>${esc(rt("coefH"))}</h3><p class="bp-p">${esc(rt("coefP"))}</p>
    <div class="bp-kb">${(() => { const m = Math.max(...r.coef.map((x) => +x[1])); return r.coef.map((x) => `<div class="bp-kr"><span class="bp-kn"><bdi>${esc(x[0])}</bdi></span><span class="bp-kt"><i class="bp-kf" style="width:${(+x[1] / m * 100).toFixed(1)}%;background:var(--bp-main)"></i></span><b>${(+x[1]).toFixed(2)}${x[2] ? ` <small class="muted">${esc(fill(rt("coefN"), { n: x[2] }))}</small>` : ""}</b></div>`).join(""); })()}</div>
    ${LL(r.coefNote) ? `<p class="muted bp-p" style="font-size:12.5px;margin-top:8px">${esc(LL(r.coefNote))}</p>` : ""}</div>` : ""}
  ${[].concat(r.growth || []).filter((g) => (g.rows || []).length).map((g) => `<div class="card"><h3>${esc(rt("grH"))}${LL(g.title) ? " · " + esc(LL(g.title)) : ""}</h3><p class="bp-p">${esc(rt("grP"))}</p>
    <div class="bp-tw"><table class="bp-t" style="min-width:0"><thead><tr><th></th>${g.dates.map((d) => `<th class="n">${esc(d)}</th>`).join("")}</tr></thead>
      <tbody>${g.rows.map((x) => `<tr><td><bdi>${esc(x[0])}</bdi></td>${x.slice(1).map((v, i) => { const p = i ? x.slice(1, i + 1).reverse().find((y) => y != null) : null; return `<td class="n">${v == null ? "—" : (+v).toFixed(0)}${v != null && p != null ? ` <small class="${+v >= +p ? "bp-up" : "bp-no"}">${+v >= +p ? "▲" : "▼"}</small>` : ""}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div></div>`).join("")}
  ${LL(r.place) ? `<div class="card"><h3>${esc(rt("xh"))}</h3><p class="bp-p">${esc(rt("xp"))}</p>
    <div class="bp-tw"><table class="bp-t" style="min-width:0"><thead><tr>${rt("xcols").map((c, i) => `<th${i === 1 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${LL(r.place).map((x) => `<tr><td><bdi>${esc(x[0])}</bdi></td><td class="n"><b>${esc(x[1])}</b></td><td class="muted">${esc(x[2] || "")}</td></tr>`).join("")}</tbody></table></div>
    ${(LL(r.notes) || []).length ? `<ul class="bp-ul" style="margin-top:10px">${LL(r.notes).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>` : ""}
  ${(LL(r.unknowns) || []).length ? `<div class="card"><h3>${esc(rt("unh"))}</h3><ul class="bp-ul">${LL(r.unknowns).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${LL(r.foot) ? `<div class="muted" style="font-size:12px;margin-top:8px">${esc(LL(r.foot))}</div>` : ""}</div>` : ""}
  ${D ? `<h3 class="bp-sec">${esc(rt("planH"))}</h3>` : ""}`;
}
const T = {
  en: { title: "🐻 Bear analysis", intro: "Bear Hunt reports for officers: leaders, sending troops, joiners and heroes, trend. Our own research, not official.",
    s1k: "Rallies open at once", s1s: "follows turnout: about {cap} marches per rally", s2k: "Strongest rallies filled", s2s: "always; only the last rally changes with turnout",
    s3k: "Estimated damage per wave", s3s: "usual turnout ({n} marches), same people and troops",
    tlh: "One wave, side by side", tlp: "Each bar is one rally's 5-minute gather; the number is how full it was. Now: open times are rebuilt from screenshot countdowns (±10 s). Proposed: switch turnout to see what changes.",
    scLabel: "Turnout:", sc: ["Fewer (~{n} marches)", "Usual (~{n})", "More (~{n})"], tMain: "Main leader", tSecond: "Second choice", tWeak: "Better as a joiner", tEmpty: "Empty space",
    rNow: "{d} (now)", rNew: "Proposed", axis: "seconds after the first rally opens",
    whyh: "Where the gain comes from", whyp: "A march scores about leader strength × √troops. The leader matters far more than how full the rally is. A weak rally gets roughly a quarter of the damage per march that a main rally gets, and its leader's own archers sit there for 5 minutes. Moving those marches into stronger rallies is the whole gain.",
    cols: ["Leader", "Type", "Leader strength K", "Marches now", "Proposed"],
    whyfoot: "K comes from rally mails. Values marked * are estimates from MightPulse Widget levels, not from mails yet. The Proposed column follows the turnout picked above.",
    chh: "What would change",
    ch: ["Leaders open in a fixed order, strongest first: {order}. Each rally fills before people move to the next.",
      "The number of rallies follows turnout instead of a fixed list: about {a} when fewer come, {b} on a usual day, {c} when more come. Only the last rally is ever partly empty, and that is where late arrivals go.",
      "Main rallies open first, about {gap} s apart, timed by the bear countdown everyone sees (e.g. \"open at 29:50, 29:35…\").",
      "Everyone else joins. That includes people with good archers who are weaker as leaders: their archers do about 3–4× more in a main rally.",
      "Full-cap marches go to main rallies. Small leftover marches go to rallies that still have open slots.",
      "If you only have 4 join marches, put all 4 into the strongest rallies first.",
      "Joiners with Amane / Yeonwoo / Chenko as first hero go to the later rallies, which most often miss joiner skills.",
      "The 6:30 rule stays as it is."],
    unh: "What we don't know yet",
    un: ["{est} had no mails this wave, so their K is estimated. With pessimistic values the gain is at the low end of {gain}; with the middle values, at the high end.",
      "Each player has 4–6 join marches (4 normally, 5 from VIP 6, some have 6), so 18 people make about 75–105 marches. Someone with only 4 can't be in every rally. The leaders need to watch the list and open the next rally once the current last one is nearly full.",
      "Hero skills that roll per fight add ±10–15% noise to any single wave, so one test wave won't prove it. Two or three waves would."],
    b1eye: "Trap 1 · for comparison", b1h: "BT1: enough people, different problem",
    b1p: "BT1 fills about 11 rallies every wave and its strong rallies fill in 20–45 seconds. Cutting rallies would not help there. What it loses is inside the rallies.",
    sc1: ["People on the leaderboard", "Total damage", "Average per person", "One wave"],
    b1lh: "BT1 leaders by archer strength", b1lp: "Archer (1 + attack)(1 + lethality) from each rally's bonus page. ★ = on the BT1 leader list. Dashed lines: BT2's two strongest, for scale. BT1 had no rally mails, so these are stats, not measured K.",
    b1xh: "Where BT1 loses damage", b1dh: "What could help BT1",
    foot: "Data: {src}", none: "No data yet. An admin adds it once with 📥 Update data below.", locked: "🔒 Log in first.",
    impT: "📥 Update data (admins)", impNote: "Paste a plan JSON or a hunt review JSON (from the analysis chat) — the page tells them apart. It is encrypted in this browser and saved for officers only.", impSave: "Encrypt & save",
    impOk: "✅ Saved — everyone with this tab sees it in a minute.", impBad: "⚠️ That isn't the plan JSON (needs now, order and rows).", impErr: "⚠️ Not saved: ", noTok: "⚠️ Saving needs the officer GitHub key (admin login)." },
  zh: { title: "🐻 熊獵實測", intro: "給幹部的熊獵報告：隊長、派兵、加入者與英雄、趨勢。我們自己的研究，不是官方說明。",
    s1k: "同時開的團數", s1s: "跟著人數走：大約每 {cap} 支部隊一團", s2k: "最強的團填滿率", s2s: "一定滿；只有最後一團隨人數變",
    s3k: "每波傷害估計", s3s: "一般人數（{n} 支部隊），同樣的人和兵",
    tlh: "同一波，前後對照", tlp: "每條是一團 5 分鐘的集結時間，數字是填滿率。現況的開團時間是從截圖倒數推回來的（±10 秒）。建議版可以切換人數看看差別。",
    scLabel: "參加人數：", sc: ["少一點（約 {n} 支）", "一般（約 {n} 支）", "多一點（約 {n} 支）"], tMain: "主力隊長", tSecond: "次選", tWeak: "比較適合加入", tEmpty: "空的位置",
    rNow: "{d}（現況）", rNew: "建議", axis: "第一團開團後經過的秒數",
    whyh: "多出來的分數從哪裡來", whyp: "每支部隊的分數大約是「隊長強度 × √兵數」，隊長的影響遠大於團有沒有滿。弱的團每支部隊大概只拿到主力團的 1/4，隊長自己的弓兵也被綁 5 分鐘。把這些部隊移到強的團，就是全部的差別。",
    cols: ["隊長", "類型", "隊長強度 K", "現在部隊數", "建議"],
    whyfoot: "K 來自集結信件。標 * 的是用 MightPulse 零件等級估的，還沒有信件。「建議」欄跟著上面選的人數變。",
    chh: "會改變的地方",
    ch: ["隊長照固定順序開，強的先：{order}。前一團滿了才往下一團。",
      "團數跟著人數走，不是固定名單：人少約 {a} 團、一般 {b} 團、人多 {c} 團。只有最後一團可能沒滿，晚到的人就進那一團。",
      "主力團先開，每團隔約 {gap} 秒，用大家都看得到的熊倒數來喊（例如「熊剩 29:50、29:35 開」）。",
      "其他人都加入，包括弓兵不錯但不適合當隊長的人：他們的弓兵在主力團大約多打 3–4 倍。",
      "帶滿上限的部隊進主力團；零頭部隊進還有空位的團。",
      "只有 4 條行軍隊伍的人，4 條都先放最強的團。",
      "第一位英雄是雨音／妍羽／琴科的加入者，優先去比較晚開的團，那裡最常湊不滿加入者技能。",
      "剩 6:30 才能開團的規定不變。"],
    unh: "還不知道的",
    un: ["{est} 這波沒有信件，K 是估的。用保守值算是 {gain} 的低標，用中間值是高標。",
      "每人有 4–6 條行軍隊伍（一般 4 條、VIP6 以上 5 條、有些人 6 條），18 人大約 75–105 支部隊。只有 4 條的人沒辦法每一團都進。隊長要看列表，最後一團快滿了，下一位才開。",
      "英雄機率技能讓單一波的分數有 ±10–15% 的運氣，所以試一波證明不了，要試 2–3 波。"],
    b1eye: "陷阱 1 · 對照", b1h: "BT1：人夠多，問題不一樣",
    b1p: "BT1 每波都撐得起約 11 團，強團 20–45 秒就滿，減團幫不上忙。它的損失在團裡面。",
    sc1: ["上榜人數", "總分", "平均每人", "一波"],
    b1lh: "BT1 隊長弓兵強度", b1lp: "弓兵 (1+攻擊力)(1+殺傷力)，取自各團集結加成頁。★ = BT1 隊長名單上的人。虛線是 BT2 最強的兩位，當作比例尺。BT1 沒有集結信件，所以這是屬性，不是實測的 K。",
    b1xh: "BT1 的損失在哪裡", b1dh: "BT1 可以改善的方向",
    foot: "資料：{src}", none: "還沒有資料。管理員在下面的 📥 更新資料 加一次就好。", locked: "🔒 請先登入。",
    impT: "📥 更新資料（管理員）", impNote: "貼上排團草稿或熊獵復盤的 JSON（分析聊天給的）——頁面會自己分辨。會在這個瀏覽器加密，只有幹部看得到。", impSave: "加密並儲存",
    impOk: "✅ 已儲存——有這個分頁的人大約一分鐘後就看得到。", impBad: "⚠️ 這不是規劃的 JSON（需要 now、order、rows）。", impErr: "⚠️ 沒有存到：", noTok: "⚠️ 儲存需要幹部的 GitHub 金鑰（管理員登入）。" },
  pt: { title: "🐻 Análise do Urso", intro: "Relatórios da Caça ao Urso para oficiais: líderes, envio de tropas, participantes e heróis, tendência. Pesquisa nossa, não é oficial.",
    s1k: "Rallies abertos ao mesmo tempo", s1s: "segue o número de pessoas: cerca de {cap} marchas por rally", s2k: "Rallies mais fortes cheios", s2s: "sempre; só o último rally muda com o número de pessoas",
    s3k: "Dano estimado por onda", s3s: "número normal de pessoas ({n} marchas), mesmas pessoas e tropas",
    tlh: "Uma onda, lado a lado", tlp: "Cada barra é a reunião de 5 minutos de um rally; o número mostra o quanto ficou cheio. Agora: os horários de abertura vêm das contagens regressivas nas capturas de tela (±10 s). Proposta: troque o número de pessoas para ver o que muda.",
    scLabel: "Pessoas:", sc: ["Menos (~{n} marchas)", "Normal (~{n})", "Mais (~{n})"], tMain: "Líder principal", tSecond: "Segunda opção", tWeak: "Melhor como participante", tEmpty: "Espaço vazio",
    rNow: "{d} (agora)", rNew: "Proposta", axis: "segundos após a abertura do primeiro rally",
    whyh: "De onde vem o ganho", whyp: "Uma marcha pontua mais ou menos força do líder × √tropas. O líder importa muito mais do que o rally estar cheio. Um rally fraco ganha cerca de um quarto do dano por marcha de um rally principal, e a Arquearia do próprio líder fica parada ali por 5 minutos. Mover essas marchas para rallies mais fortes é todo o ganho.",
    cols: ["Líder", "Tipo", "Força do líder K", "Marchas agora", "Proposta"],
    whyfoot: "O K vem dos relatórios de rally. Valores com * são estimativas pelos níveis de Ferramenta no MightPulse, ainda não de relatórios. A coluna Proposta segue o número de pessoas escolhido acima.",
    chh: "O que mudaria",
    ch: ["Os líderes abrem numa ordem fixa, o mais forte primeiro: {order}. Cada rally enche antes de as pessoas irem para o próximo.",
      "O número de rallies segue o número de pessoas, não uma lista fixa: cerca de {a} quando vêm menos, {b} num dia normal, {c} quando vêm mais. Só o último rally pode ficar meio vazio, e é para lá que vai quem chega tarde.",
      "Os rallies principais abrem primeiro, com uns {gap} s entre eles, pela contagem do urso que todos veem (ex.: \"abrir em 29:50, 29:35…\").",
      "Todos os outros entram nos rallies. Isso inclui quem tem boa Arquearia mas é mais fraco como líder: a Arquearia deles faz cerca de 3–4× mais num rally principal.",
      "Marchas com capacidade cheia vão para os rallies principais. Marchas pequenas que sobram vão para rallies que ainda têm vagas.",
      "Se você só tem 4 marchas para rally, coloque as 4 primeiro nos rallies mais fortes.",
      "Participantes com Amane / Yeonwoo / Chenko como primeiro herói vão para os rallies que abrem mais tarde, que são os que mais ficam sem habilidades de participante.",
      "A regra dos 6:30 continua como está."],
    unh: "O que ainda não sabemos",
    un: ["{est} não tiveram relatórios nesta onda, então o K deles é estimado. Com valores pessimistas o ganho fica no ponto mais baixo de {gain}; com os valores do meio, no mais alto.",
      "Cada jogador tem 4–6 marchas para rally (4 normalmente, 5 a partir do VIP 6, alguns têm 6), então 18 pessoas fazem cerca de 75–105 marchas. Quem só tem 4 não pode estar em todos os rallies. Os líderes precisam olhar a lista e abrir o próximo rally quando o último atual estiver quase cheio.",
      "Habilidades de herói que dependem de sorte em cada luta dão ±10–15% de variação em qualquer onda, então uma onda de teste não prova nada. Duas ou três ondas provariam."],
    b1eye: "Armadilha 1 · para comparar", b1h: "BT1: gente suficiente, problema diferente",
    b1p: "A BT1 enche cerca de 11 rallies em toda onda, e os rallies fortes enchem em 20–45 segundos. Cortar rallies não ajudaria lá. O que ela perde está dentro dos rallies.",
    sc1: ["Pessoas no ranking", "Dano total", "Média por pessoa", "Uma onda"],
    b1lh: "Líderes da BT1 pela força da Arquearia", b1lp: "Arquearia (1 + ataque)(1 + letalidade) da página de bônus de cada rally. ★ = na lista de líderes da BT1. Linhas tracejadas: os dois mais fortes da BT2, como escala. A BT1 não teve relatórios de rally, então isto são atributos, não K medido.",
    b1xh: "Onde a BT1 perde dano", b1dh: "O que poderia ajudar a BT1",
    foot: "Dados: {src}", none: "Ainda sem dados. Um admin adiciona uma vez com 📥 Atualizar dados abaixo.", locked: "🔒 Faça login primeiro.",
    impT: "📥 Atualizar dados (admins)", impNote: "Cole um JSON de plano ou um JSON de revisão de caçada (do chat de análise) — a página reconhece qual é. Ele é criptografado neste navegador e salvo só para oficiais.", impSave: "Criptografar e salvar",
    impOk: "✅ Salvo — todos com esta aba veem em um minuto.", impBad: "⚠️ Isso não é o JSON do plano (precisa de now, order e rows).", impErr: "⚠️ Não salvo: ", noTok: "⚠️ Para salvar, precisa da chave do GitHub dos oficiais (login de admin)." },
  ar: { title: "🐻 تحليل الدب", intro: "تقارير صيد الدببة للضباط: القادة، إرسال القوات، المنضمّون والأبطال، الاتجاه. بحثنا الخاص، ليس رسميًا.",
    s1k: "الحشود المفتوحة معًا", s1s: "حسب عدد الحضور: نحو {cap} زحفًا لكل حشد", s2k: "امتلاء أقوى الحشود", s2s: "دائمًا؛ فقط الحشد الأخير يتغيّر مع عدد الحضور",
    s3k: "الضرر المقدّر لكل موجة", s3s: "حضور عادي ({n} زحفًا)، نفس الأشخاص والقوات",
    tlh: "موجة واحدة، جنبًا إلى جنب", tlp: "كل شريط هو تجمّع حشد واحد لمدة 5 دقائق؛ الرقم يبيّن نسبة امتلائه. الآن: أوقات الفتح مأخوذة من العدّ التنازلي في لقطات الشاشة (±10 s). المقترح: غيّر عدد الحضور لترى ما يتغيّر.",
    scLabel: "الحضور:", sc: ["أقل (~{n} زحفًا)", "عادي (~{n})", "أكثر (~{n})"], tMain: "قائد رئيسي", tSecond: "خيار ثانٍ", tWeak: "أفضل كمنضمّ", tEmpty: "مكان فارغ",
    rNow: "{d} (الآن)", rNew: "المقترح", axis: "ثوانٍ بعد فتح أول حشد",
    whyh: "من أين يأتي الربح", whyp: "يسجّل الزحف تقريبًا: قوة القائد × √القوات. القائد أهم بكثير من امتلاء الحشد. الحشد الضعيف يحصل تقريبًا على ربع الضرر لكل زحف مقارنة بالحشد الرئيسي، ورماة قائده يبقون هناك 5 دقائق. نقل هذه الزحوف إلى حشود أقوى هو كل الربح.",
    cols: ["القائد", "النوع", "قوة القائد K", "الزحوف الآن", "المقترح"],
    whyfoot: "يأتي K من رسائل الحشد. القيم المعلّمة بـ * تقديرات من مستويات الأجزاء في MightPulse، وليست من رسائل بعد. عمود المقترح يتبع عدد الحضور المختار في الأعلى.",
    chh: "ما الذي سيتغيّر",
    ch: ["يفتح القادة بترتيب ثابت، الأقوى أولًا: {order}. يمتلئ كل حشد قبل أن ينتقل الناس إلى التالي.",
      "عدد الحشود يتبع عدد الحضور بدل قائمة ثابتة: نحو {a} عندما يأتي عدد أقل، و{b} في يوم عادي، و{c} عندما يأتي عدد أكبر. فقط الحشد الأخير قد لا يمتلئ، وإليه يذهب المتأخرون.",
      "تفتح الحشود الرئيسية أولًا، بفارق نحو {gap} s، حسب عدّ الدب التنازلي الذي يراه الجميع (مثلًا \"افتح عند 29:50، 29:35…\").",
      "كل الباقين ينضمّون. ويشمل ذلك من لديهم رماة جيدون لكنهم أضعف كقادة: رماتهم يصنعون نحو 3–4× أكثر في حشد رئيسي.",
      "الزحوف الممتلئة إلى الحد الأقصى تذهب إلى الحشود الرئيسية. الزحوف الصغيرة المتبقية تذهب إلى الحشود التي فيها أماكن فارغة.",
      "إذا كان لديك 4 زحوف انضمام فقط، ضع الأربعة أولًا في أقوى الحشود.",
      "المنضمّون الذين بطلهم الأول أماني / يونوو / تشينكو يذهبون إلى الحشود المتأخرة، فهي الأكثر افتقادًا لمهارات المنضمّين.",
      "قاعدة 6:30 تبقى كما هي."],
    unh: "ما لا نعرفه بعد",
    un: ["{est}: لا رسائل في هذه الموجة، لذلك K تقديري. مع القيم المتشائمة يكون الربح في الحد الأدنى من {gain}؛ ومع القيم الوسطى في الحد الأعلى.",
      "لكل لاعب 4–6 زحوف انضمام (4 عادةً، 5 من VIP 6، وبعضهم 6)، لذلك 18 شخصًا يصنعون نحو 75–105 زحوف. من لديه 4 فقط لا يستطيع أن يكون في كل حشد. على القادة متابعة القائمة وفتح الحشد التالي عندما يقترب الحشد الأخير الحالي من الامتلاء.",
      "مهارات الأبطال التي تعتمد على الحظ في كل معركة تضيف تذبذبًا ±10–15% في أي موجة واحدة، لذلك موجة اختبار واحدة لن تثبت شيئًا. موجتان أو ثلاث تكفي."],
    b1eye: "فخ 1 · للمقارنة", b1h: "BT1: عدد كافٍ من الناس، ومشكلة مختلفة",
    b1p: "يملأ BT1 نحو 11 حشدًا في كل موجة، وحشوده القوية تمتلئ في 20–45 ثانية. تقليل الحشود لن يفيد هناك. ما يخسره موجود داخل الحشود.",
    sc1: ["الأشخاص في لوحة الصدارة", "إجمالي الضرر", "المتوسط لكل شخص", "موجة واحدة"],
    b1lh: "قادة BT1 حسب قوة الرماة", b1lp: "الرماة (1 + الهجوم)(1 + الفتك) من صفحة مكافآت كل حشد. ★ = في قائمة قادة BT1. الخطوط المتقطعة: أقوى اثنين في BT2، للمقارنة. لم تكن لـ BT1 رسائل حشد، لذلك هذه إحصائيات وليست K مقاسًا.",
    b1xh: "أين يخسر BT1 الضرر", b1dh: "ما الذي قد يساعد BT1",
    foot: "البيانات: {src}", none: "لا توجد بيانات بعد. يضيفها مشرف مرة واحدة عبر 📥 تحديث البيانات في الأسفل.", locked: "🔒 سجّل الدخول أولًا.",
    impT: "📥 تحديث البيانات (المشرفون)", impNote: "الصق JSON الخطة أو JSON مراجعة الصيد (من محادثة التحليل) — الصفحة تميّز بينهما. يُشفَّر في هذا المتصفح ويُحفظ للضباط فقط.", impSave: "تشفير وحفظ",
    impOk: "✅ تم الحفظ — كل من لديه هذا التبويب يراه خلال دقيقة.", impBad: "⚠️ هذا ليس JSON الخطة (يحتاج now وorder وrows).", impErr: "⚠️ لم يُحفظ: ", noTok: "⚠️ الحفظ يحتاج مفتاح GitHub الخاص بالضباط (دخول المشرف)." },
  ko: { title: "🐻 곰 분석", intro: "간부용 곰 사냥 보고서: 대장, 병력 보내기, 집결원과 영웅, 추세. 우리 연구이고 공식은 아니야.",
    s1k: "동시에 여는 집결 수", s1s: "참여 인원에 따라: 집결 1개당 약 {cap}개 부대", s2k: "가장 강한 집결 채움률", s2s: "항상 가득; 마지막 집결만 인원에 따라 바뀝니다",
    s3k: "웨이브당 예상 피해", s3s: "보통 인원 ({n}개 부대), 같은 사람과 병력",
    tlh: "같은 웨이브, 비교", tlp: "막대 하나 = 집결 하나의 5분 집결 시간, 숫자 = 채움률. 현재: 여는 시간은 스크린샷 카운트다운으로 다시 계산했습니다 (±10 s). 제안: 인원을 바꿔서 무엇이 달라지는지 보세요.",
    scLabel: "참여 인원:", sc: ["적음 (~{n}개 부대)", "보통 (~{n})", "많음 (~{n})"], tMain: "주력 대장", tSecond: "차선", tWeak: "참여자가 더 나음", tEmpty: "빈 자리",
    rNow: "{d} (현재)", rNew: "제안", axis: "첫 집결을 연 뒤 지난 초",
    whyh: "늘어나는 점수는 어디서 오나", whyp: "부대 점수 ≈ 대장 강도 × √병력. 집결이 가득 찼는지보다 대장이 훨씬 중요합니다. 약한 집결은 부대당 주력 집결 피해의 약 1/4만 얻고, 그 대장의 궁병도 5분 동안 묶입니다. 이 부대들을 더 강한 집결로 옮기는 것이 전체 이득입니다.",
    cols: ["대장", "유형", "대장 강도 K", "현재 부대 수", "제안"],
    whyfoot: "K는 집결 메일에서 나옵니다. * 표시는 MightPulse 부속품 레벨로 추정한 값이고, 아직 메일 값이 아닙니다. 제안 열은 위에서 고른 인원을 따릅니다.",
    chh: "바뀌는 점",
    ch: ["대장은 고정 순서로, 강한 사람부터 엽니다: {order}. 앞 집결이 가득 차야 다음 집결로 넘어갑니다.",
      "집결 수는 고정 명단이 아니라 인원에 따라 정합니다: 적을 때 약 {a}개, 보통 {b}개, 많을 때 {c}개. 마지막 집결만 덜 찰 수 있고, 늦게 온 사람은 거기로 갑니다.",
      "주력 집결을 먼저, 약 {gap} s 간격으로 엽니다. 모두가 보는 곰 카운트다운으로 맞춥니다 (예: \"29:50, 29:35…에 오픈\").",
      "나머지는 모두 참여합니다. 궁병은 좋지만 대장으로는 약한 사람도 포함: 그 궁병은 주력 집결에서 약 3–4× 더 많이 칩니다.",
      "최대치로 채운 부대는 주력 집결로. 남은 작은 부대는 아직 자리가 있는 집결로.",
      "집결 참여 부대가 4개뿐이라면, 4개 모두 가장 강한 집결부터 넣으세요.",
      "첫 번째 영웅이 아마네 / 연우 / 첸코인 참여자는 늦게 여는 집결로 갑니다. 그곳이 참여자 스킬이 가장 자주 빠지는 곳입니다.",
      "6:30 규칙은 그대로입니다."],
    unh: "아직 모르는 것",
    un: ["{est}: 이번 웨이브에 메일이 없어서 K가 추정값입니다. 비관적인 값이면 {gain}의 낮은 쪽, 중간 값이면 높은 쪽입니다.",
      "각 플레이어는 집결 참여 부대가 4–6개 (보통 4개, VIP 6부터 5개, 일부는 6개)라서, 18명이면 약 75–105개 부대입니다. 4개뿐인 사람은 모든 집결에 들어갈 수 없습니다. 대장은 목록을 보고, 지금 마지막 집결이 거의 차면 다음 집결을 여세요.",
      "싸울 때마다 확률로 발동하는 영웅 스킬 때문에 한 웨이브 점수는 ±10–15% 흔들립니다. 그래서 테스트 1웨이브로는 증명이 안 됩니다. 2–3웨이브면 됩니다."],
    b1eye: "함정 1 · 비교용", b1h: "BT1: 인원은 충분, 문제가 다름",
    b1p: "BT1은 매 웨이브 약 11개 집결을 채우고, 강한 집결은 20–45초 만에 찹니다. 집결 수를 줄여도 도움이 안 됩니다. 손실은 집결 안에 있습니다.",
    sc1: ["랭킹 인원", "총 피해", "1인 평균", "1웨이브"],
    b1lh: "궁병 강도별 BT1 대장", b1lp: "궁병 (1 + 공격력)(1 + 파괴력), 각 집결 버프 화면 기준. ★ = BT1 대장 명단에 있는 사람. 점선: BT2에서 가장 강한 두 명, 비교 기준. BT1은 집결 메일이 없어서, 이것은 능력치이지 실측 K가 아닙니다.",
    b1xh: "BT1이 피해를 잃는 곳", b1dh: "BT1에 도움이 될 것",
    foot: "데이터: {src}", none: "아직 데이터가 없습니다. 관리자가 아래 📥 데이터 업데이트에서 한 번 추가하면 됩니다.", locked: "🔒 먼저 로그인하세요.",
    impT: "📥 데이터 업데이트 (관리자)", impNote: "계획 JSON 또는 사냥 리뷰 JSON (분석 채팅에서 받은 것)을 붙여 넣으세요 — 페이지가 알아서 구분합니다. 이 브라우저에서 암호화되고 간부만 볼 수 있게 저장됩니다.", impSave: "암호화 후 저장",
    impOk: "✅ 저장됨 — 이 탭이 있는 사람은 1분 안에 볼 수 있습니다.", impBad: "⚠️ 계획 JSON이 아닙니다 (now, order, rows가 필요).", impErr: "⚠️ 저장 안 됨: ", noTok: "⚠️ 저장하려면 간부 GitHub 키가 필요합니다 (관리자 로그인)." },
};
let lang = OFFICER.lang || "en", D = null, N = null, msg = "";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const tier = (k) => t({ main: "tMain", second: "tSecond", weak: "tWeak" }[k] || "tWeak");
function plan(n) { const out = []; let r = n; const cap = D.cap || 14, gap = D.gap || 15;
  D.order.forEach(([nm, ty], i) => { if (r <= 0) return; const m = Math.min(cap, r); out.push([nm, ty, i * gap, m / cap, m]); r -= m; }); return out; }
const css = (v) => getComputedStyle($("pg-bearplan")).getPropertyValue(v).trim();
function svg() {
  const W = 820, left = 110, right = 12, rowH = 20, gap = 5, max = 420, x = (s) => left + (W - left - right) * s / max;
  const NEW = plan(N), y1 = 26, h1 = D.now.length * (rowH + gap), y2 = y1 + h1 + 40, h2 = Math.max(NEW.length, D.order.length) * (rowH + gap), H = y2 + h2 + 34;
  const c = { fg: css("--text") || "#333", mu: css("--text-muted") || "#777", ln: css("--rule") || "#ccc", idle: css("--bp-idle"), main: css("--bp-main"), second: css("--bp-second"), weak: css("--bp-weak") };
  let o = "";
  for (let s = 0; s <= max; s += 60) o += `<line x1="${x(s)}" x2="${x(s)}" y1="${y1 - 8}" y2="${H - 26}" stroke="${c.ln}"/><text x="${x(s)}" y="${H - 10}" fill="${c.mu}" font-size="11" text-anchor="middle">${s / 60}:00</text>`;
  o += `<text x="${W - right}" y="${H - 10}" fill="${c.mu}" font-size="11" text-anchor="end">${esc(t("axis"))}</text>`;
  const block = (data, y0, label) => { o += `<text x="0" y="${y0 - 10}" fill="${c.fg}" font-size="13" font-weight="600">${esc(label)}</text>`;
    data.forEach(([n, ty, st, f], i) => { const y = y0 + i * (rowH + gap), x0 = x(st), w = x(st + 300) - x0, lab = Math.round(f * 100) + "%", inside = w * f > 44;
      o += `<text x="${left - 8}" y="${y + rowH / 2 + 4}" fill="${c.fg}" font-size="12" text-anchor="end">${esc(n)}</text><rect x="${x0}" y="${y}" width="${w}" height="${rowH}" rx="3" fill="${c.idle}" stroke="${c.ln}"/>
        <rect x="${x0}" y="${y}" width="${w * f}" height="${rowH}" rx="3" fill="${c[ty] || c.weak}"/><text x="${inside ? x0 + w * f - 6 : x0 + w * f + 6}" y="${y + rowH / 2 + 4}" fill="${inside ? "#fff" : c.mu}" font-size="11" text-anchor="${inside ? "end" : "start"}">${lab}</text>`; }); };
  const TO = D.turnout || [75, 94, 110], si = TO.indexOf(N);
  block(D.now, y1, fill(t("rNow"), { d: D.date || "" })); block(NEW, y2, `${t("rNew")} · ${fill(t("sc")[si < 0 ? 1 : si], { n: N })}`);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="timeline" style="display:block;min-width:600px;width:100%;height:auto;font-family:inherit">${o}</svg>`;
}
function bars(B, ref) {   // 🐻 BT1: leaders by archer strength, BT2's strongest as dashed lines
  const W = 820, left = 110, right = 40, rh = 18, g = 6, max = Math.max(40, ...B.map((b) => b[2]));
  const x = (v) => left + (W - left - right) * v / max, H = B.length * (rh + g) + 30;
  const c = { fg: css("--text") || "#333", mu: css("--text-muted") || "#777", ln: css("--rule") || "#ccc", main: css("--bp-main"), second: css("--bp-second"), weak: css("--bp-weak") };
  let o = "";
  for (let v = 0; v <= max; v += 10) o += `<line x1="${x(v)}" x2="${x(v)}" y1="0" y2="${H - 22}" stroke="${c.ln}"/><text x="${x(v)}" y="${H - 6}" fill="${c.mu}" font-size="11" text-anchor="middle">${v}</text>`;
  (ref || []).forEach(([n, v]) => { o += `<line x1="${x(v)}" x2="${x(v)}" y1="0" y2="${H - 22}" stroke="${c.fg}" stroke-dasharray="3 3" opacity=".5"><title>${esc(n)}</title></line>`; });
  B.forEach(([n, ty, v, on], i) => { const y = i * (rh + g);
    o += `<text x="${left - 8}" y="${y + rh / 2 + 4}" fill="${c.fg}" font-size="12" text-anchor="end">${on ? "★ " : ""}${esc(n)}</text><rect x="${left}" y="${y}" width="${x(v) - left}" height="${rh}" rx="3" fill="${c[ty] || c.weak}"/>
      <text x="${x(v) + 6}" y="${y + rh / 2 + 4}" fill="${c.mu}" font-size="11">${(+v).toFixed(1)}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="BT1" style="display:block;min-width:600px;width:100%;height:auto;font-family:inherit">${o}</svg>`;
}
function bt1Html() {
  const b = D.bt1; if (!b) return "";
  const L = (o) => o ? (o[lang] || o.en || []) : [];
  const li = (arr) => arr.map((s) => `<li>${esc(s)}</li>`).join("");
  return `<div class="card bp-bt1"><div class="muted" style="font-size:12px;letter-spacing:.06em">${esc(t("b1eye"))}</div><h3>${esc(t("b1h"))}</h3><p class="bp-p">${esc(t("b1p"))}</p>
      <div class="bp-tw"><table class="bp-t" style="min-width:0"><thead><tr><th></th><th class="n">BT1</th><th class="n">BT2</th></tr></thead>
      <tbody>${t("sc1").map((k, i) => { const v = (L(b.scale)[i]) || ["–", "–"]; return `<tr><td style="white-space:nowrap">${esc(k)}</td><td class="n">${esc(v[0])}</td><td class="n">${esc(v[1])}</td></tr>`; }).join("")}</tbody></table></div></div>
    ${b.leaders ? `<div class="card"><h3>${esc(t("b1lh"))}</h3><p class="muted bp-p" style="font-size:12.5px">${esc(t("b1lp"))}</p>
      <div class="bp-legend">${["main", "second", "weak"].map((k) => `<span><i class="bp-sw" style="background:var(--bp-${k})"></i>${esc(tier(k))}</span>`).join("")}</div><div class="bp-chart">${bars(b.leaders, b.ref)}</div></div>` : ""}
    ${L(b.loss).length ? `<div class="card"><h3>${esc(t("b1xh"))}</h3><ul class="bp-ul">${li(L(b.loss))}</ul></div>` : ""}
    ${L(b.dir).length ? `<div class="card"><h3>${esc(t("b1dh"))}</h3><ul class="bp-ul">${li(L(b.dir))}</ul></div>` : ""}`;
}
function importBox() {
  if (!(OFFICER.isAdmin && OFFICER.isAdmin())) return "";
  return `<details class="card bp-imp"${D ? "" : " open"}><summary><b>${esc(t("impT"))}</b></summary><div class="muted" style="font-size:12.5px;margin:6px 0">${esc(t("impNote"))}</div>
    <textarea id="bp_json" rows="6" style="width:100%;box-sizing:border-box;font:12px ui-monospace,monospace"></textarea>
    <div class="row" style="margin-top:6px;gap:8px;align-items:center"><button class="btn primary" id="bp_save">${esc(t("impSave"))}</button><span class="msg" id="bp_msg">${esc(msg)}</span></div></details>`;
}
function render() {
  const root = $("bp_root"); if (!root) return;
  $("bp_title").textContent = t("title"); $("bp_intro").textContent = t("intro");
  if (RV && RV.analysis) { root.innerHTML = `${analysisHtml()}${importBox()}`; bind(); return; }   // the old rally-plan draft is no longer shown
  if (!D) { root.innerHTML = RV ? `${reviewHtml()}${importBox()}` : `<div class="card muted">${esc(t("none"))}</div>${importBox()}`; bind(); return; }
  const TO = D.turnout || [75, 94, 110]; if (N == null) N = TO[1];
  const counts = TO.map((n) => plan(n).length), P = {}; plan(N).forEach((p) => { P[p[0]] = p[4]; });
  const est = D.rows.filter((r) => /\*/.test(String(r[2]))).map((r) => r[0]);
  const items = (arr, v) => arr.map((s) => `<li>${esc(fill(s, v))}</li>`).join("");
  const v = { order: D.order.map((o) => o[0]).join(", "), a: counts[0], b: counts[1], c: counts[2], gap: D.gap || 15, est: est.join(", ") || "—", gain: D.gain || "", cap: D.cap || 14, n: TO[1], src: D.src || "" };
  root.innerHTML = `${reviewHtml()}
    <div class="bp-stats">
      <div class="card bp-stat"><span class="k">${esc(t("s1k"))}</span><span class="v">${D.now.length} → ${Math.min(...counts)}–${Math.max(...counts)}</span><span class="s">${esc(fill(t("s1s"), v))}</span></div>
      <div class="card bp-stat"><span class="k">${esc(t("s2k"))}</span><span class="v">100%</span><span class="s">${esc(t("s2s"))}</span></div>
      <div class="card bp-stat"><span class="k">${esc(t("s3k"))}</span><span class="v"><b>${esc(D.gain || "—")}</b></span><span class="s">${esc(fill(t("s3s"), v))}</span></div></div>
    <div class="card"><h3>${esc(t("tlh"))}</h3><p class="muted bp-p">${esc(t("tlp"))}</p>
      <div class="bp-legend">${["main", "second", "weak"].map((k) => `<span><i class="bp-sw" style="background:var(--bp-${k})"></i>${esc(tier(k))}</span>`).join("")}<span><i class="bp-sw" style="background:var(--bp-idle);border:1px solid var(--rule)"></i>${esc(t("tEmpty"))}</span></div>
      <div class="row bp-scen"><span class="muted">${esc(t("scLabel"))}</span>${TO.map((n, i) => `<button class="btn small${n === N ? " on" : ""}" data-bpn="${n}">${esc(fill(t("sc")[i], { n }))}</button>`).join("")}</div>
      <div class="bp-chart">${svg()}</div></div>
    <div class="card"><h3>${esc(t("whyh"))}</h3><p class="bp-p">${esc(t("whyp"))}</p>
      <div class="bp-tw"><table class="bp-t"><thead><tr>${t("cols").map((c, i) => `<th${i > 1 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${D.rows.map((r) => `<tr><td><bdi>${esc(r[0])}</bdi></td><td><span class="bp-pill ${esc(r[1])}">${esc(tier(r[1]))}</span></td><td class="n">${esc(String(r[2]))}</td><td class="n">${r[3]}</td><td class="n">${P[r[0]] || "–"}</td></tr>`).join("")}</tbody></table></div>
      <p class="muted bp-p" style="font-size:12.5px">${esc(t("whyfoot"))}</p></div>
    <div class="card"><h3>${esc(t("chh"))}</h3><ul class="bp-ul">${items(t("ch"), v)}</ul></div>
    <div class="card"><h3>${esc(t("unh"))}</h3><ul class="bp-ul">${items(t("un"), v)}</ul></div>
    ${bt1Html()}
    <div class="muted" style="font-size:12px">${esc(fill(t("foot"), v))}</div>${importBox()}`;
  bind();
}
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
function bind() {
  document.querySelectorAll("[data-bpn]").forEach((b) => b.onclick = () => { N = +b.dataset.bpn; render(); });
  const sv = $("bp_save"); if (!sv) return;
  sv.onclick = async () => {
    const m = $("bp_msg"); let d = null;
    try { d = JSON.parse($("bp_json").value); } catch (e) {}
    const isRv = !!(d && d.review && (Array.isArray(d.rows) || d.analysis));
    if (!d || (!isRv && (!Array.isArray(d.now) || !Array.isArray(d.order) || !Array.isArray(d.rows)))) { m.textContent = t("impBad"); return; }
    if (!OFFICER.token) { m.textContent = t("noTok"); return; }
    sv.disabled = true; m.textContent = "⏳";
    try {
      d.v = 1; d.by = (OFFICER.user && OFFICER.user.name) || ""; d.at = new Date().toISOString();
      const P = isRv ? RPATH : PATH;
      let sha; try { const f = await OFFICER.gh("GET", P, null, OFFICER.token); sha = f ? f.sha : undefined; } catch (e) {}
      await OFFICER.gh("PUT", P, { message: isRv ? "🐻 Bear hunt review (encrypted)" : "🐻 Bear plan data (encrypted)", content: u8b64(JSON.stringify(await OfficerData.seal(d), null, 1) + "\n"), sha, branch: "main" }, OFFICER.token);
      if (isRv) RV = d; else { D = d; N = null; } msg = t("impOk"); render();
    } catch (e) { m.textContent = t("impErr") + (e && e.message || e); sv.disabled = false; }
  };
}
async function init() {
  render();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("bp_root").innerHTML = `<div class="card muted">${esc(t("locked"))}</div>`; return; }
  try { const d = await OfficerData.fetchJson(PATH); if (d && Array.isArray(d.now)) D = d; } catch (e) {}
  try { const r = await OfficerData.fetchJson(RPATH); if (r && r.review && (Array.isArray(r.rows) || r.analysis)) RV = r; } catch (e) {}
  render();
}
function applyTexts() { if ($("bp_title")) { $("bp_title").textContent = t("title"); $("bp_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); if (D || RV) render(); }
OFFICER_PAGES.bearplan = { init, applyTexts, setLang, onShow: () => { if (D || RV) render(); } };
})();
