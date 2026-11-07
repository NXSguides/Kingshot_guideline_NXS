/* NXS officer page — ⚡ Opponents now (Sherry 2026-11-07; Project doc claude/pvp-opponent-data-handoff.md).
   A card at the bottom of 🔭 Scout (⚔️ Battle tab): during a battle, fetch other kingdoms' players from MightPulse right away,
   in batches (top 5 first, then 6–20, 21–50, 51–100), find a player's ID by name, and download the latest batch (JSON + CSV)
   for the analysis chat. The request is encrypted (data/opp-request-x7k2p9.json) and starts .github/workflows/opp-now.yml
   (scripts/opp-now.js), which adds to one encrypted file per UTC day: data/opp/YYYY-MM-DD-x7k2p9.json. Officer page only. */
(function () {
const esc = OFFICER.util.esc;
const REQ = "data/opp-request-x7k2p9.json", DIR = "data/opp", OUR = 2189;
const ALLB = ["personal_power", "troop_power", "gov_gear", "gov_charm", "research_power", "hero_equip", "pet_power", "master_power", "single_hero", "hero_total", "migrant_score"];
const PICK = ["personal_power", "troop_power", "gov_gear", "hero_equip", "master_power"];
const STEPS = [[1, 5], [6, 20], [21, 50], [51, 100]];
const T = {
  en: { h: "⚡ Opponents now", note: "During a battle: fetch other kingdoms' players from MightPulse right away (power, the 9 combat boards, heroes and hero gear) for the analysis chat. Top 5 per kingdom first, then the next batch. Anyone already fetched today is skipped. Kingdom top 100 only (MightPulse limit). Saved encrypted, officers only.",
    kids: "Kingdoms", kidsPh: "e.g. 2186 2201", batch: "Batch", boards: "Rank by", ids: "Extra player IDs", idsPh: "space-separated", al: "Alliance member lists (gives everyone's ID)", alPh: "kingdom:TAG, e.g. 2186:ABC",
    go: "⚡ Fetch now", est: "This batch: ~{c} MightPulse calls, about {s}.", quota: "Daily allowance ~5,000 calls, shared with the roster / Scout / history jobs. {q}", qHdr: "MightPulse says: {v}.", qNone: "This tool used {n} calls today (MightPulse doesn't report what's left).",
    sending: "Sending…", sent: "Requested {t} — usually 1–3 min. This card updates by itself.", wait: "Still fetching…", done: "✅ Batch done: {n} players ({k} new, {s} already had). Next batch is set below.",
    noKey: "Needs the officer login (GitHub key).", needKid: "Type at least one kingdom number (or IDs / an alliance).", err: "Couldn't send the request — try again.",
    dlH: "⬇️ Download", dlBatch: "Latest batch (JSON)", dlCsv: "Latest batch summary (CSV)", dlDay: "Everything today (JSON)", none: "Nothing fetched today yet.", last: "Latest batch: {t} · {n} players · kingdoms {k}",
    findH: "🔎 Find a player's ID by name", findPh: "name (part of it is enough)", findNote: "Searches what we already have: today's batches and alliance lists, today's / yesterday's MightPulse history, 🔭 Scout. MightPulse itself has no name search — if someone isn't found, fetch their alliance's member list above.",
    noHit: "No match.", add: "+ add", added: "added", src: { opp: "today", hist: "history", scout: "Scout", al: "alliance list" } },
  zh: { h: "⚡ 戰時抓對手", note: "戰鬥中用：馬上從 MightPulse 抓其他王國的玩家（戰力、9 個戰鬥排行、英雄和英雄裝備），給分析聊天用。每個王國先抓前 5 名，再抓下一批；今天已經抓過的人會跳過。只看得到王國前 100 名（MightPulse 的限制）。加密儲存，只有幹部看得到。",
    kids: "王國", kidsPh: "例如 2186 2201", batch: "這一批", boards: "照哪個排行排", ids: "另外指定的玩家 ID", idsPh: "用空格隔開", al: "聯盟成員名單（可以拿到每個人的 ID）", alPh: "王國:聯盟縮寫，例如 2186:ABC",
    go: "⚡ 現在抓", est: "這一批：約 {c} 次 MightPulse 查詢，大約 {s}。", quota: "每天約 5,000 次，跟名冊／偵察／歷史排程共用。{q}", qHdr: "MightPulse 回報：{v}。", qNone: "這個工具今天用了 {n} 次（MightPulse 不回報剩餘額度）。",
    sending: "送出中…", sent: "已送出 {t}——通常 1–3 分鐘，這張卡會自己更新。", wait: "還在抓…", done: "✅ 這一批完成：{n} 人（新抓 {k}、今天已有 {s}）。下一批已經幫你選好了。",
    noKey: "需要幹部登入（GitHub 金鑰）。", needKid: "請輸入至少一個王國編號（或玩家 ID／聯盟）。", err: "送不出去，請再試一次。",
    dlH: "⬇️ 下載", dlBatch: "最新一批（JSON）", dlCsv: "最新一批摘要（CSV）", dlDay: "今天全部（JSON）", none: "今天還沒抓過。", last: "最新一批：{t} · {n} 人 · 王國 {k}",
    findH: "🔎 用名字找玩家 ID", findPh: "名字（打一部分就可以）", findNote: "搜尋我們已經有的資料：今天抓的每一批和聯盟名單、今天／昨天的 MightPulse 歷史、🔭 偵察。MightPulse 本身沒有名字搜尋——找不到的話，用上面的「聯盟成員名單」抓他的聯盟。",
    noHit: "找不到。", add: "+ 加入", added: "已加入", src: { opp: "今天", hist: "歷史", scout: "偵察", al: "聯盟名單" } },
  pt: { h: "⚡ Oponentes agora", note: "Durante uma batalha: busca na hora jogadores de outros reinos no MightPulse (poder, os 9 rankings de combate, heróis e Equipamento do Herói) para o chat de análise. Primeiro o top 5 de cada reino, depois o próximo lote. Quem já foi buscado hoje é pulado. Só o top 100 do reino (limite do MightPulse). Salvo criptografado, só para oficiais.",
    kids: "Reinos", kidsPh: "ex.: 2186 2201", batch: "Lote", boards: "Ordenar por", ids: "IDs extras de jogadores", idsPh: "separados por espaço", al: "Listas de membros da aliança (dá o ID de todos)", alPh: "reino:TAG, ex.: 2186:ABC",
    go: "⚡ Buscar agora", est: "Este lote: ~{c} consultas ao MightPulse, cerca de {s}.", quota: "Limite diário ~5,000 consultas, dividido com as tarefas de lista de membros / Espiar / histórico. {q}", qHdr: "O MightPulse diz: {v}.", qNone: "Esta ferramenta usou {n} consultas hoje (o MightPulse não informa quanto sobra).",
    sending: "Enviando…", sent: "Pedido em {t} — normalmente 1–3 min. Este cartão se atualiza sozinho.", wait: "Ainda buscando…", done: "✅ Lote pronto: {n} jogadores ({k} novos, {s} já tínhamos). O próximo lote já está escolhido abaixo.",
    noKey: "Precisa do login de oficial (chave do GitHub).", needKid: "Digite pelo menos um número de reino (ou IDs / uma aliança).", err: "Não deu para enviar o pedido — tente de novo.",
    dlH: "⬇️ Baixar", dlBatch: "Último lote (JSON)", dlCsv: "Resumo do último lote (CSV)", dlDay: "Tudo de hoje (JSON)", none: "Nada buscado hoje ainda.", last: "Último lote: {t} · {n} jogadores · reinos {k}",
    findH: "🔎 Achar o ID de um jogador pelo nome", findPh: "nome (uma parte já basta)", findNote: "Procura no que já temos: lotes e listas de aliança de hoje, histórico do MightPulse de hoje / ontem, 🔭 Espiar. O MightPulse não tem busca por nome — se não achar alguém, busque acima a lista de membros da aliança dele.",
    noHit: "Nada encontrado.", add: "+ adicionar", added: "adicionado", src: { opp: "hoje", hist: "histórico", scout: "Espiar", al: "lista da aliança" } },
  ar: { h: "⚡ الخصوم الآن", note: "أثناء المعركة: اجلب لاعبي الممالك الأخرى من MightPulse فوراً (القوة، لوحات القتال الـ9، الأبطال وعتاد البطل) لدردشة التحليل. أول 5 من كل مملكة أولاً، ثم الدفعة التالية. من جُلب اليوم يُتخطى. أول 100 في المملكة فقط (حد MightPulse). يُحفظ مشفراً، للضباط فقط.",
    kids: "الممالك", kidsPh: "مثلاً 2186 2201", batch: "الدفعة", boards: "الترتيب حسب", ids: "معرّفات لاعبين إضافية", idsPh: "مفصولة بمسافة", al: "قوائم أعضاء التحالف (تعطي معرّف الجميع)", alPh: "المملكة:TAG، مثلاً 2186:ABC",
    go: "⚡ اجلب الآن", est: "هذه الدفعة: ~{c} استعلام MightPulse، حوالي {s}.", quota: "الحد اليومي ~5,000 استعلام، مشترك مع مهام قائمة الأعضاء / الاستطلاع / السجل. {q}", qHdr: "MightPulse يقول: {v}.", qNone: "هذه الأداة استخدمت {n} استعلاماً اليوم (MightPulse لا يخبر بالمتبقي).",
    sending: "جارٍ الإرسال…", sent: "طُلب في {t} — عادةً 1–3 دقائق. هذه البطاقة تتحدث وحدها.", wait: "ما زال الجلب جارياً…", done: "✅ انتهت الدفعة: {n} لاعب ({k} جديد، {s} كان موجوداً). الدفعة التالية محددة بالأسفل.",
    noKey: "يحتاج تسجيل دخول الضباط (مفتاح GitHub).", needKid: "اكتب رقم مملكة واحداً على الأقل (أو معرّفات / تحالفاً).", err: "تعذّر إرسال الطلب — حاول مرة أخرى.",
    dlH: "⬇️ تنزيل", dlBatch: "آخر دفعة (JSON)", dlCsv: "ملخص آخر دفعة (CSV)", dlDay: "كل شيء اليوم (JSON)", none: "لم يُجلب شيء اليوم بعد.", last: "آخر دفعة: {t} · {n} لاعب · الممالك {k}",
    findH: "🔎 ابحث عن معرّف لاعب بالاسم", findPh: "الاسم (جزء منه يكفي)", findNote: "يبحث في ما لدينا: دفعات اليوم وقوائم التحالفات، سجل MightPulse لليوم / أمس، 🔭 الاستطلاع. MightPulse نفسه لا يبحث بالأسماء — إذا لم تجد أحداً، اجلب قائمة أعضاء تحالفه في الأعلى.",
    noHit: "لا نتيجة.", add: "+ إضافة", added: "أُضيف", src: { opp: "اليوم", hist: "السجل", scout: "الاستطلاع", al: "قائمة التحالف" } },
  ko: { h: "⚡ 지금 상대 가져오기", note: "전투 중: 다른 왕국 플레이어를 MightPulse에서 바로 가져와 분석 채팅에 씀 (전투력, 전투 랭킹 9개, 영웅과 영웅 장비). 왕국마다 상위 5명 먼저, 그다음 묶음. 오늘 이미 가져온 사람은 건너뜀. 왕국 상위 100명만 (MightPulse 한도). 암호화 저장, 간부만 볼 수 있음.",
    kids: "왕국", kidsPh: "예: 2186 2201", batch: "묶음", boards: "정렬 기준", ids: "추가 플레이어 ID", idsPh: "띄어쓰기로 구분", al: "연맹 멤버 목록 (모두의 ID를 알 수 있음)", alPh: "왕국:태그, 예: 2186:ABC",
    go: "⚡ 지금 가져오기", est: "이번 묶음: MightPulse 호출 ~{c}회, 약 {s}.", quota: "하루 한도 약 5,000회, 명단 / 정찰 / 기록 작업과 같이 씀. {q}", qHdr: "MightPulse 응답: {v}.", qNone: "이 도구가 오늘 {n}회 사용함 (MightPulse는 남은 양을 알려주지 않음).",
    sending: "보내는 중…", sent: "{t}에 요청함 — 보통 1–3분. 이 카드는 알아서 업데이트됨.", wait: "아직 가져오는 중…", done: "✅ 묶음 완료: {n}명 (새로 {k}, 이미 있던 {s}). 다음 묶음은 아래에 설정됨.",
    noKey: "간부 로그인 필요 (GitHub 키).", needKid: "왕국 번호를 하나 이상 입력하세요 (또는 ID / 연맹).", err: "요청을 보내지 못함 — 다시 시도하세요.",
    dlH: "⬇️ 다운로드", dlBatch: "최신 묶음 (JSON)", dlCsv: "최신 묶음 요약 (CSV)", dlDay: "오늘 전부 (JSON)", none: "오늘 아직 가져온 것 없음.", last: "최신 묶음: {t} · {n}명 · 왕국 {k}",
    findH: "🔎 이름으로 플레이어 ID 찾기", findPh: "이름 (일부만 써도 됨)", findNote: "이미 있는 자료에서 찾음: 오늘 묶음과 연맹 목록, 오늘 / 어제 MightPulse 기록, 🔭 정찰. MightPulse 자체에는 이름 검색이 없음 — 못 찾으면 위에서 그 사람 연맹의 멤버 목록을 가져오세요.",
    noHit: "결과 없음.", add: "+ 추가", added: "추가됨", src: { opp: "오늘", hist: "기록", scout: "정찰", al: "연맹 목록" } },
};
const lang = () => OFFICER.lang || "en";
const t = (k, v = {}) => { let s = (T[lang()] || T.en)[k] ?? T.en[k]; if (typeof s === "string") for (const x in v) s = s.split("{" + x + "}").join(v[x]); return s; };
const LS = "nxs-opp-v1";
const S = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const keep = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} };
S.step = S.step ?? 0; S.boards = S.boards || ["personal_power", "troop_power"];
let DAY = null, HIST = null, SCOUT = null, pending = 0, msg = "", timer = null, hits = null;
const today = () => new Date().toISOString().slice(0, 10);
const ago = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
const kidsOf = () => [...new Set(String(S.kids || "").split(/[\s,;]+/).map(Number).filter((k) => k > 0))];
const idsOf = () => [...new Set(String(S.ids || "").split(/[\s,;]+/).filter((x) => /^\d{3,12}$/.test(x)))];
const alsOf = () => String(S.als || "").split(/[\s,;]+/).map((x) => x.match(/^#?(\d+)[:：]([\w\-\[\]]{1,8})$/u)).filter(Boolean).map((m) => ({ kid: +m[1], tag: m[2] }));
async function loadDay() { try { DAY = await OfficerData.fetchJson(`${DIR}/${today()}-x7k2p9.json`); } catch (e) { DAY = null; } }
async function loadRefs() {
  for (const d of [today(), ago(1)]) { try { const x = await OfficerData.fetchJson(`data/mp-history/${d}-x7k2p9.json`); if (x) { HIST = x; break; } } catch (e) {} }
  try { SCOUT = await OfficerData.fetchJson("data/scout-x7k2p9.json"); } catch (e) {}
  if (!S.kids) { try { const r = await fetch("data/scout-config.json?t=" + Date.now(), { cache: "no-store" }); const c = r.ok ? await r.json() : null;
    S.kids = ((c && c.kingdoms) || []).filter((k) => k && k.auto && +k.kid !== OUR).map((k) => k.kid).join(" "); } catch (e) {} }
}
/* how many calls this batch needs: boards not fetched in the last 3 h (11 per kingdom), new players, alliance lists */
function estimate() {
  const kids = kidsOf(), [from, to] = STEPS[S.step] || STEPS[0], now = Date.now();
  let c = 0, players = 0;
  for (const kid of kids) {
    const fresh = ALLB.every((b) => { const x = DAY && DAY.boards && DAY.boards[`${kid}:${b}`]; return x && now - Date.parse(x.fetched_at) < 3 * 3600000; });
    if (!fresh) c += ALLB.length;
    let n = to - from + 1;
    if (fresh) { const best = new Map(); for (const b of S.boards) for (const r of DAY.boards[`${kid}:${b}`].rows || []) if (!best.has(r.governor_id) || r.rank < best.get(r.governor_id)) best.set(r.governor_id, r.rank);
      n = [...best.entries()].sort((a, b) => a[1] - b[1]).slice(from - 1, to).filter(([id]) => !(DAY.players || {})[id]).length; }
    players += n;
  }
  players += idsOf().filter((id) => !(DAY && DAY.players && DAY.players[id])).length;
  c += players + alsOf().length;
  const sec = Math.round(c * 1.15 + 45);
  return { c, s: sec < 90 ? `${sec} s` : `${Math.round(sec / 60)} min` };
}
function quotaLine() {
  const q = DAY && DAY.quota && DAY.quota.headers;
  const used = ((DAY && DAY.batches) || []).reduce((s, b) => s + (b.calls || 0), 0);
  return t("quota", { q: q ? t("qHdr", { v: Object.entries(q).map(([k, v]) => `${k} ${v}`).join(" · ") }) : t("qNone", { n: used }) });
}
const lastBatch = () => (DAY && DAY.batches && DAY.batches[DAY.batches.length - 1]) || null;
const fmt = (iso) => iso ? new Date(iso).toLocaleString(undefined, { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }) : "";
function html() {
  const e = estimate(), lb = lastBatch();
  return `<div class="card" id="opp_card"><h2 style="margin:0 0 4px">${esc(t("h"))}</h2><div class="muted msg">${esc(t("note"))}</div>
    <div class="opp-g">
      <label>${esc(t("kids"))}<input class="inp" id="opp_kids" inputmode="numeric" value="${esc(S.kids || "")}" placeholder="${esc(t("kidsPh"))}"></label>
      <label>${esc(t("batch"))}<select class="inp" id="opp_step">${STEPS.map(([a, b], i) => `<option value="${i}"${i === S.step ? " selected" : ""}>${a}–${b}</option>`).join("")}</select></label>
    </div>
    <div class="opp-b"><span class="muted">${esc(t("boards"))}:</span> ${PICK.map((b) => `<label><input type="checkbox" data-ob="${b}"${S.boards.includes(b) ? " checked" : ""}> ${esc(b)}</label>`).join(" ")}</div>
    <div class="opp-g">
      <label>${esc(t("ids"))}<input class="inp" id="opp_ids" inputmode="numeric" value="${esc(S.ids || "")}" placeholder="${esc(t("idsPh"))}"></label>
      <label>${esc(t("al"))}<input class="inp" id="opp_als" value="${esc(S.als || "")}" placeholder="${esc(t("alPh"))}"></label>
    </div>
    <div class="row" style="margin-top:8px;align-items:center"><button class="btn primary" id="opp_go"${pending ? " disabled" : ""}>${esc(t("go"))}</button>
      <span class="muted" style="font-size:13px">${esc(t("est", e))}</span></div>
    <div class="muted" style="font-size:12.5px;margin-top:4px">${esc(quotaLine())}</div>
    <div class="msg" id="opp_msg">${esc(msg)}</div>
    <h3 class="sc-h3">${esc(t("dlH"))}</h3>
    ${lb ? `<div class="muted" style="font-size:13px">${esc(t("last", { t: fmt(lb.at), n: (lb.ids || []).length, k: (lb.kids || []).join(", ") || "—" }))}</div>
      <div class="row" style="margin-top:6px"><button class="btn small" data-dl="batch">${esc(t("dlBatch"))}</button><button class="btn small" data-dl="csv">${esc(t("dlCsv"))}</button><button class="btn small" data-dl="day">${esc(t("dlDay"))}</button></div>`
      : `<div class="muted">${esc(t("none"))}</div>`}
    <h3 class="sc-h3">${esc(t("findH"))}</h3>
    <div class="row"><input class="inp" id="opp_q" placeholder="${esc(t("findPh"))}" style="flex:1;min-width:160px"></div>
    <div class="muted" style="font-size:12.5px;margin-top:4px">${esc(t("findNote"))}</div>
    <div id="opp_hits">${hitsHtml()}</div></div>`;
}
/* 🔎 every name we have, with its ID */
function index() {
  const out = new Map(), add = (id, name, al, kid, src) => { id = String(id || ""); if (!id || !name) return; const k = id + "|" + name; if (!out.has(k)) out.set(k, { id, name, al: al || "", kid: kid || "", src }); };
  for (const [k, b] of Object.entries((DAY && DAY.boards) || {})) for (const r of b.rows || []) add(r.governor_id, r.nick_name, r.alliance_abbr, r.kid || k.split(":")[0], "opp");
  for (const [id, p] of Object.entries((DAY && DAY.players) || {})) { const pl = p.player || {}; add(id, pl.nick_name, pl.alliance && pl.alliance.abbr, p.kid || pl.kid, "opp"); }
  for (const [k, a] of Object.entries((DAY && DAY.alliances) || {})) for (const m of a.members || []) add(m.governor_id, m.nick_name, k.split(":")[1], k.split(":")[0], "al");
  for (const [k, b] of Object.entries((HIST && HIST.boards) || {})) for (const r of b.rows || []) add(r.governor_id, r.nick_name, r.alliance_abbr, k.split(":")[0], "hist");
  for (const [id, p] of Object.entries((HIST && HIST.players) || {})) { const pl = p.player || {}; add(id, pl.nick_name, pl.alliance && pl.alliance.abbr, pl.kid, "hist"); }
  for (const [kid, k] of Object.entries((SCOUT && SCOUT.kingdoms) || {})) for (const p of k.players || []) add(p.id, p.name, p.alliance, kid, "scout");
  return [...out.values()];
}
const norm = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/[\s​-‏]/g, "");
function hitsHtml() {
  if (hits == null) return "";
  if (!hits.length) return `<div class="muted" style="margin-top:6px">${esc(t("noHit"))}</div>`;
  const have = new Set(idsOf()), src = t("src");
  return `<div class="tbl-wrap" style="margin-top:6px;max-height:300px"><table class="sc-tbl"><tbody>${hits.slice(0, 40).map((h) => `<tr><td><bdi>${esc(h.name)}</bdi> <span class="muted">${esc(h.al ? "[" + h.al + "]" : "")}${h.kid ? " #" + esc(h.kid) : ""}</span></td><td class="num">ID ${esc(h.id)}</td><td class="muted" style="font-size:12px">${esc(src[h.src] || h.src)}</td>
    <td>${have.has(h.id) ? `<span class="muted">${esc(t("added"))}</span>` : `<button class="btn mini" data-add="${esc(h.id)}">${esc(t("add"))}</button>`}</td></tr>`).join("")}</tbody></table></div>`;
}
/* ⬇️ downloads (decrypted in this browser) */
function save(name, text, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
function batchObj() {
  const b = lastBatch(); if (!b) return null;
  const players = {}; for (const id of b.ids || []) if (DAY.players[id]) players[id] = DAY.players[id];
  const boards = {}; for (const [k, v] of Object.entries(DAY.boards || {})) if ((b.kids || []).includes(+k.split(":")[0])) boards[k] = v;
  const alliances = {}; for (const k of b.alliances || []) if (DAY.alliances[k]) alliances[k] = DAY.alliances[k];
  return { date: DAY.date, batch: b, boards, players, alliances };
}
const CSV_B = ["personal_power", "troop_power", "pet_power", "gov_gear", "gov_charm", "hero_equip", "master_power", "research_power", "migrant_score"];
function csv(o) {
  const val = (kid, b, id) => { const r = ((o.boards[`${kid}:${b}`] || {}).rows || []).find((x) => x.governor_id === String(id)); return r ? r.score : ""; };
  const q = (s) => { s = String(s ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const head = ["kid", "alliance_abbr", "nick_name", "governor_id", ...CSV_B, "heroes", "captured_at"];
  const lines = [head.join(",")];
  for (const [id, p] of Object.entries(o.players)) {
    const pl = p.player || {}, kid = p.kid || pl.kid || "";
    const hs = Array.isArray(p.heroes) ? [...p.heroes].sort((a, b) => (a.position ?? 9) - (b.position ?? 9)).slice(0, 6).map((h) => `${h.name || h.hero_name || "?"} ${h.stars ?? h.star ?? ""}★`).join(" | ") : "";
    const pp = pl.power ?? val(kid, "personal_power", id);
    lines.push([kid, (pl.alliance && pl.alliance.abbr) || "", pl.nick_name || "", id, pp, ...CSV_B.slice(1).map((b) => val(kid, b, id)), hs, p.captured_at || ""].map(q).join(","));
  }
  return "﻿" + lines.join("\n") + "\n";
}
async function request() {
  const m = (x) => { msg = x; const el = document.getElementById("opp_msg"); if (el) el.textContent = x; };
  if (!OFFICER.token) return m(t("noKey"));
  const kids = kidsOf(), ids = idsOf(), als = alsOf();
  if (!kids.length && !ids.length && !als.length) return m(t("needKid"));
  const [from, to] = STEPS[S.step] || STEPS[0];
  m(t("sending"));
  try {
    const at = new Date().toISOString(), body = { at, by: (OFFICER.user && OFFICER.user.name) || "", kids, from, to, boards: S.boards, ids, alliances: als };
    let sha; try { const f = await OFFICER.gh("GET", REQ); sha = f ? f.sha : undefined; } catch (e) {}
    const text = JSON.stringify(await OfficerData.seal(body)) + "\n";
    await OFFICER.gh("PUT", REQ, { message: "⚡ Opponents now (encrypted request)", content: OFFICER.util.utf8ToB64(text), sha, branch: OFFICER.repo.branch });
    pending = Date.now(); S.lastKids = kids.join(" "); keep(); m(t("sent", { t: fmt(at) })); paint(); poll();
  } catch (e) { m(t("err")); }
}
function poll() {
  clearInterval(timer); const n0 = ((DAY && DAY.batches) || []).length, since = pending;
  timer = setInterval(async () => {
    await loadDay();
    const b = lastBatch();
    if (b && ((DAY.batches || []).length > n0 || Date.parse(b.at) > since)) {
      clearInterval(timer); pending = 0;
      const i = STEPS.findIndex(([a]) => a === b.from); if (i >= 0 && i < STEPS.length - 1) S.step = i + 1; keep();
      msg = t("done", { n: (b.ids || []).length, k: b.fetched || 0, s: b.skipped || 0 }); paint(); return;
    }
    if (Date.now() - since > 4 * 60000) { msg = t("wait"); const el = document.getElementById("opp_msg"); if (el) el.textContent = msg; }
    if (Date.now() - since > 25 * 60000) { clearInterval(timer); pending = 0; paint(); }
  }, 20000);
}
function paint() {
  const root = document.getElementById("opp_root"); if (!root) return;
  const q = document.getElementById("opp_q"), qv = q ? q.value : "";
  root.innerHTML = html(); bind();
  const q2 = document.getElementById("opp_q"); if (q2 && qv) q2.value = qv;
}
function bind() {
  const root = document.getElementById("opp_root"), val = (id) => (document.getElementById(id) || {}).value || "";
  const est = () => { const el = root.querySelector("#opp_card .row .muted"); if (el) el.textContent = t("est", estimate()); };
  for (const [id, k] of [["opp_kids", "kids"], ["opp_ids", "ids"], ["opp_als", "als"]]) { const el = document.getElementById(id); if (el) el.oninput = () => { S[k] = val(id); keep(); est(); }; }
  const st = document.getElementById("opp_step"); if (st) st.onchange = () => { S.step = +st.value; keep(); est(); };
  root.querySelectorAll("[data-ob]").forEach((cb) => cb.onchange = () => { S.boards = PICK.filter((b) => root.querySelector(`[data-ob="${b}"]`).checked); if (!S.boards.length) S.boards = ["personal_power"]; keep(); est(); });
  const go = document.getElementById("opp_go"); if (go) go.onclick = request;
  root.querySelectorAll("[data-dl]").forEach((b) => b.onclick = () => {
    const k = b.dataset.dl, stamp = (lastBatch() || {}).at ? lastBatch().at.slice(0, 16).replace(/[-:T]/g, "") : today();
    if (k === "day") return save(`opponents-${DAY.date}.json`, JSON.stringify(DAY, null, 1), "application/json");
    const o = batchObj(); if (!o) return;
    if (k === "batch") save(`opponents-${stamp}.json`, JSON.stringify(o, null, 1), "application/json");
    else save(`opponents-${stamp}.csv`, csv(o), "text/csv");
  });
  const q = document.getElementById("opp_q");
  if (q) q.oninput = () => { const s = norm(q.value); hits = s.length < 2 ? null : index().filter((h) => norm(h.name).includes(s)).sort((a, b) => (norm(a.name) === s ? -1 : 0) - (norm(b.name) === s ? -1 : 0)); document.getElementById("opp_hits").innerHTML = hitsHtml(); };
  const hl = document.getElementById("opp_hits");
  if (hl) hl.onclick = (e) => { const b = e.target.closest("[data-add]"); if (!b) return; S.ids = [...new Set([...idsOf(), b.dataset.add])].join(" "); keep(); const el = document.getElementById("opp_ids"); if (el) el.value = S.ids; est(); hl.innerHTML = hitsHtml(); };
}
let started = false;
async function init() {
  if (!document.getElementById("opp_root")) return;
  if (!started) { started = true; await Promise.all([loadDay(), loadRefs()]); }
  paint();
}
window.OppNow = { init, setLang: paint };
})();
