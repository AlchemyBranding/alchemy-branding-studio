import type { StoriAsset } from "@/sanity/lib/queries";

type AssetKind = NonNullable<StoriAsset["kind"]>;

type Props = {
  assets: StoriAsset[];
  /** Small uppercase heading above the list. Omit to render the list bare. */
  title?: string;
};

/**
 * Fall back to classifying by label, then file extension, when an editor
 * hasn't set the type in Sanity.
 */
function kindFor(asset: StoriAsset): AssetKind {
  if (asset.kind) return asset.kind;

  const label = asset.label.toLowerCase();
  if (label.includes("folder") || label.includes("docs (google drive)")) return "folder";
  if (label.includes("voiceover")) return "audio";
  if (label.includes("animation v") || label.includes("style test")) return "video";
  if (label.includes("storyboard") || label.includes("concept art")) return "image";
  if (label.includes("script") || label.includes("planning doc")) return "document";

  const path = asset.url.split("?")[0].toLowerCase();
  if (/\.(mp4|mov|webm)$/.test(path)) return "video";
  if (/\.(mp3|wav|aiff?)$/.test(path)) return "audio";
  if (/\.(jpe?g|png|gif|webp)$/.test(path)) return "image";
  if (/\.(pdf|docx?|pptx?)$/.test(path)) return "document";

  return "document";
}

/** Where the asset lives, so the client can see what a link will open. */
function sourceFor(url: string): string | null {
  if (url.includes("dropbox.com")) return "Dropbox";
  if (url.includes("docs.google.com")) return "Google Docs";
  if (url.includes("drive.google.com")) return "Google Drive";
  return null;
}

const iconPaths: Record<AssetKind, string> = {
  document: "M4 1.5h5L12 4.5v10H4zM9 1.5v3h3",
  video: "M1.5 3.5h9v9h-9zM10.5 6.5l4-2.5v8l-4-2.5",
  audio: "M3 6.5v3M6 4v8M9 5.5v5M12 7v2",
  image: "M1.5 2.5h13v11h-13zM1.5 10.5l4-3.5 3.5 3M9.5 9l2-1.5 3 2.5",
  folder: "M1.5 3.5h4.5l1.5 2h7v8h-13z",
};

const iconLabels: Record<AssetKind, string> = {
  document: "Document",
  video: "Video",
  audio: "Audio",
  image: "Image",
  folder: "Folder",
};

function AssetIcon({ kind }: { kind: AssetKind }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-dragon-fire"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[kind]} />
    </svg>
  );
}

/**
 * Plays the compressed copy uploaded to Sanity, so the client can watch
 * without opening Dropbox (their IT blocks it). Renders nothing until a
 * web copy exists; the source link above always remains.
 */
function AssetPlayer({ asset, kind }: { asset: StoriAsset; kind: AssetKind }) {
  if (!asset.webFileUrl) return null;
  if (kind !== "video" && kind !== "audio") return null;

  if (kind === "audio") {
    return (
      <audio
        controls
        preload="none"
        src={asset.webFileUrl}
        className="mt-2 mb-3 w-full"
        aria-label={`${asset.label} audio player`}
      />
    );
  }

  return (
    <video
      controls
      preload="metadata"
      playsInline
      src={asset.webFileUrl}
      className="mt-2 mb-3 w-full rounded-card bg-black"
      aria-label={`${asset.label} video player`}
    />
  );
}

export default function AssetList({ assets, title }: Props) {
  if (assets.length === 0) return null;

  return (
    <div className="mt-5">
      {title ? (
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/35">
          {title}
        </p>
      ) : null}

      <ul className={`${title ? "mt-2" : ""} border-t border-dawn-60`}>
        {assets.map((asset) => {
          const kind = kindFor(asset);
          const source = sourceFor(asset.url);

          return (
            <li key={`${asset.label}-${asset.url}`} className="border-b border-dawn-60">
              <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-2.5 text-[0.85rem] transition-colors hover:bg-dawn-60/30"
              >
                <AssetIcon kind={kind} />
                <span className="sr-only">{iconLabels[kind]}: </span>
                <span className="flex-1 text-white/75 transition-colors group-hover:text-white">
                  {asset.label}
                </span>
                {source ? (
                  <span className="shrink-0 text-[0.7rem] text-white/30 transition-colors group-hover:text-white/50">
                    {source}
                  </span>
                ) : null}
              </a>
              <AssetPlayer asset={asset} kind={kind} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
