/**
 * Upload a hero image to Sanity and set it as a blog post's featuredImage.
 *
 * Usage, from the repo root:
 *   node scripts/upload-hero.mjs <documentId> <pathToImage> ["Alt text"]
 *
 * Example:
 *   node scripts/upload-hero.mjs 8228117f-654c-4b10-9a26-82894fca8d05 scripts/heroes/how-to-write-a-brand-story.jpg "How to write a brand story without inventing one"
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
  console.error('Usage: node scripts/upload-hero.mjs <documentId> <pathToImage> ["Alt text"]')
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

const full = resolve(imgPath)
if (!existsSync(full)) throw new Error(`Image not found: ${full}`)

const before = await client.getDocument(docId)
if (!before) throw new Error(`Document ${docId} not found`)
console.log(`Document: ${before.title}`)
console.log(`featuredImage before: ${before.featuredImage ? 'set' : 'EMPTY'}`)

console.log('Uploading image...')
const asset = await client.assets.upload('image', readFileSync(full), {
  filename: full.split(/[\\/]/).pop(),
})
console.log(`Asset: ${asset._id}  ${asset.metadata?.dimensions?.width}x${asset.metadata?.dimensions?.height}`)

const featuredImage = {
  _type: 'altImage',
  asset: { _type: 'reference', _ref: asset._id },
}
featuredImage.alt = altText || ''

// Patch the draft, then publish so it goes live.
const draftId = `drafts.${docId}`
await client.createIfNotExists({ ...before, _id: draftId })
await client.patch(draftId).set({ featuredImage }).commit()
await client
  .transaction()
  .createOrReplace({ ...(await client.getDocument(draftId)), _id: docId })
  .delete(draftId)
  .commit()

const after = await client.getDocument(docId)
console.log(`featuredImage after: ${after.featuredImage ? 'SET' : 'still empty'}`)
console.log(`Asset ref: ${after.featuredImage?.asset?._ref}`)
console.log('Published.')
