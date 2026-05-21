"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 (or `from`) to `to` over `durationMs` when scrolled into
 * view. Easing matches the rest of the site's reveal motion. Optional
 * prefix/suffix for units like "+", "%", "x", "$".
 *
 * Good for case study outcome stats: "+47%", "3 days", "12x faster".
 */
type Props = {
  to: number;
  from?: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Decimal places to render. Defaults to 0. */
  decimals?: number;
};

export default function Counter({
  to,
  from = 0,
  durationMs = 1400,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frameId: number | null = null;
    let startedAt: number | null = null;

    const ease = (t: number) => 1 - Math.pow(1 - t, 4); // ease-out quart

    const step = (now: number) => {
      if (startedAt === null) startedAt = now;
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = ease(progress);
      setValue(from + (to - from) * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frameId = requestAnimationFrame(step);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);

    return () => {
      obs.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [to, from, durationMs]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
