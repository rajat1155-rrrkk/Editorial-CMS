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
      className={`tenant-block-shell rounded-[30px] p-6 ${
        editMode ? "tenant-block-shell--edit" : ""
      }`}
    >
      {editMode ? (
        <div className="tenant-block-shell__label">
          Block: {label}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function BlockRenderer({ blocks, events, editMode }: BlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        switch (block.type) {
          case "hero":
            return (
              <BlockFrame key={block.id} label="Hero" editMode={editMode}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7e4b]">
                  {block.data.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,4.8vw,4.4rem)] font-semibold leading-[0.95] tracking-tight text-[#213127]">
                  {block.data.title}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#686458]">{block.data.description}</p>
                <div className="mt-7">
                  <Link
                    href={block.data.ctaHref}
                    className="tenant-block-button"
                  >
                    {block.data.ctaLabel}
                  </Link>
                </div>
              </BlockFrame>
            );
          case "text":
            return (
              <BlockFrame key={block.id} label="Text" editMode={editMode}>
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                  <p className="mt-3 text-base leading-8 text-[#686458]">{block.data.body}</p>
                </div>
              </BlockFrame>
            );
          case "imageText":
            return (
              <BlockFrame key={block.id} label="ImageText" editMode={editMode}>
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#b77932]">Block pairing</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                    <p className="mt-3 text-base leading-8 text-[#686458]">{block.data.body}</p>
                  </div>
                  <div className="tenant-block-media rounded-[26px] p-5">
                    <div className="tenant-block-media__frame flex h-full min-h-48 items-center justify-center rounded-[22px] text-center text-sm font-semibold text-[#4d652f]">
                      {block.data.imageLabel}
                    </div>
                  </div>
                </div>
              </BlockFrame>
            );
          case "cta":
            return (
              <BlockFrame key={block.id} label="CTA" editMode={editMode}>
                <div className="tenant-block-cta rounded-[26px] p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7e8b60]">Call to action</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-[#686458]">{block.data.body}</p>
                  <Link
                    href={block.data.buttonHref}
                    className="tenant-block-button mt-7"
                  >
                    {block.data.buttonLabel}
                  </Link>
                </div>
              </BlockFrame>
            );
          case "stats":
            return (
              <BlockFrame key={block.id} label="Stats" editMode={editMode}>
                <h2 className="text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {block.data.items.map((item) => (
                    <article key={item.label} className="tenant-stat-card rounded-[22px] p-5">
                      <strong className="block text-3xl font-semibold text-[#213127]">{item.value}</strong>
                      <span className="mt-2 block text-sm text-[#686458]">{item.label}</span>
                    </article>
                  ))}
                </div>
              </BlockFrame>
            );
          case "events":
            return (
              <BlockFrame key={block.id} label="Events" editMode={editMode}>
                <h2 className="text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[#686458]">{block.data.intro}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {events.slice(0, 2).map((event) => (
                    <article key={event.id} className="tenant-event-card rounded-[24px] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b77932]">
                        {event.date}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#213127]">{event.title}</h3>
                      <p className="mt-2 text-sm font-medium text-[#8b8778]">{event.location}</p>
                      <p className="mt-3 text-sm leading-7 text-[#686458]">{event.summary}</p>
                    </article>
                  ))}
                </div>
              </BlockFrame>
            );
          case "map":
            return (
              <BlockFrame key={block.id} label="Map" editMode={editMode}>
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#6d7e4b]">Regional layer</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#213127]">{block.data.heading}</h2>
                    <p className="mt-3 text-base leading-8 text-[#686458]">{block.data.description}</p>
                    <p className="mt-5 inline-flex rounded-full bg-[rgba(203,213,182,0.42)] px-4 py-2 text-sm font-semibold text-[#4d652f]">
                      {block.data.location}
                    </p>
                  </div>
                  <div className="tenant-map-surface flex min-h-56 items-center justify-center rounded-[26px] text-sm font-semibold text-[#4d652f]">
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
