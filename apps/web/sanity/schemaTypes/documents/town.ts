import { defineField, defineType } from "sanity";

import { researchStatusField } from "../fields/researchStatus";
import { verificationStatusField } from "../fields/verificationStatus";

// The Town is the root entity above Community/Village -- describes what
// Ozubulu IS (identity, at-a-glance facts). Full narrative content (origin
// story, festivals, marriage customs, etc.) belongs in historicalArticle
// documents, linked here via featuredArticles, not duplicated onto this
// document. See docs/content-staging/ozubulu-town-wide.md for the reasoning.
export const town = defineType({
  name: "town",
  title: "Town",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "igboName",
      title: "Igbo Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
    }),
    defineField({
      name: "historicalSummary",
      title: "Historical Summary",
      description:
        "A short introduction only (2-3 paragraphs) -- not the full history. Full narratives (origin story, migration, etc.) belong in their own Historical Article, linked below via Featured Articles.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "geography",
      title: "Geography Summary",
      description:
        "A short summary only. A full geography write-up belongs in its own Historical Article.",
      type: "text",
    }),
    defineField({
      name: "communities",
      title: "Communities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "community" }] }],
    }),
    defineField({
      name: "traditionalInstitutions",
      title: "Traditional Institutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "traditionalInstitution" }] }],
    }),
    defineField({
      name: "featuredArticles",
      title: "Featured Articles",
      description:
        "Historical Articles to surface from the Town page (e.g. Origin of Ozubulu, Traditional Festivals).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "historicalArticle" }] }],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "reference", to: [{ type: "photograph" }] }],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "source" }] }],
    }),
    verificationStatusField,
    researchStatusField,
    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "verificationStatus",
      media: "featuredImage",
    },
  },
});
