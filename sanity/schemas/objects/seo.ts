import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Browser tab and search-result title. 50–60 chars is the sweet spot.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Search-result preview. 150–160 chars.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "1200×630 recommended. Falls back to the featured image.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional. Use only if this content is a duplicate of a primary URL elsewhere.",
    }),
  ],
});
