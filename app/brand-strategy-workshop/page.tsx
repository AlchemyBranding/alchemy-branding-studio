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
        "The Brand & Growth Workshop: one day with your leadership team, then a full brand strategy within two weeks, and a clear plan for what comes next.",
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
 *
 * Go-live copy, approved 8 Oct 2026: a range, shown only after the value
 * ("What you get" and "What happens after") and in the FAQ. Never in the hero
 * or the meta description.
 */
const WORKSHOP_PRICE_MIN_GBP = 2000;
const WORKSHOP_PRICE_MAX_GBP = 5000;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
const WORKSHOP_PRICE_DISPLAY = `${gbp(WORKSHOP_PRICE_MIN_GBP)} to ${gbp(WORKSHOP_PRICE_MAX_GBP)}`;

/**
 * Where "Read all our Google reviews" points. Replace with the Business
 * Profile's own share link (Google Business Profile, Share, copy link) if the
 * search URL below does not land on the profile.
 */
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Alchemy+Branding+Studio+Abergavenny";

/**
 * Service and Offer, following the JSON-LD pattern already used for Article,
 * Breadcrumb and FAQ. Deliberately minimal: it states what is sold, who sells
 * it, and the price range. No rating, no review count, no availability, none
 * of which we mark up.
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand & Growth Workshop",
  serviceType: "Brand strategy workshop",
  url: `${siteConfig.url}/brand-strategy-workshop`,
  description:
    "The Brand & Growth Workshop: one day with your leadership team, then a full brand strategy within two weeks, and a clear plan for what comes next.",
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
      minPrice: WORKSHOP_PRICE_MIN_GBP,
      maxPrice: WORKSHOP_PRICE_MAX_GBP,
      priceCurrency: "GBP",
      valueAddedTaxIncluded: false,
    },
  },
};

const inTheRoom = [
  {
    title: "The right people in the room.",
    detail:
      "Usually your leadership team, and sometimes your marketing or sales team too, depending on how the business is set up.",
  },
  {
    title: "Your place or ours.",
    detail:
      "The studio in Abergavenny, or your office if getting the team off site is the harder ask.",
  },
  {
    title: "It's a working session.",
    detail:
      "We're not presenting to you. Your team does most of the talking, and we write down what you actually mean, which is rarely what the current website says.",
  },
  {
    title: "Nothing gets designed on the day.",
    detail:
      "No logos, no colours, no layouts. The moment design enters the room, the argument stops and everyone starts having opinions about type.",
  },
  {
    title: "We do the homework first.",
    detail:
      "We research the business beforehand and use the Clarity Call to shape the questions, so the day is built around you.",
  },
];

const howTheDayWorks = [
  "Every workshop is built around your business. Before the day, Jess researches the business and uses the Clarity Call to plan the questions.",
  "On the day, it's open, honest questions, difficult conversations and the odd debate: where the business wants to be in five to ten years and how it gets there, how it wins customers, what it does well, who it's really for, and what it would turn down. The aim is to get everything out of your team's heads and onto the table.",
  "Then Jess analyses it all and turns it into your brand strategy. That's what the next two weeks are for.",
];

const strategyContents = [
  {
    title: "Where the business is going.",
    detail:
      "Your growth goals for the next five to ten years, how you plan to get there and how you win customers, so sales and marketing are set up to support it.",
  },
  {
    title: "Positioning.",
    detail: "Short enough that your team can repeat it under pressure.",
  },
  {
    title: "Who you're for, and who you're not.",
    detail:
      "In writing, so turning work down stops being a judgement call somebody makes alone.",
  },
  {
    title: "Messaging and tone of voice.",
    detail:
      "What a copywriter, designer or new hire needs to get your language right first time.",
  },
  {
    title: "Values and messaging pillars.",
    detail: "What every piece of marketing should come back to.",
  },
  {
    title: "A plan for putting it to work.",
    detail:
      "Where it helps, we show how it carries into your website and social media, with structure and sample copy.",
  },
];

const afterOptions = [
  {
    title: "You take it from here.",
    detail:
      "The strategy is yours to run with. We book a follow-up at 90 days when you sign off, to see how it's going.",
  },
  {
    title: "We guide your team.",
    detail: "Jess works alongside the people you already have.",
  },
  {
    title: "We deliver it.",
    detail:
      "Alchemy builds and runs it: identity, website, content, social, animation.",
  },
];

/**
 * Google reviews approved for this page (08-proof.md section 4). Words exactly
 * as approved in 01-workshop-page.md, names as on Google, company only where
 * the reviewer named it. Lee Horton's quote joins two passages of his review.
 */
const reviews = [
  {
    quote:
      "From the very first branding workshop, I felt truly seen and heard. They helped me articulate thoughts and feelings I'd been struggling to put into words, which was such an amazing breakthrough.",
    name: "Yasmin Neves",
  },
  {
    quote:
      "We weren't looking for 'just a logo' or a marketing exercise. Jess took the time to truly understand our business, our culture, our values and our long-term vision before putting pen to paper. They deliver insight, strategy, creativity and a genuine partnership.",
    name: "Lee Horton, Athena Security Solutions",
  },
  {
    quote:
      "From the first step to the last, they asked brilliant questions and listened intently to the answers. What they built for me works better than I could have imagined.",
    name: "Gareth Thomas",
  },
];

/**
 * Go-live FAQ, approved 8 Oct 2026. The cost answer reads
 * WORKSHOP_PRICE_DISPLAY so it cannot drift from the price section or the
 * Offer markup. FAQPage JSON-LD follows components/home/HomepageFaq.tsx.
 */
const faqs: { q: string; a: string }[] = [
  {
    q: "What is a brand strategy workshop?",
    a: "A working session where your team decides where the business is going, who it's for and who it isn't for, and we write it down. It's planned around your business, then runs on open, honest questions. Nothing is designed on the day. Within two weeks you get a full brand strategy, and everything built afterwards is briefed against it.",
  },
  {
    q: "How much does it cost?",
    a: `${WORKSHOP_PRICE_DISPLAY} plus VAT, including the strategy document. Where you land depends on the size and complexity of the business. We confirm the figure on the Clarity Call.`,
  },
  {
    q: "How long does it take?",
    a: "One day on site. The strategy follows within two weeks.",
  },
  {
    q: "What happens after the workshop?",
    a: "The strategy ends with our recommendation: you take it from here (with a follow-up at 90 days), we guide your team, or we deliver it. You decide once you've seen it.",
  },
  {
    q: "Who should be in the room?",
    a: "Usually your leadership team, and sometimes your marketing or sales team too. We'll suggest who to bring on the Clarity Call.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/*
        Hero. Deliberately NOT the shape /brand-identity or /website-design
        use. Both of those put the copy in a 56% column with media bleeding off
        the right, and the note on /brand-identity says the service pages must
        not converge on one hero shape. This is the third: the photograph
        full-bleed behind the whole hero, with the copy sitting on it.

        The scrims below do the legibility work, not the image file. The
        photograph is served at full exposure and only the composite under the
        copy is darkened, heaviest at the right where the text is and easing off
        to the left so Dave and the room keep their light. That is the
        only way to put white text on a bright white-walled photograph without
        breaking the rule in core/featured-image-procedure.md against
        underexposing.

        Dave sits at 25 to 32 percent of the frame and the image is
        width-limited at every desktop size, so object-position cannot move
        him. The copy went right instead of the photograph going anywhere.

        The photograph is BATCH 3-106, July 2021. Jess stood to Dave's right
        facing the room and asked to be taken out, so she was erased and the
        wall behind her rebuilt. The first erase pass invented a man's head in
        front of the screen, which is why there was a second pass over that
        area. That repair left the rebuilt wall in two tinted blocks, warm
        above and cool below, with a hard seam between them and a blue fringe
        against the TV. Fixed 2 September 2026 by measuring the wall's real
        colour off the untouched parts of the same frame and replacing the
        repair's low-frequency colour with it, so the whole wall now runs one
        neutral gradient. Photographic grain was kept.

        Treatment follows core/featured-image-procedure.md in the content
        engine: desaturate to knock competing colour back rather than
        underexpose. The teal screen is the thing fighting Dragon Fire. Both
        edges fade into the ground so the photograph emerges from the page
        rather than sitting on it as a pasted rectangle.
      */}
      <section className="relative isolate overflow-hidden bg-dawn pt-[160px] pb-[110px] md:pt-[200px] md:pb-[140px]">
        <Image
          src="/workshop/workshop-hero.webp"
          alt="Dave Morgan pointing as he answers a question in a brand workshop, with the room turned towards him."
          fill
          sizes="100vw"
          className="object-cover object-[44%_28%] saturate-[0.82] md:object-[38%_34%]"
          priority
        />

        {/* Mobile has no room for a left-to-right scrim, because the copy runs
            the full width. It gets an even veil instead. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-dawn/72 md:hidden"
        />
        {/* Desktop: heavy under the copy on the right, easing off to the left
            so Dave, at 25 to 32 percent of the frame, stays in the clear. The
            stops are measured against the composite, not guessed: see the
            contrast table in AGENTS.md. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block bg-[linear-gradient(to_left,rgba(25,25,25,0.96)_0%,rgba(25,25,25,0.93)_35%,rgba(25,25,25,0.90)_55%,rgba(25,25,25,0.86)_60%,rgba(25,25,25,0.22)_68%,rgba(25,25,25,0.08)_86%,rgba(25,25,25,0.08)_100%)]"
        />
        {/* Top edge under the nav, bottom edge into the section below. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(25,25,25,0.88)_0%,rgba(25,25,25,0.12)_22%,rgba(25,25,25,0.05)_62%,rgba(25,25,25,0.85)_92%,rgb(25,25,25)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[70%] bg-[radial-gradient(60%_60%_at_22%_30%,rgba(255,110,73,0.13),transparent_70%)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          {/* Copy sits right, against the grain of /brand-identity and
              /website-design, which both run a copy column on the left. It is
              here because the photograph decides it: Dave is left of centre and
              the image is width-limited at every desktop size, so
              object-position cannot pan him out from under a left-hand column.
              Moving the words is the only way to leave him visible. Full width
              on mobile, where there is no room to take sides. */}
          <div className="md:ml-auto md:w-[62%]">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Brand &amp; Growth Workshop. A brand strategy workshop for
            leadership teams.
          </p>
          {/* Not text-display. That token is clamp(3rem,6vw,7rem), sized for a
              full-width headline, and at 1920 it puts 112px type into a 794px
              column: six lines, a 1383px hero, and the CTA 1192px down, below
              the fold. This clamp is the largest that still sets in four lines
              at 1920, which brings the hero to 1034px and the CTA to 842px. */}
          <h1 className="font-display mt-4 leading-[1.04] text-[clamp(2.75rem,5.2vw,5.25rem)]">
            <span className="text-white">
              Growth stalls without foundations.
            </span>{" "}
            <span className="text-dusk italic">This is where we build them.</span>
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-[1.125rem] leading-[1.7] text-white/65">
            <p>
              The thinking behind your brand usually lives in the heads of the
              people who run the business. How it&apos;s positioned, who
              it&apos;s for, what it turns down. It&apos;s never been written
              down, so everyone selling and marketing the business is working
              from a guess.
            </p>
            <p>
              The Brand &amp; Growth Workshop gets it out of those heads and
              onto paper. One day with your team, then a full brand strategy
              within two weeks, with a clear recommendation for what to do
              next.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={motionHref} external>
              Book a Clarity Call
            </Button>
            <Button variant="secondary" href="/contact">
              Send a brief
            </Button>
          </div>
          </div>
        </div>
      </section>

      {/* What happens in the room */}
      <section
        aria-labelledby="in-the-room-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="in-the-room-heading"
            className="font-display text-h2 max-w-3xl text-white"
          >
            What happens in the room
          </h2>
          <StaggeredList as="ul" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </StaggeredList>
        </div>
      </section>

      {/* How the day works */}
      <section
        aria-labelledby="how-the-day-works-heading"
        className="bg-dusk text-dawn py-[140px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2
                id="how-the-day-works-heading"
                className="font-display text-h2 text-dawn"
              >
                How the day works
              </h2>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
              {howTheDayWorks.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          {/*
            TW_CANDID_616, June 2022. The word-association exercise: real proof
            that the day produces written decisions. Same room, same work, older
            business. No caption: the go-live copy does not include one.
          */}
          <Reveal className="mt-16 lg:mt-20">
            <Image
              src="/workshop/workshop-whiteboard.webp"
              alt="A whiteboard filled with words a leadership team used to describe their business, being added to during a session."
              width={2400}
              height={1600}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="w-full rounded-card object-cover saturate-[0.85]"
            />
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section
        aria-labelledby="outputs-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="outputs-heading"
            className="font-display text-h2 max-w-3xl text-white"
          >
            What you get
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-[1.0625rem] leading-[1.75] text-white/70">
            <p>
              <strong className="font-bold text-white">On the day:</strong> the
              decisions. Who you&apos;re for, who you&apos;re not for, and how
              you want to be seen.
            </p>
            <p>
              <strong className="font-bold text-white">
                Within two weeks: your brand strategy.
              </strong>{" "}
              A full document that sets out how your business talks about
              itself:
            </p>
          </div>
          <StaggeredList as="ol" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyContents.map((item, i) => (
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
          </StaggeredList>
          <p className="mt-12 max-w-3xl text-[1.0625rem] leading-[1.75] text-white/70">
            We send it over for you to digest, then go through it with you on a
            call.
          </p>
        </div>
      </section>

      {/* What happens after */}
      <section
        aria-labelledby="after-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="after-heading"
            className="font-display text-h2 max-w-3xl text-white"
          >
            What happens after
          </h2>
          <p className="mt-10 max-w-3xl text-[1.0625rem] leading-[1.75] text-white/70">
            Most brand projects stop at the guidelines. This one ends with a
            recommendation for what happens next, based on what your business
            actually needs. It might be a rebrand. It might be content. It might
            be guidance as your team grows. You don&apos;t commit to anything
            beyond the workshop until you&apos;ve seen the strategy.
          </p>
          <StaggeredList as="ol" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterOptions.map((item, i) => (
              <li
                key={item.title}
                className="rounded-card bg-dawn border border-dawn-60 p-7"
              >
                <span
                  aria-hidden="true"
                  className="text-dragon-fire font-bold text-[0.875rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.375rem] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-white/65">
                  {item.detail}
                </p>
              </li>
            ))}
          </StaggeredList>
          <div className="mt-12 max-w-3xl space-y-6 text-[1.0625rem] leading-[1.75] text-white/70">
            <p>
              Where we deliver it, you&apos;ll see progress within six weeks of
              signing off the next step: everyone in the business clear on the
              decisions, what happens next, and what you and Alchemy each need
              to do to put them to work.
            </p>
            <p>
              <strong className="font-bold text-white">
                No capped rounds of amends.
              </strong>{" "}
              Plenty of businesses have paid an agency, run out of revisions and
              been left with work they didn&apos;t like. We keep going until
              you&apos;re happy, because we only publish work we&apos;re proud
              of. It rarely takes many rounds, because the strategy is settled
              first and we ask for feedback at the right points.
            </p>
          </div>
        </div>
      </section>

      {/* Who it suits */}
      {/*
        The background here is workshop-audience.webp, a crop of
        1779791616888.jpg. The source frame is a Zokit networking event, not an
        Alchemy workshop, and AGENTS.md rules the 1779* originals out because
        they are dominated by other companies' branding. The crop is the
        exception and it is deliberate: it keeps Jess presenting to a full room
        and puts the Zokit banner, the MDSS wordmark, the National Business
        Show banner with its QR code and the Zokit tote outside the frame. What
        survives is small print on the stand behind her, and the asset itself
        takes that to nothing: it is baked at saturation 0.55, shadows lifted
        (linear 0.62/66) and blurred at sigma 2.6 before export, which drops
        the local contrast on "DOCUMENT SHREDDING" to under 2 levels while the
        people stay readable as shapes. Suppressing it in the file rather than
        under a CSS overlay means it is gone from the asset too, not just from
        the composite. Do not re-export this without that treatment.

        Two rules that come with it. The alt text describes what is in the
        picture and never calls it an Alchemy workshop. The veil is dusk rather
        than dawn because this section runs dark text on light, the opposite of
        the hero.
      */}
      <section
        aria-labelledby="who-heading"
        className="relative isolate overflow-hidden bg-dusk text-dawn py-[140px]"
      >
        <Image
          src="/workshop/workshop-audience.webp"
          alt="Jess Morgan presenting to a room of business owners seated around tables."
          fill
          sizes="100vw"
          className="object-cover object-[52%_42%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(250,248,247,0.86)_0%,rgba(250,248,247,0.82)_45%,rgba(250,248,247,0.72)_75%,rgba(250,248,247,0.62)_100%)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Who it suits
          </p>
          <h2
            id="who-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-dawn"
          >
            Businesses that have outgrown how they describe themselves.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
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

      {/* What clients say. Sits above the price (08-proof.md section 4). */}
      <section
        aria-labelledby="reviews-heading"
        className="bg-dawn-80 py-[120px] border-y border-dawn-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="reviews-heading"
            className="font-display text-h2 max-w-3xl text-white"
          >
            What clients say
          </h2>
          <StaggeredList as="ul" className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <li
                key={r.name}
                className="rounded-card bg-dawn border border-dawn-60 p-7 flex flex-col"
              >
                <figure className="flex flex-col h-full">
                  <blockquote className="text-[1.0625rem] leading-[1.7] text-white/80">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-dawn-60 text-[0.9375rem] font-bold text-white">
                    {r.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </StaggeredList>
          <p className="mt-10">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              Read all our Google reviews
            </a>
          </p>
        </div>
      </section>

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
                {WORKSHOP_PRICE_DISPLAY} plus VAT.
              </h2>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-dawn/80">
              <p>
                That covers the day, the analysis afterwards and the full
                strategy document.
              </p>
              <p>
                Where you land in that range depends on the size and complexity
                of the business, not how many people are in the room. A £15M
                business with one founder in the workshop still has more to work
                through than a £1M business with a team of six. We confirm the
                figure on the Clarity Call before anything is booked.
              </p>
              <p>
                What we won&apos;t do is promise sales figures that depend on
                things outside our control. What we promise is a brand and
                growth engine built to attract the right leads, from the right
                audience, at the right price point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ. Native <details>, same pattern as the homepage FAQ. */}
      <section
        aria-labelledby="workshop-faq-heading"
        className="bg-dawn py-[120px]"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2
            id="workshop-faq-heading"
            className="font-display text-h2 text-white"
          >
            Common questions
          </h2>
          <ul className="mt-12 border-t border-dawn-60">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-dawn-60">
                <details className="group">
                  <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-dragon-fire transition-colors duration-200">
                    <span className="font-display text-[1.25rem] leading-[1.35] text-white group-hover:text-dragon-fire transition-colors duration-200">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1 text-dragon-fire text-[1.5rem] leading-none transition-transform duration-300 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-7 -mt-1 max-w-3xl">
                    <p className="text-[1rem] leading-[1.7] text-white/70">
                      {f.a}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hands informational intent to the four articles that own it */}
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
            before paying for one, that is written up in full. If you would
            rather run the whole thing without us, the guide to how to{" "}
            <Link
              href="/do-your-own-brand-strategy"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              do your own brand strategy
            </Link>{" "}
            covers it end to end. Where a business sells through a team, there
            is a strong case for{" "}
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
        heading="Book a Clarity Call."
        subtext="Thirty minutes to talk through where the business is and what you want to change. We'll help you work out what you need, whether we're the right people to help, and if we're not, who would be."
        primary={{ label: "Book a Clarity Call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
