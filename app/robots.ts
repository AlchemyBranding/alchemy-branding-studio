import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt. Replaces the `next-sitemap` postbuild step.
 *
 * The environment switch is reproduced exactly from the old
 * next-sitemap.config.js: production allows crawling, anything else (preview,
 * staging, dev) disallows everything so Vercel preview URLs are never indexed.
 * SiteAuditBot (the SEO partner's SEMrush crawler) and ClaudeBot are allowed in
 * both cases.
 *
 * Getting this wrong in the blocking direction would deindex a site with years
 * of earned search equity. Verify after deploying:
 *
 *   curl -s https://alchemybranding.studio/robots.txt
 *
 * Production must show `Allow: /` for `User-agent: *`, not `Disallow: /`.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alchemybranding.studio";

const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [
        // Allowed pre-launch so the SEO partner can still audit the preview.
        { userAgent: "SiteAuditBot", allow: "/" },
        { userAgent: "ClaudeBot", allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
      host: SITE_URL,
      // No sitemap advertised off production, matching the old
      // `additionalSitemaps: isProduction ? [...] : []`.
    };
  }

  return {
    rules: [
      { userAgent: "SiteAuditBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api", "/projects"],
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
