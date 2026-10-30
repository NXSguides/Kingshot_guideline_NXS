/* NXS AI assistant — Cloudflare Worker
   Paste this whole file into the Cloudflare Worker editor.
   Secrets (Settings → Variables and Secrets):
     GEMINI_API_KEY — from a SEPARATE Google AI Studio project
     DATA_KEY       — the officer data key from the Post tab (needed once officer data is encrypted)
     GOATCOUNTER_TOKEN — GoatCounter API token (Settings → API → "Read statistics"); for the officer Views tab
   VAPID_PRIVATE  — private half of the push-notification key (for the ⏰ timers)
   DISCORD_CLIENT_SECRET — Discord app (NXS Guidelines) → OAuth2 → Client Secret (officer login with Discord)
   OFFICER_PASSWORD — the current officer password (officers who log in with Discord don't need to type it)
   Binding (Settings → Bindings → KV namespace), optional but recommended: LIMITS
     — remembers how many questions each device / IP asked today. Without it the daily
       limits still work, but only roughly (they reset whenever Cloudflare restarts the Worker).
   Everyone:  answers from data/ai-context.txt (public guides + announcements).
   Officers:  also roster / watch data. "Officer" = proves the officer password (it opens data/data-key.json),
              checked here with a hash of the DATA_KEY secret. */

import { DurableObject } from "cloudflare:workers";

const VERSION = "2026-10-15k";
const GC_SITE = "https://incrediblesparrow.goatcounter.com";   // GoatCounter site; token = GOATCOUNTER_TOKEN secret
const SITE_ORIGIN = "https://nxsguides.github.io";
const SITE_BASE = SITE_ORIGIN + "/Kingshot_guideline_NXS/";
const REPO = "NXSguides/Kingshot_guideline_NXS";
// Same fallback idea as the translate script: if one model is busy or gone, try the next.
const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3-flash-preview"];

const LIMIT_PER_MIN = 6;          // per visitor IP (best-effort)
// Daily limits for non-officers (officers are not limited). Days reset at 00:00 UTC.
const DEVICE_PER_DAY = 15;        // per browser/device
const IP_PER_DAY = 40;            // per internet connection (a family or school Wi-Fi shares one)
const CACHE_MS = 10 * 60 * 1000;  // re-read site data every 10 minutes

const LANG_NAMES = { en: "English", zh: "Traditional Chinese (繁體中文)", ko: "Korean", de: "German", fr: "French",
  pt: "Brazilian Portuguese", es: "Spanish", tr: "Turkish", id: "Indonesian", ru: "Russian", th: "Thai", ar: "Arabic" };

const publicCache = {};   // lang -> { text, at }
let officerCache = { text: "", at: 0 };
const hits = new Map();      // ip -> [timestamps]

const cors = {
  "Access-Control-Allow-Origin": SITE_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const isLimitErr = (e) => /exceeded allowed|free tier/i.test(String(e && e.message || e));
const json = (obj, status = 200) => Response.json(obj, { status, headers: cors });

export default {
  /* ⏱️ no cron any more (it used to look the 🎯 blacklist up every 15 min while All Out ran) */
  async scheduled() {},   // no timed jobs: the 🎯 blacklist is looked up only when an officer presses ↻ Reload (MightPulse only changes after "Update Map")
  async fetch(req, env, ctx) {
    try { return await handle(req, env, ctx); }
    catch (e) {
      // Cloudflare's free-plan daily storage allowance is used up (resets 00:00 UTC): say so clearly, nothing is broken
      if (isLimitErr(e)) return json({ error: "db_limit", detail: [String(e && e.message || e)] }, 503);
      return json({ error: "worker", detail: [String(e && e.message || e)] }, 500);
    }
  },
};

async function handle(req, env, ctx) {
  {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const path = new URL(req.url).pathname;
    if (path.startsWith("/auth/") || path === "/sync" || path === "/sync/forget" || path === "/board" || path === "/attend" || path === "/plans" || path === "/rewards" || path === "/perms") return authRoute(req, env, path, ctx);   // 🔑 officer login with Discord
    if (path === "/push/save" || path === "/push/test") {
      if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
      return pushRoute(req, env, path);
    }
    const isCheck = req.method === "GET" && new URL(req.url).pathname === "/check";
    if (!isCheck && req.method !== "POST") return json({ error: "POST only — open /check to test the setup" }, 405);
    if (!isCheck && req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);

    const ip = req.headers.get("CF-Connecting-IP") || "?";
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
    if (recent.length >= LIMIT_PER_MIN) return json({ error: "slow_down" }, 429);
    recent.push(now); hits.set(ip, recent);
    if (isCheck) return check(req, env);

    let body;
    try { body = await req.json(); } catch (e) { return json({ error: "bad request" }, 400); }
    if (body.stats) return stats(body, env);                 // officer page → Views tab
    if (body.blacklist) return blacklistRoute(req, env, body);   // officer page → 🎯 Blacklist tab
    const question = String(body.question || "").trim().slice(0, 600);
    if (!question) return json({ error: "empty" }, 400);
    const siteLang = LANG_NAMES[body.lang] ? body.lang : "en";
    const lang = detectLang(question, siteLang);   // language of the question decides the answer language
    const history = (Array.isArray(body.history) ? body.history : []).slice(-6)
      .filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string")
      .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 1500) }] }));

    const acc = await officerAccess(req, env, body);   // 🔒 Discord login + the 👥 table (which tabs this officer may open)
    const officer = !!acc;

    // daily limit (checked now, counted only when an answer is actually given)
    let quota = null;
    if (!officer) {
      quota = await dailyCheck(env, body.deviceId, ip);
      if (!quota.ok) return json({ error: "daily_limit", limit: DEVICE_PER_DAY }, 429);
    }

    let context, terms = "";
    try {
      context = await getPublic(lang);
      // put the term list first, where the model pays most attention
      const at = context.indexOf("### GAME TERMS");
      if (at >= 0) { terms = context.slice(context.indexOf("\n", at) + 1).trim(); context = context.slice(0, at).trim(); }
      if (officer) {
        context += "\n\n" + helpFor(acc.tabs);
        try { const od = officerDataFor(await getOfficer(env), acc.tabs); if (od) context += "\n\n" + od; }
        catch (e) { context += "\n\n(OFFICER DATA is unavailable right now: " + e.message + ")"; }
        if (acc.tabs.has("events")) {
          try { context += "\n\n" + await getEvents(env); }
          catch (e) { context += "\n\n(EVENTS DATA is unavailable right now: " + e.message + ")"; }
        }
      }
    } catch (e) { return json({ error: "site_unreachable" }, 502); }

    const system = [
      "You are the helper for the NXS alliance's Kingshot guide website (alliance NXS / NEXUS, kingdom #2189).",
      "Use ONLY the SITE CONTENT below. If the answer isn't there, say so briefly and point to the closest page.",
      `Reply in ${LANG_NAMES[lang]} (the language of the question).`,
      "GAME TERMS: always use the official in-game names exactly as written in the TERM LIST and the SITE CONTENT " +
        "(e.g. hero, event, building, item and buff names). Never leave a game term in English when the list has a translation, " +
        "and never invent your own translation of a game term.",
      "ANSWER FORMAT: first give the actual answer directly (the specific heroes, numbers, times, steps, names) " +
        "in a few short lines or a short list — do NOT just tell the user to read a page. " +
        "Then add one last line starting with 📖 that links the 1–2 pages where the answer actually comes from. " +
        "Only link a page whose content really covers the question; if none does, leave the 📖 line out.",
      "Link guides as [Guide name](#guide-id), using the id after 'GUIDE #'. " +
        "The guide #install-app is ONLY about adding the site to a phone's home screen — never link it for anything else.",
      "Never translate or change member names.",
      officer
        ? "This user is a verified OFFICER (" + acc.role + "). Tabs this officer may open: " + [...acc.tabs].map((t) => AI_TAB_NAMES[t] || t).join(", ") + ". " +
          "Answer from the OFFICER PAGES — HOW TO USE section (use the button names as written there), the OFFICER DATA and the EVENTS DATA below — they only contain what this officer may see. " +
          "If asked about another officer tab, its data, or something not in those sections that sounds internal (members' notes, other officers' settings, who has which permission), " +
          "reply only with one short sentence meaning \"You don't have access to that tab — an admin can give it on the 👥 Officers tab.\" in the reply language; do not describe what is there. " +
          "When giving an in-game guide from EVENTS DATA, copy its text exactly (it is pasted into the game) and keep separate messages separate. " +
          "Officer pages you may link: " + [...acc.tabs].filter((t) => AI_TAB_LINKS[t]).map((t) => AI_TAB_LINKS[t]).join(", ") + ". " +
          "For questions about officer pages, members or the roster, the 📖 line links the matching officer page above, not a guide."
        : "This user has no special access. If asked about member stats, rosters, power rankings, who joined/left/renamed, other alliances, " +
          "hidden or admin pages, or anything else not in the SITE CONTENT that sounds internal, reply only with one short sentence meaning " +
          "\"You don't have permission to view this. Please unlock first.\" in the reply language — do not explain what exists, what unlocking is or how to do it.",
      lang === "en" ? "" :
        `Some sections below (officer handbook, officer data) are written in English: when you use anything from them, ` +
        `translate every game term with the TERM LIST — event, hero, building, item and buff names must never stay in English. ` +
        `Member names are the only exception (never translate them).`,
      terms ? "\n===== TERM LIST (English = official " + LANG_NAMES[lang] + " name; always use the right-hand name) =====\n" + terms : "",
      "\n===== SITE CONTENT =====\n" + context,
    ].join("\n");

    if (!env.GEMINI_API_KEY) return json({ error: "setup", detail: ["GEMINI_API_KEY secret is missing"] }, 500);
    const contents = [...history, { role: "user", parts: [{ text: question }] }];
    const fails = [];
    const wantStream = body.stream === 1;   // newer site code reads the answer as it is written
    for (const model of MODELS) {
      const res = wantStream ? await geminiStream(env, model, system, contents) : await gemini(env, model, system, contents);
      if (res.answer) {
        const left = quota ? await quota.count() : null;
        return json({ answer: res.answer, officer, left, token: acc ? acc.token : undefined });
      }
      if (res.stream) {
        // first text already arrived → send the rest as it comes: one JSON object per line
        // {"meta":{officer,left}} first, then {"t":"…"} pieces, then {"done":1}
        const left = quota ? await quota.count() : null;
        const enc = new TextEncoder();
        const { readable, writable } = new TransformStream();
        const w = writable.getWriter();
        (async () => {
          try {
            await w.write(enc.encode(JSON.stringify({ meta: { officer, left, token: acc ? acc.token : undefined } }) + "\n"));
            await w.write(enc.encode(JSON.stringify({ t: res.first }) + "\n"));
            for await (const piece of res.stream) if (piece) await w.write(enc.encode(JSON.stringify({ t: piece }) + "\n"));
            await w.write(enc.encode(JSON.stringify({ done: 1 }) + "\n"));
          } catch (e) {
            try { await w.write(enc.encode(JSON.stringify({ error: String(e && e.message || e) }) + "\n")); } catch (x) {}
          }
          try { await w.close(); } catch (e) {}
        })();
        return new Response(readable, { headers: { ...cors, "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" } });
      }
      fails.push(`${model}: ${res.error}`);
      // 429 = free quota used up for this model, 404 = model retired, 503 = busy → try next
    }
    const allQuota = fails.every((f) => f.includes("429"));
    return json({ error: allQuota ? "quota" : "gemini", detail: fails }, 503);
  }
}

/* One Gemini call. Thinking is kept low: on "thinking" models it uses the same token budget as
   the answer, and a too-small budget gives an empty answer. */
async function gemini(env, model, system, contents, extra = {}) {
  const thinking = model.startsWith("gemini-2.5") ? { thinkingBudget: 0 } : { thinkingLevel: "low" };
  for (const withThinking of [true, false]) {
    let r;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { maxOutputTokens: 4096, temperature: 0.3, ...extra, ...(withThinking ? { thinkingConfig: thinking } : {}) },
        }),
      });
    } catch (e) { return { error: "network " + e.message }; }
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      const c = data.candidates?.[0];
      const answer = (c?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || "").join("").trim();
      return answer ? { answer } : { error: `empty answer (${c?.finishReason || data.promptFeedback?.blockReason || "?"})` };
    }
    const msg = `HTTP ${r.status} ${data.error?.status || ""} ${String(data.error?.message || "").slice(0, 140)}`.trim();
    // 400 because this model doesn't accept the thinking setting → retry once without it
    if (r.status === 400 && withThinking && /thinking/i.test(msg)) continue;
    return { error: msg };
  }
  return { error: "failed" };
}

/* Same call, but streamed: resolves as soon as the first piece of text arrives, with an async
   iterator for the rest — so the reader sees the answer being written instead of waiting for all of it. */
async function geminiStream(env, model, system, contents) {
  const thinking = model.startsWith("gemini-2.5") ? { thinkingBudget: 0 } : { thinkingLevel: "low" };
  for (const withThinking of [true, false]) {
    let r;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
        method: "POST",
        headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { maxOutputTokens: 4096, temperature: 0.3, ...(withThinking ? { thinkingConfig: thinking } : {}) },
        }),
      });
    } catch (e) { return { error: "network " + e.message }; }
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      const msg = `HTTP ${r.status} ${data.error?.status || ""} ${String(data.error?.message || "").slice(0, 140)}`.trim();
      if (r.status === 400 && withThinking && /thinking/i.test(msg)) continue;
      return { error: msg };
    }
    // SSE: lines "data: {...}" separated by blank lines
    const reader = r.body.getReader(), dec = new TextDecoder();
    let buf = "", finish = "";
    async function* pieces() {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let at;
        while ((at = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, at).trim(); buf = buf.slice(at + 1);
          if (!line.startsWith("data:")) continue;
          let j; try { j = JSON.parse(line.slice(5)); } catch (e) { continue; }
          const c = j.candidates?.[0];
          if (c?.finishReason) finish = c.finishReason;
          const text = (c?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || "").join("");
          if (text) yield text;
        }
      }
    }
    const it = pieces();
    let first = "";
    for (;;) {                       // wait for the first real text; an empty stream = try the next model
      const { value, done } = await it.next();
      if (done) return { error: `empty answer (${finish || "?"})` };
      if (value.trim()) { first = value; break; }
    }
    return { stream: it, first };
  }
  return { error: "failed" };
}

/* Open https://<your-worker>.workers.dev/check in a browser to test the setup (no secrets are shown). */
async function check(req, env) {
  const out = { worker: "ok", version: VERSION, colo: req.cf?.colo || "?", country: req.cf?.country || "?",
    GEMINI_API_KEY: env.GEMINI_API_KEY ? "set" : "MISSING", DATA_KEY: env.DATA_KEY ? "set" : "not set", MIGHTPULSE_API_KEY: env.MIGHTPULSE_API_KEY ? "set" : "not set (🎯 blacklist every 15 min off)",
    VAPID_PRIVATE: env.VAPID_PRIVATE ? "set" : "MISSING (timer notifications off)", TIMERS: env.TIMERS ? "ok" : "MISSING" };
  // where the Worker actually runs (with placement this should be a US data center, not HKG)
  try { const tr = await (await fetch("https://www.cloudflare.com/cdn-cgi/trace")).text(); out.runs_in = (tr.match(/colo=(\w+)/) || [])[1] || "?"; }
  catch (e) { out.runs_in = "?"; }
  try { out.ai_context = (await getPublic("zh")).length + " characters (zh)"; }
  catch (e) { out.ai_context = "ERROR " + e.message; }
  if (env.DATA_KEY) {
    try { const r = await openData(JSON.parse(await getText("data/ai-officer.json")), env); out.officer_data = `ok (built ${String(r.built).slice(0, 16)}, ${r.text.length} characters)`; }
    catch (e) { out.officer_data = "ERROR " + e.message; }
  }
  if (env.LIMITS) { try { out.session_key = (await env.LIMITS.get("session-key")) ? "set (logins survive secret changes)" : "made on first login"; } catch (e) { out.session_key = "ERROR " + e.message; } }
  if (env.TIMERS) {   // how big the stored data is (reads only) — a table that keeps growing points at what eats the daily write allowance
    try { out.db = await env.TIMERS.get(env.TIMERS.idFromName("all")).counts(); }
    catch (e) { out.db = "ERROR " + e.message; }
  }
  out.models = {};
  if (env.GEMINI_API_KEY) {
    for (const m of MODELS) {
      const r = await gemini(env, m, "Reply with the single word OK.", [{ role: "user", parts: [{ text: "test" }] }]);
      out.models[m] = r.answer ? "OK" : r.error;
      if (r.answer) break;   // one working model is enough
    }
  }
  return Response.json(out, { headers: { "content-type": "application/json; charset=utf-8" } });
}

/* ---------- Officer handbook: how to use the hidden officer pages (sent to verified officers only) ----------
   Edit freely — plain text. Add your alliance's own rules at the end.
   🔒 Follows the 👥 table: a line "@tab" makes the lines after it (until the next blank line) belong to that tab;
   "[tab] " at the start of a line does it for one line. Officers only get the parts of tabs they may open.
   Untagged lines are for every officer. New feature? Update this AND js/sparrow.js (scripts/check-help.js checks). */
const OFFICER_HELP = `
### OFFICER PAGES — HOW TO USE (officers only)
GETTING IN
- Officers log in with Discord. Only people added on the 👥 Officers tab (by an admin, with their Discord ID) can get in. On the main site, tap the title "NXS Guidelines" 5 times quickly (within 2 seconds), or tap the 📋 button at the top right (shown once this browser has logged in) → log in with Discord. The old officer password alone no longer opens the officer pages.
- Each tab can be ✏️ Edit, 👁️ View or hidden per officer (👥 Officers tab, admins only). A new officer starts with 📅 Events, 💬 Board and 🗺️ Map as view-only. If a tab is missing, ask an admin (Sherry) to give it.
- All officer tabs are one page now (officer-x7k2p9.html); switching tabs is instant and you log in once. The tabs, in order: 📅 Events (中文: 活動排程), 💬 Board (討論板), 🗺️ Map (王國地圖), 🚚 Move (搬家, admins unless given), 📊 Ranking (成員排序), 📋 Attendance (出席), 📢 Post (發布公告), 🕵️ Watch (觀察名單), 🔭 Scout (偵察), 📈 Views (網站瀏覽), 👥 Officers (幹部, admins only). Each officer only sees the tabs the 👥 table gives them.
[views] - 📈 Views (中文: 網站瀏覽): site statistics — visitors per day, which guides and languages people open, countries, where they came from, devices; 7 / 30 / 90 days. Counting is GoatCounter, anonymous (no cookies, names or IPs). NOT counted: any browser where an officer has logged in to the officer page (officers test the site all day), and the officer page itself. So "this browser: not counted" on the Views tab is normal for every officer. If it says the token is not set: Cloudflare Worker → Settings → Variables and Secrets → add GOATCOUNTER_TOKEN (GoatCounter → Settings → API → new token with "Read statistics").
[map] - 🗺️ Map (中文: 王國地圖): kingdom map, Outpost buffs and the shared Outpost plan — see the 🗺️ MAP section below.
- Language: officer pages are in English, 中文, Português, العربية and 한국어 (the language button on any tab switches all tabs together).
- When answering in Chinese, call the tabs by their 中文 names above (they are what officers see on screen).
[events] - Events tab → "⏰ Our event times (UTC)" (中文: 我們的活動時間): officers set the times we pick for Bear Hunt, Swordland, Tri-Alliance Clash, Viking Vengeance and Cesares Fury (e.g. 13:00, 22:00; Cesares Fury 22:35) and press Save. Used by the home page "Today & this week" card and everyone's ⏰ Game reminders. The same card has "Next Bear day (UTC)" (中文: 下一個熊日): if the game moves Bear Hunt to another day, set the new date there and Save — the home page, the officer calendar and to-dos, and everyone's ⏰ reminders all follow (Bear Hunt then repeats every 2 days from that date). Bear Hunt times changed? Change them in the same card.
[events] - Events tab also lists Sanctuary Battle (中文: 遺跡爭奪): every week Tue 00:00 – Fri 24:00 UTC (sign-up first, R4+ picks 3 time slots, the contest happens at the slot most alliances voted; 1 Sanctuary + 1 Fortress per week, last week's Sanctuaries are signed up automatically). Its in-game guides: the rally call (exactly 70,080 troops: 35,040 Inf / 14,016 Cav / 21,024 Arc, rally from home, no solo attacks) and the defence swap after a capture (Howard/Gordon 60:20:20 = 42,048/14,016/14,016; send defence right after the rally departs, wait 20 s, don't speed up).
- Member data updates automatically every day at 20:13 UTC. If a page says "No data yet": GitHub → Actions → "Update Roster (MightPulse)" → Run workflow, then reload.

@ranking
📊 RANKING (roster-x7k2p9.html) — pick event participants and split them into groups
① Weights: Total Power vs Mystic Trial; the two always add up to 100%.
② Participants & ranking (② 勾選參戰的人和排名; the separate "③ Ranking" card was merged into it on 2026-10-30, so the old ④ / ⑤ are now ③ / ④): tick names, use Select all / Clear, or "Paste a sign-up list" (one name per line or comma-separated; decorations like ♛ and the Nexus tag can be left out; case doesn't matter). "(?)" means several players match — tick that one by hand. Names not found are listed.
In ② the # column is each ticked starter's place in the ranking; "Sort by ranking" (依排名排序, on by default, next to "Only ticked") lists the ticked people in that order, everyone else after them; tapping a column header sorts by that column instead. Score (Weights mode, shown as its own column) = each stat scaled so the best ticked player = 100, combined by the weights; players with no Mystic Trial value count as 0 (marked ?). "Use only the top N" (只取前幾名): ③ groups and ④ battle table take only the first N; rows past it fade. "📋 Copy list" (複製名單): choose who (the ranking, the top N, only who can be registered ✅ + 🟡, or only who hasn't replied), which columns (place, name, ID, reply, rank, Town Center, power, Mystic Trial, Squad Power, Migrant Score, score, sub) and the format: text (one person per line), a table to paste into Google Sheets / Excel (tab-separated), or a lined-up Discord table (code block); preview before copying, choices remembered on the device.
③ Event groups: pick an event (e.g. Swordland Showdown: 4 Attackers, 6 Defenders, everyone else Joiners; 🔱 Tri-Alliance Clash / 三盟爭霸: Team 1 – Deep Attack / Enemy Territory and Team 2 – Boundary Control / Enemy Captures get a third of the ticked starters each (17 people → 5 / 5 / 7), Team 3 – Internal Territory / Support = everyone else; typing a number fixes that size, "↺ Auto (by headcount)" goes back — its "Copy result" lists each member with their power like "1. HADES: 109,468,236", and the Swordland ⑤ battle table is hidden while it is open; keep a separate 🔄 shared plan such as "Legion 2 – Tri" so its ticks stay apart from Swordland). Group sizes can be changed and are remembered. Groups follow the ranking. "Copy result" copies the groups for chat.
④ Battle table: set stages, targets and columns (comma-separated). "Fill a first draft from the ranking" uses the Attackers/Defenders numbers from ③. Tap a name, then tap a box (drag on a computer); × removes. "+ text" adds free text (e.g. "Stays behind"). "Short names" drops decorations. Output: 🖼️ Make image (phone: press and hold the picture to save), 📋 Copy text, or 📢 Use in a new announcement. The table is saved on this device only.

@post
📢 POST (post-k4m8q2.html) — announcements in all 12 languages
- Write: your name, the language you write in (write in your own language), title, message. **text** = bold; links work; "Add picture" inserts at the cursor. Optional "Button to a guide". Check Preview, then 📢 Publish. The translated announcement appears on the site in about 2–3 minutes.
- List: newest first. Delete removes it in all languages.
- Edit → choose what to change:
  • "All languages": the original opens in the Write form; saving translates all 12 languages again (one-language fixes are replaced).
  • One language: fix only that language's text (💾 Save this language); "Use the automatic translation again" undoes a fix. Fixed languages are marked "edited by hand".
  • "Add pictures only": adds pictures to every language at the top or end, without translating again.
- If it says the announcement is still being translated, press Refresh after a few minutes. "Someone else just changed…" → just try again.
- "More" (site owner only): forget the password on this device, redo the setup (new GitHub token / new officer password — always do this from an unlocked Post page so the data key is re-locked too), 🔐 Officer data encryption (shows the data key).
- Error "The saved GitHub key no longer works": the token expired → Sherry redoes the setup.

@watch
🕵️ WATCH (watch-x7k2p9.html) — who joined, left, renamed, and where they came from
- The table shows every member: power and kills (with change over the last days of saved data), TC, kingdom, language, "In NXS since", earlier names, other alliances they were seen in, similar names elsewhere, last login, flags.
- Flags are hints only, not proof: New (joined within the "New" days setting), From kingdom X, Renamed, Was in <watched alliance>, Similar name in…, Power dropped, Check Record (new member nobody has checked yet — shown first).
- Settings: "Watched alliances" and "Our farm / sister alliances"; "Only show members with flags"; search by name or ID.
- ✏️ on a member: add notes and history from their MightPulse Record (Open Record ↗): earlier alliances (one per line, e.g. "RED 2026-09-30", other kingdom "RED #1234 2026-09-30"), earlier names, Cleared / Not clear, "Why / comments", and "I've checked this member's Record". Notes are shared by all officers.
- "Left NXS" lists members who left, when, and where they were seen since.
- Export: 📋 Copy for Google Sheets (paste into cell A1) or ⬇️ Download CSV — includes officers' notes.

@events
📅 EVENTS (events-x7k2p9.html) — the first officer tab: week calendar, officer to-dos, and in-game guides
- Calendar (中文: 活動): one long strip of days in UTC (game day starts 00:00 UTC), two weeks back to ten weeks ahead; scroll sideways. Today is underlined, a dashed line marks each Monday, every event run is one bar (bars that started earlier keep their name in view). Filled bar = running now; a bar with ✅ has open action items (tap → jumps to them); tapping any other bar opens that event's entry below.
- 👑 Kingdom #2189 milestones (王國里程碑): a gold row at the top of the calendar strip, and a fold-out list under it ("Kingdom #2189 milestones · next: …"). Dates (UTC): 2026-11-09 Truegold 5, Gov Charm Material Exchange, 4th Master (Cassia) · 2026-11-30 Governor Charm cap raised (Lv.12+) · 2026-12-21 Gen 4 Heroes (Alcar, Margot, Rosa), Gen 4 Pets, 5th & 6th Masters (Guinevere, Wilson) · 2027-01-18 War Academy (T11 troops) · 2027-03-15 Gen 5 Heroes, Gen 5 Pets, 7th & 8th Masters (Isnor, Aena) · 2027-04-26 Truegold 8 · 2027-06-07 Gen 6 Heroes & Pets · 2027-08-01 First Flamedragon Tyrant Competition · 2027-08-30 Gen 7 Heroes & Pets · 2027-10-11 Advanced Truegold Research · 2027-11-22 Gen 8 Heroes · 2028-02-14 Gen 9 Heroes (predicted) · 2028-03-27 Truegold 10. (Masters, Gen 3 Heroes & Pets unlocked 2026-09-28.) These are projections and can move.
- ✅ Action items (待辦事項): "This week" / "Next week" buttons (on Sundays it opens on next week). One card per event; an event that runs several times in the week (e.g. Bear Hunt) gets one dated task per run; a run belongs to the week it starts in, and its prep tasks are listed with that week. Each task says what to do and by when (⏰ date); overdue items are marked. A task can be limited to its own day until a UTC hour (editor: "Only that day, until UTC hour" 只在當天顯示，到 UTC 幾點) — e.g. the KvK Castle Battle task shows only on day 6 until 22:00 UTC, because the KvK Battle phase runs 12:00–22:00 UTC. A task can also have an exact 🔔 reminder time (editor: "Remind at exact UTC time" 準時提醒 UTC, e.g. 22:30): the officers who get that event's 🛠️ admin reminders are notified at exactly that UTC time on its day, instead of at their daily reminder hour. Built in: 🏆 Alliance Championship — troop updates close at 23:00 UTC on Tuesday (registration day 2), so a Tuesday 22:30 UTC 🔔 reminder tells officers to remind everyone to update their troops (heroes, formation, buffs). Ticks are saved on this device only. Buttons: ✏️ Edit items (編輯待辦 — opens that event's editor at its action items: change the text, the day, the "until UTC hour", add or remove items, then 💾 Save; editing in one language is enough — the other language then shows the same text, no translation needed), 📢 Write announcement (Post tab), 📖 Guide (the guide on the site), 📋 In-game guides (jumps to that event's messages).
- 📋 Events & in-game guides (list below the calendar): tap an event to open it. Each grey box is ONE in-game chat message — the game limits message length, so long guides are split into several messages; send them one by one. 📋 Copy copies one message; the character count is shown next to the title.
- ✏️ next to a message edits just that message (title and text, live character count) → 💾 Save.
- ✏️ Edit at the bottom of an event changes the whole event: emoji, name (中文 / English), "Repeats on a fixed schedule" (first day in UTC, repeats every … days, lasts … days), note (e.g. times), guide on the site, action items (days before (−) / after the start, text in 中文 and English, show an announcement / Ranking button), and the in-game messages (+ Message, ✕ removes). "Delete event" removes it.
- + New event adds an event. Events without a fixed schedule only appear in the list, not in the calendar.
[ranking] - 📊 Ranking tab → "📋 Plan" (中文: 方案) at the top: "🔒 Only on this device" (default, private) or a shared plan made with "+ New shared plan" (e.g. "Legion 1"). In a shared plan every officer sees the same ticked participants, weights, group sizes and battle table; changes show for the others within about 10 seconds to a minute. Shared plans are saved on the Worker (Discord login, no GitHub key): each save sends only what changed on that device, so two officers editing at once — or an old tab left open — don't undo each other. A box at the top of the screen shows the save: ✅ Saved · time / ⏳ Saving / ⚠️ Not saved yet (kept on that device and retried by itself, also after a reload; don't close the page). Rename / Delete buttons next to it. Officers whose 👥 Ranking right is "view" can look but not change a plan.
[post] - 📢 Post tab → "Auto-delete" (中文: 自動刪除) under the guide button: Never / when today ends (00:00 UTC) / when tomorrow ends / after 1, 2, 3 or 7 days / pick a date & time (UTC). The announcement disappears from the site on time by itself (the files are cleaned up within the hour). The list shows "🗑️ auto-delete …". To change or remove the time: Edit → Edit the whole announcement → change Auto-delete → Save (it is not translated again).
- Changes are saved on the site for all officers (other officers see them after refreshing, about 1 minute). Saving uses the same GitHub key as the Post tab; "Someone else changed the events meanwhile" → refresh and try again. The event texts are encrypted like the other officer data.
- Changing the dates of KvK, Viking Vengeance, Swordland Showdown, Tri-Alliance Clash, Eternity's Reach, All Out, Fishing Tournament, Hero Roulette or Cesares Fury also changes when the main site shows those guide buttons on Recent Events.
- If the in-game calendar differs from the page, the game is right — fix the dates with ✏️ Edit.
- The current events, schedules, notes, action items and in-game guide texts are in the EVENTS DATA section below — use it to answer "when is the next …" or "what is the in-game guide for …" (quote in-game guide texts exactly, they are meant to be pasted into the game).

@map
🗺️ MAP (officer-x7k2p9.html#map; 中文: 王國地圖) — Kingdom #2189 buildings, Outpost buffs, and the alliance's Outpost plan
- The map: same direction as the in-game World map (up = bigger X and Y). King's Castle X597 Y597 in the middle; Fortress 1–4 around it (F1 X597 Y800, F2 X400 Y597, F3 X597 Y400, F4 X800 Y597); Sanctuary 1–12 in the outer ring (S1 X237 Y828, S2 X237 Y606, S3 X237 Y348, S4 X366 Y237, S5 X588 Y237, S6 X846 Y237, S7 X957 Y348, S8 X957 Y606, S9 X957 Y828, S10 X846 Y957, S11 X606 Y957, S12 X366 Y957); 74 Outposts as coloured squares, the number = level.
- Tap a building on the map, or a coordinate in the list below it: the map moves there, a yellow ring marks it, and the bar under the map shows name, level, buff and coordinates with a Copy button (copies "X:… Y:…"). + / − zoom; on phones the map starts zoomed in and can be dragged.
- Layer buttons above the map: tap one type to show only that type, tap more to add types, "All" shows everything again; "📋 Plan only" hides Outposts that are not in the plan.
- Fortresses and Sanctuaries give NO buffs (they give Sanctuary Battle season points: Sanctuary 1, Fortress 2 per phase controlled). Only Outposts give buffs.
- Outpost buffs (checked in game): Arsenal 武器庫 (Squads' Attack 部隊攻擊力) Lv.2 +5% ×8, Lv.4 +8% ×3; Armory 防具庫 (Squads' Defense 部隊防禦力) Lv.2 +5% ×8, Lv.4 +8% ×3; Drill Camp 訓練營 (Training Speed 訓練速度) Lv.2 +5% ×8; Frontier Lodge 遠征營 (Squads' March Speed 部隊出征速度) Lv.3 +15% ×4; Scholar's Tower 科技研究所 (Research Speed 研究速度) Lv.1 +5% ×8, Lv.3 +8% ×4; Builder's Guild 建造所 (Construction Speed 建造速度) Lv.1 +5% ×8, Lv.3 +8% ×4; Forager Grove 採集祭壇 (Resource Gathering Speed 資源採集速度) Lv.1 +5% ×8; Harvest Altar 豐收祭壇 (Resource Production Speed 資源生產速度) Lv.1 +5% ×8. Lv.3–4 Outposts sit in the middle ring near the Fortresses; the outer ring is Lv.1–2. (A fan wiki lists Armory as +10% / +20% — wrong; the game shows +5% / +8%.)
- In-game rules: ONLY the same Outpost type at the same level does not stack (two Lv.4 Armories = +8%). The same type at a different level stacks (Lv.2 + Lv.4 Armory = +13%), and different types stack, also at the same level (Lv.2 Arsenal + Lv.2 Armory = +5% attack and +5% defense). An Outpost in the Vulnerable state (可爭奪狀態) gives NO buff until it is Protected again, so the in-game Occupation Buff (佔領增益) total can drop for a while — e.g. on 2026-10-10 it showed Squads' Defense +8% while our Lv.2 Armory was Vulnerable (Lv.2 + Lv.4 normally = +13%; officers saw Builder's Guild Lv.1 + Lv.3 = +13% before). The plan table always shows the full value. You can only attack Outposts that border your alliance territory (plan Alliance HQ and Alliance Banners). Higher-level Outposts cause more severely injured and lost troops (severely injured go to the Infirmary 野戰醫院). Protected 保護狀態 / Vulnerable 可爭奪狀態 timers show when an Outpost can be attacked.
- Our [NXS] Plains HQ (平原總部) is drawn on the map as a blue shield "HQ" at X409 Y668 (always shown; listed with the King's Castle).
- ⭐ Priority (優先順序) for Sanctuaries and Fortresses: tap one on the map → pick a number (1 = best), optionally type its Rewards (獎勵) and a Note (備註). The distance from our Plains HQ is shown. The number appears as a gold "★1" tag on the map and in the "⭐ Sanctuary & Fortress priority" list. Press 💾 Save plan so other officers see it.
- 📋 Outpost plan (據點規劃) — the card right under the map, with the Outpost rules at its top: tap an Outpost → 🎯 Target (目標), ✅ Ours · Protected (已佔領・保護), ⚔️ Ours · Vulnerable (已佔領・可爭奪), or ✕ Clear (清除). Rings on the map: green = ours Protected, red = ours Vulnerable, yellow dashed = target. Fortresses and Sanctuaries can be planned too (🎯 Target / ✅ Ours / ✕ Clear): the card's "Fortresses & Sanctuaries" part shows season points per phase now and with targets (Sanctuary 1, Fortress 2) and warns when more than 1 Sanctuary or 1 Fortress is a target (only 1 of each can be actively signed up per phase). ⚠️ Buff conflict (增益衝突) is worked out from the timers: among our Outposts of the same type + level, the one with more Protected time left (taken most recently) is the conflict and gives no buff; it shows in its own list and in red under the map. So set a timer on every Outpost we hold. (There is no hand-set conflict button any more.) The table shows every buff type's total "Now (as in game)" — Protected only, matching the in-game Occupation Buff screen — and "With targets" (everything we hold + targets) (counted with the stacking rule above); below it the lists of targets and ours (tap one to jump to it). Type your name → 💾 Save plan: saved for all officers (data/outpost-plan-x7k2p9.json, encrypted), shows who saved it and when; "Undo changes" drops unsaved marks. Protected/Vulnerable timer: for an Outpost marked ✅ or ⚔️, the bar under the map has "Protected/Vulnerable time left in game" (天/時/分 = d/h/m) → Set timer (設定計時): type the countdown shown in game once and the page then switches Protected ⇄ Vulnerable by itself (cycle editable under the lists, default 72 h Protected → 24 h Vulnerable — "Cycle 循環"), so the "Now" totals follow the game. The lists show ⏱ time to the next switch. Tapping a status button by hand removes that Outpost's timer; "Remove timer" (移除計時) too. If we lose an Outpost, mark it again by hand. Saved with the plan. Saving uses the same GitHub key as the Post tab. The current saved plan is in the OUTPOST PLAN part of the OFFICER DATA (it updates a few minutes after a save).
- Inside the plan card, under its Fortresses & Sanctuaries part: a Sanctuary Battle sign-up diagram — keeping the Sanctuaries we win turns them into free auto-sign-ups next phase (3 → 4 → 5 points), rotating every phase gives them away and stays at 3; swap Sanctuaries with other alliances at the season change instead.
- When answering in Chinese, use the Chinese names above (they match the in-game 據點爭奪 screen: 據點 Outpost, 遺跡 Sanctuary / Ruins tab, 要塞 Fortress, 王城 King's Castle).

NEWER TOOLS (officers)
[post] - 📢 Post → writing: a Word-like toolbar above the message (select text first): B / I / U / S, highlighter, 🎨 colour, Aa font (Latin letters only; other scripts keep the normal font), H1 / H2 headings, • ≡ bullet list with a chosen symbol, 1.≡ numbered list, ⇤ ⇥ (or Tab / Shift+Tab) to indent list lines, ❝ quote box, ― line. Pasting from ChatGPT, Word or Google Docs keeps the formatting. "🐦 Example" fills the form with a demo of every button (↩️ brings your text back; the example can't be published). The formatting is kept in every language.
[post] - 📢 Post → "Look" (樣式): Plain, 📜 Scroll, or a theme (⚔️ Swordland Showdown, ⛵ Viking Vengeance) that adds the event picture on top; the banner colour can be picked next to it (never red). The scroll grows with the text. Changing the look later with Edit doesn't translate again.
[events] - 📅 Events → "📣 Announcement draft" (公告草稿): "UPCOMING KEY EVENTS" with our times for the next 3/5/7 days, ready to paste in game (300-character limit, counter shown; tick which events go in). Each to-do card also has "📣 Game post" (遊戲公告) for a one-event reminder.
[events] - 📅 Events → "⏰ Our event times": a time can be tied to a battle day with @, e.g. "22:00@1, 13:00@3" (Viking: Day 1 22:00, Day 3 13:00).
[ranking] - 📊 Ranking → "🗂️ Recover plans" (找回計畫, admins only, next to 🕘): every shared plan the server has saves for — deleted plans too — with every saved version (time UTC, who saved, how many ticked, replies, battle-table rows); Restore puts that version back as the current plan for everyone (nothing is lost; another version can be restored later). Up to 1000 saves per plan are kept. If a plan's ticked list or table vanished, an admin restores it here. Same window: "📜 Old GitHub saves" (舊的 GitHub 存檔) — until 10/30 plans were saved in a GitHub file (older open pages kept writing there for a while); pick one of its saves, see every plan in it (ticked, replies, table rows) and Import one as a new shared plan (name + ↩).
[ranking] - 📊 Ranking → ④ Battle table: "⚔️ Swordland rules draft" fills Phase 1, Phase 2 and Stay behind from the ranking (subs left out); ↩️ Undo next to the plan picker; 🕘 Version history (版本紀錄): the last 1000 saves of each plan — pick one to put the plan back (↩️ Undo cancels); "📱 Battle table last edited on this device" brings back a table that was made on that phone/computer but never reached the shared plan.
[map] - 🗺️ Map → 📋 Outpost plan → Sanctuary Battle part: "🎁 What we'd get" (拿到的話可以得到) lists which reward each target gives — for the phase picked on the 🎁 Fortress & Sanctuary rewards card (this week's by default). The ⭐ Priority list also shows each one's reward when no reward was typed.
[map] - 🗺️ Map → 🎁 Fortress & Sanctuary rewards → "✏️ Update rewards" (更新獎勵, officers with ✏️ Map rights): the special reward of each Fortress / Sanctuary can rotate every round, so pick each one's reward and amount from the in-game Battle Rewards screen ("✍️ Other" adds a reward by name). Every phase (1–8) of a season has its own rewards: a "Phase" picker on the card shows any phase (this week's by default, worked out from the date: one phase a week, changing Saturday 00:00 UTC; Season 3 Phase 5 = 2026-10-24 to 10-31). A phase nobody has saved shows the Kingshot Wiki table as the default (it matched the game for phases 3 and 5); ✏️ Update rewards saves the in-game list for that phase, which then wins. The card says where the list comes from: ✅ checked against the game (who · date) or 📖 Wiki default, not checked yet.
[map] - 🗺️ Map → 🚩 banner plan → "⬇️ Download banner coordinates (CSV)": every banner the map shows now (the banner file plus officers' saved edits: built / demolished / moved) and the 🚩 planned ones, as a Kingshot Mapper CSV (type,X,Y,label,#color,seq) that can be imported there. Label NXS = checked in game, NXS? = estimated from the territory picture, plan = planned, not built yet. Use it to count banners or check for missing ones. "⬇️ Download other alliances' banners (CSV)" does the same for the 🏴 other-alliance layer (label = their tag, their HQs included).
[move] - 🚚 Move → "👥 Member positions" (成員位置, at the top of the 🚚 Move page; it used to be on 🗺️ Map): ONE map for the whole move — our block drawn like the in-game map (every member's city, Bear Traps, HQ, banners, mountains/lakes from the map). Search a name or tap a city for X:Y and a copy button. The map opens centred on our Alliance HQ now; "📍 Our HQ now" (我們的總部) and "🧭 New HQ" (新總部, with a moving plan) jump there. Cities far from both our HQ and the plan (more than 60 tiles away, e.g. a member who moved elsewhere) are not drawn; they are listed above the map as "Far from our HQ" with their X:Y. Editors: tap a city to change name / X / Y, or "📋 Paste positions" (one per line: name X Y; the box opens with the current list — fix it and press "Replace all"), then 💾 Save. Names are kept exactly as typed; blue = found on the roster, orange = not found. With a moving plan loaded, the plan is drawn on the same map as a blueprint: dashed squares = planned city spots (name shown; green once that member is there), numbered banners = road (R1…), early hive banners (P1…), stage 1 (S1-…, BT2 side) and stage 2 (S2-…, BT1 side) — solid with a green rim once our banner stands there; dashed HQ + its 15×15 and dashed Bear Traps = their new place; other alliances' territory shaded; ✖ = another alliance's banner we must take down (green ✓ once ticked). A legend sits under the map.
[move] - 🚚 Move → putting members on the plan by tapping (成員分配): with a moving plan loaded, officers with the move edit right tap a dashed planned spot on the 👥 map; a box under the map shows the spot X:Y, a name field and the list of members not placed yet — tap a name (or type it, ✓ Put here) and the next empty spot nearby is picked so a row fills quickly; "Empty this spot" takes the name out; a member put on a new spot leaves their old spot empty. Then 💾 Save. (Members can also be named in Mapper before exporting, or one by one with "➕ Add / change a spot".) There is NO automatic placing of members yet (not decided whether it will be manual or automatic): the box under the map says so — "🤖 Placing members automatically isn't set up yet … Want it automatic? Ask Sparrow." If an officer asks for automatic placing, tell them to ask Sparrow.
[move] - 🚚 Move → "📐 Auto plan from a Mapper layout" (從 Mapper 自動規劃, at the bottom of the 🚚 Move page): load a Kingshot Mapper CSV of a new hive (Export → CSV; its city, beartrap, hq, banner, resource and obs rows) or paste it. The site works out TWO roads of banners to the new HQ's 15×15 and lists both in the table: one starting from our Plains HQ today (its block of banners) and the shortest one from any of our banners; the road from our HQ is used by default, the other is drawn dashed, and "🔀 Use the other road" swaps them. Works anywhere on the kingdom map (searches up to about 300 tiles around the new HQ; mountains, lakes and no-build zones are known for the whole map, other alliances' banners only where the site has them, resources only from the CSV) (fewest banners; each joins the one before, centres ≤ 7 tiles apart; never on mountains, lakes, no-build zones, resources, buildings or inside another alliance's land), sorts the drawn banners into stage 1 (BT2 side, built right after the HQ moves) and stage 2 (BT1 side) in build order, and checks: cities / Bear Traps / HQ / banners on mountains, lakes, no-build zones, resources or inside another alliance's land (their banners in the way are listed to take down), overlaps, banners not joined to our land, HQ on Fertile Land (not allowed) or its 15×15 reaching Fertile Land (risky). Table: HQ, nearest Fortress and distance, cities on Fertile Land, cities inside our land after the HQ / stage 1 / stage 2, cities per Bear Trap, average distance to the trap, farthest city from the HQ, road banners in order, stage banners, banner budget (now + new vs 285, how many old ones to take down), other alliances' banners in the way, problems, move order. Drawn like the game (turned 45°) with a legend. Editing: pick a pen — ⚫ Road, 🟡 Stage 1, 🟠 Stage 2, 🧽 Remove, 🏯 Move HQ — and tap the map (a new banner, or change / remove the one tapped); ↩️ Undo, 🔄 Auto road again, 🔄 Re-sort stages, − / + zoom. ⬇️ Picture (PNG) = map + legend + table for Discord, ⬇️ Blueprint CSV, ➡️ Use as moving plan = loads it into 🧭 Move steps (then 💾 Save there; needs the move edit right). "Plan:" list (計畫) like the Ranking tab's shared plans: "🔒 Only on this device" is the officer's own draft (kept in that browser); "➕ Share as a plan" saves it under a name (encrypted, data/hive-plans-x7k2p9.json) so every officer with the 🚚 Move tab can pick it from the list and see the same map and table; changes to a shared plan save by themselves and others see them within about 15 seconds; ✏️ Rename / 🗑️ Delete; officers without the move edit right see shared plans view only (look and download). Several plans can be shared side by side (e.g. A and B) to compare.
[move] - 🚚 Move → "📘 Hive rules & tips" (蜂巢規則與技巧) at the top: HQ only in the Plains or Badlands ring, never on Fertile Land (沃土; in #2189 X and Y 450–749) or the Ruins ring — put it just outside the fertile edge; every banner must connect to the HQ; no banners in Outpost no-build zones; limits 285 banners / 100 member cities / 2 Bear Traps; a city counts only with all 4 tiles inside our territory; about 50 cities per Bear Trap; check the area for other cities, alliance buildings, mountains, lakes; move order HQ → banners outward from BT2 → members → Bear Traps last (members never move traps).
[move] - 🚚 Move → "📍 Positions from the roster" (從名單更新座標, the card at the top of the Move page): every member's castle X:Y comes with the roster (MightPulse, updated every day at 20:13 UTC — the same data as 🕵️ Watch). MightPulse only knows new positions after someone presses "Update Map" on its map (https://mightpulse.com/map?kid=2189). After members move (a "members move" step that is the current ▶ step reminds you): open the MightPulse map, press Update Map, then "🔄 Update roster now" (立即更新名單) — about 5 minutes, the page updates by itself. It is ONE shared request: the same button sits on 🕵️ Watch, both start the same roster job and both pages get the new roster (not again within 10 minutes of the last update). The card lists the changes against 👥 Member positions: name, old X:Y → new X:Y, ✅ = now at their planned new spot. Members are matched by player ID (saved on each 👥 entry after the first ✅), else by the exact name — never by a look-alike name, so two members with almost the same name (e.g. two "GhOsT") stay two people. Names on 👥 Member positions that are no longer on the roster (left the alliance) are listed as "Not in the alliance any more" and removed by the same ✅ button (or "✅ Remove them" when nothing else changed). ⚠️ lists members with no position on MightPulse (left as they are). "✅ Use these positions" (套用這些座標, needs 🗺️ Map edit right) writes them into 👥 Member positions and saves, so the moving table and 🧭 Move steps tick themselves. Banners ticked by hand in 🧭 Move steps also count as standing banners on 🗺️ Map (and banners marked ✅ Built on 🗺️ Map tick the steps by themselves).
[attack] - ⚔️ Attack → "📦 MightPulse history" (MightPulse 歷史資料, the card at the bottom of the ⚔️ Attack tab; it used to be on 🔭 Scout; the 🔮 prediction reads the newest day by itself, nothing to import): one encrypted snapshot a day at 20:45 UTC (data/mp-history/, script scripts/mp-history.js): kingdom totals of #2189 and every Scout kingdom marked "update daily", all 18 kingdom boards (top 100 each — the API's maximum), every NXS member (from the roster) plus a few players we have battle stats for, and for other Scout kingdoms the top players of the combat boards (base, ranks, heroes with gear). Pick From / To dates → "⬇️ Download JSON" decrypts those days in the browser into one file for the battle analysis. Don't post the file anywhere public. Free MightPulse can't give event scores (paid "Mighty" plan) or board values for players outside a board's top 100.
[watch] - 🕵️ Watch → "🔄 Update roster now" (立即更新名單, under the update time): fetches every member from MightPulse again right away (power, Mystic Trial, castle X:Y…) — the same job as the daily 20:13 UTC update; about 5 minutes, then the table updates by itself. Shared with the same button on 🚚 Move (one request, both pages get the new roster).
[move] - 🚚 Move (搬家, its own tab): only admins see it unless the 👥 table gives it. Load the moving plan: Kingshot Mapper (ksmapper.pages.dev) → Export → CSV file, cities labelled with member names (a .json from another planner also works; with several alliances in one file, ours is found by colour), "🧭 Move steps" (搬家步驟) and the moving table: each member's current X:Y → new spot (tap to copy), ✓ Moved, progress bar, "Only not moved yet". A member whose current position in 👥 Member positions already equals the new spot gets ✅ automatically. "➕ Add / change a spot" gives someone a spot or moves them; their old spot becomes free. "🧭 Move steps" lists the plan in order from the banner labels in the CSV: road R1… → early hive banners P1… / take down KILL banners → move the HQ → stage 1 S1-… → BT2-side members move → stage 2 S2-… → BT1-side members move → Bear Traps last; ▶ marks the current step. ✅ comes by itself when the map already shows it (our banner standing at that X Y on 🗺️ Map, the HQ / a Bear Trap / a member already at the new X Y); officers with the move edit right tap an item to tick it by hand, then 💾 Save. Under the steps: banners standing + blueprint banners still to build against the 285 limit, with a warning to take down old banners first when it is over. Blueprint CSV labels on banners: R1… road, P1… early hive banners, S1-1… stage 1, S2-1… stage 2, "KILL TTT" = another alliance's banner to take down; Bear Traps labelled "Bear Trap 1" / "Bear Trap 2".
[board] - 💬 Board (討論板): a message is posted at once with only the original. "🌐 Translate for everyone" (翻譯給所有人, a tick box next to Post / Reply, off by default, remembered on that device) translates it into 中文 / English / Português / العربية / 한국어 in the background — the post appears at once and switches to each reader's language by itself when done. Without it, readers whose language differs see "🌐 Translate to …" (翻成…) under the post: it translates that one post into their language and keeps it, so the next reader of that language sees it at once. Editing a post that had translations translates it again in the background. Messages from before this change keep all their translations; @ mentions, 📋 Assign to (makes a task with ✅ Done), 🖼️ pictures, 📌 Set as decision. "Tasks for you" lists what you were assigned or @'d in.
[ranking] - 📊 Ranking → ② Participants & ranking → ✅ Registration (報名確認, from Nia's SS & TAC Registration Tracker): next to each ticked name tap ⏳ to cycle ✅ confirmed → ❌ can't come → ⏳ no reply; 🟡 = safe player, registered without waiting for a reply (Nia's yellow; one list remembered for every plan). The line above the list counts ✅ confirmed + 🟡 safe with no reply = can be registered; "📋 Copy list" can copy only those, or only the not-replied names (to ping them). Replies are saved with the shared plan.
[attend] - 📋 Attendance → ① Registration (lists made from a plan since 2026-10-30): shows each person's reply and 🟡 from the Ranking plan (set there; 🔄 Update from the plan brings changes in), with the same counts and copy buttons. Only registered people (✅, or 🟡 not ❌) appear in ② and can count as a miss.
[attend] - 📋 Attendance (出席): sheets made from a shared Ranking plan; ① Confirmed (tap = sub), add people by pasting names, 📷 voter screenshots or by hand; ② after the battle tap ✓ showed up → X no-show → 🛌 excused; repeat misses turn orange (2nd) and red (3rd). Save / Copy for Discord.
[perms] - 👥 Officers (幹部, admins only): one row per officer; per tab ✏️ Edit / 👁️ View / — Hidden (saves by itself); 🔔 which events they get officer to-do reminders for; 👁️ Preview as; + Add officer (name + 18-digit Discord ID).

LITTLE SPARROW (🐦 on the officer page)
- When an officer opens the officer page (once per session, after the greeting) and whenever they tap the sparrow, it asks "Want a quick tour of the officer page?": 👀 Yes = the page's own controls top to bottom (← main site, language, light/dark, 🔗 copy link, ↻ refresh, your Discord name (tap to change how it shows; Log out), the tabs you have, the 🐦 button next to every feature, Ask AI), then "🎓 How do I use…" leads on to the tab tours; "No thanks" = the list of tab tours in the chat.

AI ASSISTANT
- The chat knows an officer by their Discord login on this browser (log in on the officer page once). It follows the 👥 table: it only explains and answers from the tabs this officer may open. Officers have no daily question limit.

@scout
🔭 SCOUT (officer-x7k2p9.html#scout) — the top players of other kingdoms (for KvK)
- Type a kingdom number and press "Fetch now": a GitHub job reads that kingdom's top 20 players by Migrant Score AND top 20 by power from MightPulse (union, anyone on both lists once; usually 20–35 players): power, Town Center, Mystic Trial score and rank, kills, VIP, alliance, Migrant Score; plus the kingdom's strongest alliances. Migrant Score ≈ Squad Power × 317, so it is the better strength measure; power also hints at activity. Under the ID a grey note "power top 20 only" / "Migrant top 20 only" shows a player who is on just one of the two lists. The table is sorted by Migrant Score by default. It takes about 2–3 minutes; the page refreshes by itself.
- Each scouted kingdom is a chip at the top: ⟳ fetches it again, ✕ removes it, "update daily" refreshes it every day at 20:25 UTC together with the roster (tick it for the KvK opponent).
- Our own kingdom #2189 is scouted too, for comparison. Data is the SCOUT section of the OFFICER DATA (answer "who is the strongest in kingdom X" from there).
- Not in this data: last login (unreliable) and anything MightPulse does not publish.

@attack
⚔️ ATTACK PLANNER (officer-x7k2p9.html#attack, 攻擊規劃) — how many rallies in a row a target garrison needs, and who goes last
- Its own tab: hidden from everyone except admins until the 👥 table gives it. A rough planning tool (spec: the analysis chat's attack-planner-spec), not a simulator. Our side always uses Chenko joiners and 50:20:30 (a simple troop-ratio simulation found 50:20:30 robust; keep infantry ≥ ~40%).
- Card "⚔️ Plan the attack" (規劃進攻): target garrison leader (a known-stats row, or a player 🔮 predicted from the boards), garrison troops, garrison tier, "in their own territory (+10%)"; our rallies in order (leader, troops, tier; ➕ Rally); their debuff on us / our debuff on them (attack & defense −%, multiplies); p (default 1.75, 1.5–2); reinforcements between rallies. Settings are kept on this device.
- Math: quality Q = Σ w_k (1+atk)(1+leth)(1+def)(1+hp) over inf/cav/arc with w = 0.5/0.2/0.3, × tier² (T9 1.0, T10 1.18, TG1 1.228, TG2 1.289, TG3 1.353), × 1.06 for a garrison in its own territory, × (1−debuff)². r = Q_us / Q_them ("one of their troops ≈ 1/r of ours"). Per rally: if r·R^p > G^p we take it and (R^p − G^p/r)^(1/p) of ours stay as the new garrison (with that leader's stats); else their garrison drops to (G^p − r·R^p)^(1/p) (+ reinforcements). Rallies needed ≈ G^p / (r·R^p).
- Result: table per rally (r, win / what is left), "about N rallies needed", tip "expendable rallies first, strongest leader last", and an uncertainty table for garrison 1.0 / 1.3 / 1.6M × p 1.5 / 1.75 / 2. Caveats shown: under-rates attackers (B24: model ≈ 300k left, real 587k); hero skill kills (27–46%) and troop counters not modeled; a garrison may use its strongest member's stats.
- Card "🔮 Prediction from MightPulse boards" (用 MightPulse 排行榜預測): S = Governor gear + Hero equip + Master power (millions; only players in the kingdom top 100 of all three; newest daily MightPulse history). Fit ln Q = a + b·ln S on the known stats that have S (needs ≥ 3; shows n, R², typical error). Search any player on the boards → their three scores, S, predicted quality and the nearest known player.
- Card "📚 Known stats" (已知屬性): rows of battle-report stats (步/騎/弓 × attack, defense, lethality, health %) with source, date, role; ✓ fit = used for the prediction; editors ➕ Add / Edit / Delete, 📥 Import (JSON, same name + source replaces), then 💾 Save for all officers (encrypted, data/statsets-x7k2p9.json).

@hunt
🎯 BLACKLIST (officer-x7k2p9.html#hunt, 黑名單) — All Out: where listed players' castles are and whether their shield is up
- Its own tab: hidden from everyone except admins until the 👥 table gives it. Officers with edit add players by their player ID (the number on the in-game profile) plus an optional note, remove them with ✕, then 💾 Save list (encrypted, data/blacklist-x7k2p9.json).
- Every listed player is looked up on MightPulse only when an officer presses ↻ Reload (the Cloudflare Worker; needs the MIGHTPULSE_API_KEY Worker secret) — there is no timed polling, because MightPulse's positions and shields only change after someone presses "Update Map" on its map. Right after the list is saved a GitHub job looks up only the players that have no data yet (about 2 minutes) — adding someone does not re-fetch the whole list. ↻ Reload asks for a fresh look-up at once (at most every 2 minutes). To save MightPulse calls (5,000 a day, shared with the other tabs) the blacklist uses at most 2,000 a day; past that it waits for the next UTC day. MightPulse keeps its own copy of each player and refreshes it only when it is older than 60 minutes, so positions can be up to about an hour old — always read the data time.
- The table shows the in-game name (note and ID under it), alliance, kingdom, castle X:Y with a copy button, shield ("🛡️ until …" or "— none") and the time of the data. No online / last login: MightPulse says those fields are stale and should not be used. Positions and shields only change on MightPulse after someone presses "Update Map" on its map. Every time is written "MM-DD HH:MM UTC (MM-DD HH:MM local)" — never "x minutes ago". "Data fetched …" at the top is when the job last ran; the page reloads the data by itself every minute (↻ Reload does it at once).
- Under each name: the ID and a "MightPulse ↗" link that opens that player's MightPulse page (their site can be newer than the API copy the table shows).
- ✏️ next to X:Y (officers with edit) = type a newer position by hand when MightPulse is slow (seen in game or on the MightPulse page). It is saved with the list for every officer, shows "✏️ set by … · time", and is used on the table, the mini map and the kingdom map until MightPulse has data newer than it; then the API position comes back by itself. Other officers' pages pick it up within about a minute (the tab re-reads the list every minute).
- How officers should use it (🧭 shown at the top of the table): if the player hasn't moved, go by the position on the table / map. If they moved (not there any more), open their MightPulse ↗ page for the newest spot and ✏️ update it on the site, so everyone finds the rough area faster.
- 🛡️✏️ next to the shield (officers with edit) = fix the shield by hand when MightPulse is slow: type the time left on it (hours + minutes, number keypad) or "🚫 No shield". Saved with the list for every officer, shown as "✏️ who · time", used by the table, mini map and ⏰ timers until MightPulse has data newer than it. A ⚠️ next to the data time (and a note above the table) = MightPulse has not refreshed that player for over 2 hours — open their MightPulse ↗ page or check in game and fix position / shield by hand.
- IMPORTANT (MightPulse's own answer): positions, shields and burn on MightPulse only change when someone presses "Update Map" on the MightPulse map (https://mightpulse.com/map?kid=2189 opens kingdom #2189); the API and the player page's refresh only re-read that copy. So before hunting: open the map with the "🗺️ MightPulse map ↗" button at the top of the tab, press Update Map, wait a moment, then ↻ Reload. Nothing polls by itself, so press ↻ Reload after Update Map.
- ⭐ next to the number = special mark (特別標記), shared by all officers and saved with the list: the whole row lights up gold and moves to the top. Officers with edit tap ⭐ / ☆ to mark or unmark, then 💾 Save list.
- The same player ID is only kept once: entered twice, or added by two officers at the same time, it becomes one row (their notes joined with " / "). Saving merges with what another officer saved meanwhile, so nobody's additions are lost; rows removed with ✕ stay removed.
- ⏰ on a row = follow that player: their shield end becomes one of your ⏰ timers (shield timer, with a push notification like the other timers), on this phone / browser only; it is updated with the newest data while the tab is open. No shield right now = the timer appears once they put one up.
- Under the table a small kingdom map (turned like the game) shows everyone on the list with their name (🔴 no shield, 🔵 shield up, ⭐ marked players with a gold ring, drawn on top) and our HQ; "🗺️ Show on the kingdom map" opens the 🗺️ Map tab with them marked (⭐ marked players in yellow).
- The live positions are not part of the AI's officer data — open the tab for them.

KVK CHECKLIST (main site, for everyone)
- From the day before KvK until the last day, a 📋 button at the bottom right of the main site shows that day's KvK checklist (KvK Prep Day 1–5, then Battle Day). Members tick items; ticks are saved on their own device.
`;

async function getText(file) {
  const r = await fetch(SITE_BASE + file, { cf: { cacheTtl: 300 } });
  if (!r.ok) throw new Error(file + " " + r.status);
  return r.text();
}

async function getPublic(lang) {
  const c = publicCache[lang];
  if (c && Date.now() - c.at < CACHE_MS) return c.text;
  let text;
  try { text = await getText(`data/ai-context-${lang}.txt`); }
  catch (e) { text = await getText("data/ai-context.txt"); }   // per-language file not built yet → English
  publicCache[lang] = { text, at: Date.now() };
  return text;
}

/* Which language is the question in? Scripts are easy to tell apart; Latin-script
   questions use the site's language unless that is a non-Latin one (then English). */
function detectLang(q, siteLang) {
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(q)) return "ko";
  if (/[\u0e00-\u0e7f]/.test(q)) return "th";
  if (/[\u0600-\u06ff]/.test(q)) return "ar";
  if (/[\u0400-\u04ff]/.test(q)) return "ru";
  if (/[\u3400-\u9fff]/.test(q)) return "zh";
  if (/[a-z]/i.test(q)) return ["zh", "ko", "th", "ar", "ru"].includes(siteLang) ? "en" : siteLang;
  return siteLang;
}

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/* Views tab: site statistics from GoatCounter, officers only.
   GoatCounter allows only 4 API requests per second: the 5 pieces are fetched one after another (a short pause between),
   a "slow down" answer is retried after the wait it asks for, results are kept 15 minutes per range,
   and if GoatCounter can't be reached the last good numbers are shown (marked stale) instead of an error. */
const statsCache = {};
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function stats(body, env) {
  if (!(await isOfficer(body, env))) return json({ error: "no_permission" }, 403);
  if (!env.GOATCOUNTER_TOKEN) return json({ error: "no_token" }, 500);
  const days = [7, 30, 90].includes(+body.days) ? +body.days : 7;
  const c = statsCache[days];
  if (c && Date.now() - c.at < 15 * 60 * 1000) return json(c.data);
  const end = new Date(), start = new Date(end.getTime() - days * 86400000);
  const q = `start=${start.toISOString()}&end=${end.toISOString()}`;
  const get = async (p, tries = 0) => {
    let r;
    try { r = await fetch(`${GC_SITE}/api/v0/stats/${p}${p.includes("?") ? "&" : "?"}${q}`, { headers: { Authorization: `Bearer ${env.GOATCOUNTER_TOKEN.trim()}`, "Content-Type": "application/json" } }); }
    catch (e) { if (tries < 2) { await pause(800 * (tries + 1)); return get(p, tries + 1); } throw e; }
    if ((r.status === 429 || r.status >= 500) && tries < 3) {   // rate limited / GoatCounter hiccup → wait and try again
      const wait = Math.min(5, Math.max(1, +r.headers.get("X-Rate-Limit-Reset") || +r.headers.get("Retry-After") || 1));
      await pause(wait * 1000 + 100); return get(p, tries + 1);
    }
    if (!r.ok) throw new Error(`goatcounter ${p.split("?")[0]} ${r.status}`);
    return r.json();
  };
  try {
    const soft = (p) => get(p).catch(() => null);       // the breakdown pages may be missing on some sites → leave them empty
    const total = await get("total"); await pause(300);
    const hits = await get("hits?limit=100&group=day"); await pause(300);
    const locations = await soft("locations?limit=15"); await pause(300);
    const toprefs = await soft("toprefs?limit=15"); await pause(300);
    const systems = await soft("systems?limit=10");
    const data = { days, at: Date.now(), total, hits: hits.hits, locations: locations?.stats || [], toprefs: toprefs?.stats || [], systems: systems?.stats || [] };
    statsCache[days] = { data, at: Date.now() };
    return json(data);
  } catch (e) {
    if (c) return json({ ...c.data, stale: true });   // keep showing the last good numbers
    return json({ error: "goatcounter", detail: String(e.message || e) }, 502);
  }
}

/* Officer = knows the officer password. The browser opens data/data-key.json with it and sends
   sha256("nxs-officer:" + data key); here we compare with the DATA_KEY secret. No GitHub call needed. */
let proofCache = null;
async function isOfficer(body, env) {
  const proof = body && body.officerProof;
  if (typeof proof !== "string" || proof.length !== 64 || !env.DATA_KEY) return false;
  if (!proofCache) proofCache = await sha("nxs-officer:" + env.DATA_KEY.trim());
  let diff = 0;
  for (let i = 0; i < 64; i++) diff |= proof.charCodeAt(i) ^ proofCache.charCodeAt(i);
  return diff === 0;
}

/* 🔒 Officer AI = logged in with Discord AND on the 👥 table. Returns which tabs they may open (admins: all),
   so the AI only gets the handbook parts and data of those tabs. The old officer password / data-key proof no longer counts. */
const AI_TAB_NAMES = { events: "📅 Events", board: "💬 Board", map: "🗺️ Map", move: "🚚 Move", hunt: "🎯 Blacklist", attack: "⚔️ Attack", ranking: "📊 Ranking", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watch", scout: "🔭 Scout", views: "📈 Views", perms: "👥 Officers" };
const AI_TAB_LINKS = {
  events: "[Events](officer-x7k2p9.html#events) (week calendar, officer to-dos, in-game guides to copy, add/edit events)",
  board: "[Board](officer-x7k2p9.html#board)", map: "[Map](officer-x7k2p9.html#map) (kingdom map, Outpost plan)",
  move: "[Move](officer-x7k2p9.html#move) (alliance move, member positions)", hunt: "[Blacklist](officer-x7k2p9.html#hunt) (All Out blacklist: location and shield of listed players)", ranking: "[Ranking](officer-x7k2p9.html#ranking) (member ranking, power, TC, Mystic Trial, battle tables)",
  attend: "[Attendance](officer-x7k2p9.html#attend)", post: "[Post](officer-x7k2p9.html#post) (post / edit announcements)",
  watch: "[Watch](officer-x7k2p9.html#watch) (name changes, power history, who left/joined, notes)", scout: "[Scout](officer-x7k2p9.html#scout) (top players of other kingdoms)",
  attack: "[Attack](officer-x7k2p9.html#attack) (how many rallies a target needs, predicted from MightPulse boards)",
  views: "[Views](officer-x7k2p9.html#views)", perms: "[Officers](officer-x7k2p9.html#perms)",
};
async function officerAccess(req, env, body) {
  if (!body || typeof body.token !== "string" || !body.token) return null;
  let c; try { c = await sessionCheck(req, env, body.token); } catch (e) { return null; }
  if (c.error || c.s.pw) return null;
  const stub = env.TIMERS ? env.TIMERS.get(env.TIMERS.idFromName("all")) : null;
  const perms = withSeed(stub ? await stub.kvGet("perms") : null), role = roleOf(perms, c.s.u.id);
  if (!role) return null;
  const u = (perms.users && perms.users[c.s.u.id]) || {};
  const tabs = new Set(role === "admin" ? Object.keys(AI_TAB_NAMES) : Object.entries(u.perms || {}).filter(([, v]) => v === "view" || v === "edit").map(([k]) => k).filter((k) => k !== "perms"));
  return { role, tabs, token: await seal(env, c.s) };
}
/* handbook parts for these tabs only (see the @tab / [tab] marks in OFFICER_HELP) */
function helpFor(tabs) {
  const out = []; let cur = null, m;
  for (const line of OFFICER_HELP.split("\n")) {
    if (!line.trim()) { cur = null; out.push(line); continue; }
    if ((m = line.match(/^@(\w+)$/))) { cur = m[1]; continue; }
    let tab = cur, text = line;
    if ((m = line.match(/^\[(\w+)\] /))) { tab = m[1]; text = line.slice(m[0].length); }
    if (!tab || tabs.has(tab)) out.push(text);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}
/* officer data parts (### headings from scripts/build-officer-context.js) → the tab that shows them; unknown parts: admins only */
const DATA_TABS = [["ROSTER", ["ranking", "watch"]], ["WATCH", ["watch"]], ["OTHER ALLIANCES", ["watch"]], ["SCOUT", ["scout"]], ["OUTPOST PLAN", ["map"]]];
function officerDataFor(text, tabs) {
  const parts = String(text || "").split(/\n(?=### )/);
  const keep = parts.filter((p) => {
    if (!p.startsWith("### ")) return true;   // the "===== OFFICER DATA" title
    const hit = DATA_TABS.find(([h]) => p.startsWith("### " + h));
    return hit ? hit[1].some((t) => tabs.has(t)) : tabs.has("perms");
  });
  return keep.length > 1 ? keep.join("\n") : "";
}

/* 🎯 All Out blacklist (officer page #hunt). The list is data/blacklist-x7k2p9.json (encrypted, saved by officers). On ↻ Reload (no timed polling)
   while All Out runs (the Events tab's schedule, ±1 hour) the Worker asks MightPulse (secret MIGHTPULSE_API_KEY) for each player's
   castle X:Y and shield end and keeps the result in the Durable Object ("bl-live"). Officers with the 🎯 tab read it through
   POST { blacklist: 1, token[, refresh] }; refresh = look up now (at most every 2 minutes; daily cap BL_DAY). MightPulse's own copy can be up to 60 minutes old. */
const BL_RAW = "https://raw.githubusercontent.com/NXSguides/Kingshot_guideline_NXS/main/data/blacklist-x7k2p9.json";
async function allOutWindow() {
  let s = { anchor: "2026-09-25", periodDays: 28, activeDays: 2 };
  try { const e = JSON.parse(await getText("data/events-x7k2p9.json")); if (e.sched && e.sched["all-out"]) s = e.sched["all-out"]; } catch (e) {}
  const a = Date.parse(s.anchor + "T00:00:00Z"), P = s.periodDays * 864e5, now = Date.now(), start = a + Math.floor((now - a) / P) * P, end = start + s.activeDays * 864e5;
  return { start, end, on: now >= start - 36e5 && now < end + 36e5 };
}
const BL_DAY = 2000;
async function blacklistTick(env, force) {
  if (!env.MIGHTPULSE_API_KEY || !env.TIMERS) return null;
  const w = await allOutWindow(); if (!force && !w.on) return null;
  const r = await fetch(BL_RAW + "?t=" + Date.now(), { cf: { cacheTtl: 0 } }); if (!r.ok) return null;
  const L = await openData(await r.json(), env), seen = new Set();
  const list = ((L && L.list) || []).map((it) => ({ id: String(it.id || "").replace(/\D/g, ""), note: it.note || "" })).filter((it) => it.id && !seen.has(it.id) && seen.add(it.id)).slice(0, 40);
  /* MightPulse quota (5,000 calls a day, shared with the roster / watch / scout scripts): the blacklist may use at most BL_DAY a day */
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all")), day = new Date().toISOString().slice(0, 10);
  let use = await stub.kvGet("bl-use"); if (!use || use.day !== day) use = { day, n: 0 };
  if (use.n + list.length > BL_DAY) return null;
  use.n += list.length; await stub.kvSet("bl-use", use);
  const rows = await Promise.all(list.map(async (it) => {
    try { const res = await fetch(`https://api.mightpulse.com/v1/players/${it.id}?include=base`, { headers: { Authorization: `Bearer ${env.MIGHTPULSE_API_KEY}` } });
      const b = await res.json().catch(() => null), p = (b && b.player) || {};
      return { id: it.id, uid: (b && b.uid) || null, note: it.note, ok: res.status === 200, status: res.status, name: p.nick_name ?? null, kid: p.kid ?? null, alliance: (p.alliance && p.alliance.abbr) ?? null, power: p.power ?? null,
        x: p.x ?? null, y: p.y ?? null, shield: p.shield_endtime ?? null, burn: p.burn_endtime ?? null, asOf: b && b.cached_at ? b.cached_at : null, age: b && b.age_seconds != null ? b.age_seconds : null };
    } catch (e) { return { id: it.id, note: it.note, ok: false, status: 0 }; } }));
  const live = { fetched: new Date().toISOString(), window: { start: new Date(w.start).toISOString(), end: new Date(w.end).toISOString() }, rows, src: "worker", used: use.n, budget: BL_DAY };
  await stub.kvSet("bl-live", live);
  return live;
}
async function blacklistRoute(req, env, body) {
  const acc = await officerAccess(req, env, body);
  if (!acc || !acc.tabs.has("hunt")) return json({ error: "forbidden" }, 403);
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all"));
  let live = await stub.kvGet("bl-live");
  if (body.refresh && env.MIGHTPULSE_API_KEY && (!live || Date.now() - Date.parse(live.fetched) > 120000)) live = (await blacklistTick(env, true)) || live;
  return json({ ok: true, live: live || null, setup: !!env.MIGHTPULSE_API_KEY, token: acc.token });
}

/* officer files may be encrypted: { enc: 1, iv, data } with AES-GCM and DATA_KEY */
const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
async function openData(obj, env) {
  if (!obj || !obj.enc) return obj;
  if (!env.DATA_KEY) throw new Error("DATA_KEY secret missing");
  const key = await crypto.subtle.importKey("raw", b64(env.DATA_KEY.trim()), "AES-GCM", false, ["decrypt"]);
  let pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(obj.iv) }, key, b64(obj.data));
  if (obj.gz) pt = await new Response(new Blob([pt]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();   // gz: 1 = gzipped before encryption
  return JSON.parse(new TextDecoder().decode(pt));
}

/* The officer summary is prebuilt by GitHub Actions (scripts/build-officer-context.js) and encrypted;
   here it only needs decrypting — the free plan allows ~10 ms of work per question. */
async function getOfficer(env) {
  if (officerCache.text && Date.now() - officerCache.at < CACHE_MS) return officerCache.text;
  const data = await openData(JSON.parse(await getText("data/ai-officer.json")), env);
  officerCache = { text: data.text, at: Date.now() };
  return officerCache.text;
}

/* Events tab data (data/events-x7k2p9.json): schedules, notes, to-dos and in-game guides, plus the next dates */
let eventsCache = { text: "", at: 0 };
async function getEvents(env) {
  if (eventsCache.text && Date.now() - eventsCache.at < CACHE_MS) return eventsCache.text;
  let file;
  try { file = JSON.parse(await getText("data/events-x7k2p9.json")); }
  catch (e) { return "### EVENTS DATA\n(Not saved yet — the Events tab still shows its built-in defaults. Press 💾 Save there once.)"; }
  const d = await openData(file.data, env);
  const DAY = 86400000, today = Math.floor(Date.now() / DAY) * DAY, iso = (t) => new Date(t).toISOString().slice(0, 10);
  const lines = [`### EVENTS DATA (from the Events tab; today is ${iso(today)} UTC)`];
  for (const e of (d && d.events) || []) {
    let sched = "no fixed schedule";
    if (e.start && e.every > 0 && e.days > 0) {
      const a = Date.parse(e.start + "T00:00:00Z");
      let n = Math.max(0, Math.floor((today - a) / DAY / e.every) - 1), next = [];
      for (; next.length < 3; n++) { const st = a + n * e.every * DAY; if (st + e.days * DAY > today) next.push(e.days > 1 ? `${iso(st)}–${iso(st + (e.days - 1) * DAY)}` : iso(st)); }
      sched = `from ${e.start}, every ${e.every} days, lasts ${e.days} day(s); current/next: ${next.join(", ")}`;
    }
    lines.push(`\n## ${e.emoji || ""} ${e.en || e.zh} / ${e.zh || e.en} — ${sched}${e.note ? " — note: " + e.note : ""}${e.guide ? " — site guide #" + e.guide : ""}`);
    for (const t of e.todo || []) lines.push(`- To-do (${t.due >= 0 ? "day " + t.due + " after start" : -t.due + " day(s) before start"}): ${t.en || t.zh}${t.zh && t.en ? " / " + t.zh : ""}`);
    (e.ingame || []).forEach((g, i) => lines.push(`- In-game message ${i + 1}${g.title ? " (" + g.title + ")" : ""}:\n"""\n${g.text}\n"""`));
  }
  eventsCache = { text: lines.join("\n"), at: Date.now() };
  return eventsCache.text;
}

/* ---------- daily limits: KV binding LIMITS if present, otherwise memory (rough) ---------- */
const memCounts = new Map();
async function getCount(env, key) {
  if (env.LIMITS) { try { return Number(await env.LIMITS.get(key)) || 0; } catch (e) {} }
  return memCounts.get(key) || 0;
}
async function putCount(env, key, n) {
  memCounts.set(key, n);
  if (env.LIMITS) { try { await env.LIMITS.put(key, String(n), { expirationTtl: 2 * 86400 }); } catch (e) {} }
}
async function dailyCheck(env, deviceId, ip) {
  const day = new Date().toISOString().slice(0, 10);
  const checks = [[`i:${day}:${ip}`, IP_PER_DAY]];
  if (typeof deviceId === "string" && /^[\w-]{8,64}$/.test(deviceId)) checks.push([`d:${day}:${deviceId}`, DEVICE_PER_DAY]);
  const counts = await Promise.all(checks.map(([k]) => getCount(env, k)));
  const ok = checks.every(([, cap], i) => counts[i] < cap);
  return {
    ok,
    // called after a successful answer: +1 on each counter, returns how many questions are left today
    count: async () => {
      await Promise.all(checks.map(([k], i) => putCount(env, k, counts[i] + 1)));
      return Math.min(...checks.map(([, cap], i) => cap - counts[i] - 1));
    },
  };
}

/* ================= Timer notifications (Web Push) =================
   The site keeps each person's timers on their phone and sends the list here.
   One Durable Object ("PushTimers") stores them and wakes up (alarm) when the next one is due,
   then sends a push notification to that phone. No database to set up: it's declared in wrangler.jsonc.
   Secret needed (Settings → Variables and Secrets): VAPID_PRIVATE — the private half of the push key. */
const VAPID_PUBLIC = "BKb0YJxObHPh9_7b4ZriSZQeRk6TaojqNUvPBJe7J9aC_pVuXtmQRRWD11gDs6OJYj8Fg7jigPXDBOxZ5NQbP0o";
const VAPID_SUB = "https://nxsguides.github.io/Kingshot_guideline_NXS/";
const MAX_TIMERS = 200;

const b64u = {
  enc: (buf) => { let s = ""; new Uint8Array(buf).forEach((x) => (s += String.fromCharCode(x))); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); },
  dec: (str) => Uint8Array.from(atob(str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4)), (c) => c.charCodeAt(0)),
};
const cat = (...parts) => { const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0)); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out; };
const utf8 = (s) => new TextEncoder().encode(s);
async function hmac(key, data) {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, data));
}

/* RFC 8292: the "who is sending" signature push services ask for */
async function vapidHeader(endpoint, env) {
  const pub = b64u.dec(VAPID_PUBLIC);
  const key = await crypto.subtle.importKey("jwk",
    { kty: "EC", crv: "P-256", x: b64u.enc(pub.slice(1, 33)), y: b64u.enc(pub.slice(33, 65)), d: String(env.VAPID_PRIVATE || "").trim(), ext: true },
    { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const head = b64u.enc(utf8(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const body = b64u.enc(utf8(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: VAPID_SUB })));
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, utf8(head + "." + body));
  return `vapid t=${head}.${body}.${b64u.enc(sig)}, k=${VAPID_PUBLIC}`;
}

/* RFC 8291: encrypt the message so only that phone can read it (aes128gcm) */
async function encryptPush(sub, text) {
  const uaPub = b64u.dec(sub.keys.p256dh), auth = b64u.dec(sub.keys.auth);
  const as = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPub = new Uint8Array(await crypto.subtle.exportKey("raw", as.publicKey));
  const uaKey = await crypto.subtle.importKey("raw", uaPub, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const ecdh = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, as.privateKey, 256));
  const prkKey = await hmac(auth, ecdh);
  const ikm = (await hmac(prkKey, cat(utf8("WebPush: info\0"), uaPub, asPub, new Uint8Array([1])))).slice(0, 32);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk = await hmac(salt, ikm);
  const cek = (await hmac(prk, cat(utf8("Content-Encoding: aes128gcm\0"), new Uint8Array([1])))).slice(0, 16);
  const nonce = (await hmac(prk, cat(utf8("Content-Encoding: nonce\0"), new Uint8Array([1])))).slice(0, 12);
  const k = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, k, cat(utf8(text), new Uint8Array([2]))));
  const rs = new Uint8Array([0, 0, 16, 0]);   // record size 4096
  return cat(salt, rs, new Uint8Array([asPub.length]), asPub, ct);
}

/* send one notification; returns the push service's HTTP status (404/410 = that phone unsubscribed) */
async function sendPush(sub, msg, env) {
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: { Authorization: await vapidHeader(sub.endpoint, env), "Content-Encoding": "aes128gcm", "Content-Type": "application/octet-stream", TTL: "3600", Urgency: "high" },
    body: await encryptPush(sub, JSON.stringify(msg)),
  });
  return res.status;
}

const validSub = (s) => s && typeof s.endpoint === "string" && /^https:\/\//.test(s.endpoint) && s.keys && typeof s.keys.p256dh === "string" && typeof s.keys.auth === "string";

/* /push/save {sub, timers:[{id, at, title, body}]} — replaces this phone's timers
   /push/test {sub, title, body}                     — sends one right away */
async function pushRoute(req, env, path) {
  if (!env.TIMERS) return json({ error: "push_not_set_up" }, 503);
  if (!env.VAPID_PRIVATE) return json({ error: "push_key_missing" }, 503);
  let body; try { body = await req.json(); } catch (e) { return json({ error: "bad request" }, 400); }
  if (!validSub(body.sub)) return json({ error: "bad subscription" }, 400);
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all"));
  if (path === "/push/test") {
    const st = await sendPush(body.sub, { title: String(body.title || "NXS").slice(0, 80), body: String(body.body || "").slice(0, 200), tag: /^(adm|demo)-[\w-]{1,36}$/.test(body.tag || "") ? body.tag : "test" }, env);
    return json({ ok: st < 300, status: st });
  }
  const now = Date.now();
  const timers = (Array.isArray(body.timers) ? body.timers : []).filter((x) => x && Number(x.at) > now - 60000 && Number(x.at) < now + 30 * 86400000)
    .slice(0, MAX_TIMERS).map((x) => ({ id: String(x.id).slice(0, 40), at: Math.round(Number(x.at)), title: String(x.title || "").slice(0, 80), body: String(x.body || "").slice(0, 200) }));
  const s = body.token ? await unseal(env, body.token) : null;
  if (s && s.u && Date.now() < s.exp) {   // 🔄 logged in with Discord: every device of this person gets the list
    const devices = await stub.saveFor(s.u.id, body.sub, timers, !!body.retext);
    return json({ ok: true, n: timers.length, devices });
  }
  await stub.save(body.sub, timers, !!body.retext);
  return json({ ok: true, n: timers.length });
}

export class PushTimers extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS t (ep TEXT, id TEXT, at INTEGER, title TEXT, body TEXT, sub TEXT, PRIMARY KEY (ep, id))`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS t_at ON t (at)`);
    // 🔄 Discord-logged-in people: their phones/computers (one person per device) and their synced ⏰ data
    this.sql.exec(`CREATE TABLE IF NOT EXISTS usub (ep TEXT PRIMARY KEY, uid TEXT, sub TEXT)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS sync (uid TEXT PRIMARY KEY, data TEXT, at INTEGER)`);
    // 💬 officer board: topics (bt), messages (bp), each person's page language (bl, for notifications)
    this.sql.exec(`CREATE TABLE IF NOT EXISTS bt (id TEXT PRIMARY KEY, title TEXT, by TEXT, at INTEGER, last INTEGER, n INTEGER, dec TEXT, dby TEXT, dat INTEGER)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS bp (id TEXT PRIMARY KEY, tid TEXT, by TEXT, at INTEGER, txt TEXT, ed INTEGER)`);
    this.sql.exec(`CREATE INDEX IF NOT EXISTS bp_tid ON bp (tid, at)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS bl (uid TEXT PRIMARY KEY, lang TEXT)`);
    // 📣 @mentions and 📋 tasks: bu = officers seen on the board (for the @ picker); bp.meta = { m: [uid], to: [uid], done: { uid: at } }
    this.sql.exec(`CREATE TABLE IF NOT EXISTS bu (uid TEXT PRIMARY KEY, name TEXT, avatar TEXT, at INTEGER)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS att (id TEXT PRIMARY KEY, data TEXT, at INTEGER)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT, at INTEGER)`);   // small shared settings (👥 officer table)   // 📋 attendance: one row per event (JSON)
    try { this.sql.exec(`ALTER TABLE bp ADD COLUMN meta TEXT`); } catch (e) {}
    this.sql.exec(`CREATE TABLE IF NOT EXISTS bimg (id TEXT PRIMARY KEY, data TEXT, at INTEGER)`);   // 🖼️ board pictures (data URLs, made small on the phone first)
    // 📊 shared Ranking plans (moved off GitHub 2026-10-30): one row per plan + every saved version (newest 150 per plan)
    this.sql.exec(`CREATE TABLE IF NOT EXISTS rp (id TEXT PRIMARY KEY, data TEXT, v INTEGER, at INTEGER)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS rph (id TEXT, v INTEGER, at INTEGER, by TEXT, data TEXT, PRIMARY KEY (id, v))`);
  }
  counts() {
    const o = {};
    for (const t of ["t", "usub", "sync", "bt", "bp", "bl", "bu", "att", "kv", "rp", "rph"]) o[t] = [...this.sql.exec(`SELECT COUNT(*) AS n FROM ${t}`)][0].n;
    o.phones = [...this.sql.exec(`SELECT COUNT(DISTINCT ep) AS n FROM t`)][0].n;
    const nx = [...this.sql.exec(`SELECT MIN(at) AS at FROM t`)][0].at;
    o.next_alarm = nx ? new Date(nx).toISOString() : null;
    o.alarm_runs_today = this.alarmRuns || 0;
    return o;
  }
  nameOf(uid) { const n = this.kvGet("names"); if (n && n[uid]) return n[uid]; const p = this.kvGet("perms"); return (p && p.users && p.users[uid] && p.users[uid].name) || null; }
  kvGet(k) { const r = [...this.sql.exec(`SELECT v FROM kv WHERE k = ?`, k)][0]; try { return r ? JSON.parse(r.v) : null; } catch (e) { return null; } }
  kvSet(k, obj) { const v = JSON.stringify(obj); const r = [...this.sql.exec(`SELECT v FROM kv WHERE k = ?`, k)][0]; if (r && r.v === v) return false; this.sql.exec(`INSERT OR REPLACE INTO kv VALUES (?, ?, ?)`, k, v, Date.now()); return true; }
  /* ---- 💬 board ---- */
  boardLang(uid, lang) { if (lang && ([...this.sql.exec(`SELECT lang FROM bl WHERE uid = ?`, uid)][0] || {}).lang !== lang) this.sql.exec(`INSERT OR REPLACE INTO bl VALUES (?, ?)`, uid, lang); }
  boardUser(by, lang) {   // written only when the name / picture changed
    const r = [...this.sql.exec(`SELECT name, avatar FROM bu WHERE uid = ?`, by.id)][0];
    if (!r || r.name !== by.name || r.avatar !== (by.avatar || "")) this.sql.exec(`INSERT OR REPLACE INTO bu VALUES (?, ?, ?, ?)`, by.id, by.name, by.avatar || "", Date.now());
    this.boardLang(by.id, lang);
  }
  boardUsers() { return [...this.sql.exec(`SELECT uid, name, avatar FROM bu WHERE uid NOT LIKE 'pw-%' ORDER BY name`)].map((r) => ({ id: r.uid, name: r.name, avatar: r.avatar })); }
  /* open tasks given to this person, across all topics (newest first) */
  boardTasks(uid) {
    const out = [];
    for (const r of this.sql.exec(`SELECT p.id, p.tid, p.by, p.at, p.txt, p.meta, t.title FROM bp p JOIN bt t ON t.id = p.tid WHERE p.meta IS NOT NULL ORDER BY p.at DESC LIMIT 300`)) {
      let m = null; try { m = JSON.parse(r.meta); } catch (e) {}
      if (!m || !(m.to || []).includes(uid) || (m.done && m.done[uid])) continue;
      out.push({ id: r.id, tid: r.tid, by: JSON.parse(r.by), at: r.at, txt: JSON.parse(r.txt), title: JSON.parse(r.title) });
    }
    return out;
  }
  boardMentions(uid) {   // 📣 recent messages (14 days) that @ this person — not their own
    const out = [], since = Date.now() - 14 * 864e5;
    for (const r of this.sql.exec(`SELECT p.id, p.tid, p.by, p.at, p.txt, p.meta, t.title FROM bp p JOIN bt t ON t.id = p.tid WHERE p.meta IS NOT NULL AND p.at > ? ORDER BY p.at DESC LIMIT 300`, since)) {
      let m = null; try { m = JSON.parse(r.meta); } catch (e) {}
      const by = JSON.parse(r.by); if (!m || !(m.m || []).includes(uid) || by.id === uid) continue;
      out.push({ id: r.id, tid: r.tid, by, at: r.at, txt: JSON.parse(r.txt), title: JSON.parse(r.title) });
      if (out.length >= 30) break;
    }
    return out;
  }
  boardList() {
    // lastBy = who wrote the newest message (the page shows no "unread" dot for your own)
    return [...this.sql.exec(`SELECT t.*, (SELECT by FROM bp WHERE tid = t.id ORDER BY at DESC LIMIT 1) AS lb FROM bt t ORDER BY last DESC LIMIT 200`)]
      .map((r) => ({ id: r.id, title: JSON.parse(r.title), by: JSON.parse(r.by), at: r.at, last: r.last, n: r.n, dec: r.dec || null, lastBy: r.lb ? JSON.parse(r.lb).id : null }));
  }
  boardThread(id) {
    const t = [...this.sql.exec(`SELECT * FROM bt WHERE id = ?`, id)][0];
    if (!t) return null;
    const posts = [...this.sql.exec(`SELECT * FROM bp WHERE tid = ? ORDER BY at`, id)].map((r) => { let m = null; try { m = r.meta ? JSON.parse(r.meta) : null; } catch (e) {} return { id: r.id, by: JSON.parse(r.by), at: r.at, txt: JSON.parse(r.txt), ed: r.ed || 0, ...(m ? { meta: m } : {}) }; });
    return { id: t.id, title: JSON.parse(t.title), by: JSON.parse(t.by), at: t.at, last: t.last, dec: t.dec || null, dby: t.dby ? JSON.parse(t.dby) : null, dat: t.dat || 0, posts };
  }
  boardNew(id, title, by, pid, txt, meta) {
    const now = Date.now();
    this.sql.exec(`INSERT INTO bt VALUES (?, ?, ?, ?, ?, 1, NULL, NULL, NULL)`, id, JSON.stringify(title), JSON.stringify(by), now, now);
    this.sql.exec(`INSERT INTO bp (id, tid, by, at, txt, ed, meta) VALUES (?, ?, ?, ?, ?, 0, ?)`, pid, id, JSON.stringify(by), now, JSON.stringify(txt), meta ? JSON.stringify(meta) : null);
    return this.boardThread(id);
  }
  boardReply(tid, by, pid, txt, meta) {
    if (![...this.sql.exec(`SELECT id FROM bt WHERE id = ?`, tid)].length) return null;
    const now = Date.now();
    this.sql.exec(`INSERT INTO bp (id, tid, by, at, txt, ed, meta) VALUES (?, ?, ?, ?, ?, 0, ?)`, pid, tid, JSON.stringify(by), now, JSON.stringify(txt), meta ? JSON.stringify(meta) : null);
    this.sql.exec(`UPDATE bt SET last = ?, n = n + 1 WHERE id = ?`, now, tid);
    return this.boardThread(tid);
  }
  boardPost(pid) { const r = [...this.sql.exec(`SELECT * FROM bp WHERE id = ?`, pid)][0]; let m = null; try { m = r && r.meta ? JSON.parse(r.meta) : null; } catch (e) {} return r ? { id: r.id, tid: r.tid, by: JSON.parse(r.by), at: r.at, meta: m } : null; }
  boardRetx(pid, txt, title) {   // 🔁 a background translation (sent with "Translate for everyone", or one that failed earlier); not shown as "edited"
    const p = this.boardPost(pid); if (!p) return;
    // merged into what is there: translations a reader added meanwhile stay; "pending" ends; an error is kept only if this one failed
    const r = [...this.sql.exec(`SELECT txt FROM bp WHERE id = ?`, pid)][0], x = { ...JSON.parse(r.txt), ...txt };
    if (!txt.pend) { delete x.pend; delete x.pt; }
    if (!txt.err) { delete x.err; delete x.rt; }
    if (x.orig !== txt.orig) return;   // edited meanwhile — this translation is of the old text
    this.sql.exec(`UPDATE bp SET txt = ? WHERE id = ?`, JSON.stringify(x), pid);
    if (title) this.sql.exec(`UPDATE bt SET title = ? WHERE id = ?`, JSON.stringify(title), p.tid);
  }
  boardTx1(pid, lang, text, title) {   // 🌐 one language added to a post (and its topic title); everything already there is kept
    const r = [...this.sql.exec(`SELECT tid, txt FROM bp WHERE id = ?`, pid)][0]; if (!r) return null;
    if (text) { const x = JSON.parse(r.txt); x[lang] = text; this.sql.exec(`UPDATE bp SET txt = ? WHERE id = ?`, JSON.stringify(x), pid); }
    if (title) { const t = [...this.sql.exec(`SELECT title FROM bt WHERE id = ?`, r.tid)][0]; if (t) { const y = JSON.parse(t.title); y[lang] = title; this.sql.exec(`UPDATE bt SET title = ? WHERE id = ?`, JSON.stringify(y), r.tid); } }
    return this.boardThread(r.tid);
  }
  boardEdit(pid, txt, title, meta) {
    const p = this.boardPost(pid); if (!p) return null;
    this.sql.exec(`UPDATE bp SET txt = ?, ed = ?, meta = ? WHERE id = ?`, JSON.stringify(txt), Date.now(), meta ? JSON.stringify(meta) : null, pid);
    if (title) this.sql.exec(`UPDATE bt SET title = ? WHERE id = ?`, JSON.stringify(title), p.tid);
    return this.boardThread(p.tid);
  }
  /* ✅ a task is ticked per person (the ones it was given to; anyone else's tick is kept too, named) */
  boardDone(pid, uid, on) {
    const p = this.boardPost(pid); if (!p) return null;
    const m = p.meta || {}; m.done = m.done || {};
    if (on) m.done[uid] = Date.now(); else delete m.done[uid];
    this.sql.exec(`UPDATE bp SET meta = ? WHERE id = ?`, JSON.stringify(m), pid);
    return this.boardThread(p.tid);
  }
  boardDecide(tid, pid, by) {
    if (pid && !this.boardPost(pid)) return null;
    this.sql.exec(`UPDATE bt SET dec = ?, dby = ?, dat = ? WHERE id = ?`, pid || null, pid ? JSON.stringify(by) : null, pid ? Date.now() : null, tid);
    return this.boardThread(tid);
  }
  boardImgPut(id, data) { this.sql.exec(`INSERT OR REPLACE INTO bimg VALUES (?, ?, ?)`, id, data, Date.now()); }
  boardImg(id) { const r = [...this.sql.exec(`SELECT data FROM bimg WHERE id = ?`, id)][0]; return r ? r.data : null; }
  boardImgDrop(metas) { for (const m of metas) for (const id of (m && m.img) || []) this.sql.exec(`DELETE FROM bimg WHERE id = ?`, id); }
  boardDelete(pid) {
    const p = this.boardPost(pid); if (!p) return null;
    const first = [...this.sql.exec(`SELECT id FROM bp WHERE tid = ? ORDER BY at LIMIT 1`, p.tid)][0];
    if (first && first.id === pid) {   // the opening message → the whole topic goes
      this.boardImgDrop([...this.sql.exec(`SELECT meta FROM bp WHERE tid = ?`, p.tid)].map((r) => { try { return JSON.parse(r.meta); } catch (e) { return null; } }));
      this.sql.exec(`DELETE FROM bp WHERE tid = ?`, p.tid); this.sql.exec(`DELETE FROM bt WHERE id = ?`, p.tid); return { gone: true };
    }
    this.boardImgDrop([p.meta]);
    this.sql.exec(`DELETE FROM bp WHERE id = ?`, pid);
    this.sql.exec(`UPDATE bt SET n = n - 1, dec = CASE WHEN dec = ? THEN NULL ELSE dec END WHERE id = ?`, pid, p.tid);
    return { topic: this.boardThread(p.tid) };
  }
  /* new message → a notification on the other officers' phones, in each one's own page language */
  async boardNotify(fromUid, tid, title, name, txt, meta) {
    if (!this.env.VAPID_PRIVATE) return 0;
    const langs = Object.fromEntries([...this.sql.exec(`SELECT uid, lang FROM bl`)].map((r) => [r.uid, r.lang]));
    const MENTION = { zh: "📣 提到你", en: "📣 Mentioned you", pt: "📣 Mencionou você", ar: "📣 أشار إليك", ko: "📣 회원님을 언급" }, TASK = { zh: "📋 指派給你", en: "📋 Task for you", pt: "📋 Tarefa para você", ar: "📋 مهمة لك", ko: "📋 회원님에게 배정" };
    let n = 0;
    for (const r of [...this.sql.exec(`SELECT ep, uid, sub FROM usub WHERE uid != ?`, fromUid)]) {
      const l = langs[r.uid] || "en", pick = (o) => (o && (o[l] || o.en || o.orig)) || "";
      const body = (name + ": " + pick(txt)).replace(/\s+/g, " ").slice(0, 160);
      const head = meta && (meta.to || []).includes(r.uid) ? (TASK[l] || TASK.en) + " · " : meta && (meta.m || []).includes(r.uid) ? (MENTION[l] || MENTION.en) + " · " : "💬 ";
      try {
        const st = await sendPush(JSON.parse(r.sub), { title: head + pick(title).slice(0, 70), body, tag: "brd-" + tid }, this.env);
        if (st === 404 || st === 410) this.sql.exec(`DELETE FROM usub WHERE ep = ?`, r.ep); else n++;
      } catch (e) {}
    }
    return n;
  }
  /* this device's notification list goes to every device the same person is logged in on */
  /* 📋 attendance lists (who confirmed, who showed up) — one JSON row per event */
  attList() { return [...this.sql.exec(`SELECT id, data, at FROM att ORDER BY at DESC LIMIT 60`)].map((r) => ({ ...JSON.parse(r.data), id: r.id, at: r.at })); }
  attSave(id, data, at) {
    const cur = [...this.sql.exec(`SELECT data FROM att WHERE id = ?`, id)][0];
    if (cur && cur.data === data) return false;
    this.sql.exec(`INSERT OR REPLACE INTO att VALUES (?, ?, ?)`, id, data, at); return true;
  }
  attDel(id) { this.sql.exec(`DELETE FROM att WHERE id = ?`, id); }
  /* ---- 📊 shared Ranking plans ---- */
  rpAll() { const o = {}; for (const r of this.sql.exec(`SELECT id, data, v FROM rp`)) { try { o[r.id] = { ...JSON.parse(r.data), _v: r.v }; } catch (e) {} } return o; }
  rpWrite(id, plan, by, v) {
    const now = Date.now(), data = JSON.stringify(plan);
    this.sql.exec(`INSERT OR REPLACE INTO rp VALUES (?, ?, ?, ?)`, id, data, v, now);
    this.sql.exec(`INSERT OR REPLACE INTO rph VALUES (?, ?, ?, ?, ?)`, id, v, now, String(by || "").slice(0, 60), data);
    this.sql.exec(`DELETE FROM rph WHERE id = ? AND v <= ?`, id, v - 1000);   // keep the last 1000 saves of each plan (was 150 — reply ticks used it up fast)
  }
  /* one save = only what that device changed: ticks added / removed, the settings and battle-table fields it touched.
     Done here, inside the Durable Object, so two saves at the same moment are applied one after the other — nothing is overwritten. */
  rpPatch(id, patch, user, admin) {
    const r = [...this.sql.exec(`SELECT data, v FROM rp WHERE id = ?`, id)][0];
    const cur = r ? JSON.parse(r.data) : null, v = r ? r.v + 1 : 1;
    if (cur && cur.editors && !admin && !(cur.owner && cur.owner.id === user.id) && !cur.editors.includes(user.id)) return { error: "ed_no" };
    if (!cur && !patch.full) return { error: "gone" };   // deleted meanwhile: a tick or a rename must not bring it back as an empty plan
    const idv = (x) => typeof x === "number" ? x : String(x);   // member ids are numbers: keep them numbers
    let p;
    if (patch.full) {
      const f = patch.full || {};
      p = { name: "", picked: [], subs: [], wPower: null, wts: null, counts: {}, tb: {}, ...(cur || {}), ...f };
      if (cur && cur.owner && !admin && cur.owner.id !== user.id) { p.owner = cur.owner; if (cur.editors) p.editors = cur.editors; else delete p.editors; }   // only the creator / admins change who may edit
    } else {
      p = JSON.parse(JSON.stringify(cur));
      const ids = new Set(p.picked || []);
      for (const x of patch.add || []) ids.add(idv(x));
      for (const x of patch.del || []) ids.delete(idv(x));
      p.picked = [...ids];
      for (const [k, val] of Object.entries(patch.f || {})) if (["wPower", "wts", "counts", "subs"].includes(k)) p[k] = val;
      if (patch.tb && typeof patch.tb === "object") { p.tb = { ...(p.tb || {}) }; for (const [k, val] of Object.entries(patch.tb)) { if (val === null) delete p.tb[k]; else p.tb[k] = val; } }
      if (patch.name) p.name = String(patch.name).slice(0, 40);
      if (patch.rep && typeof patch.rep === "object") { p.rep = { ...(p.rep || {}) }; for (const [k, val] of Object.entries(patch.rep)) { if (val === "y" || val === "n") p.rep[k] = val; else delete p.rep[k]; } }   // ✅ registration replies, one person at a time
    }
    if (patch.ed && (admin || !p.owner || p.owner.id === user.id)) {
      if (patch.ed.owner) p.owner = patch.ed.owner; else if (!p.owner) p.owner = { id: user.id, name: user.name };
      if (patch.ed.editors) p.editors = patch.ed.editors.map(String).slice(0, 60); else delete p.editors;
    }
    const ids = new Set(p.picked || []); p.subs = (p.subs || []).filter((x) => ids.has(x));
    if (p.rep) for (const k of Object.keys(p.rep)) if (!ids.has(Number(k)) && !ids.has(k)) delete p.rep[k];
    p.by = user.name; p.at = Date.now();
    this.rpWrite(id, p, user.name, v);
    return { plan: { ...p, _v: v } };
  }
  rpSeed(id, plan) {   // the one-time copy from the old GitHub file: never over a plan already saved here
    if ([...this.sql.exec(`SELECT 1 FROM rp WHERE id = ?`, id)].length || [...this.sql.exec(`SELECT 1 FROM rph WHERE id = ?`, id)].length) return false;
    this.rpWrite(id, plan, "import", 1); return true;
  }
  rpDel(id, user) {
    const r = [...this.sql.exec(`SELECT v FROM rp WHERE id = ?`, id)][0]; if (!r) return;
    this.sql.exec(`DELETE FROM rp WHERE id = ?`, id);
    this.sql.exec(`INSERT OR REPLACE INTO rph VALUES (?, ?, ?, ?, ?)`, id, r.v + 1, Date.now(), String(user.name || "").slice(0, 60), "null");   // a deleted plan keeps its history
  }
  /* 🗂️ recovery (admins): every plan that ever had a save, deleted ones too, and each version in short */
  rpIds() {
    const live = new Set([...this.sql.exec(`SELECT id FROM rp`)].map((r) => r.id));
    return [...this.sql.exec(`SELECT id, MAX(v) AS v, MAX(at) AS at, COUNT(*) AS n FROM rph GROUP BY id`)].map((r) => {
      const last = [...this.sql.exec(`SELECT data FROM rph WHERE id = ? AND data != 'null' ORDER BY v DESC LIMIT 1`, r.id)][0];
      let name = ""; try { name = (JSON.parse(last.data) || {}).name || ""; } catch (e) {}
      return { id: r.id, name, v: r.v, at: r.at, n: r.n, deleted: !live.has(r.id) }; });
  }
  rpVers(id) {
    return [...this.sql.exec(`SELECT v, at, by, data FROM rph WHERE id = ? ORDER BY v DESC LIMIT 1000`, id)].map((r) => {
      let p = null; try { p = JSON.parse(r.data); } catch (e) {}
      const tbRows = p && p.tb && Array.isArray(p.tb.groups) ? p.tb.groups.reduce((s, g) => s + ((g && g.rows) || []).length, 0) : 0;
      return { v: r.v, at: r.at, by: r.by, gone: !p, name: p ? p.name || "" : "", picked: p ? (p.picked || []).length : 0, rep: p && p.rep ? Object.keys(p.rep).length : 0, tb: tbRows }; });
  }
  rpRestore(id, v, by) {
    const r = [...this.sql.exec(`SELECT data FROM rph WHERE id = ? AND v = ?`, id, v)][0]; if (!r || r.data === "null") return null;
    const top = [...this.sql.exec(`SELECT MAX(v) AS v FROM rph WHERE id = ?`, id)][0], nv = ((top && top.v) || 0) + 1;
    const p = JSON.parse(r.data); p.by = by; p.at = Date.now();
    this.rpWrite(id, p, `${by} ↩ v${v}`, nv);
    return { ...p, _v: nv };
  }
  rpHist(id, before, n) {
    return [...this.sql.exec(`SELECT v, at, by, data FROM rph WHERE id = ? AND v < ? ORDER BY v DESC LIMIT ?`, id, before || 1e12, n || 30)]
      .map((r) => ({ v: r.v, at: r.at, by: r.by, plan: JSON.parse(r.data) }));
  }
  async saveFor(uid, sub, timers, retext) {
    const cur = [...this.sql.exec(`SELECT uid, sub FROM usub WHERE ep = ?`, sub.endpoint)][0];
    if (!cur || cur.uid !== uid || cur.sub !== JSON.stringify(sub)) this.sql.exec(`INSERT OR REPLACE INTO usub VALUES (?, ?, ?)`, sub.endpoint, uid, JSON.stringify(sub));
    const subs = [...this.sql.exec(`SELECT sub FROM usub WHERE uid = ?`, uid)].map((r) => JSON.parse(r.sub));
    for (const x of subs) await this.save(x, timers, retext);
    return subs.length;
  }
  async forget(ep) { this.sql.exec(`DELETE FROM usub WHERE ep = ?`, ep); }
  /* merge this device's ⏰ data with what's saved for the person (newest edit wins; deletions are remembered) */
  async syncMerge(uid, inc) {
    const row = [...this.sql.exec(`SELECT data FROM sync WHERE uid = ?`, uid)][0];
    let cur = {}; try { cur = row ? JSON.parse(row.data) : {}; } catch (e) { cur = {}; }
    const now = Date.now(), del = {};
    for (const src of [cur.del || {}, inc.del || {}]) for (const [id, t] of Object.entries(src)) if (now - t < 30 * 864e5) del[id] = Math.max(del[id] || 0, +t || 0);
    const byId = {};
    for (const x of [...(cur.timers || []), ...(inc.timers || [])]) {
      if (!x || !x.id || del[x.id] >= (x.mt || 0) || !(x.at > now - 2 * 3600000)) continue;
      if (!byId[x.id] || (x.mt || 0) > (byId[x.id].mt || 0)) byId[x.id] = x;
    }
    const pick = (k) => ((inc[k + "At"] || 0) > (cur[k + "At"] || 0) ? [inc[k], inc[k + "At"]] : [cur[k], cur[k + "At"] || 0]);
    const [alerts, alertsAt] = pick("alerts"), [presets, presetsAt] = pick("presets");
    // ✅ ticked lists from the site (daily checklist, KvK checklist, buff-stack steps): { key: { v, at } }, newest wins per key; 40 days kept
    const ls = {};
    for (const src of [cur.ls || {}, inc.ls || {}]) for (const [k, x] of Object.entries(src)) {
      // synced page data (keep in step with js/timers.js and js/sync-lite.js); calculators can be bigger than a checklist
      if (!/^(nxs-daily-v1|nxs-stack-done|ks-kvk-check-[\w-]{1,40}|nxs-bt-v2|kvk-calc-v5|nxs-roster-v2|nxs-table-v1|nxs-events-v1|nxs-board-seen|nxs-watch-v1|nxs-scout-v1)$/.test(k) || !x || typeof x.v !== "string" || x.v.length > 30000 || !(now - x.at < 120 * 864e5)) continue;
      if (!ls[k] || x.at > ls[k].at) ls[k] = { v: x.v, at: +x.at };
    }
    const out = { timers: Object.values(byId).sort((a, b) => a.at - b.at).slice(0, 200), del, alerts: alerts || {}, alertsAt, presets: presets || {}, presetsAt, ls };
    const txt = JSON.stringify(out);
    if (txt.length > 200000) throw new Error("too_big");
    if (!row || row.data !== txt) this.sql.exec(`INSERT OR REPLACE INTO sync VALUES (?, ?, ?)`, uid, txt, now);   // unchanged → no write
    return out;
  }
  /* only the differences are written: the free plan allows 100k written rows a day, and a phone's list
     (3 weeks of event alerts) is hundreds of rows — rewriting it all on every visit used the allowance up */
  /* retext: the phone says the wording changed on purpose (an edit). Without it, rows whose time is the same
     are left alone even if the text differs — a language switch alone must not cost any row writes. */
  async save(sub, timers, retext) {
    const ep = sub.endpoint, s = JSON.stringify(sub);
    const have = new Map([...this.sql.exec(`SELECT id, at, title, body, sub FROM t WHERE ep = ?`, ep)].map((r) => [r.id, r]));
    const keep = new Set();
    let changed = false;
    for (const x of timers) {
      keep.add(x.id);
      const r = have.get(x.id);
      if (r && r.at === x.at && r.sub === s && (!retext || (r.title === x.title && r.body === x.body))) continue;
      this.sql.exec(`INSERT OR REPLACE INTO t VALUES (?, ?, ?, ?, ?, ?)`, ep, x.id, x.at, x.title, x.body, s); changed = true;
    }
    for (const id of have.keys()) if (!keep.has(id)) { this.sql.exec(`DELETE FROM t WHERE ep = ? AND id = ?`, ep, id); changed = true; }
    if (changed) await this.schedule();
  }
  async schedule() {
    const next = [...this.sql.exec(`SELECT MIN(at) AS at FROM t`)][0];
    if (next && next.at != null) await this.ctx.storage.setAlarm(Math.max(Date.now() + 500, next.at));
    else await this.ctx.storage.deleteAlarm();
  }
  async alarm() {
    this.alarmRuns = (this.alarmRuns || 0) + 1;
    const due = [...this.sql.exec(`SELECT * FROM t WHERE at <= ? ORDER BY at LIMIT 200`, Date.now() + 2000)];
    // alarms can fire a moment early: with nothing due, wait for the real time (never a tight 500 ms loop — every setAlarm is a write)
    if (!due.length) { const nx = [...this.sql.exec(`SELECT MIN(at) AS at FROM t`)][0]; if (nx && nx.at != null) { await this.ctx.storage.setAlarm(Math.max(Date.now() + 10000, nx.at)); return; } }
    const gone = new Set();
    for (const r of due) {
      this.sql.exec(`DELETE FROM t WHERE ep = ? AND id = ?`, r.ep, r.id);
      if (gone.has(r.ep)) continue;
      try {
        const st = await sendPush(JSON.parse(r.sub), { title: r.title, body: r.body, tag: r.id }, this.env);
        if (st === 404 || st === 410) gone.add(r.ep);
      } catch (e) { /* one bad phone shouldn't stop the others */ }
    }
    for (const ep of gone) { this.sql.exec(`DELETE FROM t WHERE ep = ?`, ep); this.sql.exec(`DELETE FROM usub WHERE ep = ?`, ep); }
    await this.schedule();
  }
}

/* ================= 💬 Officer board =================
   Topics and replies for planning together. Only people logged in with Discord (DISCORD_ACCESS) can read or write.
   Every message is translated into the R4/R5 languages (BOARD_LANGS) with the game's own terms from data/terms.js;
   the original is always kept. Stored in the PushTimers Durable Object (tables bt / bp). */
const BOARD_LANGS = ["zh", "en", "pt", "ar", "ko"];
const TERM_COL = { en: 0, zh: 1, ko: 2, de: 3, fr: 4, pt: 5, tr: 6, id: 7, ru: 8, th: 9, ar: 10, es: 11 };
let termRows = { rows: null, at: 0 };
async function getTermRows() {
  if (termRows.rows && Date.now() - termRows.at < CACHE_MS) return termRows.rows;
  const s = await (await fetch(SITE_BASE + "data/terms.js", { cf: { cacheTtl: 300 } })).text();
  const a = s.indexOf("const TERMS = ") + 14, b = s.indexOf("\n];", a) + 2;
  const cats = JSON.parse(s.slice(a, b).replace(/,(\s*[\]}])/g, "$1"));
  termRows = { rows: cats.flatMap((c) => c.rows), at: Date.now() };
  return termRows.rows;
}
/* only the terms that actually appear in the message (in any language) → a small table for the translator */
function termTable(rows, text) {
  const low = text.toLowerCase(), out = [];
  const clean = (v) => String(v || "").replace(/\s*\(.*?\)\s*/g, " ").replace(/\{\w+\}/g, "").trim();   // "{n}號要塞" → "號要塞"
  for (const r of rows) {
    const hit = Object.values(TERM_COL).some((i) => { const v = clean(r[i]); return v && v !== "—" && v.length >= (/[　-鿿가-힯]/.test(v) ? 2 : 4) && low.includes(v.toLowerCase()); });
    if (hit) out.push(BOARD_LANGS.map((l) => { const v = r[TERM_COL[l]]; return `${l}: ${v && v !== "—" ? v : "(none)"}`; }).join(" | "));
    if (out.length >= 120) break;
  }
  return out.join("\n");
}
/* → { ok, title?: {orig, src, zh, en, pt}, text: {orig, src, zh, en, pt} } ; on failure only the original is kept (ok: false) */
async function boardTranslate(env, title, text) {
  const plain = { ok: false, text: { orig: text }, ...(title ? { title: { orig: title } } : {}) };
  if (!env.GEMINI_API_KEY) return plain;
  let terms = ""; try { terms = termTable(await getTermRows(), (title || "") + "\n" + text); } catch (e) {}
  const langList = BOARD_LANGS.map((l) => `"${l}" = ${LANG_NAMES[l]}`).join(", ");
  const system = [
    "You are the translator for the officers (R4/R5) of the NXS alliance in the mobile game Kingshot. They write in different languages; each officer reads the board in their own.",
    `Languages: ${langList}.`,
    "Rules: keep the meaning, tone, line breaks, lists, emojis, numbers, coordinates (X:123 Y:456), times and dates exactly; times are UTC — never convert them.",
    "Never translate member names, alliance tags like [NXS], @mentions or links. Picture markers like [[img1]] stay exactly as written, in the same place.",
    "Game terms: when a game term from the TERM TABLE appears, use exactly the name given for the target language; never invent your own translation of a game term; if the table says (none), keep the term as written.",
    "Chinese = Traditional Chinese as used in Taiwan (繁體中文), never Simplified. Portuguese = Brazilian Portuguese. Arabic = Modern Standard Arabic (keep numbers as 0-9). Korean = natural Korean as used in the game.",
    terms ? "\n===== TERM TABLE (official in-game names) =====\n" + terms : "",
  ].join("\n");
  // the task itself goes in the user turn (small models follow it better there than in the system text)
  const ask = (label, body) => [
    `Translate this ${label} into ALL of these languages: ${langList}. Every field must be written in that field's language —`,
    `"en" must be English text, "pt" must be Portuguese text, "zh" must be Traditional Chinese text, "ar" must be Arabic text, "ko" must be Korean text. Only the language the ${label} is already written in keeps the original wording.`,
    `Reply with JSON only, exactly this shape: {"src": "<ISO code of the language the ${label} is written in>", "zh": "...", "en": "...", "pt": "..."}`,
    "", label.toUpperCase() + ":", body,
  ].join("\n");
  const schema = { type: "object", properties: { src: { type: "string" }, zh: { type: "string" }, en: { type: "string" }, pt: { type: "string" } }, required: ["src", ...BOARD_LANGS] };
  const cjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g;
  const errs = [];
  // one call per piece (title, text); a result is accepted only if the other languages really differ from the original
  const one = async (label, body) => {
   for (let round = 0; round < 2; round++) {
    if (round) { if (!errs.length || !errs.every((e) => /HTTP (429|500|502|503|504)|UNAVAILABLE|overloaded|high demand|timeout/i.test(e))) break; await new Promise((r) => setTimeout(r, 2500)); }   // all just busy → wait a moment, try once more
    for (const m of MODELS) {
      let r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask(label, body) }] }], { responseMimeType: "application/json", responseSchema: schema, temperature: 0.2, maxOutputTokens: 32768 });   // a long post × 5 languages needs far more than the default 4096
      if (r.error && /HTTP 400/.test(r.error)) r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask(label, body) }] }], { temperature: 0.2, maxOutputTokens: 32768 });
      if (r.error) { errs.push(m + ": " + r.error); continue; }
      let j;
      try { const raw = r.answer.replace(/^```(?:json)?\s*|\s*```$/g, ""); j = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1)); }
      catch (e) { errs.push(m + ": bad JSON (" + String(r.answer).slice(0, 60) + ")"); continue; }
      const src = String(j.src || "").toLowerCase().slice(0, 5), x = { orig: body, src };
      for (const l of BOARD_LANGS) if (typeof j[l] === "string" && j[l].trim()) x[l] = j[l].trim();
      // sanity: the non-source languages must not just repeat the original, and en/pt must not be CJK text
      const others = BOARD_LANGS.filter((l) => l !== src);
      const mostlyCjk = (t) => (t.match(cjk) || []).length * 2 > t.replace(/[\s\d\p{P}]/gu, "").length;   // more than half of the letters
      const share = (t, re) => (t.match(re) || []).length / Math.max(1, t.replace(/[\s\d\p{P}\p{S}]/gu, "").length);
      const arab = /[\u0600-\u06ff]/g, hangul = /[\uac00-\ud7af\u1100-\u11ff]/g, han = /[\u3400-\u9fff]/g;
      // en/pt must be mostly Latin letters, zh mostly Chinese, ar mostly Arabic — otherwise the model just copied the original
      const lazy = others.filter((l) => !x[l] || x[l] === body || (l === "en" || l === "pt" ? mostlyCjk(x[l]) || share(x[l], arab) > 0.5 : l === "ar" ? share(x[l], arab) < 0.3 : l === "ko" ? share(x[l], hangul) < 0.3 : share(x[l], han) < 0.3));
      if (lazy.length && others.length) { errs.push(m + ": returned the original for " + lazy.join(",")); continue; }
      return x;
    }
   }
    return null;
  };
  const tx = await one("message", text);
  if (!tx) { plain.text.err = errs.map((e) => e.slice(0, 120)).join(" | ").slice(0, 700); return plain; }   // kept with the message so the page can show why
  const out = { ok: true, text: tx };
  if (title) out.title = (await one("title", title)) || { orig: title, src: tx.src };
  return out;
}
/* 🌐 one language only (a reader pressed "Translate" on a post that was sent without translations) → { ok, text } or { ok: false, err } */
async function boardTranslate1(env, label, body, to) {
  if (!env.GEMINI_API_KEY) return { ok: false, err: "no key" };
  let terms = ""; try { terms = termTable(await getTermRows(), body); } catch (e) {}
  const system = [
    "You are the translator for the officers (R4/R5) of the NXS alliance in the mobile game Kingshot.",
    "Rules: keep the meaning, tone, line breaks, lists, emojis, numbers, coordinates (X:123 Y:456), times and dates exactly; times are UTC — never convert them.",
    "Never translate member names, alliance tags like [NXS], @mentions or links. Picture markers like [[img1]] stay exactly as written, in the same place.",
    "Game terms: when a game term from the TERM TABLE appears, use exactly the name given for the target language; never invent your own translation of a game term; if the table says (none), keep the term as written.",
    "Chinese = Traditional Chinese as used in Taiwan (繁體中文), never Simplified. Portuguese = Brazilian Portuguese. Arabic = Modern Standard Arabic (keep numbers as 0-9). Korean = natural Korean as used in the game.",
    terms ? "\n===== TERM TABLE (official in-game names) =====\n" + terms : "",
  ].join("\n");
  const ask = `Translate this ${label} into ${LANG_NAMES[to]}. If it is already written in ${LANG_NAMES[to]}, return it unchanged. Reply with JSON only: {"text": "..."}\n\n${label.toUpperCase()}:\n${body}`;
  const schema = { type: "object", properties: { text: { type: "string" } }, required: ["text"] };
  const errs = [];
  for (let round = 0; round < 2; round++) {
    if (round) { if (!errs.length || !errs.every((e) => /HTTP (429|500|502|503|504)|UNAVAILABLE|overloaded|high demand|timeout/i.test(e))) break; await new Promise((r) => setTimeout(r, 2500)); }
    for (const m of MODELS) {
      let r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask }] }], { responseMimeType: "application/json", responseSchema: schema, temperature: 0.2, maxOutputTokens: 16384 });
      if (r.error && /HTTP 400/.test(r.error)) r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask }] }], { temperature: 0.2, maxOutputTokens: 16384 });
      if (r.error) { errs.push(m + ": " + r.error); continue; }
      try { const raw = r.answer.replace(/^```(?:json)?\s*|\s*```$/g, ""); const j = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1)); if (typeof j.text === "string" && j.text.trim()) return { ok: true, text: j.text.trim() }; errs.push(m + ": empty"); }
      catch (e) { errs.push(m + ": bad JSON"); }
    }
  }
  return { ok: false, err: errs.map((e) => e.slice(0, 120)).join(" | ").slice(0, 500) };
}
/* the language a message is written in, from its letters (a post sent without translation has no AI-detected source);
   Latin text → the writer's page language if that is en / pt, else en */
function boardSrc(text, pageLang) {
  const t = String(text || ""), n = Math.max(1, t.replace(/[\s\d\p{P}\p{S}]/gu, "").length), share = (re) => (t.match(re) || []).length / n;
  if (share(/[\uac00-\ud7af\u1100-\u11ff]/g) > 0.3) return "ko";
  if (share(/[\u0600-\u06ff]/g) > 0.3) return "ar";
  if (share(/[\u3400-\u9fff]/g) > 0.3) return "zh";
  return pageLang === "pt" ? "pt" : "en";
}
/* 🌐 a post sent with "Translate for everyone": saved at once, translated into all languages in the background (the page picks it up on its next look) */
function boardTxLater(env, ctx, stub, pid, title, text) {
  const job = (async () => {
    const tr = await boardTranslate(env, title, text);
    if (tr.ok) await stub.boardRetx(pid, tr.text, title ? tr.title : null);
    else await stub.boardRetx(pid, { orig: text, err: tr.text.err, rt: Date.now() }, null);
    await boardTouch(env);
  })().catch(() => {});
  if (ctx && ctx.waitUntil) ctx.waitUntil(job);
}
/* 🔁 posts whose translation failed (e.g. the AI was busy): translated again in the background when someone opens the thread;
   the page picks the result up on its next poll. Each post is tried at most every 5 minutes (txt.rt = last try). */
function retryTx(env, ctx, stub, t) {
  const now = Date.now(), todo = t.posts.filter((p) => p.txt && (p.txt.err || (p.txt.pend && now - (p.txt.pt || 0) > 300000)) && !(now - (p.txt.rt || 0) < 300000)).slice(0, 2);
  if (!todo.length || !ctx || !ctx.waitUntil) return;
  ctx.waitUntil((async () => {
    let any = false;
    for (const p of todo) {
      const first = t.posts[0] && t.posts[0].id === p.id, needTitle = first && t.title && Object.keys(t.title).length <= 2 ? t.title.orig : "";
      const tr = await boardTranslate(env, needTitle, p.txt.orig);
      if (tr.ok) { await stub.boardRetx(p.id, tr.text, needTitle ? tr.title : null); any = true; }
      else await stub.boardRetx(p.id, { ...p.txt, err: tr.text.err || p.txt.err, rt: Date.now() }, null);
    }
    if (any) await boardTouch(env);
  })().catch(() => {}));
}
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
/* "anything new?" is answered from KV (or this isolate's memory) — the pages poll, and every poll must NOT wake the
   Durable Object: a DO that is kept awake all day eats the free plan's daily duration allowance. */
let boardStampMem = 0;
async function boardStamp(env) {
  if (env.LIMITS) { try { const v = Number(await env.LIMITS.get("board:stamp")); if (v) return v; } catch (e) {} }
  return boardStampMem;
}
async function boardTouch(env) {
  boardStampMem = Date.now();
  if (env.LIMITS) { try { await env.LIMITS.put("board:stamp", String(boardStampMem)); } catch (e) {} }
  return boardStampMem;
}
/* 📋 /attend — who confirmed for an event and who showed up. ops: list · save {ev} · del {id} · ocr {images: [dataURL…]}
   An event: { id, title, date: "2026-10-18", slots: [{ name, confirmed: [{id, name}], present: [id…], excused: [id…] }] } */
/* 👥 officer table (who sees / edits which tab), kept on the server so every device shows the same table.
   Anyone logged in can read it (it decides their own tabs); only admins in the table (and the owner) can change it. */
const PERMS_OWNER = "1547403844374368327";   // Sparrow — always admin (same as OFFICER.OWNER on the page)
const PERM_LEVELS = ["edit", "view", "none"];
async function permsRoute(stub, user, body, token, role) {
  const op = String(body.op || "get");
  const cur = withSeed(await stub.kvGet("perms"));
  if (op === "get") return json({ ok: true, token, perms: cur, user, ...(role === "admin" ? { seen: (await stub.kvGet("seen")) || {}, avatars: Object.fromEntries((await stub.boardUsers()).filter((x) => x.avatar).map((x) => [x.id, x.avatar])) } : {}) });
  if (op === "setdk") {   // 🔐 an admin's page hands over the data key once, so viewers can read without the password
    if (role !== "admin") return json({ error: "not_admin" }, 403);
    const k = String(body.dk || ""); if (!/^[A-Za-z0-9+/]{43}=$/.test(k)) return json({ error: "bad request" }, 400);
    try { await stub.kvSet("dk", { k, at: Date.now() }); } catch (e) { return json({ error: "db" }, 503); }
    return json({ ok: true, token });
  }
  if (op === "rename") {   // admins / editors may change their OWN name on the site (viewers can't change anything)
    if (role === "viewer") return json({ error: "view_only" }, 403);
    const name = String(body.name || "").replace(/\s+/g, " ").trim().slice(0, 40);
    if (!name) return json({ error: "bad request" }, 400);
    try {
      const names = (await stub.kvGet("names")) || {}; names[user.id] = name; await stub.kvSet("names", names);
      if (cur && cur.users && cur.users[user.id] && cur.users[user.id].name !== name) { cur.users[user.id].name = name; await stub.kvSet("perms", cur); }
    } catch (e) { return json({ error: /exceeded allowed|free tier|limit/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); }
    return json({ ok: true, token, perms: await stub.kvGet("perms"), user: { ...user, name } });
  }
  if (op !== "save") return json({ error: "bad request" }, 400);
  const isAdmin = role === "admin";
  if (!isAdmin) return json({ error: "not_admin" }, 403);
  const inc = body.perms && typeof body.perms === "object" && body.perms.users && typeof body.perms.users === "object" ? body.perms.users : null;
  if (!inc) return json({ error: "bad request" }, 400);
  const users = {};
  for (const [id, u] of Object.entries(inc).slice(0, 200)) {
    if (!/^\d{5,25}$/.test(id) || !u || typeof u !== "object") continue;
    const perms = {};
    for (const [k, v] of Object.entries(u.perms || {}).slice(0, 30)) if (/^[a-z]{1,12}$/.test(k) && PERM_LEVELS.includes(v)) perms[k] = v;
    const notify = cleanNotify(u.notify);   // 🔔 events whose officer to-dos this person is reminded of
    users[id] = { name: String(u.name || "").slice(0, 40), ...(u.admin || ADMIN_IDS.includes(id) ? { admin: true } : {}), perms, ...(notify ? { notify } : {}) };
  }
  if (!users[PERMS_OWNER]) users[PERMS_OWNER] = { name: "Sparrow", admin: true, perms: {} };   // nobody can lock the owner out
  const seedOut = Object.keys(SEED_VIEWERS).filter((id) => !users[id]);   // seeded people the admin removed stay removed
  const cfg = { mReply: !!(body.perms.cfg && body.perms.cfg.mReply) };   // 💬 switch: view-only officers may reply where they were @'d / assigned
  const perms = { v: 2, users, seedOut, cfg, by: { id: user.id, name: user.name }, at: Date.now() };
  try {
    await stub.kvSet("perms", perms);
    const names = (await stub.kvGet("names")) || {}; let ch = false;   // names given in the table are the site names too
    for (const [id, x] of Object.entries(users)) if (x.name && names[id] !== x.name) { names[id] = x.name; ch = true; }
    if (ch) await stub.kvSet("names", names);
  }
  catch (e) { return json({ error: /exceeded allowed|free tier|limit/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); }
  return json({ ok: true, token, perms });
}
/* 📊 /plans — the Ranking tab's shared plans (were a GitHub file until 2026-10-30; GitHub saves collided with each other and with site updates).
   ops: list {since} · save {id, patch} · del {id} · hist {id, before}. Reading: anyone the 👥 table lets see the Ranking tab; writing: Ranking ✏️ edit.
   The first request copies the plans once from the old GitHub file (data/ranking-plans-x7k2p9.json), which is not written any more. */
const PLANS_FILE_API = "https://api.github.com/repos/NXSguides/Kingshot_guideline_NXS/contents/data/ranking-plans-x7k2p9.json?ref=main";
const PLANS_FILE_RAW = "https://raw.githubusercontent.com/NXSguides/Kingshot_guideline_NXS/main/data/ranking-plans-x7k2p9.json";
let plansStampMem = 0;
async function plansStamp(env) { if (env.LIMITS) { try { const v = Number(await env.LIMITS.get("plans:stamp")); if (v) return v; } catch (e) {} } return plansStampMem; }
async function plansTouch(env) { plansStampMem = Date.now(); if (env.LIMITS) { try { await env.LIMITS.put("plans:stamp", String(plansStampMem)); } catch (e) {} } return plansStampMem; }
async function plansImport(env, stub) {
  if (await stub.kvGet("rp:imp")) return;
  let r = await fetch(PLANS_FILE_API, { headers: { "User-Agent": "nxs-worker", Accept: "application/vnd.github.raw+json" } });
  if (!r.ok) r = await fetch(PLANS_FILE_RAW + "?t=" + Date.now(), { headers: { "User-Agent": "nxs-worker" } });   // the API allows 60 calls an hour without a key
  if (!r.ok) throw new Error("import " + r.status);
  const d = await openData(JSON.parse(await r.text()), env), plans = (d && d.plans) || {};
  for (const [id, p] of Object.entries(plans)) if (/^[\w-]{1,40}$/.test(id) && p) await stub.rpSeed(id, p);
  await stub.kvSet("rp:imp", { at: Date.now(), n: Object.keys(plans).length });
  await plansTouch(env);
}
async function plansRoute(env, stub, user, body, token, perms) {
  const op = String(body.op || "list"), role = roleOf(perms, user.id), admin = role === "admin";
  const u = perms && perms.users && perms.users[user.id];
  const seeTab = (t) => !!(u && u.perms && u.perms[t] && u.perms[t] !== "none");
  const mayView = admin || seeTab("ranking") || seeTab("attend"), mayEdit = canEdit(perms, user.id, "ranking");
  if (!mayView) return json({ error: "no_access" }, 403);
  const since = +body.since || 0, stamp = await plansStamp(env);
  if (op === "list" && since && stamp && stamp <= since) return json({ ok: true, token, unchanged: true, stamp });
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  try { await plansImport(env, stub); } catch (e) { if (op === "list") return json({ error: "import", detail: [String(e.message || e)] }, 503); }
  if (op === "list") return json({ ok: true, token, plans: await stub.rpAll(), safe: (await stub.kvGet("att:safe")) || [], stamp: stamp || await plansTouch(env) });
  // 🟡 safe players (registered without waiting for a reply): one list, shared with the 📋 Attendance tab
  if (op === "safe") {
    if (!mayEdit) return json({ error: "view_only" }, 403);
    return write(async () => { const sid = String(body.id || "").slice(0, 40); if (!sid) return json({ error: "bad request" }, 400);
      const cur = new Set((await stub.kvGet("att:safe")) || []); if (body.on) cur.add(sid); else cur.delete(sid);
      await stub.kvSet("att:safe", [...cur].slice(0, 300)); return json({ ok: true, token, safe: [...cur], stamp: await plansTouch(env) }); });
  }
  // 🗂️ recovery (admins only): all plans incl. deleted ones, their versions, and putting one version back
  if (op === "all") { if (!admin) return json({ error: "no_access" }, 403); return json({ ok: true, token, ids: await stub.rpIds() }); }
  const id = String(body.id || "");
  if (!/^[\w-]{1,40}$/.test(id)) return json({ error: "bad request" }, 400);
  if (op === "vers") { if (!admin) return json({ error: "no_access" }, 403); return json({ ok: true, token, vers: await stub.rpVers(id) }); }
  if (op === "restore") { if (!admin) return json({ error: "no_access" }, 403);
    return write(async () => { const p = await stub.rpRestore(id, +body.v || 0, user.name); if (!p) return json({ error: "gone" }, 404); return json({ ok: true, token, plan: p, stamp: await plansTouch(env) }); }); }
  if (op === "hist") return json({ ok: true, token, vers: await stub.rpHist(id, +body.before || 0, 30) });
  if (!mayEdit) return json({ error: "view_only" }, 403);
  if (op === "save") return write(async () => {
    const patch = body.patch && typeof body.patch === "object" ? body.patch : null;
    if (!patch || JSON.stringify(patch).length > 200000) return json({ error: "bad request" }, 400);
    const r = await stub.rpPatch(id, patch, { id: user.id, name: user.name }, admin);
    if (r.error) return json({ error: r.error }, r.error === "gone" ? 404 : 403);
    return json({ ok: true, token, plan: r.plan, stamp: await plansTouch(env) });
  });
  if (op === "del") return write(async () => { await stub.rpDel(id, { name: user.name }); return json({ ok: true, token, stamp: await plansTouch(env) }); });
  return json({ error: "bad request" }, 400);
}
/* 🎁 /rewards — the Sanctuary Battle special rewards (they rotate between seasons): officers with ✏️ Map rights update them on the
   Map tab; everyone who may open the Map tab reads them. Stored in the DO (kv "rewards"), the last 20 versions in "rewards:hist".
   rewards = { phases: { "5": { special: { fortress: { "1": [itemId, qty] … }, sanctuary: { … } }, season, by, at } … }, items: { customId: { en, zh, … } } } */
async function rewardsRoute(stub, user, body, token, perms) {
  const op = String(body.op || "get"), role = roleOf(perms, user.id);
  const u = perms && perms.users && perms.users[user.id];
  const mayView = role === "admin" || !!(u && u.perms && u.perms.map && u.perms.map !== "none");
  if (!mayView) return json({ error: "no_access" }, 403);
  if (op === "get") return json({ ok: true, token, rewards: (await stub.kvGet("rewards")) || null });
  if (op !== "save") return json({ error: "bad request" }, 400);
  if (!canEdit(perms, user.id, "map")) return json({ error: "view_only" }, 403);
  const r = body.rewards && typeof body.rewards === "object" ? body.rewards : null; if (!r || !r.special) return json({ error: "bad request" }, 400);
  const id = (x) => /^[\w-]{1,40}$/.test(String(x)) ? String(x) : null, qty = (x) => Math.max(0, Math.min(1e7, Math.round(+x || 0)));
  const special = {};
  for (const k of ["fortress", "sanctuary"]) { special[k] = {};
    for (const [n, v] of Object.entries((r.special && r.special[k]) || {})) { if (!/^\d{1,2}$/.test(n) || !Array.isArray(v) || !id(v[0])) continue; special[k][n] = [id(v[0]), qty(v[1])]; } }
  const items = {};
  for (const [k, v] of Object.entries(r.items || {}).slice(0, 40)) { if (!id(k) || !v || typeof v !== "object") continue; items[k] = {};
    for (const [l, t] of Object.entries(v)) if (/^[a-z]{2}$/.test(l)) items[k][l] = String(t).slice(0, 80); }
  const phase = Math.round(+r.phase || 0); if (!(phase >= 1 && phase <= 8)) return json({ error: "bad phase" }, 400);
  // one list per phase (1–8): every phase of a season has its own rewards; a phase not saved here uses the Wiki table on the page
  let all;
  try {
    const old = await stub.kvGet("rewards");
    all = old && old.phases ? old : { phases: {}, items: {} };
    if (old && old.special && !old.phases) all.phases[String(old.phase || 5)] = { special: old.special, season: old.season || 0, by: old.by, at: old.at };   // first format (one list)
    all.phases[String(phase)] = { special, season: Math.max(0, Math.min(99, Math.round(+r.season || 0))), by: user.name, at: Date.now() };
    all.items = { ...(all.items || {}), ...items };
    if (JSON.stringify(all).length > 60000) return json({ error: "too_big" }, 413);
    if (old) { const h = (await stub.kvGet("rewards:hist")) || []; h.unshift(old); await stub.kvSet("rewards:hist", h.slice(0, 20)); }
    await stub.kvSet("rewards", all);
  } catch (e) { return json({ error: "db", detail: [String(e && e.message || e)] }, 503); }
  return json({ ok: true, token, rewards: all });
}
async function attendRoute(env, stub, user, body, token, mayEdit) {
  const op = String(body.op || "list");
  if (op !== "list" && !mayEdit) return json({ error: "view_only" }, 403);
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  if (op === "list") return json({ ok: true, token, events: await stub.attList(), safe: (await stub.kvGet("att:safe")) || [] });
  // 🟡 safe players (registered without waiting for a reply): one list for every event, remembered for the next lists
  if (op === "safe") return write(async () => {
    const id = String(body.id || "").slice(0, 40); if (!id) return json({ error: "bad request" }, 400);
    const cur = new Set((await stub.kvGet("att:safe")) || []); if (body.on) cur.add(id); else cur.delete(id);
    await stub.kvSet("att:safe", [...cur].slice(0, 300)); return json({ ok: true, token, safe: [...cur] });
  });
  if (op === "save") return write(async () => {
    const ev = body.ev && typeof body.ev === "object" ? body.ev : null;
    if (!ev || !/^[\w-]{1,40}$/.test(String(ev.id || ""))) return json({ error: "bad request" }, 400);
    // sheet = the event type this list belongs to (Swordland, Tri-Alliance…); one list = one plan / one slot. sub = substitute
    // reg = list with the registration step: per person rep "y" (confirmed) / "n" (can't come) / none (no reply yet); safe = 🟡 when saved
    const clean = { title: String(ev.title || "").slice(0, 80), sheet: String(ev.sheet || "").slice(0, 40), plan: String(ev.plan || "").slice(0, 40), date: String(ev.date || "").slice(0, 10), by: { id: user.id, name: user.name }, ...(ev.reg ? { reg: 1 } : {}),
      slots: (Array.isArray(ev.slots) ? ev.slots : []).slice(0, 8).map((sl) => ({
        name: String(sl.name || "").slice(0, 40),
        confirmed: (Array.isArray(sl.confirmed) ? sl.confirmed : []).slice(0, 200).map((m) => ({ id: String(m.id || "").slice(0, 40), name: String(m.name || "").slice(0, 60), ...(m.sub ? { sub: 1 } : {}), ...(m.rep === "y" || m.rep === "n" ? { rep: m.rep } : {}), ...(m.safe ? { safe: 1 } : {}) })),
        present: (Array.isArray(sl.present) ? sl.present : []).slice(0, 200).map((x) => String(x).slice(0, 40)),
        excused: (Array.isArray(sl.excused) ? sl.excused : []).slice(0, 200).map((x) => String(x).slice(0, 40)) })) };
    const data = JSON.stringify(clean);
    if (data.length > 60000) return json({ error: "too_big" }, 413);
    const changed = await stub.attSave(String(ev.id), data, Date.now());
    return json({ ok: true, token, changed });
  });
  if (op === "del") return write(async () => { await stub.attDel(String(body.id || "")); return json({ ok: true, token }); });
  if (op === "ocr") {
    // screenshots of the in-game voter / participant list → player names (the phone matches them against the roster)
    const imgs = (Array.isArray(body.images) ? body.images : []).slice(0, 6).map((u) => String(u).match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/)).filter(Boolean);
    if (!imgs.length) return json({ error: "no_image" }, 400);
    if (imgs.some((m) => m[2].length > 4_500_000)) return json({ error: "too_big" }, 413);
    const sys = "You read screenshots from the mobile game Kingshot. Each shows player cards in a 2-column grid (an alliance poll's voter list, or an event participant list): every card has a rank badge (R2–R5) on the left, the player NAME in bold at the top of the card, then a power number (e.g. 64.4M) and a level (Lv.30 or a medal icon). Return ONLY a JSON array of the player names exactly as written, reading cards left-to-right, top-to-bottom, one entry per card. Keep the name's own characters (emoji, brackets, symbols); the small superscript alliance tag 'Nexus' and the 山-like tag marks around it are decoration and may be dropped. Skip cards that are cut off at the top or bottom edge if the name is not readable. Ignore headings, counts, power numbers, levels and buttons.";
    const parts = imgs.map((m) => ({ inlineData: { mimeType: m[1], data: m[2] } }));
    parts.push({ text: "List the player names in these screenshots as a JSON array of strings." });
    const r = await gemini(env, MODELS[0], sys, [{ role: "user", parts }], { responseMimeType: "application/json", maxOutputTokens: 2048, temperature: 0 });
    if (r.error) return json({ error: "ai", detail: [r.error] }, 502);
    let names = []; try { names = JSON.parse(r.answer); } catch (e) { const m = String(r.answer || "").match(/\[[\s\S]*\]/); try { names = m ? JSON.parse(m[0]) : []; } catch (x) {} }
    names = (Array.isArray(names) ? names : []).map((x) => String(x).trim()).filter(Boolean).slice(0, 300);
    return json({ ok: true, token, names });
  }
  return json({ error: "bad op" }, 400);
}
async function boardRoute(env, ctx, stub, user, body, token, mayPost, perms) {
  const op = body.op, lang = BOARD_LANGS.includes(body.lang) ? body.lang : null;
  const by = { id: user.id, name: user.name, avatar: user.avatar || "" };
  const ok = (o) => json({ ok: true, token, ...o });
  // polls: nothing changed since the page last looked → answer without touching the Durable Object
  const since = +body.since || 0, stamp = await boardStamp(env);
  if ((op === "list" || op === "get") && since && stamp && stamp <= since) return ok({ unchanged: true, stamp });
  if (op === "img") { const d = await stub.boardImg(String(body.id || "")); return d ? ok({ data: d }) : json({ error: "gone", token }, 404); }   // 🖼️ anyone who can read
  if (!mayPost && op !== "list" && op !== "get" && op !== "tr") {
    // 💬 (switch on the 👥 tab) a view-only officer may reply in a topic where someone @'d or assigned them
    let okReply = false;
    if (op === "reply" && perms && perms.cfg && perms.cfg.mReply) { const t = await stub.boardThread(String(body.id || "")); okReply = !!(t && t.posts.some((q) => q.meta && ((q.meta.m || []).includes(user.id) || (q.meta.to || []).includes(user.id)))); }
    if (!okReply) return json({ error: "view_only" }, 403);
  }   // 👁️ view-only on the 👥 table: read, nothing else
  // name + language (for @ pickers and notifications): on writes and on the first look of a visit. Reading must still work when
  // writing is impossible (daily write allowance used up), so a failure here is ignored
  if (op !== "list" && op !== "get" && op !== "tr" || body.first) { try { await stub.boardUser(by, lang); } catch (e) {} }
  const ids = (v) => (Array.isArray(v) ? v : []).map(String).filter((x) => /^\d{17,20}$/.test(x)).slice(0, 60);   // 60: room for @all
  const metaOf = (b, old, img) => { const m = { m: ids(b.mentions), to: ids(b.to) }; if (old && old.done) m.done = old.done; const im = img || (old && old.img); if (im && im.length) m.img = im; return m.m.length || m.to.length || m.done || m.img ? m : null; };
  // 🖼️ up to 4 pictures per message, already shrunk on the phone (≤ ~900 KB each)
  const saveImgs = async () => { const out = [];
    for (const u of (Array.isArray(body.images) ? body.images : []).slice(0, roleOf(perms, user.id) === "admin" ? 50 : 4)) {   // 🖼️ admins: 50, others: 4
      const v = String(u); if (!/^data:image\/(?:webp|jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(v) || v.length > 900_000) continue;
      const id = rid(); await stub.boardImgPut(id, v); out.push(id); }
    return out; };
  const str = (v, max) => String(v || "").replace(/\r/g, "").trim().slice(0, max);
  const notify = (t, tx, meta) => { const p = stub.boardNotify(user.id, t.id, t.title, user.name, tx, meta); if (ctx && ctx.waitUntil) ctx.waitUntil(p); };
  // 👁️ an admin previewing as another officer sees that officer's tasks and @s
  const vid = body.as && roleOf(perms, user.id) === "admin" ? String(body.as).slice(0, 40) : user.id;
  if (op === "list") return ok({ topics: await stub.boardList(), users: await stub.boardUsers(), tasks: await stub.boardTasks(vid), ments: await stub.boardMentions(vid), stamp: stamp || await boardTouch(env) });
  if (op === "get") { const t = await stub.boardThread(String(body.id || "")); if (t) retryTx(env, ctx, stub, t); return t ? ok({ topic: t, stamp: stamp || await boardTouch(env) }) : json({ error: "gone", token }, 404); }
  // writes: when the database refuses (allowance used up), say so clearly — the page keeps the text so nothing is lost
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  if (op === "new") return write(async () => {
    const title = str(body.title, 120), text = str(body.text, 4000);
    if (!title || !text) return json({ error: "empty" }, 400);
    // 🌐 saved at once with the original only; "Translate for everyone" (body.tx) translates in the background
    const src = boardSrc(title + "\n" + text, lang), now = Date.now();
    const txt = { orig: text, src, ...(body.tx ? { pend: 1, pt: now } : {}) }, ttl = { orig: title, src };
    const meta = metaOf(body, null, await saveImgs()), pid = rid();
    const t = await stub.boardNew(rid(), ttl, by, pid, txt, meta);
    notify(t, txt, meta);
    if (body.tx) boardTxLater(env, ctx, stub, pid, title, text);
    return ok({ topic: t, translated: true, stamp: await boardTouch(env) });
  });
  if (op === "reply") return write(async () => {
    const text = str(body.text, 4000) || ((body.images || []).length ? "📷" : "");
    if (!text) return json({ error: "empty" }, 400);
    const txt = { orig: text, src: boardSrc(text, lang), ...(body.tx ? { pend: 1, pt: Date.now() } : {}) };
    const meta = metaOf(body, null, await saveImgs()), pid = rid();
    const t = await stub.boardReply(String(body.id || ""), by, pid, txt, meta);
    if (!t) return json({ error: "gone" }, 404);
    notify(t, txt, meta);
    if (body.tx) boardTxLater(env, ctx, stub, pid, "", text);
    return ok({ topic: t, translated: true, stamp: await boardTouch(env) });
  });
  /* 🌐 tr {post, to}: one post (and the topic title if it is the first post) into one language; kept, so the next reader gets it at once */
  if (op === "tr") return write(async () => {
    const to = BOARD_LANGS.includes(body.to) ? body.to : lang, pp = body.post ? await stub.boardPost(String(body.post)) : null;
    if (!pp || !to) return json({ error: "gone" }, 404);
    const t = await stub.boardThread(pp.tid), q = t && t.posts.find((x) => x.id === pp.id);
    if (!q) return json({ error: "gone" }, 404);
    const first = t.posts[0].id === q.id, needTitle = first && !t.title[to];
    let tx = q.txt[to] ? null : await boardTranslate1(env, "message", q.txt.orig, to);
    if (tx && !tx.ok) return json({ error: "tr_failed", detail: [tx.err] }, 503);
    const ti = needTitle ? await boardTranslate1(env, "title", t.title.orig, to) : null;
    const nt = await stub.boardTx1(q.id, to, tx ? tx.text : null, ti && ti.ok ? ti.text : null);
    return ok({ topic: nt, stamp: await boardTouch(env) });
  });
  const p = body.post ? await stub.boardPost(String(body.post)) : null;
  if (op === "done") return write(async () => {   // ✅ tick / untick a task (anyone may; the name of who ticked is kept)
    if (!p) return json({ error: "gone" }, 404);
    return ok({ topic: await stub.boardDone(p.id, user.id, !!body.on), stamp: await boardTouch(env) });
  });
  if (op === "edit" || op === "del") return write(async () => {
    if (!p) return json({ error: "gone" }, 404);
    if (p.by.id !== user.id) return json({ error: "not_yours" }, 403);
    if (op === "del") return ok({ ...(await stub.boardDelete(p.id)), stamp: await boardTouch(env) });
    const text = str(body.text, 4000), title = body.title != null ? str(body.title, 120) : "";
    if (!text) return json({ error: "empty" }, 400);
    // 🌐 saved at once; if the post had translations (or "Translate for everyone" is on) they are made again in the background,
    // so an edit never leaves old translations of the old text and never loses the translations it had
    const old = await stub.boardThread(p.tid), op0 = old && old.posts.find((x) => x.id === p.id);
    const hadTx = !!(op0 && BOARD_LANGS.some((l) => l !== op0.txt.src && op0.txt[l] && op0.txt[l] !== op0.txt.orig));
    const reTx = hadTx || !!body.tx, src = boardSrc((title ? title + "\n" : "") + text, lang);
    const tr = { ok: true, text: { orig: text, src, ...(reTx ? { pend: 1, pt: Date.now() } : {}) }, title: title ? { orig: title, src } : null };
    if (reTx) boardTxLater(env, ctx, stub, p.id, title, text);
    let meta = body.mentions || body.to ? metaOf(body, p.meta) : p.meta;
    if (Array.isArray(body.imgs)) {   // 🖼️ edited pictures: "id:<id>" = keep that one, a data URL = a new one; the rest are deleted
      const old = (p.meta && p.meta.img) || [], keep = [];
      for (const x of body.imgs.slice(0, roleOf(perms, user.id) === "admin" ? 50 : 4)) {
        const v = String(x);
        if (v.startsWith("id:")) { const id = v.slice(3); if (old.includes(id) && !keep.includes(id)) keep.push(id); }
        else if (/^data:image\/(?:webp|jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(v) && v.length <= 900_000) { const id = rid(); await stub.boardImgPut(id, v); keep.push(id); }
      }
      const gone = old.filter((id) => !keep.includes(id)); if (gone.length) await stub.boardImgDrop([{ img: gone }]);
      meta = { ...(meta || {}) }; if (keep.length) meta.img = keep; else delete meta.img;
      if (!["m", "to", "img"].some((k) => (meta[k] || []).length) && !meta.done) meta = null;
    }
    return ok({ topic: await stub.boardEdit(p.id, tr.text, title ? tr.title : null, meta), translated: true, stamp: await boardTouch(env) });
  });
  if (op === "decide") return write(async () => {   // 📌 any officer can mark (or clear) the decision of a topic
    const t = await stub.boardDecide(String(body.id || ""), p ? p.id : null, by);
    return t ? ok({ topic: t, stamp: await boardTouch(env) }) : json({ error: "gone" }, 404);
  });
  return json({ error: "bad op" }, 400);
}

/* ================= Officer login with Discord =================
   The officer page sends people to /auth/discord/start → Discord's own login/approve page → /auth/discord/callback.
   We check they're on our alliance server and allowed (DISCORD_ACCESS below), then hand the page a sealed "session"
   (only this Worker can open it). /auth/me re-checks with Discord every 10 minutes, so taking someone off the list
   (or their role) locks them out on their next visit.
   Secrets: DISCORD_CLIENT_SECRET (Discord app → OAuth2), OFFICER_PASSWORD (the current officer password — the page
   still opens the officer data with it for now). */
const DISCORD = {
  client: "1559587282615402516",
  guild: "1530709485042270258",
  scope: "identify",   // no server check any more: who may log in = the 👥 table (+ ADMIN_IDS)
};
/* the three admins (Sparrow, R5, Nia): always allowed, always admin. Everyone else must be in the 👥 table (kv "perms"). */
const ADMIN_IDS = ["1547403844374368327", "1240788094672834623", "762827904341246013"];
/* view-only officers added by Sparrow (2026-10-16): put into the 👥 table with Events / Board / Map "view" if they aren't in it yet.
   After that the table is the truth — change or remove them on the 👥 tab. */
const SEED_VIEWERS = {"741447079804797041": "firebaugh", "734803550672257104": "ASHISH", "961642100150124555": "BOO", "1526789098210197638": "ELR", "216564539041251329": "flip", "1534039396461056172": "JORDAN", "1525666601456767171": "PAPA", "706153853460021341": "Tiger", "1003385592983322664": "Δйʊвιŝ"};
const VIEW_DEFAULT = { events: "view", board: "view", map: "view", ranking: "none", attend: "none", post: "none", watch: "none", scout: "none", views: "none", move: "none", hunt: "none", attack: "none" };
/* 🛠️ which events' officer to-dos each person gets as a reminder (from Sparrow's role list, 2026-10-16) — only a starting point:
   once an admin changes someone's 🔔 on the 👥 tab, the saved list wins. Admins with no list get every event. */
const MOB = "alliance-mobilization";
const NOTIFY_DEFAULT = {
  "216564539041251329": ["bear-hunt", "viking-vengeance", "cesares-fury", MOB],              // Flip
  "961642100150124555": ["swordland-showdown", "tri-alliance-clash", "viking-vengeance", MOB], // Boo
  "1526789098210197638": ["swordland-showdown", "tri-alliance-clash", MOB],                   // ELR
  "1534039396461056172": ["swordland-showdown", "kvk", MOB],                                  // Jordan (Castle Battle = KvK's last day)
  "1525666601456767171": ["sanctuary-battle", MOB],                                           // Papa
  "741447079804797041": ["cesares-fury", MOB],                                                // Fire (firebaugh)
  "706153853460021341": [MOB], "734803550672257104": [MOB], "1003385592983322664": [MOB],    // Tiger, Ashish, Anubis
};
const cleanNotify = (a) => Array.isArray(a) ? [...new Set(a.filter((k) => typeof k === "string" && /^[a-z][a-z-]{0,39}$/.test(k)))].slice(0, 40) : undefined;
function withSeed(perms) {
  const p = perms && perms.users ? perms : { v: 2, users: {} };
  const gone = new Set(p.seedOut || []);   // removed on the 👥 tab → don't bring back
  for (const [id, name] of Object.entries(SEED_VIEWERS)) if (!p.users[id] && !gone.has(id)) p.users[id] = { name, perms: { ...VIEW_DEFAULT } };
  for (const id of ADMIN_IDS) if (p.users[id]) p.users[id].admin = true;
  for (const [id, keys] of Object.entries(NOTIFY_DEFAULT)) if (p.users[id] && !Array.isArray(p.users[id].notify)) p.users[id].notify = [...keys];
  const jo = p.users["1534039396461056172"];   // first list wrongly had Call of the Sovereign for Jordan — drop it if that list is still unchanged
  if (jo && Array.isArray(jo.notify) && jo.notify.join() === "swordland-showdown,kvk,call-of-sovereign,alliance-mobilization") jo.notify = NOTIFY_DEFAULT["1534039396461056172"].slice();
  return p;
}
/* role from the 👥 table: "admin" | "editor" (edit right on some tab) | "viewer" | null (not on the list) */
function roleOf(perms, id) {
  if (ADMIN_IDS.includes(id)) return "admin";
  const u = perms && perms.users && perms.users[id];
  if (!u) return null;
  if (u.admin) return "admin";
  return Object.values(u.perms || {}).includes("edit") ? "editor" : "viewer";
}
const canEdit = (perms, id, tab) => { const r = roleOf(perms, id); if (r === "admin") return true; const u = perms && perms.users && perms.users[id]; return !!(u && u.perms && u.perms[tab] === "edit"); };
/* (old) who may open the officer page: Discord user IDs, and/or role IDs on our server */
const DISCORD_ACCESS = {
  users: ["1547403844374368327", "1240788094672834623", "762827904341246013"],
  roles: [],
};
const SESSION_DAYS = 30, RECHECK_MS = 10 * 60000, GRACE_MS = 24 * 3600000;

/* Login tokens are sealed with a key made once and kept in KV ("session-key"), so re-pasting a secret or
   reconnecting Cloudflare never logs everyone out. Tokens sealed with the old secret-derived key still open (legacy). */
let sessionKeys = null;   // { main, legacy } cached per isolate
async function sealKeys(env) {
  if (sessionKeys) return sessionKeys;
  const imp = (raw) => crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
  const legacy = await imp(await crypto.subtle.digest("SHA-256", utf8("nxs-session|" + String(env.DISCORD_CLIENT_SECRET || "").trim())));
  let main = legacy;
  try {
    if (env.LIMITS) {
      let hex = await env.LIMITS.get("session-key");
      if (!hex || hex.length !== 64) { hex = [...crypto.getRandomValues(new Uint8Array(32))].map((b) => b.toString(16).padStart(2, "0")).join(""); await env.LIMITS.put("session-key", hex); }
      main = await imp(Uint8Array.from(hex.match(/../g), (h) => parseInt(h, 16)));
    }
  } catch (e) { main = legacy; sessionKeys = null; return { main, legacy }; }   // KV hiccup: don't cache, try again next time
  return (sessionKeys = { main, legacy });
}
async function seal(env, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, (await sealKeys(env)).main, utf8(JSON.stringify(obj)));
  return b64u.enc(iv) + "." + b64u.enc(ct);
}
async function unseal(env, s) {
  const [iv, ct] = String(s || "").split(".");
  const keys = await sealKeys(env);
  for (const k of [keys.main, keys.legacy]) {
    try {
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64u.dec(iv) }, k, b64u.dec(ct));
      return JSON.parse(new TextDecoder().decode(pt));
    } catch (e) {}
  }
  return null;
}
const redirect = (url) => new Response(null, { status: 302, headers: { Location: url, "Cache-Control": "no-store" } });
const callbackUrl = (req) => new URL(req.url).origin + "/auth/discord/callback";

async function discordToken(req, env, params) {
  const r = await fetch("https://discord.com/api/v10/oauth2/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: DISCORD.client, client_secret: String(env.DISCORD_CLIENT_SECRET || "").trim(), ...params }),
  });
  if (!r.ok) throw new Error("token " + r.status);
  return r.json();
}
/* who is this, and are they allowed? → { ok, user } | { ok:false, why } ; throws when Discord can't be reached */
async function discordCheck(access, env) {
  const h = { Authorization: "Bearer " + access };
  const me = await fetch("https://discord.com/api/v10/users/@me", { headers: h });
  if (me.status === 401) return { ok: false, why: "expired" };
  if (!me.ok) throw new Error("me " + me.status);
  const u = await me.json();
  let m = {};   // server nickname if we can still see it (older logins); not needed to get in
  try { const mr = await fetch(`https://discord.com/api/v10/users/@me/guilds/${DISCORD.guild}/member`, { headers: h }); if (mr.ok) m = await mr.json(); } catch (e) {}
  let perms = null; try { const stub = env && env.TIMERS ? env.TIMERS.get(env.TIMERS.idFromName("all")) : null; perms = stub ? await stub.kvGet("perms") : null; } catch (e) {}
  perms = withSeed(perms);
  const allowed = !!roleOf(perms, u.id);
  const user = { id: u.id, name: m.nick || u.global_name || u.username, avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64` : "" };
  return allowed ? { ok: true, user } : { ok: false, why: "no_access", user };
}

/* is this session still good? re-asks Discord every 10 minutes (refreshing its key when needed) */
async function sessionCheck(req, env, token) {
  const s = await unseal(env, token), now = Date.now();
  if (!s || now > s.exp) return { error: "logged_out", status: 401 };
  if (now - s.chk > RECHECK_MS) {
    try {
      if (now > s.ax) { const tk = await discordToken(req, env, { grant_type: "refresh_token", refresh_token: s.rt }); Object.assign(s, { at: tk.access_token, rt: tk.refresh_token || s.rt, ax: now + (tk.expires_in || 604800) * 1000 - 60000 }); }
      const c = await discordCheck(s.at, env);
      if (!c.ok) return c.why === "expired" ? { error: "logged_out", status: 401 } : { error: c.why, status: 403, user: c.user };
      s.u = c.user; s.chk = now;
    } catch (e) {
      if (now - s.chk > GRACE_MS) return { error: "discord_unreachable", status: 503 };   // Discord briefly down: keep the last check for a day
    }
  }
  return { s };
}

async function authRoute(req, env, path, ctx) {
  if (!env.DISCORD_CLIENT_SECRET) return json({ error: "discord_secret_missing" }, 503);
  const url = new URL(req.url);
  if (path === "/auth/discord/start") {
    let back = url.searchParams.get("r") || SITE_BASE + "officer-x7k2p9.html";
    if (!back.startsWith(SITE_BASE)) back = SITE_BASE + "officer-x7k2p9.html";
    const state = await seal(env, { r: back, t: Date.now() });
    const q = new URLSearchParams({ client_id: DISCORD.client, redirect_uri: callbackUrl(req), response_type: "code", scope: DISCORD.scope, state, prompt: "none" });
    return redirect("https://discord.com/oauth2/authorize?" + q);
  }
  if (path === "/auth/discord/callback") {
    const st = await unseal(env, url.searchParams.get("state"));
    if (!st || Date.now() - st.t > 15 * 60000) return redirect(SITE_BASE + "officer-x7k2p9.html#login_error=expired");
    const back = (k) => { const u = new URL(st.r); const h = u.hash.slice(1); u.hash = k + (h ? "&to=" + encodeURIComponent(h) : ""); return redirect(u.href); };
    const code = url.searchParams.get("code");
    if (!code) return back("login_error=cancelled");
    try {
      const tk = await discordToken(req, env, { grant_type: "authorization_code", code, redirect_uri: callbackUrl(req) });
      const c = await discordCheck(tk.access_token, env);
      if (!c.ok) return back("login_error=" + c.why);
      const now = Date.now();
      const session = await seal(env, { u: c.user, at: tk.access_token, rt: tk.refresh_token, ax: now + (tk.expires_in || 604800) * 1000 - 60000, chk: now, exp: now + SESSION_DAYS * 86400000 });
      return back("login=" + session);
    } catch (e) { return back("login_error=discord"); }
  }
  if (path === "/auth/me" || path === "/sync" || path === "/sync/forget" || path === "/board" || path === "/attend" || path === "/plans" || path === "/rewards" || path === "/perms") {
    if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
    let body; try { body = await req.json(); } catch (e) { return json({ error: "bad request" }, 400); }
    const c = await sessionCheck(req, env, body.token);   // Discord login only (the officer password alone no longer opens anything)
    if (c.error) return json({ error: c.error, user: c.user }, c.status);
    const s = c.s, token = s.pw ? undefined : await seal(env, s);
    const stub = env.TIMERS ? env.TIMERS.get(env.TIMERS.idFromName("all")) : null;
    // ✏️ the name shown on the site can be changed (👥 table / the name at the top of the officer page); the Discord name stays underneath
    let u = s.u;
    if (stub && !s.pw) { try { const nm = await stub.nameOf(s.u.id); if (nm && nm !== s.u.name) u = { ...s.u, name: nm, discordName: s.u.name }; } catch (e) {} }
    const perms = withSeed(stub ? await stub.kvGet("perms") : null), role = roleOf(perms, s.u.id);
    if (path === "/auth/me" && stub && role) {   // 👥 "last seen": who has logged in, and when (written at most once an hour per person)
      try { const seen = (await stub.kvGet("seen")) || {}; const now = Date.now(); if (!seen[s.u.id] || now - seen[s.u.id] > 3600000) { seen[s.u.id] = now; await stub.kvSet("seen", seen); } } catch (e) {}
      try { await stub.boardUser({ id: s.u.id, name: s.u.name, avatar: s.u.avatar || "" }, null); } catch (e) {}   // 🖼️ Discord picture (written only when it changes)
    }
    if (path === "/auth/me") {
      if (!env.OFFICER_PASSWORD) return json({ error: "officer_password_missing", user: u }, 503);
      if (!role) return json({ error: "no_access", user: u }, 403);
      // 👁️ viewers never get the password (it also opens the GitHub key for saving): only the data key, to read
      if (role === "viewer") { const dk = stub ? await stub.kvGet("dk") : null; return json({ ok: true, user: u, role, dk: dk && dk.k || null, token }); }
      return json({ ok: true, user: u, role, pw: String(env.OFFICER_PASSWORD).trim(), token, needDk: !!stub && !(await stub.kvGet("dk")) });
    }
    if (!stub) return json({ error: "push_not_set_up" }, 503);
    if (path === "/board") return boardRoute(env, ctx, stub, u, body, token, canEdit(perms, s.u.id, "board"), perms);
    if (path === "/attend") return attendRoute(env, stub, u, body, token, canEdit(perms, s.u.id, "attend"));
    if (path === "/plans") return plansRoute(env, stub, u, body, token, perms);
    if (path === "/rewards") return rewardsRoute(stub, u, body, token, perms);
    if (path === "/perms") return permsRoute(stub, u, body, token, role);
    if (path === "/sync/forget") { if (body.sub && body.sub.endpoint) await stub.forget(String(body.sub.endpoint)); return json({ ok: true }); }
    const st = body.state && typeof body.state === "object" ? body.state : {};
    try { return json({ ok: true, user: s.u, token, state: await stub.syncMerge(s.u.id, st) }); }
    catch (e) { return json({ error: "too_big" }, 413); }
  }
  return json({ error: "not found" }, 404);
}
