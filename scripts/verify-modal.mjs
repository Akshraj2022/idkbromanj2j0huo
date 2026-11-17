import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\67050605-fe30-4d19-8f6e-b66e5e7a051a';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('--- Verifying Share Modal, Clean Footer, and Solid Brown Prodigy ---');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Screenshot Prodigy tier in Tiers section (verifying solid brown title)
  const tiersEl = await page.$('section.bg-\\[var\\(--cream\\)\\]');
  if (tiersEl) {
    await tiersEl.screenshot({ path: path.join(ARTIFACT_DIR, 'tiers-solid-brown-prodigy.png') });
    console.log('Captured tiers-solid-brown-prodigy.png');
  }

  // 2. Click WhatsApp CTA to open the Share Image Modal
  await page.evaluate(() => {
    const cta = document.querySelector('a[aria-label="Join WhatsApp Announcement Channel"]');
    if (cta) cta.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Screenshot the Modal Dialog
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modal-popup-share.png') });
  console.log('Captured modal-popup-share.png');

  // 4. Close modal and screenshot clean footer
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(ARTIFACT_DIR, 'clean-footer.png') });
    console.log('Captured clean-footer.png');
  }

  await browser.close();
  console.log('--- Verification Complete! ---');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
