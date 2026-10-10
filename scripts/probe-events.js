// One-off check: does the MightPulse API give the in-game event calendar?
// Tries a few paths and prints the reply's section names; for anything that looks like an event list,
// it also prints event names and start/end times (public game schedule, nothing about players).
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = "2189";
// everything is also sent as a few ::notice annotations at the end (readable through the GitHub API)
const OUT = []; const _log = console.log; console.log = (...a) => { OUT.push(a.join(" ")); _log(...a); };
const flush = () => { const t = OUT.join("\n"); for (let i = 0, n = 0; i < t.length && n < 9; i += 3500, n++) _log(`::notice title=probe ${n + 1}::` + t.slice(i, i + 3500).replace(/%/g, "%25").replace(/\r/g, "").replace(/\n/g, "%0A")); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const keysOf = (o) => (o && typeof o === "object" && !Array.isArray(o) ? Object.keys(o) : Array.isArray(o) ? [`[list of ${o.length}]`] : []);

const tries = (process.env.PATHS || "").trim() ? process.env.PATHS.trim().split(/\s+/) : [
  `/events`, `/events?kingdom=${KID}`, `/calendar`, `/schedule`,
  `/kingdoms/${KID}`, `/kingdoms/${KID}?include=info`, `/kingdoms/${KID}?include=events`, `/kingdoms/${KID}?include=info,events`,
  `/kingdoms/${KID}/events`, `/kingdoms/${KID}/calendar`, `/kingdoms/${KID}/schedule`, `/kingdoms/${KID}/kvk`,
  `/kvk`, `/kvk?kingdom=${KID}`, `/kingdoms/${KID}?include=kvk`,
];
// print event-like lists: name/title/type + time fields only
function showList(label, arr) {
  if (!Array.isArray(arr) || !arr.length || typeof arr[0] !== "object") return;
  console.log(`      ${label}: ${arr.length} items; fields: ${Object.keys(arr[0]).slice(0, 20).join(", ")}`);
  const pick = (o) => Object.entries(o).filter(([k, v]) => /name|title|type|event|start|end|begin|time|date|at$|day|week|phase/i.test(k) && (typeof v !== "object" || v === null)).map(([k, v]) => `${k}=${v}`).join(" · ");
  arr.slice(0, 12).forEach((o) => console.log(`        - ${pick(o).slice(0, 220)}`));
}
(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  for (const p of tries) {
    try {
      const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } });
      const body = await res.json().catch(() => null);
      console.log(`${res.status}  ${p}`);
      if (!body) { await sleep(400); continue; }
      console.log(`      reply sections: ${keysOf(body).join(", ") || "-"}`);
      if (body.error || body.message) console.log(`      message: ${String(body.error || body.message).slice(0, 140)}`);
      if (Array.isArray(body)) showList("list", body);
      for (const [k, v] of Object.entries(body)) {
        if (Array.isArray(v)) showList(k, v);
        else if (v && typeof v === "object") { console.log(`      "${k}": ${keysOf(v).slice(0, 20).join(", ")}`); for (const [k2, v2] of Object.entries(v)) if (Array.isArray(v2)) showList(`${k}.${k2}`, v2); }
      }
    } catch (e) { console.log(`ERR ${p}`); }
    await sleep(400);
  }
  flush();
})();
