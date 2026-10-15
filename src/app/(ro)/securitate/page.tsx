import type { Metadata } from "next";

import { SecurityView } from "@/views/security";
import { securityMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = securityMetadata("ro");

export default function SecurityPage() {
  return <SecurityView locale="ro" />;
}
