import type { Metadata } from "next";

import { NotFoundView } from "@/views/not-found";
import { getContent } from "@/lib/i18n";

// Exported as out/en/404.html. Cloudflare static assets (not_found_handling:
// "404-page") serve the nearest 404.html up the directory tree, so misses under
// /en/* get the English page and everything else gets the Romanian one.
export const metadata: Metadata = {
  title: getContent("en").common.notFound.title,
  robots: { index: false, follow: false },
  // A 404 page has no canonical or language twins; drop the ones inherited from the layout.
  alternates: {},
};

export default function EnglishNotFoundPage() {
  return <NotFoundView locale="en" />;
}
