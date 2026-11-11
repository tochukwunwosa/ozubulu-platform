import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  darkPhotoPlaceholderClass,
  photoPlaceholderClass,
} from "@/components/sections/home-communities";
import { LeadershipCard } from "@/components/sections/leadership-card";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import {
  MoreLink,
  SectionHeading,
  containerClass,
  sectionPaddingClass,
} from "@/components/sections/section-heading";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { revealDelay } from "@/components/motion/reveal";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { externalLinks } from "@/config/navigation";
import { urlFor } from "@/lib/sanity/image";
import type {
  HomeArticle,
  HomeInstitution,
  HomePerson,
  HomePhotograph,
} from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const cardClass =
  "overflow-hidden rounded-2xl border border-soft-clay bg-linen-white shadow-[0_1px_2px_rgba(27,36,54,0.04),0_8px_24px_rgba(27,36,54,0.05)]";

const cardHoverClass =
  "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(27,36,54,0.05),0_14px_32px_rgba(27,36,54,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0";

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function HomeGallery({
  photographs,
}: {
  photographs: HomePhotograph[];
}) {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className={cn("scroll-mt-22", sectionPaddingClass)}
    >
      <div className={cn(containerClass, "flex flex-col gap-12")}>
        <SectionHeading
          id="gallery-heading"
          eyebrow="Gallery"
          title="Photographs as evidence"
        >
          <p>
            Every photograph carries its caption, date, place and source &mdash;
            because a picture without context is easily lost again.
          </p>
        </SectionHeading>

        {photographs.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {photographs.map((photo, index) => (
              <GalleryFigure
                key={photo._id}
                index={index}
                photo={photo}
                featured={index === 0 && photographs.length > 2}
              />
            ))}
            <div
              data-reveal
              style={revealDelay(photographs.length)}
              className="flex min-h-[220px] flex-col justify-center gap-3 rounded-xl border border-dashed border-[#B5AC9C] p-7 transition-colors duration-300 hover:border-camwood hover:bg-linen-white"
            >
              <h3 className="font-serif text-[1.375rem] font-semibold text-uli-ink">
                Have an old photograph?
              </h3>
              <p className="text-[0.9375rem] leading-[1.6] text-[#4A4A43]">
                Family albums hold much of our history. Share a scan and we will
                credit you by name.
              </p>
              <MoreLink href="/#support">Share a photograph</MoreLink>
            </div>
          </div>
        ) : (
          <GalleryEmptyState />
        )}
      </div>
    </section>
  );
}

const PHOTO_CHECKLIST = [
  { title: "What it shows", detail: "The people, place or event." },
  { title: "When", detail: "The year, or your best guess." },
  { title: "Where", detail: "The village or community." },
  { title: "Who took it", detail: "Or whose album it came from." },
];

// Shown until the first photographs are published: an invitation plus what
// each photograph needs, rather than empty frames.
function GalleryEmptyState() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-6">
      <div
        data-reveal
        className={cn(
          "relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl",
          darkPhotoPlaceholderClass
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-[rgba(20,27,41,0.92)] via-[rgba(20,27,41,0.55)] to-[rgba(20,27,41,0.15)]"
        />
        <div className="relative z-10 flex flex-col gap-3 p-[clamp(24px,3vw,40px)]">
          <p className="text-caption font-medium tracking-label text-[#E3C17F] uppercase">
            The gallery opens soon
          </p>
          <h3 className="font-serif text-[clamp(26px,2.6vw,32px)] leading-[1.2] font-semibold text-linen-white">
            Have an old photograph?
          </h3>
          <p className="max-w-[460px] text-body leading-[1.7] text-[#E4DFD4]">
            Family albums hold much of our history. Share a scan and we will
            credit you by name. The first photographs will appear here once they
            are captioned and checked.
          </p>
          <Link
            href="/#support"
            className="mt-2 inline-flex min-h-12 items-center justify-center self-start rounded-[10px] border border-linen-white bg-linen-white px-6 text-body font-semibold tracking-button text-uli-ink transition-colors hover:bg-[#EDE8DC] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold"
          >
            Share a photograph
          </Link>
        </div>
      </div>

      <div
        data-reveal
        style={revealDelay(1)}
        className="flex flex-col gap-5 rounded-2xl border border-soft-clay bg-linen-white p-[clamp(24px,3vw,36px)]"
      >
        <h3 className="font-serif text-h4 font-semibold text-uli-ink">
          What to send with it
        </h3>
        <p className="text-body leading-[1.6] text-[#4A4A43]">
          A picture without context is easily lost again. Tell us as much as you
          know &mdash; &ldquo;not sure&rdquo; is a fine answer.
        </p>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-6 border-t border-mist-grey">
          {PHOTO_CHECKLIST.map((item, index) => (
            <li
              key={item.title}
              className="flex gap-3 border-b border-mist-grey py-3.5"
            >
              <span
                aria-hidden="true"
                className="font-serif text-[1.25rem] leading-none font-semibold text-[#7A5A30]"
              >
                {index + 1}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[0.9375rem] font-semibold text-uli-ink">
                  {item.title}
                </span>
                <span className="text-small text-[#5E5E57]">{item.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function GalleryFigure({
  photo,
  featured,
  index,
}: {
  photo: HomePhotograph;
  featured: boolean;
  index: number;
}) {
  const year = photo.dateTaken?.slice(0, 4);
  const credit = photo.photographer ?? photo.contributor;
  const meta = [
    year,
    photo.location,
    credit ? `Photo: ${credit}` : undefined,
  ].filter(Boolean);

  return (
    <figure
      data-reveal
      style={revealDelay(index)}
      className={cn("group flex flex-col gap-3", featured && "lg:row-span-2")}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          featured
            ? "aspect-[4/3] lg:aspect-auto lg:min-h-[360px] lg:flex-1"
            : "aspect-[4/3]"
        )}
      >
        <Image
          src={urlFor(photo.image).width(1200).auto("format").url()}
          alt={photo.altText ?? photo.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="flex flex-col gap-1">
        <span
          className={cn(
            "font-medium text-uli-ink",
            featured ? "text-body" : "text-[0.9375rem]"
          )}
        >
          {photo.title}
        </span>
        {meta.length > 0 && (
          <span className="text-[0.8125rem] leading-normal text-[#5E5E57]">
            {meta.join(" · ")}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

// ─── People & leadership ─────────────────────────────────────────────────────

export function HomePeople({
  institution,
  people,
}: {
  institution: HomeInstitution | null;
  people: HomePerson[];
}) {
  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className={cn(
        "scroll-mt-22 border-y border-soft-clay bg-linen-white",
        sectionPaddingClass
      )}
    >
      <div className={cn(containerClass, "flex flex-col gap-12")}>
        <SectionHeading
          id="people-heading"
          eyebrow="Community"
          title="People and leadership"
        >
          <p>
            The men and women who shaped Ozubulu, and the traditional
            institution that guides it today.
          </p>
        </SectionHeading>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-stretch gap-6">
          {institution ? (
            <LeadershipCard institution={institution} />
          ) : (
            <PlaceholderNotice label="The traditional institution section" />
          )}

          <div className="flex flex-col gap-4">
            {people.length > 0 ? (
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-4">
                {people.map((person, index) => (
                  <li
                    key={person._id}
                    data-reveal
                    style={revealDelay(index + 1)}
                    className={cn(cardClass, cardHoverClass, "group")}
                  >
                    <PersonPortrait person={person} />
                    <div className="flex flex-col gap-1 p-4">
                      <span className="font-serif text-[1.125rem] font-semibold text-uli-ink">
                        {person.fullName}
                      </span>
                      {person.titles && person.titles.length > 0 && (
                        <span className="font-serif text-small text-[#7A5A30] italic">
                          {person.titles.join(" · ")}
                        </span>
                      )}
                      {(person.occupation || person.community) && (
                        <span className="text-[0.8125rem] text-[#5E5E57]">
                          {[person.occupation, person.community]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <PeopleEmptyState />
            )}
            <p
              data-reveal="fade"
              style={revealDelay(2)}
              className="flex items-start gap-2.5 rounded-xl bg-akpu-paper px-4 py-3.5 text-small leading-[1.6] text-[#4A4A43]"
            >
              <ShieldCheckIcon
                className="mt-0.5 size-[18px] flex-none text-cassava-leaf"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              We publish the life stories of notable people, both living and
              departed. For living people, we ask their consent first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Shown until the first profiles are published (public, and deceased or
// with consent). Three quiet portrait frames keep the layout of the design.
function PeopleEmptyState() {
  return (
    <div
      data-reveal
      style={revealDelay(1)}
      className={cn(cardClass, "flex flex-1 flex-col")}
    >
      <div className="grid grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((frame) => (
          <div
            key={frame}
            className={cn(
              "aspect-square border-r border-soft-clay last:border-r-0",
              photoPlaceholderClass
            )}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-serif text-[1.375rem] font-semibold text-uli-ink">
          Profiles are being prepared
        </h3>
        <p className="text-body leading-[1.65] text-[#4A4A43]">
          We are gathering the life stories of people who shaped Ozubulu &mdash;
          leaders, teachers, traders, artists and more. Each profile is checked
          against sources before it is published.
        </p>
        <MoreLink href="/#support" className="mt-auto pt-1">
          Suggest a notable person
        </MoreLink>
      </div>
    </div>
  );
}

function PersonPortrait({ person }: { person: HomePerson }) {
  const image = person.photo?.image;
  if (!image?.asset) {
    return (
      <div
        className={cn("aspect-square", photoPlaceholderClass)}
        aria-hidden="true"
      />
    );
  }
  return (
    <div className="relative aspect-square">
      <Image
        src={urlFor(image)
          .width(480)
          .height(480)
          .fit("crop")
          .auto("format")
          .url()}
        alt={person.photo?.altText ?? `Portrait of ${person.fullName}`}
        fill
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

// ─── Latest stories ──────────────────────────────────────────────────────────

// Roughly 200 words a minute at about 5.5 characters per word.
const CHARACTERS_PER_MINUTE = 1100;

export function HomeStories({ articles }: { articles: HomeArticle[] }) {
  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className={cn("scroll-mt-22", sectionPaddingClass)}
    >
      <div className={cn(containerClass, "flex flex-col gap-12")}>
        <SectionHeading
          id="stories-heading"
          eyebrow="Historical articles"
          title="Latest stories"
        />

        {articles.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {articles.map((article, index) => (
              <li key={article._id} data-reveal style={revealDelay(index)}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderNotice label="The collection of historical articles" />
        )}
      </div>
    </section>
  );
}

export function ArticleCard({ article }: { article: HomeArticle }) {
  const imageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage)
        .width(960)
        .height(600)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const meta = [
    article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : undefined,
    article.bodyLength
      ? `${Math.max(1, Math.round(article.bodyLength / CHARACTERS_PER_MINUTE))} min read`
      : undefined,
  ].filter(Boolean);

  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(cardClass, cardHoverClass, "group flex h-full flex-col")}
    >
      <div
        className={cn(
          "relative aspect-[16/10]",
          !imageUrl && photoPlaceholderClass
        )}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="self-start">
          <VerificationBadge status={article.verificationStatus} />
        </div>
        <h3 className="font-serif text-[1.4375rem] leading-[1.3] font-semibold text-uli-ink">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-body leading-[1.65] text-[#4A4A43]">
            {article.summary}
          </p>
        )}
        {meta.length > 0 && (
          <p className="mt-auto pt-2 text-[0.8125rem] text-[#5E5E57]">
            {meta.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}

// ─── Support ─────────────────────────────────────────────────────────────────

const WAYS_TO_HELP: { title: string; description: string }[] = [
  { title: "Share a story", description: "What you heard from your elders." },
  {
    title: "Donate photographs",
    description: "Scans of photos and documents.",
  },
  { title: "Suggest a correction", description: "Seen an error? Tell us." },
  {
    title: "Volunteer your skills",
    description: "Research, writing, photography.",
  },
];

const supportButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] px-6 text-body font-semibold tracking-button transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold";

export function HomeSupport() {
  return (
    <section
      id="support"
      aria-labelledby="support-heading"
      className="scroll-mt-22 bg-forest-shade text-linen-white"
    >
      <div
        className={cn(
          containerClass,
          sectionPaddingClass,
          "grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(40px,6vw,96px)]"
        )}
      >
        <div className="flex flex-col gap-5">
          <SectionHeading
            id="support-heading"
            eyebrow="Support the Project"
            title="Help preserve Ozubulu’s story"
            dark
          >
            <p>
              This archive belongs to everyone who loves Ozubulu. Every
              contribution is reviewed by our editors before it is published.
            </p>
          </SectionHeading>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={externalLinks.howToHelp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                supportButtonClass,
                "border border-linen-white bg-linen-white text-forest-shade hover:bg-[#EDE8DC]"
              )}
            >
              Support the Project
            </a>
            <a
              href={externalLinks.contributorGuide}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                supportButtonClass,
                "border border-linen-white/70 text-linen-white hover:bg-linen-white/10"
              )}
            >
              Contribute
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8">
            {WAYS_TO_HELP.map((way, index) => (
              <li
                key={way.title}
                data-reveal
                style={revealDelay(index)}
                className="flex flex-col gap-1 border-t border-linen-white/18 py-4"
              >
                <span className="text-body font-semibold">{way.title}</span>
                <span className="text-small leading-normal text-[#C9D3C4]">
                  {way.description}
                </span>
              </li>
            ))}
          </ul>
          <div data-reveal style={revealDelay(2)}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
