import type { TenantContent, TenantSlug } from "./types";

export const TENANTS: TenantSlug[] = ["france", "india", "canada"];

export const DEFAULT_CONTENT: Record<TenantSlug, TenantContent> = {
  france: {
    slug: "france",
    brandName: "Editorial France",
    pageTitle: "Stories, events, and practical guidance for the French network.",
    pageSubtitle:
      "A premium editorial homepage powered by reusable blocks, bilingual publishing, and clear calls to action.",
    globalBanner: "Editorial Network Summit 2026",
    blocks: [
      {
        id: "fr-hero",
        type: "hero",
        data: {
          eyebrow: "Editorial France",
          title: "Editorial publishing for a local, living network.",
          description:
            "Share stories, publish events, and guide new members with a clean multi-site CMS experience.",
          ctaLabel: "Explore upcoming events",
          ctaHref: "/france/events"
        }
      },
      {
        id: "fr-text",
        type: "text",
        data: {
          heading: "Designed for coordinators and contributors",
          body:
            "This live demo shows how a national site can communicate values, news, and public information while still running on a shared system."
        }
      },
      {
        id: "fr-image",
        type: "imageText",
        data: {
          heading: "Structured pages, not one-off layouts",
          body:
            "Every page is assembled from reusable blocks so new campaigns and local updates stay fast to produce.",
          imageLabel: "Editorial gallery placeholder",
          imageAlt: "Editorial block preview"
        }
      },
      {
        id: "fr-stats",
        type: "stats",
        data: {
          heading: "Network signals",
          items: [
            { label: "Active regions", value: "18" },
            { label: "Stories this quarter", value: "42" },
            { label: "Upcoming events", value: "11" }
          ]
        }
      },
      {
        id: "fr-events",
        type: "events",
        data: {
          heading: "Featured events",
          intro: "Surface the latest public sessions, local meetups, and seasonal moments from one shared content model."
        }
      },
      {
        id: "fr-cta",
        type: "cta",
        data: {
          heading: "Ready to join the network?",
          body: "Guide visitors from editorial discovery into action with a strong, local call to action.",
          buttonLabel: "Contact the France team",
          buttonHref: "/contact"
        }
      },
      {
        id: "fr-map",
        type: "map",
        data: {
          heading: "Regional footprint",
          location: "France",
          description: "Mock map block showing how coordinators or regional activity could appear on a public page."
        }
      }
    ],
    blogPosts: [
      {
        id: "fr-post-1",
        title: "A season of shared visits and local learning",
        excerpt: "A premium editorial note on how local visits and stories can feel cohesive across the network.",
        category: "Feature",
        date: "March 18, 2026"
      },
      {
        id: "fr-post-2",
        title: "How homepage storytelling supports membership growth",
        excerpt: "Structure, rhythm, and editorial clarity can make public pages far more useful for first-time visitors.",
        category: "Strategy",
        date: "March 8, 2026"
      }
    ],
    events: [
      {
        id: "fr-event-1",
        title: "Spring orientation session",
        date: "April 11, 2026",
        location: "Online",
        summary: "A structured onboarding session featured in homepage blocks and event listings."
      },
      {
        id: "fr-event-2",
        title: "Open farm visit series",
        date: "April 26, 2026",
        location: "Multiple regions",
        summary: "A recurring event series that demonstrates reusable scheduling and publishing flow."
      }
    ]
  },
  india: {
    slug: "india",
    brandName: "Editorial India",
    pageTitle: "A modern public site for programs, regional stories, and seasonal events.",
    pageSubtitle:
      "Show how a country site can scale communication across regions while still feeling welcoming and clear.",
    globalBanner: "Editorial Network Summit 2026",
    blocks: [
      {
        id: "in-hero",
        type: "hero",
        data: {
          eyebrow: "Editorial India",
          title: "Multi-region editorial publishing with a calm SaaS workflow.",
          description:
            "Publish updates, support local teams, and keep public content consistent across a growing network.",
          ctaLabel: "Read the latest stories",
          ctaHref: "/india/blog"
        }
      },
      {
        id: "in-text",
        type: "text",
        data: {
          heading: "One system, many local voices",
          body:
            "This simulated tenant shows how site-specific content can still benefit from a reusable block system and shared publishing logic."
        }
      },
      {
        id: "in-stats",
        type: "stats",
        data: {
          heading: "India network overview",
          items: [
            { label: "Regional stories", value: "27" },
            { label: "Public events", value: "9" },
            { label: "Editors", value: "6" }
          ]
        }
      },
      {
        id: "in-image",
        type: "imageText",
        data: {
          heading: "Flexible landing pages for campaigns and guidance",
          body:
            "Use a lightweight page builder to support seasonal campaigns, onboarding pages, and local partner information.",
          imageLabel: "Regional editorial placeholder",
          imageAlt: "India site preview image"
        }
      },
      {
        id: "in-events",
        type: "events",
        data: {
          heading: "Upcoming sessions",
          intro: "Keep public event discovery structured, readable, and easy to update through the CMS."
        }
      },
      {
        id: "in-map",
        type: "map",
        data: {
          heading: "Regional activity map",
          location: "India",
          description: "Mock mapping block for coordinators, regional programs, or featured host clusters."
        }
      },
      {
        id: "in-cta",
        type: "cta",
        data: {
          heading: "Discover programs by region",
          body: "Turn editorial discovery into clearer journeys for visitors, coordinators, and applicants.",
          buttonLabel: "View events",
          buttonHref: "/india/events"
        }
      }
    ],
    blogPosts: [
      {
        id: "in-post-1",
        title: "How regional storytelling helps visitors navigate the network",
        excerpt: "Use structured content and strong editorial guidance to make a large network feel welcoming.",
        category: "Guidance",
        date: "March 21, 2026"
      },
      {
        id: "in-post-2",
        title: "A better public calendar for a distributed community",
        excerpt: "Structured event data supports listings, homepage cards, and future API reuse.",
        category: "Product",
        date: "March 12, 2026"
      }
    ],
    events: [
      {
        id: "in-event-1",
        title: "Regional orientation day",
        date: "April 9, 2026",
        location: "Bangalore",
        summary: "A public-facing onboarding event published from the shared CMS model."
      },
      {
        id: "in-event-2",
        title: "Community storytelling circle",
        date: "April 22, 2026",
        location: "Online",
        summary: "Showcases how editorial and events pages can connect inside one site."
      }
    ]
  },
  canada: {
    slug: "canada",
    brandName: "Editorial Canada",
    pageTitle: "Structured publishing for public pages, stories, events, and campaigns.",
    pageSubtitle:
      "A cleaner way to operate local content while keeping search-friendly public pages and reusable SaaS workflows.",
    globalBanner: "Editorial Network Summit 2026",
    blocks: [
      {
        id: "ca-hero",
        type: "hero",
        data: {
          eyebrow: "Editorial Canada",
          title: "A shared CMS with room for local editorial identity.",
          description:
            "Simulate multi-tenant publishing, reusable blocks, and structured content for a national site.",
          ctaLabel: "See the event feed",
          ctaHref: "/canada/events"
        }
      },
      {
        id: "ca-text",
        type: "text",
        data: {
          heading: "Built for clarity, not complexity",
          body:
            "This live demo stays intentionally lightweight while still showing a believable SaaS and CMS architecture."
        }
      },
      {
        id: "ca-image",
        type: "imageText",
        data: {
          heading: "Reusable content blocks support editorial speed",
          body:
            "Swap in new messages, campaigns, and stories without rebuilding every page template from scratch.",
          imageLabel: "Campaign gallery placeholder",
          imageAlt: "Canada site preview image"
        }
      },
      {
        id: "ca-stats",
        type: "stats",
        data: {
          heading: "Publishing stats",
          items: [
            { label: "Published pages", value: "19" },
            { label: "Active editors", value: "4" },
            { label: "Featured events", value: "7" }
          ]
        }
      },
      {
        id: "ca-events",
        type: "events",
        data: {
          heading: "Events and updates",
          intro: "Use event data as editorial fuel for public discoverability and recurring promotion."
        }
      },
      {
        id: "ca-map",
        type: "map",
        data: {
          heading: "Regional map preview",
          location: "Canada",
          description: "Mock map block with room for future host, coordinator, or community points."
        }
      },
      {
        id: "ca-cta",
        type: "cta",
        data: {
          heading: "Stay connected with the network",
          body: "Blend editorial storytelling and practical navigation into one premium public experience.",
          buttonLabel: "Read the blog",
          buttonHref: "/canada/blog"
        }
      }
    ],
    blogPosts: [
      {
        id: "ca-post-1",
        title: "Why reusable blocks help national sites move faster",
        excerpt: "A concise product note on how a lightweight page builder reduces duplicated work.",
        category: "Product",
        date: "March 20, 2026"
      },
      {
        id: "ca-post-2",
        title: "Structuring public communication for real editor teams",
        excerpt: "Clarity in models and workflows matters more than raw CMS complexity for small teams.",
        category: "Editorial ops",
        date: "March 10, 2026"
      }
    ],
    events: [
      {
        id: "ca-event-1",
        title: "Editor orientation session",
        date: "April 13, 2026",
        location: "Online",
        summary: "A CMS-driven event card used in both editorial and public surfaces."
      },
      {
        id: "ca-event-2",
        title: "Public spring meetup",
        date: "April 25, 2026",
        location: "Montreal",
        summary: "Demonstrates how structured event content can stay readable across locales and layouts."
      }
    ]
  }
};
