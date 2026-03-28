import Link from "next/link";

const contentModules = [
  { label: "Hero", detail: "Localized headline, impact stat trio, and primary CTA" },
  { label: "Story strip", detail: "Three featured stories pulled from recent editorial posts" },
  { label: "Upcoming events", detail: "Carousel populated from the structured events model" },
  { label: "Alert banner", detail: "Shared federation notice visible above navigation" }
];

const publishChecklist = [
  "French copy approved by the local coordinator",
  "English translation pending final headline polish",
  "Hero image has alt text and mobile crop set",
  "SEO title and description drafted for both locales"
];

const workflowNotes = [
  "Preview links are sent to coordinators before publish so layout issues are caught early.",
  "Block order stays reusable, while copy and media remain locale-specific.",
  "Shared alert banners can be toggled without reopening the page draft."
];

export default function HomepageRefreshPage() {
  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Page editor</p>
          <h1>Homepage refresh</h1>
          <p className="editor-lede">
            A realistic edit view for the France homepage refresh. This screen
            shows the kind of structured drafting state an editor would see
            before sending a bilingual homepage update to review.
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
            <span>Site</span>
            <strong>France</strong>
          </article>
          <article className="editor-meta-card">
            <span>Locales</span>
            <strong>French / English</strong>
          </article>
        </aside>
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
          <h2>What still needs confirmation before launch.</h2>
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
          <h2>How the page moves through the MVP workflow.</h2>
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
            <li>Hero impact stats updated for 2026 campaign messaging.</li>
            <li>Upcoming events module switched from manual cards to live event feed.</li>
            <li>Secondary CTA changed to support coordinator onboarding.</li>
          </ol>
        </article>
      </section>
    </main>
  );
}
