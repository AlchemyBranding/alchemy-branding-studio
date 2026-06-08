import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/fetch";
import { pageSeoByKeyQuery, type PageSeo } from "@/sanity/lib/queries";

type PageKey =
  | "home"
  | "about"
  | "services"
  | "packages"
  | "news"
  | "portfolio"
  | "contact"
  | "free-brand-audit"
  | "custom-proposal-design"
  | "animation"
  | "branding-services-cardiff";

type Args = {
  pageKey: PageKey;
  /** Local path including leading slash. */
  path: string;
  defaults: {
    title: string;
    description: string;
  };
};

/**
 * Default robots config for any indexable page. Matches what the old
 * Yoast-driven WordPress site emitted (max-image-preview:large unlocks
 * large image previews in mobile SERPs). Routes that need to opt out
 * can return their own robots object instead.
 */
export const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/**
 * Builds Next.js Metadata for a static route, layering Sanity-stored
 * pageSeo values on top of supplied defaults. Falls back cleanly when
 * Sanity is unreachable or has no entry for the page yet.
 */
export async function getPageMetadata({
  pageKey,
  path,
  defaults,
}: Args): Promise<Metadata> {
  const data = await safeFetch<PageSeo | null>(pageSeoByKeyQuery, null, {
    params: { pageKey },
  });

  const title = data?.metaTitle ?? defaults.title;
  const description = data?.metaDescription ?? defaults.description;
  const canonical = data?.canonicalUrl ?? `${siteConfig.url}${path}`;
  const ogImage = data?.ogImage?.asset
    ? urlFor(data.ogImage as Parameters<typeof urlFor>[0])
        .width(1200)
        .height(630)
        .auto("format")
        .url()
    : `${siteConfig.url}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: data?.noIndex
      ? { index: false, follow: false }
      : indexableRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
