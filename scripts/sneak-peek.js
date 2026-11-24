/* Lists the official "sneak peek" posts of the Kingshot Wiki (upcoming events) in data/sneak-peek.json.
   Source: the wiki's RSS feed for its sneak-peek posts. Only titles, dates and links are kept, never the article text.
   Run by .github/workflows/sneak-peek.yml; the log prints counts only. */
const fs = require("fs");
const FEED = "https://kingshotwiki.com/feed/?post_type=sneak-peek";
const OUT = "data/sneak-peek.json";
const UA = { "user-agent": "Mozilla/5.0 (compatible; NXS-Guidelines sneak-peek check)", "accept": "application/rss+xml, text/xml, text/html" };
const pick = (s, tag) => { const m = s.match(new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">")); return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : ""; };
(async () => {
  const r = await fetch(FEED, { headers: UA });
  if (!r.ok) { console.error("feed: HTTP " + r.status); process.exit(1); }
  const xml = await r.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => ({ title: pick(m[1], "title"), date: new Date(pick(m[1], "pubDate")).toISOString(), en: pick(m[1], "link") }))
    .filter(x => /^https:\/\/kingshotwiki\.com\/sneak-peek\//.test(x.en));
  if (!items.length) { console.error("feed: no items"); process.exit(1); }
  let old = { items: [] };
  try { old = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch (e) { /* first run */ }
  const known = new Map((old.items || []).map(x => [x.en, x]));
  let added = 0;
  for (const it of items) {
    const was = known.get(it.en);
    if (was) { Object.assign(it, { tw: was.tw, ko: was.ko }); continue; }
    added++;
    try {   // the other language versions are linked from the English page
      const html = await (await fetch(it.en, { headers: UA })).text();
      for (const [k, code] of [["tw", "tw"], ["ko", "ko"]]) { const m = html.match(new RegExp('hreflang="' + code + '"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*hreflang="' + code + '"')); if (m) it[k] = m[1] || m[2]; }
    } catch (e) { /* links stay empty */ }
  }
  for (const x of old.items || []) if (!items.some(i => i.en === x.en)) items.push(x);   // keep posts that dropped out of the feed
  items.sort((a, b) => b.date.localeCompare(a.date));
  const next = JSON.stringify({ source: FEED, items }, null, 1) + "\n";
  if (added || !fs.existsSync(OUT)) fs.writeFileSync(OUT, next);
  console.log("sneak peek posts: " + items.length + ", new: " + added);
})();
