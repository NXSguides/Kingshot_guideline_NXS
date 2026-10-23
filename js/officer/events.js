/* NXS officer page — events tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.events) */
(function () {
const ROOT = document.getElementById('pg-events');
/* Starting content for the Events tab. Used only until the first save; after that data/events-x7k2p9.json is the source. */
const INGAME_DEFAULTS = {
  "call-of-sovereign": [
    { title: "Save your Gold & Platinum Keys", text: `🔑 SAVE YOUR GOLD & PLATINUM KEYS!

Have a stockpile of keys for events:

🏆 Call of the Sovereign: Requires 90 Gold Keys (30/day) and 30 Platinum Keys (10/day) over 3 days to maximize rewards.

⭐ Epic Recruitment: If Jabel and your core heroes are developed, start saving Gold Keys. Older-generation Mythic heroes become available to recruit + new generations arrive.

Don't spend keys just because you have them, use them strategically during seasonal events.` },
  ],
  "bear-hunt": [
    { title: "Bear Trap rules — Gen 3", text: `🐻 BEAR TRAP RULES — Gen 3

✨ LEADS:
• Amadeus + Petra + Marlin
• Zoe + Petra + Quinn
• Helga + Petra + Marlin (only if Helga + widget maxed)

✨ JOINERS — 1ST HERO:
•Chenko •Amane •Yeonwoo
•Amadeus •No Hero (do not send Petra)
•Ideal ratio: 10:10:80
📌 Save formations + follow joiner troop limits🚫 No other rallies during Bear` },
    { title: "Troop limits & staggering", text: `❗ Reminder - Bear Trap Troop Limits & Staggering Marches

🔹 All joiners must send exactly 90,000 troops to rallies. Pre-save your marches
🔹 Leaders initiate your rally with maximum troops but when you join other rallies you must also follow the troop limit.

🔹 At the start: Main Rally Leaders send their first rally at their assigned staggered time.
🔹 At 6:30 remaining: All joiners start their own rally using their 3 strongest heroes.

🔪 Incorrect heroes & wrong troop numbers - kick and ask to rejoin` },
    { title: "Launch groups (fill in names)", text: `BT1 - Main Rally Launch Groups

🔹 Team A - Launch at 0:00
…

🔹 Team B - Launch at +0:45
…

Please launch at your assigned time to keep rallies properly staggered. Remember to check your joiners for correct heroes` },
  ],
  "viking-vengeance": [
    { title: "Viking Vengeance (full)", text: `VIKING VENGEANCE

📅 Tue 22:00 UTC
📅 Thu 13:00 UTC

🔹 Empty your city before event starts, even if offline. Post in Alliance Chat when empty.
🔹 Reinforce using Chenko, Amadeus, Yeonwoo or Amane first. Prioritize Infantry & Cavalry.
🔹 Keep your 3 strongest heroes home in Guard Station.
🔹 DO NOT heal during event.
🔹 HQ: choose Wave 10 OR 20 - you can only join one. Send ~68K troops (check label) Howard/Gordon 60:40. Pre-save this march
🔹 Spread troops across multiple members. Prioritize online players` },
    { title: "Viking rules (short)", text: `VIKING RULES

3 best heroes stay home

Reinforce: bear heroes only (Amadeus, Chenko, Yeonwoo, Amane) – max 64,360

Send inf/cav only – archers stay home

Waves 10 & 20 (HQ): max 64.360 – NO archers – pick ONE wave – use Howard/Gordon/Fahd/Quinn

Offline? Reinforce someone first!` },
    { title: "Viking rules (short) – 2", text: `🔹Reinforcements: 4 marches (Amadeus, Chenko, Yeonwoo, Amane). Max 64,360 per march – but don't max out one ally. Split your troops across three different allies to protect more people. Even 50-64,360 each helps.` },
    { title: "Viking rules (short) – 3", text: `🔹HQ Waves 10 & 20: 64,360 per player – fills 15-player garrison exactly. No archers. Pick ONE wave. Use Howard/Gordon/Fahd/Quinn.` },
    { title: "Viking rules (short) – 4", text: `🔹Send inf/cav only. Don't heal until end.

Spread the love, protect the team. Ask if unsure. Good luck!` },
  ],
  "sanctuary-battle": [
    { title: "Rally call (contest day)", text: `Fortress + 2 Sanctuaries in 1.5 Hours
 
Don't miss it, rewards are good.
• No solo attacks
• Rally from home, save your teleporters
• Join with exactly 70,080 troops: 35,040 Inf / 14,016 Cav / 21,024 Arc` },
    { title: "Defence swap (after capture)", text: `@所有人 garrison time – let's do a defence swap, Howard/Gordon 60:20:20 - 42,048/14,016/14,016` },
    { title: "Defence swap – timing", text: `@所有人 you can send your defence right after rally departs, wait for 20 seconds and don't speed up.` },
  ],
  "cesares-fury": [
    { title: "Alliance level fight", text: `🔥CESARES FURY ALLIANCE LEVEL FIGHT

🚶 ONE soldier
☝️ ONE march per level
🚫 Any / No heroes

✅ One hit is enough to qualify for the reward. 0.0% damage still counts. More damage does NOT give a better reward.

❓ Why: This gives everyone in the alliance a chance to participate, gain rewards and tag the Captain before it dies.

❌Anyone breaking the rule will be timed out and sent to farm alliance.` },
  ],
  "eternity-reach": [
    { title: "Eternity's Reach", text: `ETERNITY'S REACH

🔹 Important for Governor Charm rewards
🔹 Skill selection: 1. Right 2. Right 3. Left 4. Left 5. Right
🔹 Start: Send all marches to attack Cesares until Skill 3 unlocks
🔹 Then every 60 sec: Enter regular Copper Vein → Recall + note time → repeat at 60 sec intervals
🔹 Keep Loot Wagon active
🔹 Fractured Veins: Stop everything; send all marches to gather
🔹 Click Skill 5 boost before regular Copper Veins only
🔹 Free teleport to uncrowded veins
🔹 Peak of Eternity: Ignore if crowded` },
  ],
  "all-out": [
    { title: "All-Out rules", text: `All-Out Rules

❌ No attacks on NAP 6 (NXS, NBD, RED, ESA, IDN, KGb) including their farms/acad
❌ No attacks on castles or alliance buildings (HQs, outposts, banners)
✅ You can attack resource gathering tiles (mills, quarry, mines)
✅ You can attack players outside of NAP.

- If your castle gets attacked by a NAP member, do not retaliate inform R4/5
- Avoid gathering resources in the wild, use the secured alliance resource node instead
- Rule breakers will be dealt with according to alliance/NAP agreements` },
    { title: "NAP list", text: `All Out event is here! Check amessages for rules. Ask if unsure. Use alliance’s secure gathering site.

NAP 6
DO NOT attack the cities of these alliances or their farms/academies:

NXS/nxs/nXs
NBD/nBd/Nbd
RED/ReD
ESA/EsA/UNI
IDN
KGb

*All Out exception: Gathering resource nodes may be attacked.` },
  ],
  "swordland-showdown": [
    { title: "Swordland map", text: `Swordland Showdown Map!

          ②     ④
③          ⑤         ④
               7
④          ⑥         ③
         ④      ①

① Royal Stables (-50% cooldown) 🐴                        ② Bell Tower (-50% control time)🔔               ③ Sanctum more points) 🏤
④ Abbey (points) ⛪
⑤ Mercenaries (attack Building)💥         ⑥ ReformationHall 🔪 (+15%Damage+Reduction)                        ⑦ Swordshrine (most points) 🌟` },
  ],
  "hero-roulette": [
    { title: "Hero Roulette – Quick Guide", text: `🎡 Hero Roulette – Quick Guide
Every 2 weeks, 3 days. 1 free spin/day.
1 spin = 1 Lucky Chip or 1,500 Gems (10 spins = 13,500).
Milestones at 5/15/35/70/120 spins give +5/+10/+20/+30/+50 shards (115 total).
Each spin ≈ 0.55 Mythic Hero Shards.
👉 Spin exactly 120 per event = ~181 shards. After 120 there are no more milestones, so stop!
Max hero (unlock + 5) = 1,075 shards ≈ 6 events × 120 spins (~954K Gems).
KvK Prep Days 2 & 3 give 8,000 pts per spin – save your Lucky Chips & Gems for then!` },
  ],
  "kvk": [
    { title: "KvK Prep Guide (table)", text: `👑KVK Prep Guide👑
 １   ２　３    ４    ５ 
✅｜🆗｜🚫｜🚫｜✅｜ 🆗｜✅｜🚫｜🚫｜✅｜Gold Dust 🚫｜✅｜✅｜🚫｜🚫｜Hero shard ✅｜🆗｜🚫｜🚫｜✅｜ building 🚫｜🚫｜🚫｜✅｜✅｜ troop 🆗｜✅｜🚫｜🚫｜✅｜ research 🚫｜✅｜✅｜🚫｜🚫｜Wheel 👍｜✅｜👍｜✅｜👍｜Gathering ✅｜👍｜✅｜👍｜✅｜Intel 🚫｜🚫｜✅｜🚫｜✅｜Pets advance ✅｜🚫｜🆗｜✅｜🚫｜Chief Charm 🚫｜🚫｜🚫｜🚫｜✅｜Chief Gear 🚫｜🚫｜🚫｜🆗｜✅｜Widget gear 🚫｜🚫｜🚫｜🆗｜✅｜Mithril 🚫｜🚫｜🚫｜🆗｜✅｜ 🚫｜✅｜🆗｜🚫｜🚫｜Master items 🚫｜🚫｜✅｜🚫｜🚫｜Manuscript 🆗｜✅｜🚫｜🚫｜🆗｜Master speeds

✅ use 
🆗 okay if needed
🚫 don’t use
👍 need to do daily` },
    { title: "Castle / Sanctuary / Buildings", text: `🏰 CASTLE / SANCTUARY / BUILDINGS

🔹CAPTURE: Join the rally with your ATTACK preset: Amadeus/Chenko 50:20:30.

🔹ONCE CAPTURED: Immediately send your DEFENSE preset: Gordon/Howard 60:20:20. (Troop limit as specified eg. 68k)

❗ Watch your defense march. At ~5 sec before arrival, recall your ATTACK march. Your defense march will arrive and replace it.

❗ Don't recall too early! Keep the garrison strong during the swap.

Summary: Capture → Send Defense → Recall Attack → Defend` },
  ],
  "alliance-championship": [
    { title: "Alliance Championship", text: `🏆 ALLIANCE CHAMPIONSHIP

Please register in the Middle Lane, leadership will sort you later.

Before registering:
🔹 Use your strongest heroes
🔹 Formation: 50% Infantry, 20% Cavalry, 30% Archers
🔹 Activate Marshal / Field Commander & Pet Buffs before registering.

🔄 You can refresh your registration anytime to update heroes, formation, and buffs. Especially if you have upgraded your heroes or troops.` },
    { title: "Starts tomorrow", text: `🏆 ALLIANCE CHAMPIONSHIP — STARTS TOMORROW

Registration opens tomorrow. Please register in the Middle Lane — leadership will sort you later. Do not move yourself; R5 handles all lane deployment.

Before registering:
🔹 Use your strongest heroes
🔹 Formation: 50% Infantry, 20% Cavalry, 30% Archers
🔹 Activate King Appointments & Pet Buffs

🔄 You can refresh your registration anytime to update heroes, formation, and buffs — especially if you've upgraded your heroes or troops.` },
    { title: "Buffs / update after Bear", text: `If you haven't used your buffs yet:

You can still activate them before the bear trap – especially if you're using attack and lethality buffs for the bear.

After the bear trap:

Please update your troops in the Alliance Championship – especially those who upgraded their TG tier today. Refresh your registration to reflect any changes in heroes, formation, or buffs.` },
  ],
  "alliance-mobilization": [
    { title: "Alliance Mobilization", text: `🔥 ALLIANCE MOBILIZATION IS HERE! 🔥

🏆 Push for TOP 3 to secure our statue and position!

🚨 DO NOT select missions using KvK Prep items: Speedups, Hero/General Shards, Governor/Hero Gear mats, True Gold or Pet items.

✅ Best picks: 120K Training, Terror Rallies (joining counts, save stamina), 30M Gathering, Beast missions (gold tier) pair with Intel.

⚠️ Training/Gathering: have them nearly finished before selecting. Use pet buffs & King perks.

Choose wisely and maximize every attempt!` },
  ],
  "mystic-trial": [
    { title: "Mystic Trial troop ratio", text: `🏯MYSTIC TRIAL (Command Center) troop ratio

Set the following percentage of Infantry/ Cavalry/ Archers to achieve the best results:

🎪Coliseum - 50/20/30
or 60/15/25
💎Crystal Cave - 50/15/35
🌳Forest of Life - 50/20/30
📖Knowledge Nexus - 50/10/40
🏰Molten Fort - 60/15/25
🗼Radiant Spire - 60/20/20` },
  ],
  "alliance-rules": [
    { title: "Core rules", text: `✨CORE RULES✨

1. Stay active & communicate if you will be away.
2. Donate regularly to alliance tech; recommended tech marked by green 👍
3. Do not violate the Non-Aggression Pact with the Top 6 alliances. If attacked by a NAP member, report to R4/R5. Do not counterattack.
4. Follow all event rules, check alliance chat, PMs, and discord for more information.
5. NO SOLO attacking Sanctuary or Fortress. You may only join rallies.
6. Keep World Chat respectful, avoid drama that could harm the alliance` },
  ],
};
// events with no schedule on the site yet
const EXTRA_EVENTS = [
  { id: "bear-hunt", emoji: "🐻", en: "Bear Hunt", zh: "狩獵巨熊", start: "2026-10-07", every: 2, days: 1, guide: "bear-hunt",
    note: "13:00 & 22:00 UTC, 30 min each", noteZh: "UTC 13:00 和 22:00，各 30 分鐘",
    todo: [] },
  { id: "alliance-championship", emoji: "🏆", en: "Alliance Championship", zh: "聯盟爭霸賽", start: "2026-09-28", every: 7, days: 2, guide: "",
    note: "Weekly, Monday reset · shown = 2-day registration; battles run automatically", noteZh: "每週一次，週一重置 · 顯示的是 2 天報名期；戰鬥自動進行",
    todo: [{ due: -1, post: 1, en: "Remind everyone: register in the Middle Lane, strongest heroes, 50/20/30, buffs on.", zh: "提醒大家報名中路、用最強英雄、50/20/30、開好增益。" }] },
  { id: "alliance-mobilization", emoji: "🔥", en: "Alliance Mobilization", zh: "聯盟總動員", start: "2026-09-28", every: 28, days: 7, guide: "",
    note: "Follows the 4-week cycle (after KvK / after Strongest Governor; Alliance Brawl can replace one) — check the start date", noteZh: "跟著 4 週循環（KvK 後／最強領主後；聯盟爭鬥可能取代其中一場）— 請確認開始日",
    todo: [{ due: 0, post: 1, en: "Post the mission rules (no KvK Prep items; best picks).", zh: "公告任務規則（不要選用到 KvK 準備道具的任務、推薦的任務）。" }] },
  { id: "mystic-trial", emoji: "🔮", en: "Mystic Trial", zh: "秘境試煉", start: "", every: 0, days: 0, guide: "mystic-trial" },
  { id: "alliance-rules", emoji: "📜", en: "Alliance rules", zh: "聯盟規則", start: "", every: 0, days: 0, guide: "" },
];

/* Event list for the week. Saved in data/events-x7k2p9.json (editable on this page); before the first save it starts from EVENT_SCHEDULES in js/app.js.
   Weeks run Monday–Sunday in UTC (game reset = 00:00 UTC). On Sunday the page opens on next week. */
const T = { ko: {"anOne": "📣 게임 공지", "etPerDay": "전투일: 시간마다 따로 설정 (@ 뒤 = 이벤트 며칠째)", "title": "NXS 이벤트", "sub": "이번 주 이벤트와 간부가 일정을 잡아야 할 일.", "home": "홈", "thisWeek": "이번 주", "nextWeek": "다음 주", "todoTitle": "✅ 할 일", "weekTitle": "📅 이벤트", "late": "기한 지남", "calNote": "옆으로 스크롤하세요. 채워진 칸 = 진행 중 · ✅ = 할 일 있음 (탭 → 해당 할 일) · 나머지는 아래 해당 항목이 열립니다.", "today": "오늘", "todoNote": "체크 표시는 이 기기에만 저장됩니다.", "note": "날짜는 사이트의 이벤트 일정 기준입니다. 게임 날짜는 00:00 UTC에 시작합니다. 게임 내 캘린더와 다르면 게임이 맞습니다.", "noTodo": "이번 주에는 일정 잡을 일이 없습니다 🎉", "none": "—", "day": "{n}/{t}일차", "starts": "시작", "ends": "마지막 날", "noData": "사이트에서 이벤트 일정을 읽을 수 없습니다.", "toPost": "📢 공지 작성", "toRanking": "📊 랭킹 열기", "toGuide": "📖 가이드", "week": "{a} – {b}", "wd": ["월", "화", "수", "목", "금", "토", "일"], "runs": "{a} – {b} ({n}일)", "mgrTitle": "📋 이벤트 & 게임 내 가이드", "addEv": "+ 새 이벤트", "mgrNote": "이벤트를 탭하면 게임 내 가이드를 볼 수 있습니다. 상자 하나가 채팅 메시지 하나입니다(게임에서 메시지 길이를 제한함) — 하나씩 복사해서 보내세요. 메시지 옆 ✏️는 그 메시지만 수정하고, 아래쪽 ✏️ 수정은 이벤트 전체(날짜, 할 일, 메시지 추가·삭제)를 변경합니다. 변경 사항은 모든 간부를 위해 사이트에 저장됩니다.", "sched": "{s}부터 {e}일마다 · {d}일간", "noSched": "고정 일정 없음", "every1": "매일", "edit": "✏️ 수정", "copy": "📋 복사", "copied": "복사됨 ✅", "noIg": "아직 게임 내 가이드가 없습니다.", "chars": "자", "newEv": "새 이벤트", "editEv": "이벤트 수정", "fEmoji": "이모지", "fName": "이름", "fFixed": "고정 일정으로 반복", "fStart": "첫날 (UTC)", "fEvery": "반복 주기 (…일마다)", "fDays": "기간 (…일)", "fNote": "메모", "fNoteSm": "(예: 시간 — 목록에 표시됨)", "fGuide": "사이트 가이드", "noGuide": "— 없음 —", "fTodo": "간부 할 일", "addTodo": "+ 할 일", "editTodo": "항목 수정", "etDay": "{t}일 중 {n}일차", "etBearNext": "다음 자이언트 베어 사냥일 (UTC)", "etDayLbl": "전투일", "etBearMoved": "🐻 자이언트 베어 사냥은 이제 {d}부터 {e}일마다 진행됩니다.", "etTitle": "⏰ 우리 이벤트 시간 (UTC)", "etNote": "연맹 이벤트에 정한 시간과 이벤트 중 전투가 있는 날입니다. 홈 화면(오늘 & 이번 주)과 모두의 ⏰ 게임 알림에 사용됩니다. 시간을 하나 이상 입력하세요. 예: 13:00, 22:00. 게임에서 자이언트 베어 사냥 날짜가 바뀌면 \"다음 자이언트 베어 사냥일\"을 변경하세요 — 사이트 전체가 따라갑니다.", "etBad": "시간을 확인하세요 — HH:MM 형식으로 입력하세요. 예: 13:00, 22:30.", "etSaved": "저장됨 ✅ 몇 분 안에 사이트와 ⏰ 알림에 새 시간이 적용됩니다(알림은 사용자가 사이트를 열 때 갱신됩니다).", "limTitle": "⚙️ 가이드의 부대 제한", "limNote": "가이드에서 이 숫자가 나오는 모든 곳(12개 언어 전체)과 AI 도우미에 사용됩니다. 게임이나 연맹에서 제한이 바뀌면 여기서 변경하세요.", "limBear": "자이언트 베어 사냥 — 집결 참여 (정확히)", "limRally": "기타 집결 / 바이킹의 약탈 본부 — 1인당 최대", "limSave": "💾 저장", "limSaving": "저장 중…", "limSaved": "저장됨 ✅ 몇 분 안에 사이트에 새 숫자가 표시됩니다.", "limBad": "두 숫자를 모두 입력하세요.", "limNoKey": "저장하려면 간부 GitHub 키가 필요합니다(공지 탭에서 설정).", "limErr": "저장하지 못했습니다 — 다시 시도하세요.", "msTitle": "왕국 #2189 주요 일정", "msNext": "다음", "msIn": "{n}일 후", "dueLbl": "시작 전(−) / 후 일수", "untilLbl": "그날만, UTC 몇 시까지 (선택)", "untilShow": "{h} UTC까지", "tdTxt": "할 일", "tdPost": "공지 버튼", "tdRank": "랭킹 버튼", "fIngame": "게임 내 가이드", "fIngameSm": "(상자 하나 = 채팅 메시지 하나. 게임에서 메시지 길이를 제한하므로 긴 가이드는 여러 상자로 나누세요)", "addIg": "+ 메시지", "igTitle": "제목", "igText": "내용", "del": "이벤트 삭제", "cancel": "취소", "save": "💾 저장", "needName": "이름을 입력하세요.", "needSched": "첫날(YYYY-MM-DD), 반복 주기, 기간을 입력하세요.", "confirmDel": "모든 사람에게서 이 이벤트를 삭제할까요?", "saving": "저장 중…", "saved": "저장됨 ✅ 다른 간부는 새로고침 후(약 1분) 볼 수 있습니다.", "errAuth": "저장된 GitHub 키가 더 이상 작동하지 않습니다. Sherry에게 공지 탭에서 설정을 다시 해 달라고 요청하세요.", "errBusy": "그동안 다른 사람이 이벤트를 변경했습니다. 페이지를 새로고침하고 다시 시도하세요.", "errNet": "GitHub에 연결할 수 없습니다. 다시 시도하세요.", "noKey": "저장하려면 GitHub 키가 필요합니다(공지 탭에서 설정).", "remove": "✕", "etDayAll": "매일 전투"},
 ar: {"anOne": "📣 إعلان اللعبة", "etPerDay": "يوم المعركة: لكل وقت على حدة (@ = يوم الفعالية)", "title": "فعاليات NXS", "sub": "فعاليات هذا الأسبوع، وما يجب على المسؤولين جدولته.", "home": "الرئيسية", "thisWeek": "هذا الأسبوع", "nextWeek": "الأسبوع القادم", "todoTitle": "✅ المهام المطلوبة", "weekTitle": "📅 الفعاليات", "late": "متأخر", "calNote": "مرّر أفقيًا. المظلل = جارٍ الآن · ✅ = يوجد ما يجب فعله (اضغط ← مهامه) · غير ذلك يفتح شرحه بالأسفل.", "today": "اليوم", "todoNote": "علامات الإنجاز تُحفظ على هذا الجهاز فقط.", "note": "التواريخ مأخوذة من جدول الفعاليات في الموقع. يبدأ يوم اللعبة عند 00:00 UTC. إذا اختلف تقويم اللعبة، فاللعبة هي الصحيحة.", "noTodo": "لا شيء للجدولة هذا الأسبوع 🎉", "none": "—", "day": "اليوم {n}/{t}", "starts": "يبدأ", "ends": "اليوم الأخير", "noData": "تعذّرت قراءة جدول الفعاليات من الموقع.", "toPost": "📢 كتابة إعلان", "toRanking": "📊 فتح التصنيف", "toGuide": "📖 الدليل", "week": "{a} – {b}", "wd": ["اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"], "runs": "{a} – {b} ({n} أيام)", "mgrTitle": "📋 الفعاليات وأدلة اللعبة", "addEv": "+ فعالية جديدة", "mgrNote": "اضغط على فعالية لرؤية دليلها داخل اللعبة. كل مربع = رسالة دردشة واحدة (اللعبة تحدّ طول الرسالة) — انسخها وأرسلها واحدة تلو الأخرى. ✏️ بجانب الرسالة يعدّل تلك الرسالة فقط؛ و✏️ تعديل في الأسفل يغيّر الفعالية كلها (التواريخ، المهام، إضافة أو حذف رسائل). تُحفظ التغييرات في الموقع لجميع المسؤولين.", "sched": "كل {e} أيام بدءًا من {s} · {d} يوم/أيام", "noSched": "بلا جدول ثابت", "every1": "كل يوم", "edit": "✏️ تعديل", "copy": "📋 نسخ", "copied": "تم النسخ ✅", "noIg": "لا يوجد دليل داخل اللعبة بعد.", "chars": "حرف", "newEv": "فعالية جديدة", "editEv": "تعديل الفعالية", "fEmoji": "إيموجي", "fName": "الاسم", "fFixed": "تتكرر بجدول ثابت", "fStart": "اليوم الأول (UTC)", "fEvery": "تتكرر كل … أيام", "fDays": "تستمر … أيام", "fNote": "ملاحظة", "fNoteSm": "(مثل الأوقات — تظهر في القائمة)", "fGuide": "الدليل في الموقع", "noGuide": "— لا يوجد —", "fTodo": "مهام المسؤولين", "addTodo": "+ مهمة", "editTodo": "تعديل المهام", "etDay": "اليوم {n} من {t}", "etBearNext": "يوم الدب التالي (UTC)", "etDayLbl": "يوم المعركة", "etBearMoved": "🐻 صيد الدببة الآن كل {e} أيام بدءًا من {d}.", "etTitle": "⏰ أوقات فعالياتنا (UTC)", "etNote": "الأوقات التي نختارها لفعاليات التحالف، وفي أي يوم من الفعالية تكون المعركة. تُستخدم في الصفحة الرئيسية (اليوم وهذا الأسبوع) وفي تذكيرات ⏰ اللعبة للجميع. اكتب وقتًا أو أكثر، مثل 13:00, 22:00. إذا نقلت اللعبة صيد الدببة إلى يوم آخر، غيّر \"يوم الدب التالي\" — وسيتبعه الموقع كله.", "etBad": "تحقق من الأوقات — استخدم HH:MM، مثل 13:00, 22:30.", "etSaved": "تم الحفظ ✅ سيستخدم الموقع وتذكيرات ⏰ الأوقات الجديدة خلال دقائق (تتحدث التذكيرات عندما يفتح الأعضاء الموقع).", "limTitle": "⚙️ حدود القوات في الأدلة", "limNote": "تُستخدم في كل مكان تذكر فيه الأدلة هذه الأرقام (كل اللغات الـ 12) ومن قِبل المساعد الذكي. غيّرها هنا عندما تغيّر اللعبة أو التحالف الحد.", "limBear": "صيد الدببة — الانضمام إلى حشد (بالضبط)", "limRally": "الحشود الأخرى / مقر الفايكنغ — الحد الأقصى لكل عضو", "limSave": "💾 حفظ", "limSaving": "جارٍ الحفظ…", "limSaved": "تم الحفظ ✅ سيعرض الموقع الأرقام الجديدة خلال دقائق.", "limBad": "أدخل الرقمين.", "limNoKey": "الحفظ يتطلب مفتاح GitHub للمسؤولين (يُضبط في تبويب النشر).", "limErr": "تعذّر الحفظ — حاول مرة أخرى.", "msTitle": "إنجازات المملكة #2189", "msNext": "التالي", "msIn": "بعد {n} أيام", "dueLbl": "أيام قبل (−) / بعد البداية", "untilLbl": "ذلك اليوم فقط، حتى ساعة UTC (اختياري)", "untilShow": "حتى {h} UTC", "tdTxt": "ما يجب فعله", "tdPost": "زر الإعلان", "tdRank": "زر التصنيف", "fIngame": "أدلة داخل اللعبة", "fIngameSm": "(مربع واحد = رسالة دردشة واحدة؛ اللعبة تحدّ طول الرسالة، لذا قسّم الأدلة الطويلة على عدة مربعات)", "addIg": "+ رسالة", "igTitle": "العنوان", "igText": "النص", "del": "حذف الفعالية", "cancel": "إلغاء", "save": "💾 حفظ", "needName": "يرجى إدخال اسم.", "needSched": "يرجى ملء اليوم الأول (YYYY-MM-DD) والتكرار والمدة.", "confirmDel": "حذف هذه الفعالية للجميع؟", "saving": "جارٍ الحفظ…", "saved": "تم الحفظ ✅ يراها المسؤولون الآخرون بعد التحديث (حوالي دقيقة).", "errAuth": "مفتاح GitHub المحفوظ لم يعد يعمل. اطلب من Sherry إعادة الإعداد في تبويب النشر.", "errBusy": "قام شخص آخر بتغيير الفعاليات في هذه الأثناء. حدّث الصفحة وحاول مرة أخرى.", "errNet": "تعذّر الوصول إلى GitHub. حاول مرة أخرى.", "noKey": "الحفظ يتطلب مفتاح GitHub (يُضبط في تبويب النشر).", "remove": "✕", "etDayAll": "كل يوم معركة"},
 pt: {"anOne": "📣 Aviso no jogo", "etPerDay": "Dia da batalha: por horário (@ = dia do evento)", "title": "Eventos NXS", "sub": "Os eventos desta semana e o que os oficiais precisam organizar.", "home": "Início", "thisWeek": "Esta semana", "nextWeek": "Próxima semana", "todoTitle": "✅ Tarefas", "weekTitle": "📅 Eventos", "late": "atrasada", "calNote": "Role para o lado. Preenchido = acontecendo agora · ✅ = tem algo a fazer (toque → as tarefas) · os outros abrem o item na lista abaixo.", "today": "hoje", "todoNote": "As marcações ficam salvas só neste aparelho.", "note": "As datas vêm da agenda de eventos do site. O dia do jogo começa às 00:00 UTC. Se o calendário do jogo for diferente, vale o do jogo.", "noTodo": "Nada para organizar esta semana 🎉", "none": "—", "day": "Dia {n}/{t}", "starts": "começa", "ends": "último dia", "noData": "Não foi possível ler a agenda de eventos do site.", "toPost": "📢 Escrever anúncio", "toRanking": "📊 Abrir Ranking", "toGuide": "📖 Guia", "week": "{a} – {b}", "wd": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"], "runs": "{a} – {b} ({n} dias)", "mgrTitle": "📋 Eventos e guias para o jogo", "addEv": "+ Novo evento", "mgrNote": "Toque num evento para ver o guia dele para o jogo. Cada caixa é uma mensagem do chat (o jogo limita o tamanho das mensagens) — copie e envie uma por uma. O ✏️ ao lado de uma mensagem edita só aquela mensagem; ✏️ Editar no final muda o evento inteiro (datas, tarefas, adicionar ou remover mensagens). As mudanças ficam salvas no site para todos os oficiais.", "sched": "a cada {e} dias desde {s} · {d} dia(s)", "noSched": "sem agenda fixa", "every1": "todos os dias", "edit": "✏️ Editar", "copy": "📋 Copiar", "copied": "Copiado ✅", "noIg": "Ainda não há guia para o jogo.", "chars": "caracteres", "newEv": "Novo evento", "editEv": "Editar evento", "fEmoji": "Emoji", "fName": "Nome", "fFixed": "Repete numa agenda fixa", "fStart": "Primeiro dia (UTC)", "fEvery": "Repete a cada … dias", "fDays": "Dura … dias", "fNote": "Observação", "fNoteSm": "(ex.: horários — aparece na lista)", "fGuide": "Guia no site", "noGuide": "— nenhum —", "fTodo": "Tarefas dos oficiais", "addTodo": "+ Tarefa", "editTodo": "Editar tarefas", "etDay": "Dia {n} de {t}", "etBearNext": "Próximo dia de Caça ao Urso (UTC)", "etDayLbl": "Dia da batalha", "etBearMoved": "🐻 A Caça ao Urso agora acontece a cada {e} dias a partir de {d}.", "etTitle": "⏰ Nossos horários de eventos (UTC)", "etNote": "Os horários que escolhemos para os eventos da aliança e em que dia do evento é a batalha. Usados na página inicial (Hoje e esta semana) e nos ⏰ lembretes de jogo de todos. Digite um ou mais horários, ex.: 13:00, 22:00. Se o jogo mudar a Caça ao Urso para outro dia, mude o \"Próximo dia de Caça ao Urso\" — o site inteiro acompanha.", "etBad": "Confira os horários — use HH:MM, ex.: 13:00, 22:30.", "etSaved": "Salvo ✅ O site e os ⏰ lembretes usam os novos horários em poucos minutos (os lembretes se atualizam quando a pessoa abre o site).", "limTitle": "⚙️ Limites de tropas nos guias", "limNote": "Usado em todos os lugares dos guias que mostram esses números (nos 12 idiomas) e pelo assistente de IA. Mude aqui quando o jogo ou a aliança mudar o limite.", "limBear": "Caça ao Urso — entrar num rally (exatamente)", "limRally": "Outros rallies / QG Viking — máximo por membro", "limSave": "💾 Salvar", "limSaving": "Salvando…", "limSaved": "Salvo ✅ O site mostra os novos números em poucos minutos.", "limBad": "Preencha os dois números.", "limNoKey": "Para salvar é preciso a chave do GitHub dos oficiais (configurada na aba Post).", "limErr": "Não foi possível salvar — tente de novo.", "msTitle": "Marcos do Reino #2189", "msNext": "próximo", "msIn": "em {n} dias", "dueLbl": "Dias antes (−) / depois do início", "untilLbl": "Só nesse dia, até a hora UTC (opcional)", "untilShow": "até {h} UTC", "tdTxt": "O que fazer", "tdPost": "Botão de anúncio", "tdRank": "Botão de Ranking", "fIngame": "Guias para o jogo", "fIngameSm": "(uma caixa = uma mensagem do chat; o jogo limita o tamanho das mensagens, então divida guias longos em várias caixas)", "addIg": "+ Mensagem", "igTitle": "Título", "igText": "Texto", "del": "Excluir evento", "cancel": "Cancelar", "save": "💾 Salvar", "needName": "Digite um nome.", "needSched": "Preencha o primeiro dia (AAAA-MM-DD), a repetição e a duração.", "confirmDel": "Excluir este evento para todos?", "saving": "Salvando…", "saved": "Salvo ✅ Os outros oficiais veem depois de atualizar a página (cerca de 1 minuto).", "errAuth": "A chave do GitHub salva não funciona mais. Peça à Sherry para refazer a configuração na aba Post.", "errBusy": "Outra pessoa mudou os eventos ao mesmo tempo. Atualize a página e tente de novo.", "errNet": "Não foi possível conectar ao GitHub. Tente de novo.", "noKey": "Para salvar é preciso a chave do GitHub (configurada na aba Post).", "remove": "✕", "etDayAll": "Batalha todos os dias"},

  en: {
    title: "NXS Events", sub: "Events this week, and what officers need to schedule.", home: "Home",
    thisWeek: "This week", nextWeek: "Next week", todoTitle: "✅ Action items", weekTitle: "📅 Events", late: "overdue", calNote: "Scroll sideways. Filled = running now · ✅ = has something to do (tap → its action items) · others open their entry below.", today: "today",
    todoNote: "Ticks are saved on this device only.",
    note: "Dates come from the event schedule on the site. Game days start at 00:00 UTC. If the in-game calendar differs, the game is right.",
    noTodo: "Nothing to schedule this week 🎉", none: "—", day: "Day {n}/{t}", starts: "starts", ends: "last day",
    noData: "Could not read the event schedule from the site.",
    toPost: "📢 Write announcement", toRanking: "📊 Open Ranking", toGuide: "📖 Guide",
    week: "{a} – {b}", wd: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    runs: "{a} – {b} ({n} days)",
    mgrTitle: "📋 Events & in-game guides", addEv: "+ New event",
    mgrNote: "Tap an event to see its in-game guide. Each box is one chat message (the game limits message length) — copy and send them one by one. ✏️ next to a message edits just that message; ✏️ Edit at the bottom changes the whole event (dates, action items, add or remove messages). Changes are saved on the site for all officers.",
    sched: "every {e} days from {s} · {d} day(s)", noSched: "no fixed schedule", every1: "every day",
    edit: "✏️ Edit", copy: "📋 Copy", copied: "Copied ✅", noIg: "No in-game guide yet.", chars: "characters",
    newEv: "New event", editEv: "Edit event",
    fEmoji: "Emoji", fName: "Name", fFixed: "Repeats on a fixed schedule",
    fStart: "First day (UTC)", fEvery: "Repeats every … days", fDays: "Lasts … days",
    fNote: "Note", fNoteSm: "(e.g. times — shown in the list)", fGuide: "Guide on the site", noGuide: "— none —",
    fTodo: "Action items for officers", addTodo: "+ Action item", editTodo: "Edit items",
    etDay: "Day {n} of {t}",
    anOne: "📣 Game post", anGuides: "📋 In-game guides of the ticked events — open one and add the parts you want to the draft:", anAdd: "＋ Add the ticked messages to the draft", anMsg: "Message {n}", anTitle: "📣 Announcement draft", anNote: "Upcoming events with our times, ready to paste in game. Add a short line where you like — the game allows 300 characters.", anDays: "Next {n} days", anGen: "🔄 Make again", anCopy: "📋 Copy", anCount: "{n} / 300 characters", anOver: "⚠️ {n} / 300 — too long for the game", etBearNext: "Next Bear day (UTC)", etPerDay: "Battle day: set per time (@ = day of the event)", etDayLbl: "Battle day", etDayAll: "Every day is a battle day", etBearMoved: "🐻 Bear Hunt now runs every {e} days from {d}.",
    etTitle: "⏰ Our event times (UTC)", etNote: "The times we pick for alliance events, and which day of the event the battle is. Used on the home page (This week) and for everyone's ⏰ Game reminders. Type one or more times, e.g. 13:00, 22:00. If the game moves Bear Hunt to another day, change \"Next Bear day\" — the whole site follows. Battles on different days: add @ and the day of the event, e.g. 22:00@1, 13:00@3.",
    etBad: "Check the times — use HH:MM, e.g. 13:00, 22:30.", etSaved: "Saved ✅ The site and the ⏰ reminders use the new times within a few minutes (reminders update when people open the site).",
    limTitle: "⚙️ Troop limits in the guides", limNote: "Used everywhere the guides mention these numbers (all 12 languages) and by the AI assistant. Change them here when the game or the alliance changes the limit.",
    limBear: "Bear Hunt — joining a rally (exactly)", limRally: "Other rallies / Viking HQ — max per member", limSave: "💾 Save", limSaving: "Saving…",
    limSaved: "Saved ✅ The site shows the new numbers within a few minutes.", limBad: "Enter both numbers.", limNoKey: "Saving needs the officer GitHub key (set up on the Post tab).", limErr: "Couldn't save — try again.", msTitle: "Kingdom #2189 milestones", msNext: "next", msIn: "in {n} days", dueLbl: "Days before (−) / after the start", untilLbl: "Only that day, until UTC hour (optional)", untilShow: "until {h} UTC", tdTxt: "What to do",
    tdPost: "Announcement button", tdRank: "Ranking button",
    fIngame: "In-game guides", fIngameSm: "(one box = one chat message; the game limits message length, so keep long guides in several boxes)", addIg: "+ Message", igTitle: "Title", igText: "Text",
    del: "Delete event", cancel: "Cancel", save: "💾 Save",
    needName: "Please enter a name.", needSched: "Please fill in the first day (YYYY-MM-DD), repeat and length.",
    confirmDel: "Delete this event for everyone?", saving: "Saving…", saved: "Saved ✅ Other officers see it after refreshing (about 1 minute).",
    errAuth: "The saved GitHub key no longer works. Ask Sherry to redo the setup on the Post tab.",
    errBusy: "Someone else changed the events meanwhile. Refresh the page and try again.", errNet: "Couldn't reach GitHub. Try again.",
    noKey: "Saving needs the GitHub key (set up on the Post tab).", remove: "✕",
  },
  zh: {
    title: "NXS 活動排程", sub: "這週有哪些活動，以及幹部要安排的事。", home: "回主頁",
    thisWeek: "本週", nextWeek: "下週", todoTitle: "✅ 待辦事項", weekTitle: "📅 活動", late: "已過期", calNote: "左右捲動。實心＝進行中 · ✅＝有待辦（點了跳到待辦事項）· 其他點了跳到下面的活動說明。", today: "今天",
    todoNote: "勾選只存在這台裝置上。",
    note: "日期依網站上的活動排程推算。遊戲每天 UTC 00:00 換日。如果跟遊戲內行事曆不同，以遊戲為準。",
    noTodo: "這週沒有需要排時間的活動 🎉", none: "—", day: "第 {n}/{t} 天", starts: "開始", ends: "最後一天",
    noData: "讀不到網站上的活動排程。",
    toPost: "📢 寫公告", toRanking: "📊 打開 Ranking", toGuide: "📖 攻略",
    week: "{a} – {b}", wd: ["一", "二", "三", "四", "五", "六", "日"],
    runs: "{a} – {b}（{n} 天）",
    mgrTitle: "📋 活動與遊戲內指南", addEv: "+ 新增活動",
    mgrNote: "點活動可以看遊戲內指南。一格就是一則聊天訊息（遊戲有字數限制），請一則一則複製貼上。訊息旁的 ✏️ 只改那一則；最下面的「✏️ 修改」可以改整個活動（日期、待辦、新增或刪除訊息）。修改會存到網站上，所有幹部都看得到。",
    sched: "從 {s} 起每 {e} 天一次 · 持續 {d} 天", noSched: "沒有固定時間", every1: "每天",
    edit: "✏️ 修改", copy: "📋 複製", copied: "已複製 ✅", noIg: "還沒有遊戲內指南。", chars: "字",
    newEv: "新增活動", editEv: "修改活動",
    fEmoji: "圖示", fName: "名稱", fFixed: "有固定週期",
    fStart: "第一天（UTC）", fEvery: "每幾天一次", fDays: "持續幾天",
    fNote: "備註", fNoteSm: "（例如時間，會顯示在清單上）", fGuide: "網站上的攻略", noGuide: "— 無 —",
    fTodo: "幹部待辦事項", addTodo: "+ 待辦事項", editTodo: "編輯待辦",
    etDay: "第 {n} 天（共 {t} 天）",
    anOne: "📣 遊戲公告", anGuides: "📋 已勾選活動的遊戲內指南——打開一個，把想用的部分加進草稿：", anAdd: "＋ 把勾選的訊息加進草稿", anMsg: "訊息 {n}", anTitle: "📣 公告草稿", anNote: "接下來的活動和我們的時間，可以直接貼到遊戲裡。想補一句的話直接改 — 遊戲限制 300 字元。", anDays: "接下來 {n} 天", anGen: "🔄 重新產生", anCopy: "📋 複製", anCount: "{n} / 300 字元", anOver: "⚠️ {n} / 300 — 超過遊戲限制", etBearNext: "下一個熊日（UTC）", etPerDay: "開打日：每個時間各自設定（@ 後面是活動第幾天）", etDayLbl: "開打日", etDayAll: "每天都開打", etBearMoved: "🐻 狩獵巨熊改成從 {d} 起每 {e} 天一次。",
    etTitle: "⏰ 我們的活動時間（UTC）", etNote: "聯盟活動我們自己決定的時間，以及活動第幾天開打。首頁「這週」和大家的 ⏰ 活動提醒都會用這裡的時間。可以填一個或多個時間，例如 13:00, 22:00。遊戲把狩獵巨熊移到別天時，改「下一個熊日」，整個網站都會跟著變。不同天開打的：在時間後面加 @ 和活動第幾天，例如 22:00@1, 13:00@3。",
    etBad: "請檢查時間格式（HH:MM），例如 13:00, 22:30。", etSaved: "已儲存 ✅ 幾分鐘內網站和 ⏰ 提醒就會用新的時間（大家打開網站時提醒會跟著更新）。",
    limTitle: "⚙️ 攻略裡的部隊人數上限", limNote: "攻略裡所有提到這兩個數字的地方（12 種語言）和 AI 助理都會用這裡的數字。遊戲或聯盟改上限時，在這裡改就好。",
    limBear: "狩獵巨熊 — 參加集結（剛好）", limRally: "其他集結／維京總部 — 每人上限", limSave: "💾 儲存", limSaving: "儲存中…",
    limSaved: "已儲存 ✅ 網站幾分鐘內就會換成新數字。", limBad: "兩個數字都要填。", limNoKey: "儲存需要幹部的 GitHub 金鑰（在公告分頁設定）。", limErr: "存不進去，請再試一次。", msTitle: "#2189 王國里程碑", msNext: "下一個", msIn: "{n} 天後", dueLbl: "開始前（−）／後第幾天", untilLbl: "只在當天顯示，到 UTC 幾點（可空白）", untilShow: "到 UTC {h}", tdTxt: "要做的事",
    tdPost: "顯示「寫公告」按鈕", tdRank: "顯示「Ranking」按鈕",
    fIngame: "遊戲內指南", fIngameSm: "（一格 = 一則聊天訊息；遊戲有字數限制，長的指南請分成好幾格）", addIg: "+ 訊息", igTitle: "標題", igText: "內容",
    del: "刪除活動", cancel: "取消", save: "💾 儲存",
    needName: "請填寫名稱。", needSched: "請填寫第一天（YYYY-MM-DD）、週期和持續天數。",
    confirmDel: "確定要刪除這個活動？所有幹部都會看不到。", saving: "儲存中…", saved: "已儲存 ✅ 其他幹部重新整理後就會看到（約 1 分鐘）。",
    errAuth: "存的 GitHub 權杖已經不能用了，請 Sherry 到 Post 分頁重新設定。",
    errBusy: "剛好有人也在改活動，請重新整理頁面再試一次。", errNet: "連不上 GitHub，請再試一次。",
    noKey: "儲存需要 GitHub 權杖（在 Post 分頁設定）。", remove: "✕",
  },
};
// Names follow the in-game wording (same as the site's glossary).
const EVENTS = {
  "kvk":                { emoji: "👑", en: "KvK", zh: "KvK" },
  "viking-vengeance":   { emoji: "🪓", en: "Viking Vengeance", zh: "維京人的掠奪" },
  "swordland-showdown": { emoji: "⚔️", en: "Swordland Showdown", zh: "聖劍爭奪" },
  "tri-alliance-clash": { emoji: "🛡️", en: "Tri-Alliance Clash", zh: "三盟爭霸" },
  "eternity-reach":     { emoji: "⛏️", en: "Eternity's Reach", zh: "失落的遺跡" },
  "all-out":            { emoji: "🔥", en: "All Out", zh: "全軍出擊" },
  "fishing-tournament": { emoji: "🎣", en: "Fishing Tournament", zh: "釣魚大賽" },
  "hero-roulette":      { emoji: "🎰", en: "Hero Roulette", zh: "英雄轉盤" },
  "cesares-fury":       { emoji: "🗡️", en: "Cesares Fury", zh: "征討切薩雷", noGuide: true },
  "wavebound-voyage":   { emoji: "⛵", en: "Wavebound Voyage", zh: "踏浪之旅", start: "2026-10-20", every: 100000, days: 5 },   // one-off (irregular)
  "castle-battle":      { emoji: "🏰", en: "Castle Battle", zh: "決戰王城", start: "2026-10-24", every: 28, days: 1, note: "12:00 – 17:00 UTC", noteZh: "UTC 12:00 – 17:00" },   // every other Saturday; KvK weeks have the cross-kingdom one, so ours is every 28 days (no guide yet)
  "sanctuary-battle":   { emoji: "🏯", en: "Sanctuary Battle", zh: "遺跡爭奪", noGuide: true, start: "2026-10-06", every: 7, days: 4 },   // added after the list was first saved → start/every/days seed it
  // the week right after KvK (first seen 2026-10-12; check the dates in game)
  "alliance-brawl":     { emoji: "🤜", en: "Alliance Brawl", zh: "聯盟對決", noGuide: true, start: "2026-10-12", every: 28, days: 7,
    note: "Mon 00:00 – Sun 12:00 UTC · be in the alliance at Sun 23:00 UTC the day before (matching) to count", noteZh: "週一 00:00 – 週日 12:00 UTC · 前一天週日 UTC 23:00 配對時要在聯盟內才算" },
  "merchant-empire":    { emoji: "🐫", en: "Merchant Empire", zh: "貿易復興", noGuide: true, start: "2026-10-12", every: 28, days: 7,
    note: "Escort 2 caravans at a time · last 4 h (until Sun 04:00 UTC) raiding only", noteZh: "同時最多護送 2 輛貨車 · 最後 4 小時（到週日 UTC 04:00）只能掠奪" },
  // the week after Alliance Brawl in the 4-week cycle (Brawl → Strongest Governor → Mobilization → KvK prep); 2026-10-19 – 10-25 from Sherry
  "strongest-governor": { emoji: "🏆", en: "Strongest Governor", zh: "至高領主", noGuide: true, start: "2026-10-19", every: 28, days: 7,
    note: "7 days, a new theme each day (daily ranking, rewards at 00:00 UTC): City Construction · Hero Development · Skill Up · Combat Training · Skill Up · Combat Training · Hero Development",
    noteZh: "7 天，每天換主題（每日排名，UTC 00:00 發獎）：城鎮建設 · 英雄養成 · 技能提升 · 戰鬥訓練 · 技能提升 · 戰鬥訓練 · 英雄養成" },
  // every 2 weeks (with Strongest Governor and KvK prep); 2026-10-19 – 10-20 from Sherry
  "golden-glaives":     { emoji: "✨", en: "Golden Glaives", zh: "黃金與巨刃", noGuide: true, start: "2026-10-19", every: 14, days: 2,
    note: "Every 2 weeks · a guide site says the exchange stays open 1 more day after collecting ends — check in game", noteZh: "每 2 週一次 · 有攻略網站說收集結束後還可以再兌換 1 天，請在遊戲裡確認" },
  // first seen 2026-10-13 – 10-15 (3 days), the day after KvK ended (KvK 10-05 – 10-12) → assumed to follow the 4-week KvK cycle; fix start / "every" on this page if the next one differs
  "call-of-sovereign":  { emoji: "📯", en: "Call of the Sovereign", zh: "崛起的號角", noGuide: true, start: "2026-10-13", every: 28, days: 3,
    note: "Max rewards: 90 Gold Keys (30/day) + 30 Platinum Keys (10/day) over the 3 days · resets 00:00 UTC", noteZh: "拿滿獎勵：3 天共 90 把黃金鑰匙（每天 30）＋ 30 把白銀鑰匙（每天 10）· UTC 00:00 重置" },
};
const SWORDLAND_TODO = [
  { due: 0, post: 1, en: "Voting phase: set up an alliance poll to confirm 100% attendance for the fixed time windows.",
            zh: "投票階段：發聯盟投票，確認誰在固定的時段 100% 能參加。" },
  { due: 2, en: "Registration phase: based on the voting, assign each confirmed member to a Legion.",
            zh: "報名階段：依投票結果，把每位確認參加的成員分到軍團。" },
  { due: 3, post: 1, en: "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.",
            zh: "提醒：請大家確認自己被分到的軍團和時間，並確認 100% 能參加，這會影響配對和職責分配。" },
  { due: 4, ranking: 1, post: 1, en: "Planning phase: assign roles (Attacker, Defender, Joiner) to Legion 1 and Legion 2.",
                                  zh: "規劃階段：分配軍團 1 和軍團 2 的職責（Attacker、Defender、Joiner）。" },
];
const TAC_TODO = [
  { due: 0, post: 1, en: "Voting phase: set up an alliance poll to find out who can 100% attend.", zh: "投票階段：發聯盟投票，確認誰 100% 能參加。" },
  { due: 2, en: "Sign-up phase: split confirmed players into Legion 1 and Legion 2 (separate time slots) so both have enough reliable players — don't put every strong account in one group.",
            zh: "報名階段：把確認參加的人分到軍團 1、軍團 2（不同時段），兩邊都要有足夠可靠的人，不要把強的帳號全放同一組。" },
  { due: 3, post: 1, en: "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.",
            zh: "提醒：請大家確認自己的軍團和時間，並確認 100% 能參加，這會影響配對和職責分配。" },
  { due: 4, ranking: 1, post: 1, en: "Planning phase: assign roles to Legion 1 and Legion 2 and post the plan.", zh: "規劃階段：分配軍團 1、軍團 2 的職責並發公告。" },
];
const VV_TODO = [
  { due: -1, post: 1, en: "R4/R5 start Viking Vengeance: pick a time that suits members and announce it beforehand (UTC), so everyone can return troops, prepare reinforcements and stay online for the important waves.",
             zh: "R4/R5 負責開啟維京人的掠奪：選大家方便的時間並提前公告（寫 UTC），讓大家召回部隊、準備增援，重要波次時在線。" },
  { due: 0, en: "Start Viking Vengeance in game at the announced time.", zh: "在公告的時間於遊戲內開啟活動。" },
];
const SANCTUARY_TODO = [
  { due: 0, en: "R4+: register if we meet the requirements — 1 Sanctuary + 1 Fortress, 3 time slots (the slot most alliances pick wins). Pick targets we can realistically take and hold (competition, location, our strength), not just the most prestigious. Sanctuaries we held last week are signed up automatically.",
            zh: "R4 以上：符合條件就報名，1 個遺跡＋1 座要塞、選 3 個時段（最多聯盟選的時段開打）。選我們實際打得下、守得住的目標（看競爭、位置、實力），不要只看名氣。上期佔領的遺跡會自動報名。" },
  { due: 3, post: 1, en: "Contest day: post the rally message about 1.5 h before the slot (exact 70,080 troops, rally from home, no solo attacks). Once a building is taken, post the defence swap (Howard/Gordon 60:20:20).",
            zh: "爭奪日：開打前約 1.5 小時發集結公告（剛好 70,080 兵、在家發集結、不要單打）。打下建築後發換防公告（Howard/Gordon 60:20:20）。" },
];
const MOBILIZATION_TODO = [
  { due: 0, post: 1, en: "Post the mission rules (no KvK Prep items; best picks). R4+: refresh shared missions — remove poor ones so members aren't left with tasks they avoid.",
            zh: "公告任務規則（不要選用到 KvK 準備道具的任務、推薦的任務）。R4 以上：刷新共享任務，把不好的任務換掉。" },
];
const BEAR_TODO = [];   // Bear Hunt repeats by itself — nothing for officers to do unless the time changes
/* built-in lists that replace an already-saved list once (bump the number to push a new version) */
const TODO_PUSH = { "call-of-sovereign": [1, () => TODO["call-of-sovereign"]], "swordland-showdown": [8, () => SWORDLAND_TODO], "tri-alliance-clash": [1, () => TAC_TODO], "viking-vengeance": [1, () => VV_TODO],
  "sanctuary-battle": [1, () => SANCTUARY_TODO], "alliance-mobilization": [1, () => MOBILIZATION_TODO], "bear-hunt": [2, () => BEAR_TODO] };
// What officers need to do. due: days relative to the event's first day (−1 = the day before).
const TODO = {
  "viking-vengeance": VV_TODO,
  // in-game phases: voting 2 days (day 0–1) · registration 2 days (day 2–3, R4 picks time + roster) · matchmaking 2 days (day 4–5) · battle 1 h (day 6)
  "swordland-showdown": SWORDLAND_TODO,
  "tri-alliance-clash": TAC_TODO,
  "cesares-fury": [
    { due: 0, en: "Remind everyone: each member gets 5 rally requests — use them, unused ones are lost when the event ends.",
              zh: "提醒大家：每人有 5 份征討召集令可以找盟友集結，活動結束沒用完就會被清除。" },
    { due: 1, post: 1, en: "R4+: once enough members have beaten high-level targets, apply to challenge the Captain and post a time for everyone to join.",
                       zh: "R4 以上：成員擊敗足夠的高等級目標後，申請挑戰頭目，並公告大家一起打的時間。" },
  ],
  "sanctuary-battle": SANCTUARY_TODO,
  "eternity-reach": [
    { due: 0, post: 1, en: "Remind everyone: 30-minute solo event. Skill picks Right / Right / Left / Left / Right; send one march into a Copper Vein every minute.",
              zh: "提醒大家：30 分鐘的個人活動。技能依序選 右／右／左／左／右；每分鐘派一隊進銅礦脈。" },
  ],
  "all-out": [
    { due: -1, post: 1, en: "Post the All Out rules (NAP alliances, no attacks on castles or alliance buildings) and the secured gathering node rotation.",
               zh: "公告全軍出擊規則（NAP 聯盟名單、不能打城堡和聯盟建築）和安全採集點的輪替時間。" },
  ],
  "call-of-sovereign": [
    { due: -3, post: 1, en: "Remind everyone to SAVE Gold & Platinum Keys (90 Gold + 30 Platinum for max rewards) — copy the in-game message.",
               zh: "提醒大家存黃金鑰匙和白銀鑰匙（拿滿要 90 把黃金＋30 把白銀），可直接複製遊戲內公告。" },
  ],
  "fishing-tournament": [
    { due: 0, en: "Remind everyone: use Ocean Prospector first to upgrade the Fishing Kit, then switch to Regular Fishing.",
              zh: "提醒大家：先玩寶藏釣魚把漁具升級，再改玩普通釣魚。" },
  ],
  "hero-roulette": [
    { due: 0, en: "Remind everyone: 1 free spin a day; milestone rewards at 5 / 15 / 35 / 70 / 120 spins. Spins on KvK Prep Day 2–3 also score KvK points.",
              zh: "提醒大家：每天 1 次免費；累計 5／15／35／70／120 次有里程碑獎勵。KvK 備戰階段 2–3 轉的次數也會算 KvK 積分。" },
  ],
  "kvk": [
    { due: -1, en: "Remind members: book Chief Minister slots, save Intel Missions, count saved items (the site's KvK checklist pops up).",
               zh: "提醒成員：預約總理大臣時段、存情報任務、清點存的道具（網站會跳出 KvK 檢查清單）。" },
    { due: 5, until: 22, en: "Castle Battle on the last day: agree rally leaders and times.", zh: "最後一天王城爭奪戰：決定集結隊長和時間。" },
  ],
};
const DAY = 86400000;
const LS = "nxs-events-v1";
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} };
/* one language for all officer tabs (set from the main site when you enter, and by the language button on any tab) */
let lang = OFFICER.lang;
let LIST = null, weekStart = null, OFFICER_PW = null, TOKEN = null, FILE_SHA = null;

/* ===== where the event list is kept =====
   data/events-x7k2p9.json = { v: 1, sched: { id: { anchor, periodDays, activeDays } }, data: <events list, encrypted like the other officer files> }
   "sched" stays readable so the main site can follow schedule changes; the in-game guides etc. are in "data". */
const EV_PATH = "data/events-x7k2p9.json";
const { owner: OWNER, name: REPO, branch: BRANCH } = OFFICER.repo;
const GUIDE_LIST = {"wavebound-voyage":{"e":"⛵","en":"Wavebound Voyage","zh":"踏浪之旅"},"bear-hunt":{"e":"🐻","en":"Bear Hunt","zh":"狩獵巨熊"},"viking-vengeance":{"e":"🧯","en":"Viking Vengeance","zh":"維京人的掠奪"},"swordland-showdown":{"e":"⚔️","en":"Swordland Showdown","zh":"聖劍爭奪"},"tri-alliance-clash":{"e":"🔱","en":"Tri-Alliance Clash","zh":"三盟爭霸"},"eternity-reach":{"e":"⛏️","en":"Eternity's Reach","zh":"失落的遺跡"},"all-out":{"e":"🪖","en":"All Out","zh":"全軍出擊"},"kvk":{"e":"👑","en":"KvK Prep & Battle Guide","zh":"KvK 準備與戰鬥指南"},"hero-roulette":{"e":"🎡","en":"Hero Roulette","zh":"英雄轉盤"},"fishing-tournament":{"e":"🎣","en":"Fishing Tournament","zh":"釣魚大賽"},"mystic-trial":{"e":"🔮","en":"Mystic Trial","zh":"秘境試煉"},"formations-rally-tips":{"e":"🛡️","en":"Formations & Rally Tips","zh":"部隊編組與集結技巧"},"master-academy":{"e":"🎓","en":"Gen 3 Master Academy Guide","zh":"第3代大師學院指南"},"pet":{"e":"🦁","en":"Pets","zh":"寵物"},"f2p-heroes":{"e":"🎯","en":"F2P Heroes Guide","zh":"英雄培養指南（F2P）"},"hero-cards":{"e":"🃏","en":"Hero Cards (Gen 1–3)","zh":"英雄卡（第 1–3 代）"},"general-tips":{"e":"🔍","en":"General Tips","zh":"通用小技巧"}};

const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const tr = (k, v = {}) => { const s = (T[lang] && T[lang][k]) ?? T.en[k] ?? k; return typeof s === "string" ? s.replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m) : s; };
const esc = OFFICER.util.esc;
const utcDay = (t) => Math.floor(t / DAY) * DAY;
const fmt = (t) => { const d = new Date(t); return `${lang === "pt" || lang === "ar" ? d.getUTCDate() + "/" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1) + "/" + d.getUTCDate()}（${tr("wd")[(d.getUTCDay() + 6) % 7]}）`.replace("（", lang === "zh" ? "（" : " (").replace("）", lang === "zh" ? "）" : ")"); };
const isoDay = (t) => new Date(t).toISOString().slice(0, 10);
const dayMs = (iso) => Date.parse(iso + "T00:00:00Z");
const byId = (id) => LIST.find((e) => e.id === id);
const NOTE_KEY = () => ({ zh: "noteZh", en: "note", pt: "notePt", ar: "noteAr", ko: "noteKo" })[lang] || "note";   // an event note written on the page is kept per language
const nm = (o) => (o && (o[lang] || (BY_EN[lang] && BY_EN[lang][o.en]) || o.en || o.zh || o.pt || o.ar)) || "";
const evName = (k) => { const e = byId(k); return e ? `${e.emoji || ""} ${nm(e) || k}`.trim() : k; };
const txt = nm;
function mondayOf(t) { const d = utcDay(t); const wd = (new Date(d).getUTCDay() + 6) % 7; return d - wd * DAY; }

/* starting list, built from what the site already had (used until the first save) */
function defaultList(sched) {
  const out = [];
  for (const [id, e] of Object.entries(EVENTS)) {
    const s = sched[id];
    out.push({ id, emoji: e.emoji, en: e.en, zh: e.zh, start: s ? isoDay(s.anchor) : (e.start || ""), every: s ? s.periodDays : (e.every || 0), days: s ? s.activeDays : (e.days || 0),
      guide: e.noGuide ? "" : (GUIDE_LIST[id] ? id : ""), note: e.note || "", ...(e.noteZh ? { noteZh: e.noteZh } : {}), todo: (TODO[id] || []).map((x) => ({ ...x })), ingame: INGAME_DEFAULTS[id] || [] });
  }
  for (const e of EXTRA_EVENTS) if (!out.some((x) => x.id === e.id)) out.push({ ...e, note: e.note || "", todo: e.todo || [], ingame: INGAME_DEFAULTS[e.id] || [] });
  return out;
}

// every run of each scheduled event that touches [from, to)
function runs(from, to) {
  const out = [];
  for (const e of LIST) {
    if (!e.start || !(e.every > 0) || !(e.days > 0)) continue;
    const anchor = dayMs(e.start);
    let n = Math.max(0, Math.floor((from - anchor) / DAY / e.every) - 1);
    for (;; n++) {
      const st = anchor + n * e.every * DAY;
      if (st >= to) break;
      const en = st + e.days * DAY;
      if (en > from) out.push({ k: e.id, st, en, days: e.days });
    }
  }
  return out.sort((a, b) => a.st - b.st);
}

function render() {
  etBearFill();
  const ws = weekStart, we = ws + 7 * DAY, today = utcDay(Date.now());
  $("weekLbl").textContent = tr("week", { a: fmt(ws), b: fmt(we - DAY) });
  $("thisW").classList.toggle("primary", ws === mondayOf(Date.now())); $("nextW").classList.toggle("primary", ws === mondayOf(Date.now()) + 7 * DAY);
  // action items: every event that runs in this week (Mon–Sun), one card per run, in date order; runs already over are left out.
  // Prep that is due before the event (e.g. the Sunday before a Monday start) is listed with the event's week.
  const items = [];
  for (const r of runs(ws, we)) {
    if (r.en <= today) continue;                       // already over
    const startsHere = r.st >= ws && r.st < we;        // a run belongs to the week it starts in …
    for (const [i, td] of ((byId(r.k) || {}).todo || []).entries()) {
      const due = r.st + (Number(td.due) || 0) * DAY;
      if (!startsHere && !(due >= ws && due < we)) continue;   // … unless it started earlier and this task is due this week (long events like KvK)
      if (due < today) continue;                         // its day has passed → gone (no "overdue" leftovers)
      const until = td.until === "" || td.until == null ? null : +td.until;
      if (until != null && (Date.now() < due || Date.now() >= due + until * 3600000)) continue;   // a timed item: only on its day, until that UTC hour
      items.push({ r, td, due, id: `${r.k}-${isoDay(r.st)}-${i}`, more: [] });
    }
  }
  items.sort((a, b) => a.r.st - b.r.st || a.due - b.due);
  store.done = store.done || {};
  // one card per event (this week's run); its tasks are listed inside, each with its own checkbox
  const groups = [];
  for (const it of items) { let g = groups.find((x) => x.r.k === it.r.k); if (!g) groups.push(g = { r: it.r, runs: [], list: [] }); if (!g.runs.includes(it.r)) g.runs.push(it.r); g.list.push(it); }
  groups.sort((a, b) => (a.r.k === "bear-hunt") - (b.r.k === "bear-hunt"));   // Bear Hunt is set-and-forget → last
  $("todos").innerHTML = groups.length ? groups.map(({ r, runs: rr, list }) => { const e = byId(r.k) || {};
    const allDone = list.every((it) => store.done[it.id]);
    const when = rr.length === 1 ? tr("runs", { a: fmt(r.st), b: fmt(r.en - DAY), n: r.days }) : rr.map((x) => fmt(x.st)).join(" · ");   // short events (Bear Hunt) → one card, each day listed
    return `<div class="todo${allDone ? " done" : ""}" data-ev="${esc(r.k)}" data-st="${rr.map((x) => x.st).join(" ")}">
      <div style="flex:1;min-width:0">
        <div class="txt"><b>${esc(evName(r.k))}</b> <span class="when">· ${esc(when)}</span></div>
        ${list.map(({ r: ir, td, due, id }) => `<label class="task${store.done[id] ? " done" : ""}"><input type="checkbox" data-id="${esc(id)}" ${store.done[id] ? "checked" : ""}><div><div>${rr.length > 1 ? `<b>${esc(fmt(ir.st))}</b> · ` : ""}${localTimes(esc(txt(td)), lang)}</div><div class="when">⏰ ${esc(fmt(due))}${td.until != null && td.until !== "" ? ` · ${esc(tr("untilShow", { h: String(+td.until).padStart(2, "0") + ":00" }))}` : ""}${due < today && !store.done[id] ? ` <b class="warn">${esc(tr("late"))}</b>` : ""}</div></div></label>`).join("")}
        <div class="acts"><button type="button" class="btn small" data-edtodo="${esc(r.k)}">✏️ ${esc(tr("editTodo"))}</button>${["bear-hunt", "mystic-trial", "alliance-rules"].includes(r.k) ? "" : `<button type="button" class="btn small" data-anone="${esc(r.k)}" data-anst="${r.st}">${esc(tr("anOne"))}</button>`}${list.some((x) => x.td.post) ? `<a class="btn small" href="#post">${esc(tr("toPost"))}</a>` : ""}${list.some((x) => x.td.ranking) ? `<a class="btn small" href="#ranking">${esc(tr("toRanking"))}</a>` : ""}${e.guide ? `<a class="btn small" href="./#/${lang}/${esc(e.guide)}">${esc(tr("toGuide"))}</a>` : ""}${(e.ingame || []).length ? `<button type="button" class="btn small" data-open="${esc(r.k)}">📋 ${esc(tr("fIngame"))}</button>` : ""}</div>
      </div>
    </div>`; }).join("") : `<div class="none">${esc(tr("noTodo"))}</div>`;
  $("todos").querySelectorAll("input[type=checkbox]").forEach((cb) => cb.onchange = () => {
    if (cb.checked) store.done[cb.dataset.id] = 1; else delete store.done[cb.dataset.id];
    save(); cb.closest(".task").classList.toggle("done", cb.checked);
    const card = cb.closest(".todo"); card.classList.toggle("done", [...card.querySelectorAll("input[type=checkbox]")].every((x) => x.checked));
    renderCal();
    exportAdmin();
  });
  renderList();
  renderCal();
  renderTimed();
  exportAdmin();
  jumpToEvent();
}
/* ⏱️ Timed admin reminders: one-off times an officer types in (e.g. "Sanctuary Battle S1 S9 at 13:00 UTC"). Saved inside the
   (encrypted) events file next to the list; each one is sent to the people whose 🔔 covers that event, 10 minutes before. */
const TIMED_LS = "nxs-timed-v1";
let TIMED = (() => { try { return JSON.parse(localStorage.getItem(TIMED_LS)) || []; } catch (e) { return []; } })(), timedDirty = false;
const TT2 = { zh: { h: "⏱️ 定時管理提醒", sub: "一次性的時間（例如遺跡爭奪開打），開始前 10 分鐘通知 🔔 有勾這個活動的人。時間是 UTC。", ev: "活動", label: "內容", date: "日期 (UTC)", hour: "時 (UTC)", add: "＋ 加入", save: "💾 儲存", unsaved: "有變更還沒儲存", saved: "已儲存 ✅", none: "目前沒有定時提醒。", del: "刪除", link: "從連結帶入 {n} 個定時提醒，確認後按「儲存」。" },
  en: { h: "⏱️ Timed admin reminders", sub: "One-off times (e.g. a Sanctuary Battle start). Sent 10 minutes before to the people whose 🔔 covers that event. Times are UTC.", ev: "Event", label: "What", date: "Date (UTC)", hour: "Hour (UTC)", add: "+ Add", save: "💾 Save", unsaved: "Unsaved changes", saved: "Saved ✅", none: "No timed reminders.", del: "Delete", link: "{n} timed reminders came from the link — check them and press Save." } };
const tt2 = (k) => (TT2[lang] || TT2.en)[k];
let timedMsg = "";
function renderTimed() {
  const el = $("ev_timed"); if (!el) return;
  const ed = OFFICER.can("events", "edit"), now = Date.now();
  TIMED = TIMED.filter((t) => t.at > now - 3600000);   // gone 1 h after it started
  const loc = (at) => new Date(at).toLocaleString(LOCALE(lang), { weekday: "short", hour: "2-digit", minute: "2-digit" });
  const evs = (LIST || []).filter((e) => e.id !== "alliance-rules");
  el.innerHTML = `<h2>${esc(tt2("h"))}</h2><div class="muted msg">${esc(tt2("sub"))}</div>`
    + (TIMED.length ? TIMED.slice().sort((a, b) => a.at - b.at).map((t) => `<div class="todo"><div style="flex:1;min-width:0"><div class="txt"><b>${esc(evName(t.ev))}</b> ${esc(t.label || "")}</div>
        <div class="when">⏰ ${esc(new Date(t.at).toISOString().slice(5, 16).replace("T", " "))} UTC · ${esc(loc(t.at))}</div></div>${ed ? `<button type="button" class="btn small" data-tdel="${esc(t.id)}">${esc(tt2("del"))}</button>` : ""}</div>`).join("")
      : `<div class="none">${esc(tt2("none"))}</div>`)
    + (ed ? `<div class="row" style="margin-top:10px;flex-wrap:wrap;gap:6px"><select class="btn" id="td_ev">${evs.map((e) => `<option value="${esc(e.id)}"${e.id === "sanctuary-battle" ? " selected" : ""}>${esc(evName(e.id))}</option>`).join("")}</select>
        <input id="td_label" maxlength="60" placeholder="${esc(tt2("label"))}" style="flex:1;min-width:120px">
        <input id="td_date" type="date" value="${new Date().toISOString().slice(0, 10)}"><select class="btn" id="td_hour">${Array.from({ length: 24 }, (_, h) => `<option value="${h}">${String(h).padStart(2, "0")}:00</option>`).join("")}</select>
        <button type="button" class="btn" id="td_add">${esc(tt2("add"))}</button>${timedDirty ? `<button type="button" class="btn primary" id="td_save">${esc(tt2("save"))}</button>` : ""}</div>
        <div class="msg">${esc(timedMsg || (timedDirty ? tt2("unsaved") : ""))}</div>` : "");
  if (!ed) return;
  $("td_add").onclick = () => {
    const d = $("td_date").value, h = +$("td_hour").value; if (!d) return;
    const at = Date.parse(d + "T" + String(h).padStart(2, "0") + ":00:00Z"); if (!(at > 0)) return;
    TIMED.push({ id: "t" + Date.now().toString(36), ev: $("td_ev").value, label: $("td_label").value.trim().slice(0, 60), at }); timedDirty = true; timedMsg = ""; renderTimed(); exportAdmin();
  };
  if ($("td_save")) $("td_save").onclick = async () => { if (!LIST) return; const ok = await saveList(LIST, "Timed reminders"); if (ok) { timedDirty = false; timedMsg = tt2("saved"); try { localStorage.setItem(TIMED_LS, JSON.stringify(TIMED)); } catch (e) {} } renderTimed(); };
  el.querySelectorAll("[data-tdel]").forEach((b) => b.onclick = () => { TIMED = TIMED.filter((t) => t.id !== b.dataset.tdel); timedDirty = true; timedMsg = ""; renderTimed(); exportAdmin(); });
}
/* a link like #events?timed=sanctuary-battle@2026-10-16T13:00Z~S1%20S9 pre-fills timed reminders (not saved until Save is pressed) */
function importTimed() {
  if (!OFFICER.can("events", "edit")) return;
  const q = (location.hash.split("?")[1] || ""), v = new URLSearchParams(q).get("timed"); if (!v) return;
  let n = 0;
  for (const part of v.split(",")) {
    const m = part.match(/^([a-z-]+)@(\d{4}-\d\d-\d\dT\d\d:\d\dZ)(?:~(.*))?$/); if (!m) continue;
    const at = Date.parse(m[2]); if (!(at > Date.now()) || TIMED.some((t) => t.ev === m[1] && t.at === at)) continue;
    TIMED.push({ id: "t" + (Date.now() + n).toString(36), ev: m[1], label: (m[3] || "").slice(0, 60), at }); n++;
  }
  if (n) { timedDirty = true; timedMsg = tt2("link").replace("{n}", n); }
  try { history.replaceState(null, "", location.pathname + location.search + "#events"); } catch (e) {}
}
/* #events?ev=swordland-showdown (from an admin reminder notification): scroll to that event's card and flash it once */
let jumped = "";
function jumpToEvent() {
  const ev = new URLSearchParams(location.hash.split("?")[1] || "").get("ev");
  if (!ev || jumped === location.hash) return;
  const card = document.querySelector(`#todos .todo[data-ev="${CSS.escape(ev)}"]`);
  if (!card) return;
  jumped = location.hash;
  setTimeout(() => {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.style.transition = "box-shadow .3s"; card.style.boxShadow = "0 0 0 3px var(--accent, #c8642c)";
    setTimeout(() => (card.style.boxShadow = ""), 2200);
  }, 300);
}
window.addEventListener("hashchange", () => setTimeout(jumpToEvent, 200));
/* 🛠️ Admin reminders: the next 3 weeks of to-dos (not ticked yet) go to this phone's ⏰ timer panel on the main site,
   which turns them into notifications (same browser storage, so it works once the Events tab has been opened here). */
function exportAdmin() {
  try {
    const now = Date.now(), today = utcDay(now), items = [];
    for (const r of runs(today - 14 * DAY, today + 21 * DAY)) {
      const e = byId(r.k) || {};
      for (const [i, td] of (e.todo || []).entries()) {
        const due = r.st + (Number(td.due) || 0) * DAY, id = `${r.k}-${isoDay(r.st)}-${i}`;
        if (due < today || due > today + 21 * DAY || (store.done || {})[id]) continue;
        const names = {}; for (const l of OFFICER_LANGS) { const v = e[l] || (BY_EN[l] && BY_EN[l][e.en]) || ""; if (v) names[l] = v; }
        items.push({ id, ev: r.k, due, emoji: e.emoji || "📌", names, title: `${e.emoji || "📌"} ${e.en || r.k}`, body: String(td.en || td.zh || "").replace(/\*\*/g, "").slice(0, 190) });
      }
    }
    for (const t of TIMED) if (t.at > now) { const e = byId(t.ev) || {}; const names = {}; for (const l of OFFICER_LANGS) { const v = e[l] || (BY_EN[l] && BY_EN[l][e.en]) || ""; if (v) names[l] = v; }
      items.push({ id: "t-" + t.id, ev: t.ev, at: t.at, emoji: e.emoji || "⏱️", names, title: `${e.emoji || "⏱️"} ${e.en || t.ev}`, body: t.label || "" }); }
    localStorage.setItem("nxs-admin-todos", JSON.stringify({ updated: now, items }));
    window.dispatchEvent(new Event("nxs-admin-todos"));   // the ⏰ panel on this page re-sends the reminders
  } catch (err) {}
}

/* ===== calendar: one continuous strip of days (2 weeks back, 10 ahead), scrolls sideways; one bar per event run ===== */
const CAL_BACK = 14, CAL_AHEAD = 70, COLW = 44;
/* 👑 Kingdom #2189 milestones (server-age unlocks, dates in UTC; English only). Shown as one row on the calendar strip. */
const MILESTONES = [
  ["2026-09-28", ["Gen 3 Heroes & Pets", "Masters unlocked (Valora, Pan, Roman)", "Gov Gear Material Exchange"]],
  ["2026-11-09", ["Truegold 5", "Gov Charm Material Exchange", "4th Master (Cassia)"]],
  ["2026-11-30", ["Governor Charm cap raised (Lv.12+)"]],
  ["2026-12-21", ["Gen 4 Heroes (Alcar, Margot, Rosa)", "Gen 4 Pets", "5th & 6th Masters (Guinevere, Wilson)"]],
  ["2027-01-18", ["War Academy (T11 troops)"]],
  ["2027-03-15", ["Gen 5 Heroes (Long Fei, Thrud, Vivian)", "Gen 5 Pets", "7th & 8th Masters (Isnor, Aena)"]],
  ["2027-04-26", ["Truegold 8"]],
  ["2027-06-07", ["Gen 6 Heroes (Triton, Sophia, Yang)", "Gen 6 Pets"]],
  ["2027-08-01", ["First Flamedragon Tyrant Competition"]],
  ["2027-08-30", ["Gen 7 Heroes (Charles, Ava, Wee & Woo)", "Gen 7 Pets"]],
  ["2027-10-11", ["Advanced Truegold Research"]],
  ["2027-11-22", ["Gen 8 Heroes"]],
  ["2028-02-14", ["Gen 9 Heroes (predicted)"]],
  ["2028-03-27", ["Truegold 10"]],
].map(([d, l]) => ({ t: dayMs(d), l }));
function renderMilestones() {
  const box = $("msList"); if (!box) return;
  const today = utcDay(Date.now()), next = MILESTONES.filter((m) => m.t >= today);
  box.querySelector("summary").textContent = "👑 " + tr("msTitle") + (next[0] ? ` · ${tr("msNext")}: ${fmt(next[0].t)} ${next[0].l[0]}${next[0].l.length > 1 ? " …" : ""}` : "");
  box.querySelector("div").innerHTML = next.map((m) => `<div class="ms-row" data-ms="${m.t}"><b>${new Date(m.t).getUTCFullYear() !== new Date(today).getUTCFullYear() ? new Date(m.t).getUTCFullYear() + "/" : ""}${esc(fmt(m.t))}</b> <span class="muted">· ${esc(tr("msIn", { n: Math.round((m.t - today) / DAY) }))}</span><div>${m.l.map(esc).join(" · ")}</div></div>`).join("");
}
function renderCal() {
  const cal = $("cal"); if (!cal || !LIST) return;
  renderMilestones();
  const today = utcDay(Date.now()), from = today - CAL_BACK * DAY, to = today + CAL_AHEAD * DAY, n = CAL_BACK + CAL_AHEAD;
  const keepScroll = cal.firstElementChild ? cal.firstElementChild.scrollLeft : null;
  const col = (t) => Math.max(0, Math.min(n, Math.round((t - from) / DAY)));
  let head = "";
  for (let i = 0; i < n; i++) { const d = from + i * DAY, dt = new Date(d), wd = (dt.getUTCDay() + 6) % 7;
    head += `<div class="cd${d === today ? " today" : ""}${wd === 0 ? " mon" : ""}">${dt.getUTCDate() === 1 || i === 0 ? `<em>${dt.getUTCMonth() + 1}/</em>` : ""}${esc(tr("wd")[wd])}<small>${dt.getUTCDate()}</small></div>`; }
  // pack runs into lanes: a run goes into the first lane that is free at its start, so one event's weekly runs share a lane
  // ✅ only for runs whose to-do is listed in the week shown below (this week, or next week when that is selected)
  const openTodo = (r) => !!ROOT.querySelector(`.todo[data-ev="${CSS.escape(r.k)}"][data-st~="${r.st}"]:not(.done)`);
  const lanes = [];
  for (const r of runs(from, to)) { const a = col(r.st), b = Math.max(a + 1, col(r.en));
    let L = lanes.find((l) => l.end <= a && (l.k === r.k || !lanes.some((o) => o.k === r.k && o.end <= a)));
    if (!L) { L = { k: r.k, end: 0, bars: [] }; lanes.push(L); }
    L.end = b + 1; L.k = r.k;
    const now = r.st <= today && today < r.en, todo = openTodo(r);
    L.bars.push(`<span class="ev bar${now ? " now" : ""}${todo ? " has-todo" : ""}${r.st < from ? " cont" : ""}${r.en > to ? " more" : ""}" style="grid-column:${a + 1} / ${b + 1}" data-cal="${esc(r.k)}" data-st="${r.st}" data-todo="${todo ? 1 : 0}" title="${esc(fmt(r.st))} – ${esc(fmt(r.en - DAY))}">${todo ? "✅ " : ""}${esc(evName(r.k))}</span>`); }
  // milestone row first: a marker on its day, wide enough for a short name (up to the next milestone)
  const ms = MILESTONES.filter((m) => m.t >= from && m.t < to);
  const msRow = ms.length ? `<div class="cr ms">${ms.map((m, i) => { const a = col(m.t), nx = ms[i + 1] ? col(ms[i + 1].t) : n, b = Math.min(nx, a + 4, n);
    return `<span class="ev ms" style="grid-column:${a + 1} / ${Math.max(a + 1, b) + (b === a ? 1 : 0)}" data-ms="${m.t}" title="${esc(fmt(m.t) + ": " + m.l.join(" · "))}">👑 ${esc(m.l.length > 1 ? m.l[m.l.length - 1].replace(/ \(.*\)$/, "") + " +" + (m.l.length - 1) : m.l[0])}</span>`; }).join("")}</div>` : "";
  const rows = msRow + lanes.map((l) => `<div class="cr">${l.bars.join("")}</div>`).join("");
  // dotted "now" line down the whole strip, at the current UTC time within today's column
  const nowX = (CAL_BACK + (Date.now() - today) / DAY) * COLW;
  cal.innerHTML = `<div class="cal-scroll"><div class="cal-grid" style="--n:${n};--w:${COLW}px"><div class="cal-head">${head}</div>${rows}<div class="cal-now" style="left:${nowX.toFixed(1)}px" title="${esc(new Date().toISOString().slice(11, 16))} UTC"></div></div></div>`;
  const sc = cal.firstElementChild;
  sc.scrollLeft = keepScroll !== null ? keepScroll : (CAL_BACK - 1) * COLW;
  /* a bar that starts left of the visible part keeps its name in view (pads the text to the left edge) */
  const bars = [...cal.querySelectorAll(".ev.bar")];
  const pinNames = () => { const L = sc.getBoundingClientRect().left;
    for (const b of bars) { const off = L - b.getBoundingClientRect().left; b.style.paddingLeft = off > 0 ? Math.max(0, Math.min(off, b.offsetWidth - 60)) + 8 + "px" : ""; } };
  sc.addEventListener("scroll", pinNames, { passive: true }); pinNames();
  /* ⤺ scrolled far away: a button brings the strip back to today */
  const home = (CAL_BACK - 1) * COLW, tb = document.createElement("button");
  tb.type = "button"; tb.className = "btn small cal-today"; tb.textContent = "⤺ " + tr("today"); tb.hidden = true;
  tb.onclick = () => sc.scrollTo({ left: home, behavior: "smooth" });
  cal.appendChild(tb);
  const showTb = () => { tb.hidden = Math.abs(sc.scrollLeft - home) < COLW * 3; };
  sc.addEventListener("scroll", showTb, { passive: true }); showTb();
  cal.querySelectorAll("[data-ms]").forEach((b) => b.onclick = () => {   // open the milestone list at that day
    const d = $("msList"); d.open = true; const r = d.querySelector(`.ms-row[data-ms="${b.dataset.ms}"]`);
    if (r) { r.classList.remove("flash"); void r.offsetWidth; r.classList.add("flash"); r.scrollIntoView({ behavior: "smooth", block: "center" }); }
  });
  cal.querySelectorAll("[data-cal]").forEach((b) => b.onclick = () => {
    const id = b.dataset.cal, st = Number(b.dataset.st);
    if (b.dataset.todo === "1") {
      const card = ROOT.querySelector(`.todo[data-ev="${CSS.escape(id)}"][data-st~="${st}"]`);
      if (card) { card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash"); card.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    }
    openEvent(id);
  });
}

/* ===== event list with in-game guides ===== */
function schedText(e) {
  if (!e.start || !(e.every > 0)) return tr("noSched");
  return e.every === 1 ? `${tr("every1")} · ${fmt(dayMs(e.start))}` : tr("sched", { e: e.every, s: fmt(dayMs(e.start)), d: e.days });
}
const noteOf = (e) => {
  const n = (lang === "zh" ? e.noteZh || e.note : lang === "en" ? e.note || e.noteZh : e[NOTE_KEY()] || ptOf(e.note) || e.noteZh) || "";
  // Bear Hunt's times always follow "⏰ Our event times" (the note's "13:00 & 22:00" is swapped for the saved times)
  const t = e.id === "bear-hunt" && typeof ET !== "undefined" && ET["bear-hunt"];
  return t && t.length ? n.replace(/\d{1,2}:\d{2}(\s*(?:&|和|,|、|e|و)\s*\d{1,2}:\d{2})*/, t.join(lang === "zh" ? " 和 " : lang === "pt" ? " e " : lang === "ar" ? " و " : lang === "ko" ? ", " : " & ")) : n;
};
function renderList() {
  const open = new Set([...ROOT.querySelectorAll(".evrow[open]")].map((d) => d.dataset.id));
  const ordered = [...LIST.filter((e) => e.id === "alliance-rules"), ...LIST.filter((e) => e.id !== "alliance-rules")];
  $("evList").innerHTML = ordered.map((e) => `
    <details class="evrow" data-id="${esc(e.id)}"${open.has(e.id) ? " open" : ""}>
      <summary><span><b>${esc(evName(e.id))}</b><br><span class="sched">${esc(schedText(e))}${noteOf(e) ? " · " + localTimes(esc(noteOf(e)), lang) : ""}</span></span>
        <span class="muted">${(e.ingame || []).length ? "📋 " + (e.ingame || []).length : ""}</span></summary>
      ${(e.ingame || []).length ? e.ingame.map((g, i) => `
        <div class="ig"><div class="head"><span>${esc(g.title || tr("fIngame"))} <span class="sched">· ${[...g.text].length} ${esc(tr("chars"))}</span></span><span class="row" style="flex:none"><button type="button" class="btn small" data-igedit="${esc(e.id)}:${i}">✏️</button><button type="button" class="btn small" data-copy="${esc(e.id)}:${i}">${esc(tr("copy"))}</button></span></div>
        <pre>${esc(g.text)}</pre></div>`).join("") : `<div class="none" style="margin:8px 0">${esc(tr("noIg"))}</div>`}
      <div class="row">${e.guide ? `<a class="btn small" href="./#/${lang}/${esc(e.guide)}">${esc(tr("toGuide"))}</a>` : ""}<button type="button" class="btn small" data-edit="${esc(e.id)}">${esc(tr("edit"))}</button></div>
    </details>`).join("");
}
function openEvent(id) {
  const d = ROOT.querySelector(`.evrow[data-id="${CSS.escape(id)}"]`);
  if (!d) return;
  d.open = true; d.classList.remove("flash"); void d.offsetWidth; d.classList.add("flash");
  d.scrollIntoView({ behavior: "smooth", block: "start" });
}
async function copyText(t, btn) {
  try { await navigator.clipboard.writeText(t); }
  catch (e) { const ta = document.createElement("textarea"); ta.value = t; ROOT.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (x) {} ta.remove(); }
  const old = btn.textContent; btn.textContent = tr("copied"); setTimeout(() => { btn.textContent = old; }, 1500);
}
ROOT.addEventListener("click", (ev) => {
  const o = ev.target.closest("[data-open]"); if (o) { ev.preventDefault(); return openEvent(o.dataset.open); }
  const a1 = ev.target.closest("[data-anone]"); if (a1) { ev.preventDefault(); return anOne(a1.dataset.anone, +a1.dataset.anst); }
  const c = ev.target.closest("[data-copy]"); if (c) { ev.preventDefault(); const [id, i] = c.dataset.copy.split(":"); return copyText(byId(id).ingame[+i].text, c); }
  if (!OFFICER.can("events", "edit") && ev.target.closest("[data-edit],[data-igedit],[data-edtodo]")) { ev.preventDefault(); return; }   // 👁️ read-only
  const ed = ev.target.closest("[data-edit]"); if (ed) { ev.preventDefault(); return openEditor(ed.dataset.edit); }
  const ie = ev.target.closest("[data-igedit]"); if (ie) { ev.preventDefault(); return igInline(ie); }
  const et = ev.target.closest("[data-edtodo]"); if (et) { ev.preventDefault(); openEditor(et.dataset.edtodo);   // straight to the action items of that event
    requestAnimationFrame(() => { const l = $("edTodos").previousElementSibling || $("edTodos"); l.scrollIntoView({ block: "start" }); }); return; }
});

/* edit one in-game message right in the list */
function igInline(btn) {
  const [id, i] = btn.dataset.igedit.split(":"); const box = btn.closest(".ig"); const g = byId(id).ingame[+i];
  box.innerHTML = `<input class="inp" data-k="title" value="${esc(g.title || "")}" placeholder="${esc(tr("igTitle"))}">
    <textarea class="inp" data-k="text" style="margin-top:6px;min-height:200px;line-height:1.45">${esc(g.text)}</textarea>
    <div class="row" style="justify-content:flex-end;margin-top:6px"><span class="sched" data-k="n"></span><button type="button" class="btn small" data-k="cancel">${esc(tr("cancel"))}</button><button type="button" class="btn small primary" data-k="save">${esc(tr("save"))}</button></div>`;
  const ta = box.querySelector('[data-k="text"]'), n = box.querySelector('[data-k="n"]');
  const count = () => { n.textContent = `${[...ta.value].length} ${tr("chars")}`; }; count(); ta.oninput = count; ta.focus();
  box.querySelector('[data-k="cancel"]').onclick = () => renderList();
  box.querySelector('[data-k="save"]').onclick = async () => {
    const e = { ...byId(id), ingame: byId(id).ingame.map((x, j) => (j === +i ? { title: box.querySelector('[data-k="title"]').value.trim(), text: ta.value.replace(/\r/g, "").trimEnd() } : x)) };
    if (await saveList(LIST.map((x) => (x.id === id ? e : x)), `Edit in-game guide: ${e.en || e.zh}`)) { renderList(); openEvent(id); }
  };
}

/* ===== editor ===== */
let editing = null;   // id of the event being edited, or null for a new one
function todoRow(td = {}) {
  return `<div class="sub todo-ed">
    <div class="row"><label class="due">${esc(tr("dueLbl"))} <input class="inp" type="number" data-k="due" value="${esc(td.due ?? 0)}"></label><label class="due">${esc(tr("untilLbl"))} <input class="inp" type="number" min="1" max="24" data-k="until" value="${esc(td.until ?? "")}" style="width:60px"></label><button type="button" class="btn small" data-rm>${esc(tr("remove"))}</button></div>
    <textarea class="inp" data-k="txt" rows="2" placeholder="${esc(tr("tdTxt"))}" data-orig="${esc(txt(td))}" data-keep="${esc(JSON.stringify(Object.fromEntries(OFFICER_LANGS.map((l) => [l, td[l]]))))}" data-had="${td[lang] ? 1 : 0}" style="margin-top:6px;width:100%;min-height:0;resize:vertical">${esc(txt(td) || td[lang === "zh" ? "en" : "zh"] || "")}</textarea>
    <div class="row" style="justify-content:flex-start;font-size:13px;margin-top:6px"><label><input type="checkbox" data-k="post"${td.post ? " checked" : ""}> ${esc(tr("tdPost"))}</label><label><input type="checkbox" data-k="ranking"${td.ranking ? " checked" : ""}> ${esc(tr("tdRank"))}</label></div>
  </div>`;
}
function igRow(g = {}) {
  return `<div class="sub ig-ed">
    <div class="row"><input class="inp" data-k="title" placeholder="${esc(tr("igTitle"))}" value="${esc(g.title || "")}" style="flex:1"><button type="button" class="btn small" data-rm>${esc(tr("remove"))}</button></div>
    <textarea data-k="text" placeholder="${esc(tr("igText"))}" style="margin-top:6px">${esc(g.text || "")}</textarea>
  </div>`;
}
function openEditor(id) {
  editing = id;
  const e = id ? byId(id) : { emoji: "📅", en: "", zh: "", start: isoDay(utcDay(Date.now())), every: 7, days: 1, guide: "", note: "", todo: [], ingame: [] };
  $("edTitle").textContent = tr(id ? "editEv" : "newEv");
  $("edEmoji").value = e.emoji || ""; $("edName").value = nm(e);
  const fixed = !!(e.start && e.every > 0);
  $("edFixed").checked = fixed; $("edSched").hidden = !fixed;
  $("edStart").value = e.start || isoDay(utcDay(Date.now())); showStart(); $("edEvery").value = e.every || 7; $("edDays").value = e.days || 1;
  $("edNote").value = noteOf(e);
  $("edGuide").innerHTML = `<option value="">${esc(tr("noGuide"))}</option>` + Object.entries(GUIDE_LIST).map(([k, g]) => `<option value="${k}">${g.e} ${esc(nm(g))}</option>`).join("");
  $("edGuide").value = e.guide || "";
  $("edTodos").innerHTML = (e.todo || []).map(todoRow).join("");
  $("edIgs").innerHTML = (e.ingame || []).map(igRow).join("");
  $("edDel").hidden = !id; $("edMsg").textContent = "";
  $("editor").hidden = false; $("editor").scrollTop = 0;
}
/* first day: typed as YYYY-MM-DD (so it never shows in the phone's own language); 📅 opens the phone's date picker */
function showStart() {
  const v = $("edStart").value.trim(), ok = /^\d{4}-\d\d-\d\d$/.test(v) && !isNaN(dayMs(v));
  $("edStartTxt").textContent = ok ? fmt(dayMs(v)) : "";
}
$("edStart").oninput = showStart;
$("edPick").onclick = () => {
  const p = $("edPicker"); if (/^\d{4}-\d\d-\d\d$/.test($("edStart").value)) p.value = $("edStart").value;
  try { p.showPicker(); } catch (e) { p.focus(); p.click(); }
};
$("edPicker").onchange = () => { if ($("edPicker").value) { $("edStart").value = $("edPicker").value; showStart(); } };
$("edFixed").onchange = () => { $("edSched").hidden = !$("edFixed").checked; };
$("edAddTodo").onclick = () => $("edTodos").insertAdjacentHTML("beforeend", todoRow({ due: -1 }));
$("edAddIg").onclick = () => $("edIgs").insertAdjacentHTML("beforeend", igRow());
$("editor").addEventListener("click", (ev) => { const r = ev.target.closest("[data-rm]"); if (r) r.closest(".sub").remove(); });
$("edCancel").onclick = () => { $("editor").hidden = true; };
function readEditor() {
  const e = editing ? { ...byId(editing) } : {};
  // only the page language is edited; the other language's text is kept as it was
  const other = lang === "en" ? "zh" : "en";
  const was = nm(e);
  e.emoji = $("edEmoji").value.trim(); const name = $("edName").value.trim();
  if (!name) throw new Error(tr("needName"));
  if (name !== was || e[lang]) e[lang] = name;   // pt: an untouched built-in name stays a display-only translation
  if (!e[other]) e[other] = name;
  if ($("edFixed").checked) {
    e.start = $("edStart").value.trim(); e.every = Math.round(+$("edEvery").value); e.days = Math.round(+$("edDays").value);
    if (!/^\d{4}-\d\d-\d\d$/.test(e.start) || isNaN(dayMs(e.start)) || !(e.every > 0) || !(e.days > 0)) throw new Error(tr("needSched"));
  } else { e.start = ""; e.every = 0; e.days = 0; }
  const nv = $("edNote").value.trim();
  if (nv !== noteOf(e)) e[NOTE_KEY()] = nv;
  e.guide = $("edGuide").value;
  e.todo = [...ROOT.querySelectorAll("#edTodos .todo-ed")].map((r) => {
    const g = (k) => r.querySelector(`[data-k="${k}"]`);
    const t = g("txt"), v = t.value.trim();
    let o = { due: Math.round(+g("due").value || 0) };
    if (v === (t.dataset.orig || "")) { const k = JSON.parse(t.dataset.keep || "{}"); for (const l of OFFICER_LANGS) if (k[l]) o[l] = k[l]; if (!OFFICER_LANGS.some((l) => o[l])) o[lang] = v; }
    else o[lang] = v;   // edited → the other languages just show this text (no translation needed)
    if (g("post").checked) o.post = 1; if (g("ranking").checked) o.ranking = 1;
    const u = parseInt(g("until").value, 10); if (u >= 1 && u <= 24) o.until = u;
    return o;
  }).filter((o) => OFFICER_LANGS.some((l) => o[l]));
  e.ingame = [...ROOT.querySelectorAll("#edIgs .ig-ed")].map((r) => ({ title: r.querySelector('[data-k="title"]').value.trim(), text: r.querySelector('[data-k="text"]').value.replace(/\r/g, "").trimEnd() })).filter((g) => g.text);
  if (!e.id) { const base = (e.en || "event").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event"; let id = base, n = 2; while (byId(id)) id = base + "-" + n++; e.id = id; }
  return e;
}
$("edSave").onclick = async () => {
  let e; try { e = readEditor(); } catch (err) { $("edMsg").textContent = err.message; return; }
  const next = editing ? LIST.map((x) => (x.id === editing ? e : x)) : [...LIST, e];
  if (await saveList(next, `${editing ? "Edit" : "Add"} event: ${e.en || e.zh}`)) { $("editor").hidden = true; render(); openEvent(e.id); }
};
$("edDel").onclick = async () => {
  if (!editing || !confirm(tr("confirmDel"))) return;
  const name = evName(editing);
  if (await saveList(LIST.filter((x) => x.id !== editing), `Delete event: ${name}`)) { $("editor").hidden = true; render(); }
};

/* ===== GitHub (same key and password as the Post tab) ===== */
const { b64ToUtf8, utf8ToB64 } = OFFICER.util;
const gh = (method, path, body, token = TOKEN) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
let POST_KEY_BLOB = null;   // post-key.json as read by the password check, reused here (one download instead of two)
async function loadToken() {
  try {
    const blob = POST_KEY_BLOB || await (await fetch("data/post-key.json?t=" + Date.now(), { cache: "no-store" })).json();
    const dec = (b) => Uint8Array.from(atob(b.replace(/\s/g, "")), (c) => c.charCodeAt(0));
    const key = await OfficerData.pbkdf(OFFICER_PW, blob.salt, blob.iter, ["decrypt"]);
    TOKEN = new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: dec(blob.iv) }, key, dec(blob.data)));
  } catch (e) { TOKEN = null; }
}
async function saveList(next, message) {
  const m = $("saveMsg"), em = $("edMsg");
  if (!TOKEN) { em.textContent = tr("noKey"); return false; }
  em.textContent = ""; m.className = "msg"; m.textContent = tr("saving");
  const sched = {};
  for (const e of next) if (e.start && e.every > 0 && e.days > 0) sched[e.id] = { anchor: e.start, periodDays: e.every, activeDays: e.days };
  const file = { v: 1, updated: new Date().toISOString(), sched, data: await OfficerData.seal({ events: next, timed: TIMED }) };
  try {
    const r = await gh("PUT", EV_PATH, { message: message.slice(0, 120), content: utf8ToB64(JSON.stringify(file, null, 1) + "\n"), sha: FILE_SHA || undefined, branch: BRANCH });
    FILE_SHA = r && r.content ? r.content.sha : FILE_SHA;
    LIST = next; OfficerData.cacheSet("events", next); m.className = "msg okmsg"; m.textContent = tr("saved"); return true;
  } catch (err) {
    const k = err.message === "auth" ? "errAuth" : err.message === "busy" ? "errBusy" : "errNet";
    m.className = "msg warn"; m.textContent = tr(k); em.textContent = tr(k); return false;
  }
}

function applyTexts() {
  document.documentElement.lang = HTML_LANG(lang);
  ROOT.querySelectorAll("[data-t]").forEach((el) => { const v = tr(el.dataset.t); if (/UTC/.test(v)) el.innerHTML = localTimes(esc(v), lang); else el.textContent = v; });
  if ($("anGen")) { $("anGen").textContent = tr("anGen"); $("anCopy").textContent = tr("anCopy"); }
}
function setLang(l) { lang = l; store.lang = lang; save(); applyTexts(); if (LIST) render(); };
$("nextW").onclick = () => { weekStart = mondayOf(Date.now()) + 7 * DAY; render(); };
$("thisW").onclick = () => { weekStart = mondayOf(Date.now()); render(); };
/* ===== 📣 announcement draft: "UPCOMING KEY EVENTS" from the event list + our times (the game allows 300 characters) ===== */
const AN_SKIP = new Set(["bear-hunt", "mystic-trial", "alliance-rules"]);   // every-other-day / no fixed date → not news
const AN_FOOT = "\n\nFull Guides:\n• Website: https://tinyurl.com/NXS2189\n• Discord: https://discord.gg/5RakbEK5RS";
const WDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const anHour = (t) => { const [h, m] = t.split(":"); return +m ? `${+h}:${m}` : String(+h); };
let anOn = null;   // event ids ticked for the draft (null = defaults)
function anRuns(nDays) {
  const today = utcDay(Date.now()), end = today + nDays * DAY, out = [];
  for (const r of runs(today, end)) { if (AN_SKIP.has(r.k) || r.en <= today || out.some((x) => x.k === r.k)) continue; out.push(r); }
  return out;
}
const anName = (k) => { const e = byId(k) || {}; return e.en || (EVENTS[k] || {}).en || k; };
function anLine(r) { return `• ${anName(r.k)}: ${anWhen(r)}.`; }
function anWhen(r) {
  const T = ET[r.k] || [], td = (ET.timeDays || {})[r.k], fd = (ET.days || {})[r.k];
  const wd = (t) => WDAY[new Date(t).getUTCDay()];
  let when;
  if (T.length && td) when = T.map((t, i) => [t, td[i]]).sort((a, b) => a[1] - b[1]).map(([t, d]) => `${wd(r.st + (d - 1) * DAY)} ${anHour(t)} UTC`).join(" & ");
  else if (T.length && T.length <= 2 && (fd > 0 || r.days === 1)) when = `${wd(r.st + ((fd > 0 ? fd : 1) - 1) * DAY)} ${T.map(anHour).join(" & ")} UTC`;
  else when = r.days > 1 ? `${wd(r.st)}–${wd(r.en - DAY)}` : wd(r.st);   // many time slots (Eternity's Reach): just the day
  return when;
}
/* 📣 on a to-do card: a single-event reminder (one event, its days and our times) to paste in game */
function anOne(k, st) {
  const r = runs(st, st + DAY).find((x) => x.k === k && x.st === st) || anRuns(7).find((x) => x.k === k); if (!r) return;
  const md = (t) => { const d = new Date(t); return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`; };
  const dates = r.days > 1 ? `${md(r.st)} – ${md(r.en - DAY)}` : md(r.st);
  let when = anWhen(r); const T = ET[k] || []; if (T.length && !/UTC/.test(when)) when += ` — ${T.map(anHour).join(", ")} UTC`;   // many slots: list them all here
  $("anText").value = `📢 ${anName(k).toUpperCase()}\n\n${dates}: ${when}.` + AN_FOOT; anCount();
  $("anCard").open = true; $("anCard").scrollIntoView({ block: "start", behavior: "smooth" }); $("anText").focus();
}
function anMake(nDays) {
  const today = utcDay(Date.now()), rs = anRuns(nDays);
  // default: events that start in this window (long ones already running are off) — tick / untick above
  if (!anOn) {   // default: events that start in this window, as many as fit in 300 characters (long ones already running are off)
    anOn = new Set(); const len = () => [..."UPCOMING KEY EVENTS\n\n" + rs.filter((r) => anOn.has(r.k)).map(anLine).join("\n") + AN_FOOT].length;
    for (const r of rs) if (r.st >= today) { anOn.add(r.k); if (len() > 300) anOn.delete(r.k); }
  }
  $("anPick").innerHTML = rs.map((r) => { const e = byId(r.k) || EVENTS[r.k] || {}; return `<label class="row" style="gap:4px;font-size:13px;display:inline-flex;margin:2px 8px 2px 0"><input type="checkbox" data-anpick="${esc(r.k)}"${anOn.has(r.k) ? " checked" : ""}> ${esc((e.emoji || "") + " " + (nm(e) || r.k))}</label>`; }).join("");
  anGuides(rs);
  const lines = rs.filter((r) => anOn.has(r.k)).map(anLine);
  return "UPCOMING KEY EVENTS\n\n" + (lines.length ? lines.join("\n") : "•") + AN_FOOT;
}
/* 📋 the ticked events' in-game guides, pulled up under the draft: tick the messages (or parts) you want and add them to the text */
let anIgOpen = null;
function anGuides(rs) {
  let box = $("anGuides"); if (!box) { box = document.createElement("div"); box.id = "anGuides"; box.style.marginTop = "6px"; $("anPick").after(box); }
  const evs = rs.filter((r) => anOn.has(r.k)).map((r) => byId(r.k)).filter((e, i, a) => e && (e.ingame || []).length && a.indexOf(e) === i);
  if (!evs.length) { box.innerHTML = ""; return; }
  if (anIgOpen && !evs.some((e) => e.id === anIgOpen)) anIgOpen = null;
  box.innerHTML = `<div class="muted" style="font-size:12.5px;margin-bottom:4px">${esc(tr("anGuides"))}</div><div class="row" style="gap:6px;flex-wrap:wrap">${evs.map((e) => `<button type="button" class="btn small${anIgOpen === e.id ? " primary" : ""}" data-anig="${esc(e.id)}">📋 ${esc((e.emoji || "") + " " + nm(e))}</button>`).join("")}</div>`
    + (anIgOpen ? `<div class="an-ig" style="margin-top:6px;padding:8px 10px;border:1px solid var(--rule);border-radius:10px">${byId(anIgOpen).ingame.map((g, i) => `<label style="display:block;margin:4px 0;font-size:13px"><input type="checkbox" data-anigm="${i}"> <b>${esc(g.title || tr("anMsg", { n: i + 1 }))}</b> <span class="muted">· ${[...(g.text || "")].length}</span><pre style="white-space:pre-wrap;margin:2px 0 0 22px;font:inherit;font-size:12.5px;color:var(--text-muted)">${esc(g.text || "")}</pre></label>`).join("")}<button type="button" class="btn small primary" data-anigadd="1" style="margin-top:4px">${esc(tr("anAdd"))}</button></div>` : "");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("#anGuides [data-anig], #anGuides [data-anigadd]"); if (!b) return;
  e.preventDefault();
  if (b.dataset.anig) { anIgOpen = anIgOpen === b.dataset.anig ? null : b.dataset.anig; anGuides(anRuns(+$("anDays").value || 3)); return; }
  const picked = [...document.querySelectorAll("#anGuides [data-anigm]:checked")].map((c) => (byId(anIgOpen).ingame[+c.dataset.anigm] || {}).text || "").filter(Boolean);
  if (!picked.length) return;
  const t = $("anText"); t.value = t.value.replace(/\s+$/, "") + "\n\n" + picked.join("\n\n"); anCount(); t.focus();
});
function anCount() { const n = [...$("anText").value].length, c = $("anCount"); c.textContent = tr(n > 300 ? "anOver" : "anCount", { n }); c.style.color = n > 300 ? "#b3261e" : ""; }
function anFill() { $("anText").value = anMake(+$("anDays").value || 3); anCount(); }
$("anDays").innerHTML = [3, 5, 7].map((n) => `<option value="${n}">${esc(tr("anDays", { n }))}</option>`).join("");
$("anCard").addEventListener("toggle", () => { if ($("anCard").open && !$("anText").value) anFill(); });
$("anGen").onclick = anFill; $("anDays").onchange = () => { anOn = null; anFill(); };
$("anPick").addEventListener("change", (e) => { const k = e.target.dataset.anpick; if (!k) return; if (e.target.checked) anOn.add(k); else anOn.delete(k); anFill(); }); $("anText").oninput = anCount;
$("anCopy").onclick = (e) => copyText($("anText").value, e.target);
$("addEv").onclick = () => openEditor(null);
// On Sunday, open on next week (that's when the weekly planning happens)
function defaultWeek() { const now = Date.now(); const m = mondayOf(now); return new Date(utcDay(now)).getUTCDay() === 0 ? m + 7 * DAY : m; }

/* ===== troop limits shown in the guides ({=bear} / {=rally}) → data/limits.json (plain, public) ===== */
const LIM_PATH = "data/limits.json";
let LIM = { bear: 90000, rally: 70080 }, limSha = null;
async function loadLimits() {
  try {
    if (TOKEN) { const f = await gh("GET", LIM_PATH); if (f) { limSha = f.sha; LIM = { ...LIM, ...JSON.parse(b64ToUtf8(f.content)) }; } }
    else { const r = await fetch(LIM_PATH + "?t=" + Date.now(), { cache: "no-store" }); if (r.ok) LIM = { ...LIM, ...(await r.json()) }; }
  } catch (e) {}
  $("limBear").value = LIM.bear; $("limRally").value = LIM.rally;
}
async function saveLimits() {
  const m = $("limMsg"), b = parseInt($("limBear").value, 10), r = parseInt($("limRally").value, 10);
  if (!(b > 0) || !(r > 0)) { m.className = "msg warn"; m.textContent = tr("limBad"); return; }
  if (!TOKEN) { m.className = "msg warn"; m.textContent = tr("limNoKey"); return; }
  m.className = "msg"; m.textContent = tr("limSaving");
  const next = { bear: b, rally: r };
  try {
    for (let attempt = 0; ; attempt++) {
      try { const res = await gh("PUT", LIM_PATH, { message: `Troop limits: Bear Hunt ${b}, rallies ${r}`, content: utf8ToB64(JSON.stringify(next) + "\n"), sha: limSha || undefined, branch: BRANCH });
        limSha = res && res.content ? res.content.sha : limSha; break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; const f = await gh("GET", LIM_PATH); limSha = f ? f.sha : null; }
    }
    LIM = next; m.className = "msg okmsg"; m.textContent = tr("limSaved");
  } catch (e) { m.className = "msg warn"; m.textContent = tr(e.message === "auth" ? "limNoKey" : "limErr"); }
}
/* ===== our event times (UTC) → data/event-times.json (plain, public): home page Today card + everyone's ⏰ reminders ===== */
const ET_PATH = "data/event-times.json";
const ET_KEYS = [["bear-hunt", "🐻"], ["swordland-showdown", "⚔️"], ["tri-alliance-clash", "🔱"], ["viking-vengeance", "🧯"], ["cesares-fury", "🗡️"], ["eternity-reach", "⛏️"]];
let ET = { "bear-hunt": ["13:00", "22:00"], "swordland-showdown": ["02:00", "14:00"], "tri-alliance-clash": ["14:00", "21:00"], "viking-vengeance": ["14:00", "23:00"], "cesares-fury": ["22:35"], "eternity-reach": ["03:00", "05:00", "11:00", "14:00", "16:00", "18:00"],
  days: { "swordland-showdown": 7, "tri-alliance-clash": 6, "viking-vengeance": 3, "cesares-fury": 1 } }, etSha = null;
async function loadEventTimes() {
  try {
    if (TOKEN) { const f = await gh("GET", ET_PATH); if (f) { etSha = f.sha; ET = { ...ET, ...JSON.parse(b64ToUtf8(f.content)) }; } }
    else { const r = await fetch(ET_PATH + "?t=" + Date.now(), { cache: "no-store" }); if (r.ok) ET = { ...ET, ...(await r.json()) }; }
  } catch (e) {}
  $("etGrid").innerHTML = ET_KEYS.map(([k, e]) => {
    const len = (LIST && byId(k) && byId(k).days) || (EVENTS[k] && EVENTS[k].days) || { "swordland-showdown": 7, "tri-alliance-clash": 6, "viking-vengeance": 3, "cesares-fury": 3 }[k] || 1, cur = (ET.days || {})[k];
    const td = (ET.timeDays || {})[k];   // each time on its own day: shown as 22:00@1, 13:00@3
    const val = td ? (ET[k] || []).map((t, i) => [t, td[i]]).sort((a, b) => a[1] - b[1]).map(([t, d]) => t + "@" + d).join(", ") : (ET[k] || []).join(", ");
    const day = td ? `<span class="et-sub">${esc(tr("etPerDay"))}</span>` : k === "bear-hunt" ? `<span class="et-sub">${esc(tr("etBearNext"))}</span><input class="inp" type="date" data-etbear>` : `<span class="et-sub">${esc(tr("etDayLbl"))}</span><select class="inp" data-etday="${k}">${Array.from({ length: len }, (_, i) => `<option value="${i + 1}"${cur === i + 1 ? " selected" : ""}>${esc(tr("etDay").replace("{n}", i + 1).replace("{t}", len))}</option>`).join("")}<option value="0"${cur === 0 ? " selected" : ""}>${esc(tr("etDayAll"))}</option></select>`;
    return `<label><span>${e} ${esc((EVENTS[k] && nm(EVENTS[k])) || (k === "bear-hunt" ? (lang === "zh" ? "狩獵巨熊（每個熊日）" : ptOf("Bear Hunt (every Bear day)")) : k))}</span><input class="inp" data-et="${k}" value="${esc(val)}" inputmode="numeric" placeholder="13:00, 22:00">${day}</label>`; }).join("");
  etBearFill();
  if (LIST && $("evList")) renderList();
}
/* the next Bear Hunt day (UTC), from Bear Hunt's schedule on this tab */
function etBearNext() {
  const b = LIST && byId("bear-hunt");
  if (!b || !b.start || !(b.every > 0)) return "";
  const s = dayMs(b.start), today = utcDay(Date.now());
  if (today <= s) return b.start;
  const k = Math.floor((today - s) / DAY / b.every), last = s + k * b.every * DAY;
  return isoDay(today - last < (b.days || 1) * DAY ? last : last + b.every * DAY);
}
function etBearFill() {
  const el = $("etGrid") && $("etGrid").querySelector("[data-etbear]");
  if (!el || el === document.activeElement || el.dataset.touched) return;
  const v = etBearNext(); el.value = v; el.dataset.was = v; el.disabled = !v;
  el.oninput = () => (el.dataset.touched = "1");
}
async function saveEventTimes() {
  const m = $("etMsg"), next = {};
  for (const inp of $("etGrid").querySelectorAll("[data-et]")) {
    const parts = inp.value.replace(/\s*@\s*/g, "@").split(/[,，\s]+/).filter(Boolean), out = [];
    for (const p of parts) { const x = p.match(/^(\d{1,2})(?::(\d{2}))?(?:@(\d{1,2}))?$/); if (!x || +x[1] > 23 || +(x[2] || 0) > 59 || (x[3] != null && +x[3] < 1)) { m.className = "msg warn"; m.textContent = tr("etBad"); return; }
      out.push([String(+x[1]).padStart(2, "0") + ":" + (x[2] || "00"), x[3] != null ? +x[3] : null]); }
    if (!out.length) { m.className = "msg warn"; m.textContent = tr("etBad"); return; }
    out.sort((a, b) => a[0].localeCompare(b[0]));
    next[inp.dataset.et] = out.map((o) => o[0]);
    // "13:00@3" = that time only on day 3 of the event (Viking: two battles on different days)
    if (out.some((o) => o[1] != null)) { const sel = $("etGrid").querySelector(`[data-etday="${inp.dataset.et}"]`), d0 = sel ? +sel.value || 1 : 1; (next.timeDays = next.timeDays || {})[inp.dataset.et] = out.map((o) => o[1] ?? d0); }
  }
  next.days = {};
  for (const sel of $("etGrid").querySelectorAll("[data-etday]")) next.days[sel.dataset.etday] = +sel.value;
  if (!TOKEN) { m.className = "msg warn"; m.textContent = tr("limNoKey"); return; }
  m.className = "msg"; m.textContent = tr("limSaving");
  try {
    for (let attempt = 0; ; attempt++) {
      try { const res = await gh("PUT", ET_PATH, { message: "Event times: " + Object.entries(next).filter(([k]) => k !== "days").map(([k, v]) => k + " " + v.join("/") + (next.days[k] ? " (day " + next.days[k] + ")" : next.days[k] === 0 ? " (every day)" : "")).join(", "), content: utf8ToB64(JSON.stringify(next) + "\n"), sha: etSha || undefined, branch: BRANCH });
        etSha = res && res.content ? res.content.sha : etSha; break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; const f = await gh("GET", ET_PATH); etSha = f ? f.sha : null; }
    }
    ET = next; m.className = "msg okmsg"; m.textContent = tr("etSaved");
    // Bear Hunt moved to another day: restart its schedule from the new date (home page, calendar, to-dos and ⏰ reminders all follow)
    const bd = $("etGrid").querySelector("[data-etbear]"), b = LIST && byId("bear-hunt");
    if (bd && b && bd.value && bd.value !== bd.dataset.was) {
      const moved = LIST.map((e) => (e.id === "bear-hunt" ? { ...e, start: bd.value } : e));
      if (await saveList(moved, "Bear Hunt moved: next Bear day " + bd.value)) { delete bd.dataset.touched; bd.dataset.was = bd.value; render(); m.textContent = tr("etSaved") + " " + tr("etBearMoved").replace("{d}", fmt(dayMs(bd.value))).replace("{e}", b.every); }
      else { m.className = "msg warn"; m.textContent = tr("errNet"); }
    } else if (LIST) renderList();
  } catch (e) { m.className = "msg warn"; m.textContent = tr(e.message === "auth" ? "limNoKey" : "limErr"); }
}
async function init() {
  applyTexts();
  OFFICER_PW = OFFICER.pw; TOKEN = OFFICER.token;
  loadLimits(); $("limSave").onclick = saveLimits;
  loadEventTimes(); $("etSave").onclick = saveEventTimes;
  // 0) the copy remembered in this tab (from an earlier visit) is shown right away …
  importTimed();   // ⏱️ a link with timed reminders (kept even when the saved list is unchanged)
  const remembered = OfficerData.cacheGet("events");
  if (remembered) { LIST = seedTodos(remembered); $("ev_app").hidden = false; if (weekStart === null) weekStart = defaultWeek(); render(); }
  // 1) … then the saved list (fresh copy from GitHub when the key works, otherwise the site's copy)
  let file = null, fresh = null;
  try {
    if (TOKEN) { const f = await gh("GET", EV_PATH); if (f) { FILE_SHA = f.sha; file = JSON.parse(b64ToUtf8(f.content)); } }
    else { const r = await fetch(EV_PATH + "?t=" + Date.now(), { cache: "no-store" }); if (r.ok) file = await r.json(); }
    if (file && file.data) { const d = await OfficerData.open(file.data); fresh = d && d.events; if (d && Array.isArray(d.timed) && !timedDirty) { TIMED = d.timed; try { localStorage.setItem(TIMED_LS, JSON.stringify(TIMED)); } catch (e) {} } }
  } catch (e) { fresh = null; }
  if (fresh) {
    OfficerData.cacheSet("events", fresh);
    if (remembered && JSON.stringify(seedTodos(fresh)) === JSON.stringify(LIST)) return;   // nothing changed
    LIST = seedTodos(fresh);
  } else if (remembered) return;
  else LIST = null;
  // 2) nothing saved yet: start from the schedules already on the site
  if (!LIST) {
    let sched = null;
    try {
      const src = await fetch("js/app.js?t=" + Date.now(), { cache: "no-store" }).then((r) => r.text());
      const m = src.match(/const EVENT_SCHEDULES = (\{[\s\S]*?\n\});/);
      sched = m ? Function('"use strict";return (' + m[1] + ");")() : null;
    } catch (e) { sched = null; }
    if (!sched) { $("ev_noData").hidden = false; $("ev_noData").textContent = tr("noData"); return; }
    LIST = defaultList(sched);
  }
  $("ev_app").hidden = false;
  if (weekStart === null) weekStart = defaultWeek();   // a week the officer swiped to stays
  render();
}
// saved events without any to-do get the built-in ones once (todoSeed marks it, so deleting them later sticks)
function seedTodos(list) {
  // events added to the site after the list was saved (they carry their own default schedule)
  for (const [id, e] of Object.entries(EVENTS)) {
    if (e.start && !list.some((x) => x.id === id)) list.push({ id, emoji: e.emoji, en: e.en, zh: e.zh, start: e.start, every: e.every, days: e.days, guide: e.noGuide ? "" : (GUIDE_LIST[id] ? id : ""), note: e.note || "", ...(e.noteZh ? { noteZh: e.noteZh } : {}), todo: [], ingame: INGAME_DEFAULTS[id] || [] });
  }
  /* Bear Hunt moved from 11:00 to 13:00 UTC: fix the note in an already-saved list */
  for (const e of list) if (e.id === "bear-hunt") { if (e.note) e.note = e.note.replace("11:00 & 22:00", "13:00 & 22:00"); if (e.noteZh) e.noteZh = e.noteZh.replace("11:00 和 22:00", "13:00 和 22:00"); }
  /* KvK Battle phase only runs 12:00–22:00 UTC: its Castle Battle item shows on that day only, until 22:00 UTC */
  for (const td of ((list.find((x) => x.id === "kvk") || {}).todo || []))
    if (td.until == null && td.due === 5 && /Castle Battle|王城爭奪/.test((td.en || "") + (td.zh || ""))) td.until = 22;
  /* 📯 the game's Chinese name came later (崛起的號角, 黃金鑰匙 / 白銀鑰匙): fix an already-saved name / note that still has the placeholder */
  for (const e of list) if (e.id === "call-of-sovereign") { if (!e.zh || e.zh === "Call of the Sovereign") e.zh = EVENTS[e.id].zh; if (e.noteZh && /金鑰匙|白金/.test(e.noteZh) && !/黃金鑰匙/.test(e.noteZh)) e.noteZh = EVENTS[e.id].noteZh; }
  /* replace saved lists once with the newer built-in steps (todoV marks it, so later edits stick) */
  for (const e of list) { const p = TODO_PUSH[e.id]; if (p && e.todoV !== p[0]) { e.todo = p[1]().map((x) => ({ ...x })); e.todoV = p[0]; e.todoSeed = 1; } }
  for (const e of list) {
    if (e.todoSeed || (e.todo && e.todo.length)) continue;
    const d = TODO[e.id] || (EXTRA_EVENTS.find((x) => x.id === e.id) || {}).todo;
    if (d && d.length) { e.todo = d.map((x) => ({ ...x })); e.todoSeed = 1; }
  }
  return list;
}

OFFICER_PAGES.events = { init, applyTexts, setLang,
  ingame: (id) => { try { const e = byId(id); if (e && e.ingame) return e.ingame; } catch (x) {} return INGAME_DEFAULTS[id] || []; } };   // ⑤ battle table reads the Swordland chat map from here


})();
