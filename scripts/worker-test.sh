#!/usr/bin/env bash
# Runs the Worker locally (wrangler dev, no account needed) and checks that every route answers the way the site expects.
# A route that silently falls through to the AI handler (e.g. a forgotten path) is caught here: it would answer "empty" instead.
set -e
cd "$(dirname "$0")/../worker"
PORT=${PORT:-8787}
printf 'DISCORD_CLIENT_SECRET=test-only\nOFFICER_PASSWORD=test-pw\nVAPID_PRIVATE=\n' > .dev.vars   # dummy secrets for the local run only (file is git-ignored)
npx --yes wrangler@4 dev --local --port "$PORT" --ip 127.0.0.1 >/tmp/wrangler-dev.log 2>&1 &
WP=$!
trap 'kill $WP 2>/dev/null || true; rm -f .dev.vars' EXIT
for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/check" && break; sleep 1; done
O="Origin: https://nxsguides.github.io"
post() { curl -s -X POST "http://127.0.0.1:$PORT$1" -H "$O" -H "Content-Type: application/json" -d "$2"; }
fail=0
expect() { local got; got=$(post "$1" "$2"); if echo "$got" | grep -q "$3"; then echo "✅ $1 → $3"; else echo "❌ $1 expected $3, got: $got"; fail=1; fi; }
expect /board   '{"op":"list"}'   '"logged_out"'
expect /attend  '{"op":"list"}'   '"logged_out"'
expect /perms   '{"op":"get"}'    '"logged_out"'
expect /attend  '{"op":"list","pw":"test-pw","pwName":"Tester"}' '"ok":true'
expect /attend  '{"op":"list","pw":"wrong"}' '"logged_out"'
expect /perms   '{"op":"save","pw":"test-pw","perms":{"users":{}}}' '"not_admin"'
expect /sync    '{}'              '"logged_out"'
expect /auth/me '{}'              '"logged_out"'
expect /push/save '{"sub":{"endpoint":"https://x.example/a","keys":{"p256dh":"a","auth":"b"}},"timers":[]}' '"ok":true\|push_key_missing'
expect /push/save '{}'            '"bad subscription"\|push_key_missing'
expect /        '{"question":""}' '"empty"'
curl -s "http://127.0.0.1:$PORT/check" | grep -q '"worker":"ok"' && echo "✅ /check" || { echo "❌ /check"; fail=1; }
exit $fail
