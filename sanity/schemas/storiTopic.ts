import { defineField, defineType } from "sanity";

import { STORI_STAGE_FIELDS } from "./objects/storiStages";

export const storiTopic = defineType({
  name: "storiTopic",
  title: "Stori Cymru topic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "reference",
      to: [{ type: "storiTier" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "string",
      description: "Who is leading this topic. Leave blank if unassigned.",
    }),
    defineField({
      name: "onHold",
      title: "On hold",
      type: "boolean",
      description: "Replaces the stage pills with an on-hold flag.",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 2,
      description:
        'Shown under the title. When on hold this is the reason, so write it to read after "On hold:".',
    }),
    defineField({
      name: "deadlineNote",
      title: "Deadline note",
      type: "string",
      description:
        'Short deadline flag shown in red on the card, e.g. "Done by Sept". Leave blank for no flag.',
    }),
    defineField({
      name: "stages",
      title: "Production stages",
      type: "storiStages",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "assets",
      title: "Assets",
      type: "array",
      of: [{ type: "storiAsset" }],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within the tier.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "tier.label", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      tier: "tier.label",
      onHold: "onHold",
      ...Object.fromEntries(STORI_STAGE_FIELDS.map(({ name }) => [name, `stages.${name}`])),
    },
    prepare: (selection) => {
      const { title, tier, onHold } = selection as Record<string, string | boolean>;
      if (onHold) return { title: String(title), subtitle: `${tier} · On hold` };
      const done = STORI_STAGE_FIELDS.filter(
        ({ name }) => (selection as Record<string, string>)[name] === "signed-off",
      ).length;
      return {
        title: String(title),
        subtitle: `${tier} · ${done}/${STORI_STAGE_FIELDS.length} signed off`,
      };
    },
  },
});
