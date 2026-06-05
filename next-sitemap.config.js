// @ts-check
/**
 * next-sitemap config. Reads Sanity slugs at build time so blog posts and
 * case studies are included in /sitemap.xml. Robots.txt switches based on
 * NEXT_PUBLIC_ENV — production allows everything, anything else (preview,
 * staging, dev) disallows all so we don't accidentally index Vercel preview
 * URLs.
 */
const { createClient } = require("next-sanity");

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alchemybranding.studio";
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-05-01",
  useCdn: true,
});

const BLOG_QUERY = `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt)] {
  "slug": slug.current,
  "lastmod": coalesce(_updatedAt, publishedAt)
}`;

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && defined(slug.current)] {
  "slug": slug.current,
  "lastmod": coalesce(_updatedAt, publishedAt)
}`;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    "/studio",
    "/studio/*",
    "/api/*",
    "/404",
    "/500",
    "/portal",
    "/motion",
    "/opengraph-image",
  ],
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: isProduction
      ? [
          // SEO partner's audit crawler (SEMrush Site Audit) — always allowed.
          { userAgent: "SiteAuditBot", allow: "/" },
          { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
        ]
      : [
          // Pre-launch everything is blocked from indexing, but allow the SEO
          // partner's audit crawler (SEMrush Site Audit) so they can still run
          // audits against the preview before the DNS cutover.
          { userAgent: "SiteAuditBot", allow: "/" },
          { userAgent: "*", disallow: "/" },
        ],
    additionalSitemaps: isProduction ? [`${SITE_URL}/sitemap.xml`] : [],
  },
  transform: (config, path) => {
    // Tweak priority by route role
    const priorityByPath = {
      "/": 1.0,
      "/services": 0.9,
      "/portfolio": 0.9,
      "/about": 0.8,
      "/contact": 0.8,
      "/free-brand-audit-for-smes": 0.8,
      "/custom-proposal-design": 0.8,
      "/news": 0.8,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityByPath[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    try {
      const [posts, caseStudies] = await Promise.all([
        sanityClient.fetch(BLOG_QUERY),
        sanityClient.fetch(CASE_STUDY_QUERY),
      ]);
      return [
        ...posts.map((p) => ({
          loc: `/${p.slug}`,
          changefreq: "monthly",
          priority: 0.6,
          lastmod: p.lastmod ?? new Date().toISOString(),
        })),
        ...caseStudies.map((c) => ({
          loc: `/project/${c.slug}`,
          changefreq: "monthly",
          priority: 0.7,
          lastmod: c.lastmod ?? new Date().toISOString(),
        })),
      ];
    } catch (err) {
      console.warn(
        "[next-sitemap] Sanity fetch failed, falling back to static-only:",
        err instanceof Error ? err.message : err,
      );
      return [];
    }
  },
};
