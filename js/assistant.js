/* ---- NXS AI assistant: 💬 button (bottom-left) → ask questions about the guides ----------
   Answers come from the Cloudflare Worker (it holds the Gemini key).
   Officers (officer password unlocked on this device) can also ask about roster / watch data.
   If the AI is unavailable (free quota used up), it falls back to a simple search of the guides. */
(function () {
  // ↓↓↓ Paste your Worker address here after Step 3 (e.g. "https://nxs-ai.yourname.workers.dev")
  const AI_URL = "https://nxs-ai.tapegirljoke.workers.dev";
  const OFFICER_LS = "nxs-post-v1";   // same saved officer login as the officer pages

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
      <button type="button" id="aiLock" title="Officer access">🔒</button>
      <button type="button" id="aiClose" aria-label="Close">×</button></div>
    <div class="ai-officer" id="aiOfficer" hidden>
      <input type="password" id="aiPw" placeholder="Officer password" autocomplete="current-password">
      <button type="button" id="aiPwGo">OK</button>
      <label style="width:100%"><input type="checkbox" id="aiPwKeep"> Remember on this device</label>
      <span class="ai-hint" id="aiPwMsg"></span>
    </div>
    <div class="ai-log" id="aiLog">
      <div class="ai-msg a">Hi! Ask me anything about the guides, in any language.<br>
      <span class="ai-hint">e.g. "Which heroes for Bear Hunt?" · 「熊陷阱要派哪些英雄？」</span></div>
    </div>
    <form class="ai-form" id="aiForm"><input id="aiQ" maxlength="600" placeholder="Ask in any language…" autocomplete="off"><button>➤</button></form>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  const $ = (id) => panel.querySelector("#" + id);

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
  function setLock() { $("aiLock").textContent = officerToken ? "🔓" : "🔒"; $("aiLock").title = officerToken ? "Officer mode on" : "Officer access"; }
  (async () => { const pw = store().pw; if (pw) { officerToken = await decrypt(pw); setLock(); } })();

  $("aiLock").onclick = () => {
    if (officerToken) { officerToken = null; setLock(); say("a", "Officer mode off on this chat."); return; }
    $("aiOfficer").hidden = !$("aiOfficer").hidden;
    if (!$("aiOfficer").hidden) $("aiPw").focus();
  };
  async function unlock() {
    const pw = $("aiPw").value;
    $("aiPwMsg").textContent = "Checking…";
    officerToken = await decrypt(pw);
    if (!officerToken) { $("aiPwMsg").textContent = "Wrong password."; return; }
    if ($("aiPwKeep").checked) { const s = store(); s.pw = pw; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {} }
    $("aiPw").value = ""; $("aiPwMsg").textContent = ""; $("aiOfficer").hidden = true;
    setLock(); say("a", "Officer mode on — you can also ask about the roster and member tracking.");
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
    const officer = officerToken ? "\nOfficer pages:\n[Roster](roster-x7k2p9.html)\n[Watch](watch-x7k2p9.html)" : "";
    return `${why}\n${ids.length ? "These guides might help:\n" + links : "No matching guide found."}${officer}`;
  }

  $("aiForm").onsubmit = async (e) => {
    e.preventDefault();
    const q = $("aiQ").value.trim();
    if (!q) return;
    $("aiQ").value = "";
    say("u", q);
    const wait = say("a", "…");
    if (!AI_URL) { wait.innerHTML = format(fallback(q, "The AI isn't set up yet.")); return; }
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
        const why = {
          slow_down: "Too many questions — please wait a minute.",
          quota: "The AI is resting right now (daily free limit used up).",
          forbidden: "The AI only works on the NXS site itself.",
          site_unreachable: "The AI couldn't read the site content.",
          setup: "The AI isn't set up correctly yet.",
          gemini: "The AI service returned an error.",
        }[data.error] || `The AI isn't available (error ${r.status}).`;
        wait.innerHTML = format(fallback(q, why));
        if (data.detail) console.warn("NXS AI:", data.detail);   // details for whoever set it up
      }
    } catch (err) {
      wait.innerHTML = format(fallback(q, "Couldn't reach the AI."));
    }
    $("aiLog").scrollTop = $("aiLog").scrollHeight;
  };
})();
