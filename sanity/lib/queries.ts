import { defineQuery } from "next-sanity";

const altImageProjection = `{
  asset,
  hotspot,
  crop,
  "alt": coalesce(alt, "")
}`;

const seoProjection = `{
  metaTitle,
  metaDescription,
  ogImage,
  noIndex,
  canonicalUrl
}`;

export const featuredCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && featured == true && defined(slug.current)]
    | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    }
`);

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && featured == true]
    | order(order asc, _createdAt asc) {
      _id,
      quote,
      photo ${altImageProjection},
      name,
      jobTitle,
      company
    }
`);

export const recentBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      excerpt,
      featuredImage ${altImageProjection}
    }
`);

export const pageSeoByKeyQuery = defineQuery(`
  *[_type == "pageSeo" && pageKey == $pageKey][0] ${seoProjection}
`);

export const teamMembersQuery = defineQuery(`
  *[_type == "teamMember"]
    | order(order asc, name asc) {
      _id,
      name,
      role,
      bio,
      photo ${altImageProjection}
    }
`);

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    }
`);

export const caseStudySlugsQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      excerpt,
      featuredImage ${altImageProjection}
    }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    featuredImage ${altImageProjection},
    body,
    "readTimeMins": math::max([1, round(length(pt::text(body)) / 1125)]),
    "author": author->{
      _id,
      name,
      role,
      photo ${altImageProjection}
    },
    "relatedPosts": relatedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      excerpt,
      featuredImage ${altImageProjection}
    },
    seo ${seoProjection}
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    serviceTags,
    clientName,
    publishedAt,
    outcomeSummary,
    heroImage ${altImageProjection},
    "heroVideoUrl": heroVideo.asset->url,
    body,
    clientQuote,
    quoteAttribution,
    "relatedProjects": relatedProjects[]->{
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    },
    seo ${seoProjection}
  }
`);

// Shape types — minimal projections, expanded as routes need more fields.
export type FeaturedCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  serviceTags: string[] | null;
  clientName: string | null;
  outcomeSummary: string | null;
  heroImage: SanityImageRef | null;
  heroVideoUrl: string | null;
};

export type FeaturedTestimonial = {
  _id: string;
  quote: string;
  photo: SanityImageRef | null;
  name: string;
  jobTitle: string | null;
  company: string | null;
};

export type RecentBlogPost = {
  _id: string;
  title: string;
  slug: string;
  category: string | null;
  publishedAt: string;
  excerpt: string | null;
  featuredImage: SanityImageRef | null;
};

export type BlogPostAuthor = {
  _id: string;
  name: string;
  role: string;
  photo: SanityImageRef | null;
};

export type BlogPostDetail = RecentBlogPost & {
  body: unknown[] | null;
  readTimeMins: number | null;
  author: BlogPostAuthor | null;
  relatedPosts: RecentBlogPost[] | null;
  seo: PageSeo | null;
};

export type BlogPostSlug = { slug: string };

export type CaseStudyDetail = FeaturedCaseStudy & {
  publishedAt: string;
  body: unknown[] | null;
  clientQuote: string | null;
  quoteAttribution: string | null;
  relatedProjects: FeaturedCaseStudy[] | null;
  seo: PageSeo | null;
};

export type CaseStudySlug = { slug: string };

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio: string | null;
  photo: SanityImageRef | null;
};

export type PageSeo = {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: { asset?: { _ref?: string } } | null;
  noIndex: boolean | null;
  canonicalUrl: string | null;
};

export type SanityImageRef = {
  asset: { _ref: string } | null;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  alt: string;
};
