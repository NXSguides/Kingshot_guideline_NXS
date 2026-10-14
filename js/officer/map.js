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
const hqName = () => ZH() ? ZH().hq : "Plains HQ";
const nm = (b) => b.kind === "outpost" ? typeName(b.t) : b.kind === "castle" ? castleName() : b.kind === "hq" ? hqName()
  : ZH() ? ZH()[b.kind].replace("{n}", b.n) : (b.kind === "fortress" ? "Fortress " : "Sanctuary ") + b.n;

/* screen right = X−Y, up = X+Y — same direction as the in-game World map */
const W = 1320, CX = W / 2, CY = 450, KX = .55, KY = .355;
const P = (x, y) => [CX + (x - y) * KX, CY - ((x + y) - 1200) * KY];
const pts = (c) => c.map(([x, y]) => P(x, y).map((v) => v.toFixed(1)).join(",")).join(" ");

function build() {
  G.types.forEach(([k, n, b, c]) => TY[k] = { n, b, c });
  B.push({ id: "k", kind: "castle", name: "King's Castle", x: G.castle[0], y: G.castle[1] });
  (G.hq || []).forEach(([x, y], i) => B.push({ id: "h" + i, kind: "hq", name: "Plains HQ", x, y }));   // our [NXS] alliance HQ
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
  for (const b of B) {
    const [X, Y] = P(b.x, b.y);
    const g = `<g class="mk" data-id="${b.id}" data-t="${b.kind === "outpost" ? b.t : b.kind === "hq" ? "hq" : "ruins"}" tabindex="0" role="button" aria-label="${esc(b.name)} X${b.x} Y${b.y}">`;
    if (b.kind === "outpost") s.push(`${g}<rect x="${X - 12}" y="${Y - 12}" width="24" height="24" rx="6" fill="${TY[b.t].c}" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#fff">${b.lv}</text></g>`);
    else if (b.kind === "sanctuary") s.push(`${g}<circle cx="${X}" cy="${Y}" r="15" fill="#eef2f6" stroke="#2a3340" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#2a3340">${b.n}</text><text class="lbl" x="${X}" y="${Y - 21}" text-anchor="middle" font-size="13">${b.short}</text></g>`);
    else if (b.kind === "fortress") s.push(`${g}<rect x="${X - 16}" y="${Y - 16}" width="32" height="32" rx="5" transform="rotate(45 ${X} ${Y})" fill="#7a4a24" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#fff">${b.n}</text><text class="lbl" x="${X}" y="${Y - 26}" text-anchor="middle" font-size="14">${b.short}</text></g>`);
    else if (b.kind === "hq") s.push(`${g}<path d="M${X - 15} ${Y - 14}h30v16c0 9-8 14-15 17c-7-3-15-8-15-17z" fill="#2b6cc4" stroke="#fff" stroke-width="2.5"/><text x="${X}" y="${Y + 5}" text-anchor="middle" font-family="Arial" font-size="11" font-weight="800" fill="#fff">HQ</text><text class="lbl km-hqLbl" x="${X}" y="${Y - 22}" text-anchor="middle" font-size="13">[NXS] ${esc(hqName())}</text></g>`);
    else s.push(`${g}<circle cx="${X}" cy="${Y}" r="26" fill="#f2c33d" stroke="#fff" stroke-width="3"/><text x="${X}" y="${Y + 9}" text-anchor="middle" font-size="25">👑</text><text class="lbl" id="km_castleLbl" x="${X}" y="${Y + 46}" text-anchor="middle" font-size="16">King's Castle</text></g>`);
  }
  s.push(`<g id="km_planG" style="pointer-events:none"></g><g id="km_sel"></g>`);
  $("km_svg").innerHTML = s.join("");
  $("km_svg").querySelectorAll(".mk").forEach((m) => {
    m.addEventListener("click", () => select(m.dataset.id, false));
    m.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(m.dataset.id, false); } });
  });
}
let planOnly = false;
const applyHidden = () => $("km_svg").querySelectorAll(".mk").forEach((m) => { const b = BY[m.dataset.id];
  m.classList.toggle("off", m.dataset.id !== SEL && (hidden.has(m.dataset.t) || (planOnly && b.kind === "outpost" && !st(b)))); });

/* zoom: 100% wide at 1; phones start zoomed in so the level numbers are readable */
/* ax, ay = the point (inside the map box) that stays put — the mouse when zooming with the wheel, else the middle */
function setZoom(z, keep, ax, ay) {
  const box = $("km_box"), svg = $("km_svg"), old = svg.clientWidth || 1;
  if (ax == null) { ax = box.clientWidth / 2; ay = box.clientHeight / 2; }
  const cx = box.scrollLeft + ax, cy = box.scrollTop + ay;
  Z = Math.max(1, Math.min(6, z)); svg.style.width = (Z * 100) + "%";
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
  SEL = id; const b = BY[id], [X, Y] = P(b.x, b.y);
  const r = b.kind === "castle" ? 34 : b.kind === "fortress" ? 28 : b.kind === "sanctuary" ? 22 : 20;
  $("km_sel").innerHTML = `<circle class="sel-ring" cx="${X}" cy="${Y}" r="${r}"/>`;
  applyHidden(); renderInfo();
  document.querySelectorAll("#pg-map .chip").forEach((c) => c.classList.toggle("on", c.dataset.id === id));
  if (fromList) {
    const top = document.querySelector("#pg-map .km-card").getBoundingClientRect().top;
    if (top < 0 || top > innerHeight * .5) window.scrollTo({ top: scrollY + top - 12, behavior: "smooth" });
  }
  centerOn(b, true);
}
function renderInfo() {
  const b = SEL && BY[SEL];
  if (!b) { $("km_info").innerHTML = `<span class="muted">${esc(T("pick"))}</span>`; return; }
  const sw = b.kind === "outpost" ? `<span class="sw" style="background:${TY[b.t].c}"></span>` : "";
  const what = b.kind === "outpost" ? `Lv.${b.lv} · ${esc(buffName(b.t))} +${b.buff}%` : b.kind === "castle" ? "" : b.kind === "hq" ? "[NXS]" : esc(T("noBuff"));
  $("km_info").innerHTML = `${sw}<b>${esc(nm(b))}</b>${what ? `<span class="muted">${what}</span>` : ""}<span class="co">X:${b.x} Y:${b.y}</span><button type="button" class="btn" id="km_cp">${esc(T("copy"))}</button>` +
    (PLANNABLE(b) ? `<div class="km-st" style="flex-basis:100%">${(isOp(b) ? [["target", "target"], ["held", "held"], ["vuln", "vuln"], ["", "clear"]] : [["target", "target"], ["held", "heldR"], ["", "clear"]]).map(([v, k]) => `<button type="button" data-v="${v}" class="${eff(b) === v && v ? "on" : ""}">${esc(pt(k))}</button>`).join("")}</div>` : "") +
    (isOp(b) && st(b) === "conflict" ? `<div class="km-tm" style="flex-basis:100%;color:#c0473a">⚠️ ${esc(pt("conflictAuto"))}</div>` : "");
  const s = eff(b);
  if (isOp(b) && (s === "held" || s === "vuln")) {
    const n = nextSw(b);
    $("km_info").insertAdjacentHTML("beforeend", `<div class="km-tm" style="flex-basis:100%">
      <div>${n ? `⏱ <b>${esc(left(n - Date.now()))}</b> → ${esc(pt(s === "held" ? "toV" : "toP"))}` : `<span class="muted">${esc(pt("noT"))}</span>`}</div>
      <div class="km-tmin"><span class="muted" style="flex-basis:100%">${esc(pt(s === "held" ? "leftP" : "leftV"))}</span>
        <input id="tm_d" type="number" min="0" max="9" inputmode="numeric">${esc(pt("dd"))}<input id="tm_h" type="number" min="0" max="23" inputmode="numeric">${esc(pt("hh"))}<input id="tm_m" type="number" min="0" max="59" inputmode="numeric">${esc(pt("mm"))}
        <button type="button" class="btn" id="tm_set">${esc(pt("setT"))}</button>${n ? `<button type="button" class="btn" id="tm_clr">${esc(pt("clrT"))}</button>` : ""}</div></div>`);
    $("tm_set").onclick = () => {
      const v = (id) => Math.max(0, parseInt($(id).value, 10) || 0), ms = ((v("tm_d") * 24 + v("tm_h")) * 60 + v("tm_m")) * 6e4;
      if (!ms) return;
      PLAN.o[pk(b)] = s; PLAN.t[pk(b)] = Date.now() + ms; planMsg = ""; refreshPlan();
    };
    if ($("tm_clr")) $("tm_clr").onclick = () => { PLAN.o[pk(b)] = s; delete PLAN.t[pk(b)]; planMsg = ""; refreshPlan(); };
  }
  else if (isOp(b)) $("km_info").insertAdjacentHTML("beforeend", `<div class="km-tm muted" style="flex-basis:100%">⏱ ${esc(pt("tmHint"))}</div>`);
  if (PRIOABLE(b)) {
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
  $("km_info").querySelectorAll(".km-st button").forEach((x) => x.onclick = () => setStatus(b.id, x.dataset.v));
  $("km_cp").onclick = () => {
    const done = () => { const c = $("km_cp"); if (c) { c.textContent = T("copied"); setTimeout(() => { if ($("km_cp")) $("km_cp").textContent = T("copy"); }, 1500); } };
    try { navigator.clipboard.writeText(`X:${b.x} Y:${b.y}`).then(done, () => {}); } catch (e) {}
  };
}
const chip = (b) => `<button type="button" class="chip${b.id === SEL ? " on" : ""}" data-id="${b.id}">${PRIOABLE(b) && SP(b).p ? `<span class="km-prb sm">${SP(b).p}</span>` : ""}${st(b) ? `<span class="st">${st(b) === "held" ? "✅" : st(b) === "vuln" ? "⚔️" : st(b) === "conflict" ? "⚠️" : "🎯"}</span>` : ""}${b.short ? b.short + " · " : ""}X${b.x} Y${b.y}</button>`;
function renderList() {
  const pr = B.filter((b) => PRIOABLE(b) && SP(b).p).sort((a, b) => SP(a).p - SP(b).p);
  let h = `<div class="km-c km-prc" style="grid-column:1/-1"><div class="hd"><b>${esc(pt("prioList"))}</b></div>` +
    (pr.length ? pr.map((b) => { const sp = SP(b), d = hqDist(b);
      return `<button type="button" class="km-pri" data-id="${b.id}"><span class="km-prb">${sp.p}</span><span class="km-prm"><b>${esc(nm(b))}</b> <span class="muted">X${b.x} Y${b.y}${d != null ? ` · 📏 ${d}` : ""}</span>${sp.r ? `<span class="km-prr">🎁 ${esc(sp.r)}</span>` : ""}${sp.n ? `<span class="muted">📝 ${esc(sp.n)}</span>` : ""}</span></button>`; }).join("")
      : `<div class="muted" style="font-size:13px">${esc(pt("prioEmpty"))}</div>`) + `</div>` + `<div class="km-c"><div class="hd"><b>${esc(T("ruins"))}</b><span class="bf">${esc(T("noBuff"))}</span></div>
    <div class="km-lv"><span class="pill" style="background:#b8860b">👑 ${esc(castleName())}</span><div class="chips">${chip(BY.k)}</div></div>
    ${B.some((b) => b.kind === "hq") ? `<div class="km-lv"><span class="pill" style="background:#2b6cc4">🛡️ [NXS] ${esc(hqName())}</span><div class="chips">${B.filter((b) => b.kind === "hq").map(chip).join("")}</div></div>` : ""}
    <div class="km-lv"><span class="pill" style="background:#7a4a24">◆ ${ZH() ? ZH().fortressS : "Fortress"}</span><div class="chips">${B.filter((b) => b.kind === "fortress").map(chip).join("")}</div></div>
    <div class="km-lv"><span class="pill" style="background:#5d6876">● ${ZH() ? ZH().sanctuaryS : "Sanctuary"}</span><div class="chips">${B.filter((b) => b.kind === "sanctuary").map(chip).join("")}</div></div></div>`;
  for (const [k] of G.types) {
    const t = TY[k], lvs = Object.keys(G.buff[k]).map(Number).sort((a, b) => a - b);
    h += `<div class="km-c"><div class="hd"><span class="sw" style="background:${t.c}"></span><b>${esc(typeName(k))}</b><span class="bf">${esc(buffName(k))}</span></div>` +
      lvs.map((lv) => `<div class="km-lv"><span class="pill" style="background:${t.c}">Lv.${lv} +${G.buff[k][lv]}%</span><div class="chips">${B.filter((b) => b.t === k && b.lv === lv).map(chip).join("")}</div></div>`).join("") + `</div>`;
  }
  $("km_cards").innerHTML = h;
  $("km_cards").querySelectorAll(".chip, .km-pri").forEach((c) => c.onclick = () => select(c.dataset.id, true));
}
function renderLayers() {
  const items = [["ruins", T("ruins"), "#7a4a24"], ...G.types.map(([k, , , c]) => [k, typeName(k), c])];
  $("km_layers").innerHTML = `<button type="button" data-k="*" aria-pressed="${hidden.size === 0 && !planOnly}">${esc(T("all"))}</button><button type="button" data-k="plan" aria-pressed="${planOnly}">${esc(pt("planOnly"))}</button>` +
    items.map(([k, n, c]) => `<button type="button" data-k="${k}" aria-pressed="${!hidden.has(k)}"><span class="sw" style="background:${c}"></span>${esc(n)}</button>`).join("");
  $("km_layers").querySelectorAll("button").forEach((btn) => btn.onclick = () => {
    const k = btn.dataset.k;
    if (k === "plan") { planOnly = !planOnly; renderLayers(); applyHidden(); return; }
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
const eff = (b) => { const r = raw(b) === "conflict" && isOp(b) ? "held" : raw(b); return isOp(b) && PLAN.t[pk(b)] ? cycAt(r, PLAN.t[pk(b)], Date.now())[0] : r; };
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
const snap = () => JSON.stringify({ o: PLAN.o, t: PLAN.t, c: PLAN.cyc || null, sp: PLAN.sp || {} });
/* ⭐ Sanctuary / Fortress priority: PLAN.sp["x,y"] = { p: 1…, r: "rewards", n: "note" } */
const SP = (b) => (PLAN.sp && PLAN.sp[pk(b)]) || {};
const PRIOABLE = (b) => b && (b.kind === "sanctuary" || b.kind === "fortress");
function setSP(b, k, v) {
  PLAN.sp = PLAN.sp || {}; const cur = { ...SP(b) };
  if (v === "" || v == null) delete cur[k]; else cur[k] = v;
  if (Object.keys(cur).length) PLAN.sp[pk(b)] = cur; else delete PLAN.sp[pk(b)];
  planMsg = "";
}
const hqDist = (b) => { const h = G.hq && G.hq[0]; return h ? Math.round(Math.hypot(b.x - h[0], b.y - h[1])) : null; };
const prioTxt = (n) => (n >= 1 && n <= 20 ? String.fromCharCode(0x2460 + n - 1) : String(n));
const isOp = (b) => b.kind === "outpost";
const dirty = () => snap() !== SAVED;
const PT = { ar: {"title": "📋 خطة المستوطنات", "hint": "اضغط على مستوطنة في الخريطة أو في القائمة، ثم ضع عليها 🎯 هدف، ✅ لنا (محمي)، ⚔️ لنا (مستضعف). للمستوطنات التي نملكها، أدخل العد التنازلي من اللعبة مرة واحدة وستتبدل الصفحة بين محمي ⇄ مستضعف تلقائيًا. المجاميع تتبع قاعدة اللعبة: فقط النوع نفسه بالمستوى نفسه لا يتراكم — المستوى المختلف أو النوع المختلف يُضاف دائمًا.", "target": "🎯 هدف", "held": "✅ لنا · محمي", "vuln": "⚔️ لنا · مستضعف", "clear": "✕ مسح", "type": "مستوطنة", "buff": "المكافأة", "now": "الآن (كما في اللعبة)", "after": "مع الأهداف", "nowNote": "\"الآن\" لا يحسب المستوطنات المستضعفة، مثل شاشة إيرادات الاحتلال في اللعبة. \"مع الأهداف\" يحسب كل ما نملكه بالإضافة إلى الأهداف.", "conflict": "تعارض المكافآت", "conflictBtn": "⚠️ لنا · تعارض المكافآت", "conflicts": "⚠️ لنا · تعارض المكافآت (محسوب من المؤقتات، بلا مكافأة)", "conflictAuto": "تعارض المكافآت: نملك مستوطنة أخرى من النوع والمستوى نفسيهما محمية منذ مدة أطول — هي وحدها تعطي المكافأة. (حسب المؤقتات: التي بقي لها وقت حماية أكثر هي المتعارضة.)", "heldR": "✅ لنا", "ruinsT": "🏛️ الحصون والمآوي (معركة المأوى)", "ruinsNote": "بلا مكافآت — تعطي نقاط موسم في كل مرحلة: المأوى 1، الحصن 2. التي نملكها تُسجَّل تلقائيًا من جديد؛ وفي كل مرحلة يمكننا التسجيل يدويًا في مأوى واحد إضافي + حصن واحد إضافي فقط.", "ptsNow": "الآن", "ptsAfter": "مع الأهداف", "ptsRow": "نقاط الموسم لكل مرحلة", "tooMany": "أكثر من مأوى واحد أو حصن واحد كأهداف — يمكن تسجيل واحد فقط من كل نوع في كل مرحلة.", "targets": "🎯 الأهداف", "helds": "✅ لنا · محمي", "vulns": "⚔️ لنا · مستضعف (بلا مكافأة حاليًا)", "none": "لا شيء بعد", "save": "💾 حفظ الخطة", "by": "اسمك", "saving": "جارٍ الحفظ…", "saved": "تم الحفظ ✅ سيراها الضباط الآخرون بعد تحديث الصفحة.", "unsaved": "تغييرات غير محفوظة", "last": "آخر حفظ بواسطة {by} · {at}", "noKey": "الحفظ يحتاج مفتاح GitHub الخاص بالضباط (يُضبط في تبويب النشر).", "errAuth": "تم رفض مفتاح GitHub.", "errBusy": "قام شخص آخر بالحفظ في اللحظة نفسها — حاول مرة أخرى.", "errNet": "تعذر الاتصال بـ GitHub — حاول مرة أخرى.", "planOnly": "📋 الخطة فقط", "reset": "تراجع عن التغييرات", "prio": "⭐ الأولوية", "prioNone": "—", "rewards": "الجوائز", "rewardsPh": "مثلًا: ماذا يعطي هذا (من معلومات اللعبة)", "note": "ملاحظة", "notePh": "مثلًا: من امتلكه الأسبوع الماضي، ومدى شدة المنافسة", "dist": "{n} مربع من مقرنا", "prioList": "⭐ أولوية المآوي والحصون", "prioEmpty": "لم تُحدَّد أولوية بعد — اضغط على مأوى أو حصن في الخريطة واختر رقمًا (1 = الأفضل).", "prioSave": "تذكّر الضغط على 💾 حفظ الخطة ليراها الضباط الآخرون.", "toV": "⚔️ مستضعف", "toP": "✅ محمي", "noT": "بلا مؤقت — تتغير الحالة فقط عندما يغيرها أحد الضباط.", "tmHint": "لإضافة مؤقت: اضغط أولًا على ✅ لنا · محمي أو ⚔️ لنا · مستضعف — ستظهر هنا خانات العد التنازلي من اللعبة.", "leftP": "وقت الحماية المتبقي في اللعبة:", "leftV": "وقت الاستضعاف المتبقي في اللعبة:", "dd": "ي", "hh": "س", "mm": "د", "setT": "ضبط المؤقت", "clrT": "إزالة المؤقت", "cyc": "الدورة:", "cycNote": "مع المؤقت تتبدل الصفحة بين محمي ⇄ مستضعف تلقائيًا. إذا خسرنا مستوطنة، ضع علامتها من جديد يدويًا."},
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
function drawPlan() {
  const g = $("km_planG"); if (!g) return;
  g.innerHTML = B.filter((b) => st(b)).map((b) => { const [X, Y] = P(b.x, b.y), s = st(b), r = b.kind === "fortress" ? 27 : b.kind === "sanctuary" ? 21 : 17;
    return s === "held" ? `<circle cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#3ddc84" stroke-width="4"/>`
      : s === "vuln" ? `<circle cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#ff6b4a" stroke-width="4"/>`
      : s === "conflict" ? `<circle cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#f5a623" stroke-width="4" stroke-dasharray="2 3"/>`
      : `<circle cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="#ffe14d" stroke-width="3.5" stroke-dasharray="5 4"/>`; }).join("")
    // ⭐ priority badge (gold circle with the number) at the top-right of a Sanctuary / Fortress
    + B.filter((b) => PRIOABLE(b) && SP(b).p).map((b) => { const [X, Y] = P(b.x, b.y), o = b.kind === "fortress" ? 20 : 15;
      const w = SP(b).p >= 10 ? 34 : 27, x0 = X + o + 3;   // gold "★n" tag to the right, clear of the name above
      return `<g><rect x="${x0}" y="${Y - 10}" width="${w}" height="20" rx="10" fill="#ffd34d" stroke="#5a3d00" stroke-width="2"/><text x="${x0 + w / 2}" y="${Y + 4.5}" text-anchor="middle" font-family="Arial" font-size="12.5" font-weight="800" fill="#3d2a00">★${SP(b).p}</text></g>`; }).join("");
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
  const b = BY[id]; if (!PLANNABLE(b)) return;
  if (v) PLAN.o[pk(b)] = v; else delete PLAN.o[pk(b)];
  delete PLAN.t[pk(b)];   // a hand-set status starts without a timer — type the in-game countdown again
  planMsg = ""; drawPlan(); applyHidden(); renderInfo(); renderList(); renderPlan();
}
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
    <div class="pl-cyc muted">${esc(pt("cyc"))} <input id="cy_p" type="number" min="1" max="240" value="${CYC().p}"> h ✅ → <input id="cy_v" type="number" min="1" max="240" value="${CYC().v}"> h ⚔️ <span style="display:block;font-size:12px">${esc(pt("cycNote"))}</span></div>
    ${cnt("conflict") ? `<div class="pl-sub">${esc(pt("conflicts"))} (${cnt("conflict")})</div>${list("conflict")}` : ""}
    ${ruinsHtml}
    <div class="pl-save"><input id="pl_by" maxlength="30" placeholder="${esc(pt("by"))}" value="${esc(by)}"><button class="btn primary" id="pl_save" type="button"${dirty() ? "" : " disabled"}>${esc(pt("save"))}</button>${dirty() ? `<button class="btn" id="pl_reset" type="button">${esc(pt("reset"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(planMsg || (dirty() ? pt("unsaved") : ""))}</span></div>`;
  renderSB();   // the Sanctuary Battle sign-up drawing sits under the Fortress/Sanctuary part of the plan
  $("km_plan").querySelectorAll(".chip").forEach((c) => c.onclick = () => select(c.dataset.id, true));
  $("pl_save").onclick = savePlan;
  for (const [id, k] of [["cy_p", "p"], ["cy_v", "v"]]) $(id).onchange = () => { const n = parseInt($(id).value, 10); if (n > 0) { PLAN.cyc = { ...CYC(), [k]: n }; planMsg = ""; refreshPlan(); } };
  lastSig = sig();
  if ($("pl_reset")) $("pl_reset").onclick = () => { const S = JSON.parse(SAVED); PLAN.o = S.o; PLAN.t = S.t; if (S.c) PLAN.cyc = S.c; else delete PLAN.cyc; PLAN.sp = S.sp || {}; planMsg = ""; drawPlan(); applyHidden(); renderInfo(); renderList(); renderPlan(); };
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
  planMsg = (lang === "zh" ? "從連結帶入 {n} 個標記，確認後按「儲存規劃」。" : lang === "pt" ? "{n} marcações vieram do link — confira e toque em Salvar plano." : lang === "ar" ? "تمت إضافة {n} علامة من الرابط — راجعها ثم اضغط حفظ الخطة." : "{n} marks added from the link — check them, then press Save plan.").replace("{n}", n);
  try { history.replaceState(null, "", location.pathname + location.search + "#map"); } catch (e) {}
  return n;
}
async function savePlan() {
  if (!OFFICER.token) { planMsg = pt("noKey"); renderPlan(); return; }
  const by = ($("pl_by").value || "").trim(); try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  planMsg = pt("saving"); renderPlan(); $("pl_save").disabled = true;
  const next = { o: PLAN.o, t: PLAN.t, ...(PLAN.cyc ? { cyc: PLAN.cyc } : {}), ...(PLAN.sp && Object.keys(PLAN.sp).length ? { sp: PLAN.sp } : {}), by: by || "?", at: new Date().toISOString() };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await gh("GET", PLAN_PATH);
      try { await gh("PUT", PLAN_PATH, { message: `Outpost plan (${next.by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next), null, 1) + "\n"), sha: f ? f.sha : undefined, branch: "main" }); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    PLAN = next; SAVED = snap(); planMsg = pt("saved");
  } catch (e) { planMsg = pt(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  renderPlan();
}

/* Sanctuary Battle sign-ups, drawn as two example timelines (same content as the picture sent to officers) */
const SB = { ar: {"t": "🏛️ معركة المأوى — كيف تتراكم التسجيلات", "sub": "موسم واحد = 8 مراحل (مرحلة كل أسبوع) · نقاط الموسم لكل مرحلة سيطرة: المأوى 1 · الحصن 2", "act": "تسجيل يدوي (مأوى واحد + حصن واحد فقط لكل مرحلة)", "auto": "الاشتراك التلقائي (ما سيطرنا عليه في المرحلة السابقة · مجاني)", "fort": "الحصن", "keep": "احتفظ بما نربحه", "keepTag": "التبديل كل موسم", "rot": "التبديل كل مرحلة", "rotTag": "بطيء ومكلف", "ph": "المرحلة {n}", "san": "المأوى", "gave": "تم التنازل عنه", "pts": "{n} نقطة", "keepNote": "كل مأوى نحتفظ به يصبح تسجيلًا تلقائيًا مجانيًا، فيستمر مجموعنا في الازدياد. في نهاية الموسم يعيد الجميع التسجيل على أي حال ← تبادلوا المآوي مع التحالفات الأخرى حينها؛ لا يخسر أحد مرحلة.", "rotNote": "في كل تبديل: نلغي الاشتراك التلقائي، وعلى التحالف الآخر أن يستخدم تسجيله اليدوي الوحيد في تلك المرحلة لأخذه. لا أحد يُراكم المآوي، فيخسر الطرفان نقاط الموسم في كل مرحلة."},
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
function applyTexts() {
  if (!G) return;
  renderPlan();
  $("km_title").textContent = "🗺️ " + T("title"); $("km_intro").textContent = T("intro");
  $("km_orient").textContent = T("orient"); $("km_listT").textContent = T("ruins") + " · " + T("outposts");
  if ($("km_castleLbl")) $("km_castleLbl").textContent = castleName();
  document.querySelectorAll("#pg-map .km-hqLbl").forEach((e) => e.textContent = "[NXS] " + hqName());
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
  G = KINGDOM_MAP; build(); await loadPlan(); importFromLink(); drawMap(); drawPlan(); applyTexts(); ready = true;
  $("km_in").onclick = () => setZoom(Z * 1.5); $("km_out").onclick = () => setZoom(Z / 1.5);
  mouseControls();
}
function setLang(l) { lang = l; applyTexts(); }
OFFICER_PAGES.map = { init, onShow, applyTexts, setLang };
})();
