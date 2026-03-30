import Link from "next/link";

const eventStats = [
  { label: "Upcoming events", value: "24", detail: "Across all active sites" },
  { label: "Needs review", value: "7", detail: "Awaiting schedule or translation approval" },
  { label: "Recurring series", value: "4", detail: "Seasonal and regional templates" },
  { label: "Imported batches", value: "13", detail: "Legacy calendars cleaned up" }
];

const events = [
  {
    title: "Spring open farm day",
    site: "France",
    date: "April 11",
    time: "09:30",
    status: "Scheduled",
    type: "Public event",
    owner: "Owner: France editorial desk",
    reviewer: "Reviewer: Event publisher",
    notes: "Homepage carousel synced · RSVP form live"
  },
  {
    title: "Coordinator office hours",
    site: "Canada",
    date: "April 13",
    time: "14:00",
    status: "Needs translation",
    type: "Internal support",
    owner: "Owner: Canada support team",
    reviewer: "Reviewer: French locale editor",
    notes: "French copy pending · timezone confirmed"
  },
  {
    title: "Volunteer orientation webinar",
    site: "Portugal",
    date: "April 18",
    time: "17:00",
    status: "Ready",
    type: "Online session",
    owner: "Owner: Portugal editorial desk",
    reviewer: "Reviewer: Regional publisher",
    notes: "Speaker notes approved · reminder scheduled"
  },
  {
    title: "Regional storytelling meetup",
    site: "South Korea",
    date: "April 23",
    time: "19:00",
    status: "Published",
    type: "Community event",
    owner: "Owner: South Korea editorial desk",
    reviewer: "Reviewer: Event publisher",
    notes: "Archive record locked · public listing active"
  }
];

const eventBlocks = [
  "Date, time, and timezone fields",
  "Event hero image and short description",
  "Venue, map, and RSVP details",
  "Language-specific notes and visibility settings",
  "Related events carousel for the public site"
];

const schedulingNotes = [
  "Editors can clone a recurring series and change only dates, venue, and RSVP details.",
  "Upcoming events feed the homepage carousel and country-specific listing pages.",
  "Migration imports preserve historical events, but the editor still checks the final copy."
];

const eventFilters = ["All events", "Upcoming", "Needs translation", "Online", "Published"];

const liveSignals = [
  { label: "RSVPs today", value: "48", detail: "12 from homepage promotions" },
  { label: "Editors online", value: "4", detail: "2 scheduling, 1 reviewing" },
  { label: "Timezone coverage", value: "6", detail: "UTC, CET, IST, PST, KST, GMT-3" }
];

export default function EventsDashboardPage() {
  return (
    <main className="dashboard-events-shell">
      <section className="dashboard-events-hero">
        <div className="dashboard-events-hero__copy">
          <p className="dashboard-events-eyebrow">Events</p>
          <h1>Event publishing with schedule windows and review state.</h1>
          <div className="dashboard-events-actions">
            <Link href="/dashboard" className="dashboard-events-button dashboard-events-button--primary">
              Back to dashboard
            </Link>
            <a href="#calendar" className="dashboard-events-button dashboard-events-button--secondary">
              Review calendar
            </a>
          </div>
        </div>

        <aside className="dashboard-events-panel" aria-label="Event summary">
          {eventStats.map((item) => (
            <article key={item.label} className="dashboard-events-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        {liveSignals.map((item) => (
          <article key={item.label} className="dashboard-events-card">
            <p className="dashboard-events-card__eyebrow">Live signal</p>
            <h2>{item.label}</h2>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-events-grid">
        <article className="dashboard-events-card">
          <p className="dashboard-events-card__eyebrow">Structured fields</p>
          <h2>The same event model powers listings, calendars, and homepage carousels.</h2>
          <ul className="dashboard-events-list">
            {eventBlocks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-events-card">
          <p className="dashboard-events-card__eyebrow">Scheduling notes</p>
          <h2>Recurring events stay flexible without becoming messy.</h2>
          <div className="dashboard-events-notes">
            {schedulingNotes.map((item) => (
              <p key={item} className="dashboard-events-note">
                {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-events-table-shell" id="calendar">
        <div className="dashboard-events-table-shell__header">
          <p className="dashboard-events-eyebrow">Event queue</p>
          <h2>Planned, scheduled, and published events across the network.</h2>
        </div>
        <div className="dashboard-toolbar" aria-label="Event controls">
          <div className="dashboard-filter-group">
            {eventFilters.map((item, index) => (
              <span
                key={item}
                className={`dashboard-filter-chip${index === 0 ? " dashboard-filter-chip--active" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="dashboard-toolbar-meta">
            <span>7 approvals pending</span>
            <span>2 venue changes</span>
            <span>Homepage carousel synced</span>
          </div>
        </div>

        <div className="dashboard-events-table" role="table" aria-label="Event queue">
          <div className="dashboard-events-table__row dashboard-events-table__row--head" role="row">
            <span role="columnheader">Event</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Schedule</span>
            <span role="columnheader">People</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Notes</span>
          </div>

          {events.map((event) => (
            <article key={event.title} className="dashboard-events-table__row" role="row">
              <span role="cell">
                {event.title === "Spring open farm day" ? (
                  <Link href="/dashboard/events/spring-open-farm-day" className="table-inline-link">
                    {event.title}
                  </Link>
                ) : (
                  event.title
                )}
                <br />
                <span>{event.type}</span>
              </span>
              <span role="cell">{event.site}</span>
              <span role="cell">
                <span>{event.date}</span>
                <br />
                <span>{event.time}</span>
              </span>
              <span role="cell">
                <span>{event.owner}</span>
                <br />
                <span>{event.reviewer}</span>
              </span>
              <span role="cell">
                <span className="dashboard-status-pill">{event.status}</span>
              </span>
              <span role="cell">
                <span>{event.notes}</span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
