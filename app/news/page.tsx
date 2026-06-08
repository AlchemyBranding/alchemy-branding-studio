import type { Metadata } from "next";

import BlogGrid from "@/components/blog/BlogGrid";
import FinalCTA from "@/components/home/FinalCTA";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import { allBlogPostsQuery, type RecentBlogPost } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "news",
    path: "/news",
    defaults: {
      title: "Brand & Marketing Insights for SMEs",
      description:
        "Practical articles on brand strategy, messaging and marketing for SME founders and leaders. No jargon, just what actually helps the business grow.",
    },
  });
}

export default async function NewsPage() {
  const posts = await safeFetch<RecentBlogPost[]>(allBlogPostsQuery, []);

  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Insights
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Thinking,</span>{" "}
            <span className="text-dusk italic">in writing.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            Notes from inside the studio: strategy, positioning, brand
            systems, motion, and the everyday craft of making businesses
            sound like themselves.
          </p>
        </div>
      </section>

      <section className="bg-dawn pb-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <BlogGrid posts={posts} />
        </div>
      </section>

      <FinalCTA
        heading="Ready to apply this to your brand?"
        subtext="Book a discovery call. We'll talk through where you're at, what's not working, and whether the workshop's right for you."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
