import Link from "next/link";

const primarySections = [
  {
    title: "Pages",
    href: "/dashboard/pages",
    count: "36 entries",
    detail:
      "Manage homepage, about, press, contact, campaign, and policy pages with reusable content blocks."
  },
  {
    title: "Posts",
    href: "/dashboard/posts",
    count: "128 articles",
    detail:
      "Run the editorial pipeline for blog posts, news updates, migration imports, and multilingual publishing."
  },
  {
    title: "Events",
    href: "/dashboard/events",
    count: "22 upcoming",
    detail:
      "Schedule structured events, homepage carousels, and listing pages with locale-aware metadata."
  },
  {
    title: "Media",
    href: "/dashboard/media",
    count: "640 assets",
    detail:
      "Track images, PDFs, featured media, and reusable downloads for coordinators and campaigns."
  }
];

const operations = [
  {
    title: "Sites",
    href: "/dashboard/sites",
    status: "18 configured",
    note: "Provision domains, language variants, and rollout states per country site."
  },
  {
    title: "Team",
    href: "/dashboard/team",
    status: "61 editors",
    note: "Keep federation admins and local coordinators scoped to the right publishing surface."
  },
  {
    title: "Locales",
    href: "/dashboard/locales",
    status: "7 live locales",
    note: "Monitor translation coverage and launch readiness for multilingual content."
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    status: "Shared config",
    note: "Review global blocks, forms, SEO defaults, and integration placeholders."
  },
  {
    title: "Preview",
    href: "/preview",
    status: "2 demo sites",
    note: "Jump from the CMS into public-facing country-site previews generated from the same content model."
  }
];

const priorityQueue = [
  "Homepage update for Portugal awaiting editorial review",
  "French campaign page needs English translation before publishing",
  "Legacy WordPress import batch 03 is ready for media cleanup",
  "Global alert banner scheduled for maintenance window on April 2"
];

const scopeSnapshot = [
  "Static and semi-static pages for About, Projects, Press, and Contact",
  "Blog and news structure with titles, body content, and featured imagery",
  "Structured events with listing pages and reusable homepage modules",
  "Reusable content blocks for rich text, galleries, CTA, video, downloads, and social links",
  "Multi-site controls, multilingual content, media uploads, and future API-facing models"
];

export default function Home() {
  return (
    <main className="dashboard-shell workspace-page">
      <section className="dashboard-hero workspace-hero">
        <div className="dashboard-hero__copy">
          <p className="dashboard-eyebrow">Workspace</p>
          <h1>Editorial operations for a shared multi-site CMS.</h1>
          <p className="dashboard-lede">
            This root screen now behaves like the product home for the MVP. It
            gives editors and super admins one place to jump into pages, posts,
            events, media, locales, site setup, and launch operations.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard/pages">
              Enter content workspace
            </Link>
            <Link className="dashboard-button dashboard-button--secondary" href="/dashboard">
              Open network overview
            </Link>
          </div>
        </div>

        <aside className="dashboard-hero__panel" aria-label="Workspace summary">
          <article className="dashboard-metric">
            <p>Live network</p>
            <strong>18 sites</strong>
            <span>Country websites and language variants running from one shared model</span>
          </article>
          <article className="dashboard-metric">
            <p>Open tasks</p>
            <strong>14 reviews</strong>
            <span>Drafts, translations, alerts, and imports waiting for editorial action</span>
          </article>
          <article className="dashboard-metric">
            <p>MVP scope</p>
            <strong>Pages, posts, events, media</strong>
            <span>Admin operations, locales, and shared settings included in the first release</span>
          </article>
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--four">
        {primarySections.map((section) => (
          <Link key={section.title} href={section.href} className="dashboard-card dashboard-link-card">
            <p className="dashboard-card__eyebrow">{section.count}</p>
            <h2>{section.title}</h2>
            <p>{section.detail}</p>
          </Link>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--split">
        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Priority queue</p>
          <h2>What the team should handle next.</h2>
          <ol className="dashboard-activity">
            {priorityQueue.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="dashboard-card dashboard-card--accent">
          <p className="dashboard-card__eyebrow">MVP scope</p>
          <h2>The first release already maps to the real product brief.</h2>
          <ul className="dashboard-list">
            {scopeSnapshot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--five">
        {operations.map((item) => (
          <Link key={item.title} href={item.href} className="dashboard-card dashboard-link-card dashboard-link-card--muted">
            <p className="dashboard-card__eyebrow">{item.status}</p>
            <h2>{item.title}</h2>
            <p>{item.note}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
