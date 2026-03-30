import Link from "next/link";

const contentModules = [
  { label: "Hero", detail: "Headline, impact stat trio, CTA, and locale-aware media slot" },
  { label: "Story strip", detail: "Three featured stories linked from the live post queue" },
  { label: "Upcoming events", detail: "Carousel powered by the structured event feed" },
  { label: "Alert banner", detail: "Global notice pinned above the navigation area" }
];

const publishChecklist = [
  "Primary locale copy approved and locked",
  "Secondary locale heading waiting on final polish",
  "Hero image crop confirmed for mobile and desktop",
  "SEO title, description, and social preview set",
  "Homepage carousel slot reserved for launch"
];

const workflowNotes = [
  "Preview links are sent before publish so layout issues surface early.",
  "Block order stays reusable while copy and media remain locale-specific.",
  "Shared alert banners can be toggled without reopening the draft.",
  "Publish windows stay visible so the homepage can land with the rest of the release."
];

const approvalRail = [
  { label: "Content design", value: "Approved" },
  { label: "Translation QA", value: "In progress" },
  { label: "SEO review", value: "Drafted" },
  { label: "Publish window", value: "Tomorrow 08:00 UTC" }
];

const revisionSignals = [
  { label: "Last edited", value: "18 minutes ago" },
  { label: "Revision", value: "v24" },
  { label: "Authoring state", value: "Draft locked" },
  { label: "Homepage slot", value: "Reserved" }
];

const revisionTrail = [
  "Replaced manual story cards with the live post feed.",
  "Updated the secondary CTA to point at the current volunteer program.",
  "Pinned the alert banner to the shared global notice.",
  "Confirmed the bilingual headline pair for both visible locales."
];

const liveSignals = [
  { label: "Preview sync", value: "Live", detail: "Public preview matches the current draft" },
  { label: "Review state", value: "Queued", detail: "Waiting on translation QA before publish" },
  { label: "Homepage slot", value: "Reserved", detail: "Launch window held for tomorrow morning" }
];

export default function HomepageRefreshPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Page editor</p>
          <h1>Homepage refresh</h1>
          <p className="editor-lede">
            Structured homepage drafting for a live release. The state below shows
            what an editor would see before the refresh moves into review and publish.
          </p>
          <div className="editor-actions">
            <Link href="/dashboard/pages" className="dashboard-button dashboard-button--secondary">
              Back to pages
            </Link>
            <Link href="/preview/france" className="dashboard-button dashboard-button--primary">
              Open public preview
            </Link>
          </div>
        </div>
        <aside className="editor-meta">
          <article className="editor-meta-card">
            <span>Status</span>
            <strong>Ready for review</strong>
          </article>
          <article className="editor-meta-card">
            <span>Locale</span>
            <strong>fr / en</strong>
          </article>
          <article className="editor-meta-card">
            <span>Publish window</span>
            <strong>Tomorrow 08:00 UTC</strong>
          </article>
          <article className="editor-meta-card">
            <span>Revision</span>
            <strong>v24</strong>
          </article>
        </aside>
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Revision signals</p>
          <h2>Current draft status</h2>
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
          <h2>Latest changes in the draft</h2>
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
          <p className="dashboard-card__eyebrow">Content modules</p>
          <h2>Configured blocks on this homepage draft.</h2>
          <div className="editor-stack">
            {contentModules.map((item) => (
              <div key={item.label} className="editor-row">
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Publish checklist</p>
          <h2>What still needs confirmation before launch</h2>
          <ul className="dashboard-list">
            {publishChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="editor-grid editor-grid--split">
        <article className="editor-card editor-card--accent">
          <p className="dashboard-card__eyebrow">Workflow notes</p>
          <h2>How this page moves through the workflow</h2>
          <ul className="dashboard-list">
            {workflowNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="editor-card">
          <p className="dashboard-card__eyebrow">Revision summary</p>
          <h2>Latest draft activity</h2>
          <ol className="dashboard-activity">
            <li>Hero impact stats aligned with the current campaign period.</li>
            <li>Upcoming events module switched from manual cards to the live feed.</li>
            <li>Secondary CTA updated to support the onboarding path.</li>
            <li>Alert banner remains attached to the shared network notice.</li>
          </ol>
        </article>
      </section>

      <section className="editor-card">
        <p className="dashboard-card__eyebrow">Approval rail</p>
        <h2>Review cues for the final publish pass</h2>
        <div className="editor-approval-grid">
          {approvalRail.map((item) => (
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
