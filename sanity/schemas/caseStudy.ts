import { defineField, defineType } from "sanity";

import { slugField } from "./slug";

const serviceTagOptions = [
  "Branding",
  "Animation",
  "Website",
  "Strategy",
  "Report Design",
  "Proposal Design",
] as const;

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    slugField({
      source: "title",
      description:
        "Lives at /project/[slug]/. Paste only the slug (lowercase, hyphens), not the full URL.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
      description: "Service descriptor shown beneath the title.",
    }),
    defineField({
      name: "serviceTags",
      title: "Service tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        list: serviceTagOptions.map((value) => ({ title: value, value })),
        layout: "tags",
      },
      validation: (rule) => rule.unique().min(1),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Up to 3 featured projects show in the homepage portfolio grid.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "altImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero video",
      type: "file",
      group: "content",
      options: { accept: "video/mp4,video/webm" },
      description:
        "Optional. Autoplays muted as the hero on the case study page, and plays on hover over the portfolio card. The hero image is used as the poster (still frame before the video loads), so it's still required. Keep the file short and compressed: a 5–15 second loop, MP4 or WebM, ideally under 5 MB.",
    }),
    defineField({
      name: "outcomeSummary",
      title: "Outcome summary",
      type: "text",
      rows: 2,
      group: "content",
      description: "Short outcome statement shown on the portfolio card. Max 100 chars.",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "stats",
      title: "Outcome stats",
      type: "array",
      group: "content",
      description:
        "Optional. 2–3 outcome numbers that animate up from zero on the case study page. Skip if you don't have real numbers — empty arrays render nothing.",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              description: "The number to count up to. Decimals allowed (e.g. 3.2).",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
              description: 'Optional. e.g. "+", "£", "$".',
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: 'Optional. e.g. "%", "x", "m", "k".',
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Short caption beneath the number.",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "decimals",
              title: "Decimal places",
              type: "number",
              description: 'Optional. Defaults to 0. Set to 1 for values like "3.2".',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare: ({ value, suffix, label }) => ({
              title: `${value ?? "?"}${suffix ?? ""}`,
              subtitle: label,
            }),
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "clientQuote",
      title: "Client quote",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "quoteAttribution",
      title: "Quote attribution",
      type: "string",
      group: "content",
      description: "Format: Name, Title, Company.",
    }),
    defineField({
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage",
      client: "clientName",
    },
    prepare: ({ title, subtitle, media, client }) => ({
      title,
      subtitle: [client, subtitle].filter(Boolean).join(" · "),
      media,
    }),
  },
});
