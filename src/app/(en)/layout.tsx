import type { Metadata } from "next";

import { RootDocument } from "@/components/root-document";
import { layoutMetadata } from "@/lib/layout-metadata";

// English root layout for everything under /en. See (ro)/layout.tsx.
export const metadata: Metadata = layoutMetadata("en");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
