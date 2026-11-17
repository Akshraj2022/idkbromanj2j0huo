import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use (Draft) — Erito",
  description: "Erito waitlist terms of use.",
};

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-bold"
      style={{ backgroundColor: "rgba(230, 199, 122, 0.25)", padding: "0.1em 0.35em" }}
    >
      {children}
    </span>
  );
}

export default function TermsPage() {
  return (
    <div style={{ background: "var(--dark)", color: "var(--cream)", minHeight: "100vh" }}>
      <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        {/* Back link */}
        <Link
          href="/"
          className="inline-block mb-10 text-sm tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity"
          style={{ fontFamily: "var(--font-label)" }}
        >
          &larr; Back to home
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 flex-wrap">
            <h1
              className="text-4xl md:text-5xl tracking-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Terms of Use
            </h1>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1"
              style={{
                background: "var(--cta)",
                color: "var(--cream)",
                fontFamily: "var(--font-label)",
              }}
            >
              Draft
            </span>
          </div>
        </header>

        {/* Content */}
        <div
          className="space-y-6"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.75 }}
        >
          <p className="opacity-80">
            These terms govern your use of the Erito waitlist at{" "}
            <Placeholder>[DOMAIN]</Placeholder>.
          </p>

          <p className="opacity-80">
            By joining the waitlist, you confirm you are a parent or legal guardian.
          </p>

          <p className="opacity-80">
            The waitlist is free. Joining does not guarantee an invite or a card.
          </p>

          <p className="opacity-80">
            Wallet services will be offered through a licensed partner, subject to regulatory
            approval.
          </p>

          <p className="mt-10 p-6 border border-current/10 opacity-80">
            <Placeholder>
              [PLACEHOLDER: Full terms to be drafted before launch. This is not a binding agreement
              for financial services.]
            </Placeholder>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
