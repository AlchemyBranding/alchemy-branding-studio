import type { Metadata } from "next";
import Link from "next/link";

import AuditThankYouTracking from "@/components/audit/AuditThankYouTracking";
import Button from "@/components/Button";
import { motionHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you — your brand audit request is in",
  description:
    "Thanks for requesting your free brand audit. We review your site and reply within three business days.",
  // Conversion / thank-you page: useful to land on, but keep it out of search.
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/free-brand-audit-for-smes/thank-you` },
};

export default function AuditThankYouPage() {
  return (
    <>
      <AuditThankYouTracking />
      <section className="bg-dawn flex items-center min-h-[70vh] pt-[160px] md:pt-[200px] pb-[120px]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Request received
          </p>
          <h1 className="font-display text-display mt-4 text-white leading-[1.05]">
            Got it. Your audit&apos;s{" "}
            <span className="italic text-dusk">on the way.</span>
          </h1>
          <p className="mt-6 text-[1.125rem] leading-[1.7] text-white/70">
            Thanks for requesting your free brand audit. We&apos;ll review your
            website and socials the way a buyer would, then reply within three
            business days with a short audit: what&apos;s working, what&apos;s
            costing you, and what we&apos;d fix first.
          </p>
          <p className="mt-4 text-[1rem] leading-[1.7] text-white/55">
            Keep an eye on your inbox, and the spam folder just in case. If
            anything&apos;s urgent in the meantime, book a call or message us on
            WhatsApp.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href={motionHref} external>
              Book a call
            </Button>
            <Button variant="secondary" href="/portfolio">
              See our work
            </Button>
          </div>

          <p className="mt-10 text-[0.875rem] text-white/40">
            <Link
              href="/"
              className="hover:text-dragon-fire transition-colors duration-200 underline underline-offset-4"
            >
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
