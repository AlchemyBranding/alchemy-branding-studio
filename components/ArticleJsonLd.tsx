import { siteConfig } from "@/lib/site";

type Props = {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string | null;
};

export default function ArticleJsonLd({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/alchemy-logo-white.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
