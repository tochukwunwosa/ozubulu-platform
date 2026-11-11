// cSpell:ignore Ozubulu
import { AlertTriangleIcon, ShieldCheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

import { CouncilChart } from "@/components/about/council-chart";
import {
  OnThisPage,
  type OnThisPageItem,
} from "@/components/about/on-this-page";
import { revealDelay } from "@/components/motion/reveal";
import { CommunityCard } from "@/components/sections/home-communities";
import { ArticleCard } from "@/components/sections/home-dynamic";
import {
  MoreLink,
  containerClass,
} from "@/components/sections/section-heading";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { ResearchStatusBadge } from "@/components/shared/research-status-badge";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { getClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { townBySlugQuery } from "@/lib/sanity/queries";
import type { TownPageData } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

// Matches the options in sanity/schemaTypes/documents/source.ts.
const SOURCE_TYPE_LABELS: Record<string, string> = {
  book: "Book",
  interview: "Interview",
  governmentRecord: "Government record",
  churchRecord: "Church record",
  schoolRecord: "School record",
  newspaper: "Newspaper",
  academicResearch: "Academic research",
  personalArchive: "Personal archive",
  oralTradition: "Oral tradition",
  website: "Website",
};

async function getTown(slug: string) {
  return getClient().fetch<TownPageData | null>(townBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const town = await getTown(slug).catch(() => null);
  return {
    title: town ? `About ${town.name} — Ozubulu Digital Archive` : undefined,
    description: town?.overview,
  };
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="font-serif text-[clamp(28px,3vw,34px)] leading-[1.2] font-semibold tracking-page-title text-uli-ink"
    >
      {children}
    </h2>
  );
}

const prose = "max-w-[720px] text-body-lg leading-[1.75] text-[#2E3440]";

export default async function TownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const town = await getTown(slug);
  if (!town) notFound();

  const {
    name,
    overview,
    historicalSummary,
    geography,
    location,
    neighbouringTowns,
    seasons,
    verificationStatus,
    researchStatus,
    updatedAt,
    featuredImage,
    communities,
    institution,
    featuredArticles,
    sources,
  } = town;

  const disputed = featuredArticles.find(
    (article) => article.verificationStatus === "disputed"
  );
  const geographyArticle = featuredArticles.find((article) =>
    /geograph/i.test(article.title)
  );
  const hasHistory =
    Array.isArray(historicalSummary) && historicalSummary.length > 0;
  const hasGeography =
    Boolean(geography) || neighbouringTowns.length > 0 || seasons.length > 0;

  const sections: OnThisPageItem[] = [
    hasHistory && { id: "history", label: "History" },
    hasGeography && { id: "geography", label: "Geography" },
    communities.length > 0 && {
      id: "communities",
      label:
        communities.length === 4 ? "The four communities" : "The communities",
    },
    institution && { id: "leadership", label: "Traditional institution" },
    { id: "sources", label: "Sources" },
  ].filter(Boolean) as OnThisPageItem[];

  const glance: { label: string; value: string }[] = [
    location && { label: "Location", value: location },
    communities.length > 0 && {
      label: "Communities",
      value: communities.map((c) => c.name).join(", "),
    },
    neighbouringTowns.length > 0 && {
      label: "Neighbours",
      value: neighbouringTowns.join(", "),
    },
    seasons.length > 0 && {
      label: "Seasons",
      value: seasons
        .map((s) => [s.name, s.period].filter(Boolean).join(", "))
        .join(" · "),
    },
    institution && { label: "Leadership", value: `The ${institution.name}` },
  ].filter(Boolean) as { label: string; value: string }[];

  const heroImage = featuredImage?.asset
    ? {
        src: urlFor(featuredImage)
          .width(1600)
          .height(610)
          .fit("crop")
          .auto("format")
          .url(),
        alt: featuredImage.alt ?? `Ozubulu`,
        caption: featuredImage.alt ?? name,
        credit: undefined,
      }
    : {
        src: "/images/ozubulu-aerial.jpg",
        alt: "Aerial view over Ozubulu: rooftops among dense green trees, a road running through the town, cloudy sky above.",
        caption: `${name} from the air`,
        credit:
          "Still from the archive’s hero video · Date and filmmaker to be confirmed",
      };

  return (
    <main className="flex-1 bg-background">
      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="page-title"
        className="pt-[clamp(32px,4vw,48px)] pb-[clamp(40px,5vw,64px)]"
      >
        <div className={cn(containerClass, "flex flex-col gap-8")}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 text-small text-[#5E5E57]">
              <li>
                <Link href="/" className="hover:text-camwood hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Discover</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-uli-ink">
                About {name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,80px)]">
            <div className="hero-enter flex flex-col gap-5">
              <p className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
                Discover
              </p>
              <h1
                id="page-title"
                className="font-serif text-[clamp(40px,5vw,60px)] leading-[1.1] font-bold tracking-hero text-uli-ink"
              >
                About {name}
              </h1>
              {overview && (
                <p className="max-w-[620px] text-[1.25rem] leading-[1.65] text-[#4A4A43]">
                  {overview}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 pt-1">
                <VerificationBadge status={verificationStatus} />
                <ResearchStatusBadge status={researchStatus} />
                <span className="text-[0.8125rem] text-[#5E5E57]">
                  {updatedAt &&
                    `Last updated ${new Date(updatedAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}`}
                  {updatedAt && sources.length > 0 && " · "}
                  {sources.length > 0 && (
                    <a href="#sources" className="hover:underline">
                      {sources.length}{" "}
                      {sources.length === 1 ? "source" : "sources"}
                    </a>
                  )}
                </span>
              </div>
            </div>

            {glance.length > 0 && (
              <aside
                aria-labelledby="glance-heading"
                data-reveal
                style={revealDelay(1)}
                className="flex flex-col gap-4 rounded-2xl border border-soft-clay bg-linen-white p-[clamp(24px,3vw,32px)] shadow-[0_1px_2px_rgba(27,36,54,0.04),0_8px_24px_rgba(27,36,54,0.05)]"
              >
                <h2
                  id="glance-heading"
                  className="font-serif text-[1.375rem] font-semibold text-uli-ink"
                >
                  At a glance
                </h2>
                <dl className="divide-y divide-mist-grey border-y border-mist-grey">
                  {glance.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[130px_1fr] gap-3 py-3"
                    >
                      <dt className="text-[0.8125rem] font-medium text-[#5E5E57]">
                        {row.label}
                      </dt>
                      <dd className="text-[0.9375rem] leading-normal text-uli-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </div>

          <figure data-reveal className="flex flex-col gap-2.5">
            <div className="relative aspect-[21/8] min-h-[200px] overflow-hidden rounded-2xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1120px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-col gap-0.5">
              <span className="text-[0.9375rem] font-medium text-uli-ink">
                {heroImage.caption}
              </span>
              {heroImage.credit && (
                <span className="text-[0.8125rem] text-[#5E5E57]">
                  {heroImage.credit}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Body: on-this-page list + sections ────────────────────────── */}
      <div className="border-t border-soft-clay bg-linen-white">
        <div
          className={cn(
            containerClass,
            "flex items-start gap-[clamp(32px,5vw,80px)] pt-[clamp(48px,6vw,80px)] pb-[clamp(56px,7vw,96px)]"
          )}
        >
          <OnThisPage items={sections} />

          <div className="flex min-w-0 flex-1 flex-col gap-[clamp(56px,6vw,80px)]">
            {hasHistory && (
              <section
                aria-labelledby="history-h"
                data-reveal
                className="flex scroll-mt-28 flex-col gap-5"
                id="history"
              >
                <SectionTitle id="history-h">History</SectionTitle>
                <div className={cn(prose, "flex flex-col gap-4")}>
                  <PortableText value={historicalSummary!} />
                </div>
                {disputed && (
                  <div className="flex max-w-[720px] items-start gap-3.5 rounded-xl border border-[#E2B6AC] bg-[#F6E4DF] px-4.5 py-4">
                    <AlertTriangleIcon
                      className="mt-0.5 size-5 flex-none text-[#8E2F22]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[0.9375rem] font-semibold text-[#8E2F22]">
                        Accounts differ
                      </p>
                      <p className="text-[0.9375rem] leading-[1.6] text-[#4A3A36]">
                        {disputed.summary ??
                          "Sources disagree on parts of this history. Our article sets out each account and where it comes from."}
                      </p>
                      <MoreLink
                        href={`/article/${disputed.slug}`}
                        className="text-[#8E2F22]"
                      >
                        {`Read “${disputed.title}”`}
                      </MoreLink>
                    </div>
                  </div>
                )}
              </section>
            )}

            {hasGeography && (
              <section
                aria-labelledby="geography-h"
                data-reveal
                className="flex scroll-mt-28 flex-col gap-5"
                id="geography"
              >
                <SectionTitle id="geography-h">Geography</SectionTitle>
                {geography && <p className={prose}>{geography}</p>}

                {neighbouringTowns.length > 0 && (
                  <div className="flex max-w-[720px] flex-col gap-3">
                    <h3 className="text-body font-semibold text-uli-ink">
                      Neighbouring towns
                    </h3>
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-2">
                      {neighbouringTowns.map((neighbour, index) => (
                        <li
                          key={neighbour}
                          data-reveal
                          style={revealDelay(index)}
                          className="rounded-[10px] border border-soft-clay bg-white px-3.5 py-3 text-[0.9375rem] font-medium text-uli-ink"
                        >
                          {neighbour}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[0.8125rem] text-[#5E5E57]">
                      An interactive map showing where each town lies is coming
                      later.
                    </p>
                  </div>
                )}

                {seasons.length > 0 && (
                  <ul className="grid max-w-[720px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
                    {seasons.map((season, index) => (
                      <li
                        key={season._key}
                        data-reveal
                        style={revealDelay(index)}
                        className={cn(
                          "flex flex-col gap-1.5 rounded-[14px] px-5.5 py-5",
                          /wet|rain/i.test(season.name ?? "")
                            ? "bg-[#E9EEE4]"
                            : "bg-[#F4EBD6]"
                        )}
                      >
                        <p
                          className={cn(
                            "text-caption font-medium tracking-label uppercase",
                            /wet|rain/i.test(season.name ?? "")
                              ? "text-cassava-leaf"
                              : "text-[#6E5128]"
                          )}
                        >
                          {season.name}
                        </p>
                        <p className="font-serif text-[1.375rem] font-semibold text-uli-ink">
                          {season.period}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {geographyArticle && (
                  <MoreLink href={`/article/${geographyArticle.slug}`}>
                    {`Read “${geographyArticle.title}”`}
                  </MoreLink>
                )}
              </section>
            )}

            {communities.length > 0 && (
              <section
                aria-labelledby="communities-h"
                className="flex scroll-mt-28 flex-col gap-5"
                id="communities"
              >
                <div data-reveal className="flex flex-col gap-5">
                  <SectionTitle id="communities-h">
                    {communities.length === 4
                      ? "The four communities"
                      : "The communities"}
                  </SectionTitle>
                  <p className={prose}>
                    Each community is self-governing, with its own Obi, villages
                    and story.
                  </p>
                </div>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
                  {communities.map((community, index) => (
                    <li
                      key={community._id}
                      data-reveal
                      style={revealDelay(index)}
                    >
                      <CommunityCard community={community} compact />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {institution && (
              <section
                aria-labelledby="leadership-h"
                className="flex scroll-mt-28 flex-col gap-5"
                id="leadership"
              >
                <div data-reveal className="flex flex-col gap-5">
                  <SectionTitle id="leadership-h">
                    Traditional institution
                  </SectionTitle>
                  {institution.overview && (
                    <p className={prose}>{institution.overview}</p>
                  )}
                </div>
                <div data-reveal>
                  <CouncilChart institution={institution} />
                </div>
                <p className="flex max-w-[620px] items-start gap-2.5 text-small leading-[1.6] text-[#4A4A43]">
                  <ShieldCheckIcon
                    className="mt-0.5 size-[18px] flex-none text-cassava-leaf"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Names and portraits of the current holders appear once they
                  have agreed to be featured.
                </p>
              </section>
            )}

            <section
              aria-labelledby="sources-h"
              data-reveal
              className="flex scroll-mt-28 flex-col gap-4"
              id="sources"
            >
              <SectionTitle id="sources-h">Sources</SectionTitle>
              {sources.length > 0 ? (
                <>
                  <p className="max-w-[720px] text-[0.9375rem] leading-[1.6] text-[#4A4A43]">
                    Everything on this page comes from the sources below. Where
                    only one source exists, we label the claim &ldquo;Single
                    source&rdquo; and keep looking for more.
                  </p>
                  <ol className="max-w-[720px] divide-y divide-soft-clay border-y border-soft-clay">
                    {sources.map((source, index) => (
                      <li key={source._id} className="flex gap-4 py-4">
                        <span className="font-serif text-[1.125rem] font-semibold text-[#7A5A30]">
                          {index + 1}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="text-body font-semibold text-uli-ink">
                            {source.title}
                          </span>
                          {source.author && (
                            <span className="text-small leading-[1.55] text-[#4A4A43]">
                              {source.author}
                            </span>
                          )}
                          {source.sourceType && (
                            <span className="text-caption font-medium tracking-label text-[#5E5E57] uppercase">
                              {SOURCE_TYPE_LABELS[source.sourceType] ??
                                source.sourceType}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <PlaceholderNotice label="Sourcing" subject={name} />
              )}
            </section>

            <section
              aria-labelledby="feedback-h"
              data-reveal
              className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-soft-clay bg-akpu-paper p-[clamp(24px,3vw,32px)]"
            >
              <div className="flex max-w-[520px] flex-col gap-1.5">
                <h2
                  id="feedback-h"
                  className="font-serif text-[1.375rem] font-semibold text-uli-ink"
                >
                  Know more about {name}?
                </h2>
                <p className="text-[0.9375rem] leading-[1.6] text-[#4A4A43]">
                  If something here is missing or wrong, tell us. Every
                  suggestion is checked by our editors before the page changes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/#support"
                  className="inline-flex min-h-12 items-center rounded-[10px] bg-camwood px-5 text-[0.9375rem] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#86402A] active:translate-y-0 active:scale-[0.98]"
                >
                  Suggest a correction
                </Link>
                <Link
                  href="/#support"
                  className="inline-flex min-h-12 items-center rounded-[10px] border border-camwood px-5 text-[0.9375rem] font-semibold text-camwood transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-camwood/5 active:translate-y-0 active:scale-[0.98]"
                >
                  Share what you know
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── Read more (full width) ────────────────────────────────────── */}
      {featuredArticles.length > 0 && (
        <section
          id="read-more"
          aria-labelledby="read-more-h"
          className="scroll-mt-28 border-t border-soft-clay"
        >
          <div
            className={cn(
              containerClass,
              "flex flex-col gap-8 py-[clamp(48px,6vw,88px)]"
            )}
          >
            <div data-reveal className="flex flex-col gap-3.5">
              <p className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
                Historical articles
              </p>
              <SectionTitle id="read-more-h">
                {`Read more about ${name}`}
              </SectionTitle>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
              {featuredArticles.map((article, index) => (
                <li key={article._id} data-reveal style={revealDelay(index)}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Continue exploring ────────────────────────────────────────── */}
      <section aria-label="Continue exploring" className="bg-uli-ink">
        <div
          className={cn(
            containerClass,
            "grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4 py-12"
          )}
        >
          <Link
            href="/"
            className="group flex flex-col gap-1.5 rounded-[14px] border border-linen-white/18 px-5.5 py-5 text-linen-white transition-colors hover:border-palm-gold hover:bg-linen-white/5"
          >
            <span className="text-caption font-medium tracking-label text-[#E3C17F] uppercase">
              Back to
            </span>
            <span className="font-serif text-[1.375rem] font-semibold">
              Home
            </span>
          </Link>
          <Link
            href="/#communities"
            className="group flex flex-col gap-1.5 rounded-[14px] border border-linen-white/18 px-5.5 py-5 text-linen-white transition-colors hover:border-palm-gold hover:bg-linen-white/5"
          >
            <span className="text-caption font-medium tracking-label text-[#E3C17F] uppercase">
              Next in Discover
            </span>
            <span className="inline-flex items-center gap-2 font-serif text-[1.375rem] font-semibold">
              The four communities
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
