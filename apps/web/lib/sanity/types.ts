import type { ComponentProps } from "react";
import type { PortableText } from "next-sanity";

export type PortableTextBlocks = ComponentProps<typeof PortableText>["value"];

export interface SanityImage {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface HomeCommunity {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  verificationStatus?: string;
  featuredImage?: SanityImage;
  villages: string[];
}

export interface HomeArticle {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  verificationStatus?: string;
  publishedAt?: string;
  featuredImage?: SanityImage;
  /** Characters of plain text in the body, for the "min read" estimate. */
  bodyLength?: number;
}

export interface HomePhotograph {
  _id: string;
  title: string;
  image: SanityImage;
  altText?: string;
  photographer?: string;
  contributor?: string;
  dateTaken?: string;
  location?: string;
}

export interface HomeInstitution {
  _id: string;
  name: string;
  overview?: string;
  verificationStatus?: string;
  leadership: {
    _key: string;
    title: string;
    community?: string;
    /** Only set when the holder's profile is public. */
    name?: string | null;
    /** Only set when the holder's profile is public. */
    titles?: string[] | null;
    /** Only set when the holder's profile is public. */
    portrait?: { image?: SanityImage; altText?: string } | null;
  }[];
}

export interface HomePerson {
  _id: string;
  fullName: string;
  titles?: string[] | null;
  occupation?: string;
  community?: string;
  photo?: { image?: SanityImage; altText?: string };
}

export interface HomePageData {
  communities: HomeCommunity[];
  articles: HomeArticle[];
  photographs: HomePhotograph[];
  institution: HomeInstitution | null;
  people: HomePerson[];
}

export interface SearchResult {
  _id: string;
  _type:
    | "community"
    | "village"
    | "traditionalInstitution"
    | "historicalArticle"
    | "person";
  title: string;
  slug?: string;
  excerpt?: string;
  communitySlug?: string;
  communityName?: string;
  /** People only: traditional, chieftaincy or honorary titles. */
  titles?: string[] | null;
}

export interface CommunitySummary {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface VillageSummary {
  _id: string;
  name: string;
  igboName?: string;
  slug: string;
  meaning?: string;
  researchStatus?: string;
}

export interface InstitutionSummary {
  _id: string;
  name: string;
  slug: string;
  overview?: string;
}

export interface SourceSummary {
  _id: string;
  title: string;
  author?: string;
  sourceType?: string;
}

export interface CommunityPageData {
  _id: string;
  name: string;
  description?: string;
  history?: PortableTextBlocks;
  verificationStatus?: string;
  researchStatus?: string;
  updatedAt?: string;
  villages: VillageSummary[];
  institutions: InstitutionSummary[];
  sources: SourceSummary[];
}

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  verificationStatus?: string;
  researchStatus?: string;
}

export interface TownPageData {
  _id: string;
  name: string;
  overview?: string;
  historicalSummary?: PortableTextBlocks;
  geography?: string;
  location?: string;
  neighbouringTowns: string[];
  seasons: { _key: string; name?: string; period?: string }[];
  verificationStatus?: string;
  researchStatus?: string;
  updatedAt?: string;
  featuredImage?: SanityImage;
  communities: HomeCommunity[];
  institution: HomeInstitution | null;
  featuredArticles: HomeArticle[];
  sources: SourceSummary[];
}

export interface HistoricalArticlePageData {
  _id: string;
  title: string;
  summary?: string;
  body?: PortableTextBlocks;
  verificationStatus?: string;
  researchStatus?: string;
  publishedAt?: string;
  updatedAt?: string;
  communities: CommunitySummary[];
  sources: SourceSummary[];
}
