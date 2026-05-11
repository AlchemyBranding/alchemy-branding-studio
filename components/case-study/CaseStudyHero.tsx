import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { CaseStudyDetail } from "@/sanity/lib/queries";

type Props = Pick<
  CaseStudyDetail,
  | "title"
  | "subtitle"
  | "serviceTags"
  | "clientName"
  | "outcomeSummary"
  | "heroImage"
  | "heroVideoUrl"
  | "publishedAt"
>;

function publicationYear(iso: string | null | undefined) {
  if (!iso) return null;
  try {
    return new Date(iso).getFullYear().toString();
  } catch {
    return null;
  }
}

export default function CaseStudyHero(props: Props) {
  const heroUrl = props.heroImage?.asset
    ? urlFor(props.heroImage).width(2400).auto("format").url()
    : null;
  const year = publicationYear(props.publishedAt);

  return (
    <section className="bg-dawn">
      <div className="pt-[140px] md:pt-[180px] pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {props.serviceTags && props.serviceTags.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-2 mb-8">
              {props.serviceTags.map((tag) => (
                <li
                  key={tag}
                  className="inline-block rounded-full bg-dragon-fire px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <h1 className="font-display text-display max-w-5xl text-white leading-[1.05]">
            {props.title}
          </h1>
          {props.subtitle ? (
            <p className="mt-6 max-w-2xl text-[1.25rem] leading-[1.5] text-dusk italic font-display">
              {props.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* Hero media */}
      {props.heroVideoUrl ? (
        <div className="relative w-full aspect-video bg-dawn-80 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroUrl ?? undefined}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={props.heroImage?.alt ?? props.title}
          >
            <source src={props.heroVideoUrl} type="video/mp4" />
          </video>
        </div>
      ) : heroUrl ? (
        <div className="relative w-full aspect-video bg-dawn-80 overflow-hidden">
          <Image
            src={heroUrl}
            alt={props.heroImage?.alt ?? props.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {/* Meta strip */}
      <div className="border-y border-dawn-80">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {props.clientName ? (
            <Meta label="Client" value={props.clientName} />
          ) : null}
          {props.serviceTags && props.serviceTags.length > 0 ? (
            <Meta label="Services" value={props.serviceTags.join(", ")} />
          ) : null}
          {year ? <Meta label="Year" value={year} /> : null}
          {props.outcomeSummary ? (
            <Meta label="Outcome" value={props.outcomeSummary} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
        {label}
      </p>
      <p className="mt-1.5 text-[0.9375rem] text-white/80 leading-[1.5]">
        {value}
      </p>
    </div>
  );
}
