import type { SchemaTypeDefinition } from "sanity";

import { community } from "./documents/community";
import { historicalArticle } from "./documents/historicalArticle";
import { person } from "./documents/person";
import { photograph } from "./documents/photograph";
import { source } from "./documents/source";
import { town } from "./documents/town";
import { traditionalInstitution } from "./documents/traditionalInstitution";
import { village } from "./documents/village";
import { leadershipEntry } from "./objects/leadershipEntry";

// See docs/07-content-model.md and docs/09-database-design.md for the
// documented content model these schemas implement.
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents, in content-entry order (docs/07-content-model.md).
  // Town sits above Community (added 2026-07-23, see
  // docs/content-staging/ozubulu-town-wide.md) but is entered last of the
  // "structural" documents since it references Community/TraditionalInstitution.
  community,
  village,
  traditionalInstitution,
  person,
  historicalArticle,
  photograph,
  source,
  town,
  // Objects
  leadershipEntry,
];
