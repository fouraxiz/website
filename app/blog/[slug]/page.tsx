import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { Markdown } from "@/components/blog/Markdown";
import { PostCard, formatDate } from "@/components/blog/PostCard";
import { Edit } from "@/components/cms/Edit";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { bySlug, getPosts, getSettings } from "@/lib/cms/content";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(await getPosts(), slug);
  if (!p) return {};
  const meta = pageMetadata({ title: p.title, description: p.seoDescription ?? p.excerpt, path: `/blog/${p.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", ...(p.cover ? { images: [p.cover] } : {}) } };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  const post = bySlug(posts, slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const date = formatDate(post.publishedAt);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
          ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
          publisher: { "@type": "Organization", name: settings.legalName },
          ...(post.cover ? { image: new URL(post.cover, settings.url).toString() } : {}),
          mainEntityOfPage: new URL(`/blog/${post.slug}`, settings.url).toString(),
        }}
      />
      <Edit
        actions={[
          { label: "Edit this post", collection: "posts", slug: post.slug },
          { label: "New post", collection: "posts", create: true },
        ]}
      >
        <article>
          <header className="relative overflow-hidden bg-ink-50">
            <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="container-site relative pt-10 pb-12">
              <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
              <div className="mx-auto mt-10 max-w-3xl text-center">
                {post._status === "draft" && <p className="mb-4 inline-block rounded-md bg-amber-400 px-2.5 py-1 text-xs font-bold text-ink-900">Draft — not public</p>}
                {post.category && <p className="eyebrow justify-center">{post.category}</p>}
                <h1 className="mt-4 text-4xl leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>
                <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-500">
                  {post.author && (
                    <span className="inline-flex items-center gap-1.5">
                      <UserRound className="size-4" aria-hidden="true" /> {post.author}
                    </span>
                  )}
                  {date && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" aria-hidden="true" /> <time dateTime={post.publishedAt ?? undefined}>{date}</time>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </header>
          {post.cover && (
            <div className="container-site -mb-4 pt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" className="mx-auto aspect-[2/1] w-full max-w-5xl rounded-3xl object-cover shadow-[var(--shadow-lift)]" />
            </div>
          )}
          <div className="container-site py-14 sm:py-20">
            <Markdown source={post.body} className="article-body mx-auto max-w-3xl" />
            {post.tags.length > 0 && (
              <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-2 border-t border-ink-200 pt-6">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700">
                    #{t}
                  </li>
                ))}
              </ul>
            )}
            <div className="mx-auto mt-10 max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                <ArrowLeft className="size-4" aria-hidden="true" /> All articles
              </Link>
            </div>
          </div>
        </article>
      </Edit>
      {more.length > 0 && (
        <section className="bg-ink-50 py-16 sm:py-20" aria-labelledby="more-posts">
          <div className="container-site">
            <h2 id="more-posts" className="text-2xl font-bold tracking-tight">
              More articles
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p._id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
