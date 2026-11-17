'use client';

interface HighlightCTAProps {
  headlineStart: string;
  highlightWord: string;
  as?: 'h1' | 'h2';
  href?: string;
  ariaLabel?: string;
}

export default function HighlightCTA({
  headlineStart,
  highlightWord,
  as: Tag = 'h1',
  href = '#request',
  ariaLabel = 'Request an invite',
}: HighlightCTAProps) {
  return (
    <Tag className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-[var(--cream)]">
      <span>{headlineStart}</span>{' '}
      <a
        href={href}
        aria-label={ariaLabel}
        className="block sm:inline-block mt-3 sm:mt-0 sm:ml-2 bg-[var(--cta)] text-[var(--cream)] px-3 sm:px-4 py-0.5 sm:py-1 rounded-none font-[family-name:var(--font-display)] transition-colors duration-200 ease-in-out cursor-pointer hover:bg-[var(--cream)] hover:text-[var(--cta)] focus:bg-[var(--cream)] focus:text-[var(--cta)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)] focus-visible:outline-offset-4"
      >
        {highlightWord}
      </a>
    </Tag>
  );
}
