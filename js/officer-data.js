/* ===== Officer data encryption (used by the Roster / Watch / Post tabs) =====
   The officer data files (roster, watch, records, notes) are encrypted (AES-GCM) with one random
   DATA KEY. data/data-key.json holds that key, locked with the officer password — the same way
   data/post-key.json locks the GitHub key. So: officer password → data key → readable data.
   Files that are not encrypted yet (before setup) are read as they are. */
window.OfficerData = (() => {
  const KEY_FILE = "data/data-key.json";
  let key = null;

  const dec = (b64) => Uint8Array.from(atob(String(b64).replace(/\s/g, "")), (c) => c.charCodeAt(0));
  const enc = (bytes) => { let s = ""; const u = new Uint8Array(bytes); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };

  async function pwKey(pw, salt, iter) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }

  /* data-key.json → raw key bytes (null if missing or wrong password) */
  async function fetchKeyFile() {
    try { const r = await fetch(KEY_FILE + "?t=" + Date.now(), { cache: "no-store" }); return r.ok ? await r.json() : null; } catch (e) { return null; }
  }
  async function unwrap(blob, pw) {
    try {
      const k = await pwKey(pw, dec(blob.salt), blob.iter);
      return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: dec(blob.iv) }, k, dec(blob.data)));
    } catch (e) { return null; }
  }
  async function wrap(raw, pw) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), iter = 310000;
    const k = await pwKey(pw, salt, iter);
    const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, k, raw);
    return { v: 1, iter, salt: enc(salt), iv: enc(iv), data: enc(data) };
  }

  /* unlock with the officer password; returns true when the data key is ready */
  async function unlock(pw) {
    const blob = await fetchKeyFile();
    if (!blob || !pw) return false;
    const raw = await unwrap(blob, pw);
    if (!raw) return false;
    key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
    try { window.__nxsOfficerPw = pw; window.dispatchEvent(new Event("nxs-officer")); } catch (e) {}   // lets the AI chat unlock too
    return true;
  }

  async function open(obj) {
    if (!obj || !obj.enc) return obj;                 // not encrypted (yet)
    if (!key) throw new Error("locked");
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: dec(obj.iv) }, key, dec(obj.data));
    return JSON.parse(new TextDecoder().decode(pt));
  }
  async function seal(obj) {
    if (!key) return obj;                             // encryption not set up → keep as plain JSON
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
    return { enc: 1, iv: enc(iv), data: enc(data) };
  }
  async function fetchJson(url) {
    const r = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
    if (!r.ok) return null;
    return open(await r.json());
  }

  return { KEY_FILE, unlock, open, seal, fetchJson, fetchKeyFile, unwrap, wrap, enc, ready: () => !!key };
})();
