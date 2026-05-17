# Sanity → Next.js publish webhook

When a document is published, unpublished, or deleted in Sanity Studio, the
site needs to purge Next.js's prerender + fetch cache for the pages that
depend on that document. Without this, new content can sit invisible behind a
cached 404 (the dynamic route's first miss gets cached) and edits take up to
the ISR window to surface.

The webhook calls `POST /api/revalidate` ([app/api/revalidate/route.ts](../app/api/revalidate/route.ts)),
which verifies the HMAC signature with `next-sanity/webhook` and then runs
`revalidatePath` for the affected routes.

## One-time setup

1. **Generate a secret** — anything random and ≥ 32 chars works.

   ```powershell
   [Convert]::ToBase64String([byte[]](1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

2. **Add the secret to Vercel** — Project Settings → Environment Variables:

   - Name: `SANITY_REVALIDATE_SECRET`
   - Value: the secret from step 1
   - Environments: Production + Preview + Development

   Redeploy after adding so the value is bound into the build.

3. **Create the webhook in Sanity** — https://www.sanity.io/manage →
   project `kr13x7nd` → API → Webhooks → Create webhook.

   | Field | Value |
   | --- | --- |
   | Name | `Next.js revalidate (production)` |
   | URL | `https://alchemybranding.studio/api/revalidate` (use the Vercel preview URL until DNS cuts over) |
   | Dataset | `production` |
   | Trigger on | Create + Update + Delete |
   | Filter | `_type in ["blogPost", "caseStudy", "testimonial", "teamMember", "author", "pageSeo"]` |
   | Projection | see below |
   | HTTP method | `POST` |
   | API version | `2024-01-01` (or newer) |
   | Include drafts | off |
   | Secret | the same secret from step 1 |

   Projection (paste verbatim):

   ```groq
   {
     "_type": _type,
     "_id": _id,
     "slug": slug.current,
     "pageKey": pageKey
   }
   ```

4. **Test it** — in Sanity Studio, edit any blog post or case study and
   publish. Within a few seconds the webhook history in
   sanity.io/manage shows a `200` response, and refreshing the affected
   page on the deployed site shows the change.

## What gets revalidated

| Document type | Paths purged |
| --- | --- |
| `blogPost` | `/`, `/news`, `/<slug>` |
| `caseStudy` | `/`, `/portfolio`, `/project/<slug>` |
| `testimonial` | `/` |
| `teamMember` | `/about` |
| `author` | `/news` |
| `pageSeo` | the page mapped from `pageKey` (see `pageKeyToPath` in the route) |

Adding a new document type? Update both the GROQ filter in the Sanity
webhook **and** the switch in [app/api/revalidate/route.ts](../app/api/revalidate/route.ts) — they
must stay in sync.

## Troubleshooting

- **`401 Invalid signature`** — the secret in Vercel doesn't match the
  one in the Sanity webhook config. Re-paste both from the same source.
- **`500 SANITY_REVALIDATE_SECRET not configured`** — env var missing on
  the deployment. Add it to Vercel and redeploy.
- **Webhook fires, response is `200`, but page still stale** — check that
  the published slug in Sanity exactly matches the URL you're loading
  (trailing whitespace in the slug field will break the match). Also
  confirm the Sanity API CDN has caught up; the `next-sanity/webhook`
  helper already waits for eventual consistency, but a hard refresh
  (Cmd-Shift-R) bypasses your local browser cache.
