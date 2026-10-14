import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Office } from "@/types";

const flags: Record<string, string> = { BD: "🇧🇩", NZ: "🇳🇿", XK: "🇽🇰", US: "🇺🇸" };

/** Office cards — each office shows only its own verified details. */
export function OfficeCards({ offices, inverse = false }: { offices: Office[]; inverse?: boolean }) {
  return (
    <ul className={cn("grid gap-5", offices.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3")}>
      {offices.map((o) => {
        const hasDetails = Boolean(o.address || o.phone || o.email);
        return (
          <li
            key={o.id}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-shadow",
              inverse ? "border-white/10 bg-white/[0.04]" : "border-ink-200 bg-white hover:shadow-[var(--shadow-lift)]",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none" aria-hidden="true">
                {flags[o.countryCode] ?? "📍"}
              </span>
              <div>
                <h3 className={cn("text-lg font-semibold", inverse && "text-white")}>{o.country}</h3>
                <p className={cn("text-xs", inverse ? "text-ink-400" : "text-ink-500")}>
                  {o.city ? `${o.city} · ` : ""}
                  {o.timezone}
                </p>
              </div>
            </div>
            {o.role && (
              <p className={cn("mt-4 inline-flex self-start rounded-full px-2.5 py-1 text-xs font-semibold", inverse ? "bg-white/10 text-brand-200" : "bg-brand-50 text-brand-700")}>
                {o.role}
              </p>
            )}
            {hasDetails ? (
              <dl className={cn("mt-6 space-y-3 text-sm", inverse ? "text-ink-300" : "text-ink-600")}>
                {o.address && (
                  <div className="flex gap-3">
                    <dt>
                      <MapPin className="mt-0.5 size-4 text-brand-500" aria-hidden="true" />
                      <span className="sr-only">Address</span>
                    </dt>
                    <dd>
                      <address className="not-italic">{o.address}</address>
                    </dd>
                  </div>
                )}
                {o.phone && (
                  <div className="flex gap-3">
                    <dt>
                      <Phone className="mt-0.5 size-4 text-brand-500" aria-hidden="true" />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="hover:text-brand-500">
                        {o.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {o.email && (
                  <div className="flex gap-3">
                    <dt>
                      <Mail className="mt-0.5 size-4 text-brand-500" aria-hidden="true" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd>
                      <a href={`mailto:${o.email}`} className="hover:text-brand-500">
                        {o.email}
                      </a>
                    </dd>
                  </div>
                )}
                {o.hours && (
                  <div className="flex gap-3">
                    <dt>
                      <Clock className="mt-0.5 size-4 text-brand-500" aria-hidden="true" />
                      <span className="sr-only">Business hours</span>
                    </dt>
                    <dd>{o.hours}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className={cn("mt-6 text-sm leading-relaxed", inverse ? "text-ink-400" : "text-ink-500")}>
                Serving clients in {o.country}. Contact our team through the hotline or contact form and we&apos;ll connect you.
              </p>
            )}
            {o.mapUrl && (
              <a
                href={o.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Get directions <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
