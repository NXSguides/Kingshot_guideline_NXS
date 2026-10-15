/* NXS officer page — ranking tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.ranking) */
(function () {
const ROOT = document.getElementById('pg-ranking');
const DATA_URL = "data/roster-x7k2p9.json";
const T = { ko: {"title": "NXS 멤버 순위", "home": "홈", "weights": "① 순위 방식", "power": "총 전투력", "mystic": "신비한 시련", "weightNote": "성검 쟁탈 군단 화면의 부대 전투력. 연맹원 98명 전원을 MightPulse와 대조한 결과 게임의 「이전 점수(Migrant Score)」가 거의 정확히 부대 전투력 × 317이라서, 여기서는 부대 전투력 ≈ 이전 점수 ÷ 323을 씁니다 (평균 오차 1.7%, 상위 20명 전원, 상위 40명 중 39명 일치). 이전 점수가 없는 사람(~ 표시)은 2.70 × 전투력(M) + 0.5 × 신비한 시련 + 8.7 × 도시 레벨 − 296 (오차 약 6.5%). 정확한 값은 게임의 군단 화면이 기준.", "pick": "② 이번 이벤트 참가자 체크", "all": "전체 선택", "none": "선택 해제", "paste": "신청 명단을 붙여넣어 한 번에 체크", "pasteNote": "한 줄에 이름 하나(또는 쉼표로 구분). ♛ 같은 장식과 Nexus 태그는 생략해도 되고, 대소문자는 상관없습니다. (?)는 여러 명이 일치한다는 뜻이니 직접 체크하세요.", "pasteGo": "이 플레이어들 체크", "pasteOk": "{n}명을 체크했습니다.", "pasteMiss": "찾을 수 없음: {list}", "search": "이름 검색…", "colName": "이름", "colRank": "등급", "colTc": "TC", "colActive": "마지막 접속", "rest": "나머지 전원", "events": "④ 이벤트 조 편성", "eventsNote": "위 순위(가중 점수가 높은 순)에 따라 조를 나눕니다.", "n": "{n}명", "result": "③ 순위", "copy": "결과 복사", "copied": "복사했어요!", "colScore": "부대 전투력(추정)", "scoreNote": "추정 부대 전투력, 식은 ①. ~ = 이전 점수 없음, 대체 식 사용으로 덜 정확.", "empty": "아직 체크한 사람이 없습니다.", "selected": "{n} / {t}명 선택", "subN": "(후보 {k}명 포함)", "sub": "후보", "subHint": "체크한 뒤 “후보”를 누르면 후보가 됩니다: 순위에서 빠지고 출석 탭에 후보로 들어갑니다.", "updated": "데이터 업데이트: {t} ({ago})", "members": "멤버 {n}명", "noData": "아직 데이터가 없습니다. GitHub → Actions → “Update Roster (MightPulse)” → Run workflow를 실행한 뒤 이 페이지를 새로고침하세요.", "ago": {"now": "방금", "m": "{n}분 전", "h": "{n}시간 전", "d": "{n}일 전"}, "onlyTicked": "체크한 사람만", "topN": "③ 상위만 표시", "topNAll": "전체", "modeSp": "부대 전투력 추정 (Squad Power fit)", "modeW": "비중 (전투력 / 신비한 시련)", "wNote": "두 항목의 합은 100%입니다. 하나를 바꾸면 다른 하나가 자동으로 조정됩니다.", "colScoreW": "점수", "scoreNoteW": "점수: 각 항목을 체크한 인원 중 최고값 = 100으로 환산한 뒤 비중대로 합산. 신비한 시련 값이 없는 사람은 0 (? 표시)."},
 ar: {"title": "ترتيب أعضاء NXS", "home": "الرئيسية", "weights": "① طريقة الترتيب", "power": "إجمالي القوة", "mystic": "الاختبارات الغامضة", "weightNote": "قوة الفرقة في شاشة الكتيبة في مواجهة أرض السيوف. بمقارنة كل الأعضاء الـ98 مع MightPulse تبيّن أن «نقاط الهجرة» في اللعبة تساوي تقريبًا قوة الفرقة × 317، لذا نستخدم: قوة الفرقة ≈ نقاط الهجرة ÷ 323 (متوسط الخطأ 1.7%، أقوى 20 كلهم صحيحون، 39 من أقوى 40). من لا نقاط هجرة له (علامة ~) يُستخدم له 2.70 × القوة(M) + 0.5 × الاختبارات الغامضة + 8.7 × مستوى المدينة − 296 (خطأ نحو 6.5%). الرقم الحقيقي في شاشة الكتيبة داخل اللعبة.", "pick": "② حدّد المشاركين في هذه الفعالية", "all": "تحديد الكل", "none": "مسح", "paste": "الصق قائمة تسجيل لتحديدهم دفعة واحدة", "pasteNote": "اسم واحد في كل سطر (أو مفصولة بفواصل). يمكن حذف الزخارف مثل ♛ ووسم Nexus؛ حالة الأحرف لا تهم. (?) تعني أن عدة لاعبين مطابقون — حدّد الصحيح يدويًا.", "pasteGo": "حدّد هؤلاء اللاعبين", "pasteOk": "تم تحديد {n} لاعبين.", "pasteMiss": "غير موجود: {list}", "search": "ابحث عن اسم…", "colName": "الاسم", "colRank": "الرتبة", "colTc": "مركز البلدة", "colActive": "آخر ظهور", "rest": "كل الباقين", "events": "④ مجموعات الفعالية", "eventsNote": "تتبع المجموعات الترتيب أعلاه (الأعلى نقاطًا موزونة أولًا).", "n": "{n}", "result": "③ الترتيب", "copy": "نسخ النتيجة", "copied": "تم النسخ!", "colScore": "قوة الفرقة (تقدير)", "scoreNote": "قوة الفرقة المقدّرة، المعادلة في ①. ~ = لا نقاط هجرة، معادلة بديلة أقل دقة.", "empty": "لم يُحدَّد أحد بعد.", "selected": "تم تحديد {n} / {t}", "subN": "(منهم {k} بدلاء)", "sub": "بديل", "subHint": "بعد التحديد اضغط «بديل» لجعله احتياطيًا: لا يدخل الترتيب ويُستورد كبديل في تبويب الحضور.", "updated": "تحديث البيانات: {t} ({ago})", "members": "{n} عضو", "noData": "لا توجد بيانات بعد. اذهب إلى GitHub ← Actions ← “Update Roster (MightPulse)” ← Run workflow، ثم أعد تحميل هذه الصفحة.", "ago": {"now": "الآن", "m": "قبل {n} دقيقة", "h": "قبل {n} ساعة", "d": "قبل {n} يوم"}, "onlyTicked": "المحددون فقط", "topN": "③ عرض الأوائل فقط", "topNAll": "الكل", "modeSp": "تقدير قوة الفرقة (Squad Power fit)", "modeW": "الأوزان (القوة / الاختبارات الغامضة)", "wNote": "المجموع 100% — تغيير أحدهما يعدّل الآخر.", "colScoreW": "النقاط", "scoreNoteW": "النقاط: كل قيمة تُقاس بحيث الأعلى بين المحددين = 100، ثم تُجمع حسب الأوزان. من لا قيمة له في الاختبارات الغامضة يُحتسب 0 (علامة ?)."},
 pt: {"title": "Ranking da lista NXS", "home": "Início", "weights": "① Método de ranking", "power": "Poder total", "mystic": "Prova Mística", "weightNote": "O Poder do Esquadrão da tela da Legião do Confronto entre Espadas. Comparando os 98 membros com o MightPulse, a Pontuação de Migração do jogo é quase exatamente Poder do Esquadrão × 317, então usamos SP ≈ Pontuação de Migração ÷ 323 (erro médio 1,7%, 20/20 do top 20, 39/40 do top 40). Quem não tem Pontuação de Migração (marcado ~) usa 2,70 × Poder(M) + 0,5 × Prova Mística + 8,7 × CC − 296, erro de ~6,5%. O número real está na tela da Legião no jogo.", "pick": "② Marque os participantes deste evento", "all": "Marcar todos", "none": "Limpar", "paste": "Colar uma lista de inscritos para marcar de uma vez", "pasteNote": "Um nome por linha (ou separados por vírgula). Enfeites como ♛ e a tag Nexus podem ficar de fora; maiúsculas não importam. (?) significa que vários jogadores combinam — marque esse à mão.", "pasteGo": "Marcar esses jogadores", "pasteOk": "{n} jogadores marcados.", "pasteMiss": "Não encontrado: {list}", "search": "Buscar um nome…", "colName": "Nome", "colRank": "Cargo", "colTc": "CC", "colActive": "Último acesso", "rest": "todos os restantes", "events": "④ Grupos do evento", "eventsNote": "Os grupos seguem o ranking acima (maior pontuação ponderada primeiro).", "n": "{n}", "result": "③ Ranking", "copy": "Copiar resultado", "copied": "Copiado!", "colScore": "Poder do Esquadrão (est.)", "scoreNote": "Poder do Esquadrão estimado, fórmula em ①. ~ = sem Pontuação de Migração, fórmula alternativa, menos precisa.", "empty": "Ninguém marcado ainda.", "selected": "{n} / {t} marcados", "subN": "(incl. {k} reservas)", "sub": "res", "subHint": "Depois de marcar, toque em “res” para deixar no banco: fora do ranking, importado como reserva na aba Presença.", "updated": "Dados atualizados: {t} ({ago})", "members": "{n} membros", "noData": "Ainda não há dados. Vá ao GitHub → Actions → “Update Roster (MightPulse)” → Run workflow e depois recarregue esta página.", "ago": {"now": "agora mesmo", "m": "há {n} min", "h": "há {n} h", "d": "há {n} d"}, "onlyTicked": "Só os marcados", "topN": "③ Mostrar só os primeiros", "topNAll": "todos", "modeSp": "Estimativa de Poder do Esquadrão (Squad Power fit)", "modeW": "Pesos (Poder / Prova Mística)", "wNote": "Os dois somam 100% — mudar um ajusta o outro.", "colScoreW": "Pontuação", "scoreNoteW": "Pontuação: cada valor é escalado para que o maior entre os marcados = 100, depois combinado pelos pesos. Quem não tem Prova Mística conta como 0 (marcado ?)."},

  zh: {
    title: "NXS 成員排序", home: "回主頁", weights: "① 排序方式", power: "總戰力", mystic: "秘境試煉",
    modeSp: "部隊戰力估算（Squad Power fit）", modeW: "占比（總戰力 / 秘境）", wNote: "兩個加起來是 100%，改一個另一個會自動調整。", colScoreW: "分數", scoreNoteW: "分數算法：兩項各自以「這次勾選的人裡面最高的那個 = 100」換算，再依占比加總。沒有秘境數字的人以 0 計，標 ?。",
    weightNote: "聖劍爭奪 Legion 畫面上的部隊戰力。用全聯盟 98 人的實際數字對過 MightPulse 的資料後發現：遊戲的「遷城分數」幾乎就是部隊戰力 × 317，所以這裡用 部隊戰力 ≈ 遷城分數 ÷ 323（平均誤差 1.7%，前 20 名全中、前 40 名中 39 個）。沒有遷城分數的人（標 ~）改用 2.70 × 總戰力(M) + 0.5 × 秘境分數 + 8.7 × 主城等級 − 296，誤差約 6.5%。正確數字以遊戲裡的 Legion 畫面為準。",
    onlyTicked: "只顯示勾選的人", topN: "③ 只列前幾名", topNAll: "全部",
    pick: "② 勾選這次參戰的人", all: "全選", none: "全部取消",
    paste: "貼上報名名單一次勾選", pasteNote: "一行一個名字（或用逗號分隔）。名字前後的符號和 Nexus 標記可以省略，大小寫沒關係。標 (?) 的表示有好幾個人符合，請手動勾選。",
    pasteGo: "勾選這些人", pasteOk: "已勾選 {n} 人。", pasteMiss: "找不到：{list}",
    search: "搜尋名字…", colName: "名字", colRank: "階級", colTc: "主城", colActive: "上次上線",
    rest: "剩下的人", events: "④ 活動分組", eventsNote: "依上面的排序結果（加權分數高到低）分組。", n: "{n} 人",
    result: "③ 排序結果", copy: "複製結果", copied: "已複製！", colScore: "部隊戰力（估）",
    scoreNote: "估計部隊戰力，公式見 ①。~ = 沒有遷城分數，用備用公式，比較不準。",
    empty: "還沒勾選任何人。", selected: "已選 {n} / {t} 人", subN: "（含替補 {k}）", sub: "替補", subHint: "勾選後按「替補」可改成備取：不進排序，出席分頁會標成替補。",
    updated: "資料更新：{t}（{ago}）", members: "{n} 名成員",
    noData: "還沒有資料。請到 GitHub → Actions → 「Update Roster (MightPulse)」→ Run workflow，跑完後重新整理這頁。",
    ago: { now: "剛剛", m: "{n} 分鐘前", h: "{n} 小時前", d: "{n} 天前" },
  },
  en: {
    title: "NXS Roster Ranking", home: "Home", weights: "① Ranking method", power: "Total Power", mystic: "Mystic Trial",
    modeSp: "Squad Power fit", modeW: "Weights (Power / Mystic)", wNote: "The two add up to 100% — changing one adjusts the other.", colScoreW: "Score", scoreNoteW: "Score: each stat is scaled so the highest among the ticked players = 100, then combined by the weights. Players with no Mystic Trial value count as 0 (marked ?).",
    weightNote: "The Squad Power shown on the Swordland Legion screens. Checking all 98 members against MightPulse showed the game's Migrant Score is almost exactly Squad Power × 317, so this uses SP ≈ Migrant Score ÷ 323 (mean error 1.7%, 20/20 of the top 20, 39/40 of the top 40). Members with no Migrant Score (marked ~) fall back to 2.70 × Power(M) + 0.5 × Mystic Trial + 8.7 × TC − 296, about 6.5% error. The in-game Legion screen is the real number.",
    onlyTicked: "Only ticked", topN: "③ Show top", topNAll: "all",
    pick: "② Tick this event's participants", all: "Select all", none: "Clear",
    paste: "Paste a sign-up list to tick at once", pasteNote: "One name per line (or comma-separated). Decorations like ♛ and the Nexus tag can be left out; case doesn't matter. (?) means several players match — tick that one by hand.",
    pasteGo: "Tick these players", pasteOk: "Ticked {n} players.", pasteMiss: "Not found: {list}",
    search: "Search a name…", colName: "Name", colRank: "Rank", colTc: "TC", colActive: "Last online",
    rest: "everyone left", events: "④ Event groups", eventsNote: "Groups follow the ranking above (highest weighted score first).", n: "{n}",
    result: "③ Ranking", copy: "Copy result", copied: "Copied!", colScore: "Squad Power (est.)",
    scoreNote: "Estimated Squad Power, formula in ①. ~ = no Migrant Score, fallback formula, less accurate.",
    empty: "Nobody ticked yet.", selected: "{n} / {t} selected", subN: "(incl. {k} subs)", sub: "sub", subHint: "After ticking, press “sub” to bench someone: not ranked, imported as a substitute by the Attendance tab.",
    updated: "Data updated: {t} ({ago})", members: "{n} members",
    noData: "No data yet. Go to GitHub → Actions → “Update Roster (MightPulse)” → Run workflow, then reload this page.",
    ago: { now: "just now", m: "{n} min ago", h: "{n} h ago", d: "{n} d ago" },
  },
};
/* ---- Event presets: add a new event by copying one entry. count: null = everyone left ---- */
const PRESETS = [
  { id: "swordland", emoji: "⚔️", name: { en: "Swordland Showdown", zh: "聖劍爭奪" },
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
      let x = a[sortKey], y = b[sortKey];
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
      head = `<tr class="grp" data-r="${lastRank}"><td><input type="checkbox" tabindex="-1" ${on === grp.length ? "checked" : ""}></td><td colspan="5"><b>${esc(rankLabel(m))}</b> <span class="muted">· ${on} / ${grp.length}</span></td></tr>`;
    }
    return head + `
    <tr class="member${picked.has(m.id) ? " on" : ""}" data-id="${m.id}">
      <td><input type="checkbox" ${picked.has(m.id) ? "checked" : ""} tabindex="-1"></td>
      <td class="name" dir="auto">${esc(m.name)}${picked.has(m.id) ? ` <button type="button" class="rk-sub${subs.has(m.id) ? " on" : ""}" data-sub="${m.id}" title="${esc(tr("subHint"))}">${esc(tr("sub"))}</button>` : ""}</td>
      <td>${esc(rankLabel(m))}</td>
      <td class="num">${m.tc ?? "?"}</td>
      <td class="num">${big(m.power)}</td>
      <td class="num">${big(m.mystic)}</td>
    </tr>`;
  }).join("");
  const k = [...picked].filter((id) => subs.has(id)).length;
  $("pickCount").textContent = tr("selected", { n: picked.size, t: data.members.length }) + (k ? " " + tr("subN", { k }) : "");
  ROOT.querySelectorAll("th[data-sort]").forEach((th) => {
    th.textContent = tr(th.dataset.t) + (th.dataset.sort === sortKey ? (sortDir < 0 ? " ▼" : " ▲") : "");
  });
}

/* Squad Power (the number on the Swordland "Legion" screens), checked against MightPulse for all 98 members on 2026-10-14:
   the game's Migrant Score is almost exactly Squad Power × 317 → SP ≈ 0.00309 · migrant + 10 (mean error 1.7%, 20/20 of the top 20).
   Members without a Migrant Score (not on that leaderboard) fall back to the fit on power / Mystic Trial / TC
   (SP ≈ 2.70·power(M) + 0.499·Mystic + 8.7·TC − 296, mean error 6.5%). Refit from new Legion screenshots now and then. */
const SP_FIT = { migrant: 0.00309, migrantC: 10, power: 2.70, mystic: 0.499, tc: 8.7, c: -296 };
const migrantOf = (m) => m.migrant ?? (m.raw && m.raw.ranks && m.raw.ranks.migrant_score) ?? 0;
const squadPower = (m) => migrantOf(m) > 0 ? SP_FIT.migrant * migrantOf(m) + SP_FIT.migrantC
  : Math.max(0, SP_FIT.power * (m.power || 0) / 1e6 + SP_FIT.mystic * (m.mystic || 0) + SP_FIT.tc * (m.tc || 0) + SP_FIT.c);
const spIsFallback = (m) => !(migrantOf(m) > 0);
let topN = store.topN || 0;   // ③ show only the first N of the ranking (0 = all)
let mode = store.mode || "sp";   // "sp" = Squad Power fit · "w" = the old power/mystic weights (still there to compare)
function ranking(all) {
  const sel = data.members.filter((m) => picked.has(m.id) && !subs.has(m.id));   // substitutes stay on the bench
  const maxP = Math.max(1, ...sel.map((m) => m.power || 0)), maxM = Math.max(1, ...sel.map((m) => m.mystic || 0)), wp = wPower / 100;
  const score = (m) => mode === "w" ? 100 * (wp * (m.power || 0) / maxP + (1 - wp) * (m.mystic || 0) / maxM) : squadPower(m);
  const r = sel.map((m) => ({ ...m, score: score(m) })).sort((a, b) => b.score - a.score);
  return !all && topN > 0 ? r.slice(0, topN) : r;
}

function renderResult() {
  setTimeout(renderPresets, 0);
  setTimeout(() => { if (typeof tbRender === "function") tbRender(); }, 0);
  const r = ranking();
  $("result").innerHTML = r.length ? r.map((m, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td class="name"><span dir="auto">${esc(m.name)}</span><div style="font-size:12px;opacity:.65;font-variant-numeric:tabular-nums;user-select:all">ID ${esc(m.id)}</div></td>
      <td class="num">${mode !== "w" && spIsFallback(m) ? "~" : ""}${m.score.toFixed(mode === "w" ? 1 : 0)}<span class="bar" style="width:${Math.round(mode === "w" ? m.score * 0.6 : m.score / 20)}px"></span></td>
      <td class="num">${big(m.power)}</td>
      <td class="num">${m.mystic == null ? '<span class="warn">?</span>' : big(m.mystic)}</td>
    </tr>`).join("") : `<tr><td colspan="5" class="empty">${tr("empty")}</td></tr>`;
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
  if (!picked.size) { $("presetOut").innerHTML = `<p class="empty">${tr("empty")}</p>`; return; }
  $("presetOut").innerHTML = `<div class="grp-out">` + presetGroups(pr).map(({ g, list }) => `
    <h3>${esc(g.name[lang] || ptOf(g.name.en))} <span class="muted">(${tr("n", { n: list.length })})</span></h3>
    ${list.length ? `<ol>${list.map((m) => `<li dir="auto">${esc(m.name)} <span class="muted">· ${m.score.toFixed(mode === "w" ? 1 : 0)}</span></li>`).join("")}</ol>` : `<div class="muted">—</div>`}`).join("") + `</div>`;
}
function renderAll() { applyTexts(); renderList(); renderResult(); }
function persist() { store.picked = [...picked]; store.subs = [...picked].filter((id) => subs.has(id)); store.wPower = wPower; store.topN = topN; store.mode = mode; store.sortKey = sortKey; store.sortDir = sortDir; store.lang = lang; save(); }

function setWeights(p) {
  wPower = Math.min(100, Math.max(0, Math.round(Number(p) || 0)));
  $("wPower").value = wPower; $("wMystic").value = 100 - wPower;
  persist(); renderResult();
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
  setWeights(wPower);
  renderAll();
  plansInit();
}

function setLang(l) { lang = l; persist(); if (data) renderAll(); else applyTexts(); };
$("rk_q").oninput = renderList;
$("rk_onlyTicked").onchange = renderList;
$("wPower").oninput = (e) => setWeights(e.target.value);
$("wMystic").oninput = (e) => setWeights(100 - (Number(e.target.value) || 0));
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
  const sb = e.target.closest("button.rk-sub");
  if (sb) { const id = Number(sb.dataset.sub) || sb.dataset.sub; subs.has(id) ? subs.delete(id) : subs.add(id); persist(); renderList(); renderResult(); return; }
  const row = e.target.closest("tr.member"); if (!row) return;
  const id = Number(row.dataset.id) || row.dataset.id;
  picked.has(id) ? (picked.delete(id), subs.delete(id)) : picked.add(id);
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
  const r = ranking();
  const text = r.map((m, i) => `${i + 1}. ${m.name} (ID ${m.id}) — ${m.score.toFixed(mode === "w" ? 1 : 0)}`).join("\n");
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
const TT = { ko: {"title": "⑤ 전투 배치표", "note": "목록에서 사람을 고른 뒤 칸을 눌러 배치하세요(컴퓨터에서는 드래그도 가능). ×를 누르면 제거됩니다.", "setup": "표 설정", "stages": "단계", "targets": "목표", "cols": "열 이름", "sep": "(쉼표로 구분)", "shortNames": "짧은 이름 (亗, Nexus 같은 장식 제거)", "draft": "순위로 초안 자동 작성", "draftNote": "④의 Attackers / Defenders 인원수를 사용합니다.", "clear": "표 비우기", "addGroup": "+ 조", "addRow": "+ 행", "delGroup": "조 삭제", "dupRow": "행 복사", "delRow": "행 삭제", "pool": "인원 — 점수 기준 추천 역할 (이름을 누른 뒤 칸을 누르세요)", "poolEmpty": "먼저 ②에서 참가자를 체크하세요.", "addText": "+ 텍스트", "textPrompt": "추가할 텍스트 (예: Stays behind)", "image": "🖼️ 이미지 만들기", "text": "📋 텍스트 복사", "toPost": "📢 새 공지에 사용", "saveHint": "휴대폰: 이미지를 길게 눌러 저장하세요.", "download": "다운로드", "close": "닫기", "confirmClear": "표 전체를 비울까요?", "confirmDraft": "현재 표를 새 초안으로 바꿀까요?", "copied": "복사했어요!", "group": "조", "picked": "선택됨:"},
 ar: {"title": "⑤ جدول المعركة", "note": "اختر أشخاصًا من القائمة، ثم انقر على خانة لوضعهم فيها (على الكمبيوتر يمكنك السحب أيضًا). انقر × للإزالة.", "setup": "إعداد الجدول", "stages": "المراحل", "targets": "الأهداف", "cols": "الأعمدة", "sep": "(افصل بفواصل)", "shortNames": "أسماء مختصرة (بدون زخارف مثل 亗 وNexus)", "draft": "املأ مسودة أولى من الترتيب", "draftNote": "يستخدم أعداد المهاجمين / المدافعين من ④.", "clear": "مسح الجدول", "addGroup": "+ مجموعة", "addRow": "+ صف", "delGroup": "حذف المجموعة", "dupRow": "نسخ الصف", "delRow": "حذف الصف", "pool": "الأشخاص — أدوار مقترحة حسب النقاط (انقر على واحد، ثم على خانة)", "poolEmpty": "حدّد المشاركين في ② أولًا.", "addText": "+ نص", "textPrompt": "النص المراد إضافته (مثلًا: يبقى في الخلف)", "image": "🖼️ إنشاء صورة", "text": "📋 نسخ النص", "toPost": "📢 استخدام في إعلان جديد", "saveHint": "الهاتف: اضغط مطولًا على الصورة لحفظها.", "download": "تنزيل", "close": "إغلاق", "confirmClear": "مسح الجدول بالكامل؟", "confirmDraft": "استبدال الجدول بمسودة جديدة؟", "copied": "تم النسخ!", "group": "مجموعة", "picked": "المحدد:"},
 pt: {"title": "⑤ Tabela de batalha", "note": "Escolha pessoas na lista e toque numa caixa para colocá-las lá (no computador também dá para arrastar). Toque em × para remover.", "setup": "Configurar tabela", "stages": "Etapas", "targets": "Alvos", "cols": "Colunas", "sep": "(separe com vírgulas)", "shortNames": "Nomes curtos (sem enfeites como 亗 e Nexus)", "draft": "Montar um rascunho pelo ranking", "draftNote": "Usa os números de Attackers / Defenders do ④.", "clear": "Limpar tabela", "addGroup": "+ Grupo", "addRow": "+ Linha", "delGroup": "Excluir grupo", "dupRow": "Copiar linha", "delRow": "Excluir linha", "pool": "Pessoas — funções sugeridas pela pontuação (toque numa, depois numa caixa)", "poolEmpty": "Marque os participantes no ② primeiro.", "addText": "+ texto", "textPrompt": "Texto para adicionar (ex.: Stays behind)", "image": "🖼️ Gerar imagem", "text": "📋 Copiar texto", "toPost": "📢 Usar num novo anúncio", "saveHint": "No celular: toque e segure a imagem para salvar.", "download": "Baixar", "close": "Fechar", "confirmClear": "Limpar a tabela inteira?", "confirmDraft": "Trocar a tabela por um novo rascunho?", "copied": "Copiado!", "group": "Grupo", "picked": "Selecionado:"},

  en: {
    title: "⑤ Battle table", note: "Pick people from the list, then tap a box to put them there (on a computer you can also drag). Tap × to remove.",
    setup: "Table setup", stages: "Stages", targets: "Targets", cols: "Columns", sep: "(separate with commas)",
    shortNames: "Short names (drop decorations like 亗 and Nexus)",
    draft: "Fill a first draft from the ranking", draftNote: "Uses the Attackers / Defenders numbers from ④.",
    clear: "Clear table", addGroup: "+ Group", addRow: "+ Row", delGroup: "Delete group", dupRow: "Copy row", delRow: "Delete row",
    pool: "People — suggested roles by score (tap one, then tap a box)", poolEmpty: "Tick participants in ② first.",
    addText: "+ text", textPrompt: "Text to add (e.g. Stays behind)",
    image: "🖼️ Make image", text: "📋 Copy text", toPost: "📢 Use in a new announcement",
    saveHint: "Phone: press and hold the picture to save it.", download: "Download", close: "Close",
    confirmClear: "Clear the whole table?", confirmDraft: "Replace the table with a new draft?", copied: "Copied!",
    group: "Group", picked: "Selected:",
  },
  zh: {
    title: "⑤ 戰鬥分工表", note: "先點上方的名字，再點要放的格子（電腦上也可以直接拖曳）。點 × 移除。",
    setup: "表格設定", stages: "階段", targets: "目標", cols: "欄位名稱", sep: "（用逗號分隔）",
    shortNames: "簡短名字（去掉亗、Nexus 這些裝飾）",
    draft: "依排序自動排一份草稿", draftNote: "使用 ④ 裡 Attackers／Defenders 的人數。",
    clear: "清空表格", addGroup: "+ 新增組", addRow: "+ 新增列", delGroup: "刪除這組", dupRow: "複製這列", delRow: "刪除這列",
    pool: "人員 — 依分數建議的角色（先點名字，再點格子）", poolEmpty: "請先在 ② 勾選參戰的人。",
    addText: "+ 文字", textPrompt: "要加入的文字（例如 Stays behind）",
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
    stages: "Stage 1, Stage 2", targets: "1, 2, 3, 4, 5, 6, 7", short: true,
    cols: { att: "Attackers", stage: "Stage", target: "Target", def: "Defenders", join: "Joiners", note: "Note" },
    show: { att: true, stage: true, target: true, def: true, join: true, note: false },
    groups: [],
  };
}
let TB = (() => { try { return Object.assign(tbDefault(), JSON.parse(localStorage.getItem(TB_LS)) || {}); } catch (e) { return tbDefault(); } })();
const tbSave = () => { try { localStorage.setItem(TB_LS, JSON.stringify(TB)); } catch (e) {} planTouched(); };
let tbPick = null;          // selected chip: { kind: "p", id } | { kind: "t", text }
let tbUid = Date.now();
const newRow = (stage = "") => ({ id: ++tbUid, att: [], stage, target: "", def: [], join: [], note: "" });

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
  TB.groups.forEach((g) => g.rows.forEach((r) => PEOPLE_COLS.forEach((k) => r[k].forEach((x) => { if (x.kind === "p") c[x.id] = (c[x.id] || 0) + 1; }))));
  return c;
}

function tbRender() {
  const host = $("tbCard"); if (!host || !data) return;
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
    <div class="muted msg" style="margin:0 0 10px">${esc(tt("note"))}</div>
    <details class="tb-setup"><summary>${esc(tt("setup"))}</summary>
      <label class="f">${esc(tt("stages"))} <span class="muted">${esc(tt("sep"))}</span><input type="text" data-set="stages" value="${esc(TB.stages)}"></label>
      <label class="f">${esc(tt("targets"))} <span class="muted">${esc(tt("sep"))}</span><input type="text" data-set="targets" value="${esc(TB.targets)}"></label>
      <div class="f">${esc(tt("cols"))}</div>
      <div class="tb-cols">${COL_KEYS.map((k) => `<label><input type="checkbox" data-show="${k}" ${TB.show[k] ? "checked" : ""}><input type="text" data-col="${k}" value="${esc(TB.cols[k])}"></label>`).join("")}</div>
      <label class="row" style="margin-top:8px"><input type="checkbox" data-set="short" ${TB.short ? "checked" : ""}> ${esc(tt("shortNames"))}</label>
    </details>
    <div class="row" style="margin:10px 0">
      <button class="btn" data-act="draft">✨ ${esc(tt("draft"))}</button>
      <button class="btn" data-act="clear">${esc(tt("clear"))}</button>
    </div>
    <div class="muted" style="font-size:12px;margin:-4px 0 8px">${esc(tt("draftNote"))}</div>
    <div class="tb-sticky"><div class="tb-pool-h">${esc(tt("pool"))}${tbPick ? ` · <b>${esc(tt("picked"))} ${esc(chipLabel(tbPick))}</b>` : ""}</div>
    <div class="tb-counts">${swPreset.groups.map((g, gi) => g.count == null ? "" : `<label>${esc(g.name[lang] || ptOf(g.name.en))} <input type="number" min="0" max="99" data-rolecount="${gi}" value="${groupCount(swPreset, gi)}"></label>`).join("")}</div>
    <div class="tb-pool">${pool.length ? roleGroups.map(({ g, list }, ri) => list.length ? `<div class="tb-role r${ri}"><div class="tb-role-h">${esc(g.name[lang] || ptOf(g.name.en))} <span>(${list.length})</span></div>${list.map((m) => `<span class="tb-chip pool r${ri}${tbPick && tbPick.kind === "p" && String(tbPick.id) === String(m.id) ? " on" : ""}" draggable="true" data-pid="${m.id}">${esc(TB.short ? shortName(m.name) : m.name)}${counts[m.id] ? `<i>${counts[m.id]}</i>` : ""}</span>`).join("")}</div>` : "").join("") : `<span class="muted">${esc(tt("poolEmpty"))}</span>`}</div></div>
    ${TB.groups.map((g, gi) => `
      <div class="tb-group" style="border-color:${g.color};background:color-mix(in srgb, ${g.color} 22%, var(--panel))">
        <div class="tb-ghead">
          <span class="tb-swatches">${TB_COLORS.map((c) => `<span class="tb-sw${c === g.color ? " on" : ""}" style="background:${c}" data-color="${c}" data-g="${gi}"></span>`).join("")}</span>
          <button class="btn small" data-act="delGroup" data-g="${gi}">${esc(tt("delGroup"))}</button>
        </div>
        ${g.rows.map((r, ri) => `
          <div class="tb-row">
            <div class="tb-rowtop">
              ${TB.show.stage ? `<label class="tb-in"><span>${esc(TB.cols.stage)}</span><input list="tbStages" data-g="${gi}" data-r="${ri}" data-field="stage" value="${esc(r.stage)}"></label>` : ""}
              ${TB.show.target ? `<label class="tb-in"><span>${esc(TB.cols.target)}</span><input list="tbTargets" data-g="${gi}" data-r="${ri}" data-field="target" value="${esc(r.target)}"></label>` : ""}
              <span class="tb-rowbtns"><button class="btn small" data-act="dupRow" data-g="${gi}" data-r="${ri}" title="${esc(tt("dupRow"))}">⧉</button><button class="btn small" data-act="delRow" data-g="${gi}" data-r="${ri}" title="${esc(tt("delRow"))}">🗑</button></span>
            </div>
            ${PEOPLE_COLS.filter((k) => TB.show[k]).map((k) => cell(g, gi, r, ri, k)).join("")}
            ${TB.show.note ? `<label class="tb-in wide"><span>${esc(TB.cols.note)}</span><input data-g="${gi}" data-r="${ri}" data-field="note" value="${esc(r.note)}"></label>` : ""}
          </div>`).join("")}
        <button class="btn small" data-act="addRow" data-g="${gi}">${esc(tt("addRow"))}</button>
      </div>`).join("")}
    <div class="row" style="margin-top:10px"><button class="btn" data-act="addGroup">${esc(tt("addGroup"))}</button></div>
    <div class="row" style="margin-top:14px">
      <button class="btn primary" data-act="image">${esc(tt("image"))}</button>
      <button class="btn" data-act="text">${esc(tt("text"))}</button>
    </div>
    <datalist id="tbStages">${stageOpts.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>
    <datalist id="tbTargets">${targetOpts.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>`;
}

/* ----- editing ----- */
function tbPut(gi, ri, k, chip) {
  const arr = TB.groups[gi].rows[ri][k];
  if (chip.kind === "p" && arr.some((x) => x.kind === "p" && String(x.id) === String(chip.id))) return;
  arr.push(chip);
}
function tbDraft() {
  const pr = PRESETS.find((x) => x.id === "swordland");
  const A = groupCount(pr, 0), D = groupCount(pr, 1);
  const r = ranking(); if (!r.length) return;
  const nG = Math.max(1, Math.min(A, r.length));
  const stage = listOf(TB.stages)[0] || "";
  TB.groups = Array.from({ length: nG }, (_, i) => ({ color: TB_COLORS[i % TB_COLORS.length], rows: [newRow(stage)] }));
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
  if (t.dataset.del) { const c = t.closest(".tb-chip"); TB.groups[c.dataset.g].rows[c.dataset.r][c.dataset.k].splice(c.dataset.x, 1); tbSave(); tbRender(); return; }
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
  if (act === "addGroup") TB.groups.push({ color: TB_COLORS[TB.groups.length % TB_COLORS.length], rows: [newRow(listOf(TB.stages)[0] || "")] });
  if (act === "delGroup") TB.groups.splice(gi, 1);
  if (act === "addRow") TB.groups[gi].rows.push(newRow(listOf(TB.stages)[0] || ""));
  if (act === "delRow") TB.groups[gi].rows.splice(ri, 1);
  if (act === "dupRow") { const r = JSON.parse(JSON.stringify(TB.groups[gi].rows[ri])); r.id = ++tbUid; TB.groups[gi].rows.splice(Number(ri) + 1, 0, r); }
  if (act === "clear") { if (!window.confirm(tt("confirmClear"))) return; TB.groups = []; }
  if (act === "draft") { if (TB.groups.length && !window.confirm(tt("confirmDraft"))) return; tbDraft(); }
  if (act === "image") return tbImage();
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
  if (t.dataset.field) { TB.groups[t.dataset.g].rows[t.dataset.r][t.dataset.field] = t.value; tbSave(); return; }
  if (t.dataset.set === "short") { TB.short = t.checked; tbSave(); tbRender(); return; }
  if (t.dataset.set) { TB[t.dataset.set] = t.value; tbSave(); return; }
  if (t.dataset.col) { TB.cols[t.dataset.col] = t.value; tbSave(); return; }
  if (t.dataset.show) { TB.show[t.dataset.show] = t.checked; tbSave(); tbRender(); return; }
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
  if (tbDrag.from) { const [g, r, k, x] = tbDrag.from; TB.groups[g].rows[r][k].splice(x, 1); }
  tbPut(cl.dataset.g, cl.dataset.r, cl.dataset.k, tbDrag.chip);
  tbDrag = null; tbSave(); tbRender();
}

/* ----- output ----- */
function tbRowsFlat() {
  const cols = COL_KEYS.filter((k) => TB.show[k]);
  const rows = [];
  TB.groups.forEach((g) => g.rows.forEach((r) => rows.push({ color: g.color, cells: cols.map((k) => PEOPLE_COLS.includes(k) ? r[k].map(chipLabel).join(", ") : (r[k] || "")) })));
  return { cols, head: cols.map((k) => TB.cols[k]), rows };
}
function tbCopyText(btn) {
  const { head, rows } = tbRowsFlat();
  const text = [head.join(" | "), ...rows.map((r) => r.cells.map((c) => c || "—").join(" | "))].join("\n");
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => {
    const ta = document.createElement("textarea"); ta.value = text; ROOT.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  });
  const old = btn.textContent; btn.textContent = tt("copied"); setTimeout(() => (btn.textContent = old), 1500);
}
function tbImage() {
  const { head, rows } = tbRowsFlat();
  const S = 2, pad = 8, lineH = 20, font = '15px "Noto Sans TC","Noto Sans KR","Noto Sans",Arial,sans-serif', bold = 'bold ' + font;
  const cv = document.createElement("canvas"), g = cv.getContext("2d");
  const maxW = [230, 110, 150, 330, 330, 260];
  g.font = font;
  const widths = head.map((h, i) => {
    g.font = bold; let w = g.measureText(h).width;
    g.font = font; rows.forEach((r) => { w = Math.max(w, Math.min(g.measureText(r.cells[i]).width, maxW[i] || 300)); });
    return Math.ceil(Math.min(w, maxW[i] || 300) + pad * 2);
  });
  const wrap = (text, w) => {
    g.font = font; const out = []; let line = "";
    for (const word of String(text).split(/\s+/)) {
      const tryL = line ? line + (line.endsWith(",") ? " " : " ") + word : word;
      if (g.measureText(tryL).width <= w || !line) line = tryL; else { out.push(line); line = word; }
    }
    if (line) out.push(line); return out.length ? out : [""];
  };
  const lines = rows.map((r) => r.cells.map((c, i) => wrap(c, widths[i] - pad * 2)));
  const heights = lines.map((ls) => Math.max(...ls.map((l) => l.length)) * lineH + pad * 2);
  const headH = lineH + pad * 2, W = widths.reduce((a, b) => a + b, 0) + 1, H = headH + heights.reduce((a, b) => a + b, 0) + 1;
  cv.width = W * S; cv.height = H * S; g.scale(S, S);
  g.fillStyle = "#fff"; g.fillRect(0, 0, W, H); g.strokeStyle = "#9a9a9a"; g.lineWidth = 1; g.textBaseline = "top";
  let x = 0.5;
  head.forEach((h, i) => { g.font = bold; g.fillStyle = "#000"; g.fillText(h, x + pad, pad + 2); g.strokeRect(x, 0.5, widths[i], headH); x += widths[i]; });
  let y = headH + 0.5;
  rows.forEach((r, ri) => {
    x = 0.5;
    r.cells.forEach((c, i) => {
      g.fillStyle = r.color; g.fillRect(x, y, widths[i], heights[ri]);
      g.strokeRect(x, y, widths[i], heights[ri]);
      g.font = font; g.fillStyle = "#111";
      lines[ri][i].forEach((l, li) => g.fillText(l, x + pad, y + pad + 2 + li * lineH));
      x += widths[i];
    });
    y += heights[ri];
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
const PL = { ko: {"title": "📋 계획", "local": "🔒 이 기기에만", "newP": "+ 새 공유 계획", "ren": "이름 변경", "del": "삭제", "name": "공유 계획 이름 (예: 군단 1)", "copyQ": "지금 체크된 인원으로 시작할까요? (취소 = 빈 상태로 시작)", "delQ": "공유 계획 “{n}”을(를) 모두에게서 삭제할까요?", "localNote": "여기서 변경한 내용은 이 기기에만 남습니다.", "shared": "🔄 공유됨 — 모든 간부가 같은 체크와 표를 봅니다.", "last": "마지막 변경: {who} · {t}", "saving": "저장 중…", "saved": "✓ 저장됨", "err": "저장하지 못했습니다 — 다시 시도하는 중…", "noKey": "공유 계획에는 간부 GitHub 키가 필요합니다(공지 탭).", "loading": "공유 계획 불러오는 중…"},
 ar: {"title": "📋 الخطة", "local": "🔒 على هذا الجهاز فقط", "newP": "+ خطة مشتركة جديدة", "ren": "إعادة تسمية", "del": "حذف", "name": "اسم الخطة المشتركة (مثل الكتيبة 1)", "copyQ": "البدء بالأشخاص المحددين الآن؟ (إلغاء = البدء فارغة)", "delQ": "حذف الخطة المشتركة “{n}” للجميع؟", "localNote": "التغييرات هنا تبقى على هذا الجهاز فقط.", "shared": "🔄 مشتركة — يرى كل المسؤولين نفس العلامات والجدول.", "last": "آخر تغيير: {who} · {t}", "saving": "جارٍ الحفظ…", "saved": "✓ تم الحفظ", "err": "تعذّر الحفظ — جارٍ إعادة المحاولة…", "noKey": "الخطط المشتركة تتطلب مفتاح GitHub للمسؤولين (تبويب النشر).", "loading": "جارٍ تحميل الخطط المشتركة…"},
 pt: {"title": "📋 Plano", "local": "🔒 Só neste aparelho", "newP": "+ Novo plano compartilhado", "ren": "Renomear", "del": "Excluir", "name": "Nome do plano compartilhado (ex.: Legião 1)", "copyQ": "Começar com as pessoas marcadas agora? (Cancelar = começar vazio)", "delQ": "Excluir o plano compartilhado “{n}” para todos?", "localNote": "As mudanças aqui ficam só neste aparelho.", "shared": "🔄 Compartilhado — todos os oficiais veem as mesmas marcações e a mesma tabela.", "last": "Última mudança: {who} · {t}", "saving": "Salvando…", "saved": "✓ Salvo", "err": "Não foi possível salvar — tentando de novo…", "noKey": "Planos compartilhados precisam da chave do GitHub dos oficiais (aba Post).", "loading": "Carregando planos compartilhados…"},

  en: { title: "📋 Plan", local: "🔒 Only on this device", newP: "+ New shared plan", ren: "Rename", del: "Delete",
        name: "Name of the shared plan (e.g. Legion 1)", copyQ: "Start it with the people ticked now? (Cancel = start empty)",
        delQ: "Delete the shared plan “{n}” for everyone?", localNote: "Changes here stay on this device only.",
        shared: "🔄 Shared — every officer sees the same ticks and table.", last: "Last change: {who} · {t}", saving: "Saving…", saved: "✓ Saved",
        err: "Couldn't save — trying again…", noKey: "Shared plans need the officer GitHub key (Post tab).", loading: "Loading shared plans…" },
  zh: { title: "📋 方案", local: "🔒 只在這台裝置", newP: "+ 新增共用方案", ren: "改名", del: "刪除",
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
let planNewName = "";
let plans = {}, planSha = null, planId = store.planId || "", planBase = null, planDirty = false, planBusy = false, planTimer = null, planErr = "", planApplying = false;
const planWho = () => (OFFICER.user && OFFICER.user.name) || (() => { try { return JSON.parse(localStorage.getItem("nxs-post-v1") || "{}").author || ""; } catch (e) { return ""; } })() || "?";
async function planFetch() {
  const f = await pgh("GET");
  if (!f) { plans = {}; planSha = null; return; }
  planSha = f.sha;
  const d = await OfficerData.open(JSON.parse(p64.dec(f.content)));
  plans = (d && d.plans) || {};
}
function planSnapshot() { return { picked: [...picked], subs: [...picked].filter((id) => subs.has(id)), wPower, counts: JSON.parse(JSON.stringify(store.counts || {})), tb: JSON.parse(JSON.stringify(TB)) }; }
/* put a plan's contents on screen (keeping ticks this device hasn't saved yet) */
function planApply(p) {
  planApplying = true;
  let ids = new Set(p.picked || []);
  if (planDirty && planBase) { for (const id of picked) if (!planBase.has(id)) ids.add(id); for (const id of planBase) if (!picked.has(id)) ids.delete(id); }
  else planBase = new Set(p.picked || []);
  picked = ids;
  if (!planDirty) subs = new Set((p.subs || []).filter((id) => ids.has(id)));
  if (!planDirty) { store.counts = p.counts || {}; TB = Object.assign(tbDefault(), p.tb || {}); setWeights(p.wPower ?? 40); }
  renderAll(); tbRender(); renderPresets && renderPresets();
  planApplying = false;
}
function planRenderBar() {
  $("planTitle").textContent = pl("title");
  $("planNew").textContent = pl("newP"); $("planRen").textContent = pl("ren"); $("planDel").textContent = pl("del");
  const ids = Object.keys(plans).sort((a, b) => (plans[a].name || "").localeCompare(plans[b].name || ""));
  $("planSel").innerHTML = `<option value="">${esc(pl("local"))}</option>` + ids.map((id) => `<option value="${esc(id)}">🔄 ${esc(plans[id].name || id)}</option>`).join("");
  if (planId && !plans[planId]) planId = "";
  $("planSel").value = planId;
  $("planRen").hidden = $("planDel").hidden = !planId;
  const p = planId && plans[planId];
  $("planStatus").textContent = !OFFICER.token ? pl("noKey") : !p ? pl("localNote")
    : [pl("shared"), p.by ? pl("last", { who: p.by, t: new Date(p.at).toISOString().slice(5, 16).replace("-", "/").replace("T", " ") + " UTC" }) : "", planBusy ? pl("saving") : planErr || (planDirty ? "" : "")].filter(Boolean).join(" · ");
}
/* local edits while a shared plan is open → save a moment later */
function planTouched() {
  if (!planId || planApplying) return;
  planDirty = true; clearTimeout(planTimer); planTimer = setTimeout(planSave, 1200);
}
async function planSave(tries = 0) {
  if (!planId || !planDirty || planBusy) return;
  planBusy = true; planRenderBar();
  const mine = planSnapshot(), base = planBase || new Set(), localMeta = plans[planId] || { name: "?" };
  try {
    await planFetch();
    const cur = { ...(plans[planId] || localMeta), ...(planNewName ? { name: planNewName } : {}) };
    // ticks: apply only what changed here, so two officers ticking at once don't undo each other
    const ids = new Set(cur.picked || []);
    for (const id of mine.picked) if (!base.has(id)) ids.add(id);
    for (const id of base) if (!mine.picked.includes(id)) ids.delete(id);
    plans[planId] = { ...cur, picked: [...ids], subs: mine.subs.filter((id) => ids.has(id)), wPower: mine.wPower, counts: mine.counts, tb: mine.tb, by: planWho(), at: Date.now() };
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
  else if (store.local) { const l = store.local; planApplying = true; picked = new Set(l.picked || []); store.counts = l.counts || {}; TB = Object.assign(tbDefault(), l.tb || {}); setWeights(l.wPower ?? 40); renderAll(); tbRender(); planApplying = false; }
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
$("planNew").onclick = async () => {
  const name = (window.prompt(pl("name")) || "").trim(); if (!name) return;
  const start = picked.size && window.confirm(pl("copyQ"));
  const id = Math.random().toString(36).slice(2, 9);
  try { await planFetch(); } catch (e) {}
  const snap = planSnapshot();
  plans[id] = { name: name.slice(0, 40), picked: start ? snap.picked : [], wPower: snap.wPower, counts: snap.counts, tb: start ? snap.tb : tbDefault(), by: planWho(), at: Date.now() };
  if (!planId) store.local = snap;
  planId = id; store.planId = id; planDirty = false;
  planApply(plans[id]);
  planBase = new Set();   // base empty → the whole tick list counts as this device's change on the first save
  planApplying = true; save(); planApplying = false; planDirty = true; planSave();
};
$("planRen").onclick = () => {
  const p = plans[planId]; if (!p) return;
  const name = (window.prompt(pl("name"), p.name) || "").trim(); if (!name) return;
  p.name = planNewName = name.slice(0, 40); planDirty = true; planSave(); planRenderBar();
};
$("planDel").onclick = async () => {
  const p = plans[planId]; if (!p || !window.confirm(pl("delQ", { n: p.name }))) return;
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
