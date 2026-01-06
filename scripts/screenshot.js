const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const urls = ['http://localhost:3000/', 'http://localhost:3000/analytics', 'http://localhost:3000/review'];
  const outDir = './playwright-screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (const u of urls) {
    try {
      await page.goto(u, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600); // allow small animations to settle
      const name = u.replace('http://localhost:3000', '').replace(/\//g, '') || 'home';
      const file = `${outDir}/${name || 'home'}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log('Saved', file);
    } catch (err) {
      console.error('Failed to capture', u, err.message);
    }
  }

  await browser.close();
})();
