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
  const LS = "nxs-sparrow", READ_LS = "nxs-sparrow-read";
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- texts (12 site languages; officer page uses zh/en/pt/ar/ko) ---------- */
  const T = {
    en: { greet: "Hi! I'm Little Sparrow 🐦 Need any help?", page: "🔎 Find a page", how: "🎓 How do I use…", none: "🤔 Neither of these",
      noneA: "Then please go find the real Sparrow (Sparrow) 🐦", pageA: "Tap the page you want and I'll fly you there.", here: "Here it is. This is what you were looking for, right?",
      howA: "Type what you want to do in the box below. I'll explain it step by step.", sulky: "Don't need me…? Okay then.", hide: "Hide Little Sparrow", show: "Little Sparrow",
      msg: "There's a message for you 💌 Tap 📋 at the top right.", got: "Got it", from: "from Sparrow", oGreet: "Hi {name}! I'm Little Sparrow. If I still can't teach you something, go find the real Sparrow 😄" },
    zh: { greet: "嗨囉！我是小麻雀 🐦 需要幫忙嗎？", page: "🔎 找頁面", how: "🎓 怎麼用某個功能…", none: "🤔 都不是",
      noneA: "那請你去找真麻雀喔（Sparrow）🐦", pageA: "點你要的頁面，我飛過去帶你看。", here: "在這裡。這應該就是你要找的對吧？",
      howA: "在下面的框框打你想做的事，我一步一步教你。", sulky: "不需要我嗎…？好吧。", hide: "隱藏小麻雀", show: "小麻雀",
      msg: "有給你的留言 💌 點右上角的 📋", got: "知道了", from: "來自 Sparrow", oGreet: "嗨 {name}！我是小麻雀。如果我還是教不會你，就去找真麻雀吧 😄" },
    ko: { greet: "안녕! 나는 작은 참새 🐦 도움이 필요해?", page: "🔎 페이지 찾기", how: "🎓 기능 사용법…", none: "🤔 둘 다 아니야",
      noneA: "그럼 진짜 참새(Sparrow)를 찾아가 줘 🐦", pageA: "원하는 페이지를 누르면 내가 날아가서 보여줄게.", here: "여기야. 찾던 게 이거 맞지?",
      howA: "아래 칸에 하고 싶은 걸 적어 줘. 하나씩 알려줄게.", sulky: "내가 필요 없어…? 알았어.", hide: "작은 참새 숨기기", show: "작은 참새",
      msg: "너에게 온 메시지가 있어 💌 오른쪽 위 📋 를 눌러 봐.", got: "알겠어", from: "Sparrow가 보냄", oGreet: "안녕 {name}! 나는 작은 참새야. 내가 못 알려주는 게 있으면 진짜 Sparrow를 찾아가 😄" },
    de: { greet: "Hi! Ich bin der kleine Spatz 🐦 Brauchst du Hilfe?", page: "🔎 Eine Seite finden", how: "🎓 Wie benutze ich…", none: "🤔 Keins von beiden",
      noneA: "Dann geh bitte zum echten Spatz (Sparrow) 🐦", pageA: "Tippe auf die Seite, die du willst – ich fliege hin.", here: "Hier ist es. Das hast du gesucht, oder?",
      howA: "Schreib unten, was du machen willst. Ich erkläre es Schritt für Schritt.", sulky: "Brauchst du mich nicht…? Na gut.", hide: "Kleinen Spatz ausblenden", show: "Kleiner Spatz",
      msg: "Da ist eine Nachricht für dich 💌 Tippe oben rechts auf 📋.", got: "Alles klar", from: "von Sparrow", oGreet: "Hi {name}! Ich bin der kleine Spatz. Wenn ich dir etwas nicht erklären kann, geh zum echten Sparrow 😄" },
    fr: { greet: "Salut ! Je suis Petit Moineau 🐦 Besoin d'aide ?", page: "🔎 Trouver une page", how: "🎓 Comment utiliser…", none: "🤔 Ni l'un ni l'autre",
      noneA: "Alors va voir le vrai Moineau (Sparrow) 🐦", pageA: "Touche la page que tu veux, je t'y emmène.", here: "C'est ici. C'est ce que tu cherchais, non ?",
      howA: "Écris en bas ce que tu veux faire. Je t'explique étape par étape.", sulky: "Tu n'as pas besoin de moi… ? Bon.", hide: "Cacher Petit Moineau", show: "Petit Moineau",
      msg: "Il y a un message pour toi 💌 Touche 📋 en haut à droite.", got: "Compris", from: "de Sparrow", oGreet: "Salut {name} ! Je suis Petit Moineau. Si je n'arrive pas à t'expliquer, va voir le vrai Sparrow 😄" },
    pt: { greet: "Oi! Eu sou o Pardalzinho 🐦 Precisa de ajuda?", page: "🔎 Encontrar uma página", how: "🎓 Como usar…", none: "🤔 Nenhum dos dois",
      noneA: "Então vá falar com a Sparrow de verdade 🐦", pageA: "Toque na página que você quer e eu voo até lá.", here: "Aqui está. Era isso que você procurava, né?",
      howA: "Escreva embaixo o que você quer fazer. Eu explico passo a passo.", sulky: "Não precisa de mim…? Tá bom.", hide: "Esconder o Pardalzinho", show: "Pardalzinho",
      msg: "Tem uma mensagem para você 💌 Toque em 📋 no canto superior direito.", got: "Entendi", from: "da Sparrow", oGreet: "Oi {name}! Eu sou o Pardalzinho. Se eu não conseguir te ensinar algo, vá falar com a Sparrow de verdade 😄" },
    es: { greet: "¡Hola! Soy Gorrioncito 🐦 ¿Necesitas ayuda?", page: "🔎 Buscar una página", how: "🎓 Cómo usar…", none: "🤔 Ninguna de las dos",
      noneA: "Entonces ve con la Sparrow de verdad 🐦", pageA: "Toca la página que quieres y vuelo hasta allí.", here: "Aquí está. Esto es lo que buscabas, ¿no?",
      howA: "Escribe abajo lo que quieres hacer. Te lo explico paso a paso.", sulky: "¿No me necesitas…? Bueno.", hide: "Ocultar a Gorrioncito", show: "Gorrioncito",
      msg: "Tienes un mensaje 💌 Toca 📋 arriba a la derecha.", got: "Entendido", from: "de Sparrow", oGreet: "¡Hola {name}! Soy Gorrioncito. Si no logro enseñarte algo, ve con la Sparrow de verdad 😄" },
    tr: { greet: "Selam! Ben Küçük Serçe 🐦 Yardım lazım mı?", page: "🔎 Sayfa bul", how: "🎓 Nasıl kullanılır…", none: "🤔 İkisi de değil",
      noneA: "O zaman gerçek Serçe'ye (Sparrow) git 🐦", pageA: "İstediğin sayfaya dokun, oraya uçayım.", here: "İşte burada. Aradığın buydu, değil mi?",
      howA: "Aşağıya ne yapmak istediğini yaz. Adım adım anlatırım.", sulky: "Bana ihtiyacın yok mu…? Peki.", hide: "Küçük Serçe'yi gizle", show: "Küçük Serçe",
      msg: "Sana bir mesaj var 💌 Sağ üstteki 📋 simgesine dokun.", got: "Anladım", from: "Sparrow'dan", oGreet: "Selam {name}! Ben Küçük Serçe. Bir şeyi öğretemezsem gerçek Sparrow'a git 😄" },
    id: { greet: "Hai! Aku Burung Gereja Kecil 🐦 Perlu bantuan?", page: "🔎 Cari halaman", how: "🎓 Cara memakai…", none: "🤔 Bukan dua-duanya",
      noneA: "Kalau begitu cari Sparrow yang asli ya 🐦", pageA: "Ketuk halaman yang kamu mau, aku terbang ke sana.", here: "Ini dia. Ini yang kamu cari, kan?",
      howA: "Tulis di kotak bawah apa yang mau kamu lakukan. Aku jelaskan langkah demi langkah.", sulky: "Tidak butuh aku…? Ya sudah.", hide: "Sembunyikan Burung Gereja Kecil", show: "Burung Gereja Kecil",
      msg: "Ada pesan untukmu 💌 Ketuk 📋 di kanan atas.", got: "Oke", from: "dari Sparrow", oGreet: "Hai {name}! Aku Burung Gereja Kecil. Kalau aku tetap tidak bisa mengajarimu, cari Sparrow yang asli ya 😄" },
    ru: { greet: "Привет! Я Воробушек 🐦 Нужна помощь?", page: "🔎 Найти страницу", how: "🎓 Как пользоваться…", none: "🤔 Ни то, ни другое",
      noneA: "Тогда иди к настоящему Воробью (Sparrow) 🐦", pageA: "Нажми на нужную страницу — я прилечу туда.", here: "Вот оно. Ты это искал, да?",
      howA: "Напиши внизу, что хочешь сделать. Объясню по шагам.", sulky: "Я не нужен…? Ну ладно.", hide: "Скрыть Воробушка", show: "Воробушек",
      msg: "Для тебя есть сообщение 💌 Нажми 📋 справа вверху.", got: "Понятно", from: "от Sparrow", oGreet: "Привет, {name}! Я Воробушек. Если я не смогу что-то объяснить, иди к настоящему Sparrow 😄" },
    th: { greet: "หวัดดี! ฉันคือนกกระจอกน้อย 🐦 ต้องการความช่วยเหลือไหม?", page: "🔎 หาหน้า", how: "🎓 ใช้ฟีเจอร์ยังไง…", none: "🤔 ไม่ใช่ทั้งสองอย่าง",
      noneA: "งั้นไปหานกกระจอกตัวจริง (Sparrow) นะ 🐦", pageA: "แตะหน้าที่ต้องการ แล้วฉันจะบินพาไป", here: "อยู่นี่ไง นี่คือที่หาอยู่ใช่ไหม?",
      howA: "พิมพ์สิ่งที่อยากทำในช่องด้านล่าง ฉันจะอธิบายทีละขั้น", sulky: "ไม่ต้องการฉันเหรอ…? ก็ได้", hide: "ซ่อนนกกระจอกน้อย", show: "นกกระจอกน้อย",
      msg: "มีข้อความถึงคุณ 💌 แตะ 📋 มุมขวาบน", got: "เข้าใจแล้ว", from: "จาก Sparrow", oGreet: "หวัดดี {name}! ฉันคือนกกระจอกน้อย ถ้าฉันสอนไม่ได้ ไปหา Sparrow ตัวจริงนะ 😄" },
    ar: { greet: "مرحبًا! أنا العصفور الصغير 🐦 هل تحتاج مساعدة؟", page: "🔎 البحث عن صفحة", how: "🎓 كيف أستخدم…", none: "🤔 لا هذا ولا ذاك",
      noneA: "إذًا اذهب إلى العصفور الحقيقي (Sparrow) 🐦", pageA: "اضغط على الصفحة التي تريدها وسأطير إليها.", here: "ها هي. هذا ما كنت تبحث عنه، صحيح؟",
      howA: "اكتب في الأسفل ما تريد فعله، وسأشرحه خطوة بخطوة.", sulky: "لا تحتاجني…؟ حسنًا.", hide: "إخفاء العصفور الصغير", show: "العصفور الصغير",
      msg: "لديك رسالة 💌 اضغط على 📋 في الأعلى يمينًا.", got: "فهمت", from: "من Sparrow", oGreet: "مرحبًا {name}! أنا العصفور الصغير. إن لم أستطع تعليمك شيئًا، اذهب إلى Sparrow الحقيقية 😄" },
  };
  const lang = () => { if (typeof currentLang !== "undefined") return currentLang; return ls.get("nxs-officer-lang") || "en"; };
  const t = (k) => (T[lang()] || T.en)[k] || T.en[k];

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
  function layout(name) {
    const m = META[name]; if (!m) return;
    const w = m.w * SIZE, h = m.h * SIZE, ax = m.anchor[0] * SIZE, ay = m.anchor[1] * SIZE;
    bird.style.width = w + "px"; bird.style.height = h + "px";
    [imgA, imgB].forEach((i) => { i.style.width = w + "px"; i.style.height = h + "px"; });
    // the feet (anchor) sit on pos; bird box is placed so the anchor lands on the root origin
    bird.style.left = (-ax) + "px"; bird.style.top = (-ay) + "px";
    bird.style.transformOrigin = ax + "px " + ay + "px";
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
      const m = META[name], same = cur === name;
      cur = name; if (!m.loop) pending = resolve;
      const swap = () => {
        layout(name);
        back.src = IMG + name + ".webp?r=" + Date.now();   // fresh load → the clip starts from its first frame
        back.onload = () => {
          back.classList.remove("sp-off"); front.classList.add("sp-off");
          const o = front; front = back; back = o;
          if (!m.loop) clipTimer = setTimeout(() => { if (cur === name) { front.src = IMG + name + "_end.png"; } if (pending === resolve) pending = null; resolve(true); }, dur(name) - 40);
          else resolve(true);
        };
      };
      if (same && m.loop) { resolve(true); return; }
      if (opts.squash !== false && !REDUCED) { bird.classList.remove("sp-squash"); void bird.offsetWidth; bird.classList.add("sp-squash"); setTimeout(swap, 110); }
      else swap();
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
  const hush = () => { bubble.hidden = true; bubble.innerHTML = ""; };
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
    say(`<b>${esc(t("greet"))}</b><div class="sp-opts"><button type="button" class="sp-main" data-a="page">${esc(t("page"))}</button><button type="button" data-a="how">${esc(t("how"))}</button><button type="button" data-a="none">${esc(t("none"))}</button></div>`);
    state = "menu"; busy = false; armIdle();
    if (await hi) play("idle", { squash: false });
  }
  bubble.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-a]"); if (!b || busy) return;
    const a = b.dataset.a; busy = true; armIdle();
    if (a === "page") {
      hush(); if (window.NXSAI) NXSAI.open();
      const c = play("point"); say(esc(t("pageA"))); state = "page"; busy = false; if (await c) play("idle", { squash: false }); return;
    } else if (a === "how") {
      hush(); if (window.NXSAI) { NXSAI.open(); const q = document.getElementById("aiQ"); if (q && matchMedia("(pointer: fine)").matches) q.focus(); }
      const c = play("teacher"); say(esc(t("howA"))); state = "how"; busy = false; if (await c) play("idle", { squash: false }); return;
    } else if (a === "none") {
      const c = play("point"); say(esc(t("noneA"))); state = "menu"; busy = false; if (await c) play("idle", { squash: false }); return;
    }
    busy = false;
  });
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
    if (busy) return;
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
    if (site && !langChosen) {
      await play("sleep", { squash: false }); sleepZ(true); state = "sleep";
      await new Promise((r) => { const tick = setInterval(() => { if (langChosen && !document.querySelector(".popup-overlay")) { clearInterval(tick); r(); } }, 400); });
      sleepZ(false); busy = true; await play("wake"); busy = false;
      if (!(await msgHint())) greet();
    } else {
      await play("idle", { squash: false }); state = "menu";
      if (!(await msgHint())) greet();
    }
  }
  /* ---------- officer page: greeting once per visit, or the personal message from Sparrow ---------- */
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
  async function playMessage(m) {
    busy = true; await play("pop");
    for (let i = 0; i < m.lines.length; i++) {
      const [clip, text] = m.lines[i], last = i === m.lines.length - 1;
      say(`<div>${esc(text)}</div><div class="sp-from">${esc(t("from"))}</div>` + (last ? `<div class="sp-opts"><button type="button" class="sp-main" data-m="got">${esc(t("got"))}</button></div>` : ""), { foot: false });
      await play(clip);
      if (!last) await wait(Math.max(900, 1600 + text.length * 35 - dur(clip)));
    }
    await play("idle", { squash: false });
    await new Promise((r) => { bubble.querySelector("[data-m=got]").onclick = () => { markRead(m); r(); }; });
    hush(); await play("heart"); await play("idle", { squash: false }); busy = false;
  }

  /* ---------- boot ---------- */
  async function boot() {
    try { META = await (await fetch(IMG + "meta.json")).json(); } catch (e) { return; }
    (IS_OFFICER ? ["idle", "hi", "pop", "heart"] : ["sleep", "wake", "idle", "hi", "fly", "point"]).forEach(preload);   // the rest load when first played
    document.body.append(root, bubble);
    window.addEventListener("resize", () => { if (!busy && state !== "off" && root.hidden === false) { pos = perchPoint(); place(); } placeBubble(); });
    const f = fab(); if (f) new MutationObserver(() => { if (!busy && !flying) { pos = perchPoint(); place(); } }).observe(f, { attributes: true, attributeFilter: ["style", "class"] });
    window.addEventListener("hashchange", () => setTimeout(onGuideOpened, 300));
    document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest(".ai-panel .guide-link-btn, .guide-row button")) setTimeout(onGuideOpened, 400); }, true);
    new MutationObserver(() => { if (bubble.hidden) return; const f2 = document.querySelector(".sp-foot .sp-hide"); if (f2) f2.textContent = t("hide"); if (toggleBtn) toggleBtn.title = t("show"); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    if (IS_OFFICER) startOfficer(); else start();
  }
  window.NXSSparrow = { play, flyTo, say, hush, start, off: turnOff, on: turnOn, messages: MESSAGES, active: () => ls.get(LS) !== "off" && !REDUCED };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
