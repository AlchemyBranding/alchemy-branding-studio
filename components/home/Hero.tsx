import Button from "@/components/Button";
import { ArrowDownIcon } from "@/components/icons";

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
        {/* Homepage showreel. Poster + Dawn background fill the space
            until the video loads. */}
        <source
          src="/video/alchemy-branding-showreel-2026.mp4"
          type="video/mp4"
        />
      </video>

      {/* Legibility overlay: lighter at top, darker at the bottom where the
          hero copy sits, so it reads over the busy showreel underneath. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-dawn/20 via-dawn/40 to-dawn/85"
      />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-28 md:pb-32">
        <p
          className="text-eyebrow text-dragon-fire animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Brand strategy that fuels business growth
        </p>

        <h1
          className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-[1.02] mt-4 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <span className="block text-white">Look the part.</span>
          <span className="block italic text-dusk">Win the work.</span>
        </h1>

        <p
          className="mt-8 max-w-2xl text-[1.125rem] leading-[1.6] text-white/85 animate-fade-up"
          style={{ animationDelay: "550ms" }}
        >
          We help you clarify the brand, sharpen the message and turn
          both into marketing that supports sales, so the right clients
          understand you, trust you and choose you.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "700ms" }}
        >
          <Button variant="primary" href="/free-brand-audit-for-smes">
            Get your free brand audit
          </Button>
          <Button variant="secondary" href="/portfolio">
            See our work
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
