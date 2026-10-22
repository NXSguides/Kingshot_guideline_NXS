/* 📜 Announcement looks (chosen on the officer 📢 Post page, saved as "style" on the announcement).
   The scroll is Armada's artwork cut in three: top (rolled paper + banners), middle (plain paper, repeats
   when the text is long) and bottom (rolled paper). The banner colour changes per theme.
   A theme can also have a picture: it sits on top and the scroll overlaps its bottom part.
   Banners are never red (Nia doesn't like red). An announcement can pick its own banner colour: style "theme.colour".
   To add a theme: put the picture in figures/themes/ and add a line below. */
const ANN_THEMES = {
  scroll:    { flag: "teal",  emoji: "📜", name: { en: "Scroll", zh: "捲軸", ko: "두루마리", ar: "لفافة", pt: "Pergaminho" } },
  swordland: { flag: "yellow",  emoji: "⚔️", img: "figures/themes/swordland.webp", pos: "center 35%", ext: "#5a1e12", name: { en: "Swordland Showdown", zh: "聖劍爭奪", ko: "성검 쟁탈", ar: "مواجهة أرض السيوف", pt: "Confronto entre Espadas" } },
  viking:    { flag: "blue", emoji: "⛵", img: "figures/themes/viking.webp", pos: "center 45%", ext: "#16213f", name: { en: "Viking Vengeance", zh: "維京復仇", ko: "바이킹의 복수", ar: "انتقام الفايكنج", pt: "Vingança Viking" } },
};
const ANN_FLAGS = {
  yellow: { en: "Yellow", zh: "黃", ko: "노랑", ar: "أصفر", pt: "Amarelo" }, blue: { en: "Blue", zh: "藍", ko: "파랑", ar: "أزرق", pt: "Azul" },
  navy: { en: "Navy", zh: "深藍", ko: "남색", ar: "كحلي", pt: "Azul-marinho" }, teal: { en: "Teal", zh: "青綠", ko: "청록", ar: "تركوازي", pt: "Verde-azulado" },
  green: { en: "Green", zh: "綠", ko: "초록", ar: "أخضر", pt: "Verde" }, purple: { en: "Purple", zh: "紫", ko: "보라", ar: "بنفسجي", pt: "Roxo" },
};
/* "viking" or "viking.yellow" → { key, theme, flag } */
function annStyleParts(style) {
  const [k, f] = String(style || "").split(".");
  const theme = ANN_THEMES[k] || ANN_THEMES.scroll;
  return { key: ANN_THEMES[k] ? k : "scroll", theme, flag: ANN_FLAGS[f] ? f : theme.flag, own: !!ANN_FLAGS[f] };
}
/* the whole announcement body on a scroll; inner = title/text/pictures HTML that is already escaped */
function annThemeHtml(style, titleHtml, innerHtml) {
  const { theme: t, flag } = annStyleParts(style);
  const scroll = `<div class="sc2"><div class="sc2-bg"><div class="sc2-t" style="background-image:url(figures/scroll/top-${flag}.webp)"></div><div class="sc2-m"></div><div class="sc2-b"></div></div>` +
    `<div class="sc2-tx">${titleHtml ? `<div class="sc2-title" dir="auto">${titleHtml}</div><div class="sc2-orn">✦</div>` : ""}${innerHtml}</div></div>`;
  if (!t.img) return `<div class="annx">${scroll}</div>`;
  return `<div class="annx has-img" style="--annx-ext:${t.ext || "#2a2018"};--annx-pos:${t.pos || "center"}"><div class="annx-blur" style="background-image:url(${t.img})"></div>` +
    `<img class="annx-img" src="${t.img}" alt="" loading="lazy"><div class="annx-wrap">${scroll}</div></div>`;
}

/* ✍️ Word-like formatting for announcements (toolbar on the 📢 Post page). Works on text that is already escaped.
   Inline: **bold**  *italic*  __underline__  ~~strike~~  ==highlight==  [[c:gold]]coloured[[/c]]  [[f:royal]]font[[/f]]
   Also understands ChatGPT / Markdown: ### headings, `code`, [text](link), * bullets.
   Lines:  # big heading   ## heading   - bullet (or • ◆ ★ ✔ ➤ … as the bullet)   1. / a. numbered   > quote box   --- line
           two spaces in front of a list line = one level deeper (like Word's indent) */
const ANN_COLORS = ["gold", "orange", "red", "green", "blue", "purple"];
/* 🔤 fonts for [[f:key]]text[[/f]] — the font files live in fonts/ (free fonts, SIL Open Font License) and a phone
   only downloads one when an announcement uses it. They are Latin-letter fonts: Chinese, Korean, Arabic, Thai …
   keep the site's normal font for those letters. */
const ANN_FONTS = {
  serif:    { css: '"NXS Serif", Georgia, serif', name: { en: "Classic serif", zh: "經典襯線", ko: "클래식 세리프", ar: "خط كلاسيكي", pt: "Serifa clássica" } },
  royal:    { css: '"NXS Royal", Georgia, serif', name: { en: "Royal", zh: "皇家", ko: "로열", ar: "ملكي", pt: "Real" } },
  medieval: { css: '"NXS Medieval", Georgia, serif', name: { en: "Medieval", zh: "中世紀", ko: "중세", ar: "قروسطي", pt: "Medieval" } },
  hand:     { css: '"NXS Hand", cursive', name: { en: "Handwritten", zh: "手寫", ko: "손글씨", ar: "خط يد", pt: "Manuscrita" } },
  bold:     { css: '"Oswald", sans-serif', name: { en: "Bold poster", zh: "粗體海報", ko: "굵은 포스터", ar: "ملصق عريض", pt: "Cartaz forte" } },
};
const ANN_BULLETS = ["•", "◦", "▪", "◆", "◇", "★", "☆", "✔", "➤", "►", "✦", "–", "○", "●"];
const AF_DEFAULT = ["•", "◦", "▪"];   // "-" bullets: one symbol per level, like Word
function annFormat(html) {
  const inline = (s) => s
    .replace(/\[([^\]\n]+)\]\(<a href="([^"]+)"[^>]*>[^<]*<\/a>\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')   // [text](link) from ChatGPT / Markdown
    .replace(/\[([^\]\n]+)\]\((https?:\/\/[^)\s"<]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/`([^`\n]+)`/g, '<code class="af-code">$1</code>')
    .replace(/==([^=\n]+?)==/g, '<mark class="af-hl">$1</mark>')
    .replace(/__([^_\n]+?)__/g, "<u>$1</u>")
    .replace(/~~([^~\n]+?)~~/g, "<s>$1</s>")
    .replace(/(^|[^*\w])\*(?![\s*])([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[\[c:(\w+)\]\]([\s\S]*?)\[\[\/c\]\]/g, (m, c, t) => ANN_COLORS.includes(c) ? `<span class="af-c af-${c}">${t}</span>` : t)
    .replace(/\[\[f:(\w+)\]\]([^\n]*?)\[\[\/f\]\]/g, (m, f, t) => { if (!ANN_FONTS[f]) return t; return `<span class="af-f" style="font-family:${ANN_FONTS[f].css.replace(/"/g, "&quot;")}">${t}</span>`; });
  const out = []; let list = null;
  const close = () => { if (list) { out.push({ b: `<div class="af-list">${list.join("")}</div>` }); list = null; } };
  const bullet = new RegExp("^([ \\t]*)(-|\\*(?!\\*)|" + ANN_BULLETS.map((x) => x.replace(/[-*]/g, "\\$&")).join("|") + "|\\d{1,3}[.)]|[a-zA-Z][.)])[ \\t]+(.*)$");
  for (const line of inline(html).split("\n")) {
    let m;
    if ((m = line.match(bullet))) {
      const lv = Math.min(4, Math.floor(m[1].replace(/\t/g, "  ").length / 2));
      const mk = m[2] === "-" || m[2] === "*" ? AF_DEFAULT[lv % 3] : m[2];
      (list = list || []).push(`<div class="af-li${/[\d.)]$/.test(mk) && mk.length > 1 ? " af-num" : ""}" style="--lv:${lv}"><span class="af-mk">${mk}</span><span class="af-lt">${m[3]}</span></div>`);
      continue;
    }
    close();
    if ((m = line.match(/^#{2,6}\s+(.*)$/))) out.push({ b: `<div class="af-h2">${m[1]}</div>` });   // ## … ###### (ChatGPT uses ###)
    else if ((m = line.match(/^#\s+(.*)$/))) out.push({ b: `<div class="af-h1">${m[1]}</div>` });
    else if ((m = line.match(/^&gt;\s?(.*)$/))) out.push({ b: `<div class="af-quote">${m[1]}</div>` });
    else if (/^\s*(---+|———*|___+)\s*$/.test(line)) out.push({ b: '<hr class="af-hr">' });
    else out.push({ t: line });
  }
  close();
  // text lines keep their line breaks; blocks sit between them without extra blank lines
  let s = "";
  out.forEach((x, i) => { if (x.b) s += x.b; else s += x.t + (out[i + 1] && out[i + 1].t !== undefined ? "\n" : ""); });
  return s;
}
