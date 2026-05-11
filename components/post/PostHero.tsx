import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { BlogPostAuthor, BlogPostDetail } from "@/sanity/lib/queries";

type Props = Pick<
  BlogPostDetail,
  "title" | "category" | "publishedAt" | "featuredImage" | "readTimeMins"
> & {
  author: BlogPostAuthor | null;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function PostHero(props: Props) {
  const heroUrl = props.featuredImage?.asset
    ? urlFor(props.featuredImage).width(2400).auto("format").url()
    : null;

  return (
    <header className="bg-dawn">
      <div className="pt-[140px] md:pt-[180px] pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          {props.category ? (
            <span className="inline-block rounded-full bg-dragon-fire px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white">
              {props.category}
            </span>
          ) : null}

          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.1] mt-6 text-white">
            {props.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.875rem] text-white/60">
            {props.author ? (
              <span className="flex items-center gap-3">
                {props.author.photo?.asset ? (
                  <Image
                    src={urlFor(props.author.photo)
                      .width(80)
                      .height(80)
                      .auto("format")
                      .url()}
                    alt={props.author.photo.alt || props.author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-dawn-60"
                  />
                )}
                <span className="text-white">{props.author.name}</span>
              </span>
            ) : null}
            <span>{formatDate(props.publishedAt)}</span>
            {props.readTimeMins ? (
              <span>{props.readTimeMins} min read</span>
            ) : null}
          </div>
        </div>
      </div>

      {heroUrl ? (
        <div className="relative w-full aspect-video bg-dawn-80 overflow-hidden">
          <Image
            src={heroUrl}
            alt={props.featuredImage?.alt ?? props.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
    </header>
  );
}
