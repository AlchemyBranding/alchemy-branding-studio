import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import RoundtableForm from "@/components/roundtable/RoundtableForm";
import { getPageMetadata } from "@/lib/seo";
import { ROUNDTABLE } from "@/lib/roundtable";
import { siteConfig } from "@/lib/site";

/**
 * The Brand to Scale Roundtable: a free, invitation-led breakfast for 12 to 15 founders and MDs,
 * led by Jess. Its job is to fill the table with the right people; the form sends requests to Opus
 * (app/api/roundtable). Copy approved 28 Oct 2026 (CLAUDE_CODE/alchemist-workshop/02). Date and
 * venue are provisional and live in lib/roundtable.ts. Never promise results on this page.
 *
 * Hero shape: copy left over plain Dusk, with a contained, rounded portrait card on the right and the
 * date "ticket" overlapping its lower edge. None of the three service pages does this (AGENTS.md).
 * The photograph is roundtable-jess.webp: Jess leading a session, cut from workshop-hero-jess.webp
 * with the slide behind her blurred so no client text reads. Jess leads; never Dave.
 */
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "roundtable",
    path: "/roundtable",
    defaults: {
      title: "Brand to Scale Roundtable: a breakfast for founders in Cardiff",
      description:
        "A free morning round one table with Jess Morgan and a dozen founders and MDs, looking honestly at what holds a brand back as the business grows. Cardiff, 3 December.",
    },
  });
}

const forYouIf = [
  "the business has grown, but the way it presents itself hasn't kept up;",
  "you suspect good work is going unnoticed because the brand doesn't explain it;",
  "you're too close to the business to see what others see.",
];

const morning = [
  { time: "8:00", what: "Coffee and breakfast" },
  { time: "8:20", what: "Round the table: who you are, and the one growth question on your mind" },
  { time: "8:40", what: "Jess on why a brand stops keeping up with the business, and what that costs (20 minutes)" },
  { time: "9:00", what: "Discussion, led by Jess, built around the questions from the table" },
  { time: "9:45", what: "Your own one-page brand and growth check" },
  { time: "10:05", what: "What we heard, and what to do with it" },
  { time: "10:15", what: "Time to talk. Away by 10:30" },
];

const leaveWith = [
  "A one-page brand and growth check, filled in for your business.",
  "The questions from the table that apply to you, written down.",
  "A dozen people at the same stage, in the same region.",
  "If you want it, a 30-minute call with Jess afterwards to go through your check.",
];

const faqs: { q: string; a: string }[] = [
  { q: "Is it really free?", a: "Yes. There's no charge and nothing to buy on the day. Seats are limited, so we ask a few questions first to make sure the table works for everyone." },
  { q: "Is this a sales event?", a: "No. There's no pitch. If you'd like to carry on the conversation afterwards, you can book a call with Jess. Most people come for the conversation and the people round the table." },
  { q: "How is this different from Alchemy's Brand & Growth Workshop?", a: "The workshop is a paid, in-depth session for one leadership team. The Roundtable is a free morning with other founders, a chance to step back and see your brand from the outside." },
  { q: "Who else will be there?", a: "Founders and MDs of established businesses across South Wales and the South West. We keep the table small and mixed, and avoid seating direct competitors together." },
  { q: "Can I bring a colleague?", a: "Seats are one per business so the table stays balanced. If a co-founder would get more from it than you, tell us when you request your seat." },
  { q: "What if I can't make it after booking?", a: "Let us know as soon as you can and we'll offer your seat to someone on the waiting list." },
  { q: "Will there be other dates?", a: "Yes. The Roundtable runs every quarter, starting in Cardiff, with Bristol next. Request a seat and we'll tell you about future dates." },
  {
    q: "Is it accessible, and can you cater for my diet?",
    a: ROUNDTABLE.venue
      ? `${ROUNDTABLE.venue.access} Tell us about any dietary or access needs in the form.`
      : "We'll share the venue's access details when we confirm your seat. Tell us about any dietary or access needs in the form.",
  },
];

const venueLabel = ROUNDTABLE.venue ? `${ROUNDTABLE.venue.name}, ${ROUNDTABLE.city}` : `${ROUNDTABLE.city}, venue to be confirmed`;

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: ROUNDTABLE.name,
  description: "A free breakfast roundtable for founders and MDs, led by Jess Morgan of Alchemy Branding Studio.",
  startDate: ROUNDTABLE.startsAt,
  endDate: ROUNDTABLE.endsAt,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: ROUNDTABLE.venue?.name ?? `${ROUNDTABLE.city} (venue to be confirmed)`,
    address: ROUNDTABLE.venue?.address ?? `${ROUNDTABLE.city}, Wales, UK`,
  },
  image: [`${siteConfig.url}/roundtable/roundtable-jess.webp`],
  organizer: { "@type": "Organization", name: "Alchemy Branding Studio", url: siteConfig.url },
  performer: { "@type": "Person", name: "Jess Morgan" },
  offers: { "@type": "Offer", price: 0, priceCurrency: "GBP", availability: "https://schema.org/LimitedAvailability", url: `${siteConfig.url}/roundtable` },
  maximumAttendeeCapacity: ROUNDTABLE.seats,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function RoundtablePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero: copy left on plain Dusk, portrait card right with the date ticket over its lower edge. */}
      <section className="relative isolate overflow-hidden bg-dusk pt-[150px] pb-[100px] md:pt-[190px] md:pb-[130px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_80%_35%,rgba(255,110,73,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-14 md:gap-16 items-center">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">{ROUNDTABLE.name}</p>
            <h1 className="font-display mt-4 leading-[1.05] text-[clamp(2.5rem,4.1vw,4rem)] text-dawn">
              One table. One morning. <span className="italic">An honest look at your brand as the business grows.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[1.125rem] leading-[1.7] text-dawn/65">
              The Brand to Scale Roundtable brings 12 to 15 founders and MDs together with Jess Morgan for a working breakfast in {ROUNDTABLE.city}. No pitches,
              no slides to sit through: a frank conversation about the point where a business outgrows its brand, and a clear picture of where yours stands.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" href="#request">
                Request your seat
              </Button>
              <span className="text-[0.95rem] text-dawn/55">Free, by invitation. {ROUNDTABLE.seats} seats.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] md:max-w-none pb-16 md:pb-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-dusk-60">
              <Image
                src="/roundtable/roundtable-jess.webp"
                alt="Jess Morgan leading a session at a meeting table, mid-conversation."
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-[45%_20%]"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-6 md:-left-10 md:right-auto md:w-[78%] rounded-card bg-dusk-80/95 border border-dusk-60 backdrop-blur-sm p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">Next date</p>
              <p className="mt-2 font-display text-[1.5rem] leading-tight text-dawn">{ROUNDTABLE.dateLabel}</p>
              <p className="mt-1 text-dawn/70">
                {ROUNDTABLE.timeLabel} · {venueLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for: Dawn ground, so eyebrow in Space Green and words in Dusk (AGENTS.md). */}
      <section aria-labelledby="for-heading" className="bg-dawn py-[110px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-space-green">Who it&apos;s for</p>
            <h2 id="for-heading" className="font-display text-h2 mt-3 text-dusk">
              Founders and MDs of established businesses
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-dusk/75">
              Roughly £500k to £15M turnover, across South Wales and the South West. Professional services firms and charities are welcome.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-dusk/75">
              It isn&apos;t designed for sole traders or businesses at the very start. If that&apos;s you, we&apos;ll happily point you to something that fits
              better.
            </p>
          </div>
          <div>
            <p className="text-[1.0625rem] font-medium text-dusk">It&apos;s for you if:</p>
            <ul className="mt-4 space-y-4">
              {forYouIf.map((line) => (
                <li key={line} className="flex gap-4 text-[1.0625rem] leading-[1.6] text-dusk/80">
                  <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-dragon-fire" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The morning, and what you leave with */}
      <section aria-labelledby="morning-heading" className="bg-dusk py-[110px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h2 id="morning-heading" className="font-display text-h2 text-dawn">
              The morning
            </h2>
            <ol className="mt-10 border-t border-dusk-60">
              {morning.map((m) => (
                <li key={m.time} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4 border-b border-dusk-60">
                  <span className="font-display text-dragon-fire tabular-nums">{m.time}</span>
                  <span className="text-dawn/75 leading-[1.6]">{m.what}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-h2 text-dawn">What you&apos;ll leave with</h2>
            <ul className="mt-10 space-y-4">
              {leaveWith.map((line) => (
                <li key={line} className="rounded-card bg-dusk-80 border border-dusk-60 p-6 text-dawn/80 leading-[1.6]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Host and proof: results band on Space Green with Dawn words (AGENTS.md). */}
      <section aria-labelledby="host-heading" className="bg-space-green py-[110px]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 id="host-heading" className="font-display text-h2 text-dawn">
              Your host
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-dawn/85">
              Jess Morgan is co-founder and Strategy Director of Alchemy Branding Studio and host of{" "}
              <a href="https://www.brandtoscale.co.uk" className="underline underline-offset-4 decoration-mindaro">
                Brand to Scale
              </a>
              , the podcast about building brands that grow with the business. She works as a strategic partner to SME leadership teams, helping them see
              their brand clearly and put it to work across the business.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-dawn/85">
              At the Roundtable, Jess leads the conversation and keeps it practical. You&apos;ll talk more than you listen.
            </p>
          </div>
          <figure className="rounded-card border border-dawn/20 p-8">
            <blockquote className="text-[1.125rem] leading-[1.7] text-dawn">
              &ldquo;We weren&apos;t looking for &lsquo;just a logo&rsquo; or a marketing exercise. Jess took the time to truly understand our business, our
              culture, our values and our long-term vision before putting pen to paper.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[0.95rem] text-dawn/75">Lee Horton, Athena Security Solutions</figcaption>
          </figure>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-heading" className="bg-dusk-80 py-[110px] border-y border-dusk-60">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <h2 id="faq-heading" className="font-display text-h2 text-dawn">
            Questions
          </h2>
          <div className="mt-10 divide-y divide-dusk-60 border-y border-dusk-60">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between gap-6 text-[1.0625rem] text-dawn">
                  {f.q}
                  <span aria-hidden="true" className="text-dragon-fire transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-[1.7] text-dawn/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The form */}
      <section id="request" aria-labelledby="request-heading" className="bg-dusk py-[110px] scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            {ROUNDTABLE.dateLabel} · {ROUNDTABLE.timeLabel} · {venueLabel}
          </p>
          <h2 id="request-heading" className="font-display text-h2 mt-3 text-dawn">
            Request your seat
          </h2>
          <p className="mt-4 mb-10 text-[1.0625rem] leading-[1.7] text-dawn/65">
            A few questions so the table works for everyone. Jess replies to every request within two working days.
          </p>
          <RoundtableForm />
        </div>
      </section>
    </>
  );
}
