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
   - ⚔️ / 🛡️ direction, joiner tier "mix" (mean of tier²), troop ratio (checked only; the model assumes 50:20:30).
   - Per rally R vs garrison G (p ≈ 1.75): G^p − r R^p stays constant; r R^p > G^p → we take it and (R^p − G^p / r)^(1/p) of ours
     stay as the new garrison; else their garrison drops to (G^p − r R^p)^(1/p) (+ reinforcements). Spec: claude/attack-planner-spec.md. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const B = 1.06;
const TIER = { T9: 1.0, T10: 1.18, TG1: 1.228, TG2: 1.289, TG3: 1.353 };
const T = {
  en: { title: "⚔️ Battle", intro: "Plan an attack from today's MightPulse boards (our side: Chenko joiners, 50 : 20 : 30), see the strongest players, scout other kingdoms (🔭, e.g. the KvK opponent).",
    aT: "⚔️ Plan the attack", tgt: "Target", tLead: "Their garrison leader", tG: "Garrison troops", tTier: "Their tier", terr: "In their own territory (+10% all)", us: "Our rallies (in order)", lead: "Leader", size: "Troops", tier: "Tier", addR: "➕ Rally", more: "More settings", debUs: "Their debuff on us (attack/defense −%)", debThem: "Our debuff on them (−%)", p: "p (1.5 – 2)", reinf: "Reinforcements between rallies", pick: "— choose —",
    res: "Result", colR: "Rally", colS: "Strength", colOut: "Result", win: "✅ We take it — {s} of ours stay", lose: "❌ Lost — {g} of theirs left", need: "Rallies like #1 needed: about {n}.", last: "Send expendable rallies first and the strongest leader last — the last rally's survivors hold the building.", one: "One of their troops ≈ {x} of ours (r = {r}).",
    unc: "Rallies like #1 needed for other garrison sizes and p:", caveat: "Rough estimate: it under-rates attackers (B24: model ≈ 300k left, real 587k). Not counted: hero skill kills, troop counters; a garrison may use its strongest member's stats.", noR: "Choose their garrison leader and at least one of our leaders.",
    bT: "📊 Today's strength", bNote: "Strength = Governor gear + Hero equip + Master power (millions). Only players in the kingdom top 100 of all three boards have one; others can't be chosen.", bData: "Boards from {d} · kingdom {k}", bNoData: "No MightPulse boards yet (saved every day at 20:45 UTC).", bOurs: "NXS", bThem: "Others", bFind: "Search a player…", bMiss: "below the top 100 on {b}", gear: "Gov gear", heq: "Hero equip", mst: "Master" },
  zh: { title: "⚔️ 作戰", intro: "用今天的 MightPulse 排行榜規劃進攻（我們這邊：琴科加入者、50 : 20 : 30），看各方主力的強度，偵查其他王國（🔭，例如 KvK 對手）。",
    aT: "⚔️ 規劃進攻", tgt: "目標", tLead: "對方駐守隊長", tG: "守軍兵數", tTier: "對方兵等", terr: "在他們自己的領地（四項 +10%）", us: "我們的集結（照順序）", lead: "隊長", size: "兵數", tier: "兵等", addR: "➕ 集結", more: "更多設定", debUs: "對方給我們的減益（攻擊／防禦 −%）", debThem: "我們給對方的減益（−%）", p: "p（1.5 – 2）", reinf: "每波之間對方補兵", pick: "— 選擇 —",
    res: "結果", colR: "集結", colS: "強度", colOut: "結果", win: "✅ 打下來了——我們剩 {s}", lose: "❌ 輸了——對方剩 {g}", need: "照第 1 波這種集結：大約要 {n} 波。", last: "可以犧牲的集結先上，最強的隊長最後——最後一波的生還者會守建築。", one: "對方一個兵 ≈ 我們 {x} 個兵（r = {r}）。",
    unc: "換成其他守軍兵數和 p，照第 1 波這種集結要幾波：", caveat: "粗估：會低估攻方（B24：模型剩約 30 萬，實際 58.7 萬）。沒算到：英雄技能擊殺、兵種相剋；守軍可能用裡面最強的人的屬性。", noR: "請選對方駐守隊長，和至少一位我們的隊長。",
    bT: "📊 今天的強度", bNote: "強度 = 領主裝備 + 英雄裝備 + 大師戰力（百萬）。三個榜都在王國前 100 名的人才有強度，其他人不能選。", bData: "排行榜日期 {d} · 王國 {k}", bNoData: "還沒有 MightPulse 排行榜資料（每天 20:45 UTC 存一份）。", bOurs: "NXS", bThem: "其他聯盟", bFind: "搜尋玩家…", bMiss: "{b} 不在前 100 名", gear: "領主裝備", heq: "英雄裝備", mst: "大師" },
  pt: { title: "⚔️ Batalha", intro: "Planeje um ataque pelos rankings de hoje do MightPulse (nosso lado: Chenko, 50 : 20 : 30), veja os jogadores mais fortes, espie outros reinos (🔭, ex.: o adversário do KvK).",
    aT: "⚔️ Planejar o ataque", tgt: "Alvo", tLead: "Líder da guarnição deles", tG: "Tropas da guarnição", tTier: "Nível deles", terr: "No território deles (+10% em tudo)", us: "Nossos rallies (em ordem)", lead: "Líder", size: "Tropas", tier: "Nível", addR: "➕ Rally", more: "Mais opções", debUs: "Debuff deles em nós (ataque/defesa −%)", debThem: "Nosso debuff neles (−%)", p: "p (1,5 – 2)", reinf: "Reforços entre rallies", pick: "— escolha —",
    res: "Resultado", colR: "Rally", colS: "Força", colOut: "Resultado", win: "✅ Tomamos — ficam {s} nossos", lose: "❌ Perdemos — restam {g} deles", need: "Rallies como o nº 1 necessários: cerca de {n}.", last: "Mande os rallies dispensáveis primeiro e o líder mais forte por último — os sobreviventes do último seguram o prédio.", one: "Uma tropa deles ≈ {x} das nossas (r = {r}).",
    unc: "Rallies como o nº 1 necessários para outros tamanhos e p:", caveat: "Estimativa: subestima o atacante (B24: modelo ≈ 300 mil, real 587 mil). Fora: mortes por habilidades, vantagens de tipo; a guarnição pode usar os atributos do membro mais forte.", noR: "Escolha o líder da guarnição deles e pelo menos um líder nosso.",
    bT: "📊 Força de hoje", bNote: "Força = Equip. do governador + Equip. de heróis + Poder de mestre (milhões). Só quem está no top 100 do reino nos três tem força; os outros não podem ser escolhidos.", bData: "Rankings de {d} · reino {k}", bNoData: "Ainda sem rankings do MightPulse (salvos todo dia às 20:45 UTC).", bOurs: "NXS", bThem: "Outros", bFind: "Procurar jogador…", bMiss: "fora do top 100 em {b}", gear: "Equip. gov.", heq: "Equip. heróis", mst: "Mestre" },
  ar: { title: "⚔️ المعركة", intro: "خطّط هجومًا من لوحات MightPulse اليوم (جانبنا: Chenko و50 : 20 : 30)، وشاهد أقوى اللاعبين، واستطلع ممالك أخرى (🔭، مثل خصم KvK).",
    aT: "⚔️ خطّط الهجوم", tgt: "الهدف", tLead: "قائد حاميتهم", tG: "جنود الحامية", tTier: "مستواهم", terr: "في أرضهم (+10% للكل)", us: "حشودنا (بالترتيب)", lead: "القائد", size: "الجنود", tier: "المستوى", addR: "➕ حشد", more: "إعدادات أخرى", debUs: "إضعافهم علينا (هجوم/دفاع −%)", debThem: "إضعافنا عليهم (−%)", p: "p (1.5 – 2)", reinf: "تعزيزات بين الحشود", pick: "— اختر —",
    res: "النتيجة", colR: "حشد", colS: "القوة", colOut: "النتيجة", win: "✅ نأخذه — يبقى {s} من جنودنا", lose: "❌ خسرنا — يبقى {g} من جنودهم", need: "حشود مثل رقم 1 المطلوبة: نحو {n}.", last: "أرسل الحشود التي يمكن التضحية بها أولًا والقائد الأقوى أخيرًا — الناجون من آخر حشد يحمون المبنى.", one: "جندي واحد منهم ≈ {x} من جنودنا (r = {r}).",
    unc: "عدد الحشود مثل رقم 1 لأحجام وقيم p أخرى:", caveat: "تقدير تقريبي: يقلّل من قوة المهاجم (B24: النموذج ≈ 300 ألف، الفعلي 587 ألفًا). غير محسوب: قتلى المهارات وأفضلية الأنواع؛ قد تستخدم الحامية إحصاءات أقوى عضو.", noR: "اختر قائد حاميتهم وقائدًا واحدًا على الأقل منا.",
    bT: "📊 قوة اليوم", bNote: "القوة = عتاد الحاكم + عتاد الأبطال + قوة المعلّم (بالملايين). فقط من هو ضمن أفضل 100 في المملكة في اللوحات الثلاث له قوة؛ لا يمكن اختيار غيرهم.", bData: "لوحات {d} · المملكة {k}", bNoData: "لا توجد لوحات MightPulse بعد (تُحفظ يوميًا 20:45 UTC).", bOurs: "NXS", bThem: "آخرون", bFind: "ابحث عن لاعب…", bMiss: "خارج أفضل 100 في {b}", gear: "عتاد الحاكم", heq: "عتاد الأبطال", mst: "المعلّم" },
  ko: { title: "⚔️ 작전", intro: "오늘의 MightPulse 랭킹으로 공격을 계획하고 (우리: Chenko 참가자, 50 : 20 : 30), 가장 강한 플레이어를 보고, 다른 왕국을 정찰하고 (🔭, 예: KvK 상대)해요.",
    aT: "⚔️ 공격 계획 세우기", tgt: "목표", tLead: "그들 주둔 대장", tG: "주둔 병력", tTier: "그들 등급", terr: "그들 영토 안 (전부 +10%)", us: "우리 집결 (순서대로)", lead: "대장", size: "병력", tier: "등급", addR: "➕ 집결", more: "추가 설정", debUs: "그들이 우리에게 거는 디버프 (공격/방어 −%)", debThem: "우리가 거는 디버프 (−%)", p: "p (1.5 – 2)", reinf: "집결 사이 그들의 증원", pick: "— 선택 —",
    res: "결과", colR: "집결", colS: "강도", colOut: "결과", win: "✅ 점령 — 우리 {s} 남음", lose: "❌ 패배 — 그들 {g} 남음", need: "1번 같은 집결이 약 {n}번 필요해요.", last: "희생해도 되는 집결을 먼저, 가장 강한 대장을 마지막에 — 마지막 집결의 생존자가 건물을 지켜요.", one: "그들 병사 1명 ≈ 우리 {x}명 (r = {r}).",
    unc: "다른 주둔 병력과 p에서 1번 같은 집결이 몇 번 필요한지:", caveat: "대략적인 계산: 공격 쪽을 낮게 봐요 (B24: 모델 약 30만, 실제 58.7만). 계산에 없는 것: 영웅 스킬 처치, 병종 상성; 주둔군이 가장 강한 멤버의 능력치를 쓸 수도 있어요.", noR: "그들 주둔 대장과 우리 대장을 한 명 이상 고르세요.",
    bT: "📊 오늘의 강도", bNote: "강도 = 영주 장비 + 영웅 장비 + 마스터 전투력 (백만). 세 랭킹 모두 왕국 상위 100 안인 사람만 강도가 있어요. 나머지는 고를 수 없어요.", bData: "랭킹 날짜 {d} · 왕국 {k}", bNoData: "아직 MightPulse 랭킹이 없어요 (매일 20:45 UTC 저장).", bOurs: "NXS", bThem: "다른 연맹", bFind: "플레이어 찾기…", bMiss: "{b} 상위 100 밖", gear: "영주 장비", heq: "영웅 장비", mst: "마스터" },
};
/* 🏰 in our kingdom vs ⚔️ KvK: who counts as "us" and "them" */
const MT = {"en": {"mHome": "🏰 In our kingdom", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "Other alliances in #2189", "usKvk": "Our kingdom #2189", "themKvk": "KvK opponent", "noKvk": "No other kingdom yet. In 🔭 Scout below, add the KvK opponent and tick “update daily” — press “Fetch now” — its players show here a few minutes later (refresh the page)."}, "zh": {"mHome": "🏰 王國內", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "#2189 其他聯盟", "usKvk": "我們王國 #2189", "themKvk": "KvK 對手", "noKvk": "還沒有其他王國的資料。在下面的 🔭 偵查加上 KvK 對手並勾「每天更新」，按「立即抓取」——幾分鐘後重新整理就會出現。"}, "pt": {"mHome": "🏰 No nosso reino", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "Outras alianças em #2189", "usKvk": "Nosso reino #2189", "themKvk": "Adversário do KvK", "noKvk": "Ainda sem outro reino. No 🔭 Espiar abaixo, adicione o adversário do KvK e marque “atualizar todo dia” — aperte “Buscar agora” — os jogadores aparecem aqui alguns minutos depois (atualize a página)."}, "ar": {"mHome": "🏰 داخل مملكتنا", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "تحالفات أخرى في ‎#2189", "usKvk": "مملكتنا ‎#2189", "themKvk": "خصم KvK", "noKvk": "لا توجد مملكة أخرى بعد. في 🔭 الاستطلاع بالأسفل أضف خصم KvK وفعّل «تحديث يومي» — اضغط «جلب الآن» — يظهر لاعبوه هنا بعد دقائق (حدّث الصفحة)."}, "ko": {"mHome": "🏰 우리 왕국 안", "mKvk": "⚔️ KvK", "usHome": "NXS", "themHome": "#2189 다른 연맹", "usKvk": "우리 왕국 #2189", "themKvk": "KvK 상대", "noKvk": "아직 다른 왕국이 없어요. 아래 🔭 정찰에서 KvK 상대를 추가하고 “매일 업데이트”를 체크하면 “지금 가져오기”를 누르세요 — 몇 분 뒤 새로고침하면 여기 나와요."}};
/* 🗡️ Swordland, ⚔️/🛡️ direction, tier mix, troop ratio (2026-10-30) — added on top of T / MT; same keys override the old wording */
const NT = {
  en: { tTierD: "Our tier", mSs: "🗡️ Swordland", dirA: "⚔️ We attack", dirD: "🛡️ They attack us", tgtD: "Our garrison", tLeadD: "Our garrison leader", usD: "Their rallies (in order)",
    debUs: "Debuff on the attackers (attack/defense −%)", debThem: "Debuff on the garrison (−%)", terr: "Garrison in its own territory (+10% all)",
    winD: "❌ They take it — {s} of theirs stay", loseD: "✅ We hold — {g} of ours left", needD: "Rallies like their #1 needed to take it: about {n}.",
    holdD: "To hold against all these rallies at once: at least {g} troops in the building.", lastD: "Keep reinforcing between their rallies — every troop that arrives in time counts in full.",
    mix: "Mix…", mixNote: "Joiners by tier (head count)", mixEq: "≈ {t} on average",
    tr: "Troop ratio (Infantry : Cavalry : Archers)", trUs: "Ours", trThem: "Theirs (guess)", trSum: "{s}: adds up to {n}%, not 100%.",
    trLow: "{s}: Infantry under 40%. In our simulation an even fight then lost far more troops (35:35:30 kept 14% fewer, 30:40:30 under half). The numbers here assume 50:20:30, so they are too kind.",
    trNote: "The estimate assumes 50:20:30 for both sides; the ratio is only checked.",
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
  zh: { tTierD: "我方兵等", mSs: "🗡️ 聖劍", dirA: "⚔️ 我們進攻", dirD: "🛡️ 對方打我們", tgtD: "我方駐軍", tLeadD: "我方駐軍隊長", usD: "對方集結（依順序）",
    debUs: "攻方被減益（攻擊／防禦 −%）", debThem: "守方被減益（−%）", terr: "守方在自己領土（全屬性 +10%）",
    winD: "❌ 被打下——對方剩 {s}", loseD: "✅ 守住——我方剩 {g}", needD: "要打下需要像對方 #1 這樣的集結：約 {n} 團。",
    holdD: "同時擋下這些集結：建築裡至少要有 {g} 兵。", lastD: "對方集結之間要一直增援——及時到的兵全部都算。",
    mix: "混合…", mixNote: "加入集結的人（依兵等算人數）", mixEq: "平均約 {t}",
    tr: "兵種比例（步兵：騎兵：弓兵）", trUs: "我方", trThem: "對方（猜）", trSum: "{s}：加起來是 {n}%，不是 100%。",
    trLow: "{s}：步兵低於 40%。我們的模擬裡，勢均力敵時會多死很多兵（35:35:30 少剩 14%，30:40:30 剩不到一半）。這裡的數字是用 50:20:30 算的，所以會太樂觀。",
    trNote: "估算本身雙方都當 50:20:30，比例只用來檢查。",
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
  pt: { tTierD: "Nosso nível", mSs: "🗡️ Terra das Espadas", dirA: "⚔️ Nós atacamos", dirD: "🛡️ Eles nos atacam", tgtD: "Nossa guarnição", tLeadD: "Líder da nossa guarnição", usD: "Os comícios deles (em ordem)",
    debUs: "Debuff nos atacantes (ataque/defesa −%)", debThem: "Debuff na guarnição (−%)", terr: "Guarnição no próprio território (+10% em tudo)",
    winD: "❌ Eles tomam — ficam {s} deles", loseD: "✅ Seguramos — ficam {g} nossos", needD: "Comícios como o #1 deles para tomar: cerca de {n}.",
    holdD: "Para segurar todos esses comícios de uma vez: pelo menos {g} tropas no prédio.", lastD: "Continue reforçando entre os comícios — toda tropa que chega a tempo conta inteira.",
    mix: "Mistura…", mixNote: "Quem entra no comício, por nível (nº de pessoas)", mixEq: "≈ {t} em média",
    tr: "Proporção (Infantaria : Cavalaria : Arquearia)", trUs: "Nossa", trThem: "Deles (palpite)", trSum: "{s}: soma {n}%, não 100%.",
    trLow: "{s}: Infantaria abaixo de 40%. Na nossa simulação, uma luta equilibrada perdeu muito mais tropas (35:35:30 ficou com 14% menos, 30:40:30 com menos da metade). Os números aqui supõem 50:20:30, então ficam otimistas demais.",
    trNote: "A estimativa supõe 50:20:30 para os dois lados; a proporção só é verificada.",
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
  ar: { tTierD: "مستوانا", mSs: "🗡️ أرض السيوف", dirA: "⚔️ نحن نهاجم", dirD: "🛡️ هم يهاجموننا", tgtD: "حاميتنا", tLeadD: "قائد حاميتنا", usD: "حشودهم (بالترتيب)",
    debUs: "إضعاف على المهاجمين (هجوم/دفاع −%)", debThem: "إضعاف على الحامية (−%)", terr: "الحامية في أرضها (+10% لكل شيء)",
    winD: "❌ يأخذونه — يبقى {s} من قواتهم", loseD: "✅ نصمد — يبقى {g} من قواتنا", needD: "عدد الحشود مثل حشدهم ‎#1 للسيطرة: نحو {n}.",
    holdD: "للصمود أمام كل هذه الحشود معًا: على الأقل {g} جندي في المبنى.", lastD: "واصلوا التعزيز بين حشودهم — كل جندي يصل في الوقت يُحسب كاملًا.",
    mix: "خليط…", mixNote: "المنضمون حسب المستوى (عدد الأشخاص)", mixEq: "≈ {t} في المتوسط",
    tr: "نسبة القوات (المشاة : الفرسان : الرماة)", trUs: "نحن", trThem: "هم (تخمين)", trSum: "{s}: المجموع {n}% وليس 100%.",
    trLow: "{s}: المشاة أقل من 40%. في محاكاتنا خسرت المعركة المتكافئة قوات أكثر بكثير (35:35:30 أبقى 14% أقل، و30:40:30 أقل من النصف). الأرقام هنا تفترض 50:20:30 فهي متفائلة أكثر من اللازم.",
    trNote: "التقدير يفترض 50:20:30 للطرفين؛ النسبة للتحقق فقط.",
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
  ko: { tTierD: "우리 등급", mSs: "🗡️ 성검", dirA: "⚔️ 우리가 공격", dirD: "🛡️ 상대가 공격", tgtD: "우리 주둔군", tLeadD: "우리 주둔군 대장", usD: "상대 집결 (순서대로)",
    debUs: "공격 측 디버프 (공격/방어 −%)", debThem: "수비 측 디버프 (−%)", terr: "수비 측이 자기 영토 안 (전 능력 +10%)",
    winD: "❌ 빼앗김 — 상대 {s} 남음", loseD: "✅ 지켜냄 — 우리 {g} 남음", needD: "빼앗으려면 상대 #1 같은 집결이 약 {n}번 필요.",
    holdD: "이 집결을 한꺼번에 막으려면: 건물 안에 최소 {g} 병력.", lastD: "상대 집결 사이사이 계속 지원하세요 — 제때 도착한 병력은 전부 계산됩니다.",
    mix: "혼합…", mixNote: "집결 참가자 (병종 등급별 인원)", mixEq: "평균 약 {t}",
    tr: "병종 비율 (보병 : 기병 : 궁병)", trUs: "우리", trThem: "상대 (추정)", trSum: "{s}: 합이 {n}%예요, 100%가 아니에요.",
    trLow: "{s}: 보병 40% 미만. 우리 시뮬레이션에서는 비슷한 싸움에서 병력을 훨씬 많이 잃었어요 (35:35:30은 14% 적게 남고, 30:40:30은 절반도 안 남음). 여기 숫자는 50:20:30 기준이라 너무 낙관적이에요.",
    trNote: "추정은 양쪽 모두 50:20:30 기준이고, 비율은 확인용이에요.",
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

let SNAP = null, snapDay = null, findQ = "";
const SSDEF = { plan: "", ov: {}, kid: "", tag: "", K: 3, R: 1200000, Rt: 1200000, G: 1500000, per: 150000, tUs: "TG2", mUs: null, tThem: "TG2", mThem: null };
const PDEF = { mode: "home", dir: "atk", tgt: "", G: 1000000, gt: "TG2", gmix: null, terr: true, dUs: 0, dThem: 0, p: 1.75, re: 0, trUs: [50, 20, 30], trThem: [50, 20, 30],
  rallies: [{ lead: "", R: 1200000, tier: "TG2" }], ss: SSDEF };
const clone = (x) => JSON.parse(JSON.stringify(x));
let PLAN = (() => { try { const p = JSON.parse(localStorage.getItem("nxs-attack-v2")); return p && Array.isArray(p.rallies) ? p : null; } catch (e) { return null; } })();
PLAN = Object.assign(clone(PDEF), PLAN || {}); PLAN.ss = Object.assign(clone(SSDEF), PLAN.ss || {});
const keep = () => { try { localStorage.setItem("nxs-attack-v2", JSON.stringify(PLAN)); } catch (e) {} };

/* players on the newest snapshot's boards: gid → { name, al, kid, b: { board: score } } */
const B3 = ["gov_gear", "hero_equip", "master_power"];
let PL = {}, CPOW = null;
function buildPlayers() {
  PL = {}; if (!SNAP || !SNAP.boards) return;
  for (const [key, bd] of Object.entries(SNAP.boards)) { const [kid, board] = key.split(":");
    for (const r of bd.rows || []) { const id = String(r.governor_id); const p = PL[id] = PL[id] || { id, name: r.nick_name, al: r.alliance_abbr || "", kid: +kid, b: {} }; p.b[board] = r.score; } }
  /* Strength per million Power (median of everyone who has both) — to estimate S for players below the top 100 */
  const q = Object.values(PL).filter((p) => sOf(p) && p.b.personal_power).map((p) => sOf(p) / (p.b.personal_power / 1e6)).sort((a, b) => a - b);
  CPOW = q.length ? q[q.length >> 1] : null;
}
const sOf = (p) => p && B3.every((b) => p.b[b] != null) ? B3.reduce((s, b) => s + p.b[b] / 1e6, 0) : null;
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
const sel = (attr, v, list) => `<select class="inp" ${attr}><option value="">${esc(t("pick"))}</option>${list.map((p) => `<option value="${esc(p.id)}"${v === p.id ? " selected" : ""}>${esc(p.name)}${p.al && !ours(p) ? ` [${esc(p.al)}]` : ""} · ${sOf(p).toFixed(1)}</option>`).join("")}</select>`;
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
  const warn = []; for (const [side, arr] of [["us", PLAN.trUs], ["them", PLAN.trThem]]) { const s = t(side === "us" ? "trUs" : "trThem"), n = arr.reduce((a, b) => a + (+b || 0), 0);
    if (n !== 100) warn.push(fill(t("trSum"), { s, n })); else if (+arr[0] < 40) warn.push(fill(t("trLow"), { s })); }
  return `<div class="ak-box"><b>${esc(t("tr"))}</b>${row("us", PLAN.trUs)}${row("them", PLAN.trThem)}
    ${warn.map((w) => `<div class="mv-warn" style="font-size:12.5px;margin-top:6px">⚠️ ${esc(w)}</div>`).join("")}<div class="muted" style="font-size:12px;margin-top:4px">${esc(t("trNote"))}</div></div>`;
}
const modeBar = () => `<div class="ak-mode" role="tablist">${[["home", t("mHome")], ["kvk", t("mKvk")], ["ss", t("mSs")]].map(([k, l]) => `<button type="button" class="btn${(PLAN.mode || "home") === k ? " on" : ""}" data-mode="${k}">${esc(l)}</button>`).join("")}</div>`;
const dirBar = () => `<div class="ak-mode ak-dir">${[["atk", t("dirA")], ["def", t("dirD")]].map(([k, l]) => `<button type="button" class="btn small${PLAN.dir === k ? " on" : ""}" data-dir="${k}">${esc(l)}</button>`).join("")}</div>`;

/* ---------- ⚔️ / 🛡️ planner ---------- */
function planCard() {
  const D = isDef(), gList = strong(D), rList = strong(!D), c = chain();
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
      <div style="margin-top:10px;font-size:13px">${esc(t("unc"))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>G \\ p</th>${[1.5, 1.75, 2].map((p) => `<th>${p}</th>`).join("")}</tr></thead><tbody>
      ${[1.0e6, 1.3e6, 1.6e6].map((G) => `<tr><td>${fmtN(G)}</td>${[1.5, 1.75, 2].map((p) => { const x = needN(G, p); return `<td>${x ? (x <= 1 ? "1" : x.toFixed(1)) : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`; }
  return `<h3 style="margin:0 0 6px">${esc(t("aT"))}</h3>${dirBar()}
    <div class="ak-box"><b>${esc(t(D ? "tgtD" : "tgt"))}</b>
      <div class="ak-f"><span>${esc(t(D ? "tLeadD" : "tLead"))}</span>${sel('id="ak_tgt"', PLAN.tgt, gList)}</div>
      <div class="ak-f"><span>${esc(t("tG"))}</span><input class="inp" type="number" id="ak_G" value="${PLAN.G}" step="50000"></div>
      <div class="ak-f"><span>${esc(t(D ? "tTierD" : "tTier"))}</span>${tierSel('id="ak_gt"', PLAN.gt)}</div>${mixBox("g", PLAN.gt, PLAN.gmix)}
      <label class="row" style="gap:6px;font-size:13px;margin-top:4px"><input type="checkbox" id="ak_terr"${PLAN.terr ? " checked" : ""}> ${esc(t("terr"))}</label></div>
    <div class="ak-box"><b>${esc(t(D ? "usD" : "us"))}</b> <span class="muted" style="font-size:12px">${esc(t("lead"))} · ${esc(t("size"))} · ${esc(t("tier"))}</span>${rallies}<button class="btn small" id="ak_addR">${esc(t("addR"))}</button></div>
    ${trBox()}
    <details class="ak-more" id="ak_more"${OPEN.has("ak_more") ? " open" : ""}><summary>${esc(t("more"))}</summary>
      <div class="ak-f"><span>${esc(t("debUs"))}</span><input class="inp" type="number" id="ak_dUs" value="${PLAN.dUs}"></div>
      <div class="ak-f"><span>${esc(t("debThem"))}</span><input class="inp" type="number" id="ak_dThem" value="${PLAN.dThem}"></div>
      <div class="ak-f"><span>${esc(t("p"))}</span><input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5"></div>
      <div class="ak-f"><span>${esc(t("reinf"))}</span><input class="inp" type="number" id="ak_re" value="${PLAN.re}" step="10000"></div></details>
    <h4 style="margin:12px 0 4px">${esc(t("res"))}</h4>${res}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("caveat"))}</div>`;
}
function boardsCard() {
  if (!SNAP) return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted">${esc(t("bNoData"))}</div>`;
  const kids = [...new Set(Object.keys(SNAP.boards).map((k) => k.split(":")[0]))].join(", ");
  const row = (p) => `<tr><td dir="auto">${esc(p.name)}${!ours(p) && p.al ? ` <span class="muted">[${esc(p.al)}]</span>` : ""}${p.kid !== 2189 ? ` <span class="muted">#${p.kid}</span>` : ""}</td><td><b>${sOf(p).toFixed(1)}</b></td><td>${(p.b.gov_gear / 1e6).toFixed(1)}</td><td>${(p.b.hero_equip / 1e6).toFixed(1)}</td><td>${(p.b.master_power / 1e6).toFixed(1)}</td></tr>`;
  const head = `<thead><tr><th></th><th>${esc(t("colS"))}</th><th>${esc(t("gear"))}</th><th>${esc(t("heq"))}</th><th>${esc(t("mst"))}</th></tr></thead>`;
  const q = norm(findQ), hits = q.length >= 2 ? Object.values(PL).filter((p) => norm(p.name).includes(q)).slice(0, 8) : [];
  const lbl = { gov_gear: t("gear"), hero_equip: t("heq"), master_power: t("mst") };
  return `<h3 style="margin:0 0 4px">${esc(t("bT"))}</h3><div class="muted" style="font-size:12.5px">${esc(t("bNote"))}</div>
    <div class="muted" style="font-size:12.5px;margin:4px 0 8px">${esc(fill(t("bData"), { d: snapDay, k: kids }))}</div>
    <input class="inp" id="ak_find" placeholder="${esc(t("bFind"))}" value="${esc(findQ)}" style="max-width:260px">
    <div id="ak_hits">${hits.map((p) => sOf(p) ? `<div class="ak-hit">${esc(p.name)} <span class="muted">[${esc(p.al)}]</span> · ${esc(t("colS"))} <b>${sOf(p).toFixed(1)}</b></div>`
      : `<div class="ak-hit">${esc(p.name)} <span class="muted">[${esc(p.al)}] · ${esc(fill(t("bMiss"), { b: B3.filter((b) => p.b[b] == null).map((b) => lbl[b]).join(", ") }))}</span></div>`).join("")}</div>
    ${kvk() && !strong(false).length ? `<div class="mv-warn" style="font-size:12.5px;margin-top:8px">${esc(t("noKvk"))}</div>` : ""}
    <div class="ak-cols"><div><h4>${esc(t(kvk() ? "usKvk" : "usHome"))}</h4><div class="ak-tw"><table class="ak-t">${head}<tbody>${strong(true).slice(0, 15).map(row).join("")}</tbody></table></div></div>
      <div><h4>${esc(t(kvk() ? "themKvk" : "themHome"))}</h4><div class="ak-tw"><table class="ak-t">${head}<tbody>${strong(false).slice(0, 15).map(row).join("")}</tbody></table></div></div></div>`;
}

/* ---------- 🗡️ Swordland ---------- */
const OPEN = new Set();   // which ▸ sections stay open across re-renders
let ROSTER = null, PLANS = null, plansErr = "", SSD = null, ssMsg = "", ssBusy = false;
try { SSD = JSON.parse(sessionStorage.getItem("nxs-ss-opp")); } catch (e) {}
const ssSave = () => { try { sessionStorage.setItem("nxs-ss-opp", JSON.stringify(SSD)); } catch (e) {} };
/* S of one person: from today's boards (3 boards), else ≈ Power × the median S per million Power */
const sFrom = (b, power) => { if (b && B3.every((k) => b[k] != null)) return { S: B3.reduce((s, k) => s + b[k] / 1e6, 0), est: false };
  return power && CPOW ? { S: power / 1e6 * CPOW, est: true } : { S: null, est: true }; };
async function ssLoad() {
  if (!ROSTER) { try { ROSTER = await OfficerData.fetchJson("data/roster-x7k2p9.json"); } catch (e) { ROSTER = { members: [] }; } }
  if (!PLANS) {
    try { const r = await fetch(AI_URL + "/plans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...OFFICER.authBody(), op: "list" }), cache: "no-store" });
      const j = await r.json(); if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
      PLANS = j.plans || {}; plansErr = j.error || ""; } catch (e) { PLANS = {}; plansErr = "net"; }
  }
}
function ourList() {
  const p = PLANS && PLANS[PLAN.ss.plan]; if (!p) return [];
  const byId = new Map(((ROSTER && ROSTER.members) || []).map((m) => [String(m.id), m])), subs = new Set((p.subs || []).map(String));
  return (p.picked || []).map(String).map((id) => { const m = byId.get(id) || {}, pl = PL[id], s = sFrom(pl && pl.b, m.power || (pl && pl.b.personal_power));
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
function ssAnalyze(us, them) {
  const S = PLAN.ss, P = PLAN.p, K = Math.max(1, Math.min(10, +S.K || 3));
  const tu = t2(S.tUs, S.mUs), tt = t2(S.tThem, S.mThem);
  const uTop = us.filter((x) => x.S).slice(0, K), hTop = them.filter((x) => x.S).slice(0, K);
  if (!uTop.length || !hTop.length) return null;
  /* ① take it: their garrison led by their strongest; our K rallies, weaker leaders first, the strongest last */
  const order = [...uTop].reverse(), hLead = hTop[0];
  const c = chainOf(+S.G || 0, order.map((u) => ({ k: rr(u.S, hLead.S, tu, tt, false), R: +S.R })), P, 0);
  const last = c[c.length - 1], best = uTop[0], kb = rr(best.S, hLead.S, tu, tt, false);
  /* ② hold it: our garrison led by our strongest; their K strongest rallies at once */
  const uLead = uTop[0], gm = gMin(hTop.map((h) => ({ k: rr(h.S, uLead.S, tt, tu, false), R: +S.Rt })), P);
  return { order, hLead, win: last && last.win, left: last ? last.left : +S.G, n: c.length, best, need: (+S.G) ** P / (kb * (+S.R) ** P), K: uTop.length,
    uLead, hTop, gm, people: Math.ceil(gm / Math.max(1, +S.per || 150000)) };
}
function ssResult(a) {
  if (!a) return `<div class="muted">${esc(t("ssNeed"))}</div>`;
  const nm = (l) => l.map((x) => x.name).join(" → ");
  return `<div class="ak-q"><b>${esc(t("q1"))}</b><div class="${a.win ? "ak-good" : "ak-bad"}">${esc(a.win ? fill(t("q1win"), { n: a.n, s: fmtN(a.left) }) : fill(t("q1lose"), { k: a.K, g: fmtN(a.left), best: a.best.name, n: a.need <= 1 ? "1" : a.need.toFixed(1) }))}</div>
      <div class="muted" style="font-size:12px" dir="auto">${esc(fill(t("q1Note"), { lead: a.hLead.name, names: nm(a.order) }))}</div></div>
    <div class="ak-q"><b>${esc(t("q2"))}</b><div class="ak-big">${esc(fill(t("q2res"), { g: fmtN(a.gm), n: a.people }))}</div>
      <div class="muted" style="font-size:12px" dir="auto">${esc(fill(t("q2Note"), { k: a.hTop.length, names: a.hTop.map((x) => x.name).join(", "), lead: a.uLead.name }))}</div></div>`;
}
function ssCard() {
  const S = PLAN.ss, us = ourList(), them = theirList();
  const ids = Object.entries(PLANS || {}).sort((a, b) => String(a[1].name || "").localeCompare(String(b[1].name || "")));
  const sTxt = (x) => x.S ? `${x.est ? "≈" : ""}${x.S.toFixed(1)}` : "—";
  const conf = us.filter((x) => !x.sub), subs = us.filter((x) => x.sub);
  const ourTbl = !us.length ? "" : `<div class="muted" style="font-size:12.5px;margin:6px 0">${esc(t("ssSubHint"))} · <b>${esc(fill(t("ssCnt"), { c: conf.length, s: subs.length }))}</b></div>
    <div class="ak-tw ak-list"><table class="ak-t"><thead><tr><th>${esc(t("nm"))}</th><th>${esc(t("colS"))}</th><th>${esc(t("pw"))}</th><th></th></tr></thead><tbody>
    ${us.map((x) => `<tr data-sub="${esc(x.id)}" class="ak-tap${x.sub ? " ak-sub" : ""}"><td dir="auto">${esc(x.name)}</td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td><td>${esc(t(x.sub ? "subL" : "conf"))}</td></tr>`).join("")}</tbody></table></div>`;
  const best = conf.find((x) => x.S) || us.find((x) => x.S);
  const watch = them.filter((x) => x.S || x.power).slice(0, 10);
  const nEst = them.filter((x) => x.S && !x.est).length;
  const oppTbl = !SSD ? "" : `<div class="muted" style="font-size:12.5px;margin:6px 0">${esc(fill(t("ssGot"), { tag: SSD.tag, name: SSD.name, kid: SSD.kid, n: SSD.members.length, t: new Date(SSD.fetched).toLocaleTimeString() }))}
      · ${esc(fill(t("ssEstN"), { n: nEst }))}</div>`;
  const set = (id, k, step) => `<div class="ak-f"><span>${esc(t(k))}</span><input class="inp" type="number" id="${id}" value="${S[id.slice(3)]}" step="${step}"></div>`;
  return `<h3 style="margin:0 0 4px">${esc(t("ssT"))}</h3><div class="muted" style="font-size:12.5px">${esc(t("ssIntro"))}</div>
    <div class="ak-box"><b>${esc(t("ssOur"))}</b>
      <div class="ak-f"><span>${esc(t("ssPlan"))}</span>${ids.length ? `<select class="inp" id="ss_plan"><option value="">${esc(t("pick"))}</option>${ids.map(([id, p]) => `<option value="${esc(id)}"${id === S.plan ? " selected" : ""}>${esc(p.name || id)} (${(p.picked || []).length})</option>`).join("")}</select>` : `<span class="muted">${esc(t("ssNoPlan"))}</span>`}</div>
      ${ourTbl}</div>
    <div class="ak-box"><b>${esc(t("ssOpp"))}</b>
      <div class="ak-f"><span>${esc(t("ssKid"))}</span><input class="inp" type="number" id="ss_kid" value="${esc(S.kid)}" placeholder="2186"></div>
      <div class="ak-f"><span>${esc(t("ssTag"))}</span><input class="inp" id="ss_tag" value="${esc(S.tag)}" maxlength="8" placeholder="ABC"> <button class="btn small" id="ss_go"${ssBusy ? " disabled" : ""}>${esc(t(ssBusy ? "ssBusy" : "ssGo"))}</button></div>
      ${ssMsg ? `<div class="mv-warn" style="font-size:12.5px;margin-top:6px">${esc(ssMsg)}</div>` : ""}${oppTbl}</div>
    <details class="ak-box ak-more" id="ss_set"${OPEN.has("ss_set") || (!SSD && !OPEN.has("-ss_set")) ? " open" : ""}><summary><b>${esc(t("ssSet"))}</b></summary>
      ${set("ss_K", "ssK", 1)}${set("ss_R", "ssR", 50000)}${set("ss_Rt", "ssRt", 50000)}${set("ss_G", "ssG", 100000)}${set("ss_per", "ssPer", 10000)}
      <div class="ak-f"><span>${esc(t("ssTu"))}</span>${tierSel('id="ss_tUs"', S.tUs)}</div>${mixBox("su", S.tUs, S.mUs)}
      <div class="ak-f"><span>${esc(t("ssTt"))}</span>${tierSel('id="ss_tThem"', S.tThem)}</div>${mixBox("st", S.tThem, S.mThem)}
      <div class="ak-f"><span>${esc(t("p"))}</span><input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5"></div></details>
    ${trBox()}
    <h4 style="margin:12px 0 4px">${esc(t("ssRes"))}</h4>
    <div class="ak-cols"><div><h4>${esc(t("cOnly"))}</h4>${ssResult(ssAnalyze(conf, them))}</div>
      <div><h4>${esc(t("cSubs"))}</h4>${subs.length ? ssResult(ssAnalyze(us, them)) : `<div class="muted">—</div>`}</div></div>
    ${watch.length ? `<h4 style="margin:12px 0 4px">${esc(t("q3"))}</h4><div class="muted" style="font-size:12px">${esc(t("q3Note"))} ${esc(t("ssEst"))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th></th><th>${esc(t("nm"))}</th><th>${esc(t("colS"))}</th><th>${esc(t("pw"))}</th></tr></thead><tbody>
      ${watch.map((x) => `<tr><td>${best && x.S && x.S >= best.S * 0.95 ? "⚠️" : ""}</td><td dir="auto">${esc(x.name)}${x.rank ? ` <span class="muted">${esc(x.rank)}</span>` : ""}</td><td>${sTxt(x)}</td><td>${x.power ? fmtN(x.power) : "—"}</td></tr>`).join("")}</tbody></table></div>` : ""}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("ssCav"))}</div>`;
}

function render() {
  const root = $("ak_root"); if (!root) return;
  root.innerHTML = PLAN.mode === "ss" ? `${modeBar()}<div class="card" id="ak_ss">${ssCard()}</div>`
    : `${modeBar()}<div class="card" id="ak_plan">${planCard()}</div><div class="card" id="ak_board">${boardsCard()}</div>`;
  bind();
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
  document.querySelectorAll("[data-tr]").forEach((s) => s.onchange = () => { const [side, i] = s.dataset.tr.split("|"), a = side === "us" ? PLAN.trUs : PLAN.trThem; a[+i] = num(s.value, 0, 100, 0); re(); });
  if ($("ak_addR")) $("ak_addR").onclick = () => { const l = PLAN.rallies[PLAN.rallies.length - 1] || {}; PLAN.rallies.push({ lead: "", R: l.R || 1200000, tier: l.tier || "TG2", mix: l.mix ? { ...l.mix } : undefined }); re(); };
  const f = $("ak_find"); if (f) f.oninput = () => { findQ = f.value; const pos = f.selectionStart; $("ak_board").innerHTML = boardsCard(); bind(); const g = $("ak_find"); g.focus(); try { g.setSelectionRange(pos, pos); } catch (e) {} };
  document.querySelectorAll("details[id]").forEach((d) => d.ontoggle = () => { OPEN.delete(d.id); OPEN.delete("-" + d.id); OPEN.add(d.open ? d.id : "-" + d.id); });
  /* 🗡️ */
  const S = PLAN.ss;
  on("ss_plan", (e) => { S.plan = e.target.value; S.ov = {}; re(); });
  on("ss_kid", (e) => { S.kid = String(Math.floor(+e.target.value || 0) || ""); keep(); });
  on("ss_tag", (e) => { S.tag = e.target.value.trim().slice(0, 8); keep(); });
  if ($("ss_go")) $("ss_go").onclick = () => { const k = $("ss_kid"), g = $("ss_tag"); S.kid = String(Math.floor(+k.value || 0) || ""); S.tag = g.value.trim().slice(0, 8); keep();
    ssFetch(SSD && +SSD.kid === +S.kid && String(SSD.tag).toLowerCase() === S.tag.toLowerCase()); };
  [["ss_K", "K", 1, 10, 3], ["ss_R", "R", 0, 5e6, 1200000], ["ss_Rt", "Rt", 0, 5e6, 1200000], ["ss_G", "G", 0, 2e7, 1500000], ["ss_per", "per", 1000, 2e6, 150000]]
    .forEach(([id, k, lo, hi, d]) => on(id, (e) => { S[k] = num(e.target.value, lo, hi, d); re(); }));
  on("ss_tUs", (e) => { S.tUs = e.target.value; re(); }); on("ss_tThem", (e) => { S.tThem = e.target.value; re(); });
  document.querySelectorAll("[data-sub]").forEach((tr) => tr.onclick = () => { const id = tr.dataset.sub, x = ourList().find((m) => m.id === id); if (!x) return; S.ov[id] = x.sub ? "c" : "s"; re(); });
}
async function loadSnap() {
  for (let i = 0; i < 8; i++) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x && x.boards) { SNAP = x; snapDay = d; break; } } catch (e) {} }
  buildPlayers();
}
function applyTexts() { if ($("ak_title")) { $("ak_title").textContent = t("title"); $("ak_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("ak_root").innerHTML = `<div class="card muted">🔒</div>`; return; }
  await loadSnap(); render();
  if (PLAN.mode === "ss") { await ssLoad(); render(); }
  if (OFFICER.ensure) OFFICER.ensure("scout");   // 🔭 Scout lives in this tab now (its own module, js/officer/scout.js)
}
function setLang(l) { lang = l; applyTexts(); if ($("ak_root") && $("ak_root").innerHTML) render(); }
OFFICER_PAGES.attack = { init, applyTexts, setLang, onShow: () => { if (SNAP) render(); } };
})();
