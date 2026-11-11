import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

// Builds CDN URLs (cdn.sanity.io) for images stored in Sanity. Needs only the
// public project id and dataset, so it is safe on server and client alike.
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
