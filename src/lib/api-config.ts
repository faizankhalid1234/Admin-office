/** Use 127.0.0.1 on Windows — Node fetch to localhost can fail (IPv6). */
function normalizeBackendUrl(url: string): string {
  return url.trim().replace(/\/$/, "").replace("://localhost", "://127.0.0.1");
}

export function getBackendUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    "http://127.0.0.1:5000";
  return normalizeBackendUrl(url);
}

export function getBackendFallbackUrl(): string | undefined {
  const url =
    process.env.BACKEND_FALLBACK_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_FALLBACK_URL?.trim();
  return url ? normalizeBackendUrl(url) : undefined;
}

/** Primary URL first, then optional fallback (e.g. Vercel when local API is down). */
export function getBackendUrls(): string[] {
  const urls = [getBackendUrl()];
  const fallback = getBackendFallbackUrl();
  if (fallback && !urls.includes(fallback)) {
    urls.push(fallback);
  }
  return urls;
}

export function apiPath(path: string, baseUrl?: string): string {
  const base = baseUrl ?? getBackendUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Prefix for receipt URLs stored as /uploads/... */
export function resolveUploadUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${getBackendUrl()}${url}`;
}

export async function fetchFromBackend(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const urls = getBackendUrls();
  let lastError: unknown;

  for (let i = 0; i < urls.length; i++) {
    const url = apiPath(path, urls[i]);
    try {
      return await fetch(url, { ...init, cache: init.cache ?? "no-store" });
    } catch (error) {
      lastError = error;
      if (i < urls.length - 1) {
        console.warn(`[api] Unreachable at ${url}, trying fallback...`);
      } else {
        console.error(`[api] Backend unreachable at ${url}`, error);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Cannot connect to backend API");
}
