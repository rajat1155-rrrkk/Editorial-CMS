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

const runtimeSnapshot = [
  { key: "Tenant mode", value: "Multi-site" },
  { key: "Content API", value: "Healthy" },
  { key: "Domain sync", value: "16 mapped" },
  { key: "Media usage", value: "8.6 GB / 40 GB" },
  { key: "Locale routing", value: "31 live variants" },
  { key: "Global banner", value: "Scheduled" }
];

const jobQueue = [
  { label: "Queued publishes", value: "3", detail: "Germany, Portugal, and Mexico staged for the next release run." },
  { label: "Blocked items", value: "2", detail: "One policy page and one homepage CTA are waiting on approval." },
  { label: "Media tasks", value: "7", detail: "Alt text, crops, and asset replacements are still open." }
];

const automationRuns = [
  { time: "09:00 UTC", title: "Publish batch", detail: "Germany and Portugal homepage release" },
  { time: "11:30 UTC", title: "Event sync", detail: "Japan schedule update and listing refresh" },
  { time: "15:00 UTC", title: "Banner rollout", detail: "Network notice update across active domains" }
];

const activityFeed = [
  {
    title: "Homepage refresh approved",
    meta: "Germany · 6 min ago",
    detail: "Release moved from review into the 09:00 UTC publish batch."
  },
  {
    title: "Event listing synced",
    meta: "Japan · 18 min ago",
    detail: "Calendar payload and public route were regenerated successfully."
  },
  {
    title: "New locale variant created",
    meta: "Canada · 27 min ago",
    detail: "French workflow and routing were provisioned for the campaign page."
  }
];

const serviceHealth = [
  { label: "Content API", value: "Healthy", detail: "No failed deliveries in the last hour." },
  { label: "Media pipeline", value: "Processing", detail: "7 assets waiting on crops or alt text." },
  { label: "Tenant routing", value: "Stable", detail: "All mapped domains responding normally." },
  { label: "Review workflow", value: "24 open", detail: "Approvals, translations, and publish checks." }
];

const attentionNow = [
  { label: "Needs review", value: "Summer homepage launch", href: "/dashboard/pages/homepage-refresh" },
  { label: "Blocked", value: "Policy update waiting on approval", href: "/dashboard/pages" },
  { label: "Next publish", value: "Germany homepage · 09:00 UTC", href: "/dashboard/posts" }
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

      <section className="dashboard-card workspace-minimal-section">
        <p className="dashboard-card__eyebrow">Needs attention now</p>
        <div className="workspace-attention-strip">
          {attentionNow.map((item) => (
            <Link key={item.value} href={item.href} className="workspace-attention-item">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </Link>
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
          <p className="dashboard-card__eyebrow">Recent activity</p>
          <div className="workspace-activity-feed">
            {activityFeed.map((item) => (
              <article key={item.title} className="workspace-activity-item">
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Health</p>
          <div className="workspace-service-grid">
            {serviceHealth.map((item) => (
              <div key={item.label} className="workspace-service-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--split workspace-live-sections">
        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Managed surfaces</p>
          <div className="workspace-surface-list">
            {[
              "Pages and campaigns",
              "Posts and stories",
              "Events and alerts",
              "Sites, locales, and API delivery"
            ].map((item) => (
              <div key={item} className="workspace-surface-item">
                <strong>{item}</strong>
                <span>Live workflow enabled</span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Next actions</p>
          <div className="workspace-queue">
            {[
              { title: "Open media queue", meta: "7 assets waiting · /dashboard/media", href: "/dashboard/media" },
              { title: "Review tenant launches", meta: "3 sites in rollout · /dashboard/sites", href: "/dashboard/sites" },
              { title: "Clear alert approvals", meta: "1 scheduled banner · /dashboard/alerts", href: "/dashboard/alerts" }
            ].map((item) => (
              <Link key={item.title} href={item.href} className="workspace-queue__item">
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--split workspace-live-sections">
        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Jobs</p>
          <div className="workspace-pulse-stack">
            {jobQueue.map((item) => (
              <div key={item.label} className="workspace-pulse-row">
                <p className="workspace-pulse-label">{item.label}</p>
                <strong className="workspace-pulse-value">{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card workspace-minimal-section">
          <p className="dashboard-card__eyebrow">Automation</p>
          <div className="workspace-preview-stack">
            {automationRuns.map((item) => (
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
        <p className="dashboard-card__eyebrow">Runtime</p>
        <div className="workspace-settings-grid">
          {runtimeSnapshot.map((item) => (
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
