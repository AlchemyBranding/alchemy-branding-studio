/**
 * Attach a hero image to a blog post DRAFT. Does not publish.
 *
 * upload-hero.mjs copies the draft over the published id and deletes the draft,
 * so it publishes as a side effect. That is wrong for a post still being
 * reviewed, and it also fails outright when no published version exists yet.
 * This variant patches drafts.<id> and stops there.
 *
 * Usage, from the repo root:
 *   node scripts/upload-hero-draft.mjs <documentId> <pathToImage> ["Alt text"]
 *
 * Reads SANITY_API_TOKEN from .env.local. The token is never printed.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnv(file = '.env.local') {
  if (!existsSync(file)) throw new Error(`${file} not found. Run this from the repo root.`)
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    let v = m[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
    if (!process.env[m[1]]) process.env[m[1]] = v
  }
}

const [docId, imgPath, altText] = process.argv.slice(2)
if (!docId || !imgPath) {
  console.error('Usage: node scripts/upload-hero-draft.mjs <documentId> <pathToImage> ["Alt text"]')
  process.exit(1)
}
loadEnv()
const token = process.env.SANITY_API_TOKEN
if (!token) throw new Error('SANITY_API_TOKEN missing from .env.local')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kr13x7nd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const bare = docId.replace(/^drafts\./, '')
const draftId = `drafts.${bare}`

const full = resolve(imgPath)
if (!existsSync(full)) throw new Error(`Image not found: ${full}`)

const draft = await client.getDocument(draftId)
if (!draft) throw new Error(`Draft ${draftId} not found`)
const published = await client.getDocument(bare)
console.log(`Draft: ${draft.title}`)
console.log(`featuredImage before: ${draft.featuredImage ? 'set' : 'EMPTY'}`)
console.log(`published version exists: ${published ? 'YES' : 'no'}`)

console.log('Uploading image...')
const asset = await client.assets.upload('image', readFileSync(full), {
  filename: full.split(/[\\/]/).pop(),
})
const dim = asset.metadata?.dimensions
console.log(`Asset: ${asset._id}  ${dim?.width}x${dim?.height}`)

await client.patch(draftId).set({
  featuredImage: { _type: 'altImage', alt: altText || '', asset: { _type: 'reference', _ref: asset._id } },
}).commit()

const after = await client.getDocument(draftId)
const stillUnpublished = !(await client.getDocument(bare))
console.log(`featuredImage after: ${after.featuredImage ? 'SET' : 'still empty'}`)
console.log(`alt: ${JSON.stringify(after.featuredImage?.alt)}`)
console.log(`publishedAt: ${after.publishedAt ?? 'not set'}`)
console.log(`still unpublished: ${stillUnpublished ? 'YES' : 'NO - CHECK THIS'}`)
