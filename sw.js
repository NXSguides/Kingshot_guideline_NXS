/* NXS Guidelines service worker
   - Images & fonts: show the saved copy right away, check for a newer one in the background.
   - Pages, app code and guide text (html / js / css): show the saved copy right away, fetch the
     newest in the background, and tell the page when something changed (it shows a small
     "new version — refresh" note). Repeat visits open instantly, even on a slow connection.
   - Small data files (announcements, events …): try the network first; if it doesn't answer
     within 3 seconds (or there is no internet), show the saved copy. */
const CACHE = "nxs-v5";
const NETWORK_TIMEOUT_MS = 3000;
const SHELL = [
  "./",
  "index.html",
  "css/styles.css",
  "data/content-core.js",
  "js/app.js",
  "js/assistant.js",
  "data/announcements.json",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: "reload" })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function save(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
}

/* Images & fonts: saved copy first, refresh in the background */
function cacheFirst(e, req) {
  return caches.match(req).then((hit) => {
    const update = fetch(req).then((res) => save(req, res)).catch(() => hit);
    if (hit) { e.waitUntil(update); return hit; }
    return update;
  });
}

/* Pages, code, guide text: saved copy first; the newest is fetched in the background and the
   open pages are told when it differs from what they are showing. */
function staleWhileRevalidate(e, req) {
  const key = req.mode === "navigate" ? "index.html" : req;
  return caches.match(key).then((hit) => {
    const update = fetch(req, { cache: "no-cache" }).then((res) => {
      if (!res || !res.ok) return res;
      if (hit && changed(hit, res)) notifyClients();
      save(key, res);
      return res;
    });
    if (hit) { e.waitUntil(update.catch(() => {})); return hit; }
    return update.catch(() => caches.match("index.html"));
  });
}
function changed(a, b) {
  const tag = (r) => r.headers.get("etag") || "";
  const len = (r) => r.headers.get("content-length") || "";
  const mod = (r) => r.headers.get("last-modified") || "";
  if (tag(a) && tag(b)) return tag(a) !== tag(b);
  return mod(a) !== mod(b) || len(a) !== len(b);
}
let notified = 0;
function notifyClients() {
  if (Date.now() - notified < 5000) return;     // several files change together → one message
  notified = Date.now();
  self.clients.matchAll({ type: "window" }).then((cs) => cs.forEach((c) => c.postMessage({ type: "nxs-update" })));
}

/* Data files: network first, saved copy after 3 s or when offline */
function networkFirst(e, req) {
  const fromNet = fetch(req, { cache: "no-cache" }).then((res) => save(req, res));
  e.waitUntil(fromNet.catch(() => {}));
  const fallback = () => caches.match(req, { ignoreSearch: true });

  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => fallback().then(finish), NETWORK_TIMEOUT_MS);
    fromNet
      .then((res) => { clearTimeout(timer); finish(res); })
      .catch(() => { clearTimeout(timer); fallback().then((hit) => { if (hit) finish(hit); else if (!done) { done = true; resolve(Response.error()); } }); });
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  const isImage = sameOrigin && /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(url.pathname);
  const isVideo = sameOrigin && /\.(mp4|webm|mov)$/i.test(url.pathname);
  const isShell = sameOrigin && (req.mode === "navigate" || /\.(html|js|css)$/i.test(url.pathname));

  if (isFont || isImage) { e.respondWith(cacheFirst(e, req)); return; }
  if (isVideo) return;
  if (isShell) { e.respondWith(staleWhileRevalidate(e, req)); return; }
  if (sameOrigin) e.respondWith(networkFirst(e, req));
});
