// One-off (Sparrow, 2026-10-29): which saved version of each Ranking plan has the most battle-table assignments?
// Decrypts every version of data/ranking-plans-x7k2p9.json since SINCE and writes ONLY counts and plan names
// (no member names or IDs) to data/plan-history.txt — the run log and that file are public.
// RESTORE="<planId>@<commit>,…" puts those plans back as they were in those commits (other plans untouched).
const { execSync } = require("child_process");
const fs = require("fs");
const { writeData } = require("./officer-data");
const crypto = require("crypto"), zlib = require("zlib");
const FILE = "data/ranking-plans-x7k2p9.json", SINCE = process.env.SINCE || "2026-10-27";
const RAW = Buffer.from(process.env.DATA_KEY.trim(), "base64");
const open = (txt) => { const obj = JSON.parse(txt); if (!obj.enc) return obj; const buf = Buffer.from(obj.data, "base64");
  const d = crypto.createDecipheriv("aes-256-gcm", RAW, Buffer.from(obj.iv, "base64")); d.setAuthTag(buf.subarray(buf.length - 16));
  let pt = Buffer.concat([d.update(buf.subarray(0, buf.length - 16)), d.final()]); if (obj.gz) pt = zlib.gunzipSync(pt); return JSON.parse(pt.toString("utf8")); };
const at = (sha) => JSON.parse(JSON.stringify(open(execSync(`git show ${sha}:${FILE}`, { maxBuffer: 50e6 }).toString())));
const count = (p) => { let a = 0, rows = 0; for (const g of (p.tb && p.tb.groups) || []) for (const r of g.rows || []) { rows++; a += (r.att || []).length + (r.def || []).length + (r.join || []).length; } return { picked: (p.picked || []).length, rows, placed: a }; };
const log = execSync(`git log --since=${SINCE} --format=%h|%cI|%s -- ${FILE}`).toString().trim().split("\n").filter(Boolean);
const out = ["commit | time (UTC) | plan id | name | ticked | building rows | people placed"];
for (const l of log) {
  const [sha, t, msg] = l.split("|");
  let d; try { d = at(sha); } catch (e) { out.push(`${sha} | ${t.slice(5, 19)} | (can't read)`); continue; }
  for (const [id, p] of Object.entries((d && d.plans) || {})) { const c = count(p); out.push(`${sha} | ${t.slice(5, 16).replace("T", " ")} | ${id} | ${p.name} | ${c.picked} | ${c.rows} | ${c.placed}`); }
}
fs.writeFileSync("data/plan-history.txt", out.join("\n") + "\n");
if (process.env.RESTORE) {
  const cur = open(fs.readFileSync(FILE, "utf8"));
  for (const part of process.env.RESTORE.split(",")) {
    const [id, sha] = part.trim().split("@"); const old = at(sha).plans[id];
    if (!old) { console.log(`no plan ${id} in ${sha}`); process.exit(1); }
    cur.plans[id] = { ...old, at: Date.now() }; console.log(`restored ${id} from ${sha}`);
  }
  writeData(FILE, cur);
}
