import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { ResearchStatusBadge } from "@/components/shared/research-status-badge";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { getClient } from "@/lib/sanity/client";
import { historicalArticleBySlugQuery } from "@/lib/sanity/queries";
import type { HistoricalArticlePageData } from "@/lib/sanity/types";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getClient().fetch<HistoricalArticlePageData | null>(
    historicalArticleBySlugQuery,
    { slug }
  );

  if (!article) {
    notFound();
  }

  const {
    title,
    summary,
    body,
    verificationStatus,
    researchStatus,
    publishedAt,
    updatedAt,
    communities,
    sources,
  } = article;

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[760px] px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <VerificationBadge status={verificationStatus} />
          <ResearchStatusBadge status={researchStatus} />
          {(updatedAt || publishedAt) && (
            <span className="text-caption text-muted-foreground">
              Last updated{" "}
              {new Date(updatedAt ?? publishedAt!).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <h1 className="mt-4 font-serif text-h1 tracking-page-title text-foreground">
          {title}
        </h1>
        {summary && (
          <p className="mt-6 text-body-lg text-muted-foreground">{summary}</p>
        )}
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <div className="space-y-4 text-body text-foreground [&_p]:leading-relaxed">
            {Array.isArray(body) && body.length > 0 ? (
              <PortableText value={body} />
            ) : (
              <PlaceholderNotice label="This article" subject={title} />
            )}
          </div>
        </div>
      </section>

      {communities.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-[760px] px-6 py-16">
            <h2 className="font-serif text-h4 text-foreground">
              Related Communities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {communities.map((community) => (
                <Link
                  key={community._id}
                  href={`/community/${community.slug}`}
                  className="rounded-full border border-border px-4 py-2 text-small text-foreground transition-colors hover:bg-muted"
                >
                  {community.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <h2 className="font-serif text-h4 text-foreground">Sources</h2>
          <div className="mt-6">
            {sources.length > 0 ? (
              <ul className="space-y-2">
                {sources.map((source) => (
                  <li
                    key={source._id}
                    className="text-small text-muted-foreground"
                  >
                    {source.title}
                    {source.author ? ` — ${source.author}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <PlaceholderNotice label="Sourcing" subject={title} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
