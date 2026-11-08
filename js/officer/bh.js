/* NXS officer page — 🐻 Bear Hunt report (registers OFFICER_PAGES.bh; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: how Bear Hunt scores work, for MEMBERS — no leader names, no K values, nobody ranked (those stay in 🐻 Bear plan).
   Our own research from rally mails, bonus pages and leaderboards (Project docs claude/bear-report-spec.md, claude/kingshot-battle-rules.md
   rules 16–23, claude/kingshot-bear-2026-10-27/29/31, -11-02). Not official. Names follow data/content.js GLOSSARY / data/terms.js.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-07", HUNTS = 8, SPAN = "10/25–11/06";
/* 2026-11-07: the analysis chat keeps ONE ledger now; 11/07 Sherry: correct old ideas in place — no "corrected earlier" list (Project docs claude/bear-findings.md + bear-mails.csv, bear-totals.csv,
   bear-rosters.csv — handoff claude/research-ledger-handoff.md). This page follows that ledger: every point carries its status
   (✅ sure / 🟡 likely), corrected points sit in the folded "corrected" list. Members' page: principles only (ledger A + C). */
const WT = { inf: 0.12, cav: 0.63, arc: 1 }, EXP = 0.58;   // ledger A3 / A4 (11/07 fit: 8 rallies, 107 marches)
const MIX = { inf: 1, cav: 25, arc: 74 };                   // ledger A5
const P = { T9: 50, T10: 66, TG1: 71, TG2: 76, TG3: 83 };
const VAL = [2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30];   // Valora talent, your own score + %, Lv1–11
const TREND = [["10/31", 18, 11.30], ["11/02", 20, 11.98], ["11/04", 23, 16.86], ["11/06", 23, 19.10]];   // ledger D: alliance total (B), Bear Trap 2
const TREND1 = [["10/31", 31, 24.47], ["11/06", 31, 29.72]];   // ledger D2: Bear Trap 1
const T = {
  en: { title: "🐻 Bear Hunt report", intro: "Our research on how Bear Hunt scores work: what you bring and which rally you join. Not official — one running ledger that grows with every hunt.",
    badge: "🔬 Research ledger · data: Bear Trap 1 ×2, Bear Trap 2 ×4 hunts (Trap 1 mails: only 5 from one rally) · updated {d}",
    st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "The Bear never runs out of HP.", heroP: "So your score is about how hard the whole rally hits — and that is almost all about the rally leader. What you control: bring the right troops, join the right rally.",
    wH: "🏹 Archers count most", wP: "How much each troop type adds, same tier:",
    inf: "Infantry", cav: "Cavalry", arc: "Archers",
    sqH: "📉 More of one type = less per troop", sqP: "Each troop type is counted on its own, and it grows slower than the troop count (about n^0.58, close to a square root). 4× the archers gives about 2.2× the archer score. That's why the join cap is 100k: extra troops do more in someone else's march.",
    mixH: "🎯 Your best mix", mixP: "For your own march (it moves a little with troop tier):", mixFoot: "Tested (10/29): 10 : 10 : 80 vs 2 : 24 : 74 in the same rallies — only +2% each time, so the mix is a small thing; troop tier matters more:",
    calcH: "🧮 Try your mix", calcN: "{t} count", calcRes: "{p}% of the best mix for {n} troops",
    calcNote: "Relative only — not your real score. Same rally, same leader.",
    joinH: "🚩 Which rally you join matters most", joinP: "The same archer march scored 45–58M in strong rallies, about 40M in a middle one and 10–20M in weak ones (11/06) — about 3×.",
    weak: "Weak leader", strong: "Strong leader",
    sendH: "🚀 Sending troops", send: [["ok", "Strong rallies fill in 20 seconds to 2 minutes — be quick. Rallies opened later fill up in the last minute with troops coming back (Bear Trap 1, last wave: 15–20 rallies at once, late ones went from 20–40% to full in the last minute)."], ["ok", "Opening more rallies doesn't waste troops: they use the troops that came back."], ["ok", "Archer marches into strong rallies; infantry / cavalry marches into the later rallies."], ["mid", "Your own score depends mostly on which rallies your marches joined, not on how strong your own rally is — send your archer marches to the strongest rallies first, then spread infantry / cavalry marches over the others."]],
    kH: "👑 What makes a leader strong", kP: "Only the leader's side counts. Joiners' own stats and gear don't change the rally.",
    k: [["ok", "🏹", "The leader's archer Attack × Lethality from the rally bonus page (it already includes the leader's hero troop bonus — changing heroes changes it)."],
      ["ok", "🏙️", "City Bonus — only the leader's counts. It adds into the SAME slot as the leader's rally Exclusive Gear bonus (e.g. Attack 20% + 30% → ×1.5), it doesn't multiply on its own."],
      ["mid", "🦸", "Joiner skills: 4 slots from joiners who bring a hero in the first slot — that hero's top-right skill. Who gets the 4 slots: likely the higher skill level first, and only at the same level the order on the list (a Lv4 skill was skipped when 7 people had Lv5) — still being checked. They never show on the rally bonus page; they multiply on top during the battle."],
      ["ok", "⚔️", "The leader's own hero skills."]],
    jsH: "Mix Attack and Lethality joiner skills", jsAtk: "Attack", jsLet: "Lethality", jsFoot: "Attack and Lethality are two separate slots that multiply, so a mix beats 4 of the same; 2 + 2 is about 6% over 1 + 3 (worked out) — too small to see in mails, because the same mix already swings 1.4–1.5× from wave to wave. Chenko's fist icon is Lethality.",
    luckH: "🎲 Luck", luck: ["Same troops = same damage: in one rally, two players who sent exactly the same troops get exactly the same damage. What changes from wave to wave is one number for the whole rally (see the next line).", "The same rally can swing a lot from wave to wave — 10–25% usually, up to 1.36× (Bear Trap 1, 11/06) — compare 3–4 waves before saying one leader is stronger.", "The swing has three layers (likely): the whole rally together ×0.82–1.22 (the leader's chance skills), archers on top ×0.86–1.37, and each TG3 group (same troop type and tier) on top ×0.73–1.33."],
    trendH: "📈 Our alliance total", trendP: "Final leaderboard, each Bear Trap:", trap2: "Bear Trap 2", trap1: "Bear Trap 1", trendN: "{n} players",
    valH: "🌟 Valora (Master)", valP: "Her talent Hunter Instinct adds only to YOUR OWN Bear Hunt Damage Points (its levels unlock with Master Affinity; table from the game):", valSkill: "Dance of the Hunt: when you launch the Bear Hunt rally, rally capacity +30,000 per level (Lv4 = +120,000) — useful if you lead. Savage Advantage: your own march capacity in Bear Hunt +3,000 per level.",
    unkH: "🟡 Not known yet", unks: ["Joiner skills: whether skill level really comes first (check the top-right skill level of the people who were skipped).", "4 Chenko vs 2 Chenko + 2 Amane — same leader, 3–4 rallies each (test planned).", "Whether \"enemy Defense −\" bonuses work on the Bear.", "Whether Vivian's \"enemy damage taken +25%\" is a separate multiplier."],
    oldH: "🔁 Corrected earlier ({n})", old: ["Square root → n^0.58: very close, a bit more for big marches.", "Weights cavalry 0.58 / infantry 0.14 → 0.63 / 0.12; best mix 2 : 21 : 77 → 1 : 25 : 74.", "❌ \"Infantry and cavalry are worth more per troop\" — that was the slowdown above: small marches score more per troop.", "⚠️ \"Joiner skills = the first 4 on the list\" — on 11/06 several rallies skipped people higher on the list → new idea: skill level first, then list order.", "❌ \"A rally that only sets off in the last minute hits about ¼\" — misremembered (those two mails' leaders weren't checked).", "❌ \"The fist icon = Attack\" — it is Chenko's Lethality.", "❌ \"City Bonus multiplies on its own\" — it adds into the same slot as the rally Exclusive Gear bonus.", "City Bonus Attack +10% / Lethality +20% ≈ ×1.32 → Attack +10% / Lethality +10% ≈ ×1.21."],
    numH: "🔢 For those who want the formula", num: "Your score ≈ K × c × Σ (w × n^0.58). K = the rally leader's strength (the whole rally shares it); c = your own troops: troop tier × (1 + Valora's Hunter Instinct) — two players with the same tier and Hunter Instinct level get exactly the same; w = troop weight (archer 1, cavalry 0.63, infantry 0.12); n = how many of that type you sent. Fitted on 107 marches in 8 rallies (11/06, troop counts from the rally troop page): about 8.5% error (20% without c).",
    more: "Officers: leader strength and where marches score most → 🐻 Bear analysis",
    foot: "Source: our alliance's rally mails (1,123 + 5 from Bear Trap 1), final leaderboards (6: Trap 2 ×4, Trap 1 ×2), rally troop pages (8 rallies) and bonus pages, 10/25–11/06. Worked back from the numbers, not from the game." },
  zh: { title: "🐻 狩獵巨熊研究", intro: "我們自己研究的狩獵巨熊分數：該帶什麼兵、該進哪一團。不是官方說明——同一本帳，每次熊獵後累積更新。",
    badge: "🔬 研究帳本 · 資料：陷阱 1 2 場、陷阱 2 4 場（陷阱 1 信件只有一團 5 封）· 更新 {d}",
    st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "熊的血永遠打不完。", heroP: "所以你的分數看的是整團打多痛——而整團打多痛，幾乎只看集結隊長。你能做的：帶對兵種、進對的團。",
    wH: "🏹 弓兵最重要", wP: "同樣兵等，每種兵的份量：",
    inf: "步兵", cav: "騎兵", arc: "弓兵",
    sqH: "📉 同一種兵帶越多，每隻越不值", sqP: "每個兵種分開算，而且分數長得比兵數慢（約 n 的 0.58 次方，接近開根號）。弓兵帶 4 倍，弓兵那部分只多約 2.2 倍。所以加入上限是 100k：多塞的兵放到別人的部隊裡比較有用。",
    mixH: "🎯 你的最佳兵種比例", mixP: "你自己那支部隊（會隨兵等小幅變動）：", mixFoot: "實測（10/29）：同一團 10：10：80 和 2：24：74 比，每次只多 2%——比例只是小事，兵等更重要：",
    calcH: "🧮 試試你的比例", calcN: "{t}數量", calcRes: "是 {n} 隻兵最佳比例的 {p}%",
    calcNote: "只是相對值，不是實際分數。同一團、同一個隊長。",
    joinH: "🚩 進哪一團最重要", joinP: "同一支弓兵部隊：強團 45–58M、中間的團約 40M、弱團 10–20M（11/06）——差約 3 倍。",
    weak: "弱隊長", strong: "強隊長",
    sendH: "🚀 派兵", send: [["ok", "強團 20 秒到 2 分鐘就滿，要搶。後開的團最後一分鐘會靠回流的兵補滿（陷阱 1 最後一波：同時 15–20 團，晚開的團最後一分鐘從 20–40% 補到滿）。"], ["ok", "多開團不浪費：用的是回流的兵。"], ["ok", "弓兵部隊進強團；步兵、騎兵部隊進後段的團。"], ["mid", "你自己的分數主要看部隊進了哪幾團，不是自己開的團強不強——弓兵部隊先進最強的團，步兵、騎兵部隊再分給其他團。"]],
    kH: "👑 隊長強在哪裡", kP: "只看隊長那邊。加入者自己的屬性、裝備都不會改變整團。",
    k: [["ok", "🏹", "集結加成頁上隊長的弓兵攻擊力 × 殺傷力（已經包含隊長英雄的兵種加成，換英雄就會變）。"],
      ["ok", "🏙️", "城鎮增益——只有隊長開的有用。它和隊長集結用的專屬裝備加成「加在同一格」（例：攻擊 20% + 30% → ×1.5），不是另外再乘。"],
      ["mid", "🦸", "加入者技能：4 格，給第一格有帶英雄的加入者——那位英雄的右上技能。誰拿到這 4 格：可能先比技能等級（高的優先），同等級才照名單順序（7 人都 Lv5 時，Lv4 的人被跳過）——還在確認。它不會出現在集結加成頁，是戰鬥中另外乘上去的。"],
      ["ok", "⚔️", "隊長自己的英雄技能。"]],
    jsH: "加入者技能：攻擊、殺傷混搭", jsAtk: "攻擊力", jsLet: "殺傷力", jsFoot: "攻擊力和殺傷力是分開的兩格、彼此相乘，所以混搭比 4 個同一種好；2 + 2 比 1 + 3 多約 6%（推算）——小到信件看不出來，因為同一組合每波就能差 1.4–1.5 倍。琴科的拳頭圖示是殺傷。",
    luckH: "🎲 運氣", luck: ["同樣的兵＝同樣的傷害：同一團裡帶一模一樣兵數的兩個人，傷害完全一樣。每一波的差別是整團乘同一個數。", "同一團每一波可以差很多——通常 10–25%，最多到 1.36 倍（陷阱 1，11/06）——要比 3–4 波才能說哪個隊長比較強。", "跳動分三層（推測）：整團一起 ×0.82–1.22（隊長的機率技能）、弓兵另外 ×0.86–1.37、每組 TG3（同兵種同兵等）另外 ×0.73–1.33。"],
    trendH: "📈 聯盟總傷害", trendP: "最終排行，兩個陷阱分開：", trap2: "陷阱 2", trap1: "陷阱 1", trendN: "{n} 人",
    valH: "🌟 維拉（大師）", valP: "她的天賦「狩獵本能」只加「你自己」的傷害積分（等級跟著大師好感度解鎖，數字來自遊戲內表格）：", valSkill: "狩獵之舞：開狩獵巨熊集結時，集結容量每級 +30,000（Lv4 = +120,000）——想當隊長的人有用。人數優勢：參加狩獵巨熊時，自己部隊的容量每級 +3,000。",
    unkH: "🟡 還不知道的", unks: ["加入者技能：是不是真的先比技能等級（要看被跳過的人第一格英雄的右上技能等級）。", "4 琴科 vs 2 琴科 + 2 雨音——同一隊長各 3–4 團（準備實測）。", "「敵方防禦 −」的增益對熊有沒有效。", "薇薇安「敵方受到傷害 +25%」是不是另一個乘區。"],
    oldH: "🔁 之前更正過的（{n}）", old: ["開根號 → n 的 0.58 次方：很接近，大部隊會多一點點。", "兵種權重 騎 0.58／步 0.14 → 0.63／0.12；最佳比例 2：21：77 → 1：25：74。", "❌「步兵、騎兵每隻比較值」——那是上面的遞減：小部隊每隻分數本來就比較高。", "⚠️「加入者技能 = 名單前 4 個」——11/06 好幾團跳過了排在前面的人 → 新想法：先比技能等級，再照名單順序。", "❌「最後一分鐘才出發的團只打到約 1/4」——記錯了（那兩封信的隊長沒確認）。", "❌「拳頭圖示 = 攻擊」——它是琴科的殺傷。", "❌「城鎮增益另外相乘」——它和集結專屬裝備加成加在同一格。", "城鎮增益 攻 +10%／殺 +20% ≈ ×1.32 → 攻 +10%／殺 +10% ≈ ×1.21。"],
    numH: "🔢 給想看公式的人", num: "你的分數 ≈ K × c × Σ（w × n 的 0.58 次方）。K = 集結隊長的強度（全團共用）；c = 你自己的部隊：兵等 ×（1 + 維拉「狩獵本能」）——兵等和狩獵本能等級一樣的兩個人，分數完全一樣；w = 兵種權重（弓兵 1、騎兵 0.63、步兵 0.12）；n = 你那個兵種帶的數量。用 11/06 8 團、107 支部隊（兵數取自集結兵種頁）擬合：誤差約 8.5%（不算 c 時 20%）。",
    more: "幹部：隊長強度、部隊放哪裡最好 → 🐻 熊獵實測",
    foot: "來源：我們聯盟的集結信件（1,123 筆 + 陷阱 1 5 封）、最終排行（6 份：陷阱 2 四場、陷阱 1 兩場）、集結兵種頁（8 團）、加成頁，10/25–11/06。從數字反推，不是遊戲官方說明。" },
  pt: { title: "🐻 Estudo da Caça ao Urso", intro: "Nossa pesquisa sobre como funcionam os pontos da Caça ao Urso: o que levar e em qual rally entrar. Não é oficial — um registro único que cresce a cada caçada.",
    badge: "🔬 Registro de pesquisa · dados: Armadilha 1 ×2, Armadilha 2 ×4 caçadas (e-mails da Armadilha 1: só 5, de um rally) · atualizado {d}",
    st: { ok: "✅ certo", mid: "🟡 provável" },
    heroH: "O Urso nunca fica sem HP.", heroP: "Então sua pontuação depende de quão forte o rally inteiro bate — e isso depende quase só do líder do rally. O que você controla: levar as tropas certas e entrar no rally certo.",
    wH: "🏹 Arquearia conta mais", wP: "Quanto cada tipo de tropa soma, no mesmo nível:",
    inf: "Infantaria", cav: "Cavalaria", arc: "Arquearia",
    sqH: "📉 Mais de um tipo = menos por tropa", sqP: "Cada tipo de tropa conta separado, e cresce mais devagar que o número de tropas (cerca de n^0.58, perto de uma raiz quadrada). 4× mais arqueiros dá cerca de 2.2× a pontuação de arqueiros. Por isso o limite para entrar é 100k: tropas extras rendem mais na marcha de outra pessoa.",
    mixH: "🎯 Sua melhor mistura", mixP: "Para a sua própria marcha (muda um pouco com o nível da tropa):", mixFoot: "Testado (10/29): 10 : 10 : 80 vs 2 : 24 : 74 nos mesmos rallies — só +2% cada vez, então a mistura importa pouco; o nível da tropa importa mais:",
    calcH: "🧮 Teste sua mistura", calcN: "Quantidade de {t}", calcRes: "{p}% da melhor mistura para {n} tropas",
    calcNote: "Só para comparar — não é sua pontuação real. Mesmo rally, mesmo líder.",
    joinH: "🚩 O rally em que você entra é o que mais importa", joinP: "A mesma marcha de arqueiros fez 45–58M em rallies fortes, cerca de 40M em um médio e 10–20M em rallies fracos (11/06) — cerca de 3×.",
    weak: "Líder fraco", strong: "Líder forte",
    sendH: "🚀 Enviando tropas", send: [["ok", "Rallies fortes enchem em 20 segundos a 2 minutos — seja rápido. Rallies abertos depois enchem no último minuto com as tropas que voltam (Armadilha 1, última onda: 15–20 rallies ao mesmo tempo; os atrasados foram de 20–40% a cheios no último minuto)."], ["ok", "Abrir mais rallies não desperdiça tropas: eles usam as tropas que voltaram."], ["ok", "Marchas de arqueiros nos rallies fortes; marchas de infantaria / cavalaria nos rallies abertos depois."], ["mid", "Sua pontuação depende mais dos rallies em que suas marchas entraram, não de quão forte é o seu próprio rally — mande suas marchas de arqueiros primeiro para os rallies mais fortes, depois espalhe as marchas de infantaria / cavalaria pelos outros."]],
    kH: "👑 O que faz um líder forte", kP: "Só o lado do líder conta. Atributos e equipamentos de quem entra não mudam o rally.",
    k: [["ok", "🏹", "Ataque × Letalidade da Arquearia do líder, na página de bônus do rally (já inclui o bônus de tropa dos heróis do líder — trocar heróis muda isso)."],
      ["ok", "🏙️", "Bônus da Cidade — só o do líder conta. Ele soma no MESMO espaço que o bônus de rally do Equipamento Exclusivo do líder (ex.: Ataque 20% + 30% → ×1.5); não multiplica sozinho."],
      ["mid", "🦸", "Habilidades de participante: 4 vagas, de participantes que levam um herói no primeiro espaço — a habilidade superior direita desse herói. Quem pega as 4 vagas: provavelmente o nível de habilidade mais alto primeiro, e só no mesmo nível a ordem da lista (uma habilidade Nv4 foi pulada quando 7 pessoas tinham Nv5) — ainda em teste. Elas nunca aparecem na página de bônus do rally; multiplicam por cima durante a batalha."],
      ["ok", "⚔️", "As habilidades dos heróis do próprio líder."]],
    jsH: "Misture habilidades de participante de Ataque e Letalidade", jsAtk: "Ataque", jsLet: "Letalidade", jsFoot: "Ataque e Letalidade são dois espaços separados que se multiplicam, então misturar é melhor que 4 iguais; 2 + 2 dá cerca de 6% a mais que 1 + 3 (calculado) — pequeno demais para ver nos e-mails, porque a mesma mistura já varia 1.4–1.5× de onda para onda. O ícone de punho do Chenko é Letalidade.",
    luckH: "🎲 Sorte", luck: ["Mesmas tropas = mesmo dano: num rally, dois jogadores que mandaram exatamente as mesmas tropas causam exatamente o mesmo dano. O que muda de onda para onda é um número para o rally inteiro (veja a próxima linha).", "O mesmo rally pode variar muito de onda para onda — normalmente 10–25%, até 1.36× (Armadilha 1, 11/06) — compare 3–4 ondas antes de dizer que um líder é mais forte.", "A variação tem três camadas (provável): o rally inteiro junto ×0.82–1.22 (habilidades de chance do líder), arqueiros por cima ×0.86–1.37, e cada grupo TG3 (mesmo tipo e nível de tropa) por cima ×0.73–1.33."],
    trendH: "📈 Total da nossa aliança", trendP: "Ranking final, de cada Armadilha:", trap2: "Armadilha 2", trap1: "Armadilha 1", trendN: "{n} jogadores",
    valH: "🌟 Valora (Mestre)", valP: "O talento dela, Instinto de Caçador, soma só aos SEUS PRÓPRIOS pontos de dano da Caça ao Urso (os níveis abrem com a Afinidade de Mestre; tabela do jogo):", valSkill: "Dança da Caçada: quando você abre o rally da Caça ao Urso, capacidade do rally +30,000 por nível (Nv4 = +120,000) — útil se você lidera. Vantagem Selvagem: capacidade da sua própria marcha na Caça ao Urso +3,000 por nível.",
    unkH: "🟡 Ainda não sabemos", unks: ["Habilidades de participante: se o nível da habilidade vem mesmo primeiro (veja o nível da habilidade superior direita de quem foi pulado).", "4 Chenko vs 2 Chenko + 2 Amane — mesmo líder, 3–4 rallies cada (teste planejado).", "Se bônus de \"Defesa inimiga −\" funcionam no Urso.", "Se o \"dano recebido pelo inimigo +25%\" da Vivian é um multiplicador separado."],
    oldH: "🔁 Corrigido antes ({n})", old: ["Raiz quadrada → n^0.58: muito perto, um pouco mais para marchas grandes.", "Pesos cavalaria 0.58 / infantaria 0.14 → 0.63 / 0.12; melhor mistura 2 : 21 : 77 → 1 : 25 : 74.", "❌ \"Infantaria e cavalaria valem mais por tropa\" — era a desaceleração acima: marchas pequenas pontuam mais por tropa.", "⚠️ \"Habilidades de participante = os 4 primeiros da lista\" — em 11/06 vários rallies pularam pessoas mais acima na lista → nova ideia: nível da habilidade primeiro, depois a ordem da lista.", "❌ \"Um rally que só sai no último minuto bate cerca de ¼\" — lembrado errado (os líderes desses dois e-mails não foram conferidos).", "❌ \"O ícone de punho = Ataque\" — é a Letalidade do Chenko.", "❌ \"O Bônus da Cidade multiplica sozinho\" — ele soma no mesmo espaço que o bônus de rally do Equipamento Exclusivo.", "Bônus da Cidade Ataque +10% / Letalidade +20% ≈ ×1.32 → Ataque +10% / Letalidade +10% ≈ ×1.21."],
    numH: "🔢 Para quem quer a fórmula", num: "Sua pontuação ≈ K × c × Σ (w × n^0.58). K = a força do líder do rally (o rally inteiro divide); c = suas próprias tropas: nível da tropa × (1 + Instinto de Caçador da Valora) — dois jogadores com o mesmo nível de tropa e de Instinto de Caçador ganham exatamente o mesmo; w = peso da tropa (arquearia 1, cavalaria 0.63, infantaria 0.12); n = quantas tropas daquele tipo você mandou. Ajustado em 107 marchas em 8 rallies (11/06, número de tropas da página de tropas do rally): cerca de 8.5% de erro (20% sem c).",
    more: "Oficiais: força dos líderes e onde as marchas pontuam mais → 🐻 Análise do Urso",
    foot: "Fonte: e-mails de rally da nossa aliança (1,123 + 5 da Armadilha 1), rankings finais (6: Armadilha 2 ×4, Armadilha 1 ×2), páginas de tropas do rally (8 rallies) e páginas de bônus, 10/25–11/06. Calculado a partir dos números, não vem do jogo." },
  ar: { title: "🐻 دراسة صيد الدببة", intro: "بحثنا عن طريقة حساب نقاط صيد الدببة: ماذا ترسل وإلى أي حشد تنضم. ليس رسميًا — سجل واحد يكبر مع كل صيد.",
    badge: "🔬 سجل البحث · البيانات: فخ 1 ×2، فخ 2 ×4 مرات صيد (رسائل فخ 1: 5 فقط من حشد واحد) · آخر تحديث {d}",
    st: { ok: "✅ مؤكد", mid: "🟡 مرجّح" },
    heroH: "صحة الدب لا تنتهي أبدًا.", heroP: "لذلك نقاطك تعتمد على قوة ضربة الحشد كله — وهذا يعتمد تقريبًا على قائد الحشد وحده. ما تتحكم فيه أنت: أرسل القوات الصحيحة، وانضم إلى الحشد الصحيح.",
    wH: "🏹 الرماة هم الأهم", wP: "كم يضيف كل نوع من القوات، بنفس المستوى:",
    inf: "المشاة", cav: "الفرسان", arc: "الرماة",
    sqH: "📉 كلما زاد نوع واحد = قلّ نصيب كل جندي", sqP: "كل نوع من القوات يُحسب وحده، ويزيد أبطأ من عدد الجنود (تقريبًا n^0.58، قريب من الجذر التربيعي). 4× من الرماة تعطي تقريبًا 2.2× من نقاط الرماة. لهذا حد الانضمام 100k: القوات الزائدة تفيد أكثر في زحف شخص آخر.",
    mixH: "🎯 أفضل خليط لك", mixP: "لزحفك أنت (يتغير قليلًا حسب مستوى القوات):", mixFoot: "تجربة (10/29): 10 : 10 : 80 مقابل 2 : 24 : 74 في نفس الحشود — +2% فقط كل مرة، فالخليط أمر صغير؛ مستوى القوات أهم:",
    calcH: "🧮 جرّب خليطك", calcN: "عدد {t}", calcRes: "{p}% من أفضل خليط لـ {n} جندي",
    calcNote: "للمقارنة فقط — ليست نقاطك الحقيقية. نفس الحشد، نفس القائد.",
    joinH: "🚩 الحشد الذي تنضم إليه هو الأهم", joinP: "نفس زحف الرماة سجّل 45–58M في الحشود القوية، ونحو 40M في حشد متوسط، و10–20M في الحشود الضعيفة (11/06) — فرق نحو 3×.",
    weak: "قائد ضعيف", strong: "قائد قوي",
    sendH: "🚀 إرسال القوات", send: [["ok", "الحشود القوية تمتلئ خلال 20 ثانية إلى دقيقتين — كن سريعًا. الحشود التي تُفتح لاحقًا تمتلئ في الدقيقة الأخيرة بالقوات العائدة (فخ 1، الموجة الأخيرة: 15–20 حشدًا في وقت واحد؛ المتأخرة انتقلت من 20–40% إلى ممتلئة في الدقيقة الأخيرة)."], ["ok", "فتح حشود أكثر لا يضيّع القوات: فهي تستخدم القوات العائدة."], ["ok", "زحوف الرماة إلى الحشود القوية؛ زحوف المشاة / الفرسان إلى الحشود اللاحقة."], ["mid", "نقاطك تعتمد غالبًا على الحشود التي انضمت إليها زحوفك، لا على قوة حشدك أنت — أرسل زحوف الرماة أولًا إلى أقوى الحشود، ثم وزّع زحوف المشاة / الفرسان على الباقي."]],
    kH: "👑 ما الذي يجعل القائد قويًا", kP: "جانب القائد فقط هو المهم. خصائص المنضمين ومعداتهم لا تغيّر الحشد.",
    k: [["ok", "🏹", "هجوم × قوة فتك الرماة عند القائد في صفحة مكافآت الحشد (تشمل مكافأة القوات من أبطال القائد — تغيير الأبطال يغيّرها)."],
      ["ok", "🏙️", "مكافأة المدينة — تُحسب مكافأة القائد فقط. تُضاف في نفس الخانة مع مكافأة الحشد من العتاد الحصري للقائد (مثال: هجوم 20% + 30% → ×1.5)، ولا تتضاعف وحدها."],
      ["mid", "🦸", "مهارات المنضمين: 4 خانات من المنضمين الذين يضعون بطلًا في الخانة الأولى — المهارة العلوية اليمنى لذلك البطل. من يأخذ الخانات الأربع: على الأرجح مستوى المهارة الأعلى أولًا، وعند تساوي المستوى فقط ترتيب القائمة (تم تخطي مهارة Lv4 عندما كان لدى 7 أشخاص Lv5) — ما زال قيد الفحص. لا تظهر أبدًا في صفحة مكافآت الحشد؛ تتضاعف فوقها أثناء المعركة."],
      ["ok", "⚔️", "مهارات أبطال القائد نفسه."]],
    jsH: "اخلط مهارات المنضمين للهجوم وقوة الفتك", jsAtk: "هجوم", jsLet: "قوة فتك", jsFoot: "الهجوم وقوة الفتك خانتان منفصلتان تتضاعفان، لذا الخليط أفضل من 4 من نفس النوع؛ 2 + 2 أفضل بنحو 6% من 1 + 3 (بالحساب) — صغير جدًا لرؤيته في الرسائل، لأن نفس الخليط يتغير 1.4–1.5× من موجة لأخرى. أيقونة القبضة عند تشينكو هي قوة الفتك.",
    luckH: "🎲 الحظ", luck: ["نفس القوات = نفس الضرر: في حشد واحد، لاعبان أرسلا نفس القوات تمامًا يحصلان على نفس الضرر تمامًا. ما يتغير من موجة لأخرى هو رقم واحد للحشد كله (انظر السطر التالي).", "نفس الحشد قد يتغير كثيرًا من موجة لأخرى — عادة 10–25%، وحتى 1.36× (فخ 1، 11/06) — قارن 3–4 موجات قبل أن تقول إن قائدًا أقوى.", "للتغير ثلاث طبقات (مرجّح): الحشد كله معًا ×0.82–1.22 (مهارات الفرصة عند القائد)، والرماة فوق ذلك ×0.86–1.37، وكل مجموعة TG3 (نفس نوع القوات ومستواها) فوق ذلك ×0.73–1.33."],
    trendH: "📈 مجموع تحالفنا", trendP: "لوحة الصدارة النهائية، لكل فخ:", trap2: "فخ 2", trap1: "فخ 1", trendN: "{n} لاعب",
    valH: "🌟 فالورا (متخصص)", valP: "موهبتها «غريزة الصياد» تضيف فقط إلى نقاط الضرر الخاصة بك أنت في صيد الدببة (مستوياتها تُفتح مع تقارب المتخصص؛ الجدول من اللعبة):", valSkill: "رقصة الصيد: عندما تفتح حشد صيد الدببة، سعة الحشد +30,000 لكل مستوى (Lv4 = +120,000) — مفيدة إذا كنت القائد. الأفضلية الوحشية: سعة زحفك أنت في صيد الدببة +3,000 لكل مستوى.",
    unkH: "🟡 غير معروف بعد", unks: ["مهارات المنضمين: هل مستوى المهارة يأتي أولًا حقًا (تحقق من مستوى المهارة العلوية اليمنى لمن تم تخطيهم).", "4 تشينكو مقابل 2 تشينكو + 2 أماني — نفس القائد، 3–4 حشود لكل منهما (تجربة مخطط لها).", "هل مكافآت \"دفاع العدو −\" تعمل على الدب.", "هل \"الضرر الذي يتلقاه العدو +25%\" عند فيفيان مضاعِف منفصل."],
    oldH: "🔁 تم تصحيحه سابقًا ({n})", old: ["الجذر التربيعي → n^0.58: قريب جدًا، أكثر قليلًا للزحوف الكبيرة.", "الأوزان فرسان 0.58 / مشاة 0.14 → 0.63 / 0.12؛ أفضل خليط 2 : 21 : 77 → 1 : 25 : 74.", "❌ \"المشاة والفرسان أفضل لكل جندي\" — كان ذلك هو التباطؤ المذكور أعلاه: الزحوف الصغيرة تحصل على نقاط أكثر لكل جندي.", "⚠️ \"مهارات المنضمين = أول 4 في القائمة\" — في 11/06 تخطت عدة حشود أشخاصًا في أعلى القائمة → فكرة جديدة: مستوى المهارة أولًا، ثم ترتيب القائمة.", "❌ \"الحشد الذي ينطلق في الدقيقة الأخيرة فقط يضرب نحو ¼\" — تذكّر خاطئ (لم يتم التحقق من قائدي تلك الرسالتين).", "❌ \"أيقونة القبضة = الهجوم\" — إنها قوة الفتك عند تشينكو.", "❌ \"مكافأة المدينة تتضاعف وحدها\" — إنها تُضاف في نفس الخانة مع مكافأة الحشد من العتاد الحصري.", "مكافأة المدينة هجوم +10% / قوة فتك +20% ≈ ×1.32 → هجوم +10% / قوة فتك +10% ≈ ×1.21."],
    numH: "🔢 لمن يريد المعادلة", num: "نقاطك ≈ K × c × Σ (w × n^0.58). K = قوة قائد الحشد (يتشاركها الحشد كله)؛ c = قواتك أنت: مستوى القوات × (1 + «غريزة الصياد» عند فالورا) — لاعبان بنفس مستوى القوات ونفس مستوى «غريزة الصياد» يحصلان على نفس النتيجة تمامًا؛ w = وزن القوات (الرماة 1، الفرسان 0.63، المشاة 0.12)؛ n = عدد ما أرسلته من ذلك النوع. تمت المطابقة على 107 زحوف في 8 حشود (11/06، أعداد القوات من صفحة قوات الحشد): خطأ نحو 8.5% (20% بدون c).",
    more: "للضباط: قوة القادة وأين تحصل الزحوف على أكثر النقاط → 🐻 تحليل الدب",
    foot: "المصدر: رسائل حشود تحالفنا (1,123 + 5 من فخ 1)، لوحات الصدارة النهائية (6: فخ 2 ×4، فخ 1 ×2)، صفحات قوات الحشد (8 حشود) وصفحات المكافآت، 10/25–11/06. محسوبة من الأرقام، وليست من اللعبة." },
  ko: { title: "🐻 자이언트 베어 사냥 연구", intro: "자이언트 베어 사냥 점수가 어떻게 계산되는지 우리가 직접 연구한 것: 어떤 병력을 보내고 어느 집결에 들어갈지. 공식 아님 — 사냥할 때마다 계속 쌓이는 하나의 기록.",
    badge: "🔬 연구 기록 · 데이터: 함정 1 ×2, 함정 2 ×4회 (함정 1 메일: 한 집결에서 5개뿐) · 업데이트 {d}",
    st: { ok: "✅ 확실", mid: "🟡 추정" },
    heroH: "곰의 HP는 절대 바닥나지 않아.", heroP: "그래서 네 점수는 집결 전체가 얼마나 세게 때리느냐에 달려 있고 — 그건 거의 집결 대장에 달려 있어. 네가 할 수 있는 것: 맞는 병력을 보내고, 맞는 집결에 들어가기.",
    wH: "🏹 궁병이 제일 중요", wP: "같은 등급에서 병종별로 더해지는 양:",
    inf: "보병", cav: "기병", arc: "궁병",
    sqH: "📉 한 병종이 많을수록 1명당 점수는 줄어", sqP: "병종마다 따로 계산하고, 병력 수보다 천천히 늘어 (약 n^0.58, 제곱근에 가까움). 궁병을 4배 보내면 궁병 점수는 약 2.2배. 그래서 참여 상한이 100k야: 남는 병력은 다른 사람 행군에서 더 쓸모 있어.",
    mixH: "🎯 나의 최적 비율", mixP: "내 행군 기준 (병력 등급에 따라 조금 달라져):", mixFoot: "테스트 (10/29): 같은 집결에서 10 : 10 : 80 vs 2 : 24 : 74 — 매번 +2%뿐이라 비율은 작은 차이고, 병력 등급이 더 중요해:",
    calcH: "🧮 비율 계산해 보기", calcN: "{t} 수", calcRes: "{n} 병력 최적 비율의 {p}%",
    calcNote: "상대값일 뿐 — 실제 점수 아님. 같은 집결, 같은 대장 기준.",
    joinH: "🚩 어느 집결에 들어가느냐가 제일 중요", joinP: "같은 궁병 행군이 강한 집결에서 45–58M, 중간 집결에서 약 40M, 약한 집결에서 10–20M (11/06) — 약 3배 차이.",
    weak: "약한 대장", strong: "강한 대장",
    sendH: "🚀 병력 보내기", send: [["ok", "강한 집결은 20초~2분이면 꽉 차 — 빨리 들어가. 나중에 열린 집결은 마지막 1분에 돌아온 병력으로 채워져 (함정 1 마지막 웨이브: 동시에 집결 15–20개, 늦게 열린 집결이 마지막 1분에 20–40%에서 꽉 참)."], ["ok", "집결을 더 열어도 병력 낭비 아니야: 돌아온 병력을 쓰니까."], ["ok", "궁병 행군은 강한 집결로; 보병 / 기병 행군은 나중 집결로."], ["mid", "네 점수는 네 행군이 들어간 집결에 주로 달려 있고, 네 집결이 얼마나 강한지는 별로 상관없어 — 궁병 행군을 가장 강한 집결에 먼저 보내고, 보병 / 기병 행군은 나머지에 나눠 보내."]],
    kH: "👑 강한 대장의 조건", kP: "대장 쪽만 계산돼. 집결원의 스탯이나 장비는 집결을 바꾸지 않아.",
    k: [["ok", "🏹", "집결 버프 페이지의 대장 궁병 공격력 × 파괴력 (대장 영웅의 병종 버프가 이미 포함 — 영웅을 바꾸면 달라져)."],
      ["ok", "🏙️", "도시 버프 — 대장 것만 적용. 대장의 집결용 전용 장비 버프와 같은 칸에 더해져 (예: 공격력 20% + 30% → ×1.5), 따로 곱해지지 않아."],
      ["mid", "🦸", "집결원 스킬: 4칸, 첫 번째 칸에 영웅을 넣은 집결원에게서 — 그 영웅의 오른쪽 위 스킬. 누가 4칸을 차지하나: 아마 스킬 레벨이 높은 사람이 먼저고, 같은 레벨일 때만 목록 순서 (7명이 Lv5일 때 Lv4 스킬이 빠졌음) — 아직 확인 중. 집결 버프 페이지에는 절대 안 나오고, 전투 중에 따로 곱해져."],
      ["ok", "⚔️", "대장 본인의 영웅 스킬."]],
    jsH: "공격력과 파괴력 집결원 스킬을 섞기", jsAtk: "공격력", jsLet: "파괴력", jsFoot: "공격력과 파괴력은 서로 곱해지는 별도의 두 칸이라, 같은 것 4개보다 섞는 게 나아; 2 + 2가 1 + 3보다 약 6% 높아 (계산값) — 메일로는 안 보일 만큼 작아, 같은 조합도 웨이브마다 1.4–1.5배씩 흔들리니까. 첸코의 주먹 아이콘은 파괴력이야.",
    luckH: "🎲 운", luck: ["같은 병력 = 같은 피해: 한 집결에서 완전히 같은 병력을 보낸 두 사람은 피해도 완전히 같아. 웨이브마다 바뀌는 건 집결 전체에 곱해지는 숫자 하나 (다음 줄 참고).", "같은 집결도 웨이브마다 크게 달라질 수 있어 — 보통 10–25%, 최대 1.36배 (함정 1, 11/06) — 한 대장이 더 강하다고 말하기 전에 3–4 웨이브를 비교해.", "흔들림은 3단계 (추정): 집결 전체 ×0.82–1.22 (대장의 확률 스킬), 그 위에 궁병 ×0.86–1.37, 그 위에 TG3 그룹마다 (같은 병종·등급) ×0.73–1.33."],
    trendH: "📈 우리 연맹 합계", trendP: "최종 랭킹, 함정별:", trap2: "함정 2", trap1: "함정 1", trendN: "{n}명",
    valH: "🌟 베라 (거장)", valP: "베라의 재능 '사냥 본능'은 나 자신의 자이언트 베어 사냥 피해 포인트에만 더해져 (레벨은 거장 호감도로 열림; 표는 게임 내용):", valSkill: "사냥의 춤: 자이언트 베어 사냥 집결을 열 때 집결 수용량 레벨당 +30,000 (Lv4 = +120,000) — 대장을 할 거면 유용해. 수적 우위: 자이언트 베어 사냥에서 내 행군 수용량 레벨당 +3,000.",
    unkH: "🟡 아직 모르는 것", unks: ["집결원 스킬: 정말 스킬 레벨이 먼저인지 (빠진 사람들의 오른쪽 위 스킬 레벨 확인 필요).", "첸코 4 vs 첸코 2 + 아마네 2 — 같은 대장, 각각 집결 3–4회 (테스트 예정).", "\"적 방어력 −\" 버프가 곰에게 통하는지.", "비비안의 \"적이 받는 피해 +25%\"가 별도 곱셈인지."],
    oldH: "🔁 전에 고친 것 ({n})", old: ["제곱근 → n^0.58: 아주 비슷, 큰 행군은 조금 더.", "가중치 기병 0.58 / 보병 0.14 → 0.63 / 0.12; 최적 비율 2 : 21 : 77 → 1 : 25 : 74.", "❌ \"보병과 기병이 1명당 더 가치 있다\" — 위의 체감 효과였어: 작은 행군이 1명당 점수가 더 높아.", "⚠️ \"집결원 스킬 = 목록 앞 4명\" — 11/06에 여러 집결이 목록 위쪽 사람을 건너뜀 → 새 가설: 스킬 레벨 먼저, 그다음 목록 순서.", "❌ \"마지막 1분에 출발한 집결은 약 ¼만 때린다\" — 잘못 기억한 것 (그 두 메일의 대장을 확인 안 했음).", "❌ \"주먹 아이콘 = 공격력\" — 첸코의 파괴력이야.", "❌ \"도시 버프는 따로 곱해진다\" — 집결용 전용 장비 버프와 같은 칸에 더해져.", "도시 버프 공격력 +10% / 파괴력 +20% ≈ ×1.32 → 공격력 +10% / 파괴력 +10% ≈ ×1.21."],
    numH: "🔢 공식이 궁금한 사람용", num: "내 점수 ≈ K × c × Σ (w × n^0.58). K = 집결 대장의 강함 (집결 전체가 공유); c = 내 병력: 병력 등급 × (1 + 베라의 사냥 본능) — 등급과 사냥 본능 레벨이 같은 두 사람은 완전히 같아; w = 병종 가중치 (궁병 1, 기병 0.63, 보병 0.12); n = 그 병종을 보낸 수. 집결 8개의 행군 107개로 맞춤 (11/06, 병력 수는 집결 병력 페이지): 오차 약 8.5% (c 없으면 20%).",
    more: "간부용: 대장 강함과 행군이 점수를 가장 많이 받는 곳 → 🐻 곰 사냥 분석",
    foot: "출처: 우리 연맹 집결 메일 (1,123 + 함정 1에서 5), 최종 랭킹 (6개: 함정 2 ×4, 함정 1 ×2), 집결 병력 페이지 (집결 8개), 버프 페이지, 10/25–11/06. 숫자로 역산한 것이고, 게임 공식 설명 아님." },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { inf: 1000, cav: 25000, arc: 74000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-bh") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-bh", JSON.stringify(S)); } catch (e) {} };
const score = (n) => Object.keys(WT).reduce((s, k) => s + WT[k] * Math.max(0, (n[k] || 0) / 1000) ** EXP, 0);   // same tier for all → c cancels out
function best(N) { const q = Object.fromEntries(Object.keys(WT).map((k) => [k, WT[k] ** (1 / (1 - EXP))])), z = q.inf + q.cav + q.arc; return Object.fromEntries(Object.keys(WT).map((k) => [k, N * q[k] / z])); }
const pct = (x, N) => N ? Math.round(x / N * 100) : 0;

function calcHtml() {
  const N = S.inf + S.cav + S.arc, b = best(N), r = N ? score(S) / score(b) * 100 : 0;
  const seg = (k) => `<i class="${k}" style="width:${N ? (S[k] / N * 100).toFixed(1) : 0}%"></i>`;
  return `<div class="bh-in">${["inf", "cav", "arc"].map((k) => `<label>${esc(t("calcN").replace("{t}", t(k)))}<input class="inp" id="bh_${k}" type="number" min="0" step="1000" value="${S[k]}"></label>`).join("")}</div>
    <div class="bh-mix sm">${seg("inf")}${seg("cav")}${seg("arc")}</div>
    <div class="bh-res">${esc(t("calcRes").replace("{p}", r.toFixed(1)).replace("{n}", fmt(N)))}</div>
    <div class="muted bh-small">${esc(t("calcNote"))}</div>`;
}
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => o[k] ?? m);
const pic = (id) => `<img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy">`;
const tag = (k) => `<span class="bh-st ${k}">${esc(t("st")[k])}</span>`;
function render() {
  const root = $("bh_root"); if (!root) return;
  const hn = (k) => ({ amane: ["Amane", "雨音"], margot: ["Margot", "瑪爾戈"], luna: ["Luna", "露娜"], chenko: ["Chenko", "琴科"], yeonwoo: ["Yeonwoo", "妍羽"], amadeus: ["Amadeus", "阿瑪迪斯"] }[k][lang === "zh" ? 1 : 0]);
  const h3 = (k, st) => `<h3>${esc(t(k))} ${tag(st)}</h3>`;
  root.innerHTML = `
  <div class="bh-hero"><div class="bh-hero-in"><span class="bh-badge">${esc(fill(t("badge"), { n: HUNTS, s: SPAN, d: UPDATED }))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div></div>
  <div class="card">${h3("wH", "ok")}<p class="bh-p">${esc(t("wP"))}</p>
    <div class="bh-w">${[["arc", WT.arc], ["cav", WT.cav], ["inf", WT.inf]].map(([k, w]) => `<figure class="bh-wt" style="--s:${(0.42 + 0.58 * w).toFixed(2)}"><div class="bh-wi"><img src="figures/vv/${k}.webp" alt=""></div><figcaption><b>${esc(t(k))}</b><span class="bh-wn">×${w}</span></figcaption></figure>`).join("")}</div></div>
  <div class="card">${h3("sqH", "ok")}<p class="bh-p">${esc(t("sqP"))}</p>
    <div class="bh-sq">${[1, 4, 9].map((m) => `<div class="bh-sqr"><span>${m}×</span><div class="bh-sqb"><i class="n" style="width:${m / 9 * 100}%"></i></div><div class="bh-sqb"><i class="s" style="width:${(m ** EXP / 9 ** EXP * 100).toFixed(1)}%"></i></div><b>${(m ** EXP).toFixed(1)}×</b></div>`).join("")}</div></div>
  <div class="card">${h3("mixH", "ok")}<p class="bh-p">${esc(t("mixP"))}</p>
    <div class="bh-mix">${["inf", "cav", "arc"].map((k) => `<i class="${k}" style="width:${MIX[k]}%"></i>`).join("")}</div>
    <div class="bh-mixk">${["inf", "cav", "arc"].map((k) => `<span><i class="${k}"></i>${esc(t(k))} ${MIX[k]}</span>`).join("")}</div>
    <p class="bh-p" style="margin-top:10px">${esc(t("mixFoot"))} <span class="bh-tiers">${Object.entries(P).map(([k, v]) => `<span>${k} <b>${v}</b></span>`).join("")}</span></p>
    <div class="bh-calc"><h4>${esc(t("calcH"))}</h4><div id="bh_calc">${calcHtml()}</div></div></div>
  <div class="card">${h3("joinH", "ok")}<p class="bh-p">${esc(t("joinP"))}</p>
    <div class="bh-join"><div class="bh-jr"><span>${esc(t("weak"))}</span><div class="bh-jb"><i style="width:33%"></i></div><b>×1</b></div><div class="bh-jr"><span>${esc(t("strong"))}</span><div class="bh-jb"><i class="s" style="width:100%"></i></div><b>×3</b></div></div></div>
  <div class="card"><h3>${esc(t("sendH"))}</h3><ul class="bh-k">${t("send").map(([st, x]) => `<li><span>${tag(st)}</span><span>${esc(x)}</span></li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("kH"))}</h3><p class="bh-p">${esc(t("kP"))}</p>
    <ul class="bh-k">${t("k").map(([st, i, x]) => `<li><span>${i}</span><span>${esc(x)} ${tag(st)}</span></li>`).join("")}</ul>
    <div class="bh-js"><h4>${esc(t("jsH"))} ${tag("mid")}</h4>
      <div class="bh-jsr"><span class="bh-jst">${esc(t("jsAtk"))}</span>${["amane", "margot", "luna"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="bh-jsr"><span class="bh-jst let">${esc(t("jsLet"))}</span>${["chenko", "yeonwoo", "amadeus"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="muted bh-small">${esc(t("jsFoot"))}</div></div></div>
  <div class="card">${h3("trendH", "ok")}<p class="bh-p">${esc(t("trendP"))}</p>
    ${[["trap2", TREND], ["trap1", TREND1]].map(([k, TR]) => { const tmax = Math.max(...TREND1.map((x) => x[2])); return `<h4 style="margin:10px 0 4px">${esc(t(k))}</h4><div class="bh-join">${TR.map(([d, n, v], i) => `<div class="bh-jr bh-tr"><span>${d}</span><div class="bh-jb"><i class="s" style="width:${(v / tmax * 100).toFixed(1)}%"></i></div><b>${v.toFixed(2)}B</b><small class="muted">${esc(fill(t("trendN"), { n }))}${i ? ` · ${v >= TR[i - 1][2] ? "+" : ""}${((v / TR[i - 1][2] - 1) * 100).toFixed(1)}%` : ""}</small></div>`).join("")}</div>`; }).join("")}</div>
  <div class="bh-two">
    <div class="card">${h3("luckH", "ok")}<ul class="bh-ul">${t("luck").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("valH"))}</h3><p class="bh-p">${esc(t("valP"))}</p>
      <div class="bh-val">${VAL.map((v, i) => `<div title="Lv${i + 1}"><i style="height:${Math.round(v / 30 * 54)}px"></i><small>${i + 1}</small></div>`).join("")}</div>
      <div class="muted bh-small" style="margin:4px 0 8px">Lv1 2% · Lv4 9% · Lv11 30%</div><p class="bh-p" style="margin:0">${esc(t("valSkill"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="bh-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("numH"))}</b></summary><p class="bh-p" style="margin-top:8px">${esc(t("num"))}</p></details>
  <p class="bh-more"><a href="#bearplan">${esc(t("more"))}</a></p>
  <div class="muted bh-small">${esc(t("foot"))}</div>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("bh_calc"); if (!c) return; c.innerHTML = calcHtml(); bind(); };
  for (const k of ["inf", "cav", "arc"]) { const el = $("bh_" + k); if (el) el.onchange = () => { S[k] = Math.max(0, +el.value || 0); redo(); }; }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("bh_title")) { $("bh_title").textContent = t("title"); $("bh_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.bh = { init, applyTexts, setLang };
})();
