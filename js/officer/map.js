/* NXS officer page — map tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.map) */
/* ===== Map tab: Kingdom #2189 buildings (data/kingdom-map.js). Map labels and building names stay in English. ===== */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
let lang = OFFICER.lang, G, TY = {}, B = [], BY = {}, SEL = null, Z = 1;
const hidden = new Set();
const T = (k) => { const v = G.ui[k]; return Array.isArray(v) ? v.map((x) => x[lang] || x.en) : (v[lang] || v.en); };
/* Chinese names = the in-game 據點爭奪 screen; every other language uses the English names */
const ZH = () => lang === "en" ? null : G[lang] || null;   // localized building names (zh / pt / ar)
const typeName = (k) => ZH() ? ZH().types[k][0] : TY[k].n;
const buffName = (k) => ZH() ? ZH().types[k][1] : TY[k].b;
const castleName = () => ZH() ? ZH().castle : "King's Castle";
const hqName = (b) => b && b.n === 2 ? (ZH() && ZH().hq2 || "Badland HQ") : ZH() ? ZH().hq : "Plains HQ";   // our two HQs: Plains (1) and Badland (2)
const nm = (b) => b.kind === "outpost" ? typeName(b.t) : b.kind === "castle" ? castleName() : b.kind === "hq" ? hqName(b)
  : ZH() ? ZH()[b.kind].replace("{n}", b.n) : (b.kind === "fortress" ? "Fortress " : "Sanctuary ") + b.n;

/* screen right = X−Y, up = X+Y — same direction as the in-game World map */
const W = 1320, CX = W / 2, CY = 450, KX = .55, KY = .355;
const P = (x, y) => [CX + (x - y) * KX, CY - ((x + y) - 1200) * KY];
const pts = (c) => c.map(([x, y]) => P(x, y).map((v) => v.toFixed(1)).join(",")).join(" ");

function build() {
  G.types.forEach(([k, n, b, c]) => TY[k] = { n, b, c });
  B.push({ id: "k", kind: "castle", name: "King's Castle", x: G.castle[0], y: G.castle[1] });
  (G.hq || []).forEach(([x, y], i) => B.push({ id: "h" + i, kind: "hq", n: i + 1, name: i ? "Badland HQ" : "Plains HQ", x, y }));   // our [NXS] alliance HQ
  G.fortress.forEach(([x, y], i) => B.push({ id: "f" + (i + 1), kind: "fortress", name: "Fortress " + (i + 1), short: "F" + (i + 1), n: i + 1, x, y }));
  G.sanctuary.forEach(([x, y], i) => B.push({ id: "s" + (i + 1), kind: "sanctuary", name: "Sanctuary " + (i + 1), short: "S" + (i + 1), n: i + 1, x, y }));
  G.outposts.forEach(([t, lv, x, y], i) => B.push({ id: "o" + i, kind: "outpost", t, lv, x, y, name: TY[t].n, buff: G.buff[t][lv] }));
  B.forEach((b) => BY[b.id] = b);
}
function drawMap() {
  const s = [];
  s.push(`<polygon points="${pts([[0, 0], [1200, 0], [1200, 1200], [0, 1200]])}" fill="#567d33" stroke="#3a5a20" stroke-width="3"/>`);
  s.push(`<polygon points="${pts([[200, 200], [1000, 200], [1000, 1000], [200, 1000]])}" fill="#628c3b" stroke="rgba(255,255,255,.2)" stroke-width="2" stroke-dasharray="8 8"/>`);
  s.push(`<polygon points="${pts([[320, 320], [880, 320], [880, 880], [320, 880]])}" fill="#6f9a45" stroke="rgba(255,255,255,.2)" stroke-width="2" stroke-dasharray="8 8"/>`);
  /* 🛰️ territory picture: the in-game map stitched from officers' screenshots (2026-10-15), lined up on the 4 Fortresses */
  s.push(`<image id="km_terr" href="${TERR.src}" xlink:href="${TERR.src}" width="4000" height="2850" preserveAspectRatio="none" transform="matrix(${TERR.m})" opacity=".95"${terrOn ? "" : ' style="display:none"'}/>`);
  for (const b of B) {
    const [X, Y] = P(b.x, b.y);
    const g = `<g class="mk" style="transform-origin:${X}px ${Y}px" data-id="${b.id}" data-t="${b.kind === "outpost" ? b.t : b.kind === "hq" ? "hq" : "ruins"}" tabindex="0" role="button" aria-label="${esc(b.name)} X${b.x} Y${b.y}">`;
    if (b.kind === "outpost") s.push(`${g}<rect x="${X - 12}" y="${Y - 12}" width="24" height="24" rx="6" fill="${TY[b.t].c}" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#fff">${b.lv}</text></g>`);
    else if (b.kind === "sanctuary") s.push(`${g}<circle cx="${X}" cy="${Y}" r="15" fill="#eef2f6" stroke="#2a3340" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#2a3340">${b.n}</text><text class="lbl" x="${X}" y="${Y - 21}" text-anchor="middle" font-size="13">${b.short}</text></g>`);
    else if (b.kind === "fortress") s.push(`${g}<rect x="${X - 16}" y="${Y - 16}" width="32" height="32" rx="5" transform="rotate(45 ${X} ${Y})" fill="#7a4a24" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#fff">${b.n}</text><text class="lbl" x="${X}" y="${Y - 26}" text-anchor="middle" font-size="14">${b.short}</text></g>`);
    else if (b.kind === "hq") s.push(`${g}<path d="M${X - 15} ${Y - 14}h30v16c0 9-8 14-15 17c-7-3-15-8-15-17z" fill="#2b6cc4" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="11" font-weight="800" fill="#fff">HQ</text><text class="lbl km-hqLbl" data-n="${b.n}" x="${X}" y="${Y - 22}" text-anchor="middle" font-size="13">[NXS] ${esc(hqName(b))}</text></g>`);
    else s.push(`${g}<circle cx="${X}" cy="${Y}" r="26" fill="#f2c33d" stroke="#fff" stroke-width="3"/><text x="${X}" y="${Y + 9}" text-anchor="middle" font-size="25">👑</text><text class="lbl" id="km_castleLbl" x="${X}" y="${Y + 46}" text-anchor="middle" font-size="16">King's Castle</text></g>`);
  }
  s.push(`<image id="km_obst" width="${FN}" height="${FN}" preserveAspectRatio="none" transform="matrix(${KX} ${-KY} ${-KX} ${-KY} ${CX} ${CY + 1200 * KY})" style="display:none;image-rendering:pixelated;pointer-events:none"/>`);
  s.push(`<g id="km_otG" style="pointer-events:none"></g><g id="km_exG" style="pointer-events:none"></g><g id="km_planG" style="pointer-events:none"></g><g id="km_flagG" style="pointer-events:none"></g><g id="km_sel"></g>`);
  $("km_svg").innerHTML = s.join("");
  $("km_svg").querySelectorAll(".mk").forEach((m) => {
    m.addEventListener("click", (e) => { if (!mkFar(e, m)) select(m.dataset.id, false); });
    m.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(m.dataset.id, false); } });
  });
}
let planOnly = false;
const TERR = { src: "data/territory-2189.webp?v=20",   /* bump ?v= when the picture changes (images are cached first by sw.js) */ m: "0.336526 -0.001286 -0.000211 0.305687 -12.768 21.275", date: "2026-10-15" };
const TT = { zh: ["🛰️ 領地圖", "領地圖：幹部截圖拼成，同色塊 = 同一個聯盟的領地（{d} 截圖）。"],
  en: ["🛰️ Territory", "Territory: stitched from officers' screenshots; same colour = same alliance ({d})."],
  pt: ["🛰️ Território", "Território: montado com capturas dos oficiais; mesma cor = mesma aliança ({d})."],
  ko: ["🛰️ 영토", "영토: 간부 스크린샷을 이어 붙임, 같은 색 = 같은 연맹 ({d})."],
  ar: ["🛰️ الأراضي", "الأراضي: مجمّعة من لقطات الضباط؛ اللون نفسه = التحالف نفسه ({d})."] };
const tt = (i) => (TT[lang] || TT.en)[i].replace("{d}", TERR.date);
let terrOn = (() => { try { return localStorage.getItem("km-terr") !== "0"; } catch (e) { return true; } })();
function setTerr(on) {
  terrOn = on; try { localStorage.setItem("km-terr", on ? "1" : "0"); } catch (e) {}
  const im = $("km_terr"); if (im) im.style.display = on ? "" : "none";
  $("km_svg").classList.toggle("terr", on); renderLayers();
}
const applyHidden = () => {
  const off = new Set();
  $("km_svg").querySelectorAll(".mk").forEach((m) => { const b = BY[m.dataset.id];
    const o = m.dataset.id !== SEL && (hidden.has(m.dataset.t) || (planOnly && b.kind === "outpost" && !st(b))); m.classList.toggle("off", o); if (o) off.add(m.dataset.id); });
  // the plan rings and ★ tags of a filtered-out building go away with it
  $("km_svg").querySelectorAll(".pl-mk").forEach((r) => r.classList.toggle("off", off.has(r.dataset.id)));
};

/* zoom: 100% wide at 1; phones start zoomed in so the level numbers are readable */
/* ax, ay = the point (inside the map box) that stays put — the mouse when zooming with the wheel, else the middle */
function setZoom(z, keep, ax, ay) {
  const box = $("km_box"), svg = $("km_svg"), old = svg.clientWidth || 1;
  if (ax == null) { ax = box.clientWidth / 2; ay = box.clientHeight / 2; }
  const cx = box.scrollLeft + ax, cy = box.scrollTop + ay;
  Z = Math.max(1, Math.min(24, z)); svg.style.width = (Z * 100) + "%";
  svg.style.setProperty("--mk", Z > 4 ? (4 / Z).toFixed(3) : 1);   // past ×4 the buildings stop growing, so tiles (🚩 banner plan) stay visible
  const k = svg.clientWidth / old;
  if (keep !== false) { box.scrollLeft = cx * k - ax; box.scrollTop = cy * k - ay; }
}
/* computer: mouse wheel (or trackpad pinch) zooms where the mouse is; drag with the mouse to move around */
function mouseControls() {
  const box = $("km_box");
  box.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = box.getBoundingClientRect(), d = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
    setZoom(Z * Math.exp(-d * (e.ctrlKey ? 0.01 : 0.0018)), true, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  let drag = null, moved = false;
  box.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, l: box.scrollLeft, t: box.scrollTop }; moved = false;
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    moved = true; box.classList.add("dragging");
    box.scrollLeft = drag.l - dx; box.scrollTop = drag.t - dy;
  });
  window.addEventListener("pointerup", () => { drag = null; box.classList.remove("dragging"); });
  // a drag that ends on a marker must not also select it
  box.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  touchControls(box);
}
/* phone: one finger scrolls the box (the browser does that); two fingers pinch to zoom around the point between them and move the map */
function touchControls(box) {
  let pinch = null;
  const mid = (t) => { const r = box.getBoundingClientRect(); return { x: (t[0].clientX + t[1].clientX) / 2 - r.left, y: (t[0].clientY + t[1].clientY) / 2 - r.top, d: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY) }; };
  box.addEventListener("touchstart", (e) => { if (e.touches.length === 2) { const m = mid(e.touches); pinch = { z: Z, d: m.d, x: m.x, y: m.y }; } }, { passive: true });
  box.addEventListener("touchmove", (e) => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    const m = mid(e.touches);
    setZoom(pinch.z * m.d / pinch.d, true, m.x, m.y);           // zoom so the point between the fingers stays put…
    box.scrollLeft -= m.x - pinch.x; box.scrollTop -= m.y - pinch.y;   // …then follow the fingers
    pinch.x = m.x; pinch.y = m.y;
  }, { passive: false });
  const end = (e) => { if (e.touches.length < 2) pinch = null; };
  box.addEventListener("touchend", end); box.addEventListener("touchcancel", end);
}
function centerOn(b, smooth) {
  const box = $("km_box"), [X, Y] = P(b.x, b.y), s = $("km_svg").clientWidth / W;
  box.scrollTo({ left: X * s - box.clientWidth / 2, top: Y * s - box.clientHeight / 2, behavior: smooth ? "smooth" : "auto" });
}

function select(id, fromList) {
  FSEL = null;
  SEL = id; const b = BY[id], [X, Y] = P(b.x, b.y);
  const r = b.kind === "castle" ? 34 : b.kind === "fortress" ? 28 : b.kind === "sanctuary" ? 22 : 20;
  $("km_sel").innerHTML = `<circle class="sel-ring" style="transform-origin:${X}px ${Y}px" cx="${X}" cy="${Y}" r="${r}"/>`
    + (b.kind === "outpost" ? (([x0, y0, x1, y1]) => `<polygon points="${pts([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]])}" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="1.5 1" style="pointer-events:none"/>`)(opSq(b)) : "");
  applyHidden(); renderInfo();
  document.querySelectorAll("#pg-map .chip").forEach((c) => c.classList.toggle("on", c.dataset.id === id));
  if (fromList) {
    const top = document.querySelector("#pg-map .km-card").getBoundingClientRect().top;
    if (top < 0 || top > innerHeight * .5) window.scrollTo({ top: scrollY + top - 12, behavior: "smooth" });
  }
  centerOn(b, true);
}
const ME = () => OFFICER.can("map", "edit");   // read-only officers can look at the plan but not change it
function renderInfo() {
  const b = SEL && BY[SEL];
  if (!b) { $("km_info").innerHTML = `<span class="muted">${esc(T("pick"))}</span>`; return; }
  const sw = b.kind === "outpost" ? `<span class="sw" style="background:${TY[b.t].c}"></span>` : "";
  const what = b.kind === "outpost" ? `Lv.${b.lv} · ${esc(buffName(b.t))} +${b.buff}%` : b.kind === "castle" ? "" : b.kind === "hq" ? "[NXS]" : esc(T("noBuff"));
  $("km_info").innerHTML = `${sw}<b>${esc(nm(b))}</b>${what ? `<span class="muted">${what}</span>` : ""}<span class="co">X:${b.x} Y:${b.y}</span><button type="button" class="btn" id="km_cp">${esc(T("copy"))}</button>` +
    (PLANNABLE(b) && ME() ? `<div class="km-st" style="flex-basis:100%">${(isOp(b) ? [["target", "target"], ["held", "held"], ["vuln", "vuln"], ["", "clear"]] : [["target", "target"], ["held", "heldR"], ["", "clear"]]).map(([v, k]) => `<button type="button" data-v="${v}" class="${eff(b) === v && v ? "on" : ""}">${esc(pt(k))}</button>`).join("")}</div>` : "") +
    (b.kind === "outpost" && (EXB || OTB) ? (() => { const c = contesters(b); return `<div class="km-tm" style="flex-basis:100%">${c.length ? `${esc(ft("cont"))} <b>${c.map((n) => `<span style="color:${n === "NXS" ? "#2b6cc4" : otCol(n)}">■</span> ${esc(n)}`).join("、")}</b>` : esc(ft("contNone"))}</div>`; })() : "") +
    (isOp(b) && st(b) === "conflict" ? `<div class="km-tm" style="flex-basis:100%;color:#c0473a">⚠️ ${esc(pt("conflictAuto"))}</div>` : "");
  const s = eff(b);
  if (isOp(b) && (s === "held" || s === "vuln")) {
    const n = nextSw(b);
    $("km_info").insertAdjacentHTML("beforeend", `<div class="km-tm" style="flex-basis:100%">
      <div>${n ? `⏱ <b>${esc(left(n - Date.now()))}</b> → ${esc(pt(s === "held" ? "toV" : "toP"))}` : `<span class="muted">${esc(pt("noT"))}</span>`}</div>
      ${ME() ? `<div class="km-tmin"><span class="muted" style="flex-basis:100%">${esc(pt(s === "held" ? "leftP" : "leftV"))}</span>
        <input id="tm_d" type="number" min="0" max="9" inputmode="numeric">${esc(pt("dd"))}<input id="tm_h" type="number" min="0" max="23" inputmode="numeric">${esc(pt("hh"))}<input id="tm_m" type="number" min="0" max="59" inputmode="numeric">${esc(pt("mm"))}
        <button type="button" class="btn" id="tm_set">${esc(pt("setT"))}</button>${n ? `<button type="button" class="btn" id="tm_clr">${esc(pt("clrT"))}</button>` : ""}</div>` : ""}</div>`);
    if ($("tm_set")) $("tm_set").onclick = () => {
      const v = (id) => Math.max(0, parseInt($(id).value, 10) || 0), ms = ((v("tm_d") * 24 + v("tm_h")) * 60 + v("tm_m")) * 6e4;
      if (!ms) return;
      PLAN.o[pk(b)] = s; PLAN.t[pk(b)] = Date.now() + ms; planMsg = ""; refreshPlan();
    };
    if ($("tm_clr")) $("tm_clr").onclick = () => { PLAN.o[pk(b)] = s; delete PLAN.t[pk(b)]; planMsg = ""; refreshPlan(); };
  }
  else if (isOp(b) && ME()) $("km_info").insertAdjacentHTML("beforeend", `<div class="km-tm muted" style="flex-basis:100%">⏱ ${esc(pt("tmHint"))}</div>`);
  if (PRIOABLE(b) && !ME()) {
    const sp = SP(b);
    if (sp.p || sp.r || sp.n) $("km_info").insertAdjacentHTML("beforeend", `<div class="km-pr" style="flex-basis:100%"><div class="km-prh"><b>${esc(pt("prio"))}</b><span>${sp.p ? "★" + sp.p : esc(pt("prioNone"))}</span></div>${sp.r ? `<div class="muted" style="font-size:12.5px">${esc(pt("rewards"))}: ${esc(sp.r)}</div>` : ""}${sp.n ? `<div class="muted" style="font-size:12.5px">${esc(pt("note"))}: ${esc(sp.n)}</div>` : ""}</div>`);
  }
  else if (PRIOABLE(b)) {
    const sp = SP(b), d = hqDist(b), max = B.filter(PRIOABLE).length;
    $("km_info").insertAdjacentHTML("beforeend", `<div class="km-pr" style="flex-basis:100%">
      <div class="km-prh"><b>${esc(pt("prio"))}</b>${d != null ? `<span class="muted">📏 ${esc(pt("dist").replace("{n}", d))}</span>` : ""}</div>
      <div class="km-prn">${Array.from({ length: max }, (_, i) => `<button type="button" data-p="${i + 1}" class="${sp.p === i + 1 ? "on" : ""}">${i + 1}</button>`).join("")}<button type="button" data-p="" class="${sp.p ? "" : "on"}">${esc(pt("prioNone"))}</button></div>
      <label class="km-prf">${esc(pt("rewards"))}<textarea id="sp_r" rows="2" maxlength="300" placeholder="${esc(pt("rewardsPh"))}">${esc(sp.r || "")}</textarea></label>
      <label class="km-prf">${esc(pt("note"))}<input id="sp_n" maxlength="120" placeholder="${esc(pt("notePh"))}" value="${esc(sp.n || "")}"></label></div>`);
    $("km_info").querySelectorAll(".km-prn button").forEach((x) => x.onclick = () => { setSP(b, "p", x.dataset.p ? +x.dataset.p : ""); refreshPlan(); });
    const save = (id, k) => { const el = $(id); el.onchange = () => { setSP(b, k, el.value.trim()); drawPlan(); renderList(); renderPlan(); }; };
    save("sp_r", "r"); save("sp_n", "n");
  }
  const spR = specialOf(b);
  if (spR) $("km_info").insertAdjacentHTML("beforeend", `<div class="km-tm" style="flex-basis:100%">🎁 ${esc(rt("special"))}: <b>${esc(iName(spR[0]))} ×${spR[1]}</b></div>`);
  $("km_info").querySelectorAll(".km-st button").forEach((x) => x.onclick = () => setStatus(b.id, x.dataset.v));
  $("km_cp").onclick = () => {
    const done = () => { const c = $("km_cp"); if (c) { c.textContent = T("copied"); setTimeout(() => { if ($("km_cp")) $("km_cp").textContent = T("copy"); }, 1500); } };
    try { navigator.clipboard.writeText(`X:${b.x} Y:${b.y}`).then(done, () => {}); } catch (e) {}
  };
}
const chip = (b) => `<button type="button" class="chip${b.id === SEL ? " on" : ""}" data-id="${b.id}">${PRIOABLE(b) && SP(b).p ? `<span class="km-prb sm">${SP(b).p}</span>` : ""}${st(b) ? `<span class="st">${st(b) === "held" ? "✅" : st(b) === "vuln" ? "⚔️" : st(b) === "conflict" ? "⚠️" : "🎯"}</span>` : ""}${b.short ? b.short + " · " : ""}X${b.x} Y${b.y}</button>`;
/* 🎁 Sanctuary Battle rewards (data/kingdom-map.js → rewards): one row per reward, the Fortresses / Sanctuaries that give it as chips,
   so it's easy to see which ones give the same thing. Item / chest names: the language given, else English. */
const RT = {
  zh: { k1: "① 擊敗叛軍後：全體聯盟成員拿「聯盟獎勵」，有參戰打叛軍的人另外拿「參與獎勵」，聯盟還會拿到一份「可分配獎勵」可以發給成員。", k2: "② 佔領成功後：全體聯盟成員拿「控制獎勵」。", k3: "③ 佔領成功後還有一份可以分配的「遺跡獎勵」——每座要塞 / 遺跡真正不同的就是這一份（下面每一行）。①② 的寶箱內容到處都一樣，只有數量不同。要塞和遺跡都是這三種。", title: "🎁 要塞與遺跡獎勵", note: "每座要塞 / 遺跡的「遺跡獎勵」不同（下面每一行）；勝利獎勵和控制獎勵的寶箱內容都一樣，只有數量不同。", same: "{k}的勝利獎勵與控制獎勵", part: "參與獎勵", ally: "聯盟獎勵", alloc: "可分配獎勵", control: "控制獎勵", special: "遺跡獎勵", power: "建議實力", gar: "守衛部隊數量" },
  en: { k1: "① After the rebels are defeated: every alliance member gets the Alliance Rewards, members who fought the rebels also get the Participation Rewards, and the alliance gets Allocatable Rewards to hand out.", k2: "② After a successful occupation: every alliance member gets the Control Rewards.", k3: "③ A successful occupation also gives extra Sanctuary Rewards to hand out — this is what really differs from one Fortress / Sanctuary to the next (one row each below). The chests in ① and ② hold the same items everywhere; only the number differs. Fortresses and Sanctuaries both work this way.", title: "🎁 Fortress & Sanctuary rewards", note: "Each Fortress / Sanctuary gives a different Sanctuary Reward (one row each below). Victory and Control chests hold the same items everywhere; only the number of chests differs.", same: "{k}: Victory & Control Rewards", part: "Participation Rewards", ally: "Alliance Rewards", alloc: "Allocatable Rewards", control: "Control Rewards", special: "Sanctuary Rewards", power: "Recommended Power", gar: "Garrisoned" },
  pt: { k1: "① Depois de derrotar os rebeldes: todos os membros da aliança ganham as Recompensas da Aliança, quem lutou contra os rebeldes ganha também as Recompensas de Participação, e a aliança recebe Recompensas Distribuíveis para entregar.", k2: "② Depois de ocupar com sucesso: todos os membros ganham as Recompensas de Controle.", k3: "③ A ocupação também dá Recompensas do Santuário extras para distribuir — é isso que realmente muda de uma Fortaleza / Santuário para outro (uma linha cada abaixo). Os baús de ① e ② têm os mesmos itens em todos; só muda a quantidade. Fortalezas e Santuários funcionam igual.", title: "🎁 Recompensas de Fortalezas e Santuários", note: "Cada Fortaleza / Santuário dá uma Recompensa do Santuário diferente (uma linha cada abaixo). Os baús de Vitória e de Controle têm os mesmos itens em todos; só muda a quantidade de baús.", same: "{k}: Recompensas de Vitória e de Controle", part: "Recompensas de Participação", ally: "Recompensas da Aliança", alloc: "Recompensas Distribuíveis", control: "Recompensas de Controle", special: "Recompensas do Santuário", power: "Poder Recomendado", gar: "Em guarnição" },
  ar: { k1: "① بعد هزيمة المتمردين: يحصل كل أعضاء التحالف على مكافآت التحالف، ومن قاتل المتمردين يحصل أيضًا على مكافآت المشاركة، ويحصل التحالف على مكافآت قابلة للتخصيص لتوزيعها.", k2: "② بعد الاحتلال بنجاح: يحصل كل الأعضاء على مكافآت التحكم.", k3: "③ الاحتلال يمنح أيضًا مكافآت مأوى إضافية للتوزيع — وهذا ما يختلف فعلًا من حصن / مأوى لآخر (سطر لكل منها أدناه). صناديق ① و② تحتوي العناصر نفسها في كل مكان؛ يختلف العدد فقط. الحصون والمآوي تعمل بالطريقة نفسها.", title: "🎁 مكافآت الحصون والمآوي", note: "كل حصن / مأوى يمنح مكافأة مأوى مختلفة (سطر لكل منها أدناه). صناديق النصر والتحكم تحتوي العناصر نفسها في كل مكان؛ يختلف عدد الصناديق فقط.", same: "{k}: مكافآت النصر والتحكم", part: "مكافآت المشاركة", ally: "مكافآت التحالف", alloc: "مكافآت قابلة للتخصيص", control: "مكافآت التحكم", special: "مكافآت المأوى", power: "القوة الموصى بها", gar: "سعة تدريب القوات" },
  ko: { k1: "① 반란군을 처치하면: 연맹원 전원이 「연맹 보상」, 반란군 전투에 참여한 사람은 「참여 보상」을 추가로 받고, 연맹은 나눠 줄 수 있는 「분배 가능 보상」을 받습니다.", k2: "② 점령에 성공하면: 연맹원 전원이 「점령 보상」을 받습니다.", k3: "③ 점령에 성공하면 나눠 줄 수 있는 「유적 보상」도 추가로 받습니다 — 성채 / 유적마다 실제로 다른 건 이것뿐입니다 (아래 한 줄씩). ①② 상자는 어디나 내용이 같고 수만 다릅니다. 성채와 유적 모두 같습니다.", title: "🎁 성채 · 유적 보상", note: "성채 / 유적마다 「유적 보상」이 다릅니다 (아래 한 줄씩). 승리 보상과 점령 보상 상자는 어디나 내용이 같고 상자 수만 다릅니다.", same: "{k}: 승리 보상 · 점령 보상", part: "참여 보상", ally: "연맹 보상", alloc: "분배 가능 보상", control: "점령 보상", special: "유적 보상", power: "추천 전투력", gar: "수비 부대 수량" },
};
const rt = (k) => (RT[lang] || RT.en)[k] ?? RT.en[k];
const iName = (id) => { const it = G.rewards.items[id]; return it ? it[lang] || it.en : id; };

/* ✏️ the rewards rotate between rounds: officers with ✏️ Map rights update them here (saved on the Worker, /rewards).
   The saved copy replaces the built-in one (data/kingdom-map.js); "Other" adds a reward by name. */
const RWE = {"zh": {"edit": "✏️ 更新獎勵", "title": "✏️ 更新這一輪的要塞與遺跡獎勵", "note": "獎勵每一輪都可能輪換。照遊戲裡「爭奪獎勵」的畫面，替每座要塞 / 遺跡選獎品、填數量。清單裡沒有的選「✍️ 其他」直接打名字。存了以後所有幹部都看得到。", "other": "✍️ 其他…", "otherPh": "獎品名稱（照遊戲裡的寫法）", "qty": "數量", "save": "儲存", "cancel": "取消", "saving": "儲存中…", "saved": "✅ 已存", "err": "存不進去：{e}", "last": "最後更新：{who} · {t}", "builtIn": "網站內建資料（{d}）"}, "en": {"edit": "✏️ Update rewards", "title": "✏️ Update this round's Fortress & Sanctuary rewards", "note": "The rewards can rotate every round. Following the in-game Battle Rewards screen, pick each Fortress / Sanctuary's reward and amount. Not in the list? Pick “✍️ Other” and type the name. Once saved, every officer sees it.", "other": "✍️ Other…", "otherPh": "Reward name (as written in the game)", "qty": "Amount", "save": "Save", "cancel": "Cancel", "saving": "Saving…", "saved": "✅ Saved", "err": "Couldn't save: {e}", "last": "Last update: {who} · {t}", "builtIn": "Built into the site ({d})"}, "pt": {"edit": "✏️ Atualizar recompensas", "title": "✏️ Atualizar as recompensas das Fortalezas e Santuários desta rodada", "note": "As recompensas podem mudar a cada rodada. Seguindo a tela Recompensas da Batalha do jogo, escolha a recompensa e a quantidade de cada Fortaleza / Santuário. Não está na lista? Escolha “✍️ Outro” e digite o nome. Depois de salvar, todos os oficiais veem.", "other": "✍️ Outro…", "otherPh": "Nome da recompensa (como está no jogo)", "qty": "Quantidade", "save": "Salvar", "cancel": "Cancelar", "saving": "Salvando…", "saved": "✅ Salvo", "err": "Não foi possível salvar: {e}", "last": "Última atualização: {who} · {t}", "builtIn": "Dados do site ({d})"}, "ar": {"edit": "✏️ تحديث المكافآت", "title": "✏️ تحديث مكافآت الحصون والمآوي لهذه الجولة", "note": "قد تتغير المكافآت في كل جولة. حسب شاشة مكافآت المعركة في اللعبة، اختر مكافأة كل حصن / مأوى وكميتها. إن لم تكن في القائمة فاختر «✍️ أخرى» واكتب الاسم. بعد الحفظ يراها كل الضباط.", "other": "✍️ أخرى…", "otherPh": "اسم المكافأة (كما في اللعبة)", "qty": "الكمية", "save": "حفظ", "cancel": "إلغاء", "saving": "جارٍ الحفظ…", "saved": "✅ تم الحفظ", "err": "تعذّر الحفظ: {e}", "last": "آخر تحديث: {who} · {t}", "builtIn": "بيانات الموقع ({d})"}, "ko": {"edit": "✏️ 보상 업데이트", "title": "✏️ 이번 회차 성채·유적 보상 업데이트", "note": "보상은 회차마다 바뀔 수 있어요. 게임의 「쟁탈 보상」 화면을 보고 성채 / 유적마다 보상과 수량을 고르세요. 목록에 없으면 「✍️ 기타」를 골라 이름을 입력하세요. 저장하면 모든 간부가 봐요.", "other": "✍️ 기타…", "otherPh": "보상 이름 (게임 표기대로)", "qty": "수량", "save": "저장", "cancel": "취소", "saving": "저장 중…", "saved": "✅ 저장됨", "err": "저장하지 못했어요: {e}", "last": "마지막 업데이트: {who} · {t}", "builtIn": "사이트 기본 데이터 ({d})"}};
const rwe = (k, v = {}) => String((RWE[lang] || RWE.en)[k] ?? RWE.en[k]).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
let RW_META = null;   // { by, at } of the officers' saved copy
const RW_BUILTIN = "2026-10-30";
async function rwApi(op, extra = {}) {
  const r = await fetch(AUTH_API + "/rewards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw new Error(j.error || "HTTP " + r.status);
  return j;
}
function rwApply(r) {
  if (!r || !r.special || !G.rewards) return;
  Object.assign(G.rewards.items, r.items || {});
  for (const k of ["fortress", "sanctuary"]) if (r.special[k] && Object.keys(r.special[k]).length) G.rewards[k].special = r.special[k];
  RW_META = { by: r.by, at: r.at };
}
async function loadRewards() { try { const j = await rwApi("get"); if (j.rewards) { rwApply(j.rewards); renderList(); renderInfo(); } } catch (e) {} }
function rwEdit() {
  const kinds = [["fortress", "◆", (ZH() ? ZH().fortressS : "Fortress")], ["sanctuary", "●", (ZH() ? ZH().sanctuaryS : "Sanctuary")]];
  const ids = Object.keys(G.rewards.items).sort((a, b) => iName(a).localeCompare(iName(b)));
  const opts = (sel) => ids.map((i) => `<option value="${esc(i)}"${i === sel ? " selected" : ""}>${esc(iName(i))}</option>`).join("") + `<option value="__other">${esc(rwe("other"))}</option>`;
  const rows = kinds.map(([k, sym, name]) => B.filter((b) => b.kind === k).sort((a, b) => a.n - b.n).map((b) => { const sp = G.rewards[k].special[b.n] || ["", ""];
    return `<div class="km-rwe" data-k="${k}" data-n="${b.n}"><b>${sym} ${esc(name)} ${b.n}</b><select class="inp">${opts(sp[0])}</select><input class="inp" type="number" min="0" value="${esc(sp[1])}" aria-label="${esc(rwe("qty"))}"><input class="inp km-rwo" type="text" placeholder="${esc(rwe("otherPh"))}" maxlength="80" hidden></div>`; }).join("")).join("");
  const m = document.createElement("div"); m.className = "km-modal";
  m.innerHTML = `<div class="card"><b>${esc(rwe("title"))}</b><div class="muted" style="font-size:12.5px;margin:6px 0 10px">${esc(rwe("note"))}</div>${rows}
    <div class="row" style="margin-top:10px;align-items:center;gap:8px"><button class="btn primary" data-save="1">${esc(rwe("save"))}</button><button class="btn" data-close="1">${esc(rwe("cancel"))}</button><span class="msg" data-msg="1"></span></div></div>`;
  $("pg-map").appendChild(m);
  m.addEventListener("change", (e) => { const row = e.target.closest(".km-rwe"); if (row && e.target.tagName === "SELECT") { const o = row.querySelector(".km-rwo"); o.hidden = e.target.value !== "__other"; if (!o.hidden) o.focus(); } });
  m.onclick = async (e) => {
    if (e.target === m || e.target.dataset.close) return m.remove();
    if (!e.target.dataset.save) return;
    const special = { fortress: {}, sanctuary: {} }, items = {};
    for (const row of m.querySelectorAll(".km-rwe")) {
      let id = row.querySelector("select").value; const q = Math.max(0, Math.round(+row.querySelector("input[type=number]").value || 0));
      if (id === "__other") { const name = row.querySelector(".km-rwo").value.trim(); if (!name) continue;
        id = Object.keys(G.rewards.items).find((i) => Object.values(G.rewards.items[i]).includes(name)) || "c_" + name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 20) + Math.random().toString(36).slice(2, 6);
        if (!G.rewards.items[id]) items[id] = { en: name, [lang]: name }; }
      special[row.dataset.k][row.dataset.n] = [id, q];
    }
    // the custom names saved before stay with the copy
    const prev = {}; for (const i of Object.keys(G.rewards.items)) if (i.startsWith("c_")) prev[i] = G.rewards.items[i];
    const msg = m.querySelector("[data-msg]"); msg.textContent = rwe("saving"); e.target.disabled = true;
    try { const j = await rwApi("save", { rewards: { special, items: { ...prev, ...items } } }); rwApply(j.rewards); renderList(); renderInfo(); msg.textContent = rwe("saved"); setTimeout(() => m.remove(), 700); }
    catch (x) { msg.textContent = rwe("err", { e: x.message }); e.target.disabled = false; }
  };
}
const RCOL = { gen1h: "#2b6cc4", jabel: "#c0640a", saul: "#c0640a", teleport: "#2e7d32", dmg2: "#b3261e", hp2: "#b3261e", deploy2: "#b3261e", expbook: "#7b4bb7", conqbook: "#7b4bb7", enhxp: "#5d6876", epicchest: "#6a3fa0", heroxp10k: "#2b7f9e" };
const specialOf = (b) => G.rewards && G.rewards[b.kind] && G.rewards[b.kind].special[b.n];
function rewardsHtml() {
  if (!G.rewards) return "";
  const kindName = (k) => k === "fortress" ? (ZH() ? ZH().fortressS : "Fortress") : (ZH() ? ZH().sanctuaryS : "Sanctuary");
  const block = (k, sym, col) => {
    const R = G.rewards[k], groups = new Map();
    for (const b of B.filter((x) => x.kind === k)) { const sp = R.special[b.n]; if (!sp) continue; const key = sp.join("|"); if (!groups.has(key)) groups.set(key, { sp, bs: [] }); groups.get(key).bs.push(b); }
    const rows = [...groups.values()].sort((a, b) => b.bs.length - a.bs.length || a.bs[0].n - b.bs[0].n).map(({ sp, bs }) =>
      `<div class="km-lv"><span class="pill km-rwp" style="background:${RCOL[sp[0]] || "#5d6876"}">${esc(iName(sp[0]))} ×${sp[1]}</span><div class="chips">${bs.map(chip).join("")}</div></div>`).join("");
    const chests = R.chests.map(([c, n]) => { const C = G.rewards.chests[c];
      return `<div class="km-rwc"><b>${esc(rt(C.slot))}</b> <span class="muted">📦 ${esc(C.name[lang] || C.name.en)} ×${n}</span><div>${C.items.map(([i, q]) => `${esc(iName(i))} ×${q}`).join(" · ")}</div></div>`; }).join("");
    return `<div class="km-rwk"><div class="hd"><span class="pill" style="background:${col}">${sym} ${esc(kindName(k))}</span><span class="bf">${esc(rt("power"))} ${R.power.toLocaleString("en-US")} · ${esc(rt("gar"))} ${esc(R.garrison)}</span></div>
      <div class="muted km-rws">③ ${esc(rt("special"))}</div>${rows}
      <details class="km-rwd"><summary>①② ${esc(rt("same").replace("{k}", kindName(k)))}</summary>${chests}</details></div>`;
  };
  const when = RW_META ? rwe("last", { who: RW_META.by || "?", t: new Date(RW_META.at).toISOString().slice(0, 10) }) : rwe("builtIn", { d: RW_BUILTIN });
  return `<div class="km-c km-rw" style="grid-column:1/-1"><div class="hd"><b>${esc(rt("title"))}</b>${ME() ? `<button type="button" class="btn small" data-rwedit="1">${esc(rwe("edit"))}</button>` : ""}</div><div class="muted" style="font-size:12px">${esc(when)}</div><div class="km-rw3">${["k1", "k2", "k3"].map((k) => `<div>${esc(rt(k))}</div>`).join("")}</div>${block("fortress", "◆", "#7a4a24")}${block("sanctuary", "●", "#5d6876")}</div>`;
}
function renderList() {
  const pr = B.filter((b) => PRIOABLE(b) && SP(b).p).sort((a, b) => SP(a).p - SP(b).p);
  let h = `<div class="km-c km-prc" style="grid-column:1/-1"><div class="hd"><b>${esc(pt("prioList"))}</b></div>` +
    (pr.length ? pr.map((b) => { const sp = SP(b), d = hqDist(b);
      return `<button type="button" class="km-pri" data-id="${b.id}"><span class="km-prb">${sp.p}</span><span class="km-prm"><b>${esc(nm(b))}</b> <span class="muted">X${b.x} Y${b.y}${d != null ? ` · 📏 ${d}` : ""}</span>${sp.r ? `<span class="km-prr">🎁 ${esc(sp.r)}</span>` : ""}${sp.n ? `<span class="muted">📝 ${esc(sp.n)}</span>` : ""}</span></button>`; }).join("")
      : `<div class="muted" style="font-size:13px">${esc(pt("prioEmpty"))}</div>`) + `</div>` + rewardsHtml() + `<div class="km-c"><div class="hd"><b>${esc(T("ruins"))}</b><span class="bf">${esc(T("noBuff"))}</span></div>
    <div class="km-lv"><span class="pill" style="background:#b8860b">👑 ${esc(castleName())}</span><div class="chips">${chip(BY.k)}</div></div>
    ${B.some((b) => b.kind === "hq") ? `<div class="km-lv"><span class="pill" style="background:#2b6cc4">🛡️ [NXS] HQ</span><div class="chips">${B.filter((b) => b.kind === "hq").map(chip).join("")}</div></div>` : ""}
    <div class="km-lv"><span class="pill" style="background:#7a4a24">◆ ${ZH() ? ZH().fortressS : "Fortress"}</span><div class="chips">${B.filter((b) => b.kind === "fortress").map(chip).join("")}</div></div>
    <div class="km-lv"><span class="pill" style="background:#5d6876">● ${ZH() ? ZH().sanctuaryS : "Sanctuary"}</span><div class="chips">${B.filter((b) => b.kind === "sanctuary").map(chip).join("")}</div></div></div>`;
  for (const [k] of G.types) {
    const t = TY[k], lvs = Object.keys(G.buff[k]).map(Number).sort((a, b) => a - b);
    h += `<div class="km-c"><div class="hd"><span class="sw" style="background:${t.c}"></span><b>${esc(typeName(k))}</b><span class="bf">${esc(buffName(k))}</span></div>` +
      lvs.map((lv) => `<div class="km-lv"><span class="pill" style="background:${t.c}">Lv.${lv} +${G.buff[k][lv]}%</span><div class="chips">${B.filter((b) => b.t === k && b.lv === lv).map(chip).join("")}</div></div>`).join("") + `</div>`;
  }
  $("km_cards").innerHTML = h;
  $("km_cards").querySelectorAll(".chip, .km-pri").forEach((c) => c.onclick = () => select(c.dataset.id, true));
  const rwb = $("km_cards").querySelector("[data-rwedit]"); if (rwb) rwb.onclick = rwEdit;
}
function renderLayers() {
  const items = [["ruins", T("ruins"), "#7a4a24"], ...G.types.map(([k, , , c]) => [k, typeName(k), c])];
  $("km_layers").innerHTML = `<button type="button" data-k="*" aria-pressed="${hidden.size === 0 && !planOnly}">${esc(T("all"))}</button><button type="button" data-k="plan" aria-pressed="${planOnly}">${esc(pt("planOnly"))}</button><button type="button" data-k="terr" aria-pressed="${terrOn}" title="${esc(tt(1))}">${esc(tt(0))}</button>` +
    items.map(([k, n, c]) => `<button type="button" data-k="${k}" aria-pressed="${!hidden.has(k)}"><span class="sw" style="background:${c}"></span>${esc(n)}</button>`).join("");
  if ($("km_terrNote")) { $("km_terrNote").hidden = !terrOn; $("km_terrNote").textContent = tt(1); }
  $("km_layers").querySelectorAll("button").forEach((btn) => btn.onclick = () => {
    const k = btn.dataset.k;
    if (k === "plan") { planOnly = !planOnly; renderLayers(); applyHidden(); return; }
    if (k === "terr") return setTerr(!terrOn);
    if (k === "*") { hidden.clear(); planOnly = false; }
    else if (hidden.size === 0) items.forEach(([kk]) => { if (kk !== k) hidden.add(kk); });   // first tap on a type = show only that type
    else if (hidden.has(k)) hidden.delete(k); else hidden.add(k);
    if (hidden.size === items.length) hidden.clear();
    renderLayers(); applyHidden();
  });
}
/* ===== Outpost plan: officers mark Outposts as 🎯 target or ✅ ours; saved for all officers in data/outpost-plan-x7k2p9.json
   (encrypted like the other officer files). Buffs add up per type, except the same type + same level (in-game rule). ===== */
const PLAN_PATH = "data/outpost-plan-x7k2p9.json";
let PLAN = { o: {}, t: {} }, SAVED = "{}", planMsg = "";
/* Protected/Vulnerable cycle: an officer types the countdown shown in game once; after that the page
   flips ✅ Protected ⇄ ⚔️ Vulnerable by itself (default 72 h Protected → 24 h Vulnerable, editable). */
const CYC = () => ({ p: (PLAN.cyc && PLAN.cyc.p) || 72, v: (PLAN.cyc && PLAN.cyc.v) || 24 });
function cycAt(raw, end, now) {   // → [status now, time of next switch]
  if ((raw !== "held" && raw !== "vuln") || !end) return [raw, 0];
  if (now < end) return [raw, end];
  const P = CYC().p * 36e5, V = CYC().v * 36e5, L = P + V, e = now - end, base = end + Math.floor(e / L) * L, t = e % L;
  const first = raw === "held" ? V : P;   // the phase after the typed one
  return t < first ? [raw === "held" ? "vuln" : "held", base + first] : [raw, base + L];
}
const pk = (b) => b.x + "," + b.y;
const PLANNABLE = (b) => b && (b.kind === "outpost" || b.kind === "fortress" || b.kind === "sanctuary");
const raw = (b) => (PLANNABLE(b) && PLAN.o[pk(b)]) || "";
/* eff = ✅ held / ⚔️ vuln after the timer (an old hand-set "conflict" counts as held) */
/* 🏯 Fortress / Sanctuary: one Sanctuary Battle period = start…start+every days (the battle is its last day). A "held" one that was
   marked before the current period began belongs to the last period → shown as 🎯 target again. PLAN.h[xy] = when it was marked held. */
const sancStart = () => { let e = null; try { e = (OfficerData.cacheGet("events") || []).find((x) => x && x.id === "sanctuary-battle"); } catch (err) {}
  const st = Date.parse(((e && e.start) || "2026-10-06") + "T00:00:00Z"), ev = ((e && e.every > 0 && e.every) || 7) * 864e5;
  return st + Math.floor((Date.now() - st) / ev) * ev; };
const stale = (b) => !isOp(b) && raw(b) === "held" && (((PLAN.h || {})[pk(b)]) || Date.parse(PLAN.at || "") || 0) < sancStart();
const eff = (b) => { if (stale(b)) return "target"; const r = raw(b) === "conflict" && isOp(b) ? "held" : raw(b); return isOp(b) && PLAN.t[pk(b)] ? cycAt(r, PLAN.t[pk(b)], Date.now())[0] : r; };
const nextSw = (b) => isOp(b) && PLAN.t[pk(b)] ? cycAt(raw(b) === "conflict" ? "held" : raw(b), PLAN.t[pk(b)], Date.now())[1] : 0;
/* start of its latest Protected phase (needs a timer) — the later one was taken later */
const protStart = (b) => { const n = nextSw(b); if (!n) return null; const P = CYC().p * 36e5, V = CYC().v * 36e5; return eff(b) === "held" ? n - P : n - V - P; };
/* ⚠️ Buff conflict, worked out from the timers: among our Protected Outposts of the same type + level, the one that has
   been Protected the shortest (= more Protected time left when both are Protected) gets no buff. Without timers an
   old hand-set mark still counts. */
function isConflict(b) {
  if (!isOp(b) || eff(b) !== "held") return false;
  const me = protStart(b);
  if (me == null) return raw(b) === "conflict";
  // only other Protected ones count: a Vulnerable Outpost gives no buff, so it can't block this one
  return B.some((o) => o !== b && isOp(o) && o.t === b.t && o.lv === b.lv && eff(o) === "held" && raw(o) !== "conflict" &&
    ((protStart(o) == null) || protStart(o) < me || (protStart(o) === me && o.id < b.id)));
}
const st = (b) => { const e = eff(b); return e === "held" && isConflict(b) ? "conflict" : e; };
const left = (ms) => { const m = Math.max(0, Math.round(ms / 6e4)), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60);
  return (d ? d + (lang === "zh" ? "天" : "d ") : "") + (d || h ? h + (lang === "zh" ? "時" : "h ") : "") + (d ? "" : (m % 60) + (lang === "zh" ? "分" : "m")); };
const snap = () => JSON.stringify({ o: PLAN.o, t: PLAN.t, h: PLAN.h || {}, c: PLAN.cyc || null, sp: PLAN.sp || {}, fl: PLAN.fl || [], ex: PLAN.ex || null, ot: PLAN.ot || null });
/* ⭐ Sanctuary / Fortress priority: PLAN.sp["x,y"] = { p: 1…, r: "rewards", n: "note" } */
const SP = (b) => (PLAN.sp && PLAN.sp[pk(b)]) || {};
const PRIOABLE = (b) => b && (b.kind === "sanctuary" || b.kind === "fortress");
function setSP(b, k, v) {
  if (!ME()) return;
  PLAN.sp = PLAN.sp || {}; const cur = { ...SP(b) };
  if (v === "" || v == null) delete cur[k]; else cur[k] = v;
  if (Object.keys(cur).length) PLAN.sp[pk(b)] = cur; else delete PLAN.sp[pk(b)];
  planMsg = "";
}
const hqDist = (b) => { const d = (G.hq || []).map((h) => Math.hypot(b.x - h[0], b.y - h[1])); return d.length ? Math.round(Math.min(...d)) : null; };   // to the nearer of our two HQs
const prioTxt = (n) => (n >= 1 && n <= 20 ? String.fromCharCode(0x2460 + n - 1) : String(n));
const isOp = (b) => b.kind === "outpost";
const dirty = () => snap() !== SAVED;
const PT = { ko: {"title": "📋 거점 계획", "hint": "지도나 목록에서 거점을 탭한 뒤 🎯 목표, ✅ 우리 거점(보호 상태), ⚔️ 우리 거점(쟁탈 가능 상태)으로 표시하세요. 우리 거점은 게임 속 카운트다운을 한 번만 입력하면 페이지가 보호 상태 ⇄ 쟁탈 가능 상태를 알아서 전환합니다. 합계는 게임 규칙을 따릅니다: 같은 종류·같은 레벨만 중첩되지 않고, 레벨이나 종류가 다르면 항상 더해집니다.", "target": "🎯 목표", "held": "✅ 우리 거점 · 보호 상태", "vuln": "⚔️ 우리 거점 · 쟁탈 가능 상태", "clear": "✕ 지우기", "type": "거점", "buff": "버프", "now": "현재 (게임과 동일)", "after": "목표 포함", "nowNote": "\"현재\"는 게임의 점령 버프 화면처럼 쟁탈 가능 상태인 거점을 제외합니다. \"목표 포함\"은 우리가 보유한 모든 거점에 목표를 더해 계산합니다.", "conflict": "버프 충돌", "conflictBtn": "⚠️ 우리 거점 · 버프 충돌", "conflicts": "⚠️ 우리 거점 · 버프 충돌 (타이머로 자동 판단, 버프 없음)", "conflictAuto": "버프 충돌: 같은 종류·같은 레벨의 거점을 하나 더 보유하고 있고 그쪽이 더 오래 보호 상태입니다. 버프는 그 거점만 줍니다. (타이머 기준: 보호 시간이 더 많이 남은 쪽이 버프 충돌입니다.)", "heldR": "✅ 우리 거점", "ruinsT": "🏛️ 성채와 유적 (유적 쟁탈)", "ruinsNote": "버프는 없지만 회마다 시즌 포인트를 줍니다: 유적 1, 성채 2. 보유 중인 곳은 자동으로 다시 신청되고, 회마다 직접 추가 신청할 수 있는 건 유적 1곳 + 성채 1곳뿐입니다.", "ptsNow": "현재", "ptsAfter": "목표 포함", "ptsRow": "회당 시즌 포인트", "tooMany": "목표에 유적이나 성채가 1곳보다 많습니다 — 회마다 각각 1곳만 신청할 수 있습니다.", "targets": "🎯 목표", "helds": "✅ 우리 거점 · 보호 상태", "vulns": "⚔️ 우리 거점 · 쟁탈 가능 상태 (현재 버프 없음)", "none": "아직 없음", "save": "💾 계획 저장", "by": "내 이름", "saving": "저장 중…", "saved": "저장했습니다 ✅ 다른 간부는 새로고침하면 볼 수 있습니다.", "unsaved": "저장하지 않은 변경 사항", "last": "마지막 저장: {by} · {at}", "noKey": "저장하려면 간부용 GitHub 키가 필요합니다 (공지 탭에서 설정).", "errAuth": "GitHub 키가 거부되었습니다.", "errBusy": "다른 사람이 동시에 저장했습니다 — 다시 시도하세요.", "errNet": "GitHub에 연결할 수 없습니다 — 다시 시도하세요.", "planOnly": "📋 계획만 보기", "reset": "변경 취소", "prio": "⭐ 우선순위", "prioNone": "—", "rewards": "보상", "rewardsPh": "예: 이곳에서 받는 보상 (게임 내 정보 참고)", "note": "메모", "notePh": "예: 지난주 보유 연맹, 경쟁 정도", "dist": "우리 본부에서 {n}칸", "prioList": "⭐ 유적·성채 우선순위", "prioEmpty": "아직 우선순위가 없습니다 — 지도에서 유적이나 성채를 탭하고 숫자를 고르세요 (1 = 최우선).", "prioSave": "다른 간부가 볼 수 있도록 💾 계획 저장을 꼭 누르세요.", "toV": "⚔️ 쟁탈 가능 상태", "toP": "✅ 보호 상태", "noT": "타이머 없음 — 간부가 직접 바꿀 때만 상태가 바뀝니다.", "tmHint": "타이머 추가: 먼저 ✅ 우리 거점 · 보호 상태 또는 ⚔️ 우리 거점 · 쟁탈 가능 상태를 탭하면 게임 카운트다운 입력칸이 여기에 나타납니다.", "leftP": "게임 속 보호 상태 남은 시간:", "leftV": "게임 속 쟁탈 가능 상태 남은 시간:", "dd": "일", "hh": "시간", "mm": "분", "setT": "타이머 설정", "clrT": "타이머 삭제", "cyc": "주기:", "cycNote": "타이머가 있으면 페이지가 보호 상태 ⇄ 쟁탈 가능 상태를 알아서 전환합니다. 거점을 잃으면 직접 다시 표시하세요."},
 ar: {"title": "📋 خطة المستوطنات", "hint": "اضغط على مستوطنة في الخريطة أو في القائمة، ثم ضع عليها 🎯 هدف، ✅ لنا (محمي)، ⚔️ لنا (مستضعف). للمستوطنات التي نملكها، أدخل العد التنازلي من اللعبة مرة واحدة وستتبدل الصفحة بين محمي ⇄ مستضعف تلقائيًا. المجاميع تتبع قاعدة اللعبة: فقط النوع نفسه بالمستوى نفسه لا يتراكم — المستوى المختلف أو النوع المختلف يُضاف دائمًا.", "target": "🎯 هدف", "held": "✅ لنا · محمي", "vuln": "⚔️ لنا · مستضعف", "clear": "✕ مسح", "type": "مستوطنة", "buff": "المكافأة", "now": "الآن (كما في اللعبة)", "after": "مع الأهداف", "nowNote": "\"الآن\" لا يحسب المستوطنات المستضعفة، مثل شاشة إيرادات الاحتلال في اللعبة. \"مع الأهداف\" يحسب كل ما نملكه بالإضافة إلى الأهداف.", "conflict": "تعارض المكافآت", "conflictBtn": "⚠️ لنا · تعارض المكافآت", "conflicts": "⚠️ لنا · تعارض المكافآت (محسوب من المؤقتات، بلا مكافأة)", "conflictAuto": "تعارض المكافآت: نملك مستوطنة أخرى من النوع والمستوى نفسيهما محمية منذ مدة أطول — هي وحدها تعطي المكافأة. (حسب المؤقتات: التي بقي لها وقت حماية أكثر هي المتعارضة.)", "heldR": "✅ لنا", "ruinsT": "🏛️ الحصون والمآوي (معركة المأوى)", "ruinsNote": "بلا مكافآت — تعطي نقاط موسم في كل مرحلة: المأوى 1، الحصن 2. التي نملكها تُسجَّل تلقائيًا من جديد؛ وفي كل مرحلة يمكننا التسجيل يدويًا في مأوى واحد إضافي + حصن واحد إضافي فقط.", "ptsNow": "الآن", "ptsAfter": "مع الأهداف", "ptsRow": "نقاط الموسم لكل مرحلة", "tooMany": "أكثر من مأوى واحد أو حصن واحد كأهداف — يمكن تسجيل واحد فقط من كل نوع في كل مرحلة.", "targets": "🎯 الأهداف", "helds": "✅ لنا · محمي", "vulns": "⚔️ لنا · مستضعف (بلا مكافأة حاليًا)", "none": "لا شيء بعد", "save": "💾 حفظ الخطة", "by": "اسمك", "saving": "جارٍ الحفظ…", "saved": "تم الحفظ ✅ سيراها الضباط الآخرون بعد تحديث الصفحة.", "unsaved": "تغييرات غير محفوظة", "last": "آخر حفظ بواسطة {by} · {at}", "noKey": "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في تبويب النشر).", "errAuth": "تم رفض مفتاح GitHub.", "errBusy": "قام شخص آخر بالحفظ في اللحظة نفسها — حاول مرة أخرى.", "errNet": "تعذر الاتصال بـ GitHub — حاول مرة أخرى.", "planOnly": "📋 الخطة فقط", "reset": "تراجع عن التغييرات", "prio": "⭐ الأولوية", "prioNone": "—", "rewards": "الجوائز", "rewardsPh": "مثلًا: ماذا يعطي هذا (من معلومات اللعبة)", "note": "ملاحظة", "notePh": "مثلًا: من امتلكه الأسبوع الماضي، ومدى شدة المنافسة", "dist": "{n} مربع من مقرنا", "prioList": "⭐ أولوية المآوي والحصون", "prioEmpty": "لم تُحدَّد أولوية بعد — اضغط على مأوى أو حصن في الخريطة واختر رقمًا (1 = الأفضل).", "prioSave": "تذكّر الضغط على 💾 حفظ الخطة ليراها الضباط الآخرون.", "toV": "⚔️ مستضعف", "toP": "✅ محمي", "noT": "بلا مؤقت — تتغير الحالة فقط عندما يغيرها أحد الضباط.", "tmHint": "لإضافة مؤقت: اضغط أولًا على ✅ لنا · محمي أو ⚔️ لنا · مستضعف — ستظهر هنا خانات العد التنازلي من اللعبة.", "leftP": "وقت الحماية المتبقي في اللعبة:", "leftV": "وقت الاستضعاف المتبقي في اللعبة:", "dd": "ي", "hh": "س", "mm": "د", "setT": "ضبط المؤقت", "clrT": "إزالة المؤقت", "cyc": "الدورة:", "cycNote": "مع المؤقت تتبدل الصفحة بين محمي ⇄ مستضعف تلقائيًا. إذا خسرنا مستوطنة، ضع علامتها من جديد يدويًا."},
 pt: {"title": "📋 Plano dos Postos Avançados", "hint": "Toque num Posto Avançado no mapa ou na lista e marque como 🎯 Alvo, ✅ Nosso (Protegido), ⚔️ Nosso (Vulnerável). Nos nossos, digite uma vez a contagem regressiva do jogo e a página troca Protegido ⇄ Vulnerável sozinha. Os totais seguem a regra do jogo: só o mesmo tipo no mesmo nível não acumula — nível diferente ou tipo diferente sempre somam.", "target": "🎯 Alvo", "held": "✅ Nosso · Protegido", "vuln": "⚔️ Nosso · Vulnerável", "clear": "✕ Limpar", "type": "Posto Avançado", "buff": "Bônus", "now": "Agora (como no jogo)", "after": "Com os alvos", "nowNote": "\"Agora\" deixa de fora os Postos Avançados Vulneráveis, como a tela de bônus de ocupação do jogo. \"Com os alvos\" conta tudo o que temos mais os alvos.", "conflict": "Conflito de bônus", "conflictBtn": "⚠️ Nosso · Conflito de bônus", "conflicts": "⚠️ Nosso · Conflito de bônus (calculado pelos timers, sem bônus)", "conflictAuto": "Conflito de bônus: temos outro do mesmo tipo e nível que está Protegido há mais tempo — só esse dá o bônus. (Pelos timers: o que tem mais tempo de Protegido restante é o conflito.)", "heldR": "✅ Nosso", "ruinsT": "🏛️ Fortalezas e Santuários (Batalha do Santuário)", "ruinsNote": "Sem bônus — dão pontos de temporada a cada fase: Santuário 1, Fortaleza 2. Os que já temos se inscrevem de novo sozinhos; a cada fase só podemos inscrever ativamente mais 1 Santuário + mais 1 Fortaleza.", "ptsNow": "Agora", "ptsAfter": "Com os alvos", "ptsRow": "Pontos de temporada por fase", "tooMany": "Mais de 1 Santuário ou 1 Fortaleza como alvo — só dá para inscrever 1 de cada por fase.", "targets": "🎯 Alvos", "helds": "✅ Nossos · Protegidos", "vulns": "⚔️ Nossos · Vulneráveis (sem bônus agora)", "none": "Nenhum ainda", "save": "💾 Salvar plano", "by": "Seu nome", "saving": "Salvando…", "saved": "Salvo ✅ Os outros oficiais veem depois de atualizar.", "unsaved": "Mudanças não salvas", "last": "Salvo por último por {by} · {at}", "noKey": "Para salvar é preciso a chave do GitHub dos oficiais (configurada na aba Post).", "errAuth": "A chave do GitHub foi recusada.", "errBusy": "Outra pessoa salvou no mesmo momento — tente de novo.", "errNet": "Não foi possível conectar ao GitHub — tente de novo.", "planOnly": "📋 Só o plano", "reset": "Desfazer mudanças", "prio": "⭐ Prioridade", "prioNone": "—", "rewards": "Recompensas", "rewardsPh": "ex.: o que este dá (pelas informações do jogo)", "note": "Observação", "notePh": "ex.: quem ficou com ele na semana passada, quão disputado é", "dist": "{n} casas do nosso QG", "prioList": "⭐ Prioridade de Santuários e Fortalezas", "prioEmpty": "Nenhuma prioridade definida ainda — toque num Santuário ou Fortaleza no mapa e escolha um número (1 = melhor).", "prioSave": "Lembre de tocar em 💾 Salvar plano para os outros oficiais verem.", "toV": "⚔️ Vulnerável", "toP": "✅ Protegido", "noT": "Sem timer — o status só muda quando um oficial muda.", "tmHint": "Para adicionar um timer: primeiro toque em ✅ Nosso · Protegido ou ⚔️ Nosso · Vulnerável — as caixas para a contagem regressiva do jogo aparecem aqui.", "leftP": "Tempo restante como Protegido no jogo:", "leftV": "Tempo restante como Vulnerável no jogo:", "dd": "d", "hh": "h", "mm": "m", "setT": "Definir timer", "clrT": "Remover timer", "cyc": "Ciclo:", "cycNote": "Com um timer a página troca Protegido ⇄ Vulnerável sozinha. Se perdermos um Posto Avançado, marque de novo à mão."},

  en: { title: "📋 Outpost plan", hint: "Tap an Outpost on the map or in the list, then mark it 🎯 Target, ✅ Ours (Protected), ⚔️ Ours (Vulnerable) For ours, type the countdown from the game once and the page switches Protected ⇄ Vulnerable by itself. Totals follow the in-game rule: only the same type at the same level does not stack — a different level or a different type always adds up.",
        target: "🎯 Target", held: "✅ Ours · Protected", vuln: "⚔️ Ours · Vulnerable", clear: "✕ Clear", type: "Outpost", buff: "Buff", now: "Now (as in game)", after: "With targets",
        nowNote: "\"Now\" leaves out Vulnerable Outposts, like the in-game Occupation Buff screen. \"With targets\" counts everything we hold plus the targets.",
        conflict: "Buff conflict", conflictBtn: "⚠️ Ours · Buff conflict", conflicts: "⚠️ Ours · Buff conflict (worked out from the timers, no buff)",
        conflictAuto: "Buff conflict: we hold another one of the same type and level that has been Protected longer — only that one gives the buff. (From the timers: the one with more Protected time left is the conflict.)", heldR: "✅ Ours", ruinsT: "🏛️ Fortresses & Sanctuaries (Sanctuary Battle)",
        ruinsNote: "No buffs — they give season points each phase: Sanctuary 1, Fortress 2. The ones we hold sign up again by themselves; each phase we can actively sign up for only 1 more Sanctuary + 1 more Fortress.",
        ptsNow: "Now", ptsAfter: "With targets", ptsRow: "Season points per phase", tooMany: "More than 1 Sanctuary or 1 Fortress as targets — only 1 of each can be signed up per phase.", targets: "🎯 Targets", helds: "✅ Ours · Protected", vulns: "⚔️ Ours · Vulnerable (no buff right now)", none: "None yet", save: "💾 Save plan", by: "Your name", saving: "Saving…",
        saved: "Saved ✅ Other officers see it after a refresh.", unsaved: "Unsaved changes", last: "Last saved by {by} · {at}",
        noKey: "Saving needs the officer GitHub key (set up on the Post tab).", errAuth: "The GitHub key was refused.", errBusy: "Someone else saved at the same moment — try again.", errNet: "Couldn't reach GitHub — try again.",
        planOnly: "📋 Plan only", reset: "Undo changes",
        prio: "⭐ Priority", prioNone: "—", rewards: "Rewards", rewardsPh: "e.g. what this one gives (from the in-game info)", note: "Note", notePh: "e.g. who held it last week, how contested",
        dist: "{n} tiles from our HQ", prioList: "⭐ Sanctuary & Fortress priority", prioEmpty: "No priority set yet — tap a Sanctuary or Fortress on the map and pick a number (1 = best).",
        prioSave: "Remember to press 💾 Save plan so other officers see it.",
        toV: "⚔️ Vulnerable", toP: "✅ Protected", noT: "No timer — the status only changes when an officer changes it.",
        tmHint: "To add a timer: first tap ✅ Ours · Protected or ⚔️ Ours · Vulnerable — the boxes for the in-game countdown appear here.",
        leftP: "Protected time left in game:", leftV: "Vulnerable time left in game:", dd: "d", hh: "h", mm: "m", setT: "Set timer", clrT: "Remove timer",
        cyc: "Cycle:", cycNote: "With a timer the page switches Protected ⇄ Vulnerable by itself. If we lose an Outpost, mark it again by hand." },
  zh: { title: "📋 據點規劃", hint: "點地圖或清單上的據點，再標成 🎯 目標、✅ 已佔領（保護狀態）、⚔️ 已佔領（可爭奪狀態）。已佔領的輸入一次遊戲裡的倒數，頁面就會自己切換保護 ⇄ 可爭奪。總計依遊戲規則：只有同類型、同等級不疊加；不同等級或不同類型都會加上去。",
        target: "🎯 目標", held: "✅ 已佔領・保護", vuln: "⚔️ 已佔領・可爭奪", clear: "✕ 清除", type: "據點", buff: "增益", now: "目前（同遊戲）", after: "加上目標",
        nowNote: "「目前」不算可爭奪狀態的據點，和遊戲「佔領增益」畫面一樣；「加上目標」是我們佔領的全部加上目標。",
        conflict: "增益衝突", conflictBtn: "⚠️ 已佔領・增益衝突", conflicts: "⚠️ 已佔領・增益衝突（依計時自動判斷，沒有增益）",
        conflictAuto: "增益衝突：我們還有另一座同類型、同等級、保護比較久的，只有那座有增益。（依計時判斷：保護時間剩比較多的那座就是增益衝突。）", heldR: "✅ 已佔領", ruinsT: "🏛️ 要塞與遺跡（遺跡爭奪）",
        ruinsNote: "沒有增益，但每期給賽季積分：遺跡 1 分、要塞 2 分。已佔領的會自動報名；每期只能再主動報名 1 座遺跡 + 1 座要塞。",
        ptsNow: "目前", ptsAfter: "加上目標", ptsRow: "每期賽季積分", tooMany: "目標裡有超過 1 座遺跡或 1 座要塞 — 每期各只能主動報名 1 座。", targets: "🎯 目標", helds: "✅ 已佔領・保護狀態", vulns: "⚔️ 已佔領・可爭奪狀態（目前沒有增益）", none: "還沒有", save: "💾 儲存規劃", by: "你的名字", saving: "儲存中…",
        saved: "已儲存 ✅ 其他幹部重新整理後就會看到。", unsaved: "有變更還沒儲存", last: "最後由 {by} 儲存 · {at}",
        noKey: "儲存需要幹部的 GitHub 金鑰（在公告分頁設定）。", errAuth: "GitHub 金鑰被拒絕。", errBusy: "剛好有人同時儲存，請再試一次。", errNet: "連不上 GitHub，請再試一次。",
        planOnly: "📋 只看規劃", reset: "復原變更",
        prio: "⭐ 優先順序", prioNone: "—", rewards: "獎勵", rewardsPh: "例如這個遺跡給什麼（遊戲內資訊）", note: "備註", notePh: "例如上週誰佔領、競爭多激烈",
        dist: "距離我們總部 {n} 格", prioList: "⭐ 遺跡與要塞優先順序", prioEmpty: "還沒設定優先順序：在地圖上點一個遺跡或要塞，選數字（1 = 最優先）。",
        prioSave: "記得按「💾 儲存規劃」，其他幹部才看得到。",
        toV: "⚔️ 可爭奪", toP: "✅ 保護", noT: "沒有計時 — 狀態只會在幹部手動改的時候變。",
        tmHint: "要設計時：先點 ✅ 已佔領・保護 或 ⚔️ 已佔領・可爭奪，這裡就會出現輸入遊戲倒數的格子。",
        leftP: "遊戲裡保護狀態剩下：", leftV: "遊戲裡可爭奪狀態剩下：", dd: "天", hh: "時", mm: "分", setT: "設定計時", clrT: "移除計時",
        cyc: "循環：", cycNote: "設了計時，頁面會自己切換 保護 ⇄ 可爭奪。據點被打掉的話，請手動重新標示。" },
};
const pt = (k) => (PT[lang] || PT.en)[k];
/* total % per type for a set of statuses — one count per (type, level) */
function totals(states) {
  const seen = new Set(), sum = {};
  for (const b of B) if (b.kind === "outpost" && states.includes(st(b)) && !seen.has(b.t + b.lv)) { seen.add(b.t + b.lv); sum[b.t] = (sum[b.t] || 0) + b.buff; }
  return sum;
}
/* 👀 look-only marks from a link: #map?look=387-717~UNI~r,588-327~替代~g (r = red, g = green, b = blue). Never saved. */
function lookHtml() {
  const q = (location.hash.split("?")[1] || ""), v = new URLSearchParams(q).get("look"); if (!v) return "";
  const C = { r: "#ff3b30", g: "#22c55e", b: "#3b82f6", y: "#facc15" };
  return v.split(",").map((e) => { const [xy, label = "", c = "r"] = e.split("~"), m = (xy || "").match(/^(\d+)-(\d+)$/); if (!m) return "";
    const [X, Y] = P(+m[1], +m[2]), col = C[c] || C.r, t = esc(label).slice(0, 24);
    return `<g class="km-look" pointer-events="none"><circle cx="${X}" cy="${Y}" r="26" fill="none" stroke="${col}" stroke-width="6"/><circle cx="${X}" cy="${Y}" r="26" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4"/>`
      + (t ? `<text x="${X}" y="${Y - 32}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="${col}" stroke="#000" stroke-width="3.5" paint-order="stroke">${t}</text>` : "") + `</g>`; }).join("");
}
window.addEventListener("hashchange", () => { if (/^#map/.test(location.hash)) drawPlan(); });
function drawPlan() {
  const g = $("km_planG"); if (!g) return;
  g.innerHTML = B.filter((b) => st(b)).map((b) => { const [X, Y] = P(b.x, b.y), s = st(b), r = b.kind === "fortress" ? 27 : b.kind === "sanctuary" ? 21 : 17;
    const d = `data-id="${b.id}" class="pl-mk" style="transform-origin:${X}px ${Y}px"`;   // same id as the marker → hidden together by the filter
    return s === "held" ? `<circle ${d} cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#3ddc84" stroke-width="4"/>`
      : s === "vuln" ? `<circle ${d} cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#ff6b4a" stroke-width="4"/>`
      : s === "conflict" ? `<circle ${d} cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#f5a623" stroke-width="4" stroke-dasharray="2 3"/>`
      : `<circle ${d} cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#ffe14d" stroke-width="3.5" stroke-dasharray="5 4"/>`; }).join("")
    // ⭐ priority badge (gold circle with the number) at the top-right of a Sanctuary / Fortress
    + B.filter((b) => PRIOABLE(b) && SP(b).p).map((b) => { const [X, Y] = P(b.x, b.y), o = b.kind === "fortress" ? 20 : 15;
      const w = SP(b).p >= 10 ? 34 : 27, x0 = X + o + 3;   // gold "★n" tag to the right, clear of the name above
      return `<g data-id="${b.id}" class="pl-mk" style="transform-origin:${X}px ${Y}px"><rect x="${x0}" y="${Y - 10}" width="${w}" height="20" rx="10" fill="#ffd34d" stroke="#5a3d00" stroke-width="2"/><text x="${x0 + w / 2}" y="${Y + 4.5}" text-anchor="middle" font-family="Arial" font-size="12.5" font-weight="800" fill="#3d2a00">★${SP(b).p}</text></g>`; }).join("");
  g.insertAdjacentHTML("beforeend", lookHtml());   // 👀 on top of everything
}
const refreshPlan = () => { drawPlan(); applyHidden(); renderInfo(); renderList(); renderPlan(); };
/* once a minute: update the countdowns; redraw everything when an Outpost switched state (not while typing) */
let lastSig = "";
const sig = () => B.filter((b) => isOp(b) && PLAN.t[pk(b)]).map((b) => st(b)).join();
setInterval(() => {
  if (!G || !$("km_plan")) return;
  const a = document.activeElement, typing = a && a.tagName === "INPUT" && a.closest("#pg-map");
  if (sig() !== lastSig && !typing) { lastSig = sig(); refreshPlan(); return; }
  document.querySelectorAll("#pg-map [data-sw]").forEach((e) => e.textContent = left(+e.dataset.sw - Date.now()));
}, 60000);
function setStatus(id, v) {
  if (!ME()) return;
  const b = BY[id]; if (!PLANNABLE(b)) return;
  if (v) PLAN.o[pk(b)] = v; else delete PLAN.o[pk(b)];
  delete PLAN.t[pk(b)];   // a hand-set status starts without a timer — type the in-game countdown again
  if (!isOp(b)) { PLAN.h = PLAN.h || {}; if (v === "held") PLAN.h[pk(b)] = Date.now(); else delete PLAN.h[pk(b)]; }
  planMsg = ""; drawPlan(); applyHidden(); renderInfo(); renderList(); renderPlan();
}
/* 📍 Outpost reminders: when each of our Outposts (with a countdown) next turns Vulnerable, left in this browser for the ⏰ panel
   (nxs-outpost-times). The ⏰ panel tells whoever an admin ticked 📍 for in 👥 Officers, like the 🛠️ admin reminders. From the SAVED plan. */
function opTimes(P, K) {
  const cy = { p: (P.cyc && P.cyc.p) || 72, v: (P.cyc && P.cyc.v) || 24 }, PP = cy.p * 36e5, V = cy.v * 36e5, L = PP + V, now = Date.now(), out = [];
  for (const [t, lv, x, y] of K.outposts) {
    const k = x + "," + y, end = P.t && P.t[k]; let r = P.o && P.o[k]; if (r === "conflict") r = "held";
    if ((r !== "held" && r !== "vuln") || !end) continue;
    let st = r, nx = end;
    if (now >= end) { const e = now - end, base = end + Math.floor(e / L) * L, tt = e % L, first = r === "held" ? V : PP;
      if (tt < first) { st = r === "held" ? "vuln" : "held"; nx = base + first; } else nx = base + L; }
    const names = { en: ((K.types || []).find((a) => a[0] === t) || [])[1] || t };
    for (const l of Object.keys(K)) if (K[l] && K[l].types && K[l].types[t]) names[l] = K[l].types[t][0];
    out.push({ id: `op-${x}-${y}`, at: st === "held" ? nx : nx + PP, t, lv, x, y, names });
  }
  return out;
}
async function exportOutposts(P) {
  try {
    if (!P) { if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) return false; P = await OfficerData.fetchJson(PLAN_PATH); }
    if (!P || !P.o) return !!P;
    await loadScripts(["data/kingdom-map.js"]);
    localStorage.setItem("nxs-outpost-times", JSON.stringify({ updated: Date.now(), items: opTimes(P, KINGDOM_MAP) }));
    if (window.NXSTimers && NXSTimers.setExt) NXSTimers.setExt("outposts", []);   // the old per-phone 🔔 switch is gone
    window.dispatchEvent(new Event("nxs-admin-todos")); return true;
  } catch (e) { return false; }
}
(function bootOp(n) { setTimeout(async () => { if (!(await exportOutposts()) && n < 30) bootOp(n + 1); }, 4000); })(0);   // on opening the officer page, once logged in
function renderPlan() {
  const now = totals(["held"]), after = totals(["held", "vuln", "conflict", "target"]);
  const fmt = (n) => n ? "+" + n + "%" : "—";
  const rows = G.types.map(([k]) => `<tr><td><span class="sw" style="background:${TY[k].c};display:inline-block;vertical-align:-2px;margin-right:6px"></span>${esc(typeName(k))}</td><td class="muted">${esc(buffName(k))}</td><td class="n">${fmt(now[k])}</td><td class="n${(after[k] || 0) > (now[k] || 0) ? " up" : ""}">${fmt(after[k])}</td></tr>`).join("");
  /* in-game "增益衝突": a second Outpost we hold with the same type + level as another one we hold */
  /* ⚠️ Buff conflict is worked out from the timers (isConflict above) */
  const list = (s) => { const L = B.filter((b) => isOp(b) && st(b) === s); return L.length ? `<div class="chips">${L.map((b) => `<button type="button" class="chip${b.id === SEL ? " on" : ""}" data-id="${b.id}"><span class="sw" style="background:${TY[b.t].c};display:inline-block;width:10px;height:10px;vertical-align:-1px;margin-right:4px"></span>${esc(typeName(b.t))} Lv.${b.lv} · X${b.x} Y${b.y}${nextSw(b) ? ` <span class="muted">⏱ <span data-sw="${nextSw(b)}">${esc(left(nextSw(b) - Date.now()))}</span></span>` : ""}${isConflict(b) ? ` <span style="color:#c0473a">⚠️ ${esc(pt("conflict"))}</span>` : ""}</button>`).join("")}</div>` : `<div class="muted" style="font-size:13px">${esc(pt("none"))}</div>`; };
  const cnt = (s) => B.filter((b) => isOp(b) && st(b) === s).length;
  /* Sanctuary Battle: season points per phase (Sanctuary 1, Fortress 2); one active sign-up of each kind per phase */
  const R = (s) => B.filter((b) => !isOp(b) && st(b) === s);
  const ptsOf = (L) => L.reduce((n, b) => n + (b.kind === "fortress" ? 2 : 1), 0);
  const rHeld = R("held"), rTgt = R("target");
  const tooMany = rTgt.filter((b) => b.kind === "sanctuary").length > 1 || rTgt.filter((b) => b.kind === "fortress").length > 1;
  const rchips = (L) => L.length ? `<div class="chips">${L.map((b) => `<button type="button" class="chip${b.id === SEL ? " on" : ""}" data-id="${b.id}">${b.kind === "fortress" ? "◆" : "●"} ${esc(nm(b))} · X${b.x} Y${b.y}</button>`).join("")}</div>` : `<div class="muted" style="font-size:13px">${esc(pt("none"))}</div>`;
  const ruinsHtml = `<div class="pl-sub" style="margin-top:16px">${esc(pt("ruinsT"))}</div>
    <div class="muted" style="font-size:12px">${esc(pt("ruinsNote"))}</div>
    <table class="pl-tbl"><tr><th></th><th style="text-align:right">${esc(pt("ptsNow"))}</th><th style="text-align:right">${esc(pt("ptsAfter"))}</th></tr>
      <tr><td>${esc(pt("ptsRow"))}</td><td class="n">${ptsOf(rHeld)}</td><td class="n${rTgt.length ? " up" : ""}">${ptsOf(rHeld) + ptsOf(rTgt)}</td></tr></table>
    ${tooMany ? `<div style="color:#c0473a;font-size:12.5px;margin-top:6px">⚠️ ${esc(pt("tooMany"))}</div>` : ""}
    <div class="pl-sub">${esc(pt("targets"))} (${rTgt.length})</div>${rchips(rTgt)}
    <div class="pl-sub">${esc(pt("heldR"))} (${rHeld.length})</div>${rchips(rHeld)}
    <div id="km_sb" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--rule)"></div>`;
  let by = importBy; if (!by) { try { by = localStorage.getItem("nxs-plan-by") || ""; } catch (e) {} }
  $("km_plan").innerHTML = `<h3 style="margin-bottom:2px">${esc(pt("title"))}</h3><div class="muted" style="font-size:12.5px">${esc(pt("hint"))}</div>
    <div class="pl-sub">${esc(T("rulesT"))}</div><ul class="km-rules">${T("rules").map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    ${PLAN.by ? `<div class="muted" style="font-size:12px;margin-top:10px">${esc(pt("last").replace("{by}", PLAN.by).replace("{at}", new Date(PLAN.at).toLocaleString(LOCALE(lang), { dateStyle: "medium", timeStyle: "short" })))}</div>` : ""}
    <table class="pl-tbl"><tr><th>${esc(pt("type"))}</th><th>${esc(pt("buff"))}</th><th style="text-align:right">${esc(pt("now"))}</th><th style="text-align:right">${esc(pt("after"))}</th></tr>${rows}</table>
    <div class="muted" style="font-size:12px;margin-top:6px">${esc(pt("nowNote"))}</div>
    <div class="pl-sub">${esc(pt("targets"))} (${cnt("target")})</div>${list("target")}
    <div class="pl-sub">${esc(pt("helds"))} (${cnt("held")})</div>${list("held")}
    <div class="pl-sub">${esc(pt("vulns"))} (${cnt("vuln")})</div>${list("vuln")}
    <div class="pl-cyc muted">${esc(pt("cyc"))} ${ME() ? `<input id="cy_p" type="number" min="1" max="240" value="${CYC().p}">` : `<b>${CYC().p}</b>`} h ✅ → ${ME() ? `<input id="cy_v" type="number" min="1" max="240" value="${CYC().v}">` : `<b>${CYC().v}</b>`} h ⚔️ <span style="display:block;font-size:12px">${esc(pt("cycNote"))}</span></div>
    ${cnt("conflict") ? `<div class="pl-sub">${esc(pt("conflicts"))} (${cnt("conflict")})</div>${list("conflict")}` : ""}
    ${ruinsHtml}
    ${ME() ? `<div class="pl-save"><input id="pl_by" maxlength="30" placeholder="${esc(pt("by"))}" value="${esc(by)}"><button class="btn primary" id="pl_save" type="button"${dirty() ? "" : " disabled"}>${esc(pt("save"))}</button>${dirty() ? `<button class="btn" id="pl_reset" type="button">${esc(pt("reset"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(planMsg || (dirty() ? pt("unsaved") : ""))}</span></div>` : ""}`;
  // 💾 the same Save right under the map, so a change made on the map isn't forgotten
  const sb = $("km_saveBar");
  if (sb) { const show = ME() && (dirty() || planMsg);
    sb.hidden = !show;
    if (show) { sb.innerHTML = `${dirty() ? `<button class="btn primary" id="pl_save2" type="button">${esc(pt("save"))}</button>` : ""}<span class="muted" style="font-size:12.5px">${esc(planMsg || pt("unsaved"))}</span>`;
      if ($("pl_save2")) $("pl_save2").onclick = savePlan; } }
  renderSB();   // the Sanctuary Battle sign-up drawing sits under the Fortress/Sanctuary part of the plan
  $("km_plan").querySelectorAll(".chip").forEach((c) => c.onclick = () => select(c.dataset.id, true));
  if ($("pl_save")) $("pl_save").onclick = savePlan;
  for (const [id, k] of [["cy_p", "p"], ["cy_v", "v"]]) if ($(id)) $(id).onchange = () => { const n = parseInt($(id).value, 10); if (n > 0) { PLAN.cyc = { ...CYC(), [k]: n }; planMsg = ""; refreshPlan(); } };
  lastSig = sig();
  renderFlags();
  if ($("pl_reset")) $("pl_reset").onclick = () => { const S = JSON.parse(SAVED); PLAN.o = S.o; PLAN.t = S.t; PLAN.h = S.h || {}; if (S.c) PLAN.cyc = S.c; else delete PLAN.cyc; PLAN.sp = S.sp || {}; PLAN.fl = S.fl || []; if (S.ex) PLAN.ex = S.ex; else delete PLAN.ex; if (S.ot) PLAN.ot = S.ot; else delete PLAN.ot; drawOt(); rebuildOwn(); drawEx(); planMsg = ""; drawFlags(); renderFlags(); drawPlan(); applyHidden(); renderInfo(); renderList(); renderPlan(); };
}
const gh = (method, path, body, token = OFFICER.token) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
async function loadPlan() {
  let d = null;
  if (OFFICER.token) { try { const f = await gh("GET", PLAN_PATH); d = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; } catch (e) {} }
  if (!d) { try { d = await OfficerData.fetchJson(PLAN_PATH); } catch (e) {} }
  PLAN = d && d.o ? d : { o: {}, t: {} }; if (!PLAN.t) PLAN.t = {}; SAVED = snap();
}
/* A link like officer-x7k2p9.html#map?held=666-138,486-138&target=327-666&by=Sparrow pre-marks Outposts
   (not saved yet — the officer checks the map and presses 💾 Save plan). Coordinates that are not Outposts are ignored. */
let importBy = "";
function importFromLink() {
  if (!ME()) return;
  const q = (location.hash.split("?")[1] || ""); if (!q) return;
  const prm = new URLSearchParams(q), coords = new Set(B.filter(PLANNABLE).map(pk));
  let n = 0;
  for (const k of ["held", "vuln", "conflict", "target"]) for (const c of (prm.get(k) || "").split(",")) {
    const xy = c.trim().replace("-", ","); if (coords.has(xy)) { PLAN.o[xy] = k; delete PLAN.t[xy]; n++; }
  }
  /* t=x-y@unixSeconds — when the status given for that Outpost ends (screenshot time + in-game countdown) */
  for (const c of (prm.get("t") || "").split(",")) {
    const m = c.trim().match(/^(\d+)-(\d+)@(\d{9,11})$/), xy = m && m[1] + "," + m[2];
    if (m && (PLAN.o[xy] === "held" || PLAN.o[xy] === "vuln")) { PLAN.t[xy] = +m[3] * 1000; n++; }
  }
  importBy = (prm.get("by") || "").slice(0, 30);
  if (!n) return 0;
  planMsg = (lang === "zh" ? "從連結帶入 {n} 個標記，確認後按「儲存規劃」。" : lang === "pt" ? "{n} marcações vieram do link — confira e toque em Salvar plano." : lang === "ar" ? "تمت إضافة {n} علامة من الرابط — راجعها ثم اضغط حفظ الخطة." : lang === "ko" ? "링크에서 표시 {n}개를 가져왔습니다. 확인 후 [계획 저장]을 누르세요." : "{n} marks added from the link — check them, then press Save plan.").replace("{n}", n);
  try { history.replaceState(null, "", location.pathname + location.search + "#map"); } catch (e) {}
  return n;
}
async function savePlan() {
  if (!ME()) return;
  if (!OFFICER.token) { planMsg = pt("noKey"); renderPlan(); return; }
  const by = ($("pl_by").value || "").trim(); try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  planMsg = pt("saving"); renderPlan(); for (const id of ["pl_save", "pl_save2"]) if ($(id)) $(id).disabled = true;
  for (const b of B) if (PLANNABLE(b) && !isOp(b) && raw(b) === "held" && !(PLAN.h || {})[pk(b)]) { PLAN.h = PLAN.h || {}; PLAN.h[pk(b)] = Date.parse(PLAN.at || "") || 0; }   // keep the old date, or saving would make last period's ones current again
  const next = { o: PLAN.o, t: PLAN.t, ...(PLAN.h && Object.keys(PLAN.h).length ? { h: PLAN.h } : {}), ...(PLAN.cyc ? { cyc: PLAN.cyc } : {}), ...(PLAN.sp && Object.keys(PLAN.sp).length ? { sp: PLAN.sp } : {}), ...(PLAN.fl && PLAN.fl.length ? { fl: PLAN.fl } : {}), ...(PLAN.ex && ((PLAN.ex.off || []).length || (PLAN.ex.add || []).length) ? { ex: PLAN.ex } : {}), ...(PLAN.ot && ((PLAN.ot.off || []).length || (PLAN.ot.add || []).length) ? { ot: PLAN.ot } : {}), by: by || "?", at: new Date().toISOString() };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await gh("GET", PLAN_PATH);
      try { await gh("PUT", PLAN_PATH, { message: `Outpost plan (${next.by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next), null, 1) + "\n"), sha: f ? f.sha : undefined, branch: "main" }); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    PLAN = next; SAVED = snap(); planMsg = pt("saved"); exportOutposts(PLAN);
  } catch (e) { planMsg = pt(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  renderPlan();
}

/* Sanctuary Battle sign-ups, drawn as two example timelines (same content as the picture sent to officers) */
const SB = { ko: {"t": "🏛️ 유적 쟁탈 — 신청이 쌓이는 방식", "sub": "1시즌 = 8회 (주 1회) · 회당 점령 시즌 포인트: 유적 1 · 성채 2", "act": "직접 신청 (회마다 유적 1곳 + 성채 1곳만)", "auto": "자동 신청 (지난 회에 점령 · 무료)", "fort": "성채", "keep": "차지한 곳 유지", "keepTag": "시즌마다 교대", "rot": "매회 교대", "rotTag": "느리고 손해", "ph": "{n}회", "san": "유적", "gave": "양보함", "pts": "{n}점", "keepNote": "유지한 유적은 모두 무료 자동 신청이 되어 총수가 계속 늘어납니다. 시즌이 끝나면 어차피 모두 다시 신청하니 → 그때 다른 연맹과 유적을 바꾸면 누구도 한 회를 손해 보지 않습니다.", "rotNote": "교대할 때마다 우리는 자동 신청을 취소하고, 상대 연맹은 그 회의 유일한 직접 신청을 써서 가져가야 합니다. 아무도 유적을 쌓지 못해 양쪽 모두 매회 시즌 포인트를 잃습니다."},
 ar: {"t": "🏛️ معركة المأوى — كيف تتراكم التسجيلات", "sub": "موسم واحد = 8 مراحل (مرحلة كل أسبوع) · نقاط الموسم لكل مرحلة سيطرة: المأوى 1 · الحصن 2", "act": "تسجيل يدوي (مأوى واحد + حصن واحد فقط لكل مرحلة)", "auto": "الاشتراك التلقائي (ما سيطرنا عليه في المرحلة السابقة · مجاني)", "fort": "الحصن", "keep": "احتفظ بما نربحه", "keepTag": "التبديل كل موسم", "rot": "التبديل كل مرحلة", "rotTag": "بطيء ومكلف", "ph": "المرحلة {n}", "san": "المأوى", "gave": "تم التنازل عنه", "pts": "{n} نقطة", "keepNote": "كل مأوى نحتفظ به يصبح تسجيلًا تلقائيًا مجانيًا، فيستمر مجموعنا في الازدياد. في نهاية الموسم يعيد الجميع التسجيل على أي حال ← تبادلوا المآوي مع التحالفات الأخرى حينها؛ لا يخسر أحد مرحلة.", "rotNote": "في كل تبديل: نلغي الاشتراك التلقائي، وعلى التحالف الآخر أن يستخدم تسجيله اليدوي الوحيد في تلك المرحلة لأخذه. لا أحد يُراكم المآوي، فيخسر الطرفان نقاط الموسم في كل مرحلة."},
 pt: {"t": "🏛️ Batalha do Santuário — como as inscrições acumulam", "sub": "1 temporada = 8 fases (uma por semana) · Pontos de temporada por fase controlada: Santuário 1 · Fortaleza 2", "act": "Inscrição ativa (só 1 Santuário + 1 Fortaleza por fase)", "auto": "Inscrição automática (controlado na fase anterior · grátis)", "fort": "Fortaleza", "keep": "Manter o que ganhamos", "keepTag": "trocar por temporada", "rot": "Trocar a cada fase", "rotTag": "lento e caro", "ph": "Fase {n}", "san": "Santuário", "gave": "cedido", "pts": "{n} pts", "keepNote": "Cada Santuário que mantemos vira uma inscrição automática grátis, então nosso total continua crescendo. No fim da temporada todos se inscrevem de novo de qualquer jeito → troque Santuários com outras alianças nessa hora; não custa uma fase a ninguém.", "rotNote": "A cada troca: cancelamos nossa inscrição automática, e a outra aliança precisa gastar sua única inscrição ativa daquela fase para pegá-lo. Ninguém acumula Santuários, então os dois lados perdem pontos de temporada a cada fase."},

  en: { t: "🏛️ Sanctuary Battle — how sign-ups stack", sub: "1 season = 8 phases (one per week) · Season points per phase controlled: Sanctuary 1 · Fortress 2",
        act: "Active sign-up (only 1 Sanctuary + 1 Fortress per phase)", auto: "Auto-sign-up (controlled last phase · free)", fort: "Fortress",
        keep: "Keep what we win", keepTag: "rotate per season", rot: "Rotate every phase", rotTag: "slow & costly",
        ph: "Phase {n}", san: "Sanctuary", gave: "given away", pts: "{n} pts",
        keepNote: "Every Sanctuary we keep becomes a free auto-sign-up, so our total keeps growing. At the end of the season everyone signs up again anyway → swap Sanctuaries with other alliances then; it costs nobody a phase.",
        rotNote: "Each swap: we cancel our auto-sign-up, and the other alliance must spend their only active sign-up that phase to take it. Nobody stacks Sanctuaries, so both sides lose season points every phase." },
  zh: { t: "🏛️ 遺跡爭奪：報名怎麼累積", sub: "1 賽季 = 8 期（每週一期）· 每控制一期的賽季積分：遺跡 1 分、要塞 2 分",
        act: "主動報名（每期只能 1 座遺跡 + 1 座要塞）", auto: "自動報名（上一期控制的・免費）", fort: "要塞",
        keep: "保住打下的", keepTag: "換季時再輪換", rot: "每期輪換", rotTag: "又慢又虧",
        ph: "第 {n} 期", san: "遺跡", gave: "讓出", pts: "{n} 分",
        keepNote: "每保住一座遺跡，下一期就變成免費的自動報名，總數會一直往上加。賽季結束時大家本來就要重新報名 → 那時再和其他聯盟交換遺跡，誰都不會少一期。",
        rotNote: "每換一次：我們要取消自動報名，對方也得花掉當期唯一的主動報名來接手。沒有人能累積遺跡，兩邊每期都少拿賽季積分。" },
};
function renderSB() {
  const t = SB[lang] || SB.en, f = (s, n) => s.replace("{n}", n);
  const c = (cls, txt) => `<span class="sb-c sb-${cls}">${esc(txt)}</span>`;
  const row = (n, chips, pts, low) => `<div class="sb-row"><span class="sb-ph">${esc(f(t.ph, n))}</span><div class="sb-chips">${chips.join("")}</div><span class="sb-pts${low ? " low" : ""}">${esc(f(t.pts, pts))}</span></div>`;
  const keep = [row(1, [c("act", t.san + " A"), c("fort", t.fort)], 3),
    row(2, [c("auto", "A"), c("act", t.san + " B"), c("fort", t.fort)], 4),
    row(3, [c("auto", "A"), c("auto", "B"), c("act", t.san + " C"), c("fort", t.fort)], 5)];
  const rot = [row(1, [c("act", t.san + " A"), c("fort", t.fort)], 3),
    row(2, [c("gone", "A → " + t.gave), c("act", t.san + " B"), c("fort", t.fort)], 3, true),
    row(3, [c("gone", "B → " + t.gave), c("act", t.san + " C"), c("fort", t.fort)], 3, true)];
  $("km_sb").innerHTML = `<div class="pl-sub" style="margin:0 0 2px">${esc(t.t)}</div><div class="muted" style="font-size:12.5px">${esc(t.sub)}</div>
    <div class="sb-legend"><span><i class="sb-act"></i>${esc(t.act)}</span><span><i class="sb-auto"></i>${esc(t.auto)}</span><span><i class="sb-fort"></i>${esc(t.fort)}</span></div>
    <div class="sb-h">${esc(t.keep)} <span class="sb-tag sb-good">${esc(t.keepTag)}</span></div>${keep.join("")}<div class="sb-note">${esc(t.keepNote)}</div>
    <div class="sb-h">${esc(t.rot)} <span class="sb-tag sb-bad">${esc(t.rotTag)}</span></div>${rot.join("")}<div class="sb-note red">${esc(t.rotNote)}</div>`;
}
/* 📍 MightPulse's live map of every city in #2189 (their site, shown inside ours; opened only when asked, so the tab stays fast) */
const MP_URL = "https://mightpulse.com/map?kid=2189";
const MP = { zh: { t: "📍 城市地圖（MightPulse）", s: "王國裡每座城堡的位置、聯盟、護盾狀態，資料來自 MightPulse；位置是他們上次掃描時的，可能是幾週前。", show: "在這裡顯示地圖", hide: "收起地圖", open: "在 MightPulse 開啟 ↗", note: "如果下面是空白或顯示拒絕連線，代表 MightPulse 不允許嵌入，請改用「在 MightPulse 開啟」。" },
  en: { t: "📍 City map (MightPulse)", s: "Every city in the kingdom with its alliance and shield status, from MightPulse — positions are from their last scan and can be weeks old.", show: "Show the map here", hide: "Hide the map", open: "Open on MightPulse ↗", note: "If the box below stays blank or says it refused to connect, MightPulse doesn't allow embedding — use “Open on MightPulse”." },
  pt: { t: "📍 Mapa de cidades (MightPulse)", s: "Todas as cidades do reino com aliança e escudo, do MightPulse — as posições são da última varredura deles e podem ter semanas.", show: "Mostrar o mapa aqui", hide: "Esconder o mapa", open: "Abrir no MightPulse ↗", note: "Se a caixa abaixo ficar em branco ou recusar a conexão, o MightPulse não permite incorporar — use “Abrir no MightPulse”." },
  ko: { t: "📍 도시 지도 (MightPulse)", s: "왕국의 모든 성 위치, 연맹, 보호막 상태 — MightPulse 데이터. 위치는 마지막 스캔 기준이라 몇 주 전일 수 있어요.", show: "여기에 지도 보기", hide: "지도 접기", open: "MightPulse에서 열기 ↗", note: "아래가 비어 있거나 연결이 거부되면 MightPulse가 삽입을 허용하지 않는 것이니 “MightPulse에서 열기”를 사용하세요." },
  ar: { t: "📍 خريطة المدن (MightPulse)", s: "كل مدن المملكة مع التحالف وحالة الدرع، من MightPulse — المواقع من آخر مسح لديهم وقد تكون قديمة بأسابيع.", show: "اعرض الخريطة هنا", hide: "إخفاء الخريطة", open: "افتح في MightPulse ↗", note: "إن بقي المربع أدناه فارغًا أو رفض الاتصال فإن MightPulse لا يسمح بالتضمين — استخدم «افتح في MightPulse»." } };
let mpOpen = false;
function renderMp() {
  const box = $("km_mp"); if (!box) return;
  const t = MP[lang] || MP.en;
  box.innerHTML = `<h3>${t.t}</h3><div class="muted" style="font-size:13px">${t.s}</div>
    <div class="row" style="margin-top:8px"><button type="button" class="btn" id="km_mpTog">${mpOpen ? t.hide : t.show}</button><a class="btn" href="${MP_URL}" target="_blank" rel="noopener">${t.open}</a></div>
    ${mpOpen ? `<div class="muted" style="font-size:12px;margin-top:6px">${t.note}</div><iframe src="${MP_URL}" title="MightPulse map" loading="lazy" referrerpolicy="no-referrer"></iframe>` : ""}`;
  $("km_mpTog").onclick = () => { mpOpen = !mpOpen; renderMp(); };
}
/* 🚩 Banner plan: an Alliance Banner claims the 7×7 tiles around it (confirmed in game 2026-10-16: the build preview of a banner at
   X:531 Y:919). Who owns which tile comes from data/territory-2189-grid.png — one pixel per tile (red channel: 0 free · 1 ours · 2 another
   alliance), read from the officers' screenshots (same date as the 🛰️ picture), so it can be 1–2 tiles off. Built first = owned: tiles another
   alliance already holds stay theirs; the banners are counted in list order. Saved with the plan (PLAN.fl = [[x, y], …]). */
const FT = { zh: { t: "🚩 插旗規劃", hint: "每面聯盟旗幟佔 7×7 格（旗子在正中間），領地要跟現有、連到總部的領地接壤，可以一面接一面延伸。先蓋的優先：別人已經佔的格子不會算給我們，所以照清單順序計算。地圖上藍格 = 這面旗子新增的領地，紅格 = 已經是別人的。",
    on: "🚩 點地圖放旗：開", off: "🚩 點地圖放旗：關", tapHint: "放大地圖後點一格就會放一面旗子；之後可以在下面改座標。", add: "＋ 加入",
    row: "+{n} 格", lost: "{n} 格是別人的", notConn: "⚠️ 沒接到我們的領地（失效旗幟：沒有領地加成，也不能讓後面的旗子接上）", onOther: "❌ 旗子位置是別人的領地", total: "共 {f} 面旗 · 新增 {n} 格",
    empty: "還沒有規劃旗子。", obst: "⛰️ 障礙物／禁建區", ot: "🏴 其他聯盟", putKind: "點地圖放的是：", cont: "🏁 有爭奪權（領地碰到這個據點）：", contNone: "🏁 目前沒有聯盟的領地碰到這個據點，沒人有爭奪權。", hqP: "【平原】總部", hqB: "【荒野】總部", conv: "上面全部 {n} 面改成：", conv1: "改成：", otHint: "現在點地圖空的地方，就會放一面 🏴 {n}（點到已經有的旗子＝選它來改）。改完記得按 💾 儲存規劃。", ourPlan: "🚩 我們的規劃旗", ex: "🏳️ 現有旗子", exNote: "🏳️ 現有旗子 {n} 面（深藍 = 在遊戲裡確認過的 {c} 面，淺藍 = 從領地圖推算，可能差幾格）。", dl: "⬇️ 下載旗子座標（CSV）", dl2: "⬇️ 下載其他聯盟旗子（CSV）", onMt: "❌ 旗子位置是山", onLake: "❌ 旗子位置是湖", inZone: "❌ 在禁建區（{n}）", del: "移除", up: "上移", save: "改完記得按上面的「💾 儲存規劃」，其他幹部才看得到。",
    note: "領地資料來自 {d} 的截圖，可能差 1～2 格，別人的領地之後也會變；實際插旗前請在遊戲裡確認。", loading: "讀取領地資料中…",
    selP: "🚩 規劃旗 #{n}", selE: "🏳️ 聯盟旗幟", conf: "遊戲裡確認過", est: "推算位置", built: "✅ 已蓋好", gone: "🗑️ 已拆除", fix: "修正座標", editNote: "改完要按「💾 儲存規劃」才會存起來。", tapSel: "點地圖上的旗子可以修改或刪除。" },
  ko: { t: "🚩 깃발 계획", hint: "연맹 깃발 하나는 7×7칸을 차지해요(깃발이 한가운데). 영지는 본부까지 이어진 기존 연맹 영지와 맞닿아야 하고, 깃발을 하나씩 이어서 넓힐 수 있어요. 먼저 세운 쪽이 우선: 다른 연맹이 이미 가진 칸은 우리 것이 되지 않으니 목록 순서대로 계산해요. 지도에서 파란 칸 = 이 깃발로 새로 생기는 영지, 빨간 칸 = 이미 다른 연맹 것.",
    on: "🚩 지도를 눌러 배치: 켜짐", off: "🚩 지도를 눌러 배치: 꺼짐", tapHint: "지도를 확대한 뒤 칸을 누르면 깃발이 놓여요. 좌표는 아래에서 고칠 수 있어요.", add: "+ 추가",
    row: "+{n}칸", lost: "{n}칸은 다른 연맹 것", notConn: "⚠️ 우리 영지와 이어지지 않음 (무효 깃발: 영지 보너스 없음, 뒤의 깃발도 이걸로 이어질 수 없음)", onOther: "❌ 깃발 자리가 다른 연맹 영지", total: "깃발 {f}개 · +{n}칸",
    empty: "아직 계획한 깃발이 없어요.", obst: "⛰️ 장애물 / 금지 구역", ot: "🏴 다른 연맹", putKind: "지도에 놓을 것:", cont: "🏁 쟁탈 가능 (영지가 이 거점에 닿음):", contNone: "🏁 이 거점에 닿은 연맹 영지가 없어 쟁탈 가능한 연맹이 없어요.", hqP: "[평원] 본부", hqB: "[황야] 본부", conv: "위의 {n}개 모두 바꾸기:", conv1: "바꾸기:", otHint: "이제 지도의 빈 곳을 누르면 🏴 {n} 깃발이 놓여요 (있는 깃발을 누르면 그 깃발을 선택). 끝나면 💾 계획 저장.", ourPlan: "🚩 우리 계획 깃발", ex: "🏳️ 우리 깃발", exNote: "🏳️ 세워진 깃발 {n}개 (진한 파랑 = 게임에서 확인한 {c}개, 연한 파랑 = 영지 그림에서 추정, 몇 칸 차이 날 수 있음).", dl: "⬇️ 깃발 좌표 다운로드 (CSV)", dl2: "⬇️ 다른 연맹 깃발 다운로드 (CSV)", onMt: "❌ 깃발 자리가 산", onLake: "❌ 깃발 자리가 호수", inZone: "❌ 금지 구역 안 ({n})", del: "삭제", up: "위로", save: "다른 간부도 보려면 위의 「💾 계획 저장」을 눌러 주세요.",
    note: "영지 정보는 {d} 스크린샷 기준이라 1~2칸 차이 날 수 있고, 다른 연맹 영지도 바뀌어요. 실제로 세우기 전에 게임에서 확인하세요.", loading: "영지 정보 불러오는 중…",
    selP: "🚩 계획한 깃발 #{n}", selE: "🏳️ 연맹 깃발", conf: "게임에서 확인", est: "추정 위치", built: "✅ 세웠어요", gone: "🗑️ 철거됨", fix: "좌표 고치기", editNote: "바꾼 뒤 「💾 계획 저장」을 눌러야 저장돼요.", tapSel: "깃발을 누르면 고치거나 삭제할 수 있어요." },
  pt: { t: "🚩 Plano de Estandartes", hint: "Cada Estandarte da Aliança ocupa 7×7 casas (o estandarte no meio). O território precisa encostar no Território já ligado ao QG, então os estandartes vão em corrente, um depois do outro. Quem constrói primeiro fica com a casa: casas que outra aliança já tem continuam dela, por isso a lista conta na ordem. No mapa, azul = território novo desse estandarte, vermelho = já é de outra aliança.",
    on: "🚩 Tocar no mapa para pôr: LIGADO", off: "🚩 Tocar no mapa para pôr: DESLIGADO", tapHint: "Amplie o mapa e toque numa casa para pôr um estandarte; ajuste as coordenadas abaixo.", add: "+ Adicionar",
    row: "+{n} casas", lost: "{n} casas são de outra aliança", notConn: "⚠️ Não está ligado ao nosso território (inativo: sem bônus de território, e os próximos não se ligam por ele)", onOther: "❌ A casa do estandarte é de outra aliança", total: "{f} estandartes · +{n} casas",
    empty: "Nenhum estandarte planejado ainda.", obst: "⛰️ Obstáculos / Área Proibida", ot: "🏴 Outras alianças", putKind: "Tocar no mapa coloca:", cont: "🏁 Podem disputar (território encosta neste Posto):", contNone: "🏁 Nenhum território encosta neste Posto; ninguém pode disputá-lo.", hqP: "QG das [Planícies]", hqB: "QG da [Terra Maligna]", conv: "Mudar todos os {n} acima para:", conv1: "Mudar para:", otHint: "Agora toque num lugar vazio do mapa para colocar um 🏴 {n} (tocar num estandarte existente o seleciona). Depois toque em 💾 Salvar plano.", ourPlan: "🚩 Nosso estandarte planejado", ex: "🏳️ Nossos estandartes", exNote: "🏳️ {n} estandartes de pé (escuro = conferido no jogo: {c}, claro = estimado pela imagem do território, pode errar umas casas).", dl: "⬇️ Baixar coordenadas dos estandartes (CSV)", dl2: "⬇️ Baixar estandartes de outras alianças (CSV)", onMt: "❌ A casa do estandarte é montanha", onLake: "❌ A casa do estandarte é lago", inZone: "❌ Numa Área Proibida ({n})", del: "Remover", up: "Subir", save: "Toque em 💾 Salvar plano acima para os outros oficiais verem.",
    note: "Território lido de capturas de {d}; pode errar 1–2 casas e as outras alianças mudam — confira no jogo antes de construir.", loading: "Carregando o território…",
    selP: "🚩 Estandarte planejado #{n}", selE: "🏳️ Estandarte da Aliança", conf: "conferido no jogo", est: "posição estimada", built: "✅ Construído", gone: "🗑️ Demolido", fix: "Corrigir coordenadas", editNote: "Depois de mudar, toque em 💾 Salvar plano.", tapSel: "Toque num estandarte para editar ou remover." },
  ar: { t: "🚩 خطة اللافتات", hint: "كل لافتة تحالف تأخذ 7×7 مربعات (اللافتة في الوسط). يجب أن يلامس إقليمها إقليمًا متصلًا بالمقر، فتمتد اللافتات واحدة بعد الأخرى. من يبني أولًا يملك: المربعات التي يملكها تحالف آخر تبقى له، لذلك تُحسب القائمة بالترتيب. على الخريطة: الأزرق = إقليم جديد من هذه اللافتة، الأحمر = لتحالف آخر.",
    on: "🚩 الضغط على الخريطة للوضع: يعمل", off: "🚩 الضغط على الخريطة للوضع: متوقف", tapHint: "كبّر الخريطة واضغط على مربع لوضع لافتة؛ عدّل الإحداثيات بالأسفل.", add: "+ إضافة",
    row: "+{n} مربع", lost: "{n} مربع لتحالف آخر", notConn: "⚠️ غير متصلة بإقليمنا (غير فعالة: لا مكافأة إقليم، ولا تتصل بها اللافتات التالية)", onOther: "❌ مربع اللافتة لتحالف آخر", total: "{f} لافتة · +{n} مربع",
    empty: "لا توجد لافتات مخططة بعد.", obst: "⛰️ عوائق / المنطقة المحظورة", ot: "🏴 تحالفات أخرى", putKind: "الضغط على الخريطة يضع:", cont: "🏁 يمكنهم المنافسة (إقليمهم يلامس هذه المستوطنة):", contNone: "🏁 لا يوجد إقليم يلامس هذه المستوطنة؛ لا أحد يمكنه المنافسة عليها.", hqP: "مقر [السهول]", hqB: "مقر [أرض الشر]", conv: "تحويل كل الـ {n} أعلاه إلى:", conv1: "تحويل إلى:", otHint: "اضغط الآن على مكان فارغ في الخريطة لوضع 🏴 {n} (الضغط على لافتة موجودة يحددها). ثم اضغط 💾 حفظ الخطة.", ourPlan: "🚩 لافتتنا المخططة", ex: "🏳️ لافتاتنا", exNote: "🏳️ {n} لافتة قائمة (الداكن = تم التحقق في اللعبة: {c}، الفاتح = تقدير من صورة الإقليم وقد يخطئ ببضعة مربعات).", dl: "⬇️ تنزيل إحداثيات اللافتات (CSV)", dl2: "⬇️ تنزيل لافتات التحالفات الأخرى (CSV)", onMt: "❌ مربع اللافتة جبل", onLake: "❌ مربع اللافتة بحيرة", inZone: "❌ داخل المنطقة المحظورة ({n})", del: "حذف", up: "للأعلى", save: "اضغط 💾 حفظ الخطة بالأعلى ليراها الضباط الآخرون.",
    note: "الإقليم مأخوذ من لقطات {d}؛ قد يخطئ بمربع أو اثنين والتحالفات الأخرى تتغير — تحقق في اللعبة قبل البناء.", loading: "جارٍ تحميل الإقليم…",
    selP: "🚩 لافتة مخططة #{n}", selE: "🏳️ لافتة التحالف", conf: "تم التحقق في اللعبة", est: "موقع تقديري", built: "✅ تم البناء", gone: "🗑️ أُزيلت", fix: "تصحيح الإحداثيات", editNote: "بعد التغيير اضغط 💾 حفظ الخطة.", tapSel: "اضغط على لافتة لتعديلها أو حذفها." },

  en: { t: "🚩 Banner plan", hint: "Each Alliance Banner claims 7×7 tiles (banner in the middle); its territory must border territory already linked to the HQ, so banners chain one after another. Built first = owned: tiles another alliance already holds stay theirs, so the list is counted in order. On the map, blue tiles = new territory from that banner, red = already someone else's.",
    on: "🚩 Tap map to place: ON", off: "🚩 Tap map to place: OFF", tapHint: "Zoom in and tap a tile to drop a banner; fine-tune the coordinates below.", add: "+ Add",
    row: "+{n} tiles", lost: "{n} tiles are someone else's", notConn: "⚠️ Not connected to our territory (inactive: no Territory Bonus, and later banners can't connect through it)", onOther: "❌ Banner tile is another alliance's", total: "{f} banners · +{n} tiles",
    empty: "No banners planned yet.", obst: "⛰️ Obstacles / no-build", ot: "🏴 Other alliances", putKind: "Tapping the map places:", cont: "🏁 Can contest (territory touches this Outpost):", contNone: "🏁 No alliance territory touches this Outpost, so nobody can contest it.", hqP: "[Plains] HQ", hqB: "[Badland] HQ", conv: "Change all {n} above to:", conv1: "Change to:", otHint: "Now tap an empty spot on the map to place a 🏴 {n} (tapping an existing banner selects it). Then press 💾 Save plan.", ourPlan: "🚩 Our planned banner", ex: "🏳️ Our banners", exNote: "🏳️ {n} banners standing (dark = checked in game: {c}, light = estimated from the territory picture, can be a few tiles off).", dl: "⬇️ Download banner coordinates (CSV)", dl2: "⬇️ Download other alliances' banners (CSV)", onMt: "❌ Banner tile is a mountain", onLake: "❌ Banner tile is a lake", inZone: "❌ In a no-build zone ({n})", del: "Remove", up: "Move up", save: "Press 💾 Save plan above so the other officers see it.",
    note: "Territory read from screenshots taken {d}; it can be 1–2 tiles off and other alliances move — check in game before building.", loading: "Loading territory data…",
    selP: "🚩 Planned banner #{n}", selE: "🏳️ Alliance Banner", conf: "checked in game", est: "estimated position", built: "✅ Built", gone: "🗑️ Demolished", fix: "Fix coordinates", editNote: "Press 💾 Save plan to keep the change.", tapSel: "Tap a banner on the map to edit or remove it." } };
const ft = (k) => (FT[lang] || FT.en)[k];
const FN = 1200, FR = 3;   // kingdom size · banner reach (7×7 = 3 tiles each side)
let EXB = null, exOn = (() => { try { return localStorage.getItem("km-exb") !== "0"; } catch (e) { return true; } })();   // 🏳️ our banners already standing (data/banners-2189.json)
/* edits officers make to the standing banners (saved with the plan): PLAN.ex = { off: ["x,y" demolished / moved away], add: [[x, y] built / corrected] } */
const exList = () => { const e = PLAN.ex || {}, off = new Set(e.off || []);
  return (EXB ? EXB.b.filter(([x, y]) => !off.has(x + "," + y)) : []).concat((e.add || []).map(([x, y]) => [x, y, 1])); };
let OV = null;   // GRID with the officers' banner edits applied
function rebuildOwn() {
  if (!GRID) { OV = null; return; }
  OV = GRID.slice(); const e = PLAN.ex || {}, keep = exList();
  const sq = (x, y, f) => { for (let i = x - FR; i <= x + FR; i++) for (let j = y - FR; j <= y + FR; j++) if (i >= 0 && j >= 0 && i < FN && j < FN) f(j * FN + i); };
  for (const k of e.off || []) { const [x, y] = k.split(",").map(Number); sq(x, y, (t) => { if (OV[t] === 1 && !(ZONE && ZONE[t])) OV[t] = 0; }); }
  for (const [x, y] of keep) sq(x, y, (t) => { if (OV[t] !== 2) OV[t] = 1; });
  for (const [x, y] of G.hq || []) for (let i = x - 6; i <= x + 8; i++) for (let j = y - 6; j <= y + 8; j++) OV[j * FN + i] = 1;
}
/* 🏴 other alliances' banners (data/banners-others-2189.json, from the territory overlay — estimates): own layer, never mixed with ours */
let OTB = null, otOn = (() => { try { return localStorage.getItem("km-otb") === "1"; } catch (e) { return false; } })();
async function loadOt() { try { OTB = await fetch("data/banners-others-2189.json?v=2").then((r) => r.json()); } catch (e) { OTB = null; } drawOt(); renderFlags(); memRefresh(); }
/* officers' fixes (saved with the plan): PLAN.ot = { off: ["UNI:x,y" gone / moved away], add: [["UNI", x, y] built / corrected] } */
const otCol = (n) => (OTB && OTB.a[n] && OTB.a[n].c) || "#999";
const otList = () => { if (!OTB) return []; const o = PLAN.ot || {}, off = new Set(o.off || []), out = [];
  for (const [n, a] of Object.entries(OTB.a)) for (const [x, y] of a.b) if (!off.has(`${n}:${x},${y}`)) out.push([n, x, y, 0]);
  for (const [n, x, y] of o.add || []) out.push([n, x, y, 1]); return out; };
const otEd = () => (PLAN.ot = PLAN.ot || { off: [], add: [] }, PLAN.ot.off = PLAN.ot.off || [], PLAN.ot.add = PLAN.ot.add || [], PLAN.ot.hq = PLAN.ot.hq || [], PLAN.ot);
/* other alliances' [Plains] HQ: PLAN.ot.hq = [["UNI", x, y]] — X, Y = the 3×3 building's corner like ours; it claims 15×15 (6 tiles around) */
const hqLbl = (t) => ft(t === 2 ? "hqB" : "hqP");
const otHq = () => (PLAN.ot && PLAN.ot.hq) || [];
/* ⚔️ Outpost contest: an Outpost takes 15×15 tiles (its X, Y − 6 … + 8, e.g. X 1068 → 1062–1076). An alliance can contest it
   when any of its territory is inside that square or right next to it (sharing an edge). Ours = our banners + HQs;
   other alliances = their 🏴 banners (7×7) + 🏯 HQs (15×15). */
const opSq = (b) => [b.x - 6, b.y - 6, b.x + 8, b.y + 8];
const ovl = (a0, a1, b0, b1) => a0 <= b1 && b0 <= a1;
const rTouch = ([x0, y0, x1, y1], [p0, q0, p1, q1]) => (ovl(p0, p1, x0 - 1, x1 + 1) && ovl(q0, q1, y0, y1)) || (ovl(p0, p1, x0, x1) && ovl(q0, q1, y0 - 1, y1 + 1));   // inside the square or sharing an edge with it
function contesters(b) {
  const sq = opSq(b), out = [], [x0, y0, x1, y1] = sq;
  // ours: only our real banners (7×7) and HQs (15×15) — the territory picture is a few tiles off at the edges, so it is not used here
  if (EXB && (exList().some(([x, y]) => rTouch(sq, [x - FR, y - FR, x + FR, y + FR])) || (G.hq || []).some(([x, y]) => rTouch(sq, [x - 6, y - 6, x + 8, y + 8])))) out.push("NXS");
  if (OTB) { const seen = new Set();
    for (const [n, x, y] of otList()) if (!seen.has(n) && rTouch(sq, [x - FR, y - FR, x + FR, y + FR])) seen.add(n);
    for (const [n, x, y] of otHq()) if (!seen.has(n) && rTouch(sq, [x - 6, y - 6, x + 8, y + 8])) seen.add(n);
    out.push(...seen); }
  return out;
}
const otDrop = (n, x, y) => { const o = otEd(), j = o.add.findIndex(([m, a, b]) => m === n && a === x && b === y); if (j >= 0) o.add.splice(j, 1); else if (!o.off.includes(`${n}:${x},${y}`)) o.off.push(`${n}:${x},${y}`); };
let otKind = "";   // 🚩 tap-to-place puts: "" = our planned banner, or an alliance name
function drawOt() {
  const g = $("km_otG"); if (!g) return;
  g.innerHTML = otOn && OTB ? otList().map(([n, x, y]) => `<polygon points="${pts([[x - FR, y - FR], [x + FR + 1, y - FR], [x + FR + 1, y + FR + 1], [x - FR, y + FR + 1]])}" fill="${otCol(n)}" fill-opacity=".55" stroke="#000" stroke-opacity=".6" stroke-width=".35"/>`).join("")
    + otHq().map(([n, x, y]) => { const [X, Y] = P(x + 1.5, y + 1.5); return `<polygon points="${pts([[x - 6, y - 6], [x + 9, y - 6], [x + 9, y + 9], [x - 6, y + 9]])}" fill="${otCol(n)}" fill-opacity=".55" stroke="#000" stroke-opacity=".6" stroke-width=".35"/><polygon points="${pts([[x, y], [x + 3, y], [x + 3, y + 3], [x, y + 3]])}" fill="#1b1b1b" fill-opacity=".75" stroke="#fff" stroke-width=".4"/><text x="${X}" y="${Y + 1}" text-anchor="middle" font-family="Arial" font-size="3" font-weight="800" fill="#fff">HQ</text>`; }).join("") : "";
}
async function loadEx() { try { EXB = await fetch("data/banners-2189.json?v=20").then((r) => r.json()); } catch (e) { EXB = null; } rebuildOwn(); drawEx(); drawFlags(); renderFlags(); memRefresh(); }
function drawEx() {
  const g = $("km_exG"); if (!g) return;
  // our two HQs claim 15×15 too (3×3 building from its X, Y + 6 tiles around)
  const hq = exOn ? (G.hq || []).map(([x, y]) => `<polygon points="${pts([[x - 6, y - 6], [x + 9, y - 6], [x + 9, y + 9], [x - 6, y + 9]])}" fill="rgba(30,120,255,.42)" stroke="#9fd0ff" stroke-width=".5"/>`).join("") : "";
  g.innerHTML = hq + (exOn && EXB ? exList().map(([x, y, c]) => `<polygon points="${pts([[x - FR, y - FR], [x + FR + 1, y - FR], [x + FR + 1, y + FR + 1], [x - FR, y + FR + 1]])}" fill="rgba(30,120,255,.42)" stroke="#9fd0ff" stroke-width=".35"/><polygon points="${tilePts(x, y)}" fill="${c ? "#0b3d91" : "#2a6fd6"}" stroke="#fff" stroke-width=".35"/>`).join("") : "");
}
let GRID = null, OBST = null, ZONE = null, ZNAME = [], flagMode = false;
let obstOn = (() => { try { return localStorage.getItem("km-obst") === "1"; } catch (e) { return false; } })();
/* 🚫 no-build zones (same for every kingdom): a square around each building — Fortress / Sanctuary 60 tiles, Outpost 15 tiles —
   and the ring around the King's Castle. Buildings are anchored at their X, Y and take 6×6 (Fortress, Sanctuary) or 3×3 (Outpost) tiles. */
function buildZones() {
  ZONE = new Uint16Array(FN * FN); ZNAME = [""];
  const mark = (x1, y1, x2, y2, name) => { ZNAME.push(name); const n = ZNAME.length - 1;
    for (let x = Math.max(0, x1); x <= Math.min(FN - 1, x2); x++) for (let y = Math.max(0, y1); y <= Math.min(FN - 1, y2); y++) if (!ZONE[y * FN + x]) ZONE[y * FN + x] = n; };
  mark(586, 586, 613, 613, castleName());
  for (const b of B) {
    if (b.kind !== "fortress" && b.kind !== "sanctuary" && b.kind !== "outpost") continue;
    const sz = b.kind === "outpost" ? 3 : 6, fz = b.kind === "outpost" ? 15 : 60;
    const x1 = Math.round(b.x + sz / 2 - fz / 2), r1 = Math.round((FN - b.y - sz) + sz / 2 - fz / 2);   // rows run the other way: row = 1199 − Y
    mark(x1, FN - 1 - (r1 + fz - 1), x1 + fz - 1, FN - 1 - r1, nm(b));
  }
}
const obstAt = (x, y) => OBST && x >= 0 && y >= 0 && x < FN && y < FN ? OBST[y * FN + x] : 0;   // 1 mountain · 2 lake
const zoneAt = (x, y) => ZONE && x >= 0 && y >= 0 && x < FN && y < FN ? ZONE[y * FN + x] : 0;
/* ⛰️ map layer: mountains, lakes and no-build zones as one picture, one pixel per tile */
function drawObst() {
  const im = $("km_obst"); if (!im || !OBST) return;
  if (!im.getAttribute("href")) {
    const c = document.createElement("canvas"); c.width = FN; c.height = FN; const x = c.getContext("2d"), d = x.createImageData(FN, FN);
    for (let i = 0; i < FN * FN; i++) { const o = OBST[i], z = ZONE[i], k = i * 4;
      if (o === 1) { d.data[k] = 120; d.data[k + 1] = 120; d.data[k + 2] = 132; d.data[k + 3] = 235; }
      else if (o === 2) { d.data[k] = 40; d.data[k + 1] = 110; d.data[k + 2] = 200; d.data[k + 3] = 235; }
      else if (z) { d.data[k] = 220; d.data[k + 1] = 40; d.data[k + 2] = 40; d.data[k + 3] = 60; } }
    x.putImageData(d, 0, 0); const u = c.toDataURL(); im.setAttribute("href", u); im.setAttributeNS("http://www.w3.org/1999/xlink", "href", u);
  }
  im.style.display = obstOn ? "" : "none";
}
function loadGrid() {
  const im = new Image();
  im.onload = () => { try { const c = document.createElement("canvas"); c.width = FN; c.height = FN; const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, FN, FN).data; GRID = new Uint8Array(FN * FN); OBST = new Uint8Array(FN * FN);
    for (let i = 0; i < FN * FN; i++) { GRID[i] = d[i * 4]; OBST[i] = d[i * 4 + 1]; } } catch (e) {} buildZones(); rebuildOwn(); drawObst(); drawFlags(); renderFlags(); memRefresh(); };
  im.src = "data/territory-2189-grid.png?v=20";
}
const own = (x, y) => (x < 0 || y < 0 || x >= FN || y >= FN) ? 2 : OV ? OV[y * FN + x] : GRID ? GRID[y * FN + x] : 0;   // 0 free · 1 ours · 2 another alliance
/* every banner in list order → its new tiles, the tiles another alliance holds, and whether it touches our territory */
function flagCalc() {
  const mine = new Set(), out = [];
  for (const [fx, fy] of PLAN.fl || []) {
    const fresh = [], lost = []; let conn = false;
    for (let x = fx - FR; x <= fx + FR; x++) for (let y = fy - FR; y <= fy + FR; y++) {
      const o = own(x, y), k = x * FN + y;
      if (o === 2) { lost.push([x, y]); continue; }
      if (o === 1 || mine.has(k)) { conn = true; continue; }
      fresh.push([x, y]);
    }
    // in-game rules 3–4: a banner's territory must border (share an edge with) territory that already reaches the HQ
    if (!conn) for (let x = fx - FR; x <= fx + FR && !conn; x++) for (const y of [fy - FR - 1, fy + FR + 1]) if (own(x, y) === 1 || mine.has(x * FN + y)) conn = true;
    if (!conn) for (let y = fy - FR; y <= fy + FR && !conn; y++) for (const x of [fx - FR - 1, fx + FR + 1]) if (own(x, y) === 1 || mine.has(x * FN + y)) conn = true;
    if (conn) fresh.forEach(([x, y]) => mine.add(x * FN + y));   // a cut-off banner is inactive: later banners can't lean on it
    out.push({ x: fx, y: fy, fresh, lost, conn, onOther: own(fx, fy) === 2, ob: obstAt(fx, fy), zone: ZNAME[zoneAt(fx, fy)] || "" });
  }
  return out;
}
const tilePts = (x, y) => pts([[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]);
function drawFlags() {
  const g = $("km_flagG"); if (!g) return;
  g.innerHTML = flagCalc().map((f, i) => {
    const [X, Y] = P(f.x + .5, f.y + .5);
    return `<g>${f.fresh.map(([x, y]) => `<polygon points="${tilePts(x, y)}" fill="rgba(60,150,255,.55)"/>`).join("")}${f.lost.map(([x, y]) => `<polygon points="${tilePts(x, y)}" fill="rgba(230,50,50,.6)"/>`).join("")}`
      + `<polygon points="${pts([[f.x - FR, f.y - FR], [f.x + FR + 1, f.y - FR], [f.x + FR + 1, f.y + FR + 1], [f.x - FR, f.y + FR + 1]])}" fill="none" stroke="${f.conn && !f.onOther && !f.ob && !f.zone ? "#fff" : "#ffb020"}" stroke-width=".5"/>`
      + `<polygon points="${tilePts(f.x, f.y)}" fill="#0b3d91" stroke="#fff" stroke-width=".25"/><text x="${X}" y="${Y - 1.6}" text-anchor="middle" font-family="Arial" font-size="2.6" font-weight="800" fill="#fff" stroke="#0b3d91" stroke-width=".5" paint-order="stroke">${i + 1}</text></g>`;
  }).join("");
}
function renderFlags() {
  const el = $("km_flags"); if (!el) return;
  const fl = flagCalc(), ed = ME(), tot = fl.reduce((a, f) => a + f.fresh.length, 0);
  el.innerHTML = `<h3 style="margin-bottom:2px">${esc(ft("t"))}</h3><div class="muted" style="font-size:12.5px">${esc(ft("hint"))}</div>`
    + (GRID ? "" : `<div class="muted" style="font-size:12px;margin-top:6px">${esc(ft("loading"))}</div>`)
    + (ed ? `<div class="row km-fl-add" style="margin-top:10px"><button type="button" class="btn${flagMode ? " primary" : ""}" id="fl_mode">${esc(ft(flagMode ? "on" : "off"))}</button>
        <label>X <input id="fl_x" type="number" min="0" max="1199" inputmode="numeric"></label><label>Y <input id="fl_y" type="number" min="0" max="1199" inputmode="numeric"></label><button type="button" class="btn" id="fl_add">${esc(ft("add"))}</button><button type="button" class="btn tg${obstOn ? " primary" : ""}" id="fl_obst">${esc(ft("obst"))}</button><button type="button" class="btn tg${exOn ? " primary" : ""}" id="fl_ex">${esc(ft("ex"))}</button><button type="button" class="btn tg${otOn ? " primary" : ""}" id="fl_ot">${esc(ft("ot"))}</button>${otOn && OTB ? `<span class="muted" style="font-size:12px;align-self:center">${Object.entries(OTB.a).map(([n, a]) => `<span style="color:${a.c}">■</span> ${esc(n)}`).join(" · ")}</span>` : ""}</div>
        ${OTB ? `<div class="row" style="margin-top:6px;gap:6px;align-items:center"><span class="muted" style="font-size:12.5px">${esc(ft("putKind"))}</span><select class="btn${flagMode && otKind ? " primary" : ""}" id="fl_kind"><option value="">${esc(ft("ourPlan"))}</option>${Object.keys(OTB.a).map((n) => `<option value="${esc(n)}"${otKind === n ? " selected" : ""}>🏴 ${esc(n)}</option>`).join("")}${Object.keys(OTB.a).map((n) => `<option value="h:${esc(n)}"${otKind === "h:" + n ? " selected" : ""}>🏯 ${esc(n)} ${esc(ft("hqP"))}</option>`).join("")}${Object.keys(OTB.a).map((n) => `<option value="b:${esc(n)}"${otKind === "b:" + n ? " selected" : ""}>🏯 ${esc(n)} ${esc(ft("hqB"))}</option>`).join("")}</select></div>` : ""}
        ${flagMode ? `<div class="muted" style="font-size:12px;margin-top:4px${otKind ? ";color:var(--accent,#ffb020);font-weight:700" : ""}">${esc(otKind ? ft("otHint").replace("🏴 {n}", /^[hb]:/.test(otKind) ? "🏯 " + otKind.slice(2) + " " + hqLbl(otKind[0] === "b" ? 2 : 1) : "🏴 " + otKind).replace("一面 🏯", "一個 🏯") : ft("tapHint"))}</div>` : ""}` : `<div class="row" style="margin-top:10px"><button type="button" class="btn tg${obstOn ? " primary" : ""}" id="fl_obst">${esc(ft("obst"))}</button><button type="button" class="btn tg${exOn ? " primary" : ""}" id="fl_ex">${esc(ft("ex"))}</button><button type="button" class="btn tg${otOn ? " primary" : ""}" id="fl_ot">${esc(ft("ot"))}</button>${otOn && OTB ? `<span class="muted" style="font-size:12px;align-self:center">${Object.entries(OTB.a).map(([n, a]) => `<span style="color:${a.c}">■</span> ${esc(n)}`).join(" · ")}</span>` : ""}</div>`)
    + (fl.length ? `<div class="km-fl-list">${fl.map((f, i) => `<div class="km-fl" data-i="${i}"><b>#${i + 1}</b>`
        + (ed ? `<label>X <input type="number" data-fx="${i}" value="${f.x}" min="0" max="1199" inputmode="numeric"></label><label>Y <input type="number" data-fy="${i}" value="${f.y}" min="0" max="1199" inputmode="numeric"></label>` : `<span class="co">X:${f.x} Y:${f.y}</span>`)
        + `<button type="button" class="btn small" data-fcp="${i}">${esc(T("copy"))}</button>`
        + `<span class="km-fl-n">${esc(ft("row").replace("{n}", f.fresh.length))}</span>`
        + (f.lost.length ? `<span class="km-fl-w">${esc(ft("lost").replace("{n}", f.lost.length))}</span>` : "")
        + (f.onOther ? `<span class="km-fl-w">${esc(ft("onOther"))}</span>` : !f.conn ? `<span class="km-fl-w">${esc(ft("notConn"))}</span>` : "")
        + (f.ob ? `<span class="km-fl-w">${esc(ft(f.ob === 1 ? "onMt" : "onLake"))}</span>` : "")
        + (f.zone ? `<span class="km-fl-w">${esc(ft("inZone").replace("{n}", f.zone))}</span>` : "")
        + (ed ? `<span class="km-fl-act">${i ? `<button type="button" class="btn small" data-fup="${i}" title="${esc(ft("up"))}">↑</button>` : ""}<button type="button" class="btn small" data-fdel="${i}">${esc(ft("del"))}</button></span>` : "")
        + `</div>`).join("")}</div><div style="margin-top:8px;font-weight:700">${esc(ft("total").replace("{f}", fl.length).replace("{n}", tot))}</div>`
        + (ed && OTB ? `<div class="row" style="margin-top:6px;gap:6px;align-items:center"><span class="muted" style="font-size:12.5px">${esc(ft("conv").replace("{n}", fl.length))}</span><select class="btn" id="fl_conv"><option value="">—</option>${Object.keys(OTB.a).map((n) => `<option value="${esc(n)}">🏴 ${esc(n)}</option>`).join("")}</select></div>` : "")
      : `<div class="muted" style="margin-top:8px">${esc(ft("empty"))}</div>`)
    + (ed && dirty() ? `<div class="muted" style="font-size:12px;margin-top:6px">${esc(ft("save"))}</div>` : "")
    + (EXB ? `<div class="muted" style="font-size:12px;margin-top:6px">${esc(ft("exNote").replace("{n}", exList().length).replace("{c}", exList().filter((b) => b[2]).length))} ${esc(ft("tapSel"))}</div>` : "")
    + (EXB ? `<button type="button" class="btn small" id="fl_dl" style="margin-top:6px">${esc(ft("dl"))}</button>` : "")
    + (OTB ? ` <button type="button" class="btn small" id="fl_dl2" style="margin-top:6px">${esc(ft("dl2"))}</button>` : "")
    + `<div class="muted" style="font-size:12px;margin-top:6px">${esc(ft("note").replace("{d}", TERR.date))}</div>`;
  if ($("fl_dl")) $("fl_dl").onclick = dlBanners;
  if ($("fl_dl2")) $("fl_dl2").onclick = dlOthers;
}
/* ⬇️ every banner as the map shows it now (file + officers' edits), in Kingshot Mapper CSV (type,X,Y,label,#color,seq):
   NXS = checked in game, NXS? = estimated from the territory picture, plan = 🚩 planned, not built yet */
function dlBanners() {
  const rows = [], add = (t, x, y, l, c) => rows.push([t, x, y, l, c, rows.length + 1].join(","));
  (G.hq || []).forEach(([x, y]) => add("hq", x, y, "NXS", "#8e44ad"));
  exList().forEach(([x, y, c]) => add("banner", x, y, c ? "NXS" : "NXS?", c ? "#4a6fa5" : "#9fb8d8"));
  (PLAN.fl || []).forEach(([x, y]) => add("banner", x, y, "plan", "#e3a34a"));
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([rows.join("\n") + "\n"], { type: "text/csv" }));
  a.download = `nxs-banners-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
/* ⬇️ other alliances' banners as the map shows them (file estimates + officers' fixes), same CSV; label = alliance tag */
function dlOthers() {
  const rows = [], add = (t, x, y, l, c) => rows.push([t, x, y, l, c, rows.length + 1].join(","));
  const o = PLAN.ot || {};
  (o.hq || []).forEach((h) => { if (Array.isArray(h) && h.length >= 3) add("hq", h[1], h[2], h[0], otCol(h[0])); });
  otList().forEach(([n, x, y]) => add("banner", x, y, n, otCol(n)));
  saveCsv(rows, "other-alliances-banners");
}
function saveCsv(rows, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([rows.join("\n") + "\n"], { type: "text/csv" }));
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function flagsChanged() { planMsg = ""; rebuildOwn(); drawEx(); drawOt(); drawFlags(); renderFlags(); renderPlan(); if (FSEL) flagInfo(); memRefresh(); }
/* 🎯 tapped banner (planned or standing): shown in the info box under the map, where it can be moved, marked built / demolished or removed */
let FSEL = null;
const near = (list, x, y) => { let best = -1, bd = 3; list.forEach(([a, b], i) => { const d = Math.max(Math.abs(a - x), Math.abs(b - y)); if (d < bd) { bd = d; best = i; } }); return best; };
function selectFlagAt(x, y) {
  let i = near(PLAN.fl || [], x, y);
  if (i >= 0) { FSEL = { k: "p", i }; flagInfo(); return true; }
  const ex = exOn ? exList() : []; i = near(ex, x, y);
  if (i >= 0) { FSEL = { k: "e", x: ex[i][0], y: ex[i][1], c: ex[i][2] }; flagInfo(); return true; }
  if (otOn) { const h = otHq().find(([, a, b]) => Math.max(Math.abs(a + 1 - x), Math.abs(b + 1 - y)) <= 2); if (h) { FSEL = { k: "oh", n: h[0], x: h[1], y: h[2], t: h[3] || 1 }; flagInfo(); return true; } }
  const ot = otOn ? otList() : []; i = near(ot.map(([, a, b]) => [a, b]), x, y);
  if (i >= 0) { FSEL = { k: "o", n: ot[i][0], x: ot[i][1], y: ot[i][2], c: ot[i][3] }; flagInfo(); return true; }
  return false;
}
function flagInfo() {
  const el = $("km_info"), ed = ME(); if (!el || !FSEL) return;
  let x, y, head, sub = "";
  if (FSEL.k === "p") { const f = (PLAN.fl || [])[FSEL.i]; if (!f) { FSEL = null; renderInfo(); return; } [x, y] = f; head = ft("selP").replace("{n}", FSEL.i + 1); }
  else if (FSEL.k === "oh") { x = FSEL.x; y = FSEL.y; head = "🏯 " + FSEL.n + " " + hqLbl(FSEL.t); }
  else if (FSEL.k === "o") { x = FSEL.x; y = FSEL.y; head = "🏴 " + FSEL.n; sub = ft(FSEL.c ? "conf" : "est"); }
  else { x = FSEL.x; y = FSEL.y; head = ft("selE"); sub = ft(FSEL.c ? "conf" : "est"); }
  el.innerHTML = `<b>${esc(head)}</b>${sub ? `<span class="muted">${esc(sub)}</span>` : ""}<span class="co">X:${x} Y:${y}</span><button type="button" class="btn" id="fs_cp">${esc(T("copy"))}</button>`
    + (ed ? `<div class="km-fl-add" style="flex-basis:100%;display:flex;flex-wrap:wrap;gap:6px;align-items:center"><span class="muted">${esc(ft("fix"))}</span><label>X <input id="fs_x" type="number" min="0" max="1199" value="${x}" inputmode="numeric"></label><label>Y <input id="fs_y" type="number" min="0" max="1199" value="${y}" inputmode="numeric"></label>`
        + (FSEL.k === "oh" ? `<select class="btn" id="fs_al">${Object.keys(OTB.a).map((n) => `<option${n === FSEL.n ? " selected" : ""}>${esc(n)}</option>`).join("")}</select><button type="button" class="btn" id="fs_ohdel">${esc(ft("del"))}</button>`
          : FSEL.k === "o" ? `<select class="btn" id="fs_al">${Object.keys(OTB.a).map((n) => `<option${n === FSEL.n ? " selected" : ""}>${esc(n)}</option>`).join("")}</select><button type="button" class="btn" id="fs_ogone">${esc(ft("gone"))}</button>` : FSEL.k === "p" ? `<button type="button" class="btn" id="fs_built">${esc(ft("built"))}</button><button type="button" class="btn" id="fs_del">${esc(ft("del"))}</button>${OTB ? `<span class="muted">${esc(ft("conv1"))}</span><select class="btn" id="fs_conv"><option value="">—</option>${Object.keys(OTB.a).map((n) => `<option value="${esc(n)}">🏴 ${esc(n)}</option>`).join("")}</select>` : ""}` : `<button type="button" class="btn" id="fs_gone">${esc(ft("gone"))}</button>`)
        + `</div><div class="muted" style="flex-basis:100%;font-size:12px">${esc(ft("editNote"))}</div>` : "");
  const [X, Y] = P(x + (FSEL.k === "oh" ? 1.5 : .5), y + (FSEL.k === "oh" ? 1.5 : .5)); $("km_sel").innerHTML = `<circle class="sel-ring" style="transform-origin:${X}px ${Y}px" cx="${X}" cy="${Y}" r="6"/>`;
  $("fs_cp").onclick = () => { try { navigator.clipboard.writeText(`X:${x} Y:${y}`).then(() => { $("fs_cp").textContent = T("copied"); }, () => {}); } catch (e) {} };
  if (!ed) return;
  const ex = () => (PLAN.ex = PLAN.ex || { off: [], add: [] }, PLAN.ex.off = PLAN.ex.off || [], PLAN.ex.add = PLAN.ex.add || [], PLAN.ex);
  const dropEx = (a, b) => { const e = ex(), j = e.add.findIndex(([p, q]) => p === a && q === b); if (j >= 0) e.add.splice(j, 1); else if (!e.off.includes(a + "," + b)) e.off.push(a + "," + b); };
  const move = () => { const nx = parseInt($("fs_x").value, 10), ny = parseInt($("fs_y").value, 10); if (!(nx >= 0 && ny >= 0 && nx < FN && ny < FN) || (nx === x && ny === y)) return;
    if (FSEL.k === "oh") { const h = otHq().find(([m, a, b]) => m === FSEL.n && a === x && b === y); if (h) { h[1] = nx; h[2] = ny; } FSEL = { ...FSEL, x: nx, y: ny }; flagsChanged(); return; }
    if (FSEL.k === "o") { otDrop(FSEL.n, x, y); otEd().add.push([FSEL.n, nx, ny]); FSEL = { ...FSEL, x: nx, y: ny, c: 1 }; flagsChanged(); return; }
    if (FSEL.k === "p") PLAN.fl[FSEL.i] = [nx, ny]; else { dropEx(x, y); ex().add.push([nx, ny]); FSEL = { k: "e", x: nx, y: ny, c: 1 }; } flagsChanged(); };
  $("fs_x").onchange = move; $("fs_y").onchange = move;
  if ($("fs_del")) $("fs_del").onclick = () => { PLAN.fl.splice(FSEL.i, 1); FSEL = null; flagsChanged(); renderInfo(); $("km_sel").innerHTML = ""; };
  if ($("fs_built")) $("fs_built").onclick = () => { PLAN.fl.splice(FSEL.i, 1); ex().add.push([x, y]); FSEL = { k: "e", x, y, c: 1 }; flagsChanged(); };
  if ($("fs_ogone")) $("fs_ogone").onclick = () => { otDrop(FSEL.n, x, y); FSEL = null; flagsChanged(); renderInfo(); $("km_sel").innerHTML = ""; };
  if ($("fs_ohdel")) $("fs_ohdel").onclick = () => { const o = otEd(), j = o.hq.findIndex(([m, a, b]) => m === FSEL.n && a === x && b === y); if (j >= 0) o.hq.splice(j, 1); FSEL = null; flagsChanged(); renderInfo(); $("km_sel").innerHTML = ""; };
  if ($("fs_al") && FSEL.k === "oh") $("fs_al").onchange = () => { const n = $("fs_al").value, h = otHq().find(([m, a, b]) => m === FSEL.n && a === x && b === y); if (h) h[0] = n; FSEL = { ...FSEL, n }; flagsChanged(); };
  else if ($("fs_al")) $("fs_al").onchange = () => { const n = $("fs_al").value; otDrop(FSEL.n, x, y); otEd().add.push([n, x, y]); FSEL = { ...FSEL, n, c: 1 }; flagsChanged(); };
  if ($("fs_conv")) $("fs_conv").onchange = () => { const n = $("fs_conv").value; if (!n) return; PLAN.fl.splice(FSEL.i, 1); otEd().add.push([n, x, y]); FSEL = { k: "o", n, x, y, c: 1 }; if (!otOn) { otOn = true; try { localStorage.setItem("km-otb", "1"); } catch (err) {} } flagsChanged(); };
  if ($("fs_gone")) $("fs_gone").onclick = () => { dropEx(x, y); FSEL = null; flagsChanged(); renderInfo(); $("km_sel").innerHTML = ""; };
}
/* screen tap → map tile */
function tileAt(e) {
  const m = $("km_svg").getScreenCTM(); if (!m) return [-1, -1];
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
  const a = (p.x - CX) / KX, s2 = (CY - p.y) / KY + 1200;   // a = x − y, s2 = x + y
  return [Math.floor((a + s2) / 2), Math.floor((s2 - a) / 2)];
}
/* 🚩 tap mode on: a building icon is drawn much bigger than the building, so a tap on the icon but away from the building itself places a banner instead of opening the building */
function mkFar(e, mk) {
  if (!flagMode || !ME()) return false;
  const b = BY[mk.dataset.id]; if (!b) return false;
  const [tx, ty] = tileAt(e), r = b.kind === "castle" ? 6 : b.kind === "fortress" ? 3 : 2;
  return Math.max(Math.abs(tx - b.x), Math.abs(ty - b.y)) > r;
}
function addFlag(x, y) {
  if (!ME() || !(x >= 0 && x < FN && y >= 0 && y < FN)) return;
  PLAN.fl = PLAN.fl || []; PLAN.fl.push([x, y]); flagsChanged();
}
function flagEvents() {
  const el = $("km_flags");
  el.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.id === "fl_ot") { otOn = !otOn; try { localStorage.setItem("km-otb", otOn ? "1" : "0"); } catch (err) {} drawOt(); renderFlags(); return; }
    if (b.id === "fl_ex") { exOn = !exOn; try { localStorage.setItem("km-exb", exOn ? "1" : "0"); } catch (err) {} drawEx(); renderFlags(); return; }
    if (b.id === "fl_obst") { obstOn = !obstOn; try { localStorage.setItem("km-obst", obstOn ? "1" : "0"); } catch (err) {} drawObst(); renderFlags(); return; }
    if (b.dataset.fcp != null) { const f = PLAN.fl[+b.dataset.fcp]; try { navigator.clipboard.writeText(`X:${f[0]} Y:${f[1]}`).then(() => { b.textContent = T("copied"); setTimeout(() => b.textContent = T("copy"), 1500); }, () => {}); } catch (err) {} return; }
    if (!ME()) return;
    if (b.id === "fl_mode") { flagMode = !flagMode; $("km_svg").classList.toggle("flag-mode", flagMode); renderFlags(); return; }
    if (b.id === "fl_add") { const x = parseInt($("fl_x").value, 10), y = parseInt($("fl_y").value, 10); if (x >= 0 && y >= 0) addFlag(x, y); return; }
    if (b.dataset.fdel != null) { PLAN.fl.splice(+b.dataset.fdel, 1); flagsChanged(); return; }
    if (b.dataset.fup != null) { const i = +b.dataset.fup; [PLAN.fl[i - 1], PLAN.fl[i]] = [PLAN.fl[i], PLAN.fl[i - 1]]; flagsChanged(); }
  });
  el.addEventListener("change", (e) => {
    if (!ME()) return;
    if (e.target.id === "fl_conv") { const n = e.target.value; if (!n) return; (PLAN.fl || []).forEach(([x, y]) => otEd().add.push([n, x, y])); PLAN.fl = []; FSEL = null; if (!otOn) { otOn = true; try { localStorage.setItem("km-otb", "1"); } catch (err) {} } flagsChanged(); renderInfo(); $("km_sel").innerHTML = ""; return; }
    if (e.target.id === "fl_kind") { otKind = e.target.value; if (otKind) { flagMode = true; $("km_svg").classList.add("flag-mode"); if (!otOn) { otOn = true; try { localStorage.setItem("km-otb", "1"); } catch (err) {} drawOt(); } } renderFlags(); return; }
    const t = e.target, i = t.dataset.fx ?? t.dataset.fy; if (i == null) return;
    const v = parseInt(t.value, 10); if (!(v >= 0 && v < FN)) { renderFlags(); return; }
    PLAN.fl[+i][t.dataset.fx != null ? 0 : 1] = v; flagsChanged();
  });
  /* tap on the map (not on a building) while 🚩 is on → a banner on that tile */
  $("km_svg").addEventListener("click", (e) => {
    const mk = e.target.closest(".mk"); if (mk && !mkFar(e, mk)) { FSEL = null; return; }
    const [tx, ty] = tileAt(e);
    if (selectFlagAt(tx, ty)) return;   // tapped a banner → edit it
    if (flagMode && ME() && /^[hb]:/.test(otKind) && OTB && OTB.a[otKind.slice(2)] && tx >= 1 && ty >= 1 && tx < FN - 1 && ty < FN - 1) { const n = otKind.slice(2), t = otKind[0] === "b" ? 2 : 1; otEd().hq.push(t === 2 ? [n, tx - 1, ty - 1, 2] : [n, tx - 1, ty - 1]); FSEL = { k: "oh", n, x: tx - 1, y: ty - 1, t }; if (!otOn) otOn = true; flagsChanged(); return; }
    if (flagMode && ME() && otKind && OTB && OTB.a[otKind] && tx >= 0 && ty >= 0 && tx < FN && ty < FN) { otEd().add.push([otKind, tx, ty]); FSEL = { k: "o", n: otKind, x: tx, y: ty, c: 1 }; flagsChanged(); return; }
    if (flagMode && ME()) { addFlag(tx, ty); FSEL = { k: "p", i: PLAN.fl.length - 1 }; flagInfo(); }
  });
}
function applyTexts() {
  renderMp(); renderFlags();
  if (!G) return;
  renderPlan();
  $("km_title").textContent = "🗺️ " + T("title"); $("km_intro").textContent = T("intro");
  $("km_orient").textContent = T("orient"); $("km_listT").textContent = T("ruins") + " · " + T("outposts");
  if ($("km_castleLbl")) $("km_castleLbl").textContent = castleName();
  document.querySelectorAll("#pg-map .km-hqLbl").forEach((e) => e.textContent = "[NXS] " + hqName({ n: +e.dataset.n }));
  renderLayers(); renderList(); renderInfo();
}
let first = true, ready = false;   // ready = the saved plan has loaded (a link imported before that would be overwritten)
function onShow() {
  if (ready && importFromLink()) { drawPlan(); applyHidden(); applyTexts(); }   // link opened while the page was already open
  if (!first || !ready) return; first = false;
  const box = $("km_box");
  if (box.clientWidth < 700) setZoom(700 / box.clientWidth, false);
  box.scrollLeft = (box.scrollWidth - box.clientWidth) / 2; box.scrollTop = (box.scrollHeight - box.clientHeight) / 2;
}
async function init() {
  await loadScripts(["data/kingdom-map.js"]);
  G = KINGDOM_MAP; build(); await loadPlan(); exportOutposts(PLAN); importFromLink(); drawMap(); $("km_svg").classList.toggle("terr", terrOn); drawPlan(); drawFlags(); flagEvents(); applyTexts(); ready = true; loadGrid(); loadEx(); loadOt(); loadRewards();
  if (window.MemberMap) MemberMap.init(G);   // 👥 member positions (js/officer/members.js)
  $("km_in").onclick = () => setZoom(Z * 1.5); $("km_out").onclick = () => setZoom(Z / 1.5);
  mouseControls();
}
/* 👥 the member map (js/officer/members.js) draws the same banners and obstacles as this map, with the officers' edits */
window.KM_SHARED = {
  banners: () => exList(),                      // [x, y, 1 = checked in game / 0 = estimated]
  planned: () => (PLAN && PLAN.fl) || [],      // 🚩 planned banners [x, y]
  others: () => otList().map(([n, x, y]) => [n, x, y, otCol(n)]),
  othersHq: () => otHq().map(([n, x, y]) => [n, x, y, otCol(n)]),   // other alliances' HQs (15×15)
  obst: (x, y) => obstAt(x, y),                // 1 mountain · 2 lake · 0 free
  zone: (x, y) => ZNAME[zoneAt(x, y)] || "",
};
const memRefresh = () => { if (window.MemberMap && MemberMap.refresh) MemberMap.refresh(); };
function setLang(l) { lang = l; applyTexts(); if (window.MemberMap) MemberMap.setLang(l); }
OFFICER_PAGES.map = { init, onShow, applyTexts, setLang };
})();
