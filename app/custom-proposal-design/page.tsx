import type { Metadata } from "next";

import Button from "@/components/Button";
import FinalCTA from "@/components/home/FinalCTA";
import Included from "@/components/proposal/Included";
import Platforms from "@/components/proposal/Platforms";
import Process from "@/components/proposal/Process";
import { getPageMetadata } from "@/lib/seo";
import { motionHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "custom-proposal-design",
    path: "/custom-proposal-design",
    defaults: {
      title: "Custom Proposal Design",
      description:
        "On-brand proposal templates built inside Better Proposals, Proposify, Qwilr or your platform of choice. A complete proposal system in four weeks, designed to win.",
    },
  });
}

export default function CustomProposalDesignPage() {
  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-end">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Proposal design
            </p>
            <h1 className="font-display text-display mt-4 max-w-3xl leading-[1.04]">
              <span className="text-white">Proposals that</span>{" "}
              <span className="text-dusk italic">close.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[1.125rem] leading-[1.7] text-white/65">
              When the brand on your proposal doesn&apos;t match the
              business you&apos;re selling, you lose to whoever&apos;s
              sharper on the page. We design proposal templates inside
              Better Proposals, Proposify, Qwilr, or whatever your team
              already runs, so every send looks like the business you
              want to win against.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" href={motionHref} external>
                Book a discovery call
              </Button>
              <Button variant="secondary" href="/contact">
                Send a brief
              </Button>
            </div>
          </div>
          <aside className="rounded-card bg-dawn-80 border border-dawn-60 p-7 max-w-md justify-self-start lg:justify-self-end">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
              Engagement
            </p>
            <dl className="mt-4 space-y-3 text-[0.9375rem] text-white/80">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/55">Timeline</dt>
                <dd>4 weeks</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/55">Investment</dt>
                <dd>From £3,500</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/55">Platforms</dt>
                <dd className="text-right">Better Proposals · Proposify · Qwilr</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/55">Post-launch</dt>
                <dd>30 days of support</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <Platforms />
      <Included />
      <Process />

      <FinalCTA
        heading="Got a proposal that needs to land?"
        subtext="Book a discovery call. We'll talk through your sales flow, the platform you're using, and what'd make the biggest difference."
        primary={{ label: "Book a call", href: motionHref, external: true }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </>
  );
}
