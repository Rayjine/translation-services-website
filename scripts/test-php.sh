#!/usr/bin/env bash
set -euo pipefail
php -l public/send-email.php
rate_dir=$(mktemp -d)
server_log=$(mktemp)
cleanup() { kill "$server_pid" 2>/dev/null || true; rm -rf "$rate_dir" "$server_log"; }
trap cleanup EXIT
# No CAPTCHA secret or SMTP credentials: every valid submission stops before mail.
env -u RECAPTCHA_SECRET_KEY -u OGHAM_ENV_FILE OGHAM_RATE_LIMIT_DIR="$rate_dir" php -S 127.0.0.1:8787 -t public >"$server_log" 2>&1 &
server_pid=$!
for attempt in {1..30}; do
  if curl -fsS http://127.0.0.1:8787/ >/dev/null 2>&1; then break; fi
  sleep 0.2
done
status=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8787/send-email.php)
[[ "$status" == 405 ]] || { echo "GET expected 405, got $status"; exit 1; }
status=$(curl -s -o /dev/null -w '%{http_code}' -H 'Content-Type: application/json' -d '{}' http://127.0.0.1:8787/send-email.php)
[[ "$status" == 400 ]] || { echo "Invalid body expected 400, got $status"; exit 1; }
payload='{"firstName":"Test","lastName":"Only","email":"test@example.com","sourceLanguage":"English","targetLanguage":"French","serviceType":"Translation","projectDetails":"A test request","agreeToTerms":true,"recaptchaToken":"test-token"}'
for attempt in {1..20}; do
  status=$(curl -s -o /dev/null -w '%{http_code}' -H 'Content-Type: application/json' -d "$payload" http://127.0.0.1:8787/send-email.php)
  [[ "$status" == 503 ]] || { echo "Unconfigured CAPTCHA expected 503, got $status"; exit 1; }
done
status=$(curl -s -o /dev/null -w '%{http_code}' -H 'Content-Type: application/json' -d "$payload" http://127.0.0.1:8787/send-email.php)
[[ "$status" == 429 ]] || { echo "Rate limit expected 429, got $status"; exit 1; }
echo 'PHP endpoint smoke passed (405, 400, 503, 429; no mail sent)'
