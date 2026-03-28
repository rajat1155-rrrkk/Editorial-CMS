import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editorial CMS Showcase",
  description:
    "A Vercel-ready sample for a multilingual, multi-site editorial CMS platform."
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
                <Link href="/platform">Platform</Link>
                <Link href="/about">About</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/architecture">Architecture</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/contact">Contact</Link>
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
                <Link href="/platform">Platform</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/architecture">Architecture</Link>
                <Link href="/dashboard/sites">Sites</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
