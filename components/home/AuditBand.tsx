import Button from "@/components/Button";

/**
 * Lead-magnet band selling the free brand audit. Distinct tint
 * (dusk → deeper dawn) from surrounding sections to read as its
 * own moment on the page, not a footer-style afterthought.
 */
export default function AuditBand() {
  return (
    <section
      aria-labelledby="audit-band-heading"
      className="bg-dusk text-dawn py-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              The brand audit
            </p>
            <h2
              id="audit-band-heading"
              className="font-display text-h2 mt-4 text-dawn"
            >
              A straight read on your brand,{" "}
              <span className="italic">before you spend anything.</span>
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] leading-[1.75] text-dawn/80">
              Most free audits are a quote with a few questions
              attached. Ours is a genuine review. We look at your brand
              the way a buyer would. Does your website tell a clear
              story in five seconds? Do your socials build trust or
              quietly chip away at it? You get an honest read on what
              is working, what is costing you, and what to fix first.
              No jargon, no pressure. Sometimes the honest answer is
              that you do not need us yet.
            </p>
            <div className="mt-10">
              <Button variant="primary" href="/free-brand-audit-for-smes">
                Get your free brand audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
