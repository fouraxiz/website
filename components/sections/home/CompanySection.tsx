import { TeamPhotoPlaceholder } from "@/components/team/TeamPhotoPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { companyValues, mission, vision } from "@/data/site";
import { leadership } from "@/data/team";
import { TeamPortrait } from "@/components/team/TeamPortrait";

export function CompanySection() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="company-heading">
      <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 id="company-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.5rem]">
            People who care about how software makes work feel.
          </h2>
          <dl className="mt-10 space-y-8">
            <div className="border-l-2 border-brand-600 pl-5">
              <dt className="font-display text-sm font-semibold tracking-wide text-ink-900 uppercase">Mission</dt>
              <dd className="mt-2 leading-relaxed text-ink-600">{mission}</dd>
            </div>
            <div className="border-l-2 border-accent-500 pl-5">
              <dt className="font-display text-sm font-semibold tracking-wide text-ink-900 uppercase">Vision</dt>
              <dd className="mt-2 leading-relaxed text-ink-600">{vision}</dd>
            </div>
          </dl>
          <ul className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {companyValues.map((v) => (
              <li key={v.title}>
                <h3 className="text-sm font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          {leadership.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {leadership.slice(0, 4).map((m) => (
                <li key={m.id}>
                  <TeamPortrait member={m} />
                </li>
              ))}
            </ul>
          ) : (
            <TeamPhotoPlaceholder />
          )}
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <ButtonLink href="/team" arrow>
              Meet Our Team
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost">
              About 4axiz
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
