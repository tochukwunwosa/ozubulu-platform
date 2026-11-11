import type { CSSProperties } from "react";

// Stagger for [data-reveal] items in a group: each later item waits 90ms more
// (see globals.css). Capped so long lists never feel slow.
export function revealDelay(index: number): CSSProperties {
  return { "--reveal-i": Math.min(index, 6) } as CSSProperties;
}
