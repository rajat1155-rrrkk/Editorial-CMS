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

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 lg:px-8">
      <TenantNav />
      <GlobalBanner message={content.globalBanner} />

      <div className="mb-6 rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{content.brandName}</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950">
              {content.pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{content.pageSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setEditMode((value) => !value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                editMode ? "bg-emerald-900 text-white" : "bg-white text-emerald-900 ring-1 ring-emerald-200"
              }`}
            >
              {editMode ? "Edit Mode On" : "Edit Mode Off"}
            </button>
            <Link href="/admin" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
              Edit in admin
            </Link>
          </div>
        </div>
      </div>

      <BlockRenderer blocks={content.blocks} events={content.events} editMode={editMode} />
    </div>
  );
}
