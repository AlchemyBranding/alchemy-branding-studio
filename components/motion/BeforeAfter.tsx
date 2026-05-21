"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Hover-swap for before/after imagery. Default frame is the "after"
 * (the polished outcome). On hover, the "before" fades in over the
 * top. A subtle "Before" badge appears so the visitor understands
 * what they're seeing.
 *
 * Best for rebrand case studies (old identity → new identity), site
 * redesigns, and any project where the before/after contrast is the
 * story.
 */
type Props = {
  afterSrc: string;
  beforeSrc: string;
  afterAlt: string;
  beforeAlt: string;
  /** Tailwind classes for the wrapper aspect ratio + rounding. */
  className?: string;
};

export default function BeforeAfter({
  afterSrc,
  beforeSrc,
  afterAlt,
  beforeAlt,
  className = "aspect-[4/3] rounded-card overflow-hidden",
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-dawn-80 ${className}`}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-4 left-4 rounded-full bg-dawn/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Before
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-4 left-4 rounded-full bg-dragon-fire px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dawn transition-opacity duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      >
        After
      </span>
    </div>
  );
}
