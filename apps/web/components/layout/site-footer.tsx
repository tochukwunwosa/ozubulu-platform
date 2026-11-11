import Link from "next/link";

import {
  footerColumns,
  footerLegalLinks,
  type NavItem,
} from "@/config/navigation";
import packageJson from "@/package.json";

const linkClass =
  "rounded-sm text-[0.9375rem] leading-normal text-[#D9D3C4] hover:text-linen-white hover:underline hover:underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-gold";

function FooterLink({
  item,
  small = false,
}: {
  item: NavItem;
  small?: boolean;
}) {
  const className = small ? `${linkClass} text-small` : linkClass;

  if (!item.href) {
    return (
      <span
        className={
          small
            ? "text-small text-[#8F897C]"
            : "text-[0.9375rem] leading-normal text-[#8F897C]"
        }
      >
        {item.title}
        <span className="sr-only"> (coming later)</span>
      </span>
    );
  }

  if (item.href.startsWith("http")) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.title}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-uli-ink text-[#D9D3C4]">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-[clamp(20px,5vw,80px)] pt-18 pb-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-10">
          <div className="flex max-w-[360px] min-w-0 flex-col gap-3">
            <p className="font-serif text-h4 font-semibold text-linen-white">
              Ozubulu Digital Archive
            </p>
            <p className="text-[0.9375rem] leading-[1.6] text-[#B9B3A6]">
              Preserving the history, heritage and stories of Ozubulu for
              generations to come.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-2.5"
            >
              <p className="mb-1.5 text-caption font-medium tracking-label text-[#E3C17F] uppercase">
                {column.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.title}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-linen-white/14 pt-6 text-small text-[#A9A396]">
          <span>© {year} Ozubulu Digital Archive</span>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegalLinks.map((item) => (
              <li key={item.title}>
                <FooterLink item={item} small />
              </li>
            ))}
            <li>v{packageJson.version}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
