const items = ['Set limits', 'See activity', 'Approve every invite'];

export default function ParentControl() {
  return (
    <section className="bg-[var(--cream)] text-[var(--dark)] py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {items.map((item, i) => (
          <div
            key={item}
            className={`py-8 sm:py-10 ${
              i < items.length - 1 ? 'border-b border-[var(--dark)]/10' : ''
            }`}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl tracking-tight">
              {item}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
