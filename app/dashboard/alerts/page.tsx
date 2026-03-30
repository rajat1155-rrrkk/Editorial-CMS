import Link from "next/link";

const alerts = [
  {
    title: "Maintenance notice",
    audience: "All sites",
    status: "Scheduled",
    copy: "Site-wide maintenance banner set for April 2 from 01:00 to 03:00 UTC."
  },
  {
    title: "SEO review",
    audience: "Europe cluster",
    status: "Needs edits",
    copy: "Three translated pages are missing meta descriptions before release."
  },
  {
    title: "Campaign banner",
    audience: "Americas cluster",
    status: "Ready",
    copy: "Localized promotion banner approved and waiting for publish time."
  },
  {
    title: "Regional briefing",
    audience: "Asia cluster",
    status: "Draft",
    copy: "Japan, South Korea, and India are scheduled for the next release window."
  }
];

const bannerOptions = [
  "Show globally across all managed sites",
  "Limit to selected countries or languages",
  "Use rich text, links, and simple emphasis",
  "Schedule start and end times with editor review"
];

const alertMetrics = [
  { label: "Regional clusters", value: "3", detail: "Europe, Asia, and Americas" },
  { label: "Active banners", value: "1", detail: "Maintenance banner currently queued" }
];

export default function AlertsPage() {
  return (
    <main className="dashboard-shell alerts-page">
      <section className="dashboard-hero alerts-hero">
        <div className="dashboard-hero__copy alerts-hero__copy">
          <p className="dashboard-eyebrow">Global alerts</p>
          <h1>Site-wide messaging for maintenance, campaigns, and urgent updates.</h1>
          <p className="dashboard-lede">
            Alerts are a simple but essential part of the MVP: one place to
            manage banners, target audiences, and publish timing across every
            country site.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard">
              Back to overview
            </Link>
            <a className="dashboard-button dashboard-button--secondary" href="#alerts">
              Review alerts
            </a>
          </div>
        </div>

        <aside className="dashboard-hero__panel alerts-hero__panel" aria-label="Banner summary">
          {alertMetrics.map((item) => (
            <article key={item.label} className="dashboard-metric">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-card alerts-list" id="alerts">
        <p className="dashboard-card__eyebrow">Alert queue</p>
        <h2>Current banners and their publication state.</h2>
        <div className="dashboard-stage-list">
          {alerts.map((alert) => (
            <article key={alert.title} className="dashboard-stage">
              <div className="dashboard-stage__row">
                <h3>{alert.title}</h3>
                <span>{alert.status}</span>
              </div>
              <p>{alert.copy}</p>
              <p>{alert.audience}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-split alerts-guidelines">
        <div className="section-header">
          <p className="eyebrow">Banner rules</p>
          <h2>Keep public notices concise and easy to verify.</h2>
        </div>
        <div className="roadmap-card">
          {bannerOptions.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
