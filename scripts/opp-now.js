// ⚡ Opponents now (Sherry 2026-11-07, Project doc claude/pvp-opponent-data-handoff.md): during a battle, fetch other kingdoms'
// players from MightPulse right away, in batches, for the analysis chat.
// Started by the officer page (⚔️ Battle → 🔭 Scout → ⚡ Opponents now), which writes the ENCRYPTED request
//   data/opp-request-x7k2p9.json = { at, by, kids: [kid], from, to, boards: [board], ids: [governor_id], alliances: [{ kid, tag }] }
// Writes ONE encrypted file per UTC day, added to by every batch:
//   data/opp/YYYY-MM-DD-x7k2p9.json = { date, made, batches: [...], boards: {"kid:board": {...}}, players: {id: {...}}, alliances: {"kid:TAG": {...}}, quota }
// - boards: the 9 combat boards + personal_power, top 100, per kingdom — fetched again only when older than 3 h
// - players: the union of the chosen boards, ordered by best rank, positions from..to; anyone already fetched today is skipped
// - alliances: /alliances/{kid}/{TAG}?include=info,roster — every member's governor_id (for "find by name")
// The run log is public: only counts are printed, never names or values.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const REQ = "data/opp-request-x7k2p9.json", DIR = "data/opp";
const BOARDS = ["personal_power", "troop_power", "gov_gear", "gov_charm", "research_power", "hero_equip", "pet_power", "master_power", "single_hero", "hero_total", "migrant_score"];
const GAP_MS = 1100, BOARD_TTL = 3 * 3600000, MAX_PLAYERS = 300;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const iso = (t) => { if (t == null || t === "") return null; const n = typeof t === "number" ? (t < 1e12 ? t * 1000 : t) : Date.parse(t); return isNaN(n) ? null : new Date(n).toISOString(); };
let calls = 0, quota = null, headerNames = null;
async function get(path) {
  for (let i = 1; i <= 4; i++) {
    try {
      const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` }, signal: AbortSignal.timeout(20000) }); calls++;
      // remember any rate-limit / quota headers MightPulse sends (numbers about OUR key only — not player data)
      const q = {}; res.headers.forEach((v, k) => { if (/rate|limit|quota|remaining|reset/i.test(k)) q[k] = v; });
      if (Object.keys(q).length) { quota = { at: new Date().toISOString(), headers: q }; headerNames = Object.keys(q); }
      if (res.status === 429) { console.log("429 — waiting"); await sleep(i < 3 ? 30000 : 60000); continue; }
      return { status: res.status, body: await res.json().catch(() => null) };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}

(async () => { try {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  let req = null; try { req = readData(REQ); } catch (e) { console.log("request not readable: " + e.message); }
  if (!req) { console.log("::notice title=opp-now::no request"); return; }
  const kids = [...new Set((req.kids || []).map(Number).filter((k) => k > 0))].slice(0, 10);
  const from = Math.max(1, +req.from || 1), to = Math.min(100, Math.max(from, +req.to || 5));
  const boards = (req.boards || []).filter((b) => BOARDS.includes(b)); if (!boards.length) boards.push("personal_power", "troop_power");
  const extra = [...new Set((req.ids || []).map(String).filter((x) => /^\d{3,12}$/.test(x)))].slice(0, 100);
  const alls = (req.alliances || []).filter((a) => a && +a.kid > 0 && /^[\w\-\[\]]{1,8}$/u.test(String(a.tag || ""))).slice(0, 10);
  const date = new Date().toISOString().slice(0, 10), file = `${DIR}/${date}-x7k2p9.json`;
  let day = null; try { if (fs.existsSync(file)) day = readData(file); } catch (e) { console.log("today's file not readable — starting a new one"); }
  day = day || { date, batches: [], boards: {}, players: {}, alliances: {} };
  const now = Date.now();
  console.log(`request: ${kids.length} kingdoms, positions ${from}–${to}, ${boards.length} boards, ${extra.length} extra IDs, ${alls.length} alliance lists`);
  // 1. boards (only when missing or older than 3 h)
  for (const kid of kids) for (const b of BOARDS) {
    const k = `${kid}:${b}`, old = day.boards[k];
    if (old && now - Date.parse(old.fetched_at) < BOARD_TTL) continue;
    const r = await get(`/kingdoms/${kid}/ranks?board=${b}&limit=100`); await sleep(GAP_MS);
    const x = r.body && r.body.board;
    if (r.status === 200 && x) day.boards[k] = { captured_at: iso(x.captured_at), fetched_at: new Date().toISOString(), name: x.name,
      rows: (x.rows || []).map((y) => ({ rank: y.rank, governor_id: String(y.governor_id), nick_name: y.nick_name, alliance_abbr: y.alliance_abbr, aid: y.aid, kid: y.kid ?? kid, score: y.score })) };
  }
  // 2. alliance member lists (for "find by name")
  for (const a of alls) {
    const tag = String(a.tag), r = await get(`/alliances/${+a.kid}/${encodeURIComponent(tag)}?include=info,roster`); await sleep(GAP_MS);
    if (r.status === 200 && r.body) day.alliances[`${+a.kid}:${tag}`] = { fetched_at: new Date().toISOString(), info: r.body.alliance || r.body.info || null,
      members: (r.body.members || (r.body.roster && r.body.roster.members) || r.body.roster || []).map((m) => ({ governor_id: String(m.governor_id), nick_name: m.nick_name, power: m.power, town_center_level: m.town_center_level, kills: m.kills, alliance_rank: m.alliance_rank, last_active_at: m.last_active_at })) };
  }
  // 3. who to fetch: union of the chosen boards per kingdom, by best rank, positions from..to; + extra IDs
  const want = [];
  for (const kid of kids) {
    const best = new Map();
    for (const b of boards) for (const row of ((day.boards[`${kid}:${b}`] || {}).rows || [])) { const id = row.governor_id; if (!best.has(id) || row.rank < best.get(id)) best.set(id, row.rank); }
    [...best.entries()].sort((x, y) => x[1] - y[1]).slice(from - 1, to).forEach(([id]) => want.push([id, kid]));
  }
  extra.forEach((id) => want.push([id, null]));
  let ok = 0, skipped = 0;
  const fetched = [];
  for (const [id, kid] of want.slice(0, MAX_PLAYERS)) {
    if (day.players[id]) { skipped++; fetched.push(id); continue; }   // already fetched today
    const r = await get(`/players/${id}?include=base,ranks,heroes`); await sleep(GAP_MS);
    if (r.status === 200 && r.body) {
      day.players[id] = { kid: kid ?? (r.body.player && r.body.player.kid) ?? null, captured_at: iso(r.body.cached_at) || new Date().toISOString(), fetched_at: new Date().toISOString(),
        player: r.body.player || null, ranks: r.body.ranks || null, heroes: r.body.heroes || null };
      ok++; fetched.push(id);
    }
  }
  day.made = new Date().toISOString();
  if (quota) day.quota = quota;
  day.batches.push({ at: day.made, asked_at: req.at || null, by: req.by || "", kids, from, to, boards, extra: extra.length, alliances: alls.map((a) => `${+a.kid}:${a.tag}`), ids: fetched, fetched: ok, skipped, calls });
  fs.mkdirSync(DIR, { recursive: true });
  writeData(file, day);
  if (headerNames) console.log(`quota headers seen: ${headerNames.join(", ")}`);   // names only
  console.log(`::notice title=opp-now::✅ ${ok} players fetched, ${skipped} already had today, ${calls} calls, ${Object.keys(day.players).length} players in today's file`);
} catch (e) { console.log(`::error title=opp-now::${String(e && e.stack || e).split("\n").slice(0, 3).join(" | ")}`); process.exit(1); } })();
