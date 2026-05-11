import PortfolioCard from "@/components/home/PortfolioCard";
import type { FeaturedCaseStudy } from "@/sanity/lib/queries";

export default function RelatedProjects({
  projects,
}: {
  projects: FeaturedCaseStudy[];
}) {
  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          See also
        </p>
        <h2
          id="related-heading"
          className="font-display text-h2 mt-3 text-white"
        >
          Related projects.
        </h2>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project) => (
            <li key={project._id}>
              <PortfolioCard project={project} variant="small" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
