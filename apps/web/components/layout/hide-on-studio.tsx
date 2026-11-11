"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Sanity Studio (/studio) is a full-screen editing app, so the public site's
// banner, header and footer are left out there.
export function HideOnStudio({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
