/* NXS officer page — 🐻 Bear plan (registers OFFICER_PAGES.bearplan; own tab, nobody by default, admins always).
   A discussion draft for Armada (Sherry, 2026-11-01; spec: Project doc claude/bear-optimizer-spec.md, first version = the
   "BT2 Rally Plan" artifact): one Bear wave now vs. fewer, stronger rallies that fill in a fixed order (strong → weak, ~14 marches
   each, only the last rally takes the turnout swings). Nothing here is decided.
   The leaders' names, K and types are member data → kept ONLY in the encrypted file data/bearplan-x7k2p9.json
   ({ v, title, date, cap, gap, gain, turnout, now: [[name, type, openSec, fill]], order: [[name, type]], rows: [[name, type, K, marchesNow]], src, by, at }).
   An admin pastes that JSON once (📥 Update data) — it is sealed in the browser with the officer data key and saved through GitHub. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const PATH = "data/bearplan-x7k2p9.json";
const T = {
  en: { eyebrow: "Bear Trap 2 · discussion draft", h1: "BT2 Rally Plan", lead: "What one wave looked like on Oct 31, and what it could look like with fewer, stronger rallies. Nothing here is decided. It is a picture to talk about.",
    title: "🐻 Bear plan", intro: "Discussion draft: one Bear wave now vs. fewer, stronger rallies. Nothing here is decided.",
    s1k: "Rallies open at once", s1s: "follows turnout: about {cap} marches per rally", s2k: "Strongest rallies filled", s2s: "always; only the last rally changes with turnout",
    s3k: "Estimated damage per wave", s3s: "usual turnout ({n} marches), same people and troops",
    tlh: "One wave, side by side", tlp: "Each bar is one rally's 5-minute gather; the number is how full it was. Now: open times are rebuilt from screenshot countdowns (±10 s). Proposed: switch turnout to see what changes.",
    scLabel: "Turnout:", sc: ["Fewer (~{n} marches)", "Usual (~{n}, Oct 31)", "More (~{n})"], tMain: "Main leader", tSecond: "Second choice", tWeak: "Better as a joiner", tEmpty: "Empty space",
    rNow: "{d} (now)", rNew: "Proposed", axis: "seconds after the first rally opens",
    whyh: "Where the gain comes from", whyp: "A march scores about leader strength × √troops. The leader matters far more than how full the rally is. A weak rally gets roughly a quarter of the damage per march that a main rally gets, and its leader's own archers sit there for 5 minutes. Moving those marches into stronger rallies is the whole gain.",
    cols: ["Leader", "Type", "Leader strength K", "Marches now", "Proposed"],
    whyfoot: "K comes from rally mails. Values marked * are estimates from MightPulse Widget levels, not from mails yet. The Proposed column follows the turnout picked above.",
    chh: "What would change",
    ch: ["Leaders open in a fixed order, strongest first: {order}. Each rally fills before people move to the next.",
      "The number of rallies follows turnout instead of a fixed list: about {a} when fewer come, {b} on a usual day, {c} when more come. Only the last rally is ever partly empty, and that is where late arrivals go.",
      "Main rallies open first, about {gap} s apart, timed by the bear countdown everyone sees (e.g. \"open at 29:50, 29:35…\").",
      "Everyone else joins. That includes people with good archers who are weaker as leaders: their archers do about 3–4× more in a main rally.",
      "Full-cap marches go to main rallies. Small leftover marches go to rallies that still have open slots.",
      "Joiners with Amane / Yeonwoo / Chenko as first hero go to the later rallies, which most often miss joiner skills.",
      "The 6:30 rule stays as it is."],
    unh: "What we don't know yet",
    un: ["{est} had no mails this wave, so their K is estimated. With pessimistic values the gain is at the low end of {gain}; with the middle values, at the high end.",
      "The model assumes each player can reach any rally they are not leading (5–6 join marches each, 6–8 rallies). The leaders need to watch the list and open the next rally once the current last one is nearly full.",
      "Hero skills that roll per fight add ±10–15% noise to any single wave, so one test wave won't prove it. Two or three waves would."],
    b1eye: "Bear Trap 1 · for comparison", b1h: "BT1: enough people, different problem",
    b1p: "BT1 fills about 11 rallies every wave and its strong rallies fill in 20–45 seconds. Cutting rallies would not help there. What it loses is inside the rallies.",
    sc1: ["People on the leaderboard", "Total damage", "Average per person", "One wave"],
    b1lh: "BT1 leaders by archer strength", b1lp: "Archer (1 + attack)(1 + lethality) from each rally's bonus page. ★ = on the BT1 leader list. Dashed lines: BT2's two strongest, for scale. BT1 had no rally mails, so these are stats, not measured K.",
    b1xh: "Where BT1 loses damage", b1dh: "What could help BT1",
    foot: "Data: {src}", none: "No data yet. An admin adds it once with 📥 Update data below.", locked: "🔒 Log in first.",
    impT: "📥 Update data (admins)", impNote: "Paste the plan JSON (from the analysis chat). It is encrypted in this browser and saved for officers only.", impSave: "Encrypt & save",
    impOk: "✅ Saved — everyone with this tab sees it in a minute.", impBad: "⚠️ That isn't the plan JSON (needs now, order and rows).", impErr: "⚠️ Not saved: ", noTok: "⚠️ Saving needs the officer GitHub key (admin login)." },
  zh: { eyebrow: "陷阱 2 · 討論草稿", h1: "BT2 集結規劃", lead: "10/31 其中一波實際的樣子，以及改成「少一點、強一點的團」之後可能的樣子。這裡什麼都還沒決定，只是拿來討論的圖。",
    title: "🐻 熊獵規劃", intro: "討論草稿：現在的一波 vs. 少一點、強一點的團。這裡什麼都還沒決定。",
    s1k: "同時開的團數", s1s: "跟著人數走：大約每 {cap} 支部隊一團", s2k: "最強的團填滿率", s2s: "一定滿；只有最後一團隨人數變",
    s3k: "每波傷害估計", s3s: "一般人數（{n} 支部隊），同樣的人和兵",
    tlh: "同一波，前後對照", tlp: "每條是一團 5 分鐘的集結時間，數字是填滿率。現況的開團時間是從截圖倒數推回來的（±10 秒）。建議版可以切換人數看看差別。",
    scLabel: "參加人數：", sc: ["少一點（約 {n} 支）", "一般（約 {n} 支，10/31）", "多一點（約 {n} 支）"], tMain: "主力隊長", tSecond: "次選", tWeak: "比較適合加入", tEmpty: "空的位置",
    rNow: "{d}（現況）", rNew: "建議", axis: "第一團開團後經過的秒數",
    whyh: "多出來的分數從哪裡來", whyp: "每支部隊的分數大約是「隊長強度 × √兵數」，隊長的影響遠大於團有沒有滿。弱的團每支部隊大概只拿到主力團的 1/4，隊長自己的弓兵也被綁 5 分鐘。把這些部隊移到強的團，就是全部的差別。",
    cols: ["隊長", "類型", "隊長強度 K", "現在部隊數", "建議"],
    whyfoot: "K 來自集結信件。標 * 的是用 MightPulse 零件等級估的，還沒有信件。「建議」欄跟著上面選的人數變。",
    chh: "會改變的地方",
    ch: ["隊長照固定順序開，強的先：{order}。前一團滿了才往下一團。",
      "團數跟著人數走，不是固定名單：人少約 {a} 團、一般 {b} 團、人多 {c} 團。只有最後一團可能沒滿，晚到的人就進那一團。",
      "主力團先開，每團隔約 {gap} 秒，用大家都看得到的熊倒數來喊（例如「熊剩 29:50、29:35 開」）。",
      "其他人都加入，包括弓兵不錯但不適合當隊長的人：他們的弓兵在主力團大約多打 3–4 倍。",
      "帶滿上限的部隊進主力團；零頭部隊進還有空位的團。",
      "第一位英雄是雨音／妍羽／琴科的加入者，優先去比較晚開的團，那裡最常湊不滿加入者技能。",
      "剩 6:30 才能開團的規定不變。"],
    unh: "還不知道的",
    un: ["{est} 這波沒有信件，K 是估的。用保守值算是 {gain} 的低標，用中間值是高標。",
      "模型假設每個人都進得了自己沒帶的團（每人 5–6 條加入隊列、6–8 團）。隊長要看列表，最後一團快滿了，下一位才開。",
      "英雄機率技能讓單一波的分數有 ±10–15% 的運氣，所以試一波證明不了，要試 2–3 波。"],
    b1eye: "陷阱 1 · 對照", b1h: "BT1：人夠多，問題不一樣",
    b1p: "BT1 每波都撐得起約 11 團，強團 20–45 秒就滿，減團幫不上忙。它的損失在團裡面。",
    sc1: ["上榜人數", "總分", "平均每人", "一波"],
    b1lh: "BT1 隊長弓兵強度", b1lp: "弓兵 (1+攻擊)(1+殺傷)，取自各團集結加成頁。★ = BT1 隊長名單上的人。虛線是 BT2 最強的兩位，當作比例尺。BT1 沒有集結信件，所以這是屬性，不是實測的 K。",
    b1xh: "BT1 的損失在哪裡", b1dh: "BT1 可以改善的方向",
    foot: "資料：{src}", none: "還沒有資料。管理員在下面的 📥 更新資料 加一次就好。", locked: "🔒 請先登入。",
    impT: "📥 更新資料（管理員）", impNote: "貼上規劃的 JSON（分析聊天給的）。會在這個瀏覽器加密，只有幹部看得到。", impSave: "加密並儲存",
    impOk: "✅ 已儲存——有這個分頁的人大約一分鐘後就看得到。", impBad: "⚠️ 這不是規劃的 JSON（需要 now、order、rows）。", impErr: "⚠️ 沒有存到：", noTok: "⚠️ 儲存需要幹部的 GitHub 金鑰（管理員登入）。" },
};
let lang = OFFICER.lang === "zh" ? "zh" : "en", D = null, N = null, msg = "";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const tier = (k) => t({ main: "tMain", second: "tSecond", weak: "tWeak" }[k] || "tWeak");
function plan(n) { const out = []; let r = n; const cap = D.cap || 14, gap = D.gap || 15;
  D.order.forEach(([nm, ty], i) => { if (r <= 0) return; const m = Math.min(cap, r); out.push([nm, ty, i * gap, m / cap, m]); r -= m; }); return out; }
const css = (v) => { const el = document.querySelector("#pg-bearplan .bpx") || $("pg-bearplan"); return getComputedStyle(el).getPropertyValue(v).trim(); };
const FB = "IBM Plex Sans,Noto Sans TC,sans-serif", FM = "IBM Plex Mono,monospace";
/* the look follows the "BT2 Rally Plan" page (claude/bear-optimizer-demo.html) — same layout, fonts, colours and charts */
function svg() {
  const W = 820, left = 104, right = 12, rowH = 20, gap = 5, max = 420, x = (s) => left + (W - left - right) * s / max;
  const NEW = plan(N), y1 = 26, h1 = D.now.length * (rowH + gap), y2 = y1 + h1 + 40, h2 = Math.max(NEW.length, D.order.length) * (rowH + gap), H = y2 + h2 + 34;
  const c = { fg: css("--fg"), mu: css("--muted"), ln: css("--line"), idle: css("--idle"), main: css("--main"), second: css("--second"), weak: css("--weak") };
  let o = "";
  for (let s = 0; s <= max; s += 60) o += `<line x1="${x(s)}" x2="${x(s)}" y1="${y1 - 8}" y2="${H - 26}" stroke="${c.ln}" stroke-width="1"/><text x="${x(s)}" y="${H - 10}" fill="${c.mu}" font-size="11" text-anchor="middle" font-family="${FM}">${s / 60}:00</text>`;
  o += `<text x="${W - right}" y="${H - 10}" fill="${c.mu}" font-size="11" text-anchor="end" font-family="${FB}">${esc(t("axis"))}</text>`;
  const block = (data, y0, label) => { o += `<text x="0" y="${y0 - 10}" fill="${c.fg}" font-size="13" font-weight="600" font-family="${FB}">${esc(label)}</text>`;
    data.forEach(([n, ty, st, f], i) => { const y = y0 + i * (rowH + gap), x0 = x(st), w = x(st + 300) - x0, lab = Math.round(f * 100) + "%", inside = w * f > 44;
      o += `<text x="${left - 8}" y="${y + rowH / 2 + 4}" fill="${c.fg}" font-size="12" text-anchor="end" font-family="${FB}">${esc(n)}</text><rect x="${x0}" y="${y}" width="${w}" height="${rowH}" rx="3" fill="${c.idle}" stroke="${c.ln}"/>
        <rect x="${x0}" y="${y}" width="${w * f}" height="${rowH}" rx="3" fill="${c[ty] || c.weak}"/><text x="${inside ? x0 + w * f - 6 : x0 + w * f + 6}" y="${y + rowH / 2 + 4}" fill="${inside ? "#fff" : c.mu}" font-size="11" text-anchor="${inside ? "end" : "start"}" font-family="${FM}">${lab}</text>`; }); };
  const TO = D.turnout || [75, 94, 110], si = TO.indexOf(N);
  block(D.now, y1, fill(t("rNow"), { d: D.date || "" })); block(NEW, y2, `${t("rNew")} · ${fill(t("sc")[si < 0 ? 1 : si], { n: N })}`);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Rally timeline">${o}</svg>`;
}
function bars(B, ref) {   // 🐻 BT1: leaders by archer strength, BT2's strongest as dashed lines
  const W = 820, left = 104, right = 40, rh = 18, g = 6, max = Math.max(40, ...B.map((b) => b[2]));
  const x = (v) => left + (W - left - right) * v / max, H = B.length * (rh + g) + 30;
  const c = { fg: css("--fg"), mu: css("--muted"), ln: css("--line"), main: css("--main"), second: css("--second"), weak: css("--weak") };
  let o = "";
  for (let v = 0; v <= max; v += 10) o += `<line x1="${x(v)}" x2="${x(v)}" y1="0" y2="${H - 22}" stroke="${c.ln}"/><text x="${x(v)}" y="${H - 6}" fill="${c.mu}" font-size="11" text-anchor="middle" font-family="${FM}">${v}</text>`;
  (ref || []).forEach(([n, v]) => { o += `<line x1="${x(v)}" x2="${x(v)}" y1="0" y2="${H - 22}" stroke="${c.fg}" stroke-dasharray="3 3" opacity=".5"><title>${esc(n)}</title></line>`; });
  B.forEach(([n, ty, v, on], i) => { const y = i * (rh + g);
    o += `<text x="${left - 8}" y="${y + rh / 2 + 4}" fill="${c.fg}" font-size="12" text-anchor="end" font-family="${FB}">${on ? "★ " : ""}${esc(n)}</text><rect x="${left}" y="${y}" width="${x(v) - left}" height="${rh}" rx="3" fill="${c[ty] || c.weak}"/>
      <text x="${x(v) + 6}" y="${y + rh / 2 + 4}" fill="${c.mu}" font-size="11" font-family="${FM}">${(+v).toFixed(1)}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="BT1 leaders">${o}</svg>`;
}
const legend = (empty) => `<div class="legend">${["main", "second", "weak"].map((k) => `<span><i class="sw" style="background:var(--${k})"></i><span>${esc(tier(k))}</span></span>`).join("")}${empty ? `<span><i class="sw" style="background:var(--idle);border:1px solid var(--line)"></i><span>${esc(t("tEmpty"))}</span></span>` : ""}</div>`;
function bt1Html() {
  const b = D.bt1; if (!b) return "";
  const L = (o) => o ? (o[lang] || o.en || []) : [];
  const li = (arr) => arr.map((s) => `<li>${esc(s)}</li>`).join("");
  return `<section class="bt1"><div class="eyebrow">${esc(t("b1eye"))}</div><h2>${esc(t("b1h"))}</h2><p>${esc(t("b1p"))}</p>
      <div class="tbl"><table><thead><tr><th></th><th class="n">BT1</th><th class="n">BT2</th></tr></thead>
      <tbody>${t("sc1").map((k, i) => { const v = (L(b.scale)[i]) || ["–", "–"]; return `<tr><td>${esc(k)}</td><td class="n">${esc(v[0])}</td><td class="n">${esc(v[1])}</td></tr>`; }).join("")}</tbody></table></div></section>
    ${b.leaders ? `<section><h2>${esc(t("b1lh"))}</h2><p class="muted">${esc(t("b1lp"))}</p><div class="chart">${bars(b.leaders, b.ref)}</div></section>` : ""}
    ${L(b.loss).length ? `<section><h2>${esc(t("b1xh"))}</h2><ul class="notes">${li(L(b.loss))}</ul></section>` : ""}
    ${L(b.dir).length ? `<section><h2>${esc(t("b1dh"))}</h2><ul class="notes">${li(L(b.dir))}</ul></section>` : ""}`;
}
function importBox() {
  if (!(OFFICER.isAdmin && OFFICER.isAdmin())) return "";
  return `<details class="bp-imp"${D ? "" : " open"}><summary><b>${esc(t("impT"))}</b></summary><p class="muted" style="font-size:12.5px;margin:6px 0">${esc(t("impNote"))}</p>
    <textarea id="bp_json" rows="6" style="width:100%;box-sizing:border-box;font:12px ui-monospace,monospace"></textarea>
    <div class="row" style="margin-top:6px;gap:8px;align-items:center"><button class="btn primary" id="bp_save">${esc(t("impSave"))}</button><span class="msg" id="bp_msg">${esc(msg)}</span></div></details>`;
}
function head() {
  return `<header><div class="top"><div class="eyebrow">${esc(t("eyebrow"))}</div>
    <div class="lang" role="group" aria-label="Language">${["en", "zh"].map((l) => `<button type="button" data-bpl="${l}" aria-pressed="${lang === l}">${l === "en" ? "EN" : "中文"}</button>`).join("")}</div></div>
    <h1 id="bp_title">${esc(t("h1"))}</h1><p class="lead">${esc(t("lead"))}</p></header>`;
}
function render() {
  const root = $("bp_root"); if (!root) return;
  if (!D) { root.innerHTML = `<div class="bpx">${head()}<p class="muted">${esc(t("none"))}</p>${importBox()}</div>`; bind(); return; }
  const TO = D.turnout || [75, 94, 110]; if (N == null) N = TO[1];
  const counts = TO.map((n) => plan(n).length), P = {}; plan(N).forEach((p) => { P[p[0]] = p[4]; });
  const est = D.rows.filter((r) => /\*/.test(String(r[2]))).map((r) => r[0]);
  const items = (arr, v) => arr.map((s) => `<li>${esc(fill(s, v))}</li>`).join("");
  const v = { order: D.order.map((o) => o[0]).join(", "), a: counts[0], b: counts[1], c: counts[2], gap: D.gap || 15, est: est.join(", ") || "—", gain: D.gain || "", cap: D.cap || 14, n: TO[1], src: D.src || "" };
  root.innerHTML = `<div class="bpx">${head()}
    <div class="stats">
      <div class="stat"><span class="k">${esc(t("s1k"))}</span><span class="v">${D.now.length} → ${Math.min(...counts)}–${Math.max(...counts)}</span><span class="s">${esc(fill(t("s1s"), v))}</span></div>
      <div class="stat"><span class="k">${esc(t("s2k"))}</span><span class="v">100%</span><span class="s">${esc(t("s2s"))}</span></div>
      <div class="stat"><span class="k">${esc(t("s3k"))}</span><span class="v"><b>${esc(D.gain || "—")}</b></span><span class="s">${esc(fill(t("s3s"), v))}</span></div></div>
    <section><h2>${esc(t("tlh"))}</h2><p class="muted">${esc(t("tlp"))}</p>${legend(true)}
      <div class="scen" role="group" aria-label="Turnout"><span class="muted">${esc(t("scLabel"))}</span>${TO.map((n, i) => `<button type="button" data-bpn="${n}" aria-pressed="${n === N}">${esc(fill(t("sc")[i], { n }))}</button>`).join("")}</div>
      <div class="chart">${svg()}</div></section>
    <section><h2>${esc(t("whyh"))}</h2><p>${esc(t("whyp"))}</p>
      <div class="tbl"><table><thead><tr>${t("cols").map((c, i) => `<th${i > 1 ? ' class="n"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${D.rows.map((r) => `<tr><td dir="auto">${esc(r[0])}</td><td><span class="pill ${esc(r[1])}">${esc(tier(r[1]))}</span></td><td class="n">${esc(String(r[2]))}</td><td class="n">${r[3]}</td><td class="n">${P[r[0]] || "–"}</td></tr>`).join("")}</tbody></table></div>
      <p class="muted">${esc(t("whyfoot"))}</p></section>
    <section><h2>${esc(t("chh"))}</h2><ul class="notes">${items(t("ch"), v)}</ul></section>
    <section><h2>${esc(t("unh"))}</h2><ul class="notes">${items(t("un"), v)}</ul></section>
    ${bt1Html()}
    <footer>${esc(fill(t("foot"), v))}</footer>${importBox()}</div>`;
  bind();
}
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
function bind() {
  document.querySelectorAll("[data-bpn]").forEach((b) => b.onclick = () => { N = +b.dataset.bpn; render(); });
  document.querySelectorAll("[data-bpl]").forEach((b) => b.onclick = () => { lang = b.dataset.bpl; render(); });   // this page's own EN / 中文 switch, like the original
  const sv = $("bp_save"); if (!sv) return;
  sv.onclick = async () => {
    const m = $("bp_msg"); let d = null;
    try { d = JSON.parse($("bp_json").value); } catch (e) {}
    if (!d || !Array.isArray(d.now) || !Array.isArray(d.order) || !Array.isArray(d.rows)) { m.textContent = t("impBad"); return; }
    if (!OFFICER.token) { m.textContent = t("noTok"); return; }
    sv.disabled = true; m.textContent = "⏳";
    try {
      d.v = 1; d.by = (OFFICER.user && OFFICER.user.name) || ""; d.at = new Date().toISOString();
      let sha; try { const f = await OFFICER.gh("GET", PATH, null, OFFICER.token); sha = f ? f.sha : undefined; } catch (e) {}
      await OFFICER.gh("PUT", PATH, { message: "🐻 Bear plan data (encrypted)", content: u8b64(JSON.stringify(await OfficerData.seal(d), null, 1) + "\n"), sha, branch: "main" }, OFFICER.token);
      D = d; N = null; msg = t("impOk"); render();
    } catch (e) { m.textContent = t("impErr") + (e && e.message || e); sv.disabled = false; }
  };
}
async function init() {
  render();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("bp_root").innerHTML = `<div class="bpx"><p class="muted">${esc(t("locked"))}</p></div>`; return; }
  try { const d = await OfficerData.fetchJson(PATH); if (d && Array.isArray(d.now)) D = d; } catch (e) {}
  render();
}
function applyTexts() {}
function setLang(l) { lang = l === "zh" ? "zh" : "en"; render(); }
OFFICER_PAGES.bearplan = { init, applyTexts, setLang, onShow: () => { if (D) render(); } };
})();
