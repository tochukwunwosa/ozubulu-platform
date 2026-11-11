import type { Metadata } from "next";
import Link from "next/link";

import {
  containerClass,
  sectionPaddingClass,
} from "@/components/sections/section-heading";
import { searchArchive } from "@/lib/sanity/fetchers";
import type { SearchResult } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Search — Ozubulu Digital Archive",
};

const TYPE_LABELS: Record<SearchResult["_type"], string> = {
  community: "Community",
  village: "Village",
  traditionalInstitution: "Traditional institution",
  historicalArticle: "Article",
  person: "Person",
};

function resultHref(result: SearchResult): string | undefined {
  switch (result._type) {
    case "community":
      return result.slug ? `/community/${result.slug}` : undefined;
    case "historicalArticle":
      return result.slug ? `/article/${result.slug}` : undefined;
    case "village":
      // Villages are listed on their community's page until they have
      // pages of their own.
      return result.communitySlug
        ? `/community/${result.communitySlug}`
        : undefined;
    default:
      return undefined;
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? "";
  const results = query ? await searchArchive(query) : [];

  return (
    <main className="flex-1 bg-background">
      <section className={cn(containerClass, sectionPaddingClass, "max-w-4xl")}>
        <p className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
          Explore
        </p>
        <h1 className="mt-4 font-serif text-[clamp(32px,4vw,48px)] leading-[1.2] font-bold tracking-page-title text-uli-ink">
          Search the archive
        </h1>

        <form action="/search" role="search" className="mt-8 flex gap-2">
          <label htmlFor="search-page-input" className="sr-only">
            Search the archive
          </label>
          <input
            id="search-page-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="A village, a family name, a festival…"
            className="h-13 min-w-0 flex-1 rounded-[10px] border border-[#C9C0B1] bg-white px-4 text-body text-uli-ink placeholder:text-[#6B6B63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
          />
          <button
            type="submit"
            className="inline-flex min-h-13 items-center justify-center rounded-[10px] border border-camwood bg-camwood px-5 text-body font-semibold tracking-button text-white hover:bg-[#86402A] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold"
          >
            Search
          </button>
        </form>

        <div className="mt-10" aria-live="polite">
          {!query ? (
            <p className="text-body-lg text-[#4A4A43]">
              Search communities, villages, people and historical articles.
            </p>
          ) : results === null ? (
            <p className="text-body-lg text-[#4A4A43]">
              Search isn&rsquo;t available just now. Please try again later.
            </p>
          ) : results.length === 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-body-lg text-[#4A4A43]">
                Nothing in the archive matches &ldquo;{query}&rdquo; yet.
              </p>
              <p className="text-body text-[#4A4A43]">
                The archive is still growing. If you know about this, we would
                love to hear from you.{" "}
                <Link
                  href="/#support"
                  className="font-semibold text-camwood underline underline-offset-4"
                >
                  Ways to help
                </Link>
              </p>
            </div>
          ) : (
            <>
              <p className="text-small text-[#5E5E57]">
                {results.length} {results.length === 1 ? "result" : "results"}{" "}
                for &ldquo;{query}&rdquo;
              </p>
              <ul className="mt-4 divide-y divide-soft-clay border-y border-soft-clay">
                {results.map((result) => (
                  <li key={result._id}>
                    <SearchResultRow result={result} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function SearchResultRow({ result }: { result: SearchResult }) {
  const href = resultHref(result);
  const content = (
    <>
      <span className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
        {TYPE_LABELS[result._type]}
        {result._type === "village" && result.communityName
          ? ` · ${result.communityName}`
          : ""}
      </span>
      <span className="font-serif text-[1.375rem] font-semibold text-uli-ink">
        {result.title}
      </span>
      {result.titles && result.titles.length > 0 && (
        <span className="font-serif text-body text-[#7A5A30] italic">
          {result.titles.join(" · ")}
        </span>
      )}
      {result.excerpt && (
        <span className="line-clamp-2 text-body text-[#4A4A43]">
          {result.excerpt}
        </span>
      )}
    </>
  );

  if (!href) {
    return <div className="flex flex-col gap-1.5 py-5">{content}</div>;
  }

  return (
    <Link
      href={href}
      className="flex flex-col gap-1.5 py-5 hover:bg-linen-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
    >
      {content}
    </Link>
  );
}
