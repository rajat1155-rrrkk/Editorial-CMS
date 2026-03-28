import Link from "next/link";

const postStats = [
  { label: "Published stories", value: "128", detail: "Blog, news, and announcements" },
  { label: "Queued for translation", value: "9", detail: "Waiting on localized copy or title polish" },
  { label: "Scheduled posts", value: "5", detail: "Going live across multiple sites this week" },
  { label: "Migrated from WordPress", value: "73", detail: "Best-effort imports with media and metadata" }
];

const postQueue = [
  {
    title: "Spring volunteer roundup",
    category: "News",
    site: "France",
    status: "Scheduled",
    language: "French / English",
    notes: "Includes hero image, excerpt, and two related links."
  },
  {
    title: "Five lessons from the regional meetup",
    category: "Blog",
    site: "Canada",
    status: "Needs translation",
    language: "English / French",
    notes: "Copy is ready, but the subtitle still needs localization."
  },
  {
    title: "Introducing the new coordinator team",
    category: "Announcement",
    site: "Portugal",
    status: "Ready to publish",
    language: "Portuguese / English",
    notes: "Uses the author profile block and a quote callout."
  },
  {
    title: "Archive import: 2019 event stories",
    category: "Migration",
    site: "Korea",
    status: "Imported",
    language: "Korean / English",
    notes: "Legacy entries preserved with text, images, and tags."
  }
];

const publishingSteps = [
  "Write the story in the primary language and attach a strong excerpt.",
  "Add translations only after the structure and title are approved.",
  "Map media, tags, and related content before scheduling publication.",
  "Use migration imports for older posts, then clean them up in the editor."
];

const contentBlocks = [
  "Article lead and summary",
  "Pull quote and callout block",
  "Featured image and image gallery",
  "Related posts and topic chips",
  "Metadata for author, locale, and publish date"
];

export default function PostsDashboardPage() {
  return (
    <main className="dashboard-posts-shell">
      <section className="dashboard-posts-hero">
        <div className="dashboard-posts-hero__copy">
          <p className="dashboard-posts-eyebrow">Blog and news</p>
          <h1>Plan, draft, and publish editorial stories across sites.</h1>
          <p className="dashboard-posts-lede">
            This view acts like the real working content desk for news and blog
            posts. It shows how stories move through translation, scheduling,
            and best-effort migration from older WordPress archives.
          </p>
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

      <section className="dashboard-posts-grid">
        <article className="dashboard-posts-card">
          <p className="dashboard-posts-card__eyebrow">Publishing flow</p>
          <h2>Editors work from a lightweight, repeatable sequence.</h2>
          <ol className="dashboard-posts-steps">
            {publishingSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="dashboard-posts-card">
          <p className="dashboard-posts-card__eyebrow">Reusable content blocks</p>
          <h2>Stories stay consistent across every site and locale.</h2>
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
          <h2>Posts moving through draft, translation, schedule, and migration states.</h2>
        </div>

        <div className="dashboard-posts-table" role="table" aria-label="Post queue">
          <div className="dashboard-posts-table__row dashboard-posts-table__row--head" role="row">
            <span role="columnheader">Title</span>
            <span role="columnheader">Category</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Language</span>
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
              </span>
              <span role="cell">{item.category}</span>
              <span role="cell">{item.site}</span>
              <span role="cell">{item.status}</span>
              <span role="cell">{item.language}</span>
              <span role="cell">{item.notes}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
