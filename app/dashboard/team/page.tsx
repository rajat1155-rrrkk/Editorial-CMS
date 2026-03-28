import Link from "next/link";

const roles = [
  {
    name: "Super Admin",
    scope: "Federation-wide",
    access: "All sites, domains, locales, alerts, and configuration",
    people: "3 users",
    status: "Locked down"
  },
  {
    name: "Editor",
    scope: "One national site",
    access: "Pages, posts, events, media, and translations",
    people: "44 users",
    status: "Active"
  },
  {
    name: "Coordinator",
    scope: "One site with approval workflow",
    access: "Draft creation, review queue, and profile updates",
    people: "14 users",
    status: "Review only"
  }
];

const teamMembers = [
  {
    name: "Nadia Martin",
    site: "France",
    role: "Super Admin",
    lastSeen: "12 minutes ago",
    note: "Assigned a new language variant and reviewed the global banner."
  },
  {
    name: "Luca Ferri",
    site: "Italy",
    role: "Editor",
    lastSeen: "1 hour ago",
    note: "Scheduled a news post and approved two translated blocks."
  },
  {
    name: "Mina Park",
    site: "Korea",
    role: "Coordinator",
    lastSeen: "3 hours ago",
    note: "Drafted a page update and requested media review."
  },
  {
    name: "Daniel Costa",
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

export default function TeamPage() {
  return (
    <main className="dashboard-shell team-page">
      <section className="dashboard-hero team-hero">
        <div className="dashboard-hero__copy team-hero__copy">
          <p className="dashboard-eyebrow">Team access</p>
          <h1>Role management for a small federation and its local editors.</h1>
          <p className="dashboard-lede">
            This slice shows how the MVP handles access boundaries: a small
            super-admin group, site-scoped editors, and clear approval lines for
            national coordinators.
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
            <strong>61</strong>
            <span>Across the federation and national sites</span>
          </article>
          <article className="dashboard-metric">
            <p>Protected roles</p>
            <strong>3</strong>
            <span>Simple, understandable permission groups</span>
          </article>
        </aside>
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
        <h2>Recent users with site ownership and activity notes.</h2>
        <div className="dashboard-table team-table" role="table" aria-label="Team members">
          <div className="sites-table__row sites-table__row--head" role="row">
            <span role="columnheader">Person</span>
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

      <section className="section-split team-permissions">
        <div className="section-header">
          <p className="eyebrow">Permission model</p>
          <h2>Keep access small, readable, and easy to explain.</h2>
        </div>
        <div className="roadmap-card">
          {permissions.map((item) => (
            <p key={item} className="roadmap-item">
              {item}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
