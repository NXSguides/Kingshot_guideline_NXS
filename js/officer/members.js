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
  en: { addT: "➕ Add / change a spot", addNote: "Type a name and its new X Y. An empty planned spot there gets the name, otherwise a new spot is added; their old spot becomes free.", addOk: "Set", addDel: "Take out of plan", freeList: "Empty planned spots (tap one to use it)", mvPage: "🚚 Alliance move", mvIntro: "Officers only. Load the moving plan, then tick members as they move — anyone with the right can take over.", noPlan: "No moving plan loaded yet.", imp: "📥 Load moving plan (.json)", impNote: "The file saved from the layout planner (cities with member names). Officers only — members can't change anything here.", impOk: "Plan loaded: {c} cities ({n} with names), {b} Bear Traps, {f} banners.", impBad: "That file doesn't look like a layout plan.", impDel: "Remove plan", vNow: "📍 Now", vPlan: "🧭 Moving plan", mvT: "🚚 Moving table", mvProg: "{d} / {n} moved", mvLeft: "Only not moved yet", colN: "Member", colNow: "Now", colNew: "New spot", colDone: "Moved", free: "{n} planned spots have no name yet.", noPlace: "not in the plan", auto: "already there", planBy: "Plan loaded {d}", fixed: "{n} names changed to the roster spelling.", t: "👥 Member positions", note: "Our cities as they sit in game (X:Y = the city's tile in game). Tap a city for its coordinates. Blue = on the roster, orange = name not found on the roster.",
    find: "Find a member…", none: "No positions saved yet.", noneEd: "No positions saved yet — paste them below (one per line: name X Y).", count: "{n} cities", pw: "Power", copy: "📋 Copy X:Y", copied: "Copied ✅",
    notOn: "On the map but not found on the roster:", notMap: "On the roster but not on the map:", paste: "📋 Paste positions", pasteNote: "One per line: name X Y (e.g. Sparrow 401 662). The box shows the current list — fix any name or coordinates here and press Replace all. Apply only adds new names and moves existing ones. BT1 / BT2 lines set the Bear Traps.",
    apply: "Apply", replace: "Replace all", cancel: "Cancel", save: "💾 Save", saving: "Saving…", saved: "Saved ✅ The other officers see it after a refresh.", unsaved: "Not saved yet.", by: "Your name",
    edit: "Change", del: "Remove", name: "Name", bad: "Couldn't read: {l}", added: "{a} added, {m} moved.", errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — refresh and try again.", errNet: "Couldn't reach GitHub — try again.", noKey: "Saving needs the officers' GitHub key (set up on the Post tab).", locked: "Unlock the officer data to see member positions.", bt: "Bear Trap", hq: "HQ", banner: "Banner", last: "Last saved {d} by {b}" },
  zh: { addT: "➕ 新增／修改位置", addNote: "輸入名字和新的 X Y。那裡如果是計畫裡的空位就填進去，不是的話就新增一個位置；他原本的位置會空出來。", addOk: "設定", addDel: "從計畫移除", freeList: "計畫裡的空位（點一下就帶入）", mvPage: "🚚 聯盟搬家", mvIntro: "只有幹部看得到。載入搬家計畫後，成員搬好就勾一下，有權限的人都可以接手。", noPlan: "還沒載入搬家計畫。", imp: "📥 載入搬家計畫（.json）", impNote: "從規劃網站存出來的檔案（城要填上成員名字）。只有幹部看得到，成員沒辦法改。", impOk: "已載入計畫：{c} 座城（{n} 座有名字）、{b} 個熊陷阱、{f} 面旗幟。", impBad: "這個檔案看起來不是規劃網站的計畫檔。", impDel: "移除計畫", vNow: "📍 現在位置", vPlan: "🧭 搬家計畫", mvT: "🚚 搬家對照表", mvProg: "已搬 {d} / {n}", mvLeft: "只看還沒搬的", colN: "成員", colNow: "現在", colNew: "新位置", colDone: "已搬", free: "計畫裡還有 {n} 個位置沒填名字。", noPlace: "計畫裡沒有", auto: "已經在新位置", planBy: "計畫載入於 {d}", fixed: "{n} 個名字已改成名單上的寫法。", t: "👥 成員位置", note: "我們的城在遊戲裡的位置（X:Y 是遊戲裡城的座標）。點一下城可以看座標。藍色 = 名單上有，橘色 = 名單上找不到這個名字。",
    find: "找成員…", none: "還沒有存位置。", noneEd: "還沒有存位置，請在下面貼上（一行一個：名字 X Y）。", count: "{n} 座城", pw: "戰力", copy: "📋 複製 X:Y", copied: "已複製 ✅",
    notOn: "地圖上有、名單上找不到：", notMap: "名單上有、地圖上沒有：", paste: "📋 貼上位置", pasteNote: "一行一個：名字 X Y（例如 Sparrow 401 662）。框裡會先放目前的整份名單，直接在這裡改名字或座標，再按「全部取代」就好。「套用」只會新增新名字、移動已有的名字。BT1／BT2 那行是熊陷阱。",
    apply: "套用", replace: "全部取代", cancel: "取消", save: "💾 儲存", saving: "儲存中…", saved: "已儲存 ✅ 其他幹部重新整理後就看得到。", unsaved: "還沒儲存。", by: "你的名字",
    edit: "修改", del: "移除", name: "名字", bad: "看不懂這行：{l}", added: "新增 {a} 個，移動 {m} 個。", errAuth: "存好的 GitHub 金鑰失效了，請找 Sherry。", errBusy: "有人同時儲存了，請重新整理再試一次。", errNet: "連不到 GitHub，請再試一次。", noKey: "儲存需要幹部的 GitHub 金鑰（在 Post 分頁設定）。", locked: "解鎖幹部資料後才看得到成員位置。", bt: "熊陷阱", hq: "總部", banner: "旗幟", last: "{b} 在 {d} 儲存" },
  pt: { addT: "➕ Adicionar / mudar lugar", addNote: "Digite um nome e o novo X Y. Um lugar vazio do plano ali recebe o nome; senão um lugar novo é criado; o lugar antigo fica livre.", addOk: "Definir", addDel: "Tirar do plano", freeList: "Lugares vazios do plano (toque para usar)", mvPage: "🚚 Mudança da aliança", mvIntro: "Só oficiais. Carregue o plano e marque os membros conforme mudam — quem tiver permissão pode continuar.", noPlan: "Nenhum plano carregado ainda.", imp: "📥 Carregar plano de mudança (.json)", impNote: "O arquivo salvo do planejador (cidades com o nome dos membros). Só oficiais — membros não podem mudar nada aqui.", impOk: "Plano carregado: {c} cidades ({n} com nome), {b} Armadilhas, {f} estandartes.", impBad: "Esse arquivo não parece um plano do planejador.", impDel: "Remover plano", vNow: "📍 Agora", vPlan: "🧭 Plano de mudança", mvT: "🚚 Tabela de mudança", mvProg: "{d} / {n} mudaram", mvLeft: "Só quem ainda não mudou", colN: "Membro", colNow: "Agora", colNew: "Novo lugar", colDone: "Mudou", free: "{n} lugares do plano ainda sem nome.", noPlace: "fora do plano", auto: "já está lá", planBy: "Plano carregado {d}", fixed: "{n} nomes trocados pela grafia do roster.", t: "👥 Posições dos membros", note: "Nossas cidades como estão no jogo (X:Y = o tile da cidade no jogo). Toque numa cidade para ver as coordenadas. Azul = está no roster, laranja = nome não encontrado no roster.",
    find: "Encontrar membro…", none: "Nenhuma posição salva ainda.", noneEd: "Nenhuma posição salva — cole abaixo (uma por linha: nome X Y).", count: "{n} cidades", pw: "Poder", copy: "📋 Copiar X:Y", copied: "Copiado ✅",
    notOn: "No mapa mas não no roster:", notMap: "No roster mas não no mapa:", paste: "📋 Colar posições", pasteNote: "Uma por linha: nome X Y (ex.: Sparrow 401 662). Um nome que já está no mapa é movido; nomes novos são adicionados. Linhas BT1 / BT2 definem as Armadilhas de Urso.",
    apply: "Aplicar", replace: "Substituir tudo", cancel: "Cancelar", save: "💾 Salvar", saving: "Salvando…", saved: "Salvo ✅ Os outros oficiais veem após atualizar.", unsaved: "Ainda não salvo.", by: "Seu nome",
    edit: "Alterar", del: "Remover", name: "Nome", bad: "Não deu para ler: {l}", added: "{a} adicionados, {m} movidos.", errAuth: "A chave do GitHub salva não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — atualize e tente de novo.", errNet: "Não foi possível conectar ao GitHub — tente de novo.", noKey: "Salvar precisa da chave do GitHub dos oficiais (configurada na aba Postar).", locked: "Desbloqueie os dados dos oficiais para ver as posições.", bt: "Armadilha de Urso", hq: "QG", banner: "Estandarte", last: "Salvo em {d} por {b}" },
  ar: { addT: "➕ إضافة / تغيير مكان", addNote: "اكتب الاسم وX Y الجديدين. المكان الفارغ هناك يأخذ الاسم وإلا يُضاف مكان جديد؛ ويصبح مكانه القديم فارغًا.", addOk: "تعيين", addDel: "إخراجه من الخطة", freeList: "أماكن فارغة في الخطة (اضغط لاستخدامها)", mvPage: "🚚 انتقال التحالف", mvIntro: "للضباط فقط. حمّل خطة الانتقال ثم علّم الأعضاء عند انتقالهم — يمكن لأي شخص لديه الصلاحية المتابعة.", noPlan: "لم تُحمَّل خطة بعد.", imp: "📥 تحميل خطة الانتقال (.json)", impNote: "الملف المحفوظ من أداة التخطيط (مدن بأسماء الأعضاء). للضباط فقط — لا يستطيع الأعضاء تغيير شيء هنا.", impOk: "تم تحميل الخطة: {c} مدينة ({n} بأسماء)، {b} مصيدة، {f} راية.", impBad: "هذا الملف لا يبدو خطة من أداة التخطيط.", impDel: "إزالة الخطة", vNow: "📍 الآن", vPlan: "🧭 خطة الانتقال", mvT: "🚚 جدول الانتقال", mvProg: "انتقل {d} / {n}", mvLeft: "من لم ينتقل فقط", colN: "العضو", colNow: "الآن", colNew: "المكان الجديد", colDone: "انتقل", free: "{n} مكانًا في الخطة بلا اسم بعد.", noPlace: "ليس في الخطة", auto: "موجود هناك", planBy: "حُمّلت الخطة {d}", fixed: "غُيّر {n} اسمًا إلى كتابته في القائمة.", t: "👥 مواقع الأعضاء", note: "مدننا كما هي في اللعبة (X:Y = مربع المدينة في اللعبة). اضغط على مدينة لترى إحداثياتها. أزرق = في القائمة، برتقالي = الاسم غير موجود في القائمة.",
    find: "ابحث عن عضو…", none: "لا توجد مواقع محفوظة بعد.", noneEd: "لا توجد مواقع محفوظة — الصقها بالأسفل (سطر لكل عضو: الاسم X Y).", count: "{n} مدينة", pw: "القوة", copy: "📋 نسخ X:Y", copied: "تم النسخ ✅",
    notOn: "على الخريطة لكن ليس في القائمة:", notMap: "في القائمة لكن ليس على الخريطة:", paste: "📋 لصق المواقع", pasteNote: "سطر لكل عضو: الاسم X Y (مثل Sparrow 401 662). الاسم الموجود يُنقل، والأسماء الجديدة تُضاف. سطرا BT1 / BT2 لمصائد الدب.",
    apply: "تطبيق", replace: "استبدال الكل", cancel: "إلغاء", save: "💾 حفظ", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅ يراه الضباط الآخرون بعد التحديث.", unsaved: "لم يُحفظ بعد.", by: "اسمك",
    edit: "تغيير", del: "إزالة", name: "الاسم", bad: "تعذّرت قراءة: {l}", added: "أُضيف {a}، ونُقل {m}.", errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حدّث وحاول مجددًا.", errNet: "تعذّر الاتصال بـ GitHub — حاول مجددًا.", noKey: "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في تبويب النشر).", locked: "افتح بيانات الضباط لرؤية مواقع الأعضاء.", bt: "مصيدة الدب", hq: "المقر", banner: "راية", last: "حفظه {b} في {d}" },
  ko: { addT: "➕ 자리 추가 / 변경", addNote: "이름과 새 X Y를 입력하세요. 그 자리가 계획의 빈자리면 이름이 들어가고, 아니면 새 자리가 추가돼요. 원래 자리는 비게 돼요.", addOk: "설정", addDel: "계획에서 빼기", freeList: "계획의 빈자리 (누르면 입력돼요)", mvPage: "🚚 연맹 이사", mvIntro: "간부 전용. 이사 계획을 불러오고 이사한 사람을 체크하세요 — 권한 있는 사람이 이어서 할 수 있어요.", noPlan: "아직 불러온 계획이 없어요.", imp: "📥 이사 계획 불러오기 (.json)", impNote: "배치 계획 사이트에서 저장한 파일 (성에 연맹원 이름 입력). 간부 전용 — 연맹원은 여기서 아무것도 바꿀 수 없어요.", impOk: "계획 불러옴: 성 {c}개 (이름 있는 성 {n}개), 곰 함정 {b}개, 깃발 {f}개.", impBad: "배치 계획 파일이 아닌 것 같아요.", impDel: "계획 삭제", vNow: "📍 현재", vPlan: "🧭 이사 계획", mvT: "🚚 이사 표", mvProg: "{d} / {n}명 이사함", mvLeft: "아직 안 한 사람만", colN: "연맹원", colNow: "현재", colNew: "새 위치", colDone: "완료", free: "계획에 이름 없는 자리 {n}개.", noPlace: "계획에 없음", auto: "이미 도착", planBy: "{d}에 불러온 계획", fixed: "이름 {n}개를 명단 표기로 바꿨어요.", t: "👥 연맹원 위치", note: "게임 속 우리 성 위치 (X:Y = 게임의 성 좌표). 성을 누르면 좌표가 보여요. 파랑 = 명단에 있음, 주황 = 명단에서 이름을 못 찾음.",
    find: "연맹원 찾기…", none: "저장된 위치가 아직 없어요.", noneEd: "저장된 위치가 없어요 — 아래에 붙여 넣으세요 (한 줄에 하나: 이름 X Y).", count: "성 {n}개", pw: "전투력", copy: "📋 X:Y 복사", copied: "복사됨 ✅",
    notOn: "지도엔 있지만 명단에 없음:", notMap: "명단엔 있지만 지도에 없음:", paste: "📋 위치 붙여넣기", pasteNote: "한 줄에 하나: 이름 X Y (예: Sparrow 401 662). 이미 있는 이름은 옮겨지고 새 이름은 추가돼요. BT1 / BT2 줄은 곰 함정이에요.",
    apply: "적용", replace: "전부 바꾸기", cancel: "취소", save: "💾 저장", saving: "저장 중…", saved: "저장됨 ✅ 다른 간부는 새로고침하면 보여요.", unsaved: "아직 저장 안 됨.", by: "이름",
    edit: "변경", del: "삭제", name: "이름", bad: "읽을 수 없음: {l}", added: "{a}명 추가, {m}명 이동.", errAuth: "저장된 GitHub 키가 더 이상 안 돼요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 새로고침 후 다시 해 주세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 해 주세요.", noKey: "저장하려면 간부 GitHub 키가 필요해요 (게시 탭에서 설정).", locked: "간부 데이터를 잠금 해제해야 위치가 보여요.", bt: "곰 함정", hq: "본부", banner: "깃발", last: "{b}님이 {d}에 저장" },
};
let lang = "en", G = null, D = null, SAVED = "", SEL = null, msg = "", roster = null, banners = [], pasteOpen = false, VIEW = "plan", onlyLeft = false;
/* 🚚 moving plan — its own officer tab (#move), admins only unless the 👥 table gives it; saved apart from the positions */
const MV_PATH = "data/move-plan-x7k2p9.json";
let MV = { plan: null, done: [] }, MV_SAVED = "", mvMsg = "";
const MED = () => OFFICER.can("move", "edit");
const mvSnap = () => JSON.stringify({ plan: MV.plan, done: MV.done });
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

function draw(boxId = "mm_map", PL = null) {
  const box = $(boxId); if (!box) return;
  const cities = PL ? PL.c : D.m, traps = PL ? PL.bt : D.bt;
  if (!cities.length) { box.innerHTML = ""; return; }
  const all = cities.map(([, x, y]) => [x, y]).concat(traps);
  let x1 = Math.min(...all.map((a) => a[0])) - 6, x2 = Math.max(...all.map((a) => a[0])) + 8, y1 = Math.min(...all.map((a) => a[1])) - 6, y2 = Math.max(...all.map((a) => a[1])) + 8;   // a few tiles around for context
  O = { dx: x1 - y2, sy: x2 + y2 };
  const W = ((x2 - y1) - (x1 - y2)) * K, H = ((x2 + y2) - (x1 + y1)) * K * R;
  const idx = rosterIndex(), s = [];
  s.push(`<polygon points="${[[x1, y1], [x2, y1], [x2, y2], [x1, y2]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="#5f8a3a" stroke="#3d5e22" stroke-width="2"/>`);
  const KS = window.KM_SHARED, inB = (x, y) => x >= x1 && x <= x2 && y >= y1 && y <= y2;
  /* ⛰️ mountains / lakes from the map tab's obstacle layer (same data as 🗺️ ⛰️ Obstacles) */
  if (KS) for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) { const o = KS.obst(x, y);
    if (o) s.push(`<polygon points="${poly(x, y, 1)}" fill="${o === 1 ? "#8a8a96" : "#3a7fd0"}" stroke="${o === 1 ? "#77777f" : "#2f6cb3"}" stroke-width=".6"/>`); }
  /* 🏳️ our banners exactly as the map tab has them (officers' edits included); 🚩 planned; 🏴 others */
  const bl = KS ? KS.banners() : banners.map(([x, y]) => [x, y, 1]);
  for (const [bx, by, c] of bl) if (inB(bx, by))
    s.push(`<g class="mm-f"><polygon points="${poly(bx, by, 1)}" fill="#0b3d91" stroke="#cfe4ff" stroke-width="1"/><title>${esc(t("banner"))} X:${bx} Y:${by}</title></g>`);
  if (KS) for (const [bx, by] of KS.planned()) if (inB(bx, by))
    s.push(`<polygon points="${poly(bx, by, 1)}" fill="none" stroke="#ffde4a" stroke-width="1.6" stroke-dasharray="3 2"><title>🚩 X:${bx} Y:${by}</title></polygon>`);
  if (KS) for (const [n, bx, by, col] of KS.others()) if (inB(bx, by))
    s.push(`<polygon points="${poly(bx, by, 1)}" fill="${esc(col)}" stroke="#fff" stroke-width="1"><title>🏴 ${esc(n)} X:${bx} Y:${by}</title></polygon>`);
  for (const [i, [hx, hy]] of (PL ? PL.hq : G && G.hq ? G.hq.slice(0, 1) : []).entries()) if (hx >= x1 && hx <= x2 && hy >= y1 && hy <= y2) {
    const [cx, cy] = P(hx + 1.5, hy + 1.5);
    s.push(`<g class="mm-b" data-k="hq${i}"><polygon points="${poly(hx, hy, 3)}" fill="#2b6cc4" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">HQ</text></g>`);
  }
  if (PL) for (const [bx, by] of PL.b) if (inB(bx, by)) s.push(`<polygon points="${poly(bx, by, 1)}" fill="#0b3d91" stroke="#ffde4a" stroke-width="1.2"><title>🧭 ${esc(t("banner"))} X:${bx} Y:${by}</title></polygon>`);
  traps.forEach(([bx, by], i) => { const [cx, cy] = P(bx + 1.5, by + 1.5);
    s.push(`<g class="mm-b" data-k="bt${i}"><polygon points="${poly(bx, by, 3)}" fill="#7a5233" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mm-bl">BT${i + 1}</text></g>`); });
  // far cities first so the near ones (and their names) sit on top, like in game
  const order = cities.map((m, i) => [m, i]).sort((a, b) => (b[0][1] + b[0][2]) - (a[0][1] + a[0][2]));
  const doneSet = new Set((MV.done || []).map(norm));
  for (const [[n, x, y], i] of order) {
    const [cx, cy] = P(x + 1, y + 1), on = PL ? doneSet.has(norm(n)) : !!idx[norm(n)], sel = !PL && SEL === i;
    s.push(`<g class="mm-c${sel ? " sel" : ""}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(n)} X${x} Y${y}"><polygon points="${poly(x, y, 2)}" fill="${PL ? (!n ? "#d8d8d8" : on ? "#8fd19e" : "#f6e3a1") : on ? "#9ec3f0" : "#f3b46b"}" stroke="${sel ? "#ffde4a" : "#ffffffcc"}" stroke-width="${sel ? 3 : 1.2}"/>`
      + `<text x="${cx}" y="${cy + 3}" text-anchor="middle" class="mm-n">${esc(!n ? "?" : n.length > 10 ? n.slice(0, 9) + "…" : n)}</text></g>`);
  }
  box.innerHTML = `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" width="${Math.max(W + 12, 300)}" style="display:block;max-width:none">${s.join("")}</svg>`;
  if ((PL || SEL == null) && box.dataset.v !== (PL ? "p" : "n") + cities.length) { box.dataset.v = (PL ? "p" : "n") + cities.length; box.scrollLeft = (box.scrollWidth - box.clientWidth) / 2; box.scrollTop = (box.scrollHeight - box.clientHeight) / 2; }   // open in the middle
  if (boxId !== "mm_map") return;   // the 🚚 page's map is for looking; its table is where the move is managed
  box.querySelectorAll(".mm-c").forEach((g) => { g.onclick = () => select(+g.dataset.i, false); g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(+g.dataset.i, false); } }; });
  box.querySelectorAll(".mm-b").forEach((g) => g.onclick = () => { const k = g.dataset.k; SEL = null; info(k); draw(); });
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
function importPlan(text, file) {
  let j; try { j = JSON.parse(text); } catch (e) { mvMsg = t("impBad"); return renderMove(); }
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
  VIEW = "plan"; renderMove();
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
function renderMove() {
  const el = $("mv_root"); if (!el || !D) return;
  const ed = MED(), dirty = mvSnap() !== MV_SAVED;
  let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
  el.innerHTML = `${MV.plan ? `<div class="row" style="gap:6px;margin-bottom:6px"><button class="btn small${VIEW === "now" ? " primary" : ""}" data-view="now">${esc(t("vNow"))}</button><button class="btn small${VIEW === "plan" ? " primary" : ""}" data-view="plan">${esc(t("vPlan"))}</button></div>` : `<div class="muted" style="margin-bottom:8px">${esc(t("noPlan"))}</div>`}
    <div class="mm-map" id="mv_map"></div>
    ${moveTable()}
    ${ed && MV.plan ? `<div class="mm-add" style="margin-top:12px"><b>${esc(t("addT"))}</b> <span class="muted" style="font-size:12.5px">${esc(t("addNote"))}</span>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center"><input class="inp" id="mv_an" list="mv_names" placeholder="${esc(t("name"))}" style="width:150px">
      <datalist id="mv_names">${[...new Set(D.m.map(([n]) => n).concat(MV.plan.c.map(([n]) => n).filter(Boolean)))].map((n) => `<option value="${esc(n)}">`).join("")}</datalist>
      X <input class="inp" id="mv_ax" type="number" style="width:80px"> Y <input class="inp" id="mv_ay" type="number" style="width:80px">
      <button class="btn small primary" id="mv_aok">${esc(t("addOk"))}</button><button class="btn small" id="mv_adel">${esc(t("addDel"))}</button></div>
      ${MV.plan.c.some(([n]) => !n) ? `<details style="margin-top:6px"><summary class="muted" style="font-size:12.5px;cursor:pointer">${esc(t("freeList"))}</summary><div style="margin-top:4px">${MV.plan.c.filter(([n]) => !n).map(([, x, y]) => `<button class="btn small mv-slot" data-x="${x}" data-y="${y}">X:${x} Y:${y}</button>`).join(" ")}</div></details>` : ""}</div>` : ""}
    ${ed ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;align-items:center">
      <label class="btn" for="mv_file">${esc(t("imp"))}</label><input type="file" id="mv_file" accept=".json,application/json" hidden>
      ${MV.plan ? `<button class="btn" id="mv_pdel">${esc(t("impDel"))}</button>` : ""}
      ${dirty ? `<input class="inp" id="mv_byn" value="${esc(by)}" placeholder="${esc(t("by"))}" style="width:130px"><button class="btn primary" id="mv_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(mvMsg)}</span></div>
      <div class="muted" style="font-size:12px;margin-top:4px">${esc(t("impNote"))}</div>` : ""}`;
  draw("mv_map", VIEW === "plan" && MV.plan ? MV.plan : null);
  el.querySelectorAll("[data-view]").forEach((b) => b.onclick = () => { VIEW = b.dataset.view; renderMove(); });
  if ($("mm_left")) $("mm_left").onchange = (e) => { onlyLeft = e.target.checked; renderMove(); };
  el.querySelectorAll(".mm-cp").forEach((b) => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = t("copied"); } catch (e) {} });
  el.querySelectorAll("[data-done]").forEach((c) => c.onchange = () => { if (!MED()) return; const k = c.dataset.done, set = new Set((MV.done || []).map(norm));
    if (c.checked) set.add(k); else set.delete(k); MV.done = [...set]; mvMsg = t("unsaved"); renderMove(); });
  if (!ed) return;
  $("mv_file").onchange = async (e) => { const f = e.target.files[0]; e.target.value = ""; if (f) importPlan(await f.text(), f.name); };
  if ($("mv_pdel")) $("mv_pdel").onclick = () => { if (!window.confirm(t("impDel") + "?")) return; MV = { plan: null, done: [] }; VIEW = "now"; mvMsg = t("unsaved"); renderMove(); };
  if ($("mv_save")) $("mv_save").onclick = saveMove;
  /* ➕ give someone a spot (or change it): the name takes an empty planned spot at that X Y, else a new spot is added */
  el.querySelectorAll(".mv-slot").forEach((b) => b.onclick = () => { $("mv_ax").value = b.dataset.x; $("mv_ay").value = b.dataset.y; $("mv_an").focus(); });
  if ($("mv_aok")) $("mv_aok").onclick = () => {
    const n = $("mv_an").value.trim(), x = +$("mv_ax").value, y = +$("mv_ay").value; if (!n || !x || !y) return;
    const c = MV.plan.c; c.forEach((r) => { if (norm(r[0]) === norm(n)) r[0] = ""; });   // their old planned spot becomes free
    const slot = c.find((r) => r[1] === x && r[2] === y);
    if (slot) slot[0] = n; else c.push([n, x, y]);
    mvMsg = `${n} → X:${x} Y:${y} · ${t("unsaved")}`; renderMove(); };
  if ($("mv_adel")) $("mv_adel").onclick = () => { const n = $("mv_an").value.trim(); if (!n) return;
    MV.plan.c.forEach((r) => { if (norm(r[0]) === norm(n)) r[0] = ""; }); mvMsg = `${n} · ${t("unsaved")}`; renderMove(); };
}
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
async function saveMove() {
  if (!MED()) return;
  if (!OFFICER.token) { mvMsg = t("noKey"); renderMove(); return; }
  const by = ($("mv_byn").value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  mvMsg = t("saving"); renderMove();
  const next = { plan: MV.plan, done: MV.done || [], by, at: new Date().toISOString() };
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
  MV = d && d.plan ? { plan: d.plan, done: d.done || [], by: d.by, at: d.at } : { plan: null, done: [] };
  MV_SAVED = mvSnap(); VIEW = MV.plan ? "plan" : "now";
}
/* the 🚚 tab: needs the map tab's data (positions, banners, obstacles), so that one starts first (hidden) */
async function initMove() {
  const el = $("mv_root"); if (!el) return;
  $("mv_title").textContent = t("mvPage"); $("mv_intro").textContent = t("mvIntro");
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<div class="muted">${esc(t("locked"))}</div>`; return; }
  if (OFFICER.ensure) await OFFICER.ensure("map");
  for (let i = 0; i < 50 && !D; i++) await new Promise((r) => setTimeout(r, 100));
  await loadMove(); renderMove();
}
function setLang(l) { lang = l; if (D) render(); if ($("mv_title")) { $("mv_title").textContent = t("mvPage"); $("mv_intro").textContent = t("mvIntro"); } if (D && $("mv_root") && $("mv_root").innerHTML) renderMove(); }
let rT = 0;
function refresh() { clearTimeout(rT); rT = setTimeout(() => { if (D) { draw(); if ($("mv_map")) draw("mv_map", VIEW === "plan" && MV.plan ? MV.plan : null); } }, 150); }   // the map tab's banners / obstacles changed
window.MemberMap = { init, setLang, refresh };
OFFICER_PAGES.move = { init: initMove, onShow: () => { if (D && MV) renderMove(); }, applyTexts: () => {}, setLang };
})();
