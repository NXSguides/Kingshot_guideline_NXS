/* NXS officer page — 👥 member positions on the Map tab (loaded after js/officer/map.js, which calls MemberMap.init).
   A close-up of our block drawn like the in-game World map (screen right = X−Y, up = X+Y): every member's city (2×2 tiles,
   the X:Y is its corner tile like in game), the Bear Traps and HQ (3×3) and our banners. Saved encrypted for all officers in
   data/member-map-x7k2p9.json as { m: [[name, x, y], …], bt: [[x, y], [x, y]], by, at }.
   Names are matched with the roster (Ranking data) so the box shows power and flags names that aren't on the roster. Names stay exactly as the officers type them; a name that clearly means one roster member (Andre → Andree) is only linked to it for the power / colour. */
(function () {
const PATH = "data/member-map-x7k2p9.json";
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const T = {
  en: { lgNow: "Member now", lgSpot: "Planned spot", lgThere: "At the new spot", lgRoad: "Road banner", lgEarly: "Early hive banner", lgS1: "Stage 1 banner", lgS2: "Stage 2 banner", lgBuilt: "Built", lgHq: "New HQ", lgKill: "Take down", stT: "🧭 Move steps", tapTick: "✅ comes by itself when the map already shows it (our banner standing there, HQ / Bear Trap / member at the new X Y). Tap an item to tick it by hand.", stRoad: "Road: banners from our land to the new HQ", stEarly: "Early hive banners / take down other alliances' banners", stKill: "Take down", stHq: "Move the HQ to {xy}", stS1: "Stage 1 banners (BT2 side)", stS2: "Stage 2 banners (BT1 side)", stMove2: "BT2-side members move", stMove1: "BT1-side members move", stMove: "Members move", stM2: "{d} / {n} moved", stM1: "{d} / {n} moved", stM: "{d} / {n} moved", stBt: "Bear Traps last", stOther: "Other plan banners", stNow: "now", budget: "Banners: {a} standing + {b} still to build = {c} / 285", budgetBad: "over the limit, take down {n} old banners first", autoB: "Our banner already stands here (🗺️ Map)", rulesT: "📘 Hive rules & tips", rules: ["Alliance HQ only in the Plains or Badlands ring — never on Fertile Land (X and Y 450–749 in #2189) or in the Ruins ring. Put the HQ just outside the fertile edge and let the cities reach in.", "Every banner must connect to the HQ, directly or through other banners. If one is destroyed or cut off, everything that hangs on it stops counting. In the planner, hide cities and territory colours to check that each link is real.", "No banners inside an Outpost's no-build zone. Limits per alliance: 285 banners, 100 member cities, 2 Bear Traps.", "A city gets the territory bonus and counts for Bear Hunt only when all 4 of its tiles are inside our territory.", "One Bear Trap serves about 50 cities around it.", "Before moving, check the area for other players' cities, alliance buildings, mountains and lakes.", "Move order: HQ first → banners outward from BT2 → members as their spots become territory → Bear Traps last. Members never move the Bear Traps themselves.", "Each banner costs more than the last one. Avoid long, thin banner lines and guard exposed banners. Save a backup of the plan before big changes."], addT: "➕ Add / change a spot", addNote: "Type a name and its new X Y. An empty planned spot there gets the name, otherwise a new spot is added; their old spot becomes free.", addOk: "Set", addDel: "Take out of plan", freeList: "Empty planned spots (tap one to use it)", mvPage: "🚚 Alliance move", mvIntro: "Officers only. Load the moving plan, then tick members as they move — anyone with the right can take over.", noPlan: "No moving plan loaded yet.", imp: "📥 Load moving plan (.csv / .json)", impNote: "Kingshot Mapper (ksmapper.pages.dev): Export → CSV (download the file), cities labelled with member names. A .json from another planner works too. Officers only — members can't change anything here. Blueprint labels on banners: R1… road, P1… early hive banners, S1-1… stage 1, S2-1… stage 2, “KILL TTT” = another alliance's banner to take down.", impOk: "Plan loaded: {c} cities ({n} with names), {b} Bear Traps, {f} banners.", impBad: "That file doesn't look like a layout plan.", impDel: "Remove plan", vNow: "📍 Now", vPlan: "🧭 Moving plan", mvT: "🚚 Moving table", mvProg: "{d} / {n} moved", mvLeft: "Only not moved yet", colN: "Member", colNow: "Now", colNew: "New spot", colDone: "Moved", free: "{n} planned spots have no name yet.", noPlace: "not in the plan", auto: "already there", planBy: "Plan loaded {d}", fixed: "{n} names changed to the roster spelling.", t: "👥 Member positions", note: "Our cities as they sit in game (X:Y = the city's tile in game). Tap a city for its coordinates. Blue = on the roster, orange = name not found on the roster.",
    find: "Find a member…", none: "No positions saved yet.", noneEd: "No positions saved yet — paste them below (one per line: name X Y).", count: "{n} cities", pw: "Power", copy: "📋 Copy X:Y", copied: "Copied ✅",
    notOn: "On the map but not found on the roster:", notMap: "On the roster but not on the map:", paste: "📋 Paste positions", pasteNote: "One per line: name X Y (e.g. Sparrow 401 662). The box shows the current list — fix any name or coordinates here and press Replace all. Apply only adds new names and moves existing ones. BT1 / BT2 lines set the Bear Traps.",
    apply: "Apply", replace: "Replace all", cancel: "Cancel", save: "💾 Save", saving: "Saving…", saved: "Saved ✅ The other officers see it after a refresh.", unsaved: "Not saved yet.", by: "Your name",
    edit: "Change", del: "Remove", name: "Name", bad: "Couldn't read: {l}", added: "{a} added, {m} moved.", errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — refresh and try again.", errNet: "Couldn't reach GitHub — try again.", noKey: "Saving needs the officers' GitHub key (set up on the Post tab).", locked: "Unlock the officer data to see member positions.", bt: "Bear Trap", hq: "HQ", banner: "Banner", last: "Last saved {d} by {b}" },
  zh: { lgNow: "成員現在的城", lgSpot: "規劃的位置", lgThere: "已到新位置", lgRoad: "路的旗子", lgEarly: "提早蓋的蜂巢旗子", lgS1: "第 1 階段旗子", lgS2: "第 2 階段旗子", lgBuilt: "已蓋好", lgHq: "新總部", lgKill: "要拆", stT: "🧭 搬家步驟", tapTick: "地圖上已經看得到的會自動打 ✅（那裡已經有我們的旗子、總部／熊陷阱／成員已經在新座標）。其他的點一下就能手動勾。", stRoad: "鋪路：從我們的領地插旗到新總部", stEarly: "提早蓋的蜂巢旗子／拆掉別的聯盟的旗子", stKill: "拆", stHq: "總部搬到 {xy}", stS1: "第 1 階段旗子（BT2 那側）", stS2: "第 2 階段旗子（BT1 那側）", stMove2: "BT2 那側的成員搬家", stMove1: "BT1 那側的成員搬家", stMove: "成員搬家", stM2: "已搬 {d} / {n}", stM1: "已搬 {d} / {n}", stM: "已搬 {d} / {n}", stBt: "熊陷阱最後搬", stOther: "規劃裡的其他旗子", stNow: "現在這步", budget: "旗子：現有 {a} 面 + 還要蓋 {b} 面 = {c} / 285", budgetBad: "超過上限，要先拆掉 {n} 面舊旗子", autoB: "這裡已經有我們的旗子（🗺️ 地圖）", rulesT: "📘 蜂巢規則與技巧", rules: ["聯盟總部只能蓋在平原或荒地那一圈，不能蓋在沃土（#2189 是 X、Y 450～749）或遺跡圈。總部放在沃土邊線外，讓城往沃土裡排。", "每支旗幟都要跟總部連在一起（直接或透過其他旗幟）。一支被拆或斷線，靠它連出去的全部都不算。規劃時把城和領地顏色關掉，確認每個連接是真的。", "據點的禁建區不能放旗幟。每個聯盟上限：285 支旗幟、100 座成員城、2 個熊陷阱。", "城要 4 格全部在我們領地裡，才拿得到領地加成，打熊也才算數。", "一個熊陷阱大約配周圍 50 座城。", "搬之前先確認那一帶有沒有別人的城、聯盟建築、山和湖。", "搬家順序：先搬總部 → 旗幟從 BT2 往外放 → 位置變成領地的人才搬 → 熊陷阱最後搬。成員絕對不要自己搬熊陷阱。", "旗幟一支比一支貴。不要拉成又長又細的一條，外圍的旗幟要派兵守。大改之前先把規劃備份一份。"], addT: "➕ 新增／修改位置", addNote: "輸入名字和新的 X Y。那裡如果是計畫裡的空位就填進去，不是的話就新增一個位置；他原本的位置會空出來。", addOk: "設定", addDel: "從計畫移除", freeList: "計畫裡的空位（點一下就帶入）", mvPage: "🚚 聯盟搬家", mvIntro: "只有幹部看得到。載入搬家計畫後，成員搬好就勾一下，有權限的人都可以接手。", noPlan: "還沒載入搬家計畫。", imp: "📥 載入搬家計畫（.csv / .json）", impNote: "Kingshot Mapper（ksmapper.pages.dev）：匯出 → CSV（下載檔案），城的標籤要填成員名字。其他規劃網站的 .json 也可以。只有幹部看得到，成員沒辦法改。 藍圖的旗子標籤：R1… 路、P1… 提早蓋的蜂巢旗子、S1-1… 第 1 階段、S2-1… 第 2 階段、「KILL TTT」= 要拆的別聯盟旗子。", impOk: "已載入計畫：{c} 座城（{n} 座有名字）、{b} 個熊陷阱、{f} 面旗幟。", impBad: "這個檔案看起來不是規劃網站的計畫檔。", impDel: "移除計畫", vNow: "📍 現在位置", vPlan: "🧭 搬家計畫", mvT: "🚚 搬家對照表", mvProg: "已搬 {d} / {n}", mvLeft: "只看還沒搬的", colN: "成員", colNow: "現在", colNew: "新位置", colDone: "已搬", free: "計畫裡還有 {n} 個位置沒填名字。", noPlace: "計畫裡沒有", auto: "已經在新位置", planBy: "計畫載入於 {d}", fixed: "{n} 個名字已改成名單上的寫法。", t: "👥 成員位置", note: "我們的城在遊戲裡的位置（X:Y 是遊戲裡城的座標）。點一下城可以看座標。藍色 = 名單上有，橘色 = 名單上找不到這個名字。",
    find: "找成員…", none: "還沒有存位置。", noneEd: "還沒有存位置，請在下面貼上（一行一個：名字 X Y）。", count: "{n} 座城", pw: "戰力", copy: "📋 複製 X:Y", copied: "已複製 ✅",
    notOn: "地圖上有、名單上找不到：", notMap: "名單上有、地圖上沒有：", paste: "📋 貼上位置", pasteNote: "一行一個：名字 X Y（例如 Sparrow 401 662）。框裡會先放目前的整份名單，直接在這裡改名字或座標，再按「全部取代」就好。「套用」只會新增新名字、移動已有的名字。BT1／BT2 那行是熊陷阱。",
    apply: "套用", replace: "全部取代", cancel: "取消", save: "💾 儲存", saving: "儲存中…", saved: "已儲存 ✅ 其他幹部重新整理後就看得到。", unsaved: "還沒儲存。", by: "你的名字",
    edit: "修改", del: "移除", name: "名字", bad: "看不懂這行：{l}", added: "新增 {a} 個，移動 {m} 個。", errAuth: "存好的 GitHub 金鑰失效了，請找 Sherry。", errBusy: "有人同時儲存了，請重新整理再試一次。", errNet: "連不到 GitHub，請再試一次。", noKey: "儲存需要幹部的 GitHub 金鑰（在 Post 分頁設定）。", locked: "解鎖幹部資料後才看得到成員位置。", bt: "熊陷阱", hq: "總部", banner: "旗幟", last: "{b} 在 {d} 儲存" },
  pt: { lgNow: "Membro agora", lgSpot: "Lugar planejado", lgThere: "No lugar novo", lgRoad: "Estandarte do caminho", lgEarly: "Estandarte da colmeia antecipado", lgS1: "Estandarte da etapa 1", lgS2: "Estandarte da etapa 2", lgBuilt: "Construído", lgHq: "QG novo", lgKill: "Derrubar", stT: "🧭 Etapas da mudança", tapTick: "✅ aparece sozinho quando o mapa já mostra (nosso estandarte lá, QG / Armadilha / membro no novo X Y). Toque num item para marcar à mão.", stRoad: "Caminho: estandartes do nosso território até o QG novo", stEarly: "Estandartes da colmeia antecipados / derrubar estandartes de outras alianças", stKill: "Derrubar", stHq: "Mudar o QG para {xy}", stS1: "Estandartes da etapa 1 (lado BT2)", stS2: "Estandartes da etapa 2 (lado BT1)", stMove2: "Membros do lado BT2 mudam", stMove1: "Membros do lado BT1 mudam", stMove: "Membros mudam", stM2: "{d} / {n} mudaram", stM1: "{d} / {n} mudaram", stM: "{d} / {n} mudaram", stBt: "Armadilhas de Urso por último", stOther: "Outros estandartes do plano", stNow: "agora", budget: "Estandartes: {a} de pé + {b} a construir = {c} / 285", budgetBad: "acima do limite, derrube {n} estandartes antigos antes", autoB: "Nosso estandarte já está aqui (🗺️ Mapa)", rulesT: "📘 Regras e dicas da colmeia", rules: ["QG da aliança só no anel das Planícies ou das Terras Áridas — nunca em Terra Fértil (X e Y 450–749 no #2189) nem no anel das Ruínas. Coloque o QG logo fora da borda fértil e deixe as cidades entrarem nela.", "Todo estandarte precisa se ligar ao QG, direto ou por outros estandartes. Se um for destruído ou cortado, tudo que depende dele deixa de contar. No planejador, esconda cidades e cores de território para conferir cada ligação.", "Sem estandartes na zona proibida de um Posto Avançado. Limites por aliança: 285 estandartes, 100 cidades de membros, 2 Armadilhas de Urso.", "Uma cidade só ganha o bônus de território e só conta na Caça ao Urso com os 4 quadrados dentro do nosso território.", "Cada Armadilha de Urso atende cerca de 50 cidades em volta.", "Antes de mudar, confira se há cidades de outros jogadores, construções de aliança, montanhas e lagos na área.", "Ordem: QG primeiro → estandartes de BT2 para fora → membros quando o lugar vira território → Armadilhas de Urso por último. Membros nunca movem as Armadilhas sozinhos.", "Cada estandarte custa mais que o anterior. Evite linhas longas e finas e proteja os estandartes expostos. Guarde um backup do plano antes de grandes mudanças."], addT: "➕ Adicionar / mudar lugar", addNote: "Digite um nome e o novo X Y. Um lugar vazio do plano ali recebe o nome; senão um lugar novo é criado; o lugar antigo fica livre.", addOk: "Definir", addDel: "Tirar do plano", freeList: "Lugares vazios do plano (toque para usar)", mvPage: "🚚 Mudança da aliança", mvIntro: "Só oficiais. Carregue o plano e marque os membros conforme mudam — quem tiver permissão pode continuar.", noPlan: "Nenhum plano carregado ainda.", imp: "📥 Carregar plano de mudança (.csv / .json)", impNote: "Kingshot Mapper (ksmapper.pages.dev): Exportar → CSV (baixe o arquivo), cidades com o nome dos membros. Um .json de outro planejador também serve. Só oficiais — membros não podem mudar nada aqui. Rótulos do projeto nos estandartes: R1… caminho, P1… colmeia antecipada, S1-1… etapa 1, S2-1… etapa 2, “KILL TTT” = estandarte de outra aliança a derrubar.", impOk: "Plano carregado: {c} cidades ({n} com nome), {b} Armadilhas, {f} estandartes.", impBad: "Esse arquivo não parece um plano do planejador.", impDel: "Remover plano", vNow: "📍 Agora", vPlan: "🧭 Plano de mudança", mvT: "🚚 Tabela de mudança", mvProg: "{d} / {n} mudaram", mvLeft: "Só quem ainda não mudou", colN: "Membro", colNow: "Agora", colNew: "Novo lugar", colDone: "Mudou", free: "{n} lugares do plano ainda sem nome.", noPlace: "fora do plano", auto: "já está lá", planBy: "Plano carregado {d}", fixed: "{n} nomes trocados pela grafia do roster.", t: "👥 Posições dos membros", note: "Nossas cidades como estão no jogo (X:Y = o tile da cidade no jogo). Toque numa cidade para ver as coordenadas. Azul = está no roster, laranja = nome não encontrado no roster.",
    find: "Encontrar membro…", none: "Nenhuma posição salva ainda.", noneEd: "Nenhuma posição salva — cole abaixo (uma por linha: nome X Y).", count: "{n} cidades", pw: "Poder", copy: "📋 Copiar X:Y", copied: "Copiado ✅",
    notOn: "No mapa mas não no roster:", notMap: "No roster mas não no mapa:", paste: "📋 Colar posições", pasteNote: "Uma por linha: nome X Y (ex.: Sparrow 401 662). Um nome que já está no mapa é movido; nomes novos são adicionados. Linhas BT1 / BT2 definem as Armadilhas de Urso.",
    apply: "Aplicar", replace: "Substituir tudo", cancel: "Cancelar", save: "💾 Salvar", saving: "Salvando…", saved: "Salvo ✅ Os outros oficiais veem após atualizar.", unsaved: "Ainda não salvo.", by: "Seu nome",
    edit: "Alterar", del: "Remover", name: "Nome", bad: "Não deu para ler: {l}", added: "{a} adicionados, {m} movidos.", errAuth: "A chave do GitHub salva não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — atualize e tente de novo.", errNet: "Não foi possível conectar ao GitHub — tente de novo.", noKey: "Salvar precisa da chave do GitHub dos oficiais (configurada na aba Postar).", locked: "Desbloqueie os dados dos oficiais para ver as posições.", bt: "Armadilha de Urso", hq: "QG", banner: "Estandarte", last: "Salvo em {d} por {b}" },
  ar: { lgNow: "مدينة العضو الآن", lgSpot: "مكان مخطط", lgThere: "في المكان الجديد", lgRoad: "راية الطريق", lgEarly: "راية خلية مبكرة", lgS1: "راية المرحلة 1", lgS2: "راية المرحلة 2", lgBuilt: "مبنية", lgHq: "المقر الجديد", lgKill: "إزالة", stT: "🧭 خطوات الانتقال", tapTick: "تظهر ✅ تلقائيًا عندما تُظهرها الخريطة (رايتنا قائمة هناك، المقر / فخ الدب / العضو في X Y الجديد). اضغط عنصرًا لتعليمه يدويًا.", stRoad: "الطريق: رايات من أرضنا إلى المقر الجديد", stEarly: "رايات خلية مبكرة / إزالة رايات التحالفات الأخرى", stKill: "إزالة", stHq: "نقل المقر إلى {xy}", stS1: "رايات المرحلة 1 (جهة BT2)", stS2: "رايات المرحلة 2 (جهة BT1)", stMove2: "ينتقل أعضاء جهة BT2", stMove1: "ينتقل أعضاء جهة BT1", stMove: "ينتقل الأعضاء", stM2: "انتقل {d} / {n}", stM1: "انتقل {d} / {n}", stM: "انتقل {d} / {n}", stBt: "فخاخ الدب في النهاية", stOther: "رايات أخرى في الخطة", stNow: "الآن", budget: "الرايات: {a} قائمة + {b} للبناء = {c} / 285", budgetBad: "فوق الحد، أزل {n} رايات قديمة أولًا", autoB: "رايتنا قائمة هنا بالفعل (🗺️ الخريطة)", rulesT: "📘 قواعد ونصائح الخلية", rules: ["مقر التحالف فقط في حلقة السهول أو الأراضي القاحلة — ليس على الأرض الخصبة أبدًا (X وY من 450 إلى 749 في ‎#2189) ولا في حلقة الأطلال. ضع المقر خارج حافة الأرض الخصبة مباشرة ودع المدن تمتد إلى داخلها.", "يجب أن تتصل كل راية بالمقر مباشرة أو عبر رايات أخرى. إذا دُمّرت راية أو انقطعت، يتوقف احتساب كل ما يعتمد عليها. في أداة التخطيط أخفِ المدن وألوان الأراضي للتأكد من كل اتصال.", "لا رايات داخل منطقة حظر البناء حول المواقع المتقدمة. الحد لكل تحالف: 285 راية، 100 مدينة أعضاء، فخّا دب.", "تحصل المدينة على مكافأة الأراضي وتُحتسب في صيد الدب فقط عندما تكون مربعاتها الأربعة كلها داخل أراضينا.", "كل فخ دب يخدم نحو 50 مدينة حوله.", "قبل الانتقال تحقّق من وجود مدن لاعبين آخرين أو مبانٍ تحالف أو جبال أو بحيرات في المنطقة.", "الترتيب: المقر أولًا ← الرايات من BT2 إلى الخارج ← ينتقل الأعضاء عندما يصبح مكانهم ضمن الأراضي ← فخاخ الدب في النهاية. لا ينقل الأعضاء فخاخ الدب بأنفسهم أبدًا.", "كل راية أغلى من التي قبلها. تجنّب خطوط الرايات الطويلة الرفيعة واحرس الرايات المكشوفة. احفظ نسخة احتياطية من الخطة قبل التغييرات الكبيرة."], addT: "➕ إضافة / تغيير مكان", addNote: "اكتب الاسم وX Y الجديدين. المكان الفارغ هناك يأخذ الاسم وإلا يُضاف مكان جديد؛ ويصبح مكانه القديم فارغًا.", addOk: "تعيين", addDel: "إخراجه من الخطة", freeList: "أماكن فارغة في الخطة (اضغط لاستخدامها)", mvPage: "🚚 انتقال التحالف", mvIntro: "للضباط فقط. حمّل خطة الانتقال ثم علّم الأعضاء عند انتقالهم — يمكن لأي شخص لديه الصلاحية المتابعة.", noPlan: "لم تُحمَّل خطة بعد.", imp: "📥 تحميل خطة الانتقال (.csv / .json)", impNote: "Kingshot Mapper (ksmapper.pages.dev): التصدير → CSV (نزّل الملف)، والمدن بأسماء الأعضاء. ملف .json من أداة تخطيط أخرى يعمل أيضًا. للضباط فقط — لا يستطيع الأعضاء تغيير شيء هنا. تسميات المخطط على الرايات: R1… الطريق، P1… رايات خلية مبكرة، S1-1… المرحلة 1، S2-1… المرحلة 2، “KILL TTT” = راية تحالف آخر يجب إزالتها.", impOk: "تم تحميل الخطة: {c} مدينة ({n} بأسماء)، {b} مصيدة، {f} راية.", impBad: "هذا الملف لا يبدو خطة من أداة التخطيط.", impDel: "إزالة الخطة", vNow: "📍 الآن", vPlan: "🧭 خطة الانتقال", mvT: "🚚 جدول الانتقال", mvProg: "انتقل {d} / {n}", mvLeft: "من لم ينتقل فقط", colN: "العضو", colNow: "الآن", colNew: "المكان الجديد", colDone: "انتقل", free: "{n} مكانًا في الخطة بلا اسم بعد.", noPlace: "ليس في الخطة", auto: "موجود هناك", planBy: "حُمّلت الخطة {d}", fixed: "غُيّر {n} اسمًا إلى كتابته في القائمة.", t: "👥 مواقع الأعضاء", note: "مدننا كما هي في اللعبة (X:Y = مربع المدينة في اللعبة). اضغط على مدينة لترى إحداثياتها. أزرق = في القائمة، برتقالي = الاسم غير موجود في القائمة.",
    find: "ابحث عن عضو…", none: "لا توجد مواقع محفوظة بعد.", noneEd: "لا توجد مواقع محفوظة — الصقها بالأسفل (سطر لكل عضو: الاسم X Y).", count: "{n} مدينة", pw: "القوة", copy: "📋 نسخ X:Y", copied: "تم النسخ ✅",
    notOn: "على الخريطة لكن ليس في القائمة:", notMap: "في القائمة لكن ليس على الخريطة:", paste: "📋 لصق المواقع", pasteNote: "سطر لكل عضو: الاسم X Y (مثل Sparrow 401 662). الاسم الموجود يُنقل، والأسماء الجديدة تُضاف. سطرا BT1 / BT2 لمصائد الدب.",
    apply: "تطبيق", replace: "استبدال الكل", cancel: "إلغاء", save: "💾 حفظ", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅ يراه الضباط الآخرون بعد التحديث.", unsaved: "لم يُحفظ بعد.", by: "اسمك",
    edit: "تغيير", del: "إزالة", name: "الاسم", bad: "تعذّرت قراءة: {l}", added: "أُضيف {a}، ونُقل {m}.", errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حدّث وحاول مجددًا.", errNet: "تعذّر الاتصال بـ GitHub — حاول مجددًا.", noKey: "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في تبويب النشر).", locked: "افتح بيانات الضباط لرؤية مواقع الأعضاء.", bt: "مصيدة الدب", hq: "المقر", banner: "راية", last: "حفظه {b} في {d}" },
  ko: { lgNow: "지금 연맹원 성", lgSpot: "계획한 자리", lgThere: "새 자리에 도착", lgRoad: "길 깃발", lgEarly: "먼저 세우는 벌집 깃발", lgS1: "1단계 깃발", lgS2: "2단계 깃발", lgBuilt: "세움", lgHq: "새 본부", lgKill: "철거", stT: "🧭 이사 단계", tapTick: "지도에 이미 보이면 ✅가 저절로 붙어요 (우리 깃발이 그 자리에 있음, 본부 / 곰 함정 / 연맹원이 새 X Y에 있음). 나머지는 눌러서 직접 체크하세요.", stRoad: "길: 우리 영토에서 새 본부까지 깃발", stEarly: "먼저 세우는 벌집 깃발 / 다른 연맹 깃발 철거", stKill: "철거", stHq: "본부를 {xy}로 이전", stS1: "1단계 깃발 (BT2 쪽)", stS2: "2단계 깃발 (BT1 쪽)", stMove2: "BT2 쪽 연맹원 이사", stMove1: "BT1 쪽 연맹원 이사", stMove: "연맹원 이사", stM2: "{d} / {n} 이사함", stM1: "{d} / {n} 이사함", stM: "{d} / {n} 이사함", stBt: "곰 함정은 마지막", stOther: "계획의 다른 깃발", stNow: "지금", budget: "깃발: 세워진 {a}개 + 더 세울 {b}개 = {c} / 285", budgetBad: "한도 초과, 먼저 옛 깃발 {n}개를 철거하세요", autoB: "우리 깃발이 이미 여기 있어요 (🗺️ 지도)", rulesT: "📘 벌집 규칙과 팁", rules: ["연맹 본부는 평원이나 황무지 고리에만 지을 수 있어요 — 비옥한 땅(#2189에서 X, Y 450–749)이나 유적 고리에는 절대 안 돼요. 본부는 비옥한 땅 가장자리 바로 밖에 두고, 성은 그 안쪽으로 배치하세요.", "모든 깃발은 본부와 이어져야 해요(직접 또는 다른 깃발을 통해). 하나가 부서지거나 끊기면 거기에 기댄 땅은 모두 무효가 돼요. 배치 도구에서 성과 영토 색을 끄고 연결이 진짜인지 확인하세요.", "전초기지 건설 금지 구역에는 깃발을 둘 수 없어요. 연맹당 한도: 깃발 285개, 연맹원 성 100개, 곰 함정 2개.", "성의 4칸이 모두 우리 영토 안에 있어야 영토 보너스를 받고 곰 사냥에도 포함돼요.", "곰 함정 하나가 주변 성 약 50개를 맡아요.", "이사 전에 그 지역에 다른 플레이어의 성, 연맹 건물, 산, 호수가 있는지 확인하세요.", "순서: 본부 먼저 → 깃발은 BT2에서 바깥쪽으로 → 자리가 영토가 된 연맹원부터 이사 → 곰 함정은 마지막. 연맹원은 절대 곰 함정을 직접 옮기지 마세요.", "깃발은 지을수록 비싸져요. 길고 가는 깃발 줄은 피하고, 바깥 깃발은 수비하세요. 크게 바꾸기 전에 계획을 백업해 두세요."], addT: "➕ 자리 추가 / 변경", addNote: "이름과 새 X Y를 입력하세요. 그 자리가 계획의 빈자리면 이름이 들어가고, 아니면 새 자리가 추가돼요. 원래 자리는 비게 돼요.", addOk: "설정", addDel: "계획에서 빼기", freeList: "계획의 빈자리 (누르면 입력돼요)", mvPage: "🚚 연맹 이사", mvIntro: "간부 전용. 이사 계획을 불러오고 이사한 사람을 체크하세요 — 권한 있는 사람이 이어서 할 수 있어요.", noPlan: "아직 불러온 계획이 없어요.", imp: "📥 이사 계획 불러오기 (.csv / .json)", impNote: "Kingshot Mapper (ksmapper.pages.dev): 내보내기 → CSV (파일 다운로드), 성 라벨은 연맹원 이름. 다른 배치 사이트의 .json도 돼요. 간부 전용 — 연맹원은 여기서 아무것도 바꿀 수 없어요. 깃발 라벨: R1… 길, P1… 먼저 세우는 벌집 깃발, S1-1… 1단계, S2-1… 2단계, “KILL TTT” = 철거할 다른 연맹 깃발.", impOk: "계획 불러옴: 성 {c}개 (이름 있는 성 {n}개), 곰 함정 {b}개, 깃발 {f}개.", impBad: "배치 계획 파일이 아닌 것 같아요.", impDel: "계획 삭제", vNow: "📍 현재", vPlan: "🧭 이사 계획", mvT: "🚚 이사 표", mvProg: "{d} / {n}명 이사함", mvLeft: "아직 안 한 사람만", colN: "연맹원", colNow: "현재", colNew: "새 위치", colDone: "완료", free: "계획에 이름 없는 자리 {n}개.", noPlace: "계획에 없음", auto: "이미 도착", planBy: "{d}에 불러온 계획", fixed: "이름 {n}개를 명단 표기로 바꿨어요.", t: "👥 연맹원 위치", note: "게임 속 우리 성 위치 (X:Y = 게임의 성 좌표). 성을 누르면 좌표가 보여요. 파랑 = 명단에 있음, 주황 = 명단에서 이름을 못 찾음.",
    find: "연맹원 찾기…", none: "저장된 위치가 아직 없어요.", noneEd: "저장된 위치가 없어요 — 아래에 붙여 넣으세요 (한 줄에 하나: 이름 X Y).", count: "성 {n}개", pw: "전투력", copy: "📋 X:Y 복사", copied: "복사됨 ✅",
    notOn: "지도엔 있지만 명단에 없음:", notMap: "명단엔 있지만 지도에 없음:", paste: "📋 위치 붙여넣기", pasteNote: "한 줄에 하나: 이름 X Y (예: Sparrow 401 662). 이미 있는 이름은 옮겨지고 새 이름은 추가돼요. BT1 / BT2 줄은 곰 함정이에요.",
    apply: "적용", replace: "전부 바꾸기", cancel: "취소", save: "💾 저장", saving: "저장 중…", saved: "저장됨 ✅ 다른 간부는 새로고침하면 보여요.", unsaved: "아직 저장 안 됨.", by: "이름",
    edit: "변경", del: "삭제", name: "이름", bad: "읽을 수 없음: {l}", added: "{a}명 추가, {m}명 이동.", errAuth: "저장된 GitHub 키가 더 이상 안 돼요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 새로고침 후 다시 해 주세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 해 주세요.", noKey: "저장하려면 간부 GitHub 키가 필요해요 (게시 탭에서 설정).", locked: "간부 데이터를 잠금 해제해야 위치가 보여요.", bt: "곰 함정", hq: "본부", banner: "깃발", last: "{b}님이 {d}에 저장" },
};
let lang = "en", G = null, D = null, SAVED = "", SEL = null, msg = "", roster = null, banners = [], pasteOpen = false, onlyLeft = false;
/* 🚚 moving plan — its own officer tab (#move), admins only unless the 👥 table gives it; saved apart from the positions */
const MV_PATH = "data/move-plan-x7k2p9.json";
let MV = { plan: null, done: [], st: {} }, MV_SAVED = "", mvMsg = "";
const MED = () => OFFICER.can("move", "edit");
const mvSnap = () => JSON.stringify({ plan: MV.plan, done: MV.done, st: MV.st || {} });
const t = (k) => (T[lang] || T.en)[k] || T.en[k];
const ED = () => OFFICER.can("map", "edit");
const norm = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const snap = () => JSON.stringify({ m: D.m, bt: D.bt });
const BT0 = [[401, 676], [401, 660]];   // BT1, BT2

/* screen: right = X−Y, up = X+Y (k = half a tile's width, r = height / width like the game's view) */
const K = 16, R = 0.74;
let O = { dx: 0, sy: 0 };
const P = (x, y) => [((x - y) - O.dx) * K, (O.sy - (x + y)) * K * R];
const poly = (x, y, n) => [[x, y], [x + n, y], [x + n, y + n], [x, y + n]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ");

function rosterIndex() {
  const idx = {}; for (const m of (roster && roster.members) || []) idx[norm(m.name)] = m;
  for (const [n] of (D && D.m) || []) if (!idx[norm(n)]) { const r = closest(n); if (r) idx[norm(n)] = r; }   // "Andre" → Andree
  return idx;
}
/* the roster member a typed / pasted name most likely means: same letters ignoring case & symbols, one name inside
   the other, or at most 1–2 letters different (2 only for longer names). Only when exactly one member fits. */
function lev(a, b) {
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } }
  return d[b.length];
}
function closest(name) {
  const q = norm(name), ms = (roster && roster.members) || []; if (!q || !ms.length) return null;
  const exact = ms.find((m) => norm(m.name) === q); if (exact) return exact;
  const fit = (f) => { const c = ms.filter(f); return c.length === 1 ? c[0] : null; };
  return (q.length >= 3 && fit((m) => { const n = norm(m.name); return n.length >= 3 && (n.includes(q) || q.includes(n)); }))
    || fit((m) => lev(q, norm(m.name)) <= (q.length >= 6 ? 2 : 1));
}
const fmtPw = (n) => n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n ? String(n) : "";

/* one map for the move: members where they are now (👥 positions, editable) + the moving plan drawn over it as a blueprint
   (planned city spots, road / stage banners, new HQ, Bear Traps, banners of other alliances to take down) + what is done */
const TAGC = { R: "#222222", P: "#6a3d9a", S1: "#d4a017", S2: "#e07b39" };
const tagKind = (tag) => !tag ? "" : /^S1-/i.test(tag) ? "S1" : /^S2-/i.test(tag) ? "S2" : tag[0].toUpperCase();
function ownSet() { const KS = window.KM_SHARED; return new Set((KS ? KS.banners() : banners.map(([x, y]) => [x, y, 1])).map(([x, y]) => x + "," + y)); }
function draw(boxId = "mm_map") {
  const box = $(boxId); if (!box) return;
  const PL = MV && MV.plan ? MV.plan : null, cities = D.m, traps = D.bt;
  const pc = PL ? PL.c || [] : [], pb = PL ? PL.b || [] : [], ph = PL ? PL.hq || [] : [], pt = PL ? PL.bt || [] : [], pk = PL ? PL.k || [] : [];
  if (!cities.length && !pc.length) { box.innerHTML = ""; return; }
  const all = cities.map(([, x, y]) => [x, y]).concat(traps, pc.map(([, x, y]) => [x, y]), pb, ph, pt, pk);
  let x1 = Math.min(...all.map((a) => a[0])) - 6, x2 = Math.max(...all.map((a) => a[0])) + 8, y1 = Math.min(...all.map((a) => a[1])) - 6, y2 = Math.max(...all.map((a) => a[1])) + 8;   // a few tiles around for context
  O = { dx: x1 - y2, sy: x2 + y2 };
  const W = ((x2 - y1) - (x1 - y2)) * K, H = ((x2 + y2) - (x1 + y1)) * K * R;
  const idx = rosterIndex(), s = [];
  s.push(`<polygon points="${[[x1, y1], [x2, y1], [x2, y2], [x1, y2]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="#5f8a3a" stroke="#3d5e22" stroke-width="2"/>`);
  const KS = window.KM_SHARED, inB = (x, y) => x >= x1 && x <= x2 && y >= y1 && y <= y2;
  /* ⛰️ mountains / lakes from the map tab's obstacle layer (same data as 🗺️ ⛰️ Obstacles) */
  if (KS) for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) { const o = KS.obst(x, y);
    if (o) s.push(`<polygon points="${poly(x, y, 1)}" fill="${o === 1 ? "#8a8a96" : "#3a7fd0"}" stroke="${o === 1 ? "#77777f" : "#2f6cb3"}" stroke-width=".6"/>`); }
  /* 🏴 other alliances: their 7×7 territory shaded, the banner on top */
  const oth = KS ? KS.others().filter(([, bx, by]) => bx >= x1 - 3 && bx <= x2 + 3 && by >= y1 - 3 && by <= y2 + 3) : [];
  for (const [, bx, by, col] of oth) s.push(`<polygon points="${poly(bx - 3, by - 3, 7)}" fill="${esc(col)}" fill-opacity=".18" stroke="none"/>`);
  for (const [n, bx, by, col] of oth) if (inB(bx, by)) s.push(`<polygon points="${poly(bx, by, 1)}" fill="${esc(col)}" stroke="#fff" stroke-width="1"><title>🏴 ${esc(n)} X:${bx} Y:${by}</title></polygon>`);
  /* 🏳️ our banners exactly as the map tab has them (officers' edits included); 🚩 planned on the map tab */
  const bl = KS ? KS.banners() : banners.map(([x, y]) => [x, y, 1]);
  for (const [bx, by] of bl) if (inB(bx, by))
    s.push(`<g class="mm-f"><polygon points="${poly(bx, by, 1)}" fill="#0b3d91" stroke="#cfe4ff" stroke-width="1"/><title>${esc(t("banner"))} X:${bx} Y:${by}</title></g>`);
  if (KS) for (const [bx, by] of KS.planned()) if (inB(bx, by))
    s.push(`<polygon points="${poly(bx, by, 1)}" fill="none" stroke="#ffde4a" stroke-width="1.6" stroke-dasharray="3 2"><title>🚩 X:${bx} Y:${by}</title></polygon>`);
  const here = {}; cities.forEach(([n, x, y]) => here[norm(n)] = [x, y]);
  const doneSet = new Set((MV.done || []).map(norm));
  if (PL) {
    /* 🧭 planned city spots: dashed outline + the member's name; green once that member is there (or ticked) */
    for (const [n, x, y] of pc) { const [cx, cy] = P(x + 1, y + 1), h = n && here[norm(n)], ok = n && ((h && h[0] === x && h[1] === y) || doneSet.has(norm(n)));
      s.push(`<g><polygon points="${poly(x, y, 2)}" fill="${ok ? "#8fd19e" : "#ffffff22"}" stroke="#ffffffcc" stroke-width="1" stroke-dasharray="${ok ? "" : "3 2"}"/>`
        + (n && !ok ? `<text x="${cx}" y="${cy + 3}" text-anchor="middle" class="mm-pn">${esc(n.length > 10 ? n.slice(0, 9) + "…" : n)}</text>` : "") + `<title>🧭 ${esc(n || "—")} X:${x} Y:${y}</title></g>`); }
    /* new HQ: 3×3 + its 15×15 territory, dashed until it stands there */
    for (const [hx, hy] of ph) { const [cx, cy] = P(hx + 1.5, hy + 1.5);
      s.push(`<polygon points="${poly(hx - 6, hy - 6, 15)}" fill="none" stroke="#c39bff" stroke-width="1.6" stroke-dasharray="6 4"/><polygon points="${poly(hx, hy, 3)}" fill="#8e6bbf88" stroke="#c39bff" stroke-width="2" stroke-dasharray="4 3"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">HQ</text>`); }
    pt.forEach(([bx, by], i) => { const [cx, cy] = P(bx + 1.5, by + 1.5);
      s.push(`<polygon points="${poly(bx, by, 3)}" fill="#7a523355" stroke="#e3a34a" stroke-width="2" stroke-dasharray="4 3"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">BT${i + 1}</text>`); });
    /* blueprint banners: numbered and coloured by step; solid with a green rim once our banner stands there */
    const own = ownSet(), man = new Set((MV.st && MV.st.b) || []);
    for (const [bx, by, tag] of pb) { const [cx, cy] = P(bx + .5, by + .5), built = own.has(bx + "," + by) || man.has(bx + "," + by), col = TAGC[tagKind(tag)] || "#0b3d91";
      s.push(`<g><polygon points="${poly(bx, by, 1)}" fill="${built ? "#0b3d91" : col}" stroke="${built ? "#8fd19e" : "#fff"}" stroke-width="${built ? 2.4 : 1.2}"/>`
        + (tag ? `<text x="${cx}" y="${cy - 9}" text-anchor="middle" class="mm-tg" style="fill:${built ? "#8fd19e" : "#fff"}">${esc(tag)}</text>` : "") + `<title>${esc(tag || t("banner"))} X:${bx} Y:${by}${built ? " ✅" : ""}</title></g>`); }
    const gone = new Set((MV.st && MV.st.k) || []);
    for (const [bx, by, n] of pk) { const [cx, cy] = P(bx + .5, by + .5);
      s.push(`<text x="${cx}" y="${cy + 6}" text-anchor="middle" class="mm-kill" style="fill:${gone.has(bx + "," + by) ? "#8fd19e" : "#ff6b6b"}">${gone.has(bx + "," + by) ? "✓" : "✖"}<title>${esc(t("stKill"))} ${esc(n)} X:${bx} Y:${by}</title></text>`); }
  }
  for (const [i, [hx, hy]] of (G && G.hq ? G.hq.slice(0, 1) : []).entries()) if (hx >= x1 && hx <= x2 && hy >= y1 && hy <= y2) {
    const [cx, cy] = P(hx + 1.5, hy + 1.5);
    s.push(`<g class="mm-b" data-k="hq${i}"><polygon points="${poly(hx, hy, 3)}" fill="#2b6cc4" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">HQ</text></g>`);
  }
  traps.forEach(([bx, by], i) => { const [cx, cy] = P(bx + 1.5, by + 1.5);
    s.push(`<g class="mm-b" data-k="bt${i}"><polygon points="${poly(bx, by, 3)}" fill="#7a5233" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">BT${i + 1}</text></g>`); });
  // far cities first so the near ones (and their names) sit on top, like in game
  const tgt = {}; pc.forEach(([n, x, y]) => { if (n) tgt[norm(n)] = [x, y]; });
  const order = cities.map((m, i) => [m, i]).sort((a, b) => (b[0][1] + b[0][2]) - (a[0][1] + a[0][2]));
  for (const [[n, x, y], i] of order) {
    const [cx, cy] = P(x + 1, y + 1), on = !!idx[norm(n)], sel = SEL === i, g = tgt[norm(n)], arrived = g && g[0] === x && g[1] === y;
    s.push(`<g class="mm-c${sel ? " sel" : ""}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(n)} X${x} Y${y}"><polygon points="${poly(x, y, 2)}" fill="${arrived ? "#8fd19e" : on ? "#9ec3f0" : "#f3b46b"}" stroke="${sel ? "#ffde4a" : "#ffffffcc"}" stroke-width="${sel ? 3 : 1.2}"/>`
      + `<text x="${cx}" y="${cy + 3}" text-anchor="middle" class="mm-n">${esc(n.length > 10 ? n.slice(0, 9) + "…" : n)}</text></g>`);
  }
  box.innerHTML = `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" width="${Math.max(W + 12, 300)}" style="display:block;max-width:none">${s.join("")}</svg>`;
  const v = (PL ? "p" : "n") + cities.length + "," + pc.length;
  if (SEL == null && box.dataset.v !== v) { box.dataset.v = v;   // open on the new HQ when there is a plan, else in the middle
    const sc = box.scrollWidth / (W + 12), f = ph[0] ? P(ph[0][0] + 6, ph[0][1] + 6) : null;
    box.scrollLeft = f ? (f[0] + 6) * sc - box.clientWidth / 2 : (box.scrollWidth - box.clientWidth) / 2;
    box.scrollTop = f ? (f[1] + 6) * sc - box.clientHeight / 2 : (box.scrollHeight - box.clientHeight) / 2; }
  box.querySelectorAll(".mm-c").forEach((g) => { g.onclick = () => select(+g.dataset.i, false); g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(+g.dataset.i, false); } }; });
  box.querySelectorAll(".mm-b").forEach((g) => g.onclick = () => { const k = g.dataset.k; SEL = null; info(k); draw(); });
}
/* legend under the map (only with a plan) */
function legend() {
  if (!(MV && MV.plan)) return "";
  const sw = (c, txt, dash) => `<span class="mm-lg"><i style="background:${c};${dash ? "border:1.5px dashed #fff;" : ""}"></i>${esc(txt)}</span>`;
  return `<div class="mm-legend">${sw("#9ec3f0", t("lgNow"))}${sw("#ffffff33", t("lgSpot"), 1)}${sw("#8fd19e", t("lgThere"))}${sw(TAGC.R, t("lgRoad"))}${sw(TAGC.P, t("lgEarly"))}${sw(TAGC.S1, t("lgS1"))}${sw(TAGC.S2, t("lgS2"))}${sw("#0b3d91", t("lgBuilt"))}${sw("#8e6bbf88", t("lgHq"), 1)}<span class="mm-lg"><b style="color:#ff6b6b">✖</b> ${esc(t("lgKill"))}</span></div>`;
}
function select(i, scroll) {
  SEL = i; draw(); info();
  if (scroll) { const g = $("mm_map").querySelector(`.mm-c[data-i="${i}"]`), box = $("mm_map"); if (g) { const r = g.getBoundingClientRect(), b = box.getBoundingClientRect(); box.scrollLeft += r.left - b.left - b.width / 2 + r.width / 2; box.scrollTop += r.top - b.top - b.height / 2; } }
}
function info(k) {
  const el = $("mm_info"); if (!el) return;
  if (k) { const bt = /^bt/.test(k), [x, y] = bt ? D.bt[+k[2]] : G.hq[0];
    el.innerHTML = `<b>${esc(bt ? `${t("bt")} ${+k[2] + 1}` : `[NXS] ${t("hq")}`)}</b> · X:${x} Y:${y}` + (bt && ED() ? ` <span class="mm-ed"><input class="inp" id="mm_bx" type="number" value="${x}"> <input class="inp" id="mm_by" type="number" value="${y}"> <button class="btn small" id="mm_bok">${esc(t("edit"))}</button></span>` : "");
    if ($("mm_bok")) $("mm_bok").onclick = () => { D.bt[+k[2]] = [+$("mm_bx").value, +$("mm_by").value]; msg = t("unsaved"); render(); };
    return; }
  if (SEL == null || !D.m[SEL]) { el.innerHTML = ""; return; }
  const [n, x, y] = D.m[SEL], m = rosterIndex()[norm(n)];
  el.innerHTML = `<b dir="auto">${esc(n)}</b>${m && norm(m.name) !== norm(n) ? ` <span class="muted">(≈ ${esc(m.name)})</span>` : ""} · X:${x} Y:${y}${m && m.power ? ` · ${esc(t("pw"))} ${fmtPw(+m.power)}` : ""} <button class="btn small" id="mm_copy">${esc(t("copy"))}</button>`
    + (ED() ? `<div class="mm-ed" style="margin-top:6px"><input class="inp" id="mm_en" value="${esc(n)}" style="width:150px"> X <input class="inp" id="mm_ex" type="number" value="${x}"> Y <input class="inp" id="mm_ey" type="number" value="${y}"> <button class="btn small" id="mm_eok">${esc(t("edit"))}</button> <button class="btn small" id="mm_edel">${esc(t("del"))}</button></div>` : "");
  $("mm_copy").onclick = async () => { try { await navigator.clipboard.writeText(`X:${x} Y:${y}`); $("mm_copy").textContent = t("copied"); } catch (e) {} };
  if ($("mm_eok")) $("mm_eok").onclick = () => { D.m[SEL] = [$("mm_en").value.trim() || n, +$("mm_ex").value, +$("mm_ey").value]; msg = t("unsaved"); render(); };
  if ($("mm_edel")) $("mm_edel").onclick = () => { D.m.splice(SEL, 1); SEL = null; msg = t("unsaved"); render(); };
}
/* "Name X Y", "Name X:401 Y:662", "Name 401,662" … the last two numbers are the coordinates */
function parse(text) {
  const out = [], bad = [];
  for (const line of String(text).split(/\r?\n/)) {
    const l = line.trim(); if (!l || l.startsWith("#")) continue;
    const m = l.match(/^(.*?)[\s,:;|\t]*X?\s*[:：]?\s*(\d{1,4})\s*[\s,;:|\/]\s*Y?\s*[:：]?\s*(\d{1,4})\s*$/i);
    if (!m || !m[1].trim()) { bad.push(l); continue; }
    out.push([m[1].trim().replace(/^\[NXS\]\s*/i, "").replace(/^兰\s*/, ""), +m[2], +m[3]]);
  }
  return { out, bad };
}
function applyPaste(replace) {
  const { out, bad } = parse($("mm_paste").value);
  if (replace) D.m = [];
  let a = 0, mv = 0;
  for (const [n, x, y] of out) {
    const bt = n.match(/^BT\s*([12])$/i); if (bt) { D.bt[+bt[1] - 1] = [x, y]; continue; }
    const j = D.m.findIndex(([m]) => norm(m) === norm(n));   // names are kept exactly as typed (members missing from the roster too)
    if (j >= 0) { D.m[j] = [n, x, y]; mv++; } else { D.m.push([n, x, y]); a++; }
  }
  msg = (bad.length ? t("bad").replace("{l}", bad.slice(0, 3).join(" / ")) + " " : "") + t("added").replace("{a}", a).replace("{m}", mv) + " " + t("unsaved");
  if (!bad.length) { pasteOpen = false; }
  SEL = null; render();
}
async function save() {
  if (!ED()) return;
  if (!OFFICER.token) { msg = t("noKey"); render(); return; }
  const by = ($("mm_byn").value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  msg = t("saving"); render();
  const next = { m: D.m, bt: D.bt, by, at: new Date().toISOString() };
  const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", PATH, null, OFFICER.token);
      try { await OFFICER.gh("PUT", PATH, { message: `Member positions (${by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: "main" }, OFFICER.token); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    D = next; SAVED = snap(); msg = t("saved");
  } catch (e) { msg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  render();
}
/* 📥 a plan saved by the layout planner: { v, alliances:[{id,name}], active, objects:[{t:"city"|"trap"|"hq"|"banner", x, y, a, n}] } */
/* 📥 Kingshot Mapper (ksmapper.pages.dev) CSV: "type,X,Y,label,#color,seq" (types city, beartrap, banner, hq, resource, obs1–3),
   or its city export "Label, X, Y". Several alliances in one file are told apart by colour: we take the colour whose city labels
   match our member positions best (else the colour with the most cities). seq is kept with each city for move ordering later. */
function csvPlan(text) {
  const rows = [];
  for (const line of String(text).split(/\r?\n/)) {
    const f = line.split(/[,\t;]/).map((x) => x.trim()); if (f.length < 3) continue;
    const ty = f[0].toLowerCase();
    if (["city", "beartrap", "banner", "hq", "resource", "obs1", "obs2", "obs3"].includes(ty) && /^\d+$/.test(f[1]) && /^\d+$/.test(f[2]))
      rows.push({ t: ty, x: +f[1], y: +f[2], n: f[3] || "", c: (f[4] || "").toLowerCase(), s: f[5] !== undefined && f[5] !== "" ? +f[5] : null });
    else { const m = line.match(/^\s*(.*?)[\s,;\t]+X?\s*[:：]?\s*(\d{1,4})[\s,;\t]+Y?\s*[:：]?\s*(\d{1,4})\s*$/i);   // "Label, X, Y"
      if (m && m[1] && !/^label$/i.test(m[1])) rows.push({ t: "city", x: +m[2], y: +m[3], n: m[1].replace(/[,;\t]+$/, "").trim(), c: "", s: null }); }
  }
  const cities = rows.filter((r) => r.t === "city"); if (!cities.length) return null;
  const lab = {}; cities.forEach((r) => { if (r.n) lab[norm(r.n)] = (lab[norm(r.n)] || 0) + 1; });
  cities.forEach((r) => { if (r.n && lab[norm(r.n)] > 2) r.n = ""; });   // the same label on many cities ("NXS") is the alliance tag, not a member → an empty spot
  const known = new Set(((D && D.m) || []).map(([n]) => norm(n))), by = {};
  for (const r of cities) { const k = r.c || "-"; by[k] = by[k] || { n: 0, hit: 0 }; by[k].n++; if (r.n && known.has(norm(r.n))) by[k].hit++; }
  const col = Object.keys(by).sort((a, b) => (by[b].hit - by[a].hit) || (by[b].n - by[a].n))[0];
  const ours = (r) => (r.c || "-") === col;
  /* traps, HQ and banners have their own colours in Kingshot Mapper: ours are the ones in or around our cities' area */
  const mc = cities.filter(ours), x1 = Math.min(...mc.map((r) => r.x)) - 12, x2 = Math.max(...mc.map((r) => r.x)) + 12, y1 = Math.min(...mc.map((r) => r.y)) - 12, y2 = Math.max(...mc.map((r) => r.y)) + 12;
  const inA = (r) => r.x >= x1 && r.x <= x2 && r.y >= y1 && r.y <= y2;
  const pick = (k) => rows.filter((r) => r.t === k && inA(r)).map((r) => [r.x, r.y]);
  /* blueprint labels: R1… road banners, P1… hive banners built early, S1-1… stage 1 (BT2 side), S2-1… stage 2; “KILL TTT” = another
     alliance's banner we must take down first. Bear Traps keep their order from the label (Bear Trap 1, Bear Trap 2). */
  const TAG = /^(R\d+|P\d+|S[12]-\d+)$/i, KILL = /^kill\b/i;
  const bt = rows.filter((r) => r.t === "beartrap" && inA(r)).sort((a, b) => (+((a.n.match(/\d+/) || [9])[0])) - (+((b.n.match(/\d+/) || [9])[0]))).map((r) => [r.x, r.y]);
  const b = rows.filter((r) => r.t === "banner" && !KILL.test(r.n) && (inA(r) || TAG.test(r.n))).map((r) => TAG.test(r.n) ? [r.x, r.y, r.n.toUpperCase()] : [r.x, r.y]);
  const k = rows.filter((r) => r.t === "banner" && KILL.test(r.n)).map((r) => [r.x, r.y, r.n.replace(KILL, "").trim()]);
  return { c: cities.filter(ours).map((r) => r.s != null ? [r.n, r.x, r.y, r.s] : [r.n, r.x, r.y]), bt, hq: pick("hq"), b, k };
}
function importPlan(text, file) {
  let j; try { j = JSON.parse(text); } catch (e) {
    const p = csvPlan(text); if (!p) { mvMsg = t("impBad"); return renderMove(); }
    MV.plan = { ...p, at: new Date().toISOString(), file: String(file || "").slice(0, 80) }; MV.done = MV.done || []; MV.st = {};
    mvMsg = t("impOk").replace("{c}", p.c.length).replace("{n}", p.c.filter(([n]) => n).length).replace("{b}", p.bt.length).replace("{f}", p.b.length) + " " + t("unsaved");
    render(); return renderMove(); }
  const objs = j && Array.isArray(j.objects) ? j.objects : null; if (!objs) { mvMsg = t("impBad"); return renderMove(); }
  const count = {}; for (const o of objs) if (o.t === "city") count[o.a] = (count[o.a] || 0) + 1;
  const A = count[j.active] ? j.active : Object.keys(count).sort((a, b) => count[b] - count[a])[0];
  const mine = objs.filter((o) => o.a === A && Number.isFinite(+o.x) && Number.isFinite(+o.y));
  const pick = (k) => mine.filter((o) => o.t === k).map((o) => [+o.x, +o.y]);
  const c = mine.filter((o) => o.t === "city").map((o) => [String(o.n || "").trim(), +o.x, +o.y]);
  if (!c.length) { mvMsg = t("impBad"); return renderMove(); }
  MV.plan = { c, bt: pick("trap"), hq: pick("hq"), b: pick("banner"), at: new Date().toISOString(), file: String(file || "").slice(0, 80) };
  MV.done = MV.done || [];
  mvMsg = t("impOk").replace("{c}", c.length).replace("{n}", c.filter(([n]) => n).length).replace("{b}", MV.plan.bt.length).replace("{f}", MV.plan.b.length) + " " + t("unsaved");
  MV.st = {}; render(); renderMove();
}
/* 🚚 one row per member: where they are, where the plan puts them, moved ✓ (only officers with Map edit can tick) */
function moveTable() {
  if (!MV.plan) return "";
  const now = {}; D.m.forEach(([n, x, y]) => now[norm(n)] = [n, x, y]);
  const tgt = {}; MV.plan.c.forEach(([n, x, y]) => { if (n) tgt[norm(n)] = [n, x, y]; });
  const keys = [...new Set(Object.keys(tgt).concat(Object.keys(now)))];
  const done = new Set((MV.done || []).map(norm)), ed = MED();
  const rows = keys.map((k) => { const a = now[k], b = tgt[k], there = a && b && a[1] === b[1] && a[2] === b[2];
    return { k, name: (b || a)[0], a, b, ok: done.has(k) || there, there }; })
    .sort((p, q) => (p.ok - q.ok) || (!p.b - !q.b) || p.name.localeCompare(q.name));
  const withT = rows.filter((r) => r.b), nDone = withT.filter((r) => r.ok).length, free = MV.plan.c.filter(([n]) => !n).length;
  const xy = (p) => p ? `X:${p[1]} Y:${p[2]}` : "—";
  return `<div class="mm-mv"><h4 style="margin:14px 0 4px">${esc(t("mvT"))} <span class="muted" style="font-weight:400;font-size:13px">${esc(t("mvProg").replace("{d}", nDone).replace("{n}", withT.length))}${MV.plan.at ? " · " + esc(t("planBy").replace("{d}", String(MV.plan.at).slice(0, 10))) : ""}</span></h4>
    <div class="mm-bar"><span style="width:${withT.length ? Math.round(100 * nDone / withT.length) : 0}%"></span></div>
    ${free ? `<div class="muted" style="font-size:12.5px;margin:4px 0">${esc(t("free").replace("{n}", free))}</div>` : ""}
    <label class="row" style="gap:6px;font-size:13px;margin:6px 0"><input type="checkbox" id="mm_left"${onlyLeft ? " checked" : ""}> ${esc(t("mvLeft"))}</label>
    <div class="mm-tw"><table class="mm-t"><thead><tr><th>${esc(t("colN"))}</th><th>${esc(t("colNow"))}</th><th>${esc(t("colNew"))}</th><th>${esc(t("colDone"))}</th></tr></thead><tbody>
    ${rows.filter((r) => !onlyLeft || !r.ok).map((r) => `<tr class="${r.ok ? "ok" : ""}"><td dir="auto">${esc(r.name)}</td><td>${xy(r.a)}</td><td>${r.b ? `<button class="btn small mm-cp" data-c="X:${r.b[1]} Y:${r.b[2]}">${xy(r.b)}</button>` : `<span class="muted">${esc(t("noPlace"))}</span>`}</td>
      <td>${r.there ? `<span title="${esc(t("auto"))}">✅</span>` : r.b ? `<input type="checkbox" data-done="${esc(r.k)}"${r.ok ? " checked" : ""}${ed ? "" : " disabled"}>` : ""}</td></tr>`).join("")}
    </tbody></table></div></div>`;
}
function lists() {
  const idx = rosterIndex(), onMap = new Set(D.m.map(([n]) => norm(n)));
  const notOn = D.m.filter(([n]) => !idx[norm(n)]).map(([n]) => n);
  const notMap = roster ? ((roster.members) || []).filter((m) => !onMap.has(norm(m.name))).map((m) => m.name) : [];
  return (roster && notOn.length ? `<div class="mm-l"><b>${esc(t("notOn"))}</b> ${notOn.map((n) => `<span class="mm-chip warn" data-n="${esc(n)}">${esc(n)}</span>`).join(" ")}</div>` : "")
    + (notMap.length ? `<div class="mm-l"><b>${esc(t("notMap"))}</b> ${notMap.map((n) => `<span class="mm-chip">${esc(n)}</span>`).join(" ")}</div>` : "");
}
function render() {
  const el = $("km_members"); if (!el || !D) return;
  const dirty = snap() !== SAVED, ed = ED();
  let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
  el.innerHTML = `<h3 style="margin:0 0 4px">${esc(t("t"))} <span class="muted" style="font-size:13px;font-weight:400">${D.m.length ? esc(t("count").replace("{n}", D.m.length)) : ""}</span></h3>
    <div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(t("note"))}${D.at ? " · " + esc(t("last").replace("{d}", String(D.at).slice(0, 10)).replace("{b}", D.by || "?")) : ""}</div>
    ${D.m.length ? `<input class="inp" id="mm_find" list="mm_names" placeholder="${esc(t("find"))}" style="max-width:260px;margin-bottom:6px"><datalist id="mm_names">${D.m.map(([n]) => `<option value="${esc(n)}">`).join("")}</datalist>` : `<div class="muted">${esc(t(ed ? "noneEd" : "none"))}</div>`}
    <div class="mm-info" id="mm_info"></div>
    <div class="mm-map" id="mm_map"></div>
    ${legend()}
    ${lists()}
    ${ed ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center">
      <button class="btn" id="mm_pbtn">${esc(t("paste"))}</button>
      ${dirty ? `<input class="inp" id="mm_byn" value="${esc(by)}" placeholder="${esc(t("by"))}" style="width:130px"><button class="btn primary" id="mm_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(msg)}</span></div>
      <div id="mm_pbox" ${pasteOpen || !D.m.length ? "" : "hidden"} style="margin-top:8px"><div class="muted" style="font-size:12.5px">${esc(t("pasteNote"))}</div>
      <textarea class="inp" id="mm_paste" rows="8" style="width:100%;box-sizing:border-box;font-family:ui-monospace,monospace;margin-top:4px"></textarea>
      <div class="row" style="gap:8px;margin-top:6px"><button class="btn primary" id="mm_apply">${esc(t("apply"))}</button>${D.m.length ? `<button class="btn" id="mm_repl">${esc(t("replace"))}</button>` : ""}<button class="btn" id="mm_pcan">${esc(t("cancel"))}</button></div></div>` : ""}`;
  draw(); info();
  if ($("mm_find")) $("mm_find").oninput = (e) => { const q = norm(e.target.value); if (!q) return; const i = D.m.findIndex(([n]) => norm(n) === q); const j = i >= 0 ? i : D.m.findIndex(([n]) => norm(n).startsWith(q)); if (j >= 0) select(j, true); };
  el.querySelectorAll(".mm-chip[data-n]").forEach((c) => c.onclick = () => { const i = D.m.findIndex(([n]) => n === c.dataset.n); if (i >= 0) select(i, true); });
  if (!ed) return;
  /* the box opens with the whole current list, so any name or X Y can be fixed right there, then "Replace all" */
  const listText = () => D.m.map(([n, x, y]) => `${n} ${x} ${y}`).concat(D.bt.map(([x, y], i) => `BT${i + 1} ${x} ${y}`)).join("\n");
  if (D.m.length && !$("mm_paste").value) $("mm_paste").value = listText();
  $("mm_pbtn").onclick = () => { pasteOpen = !pasteOpen; $("mm_pbox").hidden = !pasteOpen; if (pasteOpen) { if (D.m.length) $("mm_paste").value = listText(); $("mm_paste").focus(); } };
  $("mm_apply").onclick = () => applyPaste(false);
  if ($("mm_repl")) $("mm_repl").onclick = () => applyPaste(true);
  $("mm_pcan").onclick = () => { pasteOpen = false; $("mm_pbox").hidden = true; };
  if ($("mm_save")) $("mm_save").onclick = save;
}
async function load() {
  let d = null;
  const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", PATH, null, OFFICER.token); d = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; } catch (e) {} }
  if (!d) { try { d = await OfficerData.fetchJson(PATH); } catch (e) {} }
  D = d && Array.isArray(d.m) ? d : { m: [], bt: BT0.map((a) => a.slice()) };
  if (!Array.isArray(D.bt) || D.bt.length < 2) D.bt = BT0.map((a) => a.slice());
  SAVED = snap();
}
async function init(map) {
  G = map; lang = OFFICER.lang || "en";
  const el = $("km_members"); if (!el) return;
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<h3 style="margin:0 0 4px">${esc(t("t"))}</h3><div class="muted">${esc(t("locked"))}</div>`; return; }
  if (!window.KM_SHARED) { try { banners = ((await fetch("data/banners-2189.json?v=20").then((r) => r.json())).b || []).map(([x, y]) => [x, y]); } catch (e) {} }
  await load(); render();
  try { roster = await OfficerData.fetchJsonFast("data/roster-x7k2p9.json", (r) => { roster = r; render(); }); } catch (e) {}
  render();
}
/* 🧭 the move step by step, read from the blueprint labels: ✅ comes by itself when the map already shows it
   (our banner standing there, the HQ / a Bear Trap at its new X Y, a member at their new spot); officers with the edit right tick the rest */
const tagNum = (tag) => +((String(tag).match(/(\d+)$/) || [0, 0])[1]);
function steps() {
  const PL = MV.plan; if (!PL) return "";
  const st = MV.st = MV.st || {}, ed = MED(), own = ownSet(), man = new Set(st.b || []), gone = new Set(st.k || []);
  const pb = PL.b || [], grp = (re) => pb.filter((b) => b[2] && re.test(b[2])).sort((a, b) => tagNum(a[2]) - tagNum(b[2]));
  const R_ = grp(/^R\d/i), P_ = grp(/^P\d/i), S1 = grp(/^S1-/i), S2 = grp(/^S2-/i), rest = pb.filter((b) => !b[2]);
  const bState = ([x, y]) => own.has(x + "," + y) ? 2 : man.has(x + "," + y) ? 1 : 0;
  const ico = (d) => d ? "✅" : "⬜";
  const chip = (b) => { const d = bState(b); return `<button type="button" class="btn small mv-chip${d ? " ok" : ""}" data-b="${b[0]},${b[1]}"${d === 2 || !ed ? " disabled" : ""}${d === 2 ? ` title="${esc(t("autoB"))}"` : ""}>${ico(d)} ${b[2] ? `<b>${esc(b[2])}</b> ` : ""}${b[0]},${b[1]}</button>`; };
  const kchip = ([x, y, n]) => { const d = gone.has(x + "," + y); return `<button type="button" class="btn small mv-chip${d ? " ok" : ""}" data-k="${x},${y}"${ed ? "" : " disabled"}>${ico(d)} ✖ ${esc(n || "")} ${x},${y}</button>`; };
  const hq = (PL.hq || [])[0], hqAuto = hq && G && G.hq && G.hq[0] && G.hq[0][0] === hq[0] && G.hq[0][1] === hq[1], hqD = hqAuto ? 2 : st.hq ? 1 : 0;
  const pt = PL.bt || [], btD = pt.map(([x, y], i) => D.bt[i] && D.bt[i][0] === x && D.bt[i][1] === y ? 2 : (st.bt || [])[i] ? 1 : 0);
  /* members: each planned spot belongs to the Bear Trap it is closest to */
  const here = {}; D.m.forEach(([n, x, y]) => here[norm(n)] = [x, y]); const doneSet = new Set((MV.done || []).map(norm));
  const side = [0, 0].map(() => ({ n: 0, d: 0 }));
  for (const [n, x, y] of PL.c || []) { if (!n) continue;
    const i = pt.length < 2 ? 0 : (Math.hypot(x - pt[0][0], y - pt[0][1]) <= Math.hypot(x - pt[1][0], y - pt[1][1]) ? 0 : 1), h = here[norm(n)];
    side[i].n++; if ((h && h[0] === x && h[1] === y) || doneSet.has(norm(n))) side[i].d++; }
  const all = (arr) => arr.every((b) => bState(b));
  const phases = [];
  if (R_.length) phases.push({ h: t("stRoad"), body: R_.map(chip).join(" "), ok: all(R_) });
  if (P_.length || (PL.k || []).length) phases.push({ h: t("stEarly"), body: P_.map(chip).concat((PL.k || []).map(kchip)).join(" "), ok: all(P_) && (PL.k || []).every(([x, y]) => gone.has(x + "," + y)) });
  if (hq) phases.push({ h: t("stHq").replace("{xy}", `${hq[0]},${hq[1]}`), body: `<button type="button" class="btn small mv-chip${hqD ? " ok" : ""}" data-hq="1"${hqD === 2 || !ed ? " disabled" : ""}>${ico(hqD)} HQ ${hq[0]},${hq[1]}</button>`, ok: !!hqD });
  const two = pt.length >= 2, mline = (i) => `<span class="mv-cnt">${esc(t(two ? (i ? "stM2" : "stM1") : "stM").replace("{d}", side[i].d).replace("{n}", side[i].n))}</span>`;
  if (S1.length) phases.push({ h: t("stS1"), body: S1.map(chip).join(" "), ok: all(S1) });
  phases.push({ h: two ? t("stMove2") : t("stMove"), body: mline(two ? 1 : 0), ok: side[two ? 1 : 0].n > 0 && side[two ? 1 : 0].d === side[two ? 1 : 0].n });
  if (S2.length) phases.push({ h: t("stS2"), body: S2.map(chip).join(" "), ok: all(S2) });
  if (two) phases.push({ h: t("stMove1"), body: mline(0), ok: side[0].n > 0 && side[0].d === side[0].n });
  if (pt.length) phases.push({ h: t("stBt"), body: pt.map(([x, y], i) => `<button type="button" class="btn small mv-chip${btD[i] ? " ok" : ""}" data-bt="${i}"${btD[i] === 2 || !ed ? " disabled" : ""}>${ico(btD[i])} BT${i + 1} ${x},${y}</button>`).join(" "), ok: btD.every(Boolean) });
  if (rest.length) phases.push({ h: t("stOther"), body: rest.map(chip).join(" "), ok: all(rest) });
  const cur = phases.findIndex((p) => !p.ok);
  /* banner budget: what stands now + blueprint banners not built yet, against the alliance limit */
  const left = pb.filter((b) => !bState(b)).length, now = own.size, tot = now + left;
  return `<h4 style="margin:4px 0 2px">${esc(t("stT"))}</h4><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("tapTick"))}</div>`
    + phases.map((p, i) => `<div class="mv-ph${p.ok ? " ok" : ""}${i === cur ? " cur" : ""}"><div class="mv-ph-h">${p.ok ? "✅" : i === cur ? "▶" : `${i + 1}.`} ${esc(p.h)}${i === cur ? ` <span class="mv-now">${esc(t("stNow"))}</span>` : ""}</div><div class="mv-ph-b">${p.body}</div></div>`).join("")
    + `<div class="${tot > 285 ? "mv-warn" : "muted"}" style="font-size:13px;margin-top:8px">${esc(t("budget").replace("{a}", now).replace("{b}", left).replace("{c}", tot))}${tot > 285 ? " — " + esc(t("budgetBad").replace("{n}", tot - 285)) : ""}</div>`;
}
function bindSteps(el) {
  const tog = (key, v) => { const st = MV.st = MV.st || {}, set = new Set(st[key] || []); if (set.has(v)) set.delete(v); else set.add(v); st[key] = [...set]; mvMsg = t("unsaved"); render(); renderMove(); };
  el.querySelectorAll(".mv-chip[data-b]").forEach((b) => b.onclick = () => MED() && tog("b", b.dataset.b));
  el.querySelectorAll(".mv-chip[data-k]").forEach((b) => b.onclick = () => MED() && tog("k", b.dataset.k));
  el.querySelectorAll(".mv-chip[data-hq]").forEach((b) => b.onclick = () => { if (!MED()) return; MV.st = MV.st || {}; MV.st.hq = !MV.st.hq; mvMsg = t("unsaved"); renderMove(); });
  el.querySelectorAll(".mv-chip[data-bt]").forEach((b) => b.onclick = () => { if (!MED()) return; const st = MV.st = MV.st || {}, i = +b.dataset.bt; st.bt = st.bt || []; st.bt[i] = !st.bt[i]; mvMsg = t("unsaved"); renderMove(); });
}
function renderMove() {
  const el = $("mv_root"); if (!el || !D) return;
  const ed = MED(), dirty = mvSnap() !== MV_SAVED;
  let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
  el.innerHTML = `${MV.plan ? `<div id="mv_steps">${steps()}</div>` : `<div class="muted" style="margin-bottom:8px">${esc(t("noPlan"))}</div>`}
    ${moveTable()}
    ${ed && MV.plan ? `<div class="mm-add" style="margin-top:12px"><b>${esc(t("addT"))}</b> <span class="muted" style="font-size:12.5px">${esc(t("addNote"))}</span>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center"><input class="inp" id="mv_an" list="mv_names" placeholder="${esc(t("name"))}" style="width:150px">
      <datalist id="mv_names">${[...new Set(D.m.map(([n]) => n).concat(MV.plan.c.map(([n]) => n).filter(Boolean)))].map((n) => `<option value="${esc(n)}">`).join("")}</datalist>
      X <input class="inp" id="mv_ax" type="number" style="width:80px"> Y <input class="inp" id="mv_ay" type="number" style="width:80px">
      <button class="btn small primary" id="mv_aok">${esc(t("addOk"))}</button><button class="btn small" id="mv_adel">${esc(t("addDel"))}</button></div>
      ${MV.plan.c.some(([n]) => !n) ? `<details style="margin-top:6px"><summary class="muted" style="font-size:12.5px;cursor:pointer">${esc(t("freeList"))}</summary><div style="margin-top:4px">${MV.plan.c.filter(([n]) => !n).map(([, x, y]) => `<button class="btn small mv-slot" data-x="${x}" data-y="${y}">X:${x} Y:${y}</button>`).join(" ")}</div></details>` : ""}</div>` : ""}
    ${ed ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;align-items:center">
      <label class="btn" for="mv_file">${esc(t("imp"))}</label><input type="file" id="mv_file" accept=".json,.csv,.txt,application/json,text/csv,text/plain" hidden>
      ${MV.plan ? `<button class="btn" id="mv_pdel">${esc(t("impDel"))}</button>` : ""}
      ${dirty ? `<input class="inp" id="mv_byn" value="${esc(by)}" placeholder="${esc(t("by"))}" style="width:130px"><button class="btn primary" id="mv_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(mvMsg)}</span></div>
      <div class="muted" style="font-size:12px;margin-top:4px">${esc(t("impNote"))}</div>` : ""}`;
  bindSteps(el);
  if ($("mm_left")) $("mm_left").onchange = (e) => { onlyLeft = e.target.checked; renderMove(); };
  el.querySelectorAll(".mm-cp").forEach((b) => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = t("copied"); } catch (e) {} });
  el.querySelectorAll("[data-done]").forEach((c) => c.onchange = () => { if (!MED()) return; const k = c.dataset.done, set = new Set((MV.done || []).map(norm));
    if (c.checked) set.add(k); else set.delete(k); MV.done = [...set]; mvMsg = t("unsaved"); render(); renderMove(); });
  if (!ed) return;
  $("mv_file").onchange = async (e) => { const f = e.target.files[0]; e.target.value = ""; if (f) importPlan(await f.text(), f.name); };
  if ($("mv_pdel")) $("mv_pdel").onclick = () => { if (!window.confirm(t("impDel") + "?")) return; MV = { plan: null, done: [], st: {} }; mvMsg = t("unsaved"); render(); renderMove(); };
  if ($("mv_save")) $("mv_save").onclick = saveMove;
  /* ➕ give someone a spot (or change it): the name takes an empty planned spot at that X Y, else a new spot is added */
  el.querySelectorAll(".mv-slot").forEach((b) => b.onclick = () => { $("mv_ax").value = b.dataset.x; $("mv_ay").value = b.dataset.y; $("mv_an").focus(); });
  if ($("mv_aok")) $("mv_aok").onclick = () => {
    const n = $("mv_an").value.trim(), x = +$("mv_ax").value, y = +$("mv_ay").value; if (!n || !x || !y) return;
    const c = MV.plan.c; c.forEach((r) => { if (norm(r[0]) === norm(n)) r[0] = ""; });   // their old planned spot becomes free
    const slot = c.find((r) => r[1] === x && r[2] === y);
    if (slot) slot[0] = n; else c.push([n, x, y]);
    mvMsg = `${n} → X:${x} Y:${y} · ${t("unsaved")}`; render(); renderMove(); };
  if ($("mv_adel")) $("mv_adel").onclick = () => { const n = $("mv_an").value.trim(); if (!n) return;
    MV.plan.c.forEach((r) => { if (norm(r[0]) === norm(n)) r[0] = ""; }); mvMsg = `${n} · ${t("unsaved")}`; render(); renderMove(); };
}
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
async function saveMove() {
  if (!MED()) return;
  if (!OFFICER.token) { mvMsg = t("noKey"); renderMove(); return; }
  const by = ($("mv_byn").value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  mvMsg = t("saving"); renderMove();
  const next = { plan: MV.plan, done: MV.done || [], st: MV.st || {}, by, at: new Date().toISOString() };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", MV_PATH, null, OFFICER.token);
      try { await OFFICER.gh("PUT", MV_PATH, { message: `Moving plan (${by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: "main" }, OFFICER.token); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    MV = next; MV_SAVED = mvSnap(); mvMsg = t("saved");
  } catch (e) { mvMsg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  renderMove();
}
async function loadMove() {
  let d = null;
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", MV_PATH, null, OFFICER.token); d = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; } catch (e) {} }
  if (!d) { try { d = await OfficerData.fetchJson(MV_PATH); } catch (e) {} }
  MV = d && d.plan ? { plan: d.plan, done: d.done || [], st: d.st || {}, by: d.by, at: d.at } : { plan: null, done: [], st: {} };
  MV_SAVED = mvSnap();
}
/* the 🚚 tab: needs the map tab's data (positions, banners, obstacles), so that one starts first (hidden) */
async function initMove() {
  const el = $("mv_root"); if (!el) return;
  $("mv_title").textContent = t("mvPage"); $("mv_intro").textContent = t("mvIntro"); rulesCard();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<div class="muted">${esc(t("locked"))}</div>`; return; }
  if (OFFICER.ensure) await OFFICER.ensure("map");
  for (let i = 0; i < 50 && !D; i++) await new Promise((r) => setTimeout(r, 100));
  await loadMove(); render(); renderMove();
  if (window.HivePlanner) HivePlanner.init();   // 📐 auto plan from a Mapper layout
}
/* 📘 hive rules (from public guides + what officers checked in game), shown above the move table */
function rulesCard() { const c = $("mv_rules"); if (!c) return; c.querySelector("summary").textContent = t("rulesT"); c.querySelector("ol").innerHTML = (T[lang] || T.en).rules.map((x) => `<li>${esc(x)}</li>`).join(""); }
function setLang(l) { lang = l; if (window.HivePlanner && $("hp_root") && $("hp_root").innerHTML) HivePlanner.setLang(l); if (D) render(); if ($("mv_title")) { $("mv_title").textContent = t("mvPage"); $("mv_intro").textContent = t("mvIntro"); rulesCard(); } if (D && $("mv_root") && $("mv_root").innerHTML) renderMove(); }
let rT = 0;
function refresh() { clearTimeout(rT); rT = setTimeout(() => { if (D) { draw(); const st = $("mv_steps"); if (st && MV.plan) { st.innerHTML = steps(); bindSteps(st); } } }, 150); }   // the map tab's banners / obstacles changed
window.MemberMap = { init, setLang, refresh, importPlan };   // importPlan: 📐 the auto planner (js/officer/planner.js) hands its blueprint over
OFFICER_PAGES.move = { init: initMove, onShow: () => { if (D && MV) renderMove(); }, applyTexts: () => {}, setLang };
})();
