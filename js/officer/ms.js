/* NXS officer page — 🧳 Migrant Score report (registers OFFICER_PAGES.ms; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: our own research, STILL BEING TESTED — what raises the hidden Migrant Score (= Swordland troop power × 317).
   From Sparrow's main and second account, item-by-item before/after tests (11/02–11/04) and the 10/14 Swordland check of 98 players
   (Project docs claude/migrant-score-spec.md, claude/kvk-2026-11-data-plan.md, claude/kingshot-upgrade-efficiency.md). Not official.
   Read-only text + a small calculator, no member data (no account IDs, nobody else's scores). */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
// Relative weight per 1M power, same on every account (11/04 tests). Points = weight × power (M) × the account's own rate.
const W = { charm: 1, pet: 1, tech: 1, gear: 1, fav: 0.5, adv: 0.3, star: 0.35, skill: 0, troops: 0 };
const ROWS = [["charm", 1, "", "hi"], ["pet", 1, "", "hi"], ["tech", 1, "", "hi"], ["gear", 1, "", "hi"], ["fav", 0.5, "", "hi"], ["adv", 0.3, "≈ 0.3", "mid"], ["star", 0.35, "0.2–0.5", "mid"], ["skill", 0, "", "mid"], ["troops", 0, "", "hi"]];
const RATES = [["big", 9110], ["small", 5935]];
const sp = (m) => m / 317;
const T = {
  en: { title: "🧳 Migrant Score", intro: "Our research on the hidden Migrant Score and what raises it. Still being tested — numbers will change.",
    badge: "🧪 Still testing · from our own before/after tests · updated {d}",
    heroH: "A hidden score that counts what you've built for good.", heroP: "Governor Charms, pets, research and Hero Gear count fully. Master affinity counts half, hero stars a little. Troops don't count. It is almost exactly your Swordland Showdown troop power × 317.",
    whatH: "🔎 What it is",
    what: ["The game doesn't show it. MightPulse does (the kingdom list only shows the top 100).", "The top 100 of a kingdom added together decide whether the kingdom counts as leading or normal for migration (top 10% of each group = leading)."],
    eqA: "Migrant Score", eqB: "Swordland troop power", eqNote: "Checked on 98 players on 10/14 (average error 1.7%) and again on 11/03 — closer than total power + Mystic Trial.",
    tblH: "📊 What raises it", tblP: "How much each kind of upgrade counts, for the same power gained (1 = full):",
    items: { charm: "💎 Governor Charms", pet: "🐾 Pets (level-up, breakthrough, refinement)", tech: "🔬 Research", gear: "🛡️ Hero Gear (enhance)", fav: "🎓 Master affinity", adv: "🎓 Master advancement", star: "⭐ Hero stars (main heroes)", skill: "🎓 Master skills · stars of other heroes", troops: "⚔️ Training / losing troops" },
    conf: { hi: "sure", mid: "so-so" },
    tblFoot: "Same power: Charms, pets, research and Hero Gear = 2× master affinity and 2–5× hero stars. Master advancement: only part of its power counts (the talent / skill part doesn't).",
    rateH: "📈 Your account's rate", rateP: "\"1\" turns into a different number of points on each account. The same pet breakthrough (+91,440 power) gave +833 on the main account and +543 on the second one.",
    rates: { big: "Town Center 40, TG2", small: "Town Center 25" }, rateU: "points per 1M power", rateSw: "≈ +{n} Swordland power",
    rateGuess: "The more built-up the account, the more points the same upgrade gives. Maybe the Town Center sets it — not known yet.",
    tcH: "🏰 Town Center", tcP: "Main account to TG2 (Barracks and Range also TG2 at the same time): +10,077 at once (≈ +32 Swordland power), +5.0%. A normal level (24 → 25) and normal buildings added almost nothing.",
    tcGuess: "Our guess: building power itself doesn't count. The Town Center's gold (TG) level gives the jump — maybe by raising the account's rate (+5% fits). To be confirmed at the next TG upgrade.",
    downH: "🔒 Never goes down",
    down: ["Losing troops doesn't lower it.", "Taking off Hero Gear doesn't either (770k gear power removed, same score two hours later) → it only goes up, or it counts what you own, not what you wear.", "Stat % don't count: a research level that gives +2% Attack adds only that level's research power. So the score shows how much you invested, not how strong your stats are."],
    updH: "⏱️ When it updates", upd: "Not instant. It is recalculated about every 15–60 minutes, at a different time for each account. Wait a bit before checking MightPulse.",
    calcH: "🧮 Try it", calcItem: "I upgrade", calcPow: "Power gained", calcRate: "My account", calcRes: "≈ +{m} Migrant Score · ≈ +{s} Swordland power",
    calcOpp: "Someone's Migrant Score", calcOppRes: "≈ {s} Swordland troop power",
    calcNote: "Estimate from our tests so far. It shows investment, not stats.",
    doH: "✅ So",
    dos: ["To climb in Swordland Showdown: Governor Charms, pets, research and Hero Gear first (they count the same — pick the one where power is cheapest), then master affinity, then stars of your main heroes. Training troops doesn't help.",
      "Save for the Town Center's next gold (TG) level — that's the big jump.",
      "Sizing up an opponent: their Migrant Score ÷ 317 ≈ their Swordland troop power. It only shows investment, not stats."],
    unkH: "🟡 Not known yet",
    unks: ["What sets each account's rate (the Town Center?).", "Governor Gear — not tested yet.", "Why hero stars give different results."],
    foot: "Source: Sparrow's two accounts, item-by-item before/after tests (11/02–11/04), and the 10/14 Swordland check of 98 players. Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "🧳 遷城分數", intro: "我們自己研究的隱藏「遷城分數」：什麼會讓它變高。還在測試中，數字會再修正。",
    badge: "🧪 測試中 · 來自我們自己的前後測試 · 更新 {d}",
    heroH: "一個隱藏分數，只算你長期投資的東西。", heroP: "領主寶石、寵物、科技、英雄裝備全算；大師好感度算一半；英雄升星只算一點；兵不算。它幾乎剛好等於聖劍爭奪的部隊戰力 × 317。",
    whatH: "🔎 它是什麼",
    what: ["遊戲裡看不到，MightPulse 看得到（王國排行只列前 100 名）。", "王國前 100 名加起來，決定遷城時這個王國算「領先」還是「普通」（每個遷城組前 10% = 領先王國）。"],
    eqA: "遷城分數", eqB: "聖劍部隊戰力", eqNote: "10/14 用 98 人驗證（平均誤差 1.7%），11/03 再確認一次——比「總戰力＋秘境」還準。",
    tblH: "📊 什麼會加分", tblP: "加同樣的實力，各種升級算多少（1 = 全算）：",
    items: { charm: "💎 領主寶石", pet: "🐾 寵物（升級、突破、洗練）", tech: "🔬 科技（研究）", gear: "🛡️ 英雄裝備（強化）", fav: "🎓 大師好感度", adv: "🎓 大師進階", star: "⭐ 英雄升星（主力）", skill: "🎓 大師技能・非主力英雄升星", troops: "⚔️ 收兵、損兵" },
    conf: { hi: "可信", mid: "還不確定" },
    tblFoot: "同樣的實力：寶石、寵物、科技、英雄裝備 = 大師好感度的 2 倍、升星的 2–5 倍。大師進階：只有一部分實力算（天賦、技能那部分不算）。",
    rateH: "📈 每個帳號的倍率", rateP: "「1」換成幾分，每個帳號不一樣。同一個寵物突破（+91,440 實力）：主帳 +833、小帳 +543。",
    rates: { big: "城鎮中心 40、TG2", small: "城鎮中心 25" }, rateU: "分／1M 實力", rateSw: "≈ 聖劍 +{n}",
    rateGuess: "帳號越發展，同樣的升級換越多分。可能跟城鎮中心有關——還不知道。",
    tcH: "🏰 城鎮中心", tcP: "主帳升到 TG2（步兵營、弓兵營同時也 TG2）那次一口氣 +10,077（≈ 聖劍 +32），剛好 +5.0%。小帳一般等級（24→25）、一般建築升級幾乎沒加分。",
    tcGuess: "推測：建築實力本身不算，城鎮中心的黃金等級（TG）才會大跳——可能是讓帳號倍率變大（+5% 對得上）。等下一次 TG 升級再確認。",
    downH: "🔒 不會扣分",
    down: ["損兵不扣。", "卸下英雄裝備也不扣（卸了 77 萬裝備實力，兩小時後一樣）→ 分數只升不降，或算的是「擁有的」不是「穿著的」。", "不含屬性 %：研究攻擊力 +2% 只照那一級的科技實力加分。所以遷城分數看得出投資量，看不出屬性強弱。"],
    updH: "⏱️ 多久更新", upd: "不是即時。大約每 15–60 分鐘重算一次，每個帳號時間不一樣。升完等一下再去看 MightPulse。",
    calcH: "🧮 算算看", calcItem: "我升級", calcPow: "加了多少實力", calcRate: "我的帳號", calcRes: "≈ 遷城分數 +{m} · ≈ 聖劍部隊戰力 +{s}",
    calcOpp: "某人的遷城分數", calcOppRes: "≈ 聖劍部隊戰力 {s}",
    calcNote: "用目前測試結果估的。只代表投資量，不代表屬性。",
    doH: "✅ 所以",
    dos: ["想拉高聖劍爭奪排名：先升領主寶石、寵物、科技、英雄裝備（四個算一樣，挑實力最便宜的），其次大師好感度，最後升主力英雄的星。收兵沒用。",
      "存資源衝城鎮中心下一個黃金等級（TG）——那是大跳。",
      "看對手：他的遷城分數 ÷ 317 ≈ 他的聖劍部隊戰力。但這只代表投資量，不代表屬性。"],
    unkH: "🟡 還不知道的",
    unks: ["每個帳號的倍率由什麼決定（城鎮中心？）。", "領主裝備還沒測。", "英雄升星為什麼結果不一致。"],
    foot: "來源：Sparrow 兩個帳號逐項前後測試（11/02–11/04）、10/14 聖劍 98 人對照。不是遊戲官方說明，數字會隨更多測試修正。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { item: "charm", pow: 1000000, rate: "big", opp: 40000000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-ms") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-ms", JSON.stringify(S)); } catch (e) {} };

function calcHtml() {
  if (!(S.item in W)) S.item = "charm";
  const rate = (RATES.find((r) => r[0] === S.rate) || RATES[0])[1];
  const m = S.pow / 1e6 * (W[S.item] || 0) * rate;
  return `<div class="ms-in"><label>${esc(t("calcItem"))}<select class="inp" id="ms_item">${Object.keys(W).map((k) => `<option value="${k}"${k === S.item ? " selected" : ""}>${esc(t("items")[k])}</option>`).join("")}</select></label>
      <label>${esc(t("calcPow"))}<input class="inp" id="ms_pow" type="number" min="0" step="100000" value="${S.pow}"></label>
      <label>${esc(t("calcRate"))}<select class="inp" id="ms_rate">${RATES.map(([k, v]) => `<option value="${k}"${k === S.rate ? " selected" : ""}>${esc(t("rates")[k])} (${fmt(v)})</option>`).join("")}</select></label></div>
    <div class="ms-res">${esc(t("calcRes").replace("{m}", fmt(m)).replace("{s}", sp(m).toFixed(1)))}</div>
    <div class="ms-in"><label>${esc(t("calcOpp"))}<input class="inp" id="ms_opp" type="number" min="0" step="100000" value="${S.opp}"></label></div>
    <div class="ms-res">${esc(t("calcOppRes").replace("{s}", fmt(sp(S.opp))))}</div>
    <div class="muted ms-small">${esc(t("calcNote"))}</div>`;
}
function render() {
  const root = $("ms_root"); if (!root) return;
  root.innerHTML = `
  <div class="ms-hero"><span class="ms-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="card"><h3>${esc(t("whatH"))}</h3>
    <div class="ms-eq"><div class="ms-eqb"><b>${esc(t("eqA"))}</b></div><span class="ms-op">÷ 317 ≈</span><div class="ms-eqb sw"><b>${esc(t("eqB"))}</b></div></div>
    <p class="muted ms-small" style="margin:6px 0 10px">${esc(t("eqNote"))}</p>
    <ul class="ms-ul">${t("what").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("tblH"))}</h3><p class="ms-p">${esc(t("tblP"))}</p>
    <div class="ms-bars">${ROWS.map(([k, v, txt, c]) => `<div class="ms-row${v ? "" : " zero"}"><div class="ms-k">${esc(t("items")[k])}</div>
      <div class="ms-b"><i style="width:${(v * 100).toFixed(1)}%"></i></div>
      <div class="ms-v"><b>${esc(txt || String(v))}</b></div>
      <span class="ms-c ${c}">${esc(t("conf")[c])}</span></div>`).join("")}</div>
    <p class="muted ms-small" style="margin-top:10px">${esc(t("tblFoot"))}</p></div>
  <div class="card"><h3>${esc(t("rateH"))}</h3><p class="ms-p">${esc(t("rateP"))}</p>
    <div class="ms-two">${RATES.map(([k, v]) => `<div class="ms-eqb${k === "big" ? " sw" : ""}"><b>${esc(t("rates")[k])}</b><div>≈ ${fmt(v)} ${esc(t("rateU"))}</div><div class="ms-sw">${esc(t("rateSw").replace("{n}", Math.round(sp(v))))}</div></div>`).join("")}</div>
    <p class="ms-guess">💭 ${esc(t("rateGuess"))}</p></div>
  <div class="card"><h3>${esc(t("tcH"))}</h3><p class="ms-p">${esc(t("tcP"))}</p><p class="ms-guess">💭 ${esc(t("tcGuess"))}</p></div>
  <div class="ms-two">
    <div class="card"><h3>${esc(t("downH"))}</h3><ul class="ms-ul">${t("down").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${esc(t("updH"))}</h3><p class="ms-p">${esc(t("upd"))}</p></div>
  </div>
  <div class="card"><h3>${esc(t("calcH"))}</h3><div id="ms_calc" class="ms-calc">${calcHtml()}</div></div>
  <div class="card"><h3>${esc(t("doH"))}</h3><ol class="ms-dos">${t("dos").map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="ms-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="muted ms-small">${esc(t("foot"))}</div>`;
  bind();
}
function bind() {
  const redo = () => { keep(); const c = $("ms_calc"); if (!c) return; c.innerHTML = calcHtml(); bind(); };
  for (const [id, k, num] of [["ms_item", "item", 0], ["ms_pow", "pow", 1], ["ms_rate", "rate", 0], ["ms_opp", "opp", 1]]) {
    const el = $(id); if (!el) continue;
    el.onchange = () => { S[k] = num ? Math.max(0, +el.value || 0) : el.value; redo(); };
  }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("ms_title")) { $("ms_title").textContent = t("title"); $("ms_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ms = { init, applyTexts, setLang };
})();
