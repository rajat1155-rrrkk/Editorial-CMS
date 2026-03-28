import Link from "next/link";

const sites = [
  {
    name: "Canada",
    domain: "ca.example.org",
    status: "Live",
    languages: ["English", "French"],
    owners: "3 editors",
    nextStep: "Refresh volunteer stories and publish a winter event archive."
  },
  {
    name: "France",
    domain: "fr.example.org",
    status: "Live",
    languages: ["French", "English"],
    owners: "4 editors",
    nextStep: "Complete homepage translations and lock the upcoming campaign page."
  },
  {
    name: "Portugal",
    domain: "pt.example.org",
    status: "Launching",
    languages: ["Portuguese", "English"],
    owners: "2 editors",
    nextStep: "Connect the new site to a public newsletter signup flow."
  },
  {
    name: "Korea",
    domain: "kr.example.org",
    status: "Provisioning",
    languages: ["Korean", "English"],
    owners: "2 editors",
    nextStep: "Import legacy posts and map the first editorial blocks."
  }
];

const controls = [
  "Add new national site",
  "Add language variant",
  "Assign coordinators",
  "Update domain mapping",
  "Review publication permissions"
];

const siteMetrics = [
  { label: "Configured sites", value: "18" },
  { label: "Editors assigned", value: "61" },
  { label: "Domains mapped", value: "22" },
  { label: "Queued launches", value: "4" }
];

export default function SitesPage() {
  return (
    <main className="sites-shell">
      <section className="sites-hero">
        <div className="sites-hero__copy">
          <p className="sites-eyebrow">Site management</p>
          <h1>Provision country websites and language variants in one place.</h1>
          <p className="sites-lede">
            This page sketches the super-admin view for federated publishing:
            clean ownership boundaries, simple site provisioning, and clear
            launch status across the network.
          </p>
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
          <p className="sites-card__eyebrow">Admin controls</p>
          <h2>Core actions for super admins.</h2>
          <ul className="sites-list">
            {controls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="sites-card">
          <p className="sites-card__eyebrow">Provisioning model</p>
          <h2>Out-of-the-box multi-site support with clear delegation.</h2>
          <p className="sites-copy">
            Each national site owns its editorial scope, while the federation can
            centrally configure domains, languages, and shared templates without
            building custom infrastructure around the CMS.
          </p>
          <p className="sites-copy">
            The sample assumes limited but practical permissions: one site for
            most coordinators, broader visibility for federation admins, and no
            unnecessary fine-grained complexity in the MVP.
          </p>
        </article>
      </section>

      <section className="sites-table-shell" id="sites">
        <div className="sites-table-shell__header">
          <p className="sites-eyebrow">Network status</p>
          <h2>Country site inventory and launch notes.</h2>
        </div>

        <div className="sites-table" role="table" aria-label="Managed sites">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Site</span>
            <span role="columnheader">Domain</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Languages</span>
            <span role="columnheader">Owners</span>
            <span role="columnheader">Next step</span>
          </div>

          {sites.map((site) => (
            <article key={site.name} className="sites-table__row" role="row">
              <span role="cell">{site.name}</span>
              <span role="cell">{site.domain}</span>
              <span role="cell">{site.status}</span>
              <span role="cell">{site.languages.join(" / ")}</span>
              <span role="cell">{site.owners}</span>
              <span role="cell">{site.nextStep}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
