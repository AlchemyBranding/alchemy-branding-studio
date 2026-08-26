import { defineField, defineType } from "sanity";

export const storiTier = defineType({
  name: "storiTier",
  title: "Stori Cymru tier",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Key stage, e.g. "KS2" or "KS3/4".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "label", maxLength: 32 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ageRange",
      title: "Age range",
      type: "string",
      description: 'e.g. "7-11".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sharedAssets",
      title: "Shared assets",
      type: "array",
      of: [{ type: "storiAsset" }],
      description: "Assets that apply across the whole tier, such as concept art.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "label", ageRange: "ageRange" },
    prepare: ({ title, ageRange }) => ({
      title,
      subtitle: ageRange ? `Ages ${ageRange}` : undefined,
    }),
  },
});
