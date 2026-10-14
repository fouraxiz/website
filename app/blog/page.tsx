import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { pageMetadata } from "@/lib/metadata";
import { getPosts, getSection } from "@/lib/cms/content";
import { getSession } from "@/lib/auth/session";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Articles and insights from 4axiz IT Limited on ERP, AI, software development and digital business.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, copy, session] = await Promise.all([getPosts(), getSection("page.blog"), getSession()]);
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.blog" },
          { label: "New post", collection: "posts", create: true },
          { label: "All posts", collection: "posts" },
        ]}
        decor={{ icons: ["file-text", "brain", "boxes", "code", "trending-up"], center: "message-square" }}
        crumbs={[{ label: "Blog" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <Section>
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-300 px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink-900">No articles yet</p>
            <p className="mt-2 text-sm text-ink-500">
              {session ? "Use “New post” above to write the first article." : "Check back soon for news and insights from our team."}
            </p>
          </div>
        ) : (
          <>
            {lead && (
              <div className="mb-10">
                <PostCard post={lead} headingLevel="h2" />
              </div>
            )}
            {rest.length > 0 && (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p._id}>
                    <PostCard post={p} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
