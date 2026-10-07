/* ---- NXS AI assistant: 💬 button (bottom-left) → ask questions about the guides ----------
   Answers come from the Cloudflare Worker (it holds the Gemini key).
   Officers (officer password unlocked on this device) can also ask about roster / watch data.
   If the AI is unavailable (free quota used up), it falls back to a simple search of the guides. */
(function () {
  // ↓↓↓ Paste your Worker address here after Step 3 (e.g. "https://nxs-ai.yourname.workers.dev")
  let AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
  if (AI_URL && !/^https?:\/\//.test(AI_URL)) AI_URL = "https://" + AI_URL;   // forgive a missing https://
  const OFFICER_LS = "nxs-post-v1";   // same saved officer login as the officer pages

  /* chat box texts — follow the language picked on the site ({g} = a guide name) */
  const TXT = {
    en: { greet: "Hi! Ask me anything about the guides.", eg: "e.g. “Which heroes for {g}?”", ph: "Ask a question…",
      pw: "Officer password", keep: "Remember on this device", wrong: "Wrong password.", checking: "Checking…",
      on: "Officer mode on — you can also ask about the roster and member tracking.", off: "Officer mode off.",
      lockOn: "Officer mode on", lockOff: "Officer access", guides: "These guides might help:", none: "No matching guide found.",
      officerPages: "Officer pages:", notSet: "The AI isn't set up yet.", slow: "Too many questions — please wait a minute.",
      quota: "The AI is resting (daily free limit reached). Please try again later.", site: "The AI couldn't read the site content.",
      broken: "The AI isn't working right now.", net: "Couldn't reach the AI. Check your internet." },
    zh: { greet: "嗨！指南裡的任何問題都可以問我。", eg: "例如：「{g}要派哪些英雄？」", ph: "輸入問題…",
      pw: "幹部密碼", keep: "在這台裝置上記住", wrong: "密碼錯誤。", checking: "確認中…",
      on: "已開啟幹部模式 — 也可以問名冊和成員追蹤的問題。", off: "已關閉幹部模式。",
      lockOn: "幹部模式已開啟", lockOff: "幹部登入", guides: "這些指南可能有幫助：", none: "找不到相關的指南。",
      officerPages: "幹部頁面：", notSet: "AI 還沒設定好。", slow: "問題太多了，請等一分鐘再問。",
      quota: "AI 正在休息（今天的免費額度用完了），請晚點再試。", site: "AI 讀不到網站內容。",
      broken: "AI 目前無法使用。", net: "連不上 AI，請檢查網路。" },
    ko: { greet: "안녕하세요! 가이드에 대해 무엇이든 물어보세요.", eg: "예: “{g}에는 어떤 영웅을 써요?”", ph: "질문을 입력하세요…",
      pw: "임원 비밀번호", keep: "이 기기에서 기억하기", wrong: "비밀번호가 틀렸어요.", checking: "확인 중…",
      on: "임원 모드 켜짐 — 명단과 멤버 추적에 대해서도 물어볼 수 있어요.", off: "임원 모드 꺼짐.",
      lockOn: "임원 모드 켜짐", lockOff: "임원 로그인", guides: "이 가이드가 도움이 될 수 있어요:", none: "관련 가이드를 찾지 못했어요.",
      officerPages: "임원 페이지:", notSet: "AI가 아직 설정되지 않았어요.", slow: "질문이 너무 많아요. 1분만 기다려 주세요.",
      quota: "AI가 쉬는 중이에요 (오늘 무료 사용량 소진). 나중에 다시 시도해 주세요.", site: "AI가 사이트 내용을 읽지 못했어요.",
      broken: "지금은 AI를 사용할 수 없어요.", net: "AI에 연결할 수 없어요. 인터넷을 확인해 주세요." },
    de: { greet: "Hi! Frag mich alles zu den Guides.", eg: "z. B. „Welche Helden für {g}?“", ph: "Frage eingeben…",
      pw: "Offizierspasswort", keep: "Auf diesem Gerät merken", wrong: "Falsches Passwort.", checking: "Wird geprüft…",
      on: "Offiziersmodus an — du kannst auch nach Mitgliederliste und Mitglieder-Tracking fragen.", off: "Offiziersmodus aus.",
      lockOn: "Offiziersmodus an", lockOff: "Offizierszugang", guides: "Diese Guides könnten helfen:", none: "Kein passender Guide gefunden.",
      officerPages: "Offiziersseiten:", notSet: "Die KI ist noch nicht eingerichtet.", slow: "Zu viele Fragen — bitte eine Minute warten.",
      quota: "Die KI macht Pause (Tageslimit erreicht). Bitte später erneut versuchen.", site: "Die KI konnte die Seiteninhalte nicht lesen.",
      broken: "Die KI funktioniert gerade nicht.", net: "KI nicht erreichbar. Bitte Internet prüfen." },
    fr: { greet: "Salut ! Pose-moi tes questions sur les guides.", eg: "ex. « Quels héros pour {g} ? »", ph: "Pose ta question…",
      pw: "Mot de passe officier", keep: "Se souvenir sur cet appareil", wrong: "Mot de passe incorrect.", checking: "Vérification…",
      on: "Mode officier activé — tu peux aussi poser des questions sur la liste et le suivi des membres.", off: "Mode officier désactivé.",
      lockOn: "Mode officier activé", lockOff: "Accès officier", guides: "Ces guides peuvent aider :", none: "Aucun guide correspondant.",
      officerPages: "Pages officiers :", notSet: "L'IA n'est pas encore configurée.", slow: "Trop de questions — attends une minute.",
      quota: "L'IA se repose (limite gratuite du jour atteinte). Réessaie plus tard.", site: "L'IA n'a pas pu lire le contenu du site.",
      broken: "L'IA ne fonctionne pas pour le moment.", net: "Impossible de joindre l'IA. Vérifie ta connexion." },
    pt: { greet: "Oi! Pergunte qualquer coisa sobre os guias.", eg: "ex.: “Quais heróis para {g}?”", ph: "Digite sua pergunta…",
      pw: "Senha de oficial", keep: "Lembrar neste dispositivo", wrong: "Senha incorreta.", checking: "Verificando…",
      on: "Modo oficial ativado — você também pode perguntar sobre a lista e o acompanhamento de membros.", off: "Modo oficial desativado.",
      lockOn: "Modo oficial ativado", lockOff: "Acesso de oficial", guides: "Estes guias podem ajudar:", none: "Nenhum guia encontrado.",
      officerPages: "Páginas de oficiais:", notSet: "A IA ainda não foi configurada.", slow: "Perguntas demais — espere um minuto.",
      quota: "A IA está descansando (limite gratuito do dia atingido). Tente mais tarde.", site: "A IA não conseguiu ler o conteúdo do site.",
      broken: "A IA não está funcionando agora.", net: "Não foi possível conectar à IA. Verifique a internet." },
    es: { greet: "¡Hola! Pregúntame lo que quieras sobre las guías.", eg: "p. ej. «¿Qué héroes para {g}?»", ph: "Escribe tu pregunta…",
      pw: "Contraseña de oficial", keep: "Recordar en este dispositivo", wrong: "Contraseña incorrecta.", checking: "Comprobando…",
      on: "Modo oficial activado: también puedes preguntar por la lista y el seguimiento de miembros.", off: "Modo oficial desactivado.",
      lockOn: "Modo oficial activado", lockOff: "Acceso de oficial", guides: "Estas guías pueden ayudar:", none: "No se encontró ninguna guía.",
      officerPages: "Páginas de oficiales:", notSet: "La IA aún no está configurada.", slow: "Demasiadas preguntas: espera un minuto.",
      quota: "La IA está descansando (límite gratuito diario alcanzado). Inténtalo más tarde.", site: "La IA no pudo leer el contenido del sitio.",
      broken: "La IA no funciona en este momento.", net: "No se pudo conectar con la IA. Revisa tu conexión." },
    tr: { greet: "Merhaba! Rehberler hakkında her şeyi sorabilirsin.", eg: "örn. “{g} için hangi kahramanlar?”", ph: "Sorunu yaz…",
      pw: "Yönetici şifresi", keep: "Bu cihazda hatırla", wrong: "Yanlış şifre.", checking: "Kontrol ediliyor…",
      on: "Yönetici modu açık — üye listesi ve üye takibi hakkında da sorabilirsin.", off: "Yönetici modu kapalı.",
      lockOn: "Yönetici modu açık", lockOff: "Yönetici girişi", guides: "Bu rehberler yardımcı olabilir:", none: "Uygun rehber bulunamadı.",
      officerPages: "Yönetici sayfaları:", notSet: "Yapay zekâ henüz kurulmadı.", slow: "Çok fazla soru — lütfen bir dakika bekle.",
      quota: "Yapay zekâ dinleniyor (günlük ücretsiz limit doldu). Lütfen sonra tekrar dene.", site: "Yapay zekâ site içeriğini okuyamadı.",
      broken: "Yapay zekâ şu anda çalışmıyor.", net: "Yapay zekâya ulaşılamadı. İnternetini kontrol et." },
    id: { greet: "Hai! Tanyakan apa saja tentang panduan.", eg: "mis. “Hero apa untuk {g}?”", ph: "Tulis pertanyaan…",
      pw: "Kata sandi pengurus", keep: "Ingat di perangkat ini", wrong: "Kata sandi salah.", checking: "Memeriksa…",
      on: "Mode pengurus aktif — kamu juga bisa bertanya tentang daftar dan pemantauan anggota.", off: "Mode pengurus nonaktif.",
      lockOn: "Mode pengurus aktif", lockOff: "Akses pengurus", guides: "Panduan ini mungkin membantu:", none: "Tidak ada panduan yang cocok.",
      officerPages: "Halaman pengurus:", notSet: "AI belum disiapkan.", slow: "Terlalu banyak pertanyaan — tunggu sebentar.",
      quota: "AI sedang istirahat (batas gratis harian habis). Coba lagi nanti.", site: "AI tidak bisa membaca isi situs.",
      broken: "AI sedang tidak berfungsi.", net: "Tidak bisa terhubung ke AI. Periksa internet." },
    ru: { greet: "Привет! Спрашивайте что угодно о гайдах.", eg: "напр. «Каких героев брать на {g}?»", ph: "Введите вопрос…",
      pw: "Пароль офицера", keep: "Запомнить на этом устройстве", wrong: "Неверный пароль.", checking: "Проверка…",
      on: "Режим офицера включён — можно спрашивать и о составе, и об отслеживании участников.", off: "Режим офицера выключен.",
      lockOn: "Режим офицера включён", lockOff: "Вход для офицеров", guides: "Эти гайды могут помочь:", none: "Подходящий гайд не найден.",
      officerPages: "Страницы офицеров:", notSet: "ИИ ещё не настроен.", slow: "Слишком много вопросов — подождите минуту.",
      quota: "ИИ отдыхает (дневной бесплатный лимит исчерпан). Попробуйте позже.", site: "ИИ не смог прочитать содержимое сайта.",
      broken: "ИИ сейчас не работает.", net: "Не удалось связаться с ИИ. Проверьте интернет." },
    th: { greet: "สวัสดี! ถามอะไรเกี่ยวกับคู่มือก็ได้", eg: "เช่น “{g} ใช้ฮีโร่ตัวไหนดี?”", ph: "พิมพ์คำถาม…",
      pw: "รหัสผ่านเจ้าหน้าที่", keep: "จดจำในอุปกรณ์นี้", wrong: "รหัสผ่านไม่ถูกต้อง", checking: "กำลังตรวจสอบ…",
      on: "เปิดโหมดเจ้าหน้าที่แล้ว — ถามเรื่องรายชื่อและการติดตามสมาชิกได้ด้วย", off: "ปิดโหมดเจ้าหน้าที่แล้ว",
      lockOn: "เปิดโหมดเจ้าหน้าที่", lockOff: "เข้าสู่ระบบเจ้าหน้าที่", guides: "คู่มือเหล่านี้อาจช่วยได้:", none: "ไม่พบคู่มือที่ตรงกัน",
      officerPages: "หน้าสำหรับเจ้าหน้าที่:", notSet: "ยังไม่ได้ตั้งค่า AI", slow: "ถามเยอะเกินไป — รอสักหนึ่งนาที",
      quota: "AI กำลังพัก (ใช้โควตาฟรีของวันนี้หมดแล้ว) ลองใหม่ภายหลัง", site: "AI อ่านเนื้อหาของเว็บไซต์ไม่ได้",
      broken: "ตอนนี้ AI ใช้งานไม่ได้", net: "เชื่อมต่อ AI ไม่ได้ ตรวจสอบอินเทอร์เน็ต" },
    ar: { greet: "مرحبًا! اسألني أي شيء عن الأدلة.", eg: "مثال: «ما الأبطال المناسبون لـ {g}؟»", ph: "اكتب سؤالك…",
      pw: "كلمة مرور المسؤول", keep: "تذكّر على هذا الجهاز", wrong: "كلمة المرور غير صحيحة.", checking: "جارٍ التحقق…",
      on: "تم تفعيل وضع المسؤول — يمكنك أيضًا السؤال عن قائمة الأعضاء وتتبّعهم.", off: "تم إيقاف وضع المسؤول.",
      lockOn: "وضع المسؤول مفعّل", lockOff: "دخول المسؤولين", guides: "قد تفيدك هذه الأدلة:", none: "لم يُعثر على دليل مناسب.",
      officerPages: "صفحات المسؤولين:", notSet: "لم يتم إعداد الذكاء الاصطناعي بعد.", slow: "أسئلة كثيرة — انتظر دقيقة من فضلك.",
      quota: "الذكاء الاصطناعي في استراحة (انتهى الحد المجاني اليومي). حاول لاحقًا.", site: "تعذّر على الذكاء الاصطناعي قراءة محتوى الموقع.",
      broken: "الذكاء الاصطناعي لا يعمل حاليًا.", net: "تعذّر الاتصال بالذكاء الاصطناعي. تحقّق من الإنترنت." },
  };
  const L = (k) => (TXT[currentLang] || TXT.en)[k] || TXT.en[k];

  const st = document.createElement("style");
  st.textContent = `
    .ai-fab{position:fixed;left:16px;bottom:16px;z-index:850;width:52px;height:52px;border-radius:50%;border:0;
      background:var(--accent);color:var(--accent-ink);font-size:24px;box-shadow:0 4px 14px var(--shadow);cursor:pointer}
    .ai-panel{position:fixed;left:16px;bottom:78px;z-index:851;width:min(380px,calc(100vw - 32px));height:min(520px,calc(100vh - 110px));
      display:flex;flex-direction:column;background:var(--panel);color:var(--text);border:1px solid var(--rule);
      border-radius:12px;box-shadow:0 8px 28px var(--shadow);overflow:hidden}
    .ai-panel[hidden]{display:none}
    .ai-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--rule);background:var(--panel-2)}
    .ai-head b{flex:1;font-family:"Oswald","Noto Sans TC",sans-serif;letter-spacing:.02em}
    .ai-head button{border:0;background:transparent;color:var(--text);font-size:18px;cursor:pointer;padding:2px 6px}
    .ai-officer{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-bottom:1px solid var(--rule);font-size:13px}
    .ai-officer[hidden]{display:none}
    .ai-officer input[type=password]{flex:1;min-width:0;padding:6px 8px;font-size:16px;border:1px solid var(--rule);border-radius:6px;background:var(--panel-2);color:var(--text)}
    .ai-log{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;font-size:14.5px;line-height:1.55}
    .ai-msg{max-width:88%;padding:8px 11px;border-radius:10px;overflow-wrap:anywhere}
    .ai-msg.u{align-self:flex-end;background:var(--accent);color:var(--accent-ink)}
    .ai-msg.a{align-self:flex-start;background:var(--panel-2)}
    .ai-msg.a ul{margin:4px 0;padding-inline-start:1.2em}
    .ai-msg .guide-link-btn{margin:4px 0}
    .ai-hint{color:var(--text-muted);font-size:13px}
    .ai-form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--rule)}
    .ai-form input{flex:1;min-width:0;padding:9px 10px;font-size:16px;border:1px solid var(--rule);border-radius:8px;background:var(--panel-2);color:var(--text)}
    .ai-form button,.ai-officer button{border:0;border-radius:8px;padding:0 14px;font-weight:700;background:var(--accent);color:var(--accent-ink);cursor:pointer}
  `;
  document.head.appendChild(st);

  const fab = document.createElement("button");
  fab.className = "ai-fab"; fab.type = "button"; fab.title = "Ask NXS AI"; fab.setAttribute("aria-label", "Ask NXS AI");
  fab.textContent = "💬";
  const panel = document.createElement("div");
  panel.className = "ai-panel"; panel.hidden = true;
  panel.innerHTML = `
    <div class="ai-head"><b>NXS AI</b>
      <button type="button" id="aiLock">🔒</button>
      <button type="button" id="aiClose" aria-label="Close">×</button></div>
    <div class="ai-officer" id="aiOfficer" hidden>
      <input type="password" id="aiPw" autocomplete="current-password">
      <button type="button" id="aiPwGo">OK</button>
      <label style="width:100%"><input type="checkbox" id="aiPwKeep"> <span id="aiKeepTxt"></span></label>
      <span class="ai-hint" id="aiPwMsg"></span>
    </div>
    <div class="ai-log" id="aiLog">
      <div class="ai-msg a" id="aiGreet" dir="auto"></div>
    </div>
    <form class="ai-form" id="aiForm"><input id="aiQ" maxlength="600" autocomplete="off" dir="auto"><button>➤</button></form>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  const $ = (id) => panel.querySelector("#" + id);

  /* (re)write the chat box texts in the site's current language */
  function applyLang() {
    const g = GUIDES["bear-hunt"] ? t(GUIDES["bear-hunt"].name) : "Bear Hunt";
    $("aiGreet").innerHTML = `${escapeHtml(L("greet"))}<br><span class="ai-hint">${escapeHtml(L("eg").replace("{g}", g))}</span>`;
    $("aiQ").placeholder = L("ph");
    $("aiPw").placeholder = L("pw");
    $("aiKeepTxt").textContent = L("keep");
    panel.dir = document.documentElement.dir || "ltr";
    setLock();
  }
  // app.js sets <html lang> whenever the language changes → follow it
  new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  fab.onclick = () => { panel.hidden = !panel.hidden; if (!panel.hidden) $("aiQ").focus(); };
  $("aiClose").onclick = () => { panel.hidden = true; };

  /* ---------- officer unlock (same password + key file as the officer pages) ---------- */
  let officerToken = null;
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  function store() { try { return JSON.parse(localStorage.getItem(OFFICER_LS)) || {}; } catch (e) { return {}; } }
  async function decrypt(pw) {
    try {
      const blob = await fetch("data/post-key.json?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json());
      const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
      const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(blob.salt), iterations: blob.iter, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.data)));
    } catch (e) { return null; }
  }
  function setLock() { $("aiLock").textContent = officerToken ? "🔓" : "🔒"; $("aiLock").title = L(officerToken ? "lockOn" : "lockOff"); }
  applyLang();
  (async () => { const pw = store().pw; if (pw) { officerToken = await decrypt(pw); setLock(); } })();

  $("aiLock").onclick = () => {
    if (officerToken) { officerToken = null; setLock(); say("a", L("off")); return; }
    $("aiOfficer").hidden = !$("aiOfficer").hidden;
    if (!$("aiOfficer").hidden) $("aiPw").focus();
  };
  async function unlock() {
    const pw = $("aiPw").value;
    $("aiPwMsg").textContent = L("checking");
    officerToken = await decrypt(pw);
    if (!officerToken) { $("aiPwMsg").textContent = L("wrong"); return; }
    if ($("aiPwKeep").checked) { const s = store(); s.pw = pw; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {} }
    $("aiPw").value = ""; $("aiPwMsg").textContent = ""; $("aiOfficer").hidden = true;
    setLock(); say("a", L("on"));
  }
  $("aiPwGo").onclick = unlock;
  $("aiPw").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); unlock(); } };

  /* ---------- chat ---------- */
  const history = [];
  function format(text) {
    let h = escapeHtml(text)
      .replace(/\[([^\]]+)\]\(#\/?(?:\w+\/)?([\w-]+)\)/g, (m, label, id) => GUIDES[id]
        ? `<button type="button" class="guide-link-btn" data-guide="${id}"><span class="emoji">${GUIDES[id].emoji}</span><span dir="auto">${label}</span><span class="arrow">›</span></button>`
        : label)
      // officer pages (only linked for officers; the pages still ask for the officer password)
      .replace(/\[([^\]]+)\]\(((?:roster|watch|events|post)-\w+\.html)\)/g, (m, label, href) =>
        `<a class="guide-link-btn" href="${href}" style="text-decoration:none"><span class="emoji">🔒</span><span dir="auto">${label}</span><span class="arrow">›</span></a>`)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\n)[*-] (.+)/g, "$1• $2");
    return h.replace(/\n*(<button[\s\S]*?<\/button>)\n*/g, "$1").replace(/\n/g, "<br>");
  }
  function say(who, text, raw) {
    const d = document.createElement("div");
    d.className = "ai-msg " + who; d.dir = "auto";
    d.innerHTML = raw ? text : who === "a" ? format(text) : escapeHtml(text);
    $("aiLog").appendChild(d); $("aiLog").scrollTop = $("aiLog").scrollHeight;
    return d;
  }
  $("aiLog").addEventListener("click", (e) => {
    const b = e.target.closest("[data-guide]");
    if (!b) return;
    switchGuide(b.dataset.guide);
    if (window.innerWidth < 700) panel.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* fallback: plain search of guide titles + text in the current language */
  function flat(v, out) {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach((x) => flat(x, out));
    else if (v && typeof v === "object") for (const k in v) if (!["type", "src", "url", "guide", "color"].includes(k)) flat(v[k], out);
    return out;
  }
  function localSearch(q) {
    const s = q.toLowerCase();
    const words = s.split(/[\s,.?!，。？！、]+/).filter((w) => w.length > 1);
    const cjk = (s.match(/[぀-ヿ㐀-鿿가-힯]/g) || []).join("");
    for (let i = 0; i < cjk.length - 1; i++) words.push(cjk.slice(i, i + 2));
    return Object.keys(GUIDES).filter((id) => !GUIDES[id].hidden && id !== "recent-events").map((id) => {
      const g = GUIDES[id];
      const name = t(g.name).toLowerCase();
      const body = flat(g.sections[currentLang] || g.sections.en, []).join(" ").replace(/\{(\w+)\}/g, (m, k) => term(k)).toLowerCase();
      let score = 0;
      for (const w of words) { if (name.includes(w)) score += 5; if (body.includes(w)) score += 1; }
      return [id, score];
    }).filter(([, sc]) => sc > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => id);
  }
  function fallback(q, why) {
    const ids = localSearch(q);
    const links = ids.map((id) => `[${t(GUIDES[id].name)}](#${id})`).join("\n");
    const officer = officerToken ? `\n${L("officerPages")}\n[Roster](roster-x7k2p9.html)\n[Watch](watch-x7k2p9.html)` : "";
    return `${why}\n${ids.length ? L("guides") + "\n" + links : L("none")}${officer}`;
  }

  $("aiForm").onsubmit = async (e) => {
    e.preventDefault();
    const q = $("aiQ").value.trim();
    if (!q) return;
    $("aiQ").value = "";
    say("u", q);
    const wait = say("a", "…");
    if (!AI_URL) { wait.innerHTML = format(fallback(q, L("notSet"))); return; }
    try {
      const r = await fetch(AI_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang: currentLang, history, officerToken })
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.answer) {
        wait.innerHTML = format(data.answer);
        history.push({ role: "user", text: q }, { role: "model", text: data.answer });
        if (history.length > 6) history.splice(0, history.length - 6);
      } else {
        const why = L({ slow_down: "slow", quota: "quota", site_unreachable: "site" }[data.error] || "broken");
        wait.innerHTML = format(fallback(q, why));
        if (data.detail) console.warn("NXS AI:", data.detail);   // details for whoever set it up
      }
    } catch (err) {
      wait.innerHTML = format(fallback(q, L("net")));
    }
    $("aiLog").scrollTop = $("aiLog").scrollHeight;
  };
})();
