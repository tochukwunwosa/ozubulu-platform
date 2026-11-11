import { getClient } from "@/lib/sanity/client";
import {
  communitiesListQuery,
  homePageQuery,
  searchQuery,
} from "@/lib/sanity/queries";
import type {
  CommunitySummary,
  HomePageData,
  SearchResult,
} from "@/lib/sanity/types";

// Returns null when search could not run (Sanity unreachable), so the page
// can say so instead of claiming there were no matches.
export async function searchArchive(
  query: string
): Promise<SearchResult[] | null> {
  // GROQ `match` works on whole words; a trailing * also finds prefixes
  // ("Amak" → "Amakwa").
  const words = query
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}'-]/gu, ""))
    .filter(Boolean);
  if (words.length === 0) return [];

  try {
    return await getClient().fetch<SearchResult[]>(searchQuery, {
      term: words.map((word) => `${word}*`),
    });
  } catch (error) {
    console.error("Search failed:", error);
    return null;
  }
}

const EMPTY_HOME_PAGE: HomePageData = {
  communities: [],
  articles: [],
  photographs: [],
  institution: null,
  people: [],
};

// Same rule as getCommunitiesList below: the homepage must still render (with
// its empty states) when Sanity is unreachable or, as in CI, not configured.
export async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await getClient().fetch<Partial<HomePageData>>(homePageQuery);
    return {
      communities: data.communities ?? [],
      articles: data.articles ?? [],
      photographs: data.photographs ?? [],
      institution: data.institution ?? null,
      people: data.people ?? [],
    };
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity:", error);
    return EMPTY_HOME_PAGE;
  }
}

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
