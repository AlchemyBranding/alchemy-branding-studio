"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

/**
 * A button that drifts a few pixels toward the cursor on hover. Subtle
 * — strength capped at ~8px of travel. Best reserved for one or two
 * primary CTAs per page (booking call, send a brief). Overusing the
 * effect makes the page feel restless.
 */
type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  /** Max pixels of drift toward the cursor. Default 8. */
  strength?: number;
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  external = false,
  strength = 8,
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setOffset({ x: dx * strength, y: dy * strength });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  const baseClass =
    "inline-flex items-center justify-center font-bold uppercase tracking-[0.08em] " +
    "rounded-full px-7 py-3.5 text-[0.875rem] bg-dragon-fire text-dawn " +
    "transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "hover:bg-fire-80";

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  };

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={`${baseClass} ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </Link>
  );
}
