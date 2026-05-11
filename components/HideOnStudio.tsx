"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the public-site chrome (Header, Footer, CookieBanner) when the user
 * is in the Sanity Studio embed at /studio. Server Components passed as
 * children render normally on every other route.
 */
export default function HideOnStudio({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
