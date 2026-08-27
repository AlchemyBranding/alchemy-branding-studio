import type { StoriStageKey, StoriTopic } from "@/sanity/lib/queries";
import AssetList from "./AssetList";
import StatusPill from "./StatusPill";

type Props = {
  topic: StoriTopic;
};

/** The five production stages, in display order. */
export const stageOrder: { key: StoriStageKey; label: string }[] = [
  { key: "scriptEn", label: "Script (EN)" },
  { key: "scriptCy", label: "Script (CY)" },
  { key: "storyboard", label: "Storyboard" },
  { key: "voiceover", label: "Voiceover" },
  { key: "animation", label: "Animation" },
];

export default function TopicCard({ topic }: Props) {
  return (
    <div className="rounded-card bg-dawn-80 border border-dawn-60 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-[1.15rem] text-white">{topic.title}</h3>
        {topic.lead ? (
          <span className="text-[0.75rem] uppercase tracking-[0.08em] text-white/40">
            Lead: {topic.lead}
          </span>
        ) : null}
      </div>

      {topic.deadlineNote ? (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-dragon-fire px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.06em] text-dawn">
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.25" />
            <path d="M8 4.75V8l2.25 1.75" />
          </svg>
          {topic.deadlineNote}
        </p>
      ) : null}

      {topic.onHold ? (
        <p className="mt-3 inline-block rounded-full border border-pixie-pink/30 bg-pixie-pink/10 px-3 py-1 text-[0.75rem] text-pixie-pink">
          On hold{topic.note ? `: ${topic.note}` : ""}
        </p>
      ) : (
        <>
          {topic.note ? (
            <p className="mt-2 text-[0.8rem] text-white/45">{topic.note}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {stageOrder.map(({ key, label }) => (
              <StatusPill key={key} label={label} status={topic.stages[key]} />
            ))}
          </div>
        </>
      )}

      <AssetList assets={topic.assets} title="Assets" />
    </div>
  );
}
