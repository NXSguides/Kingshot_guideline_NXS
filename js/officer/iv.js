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
const ROWS = [["c1", 889, 889, "cheap"], ["pet", 3200, 3200, "cheap"], ["res", 3800, 14600, "mid"], ["hg1", 11100, 11100, "mid"], ["c25", 14700, 20000, "mid"],
  ["adv", 14200, 23200, "mid"], ["resl", 20500, 20500, "mid"], ["hg2", 22200, 55600, "dear"], ["c6", 40000, 701000, "dear"]];
ROWS.splice(1, 0, ["gg1", 513, 10165, "cheap"]); ROWS.splice(7, 0, ["gg2", 12424, 44844, "mid"]); ROWS.push(["gg3", 40157, 840727, "dear"]);
const T = {
  en: { title: "💎 Investment", intro: "Our research: the same gems buy very different amounts of stat %. Where is it cheapest, and who should spend where? Still being tested.",
    badge: "🧪 Still testing · from our own account and shop prices · updated {d}",
    heroH: "Same gems, very different results.", heroP: "The cheapest +1% (the first green Governor Gear step, Governor Charm Lv1) costs under 1,000 gems. Hero Gear Mastery Forging Lv5 costs about 56,000; red Governor Gear and the last charm levels cost 700,000–800,000 for the same 1%.",
    barH: "💰 Gems for +1%", barP: "Shorter bar = cheaper. Each bar is +1% to one stat of one troop type.",
    rows: { c1: "Governor Charm 0 → Lv1", pet: "Pet level-up (Alliance Shop food, weekly limit)", res: "Research — first levels of each tier", hg1: "Hero Gear Mastery Forging 0 → 1", c25: "Governor Charm Lv2–3",
      adv: "Pet advancement", gg1: "Governor Gear — green and blue", gg2: "Governor Gear — purple (Epic, incl. T1)", gg3: "Governor Gear — gold and red", resl: "Research — last level of each tier", hg2: "Hero Gear Mastery Forging 1 → 5", c6: "Governor Charm Lv4–22" },
    gives: { c1: "Lethality + Health, one troop type", pet: "Attack + Defense, all troops", res: "depends on the node (infantry Attack / Lethality cheapest)", hg1: "only while that hero is in the march", c25: "Lethality + Health, one troop type",
      adv: "Attack + Defense, all troops (Lv40 ≈ 14,200, Lv50 ≈ 23,200)", gg1: "Attack + Defense, one troop type", gg2: "Attack + Defense, one troop type", gg3: "every step dearer — see every step below", resl: "", hg2: "each level costs more (10 Forgehammers per level)", c6: "much more than everything else — see every level below" },
    chH: "💠 Governor Charms, every level", chP: "Gems for +1% at each level (taller = dearer; the scale grows ×10 per step). Lv1 is the cheapest thing in the game; from Lv2 a charm level costs about as much as pet advancement or Governor Gear; from Lv6 it is dearer than anything else on this page.",
    chTip: "So: every charm to Lv1 right away. Lv2–3 when you lack Lethality / Health on that troop type. Lv4 and up only after the cheaper upgrades are done — remember Lethality and Health are worth more per 1% (next card).",
    chCols: ["Level", "Guides + Designs", "% gained", "Total %", "Gems per 1%"],
    ggH: "🛡️ Governor Gear, every step", ggP: "Gems for +1% at each upgrade step of one piece, from the first green to Red T4 ★3 (taller = dearer; the scale grows ×10 per step). Green and blue are very cheap; purple about like pet advancement; from gold it climbs fast; red costs 10–40× purple.",
    ggTip: "So: get every piece to blue ★3 early, purple when you can. Gold and red only after charms Lv1–3, pets and research — unless you need the Deployment Capacity that red gear adds.",
    ggNote: "Materials: kingshotguide.com (purple–gold match our screenshots). Red T1 ★2 and up: power not published yet, worked out from the gear stat table. Red T5–T6: no data.",
    ggG: "Green · Blue", ggP2: "Purple", ggO: "Gold (T1–T3)", ggR: "Red (T1–T4)",
    ggTier: { g: "Green", b: "Blue", p: "Purple", p1: "Purple T1", o: "Gold", o1: "Gold T1", o2: "Gold T2", o3: "Gold T3", r: "Red", r1: "Red T1", r2: "Red T2", r3: "Red T3", r4: "Red T4" },
    ggCols: ["Step", "Satin / Gilded Threads / Artisan's Vision", "Relic Coins", "% gained", "Gems per 1%"],
    nxH: "🎯 My next step", nxP: "Pick where you are now. The list shows your cheapest next upgrades (gems per +1%), all systems mixed.",
    nxCharm: "Most of my Governor Charms are at", nxGear: "Most of my Governor Gear pieces are at", nxPet: "My next pet advancement", nxMast: "Main heroes' Mastery Forging", nxEnh: "Enhancement of those main pieces", nxPetTip: "Pet level-ups: pet food is easy to get, so level up whenever you can — rarer pets first (at Lv50 an SR Lion gives ~12.9% troop Attack / Defense, an N Wolf ~4.4%). The real limit is the advancement every 10 levels, which is in the list.",
    nxNone: "none yet", nxLv: "Lv{n}", nxPetOpt: ["Lv40", "Lv50", "already past Lv50"], nxMax: "maxed", nxGo: "Do these first:", nxNote: "Same gems, most %. Lethality / Health (Governor Charms) are worth a bit more than they look, Attack / Defense (pets) a bit less.",
    sys: { c: "💠 Governor Charm", g: "🛡️ Governor Gear", pu: "🐾 Pet level-up", pa: "🐾 Pet advancement", r: "🔬 Research", m: "🔨 Mastery Forging" },
    resFirst: "first levels of a tier", resLast: "last level of a tier", petUp: "weekly food", from: "→",
    bdH: "🗂️ Price bands", bdP: "Every upgrade, sorted by how many gems +1% costs. Same row = about the same value for your gems.",
    bands: ["Very cheap (under 5,000)", "Cheap (5,000–15,000)", "Middle (15,000–30,000)", "Dear (30,000–60,000)", "Very dear (60,000+)"],
    detH: "📊 Each system, level by level",
    cheap: "best value", mid: "middle", dear: "most expensive",
    rot: "Every system gets dearer the higher you go — the first levels of each one are the bargains. So don't push one system to the top: keep upgrading whichever system's next step is cheapest right now.",
    lowH: "📉 Lethality and Health are worth more", lowP: "Most players have far less Lethality and Health than Attack and Defense. The lower a stat is, the more +1% changes it — so Governor Charms are even better than the bars show, and pets a little worse.",
    lowA: "Stat at 50%", lowB: "Stat at 300%", lowS: "+1% adds", lowFoot: "Value of +1% ≈ 1 ÷ (100 + current %)",
    rlH: "👑 Rally leaders", rlP: "Only the leader's own stats count in a rally. Spend in this order:",
    rl: ["Every Governor Charm to Lv1 and every Governor Gear piece to blue ★3 first — both very cheap.", "Pet level-ups whenever you have food — rarer pets first.", "Research — keep going; the first levels of each tier are the best deal. Main heroes' Hero Gear Mastery Forging to Lv1.",
      "Then Governor Charm Lv2–3, pet advancement, purple (Epic) Governor Gear and Mastery Forging Lv2 — about the same value; pick the stat and troop type you lack.", "Mastery Forging Lv3+, Governor Charm Lv4+ and gold / red Governor Gear cost the most — last."],
    rlTroop: "Which troop type: PvP — infantry Defense / Health, cavalry and archer Attack / Lethality. Bear Hunt — archers.",
    rlHero: "Owning these heroes at full stars gives a bonus all the time — possibly a great deal for paying leaders (cost not worked out yet):",
    amadeus: "Amadeus: all troops Lethality + Health +15%", helga: "Helga: all troops Attack + Defense +10%",
    joH: "🤝 Joiners", joP: "Your own combat stats don't count when you join someone's rally.",
    joYes: "Worth it", joYesL: ["Troop tier (Truegold / TG)", "Your first hero's top-right skill"],
    joNo: "Not for rallies", joNoL: ["Combat stats — they only help when you attack alone, defend your own city or get hit while gathering."],
    joIf: "If you still want to spend: Governor Charm Lv1 and pet level-ups give the most power per gem — and so the most Migrant Score (Swordland Showdown, kingdom rating). Charms, pets, research and Hero Gear count the same there.",
    unkH: "🟡 Not worked out yet", unks: ["Hero Exclusive Gear (Widgets): cost per 1%.", "Masters (Valora, Roman): cost per 1%.", "Hero Gear enhancement (XP) cost.", "Cost of Amadeus / Helga to full stars.", "Real-money packs (this uses Relic Coins and gems only).", "Pet active skills and refining."],
    numH: "🔢 For those who want the numbers", numP: "Exchange rate: 1 Relic Coin ≈ 3.2 gems (1 h speedup = 800 gems in the Gem Shop or 250 Relic Coins in the Swordland Shop; finishing research instantly is also ≈ 800 gems per hour). Another rate changes the numbers, not the order. \"+1%\" = one stat of one troop type; a stat for all three troop types counts as 3.",
    numCols: ["Upgrade", "Gems per 1%", "Gives"],
    foot: "Source: Sparrow's main account (power ↔ %, shop prices, research times). Not from the game. Numbers will be corrected as we test more." },
  zh: { title: "💎 投資效率", intro: "我們自己的研究：同樣的鑽石，換到的屬性 % 差非常多。哪裡最划算？什麼角色該花在哪？還在測試中。",
    badge: "🧪 測試中 · 來自我們自己的帳號和商店價格 · 更新 {d}",
    heroH: "同樣的鑽石，效果差很多。", heroP: "最便宜的 +1%（第一件綠色領主裝備、領主寶石 Lv1）不到 1,000 鑽；英雄裝備專精鍛造 Lv5 大約 56,000 鑽；紅色領主裝備、寶石最後幾級，同樣 1% 要 70–80 萬鑽。",
    barH: "💰 +1% 要多少鑽石", barP: "長條越短越划算。每一條都是「一個兵種、一種屬性 +1%」。",
    rows: { c1: "領主寶石 0 → Lv1", pet: "寵物升級（聯盟商店口糧，每週限量）", res: "研究——每階的前幾級", hg1: "英雄裝備專精鍛造 0 → 1", c25: "領主寶石 Lv2–3",
      adv: "寵物突破", gg1: "領主裝備——綠色、藍色", gg2: "領主裝備——紫色（史詩，含 T1）", gg3: "領主裝備——金色、紅色", resl: "研究——每階最後一級", hg2: "英雄裝備專精鍛造 1 → 5", c6: "領主寶石 Lv4–22" },
    gives: { c1: "單一兵種 殺傷力＋生命值", pet: "全部隊 攻擊力＋防禦力", res: "看節點（步兵攻擊力／殺傷力最便宜）", hg1: "只有那位英雄出戰時有效", c25: "單一兵種 殺傷力＋生命值",
      adv: "全部隊 攻擊力＋防禦力（Lv40 約 14,200、Lv50 約 23,200）", gg1: "單一兵種 攻擊力＋防禦力", gg2: "單一兵種 攻擊力＋防禦力", gg3: "每一階越來越貴——每一階見下面", resl: "", hg2: "每級越來越貴（每級多 10 個鍛造錘）", c6: "比其他所有項目都貴很多——每一級見下面" },
    chH: "💠 領主寶石：每一級", chP: "每一級 +1% 要多少鑽（越高越貴；刻度每格 ×10）。Lv1 是全遊戲最划算的；Lv2 起每級大約跟寵物突破、領主裝備同級；Lv6 以上比這頁所有東西都貴。",
    chTip: "所以：寶石全部馬上開到 Lv1。那個兵種缺殺傷力／生命值時再升 Lv2–3。Lv4 以上等比較便宜的都升完再說——別忘了殺傷力、生命值每 1% 比較值錢（下一張卡）。",
    chCols: ["等級", "手冊＋圖紙", "加多少 %", "累計 %", "每 1%（鑽）"],
    ggH: "🛡️ 領主裝備：每一階", ggP: "一件裝備每升一階，+1% 要多少鑽（從第一階綠色到紅 T4 3★；越高越貴，刻度每格 ×10）。綠、藍非常便宜；紫色大約跟寵物突破同級；金色開始漲很快；紅色是紫色的 10–40 倍。",
    ggTip: "所以：每件先升到藍 3★，有餘力再升紫。金色、紅色等寶石 Lv1–3、寵物、研究都弄好再說——除非你需要紅裝才有的出征容量。",
    ggNote: "材料：kingshotguide.com（紫～金跟我們的截圖一致）。紅 T1 2★ 以上的實力網站還沒公布，是照裝備屬性表推算的。紅 T5–T6 沒有資料。",
    ggG: "綠・藍", ggP2: "紫", ggO: "金（T1–T3）", ggR: "紅（T1–T4）",
    ggTier: { g: "綠", b: "藍", p: "紫", p1: "紫 T1", o: "金", o1: "金 T1", o2: "金 T2", o3: "金 T3", r: "紅", r1: "紅 T1", r2: "紅 T2", r3: "紅 T3", r4: "紅 T4" },
    ggCols: ["階", "綢緞／金絲線／匠心願景", "聖契幣", "加多少 %", "每 1%（鑽）"],
    nxH: "🎯 我的下一步", nxP: "選你現在的進度，下面就列出你最划算的下一個升級（每 +1% 幾鑽），所有系統混在一起比。",
    nxCharm: "我的領主寶石大多在", nxGear: "我的領主裝備大多在", nxPet: "我下一次寵物突破", nxMast: "主力英雄的專精鍛造", nxEnh: "那些主力裝備的強化等級", nxPetTip: "寵物升級：寵物口糧不難拿，能升就升——先升稀有度高的（Lv50 時 SR 獅子部隊攻防約 12.9%、N 灰狼約 4.4%）。真正卡住的是每 10 級一次的突破，那個有在上面排名。",
    nxNone: "還沒有", nxLv: "Lv{n}", nxPetOpt: ["Lv40", "Lv50", "已經超過 Lv50"], nxMax: "已滿", nxGo: "先做這些：", nxNote: "同樣的鑽石換到最多 %。殺傷力、生命值（領主寶石）實際上比看起來更值錢一點，攻擊力、防禦力（寵物）稍微少一點。",
    sys: { c: "💠 領主寶石", g: "🛡️ 領主裝備", pu: "🐾 寵物升級", pa: "🐾 寵物突破", r: "🔬 研究", m: "🔨 專精鍛造" },
    resFirst: "每階前幾級", resLast: "每階最後一級", petUp: "每週口糧", from: "→",
    bdH: "🗂️ 價格帶", bdP: "所有升級照「+1% 要幾鑽」分成五層。同一層＝同樣的鑽石，效果差不多。",
    bands: ["很便宜（5,000 以下）", "便宜（5,000–15,000）", "中等（15,000–30,000）", "貴（30,000–60,000）", "很貴（60,000 以上）"],
    detH: "📊 各系統每一級",
    cheap: "最划算", mid: "中間", dear: "最貴",
    rot: "每個系統都是越升越貴，最划算的是每個系統的前幾級。所以不要一個系統衝到底，而是輪流升「現在各系統裡最便宜的那一級」。",
    lowH: "📉 殺傷力、生命值比較值錢", lowP: "大多數人的殺傷力、生命值都比攻擊力、防禦力低很多。屬性越低，多 1% 的感覺越明顯——所以領主寶石實際上比長條看起來更划算，寵物稍微差一點。",
    lowA: "屬性 50% 時", lowB: "屬性 300% 時", lowS: "+1% 等於變強", lowFoot: "+1% 的價值 ≈ 1 ÷（100 + 目前 %）",
    rlH: "👑 集結隊長", rlP: "集結只看隊長自己的屬性。照這個順序花：",
    rl: ["領主寶石全部先開到 Lv1、領主裝備每件先升到藍 3★——兩個都非常便宜。", "寵物升級——有口糧就升，先升稀有度高的。", "研究——持續點；每階前幾級最划算。主力英雄的英雄裝備專精鍛造先升到 Lv1。",
      "接著是領主寶石 Lv2–3、寵物突破、紫色（史詩）領主裝備、專精鍛造 Lv2——效率差不多，挑自己缺的屬性和兵種。", "專精鍛造 Lv3 以上、領主寶石 Lv4 以上、金色／紅色領主裝備最貴——放最後。"],
    rlTroop: "兵種優先：PvP——步兵防禦力／生命值、騎兵和弓兵攻擊力／殺傷力。狩獵巨熊——弓兵。",
    rlHero: "擁有這兩位滿星英雄就一直有加成——對課金隊長可能非常划算（成本還沒算）：",
    amadeus: "阿瑪迪斯：全部隊 殺傷力＋生命值 +15%", helga: "赫爾加：全部隊 攻擊力＋防禦力 +10%",
    joH: "🤝 加入者", joP: "加入別人的集結時，你自己的戰鬥屬性不算。",
    joYes: "值得投資", joYesL: ["兵等（黃金 TG）", "第一位英雄的右上技能"],
    joNo: "集結裡沒用", joNoL: ["戰鬥屬性——只有自己單打、守自己城、採集被打時才有用。"],
    joIf: "如果還是想花：同樣的鑽石，領主寶石 Lv1 和寵物升級換到的實力最多，遷城分數（聖劍爭奪、王國評級）也最多。寶石、寵物、研究、英雄裝備在遷城分數裡的權重一樣。",
    unkH: "🟡 還沒算的", unks: ["英雄專屬裝備（零件）每 1% 要多少。", "大師（維拉、羅曼）每 1% 要多少。", "英雄裝備強化（經驗）的成本。", "阿瑪迪斯／赫爾加升到滿星的成本。", "真錢禮包（這裡只算聖契幣和鑽石）。", "寵物主動技能、洗煉。"],
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
  out.push({ sys: "pa", key: "pa40", label: "Lv40", gems: 14200, grp: "pa" }, { sys: "pa", key: "pa50", label: "Lv50", gems: 23200, grp: "pa" });
  out.push({ sys: "r", key: "r1", label: t("resFirst"), gems: 3800, hi: 14600, grp: "r1" }, { sys: "r", key: "r2", label: t("resLast"), gems: 20500, grp: "r2" });
  for (let L = 0; L < 5; L++) out.push({ sys: "m", key: "m" + L, label: "Lv" + (L + 1), gems: mastGems(L), grp: "m" });
  return out;
}
const NX = { c: 0, g: -1, pa: 0, m: 0, e: 60 };
// Mastery Forging L → L+1: 10(L+1) Forgehammers (1 = 1,250 Relic Coins ≈ 4,000 gems); each level adds 10% of the piece's base stat (15% + 0.35% × enhancement)
const mastGems = (L) => 10 * (L + 1) * 4000 / ((15 + 0.35 * (NX.e || 60)) * 0.1);
try { Object.assign(NX, JSON.parse(localStorage.getItem("nxs-iv") || "{}")); } catch (e) {}
const keepNx = () => { try { localStorage.setItem("nxs-iv", JSON.stringify(NX)); } catch (e) {} };
function nextHtml() {
  const S = t("sys"), cand = [];
  for (let k = 0; k < 2; k++) if (NX.c + k < CHARM.length) cand.push({ sys: "c", label: `Lv${NX.c + k} ${t("from")} Lv${NX.c + k + 1}`, gems: charmGems(NX.c + k) });
  for (let k = 1; k <= 2; k++) if (NX.g + k < GEAR.length) cand.push({ sys: "g", label: (NX.g + k ? gearName(NX.g + k - 1) + ` ${t("from")} ` : "") + gearName(NX.g + k), gems: gearGems(NX.g + k) });
  if (NX.pa < 2) cand.push({ sys: "pa", label: ["Lv40", "Lv50"][NX.pa], gems: [14200, 23200][NX.pa] });
  cand.push({ sys: "r", label: t("resFirst"), gems: 3800, hi: 14600 });
  for (let k = 0; k < 2; k++) if (NX.m + k < 5) cand.push({ sys: "m", label: `${NX.m + k} ${t("from")} ${NX.m + k + 1}`, gems: mastGems(NX.m + k) });
  cand.sort((a, b) => a.gems - b.gems);
  const opt = (n, v, lab) => `<option value="${v}"${n === v ? " selected" : ""}>${esc(lab)}</option>`;
  return `<div class="iv-nxin">
      <label>${esc(t("nxCharm"))}<select class="inp" id="iv_c">${Array.from({ length: 23 }, (_, n) => opt(NX.c, n, n ? t("nxLv").replace("{n}", n) : t("nxNone"))).join("")}</select></label>
      <label>${esc(t("nxGear"))}<select class="inp" id="iv_g">${opt(NX.g, -1, t("nxNone"))}${GEAR.map((g, i) => opt(NX.g, i, gearName(i))).join("")}</select></label>
      <label>${esc(t("nxPet"))}<select class="inp" id="iv_pa">${t("nxPetOpt").map((x, i) => opt(NX.pa, i, x)).join("")}</select></label>
      <label>${esc(t("nxMast"))}<select class="inp" id="iv_m">${Array.from({ length: 6 }, (_, n) => opt(NX.m, n, n === 5 ? `Lv5+ (${t("nxMax")})` : "Lv" + n)).join("")}</select></label>
      <label>${esc(t("nxEnh"))}<select class="inp" id="iv_e">${[40, 60, 80, 100].map((n) => opt(NX.e, n, "+" + n)).join("")}</select></label></div>
    <div class="iv-nxl"><b>${esc(t("nxGo"))}</b><ol>${cand.slice(0, 6).map((c) => `<li class="b${band(c.gems)}"><span class="iv-sys">${esc(S[c.sys])}</span><span class="iv-lab">${esc(c.label)}</span><span class="iv-gem">${c.hi ? range(c.gems, c.hi) : fmt(c.gems)}</span></li>`).join("")}</ol></div>
    <p class="iv-pet">🐾 ${esc(t("nxPetTip"))}</p>
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
  <div class="card"><h3>${esc(t("nxH"))}</h3><p class="iv-p">${esc(t("nxP"))}</p><div id="iv_nx">${nextHtml()}</div></div>
  <div class="card"><h3>${esc(t("bdH"))}</h3><p class="iv-p">${esc(t("bdP"))}</p><div id="iv_bd">${bandsHtml()}</div><p class="iv-rot">🔄 ${esc(t("rot"))}</p></div>
  <details class="card iv-det"><summary><b>${esc(t("detH"))}</b></summary>
  <div class="card"><h3>${esc(t("barH"))}</h3><p class="iv-p">${esc(t("barP"))}</p>
    <div class="iv-bars">${ROWS.map(([k, lo, hi, kind]) => `<div class="iv-row"><div class="iv-k">${esc(R[k])}${G[k] ? `<small>${esc(G[k])}</small>` : ""}</div>
      <div class="iv-b${hi > MAX ? " over" : ""}"><i class="${kind}" style="left:0;width:${(Math.min(lo, MAX) / MAX * 100).toFixed(1)}%"></i>${hi > lo ? `<i class="${kind} rng" style="left:${(Math.min(lo, MAX) / MAX * 100).toFixed(1)}%;width:${((Math.min(hi, MAX) - Math.min(lo, MAX)) / MAX * 100).toFixed(1)}%"></i>` : ""}</div>
      <div class="iv-v">${range(lo, hi)}</div></div>`).join("")}</div>
    <div class="iv-key"><span><i class="cheap"></i>${esc(t("cheap"))}</span><span><i class="mid"></i>${esc(t("mid"))}</span><span><i class="dear"></i>${esc(t("dear"))}</span></div>
</div>
  <div class="card"><h3>${esc(t("chH"))}</h3><p class="iv-p">${esc(t("chP"))}</p>
    <div class="iv-ch">${CHARM.map((c, i) => { const g = charmGems(i), h = (Math.log10(g) - 2.5) / (6 - 2.5) * 100, k = g < 10000 ? "cheap" : g < 60000 ? "mid" : "dear";
      return `<div title="Lv${i + 1}: ${fmt(g)}"><b>${i === 0 || i === 4 || i === 10 || i === 21 ? (g >= 1e5 ? Math.round(g / 1000) + "k" : g >= 1e4 ? Math.round(g / 1000) + "k" : fmt(g)) : ""}</b><i class="${k}" style="height:${h.toFixed(0)}%"></i><small>${i + 1}</small></div>`; }).join("")}</div>
    <p class="iv-p" style="margin-top:10px">💡 ${esc(t("chTip"))}</p></div>
  <div class="card"><h3>${esc(t("ggH"))}</h3><p class="iv-p">${esc(t("ggP"))}</p>
    <div class="iv-ch gg">${GEAR.map((g, i) => { const v = gearGems(i), h = (Math.log10(v) - 2.5) / (6 - 2.5) * 100, k = "t-" + g[0][0], first = !i || GEAR[i - 1][0] !== g[0], TT = t("ggTier");
      return `<div title="${esc(TT[g[0]])} ★${i - GEAR.findIndex((x) => x[0] === g[0])}: ${fmt(v)}"${first ? ' class="t0"' : ""}><b>${first && ["g", "p", "o", "r"].includes(g[0]) ? (v >= 1e4 ? Math.round(v / 1000) + "k" : fmt(v)) : ""}</b><i class="${k}" style="height:${h.toFixed(0)}%"></i></div>`; }).join("")}</div>
    <div class="iv-ggk">${[["g", 6, "ggG"], ["p", 8, "ggP2"], ["o", 16, "ggO"], ["r", 20, "ggR"]].map(([k, n, lab]) => `<span style="flex:${n}">${esc(t(lab))}</span>`).join("")}</div>
    <p class="iv-p" style="margin-top:10px">💡 ${esc(t("ggTip"))}</p><div class="muted iv-small">${esc(t("ggNote"))}</div></div></details>
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
  <div class="card"><h3>${esc(t("unkH"))}</h3><ul class="iv-ul">${t("unks").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <details class="card"><summary><b>${esc(t("numH"))}</b></summary><p class="iv-p" style="margin-top:8px">${esc(t("numP"))}</p>
    <div class="iv-tw"><table class="iv-t"><tr>${t("numCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${ROWS.map(([k, lo, hi]) => `<tr><td>${esc(R[k])}</td><td class="n">${range(lo, hi)}</td><td>${esc(G[k])}</td></tr>`).join("")}</table>
    <table class="iv-t"><tr>${t("chCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${CHARM.map((c, i) => `<tr><td>Lv${i + 1}</td><td class="n">${fmt(c[0])}</td><td class="n">+${c[1]}%</td><td class="n">${CHARM.slice(0, i + 1).reduce((a, x) => a + x[1], 0)}%</td><td class="n">${fmt(charmGems(i))}</td></tr>`).join("")}</table>
    <table class="iv-t"><tr>${t("ggCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${GEAR.map((g, i) => `<tr><td>${esc(t("ggTier")[g[0]])} ★${i - GEAR.findIndex((x) => x[0] === g[0])}</td><td class="n">${fmt(g[1])} / ${fmt(g[2])} / ${fmt(g[3])}</td><td class="n">${fmt(gearCoins(i))}</td><td class="n">+${gearPct(i).toFixed(2)}%</td><td class="n">${fmt(gearGems(i))}</td></tr>`).join("")}</table></div></details>
  <div class="muted iv-small">${esc(t("foot"))}</div>`;
  bind();
}
function bind() {
  const redo = () => { keepNx(); const n = $("iv_nx"); if (n) { n.innerHTML = nextHtml(); bind(); } const bd = $("iv_bd"); if (bd) bd.innerHTML = bandsHtml(); };
  for (const [id, k] of [["iv_c", "c"], ["iv_g", "g"], ["iv_pa", "pa"], ["iv_m", "m"], ["iv_e", "e"]]) { const el = $(id); if (el) el.onchange = () => { NX[k] = +el.value; redo(); }; }
}
function init() { applyTexts(); render(); }
function applyTexts() { if ($("iv_title")) { $("iv_title").textContent = t("title"); $("iv_intro").textContent = t("intro"); } }
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.iv = { init, applyTexts, setLang };
})();
