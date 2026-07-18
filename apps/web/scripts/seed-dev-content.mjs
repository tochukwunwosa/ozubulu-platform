// Phase 2 helper: seeds one cross-linked sample of each Version 1 content
// type into a non-production Sanity dataset, to validate the schemas built
// in Phase 1 (docs/07-content-model.md, docs/09-database-design.md).
//
// Usage: SEED_DATASET=development node scripts/seed-dev-content.mjs
// Refuses to run against "production" as a safety guard.

import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "next-sanity";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, "../.env.local");
  const raw = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnvLocal();
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = env.SANITY_API_TOKEN;
const dataset = process.env.SEED_DATASET || "development";

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
}

if (dataset === "production") {
  throw new Error(
    'Refusing to seed the "production" dataset. Pass SEED_DATASET=<name> to target a non-production dataset.',
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

function block(text) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

const ref = (id) => ({ _type: "reference", _ref: id });
const arrRef = (id) => ({ _type: "reference", _ref: id, _key: key() });

// Minimal 1x1 PNG, used only as a placeholder asset for the Photograph schema.
const TINY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

const ids = {
  source: "seed.source.sample",
  photograph: "seed.photograph.sample",
  community: "seed.community.egbema",
  village: "seed.village.nnukwuEgbema",
  institution: "seed.traditionalInstitution.egbema",
  person: "seed.person.sample",
  article: "seed.historicalArticle.sample",
};

async function main() {
  console.log(`Seeding representative content into dataset "${dataset}"...`);

  const asset = await client.assets.upload("image", Buffer.from(TINY_PNG_BASE64, "base64"), {
    filename: "seed-placeholder.png",
  });

  const today = new Date().toISOString().slice(0, 10);

  const docs = [
    {
      _id: ids.source,
      _type: "source",
      title: "[SEED] Sample Oral Interview",
      author: "Seed Contributor",
      sourceType: "oralTradition",
      notes: "Placeholder source created during Phase 2 schema validation. Safe to delete.",
    },
    {
      _id: ids.community,
      _type: "community",
      name: "[SEED] Egbema",
      slug: { _type: "slug", current: "seed-egbema" },
      description: "Placeholder community created to validate the Community schema during Phase 2.",
      history: [block("Placeholder history text for schema validation.")],
      gallery: [arrRef(ids.photograph)],
      sources: [arrRef(ids.source)],
      verificationStatus: "underReview",
      updatedAt: today,
    },
    {
      _id: ids.village,
      _type: "village",
      name: "[SEED] Nnukwu Egbema",
      slug: { _type: "slug", current: "seed-nnukwu-egbema" },
      meaning: "Placeholder meaning of name.",
      community: ref(ids.community),
      history: [block("Placeholder history text for schema validation.")],
      gallery: [arrRef(ids.photograph)],
      sources: [arrRef(ids.source)],
      verificationStatus: "underReview",
      updatedAt: today,
    },
    {
      _id: ids.person,
      _type: "person",
      fullName: "[SEED] Sample Person",
      slug: { _type: "slug", current: "seed-sample-person" },
      biography: [block("Placeholder biography for schema validation.")],
      occupation: "Seed Data Placeholder",
      community: ref(ids.community),
      village: ref(ids.village),
      livingStatus: "unknown",
      consentObtained: false,
      visibility: "restricted",
      sources: [arrRef(ids.source)],
      verificationStatus: "underReview",
    },
    {
      _id: ids.institution,
      _type: "traditionalInstitution",
      name: "[SEED] Egbema Traditional Institution",
      slug: { _type: "slug", current: "seed-egbema-traditional-institution" },
      overview: "Placeholder overview for schema validation.",
      history: [block("Placeholder history text for schema validation.")],
      leadership: [
        {
          _type: "leadershipEntry",
          _key: key(),
          person: ref(ids.person),
          title: "[SEED] Sample Title",
          current: true,
        },
      ],
      communities: [arrRef(ids.community)],
      villages: [arrRef(ids.village)],
      gallery: [arrRef(ids.photograph)],
      sources: [arrRef(ids.source)],
      verificationStatus: "underReview",
      updatedAt: today,
    },
    {
      _id: ids.article,
      _type: "historicalArticle",
      title: "[SEED] Sample Historical Article",
      slug: { _type: "slug", current: "seed-sample-historical-article" },
      summary: "Placeholder summary for schema validation.",
      body: [block("Placeholder article body for schema validation.")],
      communities: [arrRef(ids.community)],
      villages: [arrRef(ids.village)],
      traditionalInstitutions: [arrRef(ids.institution)],
      people: [arrRef(ids.person)],
      sources: [arrRef(ids.source)],
      verificationStatus: "underReview",
      publishedAt: new Date().toISOString(),
      updatedAt: today,
    },
    {
      _id: ids.photograph,
      _type: "photograph",
      title: "[SEED] Sample Photograph",
      image: { _type: "image", asset: ref(asset._id) },
      altText: "Placeholder image used to validate the Photograph schema.",
      description: "Placeholder photograph created during Phase 2 schema validation.",
      photographer: "Seed Contributor",
      communities: [arrRef(ids.community)],
      villages: [arrRef(ids.village)],
      traditionalInstitutions: [arrRef(ids.institution)],
      people: [arrRef(ids.person)],
      articles: [arrRef(ids.article)],
    },
  ];

  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();

  console.log("Seed complete:");
  for (const [name, id] of Object.entries(ids)) {
    console.log(`  ${name} -> ${id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
