import Link from "next/link";

import { motionHref, siteConfig, whatsappHref } from "@/lib/site";

type Card = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string; external?: boolean };
};

const cards: Card[] = [
  {
    eyebrow: "Book a call",
    title: "30-minute discovery call",
    description:
      "Best for clarifying scope, timing, and whether we're a fit. Pick a slot that suits you.",
    cta: { label: "Open my diary →", href: motionHref, external: true },
  },
  {
    eyebrow: "WhatsApp",
    title: "Fast async questions",
    description: "Tap to message us. We're usually back within the hour during UK working time.",
    cta: { label: "Message us →", href: whatsappHref, external: true },
  },
  {
    eyebrow: "Email",
    title: "For everything else",
    description: siteConfig.email,
    cta: { label: "Email us →", href: `mailto:${siteConfig.email}` },
  },
];

export default function ContactSidebar() {
  return (
    <aside aria-label="Other ways to reach us" className="space-y-6">
      {cards.map((card) => {
        const isExternal = card.cta.external;
        const ctaClassName =
          "mt-5 inline-flex items-center text-[0.875rem] font-medium text-dragon-fire hover:underline underline-offset-4";

        return (
          <div
            key={card.title}
            className="rounded-card bg-dawn-80 border border-dawn-60 p-7"
          >
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
              {card.eyebrow}
            </p>
            <h3 className="mt-3 font-bold text-[1.125rem] text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-[0.9rem] leading-[1.6] text-white/65 break-words">
              {card.description}
            </p>
            {isExternal ? (
              <a
                href={card.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClassName}
              >
                {card.cta.label}
              </a>
            ) : (
              <Link href={card.cta.href} className={ctaClassName}>
                {card.cta.label}
              </Link>
            )}
          </div>
        );
      })}
    </aside>
  );
}
