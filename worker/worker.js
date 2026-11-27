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
    if (path.startsWith("/auth/") || path === "/sync" || path === "/sync/forget" || path === "/board" || path === "/attend" || path === "/plans" || path === "/rewards" || path === "/perms" || path === "/directed" || path === "/secret" || path === "/ws") return authRoute(req, env, path, ctx);   // 🔑 officer login with Discord
    if (path === "/push/save" || path === "/push/test") {
      if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
      return pushRoute(req, env, path);
    }
    if (path === "/secret/get") {   // 🔒 a link-only announcement, for whoever holds its link (no login)
      if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
      let b; try { b = await req.json(); } catch (e) { return json({ error: "bad request" }, 400); }
      return secretGet(env, b);
    }
    if (path === "/hive") {   // 📍 public "Where's my spot?" page: the moving plan's spots with today's roster names (no login)
      if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
      return hiveRoute(env);
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
    if (body.positions) return positionsRoute(req, env, body);   // officer page → 🚚 Move / 🐝 Hive: everyone's castle X:Y right now
    if (body.sspull) return ssPullRoute(req, env, body);   // officer page → ⚔️ Battle → 🗡️ Swordland: the opposing alliance, fetched on the spot
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
        try { const od = officerDataFor(await getOfficer(env), acc.tabs, acc.side); if (od) context += "\n\n" + od; }
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
- All officer tabs are one page now (officer-x7k2p9.html); switching tabs is instant and you log in once. The tabs, in order (renamed and reordered 2026-11-05): 📅 Events (活動排程), 💬 Board (留言板), 📢 Post (發布公告), 📊 Roster (名冊; was Ranking / 成員排序 — the #ranking link still works), 📋 Attendance (出席), 🗺️ Map (王國地圖), 🐝 Hive (蜂巢; was 🚚 Move / 搬家 — the alliance move and member positions, admins unless given; #move link), 🔬 Research (研究報告), ⚖️ Compare (比一比; was ⚔️ Battle / 作戰 — ⚖️ Super compare, strength list, 🎯 KvK intel, 🔭 Scout; #attack link), 🧳 Transfer (移民名單; Kingdom Transfer list, since 2026-11-08, admins unless given; #tr link), 🕵️ Watchlist (觀察名單; was Watch), 🎯 Blacklist (黑名單), 📈 Views (網站瀏覽), 👥 Officers (幹部, admins only). Old names in older notes below mean the same tabs. Each officer only sees the tabs the 👥 table gives them. 🔬 Research (研究報告, since 2026-11-04) is one main tab holding our reports as small sub-tabs in three groups: own growth — 💎 Investment, 🧭 Growth / Attack vs Defense, 🎓 Masters (since 2026-11-12), 🦸 Heroes, 🧳 Migrant Score; events — 🐻 Bear Hunt report, 🐻 Bear analysis, 🪓 Viking report; battle rules — ⚔️ Rally & Garrison (own group since 2026-11-08), 🦣 Terror rallies (since 2026-11-11), 🩹 Battle losses (since 2026-11-12), 📺 Guide notes (since 2026-11-12, outside guide videos). Every report is written for the reader (since 2026-11-11): it opens with one card — 💡 Suggestions (advice, NOT rules everyone must follow), plus 🔎 What we saw only for findings the page doesn't show further down — then the results; how it was worked out (formulas, tests, sources) is folded at the bottom under 🔢 How we worked it out. Tapping 🔬 Research opens 💎 Investment first — ONE 👥 permission "🔬 Research" opens all of them (since 2026-11-04, Sherry); each keeps its own link (#growth, #hr, #bh, #bearplan, #vv, #rg, #tb, #ms, #iv).
[views] - 📈 Views (中文: 網站瀏覽): site statistics — visitors per day, which guides and languages people open, countries, where they came from, devices; 7 / 30 / 90 days. Counting is GoatCounter, anonymous (no cookies, names or IPs). NOT counted: any browser where an officer has logged in to the officer page (officers test the site all day), and the officer page itself. So "this browser: not counted" on the Views tab is normal for every officer. If it says the token is not set: Cloudflare Worker → Settings → Variables and Secrets → add GOATCOUNTER_TOKEN (GoatCounter → Settings → API → new token with "Read statistics").
[map] - 📣 TEXT FOR THE GAME CHAT (2026-11-25, Sherry): (2026-11-26: the time is picked with five buttons, 03:00 / 09:00 / 13:00 / 14:00 / 17:00 UTC — the battle hours the game offers, per Sherry; the battle day is always the Friday of the phase week. Next to each hour is the countdown until it, because the game shows only a countdown; tap to pick, tap again to clear; "Other" takes any other time. The same picker is also in the panel of the Sanctuary / Fortress itself — tap it on the map, mark it 🎯 Target, and "📣 Battle time this phase" appears under the note; both boxes are one value.) in 📋 the plan, under the 🎯 Targets list of Sanctuaries and Fortresses, there is one time box per target. Type each target's battle time (UTC) and the box below shows one line per target, earliest first, always in English: the time, the short name (S12 = Sanctuary 12, F2 = Fortress 2), and in brackets the distance from our HQ in km as the game counts it (1 tile = 1 km; the nearer of our HQs) — e.g. "14:00 UTC F2 (35 km, march 1-2 min)". The march time is an estimated range in whole minutes (measured by Sherry 2026-11-25 on two accounts): 5.07 seconds × km to the power 0.854, divided by (1 + March Speed bonus) — a curve, so short marches take longer per km, and bonuses add up (alliance tech 5% + Outposts + island…). It fits six marches from 49 to 401 km within 3% (gathering, a solo beast march, an alliance building, where a rally 集結 and a solo attack take the same time); it has not been measured on a Sanctuary or Fortress itself yet. Slow end of the range: only the bonus every member has — alliance tech +5% and the Frontier Lodges marked ✅ Ours on the map (+15% for a Lv.3 one) — plus 3%. Fast end: a member with 5 points more of their own. It is measured from our HQ, not from each member's city. Beast rallies are faster and do not follow this; beast-march hero skills (Diana, Fahd) add to the bonus. Copy puts the text on the clipboard to paste in the game. A target without a time is listed without one. The times are for this phase's battle day (the Friday of the phase week, shown above the boxes): kept on that device, not saved in the plan, and cleared when the next phase starts. Anyone who can open the tab can use the text.
[map] - ⏰ TARGET TIMES BECOME REMINDERS (2026-11-25, Sherry): for an officer with ✏️ on 📅 Events, the times typed in those boxes become ⏱️ Timed admin reminders by themselves a few seconds after the last change — event Sanctuary Battle, label S12 / F2, sent 10 minutes before to everyone whose 🔔 covers Sanctuary Battle; nothing has to be typed again on 📅 Events. The line under the Copy button says they were saved (or that saving failed — then add them by hand on 📅 Events → ⏱️). Changing or clearing a time changes or removes its reminder; reminders typed by hand on 📅 Events are not touched. An officer without ✏️ on Events gets the text but no reminders.
[map] - 🧭 FROM ONE TARGET TO THE NEXT (2026-11-25, Sherry): under that line, once two or more targets have times, each consecutive pair in time order gets a line: the distance and estimated march time from the earlier target to the later one, the same from our HQ, and which is closer ("staying there is closer" / "from home is closer" / "about the same" within 5 km) — to decide, after teleporting next to one Sanctuary, whether to go on from there or teleport home first. On the page only, not in the text for the game.
[map] - 🏛️ NEW SEASON = CLEAN SLATE (2026-11-25, Sherry): the 🎯 Target / ✅ Ours marks on Sanctuaries and Fortresses belong to one Sanctuary Battle season (8 phases = 8 weeks; Season 3 Phase 1 began 2026-09-26, so Season 4 began 2026-11-21). When a new season starts, every Sanctuary and Fortress shows no mark again — on the map, in the 📋 Outpost plan's "Fortresses & Sanctuaries" part and in "🎁 What we'd get" — for NXS and for nxs, each on its own. Officers mark this season's targets again; the first new mark throws the old season's marks away for good. Inside a season nothing changes: a ✅ Ours from an earlier phase still shows as 🎯 Target. Outposts, their timers, the ⭐ priorities and the typed rewards are not touched.
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
ONLY CONFIRMED people are ranked and placed (Sherry, 2026-11-01): ✅ replied yes, or 🟡 safe and not ❌. ⏳ no reply and ❌ can't come stay ticked in ② but get no # rank, no ③ group, no ④ place, and and are left out of anything built from the plan. A ④ table made before that (or someone who changed to ⏳ / ❌ later) shows those people crossed out with ⏳ / ❌ and a ⚠️ line "N people in this table haven't confirmed" with a "Remove them" button. In ② the # column is each ticked starter's place in the ranking; "Sort by ranking" (依排名排序, on by default, next to "Only ticked") lists the ticked people in that order, everyone else after them; tapping a column header sorts by that column instead. Score (Weights mode, shown as its own column) = each stat scaled so the best ticked player = 100, combined by the weights; players with no Mystic Trial value count as 0 (marked ?). "Use only the top N" (只取前幾名): ③ groups and ④ battle table take only the first N; rows past it fade. "📋 Copy list" (複製名單): choose who (the ranking, the top N, only who can be registered ✅ + 🟡, or only who hasn't replied), which columns (place, name, ID, reply, rank, Town Center, power, Mystic Trial, Squad Power, Migrant Score, score, sub — the Squad Power column, in the roster table and in the copy, shows only while the plan's event is Swordland Showdown: it is our own estimate for that event; other tables such as 🔭 Scout and 🧳 Transfer show only what MightPulse gives) and the format: text (one person per line), a table to paste into Google Sheets / Excel (tab-separated), or a lined-up Discord table (code block); preview before copying, choices remembered on the device.
③ Event groups: pick an event (e.g. Swordland Showdown: 4 Attackers, 6 Defenders, everyone else Joiners; 🔱 Tri-Alliance Clash / 三盟爭霸: the alliance's TAC plan (Armada, 2026-10-31 v2) — Teams follow Milk's rank table (2026-11-01, only confirmed people): Team A – Attack #1, 3, 6, 8, 11; Team B – Enemy Territory Hold #2, 4, 7, 9, 12, 14; Team C – Home Defence #5, 10, 13, 15, 16; Team D – Support = everyone else (her table had #6 in both A and C; A is used). Two layouts, picked next to the 🔱 TAC plan draft button (saved with the plan): Layout 1 (Legion 1, more advanced, with its own route map): A attacks the alliance to the right over Bridge 27: 28 → 30 → 29 → 26 → 23 and occupies their hubs; B goes over Bridge 18: 19 → 13 → 9 → 21 and HOLDS; C splits its strongest players over 19, 28, 30, 31 and guards all internal Transit hubs (19, 28, 30, 31, 27, 18); D supports C on 31, 27; Stage 2: A captures the central buildings, B takes the enemy Garrison, C / D home Garrison 24. Layout 2 (Legion 2) = the plan described next. "Copy result" lists each member with their power like "1. HADES: 109,468,236", and ④ the battle table follows the event (see ④); keep a separate 🔄 shared plan such as "Legion 2 – Tri" so its ticks stay apart from Swordland). Group sizes can be changed and are remembered. Groups follow the ranking. "Copy result" copies the groups for chat.
🎯 Event (活動) in the plan card, under the plan picker: pick ⚔️ Swordland Showdown or 🔱 Tri-Alliance Clash once per plan — it is saved with the plan (everyone sees it), ③ groups open on that event by themselves and ④ switches to its table; tapping the other event (here, in ③ or in ④) switches the plan, asking first when its table is filled. ④ Battle table follows the event (2026-10-31): "Table for: ⚔️ Swordland Showdown / 🔱 Tri-Alliance Clash" at its top. A new empty table waits until an event is picked (here or in ③) and then takes that event's stages, buildings, columns, reminders and draft buttons; a filled table of another event only shows a note with "Switch to … (new empty table)" (asks first; ↩️ Undo brings the old one back). Tables saved before are Swordland tables. 🔱 table: stages "Stage 0 — Preparations 0:00–3:00, Stage 1 — Seize & Conquer 3:00–20:00, Stage 2 — Garrisons open 20:00–40:00, Stage 3 — Temple of Tides 40:00–60:00", columns Team / Task (no leaders in TAC — Lead and Back-up hidden), the suggested-role list shows Teams A–D, and "🔱 TAC plan draft (all 4 stages)" fills it from the alliance's TAC plan v2 with ③'s Teams A–D: one row per team per stage (no leaders); each team's players are listed only once, in the top stage (Stage 0) — the same people play all game, so the stages below show only the task (Sherry, 2026-11-01). Stage 0: A route counter-clockwise 19 → 21 → 24 → 29, B counter-clockwise, R4s set map labels; C clockwise 19, 28, 30; D internal hubs & buildings 31, 27. Stage 1: A 19 → 21, push towards the counter-clockwise alliance (their Garrison is closer), back at 21 before the Garrison stage; B follows A, secures captures, extra marches on weaker enemy buildings, prevents recaptures; C captures 19, 28, 30, secures Transit Hubs 19, 28, 30, 31, 27, 18, blocks river crossings, crosses over at 19, 28, 30 if no threats; D captures 31, 27 and the remaining internal buildings. Stage 2: A captures enemy Garrison 24, hands it to B, pushes toward 29; B takes over the enemy Garrison and key hubs; C captures and defends home Garrison 24 and the boundary hubs; D reinforces home Garrison 24, supports C. Stage 3 Temple of Tides: D ① enters first, B ② second, A ③ last (A's members weakest first, the strongest last); C stays behind to defend our territory and Garrison 24. Everything stays editable like the Swordland table (move people, rename, notes, image / text / game chat / Excel). Then: set stages, targets and columns (comma-separated). "Fill a first draft from the ranking" uses the Attackers/Defenders numbers from ③. Tap a name, then tap a box (drag on a computer); × removes. "+ text" adds free text (e.g. "Stays behind"). "Short names" drops decorations. Output: 🖼️ Make image (phone: press and hold the picture to save), 📋 Copy text, or 📢 Use in a new announcement. The table is saved on this device only.
💾 Save now (立即儲存, plan card next to the plan picker; Sherry 2026-11-01): writes exactly what is on the screen (ticks, subs, ✅ replies, weights, group sizes and the whole ④ battle table) to the shared plan, over what was saved. Changes also save by themselves (⏳ Saving… → ✅ Saved); use it to be sure. Only officers who may edit the plan see it.
🔗 Keep together (排在一起, in ④ under the draft buttons; Sherry 2026-11-01): make lists of people who should be in the same group. When a draft is made (⚔️ Swordland rules draft, 🔱 TAC plan draft) and in ③ 🔱 teams, everyone in a list goes to the group of the best-ranked one among them (Swordland: same building in each phase; 🔱: same team), swapping with the person of the closest rank there in the same role, so group sizes stay the same. Rally leaders (⚔️ Attackers) keep their own building. Subs and unticked people are ignored. Saved with the plan.

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
[post] - 📢 Post → 🔒 LINK ONLY (機密, 2026-11-19, Sherry): a tick box above the preview, for things that must not be on the site (a battle strategy). Write it as usual, tick "🔒 Link only (confidential)", press Publish. It is NOT put on the site or in the public files: it is kept on our server, translated into all 12 languages (same game-term list; the page shows "Translating… n / 12" — keep it open; about a minute), and the link is copied. It opens only through that link (…/#s/…); the reader sees it on the home page's announcement board like any other announcement, in their own language, and can switch language. The card "🔒 Link-only announcements" at the bottom of the Post tab lists them: 🔗 Copy link, 🌐 Finish translating (when some languages are missing), Delete. Deleting makes the link stop working at once; "Auto-delete" works too. Limits: no pictures, tables or videos (those are public files); cannot be scheduled or edited yet (delete and post again — the link changes); at most 40. It keeps honest people out, nothing more: anyone holding the link can read it and pass it on, no login is asked. Only officers who may post announcements see the list and the links.
[post] - 📢 Post tab → "Auto-delete" (中文: 自動刪除) under the guide button: Never / when today ends (00:00 UTC) / when tomorrow ends / after 1, 2, 3 or 7 days / pick a date & time (UTC). The announcement disappears from the site on time by itself (the files are cleaned up within the hour). The list shows "🗑️ auto-delete …". To change or remove the time: Edit → Edit the whole announcement → change Auto-delete → Save (it is not translated again).
- Changes are saved on the site for all officers (other officers see them after refreshing, about 1 minute). Saving uses the same GitHub key as the Post tab; "Someone else changed the events meanwhile" → refresh and try again. The event texts are encrypted like the other officer data.
- Changing the dates of KvK, Viking Vengeance, Swordland Showdown, Tri-Alliance Clash, Eternity's Reach, All Out, Fishing Tournament, Hero Roulette or Cesares Fury also changes when the main site shows those events (with a link to their guide) in 📅 This week and the 📆 calendar on the 🏠 Home page.
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
[post] - 📢 Post → ⏰ "Publish at" (發布時間, under Auto-delete; Sherry 2026-11-16): leave it empty = publish now. Pick a date + time (the officer's own local time) and the button becomes "⏰ Scheduled": the announcement is NOT published — it waits in an encrypted file (not on the site, not readable in the public files) and a job that runs every 10 minutes publishes it once its time has come, so it shows on the site about 10–20 minutes after the chosen time (translation + site update), then it is a normal announcement (date = the scheduled time). The card "⏰ Scheduled" (排程中) lists the waiting ones with their time: Edit (opens it in the Write form; change the text or the time and save; clear the time to publish it right away), 🚀 Publish now, Cancel (deletes it). A publish time in the past, or an auto-delete time before the publish time, is refused. An announcement that is already published can't be scheduled. Pictures are uploaded when it is scheduled. Needs the officer data key (encryption on).
[post] - 📢 Post → order of the announcements (Sherry 2026-11-16): in "📋 Announcements on the site" every row has ▲ / ▼ — they move that announcement one place up or down, and the site (tabs on the home page) follows the same order a minute or two later. Nothing is translated again. A new announcement still appears on top; move it down afterwards if wanted.
[post] - 📢 Post → writing: a Word-like toolbar above the message (select text first): B / I / U / S, highlighter, 🎨 colour, Aa font (Latin letters only; other scripts keep the normal font), H1 / H2 headings, • ≡ bullet list with a chosen symbol, 1.≡ numbered list, ⇤ ⇥ (or Tab / Shift+Tab) to indent list lines, ❝ quote box, ― line. Pasting from ChatGPT, Word or Google Docs keeps the formatting. "🐦 Example" fills the form with a demo of every button (↩️ brings your text back; the example can't be published). The formatting is kept in every language.
[post] - 📢 Post → "Look" (樣式): Plain, 📜 Scroll, or a theme (⚔️ Swordland Showdown, ⛵ Viking Vengeance) that adds the event picture on top; the banner colour can be picked next to it (never red). The scroll grows with the text. Changing the look later with Edit doesn't translate again.
[events] - 📅 Events → "📣 Announcement draft" (公告草稿): "UPCOMING KEY EVENTS" with our times for the next 3/5/7 days, ready to paste in game (300-character limit, counter shown; tick which events go in). Each to-do card also has "📣 Game post" (遊戲公告) for a one-event reminder.
[events] - 📅 Events → ✅ Action items: each event card has one "📋 <title>" button per in-game message of that event (Sherry 2026-11-02) — tap it to copy that message right there, no scrolling down to the event list.
[events] - 📅 Events → ✅ Action items, ⭐ today (Sherry 2026-11-02): a task due today is highlighted with "⭐ TODAY" and its event card moves to the top. A to-do can be linked to one of its event's in-game guides (✏️ Edit event → each to-do's "📋 In-game guide for this task" picker); the guide's 📋 copy button then sits on that task line, so on the day you tap, copy, paste in game. A to-do's ig can also be a LIST of guide titles (Sherry 2026-11-03): the task shows one 📋 copy button per guide, in order, under a single tick box; each copies its own message (never merged — the game limits message length). In ✏️ Edit event, choosing a guide in the last picker adds another picker. NXS-PATCH accepts "ig": "title" or "ig": ["title 1", "title 2"]; 📤 For Claude shows them as [📋 a | b].
[events] - 📅 Events → "📥 Paste back from Claude" (inside the 📤 For Claude card, ONLY Sparrow sees it): paste an NXS-PATCH written by Sherry's planning chat — { "events": { "<event id>": { "todo": [full new to-do list], "ingame_set": [{title, text}], "ingame_delete": [titles] } } } — press 🔍 Check to list every change (− removed, + added, ✏️ changed guide, ⚠️ a to-do linked to a guide that doesn't exist), then ✅ Save (needs Events edit rights). Only to-dos and in-game guides of existing events can change. A misspelled key (e.g. "todos") or a todo that isn't a list is refused with ⚠️ (it used to be skipped silently). 🐻 Bear Hunt to-dos show only on today's Bear Hunt day (UTC), never for future days — in the to-do list and in 📤 For Claude.
[events] - 📅 Events → in-game guides, 📅 date codes (Sherry 2026-11-03): {date:+N} in a guide's text = the start of that event's nearest run + N days, shown as "Nov 5" (UTC; N may be negative, {date:-1} = the day before). Nearest run = the run going on now, else the next one. The copy buttons (to-do cards, event list), the event list, the announcement draft's guide picker, the Swordland map in the battle table and 📤 For Claude's In-game messages show the filled-in date; the editor, ✏️ inline edit and "Current data" (NXS-PATCH) keep the code. Works for every event with a fixed schedule; text without codes is unchanged.
[events] - 📅 Events → "📤 For Claude" (給 Claude, card under ⏱️ Timed reminders; Sherry 2026-11-02; ONLY Sparrow sees this card — other officers, admins included, don't have it): "📋 Copy for Claude" copies the next 4 weeks of event runs, our times, the to-dos (✅ done / ⬜ open, with due date, exact time and "until" hour) timed reminders, and the full text of those events' in-game messages (once per event, at the end) as plain text, decrypted in the officer's own browser, to paste into a separate Claude chat that plans the to-dos. No member data is included; the officer password never leaves the page.
[events] - 📅 Events → "⏰ Our event times": a time can be tied to a battle day with @, e.g. "22:00@1, 13:00@3" (Viking: Day 1 22:00, Day 3 13:00).
[ranking] - 📊 Ranking → roster list: "X1" / "X2" / "X3" after a name = how many times that player was a no-show on the 📋 Attendance lists (starters only; excused and subs not counted; a list nobody has been ticked on yet is skipped); orange from 2, red from 3. Long names are cut with … so the 🟡 button stays visible.
[ranking] - 📊 Ranking → "🗂️ Recover plans" (找回計畫, admins only, next to 🕘): every shared plan the server has saves for — deleted plans too — with every saved version (time UTC, who saved, how many ticked, replies, battle-table rows); Restore puts that version back as the current plan for everyone (nothing is lost; another version can be restored later). Up to 1000 saves per plan are kept. If a plan's ticked list or table vanished, an admin restores it here. Same window: "📜 Old GitHub saves" (舊的 GitHub 存檔) — until 10/30 plans were saved in a GitHub file (older open pages kept writing there for a while); pick one of its saves, see every plan in it (ticked, replies, table rows) and Import one as a new shared plan (name + ↩).
[ranking] - ⬇️ Export member data (📊 Roster, small button under the page title; ADMINS ONLY; Sherry 2026-11-28): saves one JSON file (nxs-members-<date>.json) to the admin's own device with everything the stats source gives for NXS and nxs members (power, town center, leaderboard scores, heroes with stars and gear). It is for working out rally strength outside the site (fitting those scores against the measured Bear rally leaders). Nothing is uploaded or shown to anyone else; last-login / online fields are left out.
[ranking] - 📊 Ranking → ④ Battle table in every language (Sherry 2026-11-01): 📢 Use in a new announcement (under 🖼️ Make image) carries the picture (English, for Discord) AND the table itself as data ([[table:data/ann/….json]]); the site shows that table in each reader's language — all 12 — with fixed translations written in advance (data/battle-terms.js: official building / event names, every Swordland and TAC draft note, the reminders), never machine-translated. Player names stay as they are; a sentence that isn't in that list (typed or changed by hand) shows as written. Korean uses the Korean members' own wording (공격조 / 수비조 / 지원팀, A조–D조). Each building (🔱: each team) is a card; above it "🙋 Who are you?" — a reader picks their name and every other card hides (🔱: their team in every stage), their name lit up; remembered on that device; "Show everyone" in the menu or the 👀 Show everyone button next to it brings all back. Changing how the table looks also changes announcements already posted (the site draws it when opened).
[ranking] - 📊 Ranking → ④ Battle table: "⚔️ Swordland rules draft" fills Phase 1, Phase 2 and Stay behind from the ranking (subs left out; Phase 2: each joiner team follows its own attacker — Royal Stables team → Hall of Reformation with #1, Bell Tower team → Mercenary Camp with #2, the Sanctum teams stay; fixed 2026-11-01); Phase 1 (2026-11-15): #1 Royal Stables (defenders #5 + #7), #2 Bell Tower (#10 + #8), #3 Sanctum near enemy (#6 + #12 — the stronger team, by attacker, always goes to the enemy side), #4 Sanctum near home (#9 + #11) — the same defenders in Stay behind; one shared Phase 1 note: teleport and solo attack, rally if needed, defenders hold and do NOT move, joiners join every rally / collect loot / gather at the Undercellars, TC below 30 stay in the safe zone, keep all marches busy, if attacked teleport before it lands; Abbey 1–4 (targets 4-1 … 4-4, shown at 4.1 … 4.4 on the announcement map) always copy a Phase 1 team — Abbey 1 = Sanctum near home, 2 = Royal Stables, 3 = Sanctum near enemy, 4 = Bell Tower: change people in Phase 1 and the Abbeys follow (their boxes can't be edited); note: no teleport, attackers & defenders send their second march, joiners teleport for loot; Phase 2: Sword Shrine #1 + #2 attack, #3 + #4 defend, all joiners, double rally as needed; Camp #2 + #4 with the Bell Tower team, Hall #1 + #3 with the Royal Stables team, no teleport, joiners free to teleport. The people list ends with "⏳ Not confirmed / 🔁 subs": never put in by a draft, but can be dragged in by hand when people are short (❌ can't come never listed). The old Version picker (Version 2 = Armada's notes with names), the ✨ draft-by-rank button and 📥 Paste text → table were removed 2026-11-15; Clear table and ↩️ Undo sit right above the table. 📌 Important reminders (Milk 2026-11-01): rally leaders use the 2K gem buffs (attack, lethality, defence, health, deployment); at least 2 players on buildings 1, 2 and 4; if 3 or 7 is hit focus on recapturing (El's feedback), never trade a core building for kills; reinforce immediately, join your assigned pair; garrison leaders don't abandon buildings — appoint a strong garrison captain before leaving; joiners scan the entire map for loot from flipped buildings, send unused weak marches to the Undercellars, keep all marches busy. A table with the old default reminders gets the new ones on the next ⚔️ Swordland draft. The picture (with the plan's name on top) and the Excel file merge the same note on rows next to each other into one cell and make rows tall enough for their text; "🎮 For in-game chat" (複製到遊戲聊天) starts with short roles messages (no emoji — the game doesn't show them; "A = Attacker, D = Defenders"; as few messages as fit — the game refuses a message over 512 characters, so each is kept to 500 and a phase split over two repeats its header with (cont.); e.g. "① Stables: A Nia. D ΔRMΔDΔ, BOO | joiners", PHASE 2 (15m) …, then "STAY BEHIND: All P1 defenders stay! …"; buildings keep their own numbers: ① Stables, ② Bell, ③ Enemy / Home Sanctum, ⑦ Shrine, ⑤ Merc, ⑥ Hall (Milk 2026-11-01: say Merc, not Camp), ❗All P1 defenders stay! 2nd march abbey), then the longer per-building messages; ↩️ Undo next to the plan picker; 🕘 Version history (版本紀錄): the last 1000 saves of each plan — pick one to put the plan back (↩️ Undo cancels); "📱 Battle table last edited on this device" brings back a table that was made on that phone/computer but never reached the shared plan. 🔢 2026-11-18: under every box in "copy for game chat" the page now shows its length as "N / 512"; a message over 512 is marked in orange with "⚠️ over the game's 512 characters — shorten it or split it" (only the roles summary is split by itself; a building's message, the Stay-behind list, the reminders and the map text are as long as their text).
[map] - 🗺️ Map → 📋 Outpost plan → Sanctuary Battle part: "🎁 What we'd get" (拿到的話可以得到) lists which reward each target gives — for the phase picked on the 🎁 Fortress & Sanctuary rewards card (this week's by default). The ⭐ Priority list also shows each one's reward when no reward was typed.
[map] - 🗺️ Map → 🎁 Fortress & Sanctuary rewards → "🏛️ Sanctuary split proposal" (遺跡分配提案, 2026-11-22): a link to sanctuary-split.html, a page meant to be sent to the other NAP alliances (English / 中文; opened by link only, not in the site menu, no member data). It is a phase-by-phase route (redone 2026-11-23), because of how the game works: a Sanctuary an alliance held in the previous phase is signed up again automatically, and each phase it can sign up for ONE more — so a group changes at most one Sanctuary per phase, and a Sanctuary is worth taking when it stays useful several phases in a row (Sanctuary 12 is useful in phases 1–6). Each group keeps two, two are free for all each phase; Fortresses stay as they are (NXS 2, RED 3, NRD 4, ESA 1). For each group the page counts how many of its 16 rewards in the season are "useful" — by default 1h General Speedups, the three 12h buffs and Advanced Teleporters; shards, Hero XP, epic shard chests and skill books are not ticked — how many new sign-ups it needs, and the phases with nothing useful. A new season starts empty — nothing is signed up automatically in phase 1 — so every group has one Sanctuary in phase 1 and two from phase 2 on (15 rewards in the season). Three views: "Buffs to the top 3" (the main one, the rule proposed in the NAP chat 2026-11-23: every 12-hour combat buff goes to NXS, RED or NRD, which follow the buffs with their one new sign-up per phase and also take most other useful rewards — NXS and RED share the best equally, as the NAP asked on 2026-11-24: the Damage and Deployment buffs are split between the two (RED 4 Damage + 2 Deployment, NXS 3 Damage + 4 Deployment — RED gets the extra Damage and gives one Deployment for it), RED also takes the Health buff of phase 4 so both end on 7 buffs, NRD gets the other 6 Health buffs (an alliance can add only one Sanctuary per phase and the buffs move every phase, so nobody can take more than one buff in a phase); all three have 15/15 useful rewards (the rest of theirs are 1h speedups and Advanced Teleporters); ESA 3/15 and IDN 4/15 useful, no buffs; phase 1: NXS takes Sanctuary 12 (Deployment), RED 8 (Damage), NRD 4 (Health). Distance only breaks ties — rewards come first: from each group's Plains HQ a group rallies from home when its Sanctuaries are within 350 km; otherwise ✈ marks the Sanctuary its free Sanctuary Teleport goes to, and the other one is reached from there or from home; the table has a "Phases from home" column; NXS keeps Sanctuary 12 as its anchor in phases 1–6), "Even split" (softer: NXS 14/15, RED 12, NRD 11, ESA 9, IDN 7; ESA and IDN keep some buffs) and "Same as now" (every group takes back the Sanctuaries it holds today). The summary table has a Buffs column (of the season's 20). A table shows who holds which Sanctuary in every phase (★ = newly signed up) with the game's reward icons and amounts, a small table "Where the 12-hour buffs are" shows which Sanctuary gives the Health, Damage and Deployment buff in each phase and who holds it (the buffs move to the next Sanctuary every phase: Health 4 → 1 → 2 → 3 → none → 1 → 2 → 3; Damage 8 → 5 → 6 → 9 → none → 5 → 6 → 7; Deployment 12 → 9 → 10 → none → none → 9 → 10 → 11), and a list says who signs up for a new one in each phase. The ticks for what counts as useful can be changed and the numbers follow.
[map] - 🗺️ Map → 🎁 Fortress & Sanctuary rewards → "✏️ Update rewards" (更新獎勵, officers with ✏️ Map rights): the special reward of each Fortress / Sanctuary can rotate every round, so pick each one's reward and amount from the in-game Battle Rewards screen ("✍️ Other" adds a reward by name). Every phase (1–8) of a season has its own rewards: a "Phase" picker on the card shows any phase (this week's by default, worked out from the date: one phase a week, changing Saturday 00:00 UTC; Season 3 Phase 5 = 2026-10-24 to 10-31). A phase nobody has saved shows the Kingshot Wiki table as the default (it matched the game for phases 3 and 5); ✏️ Update rewards saves the in-game list for that phase, which then wins. The card says where the list comes from: ✅ checked against the game (who · date) or 📖 Wiki default, not checked yet.
[plan] - 🚩 Territory → 🧼 TERRITORY ONLY (2026-11-24, Sherry: thick frames and text made it hard to judge the territory): a chip "🧼 Territory only" (只看領地) in the row of layer chips above the map. On: everything else is hidden (Outposts, HQ markers, names, cities, resource nodes, frames) and every tile is one flat colour for who holds it NOW, layers included — blue NXS, green nxs, grey the farm nXs or another alliance, dark background = nobody. Standing banners are a small darker tile, HQs a darker 3×3, planned banners a hairline dashed square (they do not colour land until built), Bear Traps a thin brown square, the banner picked for its layer a thin yellow ring. Tapping a banner and the 🗂️ layer list still work, and the colours follow at once. Tap the chip again for the full map; leaving 🚩 Territory turns it off.
[plan] - 🚩 Territory → 🗂️ LAYER LIST (2026-11-24, Sherry: too many things on the map to tap the right banner): a folded card "🗂️ Layers — everything that overlaps the other alliance" (圖層清單) under the cards, for NXS and nxs alike. One row for every banner or HQ (standing or planned) of NXS and nxs whose territory overlaps the other alliance's, sorted by Y then X, with the three layer buttons ⬆ On top (built first) / Normal / ⬇ Underneath (built later) — the same setting as the layer buttons shown when a banner is tapped on the map. Under each row: how many of the shared tiles each alliance holds with the layers as set now, so the effect of a change shows at once. Save the plan as usual afterwards.
[plan] - 🚩 TERRITORY PAGE (2026-11-14, 領地規劃; Sherry: the map had too many functions mixed together): everything about banners moved from 🗺️ Map to its own tab 🚩 Territory (officer-x7k2p9.html#plan) — the 🚩 banner planner, 📌 banners to take down, the banner check and big reshuffle, the resource node layers and tables, the 🏫 Academy and the per-banner layers. It shows the same map picture. The 🗺️ Map page is for looking only: Ruins, Outposts, alliance buildings, the Outpost plan, and the banners standing now; it does NOT show planned banners, to-take-down marks, the Academy or resource nodes — unless the switch "📡 Show this plan on the 🗺️ Map page" at the top of 🚩 Territory is on (saved with the plan; then they show on the Map as look-only). Both pages read the same saved plan. PAGE LAYOUT (reordered 2026-11-14, top to bottom): one tool row "Tapping the map places:" (a single choice: nothing / 🚩 NXS banner to build / an Academy item / another alliance's banner or HQ, plus typed X Y ➕ Add and the switches ⛰️ Obstacles, existing banners, 🏴 other alliances) → the map → the selected item right under the map (NXS banner box or Academy item box) → 🌾 Resource nodes card (NXS now, plan effect, and the Academy's table together) → 🚩 banner list (planned, to take down, downloads) → 🏫 Academy card (name, what can't be built, Bear Trap check) → banner check / reshuffle → Academy roster → the 📡 publish switch at the bottom. WHO (2026-11-14, later the same day): the page labels the two alliances by their tags only — "NXS" (the main alliance) and "nxs" (the Academy); it does not print 主盟 / 學院 / Academy. The first row of the tool card is "Planning / looking at: [NXS] [nxs] [🏴 Other alliances]"; the second row "What to place:" lists only that alliance's things (NXS: banner to build; nxs: [Plains] / [Badland] HQ, standing banner, banner to build, Bear Trap now / planned, city spot; other alliances: their banners / HQs, for corrections). The 🌾 Resource nodes card and the cards below follow the choice: NXS → its nodes now + what its plan changes, the 🚩 banner list and the banner check; nxs → the same two resource tables for nxs, the nxs card and the nxs roster. Tapping a banner of the other alliance on the map switches the choice to it. SAME TOOLS FOR nxs (2026-11-14): with nxs picked, (1) SWITCHING A NODE OFF works for nxs too — turn on a resource layer and tap one of nxs's nodes (white frame), or tap it in the "switched off" list of the resource card; it stops counting for nxs everywhere (its own list, saved with the plan, separate from NXS's); (2) the BANNER CHECK and BIG RESHUFFLE card shows "· nxs" in its title and runs on nxs's own HQs, standing and planned banners, city spots and Bear Traps, with NXS's banners and HQs treated as another alliance's land; "📌 mark all to take down" and "➕ add to the plan" then write to nxs's lists, not NXS's. Switching NXS ↔ nxs clears the last result. OVERLAP COLOURS (2026-11-14): tiles covered by both alliances are painted on top of the banners by who keeps them — green = nxs keeps it (e.g. an nxs HQ set ⬆ On top shows green over the NXS banners that cross it), blue = NXS keeps it.  Where one alliance's land covers the other's, the covered part is not shown (the overlapped tiles are painted solid in the keeper's colour) — except that the middle of every item of the alliance currently picked (banner tile, HQ, Bear Trap, city) is always drawn on top, so it can still be seen and tapped. nxs's labels are always on the top layer. Whatever is selected — an NXS banner, an nxs item or a member's city — gets the same pulsing yellow ring on the map. A tap selects the thing whose middle (banner tile or building) is NEAREST to the finger, whichever alliance it belongs to — within about a fingertip (2–5 tiles depending on zoom), not anywhere in its territory square; only at exactly the same distance does the alliance being planned win. Zooming in makes it easier to hit the right one. MEMBERS ON THE TERRITORY MAP (2026-11-14): the switch "🏠 Members & Bear Traps" in the tool row (on by default) draws on the 🚩 Territory map: NXS members' cities now (white squares) and NXS's Bear Traps now (brown), the 🐝 Hive move plan if there is one (dashed yellow = planned city spots, dashed brown = planned Bear Traps, dashed blue = planned HQ), and nxs's members from its roster (light green). Tapping one shows whose it is and its coordinates under the map. They are for reference only — moving them is done on 🐝 Hive / 🗺️ Map, not here. MOVING A SELECTED ITEM: change the X or Y number in the box under the map and the item moves on the map at once (for nxs items too — no need to press "Fix"; Enter also works). NO ALLIANCE-WIDE BUILD ORDER: the old card "Overlap — first built keeps the tile" with two selects was removed (Sherry: bad logic); overlap is decided banner by banner with ⬆ On top / Normal / ⬇ Underneath on NXS banners and Academy items, and on the same layer NXS keeps the tile. Ignore older lines that mention choosing whose land came first. 🚩 Territory also draws the ground each building takes (2026-11-14): the building itself as a dark square (Outpost 3×3 tiles, Fortress / Sanctuary 6×6, from its X, Y) and, dashed orange around it, the square where no banner can stand (Outpost 15×15, Fortress / Sanctuary 60×60, plus the ring around the King's Castle, X and Y 586–613). On 🚩 Territory, tapping an Outpost, Sanctuary or Fortress only shows what it is (name, level, buff, coordinates, 📋 copy); its status buttons (🎯 Target / ✅ / ⚔️), timer, contest list, priority and rewards are on 🗺️ Map only. 🚩 Territory has its own row in 👥 (nobody by default except admins); wherever older lines say "🗺️ Map → 🚩 banner planner", that card is now on 🚩 Territory.
[plan] - 🚩 Territory → 🏫 ACADEMY ROSTER (2026-11-14, 學院名單（參考）, folded card at the bottom): the Academy's members (alliance "nxs", kingdom 2189) with rank, Power, TC and city coordinates, fetched once a day with the roster update; reference only, never mixed with the NXS roster, ranking or Hive tools. Sort by name / Power / TC; "📍 Show their cities on the map" draws their cities in light green; tapping a coordinate jumps there. If the card says there is no roster yet, the daily update has not run since this was added.
[plan] - 🚩 Territory → 🚩 banner plan → "⬇️ Download banner coordinates (CSV)": every banner the map shows now (the banner file plus officers' saved edits: built / demolished / moved) and the 🚩 planned ones, as a Kingshot Mapper CSV (type,X,Y,label,#color,seq) that can be imported there. Label NXS = checked in game, NXS? = estimated from the territory picture, plan = planned, not built yet. Use it to count banners or check for missing ones. "⬇️ Download other alliances' banners (CSV)" does the same for the 🏴 other-alliance layer (label = their tag, their HQs included).
[move] - 🚚 Move → "👥 Member positions" (成員位置, at the top of the 🚚 Move page; it used to be on 🗺️ Map): ONE map for the whole move — our block drawn like the in-game map (every member's city, Bear Traps, HQ, banners, mountains/lakes from the map). Search a name or tap a city for X:Y and a copy button. The map opens centred on our Alliance HQ now; "📍 Our HQ now" (我們的總部) and "🧭 New HQ" (新總部, with a moving plan) jump there. Cities far from both our HQ and the plan (more than 60 tiles away, e.g. a member who moved elsewhere) are not drawn; they are listed above the map as "Far from our HQ" with their X:Y. Editors: tap a city to change name / X / Y, or "📋 Paste positions" (one per line: name X Y; the box opens with the current list — fix it and press "Replace all"), then 💾 Save. Names are kept exactly as typed; blue = found on the roster, orange = not found. With a moving plan loaded, the plan is drawn on the same map as a blueprint: dashed squares = planned city spots (name shown; green once that member is there), numbered banners = road (R1…), early hive banners (P1…), stage 1 (S1-…, BT2 side) and stage 2 (S2-…, BT1 side) — solid with a green rim once our banner stands there; dashed HQ + its 15×15 and dashed Bear Traps = their new place; other alliances' territory shaded; ✖ = another alliance's banner we must take down (green ✓ once ticked). A legend sits under the map.
[plan] - 🚩 Territory → TERRITORY PICTURE RETIRED, OTHER ALLIANCES HIDDEN (2026-11-14): the old stitched territory picture (🛰️ layer) is gone, and so is the "N tiles are someone else's" check that read it — it was out of date. Territory now comes only from what is on the map: NXS's HQs and banners, the Academy's, and — only while the 🏴 other alliances layer is switched on (off by default, their banners are not kept up to date) — other alliances' banners. While that layer is off, other alliances are ignored by every count and check; a resource node that is really theirs is switched off by hand (tap the node with its resource layer on). Mountains, lakes and the no-build zones around buildings are still checked.
[map] - 🔗 CAN TAKE and 🎯 TARGET (2026-11-21, Sherry; the same for NXS and nxs): an Outpost has one of these marks. 🔗 Can take (可佔領, solid light-blue ring) is worked out by the page and never saved: the alliance's own standing banners or HQs touch the Outpost. 🎯 Target (目標, dashed yellow ring) is set by hand and means "we are building banners toward it, not there yet". When the banners get there a 🎯 Target shows as 🔗 Can take by itself (the 🎯 button stays lit; nothing saved is rewritten, and if the banner goes away it is a target again). ✅ Ours and ⚔️ Vulnerable set by hand always win over both. 📋 Outpost plan lists "🔗 Can take" above "🎯 Targets", and the "after" column of the buff table counts ours + can take + targets. Clear on a 🔗 Outpost leaves it 🔗 while a banner still touches it.
[plan] - 🎯 TARGETS ON 🚩 TERRITORY (2026-11-21): the card "🎯 Targets to build toward" (above the nxs card) lists the Outposts marked 🎯 by hand that the alliance being planned does not touch yet, each with what the route planner says: "N more banners", "planned banners reach it" (the banners to build already get there), "no route" or "no territory yet". Tap one → the Outpost is selected on the map and its banner route is worked out (purple, in build order), ready for ➕ Add to the plan. An Outpost's box on 🚩 Territory also has "🎯 Set as target" / "🎯 Remove target" next to the 🧭 route button (needs Territory edit rights). The target marks are shared with 🗺️ Map: set on one page, seen on the other; save with 💾.
[plan] - 🌾 nXs IS OUR FARM, nxs IS THE SECOND ALLIANCE (Sherry). THE TWO TAGS WERE SWAPPED IN THE GAME ON 2026-11-23: from 2026-11-21 to 2026-11-23 the second alliance was called nXs and the farm nxs; now the second alliance is "nxs" (all lower case) and the farm is "nXs" (capital X). Older announcements, notes and chat messages may still use the names the other way round — go by what the alliance IS (second alliance / farm), not by the spelling in an old text. The second alliance of NXS is "nxs" — everything on the officer page that says nxs (the 🏰 NXS | nxs switch, 📊 Roster, 📋 Attendance, 🐝 Hive, 🕵️ Watchlist, 🐻 Bear plan cards, 🗺️ Map ownership, the daily roster fetch) is about nxs, and nxs started empty on 2026-11-21: it is a different alliance from the farm, not a rename of it. What was PLANNED for nXs is reused for nxs (Sherry 2026-11-22): on 🚩 Territory the banners to build, Bear Traps, planned Bear Traps and city spots of the old nXs set were copied to nxs once, and the 🐝 Hive move plan of nxs starts as a copy of the one nXs had; the standing HQs and banners of nXs stay the farm's, so a copied banner that hung off nXs land shows as not connected until the HQ / banners of nxs are entered there. The old nXs is now our farm. On 🚩 Territory a card "🌾 nXs (our farm)" sits under the nxs card: nXs's banners and HQs saved before the change stay on the map (olive, dashed outline) and keep their tiles, so NXS's and nxs's banner plans treat those tiles as taken and an Outpost they touch lists nXs as a contester; nothing is planned for nXs (no banners to build, no check, no resource table). The card also lists "Outposts nXs is connected to" (every Outpost its banners or HQs touch; tap one to jump to it; 🔵 = NXS is connected to it too, 🟢 = nxs too) — kept on purpose (Sherry 2026-11-21): the farm occupies an Outpost first and the main alliance takes it over right away, which makes the vulnerable time much shorter. The nxs card has the same list for nxs, "Outposts nxs is connected to" (🔵 NXS too, 🌾 nXs too, ⏳ with a dashed button = only after the planned banners of nxs are built). On 🗺️ Map, the standing HQs, banners and Bear Traps of nxs and of nXs are always drawn, also when "show this plan on the Map" is off (that switch only hides planned things: banners to build, banners to take down, planned Bear Traps). An editor can tap one of its banners or HQs to select it and press 🗑 Remove, or add a banner / [Plains] HQ / [Badland] HQ by typing X and Y and pressing ➕ Add. nXs's old roster, member history, move plan, plans, attendance lists and Bear Trap marks are kept in storage but no longer shown.
[plan] - 🚩 Territory → 🏫 ACADEMY (2026-11-14, 學院 — NXS's second alliance, the Academy, named "nxs"; say "Academy" / 學院, never "farm" or "branch"; card between the 🚩 banner planner and the 🌾 banner check): NXS's second alliance (the Academy) on the same map, drawn in green. Editors give it a name and choose what a tap on the map places: 🏯 Plains HQ or 🏯 Badland HQ (the Academy has both kinds, like NXS; 15×15 territory each), 🏳️ a standing banner (7×7), 🚩 a banner to build, 🐻 a Bear Trap as it stands now, 🐻 a planned Bear Trap position, or 🏠 a member's city spot (2×2). Instead of tapping, the coordinates can be typed (X, Y, ➕ Add) — type the coordinate the game shows for that building (for the 3×3 HQ and Bear Trap and the 2×2 city that is the corner tile the game names; a tap on the map uses the tapped tile as the middle of a 3×3). Tapping an existing Academy item selects it: its X / Y can be corrected (Fix); Remove; for a standing banner "📌 To take down"; for a planned banner "✅ Built"; for a planned Bear Trap "✅ Moved here". The card shows the counts, says for every Bear Trap whether its 3×3 lies inside the Academy's territory (planned traps are checked against the territory after the Academy's plan — an alliance building has to stand on its own alliance's land), and a table of the Academy's resource nodes now / after its plan / change / per hour. The Academy's land never counts as NXS land (NXS resource counts, the banner check and the reshuffle treat it like another alliance), and NXS land never counts for the Academy. Used e.g. to plan moving one of the Academy's Bear Traps next to the main hive: lay the Academy banners needed to reach the spot, then place the planned trap and check it reads "inside the Academy's territory". Saved inside the encrypted plan (💾), so every officer sees it. LAYER PER ITEM (2026-11-14): the two selects in the Academy card are only the default. Each Academy [Plains]/[Wilderness] HQ, standing banner and planned banner can be set on its own in its selected-item box: "⬆ On top (built first)" = it keeps the tiles it shares with NXS, "⬇ Underneath (built later)" = NXS keeps them, "Default" = follows the card. Items with their own layer show a small ⬆ / ⬇ on the map. Standing things always come before planned banners. NXS banners (standing and 🚩 planned) have the same three buttons in their own info box once the Academy has anything on the map, so both sides sit on the same scale: ⬆ beats Default beats ⬇; when both are on the same layer the card's default decides. CAN'T BUILD THERE (2026-11-14): nothing can stand on a mountain, a lake or a resource node. A 🚩 planned NXS banner on such a tile shows "❌ Banner tile is a mountain / a lake / a resource node" in its row; an Academy item (banner 1 tile, city 2×2, HQ and Bear Trap 3×3) that touches one is drawn red with a ✕, named in the selected-item box, and listed under "❌ Can't be built where they are (n)" (tap a chip to jump to it).  OVERLAP = FIRST COME, FIRST SERVED (game rule, Sherry 2026-11-14): a banner may not stand inside another alliance's territory, but its 7×7 may overlap it at the edge; the banner built first keeps its whole square and a later one only gets the tiles still free. The map hands out tiles in that order: land standing now first ("Land standing now that overlaps belongs to" NXS / the Academy), then the planned banners ("Planned banners are built first by" NXS / the Academy), each plan in its own list order. Every count follows it — NXS's and the Academy's resource nodes now / after, the Bear Trap check, the 🚩 planner's "+N tiles" and "N tiles already belong to the Academy". Tiles both alliances cover after the plans are drawn strong blue (NXS gets them) or strong green (the Academy gets them), with the two totals in the card.
[plan] - 🚩 Territory → 🌾 OUR RESOURCE NODES NOW + SWITCHING A NODE OFF (2026-11-14): the 🚩 banner planner card always shows a small table "Our resource nodes now" — per kind (🍞 Bread, 🪵 Wood, 🪨 Stone, ⛏️ Iron) and in total: how many nodes we hold and what they give per hour (3,600 each), to compare with the Alliance Warehouse in game (its "+…/h" under each resource). A node counts when ≥ 3 of its 4 tiles are in our territory and not in another alliance's. Because our picture of other alliances' territory is incomplete, a node can be counted that is really theirs: turn on that kind's resource layer, then tap the node on the map (editors) — it is drawn faded with a red ✕ and from then on counts nowhere (this table, the plan effect table, the 🌾 banner check, the big reshuffle); tap again, or tap its chip under "Switched off (n)", to switch it back on. With a resource layer on, our own nodes have a white outline, others a dark one, and a tap on one of our nodes toggles the node instead of selecting the banner under it. Saved with the plan (💾), same for every officer.
[plan] - 🚩 Territory → 🌾 PLAN EFFECT ON RESOURCE NODES (2026-11-13): in the 🚩 banner planner card, as soon as there is at least one 🚩 planned banner or one 📌 banner noted to come down, a small table shows what the plan does to our alliance resource nodes — per kind (🍞 Bread, 🪵 Wood, 🪨 Stone, ⛏️ Iron) and in total: Now, After, Change, and the change per hour (each node gives 3,600 per hour). Now = our HQs + every standing banner; After = the same without the 📌 banners and with the 🚩 planned ones. A node counts when ≥ 3 of its 4 tiles are our territory; tiles inside another alliance's territory never count. Under the table (Sherry 2026-11-13: the question is how well the banners are used, not the short-term cost): the banner count before → after, resource nodes per banner before → after, and one line for the change — "each extra banner brings X nodes", or "k fewer banners, N more nodes". Scale to read it by: resource nodes sit so far apart that one banner on its own holds 1 node at most (only 25 spots in the whole kingdom give 2), so 1 per banner is the ceiling for a lone banner; more than 1 per extra banner means the new banner finishes nodes our territory already half covers — the best kind of spot. Roads to Outposts and banners for city spots hold few or none, which is why the alliance as a whole sits near 0.5 per banner. It updates with every edit, before saving. It does not check that a planned banner is linked — the planner's own warnings do that.
[plan] - 🚩 Territory → 📌 BANNERS TO TAKE DOWN (2026-11-13, 想拆): a note for banners that will come down later. Tap one of our standing banners on the map → "📌 To take down" (again = "↩️ Keep it"). It is drawn with a red dashed frame and a ✕, and listed in the 🚩 banner planner card as "📌 Banners to take down (n)" (tap a coordinate to jump to it). The banner check and the big reshuffle count those banners as already gone, and both have "📌 Note all of these to take down" under their own lists of banners that aren't needed / come down. When the banner is really demolished in game, press 🗑️ Demolished — it leaves the list by itself. Saved with the plan (💾), so every officer sees the same notes; map editors only.
[plan] - 🚩 Territory → 🌾 RESOURCE NODE LAYERS (2026-11-13): under the layer chips there is a "Resource nodes" row with four switches — 🍞 Bread (yellow), 🪵 Wood (green), 🪨 Stone (light grey), ⛏️ Iron (brown). Each shows that kind's nodes on the whole map as small 2×2 squares (off by default, any mix can be on); zoom in to see them against the banners. Data: the kingdom's 6,497 nodes (kind and position only, no level). Where the kinds are: centre of the map = mostly stone and iron; 150–300 tiles from the centre = all four equal; beyond 300 = mostly bread and wood, almost no iron.
[plan] - 🚩 Territory → 🔄 BIG RESHUFFLE (2026-11-13, 大洗牌; second button on the banner-check card): a from-scratch plan with the banners we have. It keeps only the banners that hold members' city spots, Bear Traps, any Outpost we touch, Fortress / Sanctuary chains and the links between them (the "skeleton"), frees every banner that only holds resource nodes, and lays those out again greedily: most resource nodes per banner, kinds weighted by the 33 : 33 : 22 : 12 use (and "Most wanted now"), close to home first, inside the "Farthest from home" limit; a spot where a banner already stands gets a bonus so it isn't demolished and rebuilt next door. It shows: now vs reshuffled (banners, nodes, kinds with %), three markers — the same number of nodes as now with fewer banners, the result with today's number of banners, the whole list — the banners that come down, and the build list best first (✓ = stays where it stands; framed row = today's number of banners). "Extra banners to try" adds that many on top. ✕ on a row leaves that node out (another alliance has it / that road is not possible) and runs again; editors can send the new banners up to a chosen total to the 🚩 planner. Red frames = come down, orange numbers = new. It is a plan for the officers to adjust by hand, not an instruction; positions partly estimated, check in game.
[plan] - 🚩 Territory → 🌾 BANNER CHECK FOR THE KINGDOM NOW (2026-11-12, 旗幟檢查 — 現在的王國; card under the 🚩 banner planner): same check as the Hive one but on the whole map and for today's state, not the moving plan — our HQs (15×15) + every banner standing on the map (7×7 each, linked to an HQ), members' cities and Bear Traps where they are now, Outposts we touch all kept. 🔍 Check banners lists standing banners that aren't needed (taking them down loses no city tile, Bear Trap, resource node, Outpost or link — take down in game, then mark 🗑️ demolished) and where extra banners add the most resource nodes (a node counts when ≥ 3 of its 4 tiles are our territory), best first, with options like "5 more banners → N more nodes". On the map: red frame = not needed, orange number = suggested; map editors can add the first k suggestions to the 🚩 banner planner. Under the totals, both checks show what kinds of resource nodes we hold: 🍞 bread · 🪵 wood · 🪨 stone · ⛏️ iron (the node data has the kind only, no level). ⚖️ "Even out the kinds, close to home first" (ticked by default, Sherry 2026-11-13): the ➕ extra banners then go first for the resource kinds we are shortest of compared with how we use them — one Alliance Banner costs bread 33 : wood 33 : stone 22 : iron 12 (Alliance Warehouse refund list, 2026-11-13: 21,780 / 21,780 / 14,520 / 7,920), and every alliance resource node gives the same 3,600 per hour, so the nodes we hold should follow that ratio rather than be equal; the card shows our share of each kind next to it (a node of the kind we lack most counts up to 3×, of the one we have too much of down to 0.35×, updated after every banner) and for spots near home — home is the middle of our members' cities (without city data, the first HQ; a second HQ far from the hive does not count as home). "Farthest from home" (default 80 tiles, 0 = no limit) is a hard limit for new banners, and inside it a spot 60 tiles away counts half. The card also lists the nodes within that distance we still don't hold, by kind — so one can see when the kinds we lack simply aren't nearby — building a banner means sending troops there. Each suggestion shows the kinds it adds and its distance from home; the options list shows the kinds after that many banners. Unticked = simply the most nodes per banner. "MOST WANTED NOW" (both checks, 2026-11-13): a drop-down — by the ratio (default) or one kind 🍞 / 🪵 / 🪨 / ⛏️; nodes of the chosen kind count 4× for the extra banners and the swaps, e.g. 🪵 when the warehouse is short of wood. 🎯 STRICT RATIO (tick box, both checks and the reshuffle, 2026-11-13): a resource kind whose share of our nodes has already reached its part of 33 : 33 : 22 : 12 is no longer a reason for a new banner — only the kinds still below their share are (in practice bread and wood). The list then ends sooner when those kinds run out inside the distance limit; nodes of other kinds that a banner happens to cover still count as ours. It cannot take away what the kept banners already hold. ✕ LEAVE A NODE OUT (editors, both checks, 2026-11-13): when the resource node behind a suggestion is in fact already held by another alliance (our data of other alliances' territory is incomplete), tap ✕ on that row (the ➕ extra banners and the 🔀 small moves both have it) — its nodes are left out and the check runs again; "N nodes left out · Put them back" undoes it. The list is kept on that device only. 🔁 SWAPS (both checks, when ⚖️ is ticked; Sherry 2026-11-13): banners whose only job is holding resource nodes of a kind we have plenty of (measured against the 33 : 33 : 22 : 12 use) — taking one down loses no city spot, Bear Trap, Outpost or link — paired with the extra spot of the same number in the ➕ list: "take down X,Y (gives up 🍞) → build at #k X,Y (gets 🪵)". Same number of banners, kinds closer to what we use; a swap is only listed when the new spot gives at least as many nodes. Up to 10; yellow dashed frames on the map. Findings to weigh, not orders. 🧹 HEAVY OVERLAP (both checks, folded list, 2026-11-13): banners with 30% or more of their tiles also under another banner or an HQ and no resource node that depends on them — typically where a road to an Outpost bends around another alliance's banners. Up to 40, most overlapped first, with the %; grey dashed frames on the map. It only points at stretches worth re-laying by hand (same road with fewer banners, or nodes picked up on the way) — the site does not re-route roads by itself; the officer tries a new layout with 🚩 planned banners + 📌 to take down and reads the plan table (nodes per banner). 🧵 FAR LINES (Map check only, Sherry 2026-11-13): runs of 3+ banners that hang off the rest by one link (or that our list can't link to an HQ), start at least half the "Farthest from home" limit away and end beyond 1.5× that limit (40 / 120 tiles by default), have no suggested extra banner hanging on them, and touch no Outpost at all (an Outpost our territory touches counts as ours whether it is taken yet or not), city spot, Bear Trap or Fortress / Sanctuary zone — e.g. what is left of a road we gave up. Up to 3 are listed, longest first (purple on the map): banners and distance, the resource nodes the line holds now by kind, and what up to 20 of those banners would bring near home instead. It is a comparison for the officers to weigh, not an instruction to demolish. 🔀 SMALL MOVES (both this check and the Hive one): banners that could move up to 6 tiles to complete more resource nodes while losing no city tile, Bear Trap, node, Outpost or link — and every neighbour the banner touches now still touches it after the move — listed From → To with + nodes (blue frames on the map; in the Hive check the plan's banners can be moved with one tap); the ➕ extra banners are worked out as if these moves were done. The 🚩 planned banners are counted as part of the layout too (shown with 🚩 when one of them isn't needed — just remove it in the planner); a banner already built in game should be marked ✅ built in the planner so it becomes a standing banner. Linking rule (Sherry, seen in game 2026-11-12): territories that meet at an edge OR only at a corner are linked — used here, in the Hive check and in the 🚩 banner planner. Every standing banner is treated as linked (it stands in game; our banner list has gaps because part of it is read off the territory picture), so the check never reports "not linked" banners: a banner is "not needed" only if taking it down also leaves every group of banners in one piece; chains that reach a Fortress / Sanctuary zone are kept too. Groups are counted twice — exact contact and "up to 2 tiles apart" — because estimated banner positions are a tile or two off; a banner is only called not needed (or movable) when neither count changes. Results should be checked in game. It needs the member positions, so it only shows after the officer data is unlocked.
[move] - 🐝 Hive → 📥 LAYOUT WITH BOTH ALLIANCES (2026-11-24): a Kingshot Mapper file that holds NXS and nxs together is split by the tag on each item — label "nxs" (exactly, small letters) = the second alliance, "NXS" = the main one; an item with another label (e.g. "Bear Trap 1") goes to the alliance of the nearest tagged city. Since the tags were swapped nxs sits north of NXS, so the old Y 704 line is only used for a file whose banners / HQ / traps carry no tag. Load the same file once on NXS and once on nxs; each side takes only its own cities, banners, HQ and Bear Traps, and names already placed on a spot that still exists stay.
[move] - 🐝 Hive → 🎯 FINE-TUNE THE SPOTS (2026-11-24, Sherry): planned city spots can be changed one by one on the map, without loading a new layout file — for NXS (e.g. the places by BT3, where members sit a tile off) and for nxs (broken territory, only a few places need planning). Tap a planned spot → besides the name box there is "Move this spot to X / Y" + Move, "🗑 Delete this spot", and, when a member sits on it but not exactly, "📍 Move the spot to where <name> sits now". Tap a member's city that sits on no planned spot → "📍 Make this a planned spot" (the spot is made at their X:Y with their name). The "➕ Add / change a spot" row also adds an empty spot when only X Y is typed. Why it matters: only members on a planned spot show on the public "Where's my spot?" page, and 📌 Keep where they are only matches people sitting on a planned spot — so a spot that is a tile off must be moved to be matched. Places nobody needs to be told about simply get no spot. Save afterwards (💾, or it saves by itself).
[move] - 🐝 Hive → REAL TERRITORY (2026-11-24, Sherry): the 🐝 map now shades the land the alliance really holds now (blue for NXS, green for nxs). It is taken from 🚩 Territory: standing HQs and banners, with the "built first / built later" layer each banner was given where NXS and nxs overlap — so the hive plan follows the territory as drawn there. For everything 🐝 works out, "our territory" = tiles really ours now + tiles of plan banners / plan HQ that nobody holds yet; a plan tile that really belongs to the other alliance or someone else does not count. Used by: the 🌾 resource count under the map and each node's ours / not ours mark, the plan picture, and a new line under the map — "⚠️ N planned city spots are not fully on our territory" with their X Y (or ✅ when all are). To change the territory, change it on 🚩 Territory (banners, layers); 🐝 follows.
[move] - 🐝 Hive → 🚚 Alliance move → 🌾 BANNER CHECK (2026-11-12, 旗幟檢查; Sherry: "no wasted banners, all coverage to Outposts, as many resources as possible"): works on the moving plan's new HQ (15×15) + the plan's banners + every banner standing on the 🗺️ Map now (7×7 each, linked to the new HQ; unneeded ones are listed in two groups — in the plan (can be taken out with one tap) and standing now (take down in game, then mark 🗑️ demolished on the Map); the Hive map stretches to show every banner it lists; other alliances' territory never counts as ours). Tap 🔍 Check banners: (1) ✂️ banners the plan doesn't need — taking them out loses no city-spot tile, Bear Trap tile, resource node (a node is ours with ≥ 3 of its 4 tiles), touched Outpost or link; (2) ➕ extra banners, best first — each row one more banner with the nodes it adds and the running totals, plus an Options list ("k more banners → n more nodes"), so officers can choose between the lean plan and "a few more banners for more resources"; when no single banner reaches a node it proposes a linking banner plus one. Warnings: plan banners not linked to the HQ, and Outposts we hold that the plan's territory doesn't touch. The map shows red rings (not needed) and orange numbered squares (suggested). Editors: ✂️ Take them out of the plan / ➕ Add the first k to the plan, then 💾 Save. It never moves city spots, Bear Traps or the HQ, and no banner goes on an Outpost / Fortress / Sanctuary zone, a mountain, a lake, a resource node or another alliance's land. It is a suggestion from our map data (resource nodes and other alliances' banners can be a little off) — check in game before building.
[move] - 🐝 Hive → 👥 Member positions → ✏️ RENAMED (2026-11-12): a member who only changed their name is matched by player ID and the 🕵️ Watchlist name history (and MightPulse Records), so they are no longer listed as "on the roster but not on the map". The ✏️ Renamed line lists old name → new name; "✏️ Use the new names" (map edit right) renames them on the map and in the moving plan (planned spot and ✅ done keep), then saves.
[move] - 🐝 Hive → 👥 map and moving plan (Sherry, 2026-11-05): drag the map with the mouse (on a phone, swipe as usual); after every change (a tap, putting someone on a spot, a ✅) the map stays where it was instead of jumping back to the HQ. 🔍 Zoom: the － / 100% / ＋ buttons above the map (100% = back to normal), Ctrl / ⌘ + mouse wheel, or a two-finger pinch on a phone; the 🖼️ PNG is always full size. 🌾 Resource nodes (bread / stone / iron / wood, 2×2, the whole kingdom map from Kingshot Mapper's built-in data, data/resources-2189.json — so they show wherever the next hive is) are drawn on the 👥 map and in the PNG: solid with a green rim when at least 3 of their 4 tiles (75%) lie inside the moving plan's territory (its HQ 15×15 + banners 7×7) — then the node counts as the alliance's; faded/dashed when not. Tap one for its X:Y and coverage; the line under the map counts ours by type. When the page opens, the map is centred on the NEW HQ of the moving plan (our HQ now if there is no plan); 📍 Our HQ now / 🧭 New HQ jump between the two. 💾 Auto save: 👥 Member positions and the moving plan save by themselves about 8 seconds after the last change (and at once when the page is closed or hidden) — for officers with the edit right and the GitHub key; 💾 Save still saves right away. If two officers edit at the same time, the last save wins, so agree who edits.
[move] - 🚚 Move → putting members on the plan by tapping (成員分配): with a moving plan loaded, officers with the move edit right tap a dashed planned spot on the 👥 map; a box under the map shows the spot X:Y, a name field and the list of members not placed yet — tap a name (or type it, ✓ Put here) and the next empty spot nearby is picked so a row fills quickly; "Empty this spot" takes the name out; a member put on a new spot leaves their old spot empty. Then 💾 Save. (Members can also be named in Mapper before exporting, or one by one with "➕ Add / change a spot".) There is NO automatic placing of members yet (not decided whether it will be manual or automatic): the box under the map says so — "🤖 Placing members automatically isn't set up yet … Want it automatic? Ask Sparrow." If an officer asks for automatic placing, tell them to ask Sparrow.
[move] - 🚚 Move → TAP A CITY ON A PLANNED SPOT (2026-11-11, Sherry): when a member’s city sits on (or overlaps) a planned spot, tapping it shows who was PLANNED on that spot ("🧭 Planned here: …", the person you change) and "Sitting here now: …" with "👤 Edit … position" to open the person sitting there. Officers with the move edit right get the usual put-a-name box for that spot. Everyone can tap dashed spots to see the planned name. 📌 KEEP WHERE THEY ARE (將錯就錯, Nia’s rule, as Sherry set it 2026-11-11): a card above the moving table for editors. THE HIVE LAYOUT NEVER CHANGES — same city spots, same X:Y, same number; only NAMES move. EVERY member of ours whose castle now sits on one of the hive's city spots (overlaps a planned spot) gets the spot their castle covers most — whether they had a planned spot before or not (latest 📍 positions, even before ✅ Use these positions; matched by roster member even if the name is spelled a bit differently). Places that are not a planned city spot don't count: people sitting there keep their old spot (if any). An owner whose spot someone else took and who sits on no spot is listed (no spot now) so officers place them. At the same time BT1 / BT2 marks follow the side of the plan each member’s spot is on (closer to the plan’s Bear Trap 1 or Bear Trap 2); members ticked for both are left alone; the BT changes are in the same list. A list asks first, then 💾 save. 🏠 HQ FOLLOWS THE MOVE: once the HQ step in the moving steps is ticked, the plan’s new HQ is used as our HQ on 🗺️ Map (marker, territory, distances) and on the 👥 map; untick = the old HQ comes back (data/kingdom-map.js keeps the old one).
[move] - 🐝 Hive → CHANGED GROUP (2026-11-18, Sherry; after a Bear Trap time vote people change group): a member ticked for ONE trap (BT1 or BT2) whose planned spot is on the OTHER trap's side gets a pink frame on the map with the group they are in now, and is listed in the line "🐻 Changed group — their spot is still on the other trap's side" under the map. Those are the people whose spot has to change; give them a spot on their own trap's side and the frame goes away. Not listed: members ticked for both traps, BT3 members, members with no tick. A spot's side = the nearest Bear Trap: the plan's BT1 and BT2 and, for NXS, also BT3 (the trap shared with nxs; since 2026-11-25) — so a member sitting next to BT3 who is ticked BT1 or BT2 is listed, and 📌 moves their tick to BT3 instead of BT1 / BT2. Careful: 📌 (use where they are now) sets the ticks back to the side of the spot, so change spots before pressing it. Only the frame and the list are new; city colours are as before (green = on the planned spot, blue = in the plan but elsewhere, orange = not in the plan).
[map] - 🌾 Banner check for nxs (🚩 Territory with nxs picked) — where its hive is (2026-11-18, Sherry: it started from the Wilderness HQ and listed the hive's banners as not needed): the check now takes nxs's hive from 🐝 Hive itself — nxs members' cities now, the spots of nxs's move plan (also the empty ones people will move to) and its Bear Traps — so a banner that holds any of those is needed. "Home" (what far / near is measured from) is the middle of the move plan's spots; with no plan, the Bear Trap. Of nxs's HQs on the Map, the one nearest to home counts as the first (the Plains HQ the hive stands on). NXS's own check is unchanged.
[move] - 🐝 Hive → NXS / nxs switch (2026-11-15, Sherry): two buttons at the top of 👥 Member positions. "nxs" (2189 nxs, our second alliance) opens nxs's OWN hive plan, planned the same way as ours: positions come from the daily nxs roster (look only, can't be edited here), its own plan file, its own 🐻 BT1 / BT2 marks (since 2026-11-24: nxs's BT1 = their own trap, nxs's BT2 = the Bear Trap shared with us = our BT3; before that it was the other way round); nxs has its own "📍 Update positions" (same as NXS: press Update Map for 2189 on MightPulse first; nxs's positions are used right away, nothing to save — the daily roster also brings them); the 🌾 banner check, move steps, the public "Where's my spot" switch and 📐 auto plan are NXS only. NXS's marks have a third box BT3 = the Bear Trap shared with nxs: BT3 people live on our side and go over for it (more than one box can be ticked; BT3 is green, two or more = purple). A Kingshot Mapper layout with both alliances (cities labelled "NXS" and "nxs", same colour) is split by the tag on each item (see 📥 LAYOUT WITH BOTH ALLIANCES); of nxs's two Bear Traps the one next to NXS's cities is the shared one and becomes nxs's BT2. Import it on each side (📥) to get that side's spots, traps, HQ and banners. 📥 Importing a new layout KEEPS who was already placed: a name stays when its X Y is still a city spot in the new file; ✅ moved ticks and ticked banners still in the plan stay; names whose spot is gone go back to "not placed yet" and the message lists them.
[move] - 🐝 Hive → the moving table (每人一列的搬家表) with a plan loaded: every roster member is a row with TC / TG (MightPulse level 35 = TG1, 40 = TG2), Power and two boxes "BT1 · BT2" — left = Bear Trap 1, right = Bear Trap 2 (Sherry & Nia, 2026-11-05). Ticked rows, and their planned spots on the 👥 map, turn blue (BT1), orange (BT2) or purple (both). Above the table: the two lists (strongest first) with 📋 Copy, and who has no new spot yet. The marks are one shared list kept on the server (not part of the plan file); officers who can edit Hive can tick (📊 Roster no longer shows them). In the 🧭 box that opens when you tap a planned spot, the "Not placed yet" names are grouped the same way: BT1, BT2, both, no BT mark.
[move] - 🐝 Hive → "📤 Export CSV (Kingshot Mapper)" (匯出 CSV, under the moving table, Nia & Sherry 2026-11-05): downloads the moving plan as a Kingshot Mapper CSV (lines type,X,Y,label,#color,seq — no header line, Mapper rejects one) — every city labelled with the member placed there (empty spots "NXS"), Bear Trap 1 / 2, HQ, banners with their step labels, KILL banners. Open it in ksmapper.pages.dev for the next relocation, or load it here again with 📥. "⇄ Swap BT1 / BT2" (對調 BT1 / BT2, next to it, Hive editors): turns the plan's Bear Trap 1 and 2 the other way round when the Mapper file had them swapped; the members' 🐻 BT marks do not change. Saved like any plan change (auto save). "🖼️ Save as image (PNG)" (存成圖片, next to it): downloads a sharp PNG of the plan drawn like Kingshot Mapper (member names, X,Y, Bear Traps, HQ, banners; BT1 blue / BT2 orange) to post on Discord. "📍 Public page Where's my spot?" box (公開網站「我的新位置在哪？」): shows whether the public page is shown or hidden; Hive editors press 🌐 Show / 🙈 Hide (it is hidden until opened; the change reaches everyone in a few minutes). Also: tap any city, planned spot, HQ or Bear Trap on the 👥 map and a small box right next to it shows the name, X:Y and TC / TG.
[move] - 🚚 Move → "📐 Auto plan from a Mapper layout" (從 Mapper 自動規劃, at the bottom of the 🚚 Move page): load a Kingshot Mapper CSV of a new hive (Export → CSV; its city, beartrap, hq, banner, resource and obs rows) or paste it. The site works out TWO roads of banners to the new HQ's 15×15 and lists both in the table: one starting from our Plains HQ today (its block of banners) and the shortest one from any of our banners; the road from our HQ is used by default, the other is drawn dashed, and "🔀 Use the other road" swaps them. Works anywhere on the kingdom map (searches up to about 300 tiles around the new HQ; mountains, lakes and no-build zones are known for the whole map, other alliances' banners only where the site has them, resources only from the CSV) (fewest banners; each joins the one before, centres ≤ 7 tiles apart; never on mountains, lakes, no-build zones, resources, buildings or inside another alliance's land), sorts the drawn banners into stage 1 (BT2 side, built right after the HQ moves) and stage 2 (BT1 side) in build order, and checks: cities / Bear Traps / HQ / banners on mountains, lakes, no-build zones, resources or inside another alliance's land (their banners in the way are listed to take down), overlaps, banners not joined to our land, HQ on Fertile Land (not allowed) or its 15×15 reaching Fertile Land (risky). Table: HQ, nearest Fortress and distance, cities on Fertile Land, cities inside our land after the HQ / stage 1 / stage 2, cities per Bear Trap, average distance to the trap, farthest city from the HQ, road banners in order, stage banners, banner budget (now + new vs 285, how many old ones to take down), other alliances' banners in the way, problems, move order. Drawn like the game (turned 45°) with a legend. Editing: pick a pen — ⚫ Road, 🟡 Stage 1, 🟠 Stage 2, 🧽 Remove, 🏯 Move HQ — and tap the map (a new banner, or change / remove the one tapped); ↩️ Undo, 🔄 Auto road again, 🔄 Re-sort stages, − / + zoom. ⬇️ Picture (PNG) = map + legend + table for Discord, ⬇️ Blueprint CSV, ➡️ Use as moving plan = loads it into 🧭 Move steps (then 💾 Save there; needs the move edit right). "Plan:" list (計畫) like the Ranking tab's shared plans: "🔒 Only on this device" is the officer's own draft (kept in that browser); "➕ Share as a plan" saves it under a name (encrypted, data/hive-plans-x7k2p9.json) so every officer with the 🚚 Move tab can pick it from the list and see the same map and table; changes to a shared plan save by themselves and others see them within about 15 seconds; ✏️ Rename / 🗑️ Delete; officers without the move edit right see shared plans view only (look and download). Several plans can be shared side by side (e.g. A and B) to compare.
[move] - 🚚 Move → "📘 Hive rules & tips" (蜂巢規則與技巧) at the top: HQ only in the Plains or Badlands ring, never on Fertile Land (沃土; in #2189 X and Y 450–749) or the Ruins ring — put it just outside the fertile edge; every banner must connect to the HQ; no banners in Outpost no-build zones; limits 285 banners / 100 member cities / 2 Bear Traps; a city counts only with all 4 tiles inside our territory; about 50 cities per Bear Trap; check the area for other cities, alliance buildings, mountains, lakes; move order HQ → banners outward from BT2 → members → Bear Traps last (members never move traps).
[plan] - 🏰 CURRENT ALLIANCE switch (2026-11-17): ONE "🏰 NXS | nxs" switch in the top bar of the officer page, for the whole page — the separate switches at the top of 🚩 Territory and 🐝 Hive are gone (🚩 Territory keeps only the 🏴 other alliances button, press it again to go back). The tabs split by alliance (📊 Roster, 📋 Attendance, 🕵️ Watchlist, 🗺️ Map, 🚩 Territory, 🐝 Hive, 🐻 Bear plan — marked by a coloured line under the tab, brown = NXS, teal = nxs) show the alliance picked there. Beside the switch a small label says what the open tab is: "Shared by both" on tabs both alliances use (📅 Events, 💬 Board, 📢 Post, 🔬 Research, 🧳 Transfer, 🎯 Blacklist…). An officer set to one alliance on 👥 has no switch. The switch is shown only to officers who can open one of those tabs.
[ranking] - 🏰 ROSTER PER ALLIANCE (2026-11-17): 📊 Roster is kept apart for NXS and nxs and shows the alliance picked with the 🏰 NXS | nxs switch in the top bar (a strip "🏰 Looking at: NXS / nxs" at the top of the page says which). Each alliance has its own member list (nxs: the daily nxs roster, with the same columns as NXS from the first roster update after 2026-11-17 — until then Mystic Trial, Migrant Score and Squad Power show "?" for nxs), its own shared plans (ticked people, registration replies, groups, battle table) and its own settings on the device; a plan made while nxs is picked is an nxs plan and never appears under NXS, and the other way round. Changing the alliance while 📊 Roster, 📋 Attendance or ⚖️ Compare is open reloads the officer page, so the two alliances are never mixed on screen. The 🟡 safe players list is one list for both (it goes by player ID). An officer set to one alliance on 👥 only reaches that alliance's plans and lists.
[attend] - 🚪 REGISTERED, THEN LEFT (2026-11-17) — Sherry: people come and go during registration, and someone ticked who then left used to drop off the lists without a trace when the roster updated. Now a ticked player who is no longer on the roster now STAYS on the plan — on 📊 Roster they are listed under the ✅ Registration line as "🚪 Left the alliance (N)" with their reply, where they are now, and a × to take them off; they are never ranked, grouped or put in the battle table. On 📋 Attendance a list made or updated from the plan keeps them with a 🚪 before the name; like everyone else they start as X (no-show), so one who had confirmed (✅ or 🟡) gets a miss, counted by player ID with their other misses. A list of the last 7 days that is saved also marks as 🚪 anyone on it who is no longer on the roster and did not show up. Under the event sheets a table "🚪 Registered, then left" lists them — one row per player ID (a new name or a later return does not hide them): name, ID, which events, their reply (✅ / 🟡 / ⏳ / ❌), and where they are now ("nxs" or "NXS" when they moved to our other alliance, else the alliance they were last seen in, "back" if they returned).
[attend] - 🏰 ROSTER PER ALLIANCE: 📋 Attendance is kept per alliance the same way — the lists, the attendance rates and the no-show counts are those of the alliance picked in the top bar; a new list belongs to that alliance and imports from that alliance's plans.
[attack] - 📍 WHO IS STRONGER THAN WHOM (2026-11-18) — Sherry: in a battle the page is for grabbing data fast; what helps is a ranking that says who is greater than whom and who is about equal. On ⚖️ Compare the 📊 Strength list (everyone, strongest first) now puts a mark after each Strength number, against one chosen person 📍 (default: the strongest of the alliance picked at the top; tap any name to make that person the 📍): ≈ = within 10% — luck and buffs decide; ＞ = 10–30% stronger — only far more troops win; ≫ = 30% or more stronger — no way to win; ＜ and ≪ = the same on the weaker side. The 🗡️ Swordland list shows the same marks against our 🎯 leader. Same cut-offs as ⚖️ Super compare ("about equal" under 10%, "a lot stronger" from 30%); they are provisional — not checked against battle reports yet, so say so. Strength = Governor Gear + Hero Gear + Masters (millions): investment only, not troops, tiers or buffs. The old ⚔️ attack / defence planner (waves, auto-arrange), hidden since 2026-11-04, was deleted on this day — it no longer exists; on the 🗡️ Swordland card our people are now labelled with the alliance picked at the top (NXS or nxs).
[attack] - 🏰 ROSTER PER ALLIANCE: on the 🗡️ Swordland card "our side" is the alliance picked in the top bar — its plans and its roster (labelled NXS or nxs).
[bearplan] - 👑 LEADERS ONLY + 📬 AUTOMATIC UPDATES (2026-11-27, Sherry): the 🐻 Bear analysis tab now draws only the leader cards — per trap the official A and B teams with their strength K as bars, non-leaders folded underneath. What we saw / suggestions, the leader list, where marches score most, each player, hero sets, totals per hunt and the full table are no longer shown (their data stays in the file). 📬 Under 📥 Update data an admin presses "🔑 Turn on (once)": the browser makes a key pair, the public half is saved in the repo, the private half is sealed for officers. From then on the analysis chat locks each update with the public half and the page opens it by itself — nobody pastes or presses save; the line there says "📬 Automatic updates are on" and when the last update arrived. Pasting under 📥 still works.
[bearplan] - 🏰 BEAR LEADERS PER ALLIANCE (2026-11-17): on 🐻 Bear plan the leader cards and the growth tables belong to one alliance and follow the 🏰 NXS | nxs switch in the top bar (strip "🏰 Looking at: NXS / nxs" at the top). NXS picked: NXS's traps and the whole report as before. nxs picked: only nxs's own cards — the observations, suggestions and detail table were worked out from NXS's rallies and are not shown; with no nxs card yet the page says there is no Bear Hunt data for nxs yet. The trap the two alliances share (NXS's Trap 3 = nxs's Trap 1) is ONE card, shown on both sides with its own title on each. Everything is in the same data file (📥 Update data, admins): a card with side "f" is nxs's, side "s" is the shared trap (titleF = its title on the nxs side), no side = NXS.
[map] - ⚔ TARGET THAT CAN BE CONTESTED NOW (2026-11-26, Sherry): an Outpost that is 🎯 Target or 🔗 Can take and, by its countdown, Vulnerable right now gets an extra orange ring with a ⚔ tag on the map, so it stands out from targets that are still Protected (yellow dashed ring = target, blue = can take). It appears and disappears by itself as the countdown runs. Reminder: an Outpost marked 🎯 Target by hand that has a countdown is now in the 📍 Outpost reminders too — 10 minutes before it turns Vulnerable, to the officers ticked 📍 on 👥 Officers, shown with 🎯 instead of 📍 and the text "A target Outpost turns Vulnerable in 10 min — get the attack ready". It comes from the saved plan (💾 Save plan), each alliance's officers get their own alliance's targets. An Outpost that is only 🔗 Can take (not marked 🎯 by hand) gets the map mark but no reminder.
[map] - 🔁 ONE CLOCK PER OUTPOST FOR NXS AND nxs (2026-11-26, Sherry): the two alliances' plans overlap — the same Outpost can be ✅ Ours for one and 🎯 Target (or 🔗 Can take) for the other, or a target for both. Its countdown is the same building's clock, so setting or clearing the time on one alliance (the NXS | nxs switch at the top) writes it for the other alliance too: NXS types how long its Outpost stays Protected, and nxs sees how long until its target turns Vulnerable, without typing it again. Only the time is shared — each alliance keeps its own marks and statuses, and marking ✅ / ⚔️ by hand still clears only that alliance's time. An Outpost newly marked 🎯 Target picks up the time the other alliance already has for it. Both are saved with 💾 Save plan as before.
[map] - ⏱ TIMER ON A TARGET (2026-11-24, Sherry): an Outpost marked 🎯 Target or shown as 🔗 Can take (someone else holds it) can have a timer too. Select it; under "Time left in game until it turns Vulnerable" (遊戲裡距離可爭奪狀態還有) type the in-game countdown (d h m) and press Set timer. Its card and its line in the 📋 Outpost plan lists then show the time left and the clock time (UTC and local). When the time has passed it shows "⚔️ Vulnerable now" and when it would turn Protected again; from then on the times are an estimate from the 72 h / 24 h cycle, because the cycle starts again when someone takes the Outpost — type the countdown again to correct it. Remove timer clears it; changing the mark (e.g. to ✅ Ours) also clears it.
[map] - 📋 Outpost plan lists — order and clock time (2026-11-19, Sherry): in the lists ✅ Held · protected and ⚔️ Held · contestable, the Outpost whose state switches soonest is first (so the one about to become contestable is on top); Outposts with no timer come last. Each Outpost is on its own line; beside its button, in small print, is the clock time of the switch, in UTC and in the reader's own time with its offset, e.g. 11/21 18:30 UTC · 11/22 02:30 UTC+8. The same clock time is on the selected Outpost's card.
[map] - 🏰 MAP OWNERSHIP PER ALLIANCE (2026-11-17): the 🗺️ Map picture, the buildings, the rewards and the 72 h / 24 h cycle are the same for NXS and nxs, but who holds what is kept apart, because in the game they are two alliances and whoever takes an Outpost has its buff. The 🎯 Target / ✅ Ours marks on Outposts, Fortresses and Sanctuaries, the countdown timers, the ⭐ priorities, the buff conflict check, the buff totals in the 📋 Outpost plan card and the distance to the HQ are those of the alliance picked with the 🏰 NXS | nxs switch in the top bar (strip "🏰 Looking at: NXS / nxs" at the top). A mark made while nxs is picked is nxs's and never shows under NXS. Both are saved in the same plan with 💾 Save plan. The 📍 Outpost reminders cover each alliance's own Outposts: an officer set to one alliance on 👥 is reminded of that alliance's only, everyone else (admins too) of both, no matter which alliance the NXS | nxs switch is on — each reminder then ends with [NXS] or [nxs] after the coordinates (2026-11-22).
[watch] - 🏰 WATCHLIST PER ALLIANCE (2026-11-17): 🕵️ Watchlist is kept apart for NXS and nxs and shows the alliance picked with the 🏰 NXS | nxs switch in the top bar (strip "🏰 Looking at: NXS / nxs"; changing it reloads the officer page). nxs has its own member list (the daily nxs roster) and its own history — first seen, earlier names, power and kills over time, and who left — which starts on the day the roster job first tracked nxs (2026-11-17 or the next daily update), so "before {date}" for nxs means before that day. The other alliances' member lists (where someone came from, similar names elsewhere), the records and the officers' notes (kept by player ID) are the same for both. The AI reads each alliance's roster, history and Outpost marks under separate headings ("ROSTER" / "nxs ROSTER" …): an officer set to one alliance on 👥 gets only that alliance's, everyone else both — say which alliance a figure is from.
[plan] - 🚩 NXS BANNER CHECK FOR nxs (2026-11-17) — Sherry: nxs's banner plan was not checked as strictly as NXS's (only "on a mountain / lake / resource node"). Now nxs's planned banners get the same per-banner check as NXS's, in list order: the tiles each one adds, the tiles in its 7×7 that already belong to someone else, ⚠️ not connected to nxs's territory (edge or corner; such a banner is inactive and later banners can't connect through it), ❌ the banner tile is inside NXS's or another alliance's land, on a mountain / lake / resource node, or in a no-build zone. Land = what stands now plus NXS planned banners marked ⬆ "built first" (the mirror of what NXS's check sees of nxs). The list "🚩 Planned banners — check" is in the nxs card on 🚩 Territory (tap the coordinates to jump there) with the total of banners and new tiles; a banner with a warning is drawn orange on the map.
[plan] - 🧭 BANNER ROUTE TO AN OUTPOST (2026-11-18) — on 🚩 Territory, while planning, tap an Outpost: the button "🧭 Plan the banners to here (NXS / nxs)" works out the banners still missing to reach it for the alliance picked at the top. It finds the fewest new banners from territory that is connected today (HQs, standing banners, planned banners that are connected) to a spot whose 7×7 touches the Outpost's 15×15, going around mountains, lakes, no-build zones, resource nodes, other alliances' territory and tiles that already hold a banner; banners already standing or planned on the way are used, so only the missing ones are counted. Between routes of the same length it takes the one covering more resource nodes we do not hold yet. The page says how many new banners it takes and the total against the limit of 285 (standing + planned + this route), or that the territory already touches the Outpost, or that no route exists. The route is drawn in purple in build order; nothing is added until the officer presses "➕ Add to the plan" (Cancel removes the preview), and it still has to be saved. Same day, the 🚩 banner check became one shared check for NXS and nxs: the order banners are tapped in no longer matters (a banner connects as soon as any chain of planned banners links it), meeting at a corner counts as connected (Sherry: seen in game) — also for who can contest an Outpost, where nxs is now listed too — and planned banners that are not connected or cannot stand (obstacle, resource node, no-build zone, another alliance's territory) are left out of the "After" column of the resource-node table. Leaving 🚩 Territory with unsaved changes now asks first (closing / reloading the tab, and the NXS ｜ nxs switch, which reloads the page).
[move] - 🐻 LOADING THE PLAN AGAIN KEEPS BT1 / BT2 (2026-11-18) — Sherry: NXS's BT1 and BT2 were the other way round again. Loading a Mapper file again took the Bear Trap numbers from the file, which undid an earlier "⇄ swap BT1 / BT2". Now, when the new file has the same two Bear Traps as the plan already had, the plan's numbers are kept, with the Bear Trap ticks; the HQ tick stays when the HQ spot is the same. If the numbers are wrong now: press ⇄ once and save.
[move] - 🐝 nxs MOVE STEPS READ nxs's OWN BANNERS (2026-11-18) — Sherry: nxs's move plan showed no progress. The move steps tick a banner by themselves (✅, greyed) when it really stands; for nxs this was looked up in NXS's banner list, so no nxs banner ever showed as built by itself, the new-HQ step compared with NXS's HQ, and the banner budget line counted NXS's banners. Now, while 🐝 shows nxs, "standing" = nxs's standing banners listed on 🚩 Territory, the HQ step is done by itself once nxs's HQ on 🚩 Territory is at the plan's HQ spot, and the budget counts nxs's banners. A banner that stands but is not on nxs's standing list can still be ticked by hand. The "moved d / n" member count compares each name on the plan with that member's city position in nxs's roster — a plan whose cities carry no names shows 0 / 0.
[plan] - 🐝 nxs PLAN BANNERS vs STANDING (2026-11-17) — Sherry: the banners of nxs's HQ move plan were being counted as if they stood. For NXS a banner of the 🐝 Hive move plan only counts as standing once it is ticked as built in the move steps; nxs now works the same way: an nxs plan banner ticked as built in nxs's move steps counts as a standing nxs banner on 🚩 Territory (territory, resource nodes, banner counts) by itself. And when banners of nxs's plan are in the nxs "standing" list without being ticked, the nxs card shows an orange box "🐝 N banners of the Hive move plan are listed here as STANDING…" with each one (tap to go there) and a button that takes them all off the standing list (then 💾 save the plan).
[move] - 🐻 nxs Bear Trap numbers (2026-11-17): nxs's traps on 🚩 Territory are kept in the order they were put on the map, so the numbers could come out swapped. Now, when nxs has a move plan, a trap standing where the plan has one takes the plan's number and the others fill the numbers left. In the NXS view the shared trap in the faint nxs layer is labelled "BT3" (NXS's name for it) instead of "nxs BT2" (the shared trap is nxs's BT2 since 2026-11-24). nxs's "📍 Everyone's position now" card also has the 🔄 Update roster now button (the same job refreshes both rosters).
[watch] - 🏰 "Our Academy / sister alliances" (NXS) / "Our main alliance" (nxs): the box next to the rival alliances lists the alliances that count as ours, so having been seen there is not flagged. For NXS it is its Academy (default: nxs, VZP); for nxs it is its main alliance (default: NXS, VZP — VZP is NXS's old tag).
[move] - 🏰 CURRENT ALLIANCE switch: 🐝 Hive follows the 🏰 NXS | nxs switch in the top bar (see 🚩 Territory); it no longer has NXS / nxs buttons of its own.
[move] - 🏰 "Planning now: NXS / nxs" strip (2026-11-17): on the two pages that are split by alliance — 🚩 Territory and 🐝 Hive — a coloured strip at the top always says which alliance is being planned (NXS brown, nxs teal) and the map / tool card has a frame in the same colour. In 🐝 Hive a save says which alliance it went to ("Saved ✅ … · 🏰 nxs") and an imported layout says which alliance it was loaded into. No other page mentions the alliance split — announcements, events, research and the roster are shared.
[move] - 🐝 Hive → 🤝 Shared Bear Trap box (2026-11-17), under the BT1 / BT2 / BT3 lists of the move table (shown once a plan is loaded): the trap both alliances use is BT3 for NXS and BT1 for nxs, so this one box lists everyone ticked for it — the NXS members ticked BT3 and the nxs members ticked BT1, each side by Power — with 📋 Copy for the whole list. The ticks themselves are still made in each alliance's own table.
[move] - 🐝 Hive map (2026-11-17): the OTHER alliance is drawn faintly behind the one you are planning — white dashed squares for its cities, banners, HQ and Bear Traps (labelled "nxs BT1", "NXS HQ" …), its plan when it has one, otherwise where its cities are now (The yellow "Y 704" border line was removed on 2026-11-24: nxs now sits north of NXS, so that line no longer exists.) It is only for looking: nothing of the other alliance can be tapped or changed from this view; switch NXS | nxs to plan the other one.
[move] - 🚚 Move → "📍 Where everyone is now" (2026-11-11): NEW OR LEFT MEMBERS: 📍 only looks up the members on the roster, so when someone joined or left, press "🔄 Update roster now" (same card, the full roster job, about 5 minutes) first, then 📍. ① open the MightPulse map and press Update Map ② 📍 Update positions — the Worker looks up only castle positions of every roster member in batch calls (not the whole roster). It can take up to about a minute (2026-11-18): the data source allows 60 players a minute, so the first half comes at once and the page waits for the next minute before asking for the rest, showing "50 / 98 read — the rest in N s" meanwhile (keep the page open). A member who still cannot be read keeps the position from last time, and the card says how many; the newest positions are also used by 🐝 Hive and the public 📍 Where's my spot? page. Logged-in officers see the same two buttons (map + positions) under the map on the public page; the stats site's name is never shown there. ③ check the changes ④ ✅ Use these positions. (Old text, outdated:) [move] - 🚚 Move → "📍 Positions from the roster" (從名單更新座標, the card at the top of the Move page): every member's castle X:Y comes with the roster (MightPulse, updated every day at 20:13 UTC — the same data as 🕵️ Watch). MightPulse only knows new positions after someone presses "Update Map" on its map (https://mightpulse.com/map?kid=2189). After members move (a "members move" step that is the current ▶ step reminds you): open the MightPulse map, press Update Map, then "🔄 Update roster now" (立即更新名單) — about 5 minutes, the page updates by itself. It is ONE shared request: the same button sits on 🕵️ Watch, both start the same roster job and both pages get the new roster (not again within 10 minutes of the last update). The card lists the changes against 👥 Member positions: name, old X:Y → new X:Y, ✅ = now at their planned new spot. Members are matched by player ID (saved on each 👥 entry after the first ✅), else by the exact name — never by a look-alike name, so two members with almost the same name (e.g. two "GhOsT") stay two people. Names on 👥 Member positions that are no longer on the roster (left the alliance) are listed as "Not in the alliance any more" and removed by the same ✅ button (or "✅ Remove them" when nothing else changed). ⚠️ lists members with no position on MightPulse (left as they are). "✅ Use these positions" (套用這些座標, needs 🗺️ Map edit right) writes them into 👥 Member positions and saves, so the moving table and 🧭 Move steps tick themselves. Banners ticked by hand in 🧭 Move steps also count as standing banners on 🗺️ Map (and banners marked ✅ Built on 🗺️ Map tick the steps by themselves).
[watch] - 🕵️ Watch → "🔄 Update roster now" (立即更新名單, under the update time): fetches every member from MightPulse again right away (power, Mystic Trial, castle X:Y…) — the same job as the daily 20:13 UTC update; about 5 minutes, then the table updates by itself. Shared with the same button on 🚚 Move (one request, both pages get the new roster).
[move] - 🚚 Move (搬家, its own tab): only admins see it unless the 👥 table gives it. Load the moving plan: Kingshot Mapper (ksmapper.pages.dev) → Export → CSV file, cities labelled with member names (a .json from another planner also works; with several alliances in one file, ours is found by colour), "🧭 Move steps" (搬家步驟) and the moving table: each member's current X:Y → new spot (tap to copy), ✓ Moved, progress bar, "Only not moved yet". A member whose current position in 👥 Member positions already equals the new spot gets ✅ automatically. "➕ Add / change a spot" gives someone a spot or moves them; their old spot becomes free. "🧭 Move steps" lists the plan in order from the banner labels in the CSV: road R1… → early hive banners P1… / take down KILL banners → move the HQ → stage 1 S1-… → BT2-side members move → stage 2 S2-… → BT1-side members move → Bear Traps last; ▶ marks the current step. ✅ comes by itself when the map already shows it (our banner standing at that X Y on 🗺️ Map, the HQ / a Bear Trap / a member already at the new X Y); officers with the move edit right tap an item to tick it by hand, then 💾 Save. Under the steps: banners standing + blueprint banners still to build against the 285 limit, with a warning to take down old banners first when it is over. Blueprint CSV labels on banners: R1… road, P1… early hive banners, S1-1… stage 1, S2-1… stage 2, "KILL TTT" = another alliance's banner to take down; Bear Traps labelled "Bear Trap 1" / "Bear Trap 2".
[board] - 💬 Board (討論板): a message is posted at once with only the original. "🌐 Translate for everyone" (翻譯給所有人, a tick box next to Post / Reply, off by default, remembered on that device) translates it into 中文 / English / Português / العربية / 한국어 in the background — the post appears at once and switches to each reader's language by itself when done. Without it, readers whose language differs see "🌐 Translate to …" (翻成…) under the post: it translates that one post into their language and keeps it, so the next reader of that language sees it at once. Editing a post that had translations translates it again in the background. Messages from before this change keep all their translations; @ mentions, 📋 Assign to (makes a task with ✅ Done), 🖼️ pictures, 📌 Set as decision. "Tasks for you" lists what you were assigned or @'d in.
[ranking] - 📊 Ranking → ② Participants & ranking → ✅ Registration (報名確認, from Nia's SS & TAC Registration Tracker): next to each ticked name tap ⏳ to cycle ✅ confirmed → ❌ can't come → ⏳ no reply; 🟡 = safe player, registered without waiting for a reply (Nia's yellow; one list remembered for every plan). The line above the list counts ✅ confirmed + 🟡 safe with no reply = can be registered; "📋 Copy list" can copy only those, or only the not-replied names (to ping them). Replies are saved with the shared plan.
[ranking] - 📊 Roster has NO 🐻 BT groups any more (taken off 2026-11-11, Sherry: not needed there). BT1 / BT2 marks are ticked only in 🚚 Move → the moving table.
[attend] - 📋 Attendance → ① Registration (lists made from a plan since 2026-10-30): shows each person's reply and 🟡 from the Ranking plan (set there; 🔄 Update from the plan brings changes in), with the same counts and copy buttons. Only registered people (✅, or 🟡 not ❌) appear in ② and can count as a miss.
[attend] - 📋 Attendance (出席): sheets made from a shared Ranking plan; ① Confirmed (tap = sub), add people by pasting names, 📷 voter screenshots or by hand; ② after the battle tap ✓ showed up → X no-show → 🛌 excused; repeat misses turn orange (2nd) and red (3rd). Save / Copy for Discord.
[attend] - 📋 Attendance: misses are counted over ALL event sheets together (Swordland, Tri-Alliance…; Sherry, 2026-11-01): a 1st miss = yellow (2026-11-17, it used to be a red outline and read as "3rd+"); the row of marks (✓ / X / ·) at the end of each line reads left to right from the oldest event to the newest, a 2nd miss anywhere = orange, 3rd = solid red, even on different lists; a sheet's summary adds "(N across all events)" when the total is higher than that sheet's own count; the Discord copy's (2nd)/(3rd) count all events too.
[events] - 📅 Events → ✏️ edit an event → each action item has "👤 Only remind" (只提醒, Sherry 2026-11-04 — e.g. the Alliance Championship 22:30 UTC troop-update reminder for Armada only): tick officers and ONLY they get that to-do's reminder, sent by the Worker itself (at the item's exact time, or 12:00 UTC on its day if it has none) to every phone where they turned notifications on while logged in with Discord (💬 Board or the ⏰ panel) — no Events tab visit or 🛠️ switch needed on their phone; nobody else gets it, whatever their 🔔. Untouched = everyone by 🔔 as before. The list is refreshed whenever an officer who may edit Events opens the Events tab; a warning lists chosen people with no phone with notifications on. The notification title starts with 👤.
[perms] - 👥 Officers (幹部, admins only): one row per officer; per tab ✏️ Edit / 👁️ View / — Hidden (saves by itself); 🔔 which events they get officer to-do reminders for; 👁️ Preview as; + Add officer (name + 18-digit Discord ID). 🏰 Alliance column (2026-11-16): NXS + nxs (default, both) / NXS / nxs for each non-admin officer — on the pages split by alliance (🚩 Territory, 🐝 Hive) an officer set to one alliance opens on it and has no NXS | nxs switch, and cannot change the other alliance's Bear Trap marks; admins always have both. The NXS | nxs pick is shared: switching on 🚩 Territory also switches 🐝 Hive and the other way round.

LITTLE SPARROW (🐦 on the officer page)
- The first time an officer opens the officer page on a device (after the greeting, and only if they have not already changed tab or scrolled; unanswered it goes away after 15 seconds — since 2026-11-16 it no longer asks on every visit) and whenever they tap the sparrow, it asks "Want a quick tour of the officer page?": 👀 Yes = the page's own controls top to bottom (← main site, language, light/dark, 🔗 copy link, ↻ refresh, your Discord name (tap to change how it shows; Log out), the tabs you have, the 🐦 button next to every feature, Ask AI), then "🎓 How do I use…" leads on to the tab tours; "No thanks" = the list of tab tours in the chat.

AI ASSISTANT
- The chat knows an officer by their Discord login on this browser (log in on the officer page once). It follows the 👥 table: it only explains and answers from the tabs this officer may open. Officers have no daily question limit.

@attack
🔭 SCOUT — part of the ⚔️ Battle tab, always shown at the bottom (officer-x7k2p9.html#attack, under 🎯 KvK intel; the old #scout link opens it) — the top players of other kingdoms (for KvK)
- Type a kingdom number and press "Fetch now": a GitHub job reads that kingdom's top 20 players by Migrant Score AND top 20 by power from MightPulse (union, anyone on both lists once; usually 20–35 players): power, Town Center, Mystic Trial score and rank, kills, VIP, alliance, Migrant Score; plus the kingdom's strongest alliances. Migrant Score ≈ Squad Power × 317, so it is the better strength measure; power also hints at activity. Under the ID a grey note "power top 20 only" / "Migrant top 20 only" shows a player who is on just one of the two lists. The table is sorted by Migrant Score by default. It takes about 2–3 minutes; the page refreshes by itself.
- Each scouted kingdom is a chip at the top: ⟳ fetches it again, ✕ removes it, "update daily" refreshes it every day at 20:25 UTC together with the roster (tick it for the KvK opponent).
- Our own kingdom #2189 is scouted too, for comparison. Data is the SCOUT section of the OFFICER DATA (answer "who is the strongest in kingdom X" from there).
- Not in this data: last login (unreliable) and anything MightPulse does not publish.
- ⚡ OPPONENTS NOW (戰時抓對手, card at the bottom of 🔭 Scout; Sherry 2026-11-07, for the analysis chat): during a battle, fetch other kingdoms' players from MightPulse right away. Type kingdoms (default: Scout kingdoms marked "update daily"), pick the batch (positions 1–5 first, then 6–20, 21–50, 51–100 — the next batch is pre-selected after each run), rank by personal_power + troop_power (or tick gov_gear / hero_equip / master_power), extra player IDs, and alliance member lists ("kingdom:TAG" — gives every member's ID). ⚡ Fetch now sends an ENCRYPTED request → GitHub job (scripts/opp-now.js, 1–3 min) saves one encrypted file per UTC day (data/opp/, added to by every batch): 11 boards top 100 per kingdom (re-fetched only after 3 h), each player's base / ranks / heroes (hero stars, hero gear), alliance lists. Anyone already fetched today is skipped. Next to the button: the calls this batch needs (~1.15 s each + ~45 s start) and today's use; daily allowance ~5,000 calls shared with roster / Scout / history (MightPulse may report what is left; if not, the card says so). ⬇️ Download: latest batch (JSON), its CSV summary (kid, alliance, name, ID, personal / troop / pet / gov gear / charm / hero gear / master / research / migrant, top 6 heroes with stars, captured_at), or everything today. 🔎 Find by name: searches today's batches and alliance lists, today's / yesterday's MightPulse history and Scout — MightPulse has no name search, so fetch the alliance list if someone isn't found; "+ add" puts the ID into the extra list. Limit: kingdom top 100 only. The daily history (20:45 UTC) still saves the Scout "update daily" kingdoms every day.

@ws
🗂️ MY WORKSPACE (我的工作區, officer-x7k2p9.html#ws; added 2026-11-22, replanned 2026-11-23) — a private page for each admin, built around what that person is responsible for. Each person has their own; it is stored apart from all other officer data.
- PRIVATE: only the person themself can see their page. Sparrow can also open another person's page, read only, to check that it works. You (the AI) are NEVER given what is written on anyone's page, and Little Sparrow does not read it either — if someone asks what is on their page or on someone else's, say you cannot see it and that they can open the 🗂️ My workspace tab.
- 🎯 My events (top card, nothing to type): the events this person is responsible for that are running now or start within 2 days — "Day a of b" or "starts in n d", our times, and that event's officer to-dos for today and tomorrow (⏰ = has an exact UTC time). Under them, "Later": the person's other events with the date each one comes next and their part of it. Then one line with the other events on today. "✏️ Choose my events" ticks which events are theirs, with an optional line per event for THEIR part of it (for example "Rewards: criteria, participation records, distribution" — it shows under the event's name), and a list of 📌 Standing duties that are not events (shown at the bottom of the card). All of this comes from the officers' responsibility sheet; Sparrow can set it for another person while looking at their page.
  For Alliance Championship the card also says whether Bear Hunt falls on the registration deadline day (the last day of the run) or only the day before — the two cases for using the bear buffs before updating the registration.
- 📨 From Sparrow: things Sparrow sent to this person. They tick an item when it is done; under a question they type the answer. On Sparrow's own page the same card is "📨 For <person>": she writes an item (optionally marked as a question), sees "waiting / done / answered" and the answer, can delete it (press 🗑 twice), and "📋 Copy as a message" makes English text (what is left today until 00:00 UTC — our event times still to come and the to-dos of that person's events —, what is still open for them, and tomorrow: events that start or end, our times, kingdom timeline) to send outside the site as well.
- 📣 Coming on the kingdom timeline: every timeline item that arrives before the 3rd KvK from now, with a tick for "announced" (members see the same list under the home calendar as 👑 Coming to our kingdom).
- 📝 My notes: type and press Enter to add, tick when done, ✏️ edit, 🗑 delete (press twice).
- Sparrow's own page has more cards: "Today" (her repeating items — 🔁 every day, or 📅 tied to an event day, added with "+ Repeating item"; daily ticks start again at 00:00 UTC), 🚧 Ongoing (work in progress with a next step), ❓ To look up (a question with an answer box under it), 📝 My own.
- 🔮 Sneak peek (Sparrow's page only): the official previews of coming events posted on the Kingshot Wiki — date, title and links to the Traditional Chinese / English / Korean versions, newest first, for the last 30 days. A workflow checks the wiki three times a day; a new post is marked "new" until she ticks it as read. The list holds titles and links only; you are not given it.
  For her only, "📤 For Claude" on 📅 Events also carries these items ("Sparrow personal"), and an NXS-PATCH may hold "personal": { "set": [...], "delete": [ids] }; they are shown for checking and saved only after ✅.

@research
🔬 RESEARCH (研究報告) — one main tab on the officer page holding our research reports as small sub-tabs; ONE 👥 permission "🔬 Research" opens all of them (Sherry 2026-11-04). All of it is Sherry's own testing, not official rules, and it keeps changing.

@iv
💎 INVESTMENT report (🔬 Research sub-tab, officer-x7k2p9.html#iv, 投資效率) — Sherry's OWN RESEARCH, STILL BEING TESTED (2026-11-04), not from the game; from her main account (power ↔ %, shop prices, research times). Say so when you answer from it.
- Gems per +1% (one stat, one troop type; 1 Relic Coin (聖契幣) ≈ 3.2 gems): Governor Charm 0→Lv1 ≈ 1,000 (Lethality + Health, one troop type); pet level-up with Alliance Shop food (weekly limit) ≈ 3,200 (all troops Attack + Defense); research first levels of a tier 3,800–14,600 (infantry Attack / Lethality nodes cheapest); Governor Charm every level (Guides + Designs at 500 Relic Coins each; Lethality + Health, one troop type): Lv1 ≈ 890, Lv2 14,700, Lv3 20,000, Lv4 48,000, Lv5 40,000, Lv6 67,200, Lv8 96,000, Lv11 156,800, Lv12 236,000, Lv16 410,000, Lv22 701,000 (Lv6+ dearer than anything else on the page); Hero Gear Mastery Forging 0→1 ≈ 11,100, 1→2 22,200, 2→3 33,300, 3→4 44,400, 4→5 55,600 (10 Forgehammers per level, 1 = 1,250 Relic Coins); pet advancement Lv20 ≈ 4,700, Lv30 9,600, Lv40 14,200–18,100, Lv50 23,200, Lv60 41,600 (about the same for N/R/SR pets; each step ≈ 2× dearer); Pet Refinement (寵物普通洗練, Common Taming Marks) ≈ 5,600, Pet Advanced Refinement (寵物高級洗練, Advanced Taming Marks) ≈ 20,000 (one pet tested); Governor Gear every step (satin 1, Gilded Threads 100, Artisan's Vision 500 Relic Coins; Attack + Defense, one troop type): green–blue 513–10,165, purple (Epic, incl. T1) 12,400–44,800, gold 40,200–82,600 (Gold T3 121,000–171,000), red 209,000–841,000 (Red T4 ★3; Red T1★2+ power estimated, T5–T6 no data); research last level of a tier ≈ 20,500 (Hero Gear only counts while that hero marches). Other exchange rates change numbers, not the order.
- The page now opens with 🎯 "My next step" (pick charm level and gear step for infantry, cavalry and archers separately, next pet advancement, main heroes' Mastery Forging level and those pieces' enhancement +40/+60/+80/+100 → the 8 cheapest next upgrades, all systems and troop types mixed; Mastery Forging per 1% = 10(L+1) Forgehammers ÷ (10% × (15% + 0.35% × enhancement)), so higher enhancement makes it cheaper). Pet level-ups are not ranked: pet food is easy to get — level up whenever you can; the limit is the advancement every 10 levels (ranked) ; the page (redone 2026-11-04) is: three rules (every system is cheapest at its first levels; rotate to whatever is cheapest now; joiners don't spend on combat stats) → 📏 a price ruler (every level of every system as a dot on a log scale of gems per 1%, bands very cheap <5k / cheap 5–15k / middle 15–30k / dear 30–60k / very dear 60k+; your next steps are numbered on it) → 🎯 My next step; explanations by role, pets, unknowns and number tables are folded.
- Pets (Project doc claude/kingshot-pets.md): food is easy to get (Cheetah skill 200–500/day, events, Alliance Shop) so the ~3,200 gems/1% shop price is only an upper bound; rarer pets give more troop Attack/Defense per level but need more food (food per level differs in 5 groups: Wolf | Lynx, Bison | Cheetah, Moose | Lion, Grizzly | Gen 4+), so food per +1% is about the same for every pet (Lynx/Bison thriftiest, ~0.8× a Lion); a Lion gains ~+0.136% per level (~5,300 food per 1%), advancement jumps +1.0–1.6%; Lion Lv80 max ≈ 22%. Pet Refinement is the biggest room left on a pet, all Lethality/Health; the pet level caps the quality (Lv10 grey, Lv20 green, Lv30 blue, Lv40 purple, Lv50 mythic); Common Taming Marks up to blue, Advanced Taming Marks from blue → purple. Pet power = 72,000 × troop Attack % + 12,000 × the six Lethality/Health % (checked on 7 pets).
- Every system gets dearer as it goes up; the first levels are the bargains → rotate: always upgrade the system whose next step is cheapest, don't max one system.
- Lethality and Health are usually much lower than Attack and Defense; value of +1% ≈ 1 ÷ (100 + current %) → charms even better than the table, pets a little worse.
- Rally leaders (only the leader's stats count): 1) all charms to Lv1 and every Governor Gear piece to blue ★3 (both very cheap); 2) pet level-ups, buy the food weekly; 3) research, first levels of each tier best, main heroes' Mastery Forging to Lv1; 4) charm Lv2–3, pet advancement, purple (Epic) Governor Gear, Mastery Forging Lv2 (similar value; pick the stat/troop you lack); 5) Mastery Forging Lv3+, charm Lv4+, gold / red Governor Gear last. Troops: PvP infantry Defense/Health, cavalry and archer Attack/Lethality; Bear Hunt archers. Amadeus full stars = all troops Lethality + Health +15% (owned = active), Helga full stars = Attack + Defense +10% — maybe great for paying leaders, cost not worked out.
- Joiners (own combat stats don't count in rallies): invest in troop tier (Truegold/TG) and the first hero's top-right skill; combat stats only help solo attacks, own-city defense, gathering. If spending anyway: charm Lv1 and pet level-ups give the most power per gem → most Migrant Score (charms, pets, research, Hero Gear weigh the same).
- Updated summary (Sparrow 2026-11-04): research per 1% by tier I–III 15–850, IV 1,700–4,100, V 6,300–15,000, VI 26,000–62,000; Master Relationship Advancement with Master Emblems (corrected 2026-11-12: the whole 10 levels of stats counted for each advancement), gems per 1% at the k-th advancement: Roman ≈ 3,200 then ≈ 2,960·k (Attack + Defense; 10th ≈ 29,600), Valora / Pan 3,900 then ≈ 3,700·k (one stat; 10th ≈ 37,000), Cassia 11,100 · 11,100 · 22,200 … 5th 44,400 … 10th 69,200 (Lethality + Health) — Roman's first 3 are the cheapest master stats; details on the 🎓 Masters page; Hero Gear enhancement (XP, 100 XP part ≈ 250 Relic Coins) Lv20 ≈ 2,400, Lv40 6,200, Lv60 15,500, Lv80 32,000, Lv100 55,000; Pet advancement Lv70–80 ≈ 50,000–67,000 (pattern, untested). Red Governor Gear is not open on our server yet. VIP combat stats (all troops): VIP9 Defense +10%, VIP10 Attack/Defense +12%, VIP11 Attack/Defense/Health +14%, VIP12 Attack/Defense/Lethality/Health +16% (biggest single source). Governor Charm power (kingshot.net, matches our tests): Lv1 205.7K, Lv2 288K, Lv3 370K, Lv4 452K, Lv5 576K, then +124K per level, Lv22 ≈ 2.4M. Amadeus/Helga need their own shards (Hall of Governors top 10, VIP packs; general shards don't work) — finish them if close to full stars. Widgets: level L needs 5L, ~0.36–0.5 × L per 1%, cheap with the Champagne market (500 tickets each). The page's "My next step" also asks research tier, Roman / Valora advancements done and enhancement +20…+100.
- Not worked out: Amadeus/Helga own-shard pack prices; real-money packs; pet active skills (refinement tested on one pet only).

- Mastery Forging Lv1–10 needs only Forgehammers (10 × level; 550 to reach Lv10); from Lv11 each level also eats whole Mythic Hero Gear pieces (1 at Lv11 … 10 at Lv20, 55 in all; 2,100 hammers to Lv20) — complete the three main heroes' Mythic sets first; re-forging Mastery gives back only half (Sherry confirmed 2026-11-12; table from kingshotguide.org).
- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Charms Lv5+ and high Governor Gear now level up in 5 small steps with the same total materials — you can stop mid-way and finish on a scoring day. (Rocket Noodles 2025-10) | Combat research can wait — except the research that raises deploy capacity. Early Hall of Heroes scores research by the power it adds, so some combat research is worth saving for it. (Strat Game Sloth) | The same XP takes one Hero Gear piece from 0 to about 50, or one from 198 to 199 — about 20× more stats the first way. Don't max one piece and leave the rest at zero. (Strat Game Sloth 2025-12) | Governor Gear from blue 2★ to early purple is held back by Artisan's Vision, not Satin — stop buying Satin for that stretch (5 Gilded Threads = 1 Artisan's Vision at full price). (Strat Game Sloth 2026-01 · Rocket Noodles 2026-09) | Truegold: cancelling a building upgrade refunds all resources but only half the Truegold, and no speedups. Truegold turned into dust scores only half in events — don't convert before KvK. (Strat Game Sloth 2025-07 · 2026-03) | Strongest Governor / KvK scoring days: 8,000 points per hero roulette spin (spins can be split over two scoring days); 6,000 per Master Emblem and 60 per Master's Manuscript. (Rocket Noodles) | Governor Orders: use Productivity Day first, then Rush Job — they stack. Take every discounted trade at the Nomadic Merchant. (Strat Game Sloth 2025-06)
@bh
🐻 BEAR HUNT report (🔬 Research sub-tab, officer-x7k2p9.html#bh, 狩獵巨熊研究) — Sherry's OWN RESEARCH for members, not from the game. Since 2026-11-07 it follows ONE running research ledger (Project doc claude/bear-findings.md + bear-mails / bear-totals / bear-rosters csv; 8 hunts 10/25–11/06 in both Bear Traps: 1,123 rally mails + 5 from Trap 1, 6 final leaderboards, 8 rally troop pages): every point is marked ✅ sure or 🟡 likely; corrected ideas are fixed in place (no "corrected earlier" list since 11/07). It names no leaders and ranks nobody (that is only in 🐻 Bear analysis). Say it is our research when you answer from it.
- The Bear's HP never runs out, so your score = how hard the whole rally hits, almost all decided by the rally leader (✅). You control: which troops you bring and which rally you join.
- Your score ≈ K × c × Σ (w × n^0.58) (✅): K = leader strength (shared by the rally); c = your own troops = troop tier × (1 + Valora's Hunter Instinct) (two players with the same tier and Hunter Instinct level score exactly the same); w = archer 1, cavalry 0.63, infantry 0.12; n = count of that type. Each type counts on its own and grows slower than the troop count (n^0.58, close to a square root: 4× archers → about 2.2× archer score) — hence the 100k join cap. Fitted on 107 marches in 8 rallies (11/06): about 8.5% error (20% without c).
- Best personal mix ≈ infantry 1 : cavalry 25 : archers 74 (✅; moves a little with tier). Being a little off costs only 2–5% (10/29 test: 10:10:80 vs 2:24:74 only +2%; outside simulations of 57 billion fights: best 2:24:74), BUT don't send zero of any troop type: pure archers score about 15–30% less, because Petra's Evil Eye needs all three types to trigger that often. Calculator: your counts → % of the best mix for that total (relative only).
- The same archer march scored 45–58M in strong rallies, about 40M in a middle one, 10–20M in weak ones (11/06) — about 3×.
- Sending troops: strong rallies fill in 20 s–2 min, later rallies fill in the last 30–60 s with returning troops (✅); more rallies don't waste troops (✅); archer marches to strong rallies, infantry/cavalry marches to later ones (✅).
- Leader strength: the leader's archer Attack × Lethality on the rally bonus page (includes the leader's hero troop bonus) (✅); City Bonus only the leader's, and it ADDS into the same slot as the leader's rally Exclusive Gear bonus (Attack 20% + 30% → ×1.5), not a separate multiplier (✅, from PvP reports); joiner skills: 4 slots from joiners with a hero in the first slot (that hero's top-right skill) — who gets them: likely higher skill level first, then list order at the same level (🟡, Sparrow's 11/07 idea; a Lv4 skill was skipped when 7 had Lv5; still being checked); they never show on the bonus page, they multiply on top in battle (✅). Mixing Attack (Amane, Margot, Luna) and Lethality (Chenko — his fist icon is Lethality —, Yeonwoo, Amadeus) beats 4 of one kind; 2 + 2 is about 12.5% over 4 Chenko (🟡 worked out; too small to see in mails — the same mix swings 1.4–1.5× between waves). Joiner skills of a different kind from the leader's heroes help more (Amadeus already adds Lethality).
- 🦸 The leader's three heroes matter a lot (🟡; outside simulations by Strat Game Sloth and the Frakinator team, and our rally mails point the same way). Same bonus-page stats → how hard the rally hits: Amadeus / Petra / Marlin 1.00, Amadeus / Jabel / Marlin 0.82, Zoe / Petra / Marlin 0.79, Zoe / Petra / Quinn 0.70 (the old idea that the usual sets differ by under 5% is wrong). Why: Zoe's Sundering Wound does nothing in Bear Hunt, and her Infinite Arsenal is the same effect as Petra's Evil Eye, so they don't stack in one rally — with Petra, Zoe only adds Attack +25%. Petra's Evil Eye gets one 50% chance per troop type every turn (from turn 2), so it triggers about 87.5% of turns, about +43% damage — Bear Hunt leaders should bring her. Each rally still swings about ±8% by luck. The page shows these sets with hero pictures. Joiners' own stats don't count.
- 📈 Alliance total (final leaderboard): Bear Trap 2 10/31 11.30B (18 players) → 11/02 11.98B (20, +6.0%) → 11/04 16.86B (23, +40.7%) → 11/06 19.10B (23, +13.3%) → 11/08 15.89B (19) → 11/10 18.30B (22) → 11/12 20.58B (22; new official leader list from 11/12) → 11/14 27.64B (26 players, +34.3%, the highest so far; that day one member's own damage in five leaders' rallies — a rough comparison, the troops sent were not always the same — put those leaders in the same order as predicted, with the four weaker ones about 11–16% lower than predicted relative to the strongest; a leader who switched from Zoe to Amadeus and opened with City Bonus went from about 0.28× to about 0.72× of the second-strongest leader's rally for the same members, one wave only; per-leader numbers are in the 🐻 Bear analysis tab); Bear Trap 1 10/31 24.47B (31) → 11/06 29.72B (31, +21.5%; the 23 in both +25%) → 11/13 44.08B (34 players, +48%; that hunt also had a new leader opening for the first time and one Trap 2 leader standing in — why the total rose this much is not worked out yet).
- Same troops = same damage (✅, 11/07): in one rally mail, two players who sent exactly the same troops get exactly the same damage; what changes from wave to wave is one multiplier for the whole rally (see Luck).
- Luck: one rally swings 10–25% per wave, up to 1.36× (Bear Trap 1, 11/06) — compare 3–4 waves (✅). Three layers (🟡): whole rally ×0.82–1.22 (leader's chance skills), archers on top ×0.86–1.37, each TG3 group on top ×0.73–1.33.
- Your own score depends mostly on which rallies your marches joined, not on your own rally (🟡): archer marches to the strongest rallies first, infantry/cavalry marches to the others. Late rallies fill up in the last minute (✅ Bear Trap 1 last wave: 15–20 rallies at once, late ones 20–40% → full).
- Valora (Master): her talent Hunter Instinct (狩獵本能) adds only to your own Bear Hunt Damage Points, levels unlock with Master Affinity — in-game table (Lv1 2%, Lv2 4%, Lv3 6%, Lv4 9%, then +3% per level, Lv11 30%); Dance of the Hunt (狩獵之舞) adds +30,000 Bear Hunt rally capacity per level when you launch the rally (Lv4 +120,000); Savage Advantage (人數優勢) adds +3,000 to your own march capacity in Bear Hunt per level.
- Not known: whether joiner skills really go by skill level first; 4 Chenko vs 2 Chenko + 2 Amane (test planned); whether "enemy Defense −" works on the Bear; whether Vivian's skill works in Bear Hunt (outside simulations say it sometimes doesn't); how much each of Zoe's two skills costs on its own.

- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): The Bear counts as about 5,000 infantry, so the first few thousand of each troop type matter most — that's why sending zero of a type costs so much. (Strat Game Sloth; our reports agree) | A fully enhanced Trap Enhancement gives the whole alliance +25% Attack in Bear Hunt — worth checking before the hunt. (Rocket Noodles 2026-07) | Short on archers: 10/20/70 or 10/30/60 is still better than keeping troops home. In a strong rally with room, joiners can go up to 85–90% archers. (Rocket Noodles · Strat Game Sloth 2025-07)
@ms
🧳 MIGRANT SCORE report (🔬 Research sub-tab, officer-x7k2p9.html#ms, 遷城分數) — Sherry's OWN RESEARCH, STILL BEING TESTED (updated 2026-11-06), not from the game; from her two accounts' item-by-item before/after tests (11/02–11/06) and the 10/14 Swordland check of 98 players. Say so when you answer from it. Since 2026-11-11 the page is about WHAT THE SCORE CAN TELL YOU, not how to raise it (nobody upgrades for it): how much someone has really invested (hoarding troops can't inflate it), sorting Swordland Showdown legions, an opponent's Swordland troop power (score ÷ 317), checking transfer applicants. It shows investment, not strength (no stat %). The upgrade weights, account rate, Town Center jump and update timing are folded under 🔢 How we worked it out.
- Migrant Score is hidden in game; MightPulse shows it (kingdom list: top 100 only). A kingdom's top 100 summed decide leading vs normal for migration (top 10% of each group = leading). Swordland Showdown troop power ≈ Migrant Score ÷ 317 (98 players, average error 1.7%; closer than total power + Mystic Trial).
- What counts (relative weight for the same power gained, same on every account, 11/04–11/06 tests): Governor Charms 1, Governor Gear (enhance) 1, pets (level-up, breakthrough and refinement) 1, research 1, Hero Gear (enhance and mastery) 1 — all sure; master affinity 0.5 (sure); master advancement ≈ 0.3 (the talent / skill part of its power doesn't count); stars of main heroes ≈ 0.2–0.5 (unsteady); 0 (sure): exclusive gear (widget upgrades), master skills, non-main heroes (stars, skills — R and SR alike), main heroes' levels, buildings other than the Town Center TG level, training or losing troops. Same power: Charms / Governor Gear / pets / research / Hero Gear = 2× master affinity, 2–5× hero stars.
- Formula CONFIRMED 11/04: Migrant Score = Σ (power × weight) × the account's rate — 11 single-item tests on two accounts (Charms ×4, pet level-up ×2, breakthrough ×3, refinement ×2), every prediction within 5 points, linear even for a +2.47M jump. 11/06 checks: research +164,400 power → +1,498 (exact), Hero Gear mastery +40,800 → +243 (predicted +242), Governor Gear +408,000 → +3,716 (predicted +3,717); exclusive gear +58,800 and buildings (+20,664, +78,064) → 0.
- Each account has its own rate for weight 1: Town Center 40 TG2 account ≈ 9,110 points per 1M power (≈ +29 Swordland power), Town Center 25 account ≈ 5,935. The same pet breakthrough (+91,440 power) gave +833 vs +543. More built-up account → more points for the same upgrade; what sets the rate (Town Center?) isn't known yet.
- Town Center: main account to TG2 (Barracks, Range also TG2) +10,077 at once (≈ +32 Swordland power, +5.0%); a normal level 24→25 ≈ nothing, other buildings 0 → guess: building power doesn't count, the TC gold (TG) level gives the jump, maybe by raising the account's rate (to confirm).
- Never goes down: losing troops or removing Hero Gear (770k removed, same 2 h later) doesn't lower it. Stat % don't count (only that level's power) → it shows investment, not stats.
- Updates every ~15–60 min, different time per account, not instant.
- Do: Governor Charms, Governor Gear, pets, research and Hero Gear first (they count the same — pick the cheapest power), then master affinity, then stars of main heroes; training troops and exclusive gear (widgets) don't help; save for the next TC gold level; opponent's Migrant Score ÷ 317 ≈ their Swordland troop power (investment only). The page has a calculator (upgrade + power gained + account rate → Migrant Score and Swordland power; someone's score → Swordland power).
- Not known yet: what sets each account's rate; why hero stars vary.

@rg
⚔️ RALLY & GARRISON report (🔬 Research sub-tab, officer-x7k2p9.html#rg, 集結與駐防) — Sherry's OWN RESEARCH (2026-11-07), NOT official; some points still being tested. Say so when you answer from it.
- A rally fights with the rally leader's stats, 3 heroes, City Bonus and rally-type Exclusive Gear. A garrison fights with the stats and 3 heroes of the defender who has the STRONGEST stats — not always the garrison leader (the leader only sets the troop capacity). Garrison-type Exclusive Gear (Zoe, Saul, Jabel, Eric, Hilde, Jaeger) works only in a garrison; rally-type (Amadeus, Petra, Helga, Marlin) only when you launch the rally.
- Joiners bring only troops (fighting with the leader's / strongest defender's stats) + their FIRST hero's top-right Expedition skill. 4 slots; the higher skill level wins first, same level → join order (a useless Lv5 pushes out a useful Lv4). Stars cap the skill: 1★ Lv2, 2★ Lv3, 3★ Lv4, 4★ Lv5 → joiner heroes need 4★. Heroes 2 and 3 only add march size.
- Hero skills are NOT in the battle report stats %; they are a separate layer. Same type adds, different types multiply (tested 11/07: Attack 25 + Health 25 + Lethality 25 measured ×1.961 vs ×1.953 worked out; Attack 25 + Attack 25 + Health 25 measured ×1.891 vs ×1.875 adding). Health +X, Damage taken −X and enemy Attack −X each ≈ ×(1+X); troops last longer, so they kill more — defense skills count about as much as attack. Enemy Attack − works on monsters too.
- Picks (Lv5): Bear Hunt → 2 Attack (Amane, Margot) + 2 Lethality (Chenko, Yeonwoo, Amadeus) ×2.25 (4 Chenko ×2.0); the Bear doesn't hit back so defense skills do nothing there. PvP rally and garrison → 4 different types, e.g. Amane + Chenko + Gordon + Howard ×2.34; Saul gives Defense + Health in one slot; all-defense Saul + Gordon + Howard + Fahd ≈ ×2.2.
- City Bonus counts only for the leader / strongest defender; joiners only gain from march size. Battle report stats = (1 + troop % + squad %) × (1 + City Bonus + Exclusive Gear) ÷ (1 + enemy debuff) − 1.
- After a capture the rally's survivors become the garrison. Several rallies on one target wear it down; put the rallies you can lose first, the strongest leader last (🟡). Infantry in front, cavalry rarely hit, archers can be hit early (Ambusher) (🟡). One big march beats two small ones (kills ≈ troops^1.6, 🟡).
- Not known yet: whether Damage taken − and enemy Attack − are one type; Defense-only skills; whether PvP gives exactly the same multipliers as monsters; best garrison troop ratio.

- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Hero skills apply to the whole rally once they trigger, even when the text doesn't say "all". (Strat Game Sloth (asked support)) | The Attack / Defense / Lethality / Health shown in the barracks are only for display; battles use other base numbers (infantry attack is always ¼ of archers', ⅓ of cavalry's). (Strat Game Sloth 2026-02 · Rocket Noodles) | A joiner's 2nd and 3rd heroes only add march capacity. Legendary or better Governor Gear also adds deploy capacity (the number isn't shown). (Strat Game Sloth · Rocket Noodles 2025-10) | Since the October update a rally leader can pin one joiner to the 2nd spot. Whether that joiner's skill always counts isn't known yet. (Rocket Noodles 2025-10) | Garrison captain = whoever arrived first or holds the building. To swap captains, pull the old one about 5 seconds before the new one lands — never leave it empty. (wetcat · WOSKing) | Refill a garrison 1–2 seconds after the first enemy rally lands (enemy march time − your march time − 1–2 s). Two rallies on one garrison must land in the same second — one second apart and the defender refills. (wetcat 2026-05 · Xora 2026-06) | Sending another march to the same garrison tops you up to your own garrison limit; extra troops are kept infantry first, then cavalry, then archers. (WOSKing 2026-11) | A rally leader who sends only 1 infantry gets the heroes home as soon as it falls, and can open the next rally right away. (Strat Game Sloth 2026-05) | Since the 10/19 update you can remove just the first hero on the deploy screen — if unsure who to bring as a joiner, remove it rather than bring the wrong joiner skill. (Falcon 2026-10)
@ma
🎓 MASTERS report (🔬 Research sub-tab, officer-x7k2p9.html#ma, 大師) — Sherry's OWN RESEARCH, STILL BEING TESTED (2026-11-12), NOT official; from Sparrow's screenshots of the four masters' skill tables, our battle formula, and web data for emblem counts. Say so when you answer from it.
- What we saw: a master's stats are your account's stats, so they only count when YOUR stats are used — your own marches, rallies you lead, garrisons you lead. When you join someone else's rally only the Squad size limit (出征容量) helps. Each 1% from Cassia adds 3–4× the Power of a Governor Charm, so Power grows much more than real strength (and master skills do not count in the Migrant Score).
- 💡 Suggestions, who to raise first (first → then → no hurry): rally leader / garrison lead: Cassia → Roman's first 3 advancements → Pan. Bear Hunt rally leader: Valora → Cassia → Pan. Mostly a joiner: Valora → Roman → Cassia. Arena: Roman. Development and gathering: Pan → Valora. Cassia's skills: Commando (突擊隊) and Inspiring Mobilization (徵召令) first; take the three combat skills to Lv5–10 each before going higher. Advancements: Roman's first 3 are the cheapest; Cassia's first 2 are also good value, from the 3rd it gets expensive.
- Cassia 卡斯蒂利亞 (Battle Master 戰術大師; talent Horn of Valor 衝鋒號): Expedition max Lethality + Health +20%; skills Firepower to Win 火力連 Attack + Defense +10%, Commando 突擊隊 Lethality + Health +10%, Inspiring Mobilization 徵召令 Rally capacity +100,000, talent Squad size limit +10,000, Recruiter In Chief 預備役 600 free soldiers a day. All maxed, estimated: Bear / Terror rally leader +20–30%, PvP rally leader +20–25%. Nothing to do with Truegold.
- Roman 羅曼 (Arena Champion): Expedition max Attack + Defense +15%; skills all in the Arena. Estimated Bear leader +2%, PvP rally leader +4%.
- Valora 維拉 (Bear Hunter): Expedition max Attack +15%; skills all in Bear Hunt — rally capacity +300,000, own Squad size limit +30,000, Hunter Instinct 狩獵本能 up to +30% to your own score, Forgehammers and Enhancement XP parts every hunt (Lv5: 5 each; one hunt every 2 days ≈ 15 a month ≈ 75 Forgehammers and 7,500 Enhancement XP). Stats ≈ +2%.
- Pan 潘 (Palace Administrator): Expedition max Defense +15%; skills all non-combat (Reserve Chests, Intel Missions, Governor Stamina, faster Construction). PvP rally leader ≈ +2%, Bear Hunt 0.
- Where each helps (✅ a lot / ⚠️ a little / — not): rally leader PvP — Cassia ✅, Roman ⚠️, Valora ⚠️, Pan ⚠️; garrison lead — same; Bear leader — Cassia ✅, Roman ⚠️, Valora ✅, Pan —; joining rallies / Bear — Cassia ⚠️ (Squad size limit only), Roman —, Valora ✅, Pan —; Arena — only Roman ✅; development — Cassia ⚠️, Roman ⚠️, Valora ✅, Pan ✅.
- Gems per 1% at the k-th Relationship Advancement (1 General Master Emblem ≈ 3,000 gems; emblem counts from the web): 1st Roman 3,200 / Valora·Pan 3,900 / Cassia 11,100; 2nd 5,900 / 7,400 / 11,100; 3rd 8,900 / 11,100 / 22,200; 5th 14,800 / 18,500 / 44,400; 10th 29,600 / 37,000 / 69,200. Emblems to max: Roman 440, Valora / Pan 275, Cassia 1,820. 1% of Lethality or Health is worth about 1.3× 1% of Attack or Defense.
- Cassia's skills cost Master's Manuscripts; 1 manuscript ≈ 30 gems (Championship Shop, Sparrow 2026-11-12: manuscript 15 coins, General Master Emblem 1,500 coins, so 1 emblem = 100 manuscripts). Gems per 1% from Lv2 to Lv20: Commando 8,000 → 150,000 (150,000 manuscripts to max), Firepower to Win 5,000 → 100,000 (100,000 to max); Inspiring Mobilization 150,000 manuscripts to max, Recruiter In Chief 13,500. So the first skill levels are cheaper than her advancements (11,100) and the last ones far dearer.
- Meeting them (from Sparrow's Realm Journey 荒野冒險 recordings): each master settles in at 1,000 Affinity; most meetings give +50, some +100 to +500; days are at 60–70 stops a day. Valora comes first (about 25 stops); Pan about 8–9 days after the first meeting; Roman turns up in bursts (200 → 1,000 took 4 days). There is no fixed order for masters added to the game later: Cassia was met last on older accounts only because she arrived later, a newer account can meet her very early; first meeting → settled took 4 days.
- Not known yet: the skills of the other four masters; how long from meeting Roman to settling in.
- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): All 8 masters share one skill-learning queue, and maxing everything takes about 990k manuscripts — so pick stop points: Pan first (his tree is the cheapest, about 21k), Valora to affinity 30 for Bear Hunt, Roman to 20 if you play Arena. (Rocket Noodles 2026-09) | Adventure Supply: 40 free a day, and you can hold 100 — anything over the cap is lost. Buying more costs 1,000 gems per 5. (Rocket Noodles 2026-06 · Strat Game Sloth) | Before a big master upgrade, check whether a Strongest Governor scoring day is close: 6,000 points per Master Emblem, 60 per Master's Manuscript. (Rocket Noodles)
@ls
🩹 BATTLE LOSSES report (🔬 Research sub-tab, officer-x7k2p9.html#ls, 戰鬥與損兵) — Sherry's OWN RESEARCH from our battle reports since October (2026-11-12), NOT official. Say so when you answer from it. Written so members understand what a battle costs.
- Troops that fall go one of three ways: lightly injured (輕傷, out of this fight but they stay with the march and can fight again — EXCEPT when defending a building (Sanctuary, Outpost, King's Castle): there they are sent home (no healing needed), so the garrison gets thinner with each attack and should be refilled between attacks; Sherry 2026-11-12 adopted this from Strat Game Sloth), injured (受傷, in the Infirmary 野戰醫院, can be healed), lost (損失, gone).
- General rule, in EVERY kind of battle: once the Infirmary is full, the injured that don't fit are lost. Apart from that, troops are lost only when you attack someone's Town (35% of the troops that fall) or fight over a Lv. 4 Outpost (10%). When the DEFENDING side of a report shows losses, it means their Infirmary was full — those are not the reader's troops.
- Split of the troops that fall (lost / injured / lightly injured): attacking a Town — attacker 35 / 10 / 55, defender 0 / 35 / 65; attacking gatherers or troops on the map — both sides 0 / 35 / 65; rally on a building or garrison — both 0 / 35 / 65; Swordland Showdown — attacker 0 / 45 / 55, defender 0 / 35 / 65; Outposts (據點; by LEVEL, not by which kind of Outpost — the game's own rule text, Lv3 also seen in a report 2026-11-12), both sides: Lv1 0 / 10 / 90, Lv2 0 / 20 / 80, Lv3 0 / 30 / 70, Lv4 10 / 30 / 60 (the only Outpost level that loses troops); Sanctuary and Fortress (遺跡、要塞) — both sides 0 / 30 / 70 (three Sanctuary reports, one Fortress report); Terror — almost all lightly injured. Infirmary full → the injured that don't fit become losses, in every battle type.
- 💡 Suggestions: before you can be attacked, heal your injured so the Infirmary has room; before attacking a Town, count on 35% of the fallen troops not coming back.
- Also: kills = the other side's lost + injured (lightly injured don't count); injured enter the Infirmary from the highest tier down; a Town with no troops inside means no battle and nobody hurt; in a rally or garrison each person's share of the fallen follows their share of that troop type; attacks hit the front line first (infantry, then cavalry, then archers), so infantry fall first and cavalry almost never fall; archers sometimes fall before the infantry are gone — that is the enemy cavalry's Ambusher (from T7, 20% of their attacks skip infantry; outside guides agree).
- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Of the troops lost to a full Infirmary, about 70% can be won back slowly at the Enlistment Office. (Strat Game Sloth 2025-08)
@gn
📺 GUIDE NOTES (🔬 Research sub-tab, officer-x7k2p9.html#gn, 攻略補充; added 2026-11-12, Sherry: the public guides were mostly written by others and are NOT changed — where well-known guide videos differ (≠) or add details (+), or show other alliances’ ideas, it goes here). From 684 YouTube transcripts (Strat Game Sloth and Rocket Noodles = high trust; wetcat, Xora, WOSKing, Kingshot by Efim, Falcon = medium). Every point names its channel; ✓ = our own reports agree. When you answer from it, name the channel. Sections:
- Eternity's Reach: ≠ public guide: the level 3 skill (5,000 copper each minute) only triggers on normal veins, not unstable ones. When unstable veins appear, keep sending one march to a normal vein every minute and recall it; send the rest to the unstable veins. Sending everyone away costs about 30,000 points. (Strat Game Sloth 2026-01)
- Swordland Showdown: + adds to the public guide: personal rewards follow Personal Relic Points. Defeating enemy troops gives only personal points — attacking 80 and defending 40 per 10,000 troop power — and holding buildings alone can't reach the top personal tier. Once our buildings are safe, spare marches can hit weak cities nearby. (Strat Game Sloth 2025-09 (may be outdated)) | + adds to the public guide: no troops die here. If your troops are spent, you can leave, wait 12 minutes, heal (healing speedups work) and come back in. (Strat Game Sloth)
- Tri-Alliance Clash: + adds to the public guide: be in the battle when it ends — no rewards if you're not there. Leaving means a 12-minute wait before you can rejoin. (Strat Game Sloth 2025-10) | + adds to the public guide: personal points come only from fighting — beating an enemy squad (NPC guards too) 3,500, being beaten 1,500; sitting on a building gives none. "First to capture the temple +50,000" is a rumor; only holding it at the end gives +50,000. (Strat Game Sloth 2025-10 (may be outdated)) | Not settled: Strat Game Sloth says Tri-Alliance buffs work live (a buff that runs out mid-battle is gone, so battle buffs go on within the last hour before it starts); a Korean table says they lock in at registration. We'll check with our own reports. (Strat Game Sloth 2025-12 vs a Korean table)
- Viking Vengeance: Rocket Noodles says the city owner gets 50% of a held wave's points. Our own reports show the owner gets a fixed 2,700 + 1,800 × wave and the reinforcers share half of that (owner about ⅔) — we go with ours. (Rocket Noodles 2025-09 vs our test; our reports agree)
- Outposts: + adds to the public guide: different levels of the same Outpost type stack (Lv. 2 + Lv. 4 Arsenal = 5% + 8%). One bug has been seen where a held Outpost wasn't counted — after capturing, check the Occupation Buff screen. (Strat Game Sloth 2025-09)
- Other events: Cesares Fury: always pick the highest difficulty; bringing Diana saves up to 20% stamina; you have 3 days. (Strat Game Sloth 2025-08) | Merchant Empire: launch caravans a few hours after the 00:00 UTC reset — fewer raiders then. (Strat Game Sloth 2025-07) | Alliance Mobilization: unfinished tasks carry over to the next day; after all milestones, every extra 200 points still gives a chest. (Strat Game Sloth 2025-08) | Golden Glaives: in the 8 hours before it starts, finish Intel Missions but don't turn them in; turn them in when it starts for extra rounds. (Strat Game Sloth 2025-06) | Castle Battle: the first one is around kingdom day 54, then about every 16–18 days; milestone rewards come even if the castle isn't held. (wetcat 2026-03) | Healing: heal in batches — only as many troops as one ally's help can finish at once (more allies helping, bigger batches). (Strat Game Sloth 2025-08)
- Other alliances' Bear Hunt ideas (for reference): Staggered Bear Hunt: each player's join amount is capped at about 1/14 of the alliance's average rally capacity, so everyone joins 3 waves with the same march. Scores are more even, but it needs watching for all 30 minutes. (Strat Game Sloth) | Some alliances run one hunt where strong leaders open rallies only for lower scorers, so everyone can set a personal best. (Kingshot by Efim 2026-05)
@tb
🦣 TERROR RALLIES report (🔬 Research sub-tab, officer-x7k2p9.html#tb, 巨獸集結) — Sherry's OWN RESEARCH, STILL BEING TESTED (2026-11-11), NOT official; from 13 Terror battle reports on Sparrow's two accounts (Lv3–Lv8). Say so when you answer from it.
- Terror (巨獸) = the second map monster type; each level is a different animal: Lv3 Great Moose (巨型駝鹿), Lv4 Alpha Black Panther (巨型黑豹), Lv5 Regal White Lion (巨型白獅), Lv6 Ironclad War Elephant (巨型戰象), Lv7 Ironclad War Bear (巨型戰熊), Lv8 Titan Roc (泰坦巨鳥). Lv1–2 are no longer on the map. Each level: stats about +110%, troops one tier higher.
- Game Recommended Power (推薦實力, whole rally): Lv3 5,480,000 · Lv4 37,797,400 · Lv5 142,724,200 · Lv6 279,000,000 · Lv7 683,100,000 · Lv8 1,356,300,000.
- Rally power ≈ leader's march power ÷ leader's march capacity × all troops in the rally (march power and capacity = top of the leader's march page, 3 heroes, full march; the battle uses only the leader's stats). Rally power ÷ Recommended Power: 1.5× or more easy (under 10% hurt); about 1× win, 20–30% hurt; about 0.7× barely win, about half hurt; under 0.5× lose. About ±30%; joiners should be about the leader's tier.
- Troops needed for 1× = Recommended Power ÷ leader's march power, in multiples of the leader's own march capacity (e.g. 100M leader: Lv6 2.8×, Lv7 6.8×, Lv8 14×).
- Sure: a Terror rally needs joiners to depart; it's a normal rally (one leader's stats); almost all hurt troops are only lightly injured, no troops lost in 13 reports; cavalry didn't fall, infantry and archers did. Likely: Recommended Power ≈ 1.25× the power that only just wins. Not known yet: more leaders to confirm, weaker joiners' effect, best troop mix.
@vv
🪓 VIKING REPORT tab (officer-x7k2p9.html#vv, 維京研究) — Sherry's OWN RESEARCH on Viking Vengeance (updated 2026-11-06), NOT official game rules; worked back from her screenshots and battle-report sums (11/03 difficulty 11, waves 1–20; 11/06 about 60 more reports) and it will keep changing as she tests more. Say so when you answer from it.
- 📄 Save as PDF (存成 PDF, top right of the tab, Sherry 2026-11-19): opens the browser print window with the report only, in light colours and in the language the page is in. Choosing "Save as PDF" there gives a file the officer can send to someone who cannot open this tab. Left out of the file: the calculator, the wave picker and the folded "how we worked it out" part; the file does not show this page's address or name. Nothing is uploaded; the report holds no member data.
- Each wave has a fixed number of Vikings; if the city holds, they all die. Kills are split by each person's troop count × troop tier (one troop's strength: VI 20, VII 27, T8 38, T9 50, IX TG1 54, T10 66, TG1 71, TG2 76, TG3 83 — 1 TG3 ≈ 1.17 TG1 ≈ 1.66 T9; same ratio for infantry and cavalry, checked on 41 infantry and 18 cavalry battles within 1%).
- Two piles: a cavalry pile = the number of Viking cavalry, for our cavalry, but only when Ambusher (奇襲, cavalry troop skill: 20% chance to bypass Infantry and attack Archers) triggers — and then cavalry may get all of it, part of it, or 0 (if it triggers late the infantry has already finished). No Ambusher → cavalry 0 and that pile goes to infantry. Everything else goes to infantry. Inside each pile: troops × tier (11/06: every person within 3 kills, even 14 people at the HQ). In the battle report's skill page the Ambusher line only appears when it triggered. Exception — a city short on infantry: cavalry and archers join in without Ambusher, cavalry can get part (or even more than the Viking cavalry).
- Hero skill kills (Marlin's stone, Petra's cut, hero domain…) go into the total and are shared by troops × tier, not kept by the hero's owner. Reinforcing archers always 0; the owner's own archers sometimes get a little (wave 17, 19 on 11/06; when is unknown).
- Points (normal city): the owner gets a fixed 2,700 + 1,800 × wave; the reinforcers share half of that, split by kills. Elite waves 7, 14, 17: both ×2. If the wave isn't cleared (not enough infantry) it still says Victory, but points = base × share killed (the report's loss rate; e.g. 65% killed → 65% of the points). A lone account holding its own city (no reinforcers) got ⅔ of the owner points (reason unknown). Kills by the owner's own troops → that part of the pile goes to nobody; a city with no reinforcer → nobody gets that pile. The page has a wave slider and a calculator (my infantry + tier vs. others' → my estimated points; assumes the wave is cleared and the owner's troops kill nothing).
- Waves 10 and 20 only attack the Headquarters (HQ), not the cities. HQ: kills split the same way; points = kills × a fixed rate (wave 20: 0.5253). 11/06 wave 20: each X TG3 infantry killed ≈ 0.83, each TG3 cavalry ≈ 0.96 (Ambusher triggered). The garrison captain gets no extra share. Which 4 reinforcers' joiner skills a city uses is picked as in a rally: higher skill level first, same level → join order (Sherry 2026-11-19; adopted 11/07 from the rally rule, not separately tested on Viking reports).
- Kills per 1,000 X TG3 infantry (11/06, average of cities; cities differ up to 2×): wave 1 4.5, 3 11, 4 19, 5 29, 7 52, 8 56, 9 71, HQ wave 10 45. A folded "three layers" part explains: 1) split inside a troop type (very exact), 2) total kills depend on the battle (needs a round-by-round simulation), 3) points = base × share killed.
- Do: reinforce with highest-tier infantry; city owners keep only archers at home; every city needs a reinforcer; spread infantry over several cities (except one that might fall); if you can't send everything, send infantry first and keep cavalry home; a city short on infantry (might not clear) gets infantry first — there the owner's Attack / Lethality buffs help.
- Doesn't change your points (in a city that clears the wave): Attack / Lethality / Defense buffs and pet debuffs (TESTED 11/06: on from wave 16, every share stayed exactly the same); which or how many heroes you send, or being the garrison captain (11/06 waves 13, 20); gambling on cavalry (11/06: same power, cavalry earned about ¼ of infantry).
- Not known yet: points when a city falls; why a lone account gets ⅔; how much infantry guarantees a clear; what decides cavalry's share after Ambusher; when the owner's archers score.

- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Waves 7, 14 and 17 skip offline owners, so whoever reinforces them gets nothing that wave — for those waves, reinforce members who are online. (Strat Game Sloth) | At difficulty 11, about 200–300k troops of T8–T9 or better inside a city usually hold all 20 waves. (Strat Game Sloth 2025-07 (another alliance)) | A wave counts as held only if at least 50% of the Vikings are killed. Fail twice in a row and the Vikings stop attacking that city — no more points from it. (wetcat 2026-02)
@bearplan
🐻 BEAR ANALYSIS tab (officer-x7k2p9.html#bearplan, 熊獵實測; a growthCol patch that carries a title now creates that trap's ranking table when it does not exist yet (before 2026-11-15 it was skipped silently, which is why the Trap 1 personal ranking of 11/13 did not appear); the folded detail table shows its hero and note cells in the reader's language — hero names in en / pt / ar / ko, notes in English outside Chinese, since those cells are typed in Chinese; admins: the 📥 Update data box also takes a small {"patch": [...]} JSON that changes only parts of the review already open; renamed from Bear plan 2026-11-07, Sherry: "it should be a measured analysis — merge things, correct old ideas, don't pile them up"). The old 11/01 rally-plan draft (fewer, stronger rallies; timeline) is no longer shown. Data from the research ledger (Project doc claude/bear-findings.md + csv), pasted by an admin with 📥 Update data and kept encrypted — names and numbers only come from the officer data, never guess them. Sections: SINCE 2026-11-11 it is one Bear page with 🐻 Bear Hunt report: chips at the top (🎯 Scoring = #bh; 👑 Leaders, 🦸 Joiners & heroes, 📈 Trend = #bearplan?r=leaders / heroes / trend; the 🚩 Sending troops report was removed 2026-11-11). Each officer report shows 🔎 What we saw (only what the page doesn't show below), 💡 Suggestions (advice, not rules), then its tables: Leaders → official A / B teams per trap as bars, 'Not leaders' folded, the full table folded; Joiners & heroes → 🦸 Leader hero sets (updated 2026-11-12, ledger A14): with hero portraits, how hard the rally hits with the same stats — Amadeus / Petra / Marlin 1.00, Amadeus / Jabel / Marlin 0.82, Zoe / Petra / Marlin 0.79, Zoe / Petra / Quinn 0.70; rally strength ≈ K × this number × joiner slots filled; with Petra, Zoe only adds Attack +25% (Sundering Wound does nothing on the Bear, Infinite Arsenal doesn't stack with Petra's Evil Eye); each rally swings about ±8% (the older simulated table where every set was within a few % is replaced); Trend → totals hunt by hunt + each player's troop factor. The 🐻 Bear analysis entry in the research bar is hidden — open it from the chips on the Bear page.
- Top: data range (Bear Trap 2 ×4 hunts, Bear Trap 1 ×2; 1,128 rally mails, Trap 1 only ARMADA's rally; 8 troop pages) and three numbers (Trap 2 total 11/06 19.10B, Trap 1 29.72B, 8 of 14 Trap 1 leaders without City Bonus).
- 📋 Official leader list (Sherry 11/07): per Bear Trap an A team that opens at 0:00 and a B team at +0:45; everyone else only opens with 6:30 left (non-leader rallies). The names are in the officer data.
- 👑 Leaders, one table per trap, sorted A → B → non-leaders (tag after the name); the Bear Trap 2 "Mails" column = each member's score in that rally ÷ the same person's score in ASHISH's rally that day (median, number of mails in brackets); K = (1 + archer Atk + troop Atk)(1 + City Atk + rally Exclusive Atk)(1 + archer Leth + troop Leth)(1 + City Leth + rally Exclusive Leth), ASHISH 11/06 = 1.00, next to the K the mails measured, and the City Bonus (shown as information — never pushed; Sherry 11/07: "don't force people to turn it on"). Mails come out ~10% below K (joiner and chance skills don't show). Trap 1 has two layers (HADES, Nia far above; 🟡, only ARMADA's mails).
- 🚩 Where marches score most: the rally you join matters most (same archer march 45–58M strong / ~40M middle / 10–20M weak); archers to the strongest rallies, 0-archer marches to later rallies; later rallies shouldn't take only infantry/cavalry (🟡); strong rallies fill in 20 s–2 min, later ones in the last minute; personal rank follows which rallies your marches joined (🟡); joiner skills: 4 slots, 6–12 people fight for them, 0 / 4 ≈ ×0.4–0.6, likely skill level first (🟡); one rally swings 10–25% per wave, up to 1.36×; City Bonus ≈ ×1.21 (+10/+10) to ×1.4 (+20/+20), leader's only — just information, don't push anyone.
- 🎯 Each player: troop factor = troop tier × (1 + Valora's Hunter Instinct), reference = 1.00; totals hunt by hunt per trap (folded, ▲▼).
- 📸 What to capture next hunt; 📋 full leader table with every input (folded).

@growth
🧭 GROWTH tab (officer-x7k2p9.html#growth, 發展方向, page title "Attack vs Defense / 進攻 vs 防守") — reference material (Sherry, 2026-10-31, for Armada and Nia): what an attack (rally) leader and a defense (garrison) leader need, Gen 1–5, from our battle reports and simulations. No names, nothing decided. Read-only text. (Governor Gear, gems and hero gear stat order is the same for both sides.)
- ⚔️ Attack (rally leader): heroes with offensive Widgets — infantry Amadeus (paid, the only infantry rally Widget) / Helga (paid), cavalry Petra (Hero Roulette) / Thrud (heavy spend), archer Marlin → Rosa (Hero Roulette) → Vivian. Widgets: Amadeus, Petra = rally Attack; Helga, Marlin, Rosa, Thrud = rally Lethality. Stats: infantry Defense + Health > archer Lethality > archer Attack > cavalry. Big rally capacity (one big rally beats two small). Ratio 50:20:30, infantry ≥ 40%. Strong target: rallies in a row, expendable first, strongest leader last. Joiners: first 4 with a hero, 2 Attack (Amane, Margot) + 2 Lethality (Chenko, Yeonwoo, Amadeus).
- 🛡️ Defense (garrison lead): the lead's key stat is GARRISON CAPACITY (how many troops can hold the building) — build it first (Sherry, 2026-10-31). The garrison uses the stats and hero skills of the strongest person inside. Heroes with defensive Widgets — infantry Eric / Alcar / Long Fei (Hero Roulette) / Zoe (Hero Roulette, F2P main), cavalry Jabel (free) / Margot / Hilde, archer Jaeger / Saul. Widgets: Zoe, Saul, Long Fei = garrison Attack; Jabel = garrison Lethality; Eric = garrison Defense; Hilde, Jaeger, Alcar = garrison Health. Same stat order. The lead takes about 32% more losses (B29) — Infirmary ready. High infantry share is right; with no cavalry in the garrison Margot's cavalry parts do nothing. Defensive Widgets also work when your own city is attacked (B16, B20).
- Hero Roulette heroes (Gen 1–5): Saul, Zoe, Petra, Rosa, Long Fei — for free players "free" basically means in the Hero Roulette (Sherry, 2026-10-31). Jabel: Mythic shards farmable. Amadeus, Helga: paid. Thrud: heavy spend.
- 🌳 WHEN TO PICK A DIRECTION (top card of the Growth page, Sherry 2026-11-04; our estimate from the 💎 Investment gems per +1%, ≈ 20,000 gems line): before these milestones everything helps attack, defense and Bear alike, so raise a bit of everything — Governor Charms all Lv3 (Lv4+ 2× dearer), research first levels of each tier up to tier V (VI far dearer), Governor Gear Epic 3★ (Epic T1+ far dearer), pets breakthrough to Lv50, Pan Lv60 (economy), Valora Lv30 (Leader By Example + Weapon Obsession: +5 × 100 Enhancement XP and +5 Forgehammers each Bear Hunt), the 3 main heroes' Hero Gear +60 and Mastery Forging Lv1. After that it splits: ⚔️ PvP rally leader (offensive Widgets, rally capacity, infantry Health > cavalry/archer Lethality, then Roman — the guide's big-spender / rally-leader order is Valora → Roman → Pan); 🛡️ garrison lead (defensive Widgets, garrison capacity); 🐻 Bear leader = a side branch of the rally leader (shares rally Widgets, rally capacity, City Bonus; stats only archer Attack × Lethality so Charms / Hero Gear for archers first — clashes with PvP's infantry Health; Valora's Dance of the Hunt to max, +30,000 rally capacity per level; battle pet skills don't work on the bear); 🤝 joiners need no direction (Pan → Valora → Roman; Valora's Savage Advantage adds to their own Bear Hunt march; non-battle pets Lion / Cheetah are the useful ones). Battle pet skills (Moose enemy Health ↓, Grizzly Bear enemy Lethality ↓): the guide lists only Beasts, Rebels, Terror rallies, Dreadwolf; in a rally only the leader's count; PvP rallies / garrisons unknown. Not known: whether rally leaders should still raise Pan first; whether pet battle skills work in garrisons. The 💎 Investment page's "My next step" links here.
- Follow the Widgets you already built.
- ⚙️ Stats & gear (both sides): strength = (1+Attack)(1+Lethality) × (1+Defense)(1+Health); +1 point is worth about 1 ÷ (100 + current %), so the LOWER stat gives more. Most people have Attack / Defense far above Lethality / Health, so Lethality + Health come first: Governor gems (that troop's Lethality + Health, Lv2 12% / Lv3 16% each), hero gear (helmet + boots = Lethality, gloves + chest = Health; enhance first, then mastery), Widget stats (first levels need only 5, 10, 15 parts — the cheapest 1%), hero talent at max, pets (lower the enemy's). Attack + Defense second: Governor Gear, hero level and stars, research, Master. Order for attack & defense leaders: infantry Health > cavalry / archer Lethality > infantry Defense > cavalry / archer Attack > cavalry Health / Defense (no use). Bear lead: archer Lethality > archer Attack > cavalry > infantry. Hero gear and Widget stats only count when that hero marches.
- Who fits: attack = highest board strength + offensive-Widget heroes; defense = big garrison capacity, often in our garrisons and the strongest there, with defensive-Widget heroes.
- 🦸 The hero details are on their own tab now: 🦸 HEROES (officer-x7k2p9.html#hr, 英雄; 🔬 Research, right after 🧭 Growth; button "🦸 Hero comparison, compare two heroes, joiners → Heroes" on this page).

- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Governor Gear: get all six pieces to the same tier first, then push three at a time, so you keep the 3- and 6-piece set bonuses. (Rocket Noodles 2026-09) | Infantry stats keep their value through every generation (infantry is always the front line); the damage side switches between archers and cavalry. (Strat Game Sloth 2025-12)
@hr
🦸 HEROES tab (officer-x7k2p9.html#hr, 英雄, in 🔬 Research right after 🧭 Growth; split off from Growth on 2026-11-05 because Growth got too long — Sherry): which hero is how strong and what to do with the others. SHOWS GEN 1–4 ONLY for now (Sherry 2026-11-28, asked by members: Gen 5 is not here yet) — Long Fei, Thrud and Vivian are hidden on this tab and on the public 🦸 Heroes research page; 🧭 Growth still lists them. Cards in this order: 🦸 Hero comparison, ⚖️ Compare two heroes, 🛡️ Garrison joiners, 🎯 Second uses, 📄 Generation 4 — what an outside guide says, then the 🃏 Hero Cards button. Choosing a direction (milestones, side by side, which heroes per side, stats & gear, who fits) stays on 🧭 Growth.
- 🦸 Hero comparison AS SHOWN NOW (Gen 1–4 only; the same model worked out again without the three Gen 5 heroes, so the gap is counted from the best hero that is left): PvP rally lead — infantry Alcar, Amadeus −47%, Eric −48%, Helga −51%, Zoe −54%; cavalry Petra, Margot −1%, Hilde −16%, Jabel −21%; archer Rosa, Jaeger −20%, Marlin −22%, Saul −39%. Garrison lead — infantry Alcar, Eric −48%, Zoe −54%, Amadeus −60%, Helga −63%; cavalry Margot, Hilde −15%, Jabel −20%, Petra −23%; archer Jaeger, Rosa −5%, Saul −24%, Marlin −26%. Bear lead — infantry Amadeus, Zoe −10%, Helga −17%, Alcar −31%, Eric −54%; cavalry Petra, Margot −12%, Jabel −18%, Hilde −23%; archer Rosa, Marlin −18%, Jaeger −39%, Saul −44%. Head to head as shown: Eric → Alcar +92% (garrison and PvP), Marlin → Rosa +22% Bear / +28% PvP and garrison. The older lines below that name Long Fei, Thrud or Vivian are the full Gen 1–5 numbers — use them only if someone asks about Gen 5.
- 📄 Generation 4 — outside guide card (🦸 Heroes tab, last card; Sherry 2026-11-28, from a "Generation 4 Guide" PDF a member passed on; NOT our data — say it is what an outside guide says, and give the mark): ❓ not tested by us — with Alcar and Margot garrisons move to 60:40:0 (infantry:cavalry:archers; cavalry kills archers fast, more infantry holds longer); attackers answer with 50:0:50 (archers cut through infantry-heavy defense faster than 50:20:30); accounts split into generalist / defense specialist (infantry + cavalry) / attack specialist (infantry + archers), two troop types cost less and a specialist wins in their field, risk = the meta changes later; Saul as third garrison hero with Alcar + Margot needs no 5 stars because without archers only his skills count (our comparison assumes archers in the garrison). ✅ matches our numbers — Alcar a must for garrison leaders (best infantry for garrison and PvP lead in our comparison); Margot for garrisons, skip her if you built Petra and do not defend, her Attack +25% makes her a joiner; Rosa strong Bear / attack lead but needs about Marlin's stars and Widget to replace him (ahead of Marlin at max in our comparison); free-to-play joiners Chenko / Yeonwoo (Lethality +25%), Amane (Attack +25%), Gordon (Health +25%), Saul (Defense +10%, Health +15%). ↔️ our numbers differ — the guide puts Alcar in place of Zoe against the Bear for players without Amadeus; in our comparison Zoe is ahead of Alcar there. NXS's own rule for rally joiners stays 50:20:30 with Chenko — this card does not change it.
- ⚖️ Compare two heroes (🦸 Heroes tab, card after 🦸 Hero comparison; Sherry 2026-11-03): pick a troop slot (infantry / cavalry / archer), two Gen 1–5 SSR heroes of that slot and each one's Widget level 0–10; bars show who is stronger as 🐻 Bear lead, ⚔️ PvP rally lead and 🛡️ garrison lead and by how many %. Same model as the hero comparison (max level and stars). Rally Widgets count only when opening a rally (Bear, PvP), garrison Widgets only in garrisons. Example: Petra vs Hilde, both max Widget — Bear Petra +29%, PvP rally Petra +20%, garrison Hilde +10%; Petra at Widget 7 vs maxed Hilde — Bear Petra +22%, PvP Petra +12%, garrison Hilde +12%. The same hero can be picked on both sides to compare two Widget levels (Sherry 2026-11-03): the Widget's troop Lethality + Health grow by max ÷ 10 each level (checked on Jabel, Zoe, Petra); its +15% skill unlocks at +2 and levels up at +4, +6, +8, +10 (confirmed by the kingshotmastery.com widget guide; Lv1 = ⅓ of Lv5 from our screenshots, even steps between assumed). E.g. Petra Widget 7 → 10: Bear about +6%, PvP rally about +7%. Choices are remembered on the device.
- 🎯 Second uses (🦸 Heroes tab, card after 🛡️ Garrison joiners; Sherry 2026-11-03, from claude/kingshot-hero-guide-gen1-5.md; Gen 1–5 + SR/R heroes only): a joiner only uses the FIRST hero's top-right skill — troop type, generation, stars and hero gear don't matter, so heroes weak as leaders can be great joiners. Damage joiners (Bear, PvP rallies), fixed: Amane / Margot Attack +25%, Yeonwoo / Chenko / Amadeus Lethality +25%, Vivian enemy damage taken +25%; chance-based: Marlin, Rosa, Zoe, Petra, Jaeger. Garrison joiners, fixed: Saul Def +10% + HP +15%, Gordon HP +25%, Hilde Atk +15% + Def +10%, Howard / Quinn damage taken −20%, Fahd enemy damage −20%, Eric enemy Attack −20%; chance: Jabel, Helga, Long Fei, Alcar. No use as joiners: Diana, R heroes (Forrest, Seth, Edwin, Olive). Garrison: 4 different kinds (same kind adds up with less each time; different kinds multiply), e.g. Howard + Saul + Hilde + Chenko. Two-in-one top-right skills (Saul, Hilde) are extra good. When we rally a garrison, defensive joiners cut our losses too. Green (development) skills work once unlocked without placing the hero (Saul construction +15% / cost −15%, Yeonwoo research +15%, Amane healing +50%, R heroes gathering +25%); gathering / beast-march speed may need the hero in that march (⚠️ not confirmed).
- Garrison hero skills come from the strongest hero (B29: from BOO, not the lead HADES); the other defenders' first hero's top-right skill counts too, like rally joiners (Sherry, 2026-10-31). 🛡️ Garrison joiners card (guides online + our calculation, not checked with battle reports): up to 4 count, each one's first hero top-right skill; higher skill level first, same level → first to join (garrison lead and R4/R5 can reorder). Same kind of bonus adds (diminishing), different kinds multiply → 4 different kinds best. Chance skills (Jabel, Helga): same one counts once. Combos vs best (Howard + Saul + Hilde + Chenko): 2 Gordon + 2 Howard −5% (Sherry's pick, good), 2 Chenko + 2 Amane −9%, 4 Gordon −19%.
- 🦸 Hero comparison (Gen 1–5 SSR, max level / stars / Widget, each troop slot on its own; number = how far behind the best of that slot; from claude/kingshot-hero-numbers.md), with hero pictures:
  PvP rally lead — infantry Alcar, Long Fei −28%, Amadeus −47%, Eric −48%, Helga −51%, Zoe −54%; cavalry Thrud, Petra −7%, Margot −8%, Hilde −22%, Jabel −26%; archer Vivian, Rosa −7%, Jaeger −26%, Marlin −28%, Saul −44%.
  Garrison lead — infantry Alcar, Long Fei −28%, Eric −48%, Zoe −54%, Amadeus −60%, Helga −63%; cavalry Margot, Hilde −15%, Thrud −18%, Jabel −20%, Petra −23%; archer Vivian, Jaeger −2%, Rosa −7%, Saul −26%, Marlin −28%.
  Bear lead — infantry Amadeus, Zoe −10%, Helga −17%, Alcar −31%, Long Fei −41%, Eric −54%; cavalry Petra, Thrud −6%, Margot −12%, Jabel −18%, Hilde −23%; archer Vivian, Rosa −23%, Marlin −37%, Jaeger −53%, Saul −57%.
  Head to head: Petra vs Margot (Bear: Petra +12%; PvP about the same; garrison: Margot +30% → keep Petra for rallies / Bear, Margot only for garrison cavalry); Eric → Long Fei +39%, → Alcar +92%, Long Fei → Alcar +38% (Long Fei's lead = higher troop bonus; Alcar's = infantry damage +100% and +60% stacking, not confirmed); Saul → Jaeger +32% in garrison (Bear +10%); Bear: Marlin → Rosa +22%, → Vivian +58%, Rosa → Vivian +29%; PvP: Marlin → Rosa +28%, → Vivian +38%, Rosa → Vivian +8%.
  Caveats: stars matter most (max stars here; a 5★ older hero can beat a 1★ newer one); assumes skill buffs multiply (if they add, fixed-buff heroes Amadeus, Helga, Hilde, Margot drop most); infantry gaps come mostly from troop bonus (generation).
- Button "🃏 Hero Cards" opens the main site's Hero Cards (Gen 1–8).
- 📺 From guide videos card (added 2026-11-12; outside guide channels, each point names its channel — say it comes from that channel, not from our research; treat as likely true, but our own measurements win where they differ): Triton: his first expedition skill is Defense +25% — the only joiner skill like it so far. His Warfare of Power is a new kind of damage bonus (up to 30%) that multiplies with the others. (Strat Game Sloth 2026-06) | Yang: 40% chance for archer damage +100%. Swapping Rosa for Yang as his Bear Hunt archer hero raised his score by 25–30%. (Strat Game Sloth 2026-06 (his own account)) | Sophia: only one skill that helps in Bear Hunt, and her Exclusive Gear is the garrison kind — not a Bear Hunt hero; better for holding several buildings in Swordland and for Tri-Alliance. (Strat Game Sloth 2026-06) | Gen 8: Diego is the first infantry since Zoe with all three skills worth about 25% each. Even when Ava leads, most rallies still want one Petra as a joiner — unless the leader already has Zoe or Petra. (Strat Game Sloth 2026-10) | Hero level doesn't change expedition stats — it only adds march capacity. (Strat Game Sloth 2026-01; our reports agree)
@attack
⚔️ BATTLE tab (officer-x7k2p9.html#attack, 作戰; it also holds 🔭 Scout) — ⚖️ SUPER COMPARE (超級比一比) + 📊 Today's strength + 🎯 KvK intel, from TODAY's MightPulse boards and the 🔭 Scout file
- Its own tab: hidden from everyone except admins until the 👥 table gives it.
- Taken out (Sherry, 2026-11-04 — judging a battle live was too much to fill in while fighting): the ⚔️ attack planner (rallies needed, waves, direction, tier mix, troop ratio) and the 🗡️ Swordland mode (fetch the opposing alliance, tick who plays, hold / take estimate). If asked, say they were removed and the ⚖️ Super compare replaces them.
- ⚖️ SUPER COMPARE (card at the top): pick two players (a find box + a list of everyone with a strength: today's MightPulse boards of #2189, other kingdoms in 🔭 Scout, snapshot players; sorted strongest first). Shows a verdict "B is about N% stronger than A" (under 10% = about equal; 30%+ = a lot stronger) from Strength, then mirrored bars per row: 💪 Strength, Governor Gear, Hero Gear, Masters, Governor Charms, Pets, Research, Troop power, Migrant Score, Power (rows nobody has are hidden; the bigger value is underlined), and tags: Town Center level, VIP (from 🔭 Scout), Amadeus / Helga stars ("max stars" at ★5; from the player's own record). Strength = Governor Gear + Hero Gear + Masters (millions); it ranked 7 rally leaders' real troop stats almost exactly. A player not in the top 100 of all three boards gets ≈ Strength estimated from Power. It shows investment only — not troops, tiers or troop type; VIP 9+ and max-star Amadeus / Helga add stats the boards can't see. The two picks are remembered on that device.
- No 🏰 / ⚔️ KvK switch any more (Sherry, 2026-11-04: keep it simple): the tab is ⚖️ Super compare → 📊 Today's strength (ONE list, everyone together, all kingdoms we have data for, top 30 by strength, find box, "Only NXS" button; NXS rows in bold) → 🎯 KvK intel → 🔭 Scout.
- 🗡️ SWORDLAND card (聖劍爭奪, under 📊 Today's strength; taken out 2026-11-04, back 2026-11-15 at Sherry's request — "the whole simple ranking"): ① our list = pick a shared 📊 Ranking plan (confirmed people, substitutes marked; untick who isn't playing); ② opponent = kingdom number + alliance tag → 🔄 Fetch (4 MightPulse calls, kept 10 minutes; the last 12 look-ups stay on this device 💾); 🔍 their whole member list with a search — tick who plays (✓ all / ✗ none / only the top N); 📊 ONE ranking of our ticked people + their ticked people by Strength (Governor Gear + Hero Gear + Masters; ≈ = estimated from Power) and Power, and after each Strength a mark ≫ ＞ ≈ ＜ ≪ against one person 📍 (our strongest confirmed player by default; tap 📍 on any row to change). 2026-11-18, Sherry: Swordland is read like KvK — only who is stronger; the one-rally estimate (hold / take), its settings (troops per person, rally cap, tiers) and the ⚠️ watch marks were removed and no longer exist.
- 🎯 KvK opponent intel (KvK 對手情報, card under 📊 Today's strength, always shown since 2026-11-04; Sherry 2026-11-01): built from the 🔭 Scout file of the opponent kingdom (+ the daily snapshot for our side). Sections: 🏰 Kingdom side by side (#2189 vs them: total / average power, players, active 7 d / 30 d, alliances, heroes, troops, hero gear, governor gear, charms, pets, masters, research, kills, 7-day power gain, 7-day TC upgrades, age; last column = them vs us in %, green = we're ahead); ⚔️ Main fighters rank by rank (their #1–20 by Strength next to ours, gap); 📋 their main fighters in detail (hero gear, gov gear, charms, master, troops, best hero, pets in millions + their kingdom rank); 🦸 their main fighters' heroes (5 heroes: level, stars, Widget level; "Most used" counts); 🛡️ their alliances (power, members, TC max / avg, R4/R5 names); 📍 castles and shields (X:Y, shield until). Several opponents scouted → pick one with the #kingdom buttons. A kingdom scouted before 2026-11-01 needs 🔄 Fetch once in 🔭 Scout to fill the new parts. Not available on the free MightPulse key: event scores, troop counts, research details, players below the top 100 of a board.
- Card "📊 Today's strength" (今天的強度): board date, top 15 of NXS and of other alliances (strength, gear, hero equip, master), and a search (tells which board a player is missing from).
- ⚡ KvK week live boards (KvK 週每 2 小時更新; Sherry 2026-11-06): during KvK week (Prep Day 1 → Battle Day, same cycle as the calendar) a light job fetches only the 4 boards Compare uses (Governor gear, Hero equip, Master power, Power), top 100, for #2189 and the 🔭 Scout kingdom marked "update daily" (the KvK opponent), every 2 hours — no player profiles. ⚖️ Compare and 📊 Today's strength use them when they are newer than the daily snapshot. The line under the board date shows when they were fetched, the time of MightPulse's own data, and whether anything changed since the last fetch (if MightPulse itself only refreshes once a day, it will say "same as the last fetch"). Outside KvK week it does nothing; an admin can run "KvK live boards" by hand in GitHub Actions.
@hunt
🎯 BLACKLIST (officer-x7k2p9.html#hunt, 黑名單) — All Out: where listed players' castles are and whether their shield is up
- Its own tab: hidden from everyone except admins until the 👥 table gives it. Officers with edit add players by their player ID (the number on the in-game profile) plus an optional note, remove them with ✕, then 💾 Save list (encrypted, data/blacklist-x7k2p9.json).
- Every listed player is looked up on MightPulse only when an officer presses ↻ Reload (the Cloudflare Worker; needs the MIGHTPULSE_API_KEY Worker secret) — there is no timed polling, because MightPulse's positions and shields only change after someone presses "Update Map" on its map. Right after the list is saved a GitHub job looks up only the players that have no data yet (about 2 minutes) — adding someone does not re-fetch the whole list. ↻ Reload asks for a fresh look-up at once (at most every 2 minutes). To save MightPulse calls (5,000 a day, shared with the other tabs) the blacklist uses at most 2,000 a day; past that it waits for the next UTC day. MightPulse keeps its own copy of each player and refreshes it only when it is older than 60 minutes, so positions can be up to about an hour old — always read the data time.
- The table shows the in-game name (note and ID under it), alliance, kingdom, castle X:Y with a copy button, shield ("🛡️ until …" or "— none") and the time of the data. No online / last login / active counts anywhere on the site (Sherry 2026-11-18: never wanted; the game stopped sending them). Positions and shields only change on MightPulse after someone presses "Update Map" on its map. Every time is written "MM-DD HH:MM UTC (MM-DD HH:MM local)" — never "x minutes ago". "Data fetched …" at the top is when the job last ran; the page reloads the data by itself every minute (↻ Reload does it at once).
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

@tr
🧳 TRANSFER (officer-x7k2p9.html#tr, 移民名單; since 2026-11-08) — the November Kingdom Transfer (王國移民): players from other kingdoms who want to move INTO #2189, their MightPulse data, and whom to invite
- Its own top-level tab (not inside 🐝 Hive): hidden from everyone except admins until the 👥 table gives it. ✏️ edit = add / change / look up; 👁️ view = read the table, filter, search, 📋 copy and ⬇️ CSV only.
- Top line = the settings: transfer group K2106–K2234, Transfer Power Cap (移民實力限制) 170M, Ordinary Kingdom (普通王國) quota 35 Ordinary Invite (普通邀請) + 20 Transfer Opens (自由移民) + 3 Special Invite (特殊邀請). Editors change them under ⚙️ Settings. Three counters show how many slots of each kind have been chosen (a row with a slot counts). There is NO status any more (Sherry 2026-11-09): everyone on the list is interested by definition.
- ➕ Add players: paste a list, one player per line, in any order — optional row number, name, 9-digit player ID, TC/TG (TG3, TC30), power (150.4M or 92,370,087), "#2188" for a kingdom — plus a Source label (e.g. "SAQ #2188", "list A"). 🏰 Import a whole alliance: kingdom number + alliance tag (+ source) — the look-up adds every member. Then 💾 Save.
- 🔎 Look up with MightPulse saves the list with a request (encrypted, data/transfer-x7k2p9.json); a GitHub job (Transfer list look-up) fills each player in: players with an ID get name, kingdom, alliance, Town Center / TG, power, Migrant Score, Mystic Trial, VIP, kills. Players with NO ID are searched by name ONLY in the kingdom written in their source (e.g. "list A #2188") or row — not across the whole group, to save MightPulse calls (Sherry 2026-11-08: officers find one or two names on MightPulse by hand to learn the kingdom, or just import the whole alliance with kingdom + tag). Search there: top 100 Migrant Score and power boards, then alliance member lists; names compared without case, spaces or decorations like ᴺᵉˣᵘˢ / 亗 / [TAG]). One match → filled in; several → "N possible — pick one" on the row (kingdom, alliance and power shown — pick the one whose power fits the list); none → "🔎 not found". It takes about 2–15 minutes (the button says how long; the page updates by itself). Names seen are remembered for 3 days, so the next look-up is quicker. Each run has a limit (30 min, 600 calls); when MightPulse is slow and players are left, the job keeps the request and starts the next round BY ITSELF (up to 5 rounds) — "N not done yet" means it is still going; tap ↻ Refresh later (fixed 2026-11-09 after an "↻ update all" brought back only 8 players). While a look-up is running the 🔎 button is greyed out; rows still waiting (↻ marks, IDs not filled) are picked up by the automatic next round, and an admin can also start the job by hand (GitHub → Actions → Transfer list look-up → Run workflow), which processes waiting rows even without a new 🔎. Players already filled in are NOT fetched again (each 🔎 only does new rows, new IDs and names not found yet). 🔴 RED GEAR (Milk 2026-11-08, "how many pieces of red gear on their arena players"): each MightPulse look-up also reads the heroes MightPulse shows for the player (usually 5, with 4 gear pieces each) and counts the red (mythic) hero gear pieces → column "🔴 Red gear" as red / all pieces (e.g. 14/20), sortable. Rows looked up before this need "↻ Update all shown" + 🔎 once. MightPulse's 5 heroes are the ones on the player's profile — not confirmed to be exactly the arena line-up. ⬇️ EXCEL (Milk's own layout, 2026-11-09): next to 📋 Copy / ⬇️ CSV, "⬇️ Excel" downloads an .xlsx made like Milk's "Interested Roster" sheet — one table per list side by side, titled like "Kingdom 2231 WIN" (most common kingdom + alliance of the list), English headers # · Player Name · TC · Mystic Trial · Power (e.g. 120.6M) · Red Gear of Top 10 · Gov ID; TC written as the main level like Milk's (TG2, not TG2-3); sorted TG3 → TG2 → TG1 → TC, strongest first; red gear is filled for everyone (the header text stays Milk's "Red Gear of Top 10"); tables sit side by side with no gap column, biggest list first (same size → higher kingdom number first); lists with fewer than 5 players go together into one "OTHERS" table (no #, names as [TAG]Name); players MightPulse couldn't find show "Unlocatable"; a note with 🇰🇷 / "Korean" / Boo gives a purple name cell plus the line "Korean = confirmed by Boo"; power over the cap is shaded. Plain values, no formulas — copy it or File → Import into Google Sheets. Changes made in the file do NOT come back to the site. ☑️ BATCH EDIT (Sherry 2026-11-08): editors tick the box at the left of rows (the top box ticks all rows shown); a bar above the table then adds the same text to everyone's note (e.g. "🇰🇷 Boo" for the Korean players Boo confirmed; not added twice) or sets their slot at once; ticks stay while searching/filtering, so names can be found one by one; then 💾 Save. SORT: tap any column header (tap again = reverse), or use the "↕" box next to the filters (Power, 🔴 Red gear, Mystic Trial, Migrant Score, Town Center, Kingdom, Name — big first). MIGHTPULSE FIRST, ORIGINAL KEPT (Sherry 2026-11-08): once a player is found, the table shows the MightPulse name, TC/TG (e.g. TG2-3) and power; what was pasted is kept in the file — shown under the value when it differs ("listed: …") and exported in 📋 Copy / ⬇️ CSV as extra columns "Listed name / Listed TC / Listed power" plus "Differs from list" (name / TC main level / power more than 5 %). ↻ UPDATE (Sherry 2026-11-08): editors tap ↻ on a row (next to ✕) to mark that player for a fresh MightPulse fetch, or "↻ Update all shown (N)" above the table to mark every row currently shown (after filter / search); the marks wait ("N waiting for update — press 🔎") until 🔎 is pressed, then each costs 1 call and the mark clears. Name matching also ignores "font" letters (small caps ᴍᴀs, ｆｕｌｌ width, 𝐛𝐨𝐥𝐝 etc.).
- The table shows only what MightPulse gives (Sherry 2026-11-09: nothing we compute ourselves): one row per player, sortable by any column (tap the header, or the ↕ box), filter by source, find box. Columns: name, slot (Ordinary Invite / Transfer Opens / Special Invite), source, kingdom, alliance, ID (editors can type or fix it), Town Center, power, 🔴 red gear, Migrant Score (遷城分數 — MightPulse's name), Mystic Trial, note. ✕ removes a row. Rows with a slot are tinted green.
- "🎟️ over cap" next to power = above the Transfer Power Cap: only a Special Invite can bring that player. The power shown is MightPulse's; the game's Transfer Power also adds injured troops and the Enlistment Office, so it can be a bit higher.
- No Transfer Pass estimate or Swordland estimate is shown any more (removed 2026-11-09). The pass research (≈ Migrant Score ÷ 33,600, NOT CONFIRMED) is only a research note — say so if asked.
- 📋 Copy / ⬇️ CSV export the rows currently shown (after filter and search).
- The officer data part TRANSFER (below, for officers with this tab) lists every player with source, slot, kingdom, alliance, TC, power, 🔴 red gear, Migrant Score, Mystic Trial and note.

KVK CHECKLIST (main site, for everyone)
- From the day before KvK until the last day, a 📋 button at the bottom right of the main site shows that day's KvK checklist (KvK Prep Day 1–5, then Battle Day). Members tick items; ticks are saved on their own device.
`;

async function getText(file, fresh) {   // fresh: skip Cloudflare's 5-minute copy (a plan just saved shows within ~1 min = the site's publish time)
  const r = await fetch(SITE_BASE + file + (fresh ? "?t=" + Date.now() : ""), fresh ? { cf: { cacheTtl: 0 } } : { cf: { cacheTtl: 300 } });
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
const RESEARCH_TABS = ["iv", "growth", "hr", "ms", "bh", "bearplan", "vv", "rg", "tb", "ls", "ma", "gn"];   // 🔬 all opened by the one "research" permission
const AI_TAB_NAMES = { events: "📅 Events", board: "💬 Board", map: "🗺️ Map", plan: "🚩 Territory", move: "🐝 Hive", hunt: "🎯 Blacklist", attack: "⚖️ Compare", tr: "🧳 Transfer", growth: "🧭 Growth", hr: "🦸 Heroes", bearplan: "🐻 Bear analysis", vv: "🪓 Viking report", rg: "⚔️ Rally & Garrison", tb: "🦣 Terror rallies", ls: "🩹 Battle losses", ma: "🎓 Masters", gn: "📺 Guide notes", ms: "🧳 Migrant Score", bh: "🐻 Bear Hunt report", iv: "💎 Investment", research: "🔬 Research", ranking: "📊 Roster", attend: "📋 Attendance", post: "📢 Post", watch: "🕵️ Watchlist", scout: "🔭 Scout", views: "📈 Views", perms: "👥 Officers", ws: "🗂️ My workspace" };
const AI_TAB_LINKS = {
  events: "[Events](officer-x7k2p9.html#events) (week calendar, officer to-dos, in-game guides to copy, add/edit events)",
  board: "[Board](officer-x7k2p9.html#board)", map: "[Map](officer-x7k2p9.html#map) (kingdom map, Outpost plan)", plan: "[Territory](officer-x7k2p9.html#plan) (banner planning for NXS and the Academy, banner check, resource nodes, Academy roster)",
  move: "[Hive](officer-x7k2p9.html#move) (alliance move, member positions)", hunt: "[Blacklist](officer-x7k2p9.html#hunt) (All Out blacklist: location and shield of listed players)", ranking: "[Roster](officer-x7k2p9.html#ranking) (member ranking, power, TC, Mystic Trial, battle tables)",
  attend: "[Attendance](officer-x7k2p9.html#attend)", post: "[Post](officer-x7k2p9.html#post) (post / edit announcements)",
  watch: "[Watchlist](officer-x7k2p9.html#watch) (name changes, power history, who left/joined, notes)",
  growth: "[Growth](officer-x7k2p9.html#growth) (proposal: how we grow attack / defense / Bear leaders)",
  hr: "[Heroes](officer-x7k2p9.html#hr) (hero comparison, compare two heroes, garrison joiners, second uses)",
  bearplan: "[Bear analysis](officer-x7k2p9.html#bearplan) (measured Bear Hunt analysis: leaders, where marches score most, each player)",
  iv: "[Investment](officer-x7k2p9.html#iv) (our research, still testing: gems per +1% for each upgrade, what rally leaders and joiners should spend on)",
  bh: "[Bear Hunt report](officer-x7k2p9.html#bh) (our research for members: how Bear Hunt scores work, what to bring, which rally)",
  ms: "[Migrant Score](officer-x7k2p9.html#ms) (our research, still testing: what raises the hidden Migrant Score / Swordland power)",
  vv: "[Viking report](officer-x7k2p9.html#vv) (our research: how Viking Vengeance splits kills and points, what to send)",
  rg: "[Rally & Garrison](officer-x7k2p9.html#rg) (our research: who counts in a rally / garrison, which joiner heroes to bring, how skills stack)",
  ma: "[Masters](officer-x7k2p9.html#ma) (our research, still testing: which master to raise first by role, what each gives, gems per 1%)",
  gn: "[Guide notes](officer-x7k2p9.html#gn) (what well-known guide videos say that differs from or adds to our public guides, and other alliances' ideas — each point names its channel)",
  ls: "[Battle losses](officer-x7k2p9.html#ls) (our research: where fallen troops go in each kind of battle and when troops are really lost)",
  tb: "[Terror rallies](officer-x7k2p9.html#tb) (our research, still testing: how big a rally each Terror level needs, from the Recommended Power)",
  attack: "[Compare](officer-x7k2p9.html#attack) (⚖️ compare two players, today's strength list, KvK intel, scouting other kingdoms)",
  tr: "[Transfer](officer-x7k2p9.html#tr) (Kingdom Transfer list: players who want to move to #2189, MightPulse look-up, invites)",
  views: "[Views](officer-x7k2p9.html#views)", perms: "[Officers](officer-x7k2p9.html#perms)",
  ws: "[My workspace](officer-x7k2p9.html#ws) (the officer's own private notes and reminders — you cannot read what is in it)",
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
  // 🔬 one "research" permission opens every research report (Sherry 2026-11-04); once it is set, the old one-per-report keys no longer count
  if (role !== "admin") { const p = u.perms || {}; for (const k of RESEARCH_TABS) tabs.delete(k);
    const on = "research" in p ? (p.research === "view" || p.research === "edit") : RESEARCH_TABS.some((k) => p[k] === "view" || p[k] === "edit");
    tabs.delete("research"); if (on) for (const k of ["research", ...RESEARCH_TABS]) tabs.add(k); }
  return { role, tabs, side: role !== "admin" && (u.side === "m" || u.side === "f") ? u.side : "", token: await seal(env, c.s) };   // 🏰 side: the alliance an officer is set to on 👥 (none = both)
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
const DATA_TABS = [["ROSTER", ["ranking", "watch"]], ["WATCH", ["watch"]], ["OTHER ALLIANCES", ["watch"]], ["SCOUT", ["attack"]], ["TRANSFER", ["tr"]], ["OUTPOST PLAN", ["map", "plan"]]];
/* 🏰 ROSTER / WATCH / OUTPOST PLAN come once per alliance ("### ROSTER" = NXS, "### nxs ROSTER" = nxs): an officer set to one alliance on 👥
   (side "m" / "f") gets only that alliance's; everyone else gets both, each under its own heading. The other parts are the same for both. */
const DATA_SPLIT = ["ROSTER", "WATCH", "OUTPOST PLAN"];
function officerDataFor(text, tabs, side) {
  const parts = String(text || "").split(/\n(?=### )/);
  const keep = parts.filter((p0) => {
    if (!p0.startsWith("### ")) return true;   // the "===== OFFICER DATA" title
    if (p0.startsWith("### nXs ")) return false;   // the old nXs (now our farm): parts from before 2026-11-21 are no longer given out
    const f = p0.startsWith("### nxs "), p = f ? "### " + p0.slice(8) : p0;
    if (side && DATA_SPLIT.some((h) => p.startsWith("### " + h)) && (side === "f") !== f) return false;
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

/* 🗡️ Swordland Showdown opponent (⚔️ Battle tab): an alliance of another kingdom, fetched when an officer asks (the matchup is known
   ~15 minutes before the fight). 4 MightPulse calls: the alliance roster + the kingdom's Governor gear / Hero equip / Master power boards
   (top 100). Kept 10 minutes in the DO so several officers asking at once cost nothing extra. */
async function ssPullRoute(req, env, body) {
  const acc = await officerAccess(req, env, body);
  if (!acc || !acc.tabs.has("attack")) return json({ error: "forbidden" }, 403);
  const kid = Math.floor(+body.kid || 0), tag = String(body.tag || "").trim().slice(0, 8);
  if (!kid || kid > 99999 || !/^[\w\p{L}\p{N}]{1,8}$/u.test(tag)) return json({ error: "bad request" }, 400);
  if (!env.MIGHTPULSE_API_KEY) return json({ error: "no_key" }, 503);
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all")), key = `ss:${kid}:${tag.toLowerCase()}`;
  const old = await stub.kvGet(key);
  if (old && !body.force && Date.now() - Date.parse(old.fetched) < 600000) return json({ ok: true, ss: old, token: acc.token });
  const get = async (path) => { const r = await fetch("https://api.mightpulse.com/v1" + path, { headers: { Authorization: `Bearer ${env.MIGHTPULSE_API_KEY}` } }); return { status: r.status, body: await r.json().catch(() => null) }; };
  const [al, ...bd] = await Promise.all([get(`/alliances/${kid}/${encodeURIComponent(tag)}?include=info,roster`), ...["gov_gear", "hero_equip", "master_power"].map((b) => get(`/kingdoms/${kid}/ranks?board=${b}&limit=100`))]);
  if (al.status !== 200 || !al.body || !al.body.alliance) return json({ ok: false, error: al.status === 404 ? "not_found" : "mp_" + al.status, token: acc.token });
  const score = {}; ["gov_gear", "hero_equip", "master_power"].forEach((b, i) => { for (const r of ((bd[i].body && bd[i].body.board && bd[i].body.board.rows) || [])) (score[String(r.governor_id)] = score[String(r.governor_id)] || {})[b] = r.score; });
  const a = al.body.alliance;
  const ss = { fetched: new Date().toISOString(), kid, tag: a.abbr || tag, name: a.name || "", power: a.power ?? null, count: a.count ?? null,
    members: (al.body.members || []).map((m) => ({ id: String(m.governor_id), name: m.nick_name, power: m.power ?? null, tc: m.town_center_level ?? null, rank: m.alliance_rank_label || "", b: score[String(m.governor_id)] || {} })) };
  await stub.kvSet(key, ss);
  return json({ ok: true, ss, token: acc.token });
}

/* 📍 "Where's my spot?" (public site, Nia & Sherry 2026-11-05): the 🐝 Hive moving plan — every planned city with the member put there,
   Bear Traps, HQ, banners — so members check their new X:Y before teleporting. Names follow the daily roster (a plan name that
   clearly means one roster member shows as that member's current name). 🐻 BT1 / BT2 from the shared marks. Nothing else of the
   plan or the roster (no power, no IDs) leaves the Worker. Cached 2 minutes. */
/* 📍 positions only (Sherry 2026-11-11: "the move plan only needs where they are now — like the blacklist, not the whole roster").
   Every roster member's castle X:Y in batch calls (/players?ids=, 50 per call); kept in the DO as "pos-live" so 🐝 Hive, 🚚 Move and the
   public spot page all use it. Officers with the Move, Hive or Map tab only.
   2026-11-18 — the data source now counts EVERY id in a batch as one request, 60 a minute per account: 98 members no longer fit in one
   minute, the second batch got 429 and those members vanished from the positions. So: before each further batch, wait for the minute
   bucket to reset when the batch does not fit what is left of it (the response headers say how much is left and when it resets); a 429
   waits and tries once more; and a member who still cannot be read keeps the position from last time (marked old) instead of vanishing. */
/* 2026-11-18 (later the same day): holding the page's request open while the Worker waits for the next minute did not work — a phone
   gives up on a request that stays silent for about a minute ("positions couldn't be fetched"). So the Worker never waits: ONE call does
   the batches that fit the minute bucket right now, keeps what it has in the DO ("pos-job"), and answers { more: { wait, got, total } };
   the page waits that long (showing the progress) and calls again until the answer has no "more". */
async function positionsTick(env, w) {   // w "f" = nxs (2189 nxs, our second alliance): their roster file, kept as "pos-live-f" (2026-11-15)
  if (!env.MIGHTPULSE_API_KEY || !env.TIMERS) return null;
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all")), key = w === "f" ? "pos-live-f" : "pos-live", jkey = w === "f" ? "pos-job-f" : "pos-job";
  let job = null; try { job = await stub.kvGet(jkey); } catch (e) {}
  if (!job || !job.ids || Date.now() - job.at > 300000) {   // no look-up under way (or one abandoned 5 minutes ago) → start one
    let roster = null; try { roster = await openData(JSON.parse(await getText(w === "f" ? "data/n2-roster-x7k2p9.json" : "data/roster-x7k2p9.json")), env); } catch (e) { return null; }
    const ids = [...new Set(((roster && roster.members) || []).map((m) => String(m.id || "").replace(/\D/g, "")).filter(Boolean))].slice(0, 200);
    job = { at: Date.now(), ids, i: 0, rows: {}, fail: [], tries: 0 };
  }
  const { ids, rows, fail } = job;
  const call = (part) => fetch(`https://api.mightpulse.com/v1/players?ids=${part.join(",")}&include=base&max_age=300&wait=25`, { headers: { Authorization: `Bearer ${env.MIGHTPULSE_API_KEY}` } });
  const more = async (wait) => { job.at = Date.now(); await stub.kvSet(jkey, job); return { more: { wait: Math.max(1, Math.min(62, Math.ceil(wait))), got: Object.keys(rows).length, total: ids.length } }; };
  while (job.i < ids.length) {
    const part = ids.slice(job.i, job.i + 50);
    let left = null, resetAt = 0;
    try {
      const res = await call(part);
      if (res.status === 429) {   // the minute is used up (another job is running, or a look-up a moment ago)
        if (++job.tries >= 3) { fail.push(...ids.slice(job.i)); break; }   // refused three times → stop asking; the rest keep last time's position
        return more((+res.headers.get("Retry-After") || 60) + 1);
      }
      job.tries = 0;
      const rem = res.headers.get("X-RateLimit-Remaining-Minute"), rst = +res.headers.get("X-RateLimit-Reset-Minute") || 0;
      left = rem == null || rem === "" ? null : +rem; resetAt = rst ? rst * 1000 : Date.now() + 61000;
      const b = await res.json().catch(() => null), ps = (b && (b.players || b.results || b.data)) || [];
      for (const it of Array.isArray(ps) ? ps : Object.values(ps)) { const p = (it && (it.player || it)) || {}, id = String(p.governor_id || p.fid || (it && it.id) || "");
        if (!id) continue;
        rows[id] = { id, name: p.nick_name ?? null, x: p.x ?? null, y: p.y ?? null, alliance: (p.alliance && p.alliance.abbr) ?? null, asOf: (it && (it.cached_at || it.updated_at)) || null }; }
      for (const id of part) if (!rows[id]) fail.push(id);
    } catch (e) { fail.push(...part.filter((id) => !rows[id])); }
    job.i += 50;
    const next = Math.min(50, ids.length - job.i);
    if (next > 0 && (left == null || left < next)) return more(((resetAt || Date.now() + 61000) - Date.now()) / 1000 + 1.5);   // the next batch does not fit this minute
  }
  let prev = null; try { prev = await stub.kvGet(key); } catch (e) {}
  const n = Object.keys(rows).length;
  for (const id of fail) { const o = prev && prev.rows && prev.rows[id]; if (o && o.x != null && o.y != null) rows[id] = { ...o, old: 1 }; }   // not read this time → last time's position stays
  const live = { fetched: new Date().toISOString(), rows, fail: fail.length, n };
  await stub.kvSet(key, live); await stub.kvSet(jkey, null);
  if (w !== "f") hiveCache = { at: 0, body: null };
  return { live };
}
async function positionsRoute(req, env, body) {
  const acc = await officerAccess(req, env, body);
  if (!acc || !["move", "map", "hive"].some((k) => acc.tabs.has(k))) return json({ error: "forbidden" }, 403);
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all"));
  const w = body.w === "f" ? "f" : "";
  let live = await stub.kvGet(w ? "pos-live-f" : "pos-live"), more = null;
  if (body.refresh) { const job = await stub.kvGet(w ? "pos-job-f" : "pos-job"), under = job && job.ids && Date.now() - job.at <= 300000;
    if (under || !live || Date.now() - Date.parse(live.fetched) > 60000) { const r = await positionsTick(env, w); if (r && r.live) live = r.live; else if (r && r.more) more = r.more; } }
  return json({ ok: true, live: live || null, ...(more ? { more } : {}), setup: !!env.MIGHTPULSE_API_KEY, token: acc.token, mapUrl: "https://mightpulse.com/map?kid=2189" });   // the link is only ever sent to officers (never in public files)
}
let hiveCache = { at: 0, body: null };
async function hiveRoute(env) {
  if (hiveCache.body && Date.now() - hiveCache.at < 30000) return json(hiveCache.body);
  /* officers open / hide the page with 🌐 on 🐝 Hive (data/hive-public.json { on }); hidden = nothing of the plan leaves the Worker */
  let pub = null; try { pub = JSON.parse(await getText("data/hive-public.json", 1)); } catch (e) {}
  if (!pub || !pub.on) { hiveCache = { at: Date.now(), body: { ok: true, hidden: true } }; return json(hiveCache.body); }
  let mv = null, roster = null;
  try { mv = await openData(JSON.parse(await getText("data/move-plan-x7k2p9.json", 1)), env); } catch (e) { return json({ ok: true, none: true }); }
  try { roster = await openData(JSON.parse(await getText("data/roster-x7k2p9.json")), env); } catch (e) {}
  const P = mv && mv.plan; if (!P || !Array.isArray(P.c)) return json({ ok: true, none: true });
  const norm = (x) => String(x || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  /* 📍 the newest positions (an officer's "Update positions") win over the daily roster's */
  let pl = null; try { pl = env.TIMERS ? await env.TIMERS.get(env.TIMERS.idFromName("all")).kvGet("pos-live") : null; } catch (e) {}
  const plNew = pl && pl.rows && (!roster || !roster.updated || Date.parse(pl.fetched) > Date.parse(roster.updated));
  const ms = ((roster && roster.members) || []).filter((m) => m && m.name).map((m) => { const q = plNew && pl.rows[String(m.id)]; return q && q.x != null && q.y != null ? { ...m, x: q.x, y: q.y } : m; }), byN = new Map(ms.map((m) => [norm(m.name), m]));
  const find = (n) => { const q = norm(n); if (!q) return null; if (byN.has(q)) return byN.get(q); if (q.length < 3) return null;
    const c = ms.filter((m) => { const k = norm(m.name); return k && (k.includes(q) || q.includes(k)); }); return c.length === 1 ? c[0] : null; };
  let bt = {}; try { const stub = env.TIMERS ? env.TIMERS.get(env.TIMERS.idFromName("all")) : null; if (stub) bt = (await stub.kvGet("rk:bt")) || {}; } catch (e) {}
  const spots = P.c.map(([n, x, y]) => { const m = n ? find(n) : null; return [m ? m.name : String(n || ""), +x, +y, m ? String(bt[String(m.id)] || "") : ""]; });
  /* ⚠️ wrong-spot warnings (Sherry 2026-11-06): castles of everyone who has a spot on the plan, so the page can show who
     is not exactly on their spot (still wandering / a bit crooked) and who sits on someone else's. Members without a spot: left out on purpose. Positions are what the game already shows on the map; nothing else is sent. */
  /* everyone who has a spot, wherever they are (not exactly on it = still wandering) */
  const planned = new Set(spots.map((r) => r[0]).filter(Boolean));
  const xs = P.c.map((r) => +r[1]), ys = P.c.map((r) => +r[2]), M = 3;   // + members without a spot whose castle is right on the plan (to catch 🤗 someone sitting on a spot)
  const box = xs.length ? [Math.min(...xs) - M, Math.max(...xs) + M, Math.min(...ys) - M, Math.max(...ys) + M] : null;
  const cities = ms.filter((m) => m.x != null && m.y != null && (planned.has(m.name) || (box && +m.x >= box[0] && +m.x <= box[1] && +m.y >= box[2] && +m.y <= box[3]))).map((m) => [m.name, +m.x, +m.y]);
  const body = { ok: true, at: mv.at || P.at || null, posAt: plNew ? pl.fetched : (roster && (roster.updated || roster.at || roster.made)) || null, cities, spots, traps: (P.bt || []).map(([x, y]) => [+x, +y]), hq: (P.hq || []).map(([x, y]) => [+x, +y]), banners: (P.b || []).map(([x, y]) => [+x, +y]) };
  hiveCache = { at: Date.now(), body };
  return json(body);
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
  rpW(id) {   // 🏰 which alliance a plan belongs to: "" = NXS · "f" = nxs · null = no such plan
    const r = [...this.sql.exec(`SELECT data FROM rp WHERE id = ?`, id)][0]; if (!r) return null;
    try { const sw = JSON.parse(r.data).w; return sw === "x" ? "f" : sw === "f" ? "o" : ""; } catch (e) { return ""; }   // stored "x" = nxs (since 2026-11-21); stored "f" = the old nXs, kept but no longer listed ("o")
  }
  rpPatch(id, patch, user, admin, w) {
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
    if (w === "f") p.w = "x"; else delete p.w;   // 🏰 the alliance comes from the route (which checked it), never from the page's plan data
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
  /* 👤 directed to-dos: the list the officer page sent (kv "directed") → one timer row per chosen officer per push device of theirs (ids "dr-…",
     left alone by a phone's own save). Only differences are written. Returns how many rows, and who has no push device. */
  async directedSave(items) { if (items) this.kvSet("directed", items); return this.directedSync(); }
  async directedSync() {
    const items = this.kvGet("directed") || [], now = Date.now();
    const langs = Object.fromEntries([...this.sql.exec(`SELECT uid, lang FROM bl`)].map((r) => [r.uid, r.lang]));
    const subsOf = {}; for (const r of [...this.sql.exec(`SELECT ep, uid, sub FROM usub`)]) (subsOf[r.uid] = subsOf[r.uid] || []).push(r);
    const want = new Map(), missing = new Set();
    for (const x of items) { if (!(x.at > now)) continue;   // already sent (the alarm deletes sent rows; never re-add them)
      for (const uid of x.uids) { const ds = subsOf[uid] || []; if (!ds.length) { missing.add(uid); continue; }
        const l = langs[uid] || "en", pick = (o) => (o && (o[l] || o.en || o.zh || Object.values(o)[0])) || "";
        for (const d of ds) want.set(d.ep + "|" + x.id, { ep: d.ep, id: x.id, at: x.at, title: "👤 " + pick(x.title), body: pick(x.body), sub: d.sub }); } }
    const have = new Map([...this.sql.exec(`SELECT ep, id, at, title, body, sub FROM t WHERE id LIKE 'dr-%'`)].map((r) => [r.ep + "|" + r.id, r]));
    let changed = false;
    for (const [k, w] of want) { const r = have.get(k); if (r && r.at === w.at && r.title === w.title && r.body === w.body && r.sub === w.sub) continue;
      this.sql.exec(`INSERT OR REPLACE INTO t VALUES (?, ?, ?, ?, ?, ?)`, w.ep, w.id, w.at, w.title, w.body, w.sub); changed = true; }
    for (const [k, r] of have) if (!want.has(k)) { this.sql.exec(`DELETE FROM t WHERE ep = ? AND id = ?`, r.ep, r.id); changed = true; }
    if (changed) await this.schedule();
    return { n: want.size, missing: [...missing] };
  }
  async saveFor(uid, sub, timers, retext) {
    const cur = [...this.sql.exec(`SELECT uid, sub FROM usub WHERE ep = ?`, sub.endpoint)][0];
    if (!cur || cur.uid !== uid || cur.sub !== JSON.stringify(sub)) this.sql.exec(`INSERT OR REPLACE INTO usub VALUES (?, ?, ?)`, sub.endpoint, uid, JSON.stringify(sub));
    const subs = [...this.sql.exec(`SELECT sub FROM usub WHERE uid = ?`, uid)].map((r) => JSON.parse(r.sub));
    for (const x of subs) await this.save(x, timers, retext);
    if (!cur) { try { await this.directedSync(); } catch (e) {} }   // 👤 a new push device: give it this person's directed to-dos too
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
    for (const id of have.keys()) if (!keep.has(id) && !id.startsWith("dr-")) { this.sql.exec(`DELETE FROM t WHERE ep = ? AND id = ?`, ep, id); changed = true; }   // 👤 dr- rows belong to directedSync
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
/* 🔒 LINK-ONLY ANNOUNCEMENTS (Sherry 2026-11-19: "strategy that only opens with a special link; officers write it the same way; without the
   link nobody sees it; delete it and the link is dead" — and "no login: it only has to keep honest people out").
   The text never goes into the public repo: it lives in the DO ("sec-<id>" + the list "secrets"). The link is #s/<id>, id = 128 random bits,
   so the link IS the permission: anyone holding it can read (in any language), nobody else can find it. Deleted or expired → gone.
   Translation is done here (same term table as the board), one language per call, driven by the officer's page — the Worker cannot keep
   working for minutes after it has answered. No pictures (pictures are public files in the repo). */
const SEC_LANGS = Object.keys(LANG_NAMES), SEC_ID = /^[A-Za-z0-9_-]{20,40}$/;
const secLive = (x) => x && (!x.exp || Date.parse(x.exp) > Date.now());
async function secretTr(env, title, text, to) {
  if (!env.GEMINI_API_KEY) return { ok: false, err: "no key" };
  let terms = ""; try { terms = termTable(await getTermRows(), title + "\n" + text); } catch (e) {}
  const system = [
    "You are the translator for the NXS alliance in the mobile game Kingshot. You translate an announcement written by an officer for the members.",
    "Rules: keep the meaning, tone, line breaks, lists, emojis, numbers, coordinates (X:123 Y:456), times and dates exactly; times are UTC — never convert them.",
    "Keep every formatting mark exactly as written and in the same place: **bold**, lines starting with #, -, >, markers in [[double brackets]] and {curly braces}, and links.",
    "Never translate member names, alliance tags like [NXS], @mentions or links.",
    "Game terms: when a game term from the TERM TABLE appears, use exactly the name given for the target language; never invent your own translation of a game term; if the table says (none), keep the term as written.",
    "Chinese = Traditional Chinese as used in Taiwan (繁體中文), never Simplified. Portuguese = Brazilian Portuguese. Arabic = Modern Standard Arabic (keep numbers as 0-9). Korean = natural Korean as used in the game.",
    terms ? "\n===== TERM TABLE (official in-game names) =====\n" + terms : "",
  ].join("\n");
  const ask = `Translate this announcement (its title and its text) into ${LANG_NAMES[to]}. If it is already written in ${LANG_NAMES[to]}, return it unchanged. Reply with JSON only: {"title": "...", "text": "..."}\n\nTITLE:\n${title}\n\nTEXT:\n${text}`;
  const schema = { type: "object", properties: { title: { type: "string" }, text: { type: "string" } }, required: ["title", "text"] };
  const errs = [];
  for (let round = 0; round < 2; round++) {
    if (round) { if (!errs.length || !errs.every((e) => /HTTP (429|500|502|503|504)|UNAVAILABLE|overloaded|high demand|timeout/i.test(e))) break; await new Promise((r) => setTimeout(r, 2500)); }
    for (const m of MODELS) {
      let r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask }] }], { responseMimeType: "application/json", responseSchema: schema, temperature: 0.2, maxOutputTokens: 16384 });
      if (r.error && /HTTP 400/.test(r.error)) r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask }] }], { temperature: 0.2, maxOutputTokens: 16384 });
      if (r.error) { errs.push(m + ": " + r.error); continue; }
      try { const raw = r.answer.replace(/^```(?:json)?\s*|\s*```$/g, ""); const j = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
        if (typeof j.text === "string" && j.text.trim() && typeof j.title === "string" && j.title.trim()) return { ok: true, title: j.title.trim(), text: j.text.trim() }; errs.push(m + ": empty"); }
      catch (e) { errs.push(m + ": bad JSON"); }
    }
  }
  return { ok: false, err: errs.map((e) => e.slice(0, 120)).join(" | ").slice(0, 500) };
}
const secRow = (x) => ({ id: x.id, title: x.title[x.lang] || "", author: x.author, at: x.at, exp: x.exp || "", lang: x.lang, langs: Object.keys(x.content) });
async function secretList(stub) {   // the list officers see; expired ones are removed here (and on a read)
  const ids = (await stub.kvGet("secrets")) || [], out = [], keep = [];
  for (const id of ids) { const x = await stub.kvGet("sec-" + id); if (!x) continue; if (!secLive(x)) { await stub.kvSet("sec-" + id, null); continue; } keep.push(id); out.push(secRow(x)); }
  if (keep.length !== ids.length) await stub.kvSet("secrets", keep);
  return out.sort((a, b) => b.at - a.at);
}
async function secretRoute(env, stub, user, body, token, mayPost) {
  const op = String(body.op || "list");
  if (!mayPost) return json({ error: "view_only", token }, 403);   // only officers who may post announcements ever see the list (the list holds the links)
  if (op === "list") return json({ ok: true, token, list: await secretList(stub) });
  if (op === "save") {
    const title = String(body.title || "").trim().slice(0, 200), text = String(body.text || "").trim().slice(0, 12000), author = String(body.author || user.name || "").trim().slice(0, 60);
    const lang = LANG_NAMES[body.lang] ? body.lang : "en", style = /^[a-z.-]{0,40}$/.test(String(body.style || "")) ? String(body.style || "") : "";
    const exp = body.exp && !isNaN(Date.parse(body.exp)) && Date.parse(body.exp) > Date.now() ? new Date(body.exp).toISOString() : "";
    if (!title || !text) return json({ error: "empty", token }, 400);
    if (/\[\[(img|table|video):/.test(text)) return json({ error: "no_pictures", token }, 400);   // pictures are public files in the repo
    const ids = (await stub.kvGet("secrets")) || [];
    if (ids.length >= 40) return json({ error: "too_many", token }, 400);
    const raw = crypto.getRandomValues(new Uint8Array(16)), id = btoa(String.fromCharCode(...raw)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const x = { id, at: Date.now(), exp, author, by: user.id, lang, style, title: { [lang]: title }, content: { [lang]: text } };
    await stub.kvSet("sec-" + id, x); await stub.kvSet("secrets", [...ids, id]);
    return json({ ok: true, token, item: secRow(x), langs: SEC_LANGS });
  }
  const id = String(body.id || ""); if (!SEC_ID.test(id)) return json({ error: "bad id", token }, 400);
  if (op === "del") {
    await stub.kvSet("sec-" + id, null); await stub.kvSet("secrets", ((await stub.kvGet("secrets")) || []).filter((v) => v !== id));
    return json({ ok: true, token, list: await secretList(stub) });
  }
  if (op === "tr") {   // one language per call (the page asks for each in turn and shows the progress)
    const to = String(body.to || ""); if (!LANG_NAMES[to]) return json({ error: "bad lang", token }, 400);
    let x = await stub.kvGet("sec-" + id); if (!secLive(x)) return json({ error: "gone", token }, 404);
    if (x.content[to]) return json({ ok: true, token, item: secRow(x) });
    const r = await secretTr(env, x.title[x.lang], x.content[x.lang], to);
    if (!r.ok) return json({ error: "translate", detail: [r.err || ""], token }, 502);
    x = await stub.kvGet("sec-" + id); if (!secLive(x)) return json({ error: "gone", token }, 404);   // read again: other languages were written meanwhile
    x.title[to] = r.title.slice(0, 300); x.content[to] = r.text.slice(0, 20000); await stub.kvSet("sec-" + id, x);
    return json({ ok: true, token, item: secRow(x) });
  }
  return json({ error: "bad op", token }, 400);
}
async function secretGet(env, body) {
  const id = String((body && body.id) || "");
  if (!SEC_ID.test(id) || !env.TIMERS) return json({ error: "gone" }, 404);
  const stub = env.TIMERS.get(env.TIMERS.idFromName("all")), x = await stub.kvGet("sec-" + id);
  if (!x) return json({ error: "gone" }, 404);
  if (!secLive(x)) { await stub.kvSet("sec-" + id, null); return json({ error: "gone" }, 404); }
  return json({ ok: true, a: { author: x.author, createdAt: new Date(x.at).toISOString(), expiresAt: x.exp || "", style: x.style || "", title: x.title, content: x.content } });
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
    const isAdm = u.admin || ADMIN_IDS.includes(id), side = !isAdm && (u.side === "m" || u.side === "f") ? u.side : null;   // 🏰 NXS / nxs (none = both; admins always both)
    users[id] = { name: String(u.name || "").slice(0, 40), ...(isAdm ? { admin: true } : {}), perms, ...(notify ? { notify } : {}), ...(side ? { side } : {}) };
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
  /* 🐻 BT1 / BT2 marks (Nia, 2026-11-05): which Bear Trap each member is in — one list for everyone, not part of a plan, shown on 📊 Roster and 🐝 Hive.
     bt[id] = digits "1" "2" "3" (rk:bt, NXS) or "1" "2" (rk:btf, nxs — body.w "f"). Read: Roster / Attendance / Hive viewers. Change: Roster or Hive editors. */
  if (op === "btget" || op === "bt") {
    if (!(mayView || seeTab("move"))) return json({ error: "no_access" }, 403);
    if (!admin && u && u.side && (body.w === "f" ? "f" : "m") !== u.side && op === "bt") return json({ error: "other_alliance" }, 403);   // 🏰 an officer of one alliance does not change the other's Bear Trap marks
    const btKey = body.w === "f" ? "rk:btx" : "rk:bt", btOk = body.w === "f" ? ["1", "2"] : ["1", "2", "3"];   // nxs (2189 nxs) kept apart; NXS has BT3 = the trap shared with nxs (2026-11-15)
    if (op === "btget") return json({ ok: true, token, bt: (await stub.kvGet(btKey)) || {} });
    if (!(mayEdit || canEdit(perms, user.id, "move"))) return json({ error: "view_only" }, 403);
    const write1 = async (fn) => { try { return await fn(); } catch (e) { return json({ error: "db", detail: [String(e && e.message || e)] }, 503); } };
    return write1(async () => { const sid = String(body.id || "").slice(0, 40), k = String(body.k); if (!sid || !btOk.includes(k)) return json({ error: "bad request" }, 400);
      const cur = (await stub.kvGet(btKey)) || {}, has = new Set(String(cur[sid] || "").split("").filter(Boolean));
      if (body.on) has.add(k); else has.delete(k);
      const v = [...has].sort().join(""); if (v) cur[sid] = v; else delete cur[sid];
      if (Object.keys(cur).length > 400) return json({ error: "bad request" }, 400);
      await stub.kvSet(btKey, cur); return json({ ok: true, token, bt: cur, stamp: await plansTouch(env) }); });
  }
  /* 🏰 plans are kept per alliance (2026-11-17): body.w "f" = nxs, nothing = NXS. A plan made while nxs is picked carries w: "f"; every list holds
     only the plans of the alliance asked for, and a plan is never read, changed or deleted through the other alliance. An officer set to one
     alliance on 👥 only reaches that alliance's plans. Pages that send no w (older copies) get NXS, exactly as before. */
  const W = body.w === "f" ? "f" : "";
  if (!admin && u && u.side && (W || "m") !== u.side) return json({ error: "other_alliance" }, 403);
  const rpMine = async () => Object.fromEntries(Object.entries(await stub.rpAll()).filter(([, x]) => (x && x.w === "x" ? "f" : x && x.w === "f" ? "o" : "") === W));   // "o" = the old nXs's plans: kept, never listed
  /* ⚔️ Battle → 🗡️ Swordland reads only the lists (plan name, ticked players, substitutes) — nothing else of a plan, and nothing else here */
  const listOnly = !mayView && seeTab("attack");
  if (!mayView && !listOnly) return json({ error: "no_access" }, 403);
  if (listOnly && op !== "list") return json({ error: "no_access" }, 403);
  const since = +body.since || 0, stamp = await plansStamp(env);
  if (op === "list" && since && stamp && stamp <= since) return json({ ok: true, token, unchanged: true, stamp });
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  try { await plansImport(env, stub); } catch (e) { if (op === "list") return json({ error: "import", detail: [String(e.message || e)] }, 503); }
  if (op === "list" && listOnly) { const all = await rpMine(), o = {}, safe = new Set(((await stub.kvGet("att:safe")) || []).map(String));
    // battle-only officers: names of CONFIRMED people only (✅, or 🟡 safe and not ❌) — no one who hasn't confirmed (Sherry, 2026-11-01)
    for (const [id, x] of Object.entries(all)) { const rep = x.rep || {}, ok = (m) => rep[m] === "y" || (safe.has(String(m)) && rep[m] !== "n");
      o[id] = { name: x.name || "", picked: (x.picked || []).filter(ok), subs: (x.subs || []).filter(ok), filtered: true }; }
    return json({ ok: true, token, plans: o, stamp: stamp || await plansTouch(env) }); }
  if (op === "list") return json({ ok: true, token, plans: await rpMine(), safe: (await stub.kvGet("att:safe")) || [], bt: (await stub.kvGet(W ? "rk:btx" : "rk:bt")) || {}, stamp: stamp || await plansTouch(env) });
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
  { const cw = await stub.rpW(id); if (cw !== null && cw !== W) return json({ error: "other_alliance" }, 403); }   // 🏰 a plan of the other alliance
  if (op === "vers") { if (!admin) return json({ error: "no_access" }, 403); return json({ ok: true, token, vers: await stub.rpVers(id) }); }
  if (op === "restore") { if (!admin) return json({ error: "no_access" }, 403);
    return write(async () => { const p = await stub.rpRestore(id, +body.v || 0, user.name); if (!p) return json({ error: "gone" }, 404); return json({ ok: true, token, plan: p, stamp: await plansTouch(env) }); }); }
  if (op === "hist") return json({ ok: true, token, vers: await stub.rpHist(id, +body.before || 0, 30) });
  if (!mayEdit) return json({ error: "view_only" }, 403);
  if (op === "save") return write(async () => {
    const patch = body.patch && typeof body.patch === "object" ? body.patch : null;
    if (!patch || JSON.stringify(patch).length > 200000) return json({ error: "bad request" }, 400);
    const r = await stub.rpPatch(id, patch, { id: user.id, name: user.name }, admin, W);
    if (r.error) return json({ error: r.error }, r.error === "gone" ? 404 : 403);
    return json({ ok: true, token, plan: r.plan, stamp: await plansTouch(env) });
  });
  if (op === "del") return write(async () => { await stub.rpDel(id, { name: user.name }); return json({ ok: true, token, stamp: await plansTouch(env) }); });
  return json({ error: "bad request" }, 400);
}
/* 🎁 /rewards — the Sanctuary Battle special rewards (they rotate between seasons): officers with ✏️ Map rights update them on the
   Map tab; everyone who may open the Map tab reads them. Stored in the DO (kv "rewards"), the last 20 versions in "rewards:hist".
   rewards = { phases: { "5": { special: { fortress: { "1": [itemId, qty] … }, sanctuary: { … } }, season, by, at } … }, items: { customId: { en, zh, … } } } */
/* 🗂️ My workspace (Sherry 2026-11-22): one private page per admin, kept under their own Discord id ("ws:<id>"), apart from all officer data.
   Only that person reads and writes it. The site owner (ADMIN_IDS[0]) may also READ another person's page, to check for problems — never write it.
   Nothing here is ever given to the AI (no data part, no context). */
const wsStr = (v, n) => String(v == null ? "" : v).replace(/\r/g, "").trim().slice(0, n);
function wsClean(w) {
  const out = { v: 1, items: [], done: {}, ann: {}, targets: [] };
  for (const x of (Array.isArray(w.items) ? w.items : []).slice(0, 300)) {
    if (!x || !/^[\w-]{1,24}$/.test(String(x.id)) || !["daily", "event", "once", "q", "proj"].includes(x.k)) continue;
    const it = { id: String(x.id), k: x.k, text: wsStr(x.text, 500) }; if (!it.text) continue;
    if (wsStr(x.who, 40)) it.who = wsStr(x.who, 40);
    if (wsStr(x.note, 800)) it.note = wsStr(x.note, 800);
    if (/^([01]\d|2[0-3]):[0-5]\d$/.test(String(x.at)) && x.k !== "q") it.at = String(x.at);
    if (x.k === "event") { if (!/^[a-z0-9][a-z0-9-]{0,39}$/.test(String(x.ev))) continue; it.ev = String(x.ev); it.due = Math.max(-7, Math.min(30, Math.round(+x.due || 0))); }
    if (x.k === "once" && /^\d{4}-\d{2}-\d{2}$/.test(String(x.date))) it.date = String(x.date);
    if (x.k === "q" && wsStr(x.ans, 1500)) it.ans = wsStr(x.ans, 1500);
    if ((x.k === "q" || x.k === "once" || x.k === "proj") && x.done) it.done = true;
    out.items.push(it);
  }
  for (const k of Object.keys(w.done && typeof w.done === "object" ? w.done : {}).slice(0, 1500)) if (/^[\w-]{1,24}\|\d{4}-\d{2}-\d{2}$/.test(k)) out.done[k] = 1;
  for (const k of Object.keys(w.ann && typeof w.ann === "object" ? w.ann : {}).slice(0, 200)) if (/^\d{4}-\d{2}-\d{2}$/.test(k)) out.ann[k] = 1;
  out.targets = [...new Set((Array.isArray(w.targets) ? w.targets : []).map((x) => wsStr(x, 40)).filter(Boolean))].slice(0, 30);
  return out;
}
/* shared parts of the workspace (2026-11-23):
   "ws-owners" = { <discord id>: [event ids] } — who owns which event (from the officers' responsibility sheet; ids only, never names);
   "ws-msg:<id>" = { rev, items } — things Sparrow sends to that person; they tick them and answer the questions. Only Sparrow and that person read it. */
const wsAdmins = (perms) => [...new Set([...ADMIN_IDS, ...Object.keys((perms && perms.users) || {}).filter((id) => perms.users[id] && perms.users[id].role === "admin")])];
/* one person's responsibilities: { ev: [event ids], parts: { <event id>: "their part of it" }, duties: ["standing duty", …] } (an old plain list of ids still reads) */
const wsOwn = (v) => { const o = Array.isArray(v) ? { ev: v } : v && typeof v === "object" ? v : {}; return { ev: Array.isArray(o.ev) ? o.ev : [], parts: o.parts && typeof o.parts === "object" ? o.parts : {}, duties: Array.isArray(o.duties) ? o.duties : [] }; };
const wsName = (perms, id) => (perms.users && perms.users[id] && perms.users[id].name) || id;
async function wsRoute(stub, user, body, token, role, perms) {
  if (role !== "admin") return json({ error: "no_access" }, 403);
  const op = String(body.op || "get"), owner = user.id === ADMIN_IDS[0], isId = (v) => /^\d{15,21}$/.test(String(v));
  if (op === "get") {
    const uid = isId(body.uid) ? String(body.uid) : user.id;
    if (uid !== user.id && !owner) return json({ error: "no_access" }, 403);
    const owners = (await stub.kvGet("ws-owners")) || {};
    const my = wsOwn(owners[uid]);
    const out = { ok: true, token, ws: (await stub.kvGet("ws:" + uid)) || null, mine: my.ev, parts: my.parts, duties: my.duties };
    if (!owner || uid !== user.id) out.inbox = ((await stub.kvGet("ws-msg:" + uid)) || {}).items || [];
    if (owner && uid === user.id) {
      const idx = (await stub.kvGet("ws-index")) || {}, ppl = wsAdmins(perms).filter((id) => id !== user.id);
      out.others = Object.keys(idx).filter((id) => id !== user.id).map((id) => ({ id, name: wsName(perms, id) }));
      out.people = ppl.map((id) => ({ id, name: wsName(perms, id) })); out.owners = Object.fromEntries(Object.keys(owners).map((id) => [id, wsOwn(owners[id]).ev])); out.out = {};
      for (const id of ppl) out.out[id] = ((await stub.kvGet("ws-msg:" + id)) || {}).items || [];
    }
    return json(out);
  }
  try {
    if (op === "owners") {   // which events a person owns: Sparrow sets anyone's, everyone else only their own
      const uid = isId(body.uid) ? String(body.uid) : user.id; if (uid !== user.id && !owner) return json({ error: "no_access" }, 403);
      const owners = (await stub.kvGet("ws-owners")) || {};
      const ev = [...new Set((Array.isArray(body.ev) ? body.ev : []).map(String).filter((x) => /^[a-z0-9][a-z0-9-]{0,39}$/.test(x)))].slice(0, 80), parts = {};
      for (const k of ev) { const v = wsStr(body.parts && body.parts[k], 240); if (v) parts[k] = v; }
      const duties = (Array.isArray(body.duties) ? body.duties : []).map((x) => wsStr(x, 160)).filter(Boolean).slice(0, 30);
      owners[uid] = { ev, parts, duties };
      await stub.kvSet("ws-owners", owners); return json({ ok: true, token, mine: ev, parts, duties });
    }
    if (op === "send" || op === "unsend") {   // Sparrow → one admin
      if (!owner) return json({ error: "no_access" }, 403);
      const to = String(body.to || ""); if (!isId(to) || to === user.id || !wsAdmins(perms).includes(to)) return json({ error: "bad request" }, 400);
      const box = (await stub.kvGet("ws-msg:" + to)) || { items: [] };
      if (op === "unsend") box.items = box.items.filter((x) => x.id !== String(body.id));
      else { const text = wsStr(body.text, 3000);   /* a whole day's message with its line breaks (2026-11-25: 600 cut it off) */ if (!text) return json({ error: "bad request" }, 400);
        const id = String(body.id || ""), cur = box.items.find((x) => x.id === id);
        if (cur) { cur.text = text; cur.q = !!body.q; }
        else { if (box.items.length >= 100) return json({ error: "too_big" }, 413); box.items.push({ id: "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), text, ...(body.q ? { q: true } : {}), at: Date.now() }); } }
      await stub.kvSet("ws-msg:" + to, box); return json({ ok: true, token, items: box.items });
    }
    if (op === "reply") {   // the person it was sent to: tick it, answer it
      const box = (await stub.kvGet("ws-msg:" + user.id)) || { items: [] }, it = box.items.find((x) => x.id === String(body.id));
      if (!it) return json({ error: "gone", token, items: box.items }, 404);
      if (body.done !== undefined) { if (body.done) it.done = true; else delete it.done; }
      if (body.ans !== undefined) { const a = wsStr(body.ans, 1500); if (a) it.ans = a; else delete it.ans; }
      it.rat = Date.now();
      await stub.kvSet("ws-msg:" + user.id, box); return json({ ok: true, token, items: box.items });
    }
  } catch (e) { return json({ error: "db" }, 503); }
  if (op !== "save") return json({ error: "bad request" }, 400);
  if (!body.ws || typeof body.ws !== "object") return json({ error: "bad request" }, 400);
  const old = await stub.kvGet("ws:" + user.id);
  if (old && (+old.rev || 0) !== (+body.rev || 0)) return json({ error: "conflict", token, ws: old }, 409);   // changed on another device: the page reloads it
  const w = wsClean(body.ws); w.rev = ((old && +old.rev) || 0) + 1; w.at = Date.now();
  if (JSON.stringify(w).length > 200000) return json({ error: "too_big" }, 413);
  try { await stub.kvSet("ws:" + user.id, w); const idx = (await stub.kvGet("ws-index")) || {}; if (!idx[user.id]) { idx[user.id] = w.at; await stub.kvSet("ws-index", idx); } } catch (e) { return json({ error: "db" }, 503); }
  return json({ ok: true, token, rev: w.rev });
}
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
async function attendRoute(env, stub, user, body, token, mayEdit, perms) {
  const op = String(body.op || "list");
  /* 🏰 attendance lists are kept per alliance, like the plans they come from: body.w "f" = nxs, nothing = NXS (2026-11-17) */
  const W = body.w === "f" ? "f" : "", pu = perms && perms.users && perms.users[user.id];
  if (roleOf(perms, user.id) !== "admin" && pu && pu.side && (W || "m") !== pu.side) return json({ error: "other_alliance" }, 403);
  if (op !== "list" && !mayEdit) return json({ error: "view_only" }, 403);
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  if (op === "list") return json({ ok: true, token, events: (await stub.attList()).filter((e) => (e && e.w === "x" ? "f" : e && e.w === "f" ? "o" : "") === W), safe: (await stub.kvGet("att:safe")) || [] });
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
    const clean = { title: String(ev.title || "").slice(0, 80), sheet: String(ev.sheet || "").slice(0, 40), plan: String(ev.plan || "").slice(0, 40), date: String(ev.date || "").slice(0, 10), by: { id: user.id, name: user.name }, ...(ev.reg ? { reg: 1 } : {}), ...(W ? { w: "x" } : {}),
      slots: (Array.isArray(ev.slots) ? ev.slots : []).slice(0, 8).map((sl) => ({
        name: String(sl.name || "").slice(0, 40),
        confirmed: (Array.isArray(sl.confirmed) ? sl.confirmed : []).slice(0, 200).map((m) => ({ id: String(m.id || "").slice(0, 40), name: String(m.name || "").slice(0, 60), ...(m.sub ? { sub: 1 } : {}), ...(m.rep === "y" || m.rep === "n" ? { rep: m.rep } : {}), ...(m.safe ? { safe: 1 } : {}), ...(m.left ? { left: 1 } : {}) })),   // left = 🚪 was no longer in the alliance when the list was made (registered, then left)
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
const VIEW_DEFAULT = { events: "view", board: "view", map: "view", plan: "none", ranking: "none", attend: "none", post: "none", watch: "none", views: "none", move: "none", hunt: "none", attack: "none", tr: "none", research: "none" };
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
  if (path === "/auth/me" || path === "/sync" || path === "/sync/forget" || path === "/board" || path === "/attend" || path === "/plans" || path === "/rewards" || path === "/perms" || path === "/directed" || path === "/secret" || path === "/ws") {
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
    /* 💌 Little Sparrow's personal message: "already shown" is kept here by Discord id, not only in the browser (the browser's own memory gets
       cleared or is another device, and the message came back — a member, 2026-11-27). Only an id → 1 map; nothing of the message itself. */
    let mr = false;
    if (path === "/auth/me" && stub && role) { try { const R = (await stub.kvGet("msgread")) || {}; if (body.msgRead === true && !R[s.u.id]) { R[s.u.id] = 1; await stub.kvSet("msgread", R); } mr = !!R[s.u.id]; } catch (e) {} }
    if (path === "/auth/me") {
      if (!env.OFFICER_PASSWORD) return json({ error: "officer_password_missing", user: u }, 503);
      if (!role) return json({ error: "no_access", user: u }, 403);
      // 👁️ viewers never get the password (it also opens the GitHub key for saving): only the data key, to read
      if (role === "viewer") { const dk = stub ? await stub.kvGet("dk") : null; return json({ ok: true, user: u, role, dk: dk && dk.k || null, token, mr }); }
      return json({ ok: true, user: u, role, pw: String(env.OFFICER_PASSWORD).trim(), token, mr, needDk: !!stub && !(await stub.kvGet("dk")) });
    }
    if (!stub) return json({ error: "push_not_set_up" }, 503);
    if (path === "/board") return boardRoute(env, ctx, stub, u, body, token, canEdit(perms, s.u.id, "board"), perms);
    if (path === "/attend") return attendRoute(env, stub, u, body, token, canEdit(perms, s.u.id, "attend"), perms);
    if (path === "/plans") return plansRoute(env, stub, u, body, token, perms);
    if (path === "/rewards") return rewardsRoute(stub, u, body, token, perms);
    if (path === "/perms") return permsRoute(stub, u, body, token, role);
    if (path === "/ws") return wsRoute(stub, s.u, body, token, role, perms);
    if (path === "/secret") return secretRoute(env, stub, u, body, token, canEdit(perms, s.u.id, "post"));
    if (path === "/directed") {   // 👤 to-dos sent only to chosen officers (Events editor "Only remind"): the Worker sends them, no phone set-up needed
      if (!canEdit(perms, s.u.id, "events")) return json({ error: "view_only", token }, 403);
      const now = Date.now();
      const items = (Array.isArray(body.items) ? body.items : []).filter((x) => x && Number(x.at) > now - 60000 && Number(x.at) < now + 30 * 86400000 && Array.isArray(x.uids)).slice(0, 120)
        .map((x) => ({ id: "dr-" + String(x.id).replace(/[^\w-]/g, "").slice(0, 36), at: Math.round(Number(x.at)), uids: x.uids.map(String).filter((v) => /^\d{15,21}$/.test(v)).slice(0, 20),
          title: Object.fromEntries(Object.entries(x.title || {}).filter(([l]) => /^[a-z]{2}$/.test(l)).map(([l, v]) => [l, String(v).slice(0, 80)])),
          body: Object.fromEntries(Object.entries(x.body || {}).filter(([l]) => /^[a-z]{2}$/.test(l)).map(([l, v]) => [l, String(v).slice(0, 200)])) })).filter((x) => x.uids.length);
      return json({ ok: true, token, ...(await stub.directedSave(items)) });
    }
    if (path === "/sync/forget") { if (body.sub && body.sub.endpoint) await stub.forget(String(body.sub.endpoint)); return json({ ok: true }); }
    const st = body.state && typeof body.state === "object" ? body.state : {};
    try { return json({ ok: true, user: s.u, token, state: await stub.syncMerge(s.u.id, st) }); }
    catch (e) { return json({ error: "too_big" }, 413); }
  }
  return json({ error: "not found" }, 404);
}
