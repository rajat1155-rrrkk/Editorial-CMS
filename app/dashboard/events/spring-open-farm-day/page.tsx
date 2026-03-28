import Link from "next/link";

const eventFields = [
  { label: "Date", value: "April 11, 2026" },
  { label: "Time", value: "09:30 local time" },
  { label: "Venue", value: "Regional open-site network" },
  { label: "Visibility", value: "Public listing + homepage carousel" }
];

const runOfShow = [
  "Welcome note and orientation block",
  "Regional site tours and coordinator introductions",
  "Lunch and story-sharing session",
  "Closing CTA for volunteer signup and newsletter"
];

const eventOperations = [
  { label: "Public listing", value: "Synced" },
  { label: "Carousel slot", value: "Featured" },
  { label: "Reminder email", value: "Scheduled" }
];

export default function SpringOpenFarmDayPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Event editor</p>
          <h1>Spring open farm day</h1>
          <p className="editor-lede">
            A structured event detail view showing the metadata and publish
            logic behind a homepage event card and a public listing page.
          </p>
          <div className="editor-actions">
            <Link href="/dashboard/events" className="dashboard-button dashboard-button--secondary">
              Back to events
            </Link>
            <Link href="/preview/france" className="dashboard-button dashboard-button--primary">
              View public preview
            </Link>
          </div>
        </div>
        <aside className="editor-meta">
          {eventFields.map((item) => (
            <article key={item.label} className="editor-meta-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </aside>
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Run of show</p>
          <h2>Structured content used across event surfaces.</h2>
          <ol className="dashboard-activity">
            {runOfShow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        <article className="editor-card editor-card--accent">
          <p className="dashboard-card__eyebrow">Publishing logic</p>
          <h2>This one event powers several outputs.</h2>
          <ul className="dashboard-list">
            <li>Homepage carousel card</li>
            <li>Country-site events listing</li>
            <li>Locale-specific detail page copy</li>
            <li>Future API payload for external reuse</li>
          </ul>
        </article>
      </section>

      <section className="editor-card">
        <p className="dashboard-card__eyebrow">Operations rail</p>
        <h2>Premium event controls visible at a glance.</h2>
        <div className="editor-approval-grid">
          {eventOperations.map((item) => (
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
