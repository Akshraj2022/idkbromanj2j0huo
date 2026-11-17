import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\67050605-fe30-4d19-8f6e-b66e5e7a051a';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('--- Starting Browser Verification with Real Assets & Rounded Corners ---');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop full page (1280px)
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop-full-final.png'), fullPage: true });
  console.log('Captured desktop-full-final.png');

  // 2. Mobile full page (360px)
  await page.setViewport({ width: 360, height: 800 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile-full-final.png'), fullPage: true });
  console.log('Captured mobile-full-final.png');

  // 3. Tiers section close-up (showing rounded card images)
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to Tiers section
  await page.evaluate(() => {
    const tiers = document.querySelector('section.bg-\\[var\\(--cream\\)\\]');
    if (tiers) tiers.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  const tiersEl = await page.$('section.bg-\\[var\\(--cream\\)\\]');
  if (tiersEl) {
    await tiersEl.screenshot({ path: path.join(ARTIFACT_DIR, 'cards-tiers-rounded.png') });
    console.log('Captured cards-tiers-rounded.png');
  }

  // 4. Hero section close-up (showing wordmark)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  const heroEl = await page.$('section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-wordmark.png') });
    console.log('Captured hero-wordmark.png');
  }

  await browser.close();
  console.log('--- Verification Complete! ---');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
