import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import HeroReel from "@/components/animation/HeroReel";
import LoopClip from "@/components/animation/LoopClip";
import Button from "@/components/Button";
import { YouTubeIcon } from "@/components/icons";
import FinalCTA from "@/components/home/FinalCTA";
import WorkGrid from "@/components/home/WorkGrid";
import { getPageMetadata } from "@/lib/seo";
import { bookingHref, socialLinks } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  caseStudiesBySlugsQuery,
  type FeaturedCaseStudy,
} from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "animation",
    path: "/animation",
    defaults: {
      // "Style frames" came off the title and description on 26 Aug 2026.
      // /how-style-frames-can-help-you-meet-your-video-deadline carries the
      // phrase in its own metaTitle, so the two were competing for one term
      // that only has informational intent behind it. The article owns it now
      // and this page links to it; the title went back to commercial intent.
      // 17 Nov 2026: title and description now name South Wales, from the
      // brief approved by Dave (alchemy-marketing-plan/work/
      // 2026-11-17-animation-page-brief.md). The root layout's title.template
      // appends "| Alchemy", so it is not repeated here.
      title: "Animation Studio in South Wales | Explainer Videos",
      description:
        "Explainer videos and brand animation from a South Wales studio, for Cardiff Council, Gwent Police, Age Cymru and DS Smith.",
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

// Read from socialLinks rather than hardcoded, so the channel URL stays in one
// place alongside the footer and portal.
const youtubeHref =
  socialLinks.find((s) => s.icon === "youtube")?.href ??
  "https://www.youtube.com/@alchemybrandingstudio";

// Development artwork: the hand-drawn stage, pulled from the project folders.
// Roughs, thumbnails and storyboards rather than finished style frames, because
// that is what the section copy claims. The finished concept art and style
// frames go in the background collage instead.
const developmentArtwork = [
  {
    src: "/builds/dev2-veeqo.webp",
    client: "Veeqo (an Amazon company)",
    stage: "Storyboard rough",
    href: "/project/veeqo-amazon-product-animation-suite",
    alt: "Veeqo storyboard rough: an inked hand tapping a FREE button on a tablet.",
  },
  {
    src: "/builds/dev2-age-cymru.webp",
    client: "Age Cymru",
    stage: "Character rough",
    href: "/project/age-cymru-dementia-advocacy-bilingual-animation",
    alt: "Age Cymru character rough: three figures drawn in red construction lines over blue guides.",
  },
  {
    src: "/builds/dev4-cardiff.webp",
    client: "Cardiff Council",
    stage: "Thumbnail sketches",
    href: "/project/cardiff-council-mipermit-animated-explainers",
    alt: "Cardiff Council thumbnail sketches: a grid of pencil frames with handwritten notes.",
  },
  {
    src: "/builds/dev3-aneurin-bevan.webp",
    client: "Aneurin Bevan University Health Board",
    stage: "Character sketches",
    href: "/project/aneurin-bevan-help-us-help-you-animated-campaign",
    alt: "Aneurin Bevan character sketches: three pencil character roughs on paper, an older man, a crying woman and a child in a hood.",
  },
  {
    src: "/builds/dev2-bam.webp",
    client: "BAM Construct UK",
    stage: "Character poses",
    href: "/project/bam-construct-uk-social-value-animation",
    alt: "BAM Construct UK character poses: a sheet of figures sketched in red line.",
  },
  {
    src: "/builds/dev2-ds-smith.webp",
    client: "DS Smith",
    stage: "Character designs",
    href: "/project/ds-smith-explaining-eudr-compliance-through-confident-clear-animation",
    alt: "DS Smith character designs: pencil roughs surrounding two finished coloured figures.",
  },
];

// Pinned rather than sorted. The "Animation" tag returns nineteen case studies
// ordered by publishedAt, which is the date of the work: the newest write-ups
// are all of older projects, so they sorted to the bottom and never appeared.
// Naming the three keeps the section current and checkable.
const ANIMATION_CASE_STUDY_SLUGS = [
  "aneurin-bevan-help-us-help-you-animated-campaign",
  "gwent-police-recognise-respond-animation-series",
  "bumblebee-conservation-trust-bee-the-change-animation",
];

// Welsh proof block (brief item 5). Clients already public on the site only.
// Each line is that case study's own title, so no new claims are made here.
const welshWork = [
  {
    client: "Cardiff Council",
    detail: "Three animations for a cashless, paperless parking scheme.",
    href: "/project/cardiff-council-mipermit-animated-explainers",
  },
  {
    client: "Gwent Police",
    detail: "Four training films that made a new procedure stick.",
    href: "/project/gwent-police-recognise-respond-animation-series",
  },
  {
    client: "Age Cymru",
    detail:
      "An animated film for a new dementia advocacy service, in English and Welsh.",
    href: "/project/age-cymru-dementia-advocacy-bilingual-animation",
  },
  {
    client: "Aneurin Bevan University Health Board",
    detail: "An animated campaign that reached UK cinema screens.",
    href: "/project/aneurin-bevan-help-us-help-you-animated-campaign",
  },
  {
    client: "Hafan Cymru",
    detail: "Five bilingual films on healthy relationships, equality and abuse.",
    href: "/project/hafan-cymru-spectrum-bilingual-animation-series",
  },
];

// Short FAQ (brief item 7). The explainer-cost question waits for its blog
// post (due 1 Dec 2026); add it then, linking to the post.
const faqs: { q: string; a: string }[] = [
  {
    q: "Where are you based?",
    a: "Abergavenny, working across Cardiff, South Wales and the UK.",
  },
  {
    q: "Do you make Welsh-language animation?",
    a: "Yes. We've made bilingual films for Age Cymru, Hafan Cymru and the Bumblebee Conservation Trust.",
  },
];

// FAQPage only. The sitewide ProfessionalService/LocalBusiness block in
// components/JsonLd.tsx stays as it is.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const inlineLink =
  "text-dawn underline decoration-dragon-fire underline-offset-4 hover:text-dragon-fire transition-colors duration-200";

const approach = [
  {
    title: "Script and idea first.",
    detail:
      "We get clear on the single thing the piece has to say before any design starts.",
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
    caseStudiesBySlugsQuery,
    [],
    { params: { slugs: ANIMATION_CASE_STUDY_SLUGS } },
  );

  // GROQ returns document order, not the order of the slug list. Sort back so
  // Aneurin Bevan takes the large tile.
  const ordered = ANIMATION_CASE_STUDY_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is FeaturedCaseStudy => Boolean(p));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dusk pt-[160px] md:pt-[200px] pb-[80px]">
        <HeroReel fill />

        {/* Legibility overlay: the reel runs light in places (Tate & Lyle,
            Burges Salmon), so the copy side needs a heavier scrim than the
            homepage uses. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-dusk via-dusk/85 to-dusk/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-dusk/80 via-transparent to-dusk/50"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Animation
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-dawn">Animation that makes the complicated</span>{" "}
            <span className="text-dawn italic">feel simple.</span>
          </h1>
          {/* Brief item 4: the first line under the H1 names South Wales. */}
          <p className="mt-6 md:mt-8 max-w-2xl text-[1.1875rem] md:text-[1.25rem] leading-[1.55] text-dawn">
            We&apos;re an animation studio in South Wales, based in Abergavenny
            and working across Cardiff and the UK.
          </p>
          <p className="mt-4 max-w-2xl text-[1.125rem] leading-[1.7] text-dawn/75">
            We make explainer videos and brand animation for businesses with
            something genuinely hard to get across: a regulation, a technology,
            a process, a product. We start with the one idea the piece has to
            get across, lock the look in style frames, then animate around it. The
            result earns attention without shouting, and says the same thing as
            the rest of your brand.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={bookingHref} external>
              Book a Clarity Call
            </Button>
            <Button variant="secondary" href="/portfolio">
              See the work
            </Button>
          </div>
        </div>
      </section>

      {/* Welsh proof block (brief item 5) */}
      <section
        aria-labelledby="wales-heading"
        className="bg-dusk py-[100px] border-t border-dusk-60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            In Wales
          </p>
          <h2
            id="wales-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-dawn"
          >
            Animation for organisations{" "}
            <span className="italic text-dawn">across Wales.</span>
          </h2>
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {welshWork.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block h-full rounded-card bg-dusk-80 border border-dusk-60 p-7 hover:border-dragon-fire transition-colors duration-200"
                >
                  <h3 className="font-display text-[1.375rem] leading-[1.3] text-dawn group-hover:text-dragon-fire transition-colors duration-200">
                    {item.client}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/65">
                    {item.detail}
                  </p>
                  <span className="mt-4 inline-block text-[0.8rem] font-medium uppercase tracking-[0.08em] text-dragon-fire">
                    See the work &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Development artwork */}
      <section
        aria-labelledby="development-heading"
        className="relative overflow-hidden bg-dusk-80 py-[120px] border-y border-dusk-60"
      >
        {/* Roughs and storyboards scattered as if left out on a table. The
            overlaps and shadows are baked into one composite rather than built
            from positioned <img> tags: cheaper, and it cannot reflow. */}
        <Image
          src="/builds/dev-artwork-table-v3.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.80]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-dusk-80/88 via-dusk-80/20 to-dusk-80/88"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Development
          </p>
          <h2
            id="development-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-dawn"
          >
            The look gets settled before anything moves.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-dawn/90">
            Every film starts on paper. Rough panels to work out the order,
            storyboards to test whether the story holds, then{" "}
            <Link
              href="/how-style-frames-can-help-you-meet-your-video-deadline"
              className="text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
            >
              style frames
            </Link>{" "}
            that fix the palette, the characters and the world. By the time we
            animate, you have already seen and signed off what it will look
            like.
          </p>

          <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentArtwork.map((art) => (
              <li key={art.src}>
                <Link href={art.href} className="group block">
                  <figure>
                  {/* object-contain, not cover: these are drawings, and the
                      sheets are not all 16:9. Cropping a thumbnail page cuts
                      panels off the edges. */}
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-dusk-60 bg-dusk shadow-2xl">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                    <figcaption className="mt-3 text-[0.875rem] text-dawn/85">
                      <span className="text-dawn group-hover:text-dragon-fire transition-colors duration-200">
                        {art.client}
                      </span>
                      <span aria-hidden="true"> · </span>
                      {art.stage}
                    </figcaption>
                  </figure>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we make */}
      <section
        aria-labelledby="what-we-make-heading"
        className="relative overflow-hidden bg-dusk-80 py-[120px] border-y border-dusk-60"
      >
        {/* Clip runs behind the section as texture, not as content. The scrim
            is deliberately heavy: this is body copy over moving pictures, which
            is a much harder read than the hero's short headline. */}
        <LoopClip
          fill
          src="/video/loop-bumblebee.mp4"
          poster="/video/loop-bumblebee-poster.jpg"
          description="A clip from the Bumblebee Conservation Trust animation: an illustrated bumblebee flying over a row of houses."
        />
        <div aria-hidden="true" className="absolute inset-0 bg-dusk-80/64" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What we make
          </p>
          <h2
            id="what-we-make-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-dawn"
          >
            From a single explainer to a whole motion system.
          </h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeMake.map((item) => (
              <li
                key={item.title}
                className="rounded-card bg-dusk border border-dusk-60 p-7"
              >
                <h3 className="font-display text-[1.375rem] text-dawn">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-dawn/65">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
          {/* Brief item 6: bilingual line, with the three bilingual films
              on the site as proof. */}
          <p className="mt-10 max-w-3xl text-[1.0625rem] leading-[1.7] text-dawn/85">
            <span className="font-bold text-dawn">
              English, Welsh and bilingual animation.
            </span>{" "}
            Bilingual films for{" "}
            <Link href="/project/age-cymru-dementia-advocacy-bilingual-animation" className={inlineLink}>
              Age Cymru
            </Link>
            ,{" "}
            <Link href="/project/hafan-cymru-spectrum-bilingual-animation-series" className={inlineLink}>
              Hafan Cymru
            </Link>{" "}
            and the{" "}
            <Link href="/project/bumblebee-conservation-trust-bee-the-change-animation" className={inlineLink}>
              Bumblebee Conservation Trust
            </Link>
            .
          </p>
        </div>
      </section>

      {/* YouTube channel */}
      <section
        aria-labelledby="youtube-heading"
        className="relative overflow-hidden bg-dusk py-[120px] border-b border-dusk-60"
      >
        {/* A real grab of the channel, so the proof is the actual back
            catalogue rather than a stock play button. It will date as YouTube
            redesigns and as view counts move: re-shoot it when it looks old. */}
        <Image
          src="/builds/youtube-channel.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-left opacity-[0.48]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-dusk/92 via-dusk/70 to-dusk/38"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2.5 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                <YouTubeIcon className="h-5 w-5 text-[#FF0000]" />
                On YouTube
              </p>
              <h2
                id="youtube-heading"
                className="font-display text-h2 mt-4 text-dawn"
              >
                Watch the work in full.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-dawn/70">
                The clips on this page are seconds long. The films are not. The
                channel has the finished animations end to end, with the
                voiceover and sound design they were built for, sorted into
                playlists by sector so you can find work close to yours.
              </p>
            </div>

            <div className="shrink-0">
              <Button href={youtubeHref} variant="primary" external>
                Visit our channel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How we approach it */}
      <section
        aria-labelledby="approach-heading"
        className="relative overflow-hidden bg-dusk py-[120px]"
      >
        {/* Heaviest scrim of the three: this section's list items sit directly
            on the background with no card behind them. */}
        <LoopClip
          fill
          src="/video/loop-selwood.mp4"
          poster="/video/loop-selwood-poster.jpg"
          description="A clip from the Selwood customer journey animation: illustrated staff at a depot, with the Selwood wordmark."
        />
        <div aria-hidden="true" className="absolute inset-0 bg-dusk/76" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            How we approach it
          </p>
          <h2
            id="approach-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-dawn"
          >
            Animation works when the thinking comes first.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-dawn/65">
            Most of our animation grows out of brand and strategy work. That is
            why it works: the film is built on the same thinking as everything
            else you put out, so it reinforces the brand rather than sitting
            beside it.
          </p>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {approach.map((item, i) => (
              <li
                key={item.title}
                className="border-t border-dusk-60 pt-5"
              >
                <span
                  aria-hidden="true"
                  className="text-dragon-fire font-bold text-[0.875rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.25rem] mt-2 text-dawn">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-dawn/65">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected animation work */}
      {ordered.length > 0 ? (
        <section
          aria-labelledby="animation-work-heading"
          className="relative overflow-hidden bg-dusk-80 py-[120px] border-t border-dusk-60"
        >
          <LoopClip
            fill
            src="/video/loop-cardiff-council.mp4"
            poster="/video/loop-cardiff-council-poster.jpg"
            description="A clip from the Cardiff Council MiPermit animation: illustrated drivers queuing in the rain beside the parking app."
          />
          <div aria-hidden="true" className="absolute inset-0 bg-dusk-80/64" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="animation-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-dawn"
            >
              Complex stories, told in motion.
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

      {/* Short FAQ (brief item 7). Answers open on the page, not behind a
          toggle, so they read the same to people and to AI tools. */}
      <section
        aria-labelledby="animation-faq-heading"
        className="bg-dusk py-[120px] border-t border-dusk-60"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2
            id="animation-faq-heading"
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
        heading="Got something complicated to explain?"
        subtext="Book a Clarity Call and tell us what you're trying to get across. We'll tell you straight whether animation is the right tool, and how we'd approach it."
        primary={{ label: "Book a Clarity Call", href: bookingHref, external: true }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />
    </>
  );
}
