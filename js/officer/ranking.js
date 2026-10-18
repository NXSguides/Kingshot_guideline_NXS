/* NXS officer page — ranking tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.ranking) */
(function () {
const ROOT = document.getElementById('pg-ranking');
const DATA_URL = "data/roster-x7k2p9.json";
const T = { ko: {"colSp": "부대 전투력 (추정)", "colMigrant": "이주 점수", "spSrc": "근거: 이주 점수", "fbNote": "~ = 이주 점수 없음, 전투력/신비한 시련/도시 센터로 추정", "subTag": "후보", "title": "NXS 멤버 순위", "home": "홈", "weights": "① 순위 방식", "power": "총 전투력", "mystic": "신비한 시련", "weightNote": "성검 쟁탈 군단 화면의 부대 전투력. 연맹원 98명 전원을 MightPulse와 대조한 결과 게임의 「이전 점수(Migrant Score)」가 거의 정확히 부대 전투력 × 317이라서, 여기서는 부대 전투력 ≈ 이전 점수 ÷ 323을 씁니다 (평균 오차 1.7%, 상위 20명 전원, 상위 40명 중 39명 일치). 이전 점수가 없는 사람(~ 표시)은 2.70 × 전투력(M) + 0.5 × 신비한 시련 + 8.7 × 도시 레벨 − 296 (오차 약 6.5%). 정확한 값은 게임의 군단 화면이 기준.", "pick": "② 이번 이벤트 참가자 체크", "all": "전체 선택", "none": "선택 해제", "paste": "신청 명단을 붙여넣어 한 번에 체크", "pasteNote": "한 줄에 이름 하나(또는 쉼표로 구분). ♛ 같은 장식과 Nexus 태그는 생략해도 되고, 대소문자는 상관없습니다. (?)는 여러 명이 일치한다는 뜻이니 직접 체크하세요.", "pasteGo": "이 플레이어들 체크", "pasteOk": "{n}명을 체크했습니다.", "pasteMiss": "찾을 수 없음: {list}", "search": "이름 검색…", "colName": "이름", "colRank": "등급", "colTc": "TC", "colActive": "마지막 접속", "rest": "나머지 전원", "events": "④ 이벤트 조 편성", "eventsNote": "위 순위(가중 점수가 높은 순)에 따라 조를 나눕니다.", "n": "{n}명", "result": "③ 순위", "copy": "결과 복사", "copied": "복사했어요!", "colScore": "부대 전투력(추정)", "scoreNote": "추정 부대 전투력, 공식은 ① 참고. ~ = 이주 점수 없음, 보조 공식이라 덜 정확. 후보도 함께 순위에 나오고 표시되지만 ④ 조 편성과 ⑤ 전투 배치표에는 들어가지 않아요.", "empty": "아직 체크한 사람이 없습니다.", "selected": "{n} / {t}명 선택", "subN": "(후보 {k}명 포함)", "sub": "후보", "colMain": "주전", "subHint": "왼쪽 체크＝주전, 오른쪽 체크＝후보: 후보는 순위에서 빠지고 출석 탭에 후보로 들어갑니다.", "updated": "데이터 업데이트: {t} ({ago})", "members": "멤버 {n}명", "noData": "아직 데이터가 없습니다. GitHub → Actions → “Update Roster (MightPulse)” → Run workflow를 실행한 뒤 이 페이지를 새로고침하세요.", "ago": {"now": "방금", "m": "{n}분 전", "h": "{n}시간 전", "d": "{n}일 전"}, "onlyTicked": "체크한 사람만", "topN": "③ 상위만 표시", "topNAll": "전체", "modeSp": "부대 전투력 추정 (Squad Power fit)", "modeW": "비중 (항목 직접 선택)", "wNote": "계산에 넣을 항목을 체크하고 비중을 적으세요. 합이 100%가 아니어도 자동으로 비율 환산됩니다.", "colScoreW": "점수", "scoreNoteW": "점수: 체크한 항목마다 체크된 인원 중 최고값 = 100으로 환산한 뒤 비중대로 합산. 값이 없으면 0 (? 표시). 후보도 함께 순위에 나오고 표시되지만 ④ 조 편성과 ⑤ 전투 배치표에는 들어가지 않아요."},
 ar: {"colSp": "قوة الفرقة (تقديري)", "colMigrant": "نقاط الهجرة", "spSrc": "الأساس: نقاط الهجرة", "fbNote": "~ = لا توجد نقاط هجرة، تقدير من القوة / الاختبارات الغامضة / مركز المدينة", "subTag": "بديل", "title": "ترتيب أعضاء NXS", "home": "الرئيسية", "weights": "① طريقة الترتيب", "power": "إجمالي القوة", "mystic": "الاختبارات الغامضة", "weightNote": "قوة الفرقة في شاشة الكتيبة في مواجهة أرض السيوف. بمقارنة كل الأعضاء الـ98 مع MightPulse تبيّن أن «نقاط الهجرة» في اللعبة تساوي تقريبًا قوة الفرقة × 317، لذا نستخدم: قوة الفرقة ≈ نقاط الهجرة ÷ 323 (متوسط الخطأ 1.7%، أقوى 20 كلهم صحيحون، 39 من أقوى 40). من لا نقاط هجرة له (علامة ~) يُستخدم له 2.70 × القوة(M) + 0.5 × الاختبارات الغامضة + 8.7 × مستوى المدينة − 296 (خطأ نحو 6.5%). الرقم الحقيقي في شاشة الكتيبة داخل اللعبة.", "pick": "② حدّد المشاركين في هذه الفعالية", "all": "تحديد الكل", "none": "مسح", "paste": "الصق قائمة تسجيل لتحديدهم دفعة واحدة", "pasteNote": "اسم واحد في كل سطر (أو مفصولة بفواصل). يمكن حذف الزخارف مثل ♛ ووسم Nexus؛ حالة الأحرف لا تهم. (?) تعني أن عدة لاعبين مطابقون — حدّد الصحيح يدويًا.", "pasteGo": "حدّد هؤلاء اللاعبين", "pasteOk": "تم تحديد {n} لاعبين.", "pasteMiss": "غير موجود: {list}", "search": "ابحث عن اسم…", "colName": "الاسم", "colRank": "الرتبة", "colTc": "مركز البلدة", "colActive": "آخر ظهور", "rest": "كل الباقين", "events": "④ مجموعات الفعالية", "eventsNote": "تتبع المجموعات الترتيب أعلاه (الأعلى نقاطًا موزونة أولًا).", "n": "{n}", "result": "③ الترتيب", "copy": "نسخ النتيجة", "copied": "تم النسخ!", "colScore": "قوة الفرقة (تقدير)", "scoreNote": "قوة الفرقة التقديرية، المعادلة في ①. ~ = لا توجد نقاط هجرة، معادلة احتياطية أقل دقة. البدلاء يظهرون في الترتيب مع علامة، لكن لا يدخلون مجموعات ④ ولا جدول المعركة ⑤.", "empty": "لم يُحدَّد أحد بعد.", "selected": "تم تحديد {n} / {t}", "subN": "(منهم {k} بدلاء)", "sub": "بديل", "colMain": "أساسي", "subHint": "المربع الأيسر = أساسي، الأيمن = بديل: البدلاء لا يدخلون الترتيب ويُستوردون كبدلاء في تبويب الحضور.", "updated": "تحديث البيانات: {t} ({ago})", "members": "{n} عضو", "noData": "لا توجد بيانات بعد. اذهب إلى GitHub ← Actions ← “Update Roster (MightPulse)” ← Run workflow، ثم أعد تحميل هذه الصفحة.", "ago": {"now": "الآن", "m": "قبل {n} دقيقة", "h": "قبل {n} ساعة", "d": "قبل {n} يوم"}, "onlyTicked": "المحددون فقط", "topN": "③ عرض الأوائل فقط", "topNAll": "الكل", "modeSp": "تقدير قوة الفرقة (Squad Power fit)", "modeW": "الأوزان (اختر القيم)", "wNote": "حدّد القيم التي تُحتسب وأعطِ كلًّا منها وزنًا؛ لا يلزم أن يكون المجموع 100%، تُحوَّل تلقائيًا.", "colScoreW": "النقاط", "scoreNoteW": "النقاط: كل قيمة محددة تُقاس بحيث الأعلى بين المحددين = 100، ثم تُجمع حسب الأوزان. القيمة المفقودة = 0 (علامة ?). البدلاء يظهرون في الترتيب مع علامة، لكن لا يدخلون مجموعات ④ ولا جدول المعركة ⑤."},
 pt: {"colSp": "Poder do esquadrão (est.)", "colMigrant": "Pontuação de migração", "spSrc": "Base: pontuação de migração", "fbNote": "~ = sem pontuação de migração, estimado por Poder / Prova Mística / CC", "subTag": "res", "title": "Ranking da lista NXS", "home": "Início", "weights": "① Método de ranking", "power": "Poder total", "mystic": "Prova Mística", "weightNote": "O Poder do Esquadrão da tela da Legião do Confronto entre Espadas. Comparando os 98 membros com o MightPulse, a Pontuação de Migração do jogo é quase exatamente Poder do Esquadrão × 317, então usamos SP ≈ Pontuação de Migração ÷ 323 (erro médio 1,7%, 20/20 do top 20, 39/40 do top 40). Quem não tem Pontuação de Migração (marcado ~) usa 2,70 × Poder(M) + 0,5 × Prova Mística + 8,7 × CC − 296, erro de ~6,5%. O número real está na tela da Legião no jogo.", "pick": "② Marque os participantes deste evento", "all": "Marcar todos", "none": "Limpar", "paste": "Colar uma lista de inscritos para marcar de uma vez", "pasteNote": "Um nome por linha (ou separados por vírgula). Enfeites como ♛ e a tag Nexus podem ficar de fora; maiúsculas não importam. (?) significa que vários jogadores combinam — marque esse à mão.", "pasteGo": "Marcar esses jogadores", "pasteOk": "{n} jogadores marcados.", "pasteMiss": "Não encontrado: {list}", "search": "Buscar um nome…", "colName": "Nome", "colRank": "Cargo", "colTc": "CC", "colActive": "Último acesso", "rest": "todos os restantes", "events": "④ Grupos do evento", "eventsNote": "Os grupos seguem o ranking acima (maior pontuação ponderada primeiro).", "n": "{n}", "result": "③ Ranking", "copy": "Copiar resultado", "copied": "Copiado!", "colScore": "Poder do Esquadrão (est.)", "scoreNote": "Poder do esquadrão estimado, fórmula em ①. ~ = sem pontuação de migração, fórmula reserva, menos precisa. Reservas entram no ranking marcados, mas ficam fora dos grupos ④ e da tabela de batalha ⑤.", "empty": "Ninguém marcado ainda.", "selected": "{n} / {t} marcados", "subN": "(incl. {k} reservas)", "sub": "res", "colMain": "titular", "subHint": "Caixa da esquerda = titular, da direita = reserva: reservas ficam fora do ranking e entram como reserva na aba Presença.", "updated": "Dados atualizados: {t} ({ago})", "members": "{n} membros", "noData": "Ainda não há dados. Vá ao GitHub → Actions → “Update Roster (MightPulse)” → Run workflow e depois recarregue esta página.", "ago": {"now": "agora mesmo", "m": "há {n} min", "h": "há {n} h", "d": "há {n} d"}, "onlyTicked": "Só os marcados", "topN": "③ Mostrar só os primeiros", "topNAll": "todos", "modeSp": "Estimativa de Poder do Esquadrão (Squad Power fit)", "modeW": "Pesos (escolha os valores)", "wNote": "Marque os valores que contam e dê um peso a cada; não precisam somar 100%, são ajustados automaticamente.", "colScoreW": "Pontuação", "scoreNoteW": "Pontuação: cada valor marcado é escalado para que o maior entre os marcados = 100, depois combinado pelos pesos. Valor ausente = 0 (marcado ?). Reservas entram no ranking marcados, mas ficam fora dos grupos ④ e da tabela de batalha ⑤."},

  zh: {
    colSp: "部隊戰力（估）", colMigrant: "遷城分數", spSrc: "依據：遷城分數", fbNote: "~ = 沒有遷城分數，改用戰力／秘境／主城估", subTag: "替補",
    title: "NXS 成員排序", home: "回主頁", weights: "① 排序方式", power: "總戰力", mystic: "秘境試煉",
    modeSp: "部隊戰力估算（Squad Power fit）", modeW: "占比（自己選要看哪幾項）", wNote: "勾選要算進去的項目並填占比，加起來不用剛好 100%，會自動按比例換算。", colScoreW: "分數", scoreNoteW: "分數算法：勾選的每一項各自以「這次勾選的人裡面最高的那個 = 100」換算，再依占比加總。沒有數字的人那一項以 0 計，標 ?。替補一起排序並標出來，但不放進 ④ 分組和 ⑤ 戰鬥表。",
    weightNote: "聖劍爭奪 Legion 畫面上的部隊戰力。用全聯盟 98 人的實際數字對過 MightPulse 的資料後發現：遊戲的「遷城分數」幾乎就是部隊戰力 × 317，所以這裡用 部隊戰力 ≈ 遷城分數 ÷ 323（平均誤差 1.7%，前 20 名全中、前 40 名中 39 個）。沒有遷城分數的人（標 ~）改用 2.70 × 總戰力(M) + 0.5 × 秘境分數 + 8.7 × 主城等級 − 296，誤差約 6.5%。正確數字以遊戲裡的 Legion 畫面為準。",
    onlyTicked: "只顯示勾選的人", topN: "③ 只列前幾名", topNAll: "全部",
    pick: "② 勾選這次參戰的人", all: "全選", none: "全部取消",
    paste: "貼上報名名單一次勾選", pasteNote: "一行一個名字（或用逗號分隔）。名字前後的符號和 Nexus 標記可以省略，大小寫沒關係。標 (?) 的表示有好幾個人符合，請手動勾選。",
    pasteGo: "勾選這些人", pasteOk: "已勾選 {n} 人。", pasteMiss: "找不到：{list}",
    search: "搜尋名字…", colName: "名字", colRank: "階級", colTc: "主城", colActive: "上次上線",
    rest: "剩下的人", events: "④ 活動分組", eventsNote: "依上面的排序結果（加權分數高到低）分組。", n: "{n} 人",
    result: "③ 排序結果", copy: "複製結果", copied: "已複製！", colScore: "部隊戰力（估）",
    scoreNote: "估計部隊戰力，公式見 ①。~ = 沒有遷城分數，用備用公式，比較不準。替補一起排序並標出來，但不放進 ④ 分組和 ⑤ 戰鬥表。",
    empty: "還沒勾選任何人。", selected: "已選 {n} / {t} 人", subN: "（含替補 {k}）", sub: "替補", colMain: "正式", subHint: "左邊勾＝正式，右邊勾＝替補：替補不進排序，出席分頁會標成替補。",
    updated: "資料更新：{t}（{ago}）", members: "{n} 名成員",
    noData: "還沒有資料。請到 GitHub → Actions → 「Update Roster (MightPulse)」→ Run workflow，跑完後重新整理這頁。",
    ago: { now: "剛剛", m: "{n} 分鐘前", h: "{n} 小時前", d: "{n} 天前" },
  },
  en: {
    colSp: "Squad Power (est.)", colMigrant: "Migrant Score", spSrc: "Based on: Migrant Score", fbNote: "~ = no Migrant Score, estimated from Power / Mystic / TC", subTag: "sub",
    title: "NXS Roster Ranking", home: "Home", weights: "① Ranking method", power: "Total Power", mystic: "Mystic Trial",
    modeSp: "Squad Power fit", modeW: "Weights (pick the stats)", wNote: "Tick the stats to count and give each a weight; they don't have to add up to 100%, they're scaled to it.", colScoreW: "Score", scoreNoteW: "Score: each ticked stat is scaled so the highest among the ticked players = 100, then combined by the weights. A missing value counts as 0 (marked ?). Subs are ranked and marked, but left out of ④ groups and the ⑤ battle table.",
    weightNote: "The Squad Power shown on the Swordland Legion screens. Checking all 98 members against MightPulse showed the game's Migrant Score is almost exactly Squad Power × 317, so this uses SP ≈ Migrant Score ÷ 323 (mean error 1.7%, 20/20 of the top 20, 39/40 of the top 40). Members with no Migrant Score (marked ~) fall back to 2.70 × Power(M) + 0.5 × Mystic Trial + 8.7 × TC − 296, about 6.5% error. The in-game Legion screen is the real number.",
    onlyTicked: "Only ticked", topN: "③ Show top", topNAll: "all",
    pick: "② Tick this event's participants", all: "Select all", none: "Clear",
    paste: "Paste a sign-up list to tick at once", pasteNote: "One name per line (or comma-separated). Decorations like ♛ and the Nexus tag can be left out; case doesn't matter. (?) means several players match — tick that one by hand.",
    pasteGo: "Tick these players", pasteOk: "Ticked {n} players.", pasteMiss: "Not found: {list}",
    search: "Search a name…", colName: "Name", colRank: "Rank", colTc: "TC", colActive: "Last online",
    rest: "everyone left", events: "④ Event groups", eventsNote: "Groups follow the ranking above (highest weighted score first).", n: "{n}",
    result: "③ Ranking", copy: "Copy result", copied: "Copied!", colScore: "Squad Power (est.)",
    scoreNote: "Estimated Squad Power, formula in ①. ~ = no Migrant Score, fallback formula, less accurate. Subs are ranked and marked, but left out of ④ groups and the ⑤ battle table.",
    empty: "Nobody ticked yet.", selected: "{n} / {t} selected", subN: "(incl. {k} subs)", sub: "sub", colMain: "main", subHint: "Left box = starter, right box = substitute: subs are not ranked and are imported as subs by the Attendance tab.",
    updated: "Data updated: {t} ({ago})", members: "{n} members",
    noData: "No data yet. Go to GitHub → Actions → “Update Roster (MightPulse)” → Run workflow, then reload this page.",
    ago: { now: "just now", m: "{n} min ago", h: "{n} h ago", d: "{n} d ago" },
  },
};
/* ---- Event presets: add a new event by copying one entry. count: null = everyone left ---- */
const PRESETS = [
  { id: "swordland", emoji: "⚔️", name: { en: "Swordland Showdown", zh: "聖劍爭奪" }, img: "figures/SS_map.webp",   // map shown next to the groups
    groups: [
      { name: { en: "Attackers", zh: "攻擊者" }, count: 4 },
      { name: { en: "Defenders", zh: "防守者" }, count: 6 },
      { name: { en: "Joiners", zh: "參與者" }, count: null },
    ] },
];
const LS = "nxs-roster-v2";
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} planTouched(); };

/* one language for all officer tabs (set from the main site when you enter, and by the language button on any tab) */
let lang = OFFICER.lang;
let data = null, sortKey = store.sortKey || "rank", sortDir = store.sortDir || -1;
let picked = new Set(store.picked || []);
let subs = new Set(store.subs || []);   // 備取 substitutes: ticked, but on the bench (not ranked, imported as "sub" by the 📋 Attendance tab)
let wPower = store.wPower ?? 40;
/* ① weights mode: which stats count and how much (old plans only had power / mystic → wPower) */
const STATS = ["power", "mystic", "tc", "migrant"];
const wtsFrom = (o, wp) => { const w = {}; if (o && typeof o === "object") for (const k of STATS) if (+o[k] > 0) w[k] = Math.min(100, Math.round(+o[k])); if (!Object.keys(w).length) { const p = wp ?? 40; if (p > 0) w.power = p; if (100 - p > 0) w.mystic = 100 - p; } return w; };
let wts = wtsFrom(store.wts, store.wPower);

const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const tr = (k, vars = {}) => String(k.split(".").reduce((o, x) => o && o[x], T[lang]) ?? k.split(".").reduce((o, x) => o && o[x], T.en) ?? k).replace(/\{(\w+)\}/g, (m, v) => vars[v] ?? m);
const esc = OFFICER.util.esc;
const big = (n) => n == null ? "?" : n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);
const toMs = (v) => v == null ? null : (typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v));
function ago(v) {
  const ms = toMs(v); if (!ms) return "?";
  const s = (Date.now() - ms) / 1000;
  if (s < 60) return tr("ago.now");
  if (s < 3600) return tr("ago.m", { n: Math.floor(s / 60) });
  if (s < 86400) return tr("ago.h", { n: Math.floor(s / 3600) });
  return tr("ago.d", { n: Math.floor(s / 86400) });
}
const rankNum = (m) => { const r = String(m.rank || ""); if (/leader|r5/i.test(r)) return 5; const n = r.match(/\d/); return n ? Number(n[0]) : 0; };
const rankLabel = (m) => rankNum(m) ? "R" + rankNum(m) : (m.rank || "?");
const norm = (s) => String(s || "").trim().toLowerCase();
// name without decorations (♛, superscript "Nexus" tag, spaces, symbols) — for matching pasted names
const core = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/nexus/g, "").replace(/[^\p{L}\p{N}]/gu, "");

function applyTexts() {
  document.documentElement.lang = HTML_LANG(lang);
  ROOT.querySelectorAll("[data-t]").forEach((el) => { el.textContent = tr(el.dataset.t); });
  $("rk_q").placeholder = tr("search"); $("rk_topN").value = topN || ""; $("rk_topN").placeholder = tr("topNAll");
  $("rk_mode").innerHTML = `<option value="sp">${esc(tr("modeSp"))}</option><option value="w">${esc(tr("modeW"))}</option>`; $("rk_mode").value = mode;
  $("rk_wRow").hidden = mode !== "w"; $("rk_spNote").hidden = mode === "w"; $("rk_wNote").hidden = mode !== "w";
  ROOT.querySelectorAll("[data-t=colScore]").forEach((el) => { el.textContent = tr(mode === "w" ? "colScoreW" : "colScore"); });
  ROOT.querySelector("[data-t=scoreNote]").textContent = tr(mode === "w" ? "scoreNoteW" : "scoreNote");
  if (data) $("rk_meta").textContent = `${data.alliance?.tag ? "[" + data.alliance.tag + "] " : ""}${tr("members", { n: data.members.length })} · ${tr("updated", { t: new Date(data.updated).toLocaleString(LOCALE(lang)), ago: ago(data.updated) })}`;
  $("rk_noData").textContent = tr("noData");
}

function renderList() {
  const q = norm($("rk_q").value), only = $("rk_onlyTicked").checked;
  const rows = data.members
    .filter((m) => !only || picked.has(m.id))
    .filter((m) => !q || norm(m.name).includes(q) || core(m.name).includes(core(q)))
    .sort((a, b) => {
      if (sortKey === "rank") return sortDir * (rankNum(a) - rankNum(b)) || (b.power || 0) - (a.power || 0);
      let x = sortKey === "sp" || sortKey === "migrant" ? statOf(a, sortKey) : a[sortKey], y = sortKey === "sp" || sortKey === "migrant" ? statOf(b, sortKey) : b[sortKey];
      if (sortKey === "lastActive") { x = toMs(x) || 0; y = toMs(y) || 0; }
      if (typeof x === "string" || typeof y === "string") return sortDir * String(x ?? "").localeCompare(String(y ?? ""));
      return sortDir * ((x ?? -1) - (y ?? -1));
    });
  let lastRank = null;
  $("rk_list").innerHTML = rows.map((m) => {
    let head = "";
    if (sortKey === "rank" && rankNum(m) !== lastRank) {
      lastRank = rankNum(m);
      const grp = rows.filter((x) => rankNum(x) === lastRank);
      const on = grp.filter((x) => picked.has(x.id)).length;
      head = `<tr class="grp" data-r="${lastRank}"><td class="ck main"><input type="checkbox" tabindex="-1" ${on === grp.length ? "checked" : ""}></td><td class="ck"></td><td colspan="7"><b>${esc(rankLabel(m))}</b> <span class="muted">· ${on} / ${grp.length}</span></td></tr>`;
    }
    return head + `
    <tr class="member${picked.has(m.id) ? " on" : ""}${subs.has(m.id) ? " is-sub" : ""}" data-id="${m.id}">
      <td class="ck main"><input type="checkbox" ${picked.has(m.id) && !subs.has(m.id) ? "checked" : ""} tabindex="-1" aria-label="${esc(tr("colMain"))}"></td>
      <td class="ck"><input type="checkbox" class="ck-sub" ${subs.has(m.id) ? "checked" : ""} tabindex="-1" aria-label="${esc(tr("sub"))}"></td>
      <td class="name" dir="auto">${esc(m.name)}</td>
      <td>${esc(rankLabel(m))}</td>
      <td class="num">${m.tc ?? "?"}</td>
      <td class="num">${big(m.power)}</td>
      <td class="num">${big(m.mystic)}</td>
      <td class="num">${fmtStat(m, "sp")}</td>
      <td class="num">${migrantOf(m) ? big(migrantOf(m)) : '<span class="muted">—</span>'}</td>
    </tr>`;
  }).join("");
  const k = [...picked].filter((id) => subs.has(id)).length;
  $("pickCount").textContent = tr("selected", { n: picked.size, t: data.members.length }) + (k ? " " + tr("subN", { k }) : "");
  ROOT.querySelectorAll("th[data-sort]").forEach((th) => {
    th.textContent = tr(th.dataset.t) + (th.dataset.sort === sortKey ? (sortDir < 0 ? " ▼" : " ▲") : "");
  });
  renderWeights();
  $("rk_thMain").textContent = tr("colMain"); $("rk_thSub").textContent = tr("sub"); $("rk_thSub").title = tr("subHint");
}

const SP_FIT = OFFICER.SP_FIT, migrantOf = OFFICER.migrantOf, squadPower = OFFICER.squadPower, spIsFallback = OFFICER.spIsFallback;   // formula: core.js
const statOf = (m, k) => k === "migrant" ? (migrantOf(m) || null) : k === "sp" ? squadPower(m) : m[k];
const statLabel = (k) => tr({ power: "power", mystic: "mystic", tc: "colTc", migrant: "colMigrant", sp: "colSp" }[k]);
const fmtStat = (m, k) => { const v = statOf(m, k); if (v == null || v === 0 && k !== "tc") return '<span class="warn">?</span>'; return k === "tc" ? String(v) : k === "sp" ? (spIsFallback(m) ? "~" : "") + Math.round(v) : big(v); };
let topN = store.topN || 0;   // ③ show only the first N of the ranking (0 = all)
let mode = store.mode || "sp";   // "sp" = Squad Power fit · "w" = the old power/mystic weights (still there to compare)
/* all = ignore "show top N"; withSubs = also the substitutes (shown in ③, marked) — ④ groups and ⑤ table use starters only */
function ranking(all, withSubs) {
  const everyone = data.members.filter((m) => picked.has(m.id)), sel = everyone.filter((m) => withSubs || !subs.has(m.id));
  const ks = Object.keys(wts).filter((k) => wts[k] > 0), tot = ks.reduce((a, k) => a + wts[k], 0) || 1;
  // the top of each stat = 100, counted over starters AND subs, so the scores in ③ and ④ are the same numbers
  const max = Object.fromEntries(ks.map((k) => [k, Math.max(1, ...everyone.map((m) => +statOf(m, k) || 0))]));
  const score = (m) => mode === "w" ? 100 * ks.reduce((a, k) => a + wts[k] / tot * (+statOf(m, k) || 0) / max[k], 0) : squadPower(m);
  const r = sel.map((m) => ({ ...m, score: score(m), isSub: subs.has(m.id) })).sort((a, b) => b.score - a.score);
  return !all && topN > 0 ? r.slice(0, topN) : r;
}
const resultCols = () => mode === "w" ? Object.keys(wts).filter((k) => wts[k] > 0) : ["migrant"];

function renderResult() {
  setTimeout(renderPresets, 0);
  setTimeout(() => { if (typeof tbRender === "function") tbRender(); }, 0);
  const r = ranking(false, true), cols = resultCols();
  $("resultHead").innerHTML = `<th class="num">#</th><th>${esc(tr("colName"))}</th><th class="num">${esc(tr(mode === "w" ? "colScoreW" : "colScore"))}</th>` +
    cols.map((k) => `<th class="num">${esc(statLabel(k))}${mode === "w" ? ` <span class="muted">${Math.round(wts[k] / (cols.reduce((a, c) => a + wts[c], 0) || 1) * 100)}%</span>` : ""}</th>`).join("");
  let n = 0;
  $("result").innerHTML = r.length ? r.map((m) => `
    <tr${m.isSub ? ' class="rk-subrow"' : ""}>
      <td class="num">${m.isSub ? "" : ++n}</td>
      <td class="name"><span dir="auto">${esc(m.name)}</span>${m.isSub ? ` <span class="rk-subtag">${esc(tr("subTag"))}</span>` : ""}<div style="font-size:12px;opacity:.65;font-variant-numeric:tabular-nums;user-select:all">ID ${esc(m.id)}</div></td>
      <td class="num">${mode !== "w" && spIsFallback(m) ? "~" : ""}${m.score.toFixed(mode === "w" ? 1 : 0)}<span class="bar" style="width:${Math.round(mode === "w" ? m.score * 0.6 : m.score / 20)}px"></span></td>
      ${cols.map((k) => `<td class="num">${fmtStat(m, k)}</td>`).join("")}
    </tr>`).join("") : `<tr><td colspan="${3 + cols.length}" class="empty">${tr("empty")}</td></tr>`;
}

let activePreset = null;
// group sizes the user typed, remembered per event (falls back to the preset's default)
function groupCount(pr, gi) {
  const v = store.counts?.[pr.id]?.[gi];
  return v == null ? pr.groups[gi].count : v;
}
function presetGroups(pr) {
  const r = ranking(true); let i = 0;
  return pr.groups.map((g, gi) => {
    const c = g.count == null ? null : groupCount(pr, gi);
    const take = c == null ? r.slice(i) : r.slice(i, i + c); i += take.length; return { g, list: take };
  });
}
function renderCounts() {
  const pr = PRESETS.find((x) => x.id === activePreset);
  if (!pr) { $("presetCounts").innerHTML = ""; return; }
  $("presetCounts").innerHTML = pr.groups.map((g, gi) => g.count == null
    ? `<span class="muted">${esc(g.name[lang] || ptOf(g.name.en))}: ${tr("rest")}</span>`
    : `<label class="w">${esc(g.name[lang] || ptOf(g.name.en))}<input type="number" min="0" max="99" step="1" data-gi="${gi}" value="${groupCount(pr, gi)}"></label>`).join("");
}
function renderPresets() {
  $("presetBtns").innerHTML = PRESETS.map((pr) =>
    `<button class="btn${activePreset === pr.id ? " on" : ""}" data-p="${pr.id}">${pr.emoji} ${esc(pr.name[lang] || ptOf(pr.name.en))}</button>`).join("");
  const pr = PRESETS.find((x) => x.id === activePreset);
  $("presetCopy").hidden = !pr;
  if (!document.activeElement || !document.activeElement.closest("#presetCounts")) renderCounts();
  if (!pr) { $("presetOut").innerHTML = ""; return; }
  const pic = pr.img ? `<a class="grp-img" href="${pr.img}" target="_blank" rel="noopener"><img src="${pr.img}" alt="${esc(pr.name[lang] || pr.name.en)}" loading="lazy"></a>` : "";
  if (!picked.size) { $("presetOut").innerHTML = `<p class="empty">${tr("empty")}</p>` + pic; return; }
  $("presetOut").innerHTML = `<div class="grp-wrap"><div class="grp-out">` + presetGroups(pr).map(({ g, list }) => `
    <h3>${esc(g.name[lang] || ptOf(g.name.en))} <span class="muted">(${tr("n", { n: list.length })})</span></h3>
    ${list.length ? `<ol>${list.map((m) => `<li dir="auto">${esc(m.name)} <span class="muted">· ${m.score.toFixed(mode === "w" ? 1 : 0)}</span></li>`).join("")}</ol>` : `<div class="muted">—</div>`}`).join("") + `</div>${pic}</div>`;
}
function renderAll() { applyTexts(); renderList(); renderResult(); }
function persist() { store.wts = wts; store.picked = [...picked]; store.subs = [...picked].filter((id) => subs.has(id)); store.wPower = wPower; store.topN = topN; store.mode = mode; store.sortKey = sortKey; store.sortDir = sortDir; store.lang = lang; save(); }

function renderWeights() {
  if (!$("rk_wRow") || (document.activeElement && document.activeElement.closest && document.activeElement.closest("#rk_wRow"))) return;
  $("rk_wRow").innerHTML = STATS.map((k) => `<label class="w"><input type="checkbox" data-wk="${k}" ${wts[k] > 0 ? "checked" : ""}> ${esc(statLabel(k))}<input type="number" data-wv="${k}" min="0" max="100" step="5" value="${wts[k] > 0 ? wts[k] : ""}" ${wts[k] > 0 ? "" : "disabled"} style="width:62px"> %</label>`).join("");
}
function setWeights(w) {
  wts = wtsFrom(w);
  wPower = Math.round((wts.power || 0) / (Object.values(wts).reduce((a, b) => a + b, 0) || 1) * 100);   // kept for older copies of the page
  renderWeights(); persist(); renderResult();
}

async function init() {
  applyTexts();
  try {
    // the copy remembered in this tab shows at once; a newer one replaces it when it arrives
    data = await OfficerData.fetchJsonFast(DATA_URL, (d) => { data = d; renderAll(); });
    if (!data) throw 0;
  } catch (e) { $("rk_noData").hidden = false; return; }
  // drop picks of players who left the alliance
  const ids = new Set(data.members.map((m) => m.id));
  picked = new Set([...picked].filter((id) => ids.has(id)));
  $("rk_app").hidden = false;
  setWeights(wts);
  renderAll();
  plansInit();
}

function setLang(l) { lang = l; persist(); if (data) renderAll(); else applyTexts(); };
$("rk_q").oninput = renderList;
$("rk_onlyTicked").onchange = renderList;
$("rk_wRow").addEventListener("change", (e) => {
  const k = e.target.dataset.wk; if (!k) return;
  const w = { ...wts }; if (e.target.checked) w[k] = w[k] || 20; else delete w[k];
  if (!Object.keys(w).length) { e.target.checked = true; return; }   // at least one stat
  setWeights(w);
});
$("rk_wRow").addEventListener("input", (e) => { const k = e.target.dataset.wv; if (!k) return; const v = Math.max(0, Math.min(100, Math.round(+e.target.value || 0))); if (!v) return; wts = { ...wts, [k]: v }; wPower = wts.power || 0; persist(); renderResult(); });
$("rk_mode").onchange = (e) => { mode = e.target.value; persist(); applyTexts(); renderResult(); };
$("rk_topN").oninput = (e) => { topN = Math.max(0, Math.round(Number(e.target.value) || 0)); persist(); renderResult(); };
$("rk_list").onclick = (e) => {
  const g = e.target.closest("tr.grp");
  if (g) {
    const r = Number(g.dataset.r), q = norm($("rk_q").value);
    const grp = data.members.filter((m) => rankNum(m) === r && (!q || norm(m.name).includes(q)));
    const all = grp.every((m) => picked.has(m.id));
    grp.forEach((m) => all ? picked.delete(m.id) : picked.add(m.id));
    persist(); renderList(); renderResult(); return;
  }
  const row = e.target.closest("tr.member"); if (!row) return;
  const id = Number(row.dataset.id) || row.dataset.id;
  if (e.target.closest("td.ck:not(.main)")) {   // right box = 替補 substitute: ticked, but on the bench
    if (subs.has(id)) { subs.delete(id); picked.delete(id); } else { subs.add(id); picked.add(id); }
  } else if (picked.has(id) && !subs.has(id)) { picked.delete(id); }   // left box / the row = starter
  else { picked.add(id); subs.delete(id); }
  persist(); renderList(); renderResult();
};
$("allBtn").onclick = () => { data.members.forEach((m) => picked.add(m.id)); persist(); renderList(); renderResult(); };
$("noneBtn").onclick = () => { picked.clear(); subs.clear(); persist(); renderList(); renderResult(); };
ROOT.querySelectorAll("th[data-sort]").forEach((th) => th.onclick = () => {
  const k = th.dataset.sort;
  if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = k === "name" ? 1 : -1; }
  persist(); renderList();
});
$("pasteBtn").onclick = () => {
  const names = $("pasteBox").value.split(/[\n,，]+/).map((s) => s.replace(/^[\s\-•*\d.)]+/, "").trim()).filter(Boolean);
  const miss = []; let n = 0;
  names.forEach((nm) => {
    const c = core(nm);
    let hit = data.members.filter((m) => core(m.name) === c);
    if (!hit.length && c.length >= 3) hit = data.members.filter((m) => core(m.name).includes(c));
    if (hit.length === 1) { picked.add(hit[0].id); n++; } else miss.push(nm + (hit.length > 1 ? " (?)" : ""));
  });
  $("pasteMsg").innerHTML = esc(tr("pasteOk", { n })) + (miss.length ? `<br><span class="warn">${esc(tr("pasteMiss", { list: miss.join(", ") }))}</span>` : "");
  persist(); renderList(); renderResult();
};
$("rk_copyBtn").onclick = async () => {
  const r = ranking(false, true); let n = 0;
  const text = r.map((m) => `${m.isSub ? "(" + tr("subTag") + ")" : ++n + "."} ${m.name} (ID ${m.id}) — ${m.score.toFixed(mode === "w" ? 1 : 0)}`).join("\n");
  try { await navigator.clipboard.writeText(text); } catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; ROOT.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  }
  const b = $("rk_copyBtn"); b.textContent = tr("copied"); setTimeout(() => (b.textContent = tr("copy")), 1500);
};

$("presetBtns").onclick = (e) => {
  const b = e.target.closest("[data-p]"); if (!b) return;
  activePreset = activePreset === b.dataset.p ? null : b.dataset.p; renderPresets();
};
$("presetCounts").oninput = (e) => {
  const inp = e.target.closest("input[data-gi]"); if (!inp) return;
  const v = Math.max(0, Math.min(99, Math.round(Number(inp.value) || 0)));
  store.counts = store.counts || {};
  store.counts[activePreset] = store.counts[activePreset] || {};
  store.counts[activePreset][inp.dataset.gi] = v;
  save(); renderPresets();
};
$("presetCopy").onclick = async () => {
  const pr = PRESETS.find((x) => x.id === activePreset); if (!pr) return;
  const text = `**${pr.emoji} ${pr.name[lang] || ptOf(pr.name.en)}**\n` + presetGroups(pr).map(({ g, list }) =>
    `\n**${g.name[lang] || ptOf(g.name.en)} (${list.length})**\n` + (list.map((m, i) => `${i + 1}. ${m.name}`).join("\n") || "—")).join("\n");
  try { await navigator.clipboard.writeText(text); } catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; ROOT.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  }
  const b = $("presetCopy"); b.textContent = tr("copied"); setTimeout(() => (b.textContent = tr("copy")), 1500);
};



/* ===== ⑤ Battle table builder (saved only in this browser) ===== */
const TB_LS = "nxs-table-v1";
const TB_COLORS = ["#e6a3d9", "#8fd0ec", "#f6c3a2", "#d6ecc4", "#f6e58d", "#c9c3f0", "#d9d9d9", "#b8e0d2"];
const TT = { ko: {"title": "⑤ 전투 배치표", "note": "목록에서 사람을 고른 뒤 칸을 눌러 배치하세요(컴퓨터에서는 드래그도 가능). ×를 누르면 제거됩니다.", "setup": "표 설정", "stages": "단계", "targets": "목표", "tlabels": "목표 뒤 괄호 설명", "cols": "열 이름", "sep": "(쉼표로 구분)", "shortNames": "짧은 이름 (亗, Nexus 같은 장식 제거)", "draft": "순위로 초안 자동 작성", "draftNote": "④의 Attackers / Defenders 인원수를 사용합니다.", "clear": "표 비우기", "addGroup": "+ 조", "addRow": "+ 행", "delGroup": "조 삭제", "dupRow": "행 복사", "delRow": "행 삭제", "pool": "인원 — 점수 기준 추천 역할 (이름을 누른 뒤 칸을 누르세요)", "poolEmpty": "먼저 ②에서 참가자를 체크하세요.", "addText": "+ 텍스트", "sync": "📋 단계(Phase 1, Phase 2, Stay behind…)마다 건물 표가 하나씩, 한 줄 = 건물 하나. 같은 사람이 여러 단계에 나올 수 있어요. 단계 이름은 「표 설정」에서 바꿔요.", "imp": "📥 텍스트 붙여넣기 → 표", "impNote": "Discord에 쓴 배치 글을 그대로 붙여넣으세요 (① ROYAL STABLES / * ⚔️ Attacker: Papa …). 이름은 명단과 자동으로 맞춰지고, 못 찾은 이름은 글자로 들어가요.", "impGo": "표로 바꾸기", "impBad": "알아볼 수 있는 건물이 없어요.", "impDraft": "📝 초안 넣기 (점수 순으로 사람 배치)", "addB": "+ 건물", "moveTo": "단계:", "stay": "남음", "textPrompt": "추가할 텍스트 (예: Stays behind)", "image": "🖼️ 이미지 만들기", "text": "📋 텍스트 복사", "toPost": "📢 새 공지에 사용", "saveHint": "휴대폰: 이미지를 길게 눌러 저장하세요.", "download": "다운로드", "close": "닫기", "confirmClear": "표 전체를 비울까요?", "confirmDraft": "현재 표를 새 초안으로 바꿀까요?", "copied": "복사했어요!", "group": "조", "picked": "선택됨:"},
 ar: {"title": "⑤ جدول المعركة", "note": "اختر أشخاصًا من القائمة، ثم انقر على خانة لوضعهم فيها (على الكمبيوتر يمكنك السحب أيضًا). انقر × للإزالة.", "setup": "إعداد الجدول", "stages": "المراحل", "targets": "الأهداف", "tlabels": "ملاحظة الهدف (بين قوسين)", "cols": "الأعمدة", "sep": "(افصل بفواصل)", "shortNames": "أسماء مختصرة (بدون زخارف مثل 亗 وNexus)", "draft": "املأ مسودة أولى من الترتيب", "draftNote": "يستخدم أعداد المهاجمين / المدافعين من ④.", "clear": "مسح الجدول", "addGroup": "+ مجموعة", "addRow": "+ صف", "delGroup": "حذف المجموعة", "dupRow": "نسخ الصف", "delRow": "حذف الصف", "pool": "الأشخاص — أدوار مقترحة حسب النقاط (انقر على واحد، ثم على خانة)", "poolEmpty": "حدّد المشاركين في ② أولًا.", "addText": "+ نص", "sync": "📋 لكل مرحلة (Phase 1، Phase 2، Stay behind…) جدول مبانٍ خاص، وكل صف = مبنى. يمكن أن يظهر الشخص نفسه في عدة مراحل. تُغيَّر أسماء المراحل في «إعداد الجدول».", "imp": "📥 لصق نص ← جدول", "impNote": "الصق نص التوزيع كما كتبته في Discord (① ROYAL STABLES / * ⚔️ Attacker: Papa …). تُطابق الأسماء مع القائمة تلقائيًا، وما لا يُعثر عليه يُضاف كنص.", "impGo": "حوّل إلى جدول", "impBad": "لم يُعثر على أي مبنى.", "impDraft": "📝 أدخل مسودة (الأشخاص حسب الترتيب)", "addB": "+ مبنى", "moveTo": "المرحلة:", "stay": "يبقى", "textPrompt": "النص المراد إضافته (مثلًا: يبقى في الخلف)", "image": "🖼️ إنشاء صورة", "text": "📋 نسخ النص", "toPost": "📢 استخدام في إعلان جديد", "saveHint": "الهاتف: اضغط مطولًا على الصورة لحفظها.", "download": "تنزيل", "close": "إغلاق", "confirmClear": "مسح الجدول بالكامل؟", "confirmDraft": "استبدال الجدول بمسودة جديدة؟", "copied": "تم النسخ!", "group": "مجموعة", "picked": "المحدد:"},
 pt: {"title": "⑤ Tabela de batalha", "note": "Escolha pessoas na lista e toque numa caixa para colocá-las lá (no computador também dá para arrastar). Toque em × para remover.", "setup": "Configurar tabela", "stages": "Etapas", "targets": "Alvos", "tlabels": "Notas do alvo (entre parênteses)", "cols": "Colunas", "sep": "(separe com vírgulas)", "shortNames": "Nomes curtos (sem enfeites como 亗 e Nexus)", "draft": "Montar um rascunho pelo ranking", "draftNote": "Usa os números de Attackers / Defenders do ④.", "clear": "Limpar tabela", "addGroup": "+ Grupo", "addRow": "+ Linha", "delGroup": "Excluir grupo", "dupRow": "Copiar linha", "delRow": "Excluir linha", "pool": "Pessoas — funções sugeridas pela pontuação (toque numa, depois numa caixa)", "poolEmpty": "Marque os participantes no ② primeiro.", "addText": "+ texto", "sync": "📋 Cada fase (Phase 1, Phase 2, Stay behind…) tem sua própria tabela de prédios, uma linha = um prédio. A mesma pessoa pode aparecer em fases diferentes. Os nomes das fases mudam em «Configurar tabela».", "imp": "📥 Colar texto → tabela", "impNote": "Cole o texto das funções como escreveu no Discord (① ROYAL STABLES / * ⚔️ Attacker: Papa …). Os nomes são ligados à lista sozinhos; os não encontrados entram como texto.", "impGo": "Transformar em tabela", "impBad": "Nenhum prédio encontrado.", "impDraft": "📝 Inserir rascunho (pessoas pela classificação)", "addB": "+ Prédio", "moveTo": "Fase:", "stay": "fica", "textPrompt": "Texto para adicionar (ex.: Stays behind)", "image": "🖼️ Gerar imagem", "text": "📋 Copiar texto", "toPost": "📢 Usar num novo anúncio", "saveHint": "No celular: toque e segure a imagem para salvar.", "download": "Baixar", "close": "Fechar", "confirmClear": "Limpar a tabela inteira?", "confirmDraft": "Trocar a tabela por um novo rascunho?", "copied": "Copiado!", "group": "Grupo", "picked": "Selecionado:"},

  en: {
    title: "⑤ Battle table", note: "Pick people from the list, then tap a box to put them there (on a computer you can also drag). Tap × to remove.",
    setup: "Table setup", stages: "Stages", targets: "Targets", tlabels: "Target notes (shown in brackets)", cols: "Columns", sep: "(separate with commas)",
    shortNames: "Short names (drop decorations like 亗 and Nexus)",
    draft: "Fill a first draft from the ranking", draftNote: "Uses the Attackers / Defenders numbers from ④.",
    clear: "Clear table", addGroup: "+ Group", addRow: "+ Row", delGroup: "Delete group", dupRow: "Copy row", delRow: "Delete row",
    pool: "People — suggested roles by score (tap one, then tap a box)", poolEmpty: "Tick participants in ② first.",
    addText: "+ text", sync: "📋 Each phase (Phase 1, Phase 2, Stay behind…) has its own table of buildings, one row = one building. The same person can be in several phases. Rename the phases in Table setup.", imp: "📥 Paste text → table", impNote: "Paste the assignment post as you wrote it for Discord (① ROYAL STABLES / * ⚔️ Attacker: Papa …). Names are matched to the roster automatically; any not found go in as text.", impGo: "Turn into table", impBad: "No buildings found in that text.", impDraft: "📝 Insert a draft (people by ranking)", addB: "+ Building", moveTo: "Phase:", stay: "stay", textPrompt: "Text to add (e.g. Stays behind)",
    image: "🖼️ Make image", text: "📋 Copy text", toPost: "📢 Use in a new announcement",
    saveHint: "Phone: press and hold the picture to save it.", download: "Download", close: "Close",
    confirmClear: "Clear the whole table?", confirmDraft: "Replace the table with a new draft?", copied: "Copied!",
    group: "Group", picked: "Selected:",
  },
  zh: {
    title: "⑤ 戰鬥分工表", note: "先點上方的名字，再點要放的格子（電腦上也可以直接拖曳）。點 × 移除。",
    setup: "表格設定", stages: "階段", targets: "目標", tlabels: "目標後面的括號說明", cols: "欄位名稱", sep: "（用逗號分隔）",
    shortNames: "簡短名字（去掉亗、Nexus 這些裝飾）",
    draft: "依排序自動排一份草稿", draftNote: "使用 ④ 裡 Attackers／Defenders 的人數。",
    clear: "清空表格", addGroup: "+ 新增組", addRow: "+ 新增列", delGroup: "刪除這組", dupRow: "複製這列", delRow: "刪除這列",
    pool: "人員 — 依分數建議的角色（先點名字，再點格子）", poolEmpty: "請先在 ② 勾選參戰的人。",
    addText: "+ 文字", sync: "📋 每個階段（Phase 1、Phase 2、Stay behind…）各一張建築表，一列＝一個建築。同一個人可以出現在不同階段。階段名稱在「表格設定」裡改。", imp: "📥 貼上文字轉成表格", impNote: "把寫給 Discord 的分配文字整段貼進來（① ROYAL STABLES／* ⚔️ Attacker: Papa …）。名字會自動對到名單，對不到的會變成文字格。", impGo: "轉成表格", impBad: "這段文字裡找不到建築。", impDraft: "📝 放入草稿（依排序自動填人）", addB: "+ 新增建築", moveTo: "階段：", stay: "留守", textPrompt: "要加入的文字（例如 Stays behind）",
    image: "🖼️ 產生圖片", text: "📋 複製文字", toPost: "📢 拿去發公告",
    saveHint: "手機：長按圖片即可儲存。", download: "下載", close: "關閉",
    confirmClear: "確定清空整張表？", confirmDraft: "用新的草稿取代目前的表格？", copied: "已複製！",
    group: "組", picked: "已選：",
  },
};
const tt = (k) => (TT[lang] && TT[lang][k]) || TT.en[k];
const COL_KEYS = ["att", "stage", "target", "def", "join", "note"];
const PEOPLE_COLS = ["att", "def", "join"];
function tbDefault() {
  return {
    stages: "Phase 1, Phase 2, Stay behind", targets: "1, 2, 3, 4, 5, 6, 7", short: true,
    tlabels: "Royal Stables, Bell Tower, Sanctum — near enemy, Sanctum — near home, Abbeys (4 total), Mercenary Camp, Hall of Reformation, Sword Shrine — heavy guard",
    cols: { att: "Attacker", stage: "Stage", target: "Building", def: "Defenders", join: "Joiners", note: "Note" },
    show: { att: true, stage: true, target: true, def: true, join: true, note: true },
    groups: [],
  };
}
let TB = (() => { try { return Object.assign(tbDefault(), JSON.parse(localStorage.getItem(TB_LS)) || {}); } catch (e) { return tbDefault(); } })();
const tbSave = () => { try { localStorage.setItem(TB_LS, JSON.stringify(TB)); } catch (e) {} planTouched(); };
let tbPick = null;          // selected chip: { kind: "p", id } | { kind: "t", text }
let tbUid = Date.now();
const newRow = (stage = "") => ({ id: ++tbUid, att: [], stage, target: "", def: [], join: [], note: "", pt: {}, tg: [] });
/* 📋 sections: TB.stages = the phases ("Phase 1, Phase 2, Stay behind"), each its own table of buildings.
   A group = one building row: { color, sec, rows: [{ target, tl, att, def, join, note }] } (rows stays an array so older copies still read it). */
const chipKey = (x) => x.kind === "p" ? "p:" + x.id : "t:" + x.text;
const stList = () => { const l = listOf(TB.stages); return l.length ? l : ["Phase 1"]; };
function tbSync() {
  if (/^\s*Stage 1\s*,\s*Stage 2\s*$/.test(TB.stages || "")) TB.stages = tbDefault().stages;   // the old default → the phases
  if (TB.cols.target === "Target") TB.cols.target = "Building";
  if (TB.tlabels === "Royal Stables, Bell Tower, Sanctum near enemy, Sanctum near home, Abbey, Mercenary Camp, Hall of Reformation, Centre") TB.tlabels = tbDefault().tlabels;
  if (TB.cols.att === "Attackers") TB.cols.att = "Attacker";
  TB.groups.forEach((g) => {
    if (!g.rows || !g.rows.length) g.rows = [newRow()];
    g.rows.forEach((r) => { if (!r.target && r.tg && r.tg[0]) { r.target = r.tg[0].t || ""; r.tl = r.tl || r.tg[0].tl || ""; }
      const m = !r.tl && String(r.target || "").match(/^(.*?)\s*[(（](.+)[)）]\s*$/); if (m) { r.target = m[1]; r.tl = m[2]; } });   // "1 (Royal Stables)" → 1 + note
    if (g.rows.length > 1) {   // older "stage rows" → the first row's building, everyone in it
      const b = g.rows[0]; PEOPLE_COLS.forEach((k) => { const seen = new Set(), all = [];
        g.rows.forEach((r) => (r[k] || []).forEach((x) => { const key = chipKey(x); if (!seen.has(key)) { seen.add(key); all.push(x); } })); b[k] = all; });
      g.rows = [b]; }
    if (!(g.sec >= 0)) g.sec = 0;
    if (g.sec >= stList().length) g.sec = stList().length - 1;
  });
}
const gPut = (gi, k, chip) => TB.groups[gi].rows.forEach((r) => { if (!r[k].some((x) => chipKey(x) === chipKey(chip))) r[k].push({ ...chip }); });
const gDel = (gi, k, chip) => TB.groups[gi].rows.forEach((r) => { const j = r[k].findIndex((x) => chipKey(x) === chipKey(chip)); if (j >= 0) r[k].splice(j, 1); });

const memberById = (id) => (data && data.members.find((m) => String(m.id) === String(id))) || null;
function shortName(n) {
  const s = String(n || "").normalize("NFKC").replace(/nexus/gi, "").replace(/[亗卍〆『』「」【】〖〗★☆♛♚♕✿❀•·︎]/g, "").replace(/[^\p{L}\p{N} ._\-'’]/gu, "").replace(/\s+/g, " ").trim();
  return s || String(n || "");
}
function chipLabel(c) {
  if (c.kind === "t") return c.text;
  const m = memberById(c.id);
  const n = m ? m.name : "?";
  return TB.short ? shortName(n) : n;
}
const listOf = (s) => String(s || "").split(/[,，]/).map((x) => x.trim()).filter(Boolean);

function tbCounts() {
  const c = {};
  TB.groups.filter((g) => !g.sec).forEach((g) => g.rows.slice(0, 1).forEach((r) => PEOPLE_COLS.forEach((k) => r[k].forEach((x) => { if (x.kind === "p") c[x.id] = (c[x.id] || 0) + 1; }))));   // rows of a group = the same people
  return c;
}

function tbRender() {
  const host = $("tbCard"); if (!host || !data) return;
  tbSync();
  const counts = tbCounts();
  const pool = ranking();
  const swPreset = PRESETS.find((x) => x.id === "swordland");
  const roleGroups = presetGroups(swPreset);   // suggested Attackers / Defenders / Joiners by score
  const stageOpts = listOf(TB.stages), targetOpts = listOf(TB.targets);
  const cell = (g, gi, r, ri, k) => {
    const chips = r[k].map((x, xi) => `<span class="tb-chip${x.kind === "t" ? " txt" : ""}" draggable="true" data-g="${gi}" data-r="${ri}" data-k="${k}" data-x="${xi}">${esc(chipLabel(x))}<b class="tb-x" data-del="1">×</b></span>`).join("");
    return `<div class="tb-cell" data-g="${gi}" data-r="${ri}" data-k="${k}"><div class="tb-lab">${esc(TB.cols[k])}</div>${chips}<span class="tb-add" data-g="${gi}" data-r="${ri}" data-k="${k}" data-addtext="1">${esc(tt("addText"))}</span></div>`;
  };
  host.innerHTML = `
    <h2>${esc(tt("title"))}</h2>
    <div class="muted msg" style="margin:0 0 4px">${esc(tt("note"))}</div><div class="muted msg" style="margin:0 0 10px">${esc(tt("sync"))}</div>
    <details class="tb-setup"><summary>${esc(tt("setup"))}</summary>
      <label class="f">${esc(tt("stages"))} <span class="muted">${esc(tt("sep"))}</span><input type="text" data-set="stages" value="${esc(TB.stages)}"></label>
      <label class="f">${esc(tt("targets"))} <span class="muted">${esc(tt("sep"))}</span><input type="text" data-set="targets" value="${esc(TB.targets)}"></label>
      <label class="f">${esc(tt("tlabels"))} <span class="muted">${esc(tt("sep"))}</span><input type="text" data-set="tlabels" value="${esc(TB.tlabels || "")}"></label>
      <div class="f">${esc(tt("cols"))}</div>
      <div class="tb-cols">${COL_KEYS.filter((k) => k !== "stage").map((k) => `<label><input type="checkbox" data-show="${k}" ${TB.show[k] ? "checked" : ""}><input type="text" data-col="${k}" value="${esc(TB.cols[k])}"></label>`).join("")}</div>
      <label class="row" style="margin-top:8px"><input type="checkbox" data-set="short" ${TB.short ? "checked" : ""}> ${esc(tt("shortNames"))}</label>
    </details>
    <div class="row" style="margin:10px 0">
      <button class="btn" data-act="draft">✨ ${esc(tt("draft"))}</button>
      <button class="btn" data-act="import">${esc(tt("imp"))}</button>
      <button class="btn" data-act="clear">${esc(tt("clear"))}</button>
    </div>
    <div class="muted" style="font-size:12px;margin:-4px 0 8px">${esc(tt("draftNote"))}</div>
    <div class="tb-sticky"><div class="tb-pool-h">${esc(tt("pool"))}${tbPick ? ` · <b>${esc(tt("picked"))} ${esc(chipLabel(tbPick))}</b>` : ""}</div>
    <div class="tb-counts">${swPreset.groups.map((g, gi) => g.count == null ? "" : `<label>${esc(g.name[lang] || ptOf(g.name.en))} <input type="number" min="0" max="99" data-rolecount="${gi}" value="${groupCount(swPreset, gi)}"></label>`).join("")}</div>
    <div class="tb-pool">${pool.length ? roleGroups.map(({ g, list }, ri) => list.length ? `<div class="tb-role r${ri}"><div class="tb-role-h">${esc(g.name[lang] || ptOf(g.name.en))} <span>(${list.length})</span></div>${list.map((m) => `<span class="tb-chip pool r${ri}${tbPick && tbPick.kind === "p" && String(tbPick.id) === String(m.id) ? " on" : ""}" draggable="true" data-pid="${m.id}">${esc(TB.short ? shortName(m.name) : m.name)}${counts[m.id] ? `<i>${counts[m.id]}</i>` : ""}</span>`).join("")}</div>` : "").join("") : `<span class="muted">${esc(tt("poolEmpty"))}</span>`}</div></div>
    ${stList().map((sn, si) => `<h3 class="tb-sec">${esc(sn)}</h3>${TB.groups.map((g, gi) => g.sec !== si ? "" : `
      <div class="tb-group" style="border-color:${g.color};background:color-mix(in srgb, ${g.color} 22%, var(--panel))">
        <div class="tb-ghead">
          <span class="tb-swatches">${TB_COLORS.map((c) => `<span class="tb-sw${c === g.color ? " on" : ""}" style="background:${c}" data-color="${c}" data-g="${gi}"></span>`).join("")}</span>
          ${stList().length > 1 ? `<label class="muted" style="font-size:12px">${esc(tt("moveTo"))} <select data-gsec="${gi}">${stList().map((n, i) => `<option value="${i}"${i === g.sec ? " selected" : ""}>${esc(n)}</option>`).join("")}</select></label>` : ""}
          <button class="btn small" data-act="delGroup" data-g="${gi}">${esc(tt("delGroup"))}</button>
        </div>
        ${g.rows.slice(0, 1).map((r, ri) => `
          <div class="tb-row">
            <div class="tb-rowtop">
              ${TB.show.target ? `<label class="tb-in"><span>${esc(TB.cols.target)}</span><input list="tbTargets" data-g="${gi}" data-r="${ri}" data-field="target" value="${esc(r.target || "")}"></label><label class="tb-in"><span>( )</span><input list="tbTLabels" data-g="${gi}" data-r="${ri}" data-field="tl" value="${esc(r.tl || "")}" placeholder="—"></label>` : ""}
            </div>
            ${PEOPLE_COLS.filter((k) => TB.show[k]).map((k) => cell(g, gi, r, ri, k)).join("")}
            ${TB.show.note ? `<label class="tb-in wide"><span>${esc(TB.cols.note)}</span><input data-g="${gi}" data-r="${ri}" data-field="note" value="${esc(r.note || "")}"></label>` : ""}
          </div>`).join("")}
      </div>`).join("")}
    <div class="row" style="margin:6px 0 4px"><button class="btn small" data-act="addGroup" data-sec="${si}">${esc(tt("addB"))}</button></div>`).join("")}
    <div class="row" style="margin-top:14px">
      <button class="btn primary" data-act="image">${esc(tt("image"))}</button>
      <button class="btn" data-act="text">${esc(tt("text"))}</button>
    </div>
    <datalist id="tbStages">${stageOpts.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>
    <datalist id="tbTLabels">${listOf(TB.tlabels).map((s) => `<option value="${esc(s)}">`).join("")}</datalist>
    <datalist id="tbTargets">${targetOpts.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>`;
}

/* ----- editing ----- */
function tbPut(gi, ri, k, chip) { gPut(gi, k, chip); }   // the whole colour group (every stage row) gets them
function tbDraft() {
  const pr = PRESETS.find((x) => x.id === "swordland");
  const A = groupCount(pr, 0), D = groupCount(pr, 1);
  const r = ranking(); if (!r.length) return;
  const nG = Math.max(1, Math.min(A, r.length));
  const stage = listOf(TB.stages)[0] || "";
  TB.groups = Array.from({ length: nG }, (_, i) => ({ color: TB_COLORS[i % TB_COLORS.length], sec: 0, rows: [newRow(stage)] }));
  r.forEach((m, i) => {
    const chip = { kind: "p", id: m.id };
    if (i < nG) TB.groups[i].rows[0].att.push(chip);
    else if (i < nG + D) TB.groups[(i - nG) % nG].rows[0].def.push(chip);
    else TB.groups[(i - nG - D) % nG].rows[0].join.push(chip);
  });
}

function tbClick(e) {
  const t = e.target;
  // remove chip
  if (t.dataset.del) { const c = t.closest(".tb-chip"), x = TB.groups[c.dataset.g].rows[c.dataset.r][c.dataset.k][c.dataset.x]; if (x) gDel(c.dataset.g, c.dataset.k, x); tbSave(); tbRender(); return; }
  if (t.dataset.pt !== undefined) return;   // the person's own target box
  // pick from pool
  const pc = t.closest(".tb-chip.pool");
  if (pc) { const id = pc.dataset.pid; tbPick = tbPick && tbPick.kind === "p" && String(tbPick.id) === String(id) ? null : { kind: "p", id: Number(id) || id }; tbRender(); return; }
  // add free text
  if (t.dataset.addtext) {
    const v = window.prompt(tt("textPrompt")); if (v && v.trim()) { tbPut(t.dataset.g, t.dataset.r, t.dataset.k, { kind: "t", text: v.trim() }); tbSave(); tbRender(); }
    return;
  }
  // put picked into a cell
  const cl = t.closest(".tb-cell");
  if (cl && tbPick) { tbPut(cl.dataset.g, cl.dataset.r, cl.dataset.k, tbPick); tbSave(); tbRender(); return; }
  // colour
  if (t.dataset.color) { TB.groups[t.dataset.g].color = t.dataset.color; tbSave(); tbRender(); return; }
  const a = t.closest("[data-act]"); if (!a) return;
  const gi = a.dataset.g, ri = a.dataset.r, act = a.dataset.act;
  if (act === "addGroup") TB.groups.push({ color: TB_COLORS[TB.groups.length % TB_COLORS.length], sec: +a.dataset.sec || 0, rows: [newRow()] });
  if (act === "delGroup") TB.groups.splice(gi, 1);
  if (act === "addRow") { const rows = TB.groups[gi].rows, last = rows[rows.length - 1], st = listOf(TB.stages), nx = last ? st[st.indexOf(last.stage) + 1] : st[0];
    const r = newRow(nx ?? (last ? last.stage : st[0] || "")); if (last) PEOPLE_COLS.forEach((k) => { r[k] = last[k].map((x) => ({ ...x })); }); rows.push(r); }   // same people, next stage
  if (act === "delRow") TB.groups[gi].rows.splice(ri, 1);
  if (act === "dupRow") { const r = JSON.parse(JSON.stringify(TB.groups[gi].rows[ri])); r.id = ++tbUid; TB.groups[gi].rows.splice(Number(ri) + 1, 0, r); }
  if (act === "clear") { if (!window.confirm(tt("confirmClear"))) return; TB.groups = []; }
  if (act === "draft") { if (TB.groups.length && !window.confirm(tt("confirmDraft"))) return; tbDraft(); }
  if (act === "image") return tbImage();
  if (act === "import") return tbImportBox();
  if (act === "text") return tbCopyText(a);
  tbSave(); tbRender();
}
function tbInput(e) {
  const t = e.target;
  if (t.dataset.rolecount !== undefined) {
    const v = Math.max(0, Math.min(99, Math.round(Number(t.value) || 0)));
    store.counts = store.counts || {}; store.counts.swordland = store.counts.swordland || {};
    store.counts.swordland[t.dataset.rolecount] = v; save(); renderPresets(); return;
  }
  if (t.dataset.gsec !== undefined) { TB.groups[t.dataset.gsec].sec = +t.value; tbSave(); tbRender(); return; }
  if (t.dataset.tg !== undefined) { const r = TB.groups[t.dataset.g].rows[t.dataset.r], ro = t.dataset.role || "tg"; r[ro] = r[ro] || []; const i = +t.dataset.tg; r[ro][i] = r[ro][i] || { t: "", tl: "" }; r[ro][i][t.dataset.tk] = t.value;
    if (ro === "tg" && i === 0) { r.target = r.tg[0].t; r.tl = r.tg[0].tl; } tbSave(); return; }
  if (t.dataset.pt !== undefined) { const r = TB.groups[t.dataset.g].rows[t.dataset.r]; r.pt = r.pt || {}; if (t.value.trim()) r.pt[t.dataset.pt] = t.value.trim(); else delete r.pt[t.dataset.pt]; tbSave(); return; }
  if (t.dataset.field) { TB.groups[t.dataset.g].rows[t.dataset.r][t.dataset.field] = t.value; tbSave(); return; }
  if (t.dataset.set === "short") { TB.short = t.checked; tbSave(); tbRender(); return; }
  if (t.dataset.set) { TB[t.dataset.set] = t.value; tbSave(); return; }
  if (t.dataset.col) { TB.cols[t.dataset.col] = t.value; tbSave(); return; }
  if (t.dataset.show) { TB.show[t.dataset.show] = t.checked; tbSave(); tbRender(); return; }
}
/* 📥 the assignment post (the Discord text) → the table. Sections: "PHASE 1 …", "PHASE 2 …", "STAY BEHIND …"; buildings: "① ROYAL STABLES" or "#5 …";
   people: "* ⚔️ Attacker: Papa", "Defenders: Meow, Perci", "Joiners: …"; other bullets → a name (Stay behind lists) or the building's note. Stops at "IMPORTANT REMINDERS". */
const nkey = (x) => shortName(x).toLowerCase().replace(/[δΔ]/g, "a").replace(/\s+/g, "");
function findMember(raw) {
  const k = nkey(raw); if (!k) return null;
  const pool = [...ranking(true, true), ...data.members.filter((m) => !picked.has(m.id))];
  const words = (m) => shortName(m.name).toLowerCase().replace(/[δΔ]/g, "a").split(/\s+/);
  return pool.find((m) => nkey(m.name) === k) || (k.length >= 3 && pool.find((m) => nkey(m.name).startsWith(k)))
    || pool.find((m) => words(m).includes(k)) || (k.length >= 4 && pool.find((m) => nkey(m.name).includes(k))) || null;
}
const tcase = (x) => /[a-z]/.test(x) ? x : x.toLowerCase().replace(/(^|[\s(—-])([a-z]+)/g, (m, a, w) => a + (a && /^(of|and|the|near|to|a|an|in|at)$/.test(w) ? w : w[0].toUpperCase() + w.slice(1)));   // ALL CAPS → Title Case (of / near … stay small)
function tbParse(text) {
  const secs = [], groups = []; let sec = -1, g = null;
  const secName = (l) => { const m = l.match(/phase\s*(\d+)/i); if (m) return "Phase " + m[1]; if (/stay\s*behind/i.test(l)) return "Stay behind"; return null; };
  const chips = (str) => str.split(/,|&|\band\b|、|，/i).map((x) => x.trim()).filter(Boolean).map((n) => { const m = findMember(n); return m ? { kind: "p", id: m.id } : { kind: "t", text: n }; });
  for (let raw of String(text).split(/\r?\n/)) {
    const l = raw.trim(); if (!l || /^[━─—=_-]{3,}$/.test(l)) continue;
    if (/reminders?/i.test(l) && /📌|important/i.test(l)) break;
    const sn = secName(l);
    if (sn && !/attacker|defender|joiner/i.test(l)) { sec = secs.indexOf(sn); if (sec < 0) { secs.push(sn); sec = secs.length - 1; } g = null; continue; }
    const b = l.match(/^([①②③④⑤⑥⑦⑧⑨])\s*(.*)$/) || l.match(/^#\s*(\d+)\s*[-–—.:]?\s*(.*)$/);
    if (b) { if (sec < 0) { secs.push("Phase 1"); sec = 0; } const t = /\d/.test(b[1]) ? b[1] : String("①②③④⑤⑥⑦⑧⑨".indexOf(b[1]) + 1);
      g = { color: TB_COLORS[(+t - 1 + TB_COLORS.length) % TB_COLORS.length], sec, rows: [{ ...newRow(), target: t, tl: tcase(b[2].trim()) }] }; groups.push(g); continue; }
    if (!g) continue;
    const body = l.replace(/^[*•·\-–]\s*/, "").replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, "");
    const r = g.rows[0], role = body.match(/^(attackers?|defenders?|joiners?)\s*[:：]\s*(.*)$/i);
    if (role) { const k = /^a/i.test(role[1]) ? "att" : /^d/i.test(role[1]) ? "def" : "join"; chips(role[2]).forEach((c) => { if (!r[k].some((x) => chipKey(x) === chipKey(c))) r[k].push(c); }); continue; }
    const m = /stay/i.test(secs[g.sec] || "") && !/[.!?]/.test(body) && body.split(/\s+/).length <= 3 ? findMember(body) : null;
    if (m) { r.def.push({ kind: "p", id: m.id }); continue; }
    r.note = (r.note ? r.note + " " : "") + body.replace(/^\*+\s*/, "");
  }
  return { secs, groups };
}
/* 📝 a starting draft in the post format: Phase 1 buildings filled from the ranking (attackers → defenders → joiners, like ✨),
   Phase 2 and Stay behind left to fill in */
function tbDraftText() {
  const pr = PRESETS.find((x) => x.id === "swordland"), D = groupCount(pr, 1), r = ranking();
  const B = [["①", "ROYAL STABLES"], ["②", "BELL TOWER"], ["③", "SANCTUM — NEAR ENEMY"], ["③", "SANCTUM — NEAR HOME"]];
  const nm = (m) => shortName(m.name), at = B.map(() => []), df = B.map(() => []), jn = B.map(() => []);
  r.forEach((m, i) => { if (i < B.length) at[i].push(nm(m)); else if (i < B.length + D) df[(i - B.length) % B.length].push(nm(m)); else jn[(i - B.length - D) % B.length].push(nm(m)); });
  const L = ["🏰 PHASE 1 — INITIAL BUILDINGS", ""];
  B.forEach(([n, t], i) => L.push(`${n} ${t}`, `* ⚔️ Attacker: ${at[i].join(", ")}`, `* 🛡️ Defenders: ${df[i].join(", ")}`, `* 👥 Joiners: ${jn[i].join(", ")}`, ""));
  L.push("④ ABBEYS (4 TOTAL)", "* Those near buildings 1, 2 and 3 send your second march to an Abbey (without teleporting).", "", "━━━━━━━━━━━━━━━━━━", "",
    "⚔️ PHASE 2 — NEW OBJECTIVES", "");
  [["⑦", "SWORD SHRINE — HEAVY GUARD"], ["⑤", "MERCENARY CAMP"], ["⑥", "HALL OF REFORMATION"]].forEach(([n, t]) => L.push(`${n} ${t}`, "* ⚔️ Attacker: ", "* 🛡️ Defenders: ", "* 👥 Joiners: ", ""));
  L.push("━━━━━━━━━━━━━━━━━━", "", "🛡️ STAY BEHIND — DEFENSE", "", "① Royal Stables", "* ", "", "② Bell Tower", "* ", "", "④ Abbeys", "* ");
  return L.join("\n");
}
function tbImportBox() {
  const m = document.createElement("div");
  m.className = "tb-modal";
  m.innerHTML = `<div class="card" style="width:min(640px,96vw)"><b>${esc(tt("imp"))}</b><div class="muted" style="margin:6px 0;font-size:12.5px">${esc(tt("impNote"))}</div>
    <textarea style="width:100%;box-sizing:border-box;min-height:260px;font:inherit;font-size:13px" data-imptext="1"></textarea><div class="msg" data-impmsg="1"></div>
    <div class="row" style="margin-top:8px"><button class="btn primary" data-impgo="1">${esc(tt("impGo"))}</button><button class="btn" data-impdraft="1">${esc(tt("impDraft"))}</button><button class="btn" data-close="1">${esc(tt("close"))}</button></div></div>`;
  m.onclick = (e) => {
    if (e.target === m || e.target.dataset.close) { m.remove(); return; }
    if (e.target.dataset.impdraft) { const ta = m.querySelector("[data-imptext]"); if (!ta.value.trim() || window.confirm(tt("confirmDraft"))) ta.value = tbDraftText(); ta.focus(); return; }
    if (!e.target.dataset.impgo) return;
    const { secs, groups } = tbParse(m.querySelector("[data-imptext]").value);
    if (!groups.length) { m.querySelector("[data-impmsg]").textContent = tt("impBad"); return; }
    if (TB.groups.length && !window.confirm(tt("confirmDraft"))) return;
    TB.stages = secs.join(", "); TB.groups = groups; TB.show.note = TB.show.note || groups.some((x) => x.rows[0].note);
    m.remove(); tbSave(); tbRender();
  };
  ROOT.appendChild(m); m.querySelector("textarea").focus();
}
/* drag & drop (computer) */
let tbDrag = null;
function tbDragStart(e) {
  const c = e.target.closest(".tb-chip"); if (!c) return;
  tbDrag = c.dataset.pid ? { chip: { kind: "p", id: Number(c.dataset.pid) || c.dataset.pid } }
    : { chip: TB.groups[c.dataset.g].rows[c.dataset.r][c.dataset.k][c.dataset.x], from: [c.dataset.g, c.dataset.r, c.dataset.k, c.dataset.x] };
  e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", "x"); } catch (err) {}
}
function tbDrop(e) {
  const cl = e.target.closest(".tb-cell"); if (!cl || !tbDrag) return;
  e.preventDefault();
  if (tbDrag.from) { const [g, , k] = tbDrag.from; gDel(g, k, tbDrag.chip); }
  tbPut(cl.dataset.g, cl.dataset.r, cl.dataset.k, tbDrag.chip);
  tbDrag = null; tbSave(); tbRender();
}

/* ----- output ----- */
const CIRC = "⓪①②③④⑤⑥⑦⑧⑨";
const bName = (r) => { const t = String(r.target || "").trim(), n = /^[0-9]$/.test(t) ? CIRC[+t] : t ? "#" + t : ""; return [n, r.tl || ""].filter(Boolean).join(" "); };
function tbSections() {
  tbSync();
  const people = PEOPLE_COLS.filter((k) => TB.show[k]), note = TB.show.note && TB.groups.some((g) => (g.rows[0].note || "").trim());
  const keys = [...(TB.show.target ? ["b"] : []), ...people, ...(note ? ["note"] : [])];
  const head = keys.map((k) => k === "b" ? TB.cols.target : TB.cols[k]);
  const secs = stList().map((name, si) => ({ name, rows: TB.groups.filter((g) => g.sec === si).map((g) => { const r = g.rows[0];
    return { color: g.color, r, cells: keys.map((k) => k === "b" ? bName(r) : PEOPLE_COLS.includes(k) ? r[k].map(chipLabel).join(", ") : (r[k] || "")) }; }) })).filter((x) => x.rows.length);
  const maxW = keys.map((k) => ({ b: 260, att: 200, def: 300, join: 300, note: 320 }[k] || 220));
  return { keys, head, secs, maxW };
}
function tbCopyText(btn) {
  const { secs } = tbSections(), L = [];
  secs.forEach((sec, i) => {
    if (i) L.push("", "━━━━━━━━━━━━━━━━━━", "");
    L.push(`${/stay|留守/i.test(sec.name) ? "🛡️" : i ? "⚔️" : "🏰"} ${sec.name.toUpperCase()}`);
    sec.rows.forEach(({ r }) => { L.push("", bName(r).toUpperCase() || "—");
      [["att", "⚔️"], ["def", "🛡️"], ["join", "👥"]].forEach(([k, ic]) => { if (TB.show[k] && r[k].length) L.push(`* ${ic} ${TB.cols[k]}: ${r[k].map(chipLabel).join(", ")}`); });
      if (TB.show.note && (r.note || "").trim()) L.push(`* ${r.note.trim()}`); });
  });
  const text = L.join("\n");
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => {
    const ta = document.createElement("textarea"); ta.value = text; ROOT.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  });
  const old = btn.textContent; btn.textContent = tt("copied"); setTimeout(() => (btn.textContent = old), 1500);
}
function tbImage() {
  const { head, secs, maxW } = tbSections();
  const all = secs.flatMap((x) => x.rows);
  const S = 2, pad = 8, lineH = 20, font = '15px "Noto Sans TC","Noto Sans KR","Noto Sans",Arial,sans-serif', bold = 'bold ' + font, big = 'bold 17px "Noto Sans TC","Noto Sans",Arial,sans-serif';
  const cv = document.createElement("canvas"), g = cv.getContext("2d");
  const widths = head.map((h, i) => {
    g.font = bold; let w = g.measureText(h).width;
    g.font = i === 0 && TB.show.target ? bold : font; all.forEach((r) => { w = Math.max(w, Math.min(g.measureText(r.cells[i]).width, maxW[i] || 300)); });
    return Math.ceil(Math.min(w, maxW[i] || 300) + pad * 2);
  });
  const wrap = (text, w, f = font) => {
    g.font = f; const out = []; let line = "";
    for (const word of String(text).split(/\s+/)) {
      const tryL = line ? line + " " + word : word;
      if (g.measureText(tryL).width <= w || !line) line = tryL; else { out.push(line); line = word; }
    }
    if (line) out.push(line); return out.length ? out : [""];
  };
  secs.forEach((sec) => sec.rows.forEach((r) => { r.lines = r.cells.map((c, i) => wrap(c, widths[i] - pad * 2, i === 0 && TB.show.target ? bold : font)); r.h = Math.max(...r.lines.map((l) => l.length)) * lineH + pad * 2; }));
  const titleH = 34, headH = lineH + pad * 2, gap = 12, W = widths.reduce((a, b) => a + b, 0) + 1;
  const H = secs.reduce((a, sec) => a + titleH + headH + sec.rows.reduce((b, r) => b + r.h, 0), 0) + gap * (secs.length - 1) + 1;
  cv.width = W * S; cv.height = H * S; g.scale(S, S);
  g.fillStyle = "#fff"; g.fillRect(0, 0, W, H); g.strokeStyle = "#9a9a9a"; g.lineWidth = 1; g.textBaseline = "top";
  let y = 0.5;
  secs.forEach((sec, si) => {
    if (si) y += gap;
    g.fillStyle = "#2b2b2b"; g.fillRect(0.5, y, W - 1, titleH); g.font = big; g.fillStyle = "#fff"; g.fillText(sec.name.toUpperCase(), pad + 2, y + 8); y += titleH;
    let x = 0.5;
    head.forEach((h, i) => { g.fillStyle = "#f2f2f2"; g.fillRect(x, y, widths[i], headH); g.strokeRect(x, y, widths[i], headH); g.font = bold; g.fillStyle = "#000"; g.fillText(h, x + pad, y + pad + 2); x += widths[i]; });
    y += headH;
    sec.rows.forEach((r) => { x = 0.5;
      r.cells.forEach((c, i) => { g.fillStyle = r.color; g.fillRect(x, y, widths[i], r.h); g.strokeRect(x, y, widths[i], r.h);
        g.font = i === 0 && head.length && TB.show.target ? bold : font; g.fillStyle = "#111";
        r.lines[i].forEach((l, li) => g.fillText(l, x + pad, y + pad + 2 + li * lineH)); x += widths[i]; });
      y += r.h; });
  });
  const url = cv.toDataURL("image/png");
  const m = document.createElement("div");
  m.className = "tb-modal";
  m.innerHTML = `<div class="card"><img src="${url}" style="max-width:100%;display:block;border-radius:6px">
    <div class="muted" style="margin:8px 0">${esc(tt("saveHint"))}</div>
    <div class="row"><a class="btn" download="battle-table.png" href="${url}">${esc(tt("download"))}</a>
    <button class="btn primary" data-topost="1">${esc(tt("toPost"))}</button>
    <button class="btn" data-close="1">${esc(tt("close"))}</button></div></div>`;
  m.onclick = (e) => {
    if (e.target === m || e.target.dataset.close) m.remove();
    if (e.target.dataset.topost) { try { sessionStorage.setItem("nxs-carry-img", url); } catch (err) {} location.hash = "#post"; }
  };
  ROOT.appendChild(m);
}

(function tbInit() {
  const host = $("tbCard");
  host.addEventListener("click", tbClick);
  host.addEventListener("input", (e) => { if (e.target.type !== "checkbox") tbInput(e); });
  host.addEventListener("change", (e) => { if (e.target.type === "checkbox") tbInput(e); else if (e.target.dataset.set || e.target.dataset.col || e.target.dataset.rolecount !== undefined) tbRender(); });
  host.addEventListener("dragstart", tbDragStart);
  host.addEventListener("dragover", (e) => { if (e.target.closest(".tb-cell")) e.preventDefault(); });
  host.addEventListener("drop", tbDrop);
})();


/* ===== 🔄 Shared plans: a named plan (e.g. "Legion 1") that every officer sees — ticks, weights, group sizes and the battle table.
   Saved encrypted on the site (data/ranking-plans-x7k2p9.json); open plans check for others' changes every 10 s.
   "Only on this device" works as before. ===== */
const PL = { ko: {"edWho": "편집 가능:", "edAll": "모든 간부가 편집 가능", "edSome": "내가 고른 사람만", "edLimited": "이 사람들만 편집 가능:", "edNote": "👑 만든 사람과 관리자는 항상 편집할 수 있어요.", "edNo": "👁️ 보기만 가능: 만든 사람이 편집할 사람을 제한했어요.", "noName": "이름 없음", "gone": "다른 사람이 이 계획을 삭제했어요. 체크한 사람은 이 기기에 남아 있어요.", "title": "📋 계획", "local": "🔒 이 기기에만", "newP": "+ 새 공유 계획", "ren": "이름 변경", "del": "삭제", "name": "공유 계획 이름 (예: 군단 1)", "copyQ": "지금 체크된 인원으로 시작할까요? (취소 = 빈 상태로 시작)", "delQ": "공유 계획 “{n}”을(를) 모두에게서 삭제할까요?", "localNote": "여기서 변경한 내용은 이 기기에만 남습니다.", "shared": "🔄 공유됨 — 모든 간부가 같은 체크와 표를 봅니다.", "last": "마지막 변경: {who} · {t}", "saving": "저장 중…", "saved": "✓ 저장됨", "err": "저장하지 못했습니다 — 다시 시도하는 중…", "noKey": "공유 계획에는 간부 GitHub 키가 필요합니다(공지 탭).", "loading": "공유 계획 불러오는 중…"},
 ar: {"edWho": "من يمكنه التعديل:", "edAll": "كل الضباط يمكنهم التعديل", "edSome": "فقط من أختارهم", "edLimited": "فقط هؤلاء يمكنهم التعديل:", "edNote": "👑 المُنشئ والمشرفون يمكنهم التعديل دائمًا.", "edNo": "👁️ عرض فقط: حدّد المُنشئ من يمكنه تغيير هذه الخطة.", "noName": "بلا اسم", "gone": "حذف شخص آخر هذه الخطة؛ اختياراتك محفوظة على هذا الجهاز.", "title": "📋 الخطة", "local": "🔒 على هذا الجهاز فقط", "newP": "+ خطة مشتركة جديدة", "ren": "إعادة تسمية", "del": "حذف", "name": "اسم الخطة المشتركة (مثل الكتيبة 1)", "copyQ": "البدء بالأشخاص المحددين الآن؟ (إلغاء = البدء فارغة)", "delQ": "حذف الخطة المشتركة “{n}” للجميع؟", "localNote": "التغييرات هنا تبقى على هذا الجهاز فقط.", "shared": "🔄 مشتركة — يرى كل المسؤولين نفس العلامات والجدول.", "last": "آخر تغيير: {who} · {t}", "saving": "جارٍ الحفظ…", "saved": "✓ تم الحفظ", "err": "تعذّر الحفظ — جارٍ إعادة المحاولة…", "noKey": "الخطط المشتركة تتطلب مفتاح GitHub للمسؤولين (تبويب النشر).", "loading": "جارٍ تحميل الخطط المشتركة…"},
 pt: {"edWho": "Quem pode editar:", "edAll": "Todos os oficiais podem editar", "edSome": "Só quem eu escolher", "edLimited": "Só estes podem editar:", "edNote": "👑 O criador e os admins sempre podem editar.", "edNo": "👁️ Só leitura: o criador limitou quem pode mudar este plano.", "noName": "sem nome", "gone": "Este plano foi excluído por outra pessoa; suas marcações ficaram neste aparelho.", "title": "📋 Plano", "local": "🔒 Só neste aparelho", "newP": "+ Novo plano compartilhado", "ren": "Renomear", "del": "Excluir", "name": "Nome do plano compartilhado (ex.: Legião 1)", "copyQ": "Começar com as pessoas marcadas agora? (Cancelar = começar vazio)", "delQ": "Excluir o plano compartilhado “{n}” para todos?", "localNote": "As mudanças aqui ficam só neste aparelho.", "shared": "🔄 Compartilhado — todos os oficiais veem as mesmas marcações e a mesma tabela.", "last": "Última mudança: {who} · {t}", "saving": "Salvando…", "saved": "✓ Salvo", "err": "Não foi possível salvar — tentando de novo…", "noKey": "Planos compartilhados precisam da chave do GitHub dos oficiais (aba Post).", "loading": "Carregando planos compartilhados…"},

  en: { edWho: "Who can edit:", edAll: "Every officer can edit", edSome: "Only people I pick", edLimited: "Only these can edit:", edNote: "👑 The creator and admins can always edit.", edNo: "👁️ View only: the creator limited who can change this plan.", noName: "no name", gone: "This plan was deleted by someone else; your ticks are kept on this device.", title: "📋 Plan", local: "🔒 Only on this device", newP: "+ New shared plan", ren: "Rename", del: "Delete",
        name: "Name of the shared plan (e.g. Legion 1)", copyQ: "Start it with the people ticked now? (Cancel = start empty)",
        delQ: "Delete the shared plan “{n}” for everyone?", localNote: "Changes here stay on this device only.",
        shared: "🔄 Shared — every officer sees the same ticks and table.", last: "Last change: {who} · {t}", saving: "Saving…", saved: "✓ Saved",
        err: "Couldn't save — trying again…", noKey: "Shared plans need the officer GitHub key (Post tab).", loading: "Loading shared plans…" },
  zh: { edWho: "誰可以編輯：", edAll: "所有幹部都可以編輯", edSome: "只有我選的人", edLimited: "只有這些人可以編輯：", edNote: "👑 建立者和管理員一定可以編輯。", edNo: "👁️ 這個計畫你只能看，不能改（建立者限定了編輯的人）。", noName: "沒有名字", gone: "這個計畫已經被別人刪掉了，你勾的人留在這台裝置上。", title: "📋 方案", local: "🔒 只在這台裝置", newP: "+ 新增共用方案", ren: "改名", del: "刪除",
        name: "共用方案的名字（例如 Legion 1）", copyQ: "要用現在勾選的人開始嗎？（取消 = 從空白開始）",
        delQ: "確定要為所有人刪除共用方案「{n}」？", localNote: "這裡的變更只存在這台裝置。",
        shared: "🔄 共用中 — 所有幹部看到的勾選和表格都一樣。", last: "最後修改：{who} · {t}", saving: "儲存中…", saved: "✓ 已儲存",
        err: "存不進去，正在重試…", noKey: "共用方案需要幹部的 GitHub 金鑰（在公告分頁設定）。", loading: "正在讀取共用方案…" },
};
const pl = (k, v = {}) => String((PL[lang] || PL.en)[k] ?? PL.en[k]).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const PLAN_PATH = "data/ranking-plans-x7k2p9.json";
const P_OWNER = location.hostname.endsWith("github.io") ? location.hostname.split(".")[0] : "NXSguides";
const P_REPO = location.hostname.endsWith("github.io") ? (location.pathname.split("/")[1] || "Kingshot_guideline_NXS") : "Kingshot_guideline_NXS";
const p64 = { enc: (str) => { const u = new TextEncoder().encode(str); let x = ""; for (let i = 0; i < u.length; i += 0x8000) x += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(x); },
              dec: (b) => new TextDecoder().decode(Uint8Array.from(atob(b.replace(/\s/g, "")), (c) => c.charCodeAt(0))) };
async function pgh(method, body) {
  let res;
  try {
    res = await fetch(`https://api.github.com/repos/${P_OWNER}/${P_REPO}/contents/${PLAN_PATH}${method === "GET" ? "?ref=main&t=" + Date.now() : ""}`, {
      method, headers: { Authorization: `Bearer ${OFFICER.token}`, Accept: "application/vnd.github+json" }, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
  } catch (e) { throw new Error("net"); }
  if (res.status === 401 || res.status === 403) throw new Error("auth");
  if (res.status === 409 || res.status === 422) throw new Error("busy");
  if (method === "GET" && res.status === 404) return null;
  if (!res.ok) throw new Error("net");
  return res.json();
}
let planNewName = "", planCreating = null;
let plans = {}, planSha = null, planId = store.planId || "", planBase = null, planDirty = false, planBusy = false, planTimer = null, planErr = "", planApplying = false;
const planWho = () => (OFFICER.user && OFFICER.user.name) || (() => { try { return JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").author || ""; } catch (e) { return ""; } })() || "?";
async function planFetch() {
  const f = await pgh("GET");
  if (!f) { plans = {}; planSha = null; return; }
  planSha = f.sha;
  const d = await OfficerData.open(JSON.parse(p64.dec(f.content)));
  plans = (d && d.plans) || {};
  // a plan saved under an empty / odd key can't be picked in the list (its value would clash with "only on this device"): give it a proper key
  for (const k of Object.keys(plans)) if (!/^[A-Za-z0-9_-]{1,40}$/.test(k)) { let nk; do nk = "p" + Math.random().toString(36).slice(2, 9); while (plans[nk]); plans[nk] = plans[k]; delete plans[k]; }
}
const planLabel = (p) => { const n = String((p && p.name) || "").trim(); return n && n !== "?" ? n : `(${pl("noName")}${p && p.by ? " · " + p.by : ""})`; };
function planSnapshot() { return { picked: [...picked], subs: [...picked].filter((id) => subs.has(id)), wPower, wts: { ...wts }, counts: JSON.parse(JSON.stringify(store.counts || {})), tb: JSON.parse(JSON.stringify(TB)) }; }
/* put a plan's contents on screen (keeping ticks this device hasn't saved yet) */
function planApply(p) {
  planApplying = true;
  let ids = new Set(p.picked || []);
  if (planDirty && planBase) { for (const id of picked) if (!planBase.has(id)) ids.add(id); for (const id of planBase) if (!picked.has(id)) ids.delete(id); }
  else planBase = new Set(p.picked || []);
  picked = ids;
  if (!planDirty) subs = new Set((p.subs || []).filter((id) => ids.has(id)));
  if (!planDirty) { store.counts = p.counts || {}; TB = Object.assign(tbDefault(), p.tb || {}); setWeights(wtsFrom(p.wts, p.wPower)); }
  renderAll(); tbRender(); renderPresets && renderPresets();
  planApplying = false;
}
function planRenderBar() {
  $("planTitle").textContent = pl("title");
  $("planNew").textContent = pl("newP"); $("planRen").textContent = pl("ren"); $("planDel").textContent = pl("del");
  const ids = Object.keys(plans).sort((a, b) => (plans[a].name || "").localeCompare(plans[b].name || ""));
  $("planSel").innerHTML = `<option value="">${esc(pl("local"))}</option>` + ids.map((id) => `<option value="${esc(id)}">🔄 ${esc(planLabel(plans[id]))}</option>`).join("");
  if (planId && !plans[planId]) planId = "";
  $("planSel").value = planId;
  $("planRen").hidden = $("planDel").hidden = !planId || !planCanEdit(plans[planId]);
  if ($("planEd") && !(document.activeElement && document.activeElement.closest && document.activeElement.closest("#planEd"))) $("planEd").innerHTML = OFFICER.token ? planEditorsHtml() : "";
  const p = planId && plans[planId];
  $("planStatus").textContent = !OFFICER.token ? pl("noKey") : !p ? pl("localNote")
    : [pl("shared"), planCanEdit(p) ? "" : pl("edNo"), p.by ? pl("last", { who: p.by, t: new Date(p.at).toISOString().slice(5, 16).replace("-", "/").replace("T", " ") + " UTC" }) : "", planBusy ? pl("saving") : planErr || (planDirty ? "" : "")].filter(Boolean).join(" · ");
}
/* local edits while a shared plan is open → save a moment later */
/* ✏️ who may change a shared plan: "everyone" (default) or the plan's creator + chosen officers (+ admins).
   Kept in the plan itself: owner = { id, name } of whoever made it (or first restricted it), editors = [Discord ids] when restricted.
   Checked on this page (the plan file is shared by all officers, so it is a working rule, not a lock). */
const myId = () => (OFFICER.user && OFFICER.user.id) || "";
const planCanEdit = (p) => { if (!p || !p.editors) return true; if (OFFICER.PERMS_TRIAL && !OFFICER.user && OFFICER.pw) return true;   // trial: the officer password opens everything
  const me = myId(); return !!me && (OFFICER.isAdmin() || (p.owner && p.owner.id === me) || p.editors.includes(me)); };
const planCanSetEditors = (p) => !!p && !!myId() && (OFFICER.isAdmin() || !p.owner || p.owner.id === myId());
function planEditorsHtml() {
  const p = planId && plans[planId]; if (!p) return "";
  const can = planCanSetEditors(p), users = (OFFICER.perms && OFFICER.perms.users) || {};
  const ids = Object.keys(users).filter((id) => !(p.owner && p.owner.id === id));
  const who = p.editors ? [p.owner && p.owner.name, ...p.editors.map((id) => (users[id] && users[id].name) || id)].filter(Boolean).join(", ") : "";
  if (!can) return `<div class="muted" style="font-size:12.5px;margin-top:6px">✏️ ${esc(p.editors ? pl("edLimited") + " " + who : pl("edAll"))}</div>`;
  return `<div class="pl-ed" style="margin-top:8px"><label class="muted" style="font-size:13px">✏️ ${esc(pl("edWho"))} <select class="inp" id="planEdMode" style="display:inline-block;width:auto;min-height:32px;padding:2px 8px">
      <option value="all"${p.editors ? "" : " selected"}>${esc(pl("edAll"))}</option><option value="some"${p.editors ? " selected" : ""}>${esc(pl("edSome"))}</option></select></label>
    ${p.editors ? `<div class="pl-edl">${p.owner ? `<span class="pl-edc on">👑 ${esc(p.owner.name || "?")}</span>` : ""}${ids.map((id) => `<label class="pl-edc${p.editors.includes(id) ? " on" : ""}"><input type="checkbox" data-ed="${esc(id)}"${p.editors.includes(id) ? " checked" : ""}> ${esc(users[id].name || id)}${users[id].admin ? " ⭐" : ""}</label>`).join("")}</div><div class="muted" style="font-size:12px">${esc(pl("edNote"))}</div>` : ""}</div>`;
}
function planSetEditors(editors) {
  const p = plans[planId]; if (!p || !planCanSetEditors(p)) return;
  if (!p.owner && myId()) p.owner = { id: myId(), name: planWho() };
  if (editors) p.editors = editors; else delete p.editors;
  planEdChange = { editors: editors || null, owner: p.owner || null }; planDirty = true; planSave(); planRenderBar();
}
let planEdChange = null;   // the who-can-edit change waiting to be saved
function planTouched() {
  if (!planId || planApplying) return;
  if (!planCanEdit(plans[planId])) {   // view only: put the plan back as it is and say why
    planApplying = true; planBase = null; planApply(plans[planId]); planApplying = false;
    $("planStatus").textContent = pl("edNo"); return;
  }
  planDirty = true; clearTimeout(planTimer); planTimer = setTimeout(planSave, 1200);
}
async function planSave(tries = 0) {
  if (!planId || !planDirty || planBusy) return;
  planBusy = true; planRenderBar();
  const mine = planSnapshot(), base = planBase || new Set(), localMeta = plans[planId] || { name: "" };
  try {
    await planFetch();
    // someone deleted this plan while it was open here: don't bring it back as a nameless copy — keep the ticks on this device instead
    if (!plans[planId] && planCreating !== planId) { planBusy = false; planDirty = false; planErr = pl("gone"); store.local = mine; planId = ""; planSwitch(""); planErr = pl("gone"); planRenderBar(); $("planStatus").textContent = pl("gone"); return; }
    const cur = { ...(plans[planId] || localMeta), ...(planNewName ? { name: planNewName } : {}) };
    // ticks: apply only what changed here, so two officers ticking at once don't undo each other
    const ids = new Set(cur.picked || []);
    for (const id of mine.picked) if (!base.has(id)) ids.add(id);
    for (const id of base) if (!mine.picked.includes(id)) ids.delete(id);
    if (planEdChange) { if (planEdChange.editors) cur.editors = planEdChange.editors; else delete cur.editors; if (planEdChange.owner) cur.owner = planEdChange.owner; }
    if (!planCanEdit(cur) && !planEdChange) { planBusy = false; planDirty = false; planApply(cur); planRenderBar(); $("planStatus").textContent = pl("edNo"); return; }   // restricted meanwhile
    planEdChange = null;
    plans[planId] = { ...cur, picked: [...ids], subs: mine.subs.filter((id) => ids.has(id)), wPower: mine.wPower, wts: mine.wts, counts: mine.counts, tb: mine.tb, by: planWho(), at: Date.now() };
    const res = await pgh("PUT", { message: `Ranking plan: ${cur.name}`.slice(0, 100), content: p64.enc(JSON.stringify(await OfficerData.seal({ plans }), null, 1) + "\n"), sha: planSha || undefined, branch: "main" });
    planSha = res && res.content ? res.content.sha : planSha;
    planBase = new Set(ids); planErr = ""; planNewName = "";
    planDirty = JSON.stringify(planSnapshot()) !== JSON.stringify(mine);   // more edits came in while saving
    if (JSON.stringify([...picked].sort()) !== JSON.stringify([...ids].sort())) { picked = ids; renderAll(); tbRender(); }
  } catch (e) {
    planErr = e.message === "auth" ? pl("noKey") : pl("err");
    if (e.message !== "auth" && tries < 3) setTimeout(() => planSave(tries + 1), 1500 * (tries + 1));
  }
  planBusy = false; planRenderBar();
  if (planDirty) { clearTimeout(planTimer); planTimer = setTimeout(planSave, 800); }
}
async function planPoll() {
  if (!planId || planBusy || planDirty || document.visibilityState !== "visible" || ROOT.hidden) return;
  try {
    const before = planSha; await planFetch();
    if (planSha !== before && plans[planId]) planApply(plans[planId]);
    planRenderBar();
  } catch (e) {}
}
function planSwitch(id) {
  if (!planId) store.local = planSnapshot();   // leaving "only this device": keep it to come back to
  planId = id; store.planId = id; planDirty = false; planBase = null;
  if (id && plans[id]) planApply(plans[id]);
  else if (store.local) { const l = store.local; planApplying = true; picked = new Set(l.picked || []); store.counts = l.counts || {}; TB = Object.assign(tbDefault(), l.tb || {}); setWeights(wtsFrom(l.wts, l.wPower)); renderAll(); tbRender(); planApplying = false; }
  planApplying = true; save(); planApplying = false; planRenderBar();
}
async function plansInit() {
  if (!OFFICER.token) { planId = ""; planRenderBar(); return; }
  $("planStatus").textContent = pl("loading");
  try { await planFetch(); } catch (e) {}
  if (planId && plans[planId]) planApply(plans[planId]); else planId = "";
  planRenderBar();
  setInterval(planPoll, 10000);
  document.addEventListener("visibilitychange", planPoll);
}
$("planSel").onchange = (e) => planSwitch(e.target.value);
$("planEd").addEventListener("change", (e) => {
  const p = plans[planId]; if (!p) return;
  if (e.target.id === "planEdMode") return planSetEditors(e.target.value === "some" ? (p.editors || []) : null);
  const id = e.target.dataset.ed; if (!id) return;
  const ed = new Set(p.editors || []); if (e.target.checked) ed.add(id); else ed.delete(id);
  planSetEditors([...ed]);
});
$("planNew").onclick = async () => {
  const name = (window.prompt(pl("name")) || "").trim(); if (!name) return;
  const start = picked.size && window.confirm(pl("copyQ"));
  const id = Math.random().toString(36).slice(2, 9);
  try { await planFetch(); } catch (e) {}
  const snap = planSnapshot();
  plans[id] = { ...(myId() ? { owner: { id: myId(), name: planWho() } } : {}), name: name.slice(0, 40), picked: start ? snap.picked : [], wPower: snap.wPower, wts: snap.wts, counts: snap.counts, tb: start ? snap.tb : tbDefault(), by: planWho(), at: Date.now() };
  if (!planId) store.local = snap;
  planId = id; store.planId = id; planDirty = false;
  planApply(plans[id]);
  planBase = new Set();   // base empty → the whole tick list counts as this device's change on the first save
  planApplying = true; save(); planApplying = false; planDirty = true; planCreating = id; await planSave(); planCreating = null;
};
$("planRen").onclick = () => {
  const p = plans[planId]; if (!p) return;
  const name = (window.prompt(pl("name"), p.name) || "").trim(); if (!name) return;
  p.name = planNewName = name.slice(0, 40); planDirty = true; planSave(); planRenderBar();
};
$("planDel").onclick = async () => {
  const p = plans[planId]; if (!p || !window.confirm(pl("delQ", { n: planLabel(p) }))) return;
  const id = planId;
  try {
    await planFetch(); delete plans[id];
    const res = await pgh("PUT", { message: `Delete ranking plan: ${p.name}`.slice(0, 100), content: p64.enc(JSON.stringify(await OfficerData.seal({ plans }), null, 1) + "\n"), sha: planSha || undefined, branch: "main" });
    planSha = res && res.content ? res.content.sha : planSha;
  } catch (e) { planErr = pl("err"); }
  planSwitch("");
};
/* 📋 Attendance tab: the freshest shared plans (straight from GitHub when the officer key is there, else the published copy) */
async function freshPlans() {
  if (OFFICER.token) { try { await planFetch(); return plans; } catch (e) {} }
  return plans;
}
OFFICER_PAGES.ranking = { init, applyTexts, setLang, freshPlans };


})();
