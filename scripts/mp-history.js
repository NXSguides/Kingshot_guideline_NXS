// 📦 MightPulse history for the battle analysis (spec: Project doc claude/mightpulse-db-spec.md).
// Once a day (after the roster and Scout jobs) it saves ONE encrypted file per UTC day:
//   data/mp-history/YYYY-MM-DD-x7k2p9.json = { date, made, kingdoms: {kid: {...}}, boards: {"kid:board": {captured_at, rows}}, players: {governor_id: {...}} }
// - kingdoms: /kingdoms/{kid} for #2189 and every Scout kingdom marked "update daily" (e.g. the KvK opponent)
// - boards: all 18 kingdom boards, top 100 each (the API's maximum)
// - players: every NXS member (copied from the roster file — no extra calls), the players in EXTRA_IDS / EXTRA below,
//   and for other kingdoms the players in the top 100 of the combat boards (base, ranks, heroes)
// Nothing is ever overwritten from another day; a second run on the same day replaces that day's file.
// The run log is public: only counts are printed, never names or values.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1", OUR = 2189;
// players we have real battle stats for (analysis chat, 10/30): ch0s3n, Thorintus, Scottish alex 85 (RED), Kurdo (333)
const EXTRA = ["347589790", "346654883", "346884943", "345147572"];
const BOARDS = ["alliance_power", "alliance_kills", "personal_power", "kills", "single_hero", "hero_total", "troop_power", "building_power", "research_power",
  "hero_no_equip", "hero_equip", "gov_gear", "gov_charm", "pet_power", "island_prosperity", "migrant_score", "mystic_trial", "master_power"];
const COMBAT = ["gov_gear", "gov_charm", "research_power", "hero_equip", "pet_power", "master_power", "troop_power", "single_hero", "hero_total"];
const OPP_MAX = 150, GAP_MS = 1100;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(path) {
  for (let i = 1; i <= 4; i++) {
    try { const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
      if (res.status === 429) { await sleep(60000); continue; }
      return { status: res.status, body: await res.json().catch(() => null) };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}
const iso = (t) => { if (t == null || t === "") return null; const n = typeof t === "number" ? (t < 1e12 ? t * 1000 : t) : Date.parse(t); return isNaN(n) ? null : new Date(n).toISOString(); };
const player = (b, src) => ({ src, captured_at: iso(b.cached_at) || new Date().toISOString(), player: b.player || null, ranks: b.ranks || null, heroes: b.heroes || null });

(async () => { try {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  const date = new Date().toISOString().slice(0, 10), file = `data/mp-history/${date}-x7k2p9.json`;
  let cfg = {}; try { cfg = JSON.parse(fs.readFileSync("data/scout-config.json", "utf8")); } catch (e) {}
  const kids = [...new Set([OUR, ...((cfg.kingdoms || []).filter((k) => k && k.auto).map((k) => +k.kid))])].filter(Boolean);
  const snap = { date, made: new Date().toISOString(), kingdoms: {}, boards: {}, players: {} };
  let calls = 0;
  for (const kid of kids) {
    const k = await get(`/kingdoms/${kid}`); calls++; await sleep(GAP_MS);
    if (k.status === 200 && k.body && k.body.kingdom) snap.kingdoms[kid] = { captured_at: new Date().toISOString(), ...k.body.kingdom };
    for (const board of BOARDS) {
      const r = await get(`/kingdoms/${kid}/ranks?board=${board}&limit=100`); calls++; await sleep(GAP_MS);
      const b = r.body && r.body.board;
      if (r.status === 200 && b) snap.boards[`${kid}:${board}`] = { captured_at: iso(b.captured_at), name: b.name, rows: (b.rows || []).map((x) => ({ rank: x.rank, governor_id: x.governor_id, nick_name: x.nick_name, alliance_abbr: x.alliance_abbr, aid: x.aid, score: x.score })) };
    }
  }
  // NXS members: the roster job already fetched base, ranks and heroes today — copy them
  let roster = null; try { roster = readData("data/roster-x7k2p9.json"); } catch (e) { console.log("roster not readable: " + e.message); }
  for (const m of (roster && roster.members) || []) if (m.raw) snap.players[String(m.id)] = { src: "roster", captured_at: iso(m.asOf) || roster.updated, player: m.raw.player || null, ranks: m.raw.ranks || null, heroes: m.raw.heroes || null };
  // extra players + the other kingdoms' top players on the combat boards
  const want = new Set([...EXTRA, ...String(process.env.EXTRA_IDS || "").split(/[\s,]+/).filter((x) => /^\d+$/.test(x))]);
  for (const kid of kids) if (kid !== OUR) {
    const ids = new Set(); for (const b of COMBAT) for (const x of ((snap.boards[`${kid}:${b}`] || {}).rows || [])) if (ids.size < OPP_MAX) ids.add(String(x.governor_id));
    ids.forEach((id) => want.add(id));
  }
  let ok = 0;
  for (const id of want) {
    if (snap.players[id]) continue;
    const r = await get(`/players/${id}?include=base,ranks,heroes`); calls++; await sleep(GAP_MS);
    if (r.status === 200 && r.body) { snap.players[id] = player(r.body, "fetch"); ok++; }
  }
  fs.mkdirSync("data/mp-history", { recursive: true });
  writeData(file, snap);
  console.log(`::notice title=mp-history::✅ ${file}: ${Object.keys(snap.kingdoms).length} kingdoms, ${Object.keys(snap.boards).length} boards, ${Object.keys(snap.players).length} players (${ok} fetched now), ${calls} calls`);
  } catch (e) { console.log(`::error title=mp-history::${String(e && e.stack || e).split("\n").slice(0, 3).join(" | ")}`); process.exit(1); }
})();
