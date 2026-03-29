"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TenantContent, TenantSlug } from "../../lib/cms/types";
import { GlobalBanner } from "./global-banner";
import { TenantNav } from "./tenant-nav";

export function TenantEvents({ site }: { site: TenantSlug }) {
  const [content, setContent] = useState<TenantContent | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/content?site=${site}`, { cache: "no-store" });
      const data = (await response.json()) as { content: TenantContent };
      setContent(data.content);
    }

    void load();
  }, [site]);

  if (!content) {
    return <div className="px-6 py-16 text-sm text-slate-600">Loading events...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />
      <section className="rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{content.brandName}</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">Upcoming events</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Structured events data rendered through the same CMS simulation used for the homepage blocks.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {content.events.map((event) => (
            <article
              key={event.id}
              className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_20px_60px_rgba(16,83,56,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">{event.date}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{event.title}</h2>
              <p className="mt-3 text-sm font-medium text-slate-500">{event.location}</p>
              <p className="mt-3 text-base leading-8 text-slate-600">{event.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href={`/${site}`} className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white">
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
