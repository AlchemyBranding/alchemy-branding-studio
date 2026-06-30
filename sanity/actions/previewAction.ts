import { EyeOpenIcon } from "@sanity/icons";
import { createPreviewSecret } from "@sanity/preview-url-secret/create-secret";
import { type DocumentActionComponent, useClient, useCurrentUser } from "sanity";

import { apiVersion } from "@/sanity/env";

const previewPath: Record<string, (slug: string) => string> = {
  caseStudy: (slug) => `/project/${slug}`,
  blogPost: (slug) => `/${slug}`,
};

/**
 * "Open preview" document action — one click opens the real, styled draft page
 * in a new tab. It mints a secure, per-session preview secret (via
 * @sanity/preview-url-secret) and hands it to /api/draft, so nothing sensitive
 * is baked into the Studio bundle. Shown only on case studies and blog posts
 * (the document types with public pages).
 */
export const previewAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion });
  const user = useCurrentUser();
  const makePath = previewPath[props.type];

  const doc = (props.draft ?? props.published) as
    | { slug?: { current?: string } }
    | null;
  const slug = doc?.slug?.current;

  if (!makePath) return null;

  return {
    label: "Open preview",
    icon: EyeOpenIcon,
    disabled: !slug,
    title: slug
      ? "Open the styled draft page in a new tab"
      : "Add a slug first",
    onHandle: async () => {
      try {
        if (slug) {
          const { secret } = await createPreviewSecret(
            client,
            "studio-preview-action",
            typeof location !== "undefined" ? location.href : "",
            user?.id,
          );
          const url = new URL("/api/draft", location.origin);
          url.searchParams.set("sanity-preview-pathname", makePath(slug));
          url.searchParams.set("sanity-preview-secret", secret);
          window.open(url.toString(), "_blank", "noopener,noreferrer");
        }
      } finally {
        props.onComplete();
      }
    },
  };
};
