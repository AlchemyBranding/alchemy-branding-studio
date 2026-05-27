"use client";

import { useMemo, useState } from "react";

import PortfolioCard from "@/components/home/PortfolioCard";
import type { FeaturedCaseStudy } from "@/sanity/lib/queries";

const ALL_TAG = "All";

const serviceTagOrder = [
  "Branding",
  "Strategy",
  "Website",
  "Animation",
  "Social Media",
  "Report Design",
  "Proposal Design",
] as const;

type Props = { projects: FeaturedCaseStudy[] };

export default function PortfolioGrid({ projects }: Props) {
  const [active, setActive] = useState<string>(ALL_TAG);

  const tags = useMemo(() => {
    const present = new Set<string>();
    for (const project of projects) {
      for (const t of project.serviceTags ?? []) present.add(t);
    }
    const ordered = serviceTagOrder.filter((t) => present.has(t));
    const extras = [...present].filter(
      (t) => !serviceTagOrder.includes(t as typeof serviceTagOrder[number]),
    );
    return [ALL_TAG, ...ordered, ...extras];
  }, [projects]);

  const filtered = useMemo(() => {
    if (active === ALL_TAG) return projects;
    return projects.filter((p) => (p.serviceTags ?? []).includes(active));
  }, [active, projects]);

  if (projects.length === 0) {
    return (
      <div className="rounded-card border border-dawn-60 bg-dawn-80 p-12 text-center">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Coming soon
        </p>
        <h2 className="font-display text-h3 text-white mt-3">
          Case studies will appear here as they&apos;re published.
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto">
          Add a Case Study in Sanity (Studio → Case study), assign service
          tags, set a hero image, and it&apos;ll land in this grid in
          publish-date order.
        </p>
      </div>
    );
  }

  return (
    <div>
      {tags.length > 1 ? (
        <div
          role="tablist"
          aria-label="Filter by service"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {tags.map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tag)}
                className={`rounded-full px-4 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? "bg-dragon-fire text-dawn"
                    : "bg-dawn-80 text-white/60 hover:bg-dawn-60 hover:text-white border border-dawn-60"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dawn-60 bg-dawn-80 p-12 text-center">
          <p className="text-white/60">No projects in {active} yet.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <li key={project._id}>
              <PortfolioCard project={project} variant="small" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
