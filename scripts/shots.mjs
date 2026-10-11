import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const outputDirectory = resolve('screenshots');
const server = await createServer({
  configFile: resolve('vite.config.ts'),
  server: { host: '127.0.0.1', port: 4173, strictPort: true },
});
let browser;

try {
  await mkdir(outputDirectory, { recursive: true });
  await server.listen();
  browser = await chromium.launch({ headless: true });

  for (const theme of ['light', 'dark']) {
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, isMobile: width === 375, hasTouch: width === 375 });
      await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
      await page.evaluate((value) => localStorage.setItem('wbx_theme', value), theme);
      await page.reload({ waitUntil: 'networkidle' });
      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (hasHorizontalOverflow) {
        throw new Error(`Horizontal overflow detected at ${width}px in ${theme} mode`);
      }
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
        }
        window.scrollTo(0, 0);
        await new Promise((resolveFrame) => requestAnimationFrame(resolveFrame));
      });
      await page.screenshot({
        path: resolve(outputDirectory, `home-${theme}-${width}.png`),
        fullPage: true,
        animations: 'disabled',
      });
      await page.close();
      console.log(`Saved screenshots/home-${theme}-${width}.png`);
    }
  }
} finally {
  await browser?.close();
  await server.close();
}
