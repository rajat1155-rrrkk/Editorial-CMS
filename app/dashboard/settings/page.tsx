import Link from "next/link";

const settings = [
  {
    label: "Default theme",
    value: "Editorial neutral",
    detail: "Applies the common public styling across country sites"
  },
  {
    label: "Publishing mode",
    value: "SSR public web",
    detail: "Keeps pages indexable and fast for search and sharing"
  },
  {
    label: "Content workflow",
    value: "Draft, review, publish",
    detail: "Simple approval flow without fine-grained complexity"
  },
  {
    label: "Migration support",
    value: "WordPress blog import",
    detail: "Best-effort migration path for existing editorial posts"
  }
];

const domains = [
  { site: "Canada", domain: "ca.example.org", status: "Verified" },
  { site: "France", domain: "fr.example.org", status: "Verified" },
  { site: "Portugal", domain: "pt.example.org", status: "Pending SSL" },
  { site: "Korea", domain: "kr.example.org", status: "Provisioning" }
];

const toggles = [
  "Allow super admins to create new sites",
  "Enable multilingual routes for every new site",
  "Show the global alert banner site-wide",
  "Expose public content through future APIs"
];

export default function SettingsPage() {
  return (
    <main className="dashboard-shell settings-page">
      <section className="dashboard-hero settings-hero">
        <div className="dashboard-hero__copy settings-hero__copy">
          <p className="dashboard-eyebrow">Site settings</p>
          <h1>Federation-wide defaults that stay predictable for every site.</h1>
          <p className="dashboard-lede">
            This page represents the operational layer: shared config, domains,
            publish rules, and default behavior that super admins can manage
            without custom infrastructure.
          </p>
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
          {settings.slice(0, 2).map((item) => (
            <article key={item.label} className="dashboard-metric">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--two settings-grid">
        {settings.map((item) => (
          <article key={item.label} className="dashboard-card settings-card">
            <p className="dashboard-card__eyebrow">Default</p>
            <h2>{item.label}</h2>
            <p>{item.value}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="section-split settings-controls">
        <div className="section-header">
          <p className="eyebrow">Global controls</p>
          <h2>Flags that shape the behavior of every managed site.</h2>
        </div>
        <div className="checklist-card">
          {toggles.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
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
    </main>
  );
}
