import type { Metadata } from "next";

import GroupBlock from "@/components/about/GroupBlock";
import Principles from "@/components/about/Principles";
import StoryBlock from "@/components/about/StoryBlock";
import TeamGrid from "@/components/about/TeamGrid";
import FinalCTA from "@/components/home/FinalCTA";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";
import { safeFetch } from "@/sanity/lib/fetch";
import { teamMembersQuery, type TeamMember } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "about",
    path: "/about",
    defaults: {
      title: "About",
      description:
        "Alchemy Branding Studio: strategy, design and animation for ambitious businesses. Meet the team and learn how we work.",
    },
  });
}

export default async function AboutPage() {
  const team = await safeFetch<TeamMember[]>(teamMembersQuery, []);

  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            About
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Strategy and craft,</span>{" "}
            <span className="text-dusk italic">in equal measure.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            Alchemy is a creative studio for ambitious businesses. We help
            founders, marketing leaders and operators ship brands that hold
            up across the deck, the site, the campaign, the proposal.
          </p>
        </div>
      </section>

      <StoryBlock />
      <Principles />
      <TeamGrid team={team} />
      <GroupBlock />

      <FinalCTA
        heading="Like the look of how we work?"
        subtext="Tell us about the project, or book 30 minutes with us. Whichever's easier."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a message", href: "/contact" }}
      />
    </>
  );
}
