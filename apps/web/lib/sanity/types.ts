import type { ComponentProps } from "react";
import type { PortableText } from "next-sanity";

export type PortableTextBlocks = ComponentProps<typeof PortableText>["value"];

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
