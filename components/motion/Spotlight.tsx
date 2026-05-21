"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

/**
 * Cursor-tracked radial glow that follows the mouse across the block.
 * Subtle — defaults to dragon-fire colour at low opacity on dark
 * surfaces. Pass `color` for placement on a light or already-orange
 * background (e.g. the on-fire CTA section uses a soft white glow).
 *
 * No JS for the glow itself — CSS radial-gradient with the cursor
 * coordinates piped through inline styles. React only tracks the
 * mouse position.
 */
type Props = {
  children: ReactNode;
  className?: string;
  /** rgba/colour for the glow. Default: dragon-fire at 0.18. */
  color?: string;
  /** Radius of the glow in pixels. Default 420. */
  size?: number;
};

export default function Spotlight({
  children,
  className = "",
  color = "rgba(255, 110, 73, 0.18)",
  size = 420,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-[600ms] ease-out"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
