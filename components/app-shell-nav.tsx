"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

type NavGroupProps = {
  label: string;
  items: NavItem[];
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavGroup({ label, items }: NavGroupProps) {
  const pathname = usePathname();

  return (
    <nav className="sidebar-group" aria-label={label}>
      <p className="sidebar-label">{label}</p>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={isActive(pathname, item.href) ? "is-active" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppShellNav() {
  return (
    <>
      <NavGroup
        label="Workspace"
        items={[
          { href: "/", label: "Command center" },
          { href: "/dashboard", label: "Network overview" },
          { href: "/dashboard/pages", label: "Pages" },
          { href: "/dashboard/posts", label: "Posts" },
          { href: "/dashboard/events", label: "Events" },
          { href: "/dashboard/media", label: "Media" }
        ]}
      />

      <NavGroup
        label="Operations"
        items={[
          { href: "/dashboard/sites", label: "Sites" },
          { href: "/dashboard/team", label: "Team" },
          { href: "/dashboard/locales", label: "Locales" },
          { href: "/dashboard/alerts", label: "Alerts" },
          { href: "/dashboard/settings", label: "Settings" }
        ]}
      />

      <NavGroup
        label="Preview and context"
        items={[
          { href: "/preview", label: "Public preview" },
          { href: "/platform", label: "Platform" },
          { href: "/architecture", label: "Architecture" },
          { href: "/about", label: "About" }
        ]}
      />
    </>
  );
}
