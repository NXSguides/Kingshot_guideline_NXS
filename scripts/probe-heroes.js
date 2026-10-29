// One-off check: what does MightPulse's include=heroes give for a player? Prints ONLY field names and value types
// (never values or IDs), because the run log is public.
const fs = require("fs"); const out = []; const log = (m) => { console.log(m); out.push(m); };
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const shape = (o, d = 0) => {
  if (Array.isArray(o)) return `[list of ${o.length}]` + (o.length && d < 3 ? " of " + shape(o[0], d + 1) : "");
  if (o && typeof o === "object") return d > 3 ? "{…}" : "{ " + Object.entries(o).map(([k, v]) => `${k}: ${shape(v, d + 1)}`).join(", ") + " }";
  return typeof o;
};
(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY missing"); process.exit(1); }
  const h = { headers: { Authorization: `Bearer ${KEY}` } };
  const a = await (await fetch(`${BASE}/alliances/2189/NXS?include=info,roster`, h)).json();
  const ids = (a.members || []).slice(0, 3).map((m) => m.governor_id);
  for (const [i, id] of ids.entries()) {
    const r = await fetch(`${BASE}/players/${id}?include=base,heroes`, h); const b = await r.json().catch(() => null);
    log(`player ${i + 1}: HTTP ${r.status}`);
    log(`  heroes: ${shape(b && b.heroes)}`);
    if (i === 0) log(`  player: ${shape(b && b.player)}`);
    await new Promise((s) => setTimeout(s, 1100));
  }
  fs.writeFileSync("data/probe-heroes.txt", out.join("\n") + "\n");
})();
