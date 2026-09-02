"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AdminBlogPost } from "@/lib/admin/dummy-blogs";

export function AdminBlogsList({ initialBlogs }: { initialBlogs: AdminBlogPost[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);

  function handleDelete(id: string, title: string) {
    // TODO: once the database is connected, this should call the delete
    // endpoint first and only update local state after a successful response.
    const confirmed = window.confirm(`Delete "${title}"? This can't be undone.`);
    if (!confirmed) return;
    setBlogs((current) => current.filter((post) => post.id !== id));
  }

  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-mw-line p-10 text-center text-sm text-mw-ink/50">
        No blog posts yet. Click &ldquo;New Post&rdquo; to add one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-mw-line">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-mw-line bg-mw-paper text-xs font-semibold uppercase tracking-widest text-mw-ink/40">
            <th className="px-6 py-4">Post</th>
            <th className="hidden px-6 py-4 sm:table-cell">Added</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((post) => (
            <tr key={post.id} className="border-b border-mw-line last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-mw-line">
                    <Image src={post.imageUrl} alt="" fill className="object-cover" />
                  </div>
                  <span className="font-semibold text-mw-primary">{post.title}</span>
                </div>
              </td>
              <td className="hidden px-6 py-4 text-sm text-mw-ink/50 sm:table-cell">{post.createdAt}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-4 text-sm font-semibold">
                  <Link href={`/admin/blogs/${post.id}`} className="text-mw-secondary hover:underline">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
