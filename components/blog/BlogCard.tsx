import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { RecentBlogPost } from "@/sanity/lib/queries";

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

export default function BlogCard({ post }: { post: RecentBlogPost }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group block h-full rounded-card bg-dawn-80 border border-dawn-60 overflow-hidden transition-colors duration-200 hover:border-dragon-fire/60"
    >
      <div className="relative aspect-video overflow-hidden bg-dawn">
        {post.featuredImage?.asset ? (
          <Image
            src={urlFor(post.featuredImage).width(800).auto("format").url()}
            alt={post.featuredImage.alt || post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
  );
}
