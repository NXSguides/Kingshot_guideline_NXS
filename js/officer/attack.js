/* NXS officer page — ⚔️ Attack planner (registers OFFICER_PAGES.attack; own tab, nobody by default, admins always).
   Spec: Project doc claude/attack-planner-spec.md (analysis chat). A rough planning tool, not a simulator:
   - 📚 Known stats: battle-report stats (步/騎/弓 × attack, defense, lethality, health %) of players, saved encrypted for all officers
     in data/statsets-x7k2p9.json as { sets: [{ id, name, gid, al, src, date, role, note, fit, st: { inf:[a,d,l,h], cav:[…], arc:[…] } }], by, at }.
   - 🔮 Prediction: quality Qs = Σ w_k (1+atk)(1+leth)(1+def)(1+hp) with our 50:20:30 weights. The newest MightPulse snapshot
     (data/mp-history/, the daily job) gives S = gov_gear + hero_equip + master_power (millions, kingdom top 100 only).
     ln Qs = a + b ln S is fitted on the known stats that have S, then used for anyone on those boards.
   - ⚔️ Plan: r = Q_us / Q_them (Q = Qs × tier² × buffs). Per rally R vs garrison G (p ≈ 1.75): G^p − r R^p stays constant;
     r R^p > G^p → we win and our survivors (R^p − G^p / r)^(1/p) hold the building; else their garrison drops to (G^p − r R^p)^(1/p). */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const PATH = "data/statsets-x7k2p9.json";
const W = { inf: 0.5, cav: 0.2, arc: 0.3 };   // our rule: Chenko joiners, 50 : 20 : 30
const TIER = { T9: 1.0, T10: 1.18, TG1: 1.228, TG2: 1.289, TG3: 1.353 };
const T = {
  en: { title: "⚔️ Attack planner", intro: "How many rallies in a row a target needs, and who goes last. Our side always uses Chenko joiners and 50 : 20 : 30. Rough planning only — it under-rates attackers (B24: model ≈ 300k left, real 587k).",
    kT: "📚 Known stats (from battle reports)", kNote: "Each row = one player's stats from a battle report or rally screen (步/騎/弓 × attack / defense / lethality / health %). ✓ fit = used for the board prediction. Shared by all officers.",
    colName: "Player", colSrc: "Source", colQ: "Quality", colS: "Boards S", colFit: "fit", none: "No known stats yet.", add: "➕ Add stats", imp: "📥 Import (JSON)", impNote: "Paste the JSON you were given (or choose the file), then Import. Rows with the same name + source are replaced.", impOk: "Imported {n} rows.", impBad: "That isn't a stats list.", doImp: "Import", del: "Delete", edit: "Edit", save: "💾 Save for all officers", by: "Your name", saving: "Saving…", saved: "Saved ✅", unsaved: "Not saved yet", noKey: "Needs the officers' GitHub key (ask Sherry).", errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — refresh and try again.", errNet: "Couldn't reach GitHub — try again.",
    fName: "Name", fGid: "Player ID (optional)", fAl: "Alliance", fSrc: "Source (e.g. B24)", fDate: "Date", fRole: "Role", fNote: "Note (buffs, heroes)", fOk: "OK", fCancel: "Cancel", inf: "Inf", cav: "Cav", arc: "Arc", atk: "Atk", def: "Def", leth: "Leth", hp: "HP",
    roles: { rally: "rally leader", garrison: "garrison leader", solo: "solo attack", defender: "defender", bear: "bear rally" },
    pT: "🔮 Prediction from MightPulse boards", pNote: "S = Governor gear + Hero equip + Master power (millions; only for players in the kingdom top 100 of all three). Fitted on the known stats that have S.", pData: "Boards from {d} (kingdoms {k})", pNoData: "No MightPulse history found yet (it is saved every day at 20:45 UTC).", pFit: "Fit: ln Q = {a} + {b} · ln S · {n} players · R² {r2} · typical error ±{e}%", pFew: "Need at least 3 known players with S to fit (now {n}).", pFind: "Search a player on the boards…", pMiss: "below the top 100 on {b} — can't predict", pQ: "predicted quality {q} (≈ {near})",
    aT: "⚔️ Plan the attack", tgt: "Target garrison", tLead: "Garrison leader", tG: "Garrison troops", tTier: "Garrison tier", terr: "In their own territory (+10% all) — untick if the report stats already include it", us: "Our rallies (in order)", lead: "Leader", size: "Troops", tier: "Tier", addR: "➕ Rally", debUs: "Their debuff on us (attack/defense −%)", debThem: "Our debuff on them (−%)", p: "p (1.5 – 2)", reinf: "Reinforcements between rallies", pick: "— choose —", fromSets: "Known stats", fromBoards: "Predicted from boards",
    res: "Result", colR: "Rally", colRatio: "r", colOut: "Result", win: "✅ We take it — {s} of ours stay as the new garrison", lose: "❌ Lost — their garrison {g} left", need: "With rallies like #1: about {n} needed for this garrison.", last: "Send expendable rallies first and the strongest leader last — the last rally's survivors hold the building with that leader's stats.", one: "One of their troops ≈ {x} of ours (r = {r}).",
    unc: "How sure? Rallies like #1 needed for other garrison sizes and p:", caveat: "Not modeled: hero skill kills (27–46% of kills), troop counters, and the garrison may use its strongest member's stats. Stats change daily — use the newest report.", noR: "Choose a leader for the target and for at least one rally." },
  zh: { title: "⚔️ 攻擊規劃", intro: "估算一個目標要連續打幾波集結、最後一波派誰。我們這邊固定琴科加入者、50 : 20 : 30。只是粗估——模型會低估攻方（B24：模型剩約 30 萬，實際 58.7 萬）。",
    kT: "📚 已知屬性（來自戰報）", kNote: "一行 = 一個玩家某份戰報或集結畫面的屬性（步/騎/弓 × 攻擊／防禦／殺傷／生命 %）。✓ 擬合 = 拿來做排行榜預測。所有幹部共用。",
    colName: "玩家", colSrc: "來源", colQ: "強度", colS: "排行榜 S", colFit: "擬合", none: "還沒有已知屬性。", add: "➕ 新增屬性", imp: "📥 匯入（JSON）", impNote: "貼上拿到的 JSON（或選檔案），再按匯入。名字＋來源相同的會被取代。", impOk: "已匯入 {n} 筆。", impBad: "這不是屬性清單。", doImp: "匯入", del: "刪除", edit: "修改", save: "💾 儲存給所有幹部", by: "你的名字", saving: "儲存中…", saved: "已儲存 ✅", unsaved: "還沒儲存", noKey: "需要幹部的 GitHub 金鑰（問 Sherry）。", errAuth: "存的 GitHub 金鑰失效了——問 Sherry。", errBusy: "有人同時儲存——重新整理再試一次。", errNet: "連不到 GitHub——再試一次。",
    fName: "名字", fGid: "玩家 ID（可不填）", fAl: "聯盟", fSrc: "來源（例如 B24）", fDate: "日期", fRole: "角色", fNote: "備註（加成、英雄）", fOk: "確定", fCancel: "取消", inf: "步", cav: "騎", arc: "弓", atk: "攻", def: "防", leth: "殺", hp: "生",
    roles: { rally: "集結隊長", garrison: "駐守隊長", solo: "單人進攻", defender: "防守方", bear: "打熊集結" },
    pT: "🔮 用 MightPulse 排行榜預測", pNote: "S = 領主裝備 + 英雄裝備 + 大師戰力（百萬；三個榜都在王國前 100 名才算得出來）。用有 S 的已知屬性來擬合。", pData: "排行榜日期 {d}（王國 {k}）", pNoData: "還沒有 MightPulse 歷史資料（每天 20:45 UTC 存一份）。", pFit: "擬合：ln Q = {a} + {b} · ln S · {n} 人 · R² {r2} · 一般誤差 ±{e}%", pFew: "至少要 3 個有 S 的已知玩家才能擬合（目前 {n}）。", pFind: "在排行榜上找玩家…", pMiss: "{b} 不在前 100 名，沒辦法預測", pQ: "預測強度 {q}（≈ {near}）",
    aT: "⚔️ 規劃進攻", tgt: "目標守軍", tLead: "駐守隊長", tG: "守軍兵數", tTier: "守軍兵等", terr: "在他們自己的領地（四項 +10%）——戰報屬性已經含這個加成就不要勾", us: "我們的集結（照順序）", lead: "隊長", size: "兵數", tier: "兵等", addR: "➕ 集結", debUs: "對方給我們的減益（攻擊／防禦 −%）", debThem: "我們給對方的減益（−%）", p: "p（1.5 – 2）", reinf: "每波之間對方補兵", pick: "— 選擇 —", fromSets: "已知屬性", fromBoards: "排行榜預測",
    res: "結果", colR: "集結", colRatio: "r", colOut: "結果", win: "✅ 打下來了——我們剩 {s} 變成新守軍", lose: "❌ 輸了——對方守軍剩 {g}", need: "照第 1 波這種集結：這個守軍大約要 {n} 波。", last: "可以犧牲的集結先上，最強的隊長最後——最後一波的生還者會用那個隊長的屬性守建築。", one: "對方一個兵 ≈ 我們 {x} 個兵（r = {r}）。",
    unc: "有多準？換成其他守軍兵數和 p，照第 1 波這種集結要幾波：", caveat: "沒算到：英雄技能擊殺（占擊殺 27–46%）、兵種相剋，還有守軍可能用裡面最強的人的屬性。屬性每天在變——用最新的戰報。", noR: "請選目標的駐守隊長，和至少一波集結的隊長。" },
  pt: { title: "⚔️ Planejar ataque", intro: "Quantos rallies seguidos um alvo precisa e quem vai por último. Nosso lado usa sempre Chenko e 50 : 20 : 30. Só uma estimativa — subestima o atacante (B24: modelo ≈ 300 mil restantes, real 587 mil).",
    kT: "📚 Atributos conhecidos (relatórios de batalha)", kNote: "Cada linha = atributos de um jogador num relatório ou tela de rally (inf/cav/arq × ataque / defesa / letalidade / vida %). ✓ ajuste = usado na previsão pelos rankings. Compartilhado com todos os oficiais.",
    colName: "Jogador", colSrc: "Fonte", colQ: "Força", colS: "Rankings S", colFit: "ajuste", none: "Ainda sem atributos conhecidos.", add: "➕ Adicionar", imp: "📥 Importar (JSON)", impNote: "Cole o JSON recebido (ou escolha o arquivo) e Importar. Linhas com o mesmo nome + fonte são substituídas.", impOk: "{n} linhas importadas.", impBad: "Isso não é uma lista de atributos.", doImp: "Importar", del: "Apagar", edit: "Editar", save: "💾 Salvar para todos", by: "Seu nome", saving: "Salvando…", saved: "Salvo ✅", unsaved: "Ainda não salvo", noKey: "Precisa da chave do GitHub dos oficiais (fale com a Sherry).", errAuth: "A chave do GitHub não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — atualize e tente de novo.", errNet: "Não deu para falar com o GitHub — tente de novo.",
    fName: "Nome", fGid: "ID do jogador (opcional)", fAl: "Aliança", fSrc: "Fonte (ex.: B24)", fDate: "Data", fRole: "Papel", fNote: "Nota (bônus, heróis)", fOk: "OK", fCancel: "Cancelar", inf: "Inf", cav: "Cav", arc: "Arq", atk: "Atq", def: "Def", leth: "Let", hp: "Vida",
    roles: { rally: "líder do rally", garrison: "líder da guarnição", solo: "ataque solo", defender: "defensor", bear: "rally do urso" },
    pT: "🔮 Previsão pelos rankings do MightPulse", pNote: "S = Equip. do governador + Equip. de heróis + Poder de mestre (milhões; só para quem está no top 100 do reino nos três). Ajustado com os atributos conhecidos que têm S.", pData: "Rankings de {d} (reinos {k})", pNoData: "Ainda sem histórico do MightPulse (salvo todo dia às 20:45 UTC).", pFit: "Ajuste: ln Q = {a} + {b} · ln S · {n} jogadores · R² {r2} · erro típico ±{e}%", pFew: "Precisa de pelo menos 3 jogadores conhecidos com S (agora {n}).", pFind: "Procurar jogador nos rankings…", pMiss: "fora do top 100 em {b} — sem previsão", pQ: "força prevista {q} (≈ {near})",
    aT: "⚔️ Planejar o ataque", tgt: "Guarnição alvo", tLead: "Líder da guarnição", tG: "Tropas da guarnição", tTier: "Nível da guarnição", terr: "No território deles (+10% em tudo) — desmarque se o relatório já inclui", us: "Nossos rallies (em ordem)", lead: "Líder", size: "Tropas", tier: "Nível", addR: "➕ Rally", debUs: "Debuff deles em nós (ataque/defesa −%)", debThem: "Nosso debuff neles (−%)", p: "p (1,5 – 2)", reinf: "Reforços entre rallies", pick: "— escolha —", fromSets: "Atributos conhecidos", fromBoards: "Previsto pelos rankings",
    res: "Resultado", colR: "Rally", colRatio: "r", colOut: "Resultado", win: "✅ Tomamos — {s} nossos ficam como nova guarnição", lose: "❌ Perdemos — restam {g} na guarnição deles", need: "Com rallies como o nº 1: cerca de {n} para esta guarnição.", last: "Mande os rallies dispensáveis primeiro e o líder mais forte por último — os sobreviventes do último rally seguram o prédio com os atributos dele.", one: "Uma tropa deles ≈ {x} das nossas (r = {r}).",
    unc: "Quão certo? Rallies como o nº 1 necessários para outros tamanhos e p:", caveat: "Fora do modelo: mortes por habilidades de heróis (27–46%), vantagens de tipo, e a guarnição pode usar os atributos do membro mais forte. Atributos mudam todo dia — use o relatório mais novo.", noR: "Escolha o líder do alvo e de pelo menos um rally." },
  ar: { title: "⚔️ تخطيط الهجوم", intro: "كم حشدًا متتاليًا يحتاج الهدف ومن يذهب أخيرًا. جانبنا يستخدم دائمًا Chenko و50 : 20 : 30. تقدير تقريبي فقط — يقلّل من قوة المهاجم (B24: النموذج ≈ 300 ألف متبقٍ، والفعلي 587 ألفًا).",
    kT: "📚 إحصاءات معروفة (من تقارير المعارك)", kNote: "كل صف = إحصاءات لاعب من تقرير معركة أو شاشة حشد (مشاة/فرسان/رماة × هجوم / دفاع / فتك / صحة %). ✓ ملاءمة = تُستخدم في التنبؤ من اللوحات. مشتركة بين كل الضباط.",
    colName: "اللاعب", colSrc: "المصدر", colQ: "القوة", colS: "S من اللوحات", colFit: "ملاءمة", none: "لا إحصاءات معروفة بعد.", add: "➕ إضافة", imp: "📥 استيراد (JSON)", impNote: "الصق JSON الذي وصلك (أو اختر الملف) ثم استيراد. الصفوف بنفس الاسم + المصدر تُستبدل.", impOk: "استُورد {n} صفًا.", impBad: "هذه ليست قائمة إحصاءات.", doImp: "استيراد", del: "حذف", edit: "تعديل", save: "💾 حفظ لكل الضباط", by: "اسمك", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅", unsaved: "لم يُحفظ بعد", noKey: "يحتاج مفتاح GitHub الخاص بالضباط (اسأل Sherry).", errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حدّث الصفحة وحاول مجددًا.", errNet: "تعذّر الوصول إلى GitHub — حاول مجددًا.",
    fName: "الاسم", fGid: "معرّف اللاعب (اختياري)", fAl: "التحالف", fSrc: "المصدر (مثل B24)", fDate: "التاريخ", fRole: "الدور", fNote: "ملاحظة (تعزيزات، أبطال)", fOk: "موافق", fCancel: "إلغاء", inf: "مشاة", cav: "فرسان", arc: "رماة", atk: "هجوم", def: "دفاع", leth: "فتك", hp: "صحة",
    roles: { rally: "قائد الحشد", garrison: "قائد الحامية", solo: "هجوم فردي", defender: "مدافع", bear: "حشد الدب" },
    pT: "🔮 تنبؤ من لوحات MightPulse", pNote: "S = عتاد الحاكم + عتاد الأبطال + قوة المعلّم (بالملايين؛ فقط لمن هو ضمن أفضل 100 في المملكة في الثلاث). تُلاءم على الإحصاءات المعروفة التي لها S.", pData: "لوحات {d} (الممالك {k})", pNoData: "لا يوجد سجل MightPulse بعد (يُحفظ يوميًا 20:45 UTC).", pFit: "الملاءمة: ln Q = {a} + {b} · ln S · {n} لاعبين · R² {r2} · الخطأ المعتاد ±{e}%", pFew: "تحتاج 3 لاعبين معروفين على الأقل لهم S (الآن {n}).", pFind: "ابحث عن لاعب في اللوحات…", pMiss: "خارج أفضل 100 في {b} — لا تنبؤ", pQ: "القوة المتوقعة {q} (≈ {near})",
    aT: "⚔️ خطّط الهجوم", tgt: "الحامية المستهدفة", tLead: "قائد الحامية", tG: "جنود الحامية", tTier: "مستوى الحامية", terr: "في أرضهم (+10% للكل) — ألغِ التحديد إذا كانت إحصاءات التقرير تشمله", us: "حشودنا (بالترتيب)", lead: "القائد", size: "الجنود", tier: "المستوى", addR: "➕ حشد", debUs: "إضعافهم علينا (هجوم/دفاع −%)", debThem: "إضعافنا عليهم (−%)", p: "p (1.5 – 2)", reinf: "تعزيزات بين الحشود", pick: "— اختر —", fromSets: "إحصاءات معروفة", fromBoards: "متوقع من اللوحات",
    res: "النتيجة", colR: "حشد", colRatio: "r", colOut: "النتيجة", win: "✅ نأخذه — يبقى {s} من جنودنا كحامية جديدة", lose: "❌ خسرنا — تبقى {g} في حاميتهم", need: "بحشود مثل رقم 1: نحتاج نحو {n} لهذه الحامية.", last: "أرسل الحشود التي يمكن التضحية بها أولًا والقائد الأقوى أخيرًا — الناجون من آخر حشد يحمون المبنى بإحصاءات قائده.", one: "جندي واحد منهم ≈ {x} من جنودنا (r = {r}).",
    unc: "ما مدى الدقة؟ عدد الحشود مثل رقم 1 لأحجام وقيم p أخرى:", caveat: "غير محسوب: قتلى مهارات الأبطال (27–46%)، أفضلية الأنواع، وقد تستخدم الحامية إحصاءات أقوى عضو فيها. الإحصاءات تتغير يوميًا — استخدم أحدث تقرير.", noR: "اختر قائد الهدف وقائد حشد واحد على الأقل." },
  ko: { title: "⚔️ 공격 계획", intro: "목표 하나에 집결을 몇 번 연속으로 보내야 하는지, 마지막은 누가 갈지. 우리는 항상 Chenko 참가자와 50 : 20 : 30을 써요. 대략적인 계산일 뿐 — 공격 쪽을 낮게 봐요 (B24: 모델 약 30만 남음, 실제 58.7만).",
    kT: "📚 알려진 능력치 (전투 보고서)", kNote: "한 줄 = 전투 보고서나 집결 화면에서 본 한 플레이어의 능력치 (보병/기병/궁병 × 공격 / 방어 / 치명 / 체력 %). ✓ 맞춤 = 랭킹 예측에 사용. 모든 간부가 같이 써요.",
    colName: "플레이어", colSrc: "출처", colQ: "강도", colS: "랭킹 S", colFit: "맞춤", none: "아직 알려진 능력치가 없어요.", add: "➕ 추가", imp: "📥 가져오기 (JSON)", impNote: "받은 JSON을 붙여넣거나 파일을 고른 뒤 가져오기. 이름 + 출처가 같은 줄은 바뀌어요.", impOk: "{n}줄 가져옴.", impBad: "능력치 목록이 아니에요.", doImp: "가져오기", del: "삭제", edit: "수정", save: "💾 모든 간부에게 저장", by: "이름", saving: "저장 중…", saved: "저장됨 ✅", unsaved: "아직 저장 안 됨", noKey: "간부 GitHub 키가 필요해요 (Sherry에게 물어보세요).", errAuth: "저장된 GitHub 키가 더 이상 안 돼요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 새로고침 후 다시 해 보세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 해 보세요.",
    fName: "이름", fGid: "플레이어 ID (선택)", fAl: "연맹", fSrc: "출처 (예: B24)", fDate: "날짜", fRole: "역할", fNote: "메모 (버프, 영웅)", fOk: "확인", fCancel: "취소", inf: "보병", cav: "기병", arc: "궁병", atk: "공", def: "방", leth: "치", hp: "체",
    roles: { rally: "집결 대장", garrison: "주둔 대장", solo: "단독 공격", defender: "방어", bear: "곰 집결" },
    pT: "🔮 MightPulse 랭킹으로 예측", pNote: "S = 영주 장비 + 영웅 장비 + 마스터 전투력 (백만; 세 랭킹 모두 왕국 상위 100 안이어야 계산돼요). S가 있는 알려진 능력치로 맞춰요.", pData: "랭킹 날짜 {d} (왕국 {k})", pNoData: "아직 MightPulse 기록이 없어요 (매일 20:45 UTC 저장).", pFit: "맞춤: ln Q = {a} + {b} · ln S · {n}명 · R² {r2} · 보통 오차 ±{e}%", pFew: "S가 있는 알려진 플레이어가 3명 이상 필요해요 (지금 {n}).", pFind: "랭킹에서 플레이어 찾기…", pMiss: "{b} 상위 100 밖 — 예측 불가", pQ: "예상 강도 {q} (≈ {near})",
    aT: "⚔️ 공격 계획 세우기", tgt: "목표 주둔군", tLead: "주둔 대장", tG: "주둔 병력", tTier: "주둔 병종 등급", terr: "그들 영토 안 (전부 +10%) — 보고서 능력치에 이미 들어 있으면 체크 해제", us: "우리 집결 (순서대로)", lead: "대장", size: "병력", tier: "등급", addR: "➕ 집결", debUs: "그들이 우리에게 거는 디버프 (공격/방어 −%)", debThem: "우리가 그들에게 거는 디버프 (−%)", p: "p (1.5 – 2)", reinf: "집결 사이 그들의 증원", pick: "— 선택 —", fromSets: "알려진 능력치", fromBoards: "랭킹 예측",
    res: "결과", colR: "집결", colRatio: "r", colOut: "결과", win: "✅ 점령 — 우리 {s} 명이 새 주둔군으로 남아요", lose: "❌ 패배 — 그들 주둔군 {g} 남음", need: "1번 같은 집결로: 이 주둔군에 약 {n}번 필요해요.", last: "희생해도 되는 집결을 먼저, 가장 강한 대장을 마지막에 — 마지막 집결의 생존자가 그 대장의 능력치로 건물을 지켜요.", one: "그들 병사 1명 ≈ 우리 {x}명 (r = {r}).",
    unc: "얼마나 정확할까? 다른 주둔 병력과 p에서 1번 같은 집결이 몇 번 필요한지:", caveat: "계산에 없는 것: 영웅 스킬 처치 (처치의 27–46%), 병종 상성, 주둔군이 가장 강한 멤버의 능력치를 쓸 수도 있음. 능력치는 매일 바뀌어요 — 최신 보고서를 쓰세요.", noR: "목표의 주둔 대장과 집결 대장을 하나 이상 고르세요." },
};
const HT = {"en": {"hT": "📦 MightPulse history (for the battle analysis)", "hNote": "This tab already reads the newest day by itself (🔮 above) — nothing to import. One encrypted snapshot a day (20:45 UTC): kingdom totals, all 18 boards (top 100), every NXS member and the Scout kingdoms' top players (base, ranks, heroes with gear). Pick dates and download — the file is for the analysis chat; don't post it anywhere public.", "hFrom": "From", "hTo": "To", "hDl": "⬇️ Download JSON", "hBusy": "Reading {d}…", "hNone": "No snapshots in these dates.", "hDone": "{n} days downloaded."}, "zh": {"hT": "📦 MightPulse 歷史資料（戰鬥分析用）", "hNote": "這個分頁會自己讀最新一天的資料（上面的 🔮）——不用匯入。每天存一份加密快照（20:45 UTC）：王國總數、全部 18 個排行榜（前 100 名）、所有 NXS 成員，以及偵查王國的主力（基本資料、排名、英雄和裝備）。選日期下載——這個檔案是給分析用的聊天，不要貼到公開的地方。", "hFrom": "從", "hTo": "到", "hDl": "⬇️ 下載 JSON", "hBusy": "讀取 {d}…", "hNone": "這段日期沒有資料。", "hDone": "已下載 {n} 天。"}, "pt": {"hT": "📦 Histórico do MightPulse (para a análise de batalha)", "hNote": "Esta aba já lê o dia mais novo sozinha (🔮 acima) — nada para importar. Um retrato criptografado por dia (20:45 UTC): totais do reino, os 18 rankings (top 100), todos os membros da NXS e os principais jogadores dos reinos do Scout (base, rankings, heróis com equipamento). Escolha as datas e baixe — o arquivo é para o chat de análise; não publique em lugar público.", "hFrom": "De", "hTo": "Até", "hDl": "⬇️ Baixar JSON", "hBusy": "Lendo {d}…", "hNone": "Sem dados nessas datas.", "hDone": "{n} dias baixados."}, "ar": {"hT": "📦 سجل MightPulse (لتحليل المعارك)", "hNote": "هذا القسم يقرأ أحدث يوم وحده (🔮 أعلاه) — لا حاجة للاستيراد. لقطة مشفّرة كل يوم (20:45 UTC): إجماليات المملكة، كل اللوحات الـ18 (أفضل 100)، كل أعضاء NXS وأقوى لاعبي ممالك الاستطلاع (الأساس، الترتيب، الأبطال مع العتاد). اختر التواريخ ونزّل — الملف لمحادثة التحليل؛ لا تنشره في مكان عام.", "hFrom": "من", "hTo": "إلى", "hDl": "⬇️ تنزيل JSON", "hBusy": "قراءة {d}…", "hNone": "لا بيانات في هذه التواريخ.", "hDone": "نُزّلت {n} أيام."}, "ko": {"hT": "📦 MightPulse 기록 (전투 분석용)", "hNote": "이 탭은 최신 날짜를 알아서 읽어요 (위의 🔮) — 가져올 필요 없어요. 매일 암호화된 스냅샷 하나 (20:45 UTC): 왕국 합계, 랭킹 18개 전부 (상위 100), NXS 연맹원 전원, 정찰 왕국의 주력 (기본, 랭킹, 영웅과 장비). 날짜를 골라 내려받으세요 — 분석 채팅용 파일이니 공개된 곳에 올리지 마세요.", "hFrom": "부터", "hTo": "까지", "hDl": "⬇️ JSON 내려받기", "hBusy": "{d} 읽는 중…", "hNone": "이 기간에는 데이터가 없어요.", "hDone": "{n}일치 내려받음."}};
let lang = OFFICER.lang || "en";
const t = (k) => (T[lang] || T.en)[k] ?? T.en[k];
const fill = (s, v) => Object.entries(v || {}).reduce((x, [a, b]) => x.split("{" + a + "}").join(b), s);
const norm = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const fmtN = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "k" : String(Math.round(n));

let SETS = [], SAVED = "", msg = "", snapDay = null, SNAP = null, roster = null, editing = null, impOpen = false;
let PLAN = (() => { try { return JSON.parse(localStorage.getItem("nxs-attack-v1")) || null; } catch (e) { return null; } })() || { tgt: "", G: 1000000, gt: "TG2", terr: true, dUs: 0, dThem: 0, p: 1.75, re: 0, rallies: [{ lead: "", R: 1200000, tier: "TG2" }] };
const keep = () => { try { localStorage.setItem("nxs-attack-v1", JSON.stringify(PLAN)); } catch (e) {} };
const ED = () => OFFICER.can("attack", "edit");
const snap = () => JSON.stringify(SETS);

/* ---------- math ---------- */
const qOf = (st) => ["inf", "cav", "arc"].reduce((s, k) => { const v = (st && st[k]) || [0, 0, 0, 0];
  return s + W[k] * (1 + v[0] / 100) * (1 + v[2] / 100) * (1 + v[1] / 100) * (1 + v[3] / 100); }, 0);
const BOARDS3 = [["gov_gear", "Governor gear"], ["hero_equip", "Hero equip"], ["master_power", "Master power"]];
/* players on the newest snapshot's boards: gid → { name, al, kid, b: { board: score } } */
let PL = {};
function buildPlayers() {
  PL = {}; if (!SNAP || !SNAP.boards) return;
  for (const [key, bd] of Object.entries(SNAP.boards)) { const [kid, board] = key.split(":");
    for (const r of bd.rows || []) { const id = String(r.governor_id); const p = PL[id] = PL[id] || { id, name: r.nick_name, al: r.alliance_abbr, kid: +kid, b: {} }; p.b[board] = r.score; } }
}
const sOf = (p) => p && BOARDS3.every(([b]) => p.b[b] != null) ? BOARDS3.reduce((s, [b]) => s + p.b[b] / 1e6, 0) : null;
function playerOfSet(x) {
  if (x.gid && PL[String(x.gid)]) return PL[String(x.gid)];
  const n = norm(x.name); if (!n) return null;
  const hits = Object.values(PL).filter((p) => norm(p.name) === n || (n.length >= 3 && norm(p.name).includes(n)));
  return hits.length === 1 ? hits[0] : null;
}
let FIT = null;
function fit() {
  const pts = SETS.filter((x) => x.fit !== false).map((x) => { const s = sOf(playerOfSet(x)); return s ? [Math.log(s), Math.log(qOf(x.st)), x] : null; }).filter(Boolean);
  if (pts.length < 3) { FIT = { n: pts.length }; return; }
  const n = pts.length, mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
  const sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0), sxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
  const b = sxx ? sxy / sxx : 0, a = my - b * mx, ss = pts.reduce((s, p) => s + (p[1] - a - b * p[0]) ** 2, 0), st = pts.reduce((s, p) => s + (p[1] - my) ** 2, 0);
  FIT = { n, a, b, r2: st ? 1 - ss / st : 0, e: Math.sqrt(ss / n) };
}
const predQ = (p) => { const s = sOf(p); return s && FIT && FIT.b != null ? Math.exp(FIT.a + FIT.b * Math.log(s)) : null; };
const nearest = (q) => { let best = null; for (const x of SETS) { const d = Math.abs(Math.log(qOf(x.st) / q)); if (!best || d < best[0]) best = [d, x]; } return best ? best[1].name + " (" + best[1].src + ")" : "—"; };
/* "s:<id>" = a known stats row, "p:<gid>" = predicted from the boards */
const qOfRef = (ref) => { if (!ref) return null; if (ref.startsWith("s:")) { const x = SETS.find((y) => y.id === ref.slice(2)); return x ? qOf(x.st) : null; } return predQ(PL[ref.slice(2)]); };
const nameOfRef = (ref) => { if (!ref) return ""; if (ref.startsWith("s:")) { const x = SETS.find((y) => y.id === ref.slice(2)); return x ? `${x.name} (${x.src})` : ""; } const p = PL[ref.slice(2)]; return p ? `${p.name} 🔮` : ""; };

/* ---------- load / save ---------- */
const u8b64 = (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64u8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
async function loadSets() {
  let d = null;
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", PATH, null, OFFICER.token); d = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; } catch (e) {} }
  if (!d) { try { d = await OfficerData.fetchJson(PATH); } catch (e) {} }
  SETS = (d && Array.isArray(d.sets)) ? d.sets : []; SAVED = snap();
}
async function saveSets() {
  if (!ED()) return; if (!OFFICER.token) { msg = t("noKey"); render(); return; }
  const by = (($("ak_by") || {}).value || "").trim() || "?"; try { localStorage.setItem("nxs-plan-by", by); } catch (e) {}
  msg = t("saving"); render();
  const next = { sets: SETS, by, at: new Date().toISOString() };
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", PATH, null, OFFICER.token);
      try { await OFFICER.gh("PUT", PATH, { message: `Attack planner: known stats (${by})`, content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: "main" }, OFFICER.token); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    SAVED = snap(); msg = t("saved");
  } catch (e) { msg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  render();
}
async function loadSnap() {
  for (let i = 0; i < 8; i++) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x && x.boards) { SNAP = x; snapDay = d; break; } } catch (e) {} }
  buildPlayers();
}

/* ---------- render ---------- */
function setsCard() {
  const ed = ED(), dirty = snap() !== SAVED;
  const rows = SETS.map((x) => { const p = playerOfSet(x), s = sOf(p);
    return `<tr><td dir="auto"><b>${esc(x.name)}</b>${x.al ? ` <span class="muted">[${esc(x.al)}]</span>` : ""}</td><td>${esc(x.src || "")}<div class="muted" style="font-size:11.5px">${esc(x.date || "")} · ${esc((t("roles") || {})[x.role] || x.role || "")}</div></td>
      <td>${(qOf(x.st) / 100).toFixed(1)}</td><td>${s ? s.toFixed(1) : `<span class="muted">—</span>`}</td>
      <td><input type="checkbox" data-fit="${esc(x.id)}"${x.fit !== false ? " checked" : ""}${ed ? "" : " disabled"}></td>
      <td>${ed ? `<button class="btn small" data-ed="${esc(x.id)}">${esc(t("edit"))}</button> <button class="btn small" data-del="${esc(x.id)}">${esc(t("del"))}</button>` : ""}</td></tr>`; }).join("");
  return `<h3 style="margin:0 0 4px">${esc(t("kT"))}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(t("kNote"))}</div>
    ${SETS.length ? `<div class="ak-tw"><table class="ak-t"><thead><tr><th>${esc(t("colName"))}</th><th>${esc(t("colSrc"))}</th><th>${esc(t("colQ"))}</th><th>${esc(t("colS"))}</th><th>${esc(t("colFit"))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="muted">${esc(t("none"))}</div>`}
    ${editing ? editForm() : ""}
    ${ed ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center"><button class="btn" id="ak_add">${esc(t("add"))}</button><button class="btn" id="ak_imp">${esc(t("imp"))}</button>
      ${dirty ? `<input class="inp" id="ak_by" style="width:130px" placeholder="${esc(t("by"))}" value="${esc((() => { try { return localStorage.getItem("nxs-plan-by") || ""; } catch (e) { return ""; } })())}"><button class="btn primary" id="ak_save">${esc(t("save"))}</button>` : ""}
      <span class="muted" style="font-size:12.5px">${esc(msg || (dirty ? t("unsaved") : ""))}</span></div>
      <div id="ak_impBox" ${impOpen ? "" : "hidden"} style="margin-top:8px"><div class="muted" style="font-size:12.5px">${esc(t("impNote"))}</div>
      <textarea class="inp" id="ak_impTxt" rows="5" style="width:100%;box-sizing:border-box;font-family:ui-monospace,monospace;font-size:12px"></textarea>
      <div class="row" style="gap:8px;margin-top:6px"><input type="file" id="ak_impFile" accept=".json,application/json"><button class="btn primary" id="ak_impGo">${esc(t("doImp"))}</button></div></div>` : ""}`;
}
function editForm() {
  const x = editing, num = (k, i) => `<input class="inp ak-n" type="number" step="0.1" data-k="${k}" data-i="${i}" value="${(x.st[k] || [])[i] ?? ""}">`;
  return `<div class="ak-form"><div class="row" style="gap:6px;flex-wrap:wrap">
    <input class="inp" id="akf_name" placeholder="${esc(t("fName"))}" value="${esc(x.name || "")}" style="width:140px">
    <input class="inp" id="akf_gid" placeholder="${esc(t("fGid"))}" value="${esc(x.gid || "")}" inputmode="numeric" style="width:150px">
    <input class="inp" id="akf_al" placeholder="${esc(t("fAl"))}" value="${esc(x.al || "")}" style="width:70px">
    <input class="inp" id="akf_src" placeholder="${esc(t("fSrc"))}" value="${esc(x.src || "")}" style="width:110px">
    <input class="inp" id="akf_date" type="date" value="${esc(x.date || "")}" style="width:150px">
    <select class="inp" id="akf_role">${Object.entries(t("roles")).map(([k, v]) => `<option value="${k}"${x.role === k ? " selected" : ""}>${esc(v)}</option>`).join("")}</select></div>
    <table class="ak-t" style="margin-top:6px"><thead><tr><th></th><th>${esc(t("atk"))}</th><th>${esc(t("def"))}</th><th>${esc(t("leth"))}</th><th>${esc(t("hp"))}</th></tr></thead><tbody>
    ${["inf", "cav", "arc"].map((k) => `<tr><td>${esc(t(k))}</td><td>${num(k, 0)}</td><td>${num(k, 1)}</td><td>${num(k, 2)}</td><td>${num(k, 3)}</td></tr>`).join("")}</tbody></table>
    <input class="inp" id="akf_note" placeholder="${esc(t("fNote"))}" value="${esc(x.note || "")}" style="width:100%;box-sizing:border-box;margin-top:6px">
    <div class="row" style="gap:8px;margin-top:6px"><button class="btn primary" id="akf_ok">${esc(t("fOk"))}</button><button class="btn" id="akf_no">${esc(t("fCancel"))}</button></div></div>`;
}
let findQ = "";
function predCard() {
  if (!SNAP) return `<h3 style="margin:0 0 4px">${esc(t("pT"))}</h3><div class="muted">${esc(t("pNoData"))}</div>`;
  const kids = [...new Set(Object.keys(SNAP.boards).map((k) => k.split(":")[0]))].join(", ");
  const fitLine = FIT && FIT.b != null ? fill(t("pFit"), { a: FIT.a.toFixed(2), b: FIT.b.toFixed(2), n: FIT.n, r2: FIT.r2.toFixed(2), e: Math.round((Math.exp(FIT.e) - 1) * 100) }) : fill(t("pFew"), { n: (FIT && FIT.n) || 0 });
  const q = norm(findQ), hits = q.length >= 2 ? Object.values(PL).filter((p) => norm(p.name).includes(q)).slice(0, 8) : [];
  const nameOf = { gov_gear: "Governor gear", hero_equip: "Hero equip", master_power: "Master power" };
  return `<h3 style="margin:0 0 4px">${esc(t("pT"))}</h3><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(t("pNote"))}</div>
    <div class="muted" style="font-size:12.5px">${esc(fill(t("pData"), { d: snapDay, k: kids }))}</div><div style="font-size:13px;margin:4px 0 8px"><b>${esc(fitLine)}</b></div>
    <input class="inp" id="ak_find" placeholder="${esc(t("pFind"))}" value="${esc(findQ)}" style="max-width:280px">
    <div style="margin-top:6px">${hits.map((p) => { const s = sOf(p), pq = predQ(p), miss = BOARDS3.filter(([b]) => p.b[b] == null).map(([b]) => nameOf[b]);
      return `<div class="ak-hit"><b dir="auto">${esc(p.name)}</b> <span class="muted">[${esc(p.al || "")}] #${p.kid}</span> · ${BOARDS3.map(([b]) => `${nameOf[b]} ${p.b[b] != null ? (p.b[b] / 1e6).toFixed(2) + "M" : "—"}`).join(" · ")}
        <div style="font-size:12.5px">${s ? `S ${s.toFixed(1)} · ` : ""}${pq ? esc(fill(t("pQ"), { q: (pq / 100).toFixed(1), near: nearest(pq) })) : miss.length ? `<span class="muted">${esc(fill(t("pMiss"), { b: miss.join(", ") }))}</span>` : ""}</div></div>`; }).join("")}</div>`;
}
function options(sel, ours) {
  const sets = SETS.map((x) => `<option value="s:${esc(x.id)}"${sel === "s:" + x.id ? " selected" : ""}>${esc(x.name)} (${esc(x.src || "")})</option>`).join("");
  const pls = Object.values(PL).filter((p) => predQ(p) && (ours == null || (ours ? /^nxs$/i.test(p.al || "") : !/^nxs$/i.test(p.al || ""))))
    .sort((a, b) => a.name.localeCompare(b.name)).map((p) => `<option value="p:${esc(p.id)}"${sel === "p:" + p.id ? " selected" : ""}>${esc(p.name)} [${esc(p.al || "")}]</option>`).join("");
  return `<option value="">${esc(t("pick"))}</option><optgroup label="${esc(t("fromSets"))}">${sets}</optgroup>${pls ? `<optgroup label="${esc(t("fromBoards"))} 🔮">${pls}</optgroup>` : ""}`;
}
const tierSel = (id, v, extra = "") => `<select class="inp" ${id} ${extra}>${Object.keys(TIER).map((k) => `<option${k === v ? " selected" : ""}>${k}</option>`).join("")}</select>`;
/* one chain of rallies against the garrison */
function chain(G0, P = PLAN.p) {
  const qT = qOfRef(PLAN.tgt); if (!qT) return null;
  const qThem = qT * TIER[PLAN.gt] ** 2 * (PLAN.terr ? 1.06 : 1) * (1 - PLAN.dThem / 100) ** 2;
  let G = G0; const out = [];
  for (const [i, r] of PLAN.rallies.entries()) {
    const qU = qOfRef(r.lead); if (!qU) continue;
    const ratio = qU * TIER[r.tier] ** 2 * (1 - PLAN.dUs / 100) ** 2 / qThem, R = +r.R || 0;
    if (ratio * R ** P > G ** P) { out.push({ i, ratio, win: true, left: Math.pow(R ** P - G ** P / ratio, 1 / P) }); return { out, G }; }
    G = Math.pow(G ** P - ratio * R ** P, 1 / P); out.push({ i, ratio, win: false, left: G }); G += +PLAN.re || 0;
  }
  return { out, G };
}
function needN(G, P) { const r0 = PLAN.rallies[0], qT = qOfRef(PLAN.tgt), qU = r0 && qOfRef(r0.lead); if (!qT || !qU) return null;
  const ratio = qU * TIER[r0.tier] ** 2 * (1 - PLAN.dUs / 100) ** 2 / (qT * TIER[PLAN.gt] ** 2 * (PLAN.terr ? 1.06 : 1) * (1 - PLAN.dThem / 100) ** 2);
  return G ** P / (ratio * (+r0.R) ** P); }
function planCard() {
  const c = chain(+PLAN.G);
  const rallies = PLAN.rallies.map((r, i) => `<div class="row ak-r" style="gap:6px;flex-wrap:wrap;align-items:center;margin:4px 0"><b>#${i + 1}</b>
    <select class="inp" data-rl="${i}" style="max-width:220px">${options(r.lead, true)}</select>
    <input class="inp" type="number" data-rr="${i}" value="${r.R}" step="10000" style="width:120px" aria-label="${esc(t("size"))}">
    ${tierSel(`data-rt="${i}"`, r.tier)}${PLAN.rallies.length > 1 ? ` <button class="btn small" data-rx="${i}">✕</button>` : ""}</div>`).join("");
  let res = "";
  if (!c || !c.out.length) res = `<div class="muted">${esc(t("noR"))}</div>`;
  else {
    const r0 = c.out[0].ratio, n = needN(+PLAN.G, PLAN.p);
    res = `<div style="font-size:13.5px;margin:6px 0">${esc(fill(t("one"), { x: (1 / r0).toFixed(2), r: r0.toFixed(2) }))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>${esc(t("colR"))}</th><th>${esc(t("lead"))}</th><th>${esc(t("colRatio"))}</th><th>${esc(t("colOut"))}</th></tr></thead><tbody>
      ${c.out.map((o) => `<tr class="${o.win ? "ok" : ""}"><td>#${o.i + 1}</td><td dir="auto">${esc(nameOfRef(PLAN.rallies[o.i].lead))}</td><td>${o.ratio.toFixed(2)}</td><td>${esc(o.win ? fill(t("win"), { s: fmtN(o.left) }) : fill(t("lose"), { g: fmtN(o.left) }))}</td></tr>`).join("")}</tbody></table></div>
      ${n ? `<div style="margin-top:6px"><b>${esc(fill(t("need"), { n: n <= 1 ? "1" : n.toFixed(1) }))}</b></div>` : ""}
      <div class="muted" style="font-size:12.5px;margin-top:4px">💡 ${esc(t("last"))}</div>
      <div style="margin-top:10px;font-size:13px">${esc(t("unc"))}</div>
      <div class="ak-tw"><table class="ak-t"><thead><tr><th>G \\ p</th>${[1.5, 1.75, 2].map((p) => `<th>${p}</th>`).join("")}</tr></thead><tbody>
      ${[1.0e6, 1.3e6, 1.6e6].map((G) => `<tr><td>${fmtN(G)}</td>${[1.5, 1.75, 2].map((p) => { const x = needN(G, p); return `<td>${x ? (x <= 1 ? "1" : x.toFixed(1)) : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  return `<h3 style="margin:0 0 6px">${esc(t("aT"))}</h3>
    <div class="ak-box"><b>${esc(t("tgt"))}</b>
      <div class="row" style="gap:6px;flex-wrap:wrap;align-items:center;margin-top:4px">${esc(t("tLead"))} <select class="inp" id="ak_tgt" style="max-width:240px">${options(PLAN.tgt, false)}</select>
      ${esc(t("tG"))} <input class="inp" type="number" id="ak_G" value="${PLAN.G}" step="50000" style="width:130px"> ${esc(t("tTier"))} ${tierSel('id="ak_gt"', PLAN.gt)}</div>
      <label class="row" style="gap:6px;font-size:13px;margin-top:4px"><input type="checkbox" id="ak_terr"${PLAN.terr ? " checked" : ""}> ${esc(t("terr"))}</label></div>
    <div class="ak-box"><b>${esc(t("us"))}</b>${rallies}<button class="btn small" id="ak_addR">${esc(t("addR"))}</button></div>
    <div class="row" style="gap:10px;flex-wrap:wrap;align-items:center;font-size:13px;margin:6px 0">
      <label>${esc(t("debUs"))} <input class="inp" type="number" id="ak_dUs" value="${PLAN.dUs}" style="width:70px"></label>
      <label>${esc(t("debThem"))} <input class="inp" type="number" id="ak_dThem" value="${PLAN.dThem}" style="width:70px"></label>
      <label>${esc(t("p"))} <input class="inp" type="number" id="ak_p" value="${PLAN.p}" step="0.05" min="1.2" max="2.5" style="width:80px"></label>
      <label>${esc(t("reinf"))} <input class="inp" type="number" id="ak_re" value="${PLAN.re}" step="10000" style="width:110px"></label></div>
    <h4 style="margin:10px 0 4px">${esc(t("res"))}</h4>${res}
    <div class="muted" style="font-size:12px;margin-top:10px">⚠️ ${esc(t("caveat"))}</div>`;
}
function render() {
  const root = $("ak_root"); if (!root) return;
  fit();
  root.innerHTML = `<div class="card" id="ak_plan">${planCard()}</div><div class="card" id="ak_pred">${predCard()}</div><div class="card" id="ak_sets">${setsCard()}</div><div class="card" id="ak_hist"></div>`;
  bind(); histCard();
}
function bind() {
  const re = () => { keep(); render(); };
  const on = (id, f) => { const e = $(id); if (e) e.onchange = f; };
  on("ak_tgt", (e) => { PLAN.tgt = e.target.value; re(); }); on("ak_G", (e) => { PLAN.G = Math.max(0, +e.target.value || 0); re(); });
  on("ak_gt", (e) => { PLAN.gt = e.target.value; re(); }); on("ak_terr", (e) => { PLAN.terr = e.target.checked; re(); });
  on("ak_dUs", (e) => { PLAN.dUs = Math.min(90, Math.max(0, +e.target.value || 0)); re(); }); on("ak_dThem", (e) => { PLAN.dThem = Math.min(90, Math.max(0, +e.target.value || 0)); re(); });
  on("ak_p", (e) => { PLAN.p = Math.min(2.5, Math.max(1.2, +e.target.value || 1.75)); re(); }); on("ak_re", (e) => { PLAN.re = Math.max(0, +e.target.value || 0); re(); });
  document.querySelectorAll("[data-rl]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rl].lead = s.value; re(); });
  document.querySelectorAll("[data-rr]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rr].R = Math.max(0, +s.value || 0); re(); });
  document.querySelectorAll("[data-rt]").forEach((s) => s.onchange = () => { PLAN.rallies[+s.dataset.rt].tier = s.value; re(); });
  document.querySelectorAll("[data-rx]").forEach((b) => b.onclick = () => { PLAN.rallies.splice(+b.dataset.rx, 1); re(); });
  if ($("ak_addR")) $("ak_addR").onclick = () => { const l = PLAN.rallies[PLAN.rallies.length - 1] || {}; PLAN.rallies.push({ lead: l.lead || "", R: l.R || 1200000, tier: l.tier || "TG2" }); re(); };
  const f = $("ak_find"); if (f) f.oninput = () => { findQ = f.value; const pos = f.selectionStart; $("ak_pred").innerHTML = predCard(); bind(); const g = $("ak_find"); g.focus(); try { g.setSelectionRange(pos, pos); } catch (e) {} };
  if (!ED()) return;
  document.querySelectorAll("[data-fit]").forEach((c) => c.onchange = () => { const x = SETS.find((y) => y.id === c.dataset.fit); if (x) x.fit = c.checked; msg = ""; render(); });
  document.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { const x = SETS.find((y) => y.id === b.dataset.del); if (!x || !window.confirm(t("del") + " " + x.name + "?")) return; SETS = SETS.filter((y) => y !== x); msg = ""; render(); });
  document.querySelectorAll("[data-ed]").forEach((b) => b.onclick = () => { const x = SETS.find((y) => y.id === b.dataset.ed); editing = JSON.parse(JSON.stringify(x)); render(); });
  if ($("ak_add")) $("ak_add").onclick = () => { editing = { id: "", name: "", src: "", date: new Date().toISOString().slice(0, 10), role: "rally", fit: true, st: { inf: [], cav: [], arc: [] } }; render(); };
  if ($("akf_no")) $("akf_no").onclick = () => { editing = null; render(); };
  if ($("akf_ok")) $("akf_ok").onclick = () => {
    const x = editing; x.name = $("akf_name").value.trim(); if (!x.name) return;
    x.gid = $("akf_gid").value.replace(/\D/g, ""); x.al = $("akf_al").value.trim(); x.src = $("akf_src").value.trim(); x.date = $("akf_date").value; x.role = $("akf_role").value; x.note = $("akf_note").value.trim();
    document.querySelectorAll(".ak-n").forEach((n) => { (x.st[n.dataset.k] = x.st[n.dataset.k] || [])[+n.dataset.i] = +n.value || 0; });
    if (!x.id) { x.id = Math.random().toString(36).slice(2, 9); SETS.push(x); } else SETS = SETS.map((y) => y.id === x.id ? x : y);
    editing = null; msg = ""; render(); };
  if ($("ak_imp")) $("ak_imp").onclick = () => { impOpen = !impOpen; render(); };
  if ($("ak_impFile")) $("ak_impFile").onchange = async (e) => { const fl = e.target.files[0]; if (fl) $("ak_impTxt").value = await fl.text(); };
  if ($("ak_impGo")) $("ak_impGo").onclick = () => {
    let arr = null; try { const j = JSON.parse($("ak_impTxt").value); arr = Array.isArray(j) ? j : j && Array.isArray(j.sets) ? j.sets : null; } catch (e) {}
    const ok = (arr || []).filter((x) => x && x.name && x.st && ["inf", "cav", "arc"].every((k) => Array.isArray(x.st[k]) && x.st[k].length === 4));
    if (!ok.length) { msg = t("impBad"); render(); return; }
    for (const x of ok) { const k = norm(x.name) + "|" + norm(x.src); const y = Object.assign({ fit: true }, x, { id: x.id || Math.random().toString(36).slice(2, 9) });
      const j = SETS.findIndex((s) => norm(s.name) + "|" + norm(s.src) === k); if (j >= 0) { y.id = SETS[j].id; SETS[j] = y; } else SETS.push(y); }
    impOpen = false; msg = fill(t("impOk"), { n: ok.length }) + " · " + t("unsaved"); render(); };
  if ($("ak_save")) $("ak_save").onclick = saveSets;
}
/* 📦 MightPulse history: one encrypted file per day (data/mp-history/YYYY-MM-DD-x7k2p9.json, written by scripts/mp-history.js);
   the card decrypts the chosen days in the browser and downloads them as one JSON for the analysis chat */
function histCard() {
  const el = $("ak_hist"); if (!el) return;
  const h = (k) => (HT[lang] || HT.en)[k] || HT.en[k], day = (d) => d.toISOString().slice(0, 10), today = new Date();
  el.innerHTML = `<h3 style="margin:0 0 4px">${h("hT")}</h3><div class="muted" style="font-size:12.5px;margin-bottom:8px">${h("hNote")}</div>
    <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">${h("hFrom")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="ak_hf" value="${day(new Date(today - 6 * 864e5))}">
    ${h("hTo")} <input type="date" class="inp" style="height:36px;box-sizing:border-box" id="ak_ht" value="${day(today)}"> <button type="button" class="btn" id="ak_hdl">${h("hDl")}</button> <span class="muted" id="ak_hmsg" style="font-size:12.5px"></span></div>`;
  $("ak_hdl").onclick = async () => {
    const a = new Date($("ak_hf").value + "T00:00:00Z"), b = new Date($("ak_ht").value + "T00:00:00Z"), out = {}, m = $("ak_hmsg");
    if (isNaN(a) || isNaN(b) || b < a || b - a > 120 * 864e5) return;
    for (let t = +a; t <= +b; t += 864e5) { const d = day(new Date(t)); m.textContent = h("hBusy").replace("{d}", d);
      try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x) out[d] = x; } catch (e) {} }
    const n = Object.keys(out).length; if (!n) { m.textContent = h("hNone"); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: "application/json" })), l = document.createElement("a");
    l.href = url; l.download = `mightpulse-history-${$("ak_hf").value}_${$("ak_ht").value}.json`; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
    m.textContent = h("hDone").replace("{n}", n); };
}
function applyTexts() { if ($("ak_title")) { $("ak_title").textContent = t("title"); $("ak_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { $("ak_root").innerHTML = `<div class="card muted">🔒</div>`; return; }
  await Promise.all([loadSets(), loadSnap()]);
  render();
}
function setLang(l) { lang = l; applyTexts(); if ($("ak_root") && $("ak_root").innerHTML) render(); }
OFFICER_PAGES.attack = { init, applyTexts, setLang, onShow: () => { if (SNAP || SETS.length) render(); } };
})();
