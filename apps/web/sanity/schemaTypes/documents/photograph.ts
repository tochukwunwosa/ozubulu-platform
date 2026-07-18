import { defineField, defineType } from "sanity";

export const photograph = defineType({
  name: "photograph",
  title: "Photograph",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "photographer",
      title: "Photographer",
      type: "string",
    }),
    defineField({
      name: "contributor",
      title: "Contributor",
      type: "string",
    }),
    defineField({
      name: "dateTaken",
      title: "Date Taken",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
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
      name: "articles",
      title: "Related Historical Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "historicalArticle" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "photographer", media: "image" },
  },
});
