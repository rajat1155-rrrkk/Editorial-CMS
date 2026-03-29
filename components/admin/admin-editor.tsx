"use client";

import { useEffect, useState } from "react";
import { TENANTS } from "../../lib/cms/default-content";
import type { CmsBlock, TenantContent, TenantSlug } from "../../lib/cms/types";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

type AdminEditorProps = {
  initialSite: TenantSlug;
};

export function AdminEditor({ initialSite }: AdminEditorProps) {
  const [site, setSite] = useState<TenantSlug>(initialSite);
  const [content, setContent] = useState<TenantContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string>("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/content?site=${site}`, { cache: "no-store" });
      const data = (await response.json()) as { content: TenantContent };
      const stored = window.localStorage.getItem(`cms-${site}`);
      setContent(stored ? (JSON.parse(stored) as TenantContent) : data.content);
    }

    void load();
  }, [site]);

  function updateBlock(index: number, nextBlock: CmsBlock) {
    setContent((current) => {
      if (!current) return current;
      const next = clone(current);
      next.blocks[index] = nextBlock;
      return next;
    });
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setNotice("");

    await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site,
        content
      })
    });

    window.localStorage.setItem(`cms-${site}`, JSON.stringify(content));
    setSaving(false);
    setNotice("Saved to API store and localStorage fallback.");
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 lg:px-8">
      <section className="rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-[0_28px_80px_rgba(16,83,56,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Admin editor</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">Fake CMS editing mode</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Edit tenant content, change page title, and update block fields using API routes only.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={site}
              onChange={(event) => setSite(event.target.value as TenantSlug)}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950 outline-none"
            >
              {TENANTS.map((tenant) => (
                <option key={tenant} value={tenant}>
                  {tenant}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void save()}
              disabled={!content || saving}
              className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        {notice ? <p className="mt-4 text-sm font-medium text-emerald-700">{notice}</p> : null}
      </section>

      {content ? (
        <section className="mt-6 space-y-5">
          <article className="rounded-[28px] border border-emerald-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(16,83,56,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Page settings</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-900">Page title</span>
                <input
                  value={content.pageTitle}
                  onChange={(event) =>
                    setContent((current) => (current ? { ...current, pageTitle: event.target.value } : current))
                  }
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-900">Page subtitle</span>
                <textarea
                  value={content.pageSubtitle}
                  onChange={(event) =>
                    setContent((current) => (current ? { ...current, pageSubtitle: event.target.value } : current))
                  }
                  rows={3}
                  className="w-full rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                />
              </label>
            </div>
          </article>

          {content.blocks.map((block, index) => (
            <article
              key={block.id}
              className="rounded-[28px] border border-emerald-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(16,83,56,0.08)]"
            >
              <div className="mb-4 inline-flex rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Block: {block.type}
              </div>

              {block.type === "hero" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <input
                    value={block.data.title}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          title: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Hero title"
                  />
                  <input
                    value={block.data.ctaLabel}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          ctaLabel: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="CTA label"
                  />
                  <textarea
                    value={block.data.description}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          description: event.target.value
                        }
                      })
                    }
                    rows={4}
                    className="lg:col-span-2 rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Hero description"
                  />
                </div>
              ) : null}

              {block.type === "text" ? (
                <div className="grid gap-4">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <textarea
                    value={block.data.body}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          body: event.target.value
                        }
                      })
                    }
                    rows={4}
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Body copy"
                  />
                </div>
              ) : null}

              {block.type === "imageText" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <input
                    value={block.data.imageLabel}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          imageLabel: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Image label"
                  />
                  <textarea
                    value={block.data.body}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          body: event.target.value
                        }
                      })
                    }
                    rows={4}
                    className="lg:col-span-2 rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Body"
                  />
                </div>
              ) : null}

              {block.type === "cta" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <input
                    value={block.data.buttonLabel}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          buttonLabel: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Button label"
                  />
                  <textarea
                    value={block.data.body}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          body: event.target.value
                        }
                      })
                    }
                    rows={3}
                    className="lg:col-span-2 rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Body"
                  />
                </div>
              ) : null}

              {block.type === "stats" ? (
                <div className="grid gap-4">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <div className="grid gap-4 lg:grid-cols-3">
                    {block.data.items.map((item, itemIndex) => (
                      <div key={`${block.id}-${itemIndex}`} className="space-y-2 rounded-2xl bg-emerald-50 p-4">
                        <input
                          value={item.label}
                          onChange={(event) => {
                            const items = [...block.data.items];
                            items[itemIndex] = { ...items[itemIndex], label: event.target.value };
                            updateBlock(index, {
                              ...block,
                              data: {
                                ...block.data,
                                items
                              }
                            });
                          }}
                          className="w-full rounded-xl border border-emerald-100 px-3 py-2 outline-none"
                          placeholder="Label"
                        />
                        <input
                          value={item.value}
                          onChange={(event) => {
                            const items = [...block.data.items];
                            items[itemIndex] = { ...items[itemIndex], value: event.target.value };
                            updateBlock(index, {
                              ...block,
                              data: {
                                ...block.data,
                                items
                              }
                            });
                          }}
                          className="w-full rounded-xl border border-emerald-100 px-3 py-2 outline-none"
                          placeholder="Value"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {block.type === "events" ? (
                <div className="grid gap-4">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <textarea
                    value={block.data.intro}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          intro: event.target.value
                        }
                      })
                    }
                    rows={3}
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Intro"
                  />
                </div>
              ) : null}

              {block.type === "map" ? (
                <div className="grid gap-4">
                  <input
                    value={block.data.heading}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          heading: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Heading"
                  />
                  <input
                    value={block.data.location}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          location: event.target.value
                        }
                      })
                    }
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Location"
                  />
                  <textarea
                    value={block.data.description}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        data: {
                          ...block.data,
                          description: event.target.value
                        }
                      })
                    }
                    rows={3}
                    className="rounded-2xl border border-emerald-100 px-4 py-3 outline-none"
                    placeholder="Description"
                  />
                </div>
              ) : null}
            </article>
          ))}
        </section>
      ) : (
        <div className="mt-6 rounded-[28px] border border-emerald-100 bg-white/90 p-6 text-sm text-slate-600">
          Loading tenant content...
        </div>
      )}
    </div>
  );
}
