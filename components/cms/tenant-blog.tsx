"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TenantContent, TenantSlug } from "../../lib/cms/types";
import { GlobalBanner } from "./global-banner";
import { TenantNav } from "./tenant-nav";

export function TenantBlog({ site }: { site: TenantSlug }) {
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
    return <div className="px-6 py-16 text-sm text-slate-600">Loading blog...</div>;
  }

  const featuredPost = content.blogPosts[0];
  const secondaryPost = content.blogPosts[1];
  const blogMetrics = [
    { label: "Stories live", value: String(content.blogPosts.length), detail: "Fresh public posts in the archive." },
    { label: "Featured story", value: featuredPost?.category ?? "Story", detail: featuredPost?.title ?? "Add a feature" },
    { label: "Publishing state", value: "Active", detail: "Editorial updates sync from the shared CMS." }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3eb] px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />
      <section className="tenant-content-shell tenant-content-shell--blog overflow-hidden rounded-[34px] border border-amber-100/80 bg-[linear-gradient(145deg,rgba(255,252,247,0.98),rgba(241,243,229,0.96))] p-6 shadow-[0_28px_80px_rgba(114,96,56,0.08)] lg:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6d8049]">{content.brandName}</p>
          <span className="rounded-full bg-[#efe6d4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
            Editorial feed
          </span>
          <span className="text-xs font-medium text-stone-500">Sync updated a few minutes ago</span>
        </div>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 lg:text-5xl">
              Stories, notes, and announcements.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
              A calm public archive with sample content that feels live without the extra noise.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${site}/events`}
              className="tenant-content-action tenant-content-action--primary rounded-full bg-[linear-gradient(135deg,#6f8f48,#98aa74)] px-5 py-3 text-sm font-semibold text-[#fffaf0] shadow-[0_16px_32px_rgba(111,143,72,0.2)]"
            >
              View events
            </Link>
            <Link
              href={`/${site}`}
              className="tenant-content-action tenant-content-action--secondary rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-800 ring-1 ring-amber-200"
            >
              Back home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {blogMetrics.map((metric) => (
            <article
              key={metric.label}
              className="tenant-content-metric rounded-[24px] border border-amber-100/80 bg-white/85 p-4 shadow-[0_16px_40px_rgba(114,96,56,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a7a68]">{metric.label}</p>
              <strong className="mt-2 block text-2xl font-semibold tracking-tight text-stone-950">{metric.value}</strong>
              <p className="mt-2 text-sm leading-6 text-stone-600">{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {content.blogPosts.map((post) => (
            <article
              key={post.id}
              className="tenant-content-card rounded-[28px] border border-amber-100/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(245,241,231,0.95))] p-6 shadow-[0_20px_60px_rgba(114,96,56,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7a7a68]">
                {post.category} • {post.date}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{post.title}</h2>
              <p className="mt-3 text-base leading-8 text-stone-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
        {secondaryPost ? (
          <div className="tenant-content-note mt-6 rounded-[28px] border border-amber-100/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(114,96,56,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7a7a68]">Editorial note</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {secondaryPost.title} is queued behind the featured story and can be surfaced on the homepage or a
              campaign page without changing the underlying structure.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
