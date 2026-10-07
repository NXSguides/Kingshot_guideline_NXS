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

const VERSION = "2026-10-07e (term list first)";
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
        "Then add one last line starting with 📖 that links the 1–2 pages where they can read more.",
      "Link guides as [Guide name](#guide-id), using the id after 'GUIDE #'.",
      "Never translate or change member names.",
      officer
        ? "This user is a verified OFFICER: answer questions about members, roster, power, name changes, who left, other alliances from the OFFICER DATA section, " +
          "and explain how to use the officer pages step by step from the OFFICER PAGES — HOW TO USE section (use the button names as written there). " +
          "Officer pages you may link: [Roster](roster-x7k2p9.html) (member ranking, power, TC, Mystic Trial, battle tables), " +
          "[Watch](watch-x7k2p9.html) (name changes, power history, who left/joined, notes), [Events](events-x7k2p9.html) (event schedule settings), " +
          "[Post](post-k4m8q2.html) (post / edit announcements)."
        : "This user is NOT an officer. If asked about rosters, member stats, officer pages or anything not in the site content, say that is only available to officers (they can unlock it with the 🔒 button).",
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
    for (const model of MODELS) {
      const res = await gemini(env, model, system, contents);
      if (res.answer) {
        const left = quota ? await quota.count() : null;
        return json({ answer: res.answer, officer, left });
      }
      fails.push(`${model}: ${res.error}`);
      // 429 = free quota used up for this model, 404 = model retired, 503 = busy → try next
    }
    const allQuota = fails.every((f) => f.includes("429"));
    return json({ error: allQuota ? "quota" : "gemini", detail: fails }, 503);
  },
};

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
    try { const r = await openData(JSON.parse(await getText("data/roster-x7k2p9.json")), env); out.officer_data = `ok (${r.members.length} members)`; }
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
- On the main site, tap the title "NXS Guidelines" 5 times quickly → the Roster page opens. Enter the officer password (ask Sherry). Tick "Remember on this device" to skip it next time.
- The tabs at the top switch between 📊 Ranking (Roster), 📢 Post, 🕵️ Watch and 📅 Events. The language button switches all officer tabs between English and 中文.
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

📅 EVENTS (events-x7k2p9.html) — this week's events and officer to-dos
- Shows this week's events (day x of y, start / last day) and ✅ Action items with what officers must schedule; overdue items are marked. Ticks are saved on this device only.
- Shortcuts: 📢 Write announcement, 📊 Open Ranking, 📖 Guide. "Back to this week" after browsing other weeks.
- Dates come from the site's event schedule; game days start 00:00 UTC (08:00 Taiwan). If the in-game calendar differs, the game is right.

AI ASSISTANT
- Officers unlock it with the 🔒 button in the chat (same officer password) and have no daily question limit.
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
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(obj.iv) }, key, b64(obj.data));
  return JSON.parse(new TextDecoder().decode(pt));
}

async function getOfficer(env) {
  if (officerCache.text && Date.now() - officerCache.at < CACHE_MS) return officerCache.text;
  const [roster, watch] = await Promise.all([
    getText("data/roster-x7k2p9.json").then((t) => openData(JSON.parse(t), env)),
    getText("data/watch-x7k2p9.json").then((t) => openData(JSON.parse(t), env)).catch(() => null),
  ]);
  const M = (n) => (n == null ? "?" : (n / 1e6).toFixed(1) + "M");
  const day = (s) => (s ? new Date(s * 1000).toISOString().slice(0, 10) : "?");
  const out = ["===== OFFICER DATA (officers only) ====="];

  out.push(`### ROSTER — ${roster.alliance?.name || ""} [${roster.alliance?.tag || ""}], updated ${String(roster.updated).slice(0, 10)}`,
    "name | rank | power | TC | kills | last active | language");
  for (const m of [...roster.members].sort((a, b) => (b.power || 0) - (a.power || 0)))
    out.push(`${m.name} | ${m.rank} | ${M(m.power)} | ${m.tc ?? "?"} | ${M(m.kills)} | ${m.lastLogin || day(m.lastActive)} | ${m.lang || "?"}`);

  if (watch) {
    const byId = Object.fromEntries(roster.members.map((m) => [m.id, m.name]));
    const renames = [], growth = [];
    for (const [id, w] of Object.entries(watch.members || {})) {
      const name = byId[id] || w.names?.at(-1)?.[1] || id;
      if (w.names?.length > 1) renames.push(`${name}: ` + w.names.map(([d, n]) => `${n} (${d})`).join(" → "));
      const p = w.power || [];
      if (p.length > 1) growth.push([name, p[0][1], p.at(-1)[1], p[0][0], p.at(-1)[0]]);
    }
    out.push(`### WATCH — tracking since ${watch.started}`);
    out.push("Name changes:", renames.length ? renames.join("\n") : "none");
    out.push("Left the alliance:", (watch.left || []).map((l) => `${l.name} (${l.leftOn})`).join(", ") || "none");
    growth.sort((a, b) => (b[2] - b[1]) - (a[2] - a[1]));
    out.push("Power change since tracking started (biggest first):",
      growth.map(([n, a, b, d1, d2]) => `${n}: ${M(a)} (${d1}) → ${M(b)} (${d2})`).join("\n"));
    const others = Object.values(watch.others || {}).map((a) =>
      `[${a.tag}] ${a.name} (#${a.kid}, ${a.asOf}): ${a.members.length} members; top: ` +
      a.members.slice(0, 5).map(([, n, p]) => `${n} ${M(p)}`).join(", "));
    if (others.length) out.push("### OTHER ALLIANCES", others.join("\n"));
  }
  officerCache = { text: out.join("\n"), at: Date.now() };
  return officerCache.text;
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

