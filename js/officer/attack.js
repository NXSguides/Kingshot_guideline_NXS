/* NXS officer page — ⚔️ Attack planner (registers OFFICER_PAGES.attack; own tab, nobody by default, admins always).
   Simple version (Sherry, 2026-10-30): everything comes from TODAY's MightPulse boards — no old battle-report stats to keep up.
   - Strength of a leader S = Governor gear + Hero equip + Master power (millions), from the newest daily snapshot
     (data/mp-history/, scripts/mp-history.js). Only players in the kingdom top 100 of all three boards have it.
   - r = (S_us / S_them)^B × (tier_us / tier_them)² × buffs. B = 1.06 comes from 7 NXS rally leaders whose real troop stats
     we saw on rally screens (10/28–29): stat quality ∝ S^1.06, R² 0.95 (Project doc claude/mightpulse-stat-check.md).
     That relation stays; the S values themselves are read fresh every day.
   - 🗡️ Swordland mode (2026-10-30): our list from a shared 📊 Ranking plan (substitutes from the plan, switchable here), the opposing
     alliance fetched on the spot through the Worker ({sspull}), and three answers for "confirmed only" and "with substitutes":
     can we take the Swordshrine, the smallest garrison that holds against their top K rallies (G^p = Σ r_i R^p), and who to watch.
   - ⚔️ / 🛡️ direction, joiner tier "mix" (mean of tier²), troop ratio per role (attackers 50:20:30, garrison 60:20:20 by default; checked only, not in the numbers).
   - Per rally R vs garrison G (p ≈ 1.75): G^p − r R^p stays constant; r R^p > G^p → we take it and (R^p − G^p / r)^(1/p) of ours
     stay as the new garrison; else their garrison drops to (G^p − r R^p)^(1/p) (+ reinforcements). Spec: claude/attack-planner-spec.md. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const B = 1.06;
const TIER = { T9: 1.0, T10: 1.18, TG1: 1.228, TG2: 1.289, TG3: 1.353 };
const T = {
  en: { title: "⚖️ Compare", intro: "Compare two players (⚖️), see today's strength of the main players, and scout other kingdoms (🔭, e.g. the KvK opponent).",
    aT: "⚔️ Plan the attack", tgt: "Target", tLead: "Their garrison leader", tG: "Garrison troops", tTier: "Their tier", terr: "In their own territory (+10% all)", us: "Our rallies (in order)", lead: "Leader", size: "Troops", tier: "Tier", addR: "➕ Rally", more: "More settings", debUs: "Their debuff on us (attack/defense −%)", debThem: "Our debuff on them (−%)", p: "p (1.5 – 2)", reinf: "Reinforcements between rallies", pick: "— choose —",
    res: "Result", colR: "Rally", colS: "Strength", colOut: "Result", win: "✅ We take it — {s} of ours stay", lose: "❌ Lost — {g} of theirs left", need: "Rallies like #1 needed: about {n}.", last: "Send expendable rallies first and the strongest leader last — the last rally's survivors hold the building.", one: "One of their troops ≈ {x} of ours (r = {r}).",
    unc: "Rallies like #1 needed for other garrison sizes and p:", caveat: "Rough estimate: it under-rates attackers (B24: model ≈ 300k left, real 587k). Not counted: hero skill kills, troop counters; a garrison may use its strongest member's stats.", noR: "Choose their garrison leader and at least one of our leaders.",
    bT: "📊 Today's strength", bNote: "Strength = Governor gear + Hero equip + Master power (millions). Only players in the kingdom top 100 of all three boards have one.", bData: "Boards from {d} · kingdom {k}", bNoData: "No MightPulse boards yet (saved every day at 20:45 UTC).", bOurs: "NXS", bThem: "Others", bFind: "Search a player…", bMiss: "below the top 100 on {b}", gear: "Gov gear", heq: "Hero equip", mst: "Master" },
  zh: { title: "⚖️ 比一比", intro: "比較兩個人（⚖️）、看今天各方主力的強度、偵查其他王國（🔭，例如 KvK 對手）。",
    aT: "⚔️ 規劃進攻", tgt: "目標", tLead: "對方駐守隊長", tG: "守軍兵數", tTier: "對方兵等", terr: "在他們自己的領地（四項 +10%）", us: "我們的集結（照順序）", lead: "隊長", size: "兵數", tier: "兵等", addR: "➕ 集結", more: "更多設定", debUs: "對方給我們的減益（攻擊／防禦 −%）", debThem: "我們給對方的減益（−%）", p: "p（1.5 – 2）", reinf: "每波之間對方補兵", pick: "— 選擇 —",
    res: "結果", colR: "集結", colS: "強度", colOut: "結果", win: "✅ 打下來了——我們剩 {s}", lose: "❌ 輸了——對方剩 {g}", need: "照第 1 波這種集結：大約要 {n} 波。", last: "可以犧牲的集結先上，最強的隊長最後——最後一波的生還者會守建築。", one: "對方一個兵 ≈ 我們 {x} 個兵（r = {r}）。",
    unc: "換成其他守軍兵數和 p，照第 1 波這種集結要幾波：", caveat: "粗估：會低估攻方（B24：模型剩約 30 萬，實際 58.7 萬）。沒算到：英雄技能擊殺、兵種相剋；守軍可能用裡面最強的人的屬性。", noR: "請選對方駐守隊長，和至少一位我們的隊長。",
    bT: "📊 今天的強度", bNote: "強度 = 領主裝備 + 英雄裝備 + 大師戰力（百萬）。三個榜都在王國前 100 名的人才有強度。", bData: "排行榜日期 {d} · 王國 {k}", bNoData: "還沒有 MightPulse 排行榜資料（每天 20:45 UTC 存一份）。", bOurs: "NXS", bThem: "其他聯盟", bFind: "搜尋玩家…", bMiss: "{b} 不在前 100 名", gear: "領主裝備", heq: "英雄裝備", mst: "大師" },
  pt: { title: "⚖️ Comparar", intro: "Compare dois jogadores (⚖️), veja a força de hoje dos principais jogadores e espie outros reinos (🔭, ex.: o adversário do KvK).",
    aT: "⚔️ Planejar o ataque", tgt: "Alvo", tLead: "Líder da guarnição deles", tG: "Tropas da guarnição", tTier: "Nível deles", terr: "No território deles (+10% em tudo)", us: "Nossos rallies (em ordem)", lead: "Líder", size: "Tropas", tier: "Nível", addR: "➕ Rally", more: "Mais opções", debUs: "Debuff deles em nós (ataque/defesa −%)", debThem: "Nosso debuff neles (−%)", p: "p (1,5 – 2)", reinf: "Reforços entre rallies", pick: "— escolha —",
    res: "Resultado", colR: "Rally", colS: "Força", colOut: "Resultado", win: "✅ Tomamos — ficam {s} nossos", lose: "❌ Perdemos — restam {g} deles", need: "Rallies como o nº 1 necessários: cerca de {n}.", last: "Mande os rallies dispensáveis primeiro e o líder mais forte por último — os sobreviventes do último seguram o prédio.", one: "Uma tropa deles ≈ {x} das nossas (r = {r}).",
    unc: "Rallies como o nº 1 necessários para outros tamanhos e p:", caveat: "Estimativa: subestima o atacante (B24: modelo ≈ 300 mil, real 587 mil). Fora: mortes por habilidades, vantagens de tipo; a guarnição pode usar os atributos do membro mais forte.", noR: "Escolha o líder da guarnição deles e pelo menos um líder nosso.",
    bT: "📊 Força de hoje", bNote: "Força = Equip. do governador + Equip. de heróis + Poder de mestre (milhões). Só quem está no top 100 do reino nos três tem força.", bData: "Rankings de {d} · reino {k}", bNoData: "Ainda sem rankings do MightPulse (salvos todo dia às 20:45 UTC).", bOurs: "NXS", bThem: "Outros", bFind: "Procurar jogador…", bMiss: "fora do top 100 em {b}", gear: "Equip. gov.", heq: "Equip. heróis", mst: "Mestre" },
  ar: { title: "⚖️ المقارنة", intro: "قارن بين لاعبَين (⚖️)، وشاهد قوة اليوم لأقوى اللاعبين، واستطلع ممالك أخرى (🔭، مثل خصم KvK).",
    aT: "⚔️ خطّط الهجوم", tgt: "الهدف", tLead: "قائد حاميتهم", tG: "جنود الحامية", tTier: "مستواهم", terr: "في أرضهم (+10% للكل)", us: "حشودنا (بالترتيب)", lead: "القائد", size: "الجنود", tier: "المستوى", addR: "➕ حشد", more: "إعدادات أخرى", debUs: "إضعافهم علينا (هجوم/دفاع −%)", debThem: "إضعافنا عليهم (−%)", p: "p (1.5 – 2)", reinf: "تعزيزات بين الحشود", pick: "— اختر —",
    res: "النتيجة", colR: "حشد", colS: "القوة", colOut: "النتيجة", win: "✅ نأخذه — يبقى {s} من جنودنا", lose: "❌ خسرنا — يبقى {g} من جنودهم", need: "حشود مثل رقم 1 المطلوبة: نحو {n}.", last: "أرسل الحشود التي يمكن التضحية بها أولًا والقائد الأقوى أخيرًا — الناجون من آخر حشد يحمون المبنى.", one: "جندي واحد منهم ≈ {x} من جنودنا (r = {r}).",
    unc: "عدد الحشود مثل رقم 1 لأحجام وقيم p أخرى:", caveat: "تقدير تقريبي: يقلّل من قوة المهاجم (B24: النموذج ≈ 300 ألف، الفعلي 587 ألفًا). غير محسوب: قتلى المهارات وأفضلية الأنواع؛ قد تستخدم الحامية إحصاءات أقوى عضو.", noR: "اختر قائد حاميتهم وقائدًا واحدًا على الأقل منا.",
    bT: "📊 قوة اليوم", bNote: "القوة = عتاد الحاكم + عتاد الأبطال + قوة المعلّم (بالملايين). فقط من هو ضمن أفضل 100 في المملكة في اللوحات الثلاث له قوة.", bData: "لوحات {d} · المملكة {k}", bNoData: "لا توجد لوحات MightPulse بعد (تُحفظ يوميًا 20:45 UTC).", bOurs: "NXS", bThem: "آخرون", bFind: "ابحث عن لاعب…", bMiss: "خارج أفضل 100 في {b}", gear: "عتاد الحاكم", heq: "عتاد الأبطال", mst: "المعلّم" },
  ko: { title: "⚖️ 비교", intro: "두 사람을 비교하고 (⚖️), 오늘 주력들의 강도를 보고, 다른 왕국을 정찰해요 (🔭, 예: KvK 상대).",
    aT: "⚔️ 공격 계획 세우기", tgt: "목표", tLead: "그들 주둔 대장", tG: "주둔 병력", tTier: "그들 등급", terr: "그들 영토 안 (전부 +10%)", us: "우리 집결 (순서대로)", lead: "대장", size: "병력", tier: "등급", addR: "➕ 집결", more: "추가 설정", debUs: "그들이 우리에게 거는 디버프 (공격/방어 −%)", debThem: "우리가 거는 디버프 (−%)", p: "p (1.5 – 2)", reinf: "집결 사이 그들의 증원", pick: "— 선택 —",
    res: "결과", colR: "집결", colS: "강도", colOut: "결과", win: "✅ 점령 — 우리 {s} 남음", lose: "❌ 패배 — 그들 {g} 남음", need: "1번 같은 집결이 약 {n}번 필요해요.", last: "희생해도 되는 집결을 먼저, 가장 강한 대장을 마지막에 — 마지막 집결의 생존자가 건물을 지켜요.", one: "그들 병사 1명 ≈ 우리 {x}명 (r = {r}).",
    unc: "다른 주둔 병력과 p에서 1번 같은 집결이 몇 번 필요한지:", caveat: "대략적인 계산: 공격 쪽을 낮게 봐요 (B24: 모델 약 30만, 실제 58.7만). 계산에 없는 것: 영웅 스킬 처치, 병종 상성; 주둔군이 가장 강한 멤버의 능력치를 쓸 수도 있어요.", noR: "그들 주둔 대장과 우리 대장을 한 명 이상 고르세요.",
    bT: "📊 오늘의 강도", bNote: "강도 = 영주 장비 + 영웅 장비 + 마스터 전투력 (백만). 세 랭킹 모두 왕국 상위 100 안인 사람만 강도가 있어요.", bData: "랭킹 날짜 {d} · 왕국 {k}", bNoData: "아직 MightPulse 랭킹이 없어요 (매일 20:45 UTC 저장).", bOurs: "NXS", bThem: "다른 연맹", bFind: "플레이어 찾기…", bMiss: "{b} 상위 100 밖", gear: "영주 장비", heq: "영웅 장비", mst: "마스터" },
};
/* 🏰 in our kingdom vs ⚔️ KvK: who counts as "us" and "them" */
const MT = {"en": {"mHome": "🏰 In our kingdom", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "Other alliances in #2189", "usKvk": "Our kingdom #2189", "themKvk": "KvK opponent", "noKvk": "No other kingdom yet. In 🔭 Scout below, add the KvK opponent and tick “update daily” — press “Fetch now” — its players show here a few minutes later (refresh the page)."}, "zh": {"mHome": "🏰 王國內", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "#2189 其他聯盟", "usKvk": "我們王國 #2189", "themKvk": "KvK 對手", "noKvk": "還沒有其他王國的資料。在下面的 🔭 偵查加上 KvK 對手並勾「每天更新」，按「立即抓取」——幾分鐘後重新整理就會出現。"}, "pt": {"mHome": "🏰 No nosso reino", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "Outras alianças em #2189", "usKvk": "Nosso reino #2189", "themKvk": "Adversário do KvK", "noKvk": "Ainda sem outro reino. No 🔭 Espiar abaixo, adicione o adversário do KvK e marque “atualizar todo dia” — aperte “Buscar agora” — os jogadores aparecem aqui alguns minutos depois (atualize a página)."}, "ar": {"mHome": "🏰 داخل مملكتنا", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "تحالفات أخرى في ‎#2189", "usKvk": "مملكتنا ‎#2189", "themKvk": "خصم KvK", "noKvk": "لا توجد مملكة أخرى بعد. في 🔭 الاستطلاع بالأسفل أضف خصم KvK وفعّل «تحديث يومي» — اضغط «جلب الآن» — يظهر لاعبوه هنا بعد دقائق (حدّث الصفحة)."}, "ko": {"mHome": "🏰 우리 왕국 안", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "#2189 다른 연맹", "usKvk": "우리 왕국 #2189", "themKvk": "KvK 상대", "noKvk": "아직 다른 왕국이 없어요. 아래 🔭 정찰에서 KvK 상대를 추가하고 “매일 업데이트”를 체크하면 “지금 가져오기”를 누르세요 — 몇 분 뒤 새로고침하면 여기 나와요."}};
/* 🗡️ Swordland, ⚔️/🛡️ direction, tier mix, troop ratio (2026-10-30) — added on top of T / MT; same keys override the old wording */
const NT = {
  en: { ssNeed2:"Pick our plan and at least one of their players to see the estimate.", holdT:"🛡️ Hold the Swordshrine", holdRes:"Keep at least {g} troops in it ≈ {n} people", holdNote:"Against one rally of {lead} with {r} troops. Our garrison leader: {us}.", takeT:"⚔️ Take theirs", takeRes:"One rally of at least {r} troops ≈ {n} people (leader + joiners)", takeCap:"⚠️ More than our rally can hold ({cap}) — needs a stronger leader or a bigger rally.", takeNote:"Their garrison ≈ {g} troops, led by {lead}. Our rally leader: {us}.", haveT:"We have {n} people ≈ {t} troops ({per} each).", bothT:"Holding and taking at the same time needs {n} people.", rsT:"🔍 Who of [{tag}] is playing", rsNote:"Search their members (name or rank) and tick who is in this battle. Only ticked players go into the ranking and the estimate.", rsFind:"🔎 Search a name or R4…", rsSel:"{n} / {t} picked", rsNone:"Nobody picked yet — search above and tick their players.", rkNote2:"Our ticked list + their picked players, strongest first. 🎯 = the leader used in the estimate (tap again = back to the strongest). Tap one of ours: Confirmed ↔ Substitute. Tap one of theirs: ⚠️ watch.", ldUs:"Our leader for the estimate", ldThem:"Their leader for the estimate", estT:"📐 Estimate — one rally each way", ssSet3:"③ Settings", ssG0:"Their garrison troops (0 = their picked × troops each)", svT:"Saved opponents (on this device — kept until you delete them)", svOpen:"Open", svDel:"🗑 Delete", svAsk:"Delete the saved data of [{tag}] #{kid}?", auto:"⚡ Auto-arrange", autoNote:"Their strongest → garrison leader; our top {k} → rallies (weaker first, the strongest last), troops and tier from ③ Settings.", tgTitle:"Set as their garrison leader", raTitle:"Add to / remove from our rallies", tgTitleD:"Set as our garrison leader", raTitleD:"Add to / remove from their rallies", ssSet2:"③ Basic settings (used by ⚡ Auto-arrange)", find:"🔎 find a name", oppT:"Opponent alliance (optional): fetch it and only its players are listed", onlyOpp:"Only [{tag}]'s players", ssPlanT:"⚔️ Rallies: pick their garrison leader and our rally leaders (only people ticked as playing)", ssNeedOpp:"Fetch the opponent above first.", inL:"Playing", inNote:"Untick who isn't playing — they leave the ranking and every answer below.", inThem:"Them:", inUs:"Us:", inAll:"✓ All", inNone:"✗ None", inTop:"Only the top", offT:"Not ticked ({n}) — tick to add back", rkT:"📊 Both sides, by Strength", rkNote:"Our list and their alliance in one ranking. Tap one of ours: Confirmed ↔ Substitute. Tap one of theirs: ⚠️ watch (⚠️? = suggested: about as strong as our best leader, or stronger).", q3None:"Nobody marked yet — tap their players in the ranking above.", q3Sugg:"Suggested: {names}.", tTierD: "Our tier", mSs: "🗡️ Swordland", dirA: "⚔️ We attack", dirD: "🛡️ They attack us", tgtD: "Our garrison", tLeadD: "Our garrison leader", usD: "Their rallies (in order)",
    debUs: "Debuff on the attackers (attack/defense −%)", debThem: "Debuff on the garrison (−%)", terr: "Garrison in its own territory (+10% all)",
    winD: "❌ They take it — {s} of theirs stay", loseD: "✅ We hold — {g} of ours left", needD: "Rallies like their #1 needed to take it: about {n}.",
    holdD: "To hold against all these rallies at once: at least {g} troops in the building.", lastD: "Keep reinforcing between their rallies — every troop that arrives in time counts in full.",
    mix: "Mix…", mixNote: "Joiners by tier (head count)", mixEq: "≈ {t} on average",
    tr: "Troop ratio (Infantry : Cavalry : Archers)", trUs: "Attackers", trThem: "Garrison", trSum: "{s}: adds up to {n}%, not 100%.",
    trLow: "{s}: Infantry under 40%. In our simulation an even fight then lost far more troops (35:35:30 kept 14% fewer, 30:40:30 under half). The numbers here assume 50:20:30, so they are too kind.",
    trNote: "Defaults: attackers 50:20:30, garrison 60:20:20. The numbers don't change with it; the ratio is only checked.",
    ssT: "🗡️ Swordland — the Swordshrine", ssIntro: "The Swordshrine opens 15 minutes into the battle. Fetch the opponent at the start, then check: can we take it, how many must hold it, and who to watch.",
    ssOur: "① Our list", ssPlan: "Ranking plan", ssNoPlan: "No shared plans found (or no access to 📊 Ranking).", ssSubHint: "Tap a name to switch Confirmed ↔ Substitute. Substitutes come from the plan; switching here changes only this page.",
    conf: "Confirmed", subL: "Substitute", ssCnt: "{c} confirmed · {s} substitutes", nm: "Name", pw: "Power",
    ssOpp: "② Opponent alliance", ssKid: "Kingdom", ssTag: "Alliance tag", ssGo: "🔄 Fetch", ssBusy: "Fetching…",
    ssGot: "[{tag}] {name} · #{kid} · {n} members · fetched {t}", ssErrNF: "Alliance not found — check the kingdom number and the tag.", ssErr: "Couldn't fetch ({e}).",
    ssLogin: "Log in with Discord first (top of the page).", ssEstN: "{n} of them have a Strength from the boards; the rest are estimated from Power (≈).",
    ssSet: "③ Settings", ssK: "Rallies at the same time (each side)", ssR: "Our rally size", ssRt: "Their rally size", ssG: "Their garrison in the Swordshrine", ssPer: "Troops each member sends to hold",
    ssTu: "Our joiners' tier", ssTt: "Their joiners' tier",
    ssRes: "④ Result", cOnly: "Confirmed only", cSubs: "With substitutes",
    q1: "Can we take it?", q1win: "✅ Yes — after {n} rallies, {s} of ours stay in it.", q1lose: "❌ Not with {k} rallies — {g} of theirs are left. Rallies like {best}'s needed: about {n}.",
    q1Note: "Their garrison led by {lead} (their strongest). Order: {names} — weaker leaders first, the strongest last.",
    q2: "How many must hold it?", q2res: "At least {g} troops ≈ {n} people", q2Note: "against their top {k} rallies at once ({names}), our garrison led by {lead}.",
    q3: "Who to watch", q3Note: "⚠️ = as strong as our best leader, or stronger.",
    ssNeed: "Pick a plan and fetch the opponent to see the result.", ssEst: "≈ estimated from Power",
    ssCav: "Rough estimate, same model as the planner: hero skills, troop counters and building buffs (e.g. the Hall of Reformation) are not counted." },
  zh: { ssNeed2:"選好我們的計畫、至少勾一個對方的人，才算得出來。", holdT:"🛡️ 守住聖劍祭壇", holdRes:"駐防至少 {g} 兵 ≈ {n} 人", holdNote:"對手 {lead} 帶 {r} 兵打一團。我方駐守隊長：{us}。", takeT:"⚔️ 打下對方", takeRes:"一團至少 {r} 兵 ≈ {n} 人（隊長 + 跟集結）", takeCap:"⚠️ 超過我們一團裝得下的兵數（{cap}）——要更強的隊長或更大的集結。", takeNote:"對方駐防 ≈ {g} 兵，隊長 {lead}。我方集結隊長：{us}。", haveT:"我們有 {n} 人 ≈ {t} 兵（每人 {per}）。", bothT:"同時要守又要打，總共需要 {n} 人。", rsT:"🔍 [{tag}] 這次誰會參戰", rsNote:"搜尋他們的成員（名字或階級），勾選這次會參戰的人。只有勾選的人會進排名和估算。", rsFind:"🔎 搜尋名字或 R4…", rsSel:"已選 {n} / {t} 人", rsNone:"還沒選——在上面搜尋，勾選他們的人。", rkNote2:"我們勾選的名單 + 對方選好的人，依強度排。🎯 = 估算用的隊長（再點一次＝回到最強的）。點我們的人：確定 ↔ 替補。點對方的人：⚠️ 要注意。", ldUs:"估算用的我方隊長", ldThem:"估算用的對方隊長", estT:"📐 估算——各打一團", ssSet3:"③ 設定", ssG0:"對方駐防兵數（0 = 選好的人數 × 每人兵數）", svT:"已存的對手（存在這台裝置，刪掉之前都會留著）", svOpen:"打開", svDel:"🗑 刪除", svAsk:"刪除 [{tag}] #{kid} 存的資料？", auto:"⚡ 自動排", autoNote:"對方最強 → 駐守隊長；我方前 {k} 強 → 集結（弱的先上、最強最後），兵數和兵等用 ③ 基礎設定。", tgTitle:"設為對方駐守隊長", raTitle:"加入／移出我們的集結", tgTitleD:"設為我方駐守隊長", raTitleD:"加入／移出對方的集結", ssSet2:"③ 基礎設定（⚡ 自動排會用）", find:"🔎 找名字", oppT:"對方聯盟（選填）：抓下來之後只列他們的人", onlyOpp:"只列 [{tag}] 的人", ssPlanT:"⚔️ 集結安排：選對方駐守隊長和我們的集結隊長（只列勾了參戰的人）", ssNeedOpp:"先在上面抓對手聯盟。", inL:"參戰", inNote:"沒參戰的取消勾選——他們就不會出現在排名和下面所有分析。", inThem:"對方：", inUs:"我方：", inAll:"✓ 全勾", inNone:"✗ 全不勾", inTop:"只勾前", offT:"沒勾的（{n} 人）——勾回來就會加回去", rkT:"📊 雙方排名（依強度）", rkNote:"我們的名單和對方聯盟排在一起。點我們的人：確定 ↔ 替補。點對方的人：勾 ⚠️ 要注意（⚠️? = 建議注意：跟我們最強的隊長差不多強或更強）。", q3None:"還沒勾——在上面的排名點對方的人。", q3Sugg:"建議：{names}。", tTierD: "我方兵等", mSs: "🗡️ 聖劍", dirA: "⚔️ 我們進攻", dirD: "🛡️ 對方打我們", tgtD: "我方駐軍", tLeadD: "我方駐軍隊長", usD: "對方集結（依順序）",
    debUs: "攻方被減益（攻擊／防禦 −%）", debThem: "守方被減益（−%）", terr: "守方在自己領土（全屬性 +10%）",
    winD: "❌ 被打下——對方剩 {s}", loseD: "✅ 守住——我方剩 {g}", needD: "要打下需要像對方 #1 這樣的集結：約 {n} 團。",
    holdD: "同時擋下這些集結：建築裡至少要有 {g} 兵。", lastD: "對方集結之間要一直增援——及時到的兵全部都算。",
    mix: "混合…", mixNote: "加入集結的人（依兵等算人數）", mixEq: "平均約 {t}",
    tr: "兵種比例（步兵：騎兵：弓兵）", trUs: "攻方", trThem: "守方", trSum: "{s}：加起來是 {n}%，不是 100%。",
    trLow: "{s}：步兵低於 40%。我們的模擬裡，勢均力敵時會多死很多兵（35:35:30 少剩 14%，30:40:30 剩不到一半）。這裡的數字是用 50:20:30 算的，所以會太樂觀。",
    trNote: "預設：攻方 50:20:30，守方 60:20:20。比例不會改變計算結果，只用來檢查。",
    ssT: "🗡️ 聖劍爭奪——聖劍祭壇", ssIntro: "聖劍祭壇開戰 15 分鐘後開放。一開場先抓對手，再看：打不打得下、要放多少人守、誰要注意。",
    ssOur: "① 我們的名單", ssPlan: "排名計畫", ssNoPlan: "找不到共用計畫（或沒有 📊 排名的權限）。", ssSubHint: "點名字可以切換 確定 ↔ 替補。替補來自計畫；在這裡切換只影響這一頁。",
    conf: "確定", subL: "替補", ssCnt: "確定 {c} 人 · 替補 {s} 人", nm: "名字", pw: "戰力",
    ssOpp: "② 對手聯盟", ssKid: "王國", ssTag: "聯盟縮寫", ssGo: "🔄 抓取", ssBusy: "抓取中…",
    ssGot: "[{tag}] {name} · #{kid} · {n} 人 · {t} 抓取", ssErrNF: "找不到這個聯盟——檢查王國編號跟縮寫。", ssErr: "抓不到（{e}）。",
    ssLogin: "請先用 Discord 登入（頁面最上面）。", ssEstN: "其中 {n} 人有排行榜的強度；其他人用戰力估算（≈）。",
    ssSet: "③ 設定", ssK: "同時集結數（每邊）", ssR: "我方集結兵數", ssRt: "對方集結兵數", ssG: "對方在聖劍祭壇的駐軍", ssPer: "每人派去駐守的兵數",
    ssTu: "我方加入者兵等", ssTt: "對方加入者兵等",
    ssRes: "④ 結果", cOnly: "只算確定", cSubs: "加上替補",
    q1: "我們打得下嗎？", q1win: "✅ 可以——{n} 團之後，我方剩 {s} 留在裡面。", q1lose: "❌ {k} 團打不下——對方還剩 {g}。像 {best} 這樣的集結約需 {n} 團。",
    q1Note: "對方駐軍由 {lead} 帶（對方最強）。順序：{names}——弱的先上，最強的最後。",
    q2: "要放多少人守？", q2res: "至少 {g} 兵 ≈ {n} 人", q2Note: "同時擋對方最強 {k} 團（{names}），我方駐軍由 {lead} 帶。",
    q3: "值得警惕的人", q3Note: "⚠️ = 跟我們最強的隊長一樣強或更強。",
    ssNeed: "選一個計畫並抓取對手，就會出現結果。", ssEst: "≈ 用戰力估算",
    ssCav: "粗估，跟上面規劃同一個模型：英雄技能、兵種相剋、建築增益（例如教化大廳）都沒算。" },
  pt: { ssNeed2:"Escolha nosso plano e ao menos um jogador deles para ver a estimativa.", holdT:"🛡️ Segurar o Templo da Espada", holdRes:"Mantenha pelo menos {g} tropas ≈ {n} pessoas", holdNote:"Contra um rally de {lead} com {r} tropas. Nosso líder da guarnição: {us}.", takeT:"⚔️ Tomar o deles", takeRes:"Um rally de pelo menos {r} tropas ≈ {n} pessoas (líder + participantes)", takeCap:"⚠️ Mais do que nosso rally comporta ({cap}) — precisa de líder mais forte ou rally maior.", takeNote:"Guarnição deles ≈ {g} tropas, líder {lead}. Nosso líder de rally: {us}.", haveT:"Temos {n} pessoas ≈ {t} tropas ({per} cada).", bothT:"Segurar e tomar ao mesmo tempo precisa de {n} pessoas.", rsT:"🔍 Quem de [{tag}] vai jogar", rsNote:"Busque os membros deles (nome ou cargo) e marque quem está nesta batalha. Só os marcados entram no ranking e na estimativa.", rsFind:"🔎 Buscar nome ou R4…", rsSel:"{n} / {t} escolhidos", rsNone:"Ninguém escolhido — busque acima e marque os jogadores deles.", rkNote2:"Nossa lista marcada + os escolhidos deles, do mais forte. 🎯 = líder usado na estimativa (toque de novo = volta ao mais forte). Toque num nosso: Confirmado ↔ Reserva. Num deles: ⚠️ vigiar.", ldUs:"Nosso líder para a estimativa", ldThem:"Líder deles para a estimativa", estT:"📐 Estimativa — um rally de cada lado", ssSet3:"③ Configurações", ssG0:"Tropas da guarnição deles (0 = escolhidos × tropas de cada)", svT:"Adversários salvos (neste aparelho — ficam até você apagar)", svOpen:"Abrir", svDel:"🗑 Apagar", svAsk:"Apagar os dados salvos de [{tag}] #{kid}?", auto:"⚡ Organizar", autoNote:"O mais forte deles → líder da guarnição; nossos {k} mais fortes → rallies (mais fracos primeiro, o mais forte por último), tropas e nível das ③ Configurações.", tgTitle:"Definir como líder da guarnição deles", raTitle:"Pôr / tirar dos nossos rallies", tgTitleD:"Definir como líder da nossa guarnição", raTitleD:"Pôr / tirar dos rallies deles", ssSet2:"③ Configurações básicas (usadas pelo ⚡ Organizar)", find:"🔎 achar nome", oppT:"Aliança adversária (opcional): busque e só os jogadores dela aparecem", onlyOpp:"Só jogadores de [{tag}]", ssPlanT:"⚔️ Rallies: escolha o líder da guarnição deles e nossos líderes de rally (só quem está marcado como jogando)", ssNeedOpp:"Busque o adversário acima primeiro.", inL:"Joga", inNote:"Desmarque quem não joga — sai do ranking e de todas as respostas abaixo.", inThem:"Eles:", inUs:"Nós:", inAll:"✓ Todos", inNone:"✗ Nenhum", inTop:"Só os primeiros", offT:"Não marcados ({n}) — marque para voltar", rkT:"📊 Os dois lados, por Força", rkNote:"Nossa lista e a aliança deles num só ranking. Toque num dos nossos: Confirmado ↔ Reserva. Toque num deles: ⚠️ vigiar (⚠️? = sugerido: tão forte quanto nosso melhor líder, ou mais).", q3None:"Ninguém marcado ainda — toque nos jogadores deles no ranking acima.", q3Sugg:"Sugeridos: {names}.", tTierD: "Nosso nível", mSs: "🗡️ Terra das Espadas", dirA: "⚔️ Nós atacamos", dirD: "🛡️ Eles nos atacam", tgtD: "Nossa guarnição", tLeadD: "Líder da nossa guarnição", usD: "Os comícios deles (em ordem)",
    debUs: "Debuff nos atacantes (ataque/defesa −%)", debThem: "Debuff na guarnição (−%)", terr: "Guarnição no próprio território (+10% em tudo)",
    winD: "❌ Eles tomam — ficam {s} deles", loseD: "✅ Seguramos — ficam {g} nossos", needD: "Comícios como o #1 deles para tomar: cerca de {n}.",
    holdD: "Para segurar todos esses comícios de uma vez: pelo menos {g} tropas no prédio.", lastD: "Continue reforçando entre os comícios — toda tropa que chega a tempo conta inteira.",
    mix: "Mistura…", mixNote: "Quem entra no comício, por nível (nº de pessoas)", mixEq: "≈ {t} em média",
    tr: "Proporção (Infantaria : Cavalaria : Arquearia)", trUs: "Atacantes", trThem: "Guarnição", trSum: "{s}: soma {n}%, não 100%.",
    trLow: "{s}: Infantaria abaixo de 40%. Na nossa simulação, uma luta equilibrada perdeu muito mais tropas (35:35:30 ficou com 14% menos, 30:40:30 com menos da metade). Os números aqui supõem 50:20:30, então ficam otimistas demais.",
    trNote: "Padrão: atacantes 50:20:30, guarnição 60:20:20. Os números não mudam com isso; a proporção só é verificada.",
    ssT: "🗡️ Terra das Espadas — o Templo da Espada", ssIntro: "O Templo da Espada abre 15 minutos após o início. Busque o adversário no começo e veja: dá para tomar, quantos precisam segurar e quem vigiar.",
    ssOur: "① Nossa lista", ssPlan: "Plano do ranking", ssNoPlan: "Nenhum plano compartilhado (ou sem acesso ao 📊 Ranking).", ssSubHint: "Toque num nome para trocar Confirmado ↔ Reserva. Reservas vêm do plano; trocar aqui só muda esta página.",
    conf: "Confirmado", subL: "Reserva", ssCnt: "{c} confirmados · {s} reservas", nm: "Nome", pw: "Poder",
    ssOpp: "② Aliança adversária", ssKid: "Reino", ssTag: "Tag da aliança", ssGo: "🔄 Buscar", ssBusy: "Buscando…",
    ssGot: "[{tag}] {name} · #{kid} · {n} membros · buscado {t}", ssErrNF: "Aliança não encontrada — confira o número do reino e a tag.", ssErr: "Não deu para buscar ({e}).",
    ssLogin: "Entre com o Discord primeiro (topo da página).", ssEstN: "{n} deles têm Força pelos rankings; os outros são estimados pelo Poder (≈).",
    ssSet: "③ Ajustes", ssK: "Comícios ao mesmo tempo (cada lado)", ssR: "Tamanho do nosso comício", ssRt: "Tamanho do comício deles", ssG: "Guarnição deles no Templo da Espada", ssPer: "Tropas que cada membro manda para segurar",
    ssTu: "Nível de quem entra (nós)", ssTt: "Nível de quem entra (eles)",
    ssRes: "④ Resultado", cOnly: "Só confirmados", cSubs: "Com reservas",
    q1: "Dá para tomar?", q1win: "✅ Sim — depois de {n} comícios, ficam {s} nossos dentro.", q1lose: "❌ Não com {k} comícios — sobram {g} deles. Comícios como o de {best}: cerca de {n}.",
    q1Note: "Guarnição deles liderada por {lead} (o mais forte). Ordem: {names} — os mais fracos primeiro, o mais forte por último.",
    q2: "Quantos precisam segurar?", q2res: "Pelo menos {g} tropas ≈ {n} pessoas", q2Note: "contra os {k} comícios mais fortes deles de uma vez ({names}), nossa guarnição liderada por {lead}.",
    q3: "Quem vigiar", q3Note: "⚠️ = tão forte quanto o nosso melhor líder, ou mais.",
    ssNeed: "Escolha um plano e busque o adversário para ver o resultado.", ssEst: "≈ estimado pelo Poder",
    ssCav: "Estimativa grosseira, mesmo modelo do planejador: habilidades de herói, vantagem de tropa e bônus de prédios (ex.: Salão da Reforma) não contam." },
  ar: { ssNeed2:"اختر خطتنا ولاعبًا واحدًا على الأقل منهم لرؤية التقدير.", holdT:"🛡️ الصمود في ضريح السيوف", holdRes:"أبقِ ما لا يقل عن {g} جندي ≈ {n} شخص", holdNote:"أمام حشد واحد لـ {lead} بـ {r} جندي. قائد حاميتنا: {us}.", takeT:"⚔️ أخذ ما لديهم", takeRes:"حشد واحد لا يقل عن {r} جندي ≈ {n} شخص (القائد + المنضمّون)", takeCap:"⚠️ أكثر مما يتسع له حشدنا ({cap}) — نحتاج قائدًا أقوى أو حشدًا أكبر.", takeNote:"حاميتهم ≈ {g} جندي بقيادة {lead}. قائد حشدنا: {us}.", haveT:"لدينا {n} شخص ≈ {t} جندي ({per} لكل واحد).", bothT:"الصمود والهجوم معًا يحتاجان {n} شخصًا.", rsT:"🔍 من سيشارك من [{tag}]", rsNote:"ابحث في أعضائهم (الاسم أو الرتبة) وحدّد من سيشارك في هذه المعركة. المحدَّدون فقط يدخلون الترتيب والتقدير.", rsFind:"🔎 ابحث عن اسم أو R4…", rsSel:"تم اختيار {n} / {t}", rsNone:"لم يُختر أحد بعد — ابحث في الأعلى وحدّد لاعبيهم.", rkNote2:"قائمتنا المحدَّدة + المختارون منهم، الأقوى أولًا. 🎯 = القائد المستخدم في التقدير (اضغط مجددًا = الأقوى). اضغط أحدنا: مؤكَّد ↔ بديل. أحدهم: ⚠️ مراقبة.", ldUs:"قائدنا للتقدير", ldThem:"قائدهم للتقدير", estT:"📐 التقدير — حشد واحد لكل جهة", ssSet3:"③ الإعدادات", ssG0:"جنود حاميتهم (0 = المختارون × جنود كل واحد)", svT:"الخصوم المحفوظون (على هذا الجهاز — يبقون حتى تحذفهم)", svOpen:"فتح", svDel:"🗑 حذف", svAsk:"حذف البيانات المحفوظة لـ [{tag}] ‎#{kid}؟", auto:"⚡ ترتيب تلقائي", autoNote:"الأقوى لديهم ← قائد الحامية؛ أقوى {k} لدينا ← الحشود (الأضعف أولًا والأقوى أخيرًا)، والجنود والمستوى من ③ الإعدادات.", tgTitle:"اجعله قائد حاميتهم", raTitle:"أضِف إلى / أزِل من حشودنا", tgTitleD:"اجعله قائد حاميتنا", raTitleD:"أضِف إلى / أزِل من حشودهم", ssSet2:"③ الإعدادات الأساسية (يستخدمها ⚡ الترتيب التلقائي)", find:"🔎 ابحث عن اسم", oppT:"تحالف الخصم (اختياري): اجلبه فيظهر لاعبوه فقط", onlyOpp:"لاعبو [{tag}] فقط", ssPlanT:"⚔️ الحشود: اختر قائد حاميتهم وقادة حشودنا (فقط من حُدِّد أنه يشارك)", ssNeedOpp:"اجلب الخصم في الأعلى أولًا.", inL:"يشارك", inNote:"ألغِ تحديد من لا يشارك — يخرج من الترتيب ومن كل الإجابات أدناه.", inThem:"هم:", inUs:"نحن:", inAll:"✓ الكل", inNone:"✗ لا أحد", inTop:"فقط أول", offT:"غير المحدَّدين ({n}) — حدّد لإعادتهم", rkT:"📊 الطرفان حسب القوة", rkNote:"قائمتنا وتحالفهم في ترتيب واحد. اضغط على أحدنا: مؤكَّد ↔ بديل. اضغط على أحدهم: ⚠️ مراقبة (⚠️? = مقترح: بقوة أفضل قائد لدينا أو أقوى).", q3None:"لم يُحدَّد أحد بعد — اضغط على لاعبيهم في الترتيب أعلاه.", q3Sugg:"مقترحون: {names}.", tTierD: "مستوانا", mSs: "🗡️ أرض السيوف", dirA: "⚔️ نحن نهاجم", dirD: "🛡️ هم يهاجموننا", tgtD: "حاميتنا", tLeadD: "قائد حاميتنا", usD: "حشودهم (بالترتيب)",
    debUs: "إضعاف على المهاجمين (هجوم/دفاع −%)", debThem: "إضعاف على الحامية (−%)", terr: "الحامية في أرضها (+10% لكل شيء)",
    winD: "❌ يأخذونه — يبقى {s} من قواتهم", loseD: "✅ نصمد — يبقى {g} من قواتنا", needD: "عدد الحشود مثل حشدهم ‎#1 للسيطرة: نحو {n}.",
    holdD: "للصمود أمام كل هذه الحشود معًا: على الأقل {g} جندي في المبنى.", lastD: "واصلوا التعزيز بين حشودهم — كل جندي يصل في الوقت يُحسب كاملًا.",
    mix: "خليط…", mixNote: "المنضمون حسب المستوى (عدد الأشخاص)", mixEq: "≈ {t} في المتوسط",
    tr: "نسبة القوات (المشاة : الفرسان : الرماة)", trUs: "المهاجمون", trThem: "الحامية", trSum: "{s}: المجموع {n}% وليس 100%.",
    trLow: "{s}: المشاة أقل من 40%. في محاكاتنا خسرت المعركة المتكافئة قوات أكثر بكثير (35:35:30 أبقى 14% أقل، و30:40:30 أقل من النصف). الأرقام هنا تفترض 50:20:30 فهي متفائلة أكثر من اللازم.",
    trNote: "الافتراضي: المهاجمون 50:20:30، الحامية 60:20:20. الأرقام لا تتغير بها؛ النسبة للتحقق فقط.",
    ssT: "🗡️ أرض السيوف — ضريح السيوف", ssIntro: "يُفتح ضريح السيوف بعد 15 دقيقة من بدء المعركة. اجلب الخصم في البداية ثم تحقّق: هل نأخذه، كم شخصًا يلزم للصمود، ومن يجب مراقبته.",
    ssOur: "① قائمتنا", ssPlan: "خطة الترتيب", ssNoPlan: "لا توجد خطط مشتركة (أو لا صلاحية لـ 📊 الترتيب).", ssSubHint: "اضغط على اسم للتبديل مؤكَّد ↔ بديل. البدلاء من الخطة؛ التبديل هنا يغيّر هذه الصفحة فقط.",
    conf: "مؤكَّد", subL: "بديل", ssCnt: "{c} مؤكَّد · {s} بديل", nm: "الاسم", pw: "القوة",
    ssOpp: "② تحالف الخصم", ssKid: "المملكة", ssTag: "وسم التحالف", ssGo: "🔄 جلب", ssBusy: "جارٍ الجلب…",
    ssGot: "[{tag}] {name} · ‎#{kid} · {n} عضو · جُلب {t}", ssErrNF: "لم يُعثر على التحالف — تحقّق من رقم المملكة والوسم.", ssErr: "تعذّر الجلب ({e}).",
    ssLogin: "سجّل الدخول بـ Discord أولًا (أعلى الصفحة).", ssEstN: "لدى {n} منهم قوة من لوحات الترتيب؛ والباقون مقدَّرون من القوة (≈).",
    ssSet: "③ الإعدادات", ssK: "حشود في الوقت نفسه (لكل طرف)", ssR: "حجم حشدنا", ssRt: "حجم حشدهم", ssG: "حاميتهم في ضريح السيوف", ssPer: "قوات يرسلها كل عضو للصمود",
    ssTu: "مستوى منضمّينا", ssTt: "مستوى منضمّيهم",
    ssRes: "④ النتيجة", cOnly: "المؤكَّدون فقط", cSubs: "مع البدلاء",
    q1: "هل نستطيع أخذه؟", q1win: "✅ نعم — بعد {n} حشود يبقى {s} من قواتنا داخله.", q1lose: "❌ ليس بـ {k} حشود — يبقى {g} من قواتهم. الحشود مثل حشد {best}: نحو {n}.",
    q1Note: "حاميتهم بقيادة {lead} (أقواهم). الترتيب: {names} — الأضعف أولًا والأقوى أخيرًا.",
    q2: "كم شخصًا للصمود؟", q2res: "على الأقل {g} جندي ≈ {n} شخص", q2Note: "أمام أقوى {k} حشود لهم معًا ({names})، وحاميتنا بقيادة {lead}.",
    q3: "من يجب مراقبته", q3Note: "⚠️ = بقوة أفضل قائد لدينا أو أقوى.",
    ssNeed: "اختر خطة واجلب الخصم لترى النتيجة.", ssEst: "≈ مقدَّر من القوة",
    ssCav: "تقدير تقريبي بنفس نموذج المخطط: مهارات الأبطال وأفضلية القوات ومكافآت المباني (مثل قاعة الإصلاح) غير محسوبة." },
  ko: { ssNeed2:"우리 계획을 고르고 상대를 한 명 이상 체크해야 계산돼요.", holdT:"🛡️ 성검 제단 지키기", holdRes:"최소 {g} 병력 주둔 ≈ {n}명", holdNote:"{lead}의 {r} 병력 집결 한 번에 대해. 우리 주둔 대장: {us}.", takeT:"⚔️ 상대 것 빼앗기", takeRes:"집결 한 번에 최소 {r} 병력 ≈ {n}명 (대장 + 참여자)", takeCap:"⚠️ 우리 집결이 담을 수 있는 병력({cap})보다 많아요 — 더 강한 대장이나 더 큰 집결이 필요해요.", takeNote:"상대 주둔 ≈ {g} 병력, 대장 {lead}. 우리 집결 대장: {us}.", haveT:"우리는 {n}명 ≈ {t} 병력 (1인당 {per}).", bothT:"지키면서 빼앗으려면 총 {n}명이 필요해요.", rsT:"🔍 [{tag}]에서 이번에 누가 참전하나", rsNote:"상대 멤버를 검색해서 (이름이나 등급) 이번 전투에 나오는 사람을 체크하세요. 체크한 사람만 순위와 계산에 들어가요.", rsFind:"🔎 이름이나 R4 검색…", rsSel:"{n} / {t}명 선택", rsNone:"아직 아무도 안 골랐어요 — 위에서 검색해서 체크하세요.", rkNote2:"우리 체크 명단 + 상대 선택 인원, 강한 순. 🎯 = 계산에 쓰는 대장 (다시 누르면 최강으로). 우리 쪽을 누르면 확정 ↔ 후보, 상대 쪽은 ⚠️ 주의.", ldUs:"계산용 우리 대장", ldThem:"계산용 상대 대장", estT:"📐 계산 — 양쪽 집결 한 번씩", ssSet3:"③ 설정", ssG0:"상대 주둔 병력 (0 = 선택 인원 × 1인당 병력)", svT:"저장된 상대 (이 기기 — 지울 때까지 남아요)", svOpen:"열기", svDel:"🗑 삭제", svAsk:"[{tag}] #{kid} 저장 데이터를 지울까요?", auto:"⚡ 자동 배치", autoNote:"상대 최강 → 주둔 대장, 우리 상위 {k}명 → 집결 (약한 사람부터, 최강은 마지막), 병력과 등급은 ③ 기본 설정에서.", tgTitle:"상대 주둔 대장으로", raTitle:"우리 집결에 넣기 / 빼기", tgTitleD:"우리 주둔 대장으로", raTitleD:"상대 집결에 넣기 / 빼기", ssSet2:"③ 기본 설정 (⚡ 자동 배치에 사용)", find:"🔎 이름 찾기", oppT:"상대 연맹 (선택): 가져오면 그 연맹 사람만 나와요", onlyOpp:"[{tag}] 사람만", ssPlanT:"⚔️ 집결 배치: 상대 주둔 대장과 우리 집결 대장을 고르세요 (참전 체크한 사람만)", ssNeedOpp:"먼저 위에서 상대 연맹을 가져오세요.", inL:"참전", inNote:"참전하지 않는 사람은 체크 해제 — 순위와 아래 모든 분석에서 빠져요.", inThem:"상대:", inUs:"우리:", inAll:"✓ 전체", inNone:"✗ 해제", inTop:"상위만", offT:"체크 안 된 사람 ({n}명) — 체크하면 다시 들어가요", rkT:"📊 양쪽 순위 (강도순)", rkNote:"우리 명단과 상대 연맹을 한 순위로. 우리 쪽을 누르면 확정 ↔ 후보, 상대 쪽을 누르면 ⚠️ 주의 표시 (⚠️? = 추천: 우리 최강 대장만큼 또는 더 강함).", q3None:"아직 표시한 사람이 없어요 — 위 순위에서 상대 플레이어를 누르세요.", q3Sugg:"추천: {names}.", tTierD: "우리 등급", mSs: "🗡️ 성검", dirA: "⚔️ 우리가 공격", dirD: "🛡️ 상대가 공격", tgtD: "우리 주둔군", tLeadD: "우리 주둔군 대장", usD: "상대 집결 (순서대로)",
    debUs: "공격 측 디버프 (공격/방어 −%)", debThem: "수비 측 디버프 (−%)", terr: "수비 측이 자기 영토 안 (전 능력 +10%)",
    winD: "❌ 빼앗김 — 상대 {s} 남음", loseD: "✅ 지켜냄 — 우리 {g} 남음", needD: "빼앗으려면 상대 #1 같은 집결이 약 {n}번 필요.",
    holdD: "이 집결을 한꺼번에 막으려면: 건물 안에 최소 {g} 병력.", lastD: "상대 집결 사이사이 계속 지원하세요 — 제때 도착한 병력은 전부 계산됩니다.",
    mix: "혼합…", mixNote: "집결 참가자 (병종 등급별 인원)", mixEq: "평균 약 {t}",
    tr: "병종 비율 (보병 : 기병 : 궁병)", trUs: "공격 측", trThem: "수비 측", trSum: "{s}: 합이 {n}%예요, 100%가 아니에요.",
    trLow: "{s}: 보병 40% 미만. 우리 시뮬레이션에서는 비슷한 싸움에서 병력을 훨씬 많이 잃었어요 (35:35:30은 14% 적게 남고, 30:40:30은 절반도 안 남음). 여기 숫자는 50:20:30 기준이라 너무 낙관적이에요.",
    trNote: "기본값: 공격 측 50:20:30, 수비 측 60:20:20. 계산 결과는 바뀌지 않고, 비율은 확인용이에요.",
    ssT: "🗡️ 성검 쟁탈 — 성검 제단", ssIntro: "성검 제단은 전투 시작 15분 뒤에 열려요. 시작하자마자 상대를 가져오고: 빼앗을 수 있는지, 몇 명이 지켜야 하는지, 누구를 조심할지 확인하세요.",
    ssOur: "① 우리 명단", ssPlan: "순위 계획", ssNoPlan: "공유 계획이 없어요 (또는 📊 순위 권한 없음).", ssSubHint: "이름을 누르면 확정 ↔ 후보 전환. 후보는 계획에서 오고, 여기서 바꾸면 이 페이지에만 적용돼요.",
    conf: "확정", subL: "후보", ssCnt: "확정 {c}명 · 후보 {s}명", nm: "이름", pw: "전투력",
    ssOpp: "② 상대 연맹", ssKid: "왕국", ssTag: "연맹 태그", ssGo: "🔄 가져오기", ssBusy: "가져오는 중…",
    ssGot: "[{tag}] {name} · #{kid} · {n}명 · {t}에 가져옴", ssErrNF: "연맹을 찾을 수 없어요 — 왕국 번호와 태그를 확인하세요.", ssErr: "가져오지 못했어요 ({e}).",
    ssLogin: "먼저 Discord로 로그인하세요 (페이지 맨 위).", ssEstN: "그중 {n}명은 순위표의 강도가 있고, 나머지는 전투력으로 추정 (≈).",
    ssSet: "③ 설정", ssK: "동시 집결 수 (각 진영)", ssR: "우리 집결 병력", ssRt: "상대 집결 병력", ssG: "성검 제단의 상대 주둔군", ssPer: "1인당 주둔 병력",
    ssTu: "우리 참가자 등급", ssTt: "상대 참가자 등급",
    ssRes: "④ 결과", cOnly: "확정만", cSubs: "후보 포함",
    q1: "빼앗을 수 있나?", q1win: "✅ 가능 — {n}번 집결 후 우리 {s}이 안에 남아요.", q1lose: "❌ {k}번으로는 안 돼요 — 상대 {g} 남음. {best} 같은 집결이 약 {n}번 필요.",
    q1Note: "상대 주둔군 대장 {lead} (상대 최강). 순서: {names} — 약한 대장 먼저, 가장 강한 대장 마지막.",
    q2: "몇 명이 지켜야 하나?", q2res: "최소 {g} 병력 ≈ {n}명", q2Note: "상대 상위 {k}개 집결을 한꺼번에 ({names}), 우리 주둔군 대장 {lead}.",
    q3: "조심할 상대", q3Note: "⚠️ = 우리 최강 대장만큼 또는 더 강함.",
    ssNeed: "계획을 고르고 상대를 가져오면 결과가 나와요.", ssEst: "≈ 전투력으로 추정",
    ssCav: "대략적인 추정, 위 계획과 같은 모델: 영웅 스킬, 병종 상성, 건물 버프 (예: 교화의 홀)는 계산 안 함." }
};
for (const [l, o] of Object.entries(MT)) Object.assign(T[l], o);
for (const [l, o] of Object.entries(NT)) Object.assign(T[l], o);
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const norm = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const fmtN = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "k" : String(Math.round(n));
const AI_URL = "https://nxs-ai.tapegirljoke.workers.dev", DISCORD_LS = "nxs-discord-v1";

let SNAP = null, snapDay = null, findQ = "", SCB = null;   // SCB = the 🔭 Scout file (data/scout-x7k2p9.json)
const SSDEF = { watch: {}, off: {}, topN: 20, plan: "", ov: {}, kid: "", tag: "", K: 3, R: 1200000, Rt: 1200000, G: 1500000, per: 150000, tUs: "TG2", mUs: null, tThem: "TG2", mThem: null };
const PDEF = { mode: "home", dir: "atk", tgt: "", G: 1000000, gt: "TG2", gmix: null, terr: true, dUs: 0, dThem: 0, p: 1.75, re: 0, trA: [50, 20, 30], trD: [60, 20, 20],
  rallies: [{ lead: "", R: 1200000, tier: "TG2" }], ss: SSDEF };
const clone = (x) => JSON.parse(JSON.stringify(x));
let PLAN = (() => { try { const p = JSON.parse(localStorage.getItem("nxs-attack-v2")); return p && Array.isArray(p.rallies) ? p : null; } catch (e) { return null; } })();
PLAN = Object.assign(clone(PDEF), PLAN || {}); PLAN.ss = Object.assign(clone(SSDEF), PLAN.ss || {});
const keep = () => { try { localStorage.setItem("nxs-attack-v2", JSON.stringify(PLAN)); } catch (e) {} };

/* players on the newest snapshot's boards: gid → { name, al, kid, b: { board: score } } */
const B3 = ["gov_gear", "hero_equip", "master_power"];
let PL = {}, CPOW = null;
function buildPlayers() {
  PL = {}; if ((!SNAP || !SNAP.boards) && !SCB) return;
  for (const [key, bd] of Object.entries((SNAP && SNAP.boards) || {})) { const [kid, board] = key.split(":");
    for (const r of bd.rows || []) { const id = String(r.governor_id); const p = PL[id] = PL[id] || { id, name: r.nick_name, al: r.alliance_abbr || "", kid: +kid, b: {} }; p.b[board] = r.score; } }
  /* + the 🔭 Scout file's boards (fetched on the spot for the KvK opponent; the daily snapshot only has them from the next day) */
  for (const [kid, k] of Object.entries((SCB && SCB.kingdoms) || {})) for (const [board, rows] of Object.entries(k.boards || {})) {
    if (SNAP && SNAP.boards && SNAP.boards[`${kid}:${board}`] && !(Date.parse(k.asOf) > Date.parse(SNAP.made || snapDay || 0))) continue;   // the snapshot is newer
    for (const [, gid, name, al, score] of rows) { if (gid == null) continue; const id = String(gid); const p = PL[id] = PL[id] || { id, name, al: al || "", kid: +kid, b: {} }; p.b[board] = score; } }
  /* Strength per million Power (median of everyone who has both) — to estimate S for players below the top 100 */
  const q = Object.values(PL).filter((p) => sOf(p) && p.b.personal_power).map((p) => sOf(p) / (p.b.personal_power / 1e6)).sort((a, b) => a - b);
  CPOW = q.length ? q[q.length >> 1] : null;
}
const sOf = (p) => p && B3.every((b) => p.b[b] != null) ? B3.reduce((s, b) => s + p.b[b] / 1e6, 0) : (p && p.sEst) || null;   // sEst: a player known only from a fetched alliance / a plan (S ≈ from Power)
const ours = (p) => /^nxs$/i.test(p.al || "");
const nameOf = (id) => { const p = PL[id]; return p ? p.name : ""; };
/* 🏰 home: us = NXS, them = other alliances of #2189 · ⚔️ KvK: us = everyone in #2189, them = the other kingdom(s) */
const kvk = () => PLAN.mode === "kvk", isDef = () => PLAN.dir === "def";
const isUs = (p) => kvk() ? p.kid === 2189 : ours(p) && p.kid === 2189;
const isThem = (p) => kvk() ? p.kid !== 2189 : !ours(p) && p.kid === 2189;
const strong = (side) => Object.values(PL).filter((p) => sOf(p) && (side ? isUs(p) : isThem(p))).sort((a, b) => sOf(b) - sOf(a));

/* ---------- math ---------- */
/* tier "mix": joiners counted by tier → the mean of tier² (the model uses tier² ∝ attack × health). TG0 = T10. */
const MIXT = { TG3: TIER.TG3, TG2: TIER.TG2, TG1: TIER.TG1, TG0: TIER.T10 };
const MIXDEF = { TG3: 2, TG2: 8, TG1: 4, TG0: 1 };
function t2(tier, mix) {
  if (tier !== "MIX") return (TIER[tier] || TIER.TG2) ** 2;
  let n = 0, s = 0; for (const k in MIXT) { const c = Math.max(0, +(mix && mix[k]) || 0); n += c; s += c * MIXT[k] ** 2; }
  return n ? s / n : TIER.TG2 ** 2;
}
const tierName = (x) => { const v = Math.sqrt(x); return Object.entries(TIER).reduce((a, [k, f]) => Math.abs(f - v) < Math.abs(TIER[a] - v) ? k : a, "TG2"); };
/* r = how much one attacking troop is worth against one garrison troop */
const rr = (sa, sd, ta, td, terr, dA, dD) => Math.pow(sa / sd, B) * (ta / td) * (1 - (dA || 0) / 100) ** 2 / ((terr ? 1.06 : 1) * (1 - (dD || 0) / 100) ** 2);
function ratio(r) {
  const sa = sOf(PL[r.lead]), sd = sOf(PL[PLAN.tgt]); if (!sa || !sd) return null;
  return rr(sa, sd, t2(r.tier, r.mix), t2(PLAN.gt, PLAN.gmix), PLAN.terr, PLAN.dUs, PLAN.dThem);
}
function chainOf(G, list, P, re) {   // list: [{k, R}] in order
  const out = [];
  for (const [i, x] of list.entries()) {
    if (!x.k) continue; const R = +x.R || 0;
    if (x.k * R ** P > G ** P) { out.push({ i, k: x.k, win: true, left: Math.pow(R ** P - G ** P / x.k, 1 / P) }); break; }
    G = Math.pow(G ** P - x.k * R ** P, 1 / P); out.push({ i, k: x.k, win: false, left: G }); G += re || 0;
  }
  return out;
}
const chain = () => chainOf(+PLAN.G || 0, PLAN.rallies.map((r) => ({ k: ratio(r), R: r.R })), PLAN.p, +PLAN.re || 0);
function needN(G, P) { const r0 = PLAN.rallies[0], k = r0 && ratio(r0); return k ? G ** P / (k * (+r0.R) ** P) : null; }
/* smallest garrison that survives all these rallies arriving one after another with no reinforcement: G^p = Σ r_i R_i^p */
const gMin = (list, P) => Math.pow(list.reduce((s, x) => s + (x.k ? x.k * (+x.R || 0) ** P : 0), 0), 1 / P);

/* ---------- small pieces ---------- */
/* 🔎 every player picker has a find box: typing keeps only the matching names in the list (Sherry 2026-11-01: "so hard to pick") */
const SELS = {}; let selN = 0;
const optOf = (p, v) => `<option value="${esc(p.id)}"${v === p.id ? " selected" : ""}>${esc(p.name)}${p.al && !ours(p) ? ` [${esc(p.al)}]` : ""} · ${sOf(p) ? `${p.sEst && !B3.every((b) => p.b[b] != null) ? "≈" : ""}${sOf(p).toFixed(1)}` : "—"}</option>`;
const sel = (attr, v, list) => { const k = ++selN; SELS[k] = { v, list };
  return `<span class="ak-pick"><input class="inp ak-q" type="search" data-q="${k}" placeholder="${esc(t("find"))}" autocomplete="off"><select class="inp" data-qs="${k}" ${attr}><option value="">${esc(t("pick"))}</option>${list.map((p) => optOf(p, v)).join("")}</select></span>`; };
const tierSel = (attr, v) => `<select class="inp" ${attr}>${Object.keys(TIER).map((k) => `<option${k === v ? " selected" : ""}>${k}</option>`).join("")}<option value="MIX"${v === "MIX" ? " selected" : ""}>${esc(t("mix"))}</option></select>`;
/* the four head-count boxes under a tier picker set to "Mix…"; key = where it's stored (r0, g, su, st) */
function mixBox(key, tier, mix) {
  if (tier !== "MIX") return "";
  const m = mix || MIXDEF;
  return `<div class="ak-mix"><span class="muted">${esc(t("mixNote"))}</span>${Object.keys(MIXT).map((k) => `<label>${k} <input class="inp" type="number" min="0" step="1" data-mx="${key}|${k}" value="${+m[k] || 0}"></label>`).join("")}
    <span class="muted">${esc(fill(t("mixEq"), { t: tierName(t2("MIX", m)) }))}</span></div>`;
}
const mixRef = (key) => key === "g" ? ["gmix", PLAN] : key === "su" ? ["mUs", PLAN.ss] : key === "st" ? ["mThem", PLAN.ss] : ["mix", PLAN.rallies[+key.slice(1)]];
function trBox() {
  const row = (side, arr) => `<div class="ak-f"><span>${esc(t(side === "us" ? "trUs" : "trThem"))}</span><span class="ak-tr">${arr.map((v, i) => `<input class="inp" type="number" min="0" max="100" step="5" data-tr="${side}|${i}" value="${v}">`).join(" : ")}</span></div>`;
  const warn = []; for (const [side, arr] of [["us", PLAN.trA], ["them", PLAN.trD]]) { const s = t(side === "us" ? "trUs" : "trThem"), n = arr.reduce((a, b) => a + (+b || 0), 0);
    if (n !== 100) warn.push(fill(t("trSum"), { s, n })); else if (+arr[0] < 40) warn.push(fill(t("trLow"), { s })); }
  return `<div class="ak-box"><b>${esc(t("tr"))}</b>${row("us", PLAN.trA)}${row("them", PLAN.trD)}
    ${warn.map((w) => `<div class="mv-warn" style="font-size:12.5px;margin-top:6px">⚠️ ${esc(w)}</div>`).join("")}<div class="muted" style="font-size:12px;margin-top:4px">${esc(t("trNote"))}</div></div>`;
}
const modeBar = () => `<div class="ak-mode" role="tablist">${[["home", t("mHome")], ["kvk", t("mKvk")]].map(([k, l]) => `<button type="button" class="btn${(PLAN.mode || "home") === k ? " on" : ""}" data-mode="${k}">${esc(l)}</button>`).join("")}</div>`;
const dirBar = () => `<div class="ak-mode ak-dir">${[["atk", t("dirA")], ["def", t("dirD")]].map(([k, l]) => `<button type="button" class="btn small${PLAN.dir === k ? " on" : ""}" data-dir="${k}">${esc(l)}</button>`).join("")}</div>`;

/* ---------- ⚔️ / 🛡️ planner ---------- */
/* players from a fetched alliance (SSD) or a 📊 plan list may be missing from today's boards: give them a PL entry with S ≈ from Power */
function plOf(x, al, kid) { const id = String(x.id); if (!PL[id]) PL[id] = { id, name: x.name, al: al || "", kid: kid || 0, b: x.b ? { ...x.b } : {} };
  if (!sOf(PL[id]) && x.S) PL[id].sEst = x.S; return PL[id]; }
const oppOn = () => SSD && PLAN.onlyOpp !== false && +SSD.kid === +PLAN.ss.kid && String(SSD.tag).toLowerCase() === String(PLAN.ss.tag || "").toLowerCase();
const oppList = () => { const pk = new Set(((PLAN.ss.pick || {})[wKey()]) || []); return theirList().filter((x) => (!pk.size || pk.has(x.id)) && x.S).map((x) => plOf(x, SSD.tag, SSD.kid)); };   // 🔍 their picked players (all when nobody is picked)
const usPlanList = () => { const off = new Set(PLAN.ss.off["u:" + PLAN.ss.plan] || []); return ourList().filter((x) => !off.has(x.id) && x.S).map((x) => plOf(x, "NXS", 2189)); };
/* 🗡️ Swordland: their side = the fetched alliance (ticked), ours = the 📊 plan (ticked). 🏰 / ⚔️ KvK: a fetched alliance replaces "everyone else" on their side */
function planLists() { const D = isDef(), ss = PLAN.mode === "ss", them = ss || oppOn() ? oppList() : null, us = ss ? usPlanList() : null;
  return { gList: (D ? us : them) || strong(D), rList: (D ? them : us) || strong(!D) }; }
/* ⚡ Auto-arrange (Sherry 2026-11-01): the strongest on the garrison side leads it; the K strongest of the other side rally, weaker first and the strongest last; troops / tiers from ③ */
function autoPlan() {
  const S = PLAN.ss, D = isDef(), { gList, rList } = planLists(), K = Math.max(1, Math.min(10, +S.K || 3));
  if (!gList.length || !rList.length) return false;
  PLAN.tgt = gList[0].id; PLAN.G = +S.G || PLAN.G; PLAN.gt = D ? S.tUs : S.tThem; PLAN.gmix = D ? S.mUs : S.mThem;
  PLAN.rallies = rList.slice(0, K).reverse().map((p) => ({ lead: p.id, R: D ? +S.Rt : +S.R, tier: D ? S.tThem : S.tUs, mix: (D ? S.mThem : S.mUs) || undefined }));
  return true;
}
function planCard() {
  const D = isDef(), ss = PLAN.mode === "ss", { gList, rList } = planLists(), c = chain();
  const rallies = PLAN.rallies.map((r, i) => `<div class="ak-r"><b>#${i + 1}</b> ${sel(`data-rl="${i}"`, r.lead, rList)}
    <div class="ak-rr"><input class="inp" type="number" data-rr="${i}" value="${r.R}" step="10000" aria-label="${esc(t("size"))}">${tierSel(`data-rt="${i}"`, r.tier)}${PLAN.rallies.length > 1 ? `<button class="btn small" data-rx="${i}">✕</button>` : ""}</div>${mixBox("r" + i, r.tier, r.mix)}</div>`).join("");
  let res = "";
  if (!c.length) res = `<div class="muted">${esc(t("noR"))}</div>`;
  else { const n = needN(+PLAN.G, PLAN.p);
    const out = (o) => D ? (o.win ? fill(t("winD"), { s: fmtN(o.left) }) : fill(t("loseD"), { g: fmtN(o.left) })) : (o.win ? fill(t("win"), { s: fmtN(o.left) }) : fill(t("lose"), { g: fmtN(o.left) }));
    const good = (o) => D ? !o.win : o.win;
    const gm = D ? gMin(PLAN.rallies.map((r) => ({ k: ratio(r), R: r.R })), PLAN.p) : 0;
    res = `<div style="font-size:13.5px;margin:6px 0">${esc(fill(t("one"), { x: (1 / c[0].k).toFixed(2), r: c[0].k.toFixed(2) }))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>${esc(t("colR"))}</th><th>${esc(t("lead"))}</th><th>r</th><th>${esc(t("colOut"))}</th></tr></thead><tbody>
      ${c.map((o) => `<tr class="${good(o) ? "ok" : ""}"><td>#${o.i + 1}</td><td dir="auto">${esc(nameOf(PLAN.rallies[o.i].lead))}</td><td>${o.k.toFixed(2)}</td><td>${esc(out(o))}</td></tr>`).join("")}</tbody></table></div>
      ${D && gm ? `<div style="margin-top:6px"><b>🛡️ ${esc(fill(t("holdD"), { g: fmtN(gm) }))}</b></div>` : ""}
      ${n ? `<div style="margin-top:6px"><b>${esc(fill(t(D ? "needD" : "need"), { n: n <= 1 ? "1" : n.toFixed(1) }))}</b></div>` : ""}
      <div class="muted" style="font-size:12.5px;margin-top:4px">💡 ${esc(t(D ? "lastD" : "last"))}</div>
      ${PLAN.mode === "ss" ? "" : `<div style="margin-top:10px;font-size:13px">${esc(t("unc"))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>G \\ p</th>${[1.5, 1.75, 2].map((p) => `<th>${p}</th>`).join("")}</tr></thead><tbody>
      ${[1.0e6, 1.3e6, 1.6e6].map((G) => `<tr><td>${fmtN(G)}</td>${[1.5, 1.75, 2].map((p) => { const x = needN(G, p); return `<td>${x ? (x <= 1 ? "1" : x.toFixed(1)) : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`}`; }
  const oppBox = ss ? "" : `<div class="ak-box"><b>${esc(t("oppT"))}</b>
      <div class="ak-f"><span>${esc(t("ssKid"))}</span><input class="inp" type="number" id="ak_okid" value="${esc(PLAN.ss.kid)}" placeholder="2186"></div>
      <div class="ak-f"><span>${esc(t("ssTag"))}</span><input class="inp" id="ak_otag" value="${esc(PLAN.ss.tag)}" maxlength="8" placeholder="ABC"> <button class="btn small" id="ak_ogo"${ssBusy ? " disabled" : ""}>${esc(t(ssBusy ? "ssBusy" : "ssGo"))}</button></div>
      ${ssMsg ? `<div class="mv-warn" style="font-size:12.5px;margin-top:6px">${esc(ssMsg)}</div>` : ""}
      ${SSD && +SSD.kid === +PLAN.ss.kid && String(SSD.tag).toLowerCase() === String(PLAN.ss.tag || "").toLowerCase() ? `<label class="row" style="gap:6px;font-size:13px;margin-top:4px"><input type="checkbox" id="ak_only"${PLAN.onlyOpp !== false ? " checked" : ""}> ${esc(fill(t("onlyOpp"), { tag: SSD.tag }))} (${SSD.members.length})</label>` : ""}</div>`;
  const autoBar = `<div class="ak-auto"><button class="btn primary" id="ak_auto"${gList.length && rList.length ? "" : " disabled"}>${esc(t("auto"))}</button><span class="muted">${esc(fill(t("autoNote"), { k: Math.max(1, Math.min(10, +PLAN.ss.K || 3)) }))}</span></div>`;
  return `<h3 style="margin:0 0 6px">${esc(t(ss ? "ssPlanT" : "aT"))}</h3>${ss && !SSD ? `<div class="muted" style="font-size:12.5px">${esc(t("ssNeedOpp"))}</div>` : ""}${oppBox}${dirBar()}${autoBar}
    <div class="ak-box"><b>${esc(t(D ? "tgtD" : "tgt"))}</b>
      <div class="ak-f"><span>${esc(t(D ? "tLeadD" : "tLead"))}</span>${sel('id="ak_tgt"', PLAN.tgt, gList)}</div>
      <div class="ak-f"><span>${esc(t("tG"))}</span><input class="inp" type="number" id="ak_G" value="${PLAN.G}" step="50000"></div>
      <div class="ak-f"><span>${esc(t(D ? "tTierD" : "tTier"))}</span>${tierSel('id="ak_gt"', PLAN.gt)}</div>${mixBox("g", PLAN.gt, PLAN.gmix)}
      <label class="row" style="gap:6px;font-size:13px;margin-top:4px"><input type="checkbox" id="ak_terr"${PLAN.terr ? " checked" : ""}> ${esc(t("terr"))}</label></div>
    <div class="ak-box"><b>${esc(t(D ? "usD" : "us"))}</b> <span class="muted" style="font-size:12px">${esc(t("lead"))} · ${esc(t("size"))} · ${esc(t("tier"))}</span>${rallies}<button class="btn small" id="ak_addR">${esc(t("addR"))}</button></div>
    ${ss ? "" : trBox()}
    <details class="ak-more" id="ak_more"${OPEN.has("ak_more") ? " open" : ""}><summary>${esc(t("more"))}</summary>${ss ? trBox() : ""}
      <div class="ak-f"><span>${esc(t("debUs"))}</span><input class="inp" type="number" id="ak_dUs" value="${PLAN.dUs}"></div>
      <div class="ak-f"><span>${esc(t("debThem"))}</span><input class="inp" type="number" id="ak_dThem" value="${PLAN.dThem}"></div>
      <div class="ak-f"><span>${esc(t("p"))}</span><input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5"></div>
      <div class="ak-f"><span>${esc(t("reinf"))}</span><input class="inp" type="number" id="ak_re" value="${PLAN.re}" step="10000"></div></details>
    <h4 style="margin:12px 0 4px">${esc(t("res"))}</h4>${res}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("caveat"))}</div>`;
}
const BT = { en: { only: "Only NXS", top: "Top {n} by strength — everyone together (all kingdoms we have data for).", none: "No match." },
  zh: { only: "只看 NXS", top: "依強度排的前 {n} 名——所有人一起排（我們有資料的所有王國）。", none: "找不到。" },
  pt: { only: "Só NXS", top: "Top {n} por força — todos juntos (todos os reinos com dados).", none: "Nada encontrado." },
  ar: { only: "NXS فقط", top: "أفضل {n} حسب القوة — الجميع معًا (كل الممالك التي لدينا بياناتها).", none: "لا نتائج." },
  ko: { only: "NXS만", top: "강도 순 상위 {n}명 — 모두 함께 (데이터가 있는 모든 왕국).", none: "없음." } };
const bt = (k) => (BT[lang] || BT.en)[k];
function boardsCard() {   // 📊 one list, everyone together (Sherry 2026-11-04: no 🏰 / ⚔️ KvK switch — keep it simple)
  if (!SNAP && !Object.keys(PL).length) return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted">${esc(t("bNoData"))}</div>`;
  const kids = [...new Set(Object.values(PL).map((p) => p.kid))].sort().join(", ");
  const N = 30, q = norm(findQ);
  const list = Object.values(PL).filter((p) => sOf(p) && (!PLAN.onlyNxs || ours(p)) && (!q || norm(p.name).includes(q) || norm(p.al) === q)).sort((a, b) => sOf(b) - sOf(a));
  const rank = new Map(Object.values(PL).filter((p) => sOf(p)).sort((a, b) => sOf(b) - sOf(a)).map((p, i) => [p.id, i + 1]));
  const row = (p) => `<tr${ours(p) ? ' class="ak-us"' : ""}><td dir="auto"><span class="muted">${rank.get(p.id)}.</span> ${esc(p.name)} <span class="muted">[${esc(p.al)}]${p.kid !== 2189 ? ` #${p.kid}` : ""}</span></td><td><b>${sOf(p).toFixed(1)}</b></td><td>${(p.b.gov_gear / 1e6).toFixed(1)}</td><td>${(p.b.hero_equip / 1e6).toFixed(1)}</td><td>${(p.b.master_power / 1e6).toFixed(1)}</td></tr>`;
  const head = `<thead><tr><th></th><th>${esc(t("colS"))}</th><th>${esc(t("gear"))}</th><th>${esc(t("heq"))}</th><th>${esc(t("mst"))}</th></tr></thead>`;
  return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted" style="font-size:12.5px">${esc(t("bNote"))}</div>
    <div class="muted" style="font-size:12.5px;margin:4px 0 8px">${esc(fill(t("bData"), { d: snapDay, k: kids }))} · ${esc(fill(bt("top"), { n: N }))}</div>
    <div class="ak-bf"><input class="inp" id="ak_find" placeholder="${esc(t("bFind"))}" value="${esc(findQ)}"><button type="button" class="btn small${PLAN.onlyNxs ? " on" : ""}" id="ak_only">${esc(bt("only"))}</button></div>
    ${list.length ? `<div class="ak-tw"><table class="ak-t">${head}<tbody>${list.slice(0, N).map(row).join("")}</tbody></table></div>` : `<div class="muted">${esc(bt("none"))}</div>`}`;
}

/* ---------- 🗡️ Swordland ---------- */
const OPEN = new Set();   // which ▸ sections stay open across re-renders
let rosterQ = "";   // 🔍 search text in their roster (kept across re-renders)
let SAFE_IDS = new Set(), ROSTER = null, PLANS = null, plansErr = "", SSD = null, ssMsg = "", ssBusy = false;
/* 💾 fetched opponents stay on this device until deleted (Sherry 2026-11-02: "the data I fetched is gone" — it used to live only in this tab) */
const SV_LS = "nxs-ss-saved", svKey = (d) => `${+d.kid}:${String(d.tag || "").toLowerCase()}`;
let SAVED = {}; try { SAVED = JSON.parse(localStorage.getItem(SV_LS)) || {}; } catch (e) { SAVED = {}; }
try { const old = JSON.parse(sessionStorage.getItem("nxs-ss-opp")); if (old && old.members && !SAVED[svKey(old)]) { SAVED[svKey(old)] = old; try { localStorage.setItem(SV_LS, JSON.stringify(SAVED)); } catch (x) {} } } catch (e) {}
const svWrite = () => { const ks = Object.keys(SAVED).sort((a, b) => (SAVED[b].fetched || 0) - (SAVED[a].fetched || 0)); ks.slice(12).forEach((k) => delete SAVED[k]);   // the 12 newest
  try { localStorage.setItem(SV_LS, JSON.stringify(SAVED)); } catch (e) {} };
const ssSave = () => { if (SSD) SAVED[svKey(SSD)] = SSD; svWrite(); };
SSD = SAVED[svKey({ kid: (PLAN.ss || {}).kid, tag: (PLAN.ss || {}).tag })] || Object.values(SAVED).sort((a, b) => (b.fetched || 0) - (a.fetched || 0))[0] || null;
/* S of one person: from today's boards (3 boards), else ≈ Power × the median S per million Power */
const sFrom = (b, power) => { if (b && B3.every((k) => b[k] != null)) return { S: B3.reduce((s, k) => s + b[k] / 1e6, 0), est: false };
  return power && CPOW ? { S: power / 1e6 * CPOW, est: true } : { S: null, est: true }; };
const wKey = () => SSD ? `${SSD.kid}:${String(SSD.tag || "").toLowerCase()}` : "";   // ⚠️ marks are kept per opposing alliance
async function ssLoad() {
  if (!ROSTER) { try { ROSTER = await OfficerData.fetchJson("data/roster-x7k2p9.json"); } catch (e) { ROSTER = { members: [] }; } }
  if (!PLANS) {
    try { const r = await fetch(AI_URL + "/plans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op: "list" }), cache: "no-store" });
      const j = await r.json(); if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
      PLANS = j.plans || {}; plansErr = j.error || ""; SAFE_IDS = new Set((j.safe || []).map(String)); } catch (e) { PLANS = {}; plansErr = "net"; }
  }
}
function ourList() {
  const p = PLANS && PLANS[PLAN.ss.plan]; if (!p) return [];
  const byId = new Map(((ROSTER && ROSTER.members) || []).map((m) => [String(m.id), m])), subs = new Set((p.subs || []).map(String));
  /* only confirmed people (✅, or 🟡 safe and not ❌) — like 📊 Ranking. A battle-only officer gets the list already filtered by the Worker (filtered: true). */
  const rep = p.rep || {}, ok = (id) => p.filtered || rep[id] === "y" || (SAFE_IDS.has(id) && rep[id] !== "n");
  return (p.picked || []).map(String).filter(ok).map((id) => { const m = byId.get(id) || {}, pl = PL[id], s = sFrom(pl && pl.b, m.power || (pl && pl.b.personal_power));
    const ov = PLAN.ss.ov[id]; return { id, name: m.name || (pl && pl.name) || id, power: m.power || (pl && pl.b.personal_power) || 0, S: s.S, est: s.est, sub: ov ? ov === "s" : subs.has(id) }; })
    .sort((a, b) => (b.S || 0) - (a.S || 0) || b.power - a.power);
}
function theirList() {
  if (!SSD) return [];
  return SSD.members.map((m) => { const s = sFrom(m.b, m.power); return { ...m, S: s.S, est: s.est }; }).sort((a, b) => (b.S || 0) - (a.S || 0) || (b.power || 0) - (a.power || 0));
}
async function ssFetch(force) {
  const kid = +PLAN.ss.kid, tag = String(PLAN.ss.tag || "").trim(); if (!kid || !tag) return;
  const ab = OFFICER.authBody(); if (!ab.token) { ssMsg = t("ssLogin"); render(); return; }
  ssBusy = true; ssMsg = ""; render();
  try { const r = await fetch(AI_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sspull: 1, token: ab.token, kid, tag, force: force ? 1 : 0 }) });
    const j = await r.json().catch(() => ({ error: "net" }));
    if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
    if (j.ok && j.ss) { SSD = j.ss; ssSave(); }
    else ssMsg = j.error === "not_found" ? t("ssErrNF") : j.error === "forbidden" ? t("ssLogin") : fill(t("ssErr"), { e: j.error || r.status });
  } catch (e) { ssMsg = fill(t("ssErr"), { e: "net" }); }
  ssBusy = false; render();
}
/* the three answers for one version of our list */
/* 📐 Swordland estimate (Sherry 2026-11-02: "few people — basically one rally; no waves"): one rally each way.
   🛡️ hold: their strongest picked leader rallies once with min(their picked × per person, their rally cap) → the garrison we need.
   ⚔️ take: their garrison ≈ their picked × per person (or the number in ③), led by their strongest → the one rally we need. */
function ssEstimate(us, them) {
  const S = PLAN.ss, P = PLAN.p, per = Math.max(1, +S.per || 150000), tu = t2(S.tUs, S.mUs), tt = t2(S.tThem, S.mThem), wk = wKey();
  const uS = us.filter((x) => x.S), hS = them.filter((x) => x.S); if (!uS.length || !hS.length) return null;
  const uLead = uS.find((x) => x.id === S.lu) || uS[0], hLead = hS.find((x) => x.id === (S.lt || {})[wk]) || hS[0];
  const hR = Math.min(+S.Rt || 1e12, them.length * per), kH = rr(hLead.S, uLead.S, tt, tu, false);
  const gNeed = hR * Math.pow(kH, 1 / P);                                    // G^p = k R^p
  const hG = +S.G > 0 ? +S.G : them.length * per, kT = rr(uLead.S, hLead.S, tu, tt, false);
  const rNeed = hG / Math.pow(kT, 1 / P);                                     // R^p = G^p / k
  return { uLead, hLead, hR, gNeed, gPeople: Math.ceil(gNeed / per), hG, rNeed, rPeople: Math.ceil(rNeed / per), cap: +S.R || 0, have: us.length, haveT: us.length * per, per };
}
function ssEstHtml(e) {
  if (!e) return `<div class="muted">${esc(t("ssNeed2"))}</div>`;
  const ok = (n) => n <= e.have ? "ak-good" : "ak-bad";
  return `<div class="ak-est"><div class="ak-q"><b>${esc(t("holdT"))}</b><div class="ak-big ${ok(e.gPeople)}">${esc(fill(t("holdRes"), { g: fmtN(e.gNeed), n: e.gPeople }))}</div>
      <div class="muted" style="font-size:12px" dir="auto">${esc(fill(t("holdNote"), { lead: e.hLead.name, r: fmtN(e.hR), us: e.uLead.name }))}</div></div>
    <div class="ak-q"><b>${esc(t("takeT"))}</b><div class="ak-big ${e.cap && e.rNeed > e.cap ? "ak-bad" : ok(e.rPeople)}">${esc(fill(t("takeRes"), { r: fmtN(e.rNeed), n: e.rPeople }))}</div>
      ${e.cap && e.rNeed > e.cap ? `<div class="mv-warn" style="font-size:12.5px">${esc(fill(t("takeCap"), { cap: fmtN(e.cap) }))}</div>` : ""}
      <div class="muted" style="font-size:12px" dir="auto">${esc(fill(t("takeNote"), { g: fmtN(e.hG), lead: e.hLead.name, us: e.uLead.name }))}</div></div>
    <div class="muted" style="font-size:12.5px">${esc(fill(t("haveT"), { n: e.have, t: fmtN(e.haveT), per: fmtN(e.per) }))}${e.gPeople + e.rPeople > e.have ? " " + esc(fill(t("bothT"), { n: e.gPeople + e.rPeople })) : ""}</div></div>`;
}
function savedBox() {
  const L = Object.entries(SAVED).sort((a, b) => (b[1].fetched || 0) - (a[1].fetched || 0)); if (!L.length) return "";
  const cur = SSD ? svKey(SSD) : "";
  return `<div class="ak-saved"><div class="muted" style="font-size:12.5px;margin:8px 0 4px">💾 ${esc(t("svT"))}</div>${L.map(([k, d]) => `<div class="ak-sv${k === cur ? " on" : ""}">
    <span dir="auto"><b>[${esc(d.tag)}]</b> ${esc(d.name || "")} · #${esc(d.kid)} · ${(d.members || []).length} · <span class="muted">${esc(new Date(d.fetched).toLocaleString([], { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }))}</span></span>
    ${k === cur ? "" : `<button class="btn small" data-svo="${esc(k)}">${esc(t("svOpen"))}</button>`}<button class="btn small" data-svd="${esc(k)}">${esc(t("svDel"))}</button></div>`).join("")}</div>`;
}
function ssCard() {
  const S = PLAN.ss, usAll = ourList(), themAll = theirList(), wk = wKey();
  /* ☑ ours: everyone from the plan, untick who isn't playing. 🔍 theirs: nobody until picked from their full member list (Sherry 2026-11-02) */
  const offU = new Set(S.off["u:" + S.plan] || []), pickT = new Set(wk ? (S.pick || {})[wk] || [] : []);
  const us = usAll.filter((x) => !offU.has(x.id)), them = themAll.filter((x) => pickT.has(x.id));
  const outRows = usAll.filter((x) => offU.has(x.id)).map((x) => ({ ...x, us: 1 }));
  const ids = Object.entries(PLANS || {}).sort((a, b) => String(a[1].name || "").localeCompare(String(b[1].name || "")));
  const sTxt = (x) => x.S ? `${x.est ? "≈" : ""}${x.S.toFixed(1)}` : "—";
  const conf = us.filter((x) => !x.sub), subs = us.filter((x) => x.sub);
  const ourTbl = !us.length ? "" : `<div class="muted" style="font-size:12.5px;margin:6px 0"><b>${esc(fill(t("ssCnt"), { c: conf.length, s: subs.length }))}</b></div>`;
  const best = conf.find((x) => x.S) || us.find((x) => x.S);
  const W = new Set(wk ? S.watch[wk] || [] : []), hot = (x) => best && x.S && x.S >= best.S * 0.95;
  const marked = them.filter((x) => W.has(x.id)), sugg = them.filter(hot).slice(0, 10);
  /* 🔍 their whole alliance: search, tick who plays */
  const q = norm(rosterQ), shown = themAll.filter((x) => !q || norm(x.name).includes(q) || norm(x.rank).includes(q));
  const roster = !SSD ? "" : `<div class="ak-box" id="ss_roster"><b>${esc(fill(t("rsT"), { tag: SSD.tag }))}</b><div class="muted" style="font-size:12.5px;margin:4px 0">${esc(t("rsNote"))}</div>
    <div class="ak-inbar"><input class="inp ak-rq" type="search" id="ss_rq" value="${esc(rosterQ)}" placeholder="${esc(t("rsFind"))}" autocomplete="off">
      <b class="ak-cnt">${esc(fill(t("rsSel"), { n: pickT.size, t: themAll.length }))}</b>
      <button class="btn small" data-pall="1">${esc(t("inAll"))}</button><button class="btn small" data-pnone="1">${esc(t("inNone"))}</button>
      <span class="ak-top"><button class="btn small" data-ptop="1">${esc(t("inTop"))}</button><input class="inp" type="number" id="ss_topN" value="${+S.topN || 20}" min="1" max="200"></span></div>
    ${pickT.size ? `<div class="ak-chips">${themAll.filter((x) => pickT.has(x.id)).map((x) => `<span class="ak-chip" dir="auto">${esc(x.name)}<b data-pk="${esc(x.id)}">×</b></span>`).join("")}</div>` : `<div class="muted" style="font-size:12.5px">${esc(t("rsNone"))}</div>`}
    <div class="ak-tw ak-list ak-rlist"><table class="ak-t"><tbody>${shown.map((x) => `<tr class="ak-tap${pickT.has(x.id) ? " ak-pk" : ""}" data-pr="${esc(x.id)}"><td class="ak-in"><input type="checkbox" data-pk="${esc(x.id)}"${pickT.has(x.id) ? " checked" : ""}></td>
      <td dir="auto">${esc(x.name)}${x.rank ? ` <span class="muted">${esc(x.rank)}</span>` : ""}</td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td></tr>`).join("") || `<tr><td class="muted">—</td></tr>`}</tbody></table></div></div>`;
  /* 📊 one ranking: our ticked list + their picked players, strongest first */
  const mixed = [...us.map((x) => ({ ...x, us: 1 })), ...them].sort((a, b) => (b.S || 0) - (a.S || 0) || (b.power || 0) - (a.power || 0));
  const e = ssEstimate(conf.length ? conf : us, them);
  const lead = (x) => { const on = e && (x.us ? e.uLead.id === x.id : e.hLead.id === x.id);
    return `<button class="btn small ak-act${on ? " on" : ""}" data-ld="${x.us ? "u" : "t"}|${esc(x.id)}" title="${esc(t(x.us ? "ldUs" : "ldThem"))}">🎯</button>`; };
  const cb = (x) => `<td class="ak-in"><input type="checkbox" data-in="${x.us ? "u" : "t"}|${esc(x.id)}" checked aria-label="${esc(t("inL"))}"></td>`;
  const outTbl = !outRows.length ? "" : `<details class="ak-out" id="ss_out"${OPEN.has("ss_out") ? " open" : ""}><summary class="muted">${esc(fill(t("offT"), { n: outRows.length }))}</summary>
    <div class="ak-tw ak-list"><table class="ak-t ak-mixed ak-offt"><tbody>${outRows.map((x) => `<tr class="ak-us"><td class="ak-in"><input type="checkbox" data-in="u|${esc(x.id)}"></td><td dir="auto">${esc(x.name)} <span class="muted">NXS</span></td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td></tr>`).join("")}</tbody></table></div></details>`;
  const mixTbl = !(mixed.length || outRows.length) ? "" : `<div class="ak-box"><b>${esc(t("rkT"))}</b><div class="muted" style="font-size:12.5px;margin:4px 0">${esc(t("rkNote2"))}</div>
    ${usAll.length ? `<div class="ak-inbar"><span>${esc(t("inUs"))}</span><button class="btn small" data-inall="u">${esc(t("inAll"))}</button></div>` : ""}
    <div class="ak-tw ak-list"><table class="ak-t ak-mixed"><thead><tr><th>${esc(t("inL"))}</th><th></th><th>#</th><th>${esc(t("nm"))}</th><th>${esc(t("colS"))}</th><th>${esc(t("pw"))}</th><th></th></tr></thead><tbody>
    ${mixed.map((x, i) => x.us ? `<tr data-sub="${esc(x.id)}" class="ak-tap ak-us${x.sub ? " ak-sub" : ""}">${cb(x)}<td class="ak-ac">${lead(x)}</td><td>${i + 1}</td><td dir="auto">${esc(x.name)} <span class="muted">NXS</span></td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td><td>${esc(t(x.sub ? "subL" : "conf"))}</td></tr>`
      : `<tr data-w="${esc(x.id)}" class="ak-tap ak-them${W.has(x.id) ? " ak-w" : ""}">${cb(x)}<td class="ak-ac">${lead(x)}</td><td>${i + 1}</td><td dir="auto">${esc(x.name)} <span class="muted">[${esc(SSD.tag)}]${x.rank ? " " + esc(x.rank) : ""}</span></td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td><td>${W.has(x.id) ? "⚠️" : hot(x) ? `<span class="muted">⚠️?</span>` : "☐"}</td></tr>`).join("")}</tbody></table></div>${outTbl}</div>`;
  const nEst = themAll.filter((x) => x.S && !x.est).length;
  const oppTbl = !SSD ? "" : `<div class="muted" style="font-size:12.5px;margin:6px 0">${esc(fill(t("ssGot"), { tag: SSD.tag, name: SSD.name, kid: SSD.kid, n: SSD.members.length, t: new Date(SSD.fetched).toLocaleString([], { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) }))}
      · ${esc(fill(t("ssEstN"), { n: nEst }))}</div>`;
  const set = (id, k, step) => `<div class="ak-f"><span>${esc(t(k))}</span><input class="inp" type="number" id="${id}" value="${S[id.slice(3)]}" step="${step}"></div>`;
  return `<h3 style="margin:0 0 4px">${esc(t("ssT"))}</h3><div class="muted" style="font-size:12.5px">${esc(t("ssIntro"))}</div>
    <div class="ak-box"><b>${esc(t("ssOur"))}</b>
      <div class="ak-f"><span>${esc(t("ssPlan"))}</span>${ids.length ? `<select class="inp" id="ss_plan"><option value="">${esc(t("pick"))}</option>${ids.map(([id, p]) => `<option value="${esc(id)}"${id === S.plan ? " selected" : ""}>${esc(p.name || id)} (${(p.picked || []).length})</option>`).join("")}</select>` : `<span class="muted">${esc(t("ssNoPlan"))}</span>`}</div>
      ${ourTbl}</div>
    <div class="ak-box"><b>${esc(t("ssOpp"))}</b>
      <div class="ak-f"><span>${esc(t("ssKid"))}</span><input class="inp" type="number" id="ss_kid" value="${esc(S.kid)}" placeholder="2186"></div>
      <div class="ak-f"><span>${esc(t("ssTag"))}</span><input class="inp" id="ss_tag" value="${esc(S.tag)}" maxlength="8" placeholder="ABC"> <button class="btn small" id="ss_go"${ssBusy ? " disabled" : ""}>${esc(t(ssBusy ? "ssBusy" : "ssGo"))}</button></div>
      ${ssMsg ? `<div class="mv-warn" style="font-size:12.5px;margin-top:6px">${esc(ssMsg)}</div>` : ""}${oppTbl}${savedBox()}</div>
    ${roster}
    ${mixTbl}
    <div class="ak-box"><b>${esc(t("estT"))}</b>${ssEstHtml(e)}</div>
    <details class="ak-box ak-more" id="ss_set"${OPEN.has("ss_set") ? " open" : ""}><summary><b>${esc(t("ssSet3"))}</b></summary>
      ${set("ss_per", "ssPer", 10000)}${set("ss_R", "ssR", 50000)}${set("ss_Rt", "ssRt", 50000)}${set("ss_G", "ssG0", 100000)}
      <div class="ak-f"><span>${esc(t("ssTu"))}</span>${tierSel('id="ss_tUs"', S.tUs)}</div>${mixBox("su", S.tUs, S.mUs)}
      <div class="ak-f"><span>${esc(t("ssTt"))}</span>${tierSel('id="ss_tThem"', S.tThem)}</div>${mixBox("st", S.tThem, S.mThem)}
      <div class="ak-f"><span>${esc(t("p"))}</span><input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5"></div></details>
    ${SSD ? `<h4 style="margin:12px 0 4px">${esc(t("q3"))}</h4>
      ${marked.length ? `<div class="ak-tw"><table class="ak-t"><tbody>${marked.map((x) => `<tr><td>⚠️</td><td dir="auto">${esc(x.name)}${x.rank ? ` <span class="muted">${esc(x.rank)}</span>` : ""}</td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td></tr>`).join("")}</tbody></table></div>`
        : `<div class="muted" style="font-size:12.5px">${esc(t("q3None"))}${sugg.length ? " " + esc(fill(t("q3Sugg"), { names: sugg.map((x) => x.name).join(", ") })) : ""}</div>`}` : ""}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("ssCav"))}</div>`;
}

/* ---------- ⚖️ Super compare (Sherry 2026-11-04: battle judging was too much to fill in live — just a rough "how much stronger is he") ----------
   Two players, side by side: strength S (gear + hero equip + master) and each board, Town Center, VIP (Scout), Amadeus / Helga stars (their own record). */
const VT = {
  en: { t: "⚖️ Super compare", p: "Pick two players — anyone on today's MightPulse boards or in 🔭 Scout. A rough guide to how much stronger one is.", find: "🔎 Find…", same: "About equal", more: "{b} is about {n}% stronger than {a}", lot: "a lot stronger", bit: "a bit stronger",
    rows: { S: "💪 Strength", gov_gear: "👑 Governor Gear", hero_equip: "🛡️ Hero Gear", master_power: "🎓 Masters", gov_charm: "💎 Governor Charms", pet_power: "🐾 Pets", research_power: "🔬 Research", troop_power: "⚔️ Troop power", migrant: "🧳 Migrant Score", power: "Power" },
    tc: "Town Center {n}", vip: "VIP {n}", star: "{h} ★{n}", full: "max stars", est: "≈ estimated from Power (not in the top 100 of all three boards)", none: "No MightPulse data yet.",
    note: "Strength = Governor Gear + Hero Gear + Masters (millions); it ranked 7 rally leaders' real troop stats almost exactly. It shows investment only — not troops, tiers or which troop type they push. VIP 9+ and max-star Amadeus / Helga add stats the boards can't see." },
  zh: { t: "⚖️ 超級比一比", p: "選兩個人——今天 MightPulse 排行榜上或 🔭 偵察裡的任何人。粗略看一個人比另一個強多少。", find: "🔎 找名字…", same: "差不多", more: "{b} 比 {a} 強約 {n}%", lot: "強很多", bit: "強一些",
    rows: { S: "💪 強度", gov_gear: "👑 領主裝備", hero_equip: "🛡️ 英雄裝備", master_power: "🎓 大師", gov_charm: "💎 領主寶石", pet_power: "🐾 寵物", research_power: "🔬 研究", troop_power: "⚔️ 部隊實力", migrant: "🧳 遷城分數", power: "總戰力" },
    tc: "城鎮中心 {n}", vip: "VIP {n}", star: "{h} ★{n}", full: "滿星", est: "≈ 用總戰力估的（不在三個榜的前 100 名）", none: "還沒有 MightPulse 資料。",
    note: "強度 = 領主裝備 + 英雄裝備 + 大師（百萬）；拿 7 位集結隊長的實際部隊屬性比過，排名幾乎一樣。只看得出投資量——看不到兵數、兵等、專練哪個兵種。VIP 9 以上、阿瑪迪斯／赫爾加滿星也會加屬性，排行榜看不到。" },
  pt: { t: "⚖️ Supercomparação", p: "Escolha dois jogadores — qualquer um dos rankings do MightPulse de hoje ou do 🔭 Reconhecimento. Um guia aproximado de quanto um é mais forte.", find: "🔎 Procurar…", same: "Quase igual", more: "{b} é cerca de {n}% mais forte que {a}", lot: "bem mais forte", bit: "um pouco mais forte",
    rows: { S: "💪 Força", gov_gear: "👑 Equipamento do Chefe", hero_equip: "🛡️ Equipamento do Herói", master_power: "🎓 Mestres", gov_charm: "💎 Amuleto do Governador", pet_power: "🐾 Mascotes", research_power: "🔬 Pesquisa", troop_power: "⚔️ Poder das tropas", migrant: "🧳 Pontuação de Migração", power: "Poder" },
    tc: "Centro da Cidade {n}", vip: "VIP {n}", star: "{h} ★{n}", full: "estrelas máx.", est: "≈ estimado pelo Poder (fora do top 100 dos três rankings)", none: "Ainda sem dados do MightPulse.",
    note: "Força = Equip. do Chefe + Equip. do Herói + Mestres (milhões); ordenou os atributos reais de 7 líderes de rally quase exatamente. Mostra só investimento — não tropas, níveis nem o tipo de tropa. VIP 9+ e Amadeus / Helga com estrelas máximas somam atributos que os rankings não mostram." },
  ar: { t: "⚖️ المقارنة الكبرى", p: "اختر لاعبَين — أي شخص في لوحات MightPulse اليوم أو في 🔭 الاستطلاع. دليل تقريبي لمدى تفوّق أحدهما.", find: "🔎 ابحث…", same: "متقاربان", more: "{b} أقوى من {a} بنحو {n}%", lot: "أقوى بكثير", bit: "أقوى قليلًا",
    rows: { S: "💪 القوة", gov_gear: "👑 عتاد الحاكم", hero_equip: "🛡️ عتاد البطل", master_power: "🎓 المعلّمون", gov_charm: "💎 تميمة الحاكم", pet_power: "🐾 الحيوانات الأليفة", research_power: "🔬 البحث", troop_power: "⚔️ قوة القوات", migrant: "🧳 نقاط الهجرة", power: "القوة الكلية" },
    tc: "مركز المدينة {n}", vip: "VIP {n}", star: "{h} ★{n}", full: "نجوم كاملة", est: "≈ مقدّرة من القوة الكلية (خارج أفضل 100 في اللوحات الثلاث)", none: "لا توجد بيانات MightPulse بعد.",
    note: "القوة = عتاد الحاكم + عتاد البطل + المعلّمون (بالملايين)؛ رتّبت الخصائص الحقيقية لـ7 قادة حشد بدقة تقريبًا. تُظهر الاستثمار فقط — لا الجنود ولا المستويات ولا نوع القوات. VIP 9+ وأماديوس / هيلغا بنجوم كاملة يضيفون خصائص لا تظهر في اللوحات." },
  ko: { t: "⚖️ 슈퍼 비교", p: "두 사람을 골라 — 오늘 MightPulse 랭킹이나 🔭 정찰에 있는 누구든. 한 명이 얼마나 더 강한지 대략 보는 용도야.", find: "🔎 이름 찾기…", same: "비슷", more: "{b}이(가) {a}보다 약 {n}% 강함", lot: "훨씬 강함", bit: "조금 강함",
    rows: { S: "💪 강도", gov_gear: "👑 영주 장비", hero_equip: "🛡️ 영웅 장비", master_power: "🎓 마스터", gov_charm: "💎 영주 보석", pet_power: "🐾 펫", research_power: "🔬 연구", troop_power: "⚔️ 부대 전투력", migrant: "🧳 이주 점수", power: "전투력" },
    tc: "도시 센터 {n}", vip: "VIP {n}", star: "{h} ★{n}", full: "만성", est: "≈ 전투력으로 추정 (세 랭킹 상위 100 밖)", none: "아직 MightPulse 데이터가 없어.",
    note: "강도 = 영주 장비 + 영웅 장비 + 마스터 (백만); 집결 대장 7명의 실제 부대 스탯 순위와 거의 똑같았어. 투자량만 보여줘 — 병력, 등급, 어떤 병종을 키우는지는 안 보여. VIP 9 이상, 만성 아마데우스 / 헬가도 랭킹에 안 보이는 스탯을 더해." } };
const vt = (k) => (VT[lang] || VT.en)[k] ?? VT.en[k];
let VS = (() => { try { return JSON.parse(localStorage.getItem("nxs-vs")) || {}; } catch (e) { return {}; } })();
const vsKeep = () => { try { localStorage.setItem("nxs-vs", JSON.stringify(VS)); } catch (e) {} };
const VQ = { a: "", b: "" };
/* everyone we know: board players (PL) + 🔭 Scout players + snapshot players' own records */
function vsPeople() {
  const P = {};
  for (const p of Object.values(PL)) P[p.id] = { id: p.id, name: p.name, al: p.al, kid: p.kid, b: { ...p.b } };
  for (const [kid, k] of Object.entries((SCB && SCB.kingdoms) || {})) for (const s of k.players || []) { const id = String(s.id); const x = P[id] = P[id] || { id, name: s.name, al: s.alliance || "", kid: +kid, b: {} };
    if (s.power) x.power = s.power; if (s.tc) x.tc = s.tc; if (s.vip != null && s.vip !== "") x.vip = s.vip; const mg = OFFICER.migrantOf(s); if (mg) x.migrant = mg; if (s.raw && Array.isArray(s.raw.heroes)) x.heroes = s.raw.heroes; }
  for (const [id, r] of Object.entries((SNAP && SNAP.players) || {})) { const pl = r && r.player; if (!pl) continue; const x = P[id] = P[id] || { id, name: pl.nick_name, al: (pl.alliance && pl.alliance.abbr) || "", kid: +pl.kid || 2189, b: {} };
    if (pl.power && !x.power) x.power = pl.power; if (pl.town_center_level && !x.tc) x.tc = pl.town_center_level; if (Array.isArray(r.heroes) && r.heroes.length) x.heroes = r.heroes;
    const mg = r.ranks && r.ranks.migrant_score; if (mg && !x.migrant) x.migrant = mg; }
  for (const x of Object.values(P)) { if (!x.power && x.b.personal_power) x.power = x.b.personal_power; if (!x.migrant && x.b.migrant_score) x.migrant = x.b.migrant_score;
    x.S = B3.every((b) => x.b[b] != null) ? B3.reduce((s, b) => s + x.b[b] / 1e6, 0) : null; x.Se = !x.S && x.power && CPOW ? CPOW * x.power / 1e6 : null; }
  return P;
}
const vsS = (x) => x ? (x.S || x.Se || null) : null;
function vsHtml() {
  const P = vsPeople(), all = Object.values(P).filter((x) => vsS(x)).sort((a, b) => vsS(b) - vsS(a));
  if (!all.length) return `<h3 style="margin:0 0 4px">${esc(vt("t"))}</h3><div class="muted">${esc(vt("none"))}</div>`;
  if (!vsS(P[VS.a])) VS.a = (all.find(ours) || all[0]).id;   // a saved pick that has no strength today → pick again (2026-11-05: it crashed the card)
  if (!vsS(P[VS.b])) VS.b = (all.find((x) => !ours(x)) || all[1] || all[0]).id;
  const A = P[VS.a], Bp = P[VS.b];
  const pick = (k) => { const q = norm(VQ[k]), list = q.length >= 1 ? all.filter((x) => norm(x.name).includes(q) || norm(x.al) === q) : all;
    const cur = P[VS[k]], opts = (list.includes(cur) || !vsS(cur) ? list : [cur, ...list]).slice(0, 300);
    return `<div class="ak-vsp"><input class="inp" data-vq="${k}" placeholder="${esc(vt("find"))}" value="${esc(VQ[k])}"><select class="inp" data-vs="${k}">${opts.map((x) => `<option value="${esc(x.id)}"${x.id === VS[k] ? " selected" : ""}>${esc(x.name)}${x.al ? ` [${esc(x.al)}]` : ""}${x.kid && x.kid !== 2189 ? ` #${x.kid}` : ""} · ${(vsS(x) || 0).toFixed(1)}${x.S ? "" : "≈"}</option>`).join("")}</select></div>`; };
  const tags = (x) => { const o = []; if (x.tc) o.push(fill(vt("tc"), { n: x.tc })); if (x.vip != null) o.push(fill(vt("vip"), { n: x.vip }));
    for (const h of x.heroes || []) { const k = String(h.name || "").toLowerCase().replace(/[^a-z]/g, ""); if (k !== "amadeus" && k !== "helga") continue; const st = h.stars ?? h.star;
      o.push(`<span class="ak-st${st >= 5 ? " full" : ""}">${esc(fill(vt("star"), { h: lang === "zh" ? (k === "amadeus" ? "阿瑪迪斯" : "赫爾加") : (k === "amadeus" ? "Amadeus" : "Helga"), n: st ?? "?" }))}${st >= 5 ? " · " + esc(vt("full")) : ""}</span>`); }
    return o.map((s) => s.startsWith("<span") ? s : `<span>${esc(s)}</span>`).join(""); };
  const sa = vsS(A), sb = vsS(Bp), hi = sb >= sa ? [Bp, A] : [A, Bp], pct = Math.round((Math.max(sa, sb) / Math.min(sa, sb) - 1) * 100);
  const verdict = pct < 10 ? `🤝 ${vt("same")}` : `${pct >= 30 ? "🔺🔺" : "🔺"} ${fill(vt("more"), { a: hi[1].name, b: hi[0].name, n: pct })} <small>(${esc(vt(pct >= 30 ? "lot" : "bit"))})</small>`;
  const val = (x, k) => k === "S" ? vsS(x) : k === "migrant" ? (x.migrant || null) : k === "power" ? (x.power || null) : (x.b[k] != null ? x.b[k] : null);
  const show = (k, v) => v == null ? "—" : k === "S" ? v.toFixed(1) : k === "migrant" ? Math.round(v / 1e3) + "k" : (v / 1e6).toFixed(1) + "M";
  const rows = ["S", "gov_gear", "hero_equip", "master_power", "gov_charm", "pet_power", "research_power", "troop_power", "migrant", "power"].map((k) => {
    const a = val(A, k), b = val(Bp, k); if (a == null && b == null) return "";
    const m = Math.max(a || 0, b || 0) || 1, w = (v) => v == null ? 0 : (v / m * 100).toFixed(1);
    return `<div class="ak-vr${k === "S" ? " main" : ""}"><div class="ak-vv a${a != null && b != null && a > b ? " win" : ""}"><b>${show(k, a)}${k === "S" && A.S == null ? "≈" : ""}</b><span class="tr"><i style="width:${w(a)}%"></i></span></div>
      <div class="ak-vk">${esc(vt("rows")[k])}</div><div class="ak-vv b${a != null && b != null && b > a ? " win" : ""}"><span class="tr"><i style="width:${w(b)}%"></i></span><b>${show(k, b)}${k === "S" && Bp.S == null ? "≈" : ""}</b></div></div>`; }).join("");
  return `<h3 style="margin:0 0 4px">${esc(vt("t"))}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(vt("p"))}</div>
    <div class="ak-vsh">${pick("a")}<span class="ak-vsx">VS</span>${pick("b")}</div>
    <div class="ak-vsh ak-tags"><div>${tags(A)}</div><i></i><div>${tags(Bp)}</div></div>
    <div class="ak-verd">${verdict}</div>
    <div class="ak-vrs">${rows}</div>
    ${A.S == null || Bp.S == null ? `<div class="muted" style="font-size:12px;margin-top:6px">${esc(vt("est"))}</div>` : ""}
    <div class="muted" style="font-size:12px;margin-top:8px">💡 ${esc(vt("note"))}</div>`;
}
function vsBind() {
  document.querySelectorAll("[data-vs]").forEach((s) => s.onchange = () => { VS[s.dataset.vs] = s.value; vsKeep(); const c = $("ak_vs"); if (c) { c.innerHTML = vsHtml(); vsBind(); } });
  document.querySelectorAll("[data-vq]").forEach((i) => i.oninput = () => { const k = i.dataset.vq; VQ[k] = i.value; const c = $("ak_vs"); if (!c) return; c.innerHTML = vsHtml(); vsBind();
    const n = c.querySelector(`[data-vq="${k}"]`); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
    const sel = c.querySelector(`[data-vs="${k}"]`), q = norm(VQ[k]); if (sel && q) { const first = [...sel.options].find((o) => norm(o.textContent).includes(q)); if (first && first.value !== VS[k]) { VS[k] = first.value; vsKeep(); c.innerHTML = vsHtml(); vsBind(); const n2 = c.querySelector(`[data-vq="${k}"]`); if (n2) { n2.focus(); n2.setSelectionRange(n2.value.length, n2.value.length); } } } });
}
function render() {
  const root = $("ak_root"); if (!root) return;
  if (PLAN.mode === "ss") PLAN.mode = "home";   // 🗡️ Swordland mode and the ⚔️ planner were taken out (Sherry 2026-11-04) — code kept below, not shown
  PLAN.mode = "home";   // the 🏰 / ⚔️ KvK switch was taken out too (2026-11-04): one list, 🎯 intel and 🔭 Scout always shown
  /* each card on its own: one card failing on odd data must not blank the whole tab (2026-11-05) */
  const safe = (f) => { try { return f(); } catch (e) { console.warn("[compare]", e); return `<div class="muted">⚠️ ${esc(String((e && e.message) || e)).slice(0, 160)}</div>`; } };
  root.innerHTML = `<div class="card" id="ak_vs">${safe(vsHtml)}</div><div class="card" id="ak_board">${safe(boardsCard)}</div>${window.KvkIntel ? `<div class="card" id="ak_intel">${safe(() => KvkIntel.html(SNAP))}</div>` : ""}`;   // 🎯 opponent intel (js/officer/intel.js)
  const sc = $("pg-scout"); if (sc) sc.hidden = false;   // 🔭 Scout (other kingdoms), always under the cards
  safe(bind); safe(vsBind);
  if (window.KvkIntel) safe(() => KvkIntel.bind(render));
}
function bind() {
  const re = () => { keep(); render(); };
  const on = (id, f) => { const e = $(id); if (e) e.onchange = f; };
  const num = (v, lo, hi, d) => Math.min(hi, Math.max(lo, Number.isFinite(+v) && v !== "" ? +v : d));
  document.querySelectorAll("[data-mode]").forEach((b) => b.onclick = async () => { if (PLAN.mode === b.dataset.mode) return; PLAN.mode = b.dataset.mode;
    if (PLAN.mode === "ss") { re(); await ssLoad(); render(); return; }
    PLAN.tgt = ""; PLAN.rallies.forEach((x) => { if (x.lead && !(isDef() ? isThem : isUs)(PL[x.lead] || {})) x.lead = ""; }); re(); });
  document.querySelectorAll("[data-dir]").forEach((b) => b.onclick = () => { if (PLAN.dir === b.dataset.dir) return; PLAN.dir = b.dataset.dir; PLAN.tgt = ""; PLAN.rallies.forEach((x) => x.lead = ""); re(); });
  on("ak_tgt", (e) => { PLAN.tgt = e.target.value; re(); }); on("ak_G", (e) => { PLAN.G = Math.max(0, +e.target.value || 0); re(); });
  on("ak_gt", (e) => { PLAN.gt = e.target.value; re(); }); on("ak_terr", (e) => { PLAN.terr = e.target.checked; re(); });
  on("ak_dUs", (e) => { PLAN.dUs = num(e.target.value, 0, 90, 0); re(); }); on("ak_dThem", (e) => { PLAN.dThem = num(e.target.value, 0, 90, 0); re(); });
  on("ak_p", (e) => { PLAN.p = num(e.target.value, 1.2, 2.5, 1.75); re(); }); on("ak_re", (e) => { PLAN.re = Math.max(0, +e.target.value || 0); re(); });
  document.querySelectorAll("[data-rl]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rl].lead = s.value; re(); });
  document.querySelectorAll("[data-rr]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rr].R = Math.max(0, +s.value || 0); re(); });
  document.querySelectorAll("[data-rt]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rt].tier = s.value; re(); });
  document.querySelectorAll("[data-rx]").forEach((b) => b.onclick = () => { PLAN.rallies.splice(+b.dataset.rx, 1); re(); });
  document.querySelectorAll("[data-mx]").forEach((s) => s.onchange = () => { const [key, k] = s.dataset.mx.split("|"), [f, o] = mixRef(key); if (!o) return;
    o[f] = Object.assign({}, MIXDEF, o[f] || {}, { [k]: num(s.value, 0, 200, 0) }); re(); });
  document.querySelectorAll("[data-tr]").forEach((s) => s.onchange = () => { const [side, i] = s.dataset.tr.split("|"), a = side === "us" ? PLAN.trA : PLAN.trD; a[+i] = num(s.value, 0, 100, 0); re(); });
  if ($("ak_addR")) $("ak_addR").onclick = () => { const l = PLAN.rallies[PLAN.rallies.length - 1] || {}; PLAN.rallies.push({ lead: "", R: l.R || 1200000, tier: l.tier || "TG2", mix: l.mix ? { ...l.mix } : undefined }); re(); };
  const o = $("ak_only"); if (o) o.onclick = () => { PLAN.onlyNxs = !PLAN.onlyNxs; keep(); $("ak_board").innerHTML = boardsCard(); bind(); };
  const f = $("ak_find"); if (f) f.oninput = () => { findQ = f.value; const pos = f.selectionStart; $("ak_board").innerHTML = boardsCard(); bind(); const g = $("ak_find"); g.focus(); try { g.setSelectionRange(pos, pos); } catch (e) {} };
  document.querySelectorAll("details[id]").forEach((d) => d.ontoggle = () => { OPEN.delete(d.id); OPEN.delete("-" + d.id); OPEN.add(d.open ? d.id : "-" + d.id); });
  /* 🔎 find a name: rebuild the picker with the matching players (the chosen one stays) */
  document.querySelectorAll("[data-q]").forEach((q) => q.oninput = () => { const k = q.dataset.q, S0 = SELS[k], s = document.querySelector(`[data-qs="${k}"]`); if (!S0 || !s) return;
    const n = norm(q.value), cur = s.value, hits = S0.list.filter((p) => !n || norm(p.name).includes(n) || norm(p.al).includes(n));
    const keepCur = cur && !hits.some((p) => p.id === cur) ? S0.list.filter((p) => p.id === cur) : [];
    s.innerHTML = `<option value="">${esc(t("pick"))}${n ? ` (${hits.length})` : ""}</option>` + [...keepCur, ...hits].map((p) => optOf(p, cur)).join("");
    if (n && hits.length === 1 && !cur) { s.value = hits[0].id; s.dispatchEvent(new Event("change")); } });
  on("ak_okid", (e) => { PLAN.ss.kid = String(Math.floor(+e.target.value || 0) || ""); keep(); });
  on("ak_otag", (e) => { PLAN.ss.tag = e.target.value.trim().slice(0, 8); keep(); });
  on("ak_only", (e) => { PLAN.onlyOpp = e.target.checked; PLAN.tgt = ""; re(); });
  if ($("ak_ogo")) $("ak_ogo").onclick = () => { const k = $("ak_okid"), g = $("ak_otag"); PLAN.ss.kid = String(Math.floor(+k.value || 0) || ""); PLAN.ss.tag = g.value.trim().slice(0, 8); keep();
    ssFetch(SSD && +SSD.kid === +PLAN.ss.kid && String(SSD.tag).toLowerCase() === PLAN.ss.tag.toLowerCase()); };
  document.querySelectorAll("[data-svo]").forEach((b) => b.onclick = () => { const d = SAVED[b.dataset.svo]; if (!d) return; SSD = d; PLAN.ss.kid = String(d.kid); PLAN.ss.tag = d.tag; PLAN.tgt = ""; PLAN.rallies.forEach((r) => { r.lead = ""; }); ssMsg = ""; re(); });
  document.querySelectorAll("[data-svd]").forEach((b) => b.onclick = () => { const k = b.dataset.svd, d = SAVED[k]; if (!d || !window.confirm(fill(t("svAsk"), { tag: d.tag, kid: d.kid }))) return;
    delete SAVED[k]; svWrite(); if (SSD && svKey(SSD) === k) { SSD = null; PLAN.tgt = ""; } re(); });
  if ($("ak_auto")) $("ak_auto").onclick = () => { if (autoPlan()) re(); };
  /* 🎯 / ➕ in the 🗡️ ranking (players get a PL entry first, so the planner can use them) */
  const pick = (id) => { const x = [...ourList().map((m) => ({ m, al: "NXS", kid: 2189 })), ...theirList().map((m) => ({ m, al: SSD && SSD.tag, kid: SSD && SSD.kid }))].find((o) => o.m.id === id); if (x) plOf(x.m, x.al, x.kid); };
  document.querySelectorAll("[data-tg]").forEach((b) => b.onclick = (e) => { e.stopPropagation(); const id = b.dataset.tg; pick(id); PLAN.tgt = PLAN.tgt === id ? "" : id; re(); });
  document.querySelectorAll("[data-ra]").forEach((b) => b.onclick = (e) => { e.stopPropagation(); const id = b.dataset.ra; pick(id); const i = PLAN.rallies.findIndex((r) => r.lead === id), S0 = PLAN.ss, D0 = isDef();
    if (i >= 0) { if (PLAN.rallies.length > 1) PLAN.rallies.splice(i, 1); else PLAN.rallies[0].lead = ""; }
    else { const empty = PLAN.rallies.find((r) => !r.lead); if (empty) empty.lead = id; else PLAN.rallies.push({ lead: id, R: D0 ? +S0.Rt : +S0.R, tier: D0 ? S0.tThem : S0.tUs }); }
    re(); });
  /* 🗡️ */
  const S = PLAN.ss;
  on("ss_plan", (e) => { S.plan = e.target.value; S.ov = {}; re(); });
  on("ss_kid", (e) => { S.kid = String(Math.floor(+e.target.value || 0) || ""); keep(); });
  on("ss_tag", (e) => { S.tag = e.target.value.trim().slice(0, 8); keep(); });
  if ($("ss_go")) $("ss_go").onclick = () => { const k = $("ss_kid"), g = $("ss_tag"); S.kid = String(Math.floor(+k.value || 0) || ""); S.tag = g.value.trim().slice(0, 8); keep();
    ssFetch(SSD && +SSD.kid === +S.kid && String(SSD.tag).toLowerCase() === S.tag.toLowerCase()); };
  [["ss_R", "R", 0, 5e6, 1200000], ["ss_Rt", "Rt", 0, 5e6, 1200000], ["ss_G", "G", 0, 2e7, 1500000], ["ss_per", "per", 1000, 2e6, 150000]]
    .forEach(([id, k, lo, hi, d]) => on(id, (e) => { S[k] = num(e.target.value, lo, hi, d); re(); }));
  on("ss_tUs", (e) => { S.tUs = e.target.value; re(); }); on("ss_tThem", (e) => { S.tThem = e.target.value; re(); });
  document.querySelectorAll("[data-w]").forEach((tr) => tr.onclick = () => { const k = wKey(); if (!k) return; const w = new Set(S.watch[k] || []), id = tr.dataset.w;
    if (w.has(id)) w.delete(id); else w.add(id); S.watch[k] = [...w]; re(); });
  /* ☑ ours: untick = out (kept per plan). Theirs in the ranking: untick = no longer picked */
  const pk = () => { const k = wKey(); S.pick = S.pick || {}; return k ? [k, new Set(S.pick[k] || [])] : [null, null]; };
  const setPick = (fn) => { const [k, o] = pk(); if (!k) return; fn(o); S.pick[k] = [...o]; re(); };
  document.querySelectorAll("[data-in]").forEach((c) => { c.onclick = (e) => e.stopPropagation();
    c.onchange = () => { const [side, id] = c.dataset.in.split("|");
      if (side === "t") return setPick((o) => { if (c.checked) o.add(id); else o.delete(id); });
      const k = "u:" + S.plan, o = new Set(S.off[k] || []); if (c.checked) o.delete(id); else o.add(id); S.off[k] = [...o]; re(); }; });
  document.querySelectorAll("[data-inall]").forEach((b) => b.onclick = () => { S.off["u:" + S.plan] = []; re(); });
  /* 🔍 their roster: search keeps the page as it is (only rows hide); a tick / × / buttons update the pick */
  const rq = $("ss_rq"); if (rq) rq.oninput = () => { rosterQ = rq.value; const n = norm(rq.value);
    document.querySelectorAll("#ss_roster [data-pr]").forEach((tr) => { const x = theirList().find((m) => m.id === tr.dataset.pr); tr.hidden = !!n && !(x && (norm(x.name).includes(n) || norm(x.rank).includes(n))); }); };
  document.querySelectorAll("#ss_roster input[data-pk]").forEach((c) => { c.onclick = (e) => e.stopPropagation(); c.onchange = () => setPick((o) => { if (c.checked) o.add(c.dataset.pk); else o.delete(c.dataset.pk); }); });
  document.querySelectorAll("#ss_roster tr[data-pr]").forEach((tr) => tr.onclick = () => setPick((o) => { const id = tr.dataset.pr; if (o.has(id)) o.delete(id); else o.add(id); }));
  document.querySelectorAll("#ss_roster b[data-pk]").forEach((b) => b.onclick = () => setPick((o) => o.delete(b.dataset.pk)));
  document.querySelectorAll("[data-pall]").forEach((b) => b.onclick = () => setPick((o) => theirList().forEach((x) => o.add(x.id))));
  document.querySelectorAll("[data-pnone]").forEach((b) => b.onclick = () => setPick((o) => o.clear()));
  on("ss_topN", (e) => { S.topN = num(e.target.value, 1, 200, 20); keep(); });
  document.querySelectorAll("[data-ptop]").forEach((b) => b.onclick = () => { const n = num(($("ss_topN") || {}).value, 1, 200, 20); S.topN = n; setPick((o) => { o.clear(); theirList().slice(0, n).forEach((x) => o.add(x.id)); }); });
  /* 🎯 leaders for the estimate (tap again = back to the strongest) */
  document.querySelectorAll("[data-ld]").forEach((b) => b.onclick = (e) => { e.stopPropagation(); const [side, id] = b.dataset.ld.split("|");
    if (side === "u") S.lu = S.lu === id ? "" : id; else { const k = wKey(); S.lt = S.lt || {}; S.lt[k] = S.lt[k] === id ? "" : id; } re(); });
  document.querySelectorAll("[data-sub]").forEach((tr) => tr.onclick = () => { const id = tr.dataset.sub, x = ourList().find((m) => m.id === id); if (!x) return; S.ov[id] = x.sub ? "c" : "s"; re(); });
}
async function loadSnap() {
  for (let i = 0; i < 8; i++) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x && x.boards) { SNAP = x; snapDay = d; break; } } catch (e) {} }
  await loadScout();
}
async function loadScout() {
  try { SCB = await OfficerData.fetchJson("data/scout-x7k2p9.json"); } catch (e) { SCB = null; }
  try { buildPlayers(); } catch (e) { console.warn("[compare] players", e); }
}
function applyTexts() { if ($("ak_title")) { $("ak_title").textContent = t("title"); $("ak_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("ak_root").innerHTML = `<div class="card muted">🔒</div>`; return; }
  $("ak_root").innerHTML = `<div class="card muted">⏳</div>`;
  try { await loadSnap(); } catch (e) { console.warn("[compare] load", e); }
  try { render(); } catch (e) { console.warn("[compare]", e); $("ak_root").innerHTML = `<div class="card muted">⚠️ ${esc(String((e && e.message) || e)).slice(0, 160)}</div>`; }
  if (OFFICER.ensure) OFFICER.ensure("scout");   // 🔭 Scout lives in this tab now (its own module, js/officer/scout.js)
}
function setLang(l) { lang = l; applyTexts(); if ($("ak_root") && $("ak_root").innerHTML) render(); }
window.addEventListener("nxs-scout", async () => { await loadScout(); if ($("ak_root") && $("ak_root").innerHTML) render(); });   // 🔭 a fetch finished
OFFICER_PAGES.attack = { init, applyTexts, setLang, onShow: () => { if (SNAP) render(); } };
})();
