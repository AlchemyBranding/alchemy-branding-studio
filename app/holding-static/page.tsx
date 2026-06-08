import type { Metadata } from "next";
import Image from "next/image";

import Holding from "@/components/holding/Holding";

export const metadata: Metadata = {
  title: "Alchemy Branding Studio — launching soon",
  description:
    "A new home for Alchemy Branding Studio is on the way. Brand strategy that fuels business growth.",
  robots: { index: false, follow: false },
};

// Variant B — static image background (alternative to the showreel for review).
export default function HoldingStaticPage() {
  return (
    <Holding
      background={
        <Image
          src="/desk-chairs.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      }
    />
  );
}
