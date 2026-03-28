const featureColumns = [
  {
    eyebrow: "Multi-site control",
    title: "One editorial platform, many national sites",
    copy:
      "Launch and manage 25+ country websites from a shared foundation while keeping each site independent, localized, and easy for coordinators to update."
  },
  {
    eyebrow: "Editor-first CMS",
    title: "Simple enough for small teams, structured enough to scale",
    copy:
      "Reusable page blocks, event templates, media uploads, and multilingual publishing give local teams everything they need without exposing backend complexity."
  },
  {
    eyebrow: "Composable delivery",
    title: "API-friendly content with Vercel-powered presentation",
    copy:
      "This frontend sample demonstrates a server-rendered public website layer designed for search visibility, fast deployments, and future API reuse."
  }
];

const buildingBlocks = [
  "Rich text, image, CTA, gallery, video, downloads, and social links",
  "Custom people directories, testimonials, event carousels, and impact stats",
  "Global banners, multilingual pages, blog posts, and structured event entries",
  "A future-ready path for WordPress blog migration and shared content APIs"
];

const launchTracks = [
  {
    label: "For federation admins",
    detail:
      "Create sites, add language variants, manage domains, and control shared configuration with minimal engineering support."
  },
  {
    label: "For country coordinators",
    detail:
      "Own one site, publish in multiple languages, and keep pages, posts, and events updated through a curated editorial workflow."
  },
  {
    label: "For public audiences",
    detail:
      "Get a fast, mobile-first experience that clearly communicates values, programs, stories, and upcoming events."
  }
];

const roadmap = [
  "Phase 1: Shared landing pages, blog/news, events, reusable blocks, and multilingual content",
  "Phase 2: Public API integrations for people directories, testimonials, and newsletter signup",
  "Phase 3: Best-effort migration tooling for legacy WordPress posts and editorial archives"
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Editorial CMS showcase</p>
          <h1>Multi-domain publishing for distributed organizations.</h1>
          <p className="lede">
            A Vercel-ready sample site for a shared editorial platform built to
            support multilingual content, country-level autonomy, and a unified
            public experience across a global network.
          </p>
          <div className="hero-actions">
            <a href="/platform" className="primary-link">
              Explore the platform
            </a>
            <a href="/dashboard" className="secondary-link">
              Open the dashboard sample
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Target scale</span>
            <strong>25+ websites</strong>
          </div>
          <div className="metric-card">
            <span>Publishing model</span>
            <strong>Multi-site + multilingual</strong>
          </div>
          <div className="metric-card">
            <span>Deployment</span>
            <strong>Vercel frontend sample</strong>
          </div>
        </div>
      </section>

      <section className="section-grid" id="platform">
        {featureColumns.map((item) => (
          <article key={item.title} className="feature-card">
            <p className="card-eyebrow">{item.eyebrow}</p>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">What this sample is proving</p>
          <h2>A modern editorial layer for federated brands.</h2>
        </div>
        <div className="checklist-card">
          {buildingBlocks.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Audience fit</p>
          <h2>Designed around clear roles and low operational overhead.</h2>
        </div>
        <div className="timeline">
          {launchTracks.map((item) => (
            <article key={item.label} className="timeline-card">
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-split" id="roadmap">
        <div className="section-header">
          <p className="eyebrow">Launch scope</p>
          <h2>Frontend-first now, backend integrations later.</h2>
        </div>
        <div className="roadmap-card">
          {roadmap.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <article className="feature-card">
          <p className="card-eyebrow">Information architecture</p>
          <h2>Dedicated routes for product story, architecture, and admin views.</h2>
          <p>
            This expanded sample now supports a fuller navigation model with
            room for public marketing pages and internal product storytelling.
          </p>
        </article>
        <article className="feature-card">
          <p className="card-eyebrow">Sample operations</p>
          <h2>Dashboards make the multi-site value proposition tangible.</h2>
          <p>
            Admin-oriented screens help stakeholders imagine launch readiness,
            editor permissions, and rollout visibility across multiple sites.
          </p>
        </article>
        <article className="feature-card">
          <p className="card-eyebrow">Vercel-first delivery</p>
          <h2>Everything here stays static-friendly and easy to deploy.</h2>
          <p>
            The current repo remains intentionally lightweight so it can be
            published quickly while the deeper product work is still forming.
          </p>
        </article>
      </section>

      <section className="footer-banner">
        <p className="eyebrow">Sample positioning</p>
        <h2>Use this repo as a public-facing concept piece for the Editorial CMS initiative.</h2>
        <p>
          The current version is intentionally frontend-only and optimized for
          Vercel deployment, making it easy to share the concept before backend
          and CMS implementation begin.
        </p>
      </section>
    </main>
  );
}
