/* 🔄 Sync for pages that don't load the ⏰ timers (bear calculator, KvK calculator):
   when this browser is logged in with Discord, what these pages keep in the browser goes to the person's other devices,
   and a newer copy from another device is taken on opening. Same store and rules as js/timers.js (nxs-sync-meta, /sync):
   every write to a synced key is stamped; the newest copy of each key wins. One small server write per change. */
(function () {
  const API = "https://nxs-ai.tapegirljoke.workers.dev";
  // keep in step with SYNC_KEY in js/timers.js and the list in worker/worker.js (syncMerge)
  const SYNC_KEY = /^(nxs-daily-v1|nxs-stack-done|ks-kvk-check-[\w-]{1,40}|nxs-bt-v2|kvk-calc-v5|nxs-roster-v2|nxs-table-v1|nxs-events-v1|nxs-board-seen|nxs-watch-v1|nxs-scout-v1)$/;
  const META = "nxs-sync-meta", DTOK = "nxs-discord-v1";
  const get = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  if (!get(DTOK)) return;   // not logged in: everything stays on this device, as before
  let meta = {}; try { meta = JSON.parse(get(META)) || {}; } catch (e) {}
  meta.ls = meta.ls || {};
  let applying = false, timer = null;
  const orig = Storage.prototype.setItem;
  const saveMeta = () => { try { orig.call(localStorage, META, JSON.stringify(meta)); } catch (e) {} };
  try {
    Storage.prototype.setItem = function (k, v) {
      orig.call(this, k, v);
      if (this === window.localStorage && !applying && SYNC_KEY.test(k)) { meta.ls[k] = { at: Date.now() }; saveMeta(); clearTimeout(timer); timer = setTimeout(sync, 1500); }
    };
  } catch (e) {}
  const lsOut = () => { const o = {}; for (const [k, m] of Object.entries(meta.ls)) { if (!SYNC_KEY.test(k)) continue; const v = get(k); if (v != null) o[k] = { v, at: m.at }; } return o; };
  async function sync(first) {
    const tok = get(DTOK); if (!tok) return;
    try { orig.call(localStorage, "nxs-sync-peek", String(Date.now())); } catch (e) {}
    let j; try {
      const r = await fetch(API + "/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tok, state: { ls: lsOut() } }) });
      j = await r.json();
    } catch (e) { return; }
    if (!j || !j.ok) return;
    if (j.token) { try { orig.call(localStorage, DTOK, j.token); } catch (e) {} }
    let changed = false;
    for (const [k, x] of Object.entries((j.state && j.state.ls) || {})) {
      if (!SYNC_KEY.test(k) || (meta.ls[k] && meta.ls[k].at >= x.at)) continue;
      applying = true; try { localStorage.setItem(k, x.v); } catch (e) {} applying = false;
      meta.ls[k] = { at: x.at }; changed = true;
    }
    if (changed) { saveMeta(); if (first) { try { if (!sessionStorage.getItem("nxs-sync-reload")) { sessionStorage.setItem("nxs-sync-reload", "1"); location.reload(); } } catch (e) {} } }
  }
  // on opening: take a newer copy from another device (at most every 2 min, like the timers), then the page redraws once
  let peek = +get("nxs-sync-peek") || 0;
  try { sessionStorage.removeItem("nxs-sync-reload") } catch (e) {}
  if (Date.now() - peek > 2 * 60000) sync(true);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Date.now() - (+get("nxs-sync-peek") || 0) > 2 * 60000) sync(true); });
})();
