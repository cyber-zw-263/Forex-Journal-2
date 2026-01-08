/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
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
