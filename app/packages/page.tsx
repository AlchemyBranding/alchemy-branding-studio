import { redirect, permanentRedirect } from "next/navigation";

/**
 * Packages was removed from the site — business owners coming to Alchemy
 * usually don't know what they need yet, so we route them into the
 * Services page (workshop-led) where we can diagnose first. Stage 18
 * will move this into next.config redirects.
 */
export default function PackagesPage() {
  permanentRedirect("/services");
  // unreachable, but keeps the type checker happy
  redirect("/services");
}
