// One-off check: does the MightPulse API have a player NAME search (the website has one: name + kingdom range)?
// Prints only status codes, section names and row counts — never names, IDs or values (the run log is public).
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const Q = encodeURIComponent(process.env.Q || "MasBahliGanteng");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const keysOf = (o) => (o && typeof o === "object" && !Array.isArray(o) ? Object.keys(o) : []);
function rows(o, d = 0) { if (!o || typeof o !== "object" || d > 4) return null; if (Array.isArray(o)) return o; for (const v of Object.values(o)) { const r = rows(v, d + 1); if (r) return r; } return null; }
const tries = [
  `/players/search?q=${Q}`, `/players/search?name=${Q}`, `/players/search?query=${Q}`, `/players?q=${Q}`, `/players?search=${Q}`, `/players?name=${Q}`,
  `/search/players?q=${Q}`, `/search?q=${Q}`, `/search?q=${Q}&type=players`, `/players/search?q=${Q}&from=2106&to=2234`,
  `/players/search?q=${Q}&kingdom_from=2106&kingdom_to=2234`, `/search?q=${Q}&scope=range&from=2106&to=2234`,
];
(async () => {
  if (!KEY) { console.log("❌ no key"); process.exit(1); }
  for (const p of tries) {
    try {
      const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } });
      const body = await res.json().catch(() => null), r = rows(body);
      console.log(`${res.status}  ${p.replace(Q, "{q}")}`);
      console.log(`      sections: ${keysOf(body).join(", ") || "-"}${r ? ` · list of ${r.length}` : ""}${r && r[0] && typeof r[0] === "object" ? ` · row fields: ${Object.keys(r[0]).slice(0, 20).join(", ")}` : ""}`);
      if (body && (body.error || body.message)) console.log(`      message: ${String(body.error || body.message).slice(0, 140)}`);
    } catch (e) { console.log(`ERR ${p.replace(Q, "{q}")}`); }
    await sleep(1200);
  }
})();
