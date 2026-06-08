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
        "A genuine, no-obligation review of your brand the way a buyer sees it. We tell you what's working, what's costing you, and what to fix first. Free.",
    },
  });
}

const howItWorks = [
  {
    title: "Send us the links.",
    detail: "Your website and socials, plus a line on where you feel stuck.",
  },
  {
    title: "We review it like a buyer would.",
    detail:
      "Across strategy, messaging, design and consistency, not just how it looks.",
  },
  {
    title: "You get the doc.",
    detail:
      "A short, honest read: what's working, what isn't, and what we'd fix first.",
  },
];

const whatWeLookAt = [
  {
    area: "Strategy and positioning",
    question: "Is it clear who you are for, and why you are different?",
  },
  {
    area: "Identity and design",
    question: "Does the brand look as good as the work?",
  },
  {
    area: "Website",
    question: "Does a first-time visitor get it in five seconds?",
  },
  {
    area: "Content and social",
    question: "Do your channels build trust, or chip away at it?",
  },
  {
    area: "Consistency and trust",
    question: "Does it hold together across every touchpoint?",
  },
];

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
            A free, no-strings review of your brand and marketing. Send us your
            site and socials, tell us where you are, and within three business
            days you get a short doc covering what&apos;s working, what
            isn&apos;t, and what to fix first. Positioning, messaging and
            language included, not just the visuals.
          </p>
        </div>
      </section>

      <section className="bg-dawn pb-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-start">
          <div className="space-y-14">
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                How it works
              </p>
              <h2 className="font-display text-h2 mt-3 text-white">
                Three days, three steps.
              </h2>
              <ul className="mt-8 space-y-4">
                {howItWorks.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-5 border-t border-dawn-80 pt-4"
                  >
                    <span
                      aria-hidden="true"
                      className="text-dragon-fire font-bold shrink-0 w-7"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[1.0625rem] font-medium text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[1rem] leading-[1.6] text-white/70">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                What we look at
              </p>
              <h2 className="font-display text-h2 mt-3 text-white">
                The five things we check.
              </h2>
              <ul className="mt-8 space-y-4">
                {whatWeLookAt.map((item) => (
                  <li
                    key={item.area}
                    className="border-t border-dawn-80 pt-4"
                  >
                    <p className="font-display text-[1.125rem] text-white">
                      {item.area}
                    </p>
                    <p className="mt-1 text-[1rem] leading-[1.6] text-white/65">
                      {item.question}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[0.9375rem] leading-[1.6] text-white/55 max-w-md">
                Want to run it yourself first?{" "}
                <a
                  href="/alchemy-brand-checklist.pdf"
                  download
                  className="text-dragon-fire underline underline-offset-4 hover:text-fire-80 transition-colors"
                >
                  Download the brand checklist.
                </a>
              </p>
            </div>

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
                Not in this bracket? Drop us a line anyway. We&apos;ll let you
                know if we can still help, or point you somewhere that can. No
                pitch, no pressure. Sometimes the honest answer is that you
                don&apos;t need us yet.
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
