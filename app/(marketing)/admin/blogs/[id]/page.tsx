import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { dummyBlogs } from "@/lib/admin/dummy-blogs";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Edit Blog Post",
  robots: { index: false, follow: false },
};

export default async function AdminBlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = dummyBlogs.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <Section className="max-w-3xl">
      <Link href="/admin/blogs" className="text-sm font-semibold text-mw-secondary hover:underline">
        &larr; Back to all blogs
      </Link>

      <h1 className="mt-5 font-display text-3xl font-bold text-mw-primary sm:text-4xl">Edit Blog Post</h1>
      <p className="mt-3 text-mw-ink/60">Update the fields below, then save your changes.</p>

      <div className="mt-10 rounded-2xl border border-mw-line p-8">
        <BlogForm
          postId={post.id}
          initialTitle={post.title}
          initialContent={post.content}
          initialImageUrl={post.imageUrl}
        />
      </div>
    </Section>
  );
}
