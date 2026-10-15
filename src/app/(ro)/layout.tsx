import type { Metadata } from "next";

import { RootDocument } from "@/components/root-document";
import { layoutMetadata } from "@/lib/layout-metadata";

// Romanian root layout: the default language, served at the root of the site.
// English has its own root layout in (en)/ so that <html lang> differs.
export const metadata: Metadata = layoutMetadata("ro");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ro">{children}</RootDocument>;
}
