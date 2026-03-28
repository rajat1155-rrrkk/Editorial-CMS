import Link from "next/link";

const pageStats = [
  { label: "Published pages", value: "42", detail: "Across 18 active sites" },
  { label: "Draft pages", value: "11", detail: "Waiting on translation or review" },
  { label: "Reusable blocks", value: "19", detail: "Shared sections available in the editor" },
  { label: "Updated this week", value: "6", detail: "Contact, About, Projects, and landing pages" }
];

const pageQueue = [
  {
    title: "Homepage refresh",
    site: "France",
    status: "Ready for review",
    locale: "French + English",
    note: "Uses the new banner, hero stats, and editorial CTA block."
  },
  {
    title: "About the network",
    site: "Canada",
    status: "Needs translation",
    locale: "English + French",
    note: "Needs final copy cleanup before the bilingual publish step."
  },
  {
    title: "Projects index",
    site: "Portugal",
    status: "Scheduled",
    locale: "Portuguese + English",
    note: "Lists the new seasonal initiatives and partner highlights."
  },
  {
    title: "Contact and support",
    site: "Korea",
    status: "Published",
    locale: "Korean + English",
    note: "Includes form summary, map snippet, and coordinator contacts."
  }
];

const pageBlocks = [
  "Hero, intro copy, and call-to-action rows",
  "Image + text and gallery sections",
  "Impact statistics and testimonial highlights",
  "Document download and social link modules",
  "Global alert banner and language-aware intro blocks"
];

const reviewNotes = [
  "Editors can duplicate a page template into a new locale and preserve the block structure.",
  "Super admins can publish globally shared banners without editing every site by hand.",
  "Page previews are rendered before publish so local coordinators can catch layout issues early."
];

export default function PagesDashboardPage() {
  return (
    <main className="dashboard-pages-shell">
      <section className="dashboard-pages-hero">
        <div className="dashboard-pages-hero__copy">
          <p className="dashboard-pages-eyebrow">Pages</p>
          <h1>Manage static and semi-static pages for every country site.</h1>
          <p className="dashboard-pages-lede">
            This screen represents the working CMS surface for About, Projects,
            Contact, and other page-driven content. It keeps reusable blocks,
            locale variants, and publish states in one editorial queue.
          </p>
          <div className="dashboard-pages-actions">
            <Link href="/dashboard" className="dashboard-pages-button dashboard-pages-button--primary">
              Back to dashboard
            </Link>
            <a href="#queue" className="dashboard-pages-button dashboard-pages-button--secondary">
              Review queue
            </a>
          </div>
        </div>

        <aside className="dashboard-pages-panel" aria-label="Page summary">
          {pageStats.map((item) => (
            <article key={item.label} className="dashboard-pages-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-pages-grid">
        <article className="dashboard-pages-card">
          <p className="dashboard-pages-card__eyebrow">Reusable blocks</p>
          <h2>Common content sections editors can compose quickly.</h2>
          <ul className="dashboard-pages-list">
            {pageBlocks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-pages-card">
          <p className="dashboard-pages-card__eyebrow">Editorial guidance</p>
          <h2>Page-level review stays simple and predictable.</h2>
          <div className="dashboard-pages-notes">
            {reviewNotes.map((item) => (
              <p key={item} className="dashboard-pages-note">
                {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-pages-table-shell" id="queue">
        <div className="dashboard-pages-table-shell__header">
          <p className="dashboard-pages-eyebrow">Page queue</p>
          <h2>Drafts, translations, and publish states across the network.</h2>
        </div>

        <div className="dashboard-pages-table" role="table" aria-label="Page queue">
          <div className="dashboard-pages-table__row dashboard-pages-table__row--head" role="row">
            <span role="columnheader">Page</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Locales</span>
            <span role="columnheader">Notes</span>
          </div>

          {pageQueue.map((item) => (
            <article key={item.title} className="dashboard-pages-table__row" role="row">
              <span role="cell">
                {item.title === "Homepage refresh" ? (
                  <Link href="/dashboard/pages/homepage-refresh" className="table-inline-link">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </span>
              <span role="cell">{item.site}</span>
              <span role="cell">{item.status}</span>
              <span role="cell">{item.locale}</span>
              <span role="cell">{item.note}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
