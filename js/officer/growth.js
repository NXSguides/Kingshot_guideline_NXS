/* NXS officer page — 🧭 Growth plan (registers OFFICER_PAGES.growth; own tab, nobody by default, admins always).
   Sherry, 2026-10-31: Armada wants to decide who builds attack and who builds defense. Before any names, this page shows the
   proposal for a shared way to grow (from Project doc claude/kingshot-attack-vs-defense.md), for Armada and Nia to read.
   Read-only text, no data. Hero details link to the main site's 🃏 Hero Cards. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const T = {
  en: { title: "🧭 Attack vs Defense", intro: "For reference: what an attack (rally) leader and a defense (garrison) leader need, Gen 1–5, from our battle reports and simulations.",
    cmpT: "Side by side", cmpH: ["", "⚔️ Attack — rally leader", "🛡️ Defense — garrison lead"],
    cmp: [["Most important", "Rally capacity — one big rally beats two small ones", "Garrison capacity — how many troops can hold the building"],
      ["Whose stats count", "The rally leader's", "The strongest person inside"],
      ["Widget type", "Offensive (rally)", "Defensive (garrison)"],
      ["Troop ratio", "50:20:30 · Infantry ≥ 40%", "High infantry (infantry is the wall)"],
      ["Joiner skills", "First 4 people with a hero: 2 Attack + 2 Lethality", "Probably also the first 4 (not confirmed): best 2 Gordon + 2 Howard"],
      ["Tactics / losses", "Strong target: expendable rallies first, the strongest leader last", "The lead takes ~32% more losses — Infirmary ready"],
      ["Bonus", "—", "Defensive Widgets also work when your own city is attacked"]],
    heroT: "Heroes for each side", heroNote: "Grouped by troop. The tag = what the Widget adds in rallies or garrisons; → = upgrade path.",
    st: { atk: "Attack", leth: "Lethality", def: "Defense", hp: "Health" }, tag: { paid: "paid", roulette: "Hero Roulette", heavy: "heavy spend", free: "free" },
    trp: { inf: "🛡️ Infantry", cav: "🐎 Cavalry", arc: "🏹 Archer" },
    gearT: "⚙️ Stats & gear (both sides)", rule: "Strength = (1 + Attack)(1 + Lethality) × (1 + Defense)(1 + Health). +1 point is worth about 1 ÷ (100 + its current %) — so the LOWER stat gives more. Most leaders have Attack / Defense far above Lethality / Health.",
    ordT: "What to raise first", ordAD: ["Infantry Health", "Cavalry / archer Lethality", "Infantry Defense", "Cavalry / archer Attack", "Cavalry Health / Defense (no use)"], ordBear: ["Archer Lethality", "Archer Attack", "Cavalry", "Infantry"],
    ordADl: "⚔️🛡️ Attack & defense leaders", ordBearl: "🐻 Bear lead",
    srcT: "Where Lethality + Health come from (first)", srcH: ["Source", "Gives", "Note"],
    src: [["Governor gems", "That troop's Lethality + Health", "Lv2 12%, Lv3 16% each"], ["Hero gear", "Helmet, boots = Lethality · Gloves, chest = Health", "Enhance first, then mastery"], ["Widget stats", "That hero's troop Lethality + Health", "First levels need 5, 10, 15 parts — the cheapest 1%"], ["Hero talent", "e.g. all troops Lethality, Health", "Max level and stars"], ["Pets", "Enemy Lethality / Health −", "Weakens the other side"]],
    src2T: "Attack + Defense (second)", src2: ["Governor Gear", "Hero level & stars (+200% to +444%)", "Research", "Master"],
    gearNote: "Hero gear and Widget stats only count when that hero marches — build the 3 heroes you lead with.",
    whoT: "Who fits which side (a suggestion, not a rule)", whoA: ["Highest board strength (Governor Gear + hero gear + Master)", "Offensive-Widget heroes in hand: Amadeus, Petra, Marlin / Rosa"], whoD: ["Big garrison capacity", "Often in our garrisons — and the strongest there", "Defensive-Widget heroes: Jabel, Zoe / Eric, Jaeger"], whoB: "Both: go to the side your already-built Widgets belong to.",
    cards: "🃏 Every hero, rated for each role → Hero Cards", src0: "From our battle reports, Bear analysis, simulations and hero skills (2026-10-31)." },
  zh: { title: "🧭 進攻 vs 防守", intro: "參考用：進攻（集結隊長）和防守（駐防帶頭）各自需要什麼，第 1–5 代，根據我們的戰報和模擬。",
    cmpT: "左右對照", cmpH: ["", "⚔️ 進攻——集結隊長", "🛡️ 防守——駐防帶頭"],
    cmp: [["最重要", "集結容量——一大團比兩小團強", "駐防容量——建築裡能放多少兵"],
      ["用誰的屬性", "集結隊長的", "守軍裡最強的人"],
      ["零件派別", "集結派", "守城派"],
      ["兵種比例", "50:20:30・步兵 ≥ 40%", "步兵多（步兵是牆）"],
      ["加入者技能", "前 4 個帶英雄的人：2 攻擊＋2 殺傷", "可能也是前 4 個（還沒確認）：最好 2 戈登＋2 霍華德"],
      ["戰術／傷亡", "打強目標：可犧牲的團先上，最強的隊長最後", "帶頭者多扛約 32% 傷亡——醫院先準備"],
      ["額外好處", "—", "守城派零件在自己的城被打時也有用"]],
    heroT: "兩邊各用哪些英雄", heroNote: "依兵種分。標籤＝零件在集結或駐防時加什麼；→＝升級路線。",
    st: { atk: "攻擊", leth: "殺傷", def: "防禦", hp: "生命" }, tag: { paid: "付費", roulette: "英雄轉盤", heavy: "重課", free: "免費" },
    trp: { inf: "🛡️ 步兵", cav: "🐎 騎兵", arc: "🏹 弓兵" },
    gearT: "⚙️ 屬性和裝備（攻守通用）", rule: "戰鬥強度 = (1+攻擊)(1+殺傷) × (1+防禦)(1+生命)。某一項 +1 個百分點 ≈ 1 ÷ (100 + 目前%)——所以目前越低的那項越划算。大部分隊長的攻擊、防禦遠高於殺傷、生命。",
    ordT: "先練哪個", ordAD: ["步兵生命", "騎、弓殺傷", "步兵防禦", "騎、弓攻擊", "騎兵生命、防禦（沒用）"], ordBear: ["弓兵殺傷", "弓兵攻擊", "騎兵", "步兵"],
    ordADl: "⚔️🛡️ 進攻、防守隊長", ordBearl: "🐻 熊獵隊長",
    srcT: "殺傷、生命從哪裡來（優先）", srcH: ["來源", "給什麼", "說明"],
    src: [["領主寶石", "該兵種殺傷＋生命", "每顆 Lv2 12%、Lv3 16%"], ["英雄裝備", "頭盔、靴子＝殺傷・手套、胸甲＝生命", "先強化、再專精"], ["零件屬性", "該英雄兵種殺傷＋生命", "前幾級只要 5、10、15 個零件——每 1% 最便宜"], ["英雄天賦", "例：全體殺傷、生命", "滿級滿星"], ["寵物", "對方殺傷、生命 −", "讓對方變弱"]],
    src2T: "攻擊、防禦（其次）", src2: ["領主裝備", "英雄等級和星級（+200%～+444%）", "研究", "大師"],
    gearNote: "英雄裝備和零件屬性只在那位英雄出戰時才算——練自己當隊長時會帶的 3 位。",
    whoT: "誰適合哪邊（建議，不是規則）", whoA: ["排行榜強度最高（領主裝備＋英雄裝備＋大師）", "手上有集結派英雄：阿瑪迪斯、小佩拉、馬林／蘿莎"], whoD: ["駐防容量大", "常在駐防裡，而且是最強的", "手上有守城派英雄：潔貝爾、佐伊／艾瑞克、耶格爾"], whoB: "兩邊都一樣：零件已經練了哪一派，就往那一邊走。",
    cards: "🃏 每位英雄在各角色的評分 → 英雄卡", src0: "來自我們的戰報、熊獵分析、模擬和英雄技能（2026-10-31）。" },
  pt: { title: "🧭 Ataque vs Defesa", intro: "Para consulta: do que um líder de ataque (rally) e um de defesa (guarnição) precisam, Gen 1–5, pelos nossos relatórios e simulações.",
    cmpT: "Lado a lado", cmpH: ["", "⚔️ Ataque — líder de rally", "🛡️ Defesa — líder de guarnição"],
    cmp: [["Mais importante", "Capacidade de rally — um rally grande vence dois pequenos", "Capacidade de guarnição — quantas tropas seguram o prédio"],
      ["Atributos de quem", "Do líder do rally", "Da pessoa mais forte lá dentro"],
      ["Tipo de Ferramenta", "Ofensiva (rally)", "Defensiva (guarnição)"],
      ["Proporção", "50:20:30 · Infantaria ≥ 40%", "Muita infantaria (infantaria é o muro)"],
      ["Habilidades de participante", "4 primeiras pessoas com herói: 2 Ataque + 2 Letalidade", "Provavelmente também os 4 primeiros (não confirmado): melhor 2 Gordon + 2 Howard"],
      ["Tática / perdas", "Alvo forte: descartáveis primeiro, o líder mais forte por último", "O líder tem ~32% mais perdas — Enfermaria pronta"],
      ["Extra", "—", "Ferramentas defensivas também ajudam quando sua cidade é atacada"]],
    heroT: "Heróis de cada lado", heroNote: "Por tropa. A etiqueta = o que a Ferramenta soma em rally ou guarnição; → = caminho de evolução.",
    st: { atk: "Ataque", leth: "Letalidade", def: "Defesa", hp: "Vida" }, tag: { paid: "pago", roulette: "Roleta de Heróis", heavy: "muito gasto", free: "grátis" },
    trp: { inf: "🛡️ Infantaria", cav: "🐎 Cavalaria", arc: "🏹 Arquearia" },
    gearT: "⚙️ Atributos e equipamentos (os dois lados)", rule: "Força = (1 + Ataque)(1 + Letalidade) × (1 + Defesa)(1 + Vida). +1 ponto vale cerca de 1 ÷ (100 + o % atual) — o atributo MAIS BAIXO rende mais. A maioria dos líderes tem Ataque / Defesa bem acima de Letalidade / Vida.",
    ordT: "O que subir primeiro", ordAD: ["Vida da infantaria", "Letalidade da cavalaria / arquearia", "Defesa da infantaria", "Ataque da cavalaria / arquearia", "Vida / Defesa da cavalaria (inútil)"], ordBear: ["Letalidade da arquearia", "Ataque da arquearia", "Cavalaria", "Infantaria"],
    ordADl: "⚔️🛡️ Líderes de ataque e defesa", ordBearl: "🐻 Líder do Urso",
    srcT: "De onde vêm Letalidade + Vida (primeiro)", srcH: ["Fonte", "Dá", "Nota"],
    src: [["Gemas do Governador", "Letalidade + Vida da tropa", "Nv2 12%, Nv3 16% cada"], ["Equip. de herói", "Elmo, botas = Letalidade · Luvas, peitoral = Vida", "Aprimore primeiro, depois maestria"], ["Atributos da Ferramenta", "Letalidade + Vida da tropa do herói", "Primeiros níveis pedem 5, 10, 15 peças — o 1% mais barato"], ["Talento do herói", "ex.: Letalidade, Vida de todas as tropas", "Nível e estrelas máximos"], ["Pets", "Letalidade / Vida do inimigo −", "Enfraquece o outro lado"]],
    src2T: "Ataque + Defesa (depois)", src2: ["Equip. do Governador", "Nível e estrelas do herói (+200% a +444%)", "Pesquisa", "Mestre"],
    gearNote: "Equip. de herói e atributos da Ferramenta só contam quando o herói marcha — evolua os 3 com que você lidera.",
    whoT: "Quem combina com cada lado (sugestão, não regra)", whoA: ["Maior força nos rankings (Equip. do Governador + equip. de herói + Mestre)", "Heróis de Ferramenta ofensiva: Amadeus, Petra, Marlin / Rosa"], whoD: ["Grande capacidade de guarnição", "Costuma estar nas guarnições — e ser o mais forte lá", "Heróis de Ferramenta defensiva: Jabel, Zoe / Eric, Jaeger"], whoB: "Os dois: vá para o lado das Ferramentas que você já evoluiu.",
    cards: "🃏 Cada herói avaliado por função → Cartas de Heróis", src0: "Dos nossos relatórios de batalha, análise do Urso, simulações e habilidades (31/10/2026)." },
  ar: { title: "🧭 الهجوم مقابل الدفاع", intro: "للرجوع إليه: ما يحتاجه قائد الهجوم (الحشد) وقائد الدفاع (الحامية)، الأجيال 1–5، من تقارير معاركنا ومحاكاتنا.",
    cmpT: "جنبًا إلى جنب", cmpH: ["", "⚔️ الهجوم — قائد الحشد", "🛡️ الدفاع — قائد الحامية"],
    cmp: [["الأهم", "سعة الحشد — حشد كبير أفضل من حشدين صغيرين", "سعة الحامية — كم جنديًا يحمي المبنى"],
      ["إحصاءات من", "قائد الحشد", "أقوى شخص في الحامية"],
      ["نوع الأجزاء", "هجومية (حشد)", "دفاعية (حامية)"],
      ["نسبة القوات", "50:20:30 · المشاة ≥ 40%", "مشاة كثيرون (المشاة جدار)"],
      ["مهارات المنضمين", "أول 4 أشخاص لديهم بطل: 2 هجوم + 2 فتك", "على الأرجح أول 4 أيضًا (غير مؤكد): الأفضل 2 Gordon + 2 Howard"],
      ["التكتيك / الخسائر", "هدف قوي: الحشود القابلة للتضحية أولًا والأقوى أخيرًا", "القائد يتحمل ~32% خسائر أكثر — جهّز المستشفى"],
      ["ميزة", "—", "الأجزاء الدفاعية تفيد أيضًا عند مهاجمة مدينتك"]],
    heroT: "أبطال كل جهة", heroNote: "حسب القوات. الوسم = ما تضيفه الأجزاء في الحشد أو الحامية؛ → = مسار الترقية.",
    st: { atk: "هجوم", leth: "فتك", def: "دفاع", hp: "صحة" }, tag: { paid: "مدفوع", roulette: "عجلة الأبطال", heavy: "إنفاق كبير", free: "مجاني" },
    trp: { inf: "🛡️ المشاة", cav: "🐎 الفرسان", arc: "🏹 الرماة" },
    gearT: "⚙️ الإحصاءات والمعدات (للجهتين)", rule: "القوة = (1 + هجوم)(1 + فتك) × (1 + دفاع)(1 + صحة). نقطة إضافية تساوي تقريبًا 1 ÷ (100 + النسبة الحالية) — فالإحصائية الأقل تعطي أكثر. معظم القادة لديهم هجوم / دفاع أعلى بكثير من الفتك / الصحة.",
    ordT: "ماذا تطوّر أولًا", ordAD: ["صحة المشاة", "فتك الفرسان / الرماة", "دفاع المشاة", "هجوم الفرسان / الرماة", "صحة / دفاع الفرسان (بلا فائدة)"], ordBear: ["فتك الرماة", "هجوم الرماة", "الفرسان", "المشاة"],
    ordADl: "⚔️🛡️ قادة الهجوم والدفاع", ordBearl: "🐻 قائد الدب",
    srcT: "من أين يأتي الفتك + الصحة (أولًا)", srcH: ["المصدر", "يعطي", "ملاحظة"],
    src: [["جواهر الحاكم", "فتك + صحة ذلك النوع", "المستوى 2 ‏12%، المستوى 3 ‏16% لكل جوهرة"], ["معدات الأبطال", "الخوذة والحذاء = فتك · القفازات والدرع = صحة", "التحسين أولًا ثم الإتقان"], ["إحصاءات الأجزاء", "فتك + صحة لقوات البطل", "المستويات الأولى تحتاج 5 و10 و15 جزءًا — أرخص 1%"], ["موهبة البطل", "مثل: فتك وصحة كل القوات", "أعلى مستوى ونجوم"], ["الحيوانات الأليفة", "فتك / صحة العدو −", "تُضعف الطرف الآخر"]],
    src2T: "هجوم + دفاع (ثانيًا)", src2: ["معدات الحاكم", "مستوى البطل ونجومه (+200% إلى +444%)", "الأبحاث", "الأستاذ"],
    gearNote: "معدات الأبطال وإحصاءات الأجزاء تُحتسب فقط عندما يسير ذلك البطل — طوّر الأبطال الثلاثة الذين تقود بهم.",
    whoT: "من يناسب أي جهة (اقتراح وليس قاعدة)", whoA: ["أعلى قوة في لوحات الترتيب (معدات الحاكم + معدات الأبطال + الأستاذ)", "أبطال أجزاء هجومية: Amadeus وPetra وMarlin / Rosa"], whoD: ["سعة حامية كبيرة", "يكون غالبًا في حامياتنا — والأقوى فيها", "أبطال أجزاء دفاعية: Jabel وZoe / Eric وJaeger"], whoB: "للجهتين: اذهب إلى جهة الأجزاء التي طوّرتها بالفعل.",
    cards: "🃏 تقييم كل بطل لكل دور ← بطاقات الأبطال", src0: "من تقارير معاركنا وتحليل الدب والمحاكاة ومهارات الأبطال (31/10/2026)." },
  ko: { title: "🧭 공격 vs 방어", intro: "참고용: 공격 (집결 대장)과 방어 (방어 대장)에 각각 필요한 것, 1–5세대, 우리 전투 보고서와 시뮬레이션 기준.",
    cmpT: "나란히 비교", cmpH: ["", "⚔️ 공격 — 집결 대장", "🛡️ 방어 — 방어 대장"],
    cmp: [["가장 중요", "집결 용량 — 큰 집결 하나가 작은 집결 둘보다 강함", "방어 용량 — 건물에 병력을 얼마나 넣을 수 있는지"],
      ["누구 능력치", "집결 대장의 것", "안에 있는 가장 강한 사람"],
      ["부속품 종류", "공격형 (집결)", "방어형 (방어)"],
      ["병종 비율", "50:20:30 · 보병 ≥ 40%", "보병 많이 (보병이 벽)"],
      ["집결원 스킬", "영웅을 데려간 앞 4명: 공격 2 + 파괴력 2", "아마 똑같이 앞 4명 (미확인): 고든 2 + 하워드 2가 최고"],
      ["전술 / 손실", "강한 목표: 버려도 되는 집결 먼저, 가장 강한 대장 마지막", "대장이 손실을 약 32% 더 떠안음 — 병원 준비"],
      ["추가 이점", "—", "방어형 부속품은 내 도시가 공격받을 때도 적용"]],
    heroT: "각 쪽에 쓰는 영웅", heroNote: "병종별. 태그 = 집결이나 방어에서 부속품이 더해 주는 것; → = 육성 순서.",
    st: { atk: "공격", leth: "파괴력", def: "방어", hp: "HP" }, tag: { paid: "유료", roulette: "영웅 룰렛", heavy: "고과금", free: "무료" },
    trp: { inf: "🛡️ 보병", cav: "🐎 기병", arc: "🏹 궁병" },
    gearT: "⚙️ 능력치와 장비 (공격·방어 공통)", rule: "강도 = (1 + 공격)(1 + 파괴력) × (1 + 방어)(1 + HP). +1%p ≈ 1 ÷ (100 + 현재 %) — 낮은 능력치일수록 이득. 대부분 대장은 공격·방어가 파괴력·HP보다 훨씬 높아요.",
    ordT: "먼저 올릴 것", ordAD: ["보병 HP", "기병·궁병 파괴력", "보병 방어", "기병·궁병 공격", "기병 HP·방어 (쓸모없음)"], ordBear: ["궁병 파괴력", "궁병 공격", "기병", "보병"],
    ordADl: "⚔️🛡️ 공격·방어 대장", ordBearl: "🐻 곰 사냥 대장",
    srcT: "파괴력 + HP는 어디서 (먼저)", srcH: ["출처", "주는 것", "참고"],
    src: [["영주 보석", "해당 병종 파괴력 + HP", "Lv2 12%, Lv3 16%씩"], ["영웅 장비", "투구·신발 = 파괴력 · 장갑·갑옷 = HP", "강화 먼저, 그다음 전문화"], ["부속품 능력치", "영웅 병종 파괴력 + HP", "초반 레벨은 5, 10, 15개 — 1%당 가장 저렴"], ["영웅 특성", "예: 전 병종 파괴력, HP", "만렙·만성"], ["펫", "상대 파괴력 / HP −", "상대를 약하게"]],
    src2T: "공격 + 방어 (그다음)", src2: ["영주 장비", "영웅 레벨·성급 (+200%~+444%)", "연구", "마스터"],
    gearNote: "영웅 장비와 부속품 능력치는 그 영웅이 출전할 때만 계산돼요 — 대장으로 데려갈 3명만 키우세요.",
    whoT: "누가 어느 쪽에 맞나 (제안, 규칙 아님)", whoA: ["순위표 강도 최고 (영주 장비 + 영웅 장비 + 마스터)", "공격형 부속품 영웅: 아마데우스, 리틀 페라, 마린 / Rosa"], whoD: ["방어 용량이 큼", "우리 방어에 자주 들어가고 그 안에서 가장 강함", "방어형 부속품 영웅: 제이벨, 조이 / 에릭, 예거"], whoB: "공통: 이미 키운 부속품이 속한 쪽으로 가세요.",
    cards: "🃏 역할별 영웅 평가 → 영웅 카드", src0: "우리 전투 보고서, 곰 사냥 분석, 시뮬레이션, 영웅 스킬 (2026-10-31)." },
};
let lang = OFFICER.lang || "en";
const t = () => T[lang] || T.en;
/* 🦸 hero comparison — Project doc claude/kingshot-hero-numbers.md (2026-10-31): Gen 1–5 SSR, max level / stars / Widget,
   each troop slot compared on its own. Number = how far behind the best hero of that slot. Pictures: figures/heroes/hero_<id>.webp */
const HN = { amadeus: { zh: "阿瑪迪斯", ko: "아마데우스", ar: "أماديوس" }, helga: { zh: "赫爾加", ko: "헬가", ar: "هيلجا" }, zoe: { zh: "佐伊", ko: "조이", ar: "زوي" },
  eric: { zh: "艾瑞克", ko: "에릭", ar: "إيريك" }, alcar: { zh: "艾爾卡" }, longfei: { en: "Long Fei", zh: "龍飛" }, jabel: { zh: "潔貝爾", ko: "제이벨", ar: "جبل" },
  hilde: { zh: "希爾德", ko: "힐데", ar: "هيلدي" }, petra: { zh: "小佩拉", ko: "리틀 페라", ar: "بيترا" }, margot: { zh: "瑪歌" }, thrud: { zh: "索德" },
  saul: { zh: "薩洛", ko: "살로", ar: "شاول" }, marlin: { zh: "馬林", ko: "마린", ar: "مارلين", pt: "Peixe Marlin" }, jaeger: { zh: "耶格爾", ko: "예거", ar: "ييجر" },
  rosa: { zh: "蘿莎" }, vivian: { zh: "薇薇安" } };
const hname = (id) => (HN[id] && (HN[id][lang] || HN[id].en)) || id.charAt(0).toUpperCase() + id.slice(1);
const RANK = {
  pvp: { inf: [["alcar", 0], ["longfei", 28], ["amadeus", 47], ["eric", 48], ["helga", 51], ["zoe", 54]], cav: [["thrud", 0], ["petra", 7], ["margot", 8], ["hilde", 22], ["jabel", 26]], arc: [["vivian", 0], ["rosa", 7], ["jaeger", 26], ["marlin", 28], ["saul", 44]] },
  gar: { inf: [["alcar", 0], ["longfei", 28], ["eric", 48], ["zoe", 54], ["amadeus", 60], ["helga", 63]], cav: [["margot", 0], ["hilde", 15], ["thrud", 18], ["jabel", 20], ["petra", 23]], arc: [["vivian", 0], ["jaeger", 2], ["rosa", 7], ["saul", 26], ["marlin", 28]] },
  bear: { inf: [["amadeus", 0], ["zoe", 10], ["helga", 17], ["alcar", 31], ["longfei", 41], ["eric", 54]], cav: [["petra", 0], ["thrud", 6], ["margot", 12], ["jabel", 18], ["hilde", 23]], arc: [["vivian", 0], ["rosa", 23], ["marlin", 37], ["jaeger", 53], ["saul", 57]] },
};
const H2H = [["petra", "margot"], ["eric", "longfei", "alcar"], ["saul", "jaeger"], ["marlin", "rosa", "vivian"]];
const HC = {
  en: { hcT: "🦸 Hero comparison (Gen 1–5)", hcNote: "Every hero at max level, max stars and max Widget; each troop slot compared on its own. The number = how far behind the best hero of that slot.",
    hcR: { pvp: "⚔️ PvP rally lead", gar: "🛡️ Garrison lead", bear: "🐻 Bear lead" }, hcS: { inf: "🛡️ Infantry", cav: "🐎 Cavalry", arc: "🏹 Archer" }, best: "Best",
    h2hT: "Head to head",
    h2h: {"why": "Why", "verdict": "Verdict", "items": [{"rows": [["bear", "Petra +12% (her rally Widget)"], ["pvp", "about the same (Margot −1%)"], ["gar", "Margot +30% (garrison Widget, higher troop bonus)"]], "v": "Already have Petra? Keep her for rallies and the Bear; switch to Margot only for a garrison cavalry."}, {"rows": [["gar", "Eric → Long Fei +39%, → Alcar +92%; Long Fei → Alcar +38%"], ["pvp", "same as garrison"], ["bear", "all three are weak here — Amadeus is the best infantry (Alcar −31%, Long Fei −41%, Eric −54%)"], ["why", "Long Fei's lead = higher troop bonus (newer generation). Alcar's extra = infantry damage +100% and +60% stacking — not confirmed yet."]], "v": "Garrison infantry: Alcar > Long Fei > Eric."}, {"rows": [["gar", "Jaeger +32%"], ["pvp", "Jaeger +32%"], ["bear", "Jaeger +10% (both weak here — use Vivian / Rosa)"]], "v": "Archer in a garrison: Jaeger, clearly."}, {"rows": [["bear", "Marlin → Rosa +22%, → Vivian +58%; Rosa → Vivian +29%"], ["pvp", "Marlin → Rosa +28%, → Vivian +38%; Rosa → Vivian only +8%"], ["gar", "Marlin → Rosa +29%, → Vivian +39%; Rosa → Vivian +8%"]], "v": "Vivian pays off most for the Bear; for PvP and garrisons Rosa is almost as good."}]},
    hcWarn: ["Stars matter most: these use max stars — a 5★ older hero can beat a 1★ newer one.", "Assumes skill buffs multiply each other. If they add, the fixed-buff heroes (Amadeus, Helga, Hilde, Margot) drop the most.", "Infantry slot: the gap is mostly troop bonus (generation), not skills."] },
  zh: { hcT: "🦸 英雄比較（第 1–5 代）", hcNote: "每位英雄都當滿級、滿星、零件滿級；每個兵種位置分開比。數字＝跟同位置第一名差多少。",
    hcR: { pvp: "⚔️ PvP 集結隊長", gar: "🛡️ 駐防帶頭", bear: "🐻 熊獵隊長" }, hcS: { inf: "🛡️ 步兵", cav: "🐎 騎兵", arc: "🏹 弓兵" }, best: "最強",
    h2hT: "一對一比較",
    h2h: {"why": "原因", "verdict": "結論", "items": [{"rows": [["bear", "小佩拉強 12%（差在她的集結派零件）"], ["pvp", "差不多（瑪歌 −1%）"], ["gar", "瑪歌強 30%（守城派零件、兵種加成較高）"]], "v": "已經有小佩拉：集結和熊獵不用換；要練駐防騎兵才換瑪歌。"}, {"rows": [["gar", "艾瑞克 → 龍飛 +39%、→ 艾爾卡 +92%；龍飛 → 艾爾卡 +38%"], ["pvp", "跟駐防一樣"], ["bear", "三位都弱——步兵是阿瑪迪斯最好（艾爾卡 −31%、龍飛 −41%、艾瑞克 −54%）"], ["why", "龍飛領先來自兵種加成較高（代數新）；艾爾卡多出來的來自步兵傷害 +100% 和 +60% 相乘——還沒確認。"]], "v": "駐防步兵：艾爾卡 ＞ 龍飛 ＞ 艾瑞克。"}, {"rows": [["gar", "耶格爾強 32%"], ["pvp", "耶格爾強 32%"], ["bear", "耶格爾強 10%（兩位都弱——熊獵用薇薇安／蘿莎）"]], "v": "弓兵駐防：耶格爾明顯比較好。"}, {"rows": [["bear", "馬林 → 蘿莎 +22%、→ 薇薇安 +58%；蘿莎 → 薇薇安 +29%"], ["pvp", "馬林 → 蘿莎 +28%、→ 薇薇安 +38%；蘿莎 → 薇薇安只多 8%"], ["gar", "馬林 → 蘿莎 +29%、→ 薇薇安 +39%；蘿莎 → 薇薇安 +8%"]], "v": "薇薇安在熊獵最值得；PvP 和駐防蘿莎就差不多了。"}]},
    hcWarn: ["星級影響最大：這裡用滿星——五星的舊英雄可能贏過一星的新英雄。", "假設技能加成彼此相乘；如果是相加，固定加成型的英雄（阿瑪迪斯、赫爾加、希爾德、瑪歌）掉最多。", "步兵位：差距主要來自兵種加成（代數），不是技能。"] },
  pt: { hcT: "🦸 Comparação de heróis (Gen 1–5)", hcNote: "Todos os heróis no nível, estrelas e Ferramenta máximos; cada posição de tropa comparada separadamente. O número = quanto fica atrás do melhor da mesma posição.",
    hcR: { pvp: "⚔️ Líder de rally PvP", gar: "🛡️ Líder de guarnição", bear: "🐻 Líder do Urso" }, hcS: { inf: "🛡️ Infantaria", cav: "🐎 Cavalaria", arc: "🏹 Arquearia" }, best: "Melhor",
    h2hT: "Frente a frente",
    h2h: {"why": "Por quê", "verdict": "Conclusão", "items": [{"rows": [["bear", "Petra +12% (Ferramenta de rally)"], ["pvp", "quase igual (Margot −1%)"], ["gar", "Margot +30% (Ferramenta de guarnição, bônus de tropa maior)"]], "v": "Já tem Petra? Fique com ela para rally e Urso; troque por Margot só para cavalaria de guarnição."}, {"rows": [["gar", "Eric → Long Fei +39%, → Alcar +92%; Long Fei → Alcar +38%"], ["pvp", "igual à guarnição"], ["bear", "os três são fracos aqui — a melhor infantaria é Amadeus (Alcar −31%, Long Fei −41%, Eric −54%)"], ["why", "A vantagem de Long Fei = bônus de tropa maior (geração nova). O extra de Alcar = dano de infantaria +100% e +60% somados — ainda não confirmado."]], "v": "Infantaria de guarnição: Alcar > Long Fei > Eric."}, {"rows": [["gar", "Jaeger +32%"], ["pvp", "Jaeger +32%"], ["bear", "Jaeger +10% (os dois são fracos — use Vivian / Rosa)"]], "v": "Arquearia na guarnição: Jaeger, claramente."}, {"rows": [["bear", "Marlin → Rosa +22%, → Vivian +58%; Rosa → Vivian +29%"], ["pvp", "Marlin → Rosa +28%, → Vivian +38%; Rosa → Vivian só +8%"], ["gar", "Marlin → Rosa +29%, → Vivian +39%; Rosa → Vivian +8%"]], "v": "Vivian vale mais no Urso; em PvP e guarnição Rosa é quase igual."}]},
    hcWarn: ["Estrelas pesam mais: aqui são estrelas máximas — um herói antigo 5★ pode vencer um novo 1★.", "Supõe que os bônus de habilidade se multiplicam. Se somarem, os heróis de bônus fixo (Amadeus, Helga, Hilde, Margot) caem mais.", "Posição de infantaria: a diferença vem quase toda do bônus de tropa (geração), não das habilidades."] },
  ar: { hcT: "🦸 مقارنة الأبطال (الأجيال 1–5)", hcNote: "كل بطل بأعلى مستوى ونجوم وأجزاء؛ كل موقع قوات يُقارن وحده. الرقم = كم يتأخر عن الأفضل في نفس الموقع.",
    hcR: { pvp: "⚔️ قائد حشد PvP", gar: "🛡️ قائد الحامية", bear: "🐻 قائد الدب" }, hcS: { inf: "🛡️ المشاة", cav: "🐎 الفرسان", arc: "🏹 الرماة" }, best: "الأفضل",
    h2hT: "وجهًا لوجه",
    h2h: {"why": "السبب", "verdict": "الخلاصة", "items": [{"rows": [["bear", "Petra أقوى بـ 12% (أجزاء الحشد)"], ["pvp", "متقاربان (Margot ‏−1%)"], ["gar", "Margot أقوى بـ 30% (أجزاء الحامية ومكافأة قوات أعلى)"]], "v": "لديك Petra؟ أبقها للحشد والدب؛ وانتقل إلى Margot فقط لفرسان الحامية."}, {"rows": [["gar", "Eric ← Long Fei ‏+39%، ← Alcar ‏+92%؛ Long Fei ← Alcar ‏+38%"], ["pvp", "مثل الحامية"], ["bear", "الثلاثة ضعفاء هنا — أفضل مشاة هو Amadeus (Alcar ‏−31%، Long Fei ‏−41%، Eric ‏−54%)"], ["why", "تقدّم Long Fei = مكافأة قوات أعلى (جيل أحدث). زيادة Alcar = ضرر المشاة +100% و+60% معًا — غير مؤكد بعد."]], "v": "مشاة الحامية: Alcar > Long Fei > Eric."}, {"rows": [["gar", "Jaeger أقوى بـ 32%"], ["pvp", "Jaeger أقوى بـ 32%"], ["bear", "Jaeger أقوى بـ 10% (كلاهما ضعيف — استخدم Vivian / Rosa)"]], "v": "رماة الحامية: Jaeger بوضوح."}, {"rows": [["bear", "Marlin ← Rosa ‏+22%، ← Vivian ‏+58%؛ Rosa ← Vivian ‏+29%"], ["pvp", "Marlin ← Rosa ‏+28%، ← Vivian ‏+38%؛ Rosa ← Vivian ‏+8% فقط"], ["gar", "Marlin ← Rosa ‏+29%، ← Vivian ‏+39%؛ Rosa ← Vivian ‏+8%"]], "v": "Vivian تستحق أكثر في الدب؛ في PvP والحامية Rosa قريبة جدًا."}]},
    hcWarn: ["النجوم هي الأهم: هنا بأعلى النجوم — بطل قديم 5★ قد يتفوق على بطل جديد 1★.", "نفترض أن مكافآت المهارات تتضاعف معًا؛ إن كانت تُجمع فالأبطال ذوو المكافآت الثابتة (Amadeus وHelga وHilde وMargot) يتراجعون أكثر.", "موقع المشاة: الفرق يأتي غالبًا من مكافأة القوات (الجيل) لا من المهارات."] },
  ko: { hcT: "🦸 영웅 비교 (1–5세대)", hcNote: "모든 영웅을 만렙·만성·부속품 최대로 계산; 병종 자리별로 따로 비교. 숫자 = 같은 자리 1위보다 얼마나 약한지.",
    hcR: { pvp: "⚔️ PvP 집결 대장", gar: "🛡️ 방어 대장", bear: "🐻 곰 사냥 대장" }, hcS: { inf: "🛡️ 보병", cav: "🐎 기병", arc: "🏹 궁병" }, best: "최고",
    h2hT: "1:1 비교",
    h2h: {"why": "이유", "verdict": "결론", "items": [{"rows": [["bear", "리틀 페라 +12% (집결형 부속품)"], ["pvp", "비슷 (Margot −1%)"], ["gar", "Margot +30% (방어형 부속품, 병종 보너스 높음)"]], "v": "리틀 페라가 있으면 집결·곰은 그대로; 방어 기병을 키울 때만 Margot."}, {"rows": [["gar", "에릭 → Long Fei +39%, → Alcar +92%; Long Fei → Alcar +38%"], ["pvp", "방어와 같음"], ["bear", "셋 다 약해요 — 보병은 아마데우스가 최고 (Alcar −31%, Long Fei −41%, 에릭 −54%)"], ["why", "Long Fei의 우위 = 병종 보너스가 높음 (신세대). Alcar의 추가분 = 보병 피해 +100%와 +60%가 곱해짐 — 아직 미확인."]], "v": "방어 보병: Alcar > Long Fei > 에릭."}, {"rows": [["gar", "예거 +32%"], ["pvp", "예거 +32%"], ["bear", "예거 +10% (둘 다 약함 — Vivian / Rosa 사용)"]], "v": "방어 궁병: 예거가 확실히 나아요."}, {"rows": [["bear", "마린 → Rosa +22%, → Vivian +58%; Rosa → Vivian +29%"], ["pvp", "마린 → Rosa +28%, → Vivian +38%; Rosa → Vivian은 +8%뿐"], ["gar", "마린 → Rosa +29%, → Vivian +39%; Rosa → Vivian +8%"]], "v": "Vivian은 곰 사냥에서 가장 값어치; PvP와 방어는 Rosa도 거의 비슷."}]},
    hcWarn: ["성급이 가장 중요: 여기선 만성 기준 — 5★ 구세대 영웅이 1★ 신세대를 이길 수 있어요.", "스킬 버프가 서로 곱해진다고 가정. 더해진다면 고정 버프형 (아마데우스, 헬가, 힐데, Margot)이 가장 많이 떨어져요.", "보병 자리: 차이는 대부분 스킬이 아니라 병종 보너스 (세대) 때문."] },
};
for (const [l, o] of Object.entries(HC)) Object.assign(T[l], o);
function hcHtml(L) {
  const GEN = { amadeus: 1, helga: 1, jabel: 1, saul: 1, zoe: 2, hilde: 2, marlin: 2, eric: 3, petra: 3, jaeger: 3, alcar: 4, margot: 4, rosa: 4, longfei: 5, thrud: 5, vivian: 5 };
  /* the generation badge like the game's hero screen ("S4") */
  const pic = (id) => `<span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><b class="gr-gen"><i>S</i>${GEN[id] || ""}</b></span>`;
  const slot = (role, s) => `<div class="gr-slot"><div class="gr-slab">${esc(L.hcS[s])}</div><div class="gr-heroes">${RANK[role][s].map(([id, d]) =>
    `<div class="gr-hero${d ? "" : " top"}">${pic(id)}<b dir="auto">${esc(hname(id))}</b><span class="gr-gap">${d ? "−" + d + "%" : "👑 " + esc(L.best)}</span></div>`).join("")}</div></div>`;
  return `<div class="card gr-hc"><h3>${esc(L.hcT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(L.hcNote)}</div>
    ${["pvp", "gar", "bear"].map((r) => `<h4 class="gr-h4">${esc(L.hcR[r])}</h4>${["inf", "cav", "arc"].map((s) => slot(r, s)).join("")}`).join("")}
    <h4 class="gr-h4">${esc(L.h2hT)}</h4>
    ${H2H.map((ids, i) => { const it = L.h2h.items[i], lab = (k) => k === "why" ? L.h2h.why : L.hcR[k];
      return `<div class="gr-vs"><div class="gr-vsp">${ids.map((id) => `<span>${pic(id)}<i dir="auto">${esc(hname(id))}</i></span>`).join('<em>vs</em>')}</div>
      <div class="gr-vsr">${it.rows.map(([k, v]) => `<div class="${k === "why" ? "why" : ""}"><b>${esc(lab(k))}</b><span dir="auto">${esc(v)}</span></div>`).join("")}</div>
      <div class="gr-vsv">✅ ${esc(L.h2h.verdict)}${lang === "zh" ? "：" : ": "}${esc(it.v)}</div></div>`; }).join("")}
    <div class="gr-warn">${L.hcWarn.map((w) => `<div>⚠️ ${esc(w)}</div>`).join("")}</div></div>`;
}
const ul = (a) => `<ul class="gr-ul">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
/* heroes for each side: [id, Widget stat in rallies / garrisons, how to get] — claude/kingshot-attack-vs-defense.md */
const SIDE = {
  atk: { inf: [["amadeus", "atk", "paid"], ["helga", "leth", "paid"]], cav: [["petra", "atk", "roulette"], ["thrud", "leth", "heavy"]], arc: [["marlin", "leth"], ["rosa", "leth"], ["vivian", ""]], seq: { arc: 1 } },
  def: { inf: [["eric", "def"], ["alcar", "hp"], ["longfei", "atk"], ["zoe", "atk", "free"]], cav: [["jabel", "leth", "free"], ["margot", ""], ["hilde", "hp"]], arc: [["jaeger", "hp"], ["saul", "atk"]] },
};
const GENS = { amadeus: 1, helga: 1, jabel: 1, saul: 1, zoe: 2, hilde: 2, marlin: 2, eric: 3, petra: 3, jaeger: 3, alcar: 4, margot: 4, rosa: 4, longfei: 5, thrud: 5, vivian: 5 };
function render() {
  const L = t(), root = $("gr_root"); if (!root) return;
  const site = { zh: "zh", en: "en", pt: "pt", ar: "ar", ko: "ko" }[lang] || "en";
  const chip = ([id, st, tg]) => `<span class="gr-chip"><span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><b class="gr-gen"><i>S</i>${GENS[id]}</b></span>
    <b dir="auto">${esc(hname(id))}</b>${st ? `<em class="gr-st ${st}">${esc(L.st[st])}</em>` : ""}${tg ? `<small>${esc(L.tag[tg])}</small>` : ""}</span>`;
  const side = (k, tr) => `<div class="gr-chips">${SIDE[k][tr].map(chip).join(SIDE[k].seq && SIDE[k].seq[tr] ? '<span class="gr-arr">→</span>' : "")}</div>`;
  const ol = (a) => `<ol class="gr-ord">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;
  root.innerHTML = `
    <div class="card"><h3>${esc(L.cmpT)}</h3><div class="gr-tw"><table class="gr-cmp"><thead><tr>${L.cmpH.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${L.cmp.map(([k, a, d]) => `<tr><th>${esc(k)}</th><td>${esc(a)}</td><td>${esc(d)}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="card"><h3>${esc(L.heroT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(L.heroNote)}</div>
      <div class="gr-tw"><table class="gr-cmp gr-heroes-t"><thead><tr><th></th><th>${esc(L.cmpH[1])}</th><th>${esc(L.cmpH[2])}</th></tr></thead>
      <tbody>${["inf", "cav", "arc"].map((tr) => `<tr><th>${esc(L.trp[tr])}</th><td>${side("atk", tr)}</td><td>${side("def", tr)}</td></tr>`).join("")}</tbody></table></div></div>
    ${hcHtml(L)}
    <div class="card"><h3>${esc(L.gearT)}</h3><p class="gr-rule">${esc(L.rule)}</p>
      <h4 class="gr-h4">${esc(L.ordT)}</h4><div class="gr-two"><div><b>${esc(L.ordADl)}</b>${ol(L.ordAD)}</div><div><b>${esc(L.ordBearl)}</b>${ol(L.ordBear)}</div></div>
      <h4 class="gr-h4">${esc(L.srcT)}</h4><div class="gr-tw"><table class="gr-cmp"><thead><tr>${L.srcH.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${L.src.map(([a, b, c]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td><td class="muted">${esc(c)}</td></tr>`).join("")}</tbody></table></div>
      <h4 class="gr-h4">${esc(L.src2T)}</h4><div class="gr-tags">${L.src2.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
      <div class="muted" style="font-size:12.5px;margin-top:8px">💡 ${esc(L.gearNote)}</div></div>
    <div class="card"><h3>${esc(L.whoT)}</h3><div class="gr-two"><div class="gr-who"><b>${esc(L.cmpH[1])}</b>${ul(L.whoA)}</div><div class="gr-who"><b>${esc(L.cmpH[2])}</b>${ul(L.whoD)}</div></div>
      <div class="gr-vsv" style="margin-top:8px">✅ ${esc(L.whoB)}</div></div>
    <p><a class="btn" href="./#/${site}/hero-cards" target="_blank" rel="noopener">${esc(L.cards)}</a></p>
    <p class="muted" style="font-size:12.5px">${esc(L.src0)}</p>`;
}
function applyTexts() { if ($("gr_title")) { $("gr_title").textContent = t().title; $("gr_intro").textContent = t().intro; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.growth = { init, applyTexts, setLang };
})();
