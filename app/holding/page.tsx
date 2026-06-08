import type { Metadata } from "next";

import Holding from "@/components/holding/Holding";

export const metadata: Metadata = {
  title: "Alchemy Branding Studio — launching soon",
  description:
    "A new home for Alchemy Branding Studio is on the way. Brand strategy that fuels business growth.",
  robots: { index: false, follow: false },
};

// Variant A — showreel background (kept as the preferred option until launch).
export default function HoldingPage() {
  return (
    <Holding
      background={
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
          <source
            src="/video/alchemy-branding-showreel-2026.mp4"
            type="video/mp4"
          />
        </video>
      }
    />
  );
}
