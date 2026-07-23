import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

// Server-only: reads SANITY_API_TOKEN (not NEXT_PUBLIC_-prefixed, so it's
// never bundled into client code). The "production" dataset has aclMode
// "public" but still requires an authenticated request to read -- confirmed
// while wiring up the first page (unauthenticated queries returned null).
export function getClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  });
}
