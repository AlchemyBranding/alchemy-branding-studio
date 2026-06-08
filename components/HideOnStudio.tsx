"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the public-site chrome (Header, Footer, CookieBanner) on routes that
 * are meant to stand alone: the Sanity Studio embed at /studio and the
 * full-screen holding page at /holding. Server Components passed as children
 * render normally on every other route.
 */
const CHROMELESS_PREFIXES = ["/studio", "/holding"];

export default function HideOnStudio({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname && CHROMELESS_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }
  return <>{children}</>;
}
