import Button from "@/components/Button";
import { motionHref } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-dragon-fire py-[120px]"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <h2
          id="final-cta-heading"
          className="font-display text-h2 text-dawn"
        >
          Ready to build something worth talking about?
        </h2>
        <p className="mt-6 max-w-md mx-auto text-dawn text-[1rem] leading-[1.6]">
          Book a discovery call, or grab a free brand audit — we&apos;ll show
          you exactly where the leaks are.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary-on-fire" href={motionHref} external>
            Book a call
          </Button>
          <Button
            variant="secondary-on-fire"
            href="/free-brand-audit-for-smes"
          >
            Get a free audit
          </Button>
        </div>
      </div>
    </section>
  );
}
