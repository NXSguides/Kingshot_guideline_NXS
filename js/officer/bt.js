/* 🐻 Bear calculator — used by the public page bear-calculator.html (which gives it OFFICER.lang / OFFICER.util / OFFICER_PAGES);
   the officer page's old #bt link now opens that page. */
/* ===== 🐻 Bear calc: split your troops between your Bear Hunt rally and your marches.
   Manual: % sliders per formation (rally = your rally capacity, marches = the join limit); a slider stops when its
   formation is full or that troop type runs out. Auto fills the formations, and they stay adjustable by hand.
   Only on this device (browser storage); nothing is uploaded. ===== */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const LS = "nxs-bt-v2";
const DEF = { troops: ["", "", ""], rally: "", join: 90000,   // rally: everyone's own number (no default); join limit 90,000
  auto: { rr: [20, 40, 40], fixN: 1, fix: [10, 10, 80], hero: 2, noHero: 2, minPct: 5, tot: "" },
  f: [{ k: "rally", c: [0, 0, 0] }] };
let S = JSON.parse(JSON.stringify(DEF));
fetch("data/limits.json?t=" + Date.now(), { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => {   // Bear Hunt join limit from the Troop limits setting
  if (!d || !(+d.bear > 0)) return; DEF.join = +d.bear;
  let saved = null; try { saved = JSON.parse(localStorage.getItem(LS)); } catch (e) {}
  if (!saved || !saved.join || +saved.join === 90000) { S.join = +d.bear; if ($("bt_join")) { $("bt_join").value = S.join; } }
}).catch(() => {});
try { const o = JSON.parse(localStorage.getItem(LS)); if (o && o.f) S = { ...S, ...o, auto: { ...DEF.auto, ...(o.auto || {}) } }; } catch (e) {}
try { const old = JSON.parse(localStorage.getItem("nxs-bt-v1")); if (old && !localStorage.getItem(LS)) { S.troops = old.troops || S.troops; S.rally = old.rally || S.rally; S.join = old.march || S.join; } } catch (e) {}
if (!S.f.length || S.f[0].k !== "rally") S.f.unshift({ k: "rally", c: [0, 0, 0] });
let lang = OFFICER.lang;
const TX = { ko: {"title": "🐻 자이언트 베어 사냥 부대 편성", "sub": "내 병력을 집결과 행군 부대에 나눠 배치합니다. 이 기기에만 저장됩니다.", "hTroops": "내 병력과 한도", "inf": "보병", "cav": "기병", "arc": "궁병", "rally": "내 집결에 들어가는 내 병력 (베라 제외)", "join": "집결 참여: 최대 병력", "hVal": "베라 (자이언트 베어 사냥 거장) — 위 집결 수치에 베라가 포함되지 않은 경우에만", "savage": "베라 스킬: 자이언트 베어 사냥 행군 수용량 (집결 내 내 부대에 레벨당 +3,000 — 참여자까지 포함하는 전체 집결 규모가 아님)", "locked": "미해금", "eff": "아래에 적용되는 자이언트 베어 사냥 규모: 집결 {r} · 행군 부대당 {j}", "hAuto": "⚡ 자동 분배", "autoNote": "아래 편성을 채웁니다 (기존 편성을 대체). 이후에도 모두 직접 드래그할 수 있습니다.", "rr": "집결 비율", "fix": "고정 비율 부대", "fixAuto": "가능한 만큼", "pre": "집결 대장 구성 (자이언트 베어 사냥 가이드)", "preNone": "— 내 비율 —", "preGen": "제{n}세대", "tag_best": "최적", "tag_alt": "대안", "tag_f2p": "F2P", "preHeroes": "영웅", "preHint": "영웅 세대와 구성을 고르면 집결 비율이 채워집니다 — 직접 입력해도 됩니다.", "hero": "영웅이 있는 부대 (가득, 혼합)", "rest": "영웅이 없는 부대 (모두 동일, 남은 병력을 전부 나눔)", "tot": "내 행군 대열 수 (내 집결도 하나 사용) — 전부 채움; 비우면 제한 없음", "totNote": "→ 집결 + 고정 비율 {f} + 영웅 있음 {h} + 영웅 없음 {n}", "min": "이후 각 부대의 병종별 최소 비율", "run": "⚡ 지금 자동 분배", "ran": "완료 — 필요하면 아래에서 직접 조정하세요.", "fitN": "집결을 가득 채운 뒤 {r} 비율로 {n}개 부대를 채울 수 있습니다 — {t}이(가) 가장 먼저 부족해집니다.", "fitMore": "한 부대를 더 채우려면 {t} {x}명이 더 필요합니다: 집결에서 빼고 (집결의 {t} −{p}%) 다른 병종으로 집결을 채우세요.", "fitNo": "한 부대를 더 채우려면 집결에서 빼더라도 {t}이(가) {x}명 부족합니다.", "notRatio": "{r} 비율이 아님 — 한 병종이 부족해 다른 병종으로 채웠습니다.", "use": "사용", "left": "남음", "fRally": "👑 집결 (내가 주도)", "fMarch": "부대 {n}", "tFix": "고정 비율", "tHero": "영웅", "tNo": "영웅 없음", "total": "합계", "full": "가득", "of": "/", "add": "+ 부대 추가", "copy": "📋 복사", "copied": "복사됨 ✓", "del": "삭제", "over": "⚠️ 보유 병력 초과", "hHow": "사용 방법", "how": ["각 편성에는 병종마다 슬라이더가 있고, 단위는 해당 편성 규모 대비 %입니다: 집결은 내 집결 수용량, 각 부대는 집결 참여 한도 기준. 세 병종의 합은 100%를 넘을 수 없습니다.", "편성이 가득 차거나 해당 병종이 바닥나면 슬라이더가 멈춥니다 — 맨 위 막대에 사용량과 남은 양이 표시됩니다.", "슬라이더 옆 칸에 %를 입력하면 정확한 수치를 맞출 수 있고, 오른쪽에 병력 수가 표시됩니다.", "⚡ 자동 분배: 집결 (가득, 설정 비율) → 고정 비율 부대 (가득) → 영웅 부대 (가득, 남은 병력과 같은 비율) → 영웅 없는 부대가 남은 병력을 모두 똑같이 나눔. 이후 모든 부대는 병종별로 설정한 % 이상을 유지하므로 궁병 없이 출발하는 부대가 없습니다.", "영웅 없는 부대까지 참여 한도를 넘을 때만 병력이 성에 남습니다 — 보병부터, 다음은 기병."]},
 ar: {"title": "🐻 تشكيلات صيد الدببة", "sub": "وزّع قواتك بين حشدك وزحوفك. يُحفظ على هذا الجهاز فقط.", "hTroops": "قواتك وحدودك", "inf": "المشاة", "cav": "الفرسان", "arc": "الرماة", "rally": "قواتك الخاصة في حشدك (بدون Valora)", "join": "الانضمام إلى حشد: الحد الأقصى للقوات", "hVal": "Valora (سيدة صيد الدببة) — فقط إذا كان رقم الحشد أعلاه لا يشملها", "savage": "مهارة Valora: سعة زحف صيد الدببة (+3,000 / مستوى لزحفك الخاص في الحشد — وليس حجم الحشد كله الذي يشمل المنضمين)", "locked": "غير مفتوح", "eff": "أحجام صيد الدببة المستخدمة أدناه: الحشد {r} · كل زحف {j}", "hAuto": "⚡ توزيع تلقائي", "autoNote": "يملأ التشكيلات أدناه (يستبدلها). يمكنك سحب كل شيء بعد ذلك.", "rr": "نسبة الحشد", "fix": "زحوف بنسبة ثابتة", "fixAuto": "أكبر عدد ممكن", "pre": "إعداد قائد الحشد (دليل صيد الدببة)", "preNone": "— نسبتي الخاصة —", "preGen": "الجيل {n}", "tag_best": "الأفضل", "tag_alt": "بديل", "tag_f2p": "F2P", "preHeroes": "الأبطال", "preHint": "اختر جيل الأبطال والإعداد لملء نسبة الحشد — ويمكنك كتابة نسبتك الخاصة.", "hero": "زحوف مع بطل (كاملة، مختلطة)", "rest": "زحوف بدون بطل (متطابقة، تتقاسم كل الباقي)", "tot": "عدد طابور القوات المتقدمة لديك (حشدك يستخدم واحدًا) — يملؤها كلها؛ فارغ = بلا حد", "totNote": "← الحشد + {f} بنسبة ثابتة + {h} مع بطل + {n} بدون بطل", "min": "كل زحف لاحق يحتفظ من كل نوع بما لا يقل عن", "run": "⚡ وزّع تلقائيًا الآن", "ran": "تم — عدّل يدويًا أدناه إن أردت.", "fitN": "بعد حشد كامل يمكنك ملء {n} زحف بنسبة {r} — {t} تنفد أولًا.", "fitMore": "زحف إضافي يحتاج {x} من {t} إضافية: خذها من الحشد ({t} فيه −{p}%) واملأ الحشد بقوات أخرى.", "fitNo": "زحف إضافي يحتاج {x} من {t} أكثر مما لديك، حتى مع أخذها من الحشد.", "notRatio": "ليست {r} — لا يكفي أحد الأنواع، فتم سد النقص بأنواع أخرى.", "use": "مستخدم", "left": "متبقٍ", "fRally": "👑 الحشد (أنت القائد)", "fMarch": "الزحف {n}", "tFix": "نسبة ثابتة", "tHero": "بطل", "tNo": "بلا بطل", "total": "المجموع", "full": "كامل", "of": "من", "add": "+ إضافة زحف", "copy": "📋 نسخ", "copied": "تم النسخ ✓", "del": "إزالة", "over": "⚠️ أكثر مما لديك", "hHow": "طريقة العمل", "how": ["لكل تشكيل شريط تمرير لكل نوع من القوات، بنسبة % من حجمه: سعة حشدك للحشد، وحد الانضمام لكل زحف. لا يمكن أن يتجاوز مجموع الثلاثة 100%.", "يتوقف شريط التمرير عندما يمتلئ التشكيل أو ينفد ذلك النوع من القوات — يوضح الشريط في الأعلى ما استُخدم وما تبقى.", "اكتب % في الخانة بجانب شريط التمرير للحصول على أرقام دقيقة؛ ويظهر عدد القوات على اليمين.", "⚡ التوزيع التلقائي: الحشد (كامل، بنسبته) ← زحوف النسبة الثابتة (كاملة) ← زحوف الأبطال (كاملة، بنفس مزيج الباقي) ← الزحوف بلا بطل تتقاسم كل الباقي، وكلها متطابقة. كل زحف لاحق يحتفظ على الأقل بالنسبة % المحددة من كل نوع، فلا يخرج أي زحف بدون رماة.", "فقط إذا كانت حتى الزحوف بلا بطل ستتجاوز حد الانضمام تبقى بعض القوات في المدينة — المشاة أولًا، ثم الفرسان."]},
 pt: {"title": "🐻 Formações da Caça ao Urso", "sub": "Divida suas tropas entre o seu rally e as suas marchas. Salvo só neste aparelho.", "hTroops": "Suas tropas e limites", "inf": "Infantaria", "cav": "Cavalaria", "arc": "Arquearia", "rally": "Suas próprias tropas no seu rally (sem a Valora)", "join": "Entrar num rally: máximo de tropas", "hVal": "Valora (Mestre da Caça ao Urso) — só se o número do seu rally acima não a incluir", "savage": "Habilidade da Valora: capacidade da marcha na Caça ao Urso (+3.000 / Nv na sua própria marcha dentro do rally — não no tamanho total do rally, que conta quem entra)", "locked": "Não desbloqueada", "eff": "Tamanhos da Caça ao Urso usados abaixo: rally {r} · cada marcha {j}", "hAuto": "⚡ Divisão automática", "autoNote": "Preenche as formações abaixo (substitui o que houver). Depois você ainda pode arrastar tudo.", "rr": "Proporção do rally", "fix": "Marchas com proporção fixa", "fixAuto": "quantas couberem", "pre": "Configuração do líder do rally (guia da Caça ao Urso)", "preNone": "— minha própria proporção —", "preGen": "Ger {n}", "tag_best": "Melhor", "tag_alt": "Alternativa", "tag_f2p": "F2P", "preHeroes": "Heróis", "preHint": "Escolha a geração dos seus heróis e a configuração para preencher a proporção do rally — você ainda pode digitar a sua.", "hero": "Marchas com herói (cheias, mistas)", "rest": "Marchas sem herói (iguais, dividem TODO o resto)", "tot": "Suas Filas de Marcha (seu próprio rally usa uma) — preenche todas; vazio = sem limite", "totNote": "→ rally + {f} de proporção fixa + {h} com herói + {n} sem herói", "min": "Cada marcha seguinte mantém cada tipo em pelo menos", "run": "⚡ Dividir agora", "ran": "Pronto — ajuste à mão abaixo se quiser.", "fitN": "Depois de um rally cheio você consegue encher {n} marcha(s) em {r} — {t} acaba primeiro.", "fitMore": "Mais uma precisaria de mais {x} de {t}: tire do rally (o {t} dele −{p}%) e complete o rally com outras tropas.", "fitNo": "Mais uma precisaria de mais {x} de {t} do que você tem, mesmo tirando do rally.", "notRatio": "Não é {r} — faltou um tipo, então o espaço foi completado com outros.", "use": "Usado", "left": "restante", "fRally": "👑 Rally (você lidera)", "fMarch": "Marcha {n}", "tFix": "proporção fixa", "tHero": "herói", "tNo": "sem herói", "total": "Total", "full": "cheia", "of": "de", "add": "+ Adicionar marcha", "copy": "📋 Copiar", "copied": "Copiado ✓", "del": "Remover", "over": "⚠️ Mais do que você tem", "hHow": "Como funciona", "how": ["Cada formação tem um controle deslizante por tipo de tropa, em % do tamanho dela: a capacidade do seu rally para o rally, o limite de entrada para cada marcha. Os três não podem somar mais de 100%.", "Um controle para de mexer quando a formação está cheia ou quando aquele tipo de tropa acabou — a barra no topo mostra o que foi usado e o que sobrou.", "Digite um % na caixa ao lado de um controle para números exatos; a quantidade de tropas aparece à direita.", "⚡ Divisão automática: rally (cheio, na proporção dele) → marchas com proporção fixa (cheias) → marchas com herói (cheias, com a mesma mistura do que sobrou) → as marchas sem herói dividem tudo o que sobrou, todas iguais. Cada marcha seguinte mantém pelo menos o % definido de cada tipo, então nenhuma sai sem arqueiros.", "Só se até as marchas sem herói passarem do limite de entrada é que tropas ficam em casa — primeiro infantaria, depois cavalaria."]},

  en: { title: "🐻 Bear Hunt formations", sub: "Split your troops between your rally and your marches. Saved on this device only.",
    hTroops: "Your troops & limits", inf: "Infantry", cav: "Cavalry", arc: "Archers", rally: "Your own troops in your rally (without Valora)", join: "Joining a rally: max troops",
    hVal: "Valora (Bear Hunt Master) — only if your rally number above doesn't include her", savage: "Valora skill: Bear Hunt march capacity (+3,000 / Lv to your own march in the rally — not the whole rally's size, which counts the joiners)", locked: "Not unlocked",
    eff: "Bear Hunt sizes used below: rally {r} · each march {j}",
    hAuto: "⚡ Auto split", autoNote: "Fills the formations below (replaces them). You can still drag everything afterwards.",
    rr: "Rally ratio", fix: "Fixed-ratio marches", fixAuto: "as many as fit",
    pre: "Rally leader setup (Bear Hunt guide)", preNone: "— my own ratio —", preGen: "Gen {n}", tag_best: "Best", tag_alt: "Alternative", tag_f2p: "F2P",
    preHeroes: "Heroes", preHint: "Pick your hero generation and setup to fill the rally ratio — you can still type your own.", hero: "Marches with a hero (full, mixed)", rest: "Marches without a hero (identical, share ALL the rest)", tot: "Your March Queues (your own rally uses one) — fills them all; empty = no limit", totNote: "→ rally + {f} fixed-ratio + {h} with a hero + {n} without a hero", min: "Each later march keeps each type at least",
    run: "⚡ Auto split now", ran: "Done — adjust by hand below if you like.",
    fitN: "After a full rally you can fill {n} march(es) at {r} — {t} run out first.", fitMore: "One more would need {x} more {t}: take them out of the rally (its {t} −{p}%) and fill the rally with other troops.",
    fitNo: "One more would need {x} more {t} than you have, even taking them out of the rally.", notRatio: "Not {r} — not enough of one type, so the gap was filled with others.",
    use: "Used", left: "left", fRally: "👑 Rally (you lead)", fMarch: "March {n}", tFix: "fixed ratio", tHero: "hero", tNo: "no hero",
    total: "Total", full: "full", of: "of", add: "+ Add march", copy: "📋 Copy", copied: "Copied ✓", del: "Remove",
    over: "⚠️ More than you have", hHow: "How it works",
    how: ["Each formation has one slider per troop type, in % of its size: your rally capacity for the rally, the join limit for every march. The three can't add up to more than 100%.",
      "A slider stops moving when the formation is full or that troop type has run out — the bar at the top shows what is used and what is left.",
      "Type a % in the box next to a slider for exact numbers; the troop count is shown on the right.",
      "⚡ Auto split: rally (full, its ratio) → fixed-ratio marches (full) → hero marches (full, same mix as what is left) → no-hero marches share everything left, all identical. Every later march keeps at least the set % of each type, so none goes out without archers.",
      "Only if even the no-hero marches would be over the join limit do troops stay home — infantry first, then cavalry."] },
  zh: { title: "🐻 狩獵巨熊部隊編組", sub: "把你的士兵分配到自己發的集結和其他隊伍。只存在這台裝置。",
    hTroops: "你的士兵和上限", inf: "步兵", cav: "騎兵", arc: "弓兵", rally: "你自己能帶進集結的兵數（不含維拉）", join: "參與集結的人數上限",
    hVal: "維拉（狩獵巨熊大師）— 上面的集結人數沒算到她才需要填", savage: "維拉技能：參與狩獵巨熊時的出征部隊容量（你自己帶進集結的兵 +3,000／級；不是整個集結的人數，那個包含別人）", locked: "未解鎖",
    eff: "下面實際用的狩獵巨熊人數：集結 {r} · 每隊 {j}",
    hAuto: "⚡ 全自動分配", autoNote: "會把下面的編組全部重新填好（取代原本的），之後還是可以手動拉。",
    rr: "集結比例", fix: "固定比例的隊伍", fixAuto: "能湊幾隊就幾隊",
    pre: "集結隊長陣容（狩獵巨熊攻略）", preNone: "— 自己填比例 —", preGen: "第 {n} 代", tag_best: "最佳", tag_alt: "替代", tag_f2p: "F2P",
    preHeroes: "英雄", preHint: "選英雄世代和陣容會自動填好集結比例，也可以自己改。", hero: "有英雄的隊伍（滿編，混合）", rest: "沒英雄的隊伍（一模一樣，平分全部剩下的）", tot: "你有幾個行軍隊伍（你自己的集結也佔一個）— 自動全部填滿；空白＝不限", totNote: "→ 集結 + 固定比例 {f} 隊 + 有英雄 {h} 隊 + 沒英雄 {n} 隊", min: "後面每隊每種兵至少",
    run: "⚡ 立即自動分配", ran: "好了 — 可以在下面再手動調整。",
    fitN: "集結填滿之後，還能湊 {n} 隊滿編的 {r} — {t}最先不夠。", fitMore: "要多湊 1 隊，還差 {x} {t}：從集結裡拿出來（集結的{t} −{p}%），集結改用其他兵種補滿。",
    fitNo: "要多湊 1 隊還差 {x} {t}，就算從集結拿出來也不夠。", notRatio: "不是 {r} — 某種兵不夠，缺的用其他兵種補上了。",
    use: "已用", left: "剩", fRally: "👑 集結（你發的）", fMarch: "隊伍 {n}", tFix: "固定比例", tHero: "有英雄", tNo: "沒英雄",
    total: "合計", full: "滿", of: "／", add: "＋ 加一隊", copy: "📋 複製", copied: "已複製 ✓", del: "刪除",
    over: "⚠️ 超過你有的兵", hHow: "怎麼用",
    how: ["每一組每種兵各有一條拉條，單位是那一組人數的 %：集結用你能發出的集結人數，其他隊伍用參與集結上限。三種加起來不能超過 100%。",
      "某一組滿了、或某種兵用完了，拉條就拉不動 — 最上面會即時顯示每種兵用了多少、剩多少。",
      "拉條旁邊的格子可以直接輸入 %，右邊會顯示實際兵數。",
      "⚡ 全自動：集結（滿，照比例）→ 固定比例的隊伍（滿）→ 有英雄的隊伍（滿，照剩下的比例）→ 沒英雄的隊伍平分全部剩下的，每隊一模一樣。後面每隊每種兵至少留設定的 %，所以每隊都有弓兵。",
      "只有沒英雄的隊伍也超過參與上限時才會有兵留在家 — 先留步兵，再留騎兵。"] },
};
const tr = (k, v = {}) => { const s = (TX[lang] || TX.en)[k]; return typeof s === "string" ? s.replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m) : s; };
const fmtN = (n) => Number(n).toLocaleString("en-US");
const save = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} };
const owned = () => S.troops.map((x) => Math.max(0, Math.floor(+x || 0)));
/* Valora (Bear Hunt Master) skill: +3,000 per level on YOUR Bear Hunt rally (the big one). The join limit (90,000) never changes. */
const effRally = () => (+S.rally || 0) + 3000 * (+S.savage || 0), effJoin = () => +S.join || 0;
const size = (f) => f.k === "rally" ? effRally() : effJoin();
const used = (skip) => { const u = [0, 0, 0]; S.f.forEach((f, j) => { if (j !== skip) f.c.forEach((n, i) => (u[i] += n)); }); return u; };

/* ---- auto split (same rules as before, with any number of fixed-ratio marches) ---- */
/* rally-leader formations from the Bear Hunt guide (data/content.js → GUIDES["bear-hunt"].leaders): Gen → Best / Alternative / F2P */
let PRESETS = [];
function loadPresets() {
  try { const L = GUIDES["bear-hunt"].leaders;
    PRESETS = L.map((g, gi) => ({ gen: gi + 1, rows: g.rows.filter((r) => r.ratio).map((r) => ({ tag: r.tag, heroes: r.heroes.filter(Boolean), ratio: r.ratio.split("-").map(Number) })) })).filter((g) => g.rows.length);
  } catch (e) { PRESETS = []; }
}
const heroName = (h) => { try { return (HEROES[h] && (HEROES[h][lang] || HEROES[h].en)) || h; } catch (e) { return h; } };
function renderPresets() {
  const gs = $("bt_preGen"), ts = $("bt_preTag"); if (!gs) return;
  const box = gs.closest(".bt-pre"); box.hidden = !PRESETS.length; if (!PRESETS.length) return;
  const [g0, t0] = String(S.auto.preset || "").split("-");
  gs.innerHTML = `<option value="">${esc(tr("preNone"))}</option>` + PRESETS.map((g) => `<option value="${g.gen}"${+g0 === g.gen ? " selected" : ""}>${esc(tr("preGen", { n: g.gen }))}</option>`).join("");
  const G = PRESETS.find((g) => g.gen === +g0);
  ts.hidden = !G;
  ts.innerHTML = G ? G.rows.map((r) => `<option value="${r.tag}"${r.tag === t0 ? " selected" : ""}>${esc(tr("tag_" + r.tag))} · ${r.ratio.join(":")}</option>`).join("") : "";
  const R = G && (G.rows.find((r) => r.tag === t0) || G.rows[0]);
  $("bt_preHeroes").textContent = R ? `${tr("preHeroes")}: ${R.heroes.map(heroName).join(" + ")} → ${tr("rr")} ${R.ratio.join(":")}` : tr("preHint");
}
function applyPreset() {
  const g = +$("bt_preGen").value, G = PRESETS.find((x) => x.gen === g);
  if (!G) { S.auto.preset = ""; save(); renderPresets(); return; }
  let t = $("bt_preTag").value; if (!G.rows.some((r) => r.tag === t)) t = G.rows[0].tag;
  const R = G.rows.find((r) => r.tag === t);
  S.auto.preset = g + "-" + t; S.auto.rr = R.ratio.slice();
  ["bt_r0", "bt_r1", "bt_r2"].forEach((id, i) => ($(id).value = R.ratio[i]));
  save(); renderPresets(); readTop(); renderFit();
}
/* the most full fixed-ratio marches that fit after a full rally, keeping each later march's minimum % of every type */
function maxFix(k = S.auto.hero + S.auto.noHero) {
  const A = S.auto, L = effJoin(), per = Math.floor(L * Math.max(0, A.minPct || 0) / 100), R = effRally();
  const own = owned(), avail = own.map((x) => x - Math.min(x, k * per));
  const rs = A.rr.reduce((a, b) => a + b, 0) || 1, want = A.rr.map((r) => Math.floor(R * r / rs)); want[2] += R - want.reduce((a, b) => a + b, 0);
  const rally = want.map((w, i) => Math.min(w, avail[i])); let gap = R - rally.reduce((a, b) => a + b, 0);
  for (const i of [2, 1, 0]) { if (gap <= 0) break; const add = Math.min(gap, avail[i] - rally[i]); if (add > 0) { rally[i] += add; gap -= add; } }
  const fs = A.fix.reduce((a, b) => a + b, 0) || 1, need = A.fix.map((r) => Math.floor(L * r / fs)); need[2] += L - need.reduce((a, b) => a + b, 0);
  let n = 10; need.forEach((w, i) => { if (w > 0) n = Math.min(n, Math.floor((avail[i] - rally[i]) / w)); });
  return Math.max(0, n);
}
/* how many of each kind of march: with a March Queue total, fixed-ratio marches take what fits (or the number typed),
   hero marches as set, and no-hero marches fill the remaining queues */
function counts() {
  const A = S.auto, T = A.tot === "" || A.tot == null ? "" : Math.max(0, A.tot - 1);   // your own rally uses one March Queue
  if (T === "") return { fixN: A.fixAuto ? maxFix() : A.fixN, hero: A.hero, noHero: A.noHero };
  const hero = Math.min(A.hero, T); let fixN = 0;
  if (A.fixAuto) { for (let f = T - hero; f >= 0; f--) if (maxFix(T - f) >= f) { fixN = f; break; } }
  else fixN = Math.min(A.fixN, T - hero);
  return { fixN, hero, noHero: T - hero - fixN };
}
function showCounts() {
  const A = S.auto, on = !(A.tot === "" || A.tot == null), C = counts();
  if (A.fixAuto) $("bt_fixN").value = C.fixN;
  if (on) $("bt_rest").value = C.noHero; else if ($("bt_rest").disabled) $("bt_rest").value = A.noHero;
  $("bt_rest").disabled = on;
  $("bt_totNote").textContent = on ? tr("totNote", { f: C.fixN, h: C.hero, n: C.noHero }) : "";
}
function autoSplit() {
  const A = S.auto, C = counts(), L = effJoin(), h = C.hero, n = C.noHero, k = h + n, per = Math.floor(L * Math.max(0, A.minPct || 0) / 100);
  const pool = owned(), res = pool.map((x) => Math.min(x, k * per)), avail = pool.map((x, i) => x - res[i]);
  const fixed = (cap, ratio) => {
    const s = ratio.reduce((a, b) => a + b, 0) || 1, want = ratio.map((r) => Math.floor(cap * r / s)); want[2] += cap - want.reduce((a, b) => a + b, 0);
    const take = want.map((w, i) => Math.min(w, avail[i])); let gap = cap - take.reduce((a, b) => a + b, 0);
    for (const i of [2, 1, 0]) { if (gap <= 0) break; const add = Math.min(gap, avail[i] - take[i]); if (add > 0) { take[i] += add; gap -= add; } }
    take.forEach((x, i) => (avail[i] -= x)); return take; };
  const out = [{ k: "rally", c: fixed(effRally(), A.rr) }];
  for (let j = 0; j < C.fixN; j++) out.push({ k: "m", tag: "tFix", r: A.fix.slice(), c: fixed(L, A.fix) });
  const left = avail.map((x, i) => x + res[i]), sumL = () => left.reduce((a, b) => a + b, 0), take = (t) => { t.forEach((x, i) => (left[i] -= x)); return t; };
  const mix = (sz) => { const tot = sumL(); if (!tot) return [0, 0, 0]; const t = left.map((x) => Math.floor(sz * x / tot)); let gap = sz - t.reduce((a, b) => a + b, 0);
    for (const i of [2, 1, 0]) { const add = Math.min(gap, left[i] - t[i]); if (add > 0) { t[i] += add; gap -= add; } } return t; };
  const even = (cnt) => left.map((x) => (cnt ? Math.floor(x / cnt) : 0));
  const hero = [], no = [];
  if (sumL() <= h * L) { const t = even(h); for (let j = 0; j < h; j++) hero.push(take(t.slice())); for (let j = 0; j < n; j++) no.push([0, 0, 0]); }
  else if (sumL() - h * L <= n * L) { const t = mix(L); for (let j = 0; j < h; j++) hero.push(take(t.slice())); const u = even(n); for (let j = 0; j < n; j++) no.push(take(u.slice())); }
  else { const o = left.slice(); let over = sumL() - k * L;
    for (const i of [0, 1, 2]) { if (over <= 0) break; const cut = Math.min(over, o[i] - k * per); if (cut > 0) { o[i] -= cut; over -= cut; } }
    const t = o.map((x) => Math.floor(x / k)); let gap = L - t.reduce((a, b) => a + b, 0);
    for (const i of [2, 1, 0]) { const add = Math.min(gap, Math.floor((left[i] - t[i] * k) / k)); if (add > 0) { t[i] += add; gap -= add; } }
    for (let j = 0; j < h; j++) hero.push(take(t.slice())); for (let j = 0; j < n; j++) no.push(take(t.slice())); }
  hero.forEach((c) => out.push({ k: "m", tag: "tHero", c })); no.forEach((c) => out.push({ k: "m", tag: "tNo", c }));
  S.f = out; save(); renderForms(); $("bt_autoMsg").className = "msg okmsg"; $("bt_autoMsg").textContent = tr("ran");
}

/* ---- manual: set one type of one formation, clamped by its size (sum ≤ 100%) and by the troops still free ---- */
function setCount(j, i, want) {
  const f = S.f[j], sz = size(f), free = owned()[i] - used(j)[i];
  const room = sz - f.c.reduce((a, b, x) => a + (x === i ? 0 : b), 0);
  f.c[i] = Math.max(0, Math.min(Math.round(want), room, Math.max(0, free)));
  return f.c[i];
}
const pctOf = (f, i) => { const sz = size(f); return sz ? Math.round(f.c[i] * 1000 / sz) / 10 : 0; };
const TYPES = ["inf", "cav", "arc"];
function renderUse() {
  if ($("bt_eff")) $("bt_eff").textContent = tr("eff", { r: fmtN(effRally()), j: fmtN(effJoin()) });
  const o = owned(), u = used(-1);
  $("bt_use").innerHTML = TYPES.map((t, i) => { const p = o[i] ? Math.min(100, u[i] * 100 / o[i]) : 0, bad = u[i] > o[i];
    return `<div class="bt-u${bad ? " bad" : ""}"><div class="bt-ut"><b>${esc(tr(t))}</b><span>${esc(tr("use"))} ${fmtN(u[i])} / ${fmtN(o[i])}</span></div>
      <div class="bt-bar"><i style="width:${p}%"></i></div><div class="bt-ul">${bad ? esc(tr("over")) : `${esc(tr("left"))} ${fmtN(o[i] - u[i])}`}</div></div>`; }).join("");
}
/* how many full fixed-ratio marches (e.g. 10:10:80) are left after a full rally — and what one more would take */
function renderFit() {
  const el = $("bt_fit"); if (!el) return;
  const A = S.auto, own = owned(), L = effJoin(), R = effRally();
  if (!own.some((x) => x > 0) || !L) { el.innerHTML = ""; return; }
  const rs = A.rr.reduce((a, b) => a + b, 0) || 1, want = A.rr.map((r) => Math.floor(R * r / rs)); want[2] += R - want.reduce((a, b) => a + b, 0);
  const rally = want.map((w, i) => Math.min(w, own[i])); let gap = R - rally.reduce((a, b) => a + b, 0);
  for (const i of [2, 1, 0]) { if (gap <= 0) break; const add = Math.min(gap, own[i] - rally[i]); if (add > 0) { rally[i] += add; gap -= add; } }
  const left = own.map((x, i) => x - rally[i]), fs = A.fix.reduce((a, b) => a + b, 0) || 1, per = A.fix.map((r) => L * r / fs);
  let n = Infinity, lim = 2; per.forEach((w, i) => { if (w > 0) { const k = Math.floor(left[i] / w); if (k < n) { n = k; lim = i; } } });
  if (!isFinite(n)) { el.innerHTML = ""; return; }
  const short = Math.ceil((n + 1) * per[lim] - left[lim]), t = tr(["inf", "cav", "arc"][lim]);
  const lines = [tr("fitN", { n, r: A.fix.join(":"), t })];
  if (short > 0 && rally[lim] >= short) lines.push(tr("fitMore", { x: fmtN(short), t, p: (Math.round(short * 1000 / R) / 10) }));
  else if (short > 0) lines.push(tr("fitNo", { x: fmtN(short), t }));
  el.innerHTML = lines.map((x) => `<div>${esc(x)}</div>`).join("");
}
function formHead(f, j) {
  const sum = f.c.reduce((a, b) => a + b, 0), sz = size(f), n = S.f.slice(0, j).filter((x) => x.k === "m").length + 1;
  const name = f.k === "rally" ? tr("fRally") : tr("fMarch", { n: n + 1 }) + (f.tag ? ` · ${tr(f.tag)}` : "");
  const rs = f.r ? f.r.reduce((a, b) => a + b, 0) : 0;
  const off = rs && sum && f.c.some((x, i) => Math.abs(x * 100 / sum - f.r[i] * 100 / rs) > 0.5);
  return `${off ? `<div class="bt-warn2">⚠️ ${esc(tr("notRatio", { r: f.r.join(":") }))}</div>` : ""}<div class="bt-fh"><b>${esc(name)}</b><span class="bt-ft" data-tot="${j}"><b>${fmtN(sum)}</b> ${esc(tr("of"))} ${fmtN(sz)}${sum >= sz && sz ? ` <span class="bt-ok">✓ ${esc(tr("full"))}</span>` : ""}</span>${f.k === "rally" ? "" : `<button type="button" class="btn mini" data-del="${j}" title="${esc(tr("del"))}">✕</button>`}</div>`;
}
function renderForms() {
  $("bt_forms").innerHTML = S.f.map((f, j) => `<div class="card bt-f" data-j="${j}">${formHead(f, j)}
    ${TYPES.map((t, i) => `<div class="bt-sl"><span class="bt-sn">${esc(tr(t))}</span>
      <input type="range" min="0" max="100" step="0.1" value="${pctOf(f, i)}" data-j="${j}" data-i="${i}" class="bt-r t${i}">
      <input type="number" class="inp bt-p" min="0" max="100" step="0.1" value="${pctOf(f, i)}" data-j="${j}" data-i="${i}">%
      <span class="bt-c" data-c="${j}-${i}">${fmtN(f.c[i])}</span></div>`).join("")}</div>`).join("");
  renderUse();
}
function refreshForm(j) {   // update one card in place while dragging (keeps the slider under the finger)
  const card = $("bt_forms").querySelector(`.bt-f[data-j="${j}"]`), f = S.f[j]; if (!card) return;
  card.querySelector(".bt-fh").outerHTML = formHead(f, j);
  TYPES.forEach((_, i) => { const p = pctOf(f, i);
    card.querySelectorAll(`[data-i="${i}"]`).forEach((el) => { if (document.activeElement !== el || el.type === "range") el.value = p; });
    card.querySelector(`[data-c="${j}-${i}"]`).textContent = fmtN(f.c[i]); });
  renderUse();
}
function copyText() {
  let n = 1;
  return S.f.map((f) => { const name = f.k === "rally" ? tr("fRally") : tr("fMarch", { n: ++n }) + (f.tag ? ` · ${tr(f.tag)}` : "");
    return `${name}: ${TYPES.map((t, i) => `${tr(t)} ${fmtN(f.c[i])}`).join(" / ")} (${fmtN(f.c.reduce((a, b) => a + b, 0))})`; }).join("\n");
}
function fill() {
  ["bt_inf", "bt_cav", "bt_arc"].forEach((id, i) => ($(id).value = S.troops[i] ?? ""));
  $("bt_rally").value = S.rally; $("bt_join").value = S.join;

  const A = S.auto; ["bt_r0", "bt_r1", "bt_r2"].forEach((id, i) => ($(id).value = A.rr[i])); ["bt_m0", "bt_m1", "bt_m2"].forEach((id, i) => ($(id).value = A.fix[i]));
  $("bt_fixN").value = A.fixN; $("bt_fixAuto").checked = !!A.fixAuto; $("bt_fixN").disabled = !!A.fixAuto; $("bt_hero").value = A.hero; $("bt_rest").value = A.noHero; $("bt_min").value = A.minPct; $("bt_tot").value = A.tot ?? "";
}
function readTop() {
  const n = (id, d) => { const v = $(id).value.trim(); return v === "" ? d : Math.max(0, Number(v) || 0); };
  S.troops = ["bt_inf", "bt_cav", "bt_arc"].map((id) => $(id).value.trim());
  { const v = $("bt_rally").value.trim(); S.rally = v === "" ? "" : Math.max(0, Number(v) || 0); }
  S.join = n("bt_join", DEF.join);
  S.savage = +$("bt_savage").value || 0;
  const A = S.auto, d = DEF.auto;
  A.rr = ["bt_r0", "bt_r1", "bt_r2"].map((id, i) => n(id, d.rr[i])); A.fix = ["bt_m0", "bt_m1", "bt_m2"].map((id, i) => n(id, d.fix[i]));
  A.fixAuto = $("bt_fixAuto").checked; $("bt_fixN").disabled = A.fixAuto;
  A.fixN = A.fixAuto ? maxFix() : Math.min(10, Math.round(n("bt_fixN", d.fixN)));
  if (A.fixAuto) $("bt_fixN").value = A.fixN; A.hero = Math.min(6, Math.round(n("bt_hero", d.hero))); if (!$("bt_rest").disabled) A.noHero = Math.min(6, Math.round(n("bt_rest", d.noHero)));
  { const v = $("bt_tot").value.trim(); A.tot = v === "" ? "" : Math.min(10, Math.max(1, Math.round(Number(v) || 0))); }
  A.minPct = Math.min(30, n("bt_min", d.minPct));
  if (A.fixAuto) A.fixN = counts().fixN;   // recount once every setting is read
  showCounts();
  // a smaller size / fewer troops: trim what no longer fits
  S.f.forEach((f, j) => { TYPES.forEach((_, i) => setCount(j, i, f.c[i])); });
  save();
}
function applyTexts() {
  const lv = (sel) => Array.from({ length: 11 }, (_, i) => `<option value="${i}"${+sel === i ? " selected" : ""}>${i ? "Lv." + i : tr("locked")}</option>`).join("");
  $("bt_savage").innerHTML = lv(S.savage);   // Lv.0 = not unlocked → base capacity
  const set = (id, k) => { $(id).textContent = tr(k); };
  [["bt_title", "title"], ["bt_sub", "sub"], ["bt_hTroops", "hTroops"], ["bt_lInf", "inf"], ["bt_lCav", "cav"], ["bt_lArc", "arc"], ["bt_lRally", "rally"], ["bt_lJoin", "join"], ["bt_hVal", "hVal"], ["bt_lSavage", "savage"],
   ["bt_hAuto", "hAuto"], ["bt_autoNote", "autoNote"], ["bt_lRR", "rr"], ["bt_lPre", "pre"], ["bt_lFix", "fix"], ["bt_lFixAuto", "fixAuto"], ["bt_lHero", "hero"], ["bt_lRest", "rest"], ["bt_lMin", "min"], ["bt_lTot", "tot"],
   ["bt_run", "run"], ["bt_add", "add"], ["bt_copy", "copy"], ["bt_hHow", "hHow"]].forEach(([id, k]) => set(id, k));
  $("bt_how").innerHTML = tr("how").map((x) => `<li>${esc(x)}</li>`).join("");
  if ($("bt_autoMsg").textContent) $("bt_autoMsg").textContent = tr("ran");
  renderPresets();   // the "done" line follows the language button too
  renderForms(); renderFit(); showCounts();
}
function init() {
  fill(); applyTexts();
  $("pg-bt").querySelector(".card").addEventListener("input", () => { readTop(); renderForms(); renderFit(); });
  $("bt_autoBox").addEventListener("input", (e) => {
    if (e.target.id === "bt_preGen" || e.target.id === "bt_preTag") return applyPreset();
    if (/^bt_r[012]$/.test(e.target.id) && S.auto.preset) { S.auto.preset = ""; renderPresets(); }   // typed your own ratio → no longer the preset
    readTop(); renderFit(); });
  loadScripts(["data/content.js"]).then(() => { loadPresets(); renderPresets(); }, () => {});
  $("bt_run").onclick = () => { readTop(); autoSplit(); };
  $("bt_add").onclick = () => { S.f.push({ k: "m", c: [0, 0, 0] }); save(); renderForms(); };
  $("bt_copy").onclick = async () => { try { await navigator.clipboard.writeText(copyText()); $("bt_copy").textContent = tr("copied"); setTimeout(() => ($("bt_copy").textContent = tr("copy")), 1500); } catch (e) {} };
  $("bt_forms").addEventListener("input", (e) => {
    const el = e.target, j = +el.dataset.j, i = +el.dataset.i; if (isNaN(j) || isNaN(i)) return;
    const f = S.f[j], want = (+el.value || 0) * size(f) / 100;
    const got = setCount(j, i, want);
    if (el.type === "range") el.value = pctOf(f, i);   // can't go past full / what is left → the slider stays put
    save(); refreshForm(j);
  });
  $("bt_forms").addEventListener("change", (e) => { if (e.target.classList.contains("bt-p")) refreshForm(+e.target.dataset.j); });
  $("bt_forms").addEventListener("click", (e) => { const d = e.target.closest("[data-del]"); if (!d) return; S.f.splice(+d.dataset.del, 1); save(); renderForms(); });
}
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.bt = { init, applyTexts, setLang };
/* no tab for it: open with #bt, or tap the Bear Hunt title on the Events tab 3 times quickly */
let taps = [];
document.addEventListener("click", (e) => {
  if (!e.target.closest('.todo[data-ev="bear-hunt"] .txt, .evrow[data-id="bear-hunt"] summary')) return;
  const now = Date.now(); taps = taps.filter((t) => now - t < 1500); taps.push(now);
  if (taps.length >= 3) { taps = []; e.preventDefault(); location.hash = "#bt"; }
});
})();
