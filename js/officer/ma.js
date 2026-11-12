/* 🎓 Masters — research report (Sherry's research, still being tested; Project docs claude/master-report-2026-11-12.md,
   claude/master-cassia-analysis-2026-11-12.md, claude/master-skill-tables.md). Not official.
   Read-only text, no member data. Names follow data/terms.js. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-12";
const M = ["cassia", "roman", "valora", "pan"];
/* how useful each master is: 2 very, 1 a little, 0 not — rally leader (PvP), garrison lead, Bear leader, joining, Arena, development */
const USE = { cassia: [2, 2, 2, 1, 0, 1], roman: [1, 1, 1, 0, 2, 1], valora: [1, 1, 2, 2, 0, 2], pan: [1, 1, 0, 0, 0, 2] };
/* who raises whom: role, first, then, no hurry */
const ROLES = [["lead", ["cassia"], ["roman"], ["pan"]], ["bear", ["valora"], ["cassia"], ["pan"]], ["join", ["valora"], ["roman"], ["cassia"]], ["arena", ["roman"], [], []], ["dev", ["pan"], ["valora"], []]];
/* gems per 1% at the k-th Relationship Advancement: k, Roman, Valora / Pan, Cassia */
const COST = [[1, 3200, 3900, 11100], [2, 5900, 7400, 11100], [3, 8900, 11100, 22200], [5, 14800, 18500, 44400], [10, 29600, 37000, 69200]];
/* Cassia's stat skills: skill key, Master's Manuscripts to max, gems per 1% at Lv2 → Lv20 */
const SK = [["commando", 150000, "8,000 → 150,000"], ["firepower", 100000, "5,000 → 100,000"]];   // 1 Master's Manuscript ≈ 30 gems (Championship Shop: manuscript 15, General Master Emblem 1,500)
const T = {
  en: { title: "🎓 Masters", badge: "🔬 Our research · updated {d}",
    names: { cassia: "Cassia", roman: "Roman", valora: "Valora", pan: "Pan" }, titles: { cassia: "Battle Master", roman: "Arena Champion", valora: "Bear Hunter", pan: "Palace Administrator" },
    doH: "💡 Suggestions: who to raise first", cols: ["You mostly", "First", "Then", "No hurry"],
    roles: { lead: "Lead rallies or garrisons", bear: "Lead Bear Hunt rallies", join: "Join rallies", arena: "Play the Arena", dev: "Develop and gather" },
    do: ["Cassia's skills: Commando and Inspiring Mobilization first; take the three combat skills to Lv5–10 each before going higher.", "Relationship Advancement: Roman's first 3 are the cheapest; Cassia's first 2 are also good value, from the 3rd it gets expensive."],
    obsH: "🔎 What we saw", obs: ["A master's stats only count when your own stats are used: your own marches, rallies and garrisons you lead. In someone else's rally only the Squad size limit helps.", "Each 1% from Cassia adds 3–4 times the Power of a Governor Charm: Power grows much more than real strength."],
    mH: "🎓 The four masters", exp: "Expedition, max", sk: "Skills", eff: "Real effect, all maxed",
    m: { cassia: ["Lethality, Health +20%", "Attack, Defense +10% · Lethality, Health +10% · Rally capacity +100,000 · Squad size limit +10,000 · 600 free soldiers a day", "Bear / Terror leader +20–30% · PvP rally leader +20–25%", ""],
      roman: ["Attack, Defense +15%", "All in the Arena", "Bear leader +2% · PvP rally leader +4%", ""],
      valora: ["Attack +15%", "All in Bear Hunt: rally capacity +300,000 · your own Squad size limit +30,000 · Hunter Instinct (up to +30% to your own score) · Forgehammers and Enhancement XP every hunt", "Stats +2% · about 75 Forgehammers and 7,500 Enhancement XP a month", ""],
      pan: ["Defense +15%", "All non-combat: Reserve Chests, Intel Missions, Governor Stamina, faster Construction", "PvP rally leader +2% · Bear Hunt 0", ""] },
    useH: "Where each one helps", uses: ["Rally leader (PvP)", "Garrison lead", "Bear leader", "Joining rallies / Bear", "Arena", "Development"], legend: "✅ a lot · ⚠️ a little · — not at all",
    costH: "💎 Relationship Advancement: gems per 1%", costCols: ["Advancement", "Roman", "Valora / Pan", "Cassia"], nth: "#{n}",
    costNote: "1% of Lethality or Health is worth about 1.3 times 1% of Attack or Defense. Emblem counts are from the web.",
    getH: "🧭 Meeting them", get: ["You meet all four in the Realm Journey; each settles in at 1,000 Affinity.", "Order: Valora → Pan → Roman → Cassia.", "Valora settles in after about 25 stops. The later ones give +50, +100 or +200 per meeting, with many stops in between.", "Pan: about 8–9 days after you meet him. Cassia: 350 after about 55 stops."],
    unkH: "🟡 Not known yet", unks: ["The skills of the other four masters?", "How long from meeting Roman to settling in?"],
    howH: "🔢 How we worked it out", how: ["1 Master's Manuscript ≈ 30 gems (Championship Shop: 15 for a manuscript, 1,500 for a General Master Emblem). Manuscripts to max: Commando 150,000, Firepower to Win 100,000, Inspiring Mobilization 150,000.", "1% = +1% of one stat for one troop type; a stat for all troops counts as 3.", "Real effect is from our battle formula with a big account's stats; a smaller account gains a bit more.", "1 General Master Emblem ≈ 3,000 gems. Emblems to max: Roman 440, Valora / Pan 275, Cassia 1,820.", "Valora: one Bear Hunt every 2 days, about 15 a month; Weapon Obsession and Leader By Example Lv5 give 5 each per hunt."],
    skH: "Cassia's skills: gems per 1%", skCols: ["Skill", "Manuscripts to max", "Lv2 → Lv20"], sks: { commando: "Commando (Lethality + Health)", firepower: "Firepower to Win (Attack + Defense)", mobil: "Inspiring Mobilization (Rally capacity)", recruit: "Recruiter In Chief (free soldiers)" } },
  zh: { title: "🎓 大師", badge: "🔬 我們的研究 · 更新 {d}",
    names: { cassia: "卡斯蒂利亞", roman: "羅曼", valora: "維拉", pan: "潘" }, titles: { cassia: "戰術大師", roman: "競技之王", valora: "巨熊主宰", pan: "皇室總管" },
    doH: "💡 建議：誰先練哪位", cols: ["你主要是", "先", "再", "不急"],
    roles: { lead: "集結隊長、駐防帶頭", bear: "熊獵隊長", join: "加入者", arena: "打競技場", dev: "發展、採集" },
    do: ["卡斯蒂利亞的技能：突擊隊、徵召令先；三個戰鬥技能先各升到 Lv5–10，再往上。", "關係進階：羅曼前 3 次最便宜；卡斯蒂利亞前 2 次也划算，第 3 次起變貴。"],
    obsH: "🔎 我們觀察到", obs: ["大師的屬性只在用到你自己的屬性時有效：自己出征、自己帶的集結和駐防。加入別人的集結，只有出征容量有用。", "卡斯蒂利亞每 1% 加的實力是領主寶石的 3–4 倍：實力漲得比實際變強多。"],
    mH: "🎓 四位大師", exp: "遠征滿級", sk: "技能", eff: "全滿的實際效果",
    m: { cassia: ["殺傷力、生命值 +20%", "攻擊力、防禦力 +10% · 殺傷力、生命值 +10% · 集結容量 +100,000 · 出征容量 +10,000 · 每天 600 名免費士兵", "熊獵、巨獸隊長 +20–30% · PvP 集結隊長 +20–25%", ""],
      roman: ["攻擊力、防禦力 +15%", "全部在競技場", "熊獵隊長 +2% · PvP 集結隊長 +4%", ""],
      valora: ["攻擊力 +15%", "全部在狩獵巨熊：集結容量 +300,000 · 自己的出征容量 +30,000 · 狩獵本能（自己的積分最多 +30%）· 每場送鍛造錘和強化經驗值", "屬性 +2% · 一個月約 75 個鍛造錘、7,500 強化經驗值", ""],
      pan: ["防禦力 +15%", "全部非戰鬥：儲備寶箱、情報事件、領主體力、建造加速", "PvP 集結隊長 +2% · 熊獵 0", ""] },
    useH: "哪裡用得到", uses: ["集結隊長（PvP）", "駐防帶頭", "熊獵隊長", "加入集結、熊獵", "競技場", "發展"], legend: "✅ 很有用 · ⚠️ 有一點 · — 用不到",
    costH: "💎 關係進階：每 1% 要多少鑽石", costCols: ["第幾次進階", "羅曼", "維拉／潘", "卡斯蒂利亞"], nth: "第 {n} 次",
    costNote: "殺傷力、生命值的 1% 比攻擊力、防禦力的 1% 值錢約 1.3 倍。徽記數量是網路資料。",
    getH: "🧭 遇到和進駐", get: ["四位都在荒野冒險裡遇到，好感度 1,000 進駐。", "順序：維拉 → 潘 → 羅曼 → 卡斯蒂利亞。", "維拉約 25 站就進駐。後面幾位每次遇到 +50、+100 或 +200，中間隔很多站。", "潘：遇到後約 8–9 天。卡斯蒂利亞：約 55 站拿到 350。"],
    unkH: "🟡 還不知道的", unks: ["其他四位大師的技能？", "羅曼從遇到到進駐要多久？"],
    howH: "🔢 怎麼算的", how: ["1 個大師手稿 ≈ 30 鑽石（爭霸賽商店：大師手稿 15、通用大師徽記 1,500）。滿級要的大師手稿：突擊隊 150,000、火力連 100,000、徵召令 150,000。", "1% ＝ 單一兵種單一屬性 +1%；全兵種的一項算 3 個。", "實際效果用我們的戰鬥公式和大帳號的屬性估；小帳號比例再大一點。", "1 個通用大師徽記 ≈ 3,000 鑽石。滿級徽記：羅曼 440、維拉／潘 275、卡斯蒂利亞 1,820。", "維拉：兩天一場熊獵，一個月約 15 場；武器專精、經驗傳承 Lv5 每場各 5 個。"],
    skH: "卡斯蒂利亞的技能：每 1% 要多少鑽石", skCols: ["技能", "滿級要的大師手稿", "Lv2 → Lv20"], sks: { commando: "突擊隊（殺傷力＋生命值）", firepower: "火力連（攻擊力＋防禦力）", mobil: "徵召令（集結容量）", recruit: "預備役（免費士兵）" } },
  pt: { title: "🎓 Mestres", badge: "🔬 Nossa pesquisa · atualizado {d}",
    names: { cassia: "Cassia", roman: "Roman", valora: "Valora", pan: "Pan" }, titles: { cassia: "Mestre da Batalha", roman: "Campeão da Arena", valora: "Caça ao Urso", pan: "Administrador do Palácio" },
    doH: "💡 Sugestões: quem evoluir primeiro", cols: ["Você mais", "Primeiro", "Depois", "Sem pressa"],
    roles: { lead: "Lidera rallies ou guarnições", bear: "Lidera rallies da Caça ao Urso", join: "Entra em rallies", arena: "Joga a Arena", dev: "Desenvolve e coleta" },
    do: ["Habilidades da Cassia: Comando e Inspirando Mobilização primeiro; leve as três de combate a Nv5–10 cada antes de subir mais.", "Avanço no Relacionamento: os 3 primeiros do Roman são os mais baratos; os 2 primeiros da Cassia também valem, do 3º em diante fica caro."],
    obsH: "🔎 O que observamos", obs: ["Os atributos de um mestre só contam quando os seus atributos são usados: suas marchas, rallies e guarnições que você lidera. No rally de outra pessoa só ajuda o limite de tamanho do Esquadrão.", "Cada 1% da Cassia dá 3–4 vezes o Poder de um Amuleto do Governador: o Poder sobe bem mais que a força real."],
    mH: "🎓 Os quatro mestres", exp: "Expedição, máx.", sk: "Habilidades", eff: "Efeito real, tudo no máximo",
    m: { cassia: ["Letalidade, Vida +20%", "Ataque, Defesa +10% · Letalidade, Vida +10% · capacidade do rally +100.000 · limite de tamanho do Esquadrão +10.000 · 600 soldados grátis por dia", "Líder de Urso / Terror +20–30% · líder de rally PvP +20–25%", ""],
      roman: ["Ataque, Defesa +15%", "Tudo na Arena", "Líder de Urso +2% · líder de rally PvP +4%", ""],
      valora: ["Ataque +15%", "Tudo na Caça ao Urso: capacidade do rally +300.000 · seu limite de tamanho do Esquadrão +30.000 · Instinto de Caçador (até +30% na sua pontuação) · Martelos de Forja e XP de Aprimoramento a cada caça", "Atributos +2% · cerca de 75 Martelos de Forja e 7.500 de XP de Aprimoramento por mês", ""],
      pan: ["Defesa +15%", "Tudo fora de combate: Baús de Reserva, Missões de Informação, Vigor do Chefe, Construção mais rápida", "Líder de rally PvP +2% · Caça ao Urso 0", ""] },
    useH: "Onde cada um ajuda", uses: ["Líder de rally (PvP)", "Líder de guarnição", "Líder de Urso", "Entrar em rallies / Urso", "Arena", "Desenvolvimento"], legend: "✅ muito · ⚠️ um pouco · — nada",
    costH: "💎 Avanço no Relacionamento: gemas por 1%", costCols: ["Avanço", "Roman", "Valora / Pan", "Cassia"], nth: "{n}º",
    costNote: "1% de Letalidade ou Vida vale cerca de 1,3 vez 1% de Ataque ou Defesa. As quantidades de emblemas são da web.",
    getH: "🧭 Como encontrá-los", get: ["Você encontra os quatro na Jornada do Reino; cada um chega com 1.000 de Afinidade.", "Ordem: Valora → Pan → Roman → Cassia.", "Valora chega depois de umas 25 estações. Os seguintes dão +50, +100 ou +200 por encontro, com muitas estações no meio.", "Pan: cerca de 8–9 dias depois de encontrá-lo. Cassia: 350 depois de umas 55 estações."],
    unkH: "🟡 Ainda não sabemos", unks: ["As habilidades dos outros quatro mestres?", "Quanto tempo do encontro com o Roman até ele chegar?"],
    howH: "🔢 Como calculamos", how: ["1 Manuscrito de Mestre ≈ 30 gemas (Loja do Campeonato: 15 por manuscrito, 1.500 por Emblema de Mestre Geral). Manuscritos até o máximo: Comando 150.000, Poder de fogo para vencer 100.000, Inspirando Mobilização 150.000.", "1% = +1% de um atributo para um tipo de tropa; um atributo de todas as tropas conta 3.", "O efeito real vem da nossa fórmula de batalha com os atributos de uma conta grande; uma conta menor ganha um pouco mais.", "1 Emblema de Mestre Geral ≈ 3.000 gemas. Emblemas até o máximo: Roman 440, Valora / Pan 275, Cassia 1.820.", "Valora: uma Caça ao Urso a cada 2 dias, cerca de 15 por mês; Obsessão por Armas e Líder por Exemplo Nv5 dão 5 cada por caça."],
    skH: "Habilidades da Cassia: gemas por 1%", skCols: ["Habilidade", "Manuscritos até o máximo", "Nv2 → Nv20"], sks: { commando: "Comando (Letalidade + Vida)", firepower: "Poder de fogo para vencer (Ataque + Defesa)", mobil: "Inspirando Mobilização (capacidade do rally)", recruit: "Recrutador-chefe (soldados grátis)" } },
  ar: { title: "🎓 المتخصصون", badge: "🔬 بحثنا · آخر تحديث {d}",
    names: { cassia: "كاسيا", roman: "رومان", valora: "فالورا", pan: "بان" }, titles: { cassia: "سيد المعارك", roman: "بطل الساحة", valora: "صيد الدببة", pan: "مدير القصر" },
    doH: "💡 اقتراحات: من تطوّر أولًا", cols: ["أنت غالبًا", "أولًا", "ثم", "لا عجلة"],
    roles: { lead: "تقود الحشود أو الحاميات", bear: "تقود حشود صيد الدببة", join: "تنضم إلى الحشود", arena: "تلعب الساحة", dev: "تطوّر وتجمع" },
    do: ["مهارات كاسيا: المغوار وتعبئة ملهمة أولًا؛ ارفع مهارات القتال الثلاث إلى المستوى 5–10 لكل واحدة قبل الصعود أكثر.", "تقدم العلاقة: أول 3 لرومان هي الأرخص؛ أول 2 لكاسيا جيدة أيضًا، ومن الثالث يصبح غاليًا."],
    obsH: "🔎 ما لاحظناه", obs: ["سمات المتخصص تُحسب فقط عندما تُستخدم سماتك أنت: مسيراتك، والحشود والحاميات التي تقودها. في حشد غيرك لا يفيد إلا حد حجم الفرقة.", "كل 1% من كاسيا يضيف 3–4 أضعاف قوة تميمة الحاكم: القوة ترتفع أكثر بكثير من القوة الفعلية."],
    mH: "🎓 المتخصصون الأربعة", exp: "الحملة الاستكشافية، الحد الأقصى", sk: "المهارات", eff: "الأثر الفعلي عند الحد الأقصى",
    m: { cassia: ["قوة الفتك، الصحة +20%", "الهجوم، الدفاع +10% · قوة الفتك، الصحة +10% · سعة الحشد +100,000 · حد حجم الفرقة +10,000 · 600 جندي مجاني يوميًا", "قائد الدب / الوحش العملاق +20–30% · قائد حشد PvP ‏+20–25%", ""],
      roman: ["الهجوم، الدفاع +15%", "كلها في الساحة", "قائد الدب +2% · قائد حشد PvP ‏+4%", ""],
      valora: ["الهجوم +15%", "كلها في صيد الدببة: سعة الحشد +300,000 · حد حجم فرقتك +30,000 · غريزة الصياد (حتى +30% لنقاطك) · مطارق الحدادة وخبرة تحسين في كل صيد", "السمات +2% · نحو 75 مطرقة حدادة و7,500 خبرة تحسين شهريًا", ""],
      pan: ["الدفاع +15%", "كلها خارج القتال: صناديق الاحتياطي، مهام المعلومات، قدرة تحمل الحاكم، بناء أسرع", "قائد حشد PvP ‏+2% · صيد الدببة 0", ""] },
    useH: "أين يفيد كل واحد", uses: ["قائد الحشد (PvP)", "قائد الحامية", "قائد الدب", "الانضمام إلى الحشود / الدب", "الساحة", "التطوير"], legend: "✅ كثيرًا · ⚠️ قليلًا · — لا يفيد",
    costH: "💎 تقدم العلاقة: الجواهر لكل 1%", costCols: ["التقدم", "رومان", "فالورا / بان", "كاسيا"], nth: "#{n}",
    costNote: "1% من قوة الفتك أو الصحة يساوي نحو 1.3 ضعف 1% من الهجوم أو الدفاع. أعداد الشعارات من الإنترنت.",
    getH: "🧭 لقاؤهم واستقرارهم", get: ["تلتقي بالأربعة في رحلة العالم؛ كل واحد يستقر عند 1,000 تقارب.", "الترتيب: فالورا ← بان ← رومان ← كاسيا.", "فالورا تستقر بعد نحو 25 محطة. البقية يعطون +50 أو +100 أو +200 في كل لقاء، وبينها محطات كثيرة.", "بان: نحو 8–9 أيام بعد لقائه. كاسيا: 350 بعد نحو 55 محطة."],
    unkH: "🟡 غير معروف بعد", unks: ["مهارات المتخصصين الأربعة الآخرين؟", "كم يستغرق رومان من اللقاء إلى الاستقرار؟"],
    howH: "🔢 كيف حسبناها", how: ["مخطوطة متخصص واحدة ≈ 30 جوهرة (متجر البطولة: 15 للمخطوطة، 1,500 لشعار متخصص عام). المخطوطات حتى الحد الأقصى: المغوار 150,000، قوة نارية للنصر 100,000، تعبئة ملهمة 150,000.", "1% = +1% لسمة واحدة لنوع قوات واحد؛ السمة لكل القوات تُحسب 3.", "الأثر الفعلي من معادلة المعركة عندنا بسمات حساب كبير؛ الحساب الأصغر يكسب أكثر قليلًا.", "شعار متخصص عام واحد ≈ 3,000 جوهرة. الشعارات حتى الحد الأقصى: رومان 440، فالورا / بان 275، كاسيا 1,820.", "فالورا: صيد دببة واحد كل يومين، نحو 15 شهريًا؛ هوس السلاح والقائد القدوة بالمستوى 5 يعطيان 5 لكل صيد."],
    skH: "مهارات كاسيا: الجواهر لكل 1%", skCols: ["المهارة", "المخطوطات حتى الحد الأقصى", "المستوى 2 ← 20"], sks: { commando: "المغوار (قوة الفتك + الصحة)", firepower: "قوة نارية للنصر (الهجوم + الدفاع)", mobil: "تعبئة ملهمة (سعة الحشد)", recruit: "كبير المجندين (جنود مجانيون)" } },
  ko: { title: "🎓 거장", badge: "🔬 우리 연구 · 업데이트 {d}",
    names: { cassia: "카스티야", roman: "로만", valora: "베라", pan: "판" }, titles: { cassia: "전술 거장", roman: "경기의 왕", valora: "자이언트 베어 주석", pan: "황실 총지배인" },
    doH: "💡 제안: 누구를 먼저 키울까", cols: ["주로 하는 일", "먼저", "그다음", "천천히"],
    roles: { lead: "집결 대장, 수비 대장", bear: "곰 사냥 집결 대장", join: "집결 참여", arena: "경기장", dev: "발전, 채집" },
    do: ["카스티야 스킬: 돌격대와 소집령 먼저; 전투 스킬 셋을 각각 Lv5–10까지 올린 뒤에 더 올려.", "관계 진급: 로만의 처음 3번이 가장 싸; 카스티야의 처음 2번도 괜찮고, 3번째부터 비싸져."],
    obsH: "🔎 우리가 관찰한 것", obs: ["거장의 속성은 내 속성이 쓰일 때만 적용돼: 내 출정, 내가 이끄는 집결과 수비. 남의 집결에 참여하면 출정 부대 상한만 도움이 돼.", "카스티야의 1%는 영주 보석의 3–4배 전투력을 더해: 전투력이 실제 강해지는 것보다 훨씬 많이 올라."],
    mH: "🎓 거장 네 명", exp: "원정, 최대", sk: "스킬", eff: "전부 최대일 때 실제 효과",
    m: { cassia: ["파괴력, HP +20%", "공격력, 방어력 +10% · 파괴력, HP +10% · 집결 수용량 +100,000 · 출정 부대 상한 +10,000 · 매일 무료 병사 600명", "곰 사냥 / 괴수 대장 +20–30% · PvP 집결 대장 +20–25%", ""],
      roman: ["공격력, 방어력 +15%", "전부 경기장", "곰 사냥 대장 +2% · PvP 집결 대장 +4%", ""],
      valora: ["공격력 +15%", "전부 자이언트 베어 사냥: 집결 수용량 +300,000 · 내 출정 부대 상한 +30,000 · 사냥 본능(내 점수 최대 +30%) · 사냥마다 제작 망치와 강화 경험치", "속성 +2% · 한 달에 제작 망치 약 75개, 강화 경험치 7,500", ""],
      pan: ["방어력 +15%", "전부 비전투: 예비 보물상자, 정보 이벤트, 영주 스태미나, 건설 가속", "PvP 집결 대장 +2% · 곰 사냥 0", ""] },
    useH: "어디에 쓸모 있는지", uses: ["집결 대장 (PvP)", "수비 대장", "곰 사냥 대장", "집결 / 곰 사냥 참여", "경기장", "발전"], legend: "✅ 많이 · ⚠️ 조금 · — 없음",
    costH: "💎 관계 진급: 1%당 다이아", costCols: ["진급", "로만", "베라 / 판", "카스티야"], nth: "{n}회",
    costNote: "파괴력, HP의 1%는 공격력, 방어력의 1%보다 약 1.3배 값져. 배지 수는 웹 자료야.",
    getH: "🧭 만나기와 입주", get: ["네 명 모두 황야 모험에서 만나고, 호감도 1,000에 입주해.", "순서: 베라 → 판 → 로만 → 카스티야.", "베라는 약 25역 만에 입주해. 그 뒤 거장들은 만날 때마다 +50, +100 또는 +200이고, 사이에 역이 많아.", "판: 만난 뒤 약 8–9일. 카스티야: 약 55역에 350."],
    unkH: "🟡 아직 모르는 것", unks: ["다른 거장 네 명의 스킬은?", "로만은 만나서 입주까지 얼마나 걸려?"],
    howH: "🔢 어떻게 계산했는지", how: ["거장의 원고 1개 ≈ 30 다이아(챔피언십 상점: 원고 15, 공용 거장 배지 1,500). 최대까지 원고: 돌격대 150,000, 화력 연계 100,000, 소집령 150,000.", "1% = 한 병종의 한 속성 +1%; 전 병종 속성 하나는 3으로 계산.", "실제 효과는 우리 전투 공식에 큰 계정의 속성을 넣어 추정했어; 작은 계정은 조금 더 커.", "공용 거장 배지 1개 ≈ 3,000 다이아. 최대까지 배지: 로만 440, 베라 / 판 275, 카스티야 1,820.", "베라: 곰 사냥은 이틀에 한 번, 한 달 약 15번; 무기 마스터리와 경험 전승 Lv5는 사냥마다 5개씩."],
    skH: "카스티야 스킬: 1%당 다이아", skCols: ["스킬", "최대까지 거장의 원고", "Lv2 → Lv20"], sks: { commando: "돌격대 (파괴력 + HP)", firepower: "화력 연계 (공격력 + 방어력)", mobil: "소집령 (집결 수용량)", recruit: "예비역 (무료 병사)" } },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const nf = (n) => Math.round(n).toLocaleString("en-US");
const img = (k, cls) => `<img class="${cls}" src="figures/masters/${k}.webp" alt="" loading="lazy">`;
const who = (k) => `<span class="ma-who">${img(k, "ma-av")}<b>${esc(t("names")[k])}</b></span>`;
const MARK = ["—", "⚠️", "✅"];

function render() {
  const root = $("ma_root"); if (!root) return;
  root.innerHTML = `
  <div class="muted ma-small" style="margin:2px 0 10px">${esc(t("badge").replace("{d}", UPDATED))}</div>
  <div class="card rs-do"><h3>${esc(t("doH"))}</h3>
    <div class="ma-roles">${ROLES.map(([r, a, b, c]) => `<div class="ma-role"><b>${esc(t("roles")[r])}</b><div class="ma-steps">${[a, b, c].map((l, i) => l.length ? `<span class="ma-step${i === 2 ? " ma-late" : ""}"><i>${esc(t("cols")[i + 1])}</i>${l.map(who).join("")}</span>` : "").join("")}</div></div>`).join("")}</div>
    <ul class="rs-dol" style="margin-top:10px">${t("do").map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3 class="rs-h2">${esc(t("obsH"))}</h3><ul class="rs-dol">${t("obs").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("mH"))}</h3><div class="ma-grid">${M.map((k) => { const [e, s, f, n] = t("m")[k]; return `<div class="ma-card">
      <div class="ma-top">${img(k, "ma-pic")}<div><div class="ma-name">${esc(t("names")[k])}</div><div class="muted ma-small">${esc(t("titles")[k])}</div>${n ? `<div class="ma-tag">${esc(n)}</div>` : ""}</div></div>
      <dl class="ma-dl"><dt>${esc(t("exp"))}</dt><dd><b>${esc(e)}</b></dd><dt>${esc(t("sk"))}</dt><dd>${esc(s)}</dd><dt>${esc(t("eff"))}</dt><dd><b>${esc(f)}</b></dd></dl></div>`; }).join("")}</div>
    <h4 class="ma-h4">${esc(t("useH"))}</h4>
    <div style="overflow-x:auto"><table class="ma-t ma-use"><thead><tr><th></th>${M.map((k) => `<th>${img(k, "ma-av")}<div>${esc(t("names")[k])}</div></th>`).join("")}</tr></thead>
    <tbody>${t("uses").map((u, i) => `<tr><td>${esc(u)}</td>${M.map((k) => `<td class="u${USE[k][i]}">${MARK[USE[k][i]]}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <div class="muted ma-small" style="margin-top:6px">${esc(t("legend"))}</div></div>
  <div class="card"><h3>${esc(t("costH"))}</h3>
    <div style="overflow-x:auto"><table class="ma-t"><thead><tr>${t("costCols").map((c, i) => `<th${i ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${COST.map(([k, ...v]) => `<tr><td>${esc(t("nth").replace("{n}", k))}</td>${v.map((g) => `<td class="n">${nf(g)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <p class="muted ma-small" style="margin:8px 0 0">${esc(t("costNote"))}</p>
    <h4 class="ma-h4">${esc(t("skH"))}</h4><div style="overflow-x:auto"><table class="ma-t"><thead><tr>${[t("skCols")[0], t("skCols")[2]].map((c, i) => `<th${i ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${SK.map(([k, tot, per]) => `<tr><td>${esc(t("sks")[k])}</td><td class="n">${esc(per)}</td></tr>`).join("")}</tbody></table></div></div>
  <div class="card"><h3>${esc(t("getH"))}</h3><ul class="ma-ul">${t("get").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  ${OFFICER.vidCard("ma", lang)}
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="ma-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("howH"))}</b></summary><ul class="ma-ul" style="margin-top:8px">${t("how").map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
</details>
  `;
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("ma_title")) { $("ma_title").textContent = t("title"); $("ma_intro").textContent = ""; } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ma = { init, applyTexts, setLang };
})();
