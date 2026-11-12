/* NXS officer page — ⚔️ Rally & Garrison report (registers OFFICER_PAGES.rg; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-07: members don't understand who counts in a rally / garrison and which joiner heroes to bring. Our own research, some
   points still being tested (kept in 🔬 Research, not the public guide, until they are sure). Sources: Project docs
   claude/kingshot-battle-rules.md (rules 4, 5, 11, 20, 21, 29–32), claude/hero-skill-stacking-test-2026-11-07.md (Sparrow's two accounts,
   solo marches vs Lv25 Lion / Lv30 Bear), claude/kingshot-pvp-2026-11-06.md, claude/joiner-garrison-update-2026-11-07.md. Not official.
   Read-only text + a small joiner calculator, no member data. Names follow data/terms.js. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-07";
/* joiner first skills at Lv5 (4★) — type: atk / let / hp / def / tk (damage taken −) / ea (enemy Attack −) / ed (enemy damage −) / nil */
const HEROES = [
  ["amane", { atk: 25 }], ["margot", { atk: 25 }], ["chenko", { let: 25 }], ["yeonwoo", { let: 25 }], ["amadeus", { let: 25 }],
  ["gordon", { hp: 25 }], ["saul", { def: 10, hp: 15 }], ["hilde", { atk: 15, def: 10 }], ["howard", { tk: 20 }], ["quinn", { tk: 20 }],
  ["fahd", { ed: 20 }], ["eric", { ea: 20 }], ["diana", {}],
];
const OFF = ["atk", "let"];   // what counts against the Bear (it doesn't hit back)
const PRESET = { bear: ["amane", "amane", "chenko", "chenko"], pvp: ["amane", "chenko", "gordon", "howard"] };
const T = {
  en: { title: "⚔️ Rally & Garrison", intro: "", obs: ["A rally uses the leader's stats; a garrison uses its strongest defender's.", "Same skill type adds; different types multiply."], obsH: "🔎 What we saw", do: ["Only your first hero's skill counts: bring a 4★ hero with the skill at Lv5.", "Bear Hunt: 2 Attack (Amane, Margot) + 2 Lethality (Chenko, Yeonwoo).", "PvP rally and garrison: 4 different types (e.g. Amane + Chenko + Gordon + Howard).", "City Bonus: the rally leader, or the strongest defender in a garrison.", "After taking a building: garrison heroes and garrison Exclusive Gear."], howH: "🔢 How we worked it out", doH: "💡 Suggestions",
    badge: "🔬 Our research · updated {d}",
    st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "A rally fights with ONE player's stats.", heroP: "In a rally that is the leader. In a garrison it is the defender with the strongest stats. Everyone else brings troops — and up to 4 joiners also bring one hero skill.",
    whoH: "👥 Who counts", rally: "⚔️ Rally", gar: "🛡️ Garrison",
    whoR: [["ok", "The rally leader's stats, 3 heroes, City Bonus and rally Exclusive Gear."], ["ok", "Joiners: only their troops (they fight with the leader's stats) + 1 hero skill."]],
    whoG: [["ok", "The defender with the STRONGEST stats: his stats and his 3 heroes. Not always the garrison leader — the leader only sets how many troops fit."], ["ok", "Garrison-type Exclusive Gear works here; rally-type does not."], ["ok", "Joiners: troops + 1 hero skill, same as a rally."]],
    whoNote: "Seen in Viking battles: the heroes in the skill page were the strongest defender's every time — the leader's in some cities, someone else's in others.",
    slotH: "🦸 The 4 joiner skills", slot: [["ok", "Only your first hero's top-right skill counts."], ["ok", "Higher skill level first; same level → join order."], ["ok", "1★ Lv2 · 2★ Lv3 · 3★ Lv4 · 4★ Lv5"]],
    stackH: "✖️ Same type adds, different types multiply", stackP: "Hero skills are NOT in the stats % of the battle report. They are a separate layer on top. Tested with our own marches (same troops, only the heroes changed):",
    bars: [["none", "No battle skills", 1, 1], ["mix", "Attack 25 + Health 25 + Lethality 25", 1.961, 1.953], ["same", "Attack 25 + Attack 25 + Health 25", 1.891, 1.875]],
    barMeas: "measured", barTh: "worked out",
    stackFoot: "Attack + Attack = 1 + 0.25 + 0.25 = ×1.5 (adds). Attack × Lethality = 1.25 × 1.25 = ×1.5625 (multiplies). Measured 1.891 vs 1.875 adding — so two of the same type add.",
    defH: "🛡️ Defense skills count as much as attack", def: [["ok", "Health, Damage Taken Down and Enemy Attack Down each work about ×(1 + X)."], ["ok", "Enemy Attack Down works on monsters too."]],
    pickH: "🎯 Which joiners", pickBear: "🐻 Bear Hunt", pickPvp: "⚔️🛡️ PvP rally & garrison",
    pickBearP: "The Bear doesn't hit back, so only Attack and Lethality count. 2 + 2 beats 4 of one kind.",
    pickPvpP: "Attack, Lethality, Health and Damage taken − each count about the same — so spread the 4 slots over 4 different types. Saul gives Defense + Health in one slot.",
    calcH: "🧮 Try 4 joiners", calcMode: "Battle", modeBear: "Bear Hunt", modePvp: "PvP", calcRes: "×{x}", calcNote: "Skills at Lv5. Relative only — what the 4 skills add on top of the leader. Damage taken / enemy debuffs counted as ×(1 + X).",
    types: { atk: "Attack", let: "Lethality", hp: "Health", def: "Defense", tk: "Damage Taken Down", ea: "Enemy Troops Attack Down", ed: "Enemy Damage Down", nil: "no battle skill" },
    heroes: { amane: "Amane", margot: "Margot", chenko: "Chenko", yeonwoo: "Yeonwoo", amadeus: "Amadeus", gordon: "Gordon", saul: "Saul", hilde: "Hilde", howard: "Howard", quinn: "Quinn", fahd: "Fahd", eric: "Eric", diana: "Diana" },
    ex: [["4 × Chenko", "×2.00"], ["2 Chenko + 2 Amane", "×2.25"], ["Saul + Gordon + Howard + Fahd (all defense)", "PvP ×2.2"], ["Amane + Chenko + Gordon + Howard", "PvP ×2.34"]],
    exH: "Examples (Lv5)",
    leadH: "👑 The leader / strongest defender", lead: [["ok", "Battle report stats = (1 + troop % + squad %) × (1 + City Bonus + rally/garrison Exclusive Gear) ÷ (1 + enemy debuff) − 1."], ["ok", "Joiners turning on City Bonus does nothing."], ["ok", "Rally Exclusive Gear works only when you launch the rally; garrison gear only in a garrison."]],
    capH: "🏰 After a capture", cap: [["ok", "Rally survivors become the garrison."], ["ok", "Then the strongest defender among them sets the stats."], ["mid", "Several rallies on one target: expendable rallies first, the strongest leader last."]],
    trH: "⚔️ Troops", tr: [["ok", "Infantry stands in front and takes the hits; cavalry is rarely hit."], ["ok", "Archers can be hit early by an ambush."], ["ok", "One big rally beats two small ones."]],
    unkH: "🟡 Not known yet", unks: ["Whether \"Damage taken −\" and \"enemy Attack −\" stack as one type.", "Defense skills alone (Saul, Hilde) — we had no hero high enough to test.", "Whether PvP battles give exactly the same multipliers as monsters.", "The best troop ratio for a garrison."],
    numH: "🔢 The tests", numCols: ["March", "Heroes (cavalry / archer slot)", "Kills", "× vs none"],
    num: [["Lion 25 · 40,068 infantry", "none", "709", "1"], ["", "Yeonwoo (Lethality 15)", "836", "1.18"], ["", "Chenko (Lethality 20, Damage taken −16)", "985", "1.39"], ["", "Gordon + Yeonwoo", "1,184", "1.67"],
      ["Lion 25 · 43,168 archers", "none", "1,695", "1"], ["", "Howard (Damage taken −16, enemy Attack −16)", "2,231", "1.32"],
      ["Bear 30 · 70,000 infantry", "none", "1,545", "1"], ["", "Gordon + Yeonwoo (Lv5)", "3,030", "1.96"], ["", "Gordon + Amane (Lv5)", "2,922", "1.89"]],
    numFoot: "Each line = average of 2–6 solo marches that lost on purpose, so kills show how hard and how long they fought. Luck: about ±3% per march with infantry, ±10% with archers.",
    more: "Officers: full numbers in 🐻 Bear analysis and the battle rules",
    foot: "Source: tests on Sparrow's two accounts (11/07), our battle reports (B1–B29, 11/06 PvP), Viking reports, and outside guides checked against them. Worked back from the numbers, not from the game." },
  zh: { title: "⚔️ 集結與駐防", intro: "", obs: ["集結用隊長的屬性；駐防用守軍裡最強的人的屬性。", "同類技能相加，不同類相乘。"], obsH: "🔎 我們觀察到", do: ["只算第一位英雄的技能：帶 4★、技能 Lv5 的。", "狩獵巨熊：2 攻擊力（雨音、瑪爾戈）＋2 殺傷力（琴科、妍羽）。", "PvP 集結和駐防：4 種不同類（例：雨音＋琴科＋戈登＋霍華德）。", "城鎮增益由集結隊長、或駐防裡最強的人開。", "打下建築後換守城英雄和守城類專屬裝備。"], howH: "🔢 怎麼算的", doH: "💡 建議",
    badge: "🔬 我們的研究 · 更新 {d}",
    st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "集結只用「一個人」的屬性打。", heroP: "集結是隊長；駐防是守軍裡屬性最強的那個人。其他人只出兵——另外最多 4 位加入者各帶一個英雄技能。",
    whoH: "👥 誰算數", rally: "⚔️ 集結", gar: "🛡️ 駐防",
    whoR: [["ok", "集結隊長的屬性、三位英雄、城鎮增益、集結類專屬裝備。"], ["ok", "加入者：只有兵（用隊長的屬性打）＋ 1 個英雄技能。"]],
    whoG: [["ok", "守軍裡屬性「最強」的人：他的屬性和他的三位英雄。不一定是駐防隊長——隊長只決定能塞多少兵。"], ["ok", "守城類專屬裝備在這裡有用；集結類的沒用。"], ["ok", "加入者：兵＋ 1 個英雄技能，跟集結一樣。"]],
    whoNote: "維京戰報看到的：技能頁的英雄每次都是最強那個人的——有的城是城主，有的城是別人。",
    slotH: "🦸 4 個加入者技能", slot: [["ok", "只算第一位英雄右上角的技能。"], ["ok", "技能等級高的先；同等級看加入順序。"], ["ok", "1★ Lv2 · 2★ Lv3 · 3★ Lv4 · 4★ Lv5"]],
    stackH: "✖️ 同類相加、不同類相乘", stackP: "英雄技能不在戰報的屬性 % 裡，是另外乘上去的一層。用自己的部隊實測（同樣的兵，只換英雄）：",
    bars: [["none", "沒有戰鬥技能", 1, 1], ["mix", "攻擊力 25＋生命值 25＋殺傷力 25", 1.961, 1.953], ["same", "攻擊力 25＋攻擊力 25＋生命值 25", 1.891, 1.875]],
    barMeas: "實測", barTh: "算出來",
    stackFoot: "攻擊力＋攻擊力 = 1 + 0.25 + 0.25 = ×1.5（相加）。攻擊力 × 殺傷力 = 1.25 × 1.25 = ×1.5625（相乘）。實測 1.891，相加算出來 1.875——所以同一類是相加。",
    defH: "🛡️ 防守技能跟攻擊一樣值錢", def: [["ok", "生命值、承受傷害降低、敵軍攻擊力降低，效果都約 ×(1 + X)。"], ["ok", "敵軍攻擊力降低對野怪也有效。"]],
    pickH: "🎯 帶哪些加入者", pickBear: "🐻 狩獵巨熊", pickPvp: "⚔️🛡️ PvP 集結和駐防",
    pickBearP: "熊不打人，只有攻擊力和殺傷力有用。2＋2 比 4 個同一種好。",
    pickPvpP: "攻擊力、殺傷力、生命值、受到傷害 − 每 1% 都差不多值錢——4 格分給 4 種不同類最好。薩洛一格同時給防禦力＋生命值。",
    calcH: "🧮 試試 4 個加入者", calcMode: "戰鬥", modeBear: "狩獵巨熊", modePvp: "PvP", calcRes: "×{x}", calcNote: "技能都算 Lv5。只是相對值——4 個技能在隊長之外多乘多少。受到傷害 −、敵方減益用 ×(1 + X) 算。",
    types: { atk: "攻擊力", let: "殺傷力", hp: "生命值", def: "防禦力", tk: "承受傷害降低", ea: "敵軍部隊攻擊力降低", ed: "敵軍傷害降低", nil: "沒有戰鬥技能" },
    heroes: { amane: "雨音", margot: "瑪爾戈", chenko: "琴科", yeonwoo: "妍羽", amadeus: "阿瑪迪斯", gordon: "戈登", saul: "薩洛", hilde: "希爾德", howard: "霍華德", quinn: "奎恩", fahd: "法赫德", eric: "艾瑞克", diana: "狄安娜" },
    ex: [["4 × 琴科", "×2.00"], ["2 琴科＋2 雨音", "×2.25"], ["薩洛＋戈登＋霍華德＋法赫德（全防守）", "PvP ×2.2"], ["雨音＋琴科＋戈登＋霍華德", "PvP ×2.34"]],
    exH: "例子（Lv5）",
    leadH: "👑 隊長／最強的守軍", lead: [["ok", "戰報屬性 = (1 + 兵種 % + 部隊 %) × (1 + 城鎮增益 + 集結／守城專屬) ÷ (1 + 敵方減益) − 1。"], ["ok", "加入者開城鎮增益沒用。"], ["ok", "集結類專屬裝備只在自己發起集結時有用；守城類只在駐防時有用。"]],
    capH: "🏰 打下來之後", cap: [["ok", "集結活下來的兵變成守軍。"], ["ok", "之後看守軍裡最強的人。"], ["mid", "多團打同一個目標：可犧牲的團先上，最強的隊長最後。"]],
    trH: "⚔️ 兵種", tr: [["ok", "步兵在前排吃傷害，騎兵很少被打到。"], ["ok", "弓兵可能先被奇襲打到。"], ["ok", "一大團比兩小團強。"]],
    unkH: "🟡 還不知道的", unks: ["「受到傷害 −」和「敵方攻擊力 −」是不是同一類。", "只有防禦力的技能（薩洛、希爾德）——我們沒有夠高等的英雄可以測。", "PvP 戰鬥的倍率是不是跟打野怪完全一樣。", "駐防最好的兵種比例。"],
    numH: "🔢 實測數字", numCols: ["出征", "英雄（騎兵位／弓兵位）", "擊殺", "比沒有技能"],
    num: [["獅子 25 · 步兵 40,068", "沒有", "709", "1"], ["", "妍羽（殺傷力 15）", "836", "1.18"], ["", "琴科（殺傷力 20、受到傷害 −16）", "985", "1.39"], ["", "戈登＋妍羽", "1,184", "1.67"],
      ["獅子 25 · 弓兵 43,168", "沒有", "1,695", "1"], ["", "霍華德（受到傷害 −16、敵方攻擊力 −16）", "2,231", "1.32"],
      ["熊 30 · 步兵 70,000", "沒有", "1,545", "1"], ["", "戈登＋妍羽（Lv5）", "3,030", "1.96"], ["", "戈登＋雨音（Lv5）", "2,922", "1.89"]],
    numFoot: "每一行 = 2–6 次故意打輸的單人出征平均，所以擊殺數代表打得多痛、撐得多久。運氣：步兵每次約 ±3%，弓兵約 ±10%。",
    more: "幹部：完整數字在 🐻 熊獵實測和戰報規則表",
    foot: "來源：Sparrow 兩個帳號實測（11/07）、我們的戰報（B1–B29、11/06 PvP）、維京戰報，以及跟這些對照過的外部攻略。從數字反推，不是官方說明。" },
  pt: { title: "⚔️ Rally e Guarnição", intro: "", obs: ["O rally usa os atributos do líder; a guarnição, os do defensor mais forte.", "Mesmo tipo de habilidade soma; tipos diferentes multiplicam."], obsH: "🔎 O que observamos", do: ["Só conta a habilidade do primeiro herói: leve um 4★ com a habilidade no Nv5.", "Caça ao Urso: 2 de Ataque (Amane, Margot) + 2 de Letalidade (Chenko, Yeonwoo).", "Rally PvP e guarnição: 4 tipos diferentes (ex.: Amane + Chenko + Gordon + Howard).", "Bônus da Cidade: o líder do rally, ou o defensor mais forte da guarnição.", "Depois de tomar uma construção: heróis de guarnição e Equipamento Exclusivo de guarnição."], howH: "🔢 Como calculamos", doH: "💡 Sugestões",
    badge: "🔬 Nossa pesquisa · atualizado {d}",
    st: { ok: "✅ certo", mid: "🟡 provável" },
    heroH: "Um rally luta com os atributos de UM jogador.", heroP: "Num rally, é o líder. Numa guarnição, é o defensor com os atributos mais fortes. Os outros só mandam tropas — e até 4 participantes também trazem uma habilidade de herói.",
    whoH: "👥 Quem conta", rally: "⚔️ Rally", gar: "🛡️ Guarnição",
    whoR: [["ok", "Os atributos do líder do rally, 3 heróis, Bônus da Cidade e Equipamento Exclusivo de rally."], ["ok", "Participantes: só as tropas (lutam com os atributos do líder) + 1 habilidade de herói."]],
    whoG: [["ok", "O defensor com os atributos MAIS FORTES: os atributos dele e os 3 heróis dele. Nem sempre é o líder da guarnição — o líder só define quantas tropas cabem."], ["ok", "Equipamento Exclusivo de guarnição funciona aqui; o de rally não."], ["ok", "Participantes: tropas + 1 habilidade de herói, igual ao rally."]],
    whoNote: "Visto nas batalhas contra os vikings: os heróis na página de habilidades eram sempre os do defensor mais forte — em algumas cidades o dono, em outras outra pessoa.",
    slotH: "🦸 As 4 habilidades dos participantes", slot: [["ok", "Só conta a habilidade do canto superior direito do primeiro herói."], ["ok", "Nível de habilidade maior primeiro; mesmo nível → ordem de entrada."], ["ok", "1★ Nv2 · 2★ Nv3 · 3★ Nv4 · 4★ Nv5"]],
    stackH: "✖️ Mesmo tipo soma, tipos diferentes multiplicam", stackP: "As habilidades de herói NÃO estão no % de atributos do relatório de batalha. São uma camada separada por cima. Testado com nossas próprias marchas (mesmas tropas, só os heróis mudaram):",
    bars: [["none", "Sem habilidades de batalha", 1, 1], ["mix", "Ataque 25 + Vida 25 + Letalidade 25", 1.961, 1.953], ["same", "Ataque 25 + Ataque 25 + Vida 25", 1.891, 1.875]],
    barMeas: "medido", barTh: "calculado",
    stackFoot: "Ataque + Ataque = 1 + 0.25 + 0.25 = ×1.5 (soma). Ataque × Letalidade = 1.25 × 1.25 = ×1.5625 (multiplica). Medido 1.891 vs 1.875 somando — então dois do mesmo tipo somam.",
    defH: "🛡️ Habilidades de defesa valem tanto quanto ataque", def: [["ok", "Vida, Dano recebido − e Ataque inimigo − funcionam cada um como cerca de ×(1 + X)."], ["ok", "Ataque inimigo − funciona em monstros também."]],
    pickH: "🎯 Quais participantes", pickBear: "🐻 Caça ao Urso", pickPvp: "⚔️🛡️ Rally e guarnição PvP",
    pickBearP: "O Urso não revida, então só Ataque e Letalidade contam. 2 + 2 é melhor que 4 do mesmo tipo.",
    pickPvpP: "Ataque, Letalidade, Vida e Dano recebido − contam mais ou menos igual — então divida as 4 vagas em 4 tipos diferentes. Saul dá Defesa + Vida numa vaga só.",
    calcH: "🧮 Teste 4 participantes", calcMode: "Batalha", modeBear: "Caça ao Urso", modePvp: "PvP", calcRes: "×{x}", calcNote: "Habilidades no Lv5. Só relativo — o que as 4 habilidades somam em cima do líder. Dano recebido / reduções do inimigo contados como ×(1 + X).",
    types: { atk: "Ataque", let: "Letalidade", hp: "Vida", def: "Defesa", tk: "Dano recebido −", ea: "Diminuição do Ataque das Tropas Inimigas", ed: "Diminuição do Dano Inimigo", nil: "sem habilidade de batalha" },
    heroes: { amane: "Amane", margot: "Margot", chenko: "Chenko", yeonwoo: "Yeonwoo", amadeus: "Amadeus", gordon: "Gordon", saul: "Saul", hilde: "Hilde", howard: "Howard", quinn: "Quinn", fahd: "Fahd", eric: "Eric", diana: "Diana" },
    ex: [["4 × Chenko", "×2.00"], ["2 Chenko + 2 Amane", "×2.25"], ["Saul + Gordon + Howard + Fahd (só defesa)", "PvP ×2.2"], ["Amane + Chenko + Gordon + Howard", "PvP ×2.34"]],
    exH: "Exemplos (Lv5)",
    leadH: "👑 O líder / o defensor mais forte", lead: [["ok", "Atributos do relatório = (1 + % da tropa + % do esquadrão) × (1 + Bônus da Cidade + Equipamento Exclusivo de rally/guarnição) ÷ (1 + redução do inimigo) − 1."], ["ok", "Participantes ligarem o Bônus da Cidade não faz nada."], ["ok", "Equipamento Exclusivo de rally só funciona quando você abre o rally; o de guarnição, só na guarnição."]],
    capH: "🏰 Depois de capturar", cap: [["ok", "Os sobreviventes do rally viram a guarnição."], ["ok", "Depois, o defensor mais forte entre eles define os atributos."], ["mid", "Vários rallies no mesmo alvo: os que podem ser perdidos primeiro, o líder mais forte por último."]],
    trH: "⚔️ Tropas", tr: [["ok", "A Infantaria fica na frente e recebe os golpes; a Cavalaria raramente é atingida."], ["ok", "A Arquearia pode ser atingida cedo por uma emboscada."], ["ok", "Um rally grande vence dois pequenos."]],
    unkH: "🟡 Ainda não sabemos", unks: ["Se \"Dano recebido −\" e \"Ataque inimigo −\" somam como um tipo só.", "Habilidades só de defesa (Saul, Hilde) — não tínhamos herói alto o bastante para testar.", "Se batalhas PvP dão exatamente os mesmos multiplicadores que monstros.", "A melhor proporção de tropas para uma guarnição."],
    numH: "🔢 Os testes", numCols: ["Marcha", "Heróis (vaga de cavalaria / arquearia)", "Abates", "× vs nenhum"],
    num: [["Leão 25 · 40,068 infantaria", "nenhum", "709", "1"], ["", "Yeonwoo (Letalidade 15)", "836", "1.18"], ["", "Chenko (Letalidade 20, Dano recebido −16)", "985", "1.39"], ["", "Gordon + Yeonwoo", "1,184", "1.67"],
      ["Leão 25 · 43,168 arquearia", "nenhum", "1,695", "1"], ["", "Howard (Dano recebido −16, Ataque inimigo −16)", "2,231", "1.32"],
      ["Urso 30 · 70,000 infantaria", "nenhum", "1,545", "1"], ["", "Gordon + Yeonwoo (Lv5)", "3,030", "1.96"], ["", "Gordon + Amane (Lv5)", "2,922", "1.89"]],
    numFoot: "Cada linha = média de 2–6 marchas solo que perderam de propósito, então os abates mostram o quanto e por quanto tempo lutaram. Sorte: cerca de ±3% por marcha com infantaria, ±10% com arquearia.",
    more: "Oficiais: números completos em 🐻 Análise do Urso e nas regras de batalha",
    foot: "Fonte: testes nas duas contas da Sparrow (11/07), nossos relatórios de batalha (B1–B29, PvP 11/06), relatórios dos vikings e guias externos conferidos com eles. Calculado a partir dos números, não tirado do jogo." },
  ar: { title: "⚔️ الحشد والحامية", intro: "", obs: ["الحشد يستخدم إحصاءات القائد؛ والحامية إحصاءات أقوى مدافع.", "النوع نفسه من المهارات يُجمع؛ والأنواع المختلفة تتضاعف."], obsH: "🔎 ما لاحظناه", do: ["تُحتسب مهارة بطلك الأول فقط: اجلب بطلًا 4★ ومهارته في Lv5.", "صيد الدببة: 2 هجوم (أماني، مارغوت) + 2 قوة فتك (تشينكو، يونوو).", "حشد PvP والحامية: 4 أنواع مختلفة (مثال: أماني + تشينكو + جوردن + هاورد).", "مكافأة المدينة: قائد الحشد، أو أقوى مدافع في الحامية.", "بعد الاستيلاء على مبنى: أبطال الحامية والعتاد الحصري الخاص بالحامية."], howH: "🔢 كيف حسبناها", doH: "💡 اقتراحات",
    badge: "🔬 بحثنا · آخر تحديث {d}",
    st: { ok: "✅ مؤكد", mid: "🟡 مرجّح" },
    heroH: "الحشد يقاتل بإحصاءات لاعب واحد فقط.", heroP: "في الحشد هو القائد. في الحامية هو المدافع صاحب أقوى إحصاءات. الباقون يرسلون القوات فقط — وحتى 4 منضمّين يجلب كل منهم أيضًا مهارة بطل واحدة.",
    whoH: "👥 من يُحتسب", rally: "⚔️ الحشد", gar: "🛡️ الحامية",
    whoR: [["ok", "إحصاءات قائد الحشد، و3 أبطال، ومكافأة المدينة، والعتاد الحصري الخاص بالحشد."], ["ok", "المنضمّون: قواتهم فقط (تقاتل بإحصاءات القائد) + مهارة بطل واحدة."]],
    whoG: [["ok", "المدافع صاحب الإحصاءات الأقوى: إحصاءاته وأبطاله الثلاثة. ليس دائمًا قائد الحامية — القائد يحدد فقط كم من القوات تتسع."], ["ok", "العتاد الحصري الخاص بالحامية يعمل هنا؛ الخاص بالحشد لا يعمل."], ["ok", "المنضمّون: قوات + مهارة بطل واحدة، مثل الحشد."]],
    whoNote: "شوهد في معارك الفايكنغ: الأبطال في صفحة المهارات كانوا دائمًا أبطال أقوى مدافع — في بعض المدن صاحب المدينة، وفي غيرها شخص آخر.",
    slotH: "🦸 مهارات المنضمّين الأربع", slot: [["ok", "تُحتسب فقط مهارة بطلك الأول في أعلى اليمين."], ["ok", "المهارة الأعلى مستوى أولًا؛ عند التساوي → ترتيب الانضمام."], ["ok", "1★ Lv2 · 2★ Lv3 · 3★ Lv4 · 4★ Lv5"]],
    stackH: "✖️ النوع نفسه يُجمع، والأنواع المختلفة تتضاعف", stackP: "مهارات الأبطال ليست ضمن نسب الإحصاءات في تقرير المعركة. هي طبقة منفصلة فوقها. اختبرناها بزحوفنا (نفس القوات، تغيّر الأبطال فقط):",
    bars: [["none", "بلا مهارات قتال", 1, 1], ["mix", "هجوم 25 + صحة 25 + قوة فتك 25", 1.961, 1.953], ["same", "هجوم 25 + هجوم 25 + صحة 25", 1.891, 1.875]],
    barMeas: "مقاس", barTh: "محسوب",
    stackFoot: "هجوم + هجوم = 1 + 0.25 + 0.25 = ×1.5 (جمع). هجوم × قوة فتك = 1.25 × 1.25 = ×1.5625 (ضرب). المقاس 1.891 مقابل 1.875 بالجمع — إذن نوعان متماثلان يُجمعان.",
    defH: "🛡️ مهارات الدفاع مهمة مثل الهجوم", def: [["ok", "الصحة، والضرر المتجنب، وخفض هجوم العدو كل منها يعمل تقريبًا كـ ×(1 + X)."], ["ok", "خفض هجوم العدو يعمل على الوحوش أيضًا."]],
    pickH: "🎯 أي منضمّين", pickBear: "🐻 صيد الدببة", pickPvp: "⚔️🛡️ حشد وحامية PvP",
    pickBearP: "الدب لا يرد الضربات، لذلك الهجوم وقوة الفتك فقط يُحتسبان. 2 + 2 أفضل من 4 من نوع واحد.",
    pickPvpP: "الهجوم وقوة الفتك والصحة والضرر الواقع − كلها متقاربة في القيمة — لذلك وزّع الخانات الأربع على 4 أنواع مختلفة. شاول يعطي دفاع + صحة في خانة واحدة.",
    calcH: "🧮 جرّب 4 منضمّين", calcMode: "المعركة", modeBear: "صيد الدببة", modePvp: "PvP", calcRes: "×{x}", calcNote: "المهارات في Lv5. قيمة نسبية فقط — ما تضيفه المهارات الأربع فوق القائد. الضرر الواقع / إضعافات العدو محسوبة كـ ×(1 + X).",
    types: { atk: "هجوم", let: "قوة فتك", hp: "صحة", def: "دفاع", tk: "الضرر المتجنب", ea: "خفض هجوم قوات العدو", ed: "خفض ضرر العدو", nil: "بلا مهارة قتال" },
    heroes: { amane: "أماني", margot: "مارغوت", chenko: "تشينكو", yeonwoo: "يونوو", amadeus: "أماديوس", gordon: "جوردن", saul: "شاول", hilde: "هيلدي", howard: "هاورد", quinn: "كوين", fahd: "فهد", eric: "إيريك", diana: "ديانا" },
    ex: [["4 × تشينكو", "×2.00"], ["2 تشينكو + 2 أماني", "×2.25"], ["شاول + جوردن + هاورد + فهد (دفاع فقط)", "PvP ×2.2"], ["أماني + تشينكو + جوردن + هاورد", "PvP ×2.34"]],
    exH: "أمثلة (Lv5)",
    leadH: "👑 القائد / أقوى مدافع", lead: [["ok", "إحصاءات التقرير = (1 + % القوات + % الفرقة) × (1 + مكافأة المدينة + العتاد الحصري للحشد/الحامية) ÷ (1 + إضعاف العدو) − 1."], ["ok", "تفعيل المنضمّين لمكافأة المدينة لا يفيد."], ["ok", "العتاد الحصري الخاص بالحشد يعمل فقط عندما تطلق أنت الحشد؛ والخاص بالحامية فقط في الحامية."]],
    capH: "🏰 بعد الاستيلاء", cap: [["ok", "الناجون من الحشد يصبحون الحامية."], ["ok", "ثم أقوى مدافع بينهم يحدد الإحصاءات."], ["mid", "عدة حشود على هدف واحد: الحشود التي يمكن خسارتها أولًا، وأقوى قائد أخيرًا."]],
    trH: "⚔️ القوات", tr: [["ok", "المشاة في المقدمة وتتلقى الضربات؛ الفرسان نادرًا ما يُضربون."], ["ok", "الرماة قد يُضربون مبكرًا بكمين."], ["ok", "حشد كبير واحد أفضل من اثنين صغيرين."]],
    unkH: "🟡 غير معروف بعد", unks: ["هل «الضرر الواقع −» و«هجوم العدو −» يُجمعان كنوع واحد.", "مهارات الدفاع وحدها (شاول، هيلدي) — لم يكن لدينا بطل بمستوى كافٍ لاختبارها.", "هل معارك PvP تعطي نفس المضاعفات تمامًا مثل الوحوش.", "أفضل نسبة قوات للحامية."],
    numH: "🔢 الاختبارات", numCols: ["الزحف", "الأبطال (خانة الفرسان / الرماة)", "القتلى", "× مقابل بلا"],
    num: [["الأسد 25 · 40,068 مشاة", "بلا", "709", "1"], ["", "يونوو (قوة فتك 15)", "836", "1.18"], ["", "تشينكو (قوة فتك 20، الضرر الواقع −16)", "985", "1.39"], ["", "جوردن + يونوو", "1,184", "1.67"],
      ["الأسد 25 · 43,168 رماة", "بلا", "1,695", "1"], ["", "هاورد (الضرر الواقع −16، هجوم العدو −16)", "2,231", "1.32"],
      ["الدب 30 · 70,000 مشاة", "بلا", "1,545", "1"], ["", "جوردن + يونوو (Lv5)", "3,030", "1.96"], ["", "جوردن + أماني (Lv5)", "2,922", "1.89"]],
    numFoot: "كل سطر = متوسط 2–6 زحوف فردية خسرت عمدًا، لذلك القتلى تُظهر مدى قوة وطول قتالها. الحظ: حوالي ±3% لكل زحف مع المشاة، و±10% مع الرماة.",
    more: "للضباط: الأرقام الكاملة في 🐻 تحليل الدب وقواعد المعارك",
    foot: "المصدر: اختبارات على حسابَي Sparrow (11/07)، وتقارير معاركنا (B1–B29، PvP 11/06)، وتقارير الفايكنغ، وأدلة خارجية تمت مقارنتها بها. مستنتج من الأرقام، وليس من اللعبة." },
  ko: { title: "⚔️ 집결과 방어", intro: "", obs: ["집결은 대장 능력치, 방어는 가장 강한 수비자의 능력치를 써.", "같은 종류 스킬은 더하고, 다른 종류는 곱해."], obsH: "🔎 우리가 관찰한 것", do: ["첫 번째 영웅 스킬만 계산돼: 4★, 스킬 Lv5 영웅을 데려가.", "곰 사냥: 공격력 2 (아마네, 마르고) + 파괴력 2 (첸코, 연우).", "PvP 집결과 방어: 서로 다른 4종류 (예: 아마네 + 첸코 + 고든 + 하워드).", "도시 버프: 집결 대장, 또는 방어에서 가장 강한 사람.", "건물 점령 후: 방어 영웅과 방어용 전용 장비."], howH: "🔢 어떻게 계산했는지", doH: "💡 제안",
    badge: "🔬 우리 연구 · 업데이트 {d}",
    st: { ok: "✅ 확실", mid: "🟡 추정" },
    heroH: "집결은 한 사람의 능력치로만 싸워.", heroP: "집결에서는 대장, 방어에서는 능력치가 가장 강한 방어자야. 나머지는 병력만 보내 — 그리고 최대 4명의 참여자가 영웅 스킬 1개씩도 가져와.",
    whoH: "👥 누가 적용되나", rally: "⚔️ 집결", gar: "🛡️ 방어",
    whoR: [["ok", "집결 대장의 능력치, 영웅 3명, 도시 버프, 집결형 전용 장비."], ["ok", "참여자: 병력만 (대장 능력치로 싸워) + 영웅 스킬 1개."]],
    whoG: [["ok", "능력치가 가장 강한 방어자: 그 사람의 능력치와 영웅 3명. 꼭 방어 대장은 아니야 — 대장은 병력이 몇 명 들어가는지만 정해."], ["ok", "방어형 전용 장비는 여기서 적용돼; 집결형은 안 돼."], ["ok", "참여자: 병력 + 영웅 스킬 1개, 집결과 똑같아."]],
    whoNote: "바이킹 전투에서 확인: 스킬 페이지의 영웅은 매번 가장 강한 방어자의 영웅이었어 — 어떤 도시는 도시 주인, 어떤 도시는 다른 사람.",
    slotH: "🦸 참여자 스킬 4개", slot: [["ok", "첫 번째 영웅의 오른쪽 위 스킬만 계산돼."], ["ok", "스킬 레벨 높은 순; 같으면 참여 순서."], ["ok", "1★ Lv2 · 2★ Lv3 · 3★ Lv4 · 4★ Lv5"]],
    stackH: "✖️ 같은 종류는 더하고, 다른 종류는 곱해", stackP: "영웅 스킬은 전투 보고서의 능력치 %에 없어. 그 위에 따로 곱해지는 층이야. 우리 부대로 테스트 (같은 병력, 영웅만 바꿈):",
    bars: [["none", "전투 스킬 없음", 1, 1], ["mix", "공격력 25 + HP 25 + 파괴력 25", 1.961, 1.953], ["same", "공격력 25 + 공격력 25 + HP 25", 1.891, 1.875]],
    barMeas: "측정", barTh: "계산",
    stackFoot: "공격력 + 공격력 = 1 + 0.25 + 0.25 = ×1.5 (더하기). 공격력 × 파괴력 = 1.25 × 1.25 = ×1.5625 (곱하기). 측정 1.891, 더하기 계산 1.875 — 그러니까 같은 종류 둘은 더해져.",
    defH: "🛡️ 방어 스킬도 공격만큼 중요해", def: [["ok", "HP, 받는 피해 감소, 적군 공격력 감소는 각각 약 ×(1 + X)로 작용해."], ["ok", "적군 공격력 감소는 몬스터에게도 통해."]],
    pickH: "🎯 어떤 참여자", pickBear: "🐻 자이언트 베어 사냥", pickPvp: "⚔️🛡️ PvP 집결과 방어",
    pickBearP: "곰은 반격을 안 하니까 공격력과 파괴력만 의미 있어. 2 + 2가 한 종류 4개보다 좋아.",
    pickPvpP: "공격력, 파괴력, HP, 받는 피해 −는 가치가 거의 같아 — 그러니까 4칸을 서로 다른 4종류로 나눠. 살로는 한 칸에 방어력 + HP를 줘.",
    calcH: "🧮 참여자 4명 해 보기", calcMode: "전투", modeBear: "자이언트 베어 사냥", modePvp: "PvP", calcRes: "×{x}", calcNote: "스킬은 Lv5 기준. 상대값일 뿐 — 스킬 4개가 대장 위에 더해 주는 만큼. 받는 피해 / 적 디버프는 ×(1 + X)로 계산.",
    types: { atk: "공격력", let: "파괴력", hp: "HP", def: "방어력", tk: "받는 피해 감소", ea: "적군 부대 공격력 감소", ed: "적군 피해 감소", nil: "전투 스킬 없음" },
    heroes: { amane: "아마네", margot: "마르고", chenko: "첸코", yeonwoo: "연우", amadeus: "아마데우스", gordon: "고든", saul: "살로", hilde: "힐데", howard: "하워드", quinn: "퀸", fahd: "파드", eric: "에릭", diana: "다이애나" },
    ex: [["4 × 첸코", "×2.00"], ["첸코 2 + 아마네 2", "×2.25"], ["살로 + 고든 + 하워드 + 파드 (전부 방어)", "PvP ×2.2"], ["아마네 + 첸코 + 고든 + 하워드", "PvP ×2.34"]],
    exH: "예시 (Lv5)",
    leadH: "👑 대장 / 가장 강한 방어자", lead: [["ok", "전투 보고서 능력치 = (1 + 병종 % + 부대 %) × (1 + 도시 버프 + 집결/방어형 전용 장비) ÷ (1 + 적 디버프) − 1."], ["ok", "참여자가 도시 버프를 켜도 소용없어."], ["ok", "집결용 전용 장비는 내가 집결을 열 때만, 방어용은 방어할 때만 효과가 있어."]],
    capH: "🏰 점령한 다음", cap: [["ok", "집결 생존 병력이 수비대가 돼."], ["ok", "그다음엔 그중 가장 강한 수비자가 능력치를 정해."], ["mid", "여러 집결이 한 목표를 칠 때: 버려도 되는 집결 먼저, 가장 강한 대장은 마지막."]],
    trH: "⚔️ 병종", tr: [["ok", "보병이 앞에서 맞고, 기병은 거의 안 맞아."], ["ok", "궁병은 기습으로 먼저 맞을 수 있어."], ["ok", "큰 집결 하나가 작은 집결 둘보다 강해."]],
    unkH: "🟡 아직 모르는 것", unks: ["\"받는 피해 −\"와 \"적군 공격력 −\"가 같은 종류로 더해지는지.", "방어만 있는 스킬 (살로, 힐데) — 테스트할 만큼 높은 영웅이 없었어.", "PvP 전투도 몬스터랑 배율이 완전히 같은지.", "방어에 가장 좋은 병종 비율."],
    numH: "🔢 테스트", numCols: ["행군", "영웅 (기병 / 궁병 자리)", "처치", "× 없음 대비"],
    num: [["사자 25 · 보병 40,068", "없음", "709", "1"], ["", "연우 (파괴력 15)", "836", "1.18"], ["", "첸코 (파괴력 20, 받는 피해 −16)", "985", "1.39"], ["", "고든 + 연우", "1,184", "1.67"],
      ["사자 25 · 궁병 43,168", "없음", "1,695", "1"], ["", "하워드 (받는 피해 −16, 적군 공격력 −16)", "2,231", "1.32"],
      ["곰 30 · 보병 70,000", "없음", "1,545", "1"], ["", "고든 + 연우 (Lv5)", "3,030", "1.96"], ["", "고든 + 아마네 (Lv5)", "2,922", "1.89"]],
    numFoot: "각 줄 = 일부러 진 단독 행군 2–6번의 평균. 그래서 처치 수가 얼마나 세게, 얼마나 오래 싸웠는지 보여줘. 운: 보병은 행군마다 약 ±3%, 궁병은 ±10%.",
    more: "간부: 전체 숫자는 🐻 곰 분석과 전투 규칙에 있어",
    foot: "출처: Sparrow 계정 두 개 테스트 (11/07), 우리 전투 보고서 (B1–B29, 11/06 PvP), 바이킹 보고서, 그리고 이걸로 확인한 외부 공략. 게임 설명이 아니라 숫자에서 거꾸로 계산한 거야." },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const S = { mode: "pvp", picks: PRESET.pvp.slice() };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-rg") || "{}")); } catch (e) {}
if (!Array.isArray(S.picks) || S.picks.length !== 4) S.picks = PRESET[S.mode === "bear" ? "bear" : "pvp"].slice();
const keep = () => { try { localStorage.setItem("nxs-rg", JSON.stringify(S)); } catch (e) {} };
const HM = Object.fromEntries(HEROES);

function mult(picks, mode) {   // same type adds, different types multiply
  const sum = {};
  for (const h of picks) for (const [k, v] of Object.entries(HM[h] || {})) sum[k] = (sum[k] || 0) + v;
  let x = 1;
  for (const [k, v] of Object.entries(sum)) { if (mode === "bear" && !OFF.includes(k)) continue; x *= 1 + v / 100; }
  return { x, sum };
}
const st = (c) => c === "mid" ? `<span class="rg-st ${c}">${esc(t("st")[c])}</span>` : "";
const pts = (arr) => `<ul class="rg-ul">${arr.map(([c, x]) => `<li>${st(c)} ${esc(x)}</li>`).join("")}</ul>`;
const chip = (k) => `<span class="rg-chip ${k}">${esc(t("types")[k])}</span>`;
const heroChips = (h) => { const s = Object.keys(HM[h] || {}); return s.length ? s.map(chip).join("") : chip("nil"); };

function calcHtml() {
  const { x, sum } = mult(S.picks, S.mode);
  const used = Object.keys(sum).filter((k) => S.mode !== "bear" || OFF.includes(k));
  return `<div class="rg-in"><label>${esc(t("calcMode"))}<select class="inp" id="rg_mode">${["pvp", "bear"].map((m) => `<option value="${m}"${m === S.mode ? " selected" : ""}>${esc(t(m === "bear" ? "modeBear" : "modePvp"))}</option>`).join("")}</select></label></div>
    <div class="rg-slots">${S.picks.map((h, i) => `<label class="rg-slot"><span class="muted">#${i + 1}</span><select class="inp" data-rgslot="${i}">${HEROES.map(([k]) => `<option value="${k}"${k === h ? " selected" : ""}>${esc(t("heroes")[k])}</option>`).join("")}</select><span class="rg-chips">${heroChips(h)}</span></label>`).join("")}</div>
    <div class="rg-res">${esc(t("calcRes").replace("{x}", x.toFixed(2)))}</div>
    <div class="rg-sum">${used.map((k) => `<span class="rg-chip ${k}">${esc(t("types")[k])} +${sum[k]}%</span>`).join("")}</div>`;
}
function render() {
  const root = $("rg_root"); if (!root) return;
  const max = 2.1;
  root.innerHTML = `
  <div class="muted rg-small" style="margin:2px 0 10px">${esc(t("badge").replace("{d}", UPDATED))}</div>
  <div class="card rs-do"><h3>${esc(t("obsH"))}</h3><ul class="rs-dol">${t("obs").map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h3 class="rs-h2">${esc(t("doH"))}</h3><ul class="rs-dol">${t("do").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("pickH"))}</h3>
    <div class="rg-two">
      <div class="rg-side b"><b>${esc(t("pickBear"))}</b><div class="rg-pick">${PRESET.bear.map((h) => `<span class="rg-ph">${esc(t("heroes")[h])}${heroChips(h)}</span>`).join("")}</div></div>
      <div class="rg-side g"><b>${esc(t("pickPvp"))}</b><div class="rg-pick">${PRESET.pvp.map((h) => `<span class="rg-ph">${esc(t("heroes")[h])}${heroChips(h)}</span>`).join("")}</div></div>
    </div>
    <h4 class="rg-h4">${esc(t("exH"))}</h4><table class="rg-t"><tbody>${t("ex").map(([a, b]) => `<tr><td>${esc(a)}</td><td class="n">${esc(b)}</td></tr>`).join("")}</tbody></table></div>
  <div class="card"><h3>${esc(t("slotH"))}</h3>
    <div class="rg-four">${[0, 1, 2, 3].map((i) => `<div class="rg-box"><span class="rg-n">${i + 1}</span><span class="rg-hero1">🦸</span><span class="rg-dim">🦸 🦸</span></div>`).join("")}</div>
    ${pts(t("slot"))}</div>
  <div class="card"><h3>${esc(t("calcH"))}</h3><div id="rg_calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("defH"))}</h3>${pts(t("def"))}</div>
  <div class="card"><h3>${esc(t("leadH"))}</h3>${pts(t("lead").slice(1, 3))}</div>
  ${OFFICER.vidCard("rg", lang)}
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="rg-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card rg-num"><summary><b>${esc(t("howH"))}</b></summary><h4 class="rg-h4">${esc(t("stackH"))}</h4><p class="rg-p">${esc(t("stackP"))}</p>
    <div class="rg-bars">${t("bars").map(([k, label, m, th]) => `<div class="rg-bar ${k}"><div class="rg-bl">${esc(label)}</div>
      <div class="rg-bt"><i style="width:${(m / max * 100).toFixed(1)}%"></i><s style="left:${(th / max * 100).toFixed(1)}%"></s></div>
      <div class="rg-bv"><b>×${m.toFixed(2)}</b> <span>${esc(t("barMeas"))} · ${esc(t("barTh"))} ×${th.toFixed(2)}</span></div></div>`).join("")}</div>
    <p class="muted rg-small" style="margin-top:8px">${st("ok")} ${esc(t("stackFoot"))}</p>
    <p class="rg-p" style="margin-top:10px">${esc(t("lead")[0][1])}</p>
    <h4 class="rg-h4">${esc(t("numH"))}</h4><div style="overflow-x:auto"><table class="rg-t"><thead><tr>${t("numCols").map((c, i) => `<th${i > 1 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${t("num").map((r) => `<tr${r[0] ? ' class="grp"' : ""}>${r.map((c, i) => `<td${i > 1 ? ' class="n"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <p class="muted rg-small">${esc(t("numFoot"))}</p>
    <div class="muted rg-small">${esc(t("foot"))}</div></details>
  `;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("rg_calc"); if (!c) return; c.innerHTML = calcHtml(); bind(); };
  const m = $("rg_mode"); if (m) m.onchange = () => { S.mode = m.value; S.picks = PRESET[S.mode].slice(); redo(); };
  document.querySelectorAll("[data-rgslot]").forEach((el) => { el.onchange = () => { S.picks[+el.dataset.rgslot] = el.value; redo(); }; });
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("rg_title")) { $("rg_title").textContent = t("title"); $("rg_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.rg = { init, applyTexts, setLang };
})();
