export const apiVersion = "2025-05-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, _errorMessage: string): T {
  // Falls back to a placeholder when env vars are absent so `next build`,
  // `next dev`, and routes outside /studio all keep working before Sanity is
  // provisioned. The Studio itself surfaces a clear connection error inside
  // its own UI when the project id is invalid.
  if (v === undefined || v === "") return "placeholder" as T;
  return v;
}
