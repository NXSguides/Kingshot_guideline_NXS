/* NXS Guidelines service worker
   - Images & fonts: show the saved copy right away, check for a newer one in the background.
   - Pages, app code, guide text and data files: try the network first (so new uploads show up
     right away); if it doesn't answer within 1.5 s for pages/code (3 s for data files), or there
     is no internet, show the saved copy. */
const CACHE = "nxs-v132";
const INBOX = "nxs-inbox", INBOX_KEY = "./__inbox";   // reminders that arrived, for the red badge + the "🔔 missed" card
const NETWORK_TIMEOUT_MS = 3000;        // data files
const SHELL_TIMEOUT_MS = 1500;          // pages, code, guide text
const SHELL = [
  "./",
  "index.html",
  "css/styles.css",
  "data/content-core.js",
  "data/highlights.js",
  "data/event-names.js",
  "js/app.js",
  "js/assistant.js",
  "js/timers.js",
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
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== INBOX).map((k) => caches.delete(k))))
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

/* Inbox: every reminder that arrives is kept for 24 h (max 30). The app icon shows a red badge with the number
   not seen yet; the site shows them in a "🔔 Reminders" card at the top and marks them seen. */
async function inboxGet() {
  try { const r = await (await caches.open(INBOX)).match(INBOX_KEY); const l = r ? await r.json() : []; return Array.isArray(l) ? l.filter((x) => Date.now() - x.at < 864e5) : []; } catch (e) { return []; }
}
async function inboxSet(list) {
  try { await (await caches.open(INBOX)).put(INBOX_KEY, new Response(JSON.stringify(list), { headers: { "Content-Type": "application/json" } })); } catch (e) {}
  const n = list.filter((x) => !x.seen).length;
  try { if (n && self.navigator.setAppBadge) await self.navigator.setAppBadge(n); else if (!n && self.navigator.clearAppBadge) await self.navigator.clearAppBadge(); } catch (e) {}
  for (const c of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) c.postMessage({ nxs: "inbox" });
}

/* ⏰ Timer notifications: the Worker sends {title, body, tag}; tapping one opens the site's timer list */
self.addEventListener("push", (e) => {
  let m = {};
  try { m = e.data ? e.data.json() : {}; } catch (err) { m = { title: "NXS", body: e.data ? e.data.text() : "" }; }
  // admin reminders open the officer checklist; officers' Bear Hunt reminders ("…-bt") open the BT squad calculator
  const url = /^adm-/.test(m.tag || "") ? "./officer-x7k2p9.html#events?ev=" + m.tag.replace(/^adm-/, "").replace(/-\d+$/, "")
    : /-bt$/.test(m.tag || "") ? "./bear-calculator.html"
    : /^brd-/.test(m.tag || "") ? "./officer-x7k2p9.html#board?t=" + m.tag.slice(4) : "./?timers";   // 💬 new board message → that topic
  const id = m.tag || "n" + Date.now();
  e.waitUntil(Promise.all([
    self.registration.showNotification(m.title || "NXS", {
      body: m.body || "", tag: m.tag || undefined, renotify: !!m.tag,
      icon: "icons/icon-192.png", badge: "icons/icon-192.png", data: { url, id } }),
    inboxGet().then((l) => inboxSet(l.filter((x) => x.id !== id).concat({ id, title: m.title || "NXS", body: m.body || "", url, at: Date.now() }).slice(-30))),
  ]));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const id = e.notification.data && e.notification.data.id;
  if (id) e.waitUntil(inboxGet().then((l) => inboxSet(l.filter((x) => x.id !== id))));   // opened from the notification = read
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    const admin = !/[?&]timers\b/.test(url);   // anything but the timer list: go to that page
    for (const c of list) if (c.url.startsWith(self.registration.scope) && "focus" in c) {
      if (admin) return c.navigate ? c.navigate(url).then((w) => w && w.focus()) : self.clients.openWindow(url);
      c.postMessage({ nxs: "open-timers" }); return c.focus();
    }
    return self.clients.openWindow(url);
  }));
});
