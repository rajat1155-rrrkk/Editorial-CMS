import Link from "next/link";

const postStats = [
  { label: "Items in review", value: "12", detail: "7 waiting on translation" },
  { label: "Scheduled this week", value: "8", detail: "Queued across 4 sites" },
  { label: "Editorial handoffs", value: "21", detail: "Author -> reviewer -> publisher" },
  { label: "Imported batches", value: "73", detail: "WordPress posts synced" }
];

const postQueue = [
  {
    title: "Spring volunteer roundup",
    category: "News",
    site: "France",
    status: "Scheduled",
    language: "French / English",
    people: "Author: France editorial desk",
    reviewer: "Reviewed by: Network editor",
    schedule: "Mon 09:00 UTC",
    notes: "Hero image approved · related links attached"
  },
  {
    title: "Five lessons from the regional meetup",
    category: "Blog",
    site: "Canada",
    status: "Needs translation",
    language: "English / French",
    people: "Author: Canada editorial desk",
    reviewer: "Translator: French locale reviewer",
    schedule: "Translation due today",
    notes: "Subtitle still pending localization"
  },
  {
    title: "Introducing the new coordinator team",
    category: "Announcement",
    site: "Portugal",
    status: "Ready to publish",
    language: "Portuguese / English",
    people: "Author: Portugal editorial desk",
    reviewer: "Reviewed by: Regional publisher",
    schedule: "Release window open",
    notes: "Author profile block and quote callout locked"
  },
  {
    title: "Archive import: 2019 event stories",
    category: "Migration",
    site: "Korea",
    status: "Imported",
    language: "Korean / English",
    people: "Imported by: CMS migration job",
    reviewer: "QA review: Pending",
    schedule: "Imported batch 03",
    notes: "Legacy text and media preserved"
  }
];

const publishingSteps = [
  "Draft the primary-language story, assign an author, and attach the reviewer.",
  "Lock the subtitle and excerpt after translation pass 1 is complete.",
  "Tag the post, attach media, and confirm the publish window.",
  "Use the import queue for legacy stories, then clean them up in the editor."
];

const contentBlocks = [
  "Article lead and summary",
  "Pull quote and callout block",
  "Featured image and image gallery",
  "Related posts and topic chips",
  "Author, reviewer, locale, and publish date"
];

const postFilters = ["All stories", "Scheduled", "Needs translation", "Migration", "Ready to publish"];

const liveSignals = [
  { label: "Editors online", value: "3", detail: "2 writing, 1 approving" },
  { label: "Translation queue", value: "9", detail: "French and English" },
  { label: "Publish window", value: "11:00", detail: "UTC release slot" }
];

export default function PostsDashboardPage() {
  return (
    <main className="dashboard-posts-shell">
      <section className="dashboard-posts-hero">
        <div className="dashboard-posts-hero__copy">
          <p className="dashboard-posts-eyebrow">Blog and news</p>
          <h1>Stories, handoffs, and scheduled releases across sites.</h1>
          <div className="dashboard-posts-actions">
            <Link href="/dashboard" className="dashboard-posts-button dashboard-posts-button--primary">
              Back to dashboard
            </Link>
            <a href="#stories" className="dashboard-posts-button dashboard-posts-button--secondary">
              Review stories
            </a>
          </div>
        </div>

        <aside className="dashboard-posts-panel" aria-label="Post summary">
          {postStats.map((item) => (
            <article key={item.label} className="dashboard-posts-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        {liveSignals.map((item) => (
          <article key={item.label} className="dashboard-posts-card">
            <p className="dashboard-posts-card__eyebrow">Live signal</p>
            <h2>{item.label}</h2>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-posts-grid">
        <article className="dashboard-posts-card">
          <p className="dashboard-posts-card__eyebrow">Publishing flow</p>
          <h2>Editors work from a repeatable sequence with clear handoffs.</h2>
          <ol className="dashboard-posts-steps">
            {publishingSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="dashboard-posts-card">
          <p className="dashboard-posts-card__eyebrow">Editorial standards</p>
          <h2>Posts stay consistent across every site and locale.</h2>
          <ul className="dashboard-posts-list">
            {contentBlocks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-posts-table-shell" id="stories">
        <div className="dashboard-posts-table-shell__header">
          <p className="dashboard-posts-eyebrow">Story queue</p>
          <h2>Drafts moving through review, translation, scheduling, and migration.</h2>
        </div>
        <div className="dashboard-toolbar" aria-label="Post controls">
          <div className="dashboard-filter-group">
            {postFilters.map((item, index) => (
              <span
                key={item}
                className={`dashboard-filter-chip${index === 0 ? " dashboard-filter-chip--active" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="dashboard-toolbar-meta">
            <span>3 editors online</span>
            <span>1 reviewer offline</span>
            <span>Migration batch 03 open</span>
          </div>
        </div>

        <div className="dashboard-posts-table" role="table" aria-label="Post queue">
          <div className="dashboard-posts-table__row dashboard-posts-table__row--head" role="row">
            <span role="columnheader">Title</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">People</span>
            <span role="columnheader">Schedule</span>
            <span role="columnheader">Notes</span>
          </div>

          {postQueue.map((item) => (
            <article key={item.title} className="dashboard-posts-table__row" role="row">
              <span role="cell">
                {item.title === "Spring volunteer roundup" ? (
                  <Link href="/dashboard/posts/spring-volunteer-roundup" className="table-inline-link">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
                <br />
                <span>{item.category}</span>
              </span>
              <span role="cell">{item.site}</span>
              <span role="cell">
                <span className="dashboard-status-pill">{item.status}</span>
              </span>
              <span role="cell">
                <span>{item.people}</span>
                <br />
                <span>{item.reviewer}</span>
              </span>
              <span role="cell">
                <span>{item.language}</span>
                <br />
                <span>{item.schedule}</span>
              </span>
              <span role="cell">
                <span>{item.notes}</span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
