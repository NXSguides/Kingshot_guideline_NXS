/* 🩹 Battle losses — research report (Sherry's research from battle reports; Project doc claude/kingshot-battle-rules.md rules 1–3, 6, 8–9, 12, 14–15, 24, 29).
   Not official. Read-only text, no member data. Names follow data/terms.js. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-12";
/* battle type: [lost, injured, lightly injured] % of the troops that fall, for the attacker and the defender;
   in every battle, injured troops that don't fit in the Infirmary become losses; mid: only one report so far */
const TYPES = [
  { k: "city", a: [35, 10, 55], d: [0, 35, 65] },
  { k: "field", a: [0, 35, 65], d: [0, 35, 65] },
  { k: "bld", a: [0, 35, 65], d: [0, 35, 65] },
  { k: "sword", a: [0, 45, 55], d: [0, 35, 65] },
  { k: "op1", a: [0, 10, 90], d: [0, 10, 90], both: 1 },
  { k: "op2", a: [0, 20, 80], d: [0, 20, 80], both: 1 },
  { k: "op3", a: [0, 30, 70], d: [0, 30, 70], both: 1 },
  { k: "op4", a: [10, 30, 60], d: [10, 30, 60], both: 1 },
  { k: "sanct", a: [0, 30, 70], d: [0, 30, 70] },
  { k: "terror", a: [0, 0, 100], d: null },
];
const T = {
  en: { title: "🩹 Battle losses", badge: "🔬 Our research · updated {d}",
    obsH: "🔎 What we saw", obs: ["Troops that fall go one of three ways: lightly injured (out of this fight, but they stay with the march and can fight again — except when defending a building such as a Sanctuary, Outpost or King's Castle: there they are sent home — no healing needed — so the garrison gets thinner with each attack), injured (in the Infirmary, can be healed), or lost (gone).",
      "In any battle, once your Infirmary is full, the injured that don't fit are lost. Apart from that, troops are lost only when you attack someone's Town (35% of the troops that fall) or fight over a Lv. 4 Outpost (10%).",
      "When the defending side of a report shows losses, their Infirmary was full."],
    doH: "💡 Suggestions", do: ["Before you can be attacked, heal your injured so the Infirmary has room.", "Holding a building: refill the garrison between attacks — the lightly injured have gone home.", "Before attacking a Town, count on 35% of the fallen troops not coming back."],
    tH: "Where fallen troops go", both: "Both sides", atk: "Attacker", def: "Defender", leg: ["Lost", "Injured", "Lightly injured"],
    types: { city: "Attacking a Town", field: "Attacking gatherers or troops on the map", bld: "Rally on a building, or garrison", sword: "Swordland Showdown", op1: "Outpost Lv. 1", op2: "Outpost Lv. 2", op3: "Outpost Lv. 3", op4: "Outpost Lv. 4", sanct: "Sanctuary, Fortress", terror: "Terror" },
    full: "Infirmary full → the rest are lost", mid: "one report", none: "—",
    cTerror: "Almost all lightly injured.",
    oH: "Also", o: ["Outposts: the higher the level, the more injured (10%, 20%, 30%); only Lv. 4 also loses troops.", "Kills = the other side's lost + injured. Lightly injured don't count.", "Injured troops enter the Infirmary from the highest tier down.", "A Town with no troops inside: no battle, nobody is hurt.", "In a rally or garrison, each person's share of the fallen follows their share of that troop type.", "Attacks hit the front line first: infantry, then cavalry, then archers — so infantry fall first and cavalry almost never fall. Archers sometimes fall before the infantry are gone: that is the enemy cavalry's Ambusher (from T7, 20% of their attacks skip infantry)."],
    howH: "🔢 How we worked it out", how: "From our own battle reports since October: the lost, injured and lightly injured counts of each side, divided by the troops that fell. The same split showed up for every troop type and tier." },
  zh: { title: "🩹 戰鬥與損兵", badge: "🔬 我們的研究 · 更新 {d}",
    obsH: "🔎 我們觀察到", obs: ["倒下的兵有三種去向：輕傷（這場打不了，但留在部隊裡，還能再用——防守遺跡、據點、王城這類建築時例外：輕傷會被送回城（回家後不用治療），所以每被打一次駐防就變薄）、受傷（進野戰醫院，治得回來）、損失（沒了）。",
      "不管哪種戰鬥，只要野戰醫院滿了，進不去的傷兵就變成損失。除此之外，只有去打別人的城（倒下的 35%）和爭奪 4 級據點（10%）會損失。",
      "戰報上守城那一邊出現損失，代表他的野戰醫院滿了。"],
    doH: "💡 建議", do: ["可能被打之前先把傷兵治好，讓野戰醫院有空位。", "守建築時，兩次進攻之間要補兵——輕傷的已經回城了。", "打城之前先算：倒下的兵有 35% 回不來。"],
    tH: "倒下的兵去哪裡", both: "雙方", atk: "進攻方", def: "防守方", leg: ["損失", "受傷", "輕傷"],
    types: { city: "打別人的城", field: "打採集中或野外的部隊", bld: "集結打建築、駐防", sword: "聖劍爭奪", op1: "1 級據點", op2: "2 級據點", op3: "3 級據點", op4: "4 級據點", sanct: "遺跡、要塞", terror: "巨獸" },
    full: "野戰醫院滿了 → 進不去的變損失", mid: "只有一場", none: "—",
    cTerror: "幾乎全部是輕傷。",
    oH: "其他", o: ["據點看等級，跟是哪一種據點無關：等級越高受傷越多（10%、20%、30%），只有 4 級還會損失。", "擊殺 ＝ 對方的損失＋受傷，輕傷不算。", "受傷的兵從最高兵等開始進野戰醫院。", "城裡沒有兵：不會開打，雙方都沒有傷亡。", "集結和駐防裡，同兵種的傷亡照每個人的兵數比例分。", "攻擊先打最前排：步兵、再騎兵、最後弓兵——所以步兵先倒，騎兵幾乎不會倒。弓兵有時比步兵先倒光，那是對方騎兵的奇襲（T7 起，20% 的攻擊會跳過步兵）。"],
    howH: "🔢 怎麼算的", how: "用我們自己十月以來的戰報：雙方的損失、受傷、輕傷數字，除以倒下的兵數。每個兵種、每個兵等都是同樣的比例。" },
  pt: { title: "🩹 Perdas em batalha", badge: "🔬 Nossa pesquisa · atualizado {d}",
    obsH: "🔎 O que observamos", obs: ["As tropas que caem têm três destinos: levemente feridas (fora desta luta, mas ficam na marcha e podem lutar de novo — menos ao defender uma construção como Santuário, Posto Avançado ou Castelo do Rei: aí voltam para casa — sem precisar de cura — e a guarnição afina a cada ataque), feridas (vão para a Enfermaria, dá para curar) ou perdidas (somem).",
      "Em qualquer batalha, com a Enfermaria cheia, as feridas que não cabem são perdidas. Fora isso, só se perde tropa ao atacar a Cidade de alguém (35% das que caem) ou disputar um Posto Avançado Nv. 4 (10%).",
      "Quando o lado defensor de um relatório mostra perdas, a Enfermaria dele estava cheia."],
    doH: "💡 Sugestões", do: ["Antes de poder ser atacado, cure seus feridos para a Enfermaria ter espaço.", "Segurando uma construção: reforce a guarnição entre os ataques — os levemente feridos já voltaram para casa.", "Antes de atacar uma Cidade, conte que 35% das tropas que caírem não voltam."],
    tH: "Para onde vão as tropas que caem", both: "Os dois lados", atk: "Atacante", def: "Defensor", leg: ["Perdas", "Feridos", "Levemente Feridos"],
    types: { city: "Atacar uma Cidade", field: "Atacar coletores ou tropas no mapa", bld: "Rally em construção, ou guarnição", sword: "Confronto entre Espadas", op1: "Posto Avançado Nv. 1", op2: "Posto Avançado Nv. 2", op3: "Posto Avançado Nv. 3", op4: "Posto Avançado Nv. 4", sanct: "Santuário, Fortaleza", terror: "Terror" },
    full: "Enfermaria cheia → o resto é perdido", mid: "um relatório", none: "—",
    cTerror: "Quase todas levemente feridas.",
    oH: "Também", o: ["Postos Avançados: quanto maior o nível, mais feridos (10%, 20%, 30%); só o Nv. 4 também perde tropas.", "Mortes = perdidas + feridas do outro lado. Levemente feridas não contam.", "As feridas entram na Enfermaria a partir do nível mais alto.", "Cidade sem tropas dentro: não há batalha, ninguém se fere.", "Em rally ou guarnição, a parte de cada um nas baixas segue a parte dele naquele tipo de tropa.", "Os ataques acertam a linha de frente primeiro: infantaria, depois cavalaria, depois arqueiros — por isso a infantaria cai primeiro e a cavalaria quase nunca. Os arqueiros às vezes caem antes da infantaria acabar: é o Emboscador da cavalaria inimiga (a partir de T7, 20% dos ataques pulam a infantaria)."],
    howH: "🔢 Como calculamos", how: "Com nossos relatórios de batalha desde outubro: perdidas, feridas e levemente feridas de cada lado, divididas pelas tropas que caíram. A mesma divisão apareceu em todo tipo e nível de tropa." },
  ar: { title: "🩹 خسائر المعارك", badge: "🔬 بحثنا · آخر تحديث {d}",
    obsH: "🔎 ما لاحظناه", obs: ["القوات التي تسقط لها ثلاثة مصائر: إصابة طفيفة (خارج هذا القتال لكنها تبقى مع القوات ويمكن استخدامها مجددًا — إلا عند الدفاع عن مبنى مثل الملاذ أو المستوطنة أو قلعة الملك: هناك تُعاد إلى المدينة — دون حاجة إلى علاج — فتضعف الحامية مع كل هجوم)، مصابة (تدخل المستوصف ويمكن علاجها)، أو مفقودة (ذهبت).",
      "في أي معركة، إذا امتلأ مستوصفك يُفقد المصابون الذين لا يتسع لهم. وغير ذلك تُفقد القوات فقط عند مهاجمة مدينة أحد (35% ممن يسقطون) أو التنازع على مستوطنة من المستوى 4 (10%).",
      "إذا ظهرت خسائر عند الطرف المدافع في التقرير، فمستوصفه كان ممتلئًا."],
    doH: "💡 اقتراحات", do: ["قبل أن تتعرض للهجوم، عالج مصابيك ليبقى في المستوصف مكان.", "عند الدفاع عن مبنى: أعد تعزيز الحامية بين الهجمات — فالمصابون إصابة طفيفة عادوا إلى المدينة.", "قبل مهاجمة مدينة، احسب أن 35% من القوات التي تسقط لن تعود."],
    tH: "أين تذهب القوات التي تسقط", both: "الطرفان", atk: "المهاجم", def: "المدافع", leg: ["الخسائر", "المصابين", "الإصابات الطفيفة"],
    types: { city: "مهاجمة مدينة", field: "مهاجمة قوات تجمع أو قوات على الخريطة", bld: "حشد على مبنى، أو حامية", sword: "مواجهة أرض السيوف", op1: "مستوطنة المستوى 1", op2: "مستوطنة المستوى 2", op3: "مستوطنة المستوى 3", op4: "مستوطنة المستوى 4", sanct: "المأوى، القلعة", terror: "وحش عملاق" },
    full: "المستوصف ممتلئ ← الباقي يُفقد", mid: "تقرير واحد", none: "—",
    cTerror: "كلها تقريبًا إصابات طفيفة.",
    oH: "أيضًا", o: ["المستوطنات: كلما ارتفع المستوى زاد المصابون (10%، 20%، 30%)؛ المستوى 4 فقط يخسر قوات أيضًا.", "القتلى = مفقودو الطرف الآخر + مصابوه. الإصابات الطفيفة لا تُحسب.", "المصابون يدخلون المستوصف من أعلى مستوى أولًا.", "مدينة بلا قوات: لا معركة ولا إصابات لأحد.", "في الحشد أو الحامية، نصيب كل شخص من الساقطين بحسب نصيبه من ذلك النوع من القوات.", "الهجمات تضرب الخط الأمامي أولًا: المشاة ثم الفرسان ثم الرماة — لذلك يسقط المشاة أولًا ولا يسقط الفرسان تقريبًا. أحيانًا يسقط الرماة قبل انتهاء المشاة: هذا هو المتربص لدى فرسان العدو (من T7، 20% من هجماتهم تتخطى المشاة)."],
    howH: "🔢 كيف حسبناها", how: "من تقارير معاركنا منذ أكتوبر: أعداد المفقودين والمصابين والإصابات الطفيفة لكل طرف، مقسومة على القوات التي سقطت. النسبة نفسها ظهرت لكل نوع ومستوى." },
  ko: { title: "🩹 전투와 손실", badge: "🔬 우리 연구 · 업데이트 {d}",
    obsH: "🔎 우리가 관찰한 것", obs: ["쓰러진 병력은 세 갈래야: 경상(이번 싸움에서는 빠지지만 부대에 남아서 다시 쓸 수 있음 — 단, 유적·거점·왕성 같은 건물을 지킬 때는 성으로 돌아가서(치료는 필요 없음) 공격받을 때마다 주둔이 얇아짐), 부상(야전 병원에 들어가고 치료 가능), 손실(사라짐).",
      "어떤 전투든 야전 병원이 꽉 차면 들어가지 못한 부상병은 손실이 돼. 그 밖에는 남의 도시를 공격할 때(쓰러진 병력의 35%)와 Lv.4 거점을 다툴 때(10%)만 병력을 잃어.",
      "전투 보고서에서 수비 쪽에 손실이 있으면, 그쪽 야전 병원이 꽉 찼던 거야."],
    doH: "💡 제안", do: ["공격받을 수 있으면 미리 부상병을 치료해서 야전 병원에 자리를 남겨.", "건물을 지킬 때는 공격 사이에 병력을 채워 — 경상 병력은 이미 성으로 돌아갔어.", "도시를 공격하기 전에, 쓰러지는 병력의 35%는 못 돌아온다고 계산해."],
    tH: "쓰러진 병력이 가는 곳", both: "양쪽", atk: "공격 측", def: "수비 측", leg: ["손실", "부상", "경상"],
    types: { city: "남의 도시 공격", field: "채집 중이거나 지도 위의 부대 공격", bld: "건물 집결, 또는 수비", sword: "성검 쟁탈", op1: "거점 Lv.1", op2: "거점 Lv.2", op3: "거점 Lv.3", op4: "거점 Lv.4", sanct: "유적, 성채", terror: "괴수" },
    full: "야전 병원이 꽉 차면 → 나머지는 손실", mid: "보고서 1건", none: "—",
    cTerror: "거의 전부 경상이야.",
    oH: "그 밖에", o: ["거점은 종류와 상관없이 레벨로 정해져: 레벨이 높을수록 부상이 많아(10%, 20%, 30%); Lv.4만 손실도 있어.", "처치 = 상대의 손실 + 부상. 경상은 안 세.", "부상병은 높은 등급부터 야전 병원에 들어가.", "병력이 없는 도시: 전투가 안 일어나고 아무도 안 다쳐.", "집결이나 수비에서는 같은 병종의 피해를 각자 병력 비율대로 나눠.", "공격은 맨 앞줄부터 쳐: 보병, 그다음 기병, 마지막 궁병 — 그래서 보병이 먼저 쓰러지고 기병은 거의 안 쓰러져. 궁병이 가끔 보병보다 먼저 다 쓰러지는 건 상대 기병의 기습 때문이야 (T7부터, 공격의 20%가 보병을 건너뜀)."],
    howH: "🔢 어떻게 계산했는지", how: "10월부터 우리 전투 보고서로: 양쪽의 손실, 부상, 경상 수를 쓰러진 병력으로 나눴어. 모든 병종, 모든 등급에서 같은 비율이었어." },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const CLS = ["lost", "inj", "light"];
const bar = (p) => `<div class="ls-bar">${p.map((v, i) => v ? `<span class="ls-seg ${CLS[i]}" style="flex:${v}">${v}%</span>` : "").join("")}</div>`;
const side = (ty, s, both) => { const p = ty[s]; if (!p) return `<div class="ls-side"><span class="ls-who">${esc(t(s === "a" ? "atk" : "def"))}</span><span class="muted">${esc(t("none"))}</span></div>`;
  return `<div class="ls-side"><span class="ls-who">${esc(t(both ? "both" : s === "a" ? "atk" : "def"))}</span>${ty.k === "terror" ? `<span class="ls-txt">${esc(t("cTerror"))}</span>` : bar(p)}</div>`; };

function render() {
  const root = $("ls_root"); if (!root) return;
  root.innerHTML = `
  <div class="muted ls-small" style="margin:2px 0 10px">${esc(t("badge").replace("{d}", UPDATED))}</div>
  <div class="card rs-do"><h3>${esc(t("obsH"))}</h3><ul class="rs-dol">${t("obs").map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3 class="rs-h2">${esc(t("doH"))}</h3><ul class="rs-dol">${t("do").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("tH"))}</h3>
    <div class="ls-leg">${t("leg").map((x, i) => `<span><i class="ls-dot ${CLS[i]}"></i>${esc(x)}</span>`).join("")}</div>
    ${TYPES.map((ty) => `<div class="ls-row"><div class="ls-name"><b>${esc(t("types")[ty.k])}</b>${ty.mid ? `<span class="ls-mid">${esc(t("mid"))}</span>` : ""}</div>${ty.both ? side(ty, "a", 1) : side(ty, "a") + (ty.d ? side(ty, "d") : "")}</div>`).join("")}</div>
  <div class="card"><h3>${esc(t("oH"))}</h3><ul class="ls-ul">${t("o").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  ${OFFICER.vidCard("ls", lang)}
  <details class="card"><summary><b>${esc(t("howH"))}</b></summary><p class="ls-small" style="margin:8px 0 0">${esc(t("how"))}</p></details>
  `;
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("ls_title")) { $("ls_title").textContent = t("title"); $("ls_intro").textContent = ""; } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ls = { init, applyTexts, setLang };
})();
