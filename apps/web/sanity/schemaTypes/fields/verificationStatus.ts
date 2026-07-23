import { defineField } from "sanity";

export const VERIFICATION_STATUS_OPTIONS = [
  { title: "Verified", value: "verified" },
  { title: "Multiple Sources", value: "multipleSources" },
  { title: "Single Source", value: "singleSource" },
  { title: "Oral Tradition", value: "oralTradition" },
  { title: "Under Review", value: "underReview" },
  { title: "Disputed", value: "disputed" },
];

export const verificationStatusField = defineField({
  name: "verificationStatus",
  title: "Verification Status",
  type: "string",
  options: {
    list: VERIFICATION_STATUS_OPTIONS,
    layout: "radio",
  },
  initialValue: "underReview",
  validation: (Rule) => Rule.required(),
});
