import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import WorkGrid from "@/components/home/WorkGrid";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  websiteCaseStudiesQuery,
  type FeaturedCaseStudy,
} from "@/sanity/lib/queries";

/**
 * Unlike /brand-strategy-workshop, this page has no search evidence behind it:
 * the 12 Aug 2026 keyword pull covered all 1,000 queries with 20+ impressions
 * and returned nothing web-design related. It is justified by conversion, not
 * traffic. Nine published case studies are website builds and none of them had
 * anywhere to send a reader who wanted to know how we build. Written as a sales
 * page first, so no keyword targets have been invented to dress it up.
 */
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "website-design",
    path: "/website-design",
    defaults: {
      title: "Website Design and Build for SMEs",
      description:
        "We build websites as the execution of a brand strategy, not a separate project. Strategic design, an accessible build, and a site your own team can keep updated.",
    },
  });
}

const included = [
  {
    title: "Strategic design",
    detail:
      "Designed against the positioning rather than against a template. Every page has one job and one next step, and we can tell you what each of them is.",
  },
  {
    title: "A proper build",
    detail:
      "Custom-built and quick to load, put together so that adding a page in a year does not mean rebuilding the site around it.",
  },
  {
    title: "Accessibility as standard",
    detail:
      "Keyboard navigation, sensible colour contrast and a semantic structure, checked before launch rather than patched after somebody complains.",
  },
  {
    title: "A site your team can run",
    detail:
      "You get an editor your team can use without a training day. Sites go stale when updating them is somebody else's job.",
  },
];

export default async function WebsiteDesignPage() {
  const projects = await safeFetch<FeaturedCaseStudy[]>(
    websiteCaseStudiesQuery,
    [],
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Websites
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">A website is the brand strategy,</span>{" "}
            <span className="text-dusk italic">built.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            Most website projects start with a design and work backwards to an
            argument. That order is why they run long, why the copy gets written
            last, and why the finished site reads as an expensive brochure. We
            settle the positioning first, then build the site that makes the
            case. What you get says the same thing as the rest of your brand,
            loads quickly, and your team can update it without booking us in.
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

      {/* The argument */}
      <section
        aria-labelledby="order-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                Why the order matters
              </p>
              <h2
                id="order-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                Build it before the argument is settled{" "}
                <span className="italic">and you get a brochure.</span>
              </h2>
            </div>

            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
              <p>
                A website is not a separate project from your brand. It is where
                the brand does most of its work, usually well before anyone
                speaks to you.
              </p>
              <p>
                If the positioning is not settled, the site cannot be either.
                You get pages that describe six services with equal weight
                because nobody decided which one matters. You get a homepage
                headline written by committee, so it says nothing anyone could
                disagree with, which is the same as saying nothing. Then you
                rebuild in eighteen months.
              </p>
              <p>
                Settle the argument first and the site mostly specifies itself.
                You know what the first screen has to say, which pages need to
                exist, and what to leave out. Leaving things out is most of the
                job.
              </p>
              <p>
                That is why the website work sits downstream of the{" "}
                <Link
                  href="/brand-strategy-workshop"
                  className="text-dragon-fire underline underline-offset-4"
                >
                  brand strategy workshop
                </Link>
                , and why we will say so if you come to us for a site and the
                positioning underneath it is not ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section
        aria-labelledby="included-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What we build
          </p>
          <h2
            id="included-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            Designed, built, and handed over working.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {included.map((item) => (
              <li
                key={item.title}
                className="rounded-card bg-dawn-80 border border-dawn-60 p-7"
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

      {/* Selected work */}
      {projects.length > 0 ? (
        <section
          aria-labelledby="website-work-heading"
          className="bg-dusk text-dawn py-[140px]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="website-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-dawn"
            >
              Sites built on a settled argument.
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

      <NewsletterSignup location="website-design" />

      <FinalCTA
        heading="Book a call."
        subtext="Tell us what the site has to do. We will tell you honestly whether it is a website problem or a positioning one, and what we would fix first."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
