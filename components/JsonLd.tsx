import { siteConfig } from "@/lib/site";

/**
 * Site-wide structured data, rendered once from the root layout.
 *
 * Source of truth: alchemy-marketing-plan/15-ai-visibility.md sections 3 and 3b
 * (decided 26 Oct 2026). Rules from that brief:
 * - One public postal address everywhere: the registered office in Cardiff.
 *   Never the old Hatherleigh Place address or a home address.
 * - Every fact here must also be visible on the site (footer, homepage, about).
 *   No ratings, reviews, prices, opening hours or geo coordinates.
 * - The Google Business Profile is a service-area business with its address
 *   hidden, so it never shows International House on the map. This schema
 *   carries the registered office as the postal address only.
 *
 * Not included yet, on purpose:
 * - foundingDate: no page says when the studio started.
 * - Google Business Profile and DesignRush in sameAs: links still to come.
 */

const organizationId = `${siteConfig.url}/#organization`;
const businessId = `${siteConfig.url}/#business`;
const logo = `${siteConfig.url}/alchemy-logo-dark.svg`;

const sameAs = [
  "https://www.linkedin.com/company/alchemy-branding-studio",
  "https://www.instagram.com/alchemybrandingstudio",
  "https://www.facebook.com/alchemybrandingstudio",
  "https://www.youtube.com/@alchemybrandingstudio",
  "https://clutch.co/profile/alchemy-branding-studio",
  "https://www.brandtoscale.co.uk",
];

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "International House, 10 Churchill Way",
  addressLocality: "Cardiff",
  postalCode: "CF10 2HE",
  addressCountry: "GB",
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      legalName: "Alchemist Palace Ltd",
      url: `${siteConfig.url}/`,
      logo,
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
      address: postalAddress,
      founder: [
        {
          "@type": "Person",
          name: "Jess Morgan",
          jobTitle: "Co-founder & Strategy Director",
        },
        {
          "@type": "Person",
          name: "Dave Morgan",
          jobTitle: "Co-founder & Operations Director",
        },
      ],
      sameAs,
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      logo,
      image: logo,
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
      address: postalAddress,
      areaServed: [
        { "@type": "City", name: "Abergavenny" },
        { "@type": "AdministrativeArea", name: "Monmouthshire" },
        { "@type": "City", name: "Cardiff" },
        { "@type": "City", name: "Newport" },
        { "@type": "Place", name: "South Wales" },
        { "@type": "AdministrativeArea", name: "Wales" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      parentOrganization: { "@id": organizationId },
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape "<" so no string in the data can close the script tag early.
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
