import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  MoreLink,
  SectionHeading,
  containerClass,
  sectionPaddingClass,
} from "@/components/sections/section-heading";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { revealDelay } from "@/components/motion/reveal";
import {
  VerificationBadge,
  verificationLabel,
} from "@/components/shared/verification-badge";
import { urlFor } from "@/lib/sanity/image";
import type { HomeCommunity } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

// Hatched stand-ins shown wherever a photograph has not been added yet.
export const photoPlaceholderClass =
  "bg-[#E2DCCD] bg-[repeating-linear-gradient(135deg,rgba(107,107,99,0.10)_0_1px,transparent_1px_14px)]";

// Darker stand-in for cards whose text sits on top of the photograph.
export const darkPhotoPlaceholderClass =
  "bg-[#5A5446] bg-[repeating-linear-gradient(135deg,rgba(250,248,242,0.06)_0_1px,transparent_1px_14px)]";

export function HomeCommunities({
  communities,
}: {
  communities: HomeCommunity[];
}) {
  const [first, ...rest] = communities;

  return (
    <section
      id="communities"
      aria-labelledby="communities-heading"
      className={cn(
        "scroll-mt-22 border-y border-soft-clay bg-linen-white",
        sectionPaddingClass
      )}
    >
      <div className={cn(containerClass, "flex flex-col gap-12")}>
        <SectionHeading
          id="communities-heading"
          eyebrow="Discover"
          title="Four communities, one town"
          action={
            <MoreLink href="/town/ozubulu">
              All communities and villages
            </MoreLink>
          }
        >
          <p>
            Ozubulu is made up of four communities &mdash; Amakwa, Egbema,
            Eziora and Nza. Each has its own villages, its own story and its own
            Obi.
          </p>
        </SectionHeading>

        {communities.length === 0 ? (
          <PlaceholderNotice label="The list of communities" />
        ) : (
          <>
            {/* Tablet and desktop: one card per community. */}
            <ul className="hidden grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6 sm:grid">
              {communities.map((community, index) => (
                <li key={community._id} data-reveal style={revealDelay(index)}>
                  <CommunityCard community={community} />
                </li>
              ))}
            </ul>

            {/* Phone: the first community in full, the rest as compact tiles. */}
            <div data-reveal className="flex flex-col gap-3 sm:hidden">
              <CommunityCard community={first} />
              {rest.length > 0 && (
                <ul className="grid grid-cols-3 gap-3">
                  {rest.map((community) => (
                    <li key={community._id}>
                      <Link
                        href={`/community/${community.slug}`}
                        className="flex h-full min-h-22 flex-col gap-1.5 rounded-xl border border-soft-clay bg-white px-3 py-4 text-uli-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
                      >
                        <span className="font-serif text-[1.125rem] font-semibold">
                          {community.name}
                        </span>
                        {verificationLabel(community.verificationStatus) && (
                          <span className="text-caption text-[#5E5E57]">
                            {verificationLabel(community.verificationStatus)}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function CommunityCard({
  community,
  compact = false,
}: {
  community: HomeCommunity;
  compact?: boolean;
}) {
  const { name, slug, verificationStatus, featuredImage } = community;
  const villages = community.villages ?? [];
  const imageUrl = featuredImage?.asset
    ? urlFor(featuredImage)
        .width(800)
        .height(1000)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  // The photograph fills the card as its background; the text sits on a dark
  // fade at the bottom so it stays readable on any image.
  return (
    <Link
      href={`/community/${slug}`}
      className={cn(
        compact ? "min-h-[280px]" : "min-h-[400px]",
        "group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl text-linen-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(20,27,41,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        !imageUrl && darkPhotoPlaceholderClass
      )}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={featuredImage?.alt ?? ""}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-[rgba(20,27,41,0.92)] via-[rgba(20,27,41,0.62)] to-[rgba(20,27,41,0.15)] transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="relative z-10 flex flex-col gap-2.5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-[1.625rem] font-semibold text-linen-white">
            {name}
          </h3>
          <VerificationBadge status={verificationStatus} />
        </div>
        {villages.length > 0 ? (
          <>
            <p className="text-[0.8125rem] font-medium text-[#E3C17F]">
              {villages.length} {villages.length === 1 ? "village" : "villages"}{" "}
              recorded
            </p>
            <p className="text-[0.9375rem] leading-[1.6] text-[#E4DFD4]">
              {villages.join(" · ")}
            </p>
          </>
        ) : (
          <>
            <p className="text-[0.8125rem] font-medium text-[#E3C17F]">
              Villages being gathered
            </p>
            <p className="text-[0.9375rem] leading-[1.6] text-[#E4DFD4]">
              We are asking elders for the full list of villages. Know them?
              Tell us.
            </p>
          </>
        )}
        <span className="inline-flex items-center gap-1.5 pt-2 text-[0.9375rem] font-semibold tracking-button text-[#E3C17F] group-hover:underline group-hover:underline-offset-4">
          Explore {name}
          <ArrowRightIcon
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
