import { getClient } from "@/lib/sanity/client";
import { communitiesListQuery } from "@/lib/sanity/queries";
import type { CommunitySummary } from "@/lib/sanity/types";

// Used from the root layout, so every route (including framework routes like
// /_not-found) depends on this succeeding. CI intentionally builds against a
// placeholder Sanity project with no token (.github/workflows/ci.yml), and a
// real deploy should still render (with an empty nav) if Sanity is briefly
// unreachable -- so failures here must never fail the build or crash a page.
export async function getCommunitiesList(): Promise<CommunitySummary[]> {
  try {
    return await getClient().fetch<CommunitySummary[]>(communitiesListQuery);
  } catch (error) {
    console.error("Failed to fetch communities list from Sanity:", error);
    return [];
  }
}
