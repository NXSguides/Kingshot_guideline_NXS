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
    en: { callBtn: "This 🐦 calls me — tap it and I'll explain just that feature.", greet: "Hi! I'm Little Sparrow 🐦 Need any help?", page: "🔎 Find a page", how: "🎓 How do I use…", none: "🤔 Neither of these",
      noneA: "Then please go find THAT Sparrow 🐦", pageA: "Tap the page you want and I'll fly you there.", here: "Here it is. This is what you were looking for, right?",
      howA: "Pick one here and I'll walk you through it step by step. Or just ask the AI.", sulky: "Don't need me…? Okay then.", hide: "Hide Little Sparrow", show: "Little Sparrow", call: "Call Little Sparrow to explain this",
      msg: "There's a message for you 💌 Tap 📋 at the top right.", got: "Got it", from: "from Sparrow", oGreet: "Hi {name}! I'm Little Sparrow. Tap me for a tour of any tab, or tap a 🐦 next to a feature and I'll explain just that one. If I still can't teach you something, go find THAT Sparrow 😄" },
    zh: { callBtn: "這個 🐦 就是呼叫我的按鈕，點下去我就只講那一個功能。", greet: "嗨囉！我是小麻雀 🐦 需要幫忙嗎？", page: "🔎 找頁面", how: "🎓 怎麼用某個功能…", none: "🤔 都不是",
      noneA: "那請你去找那個麻雀喔（Sparrow）🐦", pageA: "點你要的頁面，我飛過去帶你看。", here: "在這裡。這應該就是你要找的對吧？",
      howA: "從這裡選一個，我一步一步帶你做。也可以直接問 AI。", sulky: "不需要我嗎…？好吧。", hide: "隱藏小麻雀", show: "小麻雀", call: "呼喚小麻雀來講解",
      msg: "有給你的留言 💌 點右上角的 📋", got: "知道了", from: "來自 Sparrow", oGreet: "嗨 {name}！我是小麻雀。點我可以導覽任何分頁，功能旁邊的 🐦 點下去我就只講那一個。如果我還是教不會你，就去找那個麻雀（Sparrow）吧 😄" },
    ko: { callBtn: "이 🐦 가 나를 부르는 버튼이야. 누르면 그 기능만 설명해 줄게.", greet: "안녕! 나는 작은 참새 🐦 도움이 필요해?", page: "🔎 페이지 찾기", how: "🎓 기능 사용법…", none: "🤔 둘 다 아니야",
      noneA: "그럼 그 참새(Sparrow)를 찾아가 줘 🐦", pageA: "원하는 페이지를 누르면 내가 날아가서 보여줄게.", here: "여기야. 찾던 게 이거 맞지?",
      howA: "여기서 하나 고르면 단계별로 알려줄게. AI에게 물어봐도 돼.", sulky: "내가 필요 없어…? 알았어.", hide: "작은 참새 숨기기", show: "작은 참새", call: "작은 참새 불러서 설명 듣기",
      msg: "너에게 온 메시지가 있어 💌 오른쪽 위 📋 를 눌러 봐.", got: "알겠어", from: "Sparrow가 보냄", oGreet: "안녕 {name}! 나는 작은 참새야. 나를 누르면 탭을 안내하고, 기능 옆 🐦 를 누르면 그것만 설명해 줘. 그래도 모르겠으면 그 Sparrow를 찾아가 😄" },
    de: { callBtn: "Dieses 🐦 ruft mich — tipp drauf und ich erkläre nur diese eine Funktion.", greet: "Hi! Ich bin der kleine Spatz 🐦 Brauchst du Hilfe?", page: "🔎 Eine Seite finden", how: "🎓 Wie benutze ich…", none: "🤔 Keins von beiden",
      noneA: "Dann geh bitte zu DEM Spatz (Sparrow) 🐦", pageA: "Tippe auf die Seite, die du willst – ich fliege hin.", here: "Hier ist es. Das hast du gesucht, oder?",
      howA: "Such dir hier eins aus, ich führe dich Schritt für Schritt durch. Oder frag einfach die KI.", sulky: "Brauchst du mich nicht…? Na gut.", hide: "Kleinen Spatz ausblenden", show: "Kleiner Spatz", call: "Kleinen Spatz rufen – erklärt das hier",
      msg: "Da ist eine Nachricht für dich 💌 Tippe oben rechts auf 📋.", got: "Alles klar", from: "von Sparrow", oGreet: "Hi {name}! Ich bin der kleine Spatz. Wenn ich dir etwas nicht erklären kann, geh zu DEM Sparrow 😄" },
    fr: { callBtn: "Ce 🐦 m'appelle — touche-le et j'explique juste cette fonction.", greet: "Salut ! Je suis Petit Moineau 🐦 Besoin d'aide ?", page: "🔎 Trouver une page", how: "🎓 Comment utiliser…", none: "🤔 Ni l'un ni l'autre",
      noneA: "Alors va voir CE Moineau-là (Sparrow) 🐦", pageA: "Touche la page que tu veux, je t'y emmène.", here: "C'est ici. C'est ce que tu cherchais, non ?",
      howA: "Choisis-en un ici et je te guide étape par étape. Ou demande à l'IA.", sulky: "Tu n'as pas besoin de moi… ? Bon.", hide: "Cacher Petit Moineau", show: "Petit Moineau", call: "Appeler Petit Moineau pour expliquer",
      msg: "Il y a un message pour toi 💌 Touche 📋 en haut à droite.", got: "Compris", from: "de Sparrow", oGreet: "Salut {name} ! Je suis Petit Moineau. Si je n'arrive pas à t'expliquer, va voir CE Sparrow-là 😄" },
    pt: { callBtn: "Este 🐦 me chama — toque nele e eu explico só aquela função.", greet: "Oi! Eu sou o Pardalzinho 🐦 Precisa de ajuda?", page: "🔎 Encontrar uma página", how: "🎓 Como usar…", none: "🤔 Nenhum dos dois",
      noneA: "Então vá falar com AQUELA Sparrow 🐦", pageA: "Toque na página que você quer e eu voo até lá.", here: "Aqui está. Era isso que você procurava, né?",
      howA: "Escolha um aqui e eu te guio passo a passo. Ou pergunte à IA.", sulky: "Não precisa de mim…? Tá bom.", hide: "Esconder o Pardalzinho", show: "Pardalzinho", call: "Chamar o Pardalzinho para explicar",
      msg: "Tem uma mensagem para você 💌 Toque em 📋 no canto superior direito.", got: "Entendi", from: "da Sparrow", oGreet: "Oi {name}! Eu sou o Pardalzinho. Toque em mim para um tour de qualquer aba, ou no 🐦 ao lado de uma função e eu explico só aquela. Se eu não conseguir te ensinar algo, vá falar com AQUELA Sparrow 😄" },
    es: { callBtn: "Este 🐦 me llama — tócalo y te explico solo esa función.", greet: "¡Hola! Soy Gorrioncito 🐦 ¿Necesitas ayuda?", page: "🔎 Buscar una página", how: "🎓 Cómo usar…", none: "🤔 Ninguna de las dos",
      noneA: "Entonces ve con ESA Sparrow 🐦", pageA: "Toca la página que quieres y vuelo hasta allí.", here: "Aquí está. Esto es lo que buscabas, ¿no?",
      howA: "Elige uno aquí y te guío paso a paso. O pregúntale a la IA.", sulky: "¿No me necesitas…? Bueno.", hide: "Ocultar a Gorrioncito", show: "Gorrioncito", call: "Llamar a Gorrioncito para que lo explique",
      msg: "Tienes un mensaje 💌 Toca 📋 arriba a la derecha.", got: "Entendido", from: "de Sparrow", oGreet: "¡Hola {name}! Soy Gorrioncito. Si no logro enseñarte algo, ve con ESA Sparrow 😄" },
    tr: { callBtn: "Bu 🐦 beni çağırır — dokun, sadece o özelliği anlatayım.", greet: "Selam! Ben Küçük Serçe 🐦 Yardım lazım mı?", page: "🔎 Sayfa bul", how: "🎓 Nasıl kullanılır…", none: "🤔 İkisi de değil",
      noneA: "O zaman O Serçe'ye (Sparrow) git 🐦", pageA: "İstediğin sayfaya dokun, oraya uçayım.", here: "İşte burada. Aradığın buydu, değil mi?",
      howA: "Buradan birini seç, adım adım anlatayım. Ya da yapay zekâya sor.", sulky: "Bana ihtiyacın yok mu…? Peki.", hide: "Küçük Serçe'yi gizle", show: "Küçük Serçe", call: "Küçük Serçe'yi çağır, anlatsın",
      msg: "Sana bir mesaj var 💌 Sağ üstteki 📋 simgesine dokun.", got: "Anladım", from: "Sparrow'dan", oGreet: "Selam {name}! Ben Küçük Serçe. Bir şeyi öğretemezsem O Sparrow'a git 😄" },
    id: { callBtn: "🐦 ini memanggilku — ketuk, dan aku jelaskan fitur itu saja.", greet: "Hai! Aku Burung Gereja Kecil 🐦 Perlu bantuan?", page: "🔎 Cari halaman", how: "🎓 Cara memakai…", none: "🤔 Bukan dua-duanya",
      noneA: "Kalau begitu cari Sparrow yang ITU ya 🐦", pageA: "Ketuk halaman yang kamu mau, aku terbang ke sana.", here: "Ini dia. Ini yang kamu cari, kan?",
      howA: "Pilih satu di sini, aku pandu langkah demi langkah. Atau tanya AI saja.", sulky: "Tidak butuh aku…? Ya sudah.", hide: "Sembunyikan Burung Gereja Kecil", show: "Burung Gereja Kecil", call: "Panggil Burung Gereja Kecil untuk menjelaskan",
      msg: "Ada pesan untukmu 💌 Ketuk 📋 di kanan atas.", got: "Oke", from: "dari Sparrow", oGreet: "Hai {name}! Aku Burung Gereja Kecil. Kalau aku tetap tidak bisa mengajarimu, cari Sparrow yang ITU ya 😄" },
    ru: { callBtn: "Это 🐦 зовёт меня — нажми, и я объясню только эту функцию.", greet: "Привет! Я Воробушек 🐦 Нужна помощь?", page: "🔎 Найти страницу", how: "🎓 Как пользоваться…", none: "🤔 Ни то, ни другое",
      noneA: "Тогда иди к ТОМУ Воробью (Sparrow) 🐦", pageA: "Нажми на нужную страницу — я прилечу туда.", here: "Вот оно. Ты это искал, да?",
      howA: "Выбери здесь, и я проведу тебя по шагам. Или просто спроси ИИ.", sulky: "Я не нужен…? Ну ладно.", hide: "Скрыть Воробушка", show: "Воробушек", call: "Позвать Воробушка — объяснит",
      msg: "Для тебя есть сообщение 💌 Нажми 📋 справа вверху.", got: "Понятно", from: "от Sparrow", oGreet: "Привет, {name}! Я Воробушек. Если я не смогу что-то объяснить, иди к ТОМУ Sparrow 😄" },
    th: { callBtn: "🐦 นี้คือปุ่มเรียกฉัน แตะแล้วฉันจะอธิบายเฉพาะฟีเจอร์นั้น", greet: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 ต้องการความช่วยเหลือไหม?", page: "🔎 หาหน้า", how: "🎓 ใช้ฟีเจอร์ยังไง…", none: "🤔 ไม่ใช่ทั้งสองอย่าง",
      noneA: "งั้นไปหานกกระจอกตัวนั้น (Sparrow) นะ 🐦", pageA: "แตะหน้าที่ต้องการ แล้วฉันจะบินพาไป", here: "อยู่นี่ไง นี่คือที่หาอยู่ใช่ไหม?",
      howA: "เลือกตรงนี้สักอัน ฉันจะพาทำทีละขั้น หรือถาม AI ก็ได้", sulky: "ไม่ต้องการฉันเหรอ…? ก็ได้", hide: "ซ่อนนกกระจอกน้อย", show: "นกกระจอกน้อย", call: "เรียกนกกระจอกน้อยมาอธิบาย",
      msg: "มีข้อความถึงคุณ 💌 แตะ 📋 มุมขวาบน", got: "เข้าใจแล้ว", from: "จาก Sparrow", oGreet: "หวัดดี {name}! ฉันคือนกกระจอกน้อย ถ้าฉันสอนไม่ได้ ไปหา Sparrow ตัวนั้นนะ 😄" },
    ar: { callBtn: "هذا 🐦 يناديني — اضغط عليه وسأشرح تلك الميزة فقط.", greet: "مرحبًا! أنا العصفور الصغير 🐦 هل تحتاج مساعدة؟", page: "🔎 البحث عن صفحة", how: "🎓 كيف أستخدم…", none: "🤔 لا هذا ولا ذاك",
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
    en: {
      ev01: "📅 The calendar strip. Scroll it sideways: 14 days back, 70 ahead, in UTC. A filled bar is running now. ✅ on a bar = something for officers to do this week — tap it to jump to that to-do. Other bars open the event's entry further down.",
      ev02: "👑 Crown markers are Kingdom #2189 milestones: things that unlock as the server gets older. Tap one to see the whole list.",
      ev03: "👑 The milestone list: every upcoming unlock with its date and how many days to go.",
      ev04: "📣 Announcement draft: a game-chat post of the upcoming events with our times, ready to paste. Opening it writes the text for you.",
      ev05: "How far ahead the draft looks: the next 3, 5 or 7 days. Changing it rewrites the text.",
      ev06: "🔄 Make again throws away your edits and rebuilds the text from the event list and ⏰ Our event times.",
      ev07: "Tick which events go in. It pre-ticks as many as fit — the game allows 300 characters.",
      ev08: "The draft itself. Edit it freely; the counter turns red over 300 characters. Nothing here is saved — it's a scratch pad.",
      ev09: "📋 Copy puts the text on your clipboard. Then paste it into game chat.",
      ev10: "⚙️ Troop limits: the numbers used everywhere the guides mention them (all 12 languages) and by the AI assistant. Change them here when the game or the alliance changes the limit.",
      ev10v: "⚙️ Troop limits: the numbers the guides and the AI assistant use. Editors change them here.",
      ev11: "Bear Hunt — the exact troop count for joining a rally.",
      ev12: "Other rallies and Viking HQ — the maximum per member.",
      ev13: "💾 Save writes both numbers to the site. The guides show the new numbers within a few minutes.",
      ev14: "⏰ Our event times (UTC): the times we pick for alliance events, and which day of the event the battle is. The home page's This week and everyone's ⏰ Game reminders follow this.",
      ev14v: "⏰ Our event times (UTC): the times we pick for alliance events. The home page and everyone's ⏰ Game reminders follow them; editors change them here.",
      ev15: "One line per event. Type one or more times, e.g. 13:00, 22:00. Battle day = which day of the event the fight is; 22:00@1, 13:00@3 sets a different day per time. Bear Hunt has Next Bear day instead — change it if the game moves Bear day and the whole site follows.",
      ev16: "💾 Save checks the times (HH:MM) and writes them to the site. Reminders use the new times within a few minutes.",
      ev17: "✅ Action items: what officers must do, one card per event running this week. This week / Next week switch the Monday–Sunday (UTC) week.",
      ev18: "Each card lists the tasks with their due date ⏰ and 'overdue' in red. Tick a task when it's done — ticks are saved on this device only.",
      ev19: "✏️ Edit items opens the event editor straight at its action items, so you can change what's on the list.",
      ev20: "📣 Game post writes a one-event reminder into the announcement draft above, ready to copy.",
      ev21: "The other buttons jump to where the task gets done: 📢 Write announcement (Post tab), 📊 Open Ranking, 📖 the guide on the site, 📋 this event's in-game guides.",
      ev22: "⏱️ Timed admin reminders: one-off times, e.g. a Sanctuary Battle start. A push goes out 10 minutes before to everyone whose 🔔 covers that event. Times are UTC.",
      ev23: "To add one: pick the event, type what it is, the date and the hour, then + Add. Delete removes a row. It's only in the list until you press 💾 Save.",
      ev24: "💾 Save writes the timed reminders to the site for all officers.",
      ev25: "📋 Events & in-game guides. + New event opens the editor for a brand-new event.",
      ev25v: "📋 Events & in-game guides: every event with its schedule and the messages to send in game.",
      ev26: "One entry per event. Tap it to open its in-game guide: each box is one chat message (the game limits message length), so copy and send them one by one.",
      ev27: "📋 Copy copies that one message.",
      ev28: "✏️ next to a message edits just that message, in place.",
      ev29: "✏️ Edit at the bottom changes the whole event: dates, action items, adding or removing messages. Changes are saved on the site for all officers. Let me open it…",
      ev30: "Name and emoji of the event. The name is edited in the language you're using.",
      ev31: "Repeats on a fixed schedule: tick it and give the first day (UTC), the days between runs and how many days it lasts. 📅 opens a date picker.",
      ev32: "Note: shown in the list, e.g. the times.",
      ev33: "Guide on the site: links the event to one of the public guides (the 📖 button).",
      ev34: "Action items for officers: each row is a task with 'days before (−) or after the start', an optional 'until' hour and the text. The two boxes add a 📢 Announcement or 📊 Ranking button to that task. + Action item adds a row, ✕ removes one.",
      ev35: "In-game guides: one box = one chat message, with a title. + Message adds one, ✕ removes it.",
      ev36: "Delete event removes it for everyone (it asks first).",
      ev37: "💾 Save writes the event to the site for all officers; Cancel closes without saving.",
      bd01: "💬 The board is for planning together. Every message is translated into 中文, English, Português, العربية and 한국어. ↻ reloads.",
      bd02: "📋 Tasks for you: things assigned to you or where you were @'d. Tap one to jump to that post.",
      bd03: "+ New topic starts a discussion. Let me open the form…",
      bd03v: "View-only officers can read every topic. Posting needs edit rights — or being @'d or assigned, if the admins allow replies for that.",
      bd04: "Topic title (what it's about) and your message. Drafts stay on this device until you send.",
      bd05: "@ inserts a mention: pick an officer or @all. The topic shows them a 📣 tag.",
      bd06: "📋 Assign to turns the message into a task for the people you pick; they get a ✅ Done button.",
      bd07: "🖼️ attaches pictures (up to 4; pasting a picture works too). An [[img]] marker shows where it goes in the text.",
      bd08: "Post sends it — one request, translated into 5 languages, so write everything in one go rather than in pieces. Cancel hides the form and keeps the draft.",
      bd09: "Topics, latest activity first: who started it, how many messages, last update. A red dot = changed since you last opened it; 📌 Decided = a decision was pinned. Tap to open — let me open one…",
      bd10: "← All topics goes back to the list.",
      bd11: "Each card is one message, in your language. Show original reveals what was actually written; pictures open full-screen when tapped.",
      bd12: "📌 Set as decision pins this message at the top of the topic as the outcome; Clear decision unpins it.",
      bd13: "✏️ Edit and 🗑️ Delete appear on your own messages only. Delete asks twice; deleting the first message deletes the whole topic.",
      bd14: "✅ Done: when a message is a task for you, mark it done here (↩︎ Not done undoes it).",
      bd15: "The reply box, with the same @, 📋 Assign to and 🖼️ tools. Reply sends it.",
      bd15v: "Replying needs edit rights — unless you were @'d or assigned here and the admins allow that.",
      mp01: "Layers: All, 📋 Plan only (just Outposts with a plan status), 🛰️ Territory (stitched from officers' screenshots — same colour = same alliance), then one chip per building type. The first tap on a type shows only that type; more taps toggle.",
      mp02: "+ and − zoom (pinch or the mouse wheel work too); drag to move around.",
      mp03: "The map. Tap any marker to select it: 👑 King's Castle, 🛡️ our HQs, ◆ Fortresses, ● Sanctuaries, coloured squares = Outposts (number = level). Rings show the plan: green ✅ Protected, red ⚔️ Vulnerable, yellow dashed 🎯 Target. A confession from THAT Sparrow: she doesn't open the map often, so it's updated only now and then 🐦 Let me select one…",
      mp04: "The info box for what's selected: name, level and buff, who can contest it, X/Y coordinates — Copy puts them on your clipboard.",
      mp05: "Status buttons: 🎯 Target, ✅ Ours · Protected, ⚔️ Ours · Vulnerable, ✕ Clear. They change the plan in memory — press 💾 Save plan afterwards.",
      mp05v: "Editors mark the status here (🎯 target, ✅ protected, ⚔️ vulnerable); you see the result in the plan below.",
      mp06: "⏱ Timer: after marking Protected or Vulnerable, type the countdown shown in game (d h m) and Set timer — the page then flips Protected ⇄ Vulnerable by itself. Remove timer clears it.",
      mp06v: "⏱ The countdown to the next Protected ⇄ Vulnerable switch, when editors have set a timer.",
      mp07: "⭐ Sanctuary & Fortress priority: select a Fortress or Sanctuary on the map and pick a number (1 = best), with its rewards and a note. This list shows them in order; tap a row to select it.",
      mp07v: "⭐ Sanctuary & Fortress priority, as the editors ranked them (1 = best), with rewards and notes. Tap a row to select it.",
      mp08: "📋 Outpost plan: the buff table — Now (as in game: Protected only) and With targets — then the lists of 🎯 Targets, ✅ Protected, ⚔️ Vulnerable and ⚠️ buff conflicts, with each one's countdown. Tap a chip to select that building.",
      mp09: "Cycle: how many hours an Outpost stays Protected, then Vulnerable (default 72 h / 24 h). The timers follow it.",
      mp09v: "Cycle: the hours an Outpost stays Protected, then Vulnerable — editors set it; the timers follow it.",
      mp10: "💾 Save plan writes everything — statuses, timers, priorities, banners — to the site for all officers; your name goes in Last saved by. Undo changes restores the last saved version.",
      mp11: "🏛️ Sanctuary Battle explainer: how sign-ups stack across phases, with two example strategies.",
      mp12: "🚩 Banner plan: each Alliance Banner claims 7×7 tiles and must touch territory already linked to the HQ, so banners chain one after another. Blue tiles = new territory, red = already someone else's. Dark banners were checked in game; light ones are read from a screenshot and can be a tile or two off.",
      mp13: "🚩 Tap map to place: switch it ON, zoom in and tap a tile to drop a planned banner — or type X / Y and + Add.",
      mp14: "Layer buttons: ⛰️ Obstacles / no-build, 🏳️ Our banners, 🏴 Other alliances.",
      mp15: "Tapping the map places: our planned banner, or another alliance's 🏴 banner / 🏯 HQ when you've seen it in game.",
      mp16: "Planned banners, in order (tiles are claimed in list order): fix X/Y, Copy the coordinates, ↑ move up, Remove. Tapping a banner on the map lets you mark it ✅ Built or 🗑️ Demolished. Then 💾 Save plan.",
      mp16v: "Planned banners, in order; Copy gives the coordinates. Editors add and move them.",
      mp17: "📍 City map from MightPulse: every city in the kingdom with its alliance and shield. Show it here or open it in a new tab — positions are from their last scan, so they can be weeks old.",
      mp18: "🎁 Fortress & Sanctuary rewards: what each gives per phase, the recommended power, and which buildings give which Sanctuary reward.",
      mp19: "The building lists by type and level. Every chip selects that building on the map — the same as tapping the marker.",
      rk01: "📋 Plan: 🔒 Only on this device keeps the ticks and the table in this browser. A 🔄 shared plan is the same for every officer — ticks, weights, group sizes and the battle table sync within seconds — and the Attendance tab builds each date's list from it.",
      rk02: "↩️ Undo steps back through the last changes (ticks, weights, table). On a shared plan the undo is shared too.",
      rk03: "+ New shared plan: give it a name (e.g. Legion 1) and choose whether to start with the people ticked now. Rename and Delete act on the open plan; 🕘 Versions puts the plan back to any earlier save.",
      rk03v: "Shared plans are created by editors; you can open them here and follow along.",
      rk04: "✏️ Who can edit: every officer, or only the people the creator picks (the creator and admins always can).",
      rk05: "① Ranking method: Squad Power fit (the Squad Power the Swordland Legion screens show, estimated from Migrant Score) or Weights, where you tick the stats and give each a weight. The note explains the formula.",
      rk06: "Weights: tick the stats to count and give each a percentage — they don't have to add up to 100.",
      rk07: "② Tick this event's participants. Select all ticks the whole roster; Clear empties it.",
      rk08: "Paste a sign-up list: one name per line or comma-separated, decorations don't matter. Tick these players matches them to the roster and ticks them; names it couldn't find are listed.",
      rk09: "Search a name filters the table; Only ticked shows just the ticked ones.",
      rk10: "The roster. Left box = starter (ranked); right box = substitute (listed as sub, not ranked, imported as sub by Attendance). Tapping anywhere on a row ticks it; a rank row ticks the whole rank; tap a column header to sort.",
      rk11: "③ Ranking. Show top N limits the list; empty = everyone.",
      rk12: "Copy result copies the ranking as text: 1. Name (ID) — score, subs marked (sub).",
      rk13: "The ranked list with the score and the stats behind it. ~ = no Migrant Score, estimated with the fallback formula.",
      rk14: "④ Event groups: tap ⚔️ Swordland Showdown and the ranking is split into Attackers, Defenders and Joiners.",
      rk15: "Attackers / Defenders: how many of each, taken from the top of the ranking; everyone else is a Joiner. The same numbers drive ⑤.",
      rk16: "Copy result copies the groups as a Discord post; the small map opens the Swordland map.",
      rk17: "⑤ Battle table: who attacks or defends which building, per phase. Pick a person from the list, then tap a box to put them there (drag on a computer); × removes.",
      rk17v: "⑤ Battle table: who attacks or defends which building, per phase. You can read and copy it; edits stay on this device only.",
      rk18: "Table setup: the phases (comma-separated — rename, add or remove them), the building numbers and names offered as suggestions, which columns show and what they're called, and Short names (drops decorations like 亗 and Nexus).",
      rk19: "✨ Fill a first draft: ranked #1… one per building as Attacker, the next ones as Defenders, the rest as Joiners, using the Attackers / Defenders numbers.",
      rk20: "⚔️ Swordland rules draft fills all 3 phases by the alliance's rules: Phase 1 ①–④ with attackers and defenders by rank, Phase 2 Sword Shrine / Mercenary Camp / Hall, then Stay behind. Edit it afterwards.",
      rk21: "📥 Paste text → table reads an assignment post written for Discord (① ROYAL STABLES / * ⚔️ Attacker: …) and turns it into the table; names are matched to the roster. 📝 Insert a draft gives you a ready text to edit first.",
      rk22: "Clear table empties every building (phases and setup stay). ↩️ Undo brings it back.",
      rk23: "Attackers / Defenders counts — the same numbers as ④.",
      rk24: "People, grouped by suggested role from the ranking (starters only). Tap one to select it — the badge shows how many Phase-1 buildings they're already in. On a phone, press and hold to drag.",
      rk25: "A building: # and name on top, then the ⚔️ Attacker, 🛡️ Defenders and 👥 Joiners boxes — tap a box with someone selected to add them, × removes, + text adds a free note chip. 📝 Note is for the building; the colour dots set its colour in the picture; 🗑 deletes it. + Building adds one to that phase; Phase: moves it to another phase.",
      rk26: "📌 Reminders are added at the bottom of the picture and the text.",
      rk27: "🖼️ Make image draws the whole table as a picture: save it, or 📢 Use in a new announcement sends it straight to the Post tab.",
      rk28: "📋 Copy text copies the table as a Discord post — the same format Paste text → table reads back.",
      rk29: "🎮 For in-game chat splits it into one message per building, each with its own copy button, because game chat takes one message at a time.",
      rk30: "📊 Download Excel saves the same table as a spreadsheet.",
      at01: "📋 Shared plans from the Ranking tab: each list is built from a plan's ticks. Date › opens the most recent attendance list made from it; Create attendance list makes a new one (it's stored when you press Save).",
      at01v: "📋 Shared plans from the Ranking tab: each attendance list is built from a plan's ticks. Date › opens the most recent list made from it.",
      at02: "One card per event sheet (Swordland, Tri-Alliance…), one row per date: list name and attendance % (starters who showed ÷ starters; subs and excused not counted). Tap a row to open it — let me open one…",
      at03: "Misses add up across dates: 2nd miss orange, 3rd red; ⭐ = top 20 by power. Only starters count.",
      at04: "‹ All sheets goes back (unsaved changes are dropped).",
      at05: "Event, date and list name. 🔄 Update from the plan re-imports the plan's current ticks and subs, keeping the marks you made.",
      at05v: "The event, date and name of this list.",
      at06: "① Confirmed: who said yes. Tap a name to toggle sub (a sub who doesn't show isn't a miss); × removes them.",
      at06v: "① Confirmed: who said yes; dashed = substitute.",
      at07: "Adding people: paste names and Match roster, 📷 upload voter screenshots (the names are read for you), or Add a member by hand from the list.",
      at08: "② After the battle: tap a name to cycle ✓ showed up → X no-show → 🛌 excused. Orange (2nd) and red (3rd) mark repeat misses. All showed up marks everyone at once.",
      at08v: "② After the battle: ✓ showed up, X no-show, 🛌 excused; orange and red = repeat misses.",
      at09: "Save stores the list on the server for all officers. Copy for Discord copies a summary; Delete this list removes it.",
      at09v: "Copy for Discord copies a summary of this list.",
      po01: "✍️ Write: your name and the language you're writing in — write in your own language, the site translates it into all 12.",
      po01v: "📢 Post: announcements are written here and translated into 12 languages. Loading the list needs edit rights — ask an admin if you need this tab.",
      po02: "Title and Message. **text** = bold; links work as normal.",
      po03: "🖼️ Add picture shrinks the photo and puts an [[img]] marker where your cursor is; it's uploaded when you publish.",
      po04: "Button to a guide adds a button under the announcement that opens one of the site's guides.",
      po05: "Look: Plain, or 📜 Scroll for an old-scroll frame.",
      po06: "Auto-delete: when the announcement disappears by itself — when today or tomorrow ends, after 1 / 2 / 3 / 7 days, or a date & time in UTC.",
      po07: "Preview shows it the way members will see it.",
      po08: "📢 Publish asks once, uploads the pictures and saves the text. The translated announcement shows on the site in about 2–3 minutes.",
      po09: "📋 Announcements on the site, newest first: 🖼️ has pictures, ⏳ still translating, 🗑️ auto-delete time, ✏️ Language = fixed by hand. Refresh re-reads the list.",
      po10: "Edit opens an announcement for changes; Delete removes it from the site in all languages (it asks first). Let me open Edit…",
      po11: "What to change: All languages (opens the original in the Write form and translates everything again), 🖼️ Add pictures only (no new translation), or one language — fix just that translation by hand; Use the automatic translation again undoes a fix.",
      wa01: "📋 Copy for Google Sheets copies the members shown below as a table — paste into cell A1. ⬇️ Download CSV saves the same file.",
      wa01v: "🕵️ Watch lists every member with flags for things worth a look. Copy / CSV export is for editors.",
      wa02: "Search a name or ID filters the list. Only show members with flags keeps the suspicious ones; 'New = joined within' sets how long someone counts as new.",
      wa03: "Watched alliances: members seen in these get a red flag. Our farm / sister alliances are ignored for that.",
      wa04: "Tap a column header to sort. Flags: Check Record, New, From kingdom, Was in…, Seen in n alliances, Same name in… Record ↗ opens the player on MightPulse.",
      wa05: "✏️ opens the note: earlier alliances and names, 'I've checked the Record', Clear ✅ / Not clear ⚠️, why, your name. Save shares it with all officers.",
      wa05v: "Clear ✅ / Not clear ⚠️ and the comments are the officers' notes on that member.",
      wa06: "Left NXS: who left, when, and where they were seen since.",
      sc01: "Type a kingdom number and Fetch now: a GitHub job reads its top 20 players from MightPulse (2–3 minutes; the page refreshes by itself).",
      sc01v: "Scouted kingdoms are fetched by editors; the table below shows them.",
      sc02: "Each kingdom chip: 'in ranking' shows its players in the table below (this device only); 'update daily' refreshes it every day — tick it for the KvK opponent; ⟳ fetches now; ✕ removes it.",
      sc03: "Sort by and ▲/▼ order the table; tapping a column header does the same. The sorted column sits right next to the name.",
      sc04: "The players: power, TC, Mystic Trial, kills, VIP, estimated Squad Power (~ = estimated) and Migrant Score. The link opens them on MightPulse.",
      vw01: "📈 Site views: anonymous visitor counts — no cookies, no names. Pick 7 / 30 / 90 days; ↻ reloads.",
      vw02: "Visitors per day — tap or hover a bar for the number.",
      vw03: "Which guides, languages, countries, referrers and devices people come from. Officers' browsers aren't counted.",
      pm01: "💬 This switch lets view-only officers reply in a topic where they were @'d or assigned.",
      pm02: "One row per officer: 🟢 last login or ⚪ never. Tap the name to change how it's shown. Per tab choose ✏️ Edit, 👁️ View or — Hidden; it saves by itself and applies at once.",
      pm03: "🔔 picks which events this person is reminded of on the day an officer to-do is due (they choose the hour in ⏰). Admins with nothing picked get every event.",
      pm04: "👁️ Preview as shows the whole page with that officer's rights — Exit preview at the top brings you back. Make admin / Remove admin and Remove are here too.",
      pm05: "+ Add officer: a name and the 18-digit Discord ID. A new officer starts with Events, Board and Map 👁️ only. Reset to defaults goes back to the built-in admins.",
      pm06: "More (site owner): forget the password on this device, redo the setup, 🔐 the officer data encryption key.", msgs: "💌 Message from THAT Sparrow", pick: "Which tab do you want me to show you?", onlyView: "(you can look, not edit)", ro: "You can look here but not change anything.",
      events: "📅 Events", board: "💬 Board", map: "🗺️ Map", ranking: "📊 Ranking", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", perms: "👥 Officers",
      },
    zh: {
      ev01: "📅 日曆列。可以左右滑動：往前 14 天、往後 70 天，都是 UTC。實心的長條是現在正在進行的。長條上有 ✅ = 這週有幹部要做的事，點一下就跳到那個待辦。其他長條會打開下面那個活動的條目。",
      ev02: "👑 皇冠標記是 2189 王國的里程碑：隨著伺服器變老會解鎖的東西。點一下就能看到完整清單。",
      ev03: "👑 里程碑清單：每一個即將解鎖的項目，附日期和還剩幾天。",
      ev04: "📣 公告草稿：一則寫給遊戲聊天的即將到來的活動和我們的時間，可以直接貼上。打開它就會幫你把文字寫好。",
      ev05: "草稿要看多遠：接下來的 3、5 或 7 天。改了之後文字會重寫。",
      ev06: "🔄 重新產生會丟掉你的修改，根據活動清單和 ⏰ 我們的活動時間重建文字。",
      ev07: "勾選要放進去的活動。它會先勾選塞得下的數量——遊戲限制 300 個字元。",
      ev08: "草稿本身。隨便改；超過 300 個字元計數器會變紅。這裡什麼都不會儲存——它只是一張草稿紙。",
      ev09: "📋 複製會把文字放到你的剪貼簿。然後貼到遊戲聊天裡。",
      ev10: "⚙️ 出兵上限：指南裡（全部 12 種語言）和 AI 助手提到的數字都用這裡的。遊戲或聯盟改了上限，就在這裡改。",
      ev10v: "⚙️ 出兵上限：指南和 AI 助手用的數字。有編輯權限的人在這裡改。",
      ev11: "狩獵巨熊——參加集結的確切部隊數。",
      ev12: "其他集結和維京人總部——每個成員的上限。",
      ev13: "💾 儲存會把兩個數字寫到網站。幾分鐘內指南就會顯示新的數字。",
      ev14: "⏰ 我們的活動時間（UTC）：我們幫聯盟活動選的時間，以及戰鬥是活動的第幾天。首頁的「本週」和大家的 ⏰ 遊戲提醒都跟著這裡走。",
      ev14v: "⏰ 我們的活動時間（UTC）：我們幫聯盟活動選的時間。首頁和大家的 ⏰ 遊戲提醒都跟著這裡走；有編輯權限的人在這裡改。",
      ev15: "一個活動一行。輸入一個或多個時間，例如 13:00, 22:00。戰鬥日 = 打仗是活動的第幾天；22:00@1, 13:00@3 可以讓每個時間用不同的日子。狩獵巨熊則是「下一次巨熊日」——遊戲把巨熊日移了就在這裡改，整個網站會跟著變。",
      ev16: "💾 儲存會檢查時間（HH:MM）並寫到網站。幾分鐘內提醒就會改用新時間。",
      ev17: "✅ 待辦事項：幹部必須做的事，本週進行中的每個活動一張卡片。本週／下週切換的是週一到週日（UTC）的那一週。",
      ev18: "每張卡片列出任務和到期日 ⏰，「逾期」會用紅色顯示。做完就勾起來——勾選只會存在這台裝置上。",
      ev19: "✏️ 編輯項目會直接打開活動編輯器並跳到它的待辦事項，讓你改清單上的內容。",
      ev20: "📣 遊戲貼文會把一則單一活動的提醒寫進上面的公告草稿，可以直接複製。",
      ev21: "其他按鈕會跳到做這件事的地方：📢 寫公告（公告分頁）、📊 打開排名、📖 網站上的指南、📋 這個活動的遊戲內指南。",
      ev22: "⏱️ 定時管理員提醒：一次性的時間，例如遺跡爭奪開始。會在 10 分鐘前推播給每個 🔔 有包含那個活動的人。時間是 UTC。",
      ev23: "要新增：選活動、輸入是什麼、日期和小時，然後 + 新增。刪除會移掉一列。在你按 💾 儲存之前，它只存在清單裡。",
      ev24: "💾 儲存會把定時提醒寫到網站，所有幹部都看得到。",
      ev25: "📋 活動與遊戲內指南。+ 新活動會打開編輯器建立一個全新的活動。",
      ev25v: "📋 活動與遊戲內指南：每個活動的時程和要在遊戲裡發的訊息。",
      ev26: "一個活動一個條目。點一下打開它的遊戲內指南：每個方框是一則聊天訊息（遊戲有訊息長度限制），所以要一則一則複製、發送。",
      ev27: "📋 複製只複製那一則訊息。",
      ev28: "訊息旁邊的 ✏️ 只編輯那一則訊息，就地修改。",
      ev29: "最下面的 ✏️ 編輯會改整個活動：日期、待辦事項、新增或移除訊息。修改會儲存在網站上，所有幹部都看得到。我來打開它…",
      ev30: "活動的名稱和表情符號。名稱是用你目前使用的語言編輯的。",
      ev31: "固定週期重複：勾起來，然後給第一天（UTC）、每次間隔幾天、持續幾天。📅 會打開日期選擇器。",
      ev32: "備註：會顯示在清單裡，例如時間。",
      ev33: "網站上的指南：把活動連到其中一篇公開指南（📖 按鈕）。",
      ev34: "幹部的待辦事項：每一列是一個任務，有「開始前（−）或開始後幾天」、可選的「截止」小時和文字。兩個勾選框會幫那個任務加上 📢 公告或 📊 排名按鈕。+ 待辦事項新增一列，✕ 移除一列。",
      ev35: "遊戲內指南：一個方框 = 一則聊天訊息，附標題。+ 訊息新增一則，✕ 移除它。",
      ev36: "刪除活動會把它對所有人移除（會先問你）。",
      ev37: "💾 儲存會把活動寫到網站，所有幹部都看得到；取消會直接關閉不儲存。",
      bd01: "💬 討論板是用來一起規劃的。每則訊息都會翻譯成 中文、English、Português、العربية 和 한국어。↻ 重新載入。",
      bd02: "📋 你的任務：指派給你或 @ 到你的東西。點一下就跳到那則貼文。",
      bd03: "+ 新主題會開一個討論。我來打開表單…",
      bd03v: "只能查看的幹部可以讀所有主題。發文需要編輯權限——或者被 @ 到或被指派，如果管理員有開放那種情況的回覆。",
      bd04: "主題標題（在講什麼）和你的訊息。送出前草稿會留在這台裝置上。",
      bd05: "@ 會插入提及：選一位幹部或 @all。主題會對他們顯示 📣 標籤。",
      bd06: "📋 指派給會把訊息變成你選的人的任務；他們會看到一個 ✅ 完成按鈕。",
      bd07: "🖼️ 附加圖片（最多 4 張；直接貼上圖片也行）。[[img]] 標記表示它在文字裡的位置。",
      bd08: "發文就送出了——一次請求，翻成 5 種語言，所以一次寫完比分段寫好。取消會隱藏表單並保留草稿。",
      bd09: "主題，最近有動靜的排在前面：誰開的、幾則訊息、最後更新。紅點 = 你上次打開之後有變動；📌 已決定 = 有釘選一個決定。點一下打開——我來打開一個…",
      bd10: "← 所有主題會回到清單。",
      bd11: "每張卡片是一則訊息，用你的語言顯示。顯示原文會露出實際寫的內容；圖片點一下會全螢幕打開。",
      bd12: "📌 設為決定會把這則訊息釘在主題最上面當作結論；清除決定會取消釘選。",
      bd13: "✏️ 編輯和 🗑️ 刪除只會出現在你自己的訊息上。刪除會問兩次；刪掉第一則訊息就會刪掉整個主題。",
      bd14: "✅ 完成：當一則訊息是給你的任務，在這裡標記完成（↩︎ 未完成可以撤銷）。",
      bd15: "回覆框，有一樣的 @、📋 指派給和 🖼️ 工具。回覆就送出了。",
      bd15v: "回覆需要編輯權限——除非你在這裡被 @ 到或被指派，而且管理員有開放。",
      mp01: "圖層：全部、📋 只看計畫（只有有計畫狀態的據點）、🛰️ 領地（用幹部的截圖拼起來的——同顏色 = 同聯盟），然後是每種建築類型各一個小標籤。第一次點某個類型只顯示那個類型；再點就是切換開關。",
      mp02: "+ 和 − 縮放（兩指縮放或滑鼠滾輪也可以）；拖曳移動。",
      mp03: "地圖。點任何標記就能選取它：👑 國王城堡、🛡️ 我們的總部、◆ 要塞、● 遺跡，彩色方塊 = 據點（數字 = 等級）。圓環表示計畫：綠色 ✅ 保護中、紅色 ⚔️ 可爭奪、黃色虛線 🎯 目標。那個麻雀（Sparrow）的告白：她不常開地圖，所以只會偶爾更新一下 🐦 我來選一個…",
      mp04: "選取項目的資訊框：名稱、等級和加成、誰可以爭奪、X/Y 座標——複製會把座標放到你的剪貼簿。",
      mp05: "狀態按鈕：🎯 目標、✅ 我們的 · 保護中、⚔️ 我們的 · 可爭奪、✕ 清除。它們改的是記憶體裡的計畫——之後要按 💾 儲存計畫。",
      mp05v: "有編輯權限的人在這裡標記狀態（🎯 目標、✅ 保護中、⚔️ 可爭奪）；你會在下面的計畫裡看到結果。",
      mp06: "⏱ 計時器：標記保護中或可爭奪之後，輸入遊戲裡顯示的倒數（天 時 分）然後設定計時器——頁面就會自己在保護中 ⇄ 可爭奪之間切換。移除計時器會清掉它。",
      mp06v: "⏱ 到下一次保護中 ⇄ 可爭奪切換的倒數，當有編輯權限的人設了計時器時。",
      mp07: "⭐ 遺跡與要塞優先順序：在地圖上選一個要塞或遺跡，然後選一個數字（1 = 最好），附上獎勵和備註。這個清單會依順序顯示；點一列就選取它。",
      mp07v: "⭐ 遺跡與要塞優先順序，由有編輯權限的人排的（1 = 最好），附獎勵和備註。點一列就選取它。",
      mp08: "📋 據點計畫：加成表——目前（跟遊戲一樣：只算保護中）和含目標——然後是 🎯 目標、✅ 保護中、⚔️ 可爭奪和 ⚠️ 加成衝突的清單，每一個都有倒數。點小標籤就選取那個建築。",
      mp09: "週期：據點保護中幾小時、然後可爭奪幾小時（預設 72 h / 24 h）。計時器跟著它走。",
      mp09v: "週期：據點保護中、然後可爭奪的小時數——由有編輯權限的人設定；計時器跟著它走。",
      mp10: "💾 儲存計畫會把所有東西——狀態、計時器、優先順序、旗幟——寫到網站，所有幹部都看得到；你的名字會出現在「最後儲存者」。復原變更會回到最後儲存的版本。",
      mp11: "🏛️ 遺跡爭奪說明：報名怎麼在各階段之間累積，附兩個策略範例。",
      mp12: "🚩 旗幟計畫：每面聯盟旗幟佔 7×7 格，而且必須碰到已經連到總部的領地，所以旗幟是一面接一面串起來的。藍色格子 = 新領地，紅色 = 已經是別人的。深色旗幟是在遊戲裡確認過的；淺色的是從截圖讀出來的，可能差一兩格。",
      mp13: "🚩 點地圖放置：切到開啟，放大後點一格就放下一面計畫中的旗幟——或是輸入 X / Y 然後 + 新增。",
      mp14: "圖層按鈕：⛰️ 障礙／不可建造、🏳️ 我們的旗幟、🏴 其他聯盟。",
      mp15: "點地圖會放置：我們計畫中的旗幟，或是你在遊戲裡看到的其他聯盟的 🏴 旗幟／🏯 總部。",
      mp16: "計畫中的旗幟，依順序（格子是照清單順序佔的）：修正 X/Y、複製座標、↑ 上移、移除。點地圖上的旗幟可以標記為 ✅ 已建造或 🗑️ 已拆除。然後 💾 儲存計畫。",
      mp16v: "計畫中的旗幟，依順序；複製會給你座標。有編輯權限的人負責新增和移動。",
      mp17: "📍 來自 MightPulse 的城市地圖：王國裡每座城市和它的聯盟與護盾。可以在這裡顯示或在新分頁打開——位置是他們上次掃描的，所以可能是幾週前的。",
      mp18: "🎁 要塞與遺跡獎勵：每個階段各給什麼、建議戰力，以及哪些建築給哪個遺跡獎勵。",
      mp19: "依類型和等級的建築清單。每個小標籤都會在地圖上選取那個建築——跟點標記一樣。",
      rk01: "📋 計畫：🔒 只在這台裝置會把勾選和表格留在這個瀏覽器裡。🔄 共用計畫則是每位幹部看到的都一樣——勾選、權重、分組人數和戰鬥表格幾秒內就會同步——出席分頁也會用它來建立每個日期的名單。",
      rk02: "↩️ 復原會一步步退回最近的變更（勾選、權重、表格）。共用計畫的復原也是共用的。",
      rk03: "+ 新共用計畫：取個名字（例如 Legion 1），然後選要不要用現在勾選的人開始。重新命名和刪除作用在打開的那個計畫上；🕘 版本可以把計畫退回任何一次之前的儲存。",
      rk03v: "共用計畫是由有編輯權限的人建立的；你可以在這裡打開並跟著看。",
      rk04: "✏️ 誰可以編輯：所有幹部，或只有建立者選的人（建立者和管理員一定可以）。",
      rk05: "① 排名方式：部隊戰力適配（聖劍軍團畫面顯示的部隊戰力，從移民分數估算）或權重，由你勾選數據並給每項一個權重。說明會解釋公式。",
      rk06: "權重：勾選要計算的數據，各給一個百分比——不需要加起來等於 100。",
      rk07: "② 勾選這次活動的參加者。全選會勾整份名單；清除會清空。",
      rk08: "貼上報名名單：一行一個名字或用逗號分隔，裝飾符號沒關係。勾選這些玩家會把他們對應到名單並勾起來；找不到的名字會列出來。",
      rk09: "搜尋名字會篩選表格；只看已勾選只顯示勾起來的人。",
      rk10: "名單。左邊的框 = 正選（會排名）；右邊的框 = 替補（列為替補，不排名，出席分頁會以替補匯入）。點一列的任何地方就勾選它；階級列會勾選整個階級；點欄位標題可以排序。",
      rk11: "③ 排名。顯示前 N 名會限制清單；空白 = 所有人。",
      rk12: "複製結果會把排名複製成文字：1. 名字 (ID) — 分數，替補標成 (sub)。",
      rk13: "排好的清單，附分數和背後的數據。~ = 沒有移民分數，用備用公式估算。",
      rk14: "④ 活動分組：點 ⚔️ 聖劍爭奪，排名就會分成進攻者、防守者和參與者。",
      rk15: "進攻者／防守者：各要幾個，從排名最上面取；其他人都是參與者。同樣的數字也會用在 ⑤。",
      rk16: "複製結果會把分組複製成 Discord 貼文；小地圖會打開聖劍地圖。",
      rk17: "⑤ 戰鬥表格：每個階段誰攻、誰守哪棟建築。從清單選一個人，然後點一個框把他放進去（電腦上可以拖曳）；× 移除。",
      rk17v: "⑤ 戰鬥表格：每個階段誰攻、誰守哪棟建築。你可以讀和複製；修改只會留在這台裝置上。",
      rk18: "表格設定：階段（逗號分隔——可以重新命名、新增或移除）、當作建議的建築編號和名稱、哪些欄位要顯示和叫什麼，還有短名稱（去掉 亗 和 Nexus 之類的裝飾）。",
      rk19: "✨ 填一份草稿：排名 #1… 每棟建築一個人當進攻者，接下來的當防守者，其他的當參與者，用的是進攻者／防守者的數字。",
      rk20: "⚔️ 聖劍規則草稿會照聯盟的規則填滿全部 3 個階段：階段 1 ①–④ 依排名放進攻者和防守者，階段 2 聖劍神殿／傭兵營地／大廳，然後是留守。之後再修改。",
      rk21: "📥 貼上文字 → 表格會讀一則寫給 Discord 的分配貼文（① ROYAL STABLES / * ⚔️ Attacker: …）並轉成表格；名字會對應到名單。📝 插入草稿會先給你一份現成的文字讓你修改。",
      rk22: "清除表格會清空每棟建築（階段和設定會留著）。↩️ 復原會把它找回來。",
      rk23: "進攻者／防守者人數——跟 ④ 是同樣的數字。",
      rk24: "人員，依排名建議的角色分組（只有正選）。點一個就選取它——徽章顯示他已經在幾棟階段 1 的建築裡。手機上長按可以拖曳。",
      rk25: "一棟建築：最上面是 # 和名稱，然後是 ⚔️ 進攻者、🛡️ 防守者和 👥 參與者的框——選了人之後點框就加進去，× 移除，+ 文字可以加一個自由備註小標籤。📝 備註是給這棟建築的；顏色點會設定它在圖片裡的顏色；🗑 刪除它。+ 建築會在那個階段新增一棟；階段：會把它移到另一個階段。",
      rk26: "📌 提醒會加在圖片和文字的最下面。",
      rk27: "🖼️ 產生圖片會把整張表格畫成一張圖：可以儲存，或用 📢 用在新公告直接送到公告分頁。",
      rk28: "📋 複製文字會把表格複製成 Discord 貼文——跟貼上文字 → 表格讀回來的是同一種格式。",
      rk29: "🎮 遊戲內聊天用會把它拆成每棟建築一則訊息，各有自己的複製按鈕，因為遊戲聊天一次只能發一則。",
      rk30: "📊 下載 Excel 會把同一張表格存成試算表。",
      at01: "📋 來自排名分頁的共用計畫：每份名單都是從某個計畫的勾選建立的。日期 › 會打開從它建立的最新一份出席名單；建立出席名單會做一份新的（按儲存時才會存起來）。",
      at01v: "📋 來自排名分頁的共用計畫：每份出席名單都是從某個計畫的勾選建立的。日期 › 會打開從它建立的最新一份名單。",
      at02: "每個活動表一張卡片（聖劍、三盟…），每個日期一列：名單名稱和出席 %（有到的正選 ÷ 正選；替補和請假不算）。點一列就打開它——我來打開一個…",
      at03: "缺席會跨日期累計：第 2 次缺席橘色，第 3 次紅色；⭐ = 戰力前 20。只算正選。",
      at04: "‹ 所有表格會回到上一頁（未儲存的變更會丟掉）。",
      at05: "活動、日期和名單名稱。🔄 從計畫更新會重新匯入計畫目前的勾選和替補，保留你做的標記。",
      at05v: "這份名單的活動、日期和名稱。",
      at06: "① 已確認：說會來的人。點名字切換替補（替補沒到不算缺席）；× 移除他們。",
      at06v: "① 已確認：說會來的人；虛線 = 替補。",
      at07: "新增人員：貼上名字然後比對名單、📷 上傳投票截圖（名字會幫你讀出來），或從清單手動新增成員。",
      at08: "② 戰鬥之後：點名字會循環 ✓ 有到 → X 沒到 → 🛌 請假。橘色（第 2 次）和紅色（第 3 次）標記重複缺席。全部有到會一次標記所有人。",
      at08v: "② 戰鬥之後：✓ 有到、X 沒到、🛌 請假；橘色和紅色 = 重複缺席。",
      at09: "儲存會把名單存到伺服器，所有幹部都看得到。複製到 Discord 會複製一份摘要；刪除這份名單會移除它。",
      at09v: "複製到 Discord 會複製這份名單的摘要。",
      po01: "✍️ 撰寫：你的名字和你寫作用的語言——用你自己的語言寫，網站會翻成全部 12 種。",
      po01v: "📢 公告：公告在這裡撰寫並翻譯成 12 種語言。載入清單需要編輯權限——需要這個分頁的話請找管理員。",
      po02: "標題和訊息。**text** = 粗體；連結照常可用。",
      po03: "🖼️ 加圖片會縮小照片，並在游標位置放一個 [[img]] 標記；發布時才會上傳。",
      po04: "指南按鈕會在公告下方加一個按鈕，打開網站的其中一篇指南。",
      po05: "外觀：一般，或 📜 卷軸，用古老卷軸的外框。",
      po06: "自動刪除：公告什麼時候自己消失——今天或明天結束時、1 / 2 / 3 / 7 天後，或指定一個 UTC 的日期和時間。",
      po07: "預覽會用成員看到的樣子顯示。",
      po08: "📢 發布會問一次，上傳圖片並儲存文字。翻譯好的公告大約 2–3 分鐘後會出現在網站上。",
      po09: "📋 網站上的公告，最新的在前面：🖼️ 有圖片、⏳ 還在翻譯、🗑️ 自動刪除時間、✏️ 語言 = 手動修正過。重新整理會重新讀取清單。",
      po10: "編輯會打開一則公告來修改；刪除會把它從網站的所有語言移除（會先問你）。我來打開編輯…",
      po11: "要改什麼：所有語言（在撰寫表單裡打開原文並重新翻譯全部）、🖼️ 只加圖片（不重新翻譯），或單一語言——只手動修正那一個翻譯；重新使用自動翻譯會撤銷修正。",
      wa01: "📋 複製到 Google 試算表會把下面顯示的成員複製成表格——貼到 A1 儲存格。⬇️ 下載 CSV 會存成同樣的檔案。",
      wa01v: "🕵️ 觀察列出每位成員，並標記值得看一下的事。複製／CSV 匯出是給有編輯權限的人用的。",
      wa02: "搜尋名字或 ID 會篩選清單。只顯示有標記的成員會留下可疑的；「新 = 加入在…之內」設定多久以內算新人。",
      wa03: "觀察中的聯盟：在這些聯盟出現過的成員會有紅色標記。我們的農場／姊妹聯盟不算在內。",
      wa04: "點欄位標題排序。標記：查看紀錄、新、來自王國、曾在…、在 n 個聯盟出現過、同名在… 紀錄 ↗ 會在 MightPulse 打開這位玩家。",
      wa05: "✏️ 會打開備註：之前的聯盟和名字、「我已經查過紀錄」、沒問題 ✅／有疑慮 ⚠️、原因、你的名字。儲存會分享給所有幹部。",
      wa05v: "沒問題 ✅／有疑慮 ⚠️ 和留言是幹部對那位成員的備註。",
      wa06: "離開 NXS：誰離開了、什麼時候，以及之後在哪裡出現過。",
      sc01: "輸入王國編號然後立即抓取：一個 GitHub 工作會從 MightPulse 讀取它的前 20 名玩家（2–3 分鐘；頁面會自己重新整理）。",
      sc01v: "偵查的王國是由有編輯權限的人抓取的；下面的表格會顯示它們。",
      sc02: "每個王國小標籤：「在排名中」會在下面的表格顯示它的玩家（只在這台裝置）；「每日更新」會每天重新抓取——王國對決的對手要勾這個；⟳ 立即抓取；✕ 移除它。",
      sc03: "排序依據和 ▲/▼ 會排列表格；點欄位標題也一樣。排序的那一欄會緊接在名字旁邊。",
      sc04: "玩家：戰力、城鎮中心、秘境試煉、擊殺、VIP、估算的部隊戰力（~ = 估算）和移民分數。連結會在 MightPulse 打開他們。",
      vw01: "📈 網站瀏覽：匿名的訪客數——沒有 cookie、沒有名字。選 7 / 30 / 90 天；↻ 重新載入。",
      vw02: "每天的訪客數——點一下或滑過長條看數字。",
      vw03: "大家是從哪些指南、語言、國家、來源網站和裝置來的。幹部的瀏覽器不會被計算。",
      pm01: "💬 這個開關讓只能查看的幹部可以在被 @ 到或被指派的主題裡回覆。",
      pm02: "每位幹部一列：🟢 最後登入或 ⚪ 從未登入。點名字可以改顯示方式。每個分頁選 ✏️ 編輯、👁️ 查看或 — 隱藏；會自動儲存並立即生效。",
      pm03: "🔔 選這個人在幹部待辦到期那天會被提醒哪些活動（小時由他們在 ⏰ 自己選）。什麼都沒選的管理員會收到所有活動。",
      pm04: "👁️ 以某人身分預覽會用那位幹部的權限顯示整個頁面——最上面的離開預覽會帶你回來。設為管理員／移除管理員和移除也在這裡。",
      pm05: "+ 新增幹部：一個名字和 18 位數的 Discord ID。新幹部一開始只有活動、討論板和地圖的 👁️。重設為預設值會回到內建的管理員。",
      pm06: "更多（網站擁有者）：忘記這台裝置上的密碼、重做設定、🔐 幹部資料的加密金鑰。", msgs: "💌 那個麻雀的留言", pick: "想看哪個分頁？", onlyView: "（你只能看，不能改）", ro: "這裡你只能看，不能改。",
      events: "📅 活動", board: "💬 留言板", map: "🗺️ 地圖", ranking: "📊 排名", attend: "📋 出席", post: "📢 公告", watch: "🕵️ 觀察", scout: "🔭 偵查", views: "📈 瀏覽", perms: "👥 幹部",
      },
    pt: {
      ev01: "📅 A faixa do calendário. Role de lado: 14 dias para trás, 70 para a frente, em UTC. Uma barra preenchida está rolando agora. ✅ numa barra = algo para os oficiais fazerem nesta semana — toque nela para ir até essa tarefa. As outras barras abrem a entrada do evento mais abaixo.",
      ev02: "👑 Marcadores de coroa são marcos do Reino #2189: coisas que desbloqueiam conforme o servidor envelhece. Toque num deles para ver a lista inteira.",
      ev03: "👑 A lista de marcos: cada desbloqueio futuro com sua data e quantos dias faltam.",
      ev04: "📣 Rascunho de anúncio: um post para o chat do jogo com os próximos eventos e nossos horários, pronto para colar. Abrir escreve o texto para você.",
      ev05: "Até onde o rascunho olha à frente: os próximos 3, 5 ou 7 dias. Mudar isso reescreve o texto.",
      ev06: "🔄 Gerar de novo descarta suas edições e reconstrói o texto a partir da lista de eventos e de ⏰ Nossos horários de eventos.",
      ev07: "Marque quais eventos entram. Ele pré-marca tantos quantos couberem — o jogo permite 300 caracteres.",
      ev08: "O rascunho em si. Edite à vontade; o contador fica vermelho acima de 300 caracteres. Nada aqui é salvo — é um bloco de rascunho.",
      ev09: "📋 Copiar põe o texto na sua área de transferência. Depois cole no chat do jogo.",
      ev10: "⚙️ Limites de tropas: os números usados em todo lugar onde os guias os mencionam (nos 12 idiomas) e pelo assistente de IA. Mude aqui quando o jogo ou a aliança mudar o limite.",
      ev10v: "⚙️ Limites de tropas: os números que os guias e o assistente de IA usam. Os editores mudam aqui.",
      ev11: "Caçada ao Urso — a quantidade exata de tropas para entrar num rally.",
      ev12: "Outros rallies e QG Viking — o máximo por membro.",
      ev13: "💾 Salvar grava os dois números no site. Os guias mostram os novos números em alguns minutos.",
      ev14: "⏰ Nossos horários de eventos (UTC): os horários que escolhemos para os eventos da aliança, e em qual dia do evento é a batalha. O Esta semana da página inicial e os ⏰ Lembretes do jogo de todo mundo seguem isso.",
      ev14v: "⏰ Nossos horários de eventos (UTC): os horários que escolhemos para os eventos da aliança. A página inicial e os ⏰ Lembretes do jogo de todo mundo seguem esses horários; os editores mudam aqui.",
      ev15: "Uma linha por evento. Digite um ou mais horários, ex.: 13:00, 22:00. Dia da batalha = em qual dia do evento é a luta; 22:00@1, 13:00@3 define um dia diferente por horário. A Caçada ao Urso tem Próximo dia do Urso no lugar — mude se o jogo mover o dia do Urso e o site inteiro acompanha.",
      ev16: "💾 Salvar verifica os horários (HH:MM) e grava no site. Os lembretes passam a usar os novos horários em alguns minutos.",
      ev17: "✅ Itens de ação: o que os oficiais precisam fazer, um cartão por evento rolando nesta semana. Esta semana / Próxima semana trocam a semana de segunda a domingo (UTC).",
      ev18: "Cada cartão lista as tarefas com o prazo ⏰ e 'atrasado' em vermelho. Marque uma tarefa quando estiver feita — as marcações ficam salvas só neste dispositivo.",
      ev19: "✏️ Editar itens abre o editor do evento direto nos itens de ação, para você mudar o que está na lista.",
      ev20: "📣 Post do jogo escreve um lembrete de um único evento no rascunho de anúncio acima, pronto para copiar.",
      ev21: "Os outros botões levam para onde a tarefa é feita: 📢 Escrever anúncio (aba Postar), 📊 Abrir Ranking, 📖 o guia no site, 📋 os guias deste evento dentro do jogo.",
      ev22: "⏱️ Lembretes cronometrados do admin: horários avulsos, ex.: o início de uma Batalha do Santuário. Uma notificação sai 10 minutos antes para todo mundo cujo 🔔 cobre esse evento. Os horários são em UTC.",
      ev23: "Para adicionar um: escolha o evento, digite o que é, a data e a hora, e depois + Adicionar. Excluir remove uma linha. Só fica na lista até você apertar 💾 Salvar.",
      ev24: "💾 Salvar grava os lembretes cronometrados no site para todos os oficiais.",
      ev25: "📋 Eventos e guias do jogo. + Novo evento abre o editor para um evento novo em folha.",
      ev25v: "📋 Eventos e guias do jogo: cada evento com seu cronograma e as mensagens para enviar no jogo.",
      ev26: "Uma entrada por evento. Toque nela para abrir o guia do jogo: cada caixa é uma mensagem de chat (o jogo limita o tamanho da mensagem), então copie e envie uma por uma.",
      ev27: "📋 Copiar copia só aquela mensagem.",
      ev28: "✏️ ao lado de uma mensagem edita só aquela mensagem, no lugar.",
      ev29: "✏️ Editar, embaixo, muda o evento inteiro: datas, itens de ação, adicionar ou remover mensagens. As mudanças são salvas no site para todos os oficiais. Deixa eu abrir…",
      ev30: "Nome e emoji do evento. O nome é editado no idioma que você está usando.",
      ev31: "Repete num cronograma fixo: marque e informe o primeiro dia (UTC), os dias entre as rodadas e quantos dias dura. 📅 abre um seletor de data.",
      ev32: "Nota: aparece na lista, ex.: os horários.",
      ev33: "Guia no site: liga o evento a um dos guias públicos (o botão 📖).",
      ev34: "Itens de ação para os oficiais: cada linha é uma tarefa com 'dias antes (−) ou depois do início', uma hora 'até' opcional e o texto. As duas caixas adicionam um botão 📢 Anúncio ou 📊 Ranking a essa tarefa. + Item de ação adiciona uma linha, ✕ remove uma.",
      ev35: "Guias do jogo: uma caixa = uma mensagem de chat, com um título. + Mensagem adiciona uma, ✕ remove.",
      ev36: "Excluir evento remove para todo mundo (ele pergunta antes).",
      ev37: "💾 Salvar grava o evento no site para todos os oficiais; Cancelar fecha sem salvar.",
      bd01: "💬 O quadro é para planejar juntos. Cada mensagem é traduzida para 中文, English, Português, العربية e 한국어. ↻ recarrega.",
      bd02: "📋 Tarefas para você: coisas atribuídas a você ou onde você foi marcado com @. Toque numa delas para ir até aquele post.",
      bd03: "+ Novo tópico começa uma discussão. Deixa eu abrir o formulário…",
      bd03v: "Oficiais com acesso só leitura podem ler todos os tópicos. Postar exige direitos de edição — ou ter sido marcado com @ ou atribuído, se os admins permitirem respostas nesse caso.",
      bd04: "Título do tópico (sobre o que é) e sua mensagem. Os rascunhos ficam neste dispositivo até você enviar.",
      bd05: "@ insere uma menção: escolha um oficial ou @all. O tópico mostra a eles uma etiqueta 📣.",
      bd06: "📋 Atribuir a transforma a mensagem numa tarefa para as pessoas que você escolher; elas recebem um botão ✅ Feito.",
      bd07: "🖼️ anexa imagens (até 4; colar uma imagem também funciona). Um marcador [[img]] mostra onde ela entra no texto.",
      bd08: "Postar envia — uma única requisição, traduzida para 5 idiomas, então escreva tudo de uma vez em vez de em pedaços. Cancelar esconde o formulário e mantém o rascunho.",
      bd09: "Tópicos, atividade mais recente primeiro: quem começou, quantas mensagens, última atualização. Um ponto vermelho = mudou desde que você abriu pela última vez; 📌 Decidido = uma decisão foi fixada. Toque para abrir — deixa eu abrir um…",
      bd10: "← Todos os tópicos volta para a lista.",
      bd11: "Cada cartão é uma mensagem, no seu idioma. Mostrar original revela o que foi escrito de fato; as imagens abrem em tela cheia quando tocadas.",
      bd12: "📌 Definir como decisão fixa esta mensagem no topo do tópico como o resultado; Limpar decisão desafixa.",
      bd13: "✏️ Editar e 🗑️ Excluir aparecem só nas suas próprias mensagens. Excluir pergunta duas vezes; excluir a primeira mensagem exclui o tópico inteiro.",
      bd14: "✅ Feito: quando uma mensagem é uma tarefa para você, marque como feita aqui (↩︎ Não feito desfaz).",
      bd15: "A caixa de resposta, com as mesmas ferramentas @, 📋 Atribuir a e 🖼️. Responder envia.",
      bd15v: "Responder exige direitos de edição — a menos que você tenha sido marcado com @ ou atribuído aqui e os admins permitam isso.",
      mp01: "Camadas: Todos, 📋 Só o plano (apenas Postos Avançados com um status no plano), 🛰️ Território (montado a partir das capturas de tela dos oficiais — mesma cor = mesma aliança), e depois um chip por tipo de construção. O primeiro toque num tipo mostra só aquele tipo; os toques seguintes alternam.",
      mp02: "+ e − dão zoom (pinça ou a roda do mouse também funcionam); arraste para se mover.",
      mp03: "O mapa. Toque em qualquer marcador para selecionar: 👑 Castelo do Rei, 🛡️ nossos QGs, ◆ Fortalezas, ● Santuários, quadrados coloridos = Postos Avançados (número = nível). Os anéis mostram o plano: verde ✅ Protegido, vermelho ⚔️ Vulnerável, amarelo tracejado 🎯 Alvo. Uma confissão de AQUELA Sparrow: ela não abre o mapa com frequência, então ele é atualizado só de vez em quando 🐦 Deixa eu selecionar um…",
      mp04: "A caixa de informações do que está selecionado: nome, nível e bônus, quem pode disputar, coordenadas X/Y — Copiar põe na sua área de transferência.",
      mp05: "Botões de status: 🎯 Alvo, ✅ Nosso · Protegido, ⚔️ Nosso · Vulnerável, ✕ Limpar. Eles mudam o plano na memória — aperte 💾 Salvar plano depois.",
      mp05v: "Os editores marcam o status aqui (🎯 alvo, ✅ protegido, ⚔️ vulnerável); você vê o resultado no plano abaixo.",
      mp06: "⏱ Timer: depois de marcar Protegido ou Vulnerável, digite a contagem regressiva mostrada no jogo (d h m) e Definir timer — a página então alterna Protegido ⇄ Vulnerável sozinha. Remover timer limpa.",
      mp06v: "⏱ A contagem regressiva até a próxima troca Protegido ⇄ Vulnerável, quando os editores definiram um timer.",
      mp07: "⭐ Prioridade de Santuário e Fortaleza: selecione uma Fortaleza ou um Santuário no mapa e escolha um número (1 = melhor), com suas recompensas e uma nota. Esta lista mostra em ordem; toque numa linha para selecionar.",
      mp07v: "⭐ Prioridade de Santuário e Fortaleza, como os editores classificaram (1 = melhor), com recompensas e notas. Toque numa linha para selecionar.",
      mp08: "📋 Plano de Postos Avançados: a tabela de bônus — Agora (como no jogo: só Protegidos) e Com alvos — e depois as listas de 🎯 Alvos, ✅ Protegidos, ⚔️ Vulneráveis e ⚠️ conflitos de bônus, com a contagem regressiva de cada um. Toque num chip para selecionar aquela construção.",
      mp09: "Ciclo: quantas horas um Posto Avançado fica Protegido, e depois Vulnerável (padrão 72 h / 24 h). Os timers seguem isso.",
      mp09v: "Ciclo: as horas que um Posto Avançado fica Protegido, e depois Vulnerável — os editores definem; os timers seguem isso.",
      mp10: "💾 Salvar plano grava tudo — status, timers, prioridades, bandeiras — no site para todos os oficiais; seu nome vai em Salvo por último por. Desfazer mudanças restaura a última versão salva.",
      mp11: "🏛️ Explicação da Batalha do Santuário: como as inscrições se acumulam entre as fases, com duas estratégias de exemplo.",
      mp12: "🚩 Plano de bandeiras: cada Bandeira da Aliança reivindica 7×7 casas e precisa encostar em território já ligado ao QG, então as bandeiras se encadeiam uma após a outra. Casas azuis = território novo, vermelhas = já é de outra pessoa. Bandeiras escuras foram conferidas no jogo; as claras foram lidas de uma captura de tela e podem estar uma ou duas casas fora.",
      mp13: "🚩 Tocar no mapa para posicionar: ligue (ON), dê zoom e toque numa casa para soltar uma bandeira planejada — ou digite X / Y e + Adicionar.",
      mp14: "Botões de camada: ⛰️ Obstáculos / sem construção, 🏳️ Nossas bandeiras, 🏴 Outras alianças.",
      mp15: "Tocar no mapa posiciona: nossa bandeira planejada, ou a 🏴 bandeira / 🏯 QG de outra aliança quando você viu no jogo.",
      mp16: "Bandeiras planejadas, em ordem (as casas são reivindicadas na ordem da lista): corrija X/Y, Copiar as coordenadas, ↑ mover para cima, Remover. Tocar numa bandeira no mapa permite marcá-la como ✅ Construída ou 🗑️ Demolida. Depois 💾 Salvar plano.",
      mp16v: "Bandeiras planejadas, em ordem; Copiar dá as coordenadas. Os editores adicionam e movem.",
      mp17: "📍 Mapa de cidades do MightPulse: cada cidade do reino com sua aliança e escudo. Mostre aqui ou abra numa nova aba — as posições vêm da última varredura deles, então podem ter semanas.",
      mp18: "🎁 Recompensas de Fortaleza e Santuário: o que cada uma dá por fase, o poder recomendado, e quais construções dão qual recompensa de Santuário.",
      mp19: "As listas de construções por tipo e nível. Cada chip seleciona aquela construção no mapa — o mesmo que tocar no marcador.",
      rk01: "📋 Plano: 🔒 Só neste dispositivo mantém as marcações e a tabela neste navegador. Um 🔄 plano compartilhado é o mesmo para todos os oficiais — marcações, pesos, tamanhos de grupo e a tabela de batalha sincronizam em segundos — e a aba Presença monta a lista de cada data a partir dele.",
      rk02: "↩️ Desfazer volta pelas últimas mudanças (marcações, pesos, tabela). Num plano compartilhado o desfazer também é compartilhado.",
      rk03: "+ Novo plano compartilhado: dê um nome (ex.: Legião 1) e escolha se começa com as pessoas marcadas agora. Renomear e Excluir agem no plano aberto; 🕘 Versões volta o plano para qualquer salvamento anterior.",
      rk03v: "Os planos compartilhados são criados pelos editores; você pode abri-los aqui e acompanhar.",
      rk04: "✏️ Quem pode editar: todos os oficiais, ou só as pessoas que o criador escolher (o criador e os admins sempre podem).",
      rk05: "① Método de ranking: Ajuste por Poder do Esquadrão (o Poder do Esquadrão que as telas da Legião de Swordland mostram, estimado a partir da Pontuação de Migrante) ou Pesos, onde você marca as estatísticas e dá um peso a cada uma. A nota explica a fórmula.",
      rk06: "Pesos: marque as estatísticas que contam e dê uma porcentagem a cada uma — não precisam somar 100.",
      rk07: "② Marque os participantes deste evento. Selecionar todos marca a lista de membros inteira; Limpar esvazia.",
      rk08: "Cole uma lista de inscrição: um nome por linha ou separados por vírgula, decorações não importam. Marcar estes jogadores casa os nomes com a lista de membros e marca; os nomes que não encontrou são listados.",
      rk09: "Buscar um nome filtra a tabela; Só marcados mostra apenas os marcados.",
      rk10: "A lista de membros. Caixa da esquerda = titular (ranqueado); caixa da direita = reserva (listado como reserva, não ranqueado, importado como reserva pela Presença). Tocar em qualquer lugar de uma linha marca; uma linha de rank marca o rank inteiro; toque no cabeçalho de uma coluna para ordenar.",
      rk11: "③ Ranking. Mostrar top N limita a lista; vazio = todo mundo.",
      rk12: "Copiar resultado copia o ranking como texto: 1. Nome (ID) — pontuação, reservas marcados como (reserva).",
      rk13: "A lista ranqueada com a pontuação e as estatísticas por trás dela. ~ = sem Pontuação de Migrante, estimado com a fórmula alternativa.",
      rk14: "④ Grupos do evento: toque em ⚔️ Confronto de Swordland e o ranking é dividido em Atacantes, Defensores e Participantes.",
      rk15: "Atacantes / Defensores: quantos de cada, tirados do topo do ranking; todos os outros são Participantes. Os mesmos números comandam o ⑤.",
      rk16: "Copiar resultado copia os grupos como um post para o Discord; o mapinha abre o mapa de Swordland.",
      rk17: "⑤ Tabela de batalha: quem ataca ou defende qual construção, por fase. Escolha uma pessoa na lista e depois toque numa caixa para colocá-la ali (arraste no computador); × remove.",
      rk17v: "⑤ Tabela de batalha: quem ataca ou defende qual construção, por fase. Você pode ler e copiar; as edições ficam só neste dispositivo.",
      rk18: "Configuração da tabela: as fases (separadas por vírgula — renomeie, adicione ou remova), os números e nomes das construções oferecidos como sugestões, quais colunas aparecem e como se chamam, e Nomes curtos (tira decorações como 亗 e Nexus).",
      rk19: "✨ Preencher um primeiro rascunho: ranqueado #1… um por construção como Atacante, os seguintes como Defensores, o resto como Participantes, usando os números de Atacantes / Defensores.",
      rk20: "⚔️ Rascunho pelas regras de Swordland preenche as 3 fases pelas regras da aliança: Fase 1 ①–④ com atacantes e defensores por rank, Fase 2 Santuário da Espada / Acampamento Mercenário / Salão, e depois Ficar atrás. Edite depois.",
      rk21: "📥 Colar texto → tabela lê um post de atribuição escrito para o Discord (① ROYAL STABLES / * ⚔️ Attacker: …) e transforma na tabela; os nomes são casados com a lista de membros. 📝 Inserir um rascunho dá um texto pronto para você editar antes.",
      rk22: "Limpar tabela esvazia todas as construções (fases e configuração ficam). ↩️ Desfazer traz de volta.",
      rk23: "Contagens de Atacantes / Defensores — os mesmos números do ④.",
      rk24: "Pessoas, agrupadas pelo papel sugerido a partir do ranking (só titulares). Toque numa para selecionar — o selo mostra em quantas construções da Fase 1 ela já está. No celular, pressione e segure para arrastar.",
      rk25: "Uma construção: # e nome em cima, depois as caixas ⚔️ Atacante, 🛡️ Defensores e 👥 Participantes — toque numa caixa com alguém selecionado para adicionar, × remove, + texto adiciona um chip de nota livre. 📝 Nota é da construção; os pontos coloridos definem sua cor na imagem; 🗑 exclui. + Construção adiciona uma a essa fase; Fase: move para outra fase.",
      rk26: "📌 Os lembretes são adicionados no fim da imagem e do texto.",
      rk27: "🖼️ Gerar imagem desenha a tabela inteira como uma imagem: salve, ou 📢 Usar num novo anúncio manda direto para a aba Postar.",
      rk28: "📋 Copiar texto copia a tabela como um post para o Discord — o mesmo formato que Colar texto → tabela lê de volta.",
      rk29: "🎮 Para o chat do jogo divide em uma mensagem por construção, cada uma com seu próprio botão de copiar, porque o chat do jogo aceita uma mensagem de cada vez.",
      rk30: "📊 Baixar Excel salva a mesma tabela como planilha.",
      at01: "📋 Planos compartilhados da aba Ranking: cada lista é montada a partir das marcações de um plano. Data › abre a lista de presença mais recente feita a partir dele; Criar lista de presença faz uma nova (ela é armazenada quando você aperta Salvar).",
      at01v: "📋 Planos compartilhados da aba Ranking: cada lista de presença é montada a partir das marcações de um plano. Data › abre a lista mais recente feita a partir dele.",
      at02: "Um cartão por planilha de evento (Swordland, Tri-Aliança…), uma linha por data: nome da lista e % de presença (titulares que apareceram ÷ titulares; reservas e justificados não contam). Toque numa linha para abrir — deixa eu abrir uma…",
      at03: "As faltas se acumulam entre as datas: 2ª falta laranja, 3ª vermelha; ⭐ = top 20 por poder. Só titulares contam.",
      at04: "‹ Todas as planilhas volta (mudanças não salvas são descartadas).",
      at05: "Evento, data e nome da lista. 🔄 Atualizar a partir do plano reimporta as marcações e reservas atuais do plano, mantendo as marcas que você fez.",
      at05v: "O evento, a data e o nome desta lista.",
      at06: "① Confirmados: quem disse sim. Toque num nome para alternar reserva (um reserva que não aparece não é falta); × remove.",
      at06v: "① Confirmados: quem disse sim; tracejado = reserva.",
      at07: "Para adicionar pessoas: cole nomes e Casar com a lista de membros, 📷 envie capturas de tela dos votantes (os nomes são lidos para você), ou Adicionar um membro à mão a partir da lista.",
      at08: "② Depois da batalha: toque num nome para alternar ✓ apareceu → X não apareceu → 🛌 justificado. Laranja (2ª) e vermelho (3ª) marcam faltas repetidas. Todos apareceram marca todo mundo de uma vez.",
      at08v: "② Depois da batalha: ✓ apareceu, X não apareceu, 🛌 justificado; laranja e vermelho = faltas repetidas.",
      at09: "Salvar armazena a lista no servidor para todos os oficiais. Copiar para o Discord copia um resumo; Excluir esta lista remove.",
      at09v: "Copiar para o Discord copia um resumo desta lista.",
      po01: "✍️ Escrever: seu nome e o idioma em que você está escrevendo — escreva no seu próprio idioma, o site traduz para todos os 12.",
      po01v: "📢 Postar: os anúncios são escritos aqui e traduzidos para 12 idiomas. Carregar a lista exige direitos de edição — peça a um admin se você precisar desta aba.",
      po02: "Título e Mensagem. **texto** = negrito; links funcionam normalmente.",
      po03: "🖼️ Adicionar imagem reduz a foto e põe um marcador [[img]] onde está o cursor; ela é enviada quando você publica.",
      po04: "Botão para um guia adiciona um botão embaixo do anúncio que abre um dos guias do site.",
      po05: "Aparência: Simples, ou 📜 Pergaminho para uma moldura de pergaminho antigo.",
      po06: "Exclusão automática: quando o anúncio some sozinho — no fim de hoje ou de amanhã, depois de 1 / 2 / 3 / 7 dias, ou numa data e hora em UTC.",
      po07: "Pré-visualizar mostra do jeito que os membros vão ver.",
      po08: "📢 Publicar pergunta uma vez, envia as imagens e salva o texto. O anúncio traduzido aparece no site em uns 2–3 minutos.",
      po09: "📋 Anúncios no site, mais novos primeiro: 🖼️ tem imagens, ⏳ ainda traduzindo, 🗑️ hora da exclusão automática, ✏️ Idioma = corrigido à mão. Atualizar relê a lista.",
      po10: "Editar abre um anúncio para mudanças; Excluir remove do site em todos os idiomas (ele pergunta antes). Deixa eu abrir Editar…",
      po11: "O que mudar: Todos os idiomas (abre o original no formulário Escrever e traduz tudo de novo), 🖼️ Só adicionar imagens (sem nova tradução), ou um idioma — corrija só aquela tradução à mão; Usar a tradução automática de novo desfaz uma correção.",
      wa01: "📋 Copiar para o Google Sheets copia os membros mostrados abaixo como uma tabela — cole na célula A1. ⬇️ Baixar CSV salva o mesmo arquivo.",
      wa01v: "🕵️ Vigilância lista cada membro com sinalizações de coisas que valem uma olhada. Copiar / exportar CSV é para editores.",
      wa02: "Buscar um nome ou ID filtra a lista. Só mostrar membros com sinalizações mantém os suspeitos; 'Novo = entrou há' define por quanto tempo alguém conta como novo.",
      wa03: "Alianças vigiadas: membros vistos nelas recebem uma sinalização vermelha. Nossas alianças de farm / irmãs são ignoradas nisso.",
      wa04: "Toque no cabeçalho de uma coluna para ordenar. Sinalizações: Conferir Registro, Novo, Do reino, Esteve em…, Visto em n alianças, Mesmo nome em… Registro ↗ abre o jogador no MightPulse.",
      wa05: "✏️ abre a nota: alianças e nomes anteriores, 'Eu conferi o Registro', Limpo ✅ / Não limpo ⚠️, o motivo, seu nome. Salvar compartilha com todos os oficiais.",
      wa05v: "Limpo ✅ / Não limpo ⚠️ e os comentários são as notas dos oficiais sobre aquele membro.",
      wa06: "Saíram da NXS: quem saiu, quando, e onde foram vistos desde então.",
      sc01: "Digite o número de um reino e Buscar agora: um job do GitHub lê os 20 melhores jogadores dele no MightPulse (2–3 minutos; a página atualiza sozinha).",
      sc01v: "Os reinos explorados são buscados pelos editores; a tabela abaixo mostra eles.",
      sc02: "Cada chip de reino: 'no ranking' mostra os jogadores dele na tabela abaixo (só neste dispositivo); 'atualizar diariamente' atualiza todo dia — marque para o adversário do KvK; ⟳ busca agora; ✕ remove.",
      sc03: "Ordenar por e ▲/▼ ordenam a tabela; tocar no cabeçalho de uma coluna faz o mesmo. A coluna ordenada fica logo ao lado do nome.",
      sc04: "Os jogadores: poder, TC, Provação Mística, abates, VIP, Poder do Esquadrão estimado (~ = estimado) e Pontuação de Migrante. O link abre eles no MightPulse.",
      vw01: "📈 Visualizações do site: contagens anônimas de visitantes — sem cookies, sem nomes. Escolha 7 / 30 / 90 dias; ↻ recarrega.",
      vw02: "Visitantes por dia — toque ou passe o mouse numa barra para ver o número.",
      vw03: "De quais guias, idiomas, países, referenciadores e dispositivos as pessoas vêm. Os navegadores dos oficiais não são contados.",
      pm01: "💬 Esta chave permite que oficiais com acesso só leitura respondam num tópico onde foram marcados com @ ou atribuídos.",
      pm02: "Uma linha por oficial: 🟢 último login ou ⚪ nunca. Toque no nome para mudar como ele aparece. Por aba escolha ✏️ Editar, 👁️ Ver ou — Oculta; salva sozinho e vale na hora.",
      pm03: "🔔 escolhe de quais eventos esta pessoa é lembrada no dia em que uma tarefa de oficial vence (ela escolhe a hora em ⏰). Admins sem nada escolhido recebem todos os eventos.",
      pm04: "👁️ Pré-visualizar como mostra a página inteira com os direitos daquele oficial — Sair da pré-visualização no topo traz você de volta. Tornar admin / Remover admin e Remover também ficam aqui.",
      pm05: "+ Adicionar oficial: um nome e o ID do Discord de 18 dígitos. Um oficial novo começa só com Eventos, Quadro e Mapa em 👁️. Restaurar padrões volta para os admins embutidos.",
      pm06: "Mais (dono do site): esquecer a senha neste dispositivo, refazer a configuração, 🔐 a chave de criptografia dos dados dos oficiais.", msgs: "💌 Mensagem dAQUELA Sparrow", pick: "Qual aba você quer que eu mostre?", onlyView: "(você pode ver, não editar)", ro: "Aqui você pode ver, mas não mudar nada.",
      events: "📅 Eventos", board: "💬 Quadro", map: "🗺️ Mapa", ranking: "📊 Ranking", attend: "📋 Presença", post: "📢 Postar", watch: "🕵️ Vigiar", scout: "🔭 Espiar", views: "📈 Visitas", perms: "👥 Oficiais",
      },
    ar: {
      ev01: "📅 شريط التقويم. مرّره جانبياً: 14 يوماً إلى الخلف و70 يوماً إلى الأمام، بتوقيت UTC. الشريط الممتلئ يعني حدثاً جارياً الآن. ✅ على شريط = شيء على الضباط فعله هذا الأسبوع — اضغط عليه للانتقال إلى تلك المهمة. بقية الأشرطة تفتح مدخل الحدث في الأسفل.",
      ev02: "👑 علامات التاج هي مراحل المملكة #2189: أشياء تُفتح كلما تقدّم عمر السيرفر. اضغط على واحدة لرؤية القائمة كاملة.",
      ev03: "👑 قائمة المراحل: كل فتح قادم مع تاريخه وعدد الأيام المتبقية.",
      ev04: "📣 مسودة الإعلان: منشور لدردشة اللعبة بالأحداث القادمة مع أوقاتنا، جاهز للصق. فتحها يكتب النص لك.",
      ev05: "إلى أي مدى تنظر المسودة: الأيام الـ3 أو 5 أو 7 القادمة. تغييره يعيد كتابة النص.",
      ev06: "🔄 إنشاء من جديد يتجاهل تعديلاتك ويعيد بناء النص من قائمة الأحداث ومن ⏰ أوقات أحداثنا.",
      ev07: "حدّد الأحداث التي تدخل في النص. يحدّد مسبقاً أكبر عدد يتسع — اللعبة تسمح بـ300 حرف.",
      ev08: "المسودة نفسها. عدّلها بحرية؛ يتحول العداد إلى الأحمر فوق 300 حرف. لا شيء هنا يُحفظ — إنها مساحة مؤقتة.",
      ev09: "📋 نسخ يضع النص في الحافظة. ثم ألصقه في دردشة اللعبة.",
      ev10: "⚙️ حدود القوات: الأرقام المستخدمة في كل مكان تذكرها فيه الأدلة (في اللغات الـ12 كلها) وفي المساعد الذكي. غيّرها هنا عندما تغيّر اللعبة أو التحالف الحد.",
      ev10v: "⚙️ حدود القوات: الأرقام التي تستخدمها الأدلة والمساعد الذكي. المحررون يغيّرونها هنا.",
      ev11: "صيد الدب — عدد القوات بالضبط للانضمام إلى حشد.",
      ev12: "الحشود الأخرى ومقر الفايكنج — الحد الأقصى لكل عضو.",
      ev13: "💾 حفظ يكتب الرقمين في الموقع. تعرض الأدلة الأرقام الجديدة خلال دقائق قليلة.",
      ev14: "⏰ أوقات أحداثنا (UTC): الأوقات التي نختارها لأحداث التحالف، وفي أي يوم من الحدث تكون المعركة. قسم هذا الأسبوع في الصفحة الرئيسية و⏰ تذكيرات اللعبة عند الجميع تتبع هذا.",
      ev14v: "⏰ أوقات أحداثنا (UTC): الأوقات التي نختارها لأحداث التحالف. الصفحة الرئيسية و⏰ تذكيرات اللعبة عند الجميع تتبعها؛ المحررون يغيّرونها هنا.",
      ev15: "سطر واحد لكل حدث. اكتب وقتاً أو أكثر، مثل 13:00, 22:00. يوم المعركة = في أي يوم من الحدث يكون القتال؛ 22:00@1, 13:00@3 يحدد يوماً مختلفاً لكل وقت. صيد الدب له يوم الدب القادم بدلاً من ذلك — غيّره إذا نقلت اللعبة يوم الدب فيتبعه الموقع كله.",
      ev16: "💾 حفظ يتحقق من الأوقات (HH:MM) ويكتبها في الموقع. تستخدم التذكيرات الأوقات الجديدة خلال دقائق قليلة.",
      ev17: "✅ بنود العمل: ما يجب على الضباط فعله، بطاقة واحدة لكل حدث جارٍ هذا الأسبوع. هذا الأسبوع / الأسبوع القادم يبدّلان الأسبوع من الإثنين إلى الأحد (UTC).",
      ev18: "كل بطاقة تعرض المهام مع موعد استحقاقها ⏰ و'متأخر' بالأحمر. حدّد المهمة عند إنجازها — التحديدات تُحفظ على هذا الجهاز فقط.",
      ev19: "✏️ تعديل البنود يفتح محرر الحدث مباشرة عند بنود عمله، لتغيّر ما في القائمة.",
      ev20: "📣 منشور اللعبة يكتب تذكيراً بحدث واحد في مسودة الإعلان أعلاه، جاهزاً للنسخ.",
      ev21: "الأزرار الأخرى تنقلك إلى حيث تُنجز المهمة: 📢 كتابة إعلان (تبويب المنشورات)، 📊 فتح الترتيب، 📖 الدليل على الموقع، 📋 أدلة هذا الحدث داخل اللعبة.",
      ev22: "⏱️ تذكيرات المشرفين المؤقتة: أوقات لمرة واحدة، مثل بداية معركة المعبد. يُرسل إشعار قبل 10 دقائق إلى كل من يشمل 🔔 لديه ذلك الحدث. الأوقات بتوقيت UTC.",
      ev23: "للإضافة: اختر الحدث، اكتب ما هو، التاريخ والساعة، ثم + إضافة. حذف يزيل صفاً. يبقى في القائمة فقط حتى تضغط 💾 حفظ.",
      ev24: "💾 حفظ يكتب التذكيرات المؤقتة في الموقع لكل الضباط.",
      ev25: "📋 الأحداث والأدلة داخل اللعبة. + حدث جديد يفتح المحرر لحدث جديد تماماً.",
      ev25v: "📋 الأحداث والأدلة داخل اللعبة: كل حدث مع جدوله والرسائل التي تُرسل في اللعبة.",
      ev26: "مدخل واحد لكل حدث. اضغط عليه لفتح دليله داخل اللعبة: كل مربع هو رسالة دردشة واحدة (اللعبة تحد من طول الرسالة)، فانسخها وأرسلها واحدة تلو الأخرى.",
      ev27: "📋 نسخ ينسخ تلك الرسالة وحدها.",
      ev28: "✏️ بجانب رسالة يعدّل تلك الرسالة فقط، في مكانها.",
      ev29: "✏️ تعديل في الأسفل يغيّر الحدث كله: التواريخ، بنود العمل، إضافة الرسائل أو إزالتها. التغييرات تُحفظ في الموقع لكل الضباط. دعني أفتحه…",
      ev30: "اسم الحدث ورمزه التعبيري. يُعدَّل الاسم باللغة التي تستخدمها.",
      ev31: "يتكرر بجدول ثابت: حدّده وأدخل اليوم الأول (UTC)، عدد الأيام بين كل تكرار، وكم يوماً يستمر. 📅 يفتح منتقي التاريخ.",
      ev32: "ملاحظة: تظهر في القائمة، مثل الأوقات.",
      ev33: "دليل على الموقع: يربط الحدث بأحد الأدلة العامة (زر 📖).",
      ev34: "بنود العمل للضباط: كل صف مهمة فيها 'الأيام قبل (−) أو بعد البداية'، ساعة 'حتى' اختيارية والنص. المربعان يضيفان زر 📢 إعلان أو 📊 الترتيب إلى تلك المهمة. + بند عمل يضيف صفاً، ✕ يزيل واحداً.",
      ev35: "الأدلة داخل اللعبة: مربع واحد = رسالة دردشة واحدة، مع عنوان. + رسالة يضيف واحدة، ✕ يزيلها.",
      ev36: "حذف الحدث يزيله للجميع (يسألك أولاً).",
      ev37: "💾 حفظ يكتب الحدث في الموقع لكل الضباط؛ إلغاء يغلق دون حفظ.",
      bd01: "💬 اللوحة مخصصة للتخطيط معاً. كل رسالة تُترجم إلى 中文 وEnglish وPortuguês والعربية و한국어. ↻ يعيد التحميل.",
      bd02: "📋 مهام لك: الأشياء المسندة إليك أو التي ذُكرت فيها بـ@. اضغط على واحدة للانتقال إلى ذلك المنشور.",
      bd03: "+ موضوع جديد يبدأ نقاشاً. دعني أفتح النموذج…",
      bd03v: "الضباط للعرض فقط يمكنهم قراءة كل موضوع. النشر يحتاج إلى حقوق التعديل — أو أن تُذكر بـ@ أو تُسند إليك مهمة، إذا سمح المشرفون بالرد في هذه الحالة.",
      bd04: "عنوان الموضوع (عمّا يدور) ورسالتك. تبقى المسودات على هذا الجهاز حتى ترسل.",
      bd05: "@ يدرج إشارة: اختر ضابطاً أو @all. يعرض الموضوع لهم وسم 📣.",
      bd06: "📋 إسناد إلى يحوّل الرسالة إلى مهمة للأشخاص الذين تختارهم؛ يحصلون على زر ✅ تم.",
      bd07: "🖼️ يرفق صوراً (حتى 4؛ لصق صورة يعمل أيضاً). علامة [[img]] تبيّن مكانها في النص.",
      bd08: "نشر يرسلها — طلب واحد، مترجم إلى 5 لغات، فاكتب كل شيء دفعة واحدة بدلاً من أجزاء. إلغاء يخفي النموذج ويحتفظ بالمسودة.",
      bd09: "المواضيع، الأحدث نشاطاً أولاً: من بدأه، عدد الرسائل، آخر تحديث. نقطة حمراء = تغيّر منذ آخر مرة فتحته؛ 📌 تم القرار = قرار مثبّت. اضغط للفتح — دعني أفتح واحداً…",
      bd10: "← كل المواضيع يعود إلى القائمة.",
      bd11: "كل بطاقة هي رسالة واحدة، بلغتك. عرض الأصل يكشف ما كُتب فعلاً؛ الصور تُفتح بملء الشاشة عند الضغط عليها.",
      bd12: "📌 تعيين كقرار يثبّت هذه الرسالة في أعلى الموضوع كنتيجته؛ مسح القرار يلغي التثبيت.",
      bd13: "✏️ تعديل و🗑️ حذف يظهران على رسائلك أنت فقط. الحذف يسأل مرتين؛ حذف الرسالة الأولى يحذف الموضوع كله.",
      bd14: "✅ تم: عندما تكون رسالة مهمة لك، علّمها كمنجزة هنا (↩︎ لم يتم يتراجع عن ذلك).",
      bd15: "مربع الرد، مع نفس أدوات @ و📋 إسناد إلى و🖼️. رد يرسله.",
      bd15v: "الرد يحتاج إلى حقوق التعديل — إلا إذا ذُكرت بـ@ أو أُسندت إليك مهمة هنا وسمح المشرفون بذلك.",
      mp01: "الطبقات: الكل، 📋 الخطة فقط (المواقع المتقدمة التي لها حالة في الخطة فقط)، 🛰️ الأراضي (مجمّعة من لقطات شاشة الضباط — نفس اللون = نفس التحالف)، ثم شريحة لكل نوع مبنى. الضغطة الأولى على نوع تعرض ذلك النوع فقط؛ الضغطات التالية تبدّل.",
      mp02: "+ و− للتكبير والتصغير (القرص أو عجلة الفأرة يعملان أيضاً)؛ اسحب للتنقل.",
      mp03: "الخريطة. اضغط على أي علامة لتحديدها: 👑 قلعة الملك، 🛡️ مقراتنا، ◆ القلاع، ● المعابد، المربعات الملونة = المواقع المتقدمة (الرقم = المستوى). الحلقات تبيّن الخطة: أخضر ✅ محمي، أحمر ⚔️ معرّض، أصفر متقطع 🎯 هدف. اعتراف من ذلك Sparrow: هي لا تفتح الخريطة كثيراً، لذا تُحدَّث بين حين وآخر فقط 🐦 دعني أحدد واحداً…",
      mp04: "مربع المعلومات لما هو محدد: الاسم، المستوى والتعزيز، من يمكنه التنافس عليه، إحداثيات X/Y — نسخ يضعها في الحافظة.",
      mp05: "أزرار الحالة: 🎯 هدف، ✅ لنا · محمي، ⚔️ لنا · معرّض، ✕ مسح. تغيّر الخطة في الذاكرة — اضغط 💾 حفظ الخطة بعدها.",
      mp05v: "المحررون يحددون الحالة هنا (🎯 هدف، ✅ محمي، ⚔️ معرّض)؛ أنت ترى النتيجة في الخطة بالأسفل.",
      mp06: "⏱ المؤقت: بعد التحديد كمحمي أو معرّض، اكتب العد التنازلي المعروض في اللعبة (d h m) ثم ضبط المؤقت — تقلب الصفحة بعدها محمي ⇄ معرّض من تلقاء نفسها. إزالة المؤقت يمسحه.",
      mp06v: "⏱ العد التنازلي حتى التبديل التالي محمي ⇄ معرّض، عندما يكون المحررون قد ضبطوا مؤقتاً.",
      mp07: "⭐ أولوية المعابد والقلاع: حدد قلعة أو معبداً على الخريطة واختر رقماً (1 = الأفضل)، مع مكافآته وملاحظة. تعرضها هذه القائمة بالترتيب؛ اضغط على صف لتحديده.",
      mp07v: "⭐ أولوية المعابد والقلاع، كما رتّبها المحررون (1 = الأفضل)، مع المكافآت والملاحظات. اضغط على صف لتحديده.",
      mp08: "📋 خطة المواقع المتقدمة: جدول التعزيزات — الآن (كما في اللعبة: المحمية فقط) ومع الأهداف — ثم قوائم 🎯 الأهداف و✅ المحمية و⚔️ المعرّضة و⚠️ تعارضات التعزيزات، مع العد التنازلي لكل منها. اضغط على شريحة لتحديد ذلك المبنى.",
      mp09: "الدورة: كم ساعة يبقى الموقع المتقدم محمياً، ثم معرّضاً (الافتراضي 72 س / 24 س). المؤقتات تتبعها.",
      mp09v: "الدورة: الساعات التي يبقى فيها الموقع المتقدم محمياً، ثم معرّضاً — المحررون يضبطونها؛ المؤقتات تتبعها.",
      mp10: "💾 حفظ الخطة يكتب كل شيء — الحالات، المؤقتات، الأولويات، الرايات — في الموقع لكل الضباط؛ يُسجَّل اسمك في آخر من حفظ. تراجع عن التغييرات يعيد آخر نسخة محفوظة.",
      mp11: "🏛️ شرح معركة المعبد: كيف تتراكم التسجيلات عبر المراحل، مع مثالين لاستراتيجيتين.",
      mp12: "🚩 خطة الرايات: كل راية تحالف تستولي على 7×7 بلاطات ويجب أن تلامس أراضي مرتبطة بالمقر أصلاً، لذا تتسلسل الرايات واحدة بعد أخرى. البلاطات الزرقاء = أراضٍ جديدة، الحمراء = تخص غيرنا أصلاً. الرايات الداكنة تم التحقق منها في اللعبة؛ الفاتحة مقروءة من لقطة شاشة وقد تنحرف بلاطة أو اثنتين.",
      mp13: "🚩 اضغط على الخريطة للوضع: شغّله، كبّر واضغط على بلاطة لوضع راية مخططة — أو اكتب X / Y ثم + إضافة.",
      mp14: "أزرار الطبقات: ⛰️ العوائق / ممنوع البناء، 🏳️ راياتنا، 🏴 التحالفات الأخرى.",
      mp15: "الضغط على الخريطة يضع: رايتنا المخططة، أو راية 🏴 / مقر 🏯 لتحالف آخر عندما تكون رأيته في اللعبة.",
      mp16: "الرايات المخططة، بالترتيب (تُستولى البلاطات بترتيب القائمة): صحّح X/Y، نسخ الإحداثيات، ↑ للأعلى، إزالة. الضغط على راية في الخريطة يتيح لك تعليمها ✅ مبنية أو 🗑️ مهدومة. ثم 💾 حفظ الخطة.",
      mp16v: "الرايات المخططة، بالترتيب؛ نسخ يعطيك الإحداثيات. المحررون يضيفونها وينقلونها.",
      mp17: "📍 خريطة المدن من MightPulse: كل مدينة في المملكة مع تحالفها ودرعها. اعرضها هنا أو افتحها في تبويب جديد — المواقع من آخر مسح لهم، لذا قد يكون عمرها أسابيع.",
      mp18: "🎁 مكافآت القلاع والمعابد: ما يعطيه كل منها في كل مرحلة، القوة الموصى بها، وأي المباني تعطي أي مكافأة من مكافآت المعبد.",
      mp19: "قوائم المباني حسب النوع والمستوى. كل شريحة تحدد ذلك المبنى على الخريطة — تماماً كالضغط على العلامة.",
      rk01: "📋 الخطة: 🔒 على هذا الجهاز فقط يبقي التحديدات والجدول في هذا المتصفح. الخطة المشتركة 🔄 هي نفسها لكل ضابط — التحديدات والأوزان وأحجام المجموعات وجدول المعركة تتزامن خلال ثوانٍ — وتبويب الحضور يبني قائمة كل تاريخ منها.",
      rk02: "↩️ تراجع يعود خطوة خطوة عبر آخر التغييرات (التحديدات، الأوزان، الجدول). في الخطة المشتركة يكون التراجع مشتركاً أيضاً.",
      rk03: "+ خطة مشتركة جديدة: أعطها اسماً (مثل Legion 1) واختر ما إذا كانت تبدأ بالأشخاص المحددين الآن. إعادة التسمية وحذف يعملان على الخطة المفتوحة؛ 🕘 الإصدارات يعيد الخطة إلى أي حفظ سابق.",
      rk03v: "الخطط المشتركة ينشئها المحررون؛ يمكنك فتحها هنا ومتابعتها.",
      rk04: "✏️ من يمكنه التعديل: كل الضباط، أو فقط الأشخاص الذين يختارهم المنشئ (المنشئ والمشرفون يمكنهم دائماً).",
      rk05: "① طريقة الترتيب: ملاءمة قوة الفرقة (قوة الفرقة التي تعرضها شاشات فيلق أرض السيوف، مقدّرة من نقاط الهجرة) أو الأوزان، حيث تحدد الإحصاءات وتعطي كلاً منها وزناً. الملاحظة تشرح المعادلة.",
      rk06: "الأوزان: حدد الإحصاءات التي تُحتسب وأعط كلاً منها نسبة مئوية — لا يلزم أن يكون مجموعها 100.",
      rk07: "② حدد المشاركين في هذا الحدث. تحديد الكل يحدد قائمة الأعضاء كاملة؛ مسح يفرغها.",
      rk08: "ألصق قائمة تسجيل: اسم في كل سطر أو مفصولة بفواصل، الزخارف لا تهم. تحديد هؤلاء اللاعبين يطابقهم مع قائمة الأعضاء ويحددهم؛ الأسماء التي لم يجدها تُعرض في قائمة.",
      rk09: "البحث عن اسم يصفّي الجدول؛ المحددون فقط يعرض المحددين وحدهم.",
      rk10: "قائمة الأعضاء. المربع الأيسر = أساسي (يدخل الترتيب)؛ المربع الأيمن = بديل (يُعرض كبديل، لا يدخل الترتيب، ويستورده الحضور كبديل). الضغط في أي مكان من الصف يحدده؛ صف الرتبة يحدد الرتبة كلها؛ اضغط على رأس عمود للفرز.",
      rk11: "③ الترتيب. عرض أفضل N يحد القائمة؛ فارغ = الجميع.",
      rk12: "نسخ النتيجة ينسخ الترتيب كنص: 1. الاسم (ID) — النقاط، والبدلاء معلّمون بـ(بديل).",
      rk13: "القائمة المرتبة مع النقاط والإحصاءات وراءها. ~ = لا نقاط هجرة، مقدّر بالمعادلة الاحتياطية.",
      rk14: "④ مجموعات الحدث: اضغط ⚔️ مواجهة أرض السيوف فيُقسَّم الترتيب إلى مهاجمين ومدافعين ومنضمين.",
      rk15: "المهاجمون / المدافعون: كم من كل منهم، مأخوذون من أعلى الترتيب؛ الباقون جميعاً منضمون. نفس الأرقام تحرّك ⑤.",
      rk16: "نسخ النتيجة ينسخ المجموعات كمنشور Discord؛ الخريطة الصغيرة تفتح خريطة أرض السيوف.",
      rk17: "⑤ جدول المعركة: من يهاجم أو يدافع عن أي مبنى، في كل مرحلة. اختر شخصاً من القائمة، ثم اضغط على مربع لوضعه فيه (اسحب على الحاسوب)؛ × يزيل.",
      rk17v: "⑤ جدول المعركة: من يهاجم أو يدافع عن أي مبنى، في كل مرحلة. يمكنك قراءته ونسخه؛ التعديلات تبقى على هذا الجهاز فقط.",
      rk18: "إعداد الجدول: المراحل (مفصولة بفواصل — أعد تسميتها أو أضفها أو أزلها)، أرقام المباني وأسماؤها المقترحة، أي الأعمدة تظهر وما أسماؤها، والأسماء المختصرة (تحذف الزخارف مثل 亗 وNexus).",
      rk19: "✨ ملء مسودة أولى: المرتب #1… واحد لكل مبنى كمهاجم، التالون كمدافعين، والباقون كمنضمين، باستخدام أرقام المهاجمين / المدافعين.",
      rk20: "⚔️ مسودة قواعد أرض السيوف تملأ المراحل الـ3 كلها بقواعد التحالف: المرحلة 1 ①–④ بالمهاجمين والمدافعين حسب الرتبة، المرحلة 2 ضريح السيف / معسكر المرتزقة / القاعة، ثم البقاء في الخلف. عدّلها بعد ذلك.",
      rk21: "📥 لصق نص → جدول يقرأ منشور تعيينات مكتوباً لـDiscord (① ROYAL STABLES / * ⚔️ Attacker: …) ويحوّله إلى الجدول؛ الأسماء تُطابق مع قائمة الأعضاء. 📝 إدراج مسودة يعطيك نصاً جاهزاً لتعديله أولاً.",
      rk22: "مسح الجدول يفرغ كل مبنى (المراحل والإعداد يبقيان). ↩️ تراجع يعيده.",
      rk23: "أعداد المهاجمين / المدافعين — نفس أرقام ④.",
      rk24: "الأشخاص، مجمّعون حسب الدور المقترح من الترتيب (الأساسيون فقط). اضغط على واحد لتحديده — الشارة تعرض في كم مبنى من المرحلة 1 هو موجود أصلاً. على الهاتف، اضغط مطولاً للسحب.",
      rk25: "مبنى: # والاسم في الأعلى، ثم مربعات ⚔️ المهاجم و🛡️ المدافعين و👥 المنضمين — اضغط على مربع وشخص محدد لإضافته، × يزيل، + نص يضيف شريحة ملاحظة حرة. 📝 ملاحظة للمبنى؛ النقاط الملونة تحدد لونه في الصورة؛ 🗑 يحذفه. + مبنى يضيف واحداً إلى تلك المرحلة؛ المرحلة: ينقله إلى مرحلة أخرى.",
      rk26: "📌 التذكيرات تُضاف في أسفل الصورة والنص.",
      rk27: "🖼️ إنشاء صورة يرسم الجدول كله كصورة: احفظها، أو 📢 استخدام في إعلان جديد يرسلها مباشرة إلى تبويب المنشورات.",
      rk28: "📋 نسخ النص ينسخ الجدول كمنشور Discord — نفس الصيغة التي يقرؤها لصق نص → جدول.",
      rk29: "🎮 لدردشة اللعبة يقسّمه إلى رسالة لكل مبنى، لكل منها زر نسخ خاص، لأن دردشة اللعبة تأخذ رسالة واحدة في كل مرة.",
      rk30: "📊 تنزيل Excel يحفظ نفس الجدول كجدول بيانات.",
      at01: "📋 الخطط المشتركة من تبويب الترتيب: كل قائمة تُبنى من تحديدات خطة. التاريخ › يفتح أحدث قائمة حضور أُنشئت منها؛ إنشاء قائمة حضور يصنع قائمة جديدة (تُخزَّن عند الضغط على حفظ).",
      at01v: "📋 الخطط المشتركة من تبويب الترتيب: كل قائمة حضور تُبنى من تحديدات خطة. التاريخ › يفتح أحدث قائمة أُنشئت منها.",
      at02: "بطاقة واحدة لكل ورقة حدث (أرض السيوف، التحالفات الثلاثة…)، صف واحد لكل تاريخ: اسم القائمة ونسبة الحضور % (الأساسيون الذين حضروا ÷ الأساسيين؛ البدلاء والمعذورون لا يُحتسبون). اضغط على صف لفتحه — دعني أفتح واحداً…",
      at03: "الغيابات تتراكم عبر التواريخ: الغياب الثاني برتقالي، الثالث أحمر؛ ⭐ = أفضل 20 بالقوة. الأساسيون فقط يُحتسبون.",
      at04: "‹ كل الأوراق يعود (التغييرات غير المحفوظة تُهمل).",
      at05: "الحدث والتاريخ واسم القائمة. 🔄 تحديث من الخطة يعيد استيراد تحديدات الخطة الحالية وبدلائها، مع الاحتفاظ بالعلامات التي وضعتها.",
      at05v: "الحدث والتاريخ واسم هذه القائمة.",
      at06: "① المؤكدون: من قال نعم. اضغط على اسم لتبديل البديل (البديل الذي لا يحضر لا يُعد غياباً)؛ × يزيله.",
      at06v: "① المؤكدون: من قال نعم؛ متقطع = بديل.",
      at07: "إضافة أشخاص: ألصق الأسماء ثم مطابقة مع قائمة الأعضاء، 📷 ارفع لقطات شاشة المصوّتين (تُقرأ الأسماء لك)، أو إضافة عضو يدوياً من القائمة.",
      at08: "② بعد المعركة: اضغط على اسم للتنقل ✓ حضر → X لم يحضر → 🛌 معذور. البرتقالي (الثاني) والأحمر (الثالث) يعلّمان الغيابات المتكررة. حضر الجميع يعلّم الكل دفعة واحدة.",
      at08v: "② بعد المعركة: ✓ حضر، X لم يحضر، 🛌 معذور؛ البرتقالي والأحمر = غيابات متكررة.",
      at09: "حفظ يخزّن القائمة على الخادم لكل الضباط. نسخ لـDiscord ينسخ ملخصاً؛ حذف هذه القائمة يزيلها.",
      at09v: "نسخ لـDiscord ينسخ ملخصاً لهذه القائمة.",
      po01: "✍️ كتابة: اسمك واللغة التي تكتب بها — اكتب بلغتك أنت، والموقع يترجمها إلى اللغات الـ12 كلها.",
      po01v: "📢 المنشورات: الإعلانات تُكتب هنا وتُترجم إلى 12 لغة. تحميل القائمة يحتاج إلى حقوق التعديل — اطلب من مشرف إذا احتجت هذا التبويب.",
      po02: "العنوان والرسالة. **نص** = غامق؛ الروابط تعمل كالمعتاد.",
      po03: "🖼️ إضافة صورة يصغّر الصورة ويضع علامة [[img]] حيث يقف المؤشر؛ تُرفع عند النشر.",
      po04: "زر إلى دليل يضيف زراً تحت الإعلان يفتح أحد أدلة الموقع.",
      po05: "المظهر: عادي، أو 📜 لفافة لإطار على شكل لفافة قديمة.",
      po06: "الحذف التلقائي: متى يختفي الإعلان من تلقاء نفسه — عند انتهاء اليوم أو الغد، بعد 1 / 2 / 3 / 7 أيام، أو في تاريخ ووقت بتوقيت UTC.",
      po07: "معاينة تعرضه كما سيراه الأعضاء.",
      po08: "📢 نشر يسألك مرة واحدة، يرفع الصور ويحفظ النص. يظهر الإعلان المترجم على الموقع خلال نحو 2–3 دقائق.",
      po09: "📋 الإعلانات على الموقع، الأحدث أولاً: 🖼️ فيه صور، ⏳ لا يزال يُترجم، 🗑️ وقت الحذف التلقائي، ✏️ اللغة = مصحّحة يدوياً. تحديث يعيد قراءة القائمة.",
      po10: "تعديل يفتح إعلاناً للتغيير؛ حذف يزيله من الموقع بكل اللغات (يسألك أولاً). دعني أفتح تعديل…",
      po11: "ما الذي تغيّره: كل اللغات (يفتح الأصل في نموذج الكتابة ويترجم كل شيء من جديد)، 🖼️ إضافة صور فقط (بلا ترجمة جديدة)، أو لغة واحدة — صحّح تلك الترجمة وحدها يدوياً؛ استخدام الترجمة التلقائية من جديد يلغي التصحيح.",
      wa01: "📋 نسخ لـGoogle Sheets ينسخ الأعضاء المعروضين بالأسفل كجدول — ألصقه في الخلية A1. ⬇️ تنزيل CSV يحفظ نفس الملف.",
      wa01v: "🕵️ المراقبة تعرض كل عضو مع إشارات لأشياء تستحق النظر. النسخ / تصدير CSV للمحررين.",
      wa02: "البحث عن اسم أو ID يصفّي القائمة. عرض الأعضاء ذوي الإشارات فقط يبقي المشبوهين؛ 'جديد = انضم خلال' يحدد كم تبقى مدة اعتبار الشخص جديداً.",
      wa03: "التحالفات المراقبة: الأعضاء الذين شوهدوا فيها يحصلون على إشارة حمراء. تحالفاتنا الزراعية / الشقيقة تُستثنى من ذلك.",
      wa04: "اضغط على رأس عمود للفرز. الإشارات: تحقق من السجل، جديد، من المملكة، كان في…، شوهد في n تحالفات، نفس الاسم في… السجل ↗ يفتح اللاعب على MightPulse.",
      wa05: "✏️ يفتح الملاحظة: التحالفات والأسماء السابقة، 'تحققت من السجل'، سليم ✅ / غير سليم ⚠️، السبب، اسمك. حفظ يشاركها مع كل الضباط.",
      wa05v: "سليم ✅ / غير سليم ⚠️ والتعليقات هي ملاحظات الضباط عن ذلك العضو.",
      wa06: "غادروا NXS: من غادر، متى، وأين شوهدوا منذ ذلك الحين.",
      sc01: "اكتب رقم مملكة ثم جلب الآن: مهمة على GitHub تقرأ أفضل 20 لاعباً فيها من MightPulse (2–3 دقائق؛ الصفحة تتحدث من تلقاء نفسها).",
      sc01v: "الممالك المستطلَعة يجلبها المحررون؛ الجدول بالأسفل يعرضها.",
      sc02: "شريحة كل مملكة: 'في الترتيب' يعرض لاعبيها في الجدول بالأسفل (هذا الجهاز فقط)؛ 'تحديث يومي' يحدّثها كل يوم — حدده لخصم KvK؛ ⟳ يجلب الآن؛ ✕ يزيلها.",
      sc03: "فرز حسب و▲/▼ يرتبان الجدول؛ الضغط على رأس عمود يفعل الشيء نفسه. العمود المفروز يقع مباشرة بجانب الاسم.",
      sc04: "اللاعبون: القوة، TC، التجربة الغامضة، القتلى، VIP، قوة الفرقة المقدّرة (~ = مقدّرة) ونقاط الهجرة. الرابط يفتحهم على MightPulse.",
      vw01: "📈 مشاهدات الموقع: أعداد زوار مجهولة — بلا ملفات تعريف ارتباط، بلا أسماء. اختر 7 / 30 / 90 يوماً؛ ↻ يعيد التحميل.",
      vw02: "الزوار في اليوم — اضغط أو مرّر فوق شريط لرؤية الرقم.",
      vw03: "من أي الأدلة واللغات والدول والمواقع المُحيلة والأجهزة يأتي الناس. متصفحات الضباط لا تُحتسب.",
      pm01: "💬 هذا المفتاح يسمح للضباط للعرض فقط بالرد في موضوع ذُكروا فيه بـ@ أو أُسندت إليهم فيه مهمة.",
      pm02: "صف واحد لكل ضابط: 🟢 آخر تسجيل دخول أو ⚪ أبداً. اضغط على الاسم لتغيير طريقة عرضه. لكل تبويب اختر ✏️ تعديل أو 👁️ عرض أو — مخفي؛ يُحفظ من تلقاء نفسه ويُطبَّق فوراً.",
      pm03: "🔔 يحدد أي الأحداث يُذكَّر بها هذا الشخص في يوم استحقاق مهمة ضابط (هو يختار الساعة في ⏰). المشرفون الذين لم يختاروا شيئاً يحصلون على كل الأحداث.",
      pm04: "👁️ معاينة كـ يعرض الصفحة كلها بحقوق ذلك الضابط — إنهاء المعاينة في الأعلى يعيدك. تعيين كمشرف / إزالة المشرف وإزالة موجودة هنا أيضاً.",
      pm05: "+ إضافة ضابط: اسم ومعرّف Discord المكوّن من 18 رقماً. الضابط الجديد يبدأ بالأحداث واللوحة والخريطة 👁️ فقط. إعادة التعيين إلى الافتراضي يعود إلى المشرفين المدمجين.",
      pm06: "المزيد (مالك الموقع): نسيان كلمة المرور على هذا الجهاز، إعادة الإعداد، 🔐 مفتاح تشفير بيانات الضباط.", msgs: "💌 رسالة من Sparrow تلك", pick: "أي تبويب تريد أن أريك إياه؟", onlyView: "(يمكنك المشاهدة فقط، لا التعديل)", ro: "هنا يمكنك المشاهدة فقط دون تغيير أي شيء.",
      events: "📅 الأحداث", board: "💬 اللوحة", map: "🗺️ الخريطة", ranking: "📊 الترتيب", attend: "📋 الحضور", post: "📢 نشر", watch: "🕵️ مراقبة", scout: "🔭 استطلاع", views: "📈 الزيارات", perms: "👥 الضباط",
      },
    ko: {
      ev01: "📅 달력 띠야. 옆으로 밀어서 봐. 14일 전부터 70일 뒤까지, UTC 기준이야. 채워진 막대는 지금 진행 중인 거야. 막대의 ✅ = 이번 주에 간부가 할 일이 있다는 뜻이고, 누르면 그 할 일로 바로 이동해. 다른 막대는 아래쪽에 있는 그 이벤트 항목을 열어.",
      ev02: "👑 왕관 표시는 왕국 #2189의 마일스톤이야. 서버가 오래될수록 열리는 것들이지. 하나 눌러 보면 전체 목록이 보여.",
      ev03: "👑 마일스톤 목록이야. 앞으로 열릴 것마다 날짜와 며칠 남았는지가 나와.",
      ev04: "📣 공지 초안이야. 우리 시간으로 맞춘 다가오는 이벤트를 게임 채팅에 올릴 글인데, 바로 붙여넣을 수 있어. 열면 글이 자동으로 써져.",
      ev05: "초안이 며칠 앞까지 볼지 정하는 거야. 다음 3일, 5일, 7일 중에서. 바꾸면 글이 다시 써져.",
      ev06: "🔄 다시 만들기는 네가 고친 걸 버리고 이벤트 목록과 ⏰ 우리 이벤트 시간으로 글을 다시 만들어.",
      ev07: "어떤 이벤트를 넣을지 체크해. 들어가는 만큼 미리 체크돼 있어. 게임은 300자까지 허용하거든.",
      ev08: "초안 본문이야. 마음대로 고쳐. 300자를 넘으면 카운터가 빨개져. 여기 있는 건 저장되지 않아. 그냥 메모장이야.",
      ev09: "📋 복사를 누르면 글이 클립보드에 들어가. 그다음 게임 채팅에 붙여넣으면 돼.",
      ev10: "⚙️ 병력 제한이야. 가이드에서 언급되는 모든 곳(12개 언어 전부)과 AI 도우미가 쓰는 숫자야. 게임이나 연맹이 제한을 바꾸면 여기서 고쳐.",
      ev10v: "⚙️ 병력 제한이야. 가이드와 AI 도우미가 쓰는 숫자야. 편집자가 여기서 바꿔.",
      ev11: "곰 사냥, 집결 참가 시 정확한 병력 수야.",
      ev12: "다른 집결과 바이킹 본부, 멤버당 최대치야.",
      ev13: "💾 저장을 누르면 두 숫자가 사이트에 기록돼. 가이드에는 몇 분 안에 새 숫자가 보여.",
      ev14: "⏰ 우리 이벤트 시간(UTC)이야. 연맹 이벤트에 우리가 고른 시간과, 이벤트 며칠째에 전투가 있는지야. 홈 화면의 이번 주와 모두의 ⏰ 게임 알림이 이걸 따라가.",
      ev14v: "⏰ 우리 이벤트 시간(UTC)이야. 연맹 이벤트에 우리가 고른 시간이야. 홈 화면과 모두의 ⏰ 게임 알림이 이걸 따라가. 편집자가 여기서 바꿔.",
      ev15: "이벤트마다 한 줄이야. 시간을 하나 이상 적어, 예를 들면 13:00, 22:00. 전투일 = 이벤트 며칠째에 싸우는지. 22:00@1, 13:00@3처럼 쓰면 시간마다 다른 날로 정할 수 있어. 곰 사냥은 대신 다음 곰 날이 있어. 게임에서 곰 날이 옮겨지면 여기서 바꿔. 그럼 사이트 전체가 따라가.",
      ev16: "💾 저장은 시간(HH:MM)을 확인하고 사이트에 기록해. 알림은 몇 분 안에 새 시간을 써.",
      ev17: "✅ 할 일 항목이야. 간부가 꼭 해야 하는 일을 이번 주 진행 중인 이벤트마다 카드 하나로 보여줘. 이번 주 / 다음 주로 월~일(UTC) 주를 바꿔.",
      ev18: "카드마다 할 일과 마감일 ⏰이 적혀 있고, '기한 초과'는 빨간색이야. 끝낸 일은 체크해. 체크는 이 기기에만 저장돼.",
      ev19: "✏️ 항목 편집은 이벤트 편집기를 할 일 항목 부분에서 바로 열어 줘. 목록 내용을 바꿀 수 있어.",
      ev20: "📣 게임 글은 이벤트 하나짜리 알림을 위쪽 공지 초안에 써 줘. 바로 복사하면 돼.",
      ev21: "나머지 버튼은 그 일을 하는 곳으로 이동해. 📢 공지 작성(게시 탭), 📊 랭킹 열기, 📖 사이트의 가이드, 📋 이 이벤트의 게임 내 가이드.",
      ev22: "⏱️ 시간 지정 관리자 알림이야. 한 번만 울리는 시간, 예를 들면 성소 전투 시작 같은 거. 10분 전에 그 이벤트를 🔔에 포함한 모두에게 푸시 알림이 가. 시간은 UTC야.",
      ev23: "추가하려면 이벤트를 고르고, 무슨 일인지, 날짜와 시각을 적은 다음 + 추가를 눌러. 삭제는 줄을 지워. 💾 저장을 누르기 전까지는 목록에만 있어.",
      ev24: "💾 저장은 시간 지정 알림을 모든 간부용으로 사이트에 기록해.",
      ev25: "📋 이벤트 & 게임 내 가이드야. + 새 이벤트는 완전히 새 이벤트용 편집기를 열어.",
      ev25v: "📋 이벤트 & 게임 내 가이드야. 모든 이벤트의 일정과 게임에서 보낼 메시지가 있어.",
      ev26: "이벤트마다 항목 하나야. 누르면 게임 내 가이드가 열려. 상자 하나가 채팅 메시지 하나야(게임에 메시지 길이 제한이 있어서). 하나씩 복사해서 보내.",
      ev27: "📋 복사는 그 메시지 하나만 복사해.",
      ev28: "메시지 옆의 ✏️는 그 메시지만 그 자리에서 고쳐.",
      ev29: "아래쪽 ✏️ 편집은 이벤트 전체를 바꿔. 날짜, 할 일 항목, 메시지 추가나 삭제. 바뀐 건 모든 간부용으로 사이트에 저장돼. 내가 열어 볼게…",
      ev30: "이벤트 이름과 이모지야. 이름은 네가 쓰고 있는 언어로 편집돼.",
      ev31: "정해진 일정으로 반복돼. 체크하고 첫날(UTC), 반복 간격(일), 며칠 동안 이어지는지를 적어. 📅는 날짜 선택기를 열어.",
      ev32: "메모야. 목록에 표시돼, 예를 들면 시간 같은 거.",
      ev33: "사이트의 가이드야. 이벤트를 공개 가이드 중 하나에 연결해(📖 버튼).",
      ev34: "간부용 할 일 항목이야. 줄마다 할 일 하나인데 '시작 며칠 전(−) 또는 후', 선택 사항인 '까지' 시각, 그리고 내용이 있어. 상자 두 개는 그 할 일에 📢 공지 버튼이나 📊 랭킹 버튼을 붙여. + 할 일 항목은 줄을 추가하고, ✕는 지워.",
      ev35: "게임 내 가이드야. 상자 하나 = 채팅 메시지 하나, 제목이 붙어. + 메시지는 하나 추가하고, ✕는 지워.",
      ev36: "이벤트 삭제는 모두에게서 지워(먼저 물어봐).",
      ev37: "💾 저장은 이벤트를 모든 간부용으로 사이트에 기록해. 취소는 저장 없이 닫아.",
      bd01: "💬 게시판은 같이 계획 세우는 곳이야. 모든 메시지가 中文, English, Português, العربية, 한국어로 번역돼. ↻는 새로고침이야.",
      bd02: "📋 네 할 일이야. 너한테 배정됐거나 네가 @로 언급된 것들. 하나 누르면 그 글로 이동해.",
      bd03: "+ 새 주제는 토론을 시작해. 내가 폼을 열어 볼게…",
      bd03v: "보기 전용 간부도 모든 주제를 읽을 수 있어. 글을 쓰려면 편집 권한이 필요해. 아니면 @로 언급되거나 배정된 경우, 관리자가 그런 답글을 허용했다면 가능해.",
      bd04: "주제 제목(무슨 얘기인지)과 네 메시지야. 초안은 보낼 때까지 이 기기에 남아 있어.",
      bd05: "@는 멘션을 넣어. 간부 한 명이나 @all을 골라. 그 사람들한테는 주제에 📣 태그가 보여.",
      bd06: "📋 배정은 메시지를 네가 고른 사람들의 할 일로 바꿔. 그 사람들한테 ✅ 완료 버튼이 생겨.",
      bd07: "🖼️는 사진을 첨부해(최대 4장, 붙여넣기도 돼). [[img]] 표시가 글 속 어디에 들어가는지 보여줘.",
      bd08: "게시를 누르면 보내져. 요청 한 번에 5개 언어로 번역되니까 쪼개지 말고 한 번에 다 써. 취소는 폼을 숨기고 초안은 남겨.",
      bd09: "주제 목록이야, 최근 활동 순. 누가 시작했는지, 메시지 몇 개인지, 마지막 업데이트. 빨간 점 = 네가 마지막으로 연 뒤에 바뀜, 📌 결정됨 = 결정이 고정됨. 누르면 열려. 내가 하나 열어 볼게…",
      bd10: "← 모든 주제는 목록으로 돌아가.",
      bd11: "카드 하나가 메시지 하나야, 네 언어로. 원문 보기는 실제로 쓴 글을 보여줘. 사진은 누르면 전체 화면으로 열려.",
      bd12: "📌 결정으로 설정은 이 메시지를 결과로서 주제 맨 위에 고정해. 결정 해제는 고정을 풀어.",
      bd13: "✏️ 편집과 🗑️ 삭제는 네 메시지에만 보여. 삭제는 두 번 물어봐. 첫 메시지를 지우면 주제 전체가 지워져.",
      bd14: "✅ 완료야. 메시지가 네 할 일이면 여기서 완료 표시해(↩︎ 미완료로 되돌려).",
      bd15: "답글 상자야. 같은 @, 📋 배정, 🖼️ 도구가 있어. 답글을 누르면 보내져.",
      bd15v: "답글을 쓰려면 편집 권한이 필요해. 여기서 @로 언급되거나 배정됐고 관리자가 허용했다면 예외야.",
      mp01: "레이어야. 전체, 📋 계획만(계획 상태가 있는 전초기지만), 🛰️ 영토(간부들의 스크린샷을 이어 붙인 거야. 같은 색 = 같은 연맹), 그다음 건물 종류별 칩 하나씩. 종류를 처음 누르면 그 종류만 보이고, 더 누르면 켜고 꺼져.",
      mp02: "+와 −는 확대/축소야(핀치나 마우스 휠도 돼). 드래그해서 움직여.",
      mp03: "지도야. 아무 마커나 눌러서 선택해. 👑 왕의 성, 🛡️ 우리 본부, ◆ 요새, ● 성소, 색 네모 = 전초기지(숫자 = 레벨). 고리가 계획을 보여줘. 초록 ✅ 보호 중, 빨강 ⚔️ 취약, 노란 점선 🎯 목표. 그 Sparrow의 고백 하나. 지도를 자주 안 열어서 가끔씩만 업데이트돼 🐦 내가 하나 선택해 볼게…",
      mp04: "선택한 것의 정보 상자야. 이름, 레벨과 버프, 누가 다툴 수 있는지, X/Y 좌표. 복사를 누르면 클립보드에 들어가.",
      mp05: "상태 버튼이야. 🎯 목표, ✅ 우리 것 · 보호 중, ⚔️ 우리 것 · 취약, ✕ 지우기. 메모리 안의 계획만 바뀌니까 끝나면 💾 계획 저장을 눌러.",
      mp05v: "편집자가 여기서 상태를 표시해(🎯 목표, ✅ 보호 중, ⚔️ 취약). 결과는 아래 계획에서 볼 수 있어.",
      mp06: "⏱ 타이머야. 보호 중이나 취약으로 표시한 뒤, 게임에 보이는 카운트다운(일 시 분)을 적고 타이머 설정을 눌러. 그러면 페이지가 알아서 보호 중 ⇄ 취약을 바꿔. 타이머 제거는 지워.",
      mp06v: "⏱ 다음 보호 중 ⇄ 취약 전환까지의 카운트다운이야. 편집자가 타이머를 설정했을 때 보여.",
      mp07: "⭐ 성소 & 요새 우선순위야. 지도에서 요새나 성소를 선택하고 번호를 골라(1 = 최고), 보상과 메모도 같이. 이 목록은 순서대로 보여줘. 줄을 누르면 선택돼.",
      mp07v: "⭐ 성소 & 요새 우선순위야. 편집자가 정한 순위(1 = 최고)와 보상, 메모야. 줄을 누르면 선택돼.",
      mp08: "📋 전초기지 계획이야. 버프 표는 현재(게임과 같이, 보호 중만)와 목표 포함, 그다음 🎯 목표, ✅ 보호 중, ⚔️ 취약, ⚠️ 버프 충돌 목록이 각각의 카운트다운과 같이 나와. 칩을 누르면 그 건물이 선택돼.",
      mp09: "주기야. 전초기지가 보호 중으로 몇 시간, 그다음 취약으로 몇 시간 있는지(기본 72시간 / 24시간). 타이머가 이걸 따라가.",
      mp09v: "주기야. 전초기지가 보호 중, 그다음 취약으로 있는 시간이야. 편집자가 정하고 타이머가 따라가.",
      mp10: "💾 계획 저장은 전부(상태, 타이머, 우선순위, 깃발)를 모든 간부용으로 사이트에 기록해. 마지막 저장자에 네 이름이 들어가. 변경 취소는 마지막으로 저장된 버전으로 되돌려.",
      mp11: "🏛️ 성소 전투 설명이야. 페이즈마다 신청이 어떻게 쌓이는지, 예시 전략 두 개와 같이.",
      mp12: "🚩 깃발 계획이야. 연맹 깃발 하나는 7×7 타일을 차지하고, 본부와 이미 이어진 영토에 닿아야 해서 깃발이 하나씩 이어져. 파란 타일 = 새 영토, 빨강 = 이미 다른 연맹 것. 진한 깃발은 게임에서 확인한 거고, 연한 건 스크린샷에서 읽은 거라 타일 한두 칸 어긋날 수 있어.",
      mp13: "🚩 지도 눌러 배치야. 켜고, 확대해서 타일을 누르면 계획 깃발이 놓여. 아니면 X / Y를 적고 + 추가.",
      mp14: "레이어 버튼이야. ⛰️ 장애물 / 건설 불가, 🏳️ 우리 깃발, 🏴 다른 연맹.",
      mp15: "지도를 누르면 놓이는 것. 우리 계획 깃발, 또는 게임에서 본 다른 연맹의 🏴 깃발 / 🏯 본부.",
      mp16: "계획 깃발 목록이야, 순서대로(타일은 목록 순서로 차지해). X/Y 수정, 좌표 복사, ↑ 위로, 제거. 지도의 깃발을 누르면 ✅ 건설됨이나 🗑️ 철거됨으로 표시할 수 있어. 그다음 💾 계획 저장.",
      mp16v: "계획 깃발 목록이야, 순서대로. 복사는 좌표를 줘. 편집자가 추가하고 옮겨.",
      mp17: "📍 MightPulse의 도시 지도야. 왕국의 모든 도시와 연맹, 보호막. 여기서 보거나 새 탭에서 열어. 위치는 마지막 스캔 기준이라 몇 주 전 것일 수 있어.",
      mp18: "🎁 요새 & 성소 보상이야. 페이즈마다 뭘 주는지, 권장 전투력, 어떤 건물이 어떤 성소 보상을 주는지.",
      mp19: "종류와 레벨별 건물 목록이야. 칩을 누르면 지도에서 그 건물이 선택돼. 마커를 누르는 거랑 같아.",
      rk01: "📋 계획이야. 🔒 이 기기에서만은 체크와 표를 이 브라우저에만 둬. 🔄 공유 계획은 모든 간부에게 같아. 체크, 가중치, 그룹 인원, 전투 표가 몇 초 안에 동기화되고, 출석 탭이 날짜별 목록을 여기서 만들어.",
      rk02: "↩️ 실행 취소는 최근 변경(체크, 가중치, 표)을 하나씩 되돌려. 공유 계획에선 실행 취소도 공유돼.",
      rk03: "+ 새 공유 계획이야. 이름을 정하고(예: Legion 1) 지금 체크된 사람들로 시작할지 골라. 이름 변경과 삭제는 열려 있는 계획에 적용돼. 🕘 버전은 계획을 이전 저장 시점 아무 데로나 되돌려.",
      rk03v: "공유 계획은 편집자가 만들어. 여기서 열어서 같이 볼 수 있어.",
      rk04: "✏️ 편집 가능한 사람이야. 모든 간부, 또는 만든 사람이 고른 사람만(만든 사람과 관리자는 항상 가능).",
      rk05: "① 랭킹 방식이야. 부대 전투력 맞춤(소드랜드 군단 화면에 보이는 부대 전투력, 이주 점수로 추정) 또는 가중치, 스탯을 체크하고 각각 가중치를 주는 방식. 메모에 공식이 설명돼 있어.",
      rk06: "가중치야. 계산에 넣을 스탯을 체크하고 각각 퍼센트를 줘. 합이 100일 필요는 없어.",
      rk07: "② 이 이벤트 참가자를 체크해. 모두 선택은 명단 전체를 체크하고, 지우기는 비워.",
      rk08: "신청 목록 붙여넣기야. 한 줄에 이름 하나나 쉼표로 구분, 장식은 상관없어. 이 플레이어 체크는 명단과 맞춰서 체크해. 못 찾은 이름은 따로 보여줘.",
      rk09: "이름 검색은 표를 걸러. 체크된 것만은 체크된 사람만 보여줘.",
      rk10: "명단이야. 왼쪽 상자 = 주전(순위 매김), 오른쪽 상자 = 후보(후보로 표시, 순위 없음, 출석에서 후보로 가져옴). 줄 아무 데나 누르면 체크돼. 랭크 줄은 그 랭크 전체를 체크하고, 열 머리글을 누르면 정렬돼.",
      rk11: "③ 랭킹이야. 상위 N명 표시는 목록을 제한해. 비우면 전원.",
      rk12: "결과 복사는 랭킹을 텍스트로 복사해. 1. 이름 (ID) — 점수, 후보는 (후보) 표시.",
      rk13: "점수와 그 근거 스탯이 있는 순위 목록이야. ~ = 이주 점수 없음, 대체 공식으로 추정.",
      rk14: "④ 이벤트 그룹이야. ⚔️ 소드랜드 결전을 누르면 랭킹이 공격자, 수비자, 참가자로 나뉘어.",
      rk15: "공격자 / 수비자야. 각각 몇 명인지, 랭킹 위에서부터 뽑아. 나머지는 전부 참가자야. 같은 숫자가 ⑤를 움직여.",
      rk16: "결과 복사는 그룹을 Discord 글로 복사해. 작은 지도는 소드랜드 지도를 열어.",
      rk17: "⑤ 전투 표야. 페이즈마다 누가 어떤 건물을 공격하거나 수비하는지. 목록에서 사람을 고르고 상자를 눌러 넣어(컴퓨터에선 드래그). ×는 빼.",
      rk17v: "⑤ 전투 표야. 페이즈마다 누가 어떤 건물을 공격하거나 수비하는지. 읽고 복사할 수 있어. 편집은 이 기기에만 남아.",
      rk18: "표 설정이야. 페이즈(쉼표 구분, 이름 변경·추가·삭제 가능), 추천으로 뜨는 건물 번호와 이름, 어떤 열을 어떤 이름으로 보여줄지, 그리고 짧은 이름(亗나 Nexus 같은 장식을 뺌).",
      rk19: "✨ 첫 초안 채우기야. 랭킹 #1부터… 건물마다 한 명씩 공격자로, 그다음 사람들은 수비자로, 나머지는 참가자로. 공격자 / 수비자 숫자를 써.",
      rk20: "⚔️ 소드랜드 규칙 초안은 연맹 규칙대로 3개 페이즈를 다 채워. 페이즈 1은 ①~④에 순위대로 공격자와 수비자, 페이즈 2는 검의 신전 / 용병 캠프 / 홀, 그다음 잔류. 그 뒤에 고쳐.",
      rk21: "📥 텍스트 붙여넣기 → 표는 Discord용으로 쓴 배정 글(① ROYAL STABLES / * ⚔️ Attacker: …)을 읽어서 표로 바꿔. 이름은 명단과 맞춰. 📝 초안 삽입은 먼저 고칠 수 있는 준비된 텍스트를 줘.",
      rk22: "표 지우기는 모든 건물을 비워(페이즈와 설정은 남아). ↩️ 실행 취소로 되돌려.",
      rk23: "공격자 / 수비자 인원이야. ④와 같은 숫자야.",
      rk24: "사람들이야. 랭킹에서 추천한 역할별로 묶여 있어(주전만). 하나 누르면 선택돼. 배지는 그 사람이 페이즈 1 건물 몇 개에 이미 들어가 있는지 보여줘. 폰에서는 길게 눌러서 드래그해.",
      rk25: "건물이야. 위에 #과 이름, 그 아래 ⚔️ 공격자, 🛡️ 수비자, 👥 참가자 상자. 사람을 선택한 채 상자를 누르면 들어가고, ×는 빼고, + 텍스트는 자유 메모 칩을 추가해. 📝 메모는 건물용이고, 색 점은 그림에서의 색을 정해. 🗑는 삭제해. + 건물은 그 페이즈에 하나 추가하고, 페이즈:는 다른 페이즈로 옮겨.",
      rk26: "📌 알림은 그림과 텍스트 맨 아래에 붙어.",
      rk27: "🖼️ 이미지 만들기는 표 전체를 그림으로 그려. 저장하거나, 📢 새 공지에 사용으로 게시 탭에 바로 보내.",
      rk28: "📋 텍스트 복사는 표를 Discord 글로 복사해. 텍스트 붙여넣기 → 표가 다시 읽는 것과 같은 형식이야.",
      rk29: "🎮 게임 채팅용은 건물마다 메시지 하나로 나눠 주고, 각각 복사 버튼이 있어. 게임 채팅은 한 번에 메시지 하나만 받거든.",
      rk30: "📊 Excel 다운로드는 같은 표를 스프레드시트로 저장해.",
      at01: "📋 랭킹 탭의 공유 계획이야. 목록마다 계획의 체크로 만들어져. 날짜 ›는 그 계획으로 만든 가장 최근 출석 목록을 열고, 출석 목록 만들기는 새로 만들어(저장을 누르면 저장돼).",
      at01v: "📋 랭킹 탭의 공유 계획이야. 출석 목록마다 계획의 체크로 만들어져. 날짜 ›는 그 계획으로 만든 가장 최근 목록을 열어.",
      at02: "이벤트 시트(소드랜드, 삼국 연맹전…)마다 카드 하나, 날짜마다 줄 하나야. 목록 이름과 출석률 %(나온 주전 ÷ 주전, 후보와 사유 결석은 안 셈). 줄을 누르면 열려. 내가 하나 열어 볼게…",
      at03: "불참은 날짜를 넘어 누적돼. 2번째 불참은 주황, 3번째는 빨강. ⭐ = 전투력 상위 20. 주전만 셈.",
      at04: "‹ 모든 시트는 돌아가(저장 안 한 변경은 버려져).",
      at05: "이벤트, 날짜, 목록 이름이야. 🔄 계획에서 업데이트는 계획의 현재 체크와 후보를 다시 가져오고, 네가 한 표시는 남겨.",
      at05v: "이 목록의 이벤트, 날짜, 이름이야.",
      at06: "① 확정이야. 온다고 한 사람들. 이름을 누르면 후보로 바뀌어(안 나온 후보는 불참이 아냐). ×는 빼.",
      at06v: "① 확정이야. 온다고 한 사람들. 점선 = 후보.",
      at07: "사람 추가야. 이름을 붙여넣고 명단 맞추기, 📷 투표 스크린샷 업로드(이름을 대신 읽어 줘), 또는 목록에서 멤버 추가로 직접.",
      at08: "② 전투 후야. 이름을 누르면 ✓ 출석 → X 불참 → 🛌 사유 결석 순으로 바뀌어. 주황(2번째)과 빨강(3번째)은 반복 불참 표시야. 모두 출석은 한 번에 전원 표시해.",
      at08v: "② 전투 후야. ✓ 출석, X 불참, 🛌 사유 결석. 주황과 빨강 = 반복 불참.",
      at09: "저장은 목록을 모든 간부용으로 서버에 저장해. Discord용 복사는 요약을 복사하고, 이 목록 삭제는 지워.",
      at09v: "Discord용 복사는 이 목록의 요약을 복사해.",
      po01: "✍️ 작성이야. 네 이름과 쓰는 언어. 네 언어로 쓰면 사이트가 12개 언어로 다 번역해.",
      po01v: "📢 게시야. 공지를 여기서 쓰고 12개 언어로 번역해. 목록을 불러오려면 편집 권한이 필요해. 이 탭이 필요하면 관리자한테 말해.",
      po02: "제목과 메시지야. **텍스트** = 굵게, 링크는 그냥 돼.",
      po03: "🖼️ 사진 추가는 사진을 줄여서 커서 위치에 [[img]] 표시를 넣어. 게시할 때 업로드돼.",
      po04: "가이드 버튼은 공지 아래에 사이트 가이드 중 하나를 여는 버튼을 붙여.",
      po05: "모양이야. 기본, 또는 📜 두루마리로 옛 두루마리 테두리.",
      po06: "자동 삭제야. 공지가 언제 알아서 사라질지. 오늘이나 내일이 끝날 때, 1 / 2 / 3 / 7일 뒤, 또는 UTC 날짜와 시간.",
      po07: "미리보기는 멤버들이 보는 모습 그대로 보여줘.",
      po08: "📢 게시는 한 번 물어본 뒤 사진을 올리고 글을 저장해. 번역된 공지는 2~3분쯤 뒤에 사이트에 보여.",
      po09: "📋 사이트의 공지야, 최신순. 🖼️ 사진 있음, ⏳ 아직 번역 중, 🗑️ 자동 삭제 시간, ✏️ 언어 = 직접 고침. 새로고침은 목록을 다시 읽어.",
      po10: "편집은 공지를 열어서 고치게 해. 삭제는 모든 언어에서 사이트에서 지워(먼저 물어봐). 내가 편집을 열어 볼게…",
      po11: "뭘 바꿀지야. 모든 언어(원문을 작성 폼에 열고 전부 다시 번역), 🖼️ 사진만 추가(새 번역 없음), 또는 언어 하나, 그 번역만 직접 고치기. 자동 번역 다시 사용은 고친 걸 되돌려.",
      wa01: "📋 Google Sheets용 복사는 아래 멤버들을 표로 복사해. A1 셀에 붙여넣어. ⬇️ CSV 다운로드는 같은 파일을 저장해.",
      wa01v: "🕵️ 감시는 모든 멤버를 살펴볼 만한 것에 대한 플래그와 같이 보여줘. 복사 / CSV 내보내기는 편집자용이야.",
      wa02: "이름이나 ID 검색은 목록을 걸러. 플래그 있는 멤버만은 수상한 사람만 남겨. '신규 = 가입한 지'는 얼마 동안 신규로 치는지 정해.",
      wa03: "감시 연맹이야. 여기서 보인 멤버는 빨간 플래그가 붙어. 우리 농장 / 자매 연맹은 거기서 제외돼.",
      wa04: "열 머리글을 누르면 정렬돼. 플래그는 기록 확인, 신규, 출신 왕국, 이전 소속…, n개 연맹에서 보임, 같은 이름이…에. 기록 ↗은 MightPulse에서 그 플레이어를 열어.",
      wa05: "✏️는 메모를 열어. 이전 연맹과 이름, '기록을 확인했음', 이상 없음 ✅ / 의심됨 ⚠️, 이유, 네 이름. 저장하면 모든 간부와 공유돼.",
      wa05v: "이상 없음 ✅ / 의심됨 ⚠️과 코멘트는 그 멤버에 대한 간부들의 메모야.",
      wa06: "NXS 탈퇴야. 누가 언제 나갔고, 그 뒤 어디서 보였는지.",
      sc01: "왕국 번호를 적고 지금 가져오기를 눌러. GitHub 작업이 MightPulse에서 그 왕국의 상위 20명을 읽어 와(2~3분, 페이지가 알아서 새로고침돼).",
      sc01v: "정찰 왕국은 편집자가 가져와. 아래 표에 보여.",
      sc02: "왕국 칩마다. '랭킹에 표시'는 그 플레이어들을 아래 표에 보여줘(이 기기만). '매일 업데이트'는 매일 새로 가져와. KvK 상대한테 체크해. ⟳는 지금 가져오고, ✕는 빼.",
      sc03: "정렬 기준과 ▲/▼로 표를 정렬해. 열 머리글을 눌러도 같아. 정렬된 열은 이름 바로 옆에 와.",
      sc04: "플레이어들이야. 전투력, TC, 신비한 시련, 킬, VIP, 추정 부대 전투력(~ = 추정), 이주 점수. 링크는 MightPulse에서 그 사람을 열어.",
      vw01: "📈 사이트 조회수야. 익명 방문자 수, 쿠키도 이름도 없어. 7 / 30 / 90일을 골라. ↻는 새로고침이야.",
      vw02: "일별 방문자야. 막대를 누르거나 올리면 숫자가 보여.",
      vw03: "사람들이 어떤 가이드, 언어, 국가, 유입 경로, 기기에서 오는지야. 간부들의 브라우저는 안 셈.",
      pm01: "💬 이 스위치는 보기 전용 간부가 @로 언급되거나 배정된 주제에서 답글을 쓸 수 있게 해.",
      pm02: "간부마다 줄 하나야. 🟢 마지막 로그인 또는 ⚪ 없음. 이름을 누르면 표시 방식을 바꿔. 탭마다 ✏️ 편집, 👁️ 보기, — 숨김을 골라. 알아서 저장되고 바로 적용돼.",
      pm03: "🔔은 간부 할 일 마감일에 이 사람에게 어떤 이벤트를 알릴지 골라(시각은 본인이 ⏰에서 골라). 아무것도 고르지 않은 관리자는 모든 이벤트를 받아.",
      pm04: "👁️ 이 간부로 미리보기는 그 간부의 권한으로 페이지 전체를 보여줘. 맨 위의 미리보기 종료로 돌아와. 관리자 지정 / 관리자 해제와 제거도 여기 있어.",
      pm05: "+ 간부 추가야. 이름과 18자리 Discord ID. 새 간부는 이벤트, 게시판, 지도 👁️만으로 시작해. 기본값으로 재설정은 내장 관리자로 되돌려.",
      pm06: "더 보기(사이트 소유자)야. 이 기기의 비밀번호 잊기, 설정 다시 하기, 🔐 간부 데이터 암호화 키.", msgs: "💌 그 Sparrow의 메시지", pick: "어느 탭을 보여줄까요?", onlyView: "(보기만 가능, 수정 불가)", ro: "여기는 보기만 할 수 있고 바꿀 수는 없어요.",
      events: "📅 이벤트", board: "💬 게시판", map: "🗺️ 지도", ranking: "📊 랭킹", attend: "📋 출석", post: "📢 공지", watch: "🕵️ 감시", scout: "🔭 정찰", views: "📈 조회", perms: "👥 간부",
      },
  };
  const ot = (k) => (OT[lang()] || OT.en)[k] || OT.en[k];
  /* 🗺️ the officer tours, one step per button / control. s = selector, k = text key (a "…v" twin is the view-only wording),
     e = editor-only (view-only officers skip it unless a "…v" twin exists), pre = something to do first (open a sheet, select an outpost…).
     A step whose element isn't on screen is skipped quietly, so the tour fits whatever the page is showing. */
  const Q = (sel) => document.querySelector(sel);
  const clickQ = (sel) => { const el = Q(sel); if (el) el.click(); };
  const OTOURS = {
    events: [
      { s: "#cal", k: "ev01" }, { s: "#cal .ev.ms", k: "ev02" }, { s: "#msList", k: "ev03", pre: () => { const d = Q("#msList"); if (d) d.open = true; } },
      { s: "#anCard > summary", k: "ev04", pre: () => { const d = Q("#anCard"); if (d && !d.open) d.open = true; } }, { s: "#anDays", k: "ev05" }, { s: "#anGen", k: "ev06" }, { s: "#anPick", k: "ev07" }, { s: "#anText", k: "ev08" }, { s: "#anCopy", k: "ev09" },
      { s: "#limCard > summary", k: "ev10", e: 1, pre: () => { const d = Q("#limCard"); if (d) d.open = true; } }, { s: "#limBear", k: "ev11", e: 1 }, { s: "#limRally", k: "ev12", e: 1 }, { s: "#limSave", k: "ev13", e: 1 },
      { s: "#etCard > summary", k: "ev14", e: 1, pre: () => { const d = Q("#etCard"); if (d) d.open = true; } }, { s: "#etGrid", k: "ev15", e: 1 }, { s: "#etSave", k: "ev16", e: 1 },
      { s: "#thisW", k: "ev17" }, { s: "#todos .todo", k: "ev18" }, { s: "#todos .todo [data-edtodo]", k: "ev19", e: 1 }, { s: "#todos .todo [data-anone]", k: "ev20" }, { s: "#todos .todo .acts a, #todos .todo [data-open]", k: "ev21" },
      { s: "#ev_timed", k: "ev22" }, { s: "#td_add", k: "ev23", e: 1 }, { s: "#td_save", k: "ev24", e: 1 },
      { s: "#addEv", k: "ev25", e: 1 }, { s: "#evList details.evrow", k: "ev26", pre: () => { const d = Q("#evList details.evrow"); if (d) d.open = true; } },
      { s: "#evList details.evrow[open] [data-copy]", k: "ev27" }, { s: "#evList details.evrow[open] [data-igedit]", k: "ev28", e: 1 }, { s: "#evList details.evrow[open] [data-edit]", k: "ev29", e: 1 },
      { s: "#edName", k: "ev30", e: 1, pre: () => clickQ("#evList details.evrow[open] [data-edit]") }, { s: "#edFixed", k: "ev31", e: 1 }, { s: "#edNote", k: "ev32", e: 1 }, { s: "#edGuide", k: "ev33", e: 1 },
      { s: "#edTodos", k: "ev34", e: 1 }, { s: "#edIgs", k: "ev35", e: 1 }, { s: "#edDel", k: "ev36", e: 1 }, { s: "#edSave", k: "ev37", e: 1 },
    ],
    board: [
      { s: "#bd_reload", k: "bd01" }, { s: "#bd_tasks", k: "bd02" }, { s: "#bd_newBtn", k: "bd03", e: 1 },
      { s: "#bd_newTitle", k: "bd04", e: 1, pre: () => { if (Q("#bd_newForm") && Q("#bd_newForm").hidden) clickQ("#bd_newBtn"); } }, { s: "#bd_newForm [data-at]", k: "bd05", e: 1 }, { s: "#bd_newForm [data-assign]", k: "bd06", e: 1 }, { s: "#bd_newForm [data-img]", k: "bd07", e: 1 }, { s: "#bd_newPost", k: "bd08", e: 1 },
      { s: "#bd_list .bd-topic", k: "bd09", pre: () => clickQ("#bd_newCancel") },
      { s: "#bd_back", k: "bd10", pre: () => clickQ("#bd_list .bd-topic") }, { s: "#bd_posts .bd-post", k: "bd11" }, { s: "#bd_posts [data-dec]", k: "bd12", e: 1 }, { s: "#bd_posts [data-edit]", k: "bd13", e: 1 }, { s: "#bd_posts [data-done]", k: "bd14" }, { s: "#bd_replyText", k: "bd15", e: 1 },
    ],
    map: [
      { s: "#km_layers", k: "mp01" }, { s: "#km_in", k: "mp02" }, { s: "#km_box", k: "mp03" },
      { s: "#km_info", k: "mp04", pre: () => clickQ("#km_cards .km-c .chip") }, { s: "#km_info .km-st", k: "mp05", e: 1 }, { s: "#km_info .km-tm", k: "mp06", e: 1 },
      { s: "#km_cards .km-prc", k: "mp07", e: 1 }, { s: "#km_plan", k: "mp08" }, { s: "#km_plan .pl-cyc", k: "mp09", e: 1 }, { s: "#km_plan .pl-save, #pl_save", k: "mp10", e: 1 }, { s: "#km_sb", k: "mp11" },
      { s: "#km_flags", k: "mp12" }, { s: "#fl_mode", k: "mp13", e: 1 }, { s: "#fl_obst", k: "mp14" }, { s: "#fl_kind", k: "mp15", e: 1 }, { s: "#km_flags .km-fl-list", k: "mp16", e: 1 },
      { s: "#km_mp", k: "mp17" }, { s: "#km_cards .km-rw", k: "mp18" }, { s: "#km_cards .km-c", k: "mp19" },
    ],
    ranking: [
      { s: "#planSel", k: "rk01" }, { s: "#planUndo", k: "rk02" }, { s: "#planNew", k: "rk03", e: 1 }, { s: "#planEd", k: "rk04", e: 1 },
      { s: "#rk_mode", k: "rk05" }, { s: "#rk_wRow", k: "rk06" }, { s: "#allBtn", k: "rk07" }, { s: "#pasteBox", k: "rk08" }, { s: "#rk_q", k: "rk09" }, { s: "#rk_list", k: "rk10" },
      { s: "#rk_topN", k: "rk11" }, { s: "#rk_copyBtn", k: "rk12" }, { s: "#result", k: "rk13" },
      { s: "#presetBtns [data-p]", k: "rk14", e: 1 }, { s: "#presetCounts", k: "rk15", e: 1, pre: () => { const b = Q("#presetBtns [data-p]"); if (b && !b.classList.contains("on")) b.click(); } }, { s: "#presetCopy", k: "rk16", e: 1 },
      { s: "#tbCard h2", k: "rk17" }, { s: "#tbCard details.tb-setup > summary", k: "rk18", e: 1 }, { s: "#tbCard [data-act=draft]", k: "rk19", e: 1 }, { s: "#tbCard [data-act=ssDraft]", k: "rk20", e: 1 }, { s: "#tbCard [data-act=import]", k: "rk21", e: 1 }, { s: "#tbCard [data-act=clear]", k: "rk22", e: 1 },
      { s: "#tbCard .tb-counts", k: "rk23", e: 1 }, { s: "#tbCard .tb-pool", k: "rk24" }, { s: "#tbCard .tb-group", k: "rk25" }, { s: "#tbCard [data-set=rem]", k: "rk26", e: 1 },
      { s: "#tbCard [data-act=image]", k: "rk27" }, { s: "#tbCard [data-act=text]", k: "rk28" }, { s: "#tbCard [data-act=game]", k: "rk29" }, { s: "#tbCard [data-act=xlsx]", k: "rk30" },
    ],
    attend: [
      { s: "#at_list .card", k: "at01", e: 1 }, { s: "#at_list .at-sheet", k: "at02" }, { s: "#at_list .at-sheet table.at-sum ~ table.at-sum", k: "at03" },
      { s: "#at_back", k: "at04", pre: () => clickQ("#at_list .at-ev, #at_list .at-open, #at_list .at-make") }, { s: "#at_evSheet", k: "at05", e: 1 }, { s: "#at_edit_body .chips", k: "at06", e: 1 }, { s: "#at_match", k: "at07", e: 1 }, { s: "#at_edit_body .at-plist", k: "at08", e: 1 }, { s: "#at_save, #at_copy", k: "at09", e: 1 },
    ],
    post: [
      { s: "#author", k: "po01", e: 1 }, { s: "#annTitle", k: "po02", e: 1 }, { s: "label[for=imgPick]", k: "po03", e: 1 }, { s: "#guide", k: "po04", e: 1 }, { s: "#annStyle", k: "po05", e: 1 }, { s: "#expSel", k: "po06", e: 1 }, { s: "#preview", k: "po07", e: 1 }, { s: "#publishBtn", k: "po08", e: 1 },
      { s: "#pg-post #reloadBtn", k: "po09", e: 1 }, { s: "#po_list [data-edit]", k: "po10", e: 1 }, { s: "#editLang", k: "po11", e: 1, pre: () => clickQ("#po_list [data-edit]") },
    ],
    watch: [{ s: "#wa_copyBtn", k: "wa01", e: 1 }, { s: "#wa_q", k: "wa02" }, { s: "#rivals", k: "wa03" }, { s: "#pg-watch #head", k: "wa04" }, { s: "#pg-watch #rows [data-edit], #pg-watch #rows tr", k: "wa05", e: 1 }, { s: "#pg-watch #left", k: "wa06" }],
    scout: [{ s: "#sc_kid", k: "sc01", e: 1 }, { s: "#sc_list", k: "sc02" }, { s: "#sc_sortKey", k: "sc03" }, { s: "#sc_kingdoms table", k: "sc04" }],
    views: [{ s: "#vw_days", k: "vw01" }, { s: "#vw_daily", k: "vw02" }, { s: "#pg-views .vw-grid", k: "vw03" }],
    perms: [{ s: "#pm_mReply", k: "pm01" }, { s: "#pm_tbl table", k: "pm02" }, { s: "#pm_tbl .pm-nt", k: "pm03" }, { s: "#pm_tbl [data-pv]", k: "pm04" }, { s: "#pm_addBtn", k: "pm05" }, { s: "#po_owner > summary", k: "pm06", pre: () => { const d = Q("#po_owner"); if (d) d.open = true; } }],
  };
  /* put the page back the way it was after a tour opened things */
  const OEXIT = {
    events: () => { const ed = Q("#editor"); if (ed && !ed.hidden) clickQ("#edCancel"); },
    board: () => { if (/t=/.test(location.hash)) { selfNav(); location.hash = "#board"; } clickQ("#bd_newCancel"); },
    attend: () => { const e = Q("#at_edit"); if (e && !e.hidden) clickQ("#at_back"); },
    post: () => { const c = Q("#editCard"); if (c && !c.hidden) clickQ("#editClose"); },
  };
  let selfNavUntil = 0; const selfNav = () => { selfNavUntil = Date.now() + 1500; };   // a hash change the tour itself caused
  const canEditTab = (tab) => !OFFICER.can || OFFICER.can(tab, "edit");
  const stepApplies = (tab, st) => !(st.e && !canEditTab(tab) && !OT.en[st.k + "v"]);
  /* text for a step: view-only officers get the "…v" variant when there is one */
  const otStep = (tab, key) => { const ro = !canEditTab(tab); return ro && OT.en[key + "v"] ? ot(key + "v") : ot(key); };

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
  /* which way each clip was drawn: l = looks left, r = looks right, f = faces the viewer. The bird is mirrored when the clip's
     own direction differs from where it should be looking (`facing`), so its front is always toward what it's attending to. */
  const FACE = { idle: "l", fly: "l", sulky: "l", hi: "r", sleep: "f" /* never mirrored: the zzz in the clip would read backwards */, point: "r", bow: "r", thumbs: "r", walk: "r",
    pop: "l",   // whole clip mirrored as one piece (a mid-clip turn looked like it changed its mind halfway)
    tilt: "r", wake: "f", hop: "f", teacher: "f", heart: "f", cry: "f" };
  let facing = "r", clipFace = "l", turnTimer = null;
  function applyFlip() { flip = clipFace !== "f" && clipFace !== facing; bird.classList.toggle("sp-flip", flip); }
  function startFacing(name) {   // the clip's own direction, with a mid-clip turn when it has one
    clearTimeout(turnTimer); const f = FACE[name] || "l";
    if (typeof f === "string") { clipFace = f; return; }
    clipFace = f.start; turnTimer = setTimeout(() => { if (cur === name) { clipFace = f.then; applyFlip(); } }, dur(name) * f.at);
  }
  function setFacing(d) { facing = d === "l" ? "l" : "r"; applyFlip(); }
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
          startFacing(name); applyFlip(); back.classList.remove("sp-off"); front.classList.add("sp-off");
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
  /* abort a flight in progress: the bird stays where it is, and whoever awaited that flight gets `false` so it stops its flow
     instead of carrying on (highlighting, talking) somewhere the bird never arrived */
  function stopFlight() { if (!flying) return; cancelAnimationFrame(flying.raf); const r = flying.resolve; flying = null; r(false); }
  function flyTo(x, y) {
    return new Promise((resolve) => {
      stopFlight();
      const from = { ...pos }, dx = x - from.x, dy = y - from.y, dist = Math.hypot(dx, dy);
      if (dist < 4) { pos = { x, y }; place(); resolve(true); return; }
      if (REDUCED) { pos = { x, y }; place(); resolve(true); return; }
      setFacing(dx > 0 ? "r" : "l");                   // look where it's flying
      play("fly", { squash: false });
      const D = Math.min(1600, 500 + dist * 1.6), t0 = performance.now(), lift = Math.min(90, 30 + dist * 0.25);
      const step = (now) => {
        const k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        pos = { x: from.x + dx * e, y: from.y + dy * e - Math.sin(Math.PI * k) * lift }; place();
        if (k < 1) flying.raf = requestAnimationFrame(step); else { flying = null; resolve(true); }
      };
      flying = { raf: requestAnimationFrame(step), resolve };
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
  /* the top strip hidden under the phone's status bar / notch when the site runs as an installed app (CSS env(safe-area-inset-top)) */
  const safeTop = () => { const v = parseFloat(getComputedStyle(root).getPropertyValue("--sp-sat")); if (v > 0) return v; return navigator.standalone ? 54 : 0; };   // installed iOS app without viewport-fit=cover: the bar still sits over the top ~54px
  function visRect(el) { const r = el.getBoundingClientRect(), top = Math.max(r.top, 56 + safeTop()), bottom = Math.min(r.bottom, innerHeight - 8); return { left: r.left, right: r.right, width: r.width, top, bottom, height: Math.max(0, bottom - top) }; }
  function pointAt(el) {   // land next to an element (right side when there is room, else left); the whole bird always stays on screen
    const r = visRect(el), m = META[cur] || META.idle, w = m.w * SIZE, h = m.h * SIZE, minY = safeTop() + h + 8;
    const right = r.right + 8 + w < innerWidth - 8, left = r.left - 8 - w > 8;
    const cx = r.left + r.width / 2, clampX = (x) => Math.max(w * 0.5 + 4, Math.min(innerWidth - w * 0.5 - 4, x));
    const sideY = Math.max(minY, Math.min(innerHeight - 10, r.top + Math.min(r.height, 60) + h * 0.3));
    if (right) return { x: clampX(r.right + 10 + w * 0.45), y: sideY, side: "r", cx };
    if (left) return { x: clampX(r.left - 10 - w * 0.45), y: sideY, side: "l", cx };
    return { x: clampX(r.left + Math.min(r.width - w * 0.5, w * 0.55)), y: Math.max(minY, r.top - 6), side: "top", cx };   // no room beside it: stand on its top edge
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
  const faceIn = () => setFacing(perchPoint().x < innerWidth / 2 ? "r" : "l");   // perched at the left edge → look right, into the page (not at the wall)
  async function goHome() { const p = perchPoint(); if (Math.hypot(p.x - pos.x, p.y - pos.y) > 6) { if (!(await flyTo(p.x, p.y))) return false; } faceIn(); await play("idle", { squash: false }); return true; }
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
      const sec = document.querySelector(".sp-ai-sec"); if (sec) { await wait(300); const p = pointAt(sec); if (!(await flyTo(p.x, p.y))) return; setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(sec); say(esc(t("howA")), { foot: false }); clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { hush(); clearTarget(); goHome(); /* nothing more to show → back to the perch, out of the way */ }, 4000); }
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
  /* scroll so that el's top sits `top` px below the viewport top (null = centre it), in whichever box scrolls it; then wait until it has stopped moving */
  async function scrollToEl(el, top) {
    const scroller = (() => { for (let n = el.parentElement; n; n = n.parentElement) { const cs = getComputedStyle(n); if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 4) return n; } return null; })();
    const r = el.getBoundingClientRect();
    const want = top == null ? r.top - Math.max(8, (innerHeight - Math.min(r.height, innerHeight * 0.6)) / 2) : r.top - top;
    const beh = REDUCED ? "auto" : "smooth";
    try {
      if (scroller) { const sr = scroller.getBoundingClientRect(), inner = r.top - sr.top; scroller.scrollTo({ top: scroller.scrollTop + inner - (top == null ? Math.max(8, (sr.height - Math.min(r.height, sr.height * 0.6)) / 2) : Math.max(8, top - sr.top)), behavior: beh }); }
      else window.scrollTo({ top: scrollY + want, behavior: beh });
    } catch (e) { el.scrollIntoView({ block: top == null ? "center" : "start" }); }
    let last = null; for (let i = 0; i < 25; i++) { await wait(60); const y = Math.round(el.getBoundingClientRect().top); if (y === last) break; last = y; }
  }
  let stepGen = 0;   // bumped by every cancel: a step that was scrolling or flying when cancelled notices and stops, instead of finishing somewhere odd
  function cancelStep() { stepGen++; stopFlight(); if (stepResolve) { const r = stepResolve; stepResolve = null; r("stop"); } }
  async function step(el, text, last) {
    cancelStep(); const g = stepGen;
    if (el) {
      for (let d = el.closest("details:not([open])"); d; d = d.parentElement && d.parentElement.closest("details:not([open])")) d.open = true;   // inside a folded section → unfold it
      const m0 = META[cur] || META.idle, tall = el.getBoundingClientRect().height > innerHeight * 0.4;
      // one scroll, worked out in advance (a second scroll on top of a smooth one cancels it and leaves the bird somewhere odd):
      // short targets go to the middle; tall ones get their top edge below room for the bird and its bubble, so the bubble never covers them
      await scrollToEl(el, tall ? safeTop() + m0.h * SIZE + 200 : null); if (g !== stepGen) return "stop"; const p = pointAt(el); if (!(await flyTo(p.x, p.y)) || g !== stepGen) return "stop"; setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(el); placeBubble(); }
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
    const end = async () => { clearTarget(); tour = null; busy = false; await goHome(); hush(); state = "menu"; armIdle(); };
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
  /* 👀 watchdog: the thing being pointed at disappeared (panel closed, tab switched, guide closed) while the sparrow was waiting
     there → drop the step and fly home instead of staying put next to nothing. Only while idle or waiting for Next, never mid-flow. */
  let lostSince = 0;
  const shown = (el) => { if (!el || !el.isConnected) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !el.closest("[hidden]"); };   // scrolled out of view still counts as there
  setInterval(async () => {
    if (root.hidden || flying || state === "sleep" || state === "off") return;
    if (targetEl && (stepResolve || !busy)) {
      if (shown(targetEl)) { lostSince = 0; return; }
      lostSince = lostSince || Date.now(); if (Date.now() - lostSince < 500) return; lostSince = 0;
      cancelStep(); clearTarget(); hush(); tour = null; busy = false; if (state !== "menu" && state !== "how") state = "menu"; await goHome(); if (!IS_OFFICER && !IS_TOOL) armIdle();
      return;
    }
    // idle with nothing to point at but away from the perch → go home
    if (!busy && !tour && !targetEl && bubble.hidden) { const h = perchPoint(); if (Math.hypot(h.x - pos.x, h.y - pos.y) > 6) { await goHome(); } }
  }, 300);

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
    clearTarget(); tour = null; busy = false; await goHome(); hush();
  }
  function toolAsk() {
    say(`<b>${esc(tl("ask"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="ttour">${esc(tl("yes"))}</button><button type="button" data-a="tno">${esc(tl("no"))}</button></div>`);
    redraw = toolAsk; clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (!busy) hush(); }, 6000);
  }
  async function startTool() {
    if (ls.get(LS) === "off") { showToggle(true); return; }
    root.hidden = false; pos = perchPoint(); place(); faceIn(); await play("idle", { squash: false }); state = "menu";
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
    const p = pointAt(title); if (!(await flyTo(p.x, p.y))) { busy = false; return; }
    setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r");   // face the thing it points at
    highlight(title); const c = play("point"); say(esc(t("here"))); state = "menu"; busy = false; armIdle();
    if (await c) { play("idle", { squash: false }); }
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
    const p = pointAt(ob); if (!(await flyTo(p.x, p.y))) { busy = false; return false; } setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(ob); await play("point"); say(esc(t("msg")));
    await play("idle", { squash: false }); busy = false; state = "menu"; armIdle(); return true;
  }

  async function start() {
    if (ls.get(LS) === "off") { showToggle(true); return; }
    root.hidden = false;
    const site = typeof langChosen !== "undefined";
    pos = perchPoint(); place(); faceIn();
    const picker = () => site && !langChosen;
    const wakeUp = async () => {
      sleepZ(false); busy = true; await play("wake"); busy = false;
      if (PREVIEW) { busy = true; await playMessage(MESSAGES[PREVIEW === "nia" ? 0 : 1], true); busy = false; state = "menu"; armIdle(); return; }   // 👀 preview of a personal message
      if (!(await msgHint())) greet();
    };
    const doze = async () => { clearTimeout(idleTimer); cancelStep(); stopFlight(); hush(); clearTarget(); tour = null; busy = false; pos = perchPoint(); place(); faceIn(); await play("sleep", { squash: false }); sleepZ(true); state = "sleep"; };
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
    const p = pointAt(sec); if (!(await flyTo(p.x, p.y))) return; setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(sec);
    const c = play("point"); say(esc(t("howA")), { foot: false }); clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { hush(); clearTarget(); goHome(); /* nothing more to show → back to the perch, out of the way */ }, 4000);
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
  async function runOfficerTour(tab, only) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const end = async () => { clearTarget(); tour = null; busy = false; try { if (!only && OEXIT[tab]) OEXIT[tab](); } catch (e) {} await goHome(); hush(); };
    const a = Q(`.tabs a[data-tab="${tab}"]`); if (!a) { await end(); return; }
    if (!only) {
      a.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(300);
      const p = pointAt(a); if (!(await flyTo(p.x, p.y))) { busy = false; tour = null; return; } setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(a); play("point"); await wait(700);
      if (!a.classList.contains("on")) { selfNav(); a.click(); await wait(600); }
    }
    const steps = (only || OTOURS[tab]).filter((st) => stepApplies(tab, st));
    const find = (st) => { const el = Q(st.s); return el && shown(el) ? el : null; };
    let shownAny = false;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      if (st.pre) { try { selfNav(); await st.pre(); } catch (e) {} await wait(450); }
      const el = await waitFor(() => find(st), st.pre ? 1800 : 250);
      if (!el) continue;   // not on this page right now (view-only, nothing to open, empty list…) → next
      shownAny = true;
      const more = steps.slice(i + 1).some((s2) => s2.pre || find(s2));
      const r = await step(el, () => otStep(tab, st.k), !more); if (r === "stop") break;
    }
    if (!shownAny && steps.length) { const h = Q(`#pg-${tab} h1`); await step(h && shown(h) ? h : a, () => otStep(tab, steps[0].k), true); }   // nothing rendered yet (no data) → at least say what the tab is for
    await end();
  }

  /* 🐦 a small "call Little Sparrow" button on every card of the officer page: tap → the sparrow walks through just that card's buttons */
  function addCallButtons() {
    const tab = (location.hash.match(/^#([a-z]+)/) || [])[1]; const steps = OTOURS[tab]; if (!steps) return;
    const seen = new Set();
    steps.forEach((st) => {
      if (st.pre) return;   // steps that open something belong to the card they open from; the card itself carries the button
      const el = Q(st.s); if (!el || !shown(el)) return;
      const card = el.closest(".card, details, .tm-page") || el;
      if (seen.has(card)) return; seen.add(card);
      if ([...document.querySelectorAll(".sp-call")].some((x) => x.spCard === card)) return;   // already has one (a re-rendered card loses it and gets a fresh one)
      const head = card.querySelector(":scope > h2, :scope > .top h2, :scope > summary, :scope > .top h1, :scope > h3, :scope > .tm-top > b");
      const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("call"); b.setAttribute("aria-label", t("call")); b.spCard = card;
      b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); hush(); runOfficerTour(tab, steps.filter((s2) => { const e2 = Q(s2.s); return e2 && (card === e2 || card.contains(e2)); })); };
      if (head) head.appendChild(b); else card.before(b);
    });
  }
  let tmHinted = false; try { tmHinted = !!sessionStorage.getItem("nxs-sparrow-tmhint"); } catch (e) {}
  setInterval(() => {
    if (root.hidden) return;
    const view = document.querySelector(".tm-view"); if (!view || view.hidden) return;
    const mk = (id) => { const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("call"); b.setAttribute("aria-label", t("call")); b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); hush(); runTour(id); }; return b; };
    const top = view.querySelector(".tm-top > b"); if (top && !top.querySelector(".sp-call")) top.appendChild(mk("tmr"));
    const al = view.querySelector(".tm-alerts > b"); if (al && !al.querySelector(".sp-call")) al.appendChild(mk("rem"));
    // first time the timers panel is open this session: show what the 🐦 is for
    const cb = view.querySelector(".tm-top .sp-call");
    if (cb && !tmHinted && !busy && !tour && state !== "sleep") {
      tmHinted = true; try { sessionStorage.setItem("nxs-sparrow-tmhint", "1"); } catch (e) {}
      (async () => {
        busy = true; hush(); clearTarget(); cb.scrollIntoView({ block: "center" }); await wait(350);
        const p = pointAt(cb); if (!(await flyTo(p.x, p.y))) { busy = false; return; }
        setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(cb); const c = play("point"); say(esc(t("callBtn")), { foot: false }); await c;
        await play("idle", { squash: false }); await wait(4000); hush(); clearTarget(); busy = false; await goHome();
      })();
    }
  }, 1500);
  if (IS_OFFICER) {
    setInterval(() => { if (root.hidden) return; try { addCallButtons(); } catch (e) {} }, 1500);
    window.addEventListener("hashchange", () => { if (tour && Date.now() > selfNavUntil) cancelStep(); });
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
    root.hidden = false; pos = perchPoint(); place(); faceIn();
    const u = OFFICER.user, m = messageFor(u);
    if (m && !isRead(m)) { await playMessage(m); return; }
    if (sessionStorage.getItem("nxs-sparrow-greeted")) { await play("idle", { squash: false }); return; }
    try { sessionStorage.setItem("nxs-sparrow-greeted", "1"); } catch (e) {}
    const c = play("hi"); say(esc(t("oGreet").replace("{name}", u.name || "")), { foot: false }); await c;
    await play("idle", { squash: false }); await wait(5000); hush();
    // …then show one of the 🐦 call buttons on the tab they're on: fly over, point at it, explain
    try { addCallButtons(); } catch (e) {}
    const cb = [...document.querySelectorAll(".sp-call")].find((b) => b.getBoundingClientRect().width > 0);
    if (!cb) return;
    busy = true; cb.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(500); const p = pointAt(cb); if (!(await flyTo(p.x, p.y))) { busy = false; return; }
    setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(cb); const c2 = play("point"); say(esc(t("callBtn")), { foot: false }); await c2;
    await play("idle", { squash: false }); await wait(4500); hush(); clearTarget(); busy = false; await goHome();
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
    window.addEventListener("resize", () => { if (!busy && state !== "off" && root.hidden === false && !targetEl) { pos = perchPoint(); place(); faceIn(); } placeBubble(); });
    const f = fab(); if (f) new MutationObserver(() => { if (!busy && !flying && !targetEl) { pos = perchPoint(); place(); faceIn(); } }).observe(f, { attributes: true, attributeFilter: ["style", "class"] });
    // navigating to another guide mid-tour: drop the tour (the thing being pointed at may be gone) instead of carrying on somewhere odd
    window.addEventListener("hashchange", () => { if (tour) { cancelStep(); } setTimeout(onGuideOpened, 300); });
    document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest(".ai-panel .guide-link-btn, .guide-row button")) setTimeout(onGuideOpened, 400); }, true);
    new MutationObserver(() => { if (toggleBtn) toggleBtn.title = t("show"); if (!bubble.hidden && redraw) { const r = redraw; r(); } document.querySelectorAll(".sp-call").forEach((b) => { b.title = t("call"); }); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    if (IS_OFFICER) { addOfficerAISection(); startOfficer(); } else if (IS_TOOL) startTool(); else { addAISection(); start(); }
  }
  window.NXSSparrow = { play, flyTo, say, hush, start, off: turnOff, on: turnOn, messages: MESSAGES, tour: (id) => IS_OFFICER ? runOfficerTour(id) : runTour(id), state: () => ({ busy, tour, state }), active: () => ls.get(LS) !== "off" && !REDUCED };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
