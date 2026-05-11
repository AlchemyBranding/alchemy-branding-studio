import BlogCard from "@/components/blog/BlogCard";
import type { RecentBlogPost } from "@/sanity/lib/queries";

export default function RelatedPosts({
  posts,
}: {
  posts: RecentBlogPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Keep reading
        </p>
        <h2
          id="related-posts-heading"
          className="font-display text-h2 mt-3 text-white"
        >
          Related insights.
        </h2>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <li key={post._id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
