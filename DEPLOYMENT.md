# Ogham deployment

Build with Node.js 24 and `npm ci && npm run build`. Configure `VITE_RECAPTCHA_SITE_KEY` at build time with the public key for `oghamtranslations.com` / `www.oghamtranslations.com`. Without it the contact page remains usable but shows its email fallback and disables form submission.

The PHP endpoint needs cURL, OpenSSL and an SMTP connection to Infomaniak on port 465. Provide `SMTP_USER`, `SMTP_PASS` and `RECAPTCHA_SECRET_KEY` to PHP through the hosting configuration. Alternatively set `OGHAM_ENV_FILE` to a readable environment file **outside every site's document root**. Keep the file private; never put server secrets in a Vite `VITE_*` variable or in `dist/`.

The endpoint fails closed when verification or mail settings are missing. Verify these settings before replacing the live endpoint. Use a staging hostname only after adding it explicitly to the permitted CAPTCHA hostnames and its Google reCAPTCHA configuration; do not disable verification for testing.

Deploy the built static files and `send-email.php`. The old code could store contact submissions and logs inside the document root. Before deployment, inspect existing `contact_submissions/` and `logs/` privately, move any necessary records to protected storage with an appropriate retention period, and remove public access. This source change stops future writes there but cannot remove historical server files.

Release checks: PHP syntax/runtime compatibility on the target server, an authorized end-to-end contact test with and without an attachment, rejection of a missing/invalid CAPTCHA, email delivery, and a browser check that Analytics starts only after consent. No production message was sent as part of the repository audit.

## Release pipeline and rollback

CI validates Node 24 build/lint, PHP 8.4 endpoint cases and loopback SMTP protocol (plain and multipart messages, no external email), plus five mocked Playwright journeys. Its `dist/` artifact and `build-manifest.json` identify the immutable source SHA. This validation artifact has no production reCAPTCHA site key and is not a deployable release.

The private Welcomi workflow takes an approved Ogham `main` SHA after successful Ogham CI. It rebuilds that SHA with the literal `__OGHAM_PUBLIC_CAPTCHA_KEY__` placeholder and records an archive SHA256 **before injection**. It uploads the archive to a private staging path. The server activation script verifies that archive hash, copies the current live tree to a private rollback location, and replaces the placeholder in exactly one JavaScript asset with the **public** key read from `private/ogham/runtime.env`. No Node runtime is needed on the host; SMTP and CAPTCHA secrets remain outside the web root. The public `release.json` records the source SHA and pre-injection artifact hash, so its hash is not the hash of the final injected live tree.

Before activation, make a private backup of the current live tree and record its hash. Preserve the live `.htaccess` containing `OGHAM_ENV_FILE` and its private `runtime.env`; do not overwrite either from this repository. Activate with the hosting transport's controlled copy/swap and restore public file permissions (directories 755, files 644; private configuration remains 600). Smoke check `/`, `/portfolio`, a PDF, and `/contact` in a browser; verify CAPTCHA appears, GET `/send-email.php` returns 405, and the real analytics script is absent after rejecting consent. No smoke test submits a real quote. If checks fail, restore the prior live tree and preserve the same private configuration.

The PHP rate limiter uses a private writable directory next to `OGHAM_ENV_FILE` (`private/ogham/rate-limit`, 0700), or explicit `OGHAM_RATE_LIMIT_DIR`. The directory's parent must exist outside the document root. Requests fail closed with 503 if storage is unavailable. It allows 20 structurally valid attempts per source IP per hour before 429; this includes failed CAPTCHAs. Shared IP users may be affected. Set private directory rights before activation and observe 429/503 rates after release.

Offline PHP 8.4 checks from this repository (no external network):

```sh
podman run --rm --network=none --read-only --tmpfs /tmp -e OGHAM_ENV_FILE= -e RECAPTCHA_SECRET_KEY= -e SMTP_USER= -e SMTP_PASS= -v "$PWD:/app:ro,Z" docker.io/library/php:8.4-cli php /app/tests/contact-validation.php
podman run --rm --network=none --read-only --tmpfs /tmp -v "$PWD:/app:ro,Z" docker.io/library/php:8.4-cli php /app/tests/smtp-protocol.php
```

The second command connects only to a fake SMTP server listening on loopback. It does not prove Infomaniak authentication, remote delivery, or CAPTCHA acceptance on the public domain; those require an authorized live check.
