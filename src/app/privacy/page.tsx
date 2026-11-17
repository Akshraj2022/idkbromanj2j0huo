import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Notice (Draft) — Erito",
  description: "Erito waitlist privacy notice and data practices for parents and guardians.",
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

export default function PrivacyPage() {
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
              Privacy Notice
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

        {/* Sections */}
        <div className="space-y-12" style={{ fontFamily: "var(--font-body)", lineHeight: 1.75 }}>
          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What we collect
            </h2>
            <p className="opacity-80">
              Your email address, your child&rsquo;s age band (not their name), your tier interest,
              and an invite code if you provide one. That&rsquo;s it.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why
            </h2>
            <p className="opacity-80">
              To manage the waitlist, send invites when spaces open, and understand demand so we can
              plan accordingly.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What we don&rsquo;t do
            </h2>
            <p className="opacity-80">
              We don&rsquo;t sell your data. We don&rsquo;t share it with any financial partner
              without your consent. We don&rsquo;t use advertising pixels, retargeting, session
              replay, or cross-site tracking. There are no cookies used for tracking. If analytics
              are needed in future, we will use cookieless, privacy-friendly tools only.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who can see it
            </h2>
            <p className="opacity-80">
              Only the Erito project owner has access to the data you submit.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How long we keep it
            </h2>
            <p className="opacity-80">
              Until <Placeholder>[12]</Placeholder> months after launch, or until you ask us to
              delete it &mdash; whichever comes first.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your rights
            </h2>
            <p className="opacity-80">
              You can see, correct, or delete your data at any time. You can withdraw your consent
              by emailing <Placeholder>[CONTACT EMAIL]</Placeholder>.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Complaints
            </h2>
            <p className="opacity-80">
              Contact <Placeholder>[OWNER NAME]</Placeholder> at{" "}
              <Placeholder>[CONTACT EMAIL]</Placeholder>. If you are not satisfied with our
              response, you may contact{" "}
              <Placeholder>[RELEVANT AUTHORITY — PLACEHOLDER]</Placeholder>.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Security
            </h2>
            <p className="opacity-80">
              Data is stored in Supabase with row-level security enabled. Access is restricted to
              the project owner.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Changes
            </h2>
            <p className="opacity-80">
              We may update this notice. The consent text version is recorded with your sign-up. If
              we make material changes, we will email you.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
