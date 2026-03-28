import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editorial CMS Showcase",
  description:
    "A Vercel-ready MVP sample for a multilingual, multi-site editorial CMS platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-chrome">
          <div className="app-shell">
            <aside className="app-sidebar">
              <div className="sidebar-card sidebar-brand">
                <Link href="/" className="brand-mark">
                  Editorial CMS
                </Link>
                <p className="sidebar-copy">
                  Premium multi-site publishing for distributed editorial teams.
                </p>
              </div>

              <nav className="sidebar-group" aria-label="Workspace">
                <p className="sidebar-label">Workspace</p>
                <Link href="/">Command center</Link>
                <Link href="/dashboard">Network overview</Link>
                <Link href="/dashboard/pages">Pages</Link>
                <Link href="/dashboard/posts">Posts</Link>
                <Link href="/dashboard/events">Events</Link>
                <Link href="/dashboard/media">Media</Link>
              </nav>

              <nav className="sidebar-group" aria-label="Operations">
                <p className="sidebar-label">Operations</p>
                <Link href="/dashboard/sites">Sites</Link>
                <Link href="/dashboard/team">Team</Link>
                <Link href="/dashboard/locales">Locales</Link>
                <Link href="/dashboard/alerts">Alerts</Link>
                <Link href="/dashboard/settings">Settings</Link>
              </nav>

              <nav className="sidebar-group" aria-label="Preview and Context">
                <p className="sidebar-label">Preview and context</p>
                <Link href="/preview">Public preview</Link>
                <Link href="/platform">Platform</Link>
                <Link href="/architecture">Architecture</Link>
                <Link href="/about">About</Link>
              </nav>

              <div className="sidebar-card sidebar-status">
                <p className="sidebar-label">Workspace state</p>
                <strong>Production preview</strong>
                <span>18 active sites</span>
                <span>14 open reviews</span>
              </div>
            </aside>

            <div className="app-main">
              <header className="topbar">
                <div className="topbar-inner">
                  <div className="topbar-context">
                    <p className="topbar-kicker">Workspace</p>
                    <strong>Federation editorial operations</strong>
                  </div>
                  <div className="topbar-search" aria-label="Search">
                    <span>Search pages, posts, events, or sites</span>
                  </div>
                  <div className="topbar-utilities">
                    <div className="utility-pill">
                      <span className="utility-dot" />
                      Live sync
                    </div>
                    <div className="utility-pill">3 approvals pending</div>
                    <div className="utility-avatar">RM</div>
                  </div>
                </div>
              </header>

              <div className="app-content">{children}</div>

              <footer className="site-footer">
                <div className="site-footer-inner">
                  <div>
                    <p className="eyebrow">Editorial CMS showcase</p>
                    <p className="footer-copy">
                      A SaaS-style product demo for multi-domain, multilingual
                      editorial operations and public-site delivery.
                    </p>
                  </div>
                  <div className="footer-links" aria-label="Footer">
                    <Link href="/preview">Preview</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
