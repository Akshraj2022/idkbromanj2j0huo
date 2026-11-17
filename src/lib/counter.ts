import fs from 'fs';
import path from 'path';

function getFilePath(): string {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, 'counter.json');
}

export async function getInterestCount(): Promise<number> {
  const filePath = getFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);
      if (typeof data.count === 'number') {
        return data.count;
      }
    }
  } catch (err) {
    console.error('Error reading counter file:', err);
  }

  // Initialize at 0 real counts
  try {
    fs.writeFileSync(filePath, JSON.stringify({ count: 0, last_updated: new Date().toISOString() }), 'utf-8');
  } catch {}
  return 0;
}

export async function incrementInterestCount(): Promise<number> {
  const filePath = getFilePath();
  let count = 0;

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);
      if (typeof data.count === 'number') {
        count = data.count;
      }
    }
  } catch (err) {
    console.error('Error reading counter file:', err);
  }

  count += 1;

  try {
    fs.writeFileSync(filePath, JSON.stringify({ count, last_updated: new Date().toISOString() }), 'utf-8');
  } catch (err) {
    console.error('Error writing counter file:', err);
  }

  return count;
}
