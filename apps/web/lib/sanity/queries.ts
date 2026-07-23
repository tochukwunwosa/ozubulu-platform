import { groq } from "next-sanity";

export const communitiesListQuery = groq`
*[_type == "community"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description
}
`;

export const communityBySlugQuery = groq`
*[_type == "community" && slug.current == $slug][0]{
  _id,
  name,
  description,
  history,
  verificationStatus,
  researchStatus,
  updatedAt,
  "villages": *[_type == "village" && references(^._id)] | order(name asc) {
    _id,
    name,
    igboName,
    "slug": slug.current,
    meaning,
    researchStatus
  },
  "institutions": *[_type == "traditionalInstitution" && references(^._id)] {
    _id,
    name,
    "slug": slug.current,
    overview
  },
  "sources": coalesce(sources[]-> {
    _id,
    title,
    author,
    sourceType
  }, [])
}
`;
