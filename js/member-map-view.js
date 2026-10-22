/* 📍 Member Map (main site, read only): where every member's city is now, drawn like the in-game World map
   (screen right = X−Y, up = X+Y; a city is 2×2 tiles, a Bear Trap / HQ 3×3, X:Y = the corner tile like in game).
   Data comes from the Worker (/member-map): what officers save on 🗺️ Map → 👥 Member positions. Nobody can change
   anything here; the 🚚 moving plan and planned banners are never shown. Loaded only when the 📍 guide opens. */
(function () {
  const API = "https://nxs-ai.tapegirljoke.workers.dev/member-map";
  const T = {
    en: { find: "Find your name…", count: "{n} cities", copy: "📋 Copy X:Y", copied: "Copied ✓", upd: "Updated {d}", err: "The map can't be loaded right now — try again later.", load: "Loading the map…", nf: "Name not found — ask an officer.", hint: "Tap a city or search your name for its X:Y.", bt: "Bear Trap", hq: "Alliance HQ", banner: "Alliance Banner" },
    zh: { find: "搜尋你的名字…", count: "{n} 座城", copy: "📋 複製 X:Y", copied: "已複製 ✓", upd: "更新於 {d}", err: "地圖現在載入不了，請稍後再試。", load: "地圖載入中…", nf: "找不到這個名字，請問幹部。", hint: "點城或搜尋名字，就看得到 X:Y。", bt: "熊陷阱", hq: "聯盟總部", banner: "聯盟旗幟" },
    ko: { find: "내 이름 찾기…", count: "성 {n}개", copy: "📋 X:Y 복사", copied: "복사됨 ✓", upd: "업데이트 {d}", err: "지금은 지도를 불러올 수 없어요. 잠시 후 다시 해 보세요.", load: "지도 불러오는 중…", nf: "이름을 찾을 수 없어요 — 간부에게 물어보세요.", hint: "성을 누르거나 이름을 검색하면 X:Y가 보여요.", bt: "곰 함정", hq: "연맹 본부", banner: "연맹 깃발" },
    de: { find: "Deinen Namen suchen…", count: "{n} Städte", copy: "📋 X:Y kopieren", copied: "Kopiert ✓", upd: "Aktualisiert {d}", err: "Die Karte lässt sich gerade nicht laden — später nochmal versuchen.", load: "Karte wird geladen…", nf: "Name nicht gefunden — frag einen Offizier.", hint: "Tipp eine Stadt an oder such deinen Namen für X:Y.", bt: "Bärenfalle", hq: "Allianz-HQ", banner: "Allianzbanner" },
    fr: { find: "Cherche ton nom…", count: "{n} villes", copy: "📋 Copier X:Y", copied: "Copié ✓", upd: "Mis à jour {d}", err: "La carte ne se charge pas pour l'instant — réessaie plus tard.", load: "Chargement de la carte…", nf: "Nom introuvable — demande à un officier.", hint: "Touche une ville ou cherche ton nom pour voir son X:Y.", bt: "Piège à ours", hq: "QG d'alliance", banner: "Bannière d'alliance" },
    pt: { find: "Procure seu nome…", count: "{n} cidades", copy: "📋 Copiar X:Y", copied: "Copiado ✓", upd: "Atualizado {d}", err: "O mapa não carrega agora — tente mais tarde.", load: "Carregando o mapa…", nf: "Nome não encontrado — fale com um oficial.", hint: "Toque numa cidade ou procure seu nome para ver o X:Y.", bt: "Armadilha de Urso", hq: "QG da aliança", banner: "Estandarte da aliança" },
    es: { find: "Busca tu nombre…", count: "{n} ciudades", copy: "📋 Copiar X:Y", copied: "Copiado ✓", upd: "Actualizado {d}", err: "El mapa no se puede cargar ahora — inténtalo más tarde.", load: "Cargando el mapa…", nf: "Nombre no encontrado — pregunta a un oficial.", hint: "Toca una ciudad o busca tu nombre para ver su X:Y.", bt: "Trampa de oso", hq: "CG de la alianza", banner: "Estandarte de la alianza" },
    tr: { find: "Adını ara…", count: "{n} şehir", copy: "📋 X:Y kopyala", copied: "Kopyalandı ✓", upd: "Güncellendi {d}", err: "Harita şu an yüklenemiyor — sonra tekrar dene.", load: "Harita yükleniyor…", nf: "İsim bulunamadı — bir subaya sor.", hint: "X:Y için bir şehre dokun ya da adını ara.", bt: "Ayı Tuzağı", hq: "İttifak Karargâhı", banner: "İttifak Sancağı" },
    id: { find: "Cari namamu…", count: "{n} kota", copy: "📋 Salin X:Y", copied: "Disalin ✓", upd: "Diperbarui {d}", err: "Peta belum bisa dimuat — coba lagi nanti.", load: "Memuat peta…", nf: "Nama tidak ditemukan — tanya officer.", hint: "Ketuk kota atau cari namamu untuk melihat X:Y.", bt: "Jebakan Beruang", hq: "Markas Aliansi", banner: "Panji Aliansi" },
    ru: { find: "Найди своё имя…", count: "{n} городов", copy: "📋 Копировать X:Y", copied: "Скопировано ✓", upd: "Обновлено {d}", err: "Карта сейчас не загружается — попробуйте позже.", load: "Загрузка карты…", nf: "Имя не найдено — спросите офицера.", hint: "Нажмите на город или найдите своё имя, чтобы увидеть X:Y.", bt: "Медвежья ловушка", hq: "Штаб альянса", banner: "Знамя альянса" },
    th: { find: "ค้นหาชื่อคุณ…", count: "{n} เมือง", copy: "📋 คัดลอก X:Y", copied: "คัดลอกแล้ว ✓", upd: "อัปเดต {d}", err: "ตอนนี้โหลดแผนที่ไม่ได้ ลองใหม่ภายหลัง", load: "กำลังโหลดแผนที่…", nf: "ไม่พบชื่อนี้ ถามเจ้าหน้าที่", hint: "แตะเมืองหรือค้นหาชื่อเพื่อดู X:Y", bt: "กับดักหมี", hq: "กองบัญชาการพันธมิตร", banner: "ธงพันธมิตร" },
    ar: { find: "ابحث عن اسمك…", count: "{n} مدينة", copy: "📋 نسخ X:Y", copied: "تم النسخ ✓", upd: "آخر تحديث {d}", err: "تعذّر تحميل الخريطة الآن — حاول لاحقًا.", load: "جارٍ تحميل الخريطة…", nf: "الاسم غير موجود — اسأل أحد الضباط.", hint: "اضغط مدينة أو ابحث عن اسمك لترى X:Y.", bt: "مصيدة الدب", hq: "مقر التحالف", banner: "راية التحالف" },
  };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const K = 16, R = 0.74, FN = 1200;
  let lang = "en", D = null, SEL = null, OB = null, HQ = [], failed = false, loading = null;
  const t = (k) => (T[lang] || T.en)[k] || T.en[k];
  let O = { dx: 0, sy: 0 };
  const P = (x, y) => [((x - y) - O.dx) * K, (O.sy - (x + y)) * K * R];
  const poly = (x, y, n) => [[x, y], [x + n, y], [x + n, y + n], [x, y + n]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ");

  /* ⛰️ mountains / lakes: green channel of the territory picture (one pixel per tile; 1 mountain · 2 lake) — only our area is read */
  function loadObst(x1, y1, x2, y2) {
    return new Promise((res) => {
      const im = new Image();
      im.onload = () => { try { const w = x2 - x1 + 1, h = y2 - y1 + 1, c = document.createElement("canvas"); c.width = w; c.height = h;
        const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(im, -x1, -y1); const d = g.getImageData(0, 0, w, h).data;
        OB = { x1, y1, w, h, a: new Uint8Array(w * h).map((_, i) => d[i * 4 + 1]) }; } catch (e) { OB = null; } res(); };
      im.onerror = () => res(); im.src = "data/territory-2189-grid.png?v=20";
    });
  }
  const obst = (x, y) => OB && x >= OB.x1 && y >= OB.y1 && x < OB.x1 + OB.w && y < OB.y1 + OB.h ? OB.a[(y - OB.y1) * OB.w + (x - OB.x1)] : 0;
  function loadHQ() {
    if (typeof KINGDOM_MAP !== "undefined") { HQ = KINGDOM_MAP.hq || []; return Promise.resolve(); }
    return new Promise((res) => { const s = document.createElement("script"); s.src = "data/kingdom-map.js"; s.onload = () => { try { HQ = KINGDOM_MAP.hq || []; } catch (e) {} res(); }; s.onerror = () => res(); document.head.appendChild(s); });
  }
  async function load() {
    try {
      const r = await fetch(API, { cache: "no-store" }); const j = await r.json();
      if (!r.ok || !Array.isArray(j.m)) throw new Error(j.error || r.status);
      D = j;
    } catch (e) { failed = true; return; }
    const pts = D.m.map(([, x, y]) => [x, y]).concat(D.bt);
    if (pts.length) await Promise.all([loadObst(Math.min(...pts.map((p) => p[0])) - 6, Math.min(...pts.map((p) => p[1])) - 6, Math.max(...pts.map((p) => p[0])) + 8, Math.max(...pts.map((p) => p[1])) + 8), loadHQ()]);
  }
  function svg() {
    const cities = D.m, traps = D.bt || [];
    const all = cities.map(([, x, y]) => [x, y]).concat(traps);
    const x1 = Math.min(...all.map((a) => a[0])) - 6, x2 = Math.max(...all.map((a) => a[0])) + 8, y1 = Math.min(...all.map((a) => a[1])) - 6, y2 = Math.max(...all.map((a) => a[1])) + 8;
    O = { dx: x1 - y2, sy: x2 + y2 };
    const W = ((x2 - y1) - (x1 - y2)) * K, H = ((x2 + y2) - (x1 + y1)) * K * R, inB = (x, y) => x >= x1 && x <= x2 && y >= y1 && y <= y2, s = [];
    s.push(`<polygon points="${[[x1, y1], [x2, y1], [x2, y2], [x1, y2]].map(([a, b]) => P(a, b).map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="#5f8a3a" stroke="#3d5e22" stroke-width="2"/>`);
    for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) { const o = obst(x, y);
      if (o === 1 || o === 2) s.push(`<polygon points="${poly(x, y, 1)}" fill="${o === 1 ? "#8a8a96" : "#3a7fd0"}" stroke="${o === 1 ? "#77777f" : "#2f6cb3"}" stroke-width=".6"/>`); }
    for (const [bx, by] of D.banners || []) if (inB(bx, by)) s.push(`<polygon points="${poly(bx, by, 1)}" fill="#0b3d91" stroke="#cfe4ff" stroke-width="1"><title>${esc(t("banner"))} X:${bx} Y:${by}</title></polygon>`);
    for (const [hx, hy] of HQ.slice(0, 1)) if (inB(hx, hy)) { const [cx, cy] = P(hx + 1.5, hy + 1.5);
      s.push(`<g class="mmv-b" data-b="hq"><polygon points="${poly(hx, hy, 3)}" fill="#2b6cc4" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mmv-bl">HQ</text></g>`); }
    traps.forEach(([bx, by], i) => { const [cx, cy] = P(bx + 1.5, by + 1.5);
      s.push(`<g class="mmv-b" data-b="bt${i}"><polygon points="${poly(bx, by, 3)}" fill="#7a5233" stroke="#fff" stroke-width="1.5"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="mmv-bl">BT${i + 1}</text></g>`); });
    const order = cities.map((m, i) => [m, i]).sort((a, b) => (b[0][1] + b[0][2]) - (a[0][1] + a[0][2]));   // far cities first, like in game
    for (const [[n, x, y], i] of order) { const [cx, cy] = P(x + 1, y + 1), sel = SEL === i;
      s.push(`<g class="mmv-c${sel ? " sel" : ""}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(n)} X${x} Y${y}"><polygon points="${poly(x, y, 2)}" fill="${sel ? "#ffd84d" : "#9ec3f0"}" stroke="${sel ? "#b8860b" : "#fff"}" stroke-width="${sel ? 2.5 : 1.2}"/>`
        + `<text x="${cx}" y="${cy + 3}" text-anchor="middle" class="mmv-n">${esc(n.length > 10 ? n.slice(0, 9) + "…" : n)}</text></g>`); }
    return `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" width="${Math.max(W + 12, 300)}" style="display:block;max-width:none">${s.join("")}</svg>`;
  }
  const when = (at) => { const d = new Date(at); return isNaN(d) ? "" : d.toISOString().slice(0, 16).replace("T", " ") + " UTC"; };
  function info(el) {
    const box = el.querySelector(".mmv-info"); if (!box) return;
    if (SEL == null) { box.innerHTML = `<span class="muted">${esc(t("hint"))}</span>`; return; }
    let name, x, y;
    if (typeof SEL === "number") [name, x, y] = D.m[SEL];
    else if (SEL === "hq") { [x, y] = HQ[0]; name = "🏰 " + t("hq"); }
    else { const i = +SEL.slice(2); [x, y] = D.bt[i]; name = `🪤 ${t("bt")} ${i + 1}`; }
    box.innerHTML = `<b dir="auto">${esc(name)}</b> · X:${x} Y:${y} <button type="button" class="mmv-copy" data-c="X:${x} Y:${y}">${esc(t("copy"))}</button>`;
    box.querySelector(".mmv-copy").onclick = async (e) => { const b = e.currentTarget; try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = t("copied"); } catch (er) {} };
  }
  function paint(el, center) {
    const map = el.querySelector(".mmv-map"); map.innerHTML = svg();
    map.querySelectorAll(".mmv-c").forEach((g) => { const go = () => { SEL = +g.dataset.i; paint(el, false); info(el); };
      g.onclick = go; g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }; });
    map.querySelectorAll(".mmv-b").forEach((g) => g.onclick = () => { SEL = g.dataset.b; paint(el, false); info(el); });
    if (center) { map.scrollLeft = (map.scrollWidth - map.clientWidth) / 2; map.scrollTop = (map.scrollHeight - map.clientHeight) / 2; }
  }
  function scrollTo(el, i) {
    const map = el.querySelector(".mmv-map"), g = map.querySelector(`.mmv-c[data-i="${i}"]`); if (!g) return;
    const r = g.getBoundingClientRect(), m = map.getBoundingClientRect();
    map.scrollBy({ left: r.left + r.width / 2 - (m.left + m.width / 2), top: r.top + r.height / 2 - (m.top + m.height / 2), behavior: "smooth" });
  }
  function render(el) {
    if (failed) { el.innerHTML = `<p class="muted">${esc(t("err"))}</p>`; return; }
    if (!D) { el.innerHTML = `<p class="muted">${esc(t("load"))}</p>`; return; }
    el.innerHTML = `<div class="mmv-top"><input type="search" class="mmv-find" placeholder="${esc(t("find"))}" aria-label="${esc(t("find"))}" list="mmvNames">`
      + `<datalist id="mmvNames">${D.m.map(([n]) => `<option value="${esc(n)}">`).join("")}</datalist>`
      + `<span class="muted mmv-meta">${esc(t("count").replace("{n}", D.m.length))}${D.at ? " · " + esc(t("upd").replace("{d}", when(D.at))) : ""}</span></div>`
      + `<div class="mmv-info"></div><div class="mmv-map"></div>`;
    paint(el, true); info(el);
    el.querySelector(".mmv-find").oninput = (e) => {
      const q = norm(e.target.value); if (!q) return;
      let i = D.m.findIndex(([n]) => norm(n) === q); if (i < 0) i = D.m.findIndex(([n]) => norm(n).startsWith(q)); if (i < 0) i = D.m.findIndex(([n]) => norm(n).includes(q));
      if (i < 0) { if (q.length >= 3) el.querySelector(".mmv-info").innerHTML = `<span class="muted">${esc(t("nf"))}</span>`; return; }
      SEL = i; paint(el, false); info(el); scrollTo(el, i);
    };
  }
  async function mount(l) {
    lang = T[l] ? l : "en"; SEL = null; if (failed && !loading) failed = false;   // opened again after a failed load → try again
    const el = document.getElementById("mmvRoot"); if (!el) return;
    render(el);
    if (!D && !failed) { loading = loading || load(); await loading; loading = null; const el2 = document.getElementById("mmvRoot"); if (el2) render(el2); }
  }
  window.MemberMapView = { mount };
})();
