"use client";

import { useMemo, useState } from "react";

import BlogCard from "@/components/blog/BlogCard";
import type { RecentBlogPost } from "@/sanity/lib/queries";

const ALL_TAG = "All";

const categoryOrder = [
  "Insights",
  "AI",
  "Awards",
  "Founders",
  "Projects",
  "Team",
] as const;

export default function BlogGrid({ posts }: { posts: RecentBlogPost[] }) {
  const [active, setActive] = useState<string>(ALL_TAG);

  const categories = useMemo(() => {
    const present = new Set<string>();
    for (const post of posts) {
      if (post.category) present.add(post.category);
    }
    const ordered = categoryOrder.filter((c) => present.has(c));
    const extras = [...present].filter(
      (c) => !categoryOrder.includes(c as typeof categoryOrder[number]),
    );
    return [ALL_TAG, ...ordered, ...extras];
  }, [posts]);

  const filtered = useMemo(() => {
    if (active === ALL_TAG) return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  if (posts.length === 0) {
    return (
      <div className="rounded-card border border-dawn-60 bg-dawn-80 p-12 text-center">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Coming soon
        </p>
        <h2 className="font-display text-h3 text-white mt-3">
          Posts will appear here once they&apos;re published.
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto">
          Add a Blog Post in Sanity Studio (Studio → Blog post), set a slug,
          category and published date, and it&apos;ll show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 1 ? (
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? "bg-dragon-fire text-dawn"
                    : "bg-dawn-80 text-white/60 hover:bg-dawn-60 hover:text-white border border-dawn-60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dawn-60 bg-dawn-80 p-12 text-center">
          <p className="text-white/60">No posts in {active} yet.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <li key={post._id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
