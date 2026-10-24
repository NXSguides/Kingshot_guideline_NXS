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
  /* round 2: for a few NXS members (and the top of the kingdom), is x / y / shield_endtime filled? (filled or empty only, no values) */
  const get = async (p) => { const r = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } }); return { s: r.status, b: await r.json().catch(() => null) }; };
  const a = await get(`/alliances/2189/NXS?include=info,roster`);
  const ids = ((a.b && a.b.members) || []).slice(0, 8).map((m) => m.governor_id);
  let n = 0;
  for (const id of ids) { const r = await get(`/players/${id}?include=base`); const p = (r.b && r.b.player) || {};
    console.log(`::notice title=member ${++n} (${r.s})::x ${p.x == null ? "empty" : "FILLED"} · y ${p.y == null ? "empty" : "FILLED"} · shield_endtime ${p.shield_endtime == null ? "empty" : "FILLED (" + typeof p.shield_endtime + ")"} · online ${p.online} · fresh ${r.b && r.b.fresh} · age ${r.b && r.b.age_seconds}s`);
    await new Promise((res) => setTimeout(res, 1200)); }
})();
