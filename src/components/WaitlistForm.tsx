'use client';

import { useState, useRef, useEffect, Suspense, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CONSENT_TEXT_VERSION = '2026-11-17-v1';

const AGE_BANDS = ['10-12', '13-15', '16-17'] as const;
const TIERS = ['Basic', 'Core', 'Prodigy (invite only)', 'Not sure yet'] as const;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

interface FieldErrors {
  email?: string;
  child_age_band?: string;
  consent_given?: string;
  form?: string;
}

function WaitlistFormInner() {
  const searchParams = useSearchParams();
  const renderTime = useRef<number>(Date.now());

  const [email, setEmail] = useState('');
  const [ageBand, setAgeBand] = useState('');
  const [tier, setTier] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prefill invite code from ?ref=
  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setInviteCode(refParam);
    }
    renderTime.current = Date.now();
  }, [searchParams]);

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!ageBand || !AGE_BANDS.includes(ageBand as (typeof AGE_BANDS)[number])) {
      errs.child_age_band = 'Please select your child’s age band.';
    }
    if (!consent) {
      errs.consent_given = 'You must confirm you are a parent or legal guardian.';
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          child_age_band: ageBand,
          tier_interest: tier || null,
          invite_code: inviteCode.trim() || null,
          consent_given: consent,
          consent_text_version: CONSENT_TEXT_VERSION,
          website: honeypot,
          timestamp: renderTime.current,
        }),
      });

      if (res.status === 409) {
        setErrors({ email: 'This email is already on the waitlist.' });
        return;
      }

      if (res.status === 429) {
        setErrors({ form: 'Too many requests. Please try again later.' });
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ form: 'Something went wrong. Please try again.' });
        }
        return;
      }

      setSuccess(true);
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div id="request-form" className="py-16 text-center max-w-lg mx-auto w-full">
        <p
          className="text-2xl text-[var(--cream)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          You&rsquo;re on the list. We&rsquo;ll email you when there&rsquo;s news.
        </p>
      </div>
    );
  }

  return (
    <div id="request-form" className="max-w-lg mx-auto w-full text-left">
      {/* Short notice shown directly above the fields */}
      <div className="mb-10 p-6 bg-white/[0.04] border border-[var(--cream)]/15 text-xs sm:text-sm leading-relaxed text-[var(--cream)]/80">
        <p>
          This form is for parents and legal guardians only. Joining is free and is not a guarantee
          of an invite or a card. We collect your email, your child&rsquo;s age band (not their
          name) and the tier you&rsquo;re interested in. Nothing else, and no payment details. We
          use it to contact you about the waitlist and invites, and to understand demand. We
          don&rsquo;t sell it, and we won&rsquo;t share it with a financial partner without asking
          you first. Only the Erito project owner can see it. We keep it until{' '}
          <span className="bg-[#E6C77A]/25 text-[var(--cream)] font-mono px-1 py-0.5 font-semibold">
            [12]
          </span>{' '}
          months after launch or until you ask us to delete it. To see, correct or delete your data
          or withdraw consent, email{' '}
          <span className="bg-[#E6C77A]/25 text-[var(--cream)] font-mono px-1 py-0.5 font-semibold">
            [CONTACT EMAIL]
          </span>
          . Grievances:{' '}
          <span className="bg-[#E6C77A]/25 text-[var(--cream)] font-mono px-1 py-0.5 font-semibold">
            [OWNER NAME]
          </span>
          , same email.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* General form error */}
        {errors.form && (
          <div
            role="alert"
            className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 text-sm"
          >
            {errors.form}
          </div>
        )}

        {/* 1. Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-widest text-[var(--cream)]/90 mb-2"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Parent or guardian email <span className="text-[var(--cta)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
            className="w-full bg-transparent border-b border-[var(--cream)]/30 py-3 text-[var(--cream)] placeholder-[var(--cream)]/30 outline-none focus:border-[var(--cream)] transition-colors text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* 2. Child's age band */}
        <fieldset>
          <legend
            className="block text-xs uppercase tracking-widest text-[var(--cream)]/90 mb-3"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Your child&rsquo;s age band <span className="text-[var(--cta)]">*</span>
          </legend>
          <div className="flex gap-6 flex-wrap" role="radiogroup">
            {AGE_BANDS.map((band) => (
              <label
                key={band}
                className="flex items-center gap-2.5 cursor-pointer text-sm text-[var(--cream)]/90 hover:text-[var(--cream)] transition-colors"
              >
                <input
                  type="radio"
                  name="child_age_band"
                  value={band}
                  checked={ageBand === band}
                  onChange={(e) => setAgeBand(e.target.value)}
                  className="w-4 h-4 accent-[var(--cta)]"
                  aria-describedby={errors.child_age_band ? 'age-error' : undefined}
                />
                <span style={{ fontFamily: 'var(--font-body)' }}>{band}</span>
              </label>
            ))}
          </div>
          {errors.child_age_band && (
            <p id="age-error" role="alert" className="mt-2 text-xs text-red-400">
              {errors.child_age_band}
            </p>
          )}
        </fieldset>

        {/* 3. Tier interest */}
        <fieldset>
          <legend
            className="block text-xs uppercase tracking-widest text-[var(--cream)]/90 mb-3"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Which tier interests you most? <span className="text-[var(--cream)]/40 text-[10px] lowercase">(optional)</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
            {TIERS.map((t) => (
              <label
                key={t}
                className={`flex items-center gap-2.5 p-3 border transition-colors cursor-pointer text-sm ${
                  tier === t
                    ? 'border-[var(--cream)] bg-white/[0.06] text-[var(--cream)]'
                    : 'border-[var(--cream)]/15 text-[var(--cream)]/80 hover:border-[var(--cream)]/30'
                }`}
              >
                <input
                  type="radio"
                  name="tier_interest"
                  value={t}
                  checked={tier === t}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-4 h-4 accent-[var(--cta)]"
                />
                <span style={{ fontFamily: 'var(--font-body)' }}>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 4. Invite code */}
        <div>
          <label
            htmlFor="invite_code"
            className="block text-xs uppercase tracking-widest text-[var(--cream)]/90 mb-2"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Invite code <span className="text-[var(--cream)]/40 text-[10px] lowercase">(optional)</span>
          </label>
          <input
            id="invite_code"
            name="invite_code"
            type="text"
            placeholder="e.g. EARLY2026"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--cream)]/30 py-3 text-[var(--cream)] placeholder-[var(--cream)]/30 outline-none focus:border-[var(--cream)] transition-colors text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>

        {/* 5. Consent checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer text-sm text-[var(--cream)]/90 leading-snug">
            <input
              type="checkbox"
              name="consent_given"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[var(--cta)] shrink-0"
              aria-describedby={errors.consent_given ? 'consent-error' : undefined}
              aria-invalid={errors.consent_given ? 'true' : 'false'}
            />
            <span style={{ fontFamily: 'var(--font-body)' }}>
              Yes, I&rsquo;m a parent or legal guardian, and Erito can contact me about this
              waitlist. See our{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 text-[var(--cream)] hover:text-white transition-colors"
              >
                privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.consent_given && (
            <p id="consent-error" role="alert" className="mt-2 text-xs text-red-400">
              {errors.consent_given}
            </p>
          )}
        </div>

        {/* Honeypot — visually hidden bot trap */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* 6. Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-8 uppercase tracking-widest text-sm font-semibold transition-all duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[var(--cream)] focus-visible:outline-offset-4 disabled:opacity-50 cursor-pointer"
            style={{
              fontFamily: 'var(--font-label)',
              backgroundColor: 'var(--cta)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'var(--cream)';
              btn.style.color = 'var(--cta)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = 'var(--cta)';
              btn.style.color = '#FFFFFF';
            }}
          >
            {submitting ? 'Submitting…' : 'Request an invite'}
          </button>
          <p
            className="text-center text-xs mt-3 text-[var(--cream)]/60"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No payment required.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function WaitlistForm() {
  return (
    <Suspense
      fallback={
        <div id="request-form" className="py-12 text-center text-sm text-[var(--cream)]/50">
          Loading request form…
        </div>
      }
    >
      <WaitlistFormInner />
    </Suspense>
  );
}
