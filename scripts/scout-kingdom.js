// Scout: the top players of other kingdoms (for KvK), from MightPulse → data/scout-x7k2p9.json (encrypted).
// Which kingdoms: data/scout-config.json { kingdoms: [{ kid, auto }] } — written by the Scout tab of the officer page.
//   - a push of that file (the "Fetch" button) scouts the kingdoms listed in "requested"
//   - the daily schedule scouts the ones with auto: true
// Per kingdom: 1 request for the player ranking (or, if MightPulse has no such board, 1 + top alliances' rosters),
// then 1 request per player for TC / Mystic Trial / kills / VIP. ~20–35 requests, about 40 s.
// The run log is public, so no player numbers are printed here.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const CONFIG = "data/scout-config.json", OUT = "data/scout-x7k2p9.json", LOG = "data/scout-log.txt";
// short public run log (counts and HTTP codes only, never player data) so problems can be checked without the Actions page
const logLines = [];
const log = (m) => { console.log(m); logLines.push(m); };
const TOP = 20, ALLIANCES = 8, GAP_MS = 1100;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
      if (res.status === 429) { console.log("  Hit the rate limit, waiting 60 s…"); await sleep(60000); continue; }
      const body = await res.json().catch(() => null);
      return { status: res.status, body };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}
async function getMany(paths, label) {
  const jobs = [];
  for (const [i, p] of paths.entries()) {
    jobs.push(get(p));
    if ((i + 1) % 10 === 0) console.log(`  ${label}: requested ${i + 1}/${paths.length}`);
    await sleep(GAP_MS);
  }
  return Promise.all(jobs);
}
// MightPulse replies vary a little in shape; find the array whose rows look like what we want
function findRows(o, want, depth = 0) {
  if (!o || typeof o !== "object" || depth > 4) return [];
  if (Array.isArray(o)) return o.some((x) => x && typeof x === "object" && want(x)) ? o.filter((x) => x && want(x)) : [];
  for (const v of Object.values(o)) { const r = findRows(v, want, depth + 1); if (r.length) return r; }
  return [];
}
const isPlayer = (x) => x.governor_id != null || x.nick_name != null;
const isAlliance = (x) => x.abbr != null;

async function scoutKingdom(kid) {
  log(`Kingdom ${kid}`);
  // 1) who are the top players? try a player power board first …
  let top = [], source = "";
  for (const board of ["player_power", "power", "governor_power"]) {
    const r = await get(`/kingdoms/${kid}/ranks?board=${board}&limit=${TOP}`);
    const rows = findRows(r.body, isPlayer);
    log(`  board ${board}: HTTP ${r.status}, ${rows.length} rows`);
    if (r.status === 200 && rows.length) { top = rows.map((x) => ({ id: x.governor_id ?? x.id, name: x.nick_name || x.name || "", power: x.power ?? null, alliance: x.alliance_abbr || x.abbr || x.alliance?.abbr || null })); source = "board:" + board; break; }
    await sleep(GAP_MS);
  }
  // … otherwise take the strongest alliances' rosters and pick the top players from them
  const alliances = [];
  const ab = await get(`/kingdoms/${kid}/ranks?board=alliance_power&limit=${ALLIANCES}`);
  const arows = findRows(ab.body, isAlliance);
  log(`  alliance board: HTTP ${ab.status}, ${arows.length} rows`);
  if (arows.length) {
    const res = await getMany(arows.map((x) => `/alliances/${kid}/${encodeURIComponent(x.abbr)}?include=info,roster`), `Kingdom ${kid} alliances`);
    res.forEach((r, i) => {
      if (r.status !== 200 || !r.body) return;
      const al = r.body.alliance || {}, members = r.body.members || [];
      alliances.push({ tag: arows[i].abbr, name: al.name || arows[i].name || "", power: al.power ?? arows[i].power ?? null, count: members.length });
      if (!top.length || source === "") for (const m of members) top.push({ id: m.governor_id, name: m.nick_name, power: m.power ?? null, alliance: arows[i].abbr, _fromRoster: true });
    });
  }
  if (!source) {
    top = top.filter((x) => x.id != null).sort((a, b) => (b.power || 0) - (a.power || 0)).slice(0, TOP);
    source = "alliance rosters";
  }
  log(`  top list from ${source}: ${top.length} players, ${alliances.length} alliances`);
  if (!top.length) return null;
  // 2) each player's own record: TC, Mystic Trial, kills, VIP
  const pl = await getMany(top.map((t) => `/players/${t.id}?include=base,ranks`), `Kingdom ${kid} players`);
  let ok = 0;
  const players = top.map((t, i) => {
    const r = pl[i], good = r.status === 200 && r.body;
    if (good) ok++;
    const p = (good && r.body.player) || {}, rk = (good && r.body.ranks) || {};
    return {
      id: t.id, uid: (good && r.body.uid) || null, name: p.nick_name || t.name,
      power: p.power ?? t.power ?? null, tc: p.town_center_level ?? null, kills: p.kills ?? null,
      mystic: rk.mystic_trial ?? null, mysticRank: rk.mystic_rank ?? null, vip: p.vip ?? null,
      alliance: p.alliance?.abbr ?? t.alliance ?? null, kid: p.kid ?? kid,
    };
  }).sort((a, b) => (b.power || 0) - (a.power || 0));
  log(`  players read: ${ok}/${top.length}`);
  return { asOf: new Date().toISOString(), source, alliances, players };
}

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found in GitHub Secrets"); process.exit(1); }
  let cfg = {};
  try { cfg = JSON.parse(fs.readFileSync(CONFIG, "utf8")) || {}; } catch (e) {}
  const mode = process.env.SCOUT_MODE || "requested";     // "requested" (button) or "auto" (daily)
  const list = (cfg.kingdoms || []).filter((k) => k && k.kid);
  let kids = mode === "auto" ? list.filter((k) => k.auto).map((k) => k.kid) : (cfg.requested || []);
  kids = [...new Set(kids.map(Number).filter((n) => n > 0))];
  log(`${new Date().toISOString()} mode=${mode} kingdoms=${kids.join(",") || "-"}`);
  const flushLog = () => { let old = ""; try { old = fs.readFileSync(LOG, "utf8"); } catch (e) {} fs.writeFileSync(LOG, (old + logLines.join("\n") + "\n").split("\n").slice(-80).join("\n")); };
  if (!kids.length) { log(`Nothing to scout (${mode}).`); flushLog(); return; }
  let out = null;
  try { out = readData(OUT); } catch (e) { if (e.code === "NOKEY") throw e; }
  out = out && out.kingdoms ? out : { kingdoms: {} };
  for (const kid of kids) {
    const r = await scoutKingdom(kid);
    if (r) out.kingdoms[kid] = r;
  }
  out.updated = new Date().toISOString();
  writeData(OUT, out);
  // the button request is done → clear it (keeps the daily list)
  if (mode !== "auto" && cfg.requested) { delete cfg.requested; fs.writeFileSync(CONFIG, JSON.stringify(cfg, null, 1) + "\n"); }
  log("✅ saved"); flushLog();
})();
