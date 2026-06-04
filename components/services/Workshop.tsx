import Image from "next/image";

import Button from "@/components/Button";
import { motionHref } from "@/lib/site";

const outcomes = [
  {
    title: "Sharp positioning",
    body: "A short, memorable statement of who you serve, what you do, and why it matters, that your team can repeat under pressure.",
  },
  {
    title: "Audience clarity",
    body: "Defined ideal-customer segments, the words they use, and the buying journey you're actually operating in.",
  },
  {
    title: "A brand strategy doc",
    body: "Story, voice, messaging pillars, proof points: everything you need to brief copy, design, sales and hiring.",
  },
  {
    title: "A roadmap for what's next",
    body: "Identity, website, content, sales collateral: sequenced and costed, so the next 6–12 months are clear.",
  },
];

export default function Workshop() {
  return (
    <section
      aria-labelledby="workshop-heading"
      className="bg-dusk text-dawn py-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Where we start
            </p>
            <h2
              id="workshop-heading"
              className="font-display text-h2 mt-4 text-dawn"
            >
              The Brand Strategy Workshop.
            </h2>
            <p className="mt-6 text-[1.125rem] leading-[1.7] text-dawn/70 max-w-lg">
              Before we touch a logo, a website or a campaign, we run a
              structured workshop with your leadership team. The goal is to
              name what&apos;s actually broken, and end with a strategy
              you can use, not a deck that gathers dust.
            </p>
            <p className="mt-6 text-[1.125rem] leading-[1.7] text-dawn/70 max-w-lg">
              Most teams leave the workshop with a clearer view of their
              business than they came in with. The next steps usually
              build themselves.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" href={motionHref} external>
                Book a discovery call
              </Button>
              <Button variant="secondary" href="/contact">
                Send a brief
              </Button>
            </div>

            <div className="mt-10 relative aspect-[16/9] w-full max-w-lg overflow-hidden rounded-card border border-dawn/15">
              <Image
                src="/desk-chairs.jpg"
                alt="The Alchemy studio set up for a brand strategy workshop"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="space-y-6">
            {outcomes.map((o, i) => (
              <li
                key={o.title}
                className="rounded-card bg-white/60 border border-dawn/10 p-7"
              >
                <p className="text-dragon-fire font-bold text-[0.9rem] tracking-wider">
                  Outcome 0{i + 1}
                </p>
                <h3 className="mt-2 font-bold text-[1.25rem] text-dawn">
                  {o.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/70">
                  {o.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
