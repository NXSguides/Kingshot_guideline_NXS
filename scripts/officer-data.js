/* Read / write the officer data files, encrypted with DATA_KEY (GitHub secret).
   Same format as js/officer-data.js in the browser: { enc: 1, gz: 1, iv, data } with AES-256-GCM.
   gz: 1 = the JSON is gzipped before it is encrypted (encrypted text can't be compressed by the
   web server, so this keeps the big files 5–8× smaller to download). */
const fs = require("fs");
const crypto = require("crypto");
const zlib = require("zlib");

const KEY_FILE = "data/data-key.json";
const RAW = process.env.DATA_KEY ? Buffer.from(process.env.DATA_KEY.trim(), "base64") : null;
if (RAW && RAW.length !== 32) throw new Error("DATA_KEY must be the 44-character key shown on the Post tab");

function noKey(file) {
  const e = new Error(`${file} is encrypted (or encryption is set up) but the DATA_KEY secret is missing. ` +
    "Add it under Settings → Secrets and variables → Actions.");
  e.code = "NOKEY";
  return e;
}

/* returns the parsed object, or null if the file doesn't exist */
function readData(file) {
  if (!fs.existsSync(file)) return null;
  const obj = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!obj || !obj.enc) return obj;
  if (!RAW) throw noKey(file);
  const buf = Buffer.from(obj.data, "base64");
  const d = crypto.createDecipheriv("aes-256-gcm", RAW, Buffer.from(obj.iv, "base64"));
  d.setAuthTag(buf.subarray(buf.length - 16));
  let pt = Buffer.concat([d.update(buf.subarray(0, buf.length - 16)), d.final()]);
  if (obj.gz) pt = zlib.gunzipSync(pt);
  return JSON.parse(pt.toString("utf8"));
}

function writeData(file, obj) {
  if (!RAW) {
    if (fs.existsSync(KEY_FILE)) throw noKey(file);     // never write plain data once encryption is on
    fs.writeFileSync(file, JSON.stringify(obj) + "\n");
    return;
  }
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", RAW, iv);
  const data = Buffer.concat([c.update(zlib.gzipSync(Buffer.from(JSON.stringify(obj), "utf8"), { level: 9 })), c.final(), c.getAuthTag()]);
  fs.writeFileSync(file, JSON.stringify({ enc: 1, gz: 1, iv: iv.toString("base64"), data: data.toString("base64") }) + "\n");
}

module.exports = { readData, writeData };
