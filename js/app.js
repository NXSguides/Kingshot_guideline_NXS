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
/* ---- Times written as "08:00 UTC" / "UTC 08:00" (also ranges like 12:00–22:00 UTC) get the reader's own
   local time added after them, from the browser's time zone — e.g. "08:00 UTC (16:00 local)".
   Nothing is added when the reader is already on UTC. ---- */
const LT_LABEL = { en:"local", zh:"當地", ko:"현지", de:"Ortszeit", fr:"heure locale", pt:"local", es:"local", tr:"yerel", id:"lokal", ru:"местное", th:"ท้องถิ่น", ar:"محلي" };
function localTimes(html, lang) {
  const off = -new Date().getTimezoneOffset();          // minutes east of UTC
  if (!off) return html;
  const conv = (hm) => {
    const [h, m] = hm.split(":").map(Number);
    let t = h * 60 + m + off, day = 0;
    if (t < 0) { t += 1440; day = -1; } else if (t >= 1440) { t -= 1440; day = 1; }
    return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0") + (day ? (day > 0 ? "⁺¹" : "⁻¹") : "");
  };
  const label = LT_LABEL[lang] || LT_LABEL.en;
  // one time, a range (12:00–22:00) or a list (11:00 & 22:00 / 11:00 和 22:00) next to the word UTC
  const T = "\\d{1,2}:\\d{2}", SEP = "\\s*(?:[–\\-,/]|&amp;|&|和|and)\\s*";
  const G = `${T}(?:${SEP}${T})*`;
  const tag = (g) => ` <span class="lt">(${g.replace(/\d{1,2}:\d{2}/g, conv)} ${label})</span>`;
  return html
    .replace(new RegExp(`(${G})\\s*UTC(?![\\w+-])`, "g"), (m, g) => m + tag(g))
    .replace(new RegExp(`UTC\\s*(${G})(?!\\s*<span class="lt")`, "g"), (m, g) => m + tag(g));
}

function rich(str) {
  return localTimes(richRaw(str), currentLang);
}
function richRaw(str) {
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
  "hero-roulette": { anchor: Date.UTC(2026, 9, 6), periodDays: 14, activeDays: 3 },
  "cesares-fury": { anchor: Date.UTC(2026, 9, 10), periodDays: 21, activeDays: 3 } // last one ~9/19, this one 10/10–10/12 → every 3 weeks (check 10/31)
};

/* Schedules edited on the officer Events tab (data/events-x7k2p9.json, "sched") replace the ones above */
fetch("data/events-x7k2p9.json?t=" + Date.now(), { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((f) => {
  if (!f || !f.sched) return;
  let changed = false;
  for (const [k, v] of Object.entries(f.sched)) {
    const a = Date.parse(v.anchor + "T00:00:00Z");
    if (!EVENT_SCHEDULES[k] || isNaN(a) || !(v.periodDays > 0) || !(v.activeDays > 0)) continue;
    EVENT_SCHEDULES[k] = { anchor: a, periodDays: v.periodDays, activeDays: v.activeDays };
    changed = true;
  }
  if (changed && langChosen) renderAll();
}).catch(() => {});

function isEventActive(key) {
  const sched = EVENT_SCHEDULES[key];
  if (!sched) return true; // 沒設定排程的攻略一律顯示
  const msPerDay = 86400000;
  const diffDays = Math.floor((Date.now() - sched.anchor) / msPerDay);
  if (diffDays < 0) return false;
  return (diffDays % sched.periodDays) < sched.activeDays;
}

/* ---- Hero cards ---------------------------------------------------- */
const hcFilter = { gen: 0, troop: "", role: "" };
const HC_TROOP_ICON = { infantry: "🛡️", cavalry: "🐎", archer: "🏹" };
const HC_ROLES = ["bl", "bj", "pl", "gl", "pj", "so", "ar"];
function hcVal(v) {
  if (v === "y") return "✅";
  if (v === "n") return "❌";
  if (v === "c") return "⚠️";
  return /^★/.test(v || "") ? `<span class="hc-stars">${escapeHtml(v)}</span>` : "—";
}
const hcGood = (v) => v === "y" || /^★/.test(v || "");
function heroCardsHtml() {
  const U = HERO_CARD_UI, f = hcFilter;
  const gens = [...new Set(HERO_CARDS.map((h) => h.gen))];
  const chip = (on, k, v, label) => `<button type="button" class="hc-chip${on ? " on" : ""}" onclick="hcSet('${k}','${v}')">${label}</button>`;
  const bar = `<div class="hc-filters">
    <div class="hc-row">${chip(!f.gen, "gen", 0, escapeHtml(t(U.all)))}${gens.map((g) => chip(f.gen === g, "gen", g, escapeHtml(t(U.gen).replace("{n}", g)))).join("")}</div>
    <div class="hc-row">${chip(!f.troop, "troop", "", escapeHtml(t(U.all)))}${["infantry", "cavalry", "archer"].map((x) => chip(f.troop === x, "troop", x, `${HC_TROOP_ICON[x]} ${escapeHtml(term(x))}`)).join("")}</div>
    <label class="hc-row hc-role">${escapeHtml(t(U.goodFor))}
      <select onchange="hcSet('role',this.value)"><option value="">${escapeHtml(t(U.anyRole))}</option>
      ${HC_ROLES.map((r) => `<option value="${r}"${f.role === r ? " selected" : ""}>${rich(t(U.roles[r]))}</option>`).join("")}</select></label>
    <div class="legend">${escapeHtml(t(U.legend))}</div>
  </div>`;
  const list = HERO_CARDS.filter((h) => (!f.gen || h.gen === f.gen) && (!f.troop || h.troop === f.troop) && (!f.role || (h.r && hcGood(h.r[f.role]))));
  const card = (h) => {
    const tx = h.t[currentLang] || h.t.en;
    const roles = h.r
      ? `<ul class="hc-roles">${HC_ROLES.map((r) => `<li class="${f.role === r ? "hl" : ""}"><span>${rich(t(U.roles[r]))}</span><span class="hc-v">${hcVal(h.r[r])}</span></li>`).join("")}</ul>`
      : `<p class="hc-note">${escapeHtml(t(U.noRatings))}</p>`;
    return `<div class="hc-card">
      <div class="hc-art"><img src="figures/heroes/hero_${h.id}.webp" alt="${escapeHtml(term(h.id))}" loading="lazy" onerror="this.remove()">
        <div class="hc-head"><div class="hc-name">${escapeHtml(term(h.id))}</div>
          <div class="hc-tags"><span class="hc-tag r-${h.rarity}">${h.rarity}</span><span class="hc-tag">${escapeHtml(t(U.gen).replace("{n}", h.gen))}</span>
          <span class="hc-tag">${HC_TROOP_ICON[h.troop]} ${escapeHtml(term(h.troop))}</span><span class="hc-tag">${h.kind === "growth" ? "🔨" : "⚔️"} ${escapeHtml(t(U[h.kind]))}</span></div></div></div>
      <div class="hc-body">${roles}${ul(tx.sum || [])}${tx.quip ? `<p class="hc-quip">“${rich(tx.quip)}”</p>` : ""}</div>
    </div>`;
  };
  return bar + (list.length ? `<div class="hc-grid">${list.map(card).join("")}</div>` : `<p class="legend">${escapeHtml(t(U.none))}</p>`);
}
function hcSet(k, v) {
  hcFilter[k] = k === "gen" ? Number(v) : v;
  const root = document.getElementById("hcRoot");
  if (root) root.innerHTML = heroCardsHtml();
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

  /* Hero cards: one card per hero with filters (data: HERO_CARDS / HERO_CARD_UI in data/content.js) */
  herocards: () => (typeof HERO_CARDS === "undefined" ? "" : `<div id="hcRoot">${heroCardsHtml()}</div>`),

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
  checklist: (b, guide) => {
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
  // KvK guide: small link to the points planner (a page that is only reachable from here)
  const plan = guide === GUIDES.kvk ? `<a class="kvk-plan-link" href="kvk-optimizer.html?lang=${currentLang}" dir="auto">${escapeHtml(t(KVK_PLAN_LINK))}</a>` : "";
  return `${plan}
    <div class="chk-wrap">
      <table class="chk-table">${head}${rows}</table>
    </div>
    ${legend}
  `;
}
};

const KVK_PLAN_LINK = { en:"🧮 Still not sure after reading this? Work out your own plan in the KvK Points Planner ›", zh:"🧮 看完還是不太明白、想自己算？打開 KvK 積分規劃 ›", ko:"🧮 읽어도 잘 모르겠고 직접 계산해 보고 싶다면? KvK 점수 플래너 열기 ›", de:"🧮 Noch unsicher und lieber selbst rechnen? KvK-Punkteplaner öffnen ›", fr:"🧮 Toujours un doute et envie de calculer vous-même ? Ouvrir le planificateur de points KvK ›", pt:"🧮 Ainda em dúvida e quer calcular por conta própria? Abrir o planejador de pontos KvK ›", es:"🧮 ¿Sigues con dudas y quieres calcularlo tú? Abrir el planificador de puntos KvK ›", tr:"🧮 Hâlâ emin değil misin, kendin hesaplamak mı istiyorsun? KvK Puan Planlayıcıyı aç ›", id:"🧮 Masih bingung dan ingin hitung sendiri? Buka Perencana Poin KvK ›", ru:"🧮 Всё ещё непонятно и хотите посчитать сами? Открыть планировщик очков KvK ›", th:"🧮 อ่านแล้วยังไม่แน่ใจ อยากคำนวณเอง? เปิดตัววางแผนคะแนน KvK ›", ar:"🧮 ما زلت غير متأكد وتريد الحساب بنفسك؟ افتح مخطط نقاط KvK ‹" };

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
    guides: ["formations-rally-tips", "f2p-heroes", "hero-cards", "master-academy", "pet", "general-tips"] },
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
const GUIDE_ORDER = ["recent-events", "formations-rally-tips", "f2p-heroes", "hero-cards", "hero-roulette", "master-academy", "general-tips", "mystic-trial", "pet", "bear-hunt", "swordland-showdown", "kvk"];

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

/* The guide text comes in one file per language (data/content-<lang>.js, made from data/content.js).
   Before drawing, make sure the current language's file is loaded; fetch it first if not. */
function renderAll() {
  if (typeof loadContentLang === "function" && !CONTENT_LOADED[currentLang]) {
    loadContentLang(currentLang).then(renderAllNow, renderAllNow);
    return;
  }
  renderAllNow();
}
function renderAllNow() {
  document.getElementById("siteTitle").textContent = SITE_TITLE;
  document.getElementById("footerNote").textContent = t(UI.footerNote);
  document.title = `${SITE_TITLE} · ${t(GUIDES[currentGuide].name)}`;
  document.documentElement.lang = HTML_LANG[currentLang] || currentLang;
  const curLang = LANGS.find((l) => l.code === currentLang);
  document.documentElement.dir = (curLang && curLang.dir) || "ltr";
  if (window.kvkRepaint) window.kvkRepaint();
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

/* ---- 隱藏入口：連點標題 5 次 → 幹部專區（那邊會要求幹部密碼） ---------- */
(function () {
  const title = document.getElementById("siteTitle");
  if (!title) return;
  let taps = 0, timer = null;
  title.addEventListener("click", () => {
    taps++;
    clearTimeout(timer);
    timer = setTimeout(() => { taps = 0; }, 2000);
    if (taps >= 5) { taps = 0; safeSet("nxs-officer-lang", currentLang === "zh" ? "zh" : "en"); location.href = "officer-x7k2p9.html#events"; }
  });
})();

/* ---- KvK 前一天＋KvK 第 1–6 天：右下角出現當天的 KvK 清單，每個人自己勾（存在自己的瀏覽器） ----
   前一天：dayBeforeItems。第 1 天：day1Items。第 2 天：day2Items。第 3 天：day3Items。第 4 天：day4Items。第 5 天：自動照 KvK 指南最上面的表格（當天 ✅ 和 👍 的項目）。第 6 天：day6Items。 */
const KVK_CHECK = {
  dayBefore: { en:"Day before KvK", zh:"KvK 前一天", ko:"KvK 전날", de:"Tag vor dem KvK", fr:"Veille du KvK", pt:"Véspera do KvK", tr:"KvK'dan önceki gün", id:"Sehari sebelum KvK", ru:"День до KvK", th:"วันก่อน KvK", ar:"اليوم السابق لـ KvK", es:"Día antes del KvK" },
  dayN: { en:"KvK Day {n}", zh:"KvK 第 {n} 天", ko:"KvK {n}일 차", de:"KvK Tag {n}", fr:"KvK Jour {n}", pt:"KvK Dia {n}", tr:"KvK {n}. Gün", id:"KvK Hari ke-{n}", ru:"KvK, день {n}", th:"KvK วันที่ {n}", ar:"KvK اليوم {n}", es:"KvK Día {n}" },
  // game wording: Days 1–5 are shown as "Preparation Phase 1–5" (備戰階段1–5), Day 6 is the Battle Phase
  prepN: { en:"KvK Prep Day {n}", zh:"KvK 備戰階段 {n}", ko:"KvK 준비 단계 {n}", de:"KvK Vorbereitungsphase {n}", fr:"KvK Phase de Préparation {n}", pt:"KvK Fase de Preparação {n}", tr:"KvK Hazırlık Evresi {n}", id:"KvK Fase Persiapan {n}", ru:"KvK, стадия подготовки {n}", th:"KvK ช่วงการเตรียมตัว {n}", ar:"KvK مرحلة التحضير {n}", es:"KvK Fase de Preparación {n}" },
  battle: { en:"KvK Battle Day", zh:"KvK 戰爭階段", ko:"KvK 전쟁 단계", de:"KvK Kampfphase", fr:"KvK Phase de Combat", pt:"KvK Fase de Batalha", tr:"KvK Savaş Evresi", id:"KvK Fase Pertempuran", ru:"KvK, стадия битвы", th:"KvK ช่วงการต่อสู้", ar:"KvK مرحلة المعركة", es:"KvK Fase de batalla" },
  title: { en:"KvK checklist", zh:"KvK 準備清單", ko:"KvK 체크리스트", de:"KvK-Checkliste", fr:"Checklist KvK", pt:"Checklist do KvK", tr:"KvK kontrol listesi", id:"Checklist KvK", ru:"Чек-лист KvK", th:"เช็กลิสต์ KvK", ar:"قائمة تحقق KvK", es:"Lista de KvK" },
  starts: { en:"KvK starts {d}", zh:"KvK 於 {d} 開始", ko:"KvK 시작: {d}", de:"KvK beginnt am {d}", fr:"Le KvK commence le {d}", pt:"O KvK começa em {d}", tr:"KvK başlangıcı: {d}", id:"KvK dimulai {d}", ru:"KvK начинается {d}", th:"KvK เริ่ม {d}", ar:"يبدأ KvK في {d}", es:"El KvK empieza el {d}" },
  live: { en:"KvK is on now", zh:"KvK 進行中", ko:"KvK 진행 중", de:"KvK läuft", fr:"Le KvK est en cours", pt:"O KvK está em andamento", tr:"KvK devam ediyor", id:"KvK sedang berlangsung", ru:"KvK идёт", th:"KvK กำลังดำเนินอยู่", ar:"KvK جارٍ الآن", es:"El KvK está en curso" },
  note: { en:"Only you see your ticks (saved in this browser).", zh:"勾選只有你自己看得到（存在這個瀏覽器裡）。", ko:"체크 내용은 본인만 볼 수 있습니다(이 브라우저에 저장).", de:"Nur du siehst deine Haken (in diesem Browser gespeichert).", fr:"Vous seul voyez vos coches (enregistrées dans ce navigateur).", pt:"Só você vê suas marcações (salvas neste navegador).", tr:"İşaretlerini yalnızca sen görürsün (bu tarayıcıda saklanır).", id:"Centang hanya terlihat olehmu (disimpan di browser ini).", ru:"Отметки видите только вы (сохраняются в этом браузере).", th:"มีแค่คุณที่เห็นการติ๊ก (บันทึกไว้ในเบราว์เซอร์นี้)", ar:"علاماتك تظهر لك فقط (محفوظة في هذا المتصفح).", es:"Solo tú ves tus marcas (guardadas en este navegador)." },
  guide: { en:"Open the KvK guide", zh:"打開 KvK 指南", ko:"KvK 가이드 열기", de:"KvK-Guide öffnen", fr:"Ouvrir le guide KvK", pt:"Abrir o guia do KvK", tr:"KvK rehberini aç", id:"Buka panduan KvK", ru:"Открыть гайд по KvK", th:"เปิดคู่มือ KvK", ar:"افتح دليل KvK", es:"Abrir la guía de KvK" },
  done: { en:"All set — good luck! 💪", zh:"全部完成，祝順利！💪", ko:"모두 완료! 화이팅 💪", de:"Alles erledigt – viel Erfolg! 💪", fr:"Tout est prêt — bonne chance ! 💪", pt:"Tudo pronto — boa sorte! 💪", tr:"Hepsi tamam — bol şans! 💪", id:"Semua siap — semoga sukses! 💪", ru:"Всё готово — удачи! 💪", th:"ครบแล้ว ขอให้โชคดี! 💪", ar:"كل شيء جاهز — بالتوفيق! 💪", es:"¡Todo listo, suerte! 💪" },
  dayBeforeItems: [
    { en:"Book Chief Minister for KvK Day 1 (00:00 UTC onwards) — especially if you saved a lot of Truegold / construction upgrades", zh:"預約 KvK 第 1 天（UTC 00:00 起）的總理大臣 — 特別是存了很多黃金／建築升級的人", ko:"KvK 1일 차(UTC 00:00부터) 총리대신 예약하기 — 순금·건설 업그레이드를 많이 모아 둔 경우 특히", de:"Höchster Minister für KvK Tag 1 (ab 00:00 UTC) reservieren – besonders, wenn du viel Echtgold / Bau-Upgrades gespart hast", fr:"Réserver Premier Ministre pour le Jour 1 du KvK (dès 00:00 UTC) — surtout si vous avez gardé beaucoup d'Or Véritable / d'améliorations de construction", pt:"Reservar o Primeiro-ministro para o Dia 1 do KvK (a partir de 00:00 UTC) — principalmente se você guardou muito Adamante / melhorias de construção", tr:"KvK 1. Gün (00:00 UTC'den itibaren) için Başbakan rezervasyonu yap — özellikle çok Hasaltın / inşaat yükseltmesi biriktirdiysen", id:"Pesan Perdana Menteri untuk KvK Hari ke-1 (mulai 00:00 UTC) — terutama jika kamu menyimpan banyak Truegold / peningkatan bangunan", ru:"Забронировать Премьер-министра на день 1 KvK (с 00:00 UTC) — особенно если накоплено много аурума / улучшений построек", th:"จองอัครเสนาบดีสำหรับ KvK วันที่ 1 (ตั้งแต่ 00:00 UTC) — โดยเฉพาะถ้าเก็บทรูโกลด์ / การอัปเกรดสิ่งก่อสร้างไว้เยอะ", ar:"احجز منصب رئيس الوزراء لليوم 1 من KvK (من 00:00 UTC) — خاصة إذا ادّخرت الكثير من الذهب الخالص / ترقيات البناء", es:"Reservar Ministro principal para el Día 1 del KvK (desde las 00:00 UTC) — sobre todo si guardaste mucha Adamantina / mejoras de construcción" },
    { en:"08:00 UTC Intel Missions: complete them, but DON'T claim", zh:"UTC 08:00 的情報任務：完成，但「不要」領取", ko:"UTC 08:00 정보 임무: 완료만 하고 수령하지 않기", de:"Geheimdienstmissionen um 08:00 UTC: abschließen, aber NICHT einsammeln", fr:"Missions de Renseignement de 08:00 UTC : les terminer, mais NE PAS récupérer", pt:"Missões de Inteligência das 08:00 UTC: concluir, mas NÃO coletar", tr:"08:00 UTC İstihbarat Görevleri: tamamla ama ödülü ALMA", id:"Misi Intel 08:00 UTC: selesaikan, tapi JANGAN klaim", ru:"Разведывательные миссии 08:00 UTC: выполнить, но НЕ забирать награду", th:"ภารกิจข่าวกรอง 08:00 UTC: ทำให้เสร็จ แต่ \"อย่า\" กดรับ", ar:"مهام الاستخبارات في 08:00 UTC: أكملها لكن لا تستلم المكافأة", es:"Misiones de Inteligencia de las 08:00 UTC: complétalas, pero NO las reclames" },
    { en:"16:00 UTC Intel Missions: skip them entirely", zh:"UTC 16:00 的情報任務：完全跳過不做", ko:"UTC 16:00 정보 임무: 아예 건너뛰기", de:"Geheimdienstmissionen um 16:00 UTC: komplett auslassen", fr:"Missions de Renseignement de 16:00 UTC : les ignorer complètement", pt:"Missões de Inteligência das 16:00 UTC: pular totalmente", tr:"16:00 UTC İstihbarat Görevleri: tamamen atla", id:"Misi Intel 16:00 UTC: lewati sepenuhnya", ru:"Разведывательные миссии 16:00 UTC: полностью пропустить", th:"ภารกิจข่าวกรอง 16:00 UTC: ข้ามไปทั้งหมด", ar:"مهام الاستخبارات في 16:00 UTC: تخطّها تمامًا", es:"Misiones de Inteligencia de las 16:00 UTC: sáltatelas por completo" },
    { en:"Count all your saved items and know which day to use each one", zh:"清點所有存下來的道具，並熟悉哪一天用哪一種", ko:"모아 둔 아이템을 모두 세어 보고, 어느 날 무엇을 쓸지 알아 두기", de:"Alle gesparten Gegenstände zählen und wissen, an welchem Tag was benutzt wird", fr:"Compter tous vos objets mis de côté et savoir quel jour utiliser chacun", pt:"Contar todos os itens guardados e saber em que dia usar cada um", tr:"Biriktirdiğin tüm eşyaları say ve hangisini hangi gün kullanacağını bil", id:"Hitung semua item simpananmu dan ketahui hari untuk memakai masing-masing", ru:"Пересчитайте все сохранённые предметы и знайте, в какой день что использовать", th:"นับไอเทมที่เก็บไว้ทั้งหมด และรู้ว่าวันไหนใช้อะไร", ar:"احسب كل العناصر التي ادّخرتها واعرف في أي يوم تستخدم كلًّا منها", es:"Cuenta todos tus objetos guardados y ten claro qué día usar cada uno" },
  ],
  // Day 1 has its own list (replaces the items taken from the KvK guide table for that day)
  day1Items: [
    { en:"After reset: claim the saved 08:00 UTC Intel rewards (Goldstones)", zh:"換日後：領取前一天留著的 UTC 08:00 情報任務獎勵（金石）", ko:"리셋 후: 남겨 둔 UTC 08:00 정보 임무 보상(금 원석) 수령하기", de:"Nach dem Reset: die gesparten 08:00-UTC-Geheimdienstbelohnungen (Goldsteine) einsammeln", fr:"Après la réinitialisation : récupérer les récompenses de Renseignement de 08:00 UTC gardées (pépites)", pt:"Depois do reset: coletar as recompensas guardadas das Missões de Inteligência das 08:00 UTC (Pedras Douradas)", tr:"Sıfırlamadan sonra: sakladığın 08:00 UTC İstihbarat ödüllerini (Altıntaşı) al", id:"Setelah reset: klaim hadiah Misi Intel 08:00 UTC yang disimpan (Goldstone)", ru:"После сброса: забрать сохранённые награды разведки 08:00 UTC (авантюрин)", th:"หลังรีเซ็ต: กดรับรางวัลภารกิจข่าวกรอง 08:00 UTC ที่เก็บไว้ (หินทอง)", ar:"بعد إعادة الضبط: استلم مكافآت استخبارات 08:00 UTC المحفوظة (أحجار الذهب)", es:"Tras el reinicio: reclama las recompensas guardadas de Inteligencia de las 08:00 UTC (piedras doradas)" },
    { en:"Activate {grayWolf} + {governorOrder}: {doubleTime}, then spend {truegold} on construction", zh:"開啟{grayWolf}＋{governorOrder}：{doubleTime}，再把{truegold}用在建築上", ko:"{grayWolf} + {governorOrder}: {doubleTime}을 켠 뒤 {truegold}을 건설에 사용하기", de:"{grayWolf} + {governorOrder}: {doubleTime} aktivieren, dann {truegold} für Bauten ausgeben", fr:"Activer {grayWolf} + {governorOrder} : {doubleTime}, puis dépenser l'{truegold} en construction", pt:"Ativar {grayWolf} + {governorOrder}: {doubleTime} e depois gastar {truegold} em construção", tr:"{grayWolf} + {governorOrder}: {doubleTime} aç, sonra {truegold} inşaata harca", id:"Aktifkan {grayWolf} + {governorOrder}: {doubleTime}, lalu pakai {truegold} untuk konstruksi", ru:"Включить питомца «{grayWolf}» + «{governorOrder}: {doubleTime}», затем тратить {truegold} на строительство", th:"เปิด{grayWolf} + {governorOrder}: {doubleTime} แล้วใช้{truegold}กับการสร้าง", ar:"فعّل {grayWolf} + {governorOrder}: {doubleTime}، ثم أنفق {truegold} على البناء", es:"Activa {grayWolf} + {governorOrder}: {doubleTime} y luego gasta la {truegold} en construcción" },
    { en:"Chief Minister: time your construction to start with your appointment", zh:"總理大臣：讓建築升級剛好在你的任期開始時開工", ko:"총리대신: 임명 시간이 시작될 때 건설을 시작하도록 맞추기", de:"Höchster Minister: den Bau so timen, dass er mit deiner Ernennung startet", fr:"Premier Ministre : lancez vos constructions au début de votre nomination", pt:"Primeiro-ministro: comece as construções junto com o início da sua nomeação", tr:"Başbakan: inşaatı atamanın başladığı anda başlatacak şekilde ayarla", id:"Perdana Menteri: mulai konstruksi tepat saat masa jabatanmu dimulai", ru:"Премьер-министр: начинайте стройку ровно с началом своего назначения", th:"อัครเสนาบดี: เริ่มการสร้างให้ตรงกับเวลาที่ได้รับแต่งตั้ง", ar:"رئيس الوزراء: ابدأ البناء مع بداية فترة تعيينك", es:"Ministro principal: haz que la construcción empiece justo con tu designación" },
    { en:"Turn on the buffs: {groundWorks} + NXS Builders Guild (check them under {cityBonus})", zh:"開啟增益：{groundWorks}＋NXS Builders Guild（可在「{cityBonus}」確認）", ko:"버프 켜기: {groundWorks} + NXS Builders Guild ('{cityBonus}'에서 확인)", de:"Buffs aktivieren: {groundWorks} + NXS Builders Guild (unter „{cityBonus}“ prüfen)", fr:"Activer les bonus : {groundWorks} + NXS Builders Guild (à vérifier dans « {cityBonus} »)", pt:"Ativar os bônus: {groundWorks} + NXS Builders Guild (confira em \"{cityBonus}\")", tr:"Güçlendirmeleri aç: {groundWorks} + NXS Builders Guild (\"{cityBonus}\" bölümünden kontrol et)", id:"Aktifkan buff: {groundWorks} + NXS Builders Guild (cek di \"{cityBonus}\")", ru:"Включить баффы: «{groundWorks}» + NXS Builders Guild (проверить в «{cityBonus}»)", th:"เปิดบัฟ: {groundWorks} + NXS Builders Guild (ตรวจได้ที่ \"{cityBonus}\")", ar:"فعّل التعزيزات: {groundWorks} + NXS Builders Guild (تحقق منها في \"{cityBonus}\")", es:"Activa los bonos: {groundWorks} + NXS Builders Guild (revísalos en \"{cityBonus}\")" },
    { en:"Complete & claim all {intel}", zh:"完成並領取所有{intel}", ko:"모든 {intel} 완료 및 수령하기", de:"Alle {intel} abschließen und einsammeln", fr:"Terminer et récupérer toutes les {intel}", pt:"Concluir e coletar todas as {intel}", tr:"Tüm {intel} tamamla ve ödülleri al", id:"Selesaikan & klaim semua {intel}", ru:"Выполнить и забрать все {intel}", th:"ทำและกดรับ{intel}ทั้งหมด", ar:"أكمل جميع {intel} واستلم مكافآتها", es:"Completa y reclama todas las {intel}" },
    { en:"Use {governorCharm}s ONLY if kingdom points are low — otherwise save them for Day 4", zh:"王國積分偏低時才用{governorCharm}，否則留到第 4 天", ko:"왕국 점수가 낮을 때만 {governorCharm} 사용 — 아니면 4일 차까지 남겨 두기", de:"{governorCharm} NUR nutzen, wenn die Königreichspunkte niedrig sind – sonst für Tag 4 aufheben", fr:"Utiliser les {governorCharm} SEULEMENT si les points du royaume sont bas — sinon les garder pour le Jour 4", pt:"Usar {governorCharm} SÓ se os pontos do reino estiverem baixos — senão guardar para o Dia 4", tr:"{governorCharm}'ı SADECE krallık puanı düşükse kullan — yoksa 4. güne sakla", id:"Pakai {governorCharm} HANYA jika poin kerajaan rendah — kalau tidak, simpan untuk Hari ke-4", ru:"Использовать {governorCharm} ТОЛЬКО если очков королевства мало — иначе оставить на день 4", th:"ใช้{governorCharm}เฉพาะเมื่อคะแนนอาณาจักรต่ำ — ไม่งั้นเก็บไว้วันที่ 4", ar:"استخدم {governorCharm} فقط إذا كانت نقاط المملكة منخفضة — وإلا ادّخرها لليوم 4", es:"Usa los {governorCharm} SOLO si los puntos del reino van bajos; si no, guárdalos para el Día 4" },
    { en:"Get ready for Day 2: apply for Chief Minister time slots for Day 2", zh:"準備第 2 天：申請第 2 天的總理大臣時段", ko:"2일 차 준비: 2일 차 총리대신 시간대 신청하기", de:"Vorbereitung auf Tag 2: Zeitfenster als Höchster Minister für Tag 2 beantragen", fr:"Préparer le Jour 2 : demander des créneaux de Premier Ministre pour le Jour 2", pt:"Preparar o Dia 2: pedir horários de Primeiro-ministro para o Dia 2", tr:"2. güne hazırlık: 2. gün için Başbakan zaman dilimlerine başvur", id:"Siapkan Hari ke-2: ajukan slot waktu Perdana Menteri untuk Hari ke-2", ru:"Подготовка ко дню 2: подать заявку на слоты Премьер-министра на день 2", th:"เตรียมวันที่ 2: สมัครช่วงเวลาอัครเสนาบดีของวันที่ 2", ar:"استعد لليوم 2: قدّم على فترات رئيس الوزراء لليوم 2", es:"Prepárate para el Día 2: solicita turnos de Ministro principal para el Día 2" },
    { en:"Send gathering marches around 12:00 UTC ({iron}) so they return after reset and score Day 2 points", zh:"UTC 12:00 左右派出採集隊（{iron}），讓它們換日後才回來，算進第 2 天積分", ko:"UTC 12:00쯤 채집 부대({iron}) 보내기 — 리셋 후 돌아와 2일 차 점수가 되도록", de:"Gegen 12:00 UTC Sammelmärsche ({iron}) losschicken, damit sie nach dem Reset zurückkommen und für Tag 2 zählen", fr:"Envoyer des marches de collecte vers 12:00 UTC ({iron}) pour qu'elles reviennent après la réinitialisation et comptent pour le Jour 2", pt:"Enviar marchas de coleta por volta das 12:00 UTC ({iron}) para voltarem depois do reset e pontuarem no Dia 2", tr:"12:00 UTC civarında toplama seferi ({iron}) gönder; sıfırlamadan sonra dönsün ve 2. gün puanı versin", id:"Kirim pasukan pengumpul sekitar 12:00 UTC ({iron}) agar kembali setelah reset dan masuk poin Hari ke-2", ru:"Около 12:00 UTC отправить отряды на сбор ({iron}), чтобы они вернулись после сброса и принесли очки дня 2", th:"ส่งทัพเก็บทรัพยากรราว 12:00 UTC ({iron}) ให้กลับหลังรีเซ็ต จะได้นับคะแนนวันที่ 2", ar:"أرسل مسيرات الجمع نحو 12:00 UTC ({iron}) لتعود بعد إعادة الضبط وتُحتسب في اليوم 2", es:"Envía marchas de recolección hacia las 12:00 UTC ({iron}) para que vuelvan tras el reinicio y sumen en el Día 2" },
  ],
  // Day 2 has its own list too
  day2Items: [
    { en:"Chief Minister: time your research to start with your appointment", zh:"總理大臣：讓研究剛好在你的任期開始時開始", ko:"총리대신: 임명 시간이 시작될 때 연구를 시작하도록 맞추기", de:"Höchster Minister: die Forschung so timen, dass sie mit deiner Ernennung startet", fr:"Premier Ministre : lancez vos recherches au début de votre nomination", pt:"Primeiro-ministro: comece as pesquisas junto com o início da sua nomeação", tr:"Başbakan: araştırmayı atamanın başladığı anda başlatacak şekilde ayarla", id:"Perdana Menteri: mulai penelitian tepat saat masa jabatanmu dimulai", ru:"Премьер-министр: начинайте исследования ровно с началом своего назначения", th:"อัครเสนาบดี: เริ่มการวิจัยให้ตรงกับเวลาที่ได้รับแต่งตั้ง", ar:"رئيس الوزراء: ابدأ البحث مع بداية فترة تعيينك", es:"Ministro principal: haz que la investigación empiece justo con tu designación" },
    { en:"Use {research} speedups", zh:"使用{research}加速", ko:"{research} 가속 사용하기", de:"{research}-Beschleunigungen benutzen", fr:"Utiliser les accélérateurs de {research}", pt:"Usar aceleradores de {research}", tr:"{research} hızlandırmalarını kullan", id:"Gunakan speedup {research}", ru:"Использовать ускорения исследований", th:"ใช้เร่งสปีด{research}", ar:"استخدم عناصر تسريع {research}", es:"Usa aceleradores de Investigación" },
    { en:"{heroRoulette}: use {gems}, aim for 120 spins max", zh:"{heroRoulette}：用{gems}抽，最多抽到 120 次", ko:"{heroRoulette}: {gems}로 돌리기, 최대 120회까지", de:"{heroRoulette}: {gems} einsetzen, höchstens 120 Drehungen", fr:"{heroRoulette} : utiliser des {gems}, 120 tours maximum", pt:"{heroRoulette}: usar {gems}, no máximo 120 giros", tr:"{heroRoulette}: {gems} kullan, en fazla 120 çevirme", id:"{heroRoulette}: pakai {gems}, maksimal 120 putaran", ru:"{heroRoulette}: тратить {gems}, не больше 120 вращений", th:"{heroRoulette}: ใช้{gems} หมุนได้สูงสุด 120 ครั้ง", ar:"{heroRoulette}: استخدم {gems}، بحد أقصى 120 دورة", es:"{heroRoulette}: usa {gems}, como máximo 120 tiradas" },
    { en:"Ascend your heroes with {heroShard}s", zh:"用{heroShard}幫英雄升星", ko:"{heroShard}으로 영웅 성급업하기", de:"Helden mit {heroShard}en aufsteigen lassen", fr:"Éveiller vos héros avec des fragments de héros", pt:"Ascender seus heróis com Fragmentos de Herói", tr:"{heroShard} ile kahramanlarını yükselt", id:"Ascend hero dengan {heroShard}", ru:"Повышать героев с помощью фрагментов героев", th:"ยกระดับฮีโร่ด้วย{heroShard}", ar:"ارتقِ بأبطالك باستخدام {heroShard}", es:"Asciende a tus héroes con Fragmentos de Héroe" },
    { en:"Use {masterEmblem} & {manuscript}s", zh:"使用{masterEmblem}和{manuscript}", ko:"{masterEmblem}와 {manuscript} 사용하기", de:"{masterEmblem} & {manuscript}e benutzen", fr:"Utiliser les {masterEmblem} et les manuscrits d'expert", pt:"Usar {masterEmblem} e Manuscritos de Mestre", tr:"{masterEmblem} ve {manuscript} kullan", id:"Gunakan {masterEmblem} & {manuscript}", ru:"Использовать {masterEmblem} и рукописи мастера", th:"ใช้{masterEmblem}และ{manuscript}", ar:"استخدم {masterEmblem} و{manuscript}", es:"Usa {masterEmblem} y Manuscritos del maestro" },
    { en:"Keep gathering all day — use the 600-gem gathering speed boost", zh:"整天持續{gathering}——開啟 600 鑽的採集速度加成", ko:"하루 종일 {gathering} 계속하기 — 600다이아 채집 속도 버프 사용", de:"Den ganzen Tag weiter sammeln — den Sammeltempo-Boost für 600 Edelsteine nutzen", fr:"Continuer la collecte toute la journée — utiliser le bonus de vitesse de collecte à 600 gemmes", pt:"Continuar coletando o dia todo — usar o bônus de velocidade de coleta de 600 gemas", tr:"Gün boyu toplamaya devam et — 600 elmaslık toplama hızı bonusunu kullan", id:"Terus mengumpulkan sepanjang hari — pakai bonus kecepatan mengumpulkan 600 permata", ru:"Весь день продолжать сбор — включить ускорение сбора за 600 алмазов", th:"เก็บทรัพยากรต่อทั้งวัน — ใช้บัฟสปีดการเก็บทรัพยากร 600 เพชร", ar:"واصل الجمع طوال اليوم — استخدم تعزيز سرعة الجمع مقابل 600 جوهرة", es:"Sigue recolectando todo el día — usa el aumento de velocidad de recolección de 600 gemas" },
    { en:"Make sure your last gathering marches return before reset", zh:"確認最後一批採集隊在換日前回來", ko:"마지막 채집 부대가 리셋 전에 돌아오도록 하기", de:"Darauf achten, dass die letzten Sammelmärsche vor dem Reset zurück sind", fr:"S'assurer que les dernières marches de collecte reviennent avant la réinitialisation", pt:"Garantir que as últimas marchas de coleta voltem antes do reset", tr:"Son toplama seferlerinin sıfırlamadan önce dönmesini sağla", id:"Pastikan pasukan pengumpul terakhir kembali sebelum reset", ru:"Проследить, чтобы последние отряды сбора вернулись до сброса", th:"ให้ทัพเก็บทรัพยากรชุดสุดท้ายกลับมาก่อนรีเซ็ต", ar:"تأكد من عودة آخر مسيرات الجمع قبل إعادة الضبط", es:"Asegúrate de que tus últimas marchas de recolección vuelvan antes del reinicio" },
    { en:"Get ready for Day 3: skip the 16:00 UTC {intel} and complete them after reset", zh:"準備第 3 天：跳過 UTC 16:00 的{intel}，換日後再完成", ko:"3일 차 준비: UTC 16:00 {intel}은 건너뛰고 리셋 후에 완료하기", de:"Vorbereitung auf Tag 3: die {intel} um 16:00 UTC auslassen und nach dem Reset abschließen", fr:"Préparer le Jour 3 : sauter les {intel} de 16:00 UTC et les terminer après la réinitialisation", pt:"Preparar o Dia 3: pular as {intel} das 16:00 UTC e concluí-las depois do reset", tr:"3. güne hazırlık: 16:00 UTC {intel} atla, sıfırlamadan sonra tamamla", id:"Siapkan Hari ke-3: lewati {intel} 16:00 UTC dan selesaikan setelah reset", ru:"Подготовка ко дню 3: пропустить {intel} в 16:00 UTC и выполнить их после сброса", th:"เตรียมวันที่ 3: ข้าม{intel}รอบ 16:00 UTC แล้วไปทำหลังรีเซ็ต", ar:"استعد لليوم 3: تخطَّ {intel} في 16:00 UTC وأكملها بعد إعادة الضبط", es:"Prepárate para el Día 3: sáltate las {intel} de las 16:00 UTC y complétalas tras el reinicio" },
  ],
  // Day 3 has its own list too
  day3Items: [
    { en:"Use {advancedTamingMarks} & {commonTamingMarks}", zh:"使用{advancedTamingMarks}和{commonTamingMarks}", ko:"{advancedTamingMarks}과 {commonTamingMarks} 사용하기", de:"{advancedTamingMarks} & {commonTamingMarks} benutzen", fr:"Utiliser les {advancedTamingMarks} et les {commonTamingMarks}", pt:"Usar {advancedTamingMarks} e {commonTamingMarks}", tr:"{advancedTamingMarks} ve {commonTamingMarks} kullan", id:"Gunakan {advancedTamingMarks} & {commonTamingMarks}", ru:"Использовать продвинутые и обычные метки приручения", th:"ใช้{advancedTamingMarks}และ{commonTamingMarks}", ar:"استخدم {advancedTamingMarks} و{commonTamingMarks}", es:"Usa {advancedTamingMarks} y {commonTamingMarks}" },
    { en:"Complete & claim all {intel}", zh:"完成並領取所有{intel}", ko:"모든 {intel} 완료 및 수령하기", de:"Alle {intel} abschließen und einsammeln", fr:"Terminer et récupérer toutes les {intel}", pt:"Concluir e coletar todas as {intel}", tr:"Tüm {intel} tamamla ve ödülleri al", id:"Selesaikan & klaim semua {intel}", ru:"Выполнить и забрать все {intel}", th:"ทำและกดรับ{intel}ทั้งหมด", ar:"أكمل جميع {intel} واستلم مكافآتها", es:"Completa y reclama todas las {intel}" },
    { en:"{heroRoulette}: use {gems}, aim for 120 spins", zh:"{heroRoulette}：用{gems}抽，目標 120 次", ko:"{heroRoulette}: {gems}로 돌리기, 목표 120회", de:"{heroRoulette}: {gems} einsetzen, Ziel 120 Drehungen", fr:"{heroRoulette} : utiliser des {gems}, objectif 120 tours", pt:"{heroRoulette}: usar {gems}, meta de 120 giros", tr:"{heroRoulette}: {gems} kullan, hedef 120 çevirme", id:"{heroRoulette}: pakai {gems}, target 120 putaran", ru:"{heroRoulette}: тратить {gems}, цель — 120 вращений", th:"{heroRoulette}: ใช้{gems} เป้าหมาย 120 ครั้ง", ar:"{heroRoulette}: استخدم {gems}، الهدف 120 دورة", es:"{heroRoulette}: usa {gems}, objetivo 120 tiradas" },
    { en:"Use {heroShard}s, {masterEmblem} & {manuscript}s", zh:"使用{heroShard}、{masterEmblem}和{manuscript}", ko:"{heroShard}, {masterEmblem}, {manuscript} 사용하기", de:"{heroShard}e, {masterEmblem} & {manuscript}e benutzen", fr:"Utiliser les fragments de héros, les {masterEmblem} et les manuscrits d'expert", pt:"Usar Fragmentos de Herói, {masterEmblem} e Manuscritos de Mestre", tr:"{heroShard}, {masterEmblem} ve {manuscript} kullan", id:"Gunakan {heroShard}, {masterEmblem} & {manuscript}", ru:"Использовать фрагменты героев, {masterEmblem} и рукописи мастера", th:"ใช้{heroShard} {masterEmblem}และ{manuscript}", ar:"استخدم {heroShard} و{masterEmblem} و{manuscript}", es:"Usa Fragmentos de Héroe, {masterEmblem} y Manuscritos del maestro" },
    { en:"Get ready for Day 4: apply for Noble Advisor time slots for Day 4", zh:"準備第 4 天：申請第 4 天的參謀長時段", ko:"4일 차 준비: 4일 차 참모장 시간대 신청하기", de:"Vorbereitung auf Tag 4: Zeitfenster als Nobler Berater für Tag 4 beantragen", fr:"Préparer le Jour 4 : demander des créneaux de Noble Conseiller pour le Jour 4", pt:"Preparar o Dia 4: pedir horários de Conselheiro Nobre para o Dia 4", tr:"4. güne hazırlık: 4. gün için Asil Danışman zaman dilimlerine başvur", id:"Siapkan Hari ke-4: ajukan slot waktu Penasihat Kerajaan untuk Hari ke-4", ru:"Подготовка к 4-му дню: подать заявку на время Советника на 4-й день", th:"เตรียมวันที่ 4: สมัครช่วงเวลาขุนนางที่ปรึกษาของวันที่ 4", ar:"استعد لليوم 4: قدّم طلبًا لفترات مستشار نبيل لليوم 4", es:"Prepara el Día 4: solicita turnos de Noble asesor para el Día 4" },
    { en:"Train troops ONE tier below your highest tier today", zh:"今天訓練比你最高階「低一階」的士兵", ko:"오늘은 최고 등급보다 한 단계 낮은 병사를 훈련하기", de:"Heute Truppen EINE Stufe unter deiner höchsten Stufe ausbilden", fr:"Aujourd'hui, entraîner des troupes d'UN niveau en dessous de votre niveau le plus élevé", pt:"Hoje, treinar tropas UM nível abaixo do seu nível mais alto", tr:"Bugün en yüksek kademenin BİR altındaki birlikleri eğit", id:"Hari ini latih pasukan SATU tingkat di bawah tingkat tertinggimu", ru:"Сегодня тренировать войска на ОДИН уровень ниже вашего самого высокого", th:"วันนี้ฝึกทหารที่ต่ำกว่าระดับสูงสุดของคุณ 1 ระดับ", ar:"اليوم درّب قوات أقل بمستوى واحد من أعلى مستوى لديك", es:"Hoy entrena tropas UN nivel por debajo de tu nivel más alto" },
    { en:"Tomorrow (Day 4): promote them to your highest tier during your Noble Advisor appointment", zh:"明天（第 4 天）：在你的參謀長任期內，把他們晉升到最高階", ko:"내일(4일 차): 참모장 임명 시간에 최고 등급으로 승급하기", de:"Morgen (Tag 4): sie während deiner Ernennung als Nobler Berater auf deine höchste Stufe befördern", fr:"Demain (Jour 4) : les promouvoir à votre niveau le plus élevé pendant votre nomination de Noble Conseiller", pt:"Amanhã (Dia 4): promovê-las ao seu nível mais alto durante sua nomeação de Conselheiro Nobre", tr:"Yarın (4. gün): Asil Danışman atamanda onları en yüksek kademeye terfi ettir", id:"Besok (Hari ke-4): promosikan ke tingkat tertinggi saat jabatan Penasihat Kerajaan-mu", ru:"Завтра (4-й день): повысить их до вашего самого высокого уровня во время назначения Советником", th:"พรุ่งนี้ (วันที่ 4): เลื่อนขั้นทหารเหล่านี้เป็นระดับสูงสุดระหว่างช่วงตำแหน่งขุนนางที่ปรึกษาของคุณ", ar:"غدًا (اليوم 4): رقِّها إلى أعلى مستوى خلال فترة تعيينك مستشارًا نبيلًا", es:"Mañana (Día 4): asciéndelas a tu nivel más alto durante tu turno de Noble asesor" },
  ],
  // Day 4 has its own list too
  day4Items: [
    { en:"During your Noble Advisor appointment, spend 3,000 {gems} to increase Training Capacity", zh:"在你的參謀長任期內，花 3,000 {gems}提高訓練容量", ko:"참모장 임명 시간에 {gems} 3,000개로 훈련 수용량 늘리기", de:"Während deiner Ernennung als Nobler Berater 3.000 {gems} ausgeben, um die Trainingskapazität zu erhöhen", fr:"Pendant votre nomination de Noble Conseiller, dépenser 3 000 {gems} pour augmenter la capacité d'entraînement", pt:"Durante sua nomeação de Conselheiro Nobre, gastar 3.000 {gems} para aumentar a capacidade de treinamento", tr:"Asil Danışman atamanda eğitim kapasitesini artırmak için 3.000 {gems} harca", id:"Saat jabatan Penasihat Kerajaan-mu, habiskan 3.000 {gems} untuk menambah kapasitas pelatihan", ru:"Во время назначения Советником потратить 3 000 алмазов, чтобы увеличить вместимость тренировки", th:"ระหว่างช่วงตำแหน่งขุนนางที่ปรึกษาของคุณ ใช้{gems} 3,000 เพื่อเพิ่มความจุการฝึก", ar:"خلال فترة تعيينك مستشارًا نبيلًا، أنفق 3,000 من {gems} لزيادة سعة التدريب", es:"Durante tu turno de Noble asesor, gasta 3.000 {gems} para aumentar la capacidad de entrenamiento" },
    { en:"Train/promote troops to your highest tier — use {training} speedups", zh:"訓練／晉升士兵到你的最高階——使用{training}加速", ko:"최고 등급으로 병사 훈련/승급하기 — {training} 가속 사용", de:"Truppen auf deiner höchsten Stufe ausbilden/befördern — {training}-Beschleunigungen benutzen", fr:"Entraîner/promouvoir des troupes à votre niveau le plus élevé — utiliser les accélérateurs d'{training}", pt:"Treinar/promover tropas ao seu nível mais alto — usar aceleradores de {training}", tr:"En yüksek kademede asker eğit/terfi ettir — {training} hızlandırmalarını kullan", id:"Latih/promosikan pasukan ke tingkat tertinggimu — gunakan speedup {training}", ru:"Тренировать/повышать войска до самого высокого уровня — использовать ускорения тренировки", th:"ฝึก/เลื่อนขั้นทหารเป็นระดับสูงสุดของคุณ — ใช้ตัวเร่ง{training}", ar:"درّب/رقِّ القوات إلى أعلى مستوى لديك — استخدم مسرّعات {training}", es:"Entrena/asciende tropas a tu nivel más alto — usa aceleradores de {training}" },
    { en:"Use {governorCharm}s", zh:"使用{governorCharm}", ko:"{governorCharm} 사용하기", de:"{governorCharm}e benutzen", fr:"Utiliser les {governorCharm}", pt:"Usar {governorCharm}", tr:"{governorCharm} kullan", id:"Gunakan {governorCharm}", ru:"Использовать {governorCharm}", th:"ใช้{governorCharm}", ar:"استخدم {governorCharm}", es:"Usa los {governorCharm}" },
    { en:"{mithril}, {widget}s & {forgehammer}s also score today, but save them for Day 5 — focus on troops", zh:"{mithril}、{widget}和{forgehammer}今天也有積分，但請留到第 5 天——今天專心練兵", ko:"{mithril}, {widget}, {forgehammer}도 오늘 점수가 되지만 5일 차까지 남겨 두기 — 오늘은 병사에 집중", de:"{mithril}, {widget}e & {forgehammer} zählen heute auch, aber für Tag 5 aufheben — heute auf Truppen konzentrieren", fr:"Le {mithril}, les Composants et les Marteaux de Forge rapportent aussi des points aujourd'hui, mais gardez-les pour le Jour 5 — concentrez-vous sur les troupes", pt:"{mithril}, Ferramentas e Martelos de forja também pontuam hoje, mas guarde-os para o Dia 5 — foque nas tropas", tr:"{mithril}, {widget} ve {forgehammer} bugün de puan verir ama 5. gün için sakla — bugün askerlere odaklan", id:"{mithril}, {widget} & {forgehammer} juga memberi poin hari ini, tapi simpan untuk Hari ke-5 — fokus pada pasukan", ru:"Мифрил, поделки и кузнечные молоты сегодня тоже дают очки, но сохраните их для 5-го дня — сосредоточьтесь на войсках", th:"{mithril} {widget} และ{forgehammer}วันนี้ก็ได้คะแนน แต่เก็บไว้ใช้วันที่ 5 — วันนี้เน้นทหาร", ar:"{mithril} و{widget} و{forgehammer} تمنح نقاطًا اليوم أيضًا، لكن احتفظ بها لليوم 5 — ركّز على القوات", es:"El {mithril}, los Complementos y los Martillos de Forja también puntúan hoy, pero guárdalos para el Día 5 — céntrate en las tropas" },
    { en:"Get ready for Day 5: apply for Chief Minister time slots for Day 5", zh:"準備第 5 天：申請第 5 天的總理大臣時段", ko:"5일 차 준비: 5일 차 총리대신 시간대 신청하기", de:"Vorbereitung auf Tag 5: Zeitfenster als Höchster Minister für Tag 5 beantragen", fr:"Préparer le Jour 5 : demander des créneaux de Premier Ministre pour le Jour 5", pt:"Preparar o Dia 5: pedir horários de Primeiro-ministro para o Dia 5", tr:"5. güne hazırlık: 5. gün için Başbakan zaman dilimlerine başvur", id:"Siapkan Hari ke-5: ajukan slot waktu Perdana Menteri untuk Hari ke-5", ru:"Подготовка ко дню 5: подать заявку на слоты Премьер-министра на день 5", th:"เตรียมวันที่ 5: สมัครช่วงเวลาอัครเสนาบดีของวันที่ 5", ar:"استعد لليوم 5: قدّم على فترات رئيس الوزراء لليوم 5", es:"Prepárate para el Día 5: solicita turnos de Ministro principal para el Día 5" },
    { en:"Get ready for Day 5: skip the 16:00 UTC {intel} and complete them after reset", zh:"準備第 5 天：跳過 UTC 16:00 的{intel}，換日後再完成", ko:"5일 차 준비: UTC 16:00 {intel}은 건너뛰고 리셋 후에 완료하기", de:"Vorbereitung auf Tag 5: die {intel} um 16:00 UTC auslassen und nach dem Reset abschließen", fr:"Préparer le Jour 5 : sauter les {intel} de 16:00 UTC et les terminer après la réinitialisation", pt:"Preparar o Dia 5: pular as {intel} das 16:00 UTC e concluí-las depois do reset", tr:"5. güne hazırlık: 16:00 UTC {intel} atla, sıfırlamadan sonra tamamla", id:"Siapkan Hari ke-5: lewati {intel} 16:00 UTC dan selesaikan setelah reset", ru:"Подготовка ко дню 5: пропустить {intel} в 16:00 UTC и выполнить их после сброса", th:"เตรียมวันที่ 5: ข้าม{intel}รอบ 16:00 UTC แล้วไปทำหลังรีเซ็ต", ar:"استعد لليوم 5: تخطَّ {intel} في 16:00 UTC وأكملها بعد إعادة الضبط", es:"Prepárate para el Día 5: sáltate las {intel} de las 16:00 UTC y complétalas tras el reinicio" },
    { en:"Day 5 scores {governorGear}, {construction}, {research}, {intel} & {pets} — save plenty for it", zh:"第 5 天計分：{governorGear}、{construction}、{research}、{intel}和{pets}——請多留一些", ko:"5일 차 점수 항목: {governorGear}, {construction}, {research}, {intel}, {pets} — 넉넉히 남겨 두기", de:"Tag 5 zählt {governorGear}, {construction}, {research}, {intel} & {pets} — viel dafür aufheben", fr:"Le Jour 5 compte : {governorGear}, {construction}, {research}, {intel} et {pets} — gardez-en beaucoup", pt:"O Dia 5 pontua: {governorGear}, {construction}, {research}, {intel} e {pets} — guarde bastante", tr:"5. gün puanları: {governorGear}, {construction}, {research}, {intel} ve {pets} — bolca sakla", id:"Hari ke-5 menghitung {governorGear}, {construction}, {research}, {intel} & {pets} — simpan banyak", ru:"5-й день засчитывает: {governorGear}, {construction}, {research}, {intel} и {pets} — сохраните побольше", th:"วันที่ 5 นับคะแนน: {governorGear} {construction} {research} {intel} และ{pets} — เก็บไว้เยอะๆ", ar:"اليوم 5 يحتسب: {governorGear} و{construction} و{research} و{intel} و{pets} — احتفظ بالكثير", es:"El Día 5 puntúa: {governorGear}, {construction}, {research}, {intel} y {pets} — guarda mucho" },
  ],
  day6Items: [
    { en:"Castle Battle 12:00–22:00 UTC — follow the rally calls in alliance chat", zh:"王城爭奪戰 UTC 12:00–22:00 — 跟著聯盟聊天室的集結指示行動", ko:"성 전투 UTC 12:00–22:00 — 연맹 채팅의 집결 지시를 따르기", de:"Schlosskampf 12:00–22:00 UTC – den Rally-Ansagen im Allianz-Chat folgen", fr:"Bataille du château 12:00–22:00 UTC — suivez les appels de ralliement dans le chat d'alliance", pt:"Batalha do Castelo 12:00–22:00 UTC — siga as chamadas de rally no chat da aliança", tr:"Kale Savaşı 12:00–22:00 UTC — ittifak sohbetindeki seferberlik çağrılarını takip et", id:"Pertempuran Kastil 12:00–22:00 UTC — ikuti panggilan reli di chat aliansi", ru:"Битва за замок 12:00–22:00 UTC — следите за призывами к рейдам в чате альянса", th:"ศึกชิงปราสาท 12:00–22:00 UTC — ทำตามคำสั่งระดมพลในแชทพันธมิตร", ar:"معركة القلعة 12:00–22:00 UTC — اتبع نداءات الحشد في دردشة التحالف", es:"Batalla del Castillo 12:00–22:00 UTC — sigue las llamadas de ataque en el chat de la alianza" },
    { en:"Exchange {rescueOrders} in alliance chat before the timer runs out", zh:"在計時結束前，到聯盟聊天室交換{rescueOrders}", ko:"타이머가 끝나기 전에 연맹 채팅에서 {rescueOrders} 교환하기", de:"{rescueOrders} im Allianz-Chat tauschen, bevor der Timer abläuft", fr:"Échangez les {rescueOrders} dans le chat d'alliance avant la fin du compte à rebours", pt:"Troque {rescueOrders} no chat da aliança antes de o tempo acabar", tr:"Süre bitmeden ittifak sohbetinde {rescueOrders} takası yap", id:"Tukar {rescueOrders} di chat aliansi sebelum waktunya habis", ru:"Обменяйтесь «{rescueOrders}» в чате альянса до конца таймера", th:"แลก{rescueOrders}ในแชทพันธมิตรก่อนหมดเวลา", ar:"تبادل {rescueOrders} في دردشة التحالف قبل انتهاء الوقت", es:"Intercambia {rescueOrders} en el chat de la alianza antes de que acabe el tiempo" },
  ],
};

(function () {
  const sched = EVENT_SCHEDULES.kvk;
  if (!sched) return;
  const DAY = 86400000, LAST_DAY = 6;
  const diff = Math.floor((Date.now() - sched.anchor) / DAY);
  if (diff < -1) return;
  const pos = ((diff % sched.periodDays) + sched.periodDays) % sched.periodDays;
  let dayNo, start;                                   // dayNo 0 = day before, 1..6 = KvK day
  if (diff === -1 || pos === sched.periodDays - 1) { dayNo = 0; start = sched.anchor + (diff + 1) * DAY; }
  else if (pos < LAST_DAY) { dayNo = pos + 1; start = sched.anchor + (diff - pos) * DAY; }
  else return;

  // items for today: [{ text(lang map or rendered string) }]
  function todaysItems() {
    if (dayNo === 0) return KVK_CHECK.dayBeforeItems.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    if (dayNo === 1) return KVK_CHECK.day1Items.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    if (dayNo === 2) return KVK_CHECK.day2Items.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    if (dayNo === 3) return KVK_CHECK.day3Items.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    if (dayNo === 4) return KVK_CHECK.day4Items.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    if (dayNo === LAST_DAY) return KVK_CHECK.day6Items.map((it) => rich(t(it)).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
    const sec = GUIDES.kvk && (GUIDES.kvk.sections[currentLang] || GUIDES.kvk.sections.en);
    const tbl = sec && sec.blocks.find((b) => b.type === "checklist");
    if (!tbl) return [];
    const col = tbl.days.indexOf(dayNo);
    const plain = (x) => rich(x).replace(/<[^>]+>/g, "").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
    const out = [];
    for (const [icon, key] of [["✅", "useIcon"], ["👍", "needDaily"]]) {
      tbl.rows.filter((r) => r.icons[col] === icon).forEach((r) => out.push(`${icon} ${term(key)}: ${plain(r.label)}`));
    }
    return out;
  }
  const n = () => todaysItems().length;
  const KEY = "ks-kvk-check-" + new Date(start).toISOString().slice(0, 10) + "-d" + dayNo;
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const store = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  const dayTitle = () => dayNo === 0 ? t(KVK_CHECK.dayBefore) : dayNo === LAST_DAY ? t(KVK_CHECK.battle) : t(KVK_CHECK.prepN).replace("{n}", dayNo);
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
    const c = load().length, total = n();
    fab.classList.toggle("todo", c < total);
    fab.innerHTML = `📋 ${escapeHtml(dayTitle())} <span class="kvk-n">${c}/${total}</span>`;
  }
  paintFab();
  window.kvkRepaint = paintFab; // called by renderAll() so the button follows language changes

  fab.onclick = () => {
    const box = document.createElement("div");
    box.className = "kvk-modal";
    const before = Date.now() < start;
    const d = new Date(start).toLocaleDateString(HTML_LANG[currentLang] || "en", { month: "short", day: "numeric", timeZone: "UTC" });
    function paint() {
      const done = load();
      box.innerHTML = `<div class="kvk-box" dir="auto">
        <h3>📋 ${escapeHtml(dayTitle())}</h3>
        <div class="kvk-sub">${escapeHtml(before ? t(KVK_CHECK.starts).replace("{d}", d) : t(KVK_CHECK.live))} · ${escapeHtml(t(KVK_CHECK.note))}</div>
        ${todaysItems().map((txt, i) => `<label class="kvk-item${done.includes(i) ? " on" : ""}"><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}><span>${escapeHtml(txt)}</span></label>`).join("")}
        ${done.length >= n() ? `<div class="kvk-sub" style="margin:4px 0 0">${escapeHtml(t(KVK_CHECK.done))}</div>` : ""}
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
