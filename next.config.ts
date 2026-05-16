import type { NextConfig } from "next";

import { legacyBlogSlugs } from "./lib/legacy-blog-slugs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // ----- Existing page-level redirects ----------------------------------
      // Legacy long-form packages URL → /services
      {
        source: "/full-service-branding-packages-strategy-website-content",
        destination: "/services",
        permanent: true,
      },
      // Packages page was retired in favour of the workshop-led /services
      // page. Anyone still landing on /packages or its old form route gets
      // routed there at the edge.
      {
        source: "/packages",
        destination: "/services",
        permanent: true,
      },
      // Blog → news index (the listing moved to /news).
      {
        source: "/blog",
        destination: "/news",
        permanent: true,
      },
      // Old /blog/:slug → flat /:slug per the URL-structure rule.
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // The podcast lives on its own site.
      {
        source: "/podcast",
        destination: "https://www.brandtoscale.co.uk",
        permanent: true,
      },
      // Two legacy landing URLs both feed the brand audit page.
      {
        source: "/is-your-brand-holding-you-back",
        destination: "/free-brand-audit-for-smes",
        permanent: true,
      },
      {
        source: "/free-brand-audit-for-smes-form",
        destination: "/free-brand-audit-for-smes",
        permanent: true,
      },

      // ----- WordPress → new site migration ---------------------------------
      // Social media management page retired; funnel through /services.
      {
        source: "/social-media-management",
        destination: "/services",
        permanent: true,
      },
      // Standalone brand strategy workshop landing retired; /services now
      // centres on the workshop as the primary offer.
      {
        source: "/brand-strategy-workshops",
        destination: "/services",
        permanent: true,
      },
      // Dissolved client; project archived. Send inbound links to the
      // portfolio index instead of 404ing.
      {
        source:
          "/broughton-bay-gin-branding-capturing-the-essence-of-the-gower-in-a-bottle",
        destination: "/portfolio",
        permanent: true,
      },
      // Old WordPress form thank-you pages — likely no real backlinks but
      // catch stragglers cheaply.
      {
        source: "/contact/confirmation",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mailing-list-confirmation",
        destination: "/",
        permanent: true,
      },

      // Blog category archives (10) → /news. The new site's category filter
      // lives client-side on /news; we lose minor per-category SEO depth but
      // those pages weren't driving meaningful traffic.
      {
        source: "/category/:slug",
        destination: "/news",
        permanent: true,
      },
      // Project / portfolio category archives (7) → /portfolio.
      {
        source: "/project_categories/:slug",
        destination: "/portfolio",
        permanent: true,
      },
      // WordPress tag archives — 30+ low-traffic indexed pages. /news already
      // covers the topical entry surface.
      {
        source: "/tag/:slug",
        destination: "/news",
        permanent: true,
      },
      // Project sector archives — handful of indexed URLs.
      {
        source: "/project_sector/:slug",
        destination: "/portfolio",
        permanent: true,
      },
      // Two more legacy service URLs.
      {
        source: "/workshops",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services-2",
        destination: "/services",
        permanent: true,
      },
      // Indexed PDF — preserve at a cleaner URL.
      {
        source: "/wp-content/uploads/2024/04/AB_ANIMATION_PROCESS.pdf",
        destination: "/ab-animation-process.pdf",
        permanent: true,
      },

      // ----- Legacy blog posts → /news --------------------------------------
      // Bulk 301 for the long-tail WordPress posts that aren't being
      // re-created in Sanity. To preserve a specific post, remove its slug
      // from lib/legacy-blog-slugs.ts AND create the Sanity document at the
      // matching slug — the Sanity route will start serving instead.
      ...legacyBlogSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: "/news",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
