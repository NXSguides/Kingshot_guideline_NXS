// ONE-TIME pull of each NXS member's "Record" (history) from the MightPulse website,
// done with MightPulse's permission (asked on their Discord, 2026-10-06). Please keep it to one run.
// Saves data/records-x7k2p9.json for the Watch tab.
//
// Steps per member: 1) the official API gives MightPulse's own player number (uid) for the governor ID,
// 2) the website's history for that uid is read. One member every 4 seconds (~7 minutes for 100).
// The run log is public, so it only prints counts, never player data.
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY;
const API = "https://api.mightpulse.com/v1";
const SITE = "https://mightpulse.com";
const ROSTER = "data/roster-x7k2p9.json";
const OUT = "data/records-x7k2p9.json";
const GAP_MS = 4000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, headers = {}) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "NXS-alliance-tools (one-time pull, permitted)", ...headers } });
      if (res.status === 429) { await sleep(60000); continue; }
      const body = await res.json().catch(() => null);
      return { status: res.status, body };
    } catch (e) { await sleep(5000); }
  }
  return { status: 0, body: null };
}
const day = (t) => { if (t == null) return null; const d = new Date(t > 1e12 ? t : t * 1000); return isNaN(d) ? null : d.toISOString().slice(0, 10); };

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found in GitHub Secrets"); process.exit(1); }
  const roster = JSON.parse(fs.readFileSync(ROSTER, "utf8"));
  const out = { pulledAt: new Date().toISOString(), source: "mightpulse.com player Record (one-time pull, with permission)", members: {} };
  let ok = 0, noUid = 0, blocked = 0, failed = 0, rows = 0;
  const statusSeen = {};

  for (const [i, m] of roster.members.entries()) {
    let uid = m.uid;
    if (!uid) {
      const p = await getJson(`${API}/players/${m.id}?include=base`, { Authorization: `Bearer ${KEY}` });
      uid = p.body && (p.body.uid || p.body.player?.uid);
      await sleep(1100);
    }
    if (!uid) { noUid++; continue; }
    const h = await getJson(`${SITE}/api/players/${uid}/history`);
    statusSeen[h.status] = (statusSeen[h.status] || 0) + 1;
    if (h.status === 403) { blocked++; if (blocked >= 3 && ok === 0) { console.log("❌ The website refused the requests (HTTP 403). Stopping."); break; } }
    else if (h.status === 200 && h.body && Array.isArray(h.body.history)) {
      ok++;
      const list = h.body.history.map((e) => ({
        d: day(e.observed_at), name: e.nick_name ?? null, a: e.alliance_abbr ?? null, aid: e.aid ?? null,
        rank: e.alliance_rank_label ?? (e.alliance_rank != null ? `R${e.alliance_rank}` : null),
        power: e.power ?? null, tc: e.stove_lv ?? null, kid: e.kid ?? null, x: e.x ?? null, y: e.y ?? null,
        kills: e.kills ?? null, flags: e.flags || (e.change_flags ? String(e.change_flags).split(",") : []), sum: e.summary || e.change_summary || "",
      }));
      rows += list.length;
      out.members[m.id] = { uid, history: list };
      if (i === 0) {
        const extra = Object.keys(h.body).filter((k) => !["ok", "uid", "history"].includes(k));
        if (extra.length) console.log(`  note: the reply also has: ${extra.join(", ")}`);
      }
    } else failed++;
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${roster.members.length} done`);
    await sleep(GAP_MS);
  }

  fs.writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log(`✅ Records: ${ok} members · ${rows} history rows · ${noUid} without uid · ${blocked} refused · ${failed} other errors`);
  console.log(`   HTTP status counts: ${JSON.stringify(statusSeen)}`);
  if (!ok) process.exit(1);
})();
