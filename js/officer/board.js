/* NXS officer page — board tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.board) */
/* ============ 💬 Board — topics and replies for planning together (officers logged in with Discord only).
   Every message is translated into 中文 / English / Português by the Worker (with the game's own terms); the original is
   always one tap away. 📌 marks the message that is the decision of a topic. Data lives in the Worker, not on GitHub. ============ */
(function () {
const ROOT = document.getElementById("pg-board");
const $ = (id) => document.getElementById(id);
const BD = {
  zh: { title: "💬 留言板", sub: "幹部一起規劃用。每則留言都會自動翻成中文、English、Português，並使用遊戲裡的正式名稱。只有用 Discord 登入的幹部看得到。",
    login: "留言板要用 Discord 登入才能使用（這樣大家才知道是誰留言）。", loginBtn: "🔑 用 Discord 登入",
    newBtn: "＋ 新主題", newTitle: "主題（例如：這期遺跡要報哪裡）", newText: "寫下你的想法…", post: "送出", cancel: "取消", reply: "回覆", replyPh: "回覆…",
    back: "← 所有主題", empty: "還沒有主題。按「＋ 新主題」開始討論。", replies: "{n} 則留言", by: "{name} 開的", last: "最後更新 {t}",
    decided: "📌 已定案", decision: "📌 定案", decBy: "{name} 在 {t} 定案", setDec: "📌 設為定案", clearDec: "取消定案",
    orig: "看原文", hideOrig: "收起原文", origLang: "原文（{l}）", edit: "✏️ 編輯", del: "🗑️ 刪除", save: "儲存", edited: "（已編輯）",
    delAsk: "再按一次確定刪除", delTopic: "刪掉第一則會刪掉整個主題，再按一次確定", sending: "送出中，正在翻譯…", saving: "儲存中…",
    noTr: "⚠️ 這則沒翻譯成功，先顯示原文（編輯後儲存會再翻一次）。", err: "出了點問題：{e}", gone: "這個主題已經被刪除了。",
    needBoth: "主題和內容都要寫。", loading: "載入中…" },
  en: { title: "💬 Board", sub: "For planning together. Every message is translated into 中文, English and Português with the game's own terms. Only officers logged in with Discord can see it.",
    login: "The board needs a Discord login (so everyone knows who wrote what).", loginBtn: "🔑 Log in with Discord",
    newBtn: "+ New topic", newTitle: "Topic (e.g. which Sanctuary to sign up for)", newText: "Write your thoughts…", post: "Post", cancel: "Cancel", reply: "Reply", replyPh: "Reply…",
    back: "← All topics", empty: "No topics yet. Tap “+ New topic” to start.", replies: "{n} messages", by: "started by {name}", last: "last update {t}",
    decided: "📌 Decided", decision: "📌 Decision", decBy: "decided by {name} · {t}", setDec: "📌 Set as decision", clearDec: "Clear decision",
    orig: "Show original", hideOrig: "Hide original", origLang: "Original ({l})", edit: "✏️ Edit", del: "🗑️ Delete", save: "Save", edited: "(edited)",
    delAsk: "Tap again to delete", delTopic: "Deleting the first message deletes the whole topic — tap again", sending: "Posting and translating…", saving: "Saving…",
    noTr: "⚠️ This one wasn't translated, so the original is shown (editing and saving translates it again).", err: "Something went wrong: {e}", gone: "This topic was deleted.",
    needBoth: "Write a topic and a message.", loading: "Loading…" },
  pt: { title: "💬 Mural", sub: "Para planejar juntos. Cada mensagem é traduzida para 中文, English e Português com os nomes oficiais do jogo. Só oficiais que entraram com o Discord podem ver.",
    login: "O mural precisa do login com o Discord (assim todos sabem quem escreveu).", loginBtn: "🔑 Entrar com o Discord",
    newBtn: "+ Novo tópico", newTitle: "Tópico (ex.: em qual Santuário vamos nos inscrever)", newText: "Escreva sua ideia…", post: "Enviar", cancel: "Cancelar", reply: "Responder", replyPh: "Responder…",
    back: "← Todos os tópicos", empty: "Nenhum tópico ainda. Toque em “+ Novo tópico” para começar.", replies: "{n} mensagens", by: "aberto por {name}", last: "atualizado {t}",
    decided: "📌 Decidido", decision: "📌 Decisão", decBy: "decidido por {name} · {t}", setDec: "📌 Marcar como decisão", clearDec: "Tirar decisão",
    orig: "Ver original", hideOrig: "Esconder original", origLang: "Original ({l})", edit: "✏️ Editar", del: "🗑️ Apagar", save: "Salvar", edited: "(editado)",
    delAsk: "Toque de novo para apagar", delTopic: "Apagar a primeira mensagem apaga o tópico inteiro — toque de novo", sending: "Enviando e traduzindo…", saving: "Salvando…",
    noTr: "⚠️ Esta não foi traduzida, então aparece o original (editar e salvar traduz de novo).", err: "Algo deu errado: {e}", gone: "Este tópico foi apagado.",
    needBoth: "Escreva o tópico e a mensagem.", loading: "Carregando…" },
};
const LANG_LABEL = { zh: "中文", en: "English", pt: "Português", ko: "한국어", de: "Deutsch", fr: "Français", es: "Español", tr: "Türkçe", id: "Bahasa Indonesia", ru: "Русский", th: "ไทย", ar: "العربية", ja: "日本語" };
let lang = OFFICER.lang, topics = [], cur = null, timer = null, openOrig = new Set(), armed = null, editing = null;
/* 🔴 unread: the last time each topic was opened on this device (localStorage); a topic changed after that gets a dot,
   and the 💬 Board tab gets one when any topic does. Push notifications already add the red badge on the app icon. */
const SEEN_LS = "nxs-board-seen";
const seen = (() => { try { return JSON.parse(localStorage.getItem(SEEN_LS)) || {}; } catch (e) { return {}; } })();
const saveSeen = () => { try { localStorage.setItem(SEEN_LS, JSON.stringify(seen)); } catch (e) {} };
const unread = (x) => x.last > (seen[x.id] || 0) && !(OFFICER.user && x.lastBy === OFFICER.user.id);
function markSeen(id, at) { seen[id] = Math.max(seen[id] || 0, at || Date.now()); saveSeen(); tabDot(); }
function tabDot(n) {
  const a = document.getElementById("boardTab"); if (!a) return;
  if (n == null) n = topics.filter(unread).length;
  a.classList.toggle("dot", n > 0);
}
const t = (k, v = {}) => String((BD[lang] || BD.en)[k] ?? BD.en[k] ?? k).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const esc = OFFICER.util.esc;
const linkify = (h) => h.replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
const pick = (o) => (o && (o[lang] || o.orig)) || "";
const when = (ms) => { const d = new Date(ms), p = (n) => String(n).padStart(2, "0");
  return `${lang === "pt" ? d.getUTCDate() + "/" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1) + "/" + d.getUTCDate()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`; };
const token = () => { try { return localStorage.getItem(DISCORD_LS); } catch (e) { return null; } };
const topicId = () => { const m = location.hash.match(/^#board\?t=([\w-]+)/); return m ? m[1] : null; };
async function api(op, extra = {}) {
  const r = await fetch(AUTH_API + "/board", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: token(), lang, op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw Object.assign(new Error(j.error || "HTTP " + r.status), { code: j.error });
  return j;
}
function applyTexts() {
  $("bd_title").textContent = t("title"); $("bd_sub").textContent = t("sub");
  $("bd_login").innerHTML = `<p style="margin:0 0 10px">${esc(t("login"))}</p><a class="btn" style="background:#5865F2;border-color:#5865F2;color:#fff;font-weight:700" href="${esc(discordStart())}">${esc(t("loginBtn"))}</a>`;
  $("bd_newBtn").textContent = t("newBtn"); $("bd_newTitle").placeholder = t("newTitle"); $("bd_newText").placeholder = t("newText");
  $("bd_newPost").textContent = t("post"); $("bd_newCancel").textContent = t("cancel"); $("bd_back").textContent = t("back");
  $("bd_replyText").placeholder = t("replyPh"); $("bd_replyPost").textContent = t("reply");
}
function renderList() {
  tabDot();
  $("bd_list").innerHTML = topics.length ? topics.map((x) => `<a class="card bd-topic${unread(x) ? " unread" : ""}" href="#board?t=${esc(x.id)}">
      <h3>${unread(x) ? '<span class="bd-dot"></span>' : ""}${esc(pick(x.title))}${x.dec ? `<span class="bd-badge">${esc(t("decided"))}</span>` : ""}</h3>
      <div class="muted">${esc(t("by", { name: x.by.name }))} · ${esc(t("replies", { n: x.n }))} · ${esc(t("last", { t: when(x.last) }))}</div></a>`).join("")
    : `<div class="card muted">${esc(t("empty"))}</div>`;
}
const av = (u) => u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : `<span class="bd-av">${esc((u.name || "?").slice(0, 1))}</span>`;
function postHtml(p, i) {
  const me = OFFICER.user && p.by.id === OFFICER.user.id, isDec = cur.dec === p.id, src = p.txt.src;
  const translated = !!p.txt[lang] && p.txt[lang] !== p.txt.orig, showOrig = openOrig.has(p.id);
  const dbg = `src=${src || "?"} · ${["zh", "en", "pt"].map((l) => l + (p.txt[l] ? (p.txt[l] === p.txt.orig ? "=orig" : " ✓") : " ✗")).join(" · ")}`;
  const sameLang = src === lang || (!translated && !p.txt.en && !p.txt.zh && !p.txt.pt);
  const body = editing === p.id
    ? `${i === 0 ? `<input class="inp" data-edtitle value="${esc(cur.title.orig)}" maxlength="120" style="margin:8px 0 6px">` : ""}<textarea class="inp" data-edtext rows="4" maxlength="4000" style="margin-top:8px;resize:vertical">${esc(p.txt.orig)}</textarea>
       <div class="bd-acts"><button class="btn primary" data-save="${esc(p.id)}">${esc(t("save"))}</button><button class="btn" data-cancel>${esc(t("cancel"))}</button></div>`
    : `<div class="bd-text">${linkify(esc(pick(p.txt)))}</div>
       ${!translated && !(src === lang) ? `<div class="bd-warn">${esc(t("noTr"))}<br><span class="muted">${esc(dbg)}${p.txt.err ? " · " + esc(p.txt.err) : ""}</span></div>` : ""}
       ${!sameLang && translated ? `<button class="bd-link" data-orig="${esc(p.id)}">${esc(showOrig ? t("hideOrig") : t("orig"))}</button>` : ""}
       ${showOrig && !sameLang ? `<div class="bd-orig"><div class="muted" style="font-size:12px">${esc(t("origLang", { l: LANG_LABEL[src] || src || "?" }))}</div>${linkify(esc(p.txt.orig))}<pre class="muted" style="white-space:pre-wrap;font-size:11px;margin:8px 0 0">${esc(JSON.stringify(p.txt, null, 1))}</pre></div>` : ""}
       <div class="bd-acts">
         <button class="btn" data-dec="${esc(isDec ? "" : p.id)}">${esc(isDec ? t("clearDec") : t("setDec"))}</button>
         ${me ? `<button class="btn" data-edit="${esc(p.id)}">${esc(t("edit"))}</button><button class="btn" data-del="${esc(p.id)}">${esc(armed === p.id ? (i === 0 ? t("delTopic") : t("delAsk")) : t("del"))}</button>` : ""}
       </div>`;
  return `<div class="card bd-post${isDec ? " is-dec" : ""}" id="bdp-${esc(p.id)}">
    <div class="bd-head">${av(p.by)}<b>${esc(p.by.name)}</b><span class="muted">${esc(when(p.at))}${p.ed ? " " + esc(t("edited")) : ""}</span></div>${body}</div>`;
}
function renderTopic() {
  $("bd_tTitle").textContent = pick(cur.title);
  $("bd_tMeta").textContent = `${t("by", { name: cur.by.name })} · ${when(cur.at)}`;
  const d = cur.dec && cur.posts.find((p) => p.id === cur.dec);
  $("bd_decision").innerHTML = d ? `<div class="card bd-dec"><h3>${esc(t("decision"))}</h3><div class="bd-text" style="margin-top:4px">${linkify(esc(pick(d.txt)))}</div>
      <div class="muted" style="font-size:12px">${esc(d.by.name)} · ${esc(t("decBy", { name: cur.dby ? cur.dby.name : "?", t: when(cur.dat) }))}</div></div>` : "";
  $("bd_posts").innerHTML = cur.posts.map(postHtml).join("");
}
async function loadList(quiet) {
  if (!quiet) $("bd_list").innerHTML = `<div class="muted">${esc(t("loading"))}</div>`;
  try { topics = (await api("list")).topics; renderList(); }
  catch (e) { if (!quiet) $("bd_list").innerHTML = `<div class="card msg warn">${esc(t("err", { e: e.message }))}</div>`; if (e.code === "logged_out") showLogin(); }
}
async function loadTopic(id, quiet) {
  if (!quiet) { $("bd_posts").innerHTML = `<div class="muted">${esc(t("loading"))}</div>`; $("bd_tTitle").textContent = ""; $("bd_decision").innerHTML = ""; }
  try { cur = (await api("get", { id })).topic; if (editing && !quiet) editing = null; if (!editing) renderTopic(); markSeen(cur.id, cur.last); const tp = topics.find((x) => x.id === cur.id); if (tp) tp.last = cur.last; }
  catch (e) { if (e.code === "gone") { $("bd_posts").innerHTML = `<div class="card">${esc(t("gone"))}</div>`; cur = null; } else if (!quiet) $("bd_posts").innerHTML = `<div class="card msg warn">${esc(t("err", { e: e.message }))}</div>`; }
}
function showLogin() { $("bd_login").hidden = false; $("bd_app").hidden = true; }
function route() {
  if (!token()) return showLogin();
  $("bd_login").hidden = true; $("bd_app").hidden = false;
  const id = topicId();
  $("bd_listView").hidden = !!id; $("bd_topicView").hidden = !id;
  armed = null; editing = null;
  if (id) { if (!cur || cur.id !== id) { cur = null; openOrig = new Set(); } loadTopic(id); } else loadList();
}
/* new messages from the others show up by themselves (every 20 s while this tab is open and visible) */
function poll() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (ROOT.hidden || document.hidden || !token()) return;
    const id = topicId();
    if (id) { if (!editing && !$("bd_replyText").value) loadTopic(id, true); } else loadList(true);
  }, 20000);
}
$("bd_reload").onclick = () => route();
$("bd_newBtn").onclick = () => { $("bd_newForm").hidden = false; $("bd_newTitle").focus(); };
$("bd_newCancel").onclick = () => { $("bd_newForm").hidden = true; $("bd_newMsg").textContent = ""; };
$("bd_newPost").onclick = async () => {
  const title = $("bd_newTitle").value.trim(), text = $("bd_newText").value.trim(), m = $("bd_newMsg");
  if (!title || !text) { m.textContent = t("needBoth"); return; }
  $("bd_newPost").disabled = true; m.textContent = t("sending");
  try {
    const j = await api("new", { title, text });
    $("bd_newTitle").value = ""; $("bd_newText").value = ""; $("bd_newForm").hidden = true; m.textContent = "";
    if (!j.translated) $("bd_replyMsg").textContent = t("noTr") + " " + (j.topic.posts[0].txt.err || "");
    cur = j.topic; markSeen(cur.id, cur.last); location.hash = "#board?t=" + j.topic.id;
  } catch (e) { m.textContent = t("err", { e: e.message }); }
  $("bd_newPost").disabled = false;
};
$("bd_replyPost").onclick = async () => {
  const text = $("bd_replyText").value.trim(), m = $("bd_replyMsg");
  if (!text || !cur) return;
  $("bd_replyPost").disabled = true; m.textContent = t("sending");
  try {
    const j = await api("reply", { id: cur.id, text }); cur = j.topic; markSeen(cur.id, cur.last); $("bd_replyText").value = ""; renderTopic();
    m.textContent = j.translated ? "" : t("noTr") + " " + (cur.posts[cur.posts.length - 1].txt.err || "");
    const last = cur.posts[cur.posts.length - 1]; if (last) $("bdp-" + last.id).scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (e) { m.textContent = t("err", { e: e.message }); }
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
function alertMsg(e) { $("bd_replyMsg").textContent = t("err", { e: e.message }); }
function init() { applyTexts(); poll(); }
/* the tab's dot is kept fresh even while another tab is open (once a minute) */
async function dotCheck() { if (document.hidden || !token() || !OFFICER.user) return; try { topics = (await api("list")).topics; tabDot(); if (!ROOT.hidden && !topicId()) renderList(); } catch (e) {} }
setInterval(dotCheck, 60000); setTimeout(dotCheck, 3000);
function onShow() { route(); }
function setLang(l) { lang = l; applyTexts(); if (!ROOT.hidden) { if (cur && topicId()) renderTopic(); else renderList(); } }
OFFICER_PAGES.board = { init, onShow, applyTexts, setLang };
})();
