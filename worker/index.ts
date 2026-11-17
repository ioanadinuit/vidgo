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
}

const CANONICAL_HOST = "vidgotech.com";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isWorkersDev = url.hostname.endsWith(".workers.dev");
    if (!isWorkersDev && (url.hostname !== CANONICAL_HOST || url.protocol !== "https:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // Next's router prefetches page segments as /dir/__next.a.b.c.txt, but the
    // static export writes them as /dir/__next.a/b/c.txt, so every prefetch
    // logged a 404 in the console. Serve the nested file under the flat name.
    const slash = url.pathname.lastIndexOf("/");
    const file = url.pathname.slice(slash + 1);
    const parts = /^__next\.(.+)\.txt$/.exec(file)?.[1].split(".");
    if (!parts || parts.length < 2) return response;
    url.pathname = `${url.pathname.slice(0, slash + 1)}__next.${parts[0]}/${parts.slice(1).join("/")}.txt`;
    const nested = await env.ASSETS.fetch(new Request(url.toString(), request));
    return nested.status === 200 ? nested : response;
  },
};
