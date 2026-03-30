import type {
  TenantContent,
  TenantDirectoryEntry,
  TenantRegion,
  TenantSlug
} from "./types";

export const TENANT_DIRECTORY: TenantDirectoryEntry[] = [
  { slug: "uk", label: "UK", region: "Europe", displayName: "United Kingdom", localeSummary: "English" },
  { slug: "germany", label: "Germany", region: "Europe", displayName: "Germany", localeSummary: "German / English" },
  { slug: "spain", label: "Spain", region: "Europe", displayName: "Spain", localeSummary: "Spanish / English" },
  { slug: "italy", label: "Italy", region: "Europe", displayName: "Italy", localeSummary: "Italian / English" },
  { slug: "france", label: "France", region: "Europe", displayName: "France", localeSummary: "French / English" },
  { slug: "portugal", label: "Portugal", region: "Europe", displayName: "Portugal", localeSummary: "Portuguese / English" },
  {
    slug: "netherlands",
    label: "Netherlands",
    region: "Europe",
    displayName: "Netherlands",
    localeSummary: "Dutch / English"
  },
  { slug: "sweden", label: "Sweden", region: "Europe", displayName: "Sweden", localeSummary: "Swedish / English" },
  { slug: "japan", label: "Japan", region: "Asia", displayName: "Japan", localeSummary: "Japanese / English" },
  {
    slug: "south-korea",
    label: "South Korea",
    region: "Asia",
    displayName: "South Korea",
    localeSummary: "Korean / English"
  },
  {
    slug: "india",
    label: "India",
    region: "Asia",
    displayName: "India Partnerships",
    localeSummary: "English / Hindi"
  },
  { slug: "usa", label: "USA", region: "Americas", displayName: "United States", localeSummary: "English / Spanish" },
  { slug: "canada", label: "Canada", region: "Americas", displayName: "Canada", localeSummary: "English / French" },
  { slug: "mexico", label: "Mexico", region: "Americas", displayName: "Mexico", localeSummary: "Spanish / English" },
  { slug: "brazil", label: "Brazil", region: "Americas", displayName: "Brazil", localeSummary: "Portuguese / English" },
  {
    slug: "argentina",
    label: "Argentina",
    region: "Americas",
    displayName: "Argentina",
    localeSummary: "Spanish / English"
  }
];

export const TENANTS: TenantSlug[] = TENANT_DIRECTORY.map((tenant) => tenant.slug);

export const TENANT_GROUPS: Array<{ region: TenantRegion; tenants: TenantDirectoryEntry[] }> = [
  {
    region: "Europe",
    tenants: TENANT_DIRECTORY.filter((tenant) => tenant.region === "Europe")
  },
  {
    region: "Asia",
    tenants: TENANT_DIRECTORY.filter((tenant) => tenant.region === "Asia")
  },
  {
    region: "Americas",
    tenants: TENANT_DIRECTORY.filter((tenant) => tenant.region === "Americas")
  }
];

const REGION_FOCUS: Record<TenantRegion, string> = {
  Europe: "regional stories, multilingual publishing, and shared public guidance",
  Asia: "partnership updates, community programs, and calm editorial workflows",
  Americas: "membership journeys, public events, and clear local communication"
};

function buildDate(month: string, day: number) {
  return `${month} ${day}, 2026`;
}

function buildTenantContent(tenant: TenantDirectoryEntry, index: number): TenantContent {
  const brandName = tenant.slug === "india" ? "Editorial India Partnerships" : `Editorial ${tenant.label}`;
  const storyMonth = index < 8 ? "March" : "April";
  const eventMonth = "April";
  const storyDay = 18 - (index % 5);
  const secondaryStoryDay = 11 + (index % 5);
  const eventDay = 10 + (index % 4);
  const secondaryEventDay = 22 + (index % 4);
  const regionFocus = REGION_FOCUS[tenant.region];

  return {
    slug: tenant.slug,
    brandName,
    pageTitle: `Public stories, events, and updates for the ${tenant.displayName} network.`,
    pageSubtitle:
      `A live demo of multi-site editorial publishing with reusable blocks, multilingual support, and shared SaaS operations for ${regionFocus}.`,
    globalBanner: "Editorial Network Summit 2026",
    blocks: [
      {
        id: `${tenant.slug}-hero`,
        type: "hero",
        data: {
          eyebrow: brandName,
          title: `Editorial publishing for ${tenant.displayName}.`,
          description:
            "Share stories, publish events, and guide visitors through a calm multi-site CMS experience.",
          ctaLabel: `Open ${tenant.label} events`,
          ctaHref: `/${tenant.slug}/events`
        }
      },
      {
        id: `${tenant.slug}-text`,
        type: "text",
        data: {
          heading: "Designed for coordinators and contributors",
          body: `This live demo shows how the ${tenant.displayName} site can communicate values, news, and public information while still running on a shared system.`
        }
      },
      {
        id: `${tenant.slug}-image`,
        type: "imageText",
        data: {
          heading: "Structured pages, not one-off layouts",
          body:
            "Reusable blocks keep new campaigns, notices, and local updates fast to produce across the network.",
          imageLabel: "Editorial gallery placeholder",
          imageAlt: `Public editorial block preview for ${tenant.displayName}`
        }
      },
      {
        id: `${tenant.slug}-stats`,
        type: "stats",
        data: {
          heading: `${tenant.label} network signals`,
          items: [
            { label: "Active regions", value: String(12 + (index % 6)) },
            { label: "Stories this quarter", value: String(24 + index * 2) },
            { label: "Upcoming events", value: String(6 + (index % 5)) }
          ]
        }
      },
      {
        id: `${tenant.slug}-events`,
        type: "events",
        data: {
          heading: "Featured events",
          intro: "Surface the latest public sessions, local meetups, and seasonal moments from one shared content model."
        }
      },
      {
        id: `${tenant.slug}-cta`,
        type: "cta",
        data: {
          heading: "Ready to join the network?",
          body: "Guide visitors from editorial discovery into action with a strong, local call to action.",
          buttonLabel: `Contact the ${tenant.label} team`,
          buttonHref: "/contact"
        }
      },
      {
        id: `${tenant.slug}-map`,
        type: "map",
        data: {
          heading: "Regional footprint",
          location: tenant.displayName,
          description:
            "Mock map block showing how coordinators, regional activity, or featured host clusters could appear on a public page."
        }
      }
    ],
    blogPosts: [
      {
        id: `${tenant.slug}-post-1`,
        title: `${tenant.label} network update for the season`,
        excerpt: `A concise editorial note on how ${tenant.displayName} keeps public pages current and consistent.`,
        category: "Feature",
        date: buildDate(storyMonth, storyDay)
      },
      {
        id: `${tenant.slug}-post-2`,
        title: `How local stories travel across the ${tenant.label} network`,
        excerpt: "Structured content keeps public storytelling flexible without changing the publishing workflow.",
        category: "Strategy",
        date: buildDate(storyMonth, secondaryStoryDay)
      }
    ],
    events: [
      {
        id: `${tenant.slug}-event-1`,
        title: `${tenant.label} orientation session`,
        date: buildDate(eventMonth, eventDay),
        location: "Online",
        summary: `A structured onboarding session for ${tenant.displayName} editors and coordinators.`
      },
      {
        id: `${tenant.slug}-event-2`,
        title: `${tenant.label} community meetup`,
        date: buildDate(eventMonth, secondaryEventDay),
        location: "Regional hub",
        summary: `A recurring public event used to showcase the ${tenant.label} calendar and homepage promotion flow.`
      }
    ]
  };
}

export const DEFAULT_CONTENT = Object.fromEntries(
  TENANT_DIRECTORY.map((tenant, index) => [tenant.slug, buildTenantContent(tenant, index)])
) as Record<TenantSlug, TenantContent>;
