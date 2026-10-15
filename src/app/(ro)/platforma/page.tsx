import type { Metadata } from "next";

import { PlatformView } from "@/views/platform";
import { platformMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = platformMetadata("ro");

export default function PlatformPage() {
  return <PlatformView locale="ro" />;
}
