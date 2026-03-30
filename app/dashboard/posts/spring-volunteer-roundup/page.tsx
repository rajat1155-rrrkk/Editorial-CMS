import Link from "next/link";

const articleStructure = [
  "Lead summary, featured image, and social preview",
  "Three regional highlights with inline pull quote",
  "Coordinator note, related links, and topic chips",
  "Translation state and publish metadata"
];

const editorialChecks = [
  "Featured image credit verified",
  "English body copy approved",
  "French translation in progress",
  "Related posts mapped for homepage slot",
  "Schedule window reserved for Tuesday morning"
];

const publishRail = [
  { label: "Author signoff", value: "Complete" },
  { label: "Locale readiness", value: "1 of 2 ready" },
  { label: "Homepage feature", value: "Reserved" },
  { label: "Review slot", value: "Pending" }
];

const revisionSignals = [
  { label: "Last saved", value: "09:42 UTC" },
  { label: "Revision", value: "v17" },
  { label: "Status", value: "Scheduled" }
];

const revisionTrail = [
  "Added related links to the two strongest story angles.",
  "Locked the featured image and caption.",
  "Adjusted the excerpt to match the current headline.",
  "Queued the bilingual release after translation QA."
];

const operationalNotes = [
  "This article feeds the homepage story strip and the public blog listing.",
  "The secondary locale is held until headline polish and metadata are both checked.",
  "The publish window stays fixed so scheduling can align with the day page refresh."
];

const liveSignals = [
  { label: "Preview sync", value: "Live", detail: "Public preview matches the latest saved draft" },
  { label: "Translation state", value: "1 of 2", detail: "English done, French pass still in progress" },
  { label: "Release slot", value: "Tue 09:00", detail: "Reserved for the scheduled publish run" }
];

export default function SpringVolunteerRoundupPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Post editor</p>
          <h1>Spring volunteer roundup</h1>
          <p className="editor-lede">
            A live article workspace with structure, translation state, and
            release timing in one place.
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
            <span>Locale</span>
            <strong>en / fr</strong>
          </article>
          <article className="editor-meta-card">
            <span>Publish date</span>
            <strong>April 8, 09:00 UTC</strong>
          </article>
          <article className="editor-meta-card">
            <span>Revision</span>
            <strong>v17</strong>
          </article>
        </aside>
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Revision signals</p>
          <h2>Current draft state</h2>
          <div className="editor-approval-grid">
            {revisionSignals.map((item) => (
              <div key={item.label} className="editor-approval-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Revision trail</p>
          <h2>Latest article changes</h2>
          <ol className="dashboard-activity">
            {revisionTrail.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="editor-grid editor-grid--split">
        {liveSignals.map((item) => (
          <article key={item.label} className="editor-card">
            <p className="dashboard-card__eyebrow">Live signal</p>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
            <p className="editor-richtext">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Article structure</p>
          <h2>Modules included in the current draft</h2>
          <ul className="dashboard-list">
            {articleStructure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Editorial checks</p>
          <h2>Quality gates before publication</h2>
          <ul className="dashboard-list">
            {editorialChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="editor-card">
        <p className="dashboard-card__eyebrow">Excerpt preview</p>
        <h2>The story is ready for scheduling once bilingual review finishes</h2>
        <p className="editor-richtext">
          This roundup pulls together the strongest volunteer stories from the
          season, balancing practical updates with a warmer editorial tone.
          In a working CMS, this would be the rich-text preview with block
          controls and translation state shown alongside it.
        </p>
      </section>

      <section className="editor-card">
        <p className="dashboard-card__eyebrow">Publish rail</p>
        <h2>Signals used before the story goes live</h2>
        <div className="editor-stack" style={{ marginTop: "1rem" }}>
          {operationalNotes.map((item) => (
            <div key={item} className="editor-row">
              <h3>Operational note</h3>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className="editor-approval-grid">
          {publishRail.map((item) => (
            <div key={item.label} className="editor-approval-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
