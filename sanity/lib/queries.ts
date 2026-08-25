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

// Featured first (sorted newest first within that), then backfilled with
// the most recent non-featured case studies so the homepage grid still
// fills its three slots while the portfolio is being built out.
export const featuredCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
    | order(coalesce(featuredHero, false) desc, coalesce(featured, false) desc, publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      cardImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    }
`);

export const animationCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current) && "Animation" in serviceTags]
    | order(coalesce(featured, false) desc, publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      cardImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    }
`);

// featuredHero leads the sort, the same first key featuredCaseStudiesQuery
// uses, so the large tile here is the build the homepage leads on. Without it
// the large slot fell to whichever featured case study was published most
// recently, and the two grids disagreed about which build is the flagship.
export const websiteCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current) && "Website" in serviceTags]
    | order(coalesce(featuredHero, false) desc, coalesce(featured, false) desc, publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      serviceTags,
      clientName,
      outcomeSummary,
      heroImage ${altImageProjection},
      cardImage ${altImageProjection},
      "heroVideoUrl": heroVideo.asset->url
    }
`);

// Shared by the service pages whose proof cannot be selected by a serviceTag.
// The slugs are passed in by the page and pinned deliberately, so the work on
// each page is checkable rather than whatever a loose text match returns.
//
// /brand-strategy-workshop: there is no "Workshop" tag, and these three are the
// case studies whose write-up actually opens on the workshop.
// /brand-identity: there is no "Identity" tag, and the nearest one, "Branding",
// returns the same three featured entries as /website-design, which would have
// put identical work on two service pages.
export const caseStudiesBySlugsQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current in $slugs] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    serviceTags,
    clientName,
    outcomeSummary,
    heroImage ${altImageProjection},
    cardImage ${altImageProjection},
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
      linkedinUrl,
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
      cardImage ${altImageProjection},
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
    _updatedAt,
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
    _updatedAt,
    title,
    "slug": slug.current,
    subtitle,
    serviceTags,
    clientName,
    clientUrl,
    publishedAt,
    outcomeSummary,
    heroImage ${altImageProjection},
    "heroVideoUrl": heroVideo.asset->url,
    body,
    stats,
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

// Shape types: minimal projections, expanded as routes need more fields.
export type FeaturedCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  serviceTags: string[] | null;
  clientName: string | null;
  outcomeSummary: string | null;
  heroImage: SanityImageRef | null;
  cardImage: SanityImageRef | null;
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
  _updatedAt: string;
  body: unknown[] | null;
  readTimeMins: number | null;
  author: BlogPostAuthor | null;
  relatedPosts: RecentBlogPost[] | null;
  seo: PageSeo | null;
};

export type BlogPostSlug = { slug: string };

export type CaseStudyStat = {
  value: number;
  prefix: string | null;
  suffix: string | null;
  label: string;
  decimals: number | null;
};

export type CaseStudyDetail = FeaturedCaseStudy & {
  _updatedAt: string;
  clientUrl: string | null;
  publishedAt: string;
  body: unknown[] | null;
  stats: CaseStudyStat[] | null;
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
  linkedinUrl: string | null;
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
