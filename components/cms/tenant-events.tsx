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

  const nextEvent = content.events[0];
  const followUpEvent = content.events[1];

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />
      <section className="rounded-[32px] border border-emerald-100 bg-white/92 p-6 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{content.brandName}</p>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Calendar live
          </span>
          <span className="text-xs font-medium text-slate-500">Updated just now</span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">Upcoming events</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Upcoming sessions, recurring series, and event promotions powered by the same content model as the homepage.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Events</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">{content.events.length}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">Public calendar entries live across the site.</p>
          </article>
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Next up</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">
              {nextEvent?.date ?? "No date"}
            </strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">{nextEvent?.title ?? "Add a public event"}</p>
          </article>
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Series</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">Recurring ready</strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">Cloneable series keep repeat events consistent.</p>
          </article>
        </div>

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
        {followUpEvent ? (
          <div className="mt-6 rounded-[28px] border border-emerald-100 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Scheduling note</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {followUpEvent.title} is the next item in the queue and can be promoted to the homepage carousel or
              country event listing with the same structured fields.
            </p>
          </div>
        ) : null}
        <div className="mt-6">
          <Link href={`/${site}`} className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white">
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
