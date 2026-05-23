import Button from "@/components/Button";
import { motionHref } from "@/lib/site";

type Cta = { label: string; href: string; external?: boolean };

type Props = {
  heading?: string;
  subtext?: string;
  /** Override the primary CTA. */
  primary?: Cta;
  /** Override the secondary CTA. Pass null to hide it. */
  secondary?: Cta | null;
};

const defaults = {
  heading: "Not sure where your brand stands? Find out for free.",
  subtext:
    "An honest review of how your brand shows up, the way a buyer sees it. Clear next steps, no sales pitch.",
  primary: {
    label: "Get your free brand audit",
    href: "/free-brand-audit-for-smes",
  },
  secondary: { label: "Book a call", href: motionHref, external: true },
} as const;

export default function FinalCTA({
  heading = defaults.heading,
  subtext = defaults.subtext,
  primary = defaults.primary,
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
          <Button
            variant="primary-on-fire"
            href={primary.href}
            external={primary.external}
          >
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              variant="secondary-on-fire"
              href={secondary.href}
              external={secondary.external}
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
