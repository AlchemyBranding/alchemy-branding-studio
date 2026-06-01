import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "branding-services-cardiff",
    path: "/branding-services-cardiff",
    defaults: {
      title: "Branding Services in Cardiff",
      description:
        "Brand strategy, identity, websites and animation for ambitious businesses in Cardiff and across South Wales. Workshop-led branding from a studio that knows the patch.",
    },
  });
}

type Capability = { title: string; detail: string; href?: string };

const capabilities: Capability[] = [
  {
    title: "Brand strategy and positioning",
    detail:
      "Where every project starts. A focused workshop that gets you clear on who you are for and why you are different.",
    href: "/services",
  },
  {
    title: "Identity and design",
    detail:
      "Logos, colour, type and the full system, built to look as good as the work you do.",
  },
  {
    title: "Websites",
    detail:
      "Fast, clear websites that tell your story in five seconds and give visitors one obvious next step.",
  },
  {
    title: "Animation and video",
    detail:
      "Explainer videos and brand animation that make the complicated feel simple.",
    href: "/animation",
  },
];

export default function BrandingCardiffPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Branding in Cardiff
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Branding for Cardiff&apos;s</span>{" "}
            <span className="text-dusk italic">most ambitious businesses.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            Alchemy is a brand strategy, design and animation studio working
            with businesses across Cardiff and South Wales. We start with a
            clear strategy, then build the identity, website and content that
            flow from it, so ambitious local businesses look the part and win
            the work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href="/free-brand-audit-for-smes">
              Get your free brand audit
            </Button>
            <Button variant="secondary" href={motionHref} external>
              Book a call
            </Button>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section
        aria-labelledby="cardiff-capabilities-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What we do
          </p>
          <h2
            id="cardiff-capabilities-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            Everything your brand needs, in one studio.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => {
              const card = (
                <>
                  <h3 className="font-display text-[1.375rem] text-white group-hover:text-dragon-fire transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.65] text-white/65">
                    {item.detail}
                  </p>
                  {item.href ? (
                    <span className="mt-4 inline-block text-[0.8rem] font-medium uppercase tracking-[0.08em] text-dragon-fire">
                      Learn more &rarr;
                    </span>
                  ) : null}
                </>
              );
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group block h-full rounded-card bg-dawn border border-dawn-60 p-7 hover:border-dragon-fire transition-colors duration-200"
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className="group h-full rounded-card bg-dawn border border-dawn-60 p-7">
                      {card}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Local proof */}
      <section
        aria-labelledby="cardiff-local-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Local work
            </p>
            <h2
              id="cardiff-local-heading"
              className="font-display text-h2 mt-4 text-white"
            >
              Trusted by businesses across{" "}
              <span className="italic text-dusk">South Wales.</span>
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] leading-[1.75] text-white/70">
              We have built brands for a functional fitness gym in Crickhowell,
              coffee shops and wellness studios in Abergavenny, a public-sector
              campaign for Gwent Police, and ambitious businesses well beyond
              the M4. Being on your doorstep means we can sit in the room with
              you for the Brand Strategy Workshop where every project starts.
            </p>
            <div className="mt-10">
              <Button variant="primary" href="/portfolio">
                See our work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Thinking about your brand?"
        subtext="Start with a free brand audit, or book a call. We'll give you an honest read on where your brand stands and what we'd do first."
        primary={{ label: "Get your free brand audit", href: "/free-brand-audit-for-smes" }}
        secondary={{ label: "Book a call", href: motionHref, external: true }}
      />
    </>
  );
}
