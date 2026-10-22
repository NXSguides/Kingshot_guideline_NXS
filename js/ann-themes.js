/* 📜 Announcement looks (chosen on the officer 📢 Post page, saved as "style" on the announcement).
   The scroll is Armada's artwork cut in three: top (rolled paper + banners), middle (plain paper, repeats
   when the text is long) and bottom (rolled paper). The banner colour changes per theme.
   A theme can also have a picture: it sits on top and the scroll overlaps its bottom part.
   To add a theme: put the picture in figures/themes/ and add a line below. */
const ANN_THEMES = {
  scroll:    { flag: "red",  emoji: "📜", name: { en: "Scroll", zh: "捲軸", ko: "두루마리", ar: "لفافة", pt: "Pergaminho" } },
  swordland: { flag: "red",  emoji: "⚔️", img: "figures/themes/swordland.webp", ext: "#5a1e12", name: { en: "Swordland Showdown", zh: "聖劍爭奪", ko: "성검 쟁탈", ar: "مواجهة أرض السيوف", pt: "Confronto entre Espadas" } },
  viking:    { flag: "blue", emoji: "⛵", img: "figures/themes/viking.webp", ext: "#16213f", name: { en: "Viking Vengeance", zh: "維京復仇", ko: "바이킹의 복수", ar: "انتقام الفايكنج", pt: "Vingança Viking" } },
};
/* the whole announcement body on a scroll; inner = title/text/pictures HTML that is already escaped */
function annThemeHtml(style, titleHtml, innerHtml) {
  const t = ANN_THEMES[style] || ANN_THEMES.scroll;
  const scroll = `<div class="sc2"><div class="sc2-bg"><div class="sc2-t" style="background-image:url(figures/scroll/top-${t.flag}.webp)"></div><div class="sc2-m"></div><div class="sc2-b"></div></div>` +
    `<div class="sc2-tx">${titleHtml ? `<div class="sc2-title" dir="auto">${titleHtml}</div><div class="sc2-orn">✦</div>` : ""}${innerHtml}</div></div>`;
  if (!t.img) return `<div class="annx">${scroll}</div>`;
  return `<div class="annx has-img" style="--annx-ext:${t.ext || "#2a2018"}"><div class="annx-blur" style="background-image:url(${t.img})"></div>` +
    `<img class="annx-img" src="${t.img}" alt="" loading="lazy"><div class="annx-wrap">${scroll}</div></div>`;
}
