import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next.js draft mode so editors can preview unpublished Sanity content
 * on the real, styled page. Gated by SANITY_PREVIEW_SECRET.
 *
 *   /api/draft?secret=XXXX&slug=/project/some-slug
 *
 * Disable again at /api/draft/disable.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid or missing preview secret.", { status: 401 });
  }

  (await draftMode()).enable();
  // Only ever redirect to an internal path.
  redirect(slug.startsWith("/") ? slug : `/${slug}`);
}
