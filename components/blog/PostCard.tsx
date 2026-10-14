import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import type { Post } from "@/lib/cms/content";

export function formatDate(d: string | null) {
  if (!d) return null;
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function PostCard({ post, headingLevel = "h3" }: { post: Post & { _status?: string }; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-ink-100 via-ink-50 to-brand-50">
        {post.cover ? (
          <Image src={post.cover} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
        ) : (
          <div className="flex size-full items-center justify-center text-ink-400" aria-hidden="true">
            <Newspaper className="size-10" strokeWidth={1.5} />
          </div>
        )}
        {post._status === "draft" && <span className="absolute top-3 left-3 rounded-md bg-amber-400 px-2 py-0.5 text-xs font-bold text-ink-900">Draft</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-medium text-ink-500">
          {post.category && <span className="rounded-md bg-brand-50 px-2 py-0.5 text-brand-700">{post.category}</span>}
          {formatDate(post.publishedAt)}
        </p>
        <H className="mt-3 text-lg leading-snug font-semibold">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Read article <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
