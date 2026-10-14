import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { getNav, getOffices, getProducts, getServices, getSettings } from "@/lib/cms/content";

export async function Footer() {
  const [site, offices, products, services, nav] = await Promise.all([getSettings(), getOffices(), getProducts(), getServices(), getNav()]);
  const socialLinks = site.socials;
  const year = new Date().getFullYear();
  const hq = offices[0];
  const productNames = products.filter((p) => p.kind !== "erp-module").map((p) => p.name);
  const solutionLinks = nav.find((n) => n.menu === "solutions")?.children ?? [];
  const columns = [
  { title: "Solutions", links: solutionLinks.map((l) => ({ label: l.label, href: l.href })) },
  {
    title: "Services",
    links: services.slice(0, 7).map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Projects", href: "/projects" },
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];


  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-400" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <svg className="pointer-events-none absolute inset-0 size-full text-white/[0.035]" aria-hidden="true">
        <defs>
          <pattern id="footer-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-dots)" />
      </svg>
      <div className="absolute -top-40 left-1/4 size-96 rounded-full bg-accent-600/15 blur-3xl" aria-hidden="true" />

      <div className="container-site relative pt-16 pb-10 sm:pt-20">
        {/* Contact strip */}
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3 sm:p-8">
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-400">Phone / WhatsApp</span>
                <span className="block font-semibold text-white group-hover:text-brand-300">{site.phone}</span>
              </span>
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-500 text-white">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-400">Email us</span>
                <span className="block font-semibold text-white group-hover:text-brand-300">{site.email}</span>
              </span>
            </a>
          )}
          <Link href="/contact#offices" className="group flex items-center gap-4">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-500 text-white">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs text-ink-400">Visit us</span>
              <span className="block font-semibold text-white group-hover:text-brand-300">
                {site.topbarLocation ?? hq?.city ?? hq?.country}
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo inverse />
            {site.coverLine && <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-brand-300 uppercase">{site.coverLine}</p>}
            <p className="mt-3 text-sm leading-relaxed">
              {site.legalName} builds enterprise software, ERP, MIS &amp; MEAL platforms, mobile apps and AI for government, UN agencies, NGOs,
              INGOs and corporate enterprises{site.foundedYear ? ` — since ${site.foundedYear}` : ""}.
            </p>
            <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">Our products</p>
            <p className="mt-2 text-sm text-ink-300">{productNames.join(" · ")}</p>
            <div className="mt-6">
              <SocialIcons links={socialLinks} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white">
                        <ArrowRight className="size-3 -translate-x-1 text-brand-400 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {offices.map((o) => (
              <li key={o.id} className="flex items-center gap-2">
                <MapPin className="size-3.5 text-brand-400" aria-hidden="true" />
                <span className="font-medium text-ink-200">{o.country}</span>
                {o.address && <span className="hidden text-ink-500 md:inline">— {o.address}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            {site.websites && <p className="mb-1 text-ink-500">{site.websites}</p>}
            <p>
              © {site.foundedYear ? `${site.foundedYear}–` : ""}
              {year} {site.legalName}. All rights reserved.
              {site.basisMembership && <span className="text-ink-500"> · BASIS member {site.basisMembership}</span>}
            </p>
          </div>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
