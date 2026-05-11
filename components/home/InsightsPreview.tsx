import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { RecentBlogPost } from "@/sanity/lib/queries";

const placeholderPosts: RecentBlogPost[] = [
  {
    _id: "placeholder-a",
    title: "Add insights in Sanity to fill this grid",
    slug: "#",
    category: "Insights",
    publishedAt: new Date().toISOString(),
    excerpt:
      "The three most recent posts (by publishedAt) appear here automatically once content is added.",
    featuredImage: null,
  },
  {
    _id: "placeholder-b",
    title: "Posts live at /[slug]/ — not /blog/[slug]/",
    slug: "#",
    category: "AI",
    publishedAt: new Date().toISOString(),
    excerpt:
      "Existing /blog/ URLs 301 to /news/ for the index and /[slug]/ for individual posts.",
    featuredImage: null,
  },
  {
    _id: "placeholder-c",
    title: "Use the category field to surface topical badges",
    slug: "#",
    category: "Projects",
    publishedAt: new Date().toISOString(),
    excerpt:
      "Categories: Insights, AI, Awards, Founders, Projects, Team — pick one per post.",
    featuredImage: null,
  },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function InsightsPreview({ posts }: { posts: RecentBlogPost[] }) {
  const items = posts.length > 0 ? posts : placeholderPosts;

  return (
    <section
      aria-labelledby="insights-heading"
      className="bg-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Insights
        </p>
        <h2
          id="insights-heading"
          className="font-display text-h2 mt-3 max-w-3xl text-white"
        >
          Thinking, perspective and practical advice.
        </h2>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((post) => (
            <li key={post._id}>
              <Link
                href={`/${post.slug}`}
                className="group block rounded-card bg-dawn-80 border border-dawn-60 overflow-hidden transition-colors duration-200 hover:border-dragon-fire/60"
              >
                <div className="relative aspect-video overflow-hidden bg-dawn">
                  {post.featuredImage?.asset ? (
                    <Image
                      src={urlFor(post.featuredImage)
                        .width(800)
                        .auto("format")
                        .url()}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-dawn-60 via-dawn-80 to-dawn" />
                  )}
                </div>

                <div className="p-6">
                  {post.category ? (
                    <span className="inline-block rounded-full bg-dragon-fire px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-white">
                      {post.category}
                    </span>
                  ) : null}
                  <h3 className="mt-3 text-white font-bold text-[1.125rem] leading-[1.3] transition-colors duration-200 group-hover:text-dragon-fire">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-2 text-[0.9rem] leading-[1.6] text-white/55 line-clamp-2">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[0.8rem] font-medium text-white/35">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center text-[1rem] font-medium text-dragon-fire hover:underline underline-offset-4"
          >
            Read all insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
