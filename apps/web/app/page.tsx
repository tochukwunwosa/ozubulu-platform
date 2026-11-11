import { SiteHero } from "@/components/hero/site-hero";
import { HomeCommunities } from "@/components/sections/home-communities";
import {
  HomeGallery,
  HomePeople,
  HomeStories,
  HomeSupport,
} from "@/components/sections/home-dynamic";
import {
  HomeHeritage,
  HomeHistory,
  HomeMotto,
  HomeWelcome,
} from "@/components/sections/home-static";
import { getHomePageData } from "@/lib/sanity/fetchers";

// Visitor journey: docs/design-system-and-design-languge/03-experience-design-system.md
// (Homepage Experience). Each section links naturally into the next.
export default async function Home() {
  const { communities, articles, photographs, institution, people } =
    await getHomePageData();

  return (
    <main className="flex-1 bg-background">
      <SiteHero />
      <HomeWelcome />
      <HomeCommunities communities={communities} />
      <HomeHistory />
      <HomeHeritage />
      <HomeMotto />
      <HomeGallery photographs={photographs} />
      <HomePeople institution={institution} people={people} />
      <HomeStories articles={articles} />
      <HomeSupport />
    </main>
  );
}
