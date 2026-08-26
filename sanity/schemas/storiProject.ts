import { defineField, defineType } from "sanity";

/**
 * Singleton holding the Stori Cymru client portal's page-level copy.
 * Tiers and topics are separate documents so a single status can be edited
 * without opening the whole project.
 */
export const storiProject = defineType({
  name: "storiProject",
  title: "Stori Cymru project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "safeguardingPrinciples",
      title: "Safeguarding principles",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "safeguardingNote",
      title: "Safeguarding note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "welshIntro",
      title: "Welsh delivery intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "welshResponsibilities",
      title: "Welsh delivery responsibilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "voiceoverArtistName",
      title: "Voiceover artist name",
      type: "string",
    }),
    defineField({
      name: "voiceoverArtistUrl",
      title: "Voiceover artist link",
      type: "url",
    }),
    defineField({
      name: "voiceoverArtistNote",
      title: "Voiceover artist note",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
