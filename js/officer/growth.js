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
      ["Joiner skills", "First 4 people with a hero: 2 Attack + 2 Lethality", "Up to 4: different kinds best; 2 Gordon + 2 Howard also good → 🛡️ Garrison joiners"],
      ["Tactics / losses", "Strong target: expendable rallies first, the strongest leader last", "The lead takes ~32% more losses — Infirmary ready"],
      ["Bonus", "—", "Defensive Widgets also work when your own city is attacked"]],
    gjT: "🛡️ Garrison joiners", gjNote: "From guides online + our calculation — not checked with our battle reports yet.", gjRules: ["Up to 4 count — each one's first hero, top-right skill only", "Who counts: higher skill level first; same level → whoever joined first. The garrison lead and R4/R5 can change the order", "Same kind of bonus adds up (each extra one gives less); different kinds multiply → 4 different kinds is best", "Chance skills (Jabel, Helga): the same one only counts once"], gjH: ["Joiners", "vs the best"], gjBest: "best", gjCmb: "2 Gordon + 2 Howard",
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
      ["加入者技能", "前 4 個帶英雄的人：2 攻擊＋2 殺傷", "最多 4 個：不同種類最好；2 戈登＋2 霍華德也很好 → 🛡️ 駐防加入者"],
      ["戰術／傷亡", "打強目標：可犧牲的團先上，最強的隊長最後", "帶頭者多扛約 32% 傷亡——醫院先準備"],
      ["額外好處", "—", "守城派零件在自己的城被打時也有用"]],
    gjT: "🛡️ 駐防加入者", gjNote: "來自網路攻略＋我們的計算——還沒用戰報確認。", gjRules: ["最多算 4 個——每人只看第一位英雄的右上技能", "算誰：技能等級高的先；同等級先到的先。駐防帶頭和 R4/R5 可以調整順序", "同一種加成相加（越疊越少），不同種類相乘 → 4 個不同種類最好", "機率型技能（潔貝爾、赫爾加）同一種只算一個"], gjH: ["加入者", "跟最好的比"], gjBest: "最好", gjCmb: "2 戈登＋2 霍華德",
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
    whoT: "誰適合哪邊（建議，不是規則）", whoA: ["排行榜強度最高（領主裝備＋英雄裝備＋大師）", "手上有集結派英雄：阿瑪迪斯、小佩拉、馬林／羅莎"], whoD: ["駐防容量大", "常在駐防裡，而且是最強的", "手上有守城派英雄：潔貝爾、佐伊／艾瑞克、耶格爾"], whoB: "兩邊都一樣：零件已經練了哪一派，就往那一邊走。",
    cards: "🃏 每位英雄在各角色的評分 → 英雄卡", src0: "來自我們的戰報、熊獵分析、模擬和英雄技能（2026-10-31）。" },
  pt: { title: "🧭 Ataque vs Defesa", intro: "Para consulta: do que um líder de ataque (rally) e um de defesa (guarnição) precisam, Gen 1–5, pelos nossos relatórios e simulações.",
    cmpT: "Lado a lado", cmpH: ["", "⚔️ Ataque — líder de rally", "🛡️ Defesa — líder de guarnição"],
    cmp: [["Mais importante", "Capacidade de rally — um rally grande vence dois pequenos", "Capacidade de guarnição — quantas tropas seguram o prédio"],
      ["Atributos de quem", "Do líder do rally", "Da pessoa mais forte lá dentro"],
      ["Tipo de Ferramenta", "Ofensiva (rally)", "Defensiva (guarnição)"],
      ["Proporção", "50:20:30 · Infantaria ≥ 40%", "Muita infantaria (infantaria é o muro)"],
      ["Habilidades de participante", "4 primeiras pessoas com herói: 2 Ataque + 2 Letalidade", "Até 4: tipos diferentes é melhor; 2 Gordon + 2 Howard também é bom → 🛡️ Participantes da guarnição"],
      ["Tática / perdas", "Alvo forte: descartáveis primeiro, o líder mais forte por último", "O líder tem ~32% mais perdas — Enfermaria pronta"],
      ["Extra", "—", "Ferramentas defensivas também ajudam quando sua cidade é atacada"]],
    gjT: "🛡️ Participantes da guarnição", gjNote: "De guias online + nosso cálculo — ainda não conferido com relatórios de batalha.", gjRules: ["Contam até 4 — só a habilidade de cima à direita do primeiro herói de cada um", "Quem conta: nível de habilidade maior primeiro; mesmo nível → quem entrou antes. O líder da guarnição e R4/R5 podem mudar a ordem", "O mesmo tipo de bônus soma (cada um a mais rende menos); tipos diferentes multiplicam → 4 tipos diferentes é o melhor", "Habilidades de chance (Jabel, Helga): a mesma só conta uma vez"], gjH: ["Participantes", "vs o melhor"], gjBest: "melhor", gjCmb: "2 Gordon + 2 Howard",
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
      ["مهارات المنضمين", "أول 4 أشخاص لديهم بطل: 2 هجوم + 2 فتك", "حتى 4: الأنواع المختلفة أفضل؛ 2 جوردن + 2 هاورد جيد أيضًا ← 🛡️ المنضمون إلى الحامية"],
      ["التكتيك / الخسائر", "هدف قوي: الحشود القابلة للتضحية أولًا والأقوى أخيرًا", "القائد يتحمل ~32% خسائر أكثر — جهّز المستشفى"],
      ["ميزة", "—", "الأجزاء الدفاعية تفيد أيضًا عند مهاجمة مدينتك"]],
    gjT: "🛡️ المنضمون إلى الحامية", gjNote: "من أدلة على الإنترنت + حسابنا — لم يُتحقق منه بتقارير معاركنا بعد.", gjRules: ["يُحسب حتى 4 — فقط المهارة العلوية اليمنى للبطل الأول لكل واحد", "من يُحسب: مستوى المهارة الأعلى أولًا؛ نفس المستوى ← من انضم أولًا. قائد الحامية وR4/R5 يمكنهم تغيير الترتيب", "نفس نوع المكافأة يُجمع (كل إضافة تعطي أقل)؛ الأنواع المختلفة تتضاعف ← 4 أنواع مختلفة هو الأفضل", "مهارات الاحتمال (Jabel، Helga): المهارة نفسها تُحسب مرة واحدة"], gjH: ["المنضمون", "مقارنة بالأفضل"], gjBest: "الأفضل", gjCmb: "2 جوردن + 2 هاورد",
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
      ["집결원 스킬", "영웅을 데려간 앞 4명: 공격 2 + 파괴력 2", "최대 4명: 다른 종류가 최고; 고든 2 + 하워드 2도 좋음 → 🛡️ 방어 합류자"],
      ["전술 / 손실", "강한 목표: 버려도 되는 집결 먼저, 가장 강한 대장 마지막", "대장이 손실을 약 32% 더 떠안음 — 병원 준비"],
      ["추가 이점", "—", "방어형 부속품은 내 도시가 공격받을 때도 적용"]],
    gjT: "🛡️ 방어 합류자", gjNote: "온라인 공략 + 우리 계산 — 아직 전투 보고서로 확인 안 됨.", gjRules: ["최대 4명까지 — 각자 첫 영웅의 오른쪽 위 스킬만", "누가 들어가나: 스킬 레벨 높은 순; 같은 레벨이면 먼저 온 순. 방어 대장과 R4/R5가 순서를 바꿀 수 있음", "같은 종류 보너스는 더해짐 (많을수록 효율↓); 다른 종류는 곱해짐 → 서로 다른 4종류가 최고", "확률 스킬 (제이벨, 헬가): 같은 스킬은 하나만 적용"], gjH: ["합류자", "최고 대비"], gjBest: "최고", gjCmb: "고든 2 + 하워드 2",
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
  eric: { zh: "艾瑞克", ko: "에릭", ar: "إيريك" }, alcar: { zh: "阿爾卡" }, longfei: { en: "Long Fei", zh: "龍飛" }, jabel: { zh: "潔貝爾", ko: "제이벨", ar: "جبل" },
  hilde: { zh: "希爾德", ko: "힐데", ar: "هيلدي" }, petra: { zh: "小佩拉", ko: "리틀 페라", ar: "بيترا" }, margot: { zh: "瑪爾戈" }, thrud: { zh: "斯露德" },
  saul: { zh: "薩洛", ko: "살로", ar: "شاول" }, marlin: { zh: "馬林", ko: "마린", ar: "مارلين", pt: "Peixe Marlin" }, jaeger: { zh: "耶格爾", ko: "예거", ar: "ييجر" },
  rosa: { zh: "羅莎" }, vivian: { zh: "薇薇安" },
  gordon: { zh: "戈登", ko: "고든", ar: "جوردن" }, howard: { zh: "霍華德", ko: "하워드", ar: "هاورد" }, chenko: { zh: "琴科", ko: "첸코", ar: "تشينكو" }, amane: { zh: "雨音", ko: "아마네", ar: "أماني" },
  quinn: { zh: "奎恩", ko: "퀸", ar: "كوين" }, fahd: { zh: "法赫德", ko: "파드", ar: "فهد" }, yeonwoo: { zh: "妍羽", ko: "연우", ar: "يونوو" }, diana: { zh: "狄安娜", ko: "다이애나", ar: "ديانا" },
  forrest: { zh: "福斯特", ko: "포스터", ar: "فورست" }, seth: { zh: "史密斯", ko: "스미스", ar: "سيث" }, edwin: { zh: "艾德溫", ko: "에드윈", ar: "إدوين" }, olive: { zh: "奧麗芙", ko: "올리브", ar: "أوليف" } };
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
    h2h: {"why": "原因", "verdict": "結論", "items": [{"rows": [["bear", "小佩拉強 12%（差在她的集結派零件）"], ["pvp", "差不多（瑪爾戈 −1%）"], ["gar", "瑪爾戈強 30%（守城派零件、兵種加成較高）"]], "v": "已經有小佩拉：集結和熊獵不用換；要練駐防騎兵才換瑪爾戈。"}, {"rows": [["gar", "艾瑞克 → 龍飛 +39%、→ 阿爾卡 +92%；龍飛 → 阿爾卡 +38%"], ["pvp", "跟駐防一樣"], ["bear", "三位都弱——步兵是阿瑪迪斯最好（阿爾卡 −31%、龍飛 −41%、艾瑞克 −54%）"], ["why", "龍飛領先來自兵種加成較高（代數新）；阿爾卡多出來的來自步兵傷害 +100% 和 +60% 相乘——還沒確認。"]], "v": "駐防步兵：阿爾卡 ＞ 龍飛 ＞ 艾瑞克。"}, {"rows": [["gar", "耶格爾強 32%"], ["pvp", "耶格爾強 32%"], ["bear", "耶格爾強 10%（兩位都弱——熊獵用薇薇安／羅莎）"]], "v": "弓兵駐防：耶格爾明顯比較好。"}, {"rows": [["bear", "馬林 → 羅莎 +22%、→ 薇薇安 +58%；羅莎 → 薇薇安 +29%"], ["pvp", "馬林 → 羅莎 +28%、→ 薇薇安 +38%；羅莎 → 薇薇安只多 8%"], ["gar", "馬林 → 羅莎 +29%、→ 薇薇安 +39%；羅莎 → 薇薇安 +8%"]], "v": "薇薇安在熊獵最值得；PvP 和駐防羅莎就差不多了。"}]},
    hcWarn: ["星級影響最大：這裡用滿星——五星的舊英雄可能贏過一星的新英雄。", "假設技能加成彼此相乘；如果是相加，固定加成型的英雄（阿瑪迪斯、赫爾加、希爾德、瑪爾戈）掉最多。", "步兵位：差距主要來自兵種加成（代數），不是技能。"] },
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
/* ⚖️ Compare two heroes (Sherry, 2026-11-03 — "pick two heroes of the same troop and compare"). The same model as 🦸 Hero comparison
   (Project doc claude/kingshot-hero-numbers.md, calc.py), ported here: max level and stars; Widget level 0–10 scales the Widget's
   troop Lethality + Health and its +15% skill in proportion (an estimate — the real per-level steps aren't known). */
const HC_BASE = { inf: { atk: 376, leth: 567, def_: 273, hp: 512 }, cav: { atk: 327, leth: 356, def_: 264, hp: 302 }, arc: { atk: 364, leth: 417, def_: 283, hp: 351 } };
const HC_PASSIVE = { 1: 50, 2: 60, 3: 70, 4: 92.5, 5: 111 };
const HC_H = {
  amadeus: { t: "inf", g: 1, b: 260, atk: .25, leth: .25, dmg: [1.2], w: ["rally", "atk"] }, helga: { t: "inf", g: 1, b: 200, atk: .25, leth: .25, dr: [.2], w: ["rally", "leth"] },
  zoe: { t: "inf", g: 2, b: 240, atk: .25, dmg: [1.24, 1.25], w: ["gar", "atk"] }, eric: { t: "inf", g: 3, b: 290, hp: .25, dr: [.2, .2], w: ["gar", "def_"] },
  alcar: { t: "inf", g: 4, b: 370, dmg: [1.25], dmgT: { inf: 3.2, cav: 1.1, arc: 1.1 }, drT: { inf: .28, arc: .28 }, w: ["gar", "hp"] },
  longfei: { t: "inf", g: 5, b: 444, def_: .25, dmg: [1.25], dr: [.2], w: ["gar", "atk"] },
  jabel: { t: "cav", g: 1, b: 200, leth: .25, dmg: [1.25], dr: [.2], w: ["gar", "leth"] }, hilde: { t: "cav", g: 2, b: 240, atk: .15, def_: .10, dmg: [1.25], dr: [.2], w: ["gar", "hp"] },
  petra: { t: "cav", g: 3, b: 290, dmg: [1.25, 1.25], dr: [.2], w: ["rally", "atk"] }, margot: { t: "cav", g: 4, b: 370, atk: .25, dmgT: { cav: 1.5 }, dr: [.2], w: ["gar", "atk"] },
  thrud: { t: "cav", g: 5, b: 444, dmg: [1.125], dmgT: { inf: 1.15, arc: 1.15, cav: 1.2 }, dr: [.125], drT: { inf: .15, arc: .15 }, w: ["rally", "leth"] },
  saul: { t: "arc", g: 1, b: 200, def_: .10, hp: .15, leth: .25, w: ["gar", "atk"] }, marlin: { t: "arc", g: 2, b: 240, dmg: [1.2, 1.25], dr: [.1], w: ["rally", "leth"] },
  jaeger: { t: "arc", g: 3, b: 290, dmg: [1.2], dr: [.18], hp: .25, w: ["gar", "hp"] }, rosa: { t: "arc", g: 4, b: 370, dmg: [1.2], dr: [.2], atkT: { arc: .30 }, w: ["rally", "leth"] },
  vivian: { t: "arc", g: 5, b: 444, dmg: [1.25, 1.25], dmgT: { arc: 1.15 }, w: ["rally", "atk"] } };
const HC_T = ["inf", "cav", "arc"], HC_BEAR = { inf: .02, cav: .23, arc: .75 }, HC_OFF = { inf: .2, cav: .4, arc: .4 }, HC_DEF = { inf: .85, cav: 0, arc: .15 };
/* Widget level wl 0–10 (claude/kingshot-upgrade-efficiency.md): its troop Lethality + Health grow by max ÷ 10 every level (checked on Jabel, Zoe, Petra);
   its skill unlocks at +2 and levels up at +4, +6, +8, +10 (kingshotmastery.com widget guide, 2026-11-03); Lv1 = ⅓ of Lv5 (our screenshots), even steps between (assumed). */
const hcSkillF = (wl) => { const L = Math.floor(wl / 2); return L ? (1 + 0.5 * (L - 1)) / 3 : 0; };
function hcScore(id, role, wl) {
  const h = HC_H[id], w = Math.max(0, Math.min(10, parseInt(wl, 10) || 0)), f = w / 10, fs = hcSkillF(w), out = {}, mult = {};
  for (const k of HC_T) { out[k] = { ...HC_BASE[k] }; mult[k] = { atk: 1, leth: 1, def_: 1, hp: 1 };
    if (k === h.t) { out[k].atk += h.b; out[k].def_ += h.b; out[k].leth += HC_PASSIVE[h.g] * f; out[k].hp += HC_PASSIVE[h.g] * f; } }
  for (const st of ["atk", "leth", "def_", "hp"]) if (h[st]) for (const k of HC_T) mult[k][st] *= 1 + h[st];
  for (const [k, v] of Object.entries(h.atkT || {})) mult[k].atk *= 1 + v;
  const [fac, wst] = h.w; if ((fac === "rally" && role !== "gar") || (fac === "gar" && role === "gar")) for (const k of HC_T) mult[k][wst] *= 1 + 0.15 * fs;
  const A = {}, D = {}, A0 = {}, D0 = {};
  for (const k of HC_T) { const o = out[k], m = mult[k], b = HC_BASE[k];
    A[k] = (1 + o.atk / 100) * m.atk * (1 + o.leth / 100) * m.leth; D[k] = (1 + o.def_ / 100) * m.def_ * (1 + o.hp / 100) * m.hp;
    A0[k] = (1 + b.atk / 100) * (1 + b.leth / 100); D0[k] = (1 + b.def_ / 100) * (1 + b.hp / 100); }
  const g = (h.dmg || []).reduce((a, x) => a * x, 1), dT = h.dmgT || {};
  if (role === "bear") return g * HC_T.reduce((s, k) => s + HC_BEAR[k] * A[k] / A0[k] * (dT[k] || 1), 0);
  const off = g * HC_T.reduce((s, k) => s + HC_OFF[k] * A[k] / A0[k] * (dT[k] || 1), 0);
  const taken = (h.dr || []).reduce((a, r) => a * (1 - r), 1), drT = h.drT || {};
  return off * HC_T.reduce((s, k) => s + HC_DEF[k] * D[k] / D0[k] / (taken * (1 - (drT[k] || 0))), 0);
}
const CMP = {
  en: { hvT: "⚖️ Compare two heroes", hvNote: "Pick a troop slot and two heroes. Same model as the hero comparison above: max level and stars; Widget troop Lethality + Health grow by the same step every level (checked); its skill unlocks at +2 and levels up at +4, +6, +8, +10 (between those, even steps are assumed). Pick the same hero twice to compare two Widget levels.", hvWl: "Widget Lv", hvEq: "about equal", hvBetter: "{h} +{n}%", hvWhy: "Rally Widgets only work when you open a rally (Bear, PvP); garrison Widgets only in garrisons.", hvWarn: "Stars are assumed max — a hero with fewer stars does less. Rough guide, not a promise." },
  zh: { hvT: "⚖️ 兩位英雄比一比", hvNote: "選兵種位置和兩位英雄。跟上面「英雄比較」同一個模型：滿級、滿星；零件的兵種殺傷＋生命每級加一樣多（已驗證）；零件技能 +2 解鎖，+4、+6、+8、+10 各升一級（中間每級加多少是假設平均）。兩邊選同一位英雄，就能比不同的零件等級。", hvWl: "零件 Lv", hvEq: "差不多", hvBetter: "{h} +{n}%", hvWhy: "集結派零件只在自己開集結時有用（熊獵、PvP）；守城派只在駐防時有用。", hvWarn: "星級當作滿星，星級少的英雄會比較弱。只是大概的參考，不是保證。" },
  pt: { hvT: "⚖️ Compare dois heróis", hvNote: "Escolha uma posição de tropa e dois heróis. Mesmo modelo da comparação acima: nível e estrelas máximos; Letalidade + Vida da Ferramenta sobem igual a cada nível (conferido); a habilidade abre no +2 e sobe no +4, +6, +8, +10 (os passos entre eles são supostos iguais). Escolha o mesmo herói nos dois lados para comparar níveis da Ferramenta.", hvWl: "Ferramenta Nv", hvEq: "quase igual", hvBetter: "{h} +{n}%", hvWhy: "Ferramentas de rally só valem quando você abre o rally (Urso, PvP); as de guarnição só em guarnições.", hvWarn: "Estrelas supostas no máximo — um herói com menos estrelas rende menos. Guia aproximado, não garantia." },
  ar: { hvT: "⚖️ قارن بين بطلين", hvNote: "اختر موقع القوات وبطلين. نفس نموذج المقارنة أعلاه: أعلى مستوى ونجوم؛ فتك وصحة الأجزاء يزيدان بالقدر نفسه كل مستوى (مؤكد)؛ مهارتها تُفتح عند +2 وترتفع عند +4 و+6 و+8 و+10 (الخطوات بينها مفترضة متساوية). اختر البطل نفسه في الجهتين لمقارنة مستويين للأجزاء.", hvWl: "الأجزاء Lv", hvEq: "متقاربان", hvBetter: "{h} +{n}%", hvWhy: "أجزاء الحشد تعمل فقط عندما تفتح حشدًا (الدب، PvP)؛ وأجزاء الحامية في الحاميات فقط.", hvWarn: "النجوم مفترضة بالحد الأقصى — البطل الأقل نجومًا أضعف. دليل تقريبي، لا وعد." },
  ko: { hvT: "⚖️ 영웅 둘 비교", hvNote: "병종 자리와 영웅 둘을 골라. 위 영웅 비교와 같은 모델: 만렙·만성; 부속품의 병종 파괴·생명은 레벨마다 같은 만큼 올라 (확인됨); 부속품 스킬은 +2에 열리고 +4, +6, +8, +10에 올라 (그 사이 증가량은 균등하다고 가정). 양쪽에 같은 영웅을 고르면 부속품 레벨끼리 비교할 수 있어.", hvWl: "부속품 Lv", hvEq: "비슷", hvBetter: "{h} +{n}%", hvWhy: "집결형 부속품은 직접 집결을 열 때만 (곰, PvP), 방어형은 방어할 때만 적용돼.", hvWarn: "성급은 만성으로 가정 — 성급이 낮으면 더 약해. 대략적인 참고일 뿐." } };
for (const [l, o] of Object.entries(CMP)) Object.assign(T[l], o);
let cmpS = (() => { try { return JSON.parse(localStorage.getItem("nxs-gr-cmp")) || null; } catch (e) { return null; } })() || { t: "cav", a: "petra", b: "hilde", wa: 10, wb: 10 };
function cmpHtml(L) {
  const ids = Object.keys(HC_H).filter((id) => HC_H[id].t === cmpS.t);
  if (!ids.includes(cmpS.a)) cmpS.a = ids[0]; if (!ids.includes(cmpS.b)) cmpS.b = ids.find((x) => x !== cmpS.a);   // the same hero twice is allowed: compares two Widget levels
  const sel = (k) => `<select class="inp" id="gr_c${k}">${ids.map((id) => `<option value="${id}"${id === cmpS[k] ? " selected" : ""}>${esc(hname(id))} (S${HC_H[id].g})</option>`).join("")}</select>`;
  const wl = (k) => `<label class="gr-cwl">${esc(L.hvWl)} <input class="inp" type="number" min="0" max="10" id="gr_cw${k}" value="${cmpS["w" + k]}"></label>`;
  const side = (k) => `<div class="gr-cside">${`<span class="gr-pic"><img src="figures/heroes/hero_${cmpS[k]}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'"></span>`}${sel(k)}${wl(k)}</div>`;
  const rows = ["bear", "pvp", "gar"].map((r) => {
    const sa = hcScore(cmpS.a, r, cmpS.wa), sb = hcScore(cmpS.b, r, cmpS.wb), d = Math.round((Math.max(sa, sb) / Math.min(sa, sb) - 1) * 100);
    const win = sa >= sb ? "a" : "b", pa = Math.round(100 * sa / (sa + sb));
    return `<div class="gr-crow"><b>${esc(L.hcR[r])}</b><div class="gr-cbar"><span style="width:${pa}%"></span></div><span class="gr-cres">${d < 3 ? esc(L.hvEq) : esc(L.hvBetter.replace("{h}", hname(cmpS[win]) + (cmpS.a === cmpS.b ? ` Lv${cmpS["w" + win]}` : "")).replace("{n}", d))}</span></div>`; }).join("");
  return `<div class="card" id="gr_cmp"><h3>${esc(L.hvT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(L.hvNote)}</div>
    <div class="row gr-ctr">${HC_T.map((t) => `<button type="button" class="btn small${t === cmpS.t ? " primary" : ""}" data-ct="${t}">${esc(L.hcS[t])}</button>`).join("")}</div>
    <div class="gr-cvs">${side("a")}<em>vs</em>${side("b")}</div>${rows}
    <div class="muted" style="font-size:12.5px;margin-top:8px">💡 ${esc(L.hvWhy)}</div><div class="gr-warn"><div>⚠️ ${esc(L.hvWarn)}</div></div></div>`;
}
function cmpWire() {
  const root = $("gr_cmp"); if (!root) return;
  const redo = () => { try { localStorage.setItem("nxs-gr-cmp", JSON.stringify(cmpS)); } catch (e) {} const cur = $("gr_cmp"); if (!cur || !cur.isConnected) return; cur.outerHTML = cmpHtml(t()); cmpWire(); };
  root.querySelectorAll("[data-ct]").forEach((b) => b.onclick = () => { cmpS.t = b.dataset.ct; cmpS.a = cmpS.b = null; redo(); });
  for (const k of ["a", "b"]) { $("gr_c" + k).onchange = (e) => { cmpS[k] = e.target.value; redo(); };
    $("gr_cw" + k).onchange = (e) => { cmpS["w" + k] = Math.max(0, Math.min(10, parseInt(e.target.value, 10) || 0)); redo(); }; }
}
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
/* 🎯 Second uses (Sherry, 2026-11-03 — "weaker heroes can do other jobs, e.g. Saul"; Project doc claude/kingshot-hero-guide-gen1-5.md,
   section "個別技能的第二用途"). A joiner only uses the FIRST hero's top-right skill — troop type, generation, stars and gear don't matter.
   Tags are codes so every language reads the same numbers: [stat, %]. ⚠️ = not checked with our battle reports yet. */
const SU_ROWS = [
  ["out", [["amane", [["atk", 25]]], ["margot", [["atk", 25]]], ["yeonwoo", [["leth", 25]]], ["chenko", [["leth", 25]]], ["amadeus", [["leth", 25]]],
    ["vivian", [["etk", 25]]]],
    ["marlin", "rosa", "zoe", "petra", "jaeger"]],
  ["gar", [["saul", [["def", 10], ["hp", 15]]], ["gordon", [["hp", 25]]], ["hilde", [["atk", 15], ["def", 10]]],
    ["howard", [["hurt", -20]]], ["quinn", [["hurt", -20]]], ["fahd", [["edmg", -20]]], ["eric", [["eatk", -20]]]],
    ["jabel", "helga", "longfei", "alcar"]],
  ["none", [["diana", []], ["forrest", []], ["seth", []], ["edwin", []], ["olive", []]], []],
];
const SU_SPECIAL = ["saul", "gordon", "hilde", "fahd", "zoe", "jabel", "amane", "yeonwoo", "diana", "forrest"];   // Gen 1–5 + SR/R only (the site covers Gen 1–5 for now)
const SU = {
  en: { suT: "🎯 Second uses — joiners & side jobs", suNote: "A joiner only uses the first hero's top-right skill — troop type, generation, stars and hero gear don't matter. So a hero that is weak as a leader can still be a great joiner. ⚠️ = not checked with our battle reports yet.",
    suH: ["What for", "Fixed bonus (first choice)", "Chance-based (second choice)"],
    suR: { out: "⚔️🐻 Damage joiner (Bear, PvP rallies)", gar: "🛡️ Garrison joiner", none: "❌ No use as a joiner" },
    suS: { atk: "Atk", leth: "Leth", def: "Def", hp: "HP", etk: "Enemy dmg taken", edef: "Enemy Def", hurt: "Dmg taken", edmg: "Enemy dmg", eatk: "Enemy Atk", eleth: "Enemy Leth", extra: "Extra hit every 4 rounds" },
    suRules: ["Garrison: pick 4 different kinds (same kind adds up with less each time, different kinds multiply). E.g. 1 damage cut (Howard) + Saul + Hilde + 1 Lethality (Chenko).",
      "Two-in-one top-right skills (Saul, Hilde) are extra good: one slot, two stats — multiplied, better than one +25%.",
      "When WE rally a garrison, defensive joiners help too: the garrison hits back, and Enemy Atk −20% (Eric), Dmg taken −20% (Howard, Quinn) cut our losses."],
    spT: "Hero by hero",
    sp: { saul: "Weak as an archer lead, but one of the best garrison joiners (Def + HP). Green skill: construction speed +15%, cost −15%. Bottom-right Lethality +25% when he leads.",
      gordon: "Top-right HP +25% → garrison joiner. As a lead his middle skill Attack +25% works too.",
      hilde: "Top-right Attack + Defense → garrison and PvP joiner (only the Attack half helps against the Bear).",
      fahd: "Cheap damage-cut garrison joiners: Howard, Quinn (Dmg taken −20%), Fahd (Enemy dmg −20%). Fahd green skill: solo beast-march speed +100%.",
      zoe: "Middle Attack +25% (fixed) → useful as a lead, even the Bear infantry slot. As a joiner only a chance skill.",
      jabel: "Free, garrison-type Widget → helps everyone when their own city is hit. Bottom-right Lethality +25%.",
      amane: "Green skill: Infirmary healing speed +50%.",
      yeonwoo: "Green skill: research speed +15% (may help on KvK research day).",
      diana: "No fight use: stamina −20%, beast-march speed +100% → beast hunting only.",
      forrest: "R heroes (Forrest, Seth, Edwin, Olive): gathering speed +25% → gathering marches only." },
    greenNote: "Green (development) skills work by themselves once unlocked — no need to put the hero anywhere (Sparrow 11/03). Gathering and beast-march speed may need the hero in that march ⚠️ not confirmed." },
  zh: { suT: "🎯 英雄的第二用途：加入者和其他工作", suNote: "加入者只看第一位英雄的右上技能，跟兵種、代數、星級、英雄裝備都無關。所以當隊長不強的英雄，右上好就是好加入者。⚠️ = 還沒用我們的戰報驗證。",
    suH: ["用途", "固定加成（優先）", "機率型（次選）"],
    suR: { out: "⚔️🐻 輸出加入（熊獵、PvP 集結）", gar: "🛡️ 駐防加入", none: "❌ 當加入者沒用" },
    suS: { atk: "攻", leth: "殺傷", def: "防", hp: "生命", etk: "敵受傷", edef: "敵防", hurt: "我方受傷", edmg: "敵傷害", eatk: "敵攻", eleth: "敵殺傷", extra: "每 4 回合額外一擊" },
    suRules: ["駐防：4 個選 4 種不同類型（同一種疊在一起會遞減，不同種相乘）。例：1 減傷（霍華德）＋ 薩洛 ＋ 希爾德 ＋ 1 殺傷（琴科）。",
      "「兩項合一」的右上（薩洛、希爾德）特別划算：一格給兩種屬性，相乘之後比單項 +25% 好。",
      "我們集結打駐防時，防守類加入者也有用：駐防方會反擊，敵攻 −20%（艾瑞克）、我方受傷 −20%（霍華德、奎恩）都能減少我們的損失。"],
    spT: "個別英雄",
    sp: { saul: "當弓兵隊長偏弱，但是駐防加入首選之一（防＋生命）。綠色技能：建造速度 +15%、建造成本 −15%。右下殺傷 +25%，當隊長也有輸出。",
      gordon: "右上生命 +25% → 駐防加入；當隊長時右中攻擊 +25% 也有用。",
      hilde: "右上攻擊＋防禦 → 駐防加入、PvP 加入都能用（熊獵只有攻擊那一半有用）。",
      fahd: "便宜的減傷駐防加入：霍華德、奎恩（我方受傷 −20%）、法赫德（敵傷害 −20%）。法赫德綠色技能：單人打野行軍速度 +100%。",
      zoe: "右中攻擊 +25%（固定）→ 當隊長有用，包括熊獵步兵位；當加入者只有機率技能。",
      jabel: "免費、守城派專屬 → 自己城被打時每個人都有用；右下殺傷 +25%。",
      amane: "綠色技能：醫院治療速度 +50%。",
      yeonwoo: "綠色技能：研究速度 +15%（KvK 研究日可能有用）。",
      diana: "戰鬥沒用：體力消耗 −20%、打野行軍速度 +100% → 專門打野。",
      forrest: "R 級英雄（福斯特、史密斯、艾德溫、奧麗芙）：採集速度 +25% → 採集隊專用。" },
    greenNote: "綠色（發展）技能解鎖就自動生效，不用放在任何位置（Sparrow 11/03）。野外採集、打野行軍速度這類跟出征有關的，可能要英雄在那支隊伍裡 ⚠️ 未確認。" },
  pt: { suT: "🎯 Segundo uso — participantes e outras funções", suNote: "Um participante só usa a habilidade superior direita do primeiro herói — tipo de tropa, geração, estrelas e equipamento não importam. Um herói fraco como líder ainda pode ser ótimo participante. ⚠️ = ainda não conferido com nossos relatórios.",
    suH: ["Para quê", "Bônus fixo (primeira escolha)", "Por chance (segunda escolha)"],
    suR: { out: "⚔️🐻 Participante de dano (Urso, rallies PvP)", gar: "🛡️ Participante de guarnição", none: "❌ Inútil como participante" },
    suS: { atk: "Atq", leth: "Let", def: "Def", hp: "Vida", etk: "Dano sofrido inimigo", edef: "Def inimiga", hurt: "Dano sofrido", edmg: "Dano inimigo", eatk: "Atq inimigo", eleth: "Let inimiga", extra: "Golpe extra a cada 4 turnos" },
    suRules: ["Guarnição: escolha 4 tipos diferentes (o mesmo tipo soma com menos a cada vez; tipos diferentes se multiplicam). Ex.: 1 redução de dano (Howard) + Saul + Hilde + 1 Letalidade (Chenko).",
      "Habilidades \"dois em um\" (Saul, Hilde) valem muito: um espaço, dois atributos — multiplicados, melhor que um +25%.",
      "Quando NÓS atacamos uma guarnição, participantes defensivos também ajudam: a guarnição revida, e Atq inimigo −20% (Eric), Dano sofrido −20% (Howard, Quinn) reduzem nossas perdas."],
    spT: "Herói por herói",
    sp: { saul: "Fraco como líder arqueiro, mas um dos melhores participantes de guarnição (Def + Vida). Habilidade verde: construção +15%, custo −15%. Inferior direita Letalidade +25% quando lidera.",
      gordon: "Superior direita Vida +25% → participante de guarnição. Como líder, a do meio Ataque +25% também vale.",
      hilde: "Superior direita Ataque + Defesa → participante de guarnição e PvP (contra o Urso só metade ajuda).",
      fahd: "Participantes baratos de redução de dano: Howard, Quinn (Dano sofrido −20%), Fahd (Dano inimigo −20%). Verde do Fahd: velocidade de marcha contra feras +100%.",
      zoe: "Meio Ataque +25% (fixo) → útil como líder, até na infantaria do Urso. Como participante só tem chance.",
      jabel: "Grátis, Ferramenta de guarnição → ajuda todos quando a própria cidade é atacada. Inferior direita Letalidade +25%.",
      amane: "Habilidade verde: cura na Enfermaria +50%.",
      yeonwoo: "Habilidade verde: pesquisa +15% (pode ajudar no dia de pesquisa do KvK).",
      diana: "Sem uso em combate: vigor −20%, marcha contra feras +100% → só caçar feras.",
      forrest: "Heróis R (Forrest, Seth, Edwin, Olive): coleta +25% → só marchas de coleta." },
    greenNote: "Habilidades verdes (desenvolvimento) funcionam sozinhas depois de desbloqueadas — não precisa colocar o herói em lugar nenhum (Sparrow 03/11). Coleta e marcha contra feras talvez precisem do herói naquela marcha ⚠️ não confirmado." },
  ar: { suT: "🎯 الاستخدام الثاني — المنضمون ومهام أخرى", suNote: "المنضم يستخدم فقط المهارة العليا اليمنى للبطل الأول — نوع القوات والجيل والنجوم والمعدات لا تهم. لذلك قد يكون البطل الضعيف كقائد منضمًا ممتازًا. ⚠️ = لم يُتحقق منه بتقارير معاركنا بعد.",
    suH: ["الغرض", "مكافأة ثابتة (الخيار الأول)", "بالاحتمال (الخيار الثاني)"],
    suR: { out: "⚔️🐻 منضم للضرر (الدب، حشود PvP)", gar: "🛡️ منضم للحامية", none: "❌ لا فائدة كمنضم" },
    suS: { atk: "هجوم", leth: "فتك", def: "دفاع", hp: "صحة", etk: "ضرر يتلقاه العدو", edef: "دفاع العدو", hurt: "الضرر المتلقى", edmg: "ضرر العدو", eatk: "هجوم العدو", eleth: "فتك العدو", extra: "ضربة إضافية كل 4 جولات" },
    suRules: ["الحامية: اختر 4 أنواع مختلفة (النوع نفسه يُجمع ويقل في كل مرة، والأنواع المختلفة تتضاعف). مثال: 1 تقليل ضرر (Howard) + Saul + Hilde + 1 فتك (Chenko).",
      "المهارات \"اثنان في واحد\" (Saul وHilde) مفيدة جدًا: خانة واحدة وصفتان — تتضاعفان فتتفوقان على +25% واحدة.",
      "عندما نحشد نحن على حامية، يفيد المنضمون الدفاعيون أيضًا: الحامية ترد، وهجوم العدو −20% (Eric) والضرر المتلقى −20% (Howard وQuinn) تقلل خسائرنا."],
    spT: "بطلًا بطلًا",
    sp: { saul: "ضعيف كقائد رماة لكنه من أفضل المنضمين للحامية (دفاع + صحة). مهارة خضراء: سرعة البناء +15% والتكلفة −15%. السفلى اليمنى فتك +25% عندما يقود.",
      gordon: "العليا اليمنى صحة +25% → منضم للحامية. كقائد تعمل الوسطى هجوم +25% أيضًا.",
      hilde: "العليا اليمنى هجوم + دفاع → منضم للحامية وPvP (ضد الدب يفيد نصف الهجوم فقط).",
      fahd: "منضمون رخيصون لتقليل الضرر: Howard وQuinn (الضرر المتلقى −20%) وFahd (ضرر العدو −20%). مهارة Fahd الخضراء: سرعة الزحف إلى الوحوش +100%.",
      zoe: "الوسطى هجوم +25% (ثابت) → مفيدة كقائدة، حتى في خانة مشاة الدب. كمنضمة مهارة احتمالية فقط.",
      jabel: "مجانية، أجزاء حامية → تفيد الجميع عندما تُهاجم مدينتهم. السفلى اليمنى فتك +25%.",
      amane: "مهارة خضراء: سرعة العلاج في المستشفى +50%.",
      yeonwoo: "مهارة خضراء: سرعة البحث +15% (قد تفيد في يوم البحث في KvK).",
      diana: "لا فائدة قتالية: التحمل −20% وسرعة الزحف إلى الوحوش +100% → لصيد الوحوش فقط.",
      forrest: "أبطال R (فورست وسيث وإدوين وأوليف): سرعة الجمع +25% → لزحف الجمع فقط." },
    greenNote: "المهارات الخضراء (التطوير) تعمل وحدها بعد فتحها — لا حاجة لوضع البطل في أي مكان (Sparrow 11/03). الجمع وسرعة الزحف إلى الوحوش قد تحتاج البطل في ذلك الزحف ⚠️ غير مؤكد." },
  ko: { suT: "🎯 영웅의 두 번째 쓰임 — 집결원과 다른 일", suNote: "집결원은 첫 번째 영웅의 오른쪽 위 스킬만 써 — 병종, 세대, 성급, 영웅 장비는 상관없어. 대장으로 약한 영웅도 오른쪽 위가 좋으면 좋은 집결원이야. ⚠️ = 아직 우리 전투 보고서로 확인 안 됨.",
    suH: ["용도", "고정 버프 (우선)", "확률형 (차선)"],
    suR: { out: "⚔️🐻 딜 집결원 (곰, PvP 집결)", gar: "🛡️ 방어 집결원", none: "❌ 집결원으로 쓸모없음" },
    suS: { atk: "공격", leth: "파괴", def: "방어", hp: "생명", etk: "적 받는 피해", edef: "적 방어", hurt: "받는 피해", edmg: "적 피해", eatk: "적 공격", eleth: "적 파괴", extra: "4턴마다 추가 1타" },
    suRules: ["방어: 4명은 서로 다른 종류로 (같은 종류는 겹칠수록 덜 오르고, 다른 종류는 곱해져). 예: 피해 감소 1 (하워드) + 살로 + 힐데 + 파괴 1 (첸코).",
      "\"두 가지 한 번에\"인 오른쪽 위 (살로, 힐데)가 특히 좋아: 한 칸에 두 능력치 — 곱해져서 +25% 하나보다 좋아.",
      "우리가 방어 건물을 집결할 때도 방어형 집결원이 도움이 돼: 상대가 반격하니까 적 공격 −20% (에릭), 받는 피해 −20% (하워드, 퀸)가 우리 손실을 줄여."],
    spT: "영웅별",
    sp: { saul: "궁병 대장으로는 약하지만 방어 집결원 최고 중 하나 (방어 + 생명). 녹색 스킬: 건설 속도 +15%, 건설 비용 −15%. 오른쪽 아래 파괴 +25%는 대장일 때 딜.",
      gordon: "오른쪽 위 생명 +25% → 방어 집결원. 대장일 때 가운데 공격 +25%도 적용.",
      hilde: "오른쪽 위 공격 + 방어 → 방어·PvP 집결원 (곰에는 공격 절반만 도움).",
      fahd: "싼 피해 감소 방어 집결원: 하워드, 퀸 (받는 피해 −20%), 파드 (적 피해 −20%). 파드 녹색 스킬: 혼자 야수 사냥 행군 속도 +100%.",
      zoe: "가운데 공격 +25% (고정) → 대장으로 유용, 곰 보병 자리도. 집결원으로는 확률 스킬뿐.",
      jabel: "무료, 방어형 부속품 → 자기 도시가 공격받을 때 모두에게 도움. 오른쪽 아래 파괴 +25%.",
      amane: "녹색 스킬: 의무실 치료 속도 +50%.",
      yeonwoo: "녹색 스킬: 연구 속도 +15% (KvK 연구 날에 도움될 수도).",
      diana: "전투에 쓸모없음: 체력 소모 −20%, 야수 사냥 행군 속도 +100% → 야수 사냥 전용.",
      forrest: "R 영웅 (포스터, 스미스, 에드윈, 올리브): 채집 속도 +25% → 채집 부대 전용." },
    greenNote: "녹색 (발전) 스킬은 해금하면 자동 적용 — 어디에도 배치할 필요 없어 (Sparrow 11/03). 채집, 야수 사냥 행군 속도는 그 부대에 영웅이 있어야 할 수도 ⚠️ 미확인." },
};
for (const [l, o] of Object.entries(SU)) Object.assign(T[l], o);
function suHtml(L) {
  const tag = (parts) => parts.map(([k, v]) => k === "extra" ? L.suS.extra : `${L.suS[k]} ${v > 0 ? "+" : "−"}${Math.abs(v)}%`).join(" · ");
  const c = (id, parts, warn) => `<span class="gr-chip gr-su"><span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'"></span><b dir="auto">${esc(hname(id))}</b>${parts && parts.length ? `<small dir="auto">${esc(tag(parts))}${warn ? " ⚠️" : ""}</small>` : ""}</span>`;
  return `<div class="card" id="gr_su"><h3>${esc(L.suT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(L.suNote)}</div>
    ${SU_ROWS.map(([k, fixed, chance]) => `<div class="gr-sub"><h4 class="gr-h4">${esc(L.suR[k])}</h4>${chance.length ? `<div class="gr-sul">${esc(L.suH[1])}</div>` : ""}<div class="gr-chips">${fixed.map(([id, p, w]) => c(id, p, w)).join("")}</div>${chance.length ? `<div class="gr-sul">${esc(L.suH[2])}</div><div class="gr-chips">${chance.map((id) => c(id)).join("")}</div>` : ""}</div>`).join("")}
    ${ul(L.suRules)}
    <h4 class="gr-h4">${esc(L.spT)}</h4>
    <div class="gr-sp">${SU_SPECIAL.map((id) => `<div class="gr-spr"><span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'"></span><div><b dir="auto">${esc(hname(id))}</b><div dir="auto">${esc(L.sp[id])}</div></div></div>`).join("")}</div>
    <div class="muted" style="font-size:12.5px;margin-top:8px">💡 ${esc(L.greenNote)}</div></div>`;
}
/* heroes for each side: [id, Widget stat in rallies / garrisons, how to get] — claude/kingshot-attack-vs-defense.md */
const SIDE = {
  atk: { inf: [["amadeus", "atk", "paid"], ["helga", "leth", "paid"]], cav: [["petra", "atk", "roulette"], ["thrud", "leth", "heavy"]], arc: [["marlin", "leth"], ["rosa", "leth", "roulette"], ["vivian", ""]], seq: { arc: 1 } },
  def: { inf: [["eric", "def"], ["alcar", "hp"], ["longfei", "atk", "roulette"], ["zoe", "atk", "roulette"]], cav: [["jabel", "leth", "free"], ["margot", ""], ["hilde", "hp"]], arc: [["jaeger", "hp"], ["saul", "atk", "roulette"]] },
};
const GENS = { amadeus: 1, helga: 1, jabel: 1, saul: 1, zoe: 2, hilde: 2, marlin: 2, eric: 3, petra: 3, jaeger: 3, alcar: 4, margot: 4, rosa: 4, longfei: 5, thrud: 5, vivian: 5 };
const GJ = [[[["howard", 1], ["saul", 1], ["hilde", 1], ["chenko", 1]], 0], [[["gordon", 2], ["howard", 2]], 5], [[["chenko", 2], ["amane", 2]], 9], [[["gordon", 4]], 19]];
/* 🌳 When to pick a direction (Sherry 2026-11-04): milestones from the Investment price ruler (≈ 20,000 gems per +1% line),
   master and pet skills from the main-site guides (#master-academy, #pet). Rows: [icon, system, milestone, why]. */
const RD = {
  en: { t: "🌳 When to pick a direction", p: "Before these milestones, everything helps attack, defense and Bear alike — raising a bit of everything is the best deal. Once all are done, each further +1% costs about 20,000 gems or more anywhere, so it pays to focus on one direction.",
    trunk: [["💎", "Governor Charms", "all Lv3", "from Lv4 every +1% costs 2× or more"], ["🔬", "Research", "first levels of each tier, up to tier V", "tier VI is far dearer"], ["👑", "Governor Gear", "Epic 3★", "Epic T1 and up are far dearer"], ["🐾", "Pets", "breakthrough to Lv50", "stats help everyone"], ["🎓", "Pan", "Lv60", "economy: Reserve Chests, Intel Missions, +4 Mystery Shop refreshes (Widgets)"], ["🎓", "Valora", "Lv30", "Leader By Example, Weapon Obsession: +5 × 100 Enhancement XP and +5 Forgehammers every Bear Hunt"], ["🦸", "Your 3 main heroes", "Hero Gear +60, Mastery Forging Lv1", "cheap — the heroes you march with anyway"]],
    fork: "All done → pick one", br: [["⚔️", "PvP rally leader", ["Offensive-Widget heroes and their Widgets", "Rally capacity", "Stats: infantry Health > cavalry / archer Lethality", "🎓 Roman next (the guide's order for big spenders and rally leaders: Valora → Roman → Pan)"]],
      ["🛡️", "Garrison lead", ["Defensive-Widget heroes and their Widgets", "Garrison capacity", "Stats: same order as attack", "Defensive Widgets also work when your own city is hit"]],
      ["🐻", "Bear leader — a side branch of the rally leader", ["Shares rally Widgets, rally capacity and City Bonus with PvP", "Stats: only archer Attack × Lethality — Charms and Hero Gear for archers first (PvP wants infantry Health first: this is where the two clash)", "🎓 Valora's Dance of the Hunt to max: the whole rally +30,000 capacity per level (Lv10 +300,000)", "🐾 Battle pet skills don't work on the bear — only pet stats"]],
      ["🤝", "Everyone else (joiners)", ["No direction needed — keep raising a bit of everything", "🎓 Pan → Valora → Roman. Valora's Savage Advantage adds to your own Bear Hunt march", "🐾 Non-battle pet skills are the useful ones: Lion (Gift of the King), Cheetah (Pet Food)", "Migrant Score: Charms, pets, research and Hero Gear all count fully"]]],
    pet: "🐾 Battle pet skills (Moose: enemy Health ↓, Grizzly Bear: enemy Lethality ↓): the guide only lists Beasts, Rebels, Terror rallies and Dreadwolf; in a rally only the leader's count. Whether they work in PvP rallies or garrisons — not known.",
    unk: "🟡 Not known yet: whether rally leaders should still raise Pan first before the split; whether pet battle skills work in garrisons.",
    note: "Milestones are worked out from the gems per +1% on the 💎 Investment page — our estimate, not from the game.", iv: "💎 Gems per level → Investment" },
  zh: { t: "🌳 什麼時候該選方向", p: "在這些里程碑之前，升什麼對進攻、防守、熊獵都有用——全部輪流升最划算。全部過了以後，不管升哪個，每 +1% 都要約 2 萬鑽以上，這時才值得集中在一個方向。",
    trunk: [["💎", "領主寶石", "全部 Lv3", "Lv4 起每 +1% 貴 2 倍以上"], ["🔬", "研究", "每階的前幾級，到 V 階", "VI 階貴很多"], ["👑", "領主裝備", "史詩 3★", "史詩 T1 起貴很多"], ["🐾", "寵物", "突破到 Lv50", "屬性人人有用"], ["🎓", "潘", "Lv60", "經濟：儲備寶箱、情報事件、神秘商店多更新 4 次（零件）"], ["🎓", "維拉", "Lv30", "經驗傳承、武器專精：每次狩獵巨熊多 5 個 100 點強化經驗、5 個鍛造錘"], ["🦸", "自己的 3 位主力英雄", "英雄裝備 +60、專精鍛造 Lv1", "便宜，反正都會帶他們出征"]],
    fork: "全部過了 → 選一條", br: [["⚔️", "PvP 集結隊長", ["集結派英雄和他們的專屬裝備", "集結容量", "屬性：步兵生命值 > 騎弓殺傷力", "🎓 接著升羅曼（攻略「大課與集結指揮」的順序：維拉 → 羅曼 → 潘）"]],
      ["🛡️", "駐防帶頭", ["守城派英雄和他們的專屬裝備", "駐防容量", "屬性：順序跟進攻一樣", "守城派專屬在自己城被打時也有用"]],
      ["🐻", "熊獵隊長——集結隊長的另一支", ["集結派專屬、集結容量、城鎮增益跟 PvP 共用", "屬性只看弓兵攻擊力 × 殺傷力——寶石、英雄裝備先升弓兵（PvP 先升步兵生命值，兩邊在這裡衝突）", "🎓 維拉的狩獵之舞練滿：整個集結容量每級 +30,000（Lv10 +300,000）", "🐾 戰鬥寵物技能在熊獵沒用，只算寵物屬性"]],
      ["🤝", "其他人（加入者）", ["不用選方向，繼續全部輪流升", "🎓 潘 → 維拉 → 羅曼；維拉的人數優勢會加自己在熊獵的出征容量", "🐾 實用的是非戰鬥寵物技能：獅子（獅王贈禮）、獵豹（寵物口糧）", "遷城分數：寶石、寵物、研究、英雄裝備全算"]]],
    pet: "🐾 戰鬥寵物技能（駝鹿：敵方生命值 ↓；棕熊：敵方殺傷力 ↓）：攻略只寫野獸、叛軍、巨獸集結、恐狼有效；集結只算發起人的。PvP 集結、駐防有沒有效——還不知道。",
    unk: "🟡 還不知道：集結隊長在分岔前要不要也先練潘；駐防時寵物戰鬥技能有沒有效。",
    note: "里程碑是用 💎 投資效率的「每 +1% 幾鑽」換算的——我們的推算，不是遊戲說明。", iv: "💎 每一級多少鑽 → 投資效率" },
  pt: { t: "🌳 Quando escolher uma direção", p: "Antes destes marcos, tudo ajuda ataque, defesa e Urso igualmente — subir um pouco de tudo é o melhor negócio. Depois de todos, cada +1% custa cerca de 20.000 gemas ou mais em qualquer lugar, então vale focar em uma direção.",
    trunk: [["💎", "Amuleto do Governador", "todos Nv3", "a partir do Nv4 cada +1% custa 2× ou mais"], ["🔬", "Pesquisa", "primeiros níveis de cada fase, até a fase V", "a fase VI é bem mais cara"], ["👑", "Equipamento do Chefe", "Épico 3★", "Épico T1 em diante é bem mais caro"], ["🐾", "Mascotes", "avanço até Nv50", "os atributos ajudam todos"], ["🎓", "Pan", "Nv60", "economia: baús de reserva, Missão de Informação, +4 atualizações na loja Mistério (Ferramentas)"], ["🎓", "Valora", "Nv30", "Líder por Exemplo, Obsessão por Armas: +5 × 100 XP de Aprimoramento e +5 Martelo de forjas por Caça ao Urso"], ["🦸", "Seus 3 heróis principais", "Equipamento do Herói +60, M. em Forja Nv1", "barato — são os heróis que você já usa"]],
    fork: "Tudo feito → escolha um", br: [["⚔️", "Líder de rally PvP", ["Heróis com Ferramenta de rally e suas Ferramentas", "Capacidade de rally", "Atributos: Vida da infantaria > Letalidade de cavalaria / arqueiros", "🎓 Depois Roman (ordem do guia para quem gasta muito e líderes de rally: Valora → Roman → Pan)"]],
      ["🛡️", "Líder de guarnição", ["Heróis com Ferramenta de guarnição e suas Ferramentas", "Capacidade de guarnição", "Atributos: mesma ordem do ataque", "Ferramentas de guarnição também valem quando sua cidade é atacada"]],
      ["🐻", "Líder do Urso — um ramo do líder de rally", ["Divide com o PvP: Ferramentas de rally, capacidade de rally e Bônus da Cidade", "Atributos: só Ataque × Letalidade dos arqueiros — Amuleto e Equipamento do Herói para arqueiros primeiro (o PvP quer Vida da infantaria primeiro: aqui os dois se chocam)", "🎓 Dança da Caça da Valora no máximo: o rally todo +30.000 de capacidade por nível (Nv10 +300.000)", "🐾 Habilidades de batalha dos mascotes não valem no urso — só os atributos"]],
      ["🤝", "Todos os outros (participantes)", ["Não precisa escolher — continue subindo um pouco de tudo", "🎓 Pan → Valora → Roman. A Vantagem Selvagem da Valora aumenta sua própria marcha na Caça ao Urso", "🐾 As úteis são as habilidades fora de batalha: Leão (Presente do Rei), Chita (Alimento para Pets)", "Pontuação de Migração: Amuleto, mascotes, pesquisa e Equipamento do Herói contam inteiros"]]],
    pet: "🐾 Habilidades de batalha (Alce: Vida inimiga ↓, Urso Pardo: Letalidade inimiga ↓): o guia só lista Feras, Rebeldes, Rally de Terror e Lobo Medonho; num rally só contam as do líder. Se valem em rallies PvP ou guarnições — não sabemos.",
    unk: "🟡 Ainda não sabemos: se líderes de rally também devem subir o Pan antes da divisão; se as habilidades de batalha dos mascotes valem em guarnições.",
    note: "Marcos calculados pelas gemas por +1% da página 💎 Investimento — nossa estimativa, não do jogo.", iv: "💎 Gemas por nível → Investimento" },
  ar: { t: "🌳 متى تختار اتجاهًا", p: "قبل هذه المراحل، كل شيء يفيد الهجوم والدفاع والدب معًا — رفع القليل من كل شيء هو الأفضل. بعد إنهائها كلها، كل +1% إضافي يكلف نحو 20,000 جوهرة أو أكثر في أي مكان، فيصبح التركيز على اتجاه واحد أجدى.",
    trunk: [["💎", "تميمة الحاكم", "الكل Lv3", "من Lv4 كل +1% يكلف الضعف أو أكثر"], ["🔬", "البحث", "أول مستويات كل مرحلة حتى المرحلة V", "المرحلة VI أغلى بكثير"], ["👑", "عتاد الحاكم", "الملحمي 3★", "الملحمي T1 وما فوقه أغلى بكثير"], ["🐾", "الحيوانات الأليفة", "التطوير حتى Lv50", "الخصائص تفيد الجميع"], ["🎓", "بان", "Lv60", "الاقتصاد: صناديق الاحتياط، مهمة المعلومات، +4 تحديثات في متجر الغموض (الأجزاء)"], ["🎓", "فالورا", "Lv30", "القائد القدوة، هوس السلاح: +5 × 100 خبرة تحسين و+5 مطرقة الحدادة في كل صيد الدببة"], ["🦸", "أبطالك الثلاثة الرئيسيون", "عتاد البطل +60، صقل التخصص Lv1", "رخيص — هم من تخرج بهم أصلًا"]],
    fork: "انتهى كل شيء ← اختر واحدًا", br: [["⚔️", "قائد حشد PvP", ["أبطال أجزاء الحشد وأجزاؤهم", "سعة الحشد", "الخصائص: صحة المشاة > فتك الفرسان / الرماة", "🎓 ثم رومان (ترتيب الدليل لكبار المنفقين وقادة الحشد: فالورا ← رومان ← بان)"]],
      ["🛡️", "قائد الحامية", ["أبطال أجزاء الحامية وأجزاؤهم", "سعة الحامية", "الخصائص: نفس ترتيب الهجوم", "أجزاء الحامية تعمل أيضًا عندما تُهاجَم مدينتك"]],
      ["🐻", "قائد الدب — فرع من قائد الحشد", ["يشارك PvP في أجزاء الحشد وسعة الحشد ومكافأة المدينة", "الخصائص: هجوم × فتك الرماة فقط — التميمة وعتاد البطل للرماة أولًا (PvP يريد صحة المشاة أولًا: هنا يتعارضان)", "🎓 رقصة الصيد لفالورا للحد الأقصى: الحشد كله +30,000 سعة لكل مستوى (Lv10 +300,000)", "🐾 مهارات المعركة للحيوانات لا تعمل على الدب — الخصائص فقط"]],
      ["🤝", "الباقون (المنضمون)", ["لا حاجة لاختيار اتجاه — استمر برفع القليل من كل شيء", "🎓 بان ← فالورا ← رومان. الأفضلية الوحشية لفالورا تزيد مسيرك في صيد الدببة", "🐾 المفيد هو مهارات خارج المعركة: الأسد (هدية الملك)، النمر الصيّاد (طعام حيوان أليف)", "نقاط الهجرة: التميمة والحيوانات والبحث وعتاد البطل تُحسب كاملة"]]],
    pet: "🐾 مهارات المعركة (الأيل: صحة العدو ↓، الدب الأشيب: فتك العدو ↓): الدليل يذكر فقط الوحوش والمتمردين وحشد الوحش العملاق والذئب المخيف؛ في الحشد تُحتسب مهارات القائد فقط. هل تعمل في حشود PvP أو الحاميات — غير معروف.",
    unk: "🟡 غير معروف بعد: هل يرفع قادة الحشد بان أولًا قبل الانقسام؛ هل تعمل مهارات المعركة للحيوانات في الحاميات.",
    note: "المراحل محسوبة من الجواهر لكل +1% في صفحة 💎 الاستثمار — تقديرنا، وليست من اللعبة.", iv: "💎 الجواهر لكل مستوى ← الاستثمار" },
  ko: { t: "🌳 언제 방향을 정할까", p: "이 단계 전까지는 뭘 올려도 공격·방어·곰 사냥 모두에 도움이 돼 — 골고루 올리는 게 제일 이득이야. 전부 넘기면 어디를 올려도 +1%당 약 2만 다이아 이상이 들어서, 그때부터 한 방향에 집중하는 게 좋아.",
    trunk: [["💎", "영주 보석", "전부 Lv3", "Lv4부터 +1%당 2배 이상 비쌈"], ["🔬", "연구", "단계별 첫 몇 레벨, V단계까지", "VI단계는 훨씬 비쌈"], ["👑", "영주 장비", "에픽 3★", "에픽 T1부터 훨씬 비쌈"], ["🐾", "펫", "돌파 Lv50까지", "스탯은 누구에게나 도움"], ["🎓", "판", "Lv60", "경제: 비축 상자, 정보 이벤트, 신비한 상점 새로고침 +4 (부속품)"], ["🎓", "베라", "Lv30", "경험 전승, 무기 마스터리: 곰 사냥마다 100 강화 경험치 +5, 제작 망치 +5"], ["🦸", "주력 영웅 3명", "영웅 장비 +60, 마스터리 제작 Lv1", "싸고, 어차피 데리고 나가는 영웅"]],
    fork: "전부 끝 → 하나 고르기", br: [["⚔️", "PvP 집결 대장", ["집결형 부속품 영웅과 그 부속품", "집결 수용량", "스탯: 보병 생명 > 기병·궁병 파괴", "🎓 다음은 로만 (가이드의 핵과금·집결 지휘 순서: 베라 → 로만 → 판)"]],
      ["🛡️", "방어 대장", ["방어형 부속품 영웅과 그 부속품", "방어 수용량", "스탯: 공격과 같은 순서", "방어형 부속품은 내 도시가 맞을 때도 적용"]],
      ["🐻", "곰 사냥 대장 — 집결 대장의 갈래", ["집결형 부속품, 집결 수용량, 도시 버프는 PvP와 공유", "스탯: 궁병 공격 × 파괴만 — 보석·영웅 장비는 궁병 먼저 (PvP는 보병 생명 먼저: 여기서 둘이 부딪쳐)", "🎓 베라 사냥의 춤 맥스: 집결 전체 수용량 레벨당 +30,000 (Lv10 +300,000)", "🐾 전투 펫 스킬은 곰에게 안 통해 — 펫 스탯만"]],
      ["🤝", "나머지 (집결원)", ["방향 안 정해도 돼 — 계속 골고루", "🎓 판 → 베라 → 로만. 베라의 수적 우위는 내 곰 사냥 출정 수용량을 늘려", "🐾 쓸모 있는 건 비전투 펫 스킬: 사자 (라이언 킹의 선물), 치타 (펫 먹이)", "이주 점수: 보석·펫·연구·영웅 장비 모두 100% 계산"]]],
    pet: "🐾 전투 펫 스킬 (엘크: 적 HP ↓, 불곰: 적 파괴력 ↓): 가이드엔 야수, 반군, 괴수 집결, 스케어 울프만 나와 있고, 집결에선 발동자 것만 적용돼. PvP 집결이나 방어에서 통하는지는 — 아직 몰라.",
    unk: "🟡 아직 모름: 집결 대장도 갈라지기 전에 판부터 올려야 하는지; 방어할 때 펫 전투 스킬이 통하는지.",
    note: "단계는 💎 투자 효율 페이지의 +1%당 다이아로 계산한 거야 — 우리 추정이고, 게임 공식 아님.", iv: "💎 레벨별 다이아 → 투자 효율" },
};
function rdHtml() {
  const R = RD[lang] || RD.en;
  return `<div class="card gr-rd" id="gr_road"><h3>${esc(R.t)}</h3><p class="gr-rule">${esc(R.p)}</p>
    <div class="gr-trunk">${R.trunk.map(([i, s, m, w]) => `<div class="gr-ms"><span class="gr-msi">${i}</span><div><b>${esc(s)}</b> <em>${esc(m)}</em><small>${esc(w)}</small></div></div>`).join("")}</div>
    <div class="gr-fork" aria-hidden="true"><svg viewBox="0 0 400 46" preserveAspectRatio="none"><path d="M200 0 V18 M200 18 C200 30 50 26 50 46 M200 18 C200 30 150 30 150 46 M200 18 C200 30 250 30 250 46 M200 18 C200 30 350 26 350 46" fill="none" stroke="currentColor" stroke-width="3" vector-effect="non-scaling-stroke"/></svg><span>${esc(R.fork)}</span></div>
    <div class="gr-brs">${R.br.map(([i, h, l], k) => `<div class="gr-br b${k}"><h4>${i} ${esc(h)}</h4>${ul(l)}</div>`).join("")}</div>
    <div class="gr-vsv" style="margin-top:10px">${esc(R.pet)}</div>
    <p class="muted" style="font-size:12.5px;margin:8px 0 4px">${esc(R.unk)}</p>
    <p class="muted" style="font-size:12.5px;margin:0">${esc(R.note)} <a href="#iv">${esc(R.iv)}</a></p></div>`;
}
function render() {
  const L = t(), root = $("gr_root"); if (!root) return;
  const site = { zh: "zh", en: "en", pt: "pt", ar: "ar", ko: "ko" }[lang] || "en";
  const chip = ([id, st, tg]) => `<span class="gr-chip"><span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'">${GENS[id] ? `<b class="gr-gen"><i>S</i>${GENS[id]}</b>` : ""}</span>
    <b dir="auto">${esc(hname(id))}</b>${st ? `<em class="gr-st ${st}">${esc(L.st[st])}</em>` : ""}${tg ? `<small>${esc(L.tag[tg])}</small>` : ""}</span>`;
  const side = (k, tr) => `<div class="gr-chips">${SIDE[k][tr].map(chip).join(SIDE[k].seq && SIDE[k].seq[tr] ? '<span class="gr-arr">→</span>' : "")}</div>`;
  const ol = (a) => `<ol class="gr-ord">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;
  root.innerHTML = `
    ${rdHtml()}
    <div class="card"><h3>${esc(L.cmpT)}</h3><div class="gr-tw"><table class="gr-cmp"><thead><tr>${L.cmpH.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${L.cmp.map(([k, a, d]) => `<tr><th>${esc(k)}</th><td>${esc(a)}</td><td>${esc(d)}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="card"><h3>${esc(L.heroT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(L.heroNote)}</div>
      <div class="gr-tw"><table class="gr-cmp gr-heroes-t"><thead><tr><th></th><th>${esc(L.cmpH[1])}</th><th>${esc(L.cmpH[2])}</th></tr></thead>
      <tbody>${["inf", "cav", "arc"].map((tr) => `<tr><th>${esc(L.trp[tr])}</th><td>${side("atk", tr)}</td><td>${side("def", tr)}</td></tr>`).join("")}</tbody></table></div></div>
    <p><a class="btn" href="#hr">${esc(HR().link)}</a></p>
    <div class="card"><h3>${esc(L.gearT)}</h3><p class="gr-rule">${esc(L.rule)}</p>
      <h4 class="gr-h4">${esc(L.ordT)}</h4><div class="gr-two"><div><b>${esc(L.ordADl)}</b>${ol(L.ordAD)}</div><div><b>${esc(L.ordBearl)}</b>${ol(L.ordBear)}</div></div>
      <h4 class="gr-h4">${esc(L.srcT)}</h4><div class="gr-tw"><table class="gr-cmp"><thead><tr>${L.srcH.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${L.src.map(([a, b, c]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td><td class="muted">${esc(c)}</td></tr>`).join("")}</tbody></table></div>
      <h4 class="gr-h4">${esc(L.src2T)}</h4><div class="gr-tags">${L.src2.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
      <div class="muted" style="font-size:12.5px;margin-top:8px">💡 ${esc(L.gearNote)}</div></div>
    <div class="card"><h3>${esc(L.whoT)}</h3><div class="gr-two"><div class="gr-who"><b>${esc(L.cmpH[1])}</b>${ul(L.whoA)}</div><div class="gr-who"><b>${esc(L.cmpH[2])}</b>${ul(L.whoD)}</div></div>
      <div class="gr-vsv" style="margin-top:8px">✅ ${esc(L.whoB)}</div></div>
    <p class="muted" style="font-size:12.5px">${esc(L.src0)}</p>`;
  renderHr();
}
/* 🦸 Heroes — its own research tab since 2026-11-05 (Sherry: "Growth got too long, some of it is off topic"): 🛡️ Garrison joiners,
   🎯 Second uses, 🦸 Hero comparison, ⚖️ Compare two heroes. 🧭 Growth keeps the direction: milestones, side by side, which heroes per side, stats & gear, who fits. */
const HRT = {
  en: { title: "🦸 Heroes", intro: "Which hero is how strong, and what to do with the others: Gen 1–5, from our battle reports and simulations. Choosing a direction: 🧭 Growth.", link: "🦸 Hero comparison, compare two heroes, joiners → Heroes" },
  zh: { title: "🦸 英雄", intro: "哪位英雄多強、其他英雄可以做什麼：第 1–5 代，根據我們的戰報和模擬。要選發展方向請看 🧭 發展方向。", link: "🦸 英雄比較、兩個英雄比一比、加入者 → 英雄頁" },
  pt: { title: "🦸 Heróis", intro: "Quão forte é cada herói e o que fazer com os outros: Gen 1–5, pelos nossos relatórios e simulações. Para escolher uma direção: 🧭 Crescimento.", link: "🦸 Comparação de heróis, comparar dois, participantes → Heróis" },
  ar: { title: "🦸 الأبطال", intro: "ما مدى قوة كل بطل وماذا تفعل بالآخرين: الأجيال 1–5، من تقارير معاركنا والمحاكاة. لاختيار الاتجاه: 🧭 التطوير.", link: "🦸 مقارنة الأبطال، مقارنة بطلين، المنضمون ← الأبطال" },
  ko: { title: "🦸 영웅", intro: "영웅별 강함과 나머지 영웅의 활용: 1–5세대, 우리 전투 보고서와 시뮬레이션 기준. 육성 방향은 🧭 육성에서.", link: "🦸 영웅 비교, 두 영웅 비교, 참여자 → 영웅" } };
const HR = () => HRT[lang] || HRT.en;
function renderHr() {
  const L = t(), root = $("hr_root"); if (!root) return;
  const site = { zh: "zh", en: "en", pt: "pt", ar: "ar", ko: "ko" }[lang] || "en";
  const chip = ([id, st, tg]) => `<span class="gr-chip"><span class="gr-pic"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy" onerror="this.style.visibility='hidden'">${GENS[id] ? `<b class="gr-gen"><i>S</i>${GENS[id]}</b>` : ""}</span>
    <b dir="auto">${esc(hname(id))}</b>${st ? `<em class="gr-st ${st}">${esc(L.st[st])}</em>` : ""}${tg ? `<small>${esc(L.tag[tg])}</small>` : ""}</span>`;
  root.innerHTML = `
    ${hcHtml(L)}
    ${cmpHtml(L)}
    <div class="card"><h3>${esc(L.gjT)}</h3><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(L.gjNote)}</div>${ul(L.gjRules)}
      <div class="gr-tw"><table class="gr-cmp gr-gj"><thead><tr>${L.gjH.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${GJ.map(([c, d]) => `<tr><td><div class="gr-chips">${c.map(([id, n]) => chip([id, "", ""]).replace('<span class="gr-pic">', `<span class="gr-pic">${n > 1 ? `<b class="gr-n">×${n}</b>` : ""}`)).join("")}</div></td><td class="gr-gjv">${d ? `−${d}%` : `✅ ${esc(L.gjBest)}`}</td></tr>`).join("")}</tbody></table></div></div>
    ${suHtml(L)}
    <p><a class="btn" href="./#/${site}/hero-cards" target="_blank" rel="noopener">${esc(L.cards)}</a></p>
    <p class="muted" style="font-size:12.5px">${esc(L.src0)}</p>`;
  cmpWire();
}
function applyTexts() { if ($("gr_title")) { $("gr_title").textContent = t().title; $("gr_intro").textContent = t().intro; }
  if ($("hr_title")) { $("hr_title").textContent = HR().title; $("hr_intro").textContent = HR().intro; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.growth = { init, applyTexts, setLang };
OFFICER_PAGES.hr = { init, applyTexts, setLang };   // 🦸 Heroes: same module, its own section (#pg-hr)
})();
