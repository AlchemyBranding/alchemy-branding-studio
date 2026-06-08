import { defineField, defineType } from "sanity";

const pageKeys = [
  "home",
  "about",
  "services",
  "packages",
  "news",
  "portfolio",
  "contact",
  "free-brand-audit",
  "custom-proposal-design",
  "animation",
  "branding-services-cardiff",
] as const;

export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  description: "Per-page SEO config for static routes (one entry per page).",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: pageKeys.map((value) => ({ title: value, value })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) =>
        rule
          .max(60)
          .warning("Over 60 chars: Google may truncate this in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .max(160)
          .warning("Over 160 chars: Google may truncate this in search results."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
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
    }),
  ],
  preview: {
    select: { title: "pageKey", subtitle: "metaTitle" },
    prepare: ({ title, subtitle }) => ({
      title: `Page: ${title ?? "(unset)"}`,
      subtitle,
    }),
  },
});
