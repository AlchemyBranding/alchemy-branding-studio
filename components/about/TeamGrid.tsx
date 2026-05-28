import Image from "next/image";

import { LinkedInIcon } from "@/components/icons";
import { urlFor } from "@/sanity/lib/image";
import type { TeamMember } from "@/sanity/lib/queries";

const placeholderTeam: TeamMember[] = [
  {
    _id: "placeholder-1",
    name: "Add team members in Sanity",
    role: "Studio",
    bio: "Open the Team Member document type in /studio. Photos, roles and bios appear here, ordered by the order field (ascending), then name.",
    linkedinUrl: null,
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
          A proper partnership,{" "}
          <span className="italic text-dusk">not a faceless agency.</span>
        </h2>
        <div className="mt-8 max-w-3xl text-[1.0625rem] leading-[1.75] text-white/75 space-y-5">
          <p>
            We&apos;re built deliberately lean. No account managers, no
            layers, no big-agency overheads quietly padding your invoice,
            which means more of your budget goes on the actual work, not
            the machine around it. When a project needs specialist hands,
            we bring in trusted creatives from a network we&apos;ve spent
            years building, chosen for the job rather than because they
            happened to be free that week.
          </p>
          <p>
            But you&apos;ll always deal with us. Dave and Jess lead every
            project and stay your main point of contact, start to finish.
            We think that matters more than most agencies admit. People
            work with people they know, like and trust, not a logo, and
            not a different face every time they call. So that&apos;s
            what we&apos;ve built: a proper partnership, not an
            organisation that hands you off and hopes you don&apos;t
            notice.
          </p>
        </div>

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
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-[1.125rem] text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.875rem] text-dragon-fire">
                    {member.role}
                  </p>
                </div>
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="shrink-0 text-white/50 hover:text-dragon-fire transition-colors duration-200"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                ) : null}
              </div>
              {member.bio ? (
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65 whitespace-pre-line">
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
