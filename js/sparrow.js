/* 🐦 Little Sparrow — the site's guide mascot.
   Art: Sherry's Gemini sparrow, animated clip by clip with Vidnoz, keyed to transparent WebP in img/sparrow/ (see img/sparrow/meta.json).
   Works on the main site (perches on the 💬 Ask AI button) and on the officer page (greeting + personal messages from Sparrow).
   Switch: localStorage "nxs-sparrow" = "off" hides it; a 🐦 button in the top bar brings it back. */
(function () {
  "use strict";
  if (window.NXSSparrow) return;
  const BASE = (document.currentScript && document.currentScript.src.replace(/js\/sparrow\.js.*$/, "")) || "./";
  const IMG = BASE + "img/sparrow/";
  const SIZE = 0.40;                      // display scale of the clips (standing bird ≈ 100px tall)
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IS_OFFICER = /officer-x7k2p9\.html/.test(location.pathname);   // the officer page (js/officer/core.js) vs the main site / tool pages
  const PREVIEW = (location.search.match(/[?&]sparrow=(nia|armada)/) || [])[1] || null;   // 👀 …/?sparrow=nia shows Nia's message on the main site (nothing is marked read)
  const LS = "nxs-sparrow", READ_LS = "nxs-sparrow-read";
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- texts (12 site languages; officer page uses zh/en/pt/ar/ko) ---------- */
  const T = {
    en: { greet: "Hi! I'm Little Sparrow 🐦 Need any help?", page: "🔎 Find a page", how: "🎓 How do I use…", none: "🤔 Neither of these",
      noneA: "Then please go find THAT Sparrow 🐦", pageA: "Tap the page you want and I'll fly you there.", here: "Here it is. This is what you were looking for, right?",
      howA: "Pick one here and I'll walk you through it step by step. Or just ask the AI.", sulky: "Don't need me…? Okay then.", hide: "Hide Little Sparrow", show: "Little Sparrow", call: "Call Little Sparrow to explain this",
      msg: "There's a message for you 💌 Tap 📋 at the top right.", got: "Got it", from: "from Sparrow", oGreet: "Hi {name}! I'm Little Sparrow. Tap me for a tour of any tab, or tap a 🐦 next to a feature and I'll explain just that one. If I still can't teach you something, go find THAT Sparrow 😄" },
    zh: { greet: "嗨囉！我是小麻雀 🐦 需要幫忙嗎？", page: "🔎 找頁面", how: "🎓 怎麼用某個功能…", none: "🤔 都不是",
      noneA: "那請你去找那個麻雀喔（Sparrow）🐦", pageA: "點你要的頁面，我飛過去帶你看。", here: "在這裡。這應該就是你要找的對吧？",
      howA: "從這裡選一個，我一步一步帶你做。也可以直接問 AI。", sulky: "不需要我嗎…？好吧。", hide: "隱藏小麻雀", show: "小麻雀", call: "呼喚小麻雀來講解",
      msg: "有給你的留言 💌 點右上角的 📋", got: "知道了", from: "來自 Sparrow", oGreet: "嗨 {name}！我是小麻雀。點我可以導覽任何分頁，功能旁邊的 🐦 點下去我就只講那一個。如果我還是教不會你，就去找那個麻雀（Sparrow）吧 😄" },
    ko: { greet: "안녕! 나는 작은 참새 🐦 도움이 필요해?", page: "🔎 페이지 찾기", how: "🎓 기능 사용법…", none: "🤔 둘 다 아니야",
      noneA: "그럼 그 참새(Sparrow)를 찾아가 줘 🐦", pageA: "원하는 페이지를 누르면 내가 날아가서 보여줄게.", here: "여기야. 찾던 게 이거 맞지?",
      howA: "여기서 하나 고르면 단계별로 알려줄게. AI에게 물어봐도 돼.", sulky: "내가 필요 없어…? 알았어.", hide: "작은 참새 숨기기", show: "작은 참새", call: "작은 참새 불러서 설명 듣기",
      msg: "너에게 온 메시지가 있어 💌 오른쪽 위 📋 를 눌러 봐.", got: "알겠어", from: "Sparrow가 보냄", oGreet: "안녕 {name}! 나는 작은 참새야. 나를 누르면 탭을 안내하고, 기능 옆 🐦 를 누르면 그것만 설명해 줘. 그래도 모르겠으면 그 Sparrow를 찾아가 😄" },
    de: { greet: "Hi! Ich bin der kleine Spatz 🐦 Brauchst du Hilfe?", page: "🔎 Eine Seite finden", how: "🎓 Wie benutze ich…", none: "🤔 Keins von beiden",
      noneA: "Dann geh bitte zu DEM Spatz (Sparrow) 🐦", pageA: "Tippe auf die Seite, die du willst – ich fliege hin.", here: "Hier ist es. Das hast du gesucht, oder?",
      howA: "Such dir hier eins aus, ich führe dich Schritt für Schritt durch. Oder frag einfach die KI.", sulky: "Brauchst du mich nicht…? Na gut.", hide: "Kleinen Spatz ausblenden", show: "Kleiner Spatz", call: "Kleinen Spatz rufen – erklärt das hier",
      msg: "Da ist eine Nachricht für dich 💌 Tippe oben rechts auf 📋.", got: "Alles klar", from: "von Sparrow", oGreet: "Hi {name}! Ich bin der kleine Spatz. Wenn ich dir etwas nicht erklären kann, geh zu DEM Sparrow 😄" },
    fr: { greet: "Salut ! Je suis Petit Moineau 🐦 Besoin d'aide ?", page: "🔎 Trouver une page", how: "🎓 Comment utiliser…", none: "🤔 Ni l'un ni l'autre",
      noneA: "Alors va voir CE Moineau-là (Sparrow) 🐦", pageA: "Touche la page que tu veux, je t'y emmène.", here: "C'est ici. C'est ce que tu cherchais, non ?",
      howA: "Choisis-en un ici et je te guide étape par étape. Ou demande à l'IA.", sulky: "Tu n'as pas besoin de moi… ? Bon.", hide: "Cacher Petit Moineau", show: "Petit Moineau", call: "Appeler Petit Moineau pour expliquer",
      msg: "Il y a un message pour toi 💌 Touche 📋 en haut à droite.", got: "Compris", from: "de Sparrow", oGreet: "Salut {name} ! Je suis Petit Moineau. Si je n'arrive pas à t'expliquer, va voir CE Sparrow-là 😄" },
    pt: { greet: "Oi! Eu sou o Pardalzinho 🐦 Precisa de ajuda?", page: "🔎 Encontrar uma página", how: "🎓 Como usar…", none: "🤔 Nenhum dos dois",
      noneA: "Então vá falar com AQUELA Sparrow 🐦", pageA: "Toque na página que você quer e eu voo até lá.", here: "Aqui está. Era isso que você procurava, né?",
      howA: "Escolha um aqui e eu te guio passo a passo. Ou pergunte à IA.", sulky: "Não precisa de mim…? Tá bom.", hide: "Esconder o Pardalzinho", show: "Pardalzinho", call: "Chamar o Pardalzinho para explicar",
      msg: "Tem uma mensagem para você 💌 Toque em 📋 no canto superior direito.", got: "Entendi", from: "da Sparrow", oGreet: "Oi {name}! Eu sou o Pardalzinho. Toque em mim para um tour de qualquer aba, ou no 🐦 ao lado de uma função e eu explico só aquela. Se eu não conseguir te ensinar algo, vá falar com AQUELA Sparrow 😄" },
    es: { greet: "¡Hola! Soy Gorrioncito 🐦 ¿Necesitas ayuda?", page: "🔎 Buscar una página", how: "🎓 Cómo usar…", none: "🤔 Ninguna de las dos",
      noneA: "Entonces ve con ESA Sparrow 🐦", pageA: "Toca la página que quieres y vuelo hasta allí.", here: "Aquí está. Esto es lo que buscabas, ¿no?",
      howA: "Elige uno aquí y te guío paso a paso. O pregúntale a la IA.", sulky: "¿No me necesitas…? Bueno.", hide: "Ocultar a Gorrioncito", show: "Gorrioncito", call: "Llamar a Gorrioncito para que lo explique",
      msg: "Tienes un mensaje 💌 Toca 📋 arriba a la derecha.", got: "Entendido", from: "de Sparrow", oGreet: "¡Hola {name}! Soy Gorrioncito. Si no logro enseñarte algo, ve con ESA Sparrow 😄" },
    tr: { greet: "Selam! Ben Küçük Serçe 🐦 Yardım lazım mı?", page: "🔎 Sayfa bul", how: "🎓 Nasıl kullanılır…", none: "🤔 İkisi de değil",
      noneA: "O zaman O Serçe'ye (Sparrow) git 🐦", pageA: "İstediğin sayfaya dokun, oraya uçayım.", here: "İşte burada. Aradığın buydu, değil mi?",
      howA: "Buradan birini seç, adım adım anlatayım. Ya da yapay zekâya sor.", sulky: "Bana ihtiyacın yok mu…? Peki.", hide: "Küçük Serçe'yi gizle", show: "Küçük Serçe", call: "Küçük Serçe'yi çağır, anlatsın",
      msg: "Sana bir mesaj var 💌 Sağ üstteki 📋 simgesine dokun.", got: "Anladım", from: "Sparrow'dan", oGreet: "Selam {name}! Ben Küçük Serçe. Bir şeyi öğretemezsem O Sparrow'a git 😄" },
    id: { greet: "Hai! Aku Burung Gereja Kecil 🐦 Perlu bantuan?", page: "🔎 Cari halaman", how: "🎓 Cara memakai…", none: "🤔 Bukan dua-duanya",
      noneA: "Kalau begitu cari Sparrow yang ITU ya 🐦", pageA: "Ketuk halaman yang kamu mau, aku terbang ke sana.", here: "Ini dia. Ini yang kamu cari, kan?",
      howA: "Pilih satu di sini, aku pandu langkah demi langkah. Atau tanya AI saja.", sulky: "Tidak butuh aku…? Ya sudah.", hide: "Sembunyikan Burung Gereja Kecil", show: "Burung Gereja Kecil", call: "Panggil Burung Gereja Kecil untuk menjelaskan",
      msg: "Ada pesan untukmu 💌 Ketuk 📋 di kanan atas.", got: "Oke", from: "dari Sparrow", oGreet: "Hai {name}! Aku Burung Gereja Kecil. Kalau aku tetap tidak bisa mengajarimu, cari Sparrow yang ITU ya 😄" },
    ru: { greet: "Привет! Я Воробушек 🐦 Нужна помощь?", page: "🔎 Найти страницу", how: "🎓 Как пользоваться…", none: "🤔 Ни то, ни другое",
      noneA: "Тогда иди к ТОМУ Воробью (Sparrow) 🐦", pageA: "Нажми на нужную страницу — я прилечу туда.", here: "Вот оно. Ты это искал, да?",
      howA: "Выбери здесь, и я проведу тебя по шагам. Или просто спроси ИИ.", sulky: "Я не нужен…? Ну ладно.", hide: "Скрыть Воробушка", show: "Воробушек", call: "Позвать Воробушка — объяснит",
      msg: "Для тебя есть сообщение 💌 Нажми 📋 справа вверху.", got: "Понятно", from: "от Sparrow", oGreet: "Привет, {name}! Я Воробушек. Если я не смогу что-то объяснить, иди к ТОМУ Sparrow 😄" },
    th: { greet: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 ต้องการความช่วยเหลือไหม?", page: "🔎 หาหน้า", how: "🎓 ใช้ฟีเจอร์ยังไง…", none: "🤔 ไม่ใช่ทั้งสองอย่าง",
      noneA: "งั้นไปหานกกระจอกตัวนั้น (Sparrow) นะ 🐦", pageA: "แตะหน้าที่ต้องการ แล้วฉันจะบินพาไป", here: "อยู่นี่ไง นี่คือที่หาอยู่ใช่ไหม?",
      howA: "เลือกตรงนี้สักอัน ฉันจะพาทำทีละขั้น หรือถาม AI ก็ได้", sulky: "ไม่ต้องการฉันเหรอ…? ก็ได้", hide: "ซ่อนนกกระจอกน้อย", show: "นกกระจอกน้อย", call: "เรียกนกกระจอกน้อยมาอธิบาย",
      msg: "มีข้อความถึงคุณ 💌 แตะ 📋 มุมขวาบน", got: "เข้าใจแล้ว", from: "จาก Sparrow", oGreet: "หวัดดี {name}! ฉันคือนกกระจอกน้อย ถ้าฉันสอนไม่ได้ ไปหา Sparrow ตัวนั้นนะ 😄" },
    ar: { greet: "مرحبًا! أنا العصفور الصغير 🐦 هل تحتاج مساعدة؟", page: "🔎 البحث عن صفحة", how: "🎓 كيف أستخدم…", none: "🤔 لا هذا ولا ذاك",
      noneA: "إذًا اذهب إلى ذلك العصفور (Sparrow) 🐦", pageA: "اضغط على الصفحة التي تريدها وسأطير إليها.", here: "ها هي. هذا ما كنت تبحث عنه، صحيح؟",
      howA: "اختر واحدًا هنا وسأرشدك خطوة بخطوة. أو اسأل الذكاء الاصطناعي.", sulky: "لا تحتاجني…؟ حسنًا.", hide: "إخفاء العصفور الصغير", show: "العصفور الصغير", call: "نادِ العصفور الصغير ليشرح",
      msg: "لديك رسالة 💌 اضغط على 📋 في الأعلى يمينًا.", got: "فهمت", from: "من Sparrow", oGreet: "مرحبًا {name}! أنا العصفور الصغير. اضغط عليّ لجولة في أي تبويب، أو على 🐦 بجانب أي ميزة لأشرحها وحدها. إن لم أستطع تعليمك شيئًا، اذهب إلى Sparrow تلك 😄" },
  };
  const IS_TOOL = !IS_OFFICER && typeof langChosen === "undefined";   // a stand-alone tool page (calculators, booking / squad guide): language from <html lang>
  const lang = () => { if (typeof currentLang !== "undefined") return currentLang; if (IS_TOOL) { const l = (document.documentElement.lang || "en").toLowerCase().split("-")[0]; return T[l] ? l : "en"; } return ls.get("nxs-officer-lang") || "en"; };
  const t = (k) => (T[lang()] || T.en)[k] || T.en[k];

  /* ---------- guided tours: texts ---------- */
  const TT = {
    en: { pick: "What do you want to learn?", tmr: "⏰ Set a timer", rem: "🎮 Game reminders", inst: "📲 Install as an app", back: "‹ Back", next: "Next ›", done: "Done ✓", stop: "✕ Stop", also: "Want me to show {x} too?", alsoYes: "Yes, show me", alsoNo: "No thanks",
      tmr1: "This is ⏰ My timers. Tap it to open.", tmr2: "First, notifications. If it says they're on, tap “Send a test”, leave the app, and wait 15 s for the red badge. If not, follow what it says here first.",
      tmr2ios: "On iPhone, timers only ping you from the installed app. Read 📲 Install as an app first, then come back.",
      tmr3: "⚡ Quick start: your last times. Troops Training and Gathering remember the time — one tap starts them again. Noble Advisor has its own time.", tmr4: "＋ Set a timer: pick what it is, type the time the game shows, and save. “Other” is for anything not in the list.",
      tmr5: "Appointments can only be booked 24 h ahead, so the slots are ready for you here, in your local time. When Troops Training, Building or Research finishes, I'll suggest a slot to book.",
      rem1: "🎮 Game reminders: tick what you tend to forget. Tap a time to turn it on (it goes orange with a ✓), tap again to turn it off.", rem2: "Alliance events use the times we post. If I got one wrong, go find THAT Sparrow — that's her problem, not mine 🐦",
      inst1: "This page shows how to install the site as an app. Read it carefully — on iPhone, notifications only work from the installed app." },
    zh: { pick: "想學哪一個？", tmr: "⏰ 設定計時", rem: "🎮 遊戲提醒", inst: "📲 安裝成 App", back: "‹ 返回", next: "下一步 ›", done: "完成 ✓", stop: "✕ 停止", also: "要不要也順便講 {x}？", alsoYes: "好，講吧", alsoNo: "不用了",
      tmr1: "這是 ⏰ 我的計時，點一下打開。", tmr2: "先看通知。如果顯示已開啟，點「傳測試通知」，退出 App 等 15 秒，看有沒有紅點點和通知。沒有的話，先照這裡寫的做。",
      tmr2ios: "iPhone 要從安裝好的 App 才會收到提醒。先看 📲 安裝成 App，再回來。",
      tmr3: "⚡ 快速開始：上次的時間。訓練和採集會記住時間，點一下就重新開始。參謀長加成會另外記一組時間。", tmr4: "＋ 設定計時：選是什麼、照遊戲顯示的時間輸入、儲存。清單裡沒有的用「其他」。",
      tmr5: "官職只能預約 24 小時內的，所以時段已經幫你排好，而且換算成你的當地時間。訓練、建造、研究快完成時，我會建議你預約一個時段。",
      rem1: "🎮 遊戲提醒：勾你容易忘記的。點一下時間就開啟（變橘色打 ✓），再點一次關閉。", rem2: "聯盟活動的時間是我們更新的。如果發現我忘了更新，去找那個麻雀（Sparrow），那是她的問題，不是小麻雀的問題 🐦",
      inst1: "這一頁教你把網站安裝成 App。請仔細看，iPhone 一定要從安裝好的 App 才收得到通知。" },
    ko: { pick: "무엇을 배울까요?", tmr: "⏰ 타이머 설정", rem: "🎮 게임 알림", inst: "📲 앱으로 설치", back: "‹ 뒤로", next: "다음 ›", done: "완료 ✓", stop: "✕ 중지", also: "{x}도 보여줄까요?", alsoYes: "응, 보여줘", alsoNo: "괜찮아",
      tmr1: "이게 ⏰ 내 타이머예요. 눌러서 열어요.", tmr2: "먼저 알림이에요. 켜져 있다고 나오면 “테스트 보내기”를 누르고 앱을 나간 뒤 15초 기다려 빨간 배지를 확인하세요. 아니면 여기 적힌 대로 먼저 하세요.",
      tmr2ios: "아이폰은 설치한 앱에서만 알림이 와요. 먼저 📲 앱으로 설치를 읽고 돌아오세요.",
      tmr3: "⚡ 빠른 시작: 최근 시간이에요. 훈련과 채집은 시간을 기억해서 한 번만 누르면 다시 시작돼요. 참모장 버프는 따로 기억해요.", tmr4: "＋ 타이머 설정: 무엇인지 고르고, 게임에 보이는 시간을 입력하고 저장하세요. 목록에 없으면 “기타”.",
      tmr5: "관직은 24시간 안에만 예약할 수 있어서 시간대를 미리 준비해 뒀고, 내 현지 시간으로 보여줘요. 훈련·건설·연구가 끝날 때 예약할 시간대를 제안할게요.",
      rem1: "🎮 게임 알림: 자주 잊는 걸 체크하세요. 시간을 누르면 켜지고(주황색 ✓), 다시 누르면 꺼져요.", rem2: "연맹 이벤트 시간은 우리가 올려요. 틀렸다면 그 Sparrow를 찾아가세요 — 그건 그녀 잘못이에요 🐦",
      inst1: "이 페이지는 사이트를 앱으로 설치하는 방법이에요. 아이폰은 설치한 앱에서만 알림이 와요. 꼼꼼히 읽어 주세요." },
    de: { pick: "Was willst du lernen?", tmr: "⏰ Timer stellen", rem: "🎮 Spiel-Erinnerungen", inst: "📲 Als App installieren", back: "‹ Zurück", next: "Weiter ›", done: "Fertig ✓", stop: "✕ Stopp", also: "Soll ich dir auch {x} zeigen?", alsoYes: "Ja, zeig mir", alsoNo: "Nein danke",
      tmr1: "Das ist ⏰ Meine Timer. Tippe darauf.", tmr2: "Zuerst die Benachrichtigungen. Steht da „an“, tippe auf „Test senden“, verlasse die App und warte 15 s auf den roten Punkt. Sonst erst das machen, was hier steht.",
      tmr2ios: "Auf dem iPhone kommen Timer nur aus der installierten App. Lies zuerst 📲 Als App installieren.",
      tmr3: "⚡ Schnellstart: deine letzten Zeiten. Training und Sammeln merken sich die Zeit – ein Tipp startet sie neu. Der Adelsberater hat eine eigene Zeit.", tmr4: "＋ Timer stellen: auswählen, die Zeit aus dem Spiel eintippen, speichern. „Sonstiges“ für alles, was nicht in der Liste ist.",
      tmr5: "Ämter kann man nur 24 h im Voraus buchen, darum stehen die Slots hier schon bereit – in deiner Ortszeit. Wenn Training, Bauen oder Forschung fertig wird, schlage ich dir einen Slot vor.",
      rem1: "🎮 Spiel-Erinnerungen: hake an, was du oft vergisst. Tippe auf eine Zeit zum Einschalten (orange mit ✓), nochmal zum Ausschalten.", rem2: "Allianz-Events nutzen unsere Zeiten. Ist eine falsch, geh zu DEM Sparrow – ihr Problem, nicht meins 🐦",
      inst1: "Diese Seite zeigt, wie du die Seite als App installierst. Lies sie genau – auf dem iPhone gibt es Benachrichtigungen nur in der App." },
    fr: { pick: "Tu veux apprendre quoi ?", tmr: "⏰ Mettre un minuteur", rem: "🎮 Rappels du jeu", inst: "📲 Installer en appli", back: "‹ Retour", next: "Suivant ›", done: "Terminé ✓", stop: "✕ Stop", also: "Je te montre aussi {x} ?", alsoYes: "Oui, montre-moi", alsoNo: "Non merci",
      tmr1: "Voici ⏰ Mes minuteurs. Touche pour ouvrir.", tmr2: "D'abord les notifications. Si c'est écrit « activées », touche « Envoyer un test », quitte l'appli et attends 15 s le point rouge. Sinon, fais d'abord ce qui est écrit ici.",
      tmr2ios: "Sur iPhone, les minuteurs ne préviennent que depuis l'appli installée. Lis d'abord 📲 Installer en appli.",
      tmr3: "⚡ Démarrage rapide : tes derniers temps. Entraînement et récolte retiennent le temps – un tap les relance. Le Conseiller noble a son propre temps.", tmr4: "＋ Mettre un minuteur : choisis quoi, tape le temps affiché par le jeu, enregistre. « Autre » pour ce qui n'est pas dans la liste.",
      tmr5: "Les postes se réservent seulement 24 h à l'avance, donc les créneaux sont déjà prêts ici, dans ton heure locale. Quand l'entraînement, la construction ou la recherche se termine, je te propose un créneau.",
      rem1: "🎮 Rappels du jeu : coche ce que tu oublies souvent. Touche une heure pour l'activer (orange avec ✓), encore une fois pour la couper.", rem2: "Les événements d'alliance utilisent nos horaires. S'il y en a un faux, va voir le vrai Moineau – c'est son problème, pas le mien 🐦",
      inst1: "Cette page montre comment installer le site en appli. Lis-la bien – sur iPhone, les notifications ne marchent que depuis l'appli installée." },
    pt: { pick: "O que você quer aprender?", tmr: "⏰ Criar um timer", rem: "🎮 Lembretes do jogo", inst: "📲 Instalar como app", back: "‹ Voltar", next: "Próximo ›", done: "Pronto ✓", stop: "✕ Parar", also: "Quer que eu mostre {x} também?", alsoYes: "Sim, mostra", alsoNo: "Não, obrigado",
      tmr1: "Isto é ⏰ Meus timers. Toque para abrir.", tmr2: "Primeiro, as notificações. Se disser que estão ativas, toque em “Enviar teste”, saia do app e espere 15 s pelo ponto vermelho. Se não, siga o que está escrito aqui antes.",
      tmr2ios: "No iPhone, os timers só avisam pelo app instalado. Leia 📲 Instalar como app primeiro e volte.",
      tmr3: "⚡ Início rápido: seus últimos tempos. Treino e coleta lembram o tempo — um toque reinicia. O Conselheiro nobre tem um tempo separado.", tmr4: "＋ Criar um timer: escolha o que é, digite o tempo que o jogo mostra e salve. “Outro” é para o que não está na lista.",
      tmr5: "Cargos só podem ser agendados com 24 h, então os horários já estão prontos aqui, no seu horário local. Quando treino, construção ou pesquisa terminar, eu sugiro um horário para agendar.",
      rem1: "🎮 Lembretes do jogo: marque o que você costuma esquecer. Toque num horário para ligar (fica laranja com ✓), toque de novo para desligar.", rem2: "Eventos da aliança usam os horários que postamos. Se algum estiver errado, vá falar com AQUELA Sparrow — o problema é dela, não meu 🐦",
      inst1: "Esta página mostra como instalar o site como app. Leia com atenção — no iPhone, as notificações só funcionam pelo app instalado." },
    es: { pick: "¿Qué quieres aprender?", tmr: "⏰ Poner un temporizador", rem: "🎮 Recordatorios del juego", inst: "📲 Instalar como app", back: "‹ Atrás", next: "Siguiente ›", done: "Listo ✓", stop: "✕ Parar", also: "¿Te muestro también {x}?", alsoYes: "Sí, muéstrame", alsoNo: "No, gracias",
      tmr1: "Esto es ⏰ Mis temporizadores. Toca para abrir.", tmr2: "Primero, las notificaciones. Si dice que están activas, toca «Enviar prueba», sal de la app y espera 15 s el punto rojo. Si no, sigue primero lo que dice aquí.",
      tmr2ios: "En iPhone, los temporizadores solo avisan desde la app instalada. Lee primero 📲 Instalar como app y vuelve.",
      tmr3: "⚡ Inicio rápido: tus últimos tiempos. Entrenamiento y recolección recuerdan el tiempo: un toque los reinicia. El Consejero noble tiene su propio tiempo.", tmr4: "＋ Poner un temporizador: elige qué es, escribe el tiempo que muestra el juego y guarda. «Otro» es para lo que no está en la lista.",
      tmr5: "Los cargos solo se reservan con 24 h, así que los turnos ya están listos aquí, en tu hora local. Cuando termine el entrenamiento, la construcción o la investigación, te sugeriré un turno.",
      rem1: "🎮 Recordatorios del juego: marca lo que sueles olvidar. Toca una hora para activarla (naranja con ✓), toca otra vez para apagarla.", rem2: "Los eventos de alianza usan las horas que publicamos. Si alguna está mal, ve con ESA Sparrow: es su problema, no el mío 🐦",
      inst1: "Esta página explica cómo instalar el sitio como app. Léela bien: en iPhone, las notificaciones solo funcionan desde la app instalada." },
    tr: { pick: "Neyi öğrenmek istersin?", tmr: "⏰ Zamanlayıcı kur", rem: "🎮 Oyun hatırlatmaları", inst: "📲 Uygulama olarak yükle", back: "‹ Geri", next: "İleri ›", done: "Bitti ✓", stop: "✕ Durdur", also: "{x} de göstereyim mi?", alsoYes: "Evet, göster", alsoNo: "Gerek yok",
      tmr1: "Bu ⏰ Zamanlayıcılarım. Açmak için dokun.", tmr2: "Önce bildirimler. Açık yazıyorsa “Test gönder”e dokun, uygulamadan çık ve kırmızı nokta için 15 sn bekle. Değilse önce burada yazanı yap.",
      tmr2ios: "iPhone'da zamanlayıcılar yalnızca yüklü uygulamadan uyarır. Önce 📲 Uygulama olarak yükle'yi oku, sonra dön.",
      tmr3: "⚡ Hızlı başlat: son sürelerin. Eğitim ve toplama süreyi hatırlar — tek dokunuşla yeniden başlar. Soylu Danışman'ın ayrı süresi vardır.", tmr4: "＋ Zamanlayıcı kur: ne olduğunu seç, oyunun gösterdiği süreyi yaz, kaydet. Listede olmayanlar için “Diğer”.",
      tmr5: "Makamlar sadece 24 saat önceden ayırtılabilir, bu yüzden saatler burada hazır, senin yerel saatinle. Eğitim, inşaat veya araştırma bitince ayırtman için bir saat öneririm.",
      rem1: "🎮 Oyun hatırlatmaları: sık unuttuklarını işaretle. Saate dokununca açılır (turuncu ✓), tekrar dokununca kapanır.", rem2: "İttifak etkinlikleri bizim yazdığımız saatleri kullanır. Yanlışsa O Sparrow'a git — onun sorunu, benim değil 🐦",
      inst1: "Bu sayfa siteyi uygulama olarak nasıl yükleyeceğini gösterir. Dikkatle oku — iPhone'da bildirimler yalnızca yüklü uygulamada çalışır." },
    id: { pick: "Mau belajar yang mana?", tmr: "⏰ Pasang timer", rem: "🎮 Pengingat game", inst: "📲 Pasang sebagai aplikasi", back: "‹ Kembali", next: "Lanjut ›", done: "Selesai ✓", stop: "✕ Berhenti", also: "Mau aku tunjukkan {x} juga?", alsoYes: "Ya, tunjukkan", alsoNo: "Tidak perlu",
      tmr1: "Ini ⏰ Timer saya. Ketuk untuk membuka.", tmr2: "Pertama, notifikasi. Kalau tertulis sudah aktif, ketuk “Kirim tes”, keluar dari aplikasi, dan tunggu 15 detik sampai titik merah muncul. Kalau belum, ikuti dulu yang tertulis di sini.",
      tmr2ios: "Di iPhone, timer hanya memberi tahu dari aplikasi yang terpasang. Baca dulu 📲 Pasang sebagai aplikasi, lalu kembali.",
      tmr3: "⚡ Mulai cepat: waktu terakhirmu. Latihan dan pengumpulan mengingat waktunya — satu ketukan memulai lagi. Noble Advisor punya waktu sendiri.", tmr4: "＋ Pasang timer: pilih apa, ketik waktu yang ditampilkan game, simpan. “Lainnya” untuk yang tidak ada di daftar.",
      tmr5: "Jabatan hanya bisa dipesan 24 jam sebelumnya, jadi slotnya sudah siap di sini, dalam waktu lokalmu. Saat latihan, bangunan, atau riset selesai, aku akan menyarankan slot untuk dipesan.",
      rem1: "🎮 Pengingat game: centang yang sering kamu lupa. Ketuk waktu untuk menyalakan (jadi oranye dengan ✓), ketuk lagi untuk mematikan.", rem2: "Acara aliansi memakai waktu yang kami posting. Kalau ada yang salah, cari Sparrow yang ITU — itu salahnya, bukan salahku 🐦",
      inst1: "Halaman ini menunjukkan cara memasang situs sebagai aplikasi. Baca baik-baik — di iPhone, notifikasi hanya berfungsi dari aplikasi yang terpasang." },
    ru: { pick: "Чему научить?", tmr: "⏰ Поставить таймер", rem: "🎮 Игровые напоминания", inst: "📲 Установить как приложение", back: "‹ Назад", next: "Далее ›", done: "Готово ✓", stop: "✕ Стоп", also: "Показать ещё и {x}?", alsoYes: "Да, покажи", alsoNo: "Не нужно",
      tmr1: "Это ⏰ Мои таймеры. Нажми, чтобы открыть.", tmr2: "Сначала уведомления. Если написано, что включены, нажми «Отправить тест», выйди из приложения и подожди 15 с красную точку. Если нет — сначала сделай то, что здесь написано.",
      tmr2ios: "На iPhone таймеры уведомляют только из установленного приложения. Сначала прочитай 📲 Установить как приложение.",
      tmr3: "⚡ Быстрый старт: твои последние времена. Обучение и сбор помнят время — один тап запускает снова. У Благородного советника своё время.", tmr4: "＋ Поставить таймер: выбери что, впиши время из игры, сохрани. «Другое» — для того, чего нет в списке.",
      tmr5: "Должности бронируются только за 24 ч, поэтому слоты уже готовы здесь, в твоём местном времени. Когда закончится обучение, стройка или исследование, я предложу слот.",
      rem1: "🎮 Игровые напоминания: отметь то, что часто забываешь. Нажми на время, чтобы включить (оранжевое с ✓), ещё раз — выключить.", rem2: "События альянса идут по нашему расписанию. Если что-то не так — иди к настоящему Воробью, это её проблема, не моя 🐦",
      inst1: "Эта страница показывает, как установить сайт как приложение. Читай внимательно — на iPhone уведомления работают только из установленного приложения." },
    th: { pick: "อยากเรียนอะไร?", tmr: "⏰ ตั้งตัวจับเวลา", rem: "🎮 แจ้งเตือนในเกม", inst: "📲 ติดตั้งเป็นแอป", back: "‹ กลับ", next: "ถัดไป ›", done: "เสร็จ ✓", stop: "✕ หยุด", also: "ให้ฉันพาดู {x} ด้วยไหม?", alsoYes: "เอาสิ พาดู", alsoNo: "ไม่เป็นไร",
      tmr1: "นี่คือ ⏰ ตัวจับเวลาของฉัน แตะเพื่อเปิด", tmr2: "ดูการแจ้งเตือนก่อน ถ้าบอกว่าเปิดแล้ว แตะ “ส่งทดสอบ” ออกจากแอปแล้วรอ 15 วินาที ดูจุดแดง ถ้ายังไม่เปิด ทำตามที่เขียนตรงนี้ก่อน",
      tmr2ios: "บน iPhone ตัวจับเวลาจะแจ้งเตือนได้เฉพาะจากแอปที่ติดตั้งแล้ว อ่าน 📲 ติดตั้งเป็นแอป ก่อนแล้วค่อยกลับมา",
      tmr3: "⚡ เริ่มด่วน: เวลาครั้งล่าสุด ฝึกทหารกับเก็บทรัพยากรจะจำเวลาไว้ แตะครั้งเดียวก็เริ่มใหม่ ที่ปรึกษาขุนนางมีเวลาแยกต่างหาก", tmr4: "＋ ตั้งตัวจับเวลา: เลือกว่าคืออะไร พิมพ์เวลาที่เกมแสดง แล้วบันทึก ที่ไม่อยู่ในรายการใช้ “อื่น ๆ”",
      tmr5: "ตำแหน่งจองได้แค่ล่วงหน้า 24 ชม. ช่วงเวลาจึงเตรียมไว้ให้แล้วตรงนี้ เป็นเวลาท้องถิ่นของคุณ พอฝึกทหาร ก่อสร้าง หรือวิจัยเสร็จ ฉันจะแนะนำช่วงเวลาให้จอง",
      rem1: "🎮 แจ้งเตือนในเกม: ติ๊กสิ่งที่มักลืม แตะเวลาเพื่อเปิด (เป็นสีส้มมี ✓) แตะอีกครั้งเพื่อปิด", rem2: "กิจกรรมพันธมิตรใช้เวลาที่เราโพสต์ ถ้าผิด ไปหา Sparrow ตัวนั้น — เป็นความผิดของเธอ ไม่ใช่ฉัน 🐦",
      inst1: "หน้านี้สอนวิธีติดตั้งเว็บเป็นแอป อ่านให้ละเอียด — บน iPhone การแจ้งเตือนใช้ได้เฉพาะจากแอปที่ติดตั้งแล้ว" },
    ar: { pick: "ماذا تريد أن تتعلم؟", tmr: "⏰ ضبط مؤقّت", rem: "🎮 تذكيرات اللعبة", inst: "📲 التثبيت كتطبيق", back: "‹ رجوع", next: "التالي ›", done: "تم ✓", stop: "✕ إيقاف", also: "هل أريك {x} أيضًا؟", alsoYes: "نعم، أرني", alsoNo: "لا شكرًا",
      tmr1: "هذا ⏰ مؤقّتاتي. اضغط لفتحه.", tmr2: "أولًا الإشعارات. إن كانت مفعّلة، اضغط «إرسال اختبار» واخرج من التطبيق وانتظر 15 ثانية لتظهر النقطة الحمراء. وإلا فافعل ما هو مكتوب هنا أولًا.",
      tmr2ios: "على iPhone لا تصلك المؤقّتات إلا من التطبيق المثبّت. اقرأ 📲 التثبيت كتطبيق أولًا ثم عد.",
      tmr3: "⚡ بدء سريع: أوقاتك الأخيرة. التدريب والجمع يتذكّران الوقت — ضغطة واحدة تعيد التشغيل. للمستشار النبيل وقت خاص.", tmr4: "＋ ضبط مؤقّت: اختر ما هو، اكتب الوقت كما تعرضه اللعبة، واحفظ. «أخرى» لما ليس في القائمة.",
      tmr5: "المناصب تُحجز قبل 24 ساعة فقط، لذلك الفترات جاهزة هنا بتوقيتك المحلي. عندما ينتهي التدريب أو البناء أو البحث سأقترح عليك فترة للحجز.",
      rem1: "🎮 تذكيرات اللعبة: علّم ما تنساه عادة. اضغط على وقت لتفعيله (يصبح برتقاليًا مع ✓)، واضغط مجددًا لإيقافه.", rem2: "أحداث التحالف تستخدم الأوقات التي ننشرها. إن كان أحدها خطأ فاذهب إلى Sparrow تلك — المشكلة مشكلتها لا مشكلتي 🐦",
      inst1: "هذه الصفحة تشرح تثبيت الموقع كتطبيق. اقرأها جيدًا — على iPhone لا تعمل الإشعارات إلا من التطبيق المثبّت." },
  };
  const tt = (k) => (TT[lang()] || TT.en)[k] || TT.en[k];
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent), standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;


  /* ---------- officer page tours (zh / en / pt / ar / ko — the officer page languages) ---------- */
  const OT = {
    en: { msgs: "💌 Message from THAT Sparrow", pick: "Which tab do you want me to show you?", onlyView: "(you can look, not edit)", ro: "You can look here but not change anything.",
      events: "📅 Events", board: "💬 Board", map: "🗺️ Map", ranking: "📊 Ranking", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", perms: "👥 Officers",
      ev1: "This week's calendar. Tap a day to see what runs that day. Filled = running now, ✅ = has an officer to-do (tap it to jump to the action items), the rest open the event's notes.", ev1b: "Kingdom #2189 milestones: the next one and when it lands.",
      ev2: "📣 Announcement draft: pick the next days and it writes the in-game announcement for you. 🔄 makes it again, 📋 copies it — paste it into the game.",
      ev2b: "⚙️ Troop limits used in the guides (Bear Hunt, rallies). Change a number and Save — every guide updates.", ev2c: "⏰ Our event times (UTC): the slots we run each event at. The timers on the main site use these.",
      ev3: "✅ Action items: officer to-dos for this week / next week. Tick them as you go; they are also what the admin reminders send.",
      ev4: "📋 Events & in-game guides: add or edit an event — emoji, name, when it starts, how often, days, notes, a guide link, its to-dos and the in-game guide text that gets pasted into the game.", ev4v: "📋 Events & in-game guides: every event with its notes, to-dos and the in-game guide text (tap to copy). Only editors can change them.",
      bd0: "Tasks assigned to you or where you were @'d show up here first.", bd1: "The board: one topic per plan. Everything is translated into each officer's language with the game's own terms, so nobody gets lost in chat.", bd1e: "＋ New topic: title and text, in your language — the others read it in theirs.",
      bd2: "Open a topic to read the replies and answer. Topics with a ✓ are decided (an admin marks the decision at the top). Only editors can post, but anyone @'d or assigned can reply in that topic.",
      mp1: "The kingdom map with our territory. A confession from THAT Sparrow: she doesn't open the map often, so it's updated only now and then. Need something changed right away? Go poke her 🐦", mp2: "Layers: switch banners, territory and the plan on and off. Zoom with + and −, drag to move.",
      mp3: "Tap an outpost on the map or in the list and this box tells you about it: type, buff, who holds it.", mp4: "🎁 Fortress & Sanctuary rewards: what each one gives, and the season points.",
      mp5: "📋 Outpost plan: mark 🎯 targets, ✅ ours (protected) and ⚔️ ours (vulnerable). Type the game's countdown once and the page flips protected ⇄ vulnerable by itself. 💾 Save so the other officers see it.", mp5v: "📋 Outpost plan: 🎯 targets, ✅ ours (protected), ⚔️ ours (vulnerable), with timers. Editors keep it up to date.",
      rk1: "First choose: just play with this on your own device, or share the plan with everyone? A shared plan's roster goes to 📋 Attendance. ↩️ undoes a step, 🕘 shows older versions.", rk1v: "Shared plans: everyone sees the same ticks and table. You can look; editors change them.",
      rk2: "Weights: how much power, TC and Mystic Trial count in the score. The note explains the formula.", rk2b: "Tick who is in: All / None, or tick members one by one in the table.",
      rk3: "Paste names from a screenshot (or the game's list) here and they get ticked for you.", rk3b: "Search a name, or show only the ticked members.",
      rk4: "The table: rank, TC, power, Mystic Trial, SP, migrant — sorted by the score.", rk5: "The result: top N by score, with a copy button for Discord.", rk6: "Event presets: a ready list for each event (Swordland, Tri-Alliance…) with the counts it needs — copy and post.",
      at1: "One sheet per event (Swordland, Tri-Alliance…). Sheets come from shared plans on 📊 Ranking: make a plan there, tick people, and it shows up here as a list.", at2: "Tap a sheet to open it. Each date on a sheet is one list: who confirmed, and after the battle who actually showed up.", at3: "✅ Confirmed: who signed up. Paste names from a screenshot to tick them, mark subs, or add someone from the roster.", at4: "Present: after the battle tap each name — ✓ came, 🛌 excused, ✗ missed. Misses add up: 2nd orange, 3rd red. ⭐ = top 20 by power. Save when done; Copy gives a text for Discord.",
      po0: "🛠️ Setup (admins): the GitHub key that lets this page publish. Already done — leave it.",
      po1s: "📜 Look: \"Scroll\" puts the announcement on a parchment scroll. The paper grows with the text, so it fits in every language — the Preview shows it. Pick \"Plain\" for a normal one. You can change it later with Edit without translating again.", po1: "✍️ Write an announcement: your name, the language you write in, title, text, a picture, a link to a guide, and when it expires. Preview, then Publish — it's translated into all 12 languages.", po1v: "✍️ Announcements are written here by editors: title, text, picture, guide link, expiry — published in all 12 languages.",
      po2: "✏️ Edit an announcement that's already out: pick it, then fix one language, re-translate all of them, or swap the picture.", po3: "📋 All announcements that are out, newest first. Reload to see the latest.",
      wa1: "Watch: the whole roster with name changes, power history, who joined or left. Type a name to search.", wa2: "Filters: only members with flags, what counts as “new”, rivals and farm alliances.", wa3: "The table: tap a row for the member's history and notes. Flags mark things worth a look.", wa4: "Who left, and when. Copy or CSV exports the list.",
      sc1: "Scout: top players of other kingdoms, from the public data. Type a kingdom number and fetch.", sc2: "Kingdoms already scouted — tap one to open its list again.",
      vw1: "Views: how many people open the site. Pick the number of days.", vw2: "Which pages and guides get opened.", vw3: "Site languages, countries, where visitors came from, and devices.",
      pm1: "Officer rights: who may view or edit each tab. A new officer starts with Events, Board and Map, view only. Tap a cell to change it; 👁️ previews the page as that officer.", pm2: "Add an officer by Discord ID. They log in with Discord and get exactly the tabs you gave them.", pm3: "🔑 Site-owner tools: keys and resets — admins only, rarely needed." },
    zh: { msgs: "💌 那個麻雀的留言", pick: "想看哪個分頁？", onlyView: "（你只能看，不能改）", ro: "這裡你只能看，不能改。",
      events: "📅 活動", board: "💬 留言板", map: "🗺️ 地圖", ranking: "📊 排名", attend: "📋 出席", post: "📢 公告", watch: "🕵️ 觀察", scout: "🔭 偵查", views: "📈 瀏覽", perms: "👥 幹部",
      ev1: "這週的日曆。點一天會列出當天的活動。實心＝進行中，✅＝有幹部待辦（點了跳到待辦事項），其他的會打開活動說明。", ev1b: "王國 #2189 里程碑：下一個是什麼、什麼時候到。",
      ev2: "📣 公告草稿：選接下來幾天，它會幫你寫好遊戲內公告。🔄 重新產生、📋 複製，貼進遊戲就好。",
      ev2b: "⚙️ 指南裡用的部隊上限（狩獵巨熊、集結）。改數字按儲存，所有指南一起更新。", ev2c: "⏰ 我們的活動時間（UTC）：每個活動我們固定開的時段。主網站的計時器用的就是這些。",
      ev3: "✅ 待辦事項：這週／下週的幹部待辦，做完打勾。管理提醒送的也是這些。",
      ev4: "📋 活動與遊戲內指南：新增或修改活動——表情符號、名稱、開始時間、多久一次、天數、備註、指南連結、待辦，還有要貼進遊戲的指南文字。", ev4v: "📋 活動與遊戲內指南：每個活動的說明、待辦和遊戲內指南文字（點一下複製）。只有編輯者能改。",
      bd0: "指派給你、或 @ 到你的事情會先出現在這裡。", bd1: "留言板：一個計畫一個主題。所有內容會用遊戲用語翻成每個幹部的語言，聊天才不會被洗掉。", bd1e: "＋ 新主題：用你的語言打標題和內容，其他人會看到他們的語言。",
      bd2: "打開主題可以看回覆、回答。打 ✓ 的是已經決定的（管理員會在最上面標決定）。只有編輯者能發文，但被 @ 或指派的人可以在那個主題裡回覆。",
      mp1: "王國地圖和我們的領地。那個麻雀（Sparrow）要先道歉：她不常翻地圖，所以地圖只是偶爾更新。有東西需要馬上改的話，直接去戳她 🐦", mp2: "圖層：旗子、領地、計畫可以開關。用 ＋ － 縮放，拖曳移動。",
      mp3: "點地圖上或清單裡的據點，這個框會告訴你：種類、加成、誰持有。", mp4: "🎁 要塞與遺跡獎勵：每個給什麼，還有賽季積分。",
      mp5: "📋 據點計畫：標 🎯 目標、✅ 我方（保護中）、⚔️ 我方（可爭奪）。輸入一次遊戲裡的倒數，頁面會自己切換保護 ⇄ 可爭奪。按 💾 儲存其他幹部才看得到。", mp5v: "📋 據點計畫：🎯 目標、✅ 我方（保護中）、⚔️ 我方（可爭奪），附倒數。由編輯者更新。",
      rk1: "先選：只是在自己的裝置上玩一玩，還是要跟大家共享這個計畫？共享的計畫名單會跑到 📋 出席。↩️ 可以退一步，🕘 看舊版本。", rk1v: "共享計畫：大家看到同一份勾選和表格。你可以看，編輯者才能改。",
      rk2: "權重：戰力、TC、秘境試煉各佔多少分。下面的說明有公式。", rk2b: "勾選參加的人：全選／全不選，或在表格裡一個一個勾。",
      rk3: "把截圖（或遊戲清單）的名字貼在這裡，會自動幫你勾好。", rk3b: "搜尋名字，或只顯示勾選的人。",
      rk4: "表格：階級、TC、戰力、秘境試煉、SP、移民——照分數排好。", rk5: "結果：分數前 N 名，有複製按鈕可以貼到 Discord。", rk6: "活動預設：每個活動（聖劍爭奪、三盟爭霸…）直接給你需要人數的名單，複製貼出去。",
      at1: "一個活動一張表（聖劍爭奪、三盟爭霸…）。表來自 📊 排名的共享計畫：在那邊建計畫、勾人，這裡就會出現名單。", at2: "點一張表打開。表裡每個日期是一份名單：誰報名了，打完之後誰真的有來。", at3: "✅ 已確認：報名的人。可以貼截圖的名字自動勾、標記替補，或從名冊加人。", at4: "出席：打完之後點每個名字——✓ 有來、🛌 請假、✗ 沒來。缺席會累積：第 2 次橘色、第 3 次紅色。⭐＝戰力前 20。做完按儲存；複製會給你一段可以貼到 Discord 的文字。",
      po0: "🛠️ 設定（管理員）：讓這頁能發布的 GitHub 金鑰。已經設好了，不用動。",
      po1s: "📜 樣式：選「捲軸」，公告會顯示在一張羊皮紙捲軸上。紙會跟著文字長度自動拉長，所以每種語言都放得下，預覽就看得到。想要一般的就選「一般」。之後用「修改」也能換，不會重新翻譯。", po1: "✍️ 寫公告：你的名字、你用的語言、標題、內容、圖片、指南連結、什麼時候到期。先預覽再發布，會翻成 12 種語言。", po1v: "✍️ 公告由編輯者在這裡寫：標題、內容、圖片、指南連結、到期時間，發布時翻成 12 種語言。",
      po2: "✏️ 修改已經發出去的公告：選一則，改某一個語言、全部重新翻譯，或換圖片。", po3: "📋 所有已發布的公告，最新的在上面。按重新整理看最新的。",
      wa1: "觀察：整個名冊，含改名、戰力歷史、誰加入誰離開。打名字搜尋。", wa2: "篩選：只看有標記的人、「新成員」算幾天內、敵對聯盟和小號聯盟。", wa3: "表格：點一列看那個人的歷史和備註。標記是值得注意的事。", wa4: "誰離開了、什麼時候。複製或 CSV 可以匯出。",
      sc1: "偵查：其他王國的頂尖玩家，來自公開資料。輸入王國編號就能抓。", sc2: "已經偵查過的王國，點一個再打開它的名單。",
      vw1: "瀏覽：多少人開過網站。可以選天數。", vw2: "哪些頁面和指南被打開。", vw3: "網站語言、國家、從哪裡來、用什麼裝置。",
      pm1: "幹部權限：每個分頁誰能看、誰能改。新幹部預設只有活動、留言板、地圖，而且只能看。點格子就能改；👁️ 用那個人的身分預覽。", pm2: "用 Discord ID 新增幹部。他們用 Discord 登入，就只會看到你給的分頁。", pm3: "🔑 站長工具：金鑰和重設——只有管理員，很少用到。" },
    pt: { msgs: "💌 Mensagem dAQUELA Sparrow", pick: "Qual aba você quer que eu mostre?", onlyView: "(você pode ver, não editar)", ro: "Aqui você pode ver, mas não mudar nada.",
      events: "📅 Eventos", board: "💬 Quadro", map: "🗺️ Mapa", ranking: "📊 Ranking", attend: "📋 Presença", post: "📢 Postar", watch: "🕵️ Vigiar", scout: "🔭 Espiar", views: "📈 Visitas", perms: "👥 Oficiais",
      ev1: "O calendário da semana. Toque num dia para ver o que acontece. Cheio = em andamento, ✅ = tem tarefa de oficial (toque para ir às tarefas), os outros abrem as notas do evento.", ev1b: "Marcos do reino #2189: o próximo e quando chega.",
      ev2: "📣 Rascunho de anúncio: escolha os próximos dias e ele escreve o anúncio do jogo. 🔄 refaz, 📋 copia — cole no jogo.",
      ev2b: "⚙️ Limites de tropas usados nos guias (Caça ao Urso, rallies). Mude um número e Salve — todos os guias atualizam.", ev2c: "⏰ Nossos horários de evento (UTC): os horários em que fazemos cada evento. Os timers do site principal usam estes.",
      ev3: "✅ Tarefas: pendências dos oficiais desta / próxima semana. Marque conforme faz; os lembretes de admin enviam estas.",
      ev4: "📋 Eventos e guias do jogo: adicione ou edite um evento — emoji, nome, início, frequência, dias, notas, link de guia, tarefas e o texto do guia que é colado no jogo.", ev4v: "📋 Eventos e guias do jogo: cada evento com notas, tarefas e o texto do guia (toque para copiar). Só editores mudam.",
      bd0: "Tarefas atribuídas a você ou onde te marcaram com @ aparecem aqui primeiro.", bd1: "O quadro: um tópico por plano. Tudo é traduzido para o idioma de cada oficial com os termos do jogo.", bd1e: "＋ Novo tópico: título e texto no seu idioma — os outros leem no deles.",
      bd2: "Abra um tópico para ler e responder. Tópicos com ✓ estão decididos (um admin marca a decisão no topo). Só editores postam, mas quem foi marcado ou designado pode responder nesse tópico.",
      mp1: "O mapa do reino com nosso território. Confissão dAQUELA Sparrow: ela não abre o mapa com frequência, então ele é atualizado só de vez em quando. Precisa de algo urgente? Vá cutucá-la 🐦", mp2: "Camadas: ligue e desligue bandeiras, território e o plano. Zoom com + e −, arraste para mover.",
      mp3: "Toque num posto no mapa ou na lista e esta caixa mostra: tipo, bônus, quem o tem.", mp4: "🎁 Recompensas de Fortalezas e Santuários: o que cada um dá e os pontos de temporada.",
      mp5: "📋 Plano de postos: marque 🎯 alvos, ✅ nossos (protegidos) e ⚔️ nossos (vulneráveis). Digite a contagem do jogo uma vez e a página alterna protegido ⇄ vulnerável sozinha. 💾 Salve para os outros verem.", mp5v: "📋 Plano de postos: 🎯 alvos, ✅ nossos (protegidos), ⚔️ nossos (vulneráveis), com timers. Os editores mantêm atualizado.",
      rk1: "Primeiro escolha: brincar só no seu aparelho, ou compartilhar o plano com todos? A lista de um plano compartilhado vai para 📋 Presença. ↩️ desfaz um passo, 🕘 mostra versões antigas.", rk1v: "Planos compartilhados: todos veem as mesmas marcações e tabela. Você vê; editores mudam.",
      rk2: "Pesos: quanto poder, TC e Prova Mística contam na pontuação. A nota explica a fórmula.", rk2b: "Marque quem participa: Todos / Nenhum, ou um por um na tabela.",
      rk3: "Cole aqui os nomes de uma captura (ou da lista do jogo) e eles são marcados para você.", rk3b: "Procure um nome, ou mostre só os marcados.",
      rk4: "A tabela: rank, TC, poder, Prova Mística, SP, migrante — ordenada pela pontuação.", rk5: "O resultado: top N por pontuação, com botão de copiar para o Discord.", rk6: "Predefinições de evento: lista pronta de cada evento (Swordland, Tri-Alliance…) com as quantidades — copie e poste.",
      at1: "Uma folha por evento (Swordland, Tri-Alliance…). As folhas vêm dos planos compartilhados do 📊 Ranking: crie um plano lá, marque as pessoas, e a lista aparece aqui.", at2: "Toque numa folha para abrir. Cada data é uma lista: quem confirmou e, depois da batalha, quem realmente apareceu.", at3: "✅ Confirmados: quem se inscreveu. Cole nomes de uma captura para marcar, indique reservas ou adicione alguém da lista de membros.", at4: "Presentes: depois da batalha toque em cada nome — ✓ veio, 🛌 justificado, ✗ faltou. Faltas acumulam: 2ª laranja, 3ª vermelha. ⭐ = top 20 por poder. Salve ao terminar; Copiar gera um texto para o Discord.",
      po0: "🛠️ Configuração (admins): a chave do GitHub que deixa esta página publicar. Já está feita — deixe como está.",
      po1s: "📜 Aparência: \"Pergaminho\" mostra o anúncio num pergaminho. O papel cresce com o texto, então cabe em todos os idiomas — a Pré-visualização mostra. Escolha \"Simples\" para o normal. Dá para mudar depois em Editar, sem traduzir de novo.", po1: "✍️ Escrever um anúncio: seu nome, o idioma em que escreve, título, texto, imagem, link para um guia e validade. Pré-visualize e Publique — é traduzido para os 12 idiomas.", po1v: "✍️ Os anúncios são escritos aqui pelos editores: título, texto, imagem, link de guia, validade — publicados em 12 idiomas.",
      po2: "✏️ Editar um anúncio já publicado: escolha-o, corrija um idioma, retraduza todos ou troque a imagem.", po3: "📋 Todos os anúncios publicados, do mais novo ao mais antigo. Recarregue para ver os mais recentes.",
      wa1: "Vigiar: toda a lista de membros com mudanças de nome, histórico de poder, quem entrou ou saiu. Digite um nome para buscar.", wa2: "Filtros: só membros com marcações, o que conta como “novo”, rivais e alianças farm.", wa3: "A tabela: toque numa linha para o histórico e as notas do membro. As marcações indicam o que vale olhar.", wa4: "Quem saiu, e quando. Copiar ou CSV exporta a lista.",
      sc1: "Espiar: os melhores jogadores de outros reinos, dos dados públicos. Digite o número do reino e busque.", sc2: "Reinos já espiados — toque num para abrir a lista de novo.",
      vw1: "Visitas: quantas pessoas abrem o site. Escolha o número de dias.", vw2: "Quais páginas e guias são abertos.", vw3: "Idiomas do site, países, de onde vieram e dispositivos.",
      pm1: "Direitos dos oficiais: quem pode ver ou editar cada aba. Um oficial novo começa com Eventos, Quadro e Mapa, só visualização. Toque numa célula para mudar; 👁️ vê a página como esse oficial.", pm2: "Adicione um oficial pelo ID do Discord. Ele entra com o Discord e vê exatamente as abas que você deu.", pm3: "🔑 Ferramentas do dono do site: chaves e resets — só admins, raramente necessário." },
    ar: { msgs: "💌 رسالة من Sparrow تلك", pick: "أي تبويب تريد أن أريك إياه؟", onlyView: "(يمكنك المشاهدة فقط، لا التعديل)", ro: "هنا يمكنك المشاهدة فقط دون تغيير أي شيء.",
      events: "📅 الأحداث", board: "💬 اللوحة", map: "🗺️ الخريطة", ranking: "📊 الترتيب", attend: "📋 الحضور", post: "📢 نشر", watch: "🕵️ مراقبة", scout: "🔭 استطلاع", views: "📈 الزيارات", perms: "👥 الضباط",
      ev1: "تقويم هذا الأسبوع. اضغط على يوم لترى ما يجري فيه. الممتلئ = جارٍ الآن، ✅ = له مهمة ضابط (اضغط للانتقال إلى المهام)، والباقي يفتح ملاحظات الحدث.", ev1b: "إنجازات المملكة #2189: التالي ومتى يحل.",
      ev2: "📣 مسودة الإعلان: اختر الأيام القادمة فيكتب لك إعلان اللعبة. 🔄 يعيد الكتابة، 📋 ينسخ — الصقه في اللعبة.",
      ev2b: "⚙️ حدود القوات المستخدمة في الأدلة (صيد الدببة، الحشود). غيّر رقمًا واحفظ — تتحدث كل الأدلة.", ev2c: "⏰ أوقات أحداثنا (UTC): الفترات التي نقيم فيها كل حدث. مؤقّتات الموقع الرئيسي تستخدمها.",
      ev3: "✅ المهام: مهام الضباط لهذا الأسبوع / الأسبوع القادم. علّمها عند إنجازها؛ وهي ما ترسله تذكيرات المدراء.",
      ev4: "📋 الأحداث وأدلة اللعبة: أضف أو عدّل حدثًا — الرمز، الاسم، وقت البدء، التكرار، الأيام، الملاحظات، رابط الدليل، المهام، ونص الدليل الذي يُلصق في اللعبة.", ev4v: "📋 الأحداث وأدلة اللعبة: كل حدث مع ملاحظاته ومهامه ونص الدليل (اضغط للنسخ). المحرّرون فقط يغيّرونها.",
      bd0: "المهام المسندة إليك أو التي أُشير إليك فيها بـ @ تظهر هنا أولًا.", bd1: "اللوحة: موضوع لكل خطة. كل شيء يُترجم إلى لغة كل ضابط بمصطلحات اللعبة.", bd1e: "＋ موضوع جديد: عنوان ونص بلغتك — يقرأه الآخرون بلغاتهم.",
      bd2: "افتح موضوعًا لقراءة الردود والإجابة. المواضيع التي عليها ✓ محسومة (يعلّم المدير القرار في الأعلى). المحرّرون فقط ينشرون، لكن من أُشير إليه أو أُسند إليه يستطيع الرد في ذلك الموضوع.",
      mp1: "خريطة المملكة مع أراضينا. اعتراف من Sparrow تلك: لا تفتح الخريطة كثيرًا، لذا تُحدَّث بين حين وآخر فقط. تحتاج تغييرًا فوريًا؟ اذهب ونبّهها 🐦", mp2: "الطبقات: فعّل أو عطّل الرايات والأراضي والخطة. كبّر وصغّر بـ + و −، واسحب للتحريك.",
      mp3: "اضغط على موقع في الخريطة أو القائمة فيخبرك هذا الصندوق: النوع، التعزيز، من يحوزه.", mp4: "🎁 مكافآت الحصون والمآوي: ما يعطيه كل منها ونقاط الموسم.",
      mp5: "📋 خطة المواقع: علّم 🎯 الأهداف، ✅ مواقعنا (محمية) و⚔️ مواقعنا (معرضة). اكتب عدّ اللعبة التنازلي مرة فتبدّل الصفحة محمي ⇄ معرض بنفسها. 💾 احفظ ليراها الضباط.", mp5v: "📋 خطة المواقع: 🎯 الأهداف، ✅ مواقعنا (محمية)، ⚔️ مواقعنا (معرضة)، مع مؤقّتات. يحدّثها المحرّرون.",
      rk1: "اختر أولًا: تجرّب على جهازك فقط، أم تشارك الخطة مع الجميع؟ قائمة الخطة المشتركة تذهب إلى 📋 الحضور. ↩️ يتراجع خطوة، 🕘 يعرض النسخ القديمة.", rk1v: "الخطط المشتركة: الجميع يرى التعليمات والجدول نفسه. أنت تشاهد؛ المحرّرون يغيّرون.",
      rk2: "الأوزان: كم تُحسب القوة وTC والتجربة الغامضة في النتيجة. الملاحظة تشرح المعادلة.", rk2b: "علّم المشاركين: الكل / لا أحد، أو واحدًا واحدًا في الجدول.",
      rk3: "الصق هنا الأسماء من لقطة شاشة (أو قائمة اللعبة) فتُعلَّم لك تلقائيًا.", rk3b: "ابحث عن اسم، أو اعرض المعلَّمين فقط.",
      rk4: "الجدول: الرتبة، TC، القوة، التجربة الغامضة، SP، مهاجر — مرتّب حسب النتيجة.", rk5: "النتيجة: أفضل N حسب النتيجة، مع زر نسخ إلى Discord.", rk6: "إعدادات الأحداث: قائمة جاهزة لكل حدث (Swordland، Tri-Alliance…) بالأعداد المطلوبة — انسخ وانشر.",
      at1: "ورقة لكل حدث (Swordland، Tri-Alliance…). الأوراق تأتي من الخطط المشتركة في 📊 الترتيب: أنشئ خطة هناك وعلّم الأعضاء، فتظهر هنا كقائمة.", at2: "اضغط على ورقة لفتحها. كل تاريخ فيها قائمة: من أكّد، وبعد المعركة من حضر فعلًا.", at3: "✅ المؤكَّدون: من سجّل. الصق الأسماء من لقطة شاشة لتعليمهم، أو علّم البدلاء، أو أضف أحدًا من القائمة.", at4: "الحضور: بعد المعركة اضغط على كل اسم — ✓ حضر، 🛌 معذور، ✗ غاب. الغيابات تتراكم: الثاني برتقالي، الثالث أحمر. ⭐ = أفضل 20 بالقوة. احفظ عند الانتهاء؛ نسخ يعطيك نصًا لـ Discord.",
      po0: "🛠️ الإعداد (المدراء): مفتاح GitHub الذي يسمح لهذه الصفحة بالنشر. مُعدّ مسبقًا — اتركه.",
      po1s: "📜 المظهر: «لفافة» يعرض الإعلان على لفافة رَقّ. تطول الورقة مع النص فيناسب كل اللغات — تراه في المعاينة. اختر «عادي» للشكل المعتاد. يمكنك تغييره لاحقًا من «تعديل» دون إعادة الترجمة.", po1: "✍️ اكتب إعلانًا: اسمك، لغة الكتابة، العنوان، النص، صورة، رابط إلى دليل، وموعد الانتهاء. عاين ثم انشر — يُترجم إلى 12 لغة.", po1v: "✍️ يكتب المحرّرون الإعلانات هنا: عنوان، نص، صورة، رابط دليل، انتهاء — تُنشر بـ 12 لغة.",
      po2: "✏️ عدّل إعلانًا منشورًا: اختره ثم أصلح لغة واحدة، أو أعد ترجمتها كلها، أو بدّل الصورة.", po3: "📋 كل الإعلانات المنشورة، الأحدث أولًا. أعد التحميل لترى الأحدث.",
      wa1: "مراقبة: القائمة كاملة مع تغييرات الأسماء وسجل القوة ومن انضم أو غادر. اكتب اسمًا للبحث.", wa2: "المرشحات: الأعضاء ذوو العلامات فقط، ما يُعد «جديدًا»، المنافسون وتحالفات المزارع.", wa3: "الجدول: اضغط على صف لترى سجل العضو وملاحظاته. العلامات تشير إلى ما يستحق النظر.", wa4: "من غادر ومتى. نسخ أو CSV يصدّر القائمة.",
      sc1: "استطلاع: أفضل لاعبي الممالك الأخرى من البيانات العامة. اكتب رقم المملكة واجلب.", sc2: "الممالك المستطلَعة سابقًا — اضغط على واحدة لفتح قائمتها مجددًا.",
      vw1: "الزيارات: كم شخصًا يفتح الموقع. اختر عدد الأيام.", vw2: "أي الصفحات والأدلة تُفتح.", vw3: "لغات الموقع، الدول، من أين جاء الزوار، والأجهزة.",
      pm1: "صلاحيات الضباط: من يستطيع مشاهدة أو تعديل كل تبويب. الضابط الجديد يبدأ بالأحداث واللوحة والخريطة للمشاهدة فقط. اضغط على خلية لتغييرها؛ 👁️ يعاين الصفحة بهوية ذلك الضابط.", pm2: "أضف ضابطًا بمعرّف Discord. يسجّل الدخول بـ Discord ويرى التبويبات التي أعطيته إياها بالضبط.", pm3: "🔑 أدوات مالك الموقع: المفاتيح وإعادة الضبط — للمدراء فقط، نادرًا ما تُحتاج." },
    ko: { msgs: "💌 그 Sparrow의 메시지", pick: "어느 탭을 보여줄까요?", onlyView: "(보기만 가능, 수정 불가)", ro: "여기는 보기만 할 수 있고 바꿀 수는 없어요.",
      events: "📅 이벤트", board: "💬 게시판", map: "🗺️ 지도", ranking: "📊 랭킹", attend: "📋 출석", post: "📢 공지", watch: "🕵️ 감시", scout: "🔭 정찰", views: "📈 조회", perms: "👥 간부",
      ev1: "이번 주 달력이에요. 날짜를 누르면 그날 이벤트가 나와요. 채워진 것 = 진행 중, ✅ = 간부 할 일 있음(누르면 할 일로 이동), 나머지는 이벤트 메모를 열어요.", ev1b: "왕국 #2189 마일스톤: 다음 것과 언제 도달하는지.",
      ev2: "📣 공지 초안: 다음 며칠을 고르면 게임 내 공지를 써 줘요. 🔄 다시 만들기, 📋 복사 — 게임에 붙여 넣으세요.",
      ev2b: "⚙️ 가이드에 쓰는 병력 제한(곰 사냥, 집결). 숫자를 바꾸고 저장하면 모든 가이드가 업데이트돼요.", ev2c: "⏰ 우리 이벤트 시간(UTC): 각 이벤트를 여는 시간대. 메인 사이트 타이머가 이걸 써요.",
      ev3: "✅ 할 일: 이번 주 / 다음 주 간부 할 일. 하면서 체크하세요. 관리 알림도 이걸 보내요.",
      ev4: "📋 이벤트 & 게임 내 가이드: 이벤트 추가·수정 — 이모지, 이름, 시작, 주기, 일수, 메모, 가이드 링크, 할 일, 게임에 붙여 넣는 가이드 텍스트.", ev4v: "📋 이벤트 & 게임 내 가이드: 이벤트마다 메모, 할 일, 가이드 텍스트(눌러서 복사). 편집자만 바꿀 수 있어요.",
      bd0: "나에게 배정됐거나 @로 불린 일이 여기 먼저 보여요.", bd1: "게시판: 계획마다 주제 하나. 모든 내용이 게임 용어로 각 간부의 언어로 번역돼요.", bd1e: "＋ 새 주제: 내 언어로 제목과 내용을 쓰면 다른 사람은 자기 언어로 읽어요.",
      bd2: "주제를 열어 답글을 읽고 답해요. ✓가 있는 주제는 결정된 거예요(관리자가 맨 위에 결정 표시). 편집자만 글을 쓰지만, @로 불리거나 배정된 사람은 그 주제에 답할 수 있어요.",
      mp1: "우리 영토가 있는 왕국 지도예요. 그 Sparrow의 고백: 지도를 자주 안 열어서 가끔만 업데이트돼요. 바로 바꿔야 하면 가서 찔러 주세요 🐦", mp2: "레이어: 깃발, 영토, 계획을 켜고 끌 수 있어요. + − 로 확대·축소, 드래그로 이동.",
      mp3: "지도나 목록에서 거점을 누르면 이 상자가 알려줘요: 종류, 버프, 누가 가졌는지.", mp4: "🎁 성채 · 유적 보상: 각각 무엇을 주는지, 시즌 포인트.",
      mp5: "📋 거점 계획: 🎯 목표, ✅ 우리 거점(보호), ⚔️ 우리 거점(쟁탈 가능)을 표시해요. 게임 카운트다운을 한 번 입력하면 페이지가 보호 ⇄ 쟁탈 가능을 알아서 바꿔요. 💾 저장해야 다른 간부가 봐요.", mp5v: "📋 거점 계획: 🎯 목표, ✅ 우리 거점(보호), ⚔️ 우리 거점(쟁탈 가능), 타이머 포함. 편집자가 업데이트해요.",
      rk1: "먼저 고르세요: 내 기기에서만 해 볼지, 모두와 계획을 공유할지. 공유한 계획의 명단은 📋 출석으로 가요. ↩️ 한 단계 되돌리기, 🕘 이전 버전 보기.", rk1v: "공유 계획: 모두 같은 체크와 표를 봐요. 보는 건 되고, 편집자가 바꿔요.",
      rk2: "가중치: 전투력, TC, 신비 시련을 점수에 얼마나 반영할지. 메모에 공식이 있어요.", rk2b: "참가자 체크: 전체 / 없음, 또는 표에서 한 명씩.",
      rk3: "스크린샷(또는 게임 목록)의 이름을 여기 붙여 넣으면 자동으로 체크돼요.", rk3b: "이름 검색, 또는 체크한 멤버만 보기.",
      rk4: "표: 등급, TC, 전투력, 신비 시련, SP, 이주 — 점수순.", rk5: "결과: 점수 상위 N명, Discord용 복사 버튼.", rk6: "이벤트 프리셋: 이벤트별(Swordland, Tri-Alliance…) 필요 인원에 맞춘 명단 — 복사해서 올리세요.",
      at1: "이벤트마다 시트 하나 (Swordland, Tri-Alliance…). 시트는 📊 랭킹의 공유 계획에서 와요: 거기서 계획을 만들고 사람을 체크하면 여기에 명단이 생겨요.", at2: "시트를 눌러 열어요. 날짜마다 명단 하나: 누가 확인했는지, 전투 후 누가 실제로 왔는지.", at3: "✅ 확인됨: 신청한 사람. 스크린샷 이름을 붙여 넣어 체크하거나, 후보를 표시하거나, 명단에서 추가하세요.", at4: "출석: 전투 후 이름을 눌러요 — ✓ 옴, 🛌 사유, ✗ 불참. 불참은 쌓여요: 2번째 주황, 3번째 빨강. ⭐ = 전투력 상위 20. 끝나면 저장; 복사하면 Discord용 텍스트가 나와요.",
      po0: "🛠️ 설정(관리자): 이 페이지가 게시할 수 있게 하는 GitHub 키. 이미 돼 있어요 — 그대로 두세요.",
      po1s: "📜 모양: \"두루마리\"를 고르면 공지가 양피지 두루마리에 표시돼요. 종이가 글 길이에 맞춰 늘어나서 모든 언어에 맞아요 — 미리보기에서 확인하세요. 평소처럼 하려면 \"기본\". 나중에 수정에서 바꿔도 다시 번역되지 않아요.", po1: "✍️ 공지 쓰기: 이름, 쓰는 언어, 제목, 내용, 사진, 가이드 링크, 만료. 미리보기 후 게시 — 12개 언어로 번역돼요.", po1v: "✍️ 공지는 편집자가 여기서 써요: 제목, 내용, 사진, 가이드 링크, 만료 — 12개 언어로 게시.",
      po2: "✏️ 이미 올린 공지 수정: 골라서 한 언어만 고치거나, 전부 다시 번역하거나, 사진을 바꿔요.", po3: "📋 게시된 모든 공지, 최신순. 새로고침하면 최신 걸 봐요.",
      wa1: "감시: 이름 변경, 전투력 기록, 가입·탈퇴가 있는 전체 명단. 이름을 입력해 검색.", wa2: "필터: 표시된 멤버만, “신규” 기준 일수, 라이벌과 농장 연맹.", wa3: "표: 행을 누르면 멤버의 기록과 메모. 표시는 눈여겨볼 것.", wa4: "누가 언제 나갔는지. 복사 또는 CSV로 내보내기.",
      sc1: "정찰: 공개 데이터로 본 다른 왕국의 상위 플레이어. 왕국 번호를 입력하고 가져오세요.", sc2: "이미 정찰한 왕국 — 누르면 명단을 다시 열어요.",
      vw1: "조회: 사이트를 연 사람 수. 일수를 고르세요.", vw2: "어떤 페이지와 가이드가 열리는지.", vw3: "사이트 언어, 국가, 유입 경로, 기기.",
      pm1: "간부 권한: 탭마다 누가 보고 수정할 수 있는지. 새 간부는 이벤트·게시판·지도 보기만으로 시작해요. 칸을 눌러 바꾸고, 👁️ 로 그 간부의 화면을 미리 봐요.", pm2: "Discord ID로 간부를 추가해요. Discord로 로그인하면 준 탭만 보여요.", pm3: "🔑 사이트 소유자 도구: 키와 초기화 — 관리자 전용, 거의 안 써요." },
  };
  const ot = (k) => (OT[lang()] || OT.en)[k] || OT.en[k];
  const OTOURS = {
    events: [["#cal", "ev1"], ["#msList", "ev1b"], ["#anCard", "ev2"], ["#limCard", "ev2b"], ["#etCard", "ev2c"], ["#todos", "ev3"], ["#ev_timed", "ev4"]],
    board: [["#bd_tasks", "bd0"], ["#bd_listView", "bd1"], ["#bd_newBtn", "bd1e", "edit"], ["#bd_list", "bd2"]],
    map: [["#km_box", "mp1"], ["#km_layers", "mp2"], ["#km_info", "mp3"], ["#km_flags", "mp4"], ["#km_plan", "mp5"]],
    ranking: [["#planCard", "rk1"], ["#rk_wRow", "rk2"], ["#allBtn", "rk2b"], ["#pasteBox", "rk3"], ["#rk_q", "rk3b"], ["#rk_list", "rk4"], ["#result", "rk5"], ["#presetBtns", "rk6"]],
    attend: [["#at_list", "at1"], ["#at_list .at-ev, #at_list .at-open, #at_list .at-make", "at2", "open"], ["#at_edit_body .chips", "at3"], ["#at_edit_body .at-plist", "at4"]],
    post: [["#setupCard", "po0", "edit"], ["#po_app", "po1"], ["#annStyleRow", "po1s", "edit"], ["#editCard", "po2", "edit"], ["#po_list", "po3"]],
    watch: [["#wa_q", "wa1"], ["#onlyFlag", "wa2"], ["#rows", "wa3"], ["#left", "wa4"]],
    scout: [["#sc_kid", "sc1"], ["#sc_kingdoms", "sc2"]],
    views: [["#vw_daily", "vw1"], ["#vw_pages", "vw2"], ["#vw_langs", "vw3"]],
    perms: [["#pm_tbl", "pm1"], ["#pm_name", "pm2"], ["#po_owner", "pm3", "edit"]],
  };
  /* text for a step: view-only officers get the "…v" variant when there is one, otherwise the text plus a short "look only" note on edit-only parts */
  const otStep = (tab, key, act) => { const ro = OFFICER.can && !OFFICER.can(tab, "edit"); if (ro && OT.en[key + "v"]) return ot(key + "v"); return ot(key) + (ro && act === "edit" ? " " + ot("ro") : ""); };

  /* ---------- personal messages from Sparrow (officer page). Lines: [clip, text]. Matched by Discord user id, or by name until the id is known ---------- */
  const MESSAGES = [
    { id: "762827904341246013", match: /^nia$|milk/i, lines: [
      ["bow", "Hi hi, Nia, hello there"], ["hi", "THAT Sparrow sent me to help you. My name is Little Sparrow."],
      ["cry", "I heard you've been busy busy, boo hoo"], ["tilt", "So you probably haven't had time to look around this site properly, right??"],
      ["hop", "That's okay, I'm here to help you now!"], ["teacher", "Here's the button to call me. Tap it when you have a question"],
      ["pop", "and I'll get summoned right out!"], ["heart", "You're the best, love you!"] ] },
    { id: "1240788094672834623", match: /armada|ΔRMΔDΔ/i, lines: [
      ["hi", "Hey Armada! THAT Sparrow sent me to help you. My name is Little Sparrow."],
      ["walk", "I've seen your footprints all over the site!!"], ["thumbs", "You're seriously awesome. Here's a thumbs up for you"],
      ["teacher", "Here's the button to call me. Tap it when you have a question"], ["pop", "and I'll get summoned right out!"],
      ["point", "If I still can't solve it for you, go find THAT Sparrow, because then it's definitely her problem"] ] },
  ];
  const me = () => { try { return JSON.parse(ls.get("nxs-discord-user") || "null"); } catch (e) { return null; } };
  const messageFor = (u) => u && MESSAGES.find((m) => (m.id && m.id === String(u.id)) || (!m.id && m.match.test(String(u.name || "")) ) || null);
  const msgKey = (m) => "msg:" + (m.id || m.match.source);
  const isRead = (m) => (ls.get(READ_LS) || "").split("|").includes(msgKey(m));
  const markRead = (m) => ls.set(READ_LS, (ls.get(READ_LS) || "") + "|" + msgKey(m));

  /* ---------- the bird ---------- */
  let META = null;
  const root = document.createElement("div"); root.className = "sp-root"; root.hidden = true;
  const bird = document.createElement("div"); bird.className = "sp-bird";
  const imgA = new Image(), imgB = new Image(); imgA.alt = ""; imgB.alt = ""; imgB.className = "sp-off";
  bird.append(imgA, imgB); root.appendChild(bird);
  const bubble = document.createElement("div"); bubble.className = "sp-bubble"; bubble.hidden = true; bubble.dir = "auto";
  let front = imgA, back = imgB, cur = null, clipTimer = null, pending = null, pos = { x: 0, y: 0 }, flip = false, zz = null;
  /* clips are fetched once into memory; every play gets a fresh object URL, so the animation starts from its first frame at once (no re-download) */
  const blobs = {};
  function preload(name) { if (!blobs[name]) blobs[name] = fetch(IMG + name + ".webp").then((r) => r.blob()).catch(() => { delete blobs[name]; return null; }); return blobs[name]; }
  const dur = (name) => { const m = META && META[name]; return m ? (m.n / m.fps) * 1000 : 3000; };
  function layout(name, img) {
    const m = META[name]; if (!m) return;
    const w = m.w * SIZE, h = m.h * SIZE, ax = m.anchor[0] * SIZE, ay = m.anchor[1] * SIZE;
    // each image keeps its own clip's size; it is placed so its feet (anchor) land on the root origin
    img.style.width = w + "px"; img.style.height = h + "px"; img.style.left = (-ax) + "px"; img.style.top = (-ay) + "px";
    bird.style.width = w + "px"; bird.style.height = h + "px"; bird.style.left = "0"; bird.style.top = "0";
    bird.style.transformOrigin = "0 0";
  }
  function place() { root.style.transform = `translate(${Math.round(pos.x)}px,${Math.round(pos.y)}px)`; placeBubble(); }
  function setFlip(f) { flip = !!f; bird.classList.toggle("sp-flip", flip); }
  /* show a clip. still=true keeps the last frame after it ends. Returns a promise that resolves when the clip ends (loops: right away). */
  function play(name, opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      if (!META || !META[name]) { resolve(true); return; }
      clearTimeout(clipTimer);
      if (pending) { const r = pending; pending = null; r(false); }   // the clip that was playing is cut short → its promise says so
      const m = META[name], same = cur === name && !front.src.includes("_end.webp");
      cur = name; if (!m.loop) pending = resolve;
      const swap = async () => {
        const blob = await preload(name); if (cur !== name) return;   // another clip was asked for meanwhile
        layout(name, back);
        const old = back.dataset.url; back.src = blob ? URL.createObjectURL(blob) : IMG + name + ".webp?r=" + Date.now(); back.dataset.url = blob ? back.src : "";
        if (old) URL.revokeObjectURL(old);
        back.onload = () => {
          if (cur !== name) return;
          back.classList.remove("sp-off"); front.classList.add("sp-off");
          const o = front; front = back; back = o;
          if (!m.loop) clipTimer = setTimeout(() => { if (cur === name) { front.src = IMG + name + "_end.png"; } if (pending === resolve) pending = null; resolve(true); }, dur(name) - 40);
          else resolve(true);
        };
      };
      if (same && m.loop) { resolve(true); return; }
      swap();
    });
  }
  function sleepZ(on) {
    if (zz) { zz.remove(); zz = null; }
    if (!on) return;
    zz = document.createElement("div"); zz.style.cssText = "position:absolute;left:60%;top:-8px";
    zz.innerHTML = '<span class="sp-zz">z</span><span class="sp-zz z2" style="left:8px;font-size:19px">z</span><span class="sp-zz z3" style="left:17px;font-size:23px">Z</span>';
    bird.appendChild(zz);
  }
  /* fly (whole bird on an arc) to a screen point where the feet should land */
  let flying = null;
  function flyTo(x, y) {
    return new Promise((resolve) => {
      if (flying) cancelAnimationFrame(flying.raf);
      const from = { ...pos }, dx = x - from.x, dy = y - from.y, dist = Math.hypot(dx, dy);
      if (dist < 4) { pos = { x, y }; place(); resolve(); return; }
      if (REDUCED) { pos = { x, y }; place(); resolve(); return; }
      setFlip(dx > 0);                                 // the fly clip faces left; mirror it when flying right
      play("fly", { squash: false });
      const D = Math.min(1600, 500 + dist * 1.6), t0 = performance.now(), lift = Math.min(90, 30 + dist * 0.25);
      const step = (now) => {
        const k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        pos = { x: from.x + dx * e, y: from.y + dy * e - Math.sin(Math.PI * k) * lift }; place();
        if (k < 1) flying.raf = requestAnimationFrame(step); else { flying = null; setFlip(false); resolve(); }
      };
      flying = { raf: requestAnimationFrame(step) };
    });
  }
  /* ---------- bubble ---------- */
  function placeBubble() {
    if (bubble.hidden) return;
    const m = META && META[cur]; const h = m ? m.h * SIZE : 100, w = m ? m.w * SIZE : 100, ax = m ? m.anchor[0] * SIZE : 50;
    const bw = bubble.offsetWidth, bh = bubble.offsetHeight, vw = innerWidth, vh = innerHeight;
    let left = pos.x - 30, top = pos.y - h - bh - 14, up = false;
    if (top < 8) { top = pos.y + 12; up = true; }
    // 🎯 while pointing at something, the bubble must not cover it: go above it, else below it, else beside the bird
    if (targetEl) {
      const r = visRect(targetEl), birdTop = pos.y - h;
      const above = Math.min(r.top, birdTop) - bh - 12, below = Math.max(r.bottom, pos.y) + 12;
      if (above >= 8) { top = above; up = false; }
      else if (below + bh <= vh - 8) { top = below; up = true; }
      else { top = Math.max(8, Math.min(top, vh - bh - 8)); }
      left = r.left + r.width / 2 - bw / 2;
    }
    left = Math.max(8, Math.min(left, vw - bw - 8));
    // …and never the sparrow itself: if the bubble would sit on the bird, move it to the other side of the bird
    const bx0 = pos.x - ax, bx1 = bx0 + w, by0 = pos.y - h, by1 = pos.y;
    if (left < bx1 && left + bw > bx0 && top < by1 && top + bh > by0) {
      if (by0 - bh - 10 >= 8) { top = by0 - bh - 10; up = false; }
      else if (by1 + 10 + bh <= vh - 8) { top = by1 + 10; up = true; }
      else { left = bx1 + 8 <= vw - bw - 8 ? bx1 + 8 : Math.max(8, bx0 - bw - 8); }
    }
    bubble.style.left = left + "px"; bubble.style.top = top + "px"; bubble.classList.toggle("sp-up", up);
    bubble.style.setProperty("--sp-tail", Math.max(14, Math.min(bw - 26, (targetEl ? visRect(targetEl).left + visRect(targetEl).width / 2 : pos.x) - left - 6)) + "px");
    void w; void ax;
  }
  function say(html, opts) {
    opts = opts || {};
    bubble.innerHTML = html; bubble.hidden = false; placeBubble();
    if (opts.foot !== false) {
      const f = document.createElement("div"); f.className = "sp-foot";
      f.innerHTML = `<span></span><button type="button" class="sp-hide">${esc(t("hide"))}</button>`;
      f.querySelector(".sp-hide").onclick = () => turnOff();
      bubble.appendChild(f);
    }
  }
  let redraw = null;   // how to draw the open bubble again (used when the language changes while it is open)
  const hush = () => { clearTimeout(bubbleTimer); redraw = null; bubble.hidden = true; bubble.innerHTML = ""; };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- on/off ---------- */
  let toggleBtn = null;
  function turnOff() { ls.set(LS, "off"); hush(); clearTarget(); root.hidden = true; showToggle(true); }
  function turnOn() { ls.set(LS, "on"); showToggle(false); root.hidden = false; start(); }
  function showToggle(show) {
    let bar = document.querySelector(".top-btns");
    if (!bar) { bar = document.querySelector(".sp-toggle-bar") || Object.assign(document.body.appendChild(document.createElement("div")), { className: "sp-toggle-bar" }); }
    if (!toggleBtn) { toggleBtn = document.createElement("button"); toggleBtn.className = "theme-toggle sp-toggle"; toggleBtn.type = "button"; toggleBtn.textContent = "🐦"; toggleBtn.onclick = turnOn; bar.prepend(toggleBtn); }
    toggleBtn.title = t("show"); toggleBtn.setAttribute("aria-label", t("show")); toggleBtn.hidden = !show;
  }

  /* ---------- where things are ---------- */
  const fab = () => document.querySelector(".ai-fab");
  function perchPoint() {   // feet on the top edge of the Ask AI button
    const f = fab(); if (!f) return { x: 60, y: innerHeight - 70 };
    const r = f.getBoundingClientRect(); return { x: r.left + Math.min(r.width - 24, 34), y: r.top + 3 };
  }
  // the part of an element that is on screen (a long list scrolled half-way must not send the sparrow off the top)
  function visRect(el) { const r = el.getBoundingClientRect(), top = Math.max(r.top, 56), bottom = Math.min(r.bottom, innerHeight - 8); return { left: r.left, right: r.right, width: r.width, top, bottom, height: Math.max(0, bottom - top) }; }
  function pointAt(el) {   // land next to an element (right side when there is room, else left)
    const r = visRect(el), m = META[cur] || META.idle, w = m.w * SIZE, h = m.h * SIZE;
    const right = r.right + 8 + w < innerWidth - 8, left = r.left - 8 - w > 8;
    if (right) return { x: r.right + 10 + w * 0.45, y: Math.min(innerHeight - 10, r.top + Math.min(r.height, 60) + h * 0.3), side: "r" };
    if (left) return { x: r.left - 10 - w * 0.45, y: Math.min(innerHeight - 10, r.top + Math.min(r.height, 60) + h * 0.3), side: "l" };
    return { x: r.left + Math.min(r.width - w * 0.5, w * 0.55), y: Math.max(h + 8, r.top - 6), side: "top" };   // no room beside it: stand on its top edge
  }
  let targetEl = null;
  const clearTarget = () => { if (targetEl) targetEl.classList.remove("sp-target"); targetEl = null; };
  function highlight(el) { clearTarget(); targetEl = el; el.classList.add("sp-target"); }

  /* ---------- main-site behaviour ---------- */
  let state = "off", idleTimer = null, busy = false;
  const IDLE_MS = 30000;
  function armIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(async () => {
      if (busy) { armIdle(); return; }
      busy = true; clearTarget(); hush();
      await goHome(); await play("sulky"); say(esc(t("sulky")), { foot: false });
      await wait(2600); hush(); await play("sleep"); sleepZ(true); state = "sleep"; busy = false;
    }, IDLE_MS);
  }
  async function goHome() { const p = perchPoint(); if (Math.hypot(p.x - pos.x, p.y - pos.y) > 6) { await flyTo(p.x, p.y); } await play("idle", { squash: false }); }
  async function greet() {
    busy = true; clearTarget(); sleepZ(false);
    await goHome(); const hi = play("hi");
    const menu = () => say(`<b>${esc(t("greet"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="page">${esc(t("page"))}</button><button type="button" data-a="how">${esc(t("how"))}</button><button type="button" data-a="none">${esc(t("none"))}</button></div>`);
    menu(); redraw = menu;
    state = "menu"; busy = false; armIdle();
    clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (state === "menu" && !busy) hush(); }, 4000);   // 4 s, then tuck away until tapped
    if (await hi) play("idle", { squash: false });
  }
  let bubbleTimer = null;
  // taps inside the bubble stay inside it: nothing behind gets them, and a tap also stops the bubble's auto-hide
  ["pointerdown", "touchstart", "mousedown"].forEach((ev) => bubble.addEventListener(ev, (e) => { e.stopPropagation(); clearTimeout(bubbleTimer); }, { passive: true }));
  bubble.addEventListener("click", (e) => e.stopPropagation());
  bubble.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-a]"); if (!b || busy) return;
    const a = b.dataset.a; busy = true; armIdle();
    if (a === "page") {
      hush(); if (window.NXSAI) NXSAI.open();
      const c = play("point"); say(esc(t("pageA"))); state = "page"; busy = false; if (await c) play("idle", { squash: false }); return;
    } else if (a === "how") {
      hush(); if (window.NXSAI) { NXSAI.open(); addAISection(); const sec = document.querySelector(".sp-ai-sec"); if (sec) sec.scrollIntoView({ block: "center" }); }
      const c = play("teacher"); state = "how"; busy = false;
      const sec = document.querySelector(".sp-ai-sec"); if (sec) { await wait(300); const p = pointAt(sec); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(sec); say(esc(t("howA")), { foot: false }); clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { hush(); clearTarget(); }, 4000); }
      if (await c) play("idle", { squash: false }); return;
    } else if (a === "tour") {
      busy = false; runTour(b.dataset.t); return;
    } else if (a === "menu") {
      busy = false; greet(); return;
    } else if (a === "hush") {
      busy = false; hush(); return;
    } else if (a === "none") {
      const c = play("point"); say(esc(t("noneA"))); state = "menu"; busy = false; if (await c) play("idle", { squash: false }); return;
    }
    busy = false;
  });

  /* ---------- guided tours ("how do I use…") ---------- */
  function tourMenu() {
    const items = [["tmr", tt("tmr")], ["rem", tt("rem")]];
    if (typeof GUIDES !== "undefined" && GUIDES["install-app"] && !standalone()) items.push(["inst", tt("inst")]);
    say(`<b>${esc(tt("pick"))}</b><div class="sp-opts">${items.map(([k, l]) => `<button type="button" class="sp-main" data-a="tour" data-t="${k}">${esc(l)}</button>`).join("")}<button type="button" data-a="menu">${esc(tt("back"))}</button></div>`);
    redraw = tourMenu;
  }
  let tour = null;
  const q = (sel, root) => (root || document).querySelector(sel);
  const visible = (el) => el && el.offsetParent !== null && el.getBoundingClientRect().height > 0;
  async function waitFor(fn, ms) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = fn(); if (v) return v; await wait(120); } return null; }
  /* go to an element: scroll it into view, fly next to it, highlight, explain. Buttons: Next / Done + Stop. Resolves "next" | "stop". */
  let stepResolve = null;   // the open step's "Next / Stop" promise, so a tab change can end the tour
  function cancelStep() { if (stepResolve) { const r = stepResolve; stepResolve = null; r("stop"); } }
  async function step(el, text, last) {
    cancelStep();
    if (el) { const tall = el.getBoundingClientRect().height > innerHeight * 0.4; el.scrollIntoView({ block: tall ? "start" : "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(420); if (tall) { const sc = el.closest(".ai-log, .tm-view, .ai-panel") || window; try { (sc === window ? window : sc).scrollBy(0, -70); } catch (e) {} await wait(150); } const p = pointAt(el); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(el); placeBubble(); }
    const c = play(el ? "point" : "teacher");
    return new Promise((resolve) => {
      stepResolve = resolve;
      const draw = () => {
        say(`<div>${esc(typeof text === "function" ? text() : text)}</div><div class="sp-opts"><button type="button" class="sp-main" data-s="next">${esc(last ? tt("done") : tt("next"))}</button><button type="button" data-s="stop">${esc(tt("stop"))}</button></div>`, { foot: false });
        bubble.querySelectorAll("[data-s]").forEach((b) => b.onclick = () => { stepResolve = null; redraw = null; resolve(b.dataset.s); });
        redraw = draw;
      };
      draw();
      c.then((ok) => { if (ok) play("idle", { squash: false }); });
    });
  }
  function offerTour(other) {
    const draw = () => say(`<b>${esc(tt("also").replace("{x}", tt(other)))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="tour" data-t="${other}">${esc(tt("alsoYes"))}</button><button type="button" data-a="hush">${esc(tt("alsoNo"))}</button></div>`);
    draw(); redraw = draw; clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (!busy) hush(); }, 8000);
  }
  async function runTour(id) {
    if (busy) return; busy = true; ["point", "teacher", "fly", "idle"].forEach(preload); hush(); clearTarget(); tour = id; clearTimeout(idleTimer);
    const ai = window.NXSAI, tm = window.NXSTimers, panel = ai && ai.panel;
    const end = async () => { clearTarget(); setFlip(false); tour = null; busy = false; await goHome(); hush(); state = "menu"; armIdle(); };
    const go = async (el, text, last) => { const r = await step(el, text, last); if (r === "stop") { await end(); return false; } return true; };
    if (id === "inst") {
      hush(); if (panel) panel.hidden = true;
      if (typeof switchGuide === "function") switchGuide("install-app");
      const title = await waitFor(() => q("#doc .doc-title"), 3000);
      if (!(await go(title, () => tt("inst1"), true))) return; await end(); return;
    }
    if (!ai || !tm) { await end(); return; }
    // open the chat, point at the ⏰ button in its header, then open the timers view
    ai.open(); await wait(250);
    const head = q(".ai-head button", panel);
    if (id === "tmr") {
      if (!(await go(head, () => tt("tmr1")))) return;
      tm.show(true); await wait(500);
      const note = await waitFor(() => { const n = q(".tm-view .tm-note"); return visible(n) ? n : null; }, 2500);
      if (!(await go(note, () => isIOS && !standalone() ? tt("tmr2ios") : tt("tmr2")))) return;
      const quick = q(".tm-view .tm-quick");
      if (quick && visible(quick)) { if (!(await go(quick, () => tt("tmr3")))) return; }
      const add = q(".tm-view [data-a=add]");
      if (!(await go(add || q(".tm-view #tmAdd"), () => tt("tmr4")))) return;
      if (!(await go(add || q(".tm-view #tmAdd"), () => tt("tmr5"), true))) return;
      await end(); offerTour("rem"); return;
    }
    if (id === "rem") {
      tm.show(true); await wait(500);
      const al = await waitFor(() => { const n = q(".tm-view .tm-alerts"); return visible(n) ? n : null; }, 2500);
      if (!(await go(al, () => tt("rem1")))) return;
      if (!(await go(al, () => tt("rem2"), true))) return;
      await end(); offerTour("tmr"); return;
    }
    await end();
  }
  /* the chat panel scrolls on its own: keep the sparrow and the ring on the element */
  setInterval(() => { if (tour && targetEl && !flying) { const p = pointAt(targetEl); if (Math.hypot(p.x - pos.x, p.y - pos.y) > 3) { pos = { x: p.x, y: p.y }; place(); } } }, 120);

  /* 🐦 "Show me how to…" inside the AI chat greeting: one button per tour; the AI's answers can also carry [label](tour:id) links */
  function addAISection() {
    const g = document.getElementById("aiGreet"); if (!g || g.querySelector(".sp-ai-sec")) return;
    const items = [["tmr", tt("tmr")], ["rem", tt("rem")]];
    if (typeof GUIDES !== "undefined" && GUIDES["install-app"] && !standalone()) items.push(["inst", tt("inst")]);
    const d = document.createElement("div"); d.className = "sp-ai-sec";
    d.innerHTML = `<div class="ai-grp">🐦 ${esc(t("how").replace(/^🎓\s*/, ""))}</div><div class="ai-chips">${items.map(([k, l]) => `<button type="button" class="ai-chip" data-tour="${k}">${esc(l)}</button>`).join("")}</div>`;
    const hint = g.querySelector(".ai-hint"); if (hint) hint.before(d); else g.appendChild(d);
  }
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-tour]"); if (!b) return; e.preventDefault(); if (window.NXSAI && NXSAI.panel) NXSAI.panel.hidden = true; runTour(b.dataset.tour); });
  window.addEventListener("nxs-ai-lang", () => { const s2 = document.querySelector(".sp-ai-sec"); if (s2) s2.remove(); addAISection(); });

  /* ---------- stand-alone tool pages: Bear Hunt calculator, KvK trade-off calculator, KvK points planner, booking guide, squad guide ---------- */
  const PAGE = (location.pathname.match(/(bear-calculator|kvk-calculator|kvk-optimizer|booking-guide|squad-guide)\.html/) || [])[1] || null;
  const TOOL = {
    en: { ask: "Want me to walk you through this page?", yes: "🐦 Show me", no: "No thanks",
      bear1: "Your troops & limits: type your infantry / cavalry / archers, your rally size and how many joiners' troops fit. These come from your own city screen.", bear2: "Valora (Bear Hunt Master): fill this only if the rally number above doesn't already include her.", bear3: "⚡ Auto split: the calculator splits your troops across marches for you — pick how many marches and whether to keep a reserve.", bear4: "The result: one line per march, with the exact troop counts. Copy it and set your marches like that.", bear5: "How it works: the rules behind the split, if you want to check the maths.",
      kcalc1: "Pick the event you're about to push, and how many days it runs.", kcalc2: "What you plan to spend: type the resources, speed-ups and items you'd use. The page shows what they would be worth in KvK points.", kcalc3: "Milestone rewards: what you get back at each tier for that spend — so you can see if it's worth it.", kcalc4: "Ranking and gem value: what a rank would cost and what the gems are worth. It's a reference only — whether to spend is your call.",
      kopt1: "Pick your goal: your personal total, or a push on one day for the ranking.", kopt2: "Targets and resources: type what you have (resources, speed-ups) — the planner only counts what you're willing to use.", kopt3: "Troops (Day 4): your troop numbers for the training day.", kopt4: "Score items, level by level: which upgrades give the most points for what you have, and the verdict at the bottom.",
      book1: "Pick the position you want to book — each tab is one.", book2: "Then follow the steps in order; the pictures show exactly where to tap in the game.", book3: "The tip at the end: the one thing people get wrong — read it before you book.",
      squad1: "Follow the steps in order; the pictures show the screens in the game.", squad2: "The tip at the end is the part people miss — read it before KvK." },
    zh: { ask: "要我帶你看這一頁嗎？", yes: "🐦 帶我看", no: "不用了",
      bear1: "你的士兵和上限：填步兵／騎兵／弓兵的數量、集結人數、還有別人加入能放多少。這些都在你自己的城裡看得到。", bear2: "維拉（狩獵巨熊大師）：上面的集結人數沒有算到她才需要填。", bear3: "⚡ 全自動分配：計算器幫你把兵分到每一隊，選幾隊、要不要留預備兵。", bear4: "結果：一隊一行，寫好確切的兵數。照著設定你的出征就好。", bear5: "怎麼用：分配背後的規則，想核對的可以看。",
      kcalc1: "選你要衝的活動，還有它跑幾天。", kcalc2: "打算花多少：填你會用掉的資源、加速、道具。頁面會算這些在 KvK 值多少分。", kcalc3: "里程碑獎勵：花這些能拿回每一階的什麼獎勵，看看值不值得。", kcalc4: "排名與鑽石換算：一個名次要花多少、鑽石值多少。這只是參考，花不花你自己決定。",
      kopt1: "選目標：個人總分，還是某一天衝排名。", kopt2: "目標和資源：填你有的（資源、加速），規劃器只算你願意用的。", kopt3: "士兵（第 4 天）：訓練日的兵數。", kopt4: "計分項目，一級一級列：手上的東西拿去升什麼最划算，最下面有結論。",
      book1: "選你要預約的官職，一個分頁一個。", book2: "然後照順序做，圖片就是遊戲裡要點的地方。", book3: "最後的小提醒是大家最常弄錯的地方，預約前先看一下。",
      squad1: "照順序做，圖片就是遊戲裡的畫面。", squad2: "最後的小提醒是大家最容易漏掉的，KvK 前先看。" },
    ko: { ask: "이 페이지를 안내해 줄까요?", yes: "🐦 보여줘", no: "괜찮아",
      bear1: "내 병력과 제한: 보병 / 기병 / 궁병 수, 집결 규모, 참가자 병력이 얼마나 들어가는지 입력해요. 내 도시 화면에서 볼 수 있어요.", bear2: "발로라(곰 사냥 마스터): 위 집결 수에 이미 포함되지 않았을 때만 입력해요.", bear3: "⚡ 자동 분배: 계산기가 병력을 부대별로 나눠 줘요 — 부대 수와 예비 병력 여부를 고르세요.", bear4: "결과: 부대마다 한 줄, 정확한 병력 수. 그대로 출정을 설정하세요.", bear5: "작동 방식: 분배 규칙이에요. 계산을 확인하고 싶을 때.",
      kcalc1: "밀 이벤트와 진행 일수를 고르세요.", kcalc2: "쓸 계획: 사용할 자원, 가속, 아이템을 입력하면 KvK 점수로 얼마인지 보여줘요.", kcalc3: "마일스톤 보상: 그만큼 쓰면 단계마다 무엇을 돌려받는지 — 가치가 있는지 보세요.", kcalc4: "랭킹과 다이아 가치: 순위에 드는 비용과 다이아 가치. 참고용이에요 — 쓸지는 본인이 정해요.",
      kopt1: "목표 선택: 개인 총점인지, 하루에 랭킹을 노릴지.", kopt2: "목표와 자원: 가진 것(자원, 가속)을 입력해요 — 쓸 의향이 있는 것만 계산해요.", kopt3: "병력(4일차): 훈련일의 병력 수.", kopt4: "점수 항목, 레벨별: 가진 걸로 어떤 업그레이드가 점수가 가장 높은지, 맨 아래 결론.",
      book1: "예약할 관직을 고르세요 — 탭 하나가 관직 하나예요.", book2: "순서대로 따라 하세요. 사진이 게임에서 누를 곳이에요.", book3: "마지막 팁은 사람들이 가장 많이 틀리는 부분 — 예약 전에 읽으세요.",
      squad1: "순서대로 따라 하세요. 사진이 게임 화면이에요.", squad2: "마지막 팁은 놓치기 쉬운 부분 — KvK 전에 읽으세요." },
    de: { ask: "Soll ich dich durch diese Seite führen?", yes: "🐦 Zeig mir", no: "Nein danke",
      bear1: "Deine Truppen & Limits: Infanterie / Kavallerie / Bogenschützen, deine Rallygröße und wie viele Truppen von Mitstreitern passen. Steht alles in deiner Stadt.", bear2: "Valora (Bärenjagd-Meisterin): nur ausfüllen, wenn die Rallyzahl oben sie nicht schon enthält.", bear3: "⚡ Auto-Aufteilung: der Rechner verteilt deine Truppen auf die Märsche – wähle die Anzahl und ob eine Reserve bleibt.", bear4: "Das Ergebnis: eine Zeile pro Marsch mit genauen Truppenzahlen. Kopieren und die Märsche so einstellen.", bear5: "So funktioniert es: die Regeln hinter der Aufteilung, falls du nachrechnen willst.",
      kcalc1: "Wähle das Event, das du pushen willst, und wie viele Tage es läuft.", kcalc2: "Was du ausgeben willst: Ressourcen, Beschleuniger, Items. Die Seite zeigt, was das in KvK-Punkten wert wäre.", kcalc3: "Meilenstein-Belohnungen: was du je Stufe dafür zurückbekommst – so siehst du, ob es sich lohnt.", kcalc4: "Rang und Edelstein-Wert: was ein Rang kostet und was die Edelsteine wert sind. Nur eine Referenz – ob du ausgibst, entscheidest du.",
      kopt1: "Wähle dein Ziel: persönliche Gesamtpunkte oder ein Push an einem Tag für die Rangliste.", kopt2: "Ziele und Ressourcen: trag ein, was du hast – der Planer zählt nur, was du einsetzen willst.", kopt3: "Truppen (Tag 4): deine Truppenzahlen für den Trainingstag.", kopt4: "Punkte-Items Stufe für Stufe: welche Upgrades die meisten Punkte bringen, und unten das Fazit.",
      book1: "Wähle das Amt, das du buchen willst – jeder Tab ist eins.", book2: "Dann die Schritte der Reihe nach; die Bilder zeigen genau, wo du im Spiel tippst.", book3: "Der Tipp am Ende: das, was die meisten falsch machen – vor dem Buchen lesen.",
      squad1: "Folge den Schritten der Reihe nach; die Bilder zeigen die Spiel-Bildschirme.", squad2: "Der Tipp am Ende ist der Teil, den viele übersehen – vor dem KvK lesen." },
    fr: { ask: "Je te guide sur cette page ?", yes: "🐦 Montre-moi", no: "Non merci",
      bear1: "Tes troupes et limites : infanterie / cavalerie / archers, la taille de ton rassemblement et combien de troupes des participants rentrent. Tout est dans ta ville.", bear2: "Valora (Maîtresse de la chasse à l'ours) : à remplir seulement si le nombre du rassemblement ne l'inclut pas déjà.", bear3: "⚡ Répartition auto : le calculateur répartit tes troupes entre les marches – choisis le nombre de marches et si tu gardes une réserve.", bear4: "Le résultat : une ligne par marche avec les effectifs exacts. Copie et règle tes marches comme ça.", bear5: "Comment ça marche : les règles derrière la répartition, si tu veux vérifier.",
      kcalc1: "Choisis l'événement que tu veux pousser et sa durée en jours.", kcalc2: "Ce que tu comptes dépenser : ressources, accélérations, objets. La page montre ce que ça vaudrait en points KvK.", kcalc3: "Récompenses de paliers : ce que tu récupères à chaque palier pour cette dépense – pour voir si ça vaut le coup.", kcalc4: "Classement et valeur en gemmes : ce que coûte un rang et ce que valent les gemmes. Simple référence – dépenser ou non, c'est toi qui décides.",
      kopt1: "Choisis ton objectif : ton total personnel, ou un push sur un jour pour le classement.", kopt2: "Objectifs et ressources : indique ce que tu as – le planificateur ne compte que ce que tu veux bien utiliser.", kopt3: "Troupes (Jour 4) : tes effectifs pour le jour d'entraînement.", kopt4: "Objets à points, niveau par niveau : quelles améliorations rapportent le plus avec ce que tu as, et le verdict en bas.",
      book1: "Choisis le poste à réserver – un onglet par poste.", book2: "Puis suis les étapes dans l'ordre ; les images montrent exactement où toucher dans le jeu.", book3: "L'astuce à la fin : ce que les gens ratent – lis-la avant de réserver.",
      squad1: "Suis les étapes dans l'ordre ; les images montrent les écrans du jeu.", squad2: "L'astuce à la fin est ce que les gens oublient – lis-la avant le KvK." },
    pt: { ask: "Quer que eu te guie nesta página?", yes: "🐦 Me mostra", no: "Não, obrigado",
      bear1: "Suas tropas e limites: infantaria / cavalaria / arqueiros, o tamanho da sua rally e quantas tropas dos participantes cabem. Está tudo na sua cidade.", bear2: "Valora (Mestra da Caça ao Urso): preencha só se o número da rally acima ainda não a inclui.", bear3: "⚡ Divisão automática: a calculadora divide suas tropas entre as marchas — escolha quantas marchas e se guarda reserva.", bear4: "O resultado: uma linha por marcha, com as tropas exatas. Copie e configure as marchas assim.", bear5: "Como funciona: as regras por trás da divisão, se quiser conferir.",
      kcalc1: "Escolha o evento que vai empurrar e quantos dias ele dura.", kcalc2: "O que pretende gastar: recursos, acelerações e itens. A página mostra quanto valeriam em pontos de KvK.", kcalc3: "Recompensas de marcos: o que você recebe em cada nível por esse gasto — para ver se vale a pena.", kcalc4: "Ranking e valor em gemas: quanto custa uma posição e quanto valem as gemas. Só referência — gastar ou não é decisão sua.",
      kopt1: "Escolha a meta: seu total pessoal, ou um empurrão num dia para o ranking.", kopt2: "Metas e recursos: digite o que tem (recursos, acelerações) — o planejador só conta o que você quer usar.", kopt3: "Tropas (Dia 4): seus números de tropas para o dia de treino.", kopt4: "Itens de pontuação, nível a nível: quais melhorias dão mais pontos com o que você tem, e o veredito embaixo.",
      book1: "Escolha o cargo que quer agendar — cada aba é um.", book2: "Depois siga os passos em ordem; as imagens mostram exatamente onde tocar no jogo.", book3: "A dica no fim é o que as pessoas erram — leia antes de agendar.",
      squad1: "Siga os passos em ordem; as imagens mostram as telas do jogo.", squad2: "A dica no fim é a parte que as pessoas perdem — leia antes do KvK." },
    es: { ask: "¿Te guío por esta página?", yes: "🐦 Muéstrame", no: "No, gracias",
      bear1: "Tus tropas y límites: infantería / caballería / arqueros, el tamaño de tu rally y cuántas tropas de los participantes caben. Todo está en tu ciudad.", bear2: "Valora (Maestra de la Cacería del Oso): rellénalo solo si el número del rally de arriba no la incluye ya.", bear3: "⚡ Reparto automático: la calculadora reparte tus tropas entre las marchas — elige cuántas marchas y si guardas reserva.", bear4: "El resultado: una línea por marcha con las tropas exactas. Cópialo y configura las marchas así.", bear5: "Cómo funciona: las reglas detrás del reparto, por si quieres comprobarlo.",
      kcalc1: "Elige el evento que vas a empujar y cuántos días dura.", kcalc2: "Lo que piensas gastar: recursos, aceleradores y objetos. La página muestra cuánto valdrían en puntos de KvK.", kcalc3: "Recompensas por hitos: lo que recibes en cada nivel por ese gasto — para ver si merece la pena.", kcalc4: "Ranking y valor en gemas: lo que cuesta un puesto y lo que valen las gemas. Solo es una referencia — gastar o no es cosa tuya.",
      kopt1: "Elige tu meta: tu total personal, o un empujón en un día para el ranking.", kopt2: "Metas y recursos: escribe lo que tienes (recursos, aceleradores) — el planificador solo cuenta lo que quieras usar.", kopt3: "Tropas (Día 4): tus números de tropas para el día de entrenamiento.", kopt4: "Objetos de puntos, nivel a nivel: qué mejoras dan más puntos con lo que tienes, y el veredicto abajo.",
      book1: "Elige el cargo que quieres reservar — cada pestaña es uno.", book2: "Luego sigue los pasos en orden; las imágenes muestran exactamente dónde tocar en el juego.", book3: "El consejo del final es lo que la gente hace mal — léelo antes de reservar.",
      squad1: "Sigue los pasos en orden; las imágenes muestran las pantallas del juego.", squad2: "El consejo del final es la parte que la gente se salta — léelo antes del KvK." },
    tr: { ask: "Bu sayfayı adım adım göstereyim mi?", yes: "🐦 Göster", no: "Gerek yok",
      bear1: "Birliklerin ve sınırlar: piyade / süvari / okçu sayıların, rally büyüklüğün ve katılanların kaç birliği sığıyor. Hepsi kendi şehrinde yazar.", bear2: "Valora (Ayı Avı Ustası): yalnızca yukarıdaki rally sayısı onu içermiyorsa doldur.", bear3: "⚡ Otomatik bölme: hesaplayıcı birliklerini seferlere senin yerine böler — sefer sayısını ve yedek bırakıp bırakmayacağını seç.", bear4: "Sonuç: her sefer için bir satır, tam birlik sayılarıyla. Kopyala ve seferlerini öyle ayarla.", bear5: "Nasıl çalışır: bölmenin arkasındaki kurallar, kontrol etmek istersen.",
      kcalc1: "Zorlayacağın etkinliği ve kaç gün sürdüğünü seç.", kcalc2: "Harcamayı planladığın: kaynaklar, hızlandırmalar, eşyalar. Sayfa bunların KvK puanı olarak değerini gösterir.", kcalc3: "Kilometre taşı ödülleri: o harcama için her kademede ne geri alırsın — değer mi diye bak.", kcalc4: "Sıralama ve elmas değeri: bir sıranın maliyeti ve elmasların değeri. Sadece referans — harcamak sana kalmış.",
      kopt1: "Hedefini seç: kişisel toplam mı, sıralama için tek günlük atak mı.", kopt2: "Hedefler ve kaynaklar: elindekileri yaz (kaynak, hızlandırma) — planlayıcı yalnızca kullanmak istediklerini sayar.", kopt3: "Birlikler (4. Gün): eğitim günü için birlik sayıların.", kopt4: "Puan veren öğeler, seviye seviye: elindekiyle hangi yükseltmeler en çok puan verir, altta sonuç.",
      book1: "Ayırtmak istediğin makamı seç — her sekme bir makam.", book2: "Sonra adımları sırayla izle; görseller oyunda tam nereye dokunacağını gösterir.", book3: "Sondaki ipucu herkesin yanlış yaptığı şey — ayırtmadan önce oku.",
      squad1: "Adımları sırayla izle; görseller oyun ekranlarını gösterir.", squad2: "Sondaki ipucu herkesin kaçırdığı kısım — KvK'dan önce oku." },
    id: { ask: "Mau aku pandu halaman ini?", yes: "🐦 Tunjukkan", no: "Tidak perlu",
      bear1: "Pasukan & batasmu: jumlah infanteri / kavaleri / pemanah, ukuran rally, dan berapa pasukan peserta yang muat. Semua ada di layar kotamu.", bear2: "Valora (Master Bear Hunt): isi hanya jika angka rally di atas belum memasukkannya.", bear3: "⚡ Bagi otomatis: kalkulator membagi pasukanmu ke tiap march — pilih jumlah march dan apakah menyisakan cadangan.", bear4: "Hasil: satu baris per march dengan jumlah pasukan persis. Salin dan atur march-mu seperti itu.", bear5: "Cara kerja: aturan di balik pembagian, kalau mau mengecek.",
      kcalc1: "Pilih event yang mau kamu kejar dan berapa hari berlangsung.", kcalc2: "Yang mau dipakai: sumber daya, speed-up, item. Halaman menunjukkan nilainya dalam poin KvK.", kcalc3: "Hadiah milestone: apa yang kamu dapat di tiap tingkat untuk pengeluaran itu — lihat apakah sepadan.", kcalc4: "Ranking dan nilai gem: biaya satu peringkat dan nilai gem. Hanya referensi — mau pakai atau tidak, terserah kamu.",
      kopt1: "Pilih tujuan: total pribadi, atau dorong di satu hari untuk ranking.", kopt2: "Target dan sumber daya: isi yang kamu punya (sumber daya, speed-up) — perencana hanya menghitung yang mau kamu pakai.", kopt3: "Pasukan (Hari 4): jumlah pasukanmu untuk hari latihan.", kopt4: "Item skor, per level: upgrade mana yang paling banyak poin dengan yang kamu punya, dan kesimpulan di bawah.",
      book1: "Pilih jabatan yang mau dipesan — satu tab satu jabatan.", book2: "Lalu ikuti langkahnya berurutan; gambar menunjukkan persis di mana harus mengetuk di game.", book3: "Tips di akhir adalah yang sering salah — baca sebelum memesan.",
      squad1: "Ikuti langkahnya berurutan; gambar menunjukkan layar game.", squad2: "Tips di akhir adalah bagian yang sering terlewat — baca sebelum KvK." },
    ru: { ask: "Провести тебя по этой странице?", yes: "🐦 Покажи", no: "Не нужно",
      bear1: "Твои войска и лимиты: пехота / кавалерия / лучники, размер сбора и сколько войск участников помещается. Всё это есть в твоём городе.", bear2: "Валора (мастер Охоты на медведя): заполняй только если число сбора выше её не учитывает.", bear3: "⚡ Авторазбивка: калькулятор сам делит войска по маршам — выбери число маршей и оставлять ли резерв.", bear4: "Результат: по строке на марш с точным числом войск. Скопируй и выставь марши так.", bear5: "Как это работает: правила разбивки, если хочешь проверить.",
      kcalc1: "Выбери событие, которое собираешься пушить, и сколько дней оно идёт.", kcalc2: "Что планируешь потратить: ресурсы, ускорения, предметы. Страница покажет, сколько это стоит в очках KvK.", kcalc3: "Награды за рубежи: что вернётся на каждом уровне за эти траты — видно, стоит ли оно того.", kcalc4: "Рейтинг и цена в самоцветах: сколько стоит место и сколько стоят самоцветы. Только справка — тратить или нет, решаешь ты.",
      kopt1: "Выбери цель: личный итог или пуш в один день ради рейтинга.", kopt2: "Цели и ресурсы: впиши, что есть (ресурсы, ускорения) — планировщик считает только то, что ты готов использовать.", kopt3: "Войска (день 4): числа войск на день обучения.", kopt4: "Очковые предметы по уровням: какие улучшения дают больше всего очков с тем, что есть, и вывод внизу.",
      book1: "Выбери должность для брони — каждая вкладка одна должность.", book2: "Дальше по шагам; картинки показывают, куда нажимать в игре.", book3: "Совет в конце — то, что все делают неправильно. Прочитай перед бронью.",
      squad1: "Иди по шагам; картинки показывают экраны игры.", squad2: "Совет в конце — то, что все упускают. Прочитай перед KvK." },
    th: { ask: "ให้ฉันพาดูหน้านี้ไหม?", yes: "🐦 พาดูหน่อย", no: "ไม่เป็นไร",
      bear1: "ทหารและขีดจำกัดของคุณ: ใส่จำนวนทหารราบ / ม้า / ธนู ขนาดการรวมพล และทหารของผู้เข้าร่วมใส่ได้เท่าไร ดูได้จากเมืองของคุณเอง", bear2: "วาโลรา (ปรมาจารย์ล่าหมี): กรอกเฉพาะเมื่อจำนวนรวมพลด้านบนยังไม่ได้นับเธอ", bear3: "⚡ แบ่งอัตโนมัติ: เครื่องคิดเลขแบ่งทหารให้แต่ละกองทัพ — เลือกจำนวนกองและจะเก็บสำรองไหม", bear4: "ผลลัพธ์: หนึ่งบรรทัดต่อกอง พร้อมจำนวนทหารที่แน่นอน คัดลอกแล้วตั้งค่ากองทัพตามนั้น", bear5: "วิธีทำงาน: กฎเบื้องหลังการแบ่ง ถ้าอยากตรวจสอบ",
      kcalc1: "เลือกกิจกรรมที่จะทุ่ม และจำนวนวันที่จัด", kcalc2: "ตั้งใจจะใช้เท่าไร: ใส่ทรัพยากร เร่งความเร็ว ไอเทมที่จะใช้ หน้านี้จะแสดงว่าคิดเป็นแต้ม KvK เท่าไร", kcalc3: "รางวัลไมล์สโตน: ใช้เท่านี้ได้อะไรกลับมาในแต่ละขั้น — ดูว่าคุ้มไหม", kcalc4: "อันดับและมูลค่าเพชร: อันดับหนึ่งใช้เท่าไร เพชรมีค่าเท่าไร เป็นแค่ข้อมูลอ้างอิง — จะใช้หรือไม่คุณตัดสินใจเอง",
      kopt1: "เลือกเป้าหมาย: แต้มรวมส่วนตัว หรือทุ่มวันเดียวเพื่ออันดับ", kopt2: "เป้าหมายและทรัพยากร: ใส่สิ่งที่มี (ทรัพยากร เร่งความเร็ว) — ตัวช่วยวางแผนนับเฉพาะที่คุณยอมใช้", kopt3: "ทหาร (วันที่ 4): จำนวนทหารสำหรับวันฝึก", kopt4: "รายการทำแต้ม ทีละระดับ: อัปเกรดอะไรได้แต้มมากที่สุดจากที่มี และสรุปด้านล่าง",
      book1: "เลือกตำแหน่งที่จะจอง — แต่ละแท็บคือหนึ่งตำแหน่ง", book2: "แล้วทำตามขั้นตอนตามลำดับ รูปแสดงจุดที่ต้องแตะในเกม", book3: "เคล็ดลับท้ายสุดคือจุดที่คนทำผิดบ่อย — อ่านก่อนจอง",
      squad1: "ทำตามขั้นตอนตามลำดับ รูปแสดงหน้าจอในเกม", squad2: "เคล็ดลับท้ายสุดคือส่วนที่คนมักพลาด — อ่านก่อน KvK" },
    ar: { ask: "هل أرافقك في هذه الصفحة؟", yes: "🐦 أرني", no: "لا شكرًا",
      bear1: "قواتك وحدودك: اكتب المشاة / الفرسان / الرماة، حجم حشدك وكم تتسع قوات المنضمين. كل هذا في شاشة مدينتك.", bear2: "فالورا (سيدة صيد الدببة): املأها فقط إن كان رقم الحشد أعلاه لا يشملها.", bear3: "⚡ التقسيم التلقائي: تقسم الحاسبة قواتك على المسيرات — اختر عدد المسيرات وهل تبقي احتياطيًا.", bear4: "النتيجة: سطر لكل مسيرة بأعداد القوات بالضبط. انسخه واضبط مسيراتك هكذا.", bear5: "كيف يعمل: قواعد التقسيم، إن أردت التحقق من الحساب.",
      kcalc1: "اختر الحدث الذي ستدفع فيه وكم يومًا يستمر.", kcalc2: "ما تنوي إنفاقه: الموارد والتسريعات والعناصر. تعرض الصفحة قيمتها بنقاط KvK.", kcalc3: "مكافآت المراحل: ما تستعيده في كل مستوى مقابل ذلك الإنفاق — لترى إن كان يستحق.", kcalc4: "الترتيب وقيمة الجواهر: كم يكلف مركز وكم تساوي الجواهر. مرجع فقط — الإنفاق قرارك.",
      kopt1: "اختر هدفك: مجموعك الشخصي، أم دفعة في يوم واحد للترتيب.", kopt2: "الأهداف والموارد: اكتب ما لديك (موارد، تسريعات) — المخطط يحسب ما أنت مستعد لاستخدامه فقط.", kopt3: "القوات (اليوم 4): أعداد قواتك ليوم التدريب.", kopt4: "عناصر النقاط مستوى بمستوى: أي ترقيات تعطي أكثر النقاط بما لديك، والخلاصة في الأسفل.",
      book1: "اختر المنصب الذي تريد حجزه — كل تبويب منصب.", book2: "ثم اتبع الخطوات بالترتيب؛ الصور تبيّن بالضبط أين تضغط في اللعبة.", book3: "النصيحة في النهاية هي ما يخطئ فيه الناس — اقرأها قبل الحجز.",
      squad1: "اتبع الخطوات بالترتيب؛ الصور تبيّن شاشات اللعبة.", squad2: "النصيحة في النهاية هي ما يفوته الناس — اقرأها قبل KvK." },
  };
  const tl = (k) => (TOOL[lang()] || TOOL.en)[k] || TOOL.en[k];
  const TOOL_STEPS = {
    "bear-calculator": [["#bt_hTroops", "bear1"], ["#bt_hVal", "bear2"], ["#bt_hAuto", "bear3"], ["#bt_forms", "bear4"], ["#bt_hHow", "bear5"]],
    "kvk-calculator": [["#events", "kcalc1"], ["#spend", "kcalc2"], ["#ms", "kcalc3"], ["#rank", "kcalc4"]],
    "kvk-optimizer": [["#modes", "kopt1"], ["#targets", "kopt2"], ["#troops", "kopt3"], ["#lv", "kopt4"]],
    "booking-guide": [["#tabs", "book1"], ["#steps", "book2"], ["#tip", "book3"]],
    "squad-guide": [["#steps", "squad1"], ["#tip", "squad2"]],
  };
  async function runToolTour() {
    if (busy || !PAGE) return; busy = true; hush(); clearTarget(); tour = PAGE; ["point", "fly", "idle"].forEach(preload);
    const steps = TOOL_STEPS[PAGE] || [];
    for (let i = 0; i < steps.length; i++) {
      const [sel, key] = steps[i]; const el = await waitFor(() => { const e = document.querySelector(sel); return visible(e) ? e : null; }, 1500);
      if (!el) continue;
      const r = await step(el, () => tl(key), i === steps.length - 1); if (r === "stop") break;
    }
    clearTarget(); setFlip(false); tour = null; busy = false; await goHome(); hush();
  }
  function toolAsk() {
    say(`<b>${esc(tl("ask"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="ttour">${esc(tl("yes"))}</button><button type="button" data-a="tno">${esc(tl("no"))}</button></div>`);
    redraw = toolAsk; clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (!busy) hush(); }, 6000);
  }
  async function startTool() {
    if (ls.get(LS) === "off") { showToggle(true); return; }
    root.hidden = false; pos = perchPoint(); place(); await play("idle", { squash: false }); state = "menu";
    if (!sessionStorage.getItem("nxs-sparrow-tool-" + PAGE)) { try { sessionStorage.setItem("nxs-sparrow-tool-" + PAGE, "1"); } catch (e) {} const c = play("hi"); toolAsk(); if (await c) play("idle", { squash: false }); }
  }
  bubble.addEventListener("click", (e) => { const b = e.target.closest("button[data-a=ttour], button[data-a=tno]"); if (!b) return; hush(); if (b.dataset.a === "ttour") runToolTour(); });
  /* a guide was opened while the sparrow was helping to find a page → fly to its title and point at it */
  async function onGuideOpened() {
    if (state !== "page" || busy) return;
    const title = document.querySelector("#doc .doc-title"); if (!title) return;
    busy = true; hush();
    if (window.NXSAI && NXSAI.panel) NXSAI.panel.hidden = true;
    await wait(250);
    title.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(450);
    const p = pointAt(title); await flyTo(p.x, p.y);
    setFlip(p.side === "l");   // the point clip points to the right; mirror it when the sparrow lands on the left
    highlight(title); const c = play("point"); say(esc(t("here"))); state = "menu"; busy = false; armIdle();
    if (await c) { play("idle", { squash: false }); setFlip(false); }
  }
  bird.addEventListener("click", async () => {
    if (busy || tour) return;
    if (!bubble.hidden && bubble.querySelector(".sp-opts")) { hush(); clearTarget(); return; }   // a tap on the sparrow tucks its menu away
    if (IS_OFFICER) { officerMenu(); return; }
    if (IS_TOOL) { const c = play("hi"); toolAsk(); if (await c) play("idle", { squash: false }); return; }
    if (typeof langChosen !== "undefined" && !langChosen) return;   // language picker is up: stay asleep
    if (state === "sleep") { busy = true; sleepZ(false); await play("wake"); busy = false; }
    greet();
  });
  /* officer message hint on the main site: fly to 📋 and point */
  async function msgHint() {
    const ob = document.getElementById("officerBtn"); const u = me(); const m = messageFor(u);
    if (!ob || ob.hidden || !m || isRead(m)) return false;
    busy = true; await goHome(); await play("hi"); say(esc(t("msg")), { foot: false }); await wait(1800); hush();
    const p = pointAt(ob); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(ob); await play("point"); say(esc(t("msg")));
    await play("idle", { squash: false }); setFlip(false); busy = false; state = "menu"; armIdle(); return true;
  }

  async function start() {
    if (ls.get(LS) === "off") { showToggle(true); return; }
    root.hidden = false;
    const site = typeof langChosen !== "undefined";
    pos = perchPoint(); place();
    const picker = () => site && !langChosen;
    const wakeUp = async () => {
      sleepZ(false); busy = true; await play("wake"); busy = false;
      if (PREVIEW) { busy = true; await playMessage(MESSAGES[PREVIEW === "nia" ? 0 : 1], true); busy = false; state = "menu"; armIdle(); return; }   // 👀 preview of a personal message
      if (!(await msgHint())) greet();
    };
    const doze = async () => { clearTimeout(idleTimer); cancelStep(); hush(); clearTarget(); tour = null; busy = false; pos = perchPoint(); place(); await play("sleep", { squash: false }); sleepZ(true); state = "sleep"; };
    if (picker()) await doze(); else { await play("idle", { squash: false }); state = "menu"; await wakeUp(); }
    // 🌐 the language picker can come back any time ("Change language"): sleep while it is up, wake and greet again (in the new language) when a language is picked
    let wasPicker = picker();
    setInterval(async () => {
      const now = picker();
      if (now && !wasPicker) { wasPicker = true; await doze(); }
      else if (!now && wasPicker && !document.querySelector(".popup-overlay")) { wasPicker = false; await wakeUp(); }
    }, 400);
  }
  /* ---------- officer page: greeting once per visit, or the personal message from Sparrow ---------- */
  /* 🐦 section inside the AI chat on the officer page: one chip per tab the user can see, plus 💌 (the chat itself still goes to the AI) */
  function addOfficerAISection() {
    const g = document.getElementById("aiGreet"); if (!g) return;
    const old = g.querySelector(".sp-ai-sec"); if (old) old.remove();
    const tabs = [...document.querySelectorAll(".tabs a[data-tab]")].filter((a) => !a.hidden && OTOURS[a.dataset.tab]);
    const mine = messageFor(OFFICER.user);
    const d = document.createElement("div"); d.className = "sp-ai-sec";
    d.innerHTML = `<div class="ai-grp">🐦 ${esc(ot("pick"))}</div><div class="ai-chips">${tabs.map((a) => `<button type="button" class="ai-chip" data-otour="${a.dataset.tab}">${esc(ot(a.dataset.tab))}${OFFICER.can && !OFFICER.can(a.dataset.tab, "edit") ? ` <small>${esc(ot("onlyView"))}</small>` : ""}</button>`).join("")}${mine ? `<button type="button" class="ai-chip" data-omsg="1">${esc(ot("msgs"))}</button>` : ""}</div>`;
    const hint = g.querySelector(".ai-hint"); if (hint) hint.before(d); else g.appendChild(d);
  }
  async function officerMenu() {
    if (!window.NXSAI) return;
    NXSAI.open(); addOfficerAISection();
    const sec = document.querySelector(".sp-ai-sec"); if (!sec) return;
    sec.scrollIntoView({ block: "center" }); await wait(300);
    const p = pointAt(sec); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(sec);
    const c = play("point"); say(esc(t("howA")), { foot: false }); clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { hush(); clearTarget(); }, 4000);
    if (await c) play("idle", { squash: false });
  }
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-otour], [data-omsg]"); if (!b || !IS_OFFICER) return;
    e.preventDefault(); if (window.NXSAI && NXSAI.panel) NXSAI.panel.hidden = true; hush(); clearTarget();
    if (b.dataset.otour) runOfficerTour(b.dataset.otour);
    else if (!busy) { const m = messageFor(OFFICER.user); if (m) { busy = true; await playMessage(m, true); busy = false; } }
  });
  window.addEventListener("nxs-perms", () => { if (IS_OFFICER) addOfficerAISection(); });
  window.addEventListener("nxs-ai-lang", () => { if (IS_OFFICER) addOfficerAISection(); });
  async function runOfficerTour(tab) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const end = async () => { clearTarget(); setFlip(false); tour = null; busy = false; await goHome(); hush(); };
    const a = document.querySelector(`.tabs a[data-tab="${tab}"]`); if (!a) { await end(); return; }
    a.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(300);
    const p = pointAt(a); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(a); play("point"); await wait(700); a.click(); await wait(600);
    const steps = OTOURS[tab];
    for (let i = 0; i < steps.length; i++) {
      const [sel, key, act] = steps[i];
      if (act === "edit" && OFFICER.can && !OFFICER.can(tab, "edit") && !OT.en[key + "v"]) continue;   // editor-only part: nothing to show a view-only officer
      let el = await waitFor(() => { const e = document.querySelector(sel); return visible(e) ? e : null; }, i ? 1200 : 2500);
      if (!el) {
        const later = steps.slice(i + 1).some(([s2]) => visible(document.querySelector(s2)));
        if (later) continue;   // this part isn't on screen (e.g. the list, because a sheet is already open) → go on with what is
        if (act === "open") { await step(document.querySelector(`#pg-${tab} h1`) || a, () => otStep(tab, key, act), true); break; }   // nothing to open yet → say it and finish
        el = document.querySelector(`#pg-${tab} h1`) || a;
      }
      const r = await step(el, () => otStep(tab, key, act), i === steps.length - 1); if (r === "stop") break;
      if (act === "open" && r === "next") { el.click(); await wait(600); }
    }
    await end();
  }

  /* 🐦 a small "call Little Sparrow" button next to every feature on the officer page: tap → the sparrow flies there and explains just that one */
  function addCallButtons() {
    for (const tab in OTOURS) OTOURS[tab].forEach(([sel, key], i) => {
      const el = document.querySelector(sel); if (!el || el.querySelector(":scope > .sp-call") || (el.previousElementSibling && el.previousElementSibling.classList.contains("sp-call"))) return;
      const card = el.closest(".card, details, section"); const head = card && card !== el ? card.querySelector(":scope > h2, :scope > .top h2, :scope > summary, :scope > .top h1, :scope > h3") : null;
      if (head && head.querySelector(".sp-call")) return;
      const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("call"); b.setAttribute("aria-label", t("call"));
      b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); runOfficerStep(tab, i); };
      if (head) head.appendChild(b); else el.before(b);
    });
  }
  async function runOfficerStep(tab, i) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const [sel, key, act] = OTOURS[tab][i]; const el = document.querySelector(sel) || document.querySelector(`.tabs a[data-tab="${tab}"]`);
    await step(el, () => otStep(tab, key, act), true);
    clearTarget(); setFlip(false); tour = null; busy = false; await goHome(); hush();
  }
  if (IS_OFFICER) {
    setInterval(() => { if (root.hidden) return; try { addCallButtons(); } catch (e) {} }, 1500);
    window.addEventListener("hashchange", () => { if (tour) cancelStep(); });
    // 👁️ "Preview as" another officer (👥 tab): the sparrow delivers that officer's message, so Sparrow can see what they will see (nothing is marked read)
    let lastPv = null;
    window.addEventListener("nxs-perms", async () => {
      const pv = OFFICER.previewAs || null; if (pv === lastPv) return; lastPv = pv;
      if (!pv || busy || root.hidden) return;
      const m = messageFor({ id: pv }); if (!m) return;
      await wait(600); busy = true; await playMessage(m, true); busy = false;
    });
  }
  async function startOfficer() {
    if (ls.get(LS) === "off") { showToggle(true); return; }
    const gate = document.getElementById("gate");
    await new Promise((r) => { const tick = setInterval(() => { if ((!gate || gate.hidden) && OFFICER.user) { clearInterval(tick); r(); } }, 500); });
    root.hidden = false; pos = perchPoint(); place();
    const u = OFFICER.user, m = messageFor(u);
    if (m && !isRead(m)) { await playMessage(m); return; }
    if (sessionStorage.getItem("nxs-sparrow-greeted")) { await play("idle", { squash: false }); return; }
    try { sessionStorage.setItem("nxs-sparrow-greeted", "1"); } catch (e) {}
    const c = play("hi"); say(esc(t("oGreet").replace("{name}", u.name || "")), { foot: false }); await c;
    await play("idle", { squash: false }); await wait(5000); hush();
  }
  async function playMessage(m, preview) {
    busy = true; if (!preview) markRead(m);   // shown once → never again by itself (💌 in the sparrow's menu replays it)
    m.lines.forEach(([clip]) => preload(clip)); preload("heart"); await play("pop");
    let i = 0, done = false;
    const showLine = async () => {
      const [clip, text] = m.lines[i], last = i === m.lines.length - 1;
      say(`<div class="sp-msg" dir="auto">${esc(text)}</div><div class="sp-from">${esc(t("from"))} · ${i + 1}/${m.lines.length}</div>
        <div class="sp-nav"><button type="button" data-n="-1" ${i ? "" : "disabled"}>‹</button>${last ? `<button type="button" class="sp-main" data-m="got">${esc(t("got"))}</button>` : `<button type="button" class="sp-main" data-n="1">›</button>`}</div>`, { foot: false });
      bubble.querySelectorAll("[data-n]").forEach((b) => b.onclick = () => go(+b.dataset.n));
      const g = bubble.querySelector("[data-m=got]"); if (g) g.onclick = () => { done = true; };
      const c = play(clip); if (await c) play("idle", { squash: false });
    };
    const go = (d) => { const n = i + d; if (n < 0 || n >= m.lines.length) return; i = n; showLine(); };
    let x0 = null;   // 👈👉 swipe between lines
    const ts = (e) => { x0 = e.touches[0].clientX; }, te = (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); };
    bubble.addEventListener("touchstart", ts, { passive: true }); bubble.addEventListener("touchend", te);
    await showLine();
    await new Promise((r) => { const tick = setInterval(() => { if (done || bubble.hidden) { clearInterval(tick); r(); } }, 150); });
    bubble.removeEventListener("touchstart", ts); bubble.removeEventListener("touchend", te);
    hush(); await play("heart"); await play("idle", { squash: false }); busy = false;
  }

  /* ---------- boot ---------- */
  async function boot() {
    try { META = await (await fetch(IMG + "meta.json")).json(); } catch (e) { return; }
    (IS_OFFICER || IS_TOOL ? ["idle", "hi", "point", "fly"] : ["sleep", "wake", "idle", "hi", "fly", "point"]).forEach(preload);   // the rest load when first played
    document.body.append(root, bubble);
    const first = (typeof langChosen !== "undefined" && !langChosen) ? "sleep" : "idle";   // a small still shows at once; the clip replaces it when it has loaded
    layout(first, front); front.src = IMG + first + "_end.webp"; cur = first;
    window.addEventListener("resize", () => { if (!busy && state !== "off" && root.hidden === false) { pos = perchPoint(); place(); } placeBubble(); });
    const f = fab(); if (f) new MutationObserver(() => { if (!busy && !flying) { pos = perchPoint(); place(); } }).observe(f, { attributes: true, attributeFilter: ["style", "class"] });
    window.addEventListener("hashchange", () => setTimeout(onGuideOpened, 300));
    document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest(".ai-panel .guide-link-btn, .guide-row button")) setTimeout(onGuideOpened, 400); }, true);
    new MutationObserver(() => { if (toggleBtn) toggleBtn.title = t("show"); if (!bubble.hidden && redraw) { const r = redraw; r(); } document.querySelectorAll(".sp-call").forEach((b) => { b.title = t("call"); }); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    if (IS_OFFICER) { addOfficerAISection(); startOfficer(); } else if (IS_TOOL) startTool(); else { addAISection(); start(); }
  }
  window.NXSSparrow = { play, flyTo, say, hush, start, off: turnOff, on: turnOn, messages: MESSAGES, tour: (id) => IS_OFFICER ? runOfficerTour(id) : runTour(id), state: () => ({ busy, tour, state }), active: () => ls.get(LS) !== "off" && !REDUCED };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
