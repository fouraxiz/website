import Image from "next/image";
import { Boxes, Code2, Globe2 } from "lucide-react";
import { TextLink } from "@/components/ui/Button";
import { clients } from "@/data/clients";
import { offices } from "@/data/site";

const roles = [
  {
    icon: Boxes,
    title: "Product company",
    text: "We build and evolve our own business software — the 4axiz ERP platform and products such as 4axiz POS and 4axiz School Management.",
  },
  {
    icon: Code2,
    title: "Engineering partner",
    text: "We design, build and support custom systems, web platforms, mobile apps and AI integrations for organisations with specific needs.",
  },
  {
    icon: Globe2,
    title: "International team",
    text: `With offices in ${offices.map((o) => o.country).join(", ").replace(/, ([^,]*)$/, " and $1")}, we work with clients across markets and time zones.`,
  },
];

export function Intro() {
  return (
    <section className="border-y border-ink-100 bg-white py-20 sm:py-24" aria-labelledby="intro-heading">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 id="intro-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.5rem]">
              A technology partner for organisations that want to run better.
            </h2>
            <TextLink href="/about" className="mt-6">
              About 4axiz
            </TextLink>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {roles.map(({ icon: I, title, text }) => (
              <li key={title} className="border-t-2 border-brand-600 pt-5">
                <I className="size-5 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {clients.length > 0 && (
          <div className="mt-16 border-t border-ink-100 pt-10">
            <p className="text-center text-sm font-medium text-ink-400">Trusted by organisations including</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {clients.map((c) => (
                <li key={c.name}>
                  <Image
                    src={c.logo.src}
                    alt={c.name}
                    width={c.logo.width}
                    height={c.logo.height}
                    className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
