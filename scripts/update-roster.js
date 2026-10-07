// Fetch the NXS roster and each member's latest stats from MightPulse, save to data/roster-x7k2p9.json
// Also keeps a daily history for the Watch tab in data/watch-x7k2p9.json:
//   - when each member was first seen in NXS, name changes, power / kills over time
//   - the member lists of other alliances, to find where someone came from and similar names
// The run log is public, so no player numbers are printed here.
//
// Note: the alliance roster endpoint can be an old snapshot (weeks old). So the roster is only used
// for "who is in the alliance"; power / TC / name / Mystic Trial come from each player's own
// endpoint, which MightPulse refreshes when its copy is older than 60 minutes.
const fs = require("fs");
const { readData, writeData } = require("./officer-data"); // encrypted with DATA_KEY once set up
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = 2189, TAG = "NXS";
const OUT = "data/roster-x7k2p9.json";
const WATCH = "data/watch-x7k2p9.json";
// Other alliances to keep a member list of: the top alliances (by power) of these kingdoms.
// Add the KvK enemy kingdom number here, e.g. [2189, 2190]. Each alliance costs 1 request per day.
const WATCH_KINGDOMS = [2189];
const ALLIANCES_PER_KINGDOM = 40;
// Alliances we always read, even if they drop out of the top list (kingdom 2189). Tags are case-sensitive.
const ALWAYS = { 2189: ["RED", "ESA", "NBD"] };
const KEEP_POINTS = 60;        // days of power / kills history kept per member
const GAP_MS = 1100;           // start at most ~55 requests per minute (limit is 60)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const today = new Date().toISOString().slice(0, 10);

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

// Start one request every GAP_MS without waiting for the previous one to finish,
// because a request may wait up to 90 s while MightPulse refreshes that record.
async function getMany(paths, label) {
  const jobs = [];
  for (const [i, p] of paths.entries()) {
    jobs.push(get(p));
    if ((i + 1) % 20 === 0) console.log(`  ${label}: requested ${i + 1}/${paths.length}`);
    await sleep(GAP_MS);
  }
  return Promise.all(jobs);
}

// add a [date, value] point, only when the value changed; keep the last KEEP_POINTS
function pushPoint(arr, v) {
  if (v == null) return arr || [];
  arr = arr || [];
  const last = arr[arr.length - 1];
  if (last && last[0] === today) last[1] = v;
  else if (!last || last[1] !== v) arr.push([today, v]);
  return arr.slice(-KEEP_POINTS);
}

// the first list of objects that have an "abbr" (alliance tag), wherever it sits in the reply
function findRows(o, depth = 0) {
  if (!o || depth > 4) return [];
  if (Array.isArray(o)) return o.some((x) => x && x.abbr) ? o : o.flatMap((x) => findRows(x, depth + 1)).slice(0, 0);
  for (const v of Object.values(o)) { const r = findRows(v, depth + 1); if (r.length) return r; }
  return [];
}

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found in GitHub Secrets"); process.exit(1); }

  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  if (a.status !== 200 || !a.body?.members) { console.log(`❌ Could not read the alliance roster: HTTP ${a.status}`); process.exit(1); }
  const members = a.body.members;
  console.log(`✅ Roster: ${members.length} members (roster snapshot age ${a.body.age_seconds ?? "?"} s)`);

  const players = await getMany(members.map((m) => `/players/${m.governor_id}?include=base,ranks`), "Players");

  let fresh = 0, withMystic = 0, failed = 0;
  const ages = [];
  const out = members.map((m, i) => {
    const p = players[i];
    const ok = p.status === 200 && p.body;
    if (!ok) failed++;
    const pl = (ok && p.body.player) || {};
    const r = (ok && p.body.ranks) || {};
    if (ok && p.body.fresh) fresh++;
    if (r.mystic_trial != null) withMystic++;
    if (ok && p.body.age_seconds != null) ages.push(p.body.age_seconds);
    return {
      id: m.governor_id,
      uid: (ok && p.body.uid) || m.uid || null,   // MightPulse's own player number (used in its website links)
      name: pl.nick_name || m.nick_name,
      power: pl.power ?? m.power ?? null,
      tc: pl.town_center_level ?? m.town_center_level ?? null,
      rank: m.alliance_rank_label || (m.alliance_rank != null ? `R${m.alliance_rank}` : ""),
      lastActive: pl.last_active_at ?? m.last_active_at ?? null,
      mystic: r.mystic_trial ?? null,
      mysticRank: r.mystic_rank ?? null,
      asOf: ok && p.body.cached_at ? p.body.cached_at : null,
      // extra fields for the Watch tab
      kills: pl.kills ?? m.kills ?? null,
      kid: pl.kid ?? m.kid ?? null,
      vip: pl.vip ?? null,
      lang: pl.language ?? null,
      x: pl.x ?? null, y: pl.y ?? null,
      lastLogin: pl.last_login ?? null,
      allianceNow: pl.alliance?.abbr ?? null,
    };
  });

  const al = a.body.alliance || {};
  writeData(OUT, {
    updated: new Date().toISOString(),
    alliance: { kid: KID, tag: TAG, name: al.name || "", power: al.power ?? null, count: members.length },
    members: out,
  });
  ages.sort((x, y) => x - y);
  const oldest = ages.length ? Math.round(ages[ages.length - 1] / 60) : "?";
  console.log(`✅ Roster file: ${out.length} members · ${withMystic} with Mystic Trial · ${failed} failed · oldest player data ${oldest} min`);

  /* ---------- Watch history ---------- */
  let w = {};
  try { w = readData(WATCH) || {}; } catch (e) { if (e.code === "NOKEY") throw e; }  // never start over just because the key is missing
  const firstRun = !w.started;      // on the very first run everyone was already a member before tracking began
  w.started = w.started || today;
  w.members = w.members || {};       // id -> history while in NXS
  w.left = w.left || [];             // members who left NXS
  // id -> { "TAG (#kingdom)": [first date seen there, last date seen there] }
  // Other alliances' lists can be old snapshots, so they are dated by the snapshot, not by today.
  w.seen = w.seen || {};
  const noteAlliance = (id, tag, date = today) => {
    const h = w.seen[id] || {};
    const r = h[tag];
    h[tag] = r ? [r[0] < date ? r[0] : date, r[1] > date ? r[1] : date] : [date, date];
    w.seen[id] = h;
  };
  const snapDate = (body) => {
    const t = body && body.cached_at;
    if (!t) return today;
    const d = new Date(t > 1e12 ? t : t * 1000);
    return isNaN(d) ? today : d.toISOString().slice(0, 10);
  };

  // other alliances: top alliances of each watched kingdom (1 request per kingdom + 1 per alliance)
  const others = {};
  for (const k of WATCH_KINGDOMS) {
    const b = await get(`/kingdoms/${k}/ranks?board=alliance_power&limit=${ALLIANCES_PER_KINGDOM}`);
    const rows = findRows(b.body);
    if (!rows.length) console.log(`  Kingdom ${k}: could not read the alliance list (HTTP ${b.status})`);
    const list = [...new Set([...(ALWAYS[k] || []), ...rows.map((x) => x.abbr)])].filter((t) => t && !(k === KID && t === TAG));
    const res = await getMany(list.map((t) => `/alliances/${k}/${encodeURIComponent(t)}?include=info,roster`), `Kingdom ${k} alliances`);
    res.forEach((r, i) => {
      if (r.status !== 200 || !r.body?.members) return;
      const asOf = snapDate(r.body);
      others[`${k}:${list[i]}`] = {
        kid: k, tag: list[i], name: r.body.alliance?.name || "", asOf,
        members: r.body.members.map((m) => [m.governor_id, m.nick_name, m.power ?? null]),
      };
      r.body.members.forEach((m) => noteAlliance(m.governor_id, `${list[i]} (#${k})`, asOf));
    });
    await sleep(GAP_MS);
  }
  if (Object.keys(others).length) w.others = others;   // keep the last good copy if this run failed

  const nowIds = new Set();
  out.forEach((m) => {
    nowIds.add(String(m.id));
    noteAlliance(m.id, `${TAG} (#${KID})`);
    const h = w.members[m.id] || { firstSeen: today, names: [], ...(firstRun ? { before: true } : {}) };
    if (h.leftOn) { h.rejoined = today; delete h.leftOn; }
    if (!h.names.length || h.names[h.names.length - 1][1] !== m.name) h.names.push([today, m.name]);
    h.names = h.names.slice(-10);
    h.power = pushPoint(h.power, m.power);
    h.kills = pushPoint(h.kills, m.kills);
    h.lastSeen = today;
    w.members[m.id] = h;
  });
  for (const [id, h] of Object.entries(w.members)) {
    if (!nowIds.has(id) && !h.leftOn) {
      h.leftOn = today;
      w.left.push({ id: Number(id), name: h.names[h.names.length - 1]?.[1] || "", leftOn: today });
    }
  }
  w.left = w.left.slice(-200);
  w.updated = new Date().toISOString();
  writeData(WATCH, w);
  console.log(`✅ Watch file: ${Object.keys(w.others || {}).length} other alliances · tracking since ${w.started}`);
})();
