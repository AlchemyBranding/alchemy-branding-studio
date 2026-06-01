import type { Metadata } from "next";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import PortfolioCard from "@/components/home/PortfolioCard";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  animationCaseStudiesQuery,
  type FeaturedCaseStudy,
} from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "animation",
    path: "/animation",
    defaults: {
      title: "Animation & Explainer Videos",
      description:
        "Explainer videos and brand animation for businesses with something complicated to explain. Script-first, designed not templated, built to be reused.",
    },
  });
}

const whatWeMake = [
  {
    title: "Explainer videos",
    detail:
      "Turn a complex product, process or regulation into a short film people actually finish.",
  },
  {
    title: "Brand animation",
    detail:
      "Logo animation, motion systems and brand assets that make the identity feel considered in every channel.",
  },
  {
    title: "Social and campaign",
    detail:
      "Short, made-for-feed pieces for launches, campaigns and the everyday scroll.",
  },
  {
    title: "Style frames and direction",
    detail:
      "See the look before a frame moves. We lock the visual direction in style frames, then animate with confidence.",
  },
];

const approach = [
  {
    title: "Script and idea first.",
    detail:
      "We get clear on the single thing the piece has to land before any design starts.",
  },
  {
    title: "Designed, not templated.",
    detail:
      "Every frame is built for your brand, by people, not pulled from a stock library.",
  },
  {
    title: "Built to be reused.",
    detail:
      "One piece, many cuts: silent social loops, voiced versions, and stills for decks.",
  },
];

export default async function AnimationPage() {
  const projects = await safeFetch<FeaturedCaseStudy[]>(
    animationCaseStudiesQuery,
    [],
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Animation
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Animation that makes the complicated</span>{" "}
            <span className="text-dusk italic">feel simple.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            We make explainer videos and brand animation for businesses with
            something genuinely hard to get across: a regulation, a technology,
            a process, a product. We start with the one idea the piece has to
            land, then design and animate around it. The result earns attention
            without shouting, and says the same thing as the rest of your brand.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={motionHref} external>
              Book a call
            </Button>
            <Button variant="secondary" href="/portfolio">
              See the work
            </Button>
          </div>
        </div>
      </section>

      {/* What we make */}
      <section
        aria-labelledby="what-we-make-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What we make
          </p>
          <h2
            id="what-we-make-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            From a single explainer to a whole motion system.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeMake.map((item) => (
              <li
                key={item.title}
                className="rounded-card bg-dawn border border-dawn-60 p-7"
              >
                <h3 className="font-display text-[1.375rem] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-white/65">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we approach it */}
      <section
        aria-labelledby="approach-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            How we approach it
          </p>
          <h2
            id="approach-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            Animation works when the thinking comes first.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
            Most of our animation grows out of brand and strategy work. That is
            why it lands: the film is built on the same thinking as everything
            else you put out, so it reinforces the brand rather than sitting
            beside it.
          </p>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {approach.map((item, i) => (
              <li
                key={item.title}
                className="border-t border-dawn-60 pt-5"
              >
                <span
                  aria-hidden="true"
                  className="text-dragon-fire font-bold text-[0.875rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.25rem] mt-2 text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-white/60">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected animation work */}
      {projects.length > 0 ? (
        <section
          aria-labelledby="animation-work-heading"
          className="bg-dawn-80 py-[120px] border-t border-dawn-60"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="animation-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-white"
            >
              Complex stories, told in motion.
            </h2>
            <WorkGrid items={projects} />
            <div className="mt-12 text-center">
              <Button href="/portfolio" variant="primary">
                View all work
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTA
        heading="Got something complicated to explain?"
        subtext="Book a call and tell us what you're trying to get across. We'll tell you honestly whether animation is the right tool, and how we'd approach it."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />
    </>
  );
}

/**
 * Adaptive layout mirroring the homepage Featured Work grid so the section
 * still reads as finished with 1, 2 or 3 case studies.
 */
function WorkGrid({ items }: { items: FeaturedCaseStudy[] }) {
  if (items.length === 1) {
    return (
      <div className="mt-14">
        <div className="aspect-[4/5] lg:aspect-[16/9]">
          <PortfolioCard project={items[0]} variant="large" />
        </div>
      </div>
    );
  }
  if (items.length === 2) {
    return (
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((p) => (
          <div key={p._id} className="aspect-[4/5] lg:aspect-[4/3]">
            <PortfolioCard project={p} variant="large" />
          </div>
        ))}
      </div>
    );
  }
  const [large, smallA, smallB] = items;
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:auto-rows-fr">
      <div className="lg:row-span-2">
        <PortfolioCard project={large} variant="large" />
      </div>
      <PortfolioCard project={smallA} variant="small" />
      <PortfolioCard project={smallB} variant="small" />
    </div>
  );
}
