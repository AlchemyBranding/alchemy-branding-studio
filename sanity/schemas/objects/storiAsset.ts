import { defineField, defineType } from "sanity";

export const STORI_ASSET_KINDS = [
  { title: "Document", value: "document" },
  { title: "Video", value: "video" },
  { title: "Audio", value: "audio" },
  { title: "Image", value: "image" },
  { title: "Folder", value: "folder" },
] as const;

export const storiAsset = defineType({
  name: "storiAsset",
  title: "Asset",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'What the client sees, e.g. "Script (EN)" or "Animation v2 (signed off)".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Source link",
      type: "url",
      description:
        "The master file in Dropbox or Google Drive. Shown alongside the player when a web copy is uploaded.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: [...STORI_ASSET_KINDS] },
      description: "Sets the icon. Leave blank to derive it from the label.",
    }),
    defineField({
      name: "webFile",
      title: "Web copy",
      type: "file",
      description:
        "Optional compressed copy served from Sanity, so the client can play it in the page without opening Dropbox. Videos and voiceovers only.",
      options: { accept: "video/*,audio/*" },
    }),
  ],
  preview: {
    select: { title: "label", kind: "kind", webFile: "webFile.asset" },
    prepare: ({ title, kind, webFile }) => ({
      title,
      subtitle: [kind ?? "auto", webFile ? "web copy uploaded" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
