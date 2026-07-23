import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { ResearchStatusBadge } from "@/components/shared/research-status-badge";
import { VerificationBadge } from "@/components/shared/verification-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClient } from "@/lib/sanity/client";
import { townBySlugQuery } from "@/lib/sanity/queries";
import type { TownPageData } from "@/lib/sanity/types";

export default async function TownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const town = await getClient().fetch<TownPageData | null>(townBySlugQuery, {
    slug,
  });

  if (!town) {
    notFound();
  }

  const {
    name,
    overview,
    historicalSummary,
    geography,
    verificationStatus,
    researchStatus,
    updatedAt,
    communities,
    featuredArticles,
    sources,
  } = town;

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <VerificationBadge status={verificationStatus} />
          <ResearchStatusBadge status={researchStatus} />
          {updatedAt && (
            <span className="text-caption text-muted-foreground">
              Last updated{" "}
              {new Date(updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <h1 className="mt-4 font-serif text-h1 tracking-page-title text-foreground">
          {name}
        </h1>
        {overview && (
          <p className="mt-6 max-w-[70ch] text-body-lg text-muted-foreground">
            {overview}
          </p>
        )}
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">History</h2>
          <div className="mt-6">
            {Array.isArray(historicalSummary) &&
            historicalSummary.length > 0 ? (
              <div className="space-y-4 text-body text-foreground [&_p]:leading-relaxed">
                <PortableText value={historicalSummary} />
              </div>
            ) : (
              <PlaceholderNotice label="The history" subject={name} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">Geography</h2>
          <div className="mt-6">
            {geography ? (
              <p className="text-body text-foreground leading-relaxed">
                {geography}
              </p>
            ) : (
              <PlaceholderNotice label="Geography" subject={name} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">Communities</h2>
          <p className="mt-2 text-body text-muted-foreground">
            The communities that make up {name}.
          </p>
          <div className="mt-8">
            {communities.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {communities.map((community) => (
                  <Link
                    key={community._id}
                    href={`/community/${community.slug}`}
                  >
                    <Card className="h-full transition-colors hover:bg-muted/40">
                      <CardHeader>
                        <CardTitle className="text-h5">
                          {community.name}
                        </CardTitle>
                        {community.description && (
                          <CardDescription className="mt-2 text-small">
                            {community.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <PlaceholderNotice
                label="The list of communities"
                subject={name}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">
            Featured Articles
          </h2>
          <div className="mt-8">
            {featuredArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featuredArticles.map((article) => (
                  <Link key={article._id} href={`/article/${article.slug}`}>
                    <Card className="h-full transition-colors hover:bg-muted/40">
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <VerificationBadge
                            status={article.verificationStatus}
                          />
                          <ResearchStatusBadge
                            status={article.researchStatus}
                          />
                        </div>
                        <CardTitle className="mt-2 text-h5">
                          {article.title}
                        </CardTitle>
                        {article.summary && (
                          <CardDescription className="mt-2 text-small">
                            {article.summary}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <PlaceholderNotice label="Featured articles" subject={name} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
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
              <PlaceholderNotice label="Sourcing" subject={name} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
