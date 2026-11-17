import FadeUp from './FadeUp';
import CardImage from './CardImage';

const tiers = [
  {
    name: 'BASIC',
    tier: 'basic' as const,
    description: 'Their first wallet. Set limits if you want to.',
    image: '/cards/basic.png',
    delay: 0,
  },
  {
    name: 'CORE',
    tier: 'core' as const,
    description: 'Earned through spending.',
    image: '/cards/core.png',
    delay: 150,
  },
  {
    name: 'PRODIGY',
    tier: 'prodigy' as const,
    description: 'By invitation only.',
    image: '/cards/prodigy.png',
    delay: 300,
  },
];

export default function Tiers() {
  return (
    <section className="bg-[var(--cream)] text-[var(--dark)] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        {tiers.map((t, i) => (
          <FadeUp
            key={t.tier}
            className={i === 1 ? 'md:-translate-y-10' : ''}
            style={{ transitionDelay: `${t.delay}ms` }}
          >
            <div className="flex flex-col items-center text-center gap-5">
              <CardImage
                src={t.image}
                alt={`${t.name} card`}
                label={t.name}
                tier={t.tier}
              />

              {t.tier === 'prodigy' ? (
                <h2 className="font-[family-name:var(--font-label)] text-xl uppercase tracking-widest text-[#70521D] font-bold">
                  {t.name}
                </h2>
              ) : (
                <h2 className="font-[family-name:var(--font-label)] text-xl uppercase tracking-widest font-semibold">
                  {t.name}
                </h2>
              )}

              <p className="font-[family-name:var(--font-body)] text-base opacity-70">
                {t.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
