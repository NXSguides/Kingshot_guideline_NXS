/* NXS AI assistant — Cloudflare Worker
   Paste this whole file into the Cloudflare Worker editor.
   Secrets (Settings → Variables and Secrets):
     GEMINI_API_KEY — from a SEPARATE Google AI Studio project
     DATA_KEY       — the officer data key from the Post tab (needed once officer data is encrypted)
   Binding (Settings → Bindings → KV namespace), optional but recommended: LIMITS
     — remembers how many questions each device / IP asked today. Without it the daily
       limits still work, but only roughly (they reset whenever Cloudflare restarts the Worker).
   Everyone:  answers from data/ai-context.txt (public guides + announcements).
   Officers:  also roster / watch data. "Officer" = proves the officer password (it opens data/data-key.json),
              checked here with a hash of the DATA_KEY secret. */

const VERSION = "2026-10-08b (streaming answers, gz data)";
const SITE_ORIGIN = "https://nxsguides.github.io";
const SITE_BASE = SITE_ORIGIN + "/Kingshot_guideline_NXS/";
const REPO = "NXSguides/Kingshot_guideline_NXS";
// Same fallback idea as the translate script: if one model is busy or gone, try the next.
const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3-flash-preview"];

const LIMIT_PER_MIN = 6;          // per visitor IP (best-effort)
// Daily limits for non-officers (officers are not limited). Days reset at 00:00 UTC = 08:00 Taiwan.
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
  async fetch(req, env) {
    try { return await handle(req, env); }
    catch (e) { return json({ error: "worker", detail: [String(e && e.message || e)] }, 500); }
  },
};

async function handle(req, env) {
  {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
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
          "[Post](post-k4m8q2.html) (post / edit announcements). " +
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
async function gemini(env, model, system, contents) {
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
          generationConfig: { maxOutputTokens: 4096, temperature: 0.3, ...(withThinking ? { thinkingConfig: thinking } : {}) },
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
    GEMINI_API_KEY: env.GEMINI_API_KEY ? "set" : "MISSING", DATA_KEY: env.DATA_KEY ? "set" : "not set" };
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
- The tabs at the top, in order: 📅 Events (中文: 活動排程), 📊 Ranking (成員排序), 📢 Post (發布公告), 🕵️ Watch (觀察名單).
- Language: officer pages are English or 中文. Entering from the Chinese site opens them in 中文, from any other language in English. The language button on any tab switches all officer tabs together.
- When answering in Chinese, call the tabs by their 中文 names above (they are what officers see on screen).
- Member data updates automatically every day at 04:13 Taiwan time (20:13 UTC). If a page says "No data yet": GitHub → Actions → "Update Roster (MightPulse)" → Run workflow, then reload.

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
- Week view: Monday–Sunday in UTC (game day starts 00:00 UTC = 08:00 Taiwan). On Sundays it opens on next week. ◀ ▶ change week, "Back to this week" returns. Each day lists the events running (starts / day x of y / last day); tap an event to jump to its in-game guide.
- ✅ Action items: what officers must do and by when (⏰ date), for events starting this week plus prep due this week. Overdue items are marked. Ticks are saved on this device only. Buttons: 📢 Write announcement (Post tab), 📊 Open Ranking, 📖 Guide (the site guide), 📋 In-game guides.
- 📋 Events & in-game guides (list below the calendar): tap an event to open it. Each grey box is ONE in-game chat message — the game limits message length, so long guides are split into several messages; send them one by one. 📋 Copy copies one message; the character count is shown next to the title.
- ✏️ next to a message edits just that message (title and text, live character count) → 💾 Save.
- ✏️ Edit at the bottom of an event changes the whole event: emoji, name (中文 / English), "Repeats on a fixed schedule" (first day in UTC, repeats every … days, lasts … days), note (e.g. times), guide on the site, action items (days before (−) / after the start, text in 中文 and English, show an announcement / Ranking button), and the in-game messages (+ Message, ✕ removes). "Delete event" removes it.
- + New event adds an event. Events without a fixed schedule only appear in the list, not in the calendar.
- Changes are saved on the site for all officers (other officers see them after refreshing, about 1 minute). Saving uses the same GitHub key as the Post tab; "Someone else changed the events meanwhile" → refresh and try again. The event texts are encrypted like the other officer data.
- Changing the dates of KvK, Viking Vengeance, Swordland Showdown, Tri-Alliance Clash, Eternity's Reach, All Out, Fishing Tournament, Hero Roulette or Cesares Fury also changes when the main site shows those guide buttons on Recent Events.
- If the in-game calendar differs from the page, the game is right — fix the dates with ✏️ Edit.
- The current events, schedules, notes, action items and in-game guide texts are in the EVENTS DATA section below — use it to answer "when is the next …" or "what is the in-game guide for …" (quote in-game guide texts exactly, they are meant to be pasted into the game).

AI ASSISTANT
- The chat recognises an officer automatically when this browser has the saved officer login (or an officer page was unlocked in this tab). Officers have no daily question limit and can ask about members, the officer pages and the events data.

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

