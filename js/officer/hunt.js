/* NXS officer page — 🎯 All Out blacklist (registers OFFICER_PAGES.hunt; own tab, nobody by default, admins always).
   Officers keep a list of player IDs (data/blacklist-x7k2p9.json, encrypted: { list: [{ id, note }], by, at }).
   A GitHub job (.github/workflows/blacklist-track.yml → scripts/blacklist-track.js) reads each player's map location and shield
   from MightPulse every 15 minutes while All Out runs (Events tab schedule) and right after the list is saved, into
   data/blacklist-live-x7k2p9.json (encrypted). Every time on this page is written "MM-DD HH:MM UTC (MM-DD HH:MM local)". */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const LIST = "data/blacklist-x7k2p9.json", LIVE = "data/blacklist-live-x7k2p9.json";
const T = {
  en: { seTip: "🛡️ Fix the shield by hand (MightPulse can be hours behind): time left on their shield, or no shield", seH: "h", seM: "min", seNone: "🚫 No shield", seMan: "✏️ {b} · {t}", stale: "⚠️ MightPulse hasn't refreshed {n} player(s) for over 2 hours (⚠️ next to the time). Open their MightPulse ↗ page or check in game, then ✏️ fix the position / 🛡️ shield by hand.", seBad: "Type the time left (hours and minutes).", starTip: "⭐ Mark: the whole row lights up and moves to the top, for every officer (saved with the list)", tmName: "🛡️ {n} shield ends {xy}", foTip: "Follow: a ⏰ timer (with a notification) when this player's shield ends — this phone / browser only", foOn: "⏰ Timer set for the end of the shield. It moves by itself if the shield changes.", foWait: "⏰ Following — no shield right now; the timer appears when they put one up.", foOff: "⏰ Not following any more.", title: "🎯 All Out blacklist", intro: "Officers only. Add players by their ID (the number on their profile). While All Out runs, everyone on the list is looked up every 15 minutes: where their castle is and whether their shield is up. MightPulse's data can be up to 60 minutes old — always check the data time.",
    win: "All Out {s} – {e}", on: "tracking every 15 minutes now", off: "not running — the list is looked up only when it is saved", next: "next All Out {s} – {e}",
    fetched: "Data fetched {t}", never: "Not fetched yet — save the list and the first look-up arrives in about 2 minutes.", reload: "↻ Reload",
    cNo: "#", cName: "Player", cAll: "Alliance", cKid: "Kingdom", cPos: "Castle X:Y", cShield: "Shield", cOn: "Online", cAsOf: "Data from",
    shieldUntil: "🛡️ until {t}", noShield: "— none", online: "🟢 online", lastLogin: "last login {t}", unknown: "?", notFound: "not found (check the ID)",
    copy: "📋", copied: "✅", addT: "➕ Add a player", id: "Player ID (paste several at once)", added: "{n} added.", note: "Note (name, why…)", add: "Add", del: "✕", dup: "Already on the list.", badId: "Type the player ID (numbers only).",
    save: "💾 Save list", by: "Your name", saving: "Saving…", saved: "Saved ✅ The look-up runs in about 2 minutes.", unsaved: "Not saved yet.",
    errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — refresh and try again.", errNet: "Couldn't reach GitHub — try again.",
    noKey: "Saving needs the officers' GitHub key (set up on the Post tab).", locked: "Unlock the officer data to see the blacklist.", empty: "The list is empty.", local: "local", mmNote: "🔴 no shield · 🔵 shield up · ⭐ gold ring = marked · ■ NXS HQ.", mmOpen: "🗺️ Show on the kingdom map", edTip: "✏️ Saw a newer spot (in game or on MightPulse)? Type it here — everyone sees it until MightPulse has something newer", edPh: "X Y", manual: "✏️ set by {b} · {t}", badXY: "Type X and Y (0–1199).", how: "🧭 How to use it: still at the same spot → go by the position here. Moved (not there any more) → open their MightPulse ↗ page for the newest spot, then ✏️ update it here so everyone finds them faster.", count: "{n} players" },
  zh: { seTip: "🛡️ 手動修正護盾（MightPulse 可能落後好幾個小時）：輸入護盾還剩多久，或沒有護盾", seH: "時", seM: "分", seNone: "🚫 沒有護盾", seMan: "✏️ {b} · {t}", stale: "⚠️ MightPulse 已經超過 2 小時沒更新 {n} 個人的資料（時間旁邊有 ⚠️）。請打開他的 MightPulse ↗ 或在遊戲裡確認，再用 ✏️ 手動修正位置／🛡️ 護盾。", seBad: "請輸入護盾剩下的時間（小時和分鐘）。", starTip: "⭐ 特別標記：整列亮起來並排到最上面，所有幹部都看得到（跟名單一起儲存）", tmName: "🛡️ {n} 護盾結束 {xy}", foTip: "追蹤：這個人的護盾結束時跳 ⏰ 計時提醒（只在這支手機／這個瀏覽器）", foOn: "⏰ 已設定護盾結束的計時器，護盾時間變了會自己跟著改。", foWait: "⏰ 已追蹤——他現在沒開護盾，開盾後計時器就會出現。", foOff: "⏰ 已取消追蹤。", title: "🎯 全軍出擊黑名單", intro: "只有幹部看得到。用玩家 ID（個人資料上的那串數字）加人。全軍出擊期間每 15 分鐘查一次名單上每個人的城在哪裡、有沒有開護盾。MightPulse 的資料最多可能舊到 60 分鐘，請看資料時間。",
    win: "全軍出擊 {s} – {e}", on: "現在每 15 分鐘更新", off: "現在沒有活動——只有儲存名單時會查一次", next: "下次全軍出擊 {s} – {e}",
    fetched: "資料抓取時間 {t}", never: "還沒抓過——儲存名單後大約 2 分鐘會有第一次結果。", reload: "↻ 重新整理",
    cNo: "#", cName: "玩家", cAll: "聯盟", cKid: "王國", cPos: "城堡 X:Y", cShield: "護盾", cOn: "上線", cAsOf: "資料時間",
    shieldUntil: "🛡️ 到 {t}", noShield: "— 沒有", online: "🟢 在線上", lastLogin: "最後上線 {t}", unknown: "?", notFound: "找不到（確認一下 ID）",
    copy: "📋", copied: "✅", addT: "➕ 加入玩家", id: "玩家 ID（可以一次貼好幾個）", added: "加入 {n} 人。", note: "備註（名字、原因…）", add: "加入", del: "✕", dup: "已經在名單上了。", badId: "請輸入玩家 ID（只要數字）。",
    save: "💾 儲存名單", by: "你的名字", saving: "儲存中…", saved: "已儲存 ✅ 大約 2 分鐘後會查一次。", unsaved: "還沒儲存。",
    errAuth: "存著的 GitHub 金鑰不能用了——請找 Sherry。", errBusy: "有人同時儲存——重新整理後再試一次。", errNet: "連不到 GitHub——請再試一次。",
    noKey: "儲存需要幹部的 GitHub 金鑰（在公告分頁設定）。", locked: "要先解鎖幹部資料才看得到黑名單。", empty: "名單是空的。", local: "當地", mmNote: "🔴 沒開護盾 · 🔵 開著護盾 · ⭐ 金圈 = 特別標記 · ■ NXS 總部。", mmOpen: "🗺️ 在王國地圖上看", edTip: "✏️ 看到更新的位置（遊戲裡或 MightPulse 上）？在這裡輸入——大家都會看到，直到 MightPulse 有更新的資料", edPh: "X Y", manual: "✏️ {b} 手動更新 · {t}", badXY: "請輸入 X 和 Y（0–1199）。", how: "🧭 使用原則：位置沒變 → 照這裡的位置去找。位置變了（到那裡找不到）→ 點 MightPulse ↗ 看他最新的位置，再用 ✏️ 更新到這裡，大家就能更快找到大概的位置。", count: "{n} 人" },
  pt: { seTip: "🛡️ Corrigir o escudo à mão (a MightPulse pode estar horas atrasada): tempo restante do escudo, ou sem escudo", seH: "h", seM: "min", seNone: "🚫 Sem escudo", seMan: "✏️ {b} · {t}", stale: "⚠️ A MightPulse não atualiza {n} jogador(es) há mais de 2 horas (⚠️ ao lado do horário). Abra a página MightPulse ↗ ou veja no jogo e ✏️ corrija posição / 🛡️ escudo à mão.", seBad: "Digite o tempo restante (horas e minutos).", starTip: "⭐ Marcar: a linha inteira acende e vai para o topo, para todos os oficiais (salvo com a lista)", tmName: "🛡️ escudo de {n} acaba {xy}", foTip: "Seguir: um ⏰ timer (com notificação) quando o escudo deste jogador acabar — só neste celular / navegador", foOn: "⏰ Timer criado para o fim do escudo. Ele se ajusta sozinho se o escudo mudar.", foWait: "⏰ Seguindo — sem escudo agora; o timer aparece quando ele ativar um.", foOff: "⏰ Não está mais seguindo.", title: "🎯 Lista negra do All Out", intro: "Só oficiais. Adicione jogadores pelo ID (o número no perfil). Durante o All Out, todos da lista são consultados a cada 15 minutos: onde está o castelo e se o escudo está ativo. Os dados da MightPulse podem ter até 60 minutos — veja sempre o horário dos dados.",
    win: "All Out {s} – {e}", on: "atualizando a cada 15 minutos", off: "fora do evento — a lista só é consultada quando é salva", next: "próximo All Out {s} – {e}",
    fetched: "Dados buscados {t}", never: "Ainda não buscado — salve a lista e a primeira consulta chega em uns 2 minutos.", reload: "↻ Recarregar",
    cNo: "#", cName: "Jogador", cAll: "Aliança", cKid: "Reino", cPos: "Castelo X:Y", cShield: "Escudo", cOn: "Online", cAsOf: "Dados de",
    shieldUntil: "🛡️ até {t}", noShield: "— nenhum", online: "🟢 online", lastLogin: "último login {t}", unknown: "?", notFound: "não encontrado (confira o ID)",
    copy: "📋", copied: "✅", addT: "➕ Adicionar jogador", id: "ID do jogador (pode colar vários)", added: "{n} adicionados.", note: "Nota (nome, motivo…)", add: "Adicionar", del: "✕", dup: "Já está na lista.", badId: "Digite o ID do jogador (só números).",
    save: "💾 Salvar lista", by: "Seu nome", saving: "Salvando…", saved: "Salvo ✅ A consulta roda em uns 2 minutos.", unsaved: "Ainda não salvo.",
    errAuth: "A chave do GitHub salva não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — recarregue e tente de novo.", errNet: "Não deu para acessar o GitHub — tente de novo.",
    noKey: "Salvar precisa da chave do GitHub dos oficiais (configurada na aba Anúncios).", locked: "Desbloqueie os dados dos oficiais para ver a lista.", empty: "A lista está vazia.", local: "local", mmNote: "🔴 sem escudo · 🔵 com escudo · ⭐ anel dourado = marcado · ■ QG da NXS.", mmOpen: "🗺️ Ver no mapa do reino", edTip: "✏️ Viu um local mais novo (no jogo ou na MightPulse)? Digite aqui — todos veem até a MightPulse ter algo mais novo", edPh: "X Y", manual: "✏️ por {b} · {t}", badXY: "Digite X e Y (0–1199).", how: "🧭 Como usar: no mesmo lugar → vá pela posição daqui. Mudou (não está mais lá) → abra a página MightPulse ↗ dele para ver o local mais novo e ✏️ atualize aqui, assim todos acham mais rápido.", count: "{n} jogadores" },
  ar: { seTip: "🛡️ تصحيح الدرع يدويًا (قد تتأخر MightPulse ساعات): الوقت المتبقي للدرع أو بلا درع", seH: "س", seM: "د", seNone: "🚫 بلا درع", seMan: "✏️ {b} · {t}", stale: "⚠️ لم تحدّث MightPulse بيانات {n} لاعب منذ أكثر من ساعتين (⚠️ بجانب الوقت). افتح صفحة MightPulse ↗ أو تحقق في اللعبة ثم صحّح ✏️ الموقع / 🛡️ الدرع يدويًا.", seBad: "اكتب الوقت المتبقي (ساعات ودقائق).", starTip: "⭐ تمييز: يضيء الصف كله وينتقل إلى الأعلى لكل الضباط (يُحفظ مع القائمة)", tmName: "🛡️ ينتهي درع {n} {xy}", foTip: "متابعة: مؤقت ⏰ (مع إشعار) عند انتهاء درع هذا اللاعب — على هذا الهاتف / المتصفح فقط", foOn: "⏰ تم ضبط مؤقت لنهاية الدرع، ويتعدل تلقائيًا إذا تغيّر الدرع.", foWait: "⏰ تتم المتابعة — لا درع الآن؛ يظهر المؤقت عندما يفعّل درعًا.", foOff: "⏰ أُلغيت المتابعة.", title: "🎯 القائمة السوداء في All Out", intro: "للضباط فقط. أضف اللاعبين بالمعرّف (الرقم في ملفهم الشخصي). أثناء All Out يُبحث عن كل من في القائمة كل 15 دقيقة: مكان القلعة وهل الدرع مفعّل. قد تكون بيانات MightPulse أقدم حتى 60 دقيقة — انظر دائمًا إلى وقت البيانات.",
    win: "All Out {s} – {e}", on: "التحديث كل 15 دقيقة الآن", off: "الحدث غير جارٍ — يُبحث في القائمة فقط عند حفظها", next: "All Out القادم {s} – {e}",
    fetched: "وقت جلب البيانات {t}", never: "لم تُجلب بعد — احفظ القائمة وستصل أول نتيجة بعد نحو دقيقتين.", reload: "↻ تحديث",
    cNo: "#", cName: "اللاعب", cAll: "التحالف", cKid: "المملكة", cPos: "القلعة X:Y", cShield: "الدرع", cOn: "متصل", cAsOf: "وقت البيانات",
    shieldUntil: "🛡️ حتى {t}", noShield: "— لا يوجد", online: "🟢 متصل", lastLogin: "آخر دخول {t}", unknown: "?", notFound: "غير موجود (تحقق من المعرّف)",
    copy: "📋", copied: "✅", addT: "➕ إضافة لاعب", id: "معرّف اللاعب (يمكن لصق عدة معرّفات)", added: "أُضيف {n}.", note: "ملاحظة (الاسم، السبب…)", add: "إضافة", del: "✕", dup: "موجود في القائمة بالفعل.", badId: "اكتب معرّف اللاعب (أرقام فقط).",
    save: "💾 حفظ القائمة", by: "اسمك", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅ يجري البحث بعد نحو دقيقتين.", unsaved: "لم يُحفظ بعد.",
    errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حدّث الصفحة وحاول مجددًا.", errNet: "تعذّر الوصول إلى GitHub — حاول مجددًا.",
    noKey: "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في صفحة النشر).", locked: "افتح بيانات الضباط لرؤية القائمة.", empty: "القائمة فارغة.", local: "محلي", mmNote: "🔴 بلا درع · 🔵 الدرع مفعّل · ⭐ حلقة ذهبية = مميَّز · ■ مقر NXS.", mmOpen: "🗺️ عرض على خريطة المملكة", edTip: "✏️ رأيت موقعًا أحدث (في اللعبة أو على MightPulse)؟ اكتبه هنا — يراه الجميع حتى تصبح بيانات MightPulse أحدث", edPh: "X Y", manual: "✏️ بواسطة {b} · {t}", badXY: "اكتب X و Y (0–1199).", how: "🧭 طريقة الاستخدام: لم يتغير المكان → اذهب حسب الموقع هنا. تغيّر (لم يعد هناك) → افتح صفحته على MightPulse ↗ لمعرفة أحدث موقع، ثم حدّثه هنا بـ ✏️ ليجده الجميع أسرع.", count: "{n} لاعبين" },
  ko: { seTip: "🛡️ 보호막 직접 수정 (MightPulse가 몇 시간 늦을 수 있어요): 남은 보호막 시간, 또는 보호막 없음", seH: "시간", seM: "분", seNone: "🚫 보호막 없음", seMan: "✏️ {b} · {t}", stale: "⚠️ MightPulse가 {n}명의 데이터를 2시간 넘게 갱신하지 않았어요 (시각 옆 ⚠️). MightPulse ↗ 페이지나 게임에서 확인하고 ✏️ 위치 / 🛡️ 보호막을 직접 고치세요.", seBad: "남은 시간을 입력하세요 (시간, 분).", starTip: "⭐ 특별 표시: 줄 전체가 강조되고 맨 위로 올라가요, 모든 간부에게 (명단과 함께 저장)", tmName: "🛡️ {n} 보호막 종료 {xy}", foTip: "추적: 이 플레이어의 보호막이 끝날 때 ⏰ 타이머 알림 (이 폰 / 브라우저만)", foOn: "⏰ 보호막 종료 타이머를 설정했어요. 보호막 시간이 바뀌면 저절로 따라가요.", foWait: "⏰ 추적 중 — 지금은 보호막이 없어요; 보호막을 켜면 타이머가 생겨요.", foOff: "⏰ 추적을 그만뒀어요.", title: "🎯 전군 출격 블랙리스트", intro: "간부 전용. 플레이어 ID(프로필에 있는 숫자)로 추가하세요. 전군 출격 동안 명단의 모두를 15분마다 조회해요: 성 위치와 보호막 여부. MightPulse 데이터는 최대 60분 늦을 수 있으니 데이터 시각을 꼭 확인하세요.",
    win: "전군 출격 {s} – {e}", on: "지금 15분마다 갱신 중", off: "이벤트 기간 아님 — 명단을 저장할 때만 조회해요", next: "다음 전군 출격 {s} – {e}",
    fetched: "데이터 가져온 시각 {t}", never: "아직 조회 전 — 명단을 저장하면 약 2분 뒤 첫 결과가 나와요.", reload: "↻ 새로고침",
    cNo: "#", cName: "플레이어", cAll: "연맹", cKid: "왕국", cPos: "성 X:Y", cShield: "보호막", cOn: "접속", cAsOf: "데이터 시각",
    shieldUntil: "🛡️ {t}까지", noShield: "— 없음", online: "🟢 접속 중", lastLogin: "마지막 접속 {t}", unknown: "?", notFound: "찾을 수 없음 (ID 확인)",
    copy: "📋", copied: "✅", addT: "➕ 플레이어 추가", id: "플레이어 ID (여러 개 한 번에 붙여넣기 가능)", added: "{n}명 추가.", note: "메모 (이름, 이유…)", add: "추가", del: "✕", dup: "이미 명단에 있어요.", badId: "플레이어 ID를 입력하세요 (숫자만).",
    save: "💾 명단 저장", by: "이름", saving: "저장 중…", saved: "저장됨 ✅ 약 2분 뒤 조회해요.", unsaved: "아직 저장 안 됨.",
    errAuth: "저장된 GitHub 키가 더 이상 작동하지 않아요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 새로고침 후 다시 시도하세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 시도하세요.",
    noKey: "저장하려면 간부 GitHub 키가 필요해요 (공지 탭에서 설정).", locked: "간부 데이터를 잠금 해제해야 명단이 보여요.", empty: "명단이 비어 있어요.", local: "현지", mmNote: "🔴 보호막 없음 · 🔵 보호막 켜짐 · ⭐ 금색 원 = 특별 표시 · ■ NXS 본부.", mmOpen: "🗺️ 왕국 지도에서 보기", edTip: "✏️ 더 새로운 위치를 봤나요 (게임이나 MightPulse)? 여기에 입력하세요 — MightPulse에 더 새 데이터가 생길 때까지 모두에게 보여요", edPh: "X Y", manual: "✏️ {b} 수동 입력 · {t}", badXY: "X와 Y를 입력하세요 (0–1199).", how: "🧭 사용 원칙: 위치가 그대로면 → 여기 위치대로 찾아가요. 옮겼으면 (거기 없으면) → MightPulse ↗ 페이지에서 최신 위치를 보고 ✏️로 여기 업데이트해서 모두가 더 빨리 찾게 해요.", count: "{n}명" },
};
let lang = OFFICER.lang || "en", L = { list: [] }, SAVED = "[]", LV = null, msg = "", sched = null, timer = null;
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
/* ⏰ shield timers: each viewer picks whom to follow (this browser only); their shield end becomes a ⏰ timer (push notification) */
const FLS = "nxs-hunt-follow";
let FOLLOW = new Set(); try { FOLLOW = new Set(JSON.parse(localStorage.getItem(FLS) || "[]")); } catch (e) {}
const saveFollow = () => { try { localStorage.setItem(FLS, JSON.stringify([...FOLLOW])); } catch (e) {} };
function syncTimers() {
  if (!(window.NXSTimers && NXSTimers.setExt)) return;
  const now = Date.now(), items = [];
  for (const r0 of (LV && LV.rows) || []) { if (!FOLLOW.has(String(r0.id))) continue; const r = eff((L.list || []).find((it) => String(it.id) === String(r0.id)), r0); const end = shieldEnd(r);
    if (end && end > now) items.push({ id: "hunt-" + r.id, name: t("tmName").replace("{n}", r.name || r.id).replace("{xy}", r.x != null ? `X:${r.x} Y:${r.y}` : ""), at: end }); }
  NXSTimers.setExt("hunt", items);
}
const ED = () => OFFICER.can("hunt", "edit");
const pad = (n) => String(n).padStart(2, "0");
/* "10-24 03:15 UTC (10-24 11:15 local)" — never "x minutes ago" */
function when(v) {
  if (v == null || v === "") return "";
  let ms = typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v); if (!Number.isFinite(ms)) return "";
  const d = new Date(ms), u = `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
  const l = `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return `${u} (${l} ${t("local")})`;
}
const toMs = (v) => v == null ? null : typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v);
/* shield end as a clock time. MightPulse's shield_endtime is a moment in time (epoch seconds / ms / ISO); if it ever comes as
   "seconds left" (a small number) it is counted from the moment the data was read (asOf / cached_at), not from now */
const shieldEnd = (r) => { if (!r || r.shield == null || r.shield === 0) return null; const v = r.shield;
  if (typeof v === "number" && v > 0 && v < 1e9) { const base = toMs(r.asOf); return base ? base + v * 1000 : null; }
  return toMs(v); };
function windowNow() {
  const s = (sched && sched["all-out"]) || { anchor: "2026-09-25", periodDays: 28, activeDays: 2 };
  const a = Date.parse(s.anchor + "T00:00:00Z"), P = s.periodDays * 864e5, now = Date.now();
  let start = a + Math.floor((now - a) / P) * P, end = start + s.activeDays * 864e5;
  const on = now >= start - 36e5 && now < end + 36e5;
  if (!on && now >= end) { start += P; end += P; }
  return { start, end, on };
}
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
async function read(path) {
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", path, null, OFFICER.token); if (f) return { d: await OfficerData.open(JSON.parse(b64u8(f.content))), sha: f.sha }; } catch (e) {} }
  try { return { d: await OfficerData.fetchJson(path) }; } catch (e) { return { d: null }; }
}
/* live data comes from two places: the Cloudflare Worker (every 15 min while All Out runs, and "refresh" = look up now)
   and the GitHub job's file (right after the list is saved). The newer one wins. */
const AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
async function fromWorker(refresh) {
  let tk = ""; try { tk = localStorage.getItem("nxs-discord-v1") || ""; } catch (e) {} if (!tk) return null;
  try { const r = await fetch(AI_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ blacklist: 1, token: tk, refresh: refresh ? 1 : 0 }) });
    const j = await r.json(); if (j && j.token) { try { localStorage.setItem("nxs-discord-v1", j.token); } catch (e) {} }
    return j && j.live && Array.isArray(j.live.rows) ? j.live : null; } catch (e) { return null; }
}
async function loadLive(refresh) {
  const [g, w] = await Promise.all([read(LIVE), fromWorker(refresh)]);
  const a = g && g.d, ta = a ? Date.parse(a.fetched) || 0 : -1, tb = w ? Date.parse(w.fetched) || 0 : -1;
  /* per player, the newer data wins (the GitHub file may carry older rows for players it didn't look up again) */
  const A = tb > ta ? w : a, B = tb > ta ? a : w;
  if (A && B && Array.isArray(B.rows)) { const m = new Map(); for (const r of B.rows) m.set(String(r.id), r);
    LV = { ...A, rows: (A.rows || []).map((r) => { const o = m.get(String(r.id)); m.delete(String(r.id)); return o && o.ok && (!r.ok || (toMs(o.asOf) || 0) > (toMs(r.asOf) || 0)) ? o : r; }).concat([...m.values()]) };
  } else LV = A;
  render(); syncTimers();
}
/* ✏️ a position typed by an officer (saved with the list) wins until MightPulse has data newer than it */
function eff(it, r) {
  const m = it && it.pos;
  if (m && !(r && r.x != null && (toMs(r.asOf) || 0) >= (toMs(m.at) || 0))) r = { ...(r || { id: it.id, ok: true }), x: m.x, y: m.y, man: m };
  /* 🛡️ a shield typed by an officer: end time (ms) or 0 = no shield; wins until MightPulse has data newer than it */
  const s = it && it.shm;
  if (s && !(r && (toMs(r.asOf) || 0) >= (toMs(s.at) || 0))) r = { ...(r || { id: it.id, ok: true }), shield: s.end || 0, shman: s };
  return r;
}
const STALE = 2 * 36e5;   // MightPulse data older than this gets a ⚠️
let SEDIT = null;          // the row whose 🛡️ box is open
let EDIT = null;   // the row whose ✏️ box is open
function table() {
  const rows = (LV && LV.rows) || [], byId = {}; rows.forEach((r) => byId[r.id] = r);
  const list = L.list || []; if (!list.length) return `<div class="muted">${esc(t("empty"))}</div>`;
  const ed = ED(), now = Date.now();
  return `<div class="mm-tw"><table class="mm-t hn-t"><thead><tr><th>${esc(t("cNo"))}</th><th>${esc(t("cName"))}</th><th>${esc(t("cAll"))}</th><th>${esc(t("cKid"))}</th><th>${esc(t("cPos"))}</th><th>${esc(t("cShield"))}</th><th>${esc(t("cAsOf"))}</th>${ed ? "<th></th>" : ""}</tr></thead><tbody>`
    + list.map((it, i) => [it, i]).sort((a, b) => (!!b[0].star - !!a[0].star) || (a[1] - b[1])).map(([it, i], n) => { const r = eff(it, byId[String(it.id)]);
      const pos0 = r && r.x != null && r.y != null ? `<button type="button" class="btn small hn-cp" data-c="X:${r.x} Y:${r.y}">X:${r.x} Y:${r.y} ${esc(t("copy"))}</button>` : r && !r.ok ? `<span class="muted">${esc(t("notFound"))}</span>` : esc(t("unknown"));
      const pos = EDIT === String(it.id) ? `<span class="row" style="gap:4px;flex-wrap:nowrap">X <input class="inp" id="hn_x" value="${r && r.x != null ? r.x : ""}" style="width:58px" inputmode="numeric" pattern="[0-9]*" maxlength="4"> Y <input class="inp" id="hn_y" value="${r && r.y != null ? r.y : ""}" style="width:58px" inputmode="numeric" pattern="[0-9]*" maxlength="4"><button type="button" class="btn small primary" id="hn_xyok">✓</button><button type="button" class="btn small" id="hn_xyno">✕</button></span>`
        : pos0 + (ed ? ` <button type="button" class="btn small hn-ed" data-ed="${esc(it.id)}" title="${esc(t("edTip"))}">✏️</button>` : "") + (r && r.man ? `<div class="muted hn-man" style="font-size:11.5px">${esc(t("manual").replace("{b}", r.man.by || "?").replace("{t}", when(r.man.at)))}</div>` : "");
      const sh = r ? shieldEnd(r) : null, shield = SEDIT === String(it.id)
        ? `<span class="row" style="gap:4px;flex-wrap:wrap;align-items:center"><input class="inp" id="hn_sh" style="width:50px" inputmode="numeric" pattern="[0-9]*" maxlength="3"> ${esc(t("seH"))} <input class="inp" id="hn_sm" style="width:50px" inputmode="numeric" pattern="[0-9]*" maxlength="2"> ${esc(t("seM"))} <button type="button" class="btn small primary" id="hn_shok">✓</button><button type="button" class="btn small" id="hn_shnone">${esc(t("seNone"))}</button><button type="button" class="btn small" id="hn_shno">✕</button></span>`
        : (!r ? "" : sh && sh > now ? `<span class="hn-sh">${esc(t("shieldUntil").replace("{t}", when(sh)))}</span>` : esc(t("noShield")))
          + (ed ? ` <button type="button" class="btn small" data-se="${esc(it.id)}" title="${esc(t("seTip"))}">🛡️✏️</button>` : "")
          + (r && r.shman ? `<div class="muted" style="font-size:11.5px">${esc(t("seMan").replace("{b}", r.shman.by || "?").replace("{t}", when(r.shman.at)))}</div>` : "");
      const old = r && r.asOf && now - (toMs(r.asOf) || now) > STALE;
      const star = `<button type="button" class="btn small hn-star${it.star ? " on" : ""}" data-star="${i}" title="${esc(t("starTip"))}"${ed ? "" : " disabled"}>${it.star ? "⭐" : "☆"}</button>`;
      return `<tr class="${it.star ? "hn-hot" : ""}"><td>${n + 1} ${star}</td><td><b dir="auto">${esc((r && r.name) || it.note || it.id)}</b>${it.note && r && r.name ? `<div class="muted" style="font-size:12px" dir="auto">${esc(it.note)}</div>` : ""}<div class="muted" style="font-size:11.5px">ID ${esc(it.id)}${r && r.uid ? ` · <a href="https://mightpulse.com/player/${encodeURIComponent(r.uid)}" target="_blank" rel="noopener">MightPulse ↗</a>` : ""}</div></td>`
        + `<td>${esc((r && r.alliance) || "")}</td><td>${r && r.kid ? "#" + esc(r.kid) : ""}</td><td>${pos}</td><td>${shield} <button type="button" class="btn small hn-fo${FOLLOW.has(String(it.id)) ? " primary" : ""}" data-fo="${esc(it.id)}" title="${esc(t("foTip"))}">${FOLLOW.has(String(it.id)) ? "⏰ ✓" : "⏰"}</button></td><td style="font-size:12px"${old ? ' class="hn-old"' : ""}>${old ? "⚠️ " : ""}${r ? esc(when(r.asOf)) : ""}</td>`

        + (ed ? `<td><button type="button" class="btn small" data-del="${i}" title="${esc(t("del"))}">${esc(t("del"))}</button></td>` : "") + `</tr>`; }).join("")
    + `</tbody></table></div>`;
}
/* 🗺️ a small kingdom map (turned 45° like the game: right = X−Y, up = X+Y) with the zone rings, our HQ and everyone on the list */
function miniMap() {
  const byId = {}; ((LV && LV.rows) || []).forEach((r) => byId[r.id] = r);
  const rows = (L.list || []).map((it) => eff(it, byId[String(it.id)])).filter((r) => r && r.x != null && r.y != null); if (!rows.length) return "";
  const S = 0.3, P = (x, y) => [((x - y) + 1200) * S * 0.7071, (2400 - (x + y)) * S * 0.7071];
  const ring = (a, b, fill) => `<polygon points="${[[a, a], [b, a], [b, b], [a, b]].map(([x, y]) => P(x, y).map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="#0003"/>`;
  const W = 2400 * S * 0.7071, now = Date.now();
  let s = ring(0, 1199, "#c9b98f") + ring(300, 899, "#a9c27f") + ring(450, 749, "#7fb069") + ring(552, 647, "#a08060") + ring(586, 613, "#6b3b3b");
  const [hx, hy] = P(410, 669); s += `<rect x="${hx - 5}" y="${hy - 5}" width="10" height="10" fill="#2b6cc4" stroke="#fff" stroke-width="1.5"/><text x="${hx}" y="${hy + 16}" class="hn-ml" text-anchor="middle">NXS</text>`;
  const starred = new Set((L.list || []).filter((it) => it.star).map((it) => String(it.id)));
  rows.sort((a, b) => starred.has(String(a.id)) - starred.has(String(b.id)));   // ⭐ drawn last = on top
  rows.forEach((r) => { const [x, y] = P(r.x, r.y), sh = shieldEnd(r) > now, st = starred.has(String(r.id));
    s += `<g>${st ? `<circle cx="${x}" cy="${y}" r="13" fill="#ffd34d" fill-opacity=".45" stroke="#e0a800" stroke-width="2.5"/>` : ""}<circle cx="${x}" cy="${y}" r="${st ? 7 : 6}" fill="${sh ? "#3b82f6" : "#ff3b30"}" stroke="#fff" stroke-width="1.5"/>`
      + `<text x="${x + (st ? 14 : 8)}" y="${y - 6}" class="hn-ml${st ? " hn-mls" : ""}">${st ? "⭐ " : ""}${esc(String(r.name || r.id).slice(0, 14))}</text><title>${st ? "⭐ " : ""}${esc(r.name || r.id)} X:${r.x} Y:${r.y}${sh ? " 🛡️" : ""}</title></g>`; });
  const look = rows.map((r) => `${r.x}-${r.y}~${encodeURIComponent(String(r.name || r.id).replace(/[~,]/g, " ").slice(0, 20))}~${starred.has(String(r.id)) ? "y" : shieldEnd(r) > now ? "b" : "r"}`).join(",");
  return `<div class="hn-mm"><svg viewBox="0 0 ${W.toFixed(0)} ${W.toFixed(0)}" width="100%" style="max-width:520px;display:block;margin:auto">${s}</svg>
    <div class="muted" style="font-size:12px;text-align:center">${esc(t("mmNote"))} <a class="btn small" href="#map?look=${look}">${esc(t("mmOpen"))}</a></div></div>`;
}
function render() {
  const el = $("hn_root"); if (!el) return;
  const w = windowNow(), ed = ED(), dirty = JSON.stringify(L.list || []) !== SAVED;
  let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
  el.innerHTML = `<div class="hn-st ${w.on ? "on" : ""}">${w.on ? `🟢 ${esc(t("win").replace("{s}", when(w.start)).replace("{e}", when(w.end)))} · ${esc(t("on"))}` : `⚪ ${esc(t("off"))} · ${esc(t("next").replace("{s}", when(w.start)).replace("{e}", when(w.end)))}`}</div>
    <div class="row" style="gap:8px;align-items:center;margin:8px 0"><b>${esc(LV && LV.fetched ? t("fetched").replace("{t}", when(LV.fetched)) : t("never"))}</b> <span class="muted" style="font-size:12.5px">${esc(t("count").replace("{n}", (L.list || []).length))}</span>
      <button type="button" class="btn small" id="hn_reload">${esc(t("reload"))}</button></div>
    <div class="hn-how">${esc(t("how"))}</div>
    ${(() => { const n = ((LV && LV.rows) || []).filter((r) => r.asOf && Date.now() - (toMs(r.asOf) || Date.now()) > STALE).length; return n ? `<div class="hn-how hn-stale">${esc(t("stale").replace("{n}", n))}</div>` : ""; })()}
    ${table()}
    ${!ed && msg ? `<div class="muted" style="font-size:12.5px;margin-top:6px">${esc(msg)}</div>` : ""}
    ${miniMap()}
    ${ed ? `<div style="margin-top:12px"><b>${esc(t("addT"))}</b><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center">
      <textarea class="inp" id="hn_id" rows="1" placeholder="${esc(t("id"))}" style="width:190px;resize:vertical;min-height:36px;box-sizing:border-box"></textarea><input class="inp" id="hn_note" placeholder="${esc(t("note"))}" style="width:220px">
      <button type="button" class="btn primary" id="hn_add">${esc(t("add"))}</button></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center">${dirty ? `<input class="inp" id="hn_by" value="${esc(by)}" placeholder="${esc(t("by"))}" style="width:130px"><button type="button" class="btn primary" id="hn_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(msg)}</span></div></div>` : ""}`;
  $("hn_reload").onclick = () => { msg = ""; loadLive(true); };
  el.querySelectorAll(".hn-fo").forEach((b) => b.onclick = () => { const id = b.dataset.fo; if (FOLLOW.has(id)) FOLLOW.delete(id); else FOLLOW.add(id); saveFollow(); syncTimers();
    const r = eff((L.list || []).find((x) => String(x.id) === id), ((LV && LV.rows) || []).find((x) => String(x.id) === id)); msg = FOLLOW.has(id) ? (r && shieldEnd(r) > Date.now() ? t("foOn") : t("foWait")) : t("foOff"); render(); });
  el.querySelectorAll(".hn-cp").forEach((b) => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = t("copied"); } catch (e) {} });
  if (!ed) return;
  el.querySelectorAll("[data-star]").forEach((b) => b.onclick = () => { const it = L.list[+b.dataset.star]; if (it.star) { delete it.star; it._s = 1; } else { it.star = 1; delete it._s; } msg = t("unsaved"); render(); });
  el.querySelectorAll("[data-se]").forEach((b) => b.onclick = () => { SEDIT = b.dataset.se; EDIT = null; render(); const i = $("hn_sh"); if (i) i.focus(); });
  if ($("hn_shno")) $("hn_shno").onclick = () => { SEDIT = null; render(); };
  const setSh = (end) => { let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
    const it = L.list.find((x) => String(x.id) === SEDIT); SEDIT = null;
    if (it) { it.shm = { end, at: new Date().toISOString(), by: by || "?" }; msg = t("unsaved"); render(); syncTimers(); if ($("hn_save") && OFFICER.token) save(); } else render(); };
  if ($("hn_shok")) { const ok = () => { const h = +($("hn_sh").value || 0), m = +($("hn_sm").value || 0);
      if (!Number.isFinite(h) || !Number.isFinite(m) || h < 0 || m < 0 || (h === 0 && m === 0)) { msg = t("seBad"); return render(); }
      setSh(Date.now() + (h * 3600 + m * 60) * 1000); };
    $("hn_shok").onclick = ok; $("hn_shnone").onclick = () => setSh(0);
    $("hn_sh").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("hn_sm").focus(); } else if (e.key === "Escape") { SEDIT = null; render(); } };
    $("hn_sm").onkeydown = (e) => { if (e.key === "Enter") ok(); else if (e.key === "Escape") { SEDIT = null; render(); } }; }
  el.querySelectorAll("[data-ed]").forEach((b) => b.onclick = () => { EDIT = b.dataset.ed; SEDIT = null; render(); const i = $("hn_x"); if (i) { i.focus(); i.select(); } });
  if ($("hn_xyno")) $("hn_xyno").onclick = () => { EDIT = null; render(); };
  if ($("hn_xyok")) { const ok = () => { const n = [$("hn_x").value, $("hn_y").value].map((v) => /^\s*\d{1,4}\s*$/.test(v) ? Number(v) : NaN);
      if (n.some(isNaN) || n[0] > 1199 || n[1] > 1199) { msg = t("badXY"); return render(); }
      let by = ""; try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {}
      const it = L.list.find((x) => String(x.id) === EDIT); EDIT = null;
      if (it) { it.pos = { x: n[0], y: n[1], at: new Date().toISOString(), by: by || "?" }; msg = t("unsaved"); render(); syncTimers(); if ($("hn_save") && OFFICER.token) save(); } else render(); };
    $("hn_xyok").onclick = ok;
    $("hn_x").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("hn_y").focus(); $("hn_y").select(); } else if (e.key === "Escape") { EDIT = null; render(); } };
    $("hn_y").onkeydown = (e) => { if (e.key === "Enter") ok(); else if (e.key === "Escape") { EDIT = null; render(); } }; }
  el.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { REMOVED.add(String(L.list[+b.dataset.del].id)); L.list.splice(+b.dataset.del, 1); msg = t("unsaved"); render(); });
  /* one ID, or several pasted at once (one per line / spaces / commas) */
  $("hn_add").onclick = () => { const ids = ($("hn_id").value.match(/\d{5,}/g) || []), note = $("hn_note").value.trim().slice(0, 60);
    if (!ids.length) { msg = t("badId"); return render(); }
    L.list = L.list || []; let n = 0, d = 0;
    for (const id of ids) { if (L.list.some((x) => String(x.id) === id)) { d++; continue; } L.list.push({ id, note: ids.length === 1 ? note : "" }); REMOVED.delete(id); n++; }
    msg = (n ? t("added").replace("{n}", n) + " " : "") + (d ? t("dup") + " " : "") + (n ? t("unsaved") : ""); render(); };
  if ($("hn_save")) $("hn_save").onclick = save;
}
/* one row per player ID: the same account entered twice (or by two officers) becomes one row, notes kept together */
function dedupe(list) {
  const by = new Map();
  for (const it of list || []) { const id = String(it.id || "").replace(/\D/g, ""); if (!id) continue;
    const o = by.get(id); if (!o) { by.set(id, { id, note: (it.note || "").trim(), ...(it.star ? { star: 1 } : {}), ...(it.pos ? { pos: it.pos } : {}), ...(it.shm ? { shm: it.shm } : {}) }); continue; }
    if (it.shm && (!o.shm || (toMs(it.shm.at) || 0) > (toMs(o.shm.at) || 0))) o.shm = it.shm;
    if (it.pos && (!o.pos || (toMs(it.pos.at) || 0) > (toMs(o.pos.at) || 0))) o.pos = it.pos;
    if ("star" in it || it._s) { if (it.star) o.star = 1; else delete o.star; }
    const n = (it.note || "").trim(); if (n && !o.note.split(" / ").includes(n)) o.note = (o.note ? o.note + " / " + n : n).slice(0, 120); }
  return [...by.values()];
}
const REMOVED = new Set();   // removed on this page since it was opened: stays removed when merging with the server copy
async function save() {
  if (!ED()) return;
  if (!OFFICER.token) { msg = t("noKey"); render(); return; }
  const by = ($("hn_by").value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  msg = t("saving"); render();
  let next;
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", LIST, null, OFFICER.token);
      /* another officer may have saved meanwhile: start from the server copy, add ours, drop what was removed here */
      let srv = []; try { const d = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; srv = (d && d.list) || []; } catch (e) {}
      next = { list: dedupe(srv.map((x) => { const y = { ...x }; delete y.star; if (x.star) y.star = 1; return y; }).concat(L.list || [])).filter((x) => !REMOVED.has(x.id)), by, at: new Date().toISOString() };
      try { await OFFICER.gh("PUT", LIST, { message: `All Out blacklist (${by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: "main" }, OFFICER.token); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    L = next; SAVED = JSON.stringify(L.list); REMOVED.clear(); msg = t("saved"); [90000, 150000].forEach((ms) => setTimeout(() => loadLive(), ms));   // the GitHub job looks up only the new players (~2 min); no full re-fetch
  } catch (e) { msg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  render();
}
function applyTexts() { if ($("hn_title")) { $("hn_title").textContent = t("title"); $("hn_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  const el = $("hn_root"); if (!el) return;
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<div class="muted">${esc(t("locked"))}</div>`; return; }
  try { sched = (await fetch("data/events-x7k2p9.json?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json())).sched || null; } catch (e) {}
  const r = await read(LIST); L = r.d && Array.isArray(r.d.list) ? r.d : { list: [] }; SAVED = JSON.stringify(L.list); L.list = dedupe(L.list);
  await loadLive();
  clearInterval(timer); timer = setInterval(async () => { if (document.hidden || !location.hash.startsWith("#hunt") || JSON.stringify(L.list || []) !== SAVED || EDIT || SEDIT) return;
    /* also re-read the list: other officers' ⭐ marks, ✏️ positions and new players show up without reopening the tab */
    const r2 = await read(LIST); if (r2.d && Array.isArray(r2.d.list) && JSON.stringify(L.list || []) === SAVED && !EDIT && !SEDIT) { L = r2.d; SAVED = JSON.stringify(L.list); L.list = dedupe(L.list); }
    loadLive(); }, 60000);   // the job writes every 15 min; look every minute
}
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.hunt = { init, applyTexts, setLang, onShow: () => render() };
})();
