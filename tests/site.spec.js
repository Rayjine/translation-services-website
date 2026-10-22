import { test, expect } from '@playwright/test';

const english = async (page) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'en'));
};

test('portfolio PDF code loads on demand and page controls work', async ({ page }) => {
  await english(page);
  const scripts = [];
  page.on('response', response => {
    if (/\/assets\/Portfolio-.*\.js/.test(response.url())) scripts.push(response.url());
  });
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading', { name: /Ogham/i }).first()).toBeVisible();
  expect(scripts).toHaveLength(0);
  await page.goto('http://127.0.0.1:4173/portfolio');
  await expect(page.getByRole('tab', { name: /All/i })).toBeVisible();
  expect(scripts.length).toBeGreaterThan(0);
  await page.locator('.MuiCardActionArea-root').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('1 / 8').first()).toBeVisible({ timeout: 15000 });
  await dialog.getByRole('button', { name: 'Next' }).first().click();
  await expect(dialog.getByText('2 / 8').first()).toBeVisible();
});

test('mobile menu navigates to quote form', async ({ page }) => {
  await english(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('menuitem', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { name: 'Request a Quote' })).toBeVisible();
});

test('invalid quote form shows field errors and never sends', async ({ page }) => {
  await english(page);
  let sent = 0;
  await page.route('**/send-email.php', route => { sent++; return route.fulfill({ status: 500 }); });
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Submit Request' }).click();
  await expect(page.getByText('First name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  expect(sent).toBe(0);
});

test('missing CAPTCHA key gives a direct contact alternative', async ({ page }) => {
  await english(page);
  await page.goto('http://127.0.0.1:4173/contact');
  await expect(page.getByText('The online form is temporarily unavailable. Please email us directly at')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit Request' })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'info@oghamtranslations.com' }).first()).toHaveAttribute('href', 'mailto:info@oghamtranslations.com');
});

test('declining cookies never requests Google Analytics', async ({ page }) => {
  await english(page);
  const analytics = [];
  page.on('request', request => {
    if (/googletagmanager|google-analytics/.test(request.url())) analytics.push(request.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Decline' }).click();
  await page.goto('/services');
  expect(analytics).toHaveLength(0);
});

test('mobile drawer controls sit above the cookie banner', async ({ page, context }) => {
  await english(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Decline' })).toBeVisible();
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('presentation').getByRole('link', { name: 'Get a Quote' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  const cookies = await context.cookies();
  expect(cookies.find(c => c.name === 'oghamTranslationsConsent')).toBeUndefined();
});

test('quote form is revealed even when zoomed to 400%', async ({ page }) => {
  await english(page);
  await page.setViewportSize({ width: 320, height: 256 });
  await page.goto('/contact');
  const firstName = page.locator('input[name="firstName"]');
  await firstName.scrollIntoViewIfNeeded();
  await firstName.focus();
  await expect.poll(() => firstName.evaluate(el => {
    let o = 1;
    for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
    return o;
  })).toBe(1);
});
