import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:5173', browserName: 'chromium' },
  webServer: [
    { command: 'VITE_RECAPTCHA_SITE_KEY=test-public-key npm run dev -- --host 127.0.0.1 --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
    { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
  ],
});
