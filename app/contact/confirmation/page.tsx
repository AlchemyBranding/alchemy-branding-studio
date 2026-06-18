import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import ContactThankYouTracking from "@/components/contact/ContactThankYouTracking";
import { motionHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you — your message is in",
  description:
    "Thanks for getting in touch. We'll reply within one business day.",
  // Conversion / thank-you page: useful to land on, but keep it out of search.
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/contact/confirmation` },
};

export default function ContactConfirmationPage() {
  return (
    <>
      <ContactThankYouTracking />
      <section className="bg-dawn flex items-center min-h-[70vh] pt-[160px] md:pt-[200px] pb-[120px]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Message received
          </p>
          <h1 className="font-display text-display mt-4 text-white leading-[1.05]">
            Thanks. We&apos;ve{" "}
            <span className="italic text-dusk">got it.</span>
          </h1>
          <p className="mt-6 text-[1.125rem] leading-[1.7] text-white/70">
            We&apos;ll reply within one business day. If it&apos;s urgent,
            message us on WhatsApp, we&apos;re faster there.
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
