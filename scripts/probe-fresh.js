// One-off: how often does MightPulse refresh a player? Asks the same 3 NXS members every 2 minutes for 30 minutes and prints
// only times (cached_at as UTC clock time, age_seconds, fresh) — no names, IDs or positions, because the run log is public.
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (p) => { const r = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } }); return r.json().catch(() => null); };
const hm = (v) => { if (v == null) return "-"; const d = new Date(typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : v); return d.toISOString().slice(11, 19); };
(async () => {
  const a = await get(`/alliances/2189/NXS?include=info,roster`), ids = ((a && a.members) || []).slice(10, 13).map((m) => m.governor_id);
  const last = {};
  for (let i = 0; i <= 15; i++) {
    const line = [];
    for (const [k, id] of ids.entries()) { const b = await get(`/players/${id}?include=base`) || {}; const c = hm(b.cached_at);
      line.push(`p${k + 1} cached ${c} age ${b.age_seconds}s fresh ${b.fresh}${last[k] && last[k] !== c ? " ← NEW" : ""}`); last[k] = c; await sleep(1200); }
    console.log(`::notice title=check ${i} at ${new Date().toISOString().slice(11, 19)} UTC::${line.join(" | ")}`);
    if (i < 15) await sleep(120000);
  }
})();
