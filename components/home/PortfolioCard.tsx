"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import type { FeaturedCaseStudy } from "@/sanity/lib/queries";

type Props = {
  project: FeaturedCaseStudy;
  variant?: "large" | "small";
};

export default function PortfolioCard({ project, variant = "small" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Track when the video element has buffered enough to play. Without this
  // gate, hovering an unbuffered video fades the <video> in over the image
  // before any frames are decoded — visitors see a black rectangle until
  // playback actually starts. Especially painful for oversized files.
  const [canPlay, setCanPlay] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {
      /* autoplay blocked — fine, image stays */
    });
  };

  const onLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  const primaryTag = project.serviceTags?.[0] ?? null;
  const hasImage = !!project.heroImage?.asset;
  const imageUrl = hasImage
    ? urlFor(project.heroImage!)
        .width(variant === "large" ? 1200 : 900)
        .auto("format")
        .url()
    : null;
  const aspect =
    variant === "large"
      ? "aspect-[4/5] lg:aspect-auto lg:h-full"
      : "aspect-video";

  return (
    <Link
      href={`/project/${project.slug}`}
      className={`group relative block overflow-hidden rounded-card bg-dawn-80 ${aspect}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.heroImage?.alt ?? project.title}
          fill
          sizes={
            variant === "large"
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <PlaceholderArtwork title={project.title} />
      )}

      {project.heroVideoUrl ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setCanPlay(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            hovered && canPlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={project.heroVideoUrl} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-dawn/90 via-dawn/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <div className="flex items-center gap-3 flex-wrap">
          {primaryTag ? (
            <span className="inline-block rounded-full bg-dragon-fire px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-white">
              {primaryTag}
            </span>
          ) : null}
          {project.clientName ? (
            <span className="text-[0.75rem] text-white/70">
              {project.clientName}
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-white font-bold text-[1.125rem] leading-tight">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

function PlaceholderArtwork({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-br from-dawn-60 via-dawn-80 to-dawn">
      <span className="text-white/40 text-[0.75rem] uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}
