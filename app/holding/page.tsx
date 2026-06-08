import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  VimeoIcon,
  YouTubeIcon,
} from "@/components/icons";
import { motionHref, siteConfig, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alchemy Branding Studio — launching soon",
  description:
    "A new home for Alchemy Branding Studio is on the way. Brand strategy, design and animation for ambitious businesses.",
  robots: { index: false, follow: false },
};

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  vimeo: VimeoIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
} as const;

export default function HoldingPage() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-dawn">
      {/* Showreel background, same asset as the homepage hero */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        role="presentation"
        poster="/og-default.png"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/alchemy-branding-showreel-2026.mp4" type="video/mp4" />
      </video>

      {/* Heavy scrim so the type leads and the reel reads as texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-dawn/80 via-dawn/82 to-dawn/92"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Top: logo */}
        <header className="px-6 pt-8 md:px-10 md:pt-10">
          <Image
            src="/alchemy-logo-white.svg"
            alt="Alchemy Branding Studio"
            width={150}
            height={38}
            priority
            className="h-9 w-auto"
          />
        </header>

        {/* Centre: the message */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <p className="text-eyebrow text-dragon-fire">Launching soon</p>

            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] leading-[1.02] text-white">
              <span className="block">The new Alchemy</span>
              <span className="block italic text-dusk">is almost here.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/80">
              We&apos;re putting the finishing touches to a new website: brand
              strategy, design and animation for ambitious businesses, in one
              clear place. It goes live shortly.
            </p>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/60">
              In the meantime, book a call or drop us a line. We&apos;d genuinely
              like to hear what you&apos;re working on.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" href={motionHref} external>
                Book a call
              </Button>
              <Button variant="secondary" href={`mailto:${siteConfig.email}`}>
                Email us
              </Button>
            </div>

            <p className="mt-8 text-[0.9rem] text-white/50">
              Or listen to our podcast,{" "}
              <a
                href="https://www.brandtoscale.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dragon-fire underline underline-offset-4 hover:text-white transition-colors duration-200"
              >
                Brand to Scale
              </a>
              .
            </p>
          </div>
        </div>

        {/* Bottom: contact + socials */}
        <footer className="px-6 pb-8 md:px-10 md:pb-10">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.85rem] text-white/45">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-dragon-fire transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
            </p>
            <ul className="flex items-center gap-4" aria-label="Social media">
              {socialLinks.map(({ label, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-block text-white/50 transition-colors duration-200 hover:text-dragon-fire"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
