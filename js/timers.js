/* ---- ⏰ My timers: inside the AI panel. You type how much time is left in the game; your phone gets a
   notification when it's done, even with the game and the site closed (Web Push through the Cloudflare Worker).
   Timers are kept on this phone (localStorage); the Worker only gets the list so it knows when to send. ---- */
(function () {
  if (!window.NXSAI) return;
  /* testing phase: only for browsers that opened the site once with ?timers, opened the officer page, or have the officer login */
  const BETA = "nxs-timers-beta";
  let beta = false;
  try {
    // the officer page (password-protected) also turns it on for this browser / app — the main site then shows ⏰ too
    if (/[?&]timers\b/.test(location.search) || /officer-/.test(location.pathname)) localStorage.setItem(BETA, "1");
    beta = !!localStorage.getItem(BETA) || !!(JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").pw);
  } catch (e) {}
  beta = true;   // ⏰ open to everyone (2026-10-16) — the 🛠️ admin reminders stay officer-only (isOfficerUser below)
  if (!beta) {
    // home-screen / Dock apps have no address bar: typing "/timers" in the AI chat turns it on too
    const f = NXSAI.panel.querySelector("#aiForm"), q = NXSAI.panel.querySelector("#aiQ");
    if (f && q) f.addEventListener("submit", (e) => {
      if (q.value.trim().toLowerCase() !== "/timers") return;
      e.preventDefault(); e.stopImmediatePropagation();
      try { localStorage.setItem(BETA, "1"); } catch (err) {}
      location.reload();
    }, true);
    return;
  }
  /* Officer pages don't load the main site's app.js, so keep a copy of the event schedule here;
     the officer-edited schedule (data/events-x7k2p9.json "sched") replaces it, like on the main site. */
  const ON_MAIN = typeof EVENT_TIMES !== "undefined";
  const FB = {
    times: { "bear-hunt": [13, 22], "swordland-showdown": [2, 14], "tri-alliance-clash": [14, 21], "viking-vengeance": [14, 23], "cesares-fury": [22 + 35 / 60] },
    sched: { "bear-hunt": { anchor: Date.UTC(2026, 9, 7), periodDays: 2, activeDays: 1 },
      "swordland-showdown": { anchor: Date.UTC(2026, 8, 28), periodDays: 14, activeDays: 7 },
      "tri-alliance-clash": { anchor: Date.UTC(2026, 8, 28), periodDays: 28, activeDays: 6 },
      "viking-vengeance": { anchor: Date.UTC(2026, 8, 22), periodDays: 14, activeDays: 3 },
      "cesares-fury": { anchor: Date.UTC(2026, 9, 10), periodDays: 21, activeDays: 3 } },
    names: { "bear-hunt": ["🐻", "Bear Hunt"], "swordland-showdown": ["⚔️", "Swordland Showdown"], "tri-alliance-clash": ["🔱", "Tri-Alliance Clash"],
      "viking-vengeance": ["🧯", "Viking Vengeance"], "mystic-trial": ["🔮", "Mystic Trial"] },
  };
  fetch("data/event-times.json?t=" + Date.now(), { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => {
    for (const [k, n] of Object.entries((d && d.days) || {})) { if (+n >= 1) FIGHT_DAY[k] = +n; else if (+n === 0) delete FIGHT_DAY[k]; }   // 0 = every day is a battle day
    if (ON_MAIN) { if (!view.hidden) render(); return; }
    for (const [k, v] of Object.entries(d || {})) { const hs = (Array.isArray(v) ? v : []).map((x) => { const m = String(x).match(/^(\d{1,2})(?::(\d{2}))?$/); return m ? +m[1] + (+(m[2] || 0)) / 60 : null; }).filter((x) => x != null && x < 24); if (hs.length) FB.times[k] = hs; }
    if (!view.hidden) render();
  }).catch(() => {});
  if (!ON_MAIN) fetch("data/events-x7k2p9.json?t=" + Date.now(), { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((f) => {
    for (const [k, v] of Object.entries((f && f.sched) || {})) {
      const a = Date.parse(v.anchor + "T00:00:00Z");
      if (FB.sched[k] && !isNaN(a) && v.periodDays > 0) FB.sched[k] = { anchor: a, periodDays: v.periodDays, activeDays: v.activeDays || 1 };
    }
    if (!view.hidden) render();
  }).catch(() => {});
  const { panel } = NXSAI;
  const API = NXSAI.url;
  const VAPID = "BKb0YJxObHPh9_7b4ZriSZQeRk6TaojqNUvPBJe7J9aC_pVuXtmQRRWD11gDs6OJYj8Fg7jigPXDBOxZ5NQbP0o";
  const LS = "nxs-timers-v1";
  const KEEP_DONE_MS = 60 * 60 * 1000;   // a finished timer stays on the list (as "Done ✓") for an hour

  const TX = {
    en: {"ordReady":"is ready again — you can enact it.","ordHint":"Just enacted it? The full cooldown ({cd}) is filled in. Otherwise type the cooldown the game shows.","fnTip":"Water Essence stops filling after 12 h at any level — claim it before then. From Lv.3 allies can help every 6 h (3 helps a day, reset 00:00 UTC).","fnFull":"is full — claim your Water Essence.","fnHint":"Just claimed? 12 h is filled in. Otherwise type how long until it's full.","dnTip":"You get 1 attempt back every 10 min, up to 25. From 0 it takes 4 h 10 min to fill — anything over 25 is wasted.","dnNow":"Attempts you have now (0–25)","dnFull":"is back to 25 attempts — go contribute.","chip":"⏰ Set a timer","title":"⏰ My timers","chat":"‹ Chat","add":"＋ Set a timer","what":"What is it?","left":"Time left in the game","hint":"Type it as the game shows it, e.g. 2:45:12 or 3d 07:51:57","another":"＋ Another march","save":"Save","cancel":"Cancel","empty":"No timers yet.","done":"Done ✓","at":"done at {t}","bad":"Check the time — e.g. 2:45:12","on":"🔔 Notifications are on for this phone.","turnOn":"🔔 Turn on notifications","test":"Send a test","testMsg":"Notifications work! ✓","testWait":"Coming in 15 s — leave the app now (Home Screen) to see the red badge 🔴","blocked":"Notifications are blocked. Allow them for this site in your phone's settings, then come back.","ios":"On iPhone, add the site to your Home Screen first: tap Share → “Add to Home Screen”, then open NXS from the new icon and come back here.","noPush":"This browser can't show notifications. Try Chrome (Android) or the Home Screen app (iPhone).","local":"Timers still work on this page, but your phone won't ping you until notifications are on.","fail":"Couldn't reach the notification server. Your timers are saved; they'll sync next time.","limitHold":"⚠️ The server's free daily storage allowance is used up (resets 00:00 UTC). Your timers are saved on this phone and will sync after the reset.","body":"is done — time to check the game!","name":"Name","quick":"⚡ Quick start (your last times)","quickHint":"One tap starts it again with the same time.","forget":"Forget this time","lastTime":"Last time: {t} — just press Save, or type a new time.","synced":"✓ Saved on the server: {n} notifications scheduled (checked {t}).","sample":"send a sample now","sent":"sent ✓","needOn":"Turn on notifications above first — until then these alerts can't reach your phone.","cats":{"appt":"Appointment","gather":"Gathering","train":"Troops Training","build":"Building Queue","research":"Tech Research","master":"Master","recruit":"Recruit Heroes","pet":"Pet Adventure","intel":"Intel Missions","stamina":"Gourmet Feast","heal":"Healing","fountain":"Fountain of Life","donate":"Alliance Tech · Contribute","order":"Governor Order","other":"Other"},"subQ":{"order":"Which order?","gather":"Which resource?","train":"Which troops?","recruit":"Which recruit?","appt":"Which position?"},"advanced":"Advanced","epic":"Epic","minister":"Chief Minister","advisor":"Noble Advisor","apDay":"Day (UTC)","apTime":"Your slot (next 24 h, 30 min each)","apRemind":"Remind me","apToday":"today","apStarts":"slot starts {t}","apTitle":"{e} {name} in {n} min","apNow":"{e} {name} — your slot starts now!","apBody":"Your 30-min slot starts at {t} UTC.","stack":{"minister":["Activate Double Time","Construction Aide (Gray Wolf)","Start both building queues within 5 min"],"advisor":["Use gems to raise troop training capacity","Start training (all troop types)"]},"btBody":"Tap to open the BT calculator.","btLink":"🧮 BT calculator","clOn":"🔄 Synced with Discord ({name}) · {t}","clNow":"sync now","clOff":"🔄 Use your timers on all your devices: log in with Discord (officers).","clIn":"Log in with Discord","cl_no_access":"Your Discord account isn't on the officer list yet.","cl_not_member":"Join our alliance Discord server first.","cl_logged_out":"Please log in with Discord again.","cl_cancelled":"Discord login was cancelled.","cl_expired":"Please log in with Discord again.","cl_discord":"Couldn't sync right now — will try again.","cl_discord_unreachable":"Couldn't reach Discord — will try again.","cl_too_big":"Too much to sync.","ibT":"🔔 Reminders ({n})","ibClear":"✓ Clear","ibAgo":"{t} ago","stackT":"{e} {name} is on — until {t} UTC","stackHint":"Stack your buffs:","stackBody":"Slot at {t} UTC. Then: {list}.","naOn":"Noble Advisor buff on now","naHint":"Training is faster with it, so the time is remembered separately (turns on by itself during your Noble Advisor slot).","sgT":"💡 Line up a {pos}","sgNow":"{what} finishes {when}. Book the {slot} UTC slot so your next one starts with the buff.","sgLater":"{what} finishes {when} — more than 24 h away, so you can't book yet. Booking opens {open}.","sgRemind":"＋ Remind me of this slot","sgBook":"＋ Remind me to book it","sgNo":"Not now","sgLink":"📅 slot","bookT":"📅 Book {name} now","bookB":"Book the {t} UTC slot — {what} finishes then.","troop":"Which troops?","builder":"＋ Second builder","alerts":"🎮 Game reminders","admin":"🛠️ Admin reminders","adminNote":"Officer to-dos from the Events tab, sent on the day they're due.","adminOn":"Send admin reminders","adminAt":"at {t} UTC","adminNone":"Open the officer page's Events tab once (in this same app / browser) to load the to-dos — they refresh every time you open it.","adminEmpty":"No officer to-dos in the next 3 weeks.","adminUpd":"to-dos loaded {t}","adminBody":"Admin step today — tap to open the checklist.","alertsNote":"Tap a time to get a notification before it starts.","before":"{n} min before","next":"next alert: {t}","atTime":"at the time","reset":"00:00 UTC reset","arenaName":"Arena","journeyName":"Journey Supplies","cesaresName":"Cesares Fury","intelName":"Intel Missions","refreshTitle":"{e} {name} refresh in {n} min","refreshNow":"{e} {name} — new missions now!","refreshBody":"Watchtower refreshes at {t} UTC.","evTitle":"{e} {name} in {n} min","evNow":"{e} {name} — now!","evBody":"Starts at {t} UTC.","resetTitle":"{e} {name} — daily reset in {n} min","resetNow":"{e} {name} — daily reset now","resetBody":"Resets at 00:00 UTC. Did you use it today?","claimTitle":"{e} {name} in {n} min","claimNow":"{e} {name} — claim now!","claimBody":"Free claim at {t} UTC.","alertsSync":"Alerts are planned 3 weeks ahead — open the site now and then to keep them going."},
    zh: {"ordReady":"冷卻結束，可以再頒布了。","ordHint":"剛頒布？已幫你填好完整冷卻時間（{cd}）。不是的話，請照遊戲顯示的冷卻時間輸入。","fnTip":"不管幾級，生命之水最多只存 12 小時，滿了就不再增加，記得在那之前領。3 級起盟友每 6 小時可以協助一次（每天最多 3 次，UTC 0 點重設）。","fnFull":"滿了，快去領生命之水。","fnHint":"剛領完？已經幫你填好 12 小時。不是的話，請輸入還要多久才會滿。","dnTip":"每 10 分鐘回復 1 次，最多存 25 次。從 0 次回到滿要 4 小時 10 分，滿了之後就不會再增加。","dnNow":"現在剩幾次（0–25）","dnFull":"次數回滿 25 次了，可以去捐獻了。","chip":"⏰ 設定計時","title":"⏰ 我的計時","chat":"‹ 對話","add":"＋ 設定計時","what":"要計時什麼？","left":"遊戲裡剩下的時間","hint":"例如 2:45:12、2h45m、45m","another":"＋ 再加一隊","save":"儲存","cancel":"取消","empty":"還沒有計時。","done":"完成 ✓","at":"{t} 完成","bad":"請檢查時間，例如 2:45:12","on":"🔔 這支手機已開啟通知。","turnOn":"🔔 開啟通知","test":"傳測試通知","testMsg":"通知可以用了！✓","testWait":"15 秒後送達 — 現在先回主畫面，就能看到紅點點 🔴","blocked":"通知被封鎖了。請到手機設定裡允許這個網站的通知，再回來這裡。","ios":"iPhone 要先把網站加到主畫面：按「分享」→「加入主畫面」，再從新的 NXS 圖示打開，回到這裡。","noPush":"這個瀏覽器不能顯示通知。請改用 Chrome（Android）或主畫面上的 App（iPhone）。","local":"計時在這頁還是會倒數，但要開啟通知，手機才會提醒你。","fail":"連不上通知伺服器。計時已經存好，下次會再同步。","limitHold":"⚠️ 伺服器今天的免費儲存額度用完了（UTC 00:00 重置）。計時已存在這支手機，重置後會自動同步。","body":"完成了，去遊戲看看吧！","name":"名稱","cats":{"gather":"採集","train":"訓練","build":"建造","research":"研究","heal":"治療","fountain":"生命之泉","donate":"聯盟科技捐獻","order":"法令","other":"其他","appt":"官職任命","master":"大師","recruit":"英雄招募","pet":"寵物尋寶","intel":"情報事件","stamina":"美食大餐"},"quick":"⚡ 快速開始（上次的時間）","quickHint":"點一下就用同樣的時間重新開始。","forget":"刪除這個時間","lastTime":"上次：{t} — 直接按儲存，或輸入新時間。","synced":"✓ 已存到伺服器：排定 {n} 則通知（{t} 確認）。","sample":"立即傳送範例","sent":"已傳送 ✓","needOn":"請先開啟上方的通知 — 否則這些提醒無法傳到你的手機。","subQ":{"order":"哪個法令？","gather":"採集哪種資源？","train":"哪種部隊？","recruit":"哪種招募？","appt":"哪個官職？"},"advanced":"高級招募","epic":"史詩招募","minister":"總理大臣","advisor":"參謀長","apDay":"日期（UTC）","apTime":"你的時段（未來 24 小時，每段 30 分鐘）","apRemind":"提醒我","apToday":"今天","apStarts":"時段 {t} 開始","apTitle":"{e} {name} 還有 {n} 分鐘","apNow":"{e} {name} — 你的時段開始了！","apBody":"你的 30 分鐘時段於 {t} UTC 開始。","stack":{"minister":["開啟加速建造","建造助手 (灰狼)","5 分鐘內開始兩個建造隊列"],"advisor":["用鑽石提升部隊訓練容量","開始訓練（所有兵種）"]},"btBody":"點一下開啟 BT 計算器。","btLink":"🧮 BT 計算器","clOn":"🔄 已與 Discord 同步（{name}）· {t}","clNow":"立即同步","clOff":"🔄 在所有裝置使用你的計時器：用 Discord 登入（幹部）。","clIn":"用 Discord 登入","cl_no_access":"你的 Discord 帳號還不在幹部名單上。","cl_not_member":"請先加入我們聯盟的 Discord 伺服器。","cl_logged_out":"請重新用 Discord 登入。","cl_cancelled":"已取消 Discord 登入。","cl_expired":"請重新用 Discord 登入。","cl_discord":"目前無法同步 — 稍後會再試。","cl_discord_unreachable":"無法連上 Discord — 稍後會再試。","cl_too_big":"要同步的資料太多。","ibT":"🔔 提醒（{n}）","ibClear":"✓ 清除","ibAgo":"{t}前","stackT":"{e} {name} 生效中 — 到 {t} UTC","stackHint":"疊加你的增益：","stackBody":"時段 {t} UTC。接著：{list}。","naOn":"參謀長增益生效中","naHint":"有增益時訓練較快，所以時間會分開記錄（在你的參謀長時段會自動開啟）。","sgT":"💡 預約{pos}","sgNow":"{what} 將於 {when} 完成。預約 {slot} UTC 時段，讓下一輪帶著增益開始。","sgLater":"{what} 將於 {when} 完成 — 超過 24 小時，還不能預約。{open} 開放預約。","sgRemind":"＋ 提醒我這個時段","sgBook":"＋ 提醒我去預約","sgNo":"先不要","sgLink":"📅 時段","bookT":"📅 現在預約{name}","bookB":"預約 {t} UTC 時段 — {what} 屆時完成。","troop":"哪種部隊？","builder":"＋ 第二建造隊列","alerts":"🎮 遊戲提醒","admin":"🛠️ 管理提醒","adminNote":"來自活動分頁的幹部待辦事項，在到期當天傳送。","adminOn":"傳送管理提醒","adminAt":"於 {t} UTC","adminNone":"請先開啟一次幹部頁面的活動分頁（在同一個 App／瀏覽器）來載入待辦事項 — 每次開啟都會更新。","adminEmpty":"未來 3 週沒有幹部待辦事項。","adminUpd":"待辦事項載入於 {t}","adminBody":"今天有管理步驟 — 點一下開啟清單。","alertsNote":"點選時間，在開始前收到通知。","before":"提前 {n} 分鐘","next":"下次提醒：{t}","atTime":"準時","reset":"00:00 UTC 重置","arenaName":"競技場","journeyName":"冒險物資","cesaresName":"征討切薩雷","intelName":"情報事件","refreshTitle":"{e} {name} {n} 分鐘後刷新","refreshNow":"{e} {name} — 新任務來了！","refreshBody":"瞭望塔於 {t} UTC 刷新。","evTitle":"{e} {name} 還有 {n} 分鐘","evNow":"{e} {name} — 開始了！","evBody":"{t} UTC 開始。","resetTitle":"{e} {name} — {n} 分鐘後每日重置","resetNow":"{e} {name} — 現在每日重置","resetBody":"00:00 UTC 重置。今天用過了嗎？","claimTitle":"{e} {name} 還有 {n} 分鐘","claimNow":"{e} {name} — 快領取！","claimBody":"{t} UTC 可免費領取。","alertsSync":"提醒會排定未來 3 週 — 請不時開啟網站以持續更新。"},
    ko: {"ordReady":"쿨타임이 끝났어요. 다시 반포할 수 있어요.","ordHint":"방금 반포했나요? 전체 쿨타임({cd})을 넣어 두었어요. 아니면 게임에 표시된 쿨타임을 입력하세요.","fnTip":"레벨과 상관없이 생명의 물은 12시간까지만 쌓여요. 그 전에 수령하세요. Lv.3부터 연맹원이 6시간마다 도와줄 수 있어요 (하루 3번, UTC 0시 리셋).","fnFull":"가득 찼어요. 생명의 물을 수령하세요.","fnHint":"방금 수령했나요? 12시간을 넣어 두었어요. 아니면 가득 찰 때까지 남은 시간을 입력하세요.","dnTip":"10분마다 1회씩 회복되고 최대 25회까지 쌓여요. 0회에서 가득 차기까지 4시간 10분 — 가득 차면 더 늘지 않아요.","dnNow":"지금 남은 횟수 (0–25)","dnFull":"횟수가 25회로 가득 찼어요. 기부하러 가세요.","chip":"⏰ 타이머 설정","title":"⏰ 내 타이머","chat":"‹ 채팅","add":"＋ 타이머 설정","what":"무엇인가요?","left":"게임에 남은 시간","hint":"예: 2:45:12 · 2h45m · 45m","another":"＋ 부대 추가","save":"저장","cancel":"취소","empty":"아직 타이머가 없어요.","done":"완료 ✓","at":"{t} 완료","bad":"시간을 확인하세요 — 예: 2:45:12","on":"🔔 이 휴대폰에서 알림이 켜져 있어요.","turnOn":"🔔 알림 켜기","test":"테스트 보내기","testMsg":"알림이 작동해요! ✓","blocked":"알림이 차단되어 있어요. 휴대폰 설정에서 이 사이트의 알림을 허용한 뒤 다시 오세요.","ios":"아이폰은 먼저 홈 화면에 추가하세요: 공유 → “홈 화면에 추가”, 그다음 새 NXS 아이콘으로 열고 여기로 오세요.","noPush":"이 브라우저는 알림을 표시할 수 없어요. Chrome(안드로이드)이나 홈 화면 앱(아이폰)을 사용하세요.","local":"타이머는 이 페이지에서 계속 돌아가지만, 알림을 켜야 휴대폰이 알려 줘요.","fail":"알림 서버에 연결할 수 없어요. 타이머는 저장됐고 다음에 동기화돼요.","limitHold":"⚠️ 서버의 무료 일일 저장 한도를 다 썼습니다 (UTC 00:00 초기화). 타이머는 이 기기에 저장되어 있고 초기화 후 자동으로 동기화됩니다.","body":"완료! 게임을 확인하세요!","name":"이름","cats":{"gather":"채집","train":"훈련","build":"건설","research":"연구","heal":"치료","fountain":"생명의 샘","donate":"연맹 과학 기술 · 기부","order":"법령","other":"기타","appt":"관직 임명","master":"거장","recruit":"영웅 모집","pet":"펫 보물찾기","intel":"정보 이벤트","stamina":"맛있는 식사"},"testWait":"15초 후 도착 — 지금 앱을 나가서(홈 화면) 빨간 배지를 확인하세요 🔴","quick":"⚡ 빠른 시작 (최근 시간)","quickHint":"한 번 탭하면 같은 시간으로 다시 시작해요.","forget":"이 시간 삭제","lastTime":"지난번: {t} — 저장만 누르거나 새 시간을 입력하세요.","synced":"✓ 서버에 저장됨: 알림 {n}개 예약 ({t} 확인).","sample":"지금 샘플 보내기","sent":"전송됨 ✓","needOn":"먼저 위에서 알림을 켜세요 — 그 전에는 이 알림이 휴대폰에 오지 않아요.","subQ":{"order":"어떤 법령인가요?","gather":"어떤 자원인가요?","train":"어떤 부대?","recruit":"어떤 모집?","appt":"어떤 관직?"},"advanced":"고급 모집","epic":"에픽 모집","minister":"총리대신","advisor":"참모장","apDay":"날짜 (UTC)","apTime":"내 시간대 (앞으로 24시간, 각 30분)","apRemind":"알림 받기","apToday":"오늘","apStarts":"{t} 시작","apTitle":"{e} {name} {n}분 전","apNow":"{e} {name} — 내 시간대가 지금 시작돼요!","apBody":"30분 시간대가 {t} UTC에 시작돼요.","stack":{"minister":["건설 가속 켜기","건설 조수 (회색늑대)","5분 안에 건설 대열 2개 시작"],"advisor":["다이아로 부대 훈련 수용량 늘리기","훈련 시작 (모든 병종)"]},"btBody":"탭해서 BT 계산기 열기.","btLink":"🧮 BT 계산기","clOn":"🔄 Discord와 동기화됨 ({name}) · {t}","clNow":"지금 동기화","clOff":"🔄 모든 기기에서 타이머 사용: Discord로 로그인 (간부).","clIn":"Discord로 로그인","cl_no_access":"아직 Discord 계정이 간부 목록에 없어요.","cl_not_member":"먼저 연맹 Discord 서버에 가입하세요.","cl_logged_out":"Discord로 다시 로그인하세요.","cl_cancelled":"Discord 로그인이 취소됐어요.","cl_expired":"Discord로 다시 로그인하세요.","cl_discord":"지금은 동기화할 수 없어요 — 다시 시도할게요.","cl_discord_unreachable":"Discord에 연결할 수 없어요 — 다시 시도할게요.","cl_too_big":"동기화할 데이터가 너무 많아요.","ibT":"🔔 알림 ({n})","ibClear":"✓ 지우기","ibAgo":"{t} 전","stackT":"{e} {name} 적용 중 — {t} UTC까지","stackHint":"버프를 겹치세요:","stackBody":"{t} UTC 시간대. 이어서: {list}.","naOn":"지금 참모장 버프 적용 중","naHint":"버프가 있으면 훈련이 빨라서 시간을 따로 기억해요 (참모장 시간대에는 자동으로 켜져요).","sgT":"💡 {pos} 예약하기","sgNow":"{what} {when} 완료. {slot} UTC 시간대를 예약하면 다음 차례가 버프와 함께 시작돼요.","sgLater":"{what} {when} 완료 — 24시간 넘게 남아서 아직 예약할 수 없어요. 예약 오픈: {open}.","sgRemind":"＋ 이 시간대 알림 받기","sgBook":"＋ 예약하라고 알려 주기","sgNo":"나중에","sgLink":"📅 시간대","bookT":"📅 지금 {name} 예약","bookB":"{t} UTC 시간대를 예약하세요 — 그때 {what} 완료.","troop":"어떤 부대?","builder":"＋ 두 번째 건설 대열","alerts":"🎮 게임 알림","admin":"🛠️ 관리 알림","adminNote":"이벤트 탭의 간부 할 일, 마감 당일에 보내요.","adminOn":"관리 알림 보내기","adminAt":"{t} UTC","adminNone":"간부 페이지의 이벤트 탭을 한 번 열어 (같은 앱 / 브라우저에서) 할 일을 불러오세요 — 열 때마다 새로고침돼요.","adminEmpty":"앞으로 3주간 간부 할 일이 없어요.","adminUpd":"할 일 불러옴 {t}","adminBody":"오늘 관리 단계 있음 — 탭해서 체크리스트 열기.","alertsNote":"시간을 탭하면 시작 전에 알림을 받아요.","before":"{n}분 전","next":"다음 알림: {t}","atTime":"정각에","reset":"00:00 UTC 초기화","arenaName":"경기장","journeyName":"모험 물자","cesaresName":"체사레 정벌","intelName":"정보 이벤트","refreshTitle":"{e} {name} {n}분 후 갱신","refreshNow":"{e} {name} — 새 임무 도착!","refreshBody":"전망대는 {t} UTC에 갱신돼요.","evTitle":"{e} {name} {n}분 전","evNow":"{e} {name} — 지금 시작!","evBody":"{t} UTC 시작.","resetTitle":"{e} {name} — {n}분 후 일일 초기화","resetNow":"{e} {name} — 지금 일일 초기화","resetBody":"00:00 UTC 초기화. 오늘 사용했나요?","claimTitle":"{e} {name} {n}분 전","claimNow":"{e} {name} — 지금 수령하세요!","claimBody":"{t} UTC 무료 수령.","alertsSync":"알림은 3주 앞까지 예약돼요 — 계속 받으려면 가끔 사이트를 열어 주세요."},
    de: {"ordReady":"ist wieder bereit — du kannst ihn erlassen.","ordHint":"Gerade erlassen? Die volle Abklingzeit ({cd}) ist eingetragen. Sonst gib die Zeit aus dem Spiel ein.","fnTip":"Wasseressenz sammelt sich auf jedem Level nur 12 Std. lang — vorher abholen. Ab Lv. 3 können Verbündete alle 6 Std. helfen (3× pro Tag, Reset 00:00 UTC).","fnFull":"ist voll — hol deine Wasseressenz ab.","fnHint":"Gerade abgeholt? 12 Std. sind eingetragen. Sonst gib die Zeit bis voll ein.","dnTip":"Alle 10 Min. kommt 1 Versuch zurück, max. 25. Von 0 bis voll dauert es 4 Std. 10 Min. — darüber hinaus verfällt nichts mehr dazu.","dnNow":"Versuche jetzt (0–25)","dnFull":"ist wieder bei 25 Versuchen — jetzt beitragen.","chip":"⏰ Timer stellen","title":"⏰ Meine Timer","chat":"‹ Chat","add":"＋ Timer stellen","what":"Was ist es?","left":"Restzeit im Spiel","hint":"z. B. 2:45:12 · 2h45m · 45m","another":"＋ Weiterer Marsch","save":"Speichern","cancel":"Abbrechen","empty":"Noch keine Timer.","done":"Fertig ✓","at":"fertig um {t}","bad":"Zeit prüfen — z. B. 2:45:12","on":"🔔 Benachrichtigungen sind auf diesem Handy an.","turnOn":"🔔 Benachrichtigungen einschalten","test":"Test senden","testMsg":"Benachrichtigungen funktionieren! ✓","blocked":"Benachrichtigungen sind blockiert. Erlaube sie für diese Seite in den Handy-Einstellungen und komm zurück.","ios":"Auf dem iPhone zuerst zum Home-Bildschirm hinzufügen: Teilen → „Zum Home-Bildschirm“, dann NXS über das neue Symbol öffnen und hierher zurückkommen.","noPush":"Dieser Browser kann keine Benachrichtigungen anzeigen. Nutze Chrome (Android) oder die Home-Bildschirm-App (iPhone).","local":"Die Timer laufen auf dieser Seite weiter, aber dein Handy meldet sich erst, wenn Benachrichtigungen an sind.","fail":"Benachrichtigungsserver nicht erreichbar. Deine Timer sind gespeichert und werden später abgeglichen.","limitHold":"⚠️ Das kostenlose Tages-Speicherkontingent des Servers ist aufgebraucht (Reset 00:00 UTC). Deine Timer sind auf diesem Gerät gespeichert und werden danach synchronisiert.","body":"ist fertig — schau ins Spiel!","name":"Name","cats":{"gather":"Sammeln","train":"Training","build":"Bau","research":"Forschung","heal":"Heilung","fountain":"Brunnen des Lebens","donate":"Technologie · Beitragen","order":"Gouverneursbefehl","other":"Sonstiges","appt":"Ernennung","master":"Meister","recruit":"Helden rekrutieren","pet":"Begleittier Abenteuer","intel":"Geheimdienst-Missionen","stamina":"Feinschmecker-Festmahl"},"testWait":"Kommt in 15 s — verlasse jetzt die App (Home-Bildschirm), um das rote Abzeichen zu sehen 🔴","quick":"⚡ Schnellstart (deine letzten Zeiten)","quickHint":"Ein Tipp startet ihn erneut mit derselben Zeit.","forget":"Diese Zeit vergessen","lastTime":"Letztes Mal: {t} — einfach Speichern drücken oder neue Zeit eingeben.","synced":"✓ Auf dem Server gespeichert: {n} Benachrichtigungen geplant (geprüft {t}).","sample":"jetzt Beispiel senden","sent":"gesendet ✓","needOn":"Schalte zuerst oben die Benachrichtigungen ein — sonst erreichen diese Hinweise dein Handy nicht.","subQ":{"order":"Welcher Befehl?","gather":"Welche Ressource?","train":"Welche Truppen?","recruit":"Welche Rekrutierung?","appt":"Welche Position?"},"advanced":"Erweitert","epic":"Episch","minister":"Höchster Minister","advisor":"Nobler Berater","apDay":"Tag (UTC)","apTime":"Dein Slot (nächste 24 h, je 30 min)","apRemind":"Erinnere mich","apToday":"heute","apStarts":"Slot beginnt {t}","apTitle":"{e} {name} in {n} min","apNow":"{e} {name} — dein Slot beginnt jetzt!","apBody":"Dein 30-min-Slot beginnt um {t} UTC.","stack":{"minister":["Doppeltes Tempo aktivieren","Bauhilfe (Grauer Wolf)","Beide Bauschlangen innerhalb von 5 min starten"],"advisor":["Mit Edelsteinen die Trainingskapazität erhöhen","Training starten (alle Truppentypen)"]},"btBody":"Tippen, um den BT-Rechner zu öffnen.","btLink":"🧮 BT-Rechner","clOn":"🔄 Mit Discord synchronisiert ({name}) · {t}","clNow":"jetzt synchronisieren","clOff":"🔄 Timer auf allen Geräten nutzen: mit Discord anmelden (Offiziere).","clIn":"Mit Discord anmelden","cl_no_access":"Dein Discord-Konto steht noch nicht auf der Offiziersliste.","cl_not_member":"Tritt zuerst dem Discord-Server unserer Allianz bei.","cl_logged_out":"Bitte melde dich erneut mit Discord an.","cl_cancelled":"Discord-Anmeldung wurde abgebrochen.","cl_expired":"Bitte melde dich erneut mit Discord an.","cl_discord":"Synchronisieren gerade nicht möglich — neuer Versuch folgt.","cl_discord_unreachable":"Discord nicht erreichbar — neuer Versuch folgt.","cl_too_big":"Zu viel zum Synchronisieren.","ibT":"🔔 Erinnerungen ({n})","ibClear":"✓ Leeren","ibAgo":"vor {t}","stackT":"{e} {name} ist aktiv — bis {t} UTC","stackHint":"Buffs stapeln:","stackBody":"Slot um {t} UTC. Dann: {list}.","naOn":"Nobler-Berater-Buff jetzt aktiv","naHint":"Damit ist das Training schneller, daher wird die Zeit separat gespeichert (schaltet sich während deines Nobler-Berater-Slots automatisch ein).","sgT":"💡 {pos} einplanen","sgNow":"{what} ist {when} fertig. Buche den Slot um {slot} UTC, damit der nächste Durchgang mit dem Buff startet.","sgLater":"{what} ist {when} fertig — mehr als 24 h entfernt, Buchung noch nicht möglich. Buchung öffnet {open}.","sgRemind":"＋ An diesen Slot erinnern","sgBook":"＋ Ans Buchen erinnern","sgNo":"Nicht jetzt","sgLink":"📅 Slot","bookT":"📅 {name} jetzt buchen","bookB":"Buche den Slot um {t} UTC — dann ist {what} fertig.","troop":"Welche Truppen?","builder":"＋ Zweite Bauschlange","alerts":"🎮 Spiel-Erinnerungen","admin":"🛠️ Admin-Erinnerungen","adminNote":"Offiziers-Aufgaben aus dem Events-Tab, gesendet am Fälligkeitstag.","adminOn":"Admin-Erinnerungen senden","adminAt":"um {t} UTC","adminNone":"Öffne einmal den Events-Tab der Offiziersseite (in derselben App / demselben Browser), um die Aufgaben zu laden — sie werden bei jedem Öffnen aktualisiert.","adminEmpty":"Keine Offiziers-Aufgaben in den nächsten 3 Wochen.","adminUpd":"Aufgaben geladen {t}","adminBody":"Heute Admin-Schritt — tippen, um die Checkliste zu öffnen.","alertsNote":"Tippe auf eine Zeit, um vor dem Start benachrichtigt zu werden.","before":"{n} min vorher","next":"nächster Hinweis: {t}","atTime":"pünktlich","reset":"00:00 UTC Reset","arenaName":"Arena","journeyName":"Reisevorräte","cesaresName":"Cesares Zorn","intelName":"Geheimdienst-Missionen","refreshTitle":"{e} {name} erneuert sich in {n} min","refreshNow":"{e} {name} — neue Missionen!","refreshBody":"Der Wachturm erneuert sich um {t} UTC.","evTitle":"{e} {name} in {n} min","evNow":"{e} {name} — jetzt!","evBody":"Beginnt um {t} UTC.","resetTitle":"{e} {name} — täglicher Reset in {n} min","resetNow":"{e} {name} — täglicher Reset jetzt","resetBody":"Reset um 00:00 UTC. Heute schon genutzt?","claimTitle":"{e} {name} in {n} min","claimNow":"{e} {name} — jetzt abholen!","claimBody":"Gratis abholen um {t} UTC.","alertsSync":"Hinweise werden 3 Wochen im Voraus geplant — öffne die Seite ab und zu, damit sie weiterlaufen."},
    fr: {"ordReady":"est de nouveau prêt — vous pouvez le promulguer.","ordHint":"Vous venez de le promulguer ? Le temps de recharge complet ({cd}) est déjà saisi. Sinon, tapez le temps affiché en jeu.","fnTip":"L'Essence d'Eau ne s'accumule que 12 h, quel que soit le niveau — récupérez-la avant. Dès le Niv. 3, les alliés peuvent aider toutes les 6 h (3 fois/jour, reset 00:00 UTC).","fnFull":"est pleine — récupérez votre Essence d'Eau.","fnHint":"Vous venez de récupérer ? 12 h sont saisies. Sinon, tapez le temps restant avant qu'elle soit pleine.","dnTip":"1 tentative revient toutes les 10 min, jusqu'à 25. De 0 au maximum : 4 h 10 — au-delà, rien ne s'ajoute.","dnNow":"Tentatives actuelles (0–25)","dnFull":"est de nouveau à 25 tentatives — allez contribuer.","chip":"⏰ Régler un minuteur","title":"⏰ Mes minuteurs","chat":"‹ Chat","add":"＋ Régler un minuteur","what":"C'est quoi ?","left":"Temps restant dans le jeu","hint":"ex. 2:45:12 · 2h45m · 45m","another":"＋ Une autre marche","save":"Enregistrer","cancel":"Annuler","empty":"Aucun minuteur.","done":"Terminé ✓","at":"fini à {t}","bad":"Vérifie le temps — ex. 2:45:12","on":"🔔 Notifications activées sur ce téléphone.","turnOn":"🔔 Activer les notifications","test":"Envoyer un test","testMsg":"Les notifications marchent ! ✓","blocked":"Les notifications sont bloquées. Autorise-les pour ce site dans les réglages du téléphone, puis reviens.","ios":"Sur iPhone, ajoute d'abord le site à l'écran d'accueil : Partager → « Sur l'écran d'accueil », puis ouvre NXS depuis la nouvelle icône et reviens ici.","noPush":"Ce navigateur ne peut pas afficher de notifications. Essaie Chrome (Android) ou l'app de l'écran d'accueil (iPhone).","local":"Les minuteurs tournent sur cette page, mais ton téléphone ne te préviendra qu'avec les notifications activées.","fail":"Serveur de notifications injoignable. Tes minuteurs sont enregistrés et seront synchronisés plus tard.","limitHold":"⚠️ Le quota de stockage gratuit du serveur est épuisé pour aujourd'hui (remise à zéro à 00:00 UTC). Tes minuteurs sont enregistrés sur ce téléphone et se synchroniseront ensuite.","body":"est terminé — va voir le jeu !","name":"Nom","cats":{"gather":"Collecte","train":"Entraînement","build":"Construction","research":"Recherche","heal":"Soins","fountain":"Fontaine Vitale","donate":"Tech · Contribuer","order":"Ordre du Gouverneur","other":"Autre","appt":"Nomination","master":"Expert","recruit":"Recruter des Héros","pet":"Aventure Animalière","intel":"Missions de renseignements","stamina":"Banquet Gastronomique"},"testWait":"Arrive dans 15 s — quittez l'app maintenant (écran d'accueil) pour voir la pastille rouge 🔴","quick":"⚡ Démarrage rapide (vos derniers temps)","quickHint":"Un tap le relance avec le même temps.","forget":"Oublier ce temps","lastTime":"Dernière fois : {t} — appuyez sur Enregistrer ou saisissez un nouveau temps.","synced":"✓ Enregistré sur le serveur : {n} notifications programmées (vérifié {t}).","sample":"envoyer un exemple","sent":"envoyé ✓","needOn":"Activez d'abord les notifications ci-dessus — sinon ces alertes n'arriveront pas sur votre téléphone.","subQ":{"order":"Quel ordre ?","gather":"Quelle ressource ?","train":"Quelles troupes ?","recruit":"Quel recrutement ?","appt":"Quel poste ?"},"advanced":"Avancé","epic":"Épique","minister":"Premier Ministre","advisor":"Noble Conseiller","apDay":"Jour (UTC)","apTime":"Votre créneau (24 h à venir, 30 min chacun)","apRemind":"Me rappeler","apToday":"aujourd'hui","apStarts":"créneau à {t}","apTitle":"{e} {name} dans {n} min","apNow":"{e} {name} — votre créneau commence !","apBody":"Votre créneau de 30 min commence à {t} UTC.","stack":{"minister":["Activer Bouchées Doubles","Aide à la Construction (Loup Gris)","Lancer les deux files de construction en 5 min"],"advisor":["Utiliser des Gemmes pour augmenter la capacité d'entraînement","Lancer l'Entraînement (tous types de troupes)"]},"btBody":"Touchez pour ouvrir le calculateur BT.","btLink":"🧮 Calculateur BT","clOn":"🔄 Synchronisé avec Discord ({name}) · {t}","clNow":"synchroniser","clOff":"🔄 Vos minuteurs sur tous vos appareils : connectez-vous avec Discord (officiers).","clIn":"Se connecter avec Discord","cl_no_access":"Votre compte Discord n'est pas encore sur la liste des officiers.","cl_not_member":"Rejoignez d'abord le serveur Discord de l'alliance.","cl_logged_out":"Reconnectez-vous avec Discord.","cl_cancelled":"Connexion Discord annulée.","cl_expired":"Reconnectez-vous avec Discord.","cl_discord":"Synchro impossible pour l'instant — nouvel essai bientôt.","cl_discord_unreachable":"Discord injoignable — nouvel essai bientôt.","cl_too_big":"Trop de données à synchroniser.","ibT":"🔔 Rappels ({n})","ibClear":"✓ Effacer","ibAgo":"il y a {t}","stackT":"{e} {name} actif — jusqu'à {t} UTC","stackHint":"Cumulez vos bonus :","stackBody":"Créneau à {t} UTC. Ensuite : {list}.","naOn":"Bonus Noble Conseiller actif","naHint":"L'Entraînement est plus rapide avec, donc ce temps est mémorisé à part (s'active tout seul pendant votre créneau Noble Conseiller).","sgT":"💡 Prévoyez un {pos}","sgNow":"{what} se termine {when}. Réservez le créneau de {slot} UTC pour que le suivant démarre avec le bonus.","sgLater":"{what} se termine {when} — dans plus de 24 h, réservation pas encore possible. Ouverture {open}.","sgRemind":"＋ Me rappeler ce créneau","sgBook":"＋ Me rappeler de réserver","sgNo":"Plus tard","sgLink":"📅 créneau","bookT":"📅 Réservez {name} maintenant","bookB":"Réservez le créneau de {t} UTC — {what} se termine à ce moment-là.","troop":"Quelles troupes ?","builder":"＋ Second constructeur","alerts":"🎮 Rappels de jeu","admin":"🛠️ Rappels admin","adminNote":"Tâches des officiers depuis l'onglet Évènements, envoyées le jour prévu.","adminOn":"Envoyer les rappels admin","adminAt":"à {t} UTC","adminNone":"Ouvrez une fois l'onglet Évènements de la page officiers (dans cette même app / ce navigateur) pour charger les tâches — elles se mettent à jour à chaque ouverture.","adminEmpty":"Aucune tâche d'officier dans les 3 prochaines semaines.","adminUpd":"tâches chargées {t}","adminBody":"Étape admin aujourd'hui — touchez pour ouvrir la checklist.","alertsNote":"Touchez une heure pour être prévenu avant le début.","before":"{n} min avant","next":"prochaine alerte : {t}","atTime":"à l'heure","reset":"réinitialisation 00:00 UTC","arenaName":"L'Arène","journeyName":"Provisions de voyage","cesaresName":"Fureur des Césarès","intelName":"Missions de renseignements","refreshTitle":"{e} {name} : actualisation dans {n} min","refreshNow":"{e} {name} — nouvelles missions !","refreshBody":"L'Observatoire s'actualise à {t} UTC.","evTitle":"{e} {name} dans {n} min","evNow":"{e} {name} — maintenant !","evBody":"Début à {t} UTC.","resetTitle":"{e} {name} — réinitialisation dans {n} min","resetNow":"{e} {name} — réinitialisation quotidienne","resetBody":"Réinitialisation à 00:00 UTC. L'avez-vous utilisé aujourd'hui ?","claimTitle":"{e} {name} dans {n} min","claimNow":"{e} {name} — à récupérer !","claimBody":"Récupération gratuite à {t} UTC.","alertsSync":"Les alertes sont prévues 3 semaines à l'avance — ouvrez le site de temps en temps pour les prolonger."},
    pt: {"ordReady":"está pronto de novo — você pode decretá-lo.","ordHint":"Acabou de decretar? A recarga completa ({cd}) já está preenchida. Senão, digite o tempo mostrado no jogo.","fnTip":"A Essência da Água só acumula por 12 h em qualquer nível — resgate antes disso. A partir do Nv. 3, aliados podem ajudar a cada 6 h (3 vezes por dia, reinicia 00:00 UTC).","fnFull":"está cheia — resgate sua Essência da Água.","fnHint":"Acabou de resgatar? 12 h já estão preenchidas. Senão, digite quanto falta para encher.","dnTip":"Volta 1 tentativa a cada 10 min, até 25. De 0 até cheio leva 4 h 10 min — depois disso não acumula mais.","dnNow":"Tentativas agora (0–25)","dnFull":"voltou a 25 tentativas — vá contribuir.","chip":"⏰ Definir um timer","title":"⏰ Meus timers","chat":"‹ Chat","add":"＋ Definir um timer","what":"O que é?","left":"Tempo restante no jogo","hint":"ex.: 2:45:12 · 2h45m · 45m","another":"＋ Outra marcha","save":"Salvar","cancel":"Cancelar","empty":"Nenhum timer ainda.","done":"Pronto ✓","at":"pronto às {t}","bad":"Confira o tempo — ex.: 2:45:12","on":"🔔 Notificações ativadas neste celular.","turnOn":"🔔 Ativar notificações","test":"Enviar teste","testMsg":"As notificações funcionam! ✓","blocked":"As notificações estão bloqueadas. Permita-as para este site nas configurações do celular e volte.","ios":"No iPhone, adicione o site à Tela de Início primeiro: Compartilhar → “Adicionar à Tela de Início”, depois abra o NXS pelo novo ícone e volte aqui.","noPush":"Este navegador não mostra notificações. Use o Chrome (Android) ou o app da Tela de Início (iPhone).","local":"Os timers continuam nesta página, mas o celular só avisa com as notificações ativadas.","fail":"Não foi possível falar com o servidor de notificações. Seus timers estão salvos e serão sincronizados depois.","limitHold":"⚠️ A cota diária gratuita de armazenamento do servidor acabou (reinicia às 00:00 UTC). Seus timers estão salvos neste aparelho e sincronizam depois.","body":"terminou — confira o jogo!","name":"Nome","cats":{"gather":"Coleta","train":"Treino","build":"Construção","research":"Pesquisa","heal":"Cura","fountain":"Fonte da Vida","donate":"Tecnologia · Contribuição","order":"Ordem do Governador","other":"Outro","appt":"Nomeação","master":"Mestre","recruit":"Recrutar Heróis","pet":"Aventura do Pet","intel":"Missões de Informação","stamina":"Festa Gourmet"},"testWait":"Chega em 15 s — saia do app agora (Tela de Início) para ver o selo vermelho 🔴","quick":"⚡ Início rápido (seus últimos tempos)","quickHint":"Um toque inicia de novo com o mesmo tempo.","forget":"Esquecer este tempo","lastTime":"Última vez: {t} — é só tocar em Salvar ou digitar um novo tempo.","synced":"✓ Salvo no servidor: {n} notificações agendadas (verificado {t}).","sample":"enviar um exemplo agora","sent":"enviado ✓","needOn":"Ative as notificações acima primeiro — até lá estes alertas não chegam ao seu celular.","subQ":{"order":"Qual ordem?","gather":"Qual recurso?","train":"Quais tropas?","recruit":"Qual recrutamento?","appt":"Qual cargo?"},"advanced":"Avançado","epic":"Épico","minister":"Primeiro-ministro","advisor":"Conselheiro Nobre","apDay":"Dia (UTC)","apTime":"Seu horário (próximas 24 h, 30 min cada)","apRemind":"Me lembrar","apToday":"hoje","apStarts":"horário começa {t}","apTitle":"{e} {name} em {n} min","apNow":"{e} {name} — seu horário começa agora!","apBody":"Seu horário de 30 min começa às {t} UTC.","stack":{"minister":["Ativar Horário Dobrado","Auxiliar de construção (Lobo Cinza)","Iniciar as duas filas de construção em até 5 min"],"advisor":["Usar Gemas para aumentar a capacidade de treinamento","Iniciar o Treinamento (todos os tipos de tropa)"]},"btBody":"Toque para abrir a calculadora BT.","btLink":"🧮 Calculadora BT","clOn":"🔄 Sincronizado com o Discord ({name}) · {t}","clNow":"sincronizar agora","clOff":"🔄 Use seus timers em todos os aparelhos: entre com o Discord (oficiais).","clIn":"Entrar com Discord","cl_no_access":"Sua conta do Discord ainda não está na lista de oficiais.","cl_not_member":"Entre primeiro no servidor Discord da nossa aliança.","cl_logged_out":"Entre com o Discord novamente.","cl_cancelled":"O login do Discord foi cancelado.","cl_expired":"Entre com o Discord novamente.","cl_discord":"Não deu para sincronizar agora — vamos tentar de novo.","cl_discord_unreachable":"Não foi possível acessar o Discord — vamos tentar de novo.","cl_too_big":"Dados demais para sincronizar.","ibT":"🔔 Lembretes ({n})","ibClear":"✓ Limpar","ibAgo":"há {t}","stackT":"{e} {name} ativo — até {t} UTC","stackHint":"Acumule seus bônus:","stackBody":"Horário às {t} UTC. Depois: {list}.","naOn":"Bônus de Conselheiro Nobre ativo agora","naHint":"O Treinamento fica mais rápido com ele, então o tempo é salvo separado (liga sozinho durante seu horário de Conselheiro Nobre).","sgT":"💡 Garanta um {pos}","sgNow":"{what} termina {when}. Reserve o horário das {slot} UTC para o próximo começar com o bônus.","sgLater":"{what} termina {when} — daqui a mais de 24 h, então ainda não dá para reservar. A reserva abre {open}.","sgRemind":"＋ Me lembrar deste horário","sgBook":"＋ Me lembrar de reservar","sgNo":"Agora não","sgLink":"📅 horário","bookT":"📅 Reserve {name} agora","bookB":"Reserve o horário das {t} UTC — {what} termina nessa hora.","troop":"Quais tropas?","builder":"＋ Segundo construtor","alerts":"🎮 Lembretes do jogo","admin":"🛠️ Lembretes de admin","adminNote":"Tarefas dos oficiais da aba Eventos, enviadas no dia certo.","adminOn":"Enviar lembretes de admin","adminAt":"às {t} UTC","adminNone":"Abra uma vez a aba Eventos da página dos oficiais (neste mesmo app / navegador) para carregar as tarefas — elas atualizam toda vez que você abre.","adminEmpty":"Nenhuma tarefa de oficial nas próximas 3 semanas.","adminUpd":"tarefas carregadas {t}","adminBody":"Etapa de admin hoje — toque para abrir a checklist.","alertsNote":"Toque em um horário para ser avisado antes de começar.","before":"{n} min antes","next":"próximo alerta: {t}","atTime":"na hora","reset":"reset 00:00 UTC","arenaName":"Arena","journeyName":"Suprimentos da Jornada","cesaresName":"Fúria dos Césares","intelName":"Missões de Informação","refreshTitle":"{e} {name} atualiza em {n} min","refreshNow":"{e} {name} — novas missões!","refreshBody":"A Torre de Vigia atualiza às {t} UTC.","evTitle":"{e} {name} em {n} min","evNow":"{e} {name} — agora!","evBody":"Começa às {t} UTC.","resetTitle":"{e} {name} — reset diário em {n} min","resetNow":"{e} {name} — reset diário agora","resetBody":"Reseta às 00:00 UTC. Você usou hoje?","claimTitle":"{e} {name} em {n} min","claimNow":"{e} {name} — colete agora!","claimBody":"Coleta grátis às {t} UTC.","alertsSync":"Os alertas são planejados com 3 semanas de antecedência — abra o site de vez em quando para mantê-los."},
    es: {"ordReady":"vuelve a estar listo: ya puedes promulgarlo.","ordHint":"¿Recién promulgado? Ya puse el enfriamiento completo ({cd}). Si no, escribe el tiempo que muestra el juego.","fnTip":"La Esencia de Agua solo se acumula 12 h en cualquier nivel: reclámala antes. Desde el nv. 3 los aliados pueden ayudar cada 6 h (3 veces al día, reinicio 00:00 UTC).","fnFull":"está llena: reclama tu Esencia de Agua.","fnHint":"¿Recién reclamada? Ya puse 12 h. Si no, escribe cuánto falta para que se llene.","dnTip":"Recuperas 1 intento cada 10 min, hasta 25. De 0 a lleno tarda 4 h 10 min; después ya no se acumula más.","dnNow":"Intentos ahora (0–25)","dnFull":"vuelve a tener 25 intentos: ve a contribuir.","chip":"⏰ Poner un temporizador","title":"⏰ Mis temporizadores","chat":"‹ Chat","add":"＋ Poner un temporizador","what":"¿Qué es?","left":"Tiempo restante en el juego","hint":"ej. 2:45:12 · 2h45m · 45m","another":"＋ Otra marcha","save":"Guardar","cancel":"Cancelar","empty":"Aún no hay temporizadores.","done":"Listo ✓","at":"listo a las {t}","bad":"Revisa el tiempo — ej. 2:45:12","on":"🔔 Notificaciones activadas en este teléfono.","turnOn":"🔔 Activar notificaciones","test":"Enviar prueba","testMsg":"¡Las notificaciones funcionan! ✓","blocked":"Las notificaciones están bloqueadas. Permítelas para este sitio en los ajustes del teléfono y vuelve.","ios":"En iPhone, primero añade el sitio a la pantalla de inicio: Compartir → «Añadir a pantalla de inicio», luego abre NXS desde el nuevo icono y vuelve aquí.","noPush":"Este navegador no puede mostrar notificaciones. Usa Chrome (Android) o la app de la pantalla de inicio (iPhone).","local":"Los temporizadores siguen en esta página, pero el teléfono solo avisará con las notificaciones activadas.","fail":"No se pudo conectar con el servidor de notificaciones. Tus temporizadores están guardados y se sincronizarán luego.","limitHold":"⚠️ Se agotó la cuota diaria gratuita de almacenamiento del servidor (se reinicia a las 00:00 UTC). Tus temporizadores están guardados en este teléfono y se sincronizarán después.","body":"terminó — ¡revisa el juego!","name":"Nombre","cats":{"gather":"Recolección","train":"Entrenamiento","build":"Construcción","research":"Investigación","heal":"Curación","fountain":"Fuente de la Vida","donate":"Tecnología · Contribución","order":"Orden del Gobernador","other":"Otro","appt":"Designación","master":"Maestro","recruit":"Reclutar héroes","pet":"Aventura de Mascotas","intel":"Misiones de Inteligencia","stamina":"Festín Gourmet"},"testWait":"Llega en 15 s — sal de la app ahora (pantalla de inicio) para ver el globo rojo 🔴","quick":"⚡ Inicio rápido (tus últimos tiempos)","quickHint":"Un toque lo vuelve a iniciar con el mismo tiempo.","forget":"Olvidar este tiempo","lastTime":"Última vez: {t} — pulsa Guardar o escribe un tiempo nuevo.","synced":"✓ Guardado en el servidor: {n} notificaciones programadas (comprobado {t}).","sample":"enviar un ejemplo ahora","sent":"enviado ✓","needOn":"Activa primero las notificaciones arriba — hasta entonces estas alertas no llegarán a tu teléfono.","subQ":{"order":"¿Qué orden?","gather":"¿Qué recurso?","train":"¿Qué tropas?","recruit":"¿Qué reclutamiento?","appt":"¿Qué cargo?"},"advanced":"Avanzado","epic":"Épico","minister":"Ministro principal","advisor":"Noble asesor","apDay":"Día (UTC)","apTime":"Tu turno (próximas 24 h, 30 min cada uno)","apRemind":"Recordármelo","apToday":"hoy","apStarts":"el turno empieza {t}","apTitle":"{e} {name} en {n} min","apNow":"{e} {name} — ¡tu turno empieza ya!","apBody":"Tu turno de 30 min empieza a las {t} UTC.","stack":{"minister":["Activar Doble tiempo","Ayudante de construcción (Lobo gris)","Iniciar ambas colas de construcción en 5 min"],"advisor":["Usar Gemas para subir la capacidad de entrenamiento","Iniciar el Entrenamiento (todos los tipos de tropa)"]},"btBody":"Toca para abrir la calculadora BT.","btLink":"🧮 Calculadora BT","clOn":"🔄 Sincronizado con Discord ({name}) · {t}","clNow":"sincronizar ahora","clOff":"🔄 Usa tus temporizadores en todos tus dispositivos: inicia sesión con Discord (oficiales).","clIn":"Iniciar sesión con Discord","cl_no_access":"Tu cuenta de Discord aún no está en la lista de oficiales.","cl_not_member":"Primero únete al servidor de Discord de la alianza.","cl_logged_out":"Vuelve a iniciar sesión con Discord.","cl_cancelled":"Se canceló el inicio de sesión con Discord.","cl_expired":"Vuelve a iniciar sesión con Discord.","cl_discord":"No se pudo sincronizar ahora — se volverá a intentar.","cl_discord_unreachable":"No se pudo conectar con Discord — se volverá a intentar.","cl_too_big":"Demasiados datos para sincronizar.","ibT":"🔔 Recordatorios ({n})","ibClear":"✓ Borrar","ibAgo":"hace {t}","stackT":"{e} {name} activo — hasta las {t} UTC","stackHint":"Acumula tus bonificaciones:","stackBody":"Turno a las {t} UTC. Después: {list}.","naOn":"Bonificación de Noble asesor activa","naHint":"El Entrenamiento es más rápido con ella, así que el tiempo se guarda aparte (se activa sola durante tu turno de Noble asesor).","sgT":"💡 Reserva un {pos}","sgNow":"{what} termina {when}. Reserva el turno de las {slot} UTC para que el siguiente empiece con la bonificación.","sgLater":"{what} termina {when} — faltan más de 24 h, así que aún no se puede reservar. La reserva abre {open}.","sgRemind":"＋ Recordarme este turno","sgBook":"＋ Recordarme reservarlo","sgNo":"Ahora no","sgLink":"📅 turno","bookT":"📅 Reserva {name} ahora","bookB":"Reserva el turno de las {t} UTC — {what} termina a esa hora.","troop":"¿Qué tropas?","builder":"＋ Segundo constructor","alerts":"🎮 Recordatorios del juego","admin":"🛠️ Recordatorios de admin","adminNote":"Tareas de oficiales de la pestaña Evento, enviadas el día que tocan.","adminOn":"Enviar recordatorios de admin","adminAt":"a las {t} UTC","adminNone":"Abre una vez la pestaña Evento de la página de oficiales (en esta misma app / navegador) para cargar las tareas — se actualizan cada vez que la abres.","adminEmpty":"No hay tareas de oficiales en las próximas 3 semanas.","adminUpd":"tareas cargadas {t}","adminBody":"Paso de admin hoy — toca para abrir la lista.","alertsNote":"Toca una hora para recibir un aviso antes de que empiece.","before":"{n} min antes","next":"próxima alerta: {t}","atTime":"a la hora","reset":"reinicio 00:00 UTC","arenaName":"Arena","journeyName":"Suministros de Travesía","cesaresName":"Furia de los Cesares","intelName":"Misiones de Inteligencia","refreshTitle":"{e} {name} se actualiza en {n} min","refreshNow":"{e} {name} — ¡nuevas misiones!","refreshBody":"La Torre vigía se actualiza a las {t} UTC.","evTitle":"{e} {name} en {n} min","evNow":"{e} {name} — ¡ya!","evBody":"Empieza a las {t} UTC.","resetTitle":"{e} {name} — reinicio diario en {n} min","resetNow":"{e} {name} — reinicio diario ahora","resetBody":"Se reinicia a las 00:00 UTC. ¿Lo usaste hoy?","claimTitle":"{e} {name} en {n} min","claimNow":"{e} {name} — ¡reclama ya!","claimBody":"Reclamo gratis a las {t} UTC.","alertsSync":"Las alertas se planifican con 3 semanas de antelación — abre el sitio de vez en cuando para mantenerlas."},
    tr: {"ordReady":"yeniden hazır — tekrar uygulayabilirsin.","ordHint":"Yeni mi uyguladın? Tam bekleme süresi ({cd}) girildi. Değilse oyundaki süreyi yaz.","fnTip":"Su Özü her seviyede yalnızca 12 saat birikir — ondan önce al. Sv. 3'ten itibaren müttefikler 6 saatte bir yardım edebilir (günde 3 kez, 00:00 UTC'de sıfırlanır).","fnFull":"doldu — Su Özünü al.","fnHint":"Yeni mi aldın? 12 saat girildi. Değilse dolmasına kalan süreyi yaz.","dnTip":"Her 10 dakikada 1 deneme geri gelir, en fazla 25. 0'dan dolması 4 sa 10 dk sürer — dolunca artık birikmez.","dnNow":"Şu anki deneme (0–25)","dnFull":"yeniden 25 denemede — katkı yapmaya git.","chip":"⏰ Zamanlayıcı kur","title":"⏰ Zamanlayıcılarım","chat":"‹ Sohbet","add":"＋ Zamanlayıcı kur","what":"Ne için?","left":"Oyunda kalan süre","hint":"ör. 2:45:12 · 2h45m · 45m","another":"＋ Başka bir sefer","save":"Kaydet","cancel":"İptal","empty":"Henüz zamanlayıcı yok.","done":"Bitti ✓","at":"{t} bitiyor","bad":"Süreyi kontrol et — ör. 2:45:12","on":"🔔 Bu telefonda bildirimler açık.","turnOn":"🔔 Bildirimleri aç","test":"Test gönder","testMsg":"Bildirimler çalışıyor! ✓","blocked":"Bildirimler engellenmiş. Telefon ayarlarından bu siteye izin ver, sonra geri gel.","ios":"iPhone'da önce siteyi Ana Ekrana ekle: Paylaş → “Ana Ekrana Ekle”, sonra yeni NXS simgesinden aç ve buraya dön.","noPush":"Bu tarayıcı bildirim gösteremiyor. Chrome (Android) veya Ana Ekran uygulamasını (iPhone) kullan.","local":"Zamanlayıcılar bu sayfada çalışır ama bildirimler açık olmadan telefonun haber vermez.","fail":"Bildirim sunucusuna ulaşılamadı. Zamanlayıcıların kaydedildi, sonra eşitlenecek.","limitHold":"⚠️ Sunucunun ücretsiz günlük depolama kotası doldu (00:00 UTC'de sıfırlanır). Zamanlayıcıların bu telefonda kayıtlı, sonra eşitlenecek.","body":"bitti — oyuna bak!","name":"Ad","cats":{"gather":"Toplama","train":"Eğitim","build":"İnşaat","research":"Araştırma","heal":"İyileştirme","fountain":"Yaşam Pınarı","donate":"Teknoloji · Katkı Yap","order":"Vali Kararı","other":"Diğer","appt":"Atama","master":"Usta","recruit":"Kahraman Görevlendir","pet":"Evcil Hayvan Macerası","intel":"Bilgi Görevleri","stamina":"Gurme Ziyafeti"},"testWait":"15 sn içinde geliyor — kırmızı rozeti görmek için şimdi uygulamadan çık (Ana Ekran) 🔴","quick":"⚡ Hızlı başlat (son sürelerin)","quickHint":"Tek dokunuşla aynı süreyle yeniden başlar.","forget":"Bu süreyi unut","lastTime":"Son süre: {t} — Kaydet'e bas ya da yeni süre yaz.","synced":"✓ Sunucuya kaydedildi: {n} bildirim planlandı (kontrol: {t}).","sample":"şimdi örnek gönder","sent":"gönderildi ✓","needOn":"Önce yukarıdan bildirimleri aç — o zamana kadar bu uyarılar telefonuna ulaşamaz.","subQ":{"order":"Hangi karar?","gather":"Hangi kaynak?","train":"Hangi birlikler?","recruit":"Hangi alım?","appt":"Hangi pozisyon?"},"advanced":"Gelişmiş","epic":"Epik","minister":"Başbakan","advisor":"Asil Danışman","apDay":"Gün (UTC)","apTime":"Senin dilimin (önümüzdeki 24 sa, her biri 30 dk)","apRemind":"Bana hatırlat","apToday":"bugün","apStarts":"dilim {t} başlıyor","apTitle":"{e} {name} {n} dk sonra","apNow":"{e} {name} — dilimin şimdi başlıyor!","apBody":"30 dakikalık dilimin {t} UTC'de başlıyor.","stack":{"minister":["Çifte Mesai'yi etkinleştir","İnşaat Yardımcısı (Gri Kurt)","İki inşaat sırasını da 5 dk içinde başlat"],"advisor":["Birlik eğitim kapasitesini Elmas ile artır","Eğitimi başlat (tüm birlik türleri)"]},"btBody":"BT hesaplayıcısını açmak için dokun.","btLink":"🧮 BT hesaplayıcı","clOn":"🔄 Discord ile senkronize ({name}) · {t}","clNow":"şimdi senkronize et","clOff":"🔄 Zamanlayıcılarını tüm cihazlarında kullan: Discord ile giriş yap (yetkililer).","clIn":"Discord ile giriş yap","cl_no_access":"Discord hesabın henüz yetkili listesinde değil.","cl_not_member":"Önce ittifakımızın Discord sunucusuna katıl.","cl_logged_out":"Lütfen Discord ile tekrar giriş yap.","cl_cancelled":"Discord girişi iptal edildi.","cl_expired":"Lütfen Discord ile tekrar giriş yap.","cl_discord":"Şu an senkronize edilemedi — tekrar denenecek.","cl_discord_unreachable":"Discord'a ulaşılamadı — tekrar denenecek.","cl_too_big":"Senkronize edilecek çok fazla veri var.","ibT":"🔔 Hatırlatıcılar ({n})","ibClear":"✓ Temizle","ibAgo":"{t} önce","stackT":"{e} {name} aktif — {t} UTC'ye kadar","stackHint":"Bonuslarını birleştir:","stackBody":"Dilim {t} UTC'de. Sonra: {list}.","naOn":"Asil Danışman bonusu şu an aktif","naHint":"Bu bonusla eğitim daha hızlı, bu yüzden süre ayrı kaydedilir (Asil Danışman diliminde kendiliğinden açılır).","sgT":"💡 {pos} ayarla","sgNow":"{what} {when} bitiyor. Sonrakinin bonusla başlaması için {slot} UTC dilimini ayır.","sgLater":"{what} {when} bitiyor — 24 saatten uzun, henüz rezervasyon yapamazsın. Rezervasyon {open} açılır.","sgRemind":"＋ Bu dilimi bana hatırlat","sgBook":"＋ Rezervasyonu bana hatırlat","sgNo":"Şimdi değil","sgLink":"📅 dilim","bookT":"📅 {name} rezervasyonunu şimdi yap","bookB":"{t} UTC dilimini ayır — {what} o zaman bitiyor.","troop":"Hangi birlikler?","builder":"＋ İkinci inşaatçı","alerts":"🎮 Oyun hatırlatıcıları","admin":"🛠️ Yönetici hatırlatıcıları","adminNote":"Etkinlikler sekmesindeki yetkili görevleri, günü geldiğinde gönderilir.","adminOn":"Yönetici hatırlatıcılarını gönder","adminAt":"{t} UTC'de","adminNone":"Görevleri yüklemek için yetkili sayfasının Etkinlikler sekmesini bir kez aç (aynı uygulama / tarayıcıda) — her açtığında yenilenir.","adminEmpty":"Önümüzdeki 3 haftada yetkili görevi yok.","adminUpd":"görevler yüklendi {t}","adminBody":"Bugün yönetici adımı var — listeyi açmak için dokun.","alertsNote":"Başlamadan önce bildirim almak için bir saate dokun.","before":"{n} dk önce","next":"sonraki uyarı: {t}","atTime":"tam saatinde","reset":"00:00 UTC sıfırlama","arenaName":"Arena","journeyName":"Yolculuk Malzemeleri","cesaresName":"Cesares Öfkesi","intelName":"Bilgi Görevleri","refreshTitle":"{e} {name} {n} dk sonra yenileniyor","refreshNow":"{e} {name} — yeni görevler geldi!","refreshBody":"Bekçi Kulesi {t} UTC'de yenilenir.","evTitle":"{e} {name} {n} dk sonra","evNow":"{e} {name} — şimdi!","evBody":"{t} UTC'de başlıyor.","resetTitle":"{e} {name} — günlük sıfırlamaya {n} dk","resetNow":"{e} {name} — günlük sıfırlama şimdi","resetBody":"00:00 UTC'de sıfırlanır. Bugün kullandın mı?","claimTitle":"{e} {name} {n} dk sonra","claimNow":"{e} {name} — şimdi topla!","claimBody":"{t} UTC'de ücretsiz toplama.","alertsSync":"Uyarılar 3 hafta önceden planlanır — devam etmeleri için siteyi arada bir aç."},
    id: {"ordReady":"siap lagi — kamu bisa mengeluarkannya.","ordHint":"Baru dikeluarkan? Cooldown penuh ({cd}) sudah diisi. Kalau tidak, ketik waktu yang tampil di game.","fnTip":"Esensi Air hanya terkumpul 12 jam di level berapa pun — klaim sebelum itu. Mulai Lv. 3 sekutu bisa membantu tiap 6 jam (3 kali sehari, reset 00:00 UTC).","fnFull":"sudah penuh — klaim Esensi Air.","fnHint":"Baru diklaim? 12 jam sudah diisi. Kalau tidak, ketik sisa waktu sampai penuh.","dnTip":"Setiap 10 menit pulih 1 upaya, maksimal 25. Dari 0 sampai penuh butuh 4 jam 10 menit — setelah penuh tidak bertambah lagi.","dnNow":"Upaya sekarang (0–25)","dnFull":"sudah kembali 25 upaya — ayo kontribusi.","chip":"⏰ Pasang timer","title":"⏰ Timer saya","chat":"‹ Obrolan","add":"＋ Pasang timer","what":"Untuk apa?","left":"Sisa waktu di game","hint":"mis. 2:45:12 · 2h45m · 45m","another":"＋ Pasukan lain","save":"Simpan","cancel":"Batal","empty":"Belum ada timer.","done":"Selesai ✓","at":"selesai {t}","bad":"Cek waktunya — mis. 2:45:12","on":"🔔 Notifikasi aktif di HP ini.","turnOn":"🔔 Aktifkan notifikasi","test":"Kirim tes","testMsg":"Notifikasi berfungsi! ✓","blocked":"Notifikasi diblokir. Izinkan untuk situs ini di pengaturan HP, lalu kembali.","ios":"Di iPhone, tambahkan situs ke Layar Utama dulu: Bagikan → “Tambah ke Layar Utama”, lalu buka NXS dari ikon baru dan kembali ke sini.","noPush":"Browser ini tidak bisa menampilkan notifikasi. Pakai Chrome (Android) atau aplikasi di Layar Utama (iPhone).","local":"Timer tetap jalan di halaman ini, tapi HP baru memberi tahu kalau notifikasi aktif.","fail":"Tidak bisa terhubung ke server notifikasi. Timer sudah tersimpan dan akan disinkronkan nanti.","limitHold":"⚠️ Kuota penyimpanan harian gratis server sudah habis (reset 00:00 UTC). Timer tersimpan di ponsel ini dan akan disinkronkan setelah reset.","body":"selesai — cek game-nya!","name":"Nama","cats":{"gather":"Mengumpulkan","train":"Pelatihan","build":"Konstruksi","research":"Riset","heal":"Penyembuhan","fountain":"Air Mancur Kehidupan","donate":"Teknologi · Kontribusi","order":"Perintah Gubernur","other":"Lainnya","appt":"Pertemuan","master":"Master","recruit":"Rekrut Hero","pet":"Petualangan Hewan Peliharaan","intel":"Misi Intel","stamina":"Pesta Hidangan"},"testWait":"Datang dalam 15 dtk — keluar dari aplikasi sekarang (Layar Utama) untuk melihat lencana merah 🔴","quick":"⚡ Mulai cepat (waktu terakhirmu)","quickHint":"Sekali ketuk untuk memulai lagi dengan waktu yang sama.","forget":"Lupakan waktu ini","lastTime":"Terakhir: {t} — cukup tekan Simpan, atau ketik waktu baru.","synced":"✓ Tersimpan di server: {n} notifikasi terjadwal (dicek {t}).","sample":"kirim contoh sekarang","sent":"terkirim ✓","needOn":"Aktifkan notifikasi di atas dulu — sebelum itu, peringatan ini tidak bisa sampai ke ponselmu.","subQ":{"order":"Perintah apa?","gather":"Sumber daya apa?","train":"Pasukan apa?","recruit":"Rekrut yang mana?","appt":"Jabatan apa?"},"advanced":"Lanjutan","epic":"Epik","minister":"Perdana Menteri","advisor":"Penasihat Kerajaan","apDay":"Hari (UTC)","apTime":"Slotmu (24 jam ke depan, masing-masing 30 mnt)","apRemind":"Ingatkan aku","apToday":"hari ini","apStarts":"slot mulai {t}","apTitle":"{e} {name} dalam {n} mnt","apNow":"{e} {name} — slotmu mulai sekarang!","apBody":"Slot 30 menitmu mulai pukul {t} UTC.","stack":{"minister":["Aktifkan Double Time","Construction Aide (Gray Wolf)","Mulai kedua antrean bangunan dalam 5 mnt"],"advisor":["Pakai Permata untuk menaikkan kapasitas pelatihan pasukan","Mulai pelatihan (semua jenis pasukan)"]},"btBody":"Ketuk untuk membuka kalkulator BT.","btLink":"🧮 Kalkulator BT","clOn":"🔄 Tersinkron dengan Discord ({name}) · {t}","clNow":"sinkronkan sekarang","clOff":"🔄 Pakai timer di semua perangkatmu: masuk dengan Discord (officer).","clIn":"Masuk dengan Discord","cl_no_access":"Akun Discord-mu belum ada di daftar officer.","cl_not_member":"Gabung dulu ke server Discord aliansi kami.","cl_logged_out":"Silakan masuk lagi dengan Discord.","cl_cancelled":"Login Discord dibatalkan.","cl_expired":"Silakan masuk lagi dengan Discord.","cl_discord":"Tidak bisa sinkron sekarang — akan dicoba lagi.","cl_discord_unreachable":"Tidak bisa terhubung ke Discord — akan dicoba lagi.","cl_too_big":"Data terlalu banyak untuk disinkronkan.","ibT":"🔔 Pengingat ({n})","ibClear":"✓ Hapus","ibAgo":"{t} lalu","stackT":"{e} {name} aktif — sampai {t} UTC","stackHint":"Tumpuk buff-mu:","stackBody":"Slot pukul {t} UTC. Lalu: {list}.","naOn":"Buff Penasihat Kerajaan sedang aktif","naHint":"Pelatihan lebih cepat dengan buff ini, jadi waktunya disimpan terpisah (aktif otomatis saat slot Penasihat Kerajaan-mu).","sgT":"💡 Siapkan {pos}","sgNow":"{what} selesai {when}. Pesan slot {slot} UTC agar yang berikutnya mulai dengan buff.","sgLater":"{what} selesai {when} — lebih dari 24 jam lagi, jadi belum bisa dipesan. Pemesanan dibuka {open}.","sgRemind":"＋ Ingatkan aku slot ini","sgBook":"＋ Ingatkan aku untuk memesan","sgNo":"Nanti saja","sgLink":"📅 slot","bookT":"📅 Pesan {name} sekarang","bookB":"Pesan slot {t} UTC — {what} selesai saat itu.","troop":"Pasukan apa?","builder":"＋ Pembangun kedua","alerts":"🎮 Pengingat game","admin":"🛠️ Pengingat admin","adminNote":"Tugas officer dari tab Event, dikirim pada hari jatuh temponya.","adminOn":"Kirim pengingat admin","adminAt":"pukul {t} UTC","adminNone":"Buka tab Event di halaman officer sekali (di aplikasi / browser yang sama) untuk memuat tugas — akan diperbarui setiap kali kamu membukanya.","adminEmpty":"Tidak ada tugas officer dalam 3 minggu ke depan.","adminUpd":"tugas dimuat {t}","adminBody":"Ada langkah admin hari ini — ketuk untuk membuka daftar periksa.","alertsNote":"Ketuk sebuah waktu untuk dapat notifikasi sebelum dimulai.","before":"{n} mnt sebelumnya","next":"peringatan berikutnya: {t}","atTime":"tepat waktu","reset":"Reset 00:00 UTC","arenaName":"Arena","journeyName":"Perbekalan Perjalanan","cesaresName":"Cesares Fury","intelName":"Misi Intel","refreshTitle":"{e} {name} diperbarui dalam {n} mnt","refreshNow":"{e} {name} — misi baru sekarang!","refreshBody":"Mercusuar diperbarui pukul {t} UTC.","evTitle":"{e} {name} dalam {n} mnt","evNow":"{e} {name} — sekarang!","evBody":"Mulai pukul {t} UTC.","resetTitle":"{e} {name} — reset harian dalam {n} mnt","resetNow":"{e} {name} — reset harian sekarang","resetBody":"Reset pukul 00:00 UTC. Sudah dipakai hari ini?","claimTitle":"{e} {name} dalam {n} mnt","claimNow":"{e} {name} — klaim sekarang!","claimBody":"Klaim gratis pukul {t} UTC.","alertsSync":"Peringatan dijadwalkan 3 minggu ke depan — buka situs sesekali agar tetap berjalan."},
    ru: {"ordReady":"снова готов — можно издать.","ordHint":"Только что издали? Полная перезарядка ({cd}) уже вписана. Иначе введите время из игры.","fnTip":"Водная эссенция копится только 12 ч на любом уровне — заберите её раньше. С 3-го уровня союзники могут помогать раз в 6 ч (3 раза в день, сброс в 00:00 UTC).","fnFull":"заполнен — заберите водную эссенцию.","fnHint":"Только что забрали? Вписано 12 ч. Иначе введите, сколько осталось до заполнения.","dnTip":"Каждые 10 мин восстанавливается 1 попытка, максимум 25. От 0 до максимума — 4 ч 10 мин; дальше уже не копится.","dnNow":"Попыток сейчас (0–25)","dnFull":"снова 25 попыток — пора делать взнос.","chip":"⏰ Поставить таймер","title":"⏰ Мои таймеры","chat":"‹ Чат","add":"＋ Поставить таймер","what":"Что это?","left":"Сколько осталось в игре","hint":"напр. 2:45:12 · 2h45m · 45m","another":"＋ Ещё отряд","save":"Сохранить","cancel":"Отмена","empty":"Таймеров пока нет.","done":"Готово ✓","at":"готово в {t}","bad":"Проверьте время — напр. 2:45:12","on":"🔔 Уведомления на этом телефоне включены.","turnOn":"🔔 Включить уведомления","test":"Отправить тест","testMsg":"Уведомления работают! ✓","blocked":"Уведомления заблокированы. Разрешите их для этого сайта в настройках телефона и вернитесь.","ios":"На iPhone сначала добавьте сайт на экран «Домой»: Поделиться → «На экран „Домой“», затем откройте NXS с новой иконки и вернитесь сюда.","noPush":"Этот браузер не умеет показывать уведомления. Используйте Chrome (Android) или приложение с экрана «Домой» (iPhone).","local":"Таймеры идут на этой странице, но телефон напомнит, только если уведомления включены.","fail":"Сервер уведомлений недоступен. Таймеры сохранены и синхронизируются позже.","limitHold":"⚠️ Бесплатный дневной лимит хранения на сервере исчерпан (сброс в 00:00 UTC). Таймеры сохранены на этом телефоне и синхронизируются позже.","body":"готово — загляните в игру!","name":"Название","cats":{"gather":"Сбор","train":"Обучение","build":"Строительство","research":"Исследование","heal":"Лечение","fountain":"Фонтан жизни","donate":"Технологии · Сделать взнос","order":"Приказ губернатора","other":"Другое","appt":"Назначение","master":"Мастер","recruit":"Найм героев","pet":"Приключение питомца","intel":"Разведывательные миссии","stamina":"Гурманский пир"},"testWait":"Придёт через 15 с — выйдите из приложения (на главный экран), чтобы увидеть красный значок 🔴","quick":"⚡ Быстрый старт (ваши прошлые времена)","quickHint":"Одно касание — и таймер снова запущен с тем же временем.","forget":"Забыть это время","lastTime":"В прошлый раз: {t} — просто нажмите «Сохранить» или введите новое время.","synced":"✓ Сохранено на сервере: запланировано уведомлений: {n} (проверено {t}).","sample":"отправить пример","sent":"отправлено ✓","needOn":"Сначала включите уведомления выше — до этого оповещения не дойдут до телефона.","subQ":{"order":"Какой приказ?","gather":"Какой ресурс?","train":"Какие войска?","recruit":"Какой найм?","appt":"Какая должность?"},"advanced":"Продвинутый найм","epic":"Великий найм","minister":"Премьер-министр","advisor":"Советник","apDay":"День (UTC)","apTime":"Ваш слот (ближайшие 24 ч, по 30 мин)","apRemind":"Напомнить","apToday":"сегодня","apStarts":"слот начинается в {t}","apTitle":"{e} {name} через {n} мин","apNow":"{e} {name} — ваш слот начинается!","apBody":"Ваш 30-минутный слот начинается в {t} UTC.","stack":{"minister":["Активируйте «Плата за сверхурочные»","Помощь строителю (Волк)","Запустите обе очереди строительства в течение 5 мин"],"advisor":["Увеличьте вместимость тренировки войск за алмазы","Начните тренировку (все типы войск)"]},"btBody":"Нажмите, чтобы открыть калькулятор BT.","btLink":"🧮 Калькулятор BT","clOn":"🔄 Синхронизировано с Discord ({name}) · {t}","clNow":"синхронизировать","clOff":"🔄 Таймеры на всех ваших устройствах: войдите через Discord (офицеры).","clIn":"Войти через Discord","cl_no_access":"Вашего аккаунта Discord ещё нет в списке офицеров.","cl_not_member":"Сначала вступите в Discord-сервер нашего альянса.","cl_logged_out":"Войдите через Discord снова.","cl_cancelled":"Вход через Discord отменён.","cl_expired":"Войдите через Discord снова.","cl_discord":"Не удалось синхронизировать — попробуем позже.","cl_discord_unreachable":"Discord недоступен — попробуем позже.","cl_too_big":"Слишком много данных для синхронизации.","ibT":"🔔 Напоминания ({n})","ibClear":"✓ Очистить","ibAgo":"{t} назад","stackT":"{e} {name} активен — до {t} UTC","stackHint":"Совместите баффы:","stackBody":"Слот в {t} UTC. Затем: {list}.","naOn":"Бафф Советника сейчас активен","naHint":"С ним тренировка быстрее, поэтому время запоминается отдельно (включается само во время вашего слота Советника).","sgT":"💡 Займите слот: {pos}","sgNow":"{what} завершится {when}. Забронируйте слот {slot} UTC, чтобы следующее началось с баффом.","sgLater":"{what} завершится {when} — это больше чем через 24 ч, бронь пока недоступна. Бронирование откроется {open}.","sgRemind":"＋ Напомнить об этом слоте","sgBook":"＋ Напомнить забронировать","sgNo":"Не сейчас","sgLink":"📅 слот","bookT":"📅 Забронируйте {name} сейчас","bookB":"Забронируйте слот {t} UTC — тогда завершится {what}.","troop":"Какие войска?","builder":"＋ Второй строитель","alerts":"🎮 Игровые напоминания","admin":"🛠️ Напоминания для админов","adminNote":"Задачи офицеров со вкладки «События», приходят в день срока.","adminOn":"Отправлять напоминания для админов","adminAt":"в {t} UTC","adminNone":"Откройте один раз вкладку «События» на странице офицеров (в этом же приложении / браузере), чтобы загрузить задачи — они обновляются при каждом открытии.","adminEmpty":"Нет задач офицеров на ближайшие 3 недели.","adminUpd":"задачи загружены {t}","adminBody":"Сегодня шаг для админов — нажмите, чтобы открыть чек-лист.","alertsNote":"Нажмите на время, чтобы получить уведомление до начала.","before":"за {n} мин","next":"следующее оповещение: {t}","atTime":"в момент начала","reset":"Сброс в 00:00 UTC","arenaName":"Арена","journeyName":"Припасы путешествия","cesaresName":"Ярость цесарцев","intelName":"Разведывательные миссии","refreshTitle":"{e} {name}: обновление через {n} мин","refreshNow":"{e} {name} — новые миссии!","refreshBody":"Дозорная вышка обновляется в {t} UTC.","evTitle":"{e} {name} через {n} мин","evNow":"{e} {name} — сейчас!","evBody":"Начало в {t} UTC.","resetTitle":"{e} {name} — ежедневный сброс через {n} мин","resetNow":"{e} {name} — ежедневный сброс","resetBody":"Сброс в 00:00 UTC. Вы уже использовали сегодня?","claimTitle":"{e} {name} через {n} мин","claimNow":"{e} {name} — заберите сейчас!","claimBody":"Бесплатная награда в {t} UTC.","alertsSync":"Оповещения планируются на 3 недели вперёд — заходите на сайт время от времени, чтобы они продолжались."},
    th: {"ordReady":"พร้อมใช้อีกครั้ง — ประกาศได้แล้ว","ordHint":"เพิ่งประกาศใช่ไหม? ใส่เวลาคูลดาวน์เต็ม ({cd}) ให้แล้ว ถ้าไม่ใช่ ให้พิมพ์เวลาที่เกมแสดง","fnTip":"แก่นน้ำเก็บได้แค่ 12 ชม. ทุกเลเวล — รับก่อนเต็ม ตั้งแต่เลเวล 3 พันธมิตรช่วยได้ทุก 6 ชม. (วันละ 3 ครั้ง รีเซ็ต 00:00 UTC)","fnFull":"เต็มแล้ว — รับแก่นน้ำได้เลย","fnHint":"เพิ่งรับใช่ไหม? ใส่ 12 ชม. ให้แล้ว ถ้าไม่ใช่ ให้พิมพ์เวลาที่เหลือจนเต็ม","dnTip":"ฟื้นฟู 1 ครั้งทุก 10 นาที สูงสุด 25 ครั้ง จาก 0 ถึงเต็มใช้ 4 ชม. 10 นาที — เต็มแล้วจะไม่เพิ่มอีก","dnNow":"จำนวนครั้งตอนนี้ (0–25)","dnFull":"กลับมาครบ 25 ครั้งแล้ว — ไปบริจาคได้เลย","chip":"⏰ ตั้งเวลา","title":"⏰ ตัวจับเวลาของฉัน","chat":"‹ แชต","add":"＋ ตั้งเวลา","what":"จับเวลาอะไร?","left":"เวลาที่เหลือในเกม","hint":"เช่น 2:45:12 · 2h45m · 45m","another":"＋ เพิ่มอีกกองทัพ","save":"บันทึก","cancel":"ยกเลิก","empty":"ยังไม่มีตัวจับเวลา","done":"เสร็จแล้ว ✓","at":"เสร็จ {t}","bad":"ตรวจเวลาอีกครั้ง — เช่น 2:45:12","on":"🔔 เปิดการแจ้งเตือนบนมือถือนี้แล้ว","turnOn":"🔔 เปิดการแจ้งเตือน","test":"ส่งทดสอบ","testMsg":"การแจ้งเตือนใช้ได้แล้ว! ✓","blocked":"การแจ้งเตือนถูกบล็อก อนุญาตให้เว็บนี้ในการตั้งค่ามือถือ แล้วกลับมาที่นี่","ios":"บน iPhone ให้เพิ่มเว็บไปที่หน้าจอโฮมก่อน: แชร์ → “เพิ่มไปยังหน้าจอโฮม” แล้วเปิด NXS จากไอคอนใหม่ และกลับมาที่นี่","noPush":"เบราว์เซอร์นี้แสดงการแจ้งเตือนไม่ได้ ลองใช้ Chrome (Android) หรือแอปบนหน้าจอโฮม (iPhone)","local":"ตัวจับเวลายังนับในหน้านี้ แต่มือถือจะเตือนก็ต่อเมื่อเปิดการแจ้งเตือน","fail":"ติดต่อเซิร์ฟเวอร์แจ้งเตือนไม่ได้ ตัวจับเวลาบันทึกไว้แล้ว จะซิงก์ครั้งหน้า","limitHold":"⚠️ โควตาพื้นที่เก็บข้อมูลฟรีรายวันของเซิร์ฟเวอร์หมดแล้ว (รีเซ็ต 00:00 UTC) ตัวจับเวลาถูกบันทึกไว้ในเครื่องนี้และจะซิงก์หลังรีเซ็ต","body":"เสร็จแล้ว — ไปดูในเกมเลย!","name":"ชื่อ","cats":{"gather":"เก็บทรัพยากร","train":"ฝึกทหาร","build":"ก่อสร้าง","research":"วิจัย","heal":"รักษา","fountain":"น้ำพุแห่งชีวิต","donate":"เทคโนโลยี · อนุเคราะห์","order":"คำสั่งเจ้าเมือง","other":"อื่น ๆ","appt":"การแต่งตั้ง","master":"มาสเตอร์","recruit":"เกณฑ์ฮีโร่","pet":"การผจญภัยสัตว์เลี้ยง","intel":"ภารกิจข่าวกรอง","stamina":"งานเลี้ยงอาหารโอชะ"},"testWait":"จะมาใน 15 วิ — ออกจากแอปตอนนี้ (ไปหน้าโฮม) เพื่อดูป้ายสีแดง 🔴","quick":"⚡ เริ่มด่วน (เวลาล่าสุดของคุณ)","quickHint":"แตะครั้งเดียวเพื่อเริ่มใหม่ด้วยเวลาเดิม","forget":"ลืมเวลานี้","lastTime":"ครั้งล่าสุด: {t} — กดบันทึกได้เลย หรือพิมพ์เวลาใหม่","synced":"✓ บันทึกบนเซิร์ฟเวอร์แล้ว: ตั้งเวลาแจ้งเตือน {n} รายการ (ตรวจเมื่อ {t})","sample":"ส่งตัวอย่างตอนนี้","sent":"ส่งแล้ว ✓","needOn":"เปิดการแจ้งเตือนด้านบนก่อน — ไม่งั้นการแจ้งเตือนเหล่านี้จะส่งถึงมือถือไม่ได้","subQ":{"order":"คำสั่งไหน?","gather":"ทรัพยากรอะไร?","train":"ทหารประเภทไหน?","recruit":"เกณฑ์แบบไหน?","appt":"ตำแหน่งไหน?"},"advanced":"ขั้นสูง","epic":"มหากาพย์","minister":"อัครเสนาบดี","advisor":"ขุนนางที่ปรึกษา","apDay":"วัน (UTC)","apTime":"ช่วงเวลาของคุณ (24 ชม. ถัดไป ช่วงละ 30 นาที)","apRemind":"เตือนฉัน","apToday":"วันนี้","apStarts":"ช่วงเวลาเริ่ม {t}","apTitle":"{e} {name} ในอีก {n} นาที","apNow":"{e} {name} — ช่วงเวลาของคุณเริ่มแล้ว!","apBody":"ช่วงเวลา 30 นาทีของคุณเริ่ม {t} UTC","stack":{"minister":["เปิดใช้เร่งก่อสร้าง","ตัวช่วยก่อสร้าง (หมาป่าสีเทา)","เริ่มคิวก่อสร้างทั้งสองภายใน 5 นาที"],"advisor":["ใช้เพชรเพิ่มความจุการฝึกทหาร","เริ่มการฝึก (ทหารทุกประเภท)"]},"btBody":"แตะเพื่อเปิดเครื่องคำนวณ BT","btLink":"🧮 เครื่องคำนวณ BT","clOn":"🔄 ซิงค์กับ Discord แล้ว ({name}) · {t}","clNow":"ซิงค์ตอนนี้","clOff":"🔄 ใช้ตัวจับเวลาบนทุกอุปกรณ์: เข้าสู่ระบบด้วย Discord (เจ้าหน้าที่)","clIn":"เข้าสู่ระบบด้วย Discord","cl_no_access":"บัญชี Discord ของคุณยังไม่อยู่ในรายชื่อเจ้าหน้าที่","cl_not_member":"เข้าร่วมเซิร์ฟเวอร์ Discord ของพันธมิตรก่อน","cl_logged_out":"โปรดเข้าสู่ระบบด้วย Discord อีกครั้ง","cl_cancelled":"ยกเลิกการเข้าสู่ระบบ Discord แล้ว","cl_expired":"โปรดเข้าสู่ระบบด้วย Discord อีกครั้ง","cl_discord":"ซิงค์ไม่ได้ตอนนี้ — จะลองใหม่","cl_discord_unreachable":"เชื่อมต่อ Discord ไม่ได้ — จะลองใหม่","cl_too_big":"ข้อมูลมากเกินกว่าจะซิงค์","ibT":"🔔 การแจ้งเตือน ({n})","ibClear":"✓ ล้าง","ibAgo":"{t} ที่แล้ว","stackT":"{e} {name} เปิดอยู่ — ถึง {t} UTC","stackHint":"ซ้อนบัฟของคุณ:","stackBody":"ช่วงเวลา {t} UTC จากนั้น: {list}","naOn":"บัฟขุนนางที่ปรึกษาเปิดอยู่ตอนนี้","naHint":"การฝึกเร็วขึ้นเมื่อมีบัฟ จึงจำเวลาแยกไว้ (เปิดเองระหว่างช่วงเวลาขุนนางที่ปรึกษาของคุณ)","sgT":"💡 จอง{pos}ไว้","sgNow":"{what} เสร็จ {when} จองช่วง {slot} UTC เพื่อให้รอบถัดไปเริ่มพร้อมบัฟ","sgLater":"{what} เสร็จ {when} — เกิน 24 ชม. จึงยังจองไม่ได้ เปิดจอง {open}","sgRemind":"＋ เตือนช่วงเวลานี้","sgBook":"＋ เตือนให้จอง","sgNo":"ไว้ทีหลัง","sgLink":"📅 ช่วงเวลา","bookT":"📅 จอง{name}ตอนนี้","bookB":"จองช่วง {t} UTC — {what} จะเสร็จตอนนั้น","troop":"ทหารประเภทไหน?","builder":"＋ ช่างก่อสร้างคนที่สอง","alerts":"🎮 การแจ้งเตือนในเกม","admin":"🛠️ การแจ้งเตือนแอดมิน","adminNote":"งานของเจ้าหน้าที่จากแท็บกิจกรรม ส่งในวันที่ถึงกำหนด","adminOn":"ส่งการแจ้งเตือนแอดมิน","adminAt":"เวลา {t} UTC","adminNone":"เปิดแท็บกิจกรรมในหน้าเจ้าหน้าที่หนึ่งครั้ง (ในแอป/เบราว์เซอร์เดียวกันนี้) เพื่อโหลดงาน — จะรีเฟรชทุกครั้งที่เปิด","adminEmpty":"ไม่มีงานของเจ้าหน้าที่ใน 3 สัปดาห์ข้างหน้า","adminUpd":"โหลดงานเมื่อ {t}","adminBody":"มีขั้นตอนแอดมินวันนี้ — แตะเพื่อเปิดเช็กลิสต์","alertsNote":"แตะเวลาเพื่อรับการแจ้งเตือนก่อนเริ่ม","before":"ก่อน {n} นาที","next":"แจ้งเตือนถัดไป: {t}","atTime":"ตรงเวลา","reset":"รีเซ็ต 00:00 UTC","arenaName":"อารีน่า","journeyName":"เสบียงการเดินทาง","cesaresName":"โทสะของซีซาเรส","intelName":"ภารกิจข่าวกรอง","refreshTitle":"{e} {name} รีเฟรชในอีก {n} นาที","refreshNow":"{e} {name} — ภารกิจใหม่มาแล้ว!","refreshBody":"หอคอยเฝ้าระวังรีเฟรชเวลา {t} UTC","evTitle":"{e} {name} ในอีก {n} นาที","evNow":"{e} {name} — เริ่มแล้ว!","evBody":"เริ่มเวลา {t} UTC","resetTitle":"{e} {name} — รีเซ็ตรายวันในอีก {n} นาที","resetNow":"{e} {name} — รีเซ็ตรายวันแล้ว","resetBody":"รีเซ็ตเวลา 00:00 UTC วันนี้ใช้แล้วหรือยัง?","claimTitle":"{e} {name} ในอีก {n} นาที","claimNow":"{e} {name} — รับได้แล้ว!","claimBody":"รับฟรีเวลา {t} UTC","alertsSync":"การแจ้งเตือนวางแผนล่วงหน้า 3 สัปดาห์ — เปิดเว็บไซต์เป็นระยะเพื่อให้ทำงานต่อเนื่อง"},
    ar: {"ordReady":"جاهز مجددًا — يمكنك إصداره.","ordHint":"أصدرته للتو؟ تمت تعبئة فترة التهدئة كاملة ({cd}). وإلا فاكتب الوقت الظاهر في اللعبة.","fnTip":"جوهر الماء يتجمع 12 ساعة فقط في أي مستوى — اجمعه قبل ذلك. من المستوى 3 يمكن للحلفاء المساعدة كل 6 ساعات (3 مرات يوميًا، إعادة التعيين 00:00 UTC).","fnFull":"ممتلئ — اجمع جوهر الماء.","fnHint":"جمعته للتو؟ تمت تعبئة 12 ساعة. وإلا فاكتب الوقت المتبقي حتى يمتلئ.","dnTip":"تعود محاولة واحدة كل 10 دقائق، حتى 25. من 0 حتى الامتلاء 4 ساعات و10 دقائق — بعد الامتلاء لا يزيد شيء.","dnNow":"المحاولات الآن (0–25)","dnFull":"عادت إلى 25 محاولة — اذهب للمساهمة.","chip":"⏰ ضبط مؤقت","title":"⏰ مؤقتاتي","chat":"‹ المحادثة","add":"＋ ضبط مؤقت","what":"ما هو؟","left":"الوقت المتبقي في اللعبة","hint":"مثل 2:45:12 · 2h45m · 45m","another":"＋ مسيرة أخرى","save":"حفظ","cancel":"إلغاء","empty":"لا توجد مؤقتات بعد.","done":"انتهى ✓","at":"ينتهي {t}","bad":"تحقق من الوقت — مثل 2:45:12","on":"🔔 الإشعارات مفعّلة على هذا الهاتف.","turnOn":"🔔 تفعيل الإشعارات","test":"إرسال تجربة","testMsg":"الإشعارات تعمل! ✓","blocked":"الإشعارات محظورة. اسمح بها لهذا الموقع من إعدادات الهاتف ثم عُد.","ios":"على iPhone أضف الموقع إلى الشاشة الرئيسية أولاً: مشاركة ← «إضافة إلى الشاشة الرئيسية»، ثم افتح NXS من الأيقونة الجديدة وعُد إلى هنا.","noPush":"هذا المتصفح لا يعرض الإشعارات. استخدم Chrome (أندرويد) أو تطبيق الشاشة الرئيسية (iPhone).","local":"المؤقتات تعمل في هذه الصفحة، لكن الهاتف لن ينبّهك إلا بعد تفعيل الإشعارات.","fail":"تعذّر الوصول إلى خادم الإشعارات. مؤقتاتك محفوظة وستتم مزامنتها لاحقًا.","limitHold":"⚠️ نفدت حصة التخزين اليومية المجانية للخادم (تُعاد عند 00:00 UTC). مؤقتاتك محفوظة على هذا الهاتف وستتزامن بعد ذلك.","body":"انتهى — تفقّد اللعبة!","name":"الاسم","cats":{"gather":"الجمع","train":"التدريب","build":"البناء","research":"البحث","heal":"العلاج","fountain":"ينبوع الحياة","donate":"التقنيات · مساهمة","order":"طلب الحاكم","other":"أخرى","appt":"التعيين","master":"المتخصص","recruit":"تجنيد الأبطال","pet":"مغامرة الحيوان الأليف","intel":"مهام المعلومات","stamina":"وليمة الذواقة"},"testWait":"خلال 15 ث — اخرج من التطبيق الآن (الشاشة الرئيسية) لترى الشارة الحمراء 🔴","quick":"⚡ بدء سريع (أوقاتك الأخيرة)","quickHint":"نقرة واحدة تبدأه مجدداً بنفس الوقت.","forget":"انسَ هذا الوقت","lastTime":"آخر مرة: {t} — اضغط حفظ فقط، أو اكتب وقتاً جديداً.","synced":"✓ تم الحفظ على الخادم: {n} إشعارات مجدولة (تم التحقق {t}).","sample":"أرسل تجربة الآن","sent":"أُرسل ✓","needOn":"فعّل الإشعارات في الأعلى أولاً — وإلا لن تصل هذه التنبيهات إلى هاتفك.","subQ":{"order":"أي أمر؟","gather":"أي مورد؟","train":"أي قوات؟","recruit":"أي تجنيد؟","appt":"أي منصب؟"},"advanced":"المتقدم","epic":"الملحمي","minister":"رئيس الوزراء","advisor":"مستشار نبيل","apDay":"اليوم (UTC)","apTime":"فترتك (الـ 24 ساعة القادمة، 30 دقيقة لكل فترة)","apRemind":"ذكّرني","apToday":"اليوم","apStarts":"تبدأ الفترة {t}","apTitle":"{e} {name} خلال {n} دقيقة","apNow":"{e} {name} — فترتك تبدأ الآن!","apBody":"فترتك ذات الـ 30 دقيقة تبدأ في {t} UTC.","stack":{"minister":["فعّل وقت إضافي","مساعد البناء (الذئب الرمادي)","ابدأ قائمتي البناء خلال 5 دقائق"],"advisor":["استخدم الجواهر لزيادة سعة تدريب القوات","ابدأ التدريب (كل أنواع القوات)"]},"btBody":"انقر لفتح حاسبة BT.","btLink":"🧮 حاسبة BT","clOn":"🔄 متزامن مع Discord ({name}) · {t}","clNow":"زامن الآن","clOff":"🔄 استخدم مؤقتاتك على كل أجهزتك: سجّل الدخول عبر Discord (الضباط).","clIn":"تسجيل الدخول عبر Discord","cl_no_access":"حسابك في Discord ليس في قائمة الضباط بعد.","cl_not_member":"انضم أولاً إلى خادم Discord الخاص بتحالفنا.","cl_logged_out":"يرجى تسجيل الدخول عبر Discord مرة أخرى.","cl_cancelled":"تم إلغاء تسجيل الدخول عبر Discord.","cl_expired":"يرجى تسجيل الدخول عبر Discord مرة أخرى.","cl_discord":"تعذّرت المزامنة الآن — سنحاول مجدداً.","cl_discord_unreachable":"تعذّر الوصول إلى Discord — سنحاول مجدداً.","cl_too_big":"البيانات أكثر من أن تُزامَن.","ibT":"🔔 التذكيرات ({n})","ibClear":"✓ مسح","ibAgo":"منذ {t}","stackT":"{e} {name} مفعّل — حتى {t} UTC","stackHint":"اجمع تعزيزاتك:","stackBody":"الفترة في {t} UTC. ثم: {list}.","naOn":"تعزيز المستشار النبيل مفعّل الآن","naHint":"التدريب أسرع معه، لذا يُحفظ الوقت بشكل منفصل (يُفعَّل تلقائياً خلال فترة المستشار النبيل الخاصة بك).","sgT":"💡 احجز {pos}","sgNow":"{what} ينتهي {when}. احجز فترة {slot} UTC لتبدأ التالية مع التعزيز.","sgLater":"{what} ينتهي {when} — بعد أكثر من 24 ساعة، فلا يمكنك الحجز بعد. يفتح الحجز {open}.","sgRemind":"＋ ذكّرني بهذه الفترة","sgBook":"＋ ذكّرني بالحجز","sgNo":"ليس الآن","sgLink":"📅 الفترة","bookT":"📅 احجز {name} الآن","bookB":"احجز فترة {t} UTC — حينها ينتهي {what}.","troop":"أي قوات؟","builder":"＋ بنّاء ثانٍ","alerts":"🎮 تذكيرات اللعبة","admin":"🛠️ تذكيرات الإدارة","adminNote":"مهام الضباط من تبويب الأحداث، تُرسل في يوم استحقاقها.","adminOn":"أرسل تذكيرات الإدارة","adminAt":"في {t} UTC","adminNone":"افتح تبويب الأحداث في صفحة الضباط مرة واحدة (في نفس التطبيق / المتصفح) لتحميل المهام — تتحدّث في كل مرة تفتحه.","adminEmpty":"لا مهام للضباط خلال الأسابيع الـ 3 القادمة.","adminUpd":"حُمّلت المهام {t}","adminBody":"خطوة إدارية اليوم — انقر لفتح القائمة.","alertsNote":"انقر على وقت لتلقي إشعار قبل بدئه.","before":"قبل {n} دقيقة","next":"التنبيه التالي: {t}","atTime":"في الموعد","reset":"إعادة الضبط 00:00 UTC","arenaName":"الساحة","journeyName":"إمدادات الرحلة","cesaresName":"غضب سيزاريس","intelName":"مهام المعلومات","refreshTitle":"{e} {name} تتجدد خلال {n} دقيقة","refreshNow":"{e} {name} — مهام جديدة الآن!","refreshBody":"يتجدد برج المراقبة في {t} UTC.","evTitle":"{e} {name} خلال {n} دقيقة","evNow":"{e} {name} — الآن!","evBody":"يبدأ في {t} UTC.","resetTitle":"{e} {name} — إعادة الضبط اليومية خلال {n} دقيقة","resetNow":"{e} {name} — إعادة الضبط اليومية الآن","resetBody":"يُعاد الضبط في 00:00 UTC. هل استخدمته اليوم؟","claimTitle":"{e} {name} خلال {n} دقيقة","claimNow":"{e} {name} — استلم الآن!","claimBody":"استلام مجاني في {t} UTC.","alertsSync":"التنبيهات مجدولة لـ 3 أسابيع مقدماً — افتح الموقع من حين لآخر لتستمر."},
  };
  const CAT_EMOJI = { appt: "📅", gather: "🌾", train: "⚔️", build: "🔨", research: "📚", master: "🎓", recruit: "🎴", pet: "🐾", intel: "🔍", stamina: "🍖", heal: "⛑️", order: "📜", fountain: "💧", donate: "🤝", other: "⏰" };
  // the page's language: the site's (12 languages) or, on the officer page, the officer page's; anything else → English
  const lang = () => { const l = typeof currentLang !== "undefined" ? currentLang : typeof OFFICER !== "undefined" ? OFFICER.lang : "en"; return TX[l] ? l : "en"; };
  const T = (k) => (TX[lang()] || TX.en)[k] ?? TX.en[k];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- timers on this phone ---------- */
  let timers = [];
  try { timers = (JSON.parse(localStorage.getItem(LS)) || []).filter((x) => !x.demo); } catch (e) {}   // old 🧪 preview appointments are dropped
  /* 🔄 sync across devices (logged in with Discord): each timer carries its last-change time (mt); deleted ids are remembered */
  const SYNC_LS = "nxs-sync-meta", DTOK = "nxs-discord-v1", DUSER = "nxs-discord-user";
  let meta = {}; try { meta = JSON.parse(localStorage.getItem(SYNC_LS)) || {}; } catch (e) {}
  meta.del = meta.del || {};
  const saveMeta = () => { try { localStorage.setItem(SYNC_LS, JSON.stringify(meta)); } catch (e) {} };
  let lastIds = new Set(timers.map((x) => x.id));
  /* ✅ ticks on the site (daily checklist, KvK checklist, buff-stack steps) ride along with the ⏰ sync when logged in:
     every write to one of these keys is stamped (meta.ls[key].at) and sent; a newer copy from another device replaces it */
  // also: 🐻 bear calculator, 🧮 KvK calculator, and the officer page's own settings (ranking ticks, battle table, to-dos, board read marks, Watch/Scout views)
  // keep in step with js/sync-lite.js and worker/worker.js (syncMerge)
  const SYNC_KEY = /^(nxs-daily-v1|nxs-stack-done|ks-kvk-check-[\w-]{1,40}|nxs-bt-v2|kvk-calc-v5|nxs-roster-v2|nxs-table-v1|nxs-events-v1|nxs-board-seen|nxs-watch-v1|nxs-scout-v1)$/;
  meta.ls = meta.ls || {};
  let applying = false;
  try {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      orig.call(this, k, v);
      if (this === window.localStorage && !applying && SYNC_KEY.test(k)) { meta.ls[k] = { at: Date.now() }; orig.call(this, SYNC_LS, JSON.stringify(meta)); cloudSoon(); }
    };
  } catch (e) {}
  const lsOut = () => { const o = {}; for (const [k, m] of Object.entries(meta.ls)) { let v = null; try { v = localStorage.getItem(k); } catch (e) {} if (v != null) o[k] = { v, at: m.at }; } return o; };
  const lsIn = (ls) => {
    let changed = false;
    for (const [k, x] of Object.entries(ls || {})) {
      if (!SYNC_KEY.test(k) || (meta.ls[k] && meta.ls[k].at >= x.at)) continue;
      applying = true; try { localStorage.setItem(k, x.v); } catch (e) {} applying = false;
      meta.ls[k] = { at: x.at }; changed = true;
    }
    if (changed) window.dispatchEvent(new CustomEvent("nxs-synced"));   // the page redraws its checklists
  };
  let lastStored = "";
  const store = () => {
    const now = Date.now(), ids = new Set();
    for (const x of timers) { if (!x.mt) x.mt = now; ids.add(x.id); }
    for (const id of lastIds) if (!ids.has(id)) meta.del[id] = now;
    lastIds = ids; saveMeta();
    const txt = JSON.stringify(timers), changed = txt !== lastStored; lastStored = txt;
    try { localStorage.setItem(LS, txt); } catch (e) {}
    if (changed) cloudSoon(); else cloudPeek();   // nothing changed (e.g. app brought back) → no instant server call
  };
  lastStored = JSON.stringify(timers);
  const prune = () => { const now = Date.now(); timers = timers.filter((x) => x.at > now - KEEP_DONE_MS); };
  const termOf = (id) => (typeof GLOSSARY !== "undefined" && GLOSSARY[id] ? GLOSSARY[id][lang()] || GLOSSARY[id].en : id.charAt(0).toUpperCase() + id.slice(1));
  const labelOf = (x) => labelBase(x) + (x.na ? " 🎖️" : "");
  const labelBase = (x) => (x.cat === "other" && x.name ? x.name : (T("cats")[x.cat] || TX.en.cats[x.cat] || x.cat)) + (x.sub ? ` · ${subName(x.sub)}` : "") + (x.n ? ` #${x.n}` : "");
  const MULTI = { gather: 6, build: 2 };   // several at once: gathering marches, 2 builders
  /* categories with a second choice: troop type, recruit type */
  /* gathering: which resource (names = in-game Map gathering tab, data/terms.js) */
  const RES_N = {"bread": ["Bread", "麵包", "빵", "Brot", "Pain", "Pão", "Ekmek", "Roti", "Хлеб", "ขนมปัง", "الخبز", "Pan"], "wood": ["Wood", "木材", "목재", "Holz", "Bois", "Madeira", "Odun", "Kayu", "Древесина", "ไม้", "خشب", "Madera"], "stone": ["Stone", "石材", "석재", "Stein", "Pierre", "Pedra", "Taş", "Batu", "Камень", "หิน", "الحجر", "Piedra"], "iron": ["Iron", "鐵礦", "철광", "Eisen", "Fer", "Ferro", "Demir", "Besi", "Железо", "แร่เหล็ก", "حديد", "Hierro"]};
  const RES_L = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar", "es"];
  /* 📜 Governor Orders: names = in-game (data/terms.js); cd = cooldown in hours; tip = what the order does */
  const ORD_N = {"mobil": ["Urgent Mobilization", "緊急動員", "긴급 동원", "Dringende Mobilisierung", "Mobilisation Urgente", "Mobilização Urgente", "Acil Harekat", "Urgent Mobilization", "Срочная мобилизация", "การระดมพลเร่งด่วน", "التعبئة العاجلة", "Movilización Urgente"], "rush": ["Rush Job", "立即生產", "즉시 생산", "Eilauftrag", "Travail Urgent", "Acelerar Trabalho", "Acil İş", "Rush Job", "Поспешная работа", "เร่งงาน", "عمل مستعجل", "Trabajo urgente"], "care": ["Comprehensive Care", "藥到病除", "빠른 약효", "Umfassende Pflege", "Soins Complets", "Cuidado Integral", "Kapsamlı Bakım", "Comprehensive Care", "Комплексный уход", "รักษาถ้วนหน้า", "الرعاية الشاملة", "Cuidado integral"], "double": ["Double Time", "加速建造", "건설 가속", "Doppeltes Tempo", "Bouchées Doubles", "Horário Dobrado", "Çifte Mesai", "Double Time", "Плата за сверхурочные", "เร่งก่อสร้าง", "وقت إضافي", "Doble tiempo"], "prod": ["Productivity Day", "效率工作", "효율 업무", "Tag der Produktivität", "Journée de la Productivité", "Dia de Produtividade", "Üretkenlik Günü", "Productivity Day", "Продуктивный день", "วันแห่งผลผลิต", "يوم الإنتاجية", "Día de la Productividad"], "fest": ["Festivities", "節日狂歡", "카니발 페스티벌", "Festlichkeiten", "Festivités", "Celebrações", "Şenlikler", "Festivities", "Праздники", "งานรื่นเริง", "الاحتفالات", "Celebraciones"]};
  const ORD_CD = { mobil: 8, rush: 24, care: 4, double: 24, prod: 12, fest: 24 };
  const ORD_TIP = {"mobil": {"en": "Residents keep working for 48 h (resident time); mood −10 each. Pairs well with Productivity Day.", "zh": "居民持續工作 48 小時（居民時間），每人心情 −10。可以搭配「效率工作」一起用。", "ko": "주민이 48시간(주민 시간) 동안 계속 일해요. 기분 −10. 효율 업무와 함께 쓰면 좋아요.", "de": "Einwohner arbeiten 48 Std. (Einwohnerzeit) weiter; Laune −10. Passt gut zum Tag der Produktivität.", "fr": "Les habitants travaillent 48 h (temps des habitants) ; humeur −10. Idéal avec Journée de la Productivité.", "pt": "Os residentes trabalham por 48 h (tempo dos residentes); humor −10. Combina com Dia de Produtividade.", "tr": "Yurttaşlar 48 sa (yurttaş zamanı) çalışmaya devam eder; ruh hâli −10. Üretkenlik Günü ile iyi gider.", "id": "Warga terus bekerja 48 jam (waktu warga); suasana hati −10. Cocok dengan Productivity Day.", "ru": "Жители работают 48 ч (время жителей); настроение −10. Хорошо вместе с «Продуктивным днём».", "th": "ชาวเมืองทำงานต่อ 48 ชม. (เวลาชาวเมือง) อารมณ์ −10 ใช้คู่กับวันแห่งประสิทธิภาพได้ดี", "ar": "يواصل السكان العمل 48 ساعة (وقت السكان)؛ المزاج −10. يناسبه «يوم الإنتاجية».", "es": "Los residentes siguen trabajando 48 h (tiempo de residentes); ánimo −10. Combina con el Día de productividad."}, "rush": {"en": "Instantly collect 5 days (resident time) of production from every workplace.", "zh": "立即拿到各工作場所 5 天（居民時間）的產量。", "ko": "모든 작업장의 5일치(주민 시간) 생산량을 바로 받아요.", "de": "Sofort 5 Tage (Einwohnerzeit) Produktion aller Arbeitsstätten erhalten.", "fr": "Récupérez immédiatement 5 jours (temps des habitants) de production de chaque lieu de travail.", "pt": "Receba na hora 5 dias (tempo dos residentes) de produção de cada local de trabalho.", "tr": "Tüm iş yerlerinin 5 günlük (yurttaş zamanı) üretimini anında al.", "id": "Langsung dapat hasil produksi 5 hari (waktu warga) dari semua tempat kerja.", "ru": "Сразу получаете производство всех рабочих мест за 5 дней (время жителей).", "th": "รับผลผลิต 5 วัน (เวลาชาวเมือง) จากทุกสถานที่ทำงานทันที", "ar": "تحصل فورًا على إنتاج 5 أيام (وقت السكان) من كل أماكن العمل.", "es": "Recibe al instante 5 días (tiempo de residentes) de producción de cada lugar de trabajo."}, "care": {"en": "Heals every sick resident at once. Costs 150,000 ★ — use it only when someone is sick.", "zh": "立即治癒城鎮內所有生病的居民。要 150,000 ★，有人生病時才用。", "ko": "아픈 주민을 모두 바로 치료해요. 150,000 ★ — 아픈 주민이 있을 때만 쓰세요.", "de": "Heilt sofort alle kranken Einwohner. Kostet 150.000 ★ — nur nutzen, wenn jemand krank ist.", "fr": "Soigne immédiatement tous les habitants malades. Coûte 150 000 ★ — seulement si quelqu'un est malade.", "pt": "Cura na hora todos os residentes doentes. Custa 150.000 ★ — use só quando alguém estiver doente.", "tr": "Tüm hasta yurttaşları anında iyileştirir. 150.000 ★ — sadece hasta biri varken kullan.", "id": "Langsung menyembuhkan semua warga yang sakit. Biaya 150.000 ★ — pakai hanya saat ada yang sakit.", "ru": "Сразу лечит всех больных жителей. Стоит 150 000 ★ — используйте, только когда кто-то болен.", "th": "รักษาชาวเมืองที่ป่วยทั้งหมดทันที ใช้ 150,000 ★ — ใช้เมื่อมีคนป่วยเท่านั้น", "ar": "يعالج كل السكان المرضى فورًا. يكلّف 150,000 ★ — استخدمه فقط عند وجود مريض.", "es": "Cura al instante a todos los residentes enfermos. Cuesta 150.000 ★: úsalo solo si alguien está enfermo."}, "double": {"en": "Builds and upgrades started in the next 5 min take 20% less time (800,000 ★). Start your longest build right after.", "zh": "頒布後 5 分鐘內開始的建造、升級時間縮短 20%（800,000 ★）。頒布完馬上開最久的建築。", "ko": "5분 안에 시작한 건설·업그레이드 시간이 20% 줄어요 (800,000 ★). 반포 후 바로 가장 긴 건설을 시작하세요.", "de": "Bau und Ausbau, die in den nächsten 5 Min. starten, dauern 20 % kürzer (800.000 ★). Danach sofort den längsten Bau starten.", "fr": "Les constructions et améliorations lancées dans les 5 min durent 20 % de moins (800 000 ★). Lancez tout de suite la plus longue.", "pt": "Construções e melhorias iniciadas nos próximos 5 min levam 20% menos tempo (800.000 ★). Comece logo a mais longa.", "tr": "Sonraki 5 dk içinde başlayan inşa ve yükseltmeler %20 daha kısa sürer (800.000 ★). Hemen en uzun inşaatı başlat.", "id": "Bangunan dan upgrade yang dimulai dalam 5 menit 20% lebih cepat (800.000 ★). Langsung mulai bangunan terlama.", "ru": "Стройки и улучшения, начатые в ближайшие 5 мин, идут на 20 % быстрее (800 000 ★). Сразу запускайте самую долгую.", "th": "การสร้างและอัปเกรดที่เริ่มภายใน 5 นาทีใช้เวลาน้อยลง 20% (800,000 ★) ประกาศแล้วรีบเริ่มสิ่งที่นานที่สุด", "ar": "البناء والترقيات التي تبدأ خلال 5 دقائق تستغرق وقتًا أقل بـ20% (800,000 ★). ابدأ أطول بناء فورًا.", "es": "Las construcciones y mejoras iniciadas en los próximos 5 min tardan un 20 % menos (800.000 ★). Empieza enseguida la más larga."}, "prod": {"en": "Workplace production +100% for 24 h (resident time); mood −10 each.", "zh": "工作場所資源生產效率 +100%，持續 24 小時（居民時間），每人心情 −10。", "ko": "작업장 생산 효율 +100%, 24시간(주민 시간) 지속. 기분 −10.", "de": "Produktion der Arbeitsstätten +100 % für 24 Std. (Einwohnerzeit); Laune −10.", "fr": "Production des lieux de travail +100 % pendant 24 h (temps des habitants) ; humeur −10.", "pt": "Produção dos locais de trabalho +100% por 24 h (tempo dos residentes); humor −10.", "tr": "İş yeri üretimi 24 sa (yurttaş zamanı) boyunca +%100; ruh hâli −10.", "id": "Produksi tempat kerja +100% selama 24 jam (waktu warga); suasana hati −10.", "ru": "Производство рабочих мест +100 % на 24 ч (время жителей); настроение −10.", "th": "ผลผลิตสถานที่ทำงาน +100% นาน 24 ชม. (เวลาชาวเมือง) อารมณ์ −10", "ar": "إنتاج أماكن العمل +100% لمدة 24 ساعة (وقت السكان)؛ المزاج −10.", "es": "Producción de los lugares de trabajo +100 % durante 24 h (tiempo de residentes); ánimo −10."}, "fest": {"en": "From 00:00 the next day, a 1-day holiday (resident time): mood +50, comfort +30. Good after Urgent Mobilization.", "zh": "隔天 00:00 起全城放假 1 天（居民時間），心情 +50、舒適 +30。適合在緊急動員之後用。", "ko": "다음 날 00:00부터 1일 휴가(주민 시간): 기분 +50, 쾌적 +30. 긴급 동원 후에 쓰기 좋아요.", "de": "Ab 00:00 am nächsten Tag 1 Tag frei (Einwohnerzeit): Laune +50, Komfort +30. Gut nach Dringender Mobilisierung.", "fr": "Dès 00:00 le lendemain, 1 jour de congé (temps des habitants) : humeur +50, confort +30. Idéal après Mobilisation Urgente.", "pt": "A partir de 00:00 do dia seguinte, 1 dia de folga (tempo dos residentes): humor +50, conforto +30. Bom depois da Mobilização Urgente.", "tr": "Ertesi gün 00:00'dan itibaren 1 gün tatil (yurttaş zamanı): ruh hâli +50, konfor +30. Acil Harekat'tan sonra iyi olur.", "id": "Mulai 00:00 besok, libur 1 hari (waktu warga): suasana hati +50, kenyamanan +30. Bagus setelah Urgent Mobilization.", "ru": "С 00:00 следующего дня — 1 выходной (время жителей): настроение +50, комфорт +30. Хорошо после «Срочной мобилизации».", "th": "ตั้งแต่ 00:00 วันถัดไป หยุด 1 วัน (เวลาชาวเมือง) อารมณ์ +50 ความสบาย +30 เหมาะใช้หลังการระดมพลเร่งด่วน", "ar": "من 00:00 في اليوم التالي عطلة يوم واحد (وقت السكان): المزاج +50 والراحة +30. مناسب بعد التعبئة العاجلة.", "es": "Desde las 00:00 del día siguiente, 1 día libre (tiempo de residentes): ánimo +50, comodidad +30. Ideal tras la Movilización Urgente."}};
  const ordTip = (k) => ORD_TIP[k] ? ORD_TIP[k][lang()] || ORD_TIP[k].en : "";
  const SUBS = { order: { mobil: "🏃", rush: "📦", care: "🛏️", double: "🏗️", prod: "🔨", fest: "🎉" }, gather: { bread: "🍞", wood: "🪵", stone: "🪨", iron: "⛏️" }, train: { infantry: "🛡️", cavalry: "🐎", archer: "🏹" }, recruit: { advanced: "📦", epic: "💎" }, appt: { minister: "🏛️", advisor: "🎖️" } };
  function subName(k) { return ORD_N[k] ? (ORD_N[k][Math.max(0, RES_L.indexOf(lang()))] || ORD_N[k][0]).replace(/^—$/, ORD_N[k][0]) : RES_N[k] ? RES_N[k][Math.max(0, RES_L.indexOf(lang()))] : SUBS.train[k] ? termOf(k) : T(k); }

  /* ---------- event alerts (Bear Hunt, Arena reset, Swordland…) — opt-in per time, N minutes before ---------- */
  const ALS = "nxs-alerts-v1";
  let alerts = {};
  try { alerts = JSON.parse(localStorage.getItem(ALS)) || {}; } catch (e) {}
  const saveAlerts = () => { try { localStorage.setItem(ALS, JSON.stringify(alerts)); } catch (e) {} meta.alertsAt = Date.now(); saveMeta(); cloudSoon(); };
  const BEFORE = [0, 1, 3, 5, 10, 15, 30, 60];
  /* event = alliance event on its battle days (times from EVENT_TIMES); daily = every day at fixed UTC hours (24 = the 00:00 reset) */
  const DEFS = [
    { k: "bear-hunt", kind: "event", def: 10 },
    { k: "arena", kind: "daily", hours: [24], def: 3, emoji: "🏟️", name: "arenaName" },
    { k: "mystic-trial", kind: "daily", hours: [24], def: 30 },
    { k: "journey", kind: "daily", hours: [8, 16], def: 0, emoji: "🎒", name: "journeyName" },
    { k: "intel", kind: "daily", hours: [0, 8, 16], def: 0, emoji: "🔍", name: "intelName", text: "refresh" },
    { k: "swordland-showdown", kind: "event", def: 10 },
    { k: "tri-alliance-clash", kind: "event", def: 10 },
    { k: "viking-vengeance", kind: "event", def: 10 },
    { k: "cesares-fury", kind: "event", def: 10, emoji: "🗡️", name: "cesaresName" },
  ];
  if (alerts.arena && alerts.arena.on === true) alerts.arena = { on: { 24: true }, before: 3 };   // older beta setting
  // older beta saves: choices keyed by hour → "1st / 2nd time" (#0, #1), so moving a time later keeps them on
  { const OLD = { "bear-hunt": [13, 22], "swordland-showdown": [2, 14], "tri-alliance-clash": [14, 21], "viking-vengeance": [14, 23], arena: [24], "mystic-trial": [24], journey: [8, 16], intel: [0, 8, 16] };
    let moved = false;
    for (const [k, a] of Object.entries(alerts)) for (const key of Object.keys((a && a.on) || {})) {
      const i = (OLD[k] || []).indexOf(+key);
      if (!key.startsWith("#") && i >= 0) { if (a.on["#" + i] == null) a.on["#" + i] = a.on[key]; delete a.on[key]; moved = true; }
    }
    if (moved) saveAlerts(); }
  /* which day of the event run has the battle (0 = first day). Default: the last day — check in game. */
  // battle day (1 = first day of the run, -1 = last); officers set it on the officer Events tab (data/event-times.json "days"). Missing = every day (Bear Hunt).
  const FIGHT_DAY = { "swordland-showdown": -1, "tri-alliance-clash": -1, "viking-vengeance": -1, "cesares-fury": 1, "kvk": 6 };
  const DAY = 86400000, HORIZON = 21 * DAY;
  // a choice is kept as "1st / 2nd time" (#0, #1), so officers can move a time without switching people's alerts off (old saves used the hour)
  const isOn = (a, i, h) => !!(a && a.on && (a.on["#" + i] ?? a.on[h]));
  const fmtH = (h) => String(Math.floor(h % 24)).padStart(2, "0") + ":" + String(Math.round((h % 1) * 60)).padStart(2, "0");
  const evHours = (k) => (ON_MAIN ? EVENT_TIMES[k] : FB.times[k]) || [];
  const defOf = (k) => DEFS.find((d) => d.k === k);
  const hoursOf = (d) => d.hours || evHours(d.k);
  const beforeOf = (d) => { const a = alerts[d.k]; return a && a.before != null ? a.before : d.def; };
  const evName = (k) => { const d = defOf(k); if (d && d.name) return T(d.name); return nameFromGuide(k); };
  const nameFromGuide = (k) => (!ON_MAIN && FB.names[k]) ? FB.names[k][1] : (typeof GUIDES !== "undefined" && GUIDES[k] ? GUIDES[k].name[lang()] || GUIDES[k].name.en : k);
  const evEmoji = (k) => { const d = defOf(k); if (d && d.emoji) return d.emoji; if (!ON_MAIN && FB.names[k]) return FB.names[k][0]; return typeof GUIDES !== "undefined" && GUIDES[k] ? GUIDES[k].emoji : "📅"; };
  function evSched(k) {
    if (!ON_MAIN) return FB.sched[k] || null;
    if (k === "bear-hunt") return typeof BEAR_SCHED !== "undefined" ? BEAR_SCHED : null;
    return typeof EVENT_SCHEDULES !== "undefined" ? EVENT_SCHEDULES[k] : null;
  }
  /* is there a battle of event k on the UTC day starting at dayStart? */
  function fightOn(k, dayStart) {
    const sc = evSched(k); if (!sc) return false;
    const n = Math.floor((dayStart - sc.anchor) / DAY); if (n < 0) return false;
    const inRun = n % sc.periodDays; if (inRun >= sc.activeDays) return false;
    if (!(k in FIGHT_DAY)) return true;                      // Bear Hunt: every active day
    const f = FIGHT_DAY[k] < 0 ? sc.activeDays + FIGHT_DAY[k] : FIGHT_DAY[k] - 1;
    return inRun === f;
  }
  /* the alert notifications for the next 3 weeks, from the choices above */
  function alertTimers() {
    const now = Date.now(), out = [], today = Math.floor(now / DAY) * DAY;
    const fill = (str, v) => str.replace(/\{(\w+)\}/g, (m, x) => (v[x] ?? m));
    for (const d of DEFS) {
      const a = alerts[d.k]; if (!a || !a.on) continue;
      const H = hoursOf(d), before = beforeOf(d);
      for (let day = today; day < now + HORIZON; day += DAY) {
        if (d.kind === "event" && !fightOn(d.k, day)) continue;
        for (const [i, h] of H.entries()) {
          if (!isOn(a, i, h)) continue;
          const at = day + Math.round(h * 60) * 60000 - before * 60000;
          if (at <= now) continue;
          const v = { e: evEmoji(d.k), name: evName(d.k), n: before, t: fmtH(h) };
          const kind = d.text || (h === 24 ? "reset" : d.kind === "daily" ? "claim" : "ev");
          const title = fill(T(before ? kind + "Title" : kind + "Now"), v), body = fill(T(kind + "Body"), v);
          // the Bear Hunt notification opens the bear calculator ("-bt" at the end tells sw.js) — for everyone with timers
          const bt = d.k === "bear-hunt";
          out.push({ id: `ev-${d.k}-${h}-${day / DAY}${bt ? "-bt" : ""}`, at, title, body: bt ? body + " " + T("btBody") : body });
        }
      }
    }
    return out.sort((x, y) => x.at - y.at);
  }
  /* 🛠️ admin reminders: officer to-dos the officer page left in this browser (nxs-admin-todos), sent at the chosen UTC hour of their due day */
  function adminData() { try { return JSON.parse(localStorage.getItem("nxs-admin-todos")) || null; } catch (e) { return null; } }
  /* 🛠️ officer to-do reminders: only on a device where an officer opened the officer page (it leaves the to-dos / the officer password there),
     or whose Discord account is in the 👥 officer table cached by the officer page. A plain Discord login is not enough. */
  const isOfficerUser = () => { try {
    if (adminData() || (JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").pw)) return true;
    const u = JSON.parse(localStorage.getItem("nxs-discord-user") || "{}"), p = JSON.parse(localStorage.getItem("nxs-perms-v1") || "{}");
    return !!(u.id && p.users && p.users[u.id]);
  } catch (e) { return false; } };
  const isOfficer = () => { try { return !!adminData() || !!localStorage.getItem("nxs-discord-v1") || !!(JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").pw); } catch (e) { return false; } };
  /* the to-do's event name in the page language: the guide name on the main site, the officer page's names otherwise */
  const adminName = (x, ev) => {
    const l = lang(), g = typeof GUIDES !== "undefined" && GUIDES[ev];
    const en = (x.names && x.names.en) || String(x.title || "").replace(/^\S+\s/, ""), tm = typeof EVENT_NAMES !== "undefined" && EVENT_NAMES[en];
    const n = (g && g.name && (g.name[l] || g.name.en)) || (tm && tm[l]) || (x.names && x.names[l]) || (tm && tm.en) || en || "";
    const em = x.emoji || (g && g.emoji) || (String(x.title || "").match(/^(\S+)\s/) || [])[1] || "📌";
    return n ? `${em} ${n}` : x.title;
  };
  function adminTimers() {
    const a = alerts.admin, d = adminData();
    if (!a || !a.on || !d || !Array.isArray(d.items) || !isOfficerUser()) return [];
    const now = Date.now(), h = a.hour ?? 0, seen = new Set(), out = [];
    // one short notification per event per day ("⚔️ Swordland Showdown") — the details stay in the checklist
    for (const x of d.items) {
      const ev = x.ev || String(x.id).replace(/-\d{4}-\d\d-\d\d-\d+$/, ""), key = `${ev}-${Math.floor(x.due / 86400000)}`;
      if (ev === "bear-hunt" || seen.has(key)) continue; seen.add(key);   // Bear Hunt repeats by itself — no admin reminder
      out.push({ id: `adm-${key}`.slice(0, 40), at: x.due + h * 3600000, title: `🛠️ ${adminName(x, ev)}`, body: T("adminBody") });
    }
    return out.filter((x) => x.at > now).sort((x, y) => x.at - y.at);
  }

  /* "2:45:12", "45:00", "2h45m", "2h 45m 12s", "45m", "90" (minutes) → milliseconds */
  function parseLeft(s) {
    s = String(s || "").trim().toLowerCase().replace(/[，、]/g, ",");
    if (!s) return 0;
    let m;
    // "3d 07:51:57" (how the game shows long timers)
    if ((m = s.match(/^(\d+)\s*(?:d|天)\s*(\d+\s*[:：].*)$/))) { const rest = parseLeft(m[2]); return rest ? +m[1] * 86400000 + rest : 0; }
    if ((m = s.match(/^(\d+)\s*[:：]\s*(\d{1,2})(?:\s*[:：]\s*(\d{1,2}))?$/))) {
      const [a, b, c] = [m[1], m[2], m[3]].map((x) => +x || 0);
      return (m[3] != null ? a * 3600 + b * 60 + c : a * 60 + b) * 1000;   // h:mm:ss or mm:ss
    }
    if (/^\d+$/.test(s)) return +s * 60000;
    let ms = 0, any = false;
    s.replace(/(\d+)\s*(d|h|m|s|天|小時|時|分|秒)/g, (all, n, u) => {
      any = true; n = +n;
      ms += n * ({ d: 86400, 天: 86400, h: 3600, 小時: 3600, 時: 3600, m: 60, 分: 60, s: 1, 秒: 1 }[u]) * 1000;
    });
    return any ? ms : 0;
  }
  const fmtLeft = (ms) => { const s = Math.max(0, Math.round(ms / 1000)), d = Math.floor(s / 86400); return `${d ? d + "d " : ""}${Math.floor(s / 3600) % 24}:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
  const fmtAt = (at) => { const d = new Date(at), same = d.toDateString() === new Date().toDateString();
    return (same ? "" : d.toLocaleDateString(undefined, { weekday: "short" }) + " ") + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };

  /* ---------- notifications ---------- */
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = () => { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } };
  const canPush = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  async function getSub() {
    if (!canPush()) return null;
    try { const reg = await navigator.serviceWorker.ready; return await reg.pushManager.getSubscription(); } catch (e) { return null; }
  }
  async function subscribe() {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return null;
    const reg = await navigator.serviceWorker.ready;
    const key = Uint8Array.from(atob(VAPID.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
    return (await reg.pushManager.getSubscription()) || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
  }
  async function post(path, body) {
    const r = await fetch(API + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!r.ok) { let j = {}; try { j = await r.json(); } catch (e) {} const err = new Error(j.error || r.status); err.code = j.error || ""; throw err; }
    return r.json();
  }
  /* Cloudflare's free daily storage allowance ran out (resets 00:00 UTC): remember until then so the phone doesn't keep retrying */
  const HOLD_LS = "nxs-push-hold";
  const nextUtcDay = () => { const d = new Date(); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 10); };
  const onHold = () => { try { return +localStorage.getItem(HOLD_LS) > Date.now(); } catch (e) { return false; } };
  let syncErr = false, synced = null, testPending = null, syncing = false;   // synced = { n, at } after the server confirmed the list
  async function sync() {
    const sub = await getSub();
    if (!sub) return;
    const now = Date.now();
    const utcHM = (t) => new Date(t).toISOString().slice(11, 16);
    const list = timers.filter((x) => x.at > now).map((x) => x.cat === "appt" && x.book
        ? { id: x.id, at: x.at, title: T("bookT").replace("{name}", subName(x.sub)), body: T("bookB").replace("{t}", utcHM(x.slot)).replace("{what}", x.what || "") }
        : x.cat === "appt"
        ? { id: x.id, at: x.at, title: T(x.before ? "apTitle" : "apNow").replace("{e}", SUBS.appt[x.sub] || "📅").replace("{name}", subName(x.sub)).replace("{n}", x.before), body: T("stackBody").replace("{t}", utcHM(x.slot)).replace("{list}", (T("stack")[x.sub] || []).join(" · ")).slice(0, 200) }
        : x.cat === "donate" ? { id: x.id, at: x.at, title: `🤝 ${T("cats").donate}`, body: `${T("cats").donate} ${T("dnFull")}` }
        : x.cat === "fountain" ? { id: x.id, at: x.at, title: `💧 ${T("cats").fountain}`, body: `${T("cats").fountain} ${T("fnFull")}` }
        : x.cat === "order" ? { id: x.id, at: x.at, title: `📜 ${subName(x.sub)}`, body: `${subName(x.sub)} ${T("ordReady")} 💡 ${ordTip(x.sub)}`.slice(0, 300) }
        : { id: x.id, at: x.at, title: `${CAT_EMOJI[x.cat] || "⏰"} ${labelOf(x)}`, body: `${labelOf(x)} ${T("body")}` })
      .concat(alertTimers(), adminTimers(), testPending && testPending.at > now ? [testPending] : []);
    let tok = null; try { tok = localStorage.getItem(DTOK); } catch (e) {}
    /* save Cloudflare's daily allowance: send only when the list (or the login) changed, or every 6 h to stay fresh */
    /* the signature ignores the wording: switching the site language must not rewrite anything on the server.
       Only a real edit (name, category, time) sends retext so the stored notification text is replaced. */
    const byId = new Map(timers.map((x) => [x.id, x]));
    const key = (x) => { const t = byId.get(x.id); return t ? [x.id, x.at, t.cat, t.sub || "", t.name || "", t.n || 0, t.na ? 1 : 0, t.before || 0, t.what || ""] : [x.id, x.at]; };
    const sig = JSON.stringify([sub.endpoint, tok ? 1 : 0, list.map(key)]);
    let last = {}; try { last = JSON.parse(localStorage.getItem("nxs-push-sig")) || {}; } catch (e) {}
    if (onHold()) { syncErr = "limit"; if (!view.hidden) render(); return; }
    if (last.s === sig && Date.now() - (last.t || 0) < 6 * 3600000 && !syncErr) {
      // nothing changed since the last send: no request — but remember that, or notifHtml() asks again on every draw (endless redraw loop: nothing could be tapped)
      if (!synced) { synced = { n: list.length, at: last.t || Date.now(), cached: true }; if (!view.hidden) render(); }
      return;
    }
    const retext = last.s !== sig;
    try { localStorage.setItem("nxs-push-sig", JSON.stringify({ s: sig, t: Date.now() })); } catch (e) {}
    try { const r = await post("/push/save", { sub: sub.toJSON(), timers: list, retext, ...(tok ? { token: tok } : {}) }); syncErr = false; synced = { n: r.n ?? list.length, at: Date.now(), devices: r.devices }; }
    catch (e) {
      syncErr = e.code === "db_limit" ? "limit" : true;
      try { localStorage.removeItem("nxs-push-sig"); if (syncErr === "limit") localStorage.setItem(HOLD_LS, String(nextUtcDay())); } catch (x) {}
    }
    if (!view.hidden) render();
  }

  /* ---------- 🔄 cloud sync: merge this device's ⏰ data with the person's saved copy on the server ---------- */
  let cloudTimer = null, cloud = { at: 0, err: "" };
  try { cloud.err = sessionStorage.getItem("nxs-login-error") || ""; sessionStorage.removeItem("nxs-login-error"); } catch (e) {}
  let dirty = false;
  function cloudSoon() { dirty = true; clearTimeout(cloudTimer); cloudTimer = setTimeout(cloudSync, 1200); }
  /* only looking (page opened / app brought back): at most once every 2 min, to spare Cloudflare's daily allowance */
  function cloudPeek() { let t = 0; try { t = +localStorage.getItem("nxs-sync-peek") || 0; } catch (e) {} if (Date.now() - t > 2 * 60000) cloudSync(); }
  async function cloudSync() {
    try { localStorage.setItem("nxs-sync-peek", String(Date.now())); } catch (e) {}
    dirty = false;
    let tok = null; try { tok = localStorage.getItem(DTOK); } catch (e) {}
    if (!tok) return;
    let r, j;
    try {
      r = await fetch(API + "/sync", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tok, state: { timers, del: meta.del, alerts, alertsAt: meta.alertsAt || 0, presets, presetsAt: meta.presetsAt || 0, ls: lsOut() } }) });
      j = await r.json();
    } catch (e) { cloud.err = "discord"; if (!view.hidden) render(); return; }
    if (!j.ok) {
      cloud.err = j.error || "discord";
      if (["logged_out", "no_access", "not_member"].includes(j.error)) { try { localStorage.removeItem(DTOK); } catch (e) {} }
      if (!view.hidden) render(); return;
    }
    const st = j.state || {};
    timers = Array.isArray(st.timers) ? st.timers : timers; lastIds = new Set(timers.map((x) => x.id));
    alerts = st.alerts || {}; presets = st.presets || {};
    meta = { del: st.del || {}, alertsAt: st.alertsAt || 0, presetsAt: st.presetsAt || 0, ls: meta.ls || {} };
    lsIn(st.ls);
    try {
      localStorage.setItem(DTOK, j.token); localStorage.setItem(DUSER, JSON.stringify(j.user || {}));
      localStorage.setItem(LS, JSON.stringify(timers)); localStorage.setItem(ALS, JSON.stringify(alerts)); localStorage.setItem(PRE_LS, JSON.stringify(presets));
    } catch (e) {}
    saveMeta(); cloud = { at: Date.now(), err: "" };
    pageStack(); sync();   // this device's notification list (it goes to all of this person's devices)
    if (!view.hidden) render();
  }
  function cloudHtml() {
    let tok = null, u = {}; try { tok = localStorage.getItem(DTOK); u = JSON.parse(localStorage.getItem(DUSER) || "{}"); } catch (e) {}
    const err = cloud.err ? `<div class="tm-err">${esc(T("cl_" + cloud.err) || T("cl_discord"))}</div>` : "";
    if (tok) {
      const t = cloud.at ? new Date(cloud.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "…";
      return `<div class="tm-note">${esc(T("clOn").replace("{name}", u.name || "Discord").replace("{t}", t))} <button type="button" class="tm-link" data-a="cloudnow">${esc(T("clNow"))}</button>${err}</div>`;
    }
    if (!isOfficer()) return err ? `<div class="tm-note">${err}</div>` : "";   // the Discord sync card is for officers
    const back = location.origin + location.pathname + location.search + location.hash;
    return `<div class="tm-note">${esc(T("clOff"))}<br><a class="tm-btn" style="display:inline-block;margin-top:6px;text-decoration:none" href="${esc(API + "/auth/discord/start?r=" + encodeURIComponent(back))}">${esc(T("clIn"))}</a>${err}</div>`;
  }

  /* ---------- the view (inside the AI panel, instead of the chat) ---------- */
  const st = document.createElement("style");
  st.textContent = `
    .tm-view{flex:1;overflow-y:auto;padding:12px;font-size:14.5px;line-height:1.5}
    .tm-view[hidden]{display:none}
    .tm-top{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .tm-top b{flex:1;font-size:16px}
    .tm-btn{border:1px solid var(--accent);background:transparent;color:var(--text);border-radius:14px;padding:6px 12px;font:inherit;font-size:13.5px;cursor:pointer}
    .tm-btn.main{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:700}
    .tm-note{background:var(--panel-2);border-radius:10px;padding:9px 11px;margin-bottom:10px;font-size:13.5px}
    .tm-note .tm-btn{margin-top:6px}
    .tm-row{display:flex;align-items:center;gap:8px;padding:9px 0;border-top:1px solid var(--rule)}
    .tm-row .tm-l{flex:1;min-width:0}
    .tm-row .tm-c{font-variant-numeric:tabular-nums;font-weight:700}
    .tm-row .tm-a{color:var(--text-muted);font-size:12.5px}
    .tm-row.done .tm-c{color:var(--accent)}
    .tm-x{border:0;background:transparent;color:var(--text-muted);font-size:18px;cursor:pointer;padding:2px 6px}
    .tm-cats{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}
    .tm-cats .tm-btn.on{background:var(--accent);color:var(--accent-ink)}
    .tm-in{width:100%;box-sizing:border-box;padding:8px 10px;font-size:16px;border:1px solid var(--rule);border-radius:8px;background:var(--panel-2);color:var(--text);margin-bottom:6px}
    .tm-hint{color:var(--text-muted);font-size:12.5px;margin:-2px 0 8px}
    .tm-err{color:#c0392b;font-size:13px;margin-bottom:6px}
    .tm-acts{display:flex;gap:8px;margin-top:6px}
    .tm-sg{border:1px solid var(--accent)}
    .tm-page{max-width:820px;margin:10px auto 0;padding:0 12px}.tm-page .tm-note{background:var(--panel-2);border-radius:12px;padding:10px 14px;margin-bottom:10px;font-size:14.5px}
    .tm-page .tm-hint{color:var(--text-muted);font-size:13px}
    .tm-ib{display:block;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--border,rgba(127,127,127,.25));color:inherit;font:inherit;padding:8px 0;cursor:pointer}
    .tm-ib span{display:block;font-size:13.5px;margin-top:2px;white-space:pre-line}.tm-ib small{display:block;color:var(--text-muted);font-size:12px;margin-top:2px}
    .tm-stk{display:flex;gap:8px;align-items:flex-start;padding:3px 0;font-size:14px}.tm-stk input{margin-top:3px;width:17px;height:17px}
    .tm-ap{display:flex;flex-direction:column;gap:8px;margin:4px 0 6px}.tm-ap label{display:flex;flex-direction:column;gap:3px;font-size:13px;color:var(--text-muted)}.tm-ap .tm-sel{font-size:15px;padding:7px 8px}
    .tm-quick{background:var(--panel-2);border-radius:10px;padding:9px 11px;margin-bottom:10px}
    .tm-qc{display:inline-flex;align-items:center}.tm-qc .tm-x{font-size:14px;padding:2px 4px}
    .tm-ok{color:#2e7d32;font-size:13px;margin-top:6px;font-weight:600}
    .tm-link{border:0;background:none;padding:0;color:var(--accent);text-decoration:underline;font:inherit;cursor:pointer}
    .tm-alerts{margin-top:16px;padding-top:12px;border-top:2px solid var(--rule)}
    .tm-ev{padding:8px 0;border-top:1px solid var(--rule)}
    .tm-ev .tm-cats{margin:6px 0 2px;align-items:center}
    .tm-btn.on .tm-a{color:inherit}
    .tm-sel{padding:5px 8px;font:inherit;font-size:13px;border:1px solid var(--rule);border-radius:8px;background:var(--panel-2);color:var(--text)}
  `;
  document.head.appendChild(st);
  const view = document.createElement("div");
  view.className = "tm-view"; view.hidden = true; view.dir = "auto";
  const log = panel.querySelector("#aiLog"), form = panel.querySelector("#aiForm");
  log.after(view);
  // ⏰ in the panel header
  const headBtn = document.createElement("button");
  headBtn.type = "button"; headBtn.textContent = "⏰"; headBtn.onclick = () => show(!view.hidden ? false : true);
  panel.querySelector("#aiClear").before(headBtn);

  let adding = null;   // { cat, rows: [""], name: "" } while the "set a timer" form is open
  let tick = null;
  function show(on, startAdding) {
    view.hidden = !on; log.hidden = on; form.hidden = on;
    log.style.display = on ? "none" : ""; form.style.display = on ? "none" : "";
    clearInterval(tick);
    if (on) {
      if (startAdding && !adding) adding = { cat: null, rows: [""], name: "" };
      // if drawing the list fails, show why (and a way back) instead of an empty panel
      render().catch((e) => { view.innerHTML = `<div class="tm-top"><b>${esc(T("title"))}</b><button type="button" class="tm-btn" data-a="chat">${esc(T("chat"))}</button></div><div class="tm-note">⚠️ ${esc(String(e && e.stack || e).slice(0, 400))}</div>`; });
      tick = setInterval(renderList, 1000);
    }
    else adding = null;
  }

  async function notifHtml() {
    if (!canPush()) return `<div class="tm-note">${esc(isIOS && !standalone() ? T("ios") : T("noPush"))}<br><span class="tm-a">${esc(T("local"))}</span></div>`;
    if (Notification.permission === "denied") return `<div class="tm-note">${esc(T("blocked"))}</div>`;
    const sub = Notification.permission === "granted" ? await getSub() : null;
    if (sub) {
      if (!synced && !syncErr && !syncing) { syncing = true; sync().finally(() => { syncing = false; }); }   // first look: ask the server so the line below is filled in
      const ok = synced && !syncErr ? `<div class="tm-ok">${esc(T("synced").replace("{n}", synced.n).replace("{t}", new Date(synced.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })))}</div>` : "";
      return `<div class="tm-note">${esc(T("on"))} ${testPending && testPending.at > Date.now() ? `<div class="tm-hint">${esc(T("testWait"))}</div>` : `<button type="button" class="tm-btn" data-a="test">${esc(T("test"))}</button>`}${ok}${syncErr ? `<div class="tm-err">${esc(T(syncErr === "limit" ? "limitHold" : "fail"))}</div>` : ""}</div>`;
    }
    return `<div class="tm-note">${esc(T("local"))}<br><button type="button" class="tm-btn main" data-a="sub">${esc(T("turnOn"))}</button></div>`;
  }
  function listHtml() {
    prune();
    const now = Date.now(), L = timers.slice().sort((a, b) => a.at - b.at);
    if (!L.length) return `<div class="tm-a" style="padding:6px 0">${esc(T("empty"))}</div>`;
    return L.map((x) => `<div class="tm-row${x.at <= now ? " done" : ""}"><span>${CAT_EMOJI[x.cat] || "⏰"}</span>
      <div class="tm-l"><div dir="auto">${esc(x.cat === "appt" ? (x.book ? T("bookT").replace("{name}", subName(x.sub)).replace(/^📅 /, "") : subName(x.sub)) : labelOf(x))}${APPT_FOR[x.cat] && x.at > now ? ` <button type="button" class="tm-link" data-sgfor="${esc(x.id)}">${esc(T("sgLink"))}</button>` : ""}</div><div class="tm-a">${esc(x.cat === "appt" ? T("apStarts").replace("{t}", `${fmtAt(x.slot)} (${new Date(x.slot).toISOString().slice(11, 16)} UTC)`) : T("at").replace("{t}", fmtAt(x.at)))}</div></div>
      <span class="tm-c" dir="ltr">${x.at <= now ? esc(T("done")) : fmtLeft(x.at - now)}</span>
      <button type="button" class="tm-x" data-del="${esc(x.id)}" aria-label="✕">✕</button></div>`).join("");
  }
  function addHtml() {
    if (!adding) return `<button type="button" class="tm-btn main" data-a="add">${esc(T("add"))}</button>`;
    const cats = Object.keys(CAT_EMOJI).filter((c) => c !== "intel").map((c) => `<button type="button" class="tm-btn${adding.cat === c ? " on" : ""}" data-cat="${c}">${CAT_EMOJI[c]} ${esc(T("cats")[c])}</button>`).join("");
    let h = `<div class="tm-note"><b>${esc(T("what"))}</b><div class="tm-cats">${cats}</div>`;
    if (adding.cat) {
      if (adding.cat === "other") h += `<input class="tm-in" data-name placeholder="${esc(T("name"))}" value="${esc(adding.name)}" dir="auto">`;
      if (SUBS[adding.cat]) {
        const S = SUBS[adding.cat];
        h += `<b>${esc(T("subQ")[adding.cat])}</b><div class="tm-cats">${Object.keys(S).map((k) => `<button type="button" class="tm-btn${adding.sub === k ? " on" : ""}" data-sub="${k}">${S[k]} ${esc(subName(k))}</button>`).join("")}</div>`;
        if (!adding.sub) return h + `<div class="tm-acts"><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div></div>`;
      }
      if (adding.cat === "appt") return h + apptForm() + `</div>`;
      if (adding.cat === "train") {
        if (adding.na == null) adding.na = naLive();
        h += `<div class="tm-cats"><button type="button" class="tm-btn${adding.na ? " on" : ""}" data-a="na">🎖️ ${esc(T("naOn"))}</button></div><div class="tm-hint" style="margin-top:-4px">${esc(T("naHint"))}</div>`;
      }
      const pk2 = preKey(adding.cat, adding.sub, adding.name, adding.na), last = PRESET_CATS.includes(adding.cat) ? (presets[pk2] ?? (adding.cat === "gather" ? presets[preKey("gather", "", "", 0)] : null)) : null;
      const lastArr = last == null ? [] : Array.isArray(last) ? last : [last];
      if (lastArr.length && adding.rows.every((v) => !v) && adding.prefilled !== pk2) { adding.rows = lastArr.map(fmtLeft); adding.prefilled = pk2; }
      if (adding.cat === "donate") {   // 🤝 Alliance Tech contribution: +1 attempt every 10 min, max 25
        if (adding.dn == null) adding.dn = 0;
        if (adding.rows.every((v) => !v) && adding.prefilled !== "donate") { adding.rows = [fmtLeft((25 - adding.dn) * 600000)]; adding.prefilled = "donate"; }
        h += `<div class="tm-hint" style="margin:-2px 0 8px">💡 ${esc(T("dnTip"))}</div><b>${esc(T("dnNow"))}</b><input class="tm-in" data-dn type="number" min="0" max="25" inputmode="numeric" value="${adding.dn}" dir="ltr"><b>${esc(T("left"))}</b>`;
      } else if (adding.cat === "fountain") {   // 💧 Water Essence stops filling after 12 h at every level
        if (adding.rows.every((v) => !v) && adding.prefilled !== "fountain") { adding.rows = [fmtLeft(12 * 3600000)]; adding.prefilled = "fountain"; }
        h += `<div class="tm-hint" style="margin:-2px 0 8px">💡 ${esc(T("fnTip"))}</div><b>${esc(T("left"))}</b><div class="tm-hint">${esc(T("fnHint"))}</div>`;
      } else if (adding.cat === "order") {
        const cd = ORD_CD[adding.sub] * 3600000, ok = "order|" + adding.sub;
        if (adding.rows.every((v) => !v) && adding.prefilled !== ok) { adding.rows = [fmtLeft(cd)]; adding.prefilled = ok; }
        h += `<div class="tm-hint" style="margin:-2px 0 8px">💡 ${esc(ordTip(adding.sub))}</div><b>${esc(T("left"))}</b><div class="tm-hint">${esc(T("ordHint").replace("{cd}", fmtLeft(cd)))}</div>`;
      } else
      h += `<b>${esc(T("left"))}</b><div class="tm-hint">${esc(lastArr.length ? T("lastTime").replace("{t}", lastArr.map(fmtLeft).join(" · ")) : T("hint"))}</div>`;
      h += adding.rows.map((v, i) => `<input class="tm-in" data-row="${i}" inputmode="text" autocomplete="off" placeholder="${MULTI[adding.cat] ? `#${i + 1}  ` : ""}2:45:12" value="${esc(v)}" dir="ltr">`).join("");
      if (MULTI[adding.cat] && adding.rows.length < MULTI[adding.cat]) h += `<button type="button" class="tm-btn" data-a="row">${esc(T(adding.cat === "build" ? "builder" : "another"))}</button>`;
      if (adding.err) h += `<div class="tm-err">${esc(T("bad"))}</div>`;
      h += `<div class="tm-acts"><button type="button" class="tm-btn main" data-a="save">${esc(T("save"))}</button><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div>`;
    } else h += `<div class="tm-acts"><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div>`;
    return h + `</div>`;
  }
  /* 📅 Appointment: Chief Minister / Noble Advisor are 30-min slots booked ahead (UTC, on :00 or :30) */
  function apptForm() {
    // the game only lets you book within the next 24 h → the next 48 half-hour slots
    const now = Date.now(), first = Math.ceil(now / 18e5) * 18e5;
    const slots = Array.from({ length: 48 }, (_, i) => first + i * 18e5);
    if (adding.apAt == null || !slots.includes(adding.apAt)) adding.apAt = slots[0];
    if (adding.apBefore == null) adding.apBefore = 5;
    const today = new Date(now).toISOString().slice(0, 10);
    const lab = (t) => { const iso = new Date(t).toISOString(), day = iso.slice(0, 10) === today ? T("apToday") : new Date(t).toLocaleDateString([], { weekday: "short", timeZone: "UTC" });
      return `${day} ${iso.slice(11, 16)} UTC (${new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`; };
    const opts = slots.map((t) => `<option value="${t}"${t === adding.apAt ? " selected" : ""}>${esc(lab(t))}</option>`).join("");
    const bf = [0, 1, 3, 5, 10, 15, 30].map((m) => `<option value="${m}"${m === adding.apBefore ? " selected" : ""}>${esc(m ? T("before").replace("{n}", m) : T("atTime"))}</option>`).join("");
    return `<div class="tm-ap"><label>${esc(T("apTime"))}<select class="tm-sel" data-ap="at">${opts}</select></label>
      <label>${esc(T("apRemind"))}<select class="tm-sel" data-ap="before">${bf}</select></label></div>
      ${adding.err ? `<div class="tm-err">${esc(T("bad"))}</div>` : ""}
      <div class="tm-acts"><button type="button" class="tm-btn main" data-a="save">${esc(T("save"))}</button><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div>`;
  }

  let pushOn = false;   // set by render(): this phone has notifications on
  function alertsHtml() {
    const loc = (h, m = 0) => new Date(Date.UTC(2000, 0, 1, 0, Math.round(h * 60) + m)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nextOf = (k) => { const x = alertTimers().find((t) => t.id.startsWith(`ev-${k}-`));
      return x ? `<div class="tm-a">${esc(T("next").replace("{t}", fmtAt(x.at)))}</div>` : ""; };
    const rows = DEFS.map((d) => {
      const k = d.k, a = alerts[k] || {}, H = hoursOf(d);
      if (!H.length || (d.kind === "event" && !evSched(k))) return "";
      const any = H.some((h, i) => isOn(a, i, h)), bf = beforeOf(d);
      const lab = (h) => h === 24 ? `${esc(T("reset"))} <span class="tm-a">(${loc(0)})</span>` : `${fmtH(h)} UTC <span class="tm-a">(${loc(h)})</span>`;
      const btLink = k === "bear-hunt" ? ` <a class="tm-link" href="./bear-calculator.html">${esc(T("btLink"))}</a>` : "";
      return `<div class="tm-ev"><div><b>${evEmoji(k)} ${esc(evName(k))}</b>${btLink}</div><div class="tm-cats">
        ${H.map((h, i) => `<button type="button" class="tm-btn${isOn(a, i, h) ? " on" : ""}" data-al="${k}:${i}" data-h="${h}">${lab(h)}</button>`).join("")}
        <select class="tm-sel" data-before="${k}">${BEFORE.map((m) => `<option value="${m}"${bf === m ? " selected" : ""}>${esc(m ? T("before").replace("{n}", m) : T("atTime"))}</option>`).join("")}</select></div>${any ? nextOf(k) : ""}</div>`;
    }).join("");
    return `<div class="tm-alerts"><b>${esc(T("alerts"))}</b><div class="tm-hint" style="margin-top:2px">${esc(T("alertsNote"))}</div>${pushOn ? "" : `<div class="tm-err">${esc(T("needOn"))}</div>`}${rows}<div class="tm-hint">${esc(T("alertsSync"))}</div></div>`;
  }
  function adminHtml() {
    if (!isOfficerUser()) return "";   // members never see the 🛠️ officer to-dos
    const a = alerts.admin || {}, d = adminData(), h = a.hour ?? 0;
    const loc = (x) => new Date(Date.UTC(2000, 0, 1, x)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    let body = "";
    if (!d) body = `<div class="tm-hint">${esc(T("adminNone"))}</div>`;
    else {
      const next = adminTimers().slice(0, 4);
      body = `<div class="tm-cats"><button type="button" class="tm-btn${a.on ? " on" : ""}" data-a="admin">${esc(T("adminOn"))}</button>
        <select class="tm-sel" data-hour="1">${Array.from({ length: 24 }, (_, i) => `<option value="${i}"${h === i ? " selected" : ""}>${esc(T("adminAt").replace("{t}", String(i).padStart(2, "0") + ":00"))} (${loc(i)})</option>`).join("")}</select></div>`
        + (a.on ? (next.length ? next.map((x, i) => `<div class="tm-a">• ${esc(fmtAt(x.at))} — ${esc(x.title.replace(/^🛠️ /, ""))}</div>`).join("") : `<div class="tm-a">${esc(T("adminEmpty"))}</div>`) : "")
        + `<div class="tm-hint" style="margin-top:4px">${esc(T("adminUpd").replace("{t}", fmtAt(d.updated)))}</div>`;
    }
    return `<div class="tm-alerts"><b>${esc(T("admin"))}</b><div class="tm-hint" style="margin-top:2px">${esc(T("adminNote"))}</div>${body}</div>`;
  }
  view.addEventListener("change", (e) => {
    if (e.target.dataset.stk) { if (e.target.checked) stackDone[e.target.dataset.stk] = 1; else delete stackDone[e.target.dataset.stk];
      try { sessionStorage.setItem(STK, JSON.stringify(stackDone)); } catch (err) {} if (pageBox) pageBox.innerHTML = stackHtml(); return; }
    if (e.target.dataset.ap && adding) {
      const k = e.target.dataset.ap, v = +e.target.value;
      if (k === "at") adding.apAt = v; else adding.apBefore = v;
      adding.err = false; return render();
    }
    if (e.target.dataset.hour) { (alerts.admin = alerts.admin || {}).hour = +e.target.value; saveAlerts(); render(); sync(); return; }
    const k = e.target.dataset.before; if (!k) return;
    (alerts[k] = alerts[k] || {}).before = +e.target.value; saveAlerts(); render(); sync();
  });
  setInterval(pageStack, 30000);
  setTimeout(pageStack, 800);
  async function render() {
    pageStack();
    pushOn = canPush() && Notification.permission === "granted" && !!(await getSub());
    const n = await notifHtml();
    view.innerHTML = `<div class="tm-top"><b>${esc(T("title"))}</b><button type="button" class="tm-btn" data-a="chat">${esc(T("chat"))}</button></div>
      ${n}${cloudHtml()}${stackHtml()}${suggHtml()}${quickHtml()}<div id="tmAdd">${addHtml()}</div><div id="tmList" style="margin-top:10px">${listHtml()}</div>${alertsHtml()}${adminHtml()}`;
    const first = view.querySelector("[data-name]") || view.querySelector('[data-row="0"]');
    if (first && adding && adding.focus) { first.focus(); adding.focus = false; }
  }
  function renderList() { const el = view.querySelector("#tmList"); if (el) el.innerHTML = listHtml(); }

  view.addEventListener("input", (e) => {
    if (!adding) return;
    if (e.target.dataset.row != null) adding.rows[+e.target.dataset.row] = e.target.value;
    if (e.target.hasAttribute("data-name")) adding.name = e.target.value;
    if (e.target.hasAttribute("data-dn")) {   // 🤝 attempts now → time until 25
      const n = Math.max(0, Math.min(25, parseInt(e.target.value, 10) || 0)); adding.dn = n;
      adding.rows = [fmtLeft((25 - n) * 600000)]; const r = view.querySelector('[data-row="0"]'); if (r) r.value = adding.rows[0];
    }
  });
  view.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.classList.contains("tm-in")) { e.preventDefault(); saveAdding(); } });
  view.addEventListener("click", async (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const a = b.dataset.a;
    if (b.dataset.del) { timers = timers.filter((x) => x.id !== b.dataset.del); store(); renderList(); pageStack(); sync(); return; }
    if (b.dataset.sg) { if (b.dataset.sg === "no") { sugg = null; return render(); } return acceptSugg(b.dataset.sg); }
    if (b.dataset.sgfor) { sugg = b.dataset.sgfor; view.scrollTop = 0; return render(); }
    if (b.dataset.quick) { const [cat, sub, name, na] = b.dataset.quick.split("|"); const v = presets[b.dataset.quick]; if (v) createTimers(cat, sub, name, Array.isArray(v) ? v : [v], na === "na"); return; }
    if (a === "na") { adding.na = !adding.na; if (adding.prefilled) { adding.rows = [""]; adding.prefilled = null; } return render(); }
    if (b.dataset.forget) { delete presets[b.dataset.forget]; savePre(); return render(); }
    if (b.dataset.cat) { adding.cat = b.dataset.cat; adding.sub = null; adding.na = null; adding.rows = adding.prefilled ? [""] : adding.rows.slice(0, MULTI[adding.cat] || 1); adding.prefilled = null; adding.err = false; adding.focus = true; return render(); }
    if (b.dataset.sub) { if (adding.prefilled) { adding.rows = [""]; adding.prefilled = null; } adding.sub = b.dataset.sub; adding.focus = true; return render(); }
    if (b.dataset.al) {   // event alert time toggles: "bear-hunt:13", "arena"
      const [k, i] = b.dataset.al.split(":"), h = b.dataset.h;
      const a = (alerts[k] = alerts[k] || {}), cur = isOn(a, +i, h);
      a.on = a.on || {}; a.on["#" + i] = !cur; delete a.on[h];
      saveAlerts(); render(); sync(); return;
    }
    if (a === "chat") return show(false);
    if (a === "add") { adding = { cat: null, rows: [""], name: "" }; return render(); }
    if (a === "cancel") { adding = null; return render(); }
    if (a === "row") { adding.rows.push(""); render().then(() => { const el = view.querySelector(`[data-row="${adding.rows.length - 1}"]`); if (el) el.focus(); }); return; }
    if (a === "save") return saveAdding();
    if (a === "sub") { b.disabled = true; try { await subscribe(); } catch (err) {} await sync(); return render(); }
    if (a === "cloudnow") { b.disabled = true; return cloudSync(); }
    if (a === "admin") { const x = (alerts.admin = alerts.admin || {}); x.on = !x.on; saveAlerts(); render(); sync(); return; }
    if (a === "test") {
      b.disabled = true;
      const sub = await getSub();
      // arrives in 15 s, so there's time to leave the app and see the notification + the red badge on the icon
      testPending = { id: "test-" + Math.random().toString(36).slice(2, 8), at: Date.now() + 15000, title: "NXS ⏰", body: T("testMsg") };
      if (sub) await sync();
      render(); setTimeout(() => { if (!view.hidden) render(); }, 16000); return;
    }
  });
  /* ⚡ last time used per kind (e.g. Training · Infantry → 2:24:07), so the same timer starts again with one tap */
  const PRE_LS = "nxs-timer-presets";
  let presets = {};
  try { presets = JSON.parse(localStorage.getItem(PRE_LS)) || {}; } catch (e) {}
  const savePre = () => { try { localStorage.setItem(PRE_LS, JSON.stringify(presets)); } catch (e) {} meta.presetsAt = Date.now(); saveMeta(); cloudSoon(); };
  const PRESET_CATS = ["train", "gather"];   // only these change little from one time to the next
  // Training remembers two times per troop type: with 🎖️ Noble Advisor on, and without
  const preKey = (cat, sub, name, na) => [cat, sub || "", cat === "other" ? (name || "").trim().toLowerCase() : "", cat === "train" && na ? "na" : ""].join("|");
  const naLive = () => { const now = Date.now(); return timers.some((x) => x.cat === "appt" && !x.book && x.sub === "advisor" && x.slot - (x.before || 0) * 6e4 <= now && now < x.slot + 18e5); };
  /* 💡 a Research / Building / Training timer → which appointment slot to book so the NEXT one starts with the buff */
  const APPT_FOR = { build: "minister", research: "minister", train: "advisor" };
  let sugg = null;   // id of the timer the suggestion card is about
  function suggestion(x) {
    const pos = APPT_FOR[x.cat]; if (!pos) return null;
    // the slot that holds the finish time, or the next one if fewer than 10 min of it would be left
    let slot = Math.floor(x.at / 18e5) * 18e5; if (slot + 18e5 - x.at < 6e5) slot += 18e5;
    return { pos, slot, open: slot - 864e5, bookable: slot - 864e5 <= Date.now() };
  }
  /* during a booked slot: a checklist of the buffs to stack (ticks are kept on this phone) */
  const STK = "nxs-stack-done";
  let stackDone = {}; try { stackDone = JSON.parse(sessionStorage.getItem(STK)) || {}; } catch (e) {}
  function stackHtml() {
    const now = Date.now();
    const live = timers.filter((x) => x.cat === "appt" && !x.book && x.slot - (x.before || 0) * 6e4 <= now && now < x.slot + 18e5);
    return live.map((x) => { const steps = T("stack")[x.sub] || [], end = new Date(x.slot + 18e5).toISOString().slice(11, 16);
      return `<div class="tm-note tm-sg"><b>${esc(T("stackT").replace("{e}", SUBS.appt[x.sub] || "📅").replace("{name}", subName(x.sub)).replace("{t}", end))}</b><div class="tm-hint" style="margin:2px 0 4px">${esc(T("stackHint"))}</div>` +
        steps.map((t, i) => { const k = `${x.id}-${i}`; return `<label class="tm-stk"><input type="checkbox" data-stk="${k}"${stackDone[k] ? " checked" : ""}> <span>${esc(t)}</span></label>`; }).join("") + `</div>`; }).join("");
  }
  /* the same checklist also sits at the top of the page (main site / officer page) while a slot is on */
  let pageBox = null;
  function pageStack() {
    const html = stackHtml();
    if (!html) { if (pageBox) { pageBox.remove(); pageBox = null; } return; }
    if (!pageBox) {
      pageBox = document.createElement("div"); pageBox.className = "tm-page";
      const doc = document.getElementById("doc"), main = document.getElementById("main");
      if (doc) doc.before(pageBox); else if (main) main.prepend(pageBox); else document.body.prepend(pageBox);
      pageBox.addEventListener("change", (e) => { const k = e.target.dataset.stk; if (!k) return;
        if (e.target.checked) stackDone[k] = 1; else delete stackDone[k];
        try { sessionStorage.setItem(STK, JSON.stringify(stackDone)); } catch (err) {} if (!view.hidden) render(); });
    }
    if (!pageBox.contains(document.activeElement)) pageBox.innerHTML = html;
  }
  function suggHtml() {
    const x = sugg && timers.find((t) => t.id === sugg), sg = x && suggestion(x);
    if (!sg || x.at <= Date.now()) return "";
    const hm = (t) => new Date(t).toISOString().slice(11, 16), what = labelOf(x);
    const txt = (sg.bookable ? T("sgNow") : T("sgLater")).replace("{what}", what).replace("{when}", fmtAt(x.at)).replace("{slot}", hm(sg.slot)).replace("{open}", `${fmtAt(sg.open)} (${hm(sg.open)} UTC)`);
    return `<div class="tm-note tm-sg"><b>${esc(T("sgT").replace("{pos}", subName(sg.pos)))}</b><div style="margin:4px 0 6px">${esc(txt)}</div>
      <div class="tm-acts"><button type="button" class="tm-btn main" data-sg="${sg.bookable ? "slot" : "book"}">${esc(T(sg.bookable ? "sgRemind" : "sgBook"))}</button><button type="button" class="tm-btn" data-sg="no">${esc(T("sgNo"))}</button></div></div>`;
  }
  function acceptSugg(kind) {
    const x = timers.find((t) => t.id === sugg), sg = x && suggestion(x); sugg = null;
    if (!sg) return render();
    const base = { id: Math.random().toString(36).slice(2, 10), cat: "appt", sub: sg.pos, slot: sg.slot, what: labelOf(x) };
    if (kind === "slot") timers.push({ ...base, before: 5, at: Math.max(sg.slot - 3e5, Date.now() + 5000) });
    else timers.push({ ...base, book: true, before: 0, at: Math.max(sg.open, Date.now() + 5000) });
    store(); render(); sync();
  }
  function createTimers(cat, sub, name, ms, na) {
    const now = Date.now(), numbered = !!MULTI[cat];
    // gathering marches / builders are numbered after the ones already running
    const used = timers.filter((x) => x.cat === cat && x.at > now).map((x) => x.n || 0);
    const number = numbered && (ms.length > 1 || used.length);
    let n = number ? Math.max(0, ...used) : 0;
    ms.forEach((d) => timers.push({ id: Math.random().toString(36).slice(2, 10), cat, name: cat === "other" ? (name || "").trim().slice(0, 40) : "",
      sub: SUBS[cat] ? sub : "", n: number ? ++n : 0, at: now + d, ...(cat === "train" && na ? { na: 1 } : {}) }));
    // Training: one time per troop type · Gathering: the whole set of marches
    if (PRESET_CATS.includes(cat) && (ms.length === 1 || cat === "gather")) { presets[preKey(cat, sub, name, na)] = cat === "gather" ? ms.slice() : ms[0]; savePre(); }
    if (APPT_FOR[cat]) sugg = timers[timers.length - 1].id;   // show the 💡 slot suggestion for it
    store(); render(); sync();
  }
  function saveAdding() {
    if (adding.cat === "appt") {
      const slot = adding.apAt, at = slot - adding.apBefore * 60000;
      if (!adding.sub || slot <= Date.now()) { adding.err = true; return render(); }
      timers.push({ id: Math.random().toString(36).slice(2, 10), cat: "appt", sub: adding.sub, slot, before: adding.apBefore, at: Math.max(at, Date.now() + 5000) });
      adding = null; store(); render(); sync(); return;
    }
    const rows = adding.rows.map((v) => v.trim()).filter(Boolean);
    const ms = rows.map(parseLeft);
    if (!rows.length || ms.some((x) => !x || x > 30 * 86400000)) { adding.err = true; return render(); }
    const a = adding; adding = null;
    createTimers(a.cat, a.sub, a.name, ms, a.na);
  }
  function quickHtml() {
    const keys = Object.keys(presets).filter((k) => PRESET_CATS.includes(k.split("|")[0]));
    const show = (v) => (Array.isArray(v) ? v : [v]).map(fmtLeft).join(" · ");
    if (!keys.length) return "";   // stays visible while the "set a timer" form is open
    return `<div class="tm-quick"><b>${esc(T("quick"))}</b><div class="tm-hint" style="margin:1px 0 6px">${esc(T("quickHint"))}</div><div class="tm-cats">` +
      keys.map((k) => { const [cat, sub, name, na] = k.split("|"), lab = labelOf({ cat, sub, name }) + (na === "na" ? " 🎖️" : "");
        return `<span class="tm-qc"><button type="button" class="tm-btn" data-quick="${esc(k)}">${CAT_EMOJI[cat]} ${esc(lab)}${Array.isArray(presets[k]) && presets[k].length > 1 ? ` ×${presets[k].length}` : ""} · <b dir="ltr">${esc(show(presets[k]))}</b> ▶</button><button type="button" class="tm-x" data-forget="${esc(k)}" title="${esc(T("forget"))}" aria-label="${esc(T("forget"))}">✕</button></span>`; }).join("") +
      `</div></div>`;
  }


  /* the "⏰ Set a timer" chip at the top of the chat greeting */
  function addChip() {
    const g = panel.querySelector("#aiGreet"); if (!g || g.querySelector(".tm-chip")) return;
    const box = g.querySelector(".ai-chips");
    const b = document.createElement("button");
    b.type = "button"; b.className = "ai-chip tm-chip"; b.textContent = T("chip");
    b.onclick = () => show(true, true);
    if (box) box.prepend(b); else g.appendChild(b);
  }
  addChip();
  window.addEventListener("nxs-ai-lang", () => { addChip(); headBtn.title = T("title"); if (!view.hidden) render(); });
  headBtn.title = T("title");

  /* tapping a notification opens the site with ?timers (or messages an already-open tab) */
  const openTimers = () => { NXSAI.open(); show(true); };
  if (/[?&]timers\b/.test(location.search)) {
    setTimeout(openTimers, 600);
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {}
  }
  if (navigator.serviceWorker) navigator.serviceWorker.addEventListener("message", (e) => { if (e.data && e.data.nxs === "open-timers") openTimers(); if (e.data && e.data.nxs === "inbox") inbox(); });
  // the officer page doesn't register the service worker itself (an officer-only Home Screen app needs it for push + the badge)
  if (navigator.serviceWorker) navigator.serviceWorker.getRegistration().then((r) => r || navigator.serviceWorker.register("sw.js")).catch(() => {});

  /* 🔔 reminders that arrived (kept by sw.js for 24 h): a card at the top of the page; seeing it clears the red badge on the app icon */
  const IB = "nxs-inbox", IB_KEY = new URL("./__inbox", navigator.serviceWorker && navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : location.href).href;
  let ibBox = null;
  async function inbox() {
    if (!window.caches) return;
    let list = [];
    try { const r = await (await caches.open(IB)).match(IB_KEY); list = r ? await r.json() : []; } catch (e) {}
    list = (Array.isArray(list) ? list : []).filter((x) => Date.now() - x.at < 864e5);
    if (!list.length) { ibTitle(0); if (ibBox) { ibBox.remove(); ibBox = null; } return; }
    if (!ibBox) {
      ibBox = document.createElement("div"); ibBox.className = "tm-page";
      if (pageBox) pageBox.before(ibBox); else { const doc = document.getElementById("doc"), main = document.getElementById("main"); if (doc) doc.before(ibBox); else if (main) main.prepend(ibBox); else document.body.prepend(ibBox); }
      ibBox.addEventListener("click", async (e) => {
        const a = e.target.closest("[data-ib]"); if (!a) return;
        if (a.dataset.ib === "clear") { try { await (await caches.open(IB)).delete(IB_KEY); } catch (err) {} try { navigator.clearAppBadge && navigator.clearAppBadge(); } catch (err) {} return inbox(); }
        const it = list.find((x) => x.id === a.dataset.ib); if (!it) return;
        list = list.filter((x) => x !== it); await ibSave(list);
        const u = new URL(it.url, IB_KEY);
        const pth = (x) => x.replace(/index\.html$/, "");
        if (/[?&]timers\b/.test(u.search) && pth(u.pathname) === pth(location.pathname)) { openTimers(); inbox(); } else location.href = u.href;
      });
    }
    const ago = (t) => { const m = Math.round((Date.now() - t) / 6e4); return m < 60 ? m + " min" : Math.floor(m / 60) + " h"; };
    ibBox.innerHTML = `<div class="tm-note tm-sg"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b>${esc(T("ibT").replace("{n}", list.length))}</b><button type="button" class="tm-btn" data-ib="clear">${esc(T("ibClear"))}</button></div>` +
      list.slice().sort((a, b) => b.at - a.at).map((x) => `<button type="button" class="tm-ib" data-ib="${esc(x.id)}"><b>${esc(x.title)}</b>${x.body ? `<span>${esc(x.body)}</span>` : ""}<small>${esc(T("ibAgo").replace("{t}", ago(x.at)))} ›</small></button>`).join("") + `</div>`;
    if (list.some((x) => !x.seen) && document.visibilityState === "visible") ibSave(list.map((x) => ({ ...x, seen: 1 })));   // on screen now → red badge off
    // computer browser tab in the background: "(2) NXS …" in the tab title until it's looked at
    const unseen = list.filter((x) => !x.seen).length;
    ibTitle(document.visibilityState === "visible" ? 0 : unseen);
  }
  const ibTitle = (n) => { const t = document.title.replace(/^\(\d+\) /, ""); document.title = n ? `(${n}) ${t}` : t; };
  async function ibSave(list) {
    try { await (await caches.open(IB)).put(IB_KEY, new Response(JSON.stringify(list), { headers: { "Content-Type": "application/json" } })); } catch (e) {}
    try { const n = list.filter((x) => !x.seen).length; if (n && navigator.setAppBadge) navigator.setAppBadge(n); else if (navigator.clearAppBadge) navigator.clearAppBadge(); } catch (e) {}
  }
  setTimeout(inbox, 900);
  setTimeout(cloudPeek, 700);
  window.addEventListener("nxs-synced", () => pageStack());
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") inbox(); });
  // after coming back to the app, re-send the list once (keeps the server in step if a save failed)
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { prune(); store(); sync(); if (!view.hidden) render(); } });
  window.addEventListener("nxs-admin-todos", () => { if (alerts.admin && alerts.admin.on) sync(); if (!view.hidden) render(); });
  window.NXSTimers = { parseLeft, show, alertTimers };
})();
