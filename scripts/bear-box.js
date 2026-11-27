// 📬 Locks a Bear page update with the public key in data/bear-inbox-pub.json and writes data/bear-inbox-x7k2p9.json.
// Usage: node scripts/bear-box.js <plain.json>   — plain.json = { "patch": [ ...ops ] } or a whole { "review": 1, ... } and is kept OUTSIDE the repo
// (it holds member names). Only the officer page can open the result (js/officer/bearplan.js, boxRead). The box always holds the whole
// current update: the page lays it over the saved report each time it opens, so a new box replaces the old one.
const fs = require("fs"), path = require("path"), zlib = require("zlib"), { webcrypto: wc } = require("crypto");
(async () => {
  const src = process.argv[2];
  if (!src) { console.error("usage: node scripts/bear-box.js <plain.json>"); process.exit(2); }
  if (path.resolve(src).startsWith(path.resolve(__dirname, "..") + path.sep)) { console.error("the plain file must not be inside the repo"); process.exit(2); }
  const pubFile = path.join(__dirname, "../data/bear-inbox-pub.json");
  if (!fs.existsSync(pubFile)) { console.error("no public key yet: an admin presses 🔑 on the Bear page once"); process.exit(3); }
  const d = JSON.parse(fs.readFileSync(src, "utf8"));
  if (!(Array.isArray(d.patch) || (d.review && (Array.isArray(d.rows) || d.analysis)))) { console.error("not a patch or a review"); process.exit(2); }
  const pub = await wc.subtle.importKey("jwk", JSON.parse(fs.readFileSync(pubFile, "utf8")).jwk, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
  const raw = wc.getRandomValues(new Uint8Array(32)), iv = wc.getRandomValues(new Uint8Array(12));
  const aes = await wc.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt"]);
  const data = await wc.subtle.encrypt({ name: "AES-GCM", iv }, aes, zlib.gzipSync(Buffer.from(JSON.stringify(d))));
  const k = await wc.subtle.encrypt({ name: "RSA-OAEP" }, pub, raw);
  const b = (x) => Buffer.from(x).toString("base64");
  fs.writeFileSync(path.join(__dirname, "../data/bear-inbox-x7k2p9.json"), JSON.stringify({ box: 1, gz: 1, at: new Date().toISOString(), k: b(k), iv: b(iv), data: b(data) }, null, 1) + "\n");
  console.log("locked", Array.isArray(d.patch) ? d.patch.length + " ops" : "whole review");   // counts only, no content
})();
