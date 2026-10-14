import { ButtonLink } from "@/components/ui/Button";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { getPosts, type SectionEntry } from "@/lib/cms/content";

/** Latest blog posts — renders only when posts exist. */
export async function BlogSection({ copy }: { copy: SectionEntry }) {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="blog-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={copy.eyebrow ?? undefined} id="blog-heading" title={<CopyTitle title={copy.title} highlight={copy.highlight} />} description={copy.description ?? undefined} />
          <ButtonLink href="/blog" variant="secondary" arrow>
            All articles
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p._id}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
