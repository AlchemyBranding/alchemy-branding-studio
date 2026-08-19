import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import WorkGrid from "@/components/home/WorkGrid";
import { getPageMetadata } from "@/lib/seo";
import { motionHref, siteConfig } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  caseStudiesBySlugsQuery,
  type FeaturedCaseStudy,
} from "@/sanity/lib/queries";

/**
 * Commercial page for the "brand strategy workshop" query cluster (2,190
 * impressions, head term at position 32.7 as of 12 Aug 2026). Three articles
 * already compete on the informational half of that cluster, so this page
 * deliberately takes transactional intent only: what the session is, what you
 * leave with, who it suits, and how to book. It does not explain the exercises.
 * That is /5-brand-strategy-exercises-you-can-do-for-free's job, and
 * duplicating it here would make the existing cannibalisation worse.
 */
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "brand-strategy-workshop",
    path: "/brand-strategy-workshop",
    defaults: {
      title: "Brand Strategy Workshop for SME Leadership Teams",
      description:
        "A brand strategy workshop for SME leadership teams. Half a day, or a full day for a bigger team. You leave with a positioning sentence and an agreed answer on who you are not for.",
    },
  });
}

/**
 * Pinned rather than queried by tag: there is no "Workshop" serviceTag, and
 * these are the three published case studies whose write-up actually opens on
 * the workshop. Verified against Sanity 17 Aug 2026.
 */
const WORKSHOP_CASE_STUDY_SLUGS = [
  "vale-investments-brand-strategy-website",
  "healthy-hr-brand-workshop-branding-and-website",
  "be-business-fit-workshop-branding-and-website",
];

/**
 * One source for the price. The visible copy and the Offer markup below both
 * read from it, so the two cannot drift apart. A marked-up price that disagrees
 * with the page is the easiest way to earn a manual action, and the usual cause
 * is somebody changing one of the two.
 */
const WORKSHOP_PRICE_GBP = 2500;
const WORKSHOP_PRICE_DISPLAY = `£${WORKSHOP_PRICE_GBP.toLocaleString("en-GB")}`;

/**
 * Service and Offer, following the JSON-LD pattern already used for Article,
 * Breadcrumb and FAQ. Deliberately minimal: it states what is sold, who sells
 * it, and the floor price. No rating, no review count, no availability, none of
 * which we have.
 *
 * The floor price is expressed as a PriceSpecification minPrice rather than a
 * flat Offer price. "From £2,500" is a minimum, and a flat price would state it
 * as an exact one.
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Strategy Workshop",
  serviceType: "Brand strategy workshop",
  url: `${siteConfig.url}/brand-strategy-workshop`,
  description:
    "A brand strategy workshop for SME leadership teams. Typically half a day, scaling to a full day or more depending on the size of the team and the complexity of the business. Ends in a written positioning sentence and an agreed answer on who the business is not for.",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: "GB",
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: WORKSHOP_PRICE_GBP,
      priceCurrency: "GBP",
      valueAddedTaxIncluded: false,
    },
  },
};

const inTheRoom = [
  {
    title: "Leadership only.",
    detail:
      "Not the whole company. The people who can make a decision and make it hold. A bigger team is workable, it just makes for a longer session.",
  },
  {
    title: "Your place or ours.",
    detail:
      "The studio in Abergavenny, or your office if getting the team off site is the harder ask.",
  },
  {
    title: "It is a working session.",
    detail:
      "We are not presenting to you. Your team does most of the talking and we write down what you actually mean, which is rarely what the current website says.",
  },
  {
    title: "Nothing gets designed on the day.",
    detail:
      "No logos, no colours, no layouts. The moment design enters the room the argument stops, and everyone starts having opinions about type.",
  },
];

const outputs = [
  {
    title: "A positioning sentence, written down",
    detail:
      "Short enough that your team can repeat it under pressure without checking a document first.",
  },
  {
    title: "An agreed answer on who you are not for",
    detail:
      "In writing, with the leadership team behind it, so turning work down stops being a judgement call somebody makes alone.",
  },
  {
    title: "The words you own, and the ones you have ruled out",
    detail:
      "Which is what a copywriter, a designer or a new hire actually needs to get your language right first time.",
  },
  {
    title: "A sequence for what to build next",
    detail:
      "So the identity or the website starts from a decision rather than a blank page.",
  },
];

export default async function BrandStrategyWorkshopPage() {
  const projects = await safeFetch<FeaturedCaseStudy[]>(
    caseStudiesBySlugsQuery,
    [],
    { params: { slugs: WORKSHOP_CASE_STUDY_SLUGS } },
  );

  // GROQ returns document order, not the order of the slug list. Sort back so
  // the strongest example leads the grid rather than whichever Sanity hands
  // back first.
  const ordered = WORKSHOP_CASE_STUDY_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is FeaturedCaseStudy => Boolean(p));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Brand strategy workshop
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">
              A brand strategy workshop that ends in a decision,
            </span>{" "}
            <span className="text-dusk italic">not a deck.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            We run a brand strategy workshop with your leadership team.
            Typically half a day, scaling to a full day or more as the team gets
            bigger and the business gets more complicated. In our studio in
            Abergavenny or at your place. The
            session exists to settle one argument: what your business is for,
            and who it is not for. You leave with a positioning sentence in
            writing. Everything after it, identity, website, content, sales
            collateral, gets briefed against that sentence rather than against
            opinion.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={motionHref} external>
              Book a discovery call
            </Button>
            <Button variant="secondary" href="/contact">
              Send a brief
            </Button>
          </div>
        </div>
      </section>

      {/* What happens in the room */}
      <section
        aria-labelledby="in-the-room-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What happens in the room
          </p>
          <h2
            id="in-the-room-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            The whole thing hangs on who is in the room.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {inTheRoom.map((item) => (
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

      {/* The two questions */}
      <section
        aria-labelledby="two-questions-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                The two questions it turns on
              </p>
              <h2
                id="two-questions-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                One is easy. <span className="italic">One is the work.</span>
              </h2>
              <p className="mt-6 text-[1.125rem] leading-[1.7] text-dawn/70 max-w-lg">
                Both lists end up on the wall. The team argues about the second
                one, and that argument is the reason the session is worth
                clearing the diary for.
              </p>
            </div>

            <ol className="space-y-6">
              <li className="rounded-card bg-white/60 border border-dawn/10 p-7">
                <p className="text-dragon-fire font-bold text-[0.9rem] tracking-wider">
                  Question 01
                </p>
                <h3 className="mt-2 font-bold text-[1.25rem] text-dawn">
                  What words would you like associated with your brand?
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/70">
                  Teams answer this quickly and tend to agree. It is a warm-up,
                  and it is the half most branding processes stop at.
                </p>
              </li>
              <li className="rounded-card bg-white/60 border border-dawn/10 p-7">
                <p className="text-dragon-fire font-bold text-[0.9rem] tracking-wider">
                  Question 02
                </p>
                <h3 className="mt-2 font-bold text-[1.25rem] text-dawn">
                  What words would you not?
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/70">
                  Harder, slower, and the one people skip. It is also where the
                  positioning comes from. A business that will not rule anything
                  out has not decided anything, and its marketing reads that
                  way.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* What you leave with */}
      <section
        aria-labelledby="outputs-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What you leave with
          </p>
          <h2
            id="outputs-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            Four things, and none of them is a slide deck.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {outputs.map((item, i) => (
              <li key={item.title} className="border-t border-dawn-60 pt-5">
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

      {/* Who it suits */}
      <section
        aria-labelledby="who-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Who it suits
          </p>
          <h2
            id="who-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            Businesses that have outgrown how they describe themselves.
          </h2>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-white/70">
              <p>
                SMEs turning over roughly £500k to £15M. Usually something has
                changed. A service was added, the business moved upmarket, or it
                came through a buyout, and the language never caught up.
              </p>
              <p>
                The clearest signal is simple. If two people on your leadership
                team describe the business differently, your buyers are getting
                both versions.
              </p>
            </div>
            <div className="rounded-card bg-dawn border border-dawn-60 p-7">
              <h3 className="font-display text-[1.375rem] text-white">
                When it is the wrong call
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-white/65">
                It suits you less if you are pre-revenue, or if one person
                already makes every decision without needing the room to agree.
                A call is cheaper and will probably do. We would rather tell you
                that on the call than halfway through the session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      {ordered.length > 0 ? (
        <section
          aria-labelledby="workshop-work-heading"
          className="bg-dawn py-[120px]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="workshop-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-white"
            >
              Three brands that started in the same room.
            </h2>
            <WorkGrid items={ordered} />
            <div className="mt-12 text-center">
              <Button href="/portfolio" variant="primary">
                View all work
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {/*
        Price sits after fit and after proof, and well clear of the hero.
        Someone arriving on "brand strategy workshop" needs to know what it is
        and whether it is for them before a number helps them decide.
      */}
      <section
        aria-labelledby="price-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                What it costs
              </p>
              <h2
                id="price-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                From {WORKSHOP_PRICE_DISPLAY} plus VAT.
              </h2>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
              <p>
                That covers the session itself and everything you leave with:
                the positioning sentence, the words you have ruled out, and the
                sequence for what to build next.
              </p>
              <p>
                Where it lands above that depends on the size of your team,
                whether the session runs to a full day, and how much work the
                strategy needs afterwards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hands informational intent to the three articles that own it */}
      <section
        aria-labelledby="before-you-book-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Before you book
          </p>
          <h2
            id="before-you-book-heading"
            className="font-display text-h2 mt-3 text-white"
          >
            You can run a version of this yourself.
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-[1.75] text-white/70">
            The{" "}
            <Link
              href="/5-brand-strategy-exercises-you-can-do-for-free"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              five brand workshop exercises that do most of the work
            </Link>{" "}
            are free to use, and if you want to know{" "}
            <Link
              href="/the-power-and-necessity-of-brand-discovery-workshops"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              what a brand discovery workshop produces
            </Link>{" "}
            before paying for one, that is written up in full. Where a business
            sells through a team, there is a strong case for{" "}
            <Link
              href="/why-your-sales-team-should-be-in-the-brand-strategy-workshop"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              putting your sales team in the workshop
            </Link>{" "}
            rather than briefing them after the fact.
          </p>
        </div>
      </section>

      <NewsletterSignup location="brand-strategy-workshop" />

      <FinalCTA
        heading="Book a discovery call."
        subtext="Twenty minutes. Tell us what is not landing and we will tell you whether the workshop is the right starting point, or whether something cheaper would do."
        primary={{ label: "Book a discovery call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
