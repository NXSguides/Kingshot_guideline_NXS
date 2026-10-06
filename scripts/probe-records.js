// One-off check: does the MightPulse API give a player's "Record" (alliance history) anywhere?
// Tries a few include names and paths that are not in the docs, and prints ONLY the names of the
// sections that come back (never the values), because the run log is public.
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const ID = process.env.PLAYER_ID || "95453647";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const keysOf = (o) => (o && typeof o === "object" && !Array.isArray(o) ? Object.keys(o) : Array.isArray(o) ? [`[list of ${o.length}]`] : []);

const tries = [
  `/players/${ID}?include=base`,
  ...["records", "record", "history", "alliance_history", "alliances", "timeline", "logs", "changes", "names", "transfers"]
    .map((x) => `/players/${ID}?include=base,${x}`),
  `/players/${ID}/records`, `/players/${ID}/record`, `/players/${ID}/history`, `/players/${ID}/alliances`,
];

(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  for (const p of tries) {
    try {
      const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } });
      const body = await res.json().catch(() => null);
      const top = keysOf(body).filter((k) => k !== "player");
      const extra = body ? Object.keys(body).filter((k) => !["ok", "uid", "governor_id", "id_type", "include", "fresh", "cached_at", "age_seconds", "player"].includes(k)) : [];
      console.log(`${res.status}  ${p.replace(ID, "{id}")}`);
      console.log(`      reply sections: ${top.join(", ") || "-"}`);
      if (extra.length) extra.forEach((k) => console.log(`      ⭐ extra section "${k}": ${keysOf(body[k]).slice(0, 15).join(", ")}`));
      if (body && body.include) console.log(`      include accepted: ${JSON.stringify(body.include)}`);
      if (body && (body.error || body.message)) console.log(`      message: ${String(body.error || body.message).slice(0, 120)}`);
    } catch (e) { console.log(`ERR ${p.replace(ID, "{id}")}`); }
    await sleep(1200);
  }
})();
