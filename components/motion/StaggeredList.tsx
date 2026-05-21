"use client";

import type { ReactNode } from "react";
import { Children, useEffect, useRef, useState } from "react";

/**
 * Reveals each direct child in sequence when the container enters the
 * viewport. Each child shifts up + fades in 80ms after the previous one.
 * Useful for principles, capabilities, deliverables lists, etc.
 */
type Props = {
  children: ReactNode;
  /** Delay between each item, in ms. Defaults to 80. */
  stepMs?: number;
  className?: string;
  itemClassName?: string;
};

export default function StaggeredList({
  children,
  stepMs = 80,
  className = "",
  itemClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const items = Children.toArray(children);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{ transitionDelay: shown ? `${i * stepMs}ms` : "0ms" }}
          className={`transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${itemClassName}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
