import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PortableTextContent from "@/components/case-study/PortableTextContent";
import FinalCTA from "@/components/home/FinalCTA";
import PostHero from "@/components/post/PostHero";
import RelatedPosts from "@/components/post/RelatedPosts";
import { indexableRobots } from "@/lib/seo";
import { motionHref, reservedSlugs, siteConfig } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  type BlogPostDetail,
  type BlogPostSlug,
} from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await safeFetch<BlogPostSlug[]>(blogPostSlugsQuery, []);
  return slugs
    .filter((s) => !!s.slug && !reservedSlugs.has(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) return {};

  const post = await safeFetch<BlogPostDetail | null>(
    blogPostBySlugQuery,
    null,
    { params: { slug } },
  );

  if (!post) return { title: "Post not found" };

  const path = `/${post.slug}`;
  // Use the post's own title verbatim as the SERP/tab title — opt out of
  // the root layout's "%s | Alchemy Branding Studio" template so long blog
  // titles don't get pushed past Google's ~60-char truncation. Editors who
  // want a different SERP headline can still override via seo.metaTitle.
  const title = (post.seo?.metaTitle ?? post.title).trim();
  const description =
    post.seo?.metaDescription ??
    post.excerpt ??
    `${post.title} | Alchemy Branding Studio`;
  const canonical = post.seo?.canonicalUrl ?? `${siteConfig.url}${path}`;
  const seoOg = post.seo?.ogImage?.asset
    ? urlFor(post.seo.ogImage as Parameters<typeof urlFor>[0])
        .width(1200)
        .height(630)
        .auto("format")
        .url()
    : post.featuredImage?.asset
      ? urlFor(post.featuredImage).width(1200).height(630).auto("format").url()
      : `${siteConfig.url}/og-default.png`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: post.seo?.noIndex
      ? { index: false, follow: false }
      : indexableRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: seoOg, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoOg],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  // Reserved slugs should never reach here in practice — Next routes static
  // routes first — but belt-and-braces just in case.
  if (reservedSlugs.has(slug)) notFound();

  const post = await safeFetch<BlogPostDetail | null>(
    blogPostBySlugQuery,
    null,
    { params: { slug } },
  );

  if (!post) notFound();

  const articleUrl = post.seo?.canonicalUrl ?? `${siteConfig.url}/${post.slug}`;
  const articleImage = post.featuredImage?.asset
    ? urlFor(post.featuredImage).width(1200).height(630).auto("format").url()
    : `${siteConfig.url}/og-default.png`;
  const articleDescription =
    post.seo?.metaDescription ??
    post.excerpt ??
    `${post.title.trim()} | ${siteConfig.name}`;

  return (
    <>
      <ArticleJsonLd
        url={articleUrl}
        headline={post.title.trim()}
        description={articleDescription}
        image={articleImage}
        datePublished={post.publishedAt}
        dateModified={post._updatedAt}
        authorName={post.author?.name ?? null}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Insights", url: `${siteConfig.url}/news` },
          { name: post.title.trim(), url: articleUrl },
        ]}
      />
      <PostHero
        title={post.title}
        category={post.category}
        publishedAt={post.publishedAt}
        featuredImage={post.featuredImage}
        readTimeMins={post.readTimeMins}
        author={post.author}
      />

      {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
        <section className="bg-dusk py-[80px]">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <PortableTextContent value={post.body} tone="light" />
          </div>
        </section>
      ) : null}

      {post.author?.name ? (
        <section className="bg-dusk pb-[80px]">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="rounded-card bg-dawn/5 border border-dawn/15 p-6">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                Written by
              </p>
              <p className="mt-2 text-dawn">
                <span className="font-bold">{post.author.name}</span>
                {post.author.role ? (
                  <span className="text-dawn/55">, {post.author.role}</span>
                ) : null}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <RelatedPosts posts={post.relatedPosts ?? []} />

      <FinalCTA
        heading="Liked this? See how it shows up in our work."
        subtext="Book a discovery call, or browse projects where we've put this thinking into practice."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "See the work", href: "/portfolio" }}
      />
    </>
  );
}
