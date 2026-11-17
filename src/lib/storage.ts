import { createClient } from '@supabase/supabase-js';

export interface WaitlistEntry {
  email: string;
  child_age_band: '10-12' | '13-15' | '16-17';
  tier_interest: string | null;
  invite_code: string | null;
  consent_given: boolean;
  consent_at: string;
  consent_text_version: string;
}

interface SaveResult {
  success: boolean;
  error?: string;
}

export async function saveWaitlistEntry(data: WaitlistEntry): Promise<SaveResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    return saveToSupabase(supabaseUrl, supabaseKey, data);
  }

  if (process.env.NODE_ENV === 'development') {
    return saveToJsonFile(data);
  }

  throw new Error('Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
}

async function saveToSupabase(
  url: string,
  key: string,
  data: WaitlistEntry,
): Promise<SaveResult> {
  const supabase = createClient(url, key);

  const { error } = await supabase.from('waitlist').insert({
    email: data.email,
    child_age_band: data.child_age_band,
    tier_interest: data.tier_interest,
    invite_code: data.invite_code,
    consent_given: data.consent_given,
    consent_at: data.consent_at,
    consent_text_version: data.consent_text_version,
  });

  if (error) {
    // Supabase unique constraint violation code
    if (error.code === '23505') {
      return { success: false, error: 'duplicate' };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

async function saveToJsonFile(data: WaitlistEntry): Promise<SaveResult> {
  // Dynamic import so this only loads in dev (Node.js only)
  const fs = await import('fs');
  const path = await import('path');

  const dir = path.join(process.cwd(), 'data');
  const filePath = path.join(dir, 'waitlist.json');

  try {
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Read → parse → push → write (simple file lock via sync ops)
    let entries: (WaitlistEntry & { id: string; created_at: string })[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      entries = JSON.parse(raw);
    }

    // Check for duplicate email
    if (entries.some((e) => e.email === data.email)) {
      return { success: false, error: 'duplicate' };
    }

    entries.push({
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...data,
    });

    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to write to file',
    };
  }
}
