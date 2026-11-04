/* NXS officer page — 🪓 Viking report (registers OFFICER_PAGES.vv; own tab, nobody by default, admins always).
   Sherry, 2026-11-04: our own research on how Viking Vengeance hands out kills and points — NOT game rules. Worked out from
   Sherry's screenshots and battle-report sums (difficulty 11, waves 1–20 on 2026-11-03; Project docs claude/vv-logic-spec.md
   and claude/kingshot-battle-rules.md B27–B29). It will keep changing as we test more. Told as pictures first, numbers folded away.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
const P = { T8: 38, T9: 50, T10: 66, TG1: 71, TG2: 76, TG3: 83 };          // one troop's strength, X series (kills split by this)
const ELITE = [7, 14, 17];
const hostPts = (w) => (ELITE.includes(w) ? 2 : 1) * (2700 + 1800 * w);
const T = {
  en: { title: "🪓 Viking report", intro: "Our research on how Viking Vengeance splits kills and points. Not official rules — it changes as we test more.",
    badge: "🔬 Research report · from our battle reports · difficulty 11 · updated {d}",
    heroH: "Every wave has a fixed number of Vikings.", heroP: "If the city holds, they all die. So the question isn't how hard you hit — it's how much of the city's infantry is yours.",
    whoH: "⚔️ Who does the fighting",
    inf: "Infantry", infS: "Fights first and usually finishes the whole wave.",
    cav: "Cavalry", cavS: "💤 Only joins when Ambusher triggers (🎲 20%). Otherwise 0 kills.",
    arc: "Archers", arcS: "☕ Only fight if infantry and cavalry can't clear the wave. In a well-reinforced city: always 0.",
    heroNote: "🦸 Hero skills also kill some Vikings. The less infantry in the city, the bigger their share.",
    cakeH: "🍰 How the points are split", cakeP: "Each city gives out two fixed piles of points per wave. Kills only decide how the reinforcers' pile is cut.",
    wave: "Wave", elite: "Elite wave ×2",
    host: "🏠 City owner", hostS: "Fixed. Same score whether their own troops kill or not.",
    pool: "🤝 Reinforcers share", poolS: "Half of the owner's points, cut by each reinforcer's infantry × tier.",
    waste: "Kills by the owner's own troops → that part of the pile goes to nobody.", empty: "No reinforcer in a city → nobody gets that pile.",
    calcH: "🧮 Try it: your slice", my: "My infantry", myT: "my tier", oth: "Other reinforcers' infantry", othT: "their tier",
    you: "You", others: "Others", res: "≈ {p} points this wave ({s} of the pile)",
    calcNote: "Estimate: assumes infantry clears the wave and the owner's troops kill nothing (the usual case).",
    tierH: "📏 Higher tier = a bigger slice", tierP: "Kills are split by one troop's strength:",
    tierEx: "1 TG3 infantry ≈ 1.17 TG1 ≈ 1.66 T9", tierIX: "IX series (Supreme): T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ So send them like this",
    dos: ["Reinforce with your highest-tier infantry. Cavalry and archers in a reinforcement get almost nothing.",
      "City owners: keep only archers at home. Send infantry and cavalry out.",
      "Every city needs at least one reinforcer.",
      "Spread the same infantry over several cities instead of stacking one (except a city that might fall).",
      "Can't send everything? Send infantry first and leave cavalry at home — infantry left at home eats points every wave."],
    noH: "🤷 Doesn't change your points",
    nos: ["Attack / Lethality buffs: the Vikings die anyway, everyone gets stronger together, the split stays the same.",
      "The hero you send as a reinforcer: on HQ wave 20 every TG3 infantry got exactly 1.1842 kills, whatever the hero.",
      "Gambling on cavalry: a big score when Ambusher hits, 0 when it doesn't."],
    hqH: "🏯 Headquarters", hqP: "Same idea: kills are split by infantry × tier. Points = kills × a fixed rate (wave 20: 0.5253 per kill).",
    unkH: "🟡 Not known yet",
    unks: ["How points are split when a city falls.", "Which skill hero is best for the garrison.", "Whether reinforcers' joiner skills work in a garrison."],
    numH: "🔢 Numbers for those who want them", numCols: ["Wave", "City owner", "Reinforcers' pile"],
    foot: "Source: Sparrow's screenshots and battle-report sums, difficulty 11. The formulas are worked back from report numbers, not from the game. Re-check after a game update." },
  zh: { title: "🪓 維京研究", intro: "我們自己研究的維京人的掠奪：擊殺和分數怎麼分。不是官方規則，會隨著測試持續更新。",
    badge: "🔬 研究報告 · 來自我們的戰報 · 難度 11 · 更新 {d}",
    heroH: "每一波的維京人數是固定的。", heroP: "守住了就全部死光。所以重點不是打得多猛，而是城裡的步兵有多少是你的。",
    whoH: "⚔️ 誰在打",
    inf: "步兵", infS: "第一個出手，通常整波就打完了。",
    cav: "騎兵", cavS: "💤 只有「奇襲」觸發時才出手（🎲 20%），不然 0 擊殺。",
    arc: "弓兵", arcS: "☕ 步兵和騎兵都清不完才輪到他。增援多的城永遠 0。",
    heroNote: "🦸 英雄技能也會殺掉一部分。城裡步兵越少，技能佔的比例越大。",
    cakeH: "🍰 分數怎麼分", cakeP: "每座城每一波發兩份固定的分數。擊殺只決定「增援者那一份」怎麼切。",
    wave: "第幾波", elite: "菁英波 ×2",
    host: "🏠 城主", hostS: "固定。不管自己的兵有沒有擊殺，分數都一樣。",
    pool: "🤝 增援者一起分", poolS: "城主分數的一半，照每個人的「步兵數 × 兵等」切。",
    waste: "城主自己的兵殺到的那部分 → 沒人拿，浪費掉。", empty: "沒人增援的城 → 那一份整個沒人拿。",
    calcH: "🧮 算算看：你那一塊", my: "我的步兵", myT: "我的兵等", oth: "其他增援者的步兵", othT: "他們的兵等",
    you: "你", others: "其他人", res: "這一波約 {p} 分（那一份的 {s}）",
    calcNote: "估算：假設步兵清得完、城主自己的兵 0 擊殺（大多數情況）。",
    tierH: "📏 兵等越高，切得越大", tierP: "擊殺照單兵實力的比例分：",
    tierEx: "1 隻 TG3 步兵 ≈ 1.17 隻 TG1 ≈ 1.66 隻 T9", tierIX: "IX 系列（Supreme）：T9 50 · TG1 54 · TG2 58 · TG3 62",
    doH: "✅ 所以這樣派",
    dos: ["增援帶兵等最高的步兵。騎兵、弓兵在增援裡幾乎拿不到分。",
      "城主家裡只留弓兵，步兵、騎兵都派出去。",
      "每座城都要有人增援。",
      "同樣的步兵，分散到多座城比全部塞一座好（快守不住的城例外）。",
      "派不完時先派步兵，騎兵留家——步兵留在家裡每一波都會吃掉分數。"],
    noH: "🤷 不會改變你的分數",
    nos: ["攻擊／殺傷增益：維京本來就會全滅，大家一起變強，比例不變。",
      "增援時自己帶什麼英雄：總部第 20 波，每隻 TG3 步兵的擊殺都剛好 1.1842，跟英雄無關。",
      "帶騎兵賭奇襲：中了分很多，沒中就 0，不穩定。"],
    hqH: "🏯 總部", hqP: "一樣照「步兵數 × 兵等」分擊殺。分數 = 擊殺 × 固定係數（第 20 波每個擊殺 0.5253 分）。",
    unkH: "🟡 還不知道的",
    unks: ["城守不住時分數怎麼算。", "駐防的技能英雄要怎麼選。", "增援者的加入者技能在駐防有沒有效。"],
    numH: "🔢 給想看數字的人", numCols: ["波", "城主", "增援者那一份"],
    foot: "來源：Sparrow 的截圖和戰報加總，難度 11。公式是從戰報數字反推的，不是遊戲官方說明。遊戲改版後要重新確認。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { wave: 10, my: 60000, myT: "TG3", oth: 180000, othT: "TG1" };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-vv") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-vv", JSON.stringify(S)); } catch (e) {} };

function troop(img, name, line, cls) {
  return `<figure class="vv-tr ${cls}"><img src="figures/vv/${img}.webp" alt="" loading="lazy"><figcaption><b>${esc(name)}</b><span>${esc(line)}</span></figcaption></figure>`;
}
const tierSel = (id, v) => `<select class="inp" id="${id}">${Object.keys(P).map((k) => `<option${k === v ? " selected" : ""}>${k}</option>`).join("")}</select>`;
function cakeHtml() {
  const w = S.wave, h = hostPts(w), pool = h / 2;
  const me = S.my * P[S.myT], ot = S.oth * P[S.othT], share = me + ot > 0 ? me / (me + ot) : 0;
  return `<div class="vv-wave"><label for="vv_w">${esc(t("wave"))}</label><input type="range" id="vv_w" min="1" max="19" value="${w}"><b>${w}</b>${ELITE.includes(w) ? `<span class="vv-elite">${esc(t("elite"))}</span>` : ""}</div>
    <div class="vv-piles">
      <div class="vv-pile"><div class="vv-pk">${esc(t("host"))}</div><div class="vv-bar"><i class="host" style="width:100%"></i></div><div class="vv-pv">${fmt(h)}</div><div class="vv-ps">${esc(t("hostS"))}</div></div>
      <div class="vv-pile"><div class="vv-pk">${esc(t("pool"))}</div><div class="vv-bar half"><i class="me" style="width:${(share * 100).toFixed(1)}%"></i><i class="oth" style="width:${((1 - share) * 100).toFixed(1)}%"></i></div><div class="vv-pv">${fmt(pool)}</div><div class="vv-ps">${esc(t("poolS"))}</div>
        <div class="vv-key"><span><i class="me"></i>${esc(t("you"))}</span><span><i class="oth"></i>${esc(t("others"))}</span></div></div>
    </div>
    <div class="vv-calc"><h4>${esc(t("calcH"))}</h4>
      <div class="vv-in"><label>${esc(t("my"))}<input class="inp" id="vv_my" type="number" min="0" step="1000" value="${S.my}"></label><label>${esc(t("myT"))}${tierSel("vv_myT", S.myT)}</label></div>
      <div class="vv-in"><label>${esc(t("oth"))}<input class="inp" id="vv_oth" type="number" min="0" step="1000" value="${S.oth}"></label><label>${esc(t("othT"))}${tierSel("vv_othT", S.othT)}</label></div>
      <div class="vv-res">${esc(t("res").replace("{p}", fmt(pool * share)).replace("{s}", (share * 100).toFixed(1) + "%"))}</div>
      <div class="muted vv-small">${esc(t("calcNote"))}</div></div>
    <ul class="vv-warn"><li>🗑️ ${esc(t("waste"))}</li><li>🏚️ ${esc(t("empty"))}</li></ul>`;
}
function render() {
  const root = $("vv_root"); if (!root) return;
  const max = P.TG3;
  root.innerHTML = `
  <div class="vv-hero" style="background-image:url(figures/vv/viking.webp)"><div class="vv-hero-in">
    <span class="vv-badge">${esc(t("badge").replace("{d}", UPDATED))}</span>
    <h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div></div>
  <div class="card"><h3>${esc(t("whoH"))}</h3>
    <div class="vv-trs">${troop("inf", t("inf"), t("infS"), "on")}${troop("cav", t("cav"), t("cavS"), "off")}${troop("arc", t("arc"), t("arcS"), "off")}</div>
    <p class="vv-note">${esc(t("heroNote"))}</p></div>
  <div class="card"><h3>${esc(t("cakeH"))}</h3><p class="vv-p">${esc(t("cakeP"))}</p><div id="vv_cake">${cakeHtml()}</div></div>
  <div class="card"><h3>${esc(t("tierH"))}</h3><p class="vv-p">${esc(t("tierP"))}</p>
    <div class="vv-tiers">${Object.entries(P).map(([k, v]) => `<div class="vv-tier"><span>${k}</span><div class="vv-tb"><i style="width:${(v / max * 100).toFixed(1)}%"></i></div><b>${v}</b></div>`).join("")}</div>
    <p class="vv-ex">${esc(t("tierEx"))}</p><div class="muted vv-small">${esc(t("tierIX"))}</div></div>
  <div class="card"><h3>${esc(t("doH"))}</h3><ol class="vv-dos">${t("dos").map((d, i) => `<li><span class="vv-ic">${["<img src=\"figures/vv/inf.webp\" alt=\"\">", "<img src=\"figures/vv/arc.webp\" alt=\"\">", "🏰", "🗺️", "<img src=\"figures/vv/cav.webp\" alt=\"\">"][i]}</span><span>${esc(d)}</span></li>`).join("")}</ol></div>
  <div class="vv-two">
    <div class="card"><h3>${esc(t("noH"))}</h3><ul class="vv-ul">${t("nos").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="vv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  </div>
  <div class="card"><h3>${esc(t("hqH"))}</h3><p class="vv-p">${esc(t("hqP"))}</p></div>
  <details class="card vv-num"><summary>${esc(t("numH"))}</summary>
    <table class="vv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${Array.from({ length: 19 }, (_, i) => i + 1).map((w) => `<tr${ELITE.includes(w) ? ' class="el"' : ""}><td>${w}${ELITE.includes(w) ? " ×2" : ""}</td><td class="n">${fmt(hostPts(w))}</td><td class="n">${fmt(hostPts(w) / 2)}</td></tr>`).join("")}</table></details>
  <div class="muted vv-small">${esc(t("foot"))}</div>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("vv_cake"); if (!c) return; const f = document.activeElement && document.activeElement.id; c.innerHTML = cakeHtml(); bind(); if (f && $(f)) $(f).focus(); };
  const w = $("vv_w"); if (w) w.oninput = () => { S.wave = +w.value || 1; redo(); };
  for (const [id, k, num] of [["vv_my", "my", 1], ["vv_oth", "oth", 1], ["vv_myT", "myT", 0], ["vv_othT", "othT", 0]]) {
    const el = $(id); if (!el) continue;
    el.onchange = () => { S[k] = num ? Math.max(0, +el.value || 0) : el.value; redo(); };
  }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("vv_title")) { $("vv_title").textContent = t("title"); $("vv_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.vv = { init, applyTexts, setLang };
})();
