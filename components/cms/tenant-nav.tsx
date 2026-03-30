"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TENANT_GROUPS, TENANTS } from "../../lib/cms/default-content";

export function TenantNav() {
  const pathname = usePathname();
  const regionSummary = TENANT_GROUPS.map((group) => group.region).join(" · ");

  return (
    <div className="tenant-nav-shell mb-6">
      <div className="tenant-nav-shell__top">
        <div className="tenant-nav-brand">
          <span className="tenant-nav-brand__mark">EN</span>
          <div>
            <p className="tenant-nav-brand__eyebrow">Public network</p>
            <strong>{TENANTS.length} live sites</strong>
            <span>{regionSummary}</span>
          </div>
        </div>

        <div className="tenant-nav-shell__actions">
          <div className="tenant-nav-shell__status">
            <span className="tenant-nav-shell__dot" />
            Live sync
          </div>
          <Link href="/admin" className="tenant-nav-shell__button">
            Open admin
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {TENANT_GROUPS.map((group) => (
          <section key={group.region} className="tenant-nav-group">
            <div className="tenant-nav-group__header">
              <p>{group.region}</p>
              <span>{group.tenants.length} sites</span>
            </div>
            <div className="tenant-nav-group__links">
              {group.tenants.map((tenant) => {
                const active = pathname === `/${tenant.slug}` || pathname.startsWith(`/${tenant.slug}/`);

                return (
                  <Link
                    key={tenant.slug}
                    href={`/${tenant.slug}`}
                    className={`tenant-nav-group__link ${active ? "tenant-nav-group__link--active" : ""}`}
                  >
                    {tenant.label}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
