import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Shared page container and section rhythm, matching the homepage design:
// 1280px max width, clamp(20px, 5vw, 80px) side padding, clamp(56px, 8vw,
// 112px) section padding.
export const containerClass =
  "mx-auto w-full max-w-7xl px-[clamp(20px,5vw,80px)]";
export const sectionPaddingClass = "py-[clamp(56px,8vw,112px)]";

// Section header pattern — eyebrow, heading, short introduction
// (docs/design-system-and-design-languge/02-components-design-system.md).
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  action,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-4">
        <p
          className={cn(
            "text-caption font-medium tracking-label uppercase",
            dark ? "text-[#E3C17F]" : "text-[#7A5A30]"
          )}
        >
          {eyebrow}
        </p>
        <h2
          id={id}
          className={cn(
            "font-serif text-[clamp(30px,3.4vw,40px)] leading-[1.2] font-semibold tracking-page-title",
            dark ? "text-linen-white" : "text-uli-ink"
          )}
        >
          {title}
        </h2>
        {children && (
          <div
            className={cn(
              "max-w-[640px] text-body-lg leading-[1.7]",
              dark ? "max-w-[560px] text-[#DCE3D8]" : "text-[#4A4A43]"
            )}
          >
            {children}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}

export function MoreLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-1.5 self-start rounded-sm text-[0.9375rem] font-semibold tracking-button text-camwood underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-gold",
        className
      )}
    >
      {children}
      <ArrowRightIcon
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
