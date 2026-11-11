import { UserRoundIcon } from "lucide-react";
import Image from "next/image";

import { VerificationBadge } from "@/components/shared/verification-badge";
import { urlFor } from "@/lib/sanity/image";
import type { HomeInstitution } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type LeadershipEntry = HomeInstitution["leadership"][number];

// Leadership titles in Sanity read like "Obi of Egbema (Eze-Enyidunobi)":
// the role, then the honorific in brackets.
export function splitTitle(title: string): {
  role: string;
  honorific?: string;
} {
  const match = title.match(/^(.*?)\s*\((.+)\)\s*$/);
  return match ? { role: match[1], honorific: match[2] } : { role: title };
}

// Prefer the person's own titles (public profiles only), else the honorific
// written into the leadership title.
export function honorificFor(entry: LeadershipEntry): string | undefined {
  if (entry.titles && entry.titles.length > 0) return entry.titles.join(" · ");
  return splitTitle(entry.title).honorific;
}

export function Portrait({
  entry,
  large = false,
}: {
  entry: LeadershipEntry;
  large?: boolean;
}) {
  const image = entry.portrait?.image;
  const sizeClass = large ? "size-22" : "size-16";

  return (
    <span
      className={cn(
        "relative flex flex-none items-center justify-center overflow-hidden rounded-full border-2 border-palm-gold bg-[#3A4254] bg-[repeating-linear-gradient(135deg,rgba(250,248,242,0.07)_0_1px,transparent_1px_10px)] text-linen-white/55 transition-transform duration-300 group-hover:scale-105",
        sizeClass,
        large && "shadow-[0_0_0_4px_rgba(199,154,61,0.18)]"
      )}
    >
      {/* Photo only when the holder's profile is public (see homePageQuery). */}
      {image?.asset ? (
        <Image
          src={urlFor(image)
            .width(176)
            .height(176)
            .fit("crop")
            .auto("format")
            .url()}
          alt={
            entry.portrait?.altText ??
            `Portrait of ${entry.name ?? splitTitle(entry.title).role}`
          }
          fill
          sizes={large ? "88px" : "64px"}
          className="object-cover"
        />
      ) : (
        <UserRoundIcon
          className={large ? "size-9" : "size-6.5"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export function LeadershipCard({
  institution,
}: {
  institution: HomeInstitution;
}) {
  const entries = institution.leadership;
  const paramountIndex = Math.max(
    0,
    entries.findIndex((entry) => /igwe/i.test(entry.title))
  );
  const paramount = entries[paramountIndex];
  const others = entries.filter((_, index) => index !== paramountIndex);

  return (
    <div
      data-reveal
      className="group flex flex-col gap-5.5 rounded-2xl bg-uli-ink p-[clamp(28px,3vw,40px)] text-linen-white"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption font-medium tracking-label text-[#E3C17F] uppercase">
          Traditional institution
        </p>
        <VerificationBadge status={institution.verificationStatus} />
      </div>
      <h3 className="font-serif text-[1.875rem] leading-[1.2] font-semibold">
        The Igwe and the {institution.name}
      </h3>

      {paramount && (
        <div className="flex items-center gap-4.5 rounded-2xl border border-palm-gold/55 bg-palm-gold/10 p-4.5">
          <Portrait entry={paramount} large />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-serif text-[1.375rem] leading-[1.2] font-semibold">
              {splitTitle(paramount.title).role}
            </span>
            {/* Name only when the holder's profile is public. */}
            {paramount.name && (
              <span className="text-small text-[#D9D3C4]">
                {paramount.name}
              </span>
            )}
            {paramount.titles && paramount.titles.length > 0 && (
              <span className="font-serif text-small text-[#E3C17F] italic">
                {paramount.titles.join(" · ")}
              </span>
            )}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {others.map((entry) => {
            const honorific = honorificFor(entry);
            return (
              <li
                key={entry._key}
                className="flex flex-col items-center gap-2 rounded-[14px] border border-linen-white/16 bg-linen-white/4 px-2.5 py-4 text-center"
              >
                <Portrait entry={entry} />
                <span className="font-serif text-body leading-[1.25] font-semibold">
                  {splitTitle(entry.title).role}
                </span>
                {entry.name && (
                  <span className="text-[0.8125rem] text-[#D9D3C4]">
                    {entry.name}
                  </span>
                )}
                {honorific && (
                  <span className="font-serif text-small text-[#E3C17F] italic">
                    {honorific}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
