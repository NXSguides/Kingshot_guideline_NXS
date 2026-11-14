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
    if (el._ssPaint) el._ssPaint(me);   // 🗺️ your name lit up on the map too
  }

  /* 🗺️ Swordland map with the names on it (Sherry 2026-11-15): when the announcement that carries a ⚔️ table also shows the Swordland map
     (figures/SS_map.webp), the picture is redrawn with a box per building — its number and name, then who attacks / defends / joins in each phase —
     tied to the building by a line. It stays a real picture (tap to zoom, save). Boxes: [x, y, width, line-to x, line-to y] on the 1448 × 1086 map;
     the blue Safe Zone (left) is ours, so "near home" is the left Sanctum (3.1) and "near enemy" the right one (3.2). */
  const SSM = { W: 1448, H: 1086, at: { bell: [40, 28, 330, 455, 150], s31: [15, 250, 252, 292, 430], s32: [1183, 628, 258, 1150, 640], stables: [1085, 874, 340, 1012, 945],
    abbey: [18, 762, 282, 300, 662], merc: [852, 186, 272, 836, 242], hall: [335, 696, 268, 617, 790], shrine: [552, 536, 350, 726, 522] } };
  const ssKey = (g, seen) => { const t = String(g.target || "").trim(), l = String(g.tl || "");
    return t === "1" ? "stables" : t === "2" ? "bell" : t === "4" ? "abbey" : t === "5" ? "merc" : t === "6" ? "hall" : t === "7" ? "shrine" : t === "3" ? (/enemy/i.test(l) ? "s32" : /home/i.test(l) ? "s31" : seen.s31 ? "s32" : "s31") : ""; };
  const SS_COL = { att: "#c0262d", def: "#1d4ed8", join: "#15803d" };
  function ssBoxes(T, lang) {
    const B = {}, st = listOf(T.stages), cols = T.cols || {}, show = T.show || {};
    st.forEach((sn, si) => { const seen = {}; (T.groups || []).filter((g) => (g.sec || 0) === si).forEach((g) => { const k = ssKey(g, seen); if (!k || !SSM.at[k]) return; seen[k] = 1;
      const roles = ["att", "def", "join"].filter((r) => show[r] !== false && (g[r] || []).length).map((r) => [r, tr(cols[r] || r, lang), (g[r] || []).map((x) => x && typeof x === "object" ? { t: tr(x.t, lang) } : String(x))]);
      if (!roles.length) return; const t = String(g.target || "").trim();
      B[k] = B[k] || { title: (/^[0-9]$/.test(t) ? CIRC[+t] + " " : "") + tr(g.tl, lang), parts: [] }; B[k].parts.push({ si, stage: tr(sn, lang), roles }); }); });
    return B;
  }
  function ssDraw(cv, im, B, me, rtl) {
    const g = cv.getContext("2d"), F = '"Segoe UI","Helvetica Neue",Arial,"Noto Sans","PingFang TC","Microsoft JhengHei","Noto Sans CJK TC","Malgun Gothic",sans-serif';
    cv.width = SSM.W; cv.height = SSM.H; g.drawImage(im, 0, 0, SSM.W, SSM.H); g.textBaseline = "alphabetic";
    const PAD = 10, LH = 25, font = (w, sz) => { g.font = `${w} ${sz}px ${F}`; };
    for (const [k, b] of Object.entries(B)) {
      let [x, y, w, ax, ay] = SSM.at[k]; const inner = w - PAD * 2, ops = [];   // ops: what to paint, laid out first so the height is known
      font(800, 21); const tl = []; { let cur = ""; for (const wd of b.title.split(" ")) { const t = cur ? cur + " " + wd : wd; if (cur && g.measureText(t).width > inner) { tl.push(cur); cur = wd; } else cur = t; } if (cur) tl.push(cur); }
      const headH = tl.length * 25 + 10; let cy = headH + 6;
      b.parts.forEach((p, pi) => {
        if (pi > 0 || p.si > 1) { cy += 3; ops.push(["stage", p.stage, cy + 17]); cy += 23; }   // a later phase of the same building (e.g. Stay behind) gets its own caption
        for (const [r, label, items] of p.roles) {
          font(800, 19); const lab = label + ":", lw = g.measureText(lab).width + 8, ind = lw > inner * .5 ? 14 : lw; let lx = lw > inner * .5 ? inner + 1 : lw, ly = cy + 19; ops.push(["lab", lab, 0, ly, SS_COL[r]]);
          items.forEach((it, i) => { const tag = typeof it === "object", txt = (tag ? it.t : it) + (i < items.length - 1 ? "," : ""); font(tag ? "italic 700" : 700, 19); const tw = g.measureText(txt).width;
            if (lx + tw > inner && lx > ind) { lx = ind; ly += LH; } ops.push(["nm", txt, lx, ly, tag, !tag && it === me]); lx += tw + 6; });
          cy = ly + 8; }
      });
      const h = cy + 6; y = Math.max(4, Math.min(y, SSM.H - h - 4));
      // the line to the building: from the box side that faces it
      const cx = x + w / 2, cyy = y + h / 2, sx = ax < x ? x : ax > x + w ? x + w : Math.max(x + 12, Math.min(x + w - 12, ax)), sy = ay < y ? y : ay > y + h ? y + h : Math.max(y + 12, Math.min(y + h - 12, ay));
      g.lineCap = "round"; g.strokeStyle = "#fff"; g.lineWidth = 7; g.beginPath(); g.moveTo(sx, sy); g.lineTo(ax, ay); g.stroke(); g.strokeStyle = "#c026d3"; g.lineWidth = 3.5; g.beginPath(); g.moveTo(sx, sy); g.lineTo(ax, ay); g.stroke();
      g.fillStyle = "#c026d3"; g.beginPath(); g.arc(ax, ay, 6, 0, 7); g.fill(); g.strokeStyle = "#fff"; g.lineWidth = 2; g.stroke();
      const rr = (X, Y, W2, H2, R) => { g.beginPath(); g.moveTo(X + R, Y); g.arcTo(X + W2, Y, X + W2, Y + H2, R); g.arcTo(X + W2, Y + H2, X, Y + H2, R); g.arcTo(X, Y + H2, X, Y, R); g.arcTo(X, Y, X + W2, Y, R); g.closePath(); };
      g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 10; g.shadowOffsetY = 3; rr(x, y, w, h, 12); g.fillStyle = "rgba(255,250,252,.96)"; g.fill(); g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
      g.save(); rr(x, y, w, h, 12); g.clip(); g.fillStyle = "#3a0d47"; g.fillRect(x, y, w, headH); g.restore(); rr(x, y, w, h, 12); g.strokeStyle = "#c026d3"; g.lineWidth = 3; g.stroke();
      const X0 = (dx, tw) => rtl ? x + w - PAD - dx - tw : x + PAD + dx;
      font(800, 21); g.fillStyle = "#fff"; tl.forEach((t, i) => g.fillText(t, X0(0, g.measureText(t).width), y + 26 + i * 25));
      for (const o of ops) {
        if (o[0] === "stage") { font(800, 15); const tw = g.measureText(o[1]).width; g.fillStyle = "#7a5a86"; g.fillText(o[1], X0(0, tw), y + o[2]); g.fillRect(x + PAD, y + o[2] - 19, inner, 1.5); }
        else if (o[0] === "lab") { font(800, 19); const tw = g.measureText(o[1]).width; g.fillStyle = o[4]; g.globalAlpha = .13; rr(X0(0, tw) - 4, y + o[3] - 18, tw + 8, 24, 6); g.fill(); g.globalAlpha = 1; g.fillText(o[1], X0(0, tw), y + o[3]); }
        else { font(o[4] ? "italic 700" : 700, 19); const tw = g.measureText(o[1]).width, X = X0(o[2], tw); if (o[5]) { g.fillStyle = "#f59e0b"; rr(X - 3, y + o[3] - 18, tw + 6, 24, 6); g.fill(); } g.fillStyle = o[4] ? "#6b4a2a" : "#1c1420"; g.fillText(o[1], X, y + o[3]); }
      }
    }
  }
  function ssMap(el, T, lang) {
    if (!T || T.ev === "tri" || !Array.isArray(T.groups)) return;
    const host = el.closest(".ann-body, .ann-text, .doc, main") || document, img = host.querySelector('img[src*="SS_map."], img[data-ssbase]'); if (!img) return;
    const base = img.dataset.ssbase || img.getAttribute("src"); img.dataset.ssbase = base; const B = ssBoxes(T, lang); if (!Object.keys(B).length) return;
    const im = new Image(); let ready = null; im.src = base;
    const paint = (me) => { ready = ready || (im.decode ? im.decode().catch(() => new Promise((ok) => { im.onload = ok; im.onerror = ok; })) : new Promise((ok) => { im.onload = ok; im.onerror = ok; }));
      ready.then(() => { if (!im.naturalWidth || !img.isConnected) return; const cv = document.createElement("canvas"); try { ssDraw(cv, im, B, me || "", lang === "ar"); cv.toBlob((bl) => { if (!bl) return; const old = img.dataset.ssurl; const u = URL.createObjectURL(bl); img.dataset.ssurl = u; img.src = u; if (old) setTimeout(() => URL.revokeObjectURL(old), 3000); }, "image/jpeg", .9); } catch (e) {} }); };
    el._ssPaint = paint; let me = ""; try { me = localStorage.getItem("nxs-bt-me") || ""; } catch (e) {} paint(el.querySelector(`.bt-who option[value="${(window.CSS && CSS.escape ? CSS.escape(me) : me)}"]`) ? me : "");
  }
  function fill(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    const lang = pageLang(el);
    el.innerHTML = `<div class="bt-load">…</div>`;
    Promise.all([loadTerms(), getData(el.dataset.src)]).then(([, T]) => {
      el.innerHTML = T ? html(T, lang) : "";
      el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      ssMap(el, T, lang);
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
