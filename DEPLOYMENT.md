# Ogham deployment

Build with Node.js 22 or 24 and `npm ci && npm run build`. Configure `VITE_RECAPTCHA_SITE_KEY` at build time with the public key for `oghamtranslations.com` / `www.oghamtranslations.com`. Without it the contact page remains usable but shows its email fallback and disables form submission.

The PHP endpoint needs cURL, OpenSSL and an SMTP connection to Infomaniak on port 465. Provide `SMTP_USER`, `SMTP_PASS` and `RECAPTCHA_SECRET_KEY` to PHP through the hosting configuration. Alternatively set `OGHAM_ENV_FILE` to a readable environment file **outside every site's document root**. Keep the file private; never put server secrets in a Vite `VITE_*` variable or in `dist/`.

The endpoint fails closed when verification or mail settings are missing. Verify these settings before replacing the live endpoint. Use a staging hostname only after adding it explicitly to the permitted CAPTCHA hostnames and its Google reCAPTCHA configuration; do not disable verification for testing.

Deploy the built static files and `send-email.php`. The old code could store contact submissions and logs inside the document root. Before deployment, inspect existing `contact_submissions/` and `logs/` privately, move any necessary records to protected storage with an appropriate retention period, and remove public access. This source change stops future writes there but cannot remove historical server files.

Release checks: PHP syntax/runtime compatibility on the target server, an authorized end-to-end contact test with and without an attachment, rejection of a missing/invalid CAPTCHA, email delivery, and a browser check that Analytics starts only after consent. No production message was sent as part of the repository audit.
