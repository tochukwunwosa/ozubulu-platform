"use client";

import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "radix-ui";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNavigation, type NavItem } from "@/config/navigation";
import type { CommunitySummary } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const iconButtonClass =
  "inline-flex size-11 items-center justify-center rounded-[10px] border border-linen-white/35 text-linen-white transition-colors hover:bg-linen-white/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold";

export function SiteHeader({
  communities,
}: {
  communities: CommunitySummary[];
}) {
  const isHome = usePathname() === "/";

  // Always sticky and dark. On the homepage it overlaps the top of the hero
  // video (negative bottom margin), as in the design.
  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-19 border-b border-linen-white/8 bg-uli-ink/88 backdrop-blur-lg backdrop-saturate-150 lg:h-22",
        isHome && "-mb-19 lg:-mb-22"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 xl:px-20">
        <Wordmark />
        <DesktopNav communities={communities} />
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search the archive"
            className={iconButtonClass}
          >
            <SearchIcon
              className="size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex flex-col gap-0.5 rounded-md text-linen-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold"
    >
      <span className="font-serif text-[1.25rem] leading-[1.1] font-semibold tracking-page-title lg:text-[1.375rem]">
        Ozubulu
      </span>
      <span className="text-[0.625rem] tracking-[0.14em] text-[#E3C17F] uppercase lg:text-[0.6875rem]">
        Digital Archive
      </span>
    </Link>
  );
}

function DesktopNav({ communities }: { communities: CommunitySummary[] }) {
  return (
    <NavigationMenu
      viewport={false}
      aria-label="Main"
      className="hidden flex-none lg:flex"
    >
      <NavigationMenuList className="gap-1">
        {primaryNavigation.map((section, index) => {
          const withCommunities =
            section.title === "Discover" && communities.length > 0;
          const alignRight = index >= primaryNavigation.length - 2;

          return (
            <NavigationMenuItem key={section.title}>
              {/* Active and hover states use an underline and gold text only — no
                  background or bar under the item. */}
              <NavigationMenuTrigger className="h-auto rounded-lg bg-transparent px-2.5 py-3 text-[0.9375rem] leading-none font-medium text-linen-white decoration-2 underline-offset-[6px] hover:bg-transparent hover:text-[#E3C17F] hover:underline focus:bg-transparent focus:text-linen-white focus-visible:ring-palm-gold/60 data-open:bg-transparent data-open:text-[#E3C17F] data-open:underline data-open:hover:bg-transparent data-open:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent">
                {section.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={cn(
                  "mt-3.5 rounded-[14px] border border-soft-clay bg-linen-white p-0 shadow-[0_2px_6px_rgba(20,27,41,0.08),0_20px_48px_rgba(20,27,41,0.22)] ring-0",
                  alignRight ? "right-0 left-auto" : "-left-2",
                  withCommunities ? "md:w-[700px]" : "md:w-[300px]"
                )}
              >
                <div
                  className={cn(
                    withCommunities &&
                      "grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
                  )}
                >
                  <ul
                    className={cn(
                      "flex flex-col",
                      withCommunities ? "p-3" : "p-2"
                    )}
                  >
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <DesktopMenuItem item={item} />
                      </li>
                    ))}
                  </ul>
                  {withCommunities && (
                    <div className="flex flex-col gap-3.5 border-l border-soft-clay bg-akpu-paper p-6">
                      <p className="text-caption font-medium tracking-label text-[#7A5A30] uppercase">
                        Start here
                      </p>
                      <p className="font-serif text-[1.375rem] leading-tight font-semibold text-uli-ink">
                        The four communities
                      </p>
                      <p className="text-small leading-relaxed text-[#4A4A43]">
                        Each has its own villages, story and Obi.
                      </p>
                      <ul className="grid grid-cols-2 gap-2">
                        {communities.map((community) => (
                          <li key={community._id}>
                            <NavigationMenuLink
                              asChild
                              className="min-h-11 rounded-[10px] border border-soft-clay bg-white px-3.5 text-small font-medium text-uli-ink hover:border-camwood hover:bg-white hover:text-camwood focus:bg-white"
                            >
                              <Link href={`/community/${community.slug}`}>
                                {community.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ComingLater() {
  return (
    <span className="rounded-full bg-mist-grey px-[7px] py-1 text-[0.625rem] leading-none font-medium tracking-label text-[#55554E] uppercase">
      Coming later
    </span>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function DesktopMenuItem({ item }: { item: NavItem }) {
  if (!item.href) {
    return (
      <div className="flex flex-col gap-[3px] rounded-[10px] px-3.5 py-3">
        <span className="flex items-center gap-2 text-[0.9375rem] leading-snug font-semibold text-riverstone">
          {item.title}
          <ComingLater />
        </span>
        <span className="text-[0.8125rem] leading-[1.45] text-[#5E5E57]">
          {item.description}
        </span>
      </div>
    );
  }

  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "flex-col items-start gap-[3px] rounded-[10px] px-3.5 py-3",
        item.highlight
          ? "mt-1 bg-camwood hover:bg-[#86402A] focus:bg-[#86402A]"
          : "hover:bg-[#EFEBE2] focus:bg-[#EFEBE2]"
      )}
    >
      <Link
        href={item.href}
        {...(isExternal(item.href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span
          className={cn(
            "text-[0.9375rem] leading-snug font-semibold",
            item.highlight ? "text-white" : "text-uli-ink"
          )}
        >
          {item.title}
        </span>
        <span
          className={cn(
            "text-[0.8125rem] leading-[1.45]",
            item.highlight ? "text-[#F3DDD4]" : "text-[#5E5E57]"
          )}
        >
          {item.description}
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(iconButtonClass, "lg:hidden")}
        >
          <MenuIcon className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 overflow-y-auto border-0 bg-akpu-paper p-0 data-[side=right]:w-full sm:max-w-sm"
      >
        <div className="flex items-center justify-between gap-4 bg-uli-ink px-5 py-4">
          <SheetTitle asChild>
            <div className="flex flex-col gap-0.5 text-linen-white">
              <span className="font-serif text-[1.25rem] leading-[1.1] font-semibold tracking-page-title">
                Ozubulu
              </span>
              <span className="text-[0.625rem] tracking-[0.14em] text-[#E3C17F] uppercase">
                Digital Archive
              </span>
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className={iconButtonClass}
            >
              <XIcon className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </SheetClose>
        </div>

        <form action="/search" role="search" className="p-5">
          <label htmlFor="menu-search" className="sr-only">
            Search the archive
          </label>
          <div className="relative">
            <SearchIcon
              className="absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-[#5E5E57]"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              id="menu-search"
              name="q"
              type="search"
              placeholder="Search the archive"
              className="h-13 w-full rounded-[10px] border border-[#C9C0B1] bg-white pr-4 pl-[42px] text-body text-uli-ink placeholder:text-[#6B6B63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold"
            />
          </div>
        </form>

        <nav aria-label="Main">
          <Accordion.Root
            type="single"
            collapsible
            className="border-b border-soft-clay"
          >
            {primaryNavigation.map((section) => (
              <Accordion.Item
                key={section.title}
                value={section.title}
                className="border-t border-soft-clay"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between px-5 text-left text-[1.0625rem] leading-none font-semibold text-uli-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-palm-gold data-[state=open]:text-camwood">
                    {section.title}
                    <ChevronDownIcon
                      className="size-[18px] transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <ul className="pb-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.href ? (
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="flex min-h-12 items-center pr-5 pl-9 text-body text-uli-ink hover:bg-[#EFEBE2]"
                              {...(isExternal(item.href)
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                            >
                              {item.title}
                            </Link>
                          </SheetClose>
                        ) : (
                          <span className="flex min-h-12 items-center justify-between gap-3 pr-5 pl-9 text-body text-riverstone">
                            {item.title}
                            <ComingLater />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </nav>

        <div className="mt-auto flex flex-col gap-3 p-5">
          <SheetClose asChild>
            <Link
              href="/#support"
              className="flex min-h-13 items-center justify-center rounded-[10px] bg-camwood text-body font-semibold text-white hover:bg-[#86402A]"
            >
              Support the Project
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/#support"
              className="flex min-h-11 items-center justify-center text-[0.9375rem] font-semibold text-camwood"
            >
              Suggest a correction
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
