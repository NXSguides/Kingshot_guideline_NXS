// One-off: save the RAW MightPulse replies for every NXS member (all fields, nothing dropped) to raw-mightpulse.json.
// Run by .github/workflows/dump-mightpulse.yml; the file is uploaded as a workflow artifact (not committed).
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1", KID = 2189, TAG = "NXS";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(path) {
  for (let i = 1; i <= 4; i++) {
    try { const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } }); const body = await res.json().catch(() => null);
      if (res.status === 429) { await sleep(15000 * i); continue; } return { status: res.status, body }; }
    catch (e) { await sleep(3000 * i); }
  }
  return { status: 0, body: null };
}
(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY missing"); process.exit(1); }
  const includes = process.env.INCLUDE || "base,ranks,heroes,troops,buildings,research,stats,history";
  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  if (a.status !== 200 || !a.body?.members) { console.log(`❌ roster HTTP ${a.status}`); process.exit(1); }
  console.log(`roster: ${a.body.members.length} members`);
  const players = [];
  for (const m of a.body.members) {
    let p = await get(`/players/${m.governor_id}?include=${includes}`);
    if (p.status === 400 || p.status === 422) p = await get(`/players/${m.governor_id}?include=base,ranks`);   // unknown include names → the basics
    players.push({ governor_id: m.governor_id, status: p.status, body: p.body });
    await sleep(1100);
  }
  fs.writeFileSync("raw-mightpulse.json", JSON.stringify({ fetched: new Date().toISOString(), includes, alliance: a.body, players }));
  const keys = new Set(); for (const p of players) if (p.body) Object.keys(p.body).forEach((k) => keys.add(k));
  console.log(`done: ${players.filter((p) => p.status === 200).length}/${players.length} ok · top-level keys: ${[...keys].join(", ")}`);
})();
