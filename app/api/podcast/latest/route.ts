import { NextResponse } from "next/server";

/**
 * Server-side fetch of the Brand to Scale RSS feed. Cached at the
 * route level for an hour, then revalidated on next request. Avoids
 * the client-side CORS proxy dependency (both allorigins and
 * corsproxy.io have been unreliable in production).
 *
 * Endpoint: GET /api/podcast/latest
 * Response: { ok: true, episode: {...}, platforms: {...} } on success,
 *           { ok: false } with 502 on any failure.
 */

const RSS_URL = "https://feeds.transistor.fm/brand-to-scale";

export const revalidate = 3600;

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

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "alchemy-branding-studio/1.0" },
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `upstream ${res.status}` },
        { status: 502 },
      );
    }
    const xml = await res.text();
    const parsed = parseFeed(xml);
    if (!parsed) {
      return NextResponse.json(
        { ok: false, error: "parse failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, ...parsed });
  } catch (err) {
    console.error("[podcast/latest] fetch failed:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "fetch failed" },
      { status: 502 },
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Regex-based parser                                                         */
/*                                                                            */
/* Node doesn't ship DOMParser. Adding fast-xml-parser for one route          */
/* is overkill — Transistor's feed shape is stable and we only need a         */
/* handful of fields from the first <item>. Targeted regex covers it.        */
/* -------------------------------------------------------------------------- */

function parseFeed(
  xml: string,
): { episode: Episode; platforms: Platforms } | null {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  if (!itemMatch) return null;
  const item = itemMatch[1];

  const title = cleanText(captureField(item, "title"));
  if (!title) return null;

  const linkText = captureField(item, "link");
  const idMatch = linkText.match(/share\.transistor\.fm\/s\/([a-z0-9]+)/i);
  const episodeId = idMatch?.[1];
  if (!episodeId) return null;

  const summary = captureField(item, "itunes:summary");
  const description = captureField(item, "description");
  const cleanDesc = cleanHtml(summary || description);

  const artwork = captureAttr(item, "itunes:image", "href");
  const durationLabel = formatDuration(captureField(item, "itunes:duration"));
  const pubDateLabel = formatDate(captureField(item, "pubDate"));
  const episodeNumber = captureField(item, "itunes:episode") || null;

  const spotifyMatch = xml.match(
    /https?:\/\/open\.spotify\.com\/show\/[^\s"<>]+/i,
  );
  const appleMatch = xml.match(
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
}

function captureField(scope: string, tag: string): string {
  // Match <tag>...</tag> tolerating self-closing and CDATA.
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)</${escaped}>`);
  const m = scope.match(re);
  if (!m) return "";
  // Trim first so leading whitespace inside the tag doesn't prevent
  // the CDATA marker from being stripped.
  return m[1]
    .trim()
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function captureAttr(scope: string, tag: string, attr: string): string | null {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedAttr = attr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<${escaped}[^>]*\\s${escapedAttr}="([^"]+)"[^>]*/?>`,
  );
  const m = scope.match(re);
  return m?.[1] ?? null;
}

function cleanText(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function cleanHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDuration(raw: string): string | null {
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
