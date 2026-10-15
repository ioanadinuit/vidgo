import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostView } from "@/views/blog-post";
import { getBlogPost, getBlogPosts } from "@/lib/blog-posts";
import { blogPostMetadata } from "@/lib/page-metadata";

const LOCALE = "ro";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts(LOCALE).map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata(LOCALE, slug);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(LOCALE, slug);
  if (!post) {
    notFound();
  }
  return <BlogPostView locale={LOCALE} post={post} />;
}
