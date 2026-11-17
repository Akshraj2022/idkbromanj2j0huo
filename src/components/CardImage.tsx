'use client';

import { useState, useEffect } from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  label: string;
  tier: 'basic' | 'core' | 'prodigy';
}

export default function CardImage({ src, alt, label, tier }: CardImageProps) {
  const [hasError, setHasError] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tiltClass = prefersReduced
    ? ''
    : 'hover:[transform:perspective(800px)_rotateY(6deg)_scale(1.02)] transition-all duration-500';

  if (hasError) {
    const cardBorder =
      tier === 'prodigy'
        ? 'border-2 border-[#8C6A2B]'
        : 'border border-[var(--dark)]/20';

    return (
      <div
        className={`w-full max-w-[280px] mx-auto aspect-[1/1.41] flex flex-col items-center justify-center text-center p-6 bg-black/[0.04] rounded-[22px] ${cardBorder} ${tiltClass}`}
      >
        <span
          className={`font-[family-name:var(--font-label)] text-lg uppercase tracking-widest mb-3 ${
            tier === 'prodigy' ? 'text-[#70521D] font-bold' : ''
          }`}
        >
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[var(--dark)]/70 font-mono border border-dashed border-[var(--dark)]/30 px-3 py-1 rounded-md">
          [Placeholder: /public{src}]
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[280px] mx-auto ${tiltClass}`}>
      <div
        className={`relative w-full rounded-[22px] overflow-hidden shadow-2xl ${
          tier === 'prodigy'
            ? 'p-[1.5px] bg-[#8C6A2B]'
            : 'border border-black/10'
        }`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto aspect-[1/1.41] object-cover rounded-[20px] block"
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  );
}
