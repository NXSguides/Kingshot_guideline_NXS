/* NXS officer page — 🐻 Bear Hunt report (registers OFFICER_PAGES.bh; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: how Bear Hunt scores work, for MEMBERS — no leader names, no K values, nobody ranked (those stay in 🐻 Bear plan).
   Our own research from rally mails, bonus pages and leaderboards (Project docs claude/bear-report-spec.md, claude/kingshot-battle-rules.md
   rules 16–23, claude/kingshot-bear-2026-10-27/29/31, -11-02). Not official. Names follow data/content.js GLOSSARY / data/terms.js.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
const WT = { inf: 0.14, cav: 0.58, arc: 1 };
const P = { T9: 50, T10: 66, TG1: 71, TG2: 76, TG3: 83 };
const VAL = [2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30];   // Valora talent, your own score + %, Lv1–11
const T = {
  en: { title: "🐻 Bear Hunt report", intro: "Our research on how Bear Hunt scores work: what you bring and which rally you join. Not official — it changes with more mails.",
    badge: "🔬 Research report · from our rally mails · updated {d}",
    heroH: "The Bear never runs out of HP.", heroP: "So your score is about how hard the whole rally hits — and that is almost all about the rally leader. What you control: bring the right troops, join the right rally.",
    wH: "🏹 Archers count most", wP: "How much one troop of each type adds, same tier:",
    inf: "Infantry", cav: "Cavalry", arc: "Archers",
    sqH: "√ More of one type = less per troop", sqP: "Each troop type is square-rooted on its own. 4× the archers gives only 2× the archer score. That's why the join cap is 100k: extra troops do more in someone else's march.",
    mixH: "🎯 Your best mix", mixP: "For your own march (it moves a little with the leader's stats):", mixFoot: "Higher tier is better too:",
    calcH: "🧮 Try your mix", calcN: "{t} count", calcTier: "Tier", calcRes: "{p}% of the best mix for {n} troops", calcBest: "Best for this total: about {i} : {c} : {a}",
    calcNote: "Relative only — not your real score. Same rally, same leader.",
    joinH: "🚩 Which rally you join matters most", joinP: "The same troops score about 3× more in a strong leader's rally than in a weak one.",
    weak: "Weak leader", strong: "Strong leader",
    joinTips: ["Strong rallies fill in seconds — be quick.", "Full-cap marches go to strong rallies; small leftover marches go to rallies that still have space.", "A weak leader opening a rally that doesn't fill also ties up their own archers for 5 minutes."],
    kH: "👑 What makes a leader strong", kP: "Only the leader's side counts. Joiners' own stats and gear don't change the rally.",
    k: [["🏹", "The leader's archer Attack × Lethality."], ["🏙️", "City Bonus — only the leader's counts: Attack +10% and Lethality +20% ≈ ×1.32. One leader with the 2nd-best archer Attack but no City Bonus did only 70% of the top rally."],
      ["🦸", "Joiner skills: the first 4 joiners on the list who bring heroes — their first hero's top-right skill. Joiners without heroes don't take a slot."], ["⚔️", "The leader's own hero skills and rally Hero Exclusive Gear."]],
    jsH: "2 Attack + 2 Lethality is best", jsAtk: "Attack", jsLet: "Lethality", jsFoot: "Attack and Lethality multiply, so a 2 + 2 mix beats 1 + 3 by about 6%.",
    luckH: "🎲 Luck", luck: ["The whole rally swings 10–25% per hit — the leader's chance skills.", "TG3 troops have their own troop skill: ±15–20% per hit.", "One hit can't tell who is stronger. Compare several."],
    valH: "🌟 Valora (Master)", valP: "Her talent adds only to YOUR OWN score:", valSkill: "Her other skill raises the Bear Hunt rally capacity by +30,000 per level (Lv4 = +120,000) — useful if you want to lead.",
    unkH: "🟡 Not known yet", unks: ["Whether the square root is a battle rule or only how points are counted.", "Whether \"enemy Defense −\" bonuses work on the Bear.", "Whether Vivian's \"enemy damage taken +25%\" is a separate multiplier."],
    numH: "🔢 For those who want the formula", num: "Your score ≈ K × Σ (w × P × √n). K = the rally leader's strength (shared by the whole rally); w = troop weight (archer 1, cavalry ≈ 0.58, infantry ≈ 0.14); P = one troop's strength (T9 50 · T10 66 · TG1 71 · TG2 76 · TG3 83); n = how many of that type you sent. Checked on 40+ mails from two leaders, 3–4 hits each: about 3% error.",
    more: "Officers: leader order and rally plan → 🐻 Bear plan",
    foot: "Source: our alliance's rally mails, bonus pages and leaderboards (10/27–11/02). Worked back from the numbers, not from the game. Will be corrected as we get more mails." },
  zh: { title: "🐻 狩獵巨熊研究", intro: "我們自己研究的狩獵巨熊分數：該帶什麼兵、該進哪一團。不是官方說明，會隨更多信件修正。",
    badge: "🔬 研究報告 · 來自我們的集結信件 · 更新 {d}",
    heroH: "熊的血永遠打不完。", heroP: "所以你的分數看的是整團打多痛——而整團打多痛，幾乎只看集結隊長。你能做的：帶對兵種、進對的團。",
    wH: "🏹 弓兵最重要", wP: "同樣兵等，每種兵一隻能加多少：",
    inf: "步兵", cav: "騎兵", arc: "弓兵",
    sqH: "√ 同一種兵帶越多，每隻越不值", sqP: "每個兵種分開開根號。弓兵帶 4 倍，弓兵那部分只多 2 倍。所以加入上限是 100k：多塞的兵放到別人的部隊裡比較有用。",
    mixH: "🎯 你的最佳兵種比例", mixP: "你自己那支部隊（會隨隊長屬性小幅變動）：", mixFoot: "兵等也是越高越好：",
    calcH: "🧮 試試你的比例", calcN: "{t}數量", calcTier: "兵等", calcRes: "是 {n} 隻兵最佳比例的 {p}%", calcBest: "這個總數的最佳比例約 {i} : {c} : {a}",
    calcNote: "只是相對值，不是實際分數。同一團、同一個隊長。",
    joinH: "🚩 進哪一團最重要", joinP: "同樣的兵，進強隊長的團比進弱隊長的團多約 3 倍分數。",
    weak: "弱隊長", strong: "強隊長",
    joinTips: ["強團幾秒就滿，要搶。", "帶滿上限的部隊進強團；零頭部隊進還有空位的團。", "弱隊長自己開團又沒滿，自己的弓兵也被綁 5 分鐘。"],
    kH: "👑 隊長強在哪裡", kP: "只看隊長那邊。加入者自己的屬性、裝備都不會改變整團。",
    k: [["🏹", "隊長的弓兵攻擊力 × 殺傷力。"], ["🏙️", "城鎮增益——只有隊長開的有用：攻擊力 +10%、殺傷力 +20% ≈ ×1.32。曾有隊長弓兵攻擊力第二高但沒開增益，整團只打出最強團的七成。"],
      ["🦸", "加入者技能：名單上前 4 個「有帶英雄」的加入者，他們第一位英雄的右上技能。沒帶英雄的人不佔格。"], ["⚔️", "隊長自己的英雄技能、集結用的英雄專屬裝備。"]],
    jsH: "2 攻擊力 + 2 殺傷力最好", jsAtk: "攻擊力", jsLet: "殺傷力", jsFoot: "攻擊力和殺傷力是相乘的，所以 2 + 2 比 1 + 3 多約 6%。",
    luckH: "🎲 運氣", luck: ["整團每場差 10–25%：隊長的機率技能。", "TG3 兵有自己的兵種技能，每場 ±15–20%。", "只看一場比不出誰比較強，要看好幾場。"],
    valH: "🌟 維拉（大師）", valP: "她的天賦只加「你自己」的分數：", valSkill: "她的另一個技能：開狩獵巨熊集結時，集結容量每級 +30,000（Lv4 = +120,000）——想當隊長的人有用。",
    unkH: "🟡 還不知道的", unks: ["開根號是戰鬥機制，還是只是積分算法。", "「敵方防禦 −」的增益對熊有沒有效。", "薇薇安「敵方受到傷害 +25%」是不是另一個乘區。"],
    numH: "🔢 給想看公式的人", num: "你的分數 ≈ K × Σ（w × P × √n）。K = 集結隊長的強度（全團共用）；w = 兵種權重（弓兵 1、騎兵約 0.58、步兵約 0.14）；P = 單兵實力（T9 50 · T10 66 · TG1 71 · TG2 76 · TG3 83）；n = 你那個兵種帶的數量。用兩位隊長各 3–4 場、40 多筆信件驗證，誤差約 3%。",
    more: "幹部：隊長順序和排團 → 🐻 熊獵規劃",
    foot: "來源：我們聯盟的集結信件、加成頁、排行榜（10/27–11/02）。從數字反推，不是遊戲官方說明。有更多信件會再修正。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { inf: 2000, cav: 21000, arc: 77000, tier: "TG1" };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-bh") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-bh", JSON.stringify(S)); } catch (e) {} };
const score = (n) => Object.keys(WT).reduce((s, k) => s + WT[k] * Math.sqrt(Math.max(0, n[k] || 0)), 0);   // same tier for all → P cancels out
function best(N) { const q = Object.fromEntries(Object.keys(WT).map((k) => [k, WT[k] ** 2])), z = q.inf + q.cav + q.arc; return Object.fromEntries(Object.keys(WT).map((k) => [k, N * q[k] / z])); }
const pct = (x, N) => N ? Math.round(x / N * 100) : 0;

function calcHtml() {
  const N = S.inf + S.cav + S.arc, b = best(N), r = N ? score(S) / score(b) * 100 : 0;
  const seg = (k) => `<i class="${k}" style="width:${N ? (S[k] / N * 100).toFixed(1) : 0}%"></i>`;
  return `<div class="bh-in">${["inf", "cav", "arc"].map((k) => `<label>${esc(t("calcN").replace("{t}", t(k)))}<input class="inp" id="bh_${k}" type="number" min="0" step="1000" value="${S[k]}"></label>`).join("")}</div>
    <div class="bh-mix sm">${seg("inf")}${seg("cav")}${seg("arc")}</div>
    <div class="bh-res">${esc(t("calcRes").replace("{p}", r.toFixed(1)).replace("{n}", fmt(N)))}</div>
    <div class="muted bh-small">${esc(t("calcNote"))}</div>`;
}
const pic = (id) => `<img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy">`;
function render() {
  const root = $("bh_root"); if (!root) return;
  const hn = (k) => ({ amane: ["Amane", "雨音"], margot: ["Margot", "瑪歌"], luna: ["Luna", "露娜"], chenko: ["Chenko", "琴科"], yeonwoo: ["Yeonwoo", "妍羽"], amadeus: ["Amadeus", "阿瑪迪斯"] }[k][lang === "zh" ? 1 : 0]);
  root.innerHTML = `
  <div class="bh-hero"><div class="bh-hero-in"><span class="bh-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div></div>
  <div class="card"><h3>${esc(t("wH"))}</h3><p class="bh-p">${esc(t("wP"))}</p>
    <div class="bh-w">${[["arc", 1], ["cav", 0.58], ["inf", 0.14]].map(([k, w]) => `<figure class="bh-wt" style="--s:${(0.42 + 0.58 * w).toFixed(2)}"><div class="bh-wi"><img src="figures/vv/${k}.webp" alt=""></div><figcaption><b>${esc(t(k))}</b><span class="bh-wn">×${w}</span></figcaption></figure>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("sqH"))}</h3><p class="bh-p">${esc(t("sqP"))}</p>
    <div class="bh-sq">${[1, 4, 9].map((m) => `<div class="bh-sqr"><span>${m}×</span><div class="bh-sqb"><i class="n" style="width:${m / 9 * 100}%"></i></div><div class="bh-sqb"><i class="s" style="width:${Math.sqrt(m) / 3 * 100}%"></i></div><b>${Math.sqrt(m)}×</b></div>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("mixH"))}</h3><p class="bh-p">${esc(t("mixP"))}</p>
    <div class="bh-mix"><i class="inf" style="width:2%"></i><i class="cav" style="width:21%"></i><i class="arc" style="width:77%"></i></div>
    <div class="bh-mixk"><span><i class="inf"></i>${esc(t("inf"))} 2</span><span><i class="cav"></i>${esc(t("cav"))} 21</span><span><i class="arc"></i>${esc(t("arc"))} 77</span></div>
    <p class="bh-p" style="margin-top:10px">${esc(t("mixFoot"))} <span class="bh-tiers">${Object.entries(P).map(([k, v]) => `<span>${k} <b>${v}</b></span>`).join("")}</span></p>
    <div class="bh-calc"><h4>${esc(t("calcH"))}</h4><div id="bh_calc">${calcHtml()}</div></div></div>
  <div class="card"><h3>${esc(t("joinH"))}</h3><p class="bh-p">${esc(t("joinP"))}</p>
    <div class="bh-join"><div class="bh-jr"><span>${esc(t("weak"))}</span><div class="bh-jb"><i style="width:33%"></i></div><b>×1</b></div><div class="bh-jr"><span>${esc(t("strong"))}</span><div class="bh-jb"><i class="s" style="width:100%"></i></div><b>×3</b></div></div>
    <ul class="bh-ul">${t("joinTips").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("kH"))}</h3><p class="bh-p">${esc(t("kP"))}</p>
    <ul class="bh-k">${t("k").map(([i, x]) => `<li><span>${i}</span><span>${esc(x)}</span></li>`).join("")}</ul>
    <div class="bh-js"><h4>${esc(t("jsH"))}</h4>
      <div class="bh-jsr"><span class="bh-jst">${esc(t("jsAtk"))}</span>${["amane", "margot", "luna"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="bh-jsr"><span class="bh-jst let">${esc(t("jsLet"))}</span>${["chenko", "yeonwoo", "amadeus"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="muted bh-small">${esc(t("jsFoot"))}</div></div></div>
  <div class="bh-two">
    <div class="card"><h3>${esc(t("luckH"))}</h3><ul class="bh-ul">${t("luck").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("valH"))}</h3><p class="bh-p">${esc(t("valP"))}</p>
      <div class="bh-val">${VAL.map((v, i) => `<div title="Lv${i + 1}"><i style="height:${Math.round(v / 30 * 54)}px"></i><small>${i + 1}</small></div>`).join("")}</div>
      <div class="muted bh-small" style="margin:4px 0 8px">Lv1 2% · Lv4 9% · Lv11 30%</div><p class="bh-p" style="margin:0">${esc(t("valSkill"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="bh-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("numH"))}</b></summary><p class="bh-p" style="margin-top:8px">${esc(t("num"))}</p></details>
  <p class="bh-more"><a href="#bearplan">${esc(t("more"))}</a></p>
  <div class="muted bh-small">${esc(t("foot"))}</div>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("bh_calc"); if (!c) return; c.innerHTML = calcHtml(); bind(); };
  for (const k of ["inf", "cav", "arc"]) { const el = $("bh_" + k); if (el) el.onchange = () => { S[k] = Math.max(0, +el.value || 0); redo(); }; }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("bh_title")) { $("bh_title").textContent = t("title"); $("bh_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.bh = { init, applyTexts, setLang };
})();
