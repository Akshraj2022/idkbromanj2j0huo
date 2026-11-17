import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { saveWaitlistEntry } from '@/lib/storage';

const CONSENT_TEXT_VERSION = '2026-11-17-v1';

const VALID_AGE_BANDS = ['10-12', '13-15', '16-17'] as const;
const VALID_TIERS = ['Basic', 'Core', 'Prodigy (invite only)', 'Not sure yet'] as const;

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfter ?? 900) },
      },
    );
  }

  // ── Parse body ──────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { errors: { form: 'Invalid request body.' } },
      { status: 400 },
    );
  }

  // ── Honeypot check ──────────────────────────────────────────────
  if (body.website) {
    // Bot detected — silently succeed
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Timing check (minimum 2 seconds) ───────────────────────────
  if (typeof body.timestamp === 'number') {
    const elapsed = Date.now() - body.timestamp;
    if (elapsed < 2000) {
      // Too fast — likely a bot; silently succeed
      return NextResponse.json({ success: true }, { status: 200 });
    }
  }

  // ── Validate fields ─────────────────────────────────────────────
  const errors: Record<string, string> = {};

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const childAgeBand = body.child_age_band as string;
  if (!childAgeBand || !(VALID_AGE_BANDS as readonly string[]).includes(childAgeBand)) {
    errors.child_age_band = 'Please select a valid age band.';
  }

  const tierInterest = body.tier_interest as string | null | undefined;
  if (tierInterest != null && tierInterest !== '' && !(VALID_TIERS as readonly string[]).includes(tierInterest)) {
    errors.tier_interest = 'Please select a valid tier.';
  }

  if (body.consent_given !== true) {
    errors.consent_given = 'You must confirm you are a parent or legal guardian.';
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // ── Save ────────────────────────────────────────────────────────
  const inviteCode = typeof body.invite_code === 'string' && body.invite_code.trim()
    ? body.invite_code.trim()
    : null;

  const result = await saveWaitlistEntry({
    email,
    child_age_band: childAgeBand as '10-12' | '13-15' | '16-17',
    tier_interest: tierInterest ?? null,
    invite_code: inviteCode,
    consent_given: true,
    consent_at: new Date().toISOString(),
    consent_text_version: CONSENT_TEXT_VERSION,
  });

  if (!result.success) {
    if (result.error === 'duplicate') {
      return NextResponse.json(
        { error: 'duplicate' },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { errors: { form: result.error ?? 'Failed to save entry.' } },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
