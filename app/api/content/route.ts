import { NextResponse } from "next/server";
import { getTenantContent, listTenantContent, saveTenantContent } from "../../../lib/cms/content-store";
import type { ContentPayload } from "../../../lib/cms/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const site = searchParams.get("site");

  if (!site) {
    return NextResponse.json({ tenants: listTenantContent() });
  }

  const content = getTenantContent(site);

  if (!content) {
    return NextResponse.json({ error: "Unknown site" }, { status: 404 });
  }

  return NextResponse.json({ content });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContentPayload>;

  if (!payload.site || !payload.content) {
    return NextResponse.json({ error: "Missing site or content" }, { status: 400 });
  }

  const saved = saveTenantContent(payload.site, payload.content);

  if (!saved) {
    return NextResponse.json({ error: "Unknown site" }, { status: 404 });
  }

  return NextResponse.json({ content: saved, saved: true });
}
