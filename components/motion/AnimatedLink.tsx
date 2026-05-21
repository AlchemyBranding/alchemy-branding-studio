"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline link with an underline that draws in from left to right on
 * hover. Subtle, premium-feeling alternative to the current always-on
 * underline. Best for inline editorial links inside body copy.
 *
 * Same colour token (dragon-fire) as the existing PortableText link
 * style so it slots into the blog/case study writing without a
 * visual seam.
 */
type Props = {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
};

export default function AnimatedLink({
  href,
  external = false,
  children,
  className = "",
}: Props) {
  const inner = (
    <span className={`relative inline text-dragon-fire ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="absolute left-0 -bottom-[2px] h-[1.5px] w-full origin-left scale-x-0 bg-dragon-fire transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="group inline">
      {inner}
    </Link>
  );
}
