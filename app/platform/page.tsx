import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | Editorial CMS Showcase",
  description:
    "Explore the platform architecture, content model, and site management approach behind the editorial CMS showcase."
};

const layers = [
  {
    title: "Presentation layer",
    detail:
      "A Vercel-hosted frontend that stays fast, indexable, and easy to extend with new public pages or section layouts."
  },
  {
    title: "Editorial layer",
    detail:
      "Reusable page templates, structured blog posts, events, and block-based sections that keep publishing flexible but consistent."
  },
  {
    title: "Operational layer",
    detail:
      "Site administration, language setup, user access, and global configuration designed for a small federation team."
  }
];

const blocks = [
  "Rich text and rich media",
  "Image + text combinations",
  "Calls to action and button groups",
  "Gallery and carousel sections",
  "Video embeds and social links",
  "Document downloads and simple lists",
  "Testimonials and impact metrics",
  "People directories and map-based views",
  "Newsletter, alerts, and event modules"
];

const architectureNotes = [
  "Keep content and presentation separated so the same data can be used in future APIs.",
  "Support multilingual content at the site level rather than forcing translation into one global bucket.",
  "Use SSR for public pages so search engines and social previews stay reliable.",
  "Allow super admins to add sites and languages without custom deployment work."
];

export default function PlatformPage() {
  return (
    <main className="page-shell platform-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Platform architecture</p>
          <h1>Structured for many sites, languages, and publishing needs.</h1>
          <p className="lede">
            The platform story here is deliberately practical: a shared CMS,
            clear content primitives, and a frontend that can evolve without
            making editors pay for technical complexity.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Core model</span>
            <strong>Multi-site + multilingual</strong>
          </div>
          <div className="metric-card">
            <span>Delivery pattern</span>
            <strong>SSR public web + future APIs</strong>
          </div>
        </div>
      </section>

      <section className="section-grid platform-layers">
        {layers.map((item) => (
          <article key={item.title} className="feature-card">
            <p className="card-eyebrow">Layer</p>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Reusable blocks</p>
          <h2>Common CMS blocks plus a few network-specific modules.</h2>
        </div>
        <div className="checklist-card platform-blocks">
          {blocks.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-split">
        <div className="section-header">
          <p className="eyebrow">Architecture notes</p>
          <h2>Built to stay flexible without becoming fragile.</h2>
        </div>
        <div className="roadmap-card platform-notes">
          {architectureNotes.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
