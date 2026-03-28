import Link from "next/link";

const articleStructure = [
  "Lead summary and featured image",
  "Three regional highlights with inline pull quote",
  "Coordinator note and related links module",
  "Translation status and publish metadata"
];

const editorialChecks = [
  "Featured image credit verified",
  "English body copy approved",
  "French translation in progress",
  "Related posts mapped for homepage slot"
];

export default function SpringVolunteerRoundupPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Post editor</p>
          <h1>Spring volunteer roundup</h1>
          <p className="editor-lede">
            A deeper editorial view for one article, showing structure,
            translation state, and publish readiness in a way that feels like a
            real content desk rather than a flat list.
          </p>
          <div className="editor-actions">
            <Link href="/dashboard/posts" className="dashboard-button dashboard-button--secondary">
              Back to posts
            </Link>
            <Link href="/preview/france" className="dashboard-button dashboard-button--primary">
              Preview on site
            </Link>
          </div>
        </div>
        <aside className="editor-meta">
          <article className="editor-meta-card">
            <span>Status</span>
            <strong>Scheduled</strong>
          </article>
          <article className="editor-meta-card">
            <span>Category</span>
            <strong>News</strong>
          </article>
          <article className="editor-meta-card">
            <span>Publish date</span>
            <strong>April 8</strong>
          </article>
        </aside>
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Article structure</p>
          <h2>Modules included in the current draft.</h2>
          <ul className="dashboard-list">
            {articleStructure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Editorial checks</p>
          <h2>Quality gates before publication.</h2>
          <ul className="dashboard-list">
            {editorialChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="editor-card">
        <p className="dashboard-card__eyebrow">Excerpt preview</p>
        <h2>The story is ready for scheduling once bilingual review finishes.</h2>
        <p className="editor-richtext">
          This roundup pulls together the strongest volunteer stories from the
          season, balancing practical updates with a warmer editorial tone. In a
          working CMS, this section would be the rich-text editor preview, with
          block controls and translation state shown alongside it.
        </p>
      </section>
    </main>
  );
}
