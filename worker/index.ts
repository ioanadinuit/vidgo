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
    return env.ASSETS.fetch(request);
  },
};
