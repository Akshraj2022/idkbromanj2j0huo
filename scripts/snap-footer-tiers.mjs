import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\67050605-fe30-4d19-8f6e-b66e5e7a051a\\clean-footer.png' });
  }

  const tiers = await page.$('section.bg-\\[var\\(--cream\\)\\]');
  if (tiers) {
    await tiers.screenshot({ path: 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\67050605-fe30-4d19-8f6e-b66e5e7a051a\\tiers-solid-brown-prodigy.png' });
  }

  await browser.close();
}

run().catch(console.error);
