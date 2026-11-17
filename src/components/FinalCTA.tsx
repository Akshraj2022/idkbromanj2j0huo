'use client';

import HighlightCTA from './HighlightCTA';
import WhatsAppCTA from './WhatsAppCTA';

export default function FinalCTA() {
  return (
    <section
      id="request"
      className="relative bg-[var(--dark)] text-[var(--cream)] py-24 sm:py-32 px-6 overflow-hidden"
    >
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

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-16 text-center">
        <HighlightCTA
          headlineStart="Start them"
          highlightWord="Ahead"
          as="h2"
          href="#request-form"
        />

        <WhatsAppCTA />
      </div>
    </section>
  );
}
