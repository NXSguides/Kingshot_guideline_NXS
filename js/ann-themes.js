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
