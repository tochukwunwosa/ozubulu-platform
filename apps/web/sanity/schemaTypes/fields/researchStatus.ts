import { defineField } from "sanity";

export const RESEARCH_STATUS_OPTIONS = [
  { title: "Coming Soon", value: "comingSoon" },
  { title: "Under Research", value: "underResearch" },
  { title: "Verified", value: "verified" },
];

export const researchStatusField = defineField({
  name: "researchStatus",
  title: "Research Status",
  description:
    "Internal progress indicator: is this content still to come, actively being researched, or considered complete? Distinct from Verification Status, which reflects how well-sourced the published content is rather than whether more work is planned.",
  type: "string",
  options: {
    list: RESEARCH_STATUS_OPTIONS,
    layout: "radio",
  },
  initialValue: "comingSoon",
  validation: (Rule) => Rule.required(),
});
