import Link from "next/link";

const mediaStats = [
  { label: "Assets in library", value: "1,284", detail: "Images, documents, and embeds" },
  { label: "Used this week", value: "96", detail: "Across pages, posts, and events" },
  { label: "Duplicates flagged", value: "8", detail: "Potential cleanup opportunities" },
  { label: "WordPress imports", value: "214", detail: "Migrated media items from legacy sites" }
];

const assetGroups = [
  {
    title: "Feature images",
    count: "342 files",
    detail: "Hero images and post thumbnails ready for reuse."
  },
  {
    title: "Documents",
    count: "118 files",
    detail: "PDFs, reports, and downloadables attached to pages."
  },
  {
    title: "Event media",
    count: "196 files",
    detail: "Banners, cards, and gallery images for calendars."
  }
];

const mediaQueue = [
  {
    name: "spring-volunteer-day.jpg",
    site: "France",
    type: "Image",
    status: "Optimized",
    note: "Used on the homepage hero and event carousel."
  },
  {
    name: "annual-report-2025.pdf",
    site: "Canada",
    type: "Document",
    status: "Published",
    note: "Attached to the About and Impact pages."
  },
  {
    name: "coordinator-portrait.webp",
    site: "Portugal",
    type: "Image",
    status: "Needs alt text",
    note: "Awaiting localization and accessibility review."
  },
  {
    name: "legacy-event-banner.png",
    site: "Korea",
    type: "Image",
    status: "Imported",
    note: "Recovered from WordPress and ready for cleanup."
  }
];

const mediaRules = [
  "Editors upload once and reuse the same asset across pages and locales.",
  "Migration imports keep filenames, captions, and source metadata when available.",
  "Accessibility checks ensure alt text and document labels are not skipped."
];

const mediaFilters = ["All assets", "Images", "Documents", "Needs alt text", "Imported"];

export default function MediaDashboardPage() {
  return (
    <main className="dashboard-media-shell">
      <section className="dashboard-media-hero">
        <div className="dashboard-media-hero__copy">
          <p className="dashboard-media-eyebrow">Media library</p>
          <h1>Keep reusable assets organized across sites and languages.</h1>
          <p className="dashboard-media-lede">
            This screen models the asset layer behind the CMS: uploads, reuse,
            optimization, import cleanup, and enough structure for editors to
            understand what is ready to publish.
          </p>
          <div className="dashboard-media-actions">
            <Link href="/dashboard" className="dashboard-media-button dashboard-media-button--primary">
              Back to dashboard
            </Link>
            <a href="#library" className="dashboard-media-button dashboard-media-button--secondary">
              Review library
            </a>
          </div>
        </div>

        <aside className="dashboard-media-panel" aria-label="Media summary">
          {mediaStats.map((item) => (
            <article key={item.label} className="dashboard-media-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-media-grid">
        {assetGroups.map((item) => (
          <article key={item.title} className="dashboard-media-card">
            <p className="dashboard-media-card__eyebrow">Asset group</p>
            <h2>{item.title}</h2>
            <strong>{item.count}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-media-rail">
        <article className="dashboard-media-card">
          <p className="dashboard-media-card__eyebrow">Media rules</p>
          <h2>Reuse, accessibility, and cleanup stay visible in the workflow.</h2>
          <ul className="dashboard-media-list">
            {mediaRules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-media-table-shell" id="library">
        <div className="dashboard-media-table-shell__header">
          <p className="dashboard-media-eyebrow">Asset queue</p>
          <h2>Uploaded files with status, site context, and editorial notes.</h2>
        </div>
        <div className="dashboard-toolbar" aria-label="Media controls">
          <div className="dashboard-filter-group">
            {mediaFilters.map((item, index) => (
              <span
                key={item}
                className={`dashboard-filter-chip${index === 0 ? " dashboard-filter-chip--active" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="dashboard-toolbar-meta">
            <span>Library sync complete</span>
            <span>8 cleanup flags</span>
          </div>
        </div>

        <div className="dashboard-media-table" role="table" aria-label="Media queue">
          <div className="dashboard-media-table__row dashboard-media-table__row--head" role="row">
            <span role="columnheader">File</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Notes</span>
          </div>

          {mediaQueue.map((item) => (
            <article key={item.name} className="dashboard-media-table__row" role="row">
              <span role="cell">{item.name}</span>
              <span role="cell">{item.site}</span>
              <span role="cell">{item.type}</span>
              <span role="cell">
                <span className="dashboard-status-pill">{item.status}</span>
              </span>
              <span role="cell">{item.note}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
