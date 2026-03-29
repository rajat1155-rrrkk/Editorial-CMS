import Link from "next/link";
import type { CmsBlock, EventItem } from "../../lib/cms/types";

type BlockRendererProps = {
  blocks: CmsBlock[];
  events: EventItem[];
  editMode?: boolean;
};

function BlockFrame({
  label,
  editMode,
  children
}: {
  label: string;
  editMode?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-[28px] border bg-white/90 p-6 shadow-[0_22px_60px_rgba(16,83,56,0.08)] ${
        editMode ? "border-emerald-400 ring-2 ring-emerald-100" : "border-emerald-100"
      }`}
    >
      {editMode ? (
        <div className="mb-4 inline-flex rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Block: {label}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function BlockRenderer({ blocks, events, editMode }: BlockRendererProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => {
        switch (block.type) {
          case "hero":
            return (
              <BlockFrame key={block.id} label="Hero" editMode={editMode}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                  {block.data.eyebrow}
                </p>
                <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950">
                  {block.data.title}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{block.data.description}</p>
                <div className="mt-6">
                  <Link
                    href={block.data.ctaHref}
                    className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white"
                  >
                    {block.data.ctaLabel}
                  </Link>
                </div>
              </BlockFrame>
            );
          case "text":
            return (
              <BlockFrame key={block.id} label="Text" editMode={editMode}>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{block.data.heading}</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{block.data.body}</p>
              </BlockFrame>
            );
          case "imageText":
            return (
              <BlockFrame key={block.id} label="ImageText" editMode={editMode}>
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{block.data.heading}</h2>
                    <p className="mt-3 text-base leading-8 text-slate-600">{block.data.body}</p>
                  </div>
                  <div className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6">
                    <div className="flex h-full min-h-48 items-center justify-center rounded-[20px] border border-dashed border-emerald-200 bg-white text-center text-sm font-medium text-emerald-900">
                      {block.data.imageLabel}
                    </div>
                  </div>
                </div>
              </BlockFrame>
            );
          case "cta":
            return (
              <BlockFrame key={block.id} label="CTA" editMode={editMode}>
                <div className="rounded-[24px] bg-gradient-to-r from-emerald-950 to-emerald-700 p-8 text-white">
                  <h2 className="text-3xl font-semibold tracking-tight">{block.data.heading}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-emerald-50">{block.data.body}</p>
                  <Link
                    href={block.data.buttonHref}
                    className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-950"
                  >
                    {block.data.buttonLabel}
                  </Link>
                </div>
              </BlockFrame>
            );
          case "stats":
            return (
              <BlockFrame key={block.id} label="Stats" editMode={editMode}>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{block.data.heading}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {block.data.items.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[22px] border border-emerald-100 bg-emerald-50/60 p-5"
                    >
                      <strong className="block text-3xl font-semibold text-emerald-950">{item.value}</strong>
                      <span className="mt-2 block text-sm text-slate-600">{item.label}</span>
                    </article>
                  ))}
                </div>
              </BlockFrame>
            );
          case "events":
            return (
              <BlockFrame key={block.id} label="Events" editMode={editMode}>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{block.data.heading}</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{block.data.intro}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {events.slice(0, 2).map((event) => (
                    <article
                      key={event.id}
                      className="rounded-[22px] border border-emerald-100 bg-white p-5 shadow-[0_16px_40px_rgba(16,83,56,0.06)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                        {event.date}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{event.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{event.location}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{event.summary}</p>
                    </article>
                  ))}
                </div>
              </BlockFrame>
            );
          case "map":
            return (
              <BlockFrame key={block.id} label="Map" editMode={editMode}>
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{block.data.heading}</h2>
                    <p className="mt-3 text-base leading-8 text-slate-600">{block.data.description}</p>
                    <p className="mt-5 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
                      {block.data.location}
                    </p>
                  </div>
                  <div className="flex min-h-56 items-center justify-center rounded-[24px] border border-dashed border-emerald-200 bg-gradient-to-br from-white to-emerald-50 text-sm font-semibold text-emerald-900">
                    Mock map surface
                  </div>
                </div>
              </BlockFrame>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
