// One-off: what is in a player's ranks.leaderboards[]? Prints board names, rank types and whether a kingdom rank / value is
// present — never names or values (public log). Takes the last NXS rows of a few boards (players near rank 100).
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const get = async (p) => { const r = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } }); return r.json().catch(() => null); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const out = [];
  const b = await get(`/kingdoms/2189/ranks?board=personal_power&limit=100`), rows = (b.board.rows || []).filter((r) => r.alliance_abbr === "NXS");
  const pick = [rows[0], rows[rows.length - 1]];
  for (const r of pick) { await sleep(1200);
    const p = await get(`/players/${r.governor_id}?include=base,ranks`); const lb = (p.ranks && p.ranks.leaderboards) || [];
    out.push(`player at power rank ${r.rank}: ${lb.length} leaderboards → ` + lb.map((x) => `${x.name} [${x.rank_type}] value:${x.value != null ? "yes" : "no"} rank:${x.kingdom_rank != null ? "yes" : "no"}`).join(" · "));
  }
  console.log(`::notice title=leaderboards::` + out.join("%0A"));
})();
