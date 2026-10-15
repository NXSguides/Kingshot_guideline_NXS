/* ---- NXS AI assistant: 💬 button (bottom-left) → ask questions about the guides ----------
   Answers come from the Cloudflare Worker (it holds the Gemini key).
   Officers (officer password unlocked on this device) can also ask about roster / watch data.
   If the AI is unavailable (free quota used up), it falls back to a simple search of the guides. */
(function () {
  // ↓↓↓ Paste your Worker address here after Step 3 (e.g. "https://nxs-ai.yourname.workers.dev")
  let AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
  if (AI_URL && !/^https?:\/\//.test(AI_URL)) AI_URL = "https://" + AI_URL;   // forgive a missing https://
  const OFFICER_LS = "nxs-post-v1";   // same saved officer login as the officer pages
  // a random id for this browser, so the daily question limit is counted per device
  const DEVICE_ID = (() => {
    const K = "nxs-ai-device";
    try {
      let id = localStorage.getItem(K);
      if (!id) { id = crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now(); localStorage.setItem(K, id); }
      return id;
    } catch (e) { return ""; }
  })();

  /* chat box texts — follow the language picked on the site ({g} = a guide name) */
  const TXT = {
    en: { retry: "The AI is busy — trying again automatically ({n}/{t})…", clear: "Clear chat", officerFail: "(Officer check failed \u2014 answered as for a normal member. Unlock an officer page, then ask again.)", limit: "You've used today's {n} questions on this device. Try again tomorrow.", left: "{n} questions left today on this device.", greet: "Hi! Ask me anything about the guides.", eg: "e.g. “Which heroes for {g}?”", ph: "Ask a question…",
      guides: "These guides might help:", none: "No matching guide found.",
      officerPages: "Officer pages:", notSet: "The AI isn't set up yet.", slow: "Too many questions — please wait a minute.",
      quota: "The AI is resting (daily free limit reached). Please try again later.", site: "The AI couldn't read the site content.",
      broken: "The AI isn't working right now.", net: "Couldn't reach the AI. Check your internet." },
    zh: { retry: "AI 目前忙碌中，自動重試中（{n}/{t}）…", clear: "清除對話", officerFail: "（幹部驗證失敗，以一般成員的身分回答。請先打開幹部頁面解鎖，再問一次。）", limit: "這台裝置今天的 {n} 次提問已經用完了，明天再來吧。", left: "這台裝置今天還可以問 {n} 次。", greet: "嗨！指南裡的任何問題都可以問我。", eg: "例如：「{g}要派哪些英雄？」", ph: "輸入問題…",
      guides: "這些指南可能有幫助：", none: "找不到相關的指南。",
      officerPages: "幹部頁面：", notSet: "AI 還沒設定好。", slow: "問題太多了，請等一分鐘再問。",
      quota: "AI 正在休息（今天的免費額度用完了），請晚點再試。", site: "AI 讀不到網站內容。",
      broken: "AI 目前無法使用。", net: "連不上 AI，請檢查網路。" },
    ko: { retry: "AI가 바빠요 — 자동으로 다시 시도하는 중 ({n}/{t})…", clear: "대화 지우기", limit: "이 기기의 오늘 질문 {n}회를 모두 사용했어요. 내일 다시 시도해 주세요.", left: "이 기기에서 오늘 {n}회 더 질문할 수 있어요.", greet: "안녕하세요! 가이드에 대해 무엇이든 물어보세요.", eg: "예: “{g}에는 어떤 영웅을 써요?”", ph: "질문을 입력하세요…",
      guides: "이 가이드가 도움이 될 수 있어요:", none: "관련 가이드를 찾지 못했어요.",
      officerPages: "임원 페이지:", notSet: "AI가 아직 설정되지 않았어요.", slow: "질문이 너무 많아요. 1분만 기다려 주세요.",
      quota: "AI가 쉬는 중이에요 (오늘 무료 사용량 소진). 나중에 다시 시도해 주세요.", site: "AI가 사이트 내용을 읽지 못했어요.",
      broken: "지금은 AI를 사용할 수 없어요.", net: "AI에 연결할 수 없어요. 인터넷을 확인해 주세요." },
    de: { retry: "Die KI ist ausgelastet — neuer Versuch automatisch ({n}/{t})…", clear: "Chat löschen", limit: "Die {n} Fragen für heute auf diesem Gerät sind aufgebraucht. Morgen wieder.", left: "Heute noch {n} Fragen auf diesem Gerät.", greet: "Hi! Frag mich alles zu den Guides.", eg: "z. B. „Welche Helden für {g}?“", ph: "Frage eingeben…",
      guides: "Diese Guides könnten helfen:", none: "Kein passender Guide gefunden.",
      officerPages: "Offiziersseiten:", notSet: "Die KI ist noch nicht eingerichtet.", slow: "Zu viele Fragen — bitte eine Minute warten.",
      quota: "Die KI macht Pause (Tageslimit erreicht). Bitte später erneut versuchen.", site: "Die KI konnte die Seiteninhalte nicht lesen.",
      broken: "Die KI funktioniert gerade nicht.", net: "KI nicht erreichbar. Bitte Internet prüfen." },
    fr: { retry: "L'IA est occupée — nouvel essai automatique ({n}/{t})…", clear: "Effacer la discussion", limit: "Les {n} questions du jour sur cet appareil sont épuisées. Reviens demain.", left: "Encore {n} questions aujourd'hui sur cet appareil.", greet: "Salut ! Pose-moi tes questions sur les guides.", eg: "ex. « Quels héros pour {g} ? »", ph: "Pose ta question…",
      guides: "Ces guides peuvent aider :", none: "Aucun guide correspondant.",
      officerPages: "Pages officiers :", notSet: "L'IA n'est pas encore configurée.", slow: "Trop de questions — attends une minute.",
      quota: "L'IA se repose (limite gratuite du jour atteinte). Réessaie plus tard.", site: "L'IA n'a pas pu lire le contenu du site.",
      broken: "L'IA ne fonctionne pas pour le moment.", net: "Impossible de joindre l'IA. Vérifie ta connexion." },
    pt: { retry: "A IA está ocupada — tentando de novo automaticamente ({n}/{t})…", clear: "Limpar conversa", limit: "As {n} perguntas de hoje neste dispositivo acabaram. Volte amanhã.", left: "Restam {n} perguntas hoje neste dispositivo.", greet: "Oi! Pergunte qualquer coisa sobre os guias.", eg: "ex.: “Quais heróis para {g}?”", ph: "Digite sua pergunta…",
      guides: "Estes guias podem ajudar:", none: "Nenhum guia encontrado.",
      officerPages: "Páginas de oficiais:", notSet: "A IA ainda não foi configurada.", slow: "Perguntas demais — espere um minuto.",
      quota: "A IA está descansando (limite gratuito do dia atingido). Tente mais tarde.", site: "A IA não conseguiu ler o conteúdo do site.",
      broken: "A IA não está funcionando agora.", net: "Não foi possível conectar à IA. Verifique a internet." },
    es: { retry: "La IA está ocupada — reintentando automáticamente ({n}/{t})…", clear: "Borrar chat", limit: "Ya usaste las {n} preguntas de hoy en este dispositivo. Vuelve mañana.", left: "Te quedan {n} preguntas hoy en este dispositivo.", greet: "¡Hola! Pregúntame lo que quieras sobre las guías.", eg: "p. ej. «¿Qué héroes para {g}?»", ph: "Escribe tu pregunta…",
      guides: "Estas guías pueden ayudar:", none: "No se encontró ninguna guía.",
      officerPages: "Páginas de oficiales:", notSet: "La IA aún no está configurada.", slow: "Demasiadas preguntas: espera un minuto.",
      quota: "La IA está descansando (límite gratuito diario alcanzado). Inténtalo más tarde.", site: "La IA no pudo leer el contenido del sitio.",
      broken: "La IA no funciona en este momento.", net: "No se pudo conectar con la IA. Revisa tu conexión." },
    tr: { retry: "Yapay zekâ meşgul — otomatik olarak tekrar deneniyor ({n}/{t})…", clear: "Sohbeti temizle", limit: "Bu cihazın bugünkü {n} soru hakkı doldu. Yarın tekrar dene.", left: "Bu cihazda bugün {n} soru hakkın kaldı.", greet: "Merhaba! Rehberler hakkında her şeyi sorabilirsin.", eg: "örn. “{g} için hangi kahramanlar?”", ph: "Sorunu yaz…",
      guides: "Bu rehberler yardımcı olabilir:", none: "Uygun rehber bulunamadı.",
      officerPages: "Yönetici sayfaları:", notSet: "Yapay zekâ henüz kurulmadı.", slow: "Çok fazla soru — lütfen bir dakika bekle.",
      quota: "Yapay zekâ dinleniyor (günlük ücretsiz limit doldu). Lütfen sonra tekrar dene.", site: "Yapay zekâ site içeriğini okuyamadı.",
      broken: "Yapay zekâ şu anda çalışmıyor.", net: "Yapay zekâya ulaşılamadı. İnternetini kontrol et." },
    id: { retry: "AI sedang sibuk — mencoba lagi otomatis ({n}/{t})…", clear: "Hapus obrolan", limit: "Jatah {n} pertanyaan hari ini di perangkat ini sudah habis. Coba lagi besok.", left: "Sisa {n} pertanyaan hari ini di perangkat ini.", greet: "Hai! Tanyakan apa saja tentang panduan.", eg: "mis. “Hero apa untuk {g}?”", ph: "Tulis pertanyaan…",
      guides: "Panduan ini mungkin membantu:", none: "Tidak ada panduan yang cocok.",
      officerPages: "Halaman pengurus:", notSet: "AI belum disiapkan.", slow: "Terlalu banyak pertanyaan — tunggu sebentar.",
      quota: "AI sedang istirahat (batas gratis harian habis). Coba lagi nanti.", site: "AI tidak bisa membaca isi situs.",
      broken: "AI sedang tidak berfungsi.", net: "Tidak bisa terhubung ke AI. Periksa internet." },
    ru: { retry: "ИИ занят — автоматически пробуем снова ({n}/{t})…", clear: "Очистить чат", limit: "Лимит {n} вопросов на сегодня для этого устройства исчерпан. Попробуйте завтра.", left: "Сегодня на этом устройстве осталось вопросов: {n}.", greet: "Привет! Спрашивайте что угодно о гайдах.", eg: "напр. «Каких героев брать на {g}?»", ph: "Введите вопрос…",
      guides: "Эти гайды могут помочь:", none: "Подходящий гайд не найден.",
      officerPages: "Страницы офицеров:", notSet: "ИИ ещё не настроен.", slow: "Слишком много вопросов — подождите минуту.",
      quota: "ИИ отдыхает (дневной бесплатный лимит исчерпан). Попробуйте позже.", site: "ИИ не смог прочитать содержимое сайта.",
      broken: "ИИ сейчас не работает.", net: "Не удалось связаться с ИИ. Проверьте интернет." },
    th: { retry: "AI กำลังยุ่ง — กำลังลองใหม่อัตโนมัติ ({n}/{t})…", clear: "ล้างแชท", limit: "ใช้สิทธิ์ถาม {n} ครั้งของวันนี้บนอุปกรณ์นี้ครบแล้ว ลองใหม่พรุ่งนี้", left: "วันนี้ถามได้อีก {n} ครั้งบนอุปกรณ์นี้", greet: "สวัสดี! ถามอะไรเกี่ยวกับคู่มือก็ได้", eg: "เช่น “{g} ใช้ฮีโร่ตัวไหนดี?”", ph: "พิมพ์คำถาม…",
      guides: "คู่มือเหล่านี้อาจช่วยได้:", none: "ไม่พบคู่มือที่ตรงกัน",
      officerPages: "หน้าสำหรับเจ้าหน้าที่:", notSet: "ยังไม่ได้ตั้งค่า AI", slow: "ถามเยอะเกินไป — รอสักหนึ่งนาที",
      quota: "AI กำลังพัก (ใช้โควตาฟรีของวันนี้หมดแล้ว) ลองใหม่ภายหลัง", site: "AI อ่านเนื้อหาของเว็บไซต์ไม่ได้",
      broken: "ตอนนี้ AI ใช้งานไม่ได้", net: "เชื่อมต่อ AI ไม่ได้ ตรวจสอบอินเทอร์เน็ต" },
    ar: { retry: "الذكاء الاصطناعي مشغول — جارٍ إعادة المحاولة تلقائيًا ({n}/{t})…", clear: "مسح المحادثة", limit: "استنفدت أسئلة اليوم ({n}) على هذا الجهاز. حاول غدًا.", left: "تبقّى لك {n} أسئلة اليوم على هذا الجهاز.", greet: "مرحبًا! اسألني أي شيء عن الأدلة.", eg: "مثال: «ما الأبطال المناسبون لـ {g}؟»", ph: "اكتب سؤالك…",
      guides: "قد تفيدك هذه الأدلة:", none: "لم يُعثر على دليل مناسب.",
      officerPages: "صفحات المسؤولين:", notSet: "لم يتم إعداد الذكاء الاصطناعي بعد.", slow: "أسئلة كثيرة — انتظر دقيقة من فضلك.",
      quota: "الذكاء الاصطناعي في استراحة (انتهى الحد المجاني اليومي). حاول لاحقًا.", site: "تعذّر على الذكاء الاصطناعي قراءة محتوى الموقع.",
      broken: "الذكاء الاصطناعي لا يعمل حاليًا.", net: "تعذّر الاتصال بالذكاء الاصطناعي. تحقّق من الإنترنت." },
  };
  /* works on the main site (app.js) and on the officer pages (no app.js; maybe no content.js) */
  const HAS_GUIDES = typeof GUIDES !== "undefined";
  const ON_SITE = typeof switchGuide === "function";
  const curLang = () => {
    if (typeof currentLang !== "undefined") return currentLang;
    try { const v = localStorage.getItem("nxs-officer-lang"); if (v) return v; } catch (e) {}
    return "en";
  };
  // language for links back to the guides: the language last picked on the main site
  const guideLang = () => {
    if (typeof currentLang !== "undefined") return currentLang;
    try { const v = localStorage.getItem("ks-lang"); if (v) return v; } catch (e) {}
    return curLang();
  };
  const esc = (str) => String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pickName = (m) => (m && (m[curLang()] || m.en || Object.values(m)[0])) || "";
  const L = (k) => (TXT[curLang()] || TXT.en)[k] || TXT.en[k];

  const st = document.createElement("style");
  st.textContent = `
    .ai-fab{position:fixed;left:16px;bottom:16px;z-index:850;height:46px;padding:0 16px 0 12px;border-radius:23px;border:0;
      display:inline-flex;align-items:center;gap:7px;max-width:calc(100vw - 32px);
      background:var(--accent);color:var(--accent-ink);font-size:15px;font-weight:700;box-shadow:0 4px 14px var(--shadow);cursor:pointer}
    .ai-fab .ai-fi{font-size:20px;line-height:1}
    .ai-fab .ai-ft{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ai-fab.open .ai-ft{display:none}.ai-fab.open{padding:0 13px}
    .ai-panel{position:fixed;left:16px;bottom:78px;z-index:851;width:min(380px,calc(100vw - 32px));height:min(520px,calc(100vh - 110px));
      display:flex;flex-direction:column;background:var(--panel);color:var(--text);border:1px solid var(--rule);
      border-radius:12px;box-shadow:0 8px 28px var(--shadow);overflow:hidden}
    .ai-panel[hidden]{display:none}
    .ai-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--rule);background:var(--panel-2);cursor:pointer}
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
    .ai-feat{margin:6px 0 4px;display:flex;flex-wrap:wrap;gap:6px}
    .ai-grp{margin-top:10px;font-weight:700;font-size:13.5px}
    .ai-feat .guide-link-btn{margin:0 !important;width:auto !important;min-height:0 !important;padding:5px 10px !important;font-size:13px !important;border-radius:14px !important;gap:5px !important;display:inline-flex !important}
    .ai-feat .guide-link-btn .arrow{display:none}.ai-feat .guide-link-btn .emoji{font-size:14px}
    .ai-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
    .ai-chip{border:1px solid var(--accent);background:transparent;color:var(--text);border-radius:14px;padding:5px 10px;font:inherit;font-size:13px;cursor:pointer;text-align:start}
    .ai-form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--rule)}
    .ai-form input{flex:1;min-width:0;padding:9px 10px;font-size:16px;border:1px solid var(--rule);border-radius:8px;background:var(--panel-2);color:var(--text)}
    .ai-form button,.ai-officer button{border:0;border-radius:8px;padding:0 14px;font-weight:700;background:var(--accent);color:var(--accent-ink);cursor:pointer}
  `;
  document.head.appendChild(st);

  const fab = document.createElement("button");
  fab.className = "ai-fab"; fab.type = "button"; fab.title = "Ask NXS AI"; fab.setAttribute("aria-label", "Ask NXS AI");
  fab.innerHTML = `<span class="ai-fi">💬</span><span class="ai-ft"></span>`;
  const panel = document.createElement("div");
  panel.className = "ai-panel"; panel.hidden = true;
  panel.innerHTML = `
    <div class="ai-head"><b>NXS AI</b>
      <button type="button" id="aiClear">🗑</button>
      <button type="button" id="aiClose" aria-label="Close">×</button></div>
    <div class="ai-log" id="aiLog">
      <div class="ai-msg a" id="aiGreet" dir="auto"></div>
    </div>
    <form class="ai-form" id="aiForm"><input id="aiQ" maxlength="600" autocomplete="off" dir="auto"><button>➤</button></form>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  const $ = (id) => panel.querySelector("#" + id);


  /* welcome text + ready-made questions (no AI call until one is tapped) */
  const INTRO = {
    en: { t: "👋 Hi! I'm the NXS guide assistant. Here's what's on the site — tap a page to open it:", q: ["Which heroes should I use for Bear Hunt?", "What should I save for KvK?"], ask: "Or ask me anything — tap a question or type your own:" },
    zh: { t: "👋 嗨！我是 NXS 攻略助理。網站上目前有這些頁面，點一下就能打開：", q: ["狩獵巨熊要用哪些英雄？", "KvK 前要存什麼？"], ask: "也可以直接問我，點一個問題或自己輸入：" },
    ko: { t: "👋 안녕하세요! NXS 가이드 도우미예요. 사이트에 있는 페이지예요 — 눌러서 열어 보세요:", q: ["자이언트 베어 사냥에는 어떤 영웅을 써요?", "KvK 전에 뭘 모아둬야 해요?"], ask: "궁금한 건 바로 물어보세요 — 질문을 누르거나 직접 입력하세요:" },
    de: { t: "👋 Hi! Ich bin der NXS-Guide-Assistent. Das gibt es auf der Seite — tippe zum Öffnen:", q: ["Welche Helden für die Bärenjagd?", "Was soll ich für KvK sparen?"], ask: "Oder frag mich einfach — tippe auf eine Frage oder schreib deine eigene:" },
    fr: { t: "👋 Salut ! Je suis l'assistant des guides NXS. Voici les pages du site — touche pour ouvrir :", q: ["Quels héros pour la Chasse à l'Ours ?", "Que dois-je garder pour le KvK ?"], ask: "Ou pose-moi ta question — touche une question ou écris la tienne :" },
    pt: { t: "👋 Oi! Sou o assistente dos guias NXS. Estas são as páginas do site — toque para abrir:", q: ["Quais heróis usar na Caça ao Urso?", "O que devo guardar para o KvK?"], ask: "Ou me pergunte — toque numa pergunta ou escreva a sua:" },
    es: { t: "👋 ¡Hola! Soy el asistente de las guías NXS. Estas son las páginas del sitio — toca para abrir:", q: ["¿Qué héroes uso en la Cacería del Oso?", "¿Qué debo guardar para el KvK?"], ask: "O pregúntame — toca una pregunta o escribe la tuya:" },
    tr: { t: "👋 Merhaba! Ben NXS rehber asistanıyım. Sitedeki sayfalar bunlar — açmak için dokun:", q: ["Ayı Avı için hangi kahramanlar?", "KvK için ne biriktirmeliyim?"], ask: "Ya da bana sor — bir soruya dokun ya da kendin yaz:" },
    id: { t: "👋 Hai! Aku asisten panduan NXS. Ini halaman yang ada di situs — ketuk untuk membuka:", q: ["Hero apa untuk Bear Hunt?", "Apa yang harus disimpan untuk KvK?"], ask: "Atau tanya aku — ketuk pertanyaan atau tulis sendiri:" },
    ru: { t: "👋 Привет! Я помощник по гайдам NXS. Вот страницы сайта — нажмите, чтобы открыть:", q: ["Каких героев брать на Охоту на медведя?", "Что копить к KvK?"], ask: "Или спросите меня — нажмите на вопрос или напишите свой:" },
    th: { t: "👋 สวัสดี! ฉันคือผู้ช่วยคู่มือ NXS นี่คือหน้าที่มีในเว็บ — แตะเพื่อเปิด:", q: ["ล่าหมีใช้ฮีโร่ตัวไหนดี?", "ควรเก็บอะไรไว้สำหรับ KvK?"], ask: "หรือถามฉันได้เลย — แตะคำถาม หรือพิมพ์เอง:" },
    ar: { t: "👋 مرحبًا! أنا مساعد أدلة NXS. هذه صفحات الموقع — اضغط لفتحها:", q: ["أي الأبطال أستخدم في صيد الدببة؟", "ماذا أوفّر لـ KvK؟"], ask: "أو اسألني — اضغط على سؤال أو اكتب سؤالك:" },
  };
  /* the site's guide pages, in menu order, as tap-to-open buttons */
  const introPages = () => {
    if (!HAS_GUIDES) return "";
    const ids = typeof guideKeys === "function" ? guideKeys() : Object.keys(GUIDES).filter((k) => !GUIDES[k].hidden);
    const links = (L) => `<div class="ai-feat">${format(L.map((id) => `[${pickName(GUIDES[id].name)}](#${id})`).join("\n"))}</div>`;
    // same groups as the site's menu: home page, then Event Guides / Growth Guides
    if (typeof GUIDE_GROUPS === "undefined" || typeof guideGroupOf !== "function") return links(ids);
    const home = ids.filter((k) => !guideGroupOf(k)), out = [];
    if (home.length) out.push(links(home));
    for (const g of ["events", "growth"]) {
      const L = ids.filter((k) => guideGroupOf(k) === g); if (!L.length || !GUIDE_GROUPS[g]) continue;
      out.push(`<div class="ai-grp">${GUIDE_GROUPS[g].emoji} ${esc(pickName(GUIDE_GROUPS[g].name))}</div>${links(L)}`);
    }
    return out.join("");
  };
  const I = () => INTRO[curLang()] || INTRO.en;
  const FAB = { en: "Ask AI", zh: "問 AI", ko: "AI에게 질문", de: "KI fragen", fr: "Demander à l'IA", pt: "Pergunte à IA", es: "Pregunta a la IA",
    tr: "Yapay zekâya sor", id: "Tanya AI", ru: "Спросить ИИ", th: "ถาม AI", ar: "اسأل الذكاء الاصطناعي" };
  /* (re)write the chat box texts in the site's current language */
  function applyLang() {
    fab.querySelector(".ai-ft").textContent = FAB[curLang()] || FAB.en;
    fab.dir = document.documentElement.dir || "ltr";
    const g = HAS_GUIDES && GUIDES["bear-hunt"] ? pickName(GUIDES["bear-hunt"].name) : "Bear Hunt";
    const it = I();
    $("aiGreet").innerHTML = `${esc(it.t)}${introPages()}<span class="ai-hint">${esc(it.ask)}</span>
      <div class="ai-chips">${it.q.map((x) => `<button type="button" class="ai-chip" dir="auto">${esc(x)}</button>`).join("")}</div>`;
    $("aiGreet").querySelectorAll(".ai-chip").forEach((b) => b.onclick = () => { $("aiQ").value = b.textContent; $("aiForm").requestSubmit ? $("aiForm").requestSubmit() : $("aiForm").dispatchEvent(new Event("submit", { cancelable: true })); });
    $("aiQ").placeholder = L("ph");
    $("aiClear").title = L("clear"); $("aiClear").setAttribute("aria-label", L("clear"));
    panel.dir = document.documentElement.dir || "ltr";
    window.dispatchEvent(new Event("nxs-ai-lang"));   // timers.js re-adds its button to the greeting
  }
  // app.js sets <html lang> whenever the language changes → follow it
  new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  /* the chat stays open (and keeps its messages) when you move to another page in this tab */
  const OPEN_KEY = "nxs-ai-open";
  function setOpen(open) {
    panel.hidden = !open; fab.classList.toggle("open", !!open);   // open: just the icon, so it covers less
    try { sessionStorage.setItem(OPEN_KEY, open ? "1" : ""); } catch (e) {}
    if (open) { $("aiLog").scrollTop = $("aiLog").querySelectorAll(".ai-msg").length > 1 ? $("aiLog").scrollHeight : 0; }
  }
  // phones: don't jump into typing (the keyboard would pop up every time); a computer still gets the cursor in the box
  fab.onclick = () => { if (dragged) { dragged = false; return; } setOpen(panel.hidden); if (!panel.hidden && matchMedia("(pointer: fine)").matches) $("aiQ").focus(); };

  /* 🖐 the button can be dragged anywhere (press, then move): it snaps to the left or right edge and the spot is remembered.
     The chat panel opens on the same side, above the button (below it when the button is near the top). */
  const POS_KEY = "nxs-ai-pos";
  let pos = null; try { pos = JSON.parse(localStorage.getItem(POS_KEY)); } catch (e) {}
  let dragged = false;
  function place() {
    const vh = innerHeight, vw = innerWidth, fh = fab.offsetHeight || 46;
    const bottom = Math.min(Math.max(pos && pos.bottom != null ? pos.bottom : 16, 8), vh - fh - 8), side = pos && pos.side === "r" ? "r" : "l";
    fab.style.left = side === "l" ? "16px" : "auto"; fab.style.right = side === "r" ? "16px" : "auto"; fab.style.bottom = bottom + "px"; fab.style.top = "auto";
    panel.style.left = side === "l" ? "16px" : "auto"; panel.style.right = side === "r" ? "16px" : "auto";
    // the panel never covers the button (so it can always be closed): it takes the larger of the room above / below, shrinking if needed
    const above = vh - (bottom + fh + 12) - 8, below = bottom - 12 - 8, want = Math.min(520, vh - 110);
    const useAbove = above >= want || above >= below;
    const ph = Math.max(200, Math.min(want, useAbove ? above : below));
    panel.style.height = ph + "px";
    panel.style.bottom = (useAbove ? bottom + fh + 12 : Math.max(8, bottom - 12 - ph)) + "px"; panel.style.top = "auto";
    void vw;
  }
  fab.addEventListener("pointerdown", (e) => {
    if (e.button) return;
    const x0 = e.clientX, y0 = e.clientY, r = fab.getBoundingClientRect(); let moving = false;
    // no pointer capture: iOS keeps the capture after the tap, and every later tap on the page is swallowed by the button
    const move = (ev) => {
      const dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!moving && Math.hypot(dx, dy) < 8) return;
      if (!moving) { moving = true; fab.style.transition = "none"; }
      ev.preventDefault();
      const left = Math.min(Math.max(r.left + dx, 4), innerWidth - r.width - 4), top = Math.min(Math.max(r.top + dy, 4), innerHeight - r.height - 4);
      fab.style.left = left + "px"; fab.style.right = "auto"; fab.style.top = top + "px"; fab.style.bottom = "auto";
    };
    const up = (ev) => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      if (!moving) return;
      dragged = true; setTimeout(() => { dragged = false; }, 300);
      const b = fab.getBoundingClientRect();
      pos = { side: b.left + b.width / 2 < innerWidth / 2 ? "l" : "r", bottom: Math.round(innerHeight - b.bottom) };
      try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch (x) {}
      fab.style.transition = ""; place();
    };
    window.addEventListener("pointermove", move, { passive: false }); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  });
  fab.style.touchAction = "none";
  addEventListener("resize", place);
  place();
  // tap the top bar (not its buttons) to close the panel
  panel.querySelector(".ai-head").addEventListener("click", (e) => { if (!e.target.closest("button")) setOpen(false); });
  /* first visit on this device: open the chat once (after the language is picked and any event pop-up is closed) */
  const INTRO_KEY = "nxs-ai-intro";
  if (ON_SITE) {
    let seen = false; try { seen = !!localStorage.getItem(INTRO_KEY); } catch (e) { seen = true; }
    if (!seen) {
      const tick = setInterval(() => {
        if (typeof langChosen !== "undefined" && !langChosen) return;            // still on the language picker
        if (document.querySelector(".popup-overlay")) return;                     // event pop-up still open
        clearInterval(tick);
        try { localStorage.setItem(INTRO_KEY, "1"); } catch (e) {}
        if (panel.hidden) setTimeout(() => setOpen(true), 800);
      }, 700);
    }
  }
  $("aiClose").onclick = () => setOpen(false);
  window.NXSAI = { panel, url: AI_URL, open: () => setOpen(true) };   // used by js/timers.js

  /* ---------- officer unlock: the officer password opens data/data-key.json; the Worker checks a hash of that key ---------- */
  let officerProof = null;
  const b64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  function store() { try { return JSON.parse(localStorage.getItem(OFFICER_LS)) || {}; } catch (e) { return {}; } }
  let proofMemo = { pw: null, proof: null };
  async function proofFor(pw) {
    if (proofMemo.pw === pw && proofMemo.proof) return proofMemo.proof;   // same password → same proof (no second download)
    const proof = await proofCompute(pw);
    if (proof) proofMemo = { pw, proof };
    return proof;
  }
  async function proofCompute(pw) {
    try {
      const blob = window.OfficerData && OfficerData.dataKeyBlob ? await OfficerData.dataKeyBlob()
        : await fetch("data/data-key.json?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json());
      // same derivation as the officer pages; OfficerData remembers it so it isn't redone on every tab
      const key = window.OfficerData && OfficerData.pbkdf ? await OfficerData.pbkdf(pw, blob.salt, blob.iter, ["decrypt"]) : await (async () => {
        const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
        return crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(blob.salt), iterations: blob.iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      })();
      const raw = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.data)));
      let k64 = ""; raw.forEach((x) => (k64 += String.fromCharCode(x))); k64 = btoa(k64);
      const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("nxs-officer:" + k64));
      return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
    } catch (e) { return null; }
  }
  /* No button: the chat silently knows an officer when this browser has the saved officer login,
     or when an officer page was unlocked earlier in this tab. Everyone else just gets "no permission". */
  const PROOF_KEY = "nxs-ai-proof";
  try { officerProof = sessionStorage.getItem(PROOF_KEY) || null; } catch (e) {}
  applyLang();
  async function autoUnlock() {
    if (officerProof) return;
    const pw = window.__nxsOfficerPw || store().pw;
    if (!pw) return;
    officerProof = await proofFor(pw);
    try { if (officerProof) sessionStorage.setItem(PROOF_KEY, officerProof); } catch (e) {}
  }
  autoUnlock();
  window.addEventListener("nxs-officer", autoUnlock);

  /* ---------- chat (saved in this browser, so it survives moving between pages) ---------- */
  const LOG_KEY = "nxs-ai-log-v1", MAX_SAVED = 40;
  let LOG = { msgs: [], history: [] };
  try { LOG = Object.assign(LOG, JSON.parse(localStorage.getItem(LOG_KEY)) || {}); } catch (e) {}
  const history = LOG.history;
  function saveLog() {
    LOG.msgs = LOG.msgs.slice(-MAX_SAVED);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(LOG)); } catch (e) {}
  }
  function format(text) {
    let h = esc(text)
      .replace(/\[([^\]]+)\]\(#\/?(?:\w+\/)?([\w-]+)\)/g, (m, label, id) => {
        const emoji = HAS_GUIDES && GUIDES[id] ? GUIDES[id].emoji : "📖";
        if (HAS_GUIDES && !GUIDES[id]) return label;
        return ON_SITE
          ? `<button type="button" class="guide-link-btn" data-guide="${id}"><span class="emoji">${emoji}</span><span dir="auto">${label}</span><span class="arrow">›</span></button>`
          : `<a class="guide-link-btn" href="index.html#/${guideLang()}/${id}" style="text-decoration:none"><span class="emoji">${emoji}</span><span dir="auto">${label}</span><span class="arrow">›</span></a>`;
      })
      // officer pages
      .replace(/\[([^\]]+)\]\(((?:roster|watch|events|post|officer)-\w+\.html(?:#\w+)?)\)/g, (m, label, href) =>
        `<a class="guide-link-btn" href="${href}" style="text-decoration:none"><span class="emoji">🔒</span><span dir="auto">${label}</span><span class="arrow">›</span></a>`)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\n)[*-] (.+)/g, "$1• $2");
    return h.replace(/\n*(<(button|a) class="guide-link-btn"[\s\S]*?<\/\2>)\n*/g, "$1").replace(/\n/g, "<br>");
  }
  function paint(d, who, text, hints) {
    d.innerHTML = who === "a" ? format(text) : esc(text);
    for (const h of hints || []) d.insertAdjacentHTML("beforeend", `<br><span class="ai-hint">${esc(h)}</span>`);
  }
  // keep = save it in the chat history (the "…" placeholder is not saved until its answer arrives)
  function say(who, text, keep = true, hints) {
    const d = document.createElement("div");
    d.className = "ai-msg " + who; d.dir = "auto";
    paint(d, who, text, hints);
    $("aiLog").appendChild(d); $("aiLog").scrollTop = $("aiLog").scrollHeight;
    if (keep) { LOG.msgs.push({ w: who, t: text, h: hints || [] }); saveLog(); }
    return d;
  }
  async function readStream(r, onText) {
    const reader = r.body.getReader(), dec = new TextDecoder();
    let buf = "", text = "", meta = {}, error = null, last = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let at;
      while ((at = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, at); buf = buf.slice(at + 1);
        if (!line.trim()) continue;
        let j; try { j = JSON.parse(line); } catch (e) { continue; }
        if (j.meta) meta = j.meta;
        if (j.t) text += j.t;
        if (j.error) error = j.error;
      }
      const now = Date.now();
      if (text && now - last > 80) { last = now; onText(text); }
    }
    if (!text) return { error: error || "gemini" };
    return { answer: text, officer: meta.officer, left: meta.left };
  }
  function finish(d, text, hints) {
    paint(d, "a", text, hints);
    LOG.msgs.push({ w: "a", t: text, h: hints || [] }); saveLog();
  }
  // show the saved conversation
  for (const m of LOG.msgs) say(m.w, m.t, false, m.h);
  $("aiClear").onclick = () => {
    LOG.msgs = []; LOG.history.length = 0; saveLog();
    $("aiLog").querySelectorAll(".ai-msg:not(#aiGreet)").forEach((el) => el.remove());
  };
  try { if (sessionStorage.getItem(OPEN_KEY)) setOpen(true); } catch (e) {}
  $("aiLog").addEventListener("click", (e) => {
    // officer pages know 中文 / English / Português / العربية / 한국어: open them in the reader's language (others → English)
    const a = e.target.closest('a[href$=".html"]');
    if (a && ON_SITE && typeof currentLang !== "undefined") {
      try { localStorage.setItem("nxs-officer-lang", ["zh", "en", "pt", "ar", "ko"].includes(currentLang) ? currentLang : "en"); } catch (err) {}
      return;
    }
    const b = e.target.closest("[data-guide]");
    if (!b || !ON_SITE) return;
    switchGuide(b.dataset.guide);
    if (window.innerWidth < 700) setOpen(false);
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
    if (!HAS_GUIDES) return [];
    const s = q.toLowerCase();
    const words = s.split(/[\s,.?!，。？！、]+/).filter((w) => w.length > 1);
    const cjk = (s.match(/[぀-ヿ㐀-鿿가-힯]/g) || []).join("");
    for (let i = 0; i < cjk.length - 1; i++) words.push(cjk.slice(i, i + 2));
    return Object.keys(GUIDES).filter((id) => !GUIDES[id].hidden && id !== "recent-events").map((id) => {
      const g = GUIDES[id];
      const name = pickName(g.name).toLowerCase();
      const term = (k) => (typeof GLOSSARY !== "undefined" && GLOSSARY[k] ? pickName(GLOSSARY[k]) : k);
      const body = flat((g.sections && (g.sections[curLang()] || g.sections.en)) || {}, []).join(" ").replace(/\{(\w+)\}/g, (m, k) => term(k)).toLowerCase();
      let score = 0;
      for (const w of words) { if (name.includes(w)) score += 5; if (body.includes(w)) score += 1; }
      return [id, score];
    }).filter(([, sc]) => sc > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => id);
  }
  function fallback(q, why) {
    const ids = localSearch(q);
    const links = ids.map((id) => `[${pickName(GUIDES[id].name)}](#${id})`).join("\n");
    const officer = officerProof ? `\n${L("officerPages")}\n[Roster](roster-x7k2p9.html)\n[Watch](watch-x7k2p9.html)` : "";
    return `${why}\n${ids.length ? L("guides") + "\n" + links : L("none")}${officer}`;
  }

  /* 🐞 "/debug" in the chat box shows the last JavaScript errors on this device (home-screen apps have no console) */
  const ERRS = [];
  const noteErr = (m) => { ERRS.push(new Date().toISOString().slice(11, 19) + " " + String(m).slice(0, 300)); if (ERRS.length > 12) ERRS.shift(); };
  window.addEventListener("error", (e) => noteErr((e.message || "error") + (e.filename ? " @ " + e.filename.split("/").pop() + ":" + e.lineno : "")));
  window.addEventListener("unhandledrejection", (e) => noteErr("promise: " + (e.reason && (e.reason.stack || e.reason.message) || e.reason)));
  $("aiForm").onsubmit = async (e) => {
    e.preventDefault();
    const q = $("aiQ").value.trim();
    if (!q) return;
    if (q.toLowerCase() === "/debug") {
      $("aiQ").value = "";
      let sw = "?"; try { sw = navigator.serviceWorker && navigator.serviceWorker.controller ? "yes" : "no"; } catch (x) {}
      let ver = "?"; try { ver = ((await (await fetch("sw.js", { cache: "no-store" })).text()).match(/nxs-v\d+/) || ["?"])[0]; } catch (x) {}
      let have = "?"; try { have = (((await caches.keys()).filter((k) => /^nxs-v/.test(k))).join(",")) || "-"; } catch (x) {}
      say("a", ["🐞 site: " + ver + " · this phone: " + have, navigator.userAgent.slice(0, 120), "standalone: " + (matchMedia("(display-mode: standalone)").matches || navigator.standalone === true), "service worker: " + sw, "size: " + innerWidth + "×" + innerHeight,
        "ai-pos: " + (localStorage.getItem("nxs-ai-pos") || "-"), ...(ERRS.length ? ["errors:", ...ERRS] : ["no JavaScript errors so far"])].join("\n"), false);
      return;
    }
    $("aiQ").value = "";
    say("u", q);
    const wait = say("a", "…", false);
    await autoUnlock();
    if (!AI_URL) { finish(wait, fallback(q, L("notSet"))); return; }
    // busy / free quota full / network blip → wait a little and try again by itself
    const RETRY_WAIT = [6000, 15000];          // seconds before the 2nd and 3rd try
    const retryable = (err) => ["quota", "gemini", "worker"].includes(err);
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    let r = null, data = {}, netErr = null;
    for (let attempt = 0; attempt <= RETRY_WAIT.length; attempt++) {
      if (attempt > 0) {
        paint(wait, "a", L("retry").replace("{n}", attempt).replace("{t}", RETRY_WAIT.length));
        await sleep(RETRY_WAIT[attempt - 1]);
      }
      netErr = null;
      try {
        // text/plain = a "simple" request: no extra CORS pre-check, which Safari is strict about
        const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
        const timer = ctrl && setTimeout(() => ctrl.abort(), 55000);
        r = await fetch(AI_URL, {
          method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify({ question: q, lang: curLang(), history, officerProof, deviceId: DEVICE_ID, stream: 1 }),
          signal: ctrl ? ctrl.signal : undefined,
        });
        if (timer) clearTimeout(timer);
        if (r.ok && /x-ndjson/.test(r.headers.get("content-type") || "") && r.body) {
          // the answer arrives piece by piece (one JSON object per line): show it as it is written
          data = await readStream(r, (partial) => paint(wait, "a", partial + " ▍"));
        } else data = await r.json().catch(() => ({}));
        if (r.ok && data.answer) break;
        if (!retryable(data.error)) break;     // daily limit, too fast, … → no point retrying
      } catch (err) {
        netErr = err;
        if (err && err.name === "AbortError") break;   // already waited 55 s
      }
    }

    if (netErr) {
      // show the browser's own error too, so problems can be traced (e.g. Safari: "Load failed")
      const why = netErr.name === "AbortError" ? L("slow") : L("net");
      finish(wait, fallback(q, why), [`(${netErr.name + ": " + netErr.message})`]);
    } else if (r && r.ok && data.answer) {
      const hints = [];
      if (officerProof && data.officer === false) hints.push(L("officerFail"));
      if (typeof data.left === "number" && data.left <= 3) hints.push(L("left").replace("{n}", data.left));
      history.push({ role: "user", text: q }, { role: "model", text: data.answer });
      if (history.length > 6) history.splice(0, history.length - 6);
      finish(wait, data.answer, hints);
    } else {
      const why = data.error === "daily_limit" ? L("limit").replace("{n}", data.limit || "")
        : L({ slow_down: "slow", quota: "quota", site_unreachable: "site" }[data.error] || "broken");
      finish(wait, fallback(q, why));
      if (data.detail) console.warn("NXS AI:", data.detail);   // details for whoever set it up
    }
    $("aiLog").scrollTop = $("aiLog").scrollHeight;
  };
})();
