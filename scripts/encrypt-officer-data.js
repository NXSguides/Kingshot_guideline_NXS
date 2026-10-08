/* One-time: encrypt the officer data files that are still plain JSON.
   Run from GitHub → Actions → "Encrypt Officer Data" → Run workflow (after DATA_KEY is added). */
const fs = require("fs");
const { readData, writeData } = require("./officer-data");

if (!process.env.DATA_KEY) { console.error("❌ DATA_KEY secret is missing"); process.exit(1); }
const FILES = ["data/roster-x7k2p9.json", "data/watch-x7k2p9.json", "data/records-x7k2p9.json", "data/notes-x7k2p9.json", "data/ai-officer.json"];

for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log(`– ${f}: not found, skipped`); continue; }
  const raw = JSON.parse(fs.readFileSync(f, "utf8"));
  if (raw && raw.enc && raw.gz) { readData(f); console.log(`✓ ${f}: already encrypted + compressed (key works)`); continue; }
  if (raw && raw.enc) { writeData(f, readData(f)); readData(f); console.log(`📦 ${f}: re-packed with compression`); continue; }
  writeData(f, raw);
  readData(f); // check it decrypts again
  console.log(`🔒 ${f}: encrypted`);
}
