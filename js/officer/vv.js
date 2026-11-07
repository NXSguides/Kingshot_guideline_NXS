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
  en: { title: "🪓 Viking report", intro: "Our research on how Viking Vengeance splits kills and points. Not official rules — it changes as we test more.",
    badge: "🔬 Research report · from our battle reports (11/03, 11/06) · updated {d}",
    heroH: "Every wave has a fixed number of Vikings.", heroP: "If the city holds, they all die. So the question isn't how hard you hit — it's how much of the city's infantry is yours.",
    whoH: "⚔️ Who does the fighting",
    inf: "Infantry", infS: "Fights first and usually finishes the whole wave.",
    cav: "Cavalry", cavS: "💤 Only gets kills when Ambusher triggers — then all, part or none of the Viking cavalry. No Ambusher → 0.",
    arc: "Archers", arcS: "☕ Reinforcing archers: always 0. The owner's own archers sometimes get a little.",
    heroNote: "🦸 Hero skill kills (Marlin's stone, Petra's cut…) aren't kept by the hero's owner — they go into the total and are shared by troops × tier like everything else. Tip: in the battle report's skill page, the Ambusher line only shows up when it triggered.",
    cakeH: "🍰 How the points are split", cakeP: "Each city gives out two fixed piles of points per wave. Kills only decide how the reinforcers' pile is cut.",
    wave: "Wave", elite: "Elite wave ×2",
    host: "🏠 City owner", hostS: "Fixed when the wave is cleared — same score whether their own troops kill or not.",
    pool: "🤝 Reinforcers share", poolS: "Half of the owner's points, cut by each reinforcer's infantry × tier.",
    waste: "Kills by the owner's own troops → that part of the pile goes to nobody.", empty: "No reinforcer in a city → nobody gets that pile.", short: "Not enough infantry → the wave can end with Vikings still alive. It still says Victory, but the points shrink to the share killed (kill 65% → 65% of the points).",
    calcH: "🧮 Try it: your slice", my: "My infantry", myT: "my tier", oth: "Other reinforcers' infantry", othT: "their tier",
    you: "You", others: "Others", res: "≈ {p} points this wave ({s} of the pile)",
    calcNote: "Estimate: assumes infantry clears the wave and the owner's troops kill nothing (the usual case).",
    tierH: "📏 Higher tier = a bigger slice", tierP: "Kills are split by one troop's strength:",
    tierEx: "1 TG3 infantry ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "IX series (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ So send them like this",
    dos: ["Reinforce with your highest-tier infantry. Cavalry and archers in a reinforcement get almost nothing.",
      "City owners: keep only archers at home. Send infantry and cavalry out.",
      "Every city needs at least one reinforcer.",
      "Spread the same infantry over several cities instead of stacking one (except a city that might fall).",
      "Can't send everything? Send infantry first and leave cavalry at home — infantry left at home eats points every wave.",
      "A city short on infantry (it might not clear the wave): send infantry there first so it clears and gets full points. In such a city the owner's Attack / Lethality buffs do help."],
    noH: "🤷 Doesn't change your points",
    nos: ["Attack / Lethality / Defense buffs and pet debuffs, in a city that clears the wave: tested on 11/06 — turned on from wave 16, everyone's share stayed exactly the same.",
      "Which hero you send, how many heroes, or being the garrison captain: your share doesn't change (11/06 waves 13 and 20).",
      "Gambling on cavalry: on 11/06, for the same power, cavalry earned only about ¼ of what infantry did."],
    hqH: "🏯 Headquarters", hqP: "Waves 10 and 20 only attack the Headquarters, not the cities. Same idea: kills are split by infantry × tier. Points = kills × a fixed rate (wave 20: 0.5253 per kill). 11/06 wave 20: each X TG3 infantry killed about 0.83; Ambusher triggered, so each TG3 cavalry about 0.96.",
    unkH: "🟡 Not known yet",
    unks: ["How points are split when a city falls.", "Why a lone account holding its own city gets only ⅔ of the owner points.", "How much infantry a city needs to be sure to clear the wave.", "Which skill hero is best for the garrison.", "What decides how much cavalry gets after Ambusher triggers.", "When the owner's own archers get kills."],
    numH: "🔢 Numbers for those who want them", numCols: ["Wave", "City owner", "Reinforcers' pile"],
    perH: "Kills per 1,000 X TG3 infantry (11/06, average of the cities — one wave can differ 2× between cities; the less infantry in a city, the more each gets):", perCols: ["Wave", "Kills"],
    formH: "🧩 The three layers (for those who want the details)",
    forms: ["1 · Very exact: inside one troop type, your kills = that type's total × your (troops × one troop's strength) ÷ the city's. 11/06: ~60 reports, every person within 3 kills.",
      "2 · Depends on the battle: infantry + cavalry + archer kills = share killed × number of Vikings. Enough infantry → wave cleared, cavalry only via Ambusher, archers 0. Little infantry → cavalry take part; very little → maybe not cleared. Needs a round-by-round simulation to predict.",
      "3 · Points: owner = base points × share killed; reinforcers share half of the base, split by layer 1."],
    foot: "Source: Sparrow's screenshots and battle-report sums (11/03 difficulty 11, 11/06 ~60 reports). The formulas are worked back from report numbers, not from the game. Re-check after a game update." },
  zh: { title: "🪓 維京研究", intro: "我們自己研究的維京人的掠奪：擊殺和分數怎麼分。不是官方規則，會隨著測試持續更新。",
    badge: "🔬 研究報告 · 來自我們的戰報（11/03、11/06）· 更新 {d}",
    heroH: "每一波的維京人數是固定的。", heroP: "守住了就全部死光。所以重點不是打得多猛，而是城裡的步兵有多少是你的。",
    whoH: "⚔️ 誰在打",
    inf: "步兵", infS: "第一個出手，通常整波就打完了。",
    cav: "騎兵", cavS: "💤 只有「奇襲」觸發時才有擊殺——觸發後可能拿到維京騎兵的全部、一部分或 0。沒觸發 → 0。",
    arc: "弓兵", arcS: "☕ 增援的弓兵一律 0。城主自己留家的弓兵偶爾分到一點。",
    heroNote: "🦸 英雄技能的擊殺（馬林的石頭、小佩拉的切牌…）不會只給帶那位英雄的人，而是併進總數，一樣照「兵數 × 兵等」分給大家。小知識：戰報技能頁裡，「奇襲」那一行只在觸發時才會出現。",
    cakeH: "🍰 分數怎麼分", cakeP: "每座城每一波發兩份固定的分數。擊殺只決定「增援者那一份」怎麼切。",
    wave: "第幾波", elite: "菁英波 ×2",
    host: "🏠 城主", hostS: "全滅時固定。不管自己的兵有沒有擊殺，分數都一樣。",
    pool: "🤝 增援者一起分", poolS: "城主分數的一半，照每個人的「步兵數 × 兵等」切。",
    waste: "城主自己的兵殺到的那部分 → 沒人拿，浪費掉。", empty: "沒人增援的城 → 那一份整個沒人拿。", short: "步兵不夠 → 可能打完還有維京活著。畫面一樣寫「勝利」，但分數照殺掉的比例扣（殺 65% → 只拿 65%）。",
    calcH: "🧮 算算看：你那一塊", my: "我的步兵", myT: "我的兵等", oth: "其他增援者的步兵", othT: "他們的兵等",
    you: "你", others: "其他人", res: "這一波約 {p} 分（那一份的 {s}）",
    calcNote: "估算：假設步兵清得完、城主自己的兵 0 擊殺（大多數情況）。",
    tierH: "📏 兵等越高，切得越大", tierP: "擊殺照單兵實力的比例分：",
    tierEx: "1 隻 TG3 步兵 ≈ 1.17 隻 TG1 ≈ 1.66 隻 T9", tierIX: "IX 系列（Supreme）：T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ 所以這樣派",
    dos: ["增援帶兵等最高的步兵。騎兵、弓兵在增援裡幾乎拿不到分。",
      "城主家裡只留弓兵，步兵、騎兵都派出去。",
      "每座城都要有人增援。",
      "同樣的步兵，分散到多座城比全部塞一座好（快守不住的城例外）。",
      "派不完時先派步兵，騎兵留家——步兵留在家裡每一波都會吃掉分數。",
      "步兵不夠、可能殺不完的城：優先補步兵進去讓它全滅（城主才拿滿分）。這種城城主開攻擊／殺傷增益有用。"],
    noH: "🤷 不會改變你的分數",
    nos: ["攻擊／殺傷／防禦增益、寵物減益（會全滅的城）：11/06 實測——從第 16 波開始開，每個人的份額跟沒開時完全一樣。",
      "帶什麼英雄、帶幾位、是不是駐守隊長：都不影響你分到多少（11/06 第 13、20 波）。",
      "帶騎兵賭奇襲：11/06 這次，同樣的實力，騎兵平均只拿到步兵的約 1/4。"],
    hqH: "🏯 總部", hqP: "第 10、20 波只打總部，不打城。一樣照「步兵數 × 兵等」分擊殺。分數 = 擊殺 × 固定係數（第 20 波每個擊殺 0.5253 分）。11/06 第 20 波：每隻 X TG3 步兵約殺 0.83 隻；那場奇襲有觸發，每隻 TG3 騎兵約 0.96 隻。",
    unkH: "🟡 還不知道的",
    unks: ["城守不住時分數怎麼算。", "小帳自己守城（沒有增援）為什麼基本分只有城主分的 2/3。", "城裡要多少步兵才保證全滅。", "駐防的技能英雄要怎麼選。", "奇襲觸發後騎兵分到多少由什麼決定。", "城主自己的弓兵什麼時候有分。"],
    numH: "🔢 給想看數字的人", numCols: ["波", "城主", "增援者那一份"],
    perH: "每 1,000 隻 X TG3 步兵大概殺多少（11/06 各城平均；同一波不同城可差 2 倍，城裡步兵越少，每隻分越多）：", perCols: ["波", "擊殺"],
    formH: "🧩 三層公式（給想看細節的人）",
    forms: ["1 · 很準：同一兵種裡，你的擊殺 = 該兵種總擊殺 × 你的（兵數 × 單兵實力）÷ 全城的（兵數 × 單兵實力）。11/06 約 60 份戰報，每人誤差 3 隻以內。",
      "2 · 看戰況：步＋騎＋弓總擊殺 = 殺掉的比例 × 維京人數。步兵夠 → 全滅、騎兵靠奇襲、弓兵 0；步兵偏少 → 騎兵分一部分；步兵很少 → 可能殺不完。要逐回合模擬才算得準。",
      "3 · 分數：城主 = 基本分 × 殺掉的比例；增援者分基本分的一半，照第 1 層的擊殺比例分。"],
    foot: "來源：Sparrow 的截圖和戰報加總（11/03 難度 11、11/06 約 60 份戰報）。公式是從戰報數字反推的，不是遊戲官方說明。遊戲改版後要重新確認。" },
  pt: { title: "🪓 Estudo Viking", intro: "Nossa pesquisa sobre como a Vingança Viking divide abates e pontos. Não são regras oficiais — muda conforme testamos mais.",
    badge: "🔬 Relatório de pesquisa · dos nossos relatórios de batalha (11/03, 11/06) · atualizado {d}",
    heroH: "Cada onda tem um número fixo de vikings.", heroP: "Se a cidade aguenta, todos morrem. Então a questão não é o quanto você bate — é quanto da infantaria da cidade é sua.",
    whoH: "⚔️ Quem luta",
    inf: "Infantaria", infS: "Luta primeiro e quase sempre acaba com a onda inteira.",
    cav: "Cavalaria", cavS: "💤 Só ganha abates quando o Emboscador ativa — aí pega toda, parte ou nada da cavalaria viking. Sem Emboscador → 0.",
    arc: "Arquearia", arcS: "☕ Arquearia de reforço: sempre 0. A arquearia do próprio dono às vezes ganha um pouco.",
    heroNote: "🦸 Abates de habilidades de herói (a pedra do Peixe Marlin, o corte da Petra…) não ficam com o dono do herói — entram no total e são divididos por tropas × nível, como todo o resto. Dica: na página de habilidades do relatório de batalha, a linha do Emboscador só aparece quando ela ativou.",
    cakeH: "🍰 Como os pontos são divididos", cakeP: "Cada cidade dá duas pilhas fixas de pontos por onda. Os abates só decidem como a pilha dos reforços é cortada.",
    wave: "Onda", elite: "Onda de elite ×2",
    host: "🏠 Dono da cidade", hostS: "Fixo quando a onda é eliminada — a mesma pontuação, com ou sem abates das próprias tropas.",
    pool: "🤝 Parte dos reforços", poolS: "Metade dos pontos do dono, cortada pela infantaria × nível de cada reforço.",
    waste: "Abates das tropas do próprio dono → essa parte da pilha não vai para ninguém.", empty: "Cidade sem reforço → ninguém ganha essa pilha.", short: "Pouca infantaria → a onda pode acabar com vikings ainda vivos. Ainda aparece Vitória, mas os pontos caem para a parte abatida (abater 65% → 65% dos pontos).",
    calcH: "🧮 Teste: a sua fatia", my: "Minha infantaria", myT: "meu nível", oth: "Infantaria dos outros reforços", othT: "nível deles",
    you: "Você", others: "Outros", res: "≈ {p} pontos nesta onda ({s} da pilha)",
    calcNote: "Estimativa: supõe que a infantaria elimina a onda e que as tropas do dono não abatem nada (o caso normal).",
    tierH: "📏 Nível mais alto = fatia maior", tierP: "Os abates são divididos pela força de uma tropa:",
    tierEx: "1 infantaria TG3 ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "Série IX (Suprema): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ Então envie assim",
    dos: ["Reforce com sua infantaria de nível mais alto. Cavalaria e arquearia num reforço ganham quase nada.",
      "Donos de cidade: deixem só a arquearia em casa. Enviem infantaria e cavalaria.",
      "Toda cidade precisa de pelo menos um reforço.",
      "Espalhe a mesma infantaria por várias cidades em vez de juntar tudo em uma (exceto numa cidade que pode cair).",
      "Não dá para enviar tudo? Envie a infantaria primeiro e deixe a cavalaria em casa — infantaria em casa come pontos em toda onda.",
      "Cidade com pouca infantaria (pode não eliminar a onda): envie infantaria para lá primeiro, para ela eliminar a onda e ganhar todos os pontos. Numa cidade assim, os bônus de Ataque / Letalidade do dono ajudam."],
    noH: "🤷 Não muda seus pontos",
    nos: ["Bônus de Ataque / Letalidade / Defesa e debuffs de pet, numa cidade que elimina a onda: testado em 11/06 — ligados a partir da onda 16, a parte de todos ficou exatamente igual.",
      "Qual herói você envia, quantos heróis, ou ser o capitão da guarnição: sua parte não muda (11/06, ondas 13 e 20).",
      "Apostar na cavalaria: em 11/06, com o mesmo poder, a cavalaria ganhou só cerca de ¼ do que a infantaria ganhou."],
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
  ar: { title: "🪓 دراسة الفايكنغ", intro: "بحثنا عن كيف يوزّع انتقام الفايكنغ القتلى والنقاط. ليست قواعد رسمية — تتغير كلما اختبرنا أكثر.",
    badge: "🔬 تقرير بحث · من تقارير معاركنا (11/03، 11/06) · تحديث {d}",
    heroH: "لكل موجة عدد ثابت من الفايكنغ.", heroP: "إذا صمدت المدينة يموتون كلهم. لذلك السؤال ليس كم تضرب بقوة — بل كم من مشاة المدينة لك.",
    whoH: "⚔️ من يقاتل",
    inf: "المشاة", infS: "يقاتلون أولاً، وغالباً ينهون الموجة كلها.",
    cav: "الفرسان", cavS: "💤 لا يحصلون على قتلى إلا عند تفعيل المتربص — وعندها كل فرسان الفايكنغ أو جزء منهم أو لا شيء. بدون كمين → 0.",
    arc: "الرماة", arcS: "☕ رماة التعزيز: دائماً 0. رماة صاحب المدينة أحياناً يحصلون على القليل.",
    heroNote: "🦸 قتلى مهارات الأبطال (حجر مارلين، ضربة بيترا…) لا تبقى لصاحب البطل — تدخل في المجموع وتُقسم حسب القوات × المستوى مثل كل شيء آخر. نصيحة: في صفحة المهارات في تقرير المعركة، سطر المتربص يظهر فقط عندما يتفعّل.",
    cakeH: "🍰 كيف تُقسم النقاط", cakeP: "كل مدينة تعطي حصتين ثابتتين من النقاط في كل موجة. القتلى تحدد فقط كيف تُقسم حصة المعززين.",
    wave: "الموجة", elite: "موجة النخبة ×2",
    host: "🏠 صاحب المدينة", hostS: "ثابتة عند إنهاء الموجة — نفس النقاط سواء قتلت قواته أم لا.",
    pool: "🤝 حصة المعززين", poolS: "نصف نقاط صاحب المدينة، تُقسم حسب مشاة كل معزز × المستوى.",
    waste: "قتلى قوات صاحب المدينة نفسه → ذلك الجزء من الحصة لا يأخذه أحد.", empty: "مدينة بلا معزز → لا أحد يأخذ تلك الحصة.", short: "مشاة غير كافية → قد تنتهي الموجة والفايكنغ ما زالوا أحياء. يظهر النصر مع ذلك، لكن النقاط تنقص حسب نسبة القتلى (قتل 65% → 65% من النقاط).",
    calcH: "🧮 جرّب: حصتك", my: "مشاتي", myT: "مستواي", oth: "مشاة المعززين الآخرين", othT: "مستواهم",
    you: "أنت", others: "الآخرون", res: "≈ {p} نقطة في هذه الموجة ({s} من الحصة)",
    calcNote: "تقدير: يفترض أن المشاة تنهي الموجة وأن قوات صاحب المدينة لا تقتل شيئاً (الحالة المعتادة).",
    tierH: "📏 مستوى أعلى = حصة أكبر", tierP: "تُقسم القتلى حسب قوة الجندي الواحد:",
    tierEx: "1 مشاة TG3 ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "سلسلة IX (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ لذلك أرسلهم هكذا",
    dos: ["عزّز بمشاتك من أعلى مستوى. الفرسان والرماة في التعزيز لا يحصلون تقريباً على شيء.",
      "أصحاب المدن: أبقوا الرماة فقط في المدينة. أرسلوا المشاة والفرسان.",
      "كل مدينة تحتاج معززاً واحداً على الأقل.",
      "وزّع نفس المشاة على عدة مدن بدل جمعها في مدينة واحدة (إلا مدينة قد تسقط).",
      "لا تستطيع إرسال كل شيء؟ أرسل المشاة أولاً واترك الفرسان في المدينة — المشاة الباقية في المدينة تأكل النقاط في كل موجة.",
      "مدينة فيها مشاة قليلة (قد لا تنهي الموجة): أرسل المشاة إليها أولاً حتى تنهي الموجة وتأخذ كل النقاط. في مدينة كهذه، تعزيزات الهجوم / قوة الفتك لصاحب المدينة تفيد."],
    noH: "🤷 لا يغيّر نقاطك",
    nos: ["تعزيزات الهجوم / قوة الفتك / الدفاع وإضعافات الحيوان الأليف، في مدينة تنهي الموجة: اختبرناها في 11/06 — شغّلناها من الموجة 16، وبقيت حصة الجميع كما هي تماماً.",
      "أي بطل ترسل، أو كم بطلاً، أو أن تكون قائد الحامية: حصتك لا تتغير (11/06، الموجتان 13 و20).",
      "المراهنة على الفرسان: في 11/06، بنفس القوة، حصل الفرسان على حوالي ¼ فقط مما حصل عليه المشاة."],
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
  ko: { title: "🪓 바이킹 연구", intro: "바이킹의 약탈에서 처치와 점수가 어떻게 나뉘는지 우리가 직접 연구한 내용. 공식 규칙 아님 — 테스트할수록 바뀜.",
    badge: "🔬 연구 보고서 · 우리 전투 보고서 기준 (11/03, 11/06) · 업데이트 {d}",
    heroH: "웨이브마다 바이킹 수는 정해져 있음.", heroP: "도시가 버티면 전부 죽음. 그래서 중요한 건 얼마나 세게 때리느냐가 아니라 — 도시 보병 중 내 보병이 얼마나 되느냐.",
    whoH: "⚔️ 누가 싸우나",
    inf: "보병", infS: "제일 먼저 싸우고, 보통 웨이브 전체를 끝냄.",
    cav: "기병", cavS: "💤 기습이 발동할 때만 처치 — 그때 바이킹 기병 전부, 일부 또는 0. 기습 없음 → 0.",
    arc: "궁병", arcS: "☕ 증원 궁병: 항상 0. 도시 주인 본인 궁병은 가끔 조금 받음.",
    heroNote: "🦸 영웅 스킬 처치 (마린의 돌, 리틀 페라의 카드…)는 그 영웅 주인이 갖지 않음 — 전체에 합쳐져서 다른 처치처럼 병력 × 등급으로 나눔. 팁: 전투 보고서 스킬 페이지에서 기습 줄은 발동했을 때만 보임.",
    cakeH: "🍰 점수 나누는 방식", cakeP: "각 도시는 웨이브마다 고정된 점수 두 덩어리를 줌. 처치는 증원자 덩어리를 어떻게 자를지만 정함.",
    wave: "웨이브", elite: "정예 웨이브 ×2",
    host: "🏠 도시 주인", hostS: "웨이브를 다 처치하면 고정 — 본인 병력이 처치했든 안 했든 같은 점수.",
    pool: "🤝 증원자 몫", poolS: "도시 주인 점수의 절반, 각 증원자의 보병 × 등급으로 나눔.",
    waste: "도시 주인 본인 병력의 처치 → 그 부분은 아무도 못 받음.", empty: "증원자가 없는 도시 → 그 덩어리는 아무도 못 받음.", short: "보병 부족 → 바이킹이 살아 있는 채로 웨이브가 끝날 수 있음. 그래도 승리로 나오지만, 점수는 처치한 비율만큼만 받음 (65% 처치 → 점수 65%).",
    calcH: "🧮 계산해 보기: 내 몫", my: "내 보병", myT: "내 등급", oth: "다른 증원자 보병", othT: "그들 등급",
    you: "나", others: "다른 사람", res: "이번 웨이브 ≈ {p}점 (덩어리의 {s})",
    calcNote: "추정: 보병이 웨이브를 다 처치하고 도시 주인 병력은 처치 0이라고 가정 (보통의 경우).",
    tierH: "📏 높은 등급 = 더 큰 몫", tierP: "처치는 병사 한 명의 힘에 따라 나눔:",
    tierEx: "TG3 보병 1 ≈ TG1 1.17 ≈ T9 1.66", tierIX: "IX 시리즈 (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ 그래서 이렇게 보내기",
    dos: ["가장 높은 등급 보병으로 증원. 증원에 넣은 기병과 궁병은 거의 못 받음.",
      "도시 주인: 집에는 궁병만 남기기. 보병과 기병은 내보내기.",
      "모든 도시에 증원자가 최소 한 명 필요.",
      "같은 보병을 한 도시에 몰지 말고 여러 도시에 나누기 (함락될 수 있는 도시는 예외).",
      "전부 못 보내면? 보병 먼저 보내고 기병은 집에 두기 — 집에 남은 보병은 웨이브마다 점수를 깎음.",
      "보병이 부족한 도시 (웨이브를 다 못 잡을 수 있음): 그 도시에 보병을 먼저 보내서 다 처치하고 점수를 전부 받게 하기. 이런 도시에서는 도시 주인의 공격력 / 파괴력 버프가 도움 됨."],
    noH: "🤷 점수에 영향 없음",
    nos: ["웨이브를 다 처치하는 도시에서 공격력 / 파괴력 / 방어력 버프와 펫 디버프: 11/06 테스트 — 16웨이브부터 켰는데 모두의 몫이 완전히 그대로.",
      "어떤 영웅을 보내는지, 영웅 몇 명인지, 주둔 대장인지: 내 몫은 안 바뀜 (11/06 13·20웨이브).",
      "기병에 거는 것: 11/06, 같은 전투력이면 기병은 보병의 약 ¼만 받음."],
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
      <div class="vv-res">${esc(t("res").replace("{p}", fmt(pool * share)).replace("{s}", (share * 100).toFixed(1) + "%"))}</div>
      <div class="muted vv-small">${esc(t("calcNote"))}</div></div>
    <ul class="vv-warn"><li>🗑️ ${esc(t("waste"))}</li><li>🏚️ ${esc(t("empty"))}</li><li>⚠️ ${esc(t("short"))}</li></ul>`;
}
function render() {
  const root = $("vv_root"); if (!root) return;
  const max = P.TG3;
  root.innerHTML = `
  <div class="vv-hero" style="background-image:url(figures/vv/viking.webp)"><div class="vv-hero-in">
    <span class="vv-badge">${esc(t("badge").replace("{d}", UPDATED))}</span>
    <h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div></div>
  <div class="card"><h3>${esc(t("whoH"))}</h3>
    <div class="vv-trs">${troop("inf", t("inf"), t("infS"), "on")}${troop("cav", t("cav"), t("cavS"), "off")}${troop("arc", t("arc"), t("arcS"), "off")}</div>
    <p class="vv-note">${esc(t("heroNote"))}</p></div>
  <div class="card"><h3>${esc(t("cakeH"))}</h3><p class="vv-p">${esc(t("cakeP"))}</p><div id="vv_cake">${cakeHtml()}</div></div>
  <div class="card"><h3>${esc(t("tierH"))}</h3><p class="vv-p">${esc(t("tierP"))}</p>
    <div class="vv-tiers">${Object.entries(P).map(([k, v]) => `<div class="vv-tier"><span>${k}</span><div class="vv-tb"><i style="width:${(v / max * 100).toFixed(1)}%"></i></div><b>${v}</b></div>`).join("")}</div>
    <p class="vv-ex">${esc(t("tierEx"))}</p><div class="muted vv-small">${esc(t("tierIX"))}</div></div>
  <div class="card"><h3>${esc(t("doH"))}</h3><ol class="vv-dos">${t("dos").map((d, i) => `<li><span class="vv-ic">${["<img src=\"figures/vv/inf.webp\" alt=\"\">", "<img src=\"figures/vv/arc.webp\" alt=\"\">", "🏰", "🗺️", "<img src=\"figures/vv/cav.webp\" alt=\"\">", "⚠️"][i]}</span><span>${esc(d)}</span></li>`).join("")}</ol></div>
  <div class="vv-two">
    <div class="card"><h3>${esc(t("noH"))}</h3><ul class="vv-ul">${t("nos").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="vv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  </div>
  <div class="card"><h3>${esc(t("hqH"))}</h3><p class="vv-p">${esc(t("hqP"))}</p></div>
  <details class="card vv-num"><summary>${esc(t("numH"))}</summary>
    <table class="vv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${CITY_WAVES.map((w) => `<tr${ELITE.includes(w) ? ' class="el"' : ""}><td>${w}${ELITE.includes(w) ? " ×2" : ""}</td><td class="n">${fmt(hostPts(w))}</td><td class="n">${fmt(hostPts(w) / 2)}</td></tr>`).join("")}</table>
    <p class="vv-p" style="margin-top:12px">${esc(t("perH"))}</p>
    <table class="vv-t"><tr>${t("perCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${PER1K.map(([w, k]) => `<tr><td>${w}</td><td class="n">${k}</td></tr>`).join("")}</table></details>
  <details class="card vv-num"><summary>${esc(t("formH"))}</summary><ul class="vv-ul">${t("forms").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>
  <div class="muted vv-small">${esc(t("foot"))}</div>`;
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
