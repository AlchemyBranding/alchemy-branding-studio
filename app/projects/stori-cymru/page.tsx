import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AssetList from "@/components/projects/AssetList";
import LogoutButton from "@/components/projects/LogoutButton";
import TopicCard from "@/components/projects/TopicCard";
import { safeFetch } from "@/sanity/lib/fetch";
import { storiCymruQuery, type StoriCymruData } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stori Cymru · Project status",
  robots: { index: false, follow: false },
};

const emptyData: StoriCymruData = { project: null, tiers: [], lastUpdated: null };

/** Client-facing date, e.g. "26 August 2026". */
function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(date);
}

export default async function StoriCymruProjectPage() {
  const { project, tiers, lastUpdated } = await safeFetch<StoriCymruData>(
    storiCymruQuery,
    emptyData,
    { revalidate: 60, tags: ["stori-cymru"] },
  );

  if (!project) notFound();

  const allTopics = tiers.flatMap((tier) => tier.topics);
  const countSignedOff = (key: "scriptEn" | "storyboard" | "animation") =>
    allTopics.filter((topic) => topic.stages?.[key] === "signed-off").length;

  const stats = [
    { label: "Scripts (EN) signed off", value: `${countSignedOff("scriptEn")} / ${allTopics.length}` },
    { label: "Storyboards signed off", value: `${countSignedOff("storyboard")} / ${allTopics.length}` },
    { label: "Topics fully animated", value: `${countSignedOff("animation")} / ${allTopics.length}` },
  ];

  const updated = formatUpdated(lastUpdated);

  return (
    <>
      <section className="bg-dawn pt-[140px] md:pt-[180px] pb-16 border-b border-dawn-80">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-eyebrow text-dragon-fire">Client project</p>
            <LogoutButton />
          </div>
          <h1 className="font-display text-display mt-4 text-white">{project.title}</h1>
          {project.subtitle ? (
            <p className="mt-2 text-[1.05rem] text-white/60">{project.subtitle}</p>
          ) : null}

          <p className="mt-8 text-[1rem] leading-relaxed text-white/70 max-w-2xl">
            {project.overview}
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none text-white">
                  {stat.value}
                </div>
                <p className="mt-2 text-[0.85rem] text-white/55 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {tiers.map((tier) => (
        <section key={tier._id} className="bg-dawn py-16 border-b border-dawn-80">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-h2 text-white">{tier.label}</h2>
              <span className="text-[0.9rem] text-white/40">({tier.ageRange})</span>
            </div>
            <p className="mt-3 text-[0.95rem] text-white/60 max-w-2xl leading-relaxed">
              {tier.description}
            </p>

            <AssetList assets={tier.sharedAssets} title="Shared assets" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {tier.topics.map((topic) => (
                <TopicCard key={topic._id} topic={topic} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-dawn py-16 border-b border-dawn-80">
        <div className="max-w-4xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-h3 text-white">Safeguarding &amp; tone</h2>
            <ul className="mt-4 space-y-2">
              {(project.safeguardingPrinciples ?? []).map((principle) => (
                <li key={principle} className="flex items-start gap-2 text-[0.9rem] text-white/65">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-dragon-fire shrink-0" aria-hidden="true" />
                  {principle}
                </li>
              ))}
            </ul>
            {project.safeguardingNote ? (
              <p className="mt-4 text-[0.85rem] text-white/50 leading-relaxed">
                {project.safeguardingNote}
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-h3 text-white">Welsh delivery</h2>
            {project.welshIntro ? (
              <p className="mt-4 text-[0.9rem] text-white/65 leading-relaxed">
                {project.welshIntro}
              </p>
            ) : null}
            <ul className="mt-4 space-y-2">
              {(project.welshResponsibilities ?? []).map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.9rem] text-white/65">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-dragon-fire shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {project.voiceoverArtistName ? (
              <p className="mt-4 text-[0.85rem] text-white/50 leading-relaxed">
                Voiceover artist:{" "}
                {project.voiceoverArtistUrl ? (
                  <a
                    href={project.voiceoverArtistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dragon-fire hover:underline underline-offset-4"
                  >
                    {project.voiceoverArtistName}
                  </a>
                ) : (
                  project.voiceoverArtistName
                )}
                {project.voiceoverArtistNote ? ` (${project.voiceoverArtistNote})` : null}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-dawn py-10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[0.8rem] text-white/40">
            {updated ? `Last updated ${updated} · ` : ""}Alchemy Branding Studio ·{" "}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-dragon-fire">
              {siteConfig.email}
            </a>
          </p>
          <LogoutButton />
        </div>
      </section>
    </>
  );
}
