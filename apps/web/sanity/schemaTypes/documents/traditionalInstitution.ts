import { defineField, defineType } from "sanity";

import { verificationStatusField } from "../fields/verificationStatus";

export const traditionalInstitution = defineType({
  name: "traditionalInstitution",
  title: "Traditional Institution",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "history",
      title: "History",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "leadership",
      title: "Leadership",
      type: "array",
      of: [{ type: "leadershipEntry" }],
    }),
    defineField({
      name: "communities",
      title: "Communities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "community" }] }],
    }),
    defineField({
      name: "villages",
      title: "Villages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "village" }] }],
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
    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "name", media: "featuredImage" },
  },
});
