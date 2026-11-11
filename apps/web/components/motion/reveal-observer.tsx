"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Watches every [data-reveal] element on the page and marks it revealed the
// first time it scrolls into view. The fade itself is plain CSS (globals.css),
// so server components only need a data attribute. Re-runs on navigation.
//
// IntersectionObserver does the work; a light scroll check backs it up so an
// element can never stay hidden if the observer is unavailable or throttled.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = new Set(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])"
      )
    );
    if (pending.size === 0) return;

    const reveal = (el: Element) => {
      el.setAttribute("data-revealed", "");
      pending.delete(el as HTMLElement);
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  reveal(entry.target);
                  observer?.unobserve(entry.target);
                }
              }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
          )
        : null;
    pending.forEach((el) => observer?.observe(el));

    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      timer = undefined;
      // No measurable viewport (some embeds, print previews): show everything.
      if (window.innerHeight === 0) {
        pending.forEach((el) => reveal(el));
        observer?.disconnect();
        return;
      }
      const limit = window.innerHeight * 0.92;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          reveal(el);
          observer?.unobserve(el);
        }
      });
    };
    // Throttled to at most one check every 120ms while scrolling.
    const onScroll = () => {
      if (timer === undefined) timer = setTimeout(check, 120);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
