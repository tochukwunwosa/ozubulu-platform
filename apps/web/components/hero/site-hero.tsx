// cSpell:ignore Ozubulu Ekwusigo
import Link from "next/link";

import { containerClass } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

export function SiteHero() {
  return (
    <section
      aria-label="Welcome"
      className="relative flex min-h-[680px] w-full flex-col overflow-hidden bg-uli-ink text-linen-white lg:min-h-[820px]"
    >
      <video
        className="hero-drift absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/videos/ozubulu-hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-uli-ink/45" aria-hidden="true" />

      {/* The sticky header (76px, 88px on desktop) overlaps the hero; the
          content starts 96px / 56px below it, as in the design. */}
      <div className="hero-enter relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-43 text-center lg:pt-36">
        <p className="text-[0.6875rem] font-medium tracking-[0.1em] text-[#E3C17F] uppercase sm:text-caption sm:tracking-label">
          Ekwusigo · Anambra State
          <span className="hidden sm:inline"> · Nigeria</span>
        </p>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.1] font-bold tracking-hero text-linen-white sm:mt-5 sm:text-[3.5rem] sm:leading-[1.08] lg:text-[4.75rem]">
          Welcome to Ozubulu
        </h1>
        <p className="mt-[18px] max-w-[640px] font-serif text-[1.125rem] leading-[1.55] text-[#EFEAE0] italic sm:mt-6 sm:text-[1.3125rem] lg:text-[1.4375rem]">
          Where history lives, culture thrives, and a community&rsquo;s story is
          preserved for generations.
        </p>
        <p className="mt-5 hidden max-w-[560px] text-[1.0625rem] leading-[1.7] text-[#D9D3C4] sm:block">
          A community-built home for the history, people and heritage of our
          town &mdash; carefully researched, openly sourced, and kept for those
          who come after us.
        </p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
          <Link
            href="/#communities"
            className="inline-flex min-h-13 items-center justify-center rounded-[10px] border border-camwood bg-camwood px-6 text-body font-semibold tracking-button text-white shadow-[0_8px_24px_rgba(156,75,50,0.35)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#86402A] hover:shadow-[0_12px_28px_rgba(156,75,50,0.45)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold sm:min-h-12"
          >
            Discover Ozubulu
          </Link>
          <Link
            href="/#support"
            className="inline-flex min-h-13 items-center justify-center rounded-[10px] border border-linen-white/70 px-6 text-body font-semibold tracking-button text-linen-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-linen-white hover:bg-linen-white/10 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palm-gold sm:min-h-12"
          >
            Support the Project
          </Link>
        </div>
      </div>

      {/* In the normal flow (not pinned) so it never overlaps the buttons on
          short screens; the hero grows instead. Bottom right, as designed. */}
      <div
        className={cn(
          containerClass,
          "relative z-10 mt-auto hidden justify-end pt-12 pb-7 sm:flex"
        )}
      >
        <Link
          href="/#welcome"
          className="group flex flex-col items-center gap-2 rounded-md text-caption tracking-[0.12em] text-[#D9D3C4] uppercase transition-colors hover:text-linen-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold"
        >
          Begin
          <span
            aria-hidden="true"
            className="cue-line h-10 w-px bg-linear-to-b from-[#E3C17F] to-transparent"
          />
        </Link>
      </div>
    </section>
  );
}
