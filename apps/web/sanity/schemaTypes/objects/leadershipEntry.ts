import { defineField, defineType } from "sanity";

export const leadershipEntry = defineType({
  name: "leadershipEntry",
  title: "Leadership Entry",
  type: "object",
  fields: [
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Role",
      description: "e.g. Igwe, Cabinet Member, Chieftaincy title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "current",
      title: "Current Holder",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "person.fullName" },
  },
});
