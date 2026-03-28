import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Editorial CMS Showcase",
  description:
    "Get in touch about the editorial CMS showcase, implementation planning, or partnership conversations."
};

const contacts = [
  {
    label: "Project conversations",
    detail:
      "Use this sample to align stakeholders around editorial scope, public storytelling, and rollout expectations."
  },
  {
    label: "Technical planning",
    detail:
      "Discuss hosting, content migration, multilingual setup, and future API reuse without locking into backend work yet."
  },
  {
    label: "Design review",
    detail:
      "Review the information architecture, landing pages, and role-based messaging before deeper implementation begins."
  }
];

const nextSteps = [
  "Define the first public website structure and page types.",
  "Confirm which editorial blocks belong in the MVP.",
  "Map site ownership and publishing responsibilities.",
  "Decide when the backend and content model work should start."
];

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Contact</p>
          <h1>Ready for stakeholder review and next-step planning.</h1>
          <p className="lede">
            This contact page keeps the sample practical. It is designed to
            support early conversations about scope, rollout, and ownership
            without pretending the backend exists yet.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Current status</span>
            <strong>Frontend-only concept</strong>
          </div>
          <div className="metric-card">
            <span>Best use</span>
            <strong>Discovery, review, and alignment</strong>
          </div>
        </div>
      </section>

      <section className="section-grid contact-cards">
        {contacts.map((item) => (
          <article key={item.label} className="feature-card">
            <p className="card-eyebrow">{item.label}</p>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Suggested next steps</p>
          <h2>Use the sample to agree on scope before implementation.</h2>
        </div>
        <div className="roadmap-card contact-steps">
          {nextSteps.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="footer-banner">
        <p className="eyebrow">Availability</p>
        <h2>Open to product discussion, design refinement, and delivery planning.</h2>
        <p>
          The sample is intentionally easy to adapt into a fuller concept deck,
          a proposal, or a working product brief when the team is ready.
        </p>
      </section>
    </main>
  );
}
