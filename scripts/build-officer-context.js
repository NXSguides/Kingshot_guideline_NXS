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
  "name | rank | power | TC | kills | last active | language");
for (const m of [...roster.members].sort((a, b) => (b.power || 0) - (a.power || 0)))
  out.push(`${m.name} | ${m.rank} | ${M(m.power)} | ${m.tc ?? "?"} | ${M(m.kills)} | ${m.lastLogin || day(m.lastActive)} | ${m.lang || "?"}`);

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

const text = out.join("\n");
writeData("data/ai-officer.json", { built: new Date().toISOString(), text });
console.log(`ai-officer.json: ${text.length} characters`);
