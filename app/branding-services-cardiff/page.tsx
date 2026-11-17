import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { getPageMetadata } from "@/lib/seo";
import { bookingHref, siteConfig } from "@/lib/site";

/*
  Cardiff page, reworked 17 Nov 2026 to lead with brand strategy and the
  Brand & Growth Workshop. Copy approved by Dave on 17 Nov, word for word, in
  alchemy-marketing-plan/work/2026-11-17-cardiff-page-brief.md. Change the
  wording there first, not here.
*/

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "branding-services-cardiff",
    path: "/branding-services-cardiff",
    defaults: {
      // The root layout's title.template appends "| Alchemy". Do not add it here.
      title: "Brand Strategy Workshop & Branding Agency, Cardiff",
      description:
        "Brand strategy for ambitious Cardiff and South Wales businesses. Start with a Brand & Growth Workshop, then build the brand, website and content on it.",
    },
  });
}

type Capability = { title: string; detail: string; href: string };

// The identity, websites and animation copy is the page's previous copy,
// unchanged, as the brief asks.
const capabilities: Capability[] = [
  {
    title: "Identity and design",
    detail:
      "Logos, colour, type and the full system, built to look as good as the work you do.",
    href: "/brand-identity",
  },
  {
    title: "Websites",
    detail:
      "Fast, clear websites that tell your story in five seconds and give visitors one obvious next step.",
    href: "/website-design",
  },
  {
    title: "Animation and video",
    detail:
      "Explainer videos and brand animation that make the complicated feel simple.",
    href: "/animation",
  },
];

const workshopPoints: string[] = [
  "One session, in person, with you and the people who run the business with you.",
  "Within 2 weeks, your brand strategy: positioning, who you're for, messaging, tone of voice, values, and a plan for putting it to work.",
  "A recommended way forward. You don't commit to anything beyond the workshop until you've seen the strategy.",
  "£2,000 to £5,000 plus VAT, priced on the size and complexity of your business.",
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "How much does a brand strategy workshop cost in Cardiff?",
    a: "£2,000 to £5,000 plus VAT, depending on the size and complexity of the business. The price covers the session and the written strategy.",
  },
  {
    q: "What happens after the workshop?",
    a: "Your strategy arrives within 2 weeks. It ends with a recommendation: take it forward yourselves, have Jess guide your team, or have Alchemy deliver it.",
  },
  {
    q: "Do you only work in Cardiff?",
    a: "We're based in Abergavenny and work across Cardiff, South Wales and the South West.",
  },
  // Added 17 Nov (round 2), approved by Dave.
  {
    q: "Who should come to the workshop?",
    a: "Usually your leadership team, and sometimes your marketing or sales team too. We'll suggest who to bring on the Clarity Call.",
  },
  {
    q: "Will you come to us in Cardiff?",
    a: "Yes. We run the workshop at your office or at our studio in Abergavenny, whichever suits your team.",
  },
];

// "What happens in the room". Added 17 Nov (round 2), approved by Dave.
// Points 2 and 3 reuse lines approved for /brand-strategy-workshop.
const roomPoints: { title: string; detail: string }[] = [
  {
    title: "Your office in Cardiff, or our studio.",
    detail:
      "Our studio is in Abergavenny, under an hour up the road. Whichever gets your team out of the day job.",
  },
  {
    title: "Your team does most of the talking.",
    detail:
      "We write down what you actually mean, which is rarely what the current website says.",
  },
  {
    title: "Nothing gets designed on the day.",
    detail:
      "No logos, no colours, no layouts. The session is about decisions, and the design follows from them.",
  },
];

const inlineLink =
  "text-dawn underline decoration-dragon-fire underline-offset-4 hover:text-dragon-fire transition-colors duration-200";

// Google review, published in Sanity (testimonial google-review-ashley-williams).
// Quoted verbatim.
const aquaLogicReview = {
  quote:
    "Jess has been fantastic in providing marketing & comms direction and delivery. From the off, she got to know the business, worked with existing stakeholders and carefully got to work delivering a transformation in our brand. Look forward to what comes next as the journey is only just beginning...",
  name: "Ashley Williams",
  company: "AquaLogic",
  href: "/project/aqualogic-brand-strategy-live-brand-portal",
};

// Keep in step with the workshop price on /brand-strategy-workshop.
const WORKSHOP_PRICE_MIN_GBP = 2000;
const WORKSHOP_PRICE_MAX_GBP = 5000;

// The sitewide ProfessionalService/LocalBusiness block in components/JsonLd.tsx
// stays as it is and is not repeated here. This page adds FAQPage, a Service
// with its price range tied to Cardiff, and a breadcrumb.
// FAQ rich results are limited by Google to government and health sites, so
// FAQPage is here for AI answer tools; the Service and Offer are what search
// engines can use.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand & Growth Workshop",
  serviceType: "Brand strategy workshop",
  url: `${siteConfig.url}/branding-services-cardiff`,
  description:
    "One session, in person, with you and the people who run the business with you. Within 2 weeks, your brand strategy: positioning, who you're for, messaging, tone of voice, values, and a plan for putting it to work.",
  provider: { "@id": `${siteConfig.url}/#business` },
  areaServed: [
    { "@type": "City", name: "Cardiff" },
    { "@type": "Place", name: "South Wales" },
  ],
  offers: {
    "@type": "Offer",
    url: `${siteConfig.url}/brand-strategy-workshop`,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: WORKSHOP_PRICE_MIN_GBP,
      maxPrice: WORKSHOP_PRICE_MAX_GBP,
      priceCurrency: "GBP",
      valueAddedTaxIncluded: false,
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function BrandingCardiffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          {
            name: "Brand strategy in Cardiff",
            url: `${siteConfig.url}/branding-services-cardiff`,
          },
        ]}
      />

      {/*
        Hero. A fourth shape, unlike the three service pages (AGENTS.md):
        the photograph fills the whole viewport, the copy sits in a left-hand
        column, and the city skyline runs along the bottom right where the
        scrim eases off.

        Photograph: "Skyline of Cardiff capital city of Wales, summer 2020" by
        Mike Erskine on Unsplash (unsplash.com/photos/wI3IB2IhSYc), Unsplash
        License: free for commercial use, no attribution required. The left 9%
        of the original is cropped out of the file because it holds the edge
        of the stadium roof (brief: no stadium). Served at full exposure; the
        scrims below do the legibility work, not the file.

        It is the LCP image, so it is preloaded.
      */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-dusk pt-[140px] pb-[96px] md:pt-[160px] md:pb-[120px]">
        <Image
          src="/cardiff/cardiff-skyline-hero.webp"
          alt="The Cardiff city centre skyline on a summer evening, office towers and cranes above the rooftops."
          fill
          sizes="100vw"
          preload
          className="object-cover object-[72%_70%] saturate-[0.85] md:object-[50%_72%]"
        />

        {/* Mobile: the copy runs the full width, so an even veil. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-dusk/80 md:hidden"
        />
        {/* Desktop: heavy under the copy on the left, easing off to the right
            so the towers on the right of the skyline show through. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block bg-[linear-gradient(to_right,rgba(25,25,25,0.9)_0%,rgba(25,25,25,0.88)_45%,rgba(25,25,25,0.7)_62%,rgba(25,25,25,0.4)_80%,rgba(25,25,25,0.3)_100%)]"
        />
        {/* Top edge under the nav, bottom edge into the section below. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(25,25,25,0.7)_0%,rgba(25,25,25,0)_24%,rgba(25,25,25,0)_78%,rgb(25,25,25)_100%)]"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
          <div className="md:w-[62%]">
            {/* Own clamp, not text-display: the headline sits in a column
                (AGENTS.md, "text-display assumes a full-width headline"). */}
            <h1 className="font-display leading-[1.04] text-[clamp(2.75rem,5.2vw,5.25rem)]">
              <span className="text-dawn">
                Brand strategy for Cardiff businesses
              </span>{" "}
              <span className="text-dawn italic">
                that are better than they look.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-dawn/75">
              The thinking behind your brand lives in your head. Your team,
              your agency and your website are guessing at it. We work it out
              with you in a Brand &amp; Growth Workshop, then build the look,
              the words and the plan around it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" href={bookingHref} external>
                Book a Clarity Call
              </Button>
              <Button variant="secondary" href="/brand-strategy-workshop">
                See the workshop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Start with the Brand & Growth Workshop */}
      <section
        aria-labelledby="cardiff-workshop-heading"
        className="bg-dusk-80 py-[120px] border-y border-dusk-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          {/*
            827A3600 from the May 2026 shoot: Jess leading a workshop at the
            screen (workshop content rule: Jess leads). The slide's small
            print named a client, so it is blurred into the file itself; only
            the "Origins & History" heading still reads. Re-exporting from the
            original puts the client text back.
          */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-card">
            <Image
              src="/cardiff/jess-workshop-origins.webp"
              alt="Jess Morgan leading a Brand & Growth Workshop, presenting a slide titled Origins & History."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[30%_50%] saturate-[0.9]"
            />
          </div>
          <div>
            <h2
              id="cardiff-workshop-heading"
              className="font-display text-h2 text-dawn"
            >
              Start with the{" "}
              <span className="italic text-dawn">Brand &amp; Growth Workshop.</span>
            </h2>
            {/* Added 17 Nov at Dave's request: names the expert who runs
                every workshop, linked to the team on /about. Title matches
                her teamMember record in Sanity. */}
            <p className="mt-5 text-[1rem] leading-[1.7] text-dawn/70">
              Led by{" "}
              <Link href="/about" className={inlineLink}>
                Jess Morgan
              </Link>
              , co-founder and strategy director at Alchemy.
            </p>
            <ol className="mt-10 space-y-6">
              {workshopPoints.map((point, i) => (
                <li key={point} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.25rem] leading-[1.5] text-dragon-fire tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[1.0625rem] leading-[1.7] text-dawn/75">
                    {point}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What happens in the room */}
      <section
        aria-labelledby="cardiff-room-heading"
        className="bg-dusk py-[120px]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="cardiff-room-heading"
            className="font-display text-h2 max-w-3xl text-dawn"
          >
            What happens <span className="italic text-dawn">in the room</span>
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {roomPoints.map((point) => (
              <li key={point.title} className="border-t border-dusk-60 pt-6">
                <h3 className="font-display text-[1.375rem] leading-[1.3] text-dawn">
                  {point.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/70">
                  {point.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Then we build on it */}
      <section
        aria-labelledby="cardiff-build-heading"
        className="bg-dusk-80 py-[120px] border-y border-dusk-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            id="cardiff-build-heading"
            className="font-display text-h2 max-w-3xl text-dawn"
          >
            Then we <span className="italic text-dawn">build on it.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.7] text-dawn/70">
            Everything we design follows from the strategy, so your brand,
            website and content say the same thing.
          </p>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group block h-full rounded-card bg-dusk border border-dusk-60 p-7 hover:border-dragon-fire transition-colors duration-200"
                >
                  <h3 className="font-display text-[1.375rem] text-dawn group-hover:text-dragon-fire transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/65">
                    {item.detail}
                  </p>
                  <span className="mt-4 inline-block text-[0.8rem] font-medium uppercase tracking-[0.08em] text-dragon-fire">
                    Learn more &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client review. Reviews bands sit on Space Green with Dawn words and
          no Dusk text (AGENTS.md, 27 Oct). No Review schema: Google ignores
          reviews a business publishes about itself. */}
      <section aria-label="Client review" className="bg-space-green py-[110px]">
        <figure className="max-w-4xl mx-auto px-6 md:px-10">
          <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.35] text-dawn">
            &ldquo;{aquaLogicReview.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-dawn">
            <span className="font-bold">
              {aquaLogicReview.name}, {aquaLogicReview.company}
            </span>
            <Link
              href={aquaLogicReview.href}
              className="text-dawn underline decoration-dawn/50 underline-offset-4 hover:decoration-dawn transition-colors"
            >
              Read the AquaLogic case study
            </Link>
          </figcaption>
        </figure>
      </section>

      {/* Local proof. Copy unchanged from the previous page. */}
      <section
        aria-labelledby="cardiff-local-heading"
        className="bg-dusk-80 py-[120px] border-y border-dusk-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Local work
            </p>
            <h2
              id="cardiff-local-heading"
              className="font-display text-h2 mt-4 text-dawn"
            >
              Trusted by businesses across{" "}
              <span className="italic text-dawn">South Wales.</span>
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] leading-[1.75] text-dawn/70">
              {/* Copy unchanged. Each named client links to its case study:
                  Welch Fitness (Crickhowell), Bean & Bread (Abergavenny),
                  Belle Vitale Wellness (Llanover, Abergavenny), Gwent Police
                  Recognise and Respond. */}
              We have built brands for a{" "}
              <Link href="/project/revitalising-welch-fitness-a-remarkable-rebranding-journey" className={inlineLink}>
                functional fitness gym in Crickhowell
              </Link>
              ,{" "}
              <Link href="/project/being-bean-breads-brand-guardians" className={inlineLink}>
                coffee shops
              </Link>{" "}
              and{" "}
              <Link href="/project/belle-vitale-wellness-branding-website-and-social-marketing" className={inlineLink}>
                wellness studios
              </Link>{" "}
              in Abergavenny, a{" "}
              <Link href="/project/gwent-police-recognise-respond-campaign" className={inlineLink}>
                public-sector campaign for Gwent Police
              </Link>
              , and ambitious businesses well beyond the M4. Being on your doorstep means we can sit in the room with
              you for the Brand &amp; Growth Workshop where every project starts.
            </p>
            <div className="mt-10">
              <Button variant="primary" href="/portfolio">
                See our work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Questions. Answers are open in the page, not behind a toggle, so
          they read the same to people and to AI tools quoting the page. */}
      <section
        aria-labelledby="cardiff-faq-heading"
        className="bg-dusk py-[120px]"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2
            id="cardiff-faq-heading"
            className="font-display text-h2 text-dawn"
          >
            Questions
          </h2>
          <dl className="mt-12 border-t border-dusk-60">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-dusk-60 py-8">
                <dt className="font-display text-[1.25rem] leading-[1.35] text-dawn">
                  {f.q}
                </dt>
                <dd className="mt-3 max-w-3xl text-[1rem] leading-[1.7] text-dawn/70">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA
        heading="Thinking about your brand?"
        subtext="Book 30 minutes. We'll give you an honest read on where your brand stands and what we'd do first."
        primary={{ label: "Book a Clarity Call", href: bookingHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
