// 🧳 Kingdom Transfer list (officer page → 🧳 Transfer tab, #tr). Sherry 2026-11-08.
// The tab saves data/transfer-x7k2p9.json (encrypted) with "requested" set → .github/workflows/transfer-lookup.yml runs:
//   node scripts/transfer-lookup.js lookup   — asks MightPulse, writes the results to $TR_RESULTS (encrypted, outside the repo)
//   node scripts/transfer-lookup.js merge    — puts the results onto the NEWEST copy of the list (officers may have saved
//                                              meanwhile) and writes the list, the name index and the public log
// What the look-up does:
//   1. alliance imports ({ kid, tag, src }) → /alliances/{kid}/{tag}?include=info,roster → every member added (status interested)
//   2. players with an ID → /players/{id}?include=base,ranks → mp (name, kingdom, alliance, TC, power, Migrant Score, Mystic Trial, VIP, kills)
//   3. players with NO ID → name search ONLY in kingdoms named in the source (#2188) or row (not the whole group): the migrant_score and
//      personal_power boards (top 100 each), plus alliance rosters (kingdoms named in the source, the alliance most of a
//      source's matches came from, then the top alliances of more kingdoms while the budget lasts). Names + IDs seen are kept
//      in data/transfer-index-x7k2p9.json (encrypted) and refetched only when older than 3 days, so a second run is cheap.
//      One match → id + mp; several → cands (the officer picks); the listed power breaks a tie when one is clearly closest (±25%).
// It only fills id / mp / cands / nf and clears "requested"; status, slot, note, name and source are the officers'.
// The run log is public: counts and HTTP codes only — never names, IDs or numbers about players.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const FILE = "data/transfer-x7k2p9.json", INDEX = "data/transfer-index-x7k2p9.json", LOG = "data/transfer-log.txt";
const RES = process.env.TR_RESULTS || "/tmp/transfer-results.json";
const GAP_MS = 1100, MAX_CALLS = +process.env.TR_MAX_CALLS || 600, MAX_MS = 25 * 60000, FRESH = 3 * 864e5, MP_FRESH = 20 * 36e5;
const DEF = { cap: 170, invites: 35, open: 20, special: 3, from: 2106, to: 2234 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const logLines = []; const log = (m) => { console.log(m); logLines.push(m); };
const T0 = Date.now();
let calls = 0;
const budget = () => calls < MAX_CALLS && Date.now() - T0 < MAX_MS;

async function get(path) {
  for (let i = 1; i <= 4; i++) {
    try {
      calls++;
      const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` }, signal: AbortSignal.timeout(20000) });
      if (res.status === 429) { console.log("429 — waiting 60 s"); await sleep(60000); continue; }
      const body = await res.json().catch(() => null);
      await sleep(GAP_MS);
      return { status: res.status, body };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}
// MightPulse replies vary a little in shape; find the array whose rows look like what we want (same helper as scout-kingdom.js)
function findRows(o, want, depth = 0) {
  if (!o || typeof o !== "object" || depth > 4) return [];
  if (Array.isArray(o)) return o.some((x) => x && typeof x === "object" && want(x)) ? o.filter((x) => x && want(x)) : [];
  for (const v of Object.values(o)) { const r = findRows(v, want, depth + 1); if (r.length) return r; }
  return [];
}
const isPlayer = (x) => x.governor_id != null || x.nick_name != null;
const isAlliance = (x) => x.abbr != null;
const membersOf = (b) => (b && (b.members || (b.roster && b.roster.members) || (Array.isArray(b.roster) ? b.roster : null))) || findRows(b, isPlayer);

/* names: case, width (NFKC), spaces and decorations like ᴺᵉˣᵘˢ, 亗, @@, ##, [TAG] don't matter */
const SMALL = { "ᴀ":"a","ʙ":"b","ᴄ":"c","ᴅ":"d","ᴇ":"e","ꜰ":"f","ɢ":"g","ʜ":"h","ɪ":"i","ᴊ":"j","ᴋ":"k","ʟ":"l","ᴍ":"m","ɴ":"n","ᴏ":"o","ᴘ":"p","ǫ":"q","ʀ":"r","ꜱ":"s","ᴛ":"t","ᴜ":"u","ᴠ":"v","ᴡ":"w","ʏ":"y","ᴢ":"z" };   // small-caps "fonts" (NFKC doesn't map them)
const unfont = (s) => String(s || "").normalize("NFKC").replace(/[ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡʏᴢ]/g, (c) => SMALL[c]).replace(/[\u{1F130}-\u{1F189}]/gu, (c) => String.fromCharCode(97 + ((c.codePointAt(0) - 0x1F130) % 26)));
const DECO = /[ʰ-˿ᴬ-ᶿ⁰-₟̀-ͯ​-‍︎️亗卍卐彡乂〆༒꧁꧂]/g;
const strictKey = (s) => unfont(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
function looseKeys(s) {
  const a = unfont(String(s || "").replace(DECO, "")).toLowerCase();
  const b = a.replace(/[\[【(（<《{][^\]】)）>》}]{0,12}[\]】)）>》}]/g, "");
  return [...new Set([a, b].map((x) => x.replace(/[^\p{L}\p{N}]/gu, "")).filter((x) => x.length >= 2))];
}
const now = () => new Date().toISOString();
const old = (at, ms) => !at || Date.now() - Date.parse(at) > ms;
const kidOf = (s) => { const m = String(s || "").match(/(?:#|\bK\s?)(\d{4})\b/i); return m ? +m[1] : null; };

function mpFrom(body, id) {
  const p = (body && body.player) || {}, rk = (body && body.ranks) || {};
  return { pid: String(id), uid: (body && body.uid) || null, name: p.nick_name ?? null, kid: p.kid ?? null, alliance: p.alliance?.abbr ?? null,
    tcLevel: p.town_center_level ?? null, power: p.power ?? null, migrant: rk.migrant_score ?? null, mystic: rk.mystic_trial ?? null,
    vip: p.vip ?? null, kills: p.kills ?? null, at: (body && body.cached_at) || now(), full: 1 };
}

async function lookup() {
  let d = null; try { d = readData(FILE); } catch (e) { log("list not readable: " + e.code); process.exit(1); }
  if (!d || !d.requested) { console.log("::notice title=transfer::no look-up requested"); return; }
  if (!KEY) { log("❌ MIGHTPULSE_API_KEY missing"); process.exit(1); }
  const S = { ...DEF, ...(d.settings || {}) };
  const from = Math.max(1, Math.min(+S.from || DEF.from, +S.to || DEF.to)), to = Math.min(from + 199, Math.max(+S.from || DEF.from, +S.to || DEF.to));
  let ix = null; try { ix = readData(INDEX); } catch (e) {}
  ix = ix && ix.k && ix.p ? ix : { v: 1, k: {}, p: {} };
  const K = (kid) => (ix.k[kid] = ix.k[kid] || { r: {} });
  const seen = (id, name, kid, alliance, power, migrant) => { if (id == null || !name) return; id = String(id); const o = ix.p[id];
    ix.p[id] = [name, kid ?? (o && o[1]) ?? null, alliance ?? (o && o[2]) ?? null, power ?? (o && o[3]) ?? null, migrant ?? (o && o[4]) ?? null, now().slice(0, 10)]; };
  const players = d.players || [];
  const filled = {}, added = [];
  const stat = { imports: 0, members: 0, ids: 0, idOk: 0, boards: 0, rosters: 0, search: 0, found: 0, multi: 0, none: 0, left: 0 };
  log(`${now()} look-up: ${players.length} on the list, group ${from}–${to}`);

  async function roster(kid, tag) {
    const r = await get(`/alliances/${kid}/${encodeURIComponent(tag)}?include=info,roster`); stat.rosters++;
    if (r.status !== 200 || !r.body) { log(`  roster: HTTP ${r.status}`); return null; }
    const ms = membersOf(r.body), al = (r.body.alliance && r.body.alliance.abbr) || tag;
    for (const m of ms) seen(m.governor_id, m.nick_name, kid, al, m.power ?? null, null);
    K(kid).r[al] = now();
    return { al, ms };
  }
  // 1. alliance imports
  const imports = [...((d.requested && d.requested.imports) || []), ...(d.pendingImports || [])].filter((x) => x && +x.kid > 0 && /^[\p{L}\p{N}_\-\[\]]{1,8}$/u.test(String(x.tag || "")));
  const doneImports = [];
  const byId = new Map(players.filter((p) => p.id).map((p) => [String(p.id), p]));
  for (const im of imports.slice(0, 6)) {
    if (!budget()) break;
    const r = await roster(+im.kid, String(im.tag)); stat.imports++; doneImports.push({ kid: +im.kid, tag: String(im.tag) });
    if (!r) continue;
    for (const m of r.ms) { const id = String(m.governor_id || ""); if (!/^\d{3,12}$/.test(id) || byId.has(id)) continue;
      const p = { key: "i" + id, id, name: m.nick_name || "", src: String(im.src || `${r.al} #${im.kid}`).slice(0, 40), status: "interested", slot: null, note: "", tc: "", tcLv: null, power: m.power ?? null, kid: +im.kid,
        mp: { pid: id, name: m.nick_name ?? null, kid: +im.kid, alliance: r.al, tcLevel: m.town_center_level ?? null, power: m.power ?? null, kills: m.kills ?? null, at: now() } };
      added.push(p); byId.set(id, p); stat.members++; }
  }
  // 2. players with an ID (missing / partial / older than 20 h)
  const needMp = [...players, ...added].filter((p) => p.id && (p.rf || !p.mp || !p.mp.full || String(p.mp.pid) !== String(p.id) || old(p.mp.at, MP_FRESH)));
  async function fill(p) {
    const r = await get(`/players/${encodeURIComponent(p.id)}?include=base,ranks`); stat.ids++;
    if (r.status === 200 && r.body && r.body.player) { const mp = mpFrom(r.body, p.id); stat.idOk++; seen(p.id, mp.name, mp.kid, mp.alliance, mp.power, mp.migrant); return mp; }
    return null;
  }
  for (const p of needMp.filter((p) => p.rf || !p.mp || !p.mp.full)) { if (!budget()) break; const mp = await fill(p); if (mp) { const f = filled[p.key] = filled[p.key] || {}; f.mp = mp; if (p.rf) f.rfDone = 1; } }
  // 3. name search for players with no ID
  const want = players.filter((p) => !p.id && p.name && p.status !== "no");
  const kidsAll = []; for (let k = from; k <= to; k++) kidsAll.push(k);
  const hinted = [...new Set(want.map((p) => p.kid || kidOf(p.src)).filter((k) => k >= from && k <= to))];
  const order = hinted;   // only kingdoms named in the source (#2188) or the row — a scan of the whole group costs ~260+ calls (Sherry 2026-11-08: find the kingdom by hand instead)
  function buildMaps() {
    const st = new Map(), lo = new Map();
    for (const [id, e] of Object.entries(ix.p)) { if (!(e[1] >= from && e[1] <= to)) continue;
      const a = strictKey(e[0]); if (a) (st.get(a) || st.set(a, []).get(a)).push(id);
      for (const k of looseKeys(e[0])) (lo.get(k) || lo.set(k, []).get(k)).push(id); }
    return { st, lo };
  }
  function match(p, maps) {
    let ids = maps.st.get(strictKey(p.name)) || [];
    if (!ids.length) ids = [...new Set(looseKeys(p.name).flatMap((k) => maps.lo.get(k) || []))];
    ids = [...new Set(ids)];
    const hint = p.kid || kidOf(p.src);
    if (ids.length > 1 && hint) { const h = ids.filter((id) => ix.p[id][1] === hint); if (h.length) ids = h; }
    if (ids.length > 1 && p.power > 0) {   // listed power: the closest wins only when it is clearly closest and within ±25%
      const ds = ids.map((id) => [id, ix.p[id][3] > 0 ? Math.abs(ix.p[id][3] - p.power) / p.power : 9]).sort((a, b) => a[1] - b[1]);
      if (ds[0][1] <= 0.25 && (ds[1][1] > 0.25 || ds[1][1] >= ds[0][1] * 2 + 0.02)) ids = [ds[0][0]];
    }
    return ids;
  }
  if (want.length) {
    // 3a. boards of every kingdom in the group (cached 3 days)
    for (const kid of order) {
      if (!budget()) break;
      const e = K(kid); if (!old(e.b, FRESH)) continue;
      let ok = 0;
      for (const board of ["migrant_score", "personal_power"]) {
        const r = await get(`/kingdoms/${kid}/ranks?board=${board}&limit=100`); stat.boards++;
        const rows = r.status === 200 ? findRows(r.body, isPlayer) : [];
        for (const x of rows) seen(x.governor_id, x.nick_name, x.kid ?? kid, x.alliance_abbr ?? null, board === "personal_power" ? x.score ?? null : null, board === "migrant_score" ? x.score ?? null : null);
        if (rows.length) ok++;
      }
      if (ok) e.b = now();
    }
    // 3b. rosters: kingdoms named in a source (top alliances), then where most of a source's matches are, then more kingdoms
    async function topAlliances(kid, n) {
      const e = K(kid);
      if (old(e.a, FRESH) || !e.al) { const r = await get(`/kingdoms/${kid}/ranks?board=alliance_power&limit=8`); e.al = findRows(r.body, isAlliance).map((x) => x.abbr).filter(Boolean); e.a = now(); }
      for (const tag of (e.al || []).slice(0, n)) { if (!budget()) return; if (old(e.r[tag], FRESH)) await roster(kid, tag); }
    }
    const reserve = () => calls < MAX_CALLS - Math.min(150, want.length + 10) && Date.now() - T0 < MAX_MS - 4 * 60000;   // keep room for step 4
    for (const kid of hinted) { if (!reserve()) break; await topAlliances(kid, 8); }
    let maps = buildMaps();
    const bySrc = {};
    for (const p of want) { const ids = match(p, maps); if (ids.length !== 1) continue;
      const e = ix.p[ids[0]], c = bySrc[p.src || ""] = bySrc[p.src || ""] || {}, k = `${e[1]}:${e[2]}`; c[k] = (c[k] || 0) + 1; }
    const focus = [];
    for (const [src, c] of Object.entries(bySrc)) { const tot = Object.values(c).reduce((a, b) => a + b, 0), [top, n] = Object.entries(c).sort((a, b) => b[1] - a[1])[0] || [];
      if (top && n >= 2 && n >= tot / 2) { const [kid, al] = top.split(":"); if (al && al !== "null") focus.push([+kid, al]); } }
    for (const [kid, al] of focus) { if (!reserve()) break; if (old(K(kid).r[al], FRESH)) await roster(kid, al); }
    maps = buildMaps();
    const left = () => want.filter((p) => match(p, maps).length === 0).length;
    if (left()) {   // more kingdoms' top 3 alliances, while the budget lasts — kingdoms where the list's players already are come first
      const where = new Set();
      for (const p of want) for (const id of match(p, maps)) where.add(ix.p[id][1]);
      const more = [...order.filter((k) => where.has(k)), ...order.filter((k) => !where.has(k))];
      for (const kid of more) { if (!reserve() || !left()) break; await topAlliances(kid, 3); maps = buildMaps(); }
    }
    // 4. decide + fill the matched ones
    maps = buildMaps();
    for (const p of want) {
      const ids = match(p, maps); stat.search++;
      const f = filled[p.key] = filled[p.key] || {};
      if (ids.length === 1) { f.id = ids[0]; stat.found++;
        if (budget()) { const mp = await fill({ ...p, id: ids[0] }); if (mp) f.mp = mp; else stat.left++; } else stat.left++;
        if (!f.mp) { const e = ix.p[ids[0]]; f.mp = { pid: ids[0], name: e[0], kid: e[1], alliance: e[2], power: e[3], migrant: e[4], at: now() }; } }
      else if (ids.length > 1) { stat.multi++; f.cands = ids.slice(0, 8).map((id) => { const e = ix.p[id]; return { id, name: e[0], kid: e[1], alliance: e[2], power: e[3], migrant: e[4] }; }); }
      else { stat.none++; f.nf = now(); }
    }
  }
  // players with an ID still waiting (budget ran out)
  for (const p of needMp) { if (filled[p.key] && filled[p.key].mp) continue;
    if (!budget()) { if (!p.mp || !p.mp.full) stat.left++; continue; }
    const mp = await fill(p); if (mp) (filled[p.key] = filled[p.key] || {}).mp = mp; }
  for (const p of added) if (filled[p.key] && filled[p.key].mp) p.mp = filled[p.key].mp;
  // the index stays small enough: only the transfer group, names seen in the last 14 days
  const cut = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  for (const [id, e] of Object.entries(ix.p)) if (!(e[1] >= from && e[1] <= to) || e[5] < cut) delete ix.p[id];
  writeData(RES, { reqAt: d.requested.at, at: now(), filled, added, doneImports, stat, calls, index: ix });
  log(`  imports ${stat.imports} (+${stat.members}) · ID look-ups ${stat.idOk}/${stat.ids} · boards ${stat.boards} · rosters ${stat.rosters}`);
  log(`  name search ${stat.search}: found ${stat.found}, to pick ${stat.multi}, not found ${stat.none} · left ${stat.left} · ${calls} calls, ${Math.round((Date.now() - T0) / 1000)} s`);
  fs.writeFileSync(RES + ".log", logLines.join("\n") + "\n");
}

/* merge onto the newest list: officers' edits win; the job only adds id / mp / cands / nf and the imported players */
/* MightPulse wins (Sherry 2026-11-08): once a row has a full MightPulse profile, its name, TC/TG and power replace what was pasted */
const tcLabel = (lv) => lv == null || lv === "" ? "" : +lv >= 35 ? "TG" + Math.floor((+lv - 30) / 5) + ((+lv - 30) % 5 ? "-" + ((+lv - 30) % 5) : "") : "TC" + lv;
function adopt(p) {
  const m = p && p.mp; if (!m || !m.full || !p.id || String(m.pid) !== String(p.id)) return;
  if (m.name) p.name = String(m.name).slice(0, 40);
  if (m.power != null) p.power = m.power;
  if (m.tcLevel != null) { p.tc = tcLabel(m.tcLevel); p.tcLv = +m.tcLevel; }
  if (m.kid) p.kid = m.kid;
}
function merge() {
  if (!fs.existsSync(RES)) { console.log("nothing to merge"); return; }
  const R = readData(RES); let d = null; try { d = readData(FILE); } catch (e) { console.log("list not readable"); process.exit(1); }
  if (!d) { console.log("the list is gone"); return; }
  d.players = d.players || [];
  const byKey = new Map(d.players.map((p) => [p.key, p])), ids = new Set(d.players.filter((p) => p.id).map((p) => String(p.id)));
  for (const [key, f] of Object.entries(R.filled || {})) {
    const p = byKey.get(key); if (!p) continue;   // removed by an officer meanwhile
    if (f.id && !p.id) { p.id = f.id; ids.add(String(f.id)); }
    if (f.mp && p.id && String(p.id) === String(f.mp.pid)) { p.mp = f.mp; delete p.cands; delete p.nf; }
    if (f.rfDone) delete p.rf;   // ↻ update done
    if (f.cands && !p.id) { p.cands = f.cands; delete p.nf; }
    if (f.nf && !p.id) { p.nf = f.nf; delete p.cands; }
  }
  let added = 0;
  for (const p of R.added || []) { if (ids.has(String(p.id))) { const q = d.players.find((x) => String(x.id) === String(p.id)); if (q && !q.mp && p.mp) q.mp = p.mp; continue; } d.players.push(p); ids.add(String(p.id)); added++; }
  const done = (x) => (R.doneImports || []).some((y) => +y.kid === +x.kid && String(y.tag).toLowerCase() === String(x.tag).toLowerCase());
  if (d.pendingImports) { d.pendingImports = d.pendingImports.filter((x) => !done(x)); if (!d.pendingImports.length) delete d.pendingImports; }
  if (d.requested) {
    if (d.requested.at === R.reqAt) delete d.requested;   // a newer request (saved while this ran) stays for the next run
    else { d.requested.imports = (d.requested.imports || []).filter((x) => !done(x)); }
  }
  for (const p of d.players) adopt(p);
  const s = R.stat || {};
  d.lastRun = { at: R.at, reqAt: R.reqAt, found: (s.found || 0) + (s.idOk || 0), multi: s.multi || 0, none: s.none || 0, left: s.left || 0, added, calls: R.calls || 0 };
  writeData(FILE, d);
  if (R.index) writeData(INDEX, R.index);
  let lg = ""; try { lg = fs.readFileSync(LOG, "utf8"); } catch (e) {}
  let mine = ""; try { mine = fs.readFileSync(RES + ".log", "utf8"); } catch (e) {}
  fs.writeFileSync(LOG, (lg + mine + `  merged: +${added} imported\n`).split("\n").slice(-80).join("\n"));
  console.log(`merged (+${added} imported)`);
}

if (require.main === module) {
  const mode = process.argv[2];
  (mode === "merge" ? Promise.resolve().then(merge) : lookup()).catch((e) => { console.log("❌ " + String((e && (e.code || e.message)) || "error").slice(0, 200)); process.exit(1); });
}
module.exports = { strictKey, looseKeys };
