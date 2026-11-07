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
  en: { title: "🧳 Migrant Score", intro: "Our research on the hidden Migrant Score and what raises it. Still being tested — numbers will change.",
    badge: "🧪 Still testing · from our own before/after tests · updated {d}",
    heroH: "A hidden score that counts what you've built for good.", heroP: "Governor Charms, Governor Gear, pets, research and Hero Gear count fully. Master affinity counts half, hero stars a little. Troops, buildings and exclusive gear don't count. It is almost exactly your Swordland Showdown troop power × 317.",
    whatH: "🔎 What it is",
    what: ["The game doesn't show it. MightPulse does (the kingdom list only shows the top 100).", "The top 100 of a kingdom added together decide whether the kingdom counts as leading or normal for migration (top 10% of each group = leading)."],
    eqA: "Migrant Score", eqB: "Swordland troop power", eqNote: "Checked on 98 players on 10/14 (average error 1.7%) and again on 11/03 — closer than total power + Mystic Trial.",
    tblH: "📊 What raises it", tblP: "How much each kind of upgrade counts, for the same power gained (1 = full):", fH: "Migrant Score = Σ (power × weight) × your account's rate", fP: "Confirmed on 11/04: 11 single-item tests on two accounts (Charms ×4, pet level-up ×2, breakthrough ×3, refinement ×2) — every prediction within 5 points, even a +2.47M jump. 11/06: research +164,400 power → +1,498 (exact), Hero Gear mastery +40,800 → +243 (predicted +242), Governor Gear +408,000 → +3,716 (predicted +3,717); exclusive gear and buildings gave 0.",
    items: { charm: "💎 Governor Charms", pet: "🐾 Pets (level-up, breakthrough, refinement)", tech: "🔬 Research", gear: "🛡️ Hero Gear (enhance, mastery)", lgear: "👑 Governor Gear (enhance)", fav: "🎓 Master affinity", adv: "🎓 Master advancement", star: "⭐ Hero stars (main heroes)", excl: "🔧 Exclusive gear (widgets)", skill: "🎓 Master skills · other heroes (stars, skills)", lvl: "📈 Hero levels (main heroes)", bld: "🏗️ Buildings (not the Town Center TG)", troops: "⚔️ Training / losing troops" },
    conf: { hi: "sure", mid: "so-so" },
    tblFoot: "Same power: Charms, Governor Gear, pets, research and Hero Gear = 2× master affinity and 2–5× hero stars. Master advancement: only part of its power counts (the talent / skill part doesn't).",
    rateH: "📈 Your account's rate", rateP: "\"1\" turns into a different number of points on each account. The same pet breakthrough (+91,440 power) gave +833 on the main account and +543 on the second one.",
    rates: { big: "Town Center 40, TG2", small: "Town Center 25" }, rateU: "points per 1M power", rateSw: "≈ +{n} Swordland power",
    rateGuess: "The more built-up the account, the more points the same upgrade gives. Maybe the Town Center sets it — not known yet.",
    tcH: "🏰 Town Center", tcP: "Main account to TG2 (Barracks and Range also TG2 at the same time): +10,077 at once (≈ +32 Swordland power), +5.0%. A normal level (24 → 25) added almost nothing, and other buildings add 0 (11/06: +20,664 and +78,064 building power, no change).",
    tcGuess: "Our guess: building power itself doesn't count. The Town Center's gold (TG) level gives the jump — maybe by raising the account's rate (+5% fits). To be confirmed at the next TG upgrade.",
    downH: "🔒 Never goes down",
    down: ["Losing troops doesn't lower it.", "Taking off Hero Gear doesn't either (770k gear power removed, same score two hours later) → it only goes up, or it counts what you own, not what you wear.", "Stat % don't count: a research level that gives +2% Attack adds only that level's research power. So the score shows how much you invested, not how strong your stats are."],
    updH: "⏱️ When it updates", upd: "Not instant. It is recalculated about every 15–60 minutes, at a different time for each account. Wait a bit before checking MightPulse.",
    calcH: "🧮 Try it", calcItem: "I upgrade", calcPow: "Power gained", calcRate: "My account", calcRes: "≈ +{m} Migrant Score · ≈ +{s} Swordland power",
    calcOpp: "Someone's Migrant Score", calcOppRes: "≈ {s} Swordland troop power",
    calcNote: "Estimate from our tests so far. It shows investment, not stats.",
    doH: "✅ So",
    dos: ["To climb in Swordland Showdown: Governor Charms, Governor Gear, pets, research and Hero Gear first (they count the same — pick the one where power is cheapest), then master affinity, then stars of your main heroes. Training troops and exclusive gear (widgets) don't help.",
      "Save for the Town Center's next gold (TG) level — that's the big jump.",
      "Sizing up an opponent: their Migrant Score ÷ 317 ≈ their Swordland troop power. It only shows investment, not stats."],
    unkH: "🟡 Not known yet",
    unks: ["What sets each account's rate (the Town Center?).", "Why hero stars give different results."],
    foot: "Source: Sparrow's two accounts, item-by-item before/after tests (11/02–11/06), and the 10/14 Swordland check of 98 players. Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "🧳 遷城分數", intro: "我們自己研究的隱藏「遷城分數」：什麼會讓它變高。還在測試中，數字會再修正。",
    badge: "🧪 測試中 · 來自我們自己的前後測試 · 更新 {d}",
    heroH: "一個隱藏分數，只算你長期投資的東西。", heroP: "領主寶石、領主裝備、寵物、科技、英雄裝備全算；大師好感度算一半；英雄升星只算一點；兵、建築、英雄專屬裝備不算。它幾乎剛好等於聖劍爭奪的部隊戰力 × 317。",
    whatH: "🔎 它是什麼",
    what: ["遊戲裡看不到，MightPulse 看得到（王國排行只列前 100 名）。", "王國前 100 名加起來，決定遷城時這個王國算「領先」還是「普通」（每個遷城組前 10% = 領先王國）。"],
    eqA: "遷城分數", eqB: "聖劍部隊戰力", eqNote: "10/14 用 98 人驗證（平均誤差 1.7%），11/03 再確認一次——比「總戰力＋秘境」還準。",
    tblH: "📊 什麼會加分", tblP: "加同樣的實力，各種升級算多少（1 = 全算）：", fH: "遷城分數 = Σ（實力 × 權重）× 帳號倍率", fP: "11/04 確認：兩個帳號 11 次單項測試（寶石 ×4、寵物升級 ×2、突破 ×3、洗練 ×2），每次預測誤差都在 5 分以內，連一次 +247 萬也一樣準。11/06：研究 +164,400 實力 → +1,498（一分不差）、英雄裝備專精 +40,800 → +243（預測 +242）、領主裝備 +408,000 → +3,716（預測 +3,717）；英雄專屬裝備和建築都是 0。",
    items: { charm: "💎 領主寶石", pet: "🐾 寵物（升級、突破、洗練）", tech: "🔬 科技（研究）", gear: "🛡️ 英雄裝備（強化、專精）", lgear: "👑 領主裝備（強化）", fav: "🎓 大師好感度", adv: "🎓 大師進階", star: "⭐ 英雄升星（主力）", excl: "🔧 英雄專屬裝備（零件）", skill: "🎓 大師技能・非主力英雄（升星、技能）", lvl: "📈 主力英雄升等級", bld: "🏗️ 建築（不含城鎮中心 TG）", troops: "⚔️ 收兵、損兵" },
    conf: { hi: "可信", mid: "還不確定" },
    tblFoot: "同樣的實力：寶石、領主裝備、寵物、科技、英雄裝備 = 大師好感度的 2 倍、升星的 2–5 倍。大師進階：只有一部分實力算（天賦、技能那部分不算）。",
    rateH: "📈 每個帳號的倍率", rateP: "「1」換成幾分，每個帳號不一樣。同一個寵物突破（+91,440 實力）：主帳 +833、小帳 +543。",
    rates: { big: "城鎮中心 40、TG2", small: "城鎮中心 25" }, rateU: "分／1M 實力", rateSw: "≈ 聖劍 +{n}",
    rateGuess: "帳號越發展，同樣的升級換越多分。可能跟城鎮中心有關——還不知道。",
    tcH: "🏰 城鎮中心", tcP: "主帳升到 TG2（步兵營、弓兵營同時也 TG2）那次一口氣 +10,077（≈ 聖劍 +32），剛好 +5.0%。小帳一般等級（24→25）幾乎沒加分；其他建築是 0（11/06 小帳 +20,664、主帳 +78,064 建築實力都沒變）。",
    tcGuess: "推測：建築實力本身不算，城鎮中心的黃金等級（TG）才會大跳——可能是讓帳號倍率變大（+5% 對得上）。等下一次 TG 升級再確認。",
    downH: "🔒 不會扣分",
    down: ["損兵不扣。", "卸下英雄裝備也不扣（卸了 77 萬裝備實力，兩小時後一樣）→ 分數只升不降，或算的是「擁有的」不是「穿著的」。", "不含屬性 %：研究攻擊力 +2% 只照那一級的科技實力加分。所以遷城分數看得出投資量，看不出屬性強弱。"],
    updH: "⏱️ 多久更新", upd: "不是即時。大約每 15–60 分鐘重算一次，每個帳號時間不一樣。升完等一下再去看 MightPulse。",
    calcH: "🧮 算算看", calcItem: "我升級", calcPow: "加了多少實力", calcRate: "我的帳號", calcRes: "≈ 遷城分數 +{m} · ≈ 聖劍部隊戰力 +{s}",
    calcOpp: "某人的遷城分數", calcOppRes: "≈ 聖劍部隊戰力 {s}",
    calcNote: "用目前測試結果估的。只代表投資量，不代表屬性。",
    doH: "✅ 所以",
    dos: ["想拉高聖劍爭奪排名：先升領主寶石、領主裝備、寵物、科技、英雄裝備（五個算一樣，挑實力最便宜的），其次大師好感度，最後升主力英雄的星。收兵、英雄專屬裝備（零件）沒用。",
      "存資源衝城鎮中心下一個黃金等級（TG）——那是大跳。",
      "看對手：他的遷城分數 ÷ 317 ≈ 他的聖劍部隊戰力。但這只代表投資量，不代表屬性。"],
    unkH: "🟡 還不知道的",
    unks: ["每個帳號的倍率由什麼決定（城鎮中心？）。", "英雄升星為什麼結果不一致。"],
    foot: "來源：Sparrow 兩個帳號逐項前後測試（11/02–11/06）、10/14 聖劍 98 人對照。不是遊戲官方說明，數字會隨更多測試修正。" },
  pt: { title: "🧳 Pontuação de Migração", intro: "Nossa pesquisa sobre a Pontuação de Migração oculta e o que a aumenta. Ainda em teste — os números vão mudar.",
    badge: "🧪 Ainda em teste · dos nossos próprios testes de antes/depois · atualizado {d}",
    heroH: "Uma pontuação oculta que conta o que você construiu para sempre.", heroP: "Amuletos do Governador, Equipamento do Chefe, mascotes, pesquisa e Equipamento do Herói contam inteiros. A Afinidade de Mestre conta metade; estrelas de herói, um pouco. Tropas, construções e equipamento exclusivo não contam. É quase exatamente o seu poder das tropas no Confronto entre Espadas × 317.",
    whatH: "🔎 O que é",
    what: ["O jogo não mostra. O MightPulse mostra (a lista do reino só mostra o top 100).", "O top 100 de um reino, somado, decide se o reino conta como Reino Líder ou normal na Transferência de Reino (top 10% de cada grupo = líder)."],
    eqA: "Pontuação de Migração", eqB: "Poder das tropas na Terra das Espadas", eqNote: "Conferido em 98 jogadores em 10/14 (erro médio 1.7%) e de novo em 11/03 — mais perto que poder total + Prova Mística.",
    tblH: "📊 O que aumenta", tblP: "Quanto cada tipo de melhoria conta, para o mesmo poder ganho (1 = inteiro):", fH: "Pontuação de Migração = Σ (poder × peso) × taxa da sua conta", fP: "Confirmado em 11/04: 11 testes de um item só em duas contas (Amuletos ×4, nível de mascote ×2, avanço ×3, refino ×2) — toda previsão dentro de 5 pontos, até um salto de +2.47M. 11/06: pesquisa +164,400 de poder → +1,498 (exato), maestria do Equipamento do Herói +40,800 → +243 (previsto +242), Equipamento do Chefe +408,000 → +3,716 (previsto +3,717); equipamento exclusivo e construções deram 0.",
    items: { charm: "💎 Amuletos do Governador", pet: "🐾 Mascotes (nível, avanço, refino)", tech: "🔬 Pesquisa", gear: "🛡️ Equipamento do Herói (melhoria, maestria)", lgear: "👑 Equipamento do Chefe (melhoria)", fav: "🎓 Afinidade de Mestre", adv: "🎓 Avanço de Mestre", star: "⭐ Estrelas de herói (heróis principais)", excl: "🔧 Equipamento exclusivo (Ferramentas)", skill: "🎓 Habilidades de Mestre · outros heróis (estrelas, habilidades)", lvl: "📈 Nível de herói (heróis principais)", bld: "🏗️ Construções (não o TG do Centro da Cidade)", troops: "⚔️ Treinar / perder tropas" },
    conf: { hi: "certo", mid: "mais ou menos" },
    tblFoot: "Mesmo poder: Amuletos, Equipamento do Chefe, mascotes, pesquisa e Equipamento do Herói = 2× a Afinidade de Mestre e 2–5× as estrelas de herói. Avanço de Mestre: só parte do poder conta (a parte de talento / habilidade não).",
    rateH: "📈 A taxa da sua conta", rateP: "\"1\" vira um número diferente de pontos em cada conta. O mesmo avanço de mascote (+91,440 de poder) deu +833 na conta principal e +543 na segunda.",
    rates: { big: "Centro da Cidade 40, TG2", small: "Centro da Cidade 25" }, rateU: "pontos por 1M de poder", rateSw: "≈ +{n} de poder na Terra das Espadas",
    rateGuess: "Quanto mais desenvolvida a conta, mais pontos a mesma melhoria dá. Talvez o Centro da Cidade defina isso — ainda não sabemos.",
    tcH: "🏰 Centro da Cidade", tcP: "Conta principal para TG2 (Quartel e Campo de Tiro também TG2 ao mesmo tempo): +10,077 de uma vez (≈ +32 de poder na Terra das Espadas), +5.0%. Um nível normal (24 → 25) quase não somou nada, e outras construções somam 0 (11/06: +20,664 e +78,064 de poder de construção, sem mudança).",
    tcGuess: "Nosso palpite: o poder de construção em si não conta. O nível de Adamante (TG) do Centro da Cidade dá o salto — talvez aumentando a taxa da conta (+5% bate). A confirmar no próximo nível TG.",
    downH: "🔒 Nunca diminui",
    down: ["Perder tropas não diminui.", "Tirar o Equipamento do Herói também não (770k de poder de equipamento removidos, mesma pontuação duas horas depois) → só sobe, ou conta o que você tem, não o que está usando.", "% de atributos não contam: um nível de pesquisa que dá +2% de Ataque soma só o poder de pesquisa daquele nível. Então a pontuação mostra quanto você investiu, não quão fortes são seus atributos."],
    updH: "⏱️ Quando atualiza", upd: "Não é na hora. É recalculada mais ou menos a cada 15–60 minutos, em horários diferentes para cada conta. Espere um pouco antes de olhar o MightPulse.",
    calcH: "🧮 Teste", calcItem: "Eu melhoro", calcPow: "Poder ganho", calcRate: "Minha conta", calcRes: "≈ +{m} de Pontuação de Migração · ≈ +{s} de poder na Terra das Espadas",
    calcOpp: "Pontuação de Migração de alguém", calcOppRes: "≈ {s} de poder das tropas na Terra das Espadas",
    calcNote: "Estimativa pelos nossos testes até agora. Mostra investimento, não atributos.",
    doH: "✅ Então",
    dos: ["Para subir no Confronto entre Espadas: Amuletos do Governador, Equipamento do Chefe, mascotes, pesquisa e Equipamento do Herói primeiro (contam igual — escolha onde o poder é mais barato), depois Afinidade de Mestre, depois estrelas dos seus heróis principais. Treinar tropas e equipamento exclusivo (Ferramentas) não ajudam.",
      "Guarde recursos para o próximo nível de Adamante (TG) do Centro da Cidade — esse é o grande salto.",
      "Para avaliar um oponente: a Pontuação de Migração dele ÷ 317 ≈ o poder das tropas dele na Terra das Espadas. Só mostra investimento, não atributos."],
    unkH: "🟡 Ainda não sabemos",
    unks: ["O que define a taxa de cada conta (o Centro da Cidade?).", "Por que as estrelas de herói dão resultados diferentes."],
    foot: "Fonte: as duas contas da Sparrow, testes de antes/depois item por item (11/02–11/06), e a conferência de 98 jogadores na Terra das Espadas em 10/14. Não vem do jogo. Os números serão corrigidos conforme testarmos mais." },
  ar: { title: "🧳 نقاط الهجرة", intro: "بحثنا عن نقاط الهجرة المخفية وما الذي يرفعها. ما زالت قيد الاختبار — الأرقام ستتغير.",
    badge: "🧪 قيد الاختبار · من اختباراتنا قبل/بعد · آخر تحديث {d}",
    heroH: "نقاط مخفية تحسب ما بنيته بشكل دائم.", heroP: "تميمة الحاكم وعتاد الحاكم والحيوانات الأليفة والبحث وعتاد البطل تُحسب كاملة. تقارب المتخصص يُحسب نصفه، ونجوم الأبطال قليلًا. القوات والمباني والعتاد الحصري لا تُحسب. إنها تقريبًا بالضبط قوة قواتك في مواجهة أرض السيوف × 317.",
    whatH: "🔎 ما هي",
    what: ["اللعبة لا تُظهرها. MightPulse يُظهرها (قائمة المملكة تُظهر أفضل 100 فقط).", "مجموع أفضل 100 في المملكة يحدد هل تُحسب المملكة من الممالك الرائدة أم عادية في نقل المملكة (أعلى 10% من كل مجموعة = رائدة)."],
    eqA: "نقاط الهجرة", eqB: "قوة القوات في أرض السيوف", eqNote: "تم التحقق على 98 لاعبًا في 10/14 (متوسط الخطأ 1.7%) ومرة أخرى في 11/03 — أدق من القوة الكلية + الاختبارات الغامضة.",
    tblH: "📊 ما الذي يرفعها", tblP: "كم يُحسب كل نوع من الترقيات، لنفس القوة المكتسبة (1 = كاملة):", fH: "نقاط الهجرة = Σ (القوة × الوزن) × معدل حسابك", fP: "تأكد في 11/04: 11 اختبارًا لعنصر واحد على حسابين (التميمة ×4، رفع مستوى الحيوان الأليف ×2، تقدم ×3، تحسين ×2) — كل توقع ضمن 5 نقاط، حتى قفزة +2.47M. 11/06: البحث +164,400 قوة → +1,498 (بالضبط)، تخصص عتاد البطل +40,800 → +243 (المتوقع +242)، عتاد الحاكم +408,000 → +3,716 (المتوقع +3,717)؛ العتاد الحصري والمباني أعطت 0.",
    items: { charm: "💎 تميمة الحاكم", pet: "🐾 الحيوانات الأليفة (رفع المستوى، تقدم، تحسين)", tech: "🔬 البحث", gear: "🛡️ عتاد البطل (تحسين، تخصص)", lgear: "👑 عتاد الحاكم (تحسين)", fav: "🎓 تقارب المتخصص", adv: "🎓 ترقية المتخصص", star: "⭐ نجوم الأبطال (الأبطال الرئيسيون)", excl: "🔧 العتاد الحصري (الأجزاء)", skill: "🎓 مهارات المتخصص · أبطال آخرون (نجوم، مهارات)", lvl: "📈 مستويات الأبطال (الأبطال الرئيسيون)", bld: "🏗️ المباني (ليس TG مركز البلدة)", troops: "⚔️ تدريب / خسارة القوات" },
    conf: { hi: "مؤكد", mid: "متوسط" },
    tblFoot: "لنفس القوة: التميمة وعتاد الحاكم والحيوانات الأليفة والبحث وعتاد البطل = 2× تقارب المتخصص و2–5× نجوم الأبطال. ترقية المتخصص: جزء فقط من قوتها يُحسب (جزء الموهبة / المهارة لا يُحسب).",
    rateH: "📈 معدل حسابك", rateP: "\"1\" يتحول إلى عدد مختلف من النقاط في كل حساب. نفس تقدم الحيوان الأليف (+91,440 قوة) أعطى +833 في الحساب الرئيسي و+543 في الحساب الثاني.",
    rates: { big: "مركز البلدة 40، TG2", small: "مركز البلدة 25" }, rateU: "نقطة لكل 1M قوة", rateSw: "≈ +{n} قوة في أرض السيوف",
    rateGuess: "كلما كان الحساب أكثر تطورًا، أعطت نفس الترقية نقاطًا أكثر. ربما مركز البلدة هو الذي يحدده — غير معروف بعد.",
    tcH: "🏰 مركز البلدة", tcP: "الحساب الرئيسي إلى TG2 (الثكنات والنطاق أيضًا TG2 في نفس الوقت): +10,077 دفعة واحدة (≈ +32 قوة في أرض السيوف)، +5.0%. مستوى عادي (24 → 25) لم يضف شيئًا تقريبًا، والمباني الأخرى تضيف 0 (11/06: +20,664 و+78,064 قوة مبانٍ، بلا تغيير).",
    tcGuess: "تخميننا: قوة المباني نفسها لا تُحسب. مستوى الذهب الخالص (TG) لمركز البلدة هو الذي يعطي القفزة — ربما برفع معدل الحساب (+5% يتطابق). سنتأكد عند ترقية TG القادمة.",
    downH: "🔒 لا تنخفض أبدًا",
    down: ["خسارة القوات لا تخفضها.", "نزع عتاد البطل أيضًا لا يخفضها (أُزيلت 770k من قوة العتاد، ونفس النقاط بعد ساعتين) → إنها ترتفع فقط، أو تحسب ما تملكه، لا ما ترتديه.", "نسب الخصائص % لا تُحسب: مستوى بحث يعطي +2% هجوم يضيف فقط قوة البحث لذلك المستوى. لذلك النقاط تُظهر كم استثمرت، لا مدى قوة خصائصك."],
    updH: "⏱️ متى تتحدث", upd: "ليست فورية. يُعاد حسابها تقريبًا كل 15–60 دقيقة، في وقت مختلف لكل حساب. انتظر قليلًا قبل أن تتحقق من MightPulse.",
    calcH: "🧮 جرّب", calcItem: "أرقّي", calcPow: "القوة المكتسبة", calcRate: "حسابي", calcRes: "≈ +{m} نقاط هجرة · ≈ +{s} قوة في أرض السيوف",
    calcOpp: "نقاط هجرة لاعب ما", calcOppRes: "≈ {s} قوة القوات في أرض السيوف",
    calcNote: "تقدير من اختباراتنا حتى الآن. تُظهر الاستثمار، لا الخصائص.",
    doH: "✅ إذن",
    dos: ["للصعود في مواجهة أرض السيوف: تميمة الحاكم وعتاد الحاكم والحيوانات الأليفة والبحث وعتاد البطل أولًا (تُحسب بالتساوي — اختر الأرخص من حيث القوة)، ثم تقارب المتخصص، ثم نجوم أبطالك الرئيسيين. تدريب القوات والعتاد الحصري (الأجزاء) لا يساعدان.",
      "ادّخر لمستوى الذهب الخالص (TG) التالي لمركز البلدة — هذه هي القفزة الكبيرة.",
      "لتقدير خصم: نقاط هجرته ÷ 317 ≈ قوة قواته في أرض السيوف. تُظهر الاستثمار فقط، لا الخصائص."],
    unkH: "🟡 غير معروف بعد",
    unks: ["ما الذي يحدد معدل كل حساب (مركز البلدة؟).", "لماذا تعطي نجوم الأبطال نتائج مختلفة."],
    foot: "المصدر: حسابا Sparrow، اختبارات قبل/بعد عنصرًا بعنصر (11/02–11/06)، وفحص 98 لاعبًا في أرض السيوف في 10/14. ليست من اللعبة. ستُصحَّح الأرقام كلما اختبرنا أكثر." },
  ko: { title: "🧳 이주 점수", intro: "숨겨진 이주 점수와 그걸 올리는 것에 대한 우리 연구. 아직 테스트 중 — 숫자는 바뀔 수 있어.",
    badge: "🧪 테스트 중 · 우리가 직접 한 전후 비교 테스트 · 업데이트 {d}",
    heroH: "오래 남는 투자만 세는 숨겨진 점수.", heroP: "영주 보석, 영주 장비, 펫, 연구, 영웅 장비는 전부 계산돼. 거장 호감도는 절반, 영웅 성급은 조금. 병력, 건물, 전용 장비는 안 들어가. 성검 쟁탈 부대 전투력 × 317과 거의 똑같아.",
    whatH: "🔎 이게 뭐야",
    what: ["게임에서는 안 보여. MightPulse에서는 보여 (왕국 목록은 상위 100명만).", "왕국 상위 100명의 합으로 왕국 이민 때 그 왕국이 강성 왕국인지 일반인지 정해져 (그룹마다 상위 10% = 강성)."],
    eqA: "이주 점수", eqB: "성검 부대 전투력", eqNote: "10/14에 98명으로 확인 (평균 오차 1.7%), 11/03에 다시 확인 — 총 전투력 + 신비한 시련보다 더 정확해.",
    tblH: "📊 무엇이 올려 주나", tblP: "같은 전투력을 올렸을 때 업그레이드 종류별 반영 비율 (1 = 전부):", fH: "이주 점수 = Σ (전투력 × 가중치) × 계정 배율", fP: "11/04 확인: 두 계정에서 단일 항목 테스트 11회 (보석 ×4, 펫 레벨업 ×2, 돌파 ×3, 단련 ×2) — 모든 예측이 5점 이내, +2.47M 점프도 마찬가지. 11/06: 연구 +164,400 전투력 → +1,498 (정확), 영웅 장비 마스터리 +40,800 → +243 (예측 +242), 영주 장비 +408,000 → +3,716 (예측 +3,717); 전용 장비와 건물은 0.",
    items: { charm: "💎 영주 보석", pet: "🐾 펫 (레벨업, 돌파, 단련)", tech: "🔬 연구", gear: "🛡️ 영웅 장비 (강화, 마스터리)", lgear: "👑 영주 장비 (강화)", fav: "🎓 거장 호감도", adv: "🎓 거장 진급", star: "⭐ 영웅 성급 (주력 영웅)", excl: "🔧 전용 장비 (부속품)", skill: "🎓 거장 스킬 · 다른 영웅 (성급, 스킬)", lvl: "📈 영웅 레벨 (주력 영웅)", bld: "🏗️ 건물 (도시 센터 TG 제외)", troops: "⚔️ 병력 훈련 / 손실" },
    conf: { hi: "확실", mid: "보통" },
    tblFoot: "같은 전투력이면: 보석, 영주 장비, 펫, 연구, 영웅 장비 = 거장 호감도의 2배, 영웅 성급의 2–5배. 거장 진급: 전투력 일부만 계산돼 (재능 / 스킬 부분은 아님).",
    rateH: "📈 계정 배율", rateP: "\"1\"이 몇 점이 되는지는 계정마다 달라. 같은 펫 돌파 (+91,440 전투력)가 본계정에서는 +833, 부계정에서는 +543.",
    rates: { big: "도시 센터 40, TG2", small: "도시 센터 25" }, rateU: "1M 전투력당 점수", rateSw: "≈ 성검 전투력 +{n}",
    rateGuess: "계정이 더 성장할수록 같은 업그레이드로 더 많은 점수를 받아. 도시 센터가 정하는 걸 수도 — 아직 몰라.",
    tcH: "🏰 도시 센터", tcP: "본계정 TG2 달성 (보병대와 궁병대도 동시에 TG2): 한 번에 +10,077 (≈ 성검 전투력 +32), +5.0%. 일반 레벨 (24 → 25)은 거의 안 올랐고, 다른 건물은 0 (11/06: 건물 전투력 +20,664와 +78,064, 변화 없음).",
    tcGuess: "추측: 건물 전투력 자체는 안 들어가. 도시 센터의 순금 (TG) 레벨이 점프를 만들어 — 아마 계정 배율을 올려서 (+5%가 맞아). 다음 TG 업그레이드 때 확인 예정.",
    downH: "🔒 절대 안 내려가",
    down: ["병력을 잃어도 안 내려가.", "영웅 장비를 벗겨도 안 내려가 (장비 전투력 770k를 뺐는데 2시간 뒤에도 같은 점수) → 오르기만 하거나, 장착한 게 아니라 가진 걸 세는 것.", "스탯 %는 안 들어가: 공격력 +2%를 주는 연구 레벨은 그 레벨의 연구 전투력만 더해. 그래서 점수는 얼마나 투자했는지를 보여주지, 스탯이 얼마나 센지는 안 보여줘."],
    updH: "⏱️ 언제 갱신되나", upd: "즉시 아님. 약 15–60분마다 다시 계산되고, 계정마다 시간이 달라. MightPulse 보기 전에 조금 기다려.",
    calcH: "🧮 계산해 보기", calcItem: "업그레이드할 것", calcPow: "오른 전투력", calcRate: "내 계정", calcRes: "≈ 이주 점수 +{m} · ≈ 성검 전투력 +{s}",
    calcOpp: "누군가의 이주 점수", calcOppRes: "≈ 성검 부대 전투력 {s}",
    calcNote: "지금까지 테스트로 낸 추정치. 투자량을 보여줄 뿐, 스탯은 아님.",
    doH: "✅ 그래서",
    dos: ["성검 쟁탈에서 올라가려면: 영주 보석, 영주 장비, 펫, 연구, 영웅 장비 먼저 (똑같이 계산돼 — 전투력이 제일 싼 걸 골라), 그다음 거장 호감도, 그다음 주력 영웅 성급. 병력 훈련과 전용 장비 (부속품)는 도움 안 돼.",
      "도시 센터 다음 순금 (TG) 레벨을 위해 모아 둬 — 그게 큰 점프야.",
      "상대 평가: 상대 이주 점수 ÷ 317 ≈ 상대 성검 부대 전투력. 투자량만 보여주고, 스탯은 아님."],
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
  <div class="card"><h3>${esc(t("whatH"))}</h3>
    <div class="ms-eq"><div class="ms-eqb"><b>${esc(t("eqA"))}</b></div><span class="ms-op">÷ 317 ≈</span><div class="ms-eqb sw"><b>${esc(t("eqB"))}</b></div></div>
    <p class="muted ms-small" style="margin:6px 0 10px">${esc(t("eqNote"))}</p>
    <ul class="ms-ul">${t("what").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("tblH"))}</h3><div class="ms-eq"><div class="ms-eqb sw"><b>${esc(t("fH"))}</b></div></div><p class="muted ms-small" style="margin:6px 0 10px">✅ ${esc(t("fP"))}</p><p class="ms-p">${esc(t("tblP"))}</p>
    <div class="ms-bars">${ROWS.map(([k, v, txt, c]) => `<div class="ms-row${v ? "" : " zero"}"><div class="ms-k">${esc(t("items")[k])}</div>
      <div class="ms-b"><i style="width:${(v * 100).toFixed(1)}%"></i></div>
      <div class="ms-v"><b>${esc(txt || String(v))}</b></div>
      <span class="ms-c ${c}">${esc(t("conf")[c])}</span></div>`).join("")}</div>
    <p class="muted ms-small" style="margin-top:10px">${esc(t("tblFoot"))}</p></div>
  <div class="card"><h3>${esc(t("rateH"))}</h3><p class="ms-p">${esc(t("rateP"))}</p>
    <div class="ms-two">${RATES.map(([k, v]) => `<div class="ms-eqb${k === "big" ? " sw" : ""}"><b>${esc(t("rates")[k])}</b><div>≈ ${fmt(v)} ${esc(t("rateU"))}</div><div class="ms-sw">${esc(t("rateSw").replace("{n}", Math.round(sp(v))))}</div></div>`).join("")}</div>
    <p class="ms-guess">💭 ${esc(t("rateGuess"))}</p></div>
  <div class="card"><h3>${esc(t("tcH"))}</h3><p class="ms-p">${esc(t("tcP"))}</p><p class="ms-guess">💭 ${esc(t("tcGuess"))}</p></div>
  <div class="ms-two">
    <div class="card"><h3>${esc(t("downH"))}</h3><ul class="ms-ul">${t("down").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("updH"))}</h3><p class="ms-p">${esc(t("upd"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("calcH"))}</h3><div id="ms_calc" class="ms-calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("doH"))}</h3><ol class="ms-dos">${t("dos").map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="ms-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="muted ms-small">${esc(t("foot"))}</div>`;
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
