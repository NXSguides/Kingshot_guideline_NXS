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

const VERSION = "2026-10-14m";
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
const json = (obj, status = 200) => Response.json(obj, { status, headers: cors });

export default {
  async fetch(req, env, ctx) {
    try { return await handle(req, env, ctx); }
    catch (e) { return json({ error: "worker", detail: [String(e && e.message || e)] }, 500); }
  },
};

async function handle(req, env, ctx) {
  {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const path = new URL(req.url).pathname;
    if (path.startsWith("/auth/") || path === "/sync" || path === "/sync/forget" || path === "/board") return authRoute(req, env, path, ctx);   // 🔑 officer login with Discord
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
    const question = String(body.question || "").trim().slice(0, 600);
    if (!question) return json({ error: "empty" }, 400);
    const siteLang = LANG_NAMES[body.lang] ? body.lang : "en";
    const lang = detectLang(question, siteLang);   // language of the question decides the answer language
    const history = (Array.isArray(body.history) ? body.history : []).slice(-6)
      .filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string")
      .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 1500) }] }));

    const officer = await isOfficer(body, env);

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
        context += "\n\n" + OFFICER_HELP;
        try { context += "\n\n" + await getOfficer(env); }
        catch (e) { context += "\n\n(OFFICER DATA is unavailable right now: " + e.message + ")"; }
        try { context += "\n\n" + await getEvents(env); }
        catch (e) { context += "\n\n(EVENTS DATA is unavailable right now: " + e.message + ")"; }
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
        ? "This user is a verified OFFICER: answer questions about members, roster, power, name changes, who left, other alliances from the OFFICER DATA section, " +
          "and explain how to use the officer pages step by step from the OFFICER PAGES — HOW TO USE section (use the button names as written there). " +
          "Answer event dates, to-dos and in-game guides from the EVENTS DATA section; when giving an in-game guide, copy its text exactly (it is pasted into the game) and keep separate messages separate. " +
          "Officer pages you may link: [Roster](roster-x7k2p9.html) (member ranking, power, TC, Mystic Trial, battle tables), " +
          "[Watch](watch-x7k2p9.html) (name changes, power history, who left/joined, notes), [Events](events-x7k2p9.html) (week calendar, officer to-dos, in-game guides to copy, add/edit events), " +
          "[Post](post-k4m8q2.html) (post / edit announcements), [Scout](officer-x7k2p9.html#scout) (top players of other kingdoms). " +
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
        return json({ answer: res.answer, officer, left });
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
            await w.write(enc.encode(JSON.stringify({ meta: { officer, left } }) + "\n"));
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
    GEMINI_API_KEY: env.GEMINI_API_KEY ? "set" : "MISSING", DATA_KEY: env.DATA_KEY ? "set" : "not set",
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
   Edit freely — plain text. Add your alliance's own rules at the end. */
const OFFICER_HELP = `
### OFFICER PAGES — HOW TO USE (officers only)
GETTING IN
- On the main site, tap the title "NXS Guidelines" 5 times quickly (within 2 seconds) → the 📅 Events page opens. Enter the officer password (ask Sherry). Tick "Remember on this device" to skip it next time.
- The password is asked again on another browser / phone, the home-screen app, a private window, after clearing browser data, or after "Forget the password on this device".
- All officer tabs are one page now (officer-x7k2p9.html); switching tabs is instant and the password is entered once. The tabs, in order: 📅 Events (中文: 活動排程), 🗺️ Map (王國地圖), 📊 Ranking (成員排序), 📢 Post (發布公告), 🕵️ Watch (觀察名單), 🔭 Scout (偵察), 📈 Views (網站瀏覽).
- 📈 Views (中文: 網站瀏覽): site statistics — visitors per day, which guides and languages people open, countries, where they came from, devices; 7 / 30 / 90 days. Counting is GoatCounter, anonymous (no cookies, names or IPs). NOT counted: any browser with the officer password saved (officers test the site all day), and the officer page itself. So "this browser: not counted" on the Views tab is normal for every officer. If it says the token is not set: Cloudflare Worker → Settings → Variables and Secrets → add GOATCOUNTER_TOKEN (GoatCounter → Settings → API → new token with "Read statistics").
- 🗺️ Map (中文: 王國地圖): kingdom map, Outpost buffs and the shared Outpost plan — see the 🗺️ MAP section below.
- Language: officer pages are English or 中文. Entering from the Chinese site opens them in 中文, from any other language in English. The language button on any tab switches all officer tabs together.
- When answering in Chinese, call the tabs by their 中文 names above (they are what officers see on screen).
- Events tab → "⏰ Our event times (UTC)" (中文: 我們的活動時間): officers set the times we pick for Bear Hunt, Swordland, Tri-Alliance Clash, Viking Vengeance and Cesares Fury (e.g. 13:00, 22:00; Cesares Fury 22:35) and press Save. Used by the home page "Today & this week" card and everyone's ⏰ Game reminders. The same card has "Next Bear day (UTC)" (中文: 下一個熊日): if the game moves Bear Hunt to another day, set the new date there and Save — the home page, the officer calendar and to-dos, and everyone's ⏰ reminders all follow (Bear Hunt then repeats every 2 days from that date). Bear Hunt times changed? Change them in the same card.
- Events tab also lists Sanctuary Battle (中文: 遺跡爭奪): every week Tue 00:00 – Fri 24:00 UTC (sign-up first, R4+ picks 3 time slots, the contest happens at the slot most alliances voted; 1 Sanctuary + 1 Fortress per week, last week's Sanctuaries are signed up automatically). Its in-game guides: the rally call (exactly 70,080 troops: 35,040 Inf / 14,016 Cav / 21,024 Arc, rally from home, no solo attacks) and the defence swap after a capture (Howard/Gordon 60:20:20 = 42,048/14,016/14,016; send defence right after the rally departs, wait 20 s, don't speed up).
- Member data updates automatically every day at 20:13 UTC. If a page says "No data yet": GitHub → Actions → "Update Roster (MightPulse)" → Run workflow, then reload.

📊 RANKING (roster-x7k2p9.html) — pick event participants and split them into groups
① Weights: Total Power vs Mystic Trial; the two always add up to 100%.
② Tick this event's participants: tick names, use Select all / Clear, or "Paste a sign-up list" (one name per line or comma-separated; decorations like ♛ and the Nexus tag can be left out; case doesn't matter). "(?)" means several players match — tick that one by hand. Names not found are listed.
③ Ranking: score = each stat scaled so the best ticked player = 100, combined by the weights. Players with no Mystic Trial value count as 0 (marked ?). "Copy result" copies the list.
④ Event groups: pick an event (e.g. Swordland Showdown: 4 Attackers, 6 Defenders, everyone else Joiners). Group sizes can be changed and are remembered. Groups follow the ranking. "Copy result" copies the groups for chat.
⑤ Battle table: set stages, targets and columns (comma-separated). "Fill a first draft from the ranking" uses the Attackers/Defenders numbers from ④. Tap a name, then tap a box (drag on a computer); × removes. "+ text" adds free text (e.g. "Stays behind"). "Short names" drops decorations. Output: 🖼️ Make image (phone: press and hold the picture to save), 📋 Copy text, or 📢 Use in a new announcement. The table is saved on this device only.

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

🕵️ WATCH (watch-x7k2p9.html) — who joined, left, renamed, and where they came from
- The table shows every member: power and kills (with change over the last days of saved data), TC, kingdom, language, "In NXS since", earlier names, other alliances they were seen in, similar names elsewhere, last login, flags.
- Flags are hints only, not proof: New (joined within the "New" days setting), From kingdom X, Renamed, Was in <watched alliance>, Similar name in…, Power dropped, Check Record (new member nobody has checked yet — shown first).
- Settings: "Watched alliances" and "Our farm / sister alliances"; "Only show members with flags"; search by name or ID.
- ✏️ on a member: add notes and history from their MightPulse Record (Open Record ↗): earlier alliances (one per line, e.g. "RED 2026-09-30", other kingdom "RED #1234 2026-09-30"), earlier names, Cleared / Not clear, "Why / comments", and "I've checked this member's Record". Notes are shared by all officers.
- "Left NXS" lists members who left, when, and where they were seen since.
- Export: 📋 Copy for Google Sheets (paste into cell A1) or ⬇️ Download CSV — includes officers' notes.

📅 EVENTS (events-x7k2p9.html) — the first officer tab: week calendar, officer to-dos, and in-game guides
- Calendar (中文: 活動): one long strip of days in UTC (game day starts 00:00 UTC), two weeks back to ten weeks ahead; scroll sideways. Today is underlined, a dashed line marks each Monday, every event run is one bar (bars that started earlier keep their name in view). Filled bar = running now; a bar with ✅ has open action items (tap → jumps to them); tapping any other bar opens that event's entry below.
- 👑 Kingdom #2189 milestones (王國里程碑): a gold row at the top of the calendar strip, and a fold-out list under it ("Kingdom #2189 milestones · next: …"). Dates (UTC): 2026-11-09 Truegold 5, Gov Charm Material Exchange, 4th Master (Cassia) · 2026-11-30 Governor Charm cap raised (Lv.12+) · 2026-12-21 Gen 4 Heroes (Alcar, Margot, Rosa), Gen 4 Pets, 5th & 6th Masters (Guinevere, Wilson) · 2027-01-18 War Academy (T11 troops) · 2027-03-15 Gen 5 Heroes, Gen 5 Pets, 7th & 8th Masters (Isnor, Aena) · 2027-04-26 Truegold 8 · 2027-06-07 Gen 6 Heroes & Pets · 2027-08-01 First Flamedragon Tyrant Competition · 2027-08-30 Gen 7 Heroes & Pets · 2027-10-11 Advanced Truegold Research · 2027-11-22 Gen 8 Heroes · 2028-02-14 Gen 9 Heroes (predicted) · 2028-03-27 Truegold 10. (Masters, Gen 3 Heroes & Pets unlocked 2026-09-28.) These are projections and can move.
- ✅ Action items (待辦事項): "This week" / "Next week" buttons (on Sundays it opens on next week). One card per event; an event that runs several times in the week (e.g. Bear Hunt) gets one dated task per run; a run belongs to the week it starts in, and its prep tasks are listed with that week. Each task says what to do and by when (⏰ date); overdue items are marked. A task can be limited to its own day until a UTC hour (editor: "Only that day, until UTC hour" 只在當天顯示，到 UTC 幾點) — e.g. the KvK Castle Battle task shows only on day 6 until 22:00 UTC, because the KvK Battle phase runs 12:00–22:00 UTC. Ticks are saved on this device only. Buttons: ✏️ Edit items (編輯待辦 — opens that event's editor at its action items: change the text, the day, the "until UTC hour", add or remove items, then 💾 Save; editing in one language is enough — the other language then shows the same text, no translation needed), 📢 Write announcement (Post tab), 📖 Guide (the guide on the site), 📋 In-game guides (jumps to that event's messages).
- 📋 Events & in-game guides (list below the calendar): tap an event to open it. Each grey box is ONE in-game chat message — the game limits message length, so long guides are split into several messages; send them one by one. 📋 Copy copies one message; the character count is shown next to the title.
- ✏️ next to a message edits just that message (title and text, live character count) → 💾 Save.
- ✏️ Edit at the bottom of an event changes the whole event: emoji, name (中文 / English), "Repeats on a fixed schedule" (first day in UTC, repeats every … days, lasts … days), note (e.g. times), guide on the site, action items (days before (−) / after the start, text in 中文 and English, show an announcement / Ranking button), and the in-game messages (+ Message, ✕ removes). "Delete event" removes it.
- + New event adds an event. Events without a fixed schedule only appear in the list, not in the calendar.
- 📊 Ranking tab → "📋 Plan" (中文: 方案) at the top: "🔒 Only on this device" (default, private) or a shared plan made with "+ New shared plan" (e.g. "Legion 1"). In a shared plan every officer sees the same ticked participants, weights, group sizes and battle table; changes show for the others within about 10 seconds. Two officers ticking at the same time don't undo each other. Rename / Delete buttons next to it.
- 📢 Post tab → "Auto-delete" (中文: 自動刪除) under the guide button: Never / when today ends (00:00 UTC) / when tomorrow ends / after 1, 2, 3 or 7 days / pick a date & time (UTC). The announcement disappears from the site on time by itself (the files are cleaned up within the hour). The list shows "🗑️ auto-delete …". To change or remove the time: Edit → Edit the whole announcement → change Auto-delete → Save (it is not translated again).
- Changes are saved on the site for all officers (other officers see them after refreshing, about 1 minute). Saving uses the same GitHub key as the Post tab; "Someone else changed the events meanwhile" → refresh and try again. The event texts are encrypted like the other officer data.
- Changing the dates of KvK, Viking Vengeance, Swordland Showdown, Tri-Alliance Clash, Eternity's Reach, All Out, Fishing Tournament, Hero Roulette or Cesares Fury also changes when the main site shows those guide buttons on Recent Events.
- If the in-game calendar differs from the page, the game is right — fix the dates with ✏️ Edit.
- The current events, schedules, notes, action items and in-game guide texts are in the EVENTS DATA section below — use it to answer "when is the next …" or "what is the in-game guide for …" (quote in-game guide texts exactly, they are meant to be pasted into the game).

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

AI ASSISTANT
- The chat recognises an officer automatically when this browser has the saved officer login (or an officer page was unlocked in this tab). Officers have no daily question limit and can ask about members, the officer pages and the events data.

🔭 SCOUT (officer-x7k2p9.html#scout) — the top players of other kingdoms (for KvK)
- Type a kingdom number and press "Fetch now": a GitHub job reads that kingdom's top 20 players from MightPulse (power, Town Center, Mystic Trial score and rank, kills, VIP, alliance) and the kingdom's strongest alliances. It takes about 2–3 minutes; the page refreshes by itself.
- Each scouted kingdom is a chip at the top: ⟳ fetches it again, ✕ removes it, "update daily" refreshes it every day at 20:25 UTC together with the roster (tick it for the KvK opponent).
- Our own kingdom #2189 is scouted too, for comparison. Data is the SCOUT section of the OFFICER DATA (answer "who is the strongest in kingdom X" from there).
- Not in this data: last login (unreliable) and anything MightPulse does not publish.

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

/* Views tab: site statistics from GoatCounter, officers only. Cached 5 minutes per range. */
const statsCache = {};
async function stats(body, env) {
  if (!(await isOfficer(body, env))) return json({ error: "no_permission" }, 403);
  if (!env.GOATCOUNTER_TOKEN) return json({ error: "no_token" }, 500);
  const days = [7, 30, 90].includes(+body.days) ? +body.days : 7;
  const c = statsCache[days];
  if (c && Date.now() - c.at < 5 * 60 * 1000) return json(c.data);
  const end = new Date(), start = new Date(end.getTime() - days * 86400000);
  const q = `start=${start.toISOString()}&end=${end.toISOString()}`;
  const get = async (p) => {
    const r = await fetch(`${GC_SITE}/api/v0/stats/${p}${p.includes("?") ? "&" : "?"}${q}`, { headers: { Authorization: `Bearer ${env.GOATCOUNTER_TOKEN.trim()}`, "Content-Type": "application/json" } });
    if (!r.ok) throw new Error(`goatcounter ${p.split("?")[0]} ${r.status}`);
    return r.json();
  };
  try {
    const soft = (p) => get(p).catch(() => null);       // the breakdown pages may be missing on some sites → leave them empty
    const [total, hits, locations, toprefs, systems] = await Promise.all([
      get("total"), get("hits?limit=100&group=day"), soft("locations?limit=15"), soft("toprefs?limit=15"), soft("systems?limit=10")]);
    const data = { days, at: Date.now(), total, hits: hits.hits, locations: locations?.stats || [], toprefs: toprefs?.stats || [], systems: systems?.stats || [] };
    statsCache[days] = { data, at: Date.now() };
    return json(data);
  } catch (e) { return json({ error: "goatcounter", detail: String(e.message || e) }, 502); }
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
    this.sql.exec(`CREATE TABLE IF NOT EXISTS att (id TEXT PRIMARY KEY, data TEXT, at INTEGER)`);   // 📋 attendance: one row per event (JSON)
    try { this.sql.exec(`ALTER TABLE bp ADD COLUMN meta TEXT`); } catch (e) {}
  }
  /* ---- 💬 board ---- */
  boardLang(uid, lang) { if (lang && ([...this.sql.exec(`SELECT lang FROM bl WHERE uid = ?`, uid)][0] || {}).lang !== lang) this.sql.exec(`INSERT OR REPLACE INTO bl VALUES (?, ?)`, uid, lang); }
  boardUser(by, lang) {   // written only when the name / picture changed
    const r = [...this.sql.exec(`SELECT name, avatar FROM bu WHERE uid = ?`, by.id)][0];
    if (!r || r.name !== by.name || r.avatar !== (by.avatar || "")) this.sql.exec(`INSERT OR REPLACE INTO bu VALUES (?, ?, ?, ?)`, by.id, by.name, by.avatar || "", Date.now());
    this.boardLang(by.id, lang);
  }
  boardUsers() { return [...this.sql.exec(`SELECT uid, name, avatar FROM bu ORDER BY name`)].map((r) => ({ id: r.uid, name: r.name, avatar: r.avatar })); }
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
  boardDelete(pid) {
    const p = this.boardPost(pid); if (!p) return null;
    const first = [...this.sql.exec(`SELECT id FROM bp WHERE tid = ? ORDER BY at LIMIT 1`, p.tid)][0];
    if (first && first.id === pid) {   // the opening message → the whole topic goes
      this.sql.exec(`DELETE FROM bp WHERE tid = ?`, p.tid); this.sql.exec(`DELETE FROM bt WHERE id = ?`, p.tid); return { gone: true };
    }
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
      if (!/^(nxs-daily-v1|nxs-stack-done|ks-kvk-check-[\w-]{1,40})$/.test(k) || !x || typeof x.v !== "string" || x.v.length > 4000 || !(now - x.at < 40 * 864e5)) continue;
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
    const due = [...this.sql.exec(`SELECT * FROM t WHERE at <= ? ORDER BY at LIMIT 200`, Date.now() + 2000)];
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
    "Never translate member names, alliance tags like [NXS], @mentions or links.",
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
    for (const m of MODELS) {
      let r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask(label, body) }] }], { responseMimeType: "application/json", responseSchema: schema, temperature: 0.2 });
      if (r.error && /HTTP 400/.test(r.error)) r = await gemini(env, m, system, [{ role: "user", parts: [{ text: ask(label, body) }] }], { temperature: 0.2 });
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
    return null;
  };
  const tx = await one("message", text);
  if (!tx) { plain.text.err = errs.join(" | ").slice(0, 300); return plain; }   // kept with the message so the page can show why
  const out = { ok: true, text: tx };
  if (title) out.title = (await one("title", title)) || { orig: title, src: tx.src };
  return out;
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
async function attendRoute(env, stub, user, body, token) {
  const op = String(body.op || "list");
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  if (op === "list") return json({ ok: true, token, events: await stub.attList() });
  if (op === "save") return write(async () => {
    const ev = body.ev && typeof body.ev === "object" ? body.ev : null;
    if (!ev || !/^[\w-]{1,40}$/.test(String(ev.id || ""))) return json({ error: "bad request" }, 400);
    const clean = { title: String(ev.title || "").slice(0, 80), date: String(ev.date || "").slice(0, 10), by: { id: user.id, name: user.name },
      slots: (Array.isArray(ev.slots) ? ev.slots : []).slice(0, 8).map((sl) => ({
        name: String(sl.name || "").slice(0, 40),
        confirmed: (Array.isArray(sl.confirmed) ? sl.confirmed : []).slice(0, 200).map((m) => ({ id: String(m.id || "").slice(0, 40), name: String(m.name || "").slice(0, 60) })),
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
async function boardRoute(env, ctx, stub, user, body, token) {
  const op = body.op, lang = BOARD_LANGS.includes(body.lang) ? body.lang : null;
  const by = { id: user.id, name: user.name, avatar: user.avatar || "" };
  const ok = (o) => json({ ok: true, token, ...o });
  // polls: nothing changed since the page last looked → answer without touching the Durable Object
  const since = +body.since || 0, stamp = await boardStamp(env);
  if ((op === "list" || op === "get") && since && stamp && stamp <= since) return ok({ unchanged: true, stamp });
  // name + language (for @ pickers and notifications): on writes and on the first look of a visit. Reading must still work when
  // writing is impossible (daily write allowance used up), so a failure here is ignored
  if (op !== "list" && op !== "get" || body.first) { try { await stub.boardUser(by, lang); } catch (e) {} }
  const ids = (v) => (Array.isArray(v) ? v : []).map(String).filter((x) => /^\d{17,20}$/.test(x)).slice(0, 20);
  const metaOf = (b, old) => { const m = { m: ids(b.mentions), to: ids(b.to) }; if (old && old.done) m.done = old.done; return m.m.length || m.to.length || m.done ? m : null; };
  const str = (v, max) => String(v || "").replace(/\r/g, "").trim().slice(0, max);
  const notify = (t, tx, meta) => { const p = stub.boardNotify(user.id, t.id, t.title, user.name, tx, meta); if (ctx && ctx.waitUntil) ctx.waitUntil(p); };
  if (op === "list") return ok({ topics: await stub.boardList(), users: await stub.boardUsers(), tasks: await stub.boardTasks(user.id), stamp: stamp || await boardTouch(env) });
  if (op === "get") { const t = await stub.boardThread(String(body.id || "")); return t ? ok({ topic: t, stamp: stamp || await boardTouch(env) }) : json({ error: "gone", token }, 404); }
  // writes: when the database refuses (allowance used up), say so clearly — the page keeps the text so nothing is lost
  const write = async (fn) => { try { return await fn(); } catch (e) { return json({ error: /limit|exceed|quota|allow/i.test(String(e && e.message)) ? "db_limit" : "db", detail: [String(e && e.message || e)] }, 503); } };
  if (op === "new") return write(async () => {
    const title = str(body.title, 120), text = str(body.text, 4000);
    if (!title || !text) return json({ error: "empty" }, 400);
    const tr = await boardTranslate(env, title, text);
    const meta = metaOf(body);
    const t = await stub.boardNew(rid(), tr.title, by, rid(), tr.text, meta);
    notify(t, tr.text, meta);
    return ok({ topic: t, translated: tr.ok, stamp: await boardTouch(env) });
  });
  if (op === "reply") return write(async () => {
    const text = str(body.text, 4000);
    if (!text) return json({ error: "empty" }, 400);
    const tr = await boardTranslate(env, "", text);
    const meta = metaOf(body);
    const t = await stub.boardReply(String(body.id || ""), by, rid(), tr.text, meta);
    if (!t) return json({ error: "gone" }, 404);
    notify(t, tr.text, meta);
    return ok({ topic: t, translated: tr.ok, stamp: await boardTouch(env) });
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
    const tr = await boardTranslate(env, title, text);
    const meta = body.mentions || body.to ? metaOf(body, p.meta) : p.meta;
    return ok({ topic: await stub.boardEdit(p.id, tr.text, title ? tr.title : null, meta), translated: tr.ok, stamp: await boardTouch(env) });
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
  scope: "identify guilds.members.read",
};
/* who may open the officer page: Discord user IDs (testing: three people), and/or role IDs on our server */
const DISCORD_ACCESS = {
  users: ["1547403844374368327", "1240788094672834623", "762827904341246013"],
  roles: [],
};
const SESSION_DAYS = 30, RECHECK_MS = 10 * 60000, GRACE_MS = 24 * 3600000;

async function sealKey(env) {
  const raw = await crypto.subtle.digest("SHA-256", utf8("nxs-session|" + String(env.DISCORD_CLIENT_SECRET || "").trim()));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
async function seal(env, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await sealKey(env), utf8(JSON.stringify(obj)));
  return b64u.enc(iv) + "." + b64u.enc(ct);
}
async function unseal(env, s) {
  try {
    const [iv, ct] = String(s || "").split(".");
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64u.dec(iv) }, await sealKey(env), b64u.dec(ct));
    return JSON.parse(new TextDecoder().decode(pt));
  } catch (e) { return null; }
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
async function discordCheck(access) {
  const h = { Authorization: "Bearer " + access };
  const me = await fetch("https://discord.com/api/v10/users/@me", { headers: h });
  if (me.status === 401) return { ok: false, why: "expired" };
  if (!me.ok) throw new Error("me " + me.status);
  const u = await me.json();
  const mr = await fetch(`https://discord.com/api/v10/users/@me/guilds/${DISCORD.guild}/member`, { headers: h });
  if (mr.status === 404 || mr.status === 403) return { ok: false, why: "not_member" };
  if (!mr.ok) throw new Error("member " + mr.status);
  const m = await mr.json();
  const allowed = DISCORD_ACCESS.users.includes(u.id) || (m.roles || []).some((r) => DISCORD_ACCESS.roles.includes(r));
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
      const c = await discordCheck(s.at);
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
      const c = await discordCheck(tk.access_token);
      if (!c.ok) return back("login_error=" + c.why);
      const now = Date.now();
      const session = await seal(env, { u: c.user, at: tk.access_token, rt: tk.refresh_token, ax: now + (tk.expires_in || 604800) * 1000 - 60000, chk: now, exp: now + SESSION_DAYS * 86400000 });
      return back("login=" + session);
    } catch (e) { return back("login_error=discord"); }
  }
  if (path === "/auth/me" || path === "/sync" || path === "/sync/forget" || path === "/board" || path === "/attend") {
    if (req.method !== "POST" || req.headers.get("Origin") !== SITE_ORIGIN) return json({ error: "forbidden" }, 403);
    let body; try { body = await req.json(); } catch (e) { return json({ error: "bad request" }, 400); }
    const c = await sessionCheck(req, env, body.token);
    if (c.error) return json({ error: c.error, user: c.user }, c.status);
    const s = c.s, token = await seal(env, s);
    if (path === "/auth/me") {
      if (!env.OFFICER_PASSWORD) return json({ error: "officer_password_missing", user: s.u }, 503);
      return json({ ok: true, user: s.u, pw: String(env.OFFICER_PASSWORD).trim(), token });
    }
    if (!env.TIMERS) return json({ error: "push_not_set_up" }, 503);
    const stub = env.TIMERS.get(env.TIMERS.idFromName("all"));
    if (path === "/board") return boardRoute(env, ctx, stub, s.u, body, token);
    if (path === "/attend") return attendRoute(env, stub, s.u, body, token);
    if (path === "/sync/forget") { if (body.sub && body.sub.endpoint) await stub.forget(String(body.sub.endpoint)); return json({ ok: true }); }
    const st = body.state && typeof body.state === "object" ? body.state : {};
    try { return json({ ok: true, user: s.u, token, state: await stub.syncMerge(s.u.id, st) }); }
    catch (e) { return json({ error: "too_big" }, 413); }
  }
  return json({ error: "not found" }, 404);
}
