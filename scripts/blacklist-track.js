// 🎯 All Out watch list (officer page → 🎯 Blacklist tab).
// Reads the list (data/blacklist-x7k2p9.json, encrypted: { list: [{ id, note }], by, at }) and, while All Out is running
// (the Events tab schedule, data/events-x7k2p9.json), asks MightPulse for each player's map location and shield, then writes
// data/blacklist-live-x7k2p9.json (encrypted). MightPulse refreshes a player about every 15 minutes, so this runs every 15 minutes.
// BL_MODE=requested (the list was just saved) or a manual run fetches once even outside All Out.
const fs = require("fs");
const { readData, writeData } = require("./officer-data");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const LIST = "data/blacklist-x7k2p9.json", LIVE = "data/blacklist-live-x7k2p9.json";
const MODE = process.env.BL_MODE || "auto";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* All Out window from the Events tab's schedule: anchor day 00:00 UTC + k × period, lasting activeDays (+ 1 hour either side) */
function allOutWindow(now) {
  let s = { anchor: "2026-09-25", periodDays: 28, activeDays: 2 };
  try { const e = JSON.parse(fs.readFileSync("data/events-x7k2p9.json", "utf8")); if (e.sched && e.sched["all-out"]) s = e.sched["all-out"]; } catch (e) {}
  const a = Date.parse(s.anchor + "T00:00:00Z"), P = s.periodDays * 864e5, k = Math.floor((now - a) / P);
  const start = a + k * P, end = start + s.activeDays * 864e5;
  return { start, end, on: now >= start - 36e5 && now < end + 36e5 };
}
async function get(path) {
  for (let i = 1; i <= 3; i++) {
    try { const r = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } }); const b = await r.json().catch(() => null);
      if (r.status === 429) { await sleep(10000 * i); continue; } return { status: r.status, body: b }; }
    catch (e) { await sleep(3000 * i); }
  }
  return { status: 0, body: null };
}
(async () => {
  const now = Date.now(), w = allOutWindow(now);
  if (MODE === "auto" && !w.on) { console.log(`All Out is not running (next window ${new Date(w.start).toISOString()} – ${new Date(w.end).toISOString()}) — nothing to do.`); return; }
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY missing"); process.exit(1); }
  let L; try { L = readData(LIST); } catch (e) { console.log("No watch list yet."); return; }
  const seen = new Set(), list = ((L && L.list) || []).filter((it) => { const id = String(it.id).replace(/\D/g, ""); if (!id || seen.has(id)) return false; seen.add(id); return true; });   // the same account once
  if (!list.length) { console.log("The watch list is empty."); return; }
  const rows = [];
  for (const it of list.slice(0, 60)) {
    const id = String(it.id).replace(/\D/g, ""); if (!id) continue;
    const r = await get(`/players/${id}?include=base`), p = (r.body && r.body.player) || {};
    rows.push({ id, uid: (r.body && r.body.uid) || null, note: it.note || "", ok: r.status === 200, status: r.status,
      name: p.nick_name ?? null, kid: p.kid ?? null, alliance: p.alliance?.abbr ?? null, power: p.power ?? null,
      x: p.x ?? null, y: p.y ?? null, shield: p.shield_endtime ?? null, burn: p.burn_endtime ?? null,
      asOf: r.body && r.body.cached_at ? r.body.cached_at : null, age: r.body && r.body.age_seconds != null ? r.body.age_seconds : null });
    await sleep(1100);
  }
  writeData(LIVE, { fetched: new Date().toISOString(), window: { start: new Date(w.start).toISOString(), end: new Date(w.end).toISOString() }, rows });
  console.log(`✅ ${rows.filter((r) => r.ok).length}/${rows.length} players read`);   // no names or positions in the public log
})();
