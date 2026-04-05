import Link from "next/link";

const launchMetrics = [
  { label: "Active sites", value: "16", detail: "Across Europe, Asia, and the Americas" },
  { label: "Locales live", value: "31", detail: "5 more queued for review" },
  { label: "Items in review", value: "24", detail: "Pages, posts, events, and alerts" },
  { label: "API deliveries", value: "468", detail: "Content requests over the last 24 hours" }
];

const siteRows = [
  {
    site: "UK",
    locale: "en",
    status: "Live",
    updated: "9 min ago"
  },
  {
    site: "Japan",
    locale: "ja, en",
    status: "Live",
    updated: "22 min ago"
  },
  {
    site: "Brazil",
    locale: "pt-BR, en",
    status: "Review",
    updated: "47 min ago"
  }
];

const reviewQueue = [
  {
    title: "Summer homepage launch",
    meta: "Germany · Page · Editor review",
    href: "/dashboard/pages/homepage-refresh"
  },
  {
    title: "Volunteer roundup",
    meta: "Mexico · Post · Ready to publish",
    href: "/dashboard/posts/spring-volunteer-roundup"
  },
  {
    title: "Open farm day",
    meta: "South Korea · Event · Time change requested",
    href: "/dashboard/events/spring-open-farm-day"
  }
];

const settingsSnapshot = [
  { key: "Primary mode", value: "Multi-site" },
  { key: "Content API", value: "/api/content" },
  { key: "Public domains", value: "16 mapped" },
  { key: "Media storage", value: "8.6 GB / 40 GB" },
  { key: "Locales", value: "en, fr, de, es, it, pt, ja, ko, hi" },
  { key: "Banner", value: "Network Summit 2026" }
];

const editorialPulse = [
  { label: "Homepage rollouts", value: "3", detail: "Germany, Portugal, and Mexico are staged for tomorrow morning." },
  { label: "Copy holds", value: "2", detail: "Legal review is still blocking a policy update and one donation CTA." },
  { label: "Media requests", value: "7", detail: "Fresh campaign images are waiting for final crops and alt text." }
];

const releaseWindow = [
  { time: "09:00 UTC", title: "Homepage refresh", detail: "Germany and Portugal draft handoff" },
  { time: "11:30 UTC", title: "Event publish", detail: "Japan spring visit schedule" },
  { time: "15:00 UTC", title: "Alert sync", detail: "Network banner refresh across all active sites" }
];

const visualPanels = [
  {
    tone: "soil",
    title: "Feature launch",
    detail: "Long-form homepage publishing and campaign pages"
  },
  {
    tone: "ecology",
    title: "Site health",
    detail: "Editors active across regional teams and language queues"
  },
  {
    tone: "sun",
    title: "Calls to action",
    detail: "Donation, visit, event, and contact pathways"
  },
  {
    tone: "sand",
    title: "Background blocks",
    detail: "Warm neutral surfaces for clear hierarchy and editorial rhythm"
  }
];

export default function Home() {
  return (
    <main className="dashboard-shell workspace-page workspace-page--minimal">
      <section className="dashboard-hero workspace-hero workspace-hero--minimal">
        <div className="dashboard-hero__copy workspace-copy--minimal">
          <p className="dashboard-eyebrow">Editorial CMS</p>
          <h1>Editorial network operations.</h1>
          <p className="workspace-hero-note">
            One shared publishing workspace for national sites, multilingual updates, and public content delivery.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/admin">
              Open admin
            </Link>
            <Link className="dashboard-button dashboard-button--secondary" href="/uk">
              Open site
            </Link>
          </div>
        </div>
      </section>

      <section className="dashboard-card workspace-minimal-section">
        <p className="dashboard-card__eyebrow">Today</p>
        <div className="workspace-live-grid">
          {launchMetrics.map((item) => (
            <article key={item.label} className="workspace-live-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--split workspace-live-sections">
        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Sites</p>
          <div className="workspace-table">
            {siteRows.map((row) => (
              <div key={row.site} className="workspace-table__row">
                <div>
                  <strong>{row.site}</strong>
                  <span>{row.locale}</span>
                </div>
                <div className="workspace-table__meta">
                  <span
                    className={`workspace-badge ${
                      row.status === "Live" ? "workspace-badge--live" : "workspace-badge--review"
                    }`}
                  >
                    {row.status}
                  </span>
                  <span>{row.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Review queue</p>
          <div className="workspace-queue">
            {reviewQueue.map((item) => (
              <Link key={item.title} href={item.href} className="workspace-queue__item">
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--split workspace-live-sections">
        <article className="dashboard-card workspace-minimal-section workspace-brand-panel">
          <p className="dashboard-card__eyebrow">Visual direction</p>
          <h2>Typography, colour, and space built around a calmer editorial system.</h2>
          <p>
            Warm paper backgrounds, soil-toned hierarchy, restrained green emphasis, and orange reserved for high-priority actions.
          </p>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Colour hierarchy</p>
          <div className="workspace-mosaic">
            {visualPanels.map((panel) => (
              <div key={panel.title} className={`workspace-mosaic-card workspace-mosaic-card--${panel.tone}`}>
                <strong>{panel.title}</strong>
                <span>{panel.detail}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--split workspace-live-sections">
        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Editorial pulse</p>
          <div className="workspace-pulse-stack">
            {editorialPulse.map((item) => (
              <div key={item.label} className="workspace-pulse-row">
                <p className="workspace-pulse-label">{item.label}</p>
                <strong className="workspace-pulse-value">{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Release window</p>
          <div className="workspace-preview-stack">
            {releaseWindow.map((item) => (
              <div key={item.time} className="workspace-preview-row">
                <span className="workspace-status-pill">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-card workspace-minimal-section">
        <p className="dashboard-card__eyebrow">Settings snapshot</p>
        <div className="workspace-settings-grid">
          {settingsSnapshot.map((item) => (
            <div key={item.key} className="workspace-setting">
              <span>{item.key}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
