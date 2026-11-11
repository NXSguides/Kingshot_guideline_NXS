/* NXS officer page — 🪓 Viking report (registers OFFICER_PAGES.vv; own tab, nobody by default, admins always).
   Sherry, 2026-11-04: our own research on how Viking Vengeance hands out kills and points — NOT game rules. Worked out from
   Sherry's screenshots and battle-report sums (difficulty 11, waves 1–20 on 2026-11-03; Project docs claude/vv-logic-spec.md
   and claude/kingshot-battle-rules.md B27–B29; 11/06 update: ~60 more reports, claude/vv-2026-11-06.md). It will keep changing as we test more. Told as pictures first, numbers folded away.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-06";
const P = { VI: 20, VII: 27, T8: 38, T9: 50, "IX TG1": 54, T10: 66, TG1: 71, TG2: 76, TG3: 83 };          // one troop's strength, X series (kills split by this)
const ELITE = [7, 14, 17];
const CITY_WAVES = Array.from({ length: 19 }, (_, i) => i + 1).filter((w) => w !== 10);   // waves 10 and 20 only hit the HQ, not the cities (Sherry 2026-11-04)
const hostPts = (w) => (ELITE.includes(w) ? 2 : 1) * (2700 + 1800 * w);
const T = {
  en: { title: "🪓 Viking report", intro: "", obs: ["A city that clears the wave gets a fixed score; the reinforcers' part is split by infantry × tier.", "Almost all kills come from infantry.", "Even when Ambusher triggers, cavalry can get everything, a part, or 0.", "In a city that clears the wave, buffs and heroes don't change your share."], obsH: "🔎 What we saw", howH: "🔢 How we worked it out",
    badge: "🔬 Our research · updated {d}",
    heroH: "Every wave has a fixed number of Vikings.", heroP: "If the city holds, they all die. So the question isn't how hard you hit — it's how much of the city's infantry is yours.",
    whoH: "⚔️ Who does the fighting",
    inf: "Infantry", infS: "Almost all the kills.",
    cav: "Cavalry", cavS: "Only when Ambusher triggers — and even then it can be 0.",
    arc: "Archers", arcS: "Reinforcing archers: 0.",
    heroNote: "🦸 Hero skill kills (Marlin's stone, Petra's cut…) aren't kept by the hero's owner — they go into the total and are shared by troops × tier like everything else. Tip: in the battle report's skill page, the Ambusher line only shows up when it triggered.",
    cakeH: "🍰 How the points are split", cakeP: "Each city gives out two fixed piles of points per wave. Kills only decide how the reinforcers' pile is cut.",
    wave: "Wave", elite: "Elite wave ×2",
    host: "🏠 City owner", hostS: "Fixed when the wave is cleared.",
    pool: "🤝 Reinforcers share", poolS: "Half of the owner's, split by infantry × tier.",
    waste: "Kills by the owner's own troops → that part of the pile goes to nobody.", empty: "No reinforcer in a city → nobody gets that pile.", short: "Not enough infantry to clear the wave → points shrink to the share killed.",
    calcH: "🧮 Try it: your slice", my: "My infantry", myT: "my tier", oth: "Other reinforcers' infantry", othT: "their tier",
    you: "You", others: "Others", res: "≈ {p} points this wave ({s} of the pile)",
    calcNote: "Estimate: assumes infantry clears the wave and the owner's troops kill nothing (the usual case).",
    tierH: "📏 Higher tier = a bigger slice", tierP: "Kills are split by one troop's strength:",
    tierEx: "1 TG3 infantry ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "IX series (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "💡 Suggestions",
    dos: ["Reinforce with your highest-tier infantry.", "City owners: keep only archers at home.", "Every city needs a reinforcer.", "Spread infantry over several cities.", "Can't send everything? Infantry first.", "Cities short on infantry get infantry first."],
    noH: "🤷 Doesn't change your points",
    nos: ["Buffs and pet debuffs, in a city that clears the wave.", "Which heroes you send, or being the garrison captain.", "Cavalry: only about ¼ of what infantry earns."],
    hqH: "🏯 Alliance HQ", hqP: "Waves 10 and 20 only attack the Alliance HQ, not the cities. Same idea: kills are split by infantry × tier. Points = kills × a fixed rate (wave 20: 0.5253 per kill). 11/06 wave 20: each X TG3 infantry killed about 0.83; Ambusher triggered, so each TG3 cavalry about 0.96.",
    unkH: "🟡 Not known yet",
    unks: ["How points are split when a city falls.", "Why a lone account holding its own city gets only ⅔ of the owner points.", "How much infantry a city needs to be sure to clear the wave.", "Which skill hero is best for the garrison.", "What decides how much cavalry gets after Ambusher triggers.", "When the owner's own archers get kills."],
    numH: "🔢 Numbers for those who want them", numCols: ["Wave", "City owner", "Reinforcers' pile"],
    perH: "Kills per 1,000 X TG3 infantry (11/06, average of the cities — one wave can differ 2× between cities; the less infantry in a city, the more each gets):", perCols: ["Wave", "Kills"],
    formH: "🧩 The three layers (for those who want the details)",
    forms: ["1 · Very exact: inside one troop type, your kills = that type's total × your (troops × one troop's strength) ÷ the city's. 11/06: ~60 reports, every person within 3 kills.",
      "2 · Depends on the battle: infantry + cavalry + archer kills = share killed × number of Vikings. Enough infantry → wave cleared, cavalry only via Ambusher, archers 0. Little infantry → cavalry take part; very little → maybe not cleared. Needs a round-by-round simulation to predict.",
      "3 · Points: owner = base points × share killed; reinforcers share half of the base, split by layer 1."],
    foot: "Source: Sparrow's screenshots and battle-report sums (11/03 difficulty 11, 11/06 ~60 reports). The formulas are worked back from report numbers, not from the game. Re-check after a game update." },
  zh: { title: "🪓 維京研究", intro: "", obs: ["守住的城每波分數固定；增援者那一份照「步兵數 × 兵等」分。", "擊殺幾乎都是步兵打的。", "奇襲觸發後，騎兵可能拿到全部、一部分，或 0。", "會全滅的城，增益和英雄不影響你分到多少。"], obsH: "🔎 我們觀察到", howH: "🔢 怎麼算的",
    badge: "🔬 我們的研究 · 更新 {d}",
    heroH: "每一波的維京人數是固定的。", heroP: "守住了就全部死光。所以重點不是打得多猛，而是城裡的步兵有多少是你的。",
    whoH: "⚔️ 誰在打",
    inf: "步兵", infS: "幾乎所有擊殺。",
    cav: "騎兵", cavS: "奇襲觸發才可能有——觸發了也可能是 0。",
    arc: "弓兵", arcS: "增援的弓兵 0。",
    heroNote: "🦸 英雄技能的擊殺（馬林的石頭、小佩拉的切牌…）不會只給帶那位英雄的人，而是併進總數，一樣照「兵數 × 兵等」分給大家。小知識：戰報技能頁裡，「奇襲」那一行只在觸發時才會出現。",
    cakeH: "🍰 分數怎麼分", cakeP: "每座城每一波發兩份固定的分數。擊殺只決定「增援者那一份」怎麼切。",
    wave: "第幾波", elite: "菁英波 ×2",
    host: "🏠 城主", hostS: "全滅時固定。",
    pool: "🤝 增援者一起分", poolS: "城主的一半，照「步兵數 × 兵等」分。",
    waste: "城主自己的兵殺到的那部分 → 沒人拿，浪費掉。", empty: "沒人增援的城 → 那一份整個沒人拿。", short: "步兵不夠殺不完 → 分數照殺掉的比例給。",
    calcH: "🧮 算算看：你那一塊", my: "我的步兵", myT: "我的兵等", oth: "其他增援者的步兵", othT: "他們的兵等",
    you: "你", others: "其他人", res: "這一波約 {p} 分（那一份的 {s}）",
    calcNote: "估算：假設步兵清得完、城主自己的兵 0 擊殺（大多數情況）。",
    tierH: "📏 兵等越高，切得越大", tierP: "擊殺照單兵實力的比例分：",
    tierEx: "1 隻 TG3 步兵 ≈ 1.17 隻 TG1 ≈ 1.66 隻 T9", tierIX: "IX 系列（Supreme）：T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "💡 建議",
    dos: ["增援帶兵等最高的步兵。", "城主家裡只留弓兵。", "每座城都要有人增援。", "步兵分散到多座城。", "派不完時先派步兵。", "步兵不夠的城優先補步兵。"],
    noH: "🤷 不會改變你的分數",
    nos: ["會全滅的城：增益、寵物減益。", "帶什麼英雄、是不是駐守隊長。", "騎兵：平均只拿到步兵的約 1/4。"],
    hqH: "🏯 聯盟總部", hqP: "第 10、20 波只打聯盟總部，不打城。一樣照「步兵數 × 兵等」分擊殺。分數 = 擊殺 × 固定係數（第 20 波每個擊殺 0.5253 分）。11/06 第 20 波：每隻 X TG3 步兵約殺 0.83 隻；那場奇襲有觸發，每隻 TG3 騎兵約 0.96 隻。",
    unkH: "🟡 還不知道的",
    unks: ["城守不住時分數怎麼算。", "小帳自己守城（沒有增援）為什麼基本分只有城主分的 2/3。", "城裡要多少步兵才保證全滅。", "駐防的技能英雄要怎麼選。", "奇襲觸發後騎兵分到多少由什麼決定。", "城主自己的弓兵什麼時候有分。"],
    numH: "🔢 給想看數字的人", numCols: ["波", "城主", "增援者那一份"],
    perH: "每 1,000 隻 X TG3 步兵大概殺多少（11/06 各城平均；同一波不同城可差 2 倍，城裡步兵越少，每隻分越多）：", perCols: ["波", "擊殺"],
    formH: "🧩 三層公式（給想看細節的人）",
    forms: ["1 · 很準：同一兵種裡，你的擊殺 = 該兵種總擊殺 × 你的（兵數 × 單兵實力）÷ 全城的（兵數 × 單兵實力）。11/06 約 60 份戰報，每人誤差 3 隻以內。",
      "2 · 看戰況：步＋騎＋弓總擊殺 = 殺掉的比例 × 維京人數。步兵夠 → 全滅、騎兵靠奇襲、弓兵 0；步兵偏少 → 騎兵分一部分；步兵很少 → 可能殺不完。要逐回合模擬才算得準。",
      "3 · 分數：城主 = 基本分 × 殺掉的比例；增援者分基本分的一半，照第 1 層的擊殺比例分。"],
    foot: "來源：Sparrow 的截圖和戰報加總（11/03 難度 11、11/06 約 60 份戰報）。公式是從戰報數字反推的，不是遊戲官方說明。遊戲改版後要重新確認。" },
  pt: { title: "🪓 Estudo Viking", intro: "", obs: ["Uma cidade que elimina a onda ganha pontuação fixa; a parte dos reforços é dividida por infantaria × nível.", "Quase todos os abates vêm da infantaria.", "Mesmo quando o Emboscador ativa, a Cavalaria pode ficar com tudo, uma parte ou 0.", "Numa cidade que elimina a onda, bônus e heróis não mudam a sua parte."], obsH: "🔎 O que observamos", howH: "🔢 Como calculamos",
    badge: "🔬 Nossa pesquisa · atualizado {d}",
    heroH: "Cada onda tem um número fixo de vikings.", heroP: "Se a cidade aguenta, todos morrem. Então a questão não é o quanto você bate — é quanto da infantaria da cidade é sua.",
    whoH: "⚔️ Quem luta",
    inf: "Infantaria", infS: "Quase todos os abates.",
    cav: "Cavalaria", cavS: "Só quando o Emboscador ativa — e mesmo assim pode ser 0.",
    arc: "Arquearia", arcS: "Arquearia de reforço: 0.",
    heroNote: "🦸 Abates de habilidades de herói (a pedra do Peixe Marlin, o corte da Petra…) não ficam com o dono do herói — entram no total e são divididos por tropas × nível, como todo o resto. Dica: na página de habilidades do relatório de batalha, a linha do Emboscador só aparece quando ele ativou.",
    cakeH: "🍰 Como os pontos são divididos", cakeP: "Cada cidade dá duas pilhas fixas de pontos por onda. Os abates só decidem como a pilha dos reforços é cortada.",
    wave: "Onda", elite: "Onda de elite ×2",
    host: "🏠 Dono da cidade", hostS: "Fixa quando a onda é eliminada.",
    pool: "🤝 Parte dos reforços", poolS: "Metade da do dono, dividida por infantaria × nível.",
    waste: "Abates das tropas do próprio dono → essa parte da pilha não vai para ninguém.", empty: "Cidade sem reforço → ninguém ganha essa pilha.", short: "Infantaria insuficiente para eliminar a onda → os pontos caem para a parte abatida.",
    calcH: "🧮 Teste: a sua fatia", my: "Minha infantaria", myT: "meu nível", oth: "Infantaria dos outros reforços", othT: "nível deles",
    you: "Você", others: "Outros", res: "≈ {p} pontos nesta onda ({s} da pilha)",
    calcNote: "Estimativa: supõe que a infantaria elimina a onda e que as tropas do dono não abatem nada (o caso normal).",
    tierH: "📏 Nível mais alto = fatia maior", tierP: "Os abates são divididos pela força de uma tropa:",
    tierEx: "1 infantaria TG3 ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "Série IX (Suprema): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "💡 Sugestões",
    dos: ["Reforce com sua infantaria de nível mais alto.", "Donos de cidade: deixem só a arquearia em casa.", "Toda cidade precisa de um reforço.", "Espalhe a infantaria por várias cidades.", "Não dá para enviar tudo? Infantaria primeiro.", "Cidades com pouca infantaria recebem infantaria primeiro."],
    noH: "🤷 Não muda seus pontos",
    nos: ["Bônus e debuffs de pet, numa cidade que elimina a onda.", "Quais heróis você envia, ou ser o capitão da guarnição.", "Cavalaria: só cerca de ¼ do que a infantaria ganha."],
    hqH: "🏯 QG da Aliança", hqP: "As ondas 10 e 20 só atacam o QG, não as cidades. Mesma ideia: os abates são divididos por infantaria × nível. Pontos = abates × uma taxa fixa (onda 20: 0.5253 por abate). 11/06 onda 20: cada infantaria X TG3 abateu cerca de 0.83; o Emboscador ativou, então cada cavalaria TG3 cerca de 0.96.",
    unkH: "🟡 Ainda não sabemos",
    unks: ["Como os pontos são divididos quando uma cidade cai.", "Por que uma conta sozinha defendendo a própria cidade ganha só ⅔ dos pontos de dono.", "Quanta infantaria uma cidade precisa para ter certeza de eliminar a onda.", "Qual herói de habilidade é o melhor para a guarnição.", "O que decide quanto a cavalaria ganha depois que o Emboscador ativa.", "Quando a arquearia do próprio dono ganha abates."],
    numH: "🔢 Números para quem quiser", numCols: ["Onda", "Dono da cidade", "Pilha dos reforços"],
    perH: "Abates por 1,000 infantarias X TG3 (11/06, média das cidades — numa mesma onda pode haver diferença de 2× entre cidades; quanto menos infantaria na cidade, mais cada uma ganha):", perCols: ["Onda", "Abates"],
    formH: "🧩 As três camadas (para quem quer os detalhes)",
    forms: ["1 · Muito exata: dentro de um tipo de tropa, seus abates = total desse tipo × suas (tropas × força de uma tropa) ÷ as da cidade. 11/06: ~60 relatórios, cada pessoa com erro de no máximo 3 abates.",
      "2 · Depende da batalha: abates de infantaria + cavalaria + arquearia = parte abatida × número de vikings. Infantaria suficiente → onda eliminada, cavalaria só com Emboscador, arquearia 0. Pouca infantaria → a cavalaria participa; muito pouca → talvez não elimine. Para prever, precisa de uma simulação rodada a rodada.",
      "3 · Pontos: dono = pontos base × parte abatida; os reforços dividem metade da base, conforme a camada 1."],
    foot: "Fonte: capturas de tela do Sparrow e somas dos relatórios de batalha (11/03 dificuldade 11, 11/06 ~60 relatórios). As fórmulas foram deduzidas dos números dos relatórios, não do jogo. Confira de novo depois de uma atualização do jogo." },
  ar: { title: "🪓 دراسة الفايكنغ", intro: "", obs: ["المدينة التي تنهي الموجة تحصل على نقاط ثابتة؛ حصة المعزّزين تُقسم حسب المشاة × المستوى.", "معظم القتلى يأتي من المشاة.", "حتى عند تفعيل المتربص، قد يحصل الفرسان على الكل أو جزء أو 0.", "في مدينة تنهي الموجة، التعزيزات والأبطال لا يغيّرون حصتك."], obsH: "🔎 ما لاحظناه", howH: "🔢 كيف حسبناها",
    badge: "🔬 بحثنا · آخر تحديث {d}",
    heroH: "لكل موجة عدد ثابت من الفايكنغ.", heroP: "إذا صمدت المدينة يموتون كلهم. لذلك السؤال ليس كم تضرب بقوة — بل كم من مشاة المدينة لك.",
    whoH: "⚔️ من يقاتل",
    inf: "المشاة", infS: "معظم القتلى.",
    cav: "الفرسان", cavS: "فقط عند تفعيل المتربص — وحتى عندها قد يكون 0.",
    arc: "الرماة", arcS: "رماة التعزيز: 0.",
    heroNote: "🦸 قتلى مهارات الأبطال (حجر مارلين، ضربة بيترا…) لا تبقى لصاحب البطل — تدخل في المجموع وتُقسم حسب القوات × المستوى مثل كل شيء آخر. نصيحة: في صفحة المهارات في تقرير المعركة، سطر المتربص يظهر فقط عندما يتفعّل.",
    cakeH: "🍰 كيف تُقسم النقاط", cakeP: "كل مدينة تعطي حصتين ثابتتين من النقاط في كل موجة. القتلى تحدد فقط كيف تُقسم حصة المعززين.",
    wave: "الموجة", elite: "موجة النخبة ×2",
    host: "🏠 صاحب المدينة", hostS: "ثابتة عند إنهاء الموجة.",
    pool: "🤝 حصة المعززين", poolS: "نصف نقاط صاحب المدينة، تُقسم حسب المشاة × المستوى.",
    waste: "قتلى قوات صاحب المدينة نفسه → ذلك الجزء من الحصة لا يأخذه أحد.", empty: "مدينة بلا معزز → لا أحد يأخذ تلك الحصة.", short: "مشاة لا تكفي لإنهاء الموجة → النقاط بنسبة ما قُتل.",
    calcH: "🧮 جرّب: حصتك", my: "مشاتي", myT: "مستواي", oth: "مشاة المعززين الآخرين", othT: "مستواهم",
    you: "أنت", others: "الآخرون", res: "≈ {p} نقطة في هذه الموجة ({s} من الحصة)",
    calcNote: "تقدير: يفترض أن المشاة تنهي الموجة وأن قوات صاحب المدينة لا تقتل شيئاً (الحالة المعتادة).",
    tierH: "📏 مستوى أعلى = حصة أكبر", tierP: "تُقسم القتلى حسب قوة الجندي الواحد:",
    tierEx: "1 مشاة TG3 ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "سلسلة IX (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "💡 اقتراحات",
    dos: ["عزّز بمشاتك من أعلى مستوى.", "أصحاب المدن: أبقوا الرماة فقط في المدينة.", "كل مدينة تحتاج معززًا.", "وزّع المشاة على عدة مدن.", "لا تستطيع إرسال كل شيء؟ المشاة أولًا.", "المدن قليلة المشاة تأخذ المشاة أولًا."],
    noH: "🤷 لا يغيّر نقاطك",
    nos: ["التعزيزات وإضعافات الحيوان الأليف، في مدينة تنهي الموجة.", "أي أبطال ترسل، أو أن تكون قائد الحامية.", "الفرسان: نحو ¼ فقط مما يحصل عليه المشاة."],
    hqH: "🏯 مقر التحالف", hqP: "الموجتان 10 و20 تهاجمان المقر فقط، لا المدن. نفس الفكرة: تُقسم القتلى حسب المشاة × المستوى. النقاط = القتلى × معدل ثابت (الموجة 20: 0.5253 لكل قتيل). 11/06 الموجة 20: كل جندي مشاة X TG3 قتل حوالي 0.83؛ تفعّل المتربص، فكل فارس TG3 قتل حوالي 0.96.",
    unkH: "🟡 لا نعرف بعد",
    unks: ["كيف تُقسم النقاط عندما تسقط مدينة.", "لماذا يأخذ حساب وحيد يدافع عن مدينته ⅔ فقط من نقاط صاحب المدينة.", "كم مشاة تحتاج المدينة لتنهي الموجة بالتأكيد.", "أي بطل مهارات هو الأفضل للحامية.", "ما الذي يحدد كم يأخذ الفرسان بعد تفعيل المتربص.", "متى يحصل رماة صاحب المدينة على قتلى."],
    numH: "🔢 أرقام لمن يريدها", numCols: ["الموجة", "صاحب المدينة", "حصة المعززين"],
    perH: "القتلى لكل 1,000 جندي مشاة X TG3 (11/06، متوسط المدن — قد تختلف الموجة نفسها 2× بين المدن؛ كلما قلّت المشاة في المدينة، أخذ كل جندي أكثر):", perCols: ["الموجة", "القتلى"],
    formH: "🧩 الطبقات الثلاث (لمن يريد التفاصيل)",
    forms: ["1 · دقيقة جداً: داخل نوع واحد من القوات، قتلاك = مجموع ذلك النوع × (قواتك × قوة الجندي الواحد) ÷ نفس القيمة للمدينة كلها. 11/06: ~60 تقريراً، كل شخص بفارق 3 قتلى أو أقل.",
      "2 · تعتمد على المعركة: قتلى المشاة + الفرسان + الرماة = نسبة القتلى × عدد الفايكنغ. مشاة كافية → تنتهي الموجة، الفرسان فقط عبر المتربص، الرماة 0. مشاة قليلة → يشارك الفرسان؛ قليلة جداً → ربما لا تنتهي. التوقع يحتاج محاكاة جولة بجولة.",
      "3 · النقاط: صاحب المدينة = النقاط الأساسية × نسبة القتلى؛ المعززون يتقاسمون نصف الأساس حسب الطبقة 1."],
    foot: "المصدر: لقطات شاشة Sparrow ومجاميع تقارير المعارك (11/03 الصعوبة 11، 11/06 ~60 تقريراً). استنتجنا الصيغ من أرقام التقارير، لا من اللعبة. تحقق مرة أخرى بعد تحديث اللعبة." },
  ko: { title: "🪓 바이킹 연구", intro: "", obs: ["웨이브를 다 처치한 도시는 고정 점수를 받고, 증원자 몫은 보병 × 등급으로 나눠.", "처치는 거의 다 보병이 해.", "기습이 발동해도 기병은 전부, 일부, 또는 0을 받을 수 있어.", "웨이브를 다 처치하는 도시에서는 버프와 영웅이 내 몫을 바꾸지 않아."], obsH: "🔎 우리가 관찰한 것", howH: "🔢 어떻게 계산했는지",
    badge: "🔬 우리 연구 · 업데이트 {d}",
    heroH: "웨이브마다 바이킹 수는 정해져 있음.", heroP: "도시가 버티면 전부 죽음. 그래서 중요한 건 얼마나 세게 때리느냐가 아니라 — 도시 보병 중 내 보병이 얼마나 되느냐.",
    whoH: "⚔️ 누가 싸우나",
    inf: "보병", infS: "거의 모든 처치.",
    cav: "기병", cavS: "기습이 발동할 때만 — 그래도 0일 수 있어.",
    arc: "궁병", arcS: "증원 궁병: 0.",
    heroNote: "🦸 영웅 스킬 처치 (마린의 돌, 리틀 페라의 카드…)는 그 영웅 주인이 갖지 않음 — 전체에 합쳐져서 다른 처치처럼 병력 × 등급으로 나눔. 팁: 전투 보고서 스킬 페이지에서 기습 줄은 발동했을 때만 보임.",
    cakeH: "🍰 점수 나누는 방식", cakeP: "각 도시는 웨이브마다 고정된 점수 두 덩어리를 줌. 처치는 증원자 덩어리를 어떻게 자를지만 정함.",
    wave: "웨이브", elite: "정예 웨이브 ×2",
    host: "🏠 도시 주인", hostS: "웨이브를 다 처치하면 고정.",
    pool: "🤝 증원자 몫", poolS: "도시 주인의 절반, 보병 × 등급으로 나눔.",
    waste: "도시 주인 본인 병력의 처치 → 그 부분은 아무도 못 받음.", empty: "증원자가 없는 도시 → 그 덩어리는 아무도 못 받음.", short: "보병이 부족해 다 못 잡으면 → 처치한 비율만큼만 점수.",
    calcH: "🧮 계산해 보기: 내 몫", my: "내 보병", myT: "내 등급", oth: "다른 증원자 보병", othT: "그들 등급",
    you: "나", others: "다른 사람", res: "이번 웨이브 ≈ {p}점 (덩어리의 {s})",
    calcNote: "추정: 보병이 웨이브를 다 처치하고 도시 주인 병력은 처치 0이라고 가정 (보통의 경우).",
    tierH: "📏 높은 등급 = 더 큰 몫", tierP: "처치는 병사 한 명의 힘에 따라 나눔:",
    tierEx: "TG3 보병 1 ≈ TG1 1.17 ≈ T9 1.66", tierIX: "IX 시리즈 (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "💡 제안",
    dos: ["가장 높은 등급 보병으로 증원.", "도시 주인: 집에는 궁병만 남기기.", "모든 도시에 증원자가 필요.", "보병을 여러 도시에 나누기.", "전부 못 보내면 보병 먼저.", "보병이 부족한 도시에 보병 먼저."],
    noH: "🤷 점수에 영향 없음",
    nos: ["웨이브를 다 처치하는 도시의 버프와 펫 디버프.", "어떤 영웅을 보내는지, 주둔 대장인지.", "기병: 보병의 약 ¼만 받음."],
    hqH: "🏯 연맹 본부", hqP: "10·20웨이브는 도시가 아니라 본부만 공격. 원리는 같음: 처치는 보병 × 등급으로 나눔. 점수 = 처치 × 고정 비율 (20웨이브: 처치당 0.5253). 11/06 20웨이브: X TG3 보병 하나당 약 0.83 처치; 기습이 발동해서 TG3 기병 하나당 약 0.96.",
    unkH: "🟡 아직 모름",
    unks: ["도시가 함락되면 점수를 어떻게 나누는지.", "혼자 자기 도시를 지키는 계정이 왜 도시 주인 점수의 ⅔만 받는지.", "웨이브를 확실히 다 처치하려면 도시에 보병이 얼마나 필요한지.", "주둔에 가장 좋은 스킬 영웅은 누구인지.", "기습 발동 후 기병 몫은 무엇이 정하는지.", "도시 주인 본인 궁병은 언제 처치를 받는지."],
    numH: "🔢 숫자 보고 싶은 사람용", numCols: ["웨이브", "도시 주인", "증원자 덩어리"],
    perH: "X TG3 보병 1,000당 처치 수 (11/06, 도시 평균 — 같은 웨이브라도 도시마다 2× 차이 날 수 있음; 도시에 보병이 적을수록 하나당 더 많이 받음):", perCols: ["웨이브", "처치"],
    formH: "🧩 세 단계 (자세히 보고 싶은 사람용)",
    forms: ["1 · 매우 정확: 같은 병종 안에서 내 처치 = 그 병종 전체 처치 × 내 (병력 × 병사 한 명의 힘) ÷ 도시 전체의 같은 값. 11/06: 보고서 ~60개, 모든 사람이 3 처치 이내로 맞음.",
      "2 · 전투에 따라 다름: 보병 + 기병 + 궁병 처치 = 처치 비율 × 바이킹 수. 보병 충분 → 웨이브 처치 완료, 기병은 기습으로만, 궁병 0. 보병 적음 → 기병도 참여; 아주 적음 → 다 못 잡을 수 있음. 예측하려면 라운드별 시뮬레이션 필요.",
      "3 · 점수: 도시 주인 = 기본 점수 × 처치 비율; 증원자는 기본 점수의 절반을 1단계 비율대로 나눔."],
    foot: "출처: Sparrow의 스크린샷과 전투 보고서 합계 (11/03 난이도 11, 11/06 보고서 ~60개). 공식은 게임이 아니라 보고서 숫자에서 거꾸로 계산한 것. 게임 업데이트 후 다시 확인 필요." },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const PER1K = [[1, 4.5], [3, 11], [4, 19], [5, 29], [7, 52], [8, 56], [9, 71], ["10 🏯", 45]];   // kills per 1,000 X TG3 infantry, 11/06 average of the cities
const S = { wave: 9, my: 60000, myT: "TG3", oth: 180000, othT: "TG1" };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-vv") || "{}")); } catch (e) {}
if (!CITY_WAVES.includes(S.wave)) S.wave = 9;
for (const k of ["myT", "othT"]) if (!(S[k] in P)) S[k] = k === "myT" ? "TG3" : "TG1";
const keep = () => { try { localStorage.setItem("nxs-vv", JSON.stringify(S)); } catch (e) {} };

function troop(img, name, line, cls) {
  return `<figure class="vv-tr ${cls}"><img src="figures/vv/${img}.webp" alt="" loading="lazy"><figcaption><b>${esc(name)}</b><span>${esc(line)}</span></figcaption></figure>`;
}
const tierSel = (id, v) => `<select class="inp" id="${id}">${Object.keys(P).map((k) => `<option${k === v ? " selected" : ""}>${k}</option>`).join("")}</select>`;
function cakeHtml() {
  const w = S.wave, h = hostPts(w), pool = h / 2;
  const me = S.my * P[S.myT], ot = S.oth * P[S.othT], share = me + ot > 0 ? me / (me + ot) : 0;
  return `<div class="vv-wave"><span>${esc(t("wave"))}</span>${ELITE.includes(w) ? `<span class="vv-elite">${esc(t("elite"))}</span>` : ""}</div>
    <div class="vv-waves" role="group" aria-label="${esc(t("wave"))}">${CITY_WAVES.map((n) => `<button type="button" class="vv-wb${n === w ? " on" : ""}${ELITE.includes(n) ? " el" : ""}" data-w="${n}">${n}</button>`).join("")}</div>
    <div class="vv-piles">
      <div class="vv-pile"><div class="vv-pk">${esc(t("host"))}</div><div class="vv-bar"><i class="host" style="width:100%"></i></div><div class="vv-pv">${fmt(h)}</div><div class="vv-ps">${esc(t("hostS"))}</div></div>
      <div class="vv-pile"><div class="vv-pk">${esc(t("pool"))}</div><div class="vv-bar half"><i class="me" style="width:${(share * 100).toFixed(1)}%"></i><i class="oth" style="width:${((1 - share) * 100).toFixed(1)}%"></i></div><div class="vv-pv">${fmt(pool)}</div><div class="vv-ps">${esc(t("poolS"))}</div>
        <div class="vv-key"><span><i class="me"></i>${esc(t("you"))}</span><span><i class="oth"></i>${esc(t("others"))}</span></div></div>
    </div>
    <div class="vv-calc"><h4>${esc(t("calcH"))}</h4>
      <div class="vv-in"><label>${esc(t("my"))}<input class="inp" id="vv_my" type="number" min="0" step="1000" value="${S.my}"></label><label>${esc(t("myT"))}${tierSel("vv_myT", S.myT)}</label></div>
      <div class="vv-in"><label>${esc(t("oth"))}<input class="inp" id="vv_oth" type="number" min="0" step="1000" value="${S.oth}"></label><label>${esc(t("othT"))}${tierSel("vv_othT", S.othT)}</label></div>
      <div class="vv-res">${esc(t("res").replace("{p}", fmt(pool * share)).replace("{s}", (share * 100).toFixed(1) + "%"))}</div></div>
    <ul class="vv-warn"><li>🗑️ ${esc(t("waste"))}</li><li>🏚️ ${esc(t("empty"))}</li><li>⚠️ ${esc(t("short"))}</li></ul>`;
}
function render() {
  const root = $("vv_root"); if (!root) return;
  const max = P.TG3;
  root.innerHTML = `
  <div class="vv-hero" style="background-image:url(figures/vv/viking.webp)"><div class="vv-hero-in">
    <span class="vv-badge">${esc(t("badge").replace("{d}", UPDATED))}</span>
    </div></div>
  <div class="card rs-do"><h3>${esc(t("doH"))}</h3><ol class="vv-dos">${t("dos").map((d, i) => `<li><span class="vv-ic">${["<img src=\"figures/vv/inf.webp\" alt=\"\">", "<img src=\"figures/vv/arc.webp\" alt=\"\">", "🏰", "🗺️", "<img src=\"figures/vv/cav.webp\" alt=\"\">", "⚠️"][i]}</span><span>${esc(d)}</span></li>`).join("")}</ol></div>
  <div class="card"><h3>${esc(t("whoH"))}</h3>
    <div class="vv-trs">${troop("inf", t("inf"), t("infS"), "on")}${troop("cav", t("cav"), t("cavS"), "off")}${troop("arc", t("arc"), t("arcS"), "off")}</div></div>
  <div class="card"><h3>${esc(t("cakeH"))}</h3><div id="vv_cake">${cakeHtml()}</div></div>
  <div class="card"><h3>${esc(t("tierH"))}</h3><p class="vv-p">${esc(t("tierP"))}</p>
    <div class="vv-tiers">${Object.entries(P).map(([k, v]) => `<div class="vv-tier"><span>${k}</span><div class="vv-tb"><i style="width:${(v / max * 100).toFixed(1)}%"></i></div><b>${v}</b></div>`).join("")}</div>
    <p class="vv-ex">${esc(t("tierEx"))}</p><div class="muted vv-small">${esc(t("tierIX"))}</div></div>
  <div class="vv-two">
    <div class="card"><h3>${esc(t("noH"))}</h3><ul class="vv-ul">${t("nos").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="vv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  </div>
  <details class="card vv-num"><summary>${esc(t("howH"))}</summary>
    <h4 style="margin:12px 0 4px">${esc(t("hqH"))}</h4><p class="vv-p">${esc(t("hqP"))}</p>
    <h4 style="margin:12px 0 4px">${esc(t("numH"))}</h4>
    <table class="vv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${CITY_WAVES.map((w) => `<tr${ELITE.includes(w) ? ' class="el"' : ""}><td>${w}${ELITE.includes(w) ? " ×2" : ""}</td><td class="n">${fmt(hostPts(w))}</td><td class="n">${fmt(hostPts(w) / 2)}</td></tr>`).join("")}</table>
    <p class="vv-p" style="margin-top:12px">${esc(t("perH"))}</p>
    <table class="vv-t"><tr>${t("perCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${PER1K.map(([w, k]) => `<tr><td>${w}</td><td class="n">${k}</td></tr>`).join("")}</table>
    <h4 style="margin:12px 0 4px">${esc(t("formH"))}</h4><ul class="vv-ul">${t("forms").map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="muted vv-small">${esc(t("foot"))}</div></details>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("vv_cake"); if (!c) return; const f = document.activeElement && document.activeElement.id; c.innerHTML = cakeHtml(); bind(); if (f && $(f)) $(f).focus(); };
  document.querySelectorAll("#vv_cake [data-w]").forEach((b) => b.onclick = () => { S.wave = +b.dataset.w; redo(); });
  for (const [id, k, num] of [["vv_my", "my", 1], ["vv_oth", "oth", 1], ["vv_myT", "myT", 0], ["vv_othT", "othT", 0]]) {
    const el = $(id); if (!el) continue;
    el.onchange = () => { S[k] = num ? Math.max(0, +el.value || 0) : el.value; redo(); };
  }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("vv_title")) { $("vv_title").textContent = t("title"); $("vv_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.vv = { init, applyTexts, setLang };
})();
