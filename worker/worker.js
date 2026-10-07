/* NXS AI assistant — Cloudflare Worker
   Paste this whole file into the Cloudflare Worker editor.
   Secrets (Settings → Variables and Secrets):
     GEMINI_API_KEY — from a SEPARATE Google AI Studio project
     DATA_KEY       — the officer data key from the Post tab (needed once officer data is encrypted)
   Everyone:  answers from data/ai-context.txt (public guides + announcements).
   Officers:  also roster / watch data. "Officer" = the GitHub key unlocked with the officer
              password, verified here against GitHub (must have write access to the repo). */

const SITE_ORIGIN = "https://nxsguides.github.io";
const SITE_BASE = SITE_ORIGIN + "/Kingshot_guideline_NXS/";
const REPO = "NXSguides/Kingshot_guideline_NXS";
// Same fallback idea as the translate script: if one model is busy or gone, try the next.
const MODELS = ["gemini-3.5-flash", "gemini-3-flash-preview", "gemini-2.5-flash", "gemini-2.5-flash-lite"];

const LIMIT_PER_MIN = 6;          // per visitor IP (best-effort)
const CACHE_MS = 10 * 60 * 1000;  // re-read site data every 10 minutes

const LANG_NAMES = { en: "English", zh: "Traditional Chinese (繁體中文)", ko: "Korean", de: "German", fr: "French",
  pt: "Brazilian Portuguese", es: "Spanish", tr: "Turkish", id: "Indonesian", ru: "Russian", th: "Thai", ar: "Arabic" };

let publicCache = { text: "", at: 0 };
let officerCache = { text: "", at: 0 };
const verified = new Map();  // sha256(token) -> expiry
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
    const lang = LANG_NAMES[body.lang] ? body.lang : "en";
    const history = (Array.isArray(body.history) ? body.history : []).slice(-6)
      .filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string")
      .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 1500) }] }));

    const officer = await isOfficer(body.officerToken);

    let context;
    try {
      context = await getPublic();
      if (officer) {
        try { context += "\n\n" + await getOfficer(env); }
        catch (e) { context += "\n\n(OFFICER DATA is unavailable right now: " + e.message + ")"; }
      }
    } catch (e) { return json({ error: "site_unreachable" }, 502); }

    const system = [
      "You are the helper for the NXS alliance's Kingshot guide website (alliance NXS / NEXUS, kingdom #2189).",
      "Use ONLY the SITE CONTENT below. If the answer isn't there, say so briefly and point to the closest page.",
      `Reply in the language the user writes in; if unclear, use ${LANG_NAMES[lang]}. Use the game terms of that language as the site does.`,
      "ANSWER FORMAT: first give the actual answer directly (the specific heroes, numbers, times, steps, names) " +
        "in a few short lines or a short list — do NOT just tell the user to read a page. " +
        "Then add one last line starting with 📖 that links the 1–2 pages where they can read more.",
      "Link guides as [Guide name](#guide-id), using the id after 'GUIDE #'.",
      "Never translate or change member names.",
      officer
        ? "This user is a verified OFFICER: answer questions about members, roster, power, name changes, who left, other alliances from the OFFICER DATA section. " +
          "Officer pages you may link: [Roster](roster-x7k2p9.html) (member ranking, power, TC, Mystic Trial, battle tables), " +
          "[Watch](watch-x7k2p9.html) (name changes, power history, who left/joined, notes), [Events](events-x7k2p9.html) (event schedule settings), " +
          "[Post](post-k4m8q2.html) (post / edit announcements)."
        : "This user is NOT an officer. If asked about rosters, member stats, officer pages or anything not in the site content, say that is only available to officers (they can unlock it with the 🔒 button).",
      "\n===== SITE CONTENT =====\n" + context,
    ].join("\n");

    if (!env.GEMINI_API_KEY) return json({ error: "setup", detail: ["GEMINI_API_KEY secret is missing"] }, 500);
    const contents = [...history, { role: "user", parts: [{ text: question }] }];
    const fails = [];
    for (const model of MODELS) {
      const res = await gemini(env, model, system, contents);
      if (res.answer) return json({ answer: res.answer, officer });
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
  const out = { worker: "ok", colo: req.cf?.colo || "?", country: req.cf?.country || "?",
    GEMINI_API_KEY: env.GEMINI_API_KEY ? "set" : "MISSING", DATA_KEY: env.DATA_KEY ? "set" : "not set" };
  try { out.ai_context = (await getText("data/ai-context.txt")).length + " characters"; }
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

async function getText(file) {
  const r = await fetch(SITE_BASE + file, { cf: { cacheTtl: 300 } });
  if (!r.ok) throw new Error(file + " " + r.status);
  return r.text();
}

async function getPublic() {
  if (publicCache.text && Date.now() - publicCache.at < CACHE_MS) return publicCache.text;
  publicCache = { text: await getText("data/ai-context.txt"), at: Date.now() };
  return publicCache.text;
}

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

async function isOfficer(token) {
  if (typeof token !== "string" || token.length < 20 || token.length > 300) return false;
  const h = await sha(token);
  if ((verified.get(h) || 0) > Date.now()) return true;
  const r = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "nxs-ai-worker" },
  });
  if (!r.ok) return false;
  const repo = await r.json();
  const ok = !!(repo.permissions && repo.permissions.push);
  if (ok) verified.set(h, Date.now() + CACHE_MS);
  return ok;
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
