import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "altImage",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
      description: "Soft cap of 180 words. Longer is allowed but gets a warning.",
      validation: (rule) =>
        rule
          .custom((value) => {
            if (!value) return true;
            const words = value.trim().split(/\s+/).filter(Boolean).length;
            return (
              words <= 180 || "Bio is over 180 words — consider trimming."
            );
          })
          .warning(),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      description: "Optional. Adds a LinkedIn link to the team card.",
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
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
