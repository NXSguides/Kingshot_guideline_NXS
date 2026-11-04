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
  ["mr", 4000, 40000, "mid"], ["ref", 5600, 20000, "mid"], ["mv", 8333, 83333, "mid"], ["res5", 6300, 15000, "mid"], ["hg1", 11100, 11100, "mid"], ["gg2", 12424, 44844, "mid"],
  ["c25", 14700, 20000, "mid"], ["adv", 4700, 67000, "mid"], ["en2", 15500, 55000, "mid"], ["hg2", 22200, 55600, "dear"], ["res6", 26000, 62000, "dear"], ["c6", 40000, 701000, "dear"], ["gg3", 40157, 840727, "dear"]];
const T = {
  en: { title: "💎 Investment", intro: "Our research: the same gems buy very different amounts of stat %. Where is it cheapest, and who should spend where? Still being tested.",
    badge: "🧪 Still testing · from our own account and shop prices · updated {d}",
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
    ruH: "📏 Price ruler", ruP: "Each dot is one level, placed by how many gems +1% costs (left = cheap, right = dear; ×10 per mark). Numbered dots are your next steps from the tool below; faded dots are red gear, not open on our server yet. Tap a dot for its price.",
    rdTap: "Tap a dot to see what it is and what it costs.", moreH: "📖 More: why, by role, pets, what we don't know", petH: "Pets",
    nxRes: "Research tier I'm on", nxMr: "Roman advancements done", nxMv: "Valora advancements done", roman: "Roman", valora: "Valora", nth: "#{n}",
    nxH: "🎯 My next step", nxP: "Pick where you are now, per troop type. The list shows your 8 cheapest next upgrades (gems per +1%), all systems and troop types mixed.",
    nxCharm: "My Governor Charms (most pieces of each troop type)", troops: ["Infantry", "Cavalry", "Archers"], nxGear: "My Governor Gear (most pieces of each troop type)", nxPet: "My next pet advancement", nxMast: "Main heroes' Mastery Forging", nxEnh: "Enhancement of those main pieces", nxPetTip: "Pet level-ups: pet food is easy to get (Cheetah skill 200–500 a day, events, Alliance Shop), so level up whenever you can. Rarer pets give more troop Attack / Defense per level but also eat more food, so the food per +1% is about the same for every pet (Lynx / Bison are the thriftiest, ~0.8× a Lion). The real limit is the advancement every 10 levels (in the list) — and an N, R or SR pet at the same advancement is about equally good value. Pet Refinement is the biggest room left on a pet and it is all Lethality / Health: the pet's level caps the quality you can roll (Lv10 grey, Lv20 green, Lv30 blue, Lv40 purple, Lv50 mythic). Use Common Taming Marks up to blue, Advanced Taming Marks from blue → purple.",
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
    unkH: "🟡 Not worked out yet", unks: ["Hero Exclusive Gear (Widgets): level L needs 5L Widgets, about 0.36–0.5 × L Widgets per 1% — cheap if you have the Champagne market (500 tickets each), not priced in gems yet.", "Amadeus / Helga own shards: pack prices.", "Real-money packs (this uses Relic Coins and gems only).", "Pet active skills; Pet Refinement tested on one pet only."],
    numH: "🔢 For those who want the numbers", numP: "Exchange rate: 1 Relic Coin ≈ 3.2 gems (1 h speedup = 800 gems in the Gem Shop or 250 Relic Coins in the Swordland Shop; finishing research instantly is also ≈ 800 gems per hour). Another rate changes the numbers, not the order. \"+1%\" = one stat of one troop type; a stat for all three troop types counts as 3.",
    numCols: ["Upgrade", "Gems per 1%", "Gives"],
    foot: "Source: Sparrow's main account (power ↔ %, shop prices, research times). Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "💎 投資效率", intro: "我們自己的研究：同樣的鑽石，換到的屬性 % 差非常多。哪裡最划算？什麼角色該花在哪？還在測試中。",
    badge: "🧪 測試中 · 來自我們自己的帳號和商店價格 · 更新 {d}",
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
    ggCols: ["階", "綢緞／金絲線／匠心願景", "聖契幣", "加多少 %", "每 1%（鑽）"],
    ru1: "每個系統都是前幾級最便宜。", ru2: "輪流升「現在最便宜的那一級」，不要一個系統衝到底。", ru3: "加入者不要把錢花在戰鬥屬性——集結只看隊長的。",
    ruH: "📏 價格尺", ruP: "每個點是一個等級，照「+1% 要幾鑽」排（左邊便宜、右邊貴，每格 ×10）。有數字的點是下面工具算出的你的下一步；淡色的是我們伺服器還沒開放的紅色裝備。點一下看價格。",
    rdTap: "點任何一個點，看它是什麼、要多少鑽。", moreH: "📖 更多：原因、依角色、寵物、還不知道的", petH: "寵物",
    nxRes: "我的研究在哪一階", nxMr: "羅曼已進階幾次", nxMv: "維拉已進階幾次", roman: "羅曼", valora: "維拉", nth: "第 {n} 次",
    nxH: "🎯 我的下一步", nxP: "照兵種選你現在的進度，下面列出你最划算的 8 個下一步（每 +1% 幾鑽），所有系統、兵種混在一起比。",
    nxCharm: "我的領主寶石（每個兵種大多在幾級）", troops: ["步兵", "騎兵", "弓兵"], nxGear: "我的領主裝備（每個兵種大多在哪一階）", nxPet: "我下一次寵物突破", nxMast: "主力英雄的專精鍛造", nxEnh: "那些主力裝備的強化等級", nxPetTip: "寵物升級：寵物口糧不難拿（獵豹技能每天 200–500、活動、聯盟商店），能升就升。稀有度越高，每級加的部隊攻防越多，但吃的口糧也越多，所以每 +1% 用的口糧每隻寵物都差不多（猞猁／野牛最省，約獅子的 0.8 倍）。真正卡住的是每 10 級一次的突破（有在上面排名）——同一級突破，N、R、SR 寵物的划算程度幾乎一樣。寵物洗練是寵物剩下最大的空間，而且全是殺傷力／生命值：寵物等級決定能洗到的最高品質（Lv10 灰、Lv20 綠、Lv30 藍、Lv40 紫、Lv50 神話）。藍色以前用普通馴化印記，藍升紫以上用高級馴化印記。",
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
    unkH: "🟡 還沒算的", unks: ["英雄專屬裝備（零件）：第 L 級要 5L 個，每 1% 約 0.36–0.5 × L 個——有香檳市集（每個 500 券）的話很划算，還沒換成鑽石。", "阿瑪迪斯／赫爾加專屬碎片的禮包價。", "真錢禮包（這裡只算聖契幣和鑽石）。", "寵物主動技能；寵物洗練只測了一隻。"],
    numH: "🔢 給想看數字的人", numP: "換算：1 聖契幣 ≈ 3.2 鑽（1 小時加速：鑽石商店 800 鑽、聖劍商店 250 聖契幣；研究立即完成也是約 800 鑽／小時）。換別的換算方式，數字會變，排序不變。「+1%」= 一個兵種、一種屬性；三個兵種一起加的屬性算 3 個。",
    numCols: ["升級項目", "每 1%（鑽）", "給什麼"],
    foot: "來源：Sparrow 主帳實測（實力 ↔ %、商店價格、研究時間）。不是遊戲官方說明，數字會隨更多測試修正。" },
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
// Master advancement with Master Emblems: the k-th advancement — Roman ≈ 4,000·k, Valora ≈ 8,300·k gems per 1% (Roman gives Attack + Defense, Valora only Attack)
const MAS = { r: (k) => 4000 * k, v: (k) => 8333 * k };
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
    <div class="iv-nxl"><b>${esc(t("nxGo"))}</b><ol>${cand.map((c) => `<li class="b${band(c.gems)}"><span class="iv-sys">${esc(S[c.sys])}${c.tr ? " · " + esc(c.tr) : ""}</span><span class="iv-lab">${esc(c.label)}</span><span class="iv-gem">${c.hi ? range(c.gems, c.hi) : fmt(c.gems)}</span></li>`).join("")}</ol></div>
    <div class="muted iv-small">${esc(t("nxNote"))}</div>`;
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
  <div class="iv-hero"><span class="iv-badge">${esc(t("badge").replace("{d}", UPDATED))}</span><h2>${esc(t("heroH"))}</h2><p>${esc(t("heroP"))}</p></div>
  <div class="iv-rules">${["ru1", "ru2", "ru3"].map((k, i) => `<div class="iv-rule"><span>${["🪜", "🔄", "🤝"][i]}</span><p>${esc(t(k))}</p></div>`).join("")}</div>
  <div class="card"><h3>${esc(t("ruH"))}</h3><p class="iv-p">${esc(t("ruP"))}</p><div id="iv_ruler">${rulerHtml()}</div>
    <div class="iv-key">${t("bands").map((b, i) => `<span><i class="zk b${i}"></i>${esc(b)}</span>`).join("")}</div></div>
  <div class="card"><h3>${esc(t("nxH"))}</h3><p class="iv-p">${esc(t("nxP"))}</p><div id="iv_nx">${nextHtml()}</div></div>
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
    <div class="muted iv-small">${esc(t("ggNote"))}</div></div></details>
  <div class="muted iv-small">${esc(t("foot"))}</div>`;
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
