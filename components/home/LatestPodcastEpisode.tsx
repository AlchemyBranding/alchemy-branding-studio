"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";

/**
 * Auto-loading Transistor podcast player for the homepage. Fetches the
 * Brand to Scale RSS feed client-side via a CORS proxy, parses the
 * latest episode only, and renders the Transistor iframe + metadata +
 * platform CTAs.
 *
 * Server renders a sensible fallback (title + Listen CTA) so the
 * section reads as finished on first paint and is fully indexable.
 * Client hydration replaces the fallback with the live episode card
 * if the fetch succeeds; if it fails, the fallback stays put.
 *
 * No backend, no API keys, no build step. The downside is the fetch
 * runs every visit — fine for low-cost RSS, but cache it server-side
 * in a future pass if hits get heavy.
 */

const RSS_URL = "https://feeds.transistor.fm/brand-to-scale";
const PLAYER_ACCENT_HEX = "ff6e49"; // dragon-fire, no hash
const SHOW_URL = "https://www.brandtoscale.co.uk";
const PROXIES = [
  (u: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
] as const;

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

export default function LatestPodcastEpisode() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [platforms, setPlatforms] = useState<Platforms>({
    spotify: null,
    apple: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const xml = await loadFeed();
      if (!xml || cancelled) return;
      const parsed = parseFeed(xml);
      if (!parsed || cancelled) return;
      setEpisode(parsed.episode);
      setPlatforms(parsed.platforms);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="podcast-heading"
      className="bg-dawn pb-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-card bg-dawn-80 border border-dawn-60 p-8 md:p-12 overflow-hidden">
          {/* Section header */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                The podcast
              </p>
              <h2
                id="podcast-heading"
                className="font-display text-h3 mt-3 text-white"
              >
                Brand to Scale,{" "}
                <span className="italic text-dusk">the podcast.</span>
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
/* Live episode card (rendered once the RSS fetch resolves)                   */
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
      {/* Artwork */}
      <div className="aspect-square w-full max-w-[220px] mx-auto md:mx-0 rounded-card overflow-hidden bg-dawn border border-dawn-60">
        {episode.artwork ? (
          // Plain <img> rather than next/image because the transistorcdn.com
          // host isn't in next.config remotePatterns — and adding it for one
          // dynamically-fetched image isn't worth the config maintenance.
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
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40">
          {[
            episode.episodeNumber ? `Episode ${episode.episodeNumber}` : null,
            episode.pubDateLabel,
            episode.durationLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3 className="mt-3 font-display text-[1.5rem] leading-[1.2] text-white">
          {episode.title}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-white/65 line-clamp-4">
          {episode.description}
        </p>

        {/* Transistor iframe player */}
        <div className="mt-6 rounded-card overflow-hidden bg-dawn">
          <iframe
            src={`https://player.transistor.fm/episodes/${episode.episodeId}?color=${PLAYER_ACCENT_HEX}`}
            title={`Player for ${episode.title}`}
            width="100%"
            height={180}
            frameBorder={0}
            scrolling="no"
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
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-white/80 hover:text-dragon-fire transition-colors duration-200"
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
                className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-white/80 hover:text-dragon-fire transition-colors duration-200"
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
/* Fallback card (first paint + fetch failure)                                */
/* -------------------------------------------------------------------------- */

function FallbackEpisode() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-10">
      <div
        aria-hidden="true"
        className="aspect-square w-full max-w-[220px] mx-auto md:mx-0 rounded-card bg-gradient-to-br from-dawn-60 via-dawn to-dawn-80 border border-dawn-60"
      />
      <div className="min-w-0">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40">
          Latest episode
        </p>
        <h3 className="mt-3 font-display text-[1.5rem] leading-[1.2] text-white">
          Conversations on building brands that scale.
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-white/65 max-w-xl">
          Founders, marketers and operators on what actually moves the
          needle. New episodes weekly.
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

/* -------------------------------------------------------------------------- */
/* Feed loading + parsing                                                     */
/* -------------------------------------------------------------------------- */

async function loadFeed(): Promise<string | null> {
  for (const proxyOf of PROXIES) {
    try {
      const res = await fetch(proxyOf(RSS_URL), { cache: "no-store" });
      if (!res.ok) continue;
      // allorigins wraps the body in { contents }; corsproxy.io returns raw.
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        const j = (await res.json()) as { contents?: string };
        if (j.contents) return j.contents;
      } else {
        const t = await res.text();
        if (t.includes("<rss") || t.includes("<feed")) return t;
      }
    } catch {
      // try next proxy
    }
  }
  return null;
}

function parseFeed(
  xmlText: string,
): { episode: Episode; platforms: Platforms } | null {
  try {
    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return null;

    const channel = doc.querySelector("channel");
    if (!channel) return null;

    const item = channel.querySelector("item");
    if (!item) return null;

    const title = textOf(item, "title");
    if (!title) return null;

    // Description: prefer itunes:summary, fall back to <description>.
    const itunesNs = "http://www.itunes.com/dtds/podcast-1.0.dtd";
    const summary =
      item.getElementsByTagNameNS(itunesNs, "summary")[0]?.textContent ?? "";
    const description = item.querySelector("description")?.textContent ?? "";
    const rawDesc = summary || description;
    const cleanDesc = rawDesc
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;|&#\d+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    const artwork =
      item.getElementsByTagNameNS(itunesNs, "image")[0]?.getAttribute("href") ??
      null;
    const durationRaw =
      item.getElementsByTagNameNS(itunesNs, "duration")[0]?.textContent ?? null;
    const durationLabel = formatDuration(durationRaw);

    const pubDateRaw = item.querySelector("pubDate")?.textContent ?? "";
    const pubDateLabel = formatDate(pubDateRaw);

    const episodeNumber =
      item.getElementsByTagNameNS(itunesNs, "episode")[0]?.textContent ?? null;

    // Episode ID: extract from the <link> inner text, which is the
    // share.transistor.fm/s/{id} URL. The <guid> on Transistor feeds is
    // a UUID and does NOT work for the player iframe.
    const linkText = item.querySelector("link")?.textContent ?? "";
    const idMatch = linkText.match(/share\.transistor\.fm\/s\/([a-z0-9]+)/i);
    const episodeId = idMatch?.[1] ?? null;
    if (!episodeId) return null;

    // Scan the whole feed for the Spotify show + Apple Podcasts URLs.
    const spotifyMatch = xmlText.match(
      /https?:\/\/open\.spotify\.com\/show\/[^\s"<>]+/i,
    );
    const appleMatch = xmlText.match(
      /https?:\/\/podcasts\.apple\.com\/[^\s"<>]+/i,
    );

    return {
      episode: {
        title,
        description: cleanDesc,
        artwork,
        durationLabel,
        pubDateLabel,
        episodeNumber,
        episodeId,
      },
      platforms: {
        spotify: spotifyMatch?.[0] ?? null,
        apple: appleMatch?.[0] ?? null,
      },
    };
  } catch {
    return null;
  }
}

function textOf(parent: Element, tag: string): string {
  return parent.querySelector(tag)?.textContent?.trim() ?? "";
}

/**
 * Transistor feeds use one of three duration formats:
 *  - "HH:MM:SS"
 *  - "MM:SS"
 *  - a raw seconds integer
 * Output: "63 min" or "63 min 7 sec" depending on length.
 */
function formatDuration(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  let totalSec: number;
  if (/^\d+$/.test(trimmed)) {
    totalSec = parseInt(trimmed, 10);
  } else if (/^\d+:\d{2}(:\d{2})?$/.test(trimmed)) {
    const parts = trimmed.split(":").map((p) => parseInt(p, 10));
    if (parts.length === 3) {
      totalSec = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
      totalSec = parts[0] * 60 + parts[1];
    }
  } else {
    return null;
  }
  if (!Number.isFinite(totalSec) || totalSec <= 0) return null;
  const min = Math.floor(totalSec / 60);
  return `${min} min`;
}

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
