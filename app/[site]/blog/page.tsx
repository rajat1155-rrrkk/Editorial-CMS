import { notFound } from "next/navigation";
import { TenantBlog } from "../../../components/cms/tenant-blog";
import { TENANTS } from "../../../lib/cms/default-content";
import type { TenantSlug } from "../../../lib/cms/types";

export function generateStaticParams() {
  return TENANTS.map((site) => ({ site }));
}

export default async function TenantBlogPage({
  params
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;

  if (!TENANTS.includes(site as TenantSlug)) {
    notFound();
  }

  return <TenantBlog site={site as TenantSlug} />;
}
