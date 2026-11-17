export default function HowInvitesWork() {
  return (
    <section className="bg-[var(--cream)] text-[var(--dark)] py-28 sm:py-36 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-[var(--dark)]/60 font-semibold">
            Admission & Criteria
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15]">
            Priority for parents. Reserved for exceptional teens.
          </h2>
        </div>

        <div className="space-y-6 font-[family-name:var(--font-body)] text-base sm:text-lg text-[var(--dark)]/80 leading-relaxed">
          <p>
            Joining our community ensures your family receives the opportunity to apply first the
            moment our application window opens.
          </p>
          <p>
            However, the card is granted to your teen, not to you.
          </p>
          <p>
            When applications for the wallet are reviewed, admission will be evaluated on
            demonstrated initiative and achievement&mdash;such as founding a venture, engineering a
            project, or pursuing exceptional creative and academic work. Erito is intentionally
            reserved for the young minds who will fuel the next chapter of the world.
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--dark)]/15">
          <p className="font-[family-name:var(--font-display)] italic text-xl sm:text-2xl text-[var(--dark)]/90">
            &ldquo;Not every card is given. Some are earned.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
