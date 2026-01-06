import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
