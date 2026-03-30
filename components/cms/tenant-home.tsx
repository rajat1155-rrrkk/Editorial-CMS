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
    <div className="tenant-home-shell min-h-screen px-4 py-5 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <TenantNav />
        <GlobalBanner message={content.globalBanner} />

        <section className="tenant-home-hero mb-6 overflow-hidden rounded-[34px] border border-amber-100/80 bg-[linear-gradient(145deg,rgba(255,251,245,0.98),rgba(241,244,230,0.94))] shadow-[0_28px_80px_rgba(114,96,56,0.08)]">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6d8049]">{content.brandName}</p>
                <span className="rounded-full bg-[#edf2df] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4f6531]">
                  Live site
                </span>
                <span className="text-xs font-medium text-stone-500">Updated just now</span>
              </div>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-tight text-stone-950">
                {content.pageTitle}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{content.pageSubtitle}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode((value) => !value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    editMode
                      ? "bg-stone-900 text-[#fffaf0] shadow-[0_14px_30px_rgba(76,64,38,0.2)]"
                      : "bg-white text-stone-800 ring-1 ring-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {editMode ? "Edit mode on" : "Edit mode off"}
                </button>
                <Link
                  href="/admin"
                  className="rounded-full bg-[linear-gradient(135deg,#6f8f48,#98aa74)] px-4 py-2 text-sm font-semibold text-[#fffaf0] shadow-[0_16px_32px_rgba(114,96,56,0.14)]"
                >
                  Open admin
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {liveSignals.map((signal) => (
                <article
                  key={signal.label}
                  className="rounded-[24px] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(245,242,231,0.96))] p-4 shadow-[0_16px_40px_rgba(114,96,56,0.06)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d8049]">{signal.label}</p>
                  <strong className="mt-2 block text-base font-semibold tracking-tight text-stone-950">
                    {signal.value}
                  </strong>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[28px] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(245,242,232,0.96))] p-5 shadow-[0_20px_60px_rgba(114,96,56,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6d8049]">Stories</p>
            <strong className="mt-3 block text-3xl font-semibold tracking-tight text-stone-950">
              {content.blogPosts.length}
            </strong>
            <p className="mt-2 text-sm leading-6 text-stone-600">Latest posts and news items are ready for the public feed.</p>
          </article>
          <article className="rounded-[28px] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(245,242,232,0.96))] p-5 shadow-[0_20px_60px_rgba(114,96,56,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6d8049]">Events</p>
            <strong className="mt-3 block text-3xl font-semibold tracking-tight text-stone-950">
              {content.events.length}
            </strong>
            <p className="mt-2 text-sm leading-6 text-stone-600">Upcoming sessions and public dates stay visible at a glance.</p>
          </article>
          <article className="rounded-[28px] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(245,242,232,0.96))] p-5 shadow-[0_20px_60px_rgba(114,96,56,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6d8049]">Blocks</p>
            <strong className="mt-3 block text-3xl font-semibold tracking-tight text-stone-950">
              {content.blocks.length}
            </strong>
            <p className="mt-2 text-sm leading-6 text-stone-600">Hero, text, stats, CTA, and map blocks power the page.</p>
          </article>
        </div>

        <BlockRenderer blocks={content.blocks} events={content.events} editMode={editMode} />
      </div>
    </div>
  );
}
