"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TENANT_DIRECTORY } from "../../lib/cms/default-content";
import type { CmsBlock, TenantContent, TenantSlug } from "../../lib/cms/types";
import { BlockRenderer } from "../cms/block-renderer";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

type AdminEditorProps = {
  initialSite: TenantSlug;
};

type CmsBlockType = CmsBlock["type"];
type HistoryEntry = {
  label: string;
  detail: string;
  time: string;
};

function createBlock(type: CmsBlockType): CmsBlock {
  const id = `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  switch (type) {
    case "hero":
      return {
        id,
        type,
        data: {
          eyebrow: "New section",
          title: "Add a new hero headline",
          description: "Use this block for the main story or a high-priority campaign message.",
          ctaLabel: "Learn more",
          ctaHref: "/contact"
        }
      };
    case "text":
      return {
        id,
        type,
        data: {
          heading: "New text section",
          body: "Add editorial body copy, context, or supporting detail here."
        }
      };
    case "imageText":
      return {
        id,
        type,
        data: {
          heading: "Image with text",
          body: "Pair an image label with supporting text to explain a program, story, or campaign.",
          imageLabel: "Editorial image",
          imageAlt: "Editorial image"
        }
      };
    case "cta":
      return {
        id,
        type,
        data: {
          heading: "Call to action",
          body: "Prompt visitors to continue into a form, story, event, or membership path.",
          buttonLabel: "Open",
          buttonHref: "/contact"
        }
      };
    case "stats":
      return {
        id,
        type,
        data: {
          heading: "Key numbers",
          items: [
            { label: "Sites", value: "16" },
            { label: "Locales", value: "24" },
            { label: "Editors", value: "64" }
          ]
        }
      };
    case "events":
      return {
        id,
        type,
        data: {
          heading: "Upcoming events",
          intro: "Highlight upcoming sessions, public dates, or recurring calendar items."
        }
      };
    case "map":
      return {
        id,
        type,
        data: {
          heading: "Map overview",
          location: "Regional network",
          description: "Show a location cluster or regional footprint with a simple map layer."
        }
      };
  }
}

export function AdminEditor({ initialSite }: AdminEditorProps) {
  const [site, setSite] = useState<TenantSlug>(initialSite);
  const [content, setContent] = useState<TenantContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("09:42");
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { label: "Initial sync", detail: "Loaded tenant content into the editor workspace.", time: "09:42" },
    { label: "Publish review", detail: "The current draft still has one approval pending.", time: "09:18" }
  ]);

  const currentTenant = TENANT_DIRECTORY.find((tenant) => tenant.slug === site);
  const publicRoute = `/${site}`;

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/content?site=${site}`, { cache: "no-store" });
      const data = (await response.json()) as { content: TenantContent };
      const stored = window.localStorage.getItem(`cms-${site}`);
      const nextContent = stored ? (JSON.parse(stored) as TenantContent) : data.content;
      setContent(nextContent);
      setActiveBlockId(nextContent.blocks[0]?.id ?? null);
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

  function moveBlock(index: number, direction: -1 | 1) {
    updateContent((current) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= current.blocks.length) {
        return current;
      }

      const nextBlocks = [...current.blocks];
      [nextBlocks[index], nextBlocks[targetIndex]] = [nextBlocks[targetIndex], nextBlocks[index]];
      current.blocks = nextBlocks;
      return current;
    });
    setHistory((current) =>
      [
        {
          label: "Block reordered",
          detail: `Moved block ${index + 1} ${direction < 0 ? "up" : "down"} in the page outline.`,
          time: "Just now"
        },
        ...current
      ].slice(0, 6)
    );
  }

  function removeBlock(index: number) {
    const removedType = content?.blocks[index]?.type ?? "block";
    updateContent((current) => {
      const removedBlock = current.blocks[index];
      current.blocks = current.blocks.filter((_, itemIndex) => itemIndex !== index);
      if (activeBlockId === removedBlock?.id) {
        setActiveBlockId(current.blocks[0]?.id ?? null);
      }
      return current;
    });
    setHistory((current) =>
      [
        {
          label: "Block removed",
          detail: `${removedType} block removed from the current draft.`,
          time: "Just now"
        },
        ...current
      ].slice(0, 6)
    );
  }

  function addBlock(type: CmsBlockType) {
    const nextBlock = createBlock(type);
    updateContent((current) => {
      current.blocks = [...current.blocks, nextBlock];
      return current;
    });
    setActiveBlockId(nextBlock.id);
    setNotice(`${type} block added to the page.`);
    setHistory((current) =>
      [
        {
          label: "Block added",
          detail: `${type} block appended to the page structure.`,
          time: "Just now"
        },
        ...current
      ].slice(0, 6)
    );
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
    setHistory((current) =>
      [
        {
          label: "Draft saved",
          detail: `Saved ${content.blocks.length} blocks and current page settings for ${currentTenant?.displayName ?? site}.`,
          time: "Just now"
        },
        ...current
      ].slice(0, 6)
    );
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
              <button
                type="button"
                onClick={() => setPreviewMode((value) => !value)}
                className="admin-button admin-button--secondary"
              >
                {previewMode ? "Hide preview" : "Show preview"}
              </button>
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
                <div className="admin-block__header">
                  <div>
                    <p className="admin-card__eyebrow">Activity</p>
                    <h2>Recent changes</h2>
                  </div>
                  <span className="admin-block__badge">Session</span>
                </div>

                <div className="admin-history-list">
                  {history.map((entry) => (
                    <article key={`${entry.label}-${entry.time}-${entry.detail}`} className="admin-history-item">
                      <strong>{entry.label}</strong>
                      <p>{entry.detail}</p>
                      <span>{entry.time}</span>
                    </article>
                  ))}
                </div>
              </article>

              <article className="admin-card">
                <div className="admin-block__header">
                  <div>
                    <p className="admin-card__eyebrow">Content outline</p>
                    <h2>Page structure</h2>
                  </div>
                  <span className="admin-block__badge">{content.blocks.length} blocks</span>
                </div>

                <div className="admin-outline-list">
                  {content.blocks.map((block, index) => (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => setActiveBlockId(block.id)}
                      className={`admin-outline-item ${activeBlockId === block.id ? "admin-outline-item--active" : ""}`}
                    >
                      <span className="admin-outline-item__index">{index + 1}</span>
                      <span className="admin-outline-item__content">
                        <strong>{block.type}</strong>
                        <small>{block.id}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </article>

              <article className="admin-card">
                <div className="admin-block__header">
                  <div>
                    <p className="admin-card__eyebrow">Add block</p>
                    <h2>Block library</h2>
                  </div>
                  <span className="admin-block__badge">Reusable</span>
                </div>

                <div className="admin-library-grid">
                  {(["hero", "text", "imageText", "cta", "stats", "events", "map"] as CmsBlockType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addBlock(type)}
                      className="admin-library-item"
                    >
                      <strong>{type}</strong>
                      <span>Add to page</span>
                    </button>
                  ))}
                </div>
              </article>
            </section>

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

            {previewMode ? (
              <section className="admin-card admin-preview-panel">
                <div className="admin-block__header">
                  <div>
                    <p className="admin-card__eyebrow">Inline preview</p>
                    <h2>Live page rendering</h2>
                  </div>
                  <span className="admin-block__badge">{publicRoute}</span>
                </div>

                <div className="admin-preview-frame">
                  <div className="admin-preview-frame__bar">
                    <span />
                    <span />
                    <span />
                    <strong>{currentTenant?.displayName ?? site}</strong>
                  </div>
                  <div className="admin-preview-frame__body">
                    <BlockRenderer blocks={content.blocks} events={content.events} />
                  </div>
                </div>
              </section>
            ) : null}

            <section className="admin-grid admin-grid--blocks">
              {content.blocks.map((block, index) => (
                <article
                  key={block.id}
                  className={`admin-card admin-block ${activeBlockId === block.id ? "admin-block--active" : ""}`}
                >
                  <div className="admin-block__header">
                    <div>
                      <p className="admin-card__eyebrow">Block {index + 1}</p>
                      <h2>{block.type}</h2>
                    </div>
                    <div className="admin-block__toolbar">
                      <span className="admin-block__badge">Editable</span>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, -1)}
                        disabled={index === 0}
                        className="admin-toolbar-button"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, 1)}
                        disabled={index === content.blocks.length - 1}
                        className="admin-toolbar-button"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(index)}
                        disabled={content.blocks.length === 1}
                        className="admin-toolbar-button admin-toolbar-button--danger"
                      >
                        Remove
                      </button>
                    </div>
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
