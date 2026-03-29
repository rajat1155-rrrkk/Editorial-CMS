import { DEFAULT_CONTENT, TENANTS } from "./default-content";
import type { TenantContent, TenantSlug } from "./types";

type StoreShape = Record<TenantSlug, TenantContent>;

declare global {
  // eslint-disable-next-line no-var
  var __cmsStore__: StoreShape | undefined;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getStore(): StoreShape {
  if (!globalThis.__cmsStore__) {
    globalThis.__cmsStore__ = clone(DEFAULT_CONTENT);
  }

  return globalThis.__cmsStore__;
}

export function getTenantContent(site: string): TenantContent | null {
  if (!TENANTS.includes(site as TenantSlug)) {
    return null;
  }

  return clone(getStore()[site as TenantSlug]);
}

export function listTenantContent(): StoreShape {
  return clone(getStore());
}

export function saveTenantContent(site: string, content: TenantContent): TenantContent | null {
  if (!TENANTS.includes(site as TenantSlug)) {
    return null;
  }

  const normalized = clone(content);
  normalized.slug = site as TenantSlug;
  getStore()[site as TenantSlug] = normalized;
  return clone(normalized);
}
