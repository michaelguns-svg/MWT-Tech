import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { insights } from "@/lib/site-data";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Insights & Perspectives",
  description:
    "Perspectives on business transformation, enterprise platforms, and operational visibility from the Mawkish Technologies team.",
};

// Revalidate periodically so new/edited posts in Sanity show up without a full redeploy.
export const revalidate = 60;

export default async function InsightsPage() {
  const blogs = await getAllBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights & Perspectives"
        title="Perspectives on business-first transformation."
        description="Practical thinking on enterprise platforms, operational visibility, and what it actually takes to turn a technology investment into a business outcome."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {insights.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-mw-line p-7 transition hover:border-mw-secondary hover:shadow-lg hover:shadow-mw-secondary/5"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-mw-secondary">
                {post.category}
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-mw-primary">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mw-ink/65">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-mw-ink/50">
                <span>{post.readTime}</span>
                <span className="font-semibold text-mw-secondary opacity-0 transition group-hover:opacity-100">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-mw-line pt-16">
          <h2 className="font-display text-2xl font-bold text-mw-primary">Blogs</h2>

          {blogs.length === 0 ? (
            <p className="mt-8 text-sm text-mw-ink/50">
              No blog posts yet — add one in the{" "}
              <Link href="/studio" className="text-mw-secondary hover:underline">
                Studio
              </Link>
              .
            </p>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {blogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-mw-line transition hover:border-mw-secondary hover:shadow-lg hover:shadow-mw-secondary/5"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(340).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="font-display text-xl font-bold text-mw-primary">{post.title}</h2>
                    <div className="mt-6 flex items-center justify-between text-xs text-mw-ink/50">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-mw-secondary opacity-0 transition group-hover:opacity-100">
                        Read &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
