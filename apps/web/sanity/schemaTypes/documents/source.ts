import { defineField, defineType } from "sanity";

const SOURCE_TYPE_OPTIONS = [
  { title: "Book", value: "book" },
  { title: "Interview", value: "interview" },
  { title: "Government Record", value: "governmentRecord" },
  { title: "Church Record", value: "churchRecord" },
  { title: "School Record", value: "schoolRecord" },
  { title: "Newspaper", value: "newspaper" },
  { title: "Academic Research", value: "academicResearch" },
  { title: "Personal Archive", value: "personalArchive" },
  { title: "Oral Tradition", value: "oralTradition" },
  { title: "Website", value: "website" },
];

export const source = defineType({
  name: "source",
  title: "Source",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "sourceType",
      title: "Source Type",
      type: "string",
      options: { list: SOURCE_TYPE_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
    }),
    defineField({
      name: "publicationYear",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "pageNumbers",
      title: "Pages",
      type: "string",
    }),
    defineField({
      name: "archiveLocation",
      title: "Archive Location",
      type: "string",
    }),
    defineField({
      name: "contributor",
      title: "Contributor",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sourceType" },
  },
});
