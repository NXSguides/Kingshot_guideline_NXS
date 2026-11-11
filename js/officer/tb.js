/* NXS officer page — 🦣 Terror rallies report (registers OFFICER_PAGES.tb; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-11: how big a rally each Terror level needs. Our own research, STILL BEING TESTED — fitted on 13 Terror battle
   reports from Sparrow's main and second account (Lv3–Lv8) and the game's Recommended Power (Project doc claude/war-bear-levels.md,
   final version "更正 11/11 20:14"; troop numbers claude/troop-stats.md). Not official.
   Read-only text + a small calculator, no member data (only Sparrow's own two accounts). Names follow data/terms.js. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-11";
/* level, beast key, troops (inf / cav / arc), tier, stat bonus %, game Recommended Power */
const LV = [[3, "moose", "15k / 17k / 17k", "T6", 100, 5480000], [4, "panther", "38.5k / 45.5k / 45.5k", "T7", 210, 37797400],
  [5, "lion", "80.5k / 92k / 92k", "T8", 330, 142724200], [6, "elephant", "100k × 3", "T9", 440, 279000000],
  [7, "bear", "150k × 3", "T10", 550, 683100000], [8, "roc", "250k × 3", "T10", 660, 1356300000]];
/* 13 reports: level, account (main / alt), rally troops, fallen % (injured + lightly injured), won?, beast health knocked off when lost */
const REP = [[3, "main", 1028710, 0.02, 1], [4, "main", 1028710, 0.05, 1], [5, "main", 1028710, 0.4, 1], [6, "main", 1028710, 2.4, 1], [7, "main", 1028710, 4.7, 1], [8, "main", 1028710, 25, 1],
  [3, "alt", 495915, 0.05, 1], [4, "alt", 506850, 1.7, 1], [5, "alt", 506850, 8.1, 1], [6, "alt", 506850, 44, 1], [7, "alt", 506850, 100, 0, 12], [8, "alt", 506850, 100, 0, 5]];
/* each account's march page (heroes on, full march): power, capacity */
const ACC = { main: [169964374, 136710], alt: [38906510, 100955] };
const rallyPow = (pow, cap, troops) => pow / cap * troops;
const band = (r) => r >= 1.5 ? "easy" : r >= 0.9 ? "win" : r >= 0.6 ? "hard" : "lose";
const T = {
  en: { title: "🦣 Terror rallies", intro: "", obs: ["The Recommended Power is for the whole rally.", "Rally power ≈ the leader's power per troop × all troops in the rally.", "Hurt troops are almost all only lightly injured."], obsH: "🔎 What we saw", do: ["The whole rally should reach the Recommended Power.", "Let the player with the strongest stats lead.", "Fill the rally.", "1× wins; 1.5× for few injuries; under half, don't start."], doH: "💡 Suggestions",
    badge: "🔬 Our research · updated {d}", st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "Compare your rally's power with the Recommended Power.", heroP: "The Terror pop-up shows a Recommended Power. It is for the whole rally, not one march.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 The levels", lvCols: ["Lv", "Terror", "Troops (inf / cav / arc)", "Tier", "All stats", "Recommended Power"], lvNote: "Lv1–2 are no longer on the map.",
    howH: "🔢 How we worked it out", how: "Rally power ≈ the leader's march power ÷ the leader's march capacity × all troops in the rally", howP: "The two numbers at the top of the leader's march page (3 heroes, full march).",
    ratH: "📏 Rally power ÷ Recommended Power", rat: { easy: "1.5× or more: easy — under 10% hurt", win: "about 1×: you win, 20–30% hurt", hard: "about 0.7×: barely win, about half hurt", lose: "under 0.5×: you lose" },
    short: { easy: "easy", win: "win", hard: "barely", lose: "lose" }, calcH: "🧮 Try a rally", cPow: "Leader's march power (M)", cCap: "Leader's march capacity", cTr: "All troops in the rally", cRes: "Rally power ≈ {p}", cCols: ["Lv", "Terror", "× Recommended", ""],
    cNote: "Joiners' troops should be about the leader's tier. A rough guide.",
    needH: "📊 How full must the rally be?", needP: "Rally troops, as a multiple of the leader's own march capacity, to reach 1× the Recommended Power:", needCol: "Leader's march power",
    repH: "📑 The battle reports behind it", repCols: ["Lv", "Account", "Rally troops", "× Recommended", "Hurt", "Result"], acc: { main: "Sparrow main", alt: "Sparrow alt" }, won: "won", lost: "lost — beast −{g}%",
    repNote: "Main account: march 170M / 136,710 → rally ≈ 1,279M. Alt: 38.9M / 100,955 → rally ≈ 195M.",
    factH: "📌 Good to know", facts: [["ok", "A Terror rally needs joiners to depart."], ["ok", "Cavalry doesn't fall; infantry and archers do."], ["mid", "The Recommended Power is about 1.25× the power that only just wins."]],
    unkH: "🟡 Not known yet", unks: ["Whether other leaders fit the same numbers (so far worked out from two accounts).", "How much weaker joiners (T8 / T9) pull the rally down.", "Best troop mix against a Terror.", "Does the march power change with City Bonus and other buffs?"],
    more: "Officers: Rally & Garrison report → ⚔️", foot: "Source: Sparrow's two accounts, 13 Terror battle reports (11/11) + the Terror pop-ups. Worked back from the numbers, not from the game." },
  zh: { title: "🦣 巨獸集結", intro: "", obs: ["推薦實力比的是整團。", "集結戰力 ≈ 隊長的每兵戰力 × 整團兵數。", "受傷的幾乎都是輕傷。"], obsH: "🔎 我們觀察到", do: ["整團要達到推薦實力。", "讓屬性最強的人當隊長。", "把團坐滿。", "1 倍會贏；1.5 倍少受傷；不到一半不要打。"], doH: "💡 建議",
    badge: "🔬 我們的研究 · 更新 {d}", st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "把你這團的集結戰力跟「推薦實力」比。", heroP: "巨獸彈窗會寫推薦實力。它比的是整團，不是一支部隊。",
    beasts: { moose: "巨型駝鹿", panther: "巨型黑豹", lion: "巨型白獅", elephant: "巨型戰象", bear: "巨型戰熊", roc: "泰坦巨鳥" },
    lvH: "📋 各等級", lvCols: ["等級", "巨獸", "兵數（步／騎／弓）", "兵等", "全屬性", "推薦實力"], lvNote: "1、2 級地圖上已經沒有了。",
    howH: "🔢 怎麼算的", how: "集結戰力 ≈ 隊長出征戰力 ÷ 隊長出征容量 × 整團總兵數", howP: "隊長出征頁上方的兩個數字（3 位英雄、派滿）。",
    ratH: "📏 集結戰力 ÷ 推薦實力", rat: { easy: "1.5 倍以上：輕鬆，傷不到 10%", win: "約 1 倍：會贏，傷 20–30%", hard: "約 0.7 倍：勉強贏，傷一半左右", lose: "不到 0.5 倍：會輸" },
    short: { easy: "輕鬆", win: "會贏", hard: "勉強", lose: "會輸" }, calcH: "🧮 算算看", cPow: "隊長出征戰力（M）", cCap: "隊長出征容量", cTr: "整團總兵數", cRes: "集結戰力 ≈ {p}", cCols: ["等級", "巨獸", "推薦實力的幾倍", ""],
    cNote: "加入者的兵等要跟隊長差不多。只是粗估。",
    needH: "📊 要湊多少兵？", needP: "整團兵數要是隊長出征容量的幾倍（到推薦實力 1 倍）：", needCol: "隊長出征戰力",
    repH: "📑 用到的戰報", repCols: ["等級", "帳號", "集結兵數", "推薦實力的幾倍", "受傷", "結果"], acc: { main: "Sparrow 主帳", alt: "Sparrow 小帳" }, won: "贏", lost: "輸——巨獸只掉 {g}%",
    repNote: "主帳：出征 170M／136,710 → 集結戰力約 1,279M。小帳：38.9M／100,955 → 約 195M。",
    factH: "📌 其他要知道的", facts: [["ok", "一定要有人加入才能出發。"], ["ok", "騎兵不會倒，倒的是步兵和弓兵。"], ["mid", "推薦實力大約是「剛好打贏」的 1.25 倍。"]],
    unkH: "🟡 還不知道的", unks: ["其他隊長是不是也符合這些數字（目前用兩個帳號算出來）。", "加入者兵等比較低（T8／T9）時，整團會打多少折。", "打巨獸最好的兵種比例。", "出征戰力會不會跟著城鎮增益等加成變。"],
    more: "幹部：集結與駐防研究 → ⚔️", foot: "來源：Sparrow 兩個帳號 13 份巨獸戰報（11/11）＋巨獸彈窗。從數字反推，不是遊戲官方說明。" },
  pt: { title: "🦣 Rallies de Terror", intro: "", obs: ["O Poder Recomendado vale para o rally inteiro.", "Poder do rally ≈ poder por tropa do líder × todas as tropas do rally.", "Quase todos os feridos são só levemente feridos."], obsH: "🔎 O que observamos", do: ["O rally inteiro deve chegar ao Poder Recomendado.", "Deixe quem tem os atributos mais fortes liderar.", "Encha o rally.", "1× ganha; 1.5× para poucos feridos; abaixo da metade, não comece."], doH: "💡 Sugestões",
    badge: "🔬 Nossa pesquisa · atualizado {d}", st: { ok: "✅ certo", mid: "🟡 provável" },
    heroH: "Compare o poder do seu rally com o Poder Recomendado.", heroP: "O pop-up do Terror mostra um Poder Recomendado. Ele vale para o rally inteiro, não para uma marcha.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 Os níveis", lvCols: ["Nv", "Terror", "Tropas (inf / cav / arq)", "Nível", "Todos os atributos", "Poder Recomendado"], lvNote: "Nv1–2 não estão mais no mapa.",
    howH: "🔢 Como calculamos", how: "Poder do rally ≈ poder de marcha do líder ÷ capacidade de marcha do líder × todas as tropas do rally", howP: "Os dois números no topo da página de marcha do líder (3 heróis, marcha cheia).",
    ratH: "📏 Poder do rally ÷ Poder Recomendado", rat: { easy: "1.5× ou mais: fácil — menos de 10% feridos", win: "cerca de 1×: você ganha, 20–30% feridos", hard: "cerca de 0.7×: ganha por pouco, cerca de metade feridos", lose: "abaixo de 0.5×: você perde" },
    short: { easy: "fácil", win: "ganha", hard: "por pouco", lose: "perde" }, calcH: "🧮 Teste um rally", cPow: "Poder de marcha do líder (M)", cCap: "Capacidade de marcha do líder", cTr: "Todas as tropas do rally", cRes: "Poder do rally ≈ {p}", cCols: ["Nv", "Terror", "× Recomendado", ""],
    cNote: "As tropas dos participantes devem ser mais ou menos do nível do líder. É uma estimativa.",
    needH: "📊 Quão cheio o rally precisa estar?", needP: "Tropas do rally, em múltiplos da capacidade de marcha do líder, para chegar a 1× o Poder Recomendado:", needCol: "Poder de marcha do líder",
    repH: "📑 Os relatórios de batalha usados", repCols: ["Nv", "Conta", "Tropas do rally", "× Recomendado", "Feridos", "Resultado"], acc: { main: "Sparrow principal", alt: "Sparrow secundária" }, won: "ganhou", lost: "perdeu — fera −{g}%",
    repNote: "Conta principal: marcha 170M / 136,710 → rally ≈ 1,279M. Secundária: 38.9M / 100,955 → rally ≈ 195M.",
    factH: "📌 Bom saber", facts: [["ok", "Um rally de Terror precisa de participantes para partir."], ["ok", "A Cavalaria não cai; Infantaria e Arquearia sim."], ["mid", "O Poder Recomendado é cerca de 1.25× o poder que mal ganha."]],
    unkH: "🟡 Ainda não sabemos", unks: ["Se outros líderes seguem os mesmos números (até agora calculado com duas contas).", "Quanto participantes mais fracos (T8 / T9) puxam o rally para baixo.", "Melhor mistura de tropas contra um Terror.", "O poder de marcha muda com o Bônus da Cidade e outros bônus?"],
    more: "Oficiais: estudo de Rally e Guarnição → ⚔️", foot: "Fonte: as duas contas da Sparrow, 13 relatórios de batalha de Terror (11/11) + os pop-ups de Terror. Calculado a partir dos números, não vem do jogo." },
  ar: { title: "🦣 حشود الوحوش العملاقة", intro: "", obs: ["القوة الموصى بها هي للحشد كله.", "قوة الحشد ≈ قوة القائد لكل جندي × كل القوات في الحشد.", "كل المصابين تقريبًا إصاباتهم خفيفة."], obsH: "🔎 ما لاحظناه", do: ["يجب أن يبلغ الحشد كله القوة الموصى بها.", "دع صاحب أقوى إحصاءات يقود.", "املأ الحشد.", "1× يفوز؛ 1.5× لإصابات قليلة؛ أقل من النصف لا تبدأ."], doH: "💡 اقتراحات",
    badge: "🔬 بحثنا · آخر تحديث {d}", st: { ok: "✅ مؤكد", mid: "🟡 مرجّح" },
    heroH: "قارن قوة حشدك بالقوة الموصى بها.", heroP: "نافذة الوحش العملاق تعرض القوة الموصى بها. وهي للحشد كله، لا لزحف واحد.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 المستويات", lvCols: ["Lv", "الوحش", "القوات (مشاة / فرسان / رماة)", "المستوى", "كل الإحصاءات", "القوة الموصى بها"], lvNote: "Lv1–2 لم تعد على الخريطة.",
    howH: "🔢 كيف حسبناها", how: "قوة الحشد ≈ قوة زحف القائد ÷ سعة زحف القائد × كل القوات في الحشد", howP: "الرقمان في أعلى صفحة زحف القائد (3 أبطال، زحف ممتلئ).",
    ratH: "📏 قوة الحشد ÷ القوة الموصى بها", rat: { easy: "1.5× أو أكثر: سهل — أقل من 10% مصابون", win: "نحو 1×: تفوز، 20–30% مصابون", hard: "نحو 0.7×: فوز بصعوبة، نحو النصف مصابون", lose: "أقل من 0.5×: تخسر" },
    short: { easy: "سهل", win: "فوز", hard: "بصعوبة", lose: "خسارة" }, calcH: "🧮 جرّب حشدًا", cPow: "قوة زحف القائد (M)", cCap: "سعة زحف القائد", cTr: "كل القوات في الحشد", cRes: "قوة الحشد ≈ {p}", cCols: ["Lv", "الوحش", "× الموصى بها", ""],
    cNote: "قوات المنضمّين يجب أن تكون قريبة من مستوى القائد. تقدير تقريبي.",
    needH: "📊 كم يجب أن يمتلئ الحشد؟", needP: "قوات الحشد، بمضاعفات سعة زحف القائد، لبلوغ 1× القوة الموصى بها:", needCol: "قوة زحف القائد",
    repH: "📑 تقارير المعارك المستخدمة", repCols: ["Lv", "الحساب", "قوات الحشد", "× الموصى بها", "المصابون", "النتيجة"], acc: { main: "Sparrow الرئيسي", alt: "Sparrow الثانوي" }, won: "فوز", lost: "خسارة — الوحش −{g}%",
    repNote: "الحساب الرئيسي: زحف 170M / 136,710 → حشد ≈ 1,279M. الثانوي: 38.9M / 100,955 → حشد ≈ 195M.",
    factH: "📌 من المفيد أن تعرف", facts: [["ok", "حشد الوحش العملاق يحتاج منضمّين لينطلق."], ["ok", "الفرسان لا يسقطون؛ المشاة والرماة يسقطون."], ["mid", "القوة الموصى بها نحو 1.25× القوة التي تفوز بالكاد."]],
    unkH: "🟡 غير معروف بعد", unks: ["هل يطابق القادة الآخرون الأرقام نفسها (محسوبة حتى الآن من حسابين).", "كم يُضعف المنضمّون الأضعف (T8 / T9) الحشد.", "أفضل خليط قوات ضد الوحش العملاق.", "هل تتغير قوة الزحف مع مكافأة المدينة والمكافآت الأخرى؟"],
    more: "الضباط: دراسة الحشد والحامية → ⚔️", foot: "المصدر: حسابا Sparrow، 13 تقرير معركة مع الوحوش العملاقة (11/11) + نوافذ الوحوش. محسوبة من الأرقام، وليست من اللعبة." },
  ko: { title: "🦣 괴수 집결", intro: "", obs: ["추천 전투력은 집결 전체 기준이야.", "집결 전투력 ≈ 대장의 병력당 전투력 × 집결 전체 병력.", "다친 병력은 거의 다 경상이야."], obsH: "🔎 우리가 관찰한 것", do: ["집결 전체가 추천 전투력에 닿아야 해.", "능력치가 가장 강한 사람이 대장을 해.", "집결을 꽉 채워.", "1배면 이김; 1.5배면 덜 다침; 절반 미만이면 시작하지 마."], doH: "💡 제안",
    badge: "🔬 우리 연구 · 업데이트 {d}", st: { ok: "✅ 확실", mid: "🟡 추정" },
    heroH: "집결 전투력을 추천 전투력과 비교해.", heroP: "괴수 팝업에 추천 전투력이 나와. 행군 하나가 아니라 집결 전체 기준이야.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 레벨별", lvCols: ["Lv", "괴수", "병력 (보병 / 기병 / 궁병)", "티어", "전체 능력치", "추천 전투력"], lvNote: "Lv1–2는 이제 지도에 없어.",
    howH: "🔢 어떻게 계산했는지", how: "집결 전투력 ≈ 대장 출정 전투력 ÷ 대장 출정 용량 × 집결 전체 병력", howP: "대장 출정 화면 위쪽의 두 숫자 (영웅 3명, 병력 가득).",
    ratH: "📏 집결 전투력 ÷ 추천 전투력", rat: { easy: "1.5배 이상: 쉬움 — 10% 미만 부상", win: "약 1배: 이김, 20–30% 부상", hard: "약 0.7배: 겨우 이김, 절반쯤 부상", lose: "0.5배 미만: 짐" },
    short: { easy: "쉬움", win: "이김", hard: "겨우", lose: "짐" }, calcH: "🧮 계산해 보기", cPow: "대장 출정 전투력 (M)", cCap: "대장 출정 용량", cTr: "집결 전체 병력", cRes: "집결 전투력 ≈ {p}", cCols: ["Lv", "괴수", "추천의 몇 배", ""],
    cNote: "참여자 병력 티어가 대장이랑 비슷해야 해. 대략적인 기준이야.",
    needH: "📊 병력을 얼마나 모아야 해?", needP: "추천 전투력 1배에 닿으려면 집결 병력이 대장 출정 용량의 몇 배인지:", needCol: "대장 출정 전투력",
    repH: "📑 사용한 전투 보고서", repCols: ["Lv", "계정", "집결 병력", "추천의 몇 배", "부상", "결과"], acc: { main: "Sparrow 본계정", alt: "Sparrow 부계정" }, won: "승리", lost: "패배 — 괴수 −{g}%",
    repNote: "본계정: 출정 170M / 136,710 → 집결 ≈ 1,279M. 부계정: 38.9M / 100,955 → 약 195M.",
    factH: "📌 알아 두면 좋은 것", facts: [["ok", "괴수 집결은 참여자가 있어야 출발해."], ["ok", "기병은 안 쓰러지고, 보병과 궁병이 쓰러져."], ["mid", "추천 전투력은 \"겨우 이기는\" 전투력의 약 1.25배."]],
    unkH: "🟡 아직 모르는 것", unks: ["다른 대장도 같은 숫자에 맞는지 (지금은 계정 두 개로 계산).", "참여자 티어가 낮을 때 (T8 / T9) 집결이 얼마나 약해지는지.", "괴수 상대 최적 병종 비율.", "출정 전투력이 도시 버프 같은 버프로 바뀌는지."],
    more: "간부: 집결과 방어 연구 → ⚔️", foot: "출처: Sparrow 계정 두 개, 괴수 전투 보고서 13개 (11/11) + 괴수 팝업. 게임 설명이 아니라 숫자로 역산한 것." }
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const S = { pow: 100, cap: 120000, tr: 1000000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-tb") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-tb", JSON.stringify(S)); } catch (e) {} };
const nf = (n) => Math.round(n).toLocaleString("en-US");
const big = (n) => n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : n >= 1e6 ? (n / 1e6).toFixed(n >= 1e8 ? 0 : 1) + "M" : nf(n);
const x1 = (r) => (r >= 10 ? r.toFixed(0) : r.toFixed(r >= 1 ? 1 : 2)) + "×";
const st = (c) => c === "mid" ? `<span class="tb-st ${c}">${esc(t("st")[c])}</span>` : "";
const pill = (r) => { const b = band(r); return `<span class="tb-pl ${b}">${esc(t("short")[b])}</span>`; };

function calcHtml() {
  const p = rallyPow(S.pow * 1e6, S.cap || 1, S.tr);
  return `<div class="tb-in"><label>${esc(t("cPow"))}<input class="inp" type="number" min="1" step="1" id="tb_pow" value="${S.pow}"></label>
      <label>${esc(t("cCap"))}<input class="inp" type="number" min="1000" step="1000" id="tb_cap" value="${S.cap}"></label>
      <label>${esc(t("cTr"))}<input class="inp" type="number" min="1000" step="10000" id="tb_tr" value="${S.tr}"></label></div>
    <div class="tb-res">${esc(t("cRes").replace("{p}", big(p)))}</div>
    <div style="overflow-x:auto"><table class="tb-t"><thead><tr>${t("cCols").map((c, i) => `<th${i === 2 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${LV.map(([lv, k, , , , rp]) => { const r = p / rp; return `<tr class="${band(r)}"><td>${lv}</td><td>${esc(t("beasts")[k])}</td><td class="n"><b>${x1(r)}</b></td><td>${pill(r)}</td></tr>`; }).join("")}</tbody></table></div>`;
}
function render() {
  const root = $("tb_root"); if (!root) return;
  const POWS = [40, 60, 80, 100, 130, 170, 200];
  root.innerHTML = `
  <div class="muted tb-small" style="margin:2px 0 10px">${esc(t("badge").replace("{d}", UPDATED))}</div>
  <div class="card rs-do"><h3>${esc(t("obsH"))}</h3><ul class="rs-dol">${t("obs").map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h3 class="rs-h2">${esc(t("doH"))}</h3><ul class="rs-dol">${t("do").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("ratH"))}</h3><div class="tb-bands">${["easy", "win", "hard", "lose"].map((b) => `<div class="tb-band ${b}">${esc(t("rat")[b])}</div>`).join("")}</div>
    <h4 class="tb-h4">${esc(t("calcH"))}</h4><p class="tb-eq">${esc(t("how"))}</p><p class="tb-p">${esc(t("howP"))}</p><div id="tb_calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("needH"))}</h3><p class="tb-p">${esc(t("needP"))}</p><div style="overflow-x:auto"><table class="tb-t"><thead><tr><th>${esc(t("needCol"))}</th>${LV.slice(1).map(([lv, k]) => `<th class="n">${lv} ${esc(t("beasts")[k])}</th>`).join("")}</tr></thead>
    <tbody>${POWS.map((m) => `<tr><td><b>${m}M</b></td>${LV.slice(1).map(([, , , , , rp]) => { const v = rp / (m * 1e6); return `<td class="n${v > 7.5 ? " tb-far" : ""}">${v >= 10 ? v.toFixed(0) : v.toFixed(1)}×</td>`; }).join("")}</tr>`).join("")}</tbody></table></div></div>
  <div class="card"><h3>${esc(t("lvH"))}</h3><div style="overflow-x:auto"><table class="tb-t"><thead><tr>${t("lvCols").map((c, i) => `<th${i > 3 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${LV.map(([lv, k, tr, tier, b, rp]) => `<tr><td>${lv}</td><td>${esc(t("beasts")[k])}</td><td>${esc(tr)}</td><td>${tier}</td><td class="n">+${b}%</td><td class="n"><b>${nf(rp)}</b></td></tr>`).join("")}</tbody></table></div></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="tb-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("howH"))}</b></summary><p class="tb-p" style="margin-top:8px">${esc(t("facts").filter(([c]) => c === "mid").map(([c, x]) => x).join(" "))}</p>
    <h4 class="tb-h4">${esc(t("repH"))}</h4><div style="overflow-x:auto;margin-top:8px"><table class="tb-t"><thead><tr>${t("repCols").map((c, i) => `<th${i > 1 && i < 5 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${REP.map(([lv, a, n, f, w, g]) => { const r = rallyPow(ACC[a][0], ACC[a][1], n) / LV.find((x) => x[0] === lv)[5]; return `<tr class="${band(r)}"><td>${lv}</td><td>${esc(t("acc")[a])}</td><td class="n">${nf(n)}</td><td class="n">${x1(r)}</td><td class="n">${w ? f + "%" : "—"}</td><td>${esc(w ? t("won") : t("lost").replace("{g}", g))}</td></tr>`; }).join("")}</tbody></table></div>
    <p class="muted tb-small">${esc(t("repNote"))}</p>
    <div class="muted tb-small">${esc(t("foot"))}</div></details>
  `;
  bind();
}
function bind() {
  const set = (id, k, min) => { const el = $(id); if (el) el.oninput = () => { const v = +el.value; if (!(v >= min)) return; S[k] = v; keep(); const c = $("tb_calc"); const f = document.activeElement && document.activeElement.id;
    c.innerHTML = calcHtml(); bind(); const n = f && $(f); if (n) { n.focus(); try { n.setSelectionRange(n.value.length, n.value.length); } catch (e) {} } }; };
  set("tb_pow", "pow", 1); set("tb_cap", "cap", 1000); set("tb_tr", "tr", 1000);
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("tb_title")) { $("tb_title").textContent = t("title"); $("tb_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.tb = { init, applyTexts, setLang };
})();
