/* 🐦🤖 Little Sparrow and the AI must explain the same features — one is never updated without the other.
   Runs in CI (.github/workflows/ci.yml) and at the start of scripts/smoke.mjs; a failure blocks the change.
     node scripts/check-help.js
   Fails when:
   1. an officer tab has no Little Sparrow tour (OTOURS in js/sparrow.js) or no part in the AI officer handbook
      (an "@tab" block or "[tab] " line in OFFICER_HELP, worker/worker.js — that is also what hides it from officers without the tab);
   2. a Little Sparrow step has no English or Chinese text;
   3. a feature in FEATURES below is explained by one and not the other;
   4. an outdated sentence (STALE) is back in the guides, the AI context, the officer handbook or Little Sparrow.
   ➕ New feature: write its Little Sparrow step AND its AI line, then add one row to FEATURES
      [name, words the AI text uses, words / step key in js/sparrow.js]. */
const fs = require("fs"), path = require("path");
const R = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");

const sparrow = R("js/sparrow.js"), worker = R("worker/worker.js"), aiBuild = R("scripts/build-ai-context.js"), content = R("data/content.js");
const help = worker.slice(worker.indexOf("const OFFICER_HELP = `"), worker.indexOf("`;", worker.indexOf("const OFFICER_HELP = `")));
const ai = help + "\n" + aiBuild;
const core = R("js/officer/core.js");
const tabs = JSON.parse(core.match(/OFFICER\.PERM_TABS = (\[[^\]]*\])/)[1]).concat("perms");

const FEATURES = [
  // [name, AI (worker OFFICER_HELP or scripts/build-ai-context.js), Little Sparrow (js/sparrow.js)]
  ["Post: formatting toolbar", /Word-like toolbar/, /po02b:/],
  ["Post: looks / scroll themes", /"Look" \(樣式\)/, /po05:/],
  ["Post: auto-delete", /Auto-delete/, /Auto-delete/],
  ["Events: announcement draft", /Announcement draft/, /Announcement draft/],
  ["Events: one-event game post", /Game post/, /Game post/],
  ["Events: battle-day times (@)", /22:00@1/, /@1/],
  ["Ranking: Swordland rules draft", /Swordland rules draft/, /Swordland rules draft/],
  ["Ranking: version history", /Version history/, /🕘/],
  ["Ranking: shared plans", /New shared plan/, /shared plan/i],
  ["Move: member positions + blueprint on one map", /\[move\] - 🚚 Move → "👥 Member positions"[^\n]*blueprint/, /{ s: "#mm_map", k: "mv01" }, { s: "#km_members > h3", k: "mp40" }/],
  ["Move: move steps checklist", /Move steps/, /{ s: "#mv_steps", k: "mv02" }/],
  ["Move: tap a planned spot to put a member there", /putting members on the plan by tapping/, /{ s: "#mm_map .mm-ps.ed", k: "mv08", e: 1 }/],
  ["Move: 📐 auto plan from a Mapper layout (road, stages, checks, edit, PNG)", /Auto plan from a Mapper layout/, /{ s: "#hp_root > h3", k: "hp01" }/],
  ["Move: 📐 shared auto plans (Plan list)", /Share as a plan/, /{ s: "#hp_root .hp-sh", k: "hp03" }/],
  ["Move tab", /🚚 Move/, /mv01:/],
  ["Board", /💬 Board/, /bd01:/],
  ["Attendance", /📋 Attendance/, /at01:/],
  ["Officers table", /👥 Officers/, /pm01:/],
  ["Scout", /Fetch now/, /sc01:/],
  ["Site: timers", /⏰ Timers/, /tm01:/],
  ["Site: game reminders 🔔", /🔔 Reminders/, /tm21:/],
  ["Site: notifications help", /Notifications not coming/, /tm03b:/],
  ["Site: top buttons", /↻ refresh/, /si03:/],
  ["Site: install the app", /install-app/, /inst1:/],
  ["Map: download banner coordinates", /Download banner coordinates/, /mp33:/],
  ["Blacklist (All Out): location + shield every 15 min", /BLACKLIST \(officer-x7k2p9\.html#hunt/, /hn01:/],
  ["Blacklist: shield timer (follow ⏰)", /shield timer/, /hn05:/],
  ["Blacklist: ✏️ manual position", /type a newer position by hand/, /✏️ next to X:Y/],
  ["Blacklist: ⭐ special mark (row lights up, on top)", /special mark/, /⭐ marks a player for everyone/],
  ["Move: hive rules card", /Hive rules & tips/, /mv00:/],
  ["Sparrow: quick tour of this page / the officer page", /quick tour of this page[\s\S]*quick tour of the officer page|quick tour of the officer page[\s\S]*quick tour of this page/, /tourQ:[\s\S]*tourQo:[\s\S]*ob07:/],
];
const STALE = [
  [/other browsers can't install|其他瀏覽器無法安裝/, "iPhone: Chrome can add to the Home Screen too (iOS 16.4+)"],
  [/(has|have|sends?) no (push )?notifications|can(no|')t send notifications/i, "the site does send notifications (⏰ panel)"],
  [/(enter|type) the officer password|輸入幹部密碼/i, "officers log in with Discord"],
  [/officer pages are in English and 中文/, "officer pages have 5 languages"],
];

const fails = [];
const otours = sparrow.slice(sparrow.indexOf("const OTOURS = {"), sparrow.indexOf("\n  };", sparrow.indexOf("const OTOURS = {")));
for (const t of tabs) {
  if (!new RegExp(`\\n    ${t}: \\[`).test(otours)) fails.push(`🐦 officer tab "${t}" has no Little Sparrow tour (OTOURS in js/sparrow.js)`);
  if (!new RegExp(`\\n@${t}\\n|\\n\\[${t}\\] `).test(help)) fails.push(`🤖 officer tab "${t}" has no part in the AI handbook (@${t} / [${t}] in worker/worker.js OFFICER_HELP)`);
}
const keys = new Set([...sparrow.matchAll(/\bk: "(\w+)"/g)].map((m) => m[1]));
for (const k of keys) {
  const n = (sparrow.match(new RegExp(`\\b${k}: "`, "g")) || []).length;
  if (n < 2) fails.push(`🐦 Little Sparrow step "${k}" has no text (needs at least English and 中文)`);
}
for (const [name, a, s] of FEATURES) {
  if (!a.test(ai)) fails.push(`🤖 the AI doesn't explain "${name}" (looked for ${a}) — Little Sparrow does`);
  if (!s.test(sparrow)) fails.push(`🐦 Little Sparrow doesn't explain "${name}" (looked for ${s}) — the AI does`);
}
for (const [re, why] of STALE)
  for (const [f, txt] of [["data/content.js", content], ["scripts/build-ai-context.js", aiBuild], ["worker OFFICER_HELP", help], ["js/sparrow.js", sparrow]]) {
    const m = txt.match(re); if (m) fails.push(`📛 outdated text in ${f}: "${m[0]}" — ${why}`);
  }

if (fails.length) { console.error("❌ Little Sparrow / AI out of step:\n  " + fails.join("\n  ")); process.exit(1); }
console.log(`✅ Little Sparrow and the AI match (${tabs.length} officer tabs, ${FEATURES.length} features, ${keys.size} tour steps)`);
