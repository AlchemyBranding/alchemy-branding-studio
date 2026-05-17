import { defineField } from "sanity";

/**
 * Strips URL prefixes and any non-slug characters. Used by Sanity's slug
 * field when the editor clicks "Generate" so pasting a full URL into the
 * source still produces a clean slug.
 */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^[^/]*\//, "")
    .replace(/[/].*$/, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

/**
 * Catches the most common shape mistakes that lead to `/news` cards
 * linking to nonsense URLs (full URLs pasted in, trailing slashes,
 * uppercase letters, etc).
 */
function validateSlugShape(value: { current?: string } | undefined): string | true {
  if (!value?.current) return "Slug is required.";
  const s = value.current;
  if (s !== s.toLowerCase()) return "Use lowercase letters only.";
  if (/[^a-z0-9-]/.test(s)) {
    return "Use only lowercase letters, numbers and hyphens — no slashes, spaces, or URL parts like https://";
  }
  if (s.startsWith("-") || s.endsWith("-")) {
    return "Cannot start or end with a hyphen.";
  }
  return true;
}

type Args = {
  /** Field the slug should default to when Generate is clicked. */
  source: string;
  description?: string;
};

export const slugField = ({ source, description }: Args) =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    group: "content",
    description,
    options: { source, maxLength: 96, slugify },
    validation: (rule) => rule.required().custom(validateSlugShape),
  });
