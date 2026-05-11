import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { urlFor } from "@/sanity/lib/image";

type ImageBlock = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

type VideoEmbedBlock = {
  source?: "file" | "youtube" | "vimeo";
  file?: { asset?: { _ref?: string; url?: string } };
  url?: string;
  caption?: string;
};

type LinkMark = {
  href?: string;
  openInNewTab?: boolean;
};

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

function vimeoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("vimeo.com")) return null;
    const id = u.pathname.split("/").filter(Boolean)[0];
    return /^\d+$/.test(id ?? "") ? id! : null;
  } catch {
    return null;
  }
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      if (!value?.asset) return null;
      const src = urlFor(value as Parameters<typeof urlFor>[0])
        .width(1600)
        .auto("format")
        .url();
      return (
        <figure className="my-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-dawn-80">
            <Image
              src={src}
              alt={value.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-3 text-[0.875rem] text-white/55">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    videoEmbed: ({ value }: { value: VideoEmbedBlock }) => {
      const caption = value?.caption;
      let media: ReactNode = null;

      if (value?.source === "file" && value.file?.asset?.url) {
        media = (
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video bg-black rounded-card"
          >
            <source src={value.file.asset.url} />
          </video>
        );
      } else if (value?.source === "youtube" && value.url) {
        const id = youtubeId(value.url);
        if (id) {
          media = (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={caption ?? "YouTube video"}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video rounded-card border-0"
            />
          );
        }
      } else if (value?.source === "vimeo" && value.url) {
        const id = vimeoId(value.url);
        if (id) {
          media = (
            <iframe
              src={`https://player.vimeo.com/video/${id}`}
              title={caption ?? "Vimeo video"}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video rounded-card border-0"
            />
          );
        }
      }

      if (!media) return null;

      return (
        <figure className="my-12">
          {media}
          {caption ? (
            <figcaption className="mt-3 text-[0.875rem] text-white/55">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }: { value?: LinkMark; children: ReactNode }) => {
      const href = value?.href ?? "#";
      const external =
        value?.openInNewTab || /^https?:\/\//.test(href);
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dragon-fire underline underline-offset-4 hover:no-underline"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-dragon-fire underline underline-offset-4 hover:no-underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-[1.0625rem] leading-[1.75] text-white/80 my-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-h3 text-white mt-16 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-[1.25rem] text-white mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold text-[1.0625rem] text-white mt-8 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-dragon-fire pl-6 font-display italic text-[1.375rem] leading-[1.5] text-white">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 list-disc pl-6 text-[1.0625rem] leading-[1.7] text-white/80 marker:text-dragon-fire">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 space-y-2 list-decimal pl-6 text-[1.0625rem] leading-[1.7] text-white/80 marker:text-dragon-fire">
        {children}
      </ol>
    ),
  },
};

export default function PortableTextContent({ value }: { value: unknown[] }) {
  return <PortableText value={value as Parameters<typeof PortableText>[0]["value"]} components={components} />;
}
