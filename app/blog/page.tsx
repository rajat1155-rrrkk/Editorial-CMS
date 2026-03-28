import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Editorial CMS Showcase",
  description:
    "A sample news and editorial hub for the editorial CMS showcase, with structured posts and publication flow."
};

const posts = [
  {
    title: "Designing for many sites without fragmenting the brand",
    meta: "Product strategy, 6 min read",
    excerpt:
      "A short editorial note on how shared templates can preserve consistency while still leaving room for local voice."
  },
  {
    title: "Why a structured event model matters for public websites",
    meta: "Content model, 4 min read",
    excerpt:
      "Events behave better when they are stored as data first, then rendered into different cards, listings, and previews."
  },
  {
    title: "Making translation a publishing habit instead of a side task",
    meta: "Localization, 5 min read",
    excerpt:
      "Multilingual publishing works better when the route structure, page templates, and editorial flow all reinforce it."
  },
  {
    title: "What a useful migration path should preserve",
    meta: "Content operations, 5 min read",
    excerpt:
      "The goal is to carry forward the important text and metadata, while giving editors a clean place to refine older posts."
  }
];

export default function BlogPage() {
  return (
    <main className="page-shell blog-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Blog and news</p>
          <h1>A structured editorial hub for updates, stories, and launches.</h1>
          <p className="lede">
            This page shows how the CMS could present ongoing news without
            losing the clean, public-facing style of the rest of the site.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Publishing pattern</span>
            <strong>Story, update, or announcement</strong>
          </div>
          <div className="metric-card">
            <span>Editorial intent</span>
            <strong>Readable, structured, reusable</strong>
          </div>
        </div>
      </section>

      <section className="section-grid blog-grid">
        {posts.map((item) => (
          <article key={item.title} className="feature-card blog-card">
            <p className="card-eyebrow">{item.meta}</p>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
