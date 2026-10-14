/* NXS officer page — scout tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.scout) */
(function () {
const ROOT = document.getElementById('pg-scout');
const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const esc = OFFICER.util.esc;
const { owner: OWNER, name: REPO } = OFFICER.repo;
const BRANCH = OFFICER.repo.branch, CONFIG = "data/scout-config.json", DATA = "data/scout-x7k2p9.json", OUR_KID = 2189;
const { b64ToUtf8, utf8ToB64 } = OFFICER.util;
const big = (n) => n == null ? "" : Math.abs(n) >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + "M" : Math.abs(n) >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);
let lang = OFFICER.lang, TOKEN = null, cfg = { kingdoms: [] }, cfgSha = null, data = null, waiting = null;
const LS = "nxs-scout-v1";
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} };
store.hide = store.hide || {};                         // kingdoms taken out of the ranking (this browser only)
let sortKey = store.sortKey || "power", sortDir = store.sortDir || -1;

const T = { pt: {"title": "Reconhecimento NXS", "addTitle": "Reconhecer um reino", "fetch": "Buscar agora", "auto": "atualizar todo dia", "include": "no ranking", "remove": "Remover", "colKingdom": "Reino", "ranking": "Ranking", "rankingNote": "Marque “no ranking” num reino para listar os jogadores dele aqui. A coluna usada para ordenar aparece logo ao lado do nome.", "sortBy": "Ordenar por", "desc": "maior → menor", "asc": "menor → maior", "addNote": "Digite o número de um reino e toque em Buscar: uma tarefa do GitHub lê os 20 melhores jogadores desse reino no MightPulse (poder, Centro da Cidade, Prova Mística, abates, VIP). Leva cerca de 2–3 minutos; esta página se atualiza sozinha. Marque “atualizar todo dia” para o adversário do KvK, assim ele se atualiza todo dia junto com a lista.", "needKid": "Digite o número de um reino.", "noKey": "Para salvar é preciso a chave do GitHub — configure na aba Post primeiro.", "saving": "Enviando o pedido…", "requested": "Pedido feito — a busca leva cerca de 2–3 minutos. A tabela aparece aqui quando terminar.", "stillWaiting": "Ainda buscando… (veja GitHub → Actions → Scout Kingdom se passar de 5 minutos)", "done": "Atualizado ✅", "errAuth": "O GitHub recusou a chave.", "errBusy": "O GitHub estava ocupado — tente de novo.", "errNet": "Problema de rede — tente de novo.", "updated": "Dados: {t}", "noData": "Nenhum reino reconhecido ainda. Adicione um acima.", "ours": "nosso reino", "players": "Top {n} jogadores", "alliances": "Alianças mais fortes", "colRank": "#", "colName": "Nome", "colAlliance": "Aliança", "colPower": "Poder", "colTc": "CC", "colMystic": "Prova Mística", "colKills": "Abates", "colVip": "VIP", "openRec": "MightPulse", "asOf": "em {t}", "source": "lista de {s}"},

  en: { title: "NXS Scout", addTitle: "Scout a kingdom", fetch: "Fetch now", auto: "update daily", include: "in ranking", remove: "Remove", colKingdom: "Kingdom", ranking: "Ranking", rankingNote: "Tick “in ranking” on a kingdom to list its players here. The column you sort by is shown right next to the name.", sortBy: "Sort by", desc: "high → low", asc: "low → high",
    addNote: "Type a kingdom number and press Fetch: a GitHub job reads that kingdom's top 20 players from MightPulse (power, Town Center, Mystic Trial, kills, VIP). It takes about 2–3 minutes; this page refreshes by itself. Tick “update daily” for the KvK opponent so it refreshes every day with the roster.",
    needKid: "Enter a kingdom number.", noKey: "Saving needs the GitHub key — set it up on the Post tab first.", saving: "Sending the request…",
    requested: "Requested — fetching takes about 2–3 minutes. The table appears here when it's done.", stillWaiting: "Still fetching… (check GitHub → Actions → Scout Kingdom if it takes more than 5 minutes)",
    done: "Updated ✅", errAuth: "GitHub rejected the key.", errBusy: "GitHub was busy — try again.", errNet: "Network problem — try again.",
    updated: "Data: {t}", noData: "No kingdom scouted yet. Add one above.", ours: "our kingdom", players: "Top {n} players", alliances: "Strongest alliances",
    colRank: "#", colName: "Name", colAlliance: "Alliance", colPower: "Power", colTc: "TC", colMystic: "Mystic Trial", colKills: "Kills", colVip: "VIP", openRec: "MightPulse",
    asOf: "as of {t}", source: "list from {s}" },
  zh: { title: "NXS 偵察", addTitle: "偵察一個王國", fetch: "立即抓取", auto: "每天更新", include: "列入排序", remove: "移除", colKingdom: "王國", ranking: "排序", rankingNote: "勾選王國的「列入排序」就會把它的玩家列進這張表。目前用來排序的欄位會顯示在名字旁邊。", sortBy: "排序依據", desc: "高 → 低", asc: "低 → 高",
    addNote: "輸入王國編號後按「立即抓取」：GitHub 會從 MightPulse 讀那個王國前 20 名玩家的資料（戰力、城鎮中心、秘境試煉、擊殺、VIP）。大約 2–3 分鐘，這頁會自己更新。KvK 對手可以勾「每天更新」，就會跟成員資料一起每天刷新。",
    needKid: "請輸入王國編號。", noKey: "儲存需要 GitHub 金鑰，請先到「發布公告」設定。", saving: "送出請求中…",
    requested: "已送出，抓取約需 2–3 分鐘，完成後表格會出現在這裡。", stillWaiting: "還在抓取…（超過 5 分鐘的話，到 GitHub → Actions → Scout Kingdom 看看）",
    done: "已更新 ✅", errAuth: "GitHub 不接受這把金鑰。", errBusy: "GitHub 忙碌中，請再試一次。", errNet: "網路有問題，請再試一次。",
    updated: "資料：{t}", noData: "還沒有偵察過任何王國，請在上面新增。", ours: "我們的王國", players: "前 {n} 名玩家", alliances: "最強聯盟",
    colRank: "#", colName: "名字", colAlliance: "聯盟", colPower: "戰力", colTc: "主城", colMystic: "秘境試煉", colKills: "擊殺", colVip: "VIP", openRec: "MightPulse",
    asOf: "資料時間 {t}", source: "名單來源：{s}" },
};
const tr = (k, v) => { let s = (T[lang] || T.en)[k] ?? T.en[k] ?? k; for (const x in v || {}) s = s.replace("{" + x + "}", v[x]); return s; };
const fmtT = (iso) => iso ? new Date(iso).toLocaleString(LOCALE(lang), { dateStyle: "short", timeStyle: "short" }) : "";

const gh = (method, path, body, token = TOKEN) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
async function loadConfig() {
  try {
    if (TOKEN) { const f = await gh("GET", CONFIG); if (f) { cfgSha = f.sha; cfg = JSON.parse(b64ToUtf8(f.content)); } }
    else { const r = await fetch(CONFIG + "?t=" + Date.now(), { cache: "no-store" }); if (r.ok) cfg = await r.json(); }
  } catch (e) {}
  cfg.kingdoms = (cfg.kingdoms || []).filter((k) => k && k.kid);
}
async function saveConfig(message) {
  const m = $("sc_msg");
  if (!TOKEN) { m.className = "msg warn"; m.textContent = tr("noKey"); return false; }
  m.className = "msg"; m.textContent = tr("saving");
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await gh("PUT", CONFIG, { message, content: utf8ToB64(JSON.stringify(cfg, null, 1) + "\n"), sha: cfgSha || undefined, branch: BRANCH });
        cfgSha = r && r.content ? r.content.sha : cfgSha; return true;
      } catch (e) { if (e.message !== "busy" || attempt) throw e; const f = await gh("GET", CONFIG); cfgSha = f ? f.sha : null; }
    }
  } catch (e) { m.className = "msg warn"; m.textContent = tr(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet"); }
  return false;
}
async function loadData() {
  try { data = await OfficerData.fetchJsonFast(DATA, (d) => { data = d; render(); }); } catch (e) { data = null; }
}
function applyTexts() {
  ROOT.querySelectorAll("[data-t]").forEach((el) => { el.textContent = tr(el.dataset.t); });
  $("sc_meta").textContent = data && data.updated ? tr("updated", { t: fmtT(data.updated) }) : "";
}
function renderList() {
  // every kingdom we have data for gets a chip, even if it is no longer in the daily list
  const list = [...cfg.kingdoms];
  for (const kid of Object.keys((data && data.kingdoms) || {})) if (!list.some((k) => String(k.kid) === kid)) list.push({ kid: Number(kid), auto: false });
  $("sc_list").innerHTML = list.map((k) => `<span class="sc-chip"><b>#${esc(k.kid)}</b>${k.kid === OUR_KID ? ` <i>(${esc(tr("ours"))})</i>` : ""}
    <label><input type="checkbox" data-inc="${esc(k.kid)}" ${store.hide[k.kid] ? "" : "checked"}> ${esc(tr("include"))}</label>
    <label><input type="checkbox" data-auto="${esc(k.kid)}" ${k.auto ? "checked" : ""}> ${esc(tr("auto"))}</label>
    <button class="btn mini" data-refetch="${esc(k.kid)}" title="${esc(tr("fetch"))}">⟳</button><button class="btn mini" data-rm="${esc(k.kid)}" title="${esc(tr("remove"))}">✕</button></span>`).join("");
}
const COLS = [["rank", "colRank", 1], ["name", "colName"], ["alliance", "colAlliance"], ["power", "colPower", 1], ["tc", "colTc", 1], ["mystic", "colMystic", 1], ["kills", "colKills", 1], ["vip", "colVip", 1]];
function rowsAll() {
  const ks = data && data.kingdoms ? Object.entries(data.kingdoms) : [];
  const rows = [];
  for (const [kid, k] of ks) { if (store.hide[kid]) continue; for (const p of k.players) rows.push({ ...p, kid: Number(kid) }); }
  const num = (v) => (v == null || v === "" ? -Infinity : Number(v));
  rows.sort((a, b) => {
    if (sortKey === "name" || sortKey === "alliance") return sortDir * String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""));
    return sortDir * (num(a[sortKey]) - num(b[sortKey]));
  });
  return rows;
}
function render() {
  applyTexts(); renderList();
  const ks = data && data.kingdoms ? Object.entries(data.kingdoms) : [];
  if (!ks.length) { $("sc_kingdoms").innerHTML = `<div class="card muted">${esc(tr("noData"))}</div>`; return; }
  const order = cfg.kingdoms.map((k) => String(k.kid));
  ks.sort((a, b) => (order.indexOf(a[0]) + 1 || 99) - (order.indexOf(b[0]) + 1 || 99));
  const shown = ks.filter(([kid]) => !store.hide[kid]);
  const rows = rowsAll();
  // columns: #, name, then the sort column, then the rest (so the sorted value is visible on a phone)
  let cols = COLS.slice();
  const kidColor = (kid) => String(kid) === String(OUR_KID) ? "ours" : "k" + (Math.max(0, order.indexOf(String(kid))) % 5);
  const sortCol = cols.find(([k]) => k === sortKey && k !== "name");
  if (sortCol) cols = [cols[0], cols[1], sortCol, ...cols.filter((c) => c !== cols[0] && c !== cols[1] && c !== sortCol)];
  const cell = (p, k, i) => {
    const cls = (COLS.find(([c]) => c === k)[2] ? "num" : "") + (k === sortKey ? " sorted" : "") + (k === "name" ? " kc " + kidColor(p.kid) : "");
    let v = "";
    if (k === "rank") v = String(i + 1);
    else if (k === "name") v = `<div class="name" dir="auto">${esc(p.name)}</div><div class="id">${shown.length > 1 ? `<b class="kidtag">#${esc(p.kid)}</b> · ` : ""}ID ${esc(p.id)}${p.uid ? ` · <a href="https://mightpulse.com/player/${encodeURIComponent(p.uid)}" target="_blank" rel="noopener">${esc(tr("openRec"))}</a>` : ""}</div>`;
    else if (k === "alliance") v = esc(p.alliance || "");
    else if (k === "power" || k === "kills") v = big(p[k]);
    else if (k === "mystic") v = p.mystic != null ? big(p.mystic) + (p.mysticRank != null ? ` <span class="muted">#${esc(p.mysticRank)}</span>` : "") : "";
    else v = esc(p[k] ?? "");
    return `<td class="${cls.trim()}">${v}</td>`;
  };
  const head = cols.map(([k, t, num]) => `<th class="${num ? "num" : ""}${k === "rank" ? "" : " sortable"}${k === sortKey ? " sorted" : ""}" data-k="${k}">${esc(tr(t))}${sortKey === k ? (sortDir > 0 ? " ▲" : " ▼") : ""}</th>`).join("");
  const sortOpts = COLS.filter(([k]) => k !== "rank").map(([k, t]) => `<option value="${k}"${k === sortKey ? " selected" : ""}>${esc(tr(t))}</option>`).join("");
  $("sc_kingdoms").innerHTML = `
    <div class="card">
      <h2 style="margin:0 0 4px">${esc(tr("ranking"))}${shown.length ? ` <small class="muted">${shown.map(([kid]) => "#" + esc(kid)).join(" + ")}</small>` : ""}</h2>
      <div class="muted msg">${esc(tr("rankingNote"))}</div>
      ${shown.map(([kid, k]) => `<div class="muted" style="font-size:13px;margin-top:4px"><b class="kc ${kidColor(kid)} kidtag">#${esc(kid)}</b>${String(kid) === String(OUR_KID) ? ` (${esc(tr("ours"))})` : ""} · ${esc(tr("asOf", { t: fmtT(k.asOf) }))}${k.alliances && k.alliances.length ? ` · ${esc(tr("alliances"))}: ${k.alliances.slice(0, 6).map((a) => `<b>${esc(a.tag)}</b> ${big(a.power)}`).join(", ")}` : ""}</div>`).join("")}
      <div class="row sc-sort" style="margin-top:10px"><label>${esc(tr("sortBy"))} <select id="sc_sortKey">${sortOpts}</select></label><button class="btn small" id="sc_sortDir">${sortDir > 0 ? "▲ " + esc(tr("asc")) : "▼ " + esc(tr("desc"))}</button></div>
      <div class="tbl-wrap" style="margin-top:8px"><table class="sc-tbl"><thead><tr>${head}</tr></thead><tbody>
      ${rows.length ? rows.map((p, i) => `<tr>${cols.map(([k]) => cell(p, k, i)).join("")}</tr>`).join("")
        : `<tr><td colspan="${cols.length}" class="muted">${esc(tr("noData"))}</td></tr>`}
      </tbody></table></div>
    </div>`;
  // sticky offsets follow the real column widths (table columns grow with their content)
  const ths = $("sc_kingdoms").querySelectorAll("thead th"), tbl = $("sc_kingdoms").querySelector(".sc-tbl");
  if (ths.length > 2 && tbl) { const w1 = ths[0].getBoundingClientRect().width, w2 = ths[1].getBoundingClientRect().width; tbl.style.setProperty("--sc-l2", w1 + "px"); tbl.style.setProperty("--sc-l3", (w1 + w2) + "px"); }
  $("sc_sortKey").onchange = (e) => { sortKey = e.target.value; sortDir = (sortKey === "name" || sortKey === "alliance") ? 1 : -1; store.sortKey = sortKey; store.sortDir = sortDir; save(); render(); };
  $("sc_sortDir").onclick = () => { sortDir = -sortDir; store.sortDir = sortDir; save(); render(); };
  $("sc_kingdoms").querySelectorAll("th.sortable").forEach((th) => th.onclick = () => {
    const k = th.dataset.k;
    if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = (k === "name" || k === "alliance") ? 1 : -1; }
    store.sortKey = sortKey; store.sortDir = sortDir; save(); render();
  });
}
async function requestFetch(kid) {
  kid = Number(kid);
  if (!(kid > 0)) { $("sc_msg").className = "msg warn"; $("sc_msg").textContent = tr("needKid"); return; }
  if (!cfg.kingdoms.some((k) => k.kid === kid)) cfg.kingdoms.push({ kid, auto: false });
  cfg.requested = [kid];
  if (!(await saveConfig(`Scout kingdom ${kid}`))) return;
  renderList();
  const m = $("sc_msg"); m.className = "msg okmsg"; m.textContent = tr("requested");
  // wait for the job: poll the data file until it carries a newer copy of this kingdom
  const since = Date.now(); clearInterval(waiting);
  waiting = setInterval(async () => {
    let d = null; try { d = await OfficerData.fetchJson(DATA); } catch (e) {}
    const k = d && d.kingdoms && d.kingdoms[kid];
    if (k && Date.parse(k.asOf) > since - 60000) { clearInterval(waiting); data = d; render(); m.className = "msg okmsg"; m.textContent = tr("done"); OfficerData.cacheSet && OfficerData.cacheSet(DATA.replace(/^/, ""), d); return; }
    if (Date.now() - since > 5 * 60000) { m.className = "msg"; m.textContent = tr("stillWaiting"); }
  }, 30000);
}
$("sc_fetch").onclick = () => requestFetch($("sc_kid").value);
$("sc_kid").onkeydown = (e) => { if (e.key === "Enter") requestFetch($("sc_kid").value); };
$("sc_list").onclick = async (e) => {
  const rf = e.target.closest("[data-refetch]"); if (rf) return requestFetch(rf.dataset.refetch);
  const rm = e.target.closest("[data-rm]");
  if (rm) {   // remove from the daily list AND ask the Action to delete its scouted data (else its chip comes back)
    const kid = rm.dataset.rm;
    cfg.kingdoms = cfg.kingdoms.filter((k) => String(k.kid) !== kid); delete cfg.requested; cfg.drop = [...new Set([...(cfg.drop || []), Number(kid)])];
    if (await saveConfig(`Scout: remove ${kid}`)) { if (data && data.kingdoms) delete data.kingdoms[kid]; delete store.hide[kid]; save(); $("sc_msg").textContent = ""; render(); }
  }
};
$("sc_list").onchange = async (e) => {
  const inc = e.target.closest("[data-inc]");
  if (inc) { if (inc.checked) delete store.hide[inc.dataset.inc]; else store.hide[inc.dataset.inc] = 1; save(); render(); return; }
  const cb = e.target.closest("[data-auto]"); if (!cb) return;
  let k = cfg.kingdoms.find((x) => String(x.kid) === cb.dataset.auto);
  if (!k) { k = { kid: Number(cb.dataset.auto), auto: false }; cfg.kingdoms.push(k); }
  k.auto = cb.checked;
  delete cfg.requested;
  if (await saveConfig(`Scout: ${cb.dataset.auto} daily ${cb.checked ? "on" : "off"}`)) $("sc_msg").textContent = "";
};
async function init() {
  TOKEN = OFFICER.token;
  applyTexts();
  await Promise.all([loadConfig(), loadData()]);
  render();
}
function setLang(l) { lang = l; render(); }
OFFICER_PAGES.scout = { init, applyTexts, setLang };
})();
