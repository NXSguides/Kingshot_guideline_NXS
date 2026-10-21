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
  const IS_OFFICER = typeof OFFICER !== "undefined";   // officer page (js/officer/core.js) vs the main site
  const PREVIEW = (location.search.match(/[?&]sparrow=(nia|armada)/) || [])[1] || null;   // 👀 …/?sparrow=nia shows Nia's message on the main site (nothing is marked read)
  const LS = "nxs-sparrow", READ_LS = "nxs-sparrow-read";
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- texts (12 site languages; officer page uses zh/en/pt/ar/ko) ---------- */
  const T = {
    en: { greet: "Hi! I'm Little Sparrow 🐦 Need any help?", page: "🔎 Find a page", how: "🎓 How do I use…", none: "🤔 Neither of these",
      noneA: "Then please go find the real Sparrow 🐦", pageA: "Tap the page you want and I'll fly you there.", here: "Here it is. This is what you were looking for, right?",
      howA: "Pick one here and I'll walk you through it step by step. Or just ask the AI.", sulky: "Don't need me…? Okay then.", hide: "Hide Little Sparrow", show: "Little Sparrow",
      msg: "There's a message for you 💌 Tap 📋 at the top right.", got: "Got it", from: "from Sparrow", oGreet: "Hi {name}! I'm Little Sparrow. If I still can't teach you something, go find the real Sparrow 😄" },
    zh: { greet: "嗨囉！我是小麻雀 🐦 需要幫忙嗎？", page: "🔎 找頁面", how: "🎓 怎麼用某個功能…", none: "🤔 都不是",
      noneA: "那請你去找真麻雀喔（Sparrow）🐦", pageA: "點你要的頁面，我飛過去帶你看。", here: "在這裡。這應該就是你要找的對吧？",
      howA: "從這裡選一個，我一步一步帶你做。也可以直接問 AI。", sulky: "不需要我嗎…？好吧。", hide: "隱藏小麻雀", show: "小麻雀",
      msg: "有給你的留言 💌 點右上角的 📋", got: "知道了", from: "來自 Sparrow", oGreet: "嗨 {name}！我是小麻雀。如果我還是教不會你，就去找真麻雀（Sparrow）吧 😄" },
    ko: { greet: "안녕! 나는 작은 참새 🐦 도움이 필요해?", page: "🔎 페이지 찾기", how: "🎓 기능 사용법…", none: "🤔 둘 다 아니야",
      noneA: "그럼 진짜 참새(Sparrow)를 찾아가 줘 🐦", pageA: "원하는 페이지를 누르면 내가 날아가서 보여줄게.", here: "여기야. 찾던 게 이거 맞지?",
      howA: "여기서 하나 고르면 단계별로 알려줄게. AI에게 물어봐도 돼.", sulky: "내가 필요 없어…? 알았어.", hide: "작은 참새 숨기기", show: "작은 참새",
      msg: "너에게 온 메시지가 있어 💌 오른쪽 위 📋 를 눌러 봐.", got: "알겠어", from: "Sparrow가 보냄", oGreet: "안녕 {name}! 나는 작은 참새야. 내가 못 알려주는 게 있으면 진짜 Sparrow를 찾아가 😄" },
    de: { greet: "Hi! Ich bin der kleine Spatz 🐦 Brauchst du Hilfe?", page: "🔎 Eine Seite finden", how: "🎓 Wie benutze ich…", none: "🤔 Keins von beiden",
      noneA: "Dann geh bitte zum echten Spatz (Sparrow) 🐦", pageA: "Tippe auf die Seite, die du willst – ich fliege hin.", here: "Hier ist es. Das hast du gesucht, oder?",
      howA: "Such dir hier eins aus, ich führe dich Schritt für Schritt durch. Oder frag einfach die KI.", sulky: "Brauchst du mich nicht…? Na gut.", hide: "Kleinen Spatz ausblenden", show: "Kleiner Spatz",
      msg: "Da ist eine Nachricht für dich 💌 Tippe oben rechts auf 📋.", got: "Alles klar", from: "von Sparrow", oGreet: "Hi {name}! Ich bin der kleine Spatz. Wenn ich dir etwas nicht erklären kann, geh zum echten Sparrow 😄" },
    fr: { greet: "Salut ! Je suis Petit Moineau 🐦 Besoin d'aide ?", page: "🔎 Trouver une page", how: "🎓 Comment utiliser…", none: "🤔 Ni l'un ni l'autre",
      noneA: "Alors va voir le vrai Moineau (Sparrow) 🐦", pageA: "Touche la page que tu veux, je t'y emmène.", here: "C'est ici. C'est ce que tu cherchais, non ?",
      howA: "Choisis-en un ici et je te guide étape par étape. Ou demande à l'IA.", sulky: "Tu n'as pas besoin de moi… ? Bon.", hide: "Cacher Petit Moineau", show: "Petit Moineau",
      msg: "Il y a un message pour toi 💌 Touche 📋 en haut à droite.", got: "Compris", from: "de Sparrow", oGreet: "Salut {name} ! Je suis Petit Moineau. Si je n'arrive pas à t'expliquer, va voir le vrai Sparrow 😄" },
    pt: { greet: "Oi! Eu sou o Pardalzinho 🐦 Precisa de ajuda?", page: "🔎 Encontrar uma página", how: "🎓 Como usar…", none: "🤔 Nenhum dos dois",
      noneA: "Então vá falar com a Sparrow de verdade 🐦", pageA: "Toque na página que você quer e eu voo até lá.", here: "Aqui está. Era isso que você procurava, né?",
      howA: "Escolha um aqui e eu te guio passo a passo. Ou pergunte à IA.", sulky: "Não precisa de mim…? Tá bom.", hide: "Esconder o Pardalzinho", show: "Pardalzinho",
      msg: "Tem uma mensagem para você 💌 Toque em 📋 no canto superior direito.", got: "Entendi", from: "da Sparrow", oGreet: "Oi {name}! Eu sou o Pardalzinho. Se eu não conseguir te ensinar algo, vá falar com a Sparrow de verdade 😄" },
    es: { greet: "¡Hola! Soy Gorrioncito 🐦 ¿Necesitas ayuda?", page: "🔎 Buscar una página", how: "🎓 Cómo usar…", none: "🤔 Ninguna de las dos",
      noneA: "Entonces ve con la Sparrow de verdad 🐦", pageA: "Toca la página que quieres y vuelo hasta allí.", here: "Aquí está. Esto es lo que buscabas, ¿no?",
      howA: "Elige uno aquí y te guío paso a paso. O pregúntale a la IA.", sulky: "¿No me necesitas…? Bueno.", hide: "Ocultar a Gorrioncito", show: "Gorrioncito",
      msg: "Tienes un mensaje 💌 Toca 📋 arriba a la derecha.", got: "Entendido", from: "de Sparrow", oGreet: "¡Hola {name}! Soy Gorrioncito. Si no logro enseñarte algo, ve con la Sparrow de verdad 😄" },
    tr: { greet: "Selam! Ben Küçük Serçe 🐦 Yardım lazım mı?", page: "🔎 Sayfa bul", how: "🎓 Nasıl kullanılır…", none: "🤔 İkisi de değil",
      noneA: "O zaman gerçek Serçe'ye (Sparrow) git 🐦", pageA: "İstediğin sayfaya dokun, oraya uçayım.", here: "İşte burada. Aradığın buydu, değil mi?",
      howA: "Buradan birini seç, adım adım anlatayım. Ya da yapay zekâya sor.", sulky: "Bana ihtiyacın yok mu…? Peki.", hide: "Küçük Serçe'yi gizle", show: "Küçük Serçe",
      msg: "Sana bir mesaj var 💌 Sağ üstteki 📋 simgesine dokun.", got: "Anladım", from: "Sparrow'dan", oGreet: "Selam {name}! Ben Küçük Serçe. Bir şeyi öğretemezsem gerçek Sparrow'a git 😄" },
    id: { greet: "Hai! Aku Burung Gereja Kecil 🐦 Perlu bantuan?", page: "🔎 Cari halaman", how: "🎓 Cara memakai…", none: "🤔 Bukan dua-duanya",
      noneA: "Kalau begitu cari Sparrow yang asli ya 🐦", pageA: "Ketuk halaman yang kamu mau, aku terbang ke sana.", here: "Ini dia. Ini yang kamu cari, kan?",
      howA: "Pilih satu di sini, aku pandu langkah demi langkah. Atau tanya AI saja.", sulky: "Tidak butuh aku…? Ya sudah.", hide: "Sembunyikan Burung Gereja Kecil", show: "Burung Gereja Kecil",
      msg: "Ada pesan untukmu 💌 Ketuk 📋 di kanan atas.", got: "Oke", from: "dari Sparrow", oGreet: "Hai {name}! Aku Burung Gereja Kecil. Kalau aku tetap tidak bisa mengajarimu, cari Sparrow yang asli ya 😄" },
    ru: { greet: "Привет! Я Воробушек 🐦 Нужна помощь?", page: "🔎 Найти страницу", how: "🎓 Как пользоваться…", none: "🤔 Ни то, ни другое",
      noneA: "Тогда иди к настоящему Воробью (Sparrow) 🐦", pageA: "Нажми на нужную страницу — я прилечу туда.", here: "Вот оно. Ты это искал, да?",
      howA: "Выбери здесь, и я проведу тебя по шагам. Или просто спроси ИИ.", sulky: "Я не нужен…? Ну ладно.", hide: "Скрыть Воробушка", show: "Воробушек",
      msg: "Для тебя есть сообщение 💌 Нажми 📋 справа вверху.", got: "Понятно", from: "от Sparrow", oGreet: "Привет, {name}! Я Воробушек. Если я не смогу что-то объяснить, иди к настоящему Sparrow 😄" },
    th: { greet: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 ต้องการความช่วยเหลือไหม?", page: "🔎 หาหน้า", how: "🎓 ใช้ฟีเจอร์ยังไง…", none: "🤔 ไม่ใช่ทั้งสองอย่าง",
      noneA: "งั้นไปหานกกระจอกตัวจริง (Sparrow) นะ 🐦", pageA: "แตะหน้าที่ต้องการ แล้วฉันจะบินพาไป", here: "อยู่นี่ไง นี่คือที่หาอยู่ใช่ไหม?",
      howA: "เลือกตรงนี้สักอัน ฉันจะพาทำทีละขั้น หรือถาม AI ก็ได้", sulky: "ไม่ต้องการฉันเหรอ…? ก็ได้", hide: "ซ่อนนกกระจอกน้อย", show: "นกกระจอกน้อย",
      msg: "มีข้อความถึงคุณ 💌 แตะ 📋 มุมขวาบน", got: "เข้าใจแล้ว", from: "จาก Sparrow", oGreet: "หวัดดี {name}! ฉันคือนกกระจอกน้อย ถ้าฉันสอนไม่ได้ ไปหา Sparrow ตัวจริงนะ 😄" },
    ar: { greet: "مرحبًا! أنا العصفور الصغير 🐦 هل تحتاج مساعدة؟", page: "🔎 البحث عن صفحة", how: "🎓 كيف أستخدم…", none: "🤔 لا هذا ولا ذاك",
      noneA: "إذًا اذهب إلى العصفور الحقيقي (Sparrow) 🐦", pageA: "اضغط على الصفحة التي تريدها وسأطير إليها.", here: "ها هي. هذا ما كنت تبحث عنه، صحيح؟",
      howA: "اختر واحدًا هنا وسأرشدك خطوة بخطوة. أو اسأل الذكاء الاصطناعي.", sulky: "لا تحتاجني…؟ حسنًا.", hide: "إخفاء العصفور الصغير", show: "العصفور الصغير",
      msg: "لديك رسالة 💌 اضغط على 📋 في الأعلى يمينًا.", got: "فهمت", from: "من Sparrow", oGreet: "مرحبًا {name}! أنا العصفور الصغير. إن لم أستطع تعليمك شيئًا، اذهب إلى Sparrow الحقيقية 😄" },
  };
  const lang = () => { if (typeof currentLang !== "undefined") return currentLang; return ls.get("nxs-officer-lang") || "en"; };
  const t = (k) => (T[lang()] || T.en)[k] || T.en[k];

  /* ---------- guided tours: texts ---------- */
  const TT = {
    en: { pick: "What do you want to learn?", tmr: "⏰ Set a timer", rem: "🎮 Game reminders", inst: "📲 Install as an app", back: "‹ Back", next: "Next ›", done: "Done ✓", stop: "✕ Stop",
      tmr1: "This is ⏰ My timers. Tap it to open.", tmr2: "First, notifications. If it says they're on, tap “Send a test”, leave the app, and wait 15 s for the red badge. If not, follow what it says here first.",
      tmr2ios: "On iPhone, timers only ping you from the installed app. Read 📲 Install as an app first, then come back.",
      tmr3: "⚡ Quick start: your last times. Troops Training and Gathering remember the time — one tap starts them again. Noble Advisor has its own time.", tmr4: "＋ Set a timer: pick what it is, type the time the game shows, and save. “Other” is for anything not in the list.",
      tmr5: "Appointments can only be booked 24 h ahead, so the slots are ready for you here, in your local time. When Troops Training, Building or Research finishes, I'll suggest a slot to book.",
      rem1: "🎮 Game reminders: tick what you tend to forget. Tap a time to turn it on (it goes orange with a ✓), tap again to turn it off.", rem2: "Alliance events use the times we post. If I got one wrong, go find the real Sparrow — that's her problem, not mine 🐦",
      inst1: "This page shows how to install the site as an app. Read it carefully — on iPhone, notifications only work from the installed app." },
    zh: { pick: "想學哪一個？", tmr: "⏰ 設定計時", rem: "🎮 遊戲提醒", inst: "📲 安裝成 App", back: "‹ 返回", next: "下一步 ›", done: "完成 ✓", stop: "✕ 停止",
      tmr1: "這是 ⏰ 我的計時，點一下打開。", tmr2: "先看通知。如果顯示已開啟，點「傳測試通知」，退出 App 等 15 秒，看有沒有紅點點和通知。沒有的話，先照這裡寫的做。",
      tmr2ios: "iPhone 要從安裝好的 App 才會收到提醒。先看 📲 安裝成 App，再回來。",
      tmr3: "⚡ 快速開始：上次的時間。訓練和採集會記住時間，點一下就重新開始。參謀長加成會另外記一組時間。", tmr4: "＋ 設定計時：選是什麼、照遊戲顯示的時間輸入、儲存。清單裡沒有的用「其他」。",
      tmr5: "官職只能預約 24 小時內的，所以時段已經幫你排好，而且換算成你的當地時間。訓練、建造、研究快完成時，我會建議你預約一個時段。",
      rem1: "🎮 遊戲提醒：勾你容易忘記的。點一下時間就開啟（變橘色打 ✓），再點一次關閉。", rem2: "聯盟活動的時間是我們更新的。如果發現我忘了更新，去找真麻雀（Sparrow），那是她的問題，不是小麻雀的問題 🐦",
      inst1: "這一頁教你把網站安裝成 App。請仔細看，iPhone 一定要從安裝好的 App 才收得到通知。" },
    ko: { pick: "무엇을 배울까요?", tmr: "⏰ 타이머 설정", rem: "🎮 게임 알림", inst: "📲 앱으로 설치", back: "‹ 뒤로", next: "다음 ›", done: "완료 ✓", stop: "✕ 중지",
      tmr1: "이게 ⏰ 내 타이머예요. 눌러서 열어요.", tmr2: "먼저 알림이에요. 켜져 있다고 나오면 “테스트 보내기”를 누르고 앱을 나간 뒤 15초 기다려 빨간 배지를 확인하세요. 아니면 여기 적힌 대로 먼저 하세요.",
      tmr2ios: "아이폰은 설치한 앱에서만 알림이 와요. 먼저 📲 앱으로 설치를 읽고 돌아오세요.",
      tmr3: "⚡ 빠른 시작: 최근 시간이에요. 훈련과 채집은 시간을 기억해서 한 번만 누르면 다시 시작돼요. 참모장 버프는 따로 기억해요.", tmr4: "＋ 타이머 설정: 무엇인지 고르고, 게임에 보이는 시간을 입력하고 저장하세요. 목록에 없으면 “기타”.",
      tmr5: "관직은 24시간 안에만 예약할 수 있어서 시간대를 미리 준비해 뒀고, 내 현지 시간으로 보여줘요. 훈련·건설·연구가 끝날 때 예약할 시간대를 제안할게요.",
      rem1: "🎮 게임 알림: 자주 잊는 걸 체크하세요. 시간을 누르면 켜지고(주황색 ✓), 다시 누르면 꺼져요.", rem2: "연맹 이벤트 시간은 우리가 올려요. 틀렸다면 진짜 Sparrow를 찾아가세요 — 그건 그녀 잘못이에요 🐦",
      inst1: "이 페이지는 사이트를 앱으로 설치하는 방법이에요. 아이폰은 설치한 앱에서만 알림이 와요. 꼼꼼히 읽어 주세요." },
    de: { pick: "Was willst du lernen?", tmr: "⏰ Timer stellen", rem: "🎮 Spiel-Erinnerungen", inst: "📲 Als App installieren", back: "‹ Zurück", next: "Weiter ›", done: "Fertig ✓", stop: "✕ Stopp",
      tmr1: "Das ist ⏰ Meine Timer. Tippe darauf.", tmr2: "Zuerst die Benachrichtigungen. Steht da „an“, tippe auf „Test senden“, verlasse die App und warte 15 s auf den roten Punkt. Sonst erst das machen, was hier steht.",
      tmr2ios: "Auf dem iPhone kommen Timer nur aus der installierten App. Lies zuerst 📲 Als App installieren.",
      tmr3: "⚡ Schnellstart: deine letzten Zeiten. Training und Sammeln merken sich die Zeit – ein Tipp startet sie neu. Der Adelsberater hat eine eigene Zeit.", tmr4: "＋ Timer stellen: auswählen, die Zeit aus dem Spiel eintippen, speichern. „Sonstiges“ für alles, was nicht in der Liste ist.",
      tmr5: "Ämter kann man nur 24 h im Voraus buchen, darum stehen die Slots hier schon bereit – in deiner Ortszeit. Wenn Training, Bauen oder Forschung fertig wird, schlage ich dir einen Slot vor.",
      rem1: "🎮 Spiel-Erinnerungen: hake an, was du oft vergisst. Tippe auf eine Zeit zum Einschalten (orange mit ✓), nochmal zum Ausschalten.", rem2: "Allianz-Events nutzen unsere Zeiten. Ist eine falsch, geh zum echten Sparrow – ihr Problem, nicht meins 🐦",
      inst1: "Diese Seite zeigt, wie du die Seite als App installierst. Lies sie genau – auf dem iPhone gibt es Benachrichtigungen nur in der App." },
    fr: { pick: "Tu veux apprendre quoi ?", tmr: "⏰ Mettre un minuteur", rem: "🎮 Rappels du jeu", inst: "📲 Installer en appli", back: "‹ Retour", next: "Suivant ›", done: "Terminé ✓", stop: "✕ Stop",
      tmr1: "Voici ⏰ Mes minuteurs. Touche pour ouvrir.", tmr2: "D'abord les notifications. Si c'est écrit « activées », touche « Envoyer un test », quitte l'appli et attends 15 s le point rouge. Sinon, fais d'abord ce qui est écrit ici.",
      tmr2ios: "Sur iPhone, les minuteurs ne préviennent que depuis l'appli installée. Lis d'abord 📲 Installer en appli.",
      tmr3: "⚡ Démarrage rapide : tes derniers temps. Entraînement et récolte retiennent le temps – un tap les relance. Le Conseiller noble a son propre temps.", tmr4: "＋ Mettre un minuteur : choisis quoi, tape le temps affiché par le jeu, enregistre. « Autre » pour ce qui n'est pas dans la liste.",
      tmr5: "Les postes se réservent seulement 24 h à l'avance, donc les créneaux sont déjà prêts ici, dans ton heure locale. Quand l'entraînement, la construction ou la recherche se termine, je te propose un créneau.",
      rem1: "🎮 Rappels du jeu : coche ce que tu oublies souvent. Touche une heure pour l'activer (orange avec ✓), encore une fois pour la couper.", rem2: "Les événements d'alliance utilisent nos horaires. S'il y en a un faux, va voir le vrai Moineau – c'est son problème, pas le mien 🐦",
      inst1: "Cette page montre comment installer le site en appli. Lis-la bien – sur iPhone, les notifications ne marchent que depuis l'appli installée." },
    pt: { pick: "O que você quer aprender?", tmr: "⏰ Criar um timer", rem: "🎮 Lembretes do jogo", inst: "📲 Instalar como app", back: "‹ Voltar", next: "Próximo ›", done: "Pronto ✓", stop: "✕ Parar",
      tmr1: "Isto é ⏰ Meus timers. Toque para abrir.", tmr2: "Primeiro, as notificações. Se disser que estão ativas, toque em “Enviar teste”, saia do app e espere 15 s pelo ponto vermelho. Se não, siga o que está escrito aqui antes.",
      tmr2ios: "No iPhone, os timers só avisam pelo app instalado. Leia 📲 Instalar como app primeiro e volte.",
      tmr3: "⚡ Início rápido: seus últimos tempos. Treino e coleta lembram o tempo — um toque reinicia. O Conselheiro nobre tem um tempo separado.", tmr4: "＋ Criar um timer: escolha o que é, digite o tempo que o jogo mostra e salve. “Outro” é para o que não está na lista.",
      tmr5: "Cargos só podem ser agendados com 24 h, então os horários já estão prontos aqui, no seu horário local. Quando treino, construção ou pesquisa terminar, eu sugiro um horário para agendar.",
      rem1: "🎮 Lembretes do jogo: marque o que você costuma esquecer. Toque num horário para ligar (fica laranja com ✓), toque de novo para desligar.", rem2: "Eventos da aliança usam os horários que postamos. Se algum estiver errado, vá falar com a Sparrow de verdade — o problema é dela, não meu 🐦",
      inst1: "Esta página mostra como instalar o site como app. Leia com atenção — no iPhone, as notificações só funcionam pelo app instalado." },
    es: { pick: "¿Qué quieres aprender?", tmr: "⏰ Poner un temporizador", rem: "🎮 Recordatorios del juego", inst: "📲 Instalar como app", back: "‹ Atrás", next: "Siguiente ›", done: "Listo ✓", stop: "✕ Parar",
      tmr1: "Esto es ⏰ Mis temporizadores. Toca para abrir.", tmr2: "Primero, las notificaciones. Si dice que están activas, toca «Enviar prueba», sal de la app y espera 15 s el punto rojo. Si no, sigue primero lo que dice aquí.",
      tmr2ios: "En iPhone, los temporizadores solo avisan desde la app instalada. Lee primero 📲 Instalar como app y vuelve.",
      tmr3: "⚡ Inicio rápido: tus últimos tiempos. Entrenamiento y recolección recuerdan el tiempo: un toque los reinicia. El Consejero noble tiene su propio tiempo.", tmr4: "＋ Poner un temporizador: elige qué es, escribe el tiempo que muestra el juego y guarda. «Otro» es para lo que no está en la lista.",
      tmr5: "Los cargos solo se reservan con 24 h, así que los turnos ya están listos aquí, en tu hora local. Cuando termine el entrenamiento, la construcción o la investigación, te sugeriré un turno.",
      rem1: "🎮 Recordatorios del juego: marca lo que sueles olvidar. Toca una hora para activarla (naranja con ✓), toca otra vez para apagarla.", rem2: "Los eventos de alianza usan las horas que publicamos. Si alguna está mal, ve con la Sparrow de verdad: es su problema, no el mío 🐦",
      inst1: "Esta página explica cómo instalar el sitio como app. Léela bien: en iPhone, las notificaciones solo funcionan desde la app instalada." },
    tr: { pick: "Neyi öğrenmek istersin?", tmr: "⏰ Zamanlayıcı kur", rem: "🎮 Oyun hatırlatmaları", inst: "📲 Uygulama olarak yükle", back: "‹ Geri", next: "İleri ›", done: "Bitti ✓", stop: "✕ Durdur",
      tmr1: "Bu ⏰ Zamanlayıcılarım. Açmak için dokun.", tmr2: "Önce bildirimler. Açık yazıyorsa “Test gönder”e dokun, uygulamadan çık ve kırmızı nokta için 15 sn bekle. Değilse önce burada yazanı yap.",
      tmr2ios: "iPhone'da zamanlayıcılar yalnızca yüklü uygulamadan uyarır. Önce 📲 Uygulama olarak yükle'yi oku, sonra dön.",
      tmr3: "⚡ Hızlı başlat: son sürelerin. Eğitim ve toplama süreyi hatırlar — tek dokunuşla yeniden başlar. Soylu Danışman'ın ayrı süresi vardır.", tmr4: "＋ Zamanlayıcı kur: ne olduğunu seç, oyunun gösterdiği süreyi yaz, kaydet. Listede olmayanlar için “Diğer”.",
      tmr5: "Makamlar sadece 24 saat önceden ayırtılabilir, bu yüzden saatler burada hazır, senin yerel saatinle. Eğitim, inşaat veya araştırma bitince ayırtman için bir saat öneririm.",
      rem1: "🎮 Oyun hatırlatmaları: sık unuttuklarını işaretle. Saate dokununca açılır (turuncu ✓), tekrar dokununca kapanır.", rem2: "İttifak etkinlikleri bizim yazdığımız saatleri kullanır. Yanlışsa gerçek Sparrow'a git — onun sorunu, benim değil 🐦",
      inst1: "Bu sayfa siteyi uygulama olarak nasıl yükleyeceğini gösterir. Dikkatle oku — iPhone'da bildirimler yalnızca yüklü uygulamada çalışır." },
    id: { pick: "Mau belajar yang mana?", tmr: "⏰ Pasang timer", rem: "🎮 Pengingat game", inst: "📲 Pasang sebagai aplikasi", back: "‹ Kembali", next: "Lanjut ›", done: "Selesai ✓", stop: "✕ Berhenti",
      tmr1: "Ini ⏰ Timer saya. Ketuk untuk membuka.", tmr2: "Pertama, notifikasi. Kalau tertulis sudah aktif, ketuk “Kirim tes”, keluar dari aplikasi, dan tunggu 15 detik sampai titik merah muncul. Kalau belum, ikuti dulu yang tertulis di sini.",
      tmr2ios: "Di iPhone, timer hanya memberi tahu dari aplikasi yang terpasang. Baca dulu 📲 Pasang sebagai aplikasi, lalu kembali.",
      tmr3: "⚡ Mulai cepat: waktu terakhirmu. Latihan dan pengumpulan mengingat waktunya — satu ketukan memulai lagi. Noble Advisor punya waktu sendiri.", tmr4: "＋ Pasang timer: pilih apa, ketik waktu yang ditampilkan game, simpan. “Lainnya” untuk yang tidak ada di daftar.",
      tmr5: "Jabatan hanya bisa dipesan 24 jam sebelumnya, jadi slotnya sudah siap di sini, dalam waktu lokalmu. Saat latihan, bangunan, atau riset selesai, aku akan menyarankan slot untuk dipesan.",
      rem1: "🎮 Pengingat game: centang yang sering kamu lupa. Ketuk waktu untuk menyalakan (jadi oranye dengan ✓), ketuk lagi untuk mematikan.", rem2: "Acara aliansi memakai waktu yang kami posting. Kalau ada yang salah, cari Sparrow yang asli — itu salahnya, bukan salahku 🐦",
      inst1: "Halaman ini menunjukkan cara memasang situs sebagai aplikasi. Baca baik-baik — di iPhone, notifikasi hanya berfungsi dari aplikasi yang terpasang." },
    ru: { pick: "Чему научить?", tmr: "⏰ Поставить таймер", rem: "🎮 Игровые напоминания", inst: "📲 Установить как приложение", back: "‹ Назад", next: "Далее ›", done: "Готово ✓", stop: "✕ Стоп",
      tmr1: "Это ⏰ Мои таймеры. Нажми, чтобы открыть.", tmr2: "Сначала уведомления. Если написано, что включены, нажми «Отправить тест», выйди из приложения и подожди 15 с красную точку. Если нет — сначала сделай то, что здесь написано.",
      tmr2ios: "На iPhone таймеры уведомляют только из установленного приложения. Сначала прочитай 📲 Установить как приложение.",
      tmr3: "⚡ Быстрый старт: твои последние времена. Обучение и сбор помнят время — один тап запускает снова. У Благородного советника своё время.", tmr4: "＋ Поставить таймер: выбери что, впиши время из игры, сохрани. «Другое» — для того, чего нет в списке.",
      tmr5: "Должности бронируются только за 24 ч, поэтому слоты уже готовы здесь, в твоём местном времени. Когда закончится обучение, стройка или исследование, я предложу слот.",
      rem1: "🎮 Игровые напоминания: отметь то, что часто забываешь. Нажми на время, чтобы включить (оранжевое с ✓), ещё раз — выключить.", rem2: "События альянса идут по нашему расписанию. Если что-то не так — иди к настоящему Воробью, это её проблема, не моя 🐦",
      inst1: "Эта страница показывает, как установить сайт как приложение. Читай внимательно — на iPhone уведомления работают только из установленного приложения." },
    th: { pick: "อยากเรียนอะไร?", tmr: "⏰ ตั้งตัวจับเวลา", rem: "🎮 แจ้งเตือนในเกม", inst: "📲 ติดตั้งเป็นแอป", back: "‹ กลับ", next: "ถัดไป ›", done: "เสร็จ ✓", stop: "✕ หยุด",
      tmr1: "นี่คือ ⏰ ตัวจับเวลาของฉัน แตะเพื่อเปิด", tmr2: "ดูการแจ้งเตือนก่อน ถ้าบอกว่าเปิดแล้ว แตะ “ส่งทดสอบ” ออกจากแอปแล้วรอ 15 วินาที ดูจุดแดง ถ้ายังไม่เปิด ทำตามที่เขียนตรงนี้ก่อน",
      tmr2ios: "บน iPhone ตัวจับเวลาจะแจ้งเตือนได้เฉพาะจากแอปที่ติดตั้งแล้ว อ่าน 📲 ติดตั้งเป็นแอป ก่อนแล้วค่อยกลับมา",
      tmr3: "⚡ เริ่มด่วน: เวลาครั้งล่าสุด ฝึกทหารกับเก็บทรัพยากรจะจำเวลาไว้ แตะครั้งเดียวก็เริ่มใหม่ ที่ปรึกษาขุนนางมีเวลาแยกต่างหาก", tmr4: "＋ ตั้งตัวจับเวลา: เลือกว่าคืออะไร พิมพ์เวลาที่เกมแสดง แล้วบันทึก ที่ไม่อยู่ในรายการใช้ “อื่น ๆ”",
      tmr5: "ตำแหน่งจองได้แค่ล่วงหน้า 24 ชม. ช่วงเวลาจึงเตรียมไว้ให้แล้วตรงนี้ เป็นเวลาท้องถิ่นของคุณ พอฝึกทหาร ก่อสร้าง หรือวิจัยเสร็จ ฉันจะแนะนำช่วงเวลาให้จอง",
      rem1: "🎮 แจ้งเตือนในเกม: ติ๊กสิ่งที่มักลืม แตะเวลาเพื่อเปิด (เป็นสีส้มมี ✓) แตะอีกครั้งเพื่อปิด", rem2: "กิจกรรมพันธมิตรใช้เวลาที่เราโพสต์ ถ้าผิด ไปหา Sparrow ตัวจริง — เป็นความผิดของเธอ ไม่ใช่ฉัน 🐦",
      inst1: "หน้านี้สอนวิธีติดตั้งเว็บเป็นแอป อ่านให้ละเอียด — บน iPhone การแจ้งเตือนใช้ได้เฉพาะจากแอปที่ติดตั้งแล้ว" },
    ar: { pick: "ماذا تريد أن تتعلم؟", tmr: "⏰ ضبط مؤقّت", rem: "🎮 تذكيرات اللعبة", inst: "📲 التثبيت كتطبيق", back: "‹ رجوع", next: "التالي ›", done: "تم ✓", stop: "✕ إيقاف",
      tmr1: "هذا ⏰ مؤقّتاتي. اضغط لفتحه.", tmr2: "أولًا الإشعارات. إن كانت مفعّلة، اضغط «إرسال اختبار» واخرج من التطبيق وانتظر 15 ثانية لتظهر النقطة الحمراء. وإلا فافعل ما هو مكتوب هنا أولًا.",
      tmr2ios: "على iPhone لا تصلك المؤقّتات إلا من التطبيق المثبّت. اقرأ 📲 التثبيت كتطبيق أولًا ثم عد.",
      tmr3: "⚡ بدء سريع: أوقاتك الأخيرة. التدريب والجمع يتذكّران الوقت — ضغطة واحدة تعيد التشغيل. للمستشار النبيل وقت خاص.", tmr4: "＋ ضبط مؤقّت: اختر ما هو، اكتب الوقت كما تعرضه اللعبة، واحفظ. «أخرى» لما ليس في القائمة.",
      tmr5: "المناصب تُحجز قبل 24 ساعة فقط، لذلك الفترات جاهزة هنا بتوقيتك المحلي. عندما ينتهي التدريب أو البناء أو البحث سأقترح عليك فترة للحجز.",
      rem1: "🎮 تذكيرات اللعبة: علّم ما تنساه عادة. اضغط على وقت لتفعيله (يصبح برتقاليًا مع ✓)، واضغط مجددًا لإيقافه.", rem2: "أحداث التحالف تستخدم الأوقات التي ننشرها. إن كان أحدها خطأ فاذهب إلى Sparrow الحقيقية — المشكلة مشكلتها لا مشكلتي 🐦",
      inst1: "هذه الصفحة تشرح تثبيت الموقع كتطبيق. اقرأها جيدًا — على iPhone لا تعمل الإشعارات إلا من التطبيق المثبّت." },
  };
  const tt = (k) => (TT[lang()] || TT.en)[k] || TT.en[k];
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent), standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;


  /* ---------- officer page tours (zh / en / pt / ar / ko — the officer page languages) ---------- */
  const OT = {
    en: { msgs: "💌 Message from Sparrow", pick: "Which tab do you want me to show you?", onlyView: "(you can look, not edit)",
      events: "📅 Events", board: "💬 Board", map: "🗺️ Map", ranking: "📊 Ranking", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", perms: "👥 Officers",
      ev1: "This week's calendar. Tap a day to see what runs, and the officer to-dos for it.", ev2: "📣 The announcement helper: pick the next days and it writes the in-game announcement for you — copy it into the game.",
      ev3: "Officer to-dos for this week / next week. Tick them off as you go.", ev4: "Add or edit events here: name, when it starts, how often, and its to-dos. Only if you have edit rights.",
      bd1: "The board: one topic per plan. Everything is translated into each officer's language with the game's own terms, so nobody gets lost in chat.", bd2: "Open a topic to reply. Topics with a ✓ are decided. If someone @'s you, it's highlighted.",
      mp1: "The kingdom map with our territory. A confession from the real Sparrow: she doesn't open the map often, so it's updated only now and then. Need something changed right away? Go poke her 🐦", mp2: "Layers: switch banners, territory and plans on and off. Zoom with + and −.",
      rk1: "First choose: just play with this on your own device, or share the plan with everyone? A shared plan's roster goes to 📋 Attendance, where you can fill things in.", rk2: "Weights: how much power, TC and Mystic Trial count. Tick the members who are in, then read the sorted result below.",
      rk3: "Paste names from a screenshot here and they get ticked for you.", rk4: "The result: top N, with a copy button for Discord. Event presets give you a ready list for each event.",
      at1: "Attendance sheets come from shared Ranking plans. Open one to mark who showed up and add notes.",
      po1: "Write an announcement: title, text, a picture, a link to a guide, and when it expires. It's translated into all 12 languages when you publish.", po2: "Edit an announcement that's already out — fix one language, or re-translate all of them.",
      po3: "All announcements that are out. Reload to see the latest.",
      wa1: "Watch: name changes, power history, who joined or left. Use the search box and the filters.", sc1: "Scout: top players of other kingdoms, from the public data. Type a kingdom number and fetch.",
      vw1: "Views: how many people open the site, which pages and which languages. Pick the number of days.",
      pm1: "Officer rights: who may view or edit each tab. A new officer starts with Events, Board and Map, view only. Admins change this here.", pm2: "Add an officer by Discord ID. They log in with Discord and get exactly the tabs you gave them." },
    zh: { msgs: "💌 真麻雀的留言", pick: "想看哪個分頁？", onlyView: "（你只能看，不能改）",
      events: "📅 活動", board: "💬 留言板", map: "🗺️ 地圖", ranking: "📊 排名", attend: "📋 出席", post: "📢 公告", watch: "🕵️ 觀察", scout: "🔭 偵查", views: "📈 瀏覽", perms: "👥 幹部",
      ev1: "這週的日曆。點一天會列出當天的活動，還有幹部要做的事。", ev2: "📣 公告小幫手：選接下來幾天，它會幫你寫好遊戲內公告，複製貼進遊戲就好。",
      ev3: "這週／下週的幹部待辦，做完打勾。", ev4: "在這裡新增或修改活動：名稱、開始時間、多久一次、待辦事項。要有編輯權限才能改。",
      bd1: "留言板：一個計畫一個主題。所有內容會用遊戲用語翻成每個幹部的語言，聊天才不會被洗掉。", bd2: "打開主題就能回覆。打 ✓ 的是已經決定的。有人 @ 你會特別標出來。",
      mp1: "王國地圖和我們的領地。真麻雀（Sparrow）要先道歉：她不常翻地圖，所以地圖只是偶爾更新。有東西需要馬上改的話，直接去戳她 🐦", mp2: "圖層：旗子、領地、計畫可以開關。用 ＋ － 縮放。",
      rk1: "先選：只是在自己的裝置上玩一玩，還是要跟大家共享這個計畫？共享的計畫名單會跑到 📋 出席，可以在那邊輸入東西。", rk2: "權重：戰力、TC、秘境試煉各算多少。勾選參加的成員，下面就會排好順序。",
      rk3: "把截圖的名字貼在這裡，會自動幫你勾好。", rk4: "結果：前 N 名，有複製按鈕可以貼到 Discord。活動預設會直接給你每個活動的名單。",
      at1: "出席表來自共享的排名計畫。打開一個就能標記誰有到，還能寫備註。",
      po1: "寫公告：標題、內容、圖片、連結到哪一篇指南、什麼時候到期。發布時會翻成 12 種語言。", po2: "修改已經發出去的公告：改某一個語言，或全部重新翻譯。",
      po3: "所有已發布的公告。按重新整理看最新的。",
      wa1: "觀察：改名、戰力歷史、誰加入誰離開。用搜尋框和篩選。", sc1: "偵查：其他王國的頂尖玩家，來自公開資料。輸入王國編號就能抓。",
      vw1: "瀏覽：多少人開過網站、看哪些頁面、用什麼語言。可以選天數。",
      pm1: "幹部權限：每個分頁誰能看、誰能改。新幹部預設只有活動、留言板、地圖，而且只能看。管理員在這裡改。", pm2: "用 Discord ID 新增幹部。他們用 Discord 登入，就只會看到你給的分頁。" },
    pt: { msgs: "💌 Mensagem da Sparrow", pick: "Qual aba você quer que eu mostre?", onlyView: "(você pode ver, não editar)",
      events: "📅 Eventos", board: "💬 Quadro", map: "🗺️ Mapa", ranking: "📊 Ranking", attend: "📋 Presença", post: "📢 Postar", watch: "🕵️ Vigiar", scout: "🔭 Espiar", views: "📈 Visitas", perms: "👥 Oficiais",
      ev1: "O calendário da semana. Toque num dia para ver o que acontece e as tarefas dos oficiais.", ev2: "📣 O ajudante de anúncios: escolha os próximos dias e ele escreve o anúncio do jogo — copie para o jogo.",
      ev3: "Tarefas dos oficiais desta / próxima semana. Marque conforme faz.", ev4: "Adicione ou edite eventos aqui: nome, início, frequência e tarefas. Só com direito de edição.",
      bd1: "O quadro: um tópico por plano. Tudo é traduzido para o idioma de cada oficial com os termos do jogo, para ninguém se perder no chat.", bd2: "Abra um tópico para responder. Tópicos com ✓ estão decididos. Se alguém te marcar com @, fica destacado.",
      mp1: "O mapa do reino com nosso território. Confissão da Sparrow de verdade: ela não abre o mapa com frequência, então ele é atualizado só de vez em quando. Precisa de algo urgente? Vá cutucá-la 🐦", mp2: "Camadas: ligue e desligue bandeiras, território e planos. Zoom com + e −.",
      rk1: "Primeiro escolha: brincar só no seu aparelho, ou compartilhar o plano com todos? A lista de um plano compartilhado vai para 📋 Presença, onde você pode preencher coisas.", rk2: "Pesos: quanto contam poder, TC e Prova Mística. Marque quem participa e veja o resultado ordenado abaixo.",
      rk3: "Cole aqui os nomes de uma captura de tela e eles são marcados para você.", rk4: "O resultado: top N, com botão de copiar para o Discord. As predefinições de evento dão a lista pronta de cada evento.",
      at1: "As folhas de presença vêm dos planos compartilhados do Ranking. Abra uma para marcar quem apareceu e anotar.",
      po1: "Escreva um anúncio: título, texto, imagem, link para um guia e validade. É traduzido para os 12 idiomas ao publicar.", po2: "Edite um anúncio já publicado — corrija um idioma ou retraduza todos.",
      po3: "Todos os anúncios publicados. Recarregue para ver os mais recentes.",
      wa1: "Vigiar: mudanças de nome, histórico de poder, quem entrou ou saiu. Use a busca e os filtros.", sc1: "Espiar: os melhores jogadores de outros reinos, dos dados públicos. Digite o número do reino e busque.",
      vw1: "Visitas: quantas pessoas abrem o site, quais páginas e idiomas. Escolha o número de dias.",
      pm1: "Direitos dos oficiais: quem pode ver ou editar cada aba. Um oficial novo começa com Eventos, Quadro e Mapa, só visualização. Admins mudam isso aqui.", pm2: "Adicione um oficial pelo ID do Discord. Ele entra com o Discord e vê exatamente as abas que você deu." },
    ar: { msgs: "💌 رسالة من Sparrow", pick: "أي تبويب تريد أن أريك إياه؟", onlyView: "(يمكنك المشاهدة فقط، لا التعديل)",
      events: "📅 الأحداث", board: "💬 اللوحة", map: "🗺️ الخريطة", ranking: "📊 الترتيب", attend: "📋 الحضور", post: "📢 نشر", watch: "🕵️ مراقبة", scout: "🔭 استطلاع", views: "📈 الزيارات", perms: "👥 الضباط",
      ev1: "تقويم هذا الأسبوع. اضغط على يوم لترى ما يجري فيه ومهام الضباط.", ev2: "📣 مساعد الإعلانات: اختر الأيام القادمة فيكتب لك إعلان اللعبة — انسخه إلى اللعبة.",
      ev3: "مهام الضباط لهذا الأسبوع / الأسبوع القادم. علّمها عند إنجازها.", ev4: "أضف أو عدّل الأحداث هنا: الاسم، وقت البدء، التكرار، والمهام. فقط إن كان لديك حق التعديل.",
      bd1: "اللوحة: موضوع لكل خطة. كل شيء يُترجم إلى لغة كل ضابط بمصطلحات اللعبة نفسها، كي لا يضيع أحد في الدردشة.", bd2: "افتح موضوعًا للرد. المواضيع التي عليها ✓ محسومة. إن أشار إليك أحد بـ @ فسيُبرز لك.",
      mp1: "خريطة المملكة مع أراضينا. اعتراف من Sparrow الحقيقية: لا تفتح الخريطة كثيرًا، لذا تُحدَّث بين حين وآخر فقط. تحتاج تغييرًا فوريًا؟ اذهب ونبّهها 🐦", mp2: "الطبقات: فعّل أو عطّل الرايات والأراضي والخطط. كبّر وصغّر بـ + و −.",
      rk1: "اختر أولًا: تجرّب على جهازك فقط، أم تشارك الخطة مع الجميع؟ قائمة الخطة المشتركة تذهب إلى 📋 الحضور حيث يمكنك تعبئة الأشياء.", rk2: "الأوزان: كم تُحسب القوة وTC والتجربة الغامضة. علّم الأعضاء المشاركين ثم اقرأ النتيجة المرتبة أدناه.",
      rk3: "الصق هنا الأسماء من لقطة شاشة فتُعلَّم لك تلقائيًا.", rk4: "النتيجة: أفضل N، مع زر نسخ إلى Discord. إعدادات الأحداث تعطيك قائمة جاهزة لكل حدث.",
      at1: "أوراق الحضور تأتي من خطط الترتيب المشتركة. افتح واحدة لتعليم من حضر وإضافة ملاحظات.",
      po1: "اكتب إعلانًا: عنوان، نص، صورة، رابط إلى دليل، وموعد انتهائه. يُترجم إلى 12 لغة عند النشر.", po2: "عدّل إعلانًا منشورًا — أصلح لغة واحدة أو أعد ترجمتها كلها.",
      po3: "كل الإعلانات المنشورة. أعد التحميل لترى الأحدث.",
      wa1: "مراقبة: تغييرات الأسماء، سجل القوة، من انضم أو غادر. استخدم مربع البحث والمرشحات.", sc1: "استطلاع: أفضل لاعبي الممالك الأخرى من البيانات العامة. اكتب رقم المملكة واجلب.",
      vw1: "الزيارات: كم شخصًا يفتح الموقع، وأي الصفحات واللغات. اختر عدد الأيام.",
      pm1: "صلاحيات الضباط: من يستطيع مشاهدة أو تعديل كل تبويب. الضابط الجديد يبدأ بالأحداث واللوحة والخريطة للمشاهدة فقط. يغيّر المدراء ذلك هنا.", pm2: "أضف ضابطًا بمعرّف Discord. يسجّل الدخول بـ Discord ويرى التبويبات التي أعطيته إياها بالضبط." },
    ko: { msgs: "💌 Sparrow의 메시지", pick: "어느 탭을 보여줄까요?", onlyView: "(보기만 가능, 수정 불가)",
      events: "📅 이벤트", board: "💬 게시판", map: "🗺️ 지도", ranking: "📊 랭킹", attend: "📋 출석", post: "📢 공지", watch: "🕵️ 감시", scout: "🔭 정찰", views: "📈 조회", perms: "👥 간부",
      ev1: "이번 주 달력이에요. 날짜를 누르면 그날 이벤트와 간부 할 일이 나와요.", ev2: "📣 공지 도우미: 다음 며칠을 고르면 게임 내 공지를 써 줘요 — 게임에 복사하세요.",
      ev3: "이번 주 / 다음 주 간부 할 일. 하면서 체크하세요.", ev4: "여기서 이벤트를 추가·수정해요: 이름, 시작, 주기, 할 일. 수정 권한이 있을 때만요.",
      bd1: "게시판: 계획마다 주제 하나. 모든 내용이 게임 용어로 각 간부의 언어로 번역돼서 채팅에 묻히지 않아요.", bd2: "주제를 열어 답글을 달아요. ✓가 있는 주제는 결정된 거예요. 누가 @로 부르면 강조돼요.",
      mp1: "우리 영토가 있는 왕국 지도예요. 진짜 Sparrow의 고백: 지도를 자주 안 열어서 가끔만 업데이트돼요. 바로 바꿔야 하면 가서 찔러 주세요 🐦", mp2: "레이어: 깃발, 영토, 계획을 켜고 끌 수 있어요. + − 로 확대·축소.",
      rk1: "먼저 고르세요: 내 기기에서만 해 볼지, 모두와 계획을 공유할지. 공유한 계획의 명단은 📋 출석으로 가고, 거기서 입력할 수 있어요.", rk2: "가중치: 전투력, TC, 신비 시련을 얼마나 반영할지. 참가 멤버를 체크하면 아래에 정렬된 결과가 나와요.",
      rk3: "스크린샷의 이름을 여기 붙여 넣으면 자동으로 체크돼요.", rk4: "결과: 상위 N명, Discord용 복사 버튼. 이벤트 프리셋은 이벤트별 명단을 바로 줘요.",
      at1: "출석표는 공유된 랭킹 계획에서 와요. 하나를 열어 누가 왔는지 표시하고 메모하세요.",
      po1: "공지 쓰기: 제목, 내용, 사진, 가이드 링크, 만료 시간. 게시하면 12개 언어로 번역돼요.", po2: "이미 올린 공지 수정 — 한 언어만 고치거나 전부 다시 번역.",
      po3: "게시된 모든 공지. 새로고침해서 최신 걸 보세요.",
      wa1: "감시: 이름 변경, 전투력 기록, 가입·탈퇴. 검색창과 필터를 쓰세요.", sc1: "정찰: 공개 데이터로 본 다른 왕국의 상위 플레이어. 왕국 번호를 입력하고 가져오세요.",
      vw1: "조회: 사이트를 연 사람 수, 어떤 페이지와 언어인지. 일수를 고르세요.",
      pm1: "간부 권한: 탭마다 누가 보고 수정할 수 있는지. 새 간부는 이벤트·게시판·지도 보기만으로 시작해요. 관리자가 여기서 바꿔요.", pm2: "Discord ID로 간부를 추가해요. Discord로 로그인하면 준 탭만 보여요." },
  };
  const ot = (k) => (OT[lang()] || OT.en)[k] || OT.en[k];
  const OTOURS = {
    events: [["#cal", "ev1"], ["#anCard", "ev2"], ["#todos", "ev3"], ["#ev_timed", "ev4"]],
    board: [["#bd_listView", "bd1"], ["#bd_listView", "bd2"]],
    map: [["#km_box", "mp1"], ["#km_layers", "mp2"]],
    ranking: [["#planCard", "rk1"], ["#rk_wRow", "rk2"], ["#pasteBox", "rk3"], ["#result", "rk4"]],
    attend: [["#at_list", "at1"]],
    post: [["#po_app", "po1"], ["#editCard", "po2"], ["#po_list", "po3"]],
    watch: [["#wa_app", "wa1"]], scout: [["#sc_app", "sc1"]], views: [["#vw_daily", "vw1"]],
    perms: [["#pm_tbl", "pm1"], ["#pm_name", "pm2"]],
  };
  /* ---------- personal messages from Sparrow (officer page). Lines: [clip, text]. Matched by Discord user id, or by name until the id is known ---------- */
  const MESSAGES = [
    { id: "762827904341246013", match: /^nia$|milk/i, lines: [
      ["bow", "Hi hi, Nia, hello there"], ["hi", "The real Sparrow sent me to help you. My name is Little Sparrow."],
      ["cry", "I heard you've been busy busy, boo hoo"], ["tilt", "So you probably haven't had time to look around this site properly, right??"],
      ["hop", "That's okay, I'm here to help you now!"], ["teacher", "Here's the button to call me. Tap it when you have a question"],
      ["pop", "and I'll get summoned right out!"], ["heart", "You're the best, love you!"] ] },
    { id: "1240788094672834623", match: /armada|ΔRMΔDΔ/i, lines: [
      ["hi", "Hey Armada! The real Sparrow sent me to help you. My name is Little Sparrow."],
      ["walk", "I've seen your footprints all over the site!!"], ["thumbs", "You're seriously awesome. Here's a thumbs up for you"],
      ["teacher", "Here's the button to call me. Tap it when you have a question"], ["pop", "and I'll get summoned right out!"],
      ["point", "If I still can't solve it for you, go find the real Sparrow, because then it's definitely her problem"] ] },
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
  const loaded = {};
  function preload(name) { if (!loaded[name]) { const i = new Image(); i.src = IMG + name + ".webp"; loaded[name] = i; } }
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
      const swap = () => {
        layout(name, back);
        back.src = IMG + name + ".webp?r=" + Date.now();   // fresh load → the clip starts from its first frame
        back.onload = () => {
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
    const bw = bubble.offsetWidth, bh = bubble.offsetHeight, vw = innerWidth;
    let left = pos.x - 30, top = pos.y - h - bh - 14, up = false;
    if (top < 8) { top = pos.y + 12; up = true; }
    left = Math.max(8, Math.min(left, vw - bw - 8));
    bubble.style.left = left + "px"; bubble.style.top = top + "px"; bubble.classList.toggle("sp-up", up);
    bubble.style.setProperty("--sp-tail", Math.max(14, Math.min(bw - 26, pos.x - left - 6)) + "px");
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
    const bar = document.querySelector(".top-btns");
    if (!bar) return;
    if (!toggleBtn) { toggleBtn = document.createElement("button"); toggleBtn.className = "theme-toggle sp-toggle"; toggleBtn.type = "button"; toggleBtn.textContent = "🐦"; toggleBtn.onclick = turnOn; bar.prepend(toggleBtn); }
    toggleBtn.title = t("show"); toggleBtn.setAttribute("aria-label", t("show")); toggleBtn.hidden = !show;
  }

  /* ---------- where things are ---------- */
  const fab = () => document.querySelector(".ai-fab");
  function perchPoint() {   // feet on the top edge of the Ask AI button
    const f = fab(); if (!f) return { x: 60, y: innerHeight - 70 };
    const r = f.getBoundingClientRect(); return { x: r.left + Math.min(r.width - 24, 34), y: r.top + 3 };
  }
  function pointAt(el) {   // land next to an element (right side when there is room, else left)
    const r = el.getBoundingClientRect(), m = META[cur] || META.idle, w = m.w * SIZE, h = m.h * SIZE;
    const right = r.right + 8 + w < innerWidth - 8, left = r.left - 8 - w > 8;
    if (right) return { x: r.right + 10 + w * 0.45, y: Math.min(innerHeight - 10, r.top + Math.min(r.height, 60)), side: "r" };
    if (left) return { x: r.left - 10 - w * 0.45, y: Math.min(innerHeight - 10, r.top + Math.min(r.height, 60)), side: "l" };
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
    if (el) { el.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(420); const p = pointAt(el); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(el); }
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
  async function runTour(id) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = id; clearTimeout(idleTimer);
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
      if (!(await go(add || q(".tm-view #tmAdd"), () => tt("tmr5")))) return;
      const al2 = await waitFor(() => { const n = q(".tm-view .tm-alerts"); return visible(n) ? n : null; }, 2500);
      if (!(await go(al2, () => tt("rem1")))) return;
      if (!(await go(al2, () => tt("rem2"), true))) return;
      await end(); return;
    }
    if (id === "rem") {
      tm.show(true); await wait(500);
      const al = await waitFor(() => { const n = q(".tm-view .tm-alerts"); return visible(n) ? n : null; }, 2500);
      if (!(await go(al, () => tt("rem1")))) return;
      if (!(await go(al, () => tt("rem2"), true))) return;
      await end(); return;
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
    if (IS_OFFICER) { const c = play("hi"); officerMenu(); await c; play("idle", { squash: false }); return; }
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
  function officerMenu() {
    const tabs = [...document.querySelectorAll(".tabs a[data-tab]")].filter((a) => !a.hidden && OTOURS[a.dataset.tab]);
    const mine = messageFor(OFFICER.user);
    say(`<b>${esc(ot("pick"))}</b><div class="sp-opts">${tabs.map((a) => `<button type="button" class="sp-main" data-a="otour" data-t="${a.dataset.tab}">${esc(ot(a.dataset.tab))}${OFFICER.can && !OFFICER.can(a.dataset.tab, "edit") ? ` <small>${esc(ot("onlyView"))}</small>` : ""}</button>`).join("")}${mine ? `<button type="button" data-a="omsg">${esc(ot("msgs"))}</button>` : ""}</div>`);
    redraw = officerMenu;
    clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (!busy) hush(); }, 6000);
  }
  async function runOfficerTour(tab) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const end = async () => { clearTarget(); setFlip(false); tour = null; busy = false; await goHome(); hush(); };
    const a = document.querySelector(`.tabs a[data-tab="${tab}"]`); if (!a) { await end(); return; }
    a.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(300);
    const p = pointAt(a); await flyTo(p.x, p.y); setFlip(p.side === "l"); highlight(a); await play("point"); await wait(300); a.click(); await wait(600);
    const steps = OTOURS[tab];
    for (let i = 0; i < steps.length; i++) {
      const [sel, key] = steps[i]; let el = await waitFor(() => { const e = document.querySelector(sel); return visible(e) ? e : null; }, 2500);
      if (!el) el = document.querySelector(`#pg-${tab} h1`) || a;
      const r = await step(el, () => ot(key), i === steps.length - 1); if (r === "stop") break;
    }
    await end();
  }
  bubble.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-a=otour]"); if (b) runOfficerTour(b.dataset.t);
    if (e.target.closest("button[data-a=omsg]") && !busy) { const m = messageFor(OFFICER.user); if (m) { busy = true; hush(); await playMessage(m, true); busy = false; } }   // 💌 read Sparrow's message again
  });
  /* 🐦 a small "call Little Sparrow" button next to every feature on the officer page: tap → the sparrow flies there and explains just that one */
  function addCallButtons() {
    for (const tab in OTOURS) OTOURS[tab].forEach(([sel, key], i) => {
      const el = document.querySelector(sel); if (!el || el.querySelector(":scope > .sp-call") || (el.previousElementSibling && el.previousElementSibling.classList.contains("sp-call"))) return;
      const card = el.closest(".card, details, section"); const head = card && card !== el ? card.querySelector(":scope > h2, :scope > .top h2, :scope > summary, :scope > .top h1, :scope > h3") : null;
      if (head && head.querySelector(".sp-call")) return;
      const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("show"); b.setAttribute("aria-label", t("show"));
      b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); runOfficerStep(tab, i); };
      if (head) head.appendChild(b); else el.before(b);
    });
  }
  async function runOfficerStep(tab, i) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const [sel, key] = OTOURS[tab][i]; const el = document.querySelector(sel) || document.querySelector(`.tabs a[data-tab="${tab}"]`);
    await step(el, () => ot(key), true);
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
    busy = true; await play("pop");
    let i = 0, done = false;
    const showLine = async () => {
      const [clip, text] = m.lines[i], last = i === m.lines.length - 1;
      say(`<div class="sp-msg" dir="auto">${esc(text)}</div><div class="sp-from">${esc(t("from"))} · ${i + 1}/${m.lines.length}</div>
        <div class="sp-nav"><button type="button" data-n="-1" ${i ? "" : "disabled"}>‹</button>${last ? `<button type="button" class="sp-main" data-m="got">${esc(t("got"))}</button>` : `<button type="button" class="sp-main" data-n="1">›</button>`}</div>`, { foot: false });
      bubble.querySelectorAll("[data-n]").forEach((b) => b.onclick = () => go(+b.dataset.n));
      const g = bubble.querySelector("[data-m=got]"); if (g) g.onclick = () => { if (!preview) markRead(m); done = true; };
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
    (IS_OFFICER ? ["idle", "hi", "pop", "heart"] : ["sleep", "wake", "idle", "hi", "fly", "point"]).forEach(preload);   // the rest load when first played
    document.body.append(root, bubble);
    const first = (typeof langChosen !== "undefined" && !langChosen) ? "sleep" : "idle";   // a small still shows at once; the clip replaces it when it has loaded
    layout(first, front); front.src = IMG + first + "_end.webp"; cur = first;
    window.addEventListener("resize", () => { if (!busy && state !== "off" && root.hidden === false) { pos = perchPoint(); place(); } placeBubble(); });
    const f = fab(); if (f) new MutationObserver(() => { if (!busy && !flying) { pos = perchPoint(); place(); } }).observe(f, { attributes: true, attributeFilter: ["style", "class"] });
    window.addEventListener("hashchange", () => setTimeout(onGuideOpened, 300));
    document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest(".ai-panel .guide-link-btn, .guide-row button")) setTimeout(onGuideOpened, 400); }, true);
    new MutationObserver(() => { if (toggleBtn) toggleBtn.title = t("show"); if (!bubble.hidden && redraw) { const r = redraw; r(); } document.querySelectorAll(".sp-call").forEach((b) => { b.title = t("show"); }); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    if (IS_OFFICER) startOfficer(); else { addAISection(); start(); }
  }
  window.NXSSparrow = { play, flyTo, say, hush, start, off: turnOff, on: turnOn, messages: MESSAGES, active: () => ls.get(LS) !== "off" && !REDUCED };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
