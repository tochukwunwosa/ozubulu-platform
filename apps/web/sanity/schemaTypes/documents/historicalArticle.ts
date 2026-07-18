import { defineField, defineType } from "sanity";

import { verificationStatusField } from "../fields/verificationStatus";

export const historicalArticle = defineType({
  name: "historicalArticle",
  title: "Historical Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "communities",
      title: "Related Communities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "community" }] }],
    }),
    defineField({
      name: "villages",
      title: "Related Villages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "village" }] }],
    }),
    defineField({
      name: "traditionalInstitutions",
      title: "Related Traditional Institutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "traditionalInstitution" }] }],
    }),
    defineField({
      name: "people",
      title: "Related People",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "source" }] }],
    }),
    verificationStatusField,
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "verificationStatus",
      media: "featuredImage",
    },
  },
});
