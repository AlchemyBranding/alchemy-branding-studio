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
  form: {
    components: {
      portableText: {
        // Sanity 5 turned "smart typography" on by default: it rewrites -- as a
        // dash, straight quotes as curly and ... as an ellipsis, and stores the
        // result. Our copy rules ban em dashes, so it's off for every rich-text
        // field. Text is saved exactly as typed.
        plugins: (props) =>
          props.renderDefault({
            ...props,
            plugins: {
              ...props.plugins,
              typography: { ...props.plugins.typography, enabled: false },
            },
          }),
      },
    },
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
