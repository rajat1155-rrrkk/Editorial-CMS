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

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />
      <section className="rounded-[32px] border border-emerald-100 bg-white/92 p-6 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{content.brandName}</p>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Fresh content
          </span>
          <span className="text-xs font-medium text-slate-500">Sync updated a few minutes ago</span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">Blog and editorial updates</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Recent stories, editorial notes, and reusable publishing patterns for a live public site.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Posts</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">{content.blogPosts.length}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">Latest posts surfaced from the current site content.</p>
          </article>
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Featured</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">
              {featuredPost?.category ?? "Story"}
            </strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">{featuredPost?.title ?? "Add a featured post"}</p>
          </article>
          <article className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Update</p>
            <strong className="mt-2 block text-2xl font-semibold tracking-tight text-slate-950">Live archive</strong>
            <p className="mt-2 text-sm leading-6 text-slate-600">Older imported stories remain visible for browsing and reuse.</p>
          </article>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {content.blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_20px_60px_rgba(16,83,56,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {post.category} • {post.date}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{post.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
        {secondaryPost ? (
          <div className="mt-6 rounded-[28px] border border-emerald-100 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Editorial note</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {secondaryPost.title} is queued behind the featured story and can be surfaced on the homepage or a
              campaign page without changing the underlying structure.
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
