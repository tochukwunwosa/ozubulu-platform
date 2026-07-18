import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export function getClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}
