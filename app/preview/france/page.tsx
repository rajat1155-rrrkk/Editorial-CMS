import Link from "next/link";

const featuredStories = [
  {
    title: "A season of local visits and shared learning",
    category: "Feature story",
    summary:
      "A homepage story about volunteers, farm visits, and the editorial rhythm of a national network."
  },
  {
    title: "How coordinators shape the public calendar",
    category: "Editorial note",
    summary:
      "A short piece explaining how events, announcements, and updates are published in one place."
  }
];

const upcomingEvents = [
  { name: "Spring orientation session", when: "April 11", location: "Online" },
  { name: "Volunteer welcome day", when: "April 18", location: "Regional hub" },
  { name: "Open farm visit series", when: "April 26", location: "Multiple sites" }
];

const homepageCards = [
  "Latest news and editorial stories",
  "Upcoming events and public programming",
  "Join, learn more, and contact the local team",
  "Highlighted statistics and community impact"
];

const franceSignals = [
  { value: "34k", label: "Monthly public visits" },
  { value: "16", label: "Country sites in network" },
  { value: "12", label: "Public languages" }
];

const francePillars = [
  "Editorial warmth with a magazine-like homepage rhythm",
  "Seasonal campaigns supported by reusable premium modules",
  "Strong local events presence with clean public discoverability"
];

const networkCoverage = [
  {
    region: "Europe",
    countries: "UK, Germany, Spain, Italy, France, Portugal, Netherlands, Sweden"
  },
  {
    region: "Asia",
    countries: "Japan, South Korea, India"
  },
  {
    region: "Americas",
    countries: "USA, Canada, Mexico, Brazil, Argentina"
  }
];

export default function FrancePreviewPage() {
  return (
    <main className="page-shell preview-country preview-france">
      <section className="interior-hero preview-country-hero">
        <p className="eyebrow">France preview</p>
        <h1>A lively public homepage for a national editorial site.</h1>
        <p className="lede">
          This preview imagines a French country site built from the shared CMS
          content model. It keeps the public tone warm, informative, and easy to
          scan on mobile or desktop.
        </p>
        <div className="hero-actions">
          <Link href="/preview" className="primary-link">
            Back to previews
          </Link>
          <Link href="/dashboard/pages" className="secondary-link">
            View page workspace
          </Link>
        </div>
        <div className="preview-signal-strip">
          {franceSignals.map((item) => (
            <article key={item.label} className="preview-signal-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid preview-feature-grid">
        {homepageCards.map((item) => (
          <article key={item} className="feature-card preview-feature-card">
            <p className="card-eyebrow">Homepage block</p>
            <h2>{item}</h2>
            <p>
              Structured as a reusable CMS section that can be updated without
              changing the overall page design.
            </p>
          </article>
        ))}
      </section>

      <section className="section-split preview-split">
        <div className="section-header">
          <p className="eyebrow">Featured stories</p>
          <h2>Editorial content that feels local, current, and public-facing.</h2>
        </div>
        <div className="timeline">
          {featuredStories.map((story) => (
            <article key={story.title} className="timeline-card preview-story-card">
              <p className="card-eyebrow">{story.category}</p>
              <h3>{story.title}</h3>
              <p>{story.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid preview-feature-grid">
        {networkCoverage.map((item) => (
          <article key={item.region} className="feature-card preview-feature-card">
            <p className="card-eyebrow">Network coverage</p>
            <h2>{item.region}</h2>
            <p>{item.countries}</p>
          </article>
        ))}
      </section>

      <section className="section-split preview-luxury-split">
        <div className="section-header">
          <p className="eyebrow">Editorial character</p>
          <h2>A premium public identity shaped by storytelling and clarity.</h2>
        </div>
        <div className="checklist-card preview-luxury-card">
          {francePillars.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-split preview-events-split">
        <div className="section-header">
          <p className="eyebrow">Upcoming events</p>
          <h2>The public calendar can slot naturally into the homepage.</h2>
        </div>
        <div className="roadmap-card preview-events-card">
          {upcomingEvents.map((event) => (
            <div key={event.name} className="roadmap-item preview-event-row">
              <strong>{event.name}</strong>
              <span>{event.when}</span>
              <p>{event.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="footer-banner preview-cta">
        <p className="eyebrow">Call to action</p>
        <h2>Join the network, explore local programs, or contact the country team.</h2>
        <p>
          This page is a live sample homepage generated from CMS content and
          localized editorial blocks.
        </p>
      </section>
    </main>
  );
}
