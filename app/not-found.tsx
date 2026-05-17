import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We couldn't find that page. Try one of the routes below, or head back to the home page.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="bg-dawn min-h-[100svh] flex items-center pt-[120px] pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="font-display text-[clamp(6rem,16vw,12rem)] leading-[0.85] text-dragon-fire">
          404
        </p>

        <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-6 text-white">
          <span className="text-white">This page took a</span>{" "}
          <span className="text-dusk italic">wrong turn.</span>
        </h1>

        <p className="mt-8 max-w-xl mx-auto text-[1.0625rem] leading-[1.7] text-white/65">
          It might have moved, or it might never have existed. Either way,
          here&apos;s the way back.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" href="/">
            Take me home
          </Button>
          <Button variant="secondary" href="/portfolio">
            See the work
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-dawn-80">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
            Or try one of these
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-[0.9375rem] font-medium text-white/70 hover:text-dragon-fire transition-colors duration-200"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
