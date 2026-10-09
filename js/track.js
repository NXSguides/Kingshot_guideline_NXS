/* Page views → GoatCounter (privacy-friendly counter, no cookies).
   Counts the page path plus the "#/lang/guide" part, so the officer page's Views tab can show which guides
   and languages people open. Not counted: anyone whose browser has the officer password saved (officers test
   the site all day and would bury the real numbers), and the officer page itself (it doesn't load this file). */
(function () {
  const SITE = "https://incrediblesparrow.goatcounter.com/count";
  let officer = false;
  try { officer = !!(JSON.parse(localStorage.getItem("nxs-post-v1")) || {}).pw; } catch (e) {}
  try { if (localStorage.getItem("skipgc") === "t") officer = true; } catch (e) {}   // GoatCounter's own opt-out flag
  if (officer || /^(localhost|127\.)/.test(location.hostname)) return;
  const path = () => location.pathname.replace(/^\/Kingshot_guideline_NXS/i, "").replace(/^\/$/, "/index.html") + location.hash;
  window.goatcounter = { no_onload: true, path };
  const s = document.createElement("script");
  s.async = true; s.src = "https://gc.zgo.at/count.js"; s.setAttribute("data-goatcounter", SITE);
  s.onload = () => {
    let last = "";
    const count = () => { const p = path(); if (p === last) return; last = p; try { window.goatcounter.count({ path: p, title: document.title }); } catch (e) {} };
    count();
    window.addEventListener("hashchange", () => setTimeout(count, 50));
  };
  document.head.appendChild(s);
})();
