// One-off check (public log): is MightPulse's gear refine_level the hero gear Mastery level?
// Compares one known hero against what the player saw in game and writes ONLY yes/no, no values.
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY, BASE = "https://api.mightpulse.com/v1";
const HERO = /jabel|潔貝爾/i;
// in game: helm +80 Mastery 3, gloves +70 M3, chest +60 M2, boots +60 M3, widget +2
const WANT = [[80, 3], [70, 3], [60, 2], [60, 3]], out = [];
(async () => {
  const H = { headers: { Authorization: `Bearer ${KEY}` } };
  const a = await (await fetch(`${BASE}/alliances/2189/NXS?include=info,roster`, H)).json();
  const me = (a.members || []).filter((m) => /sparrow/i.test(m.nick_name || ""));
  out.push(`roster match for the player: ${me.length}`);
  if (me.length !== 1) { fs.writeFileSync("data/probe-heroes.txt", out.join("\n") + "\n"); return; }
  const r = await fetch(`${BASE}/players/${me[0].governor_id}?include=base,heroes`, H);
  const b = await r.json().catch(() => null);
  out.push(`HTTP ${r.status}`);
  const h = (b && b.heroes || []).find((x) => HERO.test(x.name || ""));
  out.push(`hero found: ${!!h}; hero power empty: ${h ? h.power == null : "-"}; widget level = 2: ${h ? h.exclusive_gear_level === 2 : "-"}`);
  if (h) for (const g of h.gear || []) {
    const w = WANT.filter(([e]) => e === g.enhancement_level);
    out.push(`${g.slot}: enhancement matches a piece: ${w.length > 0}; refine_level = Mastery: ${w.some(([, m]) => m === g.refine_level)}; gear_level = Mastery: ${w.some(([, m]) => m === g.gear_level)}`);
  }
  fs.writeFileSync("data/probe-heroes.txt", out.join("\n") + "\n");
})();
