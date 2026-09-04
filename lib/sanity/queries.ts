import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";
import { client } from "./client";

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImage: Image;
  content: PortableTextBlock[];
  publishedAt: string;
};

const blogPostFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  coverImage,
  content,
  publishedAt
`;

const allBlogPostsQuery = /* groq */ `
  *[_type == "blogPost"] | order(publishedAt desc) {
    ${blogPostFields}
  }
`;

const blogPostBySlugQuery = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${blogPostFields}
  }
`;

const allBlogSlugsQuery = /* groq */ `
  *[_type == "blogPost"]{ "slug": slug.current }
`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    return await client.fetch<SanityBlogPost[]>(allBlogPostsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    // Fails gracefully (e.g. before Sanity env vars are configured) so the
    // rest of the Insights page still renders instead of crashing.
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await client.fetch<SanityBlogPost | null>(
      blogPostBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    );
    return post ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from Sanity:`, error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const rows = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery, {}, { next: { revalidate: 60 } });
    return rows.map((r) => r.slug);
  } catch (error) {
    console.error("Failed to fetch blog slugs from Sanity:", error);
    return [];
  }
}
