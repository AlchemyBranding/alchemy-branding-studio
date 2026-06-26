import { client, draftClient } from "./client";

type FetchOptions = {
  params?: Record<string, unknown>;
  /** ISR revalidation in seconds. Default 60. */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation. */
  tags?: string[];
  /**
   * When true (Next draft mode), read drafts via the authenticated client and
   * skip caching, so editors see unpublished changes. Public traffic never
   * sets this.
   */
  preview?: boolean;
};

/**
 * Run a GROQ query, returning the fallback if the request fails (e.g. before
 * a real Sanity project ID is configured, or transient network issues).
 */
export async function safeFetch<T>(
  query: string,
  fallback: T,
  { params, revalidate = 60, tags, preview = false }: FetchOptions = {},
): Promise<T> {
  try {
    if (preview) {
      const data = await draftClient.fetch<T>(query, params ?? {}, {
        cache: "no-store",
      });
      return (data ?? fallback) as T;
    }
    const data = await client.fetch<T>(query, params ?? {}, {
      next: { revalidate, tags },
    });
    return (data ?? fallback) as T;
  } catch (error) {
    // Log in production too — Vercel captures console.error, and a silent
    // fallback here once let a broken GROQ query masquerade as "post not
    // found" 404s across every blog detail page.
    console.error(
      "[sanity] fetch failed, using fallback:",
      (error as Error).message,
    );
    return fallback;
  }
}
