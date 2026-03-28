const layers = [
  {
    name: "Presentation layer",
    detail:
      "Next.js on Vercel serves fast public websites with server-rendered routes, flexible page composition, and room for country-specific theming."
  },
  {
    name: "Editorial model",
    detail:
      "Reusable content blocks, pages, posts, events, media, and multilingual variants create a predictable publishing workflow for coordinators."
  },
  {
    name: "Operations layer",
    detail:
      "Super admins provision sites, domains, and language packs while local teams stay scoped to their own editorial surface."
  },
  {
    name: "Integration layer",
    detail:
      "Future APIs can expose events, people profiles, testimonials, and newsletter flows for reuse in other products without coupling the frontend."
  }
];

const principles = [
  "Treat each country site as independent in content, but shared in platform standards.",
  "Prefer structured content models over bespoke layouts so reuse stays realistic.",
  "Keep editor workflows simple enough for non-technical teams with low support overhead.",
  "Preserve a clean separation between CMS operations and the public experience layer."
];

const expansionPaths = [
  "Add a headless CMS or multisite editorial backend behind the current frontend routes.",
  "Connect public APIs for coordinators, testimonials, forms, and newsletter subscription.",
  "Introduce locale-aware routing, preview mode, and publish workflows per site.",
  "Layer in migration tooling for legacy blog archives and media libraries."
];

export default function ArchitecturePage() {
  return (
    <main className="page-shell">
      <section className="interior-hero">
        <p className="eyebrow">Architecture</p>
        <h1>Frontend-first structure with room for a real CMS backend.</h1>
        <p className="lede">
          This sample is intentionally Vercel-only today, but it is framed like
          a production-ready editorial system: clear layers, distinct user
          roles, and a path from concept site to shared publishing platform.
        </p>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">System view</p>
          <h2>Four layers that keep content, operations, and delivery cleanly separated.</h2>
        </div>
        <div className="timeline">
          {layers.map((layer) => (
            <article key={layer.name} className="timeline-card">
              <h3>{layer.name}</h3>
              <p>{layer.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Guiding principles</p>
          <h2>Design choices that make multi-site publishing manageable.</h2>
        </div>
        <div className="checklist-card">
          {principles.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Next steps</p>
          <h2>A realistic path from sample website to operational platform.</h2>
        </div>
        <div className="roadmap-card">
          {expansionPaths.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
