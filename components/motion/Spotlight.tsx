"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

/**
 * Cursor-tracked radial glow that follows the mouse across the block.
 * Subtle — uses dragon-fire colour at low opacity, fades in on hover,
 * out on leave. Best on hero blocks, CTA sections, or featured
 * project tiles where a hint of interactivity sells the depth.
 *
 * No JS for the glow itself — CSS radial-gradient with the cursor
 * coordinates piped through CSS variables. React only tracks the
 * mouse position.
 */
type Props = {
  children: ReactNode;
  className?: string;
};

export default function Spotlight({ children, className = "" }: Props) {
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
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(255, 110, 73, 0.18), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
