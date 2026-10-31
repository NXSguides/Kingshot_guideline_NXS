/* NXS officer page — 🧭 Growth plan (registers OFFICER_PAGES.growth; own tab, nobody by default, admins always).
   Sherry, 2026-10-31: Armada wants to decide who builds attack and who builds defense. Before any names, this page shows the
   proposal for a shared way to grow (from Project doc claude/kingshot-attack-vs-defense.md), for Armada and Nia to read.
   Read-only text, no data. Hero details link to the main site's 🃏 Hero Cards. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const T = {
  en: { title: "🧭 Attack vs Defense", intro: "For reference: what an attack (rally) leader and a defense (garrison) leader need, Gen 1–5, from our battle reports and simulations.",
    whyT: "Why we split",
    why: ["A rally only uses its LEADER's stats, heroes and Exclusive Gear; a garrison only uses its lead's. Joiners' own stats and gear don't count at all.", "So only a few people really need to choose attack or defense."],
    diffT: "What is different / what is the same",
    diff: [["Different", "Heroes, the kind of Widget (offensive = rally, defensive = garrison) and the kind of capacity (rally capacity vs garrison capacity)."], ["Same", "Governor Gear, gems and hero gear: the stat order is the same for attack and defense (battles are symmetric) — this part helps both, no need to split."]],
    roles: [
      { i: "⚔️", n: "Attack (rally leader)", r: [
        ["Heroes", "Need offensive Widgets — Infantry: Amadeus (paid; the only infantry with a rally Widget) / Helga (paid) · Cavalry: Petra (Hero Roulette) / Thrud (heavy spend) · Archer: Marlin → Rosa → Vivian"],
        ["Widgets", "Offensive: Amadeus, Petra = rally Attack; Helga, Marlin, Rosa, Thrud = rally Lethality"],
        ["Stats", "Infantry Health and cavalry / archer Lethality first — see ⚙️ below"],
        ["Capacity", "Big rally capacity: one big rally beats two small ones (troops lost grow with troop count to the power 1.5–2)"],
        ["Troop ratio", "50:20:30 holds up well; keep Infantry at 40% or more (simulation)"],
        ["Tactics", "Strong target: rally again and again — expendable rallies first, the strongest leader last (the last rally becomes the new garrison, with that leader's stats)"],
        ["Joiners", "The first 4 people with a hero: 2 Attack (Amane, Margot) + 2 Lethality (Chenko, Yeonwoo, Amadeus)"]] },
      { i: "🛡️", n: "Defense (garrison lead)", r: [
        ["Capacity", "The lead's key stat: garrison capacity — it decides how many troops can hold the building. Build garrison capacity first"], ["Stats used", "The garrison uses the stats and hero skills of the strongest person inside"],
        ["Heroes", "Need defensive Widgets — Infantry: Eric (all three skills defensive) / Alcar / Long Fei / Zoe (free main) · Cavalry: Jabel (free) / Margot / Hilde · Archer: Jaeger (all three are combat skills) / Saul (one skill is construction speed)"],
        ["Widgets", "Defensive: Zoe, Saul, Long Fei = garrison Attack; Jabel = garrison Lethality; Eric = garrison Defense; Hilde, Jaeger, Alcar = garrison Health"],
        ["Stats", "Same order as attack"],
        ["Losses", "The lead takes about 32% more of the losses (B29) — get the Infirmary and healing ready"],
        ["Troop ratio", "Infantry is the wall, so a high infantry share is right. With no cavalry in the garrison, Margot's cavalry bonus and “her cavalry attacks again” do nothing; only all-troop Attack +25% and the dodge stay"],
        ["Bonus", "Defensive Widgets also work when your own city is attacked (B16, B20) — not only the lead gains from them"], ["Joiners", "The other defenders' first hero's top-right skill counts too, like joiners in a rally"]] },
    ],
    gearT: "⚙️ Stats & gear (both sides)",
    gear: [["The rule", "Strength = (1 + Attack)(1 + Lethality) × (1 + Defense)(1 + Health). +1 point of a stat is worth about 1 ÷ (100 + its current %), so the LOWER stat gives more."], ["Where we are", "Most people have Attack and Defense far above Lethality and Health (hero troop bonuses and Governor Gear add Attack / Defense). E.g. one leader: troop Attack 209%, Lethality 52%. The simulation agrees: +50 points of Lethality beat +50 Attack, Health beats Defense."], ["By troop", "Infantry is the wall → Health matters most. Cavalry and archers deal damage → Lethality matters most. Cavalry isn't hit → its Health / Defense do nothing."], ["Lethality + Health (first)", "Governor gems (that troop's Lethality + Health; Lv2 12%, Lv3 16% each) · Hero gear: helmet, boots = Lethality; gloves, chest = Health (enhance first, then mastery) · Widget stats (that hero's troop Lethality + Health; the first levels need only 5, 10, 15 parts — the cheapest 1%) · Hero talent at max level and stars · Pets lower the enemy's Lethality / Health"], ["Attack + Defense (second)", "Governor Gear, hero level and stars (troop Attack / Defense +200% to +444%), research, Master"], ["Order: attack & defense leaders", "Infantry Health > cavalry / archer Lethality > infantry Defense > cavalry / archer Attack > cavalry Health / Defense (no use)"], ["Order: Bear lead", "Archer Lethality > archer Attack > cavalry > infantry (the Bear doesn't hit back: Health / Defense do nothing)"], ["Only when marching", "Hero gear and Widget stats only count when that hero marches — build the 3 heroes you lead with"]],
    whoT: "Who fits which side (a suggestion, not a rule)",
    who: ["Attack: the highest board strength (Governor Gear + hero gear + Master) and offensive-Widget heroes in hand (Amadeus, Petra, Marlin / Rosa).", "Defense: has a big garrison capacity, is often in our garrisons and the strongest there, and has defensive-Widget heroes (Jabel, Zoe / Eric, Jaeger).", "Don't waste Widgets already built: go to the side your Widgets belong to."],
    cards: "🃏 Every hero, rated for each role → Hero Cards", src: "From our battle reports, Bear analysis, simulations and hero skills (2026-10-31). B16, B20, B29 = our battle-report numbers." },
  zh: { title: "🧭 進攻 vs 防守", intro: "參考用：進攻（集結隊長）和防守（駐防帶頭）各自需要什麼，第 1–5 代，根據我們的戰報和模擬。",
    whyT: "為什麼要分工",
    why: ["集結只用隊長的屬性、英雄、專屬裝備；駐防只用帶頭者的。加入者的這些東西在集結裡完全不算。", "所以真正需要「分攻守投資」的只有少數幾個人。"],
    diffT: "哪裡不一樣／哪裡一樣",
    diff: [["不一樣", "英雄組合、零件派別（集結派／守城派）、容量種類（集結容量／駐防容量）。"], ["一樣", "領主裝備、寶石、英雄裝備的屬性優先順序（戰鬥機制攻守對稱）——這部分攻守都用得到，不用分。"]],
    roles: [
      { i: "⚔️", n: "進攻（集結隊長）", r: [
        ["英雄", "要集結派零件——步：阿瑪迪斯（付費，唯一的步兵集結派）／赫爾加（付費）· 騎：小佩拉（轉盤）／索德（重課）· 弓：馬林 → 蘿莎 → 薇薇安"],
        ["零件", "集結派：阿瑪迪斯、小佩拉＝集結攻擊；赫爾加、馬林、蘿莎、索德＝集結殺傷"],
        ["屬性", "步兵生命、騎弓殺傷優先——見下面 ⚙️"],
        ["容量", "集結容量要大：一大團比兩小團強（削兵量跟兵數的 1.5–2 次方成正比）"],
        ["兵種比例", "50:20:30 很穩，步兵不要低於 40%（模擬）"],
        ["戰術", "打強目標時連續集結，可犧牲的團先上，最強的隊長最後（打下後的守軍＝最後一團，用他的屬性）"],
        ["加入者", "前 4 個帶英雄的人：2 個攻擊（天音、瑪歌）＋2 個殺傷（琴科、妍雨、阿瑪迪斯）"]] },
      { i: "🛡️", n: "防守（駐防帶頭）", r: [
        ["容量", "帶頭者最重要的是駐防容量——決定建築裡能放多少兵。先把駐防容量練起來"], ["用誰的屬性", "駐防用守軍裡最強的人的屬性和英雄技能"],
        ["英雄", "要守城派零件——步：艾瑞克（三格全防守）／艾爾卡／龍飛／佐伊（免費主力）· 騎：潔貝爾（免費）／瑪歌／希爾德 · 弓：耶格爾（三格都是戰鬥技能）／薩洛（一格是建造速度）"],
        ["零件", "守城派：佐伊、薩洛、龍飛＝守城攻擊；潔貝爾＝守城殺傷；艾瑞克＝守城防禦；希爾德、耶格爾、艾爾卡＝守城生命"],
        ["屬性", "同進攻"],
        ["傷亡", "帶頭者自己多扛約 32% 傷亡（B29），醫院和治療要準備好"],
        ["兵種比例", "步兵是牆，比例高是對的。駐防沒有騎兵的話，瑪歌的騎兵兵種加成和「她的騎兵額外攻擊」用不到，只剩全隊攻擊 +25% 和閃避"],
        ["額外好處", "守城派零件在每個人自己的城被打時也會生效（B16、B20），所以不只帶頭者受益"], ["加入者", "其他駐防者第一位英雄的右上技能也有用，跟集結的加入者一樣"]] },
    ],
    gearT: "⚙️ 屬性和裝備（攻守通用）",
    gear: [["原則", "戰鬥強度 = (1+攻擊)(1+殺傷) × (1+防禦)(1+生命)。某一項 +1 個百分點的效果 ≈ 1 ÷ (100 + 目前%)，所以目前越低的那一項越划算。"], ["現況", "大部分人的攻擊、防禦遠高於殺傷、生命（英雄兵種加成、領主裝備都加攻擊防禦）。例：某位隊長部隊攻擊 209%、殺傷 52%。模擬也一樣：+50 點時殺傷比攻擊有效、生命比防禦有效。"], ["依兵種", "步兵是牆 → 生命最重要；騎兵、弓兵是輸出 → 殺傷最重要；騎兵不會被打，生命防禦沒用。"], ["給殺傷＋生命（優先）", "領主寶石（該兵種殺傷＋生命；每顆 Lv2 12%、Lv3 16%）· 英雄裝備：頭盔、靴子＝殺傷；手套、胸甲＝生命（先強化、再專精）· 零件屬性（該英雄兵種殺傷＋生命；前幾級只要 5、10、15 個零件，每 1% 最便宜）· 英雄天賦（滿級滿星）· 寵物（降低對方殺傷、生命）"], ["給攻擊＋防禦（其次）", "領主裝備、英雄等級和星級（兵種攻擊防禦 +200%～+444%）、研究、大師"], ["順序：進攻、防守隊長", "步兵生命 ＞ 騎弓殺傷 ＞ 步兵防禦 ＞ 騎弓攻擊 ＞ 騎兵生命防禦（沒用）"], ["順序：熊獵隊長", "弓兵殺傷 ＞ 弓兵攻擊 ＞ 騎兵 ＞ 步兵（熊不打人，生命防禦全部沒用）"], ["只在出戰時算", "英雄裝備和零件屬性只在那位英雄出戰時才算——練自己當隊長時會帶的 3 位"]],
    whoT: "誰適合哪邊（建議，不是規則）",
    who: ["進攻：排行榜強度（領主裝備＋英雄裝備＋大師）最高、手上有集結派英雄（阿瑪迪斯、小佩拉、馬林／蘿莎）的人。", "防守：駐防容量大、常在駐防裡而且是最強的、手上有守城派英雄（潔貝爾、佐伊／艾瑞克、耶格爾）的人。", "已經投資很多的零件不要浪費：零件是哪一派，就往那一邊走。"],
    cards: "🃏 每位英雄在各角色的評分 → 英雄卡", src: "來自我們的戰報、熊獵分析、模擬和英雄技能（2026-10-31）。B16、B20、B29＝我們的戰報編號。" },
  pt: { title: "🧭 Ataque vs Defesa", intro: "Para consulta: do que um líder de ataque (rally) e um de defesa (guarnição) precisam, Gen 1–5, pelos nossos relatórios e simulações.",
    whyT: "Por que dividir",
    why: ["O rally só usa os atributos, heróis e Equipamento Exclusivo do LÍDER; a guarnição só usa os de quem lidera. Os dos participantes não contam nada.", "Então só algumas pessoas precisam mesmo escolher ataque ou defesa."],
    diffT: "O que muda / o que é igual",
    diff: [["Muda", "Os heróis, o tipo de Ferramenta (ofensiva = rally, defensiva = guarnição) e o tipo de capacidade (rally vs guarnição)."], ["Igual", "Equipamento do Governador, gemas e equipamento de herói: a ordem dos atributos é a mesma no ataque e na defesa (a batalha é simétrica) — isso serve aos dois, não precisa dividir."]],
    roles: [
      { i: "⚔️", n: "Ataque (líder de rally)", r: [
        ["Heróis", "Precisam de Ferramenta ofensiva — Infantaria: Amadeus (pago; a única infantaria com Ferramenta de rally) / Helga (paga) · Cavalaria: Petra (Roleta de Heróis) / Thrud (muito gasto) · Arquearia: Marlin → Rosa → Vivian"],
        ["Ferramentas", "Ofensivas: Amadeus, Petra = Ataque de rally; Helga, Marlin, Rosa, Thrud = Letalidade de rally"],
        ["Atributos", "Vida da infantaria e Letalidade da cavalaria / arquearia primeiro — veja ⚙️ abaixo"],
        ["Capacidade", "Capacidade de rally grande: um rally grande vence dois pequenos (as perdas crescem com o número de tropas elevado a 1,5–2)"],
        ["Proporção", "50:20:30 é seguro; mantenha Infantaria em 40% ou mais (simulação)"],
        ["Tática", "Alvo forte: rallies seguidos — os descartáveis primeiro, o líder mais forte por último (o último rally vira a nova guarnição, com os atributos dele)"],
        ["Participantes", "As 4 primeiras pessoas com herói: 2 de Ataque (Amane, Margot) + 2 de Letalidade (Chenko, Yeonwoo, Amadeus)"]] },
      { i: "🛡️", n: "Defesa (líder de guarnição)", r: [
        ["Capacidade", "O mais importante do líder: capacidade de guarnição — decide quantas tropas seguram o prédio. Evolua a capacidade de guarnição primeiro"], ["Atributos usados", "A guarnição usa os atributos e habilidades de herói da pessoa mais forte lá dentro"],
        ["Heróis", "Precisam de Ferramenta defensiva — Infantaria: Eric (três habilidades defensivas) / Alcar / Long Fei / Zoe (principal gratuita) · Cavalaria: Jabel (grátis) / Margot / Hilde · Arquearia: Jaeger (três habilidades de combate) / Saul (uma é velocidade de construção)"],
        ["Ferramentas", "Defensivas: Zoe, Saul, Long Fei = Ataque da guarnição; Jabel = Letalidade da guarnição; Eric = Defesa da guarnição; Hilde, Jaeger, Alcar = Vida da guarnição"],
        ["Atributos", "Mesma ordem do ataque"],
        ["Perdas", "O líder fica com cerca de 32% a mais das perdas (B29) — deixe a Enfermaria e a cura prontas"],
        ["Proporção", "A infantaria é o muro, então uma parte alta de infantaria está certa. Sem cavalaria na guarnição, o bônus de cavalaria da Margot e “a cavalaria dela ataca de novo” não servem; ficam só Ataque +25% para todos e a esquiva"],
        ["Extra", "Ferramentas defensivas também funcionam quando a sua própria cidade é atacada (B16, B20) — não só o líder ganha"], ["Participantes", "A habilidade de cima à direita do primeiro herói dos outros defensores também conta, como no rally"]] },
    ],
    gearT: "⚙️ Atributos e equipamentos (os dois lados)",
    gear: [["A regra", "Força = (1 + Ataque)(1 + Letalidade) × (1 + Defesa)(1 + Vida). +1 ponto de um atributo vale cerca de 1 ÷ (100 + o % atual), então o atributo MAIS BAIXO rende mais."], ["Como estamos", "A maioria tem Ataque e Defesa bem acima de Letalidade e Vida (bônus de tropa dos heróis e Equip. do Governador somam Ataque / Defesa). Ex.: um líder com Ataque 209% e Letalidade 52%. A simulação confirma: +50 de Letalidade vale mais que +50 de Ataque, e Vida mais que Defesa."], ["Por tropa", "Infantaria é o muro → Vida é o mais importante. Cavalaria e arquearia causam dano → Letalidade é o mais importante. A cavalaria não apanha → Vida / Defesa dela não servem."], ["Letalidade + Vida (primeiro)", "Gemas do Governador (Letalidade + Vida da tropa; Nv2 12%, Nv3 16% cada) · Equip. de herói: elmo, botas = Letalidade; luvas, peitoral = Vida (aprimore primeiro, depois maestria) · Atributos da Ferramenta (Letalidade + Vida da tropa do herói; os primeiros níveis pedem só 5, 10, 15 peças — o 1% mais barato) · Talento do herói no máximo · Pets reduzem Letalidade / Vida do inimigo"], ["Ataque + Defesa (depois)", "Equip. do Governador, nível e estrelas do herói (Ataque / Defesa da tropa +200% a +444%), pesquisa, Mestre"], ["Ordem: líderes de ataque e defesa", "Vida da infantaria > Letalidade da cavalaria / arquearia > Defesa da infantaria > Ataque da cavalaria / arquearia > Vida / Defesa da cavalaria (inútil)"], ["Ordem: líder do Urso", "Letalidade da arquearia > Ataque da arquearia > cavalaria > infantaria (o Urso não revida: Vida / Defesa não servem)"], ["Só ao marchar", "Equip. de herói e atributos da Ferramenta só contam quando o herói marcha — evolua os 3 com que você lidera"]],
    whoT: "Quem combina com cada lado (sugestão, não regra)",
    who: ["Ataque: maior força nos rankings (Equip. do Governador + equip. de herói + Mestre) e heróis de Ferramenta ofensiva (Amadeus, Petra, Marlin / Rosa).", "Defesa: tem grande capacidade de guarnição, costuma estar nas nossas guarnições e ser o mais forte lá, e tem heróis de Ferramenta defensiva (Jabel, Zoe / Eric, Jaeger).", "Não desperdice Ferramentas já evoluídas: vá para o lado delas."],
    cards: "🃏 Cada herói avaliado por função → Cartas de Heróis", src: "Dos nossos relatórios de batalha, análise do Urso, simulações e habilidades (31/10/2026). B16, B20, B29 = números dos nossos relatórios." },
  ar: { title: "🧭 الهجوم مقابل الدفاع", intro: "للرجوع إليه: ما يحتاجه قائد الهجوم (الحشد) وقائد الدفاع (الحامية)، الأجيال 1–5، من تقارير معاركنا ومحاكاتنا.",
    whyT: "لماذا نوزّع",
    why: ["الحشد يستخدم فقط إحصاءات قائده وأبطاله ومعداته الحصرية؛ والحامية تستخدم إحصاءات قائدها فقط. إحصاءات المنضمين ومعداتهم لا تُحتسب إطلاقًا.", "لذلك قلة فقط يحتاجون فعلًا للاختيار بين الهجوم والدفاع."],
    diffT: "ما المختلف / ما المتشابه",
    diff: [["مختلف", "الأبطال، ونوع الأجزاء (هجومي = حشد، دفاعي = حامية)، ونوع السعة (سعة الحشد مقابل سعة الحامية)."], ["متشابه", "معدات الحاكم والجواهر ومعدات الأبطال: ترتيب الإحصاءات نفسه للهجوم والدفاع (المعركة متماثلة) — هذا يفيد الاثنين ولا حاجة للتقسيم."]],
    roles: [
      { i: "⚔️", n: "الهجوم (قائد الحشد)", r: [
        ["الأبطال", "تحتاج أجزاء هجومية — مشاة: Amadeus (مدفوع؛ المشاة الوحيد بأجزاء حشد) / Helga (مدفوعة) · فرسان: Petra (عجلة الأبطال) / Thrud (إنفاق كبير) · رماة: Marlin ← Rosa ← Vivian"],
        ["الأجزاء", "هجومية: Amadeus وPetra = هجوم الحشد؛ Helga وMarlin وRosa وThrud = فتك الحشد"],
        ["الإحصاءات", "صحة المشاة وفتك الفرسان / الرماة أولًا — انظر ⚙️ أدناه"],
        ["السعة", "سعة حشد كبيرة: حشد كبير واحد أفضل من حشدين صغيرين (الخسائر تنمو مع عدد القوات مرفوعًا إلى 1.5–2)"],
        ["النسبة", "50:20:30 ثابتة؛ أبقِ المشاة 40% أو أكثر (محاكاة)"],
        ["التكتيك", "هدف قوي: حشود متتالية — الحشود القابلة للتضحية أولًا والقائد الأقوى أخيرًا (الحشد الأخير يصبح الحامية الجديدة بإحصاءات قائده)"],
        ["المنضمون", "أول 4 أشخاص لديهم بطل: 2 هجوم (Amane وMargot) + 2 فتك (Chenko وYeonwoo وAmadeus)"]] },
      { i: "🛡️", n: "الدفاع (قائد الحامية)", r: [
        ["السعة", "أهم ما في القائد: سعة الحامية — تحدد كم جنديًا يحمي المبنى. طوّر سعة الحامية أولًا"], ["إحصاءات من", "الحامية تستخدم إحصاءات ومهارات أبطال أقوى شخص فيها"],
        ["الأبطال", "تحتاج أجزاء دفاعية — مشاة: Eric (مهاراته الثلاث دفاعية) / Alcar / Long Fei / Zoe (الأساسية المجانية) · فرسان: Jabel (مجانية) / Margot / Hilde · رماة: Jaeger (مهاراته الثلاث قتالية) / Saul (إحداها سرعة بناء)"],
        ["الأجزاء", "دفاعية: Zoe وSaul وLong Fei = هجوم الحامية؛ Jabel = فتك الحامية؛ Eric = دفاع الحامية؛ Hilde وJaeger وAlcar = صحة الحامية"],
        ["الإحصاءات", "نفس ترتيب الهجوم"],
        ["الخسائر", "القائد يتحمل نحو 32% خسائر أكثر (B29) — جهّز المستشفى والعلاج"],
        ["النسبة", "المشاة هم الجدار، لذا نسبة مشاة عالية صحيحة. بدون فرسان في الحامية لا يفيد مكافأة فرسان Margot ولا «فرسانها يهاجمون مرة أخرى»؛ يبقى فقط هجوم +25% للجميع والمراوغة"],
        ["ميزة إضافية", "الأجزاء الدفاعية تعمل أيضًا عندما تُهاجَم مدينتك (B16، B20) — لا يستفيد القائد وحده"], ["المنضمون", "مهارة البطل الأول العلوية اليمنى لبقية المدافعين تُحتسب أيضًا، مثل المنضمين في الحشد"]] },
    ],
    gearT: "⚙️ الإحصاءات والمعدات (للجهتين)",
    gear: [["القاعدة", "القوة = (1 + هجوم)(1 + فتك) × (1 + دفاع)(1 + صحة). نقطة واحدة إضافية تساوي تقريبًا 1 ÷ (100 + النسبة الحالية)، لذا الإحصائية الأقل تعطي أكثر."], ["أين نحن", "معظم اللاعبين لديهم هجوم ودفاع أعلى بكثير من الفتك والصحة (مكافآت أبطال القوات ومعدات الحاكم تضيف هجومًا / دفاعًا). مثال: قائد بهجوم 209% وفتك 52%. والمحاكاة تؤكد: +50 فتك أفضل من +50 هجوم، والصحة أفضل من الدفاع."], ["حسب القوات", "المشاة جدار ← الصحة أهم. الفرسان والرماة يُلحقون الضرر ← الفتك أهم. الفرسان لا يُضربون ← صحتهم ودفاعهم بلا فائدة."], ["فتك + صحة (أولًا)", "جواهر الحاكم (فتك + صحة لذلك النوع؛ المستوى 2 ‏12% والمستوى 3 ‏16% لكل جوهرة) · معدات الأبطال: الخوذة والحذاء = فتك؛ القفازات والدرع = صحة (التحسين أولًا ثم الإتقان) · إحصاءات الأجزاء (فتك + صحة لقوات البطل؛ المستويات الأولى تحتاج 5 و10 و15 جزءًا فقط — أرخص 1%) · موهبة البطل عند الحد الأقصى · الحيوانات الأليفة تخفض فتك / صحة العدو"], ["هجوم + دفاع (ثانيًا)", "معدات الحاكم، مستوى البطل ونجومه (هجوم / دفاع القوات +200% إلى +444%)، الأبحاث، الأستاذ"], ["الترتيب: قادة الهجوم والدفاع", "صحة المشاة > فتك الفرسان / الرماة > دفاع المشاة > هجوم الفرسان / الرماة > صحة / دفاع الفرسان (بلا فائدة)"], ["الترتيب: قائد الدب", "فتك الرماة > هجوم الرماة > الفرسان > المشاة (الدب لا يهاجم: الصحة / الدفاع بلا فائدة)"], ["عند المسير فقط", "معدات الأبطال وإحصاءات الأجزاء تُحتسب فقط عندما يسير ذلك البطل — طوّر الأبطال الثلاثة الذين تقود بهم"]],
    whoT: "من يناسب أي جهة (اقتراح وليس قاعدة)",
    who: ["الهجوم: أعلى قوة في لوحات الترتيب (معدات الحاكم + معدات الأبطال + الأستاذ) ولديه أبطال أجزاء هجومية (Amadeus وPetra وMarlin / Rosa).", "الدفاع: لديه سعة حامية كبيرة، ويكون غالبًا في حامياتنا والأقوى فيها، ولديه أبطال أجزاء دفاعية (Jabel وZoe / Eric وJaeger).", "لا تُهدر الأجزاء المطوّرة: اذهب إلى الجهة التي تنتمي إليها أجزاؤك."],
    cards: "🃏 تقييم كل بطل لكل دور ← بطاقات الأبطال", src: "من تقارير معاركنا وتحليل الدب والمحاكاة ومهارات الأبطال (31/10/2026). B16، B20، B29 = أرقام تقارير معاركنا." },
  ko: { title: "🧭 공격 vs 방어", intro: "참고용: 공격 (집결 대장)과 방어 (방어 대장)에 각각 필요한 것, 1–5세대, 우리 전투 보고서와 시뮬레이션 기준.",
    whyT: "왜 나누나",
    why: ["집결은 대장의 능력치·영웅·전용 장비만, 방어는 방어 대장의 것만 써요. 집결원의 것은 전혀 계산되지 않아요.", "그래서 공격과 방어를 정말 골라야 하는 사람은 몇 명뿐이에요."],
    diffT: "다른 점 / 같은 점",
    diff: [["다른 점", "영웅 조합, 부속품 종류 (공격형 = 집결, 방어형 = 방어), 용량 종류 (집결 용량 vs 방어 용량)."], ["같은 점", "영주 장비, 보석, 영웅 장비: 능력치 우선순위는 공격과 방어가 같아요 (전투가 대칭) — 둘 다에 쓰이니 나눌 필요 없어요."]],
    roles: [
      { i: "⚔️", n: "공격 (집결 대장)", r: [
        ["영웅", "공격형 부속품 필요 — 보병: 아마데우스 (유료, 유일한 보병 집결형) / 헬가 (유료) · 기병: Petra (영웅 룰렛) / Thrud (고과금) · 궁병: 마린 → Rosa → Vivian"],
        ["부속품", "공격형: 아마데우스, Petra = 집결 공격; 헬가, 마린, Rosa, Thrud = 집결 파괴력"],
        ["능력치", "보병 HP, 기병·궁병 파괴력 먼저 — 아래 ⚙️ 참고"],
        ["용량", "집결 용량은 크게: 큰 집결 하나가 작은 집결 둘보다 강해요 (병력 손실은 병력 수의 1.5–2제곱에 비례)"],
        ["병종 비율", "50:20:30이 안정적, 보병은 40% 이상 유지 (시뮬레이션)"],
        ["전술", "강한 목표는 연속 집결 — 버려도 되는 집결 먼저, 가장 강한 대장은 마지막 (마지막 집결이 새 주둔군이 되고 그 대장 능력치를 써요)"],
        ["집결원", "영웅을 데려간 앞 4명: 공격 2 (아마네, Margot) + 파괴력 2 (첸코, 연우, 아마데우스)"]] },
      { i: "🛡️", n: "방어 (방어 대장)", r: [
        ["용량", "대장에게 가장 중요한 건 방어 용량 — 건물에 병력을 얼마나 넣을 수 있는지 정해요. 방어 용량부터 키우세요"], ["누구 능력치", "방어는 안에 있는 가장 강한 사람의 능력치와 영웅 스킬을 써요"],
        ["영웅", "방어형 부속품 필요 — 보병: 에릭 (세 스킬 모두 방어) / Alcar / Long Fei / 조이 (무과금 주력) · 기병: 제이벨 (무료) / Margot / 힐데 · 궁병: 예거 (세 스킬 모두 전투) / Saul (하나는 건설 속도)"],
        ["부속품", "방어형: 조이, Saul, Long Fei = 방어 공격; 제이벨 = 방어 파괴력; 에릭 = 방어 방어력; 힐데, 예거, Alcar = 방어 HP"],
        ["능력치", "공격과 같은 순서"],
        ["손실", "대장이 손실을 약 32% 더 떠안아요 (B29) — 병원과 치료를 준비하세요"],
        ["병종 비율", "보병이 벽이라 보병 비율이 높은 게 맞아요. 방어에 기병이 없으면 Margot의 기병 보너스와 “그녀의 기병 추가 공격”은 쓸모없고, 전체 공격 +25%와 회피만 남아요"],
        ["추가 이점", "방어형 부속품은 내 도시가 공격받을 때도 적용돼요 (B16, B20) — 대장만 이득이 아니에요"], ["집결원", "다른 방어자들의 첫 영웅 오른쪽 위 스킬도 적용돼요, 집결원처럼"]] },
    ],
    gearT: "⚙️ 능력치와 장비 (공격·방어 공통)",
    gear: [["원칙", "강도 = (1 + 공격)(1 + 파괴력) × (1 + 방어)(1 + HP). 어떤 능력치 +1%p의 효과 ≈ 1 ÷ (100 + 현재 %), 그래서 낮은 능력치일수록 이득이에요."], ["현재 상황", "대부분 공격·방어가 파괴력·HP보다 훨씬 높아요 (영웅 병종 보너스와 영주 장비가 공격·방어를 올려요). 예: 어떤 대장 부대 공격 209%, 파괴력 52%. 시뮬레이션도 같아요: +50이면 파괴력이 공격보다, HP가 방어보다 효과적."], ["병종별", "보병은 벽 → HP가 가장 중요. 기병·궁병은 딜러 → 파괴력이 가장 중요. 기병은 맞지 않아서 HP·방어는 쓸모없어요."], ["파괴력 + HP (먼저)", "영주 보석 (해당 병종 파괴력 + HP; Lv2 12%, Lv3 16%씩) · 영웅 장비: 투구·신발 = 파괴력, 장갑·갑옷 = HP (강화 먼저, 그다음 전문화) · 부속품 능력치 (영웅 병종 파괴력 + HP; 초반 레벨은 5, 10, 15개만 필요 — 1%당 가장 저렴) · 영웅 특성 (만렙·만성) · 펫 (상대 파괴력·HP 감소)"], ["공격 + 방어 (그다음)", "영주 장비, 영웅 레벨·성급 (병종 공격·방어 +200%~+444%), 연구, 마스터"], ["순서: 공격·방어 대장", "보병 HP > 기병·궁병 파괴력 > 보병 방어 > 기병·궁병 공격 > 기병 HP·방어 (쓸모없음)"], ["순서: 곰 사냥 대장", "궁병 파괴력 > 궁병 공격 > 기병 > 보병 (곰은 반격하지 않아 HP·방어는 쓸모없음)"], ["출전할 때만", "영웅 장비와 부속품 능력치는 그 영웅이 출전할 때만 계산돼요 — 대장으로 데려갈 3명만 키우세요"]],
    whoT: "누가 어느 쪽에 맞나 (제안, 규칙 아님)",
    who: ["공격: 순위표 강도 (영주 장비 + 영웅 장비 + 마스터)가 가장 높고 공격형 부속품 영웅 (아마데우스, Petra, 마린 / Rosa)이 있는 사람.", "방어: 방어 용량이 크고, 우리 방어에 자주 들어가 그 안에서 가장 강하며, 방어형 부속품 영웅 (제이벨, 조이 / 에릭, 예거)이 있는 사람.", "이미 많이 키운 부속품은 버리지 마세요: 부속품이 속한 쪽으로 가세요."],
    cards: "🃏 역할별 영웅 평가 → 영웅 카드", src: "우리 전투 보고서, 곰 사냥 분석, 시뮬레이션, 영웅 스킬 (2026-10-31). B16, B20, B29 = 우리 전투 보고서 번호." },
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
function render() {
  const L = t(), root = $("gr_root"); if (!root) return;
  const site = { zh: "zh", en: "en", pt: "pt", ar: "ar", ko: "ko" }[lang] || "en";
  const dl = (rows) => `<dl class="gr-dl">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;
  root.innerHTML = `
    <div class="gr-roles">${L.roles.map((r) => `<div class="card gr-role"><h4>${r.i} ${esc(r.n)}</h4>${dl(r.r)}</div>`).join("")}</div>
    ${hcHtml(L)}
    <div class="card"><h3>${esc(L.gearT)}</h3>${dl(L.gear)}</div>
    <div class="card"><h3>${esc(L.whoT)}</h3>${ul(L.who)}</div>
    <p><a class="btn" href="./#/${site}/hero-cards" target="_blank" rel="noopener">${esc(L.cards)}</a></p>
    <p class="muted" style="font-size:12.5px">${esc(L.src)}</p>`;
}
function applyTexts() { if ($("gr_title")) { $("gr_title").textContent = t().title; $("gr_intro").textContent = t().intro; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.growth = { init, applyTexts, setLang };
})();
