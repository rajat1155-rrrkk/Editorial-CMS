import Link from "next/link";

const launchMetrics = [
  { label: "Active sites", value: "16", detail: "Across Europe, Asia, and the Americas" },
  { label: "Locales live", value: "31", detail: "5 more in rollout review" },
  { label: "Items in review", value: "24", detail: "Pages, posts, events, and alerts" },
  { label: "API deliveries", value: "468", detail: "Last 24 hours" }
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

export default function Home() {
  return (
    <main className="dashboard-shell workspace-page workspace-page--minimal">
      <section className="dashboard-hero workspace-hero workspace-hero--minimal">
        <div className="dashboard-hero__copy workspace-copy--minimal">
          <p className="dashboard-eyebrow">Editorial CMS</p>
          <h1>Editorial network operations.</h1>
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
