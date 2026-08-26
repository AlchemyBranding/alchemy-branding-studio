import { defineField, defineType } from "sanity";

export const STORI_STAGE_STATUSES = [
  { title: "Not started", value: "not-started" },
  { title: "In progress", value: "in-progress" },
  { title: "Signed off", value: "signed-off" },
] as const;

/** The five production stages tracked per topic, in display order. */
export const STORI_STAGE_FIELDS = [
  { name: "scriptEn", title: "Script (EN)" },
  { name: "scriptCy", title: "Script (CY)" },
  { name: "storyboard", title: "Storyboard" },
  { name: "voiceover", title: "Voiceover" },
  { name: "animation", title: "Animation" },
] as const;

export const storiStages = defineType({
  name: "storiStages",
  title: "Production stages",
  type: "object",
  options: { columns: 1 },
  fields: STORI_STAGE_FIELDS.map(({ name, title }) =>
    defineField({
      name,
      title,
      type: "string",
      options: { list: [...STORI_STAGE_STATUSES], layout: "radio", direction: "horizontal" },
      initialValue: "not-started",
      validation: (rule) => rule.required(),
    }),
  ),
});
