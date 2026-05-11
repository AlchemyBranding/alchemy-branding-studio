import type { Metadata } from "next";

import FinalCTA from "@/components/home/FinalCTA";
import Capabilities from "@/components/services/Capabilities";
import PainSignals from "@/components/services/PainSignals";
import WhoWeWorkWith from "@/components/services/WhoWeWorkWith";
import Workshop from "@/components/services/Workshop";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "services",
    path: "/services",
    defaults: {
      title: "Services",
      description:
        "Where to start when the brand isn't pulling its weight. Brand Strategy Workshop for ambitious £500k–£15M businesses, then identity, web, animation and content to follow.",
    },
  });
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Services
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Something&apos;s off.</span>{" "}
            <span className="text-dusk italic">You can&apos;t name it.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            You&apos;ve grown past the brand you started with. The site, the
            deck, the social, the proposals — none of it feels quite right,
            and you can&apos;t see where the gap is. That&apos;s where we
            come in. Strategy first, craft second, scale third.
          </p>
        </div>
      </section>

      <PainSignals />
      <Workshop />
      <Capabilities />
      <WhoWeWorkWith />

      <FinalCTA
        heading="Ready to find out where the gap is?"
        subtext="Book a 30-minute discovery call. We'll talk through where you're at, what's not working, and whether the workshop's right for you."
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
