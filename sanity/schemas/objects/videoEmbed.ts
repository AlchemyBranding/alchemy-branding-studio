import { defineField, defineType } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Upload (MP4)", value: "file" },
          { title: "YouTube URL", value: "youtube" },
          { title: "Vimeo URL", value: "vimeo" },
        ],
        layout: "radio",
      },
      initialValue: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "Video file",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      hidden: ({ parent }) => parent?.source !== "file",
    }),
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.source === "file",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { caption: "caption", source: "source" },
    prepare: ({ caption, source }) => ({
      title: caption || "Video",
      subtitle: source ?? "video",
    }),
  },
});
