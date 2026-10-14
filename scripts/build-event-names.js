// Builds data/event-names.js from data/terms.js: the event names the ⏰ panel may need in all 12 languages.
const fs = require("fs"), path = require("path");
const T = fs.readFileSync(path.join(__dirname, "../data/terms.js"), "utf8");
const L = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar", "es"];
const WANT = ["Bear Hunt", "Alliance Championship", "Alliance Mobilization", "Mystic Trial", "Swordland Showdown", "Tri-Alliance Clash", "All Out", "Fishing Tournament", "Cesares Fury", "Sanctuary Battle", "Alliance Brawl", "Merchant Empire", "Call of the Sovereign", "Strongest Governor", "Castle Battle", "Hall of Heroes", "Hero Rally", "Arena of Glory", "Champagne Fair"];
const out = {};
for (const w of WANT) {
  const m = T.match(new RegExp("\\n   (\\[" + JSON.stringify(w) + ", .*?\\]),?\\n")); if (!m) { console.warn("not in terms.js:", w); continue; }
  const a = JSON.parse(m[1]), o = {}; L.forEach((l, i) => { if (a[i] && a[i] !== "—") o[l] = a[i]; }); out[w] = o;
}
fs.writeFileSync(path.join(__dirname, "../data/event-names.js"), "/* Event names in every site language, generated from data/terms.js (official in-game wording) — used by the ⏰ panel for events that have no guide page.\n   Regenerate: node scripts/build-event-names.js */\nconst EVENT_NAMES = {\n" + Object.entries(out).map(([k, v]) => "  " + JSON.stringify(k) + ": " + JSON.stringify(v)).join(",\n") + "\n};\n");
console.log(Object.keys(out).length, "events");
