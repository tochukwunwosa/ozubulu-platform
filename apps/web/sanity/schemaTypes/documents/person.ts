import { defineField, defineType } from "sanity";

import { researchStatusField } from "../fields/researchStatus";
import { verificationStatusField } from "../fields/verificationStatus";

const LIVING_STATUS_OPTIONS = [
  { title: "Living", value: "living" },
  { title: "Deceased", value: "deceased" },
  { title: "Unknown", value: "unknown" },
];

const VISIBILITY_OPTIONS = [
  { title: "Public", value: "public" },
  { title: "Restricted", value: "restricted" },
  { title: "Private", value: "private" },
];

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
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
      options: { source: "fullName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photograph",
      title: "Photograph",
      type: "reference",
      to: [{ type: "photograph" }],
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "occupation",
      title: "Occupation",
      type: "string",
    }),
    defineField({
      name: "community",
      title: "Community",
      type: "reference",
      to: [{ type: "community" }],
    }),
    defineField({
      name: "village",
      title: "Village",
      type: "reference",
      to: [{ type: "village" }],
    }),
    defineField({
      name: "livingStatus",
      title: "Living Status",
      type: "string",
      options: { list: LIVING_STATUS_OPTIONS, layout: "radio" },
      initialValue: "unknown",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentObtained",
      title: "Consent Obtained",
      description:
        "Required before a Living person's profile may be set to Public visibility.",
      type: "boolean",
      initialValue: false,
      hidden: ({ document }) => document?.livingStatus !== "living",
    }),
    defineField({
      name: "visibility",
      title: "Visibility",
      type: "string",
      options: { list: VISIBILITY_OPTIONS, layout: "radio" },
      initialValue: "restricted",
      validation: (Rule) =>
        Rule.required().custom((visibility, context) => {
          const doc = context.document as
            { livingStatus?: string; consentObtained?: boolean } | undefined;
          if (
            doc?.livingStatus === "living" &&
            visibility === "public" &&
            !doc.consentObtained
          ) {
            return "A living person cannot be Public without Consent Obtained.";
          }
          return true;
        }),
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "source" }] }],
    }),
    verificationStatusField,
    researchStatusField,
  ],
  preview: {
    select: { title: "fullName", subtitle: "occupation" },
  },
});
