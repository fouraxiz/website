import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Tbc } from "@/components/ui/PlaceholderNote";
import { cn } from "@/lib/utils";
import type { Office } from "@/types";

/** Office cards — each office renders only its own verified details. */
export function OfficeCards({ offices, inverse = false }: { offices: Office[]; inverse?: boolean }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {offices.map((o) => (
        <li
          key={o.id}
          className={cn(
            "flex flex-col rounded-[var(--radius-card)] border p-6",
            inverse ? "border-white/10 bg-white/[0.03]" : "border-ink-200 bg-white",
          )}
        >
          <div className="flex items-center justify-between">
            <span className={cn("font-display text-xs font-semibold tracking-[0.14em]", inverse ? "text-brand-300" : "text-brand-600")}>
              {o.countryCode}
            </span>
            <span className={cn("text-xs", inverse ? "text-ink-400" : "text-ink-400")}>{o.timezone}</span>
          </div>
          <h3 className={cn("mt-3 text-xl font-semibold", inverse && "text-white")}>{o.country}</h3>
          {o.role && <p className={cn("text-sm", inverse ? "text-ink-400" : "text-ink-500")}>{o.role}</p>}
          <dl className={cn("mt-5 space-y-3 text-sm", inverse ? "text-ink-300" : "text-ink-600")}>
            <div className="flex gap-3">
              <dt>
                <MapPin className="mt-0.5 size-4 text-ink-400" aria-hidden="true" />
                <span className="sr-only">Address</span>
              </dt>
              <dd>{o.address ? <address className="not-italic">{o.address}</address> : o.city ?? <Tbc label="Address to be confirmed" />}</dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Phone className="mt-0.5 size-4 text-ink-400" aria-hidden="true" />
                <span className="sr-only">Phone</span>
              </dt>
              <dd>{o.phone ? <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="hover:text-brand-600">{o.phone}</a> : <Tbc />}</dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Mail className="mt-0.5 size-4 text-ink-400" aria-hidden="true" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>{o.email ? <a href={`mailto:${o.email}`} className="hover:text-brand-600">{o.email}</a> : <Tbc />}</dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Clock className="mt-0.5 size-4 text-ink-400" aria-hidden="true" />
                <span className="sr-only">Business hours</span>
              </dt>
              <dd>{o.hours ?? <Tbc />}</dd>
            </div>
          </dl>
          {o.mapUrl && (
            <a
              href={o.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Get directions <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
