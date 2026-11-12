/* NXS officer page — 🐻 Bear Hunt report (registers OFFICER_PAGES.bh; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: how Bear Hunt scores work, for MEMBERS — no leader names, no K values, nobody ranked (those stay in 🐻 Bear plan).
   Our own research from rally mails, bonus pages and leaderboards (Project docs claude/bear-report-spec.md, claude/kingshot-battle-rules.md
   rules 16–23, claude/kingshot-bear-2026-10-27/29/31, -11-02). Not official. Names follow data/content.js GLOSSARY / data/terms.js.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-13", HUNTS = 12, SPAN = "10/25–11/13";
/* 2026-11-07: the analysis chat keeps ONE ledger now; 11/07 Sherry: correct old ideas in place — no "corrected earlier" list (Project docs claude/bear-findings.md + bear-mails.csv, bear-totals.csv,
   bear-rosters.csv — handoff claude/research-ledger-handoff.md). This page follows that ledger: every point carries its status
   (✅ sure / 🟡 likely); old ideas are rewritten in place, no "corrected" list. Members' page: principles only (ledger A + C). */
const WT = { inf: 0.12, cav: 0.63, arc: 1 }, EXP = 0.58;   // ledger A3 / A4 (11/07 fit: 8 rallies, 107 marches)
const MIX = { inf: 1, cav: 25, arc: 74 };                   // ledger A5
const HSETS = [[["amadeus", "petra", "marlin"], 1.00], [["amadeus", "jabel", "marlin"], 0.82], [["zoe", "petra", "marlin"], 0.79], [["zoe", "petra", "quinn"], 0.70]];   // ledger A14 (11/12)
const P = { T9: 50, T10: 66, TG1: 71, TG2: 76, TG3: 83 };
const VAL = [2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30];   // Valora talent, your own score + %, Lv1–11
const TREND = [["10/31", 18, 11.30], ["11/02", 20, 11.98], ["11/04", 23, 16.86], ["11/06", 23, 19.10], ["11/08", 19, 15.89], ["11/10", 22, 18.30], ["11/12", 22, 20.58]];   // ledger D: alliance total (B), Bear Trap 2
const TREND1 = [["10/31", 31, 24.47], ["11/06", 31, 29.72], ["11/13", 34, 44.08]];   // ledger D2: Bear Trap 1
const T = {
  en: { title: "🐻 Bear Hunt report", intro: "", obs: ["The same march can score about 3× more in one rally than in another.", "Most of the score comes from archers; infantry adds almost nothing.", "How strong a rally is depends almost only on its leader."], obsH: "🔎 What we saw", howH: "🔢 How we worked it out", do: ["Archer marches to the strongest rallies first; infantry and cavalry to the later ones.", "Mostly archers (about 1 : 25 : 74), but don't send zero of any troop type.", "Join with an Attack or Lethality hero in the first slot.", "Leaders: Petra and Amadeus are worth bringing; City Bonus on; joiner skills 2 Attack + 2 Lethality."], doH: "💡 Suggestions",
    badge: "🔬 Our research · updated {d}",
    st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "The Bear never runs out of Health.", heroP: "So your score is how hard the whole rally hits — and that is almost all about the rally leader.",
    wH: "🏹 Archers count most", wP: "How much each troop type adds:",
    inf: "Infantry", cav: "Cavalry", arc: "Archers",
    sqH: "📉 More of one type = less per troop", sqP: "Each troop type is counted on its own, and it grows slower than the troop count (about n^0.58, close to a square root). 4× the archers gives about 2.2× the archer score. That's why the join cap is 100k: extra troops do more in someone else's march.",
    mixH: "🎯 Your best mix", mixP: "Best mix:", mixFoot: "A little off costs only about 2–5%. Sending zero of one type costs about 15–30%. Higher-tier troops matter more.",
    calcH: "🧮 Try your mix", calcN: "{t} count", calcRes: "{p}% of the best mix for {n} troops",
    calcNote: "Relative only — not your real score. Same rally, same leader.",
    joinH: "🚩 The rally you join matters most", joinP: "The same archer march: about 50–60M in a strong rally, about 20M in a weak one.",
    weak: "Weak leader", strong: "Strong leader",
    sendH: "🚀 Sending troops", send: [["ok", "Strong rallies fill in 20 seconds to 2 minutes — be quick. Rallies opened later fill up in the last minute with troops coming back (Trap 1, last wave: 15–20 rallies at once, late ones went from 20–40% to full in the last minute)."], ["ok", "Opening more rallies doesn't waste troops: they use the troops that came back."], ["ok", "Archer marches into strong rallies; infantry / cavalry marches into the later rallies."]],
    kH: "👑 What makes a rally strong", kP: "Only the leader's side counts. Joiners' own stats and gear don't change the rally.",
    k: [["ok", "🏹", "The leader's archer Attack and Lethality"], ["ok", "🏙️", "The leader's City Bonus"], ["ok", "🦸", "Joiner skills (4 slots, higher skill level first)"], ["mid", "⚔️", "The leader's three heroes — they change the rally a lot (see below)"]],
    jsH: "Joiner skills: mix Attack and Lethality", jsAtk: "Attack", jsLet: "Lethality",
    luckH: "🎲 Luck", luck: ["Same troops = same score.", "One leader's rallies differ by 10–25%; compare leaders over 3–4 rallies."],
    trendH: "📈 Our alliance total", trendP: "Final leaderboard, each Trap:", trap2: "Trap 2", trap1: "Trap 1", trendN: "{n} players",
    valH: "🌟 Valora (Master)", valP: "Hunter Instinct adds to your own damage score:", valSkill: "Dance of the Hunt: rally capacity +30,000 per level. Savage Advantage: your own march capacity +3,000 per level.",
    lhH: "🦸 The leader's heroes", lhP: "Same stats, different heroes — how hard the rally hits (Amadeus · Petra · Marlin = 1):", lh: ["Zoe's Sundering Wound does nothing in Bear Hunt, and her Infinite Arsenal is the same effect as Petra's Evil Eye, so they don't stack in one rally. With Petra, Zoe only adds her Attack +25%.", "Petra's Evil Eye gets one chance per troop type every turn, so it triggers almost every turn (about 87.5%, about +43% damage). That is also why sending zero of one troop type costs more.", "Each rally still swings about ±8% by luck."], lhSrc: "From outside simulations (Strat Game Sloth and the Frakinator team); our rally mails point the same way.",
    unkH: "🟡 Not known yet", unks: ["Joiner skills: does skill level really come first?", "How much 4 Chenko and 2 Chenko + 2 Amane really differ.", "Whether \"enemy Defense −\" bonuses work on the Bear.", "Whether Vivian's skill works in Bear Hunt (outside simulations say it sometimes doesn't).", "How much each of Zoe's two skills costs on its own."],
    numH: "🔢 For those who want the formula", num: "Your score ≈ K × c × Σ (w × n^0.58). K = the rally leader's strength (the whole rally shares it); c = your own troops: troop tier × (1 + Valora's Hunter Instinct) — two players with the same tier and Hunter Instinct level get exactly the same; w = troop weight (archer 1, cavalry 0.63, infantry 0.12); n = how many of that type you sent. Fitted on 107 marches in 8 rallies (11/06, troop counts from the rally troop page): about 8.5% error (20% without c).",
    more: "Officers: leader strength and where marches score most → 🐻 Bear analysis",
    foot: "Source: our alliance's rally mails (1,123 + 5 from Trap 1), final leaderboards (10: Trap 2 ×7, Trap 1 ×3), rally troop pages and bonus pages, 10/25–11/13. Worked back from the numbers, not from the game." },
  zh: { title: "🐻 狩獵巨熊研究", intro: "", obs: ["同一支部隊進不同的團，分數可以差到約 3 倍。", "分數主要來自弓兵；步兵幾乎沒有分。", "一團強不強，幾乎只看隊長。"], obsH: "🔎 我們觀察到", howH: "🔢 怎麼算的", do: ["弓兵部隊先送最強的團，步兵、騎兵給後面的團。", "部隊以弓兵為主（約 步 1：騎 25：弓 74），但不要有哪個兵種派 0。", "加入時第一格帶攻擊力或殺傷力英雄。", "隊長：小佩拉和阿瑪迪斯值得帶；開城鎮增益；加入者技能湊 2 攻擊力＋2 殺傷力。"], doH: "💡 建議",
    badge: "🔬 我們的研究 · 更新 {d}",
    st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "熊的生命值永遠打不完。", heroP: "所以你的分數看的是整團打多痛——而這幾乎只看集結隊長。",
    wH: "🏹 弓兵最重要", wP: "每種兵的份量：",
    inf: "步兵", cav: "騎兵", arc: "弓兵",
    sqH: "📉 同一種兵帶越多，每隻越不值", sqP: "每個兵種分開算，而且分數長得比兵數慢（約 n 的 0.58 次方，接近開根號）。弓兵帶 4 倍，弓兵那部分只多約 2.2 倍。所以加入上限是 100k：多塞的兵放到別人的部隊裡比較有用。",
    mixH: "🎯 你的最佳兵種比例", mixP: "最佳比例：", mixFoot: "比例差一點只差約 2–5%；某個兵種派 0 會少約 15–30%。兵等高比較重要。",
    calcH: "🧮 試試你的比例", calcN: "{t}數量", calcRes: "是 {n} 隻兵最佳比例的 {p}%",
    calcNote: "只是相對值，不是實際分數。同一團、同一個隊長。",
    joinH: "🚩 進哪一團最重要", joinP: "同一支弓兵部隊：強團約 50–60M，弱團約 20M。",
    weak: "弱隊長", strong: "強隊長",
    sendH: "🚀 派兵", send: [["ok", "強團 20 秒到 2 分鐘就滿，要搶。後開的團最後一分鐘會靠回流的兵補滿（陷阱 1 最後一波：同時 15–20 團，晚開的團最後一分鐘從 20–40% 補到滿）。"], ["ok", "多開團不浪費：用的是回流的兵。"], ["ok", "弓兵部隊進強團；步兵、騎兵部隊進後段的團。"]],
    kH: "👑 一團強在哪裡", kP: "只看隊長那邊。加入者自己的屬性、裝備不會改變整團。",
    k: [["ok", "🏹", "隊長的弓兵攻擊力、殺傷力"], ["ok", "🏙️", "隊長開的城鎮增益"], ["ok", "🦸", "加入者技能（4 格，技能等級高的優先）"], ["mid", "⚔️", "隊長帶的三位英雄——影響很大（見下面）"]],
    jsH: "加入者技能：攻擊力、殺傷力混搭", jsAtk: "攻擊力", jsLet: "殺傷力",
    luckH: "🎲 運氣", luck: ["同樣的兵＝同樣的分數。", "同一個隊長每團差 10–25%，要看 3–4 團才比得出強弱。"],
    trendH: "📈 聯盟總傷害", trendP: "最終排行，兩個陷阱分開：", trap2: "陷阱 2", trap1: "陷阱 1", trendN: "{n} 人",
    valH: "🌟 維拉（大師）", valP: "「狩獵本能」加自己的傷害積分：", valSkill: "狩獵之舞：集結容量每級 +30,000。人數優勢：自己部隊容量每級 +3,000。",
    lhH: "🦸 隊長帶的英雄", lhP: "同樣的屬性、不同的英雄，整團打多痛（阿瑪迪斯・小佩拉・馬林 = 1）：", lh: ["佐伊的撕裂傷口在狩獵巨熊沒有效果；無下限技巧和小佩拉的厄運是同一種效果，同一團不會疊加。跟小佩拉一起帶時，佐伊只剩攻擊 +25% 有用。", "小佩拉的厄運每回合步、騎、弓各有一次機會，幾乎每回合都會觸發（約 87.5%，傷害約 +43%）。這也是某個兵種派 0 會少比較多的原因。", "每團還是有約 ±8% 的運氣。"], lhSrc: "來自外部模擬（Strat Game Sloth 與 Frakinator 團隊），我們的集結信件方向一致。",
    unkH: "🟡 還不知道的", unks: ["加入者技能：是不是真的先比技能等級。", "4 琴科和 2 琴科＋2 雨音實際差多少。", "「敵方防禦力降低」的增益對熊有沒有效。", "薇薇安的技能在狩獵巨熊有沒有效（外部模擬說有時會失效）。", "佐伊兩個技能各自少了多少。"],
    numH: "🔢 給想看公式的人", num: "你的分數 ≈ K × c × Σ（w × n 的 0.58 次方）。K = 集結隊長的強度（全團共用）；c = 你自己的部隊：兵等 ×（1 + 維拉「狩獵本能」）——兵等和狩獵本能等級一樣的兩個人，分數完全一樣；w = 兵種權重（弓兵 1、騎兵 0.63、步兵 0.12）；n = 你那個兵種帶的數量。用 11/06 8 團、107 支部隊（兵數取自集結兵種頁）擬合：誤差約 8.5%（不算 c 時 20%）。",
    more: "幹部：隊長強度、部隊放哪裡最好 → 🐻 熊獵實測",
    foot: "來源：我們聯盟的集結信件（1,123 筆 + 陷阱 1 5 封）、最終排行（10 份：陷阱 2 七場、陷阱 1 三場）、集結兵種頁、加成頁，10/25–11/13。從數字反推，不是遊戲官方說明。" },
  pt: { title: "🐻 Estudo da Caça ao Urso", intro: "", obs: ["A mesma marcha pode pontuar cerca de 3× mais num rally do que em outro.", "A maior parte da pontuação vem dos arqueiros; a Infantaria quase não soma.", "A força de um rally depende quase só do líder."], obsH: "🔎 O que observamos", howH: "🔢 Como calculamos", do: ["Marchas de arqueiros primeiro para os rallies mais fortes; Infantaria e Cavalaria para os seguintes.", "Marcha quase só de arqueiros (cerca de 1 : 25 : 74), mas sem mandar zero de nenhum tipo de tropa.", "Entre com um herói de Ataque ou Letalidade no primeiro espaço.", "Líderes: vale levar Petra e Amadeus; Bônus da Cidade ligado; habilidades de participante 2 de Ataque + 2 de Letalidade."], doH: "💡 Sugestões",
    badge: "🔬 Nossa pesquisa · atualizado {d}",
    st: { ok: "✅ certo", mid: "🟡 provável" },
    heroH: "O Urso nunca fica sem Vida.", heroP: "Então sua pontuação é o quanto o rally inteiro bate — e isso depende quase só do líder do rally.",
    wH: "🏹 Arqueiros contam mais", wP: "Quanto cada tipo de tropa soma:",
    inf: "Infantaria", cav: "Cavalaria", arc: "Arquearia",
    sqH: "📉 Mais de um tipo = menos por tropa", sqP: "Cada tipo de tropa conta separado, e cresce mais devagar que o número de tropas (cerca de n^0.58, perto de uma raiz quadrada). 4× mais arqueiros dá cerca de 2.2× a pontuação de arqueiros. Por isso o limite para entrar é 100k: tropas extras rendem mais na marcha de outra pessoa.",
    mixH: "🎯 Sua melhor mistura", mixP: "Melhor mistura:", mixFoot: "Um pouco diferente custa só cerca de 2–5%. Mandar zero de um tipo custa cerca de 15–30%. Tropas de nível maior importam mais.",
    calcH: "🧮 Teste sua mistura", calcN: "Quantidade de {t}", calcRes: "{p}% da melhor mistura para {n} tropas",
    calcNote: "Só para comparar — não é sua pontuação real. Mesmo rally, mesmo líder.",
    joinH: "🚩 O rally em que você entra é o que mais importa", joinP: "A mesma marcha de arqueiros: cerca de 50–60M num rally forte, cerca de 20M num fraco.",
    weak: "Líder fraco", strong: "Líder forte",
    sendH: "🚀 Enviando tropas", send: [["ok", "Rallies fortes enchem em 20 segundos a 2 minutos — seja rápido. Rallies abertos depois enchem no último minuto com as tropas que voltam (Armadilha 1, última onda: 15–20 rallies ao mesmo tempo; os atrasados foram de 20–40% a cheios no último minuto)."], ["ok", "Abrir mais rallies não desperdiça tropas: eles usam as tropas que voltaram."], ["ok", "Marchas de arqueiros nos rallies fortes; marchas de infantaria / cavalaria nos rallies abertos depois."]],
    kH: "👑 O que deixa um rally forte", kP: "Só o lado do líder conta. Os atributos e equipamentos dos participantes não mudam o rally.",
    k: [["ok", "🏹", "Ataque e Letalidade da Arquearia do líder"], ["ok", "🏙️", "Bônus da Cidade do líder"], ["ok", "🦸", "Habilidades de participante (4 vagas, nível maior primeiro)"], ["mid", "⚔️", "Os três heróis do líder — mudam muito o rally (veja abaixo)"]],
    jsH: "Habilidades de participante: misture Ataque e Letalidade", jsAtk: "Ataque", jsLet: "Letalidade",
    luckH: "🎲 Sorte", luck: ["Mesmas tropas = mesma pontuação.", "Os rallies de um líder variam 10–25%; compare líderes em 3–4 rallies."],
    trendH: "📈 Total da nossa aliança", trendP: "Ranking final, por Armadilha:", trap2: "Armadilha 2", trap1: "Armadilha 1", trendN: "{n} jogadores",
    valH: "🌟 Valora (Mestre)", valP: "Instinto de Caçador soma na sua própria pontuação de dano:", valSkill: "Dança da Caçada: capacidade do rally +30,000 por nível. Vantagem Selvagem: capacidade da sua marcha +3,000 por nível.",
    lhH: "🦸 Os heróis do líder", lhP: "Mesmos atributos, heróis diferentes — quanto o rally causa (Amadeus · Petra · Peixe Marlin = 1):", lh: ["A Ferida de Ruptura da Zoe não faz nada na Caça ao Urso, e o Arsenal Infinito dela é o mesmo efeito do Olho Maligno da Petra, então não acumulam no mesmo rally. Com a Petra, a Zoe só acrescenta o Ataque +25%.", "O Olho Maligno da Petra tem uma chance por tipo de tropa a cada turno, então ativa quase todo turno (cerca de 87,5%, cerca de +43% de dano). Por isso mandar zero de um tipo custa mais.", "Cada rally ainda varia cerca de ±8% por sorte."], lhSrc: "De simulações externas (Strat Game Sloth e equipe Frakinator); nossos relatórios de rally apontam na mesma direção.",
    unkH: "🟡 Ainda não sabemos", unks: ["Habilidades de participante: o nível da habilidade vem mesmo primeiro?", "Quanto 4 Chenko e 2 Chenko + 2 Amane realmente diferem.", "Se bônus de \"Defesa Inimiga Baixa\" funcionam no Urso.", "Se a habilidade da Vivian funciona na Caça ao Urso (simulações externas dizem que às vezes não).", "Quanto cada uma das duas habilidades da Zoe custa sozinha."],
    numH: "🔢 Para quem quer a fórmula", num: "Sua pontuação ≈ K × c × Σ (w × n^0.58). K = a força do líder do rally (o rally inteiro divide); c = suas próprias tropas: nível da tropa × (1 + Instinto de Caçador da Valora) — dois jogadores com o mesmo nível de tropa e de Instinto de Caçador ganham exatamente o mesmo; w = peso da tropa (arquearia 1, cavalaria 0.63, infantaria 0.12); n = quantas tropas daquele tipo você mandou. Ajustado em 107 marchas em 8 rallies (11/06, número de tropas da página de tropas do rally): cerca de 8.5% de erro (20% sem c).",
    more: "Oficiais: força dos líderes e onde as marchas pontuam mais → 🐻 Análise do Urso",
    foot: "Fonte: e-mails de rally da nossa aliança (1,123 + 5 da Armadilha 1), rankings finais (10: Armadilha 2 ×7, Armadilha 1 ×3), páginas de tropas do rally e páginas de bônus, 10/25–11/13. Calculado a partir dos números, não vem do jogo." },
  ar: { title: "🐻 دراسة صيد الدببة", intro: "", obs: ["الزحف نفسه قد يسجّل نحو 3× أكثر في حشد منه في حشد آخر.", "معظم النقاط تأتي من الرماة؛ المشاة لا تضيف شيئًا تقريبًا.", "قوة الحشد تعتمد تقريبًا على قائده فقط."], obsH: "🔎 ما لاحظناه", howH: "🔢 كيف حسبناها", do: ["زحوف الرماة أولًا إلى أقوى الحشود؛ والمشاة والفرسان إلى التالية.", "زحفك أغلبه رماة (نحو 1 : 25 : 74)، لكن دون إرسال صفر من أي نوع قوات.", "انضم ومعك بطل هجوم أو قوة فتك في الخانة الأولى.", "القادة: بيترا وأماديوس يستحقان الأخذ؛ فعّلوا مكافأة المدينة؛ مهارات المنضمّين 2 هجوم + 2 قوة فتك."], doH: "💡 اقتراحات",
    badge: "🔬 بحثنا · آخر تحديث {d}",
    st: { ok: "✅ مؤكد", mid: "🟡 مرجّح" },
    heroH: "صحة الدب لا تنتهي أبدًا.", heroP: "لذا نقاطك هي قوة ضرب الحشد كله — وهذا يعتمد تقريبًا على قائد الحشد فقط.",
    wH: "🏹 الرماة الأهم", wP: "كم يضيف كل نوع من القوات:",
    inf: "المشاة", cav: "الفرسان", arc: "الرماة",
    sqH: "📉 كلما زاد نوع واحد = قلّ نصيب كل جندي", sqP: "كل نوع من القوات يُحسب وحده، ويزيد أبطأ من عدد الجنود (تقريبًا n^0.58، قريب من الجذر التربيعي). 4× من الرماة تعطي تقريبًا 2.2× من نقاط الرماة. لهذا حد الانضمام 100k: القوات الزائدة تفيد أكثر في زحف شخص آخر.",
    mixH: "🎯 أفضل خليط لك", mixP: "أفضل خليط:", mixFoot: "فرق بسيط يكلف نحو 2–5% فقط. إرسال صفر من نوع واحد يكلف نحو 15–30%. القوات الأعلى مستوى أهم.",
    calcH: "🧮 جرّب خليطك", calcN: "عدد {t}", calcRes: "{p}% من أفضل خليط لـ {n} جندي",
    calcNote: "للمقارنة فقط — ليست نقاطك الحقيقية. نفس الحشد، نفس القائد.",
    joinH: "🚩 الحشد الذي تنضم إليه هو الأهم", joinP: "نفس زحف الرماة: نحو 50–60M في حشد قوي، ونحو 20M في حشد ضعيف.",
    weak: "قائد ضعيف", strong: "قائد قوي",
    sendH: "🚀 إرسال القوات", send: [["ok", "الحشود القوية تمتلئ خلال 20 ثانية إلى دقيقتين — كن سريعًا. الحشود التي تُفتح لاحقًا تمتلئ في الدقيقة الأخيرة بالقوات العائدة (فخ 1، الموجة الأخيرة: 15–20 حشدًا في وقت واحد؛ المتأخرة انتقلت من 20–40% إلى ممتلئة في الدقيقة الأخيرة)."], ["ok", "فتح حشود أكثر لا يضيّع القوات: فهي تستخدم القوات العائدة."], ["ok", "زحوف الرماة إلى الحشود القوية؛ زحوف المشاة / الفرسان إلى الحشود اللاحقة."]],
    kH: "👑 ما الذي يجعل الحشد قويًا", kP: "جانب القائد فقط هو ما يُحتسب. إحصاءات المنضمّين وعتادهم لا تغيّر الحشد.",
    k: [["ok", "🏹", "هجوم وقوة فتك الرماة عند القائد"], ["ok", "🏙️", "مكافأة المدينة عند القائد"], ["ok", "🦸", "مهارات المنضمّين (4 خانات، المستوى الأعلى أولًا)"], ["mid", "⚔️", "أبطال القائد الثلاثة — يغيّرون الحشد كثيرًا (انظر أدناه)"]],
    jsH: "مهارات المنضمّين: اخلط الهجوم وقوة الفتك", jsAtk: "هجوم", jsLet: "قوة فتك",
    luckH: "🎲 الحظ", luck: ["نفس القوات = نفس النقاط.", "حشود القائد الواحد تختلف 10–25%؛ قارن القادة على 3–4 حشود."],
    trendH: "📈 مجموع تحالفنا", trendP: "الترتيب النهائي، لكل فخ:", trap2: "فخ 2", trap1: "فخ 1", trendN: "{n} لاعب",
    valH: "🌟 فالورا (متخصص)", valP: "«غريزة الصياد» تزيد نقاط ضررك أنت:", valSkill: "رقصة الصيد: سعة الحشد +30,000 لكل مستوى. الأفضلية الوحشية: سعة زحفك +3,000 لكل مستوى.",
    lhH: "🦸 أبطال القائد", lhP: "نفس الإحصاءات، أبطال مختلفون — مقدار ضرر الحشد (أماديوس · بيترا · مارلين = 1):", lh: ["تمزيق الجرح عند زوي لا يفعل شيئًا في صيد الدببة، والترسانة اللانهائية لديها هي نفس تأثير عين الشر عند بيترا، فلا يتراكمان في حشد واحد. مع بيترا، لا تضيف زوي إلا الهجوم +25%.", "عين الشر عند بيترا لها فرصة لكل نوع قوات في كل جولة، فتنشط في كل جولة تقريبًا (نحو 87.5%، ونحو +43% ضرر). لهذا يكلف إرسال صفر من نوع واحد أكثر.", "كل حشد ما زال يتذبذب نحو ±8% بالحظ."], lhSrc: "من محاكاة خارجية (Strat Game Sloth وفريق Frakinator)؛ رسائل حشدنا تشير إلى الاتجاه نفسه.",
    unkH: "🟡 غير معروف بعد", unks: ["مهارات المنضمّين: هل مستوى المهارة يأتي أولًا حقًا؟", "كم يختلف فعلًا 4 تشينكو عن 2 تشينكو + 2 أماني.", "هل مكافآت \"خفض دفاع العدو\" تعمل على الدب.", "هل تعمل مهارة فيفيان في صيد الدببة (المحاكاة الخارجية تقول إنها لا تعمل أحيانًا).", "كم تكلف كل مهارة من مهارتَي زوي وحدها."],
    numH: "🔢 لمن يريد المعادلة", num: "نقاطك ≈ K × c × Σ (w × n^0.58). K = قوة قائد الحشد (يتشاركها الحشد كله)؛ c = قواتك أنت: مستوى القوات × (1 + «غريزة الصياد» عند فالورا) — لاعبان بنفس مستوى القوات ونفس مستوى «غريزة الصياد» يحصلان على نفس النتيجة تمامًا؛ w = وزن القوات (الرماة 1، الفرسان 0.63، المشاة 0.12)؛ n = عدد ما أرسلته من ذلك النوع. تمت المطابقة على 107 زحوف في 8 حشود (11/06، أعداد القوات من صفحة قوات الحشد): خطأ نحو 8.5% (20% بدون c).",
    more: "للضباط: قوة القادة وأين تحصل الزحوف على أكثر النقاط → 🐻 تحليل الدب",
    foot: "المصدر: رسائل حشود تحالفنا (1,123 + 5 من فخ 1)، لوحات الصدارة النهائية (10: فخ 2 ×7، فخ 1 ×3)، صفحات قوات الحشد وصفحات المكافآت، 10/25–11/13. محسوبة من الأرقام، وليست من اللعبة." },
  ko: { title: "🐻 자이언트 베어 사냥 연구", intro: "", obs: ["같은 부대라도 어느 집결에 들어가느냐에 따라 점수가 약 3배까지 차이 나.", "점수는 대부분 궁병에서 나오고, 보병은 거의 안 보태.", "집결이 얼마나 센지는 거의 대장에게 달렸어."], obsH: "🔎 우리가 관찰한 것", howH: "🔢 어떻게 계산했는지", do: ["궁병 부대는 가장 강한 집결에 먼저, 보병·기병은 뒤 집결로.", "부대는 거의 궁병으로 (약 1 : 25 : 74), 다만 어떤 병종도 0으로 보내지 않는 게 좋아.", "첫 칸에 공격력이나 파괴력 영웅을 넣고 참여해.", "대장: 리틀 페라와 아마데우스를 데려갈 만해; 도시 버프 켜기; 집결원 스킬은 공격력 2 + 파괴력 2."], doH: "💡 제안",
    badge: "🔬 우리 연구 · 업데이트 {d}",
    st: { ok: "✅ 확실", mid: "🟡 추정" },
    heroH: "곰의 HP는 절대 바닥나지 않아.", heroP: "그래서 네 점수는 집결 전체가 얼마나 세게 때리느냐야 — 그건 거의 집결 대장에게 달렸어.",
    wH: "🏹 궁병이 제일 중요해", wP: "병종마다 얼마나 보태는지:",
    inf: "보병", cav: "기병", arc: "궁병",
    sqH: "📉 한 병종이 많을수록 1명당 점수는 줄어", sqP: "병종마다 따로 계산하고, 병력 수보다 천천히 늘어 (약 n^0.58, 제곱근에 가까움). 궁병을 4배 보내면 궁병 점수는 약 2.2배. 그래서 참여 상한이 100k야: 남는 병력은 다른 사람 행군에서 더 쓸모 있어.",
    mixH: "🎯 나의 최적 비율", mixP: "최적 비율:", mixFoot: "조금 달라도 약 2–5%밖에 차이 안 나. 한 병종을 0으로 보내면 약 15–30% 줄어. 병력 티어가 더 중요해.",
    calcH: "🧮 비율 계산해 보기", calcN: "{t} 수", calcRes: "{n} 병력 최적 비율의 {p}%",
    calcNote: "상대값일 뿐 — 실제 점수 아님. 같은 집결, 같은 대장 기준.",
    joinH: "🚩 어느 집결에 들어가느냐가 제일 중요해", joinP: "같은 궁병 부대: 강한 집결에서 약 50–60M, 약한 집결에서 약 20M.",
    weak: "약한 대장", strong: "강한 대장",
    sendH: "🚀 병력 보내기", send: [["ok", "강한 집결은 20초~2분이면 꽉 차 — 빨리 들어가. 나중에 열린 집결은 마지막 1분에 돌아온 병력으로 채워져 (함정 1 마지막 웨이브: 동시에 집결 15–20개, 늦게 열린 집결이 마지막 1분에 20–40%에서 꽉 참)."], ["ok", "집결을 더 열어도 병력 낭비 아니야: 돌아온 병력을 쓰니까."], ["ok", "궁병 행군은 강한 집결로; 보병 / 기병 행군은 나중 집결로."]],
    kH: "👑 집결이 강해지는 이유", kP: "대장 쪽만 계산돼. 집결원 자신의 능력치와 장비는 집결을 바꾸지 않아.",
    k: [["ok", "🏹", "대장의 궁병 공격력·파괴력"], ["ok", "🏙️", "대장이 켠 도시 버프"], ["ok", "🦸", "집결원 스킬 (4칸, 스킬 레벨 높은 순)"], ["mid", "⚔️", "대장이 데려가는 영웅 3명 — 집결을 크게 바꿔 (아래 참고)"]],
    jsH: "집결원 스킬: 공격력과 파괴력을 섞어", jsAtk: "공격력", jsLet: "파괴력",
    luckH: "🎲 운", luck: ["같은 병력 = 같은 점수.", "같은 대장도 집결마다 10–25% 달라. 대장 비교는 3–4번을 봐."],
    trendH: "📈 우리 연맹 합계", trendP: "최종 랭킹, 함정별:", trap2: "함정 2", trap1: "함정 1", trendN: "{n}명",
    valH: "🌟 베라 (거장)", valP: "「사냥 본능」은 내 피해 점수를 올려 줘:", valSkill: "사냥의 춤: 집결 수용량 레벨당 +30,000. 수적 우위: 내 행군 수용량 레벨당 +3,000.",
    lhH: "🦸 대장의 영웅", lhP: "같은 능력치, 다른 영웅 — 집결이 얼마나 세게 때리는지 (아마데우스 · 리틀 페라 · 마린 = 1):", lh: ["조이의 상처 찢기는 자이언트 베어 사냥에서 효과가 없고, 끝없는 기술은 리틀 페라의 불운과 같은 효과라 한 집결에서 중첩되지 않아. 리틀 페라와 함께면 조이는 공격력 +25%만 남아.", "리틀 페라의 불운은 매 턴 보병·기병·궁병마다 한 번씩 기회가 있어서 거의 매 턴 발동해 (약 87.5%, 피해 약 +43%). 그래서 한 병종을 0으로 보내면 더 손해야.", "집결마다 여전히 약 ±8% 운 차이가 있어."], lhSrc: "외부 시뮬레이션(Strat Game Sloth, Frakinator 팀) 결과이고, 우리 집결 메일도 같은 방향이야.",
    unkH: "🟡 아직 모르는 것", unks: ["집결원 스킬: 정말 스킬 레벨이 먼저인지.", "첸코 4와 첸코 2 + 아마네 2가 실제로 얼마나 차이 나는지.", "\"적군 방어력 저하\" 버프가 곰에게 통하는지.", "비비안의 스킬이 자이언트 베어 사냥에서 효과가 있는지 (외부 시뮬레이션은 가끔 안 된다고 함).", "조이의 두 스킬이 각각 얼마나 손해인지."],
    numH: "🔢 공식이 궁금한 사람용", num: "내 점수 ≈ K × c × Σ (w × n^0.58). K = 집결 대장의 강함 (집결 전체가 공유); c = 내 병력: 병력 등급 × (1 + 베라의 사냥 본능) — 등급과 사냥 본능 레벨이 같은 두 사람은 완전히 같아; w = 병종 가중치 (궁병 1, 기병 0.63, 보병 0.12); n = 그 병종을 보낸 수. 집결 8개의 행군 107개로 맞춤 (11/06, 병력 수는 집결 병력 페이지): 오차 약 8.5% (c 없으면 20%).",
    more: "간부용: 대장 강함과 행군이 점수를 가장 많이 받는 곳 → 🐻 곰 사냥 분석",
    foot: "출처: 우리 연맹 집결 메일 (1,123 + 함정 1에서 5), 최종 랭킹 (10개: 함정 2 ×7, 함정 1 ×3), 집결 병력 페이지, 버프 페이지, 10/25–11/13. 숫자로 역산한 것이고, 게임 공식 설명 아님." },
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
    <div class="bh-res">${esc(t("calcRes").replace("{p}", r.toFixed(1)).replace("{n}", fmt(N)))}</div>`;
}
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => o[k] ?? m);
const pic = (id) => `<img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy">`;
const tag = (k) => `<span class="bh-st ${k}">${esc(t("st")[k])}</span>`;
function render() {
  const root = $("bh_root"); if (!root) return;
  // official hero names (data/terms.js), order en zh pt ar ko
  const hn = (k) => ({ amane: ["Amane", "雨音", "Amane", "أماني", "아마네"], margot: ["Margot", "瑪爾戈", "Margot", "مارغوت", "마르고"], luna: ["Luna", "露娜", "Luna", "لونا", "루나"], chenko: ["Chenko", "琴科", "Chenko", "تشينكو", "첸코"], yeonwoo: ["Yeonwoo", "妍羽", "Yeonwoo", "يونوو", "연우"], amadeus: ["Amadeus", "阿瑪迪斯", "Amadeus", "أماديوس", "아마데우스"] }[k][Math.max(0, ["en", "zh", "pt", "ar", "ko"].indexOf(lang))]);
  const h3 = (k, st) => `<h3>${esc(t(k))} ${tag(st)}</h3>`;
  root.innerHTML = `${OFFICER.bearChips("score", lang)}
  <div class="bh-hero" style="background-image:url(figures/bh/bear.webp)"><div class="bh-hero-in"><span class="bh-badge">${esc(fill(t("badge"), { d: UPDATED }))}</span></div></div>
  <div class="card rs-do"><h3>${esc(t("doH"))}</h3><ul class="rs-dol">${t("do").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("joinH"))}</h3><p class="bh-p">${esc(t("joinP"))}</p>
    <div class="bh-join"><div class="bh-jr"><span>${esc(t("weak"))}</span><div class="bh-jb"><i style="width:33%"></i></div><b>×1</b></div><div class="bh-jr"><span>${esc(t("strong"))}</span><div class="bh-jb"><i class="s" style="width:100%"></i></div><b>×3</b></div></div></div>
  <div class="card"><h3>${esc(t("wH"))}</h3>
    <div class="bh-w">${[["arc", WT.arc], ["cav", WT.cav], ["inf", WT.inf]].map(([k, w]) => `<figure class="bh-wt" style="--s:${(0.42 + 0.58 * w).toFixed(2)}"><div class="bh-wi"><img src="figures/vv/${k}.webp" alt=""></div><figcaption><b>${esc(t(k))}</b><span class="bh-wn">×${w}</span></figcaption></figure>`).join("")}</div>
    <p class="bh-p" style="margin-top:12px">${esc(t("mixP"))}</p>
    <div class="bh-mix">${["inf", "cav", "arc"].map((k) => `<i class="${k}" style="width:${MIX[k]}%"></i>`).join("")}</div>
    <div class="bh-mixk">${["inf", "cav", "arc"].map((k) => `<span><i class="${k}"></i>${esc(t(k))} ${MIX[k]}</span>`).join("")}</div>
    <div class="bh-calc"><h4>${esc(t("calcH"))}</h4><div id="bh_calc">${calcHtml()}</div></div></div>
  <div class="card"><h3>${esc(t("kH"))}</h3>
    <ul class="bh-k">${t("k").map(([st, i, x]) => `<li><span>${i}</span><span>${esc(x)}</span></li>`).join("")}</ul>
    <div class="bh-js"><h4>${esc(t("jsH"))}</h4>
      <div class="bh-jsr"><span class="bh-jst">${esc(t("jsAtk"))}</span>${["amane", "margot", "luna"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="bh-jsr"><span class="bh-jst let">${esc(t("jsLet"))}</span>${["chenko", "yeonwoo", "amadeus"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div></div></div>
  <div class="card"><h3>${esc(t("lhH"))} ${tag("mid")}</h3><p class="bh-p">${esc(t("lhP"))}</p>
    <div class="bh-hs">${HSETS.map(([ids, m]) => `<div class="bh-hsr"><span class="bh-hsp">${ids.map(pic).join("")}</span><div class="bh-jb"><i class="s" style="width:${(m * 100).toFixed(0)}%"></i></div><b>${m.toFixed(2)}</b></div>`).join("")}</div>
    <ul class="bh-ul" style="margin-top:10px">${t("lh").map((x) => `<li>${esc(x)}</li>`).join("")}</ul><div class="muted bh-small">${esc(t("lhSrc"))}</div></div>
  <div class="bh-two">
    <div class="card"><h3>${esc(t("luckH"))}</h3><ul class="bh-ul">${t("luck").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("valH"))}</h3><p class="bh-p">${esc(t("valP"))}</p>
      <div class="bh-val">${VAL.map((v, i) => `<div title="Lv${i + 1}"><i style="height:${Math.round(v / 30 * 54)}px"></i><small>${i + 1}</small></div>`).join("")}</div>
      <div class="muted bh-small" style="margin:4px 0 8px">Lv1 2% · Lv4 9% · Lv11 30%</div><p class="bh-p" style="margin:0">${esc(t("valSkill"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("trendH"))}</h3>
    ${[["trap2", TREND], ["trap1", TREND1]].map(([k, TR]) => { const tmax = Math.max(...TREND1.map((x) => x[2])); return `<h4 style="margin:10px 0 4px">${esc(t(k))}</h4><div class="bh-join">${TR.map(([d, n, v], i) => `<div class="bh-jr bh-tr"><span>${d}</span><div class="bh-jb"><i class="s" style="width:${(v / tmax * 100).toFixed(1)}%"></i></div><b>${v.toFixed(2)}B</b><small class="muted">${esc(t("trendN").replace("{n}", n))}${i ? ` · ${v >= TR[i - 1][2] ? "+" : ""}${((v / TR[i - 1][2] - 1) * 100).toFixed(1)}%` : ""}</small></div>`).join("")}</div>`; }).join("")}</div>
  ${OFFICER.vidCard("bh", lang)}
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="bh-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("howH"))}</b></summary>
    <h4 style="margin:12px 0 4px">${esc(t("sqH"))}</h4><p class="bh-p">${esc(t("sqP"))}</p>
    <div class="bh-sq">${[1, 4, 9].map((m) => `<div class="bh-sqr"><span>${m}×</span><div class="bh-sqb"><i class="n" style="width:${m / 9 * 100}%"></i></div><div class="bh-sqb"><i class="s" style="width:${(m ** EXP / 9 ** EXP * 100).toFixed(1)}%"></i></div><b>${(m ** EXP).toFixed(1)}×</b></div>`).join("")}</div>
    <p class="bh-p" style="margin-top:10px"><span class="bh-tiers">${Object.entries(P).map(([k, v]) => `<span>${k} <b>${v}</b></span>`).join("")}</span></p>
    <p class="bh-p">${esc(t("num"))}</p><div class="muted bh-small">${esc(t("foot"))}</div></details>
  `;
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
