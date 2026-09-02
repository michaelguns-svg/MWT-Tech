import type { Metadata } from "next";
import Link from "next/link";
import { AdminBlogsList } from "@/components/admin/AdminBlogsList";
import { dummyBlogs } from "@/lib/admin/dummy-blogs";
import { Section } from "@/components/ui";

// Not linked from anywhere in the site nav. Kept out of search engines
// until real authentication is added.
export const metadata: Metadata = {
  title: "Manage Blogs",
  robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
  return (
    <Section className="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-mw-primary sm:text-4xl">Manage Blogs</h1>
          <p className="mt-3 text-mw-ink/60">
            Showing placeholder data for now — this will list real posts once the database is connected.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="shrink-0 rounded-full bg-mw-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mw-secondary"
        >
          + New Post
        </Link>
      </div>

      <div className="mt-10">
        <AdminBlogsList initialBlogs={dummyBlogs} />
      </div>
    </Section>
  );
}
