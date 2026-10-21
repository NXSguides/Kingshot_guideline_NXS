/* 💬 Ask AI on the stand-alone tool pages (calculators, booking / squad guide): the chat follows the page's own language,
   and the chat's colours get fallbacks on pages that don't use css/styles.css. Loaded before js/assistant.js. */
var currentLang = ((document.documentElement.lang || "en").toLowerCase().split("-")[0]) || "en";
new MutationObserver(() => { currentLang = (document.documentElement.lang || "en").toLowerCase().split("-")[0] || "en"; }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
(function () {
  const cs = getComputedStyle(document.documentElement), get = (n) => cs.getPropertyValue(n).trim();
  const want = { "--accent": [["--accent"], "#c7743f"], "--accent-ink": [[], "#fff"], "--panel": [["--panel", "--bg"], "#fff"], "--panel-2": [["--sunk", "--panel-2"], "#f4efe7"],
    "--rule": [["--line", "--rule"], "#ddd"], "--text": [["--fg", "--text"], "#222"], "--text-muted": [["--muted", "--text-muted"], "#777"], "--shadow": [[], "rgba(0,0,0,.18)"] };
  const out = [];
  for (const k in want) { if (get(k)) continue; const [alts, fb] = want[k]; const v = alts.map(get).find(Boolean) || fb; out.push(k + ":" + v); }
  if (out.length) { const st = document.createElement("style"); st.textContent = ":root{" + out.join(";") + "}"; document.head.appendChild(st); }
})();
