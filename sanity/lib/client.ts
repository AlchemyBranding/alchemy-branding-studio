import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
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
