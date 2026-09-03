import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { CtaBand, Eyebrow, Section } from "@/components/ui";
import { insights } from "@/lib/site-data";
import { getAllBlogSlugs, getBlogPostBySlug, getAllBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const blogSlugs = await getAllBlogSlugs();
  const insightSlugs = insights.map((p) => p.slug);
  return [...insightSlugs, ...blogSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const insight = insights.find((p) => p.slug === slug);
  if (insight) return { title: insight.title, description: insight.excerpt };

  const blogPost = await getBlogPostBySlug(slug);
  if (blogPost) return { title: blogPost.title };

  return {};
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try the hardcoded Insights first, then fall back to Sanity blog posts —
  // the two live in the same /insights/<slug> URL space.
  const insight = insights.find((p) => p.slug === slug);
  const blogPost = insight ? null : await getBlogPostBySlug(slug);

  if (!insight && !blogPost) notFound();

  const moreInsights = insights.filter((p) => p.slug !== slug).slice(0, 2);
  const otherBlogs = blogPost ? (await getAllBlogPosts()).filter((p) => p.slug !== slug).slice(0, 2) : [];

  return (
    <>
      <section className="mw-dark-section mw-glow-grid relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          <Link href="/insights" className="text-sm font-semibold text-mw-mint hover:text-white">
            &larr; Insights &amp; Perspectives
          </Link>
          {insight ? (
            <>
              <Eyebrow>{insight.category}</Eyebrow>
              <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">{insight.title}</h1>
              <p className="mt-4 text-sm text-white/50">{insight.readTime}</p>
            </>
          ) : (
            blogPost && (
              <>
                <Eyebrow>Blog</Eyebrow>
                <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">{blogPost.title}</h1>
                <p className="mt-4 text-sm text-white/50">
                  {new Date(blogPost.publishedAt).toLocaleDateString()}
                </p>
              </>
            )
          )}
        </div>
      </section>

      <Section className="max-w-3xl">
        {insight ? (
          <div className="space-y-5 text-lg leading-relaxed text-mw-ink/75">
            {insight.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          blogPost && (
            <>
              <div className="relative mb-10 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
                <Image
                  src={urlFor(blogPost.coverImage).width(1200).height(800).url()}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="prose prose-lg max-w-none text-mw-ink/75 prose-headings:font-display prose-headings:text-mw-primary prose-a:text-mw-secondary">
                <PortableText value={blogPost.content} />
              </div>
            </>
          )
        )}
      </Section>

      {insight && moreInsights.length > 0 && (
        <section className="border-t border-mw-line bg-mw-paper">
          <Section>
            <h2 className="font-display text-2xl font-bold text-mw-primary">More perspectives</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {moreInsights.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="rounded-2xl border border-mw-line bg-white p-6 transition hover:border-mw-secondary"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-mw-secondary">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-mw-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-mw-ink/65">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      )}

      {blogPost && otherBlogs.length > 0 && (
        <section className="border-t border-mw-line bg-mw-paper">
          <Section>
            <h2 className="font-display text-2xl font-bold text-mw-primary">More from the blog</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherBlogs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="overflow-hidden rounded-2xl border border-mw-line bg-white transition hover:border-mw-secondary"
                >
                  <div className="relative h-32 w-full">
                    <Image src={urlFor(p.coverImage).width(500).height(260).url()} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-mw-primary">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      )}

      <CtaBand />
    </>
  );
}
