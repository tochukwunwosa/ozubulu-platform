// cSpell:ignore Ozubulu
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHero() {
  return (
    <section className="relative flex h-screen min-h-[560px] w-full flex-col items-center justify-center overflow-hidden text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/ozubulu-hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-uli-ink/35" />
      <div className="relative z-10 flex flex-col items-center px-6">
        <h1 className="font-serif text-display tracking-hero text-linen-white">
          Welcome to Ozubulu
        </h1>
        <p className="mt-6 max-w-xl text-body-lg text-linen-white/90">
          Where history lives, culture thrives, and a community&apos;s story is
          preserved for generations.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <Link href="#communities">Discover Ozubulu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
