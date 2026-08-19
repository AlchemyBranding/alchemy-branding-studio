"use client";

import type { ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Reveals each direct child in sequence when the container enters the
 * viewport. Each child shifts up + fades in 80ms after the previous one.
 * Useful for principles, capabilities, deliverables lists, etc.
 *
 * By default it wraps each child in a div. Pass `as="ul"` or `as="ol"` and the
 * children are cloned instead of wrapped, so <li> stays a direct child of the
 * list. Wrapping list items in divs would produce invalid markup and drop the
 * list semantics that screen readers announce.
 */
type Props = {
  children: ReactNode;
  /** Delay between each item, in ms. Defaults to 80. */
  stepMs?: number;
  className?: string;
  itemClassName?: string;
  /** Container element. "ul" and "ol" clone their children rather than wrap. */
  as?: "div" | "ul" | "ol";
};

export default function StaggeredList({
  children,
  stepMs = 80,
  className = "",
  itemClassName = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const items = Children.toArray(children);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Show immediately rather than transitioning. A near-zero transition would
    // still leave every item at opacity 0 until the observer fires.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
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

  const motionClass = (extra: string) =>
    `transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    } ${extra}`;
  const delayFor = (i: number) => ({
    transitionDelay: shown ? `${i * stepMs}ms` : "0ms",
  });

  if (as === "ul" || as === "ol") {
    const List = as;
    return (
      <List ref={ref as React.Ref<HTMLUListElement & HTMLOListElement>} className={className}>
        {items.map((child, i) => {
          if (!isValidElement(child)) return child;
          const el = child as ReactElement<{
            className?: string;
            style?: React.CSSProperties;
          }>;
          return cloneElement(el, {
            key: i,
            className: motionClass(el.props.className ?? ""),
            style: { ...(el.props.style ?? {}), ...delayFor(i) },
          });
        })}
      </List>
    );
  }

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div key={i} style={delayFor(i)} className={motionClass(itemClassName)}>
          {child}
        </div>
      ))}
    </div>
  );
}
