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
  const PREVIEW = (location.search.match(/[?&]sparrow=(nia|armada)/) || [])[1] || null;
  const NAP_PREVIEW = /[?&]sparrow=nap/.test(location.search);   // 👀 …/?sparrow=nap replays the All Out pop-up gag (pop-up forced, no once-a-day)   // 👀 …/?sparrow=nia shows Nia's message on the main site (nothing is marked read)
  const LS = "nxs-sparrow", READ_LS = "nxs-sparrow-read";
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- texts (12 site languages; officer page uses zh/en/pt/ar/ko) ---------- */
  const T = {
    en: { napThink: "Oh no! All Out again… 😵‍💫 Everyone, stay careful out there. I'm done — retreating for a little nap…", callBtn: "This 🐦 calls me — tap it and I'll explain just that feature.", greet: "Hi! I'm Little Sparrow 🐦 Need any help?", greet2: "OK! What are you looking for?", tourQ: "Hi! I'm Little Sparrow 🐦 Want a quick tour of this page?", tourQo: "🐦 Want a quick tour of the officer page?", ob01: "← Back to the main site (guides, calendar, announcements).", ob02: "🌐 Language of every officer tab: 中文, English, Português, العربية, 한국어.", ob03: "Light / dark mode.", ob04: "🔗 Copies the link of the tab you're on — handy to send another officer straight there.", ob05: "↻ Refresh: loads the newest version (and the newest saved data).", ob06: "👤 You, logged in with Discord. Tap your name to change how it shows to other officers; Log out is next to it.", ob07: "📑 The tabs you have. Each officer only sees the tabs the 👥 table gives them — if one is missing, ask an admin.", ob08: "🐦 This button sits next to every feature. Tap it and I explain just that one.", ob09: "💬 Ask the AI anything about the officer pages — it only answers from the tabs you can open.", obDone: "That's the officer page! Pick a tab tour, or tap any 🐦 for one feature.", tourYes: "👀 Yes, show me", tourNo: "No thanks", tourDone: "That's this page! What would you like next?", tourDoneO: "Want more on one part? Tap the 🐦 next to it.", page: "🔎 Find a page", how: "🎓 How do I use…", none: "🤔 Neither of these",
      noneA: "Then please go find THAT Sparrow 🐦", pageA: "Tap the page you want and I'll fly you there.", here: "Here it is. This is what you were looking for, right?",
      howA: "Pick one here and I'll walk you through it step by step. Or just ask the AI.", sulky: "Don't need me…? Okay then.", hide: "Hide Little Sparrow", show: "Little Sparrow", call: "Call Little Sparrow to explain this",
      msg: "There's a message for you 💌 Tap 📋 at the top right.", got: "Got it", from: "from Sparrow", oGreet: "Hi {name}! I'm Little Sparrow. Tap me for a tour of any tab, or tap a 🐦 next to a feature and I'll explain just that one. If I still can't teach you something, go find THAT Sparrow 😄" },
    zh: { napThink: "噢不！又是 All Out⋯⋯ 😵‍💫 各位務必小心謹慎，我不行了，先撤退⋯⋯", callBtn: "這個 🐦 就是呼叫我的按鈕，點下去我就只講那一個功能。", greet: "嗨囉！我是小麻雀 🐦 需要幫忙嗎？", greet2: "好的！那你想找什麼？", tourQ: "嗨囉！我是小麻雀 🐦 要不要我帶你快速看一下這一頁？", tourQo: "🐦 要不要我帶你快速看一下幹部頁？", ob01: "← 回到主站（攻略、行事曆、公告）。", ob02: "🌐 所有幹部分頁的語言：中文、English、Português、العربية、한국어。", ob03: "淺色／深色模式。", ob04: "🔗 複製你現在這個分頁的連結，要叫其他幹部直接打開很方便。", ob05: "↻ 重新整理：載入最新版本（和最新存好的資料）。", ob06: "👤 這是你，用 Discord 登入的。點名字可以改其他幹部看到的名稱，旁邊是登出。", ob07: "📑 你有的分頁。每個幹部只看得到 👥 表格給他的分頁，少了哪個就問管理員。", ob08: "🐦 每個功能旁邊都有這個按鈕，點下去我就只講那一個。", ob09: "💬 幹部頁的問題都可以問 AI，它只會用你打得開的分頁來回答。", obDone: "幹部頁就是這樣！可以選一個分頁導覽，或點任何一個 🐦 只看那個功能。", tourYes: "👀 好，帶我看", tourNo: "不用了", tourDone: "這一頁就是這樣！接下來想看什麼？", tourDoneO: "想多了解哪一塊？點它旁邊的 🐦。", page: "🔎 找頁面", how: "🎓 怎麼用某個功能…", none: "🤔 都不是",
      noneA: "那請你去找那個麻雀喔（Sparrow）🐦", pageA: "點你要的頁面，我飛過去帶你看。", here: "在這裡。這應該就是你要找的對吧？",
      howA: "從這裡選一個，我一步一步帶你做。也可以直接問 AI。", sulky: "不需要我嗎…？好吧。", hide: "隱藏小麻雀", show: "小麻雀", call: "呼喚小麻雀來講解",
      msg: "有給你的留言 💌 點右上角的 📋", got: "知道了", from: "來自 Sparrow", oGreet: "嗨 {name}！我是小麻雀。點我可以導覽任何分頁，功能旁邊的 🐦 點下去我就只講那一個。如果我還是教不會你，就去找那個麻雀（Sparrow）吧 😄" },
    ko: { napThink: "안 돼! 또 총공격이야… 😵‍💫 다들 정말 조심해. 난 더는 못 버티겠어, 먼저 후퇴할게…", callBtn: "이 🐦 가 나를 부르는 버튼이야. 누르면 그 기능만 설명해 줄게.", greet: "안녕! 나는 작은 참새 🐦 도움이 필요해?", greet2: "알았어! 그럼 뭘 찾고 있어?", tourQ: "안녕! 나는 작은 참새 🐦 이 페이지 빠르게 둘러볼래?", tourQo: "🐦 간부 페이지 빠르게 둘러볼래?", ob01: "← 메인 사이트로 돌아가기 (공략, 달력, 공지).", ob02: "🌐 모든 간부 탭의 언어: 中文, English, Português, العربية, 한국어.", ob03: "라이트 / 다크 모드.", ob04: "🔗 지금 탭의 링크를 복사해 — 다른 간부를 바로 그 탭으로 보낼 때 편해.", ob05: "↻ 새로고침: 최신 버전 (과 최신 저장 데이터)을 불러와.", ob06: "👤 Discord로 로그인한 나야. 이름을 누르면 다른 간부에게 보이는 이름을 바꿀 수 있고, 옆에 로그아웃이 있어.", ob07: "📑 내가 가진 탭들. 간부마다 👥 표가 준 탭만 보여 — 없는 탭은 관리자에게 물어봐.", ob08: "🐦 이 버튼은 모든 기능 옆에 있어. 누르면 그 기능만 설명해 줄게.", ob09: "💬 간부 페이지에 대해 AI에게 뭐든 물어봐 — 내가 열 수 있는 탭으로만 대답해.", obDone: "간부 페이지는 여기까지! 탭 안내를 고르거나, 아무 🐦 나 눌러 기능 하나만 봐.", tourYes: "👀 응, 보여 줘", tourNo: "괜찮아", tourDone: "이 페이지는 여기까지! 다음엔 뭘 볼래?", tourDoneO: "한 부분을 더 알고 싶으면 옆의 🐦 를 눌러.", page: "🔎 페이지 찾기", how: "🎓 기능 사용법…", none: "🤔 둘 다 아니야",
      noneA: "그럼 그 참새(Sparrow)를 찾아가 줘 🐦", pageA: "원하는 페이지를 누르면 내가 날아가서 보여줄게.", here: "여기야. 찾던 게 이거 맞지?",
      howA: "여기서 하나 고르면 단계별로 알려줄게. AI에게 물어봐도 돼.", sulky: "내가 필요 없어…? 알았어.", hide: "작은 참새 숨기기", show: "작은 참새", call: "작은 참새 불러서 설명 듣기",
      msg: "너에게 온 메시지가 있어 💌 오른쪽 위 📋 를 눌러 봐.", got: "알겠어", from: "Sparrow가 보냄", oGreet: "안녕 {name}! 나는 작은 참새야. 나를 누르면 탭을 안내하고, 기능 옆 🐦 를 누르면 그것만 설명해 줘. 그래도 모르겠으면 그 Sparrow를 찾아가 😄" },
    de: { napThink: "Oh nein! Schon wieder All Out… 😵‍💫 Passt alle gut auf euch auf. Ich kann nicht mehr – ich ziehe mich zurück…", callBtn: "Dieses 🐦 ruft mich — tipp drauf und ich erkläre nur diese eine Funktion.", greet: "Hi! Ich bin der kleine Spatz 🐦 Brauchst du Hilfe?", greet2: "Okay! Was suchst du?", tourQ: "Hi! Ich bin der kleine Spatz 🐦 Kurze Tour durch diese Seite?", tourQo: "🐦 Kurze Tour durch diesen Tab?", tourYes: "👀 Ja, zeig mal", tourNo: "Nein danke", tourDone: "Das war diese Seite! Was möchtest du als Nächstes?", tourDoneO: "Mehr zu einem Teil? Tipp auf das 🐦 daneben.", page: "🔎 Eine Seite finden", how: "🎓 Wie benutze ich…", none: "🤔 Keins von beiden",
      noneA: "Dann geh bitte zu DEM Spatz (Sparrow) 🐦", pageA: "Tippe auf die Seite, die du willst – ich fliege hin.", here: "Hier ist es. Das hast du gesucht, oder?",
      howA: "Such dir hier eins aus, ich führe dich Schritt für Schritt durch. Oder frag einfach die KI.", sulky: "Brauchst du mich nicht…? Na gut.", hide: "Kleinen Spatz ausblenden", show: "Kleiner Spatz", call: "Kleinen Spatz rufen – erklärt das hier",
      msg: "Da ist eine Nachricht für dich 💌 Tippe oben rechts auf 📋.", got: "Alles klar", from: "von Sparrow", oGreet: "Hi {name}! Ich bin der kleine Spatz. Wenn ich dir etwas nicht erklären kann, geh zu DEM Sparrow 😄" },
    fr: { napThink: "Oh non ! Encore All Out… 😵‍💫 Soyez tous très prudents. Je n'en peux plus, je bats en retraite…", callBtn: "Ce 🐦 m'appelle — touche-le et j'explique juste cette fonction.", greet: "Salut ! Je suis Petit Moineau 🐦 Besoin d'aide ?", greet2: "D'accord ! Tu cherches quoi ?", tourQ: "Salut ! Je suis Petit Moineau 🐦 Un petit tour de cette page ?", tourQo: "🐦 Un petit tour de cet onglet ?", tourYes: "👀 Oui, montre-moi", tourNo: "Non merci", tourDone: "Voilà pour cette page ! Et ensuite ?", tourDoneO: "Envie d'en savoir plus sur une partie ? Touche le 🐦 à côté.", page: "🔎 Trouver une page", how: "🎓 Comment utiliser…", none: "🤔 Ni l'un ni l'autre",
      noneA: "Alors va voir CE Moineau-là (Sparrow) 🐦", pageA: "Touche la page que tu veux, je t'y emmène.", here: "C'est ici. C'est ce que tu cherchais, non ?",
      howA: "Choisis-en un ici et je te guide étape par étape. Ou demande à l'IA.", sulky: "Tu n'as pas besoin de moi… ? Bon.", hide: "Cacher Petit Moineau", show: "Petit Moineau", call: "Appeler Petit Moineau pour expliquer",
      msg: "Il y a un message pour toi 💌 Touche 📋 en haut à droite.", got: "Compris", from: "de Sparrow", oGreet: "Salut {name} ! Je suis Petit Moineau. Si je n'arrive pas à t'expliquer, va voir CE Sparrow-là 😄" },
    pt: { napThink: "Ah não! All Out de novo… 😵‍💫 Todo mundo, muito cuidado. Eu não aguento mais, vou recuar…", callBtn: "Este 🐦 me chama — toque nele e eu explico só aquela função.", greet: "Oi! Eu sou o Pardalzinho 🐦 Precisa de ajuda?", greet2: "Beleza! O que você está procurando?", tourQ: "Oi! Eu sou o Pardalzinho 🐦 Quer um tour rápido por esta página?", tourQo: "🐦 Quer um tour rápido pela página dos oficiais?", ob01: "← Volta ao site principal (guias, calendário, anúncios).", ob02: "🌐 Idioma de todas as abas dos oficiais: 中文, English, Português, العربية, 한국어.", ob03: "Modo claro / escuro.", ob04: "🔗 Copia o link da aba atual — prático para mandar outro oficial direto para lá.", ob05: "↻ Atualizar: carrega a versão mais nova (e os dados salvos mais novos).", ob06: "👤 Você, conectado com o Discord. Toque no seu nome para mudar como os outros oficiais o veem; Sair fica ao lado.", ob07: "📑 As abas que você tem. Cada oficial só vê as abas que a tabela 👥 libera — se faltar uma, fale com um admin.", ob08: "🐦 Este botão fica ao lado de cada função. Toque e eu explico só aquela.", ob09: "💬 Pergunte à IA qualquer coisa sobre as páginas dos oficiais — ela só responde com as abas que você pode abrir.", obDone: "Essa é a página dos oficiais! Escolha o tour de uma aba ou toque em qualquer 🐦 para uma função.", tourYes: "👀 Sim, me mostra", tourNo: "Não, obrigado", tourDone: "Essa é a página! O que você quer agora?", tourDoneO: "Quer saber mais de uma parte? Toque no 🐦 ao lado dela.", page: "🔎 Encontrar uma página", how: "🎓 Como usar…", none: "🤔 Nenhum dos dois",
      noneA: "Então vá falar com AQUELA Sparrow 🐦", pageA: "Toque na página que você quer e eu voo até lá.", here: "Aqui está. Era isso que você procurava, né?",
      howA: "Escolha um aqui e eu te guio passo a passo. Ou pergunte à IA.", sulky: "Não precisa de mim…? Tá bom.", hide: "Esconder o Pardalzinho", show: "Pardalzinho", call: "Chamar o Pardalzinho para explicar",
      msg: "Tem uma mensagem para você 💌 Toque em 📋 no canto superior direito.", got: "Entendi", from: "da Sparrow", oGreet: "Oi {name}! Eu sou o Pardalzinho. Toque em mim para um tour de qualquer aba, ou no 🐦 ao lado de uma função e eu explico só aquela. Se eu não conseguir te ensinar algo, vá falar com AQUELA Sparrow 😄" },
    es: { napThink: "¡Oh no! Otra vez All Out… 😵‍💫 Tened mucho cuidado todos. Yo ya no puedo, me retiro…", callBtn: "Este 🐦 me llama — tócalo y te explico solo esa función.", greet: "¡Hola! Soy Gorrioncito 🐦 ¿Necesitas ayuda?", greet2: "¡Vale! ¿Qué estás buscando?", tourQ: "¡Hola! Soy Gorrioncito 🐦 ¿Un recorrido rápido por esta página?", tourQo: "🐦 ¿Un recorrido rápido por esta pestaña?", tourYes: "👀 Sí, enséñame", tourNo: "No, gracias", tourDone: "¡Esa es la página! ¿Qué quieres ahora?", tourDoneO: "¿Quieres más sobre una parte? Toca el 🐦 de al lado.", page: "🔎 Buscar una página", how: "🎓 Cómo usar…", none: "🤔 Ninguna de las dos",
      noneA: "Entonces ve con ESA Sparrow 🐦", pageA: "Toca la página que quieres y vuelo hasta allí.", here: "Aquí está. Esto es lo que buscabas, ¿no?",
      howA: "Elige uno aquí y te guío paso a paso. O pregúntale a la IA.", sulky: "¿No me necesitas…? Bueno.", hide: "Ocultar a Gorrioncito", show: "Gorrioncito", call: "Llamar a Gorrioncito para que lo explique",
      msg: "Tienes un mensaje 💌 Toca 📋 arriba a la derecha.", got: "Entendido", from: "de Sparrow", oGreet: "¡Hola {name}! Soy Gorrioncito. Si no logro enseñarte algo, ve con ESA Sparrow 😄" },
    tr: { napThink: "Olamaz! Yine All Out… 😵‍💫 Herkes çok dikkatli olsun. Ben artık dayanamıyorum, geri çekiliyorum…", callBtn: "Bu 🐦 beni çağırır — dokun, sadece o özelliği anlatayım.", greet: "Selam! Ben Küçük Serçe 🐦 Yardım lazım mı?", greet2: "Tamam! Ne arıyorsun?", tourQ: "Selam! Ben Küçük Serçe 🐦 Bu sayfayı kısaca gezelim mi?", tourQo: "🐦 Bu sekmeyi kısaca gezelim mi?", tourYes: "👀 Evet, göster", tourNo: "Hayır, teşekkürler", tourDone: "Sayfa bu kadar! Sırada ne olsun?", tourDoneO: "Bir bölümü daha ayrıntılı mı istiyorsun? Yanındaki 🐦'a dokun.", page: "🔎 Sayfa bul", how: "🎓 Nasıl kullanılır…", none: "🤔 İkisi de değil",
      noneA: "O zaman O Serçe'ye (Sparrow) git 🐦", pageA: "İstediğin sayfaya dokun, oraya uçayım.", here: "İşte burada. Aradığın buydu, değil mi?",
      howA: "Buradan birini seç, adım adım anlatayım. Ya da yapay zekâya sor.", sulky: "Bana ihtiyacın yok mu…? Peki.", hide: "Küçük Serçe'yi gizle", show: "Küçük Serçe", call: "Küçük Serçe'yi çağır, anlatsın",
      msg: "Sana bir mesaj var 💌 Sağ üstteki 📋 simgesine dokun.", got: "Anladım", from: "Sparrow'dan", oGreet: "Selam {name}! Ben Küçük Serçe. Bir şeyi öğretemezsem O Sparrow'a git 😄" },
    id: { napThink: "Oh tidak! All Out lagi… 😵‍💫 Semuanya, hati-hati ya. Aku sudah tidak kuat, mundur dulu…", callBtn: "🐦 ini memanggilku — ketuk, dan aku jelaskan fitur itu saja.", greet: "Hai! Aku Burung Gereja Kecil 🐦 Perlu bantuan?", greet2: "Oke! Kamu cari apa?", tourQ: "Hai! Aku Burung Gereja Kecil 🐦 Mau tur singkat halaman ini?", tourQo: "🐦 Mau tur singkat tab ini?", tourYes: "👀 Ya, tunjukkan", tourNo: "Tidak, terima kasih", tourDone: "Itu halaman ini! Mau lihat apa selanjutnya?", tourDoneO: "Mau tahu lebih soal satu bagian? Ketuk 🐦 di sebelahnya.", page: "🔎 Cari halaman", how: "🎓 Cara memakai…", none: "🤔 Bukan dua-duanya",
      noneA: "Kalau begitu cari Sparrow yang ITU ya 🐦", pageA: "Ketuk halaman yang kamu mau, aku terbang ke sana.", here: "Ini dia. Ini yang kamu cari, kan?",
      howA: "Pilih satu di sini, aku pandu langkah demi langkah. Atau tanya AI saja.", sulky: "Tidak butuh aku…? Ya sudah.", hide: "Sembunyikan Burung Gereja Kecil", show: "Burung Gereja Kecil", call: "Panggil Burung Gereja Kecil untuk menjelaskan",
      msg: "Ada pesan untukmu 💌 Ketuk 📋 di kanan atas.", got: "Oke", from: "dari Sparrow", oGreet: "Hai {name}! Aku Burung Gereja Kecil. Kalau aku tetap tidak bisa mengajarimu, cari Sparrow yang ITU ya 😄" },
    ru: { napThink: "О нет! Опять All Out… 😵‍💫 Будьте все очень осторожны. Я больше не могу — отступаю…", callBtn: "Это 🐦 зовёт меня — нажми, и я объясню только эту функцию.", greet: "Привет! Я Воробушек 🐦 Нужна помощь?", greet2: "Хорошо! Что ищешь?", tourQ: "Привет! Я Воробушек 🐦 Показать эту страницу?", tourQo: "🐦 Показать эту вкладку?", tourYes: "👀 Да, покажи", tourNo: "Нет, спасибо", tourDone: "Вот и вся страница! Что дальше?", tourDoneO: "Хочешь подробнее про какую-то часть? Нажми 🐦 рядом с ней.", page: "🔎 Найти страницу", how: "🎓 Как пользоваться…", none: "🤔 Ни то, ни другое",
      noneA: "Тогда иди к ТОМУ Воробью (Sparrow) 🐦", pageA: "Нажми на нужную страницу — я прилечу туда.", here: "Вот оно. Ты это искал, да?",
      howA: "Выбери здесь, и я проведу тебя по шагам. Или просто спроси ИИ.", sulky: "Я не нужен…? Ну ладно.", hide: "Скрыть Воробушка", show: "Воробушек", call: "Позвать Воробушка — объяснит",
      msg: "Для тебя есть сообщение 💌 Нажми 📋 справа вверху.", got: "Понятно", from: "от Sparrow", oGreet: "Привет, {name}! Я Воробушек. Если я не смогу что-то объяснить, иди к ТОМУ Sparrow 😄" },
    th: { napThink: "ไม่นะ! All Out อีกแล้ว… 😵‍💫 ทุกคนระวังตัวกันด้วยนะ ฉันไม่ไหวแล้ว ขอถอยก่อน…", callBtn: "🐦 นี้คือปุ่มเรียกฉัน แตะแล้วฉันจะอธิบายเฉพาะฟีเจอร์นั้น", greet: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 ต้องการความช่วยเหลือไหม?", greet2: "ได้เลย! กำลังหาอะไรอยู่?", tourQ: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 อยากให้พาดูหน้านี้แบบเร็ว ๆ ไหม?", tourQo: "🐦 อยากให้พาดูแท็บนี้แบบเร็ว ๆ ไหม?", tourYes: "👀 เอาเลย พาดู", tourNo: "ไม่เป็นไร", tourDone: "หน้านี้มีเท่านี้! ต่อไปอยากดูอะไร?", tourDoneO: "อยากรู้เพิ่มเรื่องส่วนไหน? แตะ 🐦 ข้าง ๆ ส่วนนั้น", page: "🔎 หาหน้า", how: "🎓 ใช้ฟีเจอร์ยังไง…", none: "🤔 ไม่ใช่ทั้งสองอย่าง",
      noneA: "งั้นไปหานกกระจอกตัวนั้น (Sparrow) นะ 🐦", pageA: "แตะหน้าที่ต้องการ แล้วฉันจะบินพาไป", here: "อยู่นี่ไง นี่คือที่หาอยู่ใช่ไหม?",
      howA: "เลือกตรงนี้สักอัน ฉันจะพาทำทีละขั้น หรือถาม AI ก็ได้", sulky: "ไม่ต้องการฉันเหรอ…? ก็ได้", hide: "ซ่อนนกกระจอกน้อย", show: "นกกระจอกน้อย", call: "เรียกนกกระจอกน้อยมาอธิบาย",
      msg: "มีข้อความถึงคุณ 💌 แตะ 📋 มุมขวาบน", got: "เข้าใจแล้ว", from: "จาก Sparrow", oGreet: "หวัดดี {name}! ฉันคือนกกระจอกน้อย ถ้าฉันสอนไม่ได้ ไปหา Sparrow ตัวนั้นนะ 😄" },
    ar: { napThink: "أوه لا! All Out مرة أخرى… 😵‍💫 كونوا جميعًا حذرين جدًا. لم أعد أحتمل، سأنسحب أولًا…", callBtn: "هذا 🐦 يناديني — اضغط عليه وسأشرح تلك الميزة فقط.", greet: "مرحبًا! أنا العصفور الصغير 🐦 هل تحتاج مساعدة؟", greet2: "حسنًا! عمّ تبحث؟", tourQ: "مرحبًا! أنا العصفور الصغير 🐦 هل تريد جولة سريعة في هذه الصفحة؟", tourQo: "🐦 هل تريد جولة سريعة في صفحة الضباط؟", ob01: "← العودة إلى الموقع الرئيسي (الأدلة، التقويم، الإعلانات).", ob02: "🌐 لغة كل تبويبات الضباط: 中文، English، Português، العربية، 한국어.", ob03: "الوضع الفاتح / الداكن.", ob04: "🔗 ينسخ رابط التبويب الحالي — مفيد لإرسال ضابط آخر إليه مباشرة.", ob05: "↻ تحديث: يحمّل أحدث نسخة (وأحدث البيانات المحفوظة).", ob06: "👤 أنت، مسجّل الدخول عبر Discord. اضغط اسمك لتغيير كيف يراه الضباط الآخرون؛ وتسجيل الخروج بجانبه.", ob07: "📑 التبويبات المتاحة لك. كل ضابط يرى فقط ما يمنحه جدول 👥 — إن نقص تبويب فاسأل مشرفًا.", ob08: "🐦 هذا الزر بجانب كل ميزة. اضغطه وسأشرح تلك الميزة فقط.", ob09: "💬 اسأل الذكاء الاصطناعي أي شيء عن صفحات الضباط — يجيب فقط من التبويبات التي تستطيع فتحها.", obDone: "هذه صفحة الضباط! اختر جولة تبويب، أو اضغط أي 🐦 لميزة واحدة.", tourYes: "👀 نعم، أرني", tourNo: "لا، شكرًا", tourDone: "هذه هي الصفحة! ماذا تريد بعد ذلك؟", tourDoneO: "تريد المزيد عن جزء ما؟ اضغط 🐦 بجانبه.", page: "🔎 البحث عن صفحة", how: "🎓 كيف أستخدم…", none: "🤔 لا هذا ولا ذاك",
      noneA: "إذًا اذهب إلى ذلك العصفور (Sparrow) 🐦", pageA: "اضغط على الصفحة التي تريدها وسأطير إليها.", here: "ها هي. هذا ما كنت تبحث عنه، صحيح؟",
      howA: "اختر واحدًا هنا وسأرشدك خطوة بخطوة. أو اسأل الذكاء الاصطناعي.", sulky: "لا تحتاجني…؟ حسنًا.", hide: "إخفاء العصفور الصغير", show: "العصفور الصغير", call: "نادِ العصفور الصغير ليشرح",
      msg: "لديك رسالة 💌 اضغط على 📋 في الأعلى يمينًا.", got: "فهمت", from: "من Sparrow", oGreet: "مرحبًا {name}! أنا العصفور الصغير. اضغط عليّ لجولة في أي تبويب، أو على 🐦 بجانب أي ميزة لأشرحها وحدها. إن لم أستطع تعليمك شيئًا، اذهب إلى Sparrow تلك 😄" },
  };
  const IS_TOOL = !IS_OFFICER && typeof langChosen === "undefined";   // a stand-alone tool page (calculators, booking / squad guide): language from <html lang>
  const lang = () => { if (typeof currentLang !== "undefined") return currentLang; if (IS_TOOL) { const l = (document.documentElement.lang || "en").toLowerCase().split("-")[0]; return T[l] ? l : "en"; } return ls.get("nxs-officer-lang") || "en"; };
  const t = (k) => (T[lang()] || T.en)[k] || T.en[k];

  /* ---------- guided tours: texts ---------- */
  const TT = {
    en: {
      tm01: "⏰ in the chat header opens My timers; tap it again to go back to the chat. Let me open it…",
      tm02: "‹ Chat goes back to the chat; your timers keep running.",
      tm03b: "🔧 If notifications stop coming, open this: it lists what usually goes wrong (blocked for the site, a system update, Focus mode, iPhone Home Screen app, battery saving) and how to fix each one.", tm03: "Notifications: timers run on this page, but your phone only pings you when notifications are on. 🔔 Turn on notifications asks once; after that Send a test sends a push in 15 seconds — leave the app to see the red badge.",
      tm03ios: "On iPhone, notifications only work from the installed app: Share → Add to Home Screen, open NXS from the new icon and come back here. Timers still run on this page meanwhile.",
      tm04: "🔄 Officers logged in with Discord get their timers and reminders on every device; sync now pushes right away.",
      tm05: "⚡ Quick start: your last Training time and Gathering set. One tap starts it again with the same time; ✕ forgets it.",
      tm06: "＋ Set a timer opens the form. Let me open it…",
      tm07: "What is it? Pick the category: Gathering, Troops Training, Building, Research, Master, Recruit, Pet, Feast, Healing, Governor Order, Fountain, Alliance Tech, Conquest, Caravan, Appointment — or Other, with a name.",
      tm08: "Some categories ask a second choice: which troops, resource, order or position. I'll pick Troops Training…",
      tm09: "🎖️ Noble Advisor buff on now: training is faster with it, so that time is remembered separately — it switches on by itself during your Noble Advisor slot.",
      tm10: "Time left in the game: type it as the game shows it — 2:45:12, 45:00 or 3d 07:51:57. Last time's value is filled in for Training and Gathering; Gathering gets ＋ Another march, one row per march. Some categories prefill the cooldown (Governor Orders, Conquest 9 h, Fountain 12 h, Alliance Tech attempts).",
      tm11: "🤝 Count alliance help: for Building, Research and Healing the helps you'll get are taken off the time — set your Embassy level and how many helps. Turn it on right after you start, before anyone has helped.",
      tm12: "Save starts the timer (Enter does the same); Cancel closes the form.",
      tm13: "📅 Appointment: pick your Chief Minister or Noble Advisor slot (next 24 h, 30 minutes each) and how early to remind you. While the slot is live, a buff-stack checklist appears at the top of the site.",
      tm14: "Your timers, soonest first: countdown, finish time, 📅 slot (on Building, Research and Training) suggests the matching Appointment slot, ✕ removes. Done timers stay for an hour.",
      tm15: "💡 After a Building, Research or Training timer, a card suggests the Appointment slot that fits: ＋ Remind me of this slot, or ＋ Remind me to book it when booking isn't open yet; Not now hides it.",
      tm16: "🎮 Game reminders: one row per event — Bear Hunt, Arena, Mystic Trial, Journey Supplies, Intel, Swordland, Tri-Alliance, Viking, Eternity's Reach, Cesares Fury — each with the date of the next one.",
      tm17: "Tap a time to turn that reminder on (orange with ✓); tap again to turn it off. The times are our alliance's event times in UTC, your local time in brackets.",
      tm18: "How early: at the time, or 1–60 minutes before.",
      tm19: "🧮 BT calculator opens the Bear Hunt rally calculator — tapping a Bear reminder opens it too.",
      tm20: "🛠️ Admin reminders (officers): the to-dos from the officer Events tab, sent on the day they're due at the hour you pick, and 📍 Outpost reminders 10 minutes before one of ours turns Vulnerable.",
      tm21: "🔔 Reminders at the top of the site lists the pushes received in the last 24 hours; tap one to open it, ✓ Clear empties the list.", pick: "What do you want to learn?", tmr: "⏰ Set a timer", rem: "🎮 Game reminders", inst: "📲 Install as an app", back: "‹ Back", next: "Next ›", done: "Done ✓", stop: "✕ Stop", also: "Want me to show {x} too?", alsoYes: "Yes, show me", alsoNo: "No thanks",
      h01: "📅 This week: events running now and coming up, with our times (shown in your own time). Tap a row to open its guide.", h02: "✅ Daily checklist: what's still left to do today.", h03: "📆 Calendar: every event day of the month. Tap a day to see what's on.", h04: "📢 Announcements from the officers, newest first.", h05: "📚 All guides: Event Guides and Growth Guides. Tap a group to pick a guide.", h06: "🌐 Change the language here.", h07: "💬 Ask the AI anything about the guides. ⏰ in its title bar = your timers and game reminders.", g01: "📖 This is the guide you're reading. Read it top to bottom, or just jump to the part you need.", g02: "The headings split the guide into parts (when, prep, who to send…). Skim them to find your part.", g03: "Hero cards: pick the line for your generation (Gen 1, 2, 3…) and use those heroes.", g04: "Boxes like this are rules or important tips — don't skip them.", g05: "Switch to another guide here.", g06: "💬 Not sure about something in this guide? Ask the AI.",
      si06: "📋 Officer page — only shows for officers.", si07: "📢 The newest announcement scrolls here. Tap it to read it.",
      site: "🧭 What the buttons on the site do", si01: "🌐 Language: tap one to read the whole site in that language.", si02: "🔗 Copies the link of the page you're on (shows ✓ when copied) — handy for sending a guide to someone.", si03: "↻ Refresh: loads the newest version of the site.", si04: "Light / dark mode: tap to switch.", si05: "💬 Ask the AI anything about the guides. The ⏰ in its title bar opens your timers and game reminders.",
      inst1: "This page shows how to install the site as an app. Read it carefully — on iPhone, notifications only work from the installed app." },
    zh: {
      tm01: "聊天標題列的 ⏰ 會打開「我的計時器」；再點一次就回到聊天。我來打開它…",
      tm02: "‹ 聊天 會回到聊天，你的計時器會繼續跑。",
      tm03b: "🔧 收不到通知的時候，打開這裡：常見的狀況（網站被封鎖、系統更新、專注模式、iPhone 主畫面 App、省電模式）和解決方法都在裡面。", tm03: "通知：計時器在這個頁面上運行，但只有開啟通知時手機才會提醒你。🔔 開啟通知 只會詢問一次；之後 發送測試 會在 15 秒後送出一則推播——離開 app 就能看到紅色標記。",
      tm03ios: "在 iPhone 上，通知只在已安裝的 app 裡有效：分享 → 加入主畫面，從新的圖示打開 NXS 再回到這裡。在這期間計時器仍會在這個頁面上運行。",
      tm04: "🔄 用 Discord 登入的官員，在每個裝置上都能看到自己的計時器和提醒；立即同步 會馬上推送。",
      tm05: "⚡ 快速開始：你上一次的訓練時間和採集設定。點一下就用同樣的時間再開一次；✕ 會把它忘掉。",
      tm06: "＋ 設定計時器 會打開表單。我來打開它…",
      tm07: "這是什麼？選一個類別：採集、訓練部隊、建造、研究、大師、招募、寵物、盛宴、治療、總督命令、生命之泉、聯盟科技、征服、商隊、任命——或者「其他」，並填上名稱。",
      tm08: "有些類別會要你再選一項：哪種部隊、資源、命令或職位。我選訓練部隊…",
      tm09: "🎖️ 貴族顧問加成生效中：有加成時訓練比較快，所以那個時間會另外記住——在你的貴族顧問時段內它會自動開啟。",
      tm10: "遊戲中的剩餘時間：照遊戲顯示的方式輸入——2:45:12、45:00 或 3d 07:51:57。訓練和採集會自動填入上次的值；採集有 ＋ 再一支行軍，一支行軍一列。有些類別會預填冷卻時間（總督命令、征服 9 h、生命之泉 12 h、聯盟科技次數）。",
      tm11: "🤝 計入聯盟幫助：建造、研究和治療會把你將獲得的幫助從時間裡扣掉——設定你的大使館等級和幫助次數。開始後馬上打開它，要在有人幫助之前。",
      tm12: "儲存 會啟動計時器（按 Enter 也一樣）；取消 會關閉表單。",
      tm13: "📅 任命：選你的首席大臣或貴族顧問時段（接下來 24 h，每段 30 分鐘）以及要提前多久提醒你。時段進行中時，網站最上方會出現一份加成疊加清單。",
      tm14: "你的計時器，最快到期的在前：倒數、結束時間、📅 時段（在建造、研究和訓練上）會建議對應的任命時段，✕ 會移除。完成的計時器會保留一小時。",
      tm15: "💡 建造、研究或訓練計時器結束後，會有一張卡片建議合適的任命時段：＋ 提醒我這個時段，或在還不能預約時 ＋ 提醒我去預約；先不要 會把它隱藏。",
      tm16: "🎮 遊戲提醒：每個活動一列——狩獵巨熊、競技場、秘境試煉、旅途補給、情報任務、聖劍爭奪、三盟爭霸、維京人的掠奪、遠征永恆、凱撒之怒——每個都附有下一場的日期。",
      tm17: "點一個時間就會開啟那個提醒（橘色加 ✓）；再點一次就關閉。這些時間是我們聯盟的活動時間，以 UTC 顯示，括號內是你的當地時間。",
      tm18: "提前多久：準時，或提前 1–60 分鐘。",
      tm19: "🧮 BT 計算器 會打開狩獵巨熊集結計算器——點巨熊提醒也會打開它。",
      tm20: "🛠️ 管理提醒（官員）：來自官員活動分頁的待辦事項，會在到期當天、你選的時刻送出，還有 📍 前哨提醒，在我們的前哨變成「可攻擊」前 10 分鐘送出。",
      tm21: "網站最上方的 🔔 提醒 會列出最近 24 小時收到的推播；點一則就會打開它，✓ 清除 會清空列表。", pick: "想學哪一個？", tmr: "⏰ 設定計時", rem: "🎮 遊戲提醒", inst: "📲 安裝成 App", back: "‹ 返回", next: "下一步 ›", done: "完成 ✓", stop: "✕ 停止", also: "要不要也順便講 {x}？", alsoYes: "好，講吧", alsoNo: "不用了",
      h01: "📅 本週：正在進行和即將開始的活動，附我們的時間（會換成你當地的時間）。點一列就打開那個攻略。", h02: "✅ 每日清單：今天還有哪些事沒做。", h03: "📆 行事曆：這個月每天有什麼活動。點某一天就看得到。", h04: "📢 幹部發的公告，最新的在最上面。", h05: "📚 所有攻略：活動攻略和成長攻略。點一組來選攻略。", h06: "🌐 在這裡換語言。", h07: "💬 攻略的問題都可以問 AI。它標題列的 ⏰ 是你的計時器和遊戲提醒。", g01: "📖 這是你正在看的攻略。可以從頭看到尾，也可以直接跳到你要的部分。", g02: "這些標題把攻略分成幾段（時間、準備、派誰…），掃一下就找得到你要的。", g03: "英雄卡：找你的世代那一行（第 1、2、3 代…），用那些英雄。", g04: "像這樣的框框是規則或重點提醒，不要跳過。", g05: "在這裡換到別的攻略。", g06: "💬 攻略裡有不懂的？問 AI。",
      si06: "📋 幹部頁面，只有幹部看得到這個按鈕。", si07: "📢 最新公告會在這裡跑馬燈，點一下就能看。",
      site: "🧭 網站上的按鈕是做什麼的", si01: "🌐 語言：點一個，整個網站就換成那個語言。", si02: "🔗 複製你現在這一頁的連結（複製好會顯示 ✓），要傳攻略給別人很方便。", si03: "↻ 重新整理：載入網站的最新版本。", si04: "淺色／深色模式：點一下切換。", si05: "💬 攻略的問題都可以問 AI。它標題列的 ⏰ 會打開你的計時器和遊戲提醒。",
      inst1: "這一頁教你把網站安裝成 App。請仔細看，iPhone 一定要從安裝好的 App 才收得到通知。" },
    ko: {
      tm01: "채팅 헤더의 ⏰ 를 누르면 내 타이머가 열려. 다시 누르면 채팅으로 돌아가. 내가 열어 볼게…",
      tm02: "‹ 채팅 을 누르면 채팅으로 돌아가고, 타이머는 계속 돌아가.",
      tm03b: "🔧 알림이 안 오면 여기를 열어 봐: 자주 생기는 문제(사이트 차단, 시스템 업데이트, 집중 모드, iPhone 홈 화면 앱, 배터리 절약)와 해결 방법이 있어.", tm03: "알림: 타이머는 이 페이지에서 돌아가지만, 알림을 켜야 폰이 알려 줘. 🔔 알림 켜기 는 한 번만 물어봐. 그다음 테스트 보내기 를 누르면 15초 뒤에 푸시가 와. 앱을 나가면 빨간 배지가 보여.",
      tm03ios: "iPhone에서는 설치된 앱에서만 알림이 돼. 공유 → 홈 화면에 추가 를 하고, 새 아이콘으로 NXS를 열어서 여기로 다시 와. 그동안에도 타이머는 이 페이지에서 계속 돌아가.",
      tm04: "🔄 Discord로 로그인한 관리자는 모든 기기에서 타이머와 알림을 볼 수 있어. 지금 동기화 를 누르면 바로 보내 줘.",
      tm05: "⚡ 빠른 시작: 마지막 훈련 시간과 채집 설정이야. 한 번 누르면 같은 시간으로 다시 시작하고, ✕ 를 누르면 잊어버려.",
      tm06: "＋ 타이머 설정 을 누르면 입력 폼이 열려. 내가 열어 볼게…",
      tm07: "무엇인지 고르기: 채집, 병력 훈련, 건설, 연구, 마스터, 모집, 펫, 연회, 치료, 총독 명령, 생명의 샘, 연맹 기술, 정복, 상단, 임명 중에서 골라. 아니면 기타 를 고르고 이름을 적어.",
      tm08: "어떤 분류는 하나 더 골라야 해. 어떤 병력인지, 자원인지, 명령인지, 직위인지. 나는 병력 훈련을 고를게…",
      tm09: "🎖️ 귀족 고문 버프 켜짐: 버프가 있으면 훈련이 더 빠르니까 그 시간은 따로 기억해 둬. 네 귀족 고문 시간대에는 자동으로 켜져.",
      tm10: "게임의 남은 시간: 게임에 나오는 대로 적어. 2:45:12, 45:00 또는 3d 07:51:57 처럼. 훈련과 채집은 지난번 값이 채워져 있어. 채집에는 ＋ 행군 추가 가 있어서 행군마다 한 줄씩이야. 어떤 분류는 쿨타임이 미리 채워져 (총독 명령, 정복 9 h, 생명의 샘 12 h, 연맹 기술 횟수).",
      tm11: "🤝 연맹 도움 계산: 건설, 연구, 치료는 네가 받을 도움을 시간에서 빼 줘. 대사관 레벨과 도움 횟수를 정해. 시작하자마자, 아무도 돕기 전에 켜 둬.",
      tm12: "저장 을 누르면 타이머가 시작돼 (Enter도 같아). 취소 는 폼을 닫아.",
      tm13: "📅 임명: 재상이나 귀족 고문 시간대를 고르고 (앞으로 24 h, 30분씩) 얼마나 미리 알려 줄지 정해. 시간대가 진행 중이면 사이트 맨 위에 버프 쌓기 체크리스트가 나타나.",
      tm14: "네 타이머, 빨리 끝나는 순서대로야. 카운트다운, 끝나는 시각, 📅 시간대 (건설, 연구, 훈련에 있음) 는 맞는 임명 시간대를 추천하고, ✕ 는 지워. 끝난 타이머는 한 시간 동안 남아 있어.",
      tm15: "💡 건설, 연구, 훈련 타이머가 끝나면 맞는 임명 시간대를 추천하는 카드가 떠. ＋ 이 시간대 알려 줘, 아직 예약이 안 열렸으면 ＋ 예약하라고 알려 줘 가 있고, 나중에 를 누르면 숨겨져.",
      tm16: "🎮 게임 알림: 이벤트마다 한 줄씩이야. 곰 사냥, 아레나, 신비한 시련, 여정 보급, 정보 임무, 소드랜드 결전, 삼국 연맹전, 바이킹의 복수, 영원의 손길, 케사르의 분노. 각각 다음 이벤트 날짜가 적혀 있어.",
      tm17: "시간을 누르면 그 알림이 켜져 (주황색에 ✓). 다시 누르면 꺼져. 시간은 우리 연맹의 이벤트 시간이고 UTC 기준이야. 괄호 안은 네 현지 시간이야.",
      tm18: "얼마나 미리: 정각에, 아니면 1–60분 전에.",
      tm19: "🧮 BT 계산기 를 누르면 곰 사냥 집결 계산기가 열려. 곰 알림을 눌러도 열려.",
      tm20: "🛠️ 관리 알림 (관리자용): 관리자 이벤트 탭의 할 일이 마감 당일, 네가 고른 시각에 와. 그리고 📍 전초기지 알림은 우리 전초기지가 취약 상태가 되기 10분 전에 와.",
      tm21: "사이트 맨 위의 🔔 알림 은 최근 24시간 동안 받은 푸시를 보여 줘. 하나를 누르면 열리고, ✓ 지우기 를 누르면 목록이 비워져.", pick: "무엇을 배울까요?", tmr: "⏰ 타이머 설정", rem: "🎮 게임 알림", inst: "📲 앱으로 설치", back: "‹ 뒤로", next: "다음 ›", done: "완료 ✓", stop: "✕ 중지", also: "{x}도 보여줄까요?", alsoYes: "응, 보여줘", alsoNo: "괜찮아",
      h01: "📅 이번 주: 진행 중이거나 곧 시작하는 이벤트와 우리 시간 (내 현지 시간으로 표시). 한 줄을 누르면 공략이 열려.", h02: "✅ 일일 체크리스트: 오늘 아직 남은 일.", h03: "📆 달력: 이번 달 매일의 이벤트. 날짜를 누르면 보여.", h04: "📢 간부 공지, 최신순.", h05: "📚 모든 공략: 이벤트 공략과 성장 공략. 그룹을 눌러 공략을 골라.", h06: "🌐 여기서 언어를 바꿔.", h07: "💬 공략에 대해 AI에게 뭐든 물어봐. 제목줄의 ⏰ = 내 타이머와 게임 알림.", g01: "📖 지금 읽는 공략이야. 처음부터 읽어도 되고 필요한 부분으로 바로 가도 돼.", g02: "제목들이 공략을 나눠 (시간, 준비, 누구를 보낼지…). 훑어보고 필요한 부분을 찾아.", g03: "영웅 카드: 내 세대 줄 (1, 2, 3세대…)을 찾아서 그 영웅을 써.", g04: "이런 상자는 규칙이나 중요한 팁이야. 건너뛰지 마.", g05: "여기서 다른 공략으로 바꿔.", g06: "💬 이 공략에서 모르는 게 있으면 AI에게 물어봐.",
      si06: "📋 간부 페이지 — 간부에게만 보여.", si07: "📢 최신 공지가 여기서 흘러가. 누르면 읽을 수 있어.",
      site: "🧭 사이트 버튼 설명", si01: "🌐 언어: 하나를 누르면 사이트 전체가 그 언어로 바뀌어.", si02: "🔗 지금 보는 페이지의 링크를 복사해 (복사되면 ✓). 공략을 누구에게 보낼 때 편해.", si03: "↻ 새로고침: 사이트의 최신 버전을 불러와.", si04: "라이트 / 다크 모드: 누르면 바뀌어.", si05: "💬 공략에 대해 AI에게 뭐든 물어봐. 제목줄의 ⏰ 는 내 타이머와 게임 알림을 열어.",
      inst1: "이 페이지는 사이트를 앱으로 설치하는 방법이에요. 아이폰은 설치한 앱에서만 알림이 와요. 꼼꼼히 읽어 주세요." },
    de: {
      tm01: "⏰ oben im Chat öffnet Meine Timer; tipp noch mal darauf, um zum Chat zurückzukommen. Ich öffne es mal…",
      tm02: "‹ Chat bringt dich zurück zum Chat; deine Timer laufen weiter.",
      tm03b: "🔧 Wenn keine Benachrichtigungen mehr kommen, öffne das hier: die üblichen Ursachen (für die Seite blockiert, Systemupdate, Fokus, iPhone-Home-Bildschirm-App, Energiesparen) und wie man sie behebt.", tm03: "Benachrichtigungen: Die Timer laufen auf dieser Seite, aber dein Handy meldet sich nur, wenn Benachrichtigungen an sind. 🔔 Benachrichtigungen einschalten fragt einmal; danach schickt Test senden in 15 Sekunden einen Push — verlass die App, um das rote Abzeichen zu sehen.",
      tm03ios: "Auf dem iPhone funktionieren Benachrichtigungen nur aus der installierten App: Teilen → Zum Home-Bildschirm, NXS über das neue Symbol öffnen und hierher zurückkommen. Die Timer laufen auf dieser Seite inzwischen weiter.",
      tm04: "🔄 Offiziere, die mit Discord angemeldet sind, bekommen ihre Timer und Erinnerungen auf jedem Gerät; Jetzt synchronisieren überträgt sie sofort.",
      tm05: "⚡ Schnellstart: deine letzte Truppentraining-Zeit und dein letztes Sammeln-Set. Ein Tipp startet es mit derselben Zeit noch mal; ✕ vergisst es.",
      tm06: "＋ Timer setzen öffnet das Formular. Ich öffne es mal…",
      tm07: "Was ist es? Wähl die Kategorie: Sammeln, Truppentraining, Bauen, Forschung, Meister, Rekrutieren, Haustier, Festmahl, Heilung, Gouverneursbefehl, Lebensquelle, Allianztechnologie, Eroberung, Karawane, Ernennung — oder Sonstiges, mit einem Namen.",
      tm08: "Manche Kategorien fragen nach einer zweiten Auswahl: welche Truppen, welche Ressource, welcher Befehl oder welche Position. Ich nehme Truppentraining…",
      tm09: "🎖️ Edler-Berater-Buff aktiv: Damit geht das Training schneller, deshalb wird diese Zeit separat gemerkt — es schaltet sich während deines Edler-Berater-Slots von selbst ein.",
      tm10: "Restzeit im Spiel: Tipp sie so ein, wie das Spiel sie anzeigt — 2:45:12, 45:00 oder 3d 07:51:57. Für Truppentraining und Sammeln ist der Wert vom letzten Mal schon eingetragen; bei Sammeln gibt es ＋ Weiterer Marsch, eine Zeile pro Marsch. Manche Kategorien füllen die Abklingzeit vor (Gouverneursbefehle, Eroberung 9 h, Lebensquelle 12 h, Allianztechnologie-Versuche).",
      tm11: "🤝 Allianzhilfe einrechnen: Bei Bauen, Forschung und Heilung werden die Hilfen, die du bekommst, von der Zeit abgezogen — stell dein Botschaft-Level und die Anzahl der Hilfen ein. Schalt es direkt nach dem Start ein, bevor jemand geholfen hat.",
      tm12: "Speichern startet den Timer (Enter macht dasselbe); Abbrechen schließt das Formular.",
      tm13: "📅 Ernennung: Wähl deinen Premierminister- oder Edler-Berater-Slot (nächste 24 h, je 30 Minuten) und wie früh du erinnert werden willst. Solange der Slot läuft, erscheint oben auf der Seite eine Buff-Stack-Checkliste.",
      tm14: "Deine Timer, die nächsten zuerst: Countdown, Endzeit, 📅 Slot (bei Bauen, Forschung und Truppentraining) schlägt den passenden Ernennungs-Slot vor, ✕ entfernt. Abgelaufene Timer bleiben eine Stunde stehen.",
      tm15: "💡 Nach einem Bauen-, Forschungs- oder Truppentraining-Timer schlägt eine Karte den passenden Ernennungs-Slot vor: ＋ An diesen Slot erinnern, oder ＋ Ans Buchen erinnern, wenn die Buchung noch nicht offen ist; Jetzt nicht blendet sie aus.",
      tm16: "🎮 Spiel-Erinnerungen: eine Zeile pro Event — Bärenjagd, Arena, Mystische Prüfung, Reiseproviant, Geheimdienstmissionen, Schwertland-Showdown, Dreier-Allianz-Konflikt, Wikinger-Vergeltung, Ewigkeitsgriff, Cesares' Zorn — jeweils mit dem Datum des nächsten.",
      tm17: "Tipp auf eine Uhrzeit, um diese Erinnerung einzuschalten (orange mit ✓); tipp noch mal, um sie auszuschalten. Die Zeiten sind die Event-Zeiten unserer Allianz in UTC, deine Ortszeit in Klammern.",
      tm18: "Wie früh: zur Uhrzeit selbst oder 1–60 Minuten davor.",
      tm19: "🧮 BT-Rechner öffnet den Bärenjagd-Rally-Rechner — ein Tipp auf eine Bären-Erinnerung öffnet ihn auch.",
      tm20: "🛠️ Admin-Erinnerungen (Offiziere): die To-dos aus dem Events-Tab der Offiziere, am Fälligkeitstag zu der Stunde geschickt, die du wählst, und 📍 Außenposten-Erinnerungen 10 Minuten bevor einer von unseren Verwundbar wird.",
      tm21: "🔔 Erinnerungen oben auf der Seite listet die Pushes der letzten 24 Stunden; tipp auf einen, um ihn zu öffnen, ✓ Leeren leert die Liste.", pick: "Was willst du lernen?", tmr: "⏰ Timer stellen", rem: "🎮 Spiel-Erinnerungen", inst: "📲 Als App installieren", back: "‹ Zurück", next: "Weiter ›", done: "Fertig ✓", stop: "✕ Stopp", also: "Soll ich dir auch {x} zeigen?", alsoYes: "Ja, zeig mir", alsoNo: "Nein danke",
      h01: "📅 Diese Woche: laufende und kommende Events mit unseren Zeiten (in deiner Ortszeit). Tipp eine Zeile für den Guide.", h02: "✅ Tages-Checkliste: was heute noch offen ist.", h03: "📆 Kalender: alle Event-Tage des Monats. Tipp einen Tag an.", h04: "📢 Ankündigungen der Offiziere, neueste zuerst.", h05: "📚 Alle Guides: Event-Guides und Wachstums-Guides. Tipp eine Gruppe, um einen Guide zu wählen.", h06: "🌐 Hier die Sprache ändern.", h07: "💬 Frag die KI alles zu den Guides. ⏰ in ihrer Titelleiste = deine Timer und Spiel-Erinnerungen.", g01: "📖 Das ist der Guide, den du liest. Von oben nach unten lesen oder direkt zum passenden Teil springen.", g02: "Die Überschriften teilen den Guide (wann, Vorbereitung, wen schicken…). Überfliegen und deinen Teil finden.", g03: "Heldenkarten: nimm die Zeile deiner Generation (Gen 1, 2, 3…) und diese Helden.", g04: "Solche Kästen sind Regeln oder wichtige Tipps – nicht überspringen.", g05: "Hier zu einem anderen Guide wechseln.", g06: "💬 Etwas unklar in diesem Guide? Frag die KI.",
      si06: "📋 Offiziersseite — nur für Offiziere sichtbar.", si07: "📢 Die neueste Ankündigung läuft hier durch. Tippen zum Lesen.",
      site: "🧭 Was die Knöpfe der Seite tun", si01: "🌐 Sprache: tippen, um die ganze Seite in dieser Sprache zu lesen.", si02: "🔗 Kopiert den Link der aktuellen Seite (zeigt ✓) — praktisch, um jemandem einen Guide zu schicken.", si03: "↻ Aktualisieren: lädt die neueste Version der Seite.", si04: "Hell / dunkel: tippen zum Umschalten.", si05: "💬 Frag die KI alles zu den Guides. Das ⏰ in ihrer Titelleiste öffnet deine Timer und Spiel-Erinnerungen.",
      inst1: "Diese Seite zeigt, wie du die Seite als App installierst. Lies sie genau – auf dem iPhone gibt es Benachrichtigungen nur in der App." },
    fr: {
      tm01: "⏰ en haut du chat ouvre Mes minuteurs ; touche-le encore pour revenir au chat. Je l'ouvre…",
      tm02: "‹ Chat ramène au chat ; tes minuteurs continuent de tourner.",
      tm03b: "🔧 Si les notifications n'arrivent plus, ouvre ceci : les causes habituelles (bloquées pour le site, mise à jour, mode Concentration, appli iPhone sur l'écran d'accueil, économie de batterie) et comment les régler.", tm03: "Notifications : les minuteurs tournent sur cette page, mais ton téléphone ne te prévient que si les notifications sont activées. 🔔 Activer les notifications demande une fois ; ensuite Envoyer un test envoie une notification push dans 15 secondes — quitte l'appli pour voir le badge rouge.",
      tm03ios: "Sur iPhone, les notifications ne marchent que depuis l'appli installée : Partager → Sur l'écran d'accueil, ouvre NXS depuis la nouvelle icône et reviens ici. En attendant, les minuteurs tournent quand même sur cette page.",
      tm04: "🔄 Les officiers connectés avec Discord retrouvent leurs minuteurs et rappels sur tous leurs appareils ; Synchroniser maintenant les envoie tout de suite.",
      tm05: "⚡ Démarrage rapide : ton dernier temps d'Entraînement des troupes et ton dernier jeu de Collecte. Une touche le relance avec le même temps ; ✕ l'oublie.",
      tm06: "＋ Créer un minuteur ouvre le formulaire. Je l'ouvre…",
      tm07: "C'est quoi ? Choisis la catégorie : Collecte, Entraînement des troupes, Construction, Recherche, Maître, Recruter, Familier, Festin, Soins, Ordre du gouverneur, Fontaine de vie, Technologie d'alliance, Conquête, Caravane, Nomination — ou Autre, avec un nom.",
      tm08: "Certaines catégories demandent un second choix : quelles troupes, quelle ressource, quel ordre ou quel poste. Je prends Entraînement des troupes…",
      tm09: "🎖️ Bonus Conseiller noble actif : l'entraînement est plus rapide avec, donc ce temps est mémorisé à part — il s'active tout seul pendant ton créneau de Conseiller noble.",
      tm10: "Temps restant dans le jeu : tape-le comme le jeu l'affiche — 2:45:12, 45:00 ou 3d 07:51:57. La valeur de la dernière fois est pré-remplie pour l'Entraînement des troupes et la Collecte ; la Collecte a ＋ Une autre marche, une ligne par marche. Certaines catégories pré-remplissent le temps de recharge (Ordres du gouverneur, Conquête 9 h, Fontaine de vie 12 h, tentatives de Technologie d'alliance).",
      tm11: "🤝 Compter l'aide d'alliance : pour Construction, Recherche et Soins, les aides que tu vas recevoir sont déduites du temps — règle ton niveau d'Ambassade et le nombre d'aides. Active-le juste après le lancement, avant que quelqu'un ait aidé.",
      tm12: "Enregistrer lance le minuteur (Entrée fait pareil) ; Annuler ferme le formulaire.",
      tm13: "📅 Nomination : choisis ton créneau de Premier ministre ou de Conseiller noble (24 h à venir, 30 minutes chacun) et combien de temps à l'avance te rappeler. Pendant que le créneau est actif, une checklist de cumul de bonus apparaît en haut du site.",
      tm14: "Tes minuteurs, le plus proche d'abord : compte à rebours, heure de fin, 📅 créneau (sur Construction, Recherche et Entraînement des troupes) propose le créneau de Nomination qui correspond, ✕ supprime. Les minuteurs terminés restent une heure.",
      tm15: "💡 Après un minuteur de Construction, Recherche ou Entraînement des troupes, une carte propose le créneau de Nomination qui convient : ＋ Me rappeler ce créneau, ou ＋ Me rappeler de le réserver quand la réservation n'est pas encore ouverte ; Pas maintenant la masque.",
      tm16: "🎮 Rappels de jeu : une ligne par événement — Chasse à l'ours, Arène, Épreuve mystique, Provisions de voyage, Missions de renseignement, Affrontement de Swordland, Choc des trois alliances, Vengeance viking, Portée de l'éternité, Fureur de Cesares — chacun avec la date du prochain.",
      tm17: "Touche une heure pour activer ce rappel (orange avec ✓) ; touche encore pour le désactiver. Les heures sont celles des événements de notre alliance en UTC, ton heure locale entre parenthèses.",
      tm18: "Combien de temps à l'avance : à l'heure même, ou 1–60 minutes avant.",
      tm19: "🧮 Calculateur BT ouvre le calculateur de rallye Chasse à l'ours — toucher un rappel Ours l'ouvre aussi.",
      tm20: "🛠️ Rappels admin (officiers) : les tâches de l'onglet Événements des officiers, envoyées le jour de l'échéance à l'heure que tu choisis, et 📍 Rappels d'avant-poste 10 minutes avant qu'un des nôtres devienne Vulnérable.",
      tm21: "🔔 Rappels en haut du site liste les notifications push reçues dans les dernières 24 heures ; touches-en une pour l'ouvrir, ✓ Effacer vide la liste.", pick: "Tu veux apprendre quoi ?", tmr: "⏰ Mettre un minuteur", rem: "🎮 Rappels du jeu", inst: "📲 Installer en appli", back: "‹ Retour", next: "Suivant ›", done: "Terminé ✓", stop: "✕ Stop", also: "Je te montre aussi {x} ?", alsoYes: "Oui, montre-moi", alsoNo: "Non merci",
      h01: "📅 Cette semaine : les événements en cours et à venir, avec nos horaires (affichés dans ton heure locale). Touche une ligne pour son guide.", h02: "✅ Liste du jour : ce qu'il reste à faire aujourd'hui.", h03: "📆 Calendrier : tous les jours d'événement du mois. Touche un jour pour voir.", h04: "📢 Les annonces des officiers, les plus récentes en premier.", h05: "📚 Tous les guides : guides d'événements et guides de progression. Touche un groupe pour choisir.", h06: "🌐 Change la langue ici.", h07: "💬 Pose n'importe quelle question sur les guides à l'IA. Le ⏰ de sa barre = tes minuteurs et rappels de jeu.", g01: "📖 C'est le guide que tu lis. Lis-le de haut en bas ou va directement à la partie utile.", g02: "Les titres découpent le guide (quand, préparation, qui envoyer…). Survole-les pour trouver ta partie.", g03: "Cartes de héros : prends la ligne de ta génération (Gen 1, 2, 3…) et utilise ces héros.", g04: "Ces encadrés sont des règles ou des conseils importants — ne les saute pas.", g05: "Change de guide ici.", g06: "💬 Un doute sur ce guide ? Demande à l'IA.",
      si06: "📋 Page des officiers — visible seulement pour eux.", si07: "📢 La dernière annonce défile ici. Touche-la pour la lire.",
      site: "🧭 À quoi servent les boutons du site", si01: "🌐 Langue : touche-en une pour lire tout le site dans cette langue.", si02: "🔗 Copie le lien de la page actuelle (affiche ✓) — pratique pour envoyer un guide à quelqu'un.", si03: "↻ Actualiser : charge la version la plus récente du site.", si04: "Mode clair / sombre : touche pour changer.", si05: "💬 Pose n'importe quelle question sur les guides à l'IA. Le ⏰ de sa barre de titre ouvre tes minuteurs et rappels de jeu.",
      inst1: "Cette page montre comment installer le site en appli. Lis-la bien – sur iPhone, les notifications ne marchent que depuis l'appli installée." },
    pt: {
      tm01: "⏰ no cabeçalho do chat abre Meus timers; toque de novo para voltar ao chat. Deixa eu abrir…",
      tm02: "‹ Chat volta para o chat; seus timers continuam rodando.",
      tm03b: "🔧 Se as notificações pararem de chegar, abra aqui: os problemas mais comuns (bloqueadas para o site, atualização do sistema, modo Foco, app da Tela de Início no iPhone, economia de bateria) e como resolver cada um.", tm03: "Notificações: os timers rodam nesta página, mas seu celular só avisa você quando as notificações estão ativadas. 🔔 Ativar notificações pede permissão uma vez; depois disso, Enviar um teste manda um push em 15 segundos — saia do app para ver o selo vermelho.",
      tm03ios: "No iPhone, as notificações só funcionam a partir do app instalado: Compartilhar → Adicionar à Tela de Início, abra o NXS pelo novo ícone e volte aqui. Enquanto isso, os timers continuam rodando nesta página.",
      tm04: "🔄 Oficiais logados com o Discord têm seus timers e lembretes em todos os dispositivos; sincronizar agora envia na hora.",
      tm05: "⚡ Início rápido: seu último tempo de Treino e seu conjunto de Coleta. Um toque inicia de novo com o mesmo tempo; ✕ esquece.",
      tm06: "＋ Definir um timer abre o formulário. Deixa eu abrir…",
      tm07: "O que é? Escolha a categoria: Coleta, Treino de Tropas, Construção, Pesquisa, Mestre, Recrutar, Pet, Banquete, Cura, Ordem do Governador, Fonte, Tecnologia da Aliança, Conquista, Caravana, Nomeação — ou Outro, com um nome.",
      tm08: "Algumas categorias pedem uma segunda escolha: quais tropas, recurso, ordem ou posição. Vou escolher Treino de Tropas…",
      tm09: "🎖️ Buff de Conselheiro Nobre ativo: o treino é mais rápido com ele, então esse tempo é lembrado separadamente — ele liga sozinho durante seu horário de Conselheiro Nobre.",
      tm10: "Tempo restante no jogo: digite como o jogo mostra — 2:45:12, 45:00 ou 3d 07:51:57. O valor da última vez já vem preenchido para Treino e Coleta; Coleta ganha ＋ Outra marcha, uma linha por marcha. Algumas categorias preenchem o tempo de recarga (Ordens do Governador, Conquista 9 h, Fonte 12 h, tentativas de Tecnologia da Aliança).",
      tm11: "🤝 Contar ajudas da aliança: para Construção, Pesquisa e Cura, as ajudas que você vai receber são descontadas do tempo — defina o nível da sua Embaixada e quantas ajudas. Ative logo depois de iniciar, antes de alguém ajudar.",
      tm12: "Salvar inicia o timer (Enter faz o mesmo); Cancelar fecha o formulário.",
      tm13: "📅 Nomeação: escolha seu horário de Primeiro-Ministro ou Conselheiro Nobre (próximas 24 h, 30 minutos cada) e com quanta antecedência avisar você. Enquanto o horário estiver ativo, uma lista de buffs para acumular aparece no topo do site.",
      tm14: "Seus timers, o mais próximo primeiro: contagem regressiva, hora de término, 📅 horário (em Construção, Pesquisa e Treino) sugere o horário de Nomeação correspondente, ✕ remove. Timers concluídos ficam por uma hora.",
      tm15: "💡 Depois de um timer de Construção, Pesquisa ou Treino, um cartão sugere o horário de Nomeação que encaixa: ＋ Me lembrar deste horário, ou ＋ Me lembrar de reservar quando a reserva ainda não estiver aberta; Agora não esconde o cartão.",
      tm16: "🎮 Lembretes do jogo: uma linha por evento — Caçada ao Urso, Arena, Provação Mística, Suprimentos de Jornada, Missões de Inteligência, Swordland, Tri-Aliança, Viking, Alcance da Eternidade, Fúria de Cesares — cada um com a data do próximo.",
      tm17: "Toque em um horário para ativar esse lembrete (laranja com ✓); toque de novo para desativar. Os horários são os horários de evento da nossa aliança em UTC, com seu horário local entre parênteses.",
      tm18: "Com quanta antecedência: na hora, ou de 1 a 60 minutos antes.",
      tm19: "🧮 Calculadora BT abre a calculadora de rally da Caçada ao Urso — tocar em um lembrete do Urso também abre.",
      tm20: "🛠️ Lembretes de admin (oficiais): as tarefas da aba Eventos dos oficiais, enviadas no dia em que vencem na hora que você escolher, e 📍 lembretes de Posto Avançado 10 minutos antes de um dos nossos ficar Vulnerável.",
      tm21: "🔔 Lembretes no topo do site lista os pushes recebidos nas últimas 24 horas; toque em um para abrir, ✓ Limpar esvazia a lista.", pick: "O que você quer aprender?", tmr: "⏰ Criar um timer", rem: "🎮 Lembretes do jogo", inst: "📲 Instalar como app", back: "‹ Voltar", next: "Próximo ›", done: "Pronto ✓", stop: "✕ Parar", also: "Quer que eu mostre {x} também?", alsoYes: "Sim, mostra", alsoNo: "Não, obrigado",
      h01: "📅 Esta semana: eventos acontecendo agora e os próximos, com nossos horários (no seu horário local). Toque numa linha para abrir o guia.", h02: "✅ Checklist diário: o que ainda falta fazer hoje.", h03: "📆 Calendário: todos os dias de evento do mês. Toque num dia para ver.", h04: "📢 Anúncios dos oficiais, os mais novos primeiro.", h05: "📚 Todos os guias: guias de eventos e guias de crescimento. Toque num grupo para escolher.", h06: "🌐 Troque o idioma aqui.", h07: "💬 Pergunte à IA qualquer coisa sobre os guias. O ⏰ na barra dela = seus timers e lembretes do jogo.", g01: "📖 Este é o guia que você está lendo. Leia de cima a baixo ou pule para a parte que precisa.", g02: "Os títulos dividem o guia (quando, preparação, quem mandar…). Passe o olho para achar sua parte.", g03: "Cartas de heróis: pegue a linha da sua geração (Gen 1, 2, 3…) e use esses heróis.", g04: "Caixas assim são regras ou dicas importantes — não pule.", g05: "Troque de guia aqui.", g06: "💬 Dúvida sobre este guia? Pergunte à IA.",
      si06: "📋 Página dos oficiais — só aparece para oficiais.", si07: "📢 O anúncio mais novo passa aqui. Toque para ler.",
      site: "🧭 O que fazem os botões do site", si01: "🌐 Idioma: toque em um para ler o site inteiro nesse idioma.", si02: "🔗 Copia o link da página atual (mostra ✓) — prático para mandar um guia a alguém.", si03: "↻ Atualizar: carrega a versão mais nova do site.", si04: "Modo claro / escuro: toque para trocar.", si05: "💬 Pergunte qualquer coisa sobre os guias à IA. O ⏰ na barra de título abre seus timers e lembretes do jogo.",
      inst1: "Esta página mostra como instalar o site como app. Leia com atenção — no iPhone, as notificações só funcionam pelo app instalado." },
    es: {
      tm01: "⏰ en el encabezado del chat abre Mis temporizadores; tócalo de nuevo para volver al chat. Déjame abrirlo…",
      tm02: "‹ Chat vuelve al chat; tus temporizadores siguen corriendo.",
      tm03b: "🔧 Si dejan de llegar las notificaciones, abre esto: los fallos más comunes (bloqueadas para el sitio, actualización del sistema, modo Concentración, app de la pantalla de inicio en iPhone, ahorro de batería) y cómo arreglarlos.", tm03: "Notificaciones: los temporizadores corren en esta página, pero tu teléfono solo te avisa cuando las notificaciones están activadas. 🔔 Activar notificaciones pide permiso una vez; después, Enviar una prueba manda un push en 15 segundos — sal de la app para ver la insignia roja.",
      tm03ios: "En iPhone, las notificaciones solo funcionan desde la app instalada: Compartir → Agregar a pantalla de inicio, abre NXS desde el nuevo ícono y vuelve aquí. Mientras tanto, los temporizadores siguen corriendo en esta página.",
      tm04: "🔄 Los oficiales conectados con Discord tienen sus temporizadores y recordatorios en todos sus dispositivos; sincronizar ahora los envía de inmediato.",
      tm05: "⚡ Inicio rápido: tu último tiempo de Entrenamiento y tu conjunto de Recolección. Un toque lo inicia de nuevo con el mismo tiempo; ✕ lo olvida.",
      tm06: "＋ Crear un temporizador abre el formulario. Déjame abrirlo…",
      tm07: "¿Qué es? Elige la categoría: Recolección, Entrenamiento de Tropas, Construcción, Investigación, Maestro, Reclutar, Mascota, Banquete, Curación, Orden del Gobernador, Fuente, Tecnología de Alianza, Conquista, Caravana, Nombramiento — u Otro, con un nombre.",
      tm08: "Algunas categorías piden una segunda elección: qué tropas, recurso, orden o posición. Voy a elegir Entrenamiento de Tropas…",
      tm09: "🎖️ Buff de Consejero Noble activo: el entrenamiento es más rápido con él, así que ese tiempo se recuerda por separado — se activa solo durante tu turno de Consejero Noble.",
      tm10: "Tiempo restante en el juego: escríbelo como lo muestra el juego — 2:45:12, 45:00 o 3d 07:51:57. El valor de la última vez ya viene puesto para Entrenamiento y Recolección; Recolección tiene ＋ Otra marcha, una fila por marcha. Algunas categorías rellenan el tiempo de espera (Órdenes del Gobernador, Conquista 9 h, Fuente 12 h, intentos de Tecnología de Alianza).",
      tm11: "🤝 Contar ayudas de la alianza: para Construcción, Investigación y Curación, las ayudas que vas a recibir se descuentan del tiempo — pon el nivel de tu Embajada y cuántas ayudas. Actívalo justo después de empezar, antes de que alguien haya ayudado.",
      tm12: "Guardar inicia el temporizador (Enter hace lo mismo); Cancelar cierra el formulario.",
      tm13: "📅 Nombramiento: elige tu turno de Primer Ministro o Consejero Noble (próximas 24 h, 30 minutos cada uno) y con cuánta anticipación avisarte. Mientras el turno está activo, aparece una lista de buffs para acumular en la parte superior del sitio.",
      tm14: "Tus temporizadores, el más próximo primero: cuenta regresiva, hora de fin, 📅 turno (en Construcción, Investigación y Entrenamiento) sugiere el turno de Nombramiento que corresponde, ✕ elimina. Los temporizadores terminados se quedan una hora.",
      tm15: "💡 Después de un temporizador de Construcción, Investigación o Entrenamiento, una tarjeta sugiere el turno de Nombramiento que encaja: ＋ Recordarme este turno, o ＋ Recordarme reservarlo cuando la reserva todavía no esté abierta; Ahora no la oculta.",
      tm16: "🎮 Recordatorios del juego: una fila por evento — Caza del Oso, Arena, Prueba Mística, Suministros de Viaje, Misiones de Inteligencia, Swordland, Tri-Alianza, Vikinga, Alcance de la Eternidad, Furia de Cesares — cada uno con la fecha del próximo.",
      tm17: "Toca una hora para activar ese recordatorio (naranja con ✓); tócala de nuevo para desactivarlo. Las horas son las de los eventos de nuestra alianza en UTC, con tu hora local entre paréntesis.",
      tm18: "Con cuánta anticipación: a la hora, o de 1 a 60 minutos antes.",
      tm19: "🧮 Calculadora BT abre la calculadora de rally de la Caza del Oso — tocar un recordatorio del Oso también la abre.",
      tm20: "🛠️ Recordatorios de admin (oficiales): las tareas de la pestaña Eventos de oficiales, enviadas el día que vencen a la hora que elijas, y 📍 recordatorios de Puesto de Avanzada 10 minutos antes de que uno de los nuestros se vuelva Vulnerable.",
      tm21: "🔔 Recordatorios en la parte superior del sitio muestra los pushes recibidos en las últimas 24 horas; toca uno para abrirlo, ✓ Borrar vacía la lista.", pick: "¿Qué quieres aprender?", tmr: "⏰ Poner un temporizador", rem: "🎮 Recordatorios del juego", inst: "📲 Instalar como app", back: "‹ Atrás", next: "Siguiente ›", done: "Listo ✓", stop: "✕ Parar", also: "¿Te muestro también {x}?", alsoYes: "Sí, muéstrame", alsoNo: "No, gracias",
      h01: "📅 Esta semana: eventos en curso y próximos, con nuestros horarios (en tu hora local). Toca una fila para abrir su guía.", h02: "✅ Lista diaria: lo que aún queda por hacer hoy.", h03: "📆 Calendario: todos los días de eventos del mes. Toca un día para verlo.", h04: "📢 Anuncios de los oficiales, los más nuevos primero.", h05: "📚 Todas las guías: guías de eventos y de crecimiento. Toca un grupo para elegir.", h06: "🌐 Cambia el idioma aquí.", h07: "💬 Pregúntale a la IA lo que quieras sobre las guías. El ⏰ de su barra = tus temporizadores y recordatorios.", g01: "📖 Esta es la guía que estás leyendo. Léela de arriba abajo o salta a la parte que necesites.", g02: "Los títulos dividen la guía (cuándo, preparación, a quién enviar…). Échales un vistazo para encontrar tu parte.", g03: "Cartas de héroes: elige la fila de tu generación (Gen 1, 2, 3…) y usa esos héroes.", g04: "Los recuadros así son reglas o consejos importantes — no los saltes.", g05: "Cambia de guía aquí.", g06: "💬 ¿Dudas con esta guía? Pregúntale a la IA.",
      si06: "📋 Página de oficiales — solo la ven los oficiales.", si07: "📢 El anuncio más reciente pasa por aquí. Tócalo para leerlo.",
      site: "🧭 Qué hacen los botones del sitio", si01: "🌐 Idioma: toca uno para leer todo el sitio en ese idioma.", si02: "🔗 Copia el enlace de la página actual (muestra ✓) — útil para enviar una guía a alguien.", si03: "↻ Actualizar: carga la versión más nueva del sitio.", si04: "Modo claro / oscuro: toca para cambiar.", si05: "💬 Pregúntale a la IA lo que quieras sobre las guías. El ⏰ de su barra de título abre tus temporizadores y recordatorios del juego.",
      inst1: "Esta página explica cómo instalar el sitio como app. Léela bien: en iPhone, las notificaciones solo funcionan desde la app instalada." },
    tr: {
      tm01: "Sohbet başlığındaki ⏰ Zamanlayıcılarım'ı açar; tekrar dokununca sohbete dönersin. Açıyorum…",
      tm02: "‹ Sohbet seni sohbete geri götürür; zamanlayıcıların çalışmaya devam eder.",
      tm03b: "🔧 Bildirimler gelmezse burayı aç: sık görülen sorunlar (site için engelli, sistem güncellemesi, Odak modu, iPhone Ana Ekran uygulaması, pil tasarrufu) ve çözümleri.", tm03: "Bildirimler: zamanlayıcılar bu sayfada çalışır ama telefonun sana ancak bildirimler açıkken ses verir. 🔔 Bildirimleri aç bir kez izin ister; sonrasında Test gönder 15 saniye içinde bir bildirim yollar — kırmızı rozeti görmek için uygulamadan çık.",
      tm03ios: "iPhone'da bildirimler yalnızca yüklü uygulamadan çalışır: Paylaş → Ana Ekrana Ekle, NXS'i yeni simgeden aç ve buraya geri dön. Bu arada zamanlayıcılar bu sayfada çalışmaya devam eder.",
      tm04: "🔄 Discord ile giriş yapan subaylar zamanlayıcılarını ve hatırlatıcılarını her cihazda görür; şimdi eşitle hemen gönderir.",
      tm05: "⚡ Hızlı başlat: son Birlik Eğitimi süren ve Toplama setin. Tek dokunuşla aynı süreyle yeniden başlar; ✕ unutturur.",
      tm06: "＋ Zamanlayıcı kur formu açar. Açıyorum…",
      tm07: "Bu ne? Kategoriyi seç: Toplama, Birlik Eğitimi, İnşaat, Araştırma, Usta, Askere Alma, Evcil Hayvan, Ziyafet, İyileştirme, Vali Emri, Hayat Çeşmesi, İttifak Teknolojisi, Fetih, Kervan, Atama — ya da bir adla Diğer.",
      tm08: "Bazı kategoriler ikinci bir seçim ister: hangi birlik, kaynak, emir ya da makam. Ben Birlik Eğitimi'ni seçiyorum…",
      tm09: "🎖️ Soylu Danışman buff'ı açık: onunla eğitim daha hızlı olduğundan bu süre ayrı hatırlanır — Soylu Danışman slotun sırasında kendiliğinden açılır.",
      tm10: "Oyunda kalan süre: oyunun gösterdiği gibi yaz — 2:45:12, 45:00 ya da 3d 07:51:57. Birlik Eğitimi ve Toplama için son değer hazır doldurulur; Toplama'da ＋ Başka yürüyüş var, her yürüyüş için bir satır. Bazı kategoriler bekleme süresini önceden doldurur (Vali Emirleri, Fetih 9 h, Hayat Çeşmesi 12 h, İttifak Teknolojisi denemeleri).",
      tm11: "🤝 İttifak yardımını say: İnşaat, Araştırma ve İyileştirme için alacağın yardımlar süreden düşülür — Elçilik seviyeni ve kaç yardım alacağını ayarla. Başlattıktan hemen sonra, kimse yardım etmeden aç.",
      tm12: "Kaydet zamanlayıcıyı başlatır (Enter da aynısını yapar); İptal formu kapatır.",
      tm13: "📅 Atama: Başbakan ya da Soylu Danışman slotunu (sonraki 24 h, her biri 30 dakika) ve ne kadar önce hatırlatılacağını seç. Slot aktifken sitenin en üstünde bir buff yığma kontrol listesi belirir.",
      tm14: "Zamanlayıcıların, en yakın önce: geri sayım, bitiş saati, 📅 slot (İnşaat, Araştırma ve Birlik Eğitimi'nde) uygun Atama slotunu önerir, ✕ kaldırır. Biten zamanlayıcılar bir saat kalır.",
      tm15: "💡 Bir İnşaat, Araştırma ya da Birlik Eğitimi zamanlayıcısından sonra bir kart uygun Atama slotunu önerir: ＋ Bu slotu hatırlat, ya da rezervasyon henüz açık değilse ＋ Rezervasyonu hatırlat; Şimdi değil kartı gizler.",
      tm16: "🎮 Oyun hatırlatıcıları: her etkinlik için bir satır — Ayı Avı, Arena, Mistik Sınav, Yolculuk Erzağı, İstihbarat Görevleri, Swordland Hesaplaşması, Üçlü İttifak Çatışması, Viking İntikamı, Sonsuzluğun Erişimi, Cesares'in Gazabı — her birinde bir sonrakinin tarihi.",
      tm17: "Bir saate dokununca o hatırlatıcı açılır (turuncu, ✓ ile); tekrar dokununca kapanır. Saatler ittifakımızın etkinlik saatleri, UTC olarak; parantez içinde senin yerel saatin.",
      tm18: "Ne kadar önce: tam zamanında ya da 1–60 dakika önce.",
      tm19: "🧮 BT hesaplayıcı Ayı Avı rally hesaplayıcısını açar — bir Ayı hatırlatıcısına dokunmak da açar.",
      tm20: "🛠️ Yönetici hatırlatıcıları (subaylar): subay Etkinlikler sekmesindeki yapılacaklar, vade gününde seçtiğin saatte gönderilir; ayrıca 📍 Karakol hatırlatıcıları, bizimkilerden biri Savunmasız olmadan 10 dakika önce.",
      tm21: "Sitenin en üstündeki 🔔 Hatırlatıcılar son 24 saatte alınan bildirimleri listeler; birine dokununca açılır, ✓ Temizle listeyi boşaltır.", pick: "Neyi öğrenmek istersin?", tmr: "⏰ Zamanlayıcı kur", rem: "🎮 Oyun hatırlatmaları", inst: "📲 Uygulama olarak yükle", back: "‹ Geri", next: "İleri ›", done: "Bitti ✓", stop: "✕ Durdur", also: "{x} de göstereyim mi?", alsoYes: "Evet, göster", alsoNo: "Gerek yok",
      h01: "📅 Bu hafta: şu an süren ve yaklaşan etkinlikler, bizim saatlerimizle (kendi yerel saatinde). Rehberi açmak için bir satıra dokun.", h02: "✅ Günlük liste: bugün hâlâ yapılacaklar.", h03: "📆 Takvim: ayın tüm etkinlik günleri. Görmek için bir güne dokun.", h04: "📢 Subayların duyuruları, en yenisi önce.", h05: "📚 Tüm rehberler: Etkinlik ve Gelişim rehberleri. Seçmek için bir gruba dokun.", h06: "🌐 Dili buradan değiştir.", h07: "💬 Rehberlerle ilgili her şeyi yapay zekâya sor. Başlıktaki ⏰ = zamanlayıcıların ve oyun hatırlatıcıların.", g01: "📖 Okuduğun rehber bu. Baştan sona oku ya da ihtiyacın olan kısma atla.", g02: "Başlıklar rehberi bölümlere ayırır (ne zaman, hazırlık, kimi gönder…). Göz gezdirip kendi kısmını bul.", g03: "Kahraman kartları: kendi neslinin satırını (Gen 1, 2, 3…) seç ve o kahramanları kullan.", g04: "Böyle kutular kural ya da önemli ipucudur — atlama.", g05: "Başka bir rehbere buradan geç.", g06: "💬 Bu rehberde emin olmadığın bir şey mi var? Yapay zekâya sor.",
      si06: "📋 Subay sayfası — yalnızca subaylar görür.", si07: "📢 En yeni duyuru burada kayar. Okumak için dokun.",
      site: "🧭 Sitedeki düğmeler ne işe yarar", si01: "🌐 Dil: birine dokun, tüm site o dilde açılır.", si02: "🔗 Bulunduğun sayfanın bağlantısını kopyalar (✓ gösterir) — birine rehber göndermek için kullanışlı.", si03: "↻ Yenile: sitenin en yeni sürümünü yükler.", si04: "Açık / koyu mod: değiştirmek için dokun.", si05: "💬 Rehberlerle ilgili her şeyi yapay zekâya sor. Başlık çubuğundaki ⏰ zamanlayıcılarını ve oyun hatırlatıcılarını açar.",
      inst1: "Bu sayfa siteyi uygulama olarak nasıl yükleyeceğini gösterir. Dikkatle oku — iPhone'da bildirimler yalnızca yüklü uygulamada çalışır." },
    id: {
      tm01: "⏰ di header chat membuka Timer saya; ketuk lagi untuk kembali ke chat. Aku bukakan…",
      tm02: "‹ Chat kembali ke chat; timer kamu tetap berjalan.",
      tm03b: "🔧 Kalau notifikasi berhenti masuk, buka ini: masalah yang biasa terjadi (diblokir untuk situs, pembaruan sistem, mode Fokus, aplikasi Layar Utama iPhone, penghemat baterai) dan cara mengatasinya.", tm03: "Notifikasi: timer berjalan di halaman ini, tapi ponselmu hanya berbunyi kalau notifikasi aktif. 🔔 Aktifkan notifikasi meminta izin sekali; setelah itu Kirim tes mengirim push dalam 15 detik — keluar dari aplikasi untuk melihat badge merahnya.",
      tm03ios: "Di iPhone, notifikasi hanya berfungsi dari aplikasi yang terpasang: Bagikan → Tambah ke Layar Utama, buka NXS dari ikon baru itu dan kembali ke sini. Sementara itu timer tetap berjalan di halaman ini.",
      tm04: "🔄 Perwira yang login dengan Discord mendapat timer dan pengingatnya di setiap perangkat; sinkronkan sekarang langsung mengirimnya.",
      tm05: "⚡ Mulai cepat: waktu Pelatihan Pasukan terakhir dan set Pengumpulan terakhirmu. Satu ketukan memulainya lagi dengan waktu yang sama; ✕ melupakannya.",
      tm06: "＋ Pasang timer membuka formulirnya. Aku bukakan…",
      tm07: "Apa ini? Pilih kategorinya: Pengumpulan, Pelatihan Pasukan, Pembangunan, Penelitian, Master, Rekrut, Hewan Peliharaan, Pesta, Penyembuhan, Perintah Gubernur, Mata Air Kehidupan, Teknologi Aliansi, Penaklukan, Karavan, Penunjukan — atau Lainnya, dengan nama.",
      tm08: "Beberapa kategori meminta pilihan kedua: pasukan, sumber daya, perintah, atau posisi yang mana. Aku pilih Pelatihan Pasukan…",
      tm09: "🎖️ Buff Penasihat Bangsawan aktif: pelatihan lebih cepat dengannya, jadi waktu itu diingat terpisah — ia menyala sendiri selama slot Penasihat Bangsawan kamu.",
      tm10: "Sisa waktu di game: ketik seperti yang ditampilkan game — 2:45:12, 45:00 atau 3d 07:51:57. Nilai terakhir sudah terisi untuk Pelatihan Pasukan dan Pengumpulan; Pengumpulan punya ＋ Pawai lain, satu baris per pawai. Beberapa kategori mengisi cooldown lebih dulu (Perintah Gubernur, Penaklukan 9 h, Mata Air Kehidupan 12 h, percobaan Teknologi Aliansi).",
      tm11: "🤝 Hitung bantuan aliansi: untuk Pembangunan, Penelitian, dan Penyembuhan, bantuan yang akan kamu terima dikurangkan dari waktunya — atur level Kedutaan kamu dan berapa bantuannya. Aktifkan tepat setelah memulai, sebelum ada yang membantu.",
      tm12: "Simpan memulai timer (Enter juga bisa); Batal menutup formulir.",
      tm13: "📅 Penunjukan: pilih slot Perdana Menteri atau Penasihat Bangsawan kamu (24 h ke depan, masing-masing 30 menit) dan seberapa awal pengingatnya. Saat slot berlangsung, daftar periksa tumpukan buff muncul di bagian atas situs.",
      tm14: "Timer kamu, yang paling dekat lebih dulu: hitung mundur, waktu selesai, 📅 slot (pada Pembangunan, Penelitian, dan Pelatihan Pasukan) menyarankan slot Penunjukan yang cocok, ✕ menghapus. Timer yang selesai tetap ada selama satu jam.",
      tm15: "💡 Setelah timer Pembangunan, Penelitian, atau Pelatihan Pasukan, sebuah kartu menyarankan slot Penunjukan yang pas: ＋ Ingatkan slot ini, atau ＋ Ingatkan untuk memesannya kalau pemesanan belum dibuka; Nanti saja menyembunyikannya.",
      tm16: "🎮 Pengingat game: satu baris per event — Perburuan Beruang, Arena, Ujian Mistik, Perbekalan Perjalanan, Misi Intel, Pertarungan Swordland, Bentrokan Tri-Aliansi, Pembalasan Viking, Jangkauan Keabadian, Amukan Cesares — masing-masing dengan tanggal event berikutnya.",
      tm17: "Ketuk sebuah waktu untuk mengaktifkan pengingat itu (oranye dengan ✓); ketuk lagi untuk mematikannya. Waktunya adalah waktu event aliansi kita dalam UTC, waktu lokalmu dalam tanda kurung.",
      tm18: "Seberapa awal: tepat waktu, atau 1–60 menit sebelumnya.",
      tm19: "🧮 Kalkulator BT membuka kalkulator rally Perburuan Beruang — mengetuk pengingat Beruang juga membukanya.",
      tm20: "🛠️ Pengingat admin (perwira): daftar tugas dari tab Event perwira, dikirim pada hari jatuh temponya pada jam yang kamu pilih, dan 📍 pengingat Pos Terdepan 10 menit sebelum salah satu milik kita menjadi Rentan.",
      tm21: "🔔 Pengingat di bagian atas situs menampilkan push yang diterima dalam 24 jam terakhir; ketuk salah satunya untuk membukanya, ✓ Bersihkan mengosongkan daftarnya.", pick: "Mau belajar yang mana?", tmr: "⏰ Pasang timer", rem: "🎮 Pengingat game", inst: "📲 Pasang sebagai aplikasi", back: "‹ Kembali", next: "Lanjut ›", done: "Selesai ✓", stop: "✕ Berhenti", also: "Mau aku tunjukkan {x} juga?", alsoYes: "Ya, tunjukkan", alsoNo: "Tidak perlu",
      h01: "📅 Minggu ini: event yang sedang berjalan dan yang akan datang, dengan jam kita (dalam waktu lokalmu). Ketuk satu baris untuk membuka panduannya.", h02: "✅ Daftar harian: yang masih belum dikerjakan hari ini.", h03: "📆 Kalender: semua hari event bulan ini. Ketuk satu hari untuk melihat.", h04: "📢 Pengumuman dari officer, yang terbaru di atas.", h05: "📚 Semua panduan: panduan event dan panduan pertumbuhan. Ketuk grup untuk memilih.", h06: "🌐 Ganti bahasa di sini.", h07: "💬 Tanyakan apa saja tentang panduan ke AI. ⏰ di bilah judulnya = timer dan pengingat game kamu.", g01: "📖 Ini panduan yang sedang kamu baca. Baca dari atas ke bawah atau langsung ke bagian yang kamu perlukan.", g02: "Judul-judul ini membagi panduan (kapan, persiapan, siapa yang dikirim…). Lihat sekilas untuk menemukan bagianmu.", g03: "Kartu hero: pilih baris generasimu (Gen 1, 2, 3…) dan pakai hero itu.", g04: "Kotak seperti ini adalah aturan atau tips penting — jangan dilewati.", g05: "Ganti ke panduan lain di sini.", g06: "💬 Ada yang kurang jelas di panduan ini? Tanya AI.",
      si06: "📋 Halaman officer — hanya muncul untuk officer.", si07: "📢 Pengumuman terbaru berjalan di sini. Ketuk untuk membaca.",
      site: "🧭 Fungsi tombol di situs", si01: "🌐 Bahasa: ketuk salah satu untuk membaca seluruh situs dalam bahasa itu.", si02: "🔗 Menyalin tautan halaman ini (muncul ✓) — praktis untuk mengirim panduan ke orang lain.", si03: "↻ Muat ulang: memuat versi terbaru situs.", si04: "Mode terang / gelap: ketuk untuk mengganti.", si05: "💬 Tanyakan apa saja tentang panduan ke AI. ⏰ di bilah judulnya membuka timer dan pengingat game kamu.",
      inst1: "Halaman ini menunjukkan cara memasang situs sebagai aplikasi. Baca baik-baik — di iPhone, notifikasi hanya berfungsi dari aplikasi yang terpasang." },
    ru: {
      tm01: "⏰ в шапке чата открывает Мои таймеры; нажми ещё раз, чтобы вернуться в чат. Сейчас открою…",
      tm02: "‹ Чат возвращает в чат; твои таймеры продолжают идти.",
      tm03b: "🔧 Если уведомления перестали приходить, откройте это: частые причины (заблокированы для сайта, обновление системы, режим «Фокус», приложение на экране «Домой» на iPhone, экономия заряда) и как их исправить.", tm03: "Уведомления: таймеры идут на этой странице, но телефон оповестит тебя только при включённых уведомлениях. 🔔 Включить уведомления спросит один раз; после этого Отправить тест пришлёт пуш через 15 секунд — выйди из приложения, чтобы увидеть красный значок.",
      tm03ios: "На iPhone уведомления работают только из установленного приложения: Поделиться → На экран «Домой», открой NXS с новой иконки и вернись сюда. Таймеры на этой странице тем временем продолжают идти.",
      tm04: "🔄 Офицеры, вошедшие через Discord, получают свои таймеры и напоминания на всех устройствах; Синхронизировать сейчас отправляет их сразу.",
      tm05: "⚡ Быстрый старт: твоё последнее время Обучения войск и набор Сбора. Одно нажатие запускает его снова с тем же временем; ✕ забывает его.",
      tm06: "＋ Поставить таймер открывает форму. Сейчас открою…",
      tm07: "Что это? Выбери категорию: Сбор, Обучение войск, Строительство, Исследование, Мастер, Набор, Питомец, Пир, Лечение, Указ губернатора, Источник жизни, Технологии альянса, Завоевание, Караван, Назначение — или Другое, с названием.",
      tm08: "Некоторые категории просят второй выбор: какие войска, ресурс, указ или должность. Я выберу Обучение войск…",
      tm09: "🎖️ Бафф Благородного советника включён: с ним обучение быстрее, поэтому это время запоминается отдельно — он включается сам во время твоего слота Благородного советника.",
      tm10: "Осталось времени в игре: введи так, как показывает игра — 2:45:12, 45:00 или 3d 07:51:57. Для Обучения войск и Сбора подставляется прошлое значение; у Сбора есть ＋ Ещё марш, по строке на каждый марш. Некоторые категории подставляют кулдаун (Указы губернатора, Завоевание 9 h, Источник жизни 12 h, попытки Технологий альянса).",
      tm11: "🤝 Учесть помощь альянса: для Строительства, Исследования и Лечения помощь, которую ты получишь, вычитается из времени — укажи уровень Посольства и сколько помощей. Включай сразу после запуска, пока никто ещё не помог.",
      tm12: "Сохранить запускает таймер (Enter делает то же самое); Отмена закрывает форму.",
      tm13: "📅 Назначение: выбери свой слот Премьер-министра или Благородного советника (ближайшие 24 h, по 30 минут каждый) и за сколько напомнить. Пока слот активен, вверху сайта появляется чеклист стака баффов.",
      tm14: "Твои таймеры, ближайшие первыми: обратный отсчёт, время окончания, 📅 слот (у Строительства, Исследования и Обучения войск) предлагает подходящий слот Назначения, ✕ удаляет. Завершённые таймеры остаются ещё час.",
      tm15: "💡 После таймера Строительства, Исследования или Обучения войск карточка предлагает подходящий слот Назначения: ＋ Напомнить об этом слоте или ＋ Напомнить забронировать, если бронирование ещё не открыто; Не сейчас скрывает её.",
      tm16: "🎮 Игровые напоминания: по строке на событие — Охота на медведя, Арена, Мистическое испытание, Припасы в дорогу, Разведмиссии, Схватка в Swordland, Столкновение трёх альянсов, Месть викингов, Предел вечности, Ярость Цезаря — у каждого дата следующего.",
      tm17: "Нажми на время, чтобы включить это напоминание (оранжевое с ✓); нажми ещё раз, чтобы выключить. Это время событий нашего альянса в UTC, твоё местное время в скобках.",
      tm18: "За сколько: в момент события или за 1–60 минут до него.",
      tm19: "🧮 BT калькулятор открывает калькулятор ралли для Охоты на медведя — нажатие на напоминание о Медведе тоже его открывает.",
      tm20: "🛠️ Админ-напоминания (офицеры): дела из вкладки События для офицеров, присылаются в день срока в выбранный тобой час, и 📍 напоминания об аванпостах за 10 минут до того, как один из наших станет Уязвимым.",
      tm21: "🔔 Напоминания вверху сайта показывают пуши, полученные за последние 24 часа; нажми на одно, чтобы открыть его, ✓ Очистить очищает список.", pick: "Чему научить?", tmr: "⏰ Поставить таймер", rem: "🎮 Игровые напоминания", inst: "📲 Установить как приложение", back: "‹ Назад", next: "Далее ›", done: "Готово ✓", stop: "✕ Стоп", also: "Показать ещё и {x}?", alsoYes: "Да, покажи", alsoNo: "Не нужно",
      h01: "📅 Эта неделя: события сейчас и скоро, с нашим временем (в вашем местном времени). Нажмите строку, чтобы открыть гайд.", h02: "✅ Ежедневный список: что ещё осталось сделать сегодня.", h03: "📆 Календарь: все дни событий за месяц. Нажмите на день.", h04: "📢 Объявления офицеров, сначала новые.", h05: "📚 Все гайды: по событиям и по развитию. Нажмите группу, чтобы выбрать гайд.", h06: "🌐 Здесь меняется язык.", h07: "💬 Спросите ИИ о чём угодно из гайдов. ⏰ в его заголовке = ваши таймеры и игровые напоминания.", g01: "📖 Это гайд, который вы читаете. Читайте сверху вниз или сразу переходите к нужной части.", g02: "Заголовки делят гайд на части (когда, подготовка, кого отправлять…). Пробегитесь по ним, чтобы найти свою.", g03: "Карточки героев: выберите строку своего поколения (Gen 1, 2, 3…) и используйте этих героев.", g04: "Такие блоки — правила или важные советы, не пропускайте их.", g05: "Здесь можно перейти к другому гайду.", g06: "💬 Что-то непонятно в этом гайде? Спросите ИИ.",
      si06: "📋 Страница офицеров — видна только офицерам.", si07: "📢 Здесь бежит самое новое объявление. Нажмите, чтобы прочитать.",
      site: "🧭 Что делают кнопки сайта", si01: "🌐 Язык: нажмите, чтобы читать весь сайт на этом языке.", si02: "🔗 Копирует ссылку на текущую страницу (появится ✓) — удобно, чтобы отправить кому-то гайд.", si03: "↻ Обновить: загружает самую новую версию сайта.", si04: "Светлая / тёмная тема: нажмите, чтобы переключить.", si05: "💬 Спросите ИИ о чём угодно из гайдов. ⏰ в его заголовке открывает ваши таймеры и игровые напоминания.",
      inst1: "Эта страница показывает, как установить сайт как приложение. Читай внимательно — на iPhone уведомления работают только из установленного приложения." },
    th: {
      tm01: "⏰ ที่หัวแชทจะเปิด ตัวจับเวลาของฉัน แตะอีกครั้งเพื่อกลับไปที่แชท เดี๋ยวฉันเปิดให้…",
      tm02: "‹ แชท จะพากลับไปที่แชท ตัวจับเวลาของคุณยังเดินต่อ",
      tm03b: "🔧 ถ้าการแจ้งเตือนไม่มา เปิดตรงนี้: มีปัญหาที่เจอบ่อย (เว็บถูกบล็อก อัปเดตระบบ โหมดโฟกัส แอปบนหน้าจอโฮม iPhone โหมดประหยัดแบต) และวิธีแก้แต่ละอย่าง", tm03: "การแจ้งเตือน: ตัวจับเวลาเดินอยู่บนหน้านี้ แต่มือถือจะเตือนคุณก็ต่อเมื่อเปิดการแจ้งเตือนไว้ 🔔 เปิดการแจ้งเตือน จะถามแค่ครั้งเดียว หลังจากนั้น ส่งทดสอบ จะส่งพุชใน 15 วินาที — ออกจากแอปเพื่อดูป้ายสีแดง",
      tm03ios: "บน iPhone การแจ้งเตือนใช้ได้จากแอปที่ติดตั้งแล้วเท่านั้น: แชร์ → เพิ่มไปยังหน้าจอโฮม เปิด NXS จากไอคอนใหม่แล้วกลับมาที่นี่ ระหว่างนั้นตัวจับเวลายังเดินอยู่บนหน้านี้",
      tm04: "🔄 นายทหารที่ล็อกอินด้วย Discord จะได้ตัวจับเวลาและการเตือนบนทุกอุปกรณ์ ซิงค์ตอนนี้ จะส่งทันที",
      tm05: "⚡ เริ่มด่วน: เวลา ฝึกทหาร ล่าสุดและชุด เก็บทรัพยากร ของคุณ แตะครั้งเดียวเพื่อเริ่มใหม่ด้วยเวลาเดิม ✕ จะลืมมัน",
      tm06: "＋ ตั้งตัวจับเวลา จะเปิดฟอร์ม เดี๋ยวฉันเปิดให้…",
      tm07: "คืออะไร? เลือกหมวด: เก็บทรัพยากร, ฝึกทหาร, ก่อสร้าง, วิจัย, มาสเตอร์, รับสมัคร, สัตว์เลี้ยง, งานเลี้ยง, รักษา, คำสั่งผู้ว่า, น้ำพุแห่งชีวิต, เทคโนโลยีพันธมิตร, การพิชิต, คาราวาน, การแต่งตั้ง — หรือ อื่นๆ พร้อมตั้งชื่อ",
      tm08: "บางหมวดจะถามตัวเลือกที่สอง: ทหารประเภทไหน ทรัพยากร คำสั่ง หรือตำแหน่งใด ฉันจะเลือก ฝึกทหาร…",
      tm09: "🎖️ บัฟ ที่ปรึกษาผู้สูงศักดิ์ เปิดอยู่: มีบัฟนี้แล้วฝึกเร็วขึ้น เวลานั้นจึงถูกจำแยกไว้ต่างหาก — มันจะเปิดเองในช่วงสล็อต ที่ปรึกษาผู้สูงศักดิ์ ของคุณ",
      tm10: "เวลาที่เหลือในเกม: พิมพ์ตามที่เกมแสดง — 2:45:12, 45:00 หรือ 3d 07:51:57 ค่าครั้งก่อนจะถูกใส่ให้สำหรับ ฝึกทหาร และ เก็บทรัพยากร โดย เก็บทรัพยากร จะมี ＋ เพิ่มเดินทัพ หนึ่งแถวต่อหนึ่งเดินทัพ บางหมวดจะใส่คูลดาวน์ให้ล่วงหน้า (คำสั่งผู้ว่า, การพิชิต 9 h, น้ำพุแห่งชีวิต 12 h, จำนวนครั้ง เทคโนโลยีพันธมิตร)",
      tm11: "🤝 นับความช่วยเหลือพันธมิตร: สำหรับ ก่อสร้าง, วิจัย และ รักษา ความช่วยเหลือที่คุณจะได้รับจะถูกหักออกจากเวลา — ตั้งเลเวล สถานทูต และจำนวนครั้งที่ช่วย เปิดทันทีหลังเริ่ม ก่อนที่จะมีใครมาช่วย",
      tm12: "บันทึก จะเริ่มตัวจับเวลา (กด Enter ก็ได้เหมือนกัน) ยกเลิก จะปิดฟอร์ม",
      tm13: "📅 การแต่งตั้ง: เลือกสล็อต อัครมหาเสนาบดี หรือ ที่ปรึกษาผู้สูงศักดิ์ ของคุณ (ภายใน 24 h ข้างหน้า สล็อตละ 30 นาที) และจะให้เตือนล่วงหน้าเท่าไหร่ ระหว่างที่สล็อตกำลังใช้งาน จะมีเช็กลิสต์ซ้อนบัฟปรากฏที่ด้านบนของเว็บไซต์",
      tm14: "ตัวจับเวลาของคุณ เรียงจากใกล้สุดก่อน: นับถอยหลัง เวลาเสร็จ 📅 สล็อต (ที่ ก่อสร้าง, วิจัย และ ฝึกทหาร) จะแนะนำสล็อต การแต่งตั้ง ที่เข้ากัน ✕ จะลบออก ตัวจับเวลาที่เสร็จแล้วจะยังอยู่อีกหนึ่งชั่วโมง",
      tm15: "💡 หลังตัวจับเวลา ก่อสร้าง, วิจัย หรือ ฝึกทหาร จะมีการ์ดแนะนำสล็อต การแต่งตั้ง ที่เหมาะ: ＋ เตือนฉันเรื่องสล็อตนี้ หรือ ＋ เตือนให้ฉันจอง เมื่อยังเปิดจองไม่ได้ ไม่ใช่ตอนนี้ จะซ่อนการ์ด",
      tm16: "🎮 เตือนกิจกรรมในเกม: หนึ่งแถวต่อกิจกรรม — ล่าหมี, อารีน่า, การทดสอบลึกลับ, เสบียงเดินทาง, ภารกิจข่าวกรอง, ศึก Swordland, ศึกสามพันธมิตร, การแก้แค้นของไวกิ้ง, ขอบเขตแห่งนิรันดร์, ความโกรธของเซซาเรส — แต่ละอันมีวันที่ของรอบถัดไป",
      tm17: "แตะเวลาเพื่อเปิดการเตือนนั้น (สีส้มพร้อม ✓) แตะอีกครั้งเพื่อปิด เวลาเหล่านี้คือเวลากิจกรรมของพันธมิตรเราใน UTC เวลาท้องถิ่นของคุณอยู่ในวงเล็บ",
      tm18: "เตือนล่วงหน้าเท่าไหร่: ตรงเวลา หรือก่อน 1–60 นาที",
      tm19: "🧮 เครื่องคิด BT จะเปิดเครื่องคำนวณรวมพล ล่าหมี — แตะการเตือน หมี ก็เปิดได้เหมือนกัน",
      tm20: "🛠️ เตือนงานแอดมิน (นายทหาร): สิ่งที่ต้องทำจากแท็บ กิจกรรม ของนายทหาร ส่งในวันครบกำหนดตามชั่วโมงที่คุณเลือก และ 📍 เตือนด่านหน้า 10 นาทีก่อนที่ด่านของเราจะกลายเป็น เปราะบาง",
      tm21: "🔔 การเตือน ที่ด้านบนของเว็บไซต์จะแสดงพุชที่ได้รับใน 24 ชั่วโมงล่าสุด แตะอันหนึ่งเพื่อเปิด ✓ ล้าง จะล้างรายการ", pick: "อยากเรียนอะไร?", tmr: "⏰ ตั้งตัวจับเวลา", rem: "🎮 แจ้งเตือนในเกม", inst: "📲 ติดตั้งเป็นแอป", back: "‹ กลับ", next: "ถัดไป ›", done: "เสร็จ ✓", stop: "✕ หยุด", also: "ให้ฉันพาดู {x} ด้วยไหม?", alsoYes: "เอาสิ พาดู", alsoNo: "ไม่เป็นไร",
      h01: "📅 สัปดาห์นี้: กิจกรรมที่กำลังเล่นและที่กำลังจะมา พร้อมเวลาของเรา (แสดงเป็นเวลาท้องถิ่นของคุณ) แตะแถวเพื่อเปิดไกด์", h02: "✅ เช็กลิสต์รายวัน: สิ่งที่ยังเหลือต้องทำวันนี้", h03: "📆 ปฏิทิน: วันกิจกรรมทั้งเดือน แตะวันเพื่อดู", h04: "📢 ประกาศจากเจ้าหน้าที่ ล่าสุดอยู่บนสุด", h05: "📚 ไกด์ทั้งหมด: ไกด์กิจกรรมและไกด์การเติบโต แตะกลุ่มเพื่อเลือกไกด์", h06: "🌐 เปลี่ยนภาษาที่นี่", h07: "💬 ถาม AI เรื่องไกด์ได้ทุกอย่าง ⏰ ที่แถบหัวเรื่อง = ตัวจับเวลาและการเตือนเกมของคุณ", g01: "📖 นี่คือไกด์ที่คุณกำลังอ่าน อ่านจากบนลงล่างหรือข้ามไปส่วนที่ต้องการได้เลย", g02: "หัวข้อเหล่านี้แบ่งไกด์เป็นส่วน ๆ (เมื่อไร เตรียมตัว ส่งใคร…) กวาดตาดูเพื่อหาส่วนของคุณ", g03: "การ์ดฮีโร่: เลือกแถวของเจนของคุณ (Gen 1, 2, 3…) แล้วใช้ฮีโร่เหล่านั้น", g04: "กล่องแบบนี้คือกฎหรือเคล็ดลับสำคัญ อย่าข้าม", g05: "เปลี่ยนไปไกด์อื่นที่นี่", g06: "💬 ไม่แน่ใจตรงไหนในไกด์นี้? ถาม AI",
      si06: "📋 หน้าเจ้าหน้าที่ — เห็นเฉพาะเจ้าหน้าที่", si07: "📢 ประกาศล่าสุดจะวิ่งอยู่ตรงนี้ แตะเพื่ออ่าน",
      site: "🧭 ปุ่มต่าง ๆ บนเว็บทำอะไร", si01: "🌐 ภาษา: แตะเพื่ออ่านทั้งเว็บเป็นภาษานั้น", si02: "🔗 คัดลอกลิงก์ของหน้านี้ (ขึ้น ✓ เมื่อคัดลอกแล้ว) สะดวกเวลาส่งไกด์ให้คนอื่น", si03: "↻ รีเฟรช: โหลดเว็บเวอร์ชันใหม่ล่าสุด", si04: "โหมดสว่าง / มืด: แตะเพื่อสลับ", si05: "💬 ถาม AI เรื่องไกด์ได้ทุกอย่าง ⏰ ที่แถบหัวเรื่องจะเปิดตัวจับเวลาและการเตือนเกมของคุณ",
      inst1: "หน้านี้สอนวิธีติดตั้งเว็บเป็นแอป อ่านให้ละเอียด — บน iPhone การแจ้งเตือนใช้ได้เฉพาะจากแอปที่ติดตั้งแล้ว" },
    ar: {
      tm01: "⏰ في رأس الدردشة يفتح مؤقتاتي؛ اضغط عليه مرة أخرى للعودة إلى الدردشة. دعني أفتحه…",
      tm02: "‹ الدردشة يعيدك إلى الدردشة؛ وتبقى مؤقتاتك تعمل.",
      tm03b: "🔧 إذا توقفت الإشعارات، افتح هذا: الأسباب الشائعة (محظورة للموقع، تحديث النظام، وضع التركيز، تطبيق الشاشة الرئيسية على iPhone، توفير البطارية) وطريقة حل كل منها.", tm03: "الإشعارات: المؤقتات تعمل على هذه الصفحة، لكن هاتفك لا ينبّهك إلا إذا كانت الإشعارات مفعّلة. 🔔 تفعيل الإشعارات يسأل مرة واحدة؛ وبعدها إرسال تجربة يرسل إشعارًا خلال 15 ثانية — اخرج من التطبيق لترى الشارة الحمراء.",
      tm03ios: "على iPhone، الإشعارات تعمل فقط من التطبيق المثبّت: مشاركة → إضافة إلى الشاشة الرئيسية، افتح NXS من الأيقونة الجديدة ثم عد إلى هنا. وفي هذه الأثناء تبقى المؤقتات تعمل على هذه الصفحة.",
      tm04: "🔄 الضباط الذين سجّلوا الدخول عبر Discord يحصلون على مؤقتاتهم وتذكيراتهم على كل الأجهزة؛ مزامنة الآن يرسلها فورًا.",
      tm05: "⚡ بداية سريعة: آخر وقت تدريب القوات وآخر مجموعة الجمع لديك. ضغطة واحدة تشغّلها من جديد بالوقت نفسه؛ ✕ ينساها.",
      tm06: "＋ ضبط مؤقت يفتح النموذج. دعني أفتحه…",
      tm07: "ما هو؟ اختر الفئة: الجمع، تدريب القوات، البناء، البحث، الخبير، التجنيد، الحيوان الأليف، الوليمة، العلاج، أمر الحاكم، نبع الحياة، تقنية التحالف، الفتح، القافلة، التعيين — أو أخرى، مع اسم.",
      tm08: "بعض الفئات تطلب اختيارًا ثانيًا: أي قوات أو مورد أو أمر أو منصب. سأختار تدريب القوات…",
      tm09: "🎖️ تعزيز المستشار النبيل مفعّل الآن: التدريب أسرع معه، لذا يُحفظ ذلك الوقت بشكل منفصل — ويُفعَّل من تلقاء نفسه خلال فترة المستشار النبيل الخاصة بك.",
      tm10: "الوقت المتبقي في اللعبة: اكتبه كما تعرضه اللعبة — 2:45:12 أو 45:00 أو 3d 07:51:57. القيمة السابقة تُملأ تلقائيًا لتدريب القوات والجمع؛ والجمع له ＋ مسيرة أخرى، صف لكل مسيرة. بعض الفئات تملأ وقت الانتظار مسبقًا (أوامر الحاكم، الفتح 9 h، نبع الحياة 12 h، محاولات تقنية التحالف).",
      tm11: "🤝 احتساب مساعدة التحالف: للبناء والبحث والعلاج تُخصم المساعدات التي ستحصل عليها من الوقت — حدد مستوى السفارة وعدد المساعدات. فعّله مباشرة بعد البدء، قبل أن يساعدك أحد.",
      tm12: "حفظ يشغّل المؤقت (Enter يفعل الشيء نفسه)؛ إلغاء يغلق النموذج.",
      tm13: "📅 التعيين: اختر فترة رئيس الوزراء أو المستشار النبيل الخاصة بك (خلال 24 h القادمة، 30 دقيقة لكل فترة) وموعد التذكير قبلها. وأثناء الفترة تظهر قائمة تحقق لتجميع التعزيزات أعلى الموقع.",
      tm14: "مؤقتاتك، الأقرب أولًا: العد التنازلي، وقت الانتهاء، 📅 فترة (في البناء والبحث وتدريب القوات) يقترح فترة التعيين المناسبة، ✕ يحذف. المؤقتات المنتهية تبقى لساعة.",
      tm15: "💡 بعد مؤقت بناء أو بحث أو تدريب قوات، تقترح بطاقة فترة التعيين المناسبة: ＋ ذكّرني بهذه الفترة، أو ＋ ذكّرني بحجزها عندما لا يكون الحجز مفتوحًا بعد؛ ليس الآن يخفيها.",
      tm16: "🎮 تذكيرات اللعبة: صف لكل حدث — صيد الدب، الساحة، التجربة الغامضة، مؤن الرحلة، مهام الاستخبارات، مواجهة أرض السيوف، صراع التحالفات الثلاثة، انتقام الفايكنج، مدى الأبدية، غضب سيزار — مع تاريخ الحدث القادم لكل منها.",
      tm17: "اضغط على وقت لتفعيل ذلك التذكير (برتقالي مع ✓)؛ اضغط مرة أخرى لإيقافه. الأوقات هي أوقات أحداث تحالفنا بتوقيت UTC، وتوقيتك المحلي بين قوسين.",
      tm18: "موعد التذكير: في الوقت نفسه، أو قبله بـ 1–60 دقيقة.",
      tm19: "🧮 حاسبة BT يفتح حاسبة حشد صيد الدب — والضغط على تذكير الدب يفتحها أيضًا.",
      tm20: "🛠️ تذكيرات الإدارة (للضباط): المهام من تبويب الأحداث الخاص بالضباط، تُرسل في يوم استحقاقها في الساعة التي تختارها، و📍 تذكيرات المواقع الأمامية قبل 10 دقائق من تحوّل أحد مواقعنا إلى ضعيف.",
      tm21: "🔔 التذكيرات أعلى الموقع يعرض الإشعارات المستلمة خلال آخر 24 ساعة؛ اضغط على أحدها لفتحه، ✓ مسح يفرغ القائمة.", pick: "ماذا تريد أن تتعلم؟", tmr: "⏰ ضبط مؤقّت", rem: "🎮 تذكيرات اللعبة", inst: "📲 التثبيت كتطبيق", back: "‹ رجوع", next: "التالي ›", done: "تم ✓", stop: "✕ إيقاف", also: "هل أريك {x} أيضًا؟", alsoYes: "نعم، أرني", alsoNo: "لا شكرًا",
      h01: "📅 هذا الأسبوع: الفعاليات الجارية والقادمة بمواعيدنا (بتوقيتك المحلي). اضغط سطرًا لفتح دليله.", h02: "✅ القائمة اليومية: ما تبقى لفعله اليوم.", h03: "📆 التقويم: كل أيام الفعاليات في الشهر. اضغط يومًا لترى.", h04: "📢 إعلانات الضباط، الأحدث أولًا.", h05: "📚 كل الأدلة: أدلة الفعاليات وأدلة التطور. اضغط مجموعة لاختيار دليل.", h06: "🌐 غيّر اللغة من هنا.", h07: "💬 اسأل الذكاء الاصطناعي أي شيء عن الأدلة. ⏰ في شريط عنوانه = مؤقتاتك وتذكيرات اللعبة.", g01: "📖 هذا هو الدليل الذي تقرؤه. اقرأه من الأعلى إلى الأسفل أو انتقل مباشرة للجزء الذي تحتاجه.", g02: "العناوين تقسّم الدليل إلى أجزاء (متى، التحضير، من نرسل…). ألقِ نظرة لتجد جزءك.", g03: "بطاقات الأبطال: اختر سطر جيلك (Gen 1، 2، 3…) واستخدم هؤلاء الأبطال.", g04: "المربعات مثل هذا قواعد أو نصائح مهمة — لا تتخطّها.", g05: "انتقل إلى دليل آخر من هنا.", g06: "💬 شيء غير واضح في هذا الدليل؟ اسأل الذكاء الاصطناعي.",
      si06: "📋 صفحة الضباط — تظهر للضباط فقط.", si07: "📢 أحدث إعلان يمرّ هنا. اضغطه لقراءته.",
      site: "🧭 ماذا تفعل أزرار الموقع", si01: "🌐 اللغة: اضغط لغة لقراءة الموقع كله بها.", si02: "🔗 ينسخ رابط الصفحة الحالية (تظهر ✓) — مفيد لإرسال دليل لأحد.", si03: "↻ تحديث: يحمّل أحدث نسخة من الموقع.", si04: "الوضع الفاتح / الداكن: اضغط للتبديل.", si05: "💬 اسأل الذكاء الاصطناعي أي شيء عن الأدلة. زر ⏰ في شريط عنوانه يفتح مؤقتاتك وتذكيرات اللعبة.",
      inst1: "هذه الصفحة تشرح تثبيت الموقع كتطبيق. اقرأها جيدًا — على iPhone لا تعمل الإشعارات إلا من التطبيق المثبّت." },
  };
  const tt = (k) => (TT[lang()] || TT.en)[k] || TT.en[k];
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent), standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;


  /* ---------- officer page tours (zh / en / pt / ar / ko — the officer page languages) ---------- */
  const OT = {
    en: {
      ev04v: "📣 Announcement draft: the game-chat post of the upcoming events with our times — editors build and copy it from here.",
      ev18v: "Each card lists the tasks with their due date ⏰ and 'overdue' in red; the ticks are the editors' progress.",
      ev38: "📋 The ticked events' in-game guides: open one, tick the messages you want and ＋ Add them to the draft — mind the 300-character limit.",
      mp03: "The map. Tap any marker to select it; rings show the plan — green ✅ Protected, red ⚔️ Vulnerable, yellow dashed 🎯 Target. A confession from THAT Sparrow: she doesn't open the map often, so it's updated only now and then 🐦 There are three kinds of markers — let me show each…",
      mp30: "Coloured squares are Outposts: the colour is the type (Arsenal, Armory, Drill Camp…), the number is the level, and each gives a buff while it's ours and Protected. I've selected one — its details are in the box below.",
      mp31: "◆ Fortresses and ● Sanctuaries (F1…, S1…) give no buff: they're the Sanctuary Battle sign-ups, worth season points each phase. A 🎯 ring marks a target, ✅ ours. I've selected one…",
      mp32: "👑 King's Castle in the middle, and 🛡️ our [NXS] Plains and Badland HQs. Banners chain outward from an HQ; the coloured territory lines are the alliances' land.",
      mp08: "📋 Outpost plan: everything we hold and want, worked out from the marks set in the info box. Let me go through it…",
      mp20: "⭐ Priority — for a Fortress or Sanctuary: pick a number (1 = the one we want most; — clears it). 📏 is the distance from our HQ.",
      mp20v: "⭐ Priority: the number the editors gave this Fortress or Sanctuary (1 = wanted most) and its distance from our HQ.",
      mp21: "Rewards and Note: what this one gives (from the in-game info) and anything worth knowing — who held it last week, how contested. Kept with 💾 Save plan.",
      mp22: "Outposts by type and level, with the buff per level; ✅ ⚔️ 🎯 show their plan status. Tap a chip to select it.",
      mp23: "The in-game rules the totals follow: the same type at the same level doesn't stack, it must border our territory, Vulnerable = no buff.",
      mp24: "The buff table: one row per Outpost type — Now (as in game: Protected only) and With targets (held + vulnerable + targets).",
      mp25: "🎯 Targets: the Outposts we want next. Tap a chip to select it on the map.",
      mp26: "✅ Ours · Protected: what we hold with the buff active, each with its ⏱ time until it turns Vulnerable.",
      mp27: "⚔️ Ours · Vulnerable: held but giving no buff right now, with the time until it's Protected again.",
      mp28: "⚠️ Buff conflict: two of ours with the same type and level — only the one Protected longer counts.",
      mp29: "🏛️ Fortresses & Sanctuaries: no buffs, but season points each phase (Sanctuary 1, Fortress 2…) — points Now and With targets, then the 🎯 Targets and ✅ Ours lists. Only one Sanctuary and one Fortress can be signed up per phase.",
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
      ev34: "Action items for officers: each row is a task with 'days before (−) or after the start', an optional 'until' hour, an optional exact 🔔 reminder time (UTC, e.g. 22:30 — officers who get this event's reminders are told at exactly that time) and the text. The two boxes add a 📢 Announcement or 📊 Ranking button to that task. + Action item adds a row, ✕ removes one.",
      ev35: "In-game guides: one box = one chat message, with a title. + Message adds one, ✕ removes it.",
      ev36: "Delete event removes it for everyone (it asks first).",
      ev37: "💾 Save writes the event to the site for all officers; Cancel closes without saving.",
      bd01: "💬 The board is for planning together, in 中文, English, Português, العربية and 한국어. ↻ reloads.",
      bd02: "📋 Tasks for you: things assigned to you or where you were @'d. Tap one to jump to that post.",
      bd03: "+ New topic starts a discussion. Let me open the form…",
      bd03v: "View-only officers can read every topic. Posting needs edit rights — or being @'d or assigned, if the admins allow replies for that.",
      bd04: "Topic title (what it's about) and your message. Drafts stay on this device until you send.",
      bd05: "@ inserts a mention: pick an officer or @all. The topic shows them a 📣 tag.",
      bd06: "📋 Assign to turns the message into a task for the people you pick; they get a ✅ Done button.",
      bd07: "🖼️ attaches pictures (up to 4; pasting a picture works too). An [[img]] marker shows where it goes in the text.",
      bd08: "Post sends it at once — only the original, no waiting. Cancel hides the form and keeps the draft.", bd08t: "🌐 Translate for everyone: tick it and the message is translated into all 5 languages in the background (it shows up at once and switches when done). Off by default and remembered on this device. Without it, readers see \"🌐 Translate to …\" under the post and translate just their language — that translation is kept for everyone.",
      bd09: "Topics, latest activity first: who started it, how many messages, last update. A red dot = changed since you last opened it; 📌 Decided = a decision was pinned. Tap to open — let me open one…",
      bd10: "← All topics goes back to the list.",
      bd11: "Each card is one message, in your language. Show original reveals what was actually written; pictures open full-screen when tapped.",
      bd12: "📌 Set as decision pins this message at the top of the topic as the outcome; Clear decision unpins it.",
      bd13: "✏️ Edit and 🗑️ Delete appear on your own messages only. Delete asks twice; deleting the first message deletes the whole topic.",
      bd14: "✅ Done: when a message is a task for you, mark it done here (↩︎ Not done undoes it).",
      bd15: "The reply box, with the same @, 📋 Assign to and 🖼️ tools. Reply sends it.",
      bd15v: "Replying needs edit rights — unless you were @'d or assigned here and the admins allow that.",
      hp03: "🔄 Plan: “🔒 Only on this device” is your own draft. “➕ Share as a plan” gives it a name and every officer with the 🚚 Move tab can open it from this list; changes save by themselves. ✏️ Rename / 🗑️ Delete. Without the move edit right it is view only.",
      hp01: "📐 Auto plan: load a Kingshot Mapper CSV of a new hive (cities, Bear Traps, HQ, your banners, resources, obstacles). The site works out two roads to the new HQ — from our HQ today and the shortest one (dashed; 🔀 swaps them) — splits your banners into stage 1 (BT2 side) / stage 2, checks mountains, lakes, no-build zones, resources and other alliances, counts the 285 limit and the nearest Fortress, and draws it like the game with a table under it.", hp02: "✏️ Change anything: pick a pen (⚫ road, 🟡 stage 1, 🟠 stage 2, 🧽 remove, 🏯 move HQ) and tap the map — the numbers and the table update at once. ↩️ Undo, 🔄 auto road again, ⬇️ picture (PNG) or blueprint CSV, and ➡️ Use as moving plan puts it into 🧭 Move steps.",
      mv08: "✋ Put members on the plan: tap a dashed spot on the map, then tap a name from “not placed yet” (or type one) — it jumps to the next empty spot nearby, so you can fill a row quickly. “Empty this spot” takes a name out. Then 💾 Save. Placing is by hand for now — for automatic placing, ask Sparrow.",
      mv00: "📘 Hive rules & tips: where the HQ may go (never on Fertile Land), how banners must connect, limits, and the move order. Tap to open.", mv01: "🚚 Move: one map for the whole move — members where they are now (👥 positions) with the moving plan drawn on top: dashed spots = planned cities, numbered banners = road (R), early hive banners (P), stage 1 (S1) and stage 2 (S2), dashed HQ / Bear Traps = their new place, ✖ = another alliance's banner to take down. Admins only, or whoever the 👥 table gives this tab.", mv09: "📍 Positions from the roster: every member's castle X:Y comes with the roster. After members move, open the MightPulse map and press Update Map, then 🔄 Update roster now (about 5 minutes — the same button as on 🕵️ Watch). The list shows who moved where (✅ = at their new spot); ✅ Use these positions saves them to 👥 Member positions, and the moving table and steps tick themselves. People who left the alliance are listed and taken off by the same ✅.", mv02: "🧭 Move steps: the plan in order — road, early banners / take down, move the HQ, stage 1, BT2-side members, stage 2, BT1-side members, Bear Traps last. ▶ marks the step you're on. ✅ comes by itself when the map shows it (our banner there, HQ / trap / member at the new X Y); tap an item to tick it, then 💾 Save. The banner count against 285 is at the bottom. Banners ticked here count as standing on 🗺️ Map too.", mv03: "The moving table: each member's current X:Y → new spot (tap to copy). ✅ appears by itself when their position in 👥 Member positions (below) already equals the new spot. Tick “Only not moved yet” to see who's left.", mv04: "✓ Moved: tick it by hand when someone has moved, then 💾 Save.", mv05: "➕ Add / change a spot: type a name and X Y — their old spot becomes free. Tap a free spot in the list to fill in X Y.", mv06: "Load the moving plan: the CSV exported from Kingshot Mapper (cities labelled with member names; a .json works too). “Remove plan” clears it.", mv07: "💾 Save: type your name and save, so the other officers with this tab see the same plan and ticks.",
      mp40: "👥 Member positions: our block like in game — every member's city, the Bear Traps and HQ. Tap a city (or search a name) for its X:Y and a copy button. 📍 jumps back to our HQ now, 🧭 to the new HQ.", mp33: "⬇️ Download banner coordinates: every banner the map shows now (the file plus officers’ edits) and the 🚩 planned ones, as a Kingshot Mapper CSV. Label NXS = checked in game, NXS? = estimated, plan = not built yet. The second button saves the 🏴 other alliances’ banners (label = their tag).", mp41: "📋 Paste positions to add or move people (one per line: name X Y), then 💾 Save. Orange = name not found on the roster.", mp01: "Layers: All, 📋 Plan only (just Outposts with a plan status), 🛰️ Territory (stitched from officers' screenshots — same colour = same alliance), then one chip per building type. The first tap on a type shows only that type; more taps toggle.",
      mp02: "+ and − zoom (pinch or the mouse wheel work too); drag to move around.",
      mp04: "The info box for what's selected: name, level and buff, who can contest it, X/Y coordinates — Copy puts them on your clipboard.",
      mp05: "Status buttons: 🎯 Target, ✅ Ours · Protected, ⚔️ Ours · Vulnerable, ✕ Clear. They change the plan in memory — press 💾 Save plan afterwards.",
      mp05v: "Editors mark the status here (🎯 target, ✅ protected, ⚔️ vulnerable); you see the result in the plan below.",
      mp06: "⏱ Timer: after marking Protected or Vulnerable, type the countdown shown in game (d h m) and Set timer — the page then flips Protected ⇄ Vulnerable by itself. Remove timer clears it.",
      mp06v: "⏱ The countdown to the next Protected ⇄ Vulnerable switch, when editors have set a timer.",
      mp07: "⭐ Sanctuary & Fortress priority: select a Fortress or Sanctuary on the map and pick a number (1 = best), with its rewards and a note. This list shows them in order; tap a row to select it.",
      mp07v: "⭐ Sanctuary & Fortress priority, as the editors ranked them (1 = best), with rewards and notes. Tap a row to select it.",
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
      mp18e: "✏️ Update rewards: the special reward of each Fortress / Sanctuary can rotate every round. Pick each one's reward and amount from the in-game Battle Rewards screen (✍️ Other for a new one) and save — every officer sees it, with who updated it and when. Fill in the season and phase too (e.g. Season 3 Phase 5/8): every phase has its own rewards. The Phase picker shows any phase — this week's by default; a phase nobody has checked shows the Kingshot Wiki table (📖) until someone saves the in-game list (✅).",
      mp18g: "🎁 What we'd get: which reward each Fortress / Sanctuary we target gives, for the phase picked on the rewards card (this week's by default).",
      mp19: "The building lists by type and level. Every chip selects that building on the map — the same as tapping the marker.",
      rk01: "📋 Plan: 🔒 Only on this device keeps the ticks and the table in this browser. A 🔄 shared plan is the same for every officer — ticks, weights, group sizes and the battle table sync within seconds — and the Attendance tab builds each date's list from it.",
      rk02: "↩️ Undo steps back through the last changes (ticks, weights, table). On a shared plan the undo is shared too.",
      rk02r: "🗂️ Recover plans (admins only): every plan on the server with every save — deleted plans too. Tap a plan, pick a version (time, who, how many ticked, replies, table rows) and Restore; it becomes the current plan for everyone. Up to 1000 saves per plan are kept. 📜 Old GitHub saves: plans from before 10/30 — pick a save, then Import a plan as a new shared plan.", rk03: "+ New shared plan: give it a name (e.g. Legion 1) and choose whether to start with the people ticked now. Rename and Delete act on the open plan; 🕘 Versions puts the plan back to any earlier save. 📱 there also brings back the battle table last edited on this device, if it never reached the plan.",
      rk05r: "✅ Registration: next to each ticked name tap ⏳ to cycle ✅ confirmed → ❌ can't come → ⏳ no reply; 🟡 = safe player, registered without waiting (remembered for every plan). This line counts who can be registered (✅ + 🟡 with no reply). 📋 Copy list can copy just those, or just the not-replied names to ping them.",
      rk03s: "💾 The box at the top of the screen shows the save of a shared plan: ✅ Saved · time, ⏳ Saving, or ⚠️ Not saved yet — then the change is kept on this device and sent again by itself (also after a reload), so don't close the page. Each save sends only what you changed, so two officers editing at once don't undo each other.",
      rk03v: "Shared plans are created by editors; you can open them here and follow along.",
      rk04: "✏️ Who can edit: every officer, or only the people the creator picks (the creator and admins always can).",
      rk05: "① Ranking method: Squad Power fit (the Squad Power the Swordland Legion screens show, estimated from Migrant Score) or Weights, where you tick the stats and give each a weight. The note explains the formula.",
      rk06: "Weights: tick the stats to count and give each a percentage — they don't have to add up to 100.",
      rk07: "② Participants & ranking: tick this event's people here — the same list ranks them. Select all ticks the whole roster; Clear empties it.",
      rk08: "Paste a sign-up list: one name per line or comma-separated, decorations don't matter. Tick these players matches them to the roster and ticks them; names it couldn't find are listed.",
      rk09: "Search a name filters the table; Only ticked shows just the ticked ones; Sort by ranking (on by default) puts the ticked people in ranking order with their place in #, everyone else after them. Tapping a column header sorts by that column instead.",
      rk10: "The roster. Left box = starter (ranked); right box = substitute (listed as sub, not ranked, imported as sub by Attendance). Tapping anywhere on a row ticks it; a rank row ticks the whole rank; tap a column header to sort.",
      rk11: "Use only the top N: ③ groups and ④ battle table take only the first N of the ranking; the rows past it fade. Empty = everyone.",
      rk12: "📋 Copy list: choose who (the ranking, the top N, only who can be registered, or only who hasn't replied), which columns (place, name, ID, reply, stats, score, sub) and the format — text, a table to paste into Google Sheets / Excel, or a lined-up Discord table. Preview before copying; your choices are remembered.",
      rk14: "③ Event groups: tap ⚔️ Swordland Showdown and the ranking is split into Attackers, Defenders and Joiners — or 🔱 Tri-Alliance Clash for its 4 teams from the alliance's TAC plan (Teams A attack, B enemy territory hold and C frontline get a quarter of the ticked people each, Team D support = everyone else — ↺ Auto after changing a number; ④ battle table follows the event). Tip: a separate 🔄 shared plan (e.g. “Legion 2 – Tri”) keeps its ticks apart from Swordland.", rk14t: "🔱 Battle table for Tri-Alliance Clash: “🔱 TAC plan draft” fills all 4 stages from the alliance's TAC plan with Teams A–D from ③ — one row per team (Lead = its strongest), Team D split into Path I / Path II, and the Temple of Tides order (C and D first, B second, A last, strongest last). Change anything afterwards.", rk01e: "🎯 Event: pick it once for this plan (⚔️ Swordland or 🔱 Tri-Alliance) — ③ groups and ④ battle table switch to it by themselves, and the plan remembers it for everyone.", rk17e: "“Table for:” this table belongs to one event — ⚔️ Swordland or 🔱 Tri-Alliance. An empty table takes the event you pick in ③; a filled one of another event shows a note and asks before switching.",
      rk15: "Attackers / Defenders: how many of each, taken from the top of the ranking; everyone else is a Joiner. The same numbers drive ④.",
      rk16: "Copy result copies the groups as a Discord post; the small map opens the Swordland map.",
      rk17: "④ Battle table: who attacks or defends which building, per phase. Pick a person from the list, then tap a box to put them there (drag on a computer); × removes.",
      rk17v: "④ Battle table: who attacks or defends which building, per phase. You can read and copy it; edits stay on this device only.",
      rk18: "Table setup: the phases (comma-separated — rename, add or remove them), the building numbers and names offered as suggestions, which columns show and what they're called, and Short names (drops decorations like 亗 and Nexus).",
      rk19: "✨ Fill a first draft: ranked #1… one per building as Attacker, the next ones as Defenders, the rest as Joiners, using the Attackers / Defenders numbers.",
      rk20: "⚔️ Swordland rules draft fills all 3 phases by the alliance's rules: Phase 1 ①–④ with attackers and defenders by rank, Phase 2 Sword Shrine / Mercenary Camp / Hall, then Stay behind. Edit it afterwards.",
      rk21: "📥 Paste text → table reads an assignment post written for Discord (① ROYAL STABLES / * ⚔️ Attacker: …) and turns it into the table; names are matched to the roster. 📝 Insert a draft gives you a ready text to edit first.",
      rk22: "Clear table empties every building (phases and setup stay). ↩️ Undo brings it back.",
      rk23: "Attackers / Defenders counts — the same numbers as ③.",
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
      at06r: "① Registration: each person's reply (✅ confirmed, ❌ can't come, ⏳ no reply) and 🟡 safe players come from the Ranking plan — set them there, then 🔄 Update from the plan. The line on top counts who can be registered; copy buttons for the not-replied names and the registration list.",
      at06rv: "① Registration: ✅ confirmed, ❌ can't come, ⏳ no reply; 🟡 = safe player registered without waiting (set on the Ranking tab).",
      at07: "Adding people: paste names and Match roster, 📷 upload voter screenshots (the names are read for you), or Add a member by hand from the list.",
      at08: "② After the battle: tap a name to cycle ✓ showed up → X no-show → 🛌 excused. Orange (2nd) and red (3rd) mark repeat misses. All showed up marks everyone at once.",
      at08v: "② After the battle: ✓ showed up, X no-show, 🛌 excused; orange and red = repeat misses.",
      at09: "Save stores the list on the server for all officers. Copy for Discord copies a summary; Delete this list removes it.",
      at09v: "Copy for Discord copies a summary of this list.",
      po01: "✍️ Write: your name and the language you're writing in — write in your own language, the site translates it into all 12.",
      po01v: "📢 Post: announcements are written here and translated into 12 languages. Loading the list needs edit rights — ask an admin if you need this tab.",
      po02b: "Format like Word: select some text, then tap B / I / U / S, the highlighter, 🎨 for a colour or Aa for a font. H1 / H2 make headings, • ≡ picks a bullet symbol (• ★ ✔ ➤ …) and 1.≡ numbers lines, ⇤ ⇥ (or Tab / Shift+Tab) move a list line in or out, ❝ a quote box, ― a line. Tap again to undo a list or heading. It stays in every language. Pasting from ChatGPT, Word or Google Docs keeps the formatting too. Tap 🐦 Example and I'll fill in a demo of every button — ↩️ brings your text back.", po02: "Title and Message. **text** = bold; links work as normal.",
      po03: "🖼️ Add picture shrinks the photo and puts an [[img]] marker where your cursor is; it's uploaded when you publish.",
      po04: "Button to a guide adds a button under the announcement that opens one of the site's guides.",
      po05: "Look: Plain, 📜 Scroll, or a theme like ⛵ Viking Vengeance — the event picture on top, banners in its colour (or pick another colour next to it). The scroll grows with the text in every language.",
      po06: "Auto-delete: when the announcement disappears by itself — when today or tomorrow ends, after 1 / 2 / 3 / 7 days, or a date & time in UTC.",
      po07: "Preview shows it the way members will see it.",
      po08: "📢 Publish asks once, uploads the pictures and saves the text. The translated announcement shows on the site in about 2–3 minutes.",
      po09: "📋 Announcements on the site, newest first: 🖼️ has pictures, ⏳ still translating, 🗑️ auto-delete time, ✏️ Language = fixed by hand. Refresh re-reads the list.",
      po10: "Edit opens an announcement for changes; Delete removes it from the site in all languages (it asks first). Let me open Edit…",
      po11: "What to change: All languages (opens the original in the Write form and translates everything again), 🖼️ Add pictures only (no new translation), or one language — fix just that translation by hand; Use the automatic translation again undoes a fix.",
      wa07: "🔄 Update roster now: fetches every member from MightPulse again (power, Mystic Trial, castle X:Y…) — the same job as the daily update at 20:13 UTC. About 5 minutes; the table updates by itself. The same button is on 🚚 Move — one request for both.", wa01: "📋 Copy for Google Sheets copies the members shown below as a table — paste into cell A1. ⬇️ Download CSV saves the same file.",
      wa01v: "🕵️ Watch lists every member with flags for things worth a look. Copy / CSV export is for editors.",
      wa02: "Search a name or ID filters the list. Only show members with flags keeps the suspicious ones; 'New = joined within' sets how long someone counts as new.",
      wa03: "Watched alliances: members seen in these get a red flag. Our farm / sister alliances are ignored for that.",
      wa04: "Tap a column header to sort. Flags: Check Record, New, From kingdom, Was in…, Seen in n alliances, Same name in… Record ↗ opens the player on MightPulse.",
      wa05: "✏️ opens the note: earlier alliances and names, 'I've checked the Record', Clear ✅ / Not clear ⚠️, why, your name. Save shares it with all officers.",
      wa05v: "Clear ✅ / Not clear ⚠️ and the comments are the officers' notes on that member.",
      wa06: "Left NXS: who left, when, and where they were seen since.",
      ak01: "⚔️ Attack planner: pick their garrison leader, its troops and tier, then our rally leaders in order (troops, tier). Everyone shows with today's strength from MightPulse. It shows r (one of their troops ≈ 1/r of ours), what each rally leaves, about how many rallies are needed, and a small uncertainty table. Rough — it under-rates attackers. The switch on top: 🏰 In our kingdom (us = NXS, them = other alliances in #2189) or ⚔️ KvK (us = all of #2189, them = the opponent kingdom added in 🔭 Scout).", ak02: "📊 Today's strength = Governor gear + Hero equip + Master power from the newest MightPulse boards (only players in the top 100 of all three). Top 15 of NXS and of the others, and a search box.", gr01: "🧭 Attack vs Defense: reference for the leaders — what an attack (rally) leader and a defense (garrison) leader each need (heroes, Widgets, stats, capacity, troop ratio), and who fits which side.", ak03: "⚔️ We attack / 🛡️ They attack us: the second switch flips who holds the building. In 🛡️ it also shows the smallest garrison that holds against all their rallies. Tier can be \"Mix…\": type how many joiners are TG3 / TG2 / TG1 / TG0 and it uses the average. Troop ratio (Infantry : Cavalry : Archers) for both sides is checked: under 40% Infantry gets a warning.", ak04: "🗡️ Swordland: pick a 📊 Ranking plan (our list; substitutes come from the plan — tap a name to switch), type the opponent's kingdom and alliance tag and 🔄 Fetch (it pulls their members right then). It answers for \"Confirmed only\" and \"With substitutes\": can we take the Swordshrine, how many people must hold it, and who to watch (⚠️). One ranking mixes both sides: tap their players to mark ⚠️ who to watch. 🔭 Scout shows only in ⚔️ KvK.", hn01: "🎯 Blacklist: for All Out. Green = All Out is running. The list is looked up on MightPulse when it is saved and when someone presses ↻ Reload (no timed polling — MightPulse only changes after “Update Map”). Admins only, or whoever the 👥 table gives this tab.", hn02: "Each listed player: in-game name (MightPulse ↗ under it opens their page), alliance, kingdom, castle X:Y (tap to copy) and shield (🛡️ until …). ⭐ marks a player for everyone: the row lights up and moves to the top. Every time is \"UTC (local)\" — the data time is MightPulse's, so it can be up to 60 minutes old. ✏️ next to X:Y: type a newer spot by hand (seen in game or on MightPulse) — everyone sees it until MightPulse catches up. 🧭 Rule: same spot → go by the position here; moved → check MightPulse ↗, then ✏️ update it here.", hn03: "➕ Add players by the ID on their profile (paste several at once; a note for one), ✕ removes, then 💾 Save list — the first look-up arrives in about 2 minutes. The same ID is kept only once (two officers adding the same player = one row).", hn06: "🛡️✏️ MightPulse can be hours behind (⚠️ next to the data time = no refresh for over 2 hours). Fix the shield by hand: type the time left on it (hours, minutes) or 🚫 No shield. Everyone sees it, ⏰ timers follow it, and newer MightPulse data takes over by itself.", hn05: "⏰ Follow a player: tap ⏰ on their row and their shield end becomes one of your ⏰ timers, with a notification (this phone / browser only). It follows the newest data while this tab is open.", hn04: "↻ Reload fetches the newest data now; the page also reloads it by itself every minute. Under the table a small kingdom map shows everyone (🔴 no shield, 🔵 shield up, ⭐ gold ring = marked); 🗺️ opens them on the full kingdom map. Positions / shields only change after someone presses “Update Map” on the MightPulse map (🗺️ button at the top) — press it, then ↻ Reload.", sc01: "Type a kingdom number and Fetch now: a GitHub job reads its top 20 by Migrant Score and top 20 by power from MightPulse (2–3 minutes; the page refreshes by itself).",
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
      events: "📅 Events", board: "💬 Board", map: "🗺️ Map", ranking: "📊 Ranking", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", move: "🚚 Move", hunt: "🎯 Blacklist", attack: "⚔️ Battle", growth: "🧭 Growth", views: "📈 Views", perms: "👥 Officers",
      },
    zh: {
      ev04v: "📣 公告草稿：接下來活動和我們時間的遊戲聊天公告——由有編輯權限的人在這裡產生並複製。",
      ev18v: "每張卡片列出任務和到期日 ⏰，逾期會顯示紅色「逾期」；打勾是編輯者的進度。",
      ev38: "📋 已勾選活動的遊戲內指南：打開一個，勾選想用的訊息，＋ 加進草稿——注意 300 字上限。",
      mp03: "地圖。點任何標記就能選取；圓環表示計畫——綠色 ✅ 保護中、紅色 ⚔️ 可爭奪、黃色虛線 🎯 目標。那個麻雀（Sparrow）的告白：她不常開地圖，所以只會偶爾更新一下 🐦 標記有三種，我一種一種示範…",
      mp30: "彩色方塊是據點：顏色是種類（軍械庫、兵工廠、訓練營…），數字是等級，我方持有且保護中的時候會給加成。我選了一個——詳細資料在下面的框裡。",
      mp31: "◆ 要塞和 ● 遺跡（F1…、S1…）沒有加成：它們是遺跡爭奪的報名對象，每個階段給賽季積分。🎯 圓環是目標、✅ 是我方的。我選一個…",
      mp32: "中間的 👑 國王城堡，還有 🛡️ 我們 [NXS] 的平原與荒地總部。旗幟從總部一路往外接；彩色的領地線是各聯盟的地盤。",
      mp08: "📋 據點計畫：我們持有和想要的一切，全部從資訊框裡設定的標記算出來。我一項一項講…",
      mp20: "⭐ 優先順序——要塞或遺跡用的：選一個數字（1 = 最想要的；— 清除）。📏 是離我們總部的距離。",
      mp20v: "⭐ 優先順序：編輯者給這個要塞或遺跡的數字（1 = 最想要），還有離我們總部的距離。",
      mp21: "獎勵和備註：這個據點給什麼（照遊戲裡的資訊寫），以及值得知道的事——上週誰拿、競爭激不激烈。按 💾 儲存計畫一起存。",
      mp22: "據點依種類和等級列出，每級的加成都寫著；✅ ⚔️ 🎯 代表它們在計畫裡的狀態。點標籤就選取它。",
      mp23: "總計依照遊戲規則：同種類同等級不疊加、必須和我們的領地相鄰、可爭奪 = 沒有加成。",
      mp24: "加成表：每種據點一列——目前（照遊戲：只算保護中）和含目標（持有 + 可爭奪 + 目標）。",
      mp25: "🎯 目標：我們接下來想拿的據點。點標籤就在地圖上選取它。",
      mp26: "✅ 我方・保護中：我們持有且加成生效的，各自有 ⏱ 距離變成可爭奪的時間。",
      mp27: "⚔️ 我方・可爭奪：持有中但現在沒有加成，顯示距離再次保護的時間。",
      mp28: "⚠️ 加成衝突：我們有兩個同種類同等級的——只有保護比較久的那個算數。",
      mp29: "🏛️ 要塞與遺跡：沒有加成，但每個階段給賽季積分（遺跡 1、要塞 2…）——目前和含目標的積分，然後是 🎯 目標和 ✅ 我方的清單。每個階段只能報名一個遺跡和一個要塞。",
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
      ev34: "幹部的待辦事項：每一列是一個任務，有「開始前（−）或開始後幾天」、可選的「截止」小時、可選的準時 🔔 提醒時間（UTC，例如 22:30——收這個活動提醒的幹部會在那個時間準時收到）和文字。兩個勾選框會幫那個任務加上 📢 公告或 📊 排名按鈕。+ 待辦事項新增一列，✕ 移除一列。",
      ev35: "遊戲內指南：一個方框 = 一則聊天訊息，附標題。+ 訊息新增一則，✕ 移除它。",
      ev36: "刪除活動會把它對所有人移除（會先問你）。",
      ev37: "💾 儲存會把活動寫到網站，所有幹部都看得到；取消會直接關閉不儲存。",
      bd01: "💬 討論板是用來一起規劃的，可以用 中文、English、Português、العربية 和 한국어。↻ 重新載入。",
      bd02: "📋 你的任務：指派給你或 @ 到你的東西。點一下就跳到那則貼文。",
      bd03: "+ 新主題會開一個討論。我來打開表單…",
      bd03v: "只能查看的幹部可以讀所有主題。發文需要編輯權限——或者被 @ 到或被指派，如果管理員有開放那種情況的回覆。",
      bd04: "主題標題（在講什麼）和你的訊息。送出前草稿會留在這台裝置上。",
      bd05: "@ 會插入提及：選一位幹部或 @all。主題會對他們顯示 📣 標籤。",
      bd06: "📋 指派給會把訊息變成你選的人的任務；他們會看到一個 ✅ 完成按鈕。",
      bd07: "🖼️ 附加圖片（最多 4 張；直接貼上圖片也行）。[[img]] 標記表示它在文字裡的位置。",
      bd08: "按送出會馬上發出去，只存原文，不用等。取消會隱藏表單並保留草稿。", bd08t: "🌐 翻譯給所有人：勾起來的話，訊息會在背景翻成 5 種語言（先出現原文，翻好自動換上）。預設不勾，這台裝置會記住。沒勾的話，看的人會在貼文下面看到「🌐 翻成…」，只翻他自己的語言，翻好會存下來給其他人用。",
      bd09: "主題，最近有動靜的排在前面：誰開的、幾則訊息、最後更新。紅點 = 你上次打開之後有變動；📌 已決定 = 有釘選一個決定。點一下打開——我來打開一個…",
      bd10: "← 所有主題會回到清單。",
      bd11: "每張卡片是一則訊息，用你的語言顯示。顯示原文會露出實際寫的內容；圖片點一下會全螢幕打開。",
      bd12: "📌 設為決定會把這則訊息釘在主題最上面當作結論；清除決定會取消釘選。",
      bd13: "✏️ 編輯和 🗑️ 刪除只會出現在你自己的訊息上。刪除會問兩次；刪掉第一則訊息就會刪掉整個主題。",
      bd14: "✅ 完成：當一則訊息是給你的任務，在這裡標記完成（↩︎ 未完成可以撤銷）。",
      bd15: "回覆框，有一樣的 @、📋 指派給和 🖼️ 工具。回覆就送出了。",
      bd15v: "回覆需要編輯權限——除非你在這裡被 @ 到或被指派，而且管理員有開放。",
      hp03: "🔄 計畫：「🔒 只在這台裝置」是你自己的草稿。按「➕ 存成共用計畫」取個名字，有 🚚 搬家分頁的幹部都能從這個清單打開，修改會自動儲存。✏️ 改名／🗑️ 刪除。沒有搬家編輯權限的人只能看。",
      hp01: "📐 自動規劃：載入新蜂巢的 Kingshot Mapper CSV（城、熊陷阱、總部、你畫的旗子、資源點、障礙物）。網站會算出兩條連到新總部的路——從現在總部出發的，和最短的（虛線，🔀 可以互換）——把旗子分成第 1 階段（BT2 那側）／第 2 階段、檢查山、湖、禁建區、資源點和別的聯盟、算 285 上限和最近的要塞，照遊戲方向畫出來，下面附表格。", hp02: "✏️ 想改就改：選一支筆（⚫ 路、🟡 第 1 階段、🟠 第 2 階段、🧽 移除、🏯 移動總部）再點地圖，編號和表格馬上更新。↩️ 復原、🔄 重新自動算路、⬇️ 下載圖片 (PNG) 或藍圖 CSV，➡️ 設成搬家計畫會放進 🧭 搬家步驟。",
      mv08: "✋ 把成員放進計畫：點地圖上虛線的位置，再點「還沒分配的人」裡的名字（或自己打），會自動跳到旁邊下一個空位，一排可以很快填完。「清空這個位置」可以把名字拿掉。最後按 💾 儲存。目前是手動放；想要自動分配請找 Sparrow。",
      mv00: "📘 蜂巢規則與技巧：總部能蓋在哪（不能蓋在沃土）、旗幟要怎麼連、上限，還有搬家順序。點一下就打開。", mv01: "🚚 搬家：整個搬家只用一張地圖——成員現在的位置（👥 成員位置）上面疊著搬家藍圖：虛線格 = 規劃的城位，有編號的旗子 = 路（R）、提早蓋的蜂巢旗子（P）、第 1 階段（S1）、第 2 階段（S2），虛線的總部／熊陷阱 = 新位置，✖ = 要拆的別聯盟旗子。只有管理員，或 👥 表格有給這個分頁的人看得到。", mv09: "📍 從名單更新座標：每個人的城堡座標都在名單裡。成員搬完後，打開 MightPulse 地圖按 Update Map，再按 🔄 立即更新名單（大約 5 分鐘，跟 🕵️ 觀察頁是同一個按鈕）。清單會列出誰搬到哪（✅ = 已到新位置）；按 ✅ 套用這些座標會存進 👥 成員位置，搬家對照表和步驟就會自己打勾。已經退盟的人也會列出來，按同一個 ✅ 就會移除。", mv02: "🧭 搬家步驟：照順序排好——鋪路、提早蓋的旗子／拆旗、搬總部、第 1 階段、BT2 那側的成員、第 2 階段、BT1 那側的成員、熊陷阱最後。▶ 是現在這一步。地圖上已經看得到的會自動打 ✅（那裡有我們的旗子、總部／陷阱／成員在新座標），其他的點一下就能勾，再按 💾 儲存。最下面有旗子總數對 285 的計算。這裡勾的旗子在 🗺️ 地圖上也會算成已蓋好。", mv03: "搬家對照表：每個人現在的 X:Y → 新位置（點一下複製）。如果下面 👥 成員位置裡的位置已經等於新位置，會自動打 ✅。勾「只看還沒搬的」就知道還剩誰。", mv04: "✓ 已搬：有人搬好了可以手動勾，再按 💾 儲存。", mv05: "➕ 新增／更改位置：輸入名字和 X Y，他原本的位置就會空出來。點清單裡的空位會自動填好 X Y。", mv06: "載入搬家規劃：從 Kingshot Mapper 匯出的 CSV（城的標籤要是成員名字；.json 也可以）。「移除規劃」會清掉。", mv07: "💾 儲存：輸入你的名字再儲存，其他有這個分頁的幹部就會看到同一份規劃和勾選。",
      mp40: "👥 成員位置：像遊戲裡一樣的我們這一塊，每個人的城、熊陷阱和總部都在上面。點城或搜尋名字，就看得到 X:Y 和複製按鈕。按 📍 回到我們的總部，🧭 跳到新總部。", mp33: "⬇️ 下載旗子座標：地圖上現在所有的旗子（資料檔加上幹部改過的）和 🚩 規劃中的旗子，存成 Kingshot Mapper 的 CSV。標籤 NXS = 遊戲裡確認過，NXS? = 推算的，plan = 還沒蓋。第二個按鈕是 🏴 其他聯盟的旗子（標籤 = 聯盟名稱）。", mp41: "📋 貼上位置可以新增或移動成員（一行一個：名字 X Y），再按 💾 儲存。橘色 = 名單上找不到這個名字。", mp01: "圖層：全部、📋 只看計畫（只有有計畫狀態的據點）、🛰️ 領地（用幹部的截圖拼起來的——同顏色 = 同聯盟），然後是每種建築類型各一個小標籤。第一次點某個類型只顯示那個類型；再點就是切換開關。",
      mp02: "+ 和 − 縮放（兩指縮放或滑鼠滾輪也可以）；拖曳移動。",
      mp04: "選取項目的資訊框：名稱、等級和加成、誰可以爭奪、X/Y 座標——複製會把座標放到你的剪貼簿。",
      mp05: "狀態按鈕：🎯 目標、✅ 我們的 · 保護中、⚔️ 我們的 · 可爭奪、✕ 清除。它們改的是記憶體裡的計畫——之後要按 💾 儲存計畫。",
      mp05v: "有編輯權限的人在這裡標記狀態（🎯 目標、✅ 保護中、⚔️ 可爭奪）；你會在下面的計畫裡看到結果。",
      mp06: "⏱ 計時器：標記保護中或可爭奪之後，輸入遊戲裡顯示的倒數（天 時 分）然後設定計時器——頁面就會自己在保護中 ⇄ 可爭奪之間切換。移除計時器會清掉它。",
      mp06v: "⏱ 到下一次保護中 ⇄ 可爭奪切換的倒數，當有編輯權限的人設了計時器時。",
      mp07: "⭐ 遺跡與要塞優先順序：在地圖上選一個要塞或遺跡，然後選一個數字（1 = 最好），附上獎勵和備註。這個清單會依順序顯示；點一列就選取它。",
      mp07v: "⭐ 遺跡與要塞優先順序，由有編輯權限的人排的（1 = 最好），附獎勵和備註。點一列就選取它。",
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
      mp18e: "✏️ 更新獎勵：每座要塞 / 遺跡的獎勵每一輪都可能輪換。照遊戲裡「爭奪獎勵」的畫面替每一座選獎品和數量（新的獎品選 ✍️ 其他），存了所有幹部都看得到，也會顯示是誰、什麼時候更新的。也要填第幾賽季、第幾期（例如第3賽季 5/8期）：每一期的獎品都不同。「看第幾期」可以切換任一期，預設是這週；還沒人對過遊戲的期數會先顯示 Kingshot Wiki 的表（📖），有人照遊戲存過就變成 ✅。",
      mp18g: "🎁 拿到的話可以得到：我們目標的每座要塞 / 遺跡各給什麼，用的是獎勵卡片選的那一期（預設這週）。",
      mp19: "依類型和等級的建築清單。每個小標籤都會在地圖上選取那個建築——跟點標記一樣。",
      rk01: "📋 計畫：🔒 只在這台裝置會把勾選和表格留在這個瀏覽器裡。🔄 共用計畫則是每位幹部看到的都一樣——勾選、權重、分組人數和戰鬥表格幾秒內就會同步——出席分頁也會用它來建立每個日期的名單。",
      rk02: "↩️ 復原會一步步退回最近的變更（勾選、權重、表格）。共用計畫的復原也是共用的。",
      rk02r: "🗂️ 找回計畫（只有管理員）：伺服器上每個計畫的每一次存檔，包括已刪除的計畫。點計畫、選一版（時間、誰存的、名單幾人、回覆、對戰表行數）再按還原，就會變成所有人看到的現在版本。每個計畫保留最近 1000 次存檔。📜 舊的 GitHub 存檔：10/30 以前的計畫——選一次存檔，再把計畫匯入成新的共用計畫。", rk03: "+ 新共用計畫：取個名字（例如 Legion 1），然後選要不要用現在勾選的人開始。重新命名和刪除作用在打開的那個計畫上；🕘 版本可以把計畫退回任何一次之前的儲存。 那裡的 📱 也能把這台裝置最後編輯的作戰表放回計畫（如果它沒存進去）。",
      rk05r: "✅ 報名確認：在每個勾選的名字旁點 ⏳ 會循環 ✅ 確認會來 → ❌ 不能來 → ⏳ 還沒回；🟡 = 放心成員，不用等回覆就先報名（每個計畫都記得）。這行算出可報名的人數（✅ + 沒回的 🟡）。📋 複製名單可以只複製這些人，或只複製還沒回覆的人拿去 tag。",
      rk03s: "💾 畫面上方的小框顯示共用計畫有沒有存好：✅ 已存 · 時間、⏳ 儲存中，或 ⚠️ 還沒存上去——這時變更會先留在這台裝置，自己再送一次（重新整理後也會），所以先不要關掉頁面。每次只送你改的部分，兩個幹部同時改也不會互相蓋掉。",
      rk03v: "共用計畫是由有編輯權限的人建立的；你可以在這裡打開並跟著看。",
      rk04: "✏️ 誰可以編輯：所有幹部，或只有建立者選的人（建立者和管理員一定可以）。",
      rk05: "① 排名方式：部隊戰力適配（聖劍軍團畫面顯示的部隊戰力，從移民分數估算）或權重，由你勾選數據並給每項一個權重。說明會解釋公式。",
      rk06: "權重：勾選要計算的數據，各給一個百分比——不需要加起來等於 100。",
      rk07: "② 勾選參戰的人和排名：在這裡勾這次的人——同一張表也會幫他們排名。全選會勾整個名冊；全部取消會清空。",
      rk08: "貼上報名名單：一行一個名字或用逗號分隔，裝飾符號沒關係。勾選這些玩家會把他們對應到名單並勾起來；找不到的名字會列出來。",
      rk09: "搜尋名字會篩選表格；「只顯示勾選的人」只列勾選的；「依排名排序」（預設開著）把勾選的人照排名排好、# 欄是名次，沒勾的接在後面。點欄位標題就改成照那一欄排。",
      rk10: "名單。左邊的框 = 正選（會排名）；右邊的框 = 替補（列為替補，不排名，出席分頁會以替補匯入）。點一列的任何地方就勾選它；階級列會勾選整個階級；點欄位標題可以排序。",
      rk11: "只取前幾名：③ 分組和 ④ 戰鬥表只用排名前 N 名；排在後面的那幾列會變淡。空白 = 全部。",
      rk12: "📋 複製名單：選要複製誰（照排名的全部、前 N 名、只有可報名的、只有還沒回覆的）、哪些欄位（名次、名字、ID、回覆、各項數值、分數、替補）和格式——文字、可貼到 Google 試算表 / Excel 的表格，或對齊好的 Discord 表格。複製前可以預覽；選擇會記住。",
      rk14: "③ 活動分組：點 ⚔️ 聖劍爭奪，排名就會分成進攻者、防守者和參與者；點 🔱 三盟爭霸就照聯盟的三盟計畫分成 4 隊（A 隊進攻、B 隊守敵方領地、C 隊前線各占勾選人數的四分之一，D 隊支援 = 其他人；改過數字可按 ↺ 自動 回復，④ 戰鬥分工表會跟著活動變）。小技巧：另外開一個 🔄 共用方案（例如「Legion 2 – 三盟」），勾選就不會跟聖劍混在一起。", rk14t: "🔱 三盟爭霸的戰鬥分工表：「🔱 三盟計畫草稿」用 ③ 的 A–D 隊，照聯盟的三盟計畫把 4 個階段一次排好——每隊一列（隊長 = 那隊最強的人），D 隊分成路線 I／路線 II，還有潮汐神殿的進場順序（C、D 先進，B 第二，A 最後，最強的最後一個）。排好後全部都可以改。", rk01e: "🎯 活動：每個計畫選一次（⚔️ 聖劍或 🔱 三盟）——③ 分組和 ④ 戰鬥分工表會自動換過去，計畫也會幫大家記住。", rk17e: "「這張表是：」每張表屬於一個活動——⚔️ 聖劍或 🔱 三盟。空白的表會跟著 ③ 選的活動變；已經排好的表遇到別的活動只會提醒，要換會先問你。",
      rk15: "進攻者／防守者：各要幾個，從排名最上面取；其他人都是參與者。同樣的數字也會用在 ④。",
      rk16: "複製結果會把分組複製成 Discord 貼文；小地圖會打開聖劍地圖。",
      rk17: "④ 戰鬥表格：每個階段誰攻、誰守哪棟建築。從清單選一個人，然後點一個框把他放進去（電腦上可以拖曳）；× 移除。",
      rk17v: "④ 戰鬥表格：每個階段誰攻、誰守哪棟建築。你可以讀和複製；修改只會留在這台裝置上。",
      rk18: "表格設定：階段（逗號分隔——可以重新命名、新增或移除）、當作建議的建築編號和名稱、哪些欄位要顯示和叫什麼，還有短名稱（去掉 亗 和 Nexus 之類的裝飾）。",
      rk19: "✨ 填一份草稿：排名 #1… 每棟建築一個人當進攻者，接下來的當防守者，其他的當參與者，用的是進攻者／防守者的數字。",
      rk20: "⚔️ 聖劍規則草稿會照聯盟的規則填滿全部 3 個階段：階段 1 ①–④ 依排名放進攻者和防守者，階段 2 聖劍神殿／傭兵營地／大廳，然後是留守。之後再修改。",
      rk21: "📥 貼上文字 → 表格會讀一則寫給 Discord 的分配貼文（① ROYAL STABLES / * ⚔️ Attacker: …）並轉成表格；名字會對應到名單。📝 插入草稿會先給你一份現成的文字讓你修改。",
      rk22: "清除表格會清空每棟建築（階段和設定會留著）。↩️ 復原會把它找回來。",
      rk23: "進攻者／防守者人數——跟 ③ 是同樣的數字。",
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
      at06r: "① 報名確認：每個人的回覆（✅ 確認、❌ 不能來、⏳ 還沒回）和 🟡 放心成員都來自排名分頁的計畫——在那邊設定，再按 🔄 依計畫更新名單。上面那行是可報名的人數；也有複製沒回覆的人和報名名單的按鈕。",
      at06rv: "① 報名確認：✅ 確認、❌ 不能來、⏳ 還沒回；🟡 = 不用等回覆就報名的放心成員（在排名分頁設定）。",
      at07: "新增人員：貼上名字然後比對名單、📷 上傳投票截圖（名字會幫你讀出來），或從清單手動新增成員。",
      at08: "② 戰鬥之後：點名字會循環 ✓ 有到 → X 沒到 → 🛌 請假。橘色（第 2 次）和紅色（第 3 次）標記重複缺席。全部有到會一次標記所有人。",
      at08v: "② 戰鬥之後：✓ 有到、X 沒到、🛌 請假；橘色和紅色 = 重複缺席。",
      at09: "儲存會把名單存到伺服器，所有幹部都看得到。複製到 Discord 會複製一份摘要；刪除這份名單會移除它。",
      at09v: "複製到 Discord 會複製這份名單的摘要。",
      po01: "✍️ 撰寫：你的名字和你寫作用的語言——用你自己的語言寫，網站會翻成全部 12 種。",
      po01v: "📢 公告：公告在這裡撰寫並翻譯成 12 種語言。載入清單需要編輯權限——需要這個分頁的話請找管理員。",
      po02b: "像 Word 一樣排版：先選取文字，再按 B／I／U／S、螢光筆、用 🎨 選顏色，或用 Aa 選字體。H1／H2 是標題，• ≡ 可以選列點符號（• ★ ✔ ➤ …），1.≡ 是編號，⇤ ⇥（或 Tab／Shift+Tab）調整列點的縮排，❝ 是引言框，― 是分隔線。條列和標題再按一次就取消。翻譯後格式也會保留。從 ChatGPT、Word 或 Google 文件貼上來，格式也會跟著過來。按「🐦 示範」我會填一份每個按鈕的範例給你看，按 ↩️ 就還原你的文字。", po02: "標題和訊息。**text** = 粗體；連結照常可用。",
      po03: "🖼️ 加圖片會縮小照片，並在游標位置放一個 [[img]] 標記；發布時才會上傳。",
      po04: "指南按鈕會在公告下方加一個按鈕，打開網站的其中一篇指南。",
      po05: "外觀：一般、📜 捲軸，或選主題（例如 ⛵ 維京復仇）：上面放活動圖片，旗子換成主題色（旁邊也能自己選旗子顏色）。捲軸會跟著每種語言的文字長度拉長。",
      po06: "自動刪除：公告什麼時候自己消失——今天或明天結束時、1 / 2 / 3 / 7 天後，或指定一個 UTC 的日期和時間。",
      po07: "預覽會用成員看到的樣子顯示。",
      po08: "📢 發布會問一次，上傳圖片並儲存文字。翻譯好的公告大約 2–3 分鐘後會出現在網站上。",
      po09: "📋 網站上的公告，最新的在前面：🖼️ 有圖片、⏳ 還在翻譯、🗑️ 自動刪除時間、✏️ 語言 = 手動修正過。重新整理會重新讀取清單。",
      po10: "編輯會打開一則公告來修改；刪除會把它從網站的所有語言移除（會先問你）。我來打開編輯…",
      po11: "要改什麼：所有語言（在撰寫表單裡打開原文並重新翻譯全部）、🖼️ 只加圖片（不重新翻譯），或單一語言——只手動修正那一個翻譯；重新使用自動翻譯會撤銷修正。",
      wa07: "🔄 立即更新名單：重新從 MightPulse 抓全部成員（戰力、神秘試煉、城堡座標⋯），跟每天 20:13 UTC 的自動更新是同一個工作。大約 5 分鐘，表格會自己更新。🚚 搬家頁也有同一個按鈕，按哪個都一樣。", wa01: "📋 複製到 Google 試算表會把下面顯示的成員複製成表格——貼到 A1 儲存格。⬇️ 下載 CSV 會存成同樣的檔案。",
      wa01v: "🕵️ 觀察列出每位成員，並標記值得看一下的事。複製／CSV 匯出是給有編輯權限的人用的。",
      wa02: "搜尋名字或 ID 會篩選清單。只顯示有標記的成員會留下可疑的；「新 = 加入在…之內」設定多久以內算新人。",
      wa03: "觀察中的聯盟：在這些聯盟出現過的成員會有紅色標記。我們的農場／姊妹聯盟不算在內。",
      wa04: "點欄位標題排序。標記：查看紀錄、新、來自王國、曾在…、在 n 個聯盟出現過、同名在… 紀錄 ↗ 會在 MightPulse 打開這位玩家。",
      wa05: "✏️ 會打開備註：之前的聯盟和名字、「我已經查過紀錄」、沒問題 ✅／有疑慮 ⚠️、原因、你的名字。儲存會分享給所有幹部。",
      wa05v: "沒問題 ✅／有疑慮 ⚠️ 和留言是幹部對那位成員的備註。",
      wa06: "離開 NXS：誰離開了、什麼時候，以及之後在哪裡出現過。",
      ak01: "⚔️ 攻擊規劃：選對方的駐守隊長、守軍兵數和兵等，再照順序選我們的集結隊長（兵數、兵等）。每個人旁邊是 MightPulse 今天的強度。會算出 r（對方一個兵 ≈ 我們 1/r 個）、每波打完剩多少、大約要幾波，還有一張不確定性小表。只是粗估——會低估攻方。最上面可以切換：🏰 王國內（我們 = NXS，對方 = #2189 其他聯盟）或 ⚔️ KvK（我們 = 整個 #2189，對方 = 在 🔭 偵查加入的對手王國）。", ak02: "📊 今天的強度 = 領主裝備 + 英雄裝備 + 大師戰力，用最新的 MightPulse 排行榜（三個榜都在前 100 名的人才有）。列出 NXS 和其他聯盟的前 15 名，也可以搜尋。", gr01: "🧭 進攻 vs 防守：給隊長參考——進攻（集結隊長）和防守（駐防帶頭）各自需要什麼（英雄、零件、屬性、容量、兵種比例），還有誰適合哪邊。", ak03: "⚔️ 我們進攻 / 🛡️ 對方打我們：第二個切換決定誰守建築。🛡️ 模式還會算出擋下對方所有集結的最少駐軍。兵等可以選「混合…」：填 TG3 / TG2 / TG1 / TG0 各幾人，用平均來算。雙方兵種比例（步兵：騎兵：弓兵）會檢查：步兵低於 40% 會警告。", ak04: "🗡️ 聖劍：選一個 📊 排名計畫（我們的名單；替補來自計畫，點名字可以切換），輸入對手的王國和聯盟縮寫再按 🔄 抓取（當場抓他們的成員）。會分「只算確定」和「加上替補」回答：打不打得下聖劍祭壇、要放多少人守、誰要注意（⚠️）。 雙方排名混在一起：點對方的人勾 ⚠️ 要注意的人。🔭 偵查只出現在 ⚔️ KvK。", hn01: "🎯 黑名單：全軍出擊用。綠色 = 活動進行中。儲存名單或有人按 ↻ 重新整理時才會去 MightPulse 查（不定時查，因為 MightPulse 要按「Update Map」才會變）。只有管理員，或 👥 表格有給這個分頁的人看得到。", hn02: "名單上每個人：遊戲名字（下面的 MightPulse ↗ 可以打開他的頁面）、聯盟、王國、城堡 X:Y（點一下複製）和護盾（🛡️ 到 …）。⭐ 是特別標記：所有幹部都會看到那一列亮起來、排在最上面。時間都是「UTC（當地時間）」——資料時間是 MightPulse 的，最多可能晚 60 分鐘。 X:Y 旁邊的 ✏️：MightPulse 太慢時可以手動輸入更新的位置（遊戲裡或 MightPulse 上看到的），大家都會看到，直到 MightPulse 有更新的資料。 🧭 原則：位置沒變就照這裡找；變了就看 MightPulse ↗，再用 ✏️ 更新到網站上。", hn03: "➕ 用個人資料上的 ID 加人（可以一次貼好幾個；單一個人可以寫備註），✕ 移除，再按 💾 儲存名單——大約 2 分鐘後會有第一次結果。同一個 ID 只會留一筆（兩個幹部加了同一個人也會合成一筆）。", hn06: "🛡️✏️ MightPulse 可能會落後好幾個小時（資料時間旁邊有 ⚠️ = 超過 2 小時沒更新）。這時可以手動修正護盾：輸入護盾還剩多久（小時、分鐘），或按 🚫 沒有護盾。大家都會看到，⏰ 計時器也會跟著改，等 MightPulse 有更新的資料就會自動換回來。", hn05: "⏰ 追蹤某個人：點他那一列的 ⏰，他的護盾結束時間就會變成你的 ⏰ 計時器，時間到會通知（只在這支手機／這個瀏覽器）。開著這個分頁時會跟著最新資料調整。", hn04: "↻ 重新整理會馬上抓最新的資料；頁面本身也會每分鐘自己更新。表格下面有小王國地圖標出每個人（🔴 沒開護盾、🔵 開著護盾、⭐ 金圈 = 特別標記），🗺️ 會在完整的王國地圖上標出來。 位置／護盾要有人在 MightPulse 地圖按「Update Map」才會更新（上面的 🗺️ 按鈕），按完再按 ↻ 重新整理。", sc01: "輸入王國編號然後立即抓取：一個 GitHub 工作會從 MightPulse 讀取它遷城分數前 20 名和戰力前 20 名的玩家（2–3 分鐘；頁面會自己重新整理）。",
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
      events: "📅 活動", board: "💬 留言板", map: "🗺️ 地圖", ranking: "📊 排名", attend: "📋 出席", post: "📢 公告", watch: "🕵️ 觀察", scout: "🔭 偵查", move: "🚚 搬家", hunt: "🎯 黑名單", attack: "⚔️ 作戰", growth: "🧭 發展方向", views: "📈 瀏覽", perms: "👥 幹部",
      },
    pt: {
      ev04v: "📣 Rascunho de anúncio: o post de chat do jogo com os próximos eventos e nossos horários — os editores montam e copiam aqui.",
      ev18v: "Cada card lista as tarefas com o prazo ⏰ e 'atrasado' em vermelho; as marcações são o progresso dos editores.",
      ev38: "📋 Guias in-game dos eventos marcados: abra um, marque as mensagens que quer e ＋ adicione ao rascunho — atenção ao limite de 300 caracteres.",
      mp03: "O mapa. Toque em qualquer marcador para selecioná-lo; os anéis mostram o plano — verde ✅ Protegido, vermelho ⚔️ Vulnerável, amarelo tracejado 🎯 Alvo. Confissão dAQUELA Sparrow: ela não abre o mapa com frequência, então ele é atualizado só de vez em quando 🐦 Há três tipos de marcador — deixa eu mostrar cada um…",
      mp30: "Os quadrados coloridos são Postos Avançados: a cor é o tipo (Arsenal, Armaria, Campo de Treino…), o número é o nível, e cada um dá um bônus enquanto é nosso e Protegido. Selecionei um — os detalhes estão na caixa abaixo.",
      mp31: "◆ Fortalezas e ● Santuários (F1…, S1…) não dão bônus: são as inscrições da Batalha do Santuário, que valem pontos de temporada a cada fase. Um anel 🎯 marca um alvo, ✅ é nosso. Selecionei um…",
      mp32: "👑 Castelo do Rei no meio, e 🛡️ nossos QGs [NXS] da Planície e das Terras Ermas. As bandeiras encadeiam a partir de um QG; as linhas coloridas de território são as terras das alianças.",
      mp08: "📋 Plano de postos: tudo o que temos e queremos, calculado a partir das marcas feitas na caixa de informações. Deixa eu passar por ele…",
      mp20: "⭐ Prioridade — para uma Fortaleza ou Santuário: escolha um número (1 = o que mais queremos; — limpa). 📏 é a distância até nosso QG.",
      mp20v: "⭐ Prioridade: o número que os editores deram a esta Fortaleza ou Santuário (1 = mais desejado) e a distância até nosso QG.",
      mp21: "Recompensas e Nota: o que este dá (da informação do jogo) e o que vale saber — quem o teve na semana passada, quão disputado. Fica salvo com 💾 Salvar plano.",
      mp22: "Postos Avançados por tipo e nível, com o bônus por nível; ✅ ⚔️ 🎯 mostram o status no plano. Toque num chip para selecioná-lo.",
      mp23: "As regras do jogo que os totais seguem: o mesmo tipo no mesmo nível não acumula, precisa fazer fronteira com nosso território, Vulnerável = sem bônus.",
      mp24: "A tabela de bônus: uma linha por tipo de Posto — Agora (como no jogo: só Protegidos) e Com alvos (nossos + vulneráveis + alvos).",
      mp25: "🎯 Alvos: os Postos que queremos a seguir. Toque num chip para selecioná-lo no mapa.",
      mp26: "✅ Nossos · Protegidos: o que temos com o bônus ativo, cada um com o tempo ⏱ até virar Vulnerável.",
      mp27: "⚔️ Nossos · Vulneráveis: nossos mas sem bônus agora, com o tempo até ficar Protegido de novo.",
      mp28: "⚠️ Conflito de bônus: dois nossos do mesmo tipo e nível — só conta o que está Protegido há mais tempo.",
      mp29: "🏛️ Fortalezas e Santuários: sem bônus, mas pontos de temporada a cada fase (Santuário 1, Fortaleza 2…) — pontos Agora e Com alvos, depois as listas 🎯 Alvos e ✅ Nossos. Só um Santuário e uma Fortaleza podem ser inscritos por fase.",
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
      ev34: "Itens de ação para os oficiais: cada linha é uma tarefa com 'dias antes (−) ou depois do início', uma hora 'até' opcional, um horário exato 🔔 de lembrete opcional (UTC, ex. 22:30 — os oficiais que recebem os lembretes desse evento são avisados exatamente nessa hora) e o texto. As duas caixas adicionam um botão 📢 Anúncio ou 📊 Ranking a essa tarefa. + Item de ação adiciona uma linha, ✕ remove uma.",
      ev35: "Guias do jogo: uma caixa = uma mensagem de chat, com um título. + Mensagem adiciona uma, ✕ remove.",
      ev36: "Excluir evento remove para todo mundo (ele pergunta antes).",
      ev37: "💾 Salvar grava o evento no site para todos os oficiais; Cancelar fecha sem salvar.",
      bd01: "💬 O quadro é para planejar juntos, em 中文, English, Português, العربية e 한국어. ↻ recarrega.",
      bd02: "📋 Tarefas para você: coisas atribuídas a você ou onde você foi marcado com @. Toque numa delas para ir até aquele post.",
      bd03: "+ Novo tópico começa uma discussão. Deixa eu abrir o formulário…",
      bd03v: "Oficiais com acesso só leitura podem ler todos os tópicos. Postar exige direitos de edição — ou ter sido marcado com @ ou atribuído, se os admins permitirem respostas nesse caso.",
      bd04: "Título do tópico (sobre o que é) e sua mensagem. Os rascunhos ficam neste dispositivo até você enviar.",
      bd05: "@ insere uma menção: escolha um oficial ou @all. O tópico mostra a eles uma etiqueta 📣.",
      bd06: "📋 Atribuir a transforma a mensagem numa tarefa para as pessoas que você escolher; elas recebem um botão ✅ Feito.",
      bd07: "🖼️ anexa imagens (até 4; colar uma imagem também funciona). Um marcador [[img]] mostra onde ela entra no texto.",
      bd08: "Postar envia na hora — só o original, sem esperar. Cancelar esconde o formulário e mantém o rascunho.", bd08t: "🌐 Traduzir para todos: marque e a mensagem é traduzida para os 5 idiomas em segundo plano (aparece na hora e muda quando terminar). Desmarcado por padrão e lembrado neste aparelho. Sem ele, quem lê vê \"🌐 Traduzir para …\" embaixo do post e traduz só o seu idioma — a tradução fica salva para todos.",
      bd09: "Tópicos, atividade mais recente primeiro: quem começou, quantas mensagens, última atualização. Um ponto vermelho = mudou desde que você abriu pela última vez; 📌 Decidido = uma decisão foi fixada. Toque para abrir — deixa eu abrir um…",
      bd10: "← Todos os tópicos volta para a lista.",
      bd11: "Cada cartão é uma mensagem, no seu idioma. Mostrar original revela o que foi escrito de fato; as imagens abrem em tela cheia quando tocadas.",
      bd12: "📌 Definir como decisão fixa esta mensagem no topo do tópico como o resultado; Limpar decisão desafixa.",
      bd13: "✏️ Editar e 🗑️ Excluir aparecem só nas suas próprias mensagens. Excluir pergunta duas vezes; excluir a primeira mensagem exclui o tópico inteiro.",
      bd14: "✅ Feito: quando uma mensagem é uma tarefa para você, marque como feita aqui (↩︎ Não feito desfaz).",
      bd15: "A caixa de resposta, com as mesmas ferramentas @, 📋 Atribuir a e 🖼️. Responder envia.",
      bd15v: "Responder exige direitos de edição — a menos que você tenha sido marcado com @ ou atribuído aqui e os admins permitam isso.",
      hp03: "🔄 Plano: “🔒 Só neste aparelho” é o seu rascunho. “➕ Compartilhar como plano” dá um nome e todo oficial com a aba 🚚 Mudança abre nesta lista; as mudanças se salvam sozinhas. ✏️ Renomear / 🗑️ Excluir. Sem o direito de edição é só leitura.",
      hp01: "📐 Plano automático: carregue um CSV do Kingshot Mapper da nova colmeia (cidades, Armadilhas, QG, seus estandartes, recursos, obstáculos). O site calcula dois caminhos até o QG novo — do nosso QG atual e o mais curto (tracejado; 🔀 troca) — divide seus estandartes em etapa 1 (lado BT2) / etapa 2, confere montanhas, lagos, zonas proibidas, recursos e outras alianças, conta o limite de 285 e a Fortaleza mais perto, e desenha como no jogo com uma tabela embaixo.", hp02: "✏️ Mude o que quiser: escolha uma caneta (⚫ caminho, 🟡 etapa 1, 🟠 etapa 2, 🧽 remover, 🏯 mover QG) e toque no mapa — números e tabela mudam na hora. ↩️ Desfazer, 🔄 caminho de novo, ⬇️ imagem (PNG) ou CSV, e ➡️ Usar como plano da mudança coloca nas 🧭 Etapas.",
      mv08: "✋ Colocar membros no plano: toque num lugar tracejado no mapa e depois num nome de “ainda sem lugar” (ou digite) — pula para o próximo lugar vazio perto, para encher uma fileira rápido. “Esvaziar este lugar” tira o nome. Depois 💾 Salvar. Por enquanto é à mão — para distribuição automática, fale com a Sparrow.",
      mv00: "📘 Regras e dicas da colmeia: onde o QG pode ficar (nunca em Terra Fértil), como ligar os estandartes, limites e a ordem da mudança. Toque para abrir.", mv01: "🚚 Mudança: um mapa só para a mudança inteira — os membros onde estão agora (👥 posições) com o plano desenhado por cima: casas tracejadas = cidades planejadas, estandartes numerados = caminho (R), colmeia antecipada (P), etapa 1 (S1) e etapa 2 (S2), QG / Armadilhas tracejados = novo lugar, ✖ = estandarte de outra aliança a derrubar. Só admins, ou quem a tabela 👥 der esta aba.", mv09: "📍 Posições do roster: o X:Y do castelo de cada membro vem com o roster. Depois que os membros mudarem, abra o mapa do MightPulse e aperte Update Map, depois 🔄 Atualizar o roster agora (uns 5 minutos — o mesmo botão do 🕵️ Vigilância). A lista mostra quem foi para onde (✅ = no lugar novo); ✅ Usar estas posições salva em 👥 Posições dos membros, e a tabela e as etapas se marcam sozinhas. Quem saiu da aliança aparece na lista e sai com o mesmo ✅.", mv02: "🧭 Etapas da mudança: o plano em ordem — caminho, estandartes antecipados / derrubar, mudar o QG, etapa 1, membros do lado BT2, etapa 2, membros do lado BT1, Armadilhas por último. ▶ marca a etapa atual. ✅ aparece sozinho quando o mapa mostra (nosso estandarte lá, QG / armadilha / membro no novo X Y); toque num item para marcar e 💾 Salve. A conta de estandartes contra 285 fica no fim. Estandartes marcados aqui contam como de pé no 🗺️ Mapa também.", mv03: "A tabela da mudança: X:Y atual de cada membro → novo lugar (toque para copiar). ✅ aparece sozinho quando a posição em 👥 Posições dos membros (abaixo) já é o novo lugar. Marque “Só quem ainda não mudou” para ver quem falta.", mv04: "✓ Mudou: marque à mão quando alguém mudou e 💾 Salve.", mv05: "➕ Adicionar / mudar um lugar: digite o nome e X Y — o lugar antigo fica livre. Toque num lugar livre da lista para preencher X Y.", mv06: "Carregar o plano: o CSV exportado do Kingshot Mapper (cidades com o nome dos membros; .json também serve). “Remover plano” apaga.", mv07: "💾 Salvar: digite seu nome e salve, para os outros oficiais com esta aba verem o mesmo plano.",
      mp40: "👥 Posições dos membros: nosso bloco como no jogo — a cidade de cada membro, as Armadilhas de Urso e o QG. Toque numa cidade (ou busque um nome) para ver X:Y e copiar. 📍 volta para o nosso QG agora, 🧭 vai ao QG novo.", mp33: "⬇️ Baixar coordenadas: todos os estandartes que o mapa mostra agora (arquivo + edições dos oficiais) e os 🚩 planejados, num CSV do Kingshot Mapper. NXS = conferido no jogo, NXS? = estimado, plan = ainda não construído. O segundo botão salva os estandartes 🏴 das outras alianças (rótulo = a tag).", mp41: "📋 Cole posições para adicionar ou mover pessoas (uma por linha: nome X Y) e 💾 Salve. Laranja = nome não encontrado no roster.", mp01: "Camadas: Todos, 📋 Só o plano (apenas Postos Avançados com um status no plano), 🛰️ Território (montado a partir das capturas de tela dos oficiais — mesma cor = mesma aliança), e depois um chip por tipo de construção. O primeiro toque num tipo mostra só aquele tipo; os toques seguintes alternam.",
      mp02: "+ e − dão zoom (pinça ou a roda do mouse também funcionam); arraste para se mover.",
      mp04: "A caixa de informações do que está selecionado: nome, nível e bônus, quem pode disputar, coordenadas X/Y — Copiar põe na sua área de transferência.",
      mp05: "Botões de status: 🎯 Alvo, ✅ Nosso · Protegido, ⚔️ Nosso · Vulnerável, ✕ Limpar. Eles mudam o plano na memória — aperte 💾 Salvar plano depois.",
      mp05v: "Os editores marcam o status aqui (🎯 alvo, ✅ protegido, ⚔️ vulnerável); você vê o resultado no plano abaixo.",
      mp06: "⏱ Timer: depois de marcar Protegido ou Vulnerável, digite a contagem regressiva mostrada no jogo (d h m) e Definir timer — a página então alterna Protegido ⇄ Vulnerável sozinha. Remover timer limpa.",
      mp06v: "⏱ A contagem regressiva até a próxima troca Protegido ⇄ Vulnerável, quando os editores definiram um timer.",
      mp07: "⭐ Prioridade de Santuário e Fortaleza: selecione uma Fortaleza ou um Santuário no mapa e escolha um número (1 = melhor), com suas recompensas e uma nota. Esta lista mostra em ordem; toque numa linha para selecionar.",
      mp07v: "⭐ Prioridade de Santuário e Fortaleza, como os editores classificaram (1 = melhor), com recompensas e notas. Toque numa linha para selecionar.",
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
      mp18e: "✏️ Atualizar recompensas: a recompensa especial de cada Fortaleza / Santuário pode mudar a cada rodada. Escolha a recompensa e a quantidade de cada um pela tela Recompensas da Batalha do jogo (✍️ Outro para uma nova) e salve — todos os oficiais veem, com quem atualizou e quando. Preencha também a temporada e a fase (ex.: Temporada 3 Fase 5/8): cada fase tem recompensas próprias. O seletor de Fase mostra qualquer fase — a desta semana por padrão; uma fase que ninguém conferiu mostra a tabela da Kingshot Wiki (📖) até alguém salvar a lista do jogo (✅).",
      mp18g: "🎁 O que ganharíamos: a recompensa de cada Fortaleza / Santuário que é alvo, na fase escolhida no cartão de recompensas (a desta semana por padrão).",
      mp19: "As listas de construções por tipo e nível. Cada chip seleciona aquela construção no mapa — o mesmo que tocar no marcador.",
      rk01: "📋 Plano: 🔒 Só neste dispositivo mantém as marcações e a tabela neste navegador. Um 🔄 plano compartilhado é o mesmo para todos os oficiais — marcações, pesos, tamanhos de grupo e a tabela de batalha sincronizam em segundos — e a aba Presença monta a lista de cada data a partir dele.",
      rk02: "↩️ Desfazer volta pelas últimas mudanças (marcações, pesos, tabela). Num plano compartilhado o desfazer também é compartilhado.",
      rk02r: "🗂️ Recuperar planos (só admins): cada plano no servidor com cada salvamento — até os apagados. Toque num plano, escolha uma versão (hora, quem, quantos marcados, respostas, linhas da tabela) e Restaurar; ela vira o plano atual para todos. Ficam até 1000 salvamentos por plano. 📜 Salvamentos antigos no GitHub: planos de antes de 10/30 — escolha um salvamento e Importe um plano como novo plano compartilhado.", rk03: "+ Novo plano compartilhado: dê um nome (ex.: Legião 1) e escolha se começa com as pessoas marcadas agora. Renomear e Excluir agem no plano aberto; 🕘 Versões volta o plano para qualquer salvamento anterior. Lá, 📱 também traz de volta a tabela de batalha editada por último neste aparelho, se ela nunca chegou ao plano.",
      rk05r: "✅ Inscrição: ao lado de cada nome marcado toque em ⏳ para alternar ✅ confirmou → ❌ não pode → ⏳ sem resposta; 🟡 = jogador de confiança, inscrito sem esperar (lembrado em todos os planos). Esta linha conta quem pode ser inscrito (✅ + 🟡 sem resposta). 📋 Copiar lista copia só esses, ou só quem não respondeu para chamá-los.",
      rk03s: "💾 A caixa no topo da tela mostra o salvamento do plano compartilhado: ✅ Salvo · hora, ⏳ Salvando, ou ⚠️ Ainda não salvo — aí a mudança fica guardada neste aparelho e é enviada de novo sozinha (também depois de recarregar), então não feche a página. Cada salvamento envia só o que você mudou, então dois oficiais editando ao mesmo tempo não desfazem um ao outro.",
      rk03v: "Os planos compartilhados são criados pelos editores; você pode abri-los aqui e acompanhar.",
      rk04: "✏️ Quem pode editar: todos os oficiais, ou só as pessoas que o criador escolher (o criador e os admins sempre podem).",
      rk05: "① Método de ranking: Ajuste por Poder do Esquadrão (o Poder do Esquadrão que as telas da Legião de Swordland mostram, estimado a partir da Pontuação de Migrante) ou Pesos, onde você marca as estatísticas e dá um peso a cada uma. A nota explica a fórmula.",
      rk06: "Pesos: marque as estatísticas que contam e dê uma porcentagem a cada uma — não precisam somar 100.",
      rk07: "② Participantes e ranking: marque aqui as pessoas deste evento — a mesma lista as ranqueia. Selecionar tudo marca a lista inteira; Limpar esvazia.",
      rk08: "Cole uma lista de inscrição: um nome por linha ou separados por vírgula, decorações não importam. Marcar estes jogadores casa os nomes com a lista de membros e marca; os nomes que não encontrou são listados.",
      rk09: "Buscar um nome filtra a tabela; Só marcados mostra só os marcados; Ordenar pelo ranking (ligado por padrão) põe os marcados na ordem do ranking com a posição em #, os outros depois. Tocar no título de uma coluna ordena por ela.",
      rk10: "A lista de membros. Caixa da esquerda = titular (ranqueado); caixa da direita = reserva (listado como reserva, não ranqueado, importado como reserva pela Presença). Tocar em qualquer lugar de uma linha marca; uma linha de rank marca o rank inteiro; toque no cabeçalho de uma coluna para ordenar.",
      rk11: "Usar só os primeiros N: os grupos ③ e a tabela ④ usam só os N primeiros do ranking; as linhas depois ficam apagadas. Vazio = todos.",
      rk12: "📋 Copiar lista: escolha quem (o ranking, os N primeiros, só quem pode ser inscrito ou só quem não respondeu), quais colunas (posição, nome, ID, resposta, números, pontuação, reserva) e o formato — texto, tabela para colar no Google Planilhas / Excel, ou tabela alinhada para o Discord. Veja a prévia antes de copiar; as escolhas ficam salvas.",
      rk14: "③ Grupos do evento: toque em ⚔️ Confronto de Swordland e o ranking é dividido em Atacantes, Defensores e Participantes — ou 🔱 Confronto Tri-Aliança para os 4 times do plano TAC da aliança (Times A ataque, B território inimigo e C linha de frente ficam com um quarto dos marcados cada, Time D apoio = o resto — ↺ Automático depois de mudar um número; a tabela de batalha ④ segue o evento). Dica: um 🔄 plano compartilhado separado mantém as marcações à parte.", rk14t: "🔱 Tabela do Confronto Tri-Aliança: “🔱 Rascunho do plano TAC” preenche as 4 fases pelo plano TAC da aliança com os Times A–D do ③ — uma linha por time (Líder = o mais forte), o Time D dividido entre Caminho I / II, e a ordem no Templo das Marés (C e D primeiro, B em segundo, A por último, o mais forte no fim). Depois dá para mudar tudo.", rk01e: "🎯 Evento: escolha uma vez por plano (⚔️ Terra das Espadas ou 🔱 Tri-Aliança) — os grupos ③ e a tabela ④ mudam sozinhos, e o plano lembra para todos.", rk17e: "“Tabela para:” cada tabela é de um evento — ⚔️ Terra das Espadas ou 🔱 Tri-Aliança. Uma tabela vazia segue o evento escolhido no ③; uma preenchida de outro evento só avisa e pergunta antes de trocar.",
      rk15: "Atacantes / Defensores: quantos de cada, tirados do topo do ranking; todos os outros são Participantes. Os mesmos números comandam o ④.",
      rk16: "Copiar resultado copia os grupos como um post para o Discord; o mapinha abre o mapa de Swordland.",
      rk17: "④ Tabela de batalha: quem ataca ou defende qual construção, por fase. Escolha uma pessoa na lista e depois toque numa caixa para colocá-la ali (arraste no computador); × remove.",
      rk17v: "④ Tabela de batalha: quem ataca ou defende qual construção, por fase. Você pode ler e copiar; as edições ficam só neste dispositivo.",
      rk18: "Configuração da tabela: as fases (separadas por vírgula — renomeie, adicione ou remova), os números e nomes das construções oferecidos como sugestões, quais colunas aparecem e como se chamam, e Nomes curtos (tira decorações como 亗 e Nexus).",
      rk19: "✨ Preencher um primeiro rascunho: ranqueado #1… um por construção como Atacante, os seguintes como Defensores, o resto como Participantes, usando os números de Atacantes / Defensores.",
      rk20: "⚔️ Rascunho pelas regras de Swordland preenche as 3 fases pelas regras da aliança: Fase 1 ①–④ com atacantes e defensores por rank, Fase 2 Santuário da Espada / Acampamento Mercenário / Salão, e depois Ficar atrás. Edite depois.",
      rk21: "📥 Colar texto → tabela lê um post de atribuição escrito para o Discord (① ROYAL STABLES / * ⚔️ Attacker: …) e transforma na tabela; os nomes são casados com a lista de membros. 📝 Inserir um rascunho dá um texto pronto para você editar antes.",
      rk22: "Limpar tabela esvazia todas as construções (fases e configuração ficam). ↩️ Desfazer traz de volta.",
      rk23: "Contagens de Atacantes / Defensores — os mesmos números do ③.",
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
      at06r: "① Inscrição: a resposta de cada pessoa (✅ confirmou, ❌ não pode, ⏳ sem resposta) e 🟡 jogadores de confiança vêm do plano da aba Ranking — marque lá e depois 🔄 Atualizar pelo plano. A linha de cima conta quem pode ser inscrito; botões para copiar quem não respondeu e a lista de inscrição.",
      at06rv: "① Inscrição: ✅ confirmou, ❌ não pode, ⏳ sem resposta; 🟡 = de confiança, inscrito sem esperar (marcado na aba Ranking).",
      at07: "Para adicionar pessoas: cole nomes e Casar com a lista de membros, 📷 envie capturas de tela dos votantes (os nomes são lidos para você), ou Adicionar um membro à mão a partir da lista.",
      at08: "② Depois da batalha: toque num nome para alternar ✓ apareceu → X não apareceu → 🛌 justificado. Laranja (2ª) e vermelho (3ª) marcam faltas repetidas. Todos apareceram marca todo mundo de uma vez.",
      at08v: "② Depois da batalha: ✓ apareceu, X não apareceu, 🛌 justificado; laranja e vermelho = faltas repetidas.",
      at09: "Salvar armazena a lista no servidor para todos os oficiais. Copiar para o Discord copia um resumo; Excluir esta lista remove.",
      at09v: "Copiar para o Discord copia um resumo desta lista.",
      po01: "✍️ Escrever: seu nome e o idioma em que você está escrevendo — escreva no seu próprio idioma, o site traduz para todos os 12.",
      po01v: "📢 Postar: os anúncios são escritos aqui e traduzidos para 12 idiomas. Carregar a lista exige direitos de edição — peça a um admin se você precisar desta aba.",
      po02b: "Formate como no Word: selecione o texto e toque em B / I / U / S, no marca-texto, em 🎨 para uma cor ou em Aa para uma fonte. H1 / H2 fazem títulos, • ≡ escolhe o símbolo do marcador (• ★ ✔ ➤ …) e 1.≡ numera, ⇤ ⇥ (ou Tab / Shift+Tab) mudam o recuo, ❝ uma caixa de citação, ― uma linha. Toque de novo para desfazer lista ou título. Fica em todos os idiomas. Colar do ChatGPT, Word ou Google Docs também mantém a formatação. Toque em 🐦 Exemplo e eu preencho uma demonstração de cada botão — ↩️ traz seu texto de volta.", po02: "Título e Mensagem. **texto** = negrito; links funcionam normalmente.",
      po03: "🖼️ Adicionar imagem reduz a foto e põe um marcador [[img]] onde está o cursor; ela é enviada quando você publica.",
      po04: "Botão para um guia adiciona um botão embaixo do anúncio que abre um dos guias do site.",
      po05: "Aparência: Simples, 📜 Pergaminho, ou um tema como ⛵ Vingança Viking — a imagem do evento em cima, estandartes na cor dele (ou escolha outra cor ao lado). O pergaminho cresce com o texto em todos os idiomas.",
      po06: "Exclusão automática: quando o anúncio some sozinho — no fim de hoje ou de amanhã, depois de 1 / 2 / 3 / 7 dias, ou numa data e hora em UTC.",
      po07: "Pré-visualizar mostra do jeito que os membros vão ver.",
      po08: "📢 Publicar pergunta uma vez, envia as imagens e salva o texto. O anúncio traduzido aparece no site em uns 2–3 minutos.",
      po09: "📋 Anúncios no site, mais novos primeiro: 🖼️ tem imagens, ⏳ ainda traduzindo, 🗑️ hora da exclusão automática, ✏️ Idioma = corrigido à mão. Atualizar relê a lista.",
      po10: "Editar abre um anúncio para mudanças; Excluir remove do site em todos os idiomas (ele pergunta antes). Deixa eu abrir Editar…",
      po11: "O que mudar: Todos os idiomas (abre o original no formulário Escrever e traduz tudo de novo), 🖼️ Só adicionar imagens (sem nova tradução), ou um idioma — corrija só aquela tradução à mão; Usar a tradução automática de novo desfaz uma correção.",
      wa07: "🔄 Atualizar o roster agora: busca todos os membros de novo no MightPulse (poder, Mystic Trial, X:Y do castelo…) — o mesmo trabalho da atualização diária às 20:13 UTC. Uns 5 minutos; a tabela se atualiza sozinha. O mesmo botão está no 🚚 Mudança — um pedido para os dois.", wa01: "📋 Copiar para o Google Sheets copia os membros mostrados abaixo como uma tabela — cole na célula A1. ⬇️ Baixar CSV salva o mesmo arquivo.",
      wa01v: "🕵️ Vigilância lista cada membro com sinalizações de coisas que valem uma olhada. Copiar / exportar CSV é para editores.",
      wa02: "Buscar um nome ou ID filtra a lista. Só mostrar membros com sinalizações mantém os suspeitos; 'Novo = entrou há' define por quanto tempo alguém conta como novo.",
      wa03: "Alianças vigiadas: membros vistos nelas recebem uma sinalização vermelha. Nossas alianças de farm / irmãs são ignoradas nisso.",
      wa04: "Toque no cabeçalho de uma coluna para ordenar. Sinalizações: Conferir Registro, Novo, Do reino, Esteve em…, Visto em n alianças, Mesmo nome em… Registro ↗ abre o jogador no MightPulse.",
      wa05: "✏️ abre a nota: alianças e nomes anteriores, 'Eu conferi o Registro', Limpo ✅ / Não limpo ⚠️, o motivo, seu nome. Salvar compartilha com todos os oficiais.",
      wa05v: "Limpo ✅ / Não limpo ⚠️ e os comentários são as notas dos oficiais sobre aquele membro.",
      wa06: "Saíram da NXS: quem saiu, quando, e onde foram vistos desde então.",
      ak01: "⚔️ Planejar ataque: escolha o líder da guarnição deles, as tropas e o nível, e depois nossos líderes de rally em ordem (tropas, nível). Todos aparecem com a força de hoje do MightPulse. Mostra r (uma tropa deles ≈ 1/r das nossas), o que cada rally deixa, quantos rallies são precisos e uma tabelinha de incerteza. Estimativa — subestima o atacante. A chave no topo: 🏰 No nosso reino (nós = NXS, eles = outras alianças em #2189) ou ⚔️ KvK (nós = todo o #2189, eles = o reino adversário adicionado no 🔭 Espiar).", ak02: "📊 Força de hoje = Equip. do governador + Equip. de heróis + Poder de mestre dos rankings mais novos do MightPulse (só quem está no top 100 nos três). Top 15 da NXS e dos outros, e uma busca.", gr01: "🧭 Ataque vs Defesa: consulta para os líderes — do que um líder de ataque (rally) e um de defesa (guarnição) precisam (heróis, Ferramentas, atributos, capacidade, proporção) e quem combina com cada lado.", ak03: "⚔️ Nós atacamos / 🛡️ Eles nos atacam: o segundo botão troca quem segura o prédio. Em 🛡️ ele também mostra a menor guarnição que aguenta todos os comícios deles. O nível pode ser \"Mistura…\": digite quantos são TG3 / TG2 / TG1 / TG0 e ele usa a média. A proporção (Infantaria : Cavalaria : Arquearia) dos dois lados é verificada: abaixo de 40% de Infantaria aparece um aviso.", ak04: "🗡️ Terra das Espadas: escolha um plano do 📊 Ranking (nossa lista; reservas vêm do plano — toque num nome para trocar), digite o reino e a tag da aliança adversária e 🔄 Buscar (puxa os membros na hora). Responde para \"Só confirmados\" e \"Com reservas\": dá para tomar o Templo da Espada, quantas pessoas precisam segurar e quem vigiar (⚠️). Um só ranking mistura os dois lados: toque nos jogadores deles para marcar ⚠️ quem vigiar. 🔭 Espiar só aparece no ⚔️ KvK.", hn01: "🎯 Lista negra: para o All Out. Verde = o All Out está rolando. A lista é consultada na MightPulse quando é salva e quando alguém aperta ↻ Recarregar (sem consulta automática — a MightPulse só muda depois de “Update Map”). Só admins, ou quem a tabela 👥 der esta aba.", hn02: "Cada jogador da lista: nome no jogo, aliança, reino, castelo X:Y (toque para copiar) e escudo (🛡️ até …). Todo horário é \"UTC (local)\" — o horário dos dados é o da MightPulse, pode ter até 60 minutos. ✏️ ao lado do X:Y: digite um local mais novo à mão — todos veem até a MightPulse alcançar. 🧭 Regra: mesmo lugar → use a posição daqui; mudou → veja a MightPulse ↗ e ✏️ atualize aqui.", hn03: "➕ Adicione um jogador pelo ID do perfil (e uma nota), ✕ remove, depois 💾 Salvar lista — a primeira consulta chega em uns 2 minutos.", hn06: "🛡️✏️ A MightPulse pode estar horas atrasada (⚠️ ao lado do horário = sem atualização há mais de 2 horas). Corrija o escudo à mão: tempo restante (horas, minutos) ou 🚫 Sem escudo. Todos veem, os ⏰ timers seguem, e dados mais novos da MightPulse voltam sozinhos.", hn05: "⏰ Seguir um jogador: toque em ⏰ na linha dele e o fim do escudo vira um dos seus ⏰ timers, com notificação (só neste celular / navegador). Segue os dados mais novos enquanto esta aba está aberta.", hn04: "↻ Recarregar busca os dados mais novos agora; a página também recarrega sozinha a cada minuto. Posições / escudos só mudam depois que alguém aperta “Update Map” no mapa da MightPulse (botão 🗺️ em cima) — aperte e depois ↻ Recarregar.", sc01: "Digite o número de um reino e Buscar agora: um job do GitHub lê no MightPulse os 20 melhores dele por Pontuação de Migração e os 20 melhores por poder (2–3 minutos; a página atualiza sozinha).",
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
      events: "📅 Eventos", board: "💬 Quadro", map: "🗺️ Mapa", ranking: "📊 Ranking", attend: "📋 Presença", post: "📢 Postar", watch: "🕵️ Vigiar", scout: "🔭 Espiar", move: "🚚 Mudança", hunt: "🎯 Lista negra", attack: "⚔️ Batalha", growth: "🧭 Crescimento", views: "📈 Visitas", perms: "👥 Oficiais",
      },
    ar: {
      ev04v: "📣 مسودة الإعلان: منشور دردشة اللعبة بالأحداث القادمة وأوقاتنا — المحررون ينشئونه وينسخونه من هنا.",
      ev18v: "كل بطاقة تسرد المهام مع موعدها ⏰ وكلمة «متأخر» بالأحمر؛ العلامات هي تقدم المحررين.",
      ev38: "📋 أدلة اللعبة للأحداث المحددة: افتح واحدًا، حدد الرسائل التي تريدها ثم ＋ أضفها إلى المسودة — انتبه لحد 300 حرف.",
      mp03: "الخريطة. اضغط أي علامة لتحديدها؛ الحلقات تبيّن الخطة — أخضر ✅ محمي، أحمر ⚔️ معرّض، أصفر متقطع 🎯 هدف. اعتراف من ذلك Sparrow: لا تفتح الخريطة كثيرًا، لذا تُحدَّث بين حين وآخر فقط 🐦 هناك ثلاثة أنواع من العلامات — دعني أعرض كل نوع…",
      mp30: "المربعات الملونة هي المواقع المتقدمة: اللون هو النوع (الترسانة، مستودع الأسلحة، معسكر التدريب…)، والرقم هو المستوى، وكل منها يعطي تعزيزًا ما دام لنا ومحميًا. حددت واحدًا — تفاصيله في المربع أدناه.",
      mp31: "◆ القلاع و ● المعابد (F1…، S1…) بلا تعزيز: إنها ما نسجّل فيه لمعركة المعبد، وتعطي نقاط موسم في كل مرحلة. الحلقة 🎯 هدف، و ✅ لنا. سأحدد واحدًا…",
      mp32: "👑 قلعة الملك في الوسط، و 🛡️ مقرا [NXS] في السهول والأراضي القاحلة. الرايات تتسلسل من مقر إلى الخارج؛ خطوط الأراضي الملونة هي أراضي التحالفات.",
      mp08: "📋 خطة المواقع المتقدمة: كل ما نملكه ونريده، محسوب من العلامات التي وُضعت في مربع المعلومات. دعني أمرّ عليها…",
      mp20: "⭐ الأولوية — لقلعة أو معبد: اختر رقمًا (1 = الأكثر رغبة؛ — يمسحه). 📏 هي المسافة من مقرنا.",
      mp20v: "⭐ الأولوية: الرقم الذي أعطاه المحررون لهذه القلعة أو المعبد (1 = الأكثر رغبة) ومسافته من مقرنا.",
      mp21: "المكافآت والملاحظة: ما يعطيه هذا (من معلومات اللعبة) وما يستحق المعرفة — من امتلكه الأسبوع الماضي، وكم هو متنازع عليه. يُحفظ مع 💾 حفظ الخطة.",
      mp22: "المواقع المتقدمة حسب النوع والمستوى، مع التعزيز لكل مستوى؛ ✅ ⚔️ 🎯 تبيّن حالتها في الخطة. اضغط شريحة لتحديدها.",
      mp23: "قواعد اللعبة التي تتبعها المجاميع: النوع نفسه بالمستوى نفسه لا يتراكم، يجب أن يحدّ أراضينا، معرّض = بلا تعزيز.",
      mp24: "جدول التعزيزات: صف لكل نوع موقع — الآن (كما في اللعبة: المحمي فقط) ومع الأهداف (المملوك + المعرّض + الأهداف).",
      mp25: "🎯 الأهداف: المواقع التي نريدها تاليًا. اضغط شريحة لتحديدها على الخريطة.",
      mp26: "✅ لنا · محمي: ما نملكه والتعزيز فعّال، لكل منها ⏱ الوقت حتى يصبح معرّضًا.",
      mp27: "⚔️ لنا · معرّض: مملوك لكننا لا نحصل على تعزيز الآن، مع الوقت حتى يصبح محميًا من جديد.",
      mp28: "⚠️ تعارض تعزيز: اثنان لنا بالنوع والمستوى نفسه — يُحتسب فقط المحمي لمدة أطول.",
      mp29: "🏛️ القلاع والمعابد: بلا تعزيزات، لكنها تعطي نقاط موسم في كل مرحلة (معبد 1، قلعة 2…) — النقاط الآن ومع الأهداف، ثم قائمتا 🎯 الأهداف و ✅ لنا. يمكن تسجيل معبد واحد وقلعة واحدة فقط في كل مرحلة.",
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
      ev34: "بنود العمل للضباط: كل صف مهمة فيها 'الأيام قبل (−) أو بعد البداية'، ساعة 'حتى' اختيارية، ووقت تذكير 🔔 دقيق اختياري (UTC، مثل 22:30 — يُنبَّه الضباط الذين يتلقون تذكيرات هذه الفعالية في ذلك الوقت بالضبط) والنص. المربعان يضيفان زر 📢 إعلان أو 📊 الترتيب إلى تلك المهمة. + بند عمل يضيف صفاً، ✕ يزيل واحداً.",
      ev35: "الأدلة داخل اللعبة: مربع واحد = رسالة دردشة واحدة، مع عنوان. + رسالة يضيف واحدة، ✕ يزيلها.",
      ev36: "حذف الحدث يزيله للجميع (يسألك أولاً).",
      ev37: "💾 حفظ يكتب الحدث في الموقع لكل الضباط؛ إلغاء يغلق دون حفظ.",
      bd01: "💬 اللوحة مخصصة للتخطيط معاً، بـ 中文 وEnglish وPortuguês والعربية و한국어. ↻ يعيد التحميل.",
      bd02: "📋 مهام لك: الأشياء المسندة إليك أو التي ذُكرت فيها بـ@. اضغط على واحدة للانتقال إلى ذلك المنشور.",
      bd03: "+ موضوع جديد يبدأ نقاشاً. دعني أفتح النموذج…",
      bd03v: "الضباط للعرض فقط يمكنهم قراءة كل موضوع. النشر يحتاج إلى حقوق التعديل — أو أن تُذكر بـ@ أو تُسند إليك مهمة، إذا سمح المشرفون بالرد في هذه الحالة.",
      bd04: "عنوان الموضوع (عمّا يدور) ورسالتك. تبقى المسودات على هذا الجهاز حتى ترسل.",
      bd05: "@ يدرج إشارة: اختر ضابطاً أو @all. يعرض الموضوع لهم وسم 📣.",
      bd06: "📋 إسناد إلى يحوّل الرسالة إلى مهمة للأشخاص الذين تختارهم؛ يحصلون على زر ✅ تم.",
      bd07: "🖼️ يرفق صوراً (حتى 4؛ لصق صورة يعمل أيضاً). علامة [[img]] تبيّن مكانها في النص.",
      bd08: "نشر يرسلها فوراً — النص الأصلي فقط، بلا انتظار. إلغاء يخفي النموذج ويحتفظ بالمسودة.", bd08t: "🌐 ترجمة للجميع: فعّلها فتُترجم الرسالة إلى اللغات الخمس في الخلفية (تظهر فوراً وتتغير عند الانتهاء). غير مفعّلة افتراضياً وتُحفظ على هذا الجهاز. بدونها يرى القارئ «🌐 ترجمة إلى …» تحت المنشور ويترجم لغته فقط — وتُحفظ الترجمة للجميع.",
      bd09: "المواضيع، الأحدث نشاطاً أولاً: من بدأه، عدد الرسائل، آخر تحديث. نقطة حمراء = تغيّر منذ آخر مرة فتحته؛ 📌 تم القرار = قرار مثبّت. اضغط للفتح — دعني أفتح واحداً…",
      bd10: "← كل المواضيع يعود إلى القائمة.",
      bd11: "كل بطاقة هي رسالة واحدة، بلغتك. عرض الأصل يكشف ما كُتب فعلاً؛ الصور تُفتح بملء الشاشة عند الضغط عليها.",
      bd12: "📌 تعيين كقرار يثبّت هذه الرسالة في أعلى الموضوع كنتيجته؛ مسح القرار يلغي التثبيت.",
      bd13: "✏️ تعديل و🗑️ حذف يظهران على رسائلك أنت فقط. الحذف يسأل مرتين؛ حذف الرسالة الأولى يحذف الموضوع كله.",
      bd14: "✅ تم: عندما تكون رسالة مهمة لك، علّمها كمنجزة هنا (↩︎ لم يتم يتراجع عن ذلك).",
      bd15: "مربع الرد، مع نفس أدوات @ و📋 إسناد إلى و🖼️. رد يرسله.",
      bd15v: "الرد يحتاج إلى حقوق التعديل — إلا إذا ذُكرت بـ@ أو أُسندت إليك مهمة هنا وسمح المشرفون بذلك.",
      hp03: "🔄 الخطة: «🔒 على هذا الجهاز فقط» مسودتك. «➕ مشاركة كخطة» تعطيها اسمًا ويفتحها كل ضابط لديه صفحة 🚚 الانتقال من هذه القائمة؛ التغييرات تُحفظ تلقائيًا. ✏️ إعادة تسمية / 🗑️ حذف. بدون حق التعديل تكون للعرض فقط.",
      hp01: "📐 خطة تلقائية: حمّل CSV من Kingshot Mapper للخلية الجديدة (المدن، المصائد، المقر، راياتك، الموارد، العوائق). يحسب الموقع طريقين إلى المقر الجديد — من مقرنا الحالي والأقصر (متقطع؛ 🔀 للتبديل) — ويقسم الرايات إلى المرحلة 1 (جهة BT2) / المرحلة 2، ويفحص الجبال والبحيرات ومناطق منع البناء والموارد والتحالفات الأخرى، ويحسب حد 285 وأقرب حصن، ويرسمها كما في اللعبة مع جدول تحتها.", hp02: "✏️ غيّر ما تشاء: اختر قلمًا (⚫ طريق، 🟡 المرحلة 1، 🟠 المرحلة 2، 🧽 إزالة، 🏯 نقل المقر) واضغط الخريطة — تتحدث الأرقام والجدول فورًا. ↩️ تراجع، 🔄 الطريق مجددًا، ⬇️ صورة (PNG) أو CSV، و➡️ استخدمها كخطة الانتقال تضعها في 🧭 خطوات الانتقال.",
      mv08: "✋ ضع الأعضاء في الخطة: اضغط مكانًا متقطعًا على الخريطة ثم اسمًا من «بلا مكان بعد» (أو اكتبه) — ينتقل إلى أقرب مكان فارغ تالٍ لتملأ الصف بسرعة. «أفرغ هذا المكان» يزيل الاسم. ثم 💾 احفظ. حاليًا يدويًا — للتوزيع التلقائي اسأل Sparrow.",
      mv00: "📘 قواعد ونصائح الخلية: أين يمكن وضع المقر (ليس على الأرض الخصبة)، وكيف تتصل الرايات، والحدود، وترتيب الانتقال. اضغط للفتح.", mv01: "🚚 الانتقال: خريطة واحدة للانتقال كله — الأعضاء في أماكنهم الآن (👥 المواقع) والخطة مرسومة فوقها: المربعات المتقطعة = المدن المخططة، الرايات المرقّمة = الطريق (R)، رايات الخلية المبكرة (P)، المرحلة 1 (S1) والمرحلة 2 (S2)، المقر / فخاخ الدب المتقطعة = المكان الجديد، ✖ = راية تحالف آخر يجب إزالتها. للمشرفين فقط، أو لمن يمنحه جدول 👥 هذه الصفحة.", mv09: "📍 المواقع من القائمة: إحداثيات قلعة كل عضو تأتي مع القائمة. بعد انتقال الأعضاء افتح خريطة MightPulse واضغط Update Map، ثم 🔄 حدّث القائمة الآن (نحو 5 دقائق — نفس زر 🕵️ المراقبة). تعرض القائمة من انتقل وإلى أين (✅ = في المكان الجديد)؛ ✅ استخدم هذه المواقع يحفظها في 👥 مواقع الأعضاء، فيتعلّم الجدول والخطوات تلقائيًا. ومن غادر التحالف يظهر في القائمة ويُزال بنفس ✅.", mv02: "🧭 خطوات الانتقال: الخطة بالترتيب — الطريق، الرايات المبكرة / الإزالة، نقل المقر، المرحلة 1، أعضاء جهة BT2، المرحلة 2، أعضاء جهة BT1، فخاخ الدب في النهاية. ▶ يعلّم الخطوة الحالية. تظهر ✅ تلقائيًا عندما تُظهرها الخريطة؛ اضغط عنصرًا لتعليمه ثم 💾 احفظ. عدد الرايات مقابل 285 في الأسفل. الرايات المعلّمة هنا تُحتسب قائمة في 🗺️ الخريطة أيضًا.", mv03: "جدول الانتقال: موقع كل عضو الحالي X:Y ← المكان الجديد (اضغط للنسخ). تظهر ✅ تلقائيًا عندما يطابق موقعه في 👥 مواقع الأعضاء (بالأسفل) المكان الجديد. فعّل «من لم ينتقل بعد فقط» لترى من تبقّى.", mv04: "✓ انتقل: علّمها يدويًا عندما ينتقل أحدهم، ثم 💾 احفظ.", mv05: "➕ إضافة / تغيير مكان: اكتب الاسم وX Y — يصبح مكانه القديم فارغًا. اضغط مكانًا فارغًا في القائمة لملء X Y.", mv06: "تحميل خطة الانتقال: ملف CSV المُصدَّر من Kingshot Mapper (المدن بأسماء الأعضاء؛ ملف .json يعمل أيضًا). «إزالة الخطة» تمسحها.", mv07: "💾 حفظ: اكتب اسمك واحفظ، ليرى باقي الضباط الذين لديهم هذه الصفحة نفس الخطة.",
      mp40: "👥 مواقع الأعضاء: منطقتنا كما في اللعبة — مدينة كل عضو ومصائد الدب والمقر. اضغط مدينة (أو ابحث عن اسم) لترى X:Y وزر النسخ. 📍 يعيدك إلى مقرنا الآن، و🧭 إلى المقر الجديد.", mp33: "⬇️ تنزيل الإحداثيات: كل اللافتات التي تعرضها الخريطة الآن (الملف + تعديلات الضباط) والمخططة 🚩، بصيغة CSV لـ Kingshot Mapper. NXS = تم التحقق في اللعبة، NXS? = تقدير، plan = لم تُبنَ بعد. الزر الثاني يحفظ لافتات 🏴 التحالفات الأخرى (التسمية = اسم التحالف).", mp41: "📋 الصق المواقع لإضافة أو نقل الأعضاء (سطر لكل عضو: الاسم X Y) ثم 💾 احفظ. البرتقالي = اسم غير موجود في القائمة.", mp01: "الطبقات: الكل، 📋 الخطة فقط (المواقع المتقدمة التي لها حالة في الخطة فقط)، 🛰️ الأراضي (مجمّعة من لقطات شاشة الضباط — نفس اللون = نفس التحالف)، ثم شريحة لكل نوع مبنى. الضغطة الأولى على نوع تعرض ذلك النوع فقط؛ الضغطات التالية تبدّل.",
      mp02: "+ و− للتكبير والتصغير (القرص أو عجلة الفأرة يعملان أيضاً)؛ اسحب للتنقل.",
      mp04: "مربع المعلومات لما هو محدد: الاسم، المستوى والتعزيز، من يمكنه التنافس عليه، إحداثيات X/Y — نسخ يضعها في الحافظة.",
      mp05: "أزرار الحالة: 🎯 هدف، ✅ لنا · محمي، ⚔️ لنا · معرّض، ✕ مسح. تغيّر الخطة في الذاكرة — اضغط 💾 حفظ الخطة بعدها.",
      mp05v: "المحررون يحددون الحالة هنا (🎯 هدف، ✅ محمي، ⚔️ معرّض)؛ أنت ترى النتيجة في الخطة بالأسفل.",
      mp06: "⏱ المؤقت: بعد التحديد كمحمي أو معرّض، اكتب العد التنازلي المعروض في اللعبة (d h m) ثم ضبط المؤقت — تقلب الصفحة بعدها محمي ⇄ معرّض من تلقاء نفسها. إزالة المؤقت يمسحه.",
      mp06v: "⏱ العد التنازلي حتى التبديل التالي محمي ⇄ معرّض، عندما يكون المحررون قد ضبطوا مؤقتاً.",
      mp07: "⭐ أولوية المعابد والقلاع: حدد قلعة أو معبداً على الخريطة واختر رقماً (1 = الأفضل)، مع مكافآته وملاحظة. تعرضها هذه القائمة بالترتيب؛ اضغط على صف لتحديده.",
      mp07v: "⭐ أولوية المعابد والقلاع، كما رتّبها المحررون (1 = الأفضل)، مع المكافآت والملاحظات. اضغط على صف لتحديده.",
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
      mp18e: "✏️ تحديث المكافآت: قد تتغير المكافأة الخاصة لكل حصن / مأوى في كل جولة. اختر مكافأة كل واحد وكميتها من شاشة مكافآت المعركة في اللعبة (✍️ أخرى لمكافأة جديدة) واحفظ — يراها كل الضباط مع من حدّثها ومتى. املأ أيضًا الموسم والمرحلة (مثل الموسم 3 المرحلة 5/8): لكل مرحلة مكافآتها. يعرض محدد المرحلة أي مرحلة — مرحلة هذا الأسبوع افتراضيًا؛ والمرحلة التي لم يطابقها أحد تعرض جدول Kingshot Wiki (📖) حتى يحفظ أحد قائمة اللعبة (✅).",
      mp18g: "🎁 ما سنحصل عليه: مكافأة كل حصن / مأوى مستهدف، للمرحلة المختارة في بطاقة المكافآت (مرحلة هذا الأسبوع افتراضيًا).",
      mp19: "قوائم المباني حسب النوع والمستوى. كل شريحة تحدد ذلك المبنى على الخريطة — تماماً كالضغط على العلامة.",
      rk01: "📋 الخطة: 🔒 على هذا الجهاز فقط يبقي التحديدات والجدول في هذا المتصفح. الخطة المشتركة 🔄 هي نفسها لكل ضابط — التحديدات والأوزان وأحجام المجموعات وجدول المعركة تتزامن خلال ثوانٍ — وتبويب الحضور يبني قائمة كل تاريخ منها.",
      rk02: "↩️ تراجع يعود خطوة خطوة عبر آخر التغييرات (التحديدات، الأوزان، الجدول). في الخطة المشتركة يكون التراجع مشتركاً أيضاً.",
      rk02r: "🗂️ استعادة الخطط (للمشرفين فقط): كل خطة على الخادم مع كل حفظ — حتى المحذوفة. اضغط خطة واختر نسخة (الوقت، من حفظ، عدد المحددين، الردود، صفوف الجدول) ثم «استعادة»؛ تصبح الخطة الحالية للجميع. تُحفظ حتى 1000 نسخة لكل خطة. 📜 حفظ GitHub القديم: الخطط قبل 10/30 — اختر حفظًا ثم استورد خطة كخطة مشتركة جديدة.", rk03: "+ خطة مشتركة جديدة: أعطها اسماً (مثل Legion 1) واختر ما إذا كانت تبدأ بالأشخاص المحددين الآن. إعادة التسمية وحذف يعملان على الخطة المفتوحة؛ 🕘 الإصدارات يعيد الخطة إلى أي حفظ سابق. و📱 هناك يعيد أيضًا جدول المعركة الذي عُدّل أخيرًا على هذا الجهاز إن لم يصل إلى الخطة.",
      rk05r: "✅ التسجيل: بجانب كل اسم محدد اضغط ⏳ للتبديل ✅ أكّد → ❌ لا يستطيع → ⏳ لم يرد؛ 🟡 = لاعب موثوق يُسجَّل دون انتظار (يُتذكَّر في كل الخطط). هذا السطر يعدّ من يمكن تسجيلهم (✅ + 🟡 بلا رد). 📋 نسخ القائمة ينسخ هؤلاء فقط، أو من لم يرد فقط لتنبيههم.",
      rk03s: "💾 المربع في أعلى الشاشة يبيّن حفظ الخطة المشتركة: ✅ تم الحفظ · الوقت، ⏳ جارٍ الحفظ، أو ⚠️ لم يُحفظ بعد — عندها يبقى التغيير على هذا الجهاز ويُرسل مجددًا تلقائيًا (حتى بعد إعادة التحميل)، فلا تغلق الصفحة. كل حفظ يرسل ما غيّرته فقط، فلا يلغي ضابطان يعدّلان معًا عمل بعضهما.",
      rk03v: "الخطط المشتركة ينشئها المحررون؛ يمكنك فتحها هنا ومتابعتها.",
      rk04: "✏️ من يمكنه التعديل: كل الضباط، أو فقط الأشخاص الذين يختارهم المنشئ (المنشئ والمشرفون يمكنهم دائماً).",
      rk05: "① طريقة الترتيب: ملاءمة قوة الفرقة (قوة الفرقة التي تعرضها شاشات فيلق أرض السيوف، مقدّرة من نقاط الهجرة) أو الأوزان، حيث تحدد الإحصاءات وتعطي كلاً منها وزناً. الملاحظة تشرح المعادلة.",
      rk06: "الأوزان: حدد الإحصاءات التي تُحتسب وأعط كلاً منها نسبة مئوية — لا يلزم أن يكون مجموعها 100.",
      rk07: "② المشاركون والترتيب: حدّد أشخاص هذه الفعالية هنا — القائمة نفسها ترتّبهم. تحديد الكل يحدد القائمة كاملة؛ مسح يفرغها.",
      rk08: "ألصق قائمة تسجيل: اسم في كل سطر أو مفصولة بفواصل، الزخارف لا تهم. تحديد هؤلاء اللاعبين يطابقهم مع قائمة الأعضاء ويحددهم؛ الأسماء التي لم يجدها تُعرض في قائمة.",
      rk09: "البحث عن اسم يصفّي الجدول؛ المحددون فقط يعرض المحددين؛ الفرز حسب الترتيب (مفعّل افتراضيًا) يضع المحددين بترتيبهم مع المركز في #، والبقية بعدهم. الضغط على عنوان عمود يرتّب حسبه.",
      rk10: "قائمة الأعضاء. المربع الأيسر = أساسي (يدخل الترتيب)؛ المربع الأيمن = بديل (يُعرض كبديل، لا يدخل الترتيب، ويستورده الحضور كبديل). الضغط في أي مكان من الصف يحدده؛ صف الرتبة يحدد الرتبة كلها؛ اضغط على رأس عمود للفرز.",
      rk11: "استخدم أول N فقط: مجموعات ③ وجدول ④ يأخذان أول N من الترتيب فقط؛ الصفوف بعدهم تبهت. فارغ = الجميع.",
      rk12: "📋 نسخ القائمة: اختر من (الترتيب كله، أول N، من يمكن تسجيلهم فقط، أو من لم يرد فقط)، وأي أعمدة (المركز، الاسم، ID، الرد، الأرقام، النقاط، البديل) والتنسيق — نص، أو جدول للصق في Google Sheets / Excel، أو جدول Discord محاذى. عاين قبل النسخ؛ تُحفظ اختياراتك.",
      rk14: "③ مجموعات الحدث: اضغط ⚔️ مواجهة أرض السيوف فيُقسَّم الترتيب إلى مهاجمين ومدافعين ومنضمين — أو 🔱 صراع التحالف الثلاثي لفرقه الأربع من خطة التحالف (الفرق A هجوم وB أرض العدو وC خط المواجهة لكل منها ربع المحددين، الفريق D دعم = الباقون — ↺ تلقائي بعد تغيير رقم؛ وجدول المعركة ④ يتبع الحدث). نصيحة: خطة 🔄 مشتركة منفصلة تُبقي الاختيارات مستقلة.", rk14t: "🔱 جدول معركة صراع التحالف الثلاثي: «🔱 مسودة الخطة» تملأ المراحل الأربع من خطة التحالف بالفرق A–D من ③ — صف لكل فريق (القائد = الأقوى)، والفريق D مقسوم بين المسار I والمسار II، وترتيب دخول معبد المد (C وD أولًا، B ثانيًا، A أخيرًا والأقوى آخرهم). يمكن تغيير كل شيء بعدها.", rk01e: "🎯 الحدث: اختره مرة لكل خطة (⚔️ أرض السيوف أو 🔱 التحالف الثلاثي) — تتغير مجموعات ③ وجدول ④ تلقائيًا، وتتذكره الخطة للجميع.", rk17e: "«الجدول لـ:» كل جدول لحدث واحد — ⚔️ أرض السيوف أو 🔱 التحالف الثلاثي. الجدول الفارغ يتبع الحدث المختار في ③؛ والممتلئ لحدث آخر يعرض تنبيهًا ويسأل قبل التبديل.",
      rk15: "المهاجمون / المدافعون: كم من كل منهم، مأخوذون من أعلى الترتيب؛ الباقون جميعاً منضمون. نفس الأرقام تحرّك ④.",
      rk16: "نسخ النتيجة ينسخ المجموعات كمنشور Discord؛ الخريطة الصغيرة تفتح خريطة أرض السيوف.",
      rk17: "④ جدول المعركة: من يهاجم أو يدافع عن أي مبنى، في كل مرحلة. اختر شخصاً من القائمة، ثم اضغط على مربع لوضعه فيه (اسحب على الحاسوب)؛ × يزيل.",
      rk17v: "④ جدول المعركة: من يهاجم أو يدافع عن أي مبنى، في كل مرحلة. يمكنك قراءته ونسخه؛ التعديلات تبقى على هذا الجهاز فقط.",
      rk18: "إعداد الجدول: المراحل (مفصولة بفواصل — أعد تسميتها أو أضفها أو أزلها)، أرقام المباني وأسماؤها المقترحة، أي الأعمدة تظهر وما أسماؤها، والأسماء المختصرة (تحذف الزخارف مثل 亗 وNexus).",
      rk19: "✨ ملء مسودة أولى: المرتب #1… واحد لكل مبنى كمهاجم، التالون كمدافعين، والباقون كمنضمين، باستخدام أرقام المهاجمين / المدافعين.",
      rk20: "⚔️ مسودة قواعد أرض السيوف تملأ المراحل الـ3 كلها بقواعد التحالف: المرحلة 1 ①–④ بالمهاجمين والمدافعين حسب الرتبة، المرحلة 2 ضريح السيف / معسكر المرتزقة / القاعة، ثم البقاء في الخلف. عدّلها بعد ذلك.",
      rk21: "📥 لصق نص → جدول يقرأ منشور تعيينات مكتوباً لـDiscord (① ROYAL STABLES / * ⚔️ Attacker: …) ويحوّله إلى الجدول؛ الأسماء تُطابق مع قائمة الأعضاء. 📝 إدراج مسودة يعطيك نصاً جاهزاً لتعديله أولاً.",
      rk22: "مسح الجدول يفرغ كل مبنى (المراحل والإعداد يبقيان). ↩️ تراجع يعيده.",
      rk23: "أعداد المهاجمين / المدافعين — نفس أرقام ③.",
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
      at06r: "① التسجيل: رد كل شخص (✅ أكّد، ❌ لا يستطيع، ⏳ لم يرد) و🟡 اللاعبون الموثوقون يأتون من خطة تبويب الترتيب — حدّدها هناك ثم 🔄 تحديث من الخطة. السطر في الأعلى يعدّ من يمكن تسجيلهم؛ وأزرار لنسخ من لم يرد وقائمة التسجيل.",
      at06rv: "① التسجيل: ✅ أكّد، ❌ لا يستطيع، ⏳ لم يرد؛ 🟡 = لاعب موثوق يُسجَّل دون انتظار (يُحدَّد في تبويب الترتيب).",
      at07: "إضافة أشخاص: ألصق الأسماء ثم مطابقة مع قائمة الأعضاء، 📷 ارفع لقطات شاشة المصوّتين (تُقرأ الأسماء لك)، أو إضافة عضو يدوياً من القائمة.",
      at08: "② بعد المعركة: اضغط على اسم للتنقل ✓ حضر → X لم يحضر → 🛌 معذور. البرتقالي (الثاني) والأحمر (الثالث) يعلّمان الغيابات المتكررة. حضر الجميع يعلّم الكل دفعة واحدة.",
      at08v: "② بعد المعركة: ✓ حضر، X لم يحضر، 🛌 معذور؛ البرتقالي والأحمر = غيابات متكررة.",
      at09: "حفظ يخزّن القائمة على الخادم لكل الضباط. نسخ لـDiscord ينسخ ملخصاً؛ حذف هذه القائمة يزيلها.",
      at09v: "نسخ لـDiscord ينسخ ملخصاً لهذه القائمة.",
      po01: "✍️ كتابة: اسمك واللغة التي تكتب بها — اكتب بلغتك أنت، والموقع يترجمها إلى اللغات الـ12 كلها.",
      po01v: "📢 المنشورات: الإعلانات تُكتب هنا وتُترجم إلى 12 لغة. تحميل القائمة يحتاج إلى حقوق التعديل — اطلب من مشرف إذا احتجت هذا التبويب.",
      po02b: "نسّق مثل Word: حدّد النص ثم اضغط B / I / U / S أو قلم التظليل أو 🎨 للون أو Aa للخط. H1 / H2 للعناوين، و• ≡ لاختيار رمز النقطة (• ★ ✔ ➤ …) و1.≡ للترقيم، و⇤ ⇥ (أو Tab / Shift+Tab) للمسافة البادئة، و❝ لمربع اقتباس، و― لخط. اضغط مرة أخرى لإلغاء القائمة أو العنوان. يبقى التنسيق في كل اللغات. واللصق من ChatGPT أو Word أو مستندات Google يحتفظ بالتنسيق أيضًا. اضغط 🐦 مثال وسأملأ عرضًا لكل زر — و↩️ يعيد نصك.", po02: "العنوان والرسالة. **نص** = غامق؛ الروابط تعمل كالمعتاد.",
      po03: "🖼️ إضافة صورة يصغّر الصورة ويضع علامة [[img]] حيث يقف المؤشر؛ تُرفع عند النشر.",
      po04: "زر إلى دليل يضيف زراً تحت الإعلان يفتح أحد أدلة الموقع.",
      po05: "المظهر: عادي، أو 📜 لفافة، أو سِمة مثل ⛵ انتقام الفايكنج — صورة الحدث في الأعلى ورايات بلونها (أو اختر لونًا آخر بجانبها). تطول اللفافة مع النص في كل اللغات.",
      po06: "الحذف التلقائي: متى يختفي الإعلان من تلقاء نفسه — عند انتهاء اليوم أو الغد، بعد 1 / 2 / 3 / 7 أيام، أو في تاريخ ووقت بتوقيت UTC.",
      po07: "معاينة تعرضه كما سيراه الأعضاء.",
      po08: "📢 نشر يسألك مرة واحدة، يرفع الصور ويحفظ النص. يظهر الإعلان المترجم على الموقع خلال نحو 2–3 دقائق.",
      po09: "📋 الإعلانات على الموقع، الأحدث أولاً: 🖼️ فيه صور، ⏳ لا يزال يُترجم، 🗑️ وقت الحذف التلقائي، ✏️ اللغة = مصحّحة يدوياً. تحديث يعيد قراءة القائمة.",
      po10: "تعديل يفتح إعلاناً للتغيير؛ حذف يزيله من الموقع بكل اللغات (يسألك أولاً). دعني أفتح تعديل…",
      po11: "ما الذي تغيّره: كل اللغات (يفتح الأصل في نموذج الكتابة ويترجم كل شيء من جديد)، 🖼️ إضافة صور فقط (بلا ترجمة جديدة)، أو لغة واحدة — صحّح تلك الترجمة وحدها يدوياً؛ استخدام الترجمة التلقائية من جديد يلغي التصحيح.",
      wa07: "🔄 حدّث القائمة الآن: يجلب كل الأعضاء من MightPulse من جديد (القوة، Mystic Trial، إحداثيات القلعة…) — نفس عمل التحديث اليومي 20:13 UTC. نحو 5 دقائق ويتحدث الجدول وحده. نفس الزر موجود في 🚚 الانتقال — طلب واحد للاثنين.", wa01: "📋 نسخ لـGoogle Sheets ينسخ الأعضاء المعروضين بالأسفل كجدول — ألصقه في الخلية A1. ⬇️ تنزيل CSV يحفظ نفس الملف.",
      wa01v: "🕵️ المراقبة تعرض كل عضو مع إشارات لأشياء تستحق النظر. النسخ / تصدير CSV للمحررين.",
      wa02: "البحث عن اسم أو ID يصفّي القائمة. عرض الأعضاء ذوي الإشارات فقط يبقي المشبوهين؛ 'جديد = انضم خلال' يحدد كم تبقى مدة اعتبار الشخص جديداً.",
      wa03: "التحالفات المراقبة: الأعضاء الذين شوهدوا فيها يحصلون على إشارة حمراء. تحالفاتنا الزراعية / الشقيقة تُستثنى من ذلك.",
      wa04: "اضغط على رأس عمود للفرز. الإشارات: تحقق من السجل، جديد، من المملكة، كان في…، شوهد في n تحالفات، نفس الاسم في… السجل ↗ يفتح اللاعب على MightPulse.",
      wa05: "✏️ يفتح الملاحظة: التحالفات والأسماء السابقة، 'تحققت من السجل'، سليم ✅ / غير سليم ⚠️، السبب، اسمك. حفظ يشاركها مع كل الضباط.",
      wa05v: "سليم ✅ / غير سليم ⚠️ والتعليقات هي ملاحظات الضباط عن ذلك العضو.",
      wa06: "غادروا NXS: من غادر، متى، وأين شوهدوا منذ ذلك الحين.",
      ak01: "⚔️ تخطيط الهجوم: اختر قائد حاميتهم وجنودها ومستواها، ثم قادة حشودنا بالترتيب (الجنود، المستوى). يظهر كل لاعب بقوته اليوم من MightPulse. يعرض r (جندي منهم ≈ 1/r من جنودنا)، وما يتركه كل حشد، وكم حشدًا نحتاج، وجدولًا صغيرًا لعدم اليقين. تقدير تقريبي — يقلّل من قوة المهاجم. المفتاح في الأعلى: 🏰 داخل مملكتنا (نحن = NXS، هم = تحالفات أخرى في ‎#2189) أو ⚔️ KvK (نحن = كل ‎#2189، هم = مملكة الخصم المضافة في 🔭 الاستطلاع).", ak02: "📊 قوة اليوم = عتاد الحاكم + عتاد الأبطال + قوة المعلّم من أحدث لوحات MightPulse (فقط من هو ضمن أفضل 100 في الثلاث). أفضل 15 من NXS ومن الآخرين، ومربع بحث.", gr01: "🧭 الهجوم مقابل الدفاع: مرجع للقادة — ما يحتاجه قائد الهجوم (الحشد) وقائد الدفاع (الحامية) (الأبطال، الأجزاء، الإحصاءات، السعة، نسبة القوات)، ومن يناسب أي جهة.", ak03: "⚔️ نحن نهاجم / 🛡️ هم يهاجموننا: المفتاح الثاني يغيّر من يحمي المبنى. في 🛡️ يظهر أيضًا أصغر حامية تصمد أمام كل حشودهم. يمكن جعل المستوى \"خليط…\": اكتب عدد المنضمين TG3 / TG2 / TG1 / TG0 فيُستخدم المتوسط. تُفحص نسبة القوات (المشاة : الفرسان : الرماة) للطرفين: أقل من 40% مشاة يظهر تحذير.", ak04: "🗡️ أرض السيوف: اختر خطة من 📊 الترتيب (قائمتنا؛ البدلاء من الخطة — اضغط اسمًا للتبديل)، واكتب مملكة الخصم ووسم تحالفه ثم 🔄 جلب (يجلب أعضاءهم فورًا). يجيب لـ \"المؤكَّدون فقط\" و\"مع البدلاء\": هل نأخذ ضريح السيوف، كم شخصًا يلزم للصمود، ومن يجب مراقبته (⚠️). ترتيب واحد يجمع الطرفين: اضغط على لاعبيهم لتحديد ⚠️ من يجب مراقبته. 🔭 الاستطلاع يظهر في ⚔️ KvK فقط.", hn01: "🎯 القائمة السوداء: لـ All Out. الأخضر = الحدث جارٍ. يُبحث في MightPulse عند حفظ القائمة وعند الضغط على ↻ تحديث (بلا بحث تلقائي — MightPulse لا تتغير إلا بعد «Update Map»). للمشرفين فقط، أو لمن يمنحه جدول 👥 هذه الصفحة.", hn02: "كل لاعب في القائمة: الاسم في اللعبة، التحالف، المملكة، القلعة X:Y (اضغط للنسخ)، والدرع (🛡️ حتى …). كل الأوقات \"UTC (محلي)\" — وقت البيانات من MightPulse وقد يتأخر حتى 60 دقيقة. ✏️ بجانب X:Y: اكتب موقعًا أحدث يدويًا — يراه الجميع حتى تلحق MightPulse. 🧭 القاعدة: نفس المكان → اتبع الموقع هنا؛ تغيّر → راجع MightPulse ↗ ثم حدّثه هنا بـ ✏️.", hn03: "➕ أضف لاعبًا بالمعرّف من ملفه (وملاحظة)، ✕ للحذف، ثم 💾 حفظ القائمة — تصل أول نتيجة بعد نحو دقيقتين.", hn06: "🛡️✏️ قد تتأخر MightPulse ساعات (⚠️ بجانب الوقت = بلا تحديث لأكثر من ساعتين). صحّح الدرع يدويًا: الوقت المتبقي (ساعات، دقائق) أو 🚫 بلا درع. يراه الجميع وتتبعه مؤقتات ⏰، وتعود بيانات MightPulse الأحدث تلقائيًا.", hn05: "⏰ متابعة لاعب: اضغط ⏰ في صفه فيصبح وقت انتهاء درعه أحد مؤقتاتك ⏰ مع إشعار (على هذا الهاتف / المتصفح فقط). يتبع أحدث البيانات ما دامت هذه الصفحة مفتوحة.", hn04: "↻ تحديث يجلب أحدث البيانات الآن؛ والصفحة تحدّثها وحدها كل دقيقة. المواقع / الدروع لا تتغير إلا بعد الضغط على «Update Map» في خريطة MightPulse (زر 🗺️ في الأعلى) — اضغطه ثم ↻ تحديث.", sc01: "اكتب رقم مملكة ثم جلب الآن: مهمة على GitHub تقرأ من MightPulse أفضل 20 لاعباً فيها بنقاط الهجرة وأفضل 20 بالقوة (2–3 دقائق؛ الصفحة تتحدث من تلقاء نفسها).",
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
      events: "📅 الأحداث", board: "💬 اللوحة", map: "🗺️ الخريطة", ranking: "📊 الترتيب", attend: "📋 الحضور", post: "📢 نشر", watch: "🕵️ مراقبة", scout: "🔭 استطلاع", move: "🚚 الانتقال", hunt: "🎯 القائمة السوداء", attack: "⚔️ المعركة", growth: "🧭 التطوير", views: "📈 الزيارات", perms: "👥 الضباط",
      },
    ko: {
      ev04v: "📣 공지 초안: 다가오는 이벤트와 우리 시간이 담긴 게임 채팅 공지야 — 편집자가 여기서 만들고 복사해.",
      ev18v: "카드마다 할 일과 마감일 ⏰, 지나면 빨간 '기한 지남'이 떠. 체크는 편집자들의 진행 상황이야.",
      ev38: "📋 체크한 이벤트의 게임 내 가이드: 하나 열고 쓰고 싶은 메시지를 체크한 뒤 ＋ 초안에 추가 — 300자 제한에 주의해.",
      mp03: "지도야. 아무 마커나 누르면 선택돼. 고리는 계획을 보여줘 — 초록 ✅ 보호 중, 빨강 ⚔️ 취약, 노란 점선 🎯 목표. 그 Sparrow의 고백: 지도를 자주 안 열어서 가끔만 업데이트돼 🐦 마커는 세 종류야. 하나씩 보여줄게…",
      mp30: "색깔 네모는 전초기지야: 색은 종류(무기고, 병기고, 훈련소…), 숫자는 레벨이고, 우리 것이면서 보호 중일 때 버프를 줘. 하나 선택했어 — 자세한 건 아래 상자에.",
      mp31: "◆ 요새와 ● 성소(F1…, S1…)는 버프가 없어: 성소 전투에 신청하는 대상이고, 페이즈마다 시즌 점수를 줘. 🎯 고리는 목표, ✅ 는 우리 것. 하나 선택할게…",
      mp32: "가운데 👑 왕의 성, 그리고 🛡️ 우리 [NXS] 평원·황무지 본부. 깃발은 본부에서 바깥으로 이어 붙여. 색깔 영토선은 각 연맹의 땅이야.",
      mp08: "📋 전초기지 계획: 우리가 가진 것과 원하는 것 전부, 정보 상자에서 찍은 표시로 계산돼. 하나씩 볼게…",
      mp20: "⭐ 우선순위 — 요새나 성소용: 숫자를 골라 (1 = 제일 원하는 것, — 는 지우기). 📏 는 우리 본부에서의 거리야.",
      mp20v: "⭐ 우선순위: 편집자가 이 요새/성소에 준 숫자(1 = 제일 원함)와 우리 본부에서의 거리.",
      mp21: "보상과 메모: 이게 뭘 주는지(게임 정보 기준)랑 알아둘 것 — 지난주 누가 가졌는지, 얼마나 치열한지. 💾 계획 저장으로 같이 저장돼.",
      mp22: "전초기지를 종류와 레벨별로, 레벨당 버프와 함께. ✅ ⚔️ 🎯 는 계획 상태야. 칩을 누르면 선택돼.",
      mp23: "합계가 따르는 게임 규칙: 같은 종류 같은 레벨은 중첩 안 됨, 우리 영토와 붙어 있어야 함, 취약 = 버프 없음.",
      mp24: "버프 표: 전초기지 종류별 한 줄 — 지금(게임 기준: 보호 중만)과 목표 포함(보유 + 취약 + 목표).",
      mp25: "🎯 목표: 다음에 노릴 전초기지. 칩을 누르면 지도에서 선택돼.",
      mp26: "✅ 우리 것 · 보호 중: 버프가 켜진 보유 기지, 각각 취약으로 바뀌기까지의 ⏱ 시간.",
      mp27: "⚔️ 우리 것 · 취약: 보유 중이지만 지금은 버프가 없고, 다시 보호되기까지의 시간이 보여.",
      mp28: "⚠️ 버프 충돌: 같은 종류 같은 레벨이 둘 — 더 오래 보호 중인 것만 쳐줘.",
      mp29: "🏛️ 요새와 성소: 버프는 없지만 페이즈마다 시즌 점수(성소 1, 요새 2…) — 지금과 목표 포함 점수, 그리고 🎯 목표와 ✅ 우리 것 목록. 페이즈당 성소 하나, 요새 하나만 신청할 수 있어.",
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
      ev34: "간부용 할 일 항목이야. 줄마다 할 일 하나인데 '시작 며칠 전(−) 또는 후', 선택 사항인 '까지' 시각, 선택 사항인 정확한 🔔 알림 시각(UTC, 예: 22:30 — 이 이벤트 알림을 받는 간부는 딱 그 시각에 알림을 받아), 그리고 내용이 있어. 상자 두 개는 그 할 일에 📢 공지 버튼이나 📊 랭킹 버튼을 붙여. + 할 일 항목은 줄을 추가하고, ✕는 지워.",
      ev35: "게임 내 가이드야. 상자 하나 = 채팅 메시지 하나, 제목이 붙어. + 메시지는 하나 추가하고, ✕는 지워.",
      ev36: "이벤트 삭제는 모두에게서 지워(먼저 물어봐).",
      ev37: "💾 저장은 이벤트를 모든 간부용으로 사이트에 기록해. 취소는 저장 없이 닫아.",
      bd01: "💬 게시판은 같이 계획 세우는 곳이야. 中文, English, Português, العربية, 한국어로 쓸 수 있어. ↻는 새로고침이야.",
      bd02: "📋 네 할 일이야. 너한테 배정됐거나 네가 @로 언급된 것들. 하나 누르면 그 글로 이동해.",
      bd03: "+ 새 주제는 토론을 시작해. 내가 폼을 열어 볼게…",
      bd03v: "보기 전용 간부도 모든 주제를 읽을 수 있어. 글을 쓰려면 편집 권한이 필요해. 아니면 @로 언급되거나 배정된 경우, 관리자가 그런 답글을 허용했다면 가능해.",
      bd04: "주제 제목(무슨 얘기인지)과 네 메시지야. 초안은 보낼 때까지 이 기기에 남아 있어.",
      bd05: "@는 멘션을 넣어. 간부 한 명이나 @all을 골라. 그 사람들한테는 주제에 📣 태그가 보여.",
      bd06: "📋 배정은 메시지를 네가 고른 사람들의 할 일로 바꿔. 그 사람들한테 ✅ 완료 버튼이 생겨.",
      bd07: "🖼️는 사진을 첨부해(최대 4장, 붙여넣기도 돼). [[img]] 표시가 글 속 어디에 들어가는지 보여줘.",
      bd08: "게시를 누르면 바로 보내져. 원문만 저장되니까 기다릴 필요 없어. 취소는 폼을 숨기고 초안은 남겨.", bd08t: "🌐 모두에게 번역: 체크하면 메시지가 백그라운드에서 5개 언어로 번역돼(바로 올라가고 번역이 끝나면 저절로 바뀌어). 기본은 꺼져 있고 이 기기에 기억돼. 안 쓰면 읽는 사람이 글 아래 \"🌐 …(으)로 번역\"을 눌러 자기 언어만 번역하고, 그 번역은 모두를 위해 저장돼.",
      bd09: "주제 목록이야, 최근 활동 순. 누가 시작했는지, 메시지 몇 개인지, 마지막 업데이트. 빨간 점 = 네가 마지막으로 연 뒤에 바뀜, 📌 결정됨 = 결정이 고정됨. 누르면 열려. 내가 하나 열어 볼게…",
      bd10: "← 모든 주제는 목록으로 돌아가.",
      bd11: "카드 하나가 메시지 하나야, 네 언어로. 원문 보기는 실제로 쓴 글을 보여줘. 사진은 누르면 전체 화면으로 열려.",
      bd12: "📌 결정으로 설정은 이 메시지를 결과로서 주제 맨 위에 고정해. 결정 해제는 고정을 풀어.",
      bd13: "✏️ 편집과 🗑️ 삭제는 네 메시지에만 보여. 삭제는 두 번 물어봐. 첫 메시지를 지우면 주제 전체가 지워져.",
      bd14: "✅ 완료야. 메시지가 네 할 일이면 여기서 완료 표시해(↩︎ 미완료로 되돌려).",
      bd15: "답글 상자야. 같은 @, 📋 배정, 🖼️ 도구가 있어. 답글을 누르면 보내져.",
      bd15v: "답글을 쓰려면 편집 권한이 필요해. 여기서 @로 언급되거나 배정됐고 관리자가 허용했다면 예외야.",
      hp03: "🔄 계획: “🔒 이 기기에서만”은 내 초안이에요. “➕ 공유 계획으로 저장”으로 이름을 붙이면 🚚 이사 탭이 있는 간부 모두가 이 목록에서 열 수 있고, 변경은 자동 저장돼요. ✏️ 이름 변경 / 🗑️ 삭제. 이사 편집 권한이 없으면 보기만 돼요.",
      hp01: "📐 자동 계획: 새 벌집의 Kingshot Mapper CSV(성, 곰 함정, 본부, 그린 깃발, 자원, 장애물)를 불러와요. 사이트가 새 본부까지 길 두 개 — 지금 본부에서 시작하는 길과 가장 짧은 길(점선, 🔀로 바꾸기) — 를 계산하고, 깃발을 1단계(BT2 쪽) / 2단계로 나누고, 산·호수·건설 금지 구역·자원·다른 연맹을 확인하고, 285 한도와 가장 가까운 성채를 계산해서 게임처럼 그리고 아래에 표를 붙여요.", hp02: "✏️ 무엇이든 바꾸기: 펜(⚫ 길, 🟡 1단계, 🟠 2단계, 🧽 지우기, 🏯 본부 이동)을 고르고 지도를 누르면 번호와 표가 바로 바뀌어요. ↩️ 되돌리기, 🔄 길 다시, ⬇️ 그림(PNG)이나 청사진 CSV, ➡️ 이사 계획으로 쓰기는 🧭 이사 단계에 넣어요.",
      mv08: "✋ 연맹원 배치: 지도의 점선 자리를 누르고 “아직 자리 없음”에서 이름을 누르세요(또는 입력) — 가까운 다음 빈 자리로 넘어가서 한 줄을 빨리 채울 수 있어요. “이 자리 비우기”로 이름을 빼요. 그다음 💾 저장. 지금은 직접 배치해요 — 자동 배치를 원하면 Sparrow에게 물어보세요.",
      mv00: "📘 벌집 규칙과 팁: 본부를 둘 수 있는 곳(비옥한 땅은 안 돼), 깃발 연결 방법, 한도, 이사 순서. 누르면 열려.", mv01: "🚚 이사: 이사 전체를 지도 하나로 — 지금 연맹원 위치(👥 위치) 위에 이사 계획을 겹쳐 그려요: 점선 칸 = 계획한 성 자리, 번호 깃발 = 길(R), 먼저 세우는 벌집 깃발(P), 1단계(S1), 2단계(S2), 점선 본부 / 곰 함정 = 새 위치, ✖ = 철거할 다른 연맹 깃발. 관리자, 또는 👥 표에서 이 탭을 받은 사람만 봐요.", mv09: "📍 명단에서 위치 가져오기: 연맹원마다 성 X:Y가 명단에 들어 있어요. 연맹원이 이사하면 MightPulse 지도에서 Update Map을 누르고 🔄 명단 지금 업데이트를 누르세요 (약 5분 — 🕵️ 관찰 탭과 같은 버튼). 누가 어디로 갔는지 보여요 (✅ = 새 자리 도착). ✅ 이 위치 사용을 누르면 👥 연맹원 위치에 저장되고, 이사 표와 단계가 저절로 체크돼요. 연맹을 나간 사람도 표시되고 같은 ✅로 빠져요.", mv02: "🧭 이사 단계: 계획 순서대로 — 길, 먼저 세우는 깃발 / 철거, 본부 이전, 1단계, BT2 쪽 연맹원, 2단계, BT1 쪽 연맹원, 곰 함정은 마지막. ▶가 지금 단계예요. 지도에 보이면 ✅가 저절로 붙고, 나머지는 눌러서 체크한 뒤 💾 저장하세요. 깃발 수(285 한도)는 맨 아래에 있어요. 여기서 체크한 깃발은 🗺️ 지도에서도 세워진 것으로 쳐요.", mv03: "이사 표: 각 연맹원의 현재 X:Y → 새 자리 (누르면 복사). 아래 👥 연맹원 위치의 자리가 이미 새 자리와 같으면 ✅ 가 저절로 붙어. “아직 안 옮긴 사람만”을 체크하면 남은 사람이 보여.", mv04: "✓ 이사 완료: 누가 옮기면 직접 체크하고 💾 저장해.", mv05: "➕ 자리 추가 / 변경: 이름과 X Y를 입력하면 원래 자리는 비게 돼. 목록의 빈자리를 누르면 X Y가 채워져.", mv06: "이사 계획 불러오기: Kingshot Mapper에서 내보낸 CSV (성 라벨은 연맹원 이름; .json도 돼). “계획 지우기”로 지울 수 있어.", mv07: "💾 저장: 이름을 쓰고 저장하면 이 탭이 있는 다른 간부들도 같은 계획을 봐.",
      mp40: "👥 연맹원 위치: 게임처럼 보이는 우리 구역 — 모두의 성, 곰 함정, 본부. 성을 누르거나 이름을 검색하면 X:Y와 복사 버튼이 나와. 📍는 지금 우리 본부로, 🧭는 새 본부로 이동해요.", mp33: "⬇️ 깃발 좌표 다운로드: 지금 지도에 보이는 모든 깃발(파일 + 간부 수정)과 🚩 계획한 깃발을 Kingshot Mapper CSV로 저장해. NXS = 게임에서 확인, NXS? = 추정, plan = 아직 안 세움. 두 번째 버튼은 🏴 다른 연맹 깃발이야 (라벨 = 연맹 태그).", mp41: "📋 위치 붙여넣기로 사람을 추가하거나 옮기고 (한 줄에 하나: 이름 X Y) 💾 저장해. 주황 = 명단에서 못 찾은 이름.", mp01: "레이어야. 전체, 📋 계획만(계획 상태가 있는 전초기지만), 🛰️ 영토(간부들의 스크린샷을 이어 붙인 거야. 같은 색 = 같은 연맹), 그다음 건물 종류별 칩 하나씩. 종류를 처음 누르면 그 종류만 보이고, 더 누르면 켜고 꺼져.",
      mp02: "+와 −는 확대/축소야(핀치나 마우스 휠도 돼). 드래그해서 움직여.",
      mp04: "선택한 것의 정보 상자야. 이름, 레벨과 버프, 누가 다툴 수 있는지, X/Y 좌표. 복사를 누르면 클립보드에 들어가.",
      mp05: "상태 버튼이야. 🎯 목표, ✅ 우리 것 · 보호 중, ⚔️ 우리 것 · 취약, ✕ 지우기. 메모리 안의 계획만 바뀌니까 끝나면 💾 계획 저장을 눌러.",
      mp05v: "편집자가 여기서 상태를 표시해(🎯 목표, ✅ 보호 중, ⚔️ 취약). 결과는 아래 계획에서 볼 수 있어.",
      mp06: "⏱ 타이머야. 보호 중이나 취약으로 표시한 뒤, 게임에 보이는 카운트다운(일 시 분)을 적고 타이머 설정을 눌러. 그러면 페이지가 알아서 보호 중 ⇄ 취약을 바꿔. 타이머 제거는 지워.",
      mp06v: "⏱ 다음 보호 중 ⇄ 취약 전환까지의 카운트다운이야. 편집자가 타이머를 설정했을 때 보여.",
      mp07: "⭐ 성소 & 요새 우선순위야. 지도에서 요새나 성소를 선택하고 번호를 골라(1 = 최고), 보상과 메모도 같이. 이 목록은 순서대로 보여줘. 줄을 누르면 선택돼.",
      mp07v: "⭐ 성소 & 요새 우선순위야. 편집자가 정한 순위(1 = 최고)와 보상, 메모야. 줄을 누르면 선택돼.",
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
      mp18e: "✏️ 보상 업데이트: 성채 / 유적마다 특별 보상이 회차마다 바뀔 수 있어. 게임의 「쟁탈 보상」 화면을 보고 각각의 보상과 수량을 고르고(새 보상은 ✍️ 기타) 저장해 — 모든 간부가 보고, 누가 언제 업데이트했는지도 나와. 시즌과 회차도 적어 (예: 제3시즌 5/8회): 회차마다 보상이 달라. 회차 선택으로 아무 회차나 볼 수 있어 — 기본은 이번 주; 아무도 확인하지 않은 회차는 Kingshot Wiki 표(📖)가 나오고, 누가 게임 목록을 저장하면 ✅가 돼.",
      mp18g: "🎁 차지하면 받는 보상: 목표로 한 성채 / 유적이 각각 무엇을 주는지야. 보상 카드에서 고른 회차 기준(기본은 이번 주).",
      mp19: "종류와 레벨별 건물 목록이야. 칩을 누르면 지도에서 그 건물이 선택돼. 마커를 누르는 거랑 같아.",
      rk01: "📋 계획이야. 🔒 이 기기에서만은 체크와 표를 이 브라우저에만 둬. 🔄 공유 계획은 모든 간부에게 같아. 체크, 가중치, 그룹 인원, 전투 표가 몇 초 안에 동기화되고, 출석 탭이 날짜별 목록을 여기서 만들어.",
      rk02: "↩️ 실행 취소는 최근 변경(체크, 가중치, 표)을 하나씩 되돌려. 공유 계획에선 실행 취소도 공유돼.",
      rk02r: "🗂️ 계획 복구 (관리자만): 서버의 모든 계획과 모든 저장 기록 — 삭제된 계획도. 계획을 누르고 버전 (시간, 저장한 사람, 체크 인원, 응답, 표 줄 수)을 골라 복원하면 모두에게 현재 계획이 돼. 계획마다 최근 1000번까지 저장돼. 📜 예전 GitHub 저장: 10/30 이전 계획 — 저장 하나를 골라 새 공유 계획으로 가져와.", rk03: "+ 새 공유 계획이야. 이름을 정하고(예: Legion 1) 지금 체크된 사람들로 시작할지 골라. 이름 변경과 삭제는 열려 있는 계획에 적용돼. 🕘 버전은 계획을 이전 저장 시점 아무 데로나 되돌려. 거기서 📱는 이 기기에서 마지막으로 편집한 전투 배치표가 계획에 안 들어갔을 때 다시 넣어 줘.",
      rk05r: "✅ 등록: 체크한 이름 옆 ⏳를 누르면 ✅ 확정 → ❌ 못 옴 → ⏳ 미응답 순으로 바뀌어; 🟡 = 믿을 수 있는 멤버, 기다리지 않고 등록(모든 계획에서 기억돼). 이 줄은 등록 가능한 인원(✅ + 미응답 🟡)을 세. 📋 명단 복사로 그 사람들만, 또는 미응답자만 복사해서 호출할 수 있어.",
      rk03s: "💾 화면 위쪽 상자가 공유 계획 저장 상태를 보여줘: ✅ 저장됨 · 시간, ⏳ 저장 중, 또는 ⚠️ 아직 저장 안 됨 — 그럴 땐 변경이 이 기기에 남아 있고 알아서 다시 보내(새로고침해도), 그러니 페이지를 닫지 마. 저장할 때 네가 바꾼 것만 보내서, 두 간부가 동시에 고쳐도 서로 지우지 않아.",
      rk03v: "공유 계획은 편집자가 만들어. 여기서 열어서 같이 볼 수 있어.",
      rk04: "✏️ 편집 가능한 사람이야. 모든 간부, 또는 만든 사람이 고른 사람만(만든 사람과 관리자는 항상 가능).",
      rk05: "① 랭킹 방식이야. 부대 전투력 맞춤(소드랜드 군단 화면에 보이는 부대 전투력, 이주 점수로 추정) 또는 가중치, 스탯을 체크하고 각각 가중치를 주는 방식. 메모에 공식이 설명돼 있어.",
      rk06: "가중치야. 계산에 넣을 스탯을 체크하고 각각 퍼센트를 줘. 합이 100일 필요는 없어.",
      rk07: "② 참가자와 순위: 이번 이벤트 사람을 여기서 체크해 — 같은 표가 순위도 매겨. 전체 선택은 명단 전체를 체크하고, 전체 해제는 비워.",
      rk08: "신청 목록 붙여넣기야. 한 줄에 이름 하나나 쉼표로 구분, 장식은 상관없어. 이 플레이어 체크는 명단과 맞춰서 체크해. 못 찾은 이름은 따로 보여줘.",
      rk09: "이름 검색은 표를 걸러; 체크한 사람만은 체크한 사람만 보여; 순위대로 정렬(기본으로 켜짐)은 체크한 사람을 순위대로, # 칸에 순위를 표시하고 나머지는 뒤에. 열 제목을 누르면 그 열로 정렬해.",
      rk10: "명단이야. 왼쪽 상자 = 주전(순위 매김), 오른쪽 상자 = 후보(후보로 표시, 순위 없음, 출석에서 후보로 가져옴). 줄 아무 데나 누르면 체크돼. 랭크 줄은 그 랭크 전체를 체크하고, 열 머리글을 누르면 정렬돼.",
      rk11: "상위 N명만 사용: ③ 조 편성과 ④ 전투표는 순위 상위 N명만 써; 그 뒤 줄은 흐려져. 비우면 전원.",
      rk12: "📋 명단 복사: 누구를(순위 전체, 상위 N명, 등록 가능한 사람만, 미응답자만), 어떤 칸을(순위, 이름, ID, 응답, 수치, 점수, 후보) 어떤 형식으로 — 텍스트, Google 스프레드시트 / Excel에 붙일 표, 정렬된 Discord 표 — 복사할지 골라. 복사 전에 미리보기가 있고 선택은 기억돼.",
      rk14: "③ 이벤트 그룹이야. ⚔️ 소드랜드 결전을 누르면 랭킹이 공격자, 수비자, 참가자로 나뉘고, 🔱 삼대 연맹전을 누르면 연맹 계획대로 4팀으로 나뉘어 (A팀 공격, B팀 적 영토 유지, C팀 최전선은 체크한 인원의 4분의 1씩, D팀 지원 = 나머지 — 숫자를 바꿨다면 ↺ 자동; ④ 전투 배치표는 이벤트를 따라가). 팁: 따로 🔄 공유 계획을 만들면 체크가 소드랜드와 섞이지 않아.", rk14t: "🔱 삼대 연맹전 전투 배치표: “🔱 삼대 연맹전 계획 초안”이 ③의 A–D팀으로 연맹 계획의 4단계를 한 번에 채워 — 팀마다 한 줄 (리더 = 팀 최강), D팀은 경로 I / II로 나누고, 파도 신전 입장 순서 (C·D 먼저, B 두 번째, A 마지막, 최강이 맨 끝). 그다음 뭐든 바꿀 수 있어.", rk01e: "🎯 이벤트: 계획마다 한 번 골라 (⚔️ 성검 또는 🔱 삼대 연맹전) — ③ 그룹과 ④ 전투 배치표가 알아서 바뀌고, 계획이 모두를 위해 기억해.", rk17e: "“이 표는:” 표마다 이벤트가 하나야 — ⚔️ 성검 또는 🔱 삼대 연맹전. 빈 표는 ③에서 고른 이벤트를 따르고, 다른 이벤트로 채워진 표는 알림만 띄우고 바꾸기 전에 물어봐.",
      rk15: "공격자 / 수비자야. 각각 몇 명인지, 랭킹 위에서부터 뽑아. 나머지는 전부 참가자야. 같은 숫자가 ④를 움직여.",
      rk16: "결과 복사는 그룹을 Discord 글로 복사해. 작은 지도는 소드랜드 지도를 열어.",
      rk17: "④ 전투 표야. 페이즈마다 누가 어떤 건물을 공격하거나 수비하는지. 목록에서 사람을 고르고 상자를 눌러 넣어(컴퓨터에선 드래그). ×는 빼.",
      rk17v: "④ 전투 표야. 페이즈마다 누가 어떤 건물을 공격하거나 수비하는지. 읽고 복사할 수 있어. 편집은 이 기기에만 남아.",
      rk18: "표 설정이야. 페이즈(쉼표 구분, 이름 변경·추가·삭제 가능), 추천으로 뜨는 건물 번호와 이름, 어떤 열을 어떤 이름으로 보여줄지, 그리고 짧은 이름(亗나 Nexus 같은 장식을 뺌).",
      rk19: "✨ 첫 초안 채우기야. 랭킹 #1부터… 건물마다 한 명씩 공격자로, 그다음 사람들은 수비자로, 나머지는 참가자로. 공격자 / 수비자 숫자를 써.",
      rk20: "⚔️ 소드랜드 규칙 초안은 연맹 규칙대로 3개 페이즈를 다 채워. 페이즈 1은 ①~④에 순위대로 공격자와 수비자, 페이즈 2는 검의 신전 / 용병 캠프 / 홀, 그다음 잔류. 그 뒤에 고쳐.",
      rk21: "📥 텍스트 붙여넣기 → 표는 Discord용으로 쓴 배정 글(① ROYAL STABLES / * ⚔️ Attacker: …)을 읽어서 표로 바꿔. 이름은 명단과 맞춰. 📝 초안 삽입은 먼저 고칠 수 있는 준비된 텍스트를 줘.",
      rk22: "표 지우기는 모든 건물을 비워(페이즈와 설정은 남아). ↩️ 실행 취소로 되돌려.",
      rk23: "공격자 / 수비자 인원이야. ③와 같은 숫자야.",
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
      at06r: "① 등록: 각자의 응답(✅ 확정, ❌ 못 옴, ⏳ 미응답)과 🟡 믿을 수 있는 멤버는 순위 탭 계획에서 와 — 거기서 정하고 🔄 계획대로 명단 갱신을 눌러. 위 줄은 등록 가능한 인원이고, 미응답자와 등록 명단 복사 버튼이 있어.",
      at06rv: "① 등록: ✅ 확정, ❌ 못 옴, ⏳ 미응답; 🟡 = 기다리지 않고 등록하는 멤버(순위 탭에서 설정).",
      at07: "사람 추가야. 이름을 붙여넣고 명단 맞추기, 📷 투표 스크린샷 업로드(이름을 대신 읽어 줘), 또는 목록에서 멤버 추가로 직접.",
      at08: "② 전투 후야. 이름을 누르면 ✓ 출석 → X 불참 → 🛌 사유 결석 순으로 바뀌어. 주황(2번째)과 빨강(3번째)은 반복 불참 표시야. 모두 출석은 한 번에 전원 표시해.",
      at08v: "② 전투 후야. ✓ 출석, X 불참, 🛌 사유 결석. 주황과 빨강 = 반복 불참.",
      at09: "저장은 목록을 모든 간부용으로 서버에 저장해. Discord용 복사는 요약을 복사하고, 이 목록 삭제는 지워.",
      at09v: "Discord용 복사는 이 목록의 요약을 복사해.",
      po01: "✍️ 작성이야. 네 이름과 쓰는 언어. 네 언어로 쓰면 사이트가 12개 언어로 다 번역해.",
      po01v: "📢 게시야. 공지를 여기서 쓰고 12개 언어로 번역해. 목록을 불러오려면 편집 권한이 필요해. 이 탭이 필요하면 관리자한테 말해.",
      po02b: "Word처럼 꾸미기: 글을 선택하고 B / I / U / S, 형광펜, 🎨로 색, Aa로 글꼴을 골라. H1 / H2는 제목, • ≡ 는 글머리 기호 선택(• ★ ✔ ➤ …), 1.≡ 는 번호, ⇤ ⇥ (또는 Tab / Shift+Tab)는 들여쓰기, ❝ 는 인용 상자, ― 는 구분선. 목록·제목은 한 번 더 누르면 취소. 모든 언어에 그대로 남아. ChatGPT, Word, 구글 문서에서 붙여 넣어도 서식이 유지돼. 🐦 예시를 누르면 버튼마다 예시를 채워 줄게 — ↩️로 네 글을 되돌려.", po02: "제목과 메시지야. **텍스트** = 굵게, 링크는 그냥 돼.",
      po03: "🖼️ 사진 추가는 사진을 줄여서 커서 위치에 [[img]] 표시를 넣어. 게시할 때 업로드돼.",
      po04: "가이드 버튼은 공지 아래에 사이트 가이드 중 하나를 여는 버튼을 붙여.",
      po05: "모양이야. 기본, 📜 두루마리, 또는 ⛵ 바이킹의 복수 같은 테마 — 위에 이벤트 그림, 깃발은 그 색(옆에서 다른 색도 고를 수 있어). 두루마리는 언어마다 글 길이에 맞춰 늘어나.",
      po06: "자동 삭제야. 공지가 언제 알아서 사라질지. 오늘이나 내일이 끝날 때, 1 / 2 / 3 / 7일 뒤, 또는 UTC 날짜와 시간.",
      po07: "미리보기는 멤버들이 보는 모습 그대로 보여줘.",
      po08: "📢 게시는 한 번 물어본 뒤 사진을 올리고 글을 저장해. 번역된 공지는 2~3분쯤 뒤에 사이트에 보여.",
      po09: "📋 사이트의 공지야, 최신순. 🖼️ 사진 있음, ⏳ 아직 번역 중, 🗑️ 자동 삭제 시간, ✏️ 언어 = 직접 고침. 새로고침은 목록을 다시 읽어.",
      po10: "편집은 공지를 열어서 고치게 해. 삭제는 모든 언어에서 사이트에서 지워(먼저 물어봐). 내가 편집을 열어 볼게…",
      po11: "뭘 바꿀지야. 모든 언어(원문을 작성 폼에 열고 전부 다시 번역), 🖼️ 사진만 추가(새 번역 없음), 또는 언어 하나, 그 번역만 직접 고치기. 자동 번역 다시 사용은 고친 걸 되돌려.",
      wa07: "🔄 명단 지금 업데이트: MightPulse에서 연맹원 전체를 다시 가져와 (전투력, 신비한 시련, 성 X:Y…) — 매일 20:13 UTC 자동 업데이트와 같은 작업이야. 약 5분 걸리고 표가 저절로 바뀌어. 🚚 이사 탭에도 같은 버튼이 있어 — 요청은 하나야.", wa01: "📋 Google Sheets용 복사는 아래 멤버들을 표로 복사해. A1 셀에 붙여넣어. ⬇️ CSV 다운로드는 같은 파일을 저장해.",
      wa01v: "🕵️ 감시는 모든 멤버를 살펴볼 만한 것에 대한 플래그와 같이 보여줘. 복사 / CSV 내보내기는 편집자용이야.",
      wa02: "이름이나 ID 검색은 목록을 걸러. 플래그 있는 멤버만은 수상한 사람만 남겨. '신규 = 가입한 지'는 얼마 동안 신규로 치는지 정해.",
      wa03: "감시 연맹이야. 여기서 보인 멤버는 빨간 플래그가 붙어. 우리 농장 / 자매 연맹은 거기서 제외돼.",
      wa04: "열 머리글을 누르면 정렬돼. 플래그는 기록 확인, 신규, 출신 왕국, 이전 소속…, n개 연맹에서 보임, 같은 이름이…에. 기록 ↗은 MightPulse에서 그 플레이어를 열어.",
      wa05: "✏️는 메모를 열어. 이전 연맹과 이름, '기록을 확인했음', 이상 없음 ✅ / 의심됨 ⚠️, 이유, 네 이름. 저장하면 모든 간부와 공유돼.",
      wa05v: "이상 없음 ✅ / 의심됨 ⚠️과 코멘트는 그 멤버에 대한 간부들의 메모야.",
      wa06: "NXS 탈퇴야. 누가 언제 나갔고, 그 뒤 어디서 보였는지.",
      ak01: "⚔️ 공격 계획: 그들 주둔 대장, 병력과 등급을 고르고, 우리 집결 대장을 순서대로 골라 (병력, 등급). 모두 오늘의 MightPulse 강도와 같이 보여. r (그들 병사 1명 ≈ 우리 1/r명), 집결마다 남는 병력, 필요한 집결 수, 작은 불확실성 표가 나와. 대략적인 계산 — 공격 쪽을 낮게 봐. 맨 위 전환: 🏰 우리 왕국 안 (우리 = NXS, 상대 = #2189 다른 연맹) 또는 ⚔️ KvK (우리 = #2189 전체, 상대 = 🔭 정찰에서 추가한 상대 왕국).", ak02: "📊 오늘의 강도 = 영주 장비 + 영웅 장비 + 마스터 전투력, 최신 MightPulse 랭킹 (세 랭킹 모두 상위 100인 사람만). NXS와 다른 연맹의 상위 15명, 그리고 검색창.", gr01: "🧭 공격 vs 방어: 대장 참고용 — 공격 (집결 대장)과 방어 (방어 대장)에 각각 필요한 것 (영웅, 부속품, 능력치, 용량, 병종 비율), 누가 어느 쪽에 맞는지.", ak03: "⚔️ 우리가 공격 / 🛡️ 상대가 공격: 두 번째 전환으로 누가 건물을 지키는지 바꿔요. 🛡️에서는 상대 집결을 모두 막는 최소 주둔군도 보여줘요. 등급은 \"혼합…\"으로 TG3 / TG2 / TG1 / TG0 인원을 넣으면 평균으로 계산해요. 양쪽 병종 비율 (보병 : 기병 : 궁병)을 확인하고 보병 40% 미만이면 경고해요.", ak04: "🗡️ 성검: 📊 순위 계획을 고르고 (우리 명단; 후보는 계획에서, 이름을 누르면 전환), 상대 왕국과 연맹 태그를 넣고 🔄 가져오기 (그 자리에서 멤버를 가져와요). \"확정만\"과 \"후보 포함\"으로 답해요: 성검 제단을 빼앗을 수 있는지, 몇 명이 지켜야 하는지, 누구를 조심할지 (⚠️). 양쪽을 한 순위로 보여줘요: 상대 플레이어를 눌러 ⚠️ 주의할 사람을 표시하세요. 🔭 정찰은 ⚔️ KvK에서만 보여요.", hn01: "🎯 블랙리스트: 전군 출격용. 초록 = 이벤트 진행 중. 명단을 저장하거나 누군가 ↻ 새로고침을 누를 때 MightPulse에서 조회해요 (자동 조회 없음 — MightPulse는 “Update Map” 후에만 바뀌어요). 관리자, 또는 👥 표에서 이 탭을 받은 사람만 봐요.", hn02: "명단의 각 플레이어: 게임 이름, 연맹, 왕국, 성 X:Y (누르면 복사), 보호막 (🛡️ …까지). 시각은 모두 \"UTC (현지)\" — 데이터 시각은 MightPulse 기준이라 최대 60분 늦을 수 있어요. X:Y 옆 ✏️: 더 새로운 위치를 직접 입력 — MightPulse가 따라잡을 때까지 모두에게 보여요. 🧭 원칙: 위치 그대로 → 여기 위치로; 옮겼으면 → MightPulse ↗ 확인 후 ✏️로 업데이트.", hn03: "➕ 프로필의 ID로 플레이어 추가 (메모도 가능), ✕ 삭제, 그다음 💾 명단 저장 — 약 2분 뒤 첫 결과가 나와요.", hn06: "🛡️✏️ MightPulse가 몇 시간 늦을 수 있어요 (시각 옆 ⚠️ = 2시간 넘게 갱신 없음). 보호막을 직접 고치세요: 남은 시간(시간, 분) 또는 🚫 보호막 없음. 모두에게 보이고 ⏰ 타이머도 따라가며, 더 새로운 MightPulse 데이터가 오면 자동으로 바뀌어요.", hn05: "⏰ 플레이어 추적: 그 줄의 ⏰를 누르면 보호막 종료 시각이 내 ⏰ 타이머가 되고 알림이 와요 (이 폰 / 브라우저만). 이 탭이 열려 있는 동안 최신 데이터를 따라가요.", hn04: "↻ 새로고침은 최신 데이터를 바로 가져와요; 페이지도 1분마다 저절로 갱신해요. 위치 / 보호막은 누군가 MightPulse 지도에서 “Update Map”을 눌러야 바뀌어요 (위의 🗺️ 버튼) — 누르고 ↻ 새로고침.", sc01: "왕국 번호를 적고 지금 가져오기를 눌러. GitHub 작업이 MightPulse에서 그 왕국의 이주 점수 상위 20명과 전투력 상위 20명을 읽어 와(2~3분, 페이지가 알아서 새로고침돼).",
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
      events: "📅 이벤트", board: "💬 게시판", map: "🗺️ 지도", ranking: "📊 랭킹", attend: "📋 출석", post: "📢 공지", watch: "🕵️ 감시", scout: "🔭 정찰", move: "🚚 이사", hunt: "🎯 블랙리스트", attack: "⚔️ 작전", growth: "🧭 육성", views: "📈 조회", perms: "👥 간부",
      },
  };
  const ot = (k) => (OT[lang()] || OT.en)[k] || OT.en[k];
  /* 🗺️ the officer tours, one step per button / control. s = selector, k = text key (a "…v" twin is the view-only wording),
     e = editor-only (view-only officers skip it unless a "…v" twin exists), pre = something to do first (open a sheet, select an outpost…).
     A step whose element isn't on screen is skipped quietly, so the tour fits whatever the page is showing. */
  const Q = (sel) => typeof sel === "function" ? (sel() || null) : document.querySelector(sel);
  const plSub = (emoji) => [...document.querySelectorAll("#km_plan .pl-sub")].find((e) => e.textContent.includes(emoji)) || null;   // a section heading of the outpost plan
  const clickQ = (sel) => { const el = Q(sel); if (el) el.click(); };
  const OTOURS = {
    events: [
      { s: "#cal", k: "ev01" }, { s: "#cal .ev.ms", k: "ev02" }, { s: "#msList", k: "ev03", pre: () => { const d = Q("#msList"); if (d) d.open = true; } },
      { s: "#anCard > summary", k: "ev04", e: 1, pre: () => { const d = Q("#anCard"); if (d && !d.open) d.open = true; } }, { s: "#anDays", k: "ev05", e: 1 }, { s: "#anGen", k: "ev06", e: 1 }, { s: "#anPick", k: "ev07", e: 1 }, { s: "#anGuides", k: "ev38", e: 1 }, { s: "#anText", k: "ev08", e: 1 }, { s: "#anCopy", k: "ev09", e: 1 },
      { s: "#limCard > summary", k: "ev10", e: 1, pre: () => { const d = Q("#limCard"); if (d) d.open = true; } }, { s: "#limBear", k: "ev11", e: 1 }, { s: "#limRally", k: "ev12", e: 1 }, { s: "#limSave", k: "ev13", e: 1 },
      { s: "#etCard > summary", k: "ev14", e: 1, pre: () => { const d = Q("#etCard"); if (d) d.open = true; } }, { s: "#etGrid", k: "ev15", e: 1 }, { s: "#etSave", k: "ev16", e: 1 },
      { s: "#thisW", k: "ev17" }, { s: "#todos .todo", k: "ev18", e: 1 }, { s: "#todos .todo [data-edtodo]", k: "ev19", e: 1 }, { s: "#todos .todo [data-anone]", k: "ev20", e: 1 }, { s: "#todos .todo .acts a, #todos .todo [data-open]", k: "ev21" },
      { s: "#ev_timed", k: "ev22" }, { s: "#td_add", k: "ev23", e: 1 }, { s: "#td_save", k: "ev24", e: 1 },
      { s: "#addEv", k: "ev25", e: 1 }, { s: "#evList details.evrow", k: "ev26", pre: () => { const d = Q("#evList details.evrow"); if (d) d.open = true; } },
      { s: "#evList details.evrow[open] [data-copy]", k: "ev27" }, { s: "#evList details.evrow[open] [data-igedit]", k: "ev28", e: 1 }, { s: "#evList details.evrow[open] [data-edit]", k: "ev29", e: 1 },
      { s: "#edName", k: "ev30", e: 1, pre: () => clickQ("#evList details.evrow[open] [data-edit]") }, { s: "#edFixed", k: "ev31", e: 1 }, { s: "#edNote", k: "ev32", e: 1 }, { s: "#edGuide", k: "ev33", e: 1 },
      { s: "#edTodos", k: "ev34", e: 1 }, { s: "#edIgs", k: "ev35", e: 1 }, { s: "#edDel", k: "ev36", e: 1 }, { s: "#edSave", k: "ev37", e: 1 },
    ],
    board: [
      { s: "#bd_reload", k: "bd01" }, { s: "#bd_tasks", k: "bd02" }, { s: "#bd_newBtn", k: "bd03", e: 1 },
      { s: "#bd_newTitle", k: "bd04", e: 1, pre: () => { if (Q("#bd_newForm") && Q("#bd_newForm").hidden) clickQ("#bd_newBtn"); } }, { s: "#bd_newForm [data-at]", k: "bd05", e: 1 }, { s: "#bd_newForm [data-assign]", k: "bd06", e: 1 }, { s: "#bd_newForm [data-img]", k: "bd07", e: 1 }, { s: "#bd_newPost", k: "bd08", e: 1 }, { s: "#bd_txNew", k: "bd08t", e: 1 },
      { s: "#bd_list .bd-topic", k: "bd09", pre: () => clickQ("#bd_newCancel") },
      { s: "#bd_back", k: "bd10", pre: () => clickQ("#bd_list .bd-topic") }, { s: "#bd_posts .bd-post", k: "bd11" }, { s: "#bd_posts [data-dec]", k: "bd12", e: 1 }, { s: "#bd_posts [data-edit]", k: "bd13", e: 1 }, { s: "#bd_posts [data-done]", k: "bd14" }, { s: "#bd_replyText", k: "bd15", e: 1 },
    ],
    move: [
      { s: "#mv_rules > summary", k: "mv00" }, { s: "#mm_map", k: "mv01" }, { s: "#km_members > h3", k: "mp40" }, { s: "#mm_pbtn", k: "mp41", e: 1 }, { s: "#mp_card", k: "mv09" }, { s: "#mv_steps", k: "mv02" },
      { s: "#mv_root .mm-mv", k: "mv03" }, { s: "#mv_root [data-done]", k: "mv04", e: 1 },
      { s: "#mv_an", k: "mv05", e: 1 }, { s: "#mv_root label[for=mv_file]", k: "mv06", e: 1 }, { s: "#mv_save", k: "mv07", e: 1 }, { s: "#mm_map .mm-ps.ed", k: "mv08", e: 1 },
      { s: "#hp_root > h3", k: "hp01" }, { s: "#hp_root .hp-sh", k: "hp03" }, { s: "#hp_root .hp-pens", k: "hp02" },
    ],
    map: [
      { s: "#km_layers", k: "mp01" }, { s: "#km_in", k: "mp02" }, { s: "#km_box", k: "mp03" },
      { s: "#km_sel", k: "mp30", pre: () => clickQ("#km_cards .chip[data-id^=o]") }, { s: "#km_info", k: "mp04" }, { s: "#km_info .km-st", k: "mp05", e: 1 }, { s: "#km_info .km-tm", k: "mp06", e: 1 },
      { s: "#km_sel", k: "mp31", pre: () => clickQ("#km_cards .chip[data-id^=s]") }, { s: "#km_info .km-prn, #km_info .km-prv", k: "mp20", e: 1 }, { s: "#sp_r", k: "mp21", e: 1 },
      { s: "#km_sel", k: "mp32", pre: () => clickQ("#km_cards .chip[data-id=k]") }, { s: "#km_cards .km-prc", k: "mp07", e: 1 },
      { s: "#km_plan > h3", k: "mp08" }, { s: "#km_plan .km-rules", k: "mp23" }, { s: "#km_plan table.pl-tbl", k: "mp24" },
      { s: () => plSub("🎯"), k: "mp25" }, { s: () => plSub("✅"), k: "mp26" }, { s: () => plSub("⚔️"), k: "mp27" }, { s: "#km_plan .km-gain", k: "mp18g" }, { s: "#km_plan .pl-cyc", k: "mp09", e: 1 }, { s: () => plSub("⚠️"), k: "mp28" },
      { s: () => plSub("🏛️"), k: "mp29" }, { s: "#km_sb", k: "mp11" }, { s: "#km_plan .pl-save", k: "mp10", e: 1 },
      { s: "#km_flags", k: "mp12" }, { s: "#fl_mode", k: "mp13", e: 1 }, { s: "#fl_obst", k: "mp14" }, { s: "#fl_kind", k: "mp15", e: 1 }, { s: "#km_flags .km-fl-list", k: "mp16", e: 1 }, { s: "#fl_dl", k: "mp33" },
      { s: "#km_mp", k: "mp17" }, { s: "#km_cards .km-rw", k: "mp18" }, { s: "#km_cards [data-rwedit]", k: "mp18e", e: 1 }, { s: "#km_cards .km-c:not(.km-prc):not(.km-rw)", k: "mp19" }, { s: "#km_cards .km-c:not(.km-prc):not(.km-rw) ~ .km-c", k: "mp22" },
    ],
    ranking: [
      { s: "#planSel", k: "rk01" }, { s: "#planEv", k: "rk01e" }, { s: "#planUndo", k: "rk02" }, { s: "#planRec", k: "rk02r", e: 1 }, { s: "#planNew", k: "rk03", e: 1 }, { s: "#planSave", k: "rk03s" }, { s: "#planEd", k: "rk04", e: 1 },
      { s: "#rk_mode", k: "rk05" }, { s: "#rk_wRow", k: "rk06" }, { s: "#allBtn", k: "rk07" }, { s: "#rk_reg", k: "rk05r" }, { s: "#pasteBox", k: "rk08" }, { s: "#rk_q", k: "rk09" }, { s: "#rk_list", k: "rk10" },
      { s: "#rk_topN", k: "rk11" }, { s: "#rk_copyBtn", k: "rk12" },
      { s: "#presetBtns [data-p]", k: "rk14", e: 1 }, { s: "#presetCounts", k: "rk15", e: 1, pre: () => { const b = Q("#presetBtns [data-p]"); if (b && !b.classList.contains("on")) b.click(); } }, { s: "#presetCopy", k: "rk16", e: 1 },
      { s: "#tbCard h2", k: "rk17" }, { s: "#tbCard .tb-ev", k: "rk17e" }, { s: "#tbCard details.tb-setup > summary", k: "rk18", e: 1 }, { s: "#tbCard [data-act=draft]", k: "rk19", e: 1 }, { s: "#tbCard [data-act=ssDraft]", k: "rk20", e: 1 }, { s: "#tbCard [data-act=triDraft]", k: "rk14t", e: 1 }, { s: "#tbCard [data-act=import]", k: "rk21", e: 1 }, { s: "#tbCard [data-act=clear]", k: "rk22", e: 1 },
      { s: "#tbCard .tb-counts", k: "rk23", e: 1 }, { s: "#tbCard .tb-pool", k: "rk24" }, { s: "#tbCard .tb-group", k: "rk25" }, { s: "#tbCard [data-set=rem]", k: "rk26", e: 1 },
      { s: "#tbCard [data-act=image]", k: "rk27" }, { s: "#tbCard [data-act=text]", k: "rk28" }, { s: "#tbCard [data-act=game]", k: "rk29" }, { s: "#tbCard [data-act=xlsx]", k: "rk30" },
    ],
    attend: [
      { s: "#at_list .card", k: "at01", e: 1 }, { s: "#at_list .at-sheet", k: "at02" }, { s: "#at_list .at-sheet table.at-sum ~ table.at-sum", k: "at03" },
      { s: "#at_back", k: "at04", pre: () => clickQ("#at_list .at-ev, #at_list .at-open, #at_list .at-make") }, { s: "#at_evSheet", k: "at05", e: 1 }, { s: "#at_edit_body .at-reg", k: "at06r", e: 1 }, { s: "#at_edit_body .chips", k: "at06", e: 1 }, { s: "#at_match", k: "at07", e: 1 }, { s: "#at_edit_body .at-plist", k: "at08", e: 1 }, { s: "#at_save, #at_copy", k: "at09", e: 1 },
    ],
    post: [
      { s: "#author", k: "po01", e: 1 }, { s: "#annTitle", k: "po02", e: 1 }, { s: "#fmtBar", k: "po02b", e: 1 }, { s: "label[for=imgPick]", k: "po03", e: 1 }, { s: "#guide", k: "po04", e: 1 }, { s: "#annStyle", k: "po05", e: 1 }, { s: "#expSel", k: "po06", e: 1 }, { s: "#preview", k: "po07", e: 1 }, { s: "#publishBtn", k: "po08", e: 1 },
      { s: "#pg-post #reloadBtn", k: "po09", e: 1 }, { s: "#po_list [data-edit]", k: "po10", e: 1 }, { s: "#editLang", k: "po11", e: 1, pre: () => clickQ("#po_list [data-edit]") },
    ],
    watch: [{ s: "#wa_rnb", k: "wa07" }, { s: "#wa_copyBtn", k: "wa01", e: 1 }, { s: "#wa_q", k: "wa02" }, { s: "#rivals", k: "wa03" }, { s: "#pg-watch #head", k: "wa04" }, { s: "#pg-watch #rows [data-edit], #pg-watch #rows tr", k: "wa05", e: 1 }, { s: "#pg-watch #left", k: "wa06" }],
    attack: [{ s: "#ak_plan", k: "ak01" }, { s: "#ak_plan .ak-dir", k: "ak03" }, { s: "#ak_ss", k: "ak04" }, { s: "#ak_board", k: "ak02" }, { s: "#sc_kid", k: "sc01", e: 1 }, { s: "#sc_list", k: "sc02" }, { s: "#sc_sortKey", k: "sc03" }, { s: "#sc_kingdoms table", k: "sc04" }],
    growth: [{ s: "#gr_title", k: "gr01" }],
    hunt: [{ s: "#hn_root .hn-st", k: "hn01" }, { s: "#hn_root .hn-t tbody tr", k: "hn02" }, { s: "#hn_id", k: "hn03", e: 1 }, { s: "#hn_reload", k: "hn04" }, { s: "#hn_root .hn-fo", k: "hn05" }, { s: "#hn_root [data-se]", k: "hn06", e: 1 }],
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
    tilt: "r", wake: "f", hop: "f", teacher: "f", heart: "f", cry: "f", hurt: "f" };
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
          if (!m.loop) clipTimer = setTimeout(() => { if (cur === name) { front.onload = null; front.src = IMG + name + "_end.png"; } if (pending === resolve) pending = null; resolve(true); }, dur(name) - 40);   // onload cleared: the still must not re-run the swap and bring the other image back
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
      const head = Math.max(pos.y, r.top + Math.min(r.height, 110)) + 12;   // a tall target: at least its top ~110 px stay visible
      if (above >= 8) { top = above; up = false; }
      else if (below + bh <= vh - 8) { top = below; up = true; }
      else if (head + bh <= vh - 8) { top = head; up = true; }
      else { top = Math.max(8, vh - bh - 8); up = true; }
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
  /* hidden = nothing keeps running (no idle flights / naps while out of sight); shown again = back on its perch on the Ask AI button.
     The page's own start (main site / officer page / tool page) runs only the first time — a second run would stack its loops. */
  let booted = false;
  function turnOff() { ls.set(LS, "off"); clearTimeout(idleTimer); cancelStep(); stopFlight(); hush(); clearTarget(); tour = null; busy = false; sleepZ(false); state = "off"; root.hidden = true; showToggle(true); }
  function turnOn() {
    ls.set(LS, "on"); showToggle(false);
    if (!booted) { (IS_OFFICER ? startOfficer : IS_TOOL ? startTool : start)(); return; }
    root.hidden = false; pos = perchPoint(); place(); faceIn(); state = "menu"; play("idle", { squash: false });
    if (!IS_OFFICER && !IS_TOOL) armIdle();
  }
  function showToggle(show) {
    let bar = document.querySelector(".top-btns");
    if (!bar) { bar = document.querySelector(".sp-toggle-bar") || Object.assign(document.body.appendChild(document.createElement("div")), { className: "sp-toggle-bar" }); }
    if (!toggleBtn) { toggleBtn = document.createElement("button"); toggleBtn.className = "theme-toggle sp-toggle"; toggleBtn.type = "button"; toggleBtn.textContent = "🐦"; toggleBtn.onclick = turnOn; bar.prepend(toggleBtn); }
    toggleBtn.title = t("show"); toggleBtn.setAttribute("aria-label", t("show")); toggleBtn.hidden = !show;
  }

  /* ---------- where things are ---------- */
  const fab = () => document.querySelector(".ai-fab");
  /* 🪶 room at the end of the page for the Ask AI button + the sparrow sitting on it, so the last buttons of a page can always be
     scrolled up out from under them (Armada: "find a way to click buttons without lil sparrow blocking") */
  function reserveRoom() {
    const f = fab(); let h = 0;
    if (f && !root.hidden) { const r = f.getBoundingClientRect(); if (r.top > innerHeight / 2) h = Math.round(innerHeight - r.top + 96); }   // button in the lower half: its height + the bird
    else if (f) { const r = f.getBoundingClientRect(); if (r.top > innerHeight / 2) h = Math.round(innerHeight - r.top + 12); }
    document.documentElement.style.setProperty("--sp-reserve", Math.min(Math.max(h, 0), 260) + "px");
  }
  // officer page only for now (the main site follows once Sparrow says 上線)
  if (/officer-/.test(location.pathname)) { document.body.classList.add("sp-room"); addEventListener("resize", reserveRoom); setInterval(reserveRoom, 1500); setTimeout(reserveRoom, 300); }
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
    const cx = r.left + r.width / 2, clampX = (x) => Math.max(w * 0.6 + 4, Math.min(innerWidth - w * 0.6 - 4, x));   // the whole bird stays on screen whichever way it faces
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
      await goHome(); const c = play("sulky"); say(esc(t("sulky")), { foot: false });   // says it while turning away, and stays sulking until it dozes off
      await c; await wait(1400); hush(); await play("sleep"); sleepZ(true); state = "sleep"; busy = false;
    }, IDLE_MS);
  }
  const faceIn = () => setFacing(perchPoint().x < innerWidth / 2 ? "r" : "l");   // perched at the left edge → look right, into the page (not at the wall)
  async function goHome() { const p = perchPoint(); if (Math.hypot(p.x - pos.x, p.y - pos.y) > 6) { if (!(await flyTo(p.x, p.y))) return false; } faceIn(); await play("idle", { squash: false }); return true; }
  async function greet() {
    busy = true; clearTarget(); sleepZ(false);
    await goHome(); const hi = play("hi");
    // 1️⃣ "Hi! Want a quick tour of this page?" → 👀 Yes = page tour · No thanks = the help menu below
    const ask = () => say(`<b>${esc(t("tourQ"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="ptour">${esc(t("tourYes"))}</button><button type="button" data-a="pno">${esc(t("tourNo"))}</button></div>`);
    ask(); redraw = ask;
    state = "menu"; busy = false; armIdle();
    clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (state === "menu" && !busy) hush(); }, 6000);   // 6 s, then tuck away until tapped
    if (await hi) play("idle", { squash: false });
  }
  /* 2️⃣ the help menu (after "No thanks", or ‹ Back from a tour list) */
  function helpMenu(head) {
    const menu = () => say(`<b>${esc(t(head || "greet2"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="page">${esc(t("page"))}</button><button type="button" data-a="how">${esc(t("how"))}</button><button type="button" data-a="none">${esc(t("none"))}</button></div>`);
    menu(); redraw = menu; state = "menu"; armIdle(); clearTimeout(bubbleTimer);
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
    } else if (a === "menu" || a === "pno") {
      busy = false; helpMenu(); return;
    } else if (a === "ptour") {
      busy = false; runTour("page"); return;
    } else if (a === "otq") {
      busy = false; await officerTopTour();
      // tour done → straight on to the next choice, like the main site: the tab tours
      const more = () => say(`<b>${esc(t("obDone"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="otn">${esc(t("how"))}</button><button type="button" data-a="hush">${esc(t("tourNo"))}</button></div>`);
      more(); redraw = more; clearTimeout(bubbleTimer); return;
    } else if (a === "otn") {
      busy = false; hush(); officerMenu(); return;
    } else if (a === "hush") {
      busy = false; hush(); return;
    } else if (a === "none") {
      const c = play("point"); say(esc(t("noneA"))); state = "menu"; busy = false; if (await c) play("idle", { squash: false }); return;
    }
    busy = false;
  });

  /* ---------- guided tours ("how do I use…") ---------- */
  function tourMenu() {
    const items = [["site", tt("site")], ["tmr", tt("tmr")], ["rem", tt("rem")]];
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
    const tall = r.height > innerHeight * 0.45;   // a long table / list: its top just under the bird, not in the middle
    const want = top == null ? (tall ? r.top - Math.min(innerHeight * 0.28, 190) : r.top - Math.max(8, (innerHeight - Math.min(r.height, innerHeight * 0.6)) / 2)) : r.top - top;
    const beh = REDUCED ? "auto" : "smooth";
    try {
      if (scroller) { const sr = scroller.getBoundingClientRect(), inner = r.top - sr.top; scroller.scrollTo({ top: scroller.scrollTop + inner - (top == null ? Math.max(8, (sr.height - Math.min(r.height, sr.height * 0.6)) / 2) : Math.max(8, top - sr.top)), behavior: beh }); }
      else window.scrollTo({ top: scrollY + want, behavior: beh });
    } catch (e) { el.scrollIntoView({ block: top == null ? "center" : "start" }); }
    let last = null; for (let i = 0; i < 25; i++) { await wait(60); const y = Math.round(el.getBoundingClientRect().top); if (y === last) break; last = y; }
    // sideways too: a target inside a strip that scrolls left/right (the calendar) is centred in that strip — not just peeking in at the edge
    let hs = null; for (let n = el.parentElement; n; n = n.parentElement) { const cs = getComputedStyle(n); if (/(auto|scroll)/.test(cs.overflowX) && n.scrollWidth > n.clientWidth + 4) { hs = n; break; } }
    if (hs) {
      const r2 = el.getBoundingClientRect(), hr = hs.getBoundingClientRect(), rtl = getComputedStyle(hs).direction === "rtl";
      // wider than the strip (a whole table row): show its start (the name column), not its middle
      const want = r2.width >= hr.width - 4 ? hs.scrollLeft + (rtl ? r2.right - hr.right : r2.left - hr.left) : hs.scrollLeft + (r2.left - hr.left) - (hr.width - r2.width) / 2;
      if (Math.abs(want - hs.scrollLeft) > 2) { try { hs.scrollTo({ left: want, behavior: beh }); } catch (e) {} let lx = null; for (let i = 0; i < 20; i++) { await wait(60); const x = Math.round(el.getBoundingClientRect().left); if (x === lx) break; lx = x; } }
    }
  }
  /* wait up to ms while something is being pointed at: ends early when that thing disappears (the page moved on) or the step was cancelled */
  async function showFor(ms) { const g = stepGen, t0 = Date.now(); while (Date.now() - t0 < ms) { await wait(150); if (g !== stepGen || (targetEl && !shown(targetEl))) return false; } return true; }
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
  /* ⏰ the timers / reminders walkthrough, one step per control (the form is opened, filled a little and closed again as it goes) */
  const TM_STEPS = [
    { s: ".ai-head button", k: "tm01" },
    { s: ".tm-view .tm-top [data-a=chat]", k: "tm02", pre: () => window.NXSTimers && NXSTimers.show(true) },
    { s: ".tm-view .tm-note", k: "tm03" },
    { s: ".tm-view .tm-fix", k: "tm03b" },
    { s: ".tm-view [data-a=cloudnow], .tm-view .tm-note a.tm-btn", k: "tm04" },
    { s: ".tm-view .tm-quick", k: "tm05" },
    { s: "#tmAdd [data-a=add]", k: "tm06" },
    { s: "#tmAdd .tm-cats", k: "tm07", pre: () => clickQ("#tmAdd [data-a=add]") },
    { s: () => { const b = Q("#tmAdd [data-sub]"); return b && b.parentElement; }, k: "tm08", pre: () => clickQ("#tmAdd [data-cat=train]") },
    { s: "#tmAdd [data-row]", k: "tm10", pre: () => clickQ("#tmAdd [data-sub]") },
    { s: "#tmAdd [data-a=na]", k: "tm09" },
    { s: "#tmAdd [data-a=help]", k: "tm11", pre: () => clickQ("#tmAdd [data-cat=build]") },
    { s: "#tmAdd [data-a=save]", k: "tm12" },
    { s: "#tmAdd [data-ap=at]", k: "tm13", pre: async () => { clickQ("#tmAdd [data-cat=appt]"); await wait(300); clickQ("#tmAdd [data-sub]"); } },
    { s: "#tmList .tm-row", k: "tm14", pre: () => clickQ("#tmAdd [data-a=cancel]") },
    { s: ".tm-view .tm-sg", k: "tm15" },
    { s: ".tm-view .tm-alerts > b", k: "tm16" },
    { s: ".tm-view .tm-alerts [data-al]", k: "tm17" },
    { s: ".tm-view .tm-alerts [data-before]", k: "tm18" },
    { s: ".tm-view .tm-alerts a[href*=bear]", k: "tm19" },
    { s: ".tm-view .tm-alerts [data-a=admin]", k: "tm20" },
    { s: ".tm-page [data-ib=clear]", k: "tm21" },
  ];
  /* 🧭 the buttons every page has (some only show in the installed app; missing ones are skipped) — keep in step with the AI's SITE FEATURES block */
  const SITE_STEPS = [{ s: "#langRow", k: "si01" }, { s: "#copyUrlBtn", k: "si02" }, { s: "#reloadBtn", k: "si03" }, { s: "#themeToggle", k: "si04" }, { s: ".ai-fab", k: "si05" }];
  /* 👀 quick tour of the page you're on: the home page (Recent Events) or a guide. Missing parts are skipped. */
  /* top bar first (🔗 ↻ 📋 light/dark, announcement ticker, languages, guide menus), then the page itself, top to bottom; 💬 Ask AI last */
  const TOP_STEPS = [{ s: "#copyUrlBtn", k: "si02" }, { s: "#reloadBtn", k: "si03" }, { s: "#officerBtn", k: "si06" }, { s: "#themeToggle", k: "si04" }, { s: "#annTicker", k: "si07" }, { s: "#langRow", k: "si01" }, { s: "#guideRow", k: "h05" }];
  const HOME_STEPS = TOP_STEPS.concat([{ s: "#doc .today-card:not(.month-card)", k: "h01" }, { s: "#dailyHint", k: "h02" }, { s: "#monthCal", k: "h03" }, { s: "#doc .ann-board", k: "h04" }, { s: ".ai-fab", k: "h07" }]);
  const GUIDE_STEPS = TOP_STEPS.concat([{ s: "#doc .doc-title", k: "g01" }, { s: "#doc h3.section-h", k: "g02" }, { s: "#doc .gen-card, #doc .hc-card", k: "g03" }, { s: "#doc .callout", k: "g04" }, { s: ".ai-fab", k: "g06" }]);
  const tmText = (st) => st.k === "tm03" && isIOS && !standalone() ? tt("tm03ios") : tt(st.k);
  async function runTour(id, only) {
    if (busy) return; busy = true; ["point", "teacher", "fly", "idle"].forEach(preload); hush(); clearTarget(); tour = id; clearTimeout(idleTimer);
    const ai = window.NXSAI, tm = window.NXSTimers, panel = ai && ai.panel;
    const end = async () => { clearTarget(); tour = null; busy = false; try { clickQ("#tmAdd [data-a=cancel]"); } catch (e) {} await goHome(); hush(); state = "menu"; armIdle(); };
    if (id === "inst") {
      hush(); if (panel) panel.hidden = true;
      if (typeof switchGuide === "function") switchGuide("install-app");
      const title = await waitFor(() => q("#doc .doc-title"), 3000);
      await step(title, () => tt("inst1"), true); await end(); return;
    }
    if (id === "page") {
      hush(); if (panel) panel.hidden = true;
      const g = (location.hash.match(/^#\/[\w-]+\/([\w-]+)/) || [])[1], home = !g || g === "recent-events";
      try { window.scrollTo({ top: 0 }); } catch (e) {} await wait(250);
      const r = await walk(home ? HOME_STEPS : GUIDE_STEPS, (st) => tt(st.k)); await end();
      if (!r.stopped) helpMenu("tourDone");   // tour done → straight on to the menu: 🔎 Find a page · 🎓 How do I use… · 🤔 Neither
      return;
    }
    if (id === "site") { hush(); if (panel) panel.hidden = true; try { window.scrollTo({ top: 0 }); } catch (e) {} await wait(250); await walk(SITE_STEPS, (st) => tt(st.k)); await end(); return; }
    if (!ai || !tm) { await end(); return; }
    ai.open(); await wait(250);
    let steps = only || TM_STEPS;
    if (id === "rem" && !only) { tm.show(true); await wait(400); steps = TM_STEPS.slice(TM_STEPS.findIndex((st) => st.k === "tm16")); }
    const r = await walk(steps, tmText);
    await end();
    if (!r.stopped && !only) offerTour(id === "rem" ? "tmr" : "rem");
  }
  /* the chat panel scrolls on its own: keep the sparrow and the ring on the element */
  setInterval(() => { if (tour && targetEl && !flying && !pinched()) { const p = pointAt(targetEl); if (Math.hypot(p.x - pos.x, p.y - pos.y) > 3) { pos = { x: p.x, y: p.y }; place(); } } }, 120);
  /* 👀 watchdog: the thing being pointed at disappeared (panel closed, tab switched, guide closed) while the sparrow was waiting
     there → drop the step and fly home instead of staying put next to nothing. Only while idle or waiting for Next, never mid-flow. */
  let lostSince = 0, lastPerch = null;
  const shown = (el) => { if (!el || !el.isConnected) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !el.closest("[hidden]"); };   // scrolled out of view still counts as there
  // hold still while the page is pinch-zoomed (every measurement is off until it's back to 1×) or while someone is typing (the keyboard squeezes the viewport)
  const typing = () => { const a = document.activeElement; if (!a || !a.isConnected || !(a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT" || a.isContentEditable)) return false;
    const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0; };   // a box that was just re-drawn away (✓ pressed, table refreshed) no longer counts as typing
  const zoomed = () => !!window.visualViewport && Math.abs(visualViewport.scale - 1) > 0.02;
  const pinched = () => zoomed() || typing();
  let stuckSince = 0;
  setInterval(async () => {
    if (root.hidden || flying || state === "off" || zoomed()) return;
    // the keyboard opening / closing moves the Ask AI button: when idle, the bird simply stays glued to it (snap, no flight), typing or not
    if (typing()) { if (!tour && !targetEl && !busy) { const h = perchPoint(); if (Math.hypot(h.x - pos.x, h.y - pos.y) > 1) { pos = h; place(); faceIn(); } } return; }
    // asleep, or nothing going on but still "busy" for a while (a clip that never finished) → it belongs on the Ask AI button: snap back
    if (!tour && !targetEl && bubble.hidden && (state === "sleep" || busy)) {
      const h = perchPoint(), d = Math.hypot(h.x - pos.x, h.y - pos.y);
      if (d <= 1) { stuckSince = 0; return; }
      stuckSince = stuckSince || Date.now(); if (Date.now() - stuckSince < (state === "sleep" ? 600 : 4000)) return; stuckSince = 0;
      if (state !== "sleep") busy = false;
      pos = h; place(); faceIn(); return;
    }
    stuckSince = 0;
    if (state === "sleep") return;
    if (targetEl && (stepResolve || !busy)) {
      if (shown(targetEl)) { lostSince = 0; return; }
      lostSince = lostSince || Date.now(); if (Date.now() - lostSince < 500) return; lostSince = 0;
      cancelStep(); clearTarget(); hush(); tour = null; busy = false; if (state !== "menu" && state !== "how") state = "menu"; await goHome(); if (!IS_OFFICER && !IS_TOOL) armIdle();
      return;
    }
    // idle with nothing to point at but away from the perch → go home (a small drift, e.g. the browser bar changing height, is just corrected in place)
    if (!busy && !tour && !targetEl && bubble.hidden) {
      const h = perchPoint(), d = Math.hypot(h.x - pos.x, h.y - pos.y), stable = lastPerch && Math.abs(lastPerch.x - h.x) < 1 && Math.abs(lastPerch.y - h.y) < 1; lastPerch = h;
      if (!stable) return;   // the button itself is still moving (bounce, toolbar) → wait for it to settle, then follow
      if (d > 40) await goHome(); else if (d > 1) { pos = h; place(); faceIn(); }
    }
  }, 300);

  /* 🐦 "Show me how to…" inside the AI chat greeting: one button per tour; the AI's answers can also carry [label](tour:id) links */
  function addAISection() {
    const g = document.getElementById("aiGreet"); if (!g || g.querySelector(".sp-ai-sec")) return;
    const items = [["site", tt("site")], ["tmr", tt("tmr")], ["rem", tt("rem")]];
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
    en: {
      bc01: "← Guides takes you back to the site; the box next to it switches this page's language.",
      bc02: "Your troops: the infantry, cavalry and archers you own. Everything below is capped by these numbers.",
      bc03: "Your own troops in your rally — the number the game shows, without Valora.",
      bc04: "Joining a rally: the most troops one march may bring (the alliance's Bear limit is filled in).",
      bc05: "Valora (Bear Hunt Master): only if your rally number doesn't include her — each level adds 3,000 to your own march in the rally.",
      bc06: "The sizes used below: your rally and each march.",
      bc07: "⚡ Auto split fills all the formations for you (it replaces them); you can still drag afterwards.",
      bc08: "Your March Queues: how many marches you have — your rally uses one. Empty = the counts come from the fields below.",
      bc09: "Rally leader setup from the Bear Hunt guide: pick your hero generation and setup and the rally ratio is filled in — or type your own.",
      bc10: "Rally ratio: infantry : cavalry : archers for your rally.",
      bc11: "Fixed-ratio marches: how many full marches at the ratio below — or 'as many as fit'.",
      bc12: "The fixed-ratio marches' ratio (default 10 : 10 : 80).",
      bc13: "Marches with a hero: full marches with the same mix as whatever is left.",
      bc14: "Marches without a hero: identical marches that share all the rest.",
      bc15: "Each later march keeps at least this % of every type, so no march goes out without archers.",
      bc16: "⚡ Auto split now builds the formations. The text below tells how many full marches fit and which type runs out first.",
      bc17: "Used / left per troop type, always in view — it turns red if you assign more than you have.",
      bc18: "One card per formation: 👑 Rally first, then March 2, 3… Drag a slider or type a % per type; it stops when the formation is full or that type runs out. ✕ removes a march.",
      bc19: "+ Add march adds an empty one.",
      bc20: "📋 Copy puts a one-line-per-formation summary on your clipboard, ready for chat.",
      bc21: "How it works: the rules in five lines.",
      kc01: "中文 / EN switch the language.",
      kc02: "Step 1: pick the event — Officer Project A / B, Armament Competition 1 / 2, Strongest Governor, Alliance Brawl. Ratio = KvK points lost per event point; lower is cheaper.",
      kc03: "For Strongest Governor and Alliance Brawl also pick the day — each day has its own points, thresholds and rewards.",
      kc04: "Your Town Center level picks the right thresholds and reward amounts.",
      kc05: "Step 2: what you plan to spend — one row per resource that scores, cheapest first. Type the quantity; event points and KvK points update as you go.",
      kc06: "Step 3: milestone rewards — the threshold from your game screen, then each reward and its amount; a card turns green when your score reaches it. + Add reward adds a row, × removes it.",
      kc07: "Step 4: expected rank adds the ranking reward (gems, speedups, keys) — only counted from 4,000 points.",
      kc08: "1 gem = ? KvK pts: how gems are valued — roulette + shards, roulette only, or not at all.",
      kc09: "The result: event score, KvK points lost, rewards worth and the net — green = worth it, red = you lose KvK points. Below: milestones reached, what you get, and the cheapest way to the next milestone.",
      kc10: "Clear this event resets spend, thresholds, rewards and rank for this event only.",
      kp01: "Language, and Back to the KvK guide.",
      kp02: "Step 1: Personal total (only the total matters) or Daily push (items that score on several days go to the day you want to push).",
      kp03: "Daily push: the minimum points per day. Days without a target get no 'Can use' items; all empty = spread evenly.",
      kp04: "Speedups by type, as d / h / m. Will use = you'd spend them anyway; Can use = fine to spend for points. The boxes 1–5 show which days they score on.",
      kp05: "Resources: Truegold, Mithril, gear, hero shards, roulette, emblems, manuscripts, taming marks, charm / pet / gear scores — each with its points and days. Will use and Can use again.",
      kp06: "Troops (Day 4): the tier you train and how many; Promote only scores the difference between tiers.",
      kp07: "Step 4: score items level by level — Governor Charm, pets, Governor Gear, Mastery Forging. Add rows From → To × pieces; 'What I have' stops counting when a material runs out; → Will use / → Can use writes the score into step 2.",
      kp08: "The result: points per day with a bar (will use / can use / target), whether each day reaches its target, and what 'Can use' was left unused.",
      kp09: "Clear all empties every field; the mode stays.",
      bk01: "Language, and Back to the KvK guide; the screenshots change language too.",
      bk02: "Pick the position: Chief Minister (construction / research / training +10%) or Noble Advisor (training +50%, capacity +200). Steps 4–5 change with it.",
      bk03: "1 — on the city screen tap Events, top right.",
      bk04: "2 — the Castle Battle tab (the castle icon), then 3 — Details next to Appointment.",
      bk05: "4 — in the Ministers tab, tap the position you want.",
      bk06: "5 — pick a slot and tap the button on the right to book it; the small button next to the date switches local time ⇄ UTC. To cancel, open the same window again.",
      bk07: "Tips: one booking per position at a time; each slot shows how many players already applied.",
      sq01: "Language, and Back to the guides.",
      sq02: "1 — tap your avatar (top left), 2 — Squad at the bottom, 3 — Formations in Troops Preview.",
      sq03: "4 — tap the hero cards and pick the heroes for this squad.",
      sq04: "5 — if a troop COUNT was given, type the exact number on each row; if only a RATIO, tap the ratio button at the bottom and enter the percentages.",
      sq05: "6 — Save, pick the slot and name it; 7 — save by Troop Quantity (count) or Troop Ratio (it scales with your troops); 8 — Confirm.",
      sq06: "Tips: the lock on the last slot means it still has to be unlocked; Even fills all three types equally; Withdraw all clears the slot.", ask: "Want me to walk you through this page?", yes: "🐦 Show me", no: "No thanks",
      },
    zh: {
      bc01: "← 指南 會帶你回到網站；旁邊的方塊可以切換這個頁面的語言。",
      bc02: "你的部隊：你擁有的步兵、騎兵和弓兵。下面的一切都以這些數字為上限。",
      bc03: "你自己集結裡的部隊——遊戲顯示的數字，不含瓦洛拉。",
      bc04: "加入集結：一支行軍最多能帶的部隊數（已填入聯盟的巨熊上限）。",
      bc05: "瓦洛拉（狩獵巨熊大師）：只在你的集結數字不包含她時才填——每一級會為你在集結裡的自己那支行軍加上 3,000。",
      bc06: "下面使用的規模：你的集結和每支行軍。",
      bc07: "⚡ 自動分配 會幫你填好所有編隊（會覆蓋原本的）；之後你還是可以拖曳調整。",
      bc08: "你的行軍隊列：你有幾支行軍——你的集結會占用一支。留空 = 數量由下面的欄位決定。",
      bc09: "集結隊長配置，取自狩獵巨熊指南：選你的英雄世代和配置，集結比例就會自動填入——或者自己輸入。",
      bc10: "集結比例：你集結的 步兵 : 騎兵 : 弓兵。",
      bc11: "固定比例行軍：按下面的比例要幾支滿編行軍——或「能塞幾支就幾支」。",
      bc12: "固定比例行軍的比例（預設 10 : 10 : 80）。",
      bc13: "有英雄的行軍：滿編行軍，組成跟剩下的部隊相同。",
      bc14: "沒有英雄的行軍：相同的行軍，平分剩下的全部部隊。",
      bc15: "之後的每支行軍至少保留每種兵種的這個 %，這樣就不會有行軍沒帶弓兵就出發。",
      bc16: "⚡ 自動分配 現在會建立編隊。下方文字會說明能塞下幾支滿編行軍，以及哪種兵種會先用完。",
      bc17: "每種兵種的已用 / 剩餘，一直顯示在畫面上——如果你分配的比你擁有的多，它會變紅。",
      bc18: "每個編隊一張卡片：先是 👑 集結，然後是行軍 2、3…拖曳滑桿或輸入每種兵種的 %；編隊滿了或那種兵種用完時就會停住。✕ 會移除一支行軍。",
      bc19: "+ 新增行軍 會加一支空的。",
      bc20: "📋 複製 會把每個編隊一行的摘要放到你的剪貼簿，可以直接貼到聊天。",
      bc21: "運作方式：五行說明規則。",
      kc01: "中文 / EN 切換語言。",
      kc02: "步驟 1：選活動——官員計畫 A / B、軍備競賽 1 / 2、最強總督、聯盟亂鬥。比值 = 每 1 活動分要犧牲的 KvK 分數；越低越划算。",
      kc03: "最強總督和聯盟亂鬥還要選日期——每一天有自己的分數、門檻和獎勵。",
      kc04: "你的城鎮中心等級會決定正確的門檻和獎勵數量。",
      kc05: "步驟 2：你打算花費的東西——每種能得分的資源一列，最便宜的在前。輸入數量；活動分數和 KvK 分數會隨著更新。",
      kc06: "步驟 3：里程碑獎勵——從你的遊戲畫面抄下門檻，再填每項獎勵和數量；分數達到時卡片會變綠。+ 新增獎勵 會加一列，× 會移除。",
      kc07: "步驟 4：預期排名會加上排名獎勵（寶石、加速、鑰匙）——只有 4,000 分以上才計算。",
      kc08: "1 寶石 = ? KvK 分：寶石怎麼估值——轉盤 + 碎片、只算轉盤，或完全不算。",
      kc09: "結果：活動分數、損失的 KvK 分數、獎勵價值和淨值——綠色 = 划算，紅色 = 你會損失 KvK 分數。下方：已達成的里程碑、你會拿到什麼，以及到下一個里程碑最便宜的方法。",
      kc10: "清除此活動 只會重設這個活動的花費、門檻、獎勵和排名。",
      kp01: "語言，以及 返回 KvK 指南。",
      kp02: "步驟 1：個人總分（只看總分）或每日衝刺（能在多天得分的項目會分配到你想衝的那一天）。",
      kp03: "每日衝刺：每天最少要的分數。沒有目標的日子不會分到「可用」的項目；全部留空 = 平均分配。",
      kp04: "各類加速，以 d / h / m 填寫。會用 = 你反正都會用掉；可用 = 為了分數用掉也沒關係。1–5 的方框顯示它們在哪幾天得分。",
      kp05: "資源：真金、秘銀、裝備、英雄碎片、轉盤、徽章、手稿、馴獸印記、魅力 / 寵物 / 裝備分數——每項都有自己的分數和日期。同樣分成 會用 和 可用。",
      kp06: "部隊（第 4 天）：你訓練的等級和數量；晉升只計算等級之間的差額。",
      kp07: "步驟 4：逐級計分的項目——總督魅力、寵物、總督裝備、精通鍛造。新增 從 → 到 × 件數 的列；「我擁有的」會在某種材料用完時停止計算；→ 會用 / → 可用 會把分數寫進步驟 2。",
      kp08: "結果：每天的分數和一條長條（會用 / 可用 / 目標）、每天是否達到目標，以及哪些「可用」的項目沒用到。",
      kp09: "全部清除 會清空每個欄位；模式會保留。",
      bk01: "語言，以及 返回 KvK 指南；截圖也會跟著切換語言。",
      bk02: "選職位：首席大臣（建造 / 研究 / 訓練 +10%）或貴族顧問（訓練 +50%，容量 +200）。步驟 4–5 會隨之改變。",
      bk03: "1 — 在城市畫面點右上角的 活動。",
      bk04: "2 — 城堡之戰分頁（城堡圖示），然後 3 — 任命旁邊的 詳情。",
      bk05: "4 — 在大臣分頁，點你想要的職位。",
      bk06: "5 — 選一個時段，點右邊的按鈕預約；日期旁邊的小按鈕可以切換當地時間 ⇄ UTC。要取消的話，再打開同一個視窗。",
      bk07: "小提醒：每個職位同時只能預約一個；每個時段都會顯示已經有多少玩家申請。",
      sq01: "語言，以及 返回指南。",
      sq02: "1 — 點你的頭像（左上角），2 — 底部的 部隊，3 — 部隊預覽裡的 編隊。",
      sq03: "4 — 點英雄卡片，選這支部隊的英雄。",
      sq04: "5 — 如果給的是部隊「數量」，在每一列輸入確切的數字；如果只給了「比例」，點底部的比例按鈕並輸入百分比。",
      sq05: "6 — 儲存，選位置並命名；7 — 以部隊數量（數目）或部隊比例（會隨你的部隊規模縮放）儲存；8 — 確認。",
      sq06: "小提醒：最後一格的鎖表示它還需要解鎖；平均 會把三種兵種填成一樣；全部撤回 會清空該格。", ask: "要我帶你看這一頁嗎？", yes: "🐦 帶我看", no: "不用了",
      },
    ko: {
      bc01: "← 가이드 를 누르면 사이트로 돌아가. 옆의 상자는 이 페이지의 언어를 바꿔.",
      bc02: "네 병력: 네가 가진 보병, 기병, 궁병이야. 아래의 모든 건 이 숫자를 넘을 수 없어.",
      bc03: "네 집결에 들어가는 네 병력. 게임에 나오는 숫자야, 발로라 빼고.",
      bc04: "집결 참여: 행군 하나가 가져갈 수 있는 최대 병력이야 (연맹의 곰 상한이 채워져 있어).",
      bc05: "발로라 (곰 사냥 마스터): 네 집결 숫자에 발로라가 안 들어 있을 때만 써. 레벨마다 집결 안의 네 행군에 3,000이 더해져.",
      bc06: "아래에서 쓰는 크기: 네 집결과 각 행군이야.",
      bc07: "⚡ 자동 분배 가 편성을 전부 채워 줘 (기존 편성을 덮어써). 그 뒤에도 드래그로 바꿀 수 있어.",
      bc08: "네 행군 대기열: 행군이 몇 개 있는지야. 집결이 하나를 써. 비워 두면 = 아래 칸의 수로 정해져.",
      bc09: "곰 사냥 가이드의 집결 리더 세팅: 영웅 세대와 세팅을 고르면 집결 비율이 채워져. 직접 적어도 돼.",
      bc10: "집결 비율: 네 집결의 보병 : 기병 : 궁병이야.",
      bc11: "고정 비율 행군: 아래 비율로 꽉 채운 행군을 몇 개 만들지야. 아니면 '들어가는 만큼'.",
      bc12: "고정 비율 행군의 비율이야 (기본 10 : 10 : 80).",
      bc13: "영웅 있는 행군: 남은 병력과 같은 구성으로 꽉 채운 행군이야.",
      bc14: "영웅 없는 행군: 나머지 병력을 전부 나눠 갖는 똑같은 행군들이야.",
      bc15: "뒤에 나가는 행군마다 각 병종을 최소 이 % 만큼 남겨 둬서, 궁병 없이 나가는 행군이 없게 해.",
      bc16: "⚡ 자동 분배 를 누르면 이제 편성을 만들어. 아래 글은 꽉 채운 행군이 몇 개 들어가는지, 어떤 병종이 먼저 떨어지는지 알려 줘.",
      bc17: "병종별 사용 / 남은 수가 항상 보여. 가진 것보다 많이 배정하면 빨갛게 변해.",
      bc18: "편성마다 카드 하나야. 👑 집결이 먼저, 그다음 행군 2, 3… 슬라이더를 끌거나 병종별 % 를 적어. 편성이 꽉 차거나 그 병종이 떨어지면 멈춰. ✕ 는 행군을 지워.",
      bc19: "+ 행군 추가 를 누르면 빈 행군이 하나 생겨.",
      bc20: "📋 복사 를 누르면 편성마다 한 줄인 요약이 클립보드에 들어가. 바로 채팅에 붙일 수 있어.",
      bc21: "작동 방식: 규칙을 다섯 줄로 설명해.",
      kc01: "中文 / EN 으로 언어를 바꿔.",
      kc02: "1단계: 이벤트 고르기. 관리 프로젝트 A / B, 군비 경쟁 1 / 2, 최강 총독, 연맹 난투. 비율 = 이벤트 1점당 잃는 KvK 점수야. 낮을수록 싸.",
      kc03: "최강 총독과 연맹 난투는 날짜도 골라야 해. 날마다 점수, 기준, 보상이 달라.",
      kc04: "네 타운 센터 레벨에 맞는 기준과 보상 수량이 골라져.",
      kc05: "2단계: 쓸 계획인 것. 점수가 되는 자원마다 한 줄씩, 싼 것부터야. 수량을 적으면 이벤트 점수와 KvK 점수가 바로 바뀌어.",
      kc06: "3단계: 단계 보상. 게임 화면의 기준을 적고, 보상마다 종류와 수량을 적어. 점수가 기준에 닿으면 카드가 초록색이 돼. + 보상 추가 는 줄을 더하고, × 는 지워.",
      kc07: "4단계: 예상 순위는 순위 보상 (보석, 가속, 열쇠) 을 더해 줘. 4,000점부터만 계산돼.",
      kc08: "보석 1 = ? KvK 점: 보석을 어떻게 값을 매길지야. 룰렛 + 조각, 룰렛만, 아니면 안 세기.",
      kc09: "결과: 이벤트 점수, 잃는 KvK 점수, 보상 가치, 그리고 순이익이야. 초록 = 할 만함, 빨강 = KvK 점수를 잃어. 아래에는 도달한 단계, 받는 것, 다음 단계까지 가장 싼 방법이 있어.",
      kc10: "이 이벤트 지우기 는 이 이벤트의 소비, 기준, 보상, 순위만 초기화해.",
      kp01: "언어, 그리고 KvK 가이드로 돌아가기 야.",
      kp02: "1단계: 개인 총점 (총점만 중요함) 또는 일일 푸시 (여러 날에 점수가 되는 항목은 네가 밀고 싶은 날로 가).",
      kp03: "일일 푸시: 하루 최소 점수야. 목표가 없는 날에는 '써도 됨' 항목이 안 들어가. 전부 비우면 = 고르게 나눠.",
      kp04: "종류별 가속, d / h / m 으로 적어. 쓸 것 = 어차피 쓸 것, 써도 됨 = 점수 때문에 써도 괜찮은 것. 1–5 상자는 어느 날에 점수가 되는지 보여 줘.",
      kp05: "자원: 진금, 미스릴, 장비, 영웅 조각, 룰렛, 문장, 필사본, 조련 표식, 매력 / 펫 / 장비 점수. 각각 점수와 날짜가 있어. 여기도 쓸 것 과 써도 됨 이야.",
      kp06: "병력 (4일차): 훈련하는 등급과 수야. 승급은 등급 간 차이만 점수가 돼.",
      kp07: "4단계: 레벨별로 점수가 되는 항목이야. 총독 매력, 펫, 총독 장비, 숙련 단조. 시작 → 끝 × 개수 로 줄을 추가해. '내가 가진 것' 은 재료가 떨어지면 계산을 멈춰. → 쓸 것 / → 써도 됨 은 점수를 2단계에 적어 줘.",
      kp08: "결과: 날짜별 점수와 막대 (쓸 것 / 써도 됨 / 목표), 날마다 목표에 닿는지, 그리고 '써도 됨' 중 안 쓴 게 뭔지야.",
      kp09: "전체 지우기 는 모든 칸을 비워. 모드는 그대로야.",
      bk01: "언어, 그리고 KvK 가이드로 돌아가기 야. 스크린샷도 같이 언어가 바뀌어.",
      bk02: "직위 고르기: 재상 (건설 / 연구 / 훈련 +10%) 또는 귀족 고문 (훈련 +50%, 수용량 +200). 4–5단계가 그에 따라 바뀌어.",
      bk03: "1 — 도시 화면에서 오른쪽 위의 이벤트 를 눌러.",
      bk04: "2 — 성 전투 탭 (성 아이콘), 그다음 3 — 임명 옆의 상세 를 눌러.",
      bk05: "4 — 대신 탭에서 원하는 직위를 눌러.",
      bk06: "5 — 시간대를 고르고 오른쪽 버튼을 눌러서 예약해. 날짜 옆의 작은 버튼은 현지 시간 ⇄ UTC 를 바꿔. 취소하려면 같은 창을 다시 열어.",
      bk07: "팁: 직위마다 한 번에 예약 하나만 돼. 시간대마다 이미 몇 명이 신청했는지 보여.",
      sq01: "언어, 그리고 가이드로 돌아가기 야.",
      sq02: "1 — 아바타 (왼쪽 위) 를 누르고, 2 — 아래의 부대, 3 — 병력 미리보기의 편성 을 눌러.",
      sq03: "4 — 영웅 카드를 눌러서 이 부대의 영웅을 골라.",
      sq04: "5 — 병력 수가 주어졌으면 줄마다 정확한 숫자를 적어. 비율만 주어졌으면 아래의 비율 버튼을 누르고 퍼센트를 넣어.",
      sq05: "6 — 저장 을 누르고 칸을 고른 뒤 이름을 붙여. 7 — 병력 수량 (수) 또는 병력 비율 (네 병력에 맞춰 늘어남) 로 저장해. 8 — 확인.",
      sq06: "팁: 마지막 칸의 자물쇠는 아직 해금해야 한다는 뜻이야. 균등 은 세 병종을 똑같이 채워. 전부 철수 는 칸을 비워.", ask: "이 페이지를 안내해 줄까요?", yes: "🐦 보여줘", no: "괜찮아",
      },
    de: {
      bc01: "← Guides bringt dich zurück zur Seite; das Feld daneben wechselt die Sprache dieser Seite.",
      bc02: "Deine Truppen: die Infanterie, Kavallerie und Bogenschützen, die du besitzt. Alles darunter ist durch diese Zahlen begrenzt.",
      bc03: "Deine eigenen Truppen in deiner Rally — die Zahl, die das Spiel anzeigt, ohne Valora.",
      bc04: "Rally beitreten: die meisten Truppen, die ein Marsch mitbringen darf (das Bären-Limit der Allianz ist eingetragen).",
      bc05: "Valora (Bärenjagd-Meister): nur, wenn deine Rally-Zahl sie nicht enthält — jedes Level fügt deinem eigenen Marsch in der Rally 3.000 hinzu.",
      bc06: "Die Größen, die unten verwendet werden: deine Rally und jeder Marsch.",
      bc07: "⚡ Automatisch aufteilen füllt alle Formationen für dich aus (es ersetzt sie); du kannst danach trotzdem noch ziehen.",
      bc08: "Deine Marsch-Warteschlangen: wie viele Märsche du hast — deine Rally belegt einen. Leer = die Anzahl kommt aus den Feldern darunter.",
      bc09: "Rally-Leiter-Setup aus dem Bärenjagd-Guide: Wähl deine Helden-Generation und dein Setup, und das Rally-Verhältnis wird eingetragen — oder tipp dein eigenes ein.",
      bc10: "Rally-Verhältnis: Infanterie : Kavallerie : Bogenschützen für deine Rally.",
      bc11: "Märsche mit festem Verhältnis: wie viele volle Märsche mit dem Verhältnis darunter — oder 'so viele wie passen'.",
      bc12: "Das Verhältnis der Märsche mit festem Verhältnis (Standard 10 : 10 : 80).",
      bc13: "Märsche mit Held: volle Märsche mit derselben Mischung wie das, was übrig ist.",
      bc14: "Märsche ohne Held: identische Märsche, die sich den ganzen Rest teilen.",
      bc15: "Jeder spätere Marsch behält mindestens diesen % jedes Typs, damit kein Marsch ohne Bogenschützen losgeht.",
      bc16: "⚡ Automatisch aufteilen baut jetzt die Formationen. Der Text darunter sagt, wie viele volle Märsche passen und welcher Typ zuerst ausgeht.",
      bc17: "Verwendet / übrig pro Truppentyp, immer im Blick — es wird rot, wenn du mehr zuweist, als du hast.",
      bc18: "Eine Karte pro Formation: 👑 Rally zuerst, dann Marsch 2, 3… Zieh einen Regler oder tipp einen % pro Typ ein; es stoppt, wenn die Formation voll ist oder dieser Typ ausgeht. ✕ entfernt einen Marsch.",
      bc19: "+ Marsch hinzufügen fügt einen leeren hinzu.",
      bc20: "📋 Kopieren legt eine Zusammenfassung mit einer Zeile pro Formation in deine Zwischenablage, fertig für den Chat.",
      bc21: "So funktioniert's: die Regeln in fünf Zeilen.",
      kc01: "中文 / EN wechseln die Sprache.",
      kc02: "Schritt 1: Wähl das Event — Offiziersprojekt A / B, Rüstungswettbewerb 1 / 2, Stärkster Gouverneur, Allianz-Schlägerei. Verhältnis = verlorene KvK-Punkte pro Event-Punkt; niedriger ist günstiger.",
      kc03: "Bei Stärkster Gouverneur und Allianz-Schlägerei wähl auch den Tag — jeder Tag hat eigene Punkte, Schwellen und Belohnungen.",
      kc04: "Dein Stadtzentrum-Level wählt die richtigen Schwellen und Belohnungsmengen.",
      kc05: "Schritt 2: was du ausgeben willst — eine Zeile pro Ressource, die Punkte bringt, die günstigste zuerst. Tipp die Menge ein; Event-Punkte und KvK-Punkte aktualisieren sich dabei.",
      kc06: "Schritt 3: Meilenstein-Belohnungen — die Schwelle von deinem Spielbildschirm, dann jede Belohnung und ihre Menge; eine Karte wird grün, wenn dein Score sie erreicht. + Belohnung hinzufügen fügt eine Zeile hinzu, × entfernt sie.",
      kc07: "Schritt 4: Erwarteter Rang rechnet die Ranglisten-Belohnung dazu (Edelsteine, Beschleuniger, Schlüssel) — erst ab 4.000 Punkten gezählt.",
      kc08: "1 Edelstein = ? KvK-Pkt: wie Edelsteine bewertet werden — Roulette + Splitter, nur Roulette oder gar nicht.",
      kc09: "Das Ergebnis: Event-Score, verlorene KvK-Punkte, Wert der Belohnungen und das Netto — grün = lohnt sich, rot = du verlierst KvK-Punkte. Darunter: erreichte Meilensteine, was du bekommst, und der günstigste Weg zum nächsten Meilenstein.",
      kc10: "Dieses Event leeren setzt Ausgaben, Schwellen, Belohnungen und Rang nur für dieses Event zurück.",
      kp01: "Sprache, und Zurück zum KvK-Guide.",
      kp02: "Schritt 1: Persönliche Gesamtsumme (nur die Summe zählt) oder Tages-Push (Items, die an mehreren Tagen Punkte bringen, gehen auf den Tag, den du pushen willst).",
      kp03: "Tages-Push: die Mindestpunkte pro Tag. Tage ohne Ziel bekommen keine 'Kann nutzen'-Items; alle leer = gleichmäßig verteilt.",
      kp04: "Beschleuniger nach Typ, als d / h / m. Werde nutzen = die gibst du sowieso aus; Kann nutzen = darf für Punkte ausgegeben werden. Die Kästchen 1–5 zeigen, an welchen Tagen sie Punkte bringen.",
      kp05: "Ressourcen: Wahrgold, Mithril, Ausrüstung, Heldensplitter, Roulette, Embleme, Manuskripte, Zähmungsmarken, Charme- / Haustier- / Ausrüstungs-Scores — jeweils mit Punkten und Tagen. Wieder Werde nutzen und Kann nutzen.",
      kp06: "Truppen (Tag 4): die Stufe, die du trainierst, und wie viele; Befördern zählt nur die Differenz zwischen den Stufen.",
      kp07: "Schritt 4: Score-Items Level für Level — Gouverneurs-Charme, Haustiere, Gouverneursausrüstung, Meisterschmieden. Zeilen hinzufügen Von → Bis × Teile; 'Was ich habe' hört auf zu zählen, wenn ein Material ausgeht; → Werde nutzen / → Kann nutzen schreibt den Score in Schritt 2.",
      kp08: "Das Ergebnis: Punkte pro Tag mit einem Balken (werde nutzen / kann nutzen / Ziel), ob jeder Tag sein Ziel erreicht, und welche 'Kann nutzen'-Items ungenutzt blieben.",
      kp09: "Alles leeren leert jedes Feld; der Modus bleibt.",
      bk01: "Sprache, und Zurück zum KvK-Guide; die Screenshots wechseln die Sprache auch.",
      bk02: "Wähl die Position: Premierminister (Bauen / Forschung / Training +10%) oder Edler Berater (Training +50%, Kapazität +200). Die Schritte 4–5 ändern sich damit.",
      bk03: "1 — Tipp auf dem Stadtbildschirm oben rechts auf Events.",
      bk04: "2 — der Burgschlacht-Tab (das Burg-Symbol), dann 3 — Details neben Ernennung.",
      bk05: "4 — Tipp im Minister-Tab auf die Position, die du willst.",
      bk06: "5 — Wähl einen Slot und tipp rechts auf den Button, um ihn zu buchen; der kleine Button neben dem Datum wechselt Ortszeit ⇄ UTC. Zum Abbrechen öffnest du dasselbe Fenster noch mal.",
      bk07: "Tipps: eine Buchung pro Position gleichzeitig; jeder Slot zeigt, wie viele Spieler sich schon beworben haben.",
      sq01: "Sprache, und Zurück zu den Guides.",
      sq02: "1 — Tipp auf deinen Avatar (oben links), 2 — Trupp unten, 3 — Formationen in der Truppenvorschau.",
      sq03: "4 — Tipp auf die Heldenkarten und wähl die Helden für diesen Trupp.",
      sq04: "5 — Wenn eine Truppen-ANZAHL angegeben wurde, tipp in jede Zeile die genaue Zahl ein; wenn nur ein VERHÄLTNIS, tipp unten auf den Verhältnis-Button und gib die Prozente ein.",
      sq05: "6 — Speichern, Slot wählen und benennen; 7 — speichern nach Truppenanzahl (Anzahl) oder Truppenverhältnis (es skaliert mit deinen Truppen); 8 — Bestätigen.",
      sq06: "Tipps: Das Schloss am letzten Slot heißt, er muss noch freigeschaltet werden; Gleichmäßig füllt alle drei Typen gleich; Alle abziehen leert den Slot.", ask: "Soll ich dich durch diese Seite führen?", yes: "🐦 Zeig mir", no: "Nein danke",
      },
    fr: {
      bc01: "← Guides te ramène au site ; la case à côté change la langue de cette page.",
      bc02: "Tes troupes : l'infanterie, la cavalerie et les archers que tu possèdes. Tout ce qui est en dessous est plafonné par ces nombres.",
      bc03: "Tes propres troupes dans ton rallye — le nombre que le jeu affiche, sans Valora.",
      bc04: "Rejoindre un rallye : le maximum de troupes qu'une marche peut amener (la limite Ours de l'alliance est pré-remplie).",
      bc05: "Valora (Maître de la Chasse à l'ours) : seulement si ton nombre de rallye ne l'inclut pas — chaque niveau ajoute 3 000 à ta propre marche dans le rallye.",
      bc06: "Les tailles utilisées en dessous : ton rallye et chaque marche.",
      bc07: "⚡ Répartition auto remplit toutes les formations pour toi (elle les remplace) ; tu peux quand même glisser après.",
      bc08: "Tes files de marche : combien de marches tu as — ton rallye en utilise une. Vide = les nombres viennent des champs en dessous.",
      bc09: "Configuration de chef de rallye depuis le guide Chasse à l'ours : choisis ta génération de héros et ta configuration, et le ratio de rallye se remplit — ou tape le tien.",
      bc10: "Ratio de rallye : infanterie : cavalerie : archers pour ton rallye.",
      bc11: "Marches à ratio fixe : combien de marches pleines au ratio ci-dessous — ou 'autant que possible'.",
      bc12: "Le ratio des marches à ratio fixe (par défaut 10 : 10 : 80).",
      bc13: "Marches avec héros : des marches pleines avec le même mélange que ce qui reste.",
      bc14: "Marches sans héros : des marches identiques qui se partagent tout le reste.",
      bc15: "Chaque marche suivante garde au moins ce % de chaque type, pour qu'aucune marche ne parte sans archers.",
      bc16: "⚡ Répartition auto construit maintenant les formations. Le texte en dessous dit combien de marches pleines rentrent et quel type s'épuise en premier.",
      bc17: "Utilisé / restant par type de troupe, toujours visible — ça passe au rouge si tu assignes plus que ce que tu as.",
      bc18: "Une carte par formation : 👑 Rallye d'abord, puis Marche 2, 3… Glisse un curseur ou tape un % par type ; ça s'arrête quand la formation est pleine ou que ce type est épuisé. ✕ supprime une marche.",
      bc19: "+ Ajouter une marche en ajoute une vide.",
      bc20: "📋 Copier met dans ton presse-papiers un résumé d'une ligne par formation, prêt pour le chat.",
      bc21: "Comment ça marche : les règles en cinq lignes.",
      kc01: "中文 / EN changent la langue.",
      kc02: "Étape 1 : choisis l'événement — Projet d'officier A / B, Compétition d'armement 1 / 2, Gouverneur le plus fort, Bagarre d'alliances. Ratio = points KvK perdus par point d'événement ; plus bas, c'est moins cher.",
      kc03: "Pour Gouverneur le plus fort et Bagarre d'alliances, choisis aussi le jour — chaque jour a ses propres points, paliers et récompenses.",
      kc04: "Ton niveau de Centre-ville sélectionne les bons paliers et montants de récompense.",
      kc05: "Étape 2 : ce que tu comptes dépenser — une ligne par ressource qui rapporte des points, la moins chère d'abord. Tape la quantité ; les points d'événement et les points KvK se mettent à jour au fur et à mesure.",
      kc06: "Étape 3 : récompenses de palier — le palier depuis ton écran de jeu, puis chaque récompense et sa quantité ; une carte passe au vert quand ton score l'atteint. + Ajouter une récompense ajoute une ligne, × la supprime.",
      kc07: "Étape 4 : le rang attendu ajoute la récompense de classement (gemmes, accélérateurs, clés) — comptée seulement à partir de 4 000 points.",
      kc08: "1 gemme = ? pts KvK : comment les gemmes sont valorisées — roulette + fragments, roulette seule, ou pas du tout.",
      kc09: "Le résultat : score d'événement, points KvK perdus, valeur des récompenses et le net — vert = ça vaut le coup, rouge = tu perds des points KvK. En dessous : paliers atteints, ce que tu obtiens, et le chemin le moins cher vers le prochain palier.",
      kc10: "Effacer cet événement réinitialise les dépenses, paliers, récompenses et rang pour cet événement seulement.",
      kp01: "Langue, et Retour au guide KvK.",
      kp02: "Étape 1 : Total personnel (seul le total compte) ou Poussée par jour (les objets qui rapportent sur plusieurs jours vont au jour que tu veux pousser).",
      kp03: "Poussée par jour : le minimum de points par jour. Les jours sans objectif ne reçoivent aucun objet 'Peut utiliser' ; tout vide = réparti également.",
      kp04: "Accélérateurs par type, en d / h / m. Va utiliser = tu les dépenserais de toute façon ; Peut utiliser = ok à dépenser pour des points. Les cases 1–5 montrent quels jours ils rapportent.",
      kp05: "Ressources : Or véritable, Mithril, équipement, Fragments de héros, roulette, emblèmes, manuscrits, Marques de dressage, scores de charme / familier / équipement — chacun avec ses points et ses jours. Encore Va utiliser et Peut utiliser.",
      kp06: "Troupes (Jour 4) : le niveau que tu entraînes et combien ; Promouvoir ne compte que la différence entre les niveaux.",
      kp07: "Étape 4 : objets à score niveau par niveau — Charme du gouverneur, familiers, Équipement du gouverneur, Forge de maîtrise. Ajoute des lignes De → À × pièces ; 'Ce que j'ai' arrête de compter quand un matériau s'épuise ; → Va utiliser / → Peut utiliser écrit le score dans l'étape 2.",
      kp08: "Le résultat : points par jour avec une barre (va utiliser / peut utiliser / objectif), si chaque jour atteint son objectif, et ce qui est resté inutilisé en 'Peut utiliser'.",
      kp09: "Tout effacer vide chaque champ ; le mode reste.",
      bk01: "Langue, et Retour au guide KvK ; les captures d'écran changent de langue aussi.",
      bk02: "Choisis le poste : Premier ministre (construction / recherche / entraînement +10%) ou Conseiller noble (entraînement +50%, capacité +200). Les étapes 4–5 changent avec.",
      bk03: "1 — sur l'écran de la ville, touche Événements, en haut à droite.",
      bk04: "2 — l'onglet Bataille du château (l'icône de château), puis 3 — Détails à côté de Nomination.",
      bk05: "4 — dans l'onglet Ministres, touche le poste que tu veux.",
      bk06: "5 — choisis un créneau et touche le bouton à droite pour le réserver ; le petit bouton à côté de la date bascule heure locale ⇄ UTC. Pour annuler, rouvre la même fenêtre.",
      bk07: "Conseils : une réservation par poste à la fois ; chaque créneau montre combien de joueurs ont déjà postulé.",
      sq01: "Langue, et Retour aux guides.",
      sq02: "1 — touche ton avatar (en haut à gauche), 2 — Escouade en bas, 3 — Formations dans l'Aperçu des troupes.",
      sq03: "4 — touche les cartes de héros et choisis les héros pour cette escouade.",
      sq04: "5 — si une QUANTITÉ de troupes a été donnée, tape le nombre exact sur chaque ligne ; si seulement un RATIO, touche le bouton de ratio en bas et entre les pourcentages.",
      sq05: "6 — Enregistrer, choisis l'emplacement et nomme-le ; 7 — enregistre par Quantité de troupes (nombre) ou Ratio de troupes (ça s'adapte à tes troupes) ; 8 — Confirmer.",
      sq06: "Conseils : le cadenas sur le dernier emplacement veut dire qu'il doit encore être débloqué ; Équilibré remplit les trois types à égalité ; Tout retirer vide l'emplacement.", ask: "Je te guide sur cette page ?", yes: "🐦 Montre-moi", no: "Non merci",
      },
    pt: {
      bc01: "← Guias leva você de volta ao site; a caixa ao lado troca o idioma desta página.",
      bc02: "Suas tropas: a infantaria, a cavalaria e os arqueiros que você tem. Tudo abaixo é limitado por esses números.",
      bc03: "Suas próprias tropas no seu rally — o número que o jogo mostra, sem a Valora.",
      bc04: "Entrando em um rally: o máximo de tropas que uma marcha pode levar (o limite da aliança para o Urso já vem preenchido).",
      bc05: "Valora (Mestre da Caçada ao Urso): só se o número do seu rally não incluir ela — cada nível soma 3.000 à sua própria marcha no rally.",
      bc06: "Os tamanhos usados abaixo: seu rally e cada marcha.",
      bc07: "⚡ Divisão automática preenche todas as formações para você (ela substitui as existentes); você ainda pode arrastar depois.",
      bc08: "Suas Filas de Marcha: quantas marchas você tem — seu rally usa uma. Vazio = as quantidades vêm dos campos abaixo.",
      bc09: "Configuração de líder de rally do guia da Caçada ao Urso: escolha sua geração de heróis e configuração e a proporção do rally é preenchida — ou digite a sua.",
      bc10: "Proporção do rally: infantaria : cavalaria : arqueiros para o seu rally.",
      bc11: "Marchas de proporção fixa: quantas marchas cheias na proporção abaixo — ou 'quantas couberem'.",
      bc12: "A proporção das marchas de proporção fixa (padrão 10 : 10 : 80).",
      bc13: "Marchas com herói: marchas cheias com a mesma mistura do que sobrar.",
      bc14: "Marchas sem herói: marchas idênticas que dividem todo o resto.",
      bc15: "Cada marcha seguinte mantém pelo menos esta % de cada tipo, para nenhuma marcha sair sem arqueiros.",
      bc16: "⚡ Divisão automática agora monta as formações. O texto abaixo diz quantas marchas cheias cabem e qual tipo acaba primeiro.",
      bc17: "Usado / restante por tipo de tropa, sempre à vista — fica vermelho se você atribuir mais do que tem.",
      bc18: "Um cartão por formação: 👑 Rally primeiro, depois Marcha 2, 3… Arraste um controle ou digite uma % por tipo; ele para quando a formação está cheia ou aquele tipo acaba. ✕ remove uma marcha.",
      bc19: "+ Adicionar marcha adiciona uma vazia.",
      bc20: "📋 Copiar coloca um resumo de uma linha por formação na sua área de transferência, pronto para o chat.",
      bc21: "Como funciona: as regras em cinco linhas.",
      kc01: "中文 / EN trocam o idioma.",
      kc02: "Passo 1: escolha o evento — Projeto de Oficial A / B, Competição de Armamento 1 / 2, Governador Mais Forte, Briga de Alianças. Proporção = pontos de KvK perdidos por ponto de evento; quanto menor, mais barato.",
      kc03: "Para Governador Mais Forte e Briga de Alianças, escolha também o dia — cada dia tem seus próprios pontos, limites e recompensas.",
      kc04: "O nível do seu Centro da Cidade escolhe os limites e as quantidades de recompensa certos.",
      kc05: "Passo 2: o que você planeja gastar — uma linha por recurso que pontua, do mais barato para o mais caro. Digite a quantidade; os pontos de evento e os pontos de KvK atualizam conforme você digita.",
      kc06: "Passo 3: recompensas por marco — o limite da sua tela do jogo, depois cada recompensa e sua quantidade; um cartão fica verde quando sua pontuação chega lá. + Adicionar recompensa adiciona uma linha, × remove.",
      kc07: "Passo 4: a classificação esperada adiciona a recompensa de ranking (gemas, aceleradores, chaves) — só conta a partir de 4.000 pontos.",
      kc08: "1 gema = ? pts de KvK: como as gemas são avaliadas — roleta + fragmentos, só roleta, ou nada.",
      kc09: "O resultado: pontuação do evento, pontos de KvK perdidos, valor das recompensas e o saldo — verde = vale a pena, vermelho = você perde pontos de KvK. Abaixo: marcos alcançados, o que você ganha e o caminho mais barato até o próximo marco.",
      kc10: "Limpar este evento zera gastos, limites, recompensas e classificação só deste evento.",
      kp01: "Idioma, e Voltar ao guia de KvK.",
      kp02: "Passo 1: Total pessoal (só o total importa) ou Empurrão diário (itens que pontuam em vários dias vão para o dia que você quer empurrar).",
      kp03: "Empurrão diário: o mínimo de pontos por dia. Dias sem meta não recebem itens de 'Posso usar'; todos vazios = distribuição igual.",
      kp04: "Aceleradores por tipo, em d / h / m. Vou usar = você gastaria de qualquer jeito; Posso usar = tudo bem gastar por pontos. As caixas 1–5 mostram em quais dias eles pontuam.",
      kp05: "Recursos: Ouro Verdadeiro, Mithril, equipamento, fragmentos de herói, roleta, emblemas, manuscritos, marcas de domesticação, pontuações de encanto / pet / equipamento — cada um com seus pontos e dias. Vou usar e Posso usar de novo.",
      kp06: "Tropas (Dia 4): o nível que você treina e quantas; Promover só pontua a diferença entre os níveis.",
      kp07: "Passo 4: itens pontuados nível por nível — Encanto do Governador, pets, Equipamento do Governador, Forja de Maestria. Adicione linhas De → Para × peças; 'O que eu tenho' para de contar quando um material acaba; → Vou usar / → Posso usar escreve a pontuação no passo 2.",
      kp08: "O resultado: pontos por dia com uma barra (vou usar / posso usar / meta), se cada dia atinge a meta, e o que de 'Posso usar' ficou sem uso.",
      kp09: "Limpar tudo esvazia todos os campos; o modo fica.",
      bk01: "Idioma, e Voltar ao guia de KvK; as capturas de tela também mudam de idioma.",
      bk02: "Escolha a posição: Primeiro-Ministro (construção / pesquisa / treino +10%) ou Conselheiro Nobre (treino +50%, capacidade +200). Os passos 4–5 mudam conforme a escolha.",
      bk03: "1 — na tela da cidade, toque em Eventos, no canto superior direito.",
      bk04: "2 — a aba Batalha do Castelo (o ícone do castelo), depois 3 — Detalhes ao lado de Nomeação.",
      bk05: "4 — na aba Ministros, toque na posição que você quer.",
      bk06: "5 — escolha um horário e toque no botão à direita para reservar; o botãozinho ao lado da data alterna horário local ⇄ UTC. Para cancelar, abra a mesma janela de novo.",
      bk07: "Dicas: uma reserva por posição de cada vez; cada horário mostra quantos jogadores já se candidataram.",
      sq01: "Idioma, e Voltar aos guias.",
      sq02: "1 — toque no seu avatar (canto superior esquerdo), 2 — Esquadrão na parte de baixo, 3 — Formações em Prévia de Tropas.",
      sq03: "4 — toque nos cartões de herói e escolha os heróis deste esquadrão.",
      sq04: "5 — se foi dada uma QUANTIDADE de tropas, digite o número exato em cada linha; se foi só uma PROPORÇÃO, toque no botão de proporção na parte de baixo e insira as porcentagens.",
      sq05: "6 — Salvar, escolha o espaço e dê um nome; 7 — salve por Quantidade de Tropas (número) ou Proporção de Tropas (ela acompanha suas tropas); 8 — Confirmar.",
      sq06: "Dicas: o cadeado no último espaço significa que ele ainda precisa ser desbloqueado; Igualar preenche os três tipos por igual; Retirar tudo esvazia o espaço.", ask: "Quer que eu te guie nesta página?", yes: "🐦 Me mostra", no: "Não, obrigado",
      },
    es: {
      bc01: "← Guías te lleva de vuelta al sitio; la casilla de al lado cambia el idioma de esta página.",
      bc02: "Tus tropas: la infantería, la caballería y los arqueros que tienes. Todo lo de abajo está limitado por estos números.",
      bc03: "Tus propias tropas en tu rally — el número que muestra el juego, sin Valora.",
      bc04: "Al unirte a un rally: el máximo de tropas que puede llevar una marcha (el límite de la alianza para el Oso ya viene puesto).",
      bc05: "Valora (Maestra de la Caza del Oso): solo si el número de tu rally no la incluye — cada nivel suma 3,000 a tu propia marcha en el rally.",
      bc06: "Los tamaños que se usan abajo: tu rally y cada marcha.",
      bc07: "⚡ División automática rellena todas las formaciones por ti (las reemplaza); después puedes seguir arrastrando.",
      bc08: "Tus Colas de Marcha: cuántas marchas tienes — tu rally usa una. Vacío = las cantidades salen de los campos de abajo.",
      bc09: "Configuración de líder de rally de la guía de la Caza del Oso: elige tu generación de héroes y configuración y la proporción del rally se rellena — o escribe la tuya.",
      bc10: "Proporción del rally: infantería : caballería : arqueros para tu rally.",
      bc11: "Marchas de proporción fija: cuántas marchas completas con la proporción de abajo — o 'todas las que quepan'.",
      bc12: "La proporción de las marchas de proporción fija (por defecto 10 : 10 : 80).",
      bc13: "Marchas con héroe: marchas completas con la misma mezcla que lo que quede.",
      bc14: "Marchas sin héroe: marchas idénticas que se reparten todo lo demás.",
      bc15: "Cada marcha siguiente conserva al menos este % de cada tipo, para que ninguna marcha salga sin arqueros.",
      bc16: "⚡ División automática ahora arma las formaciones. El texto de abajo dice cuántas marchas completas caben y qué tipo se acaba primero.",
      bc17: "Usado / restante por tipo de tropa, siempre a la vista — se pone rojo si asignas más de lo que tienes.",
      bc18: "Una tarjeta por formación: 👑 Rally primero, luego Marcha 2, 3… Arrastra un control o escribe un % por tipo; se detiene cuando la formación está llena o ese tipo se acaba. ✕ elimina una marcha.",
      bc19: "+ Agregar marcha añade una vacía.",
      bc20: "📋 Copiar pone en tu portapapeles un resumen de una línea por formación, listo para el chat.",
      bc21: "Cómo funciona: las reglas en cinco líneas.",
      kc01: "中文 / EN cambian el idioma.",
      kc02: "Paso 1: elige el evento — Proyecto de Oficial A / B, Competencia de Armamento 1 / 2, Gobernador Más Fuerte, Reyerta de Alianzas. Proporción = puntos de KvK perdidos por punto de evento; más bajo es más barato.",
      kc03: "Para Gobernador Más Fuerte y Reyerta de Alianzas elige también el día — cada día tiene sus propios puntos, umbrales y recompensas.",
      kc04: "El nivel de tu Centro de la Ciudad elige los umbrales y las cantidades de recompensa correctos.",
      kc05: "Paso 2: lo que planeas gastar — una fila por recurso que da puntos, del más barato al más caro. Escribe la cantidad; los puntos de evento y los puntos de KvK se actualizan mientras escribes.",
      kc06: "Paso 3: recompensas por hito — el umbral de tu pantalla del juego, luego cada recompensa y su cantidad; una tarjeta se pone verde cuando tu puntaje lo alcanza. + Agregar recompensa añade una fila, × la elimina.",
      kc07: "Paso 4: el rango esperado añade la recompensa de clasificación (gemas, aceleradores, llaves) — solo cuenta a partir de 4,000 puntos.",
      kc08: "1 gema = ? pts de KvK: cómo se valoran las gemas — ruleta + fragmentos, solo ruleta, o nada.",
      kc09: "El resultado: puntaje del evento, puntos de KvK perdidos, valor de las recompensas y el neto — verde = vale la pena, rojo = pierdes puntos de KvK. Abajo: hitos alcanzados, lo que recibes y el camino más barato al siguiente hito.",
      kc10: "Borrar este evento reinicia gasto, umbrales, recompensas y rango solo de este evento.",
      kp01: "Idioma, y Volver a la guía de KvK.",
      kp02: "Paso 1: Total personal (solo importa el total) o Empuje diario (los ítems que dan puntos en varios días van al día que quieres empujar).",
      kp03: "Empuje diario: los puntos mínimos por día. Los días sin meta no reciben ítems de 'Puedo usar'; todos vacíos = reparto parejo.",
      kp04: "Aceleradores por tipo, en d / h / m. Voy a usar = los gastarías de todos modos; Puedo usar = está bien gastarlos por puntos. Las casillas 1–5 muestran en qué días dan puntos.",
      kp05: "Recursos: Oro Verdadero, Mithril, equipo, fragmentos de héroe, ruleta, emblemas, manuscritos, marcas de doma, puntajes de encanto / mascota / equipo — cada uno con sus puntos y días. Voy a usar y Puedo usar otra vez.",
      kp06: "Tropas (Día 4): el nivel que entrenas y cuántas; Promover solo da puntos por la diferencia entre niveles.",
      kp07: "Paso 4: ítems que puntúan nivel por nivel — Encanto del Gobernador, mascotas, Equipo del Gobernador, Forja de Maestría. Agrega filas De → A × piezas; 'Lo que tengo' deja de contar cuando se acaba un material; → Voy a usar / → Puedo usar escribe el puntaje en el paso 2.",
      kp08: "El resultado: puntos por día con una barra (voy a usar / puedo usar / meta), si cada día alcanza su meta, y qué de 'Puedo usar' quedó sin usar.",
      kp09: "Borrar todo vacía todos los campos; el modo se mantiene.",
      bk01: "Idioma, y Volver a la guía de KvK; las capturas de pantalla también cambian de idioma.",
      bk02: "Elige la posición: Primer Ministro (construcción / investigación / entrenamiento +10%) o Consejero Noble (entrenamiento +50%, capacidad +200). Los pasos 4–5 cambian según la elección.",
      bk03: "1 — en la pantalla de la ciudad toca Eventos, arriba a la derecha.",
      bk04: "2 — la pestaña Batalla del Castillo (el ícono del castillo), luego 3 — Detalles junto a Nombramiento.",
      bk05: "4 — en la pestaña Ministros, toca la posición que quieres.",
      bk06: "5 — elige un turno y toca el botón de la derecha para reservarlo; el botoncito junto a la fecha alterna hora local ⇄ UTC. Para cancelar, abre la misma ventana otra vez.",
      bk07: "Consejos: una reserva por posición a la vez; cada turno muestra cuántos jugadores ya se postularon.",
      sq01: "Idioma, y Volver a las guías.",
      sq02: "1 — toca tu avatar (arriba a la izquierda), 2 — Escuadrón abajo, 3 — Formaciones en Vista previa de Tropas.",
      sq03: "4 — toca las tarjetas de héroe y elige los héroes de este escuadrón.",
      sq04: "5 — si te dieron una CANTIDAD de tropas, escribe el número exacto en cada fila; si solo una PROPORCIÓN, toca el botón de proporción de abajo e ingresa los porcentajes.",
      sq05: "6 — Guardar, elige la ranura y ponle nombre; 7 — guarda por Cantidad de Tropas (número) o Proporción de Tropas (se ajusta a tus tropas); 8 — Confirmar.",
      sq06: "Consejos: el candado en la última ranura significa que todavía hay que desbloquearla; Igualar rellena los tres tipos por igual; Retirar todo vacía la ranura.", ask: "¿Te guío por esta página?", yes: "🐦 Muéstrame", no: "No, gracias",
      },
    tr: {
      bc01: "← Rehberler seni siteye geri götürür; yanındaki kutu bu sayfanın dilini değiştirir.",
      bc02: "Birliklerin: sahip olduğun piyade, süvari ve okçular. Aşağıdaki her şey bu sayılarla sınırlıdır.",
      bc03: "Rally'ndeki kendi birliklerin — oyunun gösterdiği sayı, Valora hariç.",
      bc04: "Rally'ye katılım: bir yürüyüşün getirebileceği en fazla birlik (ittifakın Ayı limiti hazır doldurulmuştur).",
      bc05: "Valora (Ayı Avı Ustası): yalnızca rally sayın onu içermiyorsa — her seviye rally'deki kendi yürüyüşüne 3.000 ekler.",
      bc06: "Aşağıda kullanılan boyutlar: rally'n ve her yürüyüş.",
      bc07: "⚡ Otomatik böl tüm düzenleri senin yerine doldurur (var olanların yerine geçer); sonra yine sürükleyebilirsin.",
      bc08: "Yürüyüş Kuyrukların: kaç yürüyüşün var — rally'n birini kullanır. Boş = sayılar aşağıdaki alanlardan gelir.",
      bc09: "Ayı Avı rehberinden rally lideri kurulumu: kahraman neslini ve kurulumunu seç, rally oranı doldurulur — ya da kendininkini yaz.",
      bc10: "Rally oranı: rally'n için piyade : süvari : okçu.",
      bc11: "Sabit oranlı yürüyüşler: aşağıdaki oranda kaç tam yürüyüş — ya da 'sığdığı kadar'.",
      bc12: "Sabit oranlı yürüyüşlerin oranı (varsayılan 10 : 10 : 80).",
      bc13: "Kahramanlı yürüyüşler: kalanla aynı karışımda tam yürüyüşler.",
      bc14: "Kahramansız yürüyüşler: geri kalan her şeyi paylaşan birbirinin aynı yürüyüşler.",
      bc15: "Sonraki her yürüyüş her türden en az bu % kadarını tutar, böylece hiçbir yürüyüş okçusuz çıkmaz.",
      bc16: "⚡ Otomatik böl şimdi düzenleri oluşturur. Alttaki yazı kaç tam yürüyüşün sığdığını ve hangi türün önce bittiğini söyler.",
      bc17: "Birlik türü başına kullanılan / kalan, hep görünür — sahip olduğundan fazlasını atarsan kırmızıya döner.",
      bc18: "Her düzen için bir kart: önce 👑 Rally, sonra Yürüyüş 2, 3… Bir kaydırıcıyı sürükle ya da tür başına % yaz; düzen dolunca ya da o tür bitince durur. ✕ bir yürüyüşü kaldırır.",
      bc19: "+ Yürüyüş ekle boş bir tane ekler.",
      bc20: "📋 Kopyala her düzen için tek satırlık bir özeti panona koyar, sohbete hazır.",
      bc21: "Nasıl çalışır: kurallar beş satırda.",
      kc01: "中文 / EN dili değiştirir.",
      kc02: "Adım 1: etkinliği seç — Subay Projesi A / B, Silahlanma Yarışması 1 / 2, En Güçlü Vali, İttifak Kavgası. Oran = etkinlik puanı başına kaybedilen KvK puanı; düşük olan daha ucuzdur.",
      kc03: "En Güçlü Vali ve İttifak Kavgası için günü de seç — her günün kendi puanları, eşikleri ve ödülleri vardır.",
      kc04: "Şehir Merkezi seviyen doğru eşikleri ve ödül miktarlarını belirler.",
      kc05: "Adım 2: harcamayı planladıkların — puan kazandıran her kaynak için bir satır, en ucuz önce. Miktarı yaz; etkinlik puanları ve KvK puanları anında güncellenir.",
      kc06: "Adım 3: kilometre taşı ödülleri — oyun ekranındaki eşik, sonra her ödül ve miktarı; puanın eşiğe ulaşınca kart yeşile döner. + Ödül ekle bir satır ekler, × kaldırır.",
      kc07: "Adım 4: beklenen sıralama, sıralama ödülünü ekler (mücevher, hızlandırıcılar, anahtarlar) — yalnızca 4.000 puandan itibaren sayılır.",
      kc08: "1 mücevher = ? KvK puanı: mücevherlerin nasıl değerlendiği — rulet + parçalar, yalnızca rulet ya da hiç.",
      kc09: "Sonuç: etkinlik puanı, kaybedilen KvK puanı, ödüllerin değeri ve net — yeşil = değer, kırmızı = KvK puanı kaybedersin. Altta: ulaşılan kilometre taşları, ne alacağın ve bir sonraki kilometre taşına en ucuz yol.",
      kc10: "Bu etkinliği temizle yalnızca bu etkinliğin harcama, eşik, ödül ve sıralamasını sıfırlar.",
      kp01: "Dil ve KvK rehberine dön.",
      kp02: "Adım 1: Kişisel toplam (yalnızca toplam önemli) ya da Günlük itiş (birden fazla günde puan veren eşyalar, itmek istediğin güne gider).",
      kp03: "Günlük itiş: gün başına en az puan. Hedefi olmayan günlere 'Kullanılabilir' eşya verilmez; hepsi boşsa = eşit dağıtılır.",
      kp04: "Türe göre hızlandırıcılar, d / h / m olarak. Kullanacağım = zaten harcayacakların; Kullanılabilir = puan için harcanması sorun olmayanlar. 1–5 kutuları hangi günlerde puan verdiklerini gösterir.",
      kp05: "Kaynaklar: Gerçek Altın, Mithril, ekipman, Kahraman Parçaları, rulet, amblemler, el yazmaları, Evcilleştirme İşaretleri, cazibe / evcil hayvan / ekipman puanları — her biri puanı ve günleriyle. Yine Kullanacağım ve Kullanılabilir.",
      kp06: "Birlikler (4. Gün): eğittiğin kademe ve kaç tane; Terfi yalnızca kademeler arasındaki farkı puanlar.",
      kp07: "Adım 4: seviye seviye puan veren eşyalar — Vali Cazibesi, evcil hayvanlar, Vali Ekipmanı, Ustalık Dövmesi. Satır ekle: Başlangıç → Bitiş × parça; 'Elimdekiler' bir malzeme bitince saymayı durdurur; → Kullanacağım / → Kullanılabilir puanı 2. adıma yazar.",
      kp08: "Sonuç: gün başına puanlar bir çubukla (kullanacağım / kullanılabilir / hedef), her günün hedefine ulaşıp ulaşmadığı ve hangi 'Kullanılabilir' eşyaların kullanılmadan kaldığı.",
      kp09: "Tümünü temizle her alanı boşaltır; mod kalır.",
      bk01: "Dil ve KvK rehberine dön; ekran görüntüleri de dil değiştirir.",
      bk02: "Makamı seç: Başbakan (inşaat / araştırma / eğitim +10%) ya da Soylu Danışman (eğitim +50%, kapasite +200). 4–5. adımlar buna göre değişir.",
      bk03: "1 — şehir ekranında sağ üstteki Etkinlikler'e dokun.",
      bk04: "2 — Kale Savaşı sekmesi (kale simgesi), sonra 3 — Atama'nın yanındaki Detaylar.",
      bk05: "4 — Bakanlar sekmesinde istediğin makama dokun.",
      bk06: "5 — bir slot seç ve rezerve etmek için sağdaki düğmeye dokun; tarihin yanındaki küçük düğme yerel saat ⇄ UTC arasında geçiş yapar. İptal için aynı pencereyi yeniden aç.",
      bk07: "İpuçları: aynı anda makam başına bir rezervasyon; her slot kaç oyuncunun başvurduğunu gösterir.",
      sq01: "Dil ve Rehberlere dön.",
      sq02: "1 — avatarına dokun (sol üst), 2 — alttaki Birlik, 3 — Birlik Önizleme'de Düzenler.",
      sq03: "4 — kahraman kartlarına dokun ve bu Birlik için kahramanları seç.",
      sq04: "5 — bir asker SAYISI verildiyse her satıra tam sayıyı yaz; yalnızca ORAN verildiyse alttaki oran düğmesine dokun ve yüzdeleri gir.",
      sq05: "6 — Kaydet, slotu seç ve adlandır; 7 — Asker Sayısı (sayı) ya da Asker Oranı (birliklerinle ölçeklenir) ile kaydet; 8 — Onayla.",
      sq06: "İpuçları: son slottaki kilit, henüz açılması gerektiğini gösterir; Eşit üç türü de eşit doldurur; Tümünü geri çek slotu boşaltır.", ask: "Bu sayfayı adım adım göstereyim mi?", yes: "🐦 Göster", no: "Gerek yok",
      },
    id: {
      bc01: "← Panduan membawamu kembali ke situs; kotak di sebelahnya mengganti bahasa halaman ini.",
      bc02: "Pasukanmu: infanteri, kavaleri, dan pemanah yang kamu miliki. Semua di bawah dibatasi oleh angka-angka ini.",
      bc03: "Pasukanmu sendiri di rally kamu — angka yang ditampilkan game, tanpa Valora.",
      bc04: "Bergabung ke rally: pasukan terbanyak yang boleh dibawa satu pawai (batas Beruang aliansi sudah terisi).",
      bc05: "Valora (Master Perburuan Beruang): hanya kalau angka rally kamu belum menyertakannya — tiap level menambah 3.000 ke pawaimu sendiri di rally.",
      bc06: "Ukuran yang dipakai di bawah: rally kamu dan tiap pawai.",
      bc07: "⚡ Bagi otomatis mengisi semua formasi untukmu (menggantikan yang ada); setelah itu kamu masih bisa menggeser.",
      bc08: "Antrean Pawai kamu: berapa pawai yang kamu punya — rally kamu memakai satu. Kosong = jumlahnya diambil dari kolom di bawah.",
      bc09: "Setelan pemimpin rally dari panduan Perburuan Beruang: pilih generasi hero dan setelanmu, rasio rally langsung terisi — atau ketik sendiri.",
      bc10: "Rasio rally: infanteri : kavaleri : pemanah untuk rally kamu.",
      bc11: "Pawai rasio tetap: berapa pawai penuh dengan rasio di bawah — atau 'sebanyak yang muat'.",
      bc12: "Rasio pawai rasio tetap (bawaan 10 : 10 : 80).",
      bc13: "Pawai dengan hero: pawai penuh dengan campuran yang sama seperti sisa yang ada.",
      bc14: "Pawai tanpa hero: pawai-pawai identik yang berbagi semua sisanya.",
      bc15: "Tiap pawai berikutnya menyimpan minimal % ini dari setiap jenis, jadi tidak ada pawai yang berangkat tanpa pemanah.",
      bc16: "⚡ Bagi otomatis sekarang menyusun formasinya. Teks di bawah memberi tahu berapa pawai penuh yang muat dan jenis mana yang habis lebih dulu.",
      bc17: "Terpakai / sisa per jenis pasukan, selalu terlihat — berubah merah kalau kamu menetapkan lebih dari yang kamu punya.",
      bc18: "Satu kartu per formasi: 👑 Rally dulu, lalu Pawai 2, 3… Geser slider atau ketik % per jenis; berhenti saat formasi penuh atau jenis itu habis. ✕ menghapus sebuah pawai.",
      bc19: "+ Tambah pawai menambahkan satu yang kosong.",
      bc20: "📋 Salin menaruh ringkasan satu baris per formasi ke clipboard-mu, siap untuk chat.",
      bc21: "Cara kerjanya: aturannya dalam lima baris.",
      kc01: "中文 / EN mengganti bahasa.",
      kc02: "Langkah 1: pilih event — Proyek Perwira A / B, Kompetisi Persenjataan 1 / 2, Gubernur Terkuat, Pertarungan Aliansi. Rasio = poin KvK yang hilang per poin event; makin rendah makin murah.",
      kc03: "Untuk Gubernur Terkuat dan Pertarungan Aliansi pilih juga harinya — tiap hari punya poin, ambang, dan hadiahnya sendiri.",
      kc04: "Level Pusat Kota kamu menentukan ambang dan jumlah hadiah yang tepat.",
      kc05: "Langkah 2: apa yang kamu rencanakan untuk dipakai — satu baris per sumber daya yang memberi poin, yang termurah lebih dulu. Ketik jumlahnya; poin event dan poin KvK diperbarui langsung.",
      kc06: "Langkah 3: hadiah milestone — ambang dari layar game kamu, lalu tiap hadiah dan jumlahnya; kartu berubah hijau saat skormu mencapainya. + Tambah hadiah menambah baris, × menghapusnya.",
      kc07: "Langkah 4: peringkat yang diharapkan menambahkan hadiah peringkat (gem, percepatan, kunci) — hanya dihitung mulai 4.000 poin.",
      kc08: "1 gem = ? poin KvK: cara gem dinilai — roulette + pecahan, roulette saja, atau tidak sama sekali.",
      kc09: "Hasilnya: skor event, poin KvK yang hilang, nilai hadiah, dan netonya — hijau = sepadan, merah = kamu kehilangan poin KvK. Di bawah: milestone yang tercapai, apa yang kamu dapat, dan cara termurah ke milestone berikutnya.",
      kc10: "Bersihkan event ini mereset pengeluaran, ambang, hadiah, dan peringkat untuk event ini saja.",
      kp01: "Bahasa, dan Kembali ke panduan KvK.",
      kp02: "Langkah 1: Total pribadi (hanya totalnya yang penting) atau Dorongan harian (item yang memberi poin di beberapa hari masuk ke hari yang ingin kamu dorong).",
      kp03: "Dorongan harian: poin minimum per hari. Hari tanpa target tidak mendapat item 'Boleh dipakai'; semua kosong = dibagi rata.",
      kp04: "Percepatan per jenis, sebagai d / h / m. Akan dipakai = kamu memang akan menghabiskannya; Boleh dipakai = tidak masalah dipakai untuk poin. Kotak 1–5 menunjukkan di hari mana saja item itu memberi poin.",
      kp05: "Sumber daya: Emas Sejati, Mithril, perlengkapan, Pecahan Pahlawan, roulette, lambang, manuskrip, Tanda Penjinakan, skor pesona / hewan peliharaan / perlengkapan — masing-masing dengan poin dan harinya. Lagi-lagi Akan dipakai dan Boleh dipakai.",
      kp06: "Pasukan (Hari 4): tier yang kamu latih dan berapa banyak; Promosi hanya menghitung selisih antar tier.",
      kp07: "Langkah 4: item yang memberi poin per level — Pesona Gubernur, hewan peliharaan, Perlengkapan Gubernur, Penempaan Mahir. Tambah baris Dari → Ke × jumlah; 'Yang kumiliki' berhenti menghitung saat suatu bahan habis; → Akan dipakai / → Boleh dipakai menulis skornya ke langkah 2.",
      kp08: "Hasilnya: poin per hari dengan bilah (akan dipakai / boleh dipakai / target), apakah tiap hari mencapai targetnya, dan 'Boleh dipakai' mana yang tersisa tak terpakai.",
      kp09: "Bersihkan semua mengosongkan semua kolom; modenya tetap.",
      bk01: "Bahasa, dan Kembali ke panduan KvK; tangkapan layarnya juga ikut ganti bahasa.",
      bk02: "Pilih posisinya: Perdana Menteri (pembangunan / penelitian / pelatihan +10%) atau Penasihat Bangsawan (pelatihan +50%, kapasitas +200). Langkah 4–5 berubah mengikutinya.",
      bk03: "1 — di layar kota ketuk Event, kanan atas.",
      bk04: "2 — tab Pertempuran Kastil (ikon kastil), lalu 3 — Detail di sebelah Penunjukan.",
      bk05: "4 — di tab Menteri, ketuk posisi yang kamu mau.",
      bk06: "5 — pilih slot dan ketuk tombol di kanan untuk memesannya; tombol kecil di sebelah tanggal mengganti waktu lokal ⇄ UTC. Untuk membatalkan, buka lagi jendela yang sama.",
      bk07: "Tips: satu pemesanan per posisi dalam satu waktu; tiap slot menunjukkan berapa pemain yang sudah mendaftar.",
      sq01: "Bahasa, dan Kembali ke panduan.",
      sq02: "1 — ketuk avatarmu (kiri atas), 2 — Regu di bagian bawah, 3 — Formasi di Pratinjau Pasukan.",
      sq03: "4 — ketuk kartu hero dan pilih hero untuk Regu ini.",
      sq04: "5 — kalau JUMLAH pasukan diberikan, ketik angka pastinya di tiap baris; kalau hanya RASIO, ketuk tombol rasio di bawah dan masukkan persentasenya.",
      sq05: "6 — Simpan, pilih slot dan beri nama; 7 — simpan dengan Jumlah Pasukan (jumlah) atau Rasio Pasukan (menyesuaikan dengan pasukanmu); 8 — Konfirmasi.",
      sq06: "Tips: gembok di slot terakhir berarti slot itu masih harus dibuka; Rata mengisi ketiga jenis sama banyak; Tarik semua mengosongkan slot.", ask: "Mau aku pandu halaman ini?", yes: "🐦 Tunjukkan", no: "Tidak perlu",
      },
    ru: {
      bc01: "← Гайды возвращает на сайт; поле рядом переключает язык этой страницы.",
      bc02: "Твои войска: пехота, кавалерия и лучники, которые у тебя есть. Всё ниже ограничено этими числами.",
      bc03: "Твои собственные войска в твоём ралли — число, которое показывает игра, без Валоры.",
      bc04: "Присоединение к ралли: максимум войск, который может взять один марш (подставлен лимит альянса на Медведя).",
      bc05: "Валора (Мастер Охоты на медведя): только если число твоего ралли её не включает — каждый уровень добавляет 3,000 к твоему собственному маршу в ралли.",
      bc06: "Размеры, используемые ниже: твоё ралли и каждый марш.",
      bc07: "⚡ Авторазбивка заполняет за тебя все построения (она их заменяет); потом всё равно можно двигать ползунки.",
      bc08: "Твои очереди марша: сколько у тебя маршей — твоё ралли занимает один. Пусто = количество берётся из полей ниже.",
      bc09: "Настройка лидера ралли из гайда по Охоте на медведя: выбери поколение героев и сетап, и соотношение ралли подставится — или введи своё.",
      bc10: "Соотношение ралли: пехота : кавалерия : лучники для твоего ралли.",
      bc11: "Марши с фиксированным соотношением: сколько полных маршей с соотношением ниже — или «сколько поместится».",
      bc12: "Соотношение маршей с фиксированным соотношением (по умолчанию 10 : 10 : 80).",
      bc13: "Марши с героем: полные марши с той же смесью, что и всё оставшееся.",
      bc14: "Марши без героя: одинаковые марши, которые делят между собой весь остаток.",
      bc15: "Каждый следующий марш сохраняет хотя бы этот % каждого типа, чтобы ни один марш не ушёл без лучников.",
      bc16: "⚡ Авторазбивка теперь строит построения. Текст ниже говорит, сколько полных маршей помещается и какой тип закончится первым.",
      bc17: "Использовано / осталось по каждому типу войск, всегда на виду — становится красным, если назначишь больше, чем у тебя есть.",
      bc18: "По карточке на построение: сначала 👑 Ралли, потом Марш 2, 3… Двигай ползунок или введи % для каждого типа; остановится, когда построение заполнено или этот тип закончился. ✕ удаляет марш.",
      bc19: "+ Добавить марш добавляет пустой.",
      bc20: "📋 Копировать кладёт в буфер обмена сводку по одной строке на построение, готовую для чата.",
      bc21: "Как это работает: правила в пяти строках.",
      kc01: "中文 / EN переключают язык.",
      kc02: "Шаг 1: выбери событие — Проект офицера A / B, Соревнование вооружений 1 / 2, Сильнейший губернатор, Драка альянсов. Соотношение = очки KvK, потерянные за очко события; чем ниже, тем дешевле.",
      kc03: "Для Сильнейшего губернатора и Драки альянсов выбери ещё и день — у каждого дня свои очки, пороги и награды.",
      kc04: "Уровень твоей Ратуши выбирает нужные пороги и размеры наград.",
      kc05: "Шаг 2: что ты планируешь потратить — по строке на каждый ресурс, который приносит очки, самые дешёвые первыми. Введи количество; очки события и очки KvK обновляются по ходу.",
      kc06: "Шаг 3: награды за этапы — порог с твоего игрового экрана, затем каждая награда и её количество; карточка становится зелёной, когда твой счёт его достигает. + Добавить награду добавляет строку, × удаляет её.",
      kc07: "Шаг 4: ожидаемое место добавляет награду за рейтинг (самоцветы, ускорения, ключи) — учитывается только от 4,000 очков.",
      kc08: "1 самоцвет = ? очков KvK: как оцениваются самоцветы — Рулетка героев + осколки, только рулетка или никак.",
      kc09: "Результат: счёт события, потерянные очки KvK, стоимость наград и итог — зелёный = стоит того, красный = ты теряешь очки KvK. Ниже: достигнутые этапы, что ты получишь и самый дешёвый путь к следующему этапу.",
      kc10: "Очистить это событие сбрасывает траты, пороги, награды и место только для этого события.",
      kp01: "Язык и Назад к гайду по KvK.",
      kp02: "Шаг 1: Личный итог (важен только общий итог) или Дневной рывок (предметы, которые приносят очки в несколько дней, идут в тот день, который ты хочешь усилить).",
      kp03: "Дневной рывок: минимум очков в день. Дни без цели не получают предметов «Можно использовать»; все пустые = распределяется поровну.",
      kp04: "Ускорения по типам, в d / h / m. Использую = ты всё равно их потратишь; Можно использовать = не жалко потратить ради очков. Кнопки 1–5 показывают, в какие дни они приносят очки.",
      kp05: "Ресурсы: Истинное золото, Мифрил, снаряжение, Осколки героя, рулетка, эмблемы, манускрипты, Знаки приручения, очки обаяния / питомца / снаряжения — у каждого свои очки и дни. Снова Использую и Можно использовать.",
      kp06: "Войска (День 4): уровень, который ты обучаешь, и сколько; Повышение приносит только разницу между уровнями.",
      kp07: "Шаг 4: предметы с очками по уровням — Обаяние губернатора, питомцы, Снаряжение губернатора, Мастерская ковка. Добавляй строки С → До × штук; «Что у меня есть» перестаёт считать, когда материал заканчивается; → Использую / → Можно использовать записывает очки в шаг 2.",
      kp08: "Результат: очки по дням с полоской (использую / можно использовать / цель), достигает ли каждый день своей цели и что из «Можно использовать» осталось неиспользованным.",
      kp09: "Очистить всё очищает все поля; режим остаётся.",
      bk01: "Язык и Назад к гайду по KvK; скриншоты тоже меняют язык.",
      bk02: "Выбери должность: Премьер-министр (строительство / исследование / обучение +10%) или Благородный советник (обучение +50%, вместимость +200). Шаги 4–5 меняются вместе с ней.",
      bk03: "1 — на экране города нажми События, вверху справа.",
      bk04: "2 — вкладка Битва за замок (иконка замка), затем 3 — Подробнее рядом с Назначением.",
      bk05: "4 — во вкладке Министры нажми на нужную должность.",
      bk06: "5 — выбери слот и нажми кнопку справа, чтобы забронировать; маленькая кнопка рядом с датой переключает местное время ⇄ UTC. Чтобы отменить, снова открой то же окно.",
      bk07: "Советы: одна бронь на должность за раз; у каждого слота видно, сколько игроков уже подали заявку.",
      sq01: "Язык и Назад к гайдам.",
      sq02: "1 — нажми на свой аватар (вверху слева), 2 — Отряд внизу, 3 — Построения в Обзоре войск.",
      sq03: "4 — нажми на карточки героев и выбери героев для этого отряда.",
      sq04: "5 — если дано КОЛИЧЕСТВО войск, введи точное число в каждой строке; если только СООТНОШЕНИЕ, нажми кнопку соотношения внизу и введи проценты.",
      sq05: "6 — Сохранить, выбери слот и назови его; 7 — сохрани по Количеству войск (число) или по Соотношению войск (оно масштабируется под твои войска); 8 — Подтвердить.",
      sq06: "Советы: замок на последнем слоте означает, что его ещё нужно открыть; Поровну заполняет все три типа одинаково; Вывести всех очищает слот.", ask: "Провести тебя по этой странице?", yes: "🐦 Покажи", no: "Не нужно",
      },
    th: {
      bc01: "← ไกด์ จะพาคุณกลับไปที่เว็บไซต์ ช่องข้างๆ ใช้เปลี่ยนภาษาของหน้านี้",
      bc02: "ทหารของคุณ: ทหารราบ ทหารม้า และพลธนูที่คุณมี ทุกอย่างด้านล่างถูกจำกัดด้วยตัวเลขเหล่านี้",
      bc03: "ทหารของคุณเองในรวมพลของคุณ — ตัวเลขที่เกมแสดง ไม่รวม วาโลร่า",
      bc04: "การเข้าร่วมรวมพล: จำนวนทหารสูงสุดที่หนึ่งเดินทัพพาไปได้ (ใส่ลิมิต หมี ของพันธมิตรให้แล้ว)",
      bc05: "วาโลร่า (มาสเตอร์ ล่าหมี): เฉพาะเมื่อตัวเลขรวมพลของคุณไม่รวมเธอ — แต่ละเลเวลเพิ่ม 3,000 ให้กับเดินทัพของคุณเองในรวมพล",
      bc06: "ขนาดที่ใช้ด้านล่าง: รวมพลของคุณและแต่ละเดินทัพ",
      bc07: "⚡ แบ่งอัตโนมัติ จะเติม รูปแบบกองทัพ ทั้งหมดให้คุณ (แทนที่ของเดิม) หลังจากนั้นยังลากปรับได้",
      bc08: "คิวเดินทัพของคุณ: คุณมีกี่เดินทัพ — รวมพลของคุณใช้ไปหนึ่ง เว้นว่าง = จำนวนจะมาจากช่องด้านล่าง",
      bc09: "การตั้งค่าหัวหน้ารวมพลจากไกด์ ล่าหมี: เลือกรุ่นฮีโร่และเซ็ตของคุณ แล้วอัตราส่วนรวมพลจะถูกใส่ให้ — หรือพิมพ์ของคุณเอง",
      bc10: "อัตราส่วนรวมพล: ทหารราบ : ทหารม้า : พลธนู สำหรับรวมพลของคุณ",
      bc11: "เดินทัพอัตราส่วนคงที่: จะมีเดินทัพเต็มกี่ชุดตามอัตราส่วนด้านล่าง — หรือ 'เท่าที่ใส่ได้'",
      bc12: "อัตราส่วนของเดินทัพอัตราส่วนคงที่ (ค่าเริ่มต้น 10 : 10 : 80)",
      bc13: "เดินทัพที่มีฮีโร่: เดินทัพเต็มที่มีส่วนผสมเหมือนกับที่เหลืออยู่",
      bc14: "เดินทัพที่ไม่มีฮีโร่: เดินทัพเหมือนกันทุกชุดที่แบ่งส่วนที่เหลือทั้งหมด",
      bc15: "เดินทัพถัดไปแต่ละชุดจะเก็บอย่างน้อย % นี้ของทุกประเภทไว้ เพื่อไม่ให้มีเดินทัพไหนออกไปโดยไม่มีพลธนู",
      bc16: "⚡ แบ่งอัตโนมัติ จะสร้าง รูปแบบกองทัพ ตอนนี้ ข้อความด้านล่างบอกว่ามีเดินทัพเต็มกี่ชุดและประเภทไหนหมดก่อน",
      bc17: "ใช้ไป / เหลือ ต่อประเภททหาร มองเห็นตลอด — จะเป็นสีแดงถ้าคุณจัดเกินกว่าที่มี",
      bc18: "หนึ่งการ์ดต่อหนึ่ง รูปแบบกองทัพ: 👑 รวมพล ก่อน แล้ว เดินทัพ 2, 3… ลากสไลเดอร์หรือพิมพ์ % ต่อประเภท จะหยุดเมื่อรูปแบบเต็มหรือประเภทนั้นหมด ✕ จะลบเดินทัพ",
      bc19: "+ เพิ่มเดินทัพ จะเพิ่มอันว่างหนึ่งอัน",
      bc20: "📋 คัดลอก จะวางสรุปแบบหนึ่งบรรทัดต่อหนึ่งรูปแบบลงคลิปบอร์ดของคุณ พร้อมส่งในแชท",
      bc21: "วิธีทำงาน: กฎในห้าบรรทัด",
      kc01: "中文 / EN เปลี่ยนภาษา",
      kc02: "ขั้นที่ 1: เลือกกิจกรรม — โครงการนายทหาร A / B, การแข่งขันยุทโธปกรณ์ 1 / 2, ผู้ว่าที่แข็งแกร่งที่สุด, ศึกพันธมิตร อัตราส่วน = แต้ม KvK ที่เสียต่อหนึ่งแต้มกิจกรรม ยิ่งต่ำยิ่งถูก",
      kc03: "สำหรับ ผู้ว่าที่แข็งแกร่งที่สุด และ ศึกพันธมิตร ให้เลือกวันด้วย — แต่ละวันมีแต้ม เกณฑ์ และรางวัลของตัวเอง",
      kc04: "เลเวล ศูนย์กลางเมือง ของคุณจะเลือกเกณฑ์และจำนวนรางวัลที่ถูกต้อง",
      kc05: "ขั้นที่ 2: สิ่งที่คุณวางแผนจะใช้ — หนึ่งแถวต่อทรัพยากรที่ให้แต้ม เรียงจากถูกสุดก่อน พิมพ์จำนวน แต้มกิจกรรมและแต้ม KvK จะอัปเดตไปเรื่อยๆ",
      kc06: "ขั้นที่ 3: รางวัลตามเป้าหมาย — เกณฑ์จากหน้าจอเกมของคุณ ตามด้วยแต่ละรางวัลและจำนวน การ์ดจะเป็นสีเขียวเมื่อคะแนนของคุณถึง + เพิ่มรางวัล เพิ่มแถว × ลบออก",
      kc07: "ขั้นที่ 4: อันดับที่คาดไว้จะเพิ่มรางวัลจัดอันดับ (เพชร ตัวเร่ง กุญแจ) — นับตั้งแต่ 4,000 แต้มขึ้นไปเท่านั้น",
      kc08: "1 เพชร = ? แต้ม KvK: วิธีตีค่าเพชร — รูเล็ต + เศษ, รูเล็ตอย่างเดียว หรือไม่นับเลย",
      kc09: "ผลลัพธ์: คะแนนกิจกรรม แต้ม KvK ที่เสีย มูลค่ารางวัล และสุทธิ — สีเขียว = คุ้ม สีแดง = คุณเสียแต้ม KvK ด้านล่าง: เป้าหมายที่ถึงแล้ว สิ่งที่คุณได้ และทางที่ถูกที่สุดไปยังเป้าหมายถัดไป",
      kc10: "ล้างกิจกรรมนี้ จะรีเซ็ตการใช้ เกณฑ์ รางวัล และอันดับของกิจกรรมนี้เท่านั้น",
      kp01: "ภาษา และ กลับไปไกด์ KvK",
      kp02: "ขั้นที่ 1: ยอดรวมส่วนตัว (สนใจแค่ยอดรวม) หรือ ดันรายวัน (ไอเทมที่ให้แต้มหลายวันจะไปอยู่วันที่คุณอยากดัน)",
      kp03: "ดันรายวัน: แต้มขั้นต่ำต่อวัน วันที่ไม่มีเป้าหมายจะไม่ได้ไอเทม 'ใช้ได้' ว่างทั้งหมด = กระจายเท่าๆ กัน",
      kp04: "ตัวเร่ง ตามประเภท เป็น d / h / m จะใช้ = คุณจะใช้อยู่แล้ว ใช้ได้ = ใช้เพื่อแต้มก็ได้ กล่อง 1–5 แสดงว่าให้แต้มวันไหน",
      kp05: "ทรัพยากร: ทองแท้, มิธริล, อุปกรณ์, เศษฮีโร่, รูเล็ต, ตราสัญลักษณ์, ตำรา, ตราฝึกสัตว์, คะแนนเสน่ห์ / สัตว์เลี้ยง / อุปกรณ์ — แต่ละอย่างมีแต้มและวันของมัน จะใช้ และ ใช้ได้ อีกเช่นกัน",
      kp06: "ทหาร (วันที่ 4): เทียร์ที่คุณฝึกและจำนวน เลื่อนขั้น ให้แต้มเฉพาะส่วนต่างระหว่างเทียร์",
      kp07: "ขั้นที่ 4: ไอเทมที่ให้แต้มเป็นเลเวล — เสน่ห์ผู้ว่า, สัตว์เลี้ยง, อุปกรณ์ผู้ว่า, การตีเหล็กชำนาญ เพิ่มแถว จาก → ถึง × ชิ้น 'ที่ฉันมี' จะหยุดนับเมื่อวัสดุหมด → จะใช้ / → ใช้ได้ จะเขียนคะแนนลงในขั้นที่ 2",
      kp08: "ผลลัพธ์: แต้มต่อวันพร้อมแถบ (จะใช้ / ใช้ได้ / เป้าหมาย) แต่ละวันถึงเป้าหมายหรือไม่ และ 'ใช้ได้' ส่วนไหนที่ยังไม่ได้ใช้",
      kp09: "ล้างทั้งหมด จะล้างทุกช่อง โหมดยังคงอยู่",
      bk01: "ภาษา และ กลับไปไกด์ KvK สกรีนช็อตจะเปลี่ยนภาษาด้วย",
      bk02: "เลือกตำแหน่ง: อัครมหาเสนาบดี (ก่อสร้าง / วิจัย / ฝึกทหาร +10%) หรือ ที่ปรึกษาผู้สูงศักดิ์ (ฝึกทหาร +50%, ความจุ +200) ขั้นที่ 4–5 จะเปลี่ยนตามไปด้วย",
      bk03: "1 — บนหน้าจอเมือง แตะ กิจกรรม ที่มุมขวาบน",
      bk04: "2 — แท็บ ศึกปราสาท (ไอคอนปราสาท) แล้ว 3 — รายละเอียด ข้าง การแต่งตั้ง",
      bk05: "4 — ในแท็บ เสนาบดี แตะตำแหน่งที่คุณต้องการ",
      bk06: "5 — เลือกสล็อตแล้วแตะปุ่มด้านขวาเพื่อจอง ปุ่มเล็กข้างวันที่ใช้สลับเวลาท้องถิ่น ⇄ UTC หากจะยกเลิก ให้เปิดหน้าต่างเดิมอีกครั้ง",
      bk07: "เคล็ดลับ: จองได้ตำแหน่งละหนึ่งครั้งในแต่ละช่วง แต่ละสล็อตแสดงว่ามีผู้เล่นสมัครไปแล้วกี่คน",
      sq01: "ภาษา และ กลับไปไกด์",
      sq02: "1 — แตะอวาตาร์ของคุณ (มุมซ้ายบน) 2 — หน่วยรบ ที่ด้านล่าง 3 — รูปแบบกองทัพ ใน ตัวอย่างทหาร",
      sq03: "4 — แตะการ์ดฮีโร่แล้วเลือกฮีโร่สำหรับ หน่วยรบ นี้",
      sq04: "5 — ถ้ากำหนด จำนวน ทหารมา ให้พิมพ์ตัวเลขที่แน่นอนในแต่ละแถว ถ้ากำหนดแค่ อัตราส่วน ให้แตะปุ่มอัตราส่วนด้านล่างแล้วใส่เปอร์เซ็นต์",
      sq05: "6 — บันทึก เลือกสล็อตแล้วตั้งชื่อ 7 — บันทึกแบบ จำนวนทหาร (จำนวน) หรือ อัตราส่วนทหาร (ปรับตามทหารของคุณ) 8 — ยืนยัน",
      sq06: "เคล็ดลับ: กุญแจล็อกที่สล็อตสุดท้ายหมายความว่ายังต้องปลดล็อกก่อน เท่ากัน จะเติมทั้งสามประเภทเท่าๆ กัน ถอนทั้งหมด จะล้างสล็อต", ask: "ให้ฉันพาดูหน้านี้ไหม?", yes: "🐦 พาดูหน่อย", no: "ไม่เป็นไร",
      },
    ar: {
      bc01: "← الأدلة يعيدك إلى الموقع؛ والمربع المجاور له يبدّل لغة هذه الصفحة.",
      bc02: "قواتك: المشاة والفرسان والرماة الذين تملكهم. كل ما تحته محدود بهذه الأرقام.",
      bc03: "قواتك أنت في حشدك — الرقم الذي تعرضه اللعبة، من دون فالورا.",
      bc04: "الانضمام إلى حشد: أكبر عدد من القوات يمكن أن تحمله مسيرة واحدة (حد الدب الخاص بالتحالف مملوء مسبقًا).",
      bc05: "فالورا (خبيرة صيد الدب): فقط إذا كان رقم حشدك لا يشملها — كل مستوى يضيف 3,000 إلى مسيرتك أنت في الحشد.",
      bc06: "الأحجام المستخدمة أدناه: حشدك وكل مسيرة.",
      bc07: "⚡ تقسيم تلقائي يملأ كل التشكيلات لك (ويستبدلها)؛ ويمكنك السحب بعدها.",
      bc08: "طوابير المسيرة لديك: عدد المسيرات التي تملكها — حشدك يستخدم واحدة. فارغ = تؤخذ الأعداد من الحقول أدناه.",
      bc09: "إعداد قائد الحشد من دليل صيد الدب: اختر جيل أبطالك وإعدادك فتُملأ نسبة الحشد — أو اكتب نسبتك.",
      bc10: "نسبة الحشد: المشاة : الفرسان : الرماة لحشدك.",
      bc11: "مسيرات بنسبة ثابتة: عدد المسيرات الكاملة بالنسبة أدناه — أو 'بقدر ما يتسع'.",
      bc12: "نسبة المسيرات ذات النسبة الثابتة (الافتراضي 10 : 10 : 80).",
      bc13: "مسيرات مع بطل: مسيرات كاملة بالمزيج نفسه لما تبقى.",
      bc14: "مسيرات من دون بطل: مسيرات متطابقة تتقاسم كل ما تبقى.",
      bc15: "كل مسيرة لاحقة تحتفظ بهذه الـ % على الأقل من كل نوع، حتى لا تخرج أي مسيرة من دون رماة.",
      bc16: "⚡ تقسيم تلقائي يبني التشكيلات الآن. النص أدناه يخبرك كم مسيرة كاملة تتسع وأي نوع ينفد أولًا.",
      bc17: "المستخدم / المتبقي لكل نوع قوات، ظاهر دائمًا — يتحوّل إلى الأحمر إذا خصصت أكثر مما تملك.",
      bc18: "بطاقة لكل تشكيل: 👑 الحشد أولًا، ثم المسيرة 2، 3… اسحب شريطًا أو اكتب % لكل نوع؛ يتوقف عندما يمتلئ التشكيل أو ينفد ذلك النوع. ✕ يحذف مسيرة.",
      bc19: "+ إضافة مسيرة يضيف مسيرة فارغة.",
      bc20: "📋 نسخ يضع ملخصًا بسطر لكل تشكيل في حافظتك، جاهزًا للدردشة.",
      bc21: "كيف يعمل: القواعد في خمسة أسطر.",
      kc01: "中文 / EN يبدّلان اللغة.",
      kc02: "الخطوة 1: اختر الحدث — مشروع الضابط A / B، مسابقة التسلح 1 / 2، أقوى حاكم، شجار التحالفات. النسبة = نقاط KvK المفقودة لكل نقطة حدث؛ الأقل أرخص.",
      kc03: "لأقوى حاكم وشجار التحالفات اختر اليوم أيضًا — لكل يوم نقاطه وعتباته ومكافآته.",
      kc04: "مستوى مركز المدينة لديك يحدد العتبات وكميات المكافآت الصحيحة.",
      kc05: "الخطوة 2: ما تخطط لإنفاقه — صف لكل مورد يمنح نقاطًا، الأرخص أولًا. اكتب الكمية؛ فتتحدث نقاط الحدث ونقاط KvK أثناء الكتابة.",
      kc06: "الخطوة 3: مكافآت المراحل — العتبة من شاشة لعبتك، ثم كل مكافأة وكميتها؛ تتحوّل البطاقة إلى الأخضر عندما تبلغها نقاطك. + إضافة مكافأة يضيف صفًا، × يحذفه.",
      kc07: "الخطوة 4: المركز المتوقع يضيف مكافأة الترتيب (الجواهر، التسريعات، المفاتيح) — ولا تُحتسب إلا من 4,000 نقطة.",
      kc08: "1 جوهرة = ? نقطة KvK: كيف تُقدَّر قيمة الجواهر — روليت الأبطال + الشظايا، أو الروليت فقط، أو لا تُحتسب.",
      kc09: "النتيجة: نقاط الحدث، نقاط KvK المفقودة، قيمة المكافآت والصافي — أخضر = يستحق، أحمر = تخسر نقاط KvK. وتحتها: المراحل المحققة، وما تحصل عليه، وأرخص طريق إلى المرحلة التالية.",
      kc10: "مسح هذا الحدث يعيد ضبط الإنفاق والعتبات والمكافآت والمركز لهذا الحدث فقط.",
      kp01: "اللغة، والعودة إلى دليل KvK.",
      kp02: "الخطوة 1: المجموع الشخصي (المجموع وحده هو المهم) أو دفعة يومية (العناصر التي تمنح نقاطًا في عدة أيام تذهب إلى اليوم الذي تريد دفعه).",
      kp03: "دفعة يومية: الحد الأدنى من النقاط في اليوم. الأيام بلا هدف لا تحصل على عناصر 'يمكن استخدامه'؛ وكلها فارغة = توزيع بالتساوي.",
      kp04: "التسريعات حسب النوع، بصيغة d / h / m. سأستخدمه = ستنفقه على أي حال؛ يمكن استخدامه = لا بأس بإنفاقه من أجل النقاط. المربعات 1–5 تبيّن في أي الأيام يمنح نقاطًا.",
      kp05: "الموارد: الذهب الحقيقي، الميثريل، العتاد، شظايا الأبطال، الروليت، الشعارات، المخطوطات، علامات الترويض، نقاط السحر / الحيوان الأليف / العتاد — لكل منها نقاطه وأيامه. ومرة أخرى سأستخدمه ويمكن استخدامه.",
      kp06: "القوات (اليوم 4): الدرجة التي تدربها وعددها؛ الترقية لا تمنح إلا الفرق بين الدرجتين.",
      kp07: "الخطوة 4: عناصر تمنح نقاطًا مستوى بمستوى — سحر الحاكم، الحيوانات الأليفة، عتاد الحاكم، صياغة الإتقان. أضف صفوفًا من → إلى × قطعة؛ 'ما أملكه' يتوقف عن الحساب عندما ينفد أحد المواد؛ → سأستخدمه / → يمكن استخدامه يكتب النقاط في الخطوة 2.",
      kp08: "النتيجة: النقاط لكل يوم مع شريط (سأستخدمه / يمكن استخدامه / الهدف)، وهل يبلغ كل يوم هدفه، وما تبقى من 'يمكن استخدامه' من دون استخدام.",
      kp09: "مسح الكل يفرغ كل الحقول؛ ويبقى الوضع كما هو.",
      bk01: "اللغة، والعودة إلى دليل KvK؛ ولقطات الشاشة تغيّر لغتها أيضًا.",
      bk02: "اختر المنصب: رئيس الوزراء (البناء / البحث / التدريب +10%) أو المستشار النبيل (التدريب +50%، السعة +200). الخطوتان 4–5 تتغيران معه.",
      bk03: "1 — في شاشة المدينة اضغط الأحداث، أعلى اليمين.",
      bk04: "2 — تبويب معركة القلعة (أيقونة القلعة)، ثم 3 — التفاصيل بجانب التعيين.",
      bk05: "4 — في تبويب الوزراء، اضغط على المنصب الذي تريده.",
      bk06: "5 — اختر فترة واضغط الزر على اليمين لحجزها؛ الزر الصغير بجانب التاريخ يبدّل التوقيت المحلي ⇄ UTC. للإلغاء، افتح النافذة نفسها مرة أخرى.",
      bk07: "نصائح: حجز واحد لكل منصب في المرة الواحدة؛ وكل فترة تعرض عدد اللاعبين الذين تقدموا بالفعل.",
      sq01: "اللغة، والعودة إلى الأدلة.",
      sq02: "1 — اضغط على صورتك الرمزية (أعلى اليسار)، 2 — الفرقة في الأسفل، 3 — التشكيلات في معاينة القوات.",
      sq03: "4 — اضغط على بطاقات الأبطال واختر أبطال هذه الفرقة.",
      sq04: "5 — إذا أُعطيت كمية للقوات، اكتب العدد الدقيق في كل صف؛ وإذا أُعطيت نسبة فقط، اضغط زر النسبة في الأسفل وأدخل النسب المئوية.",
      sq05: "6 — حفظ، اختر الخانة وسمّها؛ 7 — احفظ حسب كمية القوات (العدد) أو نسبة القوات (تتناسب مع قواتك)؛ 8 — تأكيد.",
      sq06: "نصائح: القفل على الخانة الأخيرة يعني أنها لم تُفتح بعد؛ بالتساوي يملأ الأنواع الثلاثة بالتساوي؛ سحب الكل يفرغ الخانة.", ask: "هل أرافقك في هذه الصفحة؟", yes: "🐦 أرني", no: "لا شكرًا",
      },
  };
  const tl = (k) => (TOOL[lang()] || TOOL.en)[k] || TOOL.en[k];
  const TOOL_STEPS = {
    "bear-calculator": [{ s: "#bc_home", k: "bc01" }, { s: ".bt-grid", k: "bc02" }, { s: "#bt_rally", k: "bc03" }, { s: "#bt_join", k: "bc04" }, { s: "#bt_savage", k: "bc05" }, { s: "#bt_eff", k: "bc06" },
      { s: "#bt_hAuto", k: "bc07", pre: () => { const d = Q("#bt_autoBox"); if (d) d.open = true; } }, { s: "#bt_tot", k: "bc08" }, { s: "#bt_preGen", k: "bc09" }, { s: "#bt_r0", k: "bc10" }, { s: "#bt_fixN", k: "bc11" }, { s: "#bt_m0", k: "bc12" }, { s: "#bt_hero", k: "bc13" }, { s: "#bt_rest", k: "bc14" }, { s: "#bt_min", k: "bc15" }, { s: "#bt_run", k: "bc16" },
      { s: "#bt_use", k: "bc17" }, { s: "#bt_forms .bt-f", k: "bc18" }, { s: "#bt_add", k: "bc19" }, { s: "#bt_copy", k: "bc20" }, { s: "#bt_hHow", k: "bc21" }],
    "kvk-calculator": [{ s: "header .lang", k: "kc01" }, { s: "#events", k: "kc02" }, { s: "#days", k: "kc03" }, { s: "#tcg", k: "kc04" }, { s: "#spend", k: "kc05" }, { s: "#ms", k: "kc06" }, { s: "#rank", k: "kc07" }, { s: "#gemrate", k: "kc08" }, { s: "#verdict", k: "kc09" }, { s: "#reset", k: "kc10" }],
    "kvk-optimizer": [{ s: "header .hdr-r", k: "kp01" }, { s: "#modes", k: "kp02" }, { s: "#targets", k: "kp03" }, { s: "#speed", k: "kp04" }, { s: "#res", k: "kp05" }, { s: "#troops", k: "kp06" }, { s: "#lv", k: "kp07" }, { s: "#verdict", k: "kp08" }, { s: "#reset", k: "kp09" }],
  };   // the booking and squad guides are plain step-by-step pictures: nothing to explain, so no tour there
  async function runToolTour(only) {
    if (busy || !PAGE) return; busy = true; hush(); clearTarget(); tour = PAGE; ["point", "fly", "idle"].forEach(preload);
    await walk(only || TOOL_STEPS[PAGE] || [], (st) => tl(st.k));
    clearTarget(); tour = null; busy = false; await goHome(); hush();
  }
  if (IS_TOOL) setInterval(() => { if (root.hidden || !TOOL_STEPS[PAGE]) return; try { callButtonsFor(TOOL_STEPS[PAGE], (sub) => runToolTour(sub)); } catch (e) {} }, 1500);
  function toolAsk() {
    say(`<b>${esc(tl("ask"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="ttour">${esc(tl("yes"))}</button><button type="button" data-a="tno">${esc(tl("no"))}</button></div>`);
    redraw = toolAsk; clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => { if (!busy) hush(); }, 6000);
  }
  async function startTool() {
    booted = true;
    if (ls.get(LS) === "off") { showToggle(true); return; }
    root.hidden = false; pos = perchPoint(); place(); faceIn(); await play("idle", { squash: false }); state = "menu";
    if (TOOL_STEPS[PAGE] && !sessionStorage.getItem("nxs-sparrow-tool-" + PAGE)) { try { sessionStorage.setItem("nxs-sparrow-tool-" + PAGE, "1"); } catch (e) {} const c = play("hi"); toolAsk(); if (await c) play("idle", { squash: false }); }
  }
  bubble.addEventListener("click", (e) => { const b = e.target.closest("button[data-a=ttour], button[data-a=tno]"); if (!b) return; hush(); if (b.dataset.a === "ttour") runToolTour(); });
  /* 🤕 the All Out pop-up gag — its own little actor, separate from the regular sparrow: the pop-up is an extra, and the bird that
     flies in with it is an extra too. It lives inside the pop-up overlay (so it goes away with it), flies in from the right, is hit
     by the rock as it reaches the middle (the clip), lies dazed on top of the box and thinks about the NAP — until Confirm.
     Meanwhile the regular sparrow sits out of sight and carries on exactly as usual once the pop-up is gone. */
  const safeBottom = () => { const v = parseFloat(getComputedStyle(root).getPropertyValue("--sp-sab")); return isNaN(v) ? 0 : v; };
  let popupCut = null;
  function gagIn(overlay) {
    const box = overlay.querySelector(".popup-box"); if (!box) return;
    const actor = document.createElement("div"); actor.className = "sp-gag"; const img = document.createElement("img"); img.alt = ""; actor.appendChild(img); overlay.appendChild(actor);
    const think = document.createElement("div"); think.className = "sp-bubble sp-think sp-top"; think.hidden = true; think.dir = "auto"; overlay.appendChild(think);
    const timers = [], urls = []; let raf = 0, gone = false;
    const url = (blob) => { const u = URL.createObjectURL(blob); urls.push(u); return u; };
    const done = () => { gone = true; cancelAnimationFrame(raf); timers.forEach(clearTimeout); urls.forEach((u) => URL.revokeObjectURL(u)); };
    new MutationObserver((_, ob) => { if (!overlay.isConnected) { ob.disconnect(); done(); } }).observe(document.body, { childList: true });
    const fit = (name) => { const m = META[name]; img.style.width = (m.w * SIZE) + "px"; img.style.height = (m.h * SIZE) + "px"; img.style.marginLeft = (-m.anchor[0] * SIZE) + "px"; img.style.marginTop = (-m.anchor[1] * SIZE) + "px"; };
    const at = (x, y) => { actor.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`; };
    (async () => {
      const [fly, hurt] = await Promise.all([preload("fly"), preload("hurt")]); if (gone || !fly || !META.fly) return;
      const br = box.getBoundingClientRect(), fw = META.fly.w * SIZE;
      const tx = Math.min(innerWidth - fw * 0.6, Math.max(fw * 0.6, br.left + br.width / 2)), ty = br.top - 8, x0 = innerWidth + fw, y0 = ty - 90;
      fit("fly"); img.src = url(fly); at(x0, y0); actor.style.visibility = "visible";
      const D = 1400, HIT = hurt && META.hurt ? D - 600 : D, t0 = performance.now(); let hitDone = false;
      const hitNow = () => { hitDone = true; if (hurt && META.hurt) { fit("hurt"); img.src = url(hurt); } /* the clip rests on its own last frame (held for hours, plays once): no late swap that lets the rock come again */ };
      await new Promise((res) => { const f = (now) => { if (gone) return res(); const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 1.5);
        at(x0 + (tx - x0) * e, y0 + 90 * e - Math.sin(Math.PI * k) * 40); if (!hitDone && now - t0 >= HIT) hitNow(); if (k < 1) raf = requestAnimationFrame(f); else res(); }; raf = requestAnimationFrame(f); });
      if (gone) return; if (!hitDone) hitNow();
      timers.push(setTimeout(() => {   // the thought, once it's down
        if (gone) return;
        think.innerHTML = `<div>${esc(t("napThink"))}</div>`; think.hidden = false;
        const bw = think.offsetWidth, bh = think.offsetHeight, hh = META.hurt ? META.hurt.h * SIZE : 90;
        let left = Math.max(8, Math.min(innerWidth - bw - 8, tx - bw / 2)), top = ty - hh - bh - 18, up = false;   // above the bird, never over the box
        if (top < safeTop() + 8) {
          if (br.bottom + 12 + bh <= innerHeight - safeBottom() - 8) { up = true; top = br.bottom + 12; }   // no room above: below the box
          else top = safeTop() + 8;   // no room anywhere: over the bird, still never over the message
        }
        think.style.left = left + "px"; think.style.top = top + "px"; think.classList.toggle("sp-up", up); think.style.setProperty("--sp-tail", Math.max(14, Math.min(bw - 26, tx - left - 6)) + "px");
      }, META.hurt ? 3800 : 300));
    })();
  }
  if (!IS_OFFICER && !IS_TOOL) {
    if (NAP_PREVIEW) { try { window.isEventActive = () => true; } catch (e) {} }   // the pop-up shows even outside All Out
    setTimeout(() => { preload("fly"); preload("hurt"); }, 1200);   // fetched early, so the gag never has to wait for its clip
    const seePopup = () => {
      const ov = document.querySelector(".popup-overlay"); if (!ov || ov.spSeen || ov.querySelector(".sp-gag")) return; ov.spSeen = true;
      // the regular sparrow just waits at its perch, behind the pop-up's dimmed backdrop, until it's called after the jump
      try { gagIn(ov); } catch (e) {}
      if (popupCut) popupCut();   // the regular sparrow drops whatever it was saying; it starts over after the jump
    };
    new MutationObserver(seePopup).observe(document.body, { childList: true });
    setTimeout(seePopup, 800);   // the pop-up may already be there when the sparrow loads (language remembered → no picker)
  }
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
    if (IS_OFFICER) { officerAsk(); return; }
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
    booted = true;
    root.hidden = false;
    const site = typeof langChosen !== "undefined";
    pos = perchPoint(); place(); faceIn();
    const picker = () => site && !langChosen;
    let wakeGen = 0, waiting = false;
    const popupDue = () => { try { return typeof shouldShowEventPopup === "function" && shouldShowEventPopup(); } catch (e) { return false; } };
    const wakeUp = async () => {
      const g = ++wakeGen; let saw = false; waiting = true;
      for (let i = 0; i < 30 && popupDue() && !document.querySelector(".popup-overlay"); i++) await wait(300);   // the event pop-up is about to show: don't greet underneath it
      while (document.querySelector(".popup-overlay")) { saw = true; await wait(300); }   // pop-up up (with its own bird): wait until it's confirmed…
      if (saw) await wait(900);   // …and the page has jumped to the guide
      waiting = false; if (g !== wakeGen) return;
      sleepZ(false); busy = true; await play("wake"); busy = false; if (g !== wakeGen) return;
      if (PREVIEW) { busy = true; await playMessage(MESSAGES[PREVIEW === "nia" ? 0 : 1], true); busy = false; state = "menu"; armIdle(); return; }   // 👀 preview of a personal message
      if (!(await msgHint())) greet();
    };
    popupCut = () => {
      if (waiting || picker() || state === "sleep") return;   // already waiting for it, or asleep under the language picker
      ++wakeGen; clearTimeout(idleTimer); cancelStep(); stopFlight(); hush(); clearTarget(); tour = null; busy = false;
      pos = perchPoint(); place(); faceIn(); state = "menu"; wakeUp();
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
    d.innerHTML = `<div class="ai-grp">🐦 ${esc(ot("pick"))}</div><div class="ai-chips">${tabs.map((a) => `<button type="button" class="ai-chip" data-otour="${a.dataset.tab}">${esc(ot(a.dataset.tab))}</button>`).join("")}${mine ? `<button type="button" class="ai-chip" data-omsg="1">${esc(ot("msgs"))}</button>` : ""}</div>`;
    const hint = g.querySelector(".ai-hint"); if (hint) hint.before(d); else g.appendChild(d);
  }
  /* 👀 the officer page's own controls, top to bottom — the things no 🐦 button explains (each card has its own 🐦) */
  const OTOP = [{ s: "#main .shbar > a.btn", k: "ob01" }, { s: "#langBtn", k: "ob02" }, { s: "#themeBtn", k: "ob03" }, { s: "#copyUrlBtn", k: "ob04" }, { s: "#reloadBtn", k: "ob05" },
    { s: "#meBox", k: "ob06" }, { s: "#main nav.tabs", k: "ob07" }, { s: ".sp-call", k: "ob08" }, { s: ".ai-fab", k: "ob09" }];
  async function officerTopTour() {
    if (busy) return; busy = true; hush(); clearTarget(); tour = "top";
    try { addCallButtons(); } catch (e) {} try { window.scrollTo({ top: 0 }); } catch (e) {} await wait(250);
    const r = await walk(OTOP, (st) => t(st.k)); ls.set("nxs-sparrow-callhint", "1");
    clearTarget(); tour = null; busy = false; await goHome(); return r;
  }
  async function officerAsk() {
    clearTarget(); await goHome(); const c = play("hi");
    const ask = () => say(`<b>${esc(t("tourQo"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="otq">${esc(t("tourYes"))}</button><button type="button" data-a="otn">${esc(t("tourNo"))}</button></div>`);
    ask(); redraw = ask; state = "menu"; clearTimeout(bubbleTimer);
    if (await c) play("idle", { squash: false });
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
  /* walk a list of steps: {s: selector|fn, k: text key, e: editor-only, pre: do this first}. txt(key) gives the wording; applies(step) filters.
     Steps whose element isn't on screen are skipped quietly. Returns false when the user pressed Stop. */
  async function walk(steps, txt, applies) {
    steps = steps.filter((st) => !applies || applies(st));
    const find = (st) => { const el = Q(st.s); return el && shown(el) ? el : null; };
    let shownAny = false, stopped = false;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      if (st.pre) { try { selfNav(); await st.pre(); } catch (e) {} await wait(450); }
      const el = await waitFor(() => find(st), st.pre ? 1800 : 250);
      if (!el) continue;   // not on this page right now (view-only, nothing to open, empty list…) → next
      shownAny = true;
      const more = steps.slice(i + 1).some((s2) => s2.pre || find(s2));
      const r = await step(el, () => txt(st), !more); if (r === "stop") { stopped = true; break; }
    }
    return { shownAny, stopped };
  }
  async function runOfficerTour(tab, only) {
    if (busy) return; busy = true; hush(); clearTarget(); tour = tab;
    const end = async () => { clearTarget(); tour = null; busy = false; try { if (!only && OEXIT[tab]) OEXIT[tab](); } catch (e) {} await goHome(); hush(); };
    const a = Q(`.tabs a[data-tab="${tab}"]`); if (!a) { await end(); return; }
    if (!only) {
      a.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" }); await wait(300);
      const p = pointAt(a); if (!(await flyTo(p.x, p.y))) { busy = false; tour = null; return; } setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(a); play("point"); await wait(700);
      if (!a.classList.contains("on")) { selfNav(); a.click(); await wait(600); }
    }
    const steps = only || OTOURS[tab];
    const r = await walk(steps, (st) => otStep(tab, st.k), (st) => stepApplies(tab, st));
    if (!r.shownAny && steps.length && !r.stopped) { const h = Q(`#pg-${tab} h1`); await step(h && shown(h) ? h : a, () => otStep(tab, steps[0].k), true); }   // nothing rendered yet (no data) → at least say what the tab is for
    await end();
  }
  /* 🐦 one "call Little Sparrow" button per card: tap → the sparrow walks through just that card's steps. Generic: steps + how to run a subset */
  function callButtonsFor(steps, run, scope) {
    const seen = new Set();
    steps.forEach((st) => {
      if (st.pre || typeof st.s === "function") return;   // steps that open something belong to the card they open from; the card itself carries the button
      const el = Q(st.s); if (!el || !shown(el) || (scope && !scope.contains(el))) return;
      let card = el.closest(".card, details, .tm-page, .tm-note, .tm-alerts, .tm-quick, #tmAdd, section.step, aside, .lvc, .mcard, .km-card, .km-layers, .km-c, .km-info");
      if (card && card.classList.contains("km-card")) card = Q("#km_layers") || card;   // the map itself has no room for a 🐦: the layer chips' button covers layers + zoom + map
      if (!card || seen.has(card)) return; seen.add(card);   // a lone control outside any card (the map's + −, a header button) gets no 🐦 of its own
      if ([...document.querySelectorAll(".sp-call")].some((x) => x.spCard === card)) return;   // already has one (a re-rendered card loses it and gets a fresh one)
      const head = card.querySelector(":scope > h1, :scope > h2, :scope > .top h2, :scope > summary, :scope > .top h1, :scope > h3, :scope > .tm-top > b, :scope > b, :scope > .mhead, :scope > .hd");
      const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("call"); b.setAttribute("aria-label", t("call")); b.spCard = card;
      const within = (e2) => card === e2 || card.contains(e2) || (card.id === "km_layers" && !!e2.closest(".km-card"));
      b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); hush(); run(steps.filter((s2) => { const e2 = Q(s2.s); return e2 && within(e2); })); };
      if (head) head.appendChild(b); else { b.style.cssText = "float:inline-end;margin:0 0 4px 6px"; card.prepend(b); }
    });
  }
  /* 🐦 a small "call Little Sparrow" button on every card of the officer page: tap → the sparrow walks through just that card's buttons */
  function addCallButtons() {
    const tab = (location.hash.match(/^#([a-z]+)/) || [])[1]; const steps = OTOURS[tab]; if (!steps) return;
    callButtonsFor(steps, (sub) => runOfficerTour(tab, sub), Q(`#pg-${tab}`));
  }
  let tmHinted = !!ls.get("nxs-sparrow-callhint");
  setInterval(() => {
    if (root.hidden) return;
    const view = document.querySelector(".tm-view"); if (!view || view.hidden) return;
    const mk = (id) => { const b = document.createElement("button"); b.type = "button"; b.className = "sp-call"; b.textContent = "🐦"; b.title = t("call"); b.setAttribute("aria-label", t("call")); b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); hush(); runTour(id); }; return b; };
    const top = view.querySelector(".tm-top > b"); if (top && !top.querySelector(".sp-call")) top.appendChild(mk("tmr"));
    const al = view.querySelector(".tm-alerts > b"); if (al && !al.querySelector(".sp-call")) { const b = mk("rem"); b.spCard = al.parentElement; al.appendChild(b); }
    try { callButtonsFor(TM_STEPS.filter((st) => st.k !== "tm01" && st.k !== "tm02" && st.k !== "tm21"), (sub) => runTour("tmr", sub), view); } catch (e) {}
    // first time the timers panel is open this session: show what the 🐦 is for
    const cb = view.querySelector(".tm-top .sp-call");
    if (cb && !tmHinted && !busy && !tour && state !== "sleep") {
      tmHinted = true; ls.set("nxs-sparrow-callhint", "1");
      (async () => {
        busy = true; hush(); clearTarget(); cb.scrollIntoView({ block: "center" }); await wait(350);
        const p = pointAt(cb); if (!(await flyTo(p.x, p.y))) { busy = false; return; }
        setFacing(p.side === "r" || (p.side === "top" && p.x > p.cx) ? "l" : "r"); highlight(cb); const c = play("point"); say(esc(t("callBtn")), { foot: false }); await c;
        await play("idle", { squash: false }); await showFor(4000); hush(); clearTarget(); busy = false; await goHome();
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
    booted = true;
    const gate = document.getElementById("gate");
    await new Promise((r) => { const tick = setInterval(() => { if ((!gate || gate.hidden) && OFFICER.user) { clearInterval(tick); r(); } }, 500); });
    root.hidden = false; pos = perchPoint(); place(); faceIn(); state = "menu";   // (not "off": the resize re-perch and the watchdog only run for a live bird)
    const u = OFFICER.user, m = messageFor(u);
    if (m && !isRead(m)) { await playMessage(m); return; }
    if (sessionStorage.getItem("nxs-sparrow-greeted")) { await play("idle", { squash: false }); return; }
    try { sessionStorage.setItem("nxs-sparrow-greeted", "1"); } catch (e) {}
    const c = play("hi"); say(esc(t("oGreet").replace("{name}", u.name || "")), { foot: false }); await c;
    await play("idle", { squash: false }); await wait(5000); hush();
    // …then, like the main site: "Want a quick tour of this tab?" (👀 Yes = quick tour · No thanks = the tab list in the chat)
    await officerAsk();
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
    // re-perch a moment after the viewport settles (not during an iOS rubber-band bounce or a toolbar animation, or the bird would hop around)
    let rpT = null; const rePerch = () => { placeBubble(); clearTimeout(rpT); rpT = setTimeout(() => { if (!busy && !flying && !zoomed() && state !== "off" && root.hidden === false && !targetEl) { pos = perchPoint(); place(); faceIn(); } placeBubble(); }, 350); };
    if (window.visualViewport) visualViewport.addEventListener("scroll", rePerch);   // iOS keyboard: the page slides up under it
    window.addEventListener("resize", rePerch);
    document.addEventListener("focusout", () => { setTimeout(rePerch, 250); setTimeout(rePerch, 900); });   // once the keyboard has finished sliding away, too
    document.addEventListener("focusin", () => { setTimeout(rePerch, 300); setTimeout(rePerch, 900); });   // keyboard opening   // keyboard closed → settle back on the button
    if (window.visualViewport) visualViewport.addEventListener("resize", rePerch);   // iOS: the browser bar folding away moves the Ask AI button → the bird follows
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
