/* NXS officer page — 🧭 Growth plan (registers OFFICER_PAGES.growth; own tab, nobody by default, admins always).
   Sherry, 2026-10-31: Armada wants to decide who builds attack and who builds defense. Before any names, this page shows the
   proposal for a shared way to grow (from Project doc claude/kingshot-hero-guide-gen1-5.md), for Armada and Nia to read.
   Read-only text, no data. Hero details link to the main site's 🃏 Hero Cards. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const T = {
  en: { title: "🧭 Growth plan", intro: "A proposal to agree on first — how we grow our rally and garrison leaders. Nothing is decided yet; no names here.",
    whyT: "Why we split roles",
    why: ["Rallies and garrisons only use the LEADER's stats, heroes, Exclusive Gear and Governor Gear.", "Joiners only add their first hero's top-right Expedition skill — their own stats and gear don't count.", "So one person building both attack and defense pays twice for half the result: pick one role per person."],
    rolesT: "What each role builds",
    roles: [
      { i: "⚔️", n: "Attack (PvP rally lead)", r: [["Heroes", "Infantry: Amadeus / Helga · Cavalry: Petra / Thrud · Archer: Vivian / Rosa / Marlin"], ["Widgets", "Offensive (rally) type"], ["Governor Gear + gems", "Infantry (gear = Defense, gems = Health) > Archer gems (Lethality) > Archer gear > Cavalry"], ["Hero gear", "Infantry heroes: gloves, chest (Health) · Cavalry / Archer heroes: helmet, boots (Lethality)"], ["Also", "Rally capacity"]] },
      { i: "🛡️", n: "Defense (garrison lead)", r: [["Heroes", "Infantry: Eric / Alcar / Long Fei / Zoe · Cavalry: Jabel / Hilde / Margot · Archer: Jaeger / Saul"], ["Widgets", "Defensive (garrison) type"], ["Governor Gear + gems", "Same order as Attack"], ["Hero gear", "Same as Attack"], ["Also", "The highest garrison capacity in the alliance — a garrison uses the stats of whoever gives the most capacity"]] },
      { i: "🐻", n: "Bear lead", r: [["Heroes", "Archer heroes matter most: Vivian / Rosa / Marlin · Cavalry: Petra · Infantry: Amadeus"], ["Widgets", "Offensive (rally) type — the Bear is a rally too"], ["Governor Gear + gems", "Archer >> Cavalry > Infantry"], ["Hero gear", "Archer heroes: helmet, boots"], ["Note", "The Bear doesn't hit back: defensive skills are wasted"]] },
      { i: "👥", n: "Everyone else (joiners)", r: [["Heroes", "Only your FIRST hero's top-right skill counts: Chenko, Amane, Yeonwoo (PvP: also Gordon and other defensive ones)"], ["Widgets", "Not needed — they don't work when joining"], ["Governor Gear", "No rush — only for your own marches and your own city"], ["Also", "Troop tier, troop count, march capacity"]] },
    ],
    noteT: "Good to know",
    notes: ["Hero gear and troop bonuses only count when that hero marches — only build the 3 heroes you lead with.", "Attack and defense leaders need the same stats in the same order (battles are symmetric); what differs is the heroes and the Widget type.", "A Bear lead can be the same person as an Attack lead (both rally Widgets), but the Governor Gear troop order is different (archer vs infantry).", "Joiners: only the first 4 people with a hero count; 2 Attack + 2 Lethality skills is the best mix."],
    f2pT: "Free players: in this order",
    f2p: ["Jabel's Widget to max — free, and always useful in garrisons.", "Joiner heroes Chenko, Amane, Yeonwoo: top-right skill to Lv5 — cheapest and used the most.", "One offensive-Widget hero: Petra (Hero Roulette).", "Keep Widget parts on 2–3 heroes, don't spread them (275 for one max)."],
    askT: "What we need to decide together",
    ask: ["How many Attack leads and how many Defense leads do we want?", "Who wants which role? (names come after we agree)", "Garrison troop ratio: is “60/40” Infantry 60 and the rest 40?"],
    cards: "🃏 Every hero, rated for each role → Hero Cards", src: "From our battle-report and hero-skill analysis (2026-10-31). Numbers come from game screenshots." },
  zh: { title: "🧭 發展方向", intro: "先求共識的提案——我們的集結隊長和駐防帶頭要怎麼培養。還沒有決定任何事，也還沒有名單。",
    whyT: "為什麼要分工",
    why: ["集結和駐防只用「隊長／帶頭者」的屬性、英雄、專屬裝備和領主裝備。", "加入者只有第一位英雄的右上遠征技能有用，自己的屬性和裝備都不算。", "所以同一個人攻守都練，等於花兩倍資源只拿到一半效果：一個人選一個角色。"],
    rolesT: "每個角色練什麼",
    roles: [
      { i: "⚔️", n: "主攻（PvP 集結隊長）", r: [["英雄", "步：阿瑪迪斯／赫爾加 · 騎：小佩拉／索德 · 弓：薇薇安／蘿莎／馬林"], ["零件", "集結派"], ["領主裝備＋寶石", "步兵（裝備＝防禦、寶石＝生命）＞弓兵寶石（殺傷）＞弓兵裝備＞騎兵"], ["英雄裝備", "步兵英雄先練手套、胸甲（生命）· 騎、弓英雄先練頭盔、靴子（殺傷）"], ["其他", "集結容量"]] },
      { i: "🛡️", n: "主守（駐防帶頭）", r: [["英雄", "步：艾瑞克／艾爾卡／龍飛／佐伊 · 騎：潔貝爾／希爾德／瑪歌 · 弓：耶格爾／薩洛"], ["零件", "守城派"], ["領主裝備＋寶石", "跟主攻一樣"], ["英雄裝備", "跟主攻一樣"], ["其他", "駐防容量要全盟最高——駐防用「提供最多容量的人」的屬性"]] },
      { i: "🐻", n: "熊獵隊長", r: [["英雄", "弓兵英雄最重要：薇薇安／蘿莎／馬林 · 騎：小佩拉 · 步：阿瑪迪斯"], ["零件", "集結派（熊獵也是集結）"], ["領主裝備＋寶石", "弓兵 ＞＞ 騎兵 ＞ 步兵"], ["英雄裝備", "弓兵英雄的頭盔、靴子"], ["注意", "熊不會打人：防守技能全部浪費"]] },
      { i: "👥", n: "一般成員（加入者）", r: [["英雄", "只有第一位英雄的右上技能有用：琴科、天音、妍雨（PvP 再加戈登等防守類）"], ["零件", "不用練——加入時不生效"], ["領主裝備", "不急——只影響自己單打和自己的城"], ["其他", "兵等、兵數、出征容量"]] },
    ],
    noteT: "要知道的事",
    notes: ["英雄裝備和兵種加成只在那位英雄出戰時才算——只練自己當隊長會帶的那 3 位。", "主攻和主守需要的屬性、順序都一樣（戰鬥機制對稱），差別在英雄和零件派別。", "熊獵隊長可以跟主攻同一人（都是集結派），但領主裝備的優先兵種不同（弓 vs 步）。", "加入者：只算前 4 個帶英雄的人；2 個攻擊＋2 個殺傷的技能最好。"],
    f2pT: "免費玩家：照這個順序",
    f2p: ["潔貝爾的零件練滿——免費，駐防一直有用。", "加入者英雄琴科、天音、妍雨：右上技能練到 Lv5——最便宜也最常用。", "一位集結派：小佩拉（英雄轉盤拿得到）。", "零件集中 2–3 位，不要分散（滿級要 275 個）。"],
    askT: "要一起決定的事",
    ask: ["我們要幾個主攻、幾個主守？", "誰想負責哪個角色？（有共識之後再排名單）", "駐防兵種比例：「60/40」是步兵 60、其他 40 嗎？"],
    cards: "🃏 每位英雄在各角色的評分 → 英雄卡", src: "來自我們的戰報和英雄技能分析（2026-10-31），數字以遊戲截圖為準。" },
  pt: { title: "🧭 Plano de crescimento", intro: "Uma proposta para combinarmos primeiro — como formamos nossos líderes de rally e de guarnição. Nada decidido ainda; sem nomes aqui.",
    whyT: "Por que dividir funções",
    why: ["Rallies e guarnições só usam os atributos, heróis, Equipamento Exclusivo e Equipamento do Governador do LÍDER.", "Quem entra no rally só soma a habilidade de Expedição de cima à direita do primeiro herói — os próprios atributos e equipamentos não contam.", "Então quem constrói ataque e defesa ao mesmo tempo paga em dobro por metade do resultado: uma função por pessoa."],
    rolesT: "O que cada função constrói",
    roles: [
      { i: "⚔️", n: "Ataque (líder de rally PvP)", r: [["Heróis", "Infantaria: Amadeus / Helga · Cavalaria: Petra / Thrud · Arquearia: Vivian / Rosa / Marlin"], ["Ferramentas", "Tipo ofensivo (rally)"], ["Equip. do Governador + gemas", "Infantaria (equip. = Defesa, gemas = Vida) > gemas de Arquearia (Letalidade) > equip. de Arquearia > Cavalaria"], ["Equip. de herói", "Heróis de infantaria: luvas, peitoral (Vida) · cavalaria / arquearia: elmo, botas (Letalidade)"], ["Também", "Capacidade de rally"]] },
      { i: "🛡️", n: "Defesa (líder de guarnição)", r: [["Heróis", "Infantaria: Eric / Alcar / Long Fei / Zoe · Cavalaria: Jabel / Hilde / Margot · Arquearia: Jaeger / Saul"], ["Ferramentas", "Tipo defensivo (guarnição)"], ["Equip. do Governador + gemas", "Mesma ordem do Ataque"], ["Equip. de herói", "Igual ao Ataque"], ["Também", "A maior capacidade de guarnição da aliança — a guarnição usa os atributos de quem dá mais capacidade"]] },
      { i: "🐻", n: "Líder do Urso", r: [["Heróis", "Heróis de arquearia são os mais importantes: Vivian / Rosa / Marlin · Cavalaria: Petra · Infantaria: Amadeus"], ["Ferramentas", "Tipo ofensivo (rally) — o Urso também é rally"], ["Equip. do Governador + gemas", "Arquearia >> Cavalaria > Infantaria"], ["Equip. de herói", "Heróis de arquearia: elmo, botas"], ["Nota", "O Urso não revida: habilidades defensivas são desperdiçadas"]] },
      { i: "👥", n: "Todos os outros (participantes)", r: [["Heróis", "Só conta a habilidade de cima à direita do PRIMEIRO herói: Chenko, Amane, Yeonwoo (PvP: também Gordon e outros defensivos)"], ["Ferramentas", "Não precisa — não funcionam ao entrar no rally"], ["Equip. do Governador", "Sem pressa — só para as suas marchas e a sua cidade"], ["Também", "Nível e quantidade de tropas, capacidade de marcha"]] },
    ],
    noteT: "Bom saber",
    notes: ["Equipamento de herói e bônus de tropa só contam quando aquele herói marcha — evolua só os 3 heróis com que você lidera.", "Líderes de ataque e de defesa precisam dos mesmos atributos na mesma ordem (a batalha é simétrica); muda só o herói e o tipo de Ferramenta.", "O líder do Urso pode ser o mesmo do Ataque (os dois usam Ferramentas de rally), mas a ordem das tropas no Equip. do Governador muda (arquearia vs infantaria).", "Participantes: só contam as 4 primeiras pessoas com herói; 2 habilidades de Ataque + 2 de Letalidade é a melhor mistura."],
    f2pT: "Jogadores gratuitos: nesta ordem",
    f2p: ["Ferramenta da Jabel no máximo — grátis e sempre útil na guarnição.", "Heróis de participante Chenko, Amane, Yeonwoo: habilidade de cima à direita até Nv5 — mais barato e o mais usado.", "Um herói de Ferramenta ofensiva: Petra (Roleta de Heróis).", "Concentre as peças em 2–3 heróis, não espalhe (275 para um no máximo)."],
    askT: "O que precisamos decidir juntos",
    ask: ["Quantos líderes de Ataque e quantos de Defesa queremos?", "Quem quer qual função? (os nomes vêm depois do acordo)", "Proporção da guarnição: “60/40” é Infantaria 60 e o resto 40?"],
    cards: "🃏 Cada herói avaliado por função → Cartas de Heróis", src: "Da nossa análise de relatórios de batalha e habilidades (31/10/2026). Os números vêm de capturas do jogo." },
  ar: { title: "🧭 خطة التطوير", intro: "اقتراح نتفق عليه أولًا — كيف نطوّر قادة الحشود وقادة الحاميات. لم يُحسم شيء بعد، ولا توجد أسماء هنا.",
    whyT: "لماذا نوزّع الأدوار",
    why: ["الحشود والحاميات تستخدم فقط إحصاءات القائد وأبطاله ومعداته الحصرية ومعدات الحاكم.", "المنضم يضيف فقط مهارة الحملة العلوية اليمنى لبطله الأول — إحصاءاته ومعداته لا تُحتسب.", "لذلك من يبني الهجوم والدفاع معًا يدفع الضعف مقابل نصف النتيجة: دور واحد لكل شخص."],
    rolesT: "ماذا يبني كل دور",
    roles: [
      { i: "⚔️", n: "الهجوم (قائد حشد PvP)", r: [["الأبطال", "مشاة: Amadeus / Helga · فرسان: Petra / Thrud · رماة: Vivian / Rosa / Marlin"], ["الأجزاء", "النوع الهجومي (الحشد)"], ["معدات الحاكم + الجواهر", "المشاة (المعدات = دفاع، الجواهر = صحة) > جواهر الرماة (فتك) > معدات الرماة > الفرسان"], ["معدات الأبطال", "أبطال المشاة: القفازات والدرع (صحة) · الفرسان والرماة: الخوذة والحذاء (فتك)"], ["أيضًا", "سعة الحشد"]] },
      { i: "🛡️", n: "الدفاع (قائد الحامية)", r: [["الأبطال", "مشاة: Eric / Alcar / Long Fei / Zoe · فرسان: Jabel / Hilde / Margot · رماة: Jaeger / Saul"], ["الأجزاء", "النوع الدفاعي (الحامية)"], ["معدات الحاكم + الجواهر", "نفس ترتيب الهجوم"], ["معدات الأبطال", "مثل الهجوم"], ["أيضًا", "أعلى سعة حامية في التحالف — الحامية تستخدم إحصاءات من يقدّم أكبر سعة"]] },
      { i: "🐻", n: "قائد الدب", r: [["الأبطال", "أبطال الرماة هم الأهم: Vivian / Rosa / Marlin · فرسان: Petra · مشاة: Amadeus"], ["الأجزاء", "النوع الهجومي (الحشد) — الدب حشد أيضًا"], ["معدات الحاكم + الجواهر", "الرماة >> الفرسان > المشاة"], ["معدات الأبطال", "أبطال الرماة: الخوذة والحذاء"], ["ملاحظة", "الدب لا يهاجم: المهارات الدفاعية مهدرة"]] },
      { i: "👥", n: "الجميع (المنضمون)", r: [["الأبطال", "فقط مهارة البطل الأول العلوية اليمنى تُحتسب: Chenko وAmane وYeonwoo (في PvP أيضًا Gordon وغيره من الدفاعيين)"], ["الأجزاء", "غير لازمة — لا تعمل عند الانضمام"], ["معدات الحاكم", "لا عجلة — فقط لمسيراتك ومدينتك"], ["أيضًا", "مستوى القوات وعددها وسعة المسيرة"]] },
    ],
    noteT: "معلومات مفيدة",
    notes: ["معدات الأبطال ومكافآت القوات تُحتسب فقط عندما يسير ذلك البطل — طوّر فقط الأبطال الثلاثة الذين تقود بهم.", "قادة الهجوم والدفاع يحتاجون نفس الإحصاءات بنفس الترتيب (المعركة متماثلة)؛ الفرق في الأبطال ونوع الأجزاء.", "قائد الدب يمكن أن يكون نفس قائد الهجوم (كلاهما أجزاء حشد)، لكن ترتيب القوات في معدات الحاكم مختلف (رماة مقابل مشاة).", "المنضمون: تُحتسب أول 4 أشخاص لديهم بطل فقط؛ أفضل خليط مهارتا هجوم ومهارتا فتك."],
    f2pT: "اللاعبون المجانيون: بهذا الترتيب",
    f2p: ["أجزاء Jabel إلى الحد الأقصى — مجانية ومفيدة دائمًا في الحامية.", "أبطال الانضمام Chenko وAmane وYeonwoo: المهارة العلوية اليمنى إلى المستوى 5 — الأرخص والأكثر استخدامًا.", "بطل واحد بأجزاء هجومية: Petra (عجلة الأبطال).", "ركّز الأجزاء على 2–3 أبطال ولا تفرّقها (275 لبطل واحد بالحد الأقصى)."],
    askT: "ما نحتاج أن نقرره معًا",
    ask: ["كم قائد هجوم وكم قائد دفاع نريد؟", "من يريد أي دور؟ (الأسماء بعد الاتفاق)", "نسبة قوات الحامية: هل «60/40» تعني مشاة 60 والباقي 40؟"],
    cards: "🃏 تقييم كل بطل لكل دور ← بطاقات الأبطال", src: "من تحليلنا لتقارير المعارك ومهارات الأبطال (31/10/2026). الأرقام من لقطات اللعبة." },
  ko: { title: "🧭 육성 방향", intro: "먼저 합의할 제안 — 집결 대장과 방어 대장을 어떻게 키울지. 아직 아무것도 정하지 않았고, 명단도 없어요.",
    whyT: "왜 역할을 나누나",
    why: ["집결과 방어는 대장의 능력치, 영웅, 전용 장비, 영주 장비만 써요.", "집결원은 첫 번째 영웅의 오른쪽 위 원정 스킬만 더해요 — 자기 능력치와 장비는 계산되지 않아요.", "그래서 한 사람이 공격과 방어를 둘 다 키우면 두 배를 쓰고 절반만 얻어요: 한 사람 한 역할."],
    rolesT: "역할별로 키울 것",
    roles: [
      { i: "⚔️", n: "공격 (PvP 집결 대장)", r: [["영웅", "보병: 아마데우스 / 헬가 · 기병: Petra / Thrud · 궁병: Vivian / Rosa / Marlin"], ["부속품", "공격형 (집결)"], ["영주 장비 + 보석", "보병 (장비 = 방어, 보석 = HP) > 궁병 보석 (파괴력) > 궁병 장비 > 기병"], ["영웅 장비", "보병 영웅: 장갑, 갑옷 (HP) · 기병/궁병 영웅: 투구, 신발 (파괴력)"], ["그 외", "집결 용량"]] },
      { i: "🛡️", n: "방어 (방어 대장)", r: [["영웅", "보병: 에릭 / Alcar / Long Fei / 조이 · 기병: 제이벨 / 힐데 / Margot · 궁병: 예거 / Saul"], ["부속품", "방어형 (방어)"], ["영주 장비 + 보석", "공격과 같은 순서"], ["영웅 장비", "공격과 같음"], ["그 외", "연맹 최고 방어 용량 — 방어는 용량을 가장 많이 준 사람의 능력치를 써요"]] },
      { i: "🐻", n: "곰 사냥 대장", r: [["영웅", "궁병 영웅이 가장 중요: Vivian / Rosa / Marlin · 기병: Petra · 보병: 아마데우스"], ["부속품", "공격형 (집결) — 곰도 집결이에요"], ["영주 장비 + 보석", "궁병 >> 기병 > 보병"], ["영웅 장비", "궁병 영웅: 투구, 신발"], ["참고", "곰은 반격하지 않아요: 방어 스킬은 낭비"]] },
      { i: "👥", n: "나머지 (집결원)", r: [["영웅", "첫 번째 영웅의 오른쪽 위 스킬만 계산돼요: 첸코, 아마네, 연우 (PvP: 고든 등 방어형도)"], ["부속품", "필요 없음 — 집결원일 땐 효과 없음"], ["영주 장비", "급하지 않음 — 내 행군과 내 도시에만 영향"], ["그 외", "병종 등급, 병력 수, 행군 용량"]] },
    ],
    noteT: "알아 두면 좋은 것",
    notes: ["영웅 장비와 병종 보너스는 그 영웅이 출전할 때만 계산돼요 — 대장으로 데려갈 3명만 키우세요.", "공격 대장과 방어 대장은 같은 능력치를 같은 순서로 필요로 해요 (전투가 대칭); 다른 건 영웅과 부속품 종류.", "곰 사냥 대장은 공격 대장과 같은 사람이어도 돼요 (둘 다 집결 부속품), 다만 영주 장비 병종 순서가 달라요 (궁병 vs 보병).", "집결원: 영웅을 데려간 앞의 4명만 계산; 공격 2 + 파괴력 2 스킬이 최고 조합."],
    f2pT: "무과금: 이 순서로",
    f2p: ["제이벨 부속품 최대 — 무료이고 방어에 항상 유용.", "집결원 영웅 첸코, 아마네, 연우: 오른쪽 위 스킬 Lv5 — 가장 싸고 가장 많이 써요.", "공격형 부속품 영웅 한 명: Petra (영웅 룰렛).", "부속품 재료는 2–3명에게 모으고 나누지 마세요 (한 명 최대에 275개)."],
    askT: "함께 정할 것",
    ask: ["공격 대장 몇 명, 방어 대장 몇 명?", "누가 어떤 역할을 원하나요? (합의 후에 명단)", "방어 병종 비율: “60/40”은 보병 60, 나머지 40인가요?"],
    cards: "🃏 역할별 영웅 평가 → 영웅 카드", src: "우리 전투 보고서와 영웅 스킬 분석 (2026-10-31). 숫자는 게임 스크린샷 기준." },
};
let lang = OFFICER.lang || "en";
const t = () => T[lang] || T.en;
const ul = (a) => `<ul class="gr-ul">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
function render() {
  const L = t(), root = $("gr_root"); if (!root) return;
  const site = { zh: "zh", en: "en", pt: "pt", ar: "ar", ko: "ko" }[lang] || "en";
  root.innerHTML = `
    <div class="card"><h3>${esc(L.whyT)}</h3>${ul(L.why)}</div>
    <h3 class="gr-h">${esc(L.rolesT)}</h3>
    <div class="gr-roles">${L.roles.map((r) => `<div class="card gr-role"><h4>${r.i} ${esc(r.n)}</h4><dl>${r.r.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl></div>`).join("")}</div>
    <div class="card"><h3>${esc(L.noteT)}</h3>${ul(L.notes)}</div>
    <div class="card"><h3>${esc(L.f2pT)}</h3><ol class="gr-ul">${L.f2p.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
    <div class="card gr-ask"><h3>${esc(L.askT)}</h3><ol class="gr-ul">${L.ask.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
    <p><a class="btn" href="./#/${site}/hero-cards" target="_blank" rel="noopener">${esc(L.cards)}</a></p>
    <p class="muted" style="font-size:12.5px">${esc(L.src)}</p>`;
}
function applyTexts() { if ($("gr_title")) { $("gr_title").textContent = t().title; $("gr_intro").textContent = t().intro; } }
function init() { applyTexts(); render(); }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.growth = { init, applyTexts, setLang };
})();
