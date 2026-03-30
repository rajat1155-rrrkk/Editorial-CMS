import Link from "next/link";

const featuredStories = [
  {
    title: "Growing membership through clear public guidance",
    category: "Story",
    summary:
      "A practical homepage story about how the site introduces the organization and its work."
  },
  {
    title: "What to expect from a first visit or application",
    category: "Guide",
    summary:
      "A simple explanation of the first steps for new visitors, volunteers, and supporters."
  }
];

const upcomingEvents = [
  { name: "New member welcome call", when: "April 9", location: "Online" },
  { name: "Regional info session", when: "April 16", location: "Lisbon area" },
  { name: "Community farm day", when: "April 27", location: "Partner farms" }
];

const homepageCards = [
  "Membership overview and local mission",
  "Events with a simple RSVP style layout",
  "Featured stories and practical learning resources",
  "Clear routes to contact and join the local network"
];

const portugalSignals = [
  { value: "21k", label: "Monthly public visits" },
  { value: "16", label: "Country sites in network" },
  { value: "12", label: "Public languages" }
];

const portugalPillars = [
  "Elegant information hierarchy designed for practical conversion",
  "Bright, trust-building sections for membership and first-visit guidance",
  "Flexible campaign areas without losing calm visual discipline"
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

export default function PortugalPreviewPage() {
  return (
    <main className="page-shell preview-country preview-portugal">
      <section className="interior-hero preview-country-hero">
        <p className="eyebrow">Portugal preview</p>
        <h1>A calm, practical homepage for a growing national site.</h1>
        <p className="lede">
          This preview shows how a country-specific homepage can stay focused on
          membership, programs, and local communication while still sharing the
          same CMS structure as other sites.
        </p>
        <div className="hero-actions">
          <Link href="/preview" className="primary-link">
            Back to previews
          </Link>
          <Link href="/dashboard/posts" className="secondary-link">
            View post workspace
          </Link>
        </div>
        <div className="preview-signal-strip">
          {portugalSignals.map((item) => (
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
              The same editorial building block can support different national
              priorities without changing the publishing workflow.
            </p>
          </article>
        ))}
      </section>

      <section className="section-split preview-split">
        <div className="section-header">
          <p className="eyebrow">Featured stories</p>
          <h2>Helpful content that introduces the site and its mission.</h2>
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
          <p className="eyebrow">Experience direction</p>
          <h2>A more polished, hospitality-led feel for public visitors.</h2>
        </div>
        <div className="checklist-card preview-luxury-card">
          {portugalPillars.map((item) => (
            <p key={item} className="check-item">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-split preview-events-split">
        <div className="section-header">
          <p className="eyebrow">Upcoming events</p>
          <h2>Events feel native to the homepage rather than bolted on.</h2>
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
        <h2>Learn more, get involved, or contact the local editorial team.</h2>
        <p>
          This page demonstrates how the CMS can generate a polished public
          output for different countries without changing the underlying system.
        </p>
      </section>
    </main>
  );
}
