import Button from "@/components/Button";
import { ArrowDownIcon } from "@/components/icons";
import { motionHref } from "@/lib/site";

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-dawn"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        role="presentation"
        className="absolute inset-0 h-full w-full object-cover"
        poster="/og-default.png"
      >
        {/* Drop hero-showreel.webm + .mp4 into /public/video/ when ready.
            Until then, the poster + Dawn background fill the space cleanly. */}
        <source src="/video/hero-showreel.webm" type="video/webm" />
        <source src="/video/hero-showreel.mp4" type="video/mp4" />
      </video>

      {/* Legibility overlay: lighter at top, darker at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-dawn/30 to-dawn/70"
      />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center">
        <p
          className="text-eyebrow text-dragon-fire animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Brand Strategy · Design · Animation
        </p>

        <h1
          className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-[1.02] mt-4 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <span className="block text-white">Work that</span>
          <span className="block italic text-dusk">builds brands.</span>
        </h1>

        <div
          className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <Button variant="primary" href="#featured-work">
            See our work
          </Button>
          <Button variant="secondary" href={motionHref} external>
            Book a call
          </Button>
        </div>
      </div>

      <a
        href="#featured-work"
        aria-label="Scroll to featured work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-dragon-fire transition-colors duration-200"
      >
        <span className="text-[0.75rem] uppercase tracking-[0.12em]">
          Scroll
        </span>
        <ArrowDownIcon className="w-4 h-4 animate-bounce-down" />
      </a>
    </section>
  );
}
