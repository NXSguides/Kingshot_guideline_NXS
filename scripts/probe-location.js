// One-off check: does the MightPulse API give a player's map location (X, Y) and shield / protection status, and how fresh is it?
// Prints ONLY field paths (never values) as ::notice:: lines, because the run log is public.
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1", ID = process.env.PLAYER_ID || "95453647";
const RE = /loc|pos|coord|^x$|^y$|map|shield|peace|protect|bubble|buff|status|state|online|last|teleport|city|castle|tile|fresh|cached|age/i;
function paths(o, pre = "", out = []) {
  if (o && typeof o === "object") for (const k of Object.keys(o)) {
    const p = pre ? `${pre}.${k}` : k, v = o[k];
    if (RE.test(k)) out.push(`${p}(${Array.isArray(v) ? "list" : v === null ? "null" : typeof v})`);
    if (v && typeof v === "object" && !Array.isArray(v) && pre.split(".").length < 4) paths(v, p, out);
    if (Array.isArray(v) && v[0] && typeof v[0] === "object") paths(v[0], p + "[0]", out);
  }
  return out;
}
(async () => {
  if (!KEY) { console.log("::error::MIGHTPULSE_API_KEY missing"); process.exit(1); }
  const tries = ["base", "base,location", "base,status", "base,map", "base,shield", "base,buffs", "base,city", "base,ranks,stats"].map((i) => `/players/${ID}?include=${i}`)
    .concat([`/players/${ID}/location`, `/players/${ID}/status`, `/kingdoms/2189/map`, `/kingdoms/2189/players?limit=1`]);
  for (const t of tries) {
    try {
      const r = await fetch(BASE + t, { headers: { Authorization: `Bearer ${KEY}` } }); const b = await r.json().catch(() => null);
      const top = b && typeof b === "object" ? Object.keys(b).slice(0, 25).join(",") : "-";
      console.log(`::notice title=${r.status} ${t.replace(ID, "{id}")}::top: ${top} | match: ${paths(b).slice(0, 40).join(" ") || "-"} | include: ${b && b.include ? JSON.stringify(b.include) : "-"}`);
    } catch (e) { console.log(`::notice title=ERR ${t.replace(ID, "{id}")}::${String(e.message).slice(0, 80)}`); }
    await new Promise((r) => setTimeout(r, 1200));
  }
})();
