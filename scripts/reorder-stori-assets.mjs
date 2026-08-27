/**
 * Normalise Stori Cymru asset arrays into production order:
 * planning doc, script, storyboard, voiceover, animation. Anything outside
 * those stages (tier concept art, project folders) leads.
 *
 * The portal sorts on render too, so this is only to keep what an editor
 * sees in the Studio matching what the client sees on the page.
 *
 *   SANITY_WRITE_TOKEN=... node scripts/reorder-stori-assets.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is required (a Sanity editor token).");
const dryRun = process.argv.includes("--dry-run");

const client = createClient({
  projectId: "kr13x7nd",
  dataset: "production",
  apiVersion: "2025-05-01",
  token,
  useCdn: false,
});

const STAGE_ORDER = [
  { rank: 1, test: /planning doc/i },
  { rank: 2, test: /script/i },
  { rank: 3, test: /storyboard/i },
  { rank: 4, test: /voiceover/i },
  { rank: 5, test: /animation|style test/i },
];

const stageRank = (l) => STAGE_ORDER.find((s) => s.test.test(l))?.rank ?? 0;
const langRank = (l) => (/\((?:cy|welsh)\)|welsh|\bcym\b/i.test(l) ? 1 : 0);
const versionRank = (l) => {
  const m = l.match(/\bv(\d+)\b/i);
  return m ? Number(m[1]) : 0;
};

const sorted = (list) =>
  list
    .map((asset, index) => ({ asset, index }))
    .sort(
      (a, b) =>
        stageRank(a.asset.label) - stageRank(b.asset.label) ||
        langRank(a.asset.label) - langRank(b.asset.label) ||
        versionRank(a.asset.label) - versionRank(b.asset.label) ||
        a.index - b.index,
    )
    .map((e) => e.asset);

const docs = await client.fetch(`*[_type in ["storiTopic","storiTier"]]{ _id, title, label, assets, sharedAssets }`);
let changed = 0;

for (const doc of docs) {
  const owner = doc.title ?? doc.label;
  const patch = {};

  for (const field of ["assets", "sharedAssets"]) {
    const list = doc[field];
    if (!Array.isArray(list) || list.length < 2) continue;
    const next = sorted(list);
    if (next.every((a, i) => a._key === list[i]._key)) continue;
    patch[field] = next;
    console.log(`${owner} (${field}):`);
    console.log(`   was: ${list.map((a) => a.label).join(" | ")}`);
    console.log(`   now: ${next.map((a) => a.label).join(" | ")}`);
  }

  if (!Object.keys(patch).length) continue;
  changed++;
  if (!dryRun) await client.patch(doc._id).set(patch).commit();
}

console.log(`\n${changed} document(s) ${dryRun ? "would be" : ""} reordered.`);
if (dryRun) console.log("DRY RUN, nothing written.");
