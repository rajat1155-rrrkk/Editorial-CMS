import Link from "next/link";

const roles = [
  {
    name: "Super Admin",
    scope: "Federation-wide",
    access: "All sites, domains, locales, alerts, and configuration",
    people: "4 accounts",
    status: "Locked down"
  },
  {
    name: "Editor",
    scope: "One national site",
    access: "Pages, posts, events, media, and translations",
    people: "56 accounts",
    status: "Active"
  },
  {
    name: "Coordinator",
    scope: "One site with approval workflow",
    access: "Draft creation, review queue, and profile updates",
    people: "32 accounts",
    status: "Review only"
  }
];

const teamMembers = [
  {
    name: "France editorial desk",
    site: "France",
    role: "Super Admin",
    lastSeen: "12 minutes ago",
    note: "Assigned a new language variant and reviewed the global banner."
  },
  {
    name: "Italy editorial desk",
    site: "Italy",
    role: "Editor",
    lastSeen: "1 hour ago",
    note: "Scheduled a news post and approved two translated blocks."
  },
  {
    name: "South Korea coordinator desk",
    site: "South Korea",
    role: "Coordinator",
    lastSeen: "3 hours ago",
    note: "Drafted a page update and requested media review."
  },
  {
    name: "Portugal editorial desk",
    site: "Portugal",
    role: "Editor",
    lastSeen: "Yesterday",
    note: "Updated the contact page and checked the launch checklist."
  }
];

const permissions = [
  "Super admins can add or remove sites and language variants.",
  "Editors can work in any language for their assigned site.",
  "Coordinators stay scoped to editorial tasks without infrastructure access.",
  "Public users have no authentication and only see published content."
];

const approvalQueue = [
  "Portugal editor invite waiting on acceptance.",
  "South Korea coordinator requested media-library access.",
  "Canada locale reviewer pending approval for French workflow."
];

const liveSignals = [
  { label: "Open invites", value: "5", detail: "2 editors and 3 coordinators" },
  { label: "Recent approvals", value: "9", detail: "Site access and publish requests" },
  { label: "Last role change", value: "Today", detail: "France locale reviewer added" }
];

export default function TeamPage() {
  return (
    <main className="dashboard-shell team-page">
      <section className="dashboard-hero team-hero">
        <div className="dashboard-hero__copy team-hero__copy">
          <p className="dashboard-eyebrow">Team access</p>
          <h1>Role management for a distributed editorial network.</h1>
          <p className="dashboard-lede">
            This slice shows access boundaries in a live product format: a small
            super-admin group, site-scoped editors, and clear approval lines for
            coordinators.
          </p>
          <div className="dashboard-hero__actions">
            <Link className="dashboard-button dashboard-button--primary" href="/dashboard">
              Back to overview
            </Link>
            <a className="dashboard-button dashboard-button--secondary" href="#members">
              Review members
            </a>
          </div>
        </div>

        <aside className="dashboard-hero__panel team-hero__panel" aria-label="Team summary">
          <article className="dashboard-metric">
            <p>Assigned users</p>
            <strong>92</strong>
            <span>Across the federation and national sites</span>
          </article>
          <article className="dashboard-metric">
            <p>Protected roles</p>
            <strong>3</strong>
            <span>Simple, understandable permission groups</span>
          </article>
          <article className="dashboard-metric">
            <p>Access sync</p>
            <strong>Live</strong>
            <span>Last permission update was a few minutes ago</span>
          </article>
        </aside>
      </section>

      <section className="dashboard-grid dashboard-grid--three team-roles">
        {liveSignals.map((item) => (
          <article key={item.label} className="dashboard-card team-role">
            <p className="dashboard-card__eyebrow">Access signal</p>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--three team-roles">
        {roles.map((role) => (
          <article key={role.name} className="dashboard-card team-role">
            <p className="dashboard-card__eyebrow">Role</p>
            <h2>{role.name}</h2>
            <p>{role.scope}</p>
            <ul className="dashboard-list">
              <li>{role.access}</li>
              <li>{role.people}</li>
              <li>{role.status}</li>
            </ul>
          </article>
        ))}
      </section>

      <section className="dashboard-card team-access" id="members">
        <p className="dashboard-card__eyebrow">Member roster</p>
        <h2>Recent account activity and site ownership.</h2>
        <div className="dashboard-table team-table" role="table" aria-label="Team members">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Role holder</span>
            <span role="columnheader">Site</span>
            <span role="columnheader">Role</span>
            <span role="columnheader">Last seen</span>
            <span role="columnheader">Status note</span>
          </div>
          {teamMembers.map((member) => (
            <article key={member.name} className="sites-table__row" role="row">
              <span role="cell">{member.name}</span>
              <span role="cell">{member.site}</span>
              <span role="cell">{member.role}</span>
              <span role="cell">{member.lastSeen}</span>
              <span role="cell">{member.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--split">
        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Permission model</p>
          <ul className="dashboard-list">
            {permissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__eyebrow">Access review queue</p>
          <ul className="dashboard-list">
            {approvalQueue.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
