import Link from "next/link";

const launchSummary = [
  { label: "Active sites", value: "16", detail: "Europe 8, Asia 3, Americas 5" },
  { label: "Published languages", value: "12", detail: "English, French, German, Spanish, Italian, Portuguese, Dutch, Swedish, Japanese, Korean, Hindi, Brazilian Portuguese" },
  { label: "Drafts awaiting review", value: "14", detail: "Pages, posts, events, and banner updates" },
  { label: "Migration batches", value: "3", detail: "Legacy blog imports queued from WordPress" }
];

const regionalCoverage = [
  {
    region: "Europe",
    count: "8 sites",
    countries: "UK, Germany, Spain, Italy, France, Portugal, Netherlands, Sweden"
  },
  {
    region: "Asia",
    count: "3 sites",
    countries: "Japan, South Korea, India"
  },
  {
    region: "Americas",
    count: "5 sites",
    countries: "USA, Canada, Mexico, Brazil, Argentina"
  }
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
  "Germany published a bilingual spring story and queued homepage promotion.",
  "Japan launched a new event listing and updated the public calendar feed.",
  "Brazil added a new coordinator profile and contact block.",
  "Super admin enabled a new locale variant for the Sweden site."
];

const alertItems = [
  "Global banner: maintenance notice scheduled for April 2 across all regions.",
  "SEO check: three translated pages need meta descriptions before release.",
  "Content ops: WordPress migration import for legacy posts is 80% complete."
];

const workspaceLinks = [
  { label: "Pages", href: "/dashboard/pages", detail: "Landing pages, policy pages, and reusable block layouts" },
  { label: "Posts", href: "/dashboard/posts", detail: "News, blog entries, imports, and editorial review queues" },
  { label: "Events", href: "/dashboard/events", detail: "Structured listings, homepage promos, and scheduling" },
  { label: "Media", href: "/dashboard/media", detail: "Images, PDFs, campaign assets, and downloads" },
  { label: "Team", href: "/dashboard/team", detail: "Editors, coordinators, and super-admin permissions" },
  { label: "Settings", href: "/dashboard/settings", detail: "Global configuration, integrations, and shared defaults" }
];

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <p className="dashboard-eyebrow">Admin overview</p>
          <h1>Federated editorial operations at a glance.</h1>
          <p className="dashboard-lede">
            A live operations view for supervising multilingual publishing,
            site provisioning, editorial queues, and migration progress across
            a 16-country network.
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
        {regionalCoverage.map((item) => (
          <article key={item.region} className="dashboard-card">
            <p className="dashboard-card__eyebrow">Regional coverage</p>
            <h2>{item.region}</h2>
            <p>{item.count}</p>
            <p>{item.countries}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">System health</p>
          <h2>Launch readiness is stable across the network.</h2>
          <ul className="dashboard-list">
            <li>Shared templates are deployed to all 16 active sites.</li>
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
          <h2>What this operations layer is designed to support.</h2>
          <ul className="dashboard-list">
            <li>Super admins can provision sites and language variants from a single control surface.</li>
            <li>Coordinators can focus on editorial content, not infrastructure.</li>
            <li>Public-facing content can stay fast, indexable, and easy to share.</li>
          </ul>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        {workspaceLinks.map((item) => (
          <Link key={item.label} href={item.href} className="dashboard-card dashboard-link-card">
            <p className="dashboard-card__eyebrow">Workspace section</p>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
