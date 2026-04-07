"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppShellNav } from "./app-shell-nav";

export function AppShellFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const searchShortcuts = isHome
    ? [
        { label: "Pages", href: "/dashboard/pages" },
        { label: "Posts", href: "/dashboard/posts" },
        { label: "Media", href: "/dashboard/media" }
      ]
    : [
        { label: "Search pages", href: "/dashboard/pages" },
        { label: "Open review queue", href: "/dashboard/posts" },
        { label: "Check sites", href: "/dashboard/sites" }
      ];
  const notifications = [
    { tone: "warning", title: "Approval waiting", detail: "Summer homepage launch is still open." },
    { tone: "neutral", title: "Media queue", detail: "7 assets are waiting on crops or alt text." }
  ];

  return (
    <div className="site-chrome">
      <div className={`app-shell${isHome ? " app-shell--home" : ""}`}>
        <aside className={`app-sidebar${isHome ? " app-sidebar--home" : ""}`}>
          <div className="sidebar-card sidebar-brand">
            <Link href="/" className="brand-mark">
              Editorial CMS
            </Link>
            <p className="sidebar-copy">{isHome ? "Command center" : "Network publishing suite"}</p>
          </div>

          <AppShellNav />

          <div className={`sidebar-card sidebar-status${isHome ? " sidebar-status--home" : ""}`}>
            <p className="sidebar-label">Workspace state</p>
            <strong>16 active sites</strong>
            <span>24 open reviews</span>
          </div>
        </aside>

        <div className={`app-main${isHome ? " app-main--home" : ""}`}>
          <header className={`topbar${isHome ? " topbar--home" : ""}`}>
            <div className="topbar-inner">
              <div className="topbar-context">
                <p className="topbar-kicker">Workspace</p>
                <strong>{isHome ? "Command center" : "Publishing operations"}</strong>
              </div>
              <div className="topbar-search-shell">
                <div className="topbar-search" aria-label="Search">
                  <span>{isHome ? "Search content, sites, or jobs" : "Search pages, posts, events, or sites"}</span>
                </div>
                <div className="topbar-shortcuts" aria-label="Shortcuts">
                  {searchShortcuts.map((item) => (
                    <Link key={item.href} href={item.href} className="topbar-shortcut">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="topbar-utilities">
                <div className="utility-pill">
                  <span className="utility-dot" />
                  Sync healthy
                </div>
                <div className="utility-pill">3 approvals pending</div>
                <div className="utility-notify" aria-label="Notifications">
                  <span className="utility-notify__count">{notifications.length}</span>
                  <div className="utility-notify__panel">
                    {notifications.map((item) => (
                      <div key={item.title} className={`utility-notify__item utility-notify__item--${item.tone}`}>
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="utility-avatar">EC</div>
              </div>
            </div>
          </header>

          <div className="app-content">{children}</div>

          {!isHome ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
