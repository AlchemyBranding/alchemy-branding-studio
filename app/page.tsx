import type { Metadata } from "next";

import AuditBand from "@/components/home/AuditBand";
import FeaturedWork from "@/components/home/FeaturedWork";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import HomepageFaq from "@/components/home/HomepageFaq";
import InsightsPreview from "@/components/home/InsightsPreview";
import LatestPodcastEpisode from "@/components/home/LatestPodcastEpisode";
import LogoStrip from "@/components/home/LogoStrip";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import PositioningStrip from "@/components/home/PositioningStrip";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import WorkshopBlock from "@/components/home/WorkshopBlock";
import { getPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  featuredCaseStudiesQuery,
  featuredTestimonialsQuery,
  recentBlogPostsQuery,
  type FeaturedCaseStudy,
  type FeaturedTestimonial,
  type RecentBlogPost,
} from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "home",
    path: "/",
    defaults: {
      title: siteConfig.name,
      description: siteConfig.description,
    },
  });
}

export default async function HomePage() {
  const [featuredCases, testimonials, recentPosts] = await Promise.all([
    safeFetch<FeaturedCaseStudy[]>(featuredCaseStudiesQuery, []),
    safeFetch<FeaturedTestimonial[]>(featuredTestimonialsQuery, []),
    safeFetch<RecentBlogPost[]>(recentBlogPostsQuery, []),
  ]);

  return (
    <>
      {/* 5.1 Hero (existing background video, new copy) */}
      <Hero />
      {/* 5.2 Logo proof (LogoStrip stays for now; logo grid is Phase 4) */}
      <LogoStrip />
      {/* 5.3 Positioning strip — "Design is the lever, growth is the point" */}
      <PositioningStrip />
      {/* 5.4 Workshop-led foundation (replaces the old service catalogue) */}
      <WorkshopBlock />
      {/* 5.5 Featured work (Sanity-driven, adaptive 1/2/3 layout) */}
      <FeaturedWork projects={featuredCases} />
      {/* 5.6 Free brand audit lead-magnet band */}
      <AuditBand />
      {/* 5.7 Proof — testimonials */}
      <TestimonialsCarousel testimonials={testimonials} />
      {/* 5.8 Owned media — blog grid + podcast tile */}
      <InsightsPreview posts={recentPosts} />
      <LatestPodcastEpisode />
      {/* 5.9 FAQ + FAQPage JSON-LD */}
      <HomepageFaq />
      {/* 5.10 Newsletter — brand checklist lead magnet */}
      <NewsletterSignup location="homepage" />
      {/* 5.11 FinalCTA (new defaults: audit primary, Book a call secondary) */}
      <FinalCTA />
    </>
  );
}
