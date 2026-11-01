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
  const cellTxt = (s, lang) => esc(tr(s, lang)).replace(/\n/g, "<br>");
  const people = (l, lang) => (l || []).map((x) => x && typeof x === "object" ? tr(x.t, lang) : String(x)).join(", ");
  const listOf = (s) => (Array.isArray(s) ? s : String(s || "").split(/[,，]/)).map((x) => String(x).trim()).filter(Boolean);
  const sameTeam = (a, b) => String(a || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "") === String(b || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  function remHtml(rem, lang, title) {
    const L = String(rem || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
    if (!L.length) return "";
    return `<div class="bt-band">📌 ${esc(title)}</div><div class="bt-rem">${L.map((x) => { const sub = !/^[•*\-]/.test(x);
      return sub ? `<div class="bt-remh">${esc(tr(x, lang))}</div>` : `<div class="bt-reml">• ${esc(tr(x.replace(/^[•*\-]\s*/, ""), lang))}</div>`; }).join("")}</div>`;
  }
  /* ⚔️ Swordland (and any non-🔱 table): one table per phase, one row per building — like the picture */
  function ssHtml(T, lang) {
    const show = T.show || {}, cols = T.cols || {}, G = T.groups || [];
    const pc = ["att", "def", "join"].filter((k) => show[k]), note = show.note && G.some((g) => String(g.note || "").trim());
    const keys = [...(show.target ? ["b"] : []), ...pc, ...(note ? ["note"] : [])];
    const head = keys.map((k) => tr(k === "b" ? cols.target || "Building" : cols[k] || k, lang));
    return listOf(T.stages).map((sn, si) => {
      const rows = G.filter((g) => (g.sec || 0) === si); if (!rows.length) return "";
      const notes = rows.map((g) => NORM(g.note)), span = notes.map(() => 1), skip = notes.map(() => false);
      if (note) for (let i = 0; i < rows.length;) { let j = i + 1; while (notes[i] && j < rows.length && notes[j] === notes[i]) { skip[j] = true; j++; } span[i] = j - i; i = j; }
      // 📱 data-l = the column name, shown in front of the cell when the phone turns each row into a card; a merged note is repeated there (bt-dup)
      const body = rows.map((g, ri) => `<tr style="background:${esc(g.color || "#fff")}">${keys.map((k, ki) => {
        if (k === "b") { const t = String(g.target || "").trim(), n = /^[0-9]$/.test(t) ? CIRC[+t] : t ? "#" + t : ""; return `<td class="bt-b">${esc([n, tr(g.tl, lang)].filter(Boolean).join(" "))}</td>`; }
        if (k === "note") return skip[ri] ? `<td class="bt-note bt-dup">${cellTxt(g.note, lang)}</td>` : `<td class="bt-note"${span[ri] > 1 ? ` rowspan="${span[ri]}"` : ""}>${cellTxt(g.note, lang)}</td>`;
        const v = people(g[k], lang); return `<td data-l="${esc(head[ki])}">${esc(v)}</td>`; }).join("")}</tr>`).join("");
      return `<div class="bt-band">${esc(tr(sn, lang).toUpperCase())}</div><div class="bt-scroll"><table class="bt-t"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
    }).join("");
  }
  /* 🔱 TAC: a row per stage, a column per team; each box = building · label, the team, the task */
  function triHtml(T, lang) {
    const show = T.show || {}, cols = T.cols || {}, G = T.groups || [], teams = listOf(T.teams);
    const box = (si, ti) => G.filter((g) => (g.sec || 0) === si && (g.team || 0) === ti).map((g) => {
      const lab = sameTeam(g.tl, teams[ti]) ? "" : tr(g.tl, lang), head = [tr(String(g.target || "").trim(), lang), lab].filter(Boolean).join(" · ");
      const ppl = ["att", "def", "join"].filter((k) => show[k] && (g[k] || []).length).map((k) => `<div><b>${esc(tr(cols[k] || k, lang))}:</b> ${esc(people(g[k], lang))}</div>`).join("");
      return `<div class="bt-box">${show.target !== false && head ? `<div class="bt-b">${esc(head)}</div>` : ""}${ppl}${show.note !== false && String(g.note || "").trim() ? `<div>${cellTxt(g.note, lang)}</div>` : ""}</div>`;
    }).join("");
    const rows = listOf(T.stages).map((sn, si) => `<tr><th class="bt-st">${esc(tr(sn, lang)).replace(/ — /, "<br>")}</th>${teams.map((t, ti) => { const b = box(si, ti); return `<td data-l="${esc(tr(t, lang))}"${b ? "" : ' class="bt-empty"'}>${b}</td>`; }).join("")}</tr>`).join("");
    return `<div class="bt-scroll"><table class="bt-t bt-tri"><thead><tr><th>${esc(tr(cols.stage || "Stage", lang))}</th>${teams.map((t) => `<th>${esc(tr(t, lang))}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  function html(T, lang) {
    if (!T || !Array.isArray(T.groups)) return "";
    const ev = tr(T.ev === "tri" ? "Tri-Alliance Clash" : "Swordland Showdown", lang);
    return `<div class="bt-title">${T.ev === "tri" ? "🔱" : "⚔️"} ${esc(ev)}${T.name ? ` · ${esc(T.name)}` : ""}</div>`
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
  function fill(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    const lang = pageLang(el);
    el.innerHTML = `<div class="bt-load">…</div>`;
    Promise.all([loadTerms(), getData(el.dataset.src)]).then(([, T]) => {
      el.innerHTML = T ? html(T, lang) : "";
      el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    });
  }
  const scan = (root) => (root.querySelectorAll ? root.querySelectorAll(".ann-bt[data-src]:not([data-done])") : []).forEach(fill);
  if (!document.getElementById("bt-css")) {
    const st = document.createElement("style"); st.id = "bt-css";
    st.textContent = `.ann-bt{margin:10px 0;font-size:14px;line-height:1.45}
.ann-bt .bt-title{font-weight:700;font-size:16px;margin:2px 0 8px;color:inherit}
.ann-bt .bt-band{background:#2b2b2b;color:#fff;font-weight:700;padding:6px 10px;border-radius:6px 6px 0 0;margin-top:10px}
.ann-bt .bt-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ann-bt table.bt-t{border-collapse:collapse;width:100%;min-width:520px;background:#fff;color:#111}
.ann-bt .bt-t th,.ann-bt .bt-t td{border:1px solid #9a9a9a;padding:6px 8px;vertical-align:top;text-align:start}
.ann-bt .bt-t thead th{background:#f2f2f2;color:#000}
.ann-bt .bt-b{font-weight:700}
.ann-bt .bt-note{min-width:220px}
.ann-bt .bt-tri thead th{background:#2c5175;color:#fff}
.ann-bt .bt-tri th.bt-st{background:#dce6f1;color:#111;min-width:120px}
.ann-bt .bt-tri tbody tr:nth-child(odd) td{background:#eef2f8}
.ann-bt .bt-box+.bt-box{margin-top:8px;padding-top:8px;border-top:1px dashed #b8c4d4}
.ann-bt .bt-rem{background:#fafafa;color:#111;border:1px solid #9a9a9a;border-top:0;padding:8px 12px}
.ann-bt .bt-remh{font-weight:700;margin-top:4px}
.ann-bt .bt-load{opacity:.6}
.ann-bt .bt-dup{display:none}
@media (max-width:640px){
.ann-bt table.bt-t{min-width:0}
.ann-bt .bt-t thead{display:none}
.ann-bt .bt-t,.ann-bt .bt-t tbody,.ann-bt .bt-t tr,.ann-bt .bt-t td,.ann-bt .bt-t th{display:block;width:auto}
.ann-bt .bt-t tr{border:1px solid #9a9a9a;border-top:0}
.ann-bt .bt-t td,.ann-bt .bt-t th{border:0;padding:3px 10px}
.ann-bt .bt-t td:empty,.ann-bt .bt-t td.bt-empty{display:none}
.ann-bt .bt-t td.bt-b{padding-top:8px}
.ann-bt .bt-t td:last-child{padding-bottom:8px}
.ann-bt .bt-t td[data-l]::before{content:attr(data-l) ": ";font-weight:700}
.ann-bt .bt-t td.bt-dup{display:block}
.ann-bt .bt-tri th.bt-st{padding:8px 10px}
.ann-bt .bt-tri td{border-top:1px dashed #b8c4d4 !important}
.ann-bt .bt-tri td[data-l]::before{display:block;content:attr(data-l)}
}`;
    document.head.appendChild(st);
  }
  scan(document);
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches && n.matches(".ann-bt[data-src]")) fill(n); scan(n); } })))
    .observe(document.documentElement, { childList: true, subtree: true });
  window.BattleTable = { tr, html, missing: (text, lang) => String(text || "").split(/\r?\n/).filter((l) => trLine(l, lang) == null), load: loadTerms, refresh: (root) => (root || document).querySelectorAll(".ann-bt[data-src]").forEach((el) => { delete el.dataset.done; fill(el); }) };
})();
