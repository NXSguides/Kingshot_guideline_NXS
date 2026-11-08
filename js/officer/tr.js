/* NXS officer page — 🧳 Kingdom Transfer list (registers OFFICER_PAGES.tr; own top-level tab, nobody by default, admins always).
   Sherry 2026-11-08: the November Kingdom Transfer — players from other kingdoms who want to move INTO #2189.
   One encrypted file, data/transfer-x7k2p9.json:
     { v: 1, settings: { cap (M), invites, open, special, from, to },
       players: [{ key, id|null, name, src, status, slot, note, tc, tcLv, power, kid (hint), mp|null, cands?, nf? }],
       requested: { at, by, imports: [{ kid, tag, src }] } | absent, lastRun: { at, reqAt, found, multi, none, left, calls }, at, by }
   🔎 Look up saves the file with "requested" set → .github/workflows/transfer-lookup.yml (scripts/transfer-lookup.js) fills
   mp / cands / id from MightPulse and clears "requested". It never touches status, slot, note, name or source.
   Names never leave this browser unencrypted. */
(function () {
const $ = (id) => document.getElementById(id);
const esc = OFFICER.util.esc;
const FILE = "data/transfer-x7k2p9.json";
const DEF = { cap: 170, invites: 35, open: 20, special: 3, from: 2106, to: 2234 };
const STS = ["interested", "invited", "confirmed", "moved", "no"];
const SLOTS = ["", "invite", "open", "special"];
const USED = new Set(["invited", "confirmed", "moved"]);
const PASS_DIV = 33600;   // 🔬 2026-11-08, not confirmed: Migrant Score ÷ 33,600, rounded (min 1, max 50)
const T = {
  en: { title: "🧳 Kingdom Transfer list", intro: "Players from other kingdoms who want to come to #2189. Add them, let MightPulse fill in their data, pick whom to invite.",
    locked: "Unlock the officer data to see the list.", group: "Transfer group", cap: "Transfer Power Cap", ordK: "Ordinary Kingdom",
    set: "⚙️ Settings", from: "from K", to: "to K", capM: "Transfer Power Cap (M)", setOk: "✓",
    q_invite: "Ordinary Invite", q_open: "Transfer Opens", q_special: "Special Invite", qHint: "counted: invited, confirmed and moved",
    addH: "➕ Add players", pastePh: "Paste a list — one player per line, any order:\n1  Name  123456789  TG3  150.4M\nName  TC30  92,370,087", srcPh: "Source (e.g. SAQ #2188, list A)", addBtn: "Add",
    added: "{n} added · {d} already on the list.", noneRead: "No player found in the text.",
    impH: "🏰 Import a whole alliance", impKid: "Kingdom", impTag: "Alliance tag", impBtn: "Add to the look-up", impBad: "Type the kingdom number and the alliance tag.", impQ: "Waiting for the look-up: {l}",
    look: "🔎 Look up with MightPulse", lookSub: "about {n} min", lookIng: "⏳ Look-up asked {t} — about {n} min. The page updates by itself.",
    last: "Last look-up {t}: {f} found · {m} to pick · {x} not found", left: "{n} not done yet (limit per run) — press 🔎 again.", never: "Not looked up yet.", reload: "↻ Reload",
    save: "💾 Save", saving: "Saving…", saved: "Saved ✅", unsaved: "Not saved yet.",
    errAuth: "The saved GitHub key doesn't work any more — ask Sherry.", errBusy: "Someone else saved at the same time — try again.", errNet: "Couldn't reach GitHub — try again.", noKey: "Saving needs the officers' GitHub key.",
    allSrc: "All sources", allSt: "All statuses", find: "Find name / ID", count: "{n} of {t} players", empty: "No players yet.",
    c_st: "Status", c_slot: "Slot", c_name: "Name", c_src: "Source", c_kid: "Kingdom", c_al: "Alliance", c_id: "ID", c_tc: "Town Center", c_pow: "Power", c_mig: "Migrant Score", c_pass: "🔬 Transfer Pass ≈", c_sw: "Swordland ≈", c_mys: "Mystic Trial", c_note: "Note",
    st: { interested: "🙋 interested", invited: "✉️ invited", confirmed: "✅ confirmed", moved: "🏠 moved", no: "✖️ no" },
    sl: { "": "—", invite: "Ordinary Invite", open: "Transfer Opens", special: "Special Invite" },
    over: "🎟️ over cap", overTip: "Power is over the Transfer Power Cap — only a Special Invite can bring this player.",
    pick: "{n} possible — pick one", pickOk: "✓", nf: "🔎 not found — add the ID, or the kingdom (#2188) to the source", given: "listed: {v}", c_gName: "Listed name", c_gTc: "Listed TC", c_gPow: "Listed power", c_diff: "Differs from list", dW: ["name", "TC", "power"], mpName: "MightPulse: {v}",
    del: "✕", delQ: "Remove {n} from the list?", selHint: "☑️ Tick rows on the left to change many at once.", selN: "☑️ {n} selected", bNotePh: "e.g. 🇰🇷 Boo", bAdd: "➕ Add to note", bSt: "Set status…", bClr: "Clear ticks", bDone: "✅ Done for {n} — press 💾 Save", rf: "↻", rfTip: "Update this player from MightPulse (at the next 🔎)", rfAll: "↻ Update all shown ({n})", rfWait: "{n} waiting for update — press 🔎", rfOn: "↻ waiting", idPh: "ID", notePh: "note", copy: "📋 Copy", copied: "✅ Copied", csv: "⬇️ CSV",
    passNote: "🔬 Research, 2026-11-08 — not confirmed. Transfer Pass ≈ Migrant Score ÷ 33,600, rounded (5 players checked: 94k→3, 236k→7, 306k→9, 311k→9, 397k→12). \"Round with ~33k\" and \"round up with ~35k\" both fit so far.",
    powNote: "Power = MightPulse power. The game's Transfer Power also counts injured troops and the Enlistment Office, so it can be a bit higher.",
    swNote: "Swordland ≈ Migrant Score ÷ 317 (Swordland Showdown troop power)." },
  zh: { title: "🧳 王國移民名單", intro: "想從其他王國移民到 #2189 的玩家。加進來，讓 MightPulse 補資料，再決定邀請誰。",
    locked: "要先解鎖幹部資料才看得到名單。", group: "移民分組", cap: "移民實力限制", ordK: "普通王國",
    set: "⚙️ 設定", from: "從 K", to: "到 K", capM: "移民實力限制（M）", setOk: "✓",
    q_invite: "普通邀請", q_open: "自由移民", q_special: "特殊邀請", qHint: "只算：已邀請、已確認、已移民",
    addH: "➕ 加入玩家", pastePh: "貼上名單——一行一個人，順序不拘：\n1  名字  123456789  TG3  150.4M\n名字  TC30  92,370,087", srcPh: "來源（例如 SAQ #2188、名單 A）", addBtn: "加入",
    added: "加入 {n} 人 · {d} 人已經在名單上。", noneRead: "這段文字裡找不到玩家。",
    impH: "🏰 匯入整個聯盟", impKid: "王國", impTag: "聯盟簡稱", impBtn: "加到查詢", impBad: "請輸入王國編號和聯盟簡稱。", impQ: "等待查詢：{l}",
    look: "🔎 用 MightPulse 查詢", lookSub: "大約 {n} 分鐘", lookIng: "⏳ {t} 送出查詢——大約 {n} 分鐘，頁面會自己更新。",
    last: "上次查詢 {t}：找到 {f} · 要選 {m} · 找不到 {x}", left: "還有 {n} 個沒查完（每次有上限）——再按一次 🔎。", never: "還沒查過。", reload: "↻ 重新整理",
    save: "💾 儲存", saving: "儲存中…", saved: "已儲存 ✅", unsaved: "還沒儲存。",
    errAuth: "存著的 GitHub 金鑰不能用了——請找 Sherry。", errBusy: "有人同時儲存——再試一次。", errNet: "連不到 GitHub——請再試一次。", noKey: "儲存需要幹部的 GitHub 金鑰。",
    allSrc: "全部來源", allSt: "全部狀態", find: "找名字 / ID", count: "{n} / {t} 人", empty: "還沒有玩家。",
    c_st: "狀態", c_slot: "名額", c_name: "名字", c_src: "來源", c_kid: "王國", c_al: "聯盟", c_id: "ID", c_tc: "城鎮中心", c_pow: "戰力", c_mig: "遷城分數", c_pass: "🔬 移民授權書 ≈", c_sw: "聖劍 ≈", c_mys: "秘境試煉", c_note: "備註",
    st: { interested: "🙋 有興趣", invited: "✉️ 已邀請", confirmed: "✅ 已確認", moved: "🏠 已移民", no: "✖️ 不要" },
    sl: { "": "—", invite: "普通邀請", open: "自由移民", special: "特殊邀請" },
    over: "🎟️ 超過限制", overTip: "戰力超過移民實力限制——只能用特殊邀請。",
    pick: "{n} 個可能——選一個", pickOk: "✓", nf: "🔎 找不到——補上 ID，或在來源寫王國號（#2188）", given: "名單上：{v}", c_gName: "名單上的名字", c_gTc: "名單上的 TC", c_gPow: "名單上的戰力", c_diff: "跟名單不同", dW: ["名字", "TC", "戰力"], mpName: "MightPulse：{v}",
    del: "✕", delQ: "把 {n} 從名單移除？", selHint: "☑️ 勾左邊的方框，可以一次改很多人。", selN: "☑️ 已勾 {n} 人", bNotePh: "例如 🇰🇷 Boo 確認", bAdd: "➕ 加到備註", bSt: "設定狀態…", bClr: "取消勾選", bDone: "✅ 已改 {n} 人——記得按 💾 儲存", rf: "↻", rfTip: "下次按 🔎 時重新抓這個人的資料", rfAll: "↻ 全部更新（目前顯示的 {n} 人）", rfWait: "{n} 人等著更新——按 🔎 開始", rfOn: "↻ 等更新", idPh: "ID", notePh: "備註", copy: "📋 複製", copied: "✅ 已複製", csv: "⬇️ CSV",
    passNote: "🔬 研究中，2026-11-08——還沒確認。移民授權書 ≈ 遷城分數 ÷ 33,600，四捨五入（查過 5 人：94k→3、236k→7、306k→9、311k→9、397k→12）。目前「約 33k 一張四捨五入」和「約 35k 一張無條件進位」都對得上。",
    powNote: "戰力 = MightPulse 的戰力。遊戲的移民實力還會加上傷兵和預備營的部隊，所以可能稍微高一點。",
    swNote: "聖劍 ≈ 遷城分數 ÷ 317（聖劍爭奪的部隊戰力）。" },
  pt: { title: "🧳 Lista da Transferência de Reino", intro: "Jogadores de outros reinos que querem vir para o #2189. Adicione, deixe a MightPulse preencher os dados e escolha quem convidar.",
    locked: "Desbloqueie os dados dos oficiais para ver a lista.", group: "Grupo de transferência", cap: "Limite de Poder de Transferência", ordK: "Reinos Comuns",
    set: "⚙️ Ajustes", from: "de K", to: "até K", capM: "Limite de Poder de Transferência (M)", setOk: "✓",
    q_invite: "Convites Comuns", q_open: "Abertura das Transferências", q_special: "Convite Especial", qHint: "conta: convidado, confirmado e mudou",
    addH: "➕ Adicionar jogadores", pastePh: "Cole uma lista — um jogador por linha, qualquer ordem:\n1  Nome  123456789  TG3  150.4M\nNome  TC30  92,370,087", srcPh: "Origem (ex.: SAQ #2188, lista A)", addBtn: "Adicionar",
    added: "{n} adicionados · {d} já estavam na lista.", noneRead: "Nenhum jogador encontrado no texto.",
    impH: "🏰 Importar uma aliança inteira", impKid: "Reino", impTag: "Tag da aliança", impBtn: "Pôr na consulta", impBad: "Digite o número do reino e a tag da aliança.", impQ: "Esperando a consulta: {l}",
    look: "🔎 Consultar na MightPulse", lookSub: "uns {n} min", lookIng: "⏳ Consulta pedida {t} — uns {n} min. A página se atualiza sozinha.",
    last: "Última consulta {t}: {f} achados · {m} para escolher · {x} não achados", left: "{n} ainda não feitos (limite por vez) — aperte 🔎 de novo.", never: "Ainda não consultado.", reload: "↻ Recarregar",
    save: "💾 Salvar", saving: "Salvando…", saved: "Salvo ✅", unsaved: "Ainda não salvo.",
    errAuth: "A chave do GitHub salva não funciona mais — fale com a Sherry.", errBusy: "Outra pessoa salvou ao mesmo tempo — tente de novo.", errNet: "Não deu para acessar o GitHub — tente de novo.", noKey: "Salvar precisa da chave do GitHub dos oficiais.",
    allSrc: "Todas as origens", allSt: "Todos os status", find: "Achar nome / ID", count: "{n} de {t} jogadores", empty: "Nenhum jogador ainda.",
    c_st: "Status", c_slot: "Vaga", c_name: "Nome", c_src: "Origem", c_kid: "Reino", c_al: "Aliança", c_id: "ID", c_tc: "Centro da Cidade", c_pow: "Poder", c_mig: "Pontuação de Migração", c_pass: "🔬 Passe de Transferência ≈", c_sw: "Terra das Espadas ≈", c_mys: "Prova Mística", c_note: "Nota",
    st: { interested: "🙋 interessado", invited: "✉️ convidado", confirmed: "✅ confirmado", moved: "🏠 mudou", no: "✖️ não" },
    sl: { "": "—", invite: "Convites Comuns", open: "Abertura das Transferências", special: "Convite Especial" },
    over: "🎟️ acima do limite", overTip: "O poder passa do Limite de Poder de Transferência — só um Convite Especial traz este jogador.",
    pick: "{n} possíveis — escolha um", pickOk: "✓", nf: "🔎 não achado — coloque o ID, ou o reino (#2188) na origem", given: "na lista: {v}", c_gName: "Nome na lista", c_gTc: "TC na lista", c_gPow: "Poder na lista", c_diff: "Diferente da lista", dW: ["nome", "TC", "poder"], mpName: "MightPulse: {v}",
    del: "✕", delQ: "Tirar {n} da lista?", selHint: "☑️ Marque as caixas à esquerda para mudar vários de uma vez.", selN: "☑️ {n} marcados", bNotePh: "ex.: 🇰🇷 Boo", bAdd: "➕ Pôr na nota", bSt: "Mudar status…", bClr: "Desmarcar", bDone: "✅ Feito para {n} — aperte 💾 Salvar", rf: "↻", rfTip: "Atualizar este jogador na MightPulse (no próximo 🔎)", rfAll: "↻ Atualizar todos os mostrados ({n})", rfWait: "{n} esperando atualização — aperte 🔎", rfOn: "↻ esperando", idPh: "ID", notePh: "nota", copy: "📋 Copiar", copied: "✅ Copiado", csv: "⬇️ CSV",
    passNote: "🔬 Pesquisa, 2026-11-08 — não confirmado. Passe de Transferência ≈ Pontuação de Migração ÷ 33.600, arredondado (5 jogadores conferidos: 94k→3, 236k→7, 306k→9, 311k→9, 397k→12). \"Arredondar com ~33k\" e \"arredondar para cima com ~35k\" batem até agora.",
    powNote: "Poder = poder da MightPulse. O Poder de Transferência do jogo também conta tropas feridas e o Escritório de Alistamento, então pode ser um pouco maior.",
    swNote: "Terra das Espadas ≈ Pontuação de Migração ÷ 317 (poder das tropas no Confronto entre Espadas)." },
  ar: { title: "🧳 قائمة نقل المملكة", intro: "لاعبون من ممالك أخرى يريدون الانتقال إلى #2189. أضفهم، ودع MightPulse يملأ بياناتهم، ثم اختر من تدعو.",
    locked: "افتح بيانات الضباط لرؤية القائمة.", group: "مجموعة النقل", cap: "الحد الأقصى لقوة النقل", ordK: "الممالك العادية",
    set: "⚙️ الإعدادات", from: "من K", to: "إلى K", capM: "الحد الأقصى لقوة النقل (M)", setOk: "✓",
    q_invite: "الدعوات العادية", q_open: "فتح باب الانتقال", q_special: "الدعوات الخاصة", qHint: "يُحسب: تمت دعوته، مؤكد، انتقل",
    addH: "➕ إضافة لاعبين", pastePh: "الصق قائمة — لاعب في كل سطر، بأي ترتيب:\n1  الاسم  123456789  TG3  150.4M\nالاسم  TC30  92,370,087", srcPh: "المصدر (مثل SAQ #2188، القائمة A)", addBtn: "إضافة",
    added: "أُضيف {n} · {d} موجودون في القائمة.", noneRead: "لم يُعثر على لاعب في النص.",
    impH: "🏰 استيراد تحالف كامل", impKid: "المملكة", impTag: "وسم التحالف", impBtn: "أضف إلى البحث", impBad: "اكتب رقم المملكة ووسم التحالف.", impQ: "بانتظار البحث: {l}",
    look: "🔎 ابحث في MightPulse", lookSub: "نحو {n} دقيقة", lookIng: "⏳ طُلب البحث {t} — نحو {n} دقيقة. تتحدث الصفحة وحدها.",
    last: "آخر بحث {t}: وُجد {f} · للاختيار {m} · لم يوجد {x}", left: "{n} لم يُنجز بعد (حد لكل مرة) — اضغط 🔎 مرة أخرى.", never: "لم يُبحث بعد.", reload: "↻ تحديث",
    save: "💾 حفظ", saving: "جارٍ الحفظ…", saved: "تم الحفظ ✅", unsaved: "لم يُحفظ بعد.",
    errAuth: "مفتاح GitHub المحفوظ لم يعد يعمل — اسأل Sherry.", errBusy: "حفظ شخص آخر في الوقت نفسه — حاول مجددًا.", errNet: "تعذّر الوصول إلى GitHub — حاول مجددًا.", noKey: "الحفظ يحتاج مفتاح GitHub الخاص بالضباط.",
    allSrc: "كل المصادر", allSt: "كل الحالات", find: "ابحث عن اسم / معرّف", count: "{n} من {t} لاعب", empty: "لا يوجد لاعبون بعد.",
    c_st: "الحالة", c_slot: "المقعد", c_name: "الاسم", c_src: "المصدر", c_kid: "المملكة", c_al: "التحالف", c_id: "المعرّف", c_tc: "مركز البلدة", c_pow: "القوة", c_mig: "نقاط الهجرة", c_pass: "🔬 تذكرة الانتقال ≈", c_sw: "أرض السيوف ≈", c_mys: "الاختبارات الغامضة", c_note: "ملاحظة",
    st: { interested: "🙋 مهتم", invited: "✉️ تمت دعوته", confirmed: "✅ مؤكد", moved: "🏠 انتقل", no: "✖️ لا" },
    sl: { "": "—", invite: "الدعوات العادية", open: "فتح باب الانتقال", special: "الدعوات الخاصة" },
    over: "🎟️ فوق الحد", overTip: "القوة فوق الحد الأقصى لقوة النقل — لا تجلبه إلا الدعوات الخاصة.",
    pick: "{n} محتملون — اختر واحدًا", pickOk: "✓", nf: "🔎 لم يوجد — أضف الـ ID، أو رقم المملكة (#2188) في المصدر", given: "في القائمة: {v}", c_gName: "الاسم في القائمة", c_gTc: "TC في القائمة", c_gPow: "القوة في القائمة", c_diff: "يختلف عن القائمة", dW: ["الاسم","TC","القوة"], mpName: "MightPulse: {v}",
    del: "✕", delQ: "إزالة {n} من القائمة؟", selHint: "☑️ علّم المربعات على اليسار لتغيير كثيرين مرة واحدة.", selN: "☑️ {n} محدد", bNotePh: "مثال: 🇰🇷 Boo", bAdd: "➕ أضف إلى الملاحظة", bSt: "حدد الحالة…", bClr: "إلغاء التحديد", bDone: "✅ تم لـ {n} — اضغط 💾 حفظ", rf: "↻", rfTip: "تحديث هذا اللاعب من MightPulse (عند 🔎 التالي)", rfAll: "↻ تحديث كل المعروضين ({n})", rfWait: "{n} بانتظار التحديث — اضغط 🔎", rfOn: "↻ بانتظار التحديث", idPh: "المعرّف", notePh: "ملاحظة", copy: "📋 نسخ", copied: "✅ تم النسخ", csv: "⬇️ CSV",
    passNote: "🔬 بحث، 2026-11-08 — غير مؤكد. تذكرة الانتقال ≈ نقاط الهجرة ÷ 33,600، مقرّبة (فُحص 5 لاعبين: 94k→3، 236k→7، 306k→9، 311k→9، 397k→12). \"التقريب مع ~33k\" و\"التقريب للأعلى مع ~35k\" كلاهما يطابق حتى الآن.",
    powNote: "القوة = قوة MightPulse. قوة النقل في اللعبة تحسب أيضًا الجنود الجرحى ومكتب التجنيد، فقد تكون أعلى قليلًا.",
    swNote: "أرض السيوف ≈ نقاط الهجرة ÷ 317 (قوة القوات في مواجهة أرض السيوف)." },
  ko: { title: "🧳 왕국 이민 명단", intro: "다른 왕국에서 #2189로 오고 싶은 플레이어. 추가하고, MightPulse로 데이터를 채우고, 누구를 초대할지 정해요.",
    locked: "간부 데이터를 잠금 해제해야 명단이 보여요.", group: "이민 그룹", cap: "이민 전투력 제한", ordK: "일반 왕국",
    set: "⚙️ 설정", from: "K", to: "~ K", capM: "이민 전투력 제한 (M)", setOk: "✓",
    q_invite: "일반 초대", q_open: "자유 이민", q_special: "특별 초대", qHint: "집계: 초대함, 확정, 이민 완료",
    addH: "➕ 플레이어 추가", pastePh: "명단 붙여넣기 — 한 줄에 한 명, 순서 상관없음:\n1  이름  123456789  TG3  150.4M\n이름  TC30  92,370,087", srcPh: "출처 (예: SAQ #2188, 명단 A)", addBtn: "추가",
    added: "{n}명 추가 · {d}명은 이미 명단에 있어요.", noneRead: "텍스트에서 플레이어를 찾지 못했어요.",
    impH: "🏰 연맹 전체 가져오기", impKid: "왕국", impTag: "연맹 태그", impBtn: "조회에 추가", impBad: "왕국 번호와 연맹 태그를 입력하세요.", impQ: "조회 대기: {l}",
    look: "🔎 MightPulse로 조회", lookSub: "약 {n}분", lookIng: "⏳ {t}에 조회 요청 — 약 {n}분. 페이지가 저절로 바뀌어요.",
    last: "마지막 조회 {t}: 찾음 {f} · 선택 필요 {m} · 못 찾음 {x}", left: "{n}명 아직 남음 (1회 한도) — 🔎를 다시 누르세요.", never: "아직 조회 전.", reload: "↻ 새로고침",
    save: "💾 저장", saving: "저장 중…", saved: "저장됨 ✅", unsaved: "아직 저장 안 됨.",
    errAuth: "저장된 GitHub 키가 더 이상 작동하지 않아요 — Sherry에게 물어보세요.", errBusy: "다른 사람이 동시에 저장했어요 — 다시 시도하세요.", errNet: "GitHub에 연결할 수 없어요 — 다시 시도하세요.", noKey: "저장하려면 간부 GitHub 키가 필요해요.",
    allSrc: "모든 출처", allSt: "모든 상태", find: "이름 / ID 찾기", count: "{t}명 중 {n}명", empty: "아직 플레이어가 없어요.",
    c_st: "상태", c_slot: "자리", c_name: "이름", c_src: "출처", c_kid: "왕국", c_al: "연맹", c_id: "ID", c_tc: "도시 센터", c_pow: "전투력", c_mig: "이주 점수", c_pass: "🔬 이민 허가증 ≈", c_sw: "성검 ≈", c_mys: "신비한 시련", c_note: "메모",
    st: { interested: "🙋 관심", invited: "✉️ 초대함", confirmed: "✅ 확정", moved: "🏠 이민 완료", no: "✖️ 안 함" },
    sl: { "": "—", invite: "일반 초대", open: "자유 이민", special: "특별 초대" },
    over: "🎟️ 제한 초과", overTip: "전투력이 이민 전투력 제한을 넘어요 — 특별 초대로만 데려올 수 있어요.",
    pick: "후보 {n}명 — 하나 고르기", pickOk: "✓", nf: "🔎 못 찾음 — ID를 넣거나 출처에 왕국 번호(#2188)를 쓰세요", given: "명단: {v}", c_gName: "명단 이름", c_gTc: "명단 TC", c_gPow: "명단 전투력", c_diff: "명단과 다름", dW: ["이름", "TC", "전투력"], mpName: "MightPulse: {v}",
    del: "✕", delQ: "{n}을(를) 명단에서 뺄까요?", selHint: "☑️ 왼쪽 칸을 체크하면 여러 명을 한 번에 바꿀 수 있어요.", selN: "☑️ {n}명 체크", bNotePh: "예: 🇰🇷 Boo 확인", bAdd: "➕ 메모에 추가", bSt: "상태 정하기…", bClr: "체크 해제", bDone: "✅ {n}명 변경 — 💾 저장을 누르세요", rf: "↻", rfTip: "다음 🔎 때 MightPulse에서 이 플레이어 다시 가져오기", rfAll: "↻ 보이는 사람 모두 업데이트 ({n})", rfWait: "업데이트 대기 {n}명 — 🔎를 누르세요", rfOn: "↻ 업데이트 대기", idPh: "ID", notePh: "메모", copy: "📋 복사", copied: "✅ 복사됨", csv: "⬇️ CSV",
    passNote: "🔬 연구 중, 2026-11-08 — 확인 안 됨. 이민 허가증 ≈ 이주 점수 ÷ 33,600, 반올림 (5명 확인: 94k→3, 236k→7, 306k→9, 311k→9, 397k→12). \"약 33k마다 반올림\"과 \"약 35k마다 올림\" 둘 다 지금까지 맞아요.",
    powNote: "전투력 = MightPulse 전투력. 게임의 이민 전투력은 부상병과 징병소 병력도 더해서 조금 더 높을 수 있어요.",
    swNote: "성검 ≈ 이주 점수 ÷ 317 (성검 쟁탈 부대 전투력)." },
};
let lang = OFFICER.lang || "en";
const t = (k, v) => { let s = (T[lang] || T.en)[k] ?? T.en[k]; if (v && typeof s === "string") for (const [a, b] of Object.entries(v)) s = s.split("{" + a + "}").join(b); return s; };
const ED = () => OFFICER.can("tr", "edit");
const pad = (n) => String(n).padStart(2, "0");
function when(v) {
  const ms = typeof v === "number" ? v : Date.parse(v); if (!Number.isFinite(ms)) return "";
  const d = new Date(ms), loc = { zh: "當地", pt: "local", ar: "محلي", ko: "현지" }[lang] || "local";
  return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC (${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} ${loc})`;
}
const M = (v) => v == null || v === "" || !Number.isFinite(+v) ? "" : (+v >= 1e9 ? (+v / 1e9).toFixed(2) + "B" : +v >= 1e6 ? (+v / 1e6).toFixed(1) + "M" : +v >= 1e3 ? (+v / 1e3).toFixed(1) + "k" : String(Math.round(+v)));
const tcLabel = (lv) => lv == null || lv === "" ? "" : +lv >= 35 ? "TG" + Math.floor((+lv - 30) / 5) + ((+lv - 30) % 5 ? "-" + ((+lv - 30) % 5) : "") : "TC" + lv;
const passes = (mg) => mg > 0 ? Math.min(50, Math.max(1, Math.round(mg / PASS_DIV))) : null;
const swOf = (mg) => mg > 0 ? Math.round(OFFICER.squadPower ? OFFICER.squadPower({ migrant: mg }) : mg / 317) : null;
const uniqImp = (a) => a.filter((x, i) => x && a.findIndex((y) => y && +y.kid === +x.kid && String(y.tag).toLowerCase() === String(x.tag).toLowerCase()) === i);
const norm = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const newKey = () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const b64u8 = (b64) => OFFICER.util.b64ToUtf8(b64);
const u8b64 = (s) => OFFICER.util.utf8ToB64(s);

/* ---- state: L = what is shown; BASE = server copy as loaded; CH / ADDED / REMOVED / SETCH = this officer's unsaved changes ---- */
let L = null, BASE = null, CH = new Map(), ADDED = new Set(), REMOVED = new Set(), SETCH = false, IMPQ = [], msg = "", polling = false;
const SEL = new Set();   // ☑️ ticked rows for the batch bar (not saved)
const UI = (() => { try { return JSON.parse(localStorage.getItem("nxs-tr-ui") || "{}"); } catch (e) { return {}; } })();
const keepUI = () => { try { localStorage.setItem("nxs-tr-ui", JSON.stringify(UI)); } catch (e) {} };
UI.sort = UI.sort || "pow"; UI.dir = UI.dir || -1;
const S = () => ({ ...DEF, ...((L && L.settings) || {}) });
const dirty = () => CH.size || ADDED.size || REMOVED.size || SETCH || IMPQ.length;
const mark = (key, f) => { if (ADDED.has(key)) return; if (!CH.has(key)) CH.set(key, new Set()); CH.get(key).add(f); };
const P = (key) => (L.players || []).find((p) => p.key === key);
const powOf = (p) => (p.mp && p.mp.power) || p.power || null;
const migOf = (p) => (p.mp && p.mp.migrant) || null;

async function readSrv() {
  if (OFFICER.token) { try { const f = await OFFICER.gh("GET", FILE, null, OFFICER.token); if (f === null) return { d: null, sha: null }; if (f) return { d: await OfficerData.open(JSON.parse(b64u8(f.content))), sha: f.sha }; } catch (e) { if (e.message === "auth") throw e; } }
  try { return { d: await OfficerData.fetchJson(FILE) }; } catch (e) { return { d: null }; }
}
const blank = () => ({ v: 1, settings: { ...DEF }, players: [] });
/* take a newer server copy, keeping this officer's unsaved changes on top */
function absorb(srv) {
  srv = srv && Array.isArray(srv.players) ? srv : blank();
  const mine = new Map((L ? L.players : []).map((p) => [p.key, p]));
  const out = [];
  for (const sp of srv.players) {
    if (REMOVED.has(sp.key)) continue;
    const lp = mine.get(sp.key), ch = CH.get(sp.key);
    if (lp && ch) { const p = { ...sp }; for (const f of ch) p[f] = lp[f]; if (ch.has("id") && String(p.id || "") !== String(sp.id || "")) { delete p.cands; if (p.mp && String(p.mp.pid) !== String(p.id)) p.mp = null; } out.push(p); }
    else out.push({ ...sp });
  }
  for (const k of ADDED) { const lp = mine.get(k); if (lp && !srv.players.some((x) => x.key === k)) out.push(lp); }
  const settings = SETCH && L ? L.settings : srv.settings;
  BASE = JSON.stringify(srv);
  L = { ...srv, settings: { ...DEF, ...(settings || {}) }, players: out };
}

/* ---- paste parser: "1  Name  123456789  TG3  150.4M" in any order ---- */
function parseLine(line) {
  let s = " " + String(line).replace(/[ 　]/g, " ").replace(/\t/g, "  ") + " ";
  const o = {};
  s = s.replace(/^\s*\d{1,3}\s*[.)\-:、]?\s+(?=\S)/, " ");                               // row number
  s = s.replace(/(?:^|[\s(\[])(?:#|K\s?)(\d{4})(?=[\s)\],;|]|$)/gi, (m, k) => { o.kid = +k; return " "; });   // #2188 / K2188
  s = s.replace(/(?<![\d.,])(\d{9})(?![\d.,]|\s*[MmBbKk萬亿億](?![a-z]))/, (m, d) => { o.id = d; return " "; });   // 9-digit ID
  s = s.replace(/(?<![\w.])(\d{1,4}(?:[.,]\d{1,3})?)\s*([MmBbKk])(?![a-zA-Z])/, (m, n, u) => { const v = parseFloat(n.replace(",", ".")); o.power = Math.round(v * ({ m: 1e6, b: 1e9, k: 1e3 })[u.toLowerCase()]); return " "; });
  if (o.power == null) s = s.replace(/(?<![\d.,])(\d{1,3}(?:[,.\s]\d{3}){2,})(?![\d])/, (m, n) => { o.power = +n.replace(/[^\d]/g, ""); return " "; });
  s = s.replace(/(?<![A-Za-z])(TG|TC|Lv\.?)\s?(\d{1,2})(?!\d)/i, (m, a, n) => { const tg = /tg/i.test(a); o.tc = (tg ? "TG" : "TC") + n; o.tcLv = tg ? 30 + 5 * +n : +n; return " "; });
  if (o.power == null) s = s.replace(/(?<![\d.,])(\d{7,10})(?![\d.,])/, (m, n) => { if (!o.id && n.length === 9) { o.id = n; return " "; } o.power = +n; return " "; });
  if (!o.id) s = s.replace(/(?<![\d.,])(\d{8,10})(?![\d.,])/, (m, n) => { o.id = n; return " "; });
  const name = s.replace(/[|;]+/g, " ").replace(/\s{2,}/g, " ").trim().replace(/^[-–—:,.\s]+|[-–—:,\s]+$/g, "").trim();
  if (!name && !o.id) return null;
  if (/^(no\.?|#|name|player|names?|名字|玩家|nome|jogador|اسم|الاسم|이름|플레이어)$/i.test(name) && !o.id && o.power == null) return null;
  o.name = name.slice(0, 40);
  return o;
}

/* ---- table ---- */
const COLS = ["name", "st", "slot", "src", "kid", "al", "id", "tc", "pow", "mig", "pass", "sw", "mys", "note"];
function val(p, k) {
  const mp = p.mp || {};
  switch (k) {
    case "st": return STS.indexOf(p.status || "interested");
    case "slot": return SLOTS.indexOf(p.slot || "");
    case "name": return norm(mp.name || p.name);
    case "src": return String(p.src || "").toLowerCase();
    case "kid": return mp.kid || p.kid || 0;
    case "al": return String(mp.alliance || "").toLowerCase();
    case "id": return +(p.id || 0);
    case "tc": return mp.tcLevel || p.tcLv || 0;
    case "pow": return powOf(p) || 0;
    case "mig": case "pass": case "sw": return migOf(p) || 0;
    case "mys": return mp.mystic || 0;
    case "note": return String(p.note || "").toLowerCase();
  }
  return 0;
}
function shown() {
  const q = norm(UI.q || ""), qd = String(UI.q || "").replace(/\D/g, "");
  return (L.players || []).filter((p) => (!UI.src || (p.src || "") === UI.src) && (!UI.st || (p.status || "interested") === UI.st)
    && (!q || norm(p.name).includes(q) || norm(p.mp && p.mp.name).includes(q) || (qd && String(p.id || "").includes(qd))))
    .sort((a, b) => { const x = val(a, UI.sort), y = val(b, UI.sort); return (x < y ? -1 : x > y ? 1 : 0) * UI.dir || (powOf(b) || 0) - (powOf(a) || 0); });
}
function cell(p, k, ed) {
  const mp = p.mp || {}, s = S();
  switch (k) {
    case "st": return ed ? `<select class="inp tr-sel" data-st="${esc(p.key)}">${STS.map((v) => `<option value="${v}"${(p.status || "interested") === v ? " selected" : ""}>${esc(t("st")[v])}</option>`).join("")}</select>` : esc(t("st")[p.status || "interested"]);
    case "slot": return ed ? `<select class="inp tr-sel" data-sl="${esc(p.key)}">${SLOTS.map((v) => `<option value="${v}"${(p.slot || "") === v ? " selected" : ""}>${esc(t("sl")[v])}</option>`).join("")}</select>` : esc(t("sl")[p.slot || ""]);
    case "name": {
      let h = `<b><bdi>${esc(mp.name || p.name || "?")}</bdi></b>`;   // MightPulse first; the pasted (original) name stays in the file and shows under it when different
      if (mp.name && p.name && norm(mp.name) !== norm(p.name)) h += `<div class="muted tr-sm"><bdi>${esc(t("given", { v: p.name }))}</bdi></div>`;
      if (p.cands && p.cands.length && !p.id) h += ed ? `<div class="tr-pk"><select class="inp" data-pks="${esc(p.key)}"><option value="">${esc(t("pick", { n: p.cands.length }))}</option>${p.cands.map((c, i) => `<option value="${i}">#${esc(c.kid || "?")} [${esc(c.alliance || "")}] ${esc(c.name || "")} · ${esc(M(c.power) || "?")}</option>`).join("")}</select></div>`
        : `<div class="muted tr-sm">${esc(t("pick", { n: p.cands.length }))}</div>`;
      else if (p.nf && !p.id) h += `<div class="muted tr-sm">${esc(t("nf"))}</div>`;
      return h;
    }
    case "src": return `<bdi>${esc(p.src || "")}</bdi>`;
    case "kid": return mp.kid || p.kid ? "#" + esc(mp.kid || p.kid) : "";
    case "al": return mp.alliance ? `[${esc(mp.alliance)}]` : "";
    case "id": return ed ? `<input class="inp tr-id" data-id="${esc(p.key)}" value="${esc(p.id || "")}" placeholder="${esc(t("idPh"))}" inputmode="numeric" maxlength="12">` : esc(p.id || "");
    case "tc": { const a = mp.tcLevel != null ? tcLabel(mp.tcLevel) : "", g = p.tc || ""; return esc(a || g) + (a && g && a.toUpperCase() !== g.toUpperCase() ? `<div class="muted tr-sm">${esc(t("given", { v: g }))}</div>` : ""); }
    case "pow": { const v = powOf(p), over = v && v > s.cap * 1e6;
      return `${esc(M(v))}${over ? ` <span class="tr-over${p.slot === "special" ? " ok" : ""}" title="${esc(t("overTip"))}">${esc(t("over"))}</span>` : ""}${mp.power && p.power && Math.abs(mp.power - p.power) / p.power > 0.05 ? `<div class="muted tr-sm">${esc(t("given", { v: M(p.power) }))}</div>` : ""}`; }
    case "mig": return esc(M(migOf(p)));
    case "pass": { const n = passes(migOf(p)); return n ? `<span class="tr-pass">≈${n}</span>` : ""; }
    case "sw": { const n = swOf(migOf(p)); return n ? "≈" + n.toLocaleString("en-US") : ""; }
    case "mys": return esc(mp.mystic != null ? M(mp.mystic) : "");
    case "note": return ed ? `<input class="inp tr-note" data-note="${esc(p.key)}" value="${esc(p.note || "")}" placeholder="${esc(t("notePh"))}" maxlength="80">` : `<bdi>${esc(p.note || "")}</bdi>`;
  }
  return "";
}
function table(rows, ed) {
  if (!(L.players || []).length) return `<div class="muted">${esc(t("empty"))}</div>`;
  const th = COLS.map((k) => `<th${k === "pass" ? ` title="${esc(t("passNote"))}"` : k === "pow" ? ` title="${esc(t("powNote"))}"` : k === "sw" ? ` title="${esc(t("swNote"))}"` : ""}><button type="button" class="mm-sort${UI.sort === k ? " on" : ""}" data-sort="${k}">${esc(t("c_" + k))}${UI.sort === k ? (UI.dir > 0 ? " ▲" : " ▼") : ""}</button></th>`).join("");
  const n = [...SEL].filter((k) => (L.players || []).some((p) => p.key === k)).length;
  const bulk = !ed ? "" : `<div class="tr-row tr-bulk" id="tr_bulk">${n ? `<b>${esc(t("selN", { n }))}</b>
      <input class="inp" id="tr_bNote" placeholder="${esc(t("bNotePh"))}" maxlength="40"><button type="button" class="btn small" id="tr_bAdd">${esc(t("bAdd"))}</button>
      <select class="inp" id="tr_bSt"><option value="">${esc(t("bSt"))}</option>${STS.map((v) => `<option value="${v}">${esc(t("st")[v])}</option>`).join("")}</select>
      <button type="button" class="btn small" id="tr_bClr">${esc(t("bClr"))}</button>` : `<span class="muted tr-sm">${esc(t("selHint"))}</span>`}</div>`;
  return bulk + `<div class="mm-tw tr-tw" id="tr_tbl"><table class="mm-t tr-t"><thead><tr>${ed ? `<th><input type="checkbox" id="tr_selAll" aria-label="all"${rows.length && rows.every((p) => SEL.has(p.key)) ? " checked" : ""}></th>` : ""}<th>#</th>${th}${ed ? "<th></th>" : ""}</tr></thead><tbody>`
    + rows.map((p, i) => `<tr class="${p.status === "no" ? "tr-no" : USED.has(p.status) ? "tr-used" : ""}">${ed ? `<td><input type="checkbox" data-sel="${esc(p.key)}"${SEL.has(p.key) ? " checked" : ""}></td>` : ""}<td class="muted">${i + 1}</td>${COLS.map((k) => `<td class="tr-${k}">${cell(p, k, ed)}</td>`).join("")}${ed ? `<td style="white-space:nowrap">${p.id ? `<button type="button" class="btn small${p.rf ? " on" : ""}" data-rf="${esc(p.key)}" title="${esc(t("rfTip"))}">${esc(t("rf"))}</button> ` : ""}<button type="button" class="btn small" data-del="${esc(p.key)}">${esc(t("del"))}</button></td>` : ""}</tr>`).join("")
    + `</tbody></table></div>`;
}
function quota() {
  const s = S(), used = { invite: 0, open: 0, special: 0 };
  for (const p of L.players || []) if (USED.has(p.status) && used[p.slot] != null) used[p.slot]++;
  const box = (k, max) => { const n = used[k], pc = max ? Math.min(100, Math.round(n / max * 100)) : 0;
    return `<div class="tr-q${n > max ? " full" : ""}"><div class="tr-ql">${esc(t("q_" + k))}</div><div class="tr-qn"><b>${n}</b> / ${max}</div><div class="tr-bar"><i style="width:${pc}%"></i></div></div>`; };
  return `<div class="tr-qs" id="tr_quota">${box("invite", s.invites)}${box("open", s.open)}${box("special", s.special)}</div>`;
}
function estMin() {
  const s = S(), noId = (L.players || []).filter((p) => !p.id).length, ids = (L.players || []).filter((p) => p.id && (p.rf || !(p.mp && p.mp.full))).length;
  const imp = ((L.requested && L.requested.imports) || []).length + IMPQ.length;
  const sec = ids * 1.2 + imp * 110 + (noId ? Math.min(400, 40 + noId * 1.5) : 0);
  return Math.max(2, Math.min(15, Math.ceil(sec / 60) + 1));
}
function render() {
  const el = $("tr_root"); if (!el || !L) return;
  const keep = {}; for (const id of ["tr_paste", "tr_src", "tr_iKid", "tr_iTag", "tr_iSrc"]) { const x = $(id); if (x) keep[id] = x.value; }
  const wasOpen = $("tr_addBox") ? $("tr_addBox").open : null;
  draw(el);
  for (const [id, v] of Object.entries(keep)) { const x = $(id); if (x && v) x.value = v; }
  if (wasOpen != null && $("tr_addBox")) $("tr_addBox").open = wasOpen;
}
function draw(el) {
  const ed = ED(), s = S(), srcs = [...new Set((L.players || []).map((p) => p.src || "").filter(Boolean))].sort();
  const lr = L.lastRun, rq = L.requested;
  const status = rq ? t("lookIng", { t: when(rq.at), n: estMin() }) : lr ? t("last", { t: when(lr.at), f: lr.found || 0, m: lr.multi || 0, x: lr.none || 0 }) + (lr.left ? " " + t("left", { n: lr.left }) : "") : t("never");
  const qd = uniqImp([...((rq && rq.imports) || []), ...(L.pendingImports || []), ...IMPQ]);
  el.innerHTML = `<div class="tr-set">${esc(t("group"))} <b>K${s.from}–K${s.to}</b> · ${esc(t("cap"))} <b>${s.cap}M</b> · ${esc(t("ordK"))}: ${s.invites} ${esc(t("q_invite"))} + ${s.open} ${esc(t("q_open"))} + ${s.special} ${esc(t("q_special"))}
      ${ed ? `<details class="tr-cfg"><summary>${esc(t("set"))}</summary><div class="tr-row">
        <label>${esc(t("from"))} <input class="inp tr-n" id="tr_sFrom" inputmode="numeric" value="${s.from}"></label><label>${esc(t("to"))} <input class="inp tr-n" id="tr_sTo" inputmode="numeric" value="${s.to}"></label>
        <label>${esc(t("capM"))} <input class="inp tr-n" id="tr_sCap" inputmode="decimal" value="${s.cap}"></label><label>${esc(t("q_invite"))} <input class="inp tr-n" id="tr_sInv" inputmode="numeric" value="${s.invites}"></label>
        <label>${esc(t("q_open"))} <input class="inp tr-n" id="tr_sOpen" inputmode="numeric" value="${s.open}"></label><label>${esc(t("q_special"))} <input class="inp tr-n" id="tr_sSp" inputmode="numeric" value="${s.special}"></label>
        <button type="button" class="btn small" id="tr_sOk">${esc(t("setOk"))}</button></div></details>` : ""}</div>
    ${quota()}<div class="muted tr-sm" style="margin:-4px 0 8px">${esc(t("qHint"))}</div>
    ${ed ? `<details class="tr-add" id="tr_addBox"${(L.players || []).length ? "" : " open"}><summary><b>${esc(t("addH"))}</b></summary>
      <textarea class="inp" id="tr_paste" rows="5" placeholder="${esc(t("pastePh"))}"></textarea>
      <div class="tr-row"><input class="inp" id="tr_src" placeholder="${esc(t("srcPh"))}" value="${esc(UI.lastSrc || "")}"><button type="button" class="btn" id="tr_addGo">${esc(t("addBtn"))}</button></div>
      <div class="tr-imp" id="tr_imp"><b>${esc(t("impH"))}</b><div class="tr-row"><input class="inp tr-n" id="tr_iKid" inputmode="numeric" placeholder="${esc(t("impKid"))}"><input class="inp tr-tag" id="tr_iTag" placeholder="${esc(t("impTag"))}" maxlength="8"><input class="inp" id="tr_iSrc" placeholder="${esc(t("srcPh"))}"><button type="button" class="btn" id="tr_iGo">${esc(t("impBtn"))}</button></div>
      ${qd.length ? `<div class="muted tr-sm">${esc(t("impQ", { l: qd.map((x) => `#${x.kid} [${x.tag}]`).join(", ") }))}</div>` : ""}</div></details>` : ""}
    <div class="tr-look">${ed ? `<button type="button" class="btn primary" id="tr_look"${rq ? " disabled" : ""}><b>${esc(t("look"))}</b> <span>${esc(t("lookSub", { n: estMin() }))}</span></button>${(L.players || []).some((p) => p.rf) ? ` <span class="muted tr-sm">${esc(t("rfWait", { n: (L.players || []).filter((p) => p.rf).length }))}</span>` : ""}` : ""}
      <span class="muted tr-sm" id="tr_status">${esc(status)}</span><button type="button" class="btn" id="tr_reload">${esc(t("reload"))}</button></div>
    ${ed && dirty() ? `<div class="tr-dirty"><button type="button" class="btn primary" id="tr_save">${esc(t("save"))}</button> <span class="muted tr-sm">${esc(t("unsaved"))}</span></div>` : ""}
    ${msg ? `<div class="muted tr-msg">${esc(msg)}</div>` : ""}
    <div class="tr-flt"><select class="inp" id="tr_fSrc"><option value="">${esc(t("allSrc"))}</option>${srcs.map((x) => `<option${UI.src === x ? " selected" : ""}>${esc(x)}</option>`).join("")}</select>
      <select class="inp" id="tr_fSt"><option value="">${esc(t("allSt"))}</option>${STS.map((v) => `<option value="${v}"${UI.st === v ? " selected" : ""}>${esc(t("st")[v])}</option>`).join("")}</select>
      <select class="inp" id="tr_fSort">${["pow", "mig", "mys", "tc", "kid", "name", "st"].map((k) => `<option value="${k}"${UI.sort === k ? " selected" : ""}>↕ ${esc(t("c_" + k))}</option>`).join("")}</select>
      <input type="search" class="inp" id="tr_q" placeholder="${esc(t("find"))}" value="${esc(UI.q || "")}">
      <span class="muted tr-sm" id="tr_cnt"></span>
      <span class="tr-exp">${ed ? `<button type="button" class="btn small" id="tr_rfall">${esc(t("rfAll", { n: shown().filter((p) => p.id).length }))}</button>` : ""}<button type="button" class="btn small" id="tr_copy">${esc(t("copy"))}</button><button type="button" class="btn small" id="tr_csv">${esc(t("csv"))}</button></span></div>
    <div id="tr_box"></div>
    <div class="muted tr-foot" id="tr_pass">${esc(t("passNote"))}<br>${esc(t("swNote"))}<br>${esc(t("powNote"))}</div>`;
  bind(el, ed);
  renderRows();
}
/* only the table (search / filter / sort / a row change) — the boxes above keep their text and focus */
function renderRows() {
  const box = $("tr_box"); if (!box || !L) return;
  const ed = ED(), rows = shown();
  box.innerHTML = table(rows, ed);
  $("tr_cnt").textContent = t("count", { n: rows.length, t: (L.players || []).length });
  bindRows(box, ed);
}
function bind(el, ed) {
  $("tr_fSrc").onchange = (e) => { UI.src = e.target.value; keepUI(); renderRows(); };
  $("tr_fSt").onchange = (e) => { UI.st = e.target.value; keepUI(); renderRows(); };
  $("tr_fSort").onchange = (e) => { UI.sort = e.target.value; UI.dir = ["name", "st"].includes(UI.sort) ? 1 : -1; keepUI(); renderRows(); };   // phones: sort without scrolling to the header (Sherry 2026-11-08)
  $("tr_q").oninput = (e) => { UI.q = e.target.value; renderRows(); };
  $("tr_reload").onclick = () => reload(true);
  if ($("tr_rfall")) $("tr_rfall").onclick = () => { for (const p of shown()) if (p.id && !p.rf) { p.rf = 1; mark(p.key, "rf"); } render(); };
  $("tr_copy").onclick = async () => { try { await navigator.clipboard.writeText(rowsText("\t")); $("tr_copy").textContent = t("copied"); } catch (e) {} };
  $("tr_csv").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + rowsText(",")], { type: "text/csv" })); a.download = `transfer-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); };
  if (!ed) return;
  $("tr_addGo").onclick = () => {
    const src = $("tr_src").value.trim().slice(0, 40); UI.lastSrc = src; keepUI();
    const lines = $("tr_paste").value.split(/\r?\n/).map(parseLine).filter(Boolean);
    if (!lines.length) { msg = t("noneRead"); return render(); }
    let n = 0, d = 0;
    for (const o of lines) {
      const dup = (L.players || []).find((p) => (o.id && String(p.id) === o.id) || (!o.id && o.name && norm(p.name) === norm(o.name) && (p.src || "") === src));
      if (dup) { d++; continue; }
      const p = { key: newKey(), id: o.id || null, name: o.name || "", src, status: "interested", slot: null, note: "", tc: o.tc || "", tcLv: o.tcLv ?? null, power: o.power ?? null, kid: o.kid ?? null, mp: null };
      L.players.push(p); ADDED.add(p.key); n++;
    }
    $("tr_paste").value = "";
    msg = t("added", { n, d }) + (n ? " " + t("unsaved") : ""); render();
  };
  $("tr_iGo").onclick = () => { const kid = +$("tr_iKid").value.replace(/\D/g, ""), tag = $("tr_iTag").value.trim(), src = $("tr_iSrc").value.trim().slice(0, 40) || `${tag} #${kid}`;
    if (!(kid > 0) || !/^[\p{L}\p{N}_\-\[\]]{1,8}$/u.test(tag)) { msg = t("impBad"); return render(); }
    if (!IMPQ.some((x) => x.kid === kid && x.tag.toLowerCase() === tag.toLowerCase())) IMPQ.push({ kid, tag, src });
    ["tr_iKid", "tr_iTag", "tr_iSrc"].forEach((id) => { $(id).value = ""; }); msg = t("unsaved"); render(); };
  if ($("tr_look")) $("tr_look").onclick = () => save(true);
  if ($("tr_save")) $("tr_save").onclick = () => save(false);
  if ($("tr_sOk")) $("tr_sOk").onclick = () => { const n = (id, lo, hi) => { const v = parseFloat($(id).value); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null; };
    const st = { from: n("tr_sFrom", 1, 9999), to: n("tr_sTo", 1, 9999), cap: n("tr_sCap", 1, 9999), invites: n("tr_sInv", 0, 999), open: n("tr_sOpen", 0, 999), special: n("tr_sSp", 0, 99) };
    for (const k in st) if (st[k] == null) delete st[k]; else if (k !== "cap") st[k] = Math.round(st[k]);
    L.settings = { ...S(), ...st }; if (L.settings.to < L.settings.from) [L.settings.from, L.settings.to] = [L.settings.to, L.settings.from]; SETCH = true; msg = t("unsaved"); render(); };
}
function bindRows(el, ed) {
  el.querySelectorAll("[data-sort]").forEach((b) => b.onclick = () => { const k = b.dataset.sort; if (UI.sort === k) UI.dir = -UI.dir; else { UI.sort = k; UI.dir = ["name", "src", "al", "note", "st", "slot"].includes(k) ? 1 : -1; } const fs = $("tr_fSort"); if (fs && [...fs.options].some((o) => o.value === k)) fs.value = k; keepUI(); renderRows(); });
  if (!ed) return;
  el.querySelectorAll("[data-sel]").forEach((x) => x.onchange = () => { if (x.checked) SEL.add(x.dataset.sel); else SEL.delete(x.dataset.sel); renderRows(); });
  const sa = el.querySelector("#tr_selAll"); if (sa) sa.onchange = () => { const rows = shown(); if (sa.checked) rows.forEach((p) => SEL.add(p.key)); else rows.forEach((p) => SEL.delete(p.key)); renderRows(); };
  const picked = () => (L.players || []).filter((p) => SEL.has(p.key));
  const done = (n) => { msg = t("bDone", { n }); render(); };
  const ba = el.querySelector("#tr_bAdd"); if (ba) ba.onclick = () => { const txt = (el.querySelector("#tr_bNote").value || "").trim(); if (!txt) return; const ps = picked();
    for (const p of ps) { const cur = String(p.note || ""); if (cur.includes(txt)) continue; p.note = (cur ? cur + " · " + txt : txt).slice(0, 80); mark(p.key, "note"); } done(ps.length); };
  const bs = el.querySelector("#tr_bSt"); if (bs) bs.onchange = () => { if (!bs.value) return; const ps = picked(); for (const p of ps) { p.status = bs.value; mark(p.key, "status"); } done(ps.length); };
  const bc = el.querySelector("#tr_bClr"); if (bc) bc.onclick = () => { SEL.clear(); renderRows(); };
  el.querySelectorAll("[data-st]").forEach((x) => x.onchange = () => { const p = P(x.dataset.st); if (!p) return; p.status = x.value; mark(p.key, "status"); render(); });
  el.querySelectorAll("[data-sl]").forEach((x) => x.onchange = () => { const p = P(x.dataset.sl); if (!p) return; p.slot = x.value || null; mark(p.key, "slot"); render(); });
  el.querySelectorAll("[data-note]").forEach((x) => x.onchange = () => { const p = P(x.dataset.note); if (!p) return; p.note = x.value.trim().slice(0, 80); mark(p.key, "note"); render(); });
  el.querySelectorAll("[data-id]").forEach((x) => x.onchange = () => { const p = P(x.dataset.id); if (!p) return; const v = x.value.replace(/\D/g, "") || null;
    if (String(v || "") === String(p.id || "")) return; p.id = v; delete p.cands; delete p.nf; if (p.mp && String(p.mp.pid) !== String(v)) p.mp = null; mark(p.key, "id"); mark(p.key, "cands"); mark(p.key, "mp"); render(); });
  el.querySelectorAll("[data-pks]").forEach((x) => x.onchange = () => { const p = P(x.dataset.pks); if (!p || x.value === "") return; const c = p.cands[+x.value]; if (!c) return;
    p.id = String(c.id); p.mp = { pid: String(c.id), name: c.name, kid: c.kid, alliance: c.alliance, power: c.power, migrant: c.migrant ?? null }; delete p.cands; mark(p.key, "id"); mark(p.key, "mp"); mark(p.key, "cands"); render(); });
  el.querySelectorAll("[data-rf]").forEach((b) => b.onclick = () => { const p = P(b.dataset.rf); if (!p) return; if (p.rf) delete p.rf; else p.rf = 1; mark(p.key, "rf"); render(); });
  el.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { const p = P(b.dataset.del); if (!p || !confirm(t("delQ", { n: p.name || p.id }))) return;
    L.players = L.players.filter((x) => x.key !== p.key); if (ADDED.has(p.key)) ADDED.delete(p.key); else REMOVED.add(p.key); CH.delete(p.key); render(); });
}
/* what the pasted list says differently from MightPulse: 0 name, 1 TC (main level only: TG1 = TG1-4), 2 power (> 5 %) */
function diffs(p) {
  const mp = p.mp || {}, out = [];
  if (!mp.pid && !mp.name) return out;
  if (mp.name && p.name && norm(mp.name) !== norm(p.name)) out.push(0);
  if (mp.tcLevel != null && p.tc && tcLabel(mp.tcLevel).split("-")[0].toUpperCase() !== String(p.tc).split("-")[0].toUpperCase()) out.push(1);
  if (mp.power && p.power && Math.abs(mp.power - p.power) / p.power > 0.05) out.push(2);
  return out;
}
function rowsText(sep) {
  const q = (v) => { const s = String(v ?? ""); return sep === "," && /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s.replace(/[\t\n]/g, " "); };
  const head = ["#", ...COLS.map((k) => t("c_" + k)), t("c_gName"), t("c_gTc"), t("c_gPow"), t("c_diff")];
  const rows = shown().map((p, i) => { const mp = p.mp || {}, mg = migOf(p);
    const v = { st: t("st")[p.status || "interested"], slot: t("sl")[p.slot || ""], name: mp.name || p.name || "", src: p.src || "", kid: mp.kid || p.kid || "", al: mp.alliance || "", id: p.id || "",
      tc: mp.tcLevel != null ? tcLabel(mp.tcLevel) : p.tc || "", pow: powOf(p) || "", mig: mg || "", pass: passes(mg) || "", sw: swOf(mg) || "", mys: mp.mystic ?? "", note: p.note || "" };
    const dif = diffs(p), w = t("dW");
    return [i + 1, ...COLS.map((k) => v[k]), p.name || "", p.tc || "", p.power || "", dif.map((x) => w[x]).join(", ")]; });
  return [head, ...rows].map((r) => r.map(q).join(sep)).join("\n");
}
/* 💾 save (and 🔎 = save with "requested"): start from the newest server copy, put this officer's changes on top */
async function save(ask) {
  if (!ED()) return;
  if (!OFFICER.token) { msg = t("noKey"); return render(); }
  const by = (OFFICER.user && OFFICER.user.name) || (() => { try { return localStorage.getItem("nxs-plan-by") || "?"; } catch (e) { return "?"; } })();
  msg = t("saving"); render();
  try {
    for (let attempt = 0; ; attempt++) {
      const f = await OFFICER.gh("GET", FILE, null, OFFICER.token);
      let srv = null; try { srv = f ? await OfficerData.open(JSON.parse(b64u8(f.content))) : null; } catch (e) {}
      absorb(srv);
      const next = { ...L, at: new Date().toISOString(), by };
      /* 🏰 alliance imports wait in pendingImports until 🔎; 🔎 = a new request (new time, so a run already going keeps it for the next run) */
      const pend = uniqImp([...((srv && srv.pendingImports) || []), ...IMPQ]);
      delete next.pendingImports;
      if (ask) next.requested = { at: new Date().toISOString(), by, imports: uniqImp([...((srv && srv.requested && srv.requested.imports) || []), ...pend]) };
      else if (pend.length) next.pendingImports = pend;
      try { await OFFICER.gh("PUT", FILE, { message: ask ? "🧳 Transfer list: look-up requested (encrypted)" : "🧳 Transfer list (encrypted)", content: u8b64(JSON.stringify(await OfficerData.seal(next)) + "\n"), sha: f ? f.sha : undefined, branch: OFFICER.repo.branch }, OFFICER.token);
        L = next; BASE = JSON.stringify(next); break; }
      catch (e) { if (e.message !== "busy" || attempt) throw e; }
    }
    CH.clear(); ADDED.clear(); REMOVED.clear(); SETCH = false; IMPQ = []; msg = t("saved");
    if (ask) poll();
  } catch (e) { msg = t(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  render();
}
async function reload(show) {
  try { const r = await readSrv(); absorb(r.d); if (show) msg = ""; } catch (e) { msg = t(e.message === "auth" ? "errAuth" : "errNet"); }
  render();
  if (L && L.requested) poll();
}
async function poll() {
  if (polling) return; polling = true;
  for (let i = 0; i < 40 && L && L.requested; i++) {   // up to ~30 minutes
    await new Promise((r) => setTimeout(r, 45000));
    if (document.hidden) continue;
    try { const r = await readSrv(), was = L.lastRun && L.lastRun.at;
      if (r.d && (!r.d.requested || (r.d.lastRun && r.d.lastRun.at !== was))) { absorb(r.d); render(); if (!L.requested) break; } } catch (e) {}
  }
  polling = false;
}
function applyTexts() { if ($("tr_title")) { $("tr_title").textContent = t("title"); $("tr_intro").textContent = t("intro"); } }
async function init() {
  applyTexts();
  const el = $("tr_root"); if (!el) return;
  if (!(window.OfficerData && OfficerData.ready && OfficerData.ready())) { el.innerHTML = `<div class="muted">${esc(t("locked"))}</div>`; return; }
  let r = { d: null }; try { r = await readSrv(); } catch (e) { msg = t("errAuth"); }
  absorb(r.d); render();
  if (L.requested) poll();
}
function setLang(l) { lang = l; applyTexts(); render(); }
OFFICER_PAGES.tr = { init, applyTexts, setLang, onShow: () => { if (L && !dirty()) reload(false); else render(); } };
OFFICER.trParse = parseLine;   // for tests
})();
