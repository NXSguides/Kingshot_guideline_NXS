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
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
}

function fmt(n) {
  const loc = (HTML_LANG[currentLang] || "en") + (currentLang === "ar" ? "-u-nu-latn" : "");
  return n.toLocaleString(loc);
}

const ul = (items) =>
  `<ul class="prep-list">${items.map((i) => `<li>${rich(i)}</li>`).join("")}</ul>`;

const BLOCKS = {
  h: (b) => `<h3 class="section-h">${rich(b.text)}</h3>`,
  sub: (b) => `<h4 class="sub-h">${rich(b.text)}</h4>`,
  p: (b) => `<p>${rich(b.text)}</p>`,
  list: (b) => ul(b.items),
  callout: (b) => `<div class="callout flat">${rich(b.text)}</div>`,
  img: (b) => `<img class="fig" src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt || "")}" loading="lazy">`,

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
  }).join("")
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
  renderLangRow();
  renderGuideRow();
  renderDoc();
}

restorePrefs();
initTheme();
renderAll();

window.addEventListener("hashchange", () => {
  readHash();
  persistPrefs();
  renderAll();
});
