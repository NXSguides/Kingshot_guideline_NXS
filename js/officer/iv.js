/* NXS officer page — 💎 Investment report (registers OFFICER_PAGES.iv; a 🔬 Research sub-tab, nobody by default, admins always).
   Sherry, 2026-11-04: where gems buy the most stat %, per role (rally leader / joiner). Our own research, still being tested:
   Sparrow's main account (power ↔ %, shop prices, research times) — Project docs claude/investment-efficiency-summary.md,
   claude/kingshot-upgrade-efficiency.md, claude/kvk-2026-11-data-plan.md, claude/mightpulse-stat-check.md. Not official.
   Read-only text, no member data. Names follow data/content.js GLOSSARY. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const UPDATED = "2026-11-04";
const MAX = 60000;
// Governor Charm, every level: [Charm Guides + Charm Designs needed, % gained] (Lethality + Health, one troop type). Shop: 500 Relic Coins each, 1 coin ≈ 3.2 gems.
const CHARM = [[10, 9], [55, 3], [100, 4], [180, 3], [300, 6], [420, 5], [540, 5], [600, 5], [700, 5], [840, 5], [980, 5],
  [1180, 4], [1390, 4], [1605, 4], [1825, 4], [2050, 4], [2280, 4], [2515, 4], [2755, 4], [3000, 4], [3250, 4], [3505, 4]];
// Governor Gear, every step: [tier, satin, gilded threads, artisan's vision, power after the step] (kingshotguide.com database, matches Sparrow's screenshots for Purple–Gold;
// Red T1★2 and up: power not published → +2.5% (to Red T2) / +2.75% (Red T3–T4) per step from the gear stat table). Shop: satin 1, thread 100, vision 500 Relic Coins. Power = 24,000 × % (Attack and Defense, one troop type).
const GEAR = [["g",1500,15,0,224400],["g",3800,40,0,306000],["b",7000,70,0,408000],["b",9700,95,0,510000],["b",1000,10,45,612000],["b",1000,10,50,714000],
  ["p",1500,15,60,816000],["p",1500,15,70,885360],["p",6500,65,40,954720],["p",8000,80,50,1024080],["p1",10000,95,60,1093440],["p1",11000,110,70,1162800],["p1",13000,130,85,1232160],["p1",15000,160,100,1301520],
  ["o",22000,220,40,1362720],["o",23000,230,40,1423920],["o",25000,250,45,1485120],["o",26000,260,45,1546320],["o1",28000,280,45,1607520],["o1",30000,300,55,1668720],["o1",32000,320,55,1729920],["o1",35000,340,55,1791120],
  ["o2",38000,390,55,1852320],["o2",43000,430,75,1913520],["o2",45000,460,80,1974720],["o2",48000,500,85,2040000],["o3",60000,600,120,2097120],["o3",70000,700,140,2158320],["o3",80000,800,160,2219520],["o3",90000,900,180,2280000],
  ["r",108000,1080,220,2340000],["r",114000,1140,230,2400000],["r",121000,1210,240,2460000],["r",128000,1280,250,2520000],["r1",154000,1540,300,2580000],["r1",163000,1630,320,2640000],["r1",173000,1730,340,2700000],["r1",183000,1830,360,2760000],
  ["r2",220000,2200,430,2820000],["r2",233000,2330,460,2880000],["r2",247000,2470,490,2940000],["r2",264000,2640,520,3000000],["r3",306000,3060,610,3066000],["r3",323000,3230,650,3132000],["r3",340000,3400,690,3198000],["r3",357000,3570,730,3264000],
  ["r4",412000,4120,840,3330000],["r4",433000,4330,890,3396000],["r4",454000,4540,940,3462000],["r4",475000,4750,990,3528000]];
const gearCoins = (i) => GEAR[i][1] + 100 * GEAR[i][2] + 500 * GEAR[i][3];
const gearPct = (i) => (GEAR[i][4] - (i ? GEAR[i - 1][4] : 0)) / 24000;
const gearGems = (i) => gearCoins(i) * 3.2 / (2 * gearPct(i));
const charmGems = (i) => CHARM[i][0] * 500 * 3.2 / (2 * CHARM[i][1]);   // gems per +1% to one stat of one troop type
// [key, low, high, kind] — gems per +1% (one troop type, one stat); kind colours the bar; past MAX the bar runs off the end (▶)
const ROWS = [["c1", 889, 889, "cheap"], ["gg1", 513, 10165, "cheap"], ["res1", 15, 850, "cheap"], ["res4", 1700, 4100, "cheap"], ["en1", 2400, 6200, "cheap"],
  ["mr", 3200, 29600, "mid"], ["ref", 5600, 20000, "mid"], ["mv", 3900, 37000, "mid"], ["res5", 6300, 15000, "mid"], ["hg1", 11100, 11100, "mid"], ["gg2", 12424, 44844, "mid"],
  ["c25", 14700, 20000, "mid"], ["adv", 4700, 67000, "mid"], ["en2", 15500, 55000, "mid"], ["hg2", 22200, 55600, "dear"], ["res6", 26000, 62000, "dear"], ["c6", 40000, 701000, "dear"], ["gg3", 40157, 840727, "dear"]];
const T = {
  en: { title: "💎 Investment", intro: "",
    badge: "🔬 Our research · updated {d}",
    heroH: "Same gems, very different results.", heroP: "The cheapest +1% (the first green Governor Gear step, Governor Charm Lv1) costs under 1,000 gems. Hero Gear Mastery Forging Lv5 costs about 56,000; red Governor Gear and the last charm levels cost 700,000–800,000 for the same 1%.",
    barH: "💰 Gems for +1%", barP: "Shorter bar = cheaper. Each bar is +1% to one stat of one troop type.",
    rows: { res1: "Research I–III", res4: "Research IV", res5: "Research V", res6: "Research VI", en1: "Hero Gear enhancement (XP) to +40", en2: "Hero Gear enhancement +60 → +100", mr: "Roman advancement 1st → 10th", mv: "Valora advancement 1st → 10th", c1: "Governor Charm 0 → Lv1", pet: "Pet level-up (Alliance Shop food, weekly limit)", res: "Research — first levels of each tier", hg1: "Hero Gear Mastery Forging 0 → 1", c25: "Governor Charm Lv2–3",
      adv: "Pet advancement", ref: "Pet Refinement", gg1: "Governor Gear — green and blue", gg2: "Governor Gear — purple (Epic, incl. T1)", gg3: "Governor Gear — gold and red", resl: "Research — last level of each tier", hg2: "Hero Gear Mastery Forging 1 → 5", c6: "Governor Charm Lv4–22" },
    gives: { res1: "all cheap", res4: "", res5: "", res6: "", en1: "only while that hero marches", en2: "only while that hero marches", mr: "Master Emblems; Attack + Defense, all troops", mv: "Master Emblems; Attack only, all troops", c1: "Lethality + Health, one troop type", pet: "Attack + Defense, all troops", res: "depends on the node (infantry Attack / Lethality cheapest)", hg1: "only while that hero is in the march", c25: "Lethality + Health, one troop type",
      adv: "Attack + Defense, all troops (Lv20 ≈ 4,700 · Lv30 9,600 · Lv40 14,200–18,100 · Lv50 23,200 · Lv60 41,600)", ref: "Common Taming Marks ≈ 5,600, Advanced ≈ 20,000 (tested on one pet only)", gg1: "Attack + Defense, one troop type", gg2: "Attack + Defense, one troop type", gg3: "every step dearer — see every step below", resl: "", hg2: "each level costs more (10 Forgehammers per level)", c6: "much more than everything else — see every level below" },
    chH: "💠 Governor Charms, every level", chP: "Gems for +1% at each level (taller = dearer; the scale grows ×10 per step). Lv1 is the cheapest thing in the game; from Lv2 a charm level costs about as much as pet advancement or Governor Gear; from Lv6 it is dearer than anything else on this page.",
    chTip: "So: every charm to Lv1 right away. Lv2–3 when you lack Lethality / Health on that troop type. Lv4 and up only after the cheaper upgrades are done — remember Lethality and Health are worth more per 1% (next card).",
    chCols: ["Level", "Guides + Designs", "% gained", "Total %", "Gems per 1%"],
    ggH: "🛡️ Governor Gear, every step", ggP: "Gems for +1% at each upgrade step of one piece, from the first green to Red T4 ★3 (taller = dearer; the scale grows ×10 per step). Green and blue are very cheap; purple about like pet advancement; from gold it climbs fast; red costs 10–40× purple.",
    ggTip: "So: get every piece to blue ★3 early, purple when you can. Gold and red only after charms Lv1–3, pets and research — unless you need the Deployment Capacity that red gear adds.",
    ggNote: "Materials: kingshotguide.com (purple–gold match our screenshots). Red T1 ★2 and up: power not published yet, worked out from the gear stat table. Red T5–T6: no data. Red Governor Gear is not open on our server yet.",
    ggG: "Green · Blue", ggP2: "Purple", ggO: "Gold (T1–T3)", ggR: "Red (T1–T4)",
    ggTier: { g: "Green", b: "Blue", p: "Purple", p1: "Purple T1", o: "Gold", o1: "Gold T1", o2: "Gold T2", o3: "Gold T3", r: "Red", r1: "Red T1", r2: "Red T2", r3: "Red T3", r4: "Red T4" },
    ggCols: ["Step", "Satin / Gilded Threads / Artisan's Vision", "Relic Coins", "% gained", "Gems per 1%"],
    ru1: "Every system is cheapest at its first levels.", ru2: "Keep upgrading whatever is cheapest right now — don't push one system to the top.", ru3: "Joiners: don't spend on combat stats — only the rally leader's count.",
    ruH: "📏 Price ruler", ruP: "Each dot is one level: cheap on the left, costly on the right (each step ×10).",
    rdTap: "Tap a dot for its price.", moreH: "📖 More: why, by role, pets, what we don't know", petH: "Pets",
    nxRes: "Research tier I'm on", nxMr: "Roman advancements done", nxMv: "Valora advancements done", roman: "Roman", valora: "Valora", nth: "#{n}",
    dirTip: "Done with the cheap levels everywhere (Charms Lv3, research tier V, Governor Gear Epic 3★, pets Lv50)? Then it's time to pick a direction.", dirLink: "🧭 When to pick a direction →", nxH: "🎯 My next step", nxP: "Pick where you are now:",
    nxCharm: "My Governor Charms (most pieces of each troop type)", troops: ["Infantry", "Cavalry", "Archers"], nxGear: "My Governor Gear (most pieces of each troop type)", nxPet: "My next pet advancement", nxMast: "Main heroes' Mastery Forging", nxEnh: "Enhancement of those main pieces", nxPetTip: "Pet level-ups: Pet Food is easy to get (Cheetah skill 200–500 a day, events, Alliance Shop), so level up whenever you can. Rarer pets give more troop Attack / Defense per level but also eat more food, so the food per +1% is about the same for every pet (Lynx / Bison are the thriftiest, ~0.8× a Lion). The real limit is the advancement every 10 levels (in the list) — and an N, R or SR pet at the same advancement is about equally good value. Pet Refinement is the biggest room left on a pet and it is all Lethality / Health: the pet's level caps the quality you can roll (Lv10 grey, Lv20 green, Lv30 blue, Lv40 purple, Lv50 mythic). Use Common Taming Marks up to blue, Advanced Taming Marks from blue → purple.",
    nxNone: "none yet", nxLv: "Lv{n}", nxPetDone: "already past Lv60", nxMax: "maxed", nxGo: "Do these first:", nxNote: "Same gems, most %. Lethality / Health (Governor Charms) are worth a bit more than they look, Attack / Defense (pets) a bit less.",
    sys: { pet: "🐾 Pets", ma: "🎓 Master advancement", en: "⚒️ Hero Gear enhancement", c: "💠 Governor Charm", g: "🛡️ Governor Gear", pu: "🐾 Pet level-up", pa: "🐾 Pet advancement", pr: "🐾 Pet Refinement", r: "🔬 Research", m: "🔨 Mastery Forging" },
    refN: "with Common Taming Marks", refA: "Advanced (Advanced Taming Marks)", resFirst: "first levels of a tier", resLast: "last level of a tier", petUp: "weekly food", from: "→",
    bdH: "🗂️ Price bands", bdP: "Every upgrade, sorted by how many gems +1% costs. Same row = about the same value for your gems.",
    bands: ["Very cheap (under 5,000)", "Cheap (5,000–15,000)", "Middle (15,000–30,000)", "Dear (30,000–60,000)", "Very dear (60,000+)"],
    detH: "📊 Each system, level by level",
    cheap: "best value", mid: "middle", dear: "most expensive",
    rot: "Every system gets dearer the higher you go — the first levels of each one are the bargains. So don't push one system to the top: keep upgrading whichever system's next step is cheapest right now.",
    lowH: "📉 Lethality and Health are worth more", lowP: "Most players have far less Lethality and Health than Attack and Defense. The lower a stat is, the more +1% changes it — so Governor Charms are even better than the bars show, and pets a little worse.",
    lowA: "Stat at 50%", lowB: "Stat at 300%", lowS: "+1% adds", lowFoot: "Value of +1% ≈ 1 ÷ (100 + current %)",
    rlH: "👑 Rally leaders", rlP: "Only the leader's own stats count in a rally. Spend in this order:",
    rl: ["Every Governor Charm to Lv1 and every Governor Gear piece to blue ★3 first — both very cheap.", "Research I–IV, Hero Gear enhancement up to about +40, the first Roman advancements and Pet advancement Lv20–30 — all cheap.", "Research V, main heroes\' Mastery Forging to Lv1, Pet Refinement with Common Taming Marks, Valora\'s first advancement.",
      "Then Governor Charm Lv2–3, Pet advancement Lv40–50, purple (Epic) Governor Gear, Mastery Forging Lv2, enhancement +60 and Advanced Taming Marks — about the same value; pick the stat and troop type you lack.", "Mastery Forging Lv3+, Governor Charm Lv4+, Research VI, enhancement +80 and up and gold Governor Gear cost the most — last."],
    rlTroop: "Which troop type: PvP — infantry Defense / Health, cavalry and archer Attack / Lethality. Bear Hunt — archers.",
    rlHero: "VIP combat stats (all troops): VIP9 Defense +10%, VIP10 Attack / Defense +12%, VIP11 Attack / Defense / Health +14%, VIP12 Attack / Defense / Lethality / Health +16% — the biggest single source. Owning these two heroes at full stars gives a bonus all the time. Only their own shards work (not general shards; from Hall of Governors top 10 and VIP packs), so this can't be priced in gems — if you are close to full stars, finish it (the talent only works at full stars):",
    amadeus: "Amadeus: all troops Lethality + Health +15%", helga: "Helga: all troops Attack + Defense +10%",
    joH: "🤝 Joiners", joP: "Your own combat stats don't count when you join someone's rally.",
    joYes: "Worth it", joYesL: ["Troop tier (Truegold / TG)", "Your first hero's top-right skill"],
    joNo: "Not for rallies", joNoL: ["Combat stats — they only help when you attack alone, defend your own city or get hit while gathering."],
    joIf: "If you still want to spend: Governor Charm Lv1 and the first research tiers give the most power per gem — and so the most Migrant Score (Swordland Showdown, kingdom rating). Charms, pets, research and Hero Gear count the same there.",
    unkH: "🟡 Not worked out yet", unks: ["Hero Exclusive Gear (Widgets): level L needs 5L Widgets, about 0.36–0.5 × L Widgets per 1% — cheap if you have the Champagne Fair (500 Fair Vouchers each), not priced in gems yet.", "Amadeus / Helga own shards: pack prices.", "Real-money packs (this uses Relic Coins and gems only).", "Pet active skills; Pet Refinement tested on one pet only."],
    numH: "🔢 For those who want the numbers", numP: "Exchange rate: 1 Relic Coin ≈ 3.2 gems (1 h speedup = 800 gems in the Gem Shop or 250 Relic Coins in the Swordland Shop; finishing research instantly is also ≈ 800 gems per hour). Another rate changes the numbers, not the order. \"+1%\" = one stat of one troop type; a stat for all three troop types counts as 3.",
    numCols: ["Upgrade", "Gems per 1%", "Gives"],
    foot: "Source: Sparrow's main account (power ↔ %, shop prices, research times). Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "💎 投資效率", intro: "",
    badge: "🔬 我們的研究 · 更新 {d}",
    heroH: "同樣的鑽石，花在哪裡差很多。", heroP: "最便宜的 +1%（第一件綠色領主裝備、領主寶石 Lv1）不到 1,000 鑽；英雄裝備專精鍛造 Lv5 大約 56,000 鑽；紅色領主裝備、寶石最後幾級，同樣 1% 要 70–80 萬鑽。",
    barH: "💰 +1% 要多少鑽石", barP: "長條越短越划算。每一條都是「一個兵種、一種屬性 +1%」。",
    rows: { res1: "研究 I–III 階", res4: "研究 IV 階", res5: "研究 V 階", res6: "研究 VI 階", en1: "英雄裝備強化（經驗）到 +40", en2: "英雄裝備強化 +60 → +100", mr: "羅曼進階 第 1 → 10 次", mv: "維拉進階 第 1 → 10 次", c1: "領主寶石 0 → Lv1", pet: "寵物升級（聯盟商店口糧，每週限量）", res: "研究——每階的前幾級", hg1: "英雄裝備專精鍛造 0 → 1", c25: "領主寶石 Lv2–3",
      adv: "寵物突破", ref: "寵物洗練", gg1: "領主裝備——綠色、藍色", gg2: "領主裝備——紫色（史詩，含 T1）", gg3: "領主裝備——金色、紅色", resl: "研究——每階最後一級", hg2: "英雄裝備專精鍛造 1 → 5", c6: "領主寶石 Lv4–22" },
    gives: { res1: "都很便宜", res4: "", res5: "", res6: "", en1: "只有那位英雄出戰時有效", en2: "只有那位英雄出戰時有效", mr: "大師徽記；全部隊 攻擊力＋防禦力", mv: "大師徽記；全部隊 只有攻擊力", c1: "單一兵種 殺傷力＋生命值", pet: "全部隊 攻擊力＋防禦力", res: "看節點（步兵攻擊力／殺傷力最便宜）", hg1: "只有那位英雄出戰時有效", c25: "單一兵種 殺傷力＋生命值",
      adv: "全部隊 攻擊力＋防禦力（Lv20 約 4,700・Lv30 9,600・Lv40 14,200–18,100・Lv50 23,200・Lv60 41,600）", ref: "普通馴化印記約 5,600、高級約 20,000（只測了一隻寵物）", gg1: "單一兵種 攻擊力＋防禦力", gg2: "單一兵種 攻擊力＋防禦力", gg3: "每一階越來越貴——每一階見下面", resl: "", hg2: "每級越來越貴（每級多 10 個鍛造錘）", c6: "比其他所有項目都貴很多——每一級見下面" },
    chH: "💠 領主寶石：每一級", chP: "每一級 +1% 要多少鑽（越高越貴；刻度每格 ×10）。Lv1 是全遊戲最划算的；Lv2 起每級大約跟寵物突破、領主裝備同級；Lv6 以上比這頁所有東西都貴。",
    chTip: "所以：寶石全部馬上開到 Lv1。那個兵種缺殺傷力／生命值時再升 Lv2–3。Lv4 以上等比較便宜的都升完再說——別忘了殺傷力、生命值每 1% 比較值錢（下一張卡）。",
    chCols: ["等級", "手冊＋圖紙", "加多少 %", "累計 %", "每 1%（鑽）"],
    ggH: "🛡️ 領主裝備：每一階", ggP: "一件裝備每升一階，+1% 要多少鑽（從第一階綠色到紅 T4 3★；越高越貴，刻度每格 ×10）。綠、藍非常便宜；紫色大約跟寵物突破同級；金色開始漲很快；紅色是紫色的 10–40 倍。",
    ggTip: "所以：每件先升到藍 3★，有餘力再升紫。金色、紅色等寶石 Lv1–3、寵物、研究都弄好再說——除非你需要紅裝才有的出征容量。",
    ggNote: "材料：kingshotguide.com（紫～金跟我們的截圖一致）。紅 T1 2★ 以上的實力網站還沒公布，是照裝備屬性表推算的。紅 T5–T6 沒有資料。紅色領主裝備我們伺服器目前還沒開放。",
    ggG: "綠・藍", ggP2: "紫", ggO: "金（T1–T3）", ggR: "紅（T1–T4）",
    ggTier: { g: "綠", b: "藍", p: "紫", p1: "紫 T1", o: "金", o1: "金 T1", o2: "金 T2", o3: "金 T3", r: "紅", r1: "紅 T1", r2: "紅 T2", r3: "紅 T3", r4: "紅 T4" },
    ggCols: ["階", "進貢綢緞／金絲線／設計圖紙", "聖契幣", "加多少 %", "每 1%（鑽）"],
    ru1: "每個系統都是前幾級最便宜。", ru2: "輪流升「現在最便宜的那一級」，不要一個系統衝到底。", ru3: "加入者不要把錢花在戰鬥屬性——集結只看隊長的。",
    ruH: "📏 價格尺", ruP: "每個點是一級：左邊便宜、右邊貴（每格 ×10）。",
    rdTap: "點一個點看價格。", moreH: "📖 更多：原因、依角色、寵物、還不知道的", petH: "寵物",
    nxRes: "我的研究在哪一階", nxMr: "羅曼已進階幾次", nxMv: "維拉已進階幾次", roman: "羅曼", valora: "維拉", nth: "第 {n} 次",
    dirTip: "便宜的都升完了嗎（寶石 Lv3、研究 V 階、領主裝備史詩 3★、寵物 Lv50）？那就該開始選方向了。", dirLink: "🧭 什麼時候該選方向 →", nxH: "🎯 我的下一步", nxP: "選你現在的進度：",
    nxCharm: "我的領主寶石（每個兵種大多在幾級）", troops: ["步兵", "騎兵", "弓兵"], nxGear: "我的領主裝備（每個兵種大多在哪一階）", nxPet: "我下一次寵物突破", nxMast: "主力英雄的專精鍛造", nxEnh: "那些主力裝備的強化等級", nxPetTip: "寵物升級：寵物口糧不難拿（獵豹技能每天 200–500、活動、聯盟商店），能升就升。稀有度越高，每級加的部隊攻防越多，但吃的口糧也越多，所以每 +1% 用的口糧每隻寵物都差不多（猞猁／野牛最省，約獅子的 0.8 倍）。真正卡住的是每 10 級一次的突破（有在上面排名）——同一級突破，N、R、SR 寵物的划算程度幾乎一樣。寵物洗練是寵物剩下最大的空間，而且全是殺傷力／生命值：寵物等級決定能洗到的最高品質（Lv10 灰、Lv20 綠、Lv30 藍、Lv40 紫、Lv50 傳說）。藍色以前用普通馴化印記，藍升紫以上用高級馴化印記。",
    nxNone: "還沒有", nxLv: "Lv{n}", nxPetDone: "已經超過 Lv60", nxMax: "已滿", nxGo: "先做這些：", nxNote: "同樣的鑽石換到最多 %。殺傷力、生命值（領主寶石）實際上比看起來更值錢一點，攻擊力、防禦力（寵物）稍微少一點。",
    sys: { pet: "🐾 寵物", ma: "🎓 大師進階", en: "⚒️ 英雄裝備強化", c: "💠 領主寶石", g: "🛡️ 領主裝備", pu: "🐾 寵物升級", pa: "🐾 寵物突破", pr: "🐾 寵物洗練", r: "🔬 研究", m: "🔨 專精鍛造" },
    refN: "普通洗練（普通馴化印記）", refA: "高級洗練（高級馴化印記）", resFirst: "每階前幾級", resLast: "每階最後一級", petUp: "每週口糧", from: "→",
    bdH: "🗂️ 價格帶", bdP: "所有升級照「+1% 要幾鑽」分成五層。同一層＝同樣的鑽石，效果差不多。",
    bands: ["很便宜（5,000 以下）", "便宜（5,000–15,000）", "中等（15,000–30,000）", "貴（30,000–60,000）", "很貴（60,000 以上）"],
    detH: "📊 各系統每一級",
    cheap: "最划算", mid: "中間", dear: "最貴",
    rot: "每個系統都是越升越貴，最划算的是每個系統的前幾級。所以不要一個系統衝到底，而是輪流升「現在各系統裡最便宜的那一級」。",
    lowH: "📉 殺傷力、生命值比較值錢", lowP: "大多數人的殺傷力、生命值都比攻擊力、防禦力低很多。屬性越低，多 1% 的感覺越明顯——所以領主寶石實際上比長條看起來更划算，寵物稍微差一點。",
    lowA: "屬性 50% 時", lowB: "屬性 300% 時", lowS: "+1% 等於變強", lowFoot: "+1% 的價值 ≈ 1 ÷（100 + 目前 %）",
    rlH: "👑 集結隊長", rlP: "集結只看隊長自己的屬性。照這個順序花：",
    rl: ["領主寶石全部先開到 Lv1、領主裝備每件先升到藍 3★——兩個都非常便宜。", "研究 I–IV 階、英雄裝備強化到 +40 左右、羅曼前幾次進階、寵物突破 Lv20–30——都很便宜。", "研究 V 階、主力英雄的專精鍛造升到 Lv1、用普通馴化印記洗練寵物、維拉第一次進階。",
      "接著是領主寶石 Lv2–3、寵物突破 Lv40–50、紫色（史詩）領主裝備、專精鍛造 Lv2、強化到 +60、高級馴化印記——效率差不多，挑自己缺的屬性和兵種。", "專精鍛造 Lv3 以上、領主寶石 Lv4 以上、研究 VI 階、強化 +80 以上、金色領主裝備最貴——放最後。"],
    rlTroop: "兵種優先：PvP——步兵防禦力／生命值、騎兵和弓兵攻擊力／殺傷力。狩獵巨熊——弓兵。",
    rlHero: "VIP 戰鬥屬性（全兵種）：VIP9 防禦力 +10%、VIP10 攻擊力／防禦力 +12%、VIP11 攻擊力／防禦力／生命值 +14%、VIP12 攻擊力／防禦力／殺傷力／生命值 +16%——單一來源最大。擁有這兩位滿星英雄就一直有加成；只能用他們的專屬碎片（通用碎片不行，來自總督殿堂前 10 名、VIP 禮包），所以沒辦法用鑽石算——快滿星的人優先補滿（天賦只在滿星生效）：",
    amadeus: "阿瑪迪斯：全部隊 殺傷力＋生命值 +15%", helga: "赫爾加：全部隊 攻擊力＋防禦力 +10%",
    joH: "🤝 加入者", joP: "加入別人的集結時，你自己的戰鬥屬性不算。",
    joYes: "值得投資", joYesL: ["兵等（黃金 TG）", "第一位英雄的右上技能"],
    joNo: "集結裡沒用", joNoL: ["戰鬥屬性——只有自己單打、守自己城、採集被打時才有用。"],
    joIf: "如果還是想花：同樣的鑽石，領主寶石 Lv1 和前幾階研究換到的實力最多，遷城分數（聖劍爭奪、王國評級）也最多。寶石、寵物、研究、英雄裝備在遷城分數裡的權重一樣。",
    unkH: "🟡 還沒算的", unks: ["英雄專屬裝備（零件）：第 L 級要 5L 個，每 1% 約 0.36–0.5 × L 個——有香檳市集（每個 500 市集商券）的話很划算，還沒換成鑽石。", "阿瑪迪斯／赫爾加專屬碎片的禮包價。", "真錢禮包（這裡只算聖契幣和鑽石）。", "寵物主動技能；寵物洗練只測了一隻。"],
    numH: "🔢 給想看數字的人", numP: "換算：1 聖契幣 ≈ 3.2 鑽（1 小時加速：鑽石商店 800 鑽、聖劍商店 250 聖契幣；研究立即完成也是約 800 鑽／小時）。換別的換算方式，數字會變，排序不變。「+1%」= 一個兵種、一種屬性；三個兵種一起加的屬性算 3 個。",
    numCols: ["升級項目", "每 1%（鑽）", "給什麼"],
    foot: "來源：Sparrow 主帳實測（實力 ↔ %、商店價格、研究時間）。不是遊戲官方說明，數字會隨更多測試修正。" },
  pt: { title: "💎 Eficiência de Investimento", intro: "",
    badge: "🔬 Nossa pesquisa · atualizado {d}",
    heroH: "Mesmas gemas, resultados bem diferentes.", heroP: "O +1% mais barato (o primeiro passo verde do Equipamento do Chefe, Talismã do Governador Lv1) custa menos de 1,000 gemas. M. em Forja Lv5 do Equipamento do Herói custa cerca de 56,000; Equipamento do Chefe vermelho e os últimos níveis do Talismã custam 700,000–800,000 pelo mesmo 1%.",
    barH: "💰 Gemas por +1%", barP: "Barra mais curta = mais barato. Cada barra é +1% em um atributo de um tipo de tropa.",
    rows: { res1: "Pesquisa I–III", res4: "Pesquisa IV", res5: "Pesquisa V", res6: "Pesquisa VI", en1: "Aprimoramento do Equipamento do Herói (XP) até +40", en2: "Aprimoramento do Equipamento do Herói +60 → +100", mr: "Avanço de Roman 1º → 10º", mv: "Avanço de Valora 1º → 10º", c1: "Talismã do Governador 0 → Lv1", pet: "Subir nível do Pet (comida da Loja da Aliança, limite semanal)", res: "Pesquisa — primeiros níveis de cada tier", hg1: "M. em Forja do Equipamento do Herói 0 → 1", c25: "Talismã do Governador Lv2–3",
      adv: "Avanço do Pet", ref: "Refinamento do Pet", gg1: "Equipamento do Chefe — verde e azul", gg2: "Equipamento do Chefe — roxo (Épico, incl. T1)", gg3: "Equipamento do Chefe — dourado e vermelho", resl: "Pesquisa — último nível de cada tier", hg2: "M. em Forja do Equipamento do Herói 1 → 5", c6: "Talismã do Governador Lv4–22" },
    gives: { res1: "tudo barato", res4: "", res5: "", res6: "", en1: "só quando esse herói marcha", en2: "só quando esse herói marcha", mr: "Emblemas Mestres; Ataque + Defesa, todas as tropas", mv: "Emblemas Mestres; só Ataque, todas as tropas", c1: "Letalidade + Vida, um tipo de tropa", pet: "Ataque + Defesa, todas as tropas", res: "depende do nó (Ataque / Letalidade da infantaria são os mais baratos)", hg1: "só quando esse herói está na marcha", c25: "Letalidade + Vida, um tipo de tropa",
      adv: "Ataque + Defesa, todas as tropas (Lv20 ≈ 4,700 · Lv30 9,600 · Lv40 14,200–18,100 · Lv50 23,200 · Lv60 41,600)", ref: "Marca de Domesticação Comum ≈ 5,600, Avançada ≈ 20,000 (testado em um só mascote)", gg1: "Ataque + Defesa, um tipo de tropa", gg2: "Ataque + Defesa, um tipo de tropa", gg3: "cada passo mais caro — veja cada passo abaixo", resl: "", hg2: "cada nível custa mais (10 Martelos de Forja por nível)", c6: "muito mais caro que todo o resto — veja cada nível abaixo" },
    chH: "💠 Talismãs do Governador, nível por nível", chP: "Gemas por +1% em cada nível (mais alto = mais caro; a escala cresce ×10 por marca). Lv1 é a coisa mais barata do jogo; a partir do Lv2 um nível de talismã custa quase o mesmo que o Avanço do Pet ou o Equipamento do Chefe; a partir do Lv6 é mais caro que tudo nesta página.",
    chTip: "Então: todos os talismãs no Lv1 logo. Lv2–3 quando faltar Letalidade / Vida nesse tipo de tropa. Lv4 ou mais só depois das melhorias mais baratas — lembre que Letalidade e Vida valem mais por 1% (próximo cartão).",
    chCols: ["Nível", "Guias + Designs", "% ganho", "% total", "Gemas por 1%"],
    ggH: "🛡️ Equipamento do Chefe, passo a passo", ggP: "Gemas por +1% em cada passo de melhoria de uma peça, do primeiro verde até Vermelho T4 ★3 (mais alto = mais caro; a escala cresce ×10 por marca). Verde e azul são muito baratos; roxo custa quase como o Avanço do Pet; a partir do dourado sobe rápido; vermelho custa 10–40× o roxo.",
    ggTip: "Então: leve cada peça a azul ★3 cedo, e a roxo quando puder. Dourado e vermelho só depois de Talismãs Lv1–3, mascotes e pesquisa — a não ser que você precise da Capacidade de Envio que o equipamento vermelho dá.",
    ggNote: "Materiais: kingshotguide.com (roxo–dourado batem com nossas capturas de tela). Vermelho T1 ★2 em diante: poder ainda não publicado, calculado pela tabela de atributos do equipamento. Vermelho T5–T6: sem dados. O Equipamento do Chefe vermelho ainda não abriu no nosso servidor.",
    ggG: "Verde · Azul", ggP2: "Roxo", ggO: "Dourado (T1–T3)", ggR: "Vermelho (T1–T4)",
    ggTier: { g: "Verde", b: "Azul", p: "Roxo", p1: "Roxo T1", o: "Dourado", o1: "Dourado T1", o2: "Dourado T2", o3: "Dourado T3", r: "Vermelho", r1: "Vermelho T1", r2: "Vermelho T2", r3: "Vermelho T3", r4: "Vermelho T4" },
    ggCols: ["Passo", "Cetim / Fios Dourados / Visão do Artesão", "Moedas de Relíquia", "% ganho", "Gemas por 1%"],
    ru1: "Todo sistema é mais barato nos primeiros níveis.", ru2: "Continue melhorando o que estiver mais barato agora — não leve um só sistema até o topo.", ru3: "Participantes: não gastem em atributos de combate — só os do líder do rally contam.",
    ruH: "📏 Régua de preços", ruP: "Cada ponto é um nível: barato à esquerda, caro à direita (cada passo ×10).",
    rdTap: "Toque num ponto para ver o preço.", moreH: "📖 Mais: por quê, por função, mascotes, o que não sabemos", petH: "Mascotes",
    nxRes: "Tier de pesquisa em que estou", nxMr: "Avanços de Roman feitos", nxMv: "Avanços de Valora feitos", roman: "Roman", valora: "Valora", nth: "{n}º",
    dirTip: "Já terminou os níveis baratos em tudo (Talismãs Lv3, pesquisa tier V, Equipamento do Chefe Épico 3★, mascotes Lv50)? Então é hora de escolher uma direção.", dirLink: "🧭 Quando escolher uma direção →", nxH: "🎯 Meu próximo passo", nxP: "Escolha onde você está agora:",
    nxCharm: "Meus Talismãs do Governador (a maioria das peças de cada tropa)", troops: ["Infantaria", "Cavalaria", "Arquearia"], nxGear: "Meu Equipamento do Chefe (a maioria das peças de cada tropa)", nxPet: "Meu próximo Avanço do Pet", nxMast: "M. em Forja dos heróis principais", nxEnh: "Aprimoramento dessas peças principais", nxPetTip: "Subir nível do Pet: Alimento para Pets é fácil de conseguir (habilidade da Chita 200–500 por dia, eventos, Loja da Aliança), então suba sempre que puder. Mascotes mais raros dão mais Ataque / Defesa das tropas por nível, mas também comem mais, então o alimento por +1% é quase o mesmo para todo mascote (Lince / Bisão são os mais econômicos, ~0.8× um Leão). O limite real é o avanço a cada 10 níveis (está na lista) — e um mascote N, R ou SR no mesmo avanço vale quase o mesmo. O Refinamento do Pet é o maior espaço que sobra num mascote, e é tudo Letalidade / Vida: o nível do mascote limita a qualidade que você pode tirar (Lv10 cinza, Lv20 verde, Lv30 azul, Lv40 roxo, Lv50 mítico). Use Marca de Domesticação Comum até azul, e Marca de Domesticação Avançada de azul → roxo.",
    nxNone: "nenhum ainda", nxLv: "Lv{n}", nxPetDone: "já passou do Lv60", nxMax: "no máximo", nxGo: "Faça isto primeiro:", nxNote: "Mesmas gemas, mais %. Letalidade / Vida (Talismãs do Governador) valem um pouco mais do que parecem, Ataque / Defesa (mascotes) um pouco menos.",
    sys: { pet: "🐾 Mascotes", ma: "🎓 Avanço do Mestre", en: "⚒️ Aprimoramento do Equip. de Herói", c: "💠 Talismã do Governador", g: "🛡️ Equipamento do Chefe", pu: "🐾 Subir nível do Pet", pa: "🐾 Avanço do Pet", pr: "🐾 Refinamento do Pet", r: "🔬 Pesquisa", m: "🔨 M. em Forja" },
    refN: "com Marca de Domesticação Comum", refA: "Avançado (Marca de Domesticação Avançada)", resFirst: "primeiros níveis de um tier", resLast: "último nível de um tier", petUp: "alimento semanal", from: "→",
    bdH: "🗂️ Faixas de preço", bdP: "Cada melhoria, ordenada pelo custo em gemas de +1%. Mesma linha = quase o mesmo valor pelas suas gemas.",
    bands: ["Muito barato (menos de 5,000)", "Barato (5,000–15,000)", "Médio (15,000–30,000)", "Caro (30,000–60,000)", "Muito caro (60,000+)"],
    detH: "📊 Cada sistema, nível por nível",
    cheap: "melhor custo", mid: "médio", dear: "mais caro",
    rot: "Todo sistema fica mais caro quanto mais alto você vai — os primeiros níveis de cada um são as pechinchas. Então não leve um só sistema até o topo: continue melhorando o sistema cujo próximo passo está mais barato agora.",
    lowH: "📉 Letalidade e Vida valem mais", lowP: "A maioria dos jogadores tem bem menos Letalidade e Vida do que Ataque e Defesa. Quanto mais baixo o atributo, mais +1% muda — então os Talismãs do Governador são ainda melhores do que as barras mostram, e os mascotes um pouco piores.",
    lowA: "Atributo em 50%", lowB: "Atributo em 300%", lowS: "+1% soma", lowFoot: "Valor de +1% ≈ 1 ÷ (100 + % atual)",
    rlH: "👑 Líderes de rally", rlP: "Num rally, só os atributos do próprio líder contam. Gaste nesta ordem:",
    rl: ["Todo Talismã do Governador no Lv1 e toda peça do Equipamento do Chefe em azul ★3 primeiro — os dois são muito baratos.", "Pesquisa I–IV, Aprimoramento do Equipamento do Herói até cerca de +40, os primeiros avanços de Roman e Avanço do Pet Lv20–30 — tudo barato.", "Pesquisa V, M. em Forja dos heróis principais até Lv1, Refinamento do Pet com Marca de Domesticação Comum, o primeiro avanço de Valora.",
      "Depois Talismã do Governador Lv2–3, Avanço do Pet Lv40–50, Equipamento do Chefe roxo (Épico), M. em Forja Lv2, aprimoramento +60 e Marca de Domesticação Avançada — valor parecido; escolha o atributo e a tropa que faltam.", "M. em Forja Lv3+, Talismã do Governador Lv4+, Pesquisa VI, aprimoramento +80 ou mais e Equipamento do Chefe dourado custam mais — por último."],
    rlTroop: "Qual tropa: PvP — Defesa / Vida da infantaria, Ataque / Letalidade da cavalaria e da arquearia. Caça ao Urso — arquearia.",
    rlHero: "Atributos de combate do VIP (todas as tropas): VIP9 Defesa +10%, VIP10 Ataque / Defesa +12%, VIP11 Ataque / Defesa / Vida +14%, VIP12 Ataque / Defesa / Letalidade / Vida +16% — a maior fonte única. Ter estes dois heróis com estrelas máximas dá um bônus o tempo todo. Só os fragmentos deles funcionam (não os Fragmentos Gerais; vêm do top 10 do Salão dos Governadores e de pacotes VIP), então não dá para calcular em gemas — se você está perto das estrelas máximas, termine (o talento só funciona com estrelas máximas):",
    amadeus: "Amadeus: todas as tropas Letalidade + Vida +15%", helga: "Helga: todas as tropas Ataque + Defesa +10%",
    joH: "🤝 Participantes", joP: "Seus próprios atributos de combate não contam quando você entra no rally de outra pessoa.",
    joYes: "Vale a pena", joYesL: ["Nível da tropa (Adamante / TG)", "A habilidade de cima à direita do seu primeiro herói"],
    joNo: "Não serve para rally", joNoL: ["Atributos de combate — só ajudam quando você ataca sozinho, defende sua própria cidade ou é atacado enquanto coleta."],
    joIf: "Se ainda quiser gastar: Talismã do Governador Lv1 e os primeiros tiers de pesquisa dão mais poder por gema — e por isso mais Pontuação de Migração (Confronto entre Espadas, avaliação do reino). Talismãs, mascotes, pesquisa e Equipamento do Herói contam igual ali.",
    unkH: "🟡 Ainda não calculado", unks: ["Equipamento Exclusivo do Herói (Ferramentas): o nível L pede 5L Ferramentas, cerca de 0.36–0.5 × L Ferramentas por 1% — barato se você tem a Feira do Champanhe (500 Vouchers da Feira cada), ainda não calculado em gemas.", "Fragmentos próprios de Amadeus / Helga: preços dos pacotes.", "Pacotes com dinheiro real (aqui só usamos Moedas de Relíquia e gemas).", "Habilidades ativas dos mascotes; Refinamento do Pet testado em um só mascote."],
    numH: "🔢 Para quem quer os números", numP: "Câmbio: 1 Moeda de Relíquia ≈ 3.2 gemas (1 h de aceleração = 800 gemas na loja de Gemas ou 250 Moedas de Relíquia na loja Terra das Espadas; terminar pesquisa na hora também é ≈ 800 gemas por hora). Outro câmbio muda os números, não a ordem. \"+1%\" = um atributo de um tipo de tropa; um atributo para os três tipos de tropa conta como 3.",
    numCols: ["Melhoria", "Gemas por 1%", "Dá"],
    foot: "Fonte: conta principal da Sparrow (poder ↔ %, preços das lojas, tempos de pesquisa). Não vem do jogo. Os números serão corrigidos conforme testarmos mais." },
  ar: { title: "💎 كفاءة الاستثمار", intro: "",
    badge: "🔬 بحثنا · آخر تحديث {d}",
    heroH: "نفس الجواهر، نتائج مختلفة جدًا.", heroP: "أرخص +1% (أول خطوة خضراء في عتاد الحاكم، تميمة الحاكم Lv1) تكلف أقل من 1,000 جوهرة. صقل التخصص Lv5 لعتاد البطل يكلف حوالي 56,000؛ عتاد الحاكم الأحمر وآخر مستويات التميمة تكلف 700,000–800,000 لنفس 1%.",
    barH: "💰 الجواهر مقابل +1%", barP: "الشريط الأقصر = أرخص. كل شريط هو +1% لإحصائية واحدة لنوع قوات واحد.",
    rows: { res1: "البحث I–III", res4: "البحث IV", res5: "البحث V", res6: "البحث VI", en1: "تحسين عتاد البطل (خبرة) حتى +40", en2: "تحسين عتاد البطل +60 → +100", mr: "تقدم رومان من الأول → العاشر", mv: "تقدم فالورا من الأول → العاشر", c1: "تميمة الحاكم 0 → Lv1", pet: "رفع مستوى الحيوان الأليف (طعام من متجر التحالف، حد أسبوعي)", res: "البحث — أول مستويات كل مرحلة", hg1: "صقل التخصص لعتاد البطل 0 → 1", c25: "تميمة الحاكم Lv2–3",
      adv: "تقدم الحيوان الأليف", ref: "تحسين الحيوان الأليف", gg1: "عتاد الحاكم — أخضر وأزرق", gg2: "عتاد الحاكم — بنفسجي (ملحمي، مع T1)", gg3: "عتاد الحاكم — ذهبي وأحمر", resl: "البحث — آخر مستوى في كل مرحلة", hg2: "صقل التخصص لعتاد البطل 1 → 5", c6: "تميمة الحاكم Lv4–22" },
    gives: { res1: "كله رخيص", res4: "", res5: "", res6: "", en1: "فقط عندما يسير هذا البطل", en2: "فقط عندما يسير هذا البطل", mr: "شعارات المتخصصين؛ هجوم + دفاع، كل القوات", mv: "شعارات المتخصصين؛ هجوم فقط، كل القوات", c1: "فتك + صحة، نوع قوات واحد", pet: "هجوم + دفاع، كل القوات", res: "حسب العقدة (هجوم / فتك المشاة الأرخص)", hg1: "فقط عندما يكون هذا البطل في المسيرة", c25: "فتك + صحة، نوع قوات واحد",
      adv: "هجوم + دفاع، كل القوات (Lv20 ≈ 4,700 · Lv30 9,600 · Lv40 14,200–18,100 · Lv50 23,200 · Lv60 41,600)", ref: "علامة ترويض شائعة ≈ 5,600، متقدمة ≈ 20,000 (اختُبر على حيوان واحد فقط)", gg1: "هجوم + دفاع، نوع قوات واحد", gg2: "هجوم + دفاع، نوع قوات واحد", gg3: "كل خطوة أغلى — انظر كل خطوة بالأسفل", resl: "", hg2: "كل مستوى أغلى (10 مطارق حدادة لكل مستوى)", c6: "أغلى بكثير من كل شيء آخر — انظر كل مستوى بالأسفل" },
    chH: "💠 تمائم الحاكم، كل مستوى", chP: "الجواهر مقابل +1% في كل مستوى (الأعلى = أغلى؛ المقياس يكبر ×10 لكل علامة). Lv1 هو أرخص شيء في اللعبة؛ من Lv2 يكلف مستوى التميمة تقريبًا مثل تقدم الحيوان الأليف أو عتاد الحاكم؛ من Lv6 هو أغلى من كل شيء في هذه الصفحة.",
    chTip: "إذن: كل التمائم إلى Lv1 فورًا. Lv2–3 عندما ينقصك فتك / صحة لهذا النوع من القوات. Lv4 وما فوق فقط بعد الترقيات الأرخص — تذكّر أن الفتك والصحة قيمتهما أعلى لكل 1% (البطاقة التالية).",
    chCols: ["المستوى", "دليل + تصميم", "% المكتسبة", "% الإجمالي", "الجواهر لكل 1%"],
    ggH: "🛡️ عتاد الحاكم، كل خطوة", ggP: "الجواهر مقابل +1% في كل خطوة ترقية لقطعة واحدة، من أول أخضر إلى أحمر T4 ★3 (الأعلى = أغلى؛ المقياس يكبر ×10 لكل علامة). الأخضر والأزرق رخيصان جدًا؛ البنفسجي تقريبًا مثل تقدم الحيوان الأليف؛ من الذهبي يرتفع بسرعة؛ الأحمر يكلف 10–40× البنفسجي.",
    ggTip: "إذن: ارفع كل قطعة إلى أزرق ★3 مبكرًا، وإلى بنفسجي عندما تستطيع. الذهبي والأحمر فقط بعد التمائم Lv1–3 والحيوانات الأليفة والبحث — إلا إذا كنت تحتاج سعة الانتشار التي يضيفها العتاد الأحمر.",
    ggNote: "المواد: kingshotguide.com (من البنفسجي إلى الذهبي تطابق لقطاتنا). أحمر T1 ★2 وما فوق: القوة لم تُنشر بعد، حسبناها من جدول إحصاءات العتاد. أحمر T5–T6: لا توجد بيانات. عتاد الحاكم الأحمر لم يُفتح بعد في خادمنا.",
    ggG: "أخضر · أزرق", ggP2: "بنفسجي", ggO: "ذهبي (T1–T3)", ggR: "أحمر (T1–T4)",
    ggTier: { g: "أخضر", b: "أزرق", p: "بنفسجي", p1: "بنفسجي T1", o: "ذهبي", o1: "ذهبي T1", o2: "ذهبي T2", o3: "ذهبي T3", r: "أحمر", r1: "أحمر T1", r2: "أحمر T2", r3: "أحمر T3", r4: "أحمر T4" },
    ggCols: ["الخطوة", "نسيج أطلس / خيوط مذهبة / رؤية الحرفي", "عملات الآثار", "% المكتسبة", "الجواهر لكل 1%"],
    ru1: "كل نظام أرخص في مستوياته الأولى.", ru2: "استمر في ترقية الأرخص الآن — لا ترفع نظامًا واحدًا إلى القمة.", ru3: "المنضمون: لا تنفقوا على إحصاءات القتال — فقط إحصاءات قائد الحشد تُحسب.",
    ruH: "📏 مسطرة الأسعار", ruP: "كل نقطة مستوى: الرخيص يسارًا والغالي يمينًا (كل خطوة ×10).",
    rdTap: "اضغط على نقطة لمعرفة سعرها.", moreH: "📖 المزيد: لماذا، حسب الدور، الحيوانات الأليفة، ما لا نعرفه", petH: "الحيوانات الأليفة",
    nxRes: "مرحلة البحث التي وصلت إليها", nxMr: "عدد تقدمات رومان المنجزة", nxMv: "عدد تقدمات فالورا المنجزة", roman: "رومان", valora: "فالورا", nth: "#{n}",
    dirTip: "أنهيت المستويات الرخيصة في كل شيء (التمائم Lv3، البحث المرحلة V، عتاد الحاكم ملحمي 3★، الحيوانات الأليفة Lv50)؟ إذن حان وقت اختيار اتجاه.", dirLink: "🧭 متى تختار اتجاهًا ←", nxH: "🎯 خطوتي التالية", nxP: "اختر أين أنت الآن:",
    nxCharm: "تمائم الحاكم عندي (معظم القطع لكل نوع قوات)", troops: ["المشاة", "الفرسان", "الرماة"], nxGear: "عتاد الحاكم عندي (معظم القطع لكل نوع قوات)", nxPet: "تقدم الحيوان الأليف التالي", nxMast: "صقل التخصص لأبطالي الرئيسيين", nxEnh: "مستوى تحسين تلك القطع الرئيسية", nxPetTip: "رفع مستوى الحيوان الأليف: طعام الحيوان الأليف سهل الحصول (مهارة النمر الصيّاد 200–500 يوميًا، الفعاليات، متجر التحالف)، لذا ارفع المستوى كلما استطعت. الحيوانات الأندر تعطي هجوم / دفاع قوات أكثر لكل مستوى لكنها تأكل أكثر، لذا الطعام لكل +1% متقارب لكل الحيوانات (الوشق / الثور الأوفر، ~0.8× الأسد). الحد الحقيقي هو التقدم كل 10 مستويات (في القائمة) — وحيوان N أو R أو SR في نفس التقدم قيمته متقاربة. تحسين الحيوان الأليف هو أكبر مساحة متبقية في الحيوان، وكله فتك / صحة: مستوى الحيوان يحدد أعلى جودة ممكنة (Lv10 رمادي، Lv20 أخضر، Lv30 أزرق، Lv40 بنفسجي، Lv50 خيالي). استخدم علامة ترويض شائعة حتى الأزرق، وعلامة ترويض متقدمة من الأزرق ← البنفسجي.",
    nxNone: "لا شيء بعد", nxLv: "Lv{n}", nxPetDone: "تجاوز Lv60 بالفعل", nxMax: "الحد الأقصى", nxGo: "افعل هذه أولًا:", nxNote: "نفس الجواهر، أكبر نسبة. الفتك / الصحة (تمائم الحاكم) قيمتهما أعلى قليلًا مما تبدو، والهجوم / الدفاع (الحيوانات الأليفة) أقل قليلًا.",
    sys: { pet: "🐾 الحيوانات الأليفة", ma: "🎓 تقدم المتخصص", en: "⚒️ تحسين عتاد البطل", c: "💠 تميمة الحاكم", g: "🛡️ عتاد الحاكم", pu: "🐾 رفع مستوى الحيوان الأليف", pa: "🐾 تقدم الحيوان الأليف", pr: "🐾 تحسين الحيوان الأليف", r: "🔬 البحث", m: "🔨 صقل التخصص" },
    refN: "بعلامة ترويض شائعة", refA: "متقدم (علامة ترويض متقدمة)", resFirst: "أول مستويات المرحلة", resLast: "آخر مستوى في المرحلة", petUp: "طعام أسبوعي", from: "→",
    bdH: "🗂️ فئات الأسعار", bdP: "كل ترقية مرتبة حسب عدد الجواهر لكل +1%. نفس الصف = قيمة متقاربة لجواهرك.",
    bands: ["رخيص جدًا (أقل من 5,000)", "رخيص (5,000–15,000)", "متوسط (15,000–30,000)", "غالٍ (30,000–60,000)", "غالٍ جدًا (60,000+)"],
    detH: "📊 كل نظام، مستوى بمستوى",
    cheap: "أفضل قيمة", mid: "متوسط", dear: "الأغلى",
    rot: "كل نظام يصبح أغلى كلما صعدت — أول مستويات كل نظام هي الصفقات الرابحة. لذا لا ترفع نظامًا واحدًا إلى القمة: استمر في ترقية النظام الذي خطوته التالية هي الأرخص الآن.",
    lowH: "📉 الفتك والصحة قيمتهما أعلى", lowP: "معظم اللاعبين لديهم فتك وصحة أقل بكثير من الهجوم والدفاع. كلما كانت الإحصائية أقل، زاد تأثير +1% — لذا تمائم الحاكم أفضل حتى مما تظهره الأشرطة، والحيوانات الأليفة أسوأ قليلًا.",
    lowA: "إحصائية عند 50%", lowB: "إحصائية عند 300%", lowS: "+1% يضيف", lowFoot: "قيمة +1% ≈ 1 ÷ (100 + النسبة الحالية)",
    rlH: "👑 قادة الحشد", rlP: "في الحشد تُحسب إحصاءات القائد نفسه فقط. أنفق بهذا الترتيب:",
    rl: ["كل تميمة حاكم إلى Lv1 وكل قطعة من عتاد الحاكم إلى أزرق ★3 أولًا — كلاهما رخيص جدًا.", "البحث I–IV، تحسين عتاد البطل حتى حوالي +40، أول تقدمات رومان، وتقدم الحيوان الأليف Lv20–30 — كلها رخيصة.", "البحث V، صقل التخصص للأبطال الرئيسيين حتى Lv1، تحسين الحيوان الأليف بعلامة ترويض شائعة، وأول تقدم لفالورا.",
      "ثم تميمة الحاكم Lv2–3، تقدم الحيوان الأليف Lv40–50، عتاد الحاكم البنفسجي (ملحمي)، صقل التخصص Lv2، التحسين +60 وعلامة ترويض متقدمة — قيمة متقاربة؛ اختر الإحصائية ونوع القوات الذي ينقصك.", "صقل التخصص Lv3+، تميمة الحاكم Lv4+، البحث VI، التحسين +80 وما فوق، وعتاد الحاكم الذهبي هي الأغلى — في النهاية."],
    rlTroop: "أي نوع قوات: PvP — دفاع / صحة المشاة، هجوم / فتك الفرسان والرماة. صيد الدببة — الرماة.",
    rlHero: "إحصاءات القتال من VIP (كل القوات): VIP9 دفاع +10%، VIP10 هجوم / دفاع +12%، VIP11 هجوم / دفاع / صحة +14%، VIP12 هجوم / دفاع / فتك / صحة +16% — أكبر مصدر منفرد. امتلاك هذين البطلين بأعلى النجوم يعطي مكافأة دائمة. فقط شظاياهما الخاصة تعمل (ليس الشظايا العامة؛ تأتي من أفضل 10 في قاعة الحكام وباقات VIP)، لذا لا يمكن حسابها بالجواهر — إن كنت قريبًا من أعلى النجوم فأكملها (الموهبة تعمل فقط بأعلى النجوم):",
    amadeus: "أماديوس: كل القوات فتك + صحة +15%", helga: "هيلجا: كل القوات هجوم + دفاع +10%",
    joH: "🤝 المنضمون", joP: "إحصاءات القتال الخاصة بك لا تُحسب عندما تنضم إلى حشد شخص آخر.",
    joYes: "يستحق", joYesL: ["مستوى القوات (الذهب الخالص / TG)", "المهارة العلوية اليمنى لبطلك الأول"],
    joNo: "لا يفيد في الحشد", joNoL: ["إحصاءات القتال — تفيد فقط عندما تهاجم وحدك، أو تدافع عن مدينتك، أو تُهاجَم أثناء الجمع."],
    joIf: "إن أردت الإنفاق رغم ذلك: تميمة الحاكم Lv1 وأول مراحل البحث تعطي أكبر قوة لكل جوهرة — وبالتالي أكبر نقاط الهجرة (مواجهة أرض السيوف، تقييم المملكة). التمائم والحيوانات الأليفة والبحث وعتاد البطل تُحسب بنفس الوزن هناك.",
    unkH: "🟡 لم يُحسب بعد", unks: ["عتاد البطل الحصري (الأجزاء): المستوى L يحتاج 5L أجزاء، حوالي 0.36–0.5 × L جزء لكل 1% — رخيص إن كان لديك معرض العصير (500 من قسائم المعرض لكل واحد)، لم يُحسب بالجواهر بعد.", "شظايا أماديوس / هيلجا الخاصة: أسعار الباقات.", "باقات بالمال الحقيقي (هنا نستخدم عملات الآثار والجواهر فقط).", "المهارات النشطة للحيوانات الأليفة؛ تحسين الحيوان الأليف اختُبر على حيوان واحد فقط."],
    numH: "🔢 لمن يريد الأرقام", numP: "سعر التحويل: 1 عملة آثار ≈ 3.2 جوهرة (تسريع ساعة واحدة = 800 جوهرة في متجر الجواهر أو 250 عملة آثار في متجر أرض السيوف؛ إنهاء البحث فورًا أيضًا ≈ 800 جوهرة للساعة). سعر آخر يغيّر الأرقام لا الترتيب. \"+1%\" = إحصائية واحدة لنوع قوات واحد؛ إحصائية لأنواع القوات الثلاثة تُحسب 3.",
    numCols: ["الترقية", "الجواهر لكل 1%", "يعطي"],
    foot: "المصدر: الحساب الرئيسي لـ Sparrow (القوة ↔ %، أسعار المتاجر، أوقات البحث). ليس من اللعبة. سنصحح الأرقام كلما اختبرنا أكثر." },
  ko: { title: "💎 투자 효율", intro: "",
    badge: "🔬 우리 연구 · 업데이트 {d}",
    heroH: "같은 다이아, 결과는 크게 달라요.", heroP: "가장 싼 +1% (첫 녹색 영주 장비 단계, 영주 보석 Lv1)는 1,000 다이아 미만. 영웅 장비 마스터리 제작 Lv5는 약 56,000; 빨강 영주 장비와 보석 마지막 레벨은 같은 1%에 700,000–800,000.",
    barH: "💰 +1%에 필요한 다이아", barP: "막대가 짧을수록 저렴. 막대 하나 = 병종 하나, 능력치 하나 +1%.",
    rows: { res1: "연구 I–III", res4: "연구 IV", res5: "연구 V", res6: "연구 VI", en1: "영웅 장비 강화 (경험치) +40까지", en2: "영웅 장비 강화 +60 → +100", mr: "로만 진급 1회 → 10회", mv: "베라 진급 1회 → 10회", c1: "영주 보석 0 → Lv1", pet: "펫 레벨업 (연맹 상점 먹이, 주간 한정)", res: "연구 — 각 단계의 첫 레벨들", hg1: "영웅 장비 마스터리 제작 0 → 1", c25: "영주 보석 Lv2–3",
      adv: "펫 돌파", ref: "펫 단련", gg1: "영주 장비 — 녹색·파랑", gg2: "영주 장비 — 보라 (에픽, T1 포함)", gg3: "영주 장비 — 금색·빨강", resl: "연구 — 각 단계의 마지막 레벨", hg2: "영웅 장비 마스터리 제작 1 → 5", c6: "영주 보석 Lv4–22" },
    gives: { res1: "모두 저렴", res4: "", res5: "", res6: "", en1: "그 영웅이 출정할 때만", en2: "그 영웅이 출정할 때만", mr: "거장 배지; 전 병종 공격력 + 방어력", mv: "거장 배지; 전 병종 공격력만", c1: "병종 하나 파괴력 + HP", pet: "전 병종 공격력 + 방어력", res: "노드마다 다름 (보병 공격력 / 파괴력이 가장 저렴)", hg1: "그 영웅이 부대에 있을 때만", c25: "병종 하나 파괴력 + HP",
      adv: "전 병종 공격력 + 방어력 (Lv20 ≈ 4,700 · Lv30 9,600 · Lv40 14,200–18,100 · Lv50 23,200 · Lv60 41,600)", ref: "일반 훈련 기록 ≈ 5,600, 고급 ≈ 20,000 (펫 하나로만 테스트)", gg1: "병종 하나 공격력 + 방어력", gg2: "병종 하나 공격력 + 방어력", gg3: "단계마다 더 비쌈 — 아래 단계별 표 참고", resl: "", hg2: "레벨마다 더 비쌈 (레벨당 제작 망치 10개 추가)", c6: "다른 모든 것보다 훨씬 비쌈 — 아래 레벨별 표 참고" },
    chH: "💠 영주 보석, 레벨별", chP: "레벨마다 +1%에 드는 다이아 (높을수록 비쌈; 눈금 한 칸마다 ×10). Lv1은 게임에서 가장 싼 것; Lv2부터는 보석 한 레벨이 펫 돌파나 영주 장비와 비슷; Lv6부터는 이 페이지의 어떤 것보다 비싸요.",
    chTip: "그러니까: 모든 보석을 바로 Lv1로. 그 병종의 파괴력 / HP가 부족할 때 Lv2–3. Lv4 이상은 더 싼 업그레이드를 끝낸 뒤에 — 파괴력과 HP는 1%당 가치가 더 높다는 것도 기억하세요 (다음 카드).",
    chCols: ["레벨", "매뉴얼 + 도면", "증가 %", "누적 %", "1%당 다이아"],
    ggH: "🛡️ 영주 장비, 단계별", ggP: "장비 한 부위의 업그레이드 단계마다 +1%에 드는 다이아, 첫 녹색부터 빨강 T4 ★3까지 (높을수록 비쌈; 눈금 한 칸마다 ×10). 녹색·파랑은 매우 저렴; 보라는 펫 돌파와 비슷; 금색부터 빠르게 오르고; 빨강은 보라의 10–40배.",
    ggTip: "그러니까: 모든 부위를 일찍 파랑 ★3까지, 여유가 되면 보라까지. 금색·빨강은 보석 Lv1–3, 펫, 연구를 끝낸 뒤에 — 빨강 장비가 주는 출정 수용량이 필요하다면 예외.",
    ggNote: "재료: kingshotguide.com (보라–금색은 우리 스크린샷과 일치). 빨강 T1 ★2 이상: 전투력이 아직 공개되지 않아 장비 능력치 표로 계산. 빨강 T5–T6: 데이터 없음. 빨강 영주 장비는 우리 서버에 아직 안 열렸어요.",
    ggG: "녹색 · 파랑", ggP2: "보라", ggO: "금색 (T1–T3)", ggR: "빨강 (T1–T4)",
    ggTier: { g: "녹색", b: "파랑", p: "보라", p1: "보라 T1", o: "금색", o1: "금색 T1", o2: "금색 T2", o3: "금색 T3", r: "빨강", r1: "빨강 T1", r2: "빨강 T2", r3: "빨강 T3", r4: "빨강 T4" },
    ggCols: ["단계", "비단 / 금사 / 설계 스케치", "성스러운 계약 코인", "증가 %", "1%당 다이아"],
    ru1: "모든 시스템은 첫 레벨들이 가장 저렴해요.", ru2: "지금 가장 싼 것을 계속 올리세요 — 한 시스템만 끝까지 올리지 마세요.", ru3: "집결원: 전투 능력치에 쓰지 마세요 — 집결 대장 것만 적용돼요.",
    ruH: "📏 가격 자", ruP: "점 하나가 한 레벨: 왼쪽이 싸고 오른쪽이 비싸 (한 칸 ×10).",
    rdTap: "점을 누르면 가격이 보여.", moreH: "📖 더 보기: 이유, 역할별, 펫, 아직 모르는 것", petH: "펫",
    nxRes: "내 연구 단계", nxMr: "로만 진급 횟수", nxMv: "베라 진급 횟수", roman: "로만", valora: "베라", nth: "{n}회",
    dirTip: "저렴한 레벨은 다 끝냈나요 (보석 Lv3, 연구 V단계, 영주 장비 에픽 3★, 펫 Lv50)? 그럼 방향을 정할 때예요.", dirLink: "🧭 언제 방향을 정할까 →", nxH: "🎯 내 다음 단계", nxP: "지금 진행 상황을 골라:",
    nxCharm: "내 영주 보석 (병종별 대부분 부위의 레벨)", troops: ["보병", "기병", "궁병"], nxGear: "내 영주 장비 (병종별 대부분 부위의 단계)", nxPet: "내 다음 펫 돌파", nxMast: "주력 영웅의 마스터리 제작", nxEnh: "그 주력 장비의 강화 레벨", nxPetTip: "펫 레벨업: 펫 먹이는 구하기 쉬워요 (치타 스킬 하루 200–500, 이벤트, 연맹 상점) — 올릴 수 있으면 올리세요. 희귀한 펫일수록 레벨당 부대 공격력 / 방어력이 더 크지만 먹이도 더 먹어서, +1%당 먹이는 모든 펫이 거의 같아요 (스라소니 / 들소가 가장 절약, 사자의 약 0.8배). 진짜 한계는 10레벨마다 있는 돌파 (목록에 있음) — 같은 돌파라면 N, R, SR 펫의 가치는 거의 같아요. 펫 단련은 펫에 남은 가장 큰 성장 공간이고 전부 파괴력 / HP: 펫 레벨이 나올 수 있는 최고 품질을 정해요 (Lv10 회색, Lv20 녹색, Lv30 파랑, Lv40 보라, Lv50 레전드). 파랑까지는 일반 훈련 기록, 파랑 → 보라부터는 고급 훈련 기록.",
    nxNone: "아직 없음", nxLv: "Lv{n}", nxPetDone: "이미 Lv60 넘음", nxMax: "최대", nxGo: "이것부터:", nxNote: "같은 다이아로 가장 많은 %. 파괴력 / HP (영주 보석)는 보기보다 조금 더 가치 있고, 공격력 / 방어력 (펫)은 조금 덜해요.",
    sys: { pet: "🐾 펫", ma: "🎓 거장 진급", en: "⚒️ 영웅 장비 강화", c: "💠 영주 보석", g: "🛡️ 영주 장비", pu: "🐾 펫 레벨업", pa: "🐾 펫 돌파", pr: "🐾 펫 단련", r: "🔬 연구", m: "🔨 마스터리 제작" },
    refN: "일반 훈련 기록으로", refA: "고급 (고급 훈련 기록)", resFirst: "단계의 첫 레벨들", resLast: "단계의 마지막 레벨", petUp: "주간 먹이", from: "→",
    bdH: "🗂️ 가격대", bdP: "모든 업그레이드를 +1%에 드는 다이아 순으로 정리. 같은 줄 = 다이아 대비 효과가 비슷.",
    bands: ["매우 저렴 (5,000 미만)", "저렴 (5,000–15,000)", "중간 (15,000–30,000)", "비쌈 (30,000–60,000)", "매우 비쌈 (60,000+)"],
    detH: "📊 시스템별, 레벨별",
    cheap: "가성비 최고", mid: "중간", dear: "가장 비쌈",
    rot: "모든 시스템은 올라갈수록 비싸져요 — 각 시스템의 첫 레벨들이 가장 이득. 그러니 한 시스템만 끝까지 올리지 말고, 지금 다음 단계가 가장 싼 시스템을 계속 올리세요.",
    lowH: "📉 파괴력과 HP가 더 가치 있어요", lowP: "대부분의 플레이어는 파괴력과 HP가 공격력과 방어력보다 훨씬 낮아요. 능력치가 낮을수록 +1%의 효과가 커요 — 그래서 영주 보석은 막대보다 더 좋고, 펫은 조금 덜 좋아요.",
    lowA: "능력치 50%일 때", lowB: "능력치 300%일 때", lowS: "+1% 효과", lowFoot: "+1%의 가치 ≈ 1 ÷ (100 + 현재 %)",
    rlH: "👑 집결 대장", rlP: "집결에서는 대장 본인의 능력치만 적용돼요. 이 순서로 쓰세요:",
    rl: ["모든 영주 보석을 Lv1, 모든 영주 장비를 파랑 ★3까지 먼저 — 둘 다 매우 저렴.", "연구 I–IV, 영웅 장비 강화 약 +40까지, 로만 초반 진급, 펫 돌파 Lv20–30 — 모두 저렴.", "연구 V, 주력 영웅 마스터리 제작 Lv1까지, 일반 훈련 기록으로 펫 단련, 베라 첫 진급.",
      "그다음 영주 보석 Lv2–3, 펫 돌파 Lv40–50, 보라 (에픽) 영주 장비, 마스터리 제작 Lv2, 강화 +60, 고급 훈련 기록 — 효율 비슷; 부족한 능력치와 병종을 고르세요.", "마스터리 제작 Lv3+, 영주 보석 Lv4+, 연구 VI, 강화 +80 이상, 금색 영주 장비가 가장 비쌈 — 마지막에."],
    rlTroop: "어느 병종: PvP — 보병 방어력 / HP, 기병·궁병 공격력 / 파괴력. 자이언트 베어 사냥 — 궁병.",
    rlHero: "VIP 전투 능력치 (전 병종): VIP9 방어력 +10%, VIP10 공격력 / 방어력 +12%, VIP11 공격력 / 방어력 / HP +14%, VIP12 공격력 / 방어력 / 파괴력 / HP +16% — 단일 출처로 가장 큼. 이 두 영웅을 만성으로 가지고 있으면 항상 보너스가 있어요. 전용 파편만 쓸 수 있어서 (공용 파편 불가; 총독의 전당 상위 10위와 VIP 패키지에서 획득) 다이아로 계산할 수 없어요 — 만성이 가까우면 끝까지 채우세요 (재능은 만성에서만 적용):",
    amadeus: "아마데우스: 전 병종 파괴력 + HP +15%", helga: "헬가: 전 병종 공격력 + 방어력 +10%",
    joH: "🤝 집결원", joP: "다른 사람의 집결에 참여할 때는 내 전투 능력치가 적용되지 않아요.",
    joYes: "투자할 가치 있음", joYesL: ["병사 등급 (순금 / TG)", "첫 번째 영웅의 오른쪽 위 스킬"],
    joNo: "집결에는 소용없음", joNoL: ["전투 능력치 — 혼자 공격할 때, 내 도시를 방어할 때, 채집 중 공격받을 때만 도움돼요."],
    joIf: "그래도 쓰고 싶다면: 영주 보석 Lv1과 초반 연구 단계가 다이아당 전투력이 가장 높아요 — 그래서 이주 점수 (성검 쟁탈, 왕국 등급)도 가장 많이 올라요. 보석, 펫, 연구, 영웅 장비는 거기서 같은 비중이에요.",
    unkH: "🟡 아직 계산 안 됨", unks: ["영웅 전용 장비 (부속품): L레벨에 부속품 5L개, 1%당 약 0.36–0.5 × L개 — 샴페인 시장 (개당 시장 티켓 500장)이 있으면 저렴, 아직 다이아로 환산 안 함.", "아마데우스 / 헬가 전용 파편: 패키지 가격.", "현금 패키지 (여기선 성스러운 계약 코인과 다이아만 계산).", "펫 액티브 스킬; 펫 단련은 펫 하나로만 테스트."],
    numH: "🔢 숫자를 보고 싶은 분께", numP: "환율: 성스러운 계약 코인 1개 ≈ 다이아 3.2 (1시간 가속 = 다이아 상점 800 다이아 또는 성검 상점 250 코인; 연구 즉시 완료도 시간당 ≈ 800 다이아). 다른 환율이면 숫자는 바뀌어도 순서는 그대로. \"+1%\" = 병종 하나, 능력치 하나; 세 병종 모두에 붙는 능력치는 3으로 계산.",
    numCols: ["업그레이드", "1%당 다이아", "효과"],
    foot: "출처: Sparrow 본계정 실측 (전투력 ↔ %, 상점 가격, 연구 시간). 게임 공식 자료 아님. 테스트가 늘면 숫자를 고칠게요." },
};
let lang = OFFICER.lang || "en";
const BANDS = [5000, 15000, 30000, 60000, Infinity];
const band = (g) => BANDS.findIndex((b) => g < b);
const gearName = (i) => { const k = GEAR[i][0]; return `${t("ggTier")[k]} ${i - GEAR.findIndex((x) => x[0] === k)}★`; };
/* every upgrade as one list: { sys, label, gems } — research and pet level-up are ongoing, not levels */
function allSteps() {
  const out = [];
  CHARM.forEach((c, i) => out.push({ sys: "c", key: "c" + i, label: "Lv" + (i + 1), gems: charmGems(i), grp: "c" }));
  GEAR.forEach((g, i) => out.push({ sys: "g", key: "g" + i, label: gearName(i), gems: gearGems(i), grp: g[0] }));
  PETADV.forEach(([lv, g, hi]) => out.push({ sys: "pa", key: "pa" + lv, label: "Lv" + lv, gems: g, hi, grp: "pa" }));
  out.push({ sys: "pr", key: "pr1", label: t("refN"), gems: 5600, grp: "pr1" }, { sys: "pr", key: "pr2", label: t("refA"), gems: 20000, grp: "pr2" });
  RES.forEach(([n, lo, hi], i) => out.push({ sys: "r", key: "r" + i, label: n, gems: lo, hi, grp: "r" + i }));
  for (let k = 1; k <= 10; k++) out.push({ sys: "ma", key: "mr" + k, label: `${t("roman")} ${t("nth").replace("{n}", k)}`, gems: MAS.r(k), grp: "mr" }, { sys: "ma", key: "mv" + k, label: `${t("valora")} ${t("nth").replace("{n}", k)}`, gems: MAS.v(k), grp: "mv", dm: 1 });
  ENH.forEach(([lv, g]) => out.push({ sys: "en", key: "en" + lv, label: "+" + lv, gems: g, grp: "en" }));
  for (let L = 0; L < 5; L++) out.push({ sys: "m", key: "m" + L, label: "Lv" + (L + 1), gems: mastGems(L), grp: "m" });
  return out;
}
// pet advancement at Lv20 / 30 / 40 / 50 / 60: gems per 1% (about the same for N / R / SR — materials and % both scale with rarity)
const PETADV = [[20, 4700], [30, 9600], [40, 14200, 18100], [50, 23200], [60, 41600], [70, 50000], [80, 67000]];   // Lv70–80 worked out from the pattern, not tested
// research by tier (gems per 1%, a range: cheapest → dearest node of that tier)
const RES = [["I–III", 15, 850], ["IV", 1700, 4100], ["V", 6300, 15000], ["VI", 26000, 62000]];
// Master Relationship Advancement with Master Emblems, gems per 1% at the k-th advancement, the whole 10 levels of stats counted (claude/master-report-2026-11-12.md):
// Roman 8k emblems for 8.1 units (Attack + Defense), Valora 5k for 4.05 (Attack only); the first one as given in the report
const MAS = { r: (k) => k === 1 ? 3200 : 2963 * k, v: (k) => k === 1 ? 3900 : 3704 * k };
// Hero Gear enhancement (XP; 100 XP part ≈ 250 Relic Coins) at enhancement level 20 / 40 / 60 / 80 / 100
const ENH = [[20, 2400], [40, 6200], [60, 15500], [80, 32000], [100, 55000]];
const enhGems = (e) => { if (e <= ENH[0][0]) return ENH[0][1]; for (let i = 1; i < ENH.length; i++) if (e <= ENH[i][0]) { const [a, ga] = ENH[i - 1], [b, gb] = ENH[i]; return ga + (gb - ga) * (e - a) / (b - a); } return ENH[ENH.length - 1][1]; };
const NX = { c: [0, 0, 0], g: [-1, -1, -1], pa: 0, m: 0, e: 60, rt: 2, mr: 0, mv: 0 };   // c / g: per troop type [infantry, cavalry, archer]
// Mastery Forging L → L+1: 10(L+1) Forgehammers (1 = 1,250 Relic Coins ≈ 4,000 gems); each level adds 10% of the piece's base stat (15% + 0.35% × enhancement)
const mastGems = (L) => 10 * (L + 1) * 4000 / ((15 + 0.35 * (NX.e || 60)) * 0.1);
try { Object.assign(NX, JSON.parse(localStorage.getItem("nxs-iv") || "{}")); } catch (e) {}
if (!Array.isArray(NX.c)) NX.c = [NX.c, NX.c, NX.c].map((x) => +x || 0); if (!Array.isArray(NX.g)) NX.g = [NX.g, NX.g, NX.g].map((x) => (x == null ? -1 : +x));   // old one-number setting
const keepNx = () => { try { localStorage.setItem("nxs-iv", JSON.stringify(NX)); } catch (e) {} };
function nextCand() {
  const cand = [];
  const TR = t("troops");
  for (let tr = 0; tr < 3; tr++) {
    const c = NX.c[tr], g = NX.g[tr];
    for (let k = 0; k < 2; k++) if (c + k < CHARM.length) cand.push({ sys: "c", key: "c" + (c + k), tr: TR[tr], label: `Lv${c + k} ${t("from")} Lv${c + k + 1}`, gems: charmGems(c + k) });
    for (let k = 1; k <= 2; k++) if (g + k < GEAR.length) cand.push({ sys: "g", key: "g" + (g + k), tr: TR[tr], label: (g + k ? gearName(g + k - 1) + ` ${t("from")} ` : "") + gearName(g + k), gems: gearGems(g + k) });
  }
  for (let k = 0; k < 2; k++) { const a = PETADV[NX.pa + k]; if (a) cand.push({ sys: "pa", key: "pa" + a[0], label: "Lv" + a[0], gems: a[1], hi: a[2] }); }
  cand.push({ sys: "pr", key: "pr1", label: t("refN"), gems: 5600 }, { sys: "pr", key: "pr2", label: t("refA"), gems: 20000 });
  { const r = RES[NX.rt] || RES[2]; cand.push({ sys: "r", key: "r" + NX.rt, label: r[0], gems: r[1], hi: r[2] }); }
  if (NX.mr < 10) cand.push({ sys: "ma", key: "mr" + (NX.mr + 1), label: `${t("roman")} ${t("nth").replace("{n}", NX.mr + 1)}`, gems: MAS.r(NX.mr + 1) });
  if (NX.mv < 10) cand.push({ sys: "ma", key: "mv" + (NX.mv + 1), label: `${t("valora")} ${t("nth").replace("{n}", NX.mv + 1)}`, gems: MAS.v(NX.mv + 1) });
  if (NX.e < 100) { const near = ENH.reduce((a, x) => Math.abs(x[0] - NX.e) < Math.abs(a[0] - NX.e) ? x : a); cand.push({ sys: "en", key: "en" + near[0], label: `+${NX.e} ${t("from")} +${NX.e + 1}`, gems: enhGems(NX.e) }); }
  for (let k = 0; k < 2; k++) if (NX.m + k < 5) cand.push({ sys: "m", key: "m" + (NX.m + k), label: `${NX.m + k} ${t("from")} ${NX.m + k + 1}`, gems: mastGems(NX.m + k) });
  cand.sort((a, b) => a.gems - b.gems);
  return cand.slice(0, 8);
}
function nextHtml() {
  const S = t("sys"), TR = t("troops"), cand = nextCand();
  const opt = (n, v, lab) => `<option value="${v}"${n === v ? " selected" : ""}>${esc(lab)}</option>`;
  return `<div class="iv-nxin">
      <div class="iv-trg"><b>${esc(t("nxCharm"))}</b>${[0, 1, 2].map((tr) => `<label>${esc(TR[tr])}<select class="inp" data-c="${tr}">${Array.from({ length: 23 }, (_, n) => opt(NX.c[tr], n, n ? t("nxLv").replace("{n}", n) : t("nxNone"))).join("")}</select></label>`).join("")}</div>
      <div class="iv-trg gear"><b>${esc(t("nxGear"))}</b>${[0, 1, 2].map((tr) => `<label>${esc(TR[tr])}<select class="inp" data-g="${tr}">${opt(NX.g[tr], -1, t("nxNone"))}${GEAR.map((g, i) => opt(NX.g[tr], i, gearName(i))).join("")}</select></label>`).join("")}</div>
      <label>${esc(t("nxPet"))}<select class="inp" id="iv_pa">${PETADV.map((a, i) => opt(NX.pa, i, "Lv" + a[0])).join("")}${opt(NX.pa, PETADV.length, t("nxPetDone"))}</select></label>
      <label>${esc(t("nxMast"))}<select class="inp" id="iv_m">${Array.from({ length: 6 }, (_, n) => opt(NX.m, n, n === 5 ? `Lv5+ (${t("nxMax")})` : "Lv" + n)).join("")}</select></label>
      <label>${esc(t("nxEnh"))}<select class="inp" id="iv_e">${[20, 40, 60, 80, 100].map((n) => opt(NX.e, n, "+" + n)).join("")}</select></label>
      <label>${esc(t("nxRes"))}<select class="inp" id="iv_rt">${RES.map((r, i) => opt(NX.rt, i, r[0])).join("")}</select></label>
      <label>${esc(t("nxMr"))}<select class="inp" id="iv_mr">${Array.from({ length: 11 }, (_, n) => opt(NX.mr, n, n === 10 ? t("nxMax") : String(n))).join("")}</select></label>
      <label>${esc(t("nxMv"))}<select class="inp" id="iv_mv">${Array.from({ length: 11 }, (_, n) => opt(NX.mv, n, n === 10 ? t("nxMax") : String(n))).join("")}</select></label></div>
    <div class="iv-nxl"><b>${esc(t("nxGo"))}</b><ol>${cand.map((c) => `<li class="b${band(c.gems)}"><span class="iv-sys">${esc(S[c.sys])}${c.tr ? " · " + esc(c.tr) : ""}</span><span class="iv-lab">${esc(c.label)}</span><span class="iv-gem">${c.hi ? range(c.gems, c.hi) : fmt(c.gems)}</span></li>`).join("")}</ol></div>`;
}
function bandsHtml() {
  const S = t("sys"), steps = allSteps(), rows = BANDS.map(() => []);
  // group neighbours of the same system / tier that fall in the same band: "Blue 0★–3★", "Lv6–22"
  for (const st of steps) {
    const b = band(st.gems), row = rows[b], last = row[row.length - 1];
    if (last && last.grp === st.grp && last.sys === st.sys && (st.sys === "c" || st.sys === "g" || st.sys === "m") && last.next === st.key) { last.to = st.label; last.next = nextKey(st.key); }
    else row.push({ ...st, next: nextKey(st.key) });
  }
  // the very dear row: one chip per system (first … last)
  const v = rows[4], merged = [];
  for (const sys of ["c", "g", "m"]) { const xs = v.filter((x) => x.sys === sys); if (xs.length) merged.push({ ...xs[0], to: (xs[xs.length - 1].to || xs[xs.length - 1].label) }); }
  rows[4] = merged.concat(v.filter((x) => !["c", "g", "m"].includes(x.sys)));
  return `<div class="iv-bands">${rows.map((row, b) => `<div class="iv-band b${b}"><div class="iv-bl">${esc(t("bands")[b])}</div><div class="iv-chips">${row.map((x) => `<span class="iv-chip s-${x.sys}">${esc(S[x.sys])} <b>${esc(x.label)}${x.to && x.to !== x.label ? "–" + esc(x.to) : ""}</b></span>`).join("")}</div></div>`).join("")}</div>`;
}
/* 📏 one price ruler: every level of every system as a dot on a log scale (500 → 1,000,000 gems per +1%) */
const LO = Math.log10(10), HI = Math.log10(1e6);
const xp = (g) => Math.max(0, Math.min(100, (Math.log10(g) - LO) / (HI - LO) * 100));
function rulerHtml() {
  const S = t("sys"), st = allSteps(), rank = {};
  nextCand().forEach((c, i) => { if (!(c.key in rank)) rank[c.key] = i + 1; });
  const lanes = [["c", ["c"]], ["g", ["g"]], ["pa", ["pa", "pr"]], ["r", ["r"]], ["ma", ["ma"]], ["en", ["en"]], ["m", ["m"]]];
  const zones = BANDS.map((b, i) => { const a = i ? BANDS[i - 1] : 10, z = Math.min(b, 1e6); return `<i class="z b${i}" style="left:${xp(a)}%;width:${xp(z) - xp(a)}%"></i>`; }).join("");
  const dot = (x) => { const r = rank[x.key], tip = `${S[x.sys]} ${x.label}: ${x.hi ? range(x.gems, x.hi) : fmt(x.gems)}`;
    return (x.hi ? `<i class="rg" style="left:${xp(x.gems)}%;width:${xp(x.hi) - xp(x.gems)}%"></i>` : "") + `<span role="button" tabindex="0" class="dt s-${x.sys}${r ? " hl" : ""}${x.sys === "pr" || x.dm ? " dm" : ""}${x.sys === "g" && GEAR[+x.key.slice(1)][0][0] === "r" ? " off" : ""}" style="left:${xp(x.gems)}%" data-tip="${esc(tip)}" aria-label="${esc(tip)}">${r ? `<b>${r}</b>` : ""}</span>`; };
  return `<div class="iv-ru">${lanes.map(([k, syss]) => `<div class="iv-ln"><div class="iv-lnk">${esc(S[k === "pa" ? "pet" : k])}</div><div class="iv-tr">${zones}${st.filter((x) => syss.includes(x.sys)).map(dot).join("")}</div></div>`).join("")}
    <div class="iv-ln ax"><div class="iv-lnk"></div><div class="iv-tr">${[100, 1e3, 1e4, 1e5, 1e6].map((v) => `<span style="left:${xp(v)}%">${v >= 1e6 ? "1M" : v >= 1000 ? v / 1000 + "k" : v}</span>`).join("")}</div></div></div>
    <div class="iv-rd" id="iv_rd">${esc(t("rdTap"))}</div>`;
}
function nextKey(k) { const m = k.match(/^([cgm])(\d+)$/); return m ? m[1] + (+m[2] + 1) : null; }
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const range = (a, b) => a === b ? fmt(a) : `${fmt(a)}–${fmt(b)}`;
function render() {
  const root = $("iv_root"); if (!root) return;
  const R = t("rows"), G = t("gives");
  const gain = (s) => (1 / (100 + s) * 100);   // how much +1% adds at a given stat, in % of total
  root.innerHTML = `
  <div class="muted iv-small" style="margin:2px 0 10px">${esc(t("badge").replace("{d}", UPDATED))}</div>
  <div class="iv-rules">${["ru1", "ru2", "ru3"].map((k, i) => `<div class="iv-rule"><span>${["🪜", "🔄", "🤝"][i]}</span><p>${esc(t(k))}</p></div>`).join("")}</div>
  <div class="card"><h3>${esc(t("ruH"))}</h3><p class="iv-p">${esc(t("ruP"))}</p><div id="iv_ruler">${rulerHtml()}</div>
    <div class="iv-key">${t("bands").map((b, i) => `<span><i class="zk b${i}"></i>${esc(b)}</span>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("nxH"))}</h3><p class="iv-p">${esc(t("nxP"))}</p><div id="iv_nx">${nextHtml()}</div><p class="iv-p" style="margin:10px 0 0"><a href="#growth">${esc(t("dirLink"))}</a></p></div>
  <details class="card iv-det"><summary><b>${esc(t("moreH"))}</b></summary>
  <div class="card"><h3>${esc(t("lowH"))}</h3><p class="iv-p">${esc(t("lowP"))}</p>
    <div class="iv-low">${[[50, "lowA"], [300, "lowB"]].map(([s, k]) => `<div class="iv-lc"><b>${esc(t(k))}</b><div class="iv-lb"><i style="width:${(gain(s) / gain(50) * 100).toFixed(0)}%"></i></div><span>${esc(t("lowS"))} ${gain(s).toFixed(2)}%</span></div>`).join("")}</div>
    <div class="muted iv-small">${esc(t("lowFoot"))}</div></div>
  <div class="card"><h3>${esc(t("rlH"))}</h3><p class="iv-p">${esc(t("rlP"))}</p>
    <ol class="iv-steps">${t("rl").map((x, i) => `<li class="s${i}"><span class="iv-n">${i + 1}</span><span>${esc(x)}</span></li>`).join("")}</ol>
    <p class="iv-p" style="margin-top:10px">🎯 ${esc(t("rlTroop"))}</p>
    <p class="iv-p">${esc(t("rlHero"))}</p>
    <div class="iv-heroes">${[["amadeus", "amadeus"], ["helga", "helga"]].map(([id, k]) => `<div class="iv-hc"><img src="figures/heroes/hero_${id}.webp" alt="" loading="lazy"><span>${esc(t(k))}</span></div>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("joH"))}</h3><p class="iv-p">${esc(t("joP"))}</p>
    <div class="iv-jo"><div class="iv-yes"><b>✅ ${esc(t("joYes"))}</b><ul>${t("joYesL").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="iv-no"><b>🚫 ${esc(t("joNo"))}</b><ul>${t("joNoL").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <p class="iv-p" style="margin-top:10px">💡 ${esc(t("joIf"))}</p></div>
  <div class="card"><h3>🐾 ${esc(t("petH"))}</h3><p class="iv-p">${esc(t("nxPetTip"))}</p></div>
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="iv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></details>
  <details class="card"><summary><b>${esc(t("numH"))}</b></summary><p class="iv-p" style="margin-top:8px">${esc(t("numP"))}</p>
    <div class="iv-tw"><table class="iv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${ROWS.map(([k, lo, hi]) => `<tr><td>${esc(R[k])}</td><td class="n">${range(lo, hi)}</td><td>${esc(G[k])}</td></tr>`).join("")}</table>
    <table class="iv-t"><tr>${t("chCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${CHARM.map((c, i) => `<tr><td>Lv${i + 1}</td><td class="n">${fmt(c[0])}</td><td class="n">+${c[1]}%</td><td class="n">${CHARM.slice(0, i + 1).reduce((a, x) => a + x[1], 0)}%</td><td class="n">${fmt(charmGems(i))}</td></tr>`).join("")}</table>
    <table class="iv-t"><tr>${t("ggCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${GEAR.map((g, i) => `<tr><td>${esc(gearName(i))}</td><td class="n">${fmt(g[1])} / ${fmt(g[2])} / ${fmt(g[3])}</td><td class="n">${fmt(gearCoins(i))}</td><td class="n">+${gearPct(i).toFixed(2)}%</td><td class="n">${fmt(gearGems(i))}</td></tr>`).join("")}</table>
    <div class="muted iv-small">${esc(t("ggNote"))}</div></div>
    <div class="muted iv-small" style="margin-top:8px">${esc(t("foot"))}</div></details>`;
  bind();
}
function bindRuler() {
  document.querySelectorAll("#iv_ruler .dt").forEach((b) => b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); b.click(); } });
  document.querySelectorAll("#iv_ruler .dt").forEach((b) => b.onclick = () => { const d = $("iv_rd"); if (d) d.textContent = b.dataset.tip; document.querySelectorAll("#iv_ruler .dt.on").forEach((x) => x.classList.remove("on")); b.classList.add("on"); });
}
function bind() {
  bindRuler();
  const redo = () => { keepNx(); const n = $("iv_nx"); if (n) { n.innerHTML = nextHtml(); bind(); } const ru = $("iv_ruler"); if (ru) { ru.innerHTML = rulerHtml(); bindRuler(); } };
  document.querySelectorAll("#iv_nx [data-c]").forEach((el) => el.onchange = () => { NX.c[+el.dataset.c] = +el.value; redo(); });
  document.querySelectorAll("#iv_nx [data-g]").forEach((el) => el.onchange = () => { NX.g[+el.dataset.g] = +el.value; redo(); });
  for (const [id, k] of [["iv_pa", "pa"], ["iv_m", "m"], ["iv_e", "e"], ["iv_rt", "rt"], ["iv_mr", "mr"], ["iv_mv", "mv"]]) { const el = $(id); if (el) el.onchange = () => { NX[k] = +el.value; redo(); }; }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("iv_title")) { $("iv_title").textContent = t("title"); $("iv_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.iv = { init, applyTexts, setLang };
})();
