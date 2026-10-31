/* Smoke test: opens the site in a headless browser and fails on any uncaught JavaScript error.
   Runs in CI (.github/workflows/ci.yml) before anything reaches the live site, and can be run locally:
     npx playwright install chromium && node scripts/smoke.mjs
   The Worker is never contacted — every request to it is answered with a stub, so the test costs no allowance. */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { execFileSync } from "node:child_process";
execFileSync(process.execPath, ["scripts/check-help.js"], { stdio: "inherit" });   // 🐦🤖 Little Sparrow and the AI must match (throws → test fails)

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

const TABS = ["events", "ranking", "post", "watch", "views", "map", "move", "hunt", "attack", "growth", "board", "attend", "perms"];
const errors = [];
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const ctx = await browser.newContext({ locale: "zh-TW" });
// the Worker is stubbed: no real traffic, no allowance used
// the officer page needs a Discord login now: /auth/me answers as an admin (Sparrow) with a dummy data key, so every tab can open
await ctx.route(/workers\.dev/, (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(/\/auth\/me/.test(route.request().url())
  ? { ok: true, role: "viewer", dk: Buffer.alloc(32, 7).toString("base64"), token: "t", user: { id: "1547403844374368327", name: "Smoke" } }
  : { ok: true, n: 0, topics: [], items: [], error: "logged_out" }) }));
await ctx.addInitScript(() => { if (/officer-/.test(location.pathname)) try { localStorage.setItem("nxs-discord-v1", "t"); } catch (e) {} });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(`[${page.url().replace(BASE, "")}] ${e.message}`));
page.on("console", (m) => { if (m.type() === "error" && !/favicon|net::|Failed to load resource|cdnjs|cdn\./.test(m.text())) errors.push(`[console ${page.url().replace(BASE, "")}] ${m.text()}`); });

/* 📏 controls that sit side by side in one row must have the same height and line up (buttons next to text boxes, selects…) */
const alignCheck = () => {
  const sel = "button:not(.sp-call):not(.sp-bubble button), a.btn, a.tm-link, select, input:not([type=checkbox]):not([type=radio]):not([type=range]), .btn, .chip, .tm-btn, label.btn";
  const els = [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && e.offsetParent && getComputedStyle(e).visibility !== "hidden"; });
  const rowOf = (e) => { let p = e.parentElement; for (let k = 0; k < 4 && p; k++, p = p.parentElement) if (/flex|grid/.test(getComputedStyle(p).display)) return p; return e.parentElement; };
  const name = (e) => (e.id ? "#" + e.id : e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 2).join(".")) + ` "${(e.textContent || e.value || "").trim().slice(0, 16)}"`;
  const groups = new Map(), out = new Set();
  for (const e of els) { const p = rowOf(e); if (!groups.has(p)) groups.set(p, []); groups.get(p).push(e); }
  for (const list of groups.values()) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = list[i].getBoundingClientRect(), b = list[j].getBoundingClientRect();
    if (Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) <= Math.min(a.height, b.height) * 0.5) continue;   // not in the same row
    const dh = Math.abs(a.height - b.height), dc = Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2);
    if (dh > 2 || dc > 2) out.add(`${name(list[i])} ${Math.round(a.height)}px vs ${name(list[j])} ${Math.round(b.height)}px`.replace(/-\d+(-\d+)*/g, ""));
  }
  return [...out].slice(0, 6);
};
async function align(label) { for (const x of await page.evaluate(alignCheck)) errors.push(`[align ${label}] ${x}`); }
async function open(path) {
  await page.goto(BASE + path, { waitUntil: "load" });
  await page.waitForTimeout(800);
  await align(path);
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

/* 2. KvK calculator + bear calculator */
await open("/kvk-calculator.html");
await open("/bear-calculator.html");
if (!(await page.$eval("#bt_title", (e) => e.textContent.trim()).catch(() => ""))) errors.push("bear calculator: no title (bt.js did not start)");

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
  await align("officer #" + t);
  if (!shown && t !== "perms") errors.push(`officer page: tab "${t}" did not open`);   // 👥 perms stays admin-only
}

await browser.close();
server.close();
if (errors.length) {
  console.error("❌ smoke test failed:\n" + errors.map((e) => " - " + e).join("\n"));
  if (process.env.GITHUB_ACTIONS) for (const e of errors.slice(0, 10)) console.log("::error::" + e.replace(/\r?\n/g, " ").slice(0, 400));   // shows up in the run's annotations
  process.exit(1);
}
console.log("✅ smoke test passed (site, calculator, officer tabs: " + TABS.join(" ") + ")");
