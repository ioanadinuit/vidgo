/**
 * Canonical-host front door for vidgotech.com.
 *
 * The site is static (Next export in `out/`), but the two custom domains and
 * plain http all answered 200 with the same content, so Google saw four
 * copies of every page and kept three as "alternate page with proper
 * canonical". A 301 to https://vidgotech.com consolidates them; everything
 * else is served by the assets binding, which still honours `_redirects`.
 */
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Secret (wrangler secret put PRICING_KEY). Opens the private pricing pages. */
  PRICING_KEY?: string;
}

const CANONICAL_HOST = "vidgotech.com";

/**
 * The pricing pages are private: they open only with ?k=<PRICING_KEY>, which
 * sets a cookie for later visits. Everyone else gets the normal 404 page.
 */
const PRIVATE_PATHS = ["/preturi", "/en/pricing"];
const COOKIE = "vg_pricing";

function isPrivate(path: string) {
  return PRIVATE_PATHS.some((p) => path === p || path.startsWith(`${p}/`) || path.startsWith(`${p}.`));
}

function hasCookie(request: Request, key: string) {
  const cookies = request.headers.get("Cookie") ?? "";
  return cookies.split(";").some((c) => c.trim() === `${COOKIE}=${key}`);
}

async function privatePage(request: Request, env: Env, url: URL): Promise<Response> {
  const key = env.PRICING_KEY;
  if (key && url.searchParams.get("k") === key) {
    url.searchParams.delete("k");
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.pathname + url.search,
        "Set-Cookie": `${COOKIE}=${key}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
        "Cache-Control": "no-store",
      },
    });
  }
  if (key && hasCookie(request, key)) {
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set("Cache-Control", "private, no-store");
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  }
  const notFound = await env.ASSETS.fetch(new Request(new URL("/404", url), request));
  const out = new Response(notFound.body, { status: 404, headers: notFound.headers });
  out.headers.set("Cache-Control", "no-store");
  return out;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isWorkersDev = url.hostname.endsWith(".workers.dev");
    if (!isWorkersDev && (url.hostname !== CANONICAL_HOST || url.protocol !== "https:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (isPrivate(url.pathname)) {
      return privatePage(request, env, url);
    }
    return env.ASSETS.fetch(request);
  },
};
