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

function restorePrefs() {
  // Opening the plain site link always starts on English + the first guide.
  // A shared link with a hash (e.g. #/ko/swordland-showdown) still opens that page.
  readHash();
}

function persistPrefs() {
  writeHash();
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
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
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
  "swordland-showdown":   { anchor: Date.UTC(2026, 8, 20), periodDays: 14, activeDays: 1 }
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
  }
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
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ignore */ }
    renderAll();
  };
  row.appendChild(btn);
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
      langChosen = true;
      persistPrefs();
      renderAll();
    };
    grid.appendChild(btn);
  });
}

function renderGuideRow() {
  const row = document.getElementById("guideRow");
  row.innerHTML = "";
  guideKeys().forEach((key) => {
    const g = GUIDES[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "guide-chip" + (key === currentGuide ? " active" : "");
    btn.innerHTML = `<span class="emoji">${g.emoji}</span><span dir="auto">${escapeHtml(t(g.name) || key)}</span>`;
    btn.onclick = () => {
      currentGuide = key;
      persistPrefs();
      renderAll();
    };
    row.appendChild(btn);
  });
}

/* Order of the guide buttons at the top. Guides not listed here are added at the end. */
const GUIDE_ORDER = ["recent-events", "formations-rally-tips", "f2p-heroes", "bear-hunt", "swordland-showdown", "kvk"];

function guideKeys() {
  const all = Object.keys(GUIDES);
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
  currentAnnIndex = i;
  renderDoc();
}
window.selectAnnouncement = selectAnnouncement;

function selectAnnouncement(i) {
  currentAnnIndex = i;
  renderDoc();
}
window.selectAnnouncement = selectAnnouncement;

function renderAnnTicker() {
  const ticker = document.getElementById("annTicker");
  const track = document.getElementById("annTickerTrack");
  if (!announcements.length) { ticker.hidden = true; return; }
  ticker.hidden = false;
  const latest = announcements[0];
  const text = latest.content[currentLang] || latest.content.en || Object.values(latest.content)[0] || "";
  const plain = text.replace(/\{(\w+)\}/g, (m, id) => (GLOSSARY[id] ? t(GLOSSARY[id]) : m))
                     .replace(/\*\*(.+?)\*\*/g, "$1");
  track.textContent = `📢 ${plain}`;
}

function goToAnnouncements() {
  currentGuide = "recent-events";
  persistPrefs();
  renderAll();
  requestAnimationFrame(() => {
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

function renderLeaders(guide) {
  const wrap = document.createElement("div");
  (guide.leaders || []).forEach((gen) => {
    const card = document.createElement("div");
    card.className = "gen-card";
    const genLabel = typeof gen.gen === "string" ? gen.gen : t(gen.gen);
    if (gen.tbd) {
      card.innerHTML = `<div class="gen-label">${escapeHtml(genLabel)}</div><div class="tbd">${escapeHtml(t(gen.tbd))}</div>`;
      wrap.appendChild(card);
      return;
    }
    let rowsHtml = `<div class="gen-label">${escapeHtml(genLabel)}</div>`;
    gen.rows.forEach((r) => {
      const note = t(r.note);
      const tagLabel = (UI.tags[r.tag] && t(UI.tags[r.tag])) || r.tag.toUpperCase();
      const ratio = r.ratio
        ? `<span class="ratio">${escapeHtml(r.ratio)}</span>`
        : "";
      rowsHtml += `
        <div class="lineup-row">
          <div class="lineup-left">
            <span class="tag ${escapeHtml(r.tag)}">${escapeHtml(tagLabel)}</span>
            <span class="heroes">${escapeHtml(formatHeroes(r.heroes))}</span>
          </div>
          ${ratio}
        </div>
        ${note ? `<div class="gen-note">${escapeHtml(note)}</div>` : ""}`;
    });
    card.innerHTML = rowsHtml;
    wrap.appendChild(card);
  });
  return wrap;
}

function renderPrep(prep) {
  let html = "";
  (prep || []).forEach((item) => {
    if (typeof item === "string") {
      html += `<li>${escapeHtml(item)}</li>`;
    } else if (item && item.callout) {
      html += `<div class="callout">${item.text}</div>`;
    }
  });
  return html;
}

function renderJoiners(guide) {
  const wrap = document.createElement("div");
  wrap.className = "joiner-list";
  (guide.joiners || []).forEach((j) => {
    const card = document.createElement("div");
    card.className = "joiner-card";
    const name = heroName(j.hero || j.name);
    const initial = (name || "?").charAt(0);
    const role = (UI.roles[j.role] && t(UI.roles[j.role])) || "";
    card.innerHTML = `
      <div class="joiner-avatar" aria-hidden="true">${escapeHtml(initial)}</div>
      <div class="joiner-meta">
        <div class="joiner-name">${escapeHtml(name)}</div>
        ${role ? `<div class="joiner-role">${escapeHtml(role)}</div>` : ""}
      </div>
    `;
    wrap.appendChild(card);
  });
  return wrap;
}

function renderDoc() {
  const doc = document.getElementById("doc");
  const guide = GUIDES[currentGuide];
  const s = guide.sections[currentLang];

  if (!s) {
    const langLabel = LANGS.find((l) => l.code === currentLang)?.label || currentLang;
    doc.innerHTML = `<div class="missing-lang">${escapeHtml(langLabel)} ${escapeHtml(t(UI.missingLang))}</div>`;
    return;
  }

  /* 新式攻略：以 blocks 撰寫（聖劍爭奪） */
  if (s.blocks) {
    doc.innerHTML = `<div class="doc-title"><span class="emoji">${guide.emoji}</span><span>${escapeHtml(s.title)}</span></div>`;
    doc.appendChild(renderBlocks(guide, s));
    return;
  }

  /* 舊式攻略：熊獵流程（不變） */
  doc.innerHTML = `
    <div class="doc-title"><span class="emoji">${guide.emoji}</span><span>${escapeHtml(s.title)}</span></div>
    <div class="section">
      <h3>${escapeHtml(s.when_label)}</h3>
      <p>${escapeHtml(s.when)}</p>
    </div>
    <div class="section">
      <h3>${escapeHtml(s.why_label)}</h3>
      <p>${escapeHtml(s.why)}</p>
    </div>
    <div class="section">
      <h3>${escapeHtml(s.prep_label)}</h3>
      <ul class="prep-list">${renderPrep(s.prep)}</ul>
    </div>
    <div class="section">
      <h3>${escapeHtml(s.leaders_label)}</h3>
    </div>
  `;
  doc.appendChild(renderLeaders(guide));

  const joinersSection = document.createElement("div");
  joinersSection.className = "section";
  joinersSection.style.marginTop = "20px";
  joinersSection.innerHTML = `
    <h3>${escapeHtml(s.joiners_label)}</h3>
    <p>${escapeHtml(s.joiners_ratio)}</p>
  `;
  if (s.joiners_note) {
    const note = document.createElement("p");
    note.className = "tbd";
    note.textContent = s.joiners_note;
    joinersSection.appendChild(note);
  }
  joinersSection.appendChild(renderJoiners(guide));
  doc.appendChild(joinersSection);
}

function renderAll() {
  document.getElementById("siteTitle").textContent = SITE_TITLE;
  document.getElementById("footerNote").textContent = t(UI.footerNote);
  document.title = `${SITE_TITLE} · ${t(GUIDES[currentGuide].name)}`;
  document.documentElement.lang = HTML_LANG[currentLang] || currentLang;
  const curLang = LANGS.find((l) => l.code === currentLang);
  document.documentElement.dir = (curLang && curLang.dir) || "ltr";
  if (!langChosen) { renderPicker(); return; }
  renderAnnTicker();
  renderLangRow();
  renderGuideRow();
  renderDoc();
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
