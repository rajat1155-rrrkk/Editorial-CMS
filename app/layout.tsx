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
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand-mark">
                Editorial CMS
              </Link>
              <nav className="topnav" aria-label="Primary">
                <Link href="/">Workspace</Link>
                <Link href="/dashboard/pages">Pages</Link>
                <Link href="/dashboard/posts">Posts</Link>
                <Link href="/dashboard/events">Events</Link>
                <Link href="/dashboard/media">Media</Link>
                <Link href="/dashboard/sites">Sites</Link>
                <Link href="/dashboard/settings">Settings</Link>
                <Link href="/dashboard/team">Team</Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div className="site-footer-inner">
              <div>
                <p className="eyebrow">Editorial CMS showcase</p>
                <p className="footer-copy">
                  A concept site for a multi-domain, multilingual editorial
                  platform built for distributed organizations.
                </p>
              </div>
              <div className="footer-links" aria-label="Footer">
                <Link href="/dashboard">Overview</Link>
                <Link href="/dashboard/team">Team</Link>
                <Link href="/dashboard/locales">Locales</Link>
                <Link href="/dashboard/alerts">Alerts</Link>
                <Link href="/preview">Preview</Link>
                <Link href="/platform">Platform</Link>
                <Link href="/architecture">Architecture</Link>
                <Link href="/about">About</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
