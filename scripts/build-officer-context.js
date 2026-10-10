/* Builds data/ai-officer.json — the officer summary the AI assistant reads in officer mode.
   Encrypted with DATA_KEY like the other officer files, so only the Worker (and officers) can read it.
   Made here once (after every roster update) instead of in the Worker on every question,
   because the free Worker plan only allows ~10 ms of work per question. */
const { readData, writeData } = require("./officer-data");

const roster = readData("data/roster-x7k2p9.json");
if (!roster) { console.log("no roster yet — skipped"); process.exit(0); }
const watch = readData("data/watch-x7k2p9.json");

const M = (n) => (n == null ? "?" : (n / 1e6).toFixed(1) + "M");
const day = (s) => (s ? new Date(s * 1000).toISOString().slice(0, 10) : "?");
const out = ["===== OFFICER DATA (officers only) ====="];

out.push(`### ROSTER — ${roster.alliance?.name || ""} [${roster.alliance?.tag || ""}], updated ${String(roster.updated).slice(0, 10)}`,
  "name | rank | power | TC | kills | language");
for (const m of [...roster.members].sort((a, b) => (b.power || 0) - (a.power || 0)))
  out.push(`${m.name} | ${m.rank} | ${M(m.power)} | ${m.tc ?? "?"} | ${M(m.kills)} | ${m.lang || "?"}`);

if (watch) {
  const byId = Object.fromEntries(roster.members.map((m) => [m.id, m.name]));
  const renames = [], growth = [];
  for (const [id, w] of Object.entries(watch.members || {})) {
    const name = byId[id] || w.names?.at(-1)?.[1] || id;
    if (w.names?.length > 1) renames.push(`${name}: ` + w.names.map(([d, n]) => `${n} (${d})`).join(" → "));
    const p = w.power || [];
    if (p.length > 1) growth.push([name, p[0][1], p.at(-1)[1], p[0][0], p.at(-1)[0]]);
  }
  out.push(`### WATCH — tracking since ${watch.started}`);
  out.push("Name changes:", renames.length ? renames.join("\n") : "none");
  out.push("Left the alliance:", (watch.left || []).map((l) => `${l.name} (${l.leftOn})`).join(", ") || "none");
  growth.sort((a, b) => (b[2] - b[1]) - (a[2] - a[1]));
  out.push("Power change since tracking started (biggest first):",
    growth.map(([n, a, b, d1, d2]) => `${n}: ${M(a)} (${d1}) → ${M(b)} (${d2})`).join("\n"));
  const others = Object.values(watch.others || {}).map((a) =>
    `[${a.tag}] ${a.name} (#${a.kid}, ${a.asOf}): ${a.members.length} members; top: ` +
    a.members.slice(0, 5).map(([, n, p]) => `${n} ${M(p)}`).join(", "));
  if (others.length) out.push("### OTHER ALLIANCES", others.join("\n"));
}

// Scout tab: top players of other kingdoms (data/scout-x7k2p9.json)
let scout = null;
try { scout = readData("data/scout-x7k2p9.json"); } catch (e) {}
for (const [kid, k] of Object.entries((scout && scout.kingdoms) || {})) {
  out.push(`### SCOUT — kingdom #${kid}, top ${k.players.length} players by power (as of ${String(k.asOf).slice(0, 10)}; from the Scout tab)`);
  if (k.alliances && k.alliances.length) out.push("Strongest alliances: " + k.alliances.map((a) => `[${a.tag}] ${a.name} ${M(a.power)}`).join(", "));
  out.push("name | alliance | power | TC | Mystic Trial | kills | VIP");
  for (const p of k.players) out.push(`${p.name} | ${p.alliance || "?"} | ${M(p.power)} | ${p.tc ?? "?"} | ${p.mystic != null ? M(p.mystic) + (p.mysticRank != null ? " (#" + p.mysticRank + ")" : "") : "?"} | ${M(p.kills)} | ${p.vip ?? "?"}`);
}

// Map tab: the officers' Outpost plan (data/outpost-plan-x7k2p9.json) with names/levels/buffs from data/kingdom-map.js
let plan = null;
try { plan = readData("data/outpost-plan-x7k2p9.json"); } catch (e) {}
if (plan && plan.o && Object.keys(plan.o).length) {
  const fs = require("fs"), path = require("path");
  const KM = new Function(fs.readFileSync(path.join(__dirname, "..", "data/kingdom-map.js"), "utf8") + "\nreturn KINGDOM_MAP;")();
  const TY = Object.fromEntries(KM.types.map(([k, n, b]) => [k, { n, b, zh: KM.zh.types[k] }]));
  const all = KM.outposts.map(([t, lv, x, y]) => ({ t, lv, x, y, buff: KM.buff[t][lv], s: plan.o[x + "," + y] || "" }));
  const line = (o) => `${TY[o.t].n} (${TY[o.t].zh[0]}) Lv.${o.lv} X${o.x} Y${o.y} — ${TY[o.t].b} +${o.buff}%`;
  const total = (states) => { const seen = new Set(), sum = {};
    for (const o of all) if (states.includes(o.s) && !seen.has(o.t + o.lv)) { seen.add(o.t + o.lv); sum[o.t] = (sum[o.t] || 0) + o.buff; }
    return KM.types.map(([k]) => `${TY[k].b} ${sum[k] ? "+" + sum[k] + "%" : "—"}`).join(", "); };
  out.push(`### OUTPOST PLAN — Map tab, last saved by ${plan.by || "?"} on ${String(plan.at || "").slice(0, 10)}`,
    "Ours now: " + (all.filter((o) => o.s === "held").map(line).join("; ") || "none"),
    "Targets: " + (all.filter((o) => o.s === "target").map(line).join("; ") || "none"),
    "Buff totals now (same type + level counted once): " + total(["held"]),
    "Buff totals with targets: " + total(["held", "target"]));
}

const text = out.join("\n");
writeData("data/ai-officer.json", { built: new Date().toISOString(), text });
console.log(`ai-officer.json: ${text.length} characters`);
