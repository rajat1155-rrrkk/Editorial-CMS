"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TENANT_GROUPS, TENANTS } from "../../lib/cms/default-content";

export function TenantNav() {
  const pathname = usePathname();
  const regionSummary = TENANT_GROUPS.map((group) => group.region).join(" · ");

  return (
    <div className="mb-6 rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-[0_20px_60px_rgba(16,83,56,0.08)] backdrop-blur">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Multi-tenant preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {TENANTS.length} live sites
          </h2>
          <p className="mt-1 text-sm text-slate-500">{regionSummary}</p>
        </div>
        <Link
          href="/admin"
          className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Open Admin
        </Link>
      </div>

      <div className="grid gap-4">
        {TENANT_GROUPS.map((group) => (
          <section key={group.region} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">{group.region}</p>
              <span className="text-xs font-medium text-slate-500">{group.tenants.length} sites</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.tenants.map((tenant) => {
                const active = pathname === `/${tenant.slug}` || pathname.startsWith(`/${tenant.slug}/`);

                return (
                  <Link
                    key={tenant.slug}
                    href={`/${tenant.slug}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-emerald-900 text-white shadow-[0_14px_28px_rgba(13,108,71,0.18)]"
                        : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                    }`}
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
