import Link from "next/link";

const launchSummary = [
  { label: "Active sites", value: "18", detail: "Of 25 planned country and language variants" },
  { label: "Published languages", value: "7", detail: "English, French, Spanish, German, Italian, Korean, Portuguese" },
  { label: "Drafts awaiting review", value: "14", detail: "Pages, posts, events, and banner updates" },
  { label: "Migration batches", value: "3", detail: "Legacy blog imports queued from WordPress" }
];

const workflowStages = [
  {
    name: "Intake",
    status: "Healthy",
    note: "Editors create pages and posts using reusable blocks and a shared structure."
  },
  {
    name: "Review",
    status: "Needs attention",
    note: "Two event submissions and one homepage update are waiting for editorial approval."
  },
  {
    name: "Publish",
    status: "Healthy",
    note: "Scheduled releases are flowing to all live sites with localized URLs intact."
  }
];

const recentActivity = [
  "Italy published a new volunteer story in Italian and English.",
  "France scheduled a spring events carousel for the homepage.",
  "Portugal added a new coordinator profile and contact block.",
  "Super admin enabled a new language variant for the Canada site."
];

const alertItems = [
  "Global banner: upcoming maintenance notice scheduled for April 2.",
  "SEO check: three translated pages need meta descriptions before release.",
  "Content ops: WordPress migration import for legacy posts is 80% complete."
];

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <p className="dashboard-eyebrow">Admin overview</p>
          <h1>Federated editorial operations at a glance.</h1>
          <p className="dashboard-lede">
            This sample dashboard shows how a small federation team can supervise
            multilingual publishing, site provisioning, editorial queues, and
            migration progress from one place.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard/sites">
              Manage sites
            </Link>
            <a className="dashboard-button dashboard-button--secondary" href="#activity">
              Review activity
            </a>
          </div>
        </div>

        <aside className="dashboard-hero__panel" aria-label="Operational summary">
          {launchSummary.map((item) => (
            <article key={item.label} className="dashboard-metric">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">System health</p>
          <h2>Launch readiness is stable across most sites.</h2>
          <ul className="dashboard-list">
            <li>Shared templates are deployed to all active sites.</li>
            <li>Two sites need translated contact page updates before launch.</li>
            <li>Media storage is under the current quota threshold.</li>
          </ul>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Editorial workflow</p>
          <h2>Publish, review, and schedule without exposing backend complexity.</h2>
          <div className="dashboard-stage-list">
            {workflowStages.map((stage) => (
              <div key={stage.name} className="dashboard-stage">
                <div className="dashboard-stage__row">
                  <h3>{stage.name}</h3>
                  <span>{stage.status}</span>
                </div>
                <p>{stage.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Global alerts</p>
          <h2>Operational notices for coordinators and super admins.</h2>
          <ul className="dashboard-list">
            {alertItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--split" id="activity">
        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Recent activity</p>
          <h2>Live editorial actions from across the network.</h2>
          <ol className="dashboard-activity">
            {recentActivity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="dashboard-card dashboard-card--accent">
          <p className="dashboard-card__eyebrow">Launch roadmap</p>
          <h2>What this sample dashboard is designed to prove.</h2>
          <ul className="dashboard-list">
            <li>Super admins can provision sites and language variants from a single control surface.</li>
            <li>Coordinators can focus on editorial content, not infrastructure.</li>
            <li>Public-facing content can stay fast, indexable, and easy to share.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
