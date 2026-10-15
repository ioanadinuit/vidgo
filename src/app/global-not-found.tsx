import type { Metadata } from "next";

import { RootDocument } from "@/components/root-document";
import { NotFoundView } from "@/views/not-found";
import { layoutMetadata } from "@/lib/layout-metadata";

// The site has two root layouts (route groups (ro) and (en)), so the 404 for
// unmatched URLs is a global-not-found that renders its own document. It is
// exported as out/404.html; /en/* misses are served out/en/404.html instead.
export const metadata: Metadata = layoutMetadata("ro");

export default function GlobalNotFound() {
  return (
    <RootDocument locale="ro">
      <NotFoundView locale="ro" />
    </RootDocument>
  );
}
