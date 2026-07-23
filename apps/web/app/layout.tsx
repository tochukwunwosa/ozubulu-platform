import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

import { PreviewBanner } from "@/components/layout/preview-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
    >
      <body className="min-h-full flex flex-col">
        <PreviewBanner />
        <div className="relative flex flex-1 flex-col">
          <SiteHeader communities={communities} />
          {children}
        </div>
        <SiteFooter communities={communities} />
      </body>
    </html>
  );
}
