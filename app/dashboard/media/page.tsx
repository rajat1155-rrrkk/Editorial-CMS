import Link from "next/link";

const mediaStats = [
  { label: "Assets ready", value: "1,176", detail: "Available for reuse across sites and locales" },
  { label: "New uploads", value: "34", detail: "Added in the last 7 days" },
  { label: "Cleanup flags", value: "8", detail: "Duplicates, missing alt text, stale crops" },
  { label: "Imports pending", value: "12", detail: "Legacy media batches still under review" }
];

const assetGroups = [
  {
    title: "Homepage assets",
    count: "248 files",
    detail: "Hero images, editorial cards, and alert banner artwork."
  },
  {
    title: "Campaign documents",
    count: "96 files",
    detail: "PDFs, press kits, and downloadable guides attached to pages."
  },
  {
    title: "Event visuals",
    count: "181 files",
    detail: "Carousel cards, banner crops, and reusable event imagery."
  }
];

const mediaQueue = [
  {
    name: "spring-volunteer-day.jpg",
    site: "France",
    use: "Homepage hero",
    type: "Image",
    status: "Optimized",
    checks: "Alt text set · 1600x900",
    note: "Featured on the site homepage and spring event carousel."
  },
  {
    name: "annual-report-2025.pdf",
    site: "Canada",
    use: "Downloads",
    type: "Document",
    status: "Published",
    checks: "Title linked · OCR complete",
    note: "Attached to About and Impact pages."
  },
  {
    name: "coordinator-portrait.webp",
    site: "Portugal",
    use: "Team block",
    type: "Image",
    status: "Needs alt text",
    checks: "Accessibility review pending",
    note: "Profile card ready, description still missing."
  },
  {
    name: "legacy-event-banner.png",
    site: "South Korea",
    use: "Imported batch",
    type: "Image",
    status: "Imported",
    checks: "Duplicate scan pending",
    note: "Recovered from migration and queued for cleanup."
  }
];

const mediaRules = [
  "Files are uploaded once and reused across homepage modules, posts, and event listings.",
  "Import batches preserve filename, caption, and source metadata when the legacy record is available.",
  "Accessibility checks cover alt text, document labels, and obvious duplicate crops before publish."
];

const mediaFilters = ["All assets", "Images", "Documents", "Needs alt text", "Imported"];

const liveSignals = [
  { label: "Editors online", value: "3", detail: "1 uploading, 1 reviewing, 1 cleaning imports" },
  { label: "Sync latency", value: "Live", detail: "Library refresh completed a few seconds ago" },
  { label: "Batch status", value: "2 open", detail: "One import batch and one cleanup batch" }
];

const activityLog = [
  "France replaced a homepage hero image and kept the same crop for mobile.",
  "Canada published a PDF guide with searchable text and a linked title.",
  "Portugal flagged one coordinator portrait for missing alt text.",
  "South Korea imported a legacy event banner and queued it for duplicate review."
];

export default function MediaDashboardPage() {
  return (
    <main className="dashboard-media-shell">
      <section className="dashboard-media-hero">
        <div className="dashboard-media-hero__copy">
          <p className="dashboard-media-eyebrow">Media library</p>
          <h1>Asset operations for the editorial network.</h1>
          <p className="dashboard-media-lede">
            A live-looking media workspace for uploads, reuse, accessibility checks, and migration cleanup across
            sites and locales.
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

      <section className="dashboard-grid dashboard-grid--three">
        {liveSignals.map((item) => (
          <article key={item.label} className="dashboard-media-card">
            <p className="dashboard-media-card__eyebrow">Live signal</p>
            <h2>{item.label}</h2>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
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
          <h2>Uploaded files with site context, usage, and review status.</h2>
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
            <span>2 imports awaiting QA</span>
          </div>
        </div>

        <div className="dashboard-media-table" role="table" aria-label="Media queue">
          <div className="dashboard-media-table__row dashboard-media-table__row--head" role="row">
            <span role="columnheader">File</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Use</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Checks</span>
            <span role="columnheader">Notes</span>
          </div>

          {mediaQueue.map((item) => (
            <article key={item.name} className="dashboard-media-table__row" role="row">
              <span role="cell">{item.name}</span>
              <span role="cell">{item.site}</span>
              <span role="cell">{item.use}</span>
              <span role="cell">{item.type}</span>
              <span role="cell">
                <span className="dashboard-status-pill">{item.status}</span>
              </span>
              <span role="cell">{item.checks}</span>
              <span role="cell">{item.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-media-rail">
        <article className="dashboard-media-card">
          <p className="dashboard-media-card__eyebrow">Recent activity</p>
          <h2>What changed in the library recently.</h2>
          <ol className="dashboard-media-list">
            {activityLog.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
