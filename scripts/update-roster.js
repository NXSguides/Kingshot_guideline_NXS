// Fetch the NXS roster and each member's latest stats from MightPulse, save to data/roster-x7k2p9.json
// The run log is public, so no player numbers are printed here.
//
// Note: the alliance roster endpoint can be an old snapshot (weeks old). So the roster is only used
// for "who is in the alliance"; power / TC / name / Mystic Trial come from each player's own
// endpoint, which MightPulse refreshes when its copy is older than 60 minutes.
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = 2189, TAG = "NXS";
const OUT = "data/roster-x7k2p9.json";
const GAP_MS = 1100; // start at most ~55 requests per minute (limit is 60)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
      if (res.status === 429) { console.log("  Hit the rate limit, waiting 60 s…"); await sleep(60000); continue; }
      const body = await res.json().catch(() => null);
      return { status: res.status, body };
    } catch (e) {
      await sleep(5000);
    }
  }
  return { status: 0, body: null };
}

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found in GitHub Secrets"); process.exit(1); }

  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  if (a.status !== 200 || !a.body?.members) { console.log(`❌ Could not read the alliance roster: HTTP ${a.status}`); process.exit(1); }
  const members = a.body.members;
  console.log(`✅ Roster: ${members.length} members (roster snapshot age ${a.body.age_seconds ?? "?"} s)`);

  // Start one player request every GAP_MS without waiting for the previous one to finish,
  // because a request may wait up to 90 s while MightPulse refreshes that player.
  const jobs = [];
  for (const [i, m] of members.entries()) {
    jobs.push(get(`/players/${m.governor_id}?include=base,ranks`).then((p) => ({ m, p })));
    if ((i + 1) % 20 === 0) console.log(`  Requested ${i + 1}/${members.length}`);
    await sleep(GAP_MS);
  }
  const results = await Promise.all(jobs);

  let fresh = 0, withMystic = 0, failed = 0;
  const ages = [];
  const out = results.map(({ m, p }) => {
    const ok = p.status === 200 && p.body;
    if (!ok) failed++;
    const pl = (ok && p.body.player) || {};
    const r = (ok && p.body.ranks) || {};
    if (ok && p.body.fresh) fresh++;
    if (r.mystic_trial != null) withMystic++;
    if (ok && p.body.age_seconds != null) ages.push(p.body.age_seconds);
    return {
      id: m.governor_id,
      name: pl.nick_name || m.nick_name,
      power: pl.power ?? m.power ?? null,
      tc: pl.town_center_level ?? m.town_center_level ?? null,
      rank: m.alliance_rank_label || (m.alliance_rank != null ? `R${m.alliance_rank}` : ""),
      lastActive: pl.last_active_at ?? m.last_active_at ?? null,
      mystic: r.mystic_trial ?? null,
      mysticRank: r.mystic_rank ?? null,
      asOf: ok && p.body.cached_at ? p.body.cached_at : null,
    };
  });

  const al = a.body.alliance || {};
  fs.writeFileSync(OUT, JSON.stringify({
    updated: new Date().toISOString(),
    alliance: { kid: KID, tag: TAG, name: al.name || "", power: al.power ?? null, count: members.length },
    members: out,
  }, null, 1) + "\n");
  ages.sort((x, y) => x - y);
  const oldest = ages.length ? Math.round(ages[ages.length - 1] / 60) : "?";
  console.log(`✅ Done: ${out.length} members · ${withMystic} with Mystic Trial · ${failed} failed · oldest player data ${oldest} min`);
})();
