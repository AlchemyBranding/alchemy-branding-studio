import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { TeamMember } from "@/sanity/lib/queries";

const placeholderTeam: TeamMember[] = [
  {
    _id: "placeholder-1",
    name: "Add team members in Sanity",
    role: "Studio",
    bio: "Open the Team Member document type in /studio. Photos, roles and bios appear here, ordered by the order field (ascending), then name.",
    photo: null,
  },
];

export default function TeamGrid({ team }: { team: TeamMember[] }) {
  const items = team.length > 0 ? team : placeholderTeam;

  return (
    <section
      aria-labelledby="team-heading"
      className="bg-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          The team
        </p>
        <h2
          id="team-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          People who&apos;ll actually do the work.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          Small senior team. No layers between you and the people shaping the
          brand.
        </p>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((member) => (
            <li key={member._id}>
              <div className="relative aspect-square rounded-card overflow-hidden bg-dawn-80">
                {member.photo?.asset ? (
                  <Image
                    src={urlFor(member.photo).width(800).height(800).auto("format").url()}
                    alt={member.photo.alt || member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-dawn-60 via-dawn-80 to-dawn" />
                )}
              </div>
              <h3 className="mt-5 font-bold text-[1.125rem] text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-[0.875rem] text-dragon-fire">
                {member.role}
              </p>
              {member.bio ? (
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65">
                  {member.bio}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
