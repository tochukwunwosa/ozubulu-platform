// Primary navigation — docs/design-system-and-design-languge/02-components-design-system.md
// (Header & Navigation → Mega Menus).
//
// An item without `href` has no page yet. It is still shown, greyed out and
// labelled "Coming later", so visitors can see what the archive will hold
// without landing on a dead end. Add the `href` once the page exists.

export interface NavItem {
  title: string;
  description: string;
  href?: string;
  /** Rendered as the highlighted call to action at the end of a menu. */
  highlight?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Governance documents live in the public repository until they have pages
// of their own on the site.
const REPOSITORY_URL = "https://github.com/tochukwunwosa/ozubulu-platform";
const DOCS_URL = `${REPOSITORY_URL}/blob/main/docs`;

export const externalLinks = {
  repository: REPOSITORY_URL,
  productVision: `${DOCS_URL}/01-product-vision.md`,
  howToHelp: `${DOCS_URL}/01-product-vision.md#how-people-can-help`,
  editorialPolicy: `${DOCS_URL}/02-editorial-policy.md`,
  governanceCharter: `${DOCS_URL}/03-governance-charter.md`,
  contributorGuide: `${DOCS_URL}/05-contributor-guide.md`,
};

export const primaryNavigation: NavSection[] = [
  {
    title: "Discover",
    items: [
      {
        title: "About Ozubulu",
        description: "The town at a glance.",
        href: "/town/ozubulu",
      },
      { title: "History", description: "From origins to today, with sources." },
      {
        title: "Communities",
        description: "Amakwa, Egbema, Eziora and Nza.",
        href: "/#communities",
      },
      { title: "Villages", description: "Every village, one page each." },
      { title: "Map", description: "An interactive map of the villages." },
    ],
  },
  {
    title: "Heritage",
    items: [
      { title: "Culture", description: "Language, food, music and dress." },
      { title: "Traditions", description: "Marriage, customs and rites." },
      { title: "Festivals", description: "The yearly calendar." },
      {
        title: "Historical articles",
        description: "Long-form, sourced stories.",
      },
      { title: "Gallery", description: "Photographs and documents." },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "Notable people", description: "Lives that shaped Ozubulu." },
      { title: "Institutions", description: "Schools, churches and more." },
      {
        title: "Development projects",
        description: "Roads, buildings, programmes.",
      },
      { title: "News", description: "Community updates and notices." },
    ],
  },
  {
    title: "Explore",
    items: [
      {
        title: "Search",
        description: "Find anything in the archive.",
        href: "/search",
      },
      { title: "Timeline", description: "Ozubulu’s history, year by year." },
      { title: "Archives", description: "Scanned records and papers." },
      { title: "Sources", description: "Every source we cite." },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Contribute",
        description: "Share stories, photos, documents.",
        href: externalLinks.contributorGuide,
      },
      { title: "Submit a correction", description: "Help us get it right." },
      { title: "Contact", description: "Write to the editorial team." },
      {
        title: "Support the Project",
        description: "Sponsor or volunteer.",
        href: "/#support",
        highlight: true,
      },
    ],
  },
];

// Footer columns, as drawn in the homepage design.
export const footerColumns: NavSection[] = [
  {
    title: "About",
    items: [
      {
        title: "About the platform",
        description: "",
        href: externalLinks.repository,
      },
      {
        title: "Product vision",
        description: "",
        href: externalLinks.productVision,
      },
      {
        title: "Governance charter",
        description: "",
        href: externalLinks.governanceCharter,
      },
      { title: "Contact", description: "" },
    ],
  },
  {
    title: "Explore",
    items: [
      { title: "Communities", description: "", href: "/#communities" },
      { title: "Villages", description: "" },
      { title: "History", description: "", href: "/#history" },
      { title: "Gallery", description: "", href: "/#gallery" },
      { title: "Sources", description: "" },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "Notable people", description: "", href: "/#people" },
      { title: "Traditional institution", description: "", href: "/#people" },
      { title: "News", description: "" },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Contribute",
        description: "",
        href: externalLinks.contributorGuide,
      },
      { title: "Submit a correction", description: "" },
      {
        title: "Contributor guide",
        description: "",
        href: externalLinks.contributorGuide,
      },
      { title: "Support the project", description: "", href: "/#support" },
    ],
  },
];

export const footerLegalLinks: NavItem[] = [
  {
    title: "Editorial policy",
    description: "",
    href: externalLinks.editorialPolicy,
  },
  { title: "Privacy", description: "" },
  { title: "Terms of use", description: "" },
  { title: "GitHub", description: "", href: externalLinks.repository },
];
