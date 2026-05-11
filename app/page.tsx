import FeaturedWork from "@/components/home/FeaturedWork";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import InsightsPreview from "@/components/home/InsightsPreview";
import LogoStrip from "@/components/home/LogoStrip";
import ServicesOverview from "@/components/home/ServicesOverview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { safeFetch } from "@/sanity/lib/fetch";
import {
  featuredCaseStudiesQuery,
  featuredTestimonialsQuery,
  recentBlogPostsQuery,
  type FeaturedCaseStudy,
  type FeaturedTestimonial,
  type RecentBlogPost,
} from "@/sanity/lib/queries";

export default async function HomePage() {
  const [featuredCases, testimonials, recentPosts] = await Promise.all([
    safeFetch<FeaturedCaseStudy[]>(featuredCaseStudiesQuery, []),
    safeFetch<FeaturedTestimonial[]>(featuredTestimonialsQuery, []),
    safeFetch<RecentBlogPost[]>(recentBlogPostsQuery, []),
  ]);

  return (
    <>
      <Hero />
      <LogoStrip />
      <ServicesOverview />
      <FeaturedWork projects={featuredCases} />
      <TestimonialsCarousel testimonials={testimonials} />
      <InsightsPreview posts={recentPosts} />
      <FinalCTA />
    </>
  );
}
