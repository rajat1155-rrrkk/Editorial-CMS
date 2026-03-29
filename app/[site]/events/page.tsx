import { notFound } from "next/navigation";
import { TenantEvents } from "../../../components/cms/tenant-events";
import { TENANTS } from "../../../lib/cms/default-content";
import type { TenantSlug } from "../../../lib/cms/types";

export function generateStaticParams() {
  return TENANTS.map((site) => ({ site }));
}

export default async function TenantEventsPage({
  params
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;

  if (!TENANTS.includes(site as TenantSlug)) {
    notFound();
  }

  return <TenantEvents site={site as TenantSlug} />;
}
