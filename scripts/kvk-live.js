// ⚡ KvK live boards (Sherry 2026-11-06: "during KvK, ⚖️ Compare should update more often, e.g. every 2 hours").
// Light job: only the 4 boards ⚖️ Compare uses (Governor gear, Hero equip, Master power + Power for the estimate),
// top 100 each, for #2189 and every 🔭 Scout kingdom marked "update daily" (the KvK opponent). No player profiles.
// Runs only during KvK week (Prep Day 1 → Battle Day, from the same cycle as the site calendar: anchor 2026-10-05, every 28 days, 6 days),
// unless started by hand (FORCE=1). Writes ONE encrypted file, replaced each run:
//   data/kvk-live-x7k2p9.json = { made, kingdoms: { kid: { boards: { board: { captured_at, rows: [[rank, id, name, alliance, score]] } } } },
//                                 changed: number of boards whose rows differ from the previous run, boards: number of boards saved }
// The run log is public: only counts are printed, never names or values.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1", OUR = 2189;
const BOARDS = ["gov_gear", "hero_equip", "master_power", "personal_power"];
const FILE = "data/kvk-live-x7k2p9.json", GAP_MS = 1100;
const KVK = { anchor: Date.UTC(2026, 9, 5), periodDays: 28, days: 6 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const iso = (t) => { if (t == null || t === "") return null; const n = typeof t === "number" ? (t < 1e12 ? t * 1000 : t) : Date.parse(t); return isNaN(n) ? null : new Date(n).toISOString(); };
function inKvk(now) {
  const d = Math.floor((now - KVK.anchor) / 864e5); if (d < 0) return false;
  return d % KVK.periodDays < KVK.days;
}
async function get(path) {
  for (let i = 1; i <= 4; i++) {
    try { const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` }, signal: AbortSignal.timeout(20000) });
      if (res.status === 429) { console.log("429 — waiting"); await sleep(i < 3 ? 30000 : 60000); continue; }
      return { status: res.status, body: await res.json().catch(() => null) };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}
(async () => { try {
  if (process.env.FORCE !== "1" && !inKvk(Date.now())) { console.log("::notice title=kvk-live::not KvK week — nothing to do"); return; }
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  let cfg = {}; try { cfg = JSON.parse(fs.readFileSync("data/scout-config.json", "utf8")); } catch (e) {}
  const kids = [...new Set([OUR, ...((cfg.kingdoms || []).filter((k) => k && k.auto).map((k) => +k.kid))])].filter(Boolean);
  let prev = null; try { prev = readData(FILE); } catch (e) {}
  const out = { made: new Date().toISOString(), kingdoms: {}, changed: 0, boards: 0 };
  for (const kid of kids) {
    out.kingdoms[kid] = { boards: {} };
    for (const board of BOARDS) {
      const r = await get(`/kingdoms/${kid}/ranks?board=${board}&limit=100`); await sleep(GAP_MS);
      const b = r.body && r.body.board; if (r.status !== 200 || !b) continue;
      const rows = (b.rows || []).map((x) => [x.rank, x.governor_id, x.nick_name, x.alliance_abbr || "", x.score]);
      out.kingdoms[kid].boards[board] = { captured_at: iso(b.captured_at), rows };
      out.boards++;
      const old = prev && prev.kingdoms && prev.kingdoms[kid] && prev.kingdoms[kid].boards && prev.kingdoms[kid].boards[board];
      if (!old || JSON.stringify(old.rows) !== JSON.stringify(rows)) out.changed++;
    }
  }
  if (!out.boards) { console.log("::warning title=kvk-live::no boards fetched — keeping the previous file"); return; }
  writeData(FILE, out);
  console.log(`::notice title=kvk-live::✅ ${kids.length} kingdoms, ${out.boards} boards, ${out.changed} changed since the last run`);
} catch (e) { console.log("❌ " + e.message); process.exit(1); } })();
