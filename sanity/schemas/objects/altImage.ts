import { defineField, defineType } from "sanity";

export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the image for screen readers and SEO. Required for accessibility.",
      validation: (rule) => rule.required().min(2).max(120),
    }),
  ],
});
