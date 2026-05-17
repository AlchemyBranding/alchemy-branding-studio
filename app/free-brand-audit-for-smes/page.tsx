import type { Metadata } from "next";

import AuditForm from "@/components/audit/AuditForm";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "free-brand-audit",
    path: "/free-brand-audit-for-smes",
    defaults: {
      title: "Free Brand Audit for SMEs",
      description:
        "A free, no-commitment brand audit for ambitious SMEs. We'll review your site, your positioning and your messaging, and tell you exactly where the leaks are.",
    },
  });
}

const whatYouGet = [
  "A short audit doc with what's working, what isn't, and what we'd fix first",
  "Concrete notes on positioning, messaging and language, not just visual feedback",
  "Three prioritised next steps you can action with or without us",
];

const whoItsFor = [
  "Revenue: £500k – £15M",
  "A small in-house marketing team (or no team at all)",
  "Growing fast enough that the brand is starting to creak",
  "Open to feedback that goes past \"make the logo bigger\"",
];

export default function FreeBrandAuditPage() {
  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Free brand audit
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Show me</span>{" "}
            <span className="text-dusk italic">where the leaks are.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            A free, no-strings audit of your brand and marketing. Tell us
            where you&apos;re at, drop us your site, and we&apos;ll come
            back within three business days with a short doc covering
            what&apos;s working, what isn&apos;t, and what we&apos;d
            fix first. Positioning, messaging and language included,
            not just the visuals.
          </p>
        </div>
      </section>

      <section className="bg-dawn pb-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-start">
          <div className="space-y-14">
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                What you get
              </p>
              <h2 className="font-display text-h2 mt-3 text-white">
                Three points of clarity, written down.
              </h2>
              <ul className="mt-8 space-y-4">
                {whatYouGet.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-5 border-t border-dawn-80 pt-4"
                  >
                    <span
                      aria-hidden="true"
                      className="text-dragon-fire font-bold shrink-0 w-7"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[1.0625rem] leading-[1.6] text-white/80">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                Who it&apos;s for
              </p>
              <h2 className="font-display text-h2 mt-3 text-white">
                Built for growing businesses.
              </h2>
              <ul className="mt-8 space-y-3">
                {whoItsFor.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[1rem] leading-[1.6] text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="text-dragon-fire mt-[0.55rem] shrink-0 w-1.5 h-1.5 rounded-full bg-dragon-fire"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[0.9375rem] leading-[1.6] text-white/55 max-w-md">
                Not in this bracket? Drop us a line anyway. We&apos;ll let
                you know if we can still help, or point you somewhere that can.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <AuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
