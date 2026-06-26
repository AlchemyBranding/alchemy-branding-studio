import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "alchemy-branding-studio",
  title: "Alchemy Branding Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // Live "Preview" pane: renders the real, styled page (draft content) next
    // to the editor. Draft mode is enabled via /api/draft using a secure,
    // per-session preview secret (no static secret in the bundle).
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft" } },
      resolve: {
        locations: {
          caseStudy: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Case study",
                  href: `/project/${doc?.slug}`,
                },
                { title: "Work index", href: "/portfolio" },
              ],
            }),
          }),
          blogPost: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "Post", href: `/${doc?.slug}` },
                { title: "News index", href: "/news" },
              ],
            }),
          }),
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
