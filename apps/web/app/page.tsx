import Link from "next/link";

import { SiteHero } from "@/components/hero/site-hero";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCommunitiesList } from "@/lib/sanity/fetchers";

export default async function Home() {
  const communities = await getCommunitiesList();

  return (
    <main className="flex-1 bg-background">
      <SiteHero />

      <section id="communities" className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif text-h3 text-foreground">Communities</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Ozubulu is made up of four communities. Explore each one to learn
            its history, villages, and traditional institution.
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
              <PlaceholderNotice label="The list of communities" />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
