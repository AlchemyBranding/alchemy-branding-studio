import PortfolioCard from "@/components/home/PortfolioCard";
import type { FeaturedCaseStudy } from "@/sanity/lib/queries";

/**
 * Adaptive layout mirroring the homepage Featured Work grid so a selected-work
 * section still reads as finished with 1, 2 or 3 case studies, and keeps
 * working past 3 rather than discarding the overflow.
 *
 * Lifted out of app/animation/page.tsx when the workshop and website service
 * pages needed the same behaviour. Three copies of the same fallback logic is
 * how one of them quietly stops matching the others.
 */
export default function WorkGrid({ items }: { items: FeaturedCaseStudy[] }) {
  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <div className="mt-14">
        <div className="aspect-[4/5] lg:aspect-[16/9]">
          <PortfolioCard project={items[0]} variant="large" />
        </div>
      </div>
    );
  }

  if (items.length === 2) {
    return (
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((p) => (
          <div key={p._id} className="aspect-[4/5] lg:aspect-[4/3]">
            <PortfolioCard project={p} variant="large" />
          </div>
        ))}
      </div>
    );
  }

  const [large, smallA, smallB] = items;
  // Anything past the third card used to be dropped on the floor. The lead
  // three keep the hero arrangement; the rest follow as an even grid, so a
  // page can show more of the back catalogue without a second component.
  const rest = items.slice(3);

  return (
    <>
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:auto-rows-fr">
        <div className="lg:row-span-2">
          <PortfolioCard project={large} variant="large" />
        </div>
        <PortfolioCard project={smallA} variant="small" />
        <PortfolioCard project={smallB} variant="small" />
      </div>

      {rest.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <PortfolioCard key={p._id} project={p} variant="small" />
          ))}
        </div>
      ) : null}
    </>
  );
}
