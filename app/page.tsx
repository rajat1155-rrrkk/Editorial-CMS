import Link from "next/link";

const coreCapabilities = [
  {
    title: "25+ national sites",
    detail: "One shared system that can power many country websites across multiple domains."
  },
  {
    title: "Multilingual per site",
    detail: "Each national site can manage its own localized content and public pages."
  },
  {
    title: "Easy editor experience",
    detail: "National coordinators get a clean, block-based editing flow without unnecessary complexity."
  },
  {
    title: "Multi-site management",
    detail: "Super admins can add sites, launch new languages, and manage shared structure centrally."
  },
  {
    title: "API-ready content",
    detail: "Editorial content can be exposed for reuse in the broader platform when needed."
  }
];

const operatingPrinciples = [
  {
    title: "Represents each national organization clearly",
    detail: "Public pages can foreground people, local context, and country-specific communication."
  },
  {
    title: "Fits small and large teams",
    detail: "The model supports both lightweight sites and more editorially active organizations."
  },
  {
    title: "Aligned with the broader ecosystem",
    detail: "The structure complements the wider WWOOF experience instead of competing with it."
  },
  {
    title: "Low technical overhead",
    detail: "The Federation team should not need heavy day-to-day involvement to keep sites running."
  },
  {
    title: "Complements the CWP",
    detail: "This stays focused on editorial communication, not replacing the shared operational platform."
  }
];

const mainActions = [
  {
    title: "Open Admin",
    href: "/admin",
    detail: "Edit page title, blocks, and tenant content."
  },
  {
    title: "Open Tenant Site",
    href: "/france",
    detail: "See one national site rendered from the shared CMS model."
  }
];

export default function Home() {
  return (
    <main className="dashboard-shell workspace-page">
      <section className="dashboard-hero workspace-hero">
        <div className="dashboard-hero__copy">
          <p className="dashboard-eyebrow">Editorial CMS</p>
          <h1>A shared editorial CMS for national WWOOF websites.</h1>
          <p className="dashboard-lede">
            A lightweight SaaS-style prototype for multi-site publishing,
            multilingual content, simple editing, and structured public
            communication across national organizations.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/admin">
              Open admin
            </Link>
            <Link className="dashboard-button dashboard-button--secondary" href="/france">
              Open tenant site
            </Link>
          </div>
        </div>

        <aside className="dashboard-hero__panel" aria-label="Summary">
          <article className="dashboard-metric">
            <p>Site model</p>
            <strong>Multi-tenant</strong>
            <span>France, India, and Canada routes already simulated</span>
          </article>
          <article className="dashboard-metric">
            <p>Editing model</p>
            <strong>Block based</strong>
            <span>Reusable hero, text, image, CTA, stats, events, and map blocks</span>
          </article>
          <article className="dashboard-metric">
            <p>Deployment</p>
            <strong>Vercel ready</strong>
            <span>Next.js App Router, API routes, middleware, and local simulated storage</span>
          </article>
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        {mainActions.map((item) => (
          <Link key={item.title} href={item.href} className="dashboard-card dashboard-link-card">
            <p className="dashboard-card__eyebrow">Main action</p>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </Link>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--five">
        {coreCapabilities.map((item) => (
          <article key={item.title} className="dashboard-card">
            <p className="dashboard-card__eyebrow">Core capability</p>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--five">
        {operatingPrinciples.map((item) => (
          <article key={item.title} className="dashboard-card dashboard-link-card--muted">
            <p className="dashboard-card__eyebrow">Operating principle</p>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
