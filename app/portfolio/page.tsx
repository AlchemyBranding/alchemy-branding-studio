import type { Metadata } from "next";

import FinalCTA from "@/components/home/FinalCTA";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import { allCaseStudiesQuery, type FeaturedCaseStudy } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "portfolio",
    path: "/portfolio",
    defaults: {
      title: "Branding & Design Work: Case Studies",
      description:
        "Selected branding, web and animation projects for ambitious SMEs. See how clearer strategy and sharper design turned into real business results.",
    },
  });
}

export default async function PortfolioPage() {
  const projects = await safeFetch<FeaturedCaseStudy[]>(allCaseStudiesQuery, []);

  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Our work
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Brands we&apos;ve shaped,</span>{" "}
            <span className="text-dusk italic">scaled, and launched.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            A selection of work across branding, strategy, websites and
            animation, for founders, marketers and operators in
            growing businesses.
          </p>
        </div>
      </section>

      <section className="bg-dawn pb-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <PortfolioGrid projects={projects} />
        </div>
      </section>

      <FinalCTA
        heading="See something that looks like the kind of work you need?"
        subtext="Book a discovery call. We'll talk through where you're at and whether the workshop's right for you."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
