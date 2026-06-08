import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyQuote from "@/components/case-study/CaseStudyQuote";
import CaseStudyStats from "@/components/case-study/CaseStudyStats";
import PortableTextContent from "@/components/case-study/PortableTextContent";
import RelatedProjects from "@/components/case-study/RelatedProjects";
import FinalCTA from "@/components/home/FinalCTA";
import { indexableRobots } from "@/lib/seo";
import { motionHref, siteConfig } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  type CaseStudyDetail,
  type CaseStudySlug,
} from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await safeFetch<CaseStudySlug[]>(caseStudySlugsQuery, []);
  return slugs.filter((s) => !!s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await safeFetch<CaseStudyDetail | null>(
    caseStudyBySlugQuery,
    null,
    { params: { slug } },
  );

  if (!cs) return { title: "Project not found" };

  const path = `/project/${cs.slug}`;
  // Same reasoning as the blog post route — case study titles are long
  // enough that the brand-name suffix tips them past Google's SERP cap.
  // Editors override the SERP headline via seo.metaTitle.
  const title = (cs.seo?.metaTitle ?? cs.title).trim();
  // Append the brand so the SERP/tab title differs from the on-page H1
  // (the project title), unless seo.metaTitle already includes it.
  const seoTitle = /\|\s*alchemy\b/i.test(title) ? title : `${title} | Alchemy`;
  const description =
    cs.seo?.metaDescription ??
    cs.outcomeSummary ??
    cs.subtitle ??
    `${cs.title}: case study by Alchemy Branding Studio.`;
  const canonical = cs.seo?.canonicalUrl ?? `${siteConfig.url}${path}`;
  const seoOg = cs.seo?.ogImage?.asset
    ? urlFor(cs.seo.ogImage as Parameters<typeof urlFor>[0])
        .width(1200)
        .height(630)
        .auto("format")
        .url()
    : cs.heroImage?.asset
      ? urlFor(cs.heroImage).width(1200).height(630).auto("format").url()
      : `${siteConfig.url}/og-default.png`;

  return {
    title: { absolute: seoTitle },
    description,
    alternates: { canonical },
    robots: cs.seo?.noIndex
      ? { index: false, follow: false }
      : indexableRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: seoOg, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoOg],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = await safeFetch<CaseStudyDetail | null>(
    caseStudyBySlugQuery,
    null,
    { params: { slug } },
  );

  if (!cs) notFound();

  const articleUrl = cs.seo?.canonicalUrl ?? `${siteConfig.url}/project/${cs.slug}`;
  const articleImage = cs.heroImage?.asset
    ? urlFor(cs.heroImage).width(1200).height(630).auto("format").url()
    : `${siteConfig.url}/og-default.png`;
  const articleDescription =
    cs.seo?.metaDescription ??
    cs.outcomeSummary ??
    cs.subtitle ??
    `${cs.title.trim()}: case study by ${siteConfig.name}.`;

  return (
    <>
      <ArticleJsonLd
        url={articleUrl}
        headline={cs.title.trim()}
        description={articleDescription}
        image={articleImage}
        datePublished={cs.publishedAt}
        dateModified={cs._updatedAt}
        authorName={null}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Work", url: `${siteConfig.url}/portfolio` },
          { name: cs.title.trim(), url: articleUrl },
        ]}
      />
      <CaseStudyHero
        title={cs.title}
        subtitle={cs.subtitle}
        serviceTags={cs.serviceTags}
        clientName={cs.clientName}
        outcomeSummary={cs.outcomeSummary}
        heroImage={cs.heroImage}
        heroVideoUrl={cs.heroVideoUrl}
        publishedAt={cs.publishedAt}
      />

      <CaseStudyStats stats={cs.stats ?? []} />

      {cs.body && Array.isArray(cs.body) && cs.body.length > 0 ? (
        <section className="bg-dawn py-[80px]">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <PortableTextContent value={cs.body} />
          </div>
        </section>
      ) : null}

      {cs.clientQuote ? (
        <CaseStudyQuote
          quote={cs.clientQuote}
          attribution={cs.quoteAttribution}
        />
      ) : null}

      <RelatedProjects projects={cs.relatedProjects ?? []} />

      <FinalCTA
        heading="Got a project that needs this kind of work?"
        subtext="Book a discovery call and we'll talk through it, or send us a brief."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
