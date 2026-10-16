/* NXS officer page — board tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.board) */
/* ============ 💬 Board — topics and replies for planning together (officers logged in with Discord only).
   Every message is translated into 中文 / English / Português by the Worker (with the game's own terms); the original is
   always one tap away. 📌 marks the message that is the decision of a topic. Data lives in the Worker, not on GitHub. ============ */
(function () {
const ROOT = document.getElementById("pg-board");
const $ = (id) => document.getElementById(id);
const BD = { ko: {"viewOnly": "👁️ 보기 전용: 게시판을 읽을 수만 있고 글이나 답글은 쓸 수 없어요. 나를 @하거나 나에게 맡긴 글은 노란색으로 표시되고, 내 할 일은 맨 위에 나와요.", "forMeTask": "나에게 맡김", "forMeAt": "나를 언급", "pwOnly": "간부 비밀번호로 들어와서 모든 글을 볼 수 있어요. 글을 쓰려면 먼저 Discord로 로그인해 주세요 — 그래야 누가 쓴 글인지 알 수 있어요.", "oneGo": "💡 메시지를 하나 보낼 때마다 서버 요청이 한 번 쓰여요(5개 언어로 번역도 돼요). 할 말이 많으면 여러 번 나눠 보내지 말고 다 쓴 뒤 한 번에 보내 주세요.", "title": "💬 게시판", "sub": "함께 계획을 세우는 곳입니다. 모든 글은 게임 공식 용어로 中文, English, Português, العربية, 한국어로 번역됩니다. 모든 간부가 볼 수 있고, 글쓰기는 Discord 로그인이 필요해요.", "login": "게시판은 Discord 로그인이 필요합니다 (누가 무엇을 썼는지 알 수 있도록).", "loginBtn": "🔑 Discord로 로그인", "newBtn": "+ 새 주제", "newTitle": "주제 (예: 어느 유적에 신청할지)", "newText": "의견을 적어 주세요…", "post": "게시", "cancel": "취소", "reply": "답글", "replyPh": "답글…", "back": "← 전체 주제", "empty": "아직 주제가 없습니다. “+ 새 주제”를 눌러 시작하세요.", "replies": "메시지 {n}개", "by": "{name} 님이 시작", "last": "최근 업데이트 {t}", "decided": "📌 결정됨", "decision": "📌 결정", "decBy": "{name} 님이 결정 · {t}", "setDec": "📌 결정으로 지정", "clearDec": "결정 해제", "orig": "원문 보기", "hideOrig": "원문 숨기기", "origLang": "원문 ({l})", "edit": "✏️ 수정", "del": "🗑️ 삭제", "save": "저장", "edited": "(수정됨)", "delAsk": "한 번 더 누르면 삭제됩니다", "delTopic": "첫 메시지를 삭제하면 주제 전체가 삭제됩니다 — 한 번 더 누르세요", "sending": "게시하고 번역하는 중…", "saving": "저장 중…", "noTr": "⚠️ 이 글은 번역되지 않아 원문을 표시합니다 (수정 후 저장하면 다시 번역됩니다).", "err": "문제가 발생했습니다: {e}", "dbLimit": "⚠️ 서버의 무료 일일 한도를 다 썼습니다. UTC 00:00에 초기화됩니다.", "dbErr": "⚠️ 지금은 서버를 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.", "gone": "이 주제는 삭제되었습니다.", "needBoth": "주제와 메시지를 모두 작성하세요.", "loading": "불러오는 중…", "assign": "📋 담당자 지정", "taskTo": "📋 담당:", "done": "✅ 완료", "undone": "↩︎ 미완료로", "doneBy": "{name} 님 완료", "myTasks": "📋 내 할 일 ({n})", "noUsers": "아직 게시판을 사용한 다른 간부가 없습니다.", "inTopic": "“{t}”에서"},
 ar: {"viewOnly": "👁️ للعرض فقط: يمكنك قراءة اللوحة دون النشر أو الرد. الرسائل التي تذكرك (@) أو تكلّفك بمهمة مميّزة باللون الأصفر، ومهامك تظهر في الأعلى.", "forMeTask": "مُسندة إليك", "forMeAt": "تذكرك", "pwOnly": "دخلت بكلمة مرور الضباط، لذا يمكنك قراءة كل شيء. للكتابة سجّل الدخول عبر Discord أولًا — حتى يعرف الجميع من قال ماذا.", "oneGo": "💡 كل رسالة ترسلها تستهلك طلبًا واحدًا من الخادم (وتُترجم إلى 5 لغات). إن كان لديك الكثير لتقوله فاكتبه كله وأرسله مرة واحدة بدل عدة أجزاء.", "title": "💬 لوحة النقاش", "sub": "للتخطيط معًا. تُترجم كل رسالة إلى 中文 وEnglish وPortuguês و한국어 والعربية بمصطلحات اللعبة نفسها. يمكن لكل الضباط القراءة؛ والكتابة تحتاج تسجيل الدخول عبر Discord.", "login": "لوحة النقاش تحتاج تسجيل الدخول عبر Discord (ليعرف الجميع من كتب ماذا).", "loginBtn": "🔑 الدخول عبر Discord", "newBtn": "+ موضوع جديد", "newTitle": "الموضوع (مثلًا: أي مأوى نسجل فيه)", "newText": "اكتب أفكارك…", "post": "نشر", "cancel": "إلغاء", "reply": "رد", "replyPh": "اكتب ردًا…", "back": "← كل المواضيع", "empty": "لا توجد مواضيع بعد. اضغط “+ موضوع جديد” للبدء.", "replies": "{n} رسالة", "by": "بدأه {name}", "last": "آخر تحديث {t}", "decided": "📌 تقرر", "decision": "📌 القرار", "decBy": "قرره {name} · {t}", "setDec": "📌 اعتماده كقرار", "clearDec": "إلغاء القرار", "orig": "عرض الأصل", "hideOrig": "إخفاء الأصل", "origLang": "الأصل ({l})", "edit": "✏️ تعديل", "del": "🗑️ حذف", "save": "حفظ", "edited": "(معدّل)", "delAsk": "اضغط مرة أخرى للحذف", "delTopic": "حذف الرسالة الأولى يحذف الموضوع بأكمله — اضغط مرة أخرى", "sending": "جارٍ النشر والترجمة…", "saving": "جارٍ الحفظ…", "noTr": "⚠️ لم تُترجم هذه الرسالة، لذا يظهر الأصل (التعديل والحفظ يعيدان ترجمتها).", "err": "حدث خطأ: {e}", "dbLimit": "⚠️ نفدت الحصة اليومية المجانية للخادم. تُعاد عند 00:00 UTC.", "dbErr": "⚠️ الخادم غير متاح الآن. حاول مرة أخرى لاحقًا.", "gone": "تم حذف هذا الموضوع.", "needBoth": "اكتب موضوعًا ورسالة.", "loading": "جارٍ التحميل…", "assign": "📋 إسناد إلى", "taskTo": "📋 مهمة لـ", "done": "✅ تم", "undone": "↩︎ لم يتم", "doneBy": "أنجزها {name}", "myTasks": "📋 مهام لك ({n})", "noUsers": "لم يستخدم أي ضابط آخر لوحة النقاش بعد.", "inTopic": "في “{t}”"},

  zh: { viewOnly: "👁️ 你只能看留言，不能發文或回覆。有人 @ 你或指派任務給你的留言會用黃框標出來，上方也會列出你的任務。", forMeTask: "指派給你", forMeAt: "提到你", pwOnly: "你現在是用幹部密碼進來的，可以看所有留言；要留言請先用 Discord 登入，這樣大家才知道是誰說的。", oneGo: "💡 每送出一則留言就會用掉一次伺服器請求（還要翻成 5 種語言），話比較多的時候請全部打完再一次送出，不要分好幾段傳。", title: "💬 留言板", sub: "幹部一起規劃用。每則留言都會自動翻成中文、English、Português、العربية、한국어，並使用遊戲裡的正式名稱。所有幹部都看得到；留言需要用 Discord 登入。",
    login: "留言板要用 Discord 登入才能使用（這樣大家才知道是誰留言）。", loginBtn: "🔑 用 Discord 登入",
    newBtn: "＋ 新主題", newTitle: "主題（例如：這期遺跡要報哪裡）", newText: "寫下你的想法…", post: "送出", cancel: "取消", reply: "回覆", replyPh: "回覆…",
    back: "← 所有主題", empty: "還沒有主題。按「＋ 新主題」開始討論。", replies: "{n} 則留言", by: "{name} 開的", last: "最後更新 {t}",
    decided: "📌 已定案", decision: "📌 定案", decBy: "{name} 在 {t} 定案", setDec: "📌 設為定案", clearDec: "取消定案",
    orig: "看原文", hideOrig: "收起原文", origLang: "原文（{l}）", edit: "✏️ 編輯", del: "🗑️ 刪除", save: "儲存", edited: "（已編輯）",
    delAsk: "再按一次確定刪除", delTopic: "刪掉第一則會刪掉整個主題，再按一次確定", sending: "送出中，正在翻譯…", saving: "儲存中…",
    noTr: "⚠️ 這則沒翻譯成功，先顯示原文（編輯後儲存會再翻一次）。", err: "出了點問題：{e}", dbLimit: "⚠️ 伺服器今天的免費額度用完了，UTC 00:00 重置。", dbErr: "⚠️ 伺服器暫時無法使用，請稍後再試。", gone: "這個主題已經被刪除了。",
    needBoth: "主題和內容都要寫。", loading: "載入中…",
    assign: "📋 指派給", taskTo: "📋 指派給", done: "✅ 完成", undone: "↩︎ 取消完成", doneBy: "{name} 已完成", myTasks: "📋 指派給你的事（{n}）", noUsers: "還沒有其他幹部用過留言板。", inTopic: "在「{t}」" },
  en: { viewOnly: "👁️ View only: you can read the board but not post or reply. Posts that @ you or assign you a task are marked in yellow, and your tasks are listed at the top.", forMeTask: "Assigned to you", forMeAt: "Mentions you", pwOnly: "You opened this page with the officer password, so you can read everything. To post, log in with Discord first — that way everyone knows who said what.", oneGo: "💡 Every message you send is one server request (and gets translated into 5 languages). If you have a lot to say, write it all and send it once instead of in several pieces.", title: "💬 Board", sub: "For planning together. Every message is translated into 中文, English, Português, العربية and 한국어 with the game's own terms. Every officer can read it; posting needs a Discord login.",
    login: "The board needs a Discord login (so everyone knows who wrote what).", loginBtn: "🔑 Log in with Discord",
    newBtn: "+ New topic", newTitle: "Topic (e.g. which Sanctuary to sign up for)", newText: "Write your thoughts…", post: "Post", cancel: "Cancel", reply: "Reply", replyPh: "Reply…",
    back: "← All topics", empty: "No topics yet. Tap “+ New topic” to start.", replies: "{n} messages", by: "started by {name}", last: "last update {t}",
    decided: "📌 Decided", decision: "📌 Decision", decBy: "decided by {name} · {t}", setDec: "📌 Set as decision", clearDec: "Clear decision",
    orig: "Show original", hideOrig: "Hide original", origLang: "Original ({l})", edit: "✏️ Edit", del: "🗑️ Delete", save: "Save", edited: "(edited)",
    delAsk: "Tap again to delete", delTopic: "Deleting the first message deletes the whole topic — tap again", sending: "Posting and translating…", saving: "Saving…",
    noTr: "⚠️ This one wasn't translated, so the original is shown (editing and saving translates it again).", err: "Something went wrong: {e}", dbLimit: "⚠️ The server's free daily allowance is used up. It resets at 00:00 UTC.", dbErr: "⚠️ The server isn't available right now. Please try again later.", gone: "This topic was deleted.",
    needBoth: "Write a topic and a message.", loading: "Loading…",
    assign: "📋 Assign to", taskTo: "📋 Task for", done: "✅ Done", undone: "↩︎ Not done", doneBy: "{name} done", myTasks: "📋 Tasks for you ({n})", noUsers: "No other officer has used the board yet.", inTopic: "in “{t}”" },
  pt: { viewOnly: "👁️ Só leitura: você pode ler o mural, mas não publicar nem responder. Mensagens que te marcam (@) ou te atribuem uma tarefa ficam destacadas em amarelo, e suas tarefas aparecem no topo.", forMeTask: "Atribuída a você", forMeAt: "Menciona você", pwOnly: "Você entrou com a senha dos oficiais, então pode ler tudo. Para escrever, entre com o Discord primeiro — assim todos sabem quem disse o quê.", oneGo: "💡 Cada mensagem enviada é um pedido ao servidor (e é traduzida para 5 idiomas). Se tiver muito a dizer, escreva tudo e envie de uma vez, não em várias partes.", title: "💬 Mural", sub: "Para planejar juntos. Cada mensagem é traduzida para 中文, English, Português, العربية e 한국어 com os nomes oficiais do jogo. Todos os oficiais podem ler; para escrever é preciso entrar com o Discord.",
    login: "O mural precisa do login com o Discord (assim todos sabem quem escreveu).", loginBtn: "🔑 Entrar com o Discord",
    newBtn: "+ Novo tópico", newTitle: "Tópico (ex.: em qual Santuário vamos nos inscrever)", newText: "Escreva sua ideia…", post: "Enviar", cancel: "Cancelar", reply: "Responder", replyPh: "Responder…",
    back: "← Todos os tópicos", empty: "Nenhum tópico ainda. Toque em “+ Novo tópico” para começar.", replies: "{n} mensagens", by: "aberto por {name}", last: "atualizado {t}",
    decided: "📌 Decidido", decision: "📌 Decisão", decBy: "decidido por {name} · {t}", setDec: "📌 Marcar como decisão", clearDec: "Tirar decisão",
    orig: "Ver original", hideOrig: "Esconder original", origLang: "Original ({l})", edit: "✏️ Editar", del: "🗑️ Apagar", save: "Salvar", edited: "(editado)",
    delAsk: "Toque de novo para apagar", delTopic: "Apagar a primeira mensagem apaga o tópico inteiro — toque de novo", sending: "Enviando e traduzindo…", saving: "Salvando…",
    noTr: "⚠️ Esta não foi traduzida, então aparece o original (editar e salvar traduz de novo).", err: "Algo deu errado: {e}", dbLimit: "⚠️ A cota diária gratuita do servidor acabou. Ela reinicia às 00:00 UTC.", dbErr: "⚠️ O servidor não está disponível agora. Tente de novo mais tarde.", gone: "Este tópico foi apagado.",
    needBoth: "Escreva o tópico e a mensagem.", loading: "Carregando…",
    assign: "📋 Atribuir a", taskTo: "📋 Tarefa para", done: "✅ Feito", undone: "↩︎ Desfazer", doneBy: "{name} concluiu", myTasks: "📋 Tarefas para você ({n})", noUsers: "Nenhum outro oficial usou o mural ainda.", inTopic: "em “{t}”" },
};
const LANG_LABEL = { zh: "中文", en: "English", pt: "Português", ko: "한국어", de: "Deutsch", fr: "Français", es: "Español", tr: "Türkçe", id: "Bahasa Indonesia", ru: "Русский", th: "ไทย", ar: "العربية", ja: "日本語" };
let lang = OFFICER.lang, topics = [], cur = null, timer = null, openOrig = new Set(), armed = null, editing = null;
/* 🔴 unread: the last time each topic was opened on this device (localStorage); a topic changed after that gets a dot,
   and the 💬 Board tab gets one when any topic does. Push notifications already add the red badge on the app icon. */
const SEEN_LS = "nxs-board-seen";
const seen = (() => { try { return JSON.parse(localStorage.getItem(SEEN_LS)) || {}; } catch (e) { return {}; } })();
const saveSeen = () => { try { localStorage.setItem(SEEN_LS, JSON.stringify(seen)); } catch (e) {} };
const unread = (x) => x.last > (seen[x.id] || 0) && !(OFFICER.me() && x.lastBy === OFFICER.me().id);
function markSeen(id, at) { seen[id] = Math.max(seen[id] || 0, at || Date.now()); saveSeen(); tabDot(); }
function tabDot(n) {
  const a = document.getElementById("boardTab"); if (!a) return;
  if (n == null) n = topics.filter(unread).length;
  a.classList.toggle("dot", n > 0);
}
const t = (k, v = {}) => String((BD[lang] || BD.en)[k] ?? BD.en[k] ?? k).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const esc = OFFICER.util.esc;
const linkify = (h) => h.replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`).replace(/(^|[\s(（,，])@([^\s@,，:：]{1,30})/g, (m, a, n) => `${a}<span class="bd-mention">@${n}</span>`);
const pick = (o) => (o && (o[lang] || o.orig)) || "";
const when = (ms) => { const d = new Date(ms), p = (n) => String(n).padStart(2, "0");
  return `${lang === "pt" || lang === "ar" ? d.getUTCDate() + "/" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1) + "/" + d.getUTCDate()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`; };
const token = () => { try { return localStorage.getItem(DISCORD_LS); } catch (e) { return null; } };
const topicId = () => { const m = location.hash.match(/^#board\?t=([\w-]+)/); return m ? m[1] : null; };
const postParam = () => { const m = location.hash.match(/[?&]p=([\w-]+)/); return m ? m[1] : null; };
/* stamp = when the board last changed (from the Worker); polls send it back as "since" and get a tiny "unchanged"
   answer when nothing happened — that answer costs the Worker almost nothing and leaves its database asleep */
let stamp = 0, firstCall = true, users = [], tasks = [], lastErr = null;   // lastErr: the failure shown instead of the list / topic (redrawn in the new language on a switch)
/* what the two compose boxes carry besides text: @mentioned ids and 📋 assignees */
const compose = { new: { m: new Set(), to: new Set(), img: [] }, reply: { m: new Set(), to: new Set(), img: [] } };
/* 🖼️ pictures: shrunk on the phone (longest side ≤ 1600 px, WebP/JPEG) so each one stays well under the server's limit; at most 4 per message */
const IMG_MAX = () => (OFFICER.isAdmin && OFFICER.isAdmin() ? 50 : 4);   // 🖼️ pictures per message: admins 50, others 4
function shrink(file) {
  return new Promise((ok, no) => { const fr = new FileReader(); fr.onerror = no; fr.onload = () => { const im = new Image(); im.onerror = no; im.onload = () => {
    let w = im.naturalWidth, h = im.naturalHeight, side = 1600, q = .82, out = "";
    for (let k = 0; k < 6; k++) {
      const sc = Math.min(1, side / Math.max(w, h)), c = document.createElement("canvas"); c.width = Math.round(w * sc); c.height = Math.round(h * sc);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      out = c.toDataURL("image/webp", q); if (!out.startsWith("data:image/webp")) out = c.toDataURL("image/jpeg", q);
      if (out.length < 850000) return ok(out);
      side *= .8; q -= .08;
    }
    no(new Error("too_big")); }; im.src = fr.result; }; fr.readAsDataURL(file); });
}
async function addImgs(box, files) {
  const c = compose[box];
  for (const f of [...files].filter((f) => /^image\//.test(f.type))) { if (c.img.length >= IMG_MAX()) break; try { c.img.push(await shrink(f)); putMark(box, c.img.length); } catch (e) {} }
  imgsRender(box);
}
/* where a picture goes: a [[imgN]] marker at the cursor (like announcements); move it in the text to move the picture */
const TA = (box) => $(box === "new" ? "bd_newText" : "bd_replyText");
function putMark(box, n) {
  const ta = TA(box); if (!ta) return;
  const v = ta.value, a = ta.selectionStart ?? v.length, b = ta.selectionEnd ?? a, mk = `[[img${n}]]`;
  const pre = v.slice(0, a), post = v.slice(b), ins = (pre && !pre.endsWith("\n") ? "\n" : "") + mk + (post.startsWith("\n") ? "" : "\n");
  ta.value = pre + ins + post; const at = (pre + ins).length; try { ta.setSelectionRange(at, at); } catch (e) {}
  ta.dispatchEvent(new Event("input", { bubbles: true }));
}
function dropMark(box, n) {   // picture n removed: take its marker out, later numbers move down by one
  const ta = TA(box); if (!ta) return;
  ta.value = ta.value.replace(new RegExp(`\\[\\[img${n}\\]\\]\\n?`, "g"), "").replace(/\[\[img(\d+)\]\]/g, (m, k) => +k > n ? `[[img${+k - 1}]]` : m);
  ta.dispatchEvent(new Event("input", { bubbles: true }));
}
function imgsRender(box) {
  const host = ROOT.querySelector(`[data-imgs="${box}"]`); if (!host) return;
  host.innerHTML = compose[box].img.map((u, i) => `<div class="bd-thumb"><img src="${u}" alt=""><button type="button" data-unimg="${i}" aria-label="remove">✕</button></div>`).join("");
}
ROOT.addEventListener("click", (e) => {
  const x = e.target.closest("[data-unimg]"); if (x) { const box = x.closest("[data-imgs]").dataset.imgs; compose[box].img.splice(+x.dataset.unimg, 1); dropMark(box, +x.dataset.unimg + 1); imgsRender(box); return; }
  const pic = e.target.closest(".bd-pics img"); if (pic && pic.src) { const lb = document.createElement("div"); lb.id = "bdLight"; lb.innerHTML = `<img src="${pic.src}" alt="">`; lb.onclick = () => lb.remove(); document.body.appendChild(lb); }
});
// paste a screenshot straight into the text box
for (const [id, box] of [["bd_newText", "new"], ["bd_replyText", "reply"]]) $(id).addEventListener("paste", (e) => { const f = [...(e.clipboardData && e.clipboardData.files || [])]; if (f.length) { e.preventDefault(); addImgs(box, f); } });
const IMG_CACHE = new Map();
async function loadPic(el) {
  const id = el.dataset.bimg; if (!id) return;
  if (!IMG_CACHE.has(id)) IMG_CACHE.set(id, api("img", { id }).then((j) => j.data).catch(() => ""));
  const d = await IMG_CACHE.get(id); if (d) el.src = d;
}
const picTag = (id) => `<img data-bimg="${esc(id)}" alt="🖼️" loading="lazy">`;
/* the text with each [[imgN]] marker replaced by that picture; pictures without a marker (or whose marker got lost) go underneath */
function bodyHtml(p) {
  const ids = (p.meta && p.meta.img) || [], used = new Set();
  let h = linkify(esc(pick(p.txt))).replace(/\n?\[\[img(\d+)\]\]\n?/g, (m, k) => { const id = ids[+k - 1]; if (!id || used.has(id)) return m.includes("\n") ? "\n" : ""; used.add(id); return `</div><div class="bd-pics">${picTag(id)}</div><div class="bd-text">`; });
  const rest = ids.filter((id) => !used.has(id));
  return `<div class="bd-text">${h}</div>${rest.length ? `<div class="bd-pics">${rest.map(picTag).join("")}</div>` : ""}`.replace(/<div class="bd-text"><\/div>/g, "");
}
const userName = (id) => { const u = users.find((x) => x.id === id) || (OFFICER.me() && OFFICER.me().id === id ? OFFICER.me() : null) || (cur && cur.posts.map((p) => p.by).find((b) => b.id === id)) || ((OFFICER.perms && OFFICER.perms.users) || {})[id]; return u ? u.name : "?"; };
/* (pw-… = old shared-password logins, switched off — never listed) */
/* people to pick from: everyone who used the board + the 👥 officer table (names there are set by admins) */
const others = () => { const m = new Map(users.map((u) => [u.id, u])); for (const [id, u] of Object.entries((OFFICER.perms && OFFICER.perms.users) || {})) if (!m.has(id)) m.set(id, { id, name: u.name, avatar: "" }); return [...m.values()].filter((u) => !/^pw-/.test(u.id) && (!OFFICER.me() || u.id !== OFFICER.me().id)).sort((a, b) => a.name.localeCompare(b.name)); };
async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/board", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), lang, op, ...(firstCall ? { first: true } : {}), ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw Object.assign(new Error((j.error || "HTTP " + r.status) + (j.detail ? " — " + [].concat(j.detail).join("; ").slice(0, 200) : "")), { code: j.error });
  firstCall = false; if (j.stamp) stamp = j.stamp;
  return j;
}
function applyTexts() {
  $("bd_title").textContent = t("title"); $("bd_sub").textContent = t("sub");
  $("bd_login").innerHTML = `<p style="margin:0 0 10px">${esc(t("login"))}</p><a class="btn" style="background:#5865F2;border-color:#5865F2;color:#fff;font-weight:700" href="${esc(discordStart())}">${esc(t("loginBtn"))}</a>`;
  $("bd_newBtn").textContent = t("newBtn"); $("bd_newTitle").placeholder = t("newTitle"); $("bd_newText").placeholder = t("newText");
  $("bd_newPost").textContent = t("post"); $("bd_newCancel").textContent = t("cancel"); $("bd_back").textContent = t("back");
  $("bd_replyText").placeholder = t("replyPh"); $("bd_replyPost").textContent = t("reply");
  // 🔑 opened with the officer password only: the board can be read, writing needs Discord (so everyone knows who wrote what)
  const pwOnly = false;   // the officer password alone no longer opens the page
  const viewOnly = !OFFICER.can("board", "edit");
  $("pg-board").classList.toggle("view-only", viewOnly);
  if (viewOnly) $("bd_pwNote").hidden = true;   // no "view only" note: the write buttons are just not there
  $("pg-board").classList.toggle("pw-only", pwOnly);
  if (!viewOnly) $("bd_pwNote").hidden = !pwOnly;
  if (pwOnly) $("bd_pwNote").innerHTML = `<span>${esc(t("pwOnly"))}</span><a class="btn" style="background:#5865F2;border-color:#5865F2;color:#fff;font-weight:700" href="${esc(discordStart())}">${esc(t("loginBtn"))}</a>`;
  $("bd_tip").textContent = t("oneGo");
  chipsRender("new"); chipsRender("reply");
}
function renderList() {
  $("pg-board").classList.remove("can-reply");
  tabDot();
  if (lastErr) { $("bd_tasks").hidden = true; $("bd_list").innerHTML = `<div class="card msg warn">${esc(errText(lastErr))}</div>`; return; }
  const tk = $("bd_tasks"); tk.hidden = !tasks.length;
  if (tasks.length) tk.innerHTML = `<h3>${esc(t("myTasks", { n: tasks.length }))}</h3>` + tasks.map((x) => `<a href="#board?t=${esc(x.tid)}&p=${esc(x.id)}">${linkify(esc(pick(x.txt))).slice(0, 400)}<div class="muted">${esc(x.by.name)} · ${esc(when(x.at))} · ${esc(t("inTopic", { t: pick(x.title) }))}</div></a>`).join("");
  $("bd_list").innerHTML = topics.length ? topics.map((x) => `<a class="card bd-topic${unread(x) ? " unread" : ""}" href="#board?t=${esc(x.id)}">
      <h3>${unread(x) ? '<span class="bd-dot"></span>' : ""}${esc(pick(x.title))}${x.dec ? `<span class="bd-badge">${esc(t("decided"))}</span>` : ""}</h3>
      <div class="muted">${esc(t("by", { name: x.by.name }))} · ${esc(t("replies", { n: x.n }))} · ${esc(t("last", { t: when(x.last) }))}</div></a>`).join("")
    : `<div class="card muted">${esc(t("empty"))}</div>`;
}
const av = (u) => u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : `<span class="bd-av">${esc((u.name || "?").slice(0, 1))}</span>`;
function postHtml(p, i) {
  const me = OFFICER.me() && p.by.id === OFFICER.me().id, isDec = cur.dec === p.id, src = p.txt.src;
  const translated = !!p.txt[lang] && p.txt[lang] !== p.txt.orig, showOrig = openOrig.has(p.id);
  const dbg = `src=${src || "?"} · ${OFFICER_LANGS.map((l) => l + (p.txt[l] ? (p.txt[l] === p.txt.orig ? "=orig" : " ✓") : " ✗")).join(" · ")}`;
  const sameLang = src === lang || (!translated && !p.txt.en && !p.txt.zh && !p.txt.pt);
  const body = editing === p.id
    ? `${i === 0 ? `<input class="inp" data-edtitle value="${esc(cur.title.orig)}" maxlength="120" style="margin:8px 0 6px">` : ""}<textarea class="inp" data-edtext rows="4" maxlength="4000" style="margin-top:8px;resize:vertical">${esc(p.txt.orig)}</textarea>
       <div class="bd-acts"><button class="btn primary" data-save="${esc(p.id)}">${esc(t("save"))}</button><button class="btn" data-cancel>${esc(t("cancel"))}</button></div>`
    : `${bodyHtml(p)}${taskHtml(p)}
       ${!translated && !(src === lang) ? `<div class="bd-warn">${esc(t("noTr"))}<br><span class="muted">${esc(dbg)}${p.txt.err ? " · " + esc(p.txt.err) : ""}</span></div>` : ""}
       ${!sameLang && translated ? `<button class="bd-link" data-orig="${esc(p.id)}">${esc(showOrig ? t("hideOrig") : t("orig"))}</button>` : ""}
       ${showOrig && !sameLang ? `<div class="bd-orig"><div class="muted" style="font-size:12px">${esc(t("origLang", { l: LANG_LABEL[src] || src || "?" }))}</div>${linkify(esc(p.txt.orig))}<pre class="muted" style="white-space:pre-wrap;font-size:11px;margin:8px 0 0">${esc(JSON.stringify(p.txt, null, 1))}</pre></div>` : ""}
       <div class="bd-acts">
         <button class="btn" data-dec="${esc(isDec ? "" : p.id)}">${esc(isDec ? t("clearDec") : t("setDec"))}</button>
         ${me ? `<button class="btn" data-edit="${esc(p.id)}">${esc(t("edit"))}</button><button class="btn" data-del="${esc(p.id)}">${esc(armed === p.id ? (i === 0 ? t("delTopic") : t("delAsk")) : t("del"))}</button>` : ""}
       </div>`;
  const myId = OFFICER.me() && OFFICER.me().id, mt = p.meta || {}, toMe = (mt.to || []).includes(myId), atMe = (mt.m || []).includes(myId);
  return `<div class="card bd-post${isDec ? " is-dec" : ""}${toMe || atMe ? " bd-forme" : ""}" id="bdp-${esc(p.id)}">
    <div class="bd-head">${av(p.by)}<b>${esc(p.by.name)}</b><span class="muted">${esc(when(p.at))}${p.ed ? " " + esc(t("edited")) : ""}</span>${toMe ? `<span class="bd-forme-tag">📋 ${esc(t("forMeTask"))}</span>` : atMe ? `<span class="bd-forme-tag">@ ${esc(t("forMeAt"))}</span>` : ""}</div>${body}</div>`;
}
function taskHtml(p) {
  const m = p.meta; if (!m || !(m.to || []).length) return "";
  const me = OFFICER.me() && OFFICER.me().id, done = m.done || {}, mine = m.to.includes(me);
  return `<div class="bd-task"><span>${esc(t("taskTo"))}</span>${m.to.map((id) => `<span class="bd-chip task${done[id] ? " done" : ""}">${esc(userName(id))}${done[id] ? " ✅" : ""}</span>`).join("")}
    ${me ? `<button class="btn" data-done="${esc(p.id)}" data-on="${done[me] ? 0 : 1}">${esc(done[me] ? t("undone") : t("done"))}</button>` : ""}
    ${Object.keys(done).filter((id) => !m.to.includes(id)).map((id) => `<span class="muted">${esc(t("doneBy", { name: userName(id) }))}</span>`).join("")}</div>`;
}
function renderTopic() {
  $("bd_tTitle").textContent = pick(cur.title);
  $("bd_tMeta").textContent = `${t("by", { name: cur.by.name })} · ${when(cur.at)}`;
  const d = cur.dec && cur.posts.find((p) => p.id === cur.dec);
  $("bd_decision").innerHTML = d ? `<div class="card bd-dec"><h3>${esc(t("decision"))}</h3><div class="bd-text" style="margin-top:4px">${linkify(esc(pick(d.txt)))}</div>
      <div class="muted" style="font-size:12px">${esc(d.by.name)} · ${esc(t("decBy", { name: cur.dby ? cur.dby.name : "?", t: when(cur.dat) }))}</div></div>` : "";
  $("bd_posts").innerHTML = cur.posts.map(postHtml).join("");
  $("bd_posts").querySelectorAll("img[data-bimg]").forEach(loadPic);
  // 💬 switch (👥 tab): view-only officers may answer where they were @'d or assigned
  const me = OFFICER.me() && OFFICER.me().id, cfg = (OFFICER.perms && OFFICER.perms.cfg) || {};
  $("pg-board").classList.toggle("can-reply", !!(cfg.mReply && me && cur.posts.some((p) => p.meta && ((p.meta.m || []).includes(me) || (p.meta.to || []).includes(me)))));
}
async function loadList(quiet) {
  if (!quiet) $("bd_list").innerHTML = `<div class="muted">${esc(t("loading"))}</div>`;
  try { const j = await api("list", quiet ? { since: stamp } : {}); if (j.unchanged) return; topics = j.topics; users = j.users || users; tasks = j.tasks || []; lastErr = null; renderList(); }
  catch (e) { if (!quiet) { lastErr = e; renderList(); } if (e.code === "logged_out") showLogin(); }
}
async function loadTopic(id, quiet) {
  if (!quiet) { $("bd_posts").innerHTML = `<div class="muted">${esc(t("loading"))}</div>`; $("bd_tTitle").textContent = ""; $("bd_decision").innerHTML = ""; }
  try { const j = await api("get", { id, ...(quiet ? { since: stamp } : {}) }); if (j.unchanged) return; cur = j.topic; lastErr = null; if (editing && !quiet) editing = null; if (!editing) renderTopic(); markSeen(cur.id, cur.last); const tp = topics.find((x) => x.id === cur.id); if (tp) tp.last = cur.last;
    const pp = postParam(); if (!quiet && pp && $("bdp-" + pp)) $("bdp-" + pp).scrollIntoView({ behavior: "smooth", block: "center" }); }
  catch (e) { if (e.code === "gone") { $("bd_posts").innerHTML = `<div class="card">${esc(t("gone"))}</div>`; cur = null; } else if (!quiet) { lastErr = e; $("bd_posts").innerHTML = `<div class="card msg warn">${esc(errText(e))}</div>`; } }
}
function showLogin() { $("bd_login").hidden = false; $("bd_app").hidden = true; }
function route() {
  if (!token() && !OFFICER.pw) return showLogin();
  $("bd_login").hidden = true; $("bd_app").hidden = false;
  const id = topicId();
  $("bd_listView").hidden = !!id; $("bd_topicView").hidden = !id;
  armed = null; editing = null;
  if (id) { if (!cur || cur.id !== id) { cur = null; openOrig = new Set(); } loadTopic(id); } else loadList();
  draftLoad();
}
/* new messages from the others show up by themselves (every 45 s while this tab is open and visible; a poll that finds nothing new is almost free) */
function poll() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (ROOT.hidden || document.hidden || (!token() && !OFFICER.pw)) return;
    const id = topicId();
    if (id) { if (!editing && !$("bd_replyText").value) loadTopic(id, true); } else loadList(true);
  }, 45000);
}
/* ---- compose tools: "@" inserts a name into the text (and remembers who), "📋 Assign to" picks who has to do it ---- */
function chipsRender(box) {
  const host = ROOT.querySelector(`.bd-tools[data-box="${box}"]`), c = compose[box];
  host.querySelector("[data-assign]").textContent = t("assign");
  host.querySelector(".bd-chips").innerHTML = [...c.to].map((id) => `<span class="bd-chip task">📋 ${esc(userName(id))}<button type="button" data-unto="${esc(id)}" aria-label="remove">✕</button></span>`).join("");
}
function pickerOpen(host, kind) {
  pickerClose();
  const box = host.dataset.box, list = others();
  const el = document.createElement("div"); el.className = "bd-pick";
  const allBtn = kind === "at" && list.length ? `<button type="button" data-u="*"><span class="bd-av">📣</span><span>@all · ${esc(({ zh: "所有人", ko: "모두", pt: "todos", ar: "الجميع" })[lang] || "everyone")}</span></button>` : "";
  el.innerHTML = allBtn + (list.length ? list.map((u) => `<button type="button" data-u="${esc(u.id)}"${kind === "to" && compose[box].to.has(u.id) ? ' class="on"' : ""}>${av(u)}<span>${esc(u.name)}</span>${kind === "to" && compose[box].to.has(u.id) ? " ✓" : ""}</button>`).join("") : `<div class="muted" style="padding:6px 10px;font-size:13px">${esc(t("noUsers"))}</div>`);
  el.onclick = (e) => {
    const b = e.target.closest("[data-u]"); if (!b) return;
    const id = b.dataset.u, c = compose[box];
    if (kind === "at" && id === "*") {   // 📣 @all: everyone on the 👥 list gets it as a mention
      const ta = box === "new" ? $("bd_newText") : $("bd_replyText"), s = ta.selectionStart ?? ta.value.length, v = ta.value;
      const ins = (s && !/\s$/.test(v.slice(0, s)) ? " " : "") + "@all ";
      ta.value = v.slice(0, s) + ins + v.slice(s); ta.focus(); ta.selectionStart = ta.selectionEnd = s + ins.length; pickerClose(); return;
    }
    if (kind === "at") {
      const ta = box === "new" ? $("bd_newText") : $("bd_replyText"), s = ta.selectionStart ?? ta.value.length, v = ta.value;
      const ins = (s && !/\s$/.test(v.slice(0, s)) ? " " : "") + "@" + userName(id) + " ";
      ta.value = v.slice(0, s) + ins + v.slice(s); ta.focus(); ta.selectionStart = ta.selectionEnd = s + ins.length;
      c.m.add(id); pickerClose();
    } else { c.to.has(id) ? c.to.delete(id) : c.to.add(id); chipsRender(box); pickerOpen(host, "to"); }
  };
  host.appendChild(el);
}
function pickerClose() { ROOT.querySelectorAll(".bd-pick").forEach((e) => e.remove()); }
document.addEventListener("click", (e) => { if (!e.target.closest(".bd-tools")) pickerClose(); });
ROOT.querySelectorAll(".bd-tools").forEach((host) => {
  host.querySelector("[data-at]").onclick = () => pickerOpen(host, "at");
  host.querySelector("[data-assign]").onclick = () => pickerOpen(host, "to");
  const fi = host.querySelector("[data-file]"); host.querySelector("[data-img]").onclick = () => fi.click();
  fi.onchange = () => { addImgs(host.dataset.box, fi.files); fi.value = ""; };
  host.addEventListener("click", (e) => { const b = e.target.closest("[data-unto]"); if (b) { compose[host.dataset.box].to.delete(b.dataset.unto); chipsRender(host.dataset.box); } });
});
/* ids of the people whose @name is still in the text when it is sent */
const mentionsIn = (box, text) => /(^|\s)@all\b/i.test(text) ? others().map((u) => u.id)   // 📣 @all → everyone
  : [...compose[box].m].filter((id) => text.includes("@" + userName(id)));
const composeReset = (box) => { compose[box].m.clear(); compose[box].to.clear(); compose[box].img = []; chipsRender(box); imgsRender(box); };
/* drafts: what is typed in the two boxes is kept on this device until it is sent, so a failed send or a reload loses nothing */
const DRAFT_LS = "nxs-board-draft";
const draftLoad = () => { try { const d = JSON.parse(localStorage.getItem(DRAFT_LS)) || {}; if (d.title) $("bd_newTitle").value = d.title; if (d.text) { $("bd_newText").value = d.text; $("bd_newForm").hidden = false; } if (d.reply && d.replyFor === topicId()) $("bd_replyText").value = d.reply; } catch (e) {} };
const draftSave = () => { try { localStorage.setItem(DRAFT_LS, JSON.stringify({ title: $("bd_newTitle").value, text: $("bd_newText").value, reply: $("bd_replyText").value, replyFor: topicId() })); } catch (e) {} };
for (const id of ["bd_newTitle", "bd_newText", "bd_replyText"]) $(id).addEventListener("input", draftSave);
$("bd_reload").onclick = () => route();
$("bd_newBtn").onclick = () => { $("bd_newForm").hidden = false; $("bd_newTitle").focus(); };
$("bd_newCancel").onclick = () => { $("bd_newForm").hidden = true; $("bd_newMsg").textContent = ""; };
$("bd_newPost").onclick = async () => {
  const title = $("bd_newTitle").value.trim(), text = $("bd_newText").value.trim(), m = $("bd_newMsg");
  if (!title || !text) { m.textContent = t("needBoth"); return; }
  $("bd_newPost").disabled = true; m.textContent = t("sending");
  try {
    const j = await api("new", { title, text, mentions: mentionsIn("new", text), to: [...compose.new.to], images: compose.new.img }); composeReset("new");
    $("bd_newTitle").value = ""; $("bd_newText").value = ""; $("bd_newForm").hidden = true; m.textContent = ""; delete m.dataset.err; draftSave();
    if (!j.translated) $("bd_replyMsg").textContent = t("noTr") + " " + (j.topic.posts[0].txt.err || "");
    cur = j.topic; markSeen(cur.id, cur.last); location.hash = "#board?t=" + j.topic.id;
  } catch (e) { m.textContent = errText(e); m.dataset.err = JSON.stringify({ code: e.code, message: e.message }); }
  $("bd_newPost").disabled = false;
};
$("bd_replyPost").onclick = async () => {
  const text = $("bd_replyText").value.trim(), m = $("bd_replyMsg");
  if ((!text && !compose.reply.img.length) || !cur) return;
  $("bd_replyPost").disabled = true; m.textContent = t("sending");
  try {
    const j = await api("reply", { id: cur.id, text, mentions: mentionsIn("reply", text), to: [...compose.reply.to], images: compose.reply.img }); composeReset("reply"); cur = j.topic; markSeen(cur.id, cur.last); $("bd_replyText").value = ""; draftSave(); renderTopic();
    delete m.dataset.err; m.textContent = j.translated ? "" : t("noTr") + " " + (cur.posts[cur.posts.length - 1].txt.err || "");
    const last = cur.posts[cur.posts.length - 1]; if (last) $("bdp-" + last.id).scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (e) { m.textContent = errText(e); m.dataset.err = JSON.stringify({ code: e.code, message: e.message }); }
  $("bd_replyPost").disabled = false;
};
$("bd_posts").addEventListener("click", async (ev) => {
  const b = ev.target.closest("button"); if (!b || !cur) return;
  const d = b.dataset;
  if (d.orig) { openOrig.has(d.orig) ? openOrig.delete(d.orig) : openOrig.add(d.orig); return renderTopic(); }
  if (d.edit) { editing = d.edit; armed = null; return renderTopic(); }
  if ("cancel" in d) { editing = null; return renderTopic(); }
  try {
    if (d.dec !== undefined) { b.disabled = true; cur = (await api("decide", { id: cur.id, post: d.dec || null })).topic; return renderTopic(); }
    if (d.done) { b.disabled = true; cur = (await api("done", { post: d.done, on: d.on === "1" })).topic; return renderTopic(); }
    if (d.del) {
      if (armed !== d.del) { armed = d.del; return renderTopic(); }
      b.disabled = true; const j = await api("del", { post: d.del }); armed = null;
      if (j.gone) { cur = null; location.hash = "#board"; return; }
      cur = j.topic; return renderTopic();
    }
    if (d.save) {
      const card = $("bdp-" + d.save), text = card.querySelector("[data-edtext]").value.trim(), ti = card.querySelector("[data-edtitle]");
      if (!text) return;
      b.disabled = true; b.textContent = t("saving");
      cur = (await api("edit", { post: d.save, text, ...(ti ? { title: ti.value.trim() || cur.title.orig } : {}) })).topic; editing = null; return renderTopic();
    }
  } catch (e) { b.disabled = false; alertMsg(e); }
});
const errText = (e) => e.code === "view_only" ? t("viewOnly") : e.code === "login_to_post" ? t("pwOnly") : e.code === "db_limit" || /limit|exceed|quota|allow/i.test(e.message) ? t("dbLimit") : e.code === "db" ? t("dbErr") : t("err", { e: e.message });
function alertMsg(e) { $("bd_replyMsg").textContent = errText(e); }
function init() { applyTexts(); poll(); }
/* the tab's dot is kept fresh even while another tab is open (once a minute) */
async function dotCheck() { if (document.hidden || (!token() && !OFFICER.pw) || !OFFICER.me() || !ROOT.hidden) return; try { const j = await api("list", { since: stamp }); if (j.unchanged) return; topics = j.topics; tabDot(); } catch (e) {} }
setInterval(dotCheck, 3 * 60000); setTimeout(dotCheck, 3000);
function onShow() { route(); draftLoad(); }
function setLang(l) {
  lang = l; applyTexts();
  if (ROOT.hidden) return;
  if (topicId()) { if (lastErr && !cur) $("bd_posts").innerHTML = `<div class="card msg warn">${esc(errText(lastErr))}</div>`; else if (cur) renderTopic(); }
  else renderList();
  // messages under the compose boxes are redrawn too
  for (const id of ["bd_newMsg", "bd_replyMsg"]) { const m = $(id); if (m.dataset.err) m.textContent = errText(JSON.parse(m.dataset.err)); }
}
OFFICER_PAGES.board = { init, onShow, applyTexts, setLang };
})();
