import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { HideOnStudio } from "@/components/layout/hide-on-studio";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { getCommunitiesList } from "@/lib/sanity/fetchers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ozubulu Digital Archive",
  description:
    "Preserving the history, heritage, and stories of Ozubulu for generations to come.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const communities = await getCommunitiesList();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      // The inline script below adds the "js" class before React hydrates.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Marks JavaScript as available before hydration, so scroll-reveal
            elements start hidden only when they can actually be revealed. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <RevealObserver />
        <HideOnStudio>
          <PreviewBanner />
        </HideOnStudio>
        <div className="relative flex flex-1 flex-col">
          <HideOnStudio>
            <SiteHeader communities={communities} />
          </HideOnStudio>
          {children}
        </div>
        <HideOnStudio>
          <SiteFooter />
        </HideOnStudio>
      </body>
    </html>
  );
}
