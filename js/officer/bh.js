/* NXS officer page — 🐻 Bear Hunt report (registers OFFICER_PAGES.bh; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: how Bear Hunt scores work, for MEMBERS — no leader names, no K values, nobody ranked (those stay in 🐻 Bear plan).
   Our own research from rally mails, bonus pages and leaderboards (Project docs claude/bear-report-spec.md, claude/kingshot-battle-rules.md
   rules 16–23, claude/kingshot-bear-2026-10-27/29/31, -11-02). Not official. Names follow data/content.js GLOSSARY / data/terms.js.
   Read-only text + a small calculator, no member data. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-07", HUNTS = 8, SPAN = "10/25–11/06";
/* 2026-11-07: the analysis chat keeps ONE ledger now (Project docs claude/bear-findings.md + bear-mails.csv, bear-totals.csv,
   bear-rosters.csv — handoff claude/research-ledger-handoff.md). This page follows that ledger: every point carries its status
   (✅ sure / 🟡 likely), corrected points sit in the folded "corrected" list. Members' page: principles only (ledger A + C). */
const WT = { inf: 0.12, cav: 0.63, arc: 1 }, EXP = 0.58;   // ledger A3 / A4 (11/07 fit: 8 rallies, 107 marches)
const MIX = { inf: 1, cav: 25, arc: 74 };                   // ledger A5
const P = { T9: 50, T10: 66, TG1: 71, TG2: 76, TG3: 83 };
const VAL = [2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30];   // Valora talent, your own score + %, Lv1–11
const TREND = [["10/31", 18, 11.30], ["11/02", 20, 11.98], ["11/04", 23, 16.86], ["11/06", 23, 19.10]];   // ledger D: alliance total (B), Bear Trap 2
const TREND1 = [["10/31", 31, 24.47], ["11/06", 31, 29.72]];   // ledger D2: Bear Trap 1
const T = {
  en: { title: "🐻 Bear Hunt report", intro: "Our research on how Bear Hunt scores work: what you bring and which rally you join. Not official — one running ledger that grows with every hunt.",
    badge: "🔬 Research ledger · data: Bear Trap 1 ×2, Bear Trap 2 ×4 hunts (Trap 1 mails: only 5 from one rally) · updated {d}",
    st: { ok: "✅ sure", mid: "🟡 likely" },
    heroH: "The Bear never runs out of HP.", heroP: "So your score is about how hard the whole rally hits — and that is almost all about the rally leader. What you control: bring the right troops, join the right rally.",
    wH: "🏹 Archers count most", wP: "How much each troop type adds, same tier:",
    inf: "Infantry", cav: "Cavalry", arc: "Archers",
    sqH: "📉 More of one type = less per troop", sqP: "Each troop type is counted on its own, and it grows slower than the troop count (about n^0.58, close to a square root). 4× the archers gives about 2.2× the archer score. That's why the join cap is 100k: extra troops do more in someone else's march.",
    mixH: "🎯 Your best mix", mixP: "For your own march (it moves a little with troop tier):", mixFoot: "Tested (10/29): 10 : 10 : 80 vs 2 : 24 : 74 in the same rallies — only +2% each time, so the mix is a small thing; troop tier matters more:",
    calcH: "🧮 Try your mix", calcN: "{t} count", calcRes: "{p}% of the best mix for {n} troops",
    calcNote: "Relative only — not your real score. Same rally, same leader.",
    joinH: "🚩 Which rally you join matters most", joinP: "The same archer march scored 45–58M in strong rallies, about 40M in a middle one and 10–20M in weak ones (11/06) — about 3×.",
    weak: "Weak leader", strong: "Strong leader",
    sendH: "🚀 Sending troops", send: [["ok", "Strong rallies fill in 20 seconds to 2 minutes — be quick. Rallies opened later fill up in the last minute with troops coming back (Bear Trap 1, last wave: 15–20 rallies at once, late ones went from 20–40% to full in the last minute)."], ["ok", "Opening more rallies doesn't waste troops: they use the troops that came back."], ["ok", "Archer marches into strong rallies; infantry / cavalry marches into the later rallies."], ["mid", "Your own score depends mostly on which rallies your marches joined, not on how strong your own rally is — send your archer marches to the strongest rallies first, then spread infantry / cavalry marches over the others."]],
    kH: "👑 What makes a leader strong", kP: "Only the leader's side counts. Joiners' own stats and gear don't change the rally.",
    k: [["ok", "🏹", "The leader's archer Attack × Lethality from the rally bonus page (it already includes the leader's hero troop bonus — changing heroes changes it)."],
      ["ok", "🏙️", "City Bonus — only the leader's counts. It adds into the SAME slot as the leader's rally Exclusive Gear bonus (e.g. Attack 20% + 30% → ×1.5), it doesn't multiply on its own."],
      ["mid", "🦸", "Joiner skills: 4 slots from joiners who bring a hero in the first slot — that hero's top-right skill. Who gets the 4 slots: likely the higher skill level first, and only at the same level the order on the list (a Lv4 skill was skipped when 7 people had Lv5) — still being checked. They never show on the rally bonus page; they multiply on top during the battle."],
      ["ok", "⚔️", "The leader's own hero skills."]],
    jsH: "Mix Attack and Lethality joiner skills", jsAtk: "Attack", jsLet: "Lethality", jsFoot: "Attack and Lethality are two separate slots that multiply, so a mix beats 4 of the same; 2 + 2 is about 6% over 1 + 3 (worked out) — too small to see in mails, because the same mix already swings 1.4–1.5× from wave to wave. Chenko's fist icon is Lethality.",
    luckH: "🎲 Luck", luck: ["Same troops = same damage: in one rally, two players who sent exactly the same troops get exactly the same damage. What changes from wave to wave is one number for the whole rally (see the next line).", "The same rally can swing a lot from wave to wave — 10–25% usually, up to 1.36× (Bear Trap 1, 11/06) — compare 3–4 waves before saying one leader is stronger.", "The swing has three layers (likely): the whole rally together ×0.82–1.22 (the leader's chance skills), archers on top ×0.86–1.37, and each TG3 group (same troop type and tier) on top ×0.73–1.33."],
    trendH: "📈 Our alliance total", trendP: "Final leaderboard, each Bear Trap:", trap2: "Bear Trap 2", trap1: "Bear Trap 1", trendN: "{n} players",
    valH: "🌟 Valora (Master)", valP: "Her talent Hunter Instinct adds only to YOUR OWN Bear Hunt Damage Points (its levels unlock with Master Affinity; table from the game):", valSkill: "Dance of the Hunt: when you launch the Bear Hunt rally, rally capacity +30,000 per level (Lv4 = +120,000) — useful if you lead. Savage Advantage: your own march capacity in Bear Hunt +3,000 per level.",
    unkH: "🟡 Not known yet", unks: ["Joiner skills: whether skill level really comes first (check the top-right skill level of the people who were skipped).", "4 Chenko vs 2 Chenko + 2 Amane — same leader, 3–4 rallies each (test planned).", "Whether \"enemy Defense −\" bonuses work on the Bear.", "Whether Vivian's \"enemy damage taken +25%\" is a separate multiplier."],
    oldH: "🔁 Corrected earlier ({n})", old: ["Square root → n^0.58: very close, a bit more for big marches.", "Weights cavalry 0.58 / infantry 0.14 → 0.63 / 0.12; best mix 2 : 21 : 77 → 1 : 25 : 74.", "❌ \"Infantry and cavalry are worth more per troop\" — that was the slowdown above: small marches score more per troop.", "⚠️ \"Joiner skills = the first 4 on the list\" — on 11/06 several rallies skipped people higher on the list → new idea: skill level first, then list order.", "❌ \"A rally that only sets off in the last minute hits about ¼\" — misremembered (those two mails' leaders weren't checked).", "❌ \"The fist icon = Attack\" — it is Chenko's Lethality.", "❌ \"City Bonus multiplies on its own\" — it adds into the same slot as the rally Exclusive Gear bonus.", "City Bonus Attack +10% / Lethality +20% ≈ ×1.32 → Attack +10% / Lethality +10% ≈ ×1.21."],
    numH: "🔢 For those who want the formula", num: "Your score ≈ K × c × Σ (w × n^0.58). K = the rally leader's strength (the whole rally shares it); c = your own troops: troop tier × (1 + Valora's Hunter Instinct) — two players with the same tier and Hunter Instinct level get exactly the same; w = troop weight (archer 1, cavalry 0.63, infantry 0.12); n = how many of that type you sent. Fitted on 107 marches in 8 rallies (11/06, troop counts from the rally troop page): about 8.5% error (20% without c).",
    more: "Officers: leader strength and rally plan → 🐻 Bear plan",
    foot: "Source: our alliance's rally mails (1,123 + 5 from Bear Trap 1), final leaderboards (6: Trap 2 ×4, Trap 1 ×2), rally troop pages (8 rallies) and bonus pages, 10/25–11/06. Worked back from the numbers, not from the game." },
  zh: { title: "🐻 狩獵巨熊研究", intro: "我們自己研究的狩獵巨熊分數：該帶什麼兵、該進哪一團。不是官方說明——同一本帳，每次熊獵後累積更新。",
    badge: "🔬 研究帳本 · 資料：陷阱 1 2 場、陷阱 2 4 場（陷阱 1 信件只有一團 5 封）· 更新 {d}",
    st: { ok: "✅ 確定", mid: "🟡 推測" },
    heroH: "熊的血永遠打不完。", heroP: "所以你的分數看的是整團打多痛——而整團打多痛，幾乎只看集結隊長。你能做的：帶對兵種、進對的團。",
    wH: "🏹 弓兵最重要", wP: "同樣兵等，每種兵的份量：",
    inf: "步兵", cav: "騎兵", arc: "弓兵",
    sqH: "📉 同一種兵帶越多，每隻越不值", sqP: "每個兵種分開算，而且分數長得比兵數慢（約 n 的 0.58 次方，接近開根號）。弓兵帶 4 倍，弓兵那部分只多約 2.2 倍。所以加入上限是 100k：多塞的兵放到別人的部隊裡比較有用。",
    mixH: "🎯 你的最佳兵種比例", mixP: "你自己那支部隊（會隨兵等小幅變動）：", mixFoot: "實測（10/29）：同一團 10：10：80 和 2：24：74 比，每次只多 2%——比例只是小事，兵等更重要：",
    calcH: "🧮 試試你的比例", calcN: "{t}數量", calcRes: "是 {n} 隻兵最佳比例的 {p}%",
    calcNote: "只是相對值，不是實際分數。同一團、同一個隊長。",
    joinH: "🚩 進哪一團最重要", joinP: "同一支弓兵部隊：強團 45–58M、中間的團約 40M、弱團 10–20M（11/06）——差約 3 倍。",
    weak: "弱隊長", strong: "強隊長",
    sendH: "🚀 派兵", send: [["ok", "強團 20 秒到 2 分鐘就滿，要搶。後開的團最後一分鐘會靠回流的兵補滿（陷阱 1 最後一波：同時 15–20 團，晚開的團最後一分鐘從 20–40% 補到滿）。"], ["ok", "多開團不浪費：用的是回流的兵。"], ["ok", "弓兵部隊進強團；步兵、騎兵部隊進後段的團。"], ["mid", "你自己的分數主要看部隊進了哪幾團，不是自己開的團強不強——弓兵部隊先進最強的團，步兵、騎兵部隊再分給其他團。"]],
    kH: "👑 隊長強在哪裡", kP: "只看隊長那邊。加入者自己的屬性、裝備都不會改變整團。",
    k: [["ok", "🏹", "集結加成頁上隊長的弓兵攻擊力 × 殺傷力（已經包含隊長英雄的兵種加成，換英雄就會變）。"],
      ["ok", "🏙️", "城鎮增益——只有隊長開的有用。它和隊長集結用的專屬裝備加成「加在同一格」（例：攻擊 20% + 30% → ×1.5），不是另外再乘。"],
      ["mid", "🦸", "加入者技能：4 格，給第一格有帶英雄的加入者——那位英雄的右上技能。誰拿到這 4 格：可能先比技能等級（高的優先），同等級才照名單順序（7 人都 Lv5 時，Lv4 的人被跳過）——還在確認。它不會出現在集結加成頁，是戰鬥中另外乘上去的。"],
      ["ok", "⚔️", "隊長自己的英雄技能。"]],
    jsH: "加入者技能：攻擊、殺傷混搭", jsAtk: "攻擊力", jsLet: "殺傷力", jsFoot: "攻擊力和殺傷力是分開的兩格、彼此相乘，所以混搭比 4 個同一種好；2 + 2 比 1 + 3 多約 6%（推算）——小到信件看不出來，因為同一組合每波就能差 1.4–1.5 倍。琴科的拳頭圖示是殺傷。",
    luckH: "🎲 運氣", luck: ["同樣的兵＝同樣的傷害：同一團裡帶一模一樣兵數的兩個人，傷害完全一樣。每一波的差別是整團乘同一個數。", "同一團每一波可以差很多——通常 10–25%，最多到 1.36 倍（陷阱 1，11/06）——要比 3–4 波才能說哪個隊長比較強。", "跳動分三層（推測）：整團一起 ×0.82–1.22（隊長的機率技能）、弓兵另外 ×0.86–1.37、每組 TG3（同兵種同兵等）另外 ×0.73–1.33。"],
    trendH: "📈 聯盟總傷害", trendP: "最終排行，兩個陷阱分開：", trap2: "陷阱 2", trap1: "陷阱 1", trendN: "{n} 人",
    valH: "🌟 維拉（大師）", valP: "她的天賦「狩獵本能」只加「你自己」的傷害積分（等級跟著大師好感度解鎖，數字來自遊戲內表格）：", valSkill: "狩獵之舞：開狩獵巨熊集結時，集結容量每級 +30,000（Lv4 = +120,000）——想當隊長的人有用。人數優勢：參加狩獵巨熊時，自己部隊的容量每級 +3,000。",
    unkH: "🟡 還不知道的", unks: ["加入者技能：是不是真的先比技能等級（要看被跳過的人第一格英雄的右上技能等級）。", "4 琴科 vs 2 琴科 + 2 雨音——同一隊長各 3–4 團（準備實測）。", "「敵方防禦 −」的增益對熊有沒有效。", "薇薇安「敵方受到傷害 +25%」是不是另一個乘區。"],
    oldH: "🔁 之前更正過的（{n}）", old: ["開根號 → n 的 0.58 次方：很接近，大部隊會多一點點。", "兵種權重 騎 0.58／步 0.14 → 0.63／0.12；最佳比例 2：21：77 → 1：25：74。", "❌「步兵、騎兵每隻比較值」——那是上面的遞減：小部隊每隻分數本來就比較高。", "⚠️「加入者技能 = 名單前 4 個」——11/06 好幾團跳過了排在前面的人 → 新想法：先比技能等級，再照名單順序。", "❌「最後一分鐘才出發的團只打到約 1/4」——記錯了（那兩封信的隊長沒確認）。", "❌「拳頭圖示 = 攻擊」——它是琴科的殺傷。", "❌「城鎮增益另外相乘」——它和集結專屬裝備加成加在同一格。", "城鎮增益 攻 +10%／殺 +20% ≈ ×1.32 → 攻 +10%／殺 +10% ≈ ×1.21。"],
    numH: "🔢 給想看公式的人", num: "你的分數 ≈ K × c × Σ（w × n 的 0.58 次方）。K = 集結隊長的強度（全團共用）；c = 你自己的部隊：兵等 ×（1 + 維拉「狩獵本能」）——兵等和狩獵本能等級一樣的兩個人，分數完全一樣；w = 兵種權重（弓兵 1、騎兵 0.63、步兵 0.12）；n = 你那個兵種帶的數量。用 11/06 8 團、107 支部隊（兵數取自集結兵種頁）擬合：誤差約 8.5%（不算 c 時 20%）。",
    more: "幹部：隊長強度和排團 → 🐻 熊獵規劃",
    foot: "來源：我們聯盟的集結信件（1,123 筆 + 陷阱 1 5 封）、最終排行（6 份：陷阱 2 四場、陷阱 1 兩場）、集結兵種頁（8 團）、加成頁，10/25–11/06。從數字反推，不是遊戲官方說明。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { inf: 1000, cav: 25000, arc: 74000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-bh") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-bh", JSON.stringify(S)); } catch (e) {} };
const score = (n) => Object.keys(WT).reduce((s, k) => s + WT[k] * Math.max(0, (n[k] || 0) / 1000) ** EXP, 0);   // same tier for all → c cancels out
function best(N) { const q = Object.fromEntries(Object.keys(WT).map((k) => [k, WT[k] ** (1 / (1 - EXP))])), z = q.inf + q.cav + q.arc; return Object.fromEntries(Object.keys(WT).map((k) => [k, N * q[k] / z])); }
const pct = (x, N) => N ? Math.round(x / N * 100) : 0;

function calcHtml() {
  const N = S.inf + S.cav + S.arc, b = best(N), r = N ? score(S) / score(b) * 100 : 0;
  const seg = (k) => `<i class="${k}" style="width:${N ? (S[k] / N * 100).toFixed(1) : 0}%"></i>`;
  return `<div class="bh-in">${["inf", "cav", "arc"].map((k) => `<label>${esc(t("calcN").replace("{t}", t(k)))}<input class="inp" id="bh_${k}" type="number" min="0" step="1000" value="${S[k]}"></label>`).join("")}</div>
    <div class="bh-mix sm">${seg("inf")}${seg("cav")}${seg("arc")}</div>
    <div class="bh-res">${esc(t("calcRes").replace("{p}", r.toFixed(1)).replace("{n}", fmt(N)))}</div>
    <div class="muted bh-small">${esc(t("calcNote"))}</div>`;
}
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => o[k] ?? m);
const pic = (id) => `<img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy">`;
const tag = (k) => `<span class="bh-st ${k}">${esc(t("st")[k])}</span>`;
function render() {
  const root = $("bh_root"); if (!root) return;
  const hn = (k) => ({ amane: ["Amane", "雨音"], margot: ["Margot", "瑪歌"], luna: ["Luna", "露娜"], chenko: ["Chenko", "琴科"], yeonwoo: ["Yeonwoo", "妍羽"], amadeus: ["Amadeus", "阿瑪迪斯"] }[k][lang === "zh" ? 1 : 0]);
  const h3 = (k, st) => `<h3>${esc(t(k))} ${tag(st)}</h3>`;
  root.innerHTML = `
  <div class="bh-hero"><div class="bh-hero-in"><span class="bh-badge">${esc(fill(t("badge"), { n: HUNTS, s: SPAN, d: UPDATED }))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div></div>
  <div class="card">${h3("wH", "ok")}<p class="bh-p">${esc(t("wP"))}</p>
    <div class="bh-w">${[["arc", WT.arc], ["cav", WT.cav], ["inf", WT.inf]].map(([k, w]) => `<figure class="bh-wt" style="--s:${(0.42 + 0.58 * w).toFixed(2)}"><div class="bh-wi"><img src="figures/vv/${k}.webp" alt=""></div><figcaption><b>${esc(t(k))}</b><span class="bh-wn">×${w}</span></figcaption></figure>`).join("")}</div></div>
  <div class="card">${h3("sqH", "ok")}<p class="bh-p">${esc(t("sqP"))}</p>
    <div class="bh-sq">${[1, 4, 9].map((m) => `<div class="bh-sqr"><span>${m}×</span><div class="bh-sqb"><i class="n" style="width:${m / 9 * 100}%"></i></div><div class="bh-sqb"><i class="s" style="width:${(m ** EXP / 9 ** EXP * 100).toFixed(1)}%"></i></div><b>${(m ** EXP).toFixed(1)}×</b></div>`).join("")}</div></div>
  <div class="card">${h3("mixH", "ok")}<p class="bh-p">${esc(t("mixP"))}</p>
    <div class="bh-mix">${["inf", "cav", "arc"].map((k) => `<i class="${k}" style="width:${MIX[k]}%"></i>`).join("")}</div>
    <div class="bh-mixk">${["inf", "cav", "arc"].map((k) => `<span><i class="${k}"></i>${esc(t(k))} ${MIX[k]}</span>`).join("")}</div>
    <p class="bh-p" style="margin-top:10px">${esc(t("mixFoot"))} <span class="bh-tiers">${Object.entries(P).map(([k, v]) => `<span>${k} <b>${v}</b></span>`).join("")}</span></p>
    <div class="bh-calc"><h4>${esc(t("calcH"))}</h4><div id="bh_calc">${calcHtml()}</div></div></div>
  <div class="card">${h3("joinH", "ok")}<p class="bh-p">${esc(t("joinP"))}</p>
    <div class="bh-join"><div class="bh-jr"><span>${esc(t("weak"))}</span><div class="bh-jb"><i style="width:33%"></i></div><b>×1</b></div><div class="bh-jr"><span>${esc(t("strong"))}</span><div class="bh-jb"><i class="s" style="width:100%"></i></div><b>×3</b></div></div></div>
  <div class="card"><h3>${esc(t("sendH"))}</h3><ul class="bh-k">${t("send").map(([st, x]) => `<li><span>${tag(st)}</span><span>${esc(x)}</span></li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("kH"))}</h3><p class="bh-p">${esc(t("kP"))}</p>
    <ul class="bh-k">${t("k").map(([st, i, x]) => `<li><span>${i}</span><span>${esc(x)} ${tag(st)}</span></li>`).join("")}</ul>
    <div class="bh-js"><h4>${esc(t("jsH"))} ${tag("mid")}</h4>
      <div class="bh-jsr"><span class="bh-jst">${esc(t("jsAtk"))}</span>${["amane", "margot", "luna"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="bh-jsr"><span class="bh-jst let">${esc(t("jsLet"))}</span>${["chenko", "yeonwoo", "amadeus"].map((h) => `<span class="bh-h">${pic(h)}<small>${esc(hn(h))}</small></span>`).join("")}</div>
      <div class="muted bh-small">${esc(t("jsFoot"))}</div></div></div>
  <div class="card">${h3("trendH", "ok")}<p class="bh-p">${esc(t("trendP"))}</p>
    ${[["trap2", TREND], ["trap1", TREND1]].map(([k, TR]) => { const tmax = Math.max(...TREND1.map((x) => x[2])); return `<h4 style="margin:10px 0 4px">${esc(t(k))}</h4><div class="bh-join">${TR.map(([d, n, v], i) => `<div class="bh-jr bh-tr"><span>${d}</span><div class="bh-jb"><i class="s" style="width:${(v / tmax * 100).toFixed(1)}%"></i></div><b>${v.toFixed(2)}B</b><small class="muted">${esc(fill(t("trendN"), { n }))}${i ? ` · ${v >= TR[i - 1][2] ? "+" : ""}${((v / TR[i - 1][2] - 1) * 100).toFixed(1)}%` : ""}</small></div>`).join("")}</div>`; }).join("")}</div>
  <div class="bh-two">
    <div class="card">${h3("luckH", "ok")}<ul class="bh-ul">${t("luck").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("valH"))}</h3><p class="bh-p">${esc(t("valP"))}</p>
      <div class="bh-val">${VAL.map((v, i) => `<div title="Lv${i + 1}"><i style="height:${Math.round(v / 30 * 54)}px"></i><small>${i + 1}</small></div>`).join("")}</div>
      <div class="muted bh-small" style="margin:4px 0 8px">Lv1 2% · Lv4 9% · Lv11 30%</div><p class="bh-p" style="margin:0">${esc(t("valSkill"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="bh-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(fill(t("oldH"), { n: t("old").length }))}</b></summary><ul class="bh-ul" style="margin-top:8px">${t("old").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>
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
