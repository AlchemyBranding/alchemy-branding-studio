import type { StoriStageStatus } from "@/sanity/lib/queries";

const statusStyles: Record<StoriStageStatus, string> = {
  "signed-off": "bg-mindaro/15 text-mindaro border-mindaro/30",
  "in-progress": "bg-dragon-fire/15 text-fire-40 border-dragon-fire/30",
  "not-started": "bg-dawn text-white/35 border-dawn-60",
};

const statusDot: Record<StoriStageStatus, string> = {
  "signed-off": "bg-mindaro",
  "in-progress": "bg-dragon-fire",
  "not-started": "bg-dawn-40",
};

type Props = {
  label: string;
  status: StoriStageStatus;
};

export default function StatusPill({ label, status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium whitespace-nowrap ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} aria-hidden="true" />
      {label}
    </span>
  );
}
