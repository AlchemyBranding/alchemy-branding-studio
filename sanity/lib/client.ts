import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Public client. Reads the live API, not the API CDN, on purpose.
 *
 * Next.js already caches every page for an hour and the publish webhook
 * (app/api/revalidate) refreshes the affected pages on each change. The API
 * CDN added a second cache the webhook cannot purge: on 25 Nov 2026 a post was
 * unpublished, the webhook fired and returned 200, /news rebuilt while the CDN
 * still held the old list, and the post stayed on /news for another hour.
 * Reading the live API means the rebuild after a webhook sees the change.
 * Request volume stays low because Next.js only calls Sanity when a page
 * rebuilds.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

/**
 * Draft-preview client. Reads drafts via an authenticated token, so it's only
 * ever used when Next.js draft mode is enabled (see safeFetch's `preview`
 * flag and the /api/draft route). Never used for public traffic.
 */
export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "drafts",
  token: process.env.SANITY_API_TOKEN,
  stega: false,
});
