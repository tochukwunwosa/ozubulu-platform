"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface OnThisPageItem {
  id: string;
  label: string;
}

// "On this page" list for long pages. Desktop only (hidden below lg), pinned
// while scrolling, and the highlight follows the section in view.
export function OnThisPage({ items }: { items: OnThisPageItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      timer = undefined;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) current = item.id;
      }
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        current = items[items.length - 1]?.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (timer === undefined) timer = setTimeout(update, 80);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 hidden w-60 flex-none flex-col self-start lg:flex"
    >
      <p className="mb-3 text-caption font-medium tracking-label text-[#7A5A30] uppercase">
        On this page
      </p>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "block border-l-2 py-2 pl-3 text-small font-medium transition-[color,border-color,padding] duration-200 hover:border-camwood hover:pl-4 hover:text-camwood focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold",
                active === item.id
                  ? "border-camwood font-semibold text-camwood"
                  : "border-soft-clay text-[#4A4A43]"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
