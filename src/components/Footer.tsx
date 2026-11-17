export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[var(--cream)] border-t border-[var(--cream)]/10 py-12 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-[family-name:var(--font-body)] text-xs sm:text-sm text-[var(--cream)]/60">
        <span className="font-[family-name:var(--font-display)] tracking-tight text-base sm:text-lg text-[var(--cream)]/80">
          Erito
        </span>
        <p className="text-center sm:text-right leading-relaxed max-w-md">
          Wallet services will be offered through a licensed partner, subject to regulatory approval.
        </p>
      </div>
    </footer>
  );
}
