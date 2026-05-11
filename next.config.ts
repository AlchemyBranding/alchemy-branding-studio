import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // Legacy long-form packages URL — bypasses the now-deleted /packages
      // step and goes straight to /services.
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
      // Blog -> news index (the listing moved to /news).
      {
        source: "/blog",
        destination: "/news",
        permanent: true,
      },
      // Old /blog/:slug -> flat /:slug per the URL-structure rule.
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
    ];
  },
};

export default nextConfig;
