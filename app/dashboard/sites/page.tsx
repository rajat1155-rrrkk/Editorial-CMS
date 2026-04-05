import Link from "next/link";

const sites = [
  {
    name: "UK",
    domain: "uk.editorial-demo.org",
    status: "Live",
    languages: ["English"],
    owners: "3 editors",
    updatedAt: "12 min ago",
    nextStep: "Homepage refresh queued for approval."
  },
  {
    name: "Germany",
    domain: "germany.editorial-demo.org",
    status: "Live",
    languages: ["German", "English"],
    owners: "4 editors",
    updatedAt: "24 min ago",
    nextStep: "Spring campaign page scheduled for Monday."
  },
  {
    name: "Spain",
    domain: "spain.editorial-demo.org",
    status: "Review",
    languages: ["Spanish", "English"],
    owners: "3 editors",
    updatedAt: "31 min ago",
    nextStep: "Homepage banner waiting on translation QA."
  },
  {
    name: "Italy",
    domain: "italy.editorial-demo.org",
    status: "Live",
    languages: ["Italian", "English"],
    owners: "4 editors",
    updatedAt: "18 min ago",
    nextStep: "Event carousel synced to the public site."
  },
  {
    name: "France",
    domain: "france.editorial-demo.org",
    status: "Live",
    languages: ["French", "English"],
    owners: "4 editors",
    updatedAt: "34 min ago",
    nextStep: "Spring campaign page scheduled for Monday."
  },
  {
    name: "Portugal",
    domain: "portugal.editorial-demo.org",
    status: "Launching",
    languages: ["Portuguese", "English"],
    owners: "2 editors",
    updatedAt: "1 hr ago",
    nextStep: "SSL and domain cutover in progress."
  },
  {
    name: "Netherlands",
    domain: "netherlands.editorial-demo.org",
    status: "Live",
    languages: ["Dutch", "English"],
    owners: "3 editors",
    updatedAt: "28 min ago",
    nextStep: "Homepage impact metrics updated."
  },
  {
    name: "Sweden",
    domain: "sweden.editorial-demo.org",
    status: "Live",
    languages: ["Swedish", "English"],
    owners: "2 editors",
    updatedAt: "41 min ago",
    nextStep: "Community stories queued for review."
  },
  {
    name: "Japan",
    domain: "japan.editorial-demo.org",
    status: "Review",
    languages: ["Japanese", "English"],
    owners: "3 editors",
    updatedAt: "12 min ago",
    nextStep: "Event translation locked for QA."
  },
  {
    name: "South Korea",
    domain: "korea.editorial-demo.org",
    status: "Provisioning",
    languages: ["Korean", "English"],
    owners: "2 editors",
    updatedAt: "Today",
    nextStep: "Initial blog import and locale setup pending."
  },
  {
    name: "India",
    domain: "india.editorial-demo.org",
    status: "Live",
    languages: ["English", "Hindi"],
    owners: "5 editors",
    updatedAt: "9 min ago",
    nextStep: "Regional stories syncing to the homepage feed."
  },
  {
    name: "USA",
    domain: "usa.editorial-demo.org",
    status: "Live",
    languages: ["English", "Spanish"],
    owners: "4 editors",
    updatedAt: "21 min ago",
    nextStep: "Newsletter block approved."
  },
  {
    name: "Canada",
    domain: "canada.editorial-demo.org",
    status: "Live",
    languages: ["English", "French"],
    owners: "4 editors",
    updatedAt: "14 min ago",
    nextStep: "Homepage refresh queued for approval."
  },
  {
    name: "Mexico",
    domain: "mexico.editorial-demo.org",
    status: "Launching",
    languages: ["Spanish", "English"],
    owners: "3 editors",
    updatedAt: "47 min ago",
    nextStep: "Partner campaign content in final review."
  },
  {
    name: "Brazil",
    domain: "brazil.editorial-demo.org",
    status: "Live",
    languages: ["Portuguese", "English"],
    owners: "4 editors",
    updatedAt: "16 min ago",
    nextStep: "Seasonal event cards updated."
  },
  {
    name: "Argentina",
    domain: "argentina.editorial-demo.org",
    status: "Review",
    languages: ["Spanish", "English"],
    owners: "2 editors",
    updatedAt: "33 min ago",
    nextStep: "Editorial QA before public release."
  }
];

const launchQueue = [
  { item: "Portugal", note: "Domain certificate waiting on DNS propagation" },
  { item: "South Korea", note: "Legacy post import validation due today" },
  { item: "Mexico", note: "New tenant request approved, workspace not yet provisioned" }
];

const siteMetrics = [
  { label: "Configured sites", value: "16" },
  { label: "Editors assigned", value: "92" },
  { label: "Domains mapped", value: "16" },
  { label: "Queued launches", value: "6" }
];

const provisioningActions = [
  { label: "Create site", value: "2 pending requests" },
  { label: "Add locale", value: "fr-CA staged" },
  { label: "Assign editors", value: "8 invites open" },
  { label: "Domain cutover", value: "2 waiting on SSL" }
];

export default function SitesPage() {
  return (
    <main className="sites-shell">
      <section className="sites-hero">
        <div className="sites-hero__copy">
          <p className="sites-eyebrow">Site management</p>
          <h1>Operate sites, domains, and locales from one workspace.</h1>
          <div className="sites-actions">
            <Link href="/dashboard" className="sites-button sites-button--primary">
              Back to overview
            </Link>
            <a href="#sites" className="sites-button sites-button--secondary">
              Review sites
            </a>
          </div>
        </div>

        <aside className="sites-hero__panel" aria-label="Site metrics">
          {siteMetrics.map((item) => (
            <article key={item.label} className="sites-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </aside>
      </section>

      <section className="sites-grid">
        <article className="sites-card">
          <p className="sites-card__eyebrow">Provisioning</p>
          <div className="workspace-settings-grid">
            {provisioningActions.map((item) => (
              <div key={item.label} className="workspace-setting">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="sites-card">
          <p className="sites-card__eyebrow">Launch queue</p>
          <ul className="dashboard-list">
            {launchQueue.map((item) => (
              <li key={item.item}>
                <strong>{item.item}:</strong> {item.note}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="sites-table-shell" id="sites">
        <div className="sites-table-shell__header">
          <p className="sites-eyebrow">Network status</p>
          <h2>Site inventory and rollout notes.</h2>
        </div>

        <div className="sites-table" role="table" aria-label="Managed sites">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Site</span>
            <span role="columnheader">Domain</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Languages</span>
            <span role="columnheader">Owners</span>
            <span role="columnheader">Last update</span>
            <span role="columnheader">Next step</span>
          </div>

          {sites.map((site) => (
            <article key={site.name} className="sites-table__row" role="row">
              <span role="cell">{site.name}</span>
              <span role="cell">{site.domain}</span>
              <span role="cell">
                <span className="dashboard-status-pill">{site.status}</span>
              </span>
              <span role="cell">{site.languages.join(" / ")}</span>
              <span role="cell">{site.owners}</span>
              <span role="cell">{site.updatedAt}</span>
              <span role="cell">{site.nextStep}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
