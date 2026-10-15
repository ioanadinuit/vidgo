import type { Metadata } from "next";

import { BlogView } from "@/views/blog";
import { blogMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = blogMetadata("en");

export default function BlogPage() {
  return <BlogView locale="en" />;
}
