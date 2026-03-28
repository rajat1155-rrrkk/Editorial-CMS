import Link from "next/link";

const previewSites = [
  {
    name: "France",
    href: "/preview/france",
    strap: "Community stories, seasonal events, and a strong editorial homepage",
    status: "Localized preview"
  },
  {
    name: "Portugal",
    href: "/preview/portugal",
    strap: "Membership guidance, program updates, and practical calls to action",
    status: "Localized preview"
  }
];

const previewHighlights = [
  "Public-facing homepage layout with editorial hero, featured stories, and events",
  "Country-specific content that feels like a real site generated from shared CMS data",
  "Clear CTAs for joining, learning more, and viewing upcoming activities",
  "Structured sections that can later be powered by localized CMS entries"
];

const previewSignals = [
  { value: "2", label: "Live country previews" },
  { value: "12", label: "Reusable public homepage modules" },
  { value: "7", label: "Launch languages across the network" }
];

export default function PreviewIndexPage() {
  return (
    <main className="page-shell preview-index">
      <section className="interior-hero preview-hero">
        <p className="eyebrow">Public preview</p>
        <h1>Country-site previews generated from the same editorial CMS.</h1>
        <p className="lede">
          This slice shows what the public output could feel like for each
          national site. The pages below are intentionally static, but they are
          structured like real homepage renders from a shared multi-site system.
        </p>
        <div className="hero-actions">
          <Link href="/dashboard" className="primary-link">
            Back to workspace
          </Link>
          <Link href="/preview/france" className="secondary-link">
            Open France preview
          </Link>
        </div>
        <div className="preview-signal-strip">
          {previewSignals.map((item) => (
            <article key={item.label} className="preview-signal-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid preview-sites">
        {previewSites.map((site) => (
          <Link key={site.name} href={site.href} className="feature-card preview-site-card">
            <p className="card-eyebrow">{site.status}</p>
            <h2>{site.name}</h2>
            <p>{site.strap}</p>
          </Link>
        ))}
      </section>

      <section className="section-split preview-scope">
        <div className="section-header">
          <p className="eyebrow">What this shows</p>
          <h2>Homepage-style output with stories, events, and calls to action.</h2>
        </div>
        <div className="checklist-card">
          {previewHighlights.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
