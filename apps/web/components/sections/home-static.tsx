// cSpell:ignore Ozubulu Anadu Nnubia Ezeifeukwu Oruche Amakwa Odenigbo Ezeani Eziora Duhaze
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { darkPhotoPlaceholderClass } from "@/components/sections/home-communities";
import {
  MoreLink,
  SectionHeading,
  containerClass,
  sectionPaddingClass,
} from "@/components/sections/section-heading";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { externalLinks } from "@/config/navigation";
import { revealDelay } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const chipClass =
  "inline-flex min-h-10 items-center rounded-full border border-soft-clay bg-white px-3.5 text-small leading-none font-medium text-uli-ink transition-[color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-camwood hover:text-camwood hover:shadow-[0_6px_16px_rgba(156,75,50,0.12)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold";

const cardShadow =
  "shadow-[0_1px_2px_rgba(27,36,54,0.04),0_8px_24px_rgba(27,36,54,0.05)]";

// ─── Welcome ─────────────────────────────────────────────────────────────────

const START_LINKS = [
  { label: "About Ozubulu", href: "/town/ozubulu" },
  { label: "The four communities", href: "/#communities" },
  { label: "Traditional institution", href: "/#people" },
  { label: "History", href: "/#history" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Suggest a correction", href: "/#support" },
];

export function HomeWelcome() {
  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className={cn("scroll-mt-22", sectionPaddingClass)}
    >
      <div
        className={cn(
          containerClass,
          "grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(40px,6vw,96px)]"
        )}
      >
        <div data-reveal className="flex flex-col gap-5">
          <p className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
            Welcome
          </p>
          <h2
            id="welcome-heading"
            className="font-serif text-[clamp(30px,3.4vw,40px)] leading-[1.2] font-semibold tracking-page-title text-uli-ink"
          >
            A home for Ozubulu&rsquo;s memory
          </h2>
          <p className="max-w-[640px] text-body-lg leading-[1.7] text-[#4A4A43]">
            Many of our stories live only in people&rsquo;s memories. Old
            photographs are being lost, and important documents are hard to
            find. This archive gathers them in one place &mdash; for people at
            home, across Nigeria and in the diaspora, and for generations not
            yet born.
          </p>
          <p className="max-w-[640px] text-body-lg leading-[1.7] text-[#4A4A43]">
            Every page shows where its information came from and how sure we are
            of it. When something cannot be verified, we say so.
          </p>
          <p className="mt-2 font-serif text-[1.0625rem] text-[#5E5E57] italic">
            &mdash; The Editorial Team
          </p>
        </div>

        <div
          data-reveal
          style={revealDelay(1)}
          className={cn(
            "flex flex-col gap-5 rounded-2xl border border-soft-clay bg-linen-white p-[clamp(24px,3vw,40px)]",
            cardShadow
          )}
        >
          <h3 className="font-serif text-[1.625rem] leading-[1.25] font-semibold text-uli-ink">
            Where should I start?
          </h3>
          <form action="/search" role="search" className="flex flex-col gap-2">
            <label
              htmlFor="home-search"
              className="text-small font-medium text-uli-ink"
            >
              Search the archive
            </label>
            <div className="flex gap-2">
              <input
                id="home-search"
                name="q"
                type="search"
                placeholder="A village, a family name, a festival…"
                className="h-13 min-w-0 flex-1 rounded-[10px] border border-[#C9C0B1] bg-white px-4 text-body text-uli-ink placeholder:text-[#6B6B63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
              />
              <button
                type="submit"
                className="inline-flex min-h-13 items-center justify-center rounded-[10px] border border-camwood bg-camwood px-5 text-body font-semibold tracking-button text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#86402A] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-3">
            <p className="text-[0.8125rem] font-medium text-[#4A4A43]">
              Or begin with
            </p>
            <ul className="flex flex-wrap gap-2">
              {START_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={chipClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── History ─────────────────────────────────────────────────────────────────

// Editorial content approved in the homepage design. It comes from the
// content-staging notes (docs/content-staging/) and carries the verification
// status those notes give it. Move it into Sanity once the timeline content
// type exists (Roadmap: Historical Timeline).
type TimelineStatus = "underResearch" | "oralTradition" | "underReview";

const TIMELINE: {
  date: string;
  title: string;
  body: string;
  status: TimelineStatus;
}[] = [
  {
    date: "Before 1900",
    title: "How the four communities came to be",
    body: "Accounts of the origins of Amakwa, Egbema, Eziora and Nza are being gathered from elders.",
    status: "underResearch",
  },
  {
    date: "1904",
    title: "Christianity comes to Ozubulu",
    body: "Remembered as the work of Paramount Chief Edward Nnubia Anadu and Obi Ezeifeukwu Oruche I of Amakwa.",
    status: "oralTradition",
  },
  {
    date: "1906",
    title: "A Catholic church at Eziora",
    body: "Chief Odenigbo Ezeani of Eziora worked with Rev. Fr. Cluny and Rev. Fr. Victor Duhaze to establish it.",
    status: "underReview",
  },
];

function TimelineBadge({ status }: { status: TimelineStatus }) {
  if (status !== "underResearch") return <VerificationBadge status={status} />;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CFCBC0] bg-[#EDEAE2] px-2.5 py-1 text-[0.6875rem] leading-[1.3] font-medium tracking-label whitespace-nowrap text-[#55554E] uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-palm-gold" />
      Under research
    </span>
  );
}

const LABELS: { status: string; meaning: string }[] = [
  { status: "verified", meaning: "Confirmed by reliable records." },
  { status: "multipleSources", meaning: "Independent sources agree." },
  {
    status: "singleSource",
    meaning: "One source so far; we are looking for more.",
  },
  { status: "oralTradition", meaning: "Passed down by word of mouth." },
  { status: "underReview", meaning: "Our editors are checking it." },
  { status: "disputed", meaning: "Accounts differ. We show each one." },
];

export function HomeHistory() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className={cn("scroll-mt-22", sectionPaddingClass)}
    >
      <div
        className={cn(
          containerClass,
          "grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[clamp(40px,6vw,96px)]"
        )}
      >
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="history-heading"
            eyebrow="History"
            title="History, told carefully"
          >
            <p>
              We publish what the evidence supports and label what it does not.
              These are some of the moments we are researching now.
            </p>
          </SectionHeading>

          <ol className="flex flex-col gap-9 border-l-2 border-bronze-heritage pl-7">
            {TIMELINE.map((entry, index) => (
              <li
                key={entry.date}
                data-reveal
                style={revealDelay(index)}
                className="relative flex flex-col gap-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "timeline-dot absolute top-1.5 -left-9 size-3 rounded-full border-2 border-bronze-heritage",
                    index === 0 ? "bg-akpu-paper" : "bg-bronze-heritage"
                  )}
                />
                <p className="font-serif text-[1.25rem] font-semibold text-[#7A5A30]">
                  {entry.date}
                </p>
                <h3 className="text-[1.1875rem] leading-[1.35] font-semibold text-uli-ink">
                  {entry.title}
                </h3>
                <p className="text-body leading-[1.7] text-[#4A4A43]">
                  {entry.body}
                </p>
                <div className="self-start">
                  <TimelineBadge status={entry.status} />
                </div>
              </li>
            ))}
          </ol>
          <MoreLink href="/town/ozubulu">Read the history of Ozubulu</MoreLink>
        </div>

        <aside
          data-reveal
          style={revealDelay(1)}
          aria-labelledby="labels-heading"
          className={cn(
            "flex flex-col gap-5 rounded-2xl border border-soft-clay bg-linen-white p-[clamp(24px,3vw,36px)]",
            cardShadow
          )}
        >
          <div className="flex flex-col gap-2">
            <h3
              id="labels-heading"
              className="font-serif text-h4 font-semibold text-uli-ink"
            >
              How to read our labels
            </h3>
            <p className="text-body leading-[1.6] text-[#4A4A43]">
              Every claim on this site carries one of these, so you always know
              how sure we are.
            </p>
          </div>
          <dl className="divide-y divide-mist-grey border-y border-mist-grey">
            {LABELS.map((label) => (
              <div
                key={label.status}
                className="grid grid-cols-[160px_1fr] items-center gap-4 py-3.5"
              >
                <dt>
                  <VerificationBadge status={label.status} />
                </dt>
                <dd className="text-[0.9375rem] leading-normal text-[#4A4A43]">
                  {label.meaning}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={externalLinks.editorialPolicy}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 self-start rounded-sm text-[0.9375rem] font-semibold tracking-button text-camwood underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold"
          >
            Read our editorial policy
            <ArrowRightIcon
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </aside>
      </div>
    </section>
  );
}

// ─── Heritage & Culture ──────────────────────────────────────────────────────

const HERITAGE_TOPICS: { title: string; description: string }[] = [
  { title: "Festivals", description: "When they happen, and what they mean." },
  { title: "Masquerades", description: "Their names, roles and seasons." },
  {
    title: "Traditional marriage",
    description: "The steps, and the families behind them.",
  },
  { title: "Customs", description: "How life’s moments are marked." },
  {
    title: "Language & proverbs",
    description: "Words and sayings worth keeping.",
  },
  {
    title: "Food",
    description: "Dishes, recipes and the stories at the table.",
  },
  {
    title: "Music & dance",
    description: "Songs, instruments and dance groups.",
  },
  { title: "Traditional attire", description: "What is worn, and when." },
];

export function HomeHeritage() {
  return (
    <section
      id="heritage"
      aria-labelledby="heritage-heading"
      className={cn(
        "scroll-mt-22 border-t border-soft-clay bg-linen-white",
        sectionPaddingClass
      )}
    >
      <div className={cn(containerClass, "flex flex-col gap-12")}>
        <SectionHeading
          id="heritage-heading"
          eyebrow="Heritage & Culture"
          title="Living traditions"
        >
          <p>
            Heritage is not only history. It is the living identity of our
            people &mdash; how we gather, celebrate, marry, speak and remember.
          </p>
        </SectionHeading>

        {/* Each tile takes a background photograph once one has been
            contributed and captioned. Topic pages are not built yet, so the
            tiles are not links and say so. */}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
          {HERITAGE_TOPICS.map((topic, index) => (
            <li
              key={topic.title}
              data-reveal
              style={revealDelay(index % 4)}
              className={cn(
                "group relative flex min-h-60 flex-col justify-end overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,27,41,0.25)]",
                darkPhotoPlaceholderClass
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[rgba(20,27,41,0.88)] via-[rgba(20,27,41,0.45)] to-[rgba(20,27,41,0.12)] transition-opacity duration-300 group-hover:opacity-85"
              />
              <span className="absolute top-3.5 right-3.5 z-10 rounded-md border border-dashed border-linen-white/35 px-2 py-1.5 text-[0.6875rem] leading-none font-medium tracking-label text-linen-white/80 uppercase">
                Coming later
              </span>
              <div className="relative z-10 flex flex-col gap-1.5 p-6">
                <h3 className="font-serif text-[1.375rem] font-semibold text-linen-white transition-transform duration-300 group-hover:-translate-y-0.5">
                  {topic.title}
                </h3>
                <p className="text-[0.9375rem] leading-normal text-[#E4DFD4]">
                  {topic.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Motto ───────────────────────────────────────────────────────────────────

export function HomeMotto() {
  return (
    <section aria-label="Our motto" className="bg-uli-ink text-linen-white">
      <figure
        className={cn(
          containerClass,
          "flex flex-col items-center gap-6 py-[clamp(64px,9vw,120px)] text-center"
        )}
      >
        <span
          aria-hidden="true"
          data-reveal="fade"
          className="h-0.5 w-12 bg-palm-gold"
        />
        <blockquote
          data-reveal
          style={revealDelay(1)}
          className="max-w-[820px] font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.3] font-medium tracking-[-0.01em] italic"
        >
          &ldquo;A community that preserves its history preserves its
          identity.&rdquo;
        </blockquote>
        <figcaption
          data-reveal="fade"
          style={revealDelay(2)}
          className="text-[0.8125rem] tracking-[0.1em] text-[#E3C17F] uppercase"
        >
          The Ozubulu Digital Archive
        </figcaption>
      </figure>
    </section>
  );
}
