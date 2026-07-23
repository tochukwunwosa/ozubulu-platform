"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { CommunitySummary } from "@/lib/sanity/types";

const SCROLL_THRESHOLD = 40;

export function SiteHeader({
  communities,
}: {
  communities: CommunitySummary[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // On the homepage the navbar starts collapsed (transparent, floating over
  // the hero video) and only becomes solid once the visitor scrolls.
  // Every other page has no hero to float over, so it's solid from the start.
  const overlay = isHome && !scrolled;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-40 transition-colors duration-300",
        overlay
          ? "absolute bg-transparent"
          : "fixed border-b border-border bg-background/95 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={cn(
            "font-serif text-h5 tracking-page-title transition-colors",
            overlay ? "text-linen-white" : "text-foreground"
          )}
        >
          Ozubulu Digital Archive
        </Link>
        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              overlay &&
                "text-linen-white hover:bg-linen-white/10 hover:text-linen-white"
            )}
          >
            <Link href="/town/ozubulu">About Ozubulu</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  overlay &&
                    "text-linen-white hover:bg-linen-white/10 hover:text-linen-white"
                )}
              >
                Communities
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {communities.map((community) => (
                <DropdownMenuItem key={community._id} asChild>
                  <Link href={`/community/${community.slug}`}>
                    {community.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
