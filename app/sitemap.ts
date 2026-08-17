import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

/**
 * Dynamic sitemap. Replaces the `next-sitemap` postbuild step, which could only
 * regenerate when the site was rebuilt — so anything published in Sanity after
 * the last deploy never appeared. Verified 10 Aug 2026: the 28 July post and
 * seven case studies were live but missing from /sitemap.xml.
 *
 * The route is revalidated on publish by app/api/revalidate/route.ts. The
 * window below is a backstop in case a webhook delivery is missed.
 *
 * Queries, route prefixes, priorities and changefreq values are reproduced
 * exactly from the old next-sitemap.config.js. The site has earned search
 * equity that we are deliberately preserving, so the only intended difference
 * in output is that stale entries are gone and new ones appear.
 */
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alchemybranding.studio";

/**
 * Static routes, previously discovered by next-sitemap from the build output.
 * Priorities match the old `transform` map; anything unlisted there defaulted
 * to 0.7.
 *
 * Deliberately excluded, matching the old `exclude` array: /studio, /api,
 * /portal, /motion, /holding, /holding-static, /projects, /opengraph-image,
 * /free-brand-audit-for-smes/thank-you and /contact/confirmation.
 *
 * Also excluded, and new: /apple-icon.png and /icon.svg. next-sitemap listed
 * them as pages because files in app/ become routes. They are assets.
 *
 * Not included: /packages. It is a 301 to /services and was never in the
 * sitemap.
 */
const STATIC_ROUTES: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/free-brand-audit-for-smes", priority: 0.8 },
  { path: "/custom-proposal-design", priority: 0.8 },
  { path: "/news", priority: 0.8 },
  // Commercial service pages. The workshop page carries the largest non-brand
  // query on the site, so it sits with /services rather than at the 0.7 default.
  { path: "/brand-strategy-workshop", priority: 0.9 },
  { path: "/website-design", priority: 0.8 },
  { path: "/animation", priority: 0.7 },
  { path: "/branding-services-cardiff", priority: 0.7 },
  { path: "/cookie-policy", priority: 0.7 },
  { path: "/privacy-policy", priority: 0.7 },
];

// Verbatim from next-sitemap.config.js.
const BLOG_QUERY = `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt)] {
  "slug": slug.current,
  "lastmod": coalesce(_updatedAt, publishedAt)
}`;

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && defined(slug.current)] {
  "slug": slug.current,
  "lastmod": coalesce(_updatedAt, publishedAt)
}`;

type SanityRoute = { slug: string; lastmod: string | null };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: new URL(path, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority,
    }),
  );

  try {
    const [posts, caseStudies] = await Promise.all([
      client.fetch<SanityRoute[]>(BLOG_QUERY),
      client.fetch<SanityRoute[]>(CASE_STUDY_QUERY),
    ]);

    const contentEntries: MetadataRoute.Sitemap = [
      ...(posts ?? []).map((p) => ({
        url: new URL(`/${p.slug}`, SITE_URL).toString(),
        lastModified: p.lastmod ? new Date(p.lastmod) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...(caseStudies ?? []).map((c) => ({
        url: new URL(`/project/${c.slug}`, SITE_URL).toString(),
        lastModified: c.lastmod ? new Date(c.lastmod) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];

    return [...staticEntries, ...contentEntries];
  } catch (err) {
    // Same posture as the old config: degrade to static-only rather than
    // failing. An empty sitemap would tell Google the site has been emptied,
    // which is far worse than one that is temporarily short.
    console.warn(
      "[sitemap] Sanity fetch failed, serving static routes only:",
      err instanceof Error ? err.message : err,
    );
    return staticEntries;
  }
}
