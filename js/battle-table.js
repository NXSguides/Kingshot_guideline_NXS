/* ⚔️🔱 The battle table inside an announcement (Sherry, 2026-11-01): [[table:data/ann/….json]] → a real table in the reader's language.
   The words come from data/battle-terms.js (fixed translations, no machine translation): building / event names, the drafts' notes and
   reminders. Player names stay as they are; anything not in that list is shown as written. Used by the main site (js/app.js)
   and the officer announcement preview (js/officer/post.js). */
(function () {
  const NORM = (s) => String(s || "").replace(/[–—]/g, "—").replace(/[ \t]+/g, " ").trim();
  const RE_ESC = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const CAP = "((?:(?![.!?](?:\\s|$)).)+?)";   // a name (or a building) — never runs past the end of a sentence
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let DICT = null;
  function dict() {
    if (DICT || typeof BT_ROWS === "undefined") return DICT;
    DICT = {};
    BT_LANGS.forEach((l, li) => {
      const pats = [], exact = new Map();
      BT_ROWS.forEach((r) => {
        const en = NORM(r[0]), out = r[li] || r[0];
        if (!/\{\d\}/.test(en)) exact.set(en.toLowerCase(), out);
        const parts = en.split(/(\{\d\})/);
        pats.push({ re: new RegExp(parts.map((p) => /^\{\d\}$/.test(p) ? CAP : RE_ESC(p)).join(""), "y"), ids: parts.filter((p) => /^\{\d\}$/.test(p)).map((p) => +p[1]), out, len: en.replace(/\{\d\}/g, "").length });
      });
      pats.sort((a, b) => b.len - a.len);
      DICT[l] = { pats, exact };
    });
    return DICT;
  }
  const SEP = { zh: "", th: " " };
  /* one cell / one line → the reader's language; null when a part isn't in the list */
  function trLine(line, lang) {
    const D = dict(), d = D && D[lang];
    const t = NORM(line);
    if (!d || lang === "en" || !/\p{L}/u.test(t)) return line;
    const whole = d.exact.get(t.toLowerCase()); if (whole != null) return whole;
    const pre = (t.match(/^(?:\d+\.|[-•*◦▪])\s*/) || [""])[0], body = t.slice(pre.length);
    const one = d.exact.get(body.toLowerCase()); if (one != null) return pre + one;
    const out = []; let pos = 0;
    while (pos < body.length) {
      while (body[pos] === " ") pos++;
      if (pos >= body.length) break;
      let hit = null;
      for (const p of d.pats) {
        p.re.lastIndex = pos; const m = p.re.exec(body);
        if (!m) continue;
        const end = pos + m[0].length;
        if (end < body.length && body[end] !== " ") continue;   // must end where a sentence ends
        hit = { p, m, end }; break;
      }
      if (!hit) return null;
      let s = hit.p.out;
      hit.p.ids.forEach((id, i) => { const v = NORM(hit.m[i + 1]), tr = d.exact.get(v.toLowerCase()); s = s.split(`{${id}}`).join(tr != null ? tr : v); });
      out.push(s); pos = hit.end;
    }
    return pre + out.join(SEP[lang] != null ? SEP[lang] : " ");
  }
  function tr(text, lang) {
    return String(text || "").split(/\r?\n/).map((l) => { const x = trLine(l, lang); return x == null ? l : x; }).join("\n");
  }
  const CIRC = "⓪①②③④⑤⑥⑦⑧⑨";
  const listOf = (s) => (Array.isArray(s) ? s : String(s || "").split(/[,，]/)).map((x) => String(x).trim()).filter(Boolean);
  const sameTeam = (a, b) => String(a || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "") === String(b || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  /* names in a note are bold, so each player finds their own line fast */
  const boldNames = (h, names) => { if (!names.length) return h;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(${names.map((n) => RE_ESC(esc(n))).join("|")})(?![\\p{L}\\p{N}])`, "gu");
    return h.replace(re, "<b>$1</b>"); };
  const noteHtml = (s, lang, names) => boldNames(esc(tr(s, lang)), names).replace(/\n\s*\n/g, "<span class=\"bt-gap\"></span>").replace(/\n/g, "<br>");
  const pills = (l, lang) => (l || []).map((x) => x && typeof x === "object" ? `<span class="bt-p bt-pt">${esc(tr(x.t, lang))}</span>` : `<span class="bt-p">${esc(x)}</span>`).join("");
  const ROLE = { att: "⚔️", def: "🛡️", join: "👥" };
  const allNames = (G) => [...new Set(G.flatMap((g) => [g.att, g.def, g.join].flat().filter((x) => typeof x === "string" && x.length > 1)))].sort((a, b) => b.length - a.length);
  const who = (g) => "|" + [g.att, g.def, g.join].flat().filter((x) => typeof x === "string").join("|") + "|";
  /* 🙋 "Who are you?" (Sherry 2026-11-01): pick your name → only the buildings (🔱: your team) you are in stay, your name lit up */
  function pickHtml(G, lang) {
    const ns = [...new Set(G.flatMap((g) => [g.att, g.def, g.join].flat().filter((x) => typeof x === "string")))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (!ns.length) return "";
    return `<label class="bt-who">🙋 ${esc(tr("Who are you?", lang))} <select><option value="">${esc(tr("Show everyone", lang))}</option>${ns.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</select><button type="button" class="bt-all" hidden>👀 ${esc(tr("Show everyone", lang))}</button></label>`;
  }
  function remHtml(rem, lang, title) {
    const L = String(rem || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
    if (!L.length) return "";
    return `<div class="bt-rem"><div class="bt-remt">📌 ${esc(title)}</div>${L.map((x) => { const sub = !/^[•*\-]/.test(x);
      return sub ? `<div class="bt-remh">${esc(tr(x, lang))}</div>` : `<div class="bt-reml">${esc(tr(x.replace(/^[•*\-]\s*/, ""), lang))}</div>`; }).join("")}</div>`;
  }
  /* ⚔️ Swordland: per phase a grid of building cards — number + name, then ⚔️ / 🛡️ / 👥 with the names as tags, then the note.
     A note shared by buildings next to each other is written once, under them (like the merged cell in the picture). */
  function ssHtml(T, lang) {
    const show = T.show || {}, cols = T.cols || {}, G = T.groups || [], names = allNames(G);
    const roles = ["att", "def", "join"].filter((k) => show[k]);
    return listOf(T.stages).map((sn, si) => {
      const rows = G.filter((g) => (g.sec || 0) === si); if (!rows.length) return "";
      /* who a building concerns when 🙋 a name is picked (Sherry 2026-11-15): its own names; "Same as above" with no names of its own = the people of the
         building above it; "All" = everyone */
      const W = new Map(); { let pv = "||"; rows.forEach((g) => { const own = who(g), tags = [g.att, g.def, g.join].flat().filter((x) => x && typeof x === "object").map((x) => String(x.t));
        const n = own === "||" && tags.includes("Same as above") ? pv : own; W.set(g, { n, all: tags.includes("All") ? ' data-all="1"' : "" }); if (n !== "||") pv = n; }); }
      const runs = []; rows.forEach((g) => { const n = show.note ? NORM(g.note) : "", last = runs[runs.length - 1];
        if (last && n && last.note === n) last.gs.push(g); else runs.push({ note: n, gs: [g] }); });
      const card = (g, withNote) => { const t = String(g.target || "").trim(), no = /^[0-9]$/.test(t) ? CIRC[+t] : t ? "#" + t : "";
        const rl = roles.filter((k) => (g[k] || []).length).map((k) => `<div class="bt-r"><span class="bt-rl">${ROLE[k]} ${esc(tr(cols[k] || k, lang))}</span><span class="bt-ps">${pills(g[k], lang)}</span></div>`).join("");
        return `<div class="bt-card" data-n="${esc(W.get(g).n)}"${W.get(g).all} style="--c:${esc(g.color || "#ccc")}"><div class="bt-ch">${no ? `<span class="bt-no">${esc(no)}</span>` : ""}<span>${esc(tr(g.tl, lang))}</span></div>${rl}${withNote && String(g.note || "").trim() ? `<div class="bt-n">${noteHtml(g.note, lang, names)}</div>` : ""}</div>`; };
      const body = runs.map((r) => r.gs.length > 1
        ? `${r.gs.map((g) => card(g, false)).join("")}<div class="bt-shared" data-n="${esc(r.gs.map((g) => W.get(g).n).join(""))}"${r.gs.some((g) => W.get(g).all) ? ' data-all="1"' : ""}><div class="bt-sh">📝 ${esc(r.gs.map((g) => { const t = String(g.target || "").trim(); return /^[0-9]$/.test(t) ? CIRC[+t] : t ? "#" + t : ""; }).filter((x, i, a) => a.indexOf(x) === i).join(" "))}</div>${noteHtml(r.gs[0].note, lang, names)}</div>`
        : card(r.gs[0], true)).join("");
      return `<div class="bt-phase"><div class="bt-pht">${esc(tr(sn, lang))}</div><div class="bt-grid">${body}</div></div>`;
    }).join("");
  }
  /* 🔱 TAC: per stage a card for each team (its members only where they are listed — the top stage), the place and the task */
  const TEAMC = ["#c9d8ec", "#d8e6c9", "#ecdcc4", "#dcd2ec"];
  function triHtml(T, lang) {
    const show = T.show || {}, cols = T.cols || {}, G = T.groups || [], teams = listOf(T.teams), names = allNames(G);
    return listOf(T.stages).map((sn, si) => {
      const cards = teams.map((tn, ti) => G.filter((g) => (g.sec || 0) === si && (g.team || 0) === ti).map((g) => {
        const lab = sameTeam(g.tl, tn) ? "" : tr(g.tl, lang), place = [tr(String(g.target || "").trim(), lang), lab].filter(Boolean).join(" · ");
        const rl = ["att", "def", "join"].filter((k) => show[k] && (g[k] || []).length).map((k) => `<div class="bt-r"><span class="bt-rl">${esc(tr(cols[k] || k, lang))}</span><span class="bt-ps">${pills(g[k], lang)}</span></div>`).join("");
        return `<div class="bt-card" data-team="${ti}" data-n="${esc(who(g))}" style="--c:${TEAMC[ti % 4]}"><div class="bt-ch"><span>${esc(tr(tn, lang))}</span></div>${place ? `<div class="bt-place">📍 ${esc(place)}</div>` : ""}${rl}${show.note !== false && String(g.note || "").trim() ? `<div class="bt-n">${noteHtml(g.note, lang, names)}</div>` : ""}</div>`;
      }).join("")).join("");
      if (!cards) return "";
      const [a, b] = tr(sn, lang).split(" — ");
      return `<div class="bt-phase"><div class="bt-pht">${esc(a)}${b ? ` <span class="bt-phs">${esc(b)}</span>` : ""}</div><div class="bt-grid">${cards}</div></div>`;
    }).join("");
  }
  function html(T, lang) {
    if (!T || !Array.isArray(T.groups)) return "";
    const ev = tr(T.ev === "tri" ? "Tri-Alliance Clash" : "Swordland Showdown", lang);
    return `<div class="bt-title">${T.ev === "tri" ? "🔱" : "⚔️"} ${esc(ev)}${T.name ? ` <span class="bt-plan">${esc(T.name)}</span>` : ""}</div>` + pickHtml(T.groups, lang)
      + (T.ev === "tri" ? triHtml(T, lang) : ssHtml(T, lang)) + remHtml(T.rem, lang, tr("Important reminders", lang));
  }

  /* ---- loading: the word list only when a table is on the page ---- */
  let termsP = null;
  const loadTerms = () => termsP || (termsP = typeof BT_ROWS !== "undefined" ? Promise.resolve() : new Promise((ok) => {
    const s = document.createElement("script"); s.src = "data/battle-terms.js?v=" + (window.BT_VER || "1"); s.onload = ok; s.onerror = ok; document.head.appendChild(s);
  }));
  const cache = {};
  const getData = (src) => cache[src] || (cache[src] = fetch(src, { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null)).catch(() => null));
  const pageLang = (el) => {
    const own = el.closest("[data-btlang]"); if (own) return own.dataset.btlang;
    if (typeof currentLang !== "undefined" && currentLang) return currentLang;   // main site (js/app.js)
    const h = (document.documentElement.lang || "en").toLowerCase(); return h.startsWith("zh") ? "zh" : h.slice(0, 2);
  };
  function only(el, me) {
    const key = "|" + me + "|", cards = [...el.querySelectorAll(".bt-card, .bt-shared")];
    const teams = new Set(cards.filter((c) => c.dataset.team != null && (c.dataset.n || "").includes(key)).map((c) => c.dataset.team));   // 🔱 your team, every stage
    const none = (c) => !/[^|]/.test(c.dataset.n || "");   // ⚔️ a building nobody is named in (Sherry 2026-11-15): it concerns everyone, so it stays whoever is picked
    const named = new Set(cards.filter((c) => c.dataset.team != null && !none(c)).map((c) => c.dataset.team));   // 🔱 teams that have at least one name; a team with none concerns everyone too
    cards.forEach((c) => { c.hidden = !!me && !(c.dataset.team != null ? teams.has(c.dataset.team) || !named.has(c.dataset.team) : none(c) || c.dataset.all === "1" || (c.dataset.n || "").includes(key)); });
    el.querySelectorAll(".bt-phase").forEach((p) => { p.hidden = !!me && !p.querySelector(".bt-card:not([hidden])"); });
    el.querySelectorAll(".bt-p").forEach((p) => p.classList.toggle("bt-me", !!me && p.textContent === me));
    const all = el.querySelector(".bt-all"); if (all) all.hidden = !me;
  }
  function fill(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    const lang = pageLang(el);
    el.innerHTML = `<div class="bt-load">…</div>`;
    Promise.all([loadTerms(), getData(el.dataset.src)]).then(([, T]) => {
      el.innerHTML = T ? html(T, lang) : "";
      el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      const sel = el.querySelector(".bt-who select"); if (!sel) return;
      let me = ""; try { me = localStorage.getItem("nxs-bt-me") || ""; } catch (e) {}
      if (me && [...sel.options].some((o) => o.value === me)) { sel.value = me; only(el, me); }
      sel.onchange = () => { try { sel.value ? localStorage.setItem("nxs-bt-me", sel.value) : localStorage.removeItem("nxs-bt-me"); } catch (e) {} only(el, sel.value); };
      const all = el.querySelector(".bt-all"); if (all) all.onclick = (e) => { e.preventDefault(); sel.value = ""; sel.onchange(); };   // 👀 back to the whole table in one tap
    });
  }
  const scan = (root) => (root.querySelectorAll ? root.querySelectorAll(".ann-bt[data-src]:not([data-done])") : []).forEach(fill);
  if (!document.getElementById("bt-css")) {
    const st = document.createElement("style"); st.id = "bt-css";
    st.textContent = `.ann-bt{--bt-bg:var(--panel,#f6f1e4);--bt-card:var(--panel-2,#fffaf0);--bt-ink:var(--text,#2a2118);--bt-mute:var(--text-muted,#6d5c3f);--bt-rule:var(--rule,#c9b892);margin:12px 0;font-size:14px;line-height:1.5;color:var(--bt-ink)}
.ann-bt .bt-title{font-weight:800;font-size:17px;margin:2px 0 10px;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:baseline}
.ann-bt .bt-plan{font-size:13px;font-weight:700;padding:1px 9px;border-radius:999px;border:1px solid var(--bt-rule);color:var(--bt-mute)}
.ann-bt .bt-phase{margin:14px 0}
.ann-bt .bt-pht{font-weight:800;font-size:15px;letter-spacing:.02em;padding:0 0 6px;margin-bottom:8px;border-bottom:2px solid var(--bt-rule)}
.ann-bt .bt-phs{font-weight:600;font-size:13px;color:var(--bt-mute)}
.ann-bt .bt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.ann-bt .bt-card{background:var(--bt-card);border:1px solid var(--bt-rule);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.ann-bt .bt-ch{background:var(--c);color:#1d1710;font-weight:800;padding:7px 10px;display:flex;gap:6px;align-items:center}
.ann-bt .bt-no{font-size:18px;line-height:1}
.ann-bt .bt-place{padding:6px 10px 0;font-weight:700}
.ann-bt .bt-r{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:6px 10px 0}
.ann-bt .bt-rl{font-size:12px;font-weight:700;color:var(--bt-mute);margin-inline-end:4px}
.ann-bt .bt-ps{display:contents}
.ann-bt .bt-p{display:inline-block;padding:1px 8px;border-radius:999px;background:var(--bt-bg);border:1px solid var(--bt-rule);font-weight:600;font-size:13px}
.ann-bt .bt-pt{font-style:italic;font-weight:500}
.ann-bt .bt-n{margin:8px 10px 10px;padding:7px 9px;border-inline-start:3px solid var(--c);background:var(--bt-bg);border-radius:6px;font-size:13px}
.ann-bt .bt-card>.bt-r:last-child,.ann-bt .bt-card>.bt-place:last-child{padding-bottom:10px}
.ann-bt .bt-shared{grid-column:1/-1;background:var(--bt-bg);border:1px dashed var(--bt-rule);border-radius:10px;padding:9px 12px;font-size:13px}
.ann-bt .bt-sh{font-weight:800;margin-bottom:4px}
.ann-bt .bt-gap{display:block;height:6px}
.ann-bt .bt-rem{margin-top:14px;background:var(--bt-card);border:1px solid var(--bt-rule);border-radius:10px;padding:10px 14px}
.ann-bt .bt-remt{font-weight:800;margin-bottom:4px}
.ann-bt .bt-remh{font-weight:800;margin-top:8px}
.ann-bt .bt-reml{position:relative;padding-inline-start:16px;margin:3px 0}
.ann-bt .bt-reml::before{content:"•";position:absolute;inset-inline-start:2px;color:var(--bt-mute)}
.ann-bt .bt-load{opacity:.6}
.ann-bt .bt-who{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:0 0 6px;font-weight:700}
.ann-bt .bt-who select{font:inherit;font-weight:600;padding:5px 8px;border-radius:8px;border:1px solid var(--bt-rule);background:var(--bt-card);color:var(--bt-ink);max-width:100%}
.ann-bt .bt-all{font:inherit;font-weight:700;padding:5px 12px;border-radius:999px;border:1px solid var(--accent,#a84c1a);background:transparent;color:var(--accent,#a84c1a);cursor:pointer}
.ann-bt .bt-p.bt-me{background:var(--accent,#a84c1a);color:var(--accent-ink,#fff);border-color:transparent}
.ann-bt [hidden]{display:none !important}
@media (max-width:520px){.ann-bt .bt-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(st);
  }
  scan(document);
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches && n.matches(".ann-bt[data-src]")) fill(n); scan(n); } })))
    .observe(document.documentElement, { childList: true, subtree: true });
  window.BattleTable = { tr, html, missing: (text, lang) => String(text || "").split(/\r?\n/).filter((l) => trLine(l, lang) == null), load: loadTerms, refresh: (root) => (root || document).querySelectorAll(".ann-bt[data-src]").forEach((el) => { delete el.dataset.done; fill(el); }) };
})();
