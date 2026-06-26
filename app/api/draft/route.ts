import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/sanity/lib/client";

/**
 * Enables Next.js draft mode for the Sanity Presentation tool. The Presentation
 * pane calls this with a secure, per-session preview secret (via
 * @sanity/preview-url-secret); defineEnableDraftMode validates it, turns on
 * draft mode, and redirects into the preview. No static secret needed.
 *
 * Exit preview at /api/draft/disable.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  }),
});
