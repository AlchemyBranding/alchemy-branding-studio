import Button from "@/components/Button";
import PortfolioCard from "@/components/home/PortfolioCard";
import type { FeaturedCaseStudy } from "@/sanity/lib/queries";

// Used when Sanity has no featured projects yet — keeps the section's
// design intact so the page still reads as finished.
const placeholderProjects: FeaturedCaseStudy[] = [
  {
    _id: "placeholder-1",
    title: "Add your standout project",
    slug: "#",
    subtitle: "Featured case study",
    serviceTags: ["Branding"],
    clientName: null,
    outcomeSummary: null,
    heroImage: null,
    heroVideoUrl: null,
  },
  {
    _id: "placeholder-2",
    title: "Mark projects as 'Featured' in Sanity",
    slug: "#",
    subtitle: "to populate this grid",
    serviceTags: ["Animation"],
    clientName: null,
    outcomeSummary: null,
    heroImage: null,
    heroVideoUrl: null,
  },
  {
    _id: "placeholder-3",
    title: "Up to three appear here",
    slug: "#",
    subtitle: "in newest-first order",
    serviceTags: ["Website"],
    clientName: null,
    outcomeSummary: null,
    heroImage: null,
    heroVideoUrl: null,
  },
];

export default function FeaturedWork({
  projects,
}: {
  projects: FeaturedCaseStudy[];
}) {
  const items = projects.length > 0 ? projects : placeholderProjects;

  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className="bg-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Our work
        </p>
        <h2
          id="featured-work-heading"
          className="font-display text-h2 mt-3 max-w-3xl text-white"
        >
          Brands we&apos;ve shaped, scaled and launched.
        </h2>

        <Grid items={items} />

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="primary">
            View all work
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Adaptive layout so the grid still reads as finished when the portfolio
 * only has one or two case studies in it:
 *  - 1 project → single full-width card
 *  - 2 projects → two side-by-side cards
 *  - 3+ projects → one large card + two stacked small cards
 */
function Grid({ items }: { items: FeaturedCaseStudy[] }) {
  if (items.length === 1) {
    const [only] = items;
    return (
      <div className="mt-14">
        <PortfolioCard project={only} variant="large" />
      </div>
    );
  }
  if (items.length === 2) {
    const [a, b] = items;
    return (
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioCard project={a} variant="large" />
        <PortfolioCard project={b} variant="large" />
      </div>
    );
  }
  const [large, smallA, smallB] = items;
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:auto-rows-fr">
      <div className="lg:row-span-2">
        <PortfolioCard project={large} variant="large" />
      </div>
      <PortfolioCard project={smallA} variant="small" />
      <PortfolioCard project={smallB} variant="small" />
    </div>
  );
}
