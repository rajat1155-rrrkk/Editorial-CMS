import Link from "next/link";

const coreCapabilities = [
  "25+ national sites",
  "Multilingual per site",
  "Easy editor experience",
  "Multi-site management",
  "API-ready content"
];

const principles = [
  "Clear national identity",
  "Fits small and large teams",
  "Aligned with the WWOOF ecosystem",
  "Low technical overhead",
  "Complements the CWP"
];

export default function Home() {
  return (
    <main className="dashboard-shell workspace-page workspace-page--minimal">
      <section className="dashboard-hero workspace-hero workspace-hero--minimal">
        <div className="dashboard-hero__copy workspace-copy--minimal">
          <p className="dashboard-eyebrow">Editorial CMS</p>
          <h1>Shared editorial publishing for national WWOOF websites.</h1>
          <p className="dashboard-lede">
            Multi-site. Multilingual. Simple to operate.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/admin">
              Admin
            </Link>
            <Link className="dashboard-button dashboard-button--secondary" href="/france">
              Tenant site
            </Link>
          </div>
        </div>
      </section>

      <section className="dashboard-card workspace-minimal-section">
        <p className="dashboard-card__eyebrow">Core capabilities</p>
        <div className="workspace-pill-grid">
          {coreCapabilities.map((item) => (
            <div key={item} className="workspace-pill-card">
              <h2>{item}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-link-card--muted workspace-minimal-section">
        <p className="dashboard-card__eyebrow">Principles</p>
        <div className="workspace-pill-grid">
          {principles.map((item) => (
            <div key={item} className="workspace-pill-card workspace-pill-card--soft">
              <h2>{item}</h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
