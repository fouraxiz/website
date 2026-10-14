import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";

/** Shared layout for legal documents. */
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} eyebrow="Legal" title={title} description={intro} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <PlaceholderNote className="mb-10">
            Draft for review. This document is a starting template and must be reviewed and approved by 4axiz and its legal counsel —
            including the effective date and jurisdiction — before publication.
          </PlaceholderNote>
          <div className="prose-site">{children}</div>
        </div>
      </Section>
    </>
  );
}
