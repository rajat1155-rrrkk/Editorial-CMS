import Link from "next/link";

const environment = [
  {
    label: "Public app",
    value: "Vercel production",
    detail: "18 mapped domains · edge cache enabled"
  },
  {
    label: "Content API",
    value: "/api/content",
    detail: "Serverless route · 126 successful reads today"
  },
  {
    label: "Media storage",
    value: "4.2 GB used",
    detail: "Shared library · 20 GB allocation"
  },
  {
    label: "Publish flow",
    value: "Draft → Review → Publish",
    detail: "2 queues waiting for approval"
  }
];

const domains = [
  { site: "Canada", domain: "canada.editorial-demo.org", status: "Verified" },
  { site: "France", domain: "france.editorial-demo.org", status: "Verified" },
  { site: "Portugal", domain: "portugal.editorial-demo.org", status: "Pending SSL" },
  { site: "Korea", domain: "korea.editorial-demo.org", status: "Provisioning" }
];

const flags = [
  { label: "Create new sites", state: "Enabled" },
  { label: "Locale variants", state: "Enabled" },
  { label: "Global banner", state: "Enabled" },
  { label: "Public API exposure", state: "Enabled" },
  { label: "Legacy imports", state: "Scheduled" },
  { label: "Public submissions", state: "Off" }
];

const settingsSnapshot = [
  { key: "Default theme", value: "Editorial White" },
  { key: "Homepage layout", value: "Block builder v2" },
  { key: "Default locale", value: "en" },
  { key: "Search indexing", value: "On" },
  { key: "Alert banner", value: "Network Summit 2026" },
  { key: "Migration mode", value: "WordPress posts only" }
];

const releaseNotes = [
  "France domain certificate renewed successfully.",
  "India locale set updated to include Hindi content review.",
  "Two imported blog batches are waiting for image cleanup."
];

export default function SettingsPage() {
  return (
    <main className="dashboard-shell settings-page">
      <section className="dashboard-hero settings-hero">
        <div className="dashboard-hero__copy settings-hero__copy">
          <p className="dashboard-eyebrow">Site settings</p>
          <h1>Shared configuration for the editorial network.</h1>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard">
              Back to overview
            </Link>
            <a className="dashboard-button dashboard-button--secondary" href="#domains">
              Review domains
            </a>
          </div>
        </div>

        <aside className="dashboard-hero__panel settings-hero__panel" aria-label="Settings summary">
          {environment.slice(0, 2).map((item) => (
            <article key={item.label} className="dashboard-metric">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--two settings-grid">
        {environment.map((item) => (
          <article key={item.label} className="dashboard-card settings-card">
            <p className="dashboard-card__eyebrow">Environment</p>
            <h2>{item.label}</h2>
            <p>{item.value}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--split">
        <article className="dashboard-card settings-card">
          <p className="dashboard-card__eyebrow">Feature flags</p>
          <div className="workspace-settings-grid">
            {flags.map((item) => (
              <div key={item.label} className="workspace-setting">
                <span>{item.label}</span>
                <strong>{item.state}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card settings-card">
          <p className="dashboard-card__eyebrow">Current values</p>
          <div className="workspace-settings-grid">
            {settingsSnapshot.map((item) => (
              <div key={item.key} className="workspace-setting">
                <span>{item.key}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-card settings-domains" id="domains">
        <p className="dashboard-card__eyebrow">Domains</p>
        <h2>Connected domains and rollout status.</h2>
        <div className="sites-table" role="table" aria-label="Domain mapping">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Site</span>
            <span role="columnheader">Domain</span>
            <span role="columnheader">Status</span>
          </div>
          {domains.map((domain) => (
            <article key={domain.site} className="sites-table__row" role="row">
              <span role="cell">{domain.site}</span>
              <span role="cell">{domain.domain}</span>
              <span role="cell">{domain.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card settings-card">
        <p className="dashboard-card__eyebrow">Release notes</p>
        <ul className="dashboard-list">
          {releaseNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
