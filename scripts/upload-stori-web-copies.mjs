/**
 * Publish web-playable copies of the Stori Cymru video and voiceover assets.
 *
 * The client's IT blocks Dropbox, so the portal needs to play media itself.
 * Dropbox stays the master: this downloads each source file, encodes a much
 * smaller web copy with ffmpeg, uploads it to Sanity, and points the asset's
 * `webFile` field at it. The original link stays on the page alongside.
 *
 * One playable asset per language per topic: the current English cut and the
 * current Welsh cut get a web copy, everything else stays a plain Dropbox
 * link. Pass --prune to strip web copies from assets that no longer win their
 * language, deleting the orphaned files.
 *
 * Idempotent: assets that already have a webFile are skipped, so it can be
 * re-run as new animations are delivered.
 *
 *   SANITY_WRITE_TOKEN=... node scripts/upload-stori-web-copies.mjs [--dry-run] [--only=<substring>]
 *
 * Requires ffmpeg on PATH.
 */
import { createClient } from "@sanity/client";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is required (a Sanity editor token).");

const dryRun = process.argv.includes("--dry-run");
const prune = process.argv.includes("--prune");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length).toLowerCase() : null;

const client = createClient({
  projectId: "kr13x7nd",
  dataset: "production",
  apiVersion: "2025-05-01",
  token,
  useCdn: false,
});

/** Dropbox serves shared links as real media only with raw=1. */
const toDirectUrl = (url) => url.replace(/([?&])dl=0\b/, "$1raw=1");

const mb = (bytes) => (bytes / 1048576).toFixed(1);

/**
 * H.264 at CRF 21 is visually lossless on flat 2D animation while cutting
 * roughly 80% of the size; +faststart lets playback begin before the whole
 * file has downloaded.
 */
const ffmpegArgs = (input, output, kind) =>
  kind === "audio"
    ? ["-y", "-v", "error", "-i", input, "-c:a", "aac", "-b:a", "128k", output]
    : [
        "-y", "-v", "error", "-i", input,
        "-c:v", "libx264", "-profile:v", "high", "-crf", "21", "-preset", "slow",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart", output,
      ];

/** Welsh copies are marked in the label, e.g. "Animation v1 (CY)". */
const langOf = (label) => (/\((?:cy|welsh)\)|welsh|\bcym\b/i.test(label) ? "cy" : "en");

/**
 * "Animation v2 (signed off)" -> 2. A label with no version number is the
 * finished thing rather than a numbered draft, so it outranks every vN.
 */
const versionOf = (label) => {
  const m = label.match(/\bv(\d+)\b/i);
  return m ? Number(m[1]) : Infinity;
};

/** The animation is the deliverable, so it outranks a voiceover. */
const kindRank = (kind) => (kind === "video" ? 1 : 0);

/**
 * One playable asset per language per topic: the client should see the
 * current English cut and the current Welsh cut, and nothing else. Everything
 * that loses stays on the page as a plain Dropbox link.
 *
 * Ranked by: video over audio, then version number (unversioned wins), then
 * array order so the later entry breaks a tie.
 */
function currentKeys(list) {
  const best = new Map();
  list.forEach((a, i) => {
    if (!["video", "audio"].includes(a.kind)) return;
    const lang = langOf(a.label);
    const rank = [kindRank(a.kind), versionOf(a.label), i];
    const prev = best.get(lang);
    const wins =
      !prev ||
      rank[0] > prev.rank[0] ||
      (rank[0] === prev.rank[0] && rank[1] > prev.rank[1]) ||
      (rank[0] === prev.rank[0] && rank[1] === prev.rank[1] && rank[2] > prev.rank[2]);
    if (wins) best.set(lang, { key: a._key, rank });
  });
  return new Set([...best.values()].map((v) => v.key));
}

const docs = await client.fetch(`*[_type in ["storiTopic","storiTier"]]{
  _id, _type, title, label,
  "assets": coalesce(assets[]{_key, label, kind, url, "has": defined(webFile.asset)}, []),
  "sharedAssets": coalesce(sharedAssets[]{_key, label, kind, url, "has": defined(webFile.asset)}, [])
}`);

const jobs = [];
const superseded = [];
for (const doc of docs) {
  for (const [field, list] of [["assets", doc.assets], ["sharedAssets", doc.sharedAssets]]) {
    const current = currentKeys(list);
    for (const a of list) {
      if (!["video", "audio"].includes(a.kind)) continue;
      if (!current.has(a._key)) {
        if (prune && a.has) superseded.push({ docId: doc._id, owner: doc.title ?? doc.label, field, ...a });
        continue;
      }
      if (a.has) continue;
      if (only && !`${doc.title ?? doc.label} ${a.label}`.toLowerCase().includes(only)) continue;
      jobs.push({ docId: doc._id, owner: doc.title ?? doc.label, field, ...a });
    }
  }
}

console.log(`${jobs.length} asset(s) need a web copy.`);
for (const j of jobs) console.log(`  + ${j.owner} / ${j.label} (${j.kind})`);
if (prune) {
  console.log(`${superseded.length} superseded asset(s) will drop back to a plain link.`);
  for (const j of superseded) console.log(`  - ${j.owner} / ${j.label}`);
}
if (dryRun) { console.log("\nDRY RUN, nothing downloaded or written."); process.exit(0); }

// Strip the player from versions that have been superseded, and delete the
// file behind it so the dataset does not accumulate orphaned uploads.
for (const j of superseded) {
  try {
    const doc = await client.getDocument(j.docId);
    const item = (doc[j.field] ?? []).find((a) => a._key === j._key);
    const assetId = item?.webFile?.asset?._ref;
    await client.patch(j.docId).unset([`${j.field}[_key=="${j._key}"].webFile`]).commit();
    if (assetId) await client.delete(assetId);
    console.log(`  unlinked ${j.owner} / ${j.label}`);
  } catch (error) {
    console.error(`  FAILED to unlink ${j.owner} / ${j.label}: ${error.message}`);
  }
}

if (!jobs.length) { console.log("\nNothing to encode."); process.exit(0); }

const work = await mkdtemp(join(tmpdir(), "stori-web-"));
let done = 0, failed = 0, savedBytes = 0;

for (const [i, job] of jobs.entries()) {
  const tag = `[${i + 1}/${jobs.length}] ${job.owner} / ${job.label}`;
  const ext = job.kind === "audio" ? "m4a" : "mp4";
  const src = join(work, `src-${i}`);
  const out = join(work, `web-${i}.${ext}`);

  try {
    console.log(`\n${tag}\n  downloading...`);
    const res = await fetch(toDirectUrl(job.url));
    if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
    const { writeFile } = await import("node:fs/promises");
    await writeFile(src, Buffer.from(await res.arrayBuffer()));
    const srcSize = (await stat(src)).size;
    console.log(`  source ${mb(srcSize)} MB, encoding...`);

    await run("ffmpeg", ffmpegArgs(src, out, job.kind), { maxBuffer: 1 << 26 });
    const outSize = (await stat(out)).size;
    savedBytes += srcSize - outSize;
    console.log(`  web copy ${mb(outSize)} MB (${Math.round(100 - (outSize / srcSize) * 100)}% smaller), uploading...`);

    const filename = `${job.owner} ${job.label}`.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + `.${ext}`;
    const asset = await client.assets.upload("file", await readFile(out), { filename });

    await client
      .patch(job.docId)
      .set({
        [`${job.field}[_key=="${job._key}"].webFile`]: {
          _type: "file",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();

    console.log(`  linked -> ${asset._id}`);
    done++;
  } catch (error) {
    console.error(`  FAILED: ${error.message}`);
    failed++;
  } finally {
    await rm(src, { force: true });
    await rm(out, { force: true });
  }
}

await rm(work, { recursive: true, force: true });
console.log(`\nDone. ${done} uploaded, ${failed} failed. Saved ${mb(savedBytes)} MB versus the source files.`);
