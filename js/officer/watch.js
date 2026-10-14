/* NXS officer page — watch tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.watch) */
(function () {
const ROOT = document.getElementById('pg-watch');
const T = { pt: {"title": "Vigilância NXS", "home": "Início", "export": "Exportar para a planilha do Google", "copy": "📋 Copiar para o Google Sheets", "csv": "⬇️ Baixar CSV", "copied": "Copiado! Cole na célula A1 da planilha.", "exportNote": "Copia todos os membros mostrados abaixo, incluindo as notas dos oficiais e o histórico que eles adicionaram à mão.", "rivalsL": "Alianças vigiadas:", "farmsL": "Nossas alianças farm / irmãs:", "colHops": "Alianças vistas", "fRival": "Esteve em {t}", "fHops": "Visto em {n} alianças", "fRivalName": "Mesmo nome em {t}", "members": "Membros", "onlyFlag": "Mostrar só membros com sinais", "newDays": "“Novo” = entrou há no máximo (dias)", "search": "Buscar nome ou ID…", "colName": "Nome", "colRank": "Cargo", "colPower": "Poder", "colPowerD": "Mudança de poder", "colKills": "Abates", "colKillsD": "Mudança de abates", "colTc": "CC", "colKid": "Reino", "colLang": "Idioma", "colSince": "Na NXS desde", "colFrom": "Visto em outras alianças", "colNames": "Nomes anteriores", "colSimilar": "Nomes parecidos em outros lugares", "colLogin": "Último login", "colFlags": "Sinais", "colClear": "Liberado", "colWhy": "Por quê / comentários", "before": "antes de {d}", "between": "entre {a} e {b}", "leftTitle": "Saíram da NXS", "colLeft": "Saiu em", "colNow": "Visto depois em", "fNew": "Novo ({n} d)", "fKid": "Do reino {k}", "fRenamed": "Mudou de nome", "fFrom": "Esteve em {t}", "fSimilar": "Nome parecido em {t}", "fDrop": "Poder caiu", "noData": "Ainda não há dados. Rode GitHub → Actions → “Update Roster (MightPulse)” e depois recarregue.", "updated": "Atualizado {t} · histórico desde {s}", "empty": "Nenhum membro encontrado.", "n1": "O histórico começou em {s}. “antes de {s}” quer dizer que a pessoa já estava na NXS quando o acompanhamento começou.", "n2": "“Visto em outras alianças” vem das listas de membros de outras alianças. O MightPulse pode ter só uma cópia antiga dessas listas, então a data mostra quão antiga era a cópia.", "n3": "Mudança de poder / abates = nos últimos {d} dias de dados salvos.", "n4": "Os sinais são só pistas de onde olhar. Não provam nada.", "n5": "O histórico de alianças e nomes também inclui o Record do MightPulse puxado em {d}.", "n6": "Toque em ✏️ para adicionar notas ou histórico do Record de um membro. Tudo o que for adicionado é compartilhado com todos os oficiais. Membros novos que ninguém conferiu ainda aparecem como “Conferir Record” e vêm primeiro.", "fCleared": "Liberado", "fNotClear": "Não liberado", "csNone": "Não conferido", "fNeedCheck": "Conferir Record", "yourName": "Seu nome", "saveBtn": "Salvar", "cancel": "Cancelar", "saving": "Salvando…", "openRec": "Abrir Record ↗", "histAlli": "Alianças anteriores", "histAlliNote": "(uma por linha: RED 2026-09-30 · outro reino: RED #1234 2026-09-30)", "histNames": "Nomes anteriores", "histNamesNote": "(um por linha)", "checked": "Já conferi o Record deste membro", "errAuth": "A chave do GitHub salva não funciona mais (pode ter expirado). Refaça a configuração na aba Post.", "errBusy": "Outra pessoa acabou de salvar uma nota. Tente de novo.", "errNet": "Não foi possível conectar ao GitHub. Confira a internet e tente de novo."},

  en: {
    title: "NXS Watch", home: "Home",
    export: "Export for the Google Sheet", copy: "📋 Copy for Google Sheets", csv: "⬇️ Download CSV", copied: "Copied! Paste into cell A1 of the sheet.",
    exportNote: "Copies every member shown below, including the officers’ notes and the history they added by hand.",
    rivalsL: "Watched alliances:", farmsL: "Our farm / sister alliances:", colHops: "Alliances seen", fRival: "Was in {t}", fHops: "Seen in {n} alliances", fRivalName: "Same name in {t}",
    members: "Members", onlyFlag: "Only show members with flags", newDays: "“New” = joined within (days)",
    search: "Search a name or ID…",
    colName: "Name", colRank: "Rank", colPower: "Power", colPowerD: "Power change", colKills: "Kills", colKillsD: "Kills change", colTc: "TC",
    colKid: "Kingdom", colLang: "Language", colSince: "In NXS since", colFrom: "Seen in other alliances", colNames: "Earlier names",
    colSimilar: "Similar names elsewhere", colLogin: "Last login", colFlags: "Flags", colClear: "Clear", colWhy: "Why / comments",
    before: "before {d}", between: "between {a} and {b}", leftTitle: "Left NXS", colLeft: "Left on", colNow: "Seen since in",
    fNew: "New ({n} d)", fKid: "From kingdom {k}", fRenamed: "Renamed", fFrom: "Was in {t}", fSimilar: "Similar name in {t}",
    fDrop: "Power dropped", noData: "No data yet. Run GitHub → Actions → “Update Roster (MightPulse)”, then reload.",
    updated: "Updated {t} · history since {s}", empty: "No members match.",
    n1: "History started on {s}. “before {s}” means they were already in NXS when tracking began.",
    n2: "“Seen in other alliances” comes from other alliances’ member lists. MightPulse may only have an old copy of those lists, so the date shows how old the copy was.",
    n3: "Power / kills change = over the last {d} days of saved data.",
    n4: "Flags are only hints for where to look. They are not proof of anything.",
    n5: "Alliance and name history also includes the MightPulse Record pulled on {d}.",
    n6: "Press ✏️ to add notes or history from a member’s Record. Everything added is shared by all officers. New members nobody has checked yet are marked “Check Record” and shown first.",
    fCleared: "Cleared", fNotClear: "Not clear", csNone: "Not checked", fNeedCheck: "Check Record",
    yourName: "Your name", saveBtn: "Save", cancel: "Cancel", saving: "Saving…", openRec: "Open Record ↗",
    histAlli: "Earlier alliances", histAlliNote: "(one per line: RED 2026-09-30 · other kingdom: RED #1234 2026-09-30)",
    histNames: "Earlier names", histNamesNote: "(one per line)", checked: "I’ve checked this member’s Record",
    errAuth: "The saved GitHub key no longer works (it may have expired). Redo the setup on the Post tab.",
    errBusy: "Someone else just saved a note. Please try again.", errNet: "Couldn't reach GitHub. Check the internet and try again.",
  },
  zh: {
    title: "NXS 觀察名單", home: "回主頁",
    export: "匯出到 Google 試算表", copy: "📋 複製到 Google 試算表", csv: "⬇️ 下載 CSV", copied: "已複製！貼到試算表的 A1 格。",
    exportNote: "會複製下面顯示的所有成員，包含幹部填的備註和手動補的紀錄。",
    rivalsL: "重點觀察聯盟：", farmsL: "我們的農場／分盟：", colHops: "待過幾個聯盟", fRival: "待過 {t}", fHops: "出現在 {n} 個聯盟", fRivalName: "{t} 有同名帳號",
    members: "成員", onlyFlag: "只顯示有標記的人", newDays: "「新成員」＝幾天內加入",
    search: "搜尋名字或 ID…",
    colName: "名字", colRank: "階級", colPower: "戰力", colPowerD: "戰力變化", colKills: "擊殺", colKillsD: "擊殺變化", colTc: "主城",
    colKid: "王國", colLang: "語言", colSince: "加入 NXS", colFrom: "曾出現在其他聯盟", colNames: "之前的名字",
    colSimilar: "其他聯盟的相似名字", colLogin: "上次登入", colFlags: "標記", colClear: "Clear", colWhy: "Why / comments",
    before: "{d} 以前", between: "{a} 到 {b} 之間", leftTitle: "已離開 NXS", colLeft: "離開日期", colNow: "之後出現在",
    fNew: "新成員（{n} 天）", fKid: "來自王國 {k}", fRenamed: "改過名", fFrom: "待過 {t}", fSimilar: "{t} 有相似名字",
    fDrop: "戰力下降", noData: "還沒有資料。到 GitHub → Actions →「Update Roster (MightPulse)」執行一次後重新整理。",
    updated: "更新：{t} · 紀錄從 {s} 開始", empty: "沒有符合的成員。",
    n1: "紀錄從 {s} 開始。「{s} 以前」表示開始追蹤時就已經在 NXS。",
    n2: "「曾出現在其他聯盟」來自其他聯盟的成員名單。MightPulse 有時只有舊的名單，所以會標出那份名單的日期。",
    n3: "戰力／擊殺變化＝已存資料中最近 {d} 天的變化。",
    n4: "標記只是提醒可以多看哪裡，不代表任何證據。",
    n5: "聯盟和改名紀錄也包含 {d} 從 MightPulse Record 抓下來的資料。",
    n6: "按 ✏️ 可以填備註，或把 Record 上看到的紀錄補進表格，所有幹部共用。還沒人查過的新成員會標「待查 Record」並排在最上面。",
    fCleared: "已確認", fNotClear: "有疑慮", csNone: "未確認", fNeedCheck: "待查 Record",
    yourName: "你的名字", saveBtn: "儲存", cancel: "取消", saving: "儲存中…", openRec: "打開 Record ↗",
    histAlli: "之前的聯盟", histAlliNote: "（一行一個：RED 2026-09-30；其他王國：RED #1234 2026-09-30）",
    histNames: "之前的名字", histNamesNote: "（一行一個）", checked: "已查過這個人的 Record",
    errAuth: "存的 GitHub 權杖已經不能用了（可能過期）。請到 Post 分頁重新設定。",
    errBusy: "剛好有人也在存備註，請再試一次。", errNet: "連不上 GitHub，請檢查網路後再試一次。",
  },
};
const KID = 2189, TAG = "NXS";
const LS = "nxs-watch-v1";
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} };
/* one language for all officer tabs (set from the main site when you enter, and by the language button on any tab) */
let lang = OFFICER.lang;
let newDays = store.newDays || 14;
let rivals = store.rivals ?? "RED, ESA, NBD";
let farms = store.farms ?? "nxs, VZP";
const tagList = (s) => String(s).split(/[,\s]+/).map((x) => x.trim()).filter(Boolean);
const tagOf = (t) => t.replace(/ \(#\d+\)$/, "");
let sortKey = "flags", sortDir = -1;
let roster = null, watch = null, records = null, rows = [];

const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const tr = (k, v = {}) => String((T[lang] && T[lang][k]) ?? T.en[k] ?? k).replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m);
const esc = OFFICER.util.esc;
const big = (n) => n == null ? "" : Math.abs(n) >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + "M" : Math.abs(n) >= 1e3 ? (n / 1e3).toFixed(1) + "K" : String(n);
const core = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/nexus/g, "").replace(/[亗卍〆『』「」【】〖〗★☆♛♚♕✿❀•·]/g, "").replace(/[^\p{L}\p{N}]/gu, "");
const toDate = (v) => { if (v == null || v === "") return ""; const ms = typeof v === "number" ? (v < 1e12 ? v * 1000 : v) : Date.parse(v); return isNaN(ms) ? "" : new Date(ms).toISOString().slice(0, 10); };
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

/* ===== hand-added history: "RED 2026-09-30" / "RED #1234 2026-09-30" ===== */
function parseAlli(txt) {
  return String(txt || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const dm = l.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    const d = dm ? `${dm[1]}-${dm[2].padStart(2, "0")}-${dm[3].padStart(2, "0")}` : "";
    const kid = Number((l.match(/#(\d+)/) || [])[1]) || null;
    const a = (dm ? l.replace(dm[0], "") : l).replace(/#\d+/, "").trim().split(/\s+/)[0] || "";
    return a ? { a, kid: kid && kid !== KID ? kid : null, d } : null;
  }).filter(Boolean);
}
const alliText = (list) => (list || []).map((x) => `${x.a}${x.kid ? " #" + x.kid : ""}${x.d ? " " + x.d : ""}`).join("\n");
const lines = (txt) => [...new Set(String(txt || "").split("\n").map((l) => l.trim()).filter(Boolean))];

/* ===== shared notes (data/notes-x7k2p9.json), written with the officers' GitHub key ===== */
const { owner: OWNER, name: REPO } = OFFICER.repo;
const BRANCH = OFFICER.repo.branch, NOTES_PATH = "data/notes-x7k2p9.json";
let TOKEN = null, notes = {};
const b64enc = (bytes) => { let s = ""; const u = new Uint8Array(bytes); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64dec_ = (b64) => Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0));
const utf8ToB64 = (str) => b64enc(new TextEncoder().encode(str));
const b64ToUtf8 = (b64) => new TextDecoder().decode(b64dec_(b64));
const gh = (method, path, body, token = TOKEN) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
const errText = (e) => tr(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet");
async function loadNotes() {
  if (TOKEN) { try { const f = await gh("GET", NOTES_PATH); notes = f ? (await OfficerData.open(JSON.parse(b64ToUtf8(f.content)))) || {} : {}; return; } catch (e) {} }
  try { notes = (await OfficerData.fetchJson(NOTES_PATH)) || {}; } catch (e) { notes = {}; }
}
async function saveNote(id, note) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const f = await gh("GET", NOTES_PATH);
    const cur = f ? (await OfficerData.open(JSON.parse(b64ToUtf8(f.content)))) || {} : {};
    if (note) cur[id] = note; else delete cur[id];
    try {
      await gh("PUT", NOTES_PATH, { message: `Watch note: ${id}`, content: utf8ToB64(JSON.stringify(await OfficerData.seal(cur), null, 1) + "\n"), sha: f ? f.sha : undefined, branch: BRANCH });
      notes = cur; OfficerData.cacheSet("notes", cur); return;
    } catch (e) { if (e.message !== "busy" || attempt) throw e; }
  }
}
function editNote(r) {
  const n = notes[r.id] || {};
  const m = document.createElement("div"); m.className = "modal";
  m.innerHTML = `<div class="card">
    <h2 dir="auto" style="margin-bottom:2px">${esc(r.name)}</h2>
    <div class="id">ID ${esc(r.id)}${r.m.uid ? ` · <a href="https://mightpulse.com/player/${encodeURIComponent(r.m.uid)}" target="_blank" rel="noopener">${esc(tr("openRec"))}</a>` : ""}</div>
    <label class="f">${esc(tr("histAlli"))} <small>${esc(tr("histAlliNote"))}</small></label><textarea id="nAlli" placeholder="RED 2026-09-30"></textarea>
    <label class="f">${esc(tr("histNames"))} <small>${esc(tr("histNamesNote"))}</small></label><textarea id="nNames" dir="auto"></textarea>
    <label class="row" style="margin-top:10px;font-size:14px"><input type="checkbox" id="nChecked"> ${esc(tr("checked"))}</label>
    <hr>
    <label class="f">${esc(tr("colClear"))}</label>
    <div class="row seg">
      <label><input type="radio" name="cs" value=""> ${esc(tr("csNone"))}</label>
      <label><input type="radio" name="cs" value="yes"> ✅ ${esc(tr("fCleared"))}</label>
      <label><input type="radio" name="cs" value="no"> ⚠️ ${esc(tr("fNotClear"))}</label>
    </div>
    <label class="f">${esc(tr("colWhy"))}</label><textarea id="nWhy" dir="auto"></textarea>
    <label class="f">${esc(tr("yourName"))}</label><input type="text" id="nBy" maxlength="40">
    <div class="msg warn" id="nErr" hidden></div>
    <div class="row" style="justify-content:flex-end;margin-top:12px">
      <button class="btn" id="nCancel">${esc(tr("cancel"))}</button>
      <button class="btn primary" id="nSave">${esc(tr("saveBtn"))}</button>
    </div></div>`;
  ROOT.appendChild(m);
  m.querySelector(`input[name=cs][value="${n.clear || ""}"]`).checked = true;
  m.querySelector("#nAlli").value = alliText(n.alliances);
  m.querySelector("#nNames").value = (n.names || []).join("\n");
  m.querySelector("#nChecked").checked = n.checked || r.needCheck;
  m.querySelector("#nWhy").value = n.why || "";
  m.querySelector("#nBy").value = officerStore().author || "";
  const close = () => m.remove();
  m.onclick = (e) => { if (e.target === m) close(); };
  m.querySelector("#nCancel").onclick = close;
  m.querySelector("#nSave").onclick = async () => {
    const clear = m.querySelector("input[name=cs]:checked").value;
    const why = m.querySelector("#nWhy").value.trim(), by = m.querySelector("#nBy").value.trim();
    const alliances = parseAlli(m.querySelector("#nAlli").value), names = lines(m.querySelector("#nNames").value);
    const checked = m.querySelector("#nChecked").checked;
    const s = officerStore(); s.author = by; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {}
    const btn = m.querySelector("#nSave"); btn.disabled = true; btn.textContent = tr("saving");
    const empty = !clear && !why && !alliances.length && !names.length && !checked;
    try {
      await saveNote(String(r.id), empty ? null : { clear, why, alliances, names, checked, by, at: new Date().toISOString().slice(0, 10) });
      close(); build(); render();
    } catch (e) {
      const er = m.querySelector("#nErr"); er.hidden = false; er.textContent = errText(e);
      btn.disabled = false; btn.textContent = tr("saveBtn");
    }
  };
}

function change(points, days) {
  if (!points || points.length < 2) return null;
  const last = points[points.length - 1];
  const cut = new Date(Date.parse(last[0]) - days * 86400000).toISOString().slice(0, 10);
  let base = points[0];
  for (const p of points) { if (p[0] <= cut) base = p; }
  return last[1] - base[1];
}

function build() {
  const today = new Date().toISOString().slice(0, 10);
  const started = watch.started;
  // index of other alliances' members by simplified name
  const byCore = new Map();
  for (const a of Object.values(watch.others || {})) {
    for (const [id, nm] of a.members) {
      const c = core(nm); if (c.length < 3) continue;
      if (!byCore.has(c)) byCore.set(c, []);
      byCore.get(c).push({ id, nm, tag: `${a.tag} (#${a.kid})`, asOf: a.asOf });
    }
  }
  const similar = (name, id) => {
    const c = core(name); if (c.length < 3) return [];
    const out = [];
    for (const [k, list] of byCore) {
      const hit = k === c && c.length >= 4;   // same name once decorations are removed
      if (hit) list.forEach((x) => { if (String(x.id) !== String(id)) out.push(x); });
    }
    return out.slice(0, 5);
  };

  // alliance IDs that have ever been shown as NXS (covers renames such as VZP → NXS)
  const ourAids = new Set();
  for (const v of Object.values((records && records.members) || {})) for (const e of v.history || []) if (e.a === TAG && e.aid != null) ourAids.add(e.aid);
  rows = roster.members.map((m) => {
    const h = (watch.members || {})[m.id] || {};
    const note = notes[String(m.id)] || {};
    const seen = { ...((watch.seen || {})[m.id] || {}) };
    // MightPulse Record (one-time pull): full alliance and name history
    // same alliance under an older tag (VZP was NXS's old name): match by alliance ID, shown as NXS
    const rec = ((records && records.members && records.members[m.id] && records.members[m.id].history) || []).slice()
      .sort((a, b) => String(a.d).localeCompare(String(b.d)))
      .map((e) => (e.aid != null && ourAids.has(e.aid) ? { ...e, a: TAG } : e));
    const recNames = [];
    let joinedRec = null;
    rec.forEach((e, i) => {
      if (e.a && e.d) { const t = `${e.a} (#${e.kid || KID})`; const r = seen[t]; seen[t] = r ? [r[0] < e.d ? r[0] : e.d, r[1] > e.d ? r[1] : e.d] : [e.d, e.d]; }
      if (e.name && !recNames.includes(e.name)) recNames.push(e.name);
      const inUs = e.a === TAG, prevIn = i > 0 && rec[i - 1].a === TAG;
      if (inUs && !prevIn) joinedRec = { d: e.d, first: i === 0 };
    });
    // history added by hand from the member's Record (same format as above)
    for (const x of note.alliances || []) {
      const t = `${x.a} (#${x.kid || KID})`, d = x.d || "", r = seen[t];
      seen[t] = r ? [!r[0] || (d && d < r[0]) ? d : r[0], d > r[1] ? d : r[1]] : [d, d];
    }
    const elsewhere = Object.entries(seen).filter(([t]) => !t.startsWith(TAG + " (#" + KID + ")"))
      .sort((a, b) => b[1][1].localeCompare(a[1][1])).map(([t, r]) => ({ tag: t, last: r[1] }));
    const names = [...new Set([...(h.names || []).map((x) => x[1]), ...recNames, ...(note.names || [])])].filter((n) => n !== m.name);
    const sim = similar(m.name, m.id);
    // joinedBetween: only known to have joined somewhere in this date range (from older, gappy data)
    const since = joinedRec ? (joinedRec.first ? tr("before", { d: joinedRec.d }) : joinedRec.d) : h.before ? tr("before", { d: started }) : h.joinedBetween ? tr("between", { a: h.joinedBetween[0], b: h.joinedBetween[1] }) : (h.firstSeen || "");
    const newFor = joinedRec ? (joinedRec.first ? null : daysBetween(joinedRec.d, today)) : !h.before && h.firstSeen ? daysBetween(h.joinedBetween ? h.joinedBetween[0] : h.firstSeen, today) : null;
    // joined after tracking began, no Record data, and nobody has checked yet
    const needCheck = !h.before && !rec.length && !note.checked;
    const pD = change(h.power, 7), kD = change(h.kills, 7);
    const flags = [];
    if (needCheck) flags.push({ t: tr("fNeedCheck"), hi: true });
    if (newFor != null && newFor <= newDays) flags.push({ t: tr("fNew", { n: newFor }), hi: true });
    if (m.kid && m.kid !== KID) flags.push({ t: tr("fKid", { k: m.kid }), hi: true });
    const R = new Set(tagList(rivals)), F = new Set(tagList(farms));
    const rivalSeen = elsewhere.filter((e) => R.has(tagOf(e.tag)));
    if (rivalSeen.length) flags.push({ t: tr("fRival", { t: rivalSeen.map((e) => tagOf(e.tag)).join(", ") }), hi: true });
    elsewhere.filter((e) => !R.has(tagOf(e.tag)) && !F.has(tagOf(e.tag))).slice(0, 2).forEach((e) => flags.push({ t: tr("fFrom", { t: e.tag }) }));
    const hops = new Set(elsewhere.map((e) => tagOf(e.tag)).filter((t) => !F.has(t))).size;
    if (hops >= 3) flags.push({ t: tr("fHops", { n: hops }), hi: true });
    if (names.length) flags.push({ t: tr("fRenamed") });
    const simRival = [...new Set(sim.map((s) => tagOf(s.tag)).filter((t) => R.has(t)))];
    if (simRival.length) flags.push({ t: tr("fRivalName", { t: simRival.join(", ") }), hi: true });
    if (pD != null && m.power && pD < -0.05 * m.power) flags.push({ t: tr("fDrop") });
    return {
      m, h, id: m.id, name: m.name, rank: m.rank, power: m.power, pD, kills: m.kills, kD, tc: m.tc,
      kid: m.kid, lang: m.lang, since, hops, sinceSort: h.before ? "0" : (h.firstSeen || ""),
      from: elsewhere.map((e) => e.last ? `${e.tag} (${e.last})` : e.tag).join("; "),
      names: names.join("; "),
      similar: sim.filter((s) => !F.has(tagOf(s.tag))).map((s) => `${s.nm} — ${s.tag}, ID ${s.id}`).join("; "),
      login: toDate(m.lastLogin) || (typeof m.lastLogin === "string" ? m.lastLogin.replace(/^Last active\s*/i, "") : ""),
      note, needCheck, cs: note.clear || "", clear: note.clear === "yes" ? "Yes" : note.clear === "no" ? "No" : "", why: note.why || "",
      flags,
    };
  });
}

const COLS = [
  ["name", "colName"], ["rank", "colRank"], ["flags", "colFlags"], ["clear", "colClear"], ["why", "colWhy"], ["since", "colSince"], ["from", "colFrom"], ["hops", "colHops", 1],
  ["names", "colNames"], ["similar", "colSimilar"], ["power", "colPower", 1], ["pD", "colPowerD", 1],
  ["kills", "colKills", 1], ["kD", "colKillsD", 1], ["tc", "colTc", 1], ["kid", "colKid", 1], ["lang", "colLang"],
];

function sorted() {
  const q = core($("wa_q").value);
  let list = rows.filter((r) => !q || core(r.name).includes(q) || String(r.id).includes($("wa_q").value.trim()));
  if ($("onlyFlag").checked) list = list.filter((r) => r.flags.length || r.cs === "no");
  // "Check Record" first, then "Not clear"; "Cleared" goes to the bottom
  const val = (r) => sortKey === "flags" ? r.flags.filter((f) => f.hi).length * 10 + r.flags.length + (r.needCheck ? 2000 : 0) + (r.cs === "no" ? 1000 : r.cs === "yes" ? -1000 : 0) : sortKey === "since" ? r.sinceSort : r[sortKey];
  return list.sort((a, b) => {
    const x = val(a), y = val(b);
    if (x == null && y == null) return 0; if (x == null) return 1; if (y == null) return -1;
    return (typeof x === "number" ? x - y : String(x).localeCompare(String(y))) * sortDir;
  });
}

function render() {
  $("head").innerHTML = COLS.map(([k, t, num]) => `<th class="${num ? "num" : ""}" data-k="${k}">${esc(tr(t))}${sortKey === k ? (sortDir > 0 ? " ▲" : " ▼") : ""}</th>`).join("");
  $("head").querySelectorAll("th").forEach((th) => th.onclick = () => {
    const k = th.dataset.k; if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = ["name", "rank", "lang", "since", "why"].includes(k) ? 1 : -1; } render();
  });
  const list = sorted();
  $("count").textContent = `${list.length} / ${rows.length}`;
  const ch = (v) => v == null ? "" : `<span class="${v > 0 ? "up" : v < 0 ? "down" : ""}">${v > 0 ? "+" : ""}${big(v)}</span>`;
  const clearCell = (r) => (r.cs === "yes" ? `<span class="flag ok">✅ ${esc(tr("fCleared"))}</span>` : r.cs === "no" ? `<span class="flag hi">⚠️ ${esc(tr("fNotClear"))}</span>` : "")
    + (TOKEN ? ` <button class="btn mini" data-edit="${esc(r.id)}">✏️</button>` : "");
  const whyCell = (r) => esc(r.why) + (r.note.by || r.note.at ? `<div class="id">${esc([r.note.by, r.note.at].filter(Boolean).join(" · "))}</div>` : "");
  $("rows").innerHTML = list.length ? list.map((r) => `<tr>
    <td><div class="name" dir="auto">${esc(r.name)}</div><div class="id">ID ${esc(r.id)}${r.m.uid ? ` · <a href="https://mightpulse.com/player/${encodeURIComponent(r.m.uid)}" target="_blank" rel="noopener">Record ↗</a>` : ""}</div></td>
    <td>${esc(r.rank)}</td>
    <td class="wrapc">${r.flags.map((f) => `<span class="flag${f.hi ? " hi" : ""}">${esc(f.t)}</span>`).join("")}</td>
    <td>${clearCell(r)}</td>
    <td class="wrapc" dir="auto">${whyCell(r)}</td>
    <td>${esc(r.since)}</td>
    <td class="wrapc">${esc(r.from)}</td>
    <td class="num">${r.hops || ""}</td>
    <td class="wrapc" dir="auto">${esc(r.names)}</td>
    <td class="wrapc" dir="auto">${esc(r.similar)}</td>
    <td class="num">${big(r.power)}</td><td class="num">${ch(r.pD)}</td>
    <td class="num">${big(r.kills)}</td><td class="num">${ch(r.kD)}</td>
    <td class="num">${esc(r.tc)}</td><td class="num">${esc(r.kid)}</td><td>${esc(r.lang)}</td>
  </tr>`).join("") : `<tr><td colspan="${COLS.length}" class="empty">${esc(tr("empty"))}</td></tr>`;

  const left = (watch.left || []).slice().reverse();
  $("left").innerHTML = left.length ? left.map((l) => {
    const seen = (watch.seen || {})[l.id] || {};
    const after = Object.entries(seen).filter(([t, r]) => !t.startsWith(TAG + " (#") && r[1] >= l.leftOn).map(([t]) => t).join(", ");
    return `<tr><td><div class="name" dir="auto">${esc(l.name)}</div><div class="id">ID ${esc(l.id)}</div></td><td>${esc(l.leftOn)}</td><td>${esc(after)}</td></tr>`;
  }).join("") : `<tr><td colspan="3" class="empty">—</td></tr>`;

  $("notes").innerHTML = [tr("n1", { s: watch.started }), tr("n2"), tr("n3", { d: 7 }), tr("n4"), ...(records ? [tr("n5", { d: String(records.pulledAt).slice(0, 10) })] : []), ...(TOKEN ? [tr("n6")] : [])].map((x) => `<li>${esc(x)}</li>`).join("");
}
$("rows").onclick = (e) => {
  const b = e.target.closest("[data-edit]"); if (!b) return;
  const r = rows.find((x) => String(x.id) === b.dataset.edit); if (r) editNote(r);
};

function applyTexts() {
  document.documentElement.lang = HTML_LANG(lang);
  ROOT.querySelectorAll("[data-t]").forEach((el) => { el.textContent = tr(el.dataset.t); });
  $("wa_q").placeholder = tr("search");
  if (watch) $("wa_meta").textContent = tr("updated", { t: new Date(watch.updated || roster.updated).toLocaleString(LOCALE(lang)), s: watch.started });
}

function table() {
  const head = ["Name", "Governor ID", "Rank", "Flags", "In NXS since", "Seen in other alliances", "Alliances seen", "Earlier names", "Similar names elsewhere",
    "Power", "Power change (7d)", "Kills", "Kills change (7d)", "TC", "Kingdom", "Language", "MightPulse record", "Clear", "Why / comments"];
  const body = sorted().map((r) => [r.name, r.id, r.rank, r.flags.map((f) => f.t).join("; "), r.since, r.from, r.hops || "", r.names, r.similar,
    r.power ?? "", r.pD ?? "", r.kills ?? "", r.kD ?? "", r.tc ?? "", r.kid ?? "", r.lang ?? "", r.m.uid ? `https://mightpulse.com/player/${r.m.uid}` : "", r.clear, r.why]);
  return [head, ...body];
}
$("wa_copyBtn").onclick = async () => {
  const text = table().map((row) => row.map((c) => String(c).replace(/[\t\n\r]+/g, " ")).join("\t")).join("\n");
  try { await navigator.clipboard.writeText(text); } catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; ROOT.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
  }
  const b = $("wa_copyBtn"); b.textContent = tr("copied"); setTimeout(() => (b.textContent = tr("copy")), 2500);
};
$("csvBtn").onclick = () => {
  const csv = table().map((row) => row.map((c) => { const s = String(c); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(",")).join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = `nxs-watch-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};
function setLang(l) { lang = l; store.lang = lang; save(); applyTexts(); if (watch) { build(); render(); } };
$("wa_q").oninput = () => render();
$("onlyFlag").onchange = () => render();
$("newDays").value = newDays;
$("rivals").value = rivals; $("farms").value = farms;
$("rivals").onchange = () => { rivals = $("rivals").value; store.rivals = rivals; save(); build(); render(); };
$("farms").onchange = () => { farms = $("farms").value; store.farms = farms; save(); build(); render(); };
$("newDays").onchange = () => { newDays = Math.max(1, Number($("newDays").value) || 14); store.newDays = newDays; save(); build(); render(); };

async function init() {
  TOKEN = OFFICER.token;
  applyTexts();
  try {
    // copies remembered in this tab show at once; newer ones replace them when they arrive
    const refresh = (set) => (d) => { set(d); if (roster && watch) { build(); render(); } };
    // notes: the remembered copy is used at once, the newest arrives behind it
    const cachedNotes = OfficerData.cacheGet("notes");
    if (cachedNotes) notes = cachedNotes;
    const notesDone = loadNotes().then(() => { OfficerData.cacheSet("notes", notes); if (cachedNotes && roster && watch && JSON.stringify(notes) !== JSON.stringify(cachedNotes)) { build(); render(); } });
    const [a, b, rec] = await Promise.all([
      OfficerData.fetchJsonFast("data/roster-x7k2p9.json", refresh((d) => { roster = d; })),
      OfficerData.fetchJsonFast("data/watch-x7k2p9.json", refresh((d) => { watch = d; })),
      OfficerData.fetchJsonFast("data/records-x7k2p9.json", refresh((d) => { records = d; })).catch(() => undefined),
      cachedNotes ? null : notesDone,
    ]);
    roster = a || null;
    if (rec !== undefined) records = rec;
    watch = b || null;
  } catch (e) {}
  if (!roster || !watch) { $("wa_noData").hidden = false; $("wa_noData").textContent = tr("noData"); return; }
  $("wa_app").hidden = false;
  applyTexts(); build(); render();
}

OFFICER_PAGES.watch = { init, applyTexts, setLang };


})();
