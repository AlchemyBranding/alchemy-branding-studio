"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";

/**
 * Renders the latest Brand to Scale podcast episode using data from
 * the server route at /api/podcast/latest (which fetches + caches the
 * Transistor RSS feed for an hour).
 *
 * Server renders the fallback first; client hydration replaces it
 * with the live episode card once /api/podcast/latest resolves. If
 * the API call fails, the fallback stays put — the section is
 * indexable and always reads as finished.
 */

const SHOW_URL = "https://www.brandtoscale.co.uk";

type Episode = {
  title: string;
  description: string;
  artwork: string | null;
  durationLabel: string | null;
  pubDateLabel: string;
  episodeNumber: string | null;
  episodeId: string;
};

type Platforms = {
  spotify: string | null;
  apple: string | null;
};

type ApiResponse =
  | { ok: true; episode: Episode; platforms: Platforms }
  | { ok: false; error?: string };

export default function LatestPodcastEpisode() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [platforms, setPlatforms] = useState<Platforms>({
    spotify: null,
    apple: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/podcast/latest");
        if (!res.ok) return;
        const data = (await res.json()) as ApiResponse;
        if (cancelled || !data.ok) return;
        setEpisode(data.episode);
        setPlatforms(data.platforms);
      } catch {
        // Stay on the fallback if the request errors.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="podcast-heading"
      className="bg-dusk pb-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-card bg-dusk-80 border border-dusk-60 p-8 md:p-12 overflow-hidden">
          {/* Section header */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              {/* Brand to Scale logo, Dawn on Dusk only (guidelines slide 27). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-to-scale/brand-to-scale-line-dawn.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-auto mb-5"
              />
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                The podcast
              </p>
              <h2
                id="podcast-heading"
                className="font-display text-h3 mt-3 text-dawn"
              >
                Brand to Scale,{" "}
                <span className="italic text-dawn">the podcast.</span>
              </h2>
            </div>
            <Button href={SHOW_URL} variant="secondary" external>
              All episodes
            </Button>
          </div>

          {episode ? (
            <LiveEpisode episode={episode} platforms={platforms} />
          ) : (
            <FallbackEpisode />
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Live episode card (rendered once /api/podcast/latest resolves)             */
/* -------------------------------------------------------------------------- */

function LiveEpisode({
  episode,
  platforms,
}: {
  episode: Episode;
  platforms: Platforms;
}) {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-10">
      {/* Artwork. Plain <img> rather than next/image because the host
          (img.transistorcdn.com) isn't in next.config remotePatterns,
          and adding it for a single dynamic image isn't worth the
          maintenance overhead. */}
      <div className="aspect-square w-full max-w-[220px] mx-auto md:mx-0 rounded-card overflow-hidden bg-dusk border border-dusk-60">
        {episode.artwork ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={episode.artwork}
            alt={`Artwork for ${episode.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Metadata + description + player */}
      <div className="min-w-0">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-dawn/65">
          {[
            episode.episodeNumber ? `Episode ${episode.episodeNumber}` : null,
            episode.pubDateLabel,
            episode.durationLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3 className="mt-3 font-display text-[1.5rem] leading-[1.2] text-dawn">
          {episode.title}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-dawn/65 line-clamp-4">
          {episode.description}
        </p>

        {/* Transistor iframe player. /e/{id}/dark is Transistor's
            dark-themed embed; the /e/{id} URL is the light variant.
            Accent colour comes from the show's Transistor settings,
            not a query string. */}
        <div className="mt-6 rounded-card overflow-hidden">
          <iframe
            src={`https://share.transistor.fm/e/${episode.episodeId}/dark`}
            title={`Player for ${episode.title}`}
            width="100%"
            height={180}
            frameBorder={0}
            scrolling="no"
            seamless
            loading="lazy"
            className="block w-full"
          />
        </div>

        {/* Platform CTAs */}
        {platforms.spotify || platforms.apple ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {platforms.spotify ? (
              <a
                href={platforms.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-dawn/80 hover:text-dragon-fire transition-colors duration-200"
              >
                Follow on Spotify
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
            {platforms.apple ? (
              <a
                href={platforms.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-dawn/80 hover:text-dragon-fire transition-colors duration-200"
              >
                Listen on Apple Podcasts
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Fallback card (first paint + API failure)                                  */
/* -------------------------------------------------------------------------- */

function FallbackEpisode() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-10">
      <div
        aria-hidden="true"
        className="aspect-square w-full max-w-[220px] mx-auto md:mx-0 rounded-card bg-dusk border border-dusk-60 flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand-to-scale/brand-to-scale-stacked-dawn.svg"
          alt=""
          className="w-[62%] h-auto"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-dawn/65">
          Latest episode
        </p>
        <h3 className="mt-3 font-display text-[1.5rem] leading-[1.2] text-dawn">
          Conversations on building brands that scale.
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-dawn/65 max-w-xl">
          Founders and operators on what actually helps a business grow.
          Hosted by Jess Morgan. <strong className="font-bold text-dawn">A new
          episode every month.</strong>
        </p>
        <div className="mt-6">
          <Button href={SHOW_URL} variant="primary" external>
            Listen at brandtoscale.co.uk
          </Button>
        </div>
      </div>
    </div>
  );
}
