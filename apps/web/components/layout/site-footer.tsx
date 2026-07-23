import Link from "next/link";

import type { CommunitySummary } from "@/lib/sanity/types";

export function SiteFooter({
  communities,
}: {
  communities: CommunitySummary[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-h5 text-foreground">
              Ozubulu Digital Archive
            </p>
            <p className="mt-2 text-small text-muted-foreground">
              Preserving the history, heritage, and stories of Ozubulu for
              generations to come.
            </p>
          </div>
          <div>
            <p className="text-caption font-medium tracking-label text-muted-foreground uppercase">
              Communities
            </p>
            <ul className="mt-3 space-y-2">
              {communities.map((community) => (
                <li key={community._id}>
                  <Link
                    href={`/community/${community.slug}`}
                    className="text-small text-foreground hover:text-primary"
                  >
                    {community.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 text-caption text-muted-foreground">
          © {year} Ozubulu Digital Archive. This is an early preview — content
          is still being verified and expanded.
        </p>
      </div>
    </footer>
  );
}
