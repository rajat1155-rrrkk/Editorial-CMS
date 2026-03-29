"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TENANTS } from "../../lib/cms/default-content";

const labels: Record<(typeof TENANTS)[number], string> = {
  france: "WWOOF France",
  india: "WWOOF India",
  canada: "WWOOF Canada"
};

export function TenantNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-[0_20px_60px_rgba(16,83,56,0.08)] backdrop-blur">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Multi-tenant preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            WWOOF France | WWOOF India | WWOOF Canada
          </h2>
        </div>
        <Link
          href="/admin"
          className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Open Admin
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {TENANTS.map((tenant) => {
          const active = pathname === `/${tenant}` || pathname.startsWith(`/${tenant}/`);

          return (
            <Link
              key={tenant}
              href={`/${tenant}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-emerald-900 text-white shadow-[0_14px_28px_rgba(13,108,71,0.18)]"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {labels[tenant]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
