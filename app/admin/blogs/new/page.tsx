import type { Metadata } from "next";
import { BlogForm } from "@/components/admin/BlogForm";
import { Section } from "@/components/ui";

// Not linked from anywhere in the site nav — only reachable by direct URL.
// Kept out of search engines until real authentication is added.
export const metadata: Metadata = {
  title: "Add Blog Post",
  robots: { index: false, follow: false },
};

export default function NewBlogPage() {
  return (
    <Section className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-mw-primary sm:text-4xl">Add a Blog Post</h1>
      <p className="mt-3 text-mw-ink/60">Fill in the fields below, then save to publish a new post.</p>

      <div className="mt-10 rounded-2xl border border-mw-line p-8">
        <BlogForm />
      </div>
    </Section>
  );
}
