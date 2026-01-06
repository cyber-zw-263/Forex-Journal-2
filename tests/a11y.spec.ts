import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/analytics', '/review'];

for (const p of pages) {
  test(`a11y ${p}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${p}`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
