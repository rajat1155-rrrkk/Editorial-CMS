import { notFound } from "next/navigation";
import { TENANTS } from "../../lib/cms/default-content";
import type { TenantSlug } from "../../lib/cms/types";
import { TenantHome } from "../../components/cms/tenant-home";

export function generateStaticParams() {
  return TENANTS.map((site) => ({ site }));
}

export default async function TenantPage({
  params
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;

  if (!TENANTS.includes(site as TenantSlug)) {
    notFound();
  }

  return <TenantHome site={site as TenantSlug} />;
}
