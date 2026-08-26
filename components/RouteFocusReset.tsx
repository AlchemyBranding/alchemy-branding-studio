"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Moves focus to <main> after a client-side route change.
 *
 * Next's App Router calls .focus() on the first element of the incoming page,
 * but that element is a plain <section> with no tabindex, so the call does
 * nothing and focus stays where it was: on the footer link that was just
 * clicked. The new page then behaves as if the footer were still the current
 * position. Tabbing resumes from the footer instead of the top, and anything
 * that restores focus to the previously active element drags the page back
 * down to it — which is what the newsletter pop-up was doing on close.
 *
 * Only fires when focus is sitting outside <main> (i.e. in the header or
 * footer chrome, which survives the navigation). Focus already inside the page
 * belongs to the page and is left alone.
 *
 * preventScroll matters: without it this would fight the router's own
 * scroll-to-top and re-introduce the jump it exists to stop.
 */
export default function RouteFocusReset() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // A full page load already starts at the top with focus on <body>, and
    // stealing focus here would break arriving at a #hash from the URL bar.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const main = document.querySelector<HTMLElement>("main");
    const active = document.activeElement as HTMLElement | null;
    if (!main || !active || active === document.body) return;
    if (main.contains(active)) return;

    main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
