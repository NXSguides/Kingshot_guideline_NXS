/* NXS officer page — 💎 Investment report (registers OFFICER_PAGES.iv; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: where gems buy the most stat %, per role (rally leader / joiner). Our own research, still being tested:
   Sparrow's main account (power ↔ %, shop prices, research times) — Project docs claude/investment-efficiency-summary.md,
   claude/kingshot-upgrade-efficiency.md, claude/kvk-2026-11-data-plan.md, claude/mightpulse-stat-check.md. Not official.
   Read-only text, no member data. Names follow data/content.js GLOSSARY. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
const MAX = 60000;
// Governor Charm, every level: [Charm Guides + Charm Designs needed, % gained] (Lethality + Health, one troop type). Shop: 500 Relic Coins each, 1 coin ≈ 3.2 gems.
const CHARM = [[10, 9], [55, 3], [100, 4], [180, 3], [300, 6], [420, 5], [540, 5], [600, 5], [700, 5], [840, 5], [980, 5],
  [1180, 4], [1390, 4], [1605, 4], [1825, 4], [2050, 4], [2280, 4], [2515, 4], [2755, 4], [3000, 4], [3250, 4], [3505, 4]];
const charmGems = (i) => CHARM[i][0] * 500 * 3.2 / (2 * CHARM[i][1]);   // gems per +1% to one stat of one troop type
// [key, low, high, kind] — gems per +1% (one troop type, one stat); kind colours the bar; past MAX the bar runs off the end (▶)
const ROWS = [["c1", 889, 889, "cheap"], ["pet", 3200, 3200, "cheap"], ["res", 3800, 14600, "mid"], ["hg1", 11100, 11100, "mid"], ["c25", 14700, 48000, "mid"],
  ["adv", 14000, 22400, "mid"], ["gg", 19000, 19000, "mid"], ["resl", 20500, 20500, "mid"], ["hg2", 22200, 55600, "dear"], ["c6", 67200, 701000, "dear"]];
const T = {
  en: { title: "💎 Investment", intro: "Our research: the same gems buy very different amounts of stat %. Where is it cheapest, and who should spend where? Still being tested.",
    badge: "🧪 Still testing · from our own account and shop prices · updated {d}",
    heroH: "Same gems, very different results.", heroP: "The cheapest +1% (Governor Charm Lv1) costs under 1,000 gems. Hero Gear Mastery Forging Lv5 costs about 56,000, and the last Governor Charm levels cost up to 700,000 for the same 1%.",
    barH: "💰 Gems for +1%", barP: "Shorter bar = cheaper. Each bar is +1% to one stat of one troop type.",
    rows: { c1: "Governor Charm 0 → Lv1", pet: "Pet level-up (Alliance Shop food, weekly limit)", res: "Research — first levels of each tier", hg1: "Hero Gear Mastery Forging 0 → 1", c25: "Governor Charm Lv2–5",
      adv: "Pet advancement", gg: "Governor Gear (Epic)", resl: "Research — last level of each tier", hg2: "Hero Gear Mastery Forging 1 → 5", c6: "Governor Charm Lv6–22" },
    gives: { c1: "Lethality + Health, one troop type", pet: "Attack + Defense, all troops", res: "depends on the node (infantry Attack / Lethality cheapest)", hg1: "only while that hero is in the march", c25: "Lethality + Health, one troop type",
      adv: "Attack + Defense, all troops", gg: "Attack + Defense, one troop type; higher tiers cost more (Red T6 ≈ 15×)", resl: "", hg2: "each level costs more (10 Forgehammers per level)", c6: "much more than everything else — see every level below" },
    chH: "💠 Governor Charms, every level", chP: "Gems for +1% at each level (taller = dearer; the scale grows ×10 per step). Lv1 is the cheapest thing in the game; from Lv2 a charm level costs about as much as pet advancement or Governor Gear; from Lv6 it is dearer than anything else on this page.",
    chTip: "So: every charm to Lv1 right away. Lv2–5 when you lack Lethality / Health on that troop type. Lv6 and up only after the cheaper upgrades are done — remember Lethality and Health are worth more per 1% (next card).",
    chCols: ["Level", "Guides + Designs", "% gained", "Total %", "Gems per 1%"],
    cheap: "best value", mid: "middle", dear: "most expensive",
    lowH: "📉 Lethality and Health are worth more", lowP: "Most players have far less Lethality and Health than Attack and Defense. The lower a stat is, the more +1% changes it — so Governor Charms are even better than the bars show, and pets a little worse.",
    lowA: "Stat at 50%", lowB: "Stat at 300%", lowS: "+1% adds", lowFoot: "Value of +1% ≈ 1 ÷ (100 + current %)",
    rlH: "👑 Rally leaders", rlP: "Only the leader's own stats count in a rally. Spend in this order:",
    rl: ["Every Governor Charm to Lv1 first.", "Pet level-ups — buy the food every week.", "Research — keep going; the first levels of each tier are the best deal. Main heroes' Hero Gear Mastery Forging to Lv1.",
      "Then Governor Charm Lv2–5, pet advancement, Epic Governor Gear and Mastery Forging Lv2 — about the same value; pick the stat and troop type you lack.", "Mastery Forging Lv3+, Governor Charm Lv6+ and high-tier Governor Gear cost the most — last."],
    rlTroop: "Which troop type: PvP — infantry Defense / Health, cavalry and archer Attack / Lethality. Bear Hunt — archers.",
    rlHero: "Owning these heroes at full stars gives a bonus all the time — possibly a great deal for paying leaders (cost not worked out yet):",
    amadeus: "Amadeus: all troops Lethality + Health +15%", helga: "Helga: all troops Attack + Defense +10%",
    joH: "🤝 Joiners", joP: "Your own combat stats don't count when you join someone's rally.",
    joYes: "Worth it", joYesL: ["Troop tier (Truegold / TG)", "Your first hero's top-right skill"],
    joNo: "Not for rallies", joNoL: ["Combat stats — they only help when you attack alone, defend your own city or get hit while gathering."],
    joIf: "If you still want to spend: Governor Charm Lv1 and pet level-ups give the most power per gem — and so the most Migrant Score (Swordland Showdown, kingdom rating). Charms, pets, research and Hero Gear count the same there.",
    unkH: "🟡 Not worked out yet", unks: ["Hero Exclusive Gear (Widgets): cost per 1%.", "Masters (Valora, Roman): cost per 1%.", "Hero Gear enhancement (XP) cost.", "Cost of Amadeus / Helga to full stars.", "Real-money packs (this uses Relic Coins and gems only).", "Pet active skills and refining."],
    numH: "🔢 For those who want the numbers", numP: "Exchange rate: 1 Relic Coin ≈ 3.2 gems (1 h speedup = 800 gems in the Gem Shop or 250 Relic Coins in the Swordland Shop; finishing research instantly is also ≈ 800 gems per hour). Another rate changes the numbers, not the order. \"+1%\" = one stat of one troop type; a stat for all three troop types counts as 3.",
    numCols: ["Upgrade", "Gems per 1%", "Gives"],
    foot: "Source: Sparrow's main account (power ↔ %, shop prices, research times). Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "💎 投資效率", intro: "我們自己的研究：同樣的鑽石，換到的屬性 % 差非常多。哪裡最划算？什麼角色該花在哪？還在測試中。",
    badge: "🧪 測試中 · 來自我們自己的帳號和商店價格 · 更新 {d}",
    heroH: "同樣的鑽石，效果差很多。", heroP: "最便宜的 +1%（領主寶石 Lv1）不到 1,000 鑽；英雄裝備專精鍛造 Lv5 大約 56,000 鑽；領主寶石最後幾級同樣 1% 要到 70 萬鑽。",
    barH: "💰 +1% 要多少鑽石", barP: "長條越短越划算。每一條都是「一個兵種、一種屬性 +1%」。",
    rows: { c1: "領主寶石 0 → Lv1", pet: "寵物升級（聯盟商店口糧，每週限量）", res: "研究——每階的前幾級", hg1: "英雄裝備專精鍛造 0 → 1", c25: "領主寶石 Lv2–5",
      adv: "寵物突破", gg: "領主裝備（史詩）", resl: "研究——每階最後一級", hg2: "英雄裝備專精鍛造 1 → 5", c6: "領主寶石 Lv6–22" },
    gives: { c1: "單一兵種 殺傷力＋生命值", pet: "全部隊 攻擊力＋防禦力", res: "看節點（步兵攻擊力／殺傷力最便宜）", hg1: "只有那位英雄出戰時有效", c25: "單一兵種 殺傷力＋生命值",
      adv: "全部隊 攻擊力＋防禦力", gg: "單一兵種 攻擊力＋防禦力；越高階越貴（紅 T6 約 15 倍）", resl: "", hg2: "每級越來越貴（每級多 10 個鍛造錘）", c6: "比其他所有項目都貴很多——每一級見下面" },
    chH: "💠 領主寶石：每一級", chP: "每一級 +1% 要多少鑽（越高越貴；刻度每格 ×10）。Lv1 是全遊戲最划算的；Lv2 起每級大約跟寵物突破、領主裝備同級；Lv6 以上比這頁所有東西都貴。",
    chTip: "所以：寶石全部馬上開到 Lv1。那個兵種缺殺傷力／生命值時再升 Lv2–5。Lv6 以上等比較便宜的都升完再說——別忘了殺傷力、生命值每 1% 比較值錢（下一張卡）。",
    chCols: ["等級", "手冊＋圖紙", "加多少 %", "累計 %", "每 1%（鑽）"],
    cheap: "最划算", mid: "中間", dear: "最貴",
    lowH: "📉 殺傷力、生命值比較值錢", lowP: "大多數人的殺傷力、生命值都比攻擊力、防禦力低很多。屬性越低，多 1% 的感覺越明顯——所以領主寶石實際上比長條看起來更划算，寵物稍微差一點。",
    lowA: "屬性 50% 時", lowB: "屬性 300% 時", lowS: "+1% 等於變強", lowFoot: "+1% 的價值 ≈ 1 ÷（100 + 目前 %）",
    rlH: "👑 集結隊長", rlP: "集結只看隊長自己的屬性。照這個順序花：",
    rl: ["領主寶石全部先開到 Lv1。", "寵物升級——口糧每週買滿。", "研究——持續點；每階前幾級最划算。主力英雄的英雄裝備專精鍛造先升到 Lv1。",
      "接著是領主寶石 Lv2–5、寵物突破、史詩領主裝備、專精鍛造 Lv2——效率差不多，挑自己缺的屬性和兵種。", "專精鍛造 Lv3 以上、領主寶石 Lv6 以上、高階領主裝備最貴——放最後。"],
    rlTroop: "兵種優先：PvP——步兵防禦力／生命值、騎兵和弓兵攻擊力／殺傷力。狩獵巨熊——弓兵。",
    rlHero: "擁有這兩位滿星英雄就一直有加成——對課金隊長可能非常划算（成本還沒算）：",
    amadeus: "阿瑪迪斯：全部隊 殺傷力＋生命值 +15%", helga: "赫爾加：全部隊 攻擊力＋防禦力 +10%",
    joH: "🤝 加入者", joP: "加入別人的集結時，你自己的戰鬥屬性不算。",
    joYes: "值得投資", joYesL: ["兵等（黃金 TG）", "第一位英雄的右上技能"],
    joNo: "集結裡沒用", joNoL: ["戰鬥屬性——只有自己單打、守自己城、採集被打時才有用。"],
    joIf: "如果還是想花：同樣的鑽石，領主寶石 Lv1 和寵物升級換到的實力最多，遷城分數（聖劍爭奪、王國評級）也最多。寶石、寵物、研究、英雄裝備在遷城分數裡的權重一樣。",
    unkH: "🟡 還沒算的", unks: ["英雄專屬裝備（零件）每 1% 要多少。", "大師（維拉、羅曼）每 1% 要多少。", "英雄裝備強化（經驗）的成本。", "阿瑪迪斯／赫爾加升到滿星的成本。", "真錢禮包（這裡只算聖契幣和鑽石）。", "寵物主動技能、洗煉。"],
    numH: "🔢 給想看數字的人", numP: "換算：1 聖契幣 ≈ 3.2 鑽（1 小時加速：鑽石商店 800 鑽、聖劍商店 250 聖契幣；研究立即完成也是約 800 鑽／小時）。換別的換算方式，數字會變，排序不變。「+1%」= 一個兵種、一種屬性；三個兵種一起加的屬性算 3 個。",
    numCols: ["升級項目", "每 1%（鑽）", "給什麼"],
    foot: "來源：Sparrow 主帳實測（實力 ↔ %、商店價格、研究時間）。不是遊戲官方說明，數字會隨更多測試修正。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const range = (a, b) => a === b ? fmt(a) : `${fmt(a)}–${fmt(b)}`;
function render() {
  const root = $("iv_root"); if (!root) return;
  const R = t("rows"), G = t("gives");
  const gain = (s) => (1 / (100 + s) * 100);   // how much +1% adds at a given stat, in % of total
  root.innerHTML = `
  <div class="iv-hero"><span class="iv-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="card"><h3>${esc(t("barH"))}</h3><p class="iv-p">${esc(t("barP"))}</p>
    <div class="iv-bars">${ROWS.map(([k, lo, hi, kind]) => `<div class="iv-row"><div class="iv-k">${esc(R[k])}${G[k] ? `<small>${esc(G[k])}</small>` : ""}</div>
      <div class="iv-b${hi > MAX ? " over" : ""}"><i class="${kind}" style="left:0;width:${(Math.min(lo, MAX) / MAX * 100).toFixed(1)}%"></i>${hi > lo ? `<i class="${kind} rng" style="left:${(Math.min(lo, MAX) / MAX * 100).toFixed(1)}%;width:${((Math.min(hi, MAX) - Math.min(lo, MAX)) / MAX * 100).toFixed(1)}%"></i>` : ""}</div>
      <div class="iv-v">${range(lo, hi)}</div></div>`).join("")}</div>
    <div class="iv-key"><span><i class="cheap"></i>${esc(t("cheap"))}</span><span><i class="mid"></i>${esc(t("mid"))}</span><span><i class="dear"></i>${esc(t("dear"))}</span></div></div>
  <div class="card"><h3>${esc(t("chH"))}</h3><p class="iv-p">${esc(t("chP"))}</p>
    <div class="iv-ch">${CHARM.map((c, i) => { const g = charmGems(i), h = (Math.log10(g) - 2.5) / (6 - 2.5) * 100, k = g < 10000 ? "cheap" : g < 60000 ? "mid" : "dear";
      return `<div title="Lv${i + 1}: ${fmt(g)}"><b>${i === 0 || i === 4 || i === 10 || i === 21 ? (g >= 1e5 ? Math.round(g / 1000) + "k" : g >= 1e4 ? Math.round(g / 1000) + "k" : fmt(g)) : ""}</b><i class="${k}" style="height:${h.toFixed(0)}%"></i><small>${i + 1}</small></div>`; }).join("")}</div>
    <p class="iv-p" style="margin-top:10px">💡 ${esc(t("chTip"))}</p></div>
  <div class="card"><h3>${esc(t("lowH"))}</h3><p class="iv-p">${esc(t("lowP"))}</p>
    <div class="iv-low">${[[50, "lowA"], [300, "lowB"]].map(([s, k]) => `<div class="iv-lc"><b>${esc(t(k))}</b><div class="iv-lb"><i style="width:${(gain(s) / gain(50) * 100).toFixed(0)}%"></i></div><span>${esc(t("lowS"))} ${gain(s).toFixed(2)}%</span></div>`).join("")}</div>
    <div class="muted iv-small">${esc(t("lowFoot"))}</div></div>
  <div class="card"><h3>${esc(t("rlH"))}</h3><p class="iv-p">${esc(t("rlP"))}</p>
    <ol class="iv-steps">${t("rl").map((x, i) => `<li class="s${i}"><span class="iv-n">${i + 1}</span><span>${esc(x)}</span></li>`).join("")}</ol>
    <p class="iv-p" style="margin-top:10px">🎯 ${esc(t("rlTroop"))}</p>
    <p class="iv-p">${esc(t("rlHero"))}</p>
    <div class="iv-heroes">${[["amadeus", "amadeus"], ["helga", "helga"]].map(([id, k]) => `<div class="iv-hc"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy"><span>${esc(t(k))}</span></div>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("joH"))}</h3><p class="iv-p">${esc(t("joP"))}</p>
    <div class="iv-jo"><div class="iv-yes"><b>✅ ${esc(t("joYes"))}</b><ul>${t("joYesL").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="iv-no"><b>🚫 ${esc(t("joNo"))}</b><ul>${t("joNoL").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <p class="iv-p" style="margin-top:10px">💡 ${esc(t("joIf"))}</p></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="iv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("numH"))}</b></summary><p class="iv-p" style="margin-top:8px">${esc(t("numP"))}</p>
    <div class="iv-tw"><table class="iv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${ROWS.map(([k, lo, hi]) => `<tr><td>${esc(R[k])}</td><td class="n">${range(lo, hi)}</td><td>${esc(G[k])}</td></tr>`).join("")}</table>
    <table class="iv-t"><tr>${t("chCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${CHARM.map((c, i) => `<tr><td>Lv${i + 1}</td><td class="n">${fmt(c[0])}</td><td class="n">+${c[1]}%</td><td class="n">${CHARM.slice(0, i + 1).reduce((a, x) => a + x[1], 0)}%</td><td class="n">${fmt(charmGems(i))}</td></tr>`).join("")}</table></div></details>
  <div class="muted iv-small">${esc(t("foot"))}</div>`;
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("iv_title")) { $("iv_title").textContent = t("title"); $("iv_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.iv = { init, applyTexts, setLang };
})();
