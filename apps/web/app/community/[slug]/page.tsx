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
import {
  communitiesListQuery,
  communityBySlugQuery,
} from "@/lib/sanity/queries";
import type { CommunityPageData, CommunitySummary } from "@/lib/sanity/types";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClient();
  const [community, allCommunities] = await Promise.all([
    client.fetch<CommunityPageData | null>(communityBySlugQuery, { slug }),
    client.fetch<CommunitySummary[]>(communitiesListQuery),
  ]);

  if (!community) {
    notFound();
  }

  const otherCommunities = allCommunities.filter((c) => c.slug !== slug);

  const {
    name,
    description,
    history,
    verificationStatus,
    researchStatus,
    updatedAt,
    villages,
    institutions,
    sources,
  } = community;

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
        {description && (
          <p className="mt-6 max-w-[70ch] text-body-lg text-muted-foreground">
            {description}
          </p>
        )}
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">History</h2>
          <div className="mt-6">
            {Array.isArray(history) && history.length > 0 ? (
              <div className="space-y-4 text-body text-foreground [&_p]:leading-relaxed">
                <PortableText value={history} />
              </div>
            ) : (
              <PlaceholderNotice label="The history" subject={name} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-h3 text-foreground">Villages</h2>
            {villages.length === 0 && (
              <ResearchStatusBadge status="comingSoon" />
            )}
          </div>
          <p className="mt-2 text-body text-muted-foreground">
            The kindreds that make up {name}.
          </p>
          <div className="mt-8">
            {villages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {villages.map((village) => (
                  <Card key={village._id}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-h5">
                          {village.name}
                        </CardTitle>
                        <ResearchStatusBadge status={village.researchStatus} />
                      </div>
                      {village.igboName &&
                        village.igboName !== village.name && (
                          <CardDescription>{village.igboName}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                      {village.meaning ? (
                        <p className="text-small text-muted-foreground">
                          {village.meaning}
                        </p>
                      ) : (
                        <PlaceholderNotice
                          label="Detail"
                          subject={village.name}
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <PlaceholderNotice label="The list of villages" subject={name} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">
            Traditional Institution
          </h2>
          <div className="mt-8">
            {institutions.length > 0 ? (
              <div className="space-y-6">
                {institutions.map((institution) => (
                  <Card key={institution._id}>
                    <CardHeader>
                      <CardTitle className="text-h4">
                        {institution.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {institution.overview ? (
                        <p className="text-body text-muted-foreground">
                          {institution.overview}
                        </p>
                      ) : (
                        <PlaceholderNotice subject={institution.name} />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <PlaceholderNotice
                label="Traditional institution information"
                subject={name}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-h4 text-foreground">Sources</h2>
            {sources.length === 0 && (
              <ResearchStatusBadge status="comingSoon" />
            )}
          </div>
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

      {otherCommunities.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="font-serif text-h4 text-foreground">
              Other Communities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {otherCommunities.map((c) => (
                <Link
                  key={c._id}
                  href={`/community/${c.slug}`}
                  className="rounded-full border border-border px-4 py-2 text-small text-foreground transition-colors hover:bg-muted"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
