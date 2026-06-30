import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { previewAction } from "@/sanity/actions/previewAction";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "alchemy-branding-studio",
  title: "Alchemy Branding Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  document: {
    // One-click "Open preview" action on case studies and blog posts
    // (opens the styled draft in a new tab via /api/draft).
    actions: (prev, context) =>
      context.schemaType === "caseStudy" || context.schemaType === "blogPost"
        ? [...prev, previewAction]
        : prev,
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
