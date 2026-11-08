// One-off: what does MightPulse give about hero gear? Prints only field NAMES / types / counts — never values (the run log is public).
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1", ID = "347797455";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function shape(o, d = 0, pre = "") {
  if (d > 5 || o == null) return;
  if (Array.isArray(o)) { console.log(`${pre}[array ${o.length}]`); if (o[0] !== undefined) shape(o[0], d + 1, pre + "[0]"); return; }
  if (typeof o !== "object") return;
  for (const [k, v] of Object.entries(o)) { const t = Array.isArray(v) ? `array(${v.length})` : v === null ? "null" : typeof v;
    console.log(`${pre}.${k}: ${t}${typeof v === "string" && /^(red|gold|purple|blue|green|mythic|legend|epic|rare|common|[a-z_]{2,12})$/i.test(v) ? " = " + v : ""}${typeof v === "number" && /quality|grade|rarity|tier|level|star|count/i.test(k) ? " (num)" : ""}`);
    if (v && typeof v === "object") shape(v, d + 1, pre + "." + k); }
}
(async () => {
  for (const inc of ["base,heroes", "gear", "heroes,gear", "equipment", "hero_gear", "base,heroes,gear,equipment"]) {
    const res = await fetch(`${BASE}/players/${ID}?include=${inc}`, { headers: { Authorization: `Bearer ${KEY}` } });
    const b = await res.json().catch(() => null);
    console.log(`\n===== include=${inc} → ${res.status} · top: ${b ? Object.keys(b).join(", ") : "-"}`);
    if (res.status === 200 && inc === "base,heroes") shape(b.heroes, 0, "heroes");
    if (res.status === 200 && inc !== "base,heroes") for (const k of Object.keys(b || {})) if (!["player", "uid", "cached_at", "ranks"].includes(k)) shape(b[k], 0, k);
    await sleep(1500);
  }
  for (const p of [`/players/${ID}/heroes`, `/players/${ID}/gear`, `/players/${ID}/equipment`]) {
    const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } }); const b = await res.json().catch(() => null);
    console.log(`\n===== ${p.replace(ID, "{id}")} → ${res.status} · top: ${b ? Object.keys(b).join(", ") : "-"}`); if (res.status === 200) shape(b, 0, "");
    await sleep(1500);
  }
})();
