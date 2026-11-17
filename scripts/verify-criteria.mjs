import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\67050605-fe30-4d19-8f6e-b66e5e7a051a';
const BASE_URL = 'http://localhost:3000';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot the criteria section
  const sections = await page.$$('section');
  for (const s of sections) {
    const text = await s.evaluate(el => el.innerText);
    if (text.includes('Admission & Criteria')) {
      await s.screenshot({ path: path.join(ARTIFACT_DIR, 'how-invites-work-criteria.png') });
      console.log('Captured how-invites-work-criteria.png');
      break;
    }
  }

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop-full-final.png'), fullPage: true });
  console.log('Updated desktop-full-final.png');

  await browser.close();
}

run().catch(console.error);
