import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Editorial CMS Showcase",
  description:
    "Learn how the editorial CMS showcase supports multi-site publishing, local autonomy, and a clean public experience."
};

const principles = [
  {
    title: "Local voice first",
    copy:
      "Each site should feel like it belongs to its own audience, with flexible structure for local language, culture, and editorial priorities."
  },
  {
    title: "Shared foundation",
    copy:
      "The platform should reduce duplicated work across organizations by reusing templates, content blocks, and delivery patterns where it helps."
  },
  {
    title: "Low-friction publishing",
    copy:
      "Editors need a system that stays calm and understandable under pressure, especially when launching campaigns, events, and timely updates."
  }
];

const storyPoints = [
  "A single editorial layer can support many national sites without flattening their identity.",
  "The public experience should stay indexable, fast, and readable across languages and devices.",
  "Operational complexity belongs in the platform, not in the day-to-day work of coordinators."
];

const values = [
  "Clarity over cleverness",
  "Structure over one-off custom work",
  "Maintainability over elaborate admin workflows",
  "Reuse where it creates speed, not sameness"
];

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">About this concept</p>
          <h1>A public-facing editorial system for distributed organizations.</h1>
          <p className="lede">
            This showcase frames a CMS built for networks that need local
            control, multilingual publishing, and a coherent visual language
            across many sites. It is intentionally frontend-only for now.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Primary goal</span>
            <strong>Consistent public communication</strong>
          </div>
          <div className="metric-card">
            <span>Operational model</span>
            <strong>Shared CMS, site-level autonomy</strong>
          </div>
        </div>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Why it exists</p>
          <h2>Reduce duplication without erasing the local story.</h2>
        </div>
        <div className="checklist-card about-story">
          {storyPoints.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-grid about-principles">
        {principles.map((item) => (
          <article key={item.title} className="feature-card">
            <p className="card-eyebrow">Design principle</p>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Working values</p>
          <h2>A system that stays understandable as it grows.</h2>
        </div>
        <div className="roadmap-card about-values">
          {values.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
