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
