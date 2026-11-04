/* NXS officer page — 🧳 Migrant Score report (registers OFFICER_PAGES.ms; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: our own research, STILL BEING TESTED — what raises the hidden Migrant Score (= Swordland troop power × 317).
   From Sparrow's main and second account, item-by-item before/after tests (11/02–11/04) and the 10/14 Swordland check of 98 players
   (Project docs claude/migrant-score-spec.md, claude/kvk-2026-11-data-plan.md, claude/kingshot-upgrade-efficiency.md). Not official.
   Read-only text + a small calculator, no member data (no account IDs, nobody else's scores). */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
const W = { tech: 5900, gear: 5900, master: 3000, star: 2400, troops: 0 };     // Migrant Score per 1M power (for now)
const ROWS = [["tech", 5900, "", "hi"], ["gear", 5900, "", "hi"], ["master", 3000, "", "mid"], ["star", 2400, "2,000–3,000", "mid"], ["troops", 0, "", "hi"]];
const sp = (m) => m / 317;
const T = {
  en: { title: "🧳 Migrant Score", intro: "Our research on the hidden Migrant Score and what raises it. Still being tested — numbers will change.",
    badge: "🧪 Still testing · from our own before/after tests · updated {d}",
    heroH: "A hidden score that counts what you've built for good.", heroP: "Research, Hero Gear, masters and heroes count. Troops don't. It is almost exactly your Swordland Showdown troop power × 317.",
    whatH: "🔎 What it is",
    what: ["The game doesn't show it. MightPulse does (the kingdom list only shows the top 100).", "The top 100 of a kingdom added together decide whether the kingdom counts as leading or normal for migration (top 10% of each group = leading)."],
    eqA: "Migrant Score", eqB: "Swordland troop power", eqNote: "Checked on 98 players on 10/14 (average error 1.7%) and again on 11/03 — closer than total power + Mystic Trial.",
    tblH: "📊 What raises it", tblP: "Points per 1M power you gain from each kind of upgrade:",
    items: { tech: "🔬 Research", gear: "🛡️ Hero Gear (enhance)", master: "🎓 Masters (affinity, advance)", star: "⭐ Hero stars", troops: "⚔️ Training / losing troops" },
    conf: { hi: "sure", mid: "so-so" }, perM: "/ 1M power", swd: "≈ {n} Swordland power",
    tblFoot: "Same power, 2–3× the effect: research and Hero Gear beat hero stars. Masters: two clean tests gave 2,960 and 2,980, a third 4,560. Hero stars: three tests didn't agree.",
    tcH: "🏰 Town Center", tcP: "Main account to TG2 (Barracks and Range also TG2 at the same time): +10,077 at once (≈ +32 Swordland power). A normal level (24 → 25) and normal buildings added almost nothing.",
    tcGuess: "Our guess: building power itself doesn't count — the Town Center's gold (TG) level gives the big jump. To be confirmed at the next TG upgrade.",
    downH: "🔒 Never goes down",
    down: ["Losing troops doesn't lower it.", "Taking off Hero Gear doesn't either (770k gear power removed, same score two hours later) → it only goes up, or it counts what you own, not what you wear.", "Stat % don't count: a research level that gives +2% Attack adds only that level's research power. So the score shows how much you invested, not how strong your stats are."],
    updH: "⏱️ When it updates", upd: "Not instant. It is recalculated about every 15–60 minutes, at a different time for each account. Wait a bit before checking MightPulse.",
    calcH: "🧮 Try it", calcItem: "I upgrade", calcPow: "Power gained", calcRes: "≈ +{m} Migrant Score · ≈ +{s} Swordland power",
    calcOpp: "Someone's Migrant Score", calcOppRes: "≈ {s} Swordland troop power",
    calcNote: "Estimate from our tests so far. It shows investment, not stats.",
    doH: "✅ So",
    dos: ["To climb in Swordland Showdown: research and Hero Gear first, then masters, then hero stars. Training troops doesn't help.",
      "Save for the Town Center's next gold (TG) level — that's the big jump.",
      "Sizing up an opponent: their Migrant Score ÷ 317 ≈ their Swordland troop power. It only shows investment, not stats."],
    unkH: "🟡 Not known yet",
    unks: ["Pets, Governor Gear and Governor Charms — not tested yet.", "How much each Town Center level is worth.", "Why hero stars give different results.", "Whether master skill upgrades count (testing now)."],
    foot: "Source: Sparrow's two accounts, item-by-item before/after tests (11/02–11/04), and the 10/14 Swordland check of 98 players. Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "🧳 遷城分數", intro: "我們自己研究的隱藏「遷城分數」：什麼會讓它變高。還在測試中，數字會再修正。",
    badge: "🧪 測試中 · 來自我們自己的前後測試 · 更新 {d}",
    heroH: "一個隱藏分數，只算你長期投資的東西。", heroP: "科技、英雄裝備、大師、英雄會算，兵不算。它幾乎剛好等於聖劍爭奪的部隊戰力 × 317。",
    whatH: "🔎 它是什麼",
    what: ["遊戲裡看不到，MightPulse 看得到（王國排行只列前 100 名）。", "王國前 100 名加起來，決定遷城時這個王國算「領先」還是「普通」（每個遷城組前 10% = 領先王國）。"],
    eqA: "遷城分數", eqB: "聖劍部隊戰力", eqNote: "10/14 用 98 人驗證（平均誤差 1.7%），11/03 再確認一次——比「總戰力＋秘境」還準。",
    tblH: "📊 什麼會加分", tblP: "每多 1M 實力，各種升級換到的遷城分數：",
    items: { tech: "🔬 科技（研究）", gear: "🛡️ 英雄裝備（強化）", master: "🎓 大師（好感度、進階）", star: "⭐ 英雄升星", troops: "⚔️ 收兵、損兵" },
    conf: { hi: "可信", mid: "還不確定" }, perM: "／1M 實力", swd: "≈ 聖劍 {n}",
    tblFoot: "同樣的實力，科技和英雄裝備的效果是升星的 2–3 倍。大師：兩次純測 2,960、2,980，另一次 4,560。英雄升星：三次結果不一致。",
    tcH: "🏰 城鎮中心", tcP: "主帳升到 TG2（步兵營、弓兵營同時也 TG2）那次一口氣 +10,077（≈ 聖劍 +32）。小帳一般等級（24→25）、一般建築升級幾乎沒加分。",
    tcGuess: "推測：建築實力本身不算，城鎮中心的黃金等級（TG）才會大跳。等下一次 TG 升級再確認。",
    downH: "🔒 不會扣分",
    down: ["損兵不扣。", "卸下英雄裝備也不扣（卸了 77 萬裝備實力，兩小時後一樣）→ 分數只升不降，或算的是「擁有的」不是「穿著的」。", "不含屬性 %：研究攻擊力 +2% 只照那一級的科技實力加分。所以遷城分數看得出投資量，看不出屬性強弱。"],
    updH: "⏱️ 多久更新", upd: "不是即時。大約每 15–60 分鐘重算一次，每個帳號時間不一樣。升完等一下再去看 MightPulse。",
    calcH: "🧮 算算看", calcItem: "我升級", calcPow: "加了多少實力", calcRes: "≈ 遷城分數 +{m} · ≈ 聖劍部隊戰力 +{s}",
    calcOpp: "某人的遷城分數", calcOppRes: "≈ 聖劍部隊戰力 {s}",
    calcNote: "用目前測試結果估的。只代表投資量，不代表屬性。",
    doH: "✅ 所以",
    dos: ["想拉高聖劍爭奪排名：先升科技、英雄裝備，其次大師，最後升星。收兵沒用。",
      "存資源衝城鎮中心下一個黃金等級（TG）——那是大跳。",
      "看對手：他的遷城分數 ÷ 317 ≈ 他的聖劍部隊戰力。但這只代表投資量，不代表屬性。"],
    unkH: "🟡 還不知道的",
    unks: ["寵物、領主裝備、領主寶石還沒測。", "城鎮中心每一級各值多少。", "英雄升星為什麼結果不一致。", "大師技能升級算不算（測試中）。"],
    foot: "來源：Sparrow 兩個帳號逐項前後測試（11/02–11/04）、10/14 聖劍 98 人對照。不是遊戲官方說明，數字會隨更多測試修正。" },
};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const S = { item: "tech", pow: 1000000, opp: 40000000 };
try { Object.assign(S, JSON.parse(localStorage.getItem("nxs-ms") || "{}")); } catch (e) {}
const keep = () => { try { localStorage.setItem("nxs-ms", JSON.stringify(S)); } catch (e) {} };

function calcHtml() {
  const m = S.pow / 1e6 * (W[S.item] || 0);
  return `<div class="ms-in"><label>${esc(t("calcItem"))}<select class="inp" id="ms_item">${Object.keys(W).map((k) => `<option value="${k}"${k === S.item ? " selected" : ""}>${esc(t("items")[k])}</option>`).join("")}</select></label>
      <label>${esc(t("calcPow"))}<input class="inp" id="ms_pow" type="number" min="0" step="100000" value="${S.pow}"></label></div>
    <div class="ms-res">${esc(t("calcRes").replace("{m}", fmt(m)).replace("{s}", sp(m).toFixed(1)))}</div>
    <div class="ms-in"><label>${esc(t("calcOpp"))}<input class="inp" id="ms_opp" type="number" min="0" step="100000" value="${S.opp}"></label></div>
    <div class="ms-res">${esc(t("calcOppRes").replace("{s}", fmt(sp(S.opp))))}</div>
    <div class="muted ms-small">${esc(t("calcNote"))}</div>`;
}
function render() {
  const root = $("ms_root"); if (!root) return;
  const max = 5900;
  root.innerHTML = `
  <div class="ms-hero"><span class="ms-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="card"><h3>${esc(t("whatH"))}</h3>
    <div class="ms-eq"><div class="ms-eqb"><b>${esc(t("eqA"))}</b></div><span class="ms-op">÷ 317 ≈</span><div class="ms-eqb sw"><b>${esc(t("eqB"))}</b></div></div>
    <p class="muted ms-small" style="margin:6px 0 10px">${esc(t("eqNote"))}</p>
    <ul class="ms-ul">${t("what").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h3>${esc(t("tblH"))}</h3><p class="ms-p">${esc(t("tblP"))}</p>
    <div class="ms-bars">${ROWS.map(([k, v, txt, c]) => `<div class="ms-row${v ? "" : " zero"}"><div class="ms-k">${esc(t("items")[k])}</div>
      <div class="ms-b"><i style="width:${(v / max * 100).toFixed(1)}%"></i></div>
      <div class="ms-v"><b>${esc(txt || fmt(v))}</b> <span>${esc(t("perM"))}</span>${v ? `<div class="ms-sw">${esc(t("swd").replace("{n}", "+" + Math.round(sp(v))))}</div>` : ""}</div>
      <span class="ms-c ${c}">${esc(t("conf")[c])}</span></div>`).join("")}</div>
    <p class="muted ms-small" style="margin-top:10px">${esc(t("tblFoot"))}</p></div>
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
  for (const [id, k, num] of [["ms_item", "item", 0], ["ms_pow", "pow", 1], ["ms_opp", "opp", 1]]) {
    const el = $(id); if (!el) continue;
    el.onchange = () => { S[k] = num ? Math.max(0, +el.value || 0) : el.value; redo(); };
  }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("ms_title")) { $("ms_title").textContent = t("title"); $("ms_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.ms = { init, applyTexts, setLang };
})();
