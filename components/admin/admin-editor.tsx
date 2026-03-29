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
  const [lastSavedAt, setLastSavedAt] = useState<string>("09:42");

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
    setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setNotice("Saved to API store and localStorage fallback.");
  }

  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <div className="editor-hero__copy">
          <p className="dashboard-eyebrow">Editor workspace</p>
          <h1>Content editing and publish review.</h1>
          <p className="editor-lede">Live editor state for pages, blocks, locale content, and publishing.</p>
          <div className="editor-actions">
            <select
              value={site}
              onChange={(event) => setSite(event.target.value as TenantSlug)}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950 outline-none"
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
              className="dashboard-button dashboard-button--primary"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
          {notice ? <p className="editor-lede">{notice}</p> : null}
        </div>

        <aside className="editor-meta" aria-label="Editor state">
          <div className="editor-meta-card">
            <span>Selected site</span>
            <strong>{site}</strong>
          </div>
          <div className="editor-meta-card">
            <span>Last saved</span>
            <strong>{lastSavedAt}</strong>
          </div>
          <div className="editor-meta-card">
            <span>Review state</span>
            <strong>{content ? `${content.blocks.length} blocks loaded` : "Loading"}</strong>
          </div>
        </aside>
      </section>

      {content ? (
        <>
          <section className="editor-grid editor-grid--split">
            <article className="editor-card">
              <p className="dashboard-card__eyebrow">Page settings</p>
              <h2>Current page model</h2>
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

            <article className="editor-card">
              <p className="dashboard-card__eyebrow">Publish panel</p>
              <div className="editor-approval-grid">
                <div className="editor-approval-card">
                  <span>Status</span>
                  <strong>Draft</strong>
                </div>
                <div className="editor-approval-card">
                  <span>Locale</span>
                  <strong>2 live</strong>
                </div>
                <div className="editor-approval-card">
                  <span>Approvals</span>
                  <strong>1 pending</strong>
                </div>
              </div>
              <div className="editor-stack">
                <div className="editor-row">
                  <h3>Scheduled publish</h3>
                  <p>Monday, 09:00 UTC</p>
                </div>
                <div className="editor-row">
                  <h3>Assigned editor</h3>
                  <p>Regional content team</p>
                </div>
                <div className="editor-row">
                  <h3>Preview route</h3>
                  <p>/{site}</p>
                </div>
              </div>
            </article>
          </section>

          <section className="editor-grid">
            {content.blocks.map((block, index) => (
              <article
                key={block.id}
                className="editor-card"
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
        </>
      ) : (
        <div className="editor-card" style={{ marginTop: "1.5rem" }}>
          Loading tenant content...
        </div>
      )}
    </main>
  );
}
