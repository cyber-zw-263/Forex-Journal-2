const { chromium } = require('playwright');
const { injectAxe, checkA11y } = require('@axe-core/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pages = ['/', '/analytics', '/review'];
  const hosts = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://172.17.32.1:3000'];
  for (const p of pages) {
    let connected = false;
    for (const host of hosts) {
      const url = `${host}${p}`;
      try {
        console.log('Trying', url);
        const res = await page.goto(url, { waitUntil: 'load', timeout: 5000 });
        if (res && res.status && res.status() < 400) {
          console.log('Connected to', url);
          await injectAxe(page);
          const results = await page.evaluate(async () => await window.axe.run());
          if (results && results.violations && results.violations.length) {
            console.log(`Found ${results.violations.length} violations on ${p}`);
            results.violations.forEach(v => {
              console.log('---');
              console.log(v.id, v.impact, v.help);
              v.nodes.forEach((n) => {
                console.log('  -', n.target.join(', '));
              });
            });
          } else {
            console.log('No violations found on', p);
          }
          connected = true;
          break;
        }
      } catch (e) {
        // try next host
      }
    }
    if (!connected) {
      console.error('Unable to reach page', p);
      continue;
    }
    await injectAxe(page);
    const results = await page.evaluate(async () => await window.axe.run());
    if (results && results.violations && results.violations.length) {
      console.log(`Found ${results.violations.length} violations on ${p}`);
      results.violations.forEach(v => {
        console.log('---');
        console.log(v.id, v.impact, v.help);
        v.nodes.forEach((n) => {
          console.log('  -', n.target.join(', '));
        });
      });
    } else {
      console.log('No violations found on', p);
    }
  }
  await browser.close();
})();