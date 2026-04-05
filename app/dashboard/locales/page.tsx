import Link from "next/link";

const locales = [
  {
    site: "UK",
    languages: ["English"],
    defaultLocale: "English",
    status: "Live"
  },
  {
    site: "Germany",
    languages: ["German", "English"],
    defaultLocale: "German",
    status: "Live"
  },
  {
    site: "Spain",
    languages: ["Spanish", "English"],
    defaultLocale: "Spanish",
    status: "Review"
  },
  {
    site: "Italy",
    languages: ["Italian", "English"],
    defaultLocale: "Italian",
    status: "Live"
  },
  {
    site: "France",
    languages: ["French", "English"],
    defaultLocale: "French",
    status: "Live"
  },
  {
    site: "Portugal",
    languages: ["Portuguese", "English"],
    defaultLocale: "Portuguese",
    status: "Launching"
  },
  {
    site: "Netherlands",
    languages: ["Dutch", "English"],
    defaultLocale: "Dutch",
    status: "Live"
  },
  {
    site: "Sweden",
    languages: ["Swedish", "English"],
    defaultLocale: "Swedish",
    status: "Live"
  },
  {
    site: "Japan",
    languages: ["Japanese", "English"],
    defaultLocale: "Japanese",
    status: "Review"
  },
  {
    site: "South Korea",
    languages: ["Korean", "English"],
    defaultLocale: "Korean",
    status: "Provisioning"
  },
  {
    site: "India",
    languages: ["English", "Hindi"],
    defaultLocale: "English",
    status: "Live"
  },
  {
    site: "USA",
    languages: ["English", "Spanish"],
    defaultLocale: "English",
    status: "Live"
  },
  {
    site: "Canada",
    languages: ["English", "French"],
    defaultLocale: "English",
    status: "Live"
  },
  {
    site: "Mexico",
    languages: ["Spanish", "English"],
    defaultLocale: "Spanish",
    status: "Launching"
  },
  {
    site: "Brazil",
    languages: ["Portuguese", "English"],
    defaultLocale: "Portuguese",
    status: "Live"
  },
  {
    site: "Argentina",
    languages: ["Spanish", "English"],
    defaultLocale: "Spanish",
    status: "Review"
  }
];

const localeRules = [
  "Each site can publish in multiple languages without sharing a single lockstep workflow.",
  "Editors can manage translations for the site they own.",
  "Locale-aware URLs should stay indexable and predictable.",
  "New language variants can be added by super admins without custom infra work."
];

const localeMetrics = [
  { label: "Published languages", value: "12", detail: "Across 16 active sites" },
  { label: "Locale variants", value: "16", detail: "Live, review, launching, and provisioning" }
];

export default function LocalesPage() {
  return (
    <main className="dashboard-shell locales-page">
      <section className="dashboard-hero locales-hero">
        <div className="dashboard-hero__copy locales-hero__copy">
          <p className="dashboard-eyebrow">Locales</p>
          <h1>Language management for sites that need to publish globally and locally.</h1>
          <p className="dashboard-lede">
            This page shows the multilingual control surface: default
            languages, translation readiness, and clear site-level ownership.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard">
              Back to overview
            </Link>
            <a className="dashboard-button dashboard-button--secondary" href="#locales">
              Review locales
            </a>
          </div>
        </div>

        <aside className="dashboard-hero__panel locales-hero__panel" aria-label="Locale summary">
          {localeMetrics.map((item) => (
            <article key={item.label} className="dashboard-metric">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-card locales-table-shell" id="locales">
        <p className="dashboard-card__eyebrow">Locale map</p>
        <h2>Current site languages and default content language.</h2>
        <div className="sites-table" role="table" aria-label="Locale table">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Site</span>
            <span role="columnheader">Languages</span>
            <span role="columnheader">Default</span>
            <span role="columnheader">Status</span>
          </div>
          {locales.map((site) => (
            <article key={site.site} className="sites-table__row" role="row">
              <span role="cell">{site.site}</span>
              <span role="cell">{site.languages.join(" / ")}</span>
              <span role="cell">{site.defaultLocale}</span>
              <span role="cell">
                <span className="dashboard-status-pill">{site.status}</span>
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-split locales-rules">
        <div className="section-header">
          <p className="eyebrow">Translation rules</p>
          <h2>Simple policies that keep multilingual publishing manageable.</h2>
        </div>
        <div className="checklist-card">
          {localeRules.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
