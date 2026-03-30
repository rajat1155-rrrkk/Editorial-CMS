import Link from "next/link";

const eventFields = [
  { label: "Date", value: "April 11, 2026" },
  { label: "Time", value: "09:30 local time" },
  { label: "Venue", value: "Regional open-site network" },
  { label: "Visibility", value: "Public listing + homepage carousel" },
  { label: "Timezone", value: "UTC + local offset" }
];

const runOfShow = [
  "Welcome note and orientation block",
  "Regional site tours and coordinator introductions",
  "Lunch and story-sharing session",
  "Closing CTA for volunteer signup and newsletter",
  "Post-event recap card queued for the homepage"
];

const eventOperations = [
  { label: "Public listing", value: "Synced" },
  { label: "Carousel slot", value: "Featured" },
  { label: "Reminder email", value: "Scheduled" },
  { label: "RSVP cap", value: "64 seats" }
];

const revisionSignals = [
  { label: "Last saved", value: "10:08 UTC" },
  { label: "Revision", value: "v11" },
  { label: "Status", value: "Ready" }
];

const revisionTrail = [
  "Adjusted the event title to match the public listing.",
  "Updated the reminder email slot and RSVP cap.",
  "Confirmed the carousel feature flag remains on.",
  "Queued the recap block for after the event closes."
];

const operationalNotes = [
  "The event card can surface on the homepage carousel before the listing goes live.",
  "The same structured entry powers the country listing, preview page, and future API payload.",
  "A recap block is staged so the event can roll into a follow-up story without re-entry."
];

const liveSignals = [
  { label: "Preview sync", value: "Live", detail: "Homepage card and listing use the same event payload" },
  { label: "RSVP volume", value: "48", detail: "Latest count from the public registration form" },
  { label: "Publish window", value: "Thu 08:00", detail: "Reminder and listing updates aligned" }
];

export default function SpringOpenFarmDayPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Event editor</p>
          <h1>Spring open farm day</h1>
          <p className="editor-lede">
            A structured event detail view with release timing, queue state,
            and homepage promotion logic.
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
          <p className="dashboard-card__eyebrow">Revision signals</p>
          <h2>Current event state</h2>
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
          <h2>Latest event changes</h2>
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
          <p className="dashboard-card__eyebrow">Run of show</p>
          <h2>Structured content used across event surfaces</h2>
          <ol className="dashboard-activity">
            {runOfShow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        <article className="editor-card editor-card--accent">
          <p className="dashboard-card__eyebrow">Publishing logic</p>
          <h2>This event powers several outputs</h2>
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
        <h2>Event controls visible at a glance</h2>
        <div className="editor-stack" style={{ marginTop: "1rem" }}>
          {operationalNotes.map((item) => (
            <div key={item} className="editor-row">
              <h3>Operational note</h3>
              <p>{item}</p>
            </div>
          ))}
        </div>
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
