/* Smoke test: opens the site in a headless browser and fails on any uncaught JavaScript error.
   Runs in CI (.github/workflows/ci.yml) before anything reaches the live site, and can be run locally:
     npx playwright install chromium && node scripts/smoke.mjs
   The Worker is never contacted — every request to it is answered with a stub, so the test costs no allowance. */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = process.cwd();
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".ico": "image/x-icon" };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = normalize(join(ROOT, p));
  try { if (!(await stat(f)).isFile()) throw 0; res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); res.end(await readFile(f)); }
  catch (e) { res.writeHead(404); res.end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const TABS = ["events", "ranking", "post", "watch", "scout", "views", "map", "bt", "board", "attend", "perms"];
const errors = [];
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const ctx = await browser.newContext({ locale: "zh-TW" });
// the Worker is stubbed: no real traffic, no allowance used
await ctx.route(/workers\.dev/, (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, n: 0, topics: [], items: [], error: "logged_out" }) }));
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(`[${page.url().replace(BASE, "")}] ${e.message}`));
page.on("console", (m) => { if (m.type() === "error" && !/favicon|net::|404|cdnjs|cdn\./.test(m.text())) errors.push(`[console ${page.url().replace(BASE, "")}] ${m.text()}`); });

async function open(path) {
  await page.goto(BASE + path, { waitUntil: "load" });
  await page.waitForTimeout(800);
}

/* 1. main site: a few guide pages, the ⏰ panel, three languages */
await open("/index.html");
for (const lang of ["en", "ko", "ar"]) {
  await page.evaluate((l) => { try { localStorage.setItem("ks-lang", l); } catch (e) {} }, lang);
  await open("/index.html");
}
const guideLinks = await page.$$eval("a[href^='#guide-'], a[href^='#']", (as) => [...new Set(as.map((a) => a.getAttribute("href")).filter((h) => /^#guide-|^#kvk|^#today/.test(h)))].slice(0, 6));
for (const h of guideLinks) { await page.goto(BASE + "/index.html" + h); await page.waitForTimeout(300); }
const chip = await page.$("[data-a='timers'], .tm-chip, #tm-chip");
if (chip) { await chip.click().catch(() => {}); await page.waitForTimeout(400); }

/* 2. KvK calculator */
await open("/kvk-calculator.html");

/* 3. officer page: every tab must at least render without throwing (the data stays locked — no password in CI) */
await open("/officer-x7k2p9.html");
const missing = await page.evaluate((tabs) => tabs.filter((t) => !document.getElementById("pg-" + t)), TABS);
if (missing.length) errors.push("officer page: missing sections " + missing.join(", "));
const noInit = await page.evaluate((tabs) => tabs.filter((t) => !(typeof OFFICER_PAGES !== "undefined" && OFFICER_PAGES[t])), TABS);
if (noInit.length) errors.push("officer page: OFFICER_PAGES has no entry for " + noInit.join(", "));
for (const t of TABS) {
  await page.evaluate(async (t) => { location.hash = t; if (typeof showTab === "function") await showTab(); }, t);
  await page.waitForTimeout(250);
  const shown = await page.evaluate((t) => { const el = document.getElementById("pg-" + t); return el && !el.hidden; }, t);
  if (!shown && t !== "perms") errors.push(`officer page: tab "${t}" did not open`);   // 👥 perms stays admin-only
}

await browser.close();
server.close();
if (errors.length) { console.error("❌ smoke test failed:\n" + errors.map((e) => " - " + e).join("\n")); process.exit(1); }
console.log("✅ smoke test passed (site, calculator, officer tabs: " + TABS.join(" ") + ")");
