import { siteConfig, socialLinks } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/alchemy-logo-white.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  sameAs: socialLinks.map((s) => s.href),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
      ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
      : "+447734794779",
  // Must match the Google Business Profile, which is in Abergavenny. The only
  // Cardiff address is a virtual office, and Google does not allow a Business
  // Profile at one, so Cardiff is named as a served area instead. No street or
  // postcode until it is settled whether the profile shows its address.
  // alchemy-content-engine/decisions/OPEN.md item 58.
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressRegion: "Wales",
    addressLocality: "Abergavenny",
  },
  priceRange: "££££",
  areaServed: [
    { "@type": "City", name: "Cardiff" },
    { "@type": "City", name: "Newport" },
    { "@type": "City", name: "Bristol" },
    { "@type": "AdministrativeArea", name: "Monmouthshire" },
    { "@type": "AdministrativeArea", name: "Wales" },
  ],
  sameAs: socialLinks.map((s) => s.href),
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
