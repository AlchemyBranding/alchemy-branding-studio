type Crumb = { name: string; url: string };

/**
 * Emits BreadcrumbList JSON-LD for detail pages. Schema-only, no visible
 * output. Pass the trail in order, e.g. Home > Work > {case study}.
 */
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
