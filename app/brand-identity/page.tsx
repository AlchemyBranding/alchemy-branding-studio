import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import Reveal from "@/components/motion/Reveal";
import StaggeredList from "@/components/motion/StaggeredList";
import WorkGrid from "@/components/home/WorkGrid";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  caseStudiesBySlugsQuery,
  type FeaturedCaseStudy,
} from "@/sanity/lib/queries";

/**
 * Like /website-design and unlike /brand-strategy-workshop, this page has no
 * search evidence behind it. The 12 Aug 2026 keyword pull covered all 1,000
 * Search Console queries and concluded "nothing else with volume lacks a page".
 * No identity or logo cluster appeared, so this is a conversion page and no
 * keyword targets have been invented to dress it up.
 *
 * The cannibalisation risk is the largest of the three service pages: six
 * published articles already own the informational half of brand identity,
 * including a full how-to guide. So this page carries no how-to at all. It
 * covers what is made, how it is approached, what changes in the business and
 * how to book, then hands the explaining back to the articles that own it.
 */
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "brand-identity",
    path: "/brand-identity",
    defaults: {
      title: "Brand Identity Design for SMEs",
      // 174 characters truncated in SERPs. Trimmed to 152, same claim.
      description:
        "Brand identity design for SMEs: the mark, the system, and rules your team will actually follow. Strategy first, then the design that executes it.",
    },
  });
}

/**
 * Pinned rather than queried by tag. There is no Identity serviceTag, and the
 * nearest one, Branding, sits on 23 case studies and returns the same three
 * featured entries as /website-design, which would have put identical work on
 * two service pages. These three are identity-led rather than website-led, and
 * none appears on the other two service pages. `[verified 18 Aug]` in Sanity.
 *
 * Body Talk leads because it is the one of the three carrying a portrait
 * cardImage, so the tall slot gets a source built for it rather than a
 * landscape hero letterboxed into it.
 */
const IDENTITY_CASE_STUDY_SLUGS = [
  "kinesiology-branding-design",
  "being-bean-breads-brand-guardians",
  "bbq-street-food-branding",
];

const whatWeMake = [
  {
    title: "The mark and the system around it",
    detail:
      "Logo, type, colour and the brand language that ties them together. Designed as a set, so the parts still agree when they are used apart.",
  },
  {
    title: "Rules somebody will actually follow",
    detail:
      "Guidelines written for whoever is making the next thing, not filed and admired. Short enough to read, specific enough to settle an argument.",
  },
  {
    title: "Applied to what you actually send",
    detail:
      "Decks, proposals, signage, packaging, livery, social. An identity only exists where people meet it, which is rarely the logo on its own.",
  },
  {
    title: "Naming, where the name is the problem",
    detail:
      "Sometimes the work starts a step earlier. We have named businesses and product lines where the existing name was doing the damage.",
  },
];

const applications = [
  {
    src: "/identity/christie-for-sale-board.webp",
    alt: "A Christie Residential For Sale board standing in a front garden, the hexagon house mark in orange, teal and olive above the line 'Your home, handled with care'.",
  },
  {
    src: "/identity/sme-social.webp",
    alt: "A Sales Made Easy Instagram post on a phone, red on cobalt blue, reading 'we keep it simple' above 'Jargon free training that speaks to everyone.'",
  },
  {
    src: "/identity/christie-tote.webp",
    alt: "A teal Christie Residential tote bag hanging on a wooden chair, the house mark and wordmark printed in white.",
  },
  {
    src: "/identity/sme-print.webp",
    alt: "Sales Made Easy printed folders and a brochure fanned on a pale surface, cobalt on navy, the cover asking 'what is sales?'.",
  },
];

const approach = [
  {
    title: "Strategy first, always.",
    detail:
      "We do not open a design file until the positioning is settled. Design executes an argument. Without one it is decoration, and it gets rejected on taste.",
    src: "/identity/christie-logo-construction.webp",
    alt: "The Christie Residential mark drawn out on its construction grid, next to the finished hexagon house in orange, teal and olive on a dark ground.",
  },
  {
    title: "Designed for the hardest application.",
    detail:
      "Anything looks good large and centred on a white page. We test the mark small, in one colour, on a vehicle and on a phone, because that is where identities come apart.",
    src: "/identity/christie-banner.webp",
    alt: "A yellow Christie Residential banner lashed to scaffolding on a brick building, the brand line and mark still reading clearly at distance and half in shadow.",
  },
  {
    title: "Built to be handed over.",
    detail:
      "You get the files, the rules and the reasoning. The measure of the job is whether your team still gets it right in a year, with us not involved.",
    src: "/identity/christie-guidelines.webp",
    alt: "Spreads from the Christie Residential brand guidelines laid out in a grid, covering primary logos, brand typography and the colour palette.",
  },
];

export default async function BrandIdentityPage() {
  const projects = await safeFetch<FeaturedCaseStudy[]>(
    caseStudiesBySlugsQuery,
    [],
    { params: { slugs: IDENTITY_CASE_STUDY_SLUGS } },
  );

  // GROQ returns document order, not the order of the slug list. Sort back so
  // the case study with a portrait cardImage leads the grid.
  const ordered = IDENTITY_CASE_STUDY_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is FeaturedCaseStudy => Boolean(p));

  return (
    <>
      {/*
        Hero. The paragraph below says what decides whether an identity
        survives is the system underneath it, so the evidence is a system: part
        of the Sales Made Easy icon set, every icon on the same grid and the
        same line weight.

        Flat colour rather than a photograph. The Christie shopfront was here
        first and did not hold the column: a dark, busy interior shot goes to
        mush at this width, where a graphic holds at any size.

        Composed as a full-height column flush to the right edge rather than the
        floating object /website-design uses, so the two service pages do not
        converge on one hero shape. Below lg it drops into the flow as a
        landscape crop, where there is no room beside the text.
      */}
      <section className="relative overflow-hidden bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(75%_50%_at_78%_24%,rgba(255,110,73,0.14),transparent_70%)] lg:bg-[radial-gradient(46%_78%_at_76%_50%,rgba(255,110,73,0.17),transparent_70%)]"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative z-10 lg:max-w-[56%]">
            <p className="text-eyebrow text-dragon-fire">Brand identity</p>
            {/* Not text-display: at a 56% column the 7rem ceiling wrapped to
                five lines and pushed the buttons under the fold. */}
            <h1 className="font-display mt-4 text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.06] tracking-[-0.01em]">
              <span className="text-white">
                A brand identity that holds together
              </span>{" "}
              <span className="text-dusk italic">
                once other people start using it.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.75] text-white/70">
              We design brand identities for businesses that have outgrown the
              one they have. The logo is the part everyone talks about and the
              smallest part of the job. What decides whether an identity
              survives is the system underneath it: the type, the colour, the
              rules, and whether a new starter can pick it up and get it right
              without asking. We settle the positioning first, then design
              against it.
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

          <Reveal className="relative z-[1] mt-14 md:mt-16 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%]">
            <Image
              src="/identity/sme-icon-system.webp"
              alt="Part of the Sales Made Easy icon set, twelve pink line icons on cobalt blue, each drawn to the same weight and grid."
              width={1000}
              height={1500}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-[300px] w-full rounded-card object-cover object-center sm:h-[420px] lg:h-full lg:rounded-none lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_42%)]"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/*
        What we make. Was four filled cards in a 2x2 grid, which is the generic
        SaaS shape this brand is explicitly defined against, and the boxes were
        doing no work that a rule and some space could not.

        Now the house two-column argument block: sticky label left, ruled rows
        right, numerals in Mackinac so the list reads as a sequence rather than
        four equal tiles. The applications strip below is the evidence for the
        third row, and the reason it is one client across many surfaces rather
        than three clients once each: the claim is that an identity is a system.
      */}
      <section
        aria-labelledby="what-we-make-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-eyebrow text-dragon-fire">What we make</p>
              <h2
                id="what-we-make-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                A mark, and everything that{" "}
                <span className="italic">keeps it honest.</span>
              </h2>
            </div>

            <StaggeredList as="ul" className="lg:mt-2">
              {whatWeMake.map((item, i) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-dawn/15 py-7 first:border-t-0 first:pt-0 md:grid-cols-[3.5rem_1fr] md:gap-x-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.5rem] leading-none text-dragon-fire md:text-[2rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.375rem] leading-[1.25] text-dawn md:text-[1.625rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-dawn/70">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </StaggeredList>
          </div>

          <Reveal className="mt-16 md:mt-20">
            <figure>
              <StaggeredList className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                {applications.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={800}
                    height={1000}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="aspect-[4/3] h-full w-full rounded-card object-cover object-center sm:aspect-[4/5]"
                  />
                ))}
              </StaggeredList>
              <figcaption className="mt-4 text-[0.9375rem] leading-[1.6] text-dawn/55">
                Two identities, four surfaces:{" "}
                <Link
                  href="/project/handled-with-care-repositioning-christie-residential"
                  className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
                >
                  Christie Residential
                </Link>{" "}
                on a garden board and a tote,{" "}
                <Link
                  href="/project/sales-made-easy-branding-design-and-support"
                  className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
                >
                  Sales Made Easy
                </Link>{" "}
                on social and in print.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* How we approach it */}
      <section aria-labelledby="approach-heading" className="bg-dawn py-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            How we approach it
          </p>
          <h2
            id="approach-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            The design is the last decision, not the first.
          </h2>
          {/* Each claim carries the evidence for itself: the mark on its
              construction grid, the mark surviving a scaffold banner, and the
              guidelines that let the client keep it right without us. */}
          <StaggeredList as="ul" className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {approach.map((item, i) => (
              <li key={item.title}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={675}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] w-full rounded-card border border-dawn-60 object-cover"
                />
                <div className="mt-5 border-t border-dawn-60 pt-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.125rem] leading-none text-dragon-fire"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.3125rem] mt-2 text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-white/65">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* What changes in the business */}
      <section
        aria-labelledby="outcome-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                What changes
              </p>
              <h2
                id="outcome-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                You stop paying for it <span className="italic">twice.</span>
              </h2>
              <Image
                src="/identity/christie-brand-line.webp"
                alt="The Christie Residential brand line, 'Your home, handled with care', set in the brand serif on a soft sage ground with the house mark at the edge."
                width={900}
                height={675}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="mt-8 aspect-[4/3] w-full rounded-card object-cover"
              />
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
              <p>
                Your team stops asking which version of the logo to use, and
                stops inventing a new layout for every deck.
              </p>
              <p>
                Proposals go out looking like they came from the same company as
                the website. New hires get the language right in their first
                month rather than their sixth.
              </p>
              <p>
                And you stop paying twice: once for the design, and again for
                the tidy-up after three people have each made their own version
                of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      {ordered.length > 0 ? (
        <section
          aria-labelledby="identity-work-heading"
          className="bg-dawn py-[120px]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="identity-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-white"
            >
              Identities built to be used, not admired.
            </h2>
            <Reveal>
              <WorkGrid items={ordered} />
            </Reveal>
            <div className="mt-12 text-center">
              <Button href="/portfolio" variant="primary">
                View all work
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Hands informational intent to the articles that own it */}
      <section
        aria-labelledby="before-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Before you commission
          </p>
          <h2
            id="before-heading"
            className="font-display text-h2 mt-3 text-white"
          >
            Some of this you can judge yourself.
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-[1.75] text-white/70">
            The{" "}
            <Link
              href="/master-brand-identity-vs-image-actionable-tips"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              difference between brand identity and brand image
            </Link>{" "}
            is worth understanding first, because it decides what a rebrand can
            and cannot fix.{" "}
            <Link
              href="/5-reasons-brand-identity-guidelines-are-so-important-for-brands"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              Why guidelines matter more as the team grows
            </Link>{" "}
            is written up in full, and so is{" "}
            <Link
              href="/the-cost-of-inconsistent-branding"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              what inconsistency costs a business
            </Link>
            . For the process end to end, there is{" "}
            <Link
              href="/a-complete-guide-to-designing-an-effective-brand-identity-to-help-companies-stand-out-drive-loyalty-and-shape-market-perception"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              a guide to designing a brand identity that holds up
            </Link>
            .
          </p>
        </div>
      </section>

      <NewsletterSignup location="brand-identity" />

      <FinalCTA
        heading="Book a call."
        subtext="Tell us what is not working. We will tell you honestly whether it is an identity problem or a positioning one, and which to fix first."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
