/* Computer mouse: drag a wide table sideways (and up/down) instead of hunting for its scrollbar.
   Works on every table box that scrolls (.tbl-wrap and the like) and on the Events calendar strip. Phones already swipe, so touch is left alone.
   A press on a button, link, box or field still works normally; a drag never also "clicks". */
(function () {
  const SKIP = "a,button,input,select,textarea,label,summary,[contenteditable],[data-nodrag]";
  const scroller = (el) => {
    for (; el && el !== document.body; el = el.parentElement) {
      // tables, the officer calendar strip, and anything marked data-drag
      if (!el.querySelector || !(el.querySelector("table") || el.classList.contains("cal-scroll") || el.hasAttribute("data-drag"))) continue;
      const cs = getComputedStyle(el);
      const sx = /(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 2;
      const sy = /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 2;
      if (sx || sy) return el;
    }
    return null;
  };
  let drag = null, moved = false;
  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest(SKIP)) return;
    const box = scroller(e.target); if (!box) return;
    drag = { box, x: e.clientX, y: e.clientY, l: box.scrollLeft, t: box.scrollTop }; moved = false;
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    if (!moved) { moved = true; drag.box.classList.add("ds-drag"); window.getSelection && window.getSelection().removeAllRanges(); }
    drag.box.scrollLeft = drag.l - dx; drag.box.scrollTop = drag.t - dy;
    e.preventDefault();
  });
  window.addEventListener("pointerup", () => { if (drag) drag.box.classList.remove("ds-drag"); drag = null; setTimeout(() => (moved = false), 0); });
  document.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  // show the "grab" hand over table boxes that can scroll
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse") return;
    const box = scroller(e.target); if (box) box.classList.add("ds-can");
  });
  const st = document.createElement("style");
  st.textContent = "@media (pointer: fine){.ds-can{cursor:grab}.ds-can :is(a,button,input,select,textarea,label,summary){cursor:auto}.ds-can :is(a,button,summary){cursor:pointer}.ds-drag,.ds-drag *{cursor:grabbing!important;user-select:none}}";
  document.head.appendChild(st);
})();
