import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TENANTS } from "./lib/cms/default-content";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment && TENANTS.includes(firstSegment as (typeof TENANTS)[number])) {
    const headers = new Headers(request.headers);
    headers.set("x-tenant", firstSegment);

    return NextResponse.next({
      request: {
        headers
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
