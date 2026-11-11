import { groq } from "next-sanity";

export const communitiesListQuery = groq`
*[_type == "community"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description
}
`;

// Homepage lists exclude drafts: the server client reads with a token, so
// unpublished `drafts.*` documents would otherwise appear on the public page.
// People appear only when they are public AND either deceased or have given
// consent (Living Persons Policy, docs/02-editorial-policy.md).
export const homePageQuery = groq`
{
  "communities": *[_type == "community" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    verificationStatus,
    featuredImage,
    "villages": *[_type == "village" && references(^._id) && !(_id in path("drafts.**"))] | order(name asc).name
  },
  "articles": *[_type == "historicalArticle" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    summary,
    verificationStatus,
    publishedAt,
    featuredImage,
    "bodyLength": length(pt::text(body))
  },
  "photographs": *[_type == "photograph" && defined(image.asset) && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
    _id,
    title,
    image,
    altText,
    photographer,
    contributor,
    dateTaken,
    location
  },
  "institution": *[_type == "traditionalInstitution" && !(_id in path("drafts.**"))] | order(_createdAt asc)[0] {
    _id,
    name,
    overview,
    verificationStatus,
    "leadership": coalesce(leadership[current == true] {
      _key,
      title,
      "community": person->community->name,
      "name": select(person->visibility == "public" => person->fullName),
      "titles": select(person->visibility == "public" => person->titles),
      "portrait": select(person->visibility == "public" => person->photograph->{ image, altText })
    }, [])
  },
  "people": *[
    _type == "person" &&
    !(_id in path("drafts.**")) &&
    visibility == "public" &&
    (livingStatus == "deceased" || consentObtained == true)
  ] | order(fullName asc)[0...3] {
    _id,
    fullName,
    titles,
    occupation,
    "community": community->name,
    "photo": photograph->{ image, altText }
  }
}
`;

// Site search. Matches names, titles and short descriptions across the
// published content types. People follow the same visibility and consent
// rule as the homepage.
export const searchQuery = groq`
*[
  !(_id in path("drafts.**")) &&
  (
    (_type in ["community", "village", "traditionalInstitution", "historicalArticle"]) ||
    (_type == "person" && visibility == "public" && (livingStatus == "deceased" || consentObtained == true))
  ) &&
  (
    [name, igboName, fullName, title, description, summary, overview, meaning, occupation] match $term ||
    titles[] match $term
  )
] | order(_type asc, coalesce(name, fullName, title) asc)[0...50] {
  _id,
  _type,
  "title": coalesce(name, fullName, title),
  "titles": select(_type == "person" => titles),
  "slug": slug.current,
  "excerpt": coalesce(summary, description, overview, meaning, occupation),
  "communitySlug": community->slug.current,
  "communityName": community->name
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

export const townBySlugQuery = groq`
*[_type == "town" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  name,
  overview,
  historicalSummary,
  geography,
  location,
  "neighbouringTowns": coalesce(neighbouringTowns, []),
  "seasons": coalesce(seasons[]{ _key, name, period }, []),
  verificationStatus,
  researchStatus,
  updatedAt,
  featuredImage,
  "communities": coalesce(communities[]-> {
    _id,
    name,
    "slug": slug.current,
    description,
    verificationStatus,
    featuredImage,
    "villages": *[_type == "village" && references(^._id) && !(_id in path("drafts.**"))] | order(name asc).name
  }, []),
  "institution": traditionalInstitutions[0]-> {
    _id,
    name,
    overview,
    verificationStatus,
    "leadership": coalesce(leadership[current == true] {
      _key,
      title,
      "community": person->community->name,
      "name": select(person->visibility == "public" => person->fullName),
      "titles": select(person->visibility == "public" => person->titles),
      "portrait": select(person->visibility == "public" => person->photograph->{ image, altText })
    }, [])
  },
  "featuredArticles": coalesce(featuredArticles[]-> {
    _id,
    title,
    "slug": slug.current,
    summary,
    verificationStatus,
    publishedAt,
    featuredImage,
    "bodyLength": length(pt::text(body))
  }, []),
  "sources": coalesce(sources[]-> {
    _id,
    title,
    author,
    sourceType
  }, [])
}
`;

export const historicalArticleBySlugQuery = groq`
*[_type == "historicalArticle" && slug.current == $slug][0]{
  _id,
  title,
  summary,
  body,
  verificationStatus,
  researchStatus,
  publishedAt,
  updatedAt,
  "communities": communities[]-> {
    _id,
    name,
    "slug": slug.current,
    description
  },
  "sources": coalesce(sources[]-> {
    _id,
    title,
    author,
    sourceType
  }, [])
}
`;
