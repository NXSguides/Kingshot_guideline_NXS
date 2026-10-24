/* NXS officer page — 🚚 Move tab: 📐 auto plan from a Kingshot Mapper layout.
   Load the Mapper CSV of a new hive (cities, Bear Traps, HQ, the banners drawn on it, resources, obstacles) and the page works out:
   the road of banners from our land today to the new HQ, which drawn banners are stage 1 (BT2 side) / stage 2 (BT1 side), what is
   blocked (mountains, lakes, no-build zones, resources, other alliances' territory), the 285-banner budget, Fertile Land, trap balance
   and the nearest Fortress — drawn like the game (screen right = X−Y, up = X+Y) with a table under it.
   Everything can then be changed by hand: pick a pen and tap the map. The result can be downloaded as a picture or a blueprint CSV,
   or loaded into 🧭 Move steps. The working copy is kept in this browser only (localStorage). */
(function () {
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const T = {
  en: { title: "📐 Auto plan from a Mapper layout", intro: "Load the Kingshot Mapper CSV (Export → CSV) of a new hive: cities, Bear Traps, HQ, the banners you drew, resources and obstacles. The site adds the road from our land to the new HQ, splits your banners into stage 1 (BT2 side) / stage 2 (BT1 side), checks mountains, lakes, no-build zones, resources and other alliances, counts the 285 limit and draws it like the game. Then change anything by tapping the map.",
    load: "📥 Load Mapper CSV", paste: "…or paste the CSV here", go: "Make the plan", bad: "Couldn't find our cities (city rows) in that file.", noHq: "The layout has no HQ — add one in Mapper.",
    pens: "Pen:", mNone: "✋ Look", mR: "⚫ Road", mS1: "🟡 Stage 1", mS2: "🟠 Stage 2", mDel: "🧽 Remove", mHq: "🏯 Move HQ",
    tapNote: "Pick a pen, then tap a tile: a new banner there, or change / remove the banner you tap. Numbers follow the build order.",
    reroad: "🔄 Auto road again", resplit: "🔄 Re-sort stages", undo: "↩️ Undo", png: "⬇️ Picture (PNG)", csv: "⬇️ Blueprint CSV", use: "➡️ Use as moving plan", clear: "✕ Close plan",
    useOk: "Loaded into 🧭 Move steps below — check it and 💾 Save there.", noUse: "Saving the moving plan needs the move edit right.",
    noRoad: "No road found (blocked) — draw it with the ⚫ Road pen.", roadOk: "The new HQ already touches our land — no road needed.", roadN: "Road: {n} banners added.",
    rHq: "HQ (corner X,Y)", rF: "Nearest Fortress", fTxt: "{f} · ~{d} tiles", rCity: "Cities", rFert: "Cities on Fertile Land", rIn: "Cities inside our land: after HQ / after stage 1 / after stage 2",
    rBt: "Cities per Bear Trap (BT2 / BT1)", rAvg: "Avg. distance city → its trap", rFar: "Farthest city → HQ (Viking)", tiles: "{n} tiles",
    rRoad: "Road banners (in order)", rS: "Hive banners (stage 1 / stage 2)", rBud: "Banners (limit 285)", bud: "{a} now + {b} new = {c}", budOver: " → take down {n} old ones first", budOk: " ✓",
    rKill: "Other alliances' banners in the way", rProb: "Problems", none: "None", rOrder: "Move order",
    oRoad: "Road {a}–{b}", oKill: "take down {n} banner(s) of other alliances", oHq: "move HQ", oS1: "stage 1 (BT2 side)", oM2: "BT2 members move", oS2: "stage 2", oM1: "BT1 members move", oBt: "Bear Traps last",
    pObst: "{w} {xy} on a mountain / lake", pZone: "{w} {xy} in a no-build zone", pRes: "{w} {xy} on a resource", pOther: "{w} {xy} inside {a}'s land", pHqF: "HQ on Fertile Land — not allowed", pHqT: "HQ's 15×15 reaches Fertile Land — check in game first",
    pLoose: "{w} {xy} not connected to our land", pOut: "{n} cities stay outside our land", pOver: "{w} {xy} overlaps a building",
    wC: "City", wT: "Bear Trap", wH: "HQ", wB: "Banner",
    lgR: "Road banner", lgS1: "Stage 1 banner", lgS2: "Stage 2 banner", lgC0: "City inside right after the HQ moves", lgC1: "… after stage 1", lgC2: "… after stage 2", lgC3: "City outside our land",
    lgOurs: "Our banners now", lgOth: "Other alliances", lgObs: "Mountain / lake", lgZone: "No-build zone", lgRes: "Resource", lgKill: "✖ in the way", lgFert: "Fertile Land", lgWarn: "⚠ problem",
    tipBad: "Can't put a banner there ({w}).", hqSet: "HQ → {xy}", local: "Kept on this phone / browser only until you use it as the moving plan.", rRoadH: "Road from our HQ now", rRoadA: "Shortest road (from any of our banners)", inUse: " ✓ in use", swap: "🔀 Use the other road", lgAlt: "The other road (dashed)", roadN2: "Road from our HQ: {h} banners · shortest road: {a} banners.", nf: "not found", zoom: "Zoom" },
  zh: { title: "📐 從 Mapper 自動規劃", intro: "載入新蜂巢的 Kingshot Mapper CSV（Export → CSV）：城、熊陷阱、總部、你畫的旗子、資源點和障礙物。網站會自動算出從我們現在的領地連到新總部的路、把你的旗子分成第 1 階段（BT2 那側）／第 2 階段（BT1 那側）、檢查山、湖、禁建區、資源點和別的聯盟、算 285 上限，並照遊戲的方向畫出來。之後點地圖就能隨意修改。",
    load: "📥 載入 Mapper CSV", paste: "…或把 CSV 貼在這裡", go: "產生規劃", bad: "這個檔案裡找不到我們的城（city 那幾行）。", noHq: "這個布局沒有總部，請在 Mapper 加上。",
    pens: "筆：", mNone: "✋ 只看", mR: "⚫ 路", mS1: "🟡 第 1 階段", mS2: "🟠 第 2 階段", mDel: "🧽 移除", mHq: "🏯 移動總部",
    tapNote: "先選一支筆，再點地圖上的格子：那裡就多一面旗子；點到已經有的旗子就會改成這支筆的種類或移除。編號照蓋的順序。",
    reroad: "🔄 重新自動算路", resplit: "🔄 重新分階段", undo: "↩️ 復原", png: "⬇️ 下載圖片 (PNG)", csv: "⬇️ 藍圖 CSV", use: "➡️ 設成搬家計畫", clear: "✕ 關閉規劃",
    useOk: "已經放進下面的 🧭 搬家步驟，確認後在那裡按 💾 儲存。", noUse: "要有搬家分頁的編輯權限才能設成搬家計畫。",
    noRoad: "找不到能走的路（被擋住了），請用 ⚫ 路 的筆自己畫。", roadOk: "新總部已經碰到我們的領地，不需要路。", roadN: "路：加了 {n} 面旗子。",
    rHq: "總部（角落 X,Y）", rF: "最近的要塞", fTxt: "{f} · 約 {d} 格", rCity: "城", rFert: "在沃土上的城", rIn: "在我們領地裡的城：總部搬完／第 1 階段後／第 2 階段後",
    rBt: "每個熊陷阱的城（BT2 / BT1）", rAvg: "城到自己陷阱的平均距離", rFar: "離總部最遠的城（維京）", tiles: "{n} 格",
    rRoad: "路的旗子（照順序）", rS: "蜂巢旗子（第 1 / 第 2 階段）", rBud: "旗子（上限 285）", bud: "現有 {a} + 新蓋 {b} = {c}", budOver: " → 要先拆 {n} 面舊的", budOk: " ✓",
    rKill: "擋路的別盟旗子", rProb: "問題", none: "沒有", rOrder: "搬家順序",
    oRoad: "路 {a}–{b}", oKill: "拆掉 {n} 面別盟旗子", oHq: "搬總部", oS1: "第 1 階段（BT2 那側）", oM2: "BT2 成員搬", oS2: "第 2 階段", oM1: "BT1 成員搬", oBt: "最後搬熊陷阱",
    pObst: "{w} {xy} 在山／湖上", pZone: "{w} {xy} 在禁建區裡", pRes: "{w} {xy} 壓到資源點", pOther: "{w} {xy} 在 {a} 的領地裡", pHqF: "總部在沃土上——不能蓋", pHqT: "總部的 15×15 碰到沃土——先在遊戲裡確認",
    pLoose: "{w} {xy} 沒連到我們的領地", pOut: "有 {n} 座城不在我們的領地裡", pOver: "{w} {xy} 跟別的建築重疊",
    wC: "城", wT: "熊陷阱", wH: "總部", wB: "旗子",
    lgR: "路的旗子", lgS1: "第 1 階段旗子", lgS2: "第 2 階段旗子", lgC0: "總部搬完就在領地裡的城", lgC1: "…第 1 階段後", lgC2: "…第 2 階段後", lgC3: "不在領地裡的城",
    lgOurs: "我們現在的旗子", lgOth: "別的聯盟", lgObs: "山／湖", lgZone: "禁建區", lgRes: "資源點", lgKill: "✖ 擋路", lgFert: "沃土", lgWarn: "⚠ 有問題",
    tipBad: "那裡不能插旗（{w}）。", hqSet: "總部 → {xy}", local: "設成搬家計畫之前，只存在這支手機／這個瀏覽器。", rRoadH: "從現在總部出發的路", rRoadA: "最短的路（從任何一面我們的旗子）", inUse: " ✓ 使用中", swap: "🔀 換另一條路", lgAlt: "另一條路（虛線）", roadN2: "從總部出發：{h} 面旗子 · 最短：{a} 面旗子。", nf: "找不到", zoom: "縮放" },
  pt: { title: "📐 Plano automático do Mapper", intro: "Carregue o CSV do Kingshot Mapper (Export → CSV) da nova colmeia: cidades, Armadilhas de Urso, QG, os estandartes que você desenhou, recursos e obstáculos. O site acrescenta o caminho da nossa terra até o QG novo, divide seus estandartes em etapa 1 (lado BT2) / etapa 2 (lado BT1), confere montanhas, lagos, zonas proibidas, recursos e outras alianças, conta o limite de 285 e desenha como no jogo. Depois mude o que quiser tocando no mapa.",
    load: "📥 Carregar CSV do Mapper", paste: "…ou cole o CSV aqui", go: "Fazer o plano", bad: "Não achei nossas cidades (linhas city) nesse arquivo.", noHq: "O layout não tem QG — coloque um no Mapper.",
    pens: "Caneta:", mNone: "✋ Ver", mR: "⚫ Caminho", mS1: "🟡 Etapa 1", mS2: "🟠 Etapa 2", mDel: "🧽 Remover", mHq: "🏯 Mover QG",
    tapNote: "Escolha uma caneta e toque num quadrado: um estandarte novo ali, ou muda / remove o que você tocar. Os números seguem a ordem de construção.",
    reroad: "🔄 Caminho automático de novo", resplit: "🔄 Reordenar etapas", undo: "↩️ Desfazer", png: "⬇️ Imagem (PNG)", csv: "⬇️ CSV do plano", use: "➡️ Usar como plano da mudança", clear: "✕ Fechar plano",
    useOk: "Carregado nas 🧭 Etapas da mudança abaixo — confira e 💾 Salve lá.", noUse: "Precisa do direito de edição da mudança.",
    noRoad: "Nenhum caminho (bloqueado) — desenhe com a caneta ⚫ Caminho.", roadOk: "O QG novo já encosta na nossa terra — sem caminho.", roadN: "Caminho: {n} estandartes.",
    rHq: "QG (canto X,Y)", rF: "Fortaleza mais perto", fTxt: "{f} · ~{d} quadrados", rCity: "Cidades", rFert: "Cidades em Terra Fértil", rIn: "Cidades na nossa terra: após o QG / após etapa 1 / após etapa 2",
    rBt: "Cidades por Armadilha (BT2 / BT1)", rAvg: "Distância média cidade → armadilha", rFar: "Cidade mais longe → QG (Viking)", tiles: "{n} quadrados",
    rRoad: "Estandartes do caminho (em ordem)", rS: "Estandartes da colmeia (etapa 1 / etapa 2)", rBud: "Estandartes (limite 285)", bud: "{a} agora + {b} novos = {c}", budOver: " → derrubar {n} antigos antes", budOk: " ✓",
    rKill: "Estandartes de outras alianças no caminho", rProb: "Problemas", none: "Nenhum", rOrder: "Ordem da mudança",
    oRoad: "Caminho {a}–{b}", oKill: "derrubar {n} estandarte(s) de outras alianças", oHq: "mover o QG", oS1: "etapa 1 (lado BT2)", oM2: "membros BT2 mudam", oS2: "etapa 2", oM1: "membros BT1 mudam", oBt: "Armadilhas por último",
    pObst: "{w} {xy} em montanha / lago", pZone: "{w} {xy} em zona proibida", pRes: "{w} {xy} sobre um recurso", pOther: "{w} {xy} dentro da terra de {a}", pHqF: "QG em Terra Fértil — não pode", pHqT: "O 15×15 do QG toca Terra Fértil — confira no jogo",
    pLoose: "{w} {xy} não ligado à nossa terra", pOut: "{n} cidades ficam fora da nossa terra", pOver: "{w} {xy} sobre outro prédio",
    wC: "Cidade", wT: "Armadilha", wH: "QG", wB: "Estandarte",
    lgR: "Estandarte do caminho", lgS1: "Etapa 1", lgS2: "Etapa 2", lgC0: "Cidade dentro logo após o QG", lgC1: "… após etapa 1", lgC2: "… após etapa 2", lgC3: "Cidade fora da terra",
    lgOurs: "Nossos estandartes", lgOth: "Outras alianças", lgObs: "Montanha / lago", lgZone: "Zona proibida", lgRes: "Recurso", lgKill: "✖ no caminho", lgFert: "Terra Fértil", lgWarn: "⚠ problema",
    tipBad: "Não dá para pôr estandarte aí ({w}).", hqSet: "QG → {xy}", local: "Fica só neste celular / navegador até usar como plano da mudança.", rRoadH: "Caminho a partir do nosso QG atual", rRoadA: "Caminho mais curto (de qualquer estandarte nosso)", inUse: " ✓ em uso", swap: "🔀 Usar o outro caminho", lgAlt: "O outro caminho (tracejado)", roadN2: "Do nosso QG: {h} estandartes · mais curto: {a} estandartes.", nf: "não achado", zoom: "Zoom" },
  ar: { title: "📐 خطة تلقائية من Mapper", intro: "حمّل ملف CSV من Kingshot Mapper (Export → CSV) للخلية الجديدة: المدن، مصائد الدب، المقر، الرايات التي رسمتها، الموارد والعوائق. يضيف الموقع طريق الرايات من أرضنا إلى المقر الجديد، ويقسم راياتك إلى المرحلة 1 (جهة BT2) / المرحلة 2 (جهة BT1)، ويفحص الجبال والبحيرات ومناطق منع البناء والموارد والتحالفات الأخرى، ويحسب حد 285، ويرسمها كما في اللعبة. ثم غيّر ما تشاء بالضغط على الخريطة.",
    load: "📥 تحميل CSV من Mapper", paste: "…أو الصق CSV هنا", go: "اصنع الخطة", bad: "لم أجد مدننا (أسطر city) في هذا الملف.", noHq: "لا يوجد مقر في التخطيط — أضفه في Mapper.",
    pens: "القلم:", mNone: "✋ عرض", mR: "⚫ طريق", mS1: "🟡 المرحلة 1", mS2: "🟠 المرحلة 2", mDel: "🧽 إزالة", mHq: "🏯 نقل المقر",
    tapNote: "اختر قلمًا ثم اضغط مربعًا: راية جديدة هناك، أو تغيير / إزالة الراية التي تضغطها. الأرقام حسب ترتيب البناء.",
    reroad: "🔄 الطريق التلقائي مجددًا", resplit: "🔄 إعادة ترتيب المراحل", undo: "↩️ تراجع", png: "⬇️ صورة (PNG)", csv: "⬇️ CSV المخطط", use: "➡️ استخدمها كخطة الانتقال", clear: "✕ إغلاق الخطة",
    useOk: "حُمّلت في 🧭 خطوات الانتقال أدناه — راجعها ثم 💾 احفظ هناك.", noUse: "يلزم حق تعديل صفحة الانتقال.",
    noRoad: "لا يوجد طريق (مسدود) — ارسمه بقلم ⚫ طريق.", roadOk: "المقر الجديد يلامس أرضنا — لا حاجة لطريق.", roadN: "الطريق: أُضيفت {n} رايات.",
    rHq: "المقر (الزاوية X,Y)", rF: "أقرب حصن", fTxt: "{f} · ~{d} مربع", rCity: "المدن", rFert: "مدن على الأرض الخصبة", rIn: "مدن داخل أرضنا: بعد المقر / بعد المرحلة 1 / بعد المرحلة 2",
    rBt: "مدن لكل مصيدة (BT2 / BT1)", rAvg: "متوسط المسافة مدينة → مصيدتها", rFar: "أبعد مدينة → المقر (الفايكنج)", tiles: "{n} مربع",
    rRoad: "رايات الطريق (بالترتيب)", rS: "رايات الخلية (المرحلة 1 / 2)", rBud: "الرايات (الحد 285)", bud: "{a} الآن + {b} جديدة = {c}", budOver: " ← أزل {n} قديمة أولًا", budOk: " ✓",
    rKill: "رايات تحالفات أخرى في الطريق", rProb: "مشاكل", none: "لا شيء", rOrder: "ترتيب الانتقال",
    oRoad: "الطريق {a}–{b}", oKill: "إزالة {n} راية لتحالفات أخرى", oHq: "نقل المقر", oS1: "المرحلة 1 (جهة BT2)", oM2: "انتقال أعضاء BT2", oS2: "المرحلة 2", oM1: "انتقال أعضاء BT1", oBt: "المصائد أخيرًا",
    pObst: "{w} {xy} على جبل / بحيرة", pZone: "{w} {xy} في منطقة منع البناء", pRes: "{w} {xy} فوق مورد", pOther: "{w} {xy} داخل أرض {a}", pHqF: "المقر على الأرض الخصبة — غير مسموح", pHqT: "مربع 15×15 للمقر يلامس الأرض الخصبة — تحقق في اللعبة",
    pLoose: "{w} {xy} غير متصل بأرضنا", pOut: "{n} مدن تبقى خارج أرضنا", pOver: "{w} {xy} فوق مبنى آخر",
    wC: "مدينة", wT: "مصيدة", wH: "المقر", wB: "راية",
    lgR: "راية الطريق", lgS1: "المرحلة 1", lgS2: "المرحلة 2", lgC0: "مدينة داخل الأرض بعد نقل المقر", lgC1: "… بعد المرحلة 1", lgC2: "… بعد المرحلة 2", lgC3: "مدينة خارج الأرض",
    lgOurs: "راياتنا الآن", lgOth: "تحالفات أخرى", lgObs: "جبل / بحيرة", lgZone: "منطقة منع البناء", lgRes: "مورد", lgKill: "✖ في الطريق", lgFert: "الأرض الخصبة", lgWarn: "⚠ مشكلة",
    tipBad: "لا يمكن وضع راية هناك ({w}).", hqSet: "المقر ← {xy}", local: "تُحفظ على هذا الهاتف / المتصفح فقط حتى تستخدمها كخطة الانتقال.", rRoadH: "الطريق من مقرنا الحالي", rRoadA: "أقصر طريق (من أي راية لنا)", inUse: " ✓ مستخدم", swap: "🔀 استخدم الطريق الآخر", lgAlt: "الطريق الآخر (متقطع)", roadN2: "من مقرنا: {h} رايات · الأقصر: {a} رايات.", nf: "غير موجود", zoom: "تكبير" },
  ko: { title: "📐 Mapper 레이아웃 자동 계획", intro: "새 벌집의 Kingshot Mapper CSV(Export → CSV)를 불러오세요: 성, 곰 함정, 본부, 직접 그린 깃발, 자원, 장애물. 사이트가 지금 우리 땅에서 새 본부까지 길 깃발을 더하고, 그린 깃발을 1단계(BT2 쪽) / 2단계(BT1 쪽)로 나누고, 산·호수·건설 금지 구역·자원·다른 연맹을 확인하고, 285 한도를 세서 게임처럼 그려요. 그다음 지도를 눌러 무엇이든 바꿀 수 있어요.",
    load: "📥 Mapper CSV 불러오기", paste: "…또는 CSV를 여기에 붙여넣기", go: "계획 만들기", bad: "그 파일에서 우리 성(city 줄)을 찾지 못했어요.", noHq: "레이아웃에 본부가 없어요 — Mapper에서 추가하세요.",
    pens: "펜:", mNone: "✋ 보기", mR: "⚫ 길", mS1: "🟡 1단계", mS2: "🟠 2단계", mDel: "🧽 지우기", mHq: "🏯 본부 이동",
    tapNote: "펜을 고른 뒤 칸을 누르세요: 거기에 새 깃발, 또는 누른 깃발을 바꾸거나 지워요. 번호는 세우는 순서예요.",
    reroad: "🔄 길 다시 자동", resplit: "🔄 단계 다시 나누기", undo: "↩️ 되돌리기", png: "⬇️ 그림 (PNG)", csv: "⬇️ 청사진 CSV", use: "➡️ 이사 계획으로 쓰기", clear: "✕ 계획 닫기",
    useOk: "아래 🧭 이사 단계에 넣었어요 — 확인하고 거기서 💾 저장하세요.", noUse: "이사 탭 편집 권한이 필요해요.",
    noRoad: "길을 못 찾았어요(막힘) — ⚫ 길 펜으로 그리세요.", roadOk: "새 본부가 이미 우리 땅에 닿아요 — 길 필요 없음.", roadN: "길: 깃발 {n}개 추가.",
    rHq: "본부 (모서리 X,Y)", rF: "가장 가까운 성채", fTxt: "{f} · 약 {d}칸", rCity: "성", rFert: "비옥한 땅 위의 성", rIn: "우리 땅 안의 성: 본부 이동 후 / 1단계 후 / 2단계 후",
    rBt: "함정별 성 (BT2 / BT1)", rAvg: "성 → 자기 함정 평균 거리", rFar: "본부에서 가장 먼 성 (바이킹)", tiles: "{n}칸",
    rRoad: "길 깃발 (순서대로)", rS: "벌집 깃발 (1단계 / 2단계)", rBud: "깃발 (한도 285)", bud: "지금 {a} + 새로 {b} = {c}", budOver: " → 먼저 옛 깃발 {n}개 철거", budOk: " ✓",
    rKill: "길을 막는 다른 연맹 깃발", rProb: "문제", none: "없음", rOrder: "이사 순서",
    oRoad: "길 {a}–{b}", oKill: "다른 연맹 깃발 {n}개 철거", oHq: "본부 이동", oS1: "1단계 (BT2 쪽)", oM2: "BT2 연맹원 이사", oS2: "2단계", oM1: "BT1 연맹원 이사", oBt: "곰 함정은 마지막",
    pObst: "{w} {xy} 산 / 호수 위", pZone: "{w} {xy} 건설 금지 구역 안", pRes: "{w} {xy} 자원 위", pOther: "{w} {xy} {a}의 땅 안", pHqF: "본부가 비옥한 땅 위 — 안 돼요", pHqT: "본부 15×15가 비옥한 땅에 닿아요 — 게임에서 먼저 확인",
    pLoose: "{w} {xy} 우리 땅과 연결 안 됨", pOut: "성 {n}개가 우리 땅 밖에 있어요", pOver: "{w} {xy} 다른 건물과 겹침",
    wC: "성", wT: "곰 함정", wH: "본부", wB: "깃발",
    lgR: "길 깃발", lgS1: "1단계 깃발", lgS2: "2단계 깃발", lgC0: "본부 이동 직후 땅 안의 성", lgC1: "… 1단계 후", lgC2: "… 2단계 후", lgC3: "땅 밖의 성",
    lgOurs: "지금 우리 깃발", lgOth: "다른 연맹", lgObs: "산 / 호수", lgZone: "건설 금지 구역", lgRes: "자원", lgKill: "✖ 길을 막음", lgFert: "비옥한 땅", lgWarn: "⚠ 문제",
    tipBad: "거기엔 깃발을 둘 수 없어요 ({w}).", hqSet: "본부 → {xy}", local: "이사 계획으로 쓰기 전까지 이 폰 / 브라우저에만 저장돼요.", rRoadH: "지금 본부에서 시작하는 길", rRoadA: "가장 짧은 길 (우리 깃발 아무 데서나)", inUse: " ✓ 사용 중", swap: "🔀 다른 길 쓰기", lgAlt: "다른 길 (점선)", roadN2: "본부에서: 깃발 {h}개 · 가장 짧은 길: {a}개.", nf: "없음", zoom: "확대" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const LS = "nxs-hive-planner";
const FR = 3, LIMIT = 285;
const fert = (x, y) => x >= 450 && x <= 749 && y >= 450 && y <= 749;
/* the working plan: { hq:[x,y], c:[[name,x,y,seq?]], bt:[[x,y],[x,y]] (BT1, BT2), res:[[x,y]], obs:[[x,y]], b:[[x,y,kind]] kind R|S1|S2, rows: original CSV rows } */
let PL = null, PEN = "", UNDO = [], msg = "", ZM = 1;
const save = () => { try { localStorage.setItem(LS, JSON.stringify(PL)); } catch (e) {} };
const push = () => { UNDO.push(JSON.stringify(PL)); if (UNDO.length > 40) UNDO.shift(); };

/* ---------- the world: our land today, other alliances, obstacles ---------- */
const KS = () => window.KM_SHARED || null;
function world() {
  const ks = KS(), K = (typeof KINGDOM_MAP !== "undefined" && KINGDOM_MAP) || {};
  const ours = ks ? ks.banners().map(([x, y]) => [x, y]) : [];
  const oth = ks ? ks.others().map(([n, x, y, c]) => ({ n, x, y, c })) : [];
  const othHq = ks && ks.othersHq ? ks.othersHq().map(([n, x, y, c]) => ({ n, x, y, c })) : [];
  return { ours, hq0: (K.hq || [])[0] || null, oth, othHq, obst: ks ? ks.obst : () => 0, zone: ks ? ks.zone : () => "", forts: (K.fortress || []).map(([x, y], i) => ({ n: "F" + (i + 1), x, y })), K };
}
/* no-build zone rectangles (same rule as the 🗺️ Map tab): Fortress / Sanctuary 60×60, Outpost 15×15, the castle ring */
function zoneRects(K) {
  const out = [[586, 586, 613, 613]], FN = 1200;
  const add = (x, y, sz, fz) => { const x1 = Math.round(x + sz / 2 - fz / 2), r1 = Math.round((FN - y - sz) + sz / 2 - fz / 2); out.push([x1, FN - 1 - (r1 + fz - 1), x1 + fz - 1, FN - 1 - r1]); };
  (K.fortress || []).forEach(([x, y]) => add(x, y, 6, 60)); (K.sanctuary || []).forEach(([x, y]) => add(x, y, 6, 60)); (K.outposts || []).forEach(([, , x, y]) => add(x, y, 3, 15));
  return out;
}

/* ---------- reading the Mapper CSV ---------- */
function parse(text) {
  const rows = [];
  for (const line of String(text).split(/\r?\n/)) {
    const f = line.split(/[,\t;]/).map((x) => x.trim()); if (f.length < 3) continue;
    const ty = f[0].toLowerCase();
    if (/^\d+$/.test(f[1]) && /^\d+$/.test(f[2])) rows.push({ t: ty, x: +f[1], y: +f[2], n: f[3] || "", c: (f[4] || "").toLowerCase(), s: f[5] !== undefined && f[5] !== "" ? +f[5] : null });
  }
  const cities = rows.filter((r) => r.t === "city"); if (!cities.length) return { err: "bad" };
  const lab = {}; cities.forEach((r) => { if (r.n) lab[r.n.toLowerCase()] = (lab[r.n.toLowerCase()] || 0) + 1; });
  const by = {}; cities.forEach((r) => { by[r.c || "-"] = (by[r.c || "-"] || 0) + 1; });
  const col = Object.keys(by).sort((a, b) => by[b] - by[a])[0], mc = cities.filter((r) => (r.c || "-") === col);
  const x1 = Math.min(...mc.map((r) => r.x)) - 14, x2 = Math.max(...mc.map((r) => r.x)) + 14, y1 = Math.min(...mc.map((r) => r.y)) - 14, y2 = Math.max(...mc.map((r) => r.y)) + 14;
  const inA = (r) => r.x >= x1 && r.x <= x2 && r.y >= y1 && r.y <= y2;
  const hq = rows.filter((r) => r.t === "hq" && inA(r)); if (!hq.length) return { err: "noHq" };
  const bt = rows.filter((r) => r.t === "beartrap" && inA(r)).sort((a, b) => (+((a.n.match(/\d+/) || [9])[0])) - (+((b.n.match(/\d+/) || [9])[0]))).map((r) => [r.x, r.y]);
  const TAG = /^(R|P)\d+$/i, S1 = /^S1-\d+$/i, S2 = /^S2-\d+$/i;
  const b = rows.filter((r) => r.t === "banner" && inA(r) && !/^kill\b/i.test(r.n)).map((r) => [r.x, r.y, TAG.test(r.n) ? "R" : S1.test(r.n) ? "S1" : S2.test(r.n) ? "S2" : ""]);
  return { hq: [hq[0].x, hq[0].y], c: mc.map((r) => [r.n && lab[r.n.toLowerCase()] <= 2 ? r.n : "", r.x, r.y]), bt,
    res: rows.filter((r) => r.t === "resource").map((r) => [r.x, r.y]), obs: rows.filter((r) => /^obs\d$/.test(r.t)).map((r) => [r.x, r.y]), b };
}

/* ---------- geometry ---------- */
const key = (x, y) => x * 2000 + y;
const sqTiles = (x0, y0, x1, y1, set) => { for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) set.add(key(x, y)); return set; };
const hqLand = (h) => [h[0] - 6, h[1] - 6, h[0] + 8, h[1] + 8];
const bLand = (x, y) => [x - FR, y - FR, x + FR, y + FR];
const cheb = (a, b) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
/* two squares of land are joined when they overlap or touch (also at a corner, like the UNI line) */
const touch = (A, B) => A[0] <= B[2] + 1 && B[0] <= A[2] + 1 && A[1] <= B[3] + 1 && B[1] <= A[3] + 1;
function ctx() {
  const W = world(), blocked = new Map(), occ = new Set(), res = new Set(), othLand = [];
  for (const o of W.oth) othLand.push({ r: bLand(o.x, o.y), n: o.n, x: o.x, y: o.y, c: o.c, kind: "b" });
  for (const o of W.othHq) othLand.push({ r: hqLand([o.x, o.y]), n: o.n, x: o.x, y: o.y, c: o.c, kind: "hq" });
  for (const [x, y] of PL.res || []) sqTiles(x, y, x + 1, y + 1, res);
  for (const [x, y] of PL.obs || []) blocked.set(key(x, y), "obs");
  PL.c.forEach(([, x, y]) => sqTiles(x, y, x + 1, y + 1, occ)); (PL.bt || []).forEach(([x, y]) => sqTiles(x, y, x + 2, y + 2, occ)); sqTiles(PL.hq[0], PL.hq[1], PL.hq[0] + 2, PL.hq[1] + 2, occ);
  const ownB = new Set(W.ours.map(([x, y]) => key(x, y)));
  /* why a single tile can't take something: mountain / lake, no-build zone, resource, other alliance's land */
  const why = (x, y) => {
    if (x < 0 || y < 0 || x > 1199 || y > 1199) return "zone";
    if (blocked.has(key(x, y)) || W.obst(x, y)) return "obst";
    if (W.zone(x, y)) return "zone";
    if (res.has(key(x, y))) return "res";
    for (const o of othLand) if (x >= o.r[0] && x <= o.r[2] && y >= o.r[1] && y <= o.r[3]) return "oth:" + o.n;
    return "";
  };
  return { W, why, occ, ownB, othLand };
}
/* road: the fewest banners from our land today to the new HQ's 15×15 (each banner joins the one before it: centres ≤ 7 apart).
   Banners may not stand on mountains, lakes, no-build zones, resources, buildings or inside another alliance's land. */
/* where a road may start: "any" = any of our banners; "hq" = our Plains HQ today and the banners of its block
   (joined to it, within 45 tiles) — the road then grows out of the HQ's side instead of a far-off banner line */
function srcLand(W, from) {
  const all = W.ours.map(([x, y]) => bLand(x, y));
  if (from !== "hq" || !W.hq0) return all;
  const h = W.hq0, land = [hqLand(h)], left = W.ours.filter((b) => cheb(b, h) <= 45);
  for (let grew = true; grew;) { grew = false; for (let i = left.length - 1; i >= 0; i--) { const r = bLand(left[i][0], left[i][1]); if (land.some((q) => touch(q, r))) { land.push(r); left.splice(i, 1); grew = true; } } }
  return land;
}
function autoRoad(C, from) {
  const goal = hqLand(PL.hq), ours = srcLand(C.W, from);
  const extra = PL.b.filter((b) => b[2] === "R").map(([x, y]) => bLand(x, y));   // road banners already drawn count as our land
  const src = ours.concat(extra);
  if (src.some((r) => touch(r, goal))) return [];
  let best = Infinity; for (const r of src) { const d = Math.max(goal[0] - r[2], r[0] - goal[2], goal[1] - r[3], r[1] - goal[3]); if (d < best) best = d; }
  const M = Math.min(140, best + 30), bx0 = Math.max(0, goal[0] - M), bx1 = Math.min(1199, goal[2] + M), by0 = Math.max(0, goal[1] - M), by1 = Math.min(1199, goal[3] + M);
  const W = bx1 - bx0 + 1, H = by1 - by0 + 1, N = W * H, idx = (x, y) => (x - bx0) * H + (y - by0);
  const ok = new Uint8Array(N), start = new Uint8Array(N), end = new Uint8Array(N);
  const nearSrc = src.filter((r) => r[2] >= bx0 - 4 && r[0] <= bx1 + 4 && r[3] >= by0 - 4 && r[1] <= by1 + 4);
  for (let x = bx0; x <= bx1; x++) for (let y = by0; y <= by1; y++) {
    if (C.occ.has(key(x, y)) || C.ownB.has(key(x, y)) || C.why(x, y)) continue;
    const i = idx(x, y); ok[i] = 1; const me = bLand(x, y);
    if (touch(me, goal)) end[i] = 1;
    for (const r of nearSrc) if (touch(me, r)) { start[i] = 1; break; }
  }
  const prev = new Int32Array(N).fill(-1), seen = new Uint8Array(N); let q = [];
  for (let i = 0; i < N; i++) if (ok[i] && start[i]) { seen[i] = 1; q.push(i); }
  // biggest steps first, pointing at the goal → the road comes out straight
  const gx = (goal[0] + goal[2]) / 2, gy = (goal[1] + goal[3]) / 2;
  while (q.length) {
    const hit = q.filter((i) => end[i]);
    if (hit.length) { let i = hit[0]; const path = []; while (i >= 0) { path.push([bx0 + Math.floor(i / H), by0 + (i % H)]); i = prev[i]; } return path.reverse(); }
    const nq = [];
    for (const i of q) { const x = bx0 + Math.floor(i / H), y = by0 + (i % H);
      const dir = [Math.sign(gx - x), Math.sign(gy - y)], cand = [];
      for (let dx = -7; dx <= 7; dx++) for (let dy = -7; dy <= 7; dy++) { const nx = x + dx, ny = y + dy; if (nx < bx0 || nx > bx1 || ny < by0 || ny > by1) continue; const j = idx(nx, ny); if (!ok[j] || seen[j]) continue; cand.push([j, dx * dir[0] + dy * dir[1]]); }
      cand.sort((a, b) => b[1] - a[1]); for (const [j] of cand) { seen[j] = 1; prev[j] = i; nq.push(j); } }
    q = nq;
  }
  return null;
}
/* which drawn banners are stage 1 / stage 2: the BT2 side first (BT2 members move first), then the rest */
function split() {
  const [b1, b2] = PL.bt.length >= 2 ? PL.bt : [PL.bt[0], PL.bt[0]];
  for (const b of PL.b) { if (b[2] === "R") continue;
    if (!b1) { b[2] = "S1"; continue; }
    const d1 = Math.hypot(b[0] - b1[0] - 1, b[1] - b1[1] - 1), d2 = Math.hypot(b[0] - b2[0] - 1, b[1] - b2[1] - 1); b[2] = d2 <= d1 ? "S1" : "S2"; }
}
/* build order inside each group: joined outward from what already stands (HQ land, then earlier banners) */
function order(kind, base) {
  const grp = PL.b.filter((b) => b[2] === kind), done = [], land = base.slice();
  let left = grp.slice();
  while (left.length) {
    const i = left.findIndex(([x, y]) => land.some((r) => touch(bLand(x, y), r)));
    if (i < 0) { left.sort((a, b) => cheb(a, PL.hq) - cheb(b, PL.hq)); done.push(...left.map((b) => ({ b, loose: true }))); break; }
    const [b] = left.splice(i, 1); done.push({ b, loose: false }); land.push(bLand(b[0], b[1]));
  }
  return done;
}

/* ---------- the numbers ---------- */
function analyse() {
  const C = ctx(), W = C.W;
  const hqR = hqLand(PL.hq);
  const src = srcLand(W, PL.from || "hq"), roadO = order("R", src);
  const s1O = order("S1", [hqR]), s2O = order("S2", [hqR].concat(s1O.map(({ b }) => bLand(b[0], b[1]))));
  const L0 = sqTiles(...hqR, new Set()), L1 = new Set(L0), L2 = new Set();
  s1O.forEach(({ b }) => sqTiles(...bLand(b[0], b[1]), L1)); L1.forEach((k) => L2.add(k)); s2O.forEach(({ b }) => sqTiles(...bLand(b[0], b[1]), L2));
  const inside = (L, x, y, n) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!L.has(key(x + i, y + j))) return false; return true; };
  const cst = PL.c.map(([, x, y]) => inside(L0, x, y, 2) ? 0 : inside(L1, x, y, 2) ? 1 : inside(L2, x, y, 2) ? 2 : 3);
  const probs = [], kill = new Map(), xy = (x, y) => `${x},${y}`;
  const check = (w, x, y, n) => { const seen = new Set();
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const r = C.why(x + i, y + j); if (!r || seen.has(r.split(":")[0])) continue; seen.add(r.split(":")[0]);
      if (r.startsWith("oth:")) { const a = r.slice(4); probs.push({ x, y, s: t("pOther").replace("{w}", t(w)).replace("{xy}", xy(x, y)).replace("{a}", a) });
        for (const o of C.othLand) if (o.kind === "b" && x + n - 1 >= o.r[0] && x <= o.r[2] && y + n - 1 >= o.r[1] && y <= o.r[3]) kill.set(key(o.x, o.y), o); }
      else probs.push({ x, y, s: t(r === "obst" ? "pObst" : r === "zone" ? "pZone" : "pRes").replace("{w}", t(w)).replace("{xy}", xy(x, y)) }); } };
  PL.c.forEach(([, x, y]) => check("wC", x, y, 2)); PL.bt.forEach(([x, y]) => check("wT", x, y, 3)); check("wH", PL.hq[0], PL.hq[1], 3);
  PL.b.forEach(([x, y]) => check("wB", x, y, 1));
  // overlaps between our own buildings, and banners on a building
  const cnt = new Map(), mark = (x, y, n) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cnt.set(key(x + i, y + j), (cnt.get(key(x + i, y + j)) || 0) + 1); };
  PL.c.forEach(([, x, y]) => mark(x, y, 2)); PL.bt.forEach(([x, y]) => mark(x, y, 3)); mark(PL.hq[0], PL.hq[1], 3); PL.b.forEach(([x, y]) => mark(x, y, 1));
  const over = (w, x, y, n) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (cnt.get(key(x + i, y + j)) > 1) { probs.push({ x, y, s: t("pOver").replace("{w}", t(w)).replace("{xy}", xy(x, y)) }); return; } };
  PL.c.forEach(([, x, y]) => over("wC", x, y, 2)); PL.bt.forEach(([x, y]) => over("wT", x, y, 3)); over("wH", PL.hq[0], PL.hq[1], 3);
  if ([0, 1, 2].some((i) => [0, 1, 2].some((j) => fert(PL.hq[0] + i, PL.hq[1] + j)))) probs.push({ x: PL.hq[0], y: PL.hq[1], s: t("pHqF") });
  else if (fert(hqR[0], hqR[1]) || fert(hqR[2], hqR[1]) || fert(hqR[0], hqR[3]) || fert(hqR[2], hqR[3]) || (hqR[0] <= 749 && hqR[2] >= 450 && hqR[1] <= 749 && hqR[3] >= 450)) probs.push({ x: PL.hq[0], y: PL.hq[1], s: t("pHqT") });
  // road: joined to our land today and reaching the HQ
  const roadLand = src.concat(roadO.map(({ b }) => bLand(b[0], b[1])));
  const roadOk = roadLand.some((r) => touch(r, hqR));
  roadO.concat(s1O, s2O).forEach(({ b, loose }) => { if (loose) probs.push({ x: b[0], y: b[1], s: t("pLoose").replace("{w}", t("wB")).replace("{xy}", xy(b[0], b[1])) }); });
  if (!roadOk) probs.push({ x: PL.hq[0], y: PL.hq[1], s: t("pLoose").replace("{w}", t("wH")).replace("{xy}", xy(...PL.hq)) });
  const out = cst.filter((s) => s === 3).length; if (out) probs.unshift({ x: null, s: t("pOut").replace("{n}", out) });
  // traps: each city belongs to the nearest one
  const ctr = (x, y, n) => [x + n / 2, y + n / 2], side = [0, 0], dsum = [0, 0];
  PL.c.forEach(([, x, y]) => { if (!PL.bt.length) return; const c = ctr(x, y, 2), d = PL.bt.map(([a, b]) => Math.hypot(c[0] - a - 1.5, c[1] - b - 1.5)), i = d.length > 1 && d[1] < d[0] ? 1 : 0; side[i]++; dsum[i] += d[i]; });
  const hc = ctr(PL.hq[0], PL.hq[1], 3), far = Math.max(0, ...PL.c.map(([, x, y]) => Math.hypot(x + 1 - hc[0], y + 1 - hc[1])));
  const fort = W.forts.map((f) => ({ ...f, d: Math.hypot(f.x + 3 - hc[0], f.y + 3 - hc[1]) })).sort((a, b) => a.d - b.d)[0];
  const newB = PL.b.filter(([x, y]) => !C.ownB.has(key(x, y))).length;
  return { C, roadO, s1O, s2O, cst, probs, kill: [...kill.values()], side, avg: PL.c.length ? (dsum[0] + dsum[1]) / PL.c.length : 0, far, fort, newB, now: W.ours.length, roadOk, nFert: PL.c.filter(([, x, y]) => fert(x, y) && fert(x + 1, y + 1)).length };
}

/* ---------- drawing (like the game: right = X−Y, up = X+Y) ---------- */
const K_ = 10, RR = 0.74;
let O = { dx: 0, sy: 0 };
const P = (x, y) => [((x - y) - O.dx) * K_, (O.sy - (x + y)) * K_ * RR];
const poly = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ");
const sq = (x0, y0, x1, y1, a) => `<polygon points="${poly(x0, y0, x1 + 1, y1 + 1)}" ${a}/>`;
const COL = { R: "#222222", S1: "#d4a017", S2: "#e07b39", c: ["#2f7d6b", "#4fa88f", "#a8d5c4", "#f2f2f2"], ours: "#a9c3e6", warn: "#c25b00" };
let VB = null;
function svg(A) {
  const pts = [[...PL.hq]].concat(PL.c.map(([, x, y]) => [x, y]), PL.b.map(([x, y]) => [x, y]), PL.bt);
  if (PL.alt && PL.alt.p) PL.alt.p.forEach((p) => pts.push(p));
  // show where the road leaves our land: the banner of ours the first road banner joins
  for (const f of [A.roadO.length ? A.roadO[0].b : null, PL.alt && PL.alt.p && PL.alt.p[0]].filter(Boolean)) { const near = A.C.W.ours.filter(([x, y]) => cheb([x, y], f) <= 7).sort((p, q) => cheb(p, f) - cheb(q, f))[0]; if (near) pts.push([near[0] - 3, near[1] - 3], [near[0] + 3, near[1] + 3]); }
  const us = pts.map(([x, y]) => x - y), vs = pts.map(([x, y]) => x + y);
  O = { dx: Math.min(...us) - 9, sy: Math.max(...vs) + 10 };
  const Wd = (Math.max(...us) + 9 - O.dx) * K_, Ht = (O.sy - (Math.min(...vs) - 12)) * K_ * RR;
  VB = { w: Wd, h: Ht };
  const x0 = Math.floor(Math.min(...pts.map((p) => p[0])) - 30), x1 = Math.ceil(Math.max(...pts.map((p) => p[0])) + 30), y0 = Math.floor(Math.min(...pts.map((p) => p[1])) - 30), y1 = Math.ceil(Math.max(...pts.map((p) => p[1])) + 30);
  const C = A.C, W = C.W; let s = "";
  s += sq(450, 450, 749, 749, `fill="#d7ebcd"`);
  for (const r of zoneRects(W.K)) if (r[2] >= x0 && r[0] <= x1 && r[3] >= y0 && r[1] <= y1) s += sq(Math.max(r[0], x0), Math.max(r[1], y0), Math.min(r[2], x1), Math.min(r[3], y1), `fill="#9b59b6" fill-opacity=".13" stroke="#9b59b6" stroke-opacity=".5" stroke-dasharray="6 4"`);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) { const o = W.obst(x, y); if (o) s += sq(x, y, x, y, `fill="${o === 2 ? "#5b9bd5" : "#8a8a96"}"`); }
  for (const [x, y] of PL.obs || []) if (x >= x0 && x <= x1 && y >= y0 && y <= y1) s += sq(x, y, x, y, `fill="#8a8a96"`);
  for (const [x, y] of W.ours) if (x >= x0 && x <= x1 && y >= y0 && y <= y1) s += sq(...bLand(x, y), `fill="${COL.ours}" fill-opacity=".45"`);
  for (const o of C.othLand) if (o.r[2] >= x0 && o.r[0] <= x1 && o.r[3] >= y0 && o.r[1] <= y1) s += sq(...o.r, `fill="${o.c || "#ff2fbe"}" fill-opacity=".25"`) + sq(o.x, o.y, o.x + (o.kind === "hq" ? 2 : 0), o.y + (o.kind === "hq" ? 2 : 0), `fill="${o.c || "#ff2fbe"}" fill-opacity=".9"`);
  for (const o of C.othLand) if (o.kind === "b" && o.x >= x0 && o.x <= x1 && o.y >= y0 && o.y <= y1) { const [X, Y] = P(o.x + 0.5, o.y + 0.5); s += `<text x="${X}" y="${Y + 13}" text-anchor="middle" class="hp-t" font-size="8" fill="#333">${esc(o.n)}</text>`; }
  for (const [x, y] of PL.res || []) s += sq(x, y, x + 1, y + 1, `fill="#b07d2b" stroke="#fff" stroke-width=".6"`);
  // the new land, stage by stage
  s += sq(...hqLand(PL.hq), `fill="#8e6bbf" fill-opacity=".10" stroke="#8e6bbf" stroke-width="1.6" stroke-dasharray="7 4"`);
  for (const { b } of A.s1O) s += sq(...bLand(b[0], b[1]), `fill="${COL.S1}" fill-opacity=".10"`);
  for (const { b } of A.s2O) s += sq(...bLand(b[0], b[1]), `fill="${COL.S2}" fill-opacity=".08"`);
  for (const { b } of A.roadO) s += sq(...bLand(b[0], b[1]), `fill="#222" fill-opacity=".07"`);
  PL.c.forEach(([n, x, y], i) => { s += sq(x, y, x + 1, y + 1, `fill="${COL.c[A.cst[i]]}" stroke="${A.cst[i] === 3 ? COL.warn : "#fff"}" stroke-width="${A.cst[i] === 3 ? 1.4 : 0.6}"`); });
  PL.bt.forEach(([x, y], i) => { const [X, Y] = P(x + 1.5, y + 1.5); s += sq(x, y, x + 2, y + 2, `fill="#e3a34a" stroke="#7a4a00" stroke-width=".8"`) + `<text x="${X}" y="${Y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2500">BT${i + 1}</text>`; });
  { const [x, y] = PL.hq, [X, Y] = P(x + 1.5, y + 1.5); s += sq(x, y, x + 2, y + 2, `fill="#8e6bbf" stroke="#fff" stroke-width="1"`) + `<text x="${X}" y="${Y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">HQ</text>`; }
  const dot = (x, y, fill, txt, tc) => { const [X, Y] = P(x + 0.5, y + 0.5); return `<circle cx="${X}" cy="${Y}" r="8.5" fill="${fill}" stroke="#fff" stroke-width="1.4"/><text x="${X}" y="${Y + 3.6}" text-anchor="middle" font-size="10" font-weight="800" fill="${tc}">${txt}</text>`; };
  A.roadO.forEach(({ b, loose }, i) => { s += dot(b[0], b[1], COL.R, i + 1, "#fff"); const [X, Y] = P(b[0] + 0.5, b[1] + 0.5); s += `<text x="${X + 11}" y="${Y + 4}" font-size="10" font-weight="700" fill="#111" class="hp-o">${b[0]},${b[1]}</text>`; });
  if (PL.alt && PL.alt.p) PL.alt.p.forEach(([x, y], i) => { const [X, Y] = P(x + 0.5, y + 0.5); s += sq(...bLand(x, y), `fill="none" stroke="#555" stroke-width="1" stroke-dasharray="4 4"`) + `<circle cx="${X}" cy="${Y}" r="8" fill="#fff" stroke="#333" stroke-width="1.6" stroke-dasharray="3 2"/><text x="${X}" y="${Y + 3.6}" text-anchor="middle" font-size="9.5" font-weight="800" fill="#333">${i + 1}</text>`; });
  A.s1O.forEach(({ b }, i) => s += dot(b[0], b[1], COL.S1, i + 1, "#2a1d00"));
  A.s2O.forEach(({ b }, i) => s += dot(b[0], b[1], COL.S2, A.s1O.length + i + 1, "#2a1200"));
  for (const o of A.kill) { const [X, Y] = P(o.x + 0.5, o.y + 0.5); s += `<text x="${X}" y="${Y + 8}" text-anchor="middle" font-size="24" font-weight="900" fill="${COL.warn}">✖</text>`; }
  const warned = new Set(); for (const p of A.probs) if (p.x != null && !warned.has(p.x + "," + p.y)) { warned.add(p.x + "," + p.y); const [X, Y] = P(p.x + 1, p.y + 1); s += `<text x="${X + 9}" y="${Y - 7}" font-size="14">⚠️</text>`; }
  // arrow to the nearest Fortress
  if (A.fort) { const [ax, ay] = P(PL.hq[0] + 1.5, PL.hq[1] + 1.5), [fx, fy] = P(A.fort.x + 3, A.fort.y + 3), d = Math.hypot(fx - ax, fy - ay) || 1, ux = (fx - ax) / d, uy = (fy - ay) / d;
    const sx = ax + ux * 60, sy = ay + uy * 60, ex = ax + ux * 150, ey = ay + uy * 150;
    s += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#555" stroke-width="2.4" marker-end="url(#hp_ar)"/><text x="${ex + ux * 12}" y="${ey + uy * 12 + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#444" class="hp-o">${esc(t("fTxt").replace("{f}", A.fort.n).replace("{d}", Math.round(A.fort.d)))}</text>`; }
  return `<svg id="hp_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Wd.toFixed(0)} ${Ht.toFixed(0)}" width="${(100 * ZM).toFixed(0)}%" style="display:block;background:#f4f1ea;font-family:Arial,sans-serif;touch-action:manipulation">
    <defs><marker id="hp_ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#555"/></marker>
    <style>.hp-o{paint-order:stroke;stroke:#f4f1ea;stroke-width:3px}</style></defs>${s}</svg>`;
}
function legend() {
  const it = [[COL.R, "lgR", 1], ["#fff", "lgAlt", 1], [COL.S1, "lgS1", 1], [COL.S2, "lgS2", 1], [COL.c[0], "lgC0"], [COL.c[1], "lgC1"], [COL.c[2], "lgC2"], [COL.c[3], "lgC3"], [COL.ours, "lgOurs"], ["#ff2fbe", "lgOth"], ["#8a8a96", "lgObs"], ["#9b59b6", "lgZone"], ["#b07d2b", "lgRes"], ["#d7ebcd", "lgFert"]];
  return `<div class="mm-legend">${it.map(([c, k, r]) => `<span><i style="display:inline-block;width:12px;height:12px;border-radius:${r ? "50%" : "2px"};background:${c};border:1px solid #0002;vertical-align:-2px"></i> ${esc(t(k))}</span>`).join("")}<span>${esc(t("lgKill"))}</span><span>${esc(t("lgWarn"))}</span></div>`;
}
function rows(A) {
  const L = (xs) => xs.map(({ b }) => `${b[0]},${b[1]}`).join(" → ");
  const bud = A.now + A.newB;
  const ord = [];
  if (A.roadO.length) ord.push(t("oRoad").replace("{a}", 1).replace("{b}", A.roadO.length));
  if (A.kill.length) ord.push(t("oKill").replace("{n}", A.kill.length));
  ord.push(t("oHq")); if (A.s1O.length) ord.push(t("oS1")); ord.push(t("oM2")); if (A.s2O.length) ord.push(t("oS2")); ord.push(t("oM1"), t("oBt"));
  const n = A.cst.reduce((a, s) => (a[s]++, a), [0, 0, 0, 0]);
  return [
    [t("rHq"), `${PL.hq[0]},${PL.hq[1]}`],
    [t("rF"), A.fort ? t("fTxt").replace("{f}", A.fort.n).replace("{d}", Math.round(A.fort.d)) : "—"],
    [t("rCity"), String(PL.c.length)],
    [t("rFert"), `${A.nFert} / ${PL.c.length}`],
    [t("rIn"), `${n[0]} / ${n[0] + n[1]} / ${n[0] + n[1] + n[2]}`, n[3] ? "warn" : ""],
    [t("rBt"), PL.bt.length > 1 ? `${A.side[1]} / ${A.side[0]}` : String(A.side[0])],
    [t("rAvg"), t("tiles").replace("{n}", A.avg.toFixed(1))],
    [t("rFar"), t("tiles").replace("{n}", Math.round(A.far))],
    ...(() => { const fromH = (PL.from || "hq") === "hq", cur = A.roadO.length ? `${A.roadO.length}: ${L(A.roadO)}` : (A.roadOk ? t("roadOk") : t("noRoad")) + "",
        alt = PL.alt ? (PL.alt.p === null ? t("noRoad") : PL.alt.p.length ? `${PL.alt.p.length}: ${PL.alt.p.map(([x, y]) => `${x},${y}`).join(" → ")}` : t("roadOk")) : "—",
        rH = [t("rRoadH") + (fromH ? t("inUse") : ""), fromH ? cur : alt, fromH ? (A.roadOk ? "good" : "warn") : ""], rA = [t("rRoadA") + (!fromH ? t("inUse") : ""), !fromH ? cur : alt, !fromH ? (A.roadOk ? "good" : "warn") : ""];
        return [rH, rA]; })(),
    [t("rS"), `${A.s1O.length} / ${A.s2O.length}`],
    [t("rBud"), t("bud").replace("{a}", A.now).replace("{b}", A.newB).replace("{c}", bud) + (bud > LIMIT ? t("budOver").replace("{n}", bud - LIMIT) : t("budOk")), bud > LIMIT ? "warn" : "good"],
    [t("rKill"), A.kill.length ? A.kill.map((o) => `${o.n} ${o.x},${o.y}`).join(" · ") : t("none"), A.kill.length ? "warn" : "good"],
    [t("rProb"), A.probs.length ? A.probs.map((p) => p.s).join("\n") : t("none"), A.probs.length ? "warn" : "good"],
    [t("rOrder"), ord.join(" → ")],
  ];
}
function table(A) {
  return `<table class="hp-tab"><tbody>${rows(A).map(([a, b, c]) => `<tr class="${c ? "hp-" + c : ""}"><th>${esc(a)}</th><td>${esc(b).replace(/\n/g, "<br>")}</td></tr>`).join("")}</tbody></table>`;
}

/* ---------- page ---------- */
let A = null;
function render() {
  const el = $("hp_root"); if (!el) return;
  const pens = [["", "mNone"], ["R", "mR"], ["S1", "mS1"], ["S2", "mS2"], ["del", "mDel"], ["hq", "mHq"]];
  const head = `<h3 style="margin:0 0 4px">${esc(t("title"))}</h3><div class="muted" style="font-size:13px;margin-bottom:8px">${esc(t("intro"))}</div>
    <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><label class="btn${PL ? "" : " primary"}" for="hp_file">${esc(t("load"))}</label><input type="file" id="hp_file" accept=".csv,.txt,text/csv,text/plain" hidden>
    ${PL ? `<button type="button" class="btn small" id="hp_close">${esc(t("clear"))}</button>` : ""}</div>
    ${PL ? "" : `<textarea class="inp" id="hp_paste" rows="3" placeholder="${esc(t("paste"))}" style="width:100%;margin-top:8px;box-sizing:border-box;font-family:monospace;font-size:12px"></textarea><button type="button" class="btn small" id="hp_go" style="margin-top:6px">${esc(t("go"))}</button>`}
    ${msg ? `<div class="muted" style="font-size:12.5px;margin-top:6px">${esc(msg)}</div>` : ""}`;
  if (!PL) { el.innerHTML = head; bind(); return; }
  A = analyse();
  el.innerHTML = head + `
    <div class="row hp-pens" style="gap:6px;flex-wrap:wrap;align-items:center;margin:10px 0 4px"><b>${esc(t("pens"))}</b>${pens.map(([k, l]) => `<button type="button" class="btn small${PEN === k ? " primary" : ""}" data-pen="${k}">${esc(t(l))}</button>`).join("")}
      <span style="margin-inline-start:auto" class="row"><button type="button" class="btn small" id="hp_zo">−</button><button type="button" class="btn small" id="hp_zi">+</button></span></div>
    <div class="muted" style="font-size:12px;margin-bottom:6px">${esc(t("tapNote"))}</div>
    <div class="hp-box" id="hp_box">${svg(A)}</div>
    ${legend()}
    ${table(A)}
    <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:10px">
      <button type="button" class="btn small" id="hp_road">${esc(t("reroad"))}</button><button type="button" class="btn small" id="hp_swap"${PL.alt ? "" : " disabled"}>${esc(t("swap"))}</button><button type="button" class="btn small" id="hp_split">${esc(t("resplit"))}</button>
      <button type="button" class="btn small" id="hp_undo"${UNDO.length ? "" : " disabled"}>${esc(t("undo"))}</button>
      <button type="button" class="btn small" id="hp_png">${esc(t("png"))}</button><button type="button" class="btn small" id="hp_csv">${esc(t("csv"))}</button>
      <button type="button" class="btn small primary" id="hp_use">${esc(t("use"))}</button></div>
    <div class="muted" style="font-size:12px;margin-top:6px">${esc(t("local"))}</div>`;
  bind();
}
/* both roads: from our HQ today, and the shortest from any banner — one is used (R banners), the other is shown dashed */
function roads() {
  PL.b = PL.b.filter((b) => b[2] !== "R"); PL.from = PL.from || "hq";
  const C = ctx(), rH = autoRoad(C, "hq"), rA = autoRoad(C, "any"), use = PL.from === "hq" ? rH : rA, other = PL.from === "hq" ? rA : rH;
  if (use) PL.b = PL.b.concat(use.map(([x, y]) => [x, y, "R"]));
  PL.alt = { from: PL.from === "hq" ? "any" : "hq", p: other };
  msg = rH && rA && !rH.length && !rA.length ? t("roadOk") : t("roadN2").replace("{h}", rH ? rH.length : t("nf")).replace("{a}", rA ? rA.length : t("nf"));
}
function start(text) {
  const p = parse(text); if (p.err) { msg = t(p.err); PL = null; return render(); }
  PL = p; UNDO = []; split(); msg = "";
  roads(); save(); render();
}
function tileAt(ev) {
  const sv = $("hp_svg"); if (!sv) return null; const r = sv.getBoundingClientRect(), sx = VB.w / r.width;
  const X = (ev.clientX - r.left) * sx, Y = (ev.clientY - r.top) * sx;
  const u = X / K_ + O.dx, v = O.sy - Y / (K_ * RR);
  return [Math.floor((u + v) / 2), Math.floor((v - u) / 2)];
}
function tap(ev) {
  if (!PEN || !PL) return; const p = tileAt(ev); if (!p) return; const [x, y] = p;
  push();
  if (PEN === "hq") { PL.hq = [x - 1, y - 1]; msg = t("hqSet").replace("{xy}", `${x - 1},${y - 1}`); save(); return render(); }
  const hit = PL.b.map((b, j) => [j, Math.hypot(b[0] - x, b[1] - y)]).filter(([, d]) => d <= 1.5).sort((a, b) => a[1] - b[1])[0];
  if (hit) { if (PEN === "del") PL.b.splice(hit[0], 1); else PL.b[hit[0]][2] = PEN; msg = ""; }
  else if (PEN !== "del") { const w = ctx().why(x, y); if (w) msg = t("tipBad").replace("{w}", w.startsWith("oth:") ? w.slice(4) : t(w === "obst" ? "lgObs" : w === "zone" ? "lgZone" : "lgRes")); else msg = ""; PL.b.push([x, y, PEN]); }
  else UNDO.pop();
  save(); render();
}
function bind() {
  const f = $("hp_file"); if (f) f.onchange = async (e) => { const x = e.target.files[0]; e.target.value = ""; if (x) start(await x.text()); };
  if ($("hp_go")) $("hp_go").onclick = () => start($("hp_paste").value);
  if ($("hp_close")) $("hp_close").onclick = () => { PL = null; UNDO = []; msg = ""; try { localStorage.removeItem(LS); } catch (e) {} render(); };
  if (!PL) return;
  document.querySelectorAll("#hp_root [data-pen]").forEach((b) => b.onclick = () => { PEN = b.dataset.pen; render(); });
  $("hp_svg").addEventListener("click", tap);
  $("hp_zi").onclick = () => { ZM = Math.min(4, ZM * 1.5); render(); }; $("hp_zo").onclick = () => { ZM = Math.max(1, ZM / 1.5); render(); };
  $("hp_road").onclick = () => { push(); roads(); save(); render(); };
  $("hp_swap").onclick = () => { push(); const cur = PL.b.filter((b) => b[2] === "R").map(([x, y]) => [x, y]), alt = PL.alt || { from: "any", p: null };
    PL.b = PL.b.filter((b) => b[2] !== "R").concat((alt.p || []).map(([x, y]) => [x, y, "R"])); PL.alt = { from: PL.from || "hq", p: cur }; PL.from = alt.from; msg = ""; save(); render(); };
  $("hp_split").onclick = () => { push(); split(); msg = ""; save(); render(); };
  $("hp_undo").onclick = () => { if (!UNDO.length) return; PL = JSON.parse(UNDO.pop()); save(); render(); };
  $("hp_png").onclick = png;
  $("hp_csv").onclick = () => dl(new Blob([blueprint()], { type: "text/csv" }), `NXS-blueprint-${PL.hq[0]}-${PL.hq[1]}.csv`);
  $("hp_use").onclick = () => { if (!(OFFICER.can && OFFICER.can("move", "edit"))) { msg = t("noUse"); return render(); }
    if (window.MemberMap && MemberMap.importPlan) { MemberMap.importPlan(blueprint(), `auto-plan ${PL.hq[0]},${PL.hq[1]}`); msg = t("useOk"); render(); const s = $("mv_root"); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); } };
}
/* blueprint CSV in the Mapper format the 🧭 Move steps read: R1… road, S1-1… / S2-1… stages (in build order), KILL banners of others */
function blueprint() {
  const A2 = analyse(), out = [];
  PL.c.forEach(([n, x, y], i) => out.push(`city,${x},${y},${n || "NXS"},#4a9edd,${i + 1}`));
  PL.bt.forEach(([x, y], i) => out.push(`beartrap,${x},${y},Bear Trap ${i + 1},#c0392b,${i + 1}`));
  out.push(`hq,${PL.hq[0]},${PL.hq[1]},HQ,#8e6bbf,1`);
  A2.roadO.forEach(({ b }, i) => out.push(`banner,${b[0]},${b[1]},R${i + 1},#222222,${i + 1}`));
  A2.s1O.forEach(({ b }, i) => out.push(`banner,${b[0]},${b[1]},S1-${i + 1},#d4a017,${i + 1}`));
  A2.s2O.forEach(({ b }, i) => out.push(`banner,${b[0]},${b[1]},S2-${i + 1},#e07b39,${i + 1}`));
  A2.kill.forEach((o, i) => out.push(`banner,${o.x},${o.y},KILL ${o.n},#888888,${i + 1}`));
  return out.join("\n") + "\n";
}
function dl(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
/* ⬇️ picture: the map + legend + table on one canvas (white, wide enough to read on Discord) */
async function png() {
  const svgEl = $("hp_svg"); if (!svgEl) return;
  const W = 1600, mapH = Math.round(W * VB.h / VB.w), src = new XMLSerializer().serializeToString(svgEl).replace(/width="[^"]*%"/, `width="${W}" height="${mapH}"`);
  const img = new Image(); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src);
  await new Promise((r) => { img.onload = r; img.onerror = r; });
  const R2 = rows(A), c = document.createElement("canvas"), g = c.getContext("2d"), F = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif";
  const wrap = (s, w, font) => { g.font = font; const out = []; for (const para of String(s).split("\n")) { let line = ""; for (const ch of para.split(/(?<=[\s→·,])|(?=[　-鿿가-힯])/)) { if (g.measureText(line + ch).width > w && line) { out.push(line); line = ch.trimStart(); } else line += ch; } out.push(line); } return out; };
  const LW = 420, PAD = 24, lh = 24;
  const lines = R2.map(([a, b]) => [wrap(a, LW - 20, `bold 17px ${F}`), wrap(b, W - LW - 2 * PAD - 20, `17px ${F}`)]);
  const legendH = 70, tabH = lines.reduce((s, [a, b]) => s + Math.max(a.length, b.length) * lh + 14, 0);
  c.width = W; c.height = 60 + mapH + legendH + tabH + PAD;
  g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#222"; g.font = `bold 28px ${F}`; g.fillText(`${t("title").replace(/^📐\s*/, "")} — HQ ${PL.hq[0]},${PL.hq[1]}`, PAD, 40);
  g.drawImage(img, 0, 60, W, mapH);
  let y = 60 + mapH + 14, x = PAD; g.font = `15px ${F}`;
  const lg = [[COL.R, "lgR"], ["#ffffff", "lgAlt"], [COL.S1, "lgS1"], [COL.S2, "lgS2"], [COL.c[0], "lgC0"], [COL.c[1], "lgC1"], [COL.c[2], "lgC2"], [COL.c[3], "lgC3"], [COL.ours, "lgOurs"], ["#ff2fbe", "lgOth"], ["#8a8a96", "lgObs"], ["#9b59b6", "lgZone"], ["#b07d2b", "lgRes"], ["#d7ebcd", "lgFert"]];
  for (const [col, k] of lg) { const w = g.measureText(t(k)).width + 34; if (x + w > W - PAD) { x = PAD; y += 24; } g.fillStyle = col; g.fillRect(x, y, 14, 14); g.strokeStyle = "#0003"; g.strokeRect(x, y, 14, 14); g.fillStyle = "#333"; g.fillText(t(k), x + 20, y + 13); x += w; }
  y = 60 + mapH + legendH;
  R2.forEach(([, , cls], i) => { const [a, b] = lines[i], h = Math.max(a.length, b.length) * lh + 14;
    g.fillStyle = "#efeae0"; g.fillRect(PAD, y, LW, h); g.fillStyle = cls === "warn" ? "#fbe3c4" : cls === "good" ? "#d8eed8" : "#fff"; g.fillRect(PAD + LW, y, W - 2 * PAD - LW, h);
    g.strokeStyle = "#c9c2b3"; g.strokeRect(PAD, y, LW, h); g.strokeRect(PAD + LW, y, W - 2 * PAD - LW, h);
    g.fillStyle = "#222"; g.font = `bold 17px ${F}`; a.forEach((l, j) => g.fillText(l, PAD + 10, y + 24 + j * lh)); g.font = `17px ${F}`; b.forEach((l, j) => g.fillText(l, PAD + LW + 10, y + 24 + j * lh)); y += h; });
  c.toBlob((bl) => bl && dl(bl, `NXS-plan-${PL.hq[0]}-${PL.hq[1]}.png`), "image/png");
}
function init() {
  lang = OFFICER.lang || "en";
  try { const s = JSON.parse(localStorage.getItem(LS) || "null"); if (s && s.hq && Array.isArray(s.c)) PL = s; } catch (e) {}
  render();
}
function setLang(l) { lang = l; render(); }
window.HivePlanner = { init, setLang, refresh: () => { if (PL) render(); } };
})();
