"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TenantContent, TenantSlug } from "../../lib/cms/types";
import { BlockRenderer } from "./block-renderer";
import { GlobalBanner } from "./global-banner";
import { TenantNav } from "./tenant-nav";

type TenantHomeProps = {
  site: TenantSlug;
};

export function TenantHome({ site }: TenantHomeProps) {
  const [content, setContent] = useState<TenantContent | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/content?site=${site}`, { cache: "no-store" });
      const data = (await response.json()) as { content: TenantContent };
      setContent(data.content);
    }

    void load();
  }, [site]);

  if (!content) {
    return <div className="px-6 py-16 text-sm text-slate-600">Loading tenant content...</div>;
  }

  const latestPost = content.blogPosts[0];
  const nextEvent = content.events[0];
  const liveSignals = [
    {
      label: "Current update",
      value: "Live now",
      detail: "Editorial preview reflects the latest saved content."
    },
    {
      label: "Recent story",
      value: latestPost?.title ?? "No stories yet",
      detail: latestPost ? latestPost.excerpt : "Add a post to surface it here."
    },
    {
      label: "Next event",
      value: nextEvent?.title ?? "No events yet",
      detail: nextEvent ? `${nextEvent.date} · ${nextEvent.location}` : "Add an event to show it here."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />

      <div className="mb-6 overflow-hidden rounded-[32px] border border-emerald-100 bg-white/92 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{content.brandName}</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                Live site
              </span>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">
              {content.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{content.pageSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setEditMode((value) => !value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  editMode ? "bg-emerald-900 text-white" : "bg-white text-emerald-900 ring-1 ring-emerald-200"
                }`}
              >
                {editMode ? "Edit mode on" : "Edit mode off"}
              </button>
              <Link href="/admin" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
                Open admin
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {liveSignals.map((signal) => (
              <article
                key={signal.label}
                className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4 shadow-[0_16px_40px_rgba(16,83,56,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">{signal.label}</p>
                <strong className="mt-2 block text-base font-semibold tracking-tight text-slate-950">
                  {signal.value}
                </strong>
                <p className="mt-2 text-sm leading-6 text-slate-600">{signal.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-[28px] border border-emerald-100 bg-white/90 p-5 shadow-[0_20px_60px_rgba(16,83,56,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Stories</p>
          <strong className="mt-3 block text-3xl font-semibold tracking-tight text-slate-950">
            {content.blogPosts.length}
          </strong>
          <p className="mt-2 text-sm leading-6 text-slate-600">Latest posts and news items are ready for the public feed.</p>
        </article>
        <article className="rounded-[28px] border border-emerald-100 bg-white/90 p-5 shadow-[0_20px_60px_rgba(16,83,56,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Events</p>
          <strong className="mt-3 block text-3xl font-semibold tracking-tight text-slate-950">
            {content.events.length}
          </strong>
          <p className="mt-2 text-sm leading-6 text-slate-600">Upcoming sessions and public dates stay visible at a glance.</p>
        </article>
        <article className="rounded-[28px] border border-emerald-100 bg-white/90 p-5 shadow-[0_20px_60px_rgba(16,83,56,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Blocks</p>
          <strong className="mt-3 block text-3xl font-semibold tracking-tight text-slate-950">{content.blocks.length}</strong>
          <p className="mt-2 text-sm leading-6 text-slate-600">Hero, text, stats, CTA, and map blocks power the page.</p>
        </article>
      </div>

      <BlockRenderer blocks={content.blocks} events={content.events} editMode={editMode} />
    </div>
  );
}
