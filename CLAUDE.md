# Working on the NXS Guidelines site

- **Little Sparrow and the AI are always updated together.** Any new or changed feature (site or officer page) gets
  its Little Sparrow step (`js/sparrow.js`, officer pages: `OTOURS` + texts in en / zh / pt / ar / ko; main site: 12 languages)
  AND its AI text (`worker/worker.js` `OFFICER_HELP` for officer pages, `scripts/build-ai-context.js` SITE FEATURES for the site),
  plus one row in `FEATURES` in `scripts/check-help.js`. That script runs in CI and in the smoke test and fails if one side is missing.
- **Officer permissions apply to the AI too.** Every officer-handbook part belongs to a tab (`@tab` block or `[tab] ` line in
  `OFFICER_HELP`); officer data parts are mapped in `DATA_TABS`. The Worker only gives the AI the parts of tabs the asking officer
  may open (Discord login + the 👥 table). A new tab or new officer data → tag it, never leave it untagged.
- Guide text: edit `data/content.js`, then `node scripts/split-content.js` and `node scripts/build-ai-context.js`.
- Every change: bump `CACHE` in `sw.js`, run `node scripts/smoke.mjs` (and `bash scripts/worker-test.sh` if the Worker changed).
- Never commit plaintext officer or member data; never put secrets (VAPID private key, DISCORD_CLIENT_SECRET, OFFICER_PASSWORD) anywhere but Cloudflare / GitHub secrets.
- **Write for the page's reader.** No explaining what readers already know (e.g. just "Not leaders", no sentence about what fill-in rallies are). Research reports are read by members / officers so they can understand the gist and explain it to others: lead with what we observed and then suggestions, in plain short points — findings and advice, never orders (no "do this"). How it was worked out (formulas, data counts, sources, fits) goes in one folded section at the bottom or not at all. Never put Sherry's to-dos, capture requests, correction history or internal notes on a page — those go in the Project docs.
- **Bear Hunt: "leader" = the official A / B list only** (Project doc `claude/bear-findings.md` G0). Everyone else who opens a rally is a fill-in (opens in the last minutes to collect returning troops): show them apart, never count or compare them as leaders, never draw conclusions from them.
