// Run manually: fetch the NXS roster and each member's Mystic Trial value from MightPulse, save to data/roster-x7k2p9.json
// The run log is public, so no player numbers are printed here.
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = 2189, TAG = "NXS";
const OUT = "data/roster-x7k2p9.json";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
    if (res.status === 429) { console.log("  Hit the per-minute limit, waiting 60 s…"); await sleep(60000); continue; }
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }
  return { status: 429, body: null };
}

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found in GitHub Secrets"); process.exit(1); }

  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  if (a.status !== 200 || !a.body?.members) { console.log(`❌ Could not read the alliance roster: HTTP ${a.status}`); process.exit(1); }
  const members = a.body.members;
  console.log(`✅ Roster: ${members.length} members`);

  const out = [];
  let ok = 0;
  for (const [i, m] of members.entries()) {
    const p = await get(`/players/${m.governor_id}?include=base,ranks`);
    const r = (p.status === 200 && p.body?.ranks) || {};
    if (r.mystic_trial != null) ok++;
    out.push({
      id: m.governor_id,
      name: m.nick_name,
      power: m.power ?? null,
      tc: m.town_center_level ?? null,
      rank: m.alliance_rank_label || (m.alliance_rank != null ? `R${m.alliance_rank}` : ""),
      lastActive: m.last_active_at ?? null,
      mystic: r.mystic_trial ?? null,
      mysticRank: r.mystic_rank ?? null,
    });
    if ((i + 1) % 20 === 0) console.log(`  Processed ${i + 1}/${members.length}`);
    await sleep(1100); // max 60 requests per minute
  }

  const al = a.body.alliance || {};
  fs.writeFileSync(OUT, JSON.stringify({
    updated: new Date().toISOString(),
    alliance: { kid: KID, tag: TAG, name: al.name || "", power: al.power ?? null, count: members.length },
    members: out,
  }, null, 1) + "\n");
  console.log(`✅ Done: ${out.length} members, ${ok} with a Mystic Trial value`);
})();
