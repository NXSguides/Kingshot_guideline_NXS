/* ---- ⏰ My timers: inside the AI panel. You type how much time is left in the game; your phone gets a
   notification when it's done, even with the game and the site closed (Web Push through the Cloudflare Worker).
   Timers are kept on this phone (localStorage); the Worker only gets the list so it knows when to send. ---- */
(function () {
  if (!window.NXSAI) return;
  /* testing phase: only for phones that opened the site once with ?timers, or browsers with the officer login */
  const BETA = "nxs-timers-beta";
  let beta = false;
  try {
    if (/[?&]timers\b/.test(location.search)) localStorage.setItem(BETA, "1");
    beta = !!localStorage.getItem(BETA) || !!(JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").pw);
  } catch (e) {}
  if (!beta) return;
  const { panel } = NXSAI;
  const API = NXSAI.url;
  const VAPID = "BKb0YJxObHPh9_7b4ZriSZQeRk6TaojqNUvPBJe7J9aC_pVuXtmQRRWD11gDs6OJYj8Fg7jigPXDBOxZ5NQbP0o";
  const LS = "nxs-timers-v1";
  const KEEP_DONE_MS = 60 * 60 * 1000;   // a finished timer stays on the list (as "Done ✓") for an hour

  const TX = {
    en: { chip: "⏰ Set a timer", title: "⏰ My timers", chat: "‹ Chat", add: "＋ Set a timer", what: "What is it?", left: "Time left in the game", hint: "Type it as the game shows it, e.g. 2:45:12 or 3d 07:51:57",
      another: "＋ Another march", save: "Save", cancel: "Cancel", empty: "No timers yet.", done: "Done ✓", at: "done at {t}", bad: "Check the time — e.g. 2:45:12",
      on: "🔔 Notifications are on for this phone.", turnOn: "🔔 Turn on notifications", test: "Send a test", testMsg: "Notifications work! ✓",
      blocked: "Notifications are blocked. Allow them for this site in your phone's settings, then come back.",
      ios: "On iPhone, add the site to your Home Screen first: tap Share → “Add to Home Screen”, then open NXS from the new icon and come back here.",
      noPush: "This browser can't show notifications. Try Chrome (Android) or the Home Screen app (iPhone).",
      local: "Timers still work on this page, but your phone won't ping you until notifications are on.",
      fail: "Couldn't reach the notification server. Your timers are saved; they'll sync next time.",
      body: "is done — time to check the game!", name: "Name",
      cats: { gather: "Gathering", train: "Troops Training", build: "Building Queue", research: "Tech Research", master: "Master", recruit: "Recruit Heroes",
        pet: "Pet Adventure", intel: "Intel Missions", stamina: "Gourmet Feast", heal: "Healing", other: "Other" },
      subQ: { train: "Which troops?", recruit: "Which recruit?" }, advanced: "Advanced", epic: "Epic",
      troop: "Which troops?", builder: "＋ Second builder",
      alerts: "🔔 Event alerts", alertsNote: "Tap a time to get a notification before it starts.", before: "{n} min before",
      next: "next alert: {t}", atTime: "at the time", reset: "00:00 UTC reset", arenaName: "Arena", journeyName: "Journey Supplies",
      evTitle: "{e} {name} in {n} min", evNow: "{e} {name} — now!", evBody: "Starts at {t} UTC.",
      resetTitle: "{e} {name} — daily reset in {n} min", resetNow: "{e} {name} — daily reset now", resetBody: "Resets at 00:00 UTC. Did you use it today?",
      claimTitle: "{e} {name} in {n} min", claimNow: "{e} {name} — claim now!", claimBody: "Free claim at {t} UTC.",
      alertsSync: "Alerts are planned 3 weeks ahead — open the site now and then to keep them going." },
    zh: { chip: "⏰ 設定計時", title: "⏰ 我的計時", chat: "‹ 對話", add: "＋ 設定計時", what: "要計時什麼？", left: "遊戲裡剩下的時間", hint: "例如 2:45:12、2h45m、45m",
      another: "＋ 再加一隊", save: "儲存", cancel: "取消", empty: "還沒有計時。", done: "完成 ✓", at: "{t} 完成", bad: "請檢查時間，例如 2:45:12",
      on: "🔔 這支手機已開啟通知。", turnOn: "🔔 開啟通知", test: "傳測試通知", testMsg: "通知可以用了！✓",
      blocked: "通知被封鎖了。請到手機設定裡允許這個網站的通知，再回來這裡。",
      ios: "iPhone 要先把網站加到主畫面：按「分享」→「加入主畫面」，再從新的 NXS 圖示打開，回到這裡。",
      noPush: "這個瀏覽器不能顯示通知。請改用 Chrome（Android）或主畫面上的 App（iPhone）。",
      local: "計時在這頁還是會倒數，但要開啟通知，手機才會提醒你。",
      fail: "連不上通知伺服器。計時已經存好，下次會再同步。",
      body: "完成了，去遊戲看看吧！", name: "名稱",
      cats: { gather: "採集", train: "訓練", build: "建造", research: "研究", heal: "治療", other: "其他" } },
    ko: { chip: "⏰ 타이머 설정", title: "⏰ 내 타이머", chat: "‹ 채팅", add: "＋ 타이머 설정", what: "무엇인가요?", left: "게임에 남은 시간", hint: "예: 2:45:12 · 2h45m · 45m",
      another: "＋ 부대 추가", save: "저장", cancel: "취소", empty: "아직 타이머가 없어요.", done: "완료 ✓", at: "{t} 완료", bad: "시간을 확인하세요 — 예: 2:45:12",
      on: "🔔 이 휴대폰에서 알림이 켜져 있어요.", turnOn: "🔔 알림 켜기", test: "테스트 보내기", testMsg: "알림이 작동해요! ✓",
      blocked: "알림이 차단되어 있어요. 휴대폰 설정에서 이 사이트의 알림을 허용한 뒤 다시 오세요.",
      ios: "아이폰은 먼저 홈 화면에 추가하세요: 공유 → “홈 화면에 추가”, 그다음 새 NXS 아이콘으로 열고 여기로 오세요.",
      noPush: "이 브라우저는 알림을 표시할 수 없어요. Chrome(안드로이드)이나 홈 화면 앱(아이폰)을 사용하세요.",
      local: "타이머는 이 페이지에서 계속 돌아가지만, 알림을 켜야 휴대폰이 알려 줘요.",
      fail: "알림 서버에 연결할 수 없어요. 타이머는 저장됐고 다음에 동기화돼요.",
      body: "완료! 게임을 확인하세요!", name: "이름",
      cats: { gather: "채집", train: "훈련", build: "건설", research: "연구", heal: "치료", other: "기타" } },
    de: { chip: "⏰ Timer stellen", title: "⏰ Meine Timer", chat: "‹ Chat", add: "＋ Timer stellen", what: "Was ist es?", left: "Restzeit im Spiel", hint: "z. B. 2:45:12 · 2h45m · 45m",
      another: "＋ Weiterer Marsch", save: "Speichern", cancel: "Abbrechen", empty: "Noch keine Timer.", done: "Fertig ✓", at: "fertig um {t}", bad: "Zeit prüfen — z. B. 2:45:12",
      on: "🔔 Benachrichtigungen sind auf diesem Handy an.", turnOn: "🔔 Benachrichtigungen einschalten", test: "Test senden", testMsg: "Benachrichtigungen funktionieren! ✓",
      blocked: "Benachrichtigungen sind blockiert. Erlaube sie für diese Seite in den Handy-Einstellungen und komm zurück.",
      ios: "Auf dem iPhone zuerst zum Home-Bildschirm hinzufügen: Teilen → „Zum Home-Bildschirm“, dann NXS über das neue Symbol öffnen und hierher zurückkommen.",
      noPush: "Dieser Browser kann keine Benachrichtigungen anzeigen. Nutze Chrome (Android) oder die Home-Bildschirm-App (iPhone).",
      local: "Die Timer laufen auf dieser Seite weiter, aber dein Handy meldet sich erst, wenn Benachrichtigungen an sind.",
      fail: "Benachrichtigungsserver nicht erreichbar. Deine Timer sind gespeichert und werden später abgeglichen.",
      body: "ist fertig — schau ins Spiel!", name: "Name",
      cats: { gather: "Sammeln", train: "Training", build: "Bau", research: "Forschung", heal: "Heilung", other: "Sonstiges" } },
    fr: { chip: "⏰ Régler un minuteur", title: "⏰ Mes minuteurs", chat: "‹ Chat", add: "＋ Régler un minuteur", what: "C'est quoi ?", left: "Temps restant dans le jeu", hint: "ex. 2:45:12 · 2h45m · 45m",
      another: "＋ Une autre marche", save: "Enregistrer", cancel: "Annuler", empty: "Aucun minuteur.", done: "Terminé ✓", at: "fini à {t}", bad: "Vérifie le temps — ex. 2:45:12",
      on: "🔔 Notifications activées sur ce téléphone.", turnOn: "🔔 Activer les notifications", test: "Envoyer un test", testMsg: "Les notifications marchent ! ✓",
      blocked: "Les notifications sont bloquées. Autorise-les pour ce site dans les réglages du téléphone, puis reviens.",
      ios: "Sur iPhone, ajoute d'abord le site à l'écran d'accueil : Partager → « Sur l'écran d'accueil », puis ouvre NXS depuis la nouvelle icône et reviens ici.",
      noPush: "Ce navigateur ne peut pas afficher de notifications. Essaie Chrome (Android) ou l'app de l'écran d'accueil (iPhone).",
      local: "Les minuteurs tournent sur cette page, mais ton téléphone ne te préviendra qu'avec les notifications activées.",
      fail: "Serveur de notifications injoignable. Tes minuteurs sont enregistrés et seront synchronisés plus tard.",
      body: "est terminé — va voir le jeu !", name: "Nom",
      cats: { gather: "Collecte", train: "Entraînement", build: "Construction", research: "Recherche", heal: "Soins", other: "Autre" } },
    pt: { chip: "⏰ Definir um timer", title: "⏰ Meus timers", chat: "‹ Chat", add: "＋ Definir um timer", what: "O que é?", left: "Tempo restante no jogo", hint: "ex.: 2:45:12 · 2h45m · 45m",
      another: "＋ Outra marcha", save: "Salvar", cancel: "Cancelar", empty: "Nenhum timer ainda.", done: "Pronto ✓", at: "pronto às {t}", bad: "Confira o tempo — ex.: 2:45:12",
      on: "🔔 Notificações ativadas neste celular.", turnOn: "🔔 Ativar notificações", test: "Enviar teste", testMsg: "As notificações funcionam! ✓",
      blocked: "As notificações estão bloqueadas. Permita-as para este site nas configurações do celular e volte.",
      ios: "No iPhone, adicione o site à Tela de Início primeiro: Compartilhar → “Adicionar à Tela de Início”, depois abra o NXS pelo novo ícone e volte aqui.",
      noPush: "Este navegador não mostra notificações. Use o Chrome (Android) ou o app da Tela de Início (iPhone).",
      local: "Os timers continuam nesta página, mas o celular só avisa com as notificações ativadas.",
      fail: "Não foi possível falar com o servidor de notificações. Seus timers estão salvos e serão sincronizados depois.",
      body: "terminou — confira o jogo!", name: "Nome",
      cats: { gather: "Coleta", train: "Treino", build: "Construção", research: "Pesquisa", heal: "Cura", other: "Outro" } },
    es: { chip: "⏰ Poner un temporizador", title: "⏰ Mis temporizadores", chat: "‹ Chat", add: "＋ Poner un temporizador", what: "¿Qué es?", left: "Tiempo restante en el juego", hint: "ej. 2:45:12 · 2h45m · 45m",
      another: "＋ Otra marcha", save: "Guardar", cancel: "Cancelar", empty: "Aún no hay temporizadores.", done: "Listo ✓", at: "listo a las {t}", bad: "Revisa el tiempo — ej. 2:45:12",
      on: "🔔 Notificaciones activadas en este teléfono.", turnOn: "🔔 Activar notificaciones", test: "Enviar prueba", testMsg: "¡Las notificaciones funcionan! ✓",
      blocked: "Las notificaciones están bloqueadas. Permítelas para este sitio en los ajustes del teléfono y vuelve.",
      ios: "En iPhone, primero añade el sitio a la pantalla de inicio: Compartir → «Añadir a pantalla de inicio», luego abre NXS desde el nuevo icono y vuelve aquí.",
      noPush: "Este navegador no puede mostrar notificaciones. Usa Chrome (Android) o la app de la pantalla de inicio (iPhone).",
      local: "Los temporizadores siguen en esta página, pero el teléfono solo avisará con las notificaciones activadas.",
      fail: "No se pudo conectar con el servidor de notificaciones. Tus temporizadores están guardados y se sincronizarán luego.",
      body: "terminó — ¡revisa el juego!", name: "Nombre",
      cats: { gather: "Recolección", train: "Entrenamiento", build: "Construcción", research: "Investigación", heal: "Curación", other: "Otro" } },
    tr: { chip: "⏰ Zamanlayıcı kur", title: "⏰ Zamanlayıcılarım", chat: "‹ Sohbet", add: "＋ Zamanlayıcı kur", what: "Ne için?", left: "Oyunda kalan süre", hint: "ör. 2:45:12 · 2h45m · 45m",
      another: "＋ Başka bir sefer", save: "Kaydet", cancel: "İptal", empty: "Henüz zamanlayıcı yok.", done: "Bitti ✓", at: "{t} bitiyor", bad: "Süreyi kontrol et — ör. 2:45:12",
      on: "🔔 Bu telefonda bildirimler açık.", turnOn: "🔔 Bildirimleri aç", test: "Test gönder", testMsg: "Bildirimler çalışıyor! ✓",
      blocked: "Bildirimler engellenmiş. Telefon ayarlarından bu siteye izin ver, sonra geri gel.",
      ios: "iPhone'da önce siteyi Ana Ekrana ekle: Paylaş → “Ana Ekrana Ekle”, sonra yeni NXS simgesinden aç ve buraya dön.",
      noPush: "Bu tarayıcı bildirim gösteremiyor. Chrome (Android) veya Ana Ekran uygulamasını (iPhone) kullan.",
      local: "Zamanlayıcılar bu sayfada çalışır ama bildirimler açık olmadan telefonun haber vermez.",
      fail: "Bildirim sunucusuna ulaşılamadı. Zamanlayıcıların kaydedildi, sonra eşitlenecek.",
      body: "bitti — oyuna bak!", name: "Ad",
      cats: { gather: "Toplama", train: "Eğitim", build: "İnşaat", research: "Araştırma", heal: "İyileştirme", other: "Diğer" } },
    id: { chip: "⏰ Pasang timer", title: "⏰ Timer saya", chat: "‹ Obrolan", add: "＋ Pasang timer", what: "Untuk apa?", left: "Sisa waktu di game", hint: "mis. 2:45:12 · 2h45m · 45m",
      another: "＋ Pasukan lain", save: "Simpan", cancel: "Batal", empty: "Belum ada timer.", done: "Selesai ✓", at: "selesai {t}", bad: "Cek waktunya — mis. 2:45:12",
      on: "🔔 Notifikasi aktif di HP ini.", turnOn: "🔔 Aktifkan notifikasi", test: "Kirim tes", testMsg: "Notifikasi berfungsi! ✓",
      blocked: "Notifikasi diblokir. Izinkan untuk situs ini di pengaturan HP, lalu kembali.",
      ios: "Di iPhone, tambahkan situs ke Layar Utama dulu: Bagikan → “Tambah ke Layar Utama”, lalu buka NXS dari ikon baru dan kembali ke sini.",
      noPush: "Browser ini tidak bisa menampilkan notifikasi. Pakai Chrome (Android) atau aplikasi di Layar Utama (iPhone).",
      local: "Timer tetap jalan di halaman ini, tapi HP baru memberi tahu kalau notifikasi aktif.",
      fail: "Tidak bisa terhubung ke server notifikasi. Timer sudah tersimpan dan akan disinkronkan nanti.",
      body: "selesai — cek game-nya!", name: "Nama",
      cats: { gather: "Mengumpulkan", train: "Pelatihan", build: "Konstruksi", research: "Riset", heal: "Penyembuhan", other: "Lainnya" } },
    ru: { chip: "⏰ Поставить таймер", title: "⏰ Мои таймеры", chat: "‹ Чат", add: "＋ Поставить таймер", what: "Что это?", left: "Сколько осталось в игре", hint: "напр. 2:45:12 · 2h45m · 45m",
      another: "＋ Ещё отряд", save: "Сохранить", cancel: "Отмена", empty: "Таймеров пока нет.", done: "Готово ✓", at: "готово в {t}", bad: "Проверьте время — напр. 2:45:12",
      on: "🔔 Уведомления на этом телефоне включены.", turnOn: "🔔 Включить уведомления", test: "Отправить тест", testMsg: "Уведомления работают! ✓",
      blocked: "Уведомления заблокированы. Разрешите их для этого сайта в настройках телефона и вернитесь.",
      ios: "На iPhone сначала добавьте сайт на экран «Домой»: Поделиться → «На экран „Домой“», затем откройте NXS с новой иконки и вернитесь сюда.",
      noPush: "Этот браузер не умеет показывать уведомления. Используйте Chrome (Android) или приложение с экрана «Домой» (iPhone).",
      local: "Таймеры идут на этой странице, но телефон напомнит, только если уведомления включены.",
      fail: "Сервер уведомлений недоступен. Таймеры сохранены и синхронизируются позже.",
      body: "готово — загляните в игру!", name: "Название",
      cats: { gather: "Сбор", train: "Обучение", build: "Строительство", research: "Исследование", heal: "Лечение", other: "Другое" } },
    th: { chip: "⏰ ตั้งเวลา", title: "⏰ ตัวจับเวลาของฉัน", chat: "‹ แชต", add: "＋ ตั้งเวลา", what: "จับเวลาอะไร?", left: "เวลาที่เหลือในเกม", hint: "เช่น 2:45:12 · 2h45m · 45m",
      another: "＋ เพิ่มอีกกองทัพ", save: "บันทึก", cancel: "ยกเลิก", empty: "ยังไม่มีตัวจับเวลา", done: "เสร็จแล้ว ✓", at: "เสร็จ {t}", bad: "ตรวจเวลาอีกครั้ง — เช่น 2:45:12",
      on: "🔔 เปิดการแจ้งเตือนบนมือถือนี้แล้ว", turnOn: "🔔 เปิดการแจ้งเตือน", test: "ส่งทดสอบ", testMsg: "การแจ้งเตือนใช้ได้แล้ว! ✓",
      blocked: "การแจ้งเตือนถูกบล็อก อนุญาตให้เว็บนี้ในการตั้งค่ามือถือ แล้วกลับมาที่นี่",
      ios: "บน iPhone ให้เพิ่มเว็บไปที่หน้าจอโฮมก่อน: แชร์ → “เพิ่มไปยังหน้าจอโฮม” แล้วเปิด NXS จากไอคอนใหม่ และกลับมาที่นี่",
      noPush: "เบราว์เซอร์นี้แสดงการแจ้งเตือนไม่ได้ ลองใช้ Chrome (Android) หรือแอปบนหน้าจอโฮม (iPhone)",
      local: "ตัวจับเวลายังนับในหน้านี้ แต่มือถือจะเตือนก็ต่อเมื่อเปิดการแจ้งเตือน",
      fail: "ติดต่อเซิร์ฟเวอร์แจ้งเตือนไม่ได้ ตัวจับเวลาบันทึกไว้แล้ว จะซิงก์ครั้งหน้า",
      body: "เสร็จแล้ว — ไปดูในเกมเลย!", name: "ชื่อ",
      cats: { gather: "เก็บทรัพยากร", train: "ฝึกทหาร", build: "ก่อสร้าง", research: "วิจัย", heal: "รักษา", other: "อื่น ๆ" } },
    ar: { chip: "⏰ ضبط مؤقت", title: "⏰ مؤقتاتي", chat: "‹ المحادثة", add: "＋ ضبط مؤقت", what: "ما هو؟", left: "الوقت المتبقي في اللعبة", hint: "مثل 2:45:12 · 2h45m · 45m",
      another: "＋ مسيرة أخرى", save: "حفظ", cancel: "إلغاء", empty: "لا توجد مؤقتات بعد.", done: "انتهى ✓", at: "ينتهي {t}", bad: "تحقق من الوقت — مثل 2:45:12",
      on: "🔔 الإشعارات مفعّلة على هذا الهاتف.", turnOn: "🔔 تفعيل الإشعارات", test: "إرسال تجربة", testMsg: "الإشعارات تعمل! ✓",
      blocked: "الإشعارات محظورة. اسمح بها لهذا الموقع من إعدادات الهاتف ثم عُد.",
      ios: "على iPhone أضف الموقع إلى الشاشة الرئيسية أولاً: مشاركة ← «إضافة إلى الشاشة الرئيسية»، ثم افتح NXS من الأيقونة الجديدة وعُد إلى هنا.",
      noPush: "هذا المتصفح لا يعرض الإشعارات. استخدم Chrome (أندرويد) أو تطبيق الشاشة الرئيسية (iPhone).",
      local: "المؤقتات تعمل في هذه الصفحة، لكن الهاتف لن ينبّهك إلا بعد تفعيل الإشعارات.",
      fail: "تعذّر الوصول إلى خادم الإشعارات. مؤقتاتك محفوظة وستتم مزامنتها لاحقًا.",
      body: "انتهى — تفقّد اللعبة!", name: "الاسم",
      cats: { gather: "الجمع", train: "التدريب", build: "البناء", research: "البحث", heal: "العلاج", other: "أخرى" } },
  };
  const CAT_EMOJI = { gather: "🌾", train: "⚔️", build: "🔨", research: "📚", master: "🎓", recruit: "🎴", pet: "🐾", intel: "🔍", stamina: "🍖", heal: "⛑️", other: "⏰" };
  // English only while we test (the other languages are ready — switch this line back to turn them on)
  const lang = () => "en";   // (typeof currentLang !== "undefined" && TX[currentLang] ? currentLang : "en")
  const T = (k) => (TX[lang()] || TX.en)[k] ?? TX.en[k];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- timers on this phone ---------- */
  let timers = [];
  try { timers = JSON.parse(localStorage.getItem(LS)) || []; } catch (e) {}
  const store = () => { try { localStorage.setItem(LS, JSON.stringify(timers)); } catch (e) {} };
  const prune = () => { const now = Date.now(); timers = timers.filter((x) => x.at > now - KEEP_DONE_MS); };
  const termOf = (id) => (typeof GLOSSARY !== "undefined" && GLOSSARY[id] ? GLOSSARY[id][lang()] || GLOSSARY[id].en : id);
  const labelOf = (x) => (x.cat === "other" && x.name ? x.name : (T("cats")[x.cat] || TX.en.cats[x.cat] || x.cat)) + (x.sub ? ` · ${subName(x.sub)}` : "") + (x.n ? ` #${x.n}` : "");
  const MULTI = { gather: 6, build: 2 };   // several at once: gathering marches, 2 builders
  /* categories with a second choice: troop type, recruit type */
  const SUBS = { train: { infantry: "🛡️", cavalry: "🐎", archer: "🏹" }, recruit: { advanced: "📦", epic: "💎" } };
  function subName(k) { return SUBS.train[k] ? termOf(k) : T(k); }

  /* ---------- event alerts (Bear Hunt, Arena reset, Swordland…) — opt-in per time, N minutes before ---------- */
  const ALS = "nxs-alerts-v1";
  let alerts = {};
  try { alerts = JSON.parse(localStorage.getItem(ALS)) || {}; } catch (e) {}
  const saveAlerts = () => { try { localStorage.setItem(ALS, JSON.stringify(alerts)); } catch (e) {} };
  const BEFORE = [0, 1, 3, 5, 10, 15, 30, 60];
  /* event = alliance event on its battle days (times from EVENT_TIMES); daily = every day at fixed UTC hours (24 = the 00:00 reset) */
  const DEFS = [
    { k: "bear-hunt", kind: "event", def: 10 },
    { k: "arena", kind: "daily", hours: [24], def: 3, emoji: "🏟️", name: "arenaName" },
    { k: "mystic-trial", kind: "daily", hours: [24], def: 30 },
    { k: "journey", kind: "daily", hours: [8, 16], def: 0, emoji: "🎒", name: "journeyName" },
    { k: "swordland-showdown", kind: "event", def: 10 },
    { k: "tri-alliance-clash", kind: "event", def: 10 },
    { k: "viking-vengeance", kind: "event", def: 10 },
  ];
  if (alerts.arena && alerts.arena.on === true) alerts.arena = { on: { 24: true }, before: 3 };   // older beta setting
  /* which day of the event run has the battle (0 = first day). Default: the last day — check in game. */
  const FIGHT_DAY = { "swordland-showdown": -1, "tri-alliance-clash": -1, "viking-vengeance": -1 };
  const DAY = 86400000, HORIZON = 21 * DAY;
  const evHours = (k) => (typeof EVENT_TIMES !== "undefined" && EVENT_TIMES[k]) || [];
  const defOf = (k) => DEFS.find((d) => d.k === k);
  const hoursOf = (d) => d.hours || evHours(d.k);
  const beforeOf = (d) => { const a = alerts[d.k]; return a && a.before != null ? a.before : d.def; };
  const evName = (k) => { const d = defOf(k); if (d && d.name) return T(d.name); return nameFromGuide(k); };
  const nameFromGuide = (k) => (typeof GUIDES !== "undefined" && GUIDES[k] ? GUIDES[k].name[lang()] || GUIDES[k].name.en : k);
  const evEmoji = (k) => { const d = defOf(k); if (d && d.emoji) return d.emoji; return typeof GUIDES !== "undefined" && GUIDES[k] ? GUIDES[k].emoji : "📅"; };
  function evSched(k) {
    if (k === "bear-hunt") return typeof BEAR_SCHED !== "undefined" ? BEAR_SCHED : null;
    return typeof EVENT_SCHEDULES !== "undefined" ? EVENT_SCHEDULES[k] : null;
  }
  /* is there a battle of event k on the UTC day starting at dayStart? */
  function fightOn(k, dayStart) {
    const sc = evSched(k); if (!sc) return false;
    const n = Math.floor((dayStart - sc.anchor) / DAY); if (n < 0) return false;
    const inRun = n % sc.periodDays; if (inRun >= sc.activeDays) return false;
    if (!(k in FIGHT_DAY)) return true;                      // Bear Hunt: every active day
    const f = FIGHT_DAY[k] < 0 ? sc.activeDays + FIGHT_DAY[k] : FIGHT_DAY[k];
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
        for (const h of H) {
          if (!a.on[h]) continue;
          const at = day + h * 3600000 - before * 60000;
          if (at <= now) continue;
          const v = { e: evEmoji(d.k), name: evName(d.k), n: before, t: String(h % 24).padStart(2, "0") + ":00" };
          const kind = h === 24 ? "reset" : d.kind === "daily" ? "claim" : "ev";
          const title = fill(T(before ? kind + "Title" : kind + "Now"), v), body = fill(T(kind + "Body"), v);
          out.push({ id: `ev-${d.k}-${h}-${day / DAY}`, at, title, body });
        }
      }
    }
    return out.sort((x, y) => x.at - y.at);
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
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }
  let syncErr = false;
  async function sync() {
    const sub = await getSub();
    if (!sub) return;
    const now = Date.now();
    const list = timers.filter((x) => x.at > now).map((x) => ({ id: x.id, at: x.at, title: `${CAT_EMOJI[x.cat] || "⏰"} ${labelOf(x)}`, body: `${labelOf(x)} ${T("body")}` }))
      .concat(alertTimers());
    try { await post("/push/save", { sub: sub.toJSON(), timers: list }); syncErr = false; }
    catch (e) { syncErr = true; }
    if (!view.hidden) render();
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
    if (on) { if (startAdding && !adding) adding = { cat: null, rows: [""], name: "" }; render(); tick = setInterval(renderList, 1000); }
    else adding = null;
  }

  async function notifHtml() {
    if (!canPush()) return `<div class="tm-note">${esc(isIOS && !standalone() ? T("ios") : T("noPush"))}<br><span class="tm-a">${esc(T("local"))}</span></div>`;
    if (Notification.permission === "denied") return `<div class="tm-note">${esc(T("blocked"))}</div>`;
    const sub = Notification.permission === "granted" ? await getSub() : null;
    if (sub) return `<div class="tm-note">${esc(T("on"))} <button type="button" class="tm-btn" data-a="test">${esc(T("test"))}</button>${syncErr ? `<div class="tm-err">${esc(T("fail"))}</div>` : ""}</div>`;
    return `<div class="tm-note">${esc(T("local"))}<br><button type="button" class="tm-btn main" data-a="sub">${esc(T("turnOn"))}</button></div>`;
  }
  function listHtml() {
    prune();
    const now = Date.now(), L = timers.slice().sort((a, b) => a.at - b.at);
    if (!L.length) return `<div class="tm-a" style="padding:6px 0">${esc(T("empty"))}</div>`;
    return L.map((x) => `<div class="tm-row${x.at <= now ? " done" : ""}"><span>${CAT_EMOJI[x.cat] || "⏰"}</span>
      <div class="tm-l"><div dir="auto">${esc(labelOf(x))}</div><div class="tm-a">${esc(T("at").replace("{t}", fmtAt(x.at)))}</div></div>
      <span class="tm-c" dir="ltr">${x.at <= now ? esc(T("done")) : fmtLeft(x.at - now)}</span>
      <button type="button" class="tm-x" data-del="${esc(x.id)}" aria-label="✕">✕</button></div>`).join("");
  }
  function addHtml() {
    if (!adding) return `<button type="button" class="tm-btn main" data-a="add">${esc(T("add"))}</button>`;
    const cats = Object.keys(CAT_EMOJI).map((c) => `<button type="button" class="tm-btn${adding.cat === c ? " on" : ""}" data-cat="${c}">${CAT_EMOJI[c]} ${esc(T("cats")[c])}</button>`).join("");
    let h = `<div class="tm-note"><b>${esc(T("what"))}</b><div class="tm-cats">${cats}</div>`;
    if (adding.cat) {
      if (adding.cat === "other") h += `<input class="tm-in" data-name placeholder="${esc(T("name"))}" value="${esc(adding.name)}" dir="auto">`;
      if (SUBS[adding.cat]) {
        const S = SUBS[adding.cat];
        h += `<b>${esc(T("subQ")[adding.cat])}</b><div class="tm-cats">${Object.keys(S).map((k) => `<button type="button" class="tm-btn${adding.sub === k ? " on" : ""}" data-sub="${k}">${S[k]} ${esc(subName(k))}</button>`).join("")}</div>`;
        if (!adding.sub) return h + `<div class="tm-acts"><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div></div>`;
      }
      h += `<b>${esc(T("left"))}</b><div class="tm-hint">${esc(T("hint"))}</div>`;
      h += adding.rows.map((v, i) => `<input class="tm-in" data-row="${i}" inputmode="text" autocomplete="off" placeholder="${MULTI[adding.cat] ? `#${i + 1}  ` : ""}2:45:12" value="${esc(v)}" dir="ltr">`).join("");
      if (MULTI[adding.cat] && adding.rows.length < MULTI[adding.cat]) h += `<button type="button" class="tm-btn" data-a="row">${esc(T(adding.cat === "build" ? "builder" : "another"))}</button>`;
      if (adding.err) h += `<div class="tm-err">${esc(T("bad"))}</div>`;
      h += `<div class="tm-acts"><button type="button" class="tm-btn main" data-a="save">${esc(T("save"))}</button><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div>`;
    } else h += `<div class="tm-acts"><button type="button" class="tm-btn" data-a="cancel">${esc(T("cancel"))}</button></div>`;
    return h + `</div>`;
  }
  function alertsHtml() {
    const loc = (h, m = 0) => new Date(Date.UTC(2000, 0, 1, h, m)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nextOf = (k) => { const x = alertTimers().find((t) => t.id.startsWith(`ev-${k}-`)); return x ? `<div class="tm-a">${esc(T("next").replace("{t}", fmtAt(x.at)))}</div>` : ""; };
    const rows = DEFS.map((d) => {
      const k = d.k, a = alerts[k] || {}, H = hoursOf(d);
      if (!H.length || (d.kind === "event" && !evSched(k))) return "";
      const any = a.on && H.some((h) => a.on[h]), bf = beforeOf(d);
      const lab = (h) => h === 24 ? `${esc(T("reset"))} <span class="tm-a">(${loc(0)})</span>` : `${String(h).padStart(2, "0")}:00 UTC <span class="tm-a">(${loc(h)})</span>`;
      return `<div class="tm-ev"><div><b>${evEmoji(k)} ${esc(evName(k))}</b></div><div class="tm-cats">
        ${H.map((h) => `<button type="button" class="tm-btn${a.on && a.on[h] ? " on" : ""}" data-al="${k}:${h}">${lab(h)}</button>`).join("")}
        <select class="tm-sel" data-before="${k}">${BEFORE.map((m) => `<option value="${m}"${bf === m ? " selected" : ""}>${esc(m ? T("before").replace("{n}", m) : T("atTime"))}</option>`).join("")}</select></div>${any ? nextOf(k) : ""}</div>`;
    }).join("");
    return `<div class="tm-alerts"><b>${esc(T("alerts"))}</b><div class="tm-hint" style="margin-top:2px">${esc(T("alertsNote"))}</div>${rows}<div class="tm-hint">${esc(T("alertsSync"))}</div></div>`;
  }
  view.addEventListener("change", (e) => {
    const k = e.target.dataset.before; if (!k) return;
    (alerts[k] = alerts[k] || {}).before = +e.target.value; saveAlerts(); render(); sync();
  });
  async function render() {
    const n = await notifHtml();
    view.innerHTML = `<div class="tm-top"><b>${esc(T("title"))}</b><button type="button" class="tm-btn" data-a="chat">${esc(T("chat"))}</button></div>
      ${n}<div id="tmAdd">${addHtml()}</div><div id="tmList" style="margin-top:10px">${listHtml()}</div>${alertsHtml()}`;
    const first = view.querySelector("[data-name]") || view.querySelector('[data-row="0"]');
    if (first && adding && adding.focus) { first.focus(); adding.focus = false; }
  }
  function renderList() { const el = view.querySelector("#tmList"); if (el) el.innerHTML = listHtml(); }

  view.addEventListener("input", (e) => {
    if (!adding) return;
    if (e.target.dataset.row != null) adding.rows[+e.target.dataset.row] = e.target.value;
    if (e.target.hasAttribute("data-name")) adding.name = e.target.value;
  });
  view.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.classList.contains("tm-in")) { e.preventDefault(); saveAdding(); } });
  view.addEventListener("click", async (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const a = b.dataset.a;
    if (b.dataset.del) { timers = timers.filter((x) => x.id !== b.dataset.del); store(); renderList(); sync(); return; }
    if (b.dataset.cat) { adding.cat = b.dataset.cat; adding.sub = null; adding.rows = adding.rows.slice(0, MULTI[adding.cat] || 1); adding.err = false; adding.focus = true; return render(); }
    if (b.dataset.sub) { adding.sub = b.dataset.sub; adding.focus = true; return render(); }
    if (b.dataset.al) {   // event alert time toggles: "bear-hunt:13", "arena"
      const [k, h] = b.dataset.al.split(":");
      const a = (alerts[k] = alerts[k] || {});
      a.on = a.on || {}; a.on[h] = !a.on[h];
      saveAlerts(); render(); sync(); return;
    }
    if (a === "chat") return show(false);
    if (a === "add") { adding = { cat: null, rows: [""], name: "" }; return render(); }
    if (a === "cancel") { adding = null; return render(); }
    if (a === "row") { adding.rows.push(""); render().then(() => { const el = view.querySelector(`[data-row="${adding.rows.length - 1}"]`); if (el) el.focus(); }); return; }
    if (a === "save") return saveAdding();
    if (a === "sub") { b.disabled = true; try { await subscribe(); } catch (err) {} await sync(); return render(); }
    if (a === "test") {
      b.disabled = true;
      const sub = await getSub();
      try { if (sub) await post("/push/test", { sub: sub.toJSON(), title: "NXS ⏰", body: T("testMsg") }); syncErr = false; } catch (err) { syncErr = true; }
      return render();
    }
  });
  function saveAdding() {
    const rows = adding.rows.map((v) => v.trim()).filter(Boolean);
    const ms = rows.map(parseLeft);
    if (!rows.length || ms.some((x) => !x || x > 30 * 86400000)) { adding.err = true; return render(); }
    const now = Date.now(), numbered = !!MULTI[adding.cat];
    // gathering marches / builders are numbered after the ones already running
    const used = timers.filter((x) => x.cat === adding.cat && x.at > now).map((x) => x.n || 0);
    const number = numbered && (rows.length > 1 || used.length);
    let n = number ? Math.max(0, ...used) : 0;
    ms.forEach((d) => {
      timers.push({ id: Math.random().toString(36).slice(2, 10), cat: adding.cat, name: adding.cat === "other" ? adding.name.trim().slice(0, 40) : "",
        sub: SUBS[adding.cat] ? adding.sub : "", n: number ? ++n : 0, at: now + d });
    });
    store(); adding = null; render(); sync();
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
  if (navigator.serviceWorker) navigator.serviceWorker.addEventListener("message", (e) => { if (e.data && e.data.nxs === "open-timers") openTimers(); });
  // after coming back to the app, re-send the list once (keeps the server in step if a save failed)
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { prune(); store(); sync(); if (!view.hidden) render(); } });
  window.NXSTimers = { parseLeft, show, alertTimers };
})();
