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
  ["Events: 👤 Only remind (to-do sent by the server to chosen officers only)", /"👤 Only remind" \(只提醒/, /👤 Only remind: tick officers/],
  ["Heroes: ⚖️ compare two heroes", /⚖️ Compare two heroes \(🦸 Heroes tab, card after/, /⚖️ Compare two heroes: pick a troop slot/],
  ["Heroes: 🎯 second uses (joiners & side jobs)", /🎯 Second uses \(🦸 Heroes tab, card after/, /🎯 Second uses: a joiner only uses/],
  ["Events: a to-do links several in-game guides (ig list)", /ig can also be a LIST of guide titles/, /A task can link several guides \(ig as a list\)/],
  ["Events: 📅 {date:+N} codes in in-game guides", /📅 date codes \(Sherry 2026-11-03\)/, /📅 Date codes: write \{date:\+N\}/],
  ["Events: ⭐ today + linked in-game guide on the task", /⭐ today \(Sherry 2026-11-02\)/, /⭐ A task due today lights up/],
  ["Events: 📥 paste back from Claude", /"📥 Paste back from Claude" \(inside/, /📥 Paste back from Claude \(only Sparrow/],
  ["Events: 📋 copy in-game messages from the to-do card", /one "📋 <title>" button per in-game message/, /Each 📋 button copies one of this event/],
  ["Events: 📤 For Claude export", /📤 For Claude" \(給 Claude/, /📤 For Claude \(only Sparrow sees this\): copies the next 4 weeks/],
  ["Site: 🔰 New here? (onboarding page)", /🔰 New here\?: its own page/, /🔰 New here\? Read this page once/],
  ["Site: 📍 Where's my spot? (public hive map)", /📍 Where's my spot\?: its own page/, /📍 Where's my spot\?: type your name/],
  ["Site: 📅 This week short lines + 📝 to-do days", /📅 This week card on the home page \(short version/, /📝 = something to do today/],
  ["Site: ⏰ KvK battle-day game reminders (10:00 / 12:00 UTC)", /KvK city attacks \(10:00 UTC\)/, /KvK city attacks \(10:00 UTC\)/],
  ["Scout: ⚡ Opponents now (battle-time fetch, batches, find by name, download)", /⚡ OPPONENTS NOW/, /ak08: "⚡ Opponents now/],
  ["Site: 📍 wrong-spot lists (🤗 / 🙃 / 🫥)", /wrong-spot lists/, /🤗 sitting on someone's spot/],
  ["Site: 🤝 NAP rules page", /🤝 NAP rules: their own page/, /🤝 NAP Rules has its own button here/],
  ["Site: ⏸ Stay here on announcements", /⏸ Stay here \(next to the date\) stops that/, /⏸ Stay here \(next to the date\) stops it switching/],
  ["Ranking: ④ battle table in every language in announcements", /④ Battle table in every language/, /shows in each reader's language \(all 12/],
  ["Site: 🙋 Who are you? in a battle table", /🙋 Who are you\?/, /🙋 pick your name and only your part stays/],
  ["Site: battle table in an announcement in your language", /battle table inside an announcement shows in the reader's language/, /A battle table in one shows in your language/],
  ["Ranking: 🔱 Tri-Alliance Clash groups (Teams A–D)", /Tri-Alliance Clash \/ 三盟爭霸: the alliance's TAC plan[^\n]*Team A – Attack/, /🔱 Tri-Alliance Clash for its 4 teams/],
  ["Ranking: 🎯 the plan's event (picked once, ③ and ④ follow)", /🎯 Event \(活動\) in the plan card/, /{ s: "#planEv", k: "rk01e" }/],
  ["Ranking: ④ battle table per event (Table for: Swordland / Tri-Alliance)", /④ Battle table follows the event/, /{ s: "#tbCard \.tb-ev", k: "rk17e" }/],
  ["Ranking: ④ 🔱 TAC plan draft (Teams A–D, 4 stages)", /"🔱 TAC plan draft \(all 4 stages\)" fills it/, /{ s: "#tbCard \[data-act=triDraft\]", k: "rk14t", e: 1 }/],
  ["Viking report tab (🪓 research)", /🪓 VIKING REPORT tab/, /vv: \[\{ s: "#vv_title", k: "vv01" \}\]/],
  ["Rally & Garrison report (⚔️ research)", /⚔️ RALLY & GARRISON report/, /rg: \[\{ s: "#rg_title", k: "rg01" \}\]/],
  ["Migrant Score report (🧳 research)", /🧳 MIGRANT SCORE report/, /ms: \[\{ s: "#ms_title", k: "ms01" \}\]/],
  ["Bear analysis tab (🐻 measured, ex Bear plan)", /🐻 BEAR ANALYSIS tab/, /bearplan: \[\{ s: "#bp_title", k: "bp01" \}\]/],
  ["Bear analysis: leaders per trap, where marches score most, each player", /🚩 Where marches score most/, /🐻 Bear analysis: measured from our Bear Hunts/],
  ["Bear Hunt report (🐻 research)", /🐻 BEAR HUNT report/, /bh: \[\{ s: "#bh_title", k: "bh01" \}\]/],
  ["Bear Hunt report: research ledger (✅/🟡, corrected list, alliance trend)", /ONE running research ledger/, /our research ledger for members/],
  ["Investment report (💎 research)", /💎 INVESTMENT report/, /iv: \[\{ s: "#iv_title", k: "iv01" \}\]/],
  ["🔬 Research permission (one for all reports)", /🔬 RESEARCH \(研究報告\)/, /research: \[\{ s: "#researchTab", k: "rs01" \}\]/],
  ["🔬 Research main tab (reports as sub-tabs)", /🔬 Research \(研究報告/, /🔬 Research holds our reports/],
  ["Battle: 🎯 KvK opponent intel", /🎯 KvK opponent intel \(KvK 對手情報/, /{ s: "#ak_intel", k: "ak05" }/],
  ["Ranking: 💾 Save now (plan)", /💾 Save now \(立即儲存/, /{ s: "#planSaveNow", k: "rk01s" }/],
  ["Ranking: ④ 🔗 Keep together (same building / team in drafts)", /🔗 Keep together \(排在一起/, /{ s: "#tbCard \.tb-tog", k: "rk19g" }/],
  // [name, AI (worker OFFICER_HELP or scripts/build-ai-context.js), Little Sparrow (js/sparrow.js)]
  ["Post: formatting toolbar", /Word-like toolbar/, /po02b:/],
  ["Post: looks / scroll themes", /"Look" \(樣式\)/, /po05:/],
  ["Post: auto-delete", /Auto-delete/, /Auto-delete/],
  ["Events: announcement draft", /Announcement draft/, /Announcement draft/],
  ["Events: one-event game post", /Game post/, /Game post/],
  ["Events: battle-day times (@)", /22:00@1/, /@1/],
  ["Events: exact 🔔 reminder time on an action item", /Remind at exact UTC time/, /exact 🔔 reminder time/],
  ["Board: 🌐 Translate for everyone / Translate to …", /Translate for everyone/, /bd08t:/],
  ["Ranking: Swordland rules draft", /Swordland rules draft/, /Swordland rules draft/],
  ["Ranking: version history", /Version history/, /🕘/],
  ["Ranking: 🗂️ Recover plans (admins; deleted plans too)", /Recover plans/, /{ s: "#planRec", k: "rk02r", e: 1 }/],
  ["Ranking: shared plans", /New shared plan/, /shared plan/i],
  ["Move: member positions + blueprint on one map", /\[move\] - 🚚 Move → "👥 Member positions"[^\n]*blueprint/, /{ s: "#mm_map", k: "mv01" }, { s: "#km_members > h3", k: "mp40" }/],
  ["Move: move steps checklist", /Move steps/, /{ s: "#mv_steps", k: "mv02" }/],
  ["Move: 📍 positions from the roster (Update Map → 🔄 Update roster now → ✅ Use)", /Positions from the roster/, /{ s: "#mp_card", k: "mv09" }/],
  ["Watch / Move: 🔄 Update roster now (one shared request)", /\[watch\] - 🕵️ Watch → "🔄 Update roster now"/, /{ s: "#wa_rnb", k: "wa07" }/],
  ["Move: tap a planned spot to put a member there", /putting members on the plan by tapping/, /{ s: "#mm_map .mm-ps.ed", k: "mv08", e: 1 }/],
  ["Hive: 📤 export the plan as a Kingshot Mapper CSV + tap for coordinates", /📤 Export CSV \(Kingshot Mapper\)/, /{ s: "#mv_exp", k: "mv10", e: 1 }/],
  ["Hive: 🐻 BT1 / BT2 + TC / Power in the moving table", /the moving table \(每人一列的搬家表\)/, /mv03b:/],
  ["Move: 📐 auto plan from a Mapper layout (road, stages, checks, edit, PNG)", /Auto plan from a Mapper layout/, /{ s: "#hp_root > h3", k: "hp01" }/],
  ["Move: 📐 shared auto plans (Plan list)", /Share as a plan/, /{ s: "#hp_root .hp-sh", k: "hp03" }/],
  ["Move tab", /🚚 Move/, /mv01:/],
  ["Heroes tab (hero comparison, compare two, joiners, second uses — split from Growth)", /🦸 HEROES tab \(officer-x7k2p9\.html#hr/, /hr: \[{ s: "#hr_title", k: "hr01" }/],
  ["Growth plan tab (proposal: how we grow attack / defense / Bear leaders)", /🧭 GROWTH tab \(officer-x7k2p9\.html#growth/, /growth: \[{ s: "#gr_title", k: "gr01" }/],
  ["Growth: 🌳 when to pick a direction (milestones, 4 branches, master & pet skills)", /🌳 WHEN TO PICK A DIRECTION/, /{ s: "#gr_road", k: "gr04" }/],
  ["Battle tab: ⚖️ Super compare (two players, rough % stronger)", /⚖️ SUPER COMPARE \(card at the top\)/, /{ s: "#ak_vs", k: "ak06" }/],
  ["Attack: 📊 today's strength list", /Today's strength/, /{ s: "#ak_board", k: "ak02" }/],
  ["Attack: ⚡ KvK week live boards (every 2 h)", /⚡ KvK week live boards/, /k: "ak07"/],
  ["Board", /💬 Board/, /bd01:/],
  ["Attendance", /📋 Attendance/, /at01:/],
  ["Ranking: ✅ Registration on ticked names (⏳/✅/❌ replies, 🟡 safe players)", /✅ Registration \(報名確認/, /rk05r:/],
  ["Roster: 🐻 BT groups (BT1 / BT2 marks, lists to copy)", /"🐻 BT groups" \(BT 分組/, /rk12b:/],
  ["Ranking: ② sort by ranking (③ Ranking merged into ②)", /"Sort by ranking" \(依排名排序/, /rk09: [^\n]*Sort by ranking/],
  ["Ranking: 📋 Copy list (who / columns / text, Sheets table or Discord table)", /"📋 Copy list" \(複製名單\)/, /rk12: [^\n]*Google Sheets/],
  ["Map: 🎁 What we'd get (rewards of the targets)", /"🎁 What we'd get" \(拿到的話可以得到\)/, /mp18g:/],
  ["Map: ✏️ Update rewards (rewards rotate)", /"✏️ Update rewards" \(更新獎勵/, /mp18e:/],
  ["Attendance: ① Registration (replies from the Ranking plan)", /① Registration \(lists made from a plan/, /at06r:/],
  ["Ranking: shared plans saved on the Worker + save box (✅ / ⏳ / ⚠️)", /saved on the Worker \(Discord login/, /rk03s:/],
  ["Ranking: 📱 battle table last edited on this device", /📱 Battle table last edited on this device/, /rk03: [^\n]*📱/],
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
  ["Blacklist: 🛡️ manual shield + stale warning", /fix the shield by hand/, /k: "hn06"/],
  ["Blacklist: MightPulse Update Map button", /presses "Update Map" on the MightPulse map/, /“Update Map” on the MightPulse map/],
  ["Blacklist: ⭐ special mark (row lights up, on top)", /special mark/, /⭐ marks a player for everyone/],
  ["Transfer: 🧳 Kingdom Transfer list + MightPulse look-up", /🧳 TRANSFER \(officer-x7k2p9\.html#tr/, /tr01:/],
  ["Transfer: name search, pick one of several matches", /several → "N possible — pick one"/, /several show “pick one”/],
  ["Transfer: MightPulse shown first, pasted original kept + CSV difference columns", /MIGHTPULSE FIRST, ORIGINAL KEPT/, /what you pasted is kept/],
  ["Transfer: ⬇️ Excel — one table per list, pick extra column + rank by", /⬇️ EXCEL \(Milk & Sherry 2026-11-08\)/, /Excel is a real spreadsheet/],
  ["Transfer: 🔴 red hero gear count", /🔴 RED GEAR \(Milk 2026-11-08/, /🔴 red gear \/ Mystic Trial/],
  ["Transfer: ☑️ tick rows → same note / status for all", /☑️ BATCH EDIT \(Sherry 2026-11-08\)/, /tr09:/],
  ["Transfer: ↻ update one player / all shown", /↻ UPDATE \(Sherry 2026-11-08\)/, /tr08:/],
  ["Transfer: 🔬 Transfer Pass estimate (unconfirmed research)", /Transfer Pass estimate \(移民授權書\) is RESEARCH, NOT CONFIRMED/, /tr06:/],
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
