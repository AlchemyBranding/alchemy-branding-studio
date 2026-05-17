import { defineField, defineType } from "sanity";

import { slugField } from "./slug";

const categories = ["Insights", "AI", "Awards", "Founders", "Projects", "Team"] as const;

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
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
        "Lives at /[slug]/ — not /blog/[slug]/. Old /blog/ URLs 301 to /news/, /blog/:slug to /:slug. Paste only the slug (lowercase, hyphens), not the full URL.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: categories.map((value) => ({ title: value, value })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "altImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary used on listing cards. Max 200 chars.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
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
      subtitle: "category",
      media: "featuredImage",
      publishedAt: "publishedAt",
    },
    prepare: ({ title, subtitle, media, publishedAt }) => ({
      title,
      subtitle: [
        subtitle,
        publishedAt ? new Date(publishedAt).toLocaleDateString("en-GB") : null,
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
