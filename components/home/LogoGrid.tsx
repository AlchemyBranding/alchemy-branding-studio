import Link from "next/link";

const dir = "/trusted-logos";

type ClientLogo = {
  /** Client name, used as the accessible label and hover-panel title. */
  name: string;
  /** Filename in /public/trusted-logos. Transparent PNG or SVG. */
  file: string;
  /** Case study slug. Logo links to /project/{slug}. */
  slug: string;
  /** One-line outcome shown in the hover panel (from the case study's outcomeSummary). */
  outcome: string;
  /** Bumps the rendered size for marks that sit small in their canvas. */
  emphasis?: "lg" | "xl";
  /** Logo supplied as a light/white mark; invert it so it reads on the white card. */
  invert?: boolean;
};

/**
 * Phase 4: linked logo grid replacing the LogoStrip marquee.
 *
 * Treatment: logos sit on light cards in grayscale (monochrome but detail
 * preserved). This needs every logo to be a dark/colour version that reads on
 * white. Inherently-light exports (white/off-white/bone) will disappear on the
 * light card and need a dark version supplied.
 *
 * Every entry links to a published case study at /project/{slug}; the hover
 * panel surfaces client name + one-line outcome. To add a client, drop a
 * transparent logo (kebab-case) into /public/trusted-logos and add a row here.
 */
const clientLogos: ClientLogo[] = [
  {
    name: "DS Smith",
    file: "ds-logo-color.svg",
    slug: "ds-smith-explaining-eudr-compliance-through-confident-clear-animation",
    outcome: "Made a complex EU regulation clear, through calm, confident animation.",
  },
  {
    name: "Haydale",
    file: "haydale.png",
    slug: "haydales-animation-journey-simplifying-innovation",
    outcome: "Turned advanced materials science into animation prospects actually grasp.",
    invert: true,
  },
  {
    name: "Cegedim",
    file: "cegedim.webp",
    slug: "crafting-engaging-healthcare-explainer-videos-for-cegedim",
    outcome: "An explainer for Cegedim that grew into a series of twelve.",
  },
  {
    name: "Gwent Police",
    file: "gwent-police.png",
    slug: "gwent-police-recognise-respond-campaign",
    outcome:
      "A new force procedure given a brand that travels across signage, briefings and the officer app.",
    emphasis: "xl",
  },
  {
    name: "Medac",
    file: "medac.svg",
    slug: "medacs-patient-friendly-animated-explainer-video-success",
    outcome:
      "An animated explainer that walks Metoject patients through their first self-injection at home.",
  },
  {
    name: "Practice Toolkit",
    file: "practice-toolkit.svg",
    slug: "practice-toolkit-why-pro-animation-process",
    outcome: "Two animations designed to move GP practices from curiosity to trial signup.",
  },
  {
    name: "Be Business Fit",
    file: "be-business-fit.svg",
    slug: "be-business-fit-workshop-branding-and-website",
    outcome:
      "A workshop-led rebrand that gave a leadership consultancy the brand its expertise deserved.",
    emphasis: "lg",
  },
  {
    name: "Healthy HR",
    file: "healthy-hr.svg",
    slug: "healthy-hr-brand-workshop-branding-and-website",
    outcome:
      "A workshop-led rebrand for an HR consultancy stepping up from compliance to strategic voice.",
  },
  {
    name: "The Clarified Company",
    file: "clarified-company.png",
    slug: "the-clarified-company",
    outcome:
      "A brand identity and logo motion system for a tech consultancy bridging digital and human.",
  },
  {
    name: "Web Marketer",
    file: "web-marketer.svg",
    slug: "web-marketer-the-b2b-performance-marketing-podcast",
    outcome:
      "A podcast brand and fortnightly content engine for The B2B Performance Marketing Podcast.",
  },
  {
    name: "Welch Fitness",
    file: "welch-fitness.svg",
    slug: "revitalising-welch-fitness-a-remarkable-rebranding-journey",
    outcome: "A rebrand that gave Welch Fitness a sharper, more confident identity to grow on.",
    emphasis: "lg",
  },
  {
    name: "Belle Vitale",
    file: "belle-vitale.png",
    slug: "belle-vitale-wellness-branding-website-and-social-marketing",
    outcome: "A complete brand, website and launch toolkit for a new women's wellness studio.",
  },
  {
    name: "Christie Residential",
    file: "christie-residential.svg",
    slug: "handled-with-care-repositioning-christie-residential",
    outcome:
      "A rebrand and office move delivered as one. The agency now looks the way it operates.",
  },
  {
    name: "Smoke & Slaw",
    file: "smoke-slaw.png",
    slug: "bbq-street-food-branding",
    outcome: "Brand identity and ongoing social for a Southern-style BBQ catering brand.",
    emphasis: "xl",
  },
  {
    name: "Lavender & Lemon",
    file: "lavender-and-lemon.svg",
    slug: "branding-lavender-and-lemon",
    outcome:
      "Counter-worthy branding and packaging for a Welsh organic cleaning brand built on refillables.",
  },
  {
    name: "Body Talk",
    file: "body-talk.png",
    slug: "kinesiology-branding-design",
    outcome:
      "Brand strategy, name and identity for a Welsh kinesiology practice making holism approachable.",
  },
  {
    name: "Femmely",
    file: "femmely.png",
    slug: "femmely-app-branding",
    outcome: "A brand identity for a women-only social app built around lasting connection.",
  },
  {
    name: "The Nest",
    file: "thenest-_primary-teal-transparent.svg",
    slug: "branding-for-adult-venues",
    outcome: "A brand identity and ongoing social engine for Cardiff's curated adult venue.",
  },
  {
    name: "Bean & Bread",
    file: "bean-and-bread.png",
    slug: "being-bean-breads-brand-guardians",
    outcome: "Brand strategy, identity and guidelines for an antipodean coffee shop in Abergavenny.",
    emphasis: "lg",
  },
  {
    name: "Sales Made Easy",
    file: "sales-made-easy.svg",
    slug: "sales-made-easy-branding-design-and-support",
    outcome: "Brand transformation, identity and ongoing support for a sales consultancy.",
    emphasis: "lg",
  },
  {
    name: "3 Sheds",
    file: "3-sheds.svg",
    slug: "3-sheds-garden-creatives",
    outcome: "Brand identity, van livery and social training for a South Wales creative gardener.",
  },
];

export default function LogoGrid() {
  return (
    <section aria-labelledby="clients-heading" className="bg-dawn-80 py-[100px]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p
          id="clients-heading"
          className="text-center text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40"
        >
          Trusted by
        </p>

        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {clientLogos.map((logo) => (
            <li key={logo.slug}>
              <Link
                href={`/project/${logo.slug}`}
                aria-label={`${logo.name}: view case study`}
                className="group relative flex h-24 md:h-28 items-center justify-center rounded-card bg-white px-4 transition-transform duration-300 hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-dragon-fire focus-visible:ring-offset-2 focus-visible:ring-offset-dawn-80"
              >
                {/* Monochrome (grayscale keeps internal detail); fades out to reveal the panel. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${dir}/${logo.file}`}
                  alt={logo.name}
                  loading="lazy"
                  className={`w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 ${
                    logo.invert ? "grayscale invert" : "grayscale"
                  } ${
                    logo.emphasis === "xl"
                      ? "h-20 max-w-[250px]"
                      : logo.emphasis === "lg"
                        ? "h-16 max-w-[230px]"
                        : "h-14 max-w-[200px]"
                  }`}
                />

                {/* Hover panel: client name + one-line outcome, dark text on the light card. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-display text-[0.95rem] leading-tight text-dawn">
                    {logo.name}
                  </span>
                  <span className="text-[0.72rem] leading-snug text-dawn/55 line-clamp-2">
                    {logo.outcome}
                  </span>
                  <span className="mt-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-dragon-fire">
                    View project
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
