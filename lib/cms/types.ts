export type TenantSlug = "france" | "india" | "canada";

export type HeroBlock = {
  id: string;
  type: "hero";
  data: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export type TextBlock = {
  id: string;
  type: "text";
  data: {
    heading: string;
    body: string;
  };
};

export type ImageTextBlock = {
  id: string;
  type: "imageText";
  data: {
    heading: string;
    body: string;
    imageLabel: string;
    imageAlt: string;
  };
};

export type CtaBlock = {
  id: string;
  type: "cta";
  data: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

export type StatsBlock = {
  id: string;
  type: "stats";
  data: {
    heading: string;
    items: Array<{
      label: string;
      value: string;
    }>;
  };
};

export type EventsBlock = {
  id: string;
  type: "events";
  data: {
    heading: string;
    intro: string;
  };
};

export type MapBlock = {
  id: string;
  type: "map";
  data: {
    heading: string;
    location: string;
    description: string;
  };
};

export type CmsBlock =
  | HeroBlock
  | TextBlock
  | ImageTextBlock
  | CtaBlock
  | StatsBlock
  | EventsBlock
  | MapBlock;

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  summary: string;
};

export type TenantContent = {
  slug: TenantSlug;
  brandName: string;
  pageTitle: string;
  pageSubtitle: string;
  globalBanner: string;
  blocks: CmsBlock[];
  blogPosts: BlogPost[];
  events: EventItem[];
};

export type ContentPayload = {
  site: TenantSlug;
  content: TenantContent;
};
