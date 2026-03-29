import Link from "next/link";

const launchMetrics = [
  { label: "Active sites", value: "18", detail: "4 staged this week" },
  { label: "Locales live", value: "7", detail: "2 pending review" },
  { label: "Items in review", value: "14", detail: "Pages, posts, events" },
  { label: "API deliveries", value: "126", detail: "Last 24 hours" }
];

const siteRows = [
  {
    site: "France",
    locale: "fr, en",
    status: "Live",
    updated: "12 min ago"
  },
  {
    site: "India",
    locale: "en, hi",
    status: "Review",
    updated: "46 min ago"
  },
  {
    site: "Canada",
    locale: "en, fr",
    status: "Live",
    updated: "2 hr ago"
  }
];

const reviewQueue = [
  {
    title: "Homepage spring update",
    meta: "France · Page · Editor review",
    href: "/dashboard/pages/homepage-refresh"
  },
  {
    title: "Volunteer roundup",
    meta: "Canada · Post · Ready to publish",
    href: "/dashboard/posts/spring-volunteer-roundup"
  },
  {
    title: "Open farm day",
    meta: "India · Event · Time change requested",
    href: "/dashboard/events/spring-open-farm-day"
  }
];

const settingsSnapshot = [
  { key: "Primary mode", value: "Multi-site" },
  { key: "Content API", value: "/api/content" },
  { key: "Public domains", value: "18 mapped" },
  { key: "Media storage", value: "4.2 GB / 20 GB" },
  { key: "Locales", value: "en, fr, hi, pt" },
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
            <Link className="dashboard-button dashboard-button--secondary" href="/france">
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
