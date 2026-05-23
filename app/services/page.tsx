import type { Metadata } from "next";

import FinalCTA from "@/components/home/FinalCTA";
import Capabilities from "@/components/services/Capabilities";
import PainSignals from "@/components/services/PainSignals";
import WhoWeWorkWith from "@/components/services/WhoWeWorkWith";
import Workshop from "@/components/services/Workshop";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "services",
    path: "/services",
    defaults: {
      title: "Services",
      description:
        "When the marketing isn't landing and you can't say why. The Brand Strategy Workshop names what's actually broken: positioning, messaging, language. For ambitious £500k–£15M businesses. Identity, web, animation and content follow.",
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
            The site&apos;s live. The campaigns are running. The deck looks
            fine. And the leads still aren&apos;t landing. Engagement&apos;s
            flat, sales calls drag, and you can&apos;t put your finger on
            why. Nine times out of ten it isn&apos;t a visual problem.
            It&apos;s positioning, messaging and language. That&apos;s
            where we start.
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
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
