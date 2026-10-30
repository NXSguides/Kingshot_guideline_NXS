// One-off check of MightPulse API paths: prints ONLY the shape of each reply (section names, list lengths, field names) —
// never values, because the run log is public. Used to look for new features (event scores, kingdom comparison).
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const OUT = []; const _log = console.log; console.log = (...a) => { OUT.push(a.join(" ")); _log(...a); };
const flush = () => { const t = OUT.join("\n"); for (let i = 0, n = 0; i < t.length && n < 9; i += 3500, n++) _log(`::notice title=probe ${n + 1}::` + t.slice(i, i + 3500).replace(/%/g, "%25").replace(/\r/g, "").replace(/\n/g, "%0A")); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function shape(v, d = 0) {
  if (Array.isArray(v)) return `[${v.length}]` + (v.length && d < 3 ? " of " + shape(v[0], d + 1) : "");
  if (v && typeof v === "object") { const k = Object.keys(v); return d >= 3 ? `{${k.slice(0, 70).join(",")}}` : "{" + k.slice(0, 70).map((x) => `${x}:${shape(v[x], d + 1)}`).join(", ") + "}"; }
  return v === null ? "null" : typeof v;
}
(async () => {
  if (!KEY) { console.log("❌ MIGHTPULSE_API_KEY not found"); process.exit(1); }
  for (const p of (process.env.PATHS || "").trim().split(/\s+/).filter(Boolean)) {
    try { const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${KEY}` } }); const body = await res.json().catch(() => null);
      console.log(`${res.status}  ${p}`); if (body) console.log("   " + shape(body).slice(0, 3400));
      if (body && (body.error || body.message)) console.log(`   message: ${String(body.error || body.message).slice(0, 200)}`);
      if (body && body.board) console.log(`   board ${body.board.key}: limit ${body.board.limit}, count ${body.board.count}, rows ${(body.board.rows || []).length}, captured ${new Date(body.board.captured_at * (body.board.captured_at < 1e12 ? 1000 : 1)).toISOString()}, NXS rows ${(body.board.rows || []).filter((r) => r.alliance_abbr === "NXS").length}`);
      if (body && body.kingdom && Array.isArray(body.kingdom.board_totals)) console.log("   boards: " + body.kingdom.board_totals.map((b) => `${b.type}/${b.key}=${b.label}`).join(" · "));
      if (body && Array.isArray(body.detail)) body.detail.forEach((d) => console.log(`   detail: ${JSON.stringify(d.loc)} ${d.msg}`));
    } catch (e) { console.log(`ERR ${p}`); }
    await sleep(1200);
  }
  flush();
})();
