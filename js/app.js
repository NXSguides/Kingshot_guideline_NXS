const HTML_LANG = Object.fromEntries(LANGS.map((l) => [l.code, l.htmlLang]));
/* Site title shown at the top of every page, in every language */
const SITE_TITLE = "NXS Guidelines";
const STORAGE_KEYS = { lang: "ks-lang", theme: "ks-theme", guide: "ks-guide" };

let currentLang = "en";
let currentGuide = Object.keys(GUIDES)[0];
let langChosen = false; // false = show the language picker first

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
}

function pickLang(code) {
  return LANGS.some((l) => l.code === code) ? code : "en";
}

function pickGuide(id) {
  return GUIDES[id] ? id : Object.keys(GUIDES)[0];
}

function t(map, fallbackLang = "en") {
  if (!map) return "";
  return map[currentLang] || map[fallbackLang] || map.zh || "";
}

function heroName(id) {
  if (!id) return "…";
  return (HEROES[id] && t(HEROES[id])) || id;
}

function formatHeroes(heroes) {
  if (!heroes) return "";
  if (typeof heroes === "string") {
    return heroes
      .split(/\s*·\s*/)
      .map((part) => heroName(part.trim()))
      .join(" · ");
  }
  return heroes.map((id) => heroName(id)).join(" · ");
}

function readHash() {
  const hash = (location.hash || "").replace(/^#\/?/, "");
  const [lang, guide] = hash.split("/");
  if (lang) { currentLang = pickLang(lang); langChosen = true; }
  if (guide) currentGuide = pickGuide(guide);
}

function writeHash() {
  const next = `#/${currentLang}/${currentGuide}`;
  if (location.hash !== next) {
    try { history.replaceState(null, "", next); } catch (e) { /* ignore */ }
  }
}

/* true when opened from the home-screen app (PWA), not from a browser tab */
function isInstalledApp() {
  try {
    return window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      window.navigator.standalone === true;
  } catch (e) { return false; }
}

function restorePrefs() {
  // Opening the plain site link in a browser always starts on the language picker.
  // A shared link with a hash (e.g. #/ko/swordland-showdown) still opens that page.
  readHash();
  // The home-screen app remembers the last language chosen in it.
  if (!langChosen && isInstalledApp()) {
    const saved = safeGet(STORAGE_KEYS.lang);
    if (saved && LANGS.some((l) => l.code === saved)) {
      currentLang = saved;
      currentGuide = "recent-events";
      langChosen = true;
    }
  }
}

function persistPrefs() {
  writeHash();
  if (langChosen) safeSet(STORAGE_KEYS.lang, currentLang);
}

function applyTheme(theme) {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  if (theme === "light" || theme === "dark") {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  toggle.textContent = theme === "dark" ? "☀" : "☾";
}

function initTheme() {
  const saved = safeGet(STORAGE_KEYS.theme);
  applyTheme(saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let next;
    if (cur === "dark") next = "light";
    else if (cur === "light") next = "dark";
    else next = systemDark ? "light" : "dark";
    safeSet(STORAGE_KEYS.theme, next);
    applyTheme(next);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---- 通用區塊渲染（blocks） ---------------------------------------- */

function term(id) { return GLOSSARY[id] ? t(GLOSSARY[id]) : id; }

/* 跳脫 HTML → {id} 換成遊戲用語 → **粗體** */
function rich(str) {
  return escapeHtml(str)
    .replace(/\{(\w+)\}/g, (m, id) => (GLOSSARY[id] ? escapeHtml(term(id)) : m))
    .replace(/\[\[link:([\w-]+)\]\]/g, (m, guideId) => {
      const target = GUIDES[guideId];
      if (!target) return "";
      const label = escapeHtml(t(target.name) || guideId);
      return `<button type="button" class="guide-link-btn ann-link-btn" onclick="switchGuide('${guideId}')">
        <span class="emoji">${target.emoji}</span>
        <span dir="auto">${label}</span>
        <span class="arrow">›</span>
      </button>`;
    })
    .replace(/\[\[img:([\w./-]+)\]\]/g, (m, src) => `<img class="ann-img" src="${src}" loading="lazy" style="display:block;max-width:100%;height:auto;margin:8px 0">`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+)/g, (m, url) => {
      // Long links wrap instead of running off the screen; "https://" and the trailing "/" are hidden
      const shown = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      return `<a href="${url}" target="_blank" rel="noopener" style="overflow-wrap:anywhere;word-break:break-word">${shown}</a>`;
    });
}

function fmt(n) {
  const loc = (HTML_LANG[currentLang] || "en") + (currentLang === "ar" ? "-u-nu-latn" : "");
  return n.toLocaleString(loc);
}

const ul = (items) =>
  `<ul class="prep-list">${items.map((i) => `<li>${rich(i)}</li>`).join("")}</ul>`;

function youtubeId(u) {
  const str = String(u || "").trim();
  const m = str.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(str) ? str : null;
}

const EVENT_SCHEDULES = {
  "eternity-reach":       { anchor: Date.UTC(2026, 8, 22), periodDays: 14, activeDays: 1 },
  "viking-vengeance":     { anchor: Date.UTC(2026, 8, 22), periodDays: 14, activeDays: 3 },
  "swordland-showdown":   { anchor: Date.UTC(2026, 8, 28), periodDays: 14, activeDays: 7 },
  "all-out": { anchor: Date.UTC(2026, 8, 25), periodDays: 28, activeDays: 2 },
  "fishing-tournament": { anchor: Date.UTC(2026, 8, 29), periodDays: 28, activeDays: 3 },
  "tri-alliance-clash": { anchor: Date.UTC(2026, 8, 28), periodDays: 28, activeDays: 6 },
  "kvk": { anchor: Date.UTC(2026, 9, 5), periodDays: 28, activeDays: 8 },
  "hero-roulette": { anchor: Date.UTC(2026, 9, 6), periodDays: 14, activeDays: 3 }
};

function isEventActive(key) {
  const sched = EVENT_SCHEDULES[key];
  if (!sched) return true; // 沒設定排程的攻略一律顯示
  const msPerDay = 86400000;
  const diffDays = Math.floor((Date.now() - sched.anchor) / msPerDay);
  if (diffDays < 0) return false;
  return (diffDays % sched.periodDays) < sched.activeDays;
}

const BLOCKS = {
  h: (b) => `<h3 class="section-h">${rich(b.text)}</h3>`,
  sub: (b) => `<h4 class="sub-h">${rich(b.text)}</h4>`,
  p: (b) => `<p>${rich(b.text)}</p>`,
  list: (b) => ul(b.items),
  callout: (b) => `<div class="callout flat">${rich(b.text)}</div>`,
  img: (b) => `<img class="fig" src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt || "")}" loading="lazy">`,
  video: (b) => {
    const cap = b.caption ? `<p class="legend">${rich(b.caption)}</p>` : "";
    const yt = b.url ? youtubeId(b.url) : null;
    if (yt) {
      return `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${escapeHtml(b.alt || "Video")}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>${cap}`;
    }
    if (b.src) {
      return `<video class="fig" controls playsinline preload="metadata" src="${escapeHtml(b.src)}"></video>${cap}`;
    }
    return "";
  },

  /* Highlighted summary box: a bold title and a bullet list, with an accent border so it stands out */
  box: (b) => `<div class="callout flat" style="border:2px solid var(--accent);border-radius:12px">
    ${b.title ? `<div style="font-weight:800;font-size:1.05em;margin-bottom:.4em">${rich(b.title)}</div>` : ""}${ul(b.items || [])}</div>`,

  /* Numbered steps, each with an optional screenshot (screenshots of any shape are shown at a similar size) */
  steps: (b) => `<ol class="shot-steps" style="padding-inline-start:1.4em;margin:0 0 1em">${(b.items || []).map((it) => `
    <li style="margin:0 0 1.2em">${rich(it.text)}${it.img ? `
      <img src="${escapeHtml(it.img)}" alt="${escapeHtml(it.alt || "")}" loading="lazy" onerror="this.remove()"
        style="display:block;margin:.6em auto 0;width:auto;height:auto;max-width:min(100%,360px);max-height:420px;border-radius:12px;border:1px solid var(--rule);box-shadow:0 2px 8px var(--shadow)">` : ""}
    </li>`).join("")}</ol>`,

  cards: (b) => `<div class="card-grid">${(b.items || []).map((c) => `
    <div class="info-card">
      ${c.img ? `<img class="info-card-img" src="${escapeHtml(c.img)}" alt="${escapeHtml(c.alt || "")}" loading="lazy" onerror="this.remove()">` : ""}
      <div class="info-card-body">
        ${c.title ? `<div class="info-card-title">${rich(c.title)}</div>` : ""}
        ${c.meta ? `<div class="info-card-meta">${rich(c.meta)}</div>` : ""}
        ${c.lines ? ul(c.lines) : ""}
      </div>
    </div>`).join("")}</div>`,

  buildings: (b, g) => {
    const legend = b.legend ? `<p class="legend">${rich(b.legend)}</p>` : "";
    return legend + g.buildings.map((x) => {
      if (x.gather) {
        return `<div class="bld-card"><div class="bld-head"><span class="bld-name">${rich(`{${x.id}}`)}</span></div>
          <div class="bld-meta">${rich(b.gather)}</div></div>`;
      }
      const c = b.cols;
      return `<div class="bld-card">
        <div class="bld-head">
          <span class="bld-name">${rich(`{${x.id}}`)}</span>
          <span class="tag pr-${x.priority}">${escapeHtml(b.priority[x.priority])}</span>
        </div>
        <div class="bld-pts">
          <div><span>${escapeHtml(c.first)}</span><bdi dir="ltr">${fmt(x.first[0])} / ${fmt(x.first[1])}</bdi></div>
          <div><span>${escapeHtml(c.hold)}</span><bdi dir="ltr">+${fmt(x.hold[0])} / +${fmt(x.hold[1])}</bdi> <bdi dir="ltr">${escapeHtml(c.perMin)}</bdi></div>
        </div>
        <div class="bld-meta">${escapeHtml(c.open)}${escapeHtml(c.sep != null ? c.sep : "：")}${x.opens} ${escapeHtml(c.min)} · ${rich(b.purposes[x.id] || "")}</div>
      </div>`;
    }).join("");
  },

  zones: (b, g) => g.zones.map((z) => {
    const items = z.items.map((i) =>
      `<li>${i.n ? `#${i.n} ` : ""}${rich(`{${i.id}}`)}${i.x ? ` ×${i.x}` : ""}</li>`).join("");
    return `<div class="zone-card zone-${z.color}"><div class="zone-title">${rich(b.labels[z.color])}</div><ul>${items}</ul></div>`;
  }).join(""),

  timeline: (b) => b.items.map((it) => {
    const groups = (it.groups || []).map((gp) =>
      `${gp.title ? `<div class="tl-sub">${rich(gp.title)}</div>` : ""}${ul(gp.lines)}`).join("");
    return `<div class="tl-card">
      <div class="tl-head"><span class="tl-time">${escapeHtml(it.time)}</span><span>${rich(it.title)}</span></div>
      ${it.lines ? ul(it.lines) : ""}${groups}
      ${it.warn ? `<div class="callout flat">${rich(it.warn)}</div>` : ""}
    </div>`;
  }).join(""),
  leaders: (b, g) => (g.leaders || []).map((gen, i) => {
    const rows = gen.rows.map((r, j) => {
      const note = (b.notes && b.notes[i] && b.notes[i][j]) || "";
      const tagLabel = (UI.tags[r.tag] && t(UI.tags[r.tag])) || r.tag.toUpperCase();
      const ratio = r.ratio ? `<span class="ratio">${escapeHtml(r.ratio)}</span>` : "";
      const img = r.img ? `<img class="lineup-img" src="${escapeHtml(r.img)}" alt="${escapeHtml(formatHeroes(r.heroes))}" loading="lazy" onerror="this.remove()">` : "";
      return `
        <div class="lineup-row">
          <div class="lineup-left">
            <span class="tag ${escapeHtml(r.tag)}">${escapeHtml(tagLabel)}</span>
            <span class="heroes">${escapeHtml(formatHeroes(r.heroes))}</span>
          </div>
          ${ratio}
        </div>
        ${img}
        ${note ? `<div class="gen-note">${rich(note)}</div>` : ""}`;
    }).join("");
    return `<div class="gen-card"><div class="gen-label">${escapeHtml((b.gens && b.gens[i]) || "")}</div>${rows}</div>`;
  }).join(""),
  joiners: (b, g) => `<div class="joiner-list">${(g.joiners || []).map((j) => {
    const name = heroName(j.hero || j.name);
    const role = (UI.roles[j.role] && t(UI.roles[j.role])) || "";
    const initial = escapeHtml((name || "?").charAt(0));
    const avatar = j.img
      ? `<img src="${escapeHtml(j.img)}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.replaceWith('${initial}')">`
      : initial;
    return `<div class="joiner-card">
      <div class="joiner-avatar" aria-hidden="true">${avatar}</div>
      <div class="joiner-meta">
        <div class="joiner-name">${escapeHtml(name)}</div>
        ${role ? `<div class="joiner-role">${escapeHtml(role)}</div>` : ""}
      </div>
    </div>`;
  }).join("")}</div>`,
  guideLink: (b) => {
    if (!isEventActive(b.guide)) return "";
    const target = GUIDES[b.guide];
    if (!target) return "";
    const label = escapeHtml(t(target.name) || b.guide);
    return `<button type="button" class="guide-link-btn" onclick="switchGuide('${b.guide}')">
      <span class="emoji">${target.emoji}</span>
      <span dir="auto">${label}</span>
      <span class="arrow">›</span>
    </button>`;
  },
  announcements: () => {
    if (!announcements.length) return "";
    if (currentAnnIndex >= announcements.length) currentAnnIndex = 0;
    const tabs = announcements.map((a, i) => `
      <button type="button" class="ann-tab${i === currentAnnIndex ? " active" : ""}" onclick="selectAnnouncement(${i})">
        ${escapeHtml(annLabel(a))}
      </button>
    `).join("");
    const a = announcements[currentAnnIndex];
    const text = a.content[currentLang] || a.content.en || Object.values(a.content)[0] || "";
    const imgs = (a.images || []).map((src) => `<img class="ann-img" src="${escapeHtml(src)}" loading="lazy">`).join("");
    return `
      <div class="ann-board">
        <div class="ann-tabs">${tabs}</div>
        <div class="ann-body">
          <div class="ann-meta">
            <span>${escapeHtml(a.author)}</span>
            <span>${new Date(a.createdAt).toLocaleDateString(HTML_LANG[currentLang] || "en")}</span>
          </div>
          <div class="ann-text">${rich(text)}</div>
          ${imgs}
        </div>
      </div>
    `;
  },
  checklist: (b) => {
  const head = `<tr><th></th>${b.days.map((d) => `<th>${d}</th>`).join("")}</tr>`;
  const rows = b.rows.map((r) => `
    <tr>
      <td class="chk-label">${rich(r.label)}</td>
      ${r.icons.map((ic) => `<td class="chk-icon">${ic}</td>`).join("")}
    </tr>
  `).join("");
  const legend = b.legend ? `
    <div class="chk-legend">
      ${b.legend.map((l) => `<span>${l.icon} ${rich(l.label)}</span>`).join("")}
    </div>` : "";
  return `
    <div class="chk-wrap">
      <table class="chk-table">${head}${rows}</table>
    </div>
    ${legend}
  `;
}
};

/* ---- 荒野冒險問答：按顏色／人物篩選 --------------------------------- */
const JQ_COLORS = { gold: "#d4a017", purple: "#8e5bd0", blue: "#3a7bd5", grey: "#8a8a8a", none: "#c8bfae" };
const JQ_PEOPLE = ["pan","roman","valora","cassia","guinevere","wilson","aena","isnor","petra","zoe","quinn","edwin","gordon","hilde","olive","diana","grid","longFei"];
const JQ_TOPICS = ["vikings","cesares","survivor","beast","mercenaries","trade","fishing","cooking","games","other"];
let jqState = { c: "", tag: "", q: "", open: -1 };

function jqText(s) {
  const tr = (typeof JOURNEY_TR !== "undefined" && JOURNEY_TR[currentLang]) || {};
  const out = String(tr[s] || s).replace(/\{(\w+)\}/g, (m, id) => (GLOSSARY[id] ? term(id) : m));
  return out.charAt(0).toLocaleUpperCase(HTML_LANG[currentLang] || "en") + out.slice(1);
}
function jqUI(k) { return t(JOURNEY_UI[k]); }
function jqTagLabel(tag) { return JOURNEY_UI.tags[tag] ? t(JOURNEY_UI.tags[tag]) : jqText(`{${tag}}`); }

function jqMatches(e) {
  if (jqState.c && (e.c || "none") !== jqState.c) return false;
  if (jqState.tag && !e.tags.includes(jqState.tag)) return false;
  if (jqState.q) {
    const q = jqState.q.toLocaleLowerCase();
    const hay = [e.t, ...e.o.flat()].filter((x) => typeof x === "string")
      .map((s) => jqText(s) + " " + s.replace(/\{(\w+)\}/g, (m, id) => (GLOSSARY[id] ? (GLOSSARY[id].en || "") : m)))
      .join(" ").toLocaleLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function jqChip(label, active, onclick, dot) {
  const d = dot ? `<span class="jq-dot" style="background:${dot}"></span>` : "";
  return `<button type="button" class="jq-chip${active ? " on" : ""}" onclick="${onclick}">${d}<span dir="auto">${escapeHtml(label)}</span></button>`;
}

function jqList() {
  const items = JOURNEY.map((e, i) => [e, i]).filter(([e]) => jqMatches(e));
  if (!items.length) return `<p class="jq-empty">${escapeHtml(jqUI("none"))}</p>`;
  const order = { gold: 0, purple: 1, blue: 2, grey: 3, "": 4 };
  items.sort((a, b) => order[a[0].c] - order[b[0].c] || a[1] - b[1]);
  return `<div class="jq-count">${escapeHtml(jqUI("count").replace("{n}", items.length))}</div>` + items.map(([e, i]) => {
    const col = JQ_COLORS[e.c || "none"];
    const open = jqState.open === i;
    const hasBest = e.o.some((o) => o[2]);
    const opts = !open ? "" : `<div class="jq-opts">${e.o.map((o) => `
        <div class="jq-opt${o[2] ? " best" : ""}">
          <div class="jq-opt-t" dir="auto">${o[2] ? "✅ " : ""}${escapeHtml(jqText(o[0]))}</div>
          <div class="jq-opt-r" dir="auto">${escapeHtml(jqText(o[1]))}</div>
        </div>`).join("")}
        ${hasBest ? "" : `<div class="jq-nobest">${escapeHtml(jqUI("noBest"))}</div>`}
      </div>`;
    return `<div class="jq-card${open ? " open" : ""}" style="border-inline-start-color:${col}">
      <button type="button" class="jq-head" onclick="jqToggle(${i})">
        <span class="jq-dot" style="background:${col}"></span>
        <span class="jq-title" dir="auto">${escapeHtml(jqText(e.t))}</span>
        <span class="jq-kind">${escapeHtml(t(JOURNEY_UI.kinds[e.k]))}</span>
        <span class="jq-arrow">${open ? "▾" : (currentLang === "ar" ? "◂" : "▸")}</span>
      </button>${opts}
    </div>`;
  }).join("");
}

function jqFilters() {
  const colors = [jqChip(jqUI("all"), !jqState.c, "jqSet('c','')")]
    .concat(["gold","purple","blue","grey","none"].map((c) => jqChip(t(JOURNEY_UI.colors[c]), jqState.c === c, `jqSet('c','${c}')`, JQ_COLORS[c])));
  const used = new Set(JOURNEY.flatMap((e) => e.tags));
  const people = JQ_PEOPLE.filter((p) => used.has(p)).map((p) => jqChip(jqTagLabel(p), jqState.tag === p, `jqSet('tag','${p}')`));
  const topics = JQ_TOPICS.filter((p) => used.has(p)).map((p) => jqChip(jqTagLabel(p), jqState.tag === p, `jqSet('tag','${p}')`));
  return `
    <div class="jq-label">${escapeHtml(jqUI("color"))}</div><div class="jq-chips">${colors.join("")}</div>
    <div class="jq-label">${escapeHtml(jqUI("people"))}</div><div class="jq-chips">${jqChip(jqUI("all"), !jqState.tag, "jqSet('tag','')")}${people.join("")}</div>
    <div class="jq-label">${escapeHtml(jqUI("topics"))}</div><div class="jq-chips">${topics.join("")}</div>`;
}

function jqRefresh() {
  const f = document.getElementById("jqFilters"), l = document.getElementById("jqList");
  if (f) f.innerHTML = jqFilters();
  if (l) l.innerHTML = jqList();
}
function jqSet(k, v) { jqState[k] = jqState[k] === v && k === "tag" ? "" : v; jqState.open = -1; jqRefresh(); }
function jqToggle(i) { jqState.open = jqState.open === i ? -1 : i; jqRefresh(); }
function jqSearch(v) { jqState.q = v.trim(); jqState.open = -1; const l = document.getElementById("jqList"); if (l) l.innerHTML = jqList(); }

const JQ_CSS = `
.jq{margin:8px 0 16px}
.jq-search{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--rule);background:var(--panel);color:var(--text);font-size:15px;margin-bottom:6px}
.jq-label{font-size:12px;color:var(--text-muted);margin:8px 0 4px;font-weight:600}
.jq-chips{display:flex;flex-wrap:wrap;gap:6px}
.jq-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;border:1px solid var(--rule);background:var(--panel);color:var(--text);font-size:13px;cursor:pointer}
.jq-chip.on{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.jq-dot{width:11px;height:11px;border-radius:50%;flex:none;display:inline-block;box-shadow:0 0 0 1px rgba(0,0,0,.15)}
.jq-count{font-size:12px;color:var(--text-muted);margin:12px 0 6px}
.jq-empty{color:var(--text-muted)}
.jq-card{border:1px solid var(--rule);border-inline-start-width:6px;border-radius:10px;background:var(--panel);margin-bottom:6px;overflow:hidden}
.jq-head{display:flex;align-items:center;gap:8px;width:100%;padding:10px 12px;background:none;border:0;color:var(--text);font-size:15px;text-align:start;cursor:pointer}
.jq-title{flex:1;font-weight:600;min-width:0}
.jq-kind{font-size:11px;color:var(--text-muted);white-space:nowrap}
.jq-arrow{color:var(--text-muted)}
.jq-opts{padding:0 12px 10px;display:flex;flex-direction:column;gap:6px}
.jq-opt{padding:8px 10px;border-radius:8px;background:var(--panel-2);border:1px solid transparent}
.jq-opt.best{border-color:var(--tag-alt);box-shadow:inset 3px 0 0 var(--tag-alt)}
.jq-opt-t{font-weight:600}
.jq-opt.best .jq-opt-t{color:var(--tag-alt)}
.jq-opt-r{font-size:13px;color:var(--text-muted);margin-top:2px}
.jq-nobest{font-size:12px;color:var(--text-muted)}
`;

BLOCKS.journey = () => {
  if (typeof JOURNEY === "undefined") return "";
  if (!document.getElementById("jqStyle")) {
    const st = document.createElement("style"); st.id = "jqStyle"; st.textContent = JQ_CSS; document.head.appendChild(st);
  }
  return `<div class="jq">
    <input class="jq-search" type="search" dir="auto" placeholder="${escapeHtml(jqUI("search"))}" value="${escapeHtml(jqState.q)}" oninput="jqSearch(this.value)">
    <div id="jqFilters">${jqFilters()}</div>
    <div id="jqList">${jqList()}</div>
  </div>`;
};

function renderBlocks(guide, s) {
  const wrap = document.createElement("div");
  wrap.innerHTML = s.blocks.map((b) => (BLOCKS[b.type] || (() => ""))(b, guide)).join("");
  return wrap;
}

/* ---- 共用 UI --------------------------------------------------------- */

function renderLangRow() {
  const row = document.getElementById("langRow");
  row.innerHTML = "";
  const cur = LANGS.find((l) => l.code === currentLang);
  const btn = document.createElement("button");
  btn.className = "lang-btn";
  btn.textContent = "🌐 " + (cur ? cur.label : currentLang);
  btn.title = "Change language";
  btn.onclick = () => {
    langChosen = false;
    popupShown = false;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ignore */ }
    renderAll();
  };
  row.appendChild(btn);

  // "How to install as an app" page — hidden from the guide list; not shown inside the installed app
  if (GUIDES["install-app"] && !isInstalledApp()) {
    const inst = document.createElement("button");
    inst.className = "lang-btn install-btn" + (currentGuide === "install-app" ? " active" : "");
    inst.textContent = "📲 " + t(GUIDES["install-app"].name);
    inst.style.marginInlineStart = "8px";
    inst.onclick = () => switchGuide("install-app");
    row.appendChild(inst);
  }
}

function renderPicker() {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.title = SITE_TITLE;
  document.getElementById("langRow").innerHTML = "";
  document.getElementById("guideRow").innerHTML = "";
  const doc = document.getElementById("doc");
  doc.innerHTML = '<div class="doc-title"><span>Select your language</span></div><div class="lang-grid" id="langGrid"></div>';
  const grid = document.getElementById("langGrid");
  LANGS.forEach((l) => {
    const btn = document.createElement("button");
    btn.className = "lang-pick";
    btn.textContent = l.label;
    btn.onclick = () => {
      currentLang = l.code;
      currentGuide = "recent-events";
      langChosen = true;
      persistPrefs();
      renderAll();
    };
    grid.appendChild(btn);
  });
}

/* ---- 上方指南按鈕：「近期活動」＋兩個可展開的分類 ------------------- */
/* Guides listed in GUIDE_GROUPS.growth go under 養成; everything else (except the home guide) goes under 活動. */
const HOME_GUIDE = "recent-events";
const GUIDE_GROUPS = {
  events: { emoji: "🏆", name: { en:"Event Guides", zh:"活動指南", ko:"이벤트 가이드", de:"Event-Guides", fr:"Guides d'événements", pt:"Guias de eventos", tr:"Etkinlik Rehberleri", id:"Panduan Event", ru:"Гайды по событиям", th:"คู่มือกิจกรรม", ar:"أدلة الفعاليات", es:"Guías de eventos" } },
  growth: { emoji: "🌱", name: { en:"Growth Guides", zh:"養成指南", ko:"육성 가이드", de:"Aufbau-Guides", fr:"Guides de progression", pt:"Guias de evolução", tr:"Gelişim Rehberleri", id:"Panduan Pengembangan", ru:"Гайды по развитию", th:"คู่มือพัฒนา", ar:"أدلة التطوير", es:"Guías de progreso" },
    guides: ["formations-rally-tips", "f2p-heroes", "master-academy", "pet", "general-tips"] },
};
let openGuideGroup = null;

function guideGroupOf(key) {
  if (key === HOME_GUIDE) return null;
  return GUIDE_GROUPS.growth.guides.includes(key) ? "growth" : "events";
}

function guideChipHtml(key) {
  const g = GUIDES[key];
  return `<button type="button" class="guide-chip${key === currentGuide ? " active" : ""}" onclick="pickGuideChip('${key}')">
    <span class="emoji">${g.emoji}</span><span dir="auto">${escapeHtml(t(g.name) || key)}</span></button>`;
}

function renderGuideRow() {
  const row = document.getElementById("guideRow");
  const keys = guideKeys();
  const members = { events: [], growth: [] };
  keys.forEach((k) => { const grp = guideGroupOf(k); if (grp) members[grp].push(k); });

  let html = `<div class="guide-groups">`;
  if (keys.includes(HOME_GUIDE)) html += guideChipHtml(HOME_GUIDE).replace('class="guide-chip', 'class="guide-chip guide-home');
  for (const id of ["events", "growth"]) {
    if (!members[id].length) continue;
    const grp = GUIDE_GROUPS[id];
    const isOpen = openGuideGroup === id;
    const here = members[id].includes(currentGuide);
    const cur = here && !isOpen
      ? `<span class="gg-cur"> · ${GUIDES[currentGuide].emoji} <span dir="auto">${escapeHtml(t(GUIDES[currentGuide].name))}</span></span>` : "";
    html += `<button type="button" class="guide-chip guide-group-btn${here ? " active" : ""}${isOpen ? " open" : ""}" onclick="toggleGuideGroup('${id}')" aria-expanded="${isOpen}">
      <span class="emoji">${grp.emoji}</span><span dir="auto">${escapeHtml(t(grp.name))}</span>
      <span class="gg-n">(${members[id].length})</span>${cur}<span class="gg-arrow">${isOpen ? "▴" : "▾"}</span></button>`;
  }
  html += `</div>`;
  if (openGuideGroup && members[openGuideGroup].length) {
    html += `<div class="guide-group-panel">${members[openGuideGroup].map(guideChipHtml).join("")}</div>`;
  }
  row.innerHTML = html;

  if (!document.getElementById("guideGroupStyle")) {
    const st = document.createElement("style");
    st.id = "guideGroupStyle";
    st.textContent = `
      #guideRow{display:block}
      .guide-groups{display:flex;flex-wrap:wrap;gap:8px}
      .guide-home{border-width:2px}
      .guide-group-btn{font-weight:600;max-width:100%}
      .guide-group-btn .gg-n{opacity:.6;font-weight:400}
      .guide-group-btn .gg-cur{font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
      .guide-group-btn .gg-arrow{margin-inline-start:2px}
      .guide-group-panel{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;padding:10px;border:1px dashed var(--rule);border-radius:12px}
    `;
    document.head.appendChild(st);
  }
}

function toggleGuideGroup(id) {
  openGuideGroup = openGuideGroup === id ? null : id;
  renderGuideRow();
}

function pickGuideChip(key) {
  currentGuide = key;
  openGuideGroup = null;
  persistPrefs();
  renderAll();
}
window.toggleGuideGroup = toggleGuideGroup;
window.pickGuideChip = pickGuideChip;

/* Order of the guide buttons at the top. Guides not listed here are added at the end. */
const GUIDE_ORDER = ["recent-events", "formations-rally-tips", "f2p-heroes", "hero-roulette", "master-academy", "general-tips", "mystic-trial", "pet", "bear-hunt", "swordland-showdown", "kvk"];

function guideKeys() {
  const all = Object.keys(GUIDES).filter((k) => !GUIDES[k].hidden);
  return GUIDE_ORDER.filter((k) => all.includes(k)).concat(all.filter((k) => !GUIDE_ORDER.includes(k)));
}

let announcements = [];
let currentAnnIndex = 0;

async function loadAnnouncements() {
  try {
    const res = await fetch("data/announcements.json", { cache: "no-store" });
    announcements = await res.json();
  } catch (e) {
    announcements = [];
  }
  renderAll();
}

function annLabel(a) {
  if (a.title) {
    const label = t(a.title);
    if (label) return label;
  }
  const d = new Date(a.createdAt);
  return `${d.getMonth() + 1}/${d.getDate()} ${a.author}`;
}

function selectAnnouncement(i) {
  const tabs = document.querySelector(".ann-tabs");
  const tabScroll = tabs ? tabs.scrollLeft : 0;
  const pageY = window.scrollY;
  currentAnnIndex = i;
  renderDoc();
  const newTabs = document.querySelector(".ann-tabs");
  if (newTabs) newTabs.scrollLeft = tabScroll;
  window.scrollTo(0, pageY);
}
window.selectAnnouncement = selectAnnouncement;

function renderAnnTicker() {
  const ticker = document.getElementById("annTicker");
  const track = document.getElementById("annTickerTrack");
  if (!announcements.length) { ticker.hidden = true; return; }
  ticker.hidden = false;

  const toPlain = (text) => text
    .replace(/\[\[link:[\w-]+\]\]/g, "")
    .replace(/\{(\w+)\}/g, (m, id) => (GLOSSARY[id] ? t(GLOSSARY[id]) : m))
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\s*\n+\s*/g, " ")
    .trim();
  const firstParagraph = (text) =>
    (text.split(/\n\s*\n/).map((p) => toPlain(p)).find((p) => p) || "");

  track.innerHTML = "";
  let totalLen = 0;
  announcements.forEach((a, i) => {
    const title = a.title ? t(a.title) : "";
    const body = a.content[currentLang] || a.content.en || Object.values(a.content)[0] || "";
    const lead = firstParagraph(body);
    const label = `📢 ${title && lead ? `${title}：${lead}` : (title || lead)}`;
    totalLen += label.length;
    const item = document.createElement("span");
    item.className = "ann-ticker-item";
    item.textContent = label;
    item.onclick = (e) => { e.stopPropagation(); goToAnnouncements(i); };
    track.appendChild(item);
  });
  // Same on-screen speed for every language: measure the real width instead of counting characters
  const TICKER_PX_PER_SEC = 100; // bigger = faster
  track.style.animationDuration = `${Math.max(15, Math.round(totalLen * 0.15))}s`; // fallback
  requestAnimationFrame(() => {
    const width = track.scrollWidth + ticker.clientWidth;
    if (width > 0) track.style.animationDuration = `${Math.max(10, Math.round(width / TICKER_PX_PER_SEC))}s`;
  });
}

function goToAnnouncements(i) {
  if (typeof i === "number") currentAnnIndex = i;
  currentGuide = "recent-events";
  persistPrefs();
  renderAll();
  requestAnimationFrame(() => {
    const tab = document.querySelector(".ann-tab.active");
    if (tab) tab.scrollIntoView({ block: "nearest", inline: "center" });
    const el = document.querySelector(".ann-board");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
window.goToAnnouncements = goToAnnouncements;

function switchGuide(id) {
  currentGuide = pickGuide(id);
  persistPrefs();
  renderAll();
}
window.switchGuide = switchGuide;

function renderDoc() {
  const doc = document.getElementById("doc");
  const guide = GUIDES[currentGuide];
  const s = guide.sections[currentLang];

  if (!s) {
    const langLabel = LANGS.find((l) => l.code === currentLang)?.label || currentLang;
    doc.innerHTML = `<div class="missing-lang">${escapeHtml(langLabel)} ${escapeHtml(t(UI.missingLang))}</div>`;
    return;
  }

  doc.innerHTML = `<div class="doc-title"><span class="emoji">${guide.emoji}</span><span>${escapeHtml(s.title)}</span></div>`;
  doc.appendChild(renderBlocks(guide, s));
}

function renderAll() {
  document.getElementById("siteTitle").textContent = SITE_TITLE;
  document.getElementById("footerNote").textContent = t(UI.footerNote);
  document.title = `${SITE_TITLE} · ${t(GUIDES[currentGuide].name)}`;
  document.documentElement.lang = HTML_LANG[currentLang] || currentLang;
  const curLang = LANGS.find((l) => l.code === currentLang);
  document.documentElement.dir = (curLang && curLang.dir) || "ltr";
  if (!langChosen) { renderPicker(); return; }
  if (shouldShowEventPopup()) renderEventPopup();
  renderAnnTicker();
  renderLangRow();
  renderGuideRow();
  renderDoc();
}

const EVENT_POPUP = {
  key: "all-out",
  message: {
    zh: "**全軍出擊**活動中，請先確認活動注意事項。",
    en: "The **All Out** event is live — please review the event notes first.",
    ko: "**전군 출격** 이벤트 진행 중입니다. 먼저 이벤트 유의사항을 확인해 주세요.",
    de: "Das Event **Aufs Ganze** läuft – bitte zuerst die Event-Hinweise lesen.",
    fr: "L'événement **Tous dehors** est en cours, merci de consulter les consignes d'abord.",
    pt: "O evento **Vai com Tudo** está ativo — confira primeiro as notas do evento.",
    es: "El evento **Ataque Total** está activo — revisa primero las notas del evento.",
    tr: "**Topyekün** etkinliği devam ediyor, lütfen önce etkinlik notlarını inceleyin.",
    id: "Event **Serangan Penuh** sedang berlangsung — mohon baca catatan event terlebih dahulu.",
    ru: "Идёт событие **Полный вперед** — пожалуйста, ознакомьтесь с примечаниями к событию.",
    th: "กิจกรรม **ลุยเลย** กำลังดำเนินอยู่ กรุณาตรวจสอบข้อควรทราบของกิจกรรมก่อน",
    ar: "فعالية **جميع القوات تهاجم** جارية الآن، يُرجى مراجعة ملاحظات الفعالية أولاً."
  },
  confirmLabel: { zh:"確認", en:"Confirm", ko:"확인", de:"Bestätigen", fr:"Confirmer", pt:"Confirmar", es:"Confirmar", tr:"Onayla", id:"Konfirmasi", ru:"Подтвердить", th:"ยืนยัน", ar:"تأكيد" }
};

let popupShown = false;

function shouldShowEventPopup() {
  return EVENT_POPUP && isEventActive(EVENT_POPUP.key) && !popupShown;
}

function renderEventPopup() {
  popupShown = true;
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.innerHTML = `
    <div class="popup-box">
      <div class="popup-text">${rich(t(EVENT_POPUP.message))}</div>
      <button class="popup-confirm-btn">${t(EVENT_POPUP.confirmLabel)}</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector(".popup-confirm-btn").addEventListener("click", () => {
    overlay.remove();
    switchGuide(EVENT_POPUP.key);
  });
}

restorePrefs();
initTheme();
renderAll();
loadAnnouncements();

window.addEventListener("hashchange", () => {
  readHash();
  persistPrefs();
  renderAll();
});

/* ---- 點圖片放大（公告圖片、指南圖片） ----------------------------- */
(function () {
  const st = document.createElement("style");
  st.textContent = `
    .ann-img,.fig{cursor:zoom-in}
    .img-zoom{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);overflow:auto;-webkit-overflow-scrolling:touch;cursor:zoom-out}
    .img-zoom img{display:block;margin:auto;max-width:none;width:auto;min-width:100%;height:auto}
    .img-zoom img.fit{min-width:0;max-width:100%;max-height:100vh;position:absolute;inset:0}
    .img-zoom-x{position:fixed;top:10px;right:12px;z-index:10000;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.9);font-size:22px;line-height:40px;cursor:pointer}
  `;
  document.head.appendChild(st);
  document.addEventListener("click", (e) => {
    const img = e.target.closest && e.target.closest("img.ann-img, img.fig");
    if (!img) return;
    const box = document.createElement("div");
    box.className = "img-zoom";
    const big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    // small images (e.g. tables) are shown at 2× so the text can be read; tap to toggle
    big.onload = () => { if (big.naturalWidth < window.innerWidth * 1.5) big.style.width = Math.max(window.innerWidth, big.naturalWidth) * 2 + "px"; };
    const x = document.createElement("button");
    x.className = "img-zoom-x"; x.type = "button"; x.textContent = "×";
    const close = () => { box.remove(); x.remove(); document.body.style.overflow = ""; };
    x.onclick = close;
    box.onclick = (ev) => { if (ev.target === box) close(); };
    box.appendChild(big);
    document.body.appendChild(box); document.body.appendChild(x);
    document.body.style.overflow = "hidden";
  });
})();

/* ---- 隱藏入口：連點標題 5 次 → 輸入密碼 → 幹部用的成員排序頁 ---------- */
/* 換密碼：打開網站的 password.html，輸入新密碼，用它產生的那行換掉下面 ROSTER_HASH 這行（把 var HASH 改成 const ROSTER_HASH）。 */
const ROSTER_HASH = "a9dadd1938825b78c31bb62d74173a8e5e1b460ab2484d42707df7a6d5d42160";
(function () {
  const title = document.getElementById("siteTitle");
  if (!title) return;
  const URL_ = "roster-x7k2p9.html";
  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function ask() {
    if (document.getElementById("rosterGate")) return;
    const box = document.createElement("div");
    box.id = "rosterGate";
    box.style.cssText = "position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(0,0,0,.55);padding:20px";
    box.innerHTML = `<form style="width:100%;max-width:320px;background:var(--panel);border:1px solid var(--rule);border-radius:12px;padding:20px;display:grid;gap:10px;text-align:center;box-shadow:0 8px 24px var(--shadow)">
      <b>🔒</b>
      <input type="password" autocomplete="current-password" placeholder="Password" style="padding:10px;font-size:16px;text-align:center;border-radius:8px;border:1px solid var(--rule);background:var(--panel-2);color:var(--text)">
      <button type="submit" style="padding:10px;border:0;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:15px;cursor:pointer">OK</button>
      <small hidden style="color:var(--accent)">Wrong password</small>
    </form>`;
    document.body.appendChild(box);
    const form = box.querySelector("form"), input = box.querySelector("input"), err = box.querySelector("small");
    box.addEventListener("click", (e) => { if (e.target === box) box.remove(); });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (await sha256("nxs-guide:" + input.value) === ROSTER_HASH) { location.href = URL_; return; }
      err.hidden = false; input.value = ""; input.focus();
    });
    input.focus();
  }
  let taps = 0, timer = null;
  title.addEventListener("click", () => {
    taps++;
    clearTimeout(timer);
    timer = setTimeout(() => { taps = 0; }, 2000);
    if (taps >= 5) { taps = 0; ask(); }
  });
})();

/* ---- KvK 前一天到 KvK 結束：右下角出現「KvK 清單」，每個人自己勾（存在自己的瀏覽器） ---- */
const KVK_CHECK = {
  title: { en:"KvK checklist", zh:"KvK 準備清單", ko:"KvK 체크리스트", de:"KvK-Checkliste", fr:"Checklist KvK", pt:"Checklist do KvK", tr:"KvK kontrol listesi", id:"Checklist KvK", ru:"Чек-лист KvK", th:"เช็กลิสต์ KvK", ar:"قائمة تحقق KvK", es:"Lista de KvK" },
  starts: { en:"KvK starts {d}", zh:"KvK 於 {d} 開始", ko:"KvK 시작: {d}", de:"KvK beginnt am {d}", fr:"Le KvK commence le {d}", pt:"O KvK começa em {d}", tr:"KvK başlangıcı: {d}", id:"KvK dimulai {d}", ru:"KvK начинается {d}", th:"KvK เริ่ม {d}", ar:"يبدأ KvK في {d}", es:"El KvK empieza el {d}" },
  live: { en:"KvK is on now", zh:"KvK 進行中", ko:"KvK 진행 중", de:"KvK läuft", fr:"Le KvK est en cours", pt:"O KvK está em andamento", tr:"KvK devam ediyor", id:"KvK sedang berlangsung", ru:"KvK идёт", th:"KvK กำลังดำเนินอยู่", ar:"KvK جارٍ الآن", es:"El KvK está en curso" },
  note: { en:"Only you see your ticks (saved in this browser).", zh:"勾選只有你自己看得到（存在這個瀏覽器裡）。", ko:"체크 내용은 본인만 볼 수 있습니다(이 브라우저에 저장).", de:"Nur du siehst deine Haken (in diesem Browser gespeichert).", fr:"Vous seul voyez vos coches (enregistrées dans ce navigateur).", pt:"Só você vê suas marcações (salvas neste navegador).", tr:"İşaretlerini yalnızca sen görürsün (bu tarayıcıda saklanır).", id:"Centang hanya terlihat olehmu (disimpan di browser ini).", ru:"Отметки видите только вы (сохраняются в этом браузере).", th:"มีแค่คุณที่เห็นการติ๊ก (บันทึกไว้ในเบราว์เซอร์นี้)", ar:"علاماتك تظهر لك فقط (محفوظة في هذا المتصفح).", es:"Solo tú ves tus marcas (guardadas en este navegador)." },
  guide: { en:"Open the KvK guide", zh:"打開 KvK 指南", ko:"KvK 가이드 열기", de:"KvK-Guide öffnen", fr:"Ouvrir le guide KvK", pt:"Abrir o guia do KvK", tr:"KvK rehberini aç", id:"Buka panduan KvK", ru:"Открыть гайд по KvK", th:"เปิดคู่มือ KvK", ar:"افتح دليل KvK", es:"Abrir la guía de KvK" },
  done: { en:"All set — good luck! 💪", zh:"全部完成，祝順利！💪", ko:"모두 완료! 화이팅 💪", de:"Alles erledigt – viel Erfolg! 💪", fr:"Tout est prêt — bonne chance ! 💪", pt:"Tudo pronto — boa sorte! 💪", tr:"Hepsi tamam — bol şans! 💪", id:"Semua siap — semoga sukses! 💪", ru:"Всё готово — удачи! 💪", th:"ครบแล้ว ขอให้โชคดี! 💪", ar:"كل شيء جاهز — بالتوفيق! 💪", es:"¡Todo listo, suerte! 💪" },
  items: [
    { en:"Apply for a Minister position in Appointment", zh:"到「官職任命」申請官員職位", ko:"\"관직 임명\"에서 관료 직위를 신청하기", de:"Unter „Ernennung“ einen Minister-Posten beantragen", fr:"Postuler à un poste de Ministre dans « Nomination »", pt:"Candidatar-se a um cargo de Ministro em \"Nomeação\"", tr:"\"Atama\" bölümünden bir Bakan pozisyonuna başvur", id:"Ajukan posisi Menteri di \"Pertemuan\"", ru:"Подать заявку на пост министра в разделе «Назначение»", th:"สมัครตำแหน่งรัฐมนตรีใน \"การแต่งตั้ง\"", ar:"قدّم على منصب وزير في \"التعيين\"", es:"Solicitar un puesto de Ministro en \"Designación\"" },
    { en:"Save your Intel Missions — don't clear them before KvK (they score on Day 1, 3 and 5)", zh:"把情報任務留著，KvK 前先不要做（第 1、3、5 天有積分）", ko:"정보 임무를 남겨 두기 — KvK 전에 하지 않기 (1·3·5일 차에 점수)", de:"Geheimdienstmissionen aufsparen – nicht vor dem KvK erledigen (zählen an Tag 1, 3 und 5)", fr:"Garder vos Missions de Renseignement — ne pas les faire avant le KvK (points aux jours 1, 3 et 5)", pt:"Guardar as Missões de Inteligência — não fazer antes do KvK (pontuam nos dias 1, 3 e 5)", tr:"İstihbarat Görevlerini sakla — KvK'dan önce yapma (1., 3. ve 5. günlerde puan verir)", id:"Simpan Misi Intel — jangan dikerjakan sebelum KvK (dapat poin di hari 1, 3, dan 5)", ru:"Сохраните разведывательные миссии — не выполняйте их до KvK (очки в дни 1, 3 и 5)", th:"เก็บภารกิจข่าวกรองไว้ — อย่าทำก่อน KvK (ได้คะแนนวันที่ 1, 3 และ 5)", ar:"احتفظ بمهام الاستخبارات — لا تُنجزها قبل KvK (تُحتسب نقاطها في الأيام 1 و3 و5)", es:"Guarda tus Misiones de Inteligencia — no las hagas antes del KvK (dan puntos los días 1, 3 y 5)" },
    { en:"Count all your saved items and know which day to use each one", zh:"清點所有存下來的道具，並熟悉哪一天用哪一種", ko:"모아 둔 아이템을 모두 세어 보고, 어느 날 무엇을 쓸지 알아 두기", de:"Alle gesparten Gegenstände zählen und wissen, an welchem Tag was benutzt wird", fr:"Compter tous vos objets mis de côté et savoir quel jour utiliser chacun", pt:"Contar todos os itens guardados e saber em que dia usar cada um", tr:"Biriktirdiğin tüm eşyaları say ve hangisini hangi gün kullanacağını bil", id:"Hitung semua item simpananmu dan ketahui hari untuk memakai masing-masing", ru:"Пересчитайте все сохранённые предметы и знайте, в какой день что использовать", th:"นับไอเทมที่เก็บไว้ทั้งหมด และรู้ว่าวันไหนใช้อะไร", ar:"احسب كل العناصر التي ادّخرتها واعرف في أي يوم تستخدم كلًّا منها", es:"Cuenta todos tus objetos guardados y ten claro qué día usar cada uno" },
  ],
};

(function () {
  const sched = EVENT_SCHEDULES.kvk;
  if (!sched) return;
  const DAY = 86400000;
  const diff = Math.floor((Date.now() - sched.anchor) / DAY);
  if (diff < -1) return;
  const pos = ((diff % sched.periodDays) + sched.periodDays) % sched.periodDays;
  let start;
  if (pos === sched.periodDays - 1 || diff === -1) start = sched.anchor + (diff + 1) * DAY; // the day before
  else if (pos < sched.activeDays) start = sched.anchor + (diff - pos) * DAY;               // during KvK
  else return;
  const KEY = "ks-kvk-check-" + new Date(start).toISOString().slice(0, 10);
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const store = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  const n = KVK_CHECK.items.length;

  const st = document.createElement("style");
  st.textContent = `
    .kvk-fab{position:fixed;right:14px;bottom:16px;z-index:900;display:flex;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;border:2px solid var(--accent);background:var(--panel);color:var(--text);font-weight:700;font-size:14px;box-shadow:0 6px 18px var(--shadow);cursor:pointer}
    .kvk-fab .kvk-n{background:var(--accent);color:var(--accent-ink);border-radius:999px;padding:1px 8px;font-size:12px}
    .kvk-fab.todo::after{content:"";position:absolute;top:-3px;right:-3px;width:12px;height:12px;border-radius:50%;background:#e0352b;box-shadow:0 0 0 2px var(--panel);animation:kvkPulse 1.4s infinite}
    @keyframes kvkPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}
    .kvk-modal{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.55);display:grid;place-items:center;padding:16px}
    .kvk-box{width:100%;max-width:420px;background:var(--panel);border:1px solid var(--rule);border-radius:14px;padding:18px;box-shadow:0 10px 30px var(--shadow)}
    .kvk-box h3{margin:0 0 4px}
    .kvk-box .kvk-sub{color:var(--text-muted);font-size:13px;margin-bottom:12px}
    .kvk-item{display:flex;gap:10px;align-items:flex-start;padding:10px;border-radius:10px;background:var(--panel-2);margin-bottom:8px;cursor:pointer;line-height:1.45}
    .kvk-item input{width:20px;height:20px;flex:none;margin-top:1px;accent-color:var(--accent)}
    .kvk-item.on span{text-decoration:line-through;opacity:.65}
    .kvk-row{display:flex;gap:8px;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap}
    .kvk-row button{padding:8px 12px;border-radius:8px;border:1px solid var(--rule);background:var(--panel);color:var(--text);cursor:pointer;font-size:14px}
    .kvk-row button.go{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:700}
  `;
  document.head.appendChild(st);

  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "kvk-fab";
  document.body.appendChild(fab);
  function paintFab() {
    const c = load().length;
    fab.classList.toggle("todo", c < n);
    fab.innerHTML = `📋 KvK <span class="kvk-n">${c}/${n}</span>`;
  }
  paintFab();

  fab.onclick = () => {
    const box = document.createElement("div");
    box.className = "kvk-modal";
    const before = Date.now() < start;
    const d = new Date(start).toLocaleDateString(HTML_LANG[currentLang] || "en", { month: "short", day: "numeric", timeZone: "UTC" });
    function paint() {
      const done = load();
      box.innerHTML = `<div class="kvk-box" dir="auto">
        <h3>📋 ${escapeHtml(t(KVK_CHECK.title))}</h3>
        <div class="kvk-sub">${escapeHtml(before ? t(KVK_CHECK.starts).replace("{d}", d) : t(KVK_CHECK.live))} · ${escapeHtml(t(KVK_CHECK.note))}</div>
        ${KVK_CHECK.items.map((it, i) => `<label class="kvk-item${done.includes(i) ? " on" : ""}"><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}><span>${escapeHtml(t(it))}</span></label>`).join("")}
        ${done.length === n ? `<div class="kvk-sub" style="margin:4px 0 0">${escapeHtml(t(KVK_CHECK.done))}</div>` : ""}
        <div class="kvk-row"><button type="button" class="go" data-a="guide">👑 ${escapeHtml(t(KVK_CHECK.guide))}</button><button type="button" data-a="close">✕</button></div>
      </div>`;
    }
    paint();
    box.addEventListener("change", (e) => {
      const i = Number(e.target.dataset.i); if (Number.isNaN(i)) return;
      const done = new Set(load()); e.target.checked ? done.add(i) : done.delete(i);
      store([...done].sort()); paint(); paintFab();
    });
    box.addEventListener("click", (e) => {
      const a = e.target.closest("[data-a]")?.dataset.a;
      if (e.target === box || a === "close") box.remove();
      if (a === "guide") { box.remove(); switchGuide("kvk"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    });
    document.body.appendChild(box);
  };
})();
