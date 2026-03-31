"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TENANT_DIRECTORY } from "../../lib/cms/default-content";
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
  const [notice, setNotice] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("09:42");

  const currentTenant = TENANT_DIRECTORY.find((tenant) => tenant.slug === site);
  const publicRoute = `/${site}`;

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/content?site=${site}`, { cache: "no-store" });
      const data = (await response.json()) as { content: TenantContent };
      const stored = window.localStorage.getItem(`cms-${site}`);
      setContent(stored ? (JSON.parse(stored) as TenantContent) : data.content);
      setNotice("");
    }

    void load();
  }, [site]);

  function updateContent(updater: (current: TenantContent) => TenantContent) {
    setContent((current) => {
      if (!current) return current;
      return updater(clone(current));
    });
  }

  function updateBlock(index: number, nextBlock: CmsBlock) {
    updateContent((current) => {
      current.blocks[index] = nextBlock;
      return current;
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
    setNotice("Saved to the API store and browser fallback.");
  }

  return (
    <main className="admin-shell min-h-screen px-4 py-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <section className="admin-hero">
          <div className="admin-hero__copy">
            <p className="admin-eyebrow">Editor workspace</p>
            <h1>Editorial operations center</h1>
            <p className="admin-lede">
              Manage page copy, blocks, banners, and publish state from one calm workspace for the {currentTenant?.displayName ?? site} site.
            </p>

            <div className="admin-actions">
              <label className="admin-select-wrap">
                <span>Site</span>
                <select
                  value={site}
                  onChange={(event) => setSite(event.target.value as TenantSlug)}
                  className="admin-select"
                >
                  {TENANT_DIRECTORY.map((tenant) => (
                    <option key={tenant.slug} value={tenant.slug}>
                      {tenant.displayName}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => void save()}
                disabled={!content || saving}
                className="admin-button admin-button--primary"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
              <Link href={publicRoute} className="admin-button admin-button--secondary">
                Open live site
              </Link>
            </div>

            {notice ? <p className="admin-lede admin-notice">{notice}</p> : null}
          </div>

          <aside className="admin-meta" aria-label="Editor state">
            <div className="admin-meta-card">
              <span>Selected site</span>
              <strong>{currentTenant?.displayName ?? site}</strong>
            </div>
            <div className="admin-meta-card">
              <span>Locale mix</span>
              <strong>{currentTenant?.localeSummary ?? "English"}</strong>
            </div>
            <div className="admin-meta-card">
              <span>Last saved</span>
              <strong>{lastSavedAt}</strong>
            </div>
            <div className="admin-meta-card">
              <span>Loaded blocks</span>
              <strong>{content ? content.blocks.length : "Loading"}</strong>
            </div>
          </aside>
        </section>

        {content ? (
          <>
            <section className="admin-grid admin-grid--split">
              <article className="admin-card">
                <p className="admin-card__eyebrow">Site details</p>
                <h2>Current publication</h2>
                <div className="admin-summary-grid">
                  <div className="admin-summary-item">
                    <span>Brand</span>
                    <strong>{content.brandName}</strong>
                  </div>
                  <div className="admin-summary-item">
                    <span>Region</span>
                    <strong>{currentTenant?.region ?? "Global"}</strong>
                  </div>
                  <div className="admin-summary-item">
                    <span>Route</span>
                    <strong>{publicRoute}</strong>
                  </div>
                  <div className="admin-summary-item">
                    <span>Publishing mode</span>
                    <strong>Shared CMS / local overrides</strong>
                  </div>
                </div>

                <div className="admin-field-grid">
                  <label className="admin-field-group">
                    <span>Page title</span>
                    <input
                      value={content.pageTitle}
                      onChange={(event) =>
                        updateContent((current) => ({ ...current, pageTitle: event.target.value }))
                      }
                      className="admin-field"
                    />
                  </label>

                  <label className="admin-field-group">
                    <span>Page subtitle</span>
                    <textarea
                      value={content.pageSubtitle}
                      onChange={(event) =>
                        updateContent((current) => ({ ...current, pageSubtitle: event.target.value }))
                      }
                      rows={4}
                      className="admin-field admin-field--textarea"
                    />
                  </label>

                  <label className="admin-field-group admin-field-group--full">
                    <span>Global banner</span>
                    <input
                      value={content.globalBanner}
                      onChange={(event) =>
                        updateContent((current) => ({ ...current, globalBanner: event.target.value }))
                      }
                      className="admin-field"
                    />
                  </label>
                </div>
              </article>

              <article className="admin-card admin-card--accent">
                <p className="admin-card__eyebrow">Publish snapshot</p>
                <h2>Workspace status</h2>
                <div className="admin-approval-grid">
                  <div className="admin-approval-card">
                    <span>Status</span>
                    <strong>Draft</strong>
                  </div>
                  <div className="admin-approval-card">
                    <span>Approvals</span>
                    <strong>1 pending</strong>
                  </div>
                  <div className="admin-approval-card">
                    <span>Locales</span>
                    <strong>{currentTenant?.localeSummary ?? "English"}</strong>
                  </div>
                </div>

                <div className="admin-stack">
                  <div className="admin-row">
                    <h3>Scheduled publish</h3>
                    <p>Monday, 09:00 UTC</p>
                  </div>
                  <div className="admin-row">
                    <h3>Assigned editor</h3>
                    <p>Regional content team</p>
                  </div>
                  <div className="admin-row">
                    <h3>Preview route</h3>
                    <p>{publicRoute}</p>
                  </div>
                  <div className="admin-row">
                    <h3>Sync state</h3>
                    <p>API store + browser fallback enabled</p>
                  </div>
                </div>
              </article>
            </section>

            <section className="admin-grid admin-grid--blocks">
              {content.blocks.map((block, index) => (
                <article key={block.id} className="admin-card admin-block">
                  <div className="admin-block__header">
                    <div>
                      <p className="admin-card__eyebrow">Block {index + 1}</p>
                      <h2>{block.type}</h2>
                    </div>
                    <span className="admin-block__badge">Editable</span>
                  </div>

                  {block.type === "hero" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group">
                        <span>Eyebrow</span>
                        <input
                          value={block.data.eyebrow}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, eyebrow: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>Hero title</span>
                        <input
                          value={block.data.title}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, title: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Description</span>
                        <textarea
                          value={block.data.description}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, description: event.target.value }
                            })
                          }
                          rows={4}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>CTA label</span>
                        <input
                          value={block.data.ctaLabel}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, ctaLabel: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>CTA route</span>
                        <input
                          value={block.data.ctaHref}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, ctaHref: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                    </div>
                  ) : null}

                  {block.type === "text" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group admin-field-group--full">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Body</span>
                        <textarea
                          value={block.data.body}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, body: event.target.value }
                            })
                          }
                          rows={4}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                    </div>
                  ) : null}

                  {block.type === "imageText" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>Image label</span>
                        <input
                          value={block.data.imageLabel}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, imageLabel: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Body</span>
                        <textarea
                          value={block.data.body}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, body: event.target.value }
                            })
                          }
                          rows={4}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                    </div>
                  ) : null}

                  {block.type === "cta" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>Button label</span>
                        <input
                          value={block.data.buttonLabel}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, buttonLabel: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Body</span>
                        <textarea
                          value={block.data.body}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, body: event.target.value }
                            })
                          }
                          rows={3}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>Button route</span>
                        <input
                          value={block.data.buttonHref}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, buttonHref: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                    </div>
                  ) : null}

                  {block.type === "stats" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group admin-field-group--full">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <div className="admin-stat-grid admin-field-group--full">
                        {block.data.items.map((item, itemIndex) => (
                          <div key={`${block.id}-${itemIndex}`} className="admin-stat-card">
                            <span>Stat {itemIndex + 1}</span>
                            <input
                              value={item.label}
                              onChange={(event) => {
                                const items = [...block.data.items];
                                items[itemIndex] = { ...items[itemIndex], label: event.target.value };
                                updateBlock(index, {
                                  ...block,
                                  data: { ...block.data, items }
                                });
                              }}
                              className="admin-field admin-field--compact"
                              placeholder="Label"
                            />
                            <input
                              value={item.value}
                              onChange={(event) => {
                                const items = [...block.data.items];
                                items[itemIndex] = { ...items[itemIndex], value: event.target.value };
                                updateBlock(index, {
                                  ...block,
                                  data: { ...block.data, items }
                                });
                              }}
                              className="admin-field admin-field--compact"
                              placeholder="Value"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {block.type === "events" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group admin-field-group--full">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Intro</span>
                        <textarea
                          value={block.data.intro}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, intro: event.target.value }
                            })
                          }
                          rows={4}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                    </div>
                  ) : null}

                  {block.type === "map" ? (
                    <div className="admin-field-grid">
                      <label className="admin-field-group">
                        <span>Heading</span>
                        <input
                          value={block.data.heading}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, heading: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group">
                        <span>Location</span>
                        <input
                          value={block.data.location}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, location: event.target.value }
                            })
                          }
                          className="admin-field"
                        />
                      </label>
                      <label className="admin-field-group admin-field-group--full">
                        <span>Description</span>
                        <textarea
                          value={block.data.description}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              data: { ...block.data, description: event.target.value }
                            })
                          }
                          rows={4}
                          className="admin-field admin-field--textarea"
                        />
                      </label>
                    </div>
                  ) : null}
                </article>
              ))}
            </section>
          </>
        ) : (
          <div className="admin-card">Loading tenant content...</div>
        )}
      </div>
    </main>
  );
}
