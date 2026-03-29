import type { Metadata } from "next";
import Link from "next/link";
import { AppShellNav } from "../components/app-shell-nav";
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
                <p className="sidebar-copy">Multi-site publishing</p>
              </div>

              <AppShellNav />

              <div className="sidebar-card sidebar-status">
                <p className="sidebar-label">Workspace state</p>
                <strong>18 active sites</strong>
                <span>14 open reviews</span>
              </div>
            </aside>

            <div className="app-main">
              <header className="topbar">
                <div className="topbar-inner">
                  <div className="topbar-context">
                    <p className="topbar-kicker">Workspace</p>
                    <strong>Editorial network operations</strong>
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
                    <div className="utility-avatar">EC</div>
                  </div>
                </div>
              </header>

              <div className="app-content">{children}</div>

              <footer className="site-footer">
                <div className="site-footer-inner">
                  <p className="site-footer-mark">Editorial CMS</p>
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
