# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) when working with code in this repository.

## Project

Marketing site for Ogham Translation Services (oghamtranslations.com): a React 19 + Vite SPA using MUI, react-router, and i18next, plus a single PHP endpoint (`public/send-email.php`) that handles quote requests. Production is static files on Apache shared hosting (Infomaniak); there is no Node runtime on the server.

## Commands

```sh
npm ci
npm run dev                # Vite dev server on :5173
npm run lint               # ESLint (flat config, eslint.config.js)
npm run build              # outputs dist/
npm run test:e2e           # Playwright (Chromium)
npx playwright test -g "mobile menu"   # run a single e2e test by name

bash scripts/test-php.sh            # php -l + endpoint smoke test (405/400/503/429) on a local php -S server
php tests/contact-validation.php    # endpoint validation cases
php tests/smtp-protocol.php         # SMTP client against a loopback fake server (tests/fake-smtp.php)
```

CI (`.github/workflows/ci.yml`) runs exactly these with Node 24 and PHP 8.4. DEPLOYMENT.md has podman one-liners that run the PHP tests offline when PHP is not installed locally.

E2E notes: `playwright.config.js` starts two servers: the dev server on 5173 with a fake `VITE_RECAPTCHA_SITE_KEY`, and `vite preview` on 4173, which serves the existing `dist/`. Run `npm run build` (without `VITE_RECAPTCHA_SITE_KEY` set) before `test:e2e`. Tests that hit `127.0.0.1:4173` cover the production build and the no-CAPTCHA-key fallback. Outside CI, Playwright reuses whatever server is already listening on those ports, even one from another project. Run `CI=1 npm run test:e2e` to force fresh servers. Tests mock `/send-email.php` and never send mail. Some tests depend on specific accessible names and selectors:
- the mobile nav is opened by a button named "Open navigation menu" and its links are `menuitem`s;
- Portfolio cards use `.MuiCardActionArea-root`, and the PDF dialog has a "Next" button and "1 / 8" page text;
- the contact page has a "Request a Quote" heading, a "Submit Request" button, and the exact fallback sentence;
- the cookie banner has a "Decline" button.

## Architecture

- **Entry/routing**: `src/main.jsx` wraps the app in `Suspense` (required because i18next uses `useSuspense: true`) and `BrowserRouter`. `src/App.jsx` applies the MUI theme and defines all routes under `layouts/MainLayout`. `Portfolio` is lazy-loaded so that pdf.js/react-pdf only load on `/portfolio`; an e2e test asserts this, so don't import it eagerly. `pages/Blog.jsx` exists but its route is disabled.
- **Design system**: the visual concept is "carved ink on vellum": Ogham notch strokes, an ink-navy/indigo palette with shamrock and picton accents, on warm paper.
  - Brand tokens (`tokens`, `fonts`, `easing`) and the MUI theme (`createAppTheme(direction)`) live in `src/theme.js`. Headings use self-hosted Literata and body text uses Manrope (`@fontsource` imports at the top of `src/index.css`); don't add Google Fonts links.
  - `src/index.css` holds the CSS variables, the shared keyframes, the `.grain` overlay, the `.reveal` scroll-reveal styles and the cookie-banner styles. The banner is `react-cookie-consent` with `disableStyles`, and its z-index stays below MUI dialogs.
  - Shared building blocks are in `src/components/ui/`: `Reveal`, `OghamMark` (renders Latin text as an Ogham SVG that draws itself), `PageHero` (dark hero that renders each inner page's h1), `SectionHeading`, `GlyphField`, `Marquee` and `CountUp`. `src/hooks/useInView.js` shares one IntersectionObserver across all of them.
  - Page-specific pieces live in `src/components/<page>/`.
  - Global CSS turns off animations and transitions under `prefers-reduced-motion`. Any animation driven from JS (typewriter, counters) must check `prefersReducedMotion()` itself.
  - `<main>` uses `overflow-x: clip` so slide-in reveals can't widen the page. Don't change that to `hidden`, which breaks the sticky elements inside.
- **i18n**: All user-facing copy goes through `t()`. Strings are fetched at runtime from `public/locales/<lng>/translation.json` via i18next-http-backend. 14 languages are listed in `supportedLngs` in `src/i18n.js` with `en` as fallback. When you add or change a key, update every locale file. Detection order is localStorage → cookie → navigator, which is why tests set `localStorage.i18nextLng`.
- **RTL**: `contexts/DirectionContext.jsx` sets `<html dir/lang>` from the current language (Arabic is RTL) and feeds `direction` into the MUI theme. There is no stylis RTL plugin, so `ml`/`pr`/`left` in `sx` do **not** flip. Use logical properties instead (`marginInlineStart`, `paddingInlineEnd`, `insetInlineStart`, `textAlign: 'start'`). `src/styles/rtl.css` mirrors MUI icons unless they carry `keep-direction`/`check-icon`; give directional arrows `flip-in-rtl`.
- **Analytics consent**: `components/AnalyticsTracker.jsx` initializes GA4 only when the `oghamTranslationsConsent` cookie is `'true'`. The cookie banner in `App.jsx` dispatches a `ogham-consent-change` window event on accept or decline, and the tracker listens for it. Only `location.pathname` is sent (no query strings). An e2e test checks that declining consent produces no Google requests.
- **Portfolio PDFs**: sample before/after documents live in `public/pdfs/`. The pdf.js worker is resolved from `pdfjs-dist` via `new URL(..., import.meta.url)`; the `vite.config.js` alias exists for that.
- **Contact form → PHP**: `pages/Contact.jsx` POSTs JSON to `/send-email.php`. When a file is attached it sends multipart instead, with a `data` JSON field plus `file`. Both cases include a reCAPTCHA token. If `VITE_RECAPTCHA_SITE_KEY` is absent at build time, the form is disabled and shows a mailto fallback. On the server, `send-email.php` loads secrets from host env vars or from the file named by `OGHAM_ENV_FILE`, which lives outside the docroot. It enforces a file-based per-IP rate limit (`OGHAM_RATE_LIMIT_DIR`, 20/hour), validates the request, verifies reCAPTCHA including the hostname allowlist, checks the attachment extension allowlist, and sends via the minimal SMTP client in `public/smtp-protocol.php`. It **fails closed**: missing config returns 503, never a bypass. Keep that behavior, and never put server secrets in `VITE_*` variables or `dist/`.
- **Hosting config**: `public/.htaccess` contains the SPA rewrite and the Content-Security-Policy. Any new third-party origin (scripts, fonts, images, connect targets) must be added to the CSP there.

## Deployment

See DEPLOYMENT.md. In short: the CI `dist/` artifact deliberately has no CAPTCHA key and cannot be deployed as-is. A separate private workflow rebuilds an approved `main` SHA with a `__OGHAM_PUBLIC_CAPTCHA_KEY__` placeholder, and the key is injected on the server. The live `.htaccess` (which sets `OGHAM_ENV_FILE`) and the private `runtime.env` must not be overwritten from this repo.
