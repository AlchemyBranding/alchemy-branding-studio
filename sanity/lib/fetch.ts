import { client } from "./client";

type FetchOptions = {
  params?: Record<string, unknown>;
  /** ISR revalidation in seconds. Default 60. */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation. */
  tags?: string[];
};

/**
 * Run a GROQ query, returning the fallback if the request fails (e.g. before
 * a real Sanity project ID is configured, or transient network issues).
 */
export async function safeFetch<T>(
  query: string,
  fallback: T,
  { params, revalidate = 60, tags }: FetchOptions = {},
): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params ?? {}, {
      next: { revalidate, tags },
    });
    return (data ?? fallback) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[sanity] fetch failed, using fallback:",
        (error as Error).message,
      );
    }
    return fallback;
  }
}
