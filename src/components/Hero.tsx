'use client';

import { useState } from 'react';
import HighlightCTA from './HighlightCTA';

export default function Hero() {
  const [wordmarkError, setWordmarkError] = useState(false);

  return (
    <section className="relative bg-[var(--dark)] text-[var(--cream)] min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-10 md:gap-14">
        {/* Wordmark */}
        {wordmarkError ? (
          <div className="flex flex-col items-center gap-2 border border-dashed border-[var(--cream)]/30 px-6 py-3 bg-[var(--cream)]/[0.03] rounded-lg">
            <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--cream)]">
              Erito
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--cream)]/60 font-mono">
              [Placeholder: /public/brand/wordmark.png]
            </span>
          </div>
        ) : (
          <img
            src="/brand/wordmark.png"
            alt="Erito"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain select-none"
            onError={() => setWordmarkError(true)}
          />
        )}

        {/* Headline */}
        <HighlightCTA
          headlineStart="Not every card is"
          highlightWord="Earned"
          as="h1"
          href="#request"
          ariaLabel="Request an invite"
        />

        {/* Subline */}
        <p className="font-[family-name:var(--font-body)] text-lg sm:text-2xl text-[var(--cream)]/70 max-w-xl leading-relaxed">
          A first wallet for your child, built around standards.
        </p>
      </div>
    </section>
  );
}
