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
  en: { title: "🦣 Terror rallies", intro: "Our research on how big a rally each Terror level needs. Not official — from 13 battle reports on Sparrow's two accounts; still being tested.",
    badge: "🔬 Research · 13 battle reports (Lv3–Lv8) · updated {d}", st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "Compare your rally's power with the Recommended Power.", heroP: "The Terror pop-up shows a Recommended Power. It is for the whole rally, not one march. Work out your rally's power, see how many times the Recommended Power it is, and you know if you win and how many troops get hurt.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 The levels", lvCols: ["Lv", "Terror", "Troops (inf / cav / arc)", "Tier", "All stats", "Recommended Power"], lvNote: "Lv1–2 are no longer on the map. Each level: stats about +110%, troops one tier higher.",
    howH: "🧮 Your rally's power", how: "Rally power ≈ the leader's march power ÷ the leader's march capacity × all troops in the rally", howP: "March power and capacity = the numbers at the top of the leader's march page with 3 heroes and a full march. The battle uses only the leader's stats, so use the leader's power per troop — not everyone's power added up.",
    ratH: "📏 Rally power ÷ Recommended Power", rat: { easy: "1.5× or more: easy — under 10% hurt", win: "about 1×: you win, 20–30% hurt", hard: "about 0.7×: barely win, about half hurt", lose: "under 0.5×: you lose" },
    short: { easy: "easy", win: "win, 20–30% hurt", hard: "barely", lose: "lose" }, calcH: "🧮 Try a rally", cPow: "Leader's march power (M)", cCap: "Leader's march capacity", cTr: "All troops in the rally", cRes: "Rally power ≈ {p}", cCols: ["Lv", "Terror", "× Recommended", ""],
    cNote: "Joiners' troops should be about the leader's tier. Rough: about ±30%.",
    needH: "📊 How full must the rally be?", needP: "Troops needed = how many times the leader's own march capacity, to reach 1× the Recommended Power (win, 20–30% hurt). Want it easy? ×1.5.", needCol: "Leader's march power",
    repH: "📑 The battle reports behind it", repCols: ["Lv", "Account", "Rally troops", "× Recommended", "Hurt", "Result"], acc: { main: "Sparrow main", alt: "Sparrow alt" }, won: "won", lost: "lost — beast −{g}%",
    repNote: "Main account: march 170M / 136,710 → rally ≈ 1,279M. Alt: 38.9M / 100,955 → rally ≈ 195M.",
    factH: "✅ What we know", facts: [["ok", "A Terror rally always needs joiners — you can't go alone."], ["ok", "It's a normal rally: one leader's stats; joiners bring troops and their first hero's skill."], ["ok", "Almost everyone hurt is only lightly injured; we lost no troops in 13 reports. The real cost is march time and waiting for troops to heal."], ["ok", "Cavalry didn't fall; infantry and archers did — infantry takes the hits."], ["mid", "The Recommended Power is about 1.25× the power that only just wins."]],
    unkH: "🟡 Not known yet", unks: ["Whether other leaders fit the same numbers (so far worked out from two accounts).", "How much weaker joiners (T8 / T9) pull the rally down.", "Best troop mix against a Terror.", "Does the march power change with City Bonus and other buffs?"],
    more: "Officers: Rally & Garrison report → ⚔️", foot: "Source: Sparrow's two accounts, 13 Terror battle reports (11/11) + the Terror pop-ups. Worked back from the numbers, not from the game." },
  zh: { title: "🦣 巨獸集結", intro: "我們自己研究的：每一級巨獸要多大的集結才打得贏。不是官方說明——來自 Sparrow 兩個帳號 13 份戰報，還在測。",
    badge: "🔬 研究中 · 13 份戰報（3–8 級）· 更新 {d}", st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "把你這團的集結戰力跟「推薦實力」比。", heroP: "巨獸彈窗會寫推薦實力，比的是整團，不是一支部隊。把你這團的集結戰力算出來，看它是推薦實力的幾倍，就知道打不打得贏、會傷多少兵。",
    beasts: { moose: "巨型駝鹿", panther: "巨型黑豹", lion: "巨型白獅", elephant: "巨型戰象", bear: "巨型戰熊", roc: "泰坦巨鳥" },
    lvH: "📋 各等級", lvCols: ["等級", "巨獸", "兵數（步／騎／弓）", "兵等", "全屬性", "推薦實力"], lvNote: "1、2 級地圖上已經沒有了。每升一級：屬性約 +110%，兵等升一階。",
    howH: "🧮 你這團的集結戰力", how: "集結戰力 ≈ 隊長出征戰力 ÷ 隊長出征容量 × 整團總兵數", howP: "出征戰力和出征容量 = 隊長帶 3 位英雄、派滿兵時，出征頁上方的兩個數字。戰鬥只用隊長的屬性，所以要用「隊長的每兵戰力」，不是把每個人的戰力加起來。",
    ratH: "📏 集結戰力 ÷ 推薦實力", rat: { easy: "1.5 倍以上：輕鬆，傷不到 10%", win: "約 1 倍：會贏，傷 20–30%", hard: "約 0.7 倍：勉強贏，傷一半左右", lose: "不到 0.5 倍：會輸" },
    short: { easy: "輕鬆", win: "會贏，傷 20–30%", hard: "勉強", lose: "會輸" }, calcH: "🧮 算算看", cPow: "隊長出征戰力（M）", cCap: "隊長出征容量", cTr: "整團總兵數", cRes: "集結戰力 ≈ {p}", cCols: ["等級", "巨獸", "推薦實力的幾倍", ""],
    cNote: "加入者的兵等要跟隊長差不多。粗估，誤差約 ±30%。",
    needH: "📊 要湊多少兵？", needP: "整團總兵數要是「隊長自己出征容量」的幾倍，才到推薦實力 1 倍（會贏、傷 20–30%）。想輕鬆打：再 ×1.5。", needCol: "隊長出征戰力",
    repH: "📑 用到的戰報", repCols: ["等級", "帳號", "集結兵數", "推薦實力的幾倍", "受傷", "結果"], acc: { main: "Sparrow 主帳", alt: "Sparrow 小帳" }, won: "贏", lost: "輸——巨獸只掉 {g}%",
    repNote: "主帳：出征 170M／136,710 → 集結戰力約 1,279M。小帳：38.9M／100,955 → 約 195M。",
    factH: "✅ 確定的", facts: [["ok", "巨獸集結一定要有人加入才能出發，沒辦法一個人打。"], ["ok", "跟一般集結一樣：只用隊長一個人的屬性；加入者出兵＋第一位英雄的技能。"], ["ok", "受傷的幾乎都是輕傷，13 份戰報都沒有損失兵。真正的成本是行軍時間和等傷兵恢復。"], ["ok", "騎兵沒有倒下，倒下的是步兵和弓兵——步兵在前面擋。"], ["mid", "推薦實力大約是「剛好打贏」的 1.25 倍。"]],
    unkH: "🟡 還不知道的", unks: ["其他隊長是不是也符合這些數字（目前用兩個帳號算出來）。", "加入者兵等比較低（T8／T9）時，整團會打多少折。", "打巨獸最好的兵種比例。", "出征戰力會不會跟著城鎮增益等加成變。"],
    more: "幹部：集結與駐防研究 → ⚔️", foot: "來源：Sparrow 兩個帳號 13 份巨獸戰報（11/11）＋巨獸彈窗。從數字反推，不是遊戲官方說明。" },
  pt: { title: "🦣 Rallies de Terror", intro: "Nossa pesquisa sobre o tamanho de rally que cada nível de Terror precisa. Não é oficial — vem de 13 relatórios de batalha das duas contas da Sparrow; ainda em teste.",
    badge: "🔬 Pesquisa · 13 relatórios de batalha (Nv3–Nv8) · atualizado {d}", st: { ok: "✅ certo", mid: "🟡 provável" },
    heroH: "Compare o poder do seu rally com o Poder Recomendado.", heroP: "O pop-up do Terror mostra um Poder Recomendado. Ele vale para o rally inteiro, não para uma marcha. Calcule o poder do seu rally, veja quantas vezes o Poder Recomendado ele dá, e você sabe se ganha e quantas tropas se ferem.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 Os níveis", lvCols: ["Nv", "Terror", "Tropas (inf / cav / arq)", "Nível", "Todos os atributos", "Poder Recomendado"], lvNote: "Nv1–2 não estão mais no mapa. A cada nível: atributos cerca de +110%, tropas um nível acima.",
    howH: "🧮 O poder do seu rally", how: "Poder do rally ≈ poder de marcha do líder ÷ capacidade de marcha do líder × todas as tropas do rally", howP: "Poder e capacidade de marcha = os números no topo da página de marcha do líder, com 3 heróis e marcha cheia. A batalha usa só os atributos do líder, então use o poder por tropa do líder — não a soma do poder de todos.",
    ratH: "📏 Poder do rally ÷ Poder Recomendado", rat: { easy: "1.5× ou mais: fácil — menos de 10% feridos", win: "cerca de 1×: você ganha, 20–30% feridos", hard: "cerca de 0.7×: ganha por pouco, cerca de metade feridos", lose: "abaixo de 0.5×: você perde" },
    short: { easy: "fácil", win: "ganha, 20–30% feridos", hard: "por pouco", lose: "perde" }, calcH: "🧮 Teste um rally", cPow: "Poder de marcha do líder (M)", cCap: "Capacidade de marcha do líder", cTr: "Todas as tropas do rally", cRes: "Poder do rally ≈ {p}", cCols: ["Nv", "Terror", "× Recomendado", ""],
    cNote: "As tropas dos participantes devem ser mais ou menos do nível do líder. Estimativa: cerca de ±30%.",
    needH: "📊 Quão cheio o rally precisa estar?", needP: "Tropas necessárias = quantas vezes a capacidade de marcha do próprio líder, para chegar a 1× o Poder Recomendado (ganha, 20–30% feridos). Quer fácil? ×1.5.", needCol: "Poder de marcha do líder",
    repH: "📑 Os relatórios de batalha usados", repCols: ["Nv", "Conta", "Tropas do rally", "× Recomendado", "Feridos", "Resultado"], acc: { main: "Sparrow principal", alt: "Sparrow secundária" }, won: "ganhou", lost: "perdeu — fera −{g}%",
    repNote: "Conta principal: marcha 170M / 136,710 → rally ≈ 1,279M. Secundária: 38.9M / 100,955 → rally ≈ 195M.",
    factH: "✅ O que sabemos", facts: [["ok", "Um rally de Terror sempre precisa de participantes — não dá para ir sozinho."], ["ok", "É um rally normal: atributos de um só líder; participantes trazem tropas e a habilidade do primeiro herói."], ["ok", "Quase todos os feridos são só levemente feridos; não perdemos tropas em 13 relatórios. O custo real é o tempo de marcha e esperar as tropas se curarem."], ["ok", "A Cavalaria não caiu; Infantaria e Arquearia sim — a Infantaria recebe os golpes."], ["mid", "O Poder Recomendado é cerca de 1.25× o poder que mal ganha."]],
    unkH: "🟡 Ainda não sabemos", unks: ["Se outros líderes seguem os mesmos números (até agora calculado com duas contas).", "Quanto participantes mais fracos (T8 / T9) puxam o rally para baixo.", "Melhor mistura de tropas contra um Terror.", "O poder de marcha muda com o Bônus da Cidade e outros bônus?"],
    more: "Oficiais: estudo de Rally e Guarnição → ⚔️", foot: "Fonte: as duas contas da Sparrow, 13 relatórios de batalha de Terror (11/11) + os pop-ups de Terror. Calculado a partir dos números, não vem do jogo." },
  ar: { title: "🦣 حشود الوحوش العملاقة", intro: "بحثنا عن حجم الحشد الذي يحتاجه كل مستوى من الوحوش العملاقة. ليس رسميًا — من 13 تقرير معركة على حسابَي Sparrow؛ ما زال قيد الاختبار.",
    badge: "🔬 بحث · 13 تقرير معركة (Lv3–Lv8) · آخر تحديث {d}", st: { ok: "✅ مؤكد", mid: "🟡 مرجّح" },
    heroH: "قارن قوة حشدك بالقوة الموصى بها.", heroP: "نافذة الوحش العملاق تعرض القوة الموصى بها. وهي للحشد كله، لا لزحف واحد. احسب قوة حشدك، وانظر كم ضعفًا هي من القوة الموصى بها، فتعرف هل تفوز وكم من قواتك يُصاب.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 المستويات", lvCols: ["Lv", "الوحش", "القوات (مشاة / فرسان / رماة)", "المستوى", "كل الإحصاءات", "القوة الموصى بها"], lvNote: "Lv1–2 لم تعد على الخريطة. كل مستوى: الإحصاءات نحو +110%، والقوات أعلى بدرجة.",
    howH: "🧮 قوة حشدك", how: "قوة الحشد ≈ قوة زحف القائد ÷ سعة زحف القائد × كل القوات في الحشد", howP: "قوة الزحف وسعته = الرقمان في أعلى صفحة زحف القائد مع 3 أبطال وزحف ممتلئ. المعركة تستخدم إحصاءات القائد فقط، لذا استخدم قوة القائد لكل جندي — لا مجموع قوة الجميع.",
    ratH: "📏 قوة الحشد ÷ القوة الموصى بها", rat: { easy: "1.5× أو أكثر: سهل — أقل من 10% مصابون", win: "نحو 1×: تفوز، 20–30% مصابون", hard: "نحو 0.7×: فوز بصعوبة، نحو النصف مصابون", lose: "أقل من 0.5×: تخسر" },
    short: { easy: "سهل", win: "فوز، 20–30% مصابون", hard: "بصعوبة", lose: "خسارة" }, calcH: "🧮 جرّب حشدًا", cPow: "قوة زحف القائد (M)", cCap: "سعة زحف القائد", cTr: "كل القوات في الحشد", cRes: "قوة الحشد ≈ {p}", cCols: ["Lv", "الوحش", "× الموصى بها", ""],
    cNote: "قوات المنضمّين يجب أن تكون قريبة من مستوى القائد. تقدير: نحو ±30%.",
    needH: "📊 كم يجب أن يمتلئ الحشد؟", needP: "القوات المطلوبة = كم ضعفًا من سعة زحف القائد نفسه، للوصول إلى 1× القوة الموصى بها (فوز، 20–30% مصابون). تريده سهلًا؟ ×1.5.", needCol: "قوة زحف القائد",
    repH: "📑 تقارير المعارك المستخدمة", repCols: ["Lv", "الحساب", "قوات الحشد", "× الموصى بها", "المصابون", "النتيجة"], acc: { main: "Sparrow الرئيسي", alt: "Sparrow الثانوي" }, won: "فوز", lost: "خسارة — الوحش −{g}%",
    repNote: "الحساب الرئيسي: زحف 170M / 136,710 → حشد ≈ 1,279M. الثانوي: 38.9M / 100,955 → حشد ≈ 195M.",
    factH: "✅ ما نعرفه", facts: [["ok", "حشد الوحش العملاق يحتاج دائمًا منضمّين — لا يمكنك الذهاب وحدك."], ["ok", "إنه حشد عادي: إحصاءات قائد واحد؛ المنضمّون يجلبون القوات ومهارة البطل الأول."], ["ok", "كل المصابين تقريبًا إصاباتهم خفيفة؛ لم نخسر أي قوات في 13 تقريرًا. التكلفة الحقيقية هي وقت الزحف وانتظار شفاء القوات."], ["ok", "الفرسان لم يسقطوا؛ المشاة والرماة سقطوا — المشاة تتلقى الضربات."], ["mid", "القوة الموصى بها نحو 1.25× القوة التي تفوز بالكاد."]],
    unkH: "🟡 غير معروف بعد", unks: ["هل يطابق القادة الآخرون الأرقام نفسها (محسوبة حتى الآن من حسابين).", "كم يُضعف المنضمّون الأضعف (T8 / T9) الحشد.", "أفضل خليط قوات ضد الوحش العملاق.", "هل تتغير قوة الزحف مع مكافأة المدينة والمكافآت الأخرى؟"],
    more: "الضباط: دراسة الحشد والحامية → ⚔️", foot: "المصدر: حسابا Sparrow، 13 تقرير معركة مع الوحوش العملاقة (11/11) + نوافذ الوحوش. محسوبة من الأرقام، وليست من اللعبة." },
  ko: { title: "🦣 괴수 집결", intro: "괴수 레벨마다 얼마나 큰 집결이 필요한지 우리가 연구한 거야. 공식 아님 — Sparrow 계정 두 개의 전투 보고서 13개에서 나왔고, 아직 테스트 중.",
    badge: "🔬 연구 중 · 전투 보고서 13개 (Lv3–Lv8) · 업데이트 {d}", st: { ok: "✅ 확실", mid: "🟡 추정" },
    heroH: "집결 전투력을 추천 전투력과 비교해.", heroP: "괴수 팝업에 추천 전투력이 나와. 행군 하나가 아니라 집결 전체 기준이야. 집결 전투력을 계산해서 추천 전투력의 몇 배인지 보면, 이길지와 병력이 얼마나 다칠지 알 수 있어.",
    beasts: { moose: "Great Moose", panther: "Alpha Black Panther", lion: "Regal White Lion", elephant: "Ironclad War Elephant", bear: "Ironclad War Bear", roc: "Titan Roc" },
    lvH: "📋 레벨별", lvCols: ["Lv", "괴수", "병력 (보병 / 기병 / 궁병)", "티어", "전체 능력치", "추천 전투력"], lvNote: "Lv1–2는 이제 지도에 없어. 레벨마다 능력치 약 +110%, 병력 티어 한 단계 위.",
    howH: "🧮 집결 전투력", how: "집결 전투력 ≈ 대장 출정 전투력 ÷ 대장 출정 용량 × 집결 전체 병력", howP: "출정 전투력과 용량 = 대장이 영웅 3명에 병력을 꽉 채웠을 때 출정 화면 위쪽의 두 숫자. 전투는 대장 능력치만 쓰니까, 모두의 전투력을 더하지 말고 대장의 병력당 전투력을 써.",
    ratH: "📏 집결 전투력 ÷ 추천 전투력", rat: { easy: "1.5배 이상: 쉬움 — 10% 미만 부상", win: "약 1배: 이김, 20–30% 부상", hard: "약 0.7배: 겨우 이김, 절반쯤 부상", lose: "0.5배 미만: 짐" },
    short: { easy: "쉬움", win: "이김, 20–30% 부상", hard: "겨우", lose: "짐" }, calcH: "🧮 계산해 보기", cPow: "대장 출정 전투력 (M)", cCap: "대장 출정 용량", cTr: "집결 전체 병력", cRes: "집결 전투력 ≈ {p}", cCols: ["Lv", "괴수", "추천의 몇 배", ""],
    cNote: "참여자 병력 티어가 대장이랑 비슷해야 해. 대략, 약 ±30%.",
    needH: "📊 병력을 얼마나 모아야 해?", needP: "필요한 병력 = 대장 자신의 출정 용량의 몇 배인지. 추천 전투력 1배 (이김, 20–30% 부상) 기준. 쉽게 이기려면 ×1.5.", needCol: "대장 출정 전투력",
    repH: "📑 사용한 전투 보고서", repCols: ["Lv", "계정", "집결 병력", "추천의 몇 배", "부상", "결과"], acc: { main: "Sparrow 본계정", alt: "Sparrow 부계정" }, won: "승리", lost: "패배 — 괴수 −{g}%",
    repNote: "본계정: 출정 170M / 136,710 → 집결 ≈ 1,279M. 부계정: 38.9M / 100,955 → 약 195M.",
    factH: "✅ 확실한 것", facts: [["ok", "괴수 집결은 꼭 참여자가 있어야 출발해 — 혼자는 못 가."], ["ok", "일반 집결이랑 같아: 대장 한 명의 능력치만 쓰고, 참여자는 병력 + 첫 번째 영웅 스킬."], ["ok", "다친 병력은 거의 다 경상이고, 보고서 13개에서 잃은 병력은 없어. 진짜 비용은 행군 시간과 부상병 회복 대기."], ["ok", "기병은 안 쓰러졌고, 보병과 궁병이 쓰러졌어 — 보병이 앞에서 막아."], ["mid", "추천 전투력은 \"겨우 이기는\" 전투력의 약 1.25배."]],
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
const st = (c) => `<span class="tb-st ${c}">${esc(t("st")[c])}</span>`;
const pill = (r) => { const b = band(r); return `<span class="tb-pl ${b}">${esc(t("short")[b])}</span>`; };

function calcHtml() {
  const p = rallyPow(S.pow * 1e6, S.cap || 1, S.tr);
  return `<div class="tb-in"><label>${esc(t("cPow"))}<input class="inp" type="number" min="1" step="1" id="tb_pow" value="${S.pow}"></label>
      <label>${esc(t("cCap"))}<input class="inp" type="number" min="1000" step="1000" id="tb_cap" value="${S.cap}"></label>
      <label>${esc(t("cTr"))}<input class="inp" type="number" min="1000" step="10000" id="tb_tr" value="${S.tr}"></label></div>
    <div class="tb-res">${esc(t("cRes").replace("{p}", big(p)))}</div>
    <div style="overflow-x:auto"><table class="tb-t"><thead><tr>${t("cCols").map((c, i) => `<th${i === 2 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${LV.map(([lv, k, , , , rp]) => { const r = p / rp; return `<tr class="${band(r)}"><td>${lv}</td><td>${esc(t("beasts")[k])}</td><td class="n"><b>${x1(r)}</b></td><td>${pill(r)}</td></tr>`; }).join("")}</tbody></table></div>
    <div class="muted tb-small">${esc(t("cNote"))}</div>`;
}
function render() {
  const root = $("tb_root"); if (!root) return;
  const POWS = [40, 60, 80, 100, 130, 170, 200];
  root.innerHTML = `
  <div class="tb-hero"><span class="tb-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="card"><h3>${esc(t("lvH"))}</h3><div style="overflow-x:auto"><table class="tb-t"><thead><tr>${t("lvCols").map((c, i) => `<th${i > 3 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${LV.map(([lv, k, tr, tier, b, rp]) => `<tr><td>${lv}</td><td>${esc(t("beasts")[k])}</td><td>${esc(tr)}</td><td>${tier}</td><td class="n">+${b}%</td><td class="n"><b>${nf(rp)}</b></td></tr>`).join("")}</tbody></table></div>
    <p class="muted tb-small" style="margin:8px 0 0">${esc(t("lvNote"))}</p></div>
  <div class="card"><h3>${esc(t("howH"))}</h3><p class="tb-eq">${st("mid")} ${esc(t("how"))}</p><p class="tb-p">${esc(t("howP"))}</p>
    <h4 class="tb-h4">${esc(t("ratH"))}</h4><div class="tb-bands">${["easy", "win", "hard", "lose"].map((b) => `<div class="tb-band ${b}">${esc(t("rat")[b])}</div>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("calcH"))}</h3><div id="tb_calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("needH"))}</h3><p class="tb-p">${esc(t("needP"))}</p><div style="overflow-x:auto"><table class="tb-t"><thead><tr><th>${esc(t("needCol"))}</th>${LV.slice(1).map(([lv, k]) => `<th class="n">${lv} ${esc(t("beasts")[k])}</th>`).join("")}</tr></thead>
    <tbody>${POWS.map((m) => `<tr><td><b>${m}M</b></td>${LV.slice(1).map(([, , , , , rp]) => { const v = rp / (m * 1e6); return `<td class="n${v > 7.5 ? " tb-far" : ""}">${v >= 10 ? v.toFixed(0) : v.toFixed(1)}×</td>`; }).join("")}</tr>`).join("")}</tbody></table></div></div>
  <div class="card"><h3>${esc(t("factH"))}</h3><ul class="tb-ul">${t("facts").map(([c, x]) => `<li>${st(c)} ${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("repH"))}</b></summary><div style="overflow-x:auto;margin-top:8px"><table class="tb-t"><thead><tr>${t("repCols").map((c, i) => `<th${i > 1 && i < 5 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${REP.map(([lv, a, n, f, w, g]) => { const r = rallyPow(ACC[a][0], ACC[a][1], n) / LV.find((x) => x[0] === lv)[5]; return `<tr class="${band(r)}"><td>${lv}</td><td>${esc(t("acc")[a])}</td><td class="n">${nf(n)}</td><td class="n">${x1(r)}</td><td class="n">${w ? f + "%" : "—"}</td><td>${esc(w ? t("won") : t("lost").replace("{g}", g))}</td></tr>`; }).join("")}</tbody></table></div>
    <p class="muted tb-small">${esc(t("repNote"))}</p></details>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="tb-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <p class="muted tb-small"><a href="#rg">${esc(t("more"))}</a></p>
  <div class="muted tb-small">${esc(t("foot"))}</div>`;
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
