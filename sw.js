/* NXS Guidelines service worker
   - Images & fonts: show the saved copy right away, check for a newer one in the background.
   - Pages, app code, guide text and data files: try the network first (so new uploads show up
     right away); if it doesn't answer within 1.5 s for pages/code (3 s for data files), or there
     is no internet, show the saved copy. */
const CACHE = "nxs-v8";
const NETWORK_TIMEOUT_MS = 3000;        // data files
const SHELL_TIMEOUT_MS = 1500;          // pages, code, guide text
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

/* Data files: network first, saved copy after 3 s or when offline */
function networkFirst(e, req, timeoutMs) {
  // pages are cached under their own address ("?x=…" ignored); index.html doubles as "./"
  const key = req.mode === "navigate" ? new Request(new URL(req.url).pathname.replace(/\/$/, "/index.html")) : req;
  const fromNet = fetch(req, { cache: "no-cache" }).then((res) => save(key, res));
  e.waitUntil(fromNet.catch(() => {}));
  const fallback = () => caches.match(key, { ignoreSearch: true });

  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => fallback().then(finish), timeoutMs);
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
  if (isShell) { e.respondWith(networkFirst(e, req, SHELL_TIMEOUT_MS)); return; }
  if (sameOrigin) e.respondWith(networkFirst(e, req, NETWORK_TIMEOUT_MS));
});
