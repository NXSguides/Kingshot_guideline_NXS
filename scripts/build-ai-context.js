/* Builds the public text the AI assistant answers from — one file per language:
     data/ai-context-<lang>.txt  = that language's guides + announcements + game-term list
     data/ai-context.txt         = English copy (kept for older Worker versions)
   Only PUBLIC content goes here. Officer data is added by the Cloudflare Worker,
   and only for verified officers. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

const D = {};
// troop limits (officer page → Events → Troop limits) are written as {=bear} / {=rally} in the guides
let LIM = { bear: 90000, rally: 70080 };
try { LIM = Object.assign(LIM, JSON.parse(read("data/limits.json"))); } catch (e) {}
const withLim = (src) => src.replace(/\{=(\w+)\}/g, (m, k) => (LIM[k] ? Number(LIM[k]).toLocaleString("en-US") : m));
new Function("D", withLim(read("data/content.js")) + "\nD.LANGS = LANGS; D.GUIDES = GUIDES; D.GLOSSARY = GLOSSARY; D.HEROES = HEROES;" +
  "\nD.JOURNEY = typeof JOURNEY !== 'undefined' ? JOURNEY : [];" +
  "\nD.JOURNEY_TR = typeof JOURNEY_TR !== 'undefined' ? JOURNEY_TR : {};" +
  "\nD.HERO_CARDS = typeof HERO_CARDS !== 'undefined' ? HERO_CARDS : []; D.HERO_CARD_UI = typeof HERO_CARD_UI !== 'undefined' ? HERO_CARD_UI : null;")(D);
const T = {};
try { new Function("T", read("data/terms.js") + "\nT.TERMS = TERMS; T.TERM_LANGS = TERM_LANGS;")(T); }
catch (e) { console.warn("terms.js skipped:", e.message); }

// KvK Points Planner (kvk-optimizer.html) — public page, linked at the top of the KvK guide's table
const KP = {};
try { new Function("KP", read("data/kvk-plan.js") + "\nKP.PLAN = KVK_PLAN;")(KP); }
catch (e) { console.warn("kvk-plan.js skipped:", e.message); }

let anns = [];
try { anns = JSON.parse(read("data/announcements.json")); } catch (e) { console.warn("announcements skipped:", e.message); }
if (Array.isArray(anns)) anns = anns.filter((a) => !a.expiresAt || Date.parse(a.expiresAt) > Date.now());   // auto-deleted ones

const SKIP_KEYS = new Set(["type", "src", "url", "guide", "color", "id", "icon", "emoji", "priority", "c", "k", "alt", "to"]);

function build(lang) {
  const pick = (m) => (m && (m[lang] || m.en || m.zh || Object.values(m)[0])) || "";
  const clean = (s) => String(s)
    .replace(/\{(\w+)\}/g, (m, id) => (D.GLOSSARY[id] ? pick(D.GLOSSARY[id]) : D.HEROES[id] ? pick(D.HEROES[id]) : id))
    .replace(/\[\[link:([\w-]+)\]\]/g, (m, g) => (D.GUIDES[g] ? `(see guide #${g})` : ""))
    .replace(/\[\[table:[^\]]+\]\]/g, "(battle table: shown in the reader's language)")
    .replace(/\[\[squad:page\]\]/g, "(see the Squad Guide page squad-guide.html)")
    .replace(/\[\[squad:guide\]\]/g, "(see guide #formations-rally-tips)")
    .replace(/\[\[img:[^\]]+\]\]/g, "")
    .replace(/\[\[video:[^\]]+\]\]/g, "(video)")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .trim();
  const walk = (v, out, key) => {
    if (typeof v === "string") {
      if (SKIP_KEYS.has(key) || /^https?:|\.(png|jpe?g|webp|gif|mp4)$/i.test(v)) return;
      const c = clean(v);
      if (c) out.push(D.HEROES[c] ? pick(D.HEROES[c]) : c);
    } else if (Array.isArray(v)) v.forEach((x) => walk(x, out, key));
    else if (v && typeof v === "object") for (const k in v) walk(v[k], out, k);
  };

  const parts = [];
  for (const [id, g] of Object.entries(D.GUIDES)) {
    if (id === "recent-events") continue; // only a list of links
    const s = (g.sections && (g.sections[lang] || g.sections.en || g.sections.zh)) || null;
    if (!s) continue;
    const lines = [];
    walk(s.blocks || s, lines);
    // extra per-guide data (e.g. bear-hunt joiners/leaders, swordland buildings/zones)
    for (const k of Object.keys(g)) {
      if (["emoji", "name", "sections", "hidden"].includes(k)) continue;
      const extra = [];
      walk(g[k][lang] || g[k].en || g[k], extra);
      if (extra.length) lines.push(`[${k}] ` + extra.join(" | "));
    }
    // hero cards: the cards themselves live in HERO_CARDS, not in the guide's blocks
    if (id === "hero-cards" && D.HERO_CARDS.length && D.HERO_CARD_UI) {
      const U = D.HERO_CARD_UI, mark = (v) => (v === "y" ? "✅" : v === "n" ? "❌" : v === "c" ? "⚠️" : v || "—");
      for (const h of D.HERO_CARDS) {
        const name = D.HEROES[h.id] ? pick(D.HEROES[h.id]) : D.GLOSSARY[h.id] ? pick(D.GLOSSARY[h.id]) : h.id;
        const tx = h.t[lang] || h.t.en || {};
        const head = `${name} — ${clean(pick(U.gen).replace("{n}", h.gen))}, ${clean("{" + h.troop + "}")}, ${h.rarity}, ${clean(pick(U[h.kind]))}`;
        const roles = h.r ? Object.keys(U.roles).map((r) => `${clean(pick(U.roles[r]))} ${mark(h.r[r])}`).join("; ") : clean(pick(U.noRatings));
        lines.push(`${head}\n  ${roles}\n  ${(tx.sum || []).map(clean).join(" ")}${tx.quip ? `\n  "${clean(tx.quip)}"` : ""}`);
      }
    }
    parts.push(`### GUIDE #${id} — ${pick(g.name)}\n${[...new Set(lines)].join("\n")}`);
  }

  if (D.JOURNEY.length) {
    const tr = D.JOURNEY_TR[lang] || {};
    const jt = (s) => clean(tr[s] || s);
    const j = D.JOURNEY.map((e) => `${jt(e.t)}: ` + e.o.map((o) => `${jt(o[0])} → ${jt(o[1])}${o[2] ? " (best)" : ""}`).join("; "));
    parts.push(`### JOURNEY CHOICES (shown inside the general guides)\n${j.join("\n")}`);
  }

  if (KP.PLAN) {
    const P = KP.PLAN, u = { ...P.ui.en, ...(P.ui[lang] || {}) };
    const nm = (it) => it.n[lang] || it.n.en;
    const rows = P.items.map((it) => `${nm(it)}: ${it.v.toLocaleString("en-US")} pts${it.sp ? " per minute" : it.score ? " per 1 score" : " each"}, scores on KvK prep day ${it.days.join(", ")}`);
    rows.push(`${u.train} T1–T11: ${P.troopPts.join(", ")} pts per troop (Day 4); ${u.promote}: the difference between the two tiers`);
    if (P.lv) {
      const mn = (m) => P.lv.mats[m][lang] || P.lv.mats[m].en;
      const q = (s) => (P.lv.gear.q[s.q][lang] || P.lv.gear.q[s.q].en) + (s.st ? " " + "★".repeat(s.st) : "");
      rows.push(`${u.s4}: ${u.s4hint}`);
      rows.push(`Governor Charm score per level (cost per charm: ${P.lv.charm.mats.map(mn).join(" / ")}): ` + P.lv.charm.steps.map((s) => `${s.n} +${s.score}${s.est ? " (est.)" : ""} [${s.c.join("/")}]`).join("; "));
      rows.push(`Pet advancement score per advance (same for every pet): ` + P.lv.pet.groups[P.lv.pet.groups.length - 1].steps.map((s) => `${s.n} +${s.score}`).join("; ") + `. Materials (${P.lv.pet.mats.map(mn).join(" / ")}) depend on the pet's max level: ` + P.lv.pet.groups.map((g) => `max ${g.max}: ` + g.steps.map((s) => `${s.n} [${s.c.join("/")}]`).join(", ")).join(" | "));
      if (P.lv.hg) rows.push(`Hero Gear Mastery Forging (專精鍛造), per gear piece: level L costs 10×L ${mn("fh")}; from Lv.11 also (L−10) ${mn("mg")}. Lv.0→10 = 550 Forgehammers, Lv.0→20 = 2,100 Forgehammers + 55 Mythic Hero Gear. Forgehammers score KvK points per hammer used (see the item table). The planner's level picker turns "from → to × pieces" into Forgehammers.`);
      rows.push(`Governor Gear score per step, per piece (cost: ${P.lv.gear.mats.map(mn).join(" / ")}): ` + P.lv.gear.steps.map((s) => `${q(s)} +${s.score} [${s.c.join("/")}]`).join("; ") + `. ${u.lvGearNote}`);
    }
    parts.push(`### KVK POINTS PLANNER — page "${u.title}" (kvk-optimizer.html?lang=${lang}), opened from the link at the top of the KvK guide's table (guide #kvk). Not in the guide menu, but it is a public page anyone can use.
${u.subtitle}
- ${u.mA}: ${u.mAd}
- ${u.mB}: ${u.mBd}. ${u.tgHint}
- ${u.s2hint}
- ${u.s3hint}
Point values and scoring days used by the planner:
${rows.join("\n")}
${u.foot}`);
  }

  // hidden page: how to book Chief Minister / Noble Advisor (linked from the KvK checklist items)
  try {
    const BG = {}; new Function("BG", read("data/booking-guide.js") + "\nBG.G = BOOKING_GUIDE;")(BG);
    const u = BG.G.ui, tx = (k) => u[k][lang] || u[k].en;
    parts.push(`### BOOKING GUIDE — page "${tx("title")}" (booking-guide.html?lang=${lang}#pm or #adv), a public page opened from the "How to book" buttons in the KvK checklist pop-up. Has annotated screenshots.
${tx("intro")}
${tx("pm")}: ${tx("pmBuff")}. ${tx("adv")}: ${tx("advBuff")}.
Steps: ${u.steps.map((s, i) => `${i + 1}. ${s[lang] || s.en}`).join(" ")}
${tx("tip")}`);
  } catch (e) { console.warn("booking-guide.js skipped:", e.message); }

  try {
    const SG = {}; new Function("SG", read("data/squad-guide.js") + "\nSG.G = SQUAD_GUIDE;")(SG);
    const u = SG.G.ui, tx = (k) => u[k][lang] || u[k].en;
    parts.push(`### SQUAD GUIDE — page "${tx("title")}" (squad-guide.html?lang=${lang}), a public page linked from the Formations & Rally Tips guide (guide #formations-rally-tips) right after the recommended presets list; the Bear Hunt guide's joiner rules link to that guide. Annotated screenshots.
${tx("intro")}
Steps: ${u.steps.filter(Boolean).map((s, i) => `${i + 1}. ${s[lang] || s.en}`).join(" ")} ${tx("caseA")}: ${tx("caseAt")} ${tx("caseB")}: ${tx("caseBt")} ${tx("s7")} ${tx("s7a")}; ${tx("s7b")}. ${tx("s8")}
${tx("tip")}`);
  } catch (e) { console.warn("squad-guide.js skipped:", e.message); }

  const recent = anns.slice(0, 15).map((a) =>
    `[${String(a.createdAt).slice(0, 10)} by ${a.author}] ${clean(pick(a.title))}\n${clean(pick(a.content))}`);
  // the site's own tools (not in any guide) — so the AI never claims the site lacks notifications.
  // ⚠️ Keep in step with Little Sparrow (js/sparrow.js: SITE_STEPS / TM_STEPS) — scripts/check-help.js checks both.
  parts.push(`### SITE FEATURES (this website itself)
⏰ Timers & reminders: tap ⏰ at the top of the 💬 Ask AI panel. Add timers (training, building, research, gathering, appointments…) and 🎮 game reminders for alliance events. The site CAN send push notifications: in the ⏰ panel tap "Turn on notifications" and allow them; "Test" sends one to check. Notifications are optional and only asked for when you turn them on. 🎮 Game reminders include ⚔️ KvK city attacks (10:00 UTC) and 🏰 KvK Castle Battle (12:00–17:00 UTC; the default 60-min warning comes at 11:00) on the KvK battle day (day 6 of KvK; added 2026-11-07, ON by default — default warnings 30 and 60 min before; turn off or change in the ⏰ panel).
iPhone / iPad: notifications only work from the app added to the Home Screen (Safari → Share → Add to Home Screen, iOS 16.4+), not from a Safari tab (see guide #install-app).
🔔 Reminders at the top of the site list the pushes received in the last 24 hours.
If notifications don't come: open "🔧 Notifications not coming?" under the notifications line in the ⏰ panel. Common causes: blocked for this site/app (allow it in phone Settings → Notifications → NXS, or on a computer in the browser's site settings / on a Mac in System Settings → Notifications → the NXS app); the permission reset after a system or browser update or reinstall; Focus / Do Not Disturb / Low Power Mode; Android battery saving. Last resort: remove the app, add it again and tap Allow.
Top-right buttons (installed app): 🔗 copy the link of this page (briefly shows ✓ when copied), ↻ refresh to the newest version, ☾ / ☀ dark / light mode. 🐦 brings Little Sparrow back if it was turned off.
📢 Each announcement has "🔗 Copy link" next to its date: the link (…/#a/…) opens the site straight on that announcement, scrolled to it, in the reader's own language, and it stays on it (no auto-switch) until the reader picks another; if that announcement was deleted or has expired, the link just opens the home page. 📢 Announcements switch to the next one by themselves after a few seconds; ⏸ Stay here (next to the date) stops that on this device, ▶ Auto-switch turns it back on (swipe and tabs still work). A battle table inside an announcement shows in the reader's language (all 12 — buildings, phases, tasks and reminders; player names stay as written); the picture with it stays in English. "🙋 Who are you?" above the table: pick your name and only the buildings (Tri-Alliance: your team) you are in stay; a Swordland building with no name assigned to it, and a Tri-Alliance team with no names at all, also stay for everyone (they concern the whole alliance); a Swordland building marked "All" stays for everyone, and one that only says "Same as above" stays for the people named in the building above it; "Show everyone" (or the 👀 Show everyone button next to the menu) shows all again.
🐦 Little Sparrow (the bird by the Ask AI button): tap it and it first asks "Want a quick tour of this page?" — 👀 Yes walks top to bottom through the page you are on: first the top buttons (🔗, ↻, 📋 officers only, light/dark, the announcement ticker, languages, guide menus), then the page (home page: this week, daily checklist, calendar, announcements, guide menus, language, Ask AI; a guide: its headings, hero cards, rule boxes, switching guides). After the tour, or after "No thanks", it shows its help menu: 🔎 Find a page, or 🎓 "How do I use…" → pick a tour: 🧭 What the buttons on the site do (language, 🔗, ↻, light/dark, Ask AI), ⏰ timers, 🔔 game reminders, or installing the app. The same tours are listed at the top of the Ask AI panel.
📍 Where's my spot?: its own page — the 📍 button next to 🤝 NAP Rules at the top (guide #my-spot), for hive moves. Members type their in-game name and get their new X:Y (📋 copy) and their Bear Trap group (🐻 BT1 / BT2); a map like Kingshot Mapper shows every planned city with the member's name and each spot's X,Y, the Bear Traps and HQ (tap a city to see who is there, drag / swipe to move around, 🔍 － / ＋ above the map to zoom, or Ctrl + wheel / pinch). It is the officers' live 🐝 Hive plan, so it always shows the newest plan; names follow the daily roster. Not on the plan = no spot yet → ask an officer. The officers open this page only when a new hive is ready; while it is hidden the 📍 button is not shown and the page says it is not open yet.
📅 This week card on the home page (short version, Sherry 2026-11-06): Now = full rows only for events with a guide, battle days (⚔️), repair days and days with something to do (📝); events that are just running sit on one "Also on:" line with their day (e.g. 🏆 Alliance Championship 5/7). Coming up = one line per day (tomorrow / in N days) with that day's events side by side; tap a guide's name to open it. 📝 = something to do today — Alliance Championship days 1–2 (Mon–Tue UTC): sign up & update your teams. The 📆 Calendar below no longer repeats today's list (it says today's events are in 📅 This week above); tap another day to see that day. ⚔️ only marks real battle days (Sanctuary Battle: day 4 = Friday; Tue–Thu are sign-up days).
📚 Guide list — a small “Irregular” tag next to a guide name (Sherry 2026-11-11) = a one-off event with no fixed cycle (e.g. Wavebound Voyage, Fantasy Theater). 📍 Where's my spot? — map colours (Sherry 2026-11-10): a planned spot is drawn light while that member isn't on it yet, full colour with a green edge once they are. 📍 Where's my spot? — wrong-spot lists (Sherry 2026-11-06): above the map, from each member's castle on the map vs. their spot on the plan: 🤗 Naughty = castle sits on someone else's spot ("Mimi that's Amber's spot"; that spot keeps its owner's name on top and gets a second red line "🤗 who sits there" (2026-11-11), the sitter's castle is only a red dashed outline with a dashed line to their own spot); 🙃 Crooked = overlaps their own spot a little but nobody else's; 🫥 Where are you? = not on their spot at all ("remember to come home"). Each row has a 📍 Spot button that lights up their own spot on the map (no spot on the plan → "No spot was assigned to you please contact an R4"). Members without a spot are left out on purpose unless they sit on someone's spot. Searching your own name shows your line on top (you're on someone's spot → "you'll keep them from coming home 😡😡"; ✅ when you're on your spot).
🔰 New here?: its own page — the 🔰 button right after 🏠 Home at the top (the home page: 📅 This week, ✅ daily checklist, 📆 calendar, then the 📢 Announcements board; the tab was called Recent Events before 2026-11-06) (guide #new-here), for new members (e.g. people joining from TTT), in the order of Nia's Onboarding chat: translating messages in the game (tap ⇄ next to a message in the game); Nia's 5 core rules (stay active, respect NAP 6 and report instead of hitting back, follow event rules — check alliance chat, private messages, our website and Discord, team play, keep World Chat civil); NAP 6 and the 3 steps for violations; Sanctuaries & Fortresses — assigned to the top 6 NAP alliances, a battle every Friday, never fight for one assigned to another alliance (a big NAP break): NXS 1, 6 + Fortress 2, NRD 10, 11 + Fortress 4, RED 2, 3 + Fortress 3, ESA 5, 12 + Fortress 1, IDN 4, KGb 8, 7 and 9 are fought for and each alliance can hold only one of them; the Sanctuary & Fortress rules (no solo attacks, exact troops and heroes, wait for R4/R5 before teleporting); Bear Trap — strict rules on heroes, troop numbers and ratio (wrong heroes lower the total damage; link to the 🐻 Bear Hunt guide), don't teleport before an R4 gives you a spot, BT1 22:00 / BT2 13:00 UTC; a link to 🛡️ Formations & Rally Tips for other events' ratios and troop numbers; optional name change — the format is 亗 ᴺᵉˣᵘˢ亗 with your name typed right after the first 亗 (e.g. 亗Sparrow ᴺᵉˣᵘˢ亗), with a 📋 Copy button; gift codes — Android in game (Governor picture → Settings → Gift Code), iOS on ks-giftcode.centurygame.com; where we share information; Discord and site links.
🤝 NAP rules: their own page — the 🤝 NAP Rules button at the top, after 🔰 New here? (guide #nap-rules): the NAP 6 tags, checking nodes before gathering, the All Out exception, outposts, Sanctuaries / Fortresses, and the 3 steps for violations. (The home page has no NAP card any more — removed 2026-11-06; use the 🤝 button.)
The language buttons at the top switch the whole site (12 languages).`);
  if (recent.length) parts.push(`### ANNOUNCEMENTS (newest first, see guide #recent-events)\n${recent.join("\n\n")}`);

  // official in-game names: the AI must use these instead of leaving terms in English
  const col = T.TERM_LANGS ? T.TERM_LANGS.indexOf(lang) : -1;
  if (lang !== "en" && col > 0) {
    const rows = [];
    for (const grp of T.TERMS || []) for (const r of (grp && grp.rows) || [])
      if (Array.isArray(r) && r[col] && r[col] !== "—" && r[col] !== r[0]) rows.push(`${r[0]} = ${r[col]}`);
    for (const m of [...Object.values(D.GLOSSARY), ...Object.values(D.HEROES)])
      if (m && m.en && m[lang] && m[lang] !== m.en) rows.push(`${m.en} = ${m[lang]}`);
    if (rows.length) parts.push(`### GAME TERMS (English = official ${lang} name)\n${[...new Set(rows)].join("\n")}`);
  }
  return parts.join("\n\n") + "\n";
}

for (const { code } of D.LANGS) {
  const text = build(code);
  fs.writeFileSync(path.join(ROOT, `data/ai-context-${code}.txt`), text);
  if (code === "en") fs.writeFileSync(path.join(ROOT, "data/ai-context.txt"), text);
  console.log(`ai-context-${code}.txt: ${Buffer.byteLength(text)} bytes`);
}
