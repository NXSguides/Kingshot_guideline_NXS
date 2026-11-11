/* NXS officer page — 🧳 Migrant Score report (registers OFFICER_PAGES.ms; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: our own research, STILL BEING TESTED — what raises the hidden Migrant Score (= Swordland troop power × 317).
   From Sparrow's main and second account, item-by-item before/after tests (11/02–11/04) and the 10/14 Swordland check of 98 players
   (Project docs claude/migrant-score-spec.md, claude/kvk-2026-11-data-plan.md, claude/kingshot-upgrade-efficiency.md). Not official.
   Read-only text + a small calculator, no member data (no account IDs, nobody else's scores). */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-06";
// Relative weight per 1M power, same on every account (11/04 tests; 11/06: Governor Gear 1, exclusive gear / hero levels / buildings 0). Points = weight × power (M) × the account's own rate.
const W = { charm: 1, lgear: 1, pet: 1, tech: 1, gear: 1, fav: 0.5, adv: 0.3, star: 0.35, excl: 0, skill: 0, lvl: 0, bld: 0, troops: 0 };
const ROWS = [["charm", 1, "", "hi"], ["lgear", 1, "", "hi"], ["pet", 1, "", "hi"], ["tech", 1, "", "hi"], ["gear", 1, "", "hi"], ["fav", 0.5, "", "hi"], ["adv", 0.3, "≈ 0.3", "mid"], ["star", 0.35, "0.2–0.5", "mid"], ["excl", 0, "", "hi"], ["skill", 0, "", "hi"], ["lvl", 0, "", "hi"], ["bld", 0, "", "hi"], ["troops", 0, "", "hi"]];
const RATES = [["big", 9110], ["small", 5935]];
const sp = (m) => m / 317;
const T = {
  en: { title: "🧳 Migrant Score", intro: "What raises the hidden Migrant Score, and what to upgrade for it. Our own research, not official.", howH: "🔢 How we worked it out",
    badge: "🔬 Our research · updated {d}",
    heroH: "A hidden score that counts what you've built for good.", heroP: "Governor Charms, Governor Gear, pets, research and Hero Gear count fully. Master affinity counts half, hero stars a little. Troops, buildings and exclusive gear don't count. It is almost exactly your Swordland Showdown troop power × 317.",
    whatH: "🔎 What it is",
    what: ["The game doesn't show it. MightPulse does (the kingdom list only shows the top 100).", "The top 100 of a kingdom added together decide whether the kingdom counts as a Leading Kingdom or an Ordinary Kingdom for Kingdom Transfer (top 10% of each group = leading)."],
    eqA: "Migrant Score", eqB: "Swordland troop power", eqNote: "Checked on 98 players on 10/14 (average error 1.7%) and again on 11/03 — closer than total power + Mystic Trial.",
    tblH: "📊 What raises it", tblP: "How much each kind of upgrade counts, for the same power gained (1 = full):", fH: "Migrant Score = Σ (power × weight) × your account's rate", fP: "Confirmed on 11/04: 11 single-item tests on two accounts (Charms ×4, pet level-up ×2, advancement ×3, refinement ×2) — every prediction within 5 points, even a +2.47M jump. 11/06: research +164,400 power → +1,498 (exact), Hero Gear Mastery Forging +40,800 → +243 (predicted +242), Governor Gear +408,000 → +3,716 (predicted +3,717); exclusive gear and buildings gave 0.",
    items: { charm: "💎 Governor Charms", pet: "🐾 Pets (level-up, advancement, refinement)", tech: "🔬 Research", gear: "🛡️ Hero Gear (enhance, Mastery Forging)", lgear: "👑 Governor Gear (enhance)", fav: "🎓 Master affinity", adv: "🎓 Master advancement", star: "⭐ Hero stars (main heroes)", excl: "🔧 Exclusive gear (Widgets)", skill: "🎓 Master skills · other heroes (stars, skills)", lvl: "📈 Hero levels (main heroes)", bld: "🏗️ Buildings (not the Town Center TG)", troops: "⚔️ Training / losing troops" },
    conf: { hi: "sure", mid: "so-so" },
    tblFoot: "Same power: Charms, Governor Gear, pets, research and Hero Gear = 2× master affinity and 2–5× hero stars. Master advancement: only part of its power counts (the talent / skill part doesn't).",
    rateH: "📈 Your account's rate", rateP: "The same upgrade gives a different number of points on each account. The more developed the account, the more points.",
    rates: { big: "Town Center 40, TG2", small: "Town Center 25" }, rateU: "points per 1M power", rateSw: "≈ +{n} Swordland power",
    rateGuess: "The more built-up the account, the more points the same upgrade gives. Maybe the Town Center sets it — not known yet.",
    tcH: "🏰 Town Center", tcP: "When the Town Center reaches a new Gold level (TG), the score jumps (about +5% on the main account at TG2). Normal Town Center levels add almost nothing; other buildings add nothing.",
    tcGuess: "Our guess: building power itself doesn't count. The Town Center's gold (TG) level gives the jump — maybe by raising the account's rate (+5% fits). To be confirmed at the next TG upgrade.",
    downH: "🔒 Never goes down",
    down: ["Losing troops doesn't lower it.", "Taking off Hero Gear doesn't either (770k gear power removed, same score two hours later) → it only goes up, or it counts what you own, not what you wear.", "Stat % don't count: a research level that gives +2% Attack adds only that level's research power. So the score shows how much you invested, not how strong your stats are."],
    updH: "⏱️ When it updates", upd: "Not instant. It is recalculated about every 15–60 minutes, at a different time for each account. Wait a bit before checking MightPulse.",
    calcH: "🧮 Try it", calcItem: "I upgrade", calcPow: "Power gained", calcRate: "My account", calcRes: "≈ +{m} Migrant Score · ≈ +{s} Swordland power",
    calcOpp: "Someone's Migrant Score", calcOppRes: "≈ {s} Swordland troop power",
    calcNote: "Estimate from our tests so far. It shows investment, not stats.",
    doH: "✅ Do this",
    dos: ["To climb in Swordland Showdown, upgrade these first: Governor Charms, Governor Gear, pets, research, Hero Gear. They count the same — pick the cheapest.", "Next master affinity, and last the stars of your main heroes. Training troops and exclusive gear (Widgets) add nothing.", "Save for the Town Center's next gold (TG) level — that's the big jump.", "Sizing up an opponent: their Migrant Score ÷ 317 ≈ their Swordland troop power. It only shows investment, not stats."],
    unkH: "🟡 Not known yet",
    unks: ["What sets each account's rate (the Town Center?).", "Why hero stars give different results."],
    foot: "Source: Sparrow's two accounts, item-by-item before/after tests (11/02–11/06), and the 10/14 Swordland check of 98 players. Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "🧳 遷城分數", intro: "隱藏的「遷城分數」什麼會讓它變高、該升什麼。我們自己的研究，不是官方說明。", howH: "🔢 怎麼算的",
    badge: "🔬 我們的研究 · 更新 {d}",
    heroH: "一個隱藏分數，只算你長期投資的東西。", heroP: "領主寶石、領主裝備、寵物、科技實力、英雄裝備全算；大師好感度算一半；英雄升星只算一點；兵、建築、英雄專屬裝備不算。它幾乎剛好等於聖劍爭奪的部隊戰力 × 317。",
    whatH: "🔎 它是什麼",
    what: ["遊戲裡看不到，MightPulse 看得到（王國排行只列前 100 名）。", "王國前 100 名加起來，決定王國移民時這個王國算「強盛王國」還是「普通王國」（每組前 10% = 強盛王國）。"],
    eqA: "遷城分數", eqB: "聖劍部隊戰力", eqNote: "10/14 用 98 人驗證（平均誤差 1.7%），11/03 再確認一次——比「總戰力＋秘境試煉」還準。",
    tblH: "📊 什麼會加分", tblP: "加同樣的實力，各種升級算多少（1 = 全算）：", fH: "遷城分數 = Σ（實力 × 權重）× 帳號倍率", fP: "11/04 確認：兩個帳號 11 次單項測試（寶石 ×4、寵物升級 ×2、突破 ×3、洗練 ×2），每次預測誤差都在 5 分以內，連一次 +247 萬也一樣準。11/06：科技實力 +164,400 實力 → +1,498（一分不差）、英雄裝備專精鍛造 +40,800 → +243（預測 +242）、領主裝備 +408,000 → +3,716（預測 +3,717）；英雄專屬裝備和建築都是 0。",
    items: { charm: "💎 領主寶石", pet: "🐾 寵物（升級、突破、洗練）", tech: "🔬 科技實力", gear: "🛡️ 英雄裝備（強化、專精鍛造）", lgear: "👑 領主裝備（強化）", fav: "🎓 大師好感度", adv: "🎓 大師進階", star: "⭐ 英雄升星（主力）", excl: "🔧 英雄專屬裝備（零件）", skill: "🎓 大師技能・非主力英雄（升星、技能）", lvl: "📈 主力英雄升等級", bld: "🏗️ 建築（不含城鎮中心 TG）", troops: "⚔️ 收兵、損兵" },
    conf: { hi: "可信", mid: "還不確定" },
    tblFoot: "同樣的實力：寶石、領主裝備、寵物、科技實力、英雄裝備 = 大師好感度的 2 倍、升星的 2–5 倍。大師進階：只有一部分實力算（天賦、技能那部分不算）。",
    rateH: "📈 每個帳號的倍率", rateP: "同樣的升級，每個帳號換到的分數不一樣。帳號越發展，換到越多。",
    rates: { big: "城鎮中心 40、TG2", small: "城鎮中心 25" }, rateU: "分／1M 實力", rateSw: "≈ 聖劍 +{n}",
    rateGuess: "帳號越發展，同樣的升級換越多分。可能跟城鎮中心有關——還不知道。",
    tcH: "🏰 城鎮中心", tcP: "城鎮中心升到新的黃金等級（TG）時，分數會大跳（主帳升 TG2 時約 +5%）。一般等級幾乎不加分；其他建築不加分。",
    tcGuess: "推測：建築實力本身不算，城鎮中心的黃金等級（TG）才會大跳——可能是讓帳號倍率變大（+5% 對得上）。等下一次 TG 升級再確認。",
    downH: "🔒 不會扣分",
    down: ["損兵不扣。", "卸下英雄裝備也不扣（卸了 77 萬裝備實力，兩小時後一樣）→ 分數只升不降，或算的是「擁有的」不是「穿著的」。", "不含屬性 %：研究攻擊力 +2% 只照那一級的科技實力加分。所以遷城分數看得出投資量，看不出屬性強弱。"],
    updH: "⏱️ 多久更新", upd: "不是即時。大約每 15–60 分鐘重算一次，每個帳號時間不一樣。升完等一下再去看 MightPulse。",
    calcH: "🧮 算算看", calcItem: "我升級", calcPow: "加了多少實力", calcRate: "我的帳號", calcRes: "≈ 遷城分數 +{m} · ≈ 聖劍部隊戰力 +{s}",
    calcOpp: "某人的遷城分數", calcOppRes: "≈ 聖劍部隊戰力 {s}",
    calcNote: "用目前測試結果估的。只代表投資量，不代表屬性。",
    doH: "✅ 照這樣做",
    dos: ["想拉高聖劍爭奪排名，先升：領主寶石、領主裝備、寵物、科技、英雄裝備。五個算一樣，挑最便宜的升。", "其次大師好感度，最後才是主力英雄升星。收兵、英雄專屬裝備（零件）不加分。", "存資源衝城鎮中心下一個黃金等級（TG）——那是大跳。", "看對手：他的遷城分數 ÷ 317 ≈ 他的聖劍部隊戰力。但這只代表投資量，不代表屬性。"],
    unkH: "🟡 還不知道的",
    unks: ["每個帳號的倍率由什麼決定（城鎮中心？）。", "英雄升星為什麼結果不一致。"],
    foot: "來源：Sparrow 兩個帳號逐項前後測試（11/02–11/06）、10/14 聖劍 98 人對照。不是遊戲官方說明，數字會隨更多測試修正。" },
  pt: { title: "🧳 Pontuação de Migração", intro: "O que aumenta a Pontuação de Migrante oculta, e o que melhorar para ela. Pesquisa nossa, não é oficial.", howH: "🔢 Como calculamos",
    badge: "🔬 Nossa pesquisa · atualizado {d}",
    heroH: "Uma pontuação oculta que conta o que você construiu para sempre.", heroP: "Talismãs do Governador, Equipamento do Chefe, mascotes, pesquisa e Equipamento do Herói contam inteiros. A Afinidade de Mestre conta metade; estrelas de herói, um pouco. Tropas, construções e equipamento exclusivo não contam. É quase exatamente o seu poder das tropas no Confronto entre Espadas × 317.",
    whatH: "🔎 O que é",
    what: ["O jogo não mostra. O MightPulse mostra (a lista do reino só mostra o top 100).", "O top 100 de um reino, somado, decide se o reino conta como Reino Líder ou Reino Comum na Transferência de Reino (top 10% de cada grupo = líder)."],
    eqA: "Pontuação de Migração", eqB: "Poder das tropas na Terra das Espadas", eqNote: "Conferido em 98 jogadores em 10/14 (erro médio 1.7%) e de novo em 11/03 — mais perto que poder total + Prova Mística.",
    tblH: "📊 O que aumenta", tblP: "Quanto cada tipo de melhoria conta, para o mesmo poder ganho (1 = inteiro):", fH: "Pontuação de Migração = Σ (poder × peso) × taxa da sua conta", fP: "Confirmado em 11/04: 11 testes de um item só em duas contas (Talismãs ×4, nível de mascote ×2, avanço ×3, refinamento ×2) — toda previsão dentro de 5 pontos, até um salto de +2.47M. 11/06: pesquisa +164,400 de poder → +1,498 (exato), M. em Forja do Equipamento do Herói +40,800 → +243 (previsto +242), Equipamento do Chefe +408,000 → +3,716 (previsto +3,717); equipamento exclusivo e construções deram 0.",
    items: { charm: "💎 Talismãs do Governador", pet: "🐾 Mascotes (nível, avanço, refinamento)", tech: "🔬 Pesquisa", gear: "🛡️ Equipamento do Herói (aprimoramento, M. em Forja)", lgear: "👑 Equipamento do Chefe (aprimoramento)", fav: "🎓 Afinidade de Mestre", adv: "🎓 Avanço de Mestre", star: "⭐ Estrelas de herói (heróis principais)", excl: "🔧 Equipamento exclusivo (Ferramentas)", skill: "🎓 Habilidades de Mestre · outros heróis (estrelas, habilidades)", lvl: "📈 Nível de herói (heróis principais)", bld: "🏗️ Construções (não o TG do Centro da Cidade)", troops: "⚔️ Treinar / perder tropas" },
    conf: { hi: "certo", mid: "mais ou menos" },
    tblFoot: "Mesmo poder: Talismãs, Equipamento do Chefe, mascotes, pesquisa e Equipamento do Herói = 2× a Afinidade de Mestre e 2–5× as estrelas de herói. Avanço de Mestre: só parte do poder conta (a parte de talento / habilidade não).",
    rateH: "📈 A taxa da sua conta", rateP: "A mesma melhoria dá pontos diferentes em cada conta. Quanto mais desenvolvida a conta, mais pontos.",
    rates: { big: "Centro da Cidade 40, TG2", small: "Centro da Cidade 25" }, rateU: "pontos por 1M de poder", rateSw: "≈ +{n} de poder na Terra das Espadas",
    rateGuess: "Quanto mais desenvolvida a conta, mais pontos a mesma melhoria dá. Talvez o Centro da Cidade defina isso — ainda não sabemos.",
    tcH: "🏰 Centro da Cidade", tcP: "Quando o Centro da Cidade chega a um novo nível de Ouro (TG), a pontuação dá um salto (cerca de +5% na conta principal no TG2). Níveis normais quase não somam; outras construções não somam nada.",
    tcGuess: "Nosso palpite: o poder de construção em si não conta. O nível de Adamante (TG) do Centro da Cidade dá o salto — talvez aumentando a taxa da conta (+5% bate). A confirmar no próximo nível TG.",
    downH: "🔒 Nunca diminui",
    down: ["Perder tropas não diminui.", "Tirar o Equipamento do Herói também não (770k de poder de equipamento removidos, mesma pontuação duas horas depois) → só sobe, ou conta o que você tem, não o que está usando.", "% de atributos não contam: um nível de pesquisa que dá +2% de Ataque soma só o poder de pesquisa daquele nível. Então a pontuação mostra quanto você investiu, não quão fortes são seus atributos."],
    updH: "⏱️ Quando atualiza", upd: "Não é na hora. É recalculada mais ou menos a cada 15–60 minutos, em horários diferentes para cada conta. Espere um pouco antes de olhar o MightPulse.",
    calcH: "🧮 Teste", calcItem: "Eu melhoro", calcPow: "Poder ganho", calcRate: "Minha conta", calcRes: "≈ +{m} de Pontuação de Migração · ≈ +{s} de poder na Terra das Espadas",
    calcOpp: "Pontuação de Migração de alguém", calcOppRes: "≈ {s} de poder das tropas na Terra das Espadas",
    calcNote: "Estimativa pelos nossos testes até agora. Mostra investimento, não atributos.",
    doH: "✅ Faça assim",
    dos: ["Para subir no Confronto entre Espadas, melhore primeiro: Talismãs do Governador, Equipamento do Chefe, mascotes, pesquisa, Equipamento do Herói. Contam igual — escolha o mais barato.", "Depois Afinidade de Mestre, e por último as estrelas dos seus heróis principais. Treinar tropas e equipamento exclusivo (Ferramentas) não somam nada.", "Guarde recursos para o próximo nível de Adamante (TG) do Centro da Cidade — esse é o grande salto.", "Para avaliar um oponente: a Pontuação de Migração dele ÷ 317 ≈ o poder das tropas dele na Terra das Espadas. Só mostra investimento, não atributos."],
    unkH: "🟡 Ainda não sabemos",
    unks: ["O que define a taxa de cada conta (o Centro da Cidade?).", "Por que as estrelas de herói dão resultados diferentes."],
    foot: "Fonte: as duas contas da Sparrow, testes de antes/depois item por item (11/02–11/06), e a conferência de 98 jogadores na Terra das Espadas em 10/14. Não vem do jogo. Os números serão corrigidos conforme testarmos mais." },
  ar: { title: "🧳 نقاط الهجرة", intro: "ما الذي يرفع نقاط المهاجر المخفية، وماذا تطوّر لأجلها. بحثنا الخاص، ليس رسميًا.", howH: "🔢 كيف حسبناها",
    badge: "🔬 بحثنا · آخر تحديث {d}",
    heroH: "نقاط مخفية تحسب ما بنيته بشكل دائم.", heroP: "تميمة الحاكم وعتاد الحاكم والحيوانات الأليفة والبحث وعتاد البطل تُحسب كاملة. تقارب المتخصص يُحسب نصفه، ونجوم الأبطال قليلًا. القوات والمباني والعتاد الحصري لا تُحسب. إنها تقريبًا بالضبط قوة قواتك في مواجهة أرض السيوف × 317.",
    whatH: "🔎 ما هي",
    what: ["اللعبة لا تُظهرها. MightPulse يُظهرها (قائمة المملكة تُظهر أفضل 100 فقط).", "مجموع أفضل 100 في المملكة يحدد هل تُحسب المملكة من الممالك الرائدة أم من الممالك العادية في نقل المملكة (أعلى 10% من كل مجموعة = رائدة)."],
    eqA: "نقاط الهجرة", eqB: "قوة القوات في أرض السيوف", eqNote: "تم التحقق على 98 لاعبًا في 10/14 (متوسط الخطأ 1.7%) ومرة أخرى في 11/03 — أدق من القوة الكلية + الاختبارات الغامضة.",
    tblH: "📊 ما الذي يرفعها", tblP: "كم يُحسب كل نوع من الترقيات، لنفس القوة المكتسبة (1 = كاملة):", fH: "نقاط الهجرة = Σ (القوة × الوزن) × معدل حسابك", fP: "تأكد في 11/04: 11 اختبارًا لعنصر واحد على حسابين (التميمة ×4، رفع مستوى الحيوان الأليف ×2، تقدم ×3، تحسين ×2) — كل توقع ضمن 5 نقاط، حتى قفزة +2.47M. 11/06: البحث +164,400 قوة → +1,498 (بالضبط)، صقل التخصص لعتاد البطل +40,800 → +243 (المتوقع +242)، عتاد الحاكم +408,000 → +3,716 (المتوقع +3,717)؛ العتاد الحصري والمباني أعطت 0.",
    items: { charm: "💎 تميمة الحاكم", pet: "🐾 الحيوانات الأليفة (رفع المستوى، تقدم، تحسين)", tech: "🔬 البحث", gear: "🛡️ عتاد البطل (تحسين، صقل التخصص)", lgear: "👑 عتاد الحاكم (تحسين)", fav: "🎓 تقارب المتخصص", adv: "🎓 ترقية المتخصص", star: "⭐ نجوم الأبطال (الأبطال الرئيسيون)", excl: "🔧 العتاد الحصري (الأجزاء)", skill: "🎓 مهارات المتخصص · أبطال آخرون (نجوم، مهارات)", lvl: "📈 مستويات الأبطال (الأبطال الرئيسيون)", bld: "🏗️ المباني (ليس TG مركز البلدة)", troops: "⚔️ تدريب / خسارة القوات" },
    conf: { hi: "مؤكد", mid: "متوسط" },
    tblFoot: "لنفس القوة: التميمة وعتاد الحاكم والحيوانات الأليفة والبحث وعتاد البطل = 2× تقارب المتخصص و2–5× نجوم الأبطال. ترقية المتخصص: جزء فقط من قوتها يُحسب (جزء الموهبة / المهارة لا يُحسب).",
    rateH: "📈 معدل حسابك", rateP: "الترقية نفسها تعطي نقاطًا مختلفة في كل حساب. كلما كان الحساب أكثر تطورًا، زادت النقاط.",
    rates: { big: "مركز البلدة 40، TG2", small: "مركز البلدة 25" }, rateU: "نقطة لكل 1M قوة", rateSw: "≈ +{n} قوة في أرض السيوف",
    rateGuess: "كلما كان الحساب أكثر تطورًا، أعطت نفس الترقية نقاطًا أكثر. ربما مركز البلدة هو الذي يحدده — غير معروف بعد.",
    tcH: "🏰 مركز البلدة", tcP: "عندما يصل مركز المدينة إلى مستوى ذهبي جديد (TG)، تقفز النقاط (نحو +5% في الحساب الرئيسي عند TG2). المستويات العادية لا تضيف شيئًا تقريبًا؛ والمباني الأخرى لا تضيف شيئًا.",
    tcGuess: "تخميننا: قوة المباني نفسها لا تُحسب. مستوى الذهب الخالص (TG) لمركز البلدة هو الذي يعطي القفزة — ربما برفع معدل الحساب (+5% يتطابق). سنتأكد عند ترقية TG القادمة.",
    downH: "🔒 لا تنخفض أبدًا",
    down: ["خسارة القوات لا تخفضها.", "نزع عتاد البطل أيضًا لا يخفضها (أُزيلت 770k من قوة العتاد، ونفس النقاط بعد ساعتين) → إنها ترتفع فقط، أو تحسب ما تملكه، لا ما ترتديه.", "نسب الخصائص % لا تُحسب: مستوى بحث يعطي +2% هجوم يضيف فقط قوة البحث لذلك المستوى. لذلك النقاط تُظهر كم استثمرت، لا مدى قوة خصائصك."],
    updH: "⏱️ متى تتحدث", upd: "ليست فورية. يُعاد حسابها تقريبًا كل 15–60 دقيقة، في وقت مختلف لكل حساب. انتظر قليلًا قبل أن تتحقق من MightPulse.",
    calcH: "🧮 جرّب", calcItem: "أرقّي", calcPow: "القوة المكتسبة", calcRate: "حسابي", calcRes: "≈ +{m} نقاط هجرة · ≈ +{s} قوة في أرض السيوف",
    calcOpp: "نقاط هجرة لاعب ما", calcOppRes: "≈ {s} قوة القوات في أرض السيوف",
    calcNote: "تقدير من اختباراتنا حتى الآن. تُظهر الاستثمار، لا الخصائص.",
    doH: "✅ افعل هكذا",
    dos: ["للصعود في مواجهة أرض السيوف، طوّر أولًا: تميمة الحاكم، عتاد الحاكم، الحيوانات الأليفة، البحث، عتاد البطل. تُحسب بالتساوي — اختر الأرخص.", "ثم تقارب المتخصص، وأخيرًا نجوم أبطالك الرئيسيين. تدريب القوات والعتاد الحصري (الأجزاء) لا يضيفان شيئًا.", "ادّخر لمستوى الذهب الخالص (TG) التالي لمركز البلدة — هذه هي القفزة الكبيرة.", "لتقدير خصم: نقاط هجرته ÷ 317 ≈ قوة قواته في أرض السيوف. تُظهر الاستثمار فقط، لا الخصائص."],
    unkH: "🟡 غير معروف بعد",
    unks: ["ما الذي يحدد معدل كل حساب (مركز البلدة؟).", "لماذا تعطي نجوم الأبطال نتائج مختلفة."],
    foot: "المصدر: حسابا Sparrow، اختبارات قبل/بعد عنصرًا بعنصر (11/02–11/06)، وفحص 98 لاعبًا في أرض السيوف في 10/14. ليست من اللعبة. ستُصحَّح الأرقام كلما اختبرنا أكثر." },
  ko: { title: "🧳 이주 점수", intro: "숨겨진 이주 점수를 올리는 것과 그걸 위해 뭘 올릴지. 우리 연구이고 공식은 아니야.", howH: "🔢 어떻게 계산했는지",
    badge: "🔬 우리 연구 · 업데이트 {d}",
    heroH: "오래 남는 투자만 세는 숨겨진 점수.", heroP: "영주 보석, 영주 장비, 펫, 연구, 영웅 장비는 전부 계산돼. 거장 호감도는 절반, 영웅 성급은 조금. 병력, 건물, 전용 장비는 안 들어가. 성검 쟁탈 부대 전투력 × 317과 거의 똑같아.",
    whatH: "🔎 이게 뭐야",
    what: ["게임에서는 안 보여. MightPulse에서는 보여 (왕국 목록은 상위 100명만).", "왕국 상위 100명의 합으로 왕국 이민 때 그 왕국이 강성 왕국인지 일반 왕국인지 정해져 (그룹마다 상위 10% = 강성)."],
    eqA: "이주 점수", eqB: "성검 부대 전투력", eqNote: "10/14에 98명으로 확인 (평균 오차 1.7%), 11/03에 다시 확인 — 총 전투력 + 신비한 시련보다 더 정확해.",
    tblH: "📊 무엇이 올려 주나", tblP: "같은 전투력을 올렸을 때 업그레이드 종류별 반영 비율 (1 = 전부):", fH: "이주 점수 = Σ (전투력 × 가중치) × 계정 배율", fP: "11/04 확인: 두 계정에서 단일 항목 테스트 11회 (보석 ×4, 펫 레벨업 ×2, 돌파 ×3, 단련 ×2) — 모든 예측이 5점 이내, +2.47M 점프도 마찬가지. 11/06: 연구 +164,400 전투력 → +1,498 (정확), 영웅 장비 마스터리 제작 +40,800 → +243 (예측 +242), 영주 장비 +408,000 → +3,716 (예측 +3,717); 전용 장비와 건물은 0.",
    items: { charm: "💎 영주 보석", pet: "🐾 펫 (레벨업, 돌파, 단련)", tech: "🔬 연구", gear: "🛡️ 영웅 장비 (강화, 마스터리 제작)", lgear: "👑 영주 장비 (강화)", fav: "🎓 거장 호감도", adv: "🎓 거장 진급", star: "⭐ 영웅 성급 (주력 영웅)", excl: "🔧 전용 장비 (부속품)", skill: "🎓 거장 스킬 · 다른 영웅 (성급, 스킬)", lvl: "📈 영웅 레벨 (주력 영웅)", bld: "🏗️ 건물 (도시 센터 TG 제외)", troops: "⚔️ 병력 훈련 / 손실" },
    conf: { hi: "확실", mid: "보통" },
    tblFoot: "같은 전투력이면: 보석, 영주 장비, 펫, 연구, 영웅 장비 = 거장 호감도의 2배, 영웅 성급의 2–5배. 거장 진급: 전투력 일부만 계산돼 (재능 / 스킬 부분은 아님).",
    rateH: "📈 계정 배율", rateP: "같은 업그레이드라도 계정마다 받는 점수가 달라. 계정이 발전할수록 더 많이 받아.",
    rates: { big: "도시 센터 40, TG2", small: "도시 센터 25" }, rateU: "1M 전투력당 점수", rateSw: "≈ 성검 전투력 +{n}",
    rateGuess: "계정이 더 성장할수록 같은 업그레이드로 더 많은 점수를 받아. 도시 센터가 정하는 걸 수도 — 아직 몰라.",
    tcH: "🏰 도시 센터", tcP: "도시 센터가 새 황금 레벨 (TG)에 오르면 점수가 크게 뛰어 (본계정 TG2 때 약 +5%). 일반 레벨은 거의 안 오르고, 다른 건물은 안 올라.",
    tcGuess: "추측: 건물 전투력 자체는 안 들어가. 도시 센터의 순금 (TG) 레벨이 점프를 만들어 — 아마 계정 배율을 올려서 (+5%가 맞아). 다음 TG 업그레이드 때 확인 예정.",
    downH: "🔒 절대 안 내려가",
    down: ["병력을 잃어도 안 내려가.", "영웅 장비를 벗겨도 안 내려가 (장비 전투력 770k를 뺐는데 2시간 뒤에도 같은 점수) → 오르기만 하거나, 장착한 게 아니라 가진 걸 세는 것.", "스탯 %는 안 들어가: 공격력 +2%를 주는 연구 레벨은 그 레벨의 연구 전투력만 더해. 그래서 점수는 얼마나 투자했는지를 보여주지, 스탯이 얼마나 센지는 안 보여줘."],
    updH: "⏱️ 언제 갱신되나", upd: "즉시 아님. 약 15–60분마다 다시 계산되고, 계정마다 시간이 달라. MightPulse 보기 전에 조금 기다려.",
    calcH: "🧮 계산해 보기", calcItem: "업그레이드할 것", calcPow: "오른 전투력", calcRate: "내 계정", calcRes: "≈ 이주 점수 +{m} · ≈ 성검 전투력 +{s}",
    calcOpp: "누군가의 이주 점수", calcOppRes: "≈ 성검 부대 전투력 {s}",
    calcNote: "지금까지 테스트로 낸 추정치. 투자량을 보여줄 뿐, 스탯은 아님.",
    doH: "✅ 이렇게 해",
    dos: ["성검 쟁탈에서 올라가려면 먼저: 영주 보석, 영주 장비, 펫, 연구, 영웅 장비. 똑같이 계산되니까 제일 싼 걸 골라.", "그다음 거장 호감도, 마지막이 주력 영웅 성급. 병력 훈련과 전용 장비 (부속품)는 점수가 안 올라.", "도시 센터 다음 순금 (TG) 레벨을 위해 모아 둬 — 그게 큰 점프야.", "상대 평가: 상대 이주 점수 ÷ 317 ≈ 상대 성검 부대 전투력. 투자량만 보여주고, 스탯은 아님."],
    unkH: "🟡 아직 모르는 것",
    unks: ["계정 배율을 정하는 게 뭔지 (도시 센터?).", "영웅 성급 결과가 왜 들쭉날쭉한지."],
    foot: "출처: Sparrow의 두 계정, 항목별 전후 테스트 (11/02–11/06), 10/14 성검 98명 확인. 게임 공식 아님. 테스트가 늘면 숫자도 고칠 거야." },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { item: "charm", pow: 1000000, rate: "big", opp: 40000000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-ms") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-ms", JSON.stringify(S)); } catch (e) {} };

function calcHtml() {
  if (!(S.item in W)) S.item = "charm";
  const rate = (RATES.find((r) => r[0] === S.rate) || RATES[0])[1];
  const m = S.pow / 1e6 * (W[S.item] || 0) * rate;
  return `<div class="ms-in"><label>${esc(t("calcItem"))}<select class="inp" id="ms_item">${Object.keys(W).map((k) => `<option value="${k}"${k === S.item ? " selected" : ""}>${esc(t("items")[k])}</option>`).join("")}</select></label>
      <label>${esc(t("calcPow"))}<input class="inp" id="ms_pow" type="number" min="0" step="100000" value="${S.pow}"></label>
      <label>${esc(t("calcRate"))}<select class="inp" id="ms_rate">${RATES.map(([k, v]) => `<option value="${k}"${k === S.rate ? " selected" : ""}>${esc(t("rates")[k])} (${fmt(v)})</option>`).join("")}</select></label></div>
    <div class="ms-res">${esc(t("calcRes").replace("{m}", fmt(m)).replace("{s}", sp(m).toFixed(1)))}</div>
    <div class="ms-in"><label>${esc(t("calcOpp"))}<input class="inp" id="ms_opp" type="number" min="0" step="100000" value="${S.opp}"></label></div>
    <div class="ms-res">${esc(t("calcOppRes").replace("{s}", fmt(sp(S.opp))))}</div>
    <div class="muted ms-small">${esc(t("calcNote"))}</div>`;
}
function render() {
  const root = $("ms_root"); if (!root) return;
  root.innerHTML = `
  <div class="ms-hero"><span class="ms-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="card rs-do"><h3>${esc(t("doH"))}</h3><ol class="rs-dol">${t("dos").map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
  <div class="card"><h3>${esc(t("tblH"))}</h3><div class="ms-eq"><div class="ms-eqb sw"><b>${esc(t("fH"))}</b></div></div><p class="ms-p">${esc(t("tblP"))}</p>
    <div class="ms-bars">${ROWS.map(([k, v, txt, c]) => `<div class="ms-row${v ? "" : " zero"}"><div class="ms-k">${esc(t("items")[k])}</div>
      <div class="ms-b"><i style="width:${(v * 100).toFixed(1)}%"></i></div>
      <div class="ms-v"><b>${esc(txt || String(v))}</b></div>
      ${c === "mid" ? `<span class="ms-c ${c}">${esc(t("conf")[c])}</span>` : "<span></span>"}</div>`).join("")}</div>
    <p class="muted ms-small" style="margin-top:10px">${esc(t("tblFoot"))}</p></div>
  <div class="card"><h3>${esc(t("whatH"))}</h3>
    <div class="ms-eq"><div class="ms-eqb"><b>${esc(t("eqA"))}</b></div><span class="ms-op">÷ 317 ≈</span><div class="ms-eqb sw"><b>${esc(t("eqB"))}</b></div></div>
    <ul class="ms-ul">${t("what").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("rateH"))}</h3><p class="ms-p">${esc(t("rateP"))}</p>
    <div class="ms-two">${RATES.map(([k, v]) => `<div class="ms-eqb${k === "big" ? " sw" : ""}"><b>${esc(t("rates")[k])}</b><div>≈ ${fmt(v)} ${esc(t("rateU"))}</div><div class="ms-sw">${esc(t("rateSw").replace("{n}", Math.round(sp(v))))}</div></div>`).join("")}</div>
    <p class="ms-guess">💭 ${esc(t("rateGuess"))}</p></div>
  <div class="card"><h3>${esc(t("tcH"))}</h3><p class="ms-p">${esc(t("tcP"))}</p></div>
  <div class="ms-two">
    <div class="card"><h3>${esc(t("downH"))}</h3><ul class="ms-ul">${t("down").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("updH"))}</h3><p class="ms-p">${esc(t("upd"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("calcH"))}</h3><div id="ms_calc" class="ms-calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="ms-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("howH"))}</b></summary><p class="ms-p" style="margin-top:8px">${esc(t("eqNote"))}</p><p class="ms-p">${esc(t("fP"))}</p><p class="ms-p">${esc(t("tcGuess"))}</p><div class="muted ms-small">${esc(t("foot"))}</div></details>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("ms_calc"); if (!c) return; c.innerHTML = calcHtml(); bind(); };
  for (const [id, k, num] of [["ms_item", "item", 0], ["ms_pow", "pow", 1], ["ms_rate", "rate", 0], ["ms_opp", "opp", 1]]) {
    const el = $(id); if (!el) continue;
    el.onchange = () => { S[k] = num ? Math.max(0, +el.value || 0) : el.value; redo(); };
  }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("ms_title")) { $("ms_title").textContent = t("title"); $("ms_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ms = { init, applyTexts, setLang };
})();
