import Button from "@/components/Button";
import { motionHref } from "@/lib/site";

type Props = {
  heading?: string;
  subtext?: string;
  /** Override the secondary CTA. Pass null to hide it. */
  secondary?: { label: string; href: string } | null;
};

const defaults = {
  heading: "Ready to build something worth talking about?",
  subtext:
    "Book a discovery call, or grab a free brand audit. We'll show you exactly where the leaks are.",
  secondary: { label: "Get a free audit", href: "/free-brand-audit-for-smes" },
} as const;

export default function FinalCTA({
  heading = defaults.heading,
  subtext = defaults.subtext,
  secondary = defaults.secondary,
}: Props = {}) {
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
          {heading}
        </h2>
        <p className="mt-6 max-w-md mx-auto text-dawn text-[1rem] leading-[1.6]">
          {subtext}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary-on-fire" href={motionHref} external>
            Book a call
          </Button>
          {secondary ? (
            <Button variant="secondary-on-fire" href={secondary.href}>
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
