import { defineField, defineType } from "sanity";

import { researchStatusField } from "../fields/researchStatus";
import { verificationStatusField } from "../fields/verificationStatus";

export const village = defineType({
  name: "village",
  title: "Village",
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
      name: "meaning",
      title: "Meaning of Name",
      type: "text",
    }),
    defineField({
      name: "community",
      title: "Community",
      type: "reference",
      to: [{ type: "community" }],
      description:
        "Leave empty only if the village's community affiliation is genuinely disputed or unconfirmed by historical record.",
    }),
    defineField({
      name: "history",
      title: "History",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "geography",
      title: "Geography",
      type: "text",
    }),
    defineField({
      name: "boundaries",
      title: "Boundaries",
      type: "text",
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
      subtitle: "community.name",
      media: "featuredImage",
    },
  },
});
