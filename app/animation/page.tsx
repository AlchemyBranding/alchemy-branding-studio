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
import { motionHref, socialLinks } from "@/lib/site";
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
      title: "Explainer Videos and Brand Animation for SMEs",
      description:
        "Explainer videos and brand animation that make the complicated clear in seconds. We settle the one idea the film has to land, then design around it.",
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <HeroReel fill />

        {/* Legibility overlay: the reel runs light in places (Tate & Lyle,
            Burges Salmon), so the copy side needs a heavier scrim than the
            homepage uses. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-dawn via-dawn/85 to-dawn/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-dawn/80 via-transparent to-dawn/50"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Animation
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Animation that makes the complicated</span>{" "}
            <span className="text-dusk italic">feel simple.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/75">
            We make explainer videos and brand animation for businesses with
            something genuinely hard to get across: a regulation, a technology,
            a process, a product. We start with the one idea the piece has to
            land, lock the look in style frames, then animate around it. The
            result earns attention without shouting, and says the same thing as
            the rest of your brand.
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

      {/* Development artwork */}
      <section
        aria-labelledby="development-heading"
        className="relative overflow-hidden bg-dawn-80 py-[120px] border-y border-dawn-60"
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
          className="absolute inset-0 bg-gradient-to-b from-dawn-80/88 via-dawn-80/20 to-dawn-80/88"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Development
          </p>
          <h2
            id="development-heading"
            className="font-display text-h2 mt-3 max-w-3xl text-white"
          >
            The look gets settled before anything moves.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/90">
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
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-dawn-60 bg-dawn shadow-2xl">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                    <figcaption className="mt-3 text-[0.875rem] text-white/85">
                      <span className="text-white group-hover:text-dragon-fire transition-colors duration-200">
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
        className="relative overflow-hidden bg-dawn-80 py-[120px] border-y border-dawn-60"
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
        <div aria-hidden="true" className="absolute inset-0 bg-dawn-80/64" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
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

      {/* YouTube channel */}
      <section
        aria-labelledby="youtube-heading"
        className="relative overflow-hidden bg-dawn py-[120px] border-b border-dawn-60"
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
          className="absolute inset-0 bg-gradient-to-r from-dawn/92 via-dawn/70 to-dawn/38"
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
                className="font-display text-h2 mt-4 text-white"
              >
                Watch the work in full.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-white/70">
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
        className="relative overflow-hidden bg-dawn py-[120px]"
      >
        {/* Heaviest scrim of the three: this section's list items sit directly
            on the background with no card behind them. */}
        <LoopClip
          fill
          src="/video/loop-selwood.mp4"
          poster="/video/loop-selwood-poster.jpg"
          description="A clip from the Selwood customer journey animation: illustrated staff at a depot, with the Selwood wordmark."
        />
        <div aria-hidden="true" className="absolute inset-0 bg-dawn/76" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
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
      {ordered.length > 0 ? (
        <section
          aria-labelledby="animation-work-heading"
          className="relative overflow-hidden bg-dawn-80 py-[120px] border-t border-dawn-60"
        >
          <LoopClip
            fill
            src="/video/loop-cardiff-council.mp4"
            poster="/video/loop-cardiff-council-poster.jpg"
            description="A clip from the Cardiff Council MiPermit animation: illustrated drivers queuing in the rain beside the parking app."
          />
          <div aria-hidden="true" className="absolute inset-0 bg-dawn-80/64" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Selected work
            </p>
            <h2
              id="animation-work-heading"
              className="font-display text-h2 mt-3 max-w-3xl text-white"
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

      <FinalCTA
        heading="Got something complicated to explain?"
        subtext="Book a call and tell us what you're trying to get across. We'll tell you honestly whether animation is the right tool, and how we'd approach it."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />
    </>
  );
}
