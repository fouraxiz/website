import { Mail, MapPin, Phone } from "lucide-react";
import { getOffices, getSettings } from "@/lib/cms/content";

export async function TopBar() {
  const [site, offices] = await Promise.all([getSettings(), getOffices()]);
  return (
    <div className="hidden bg-ink-950 text-[0.8rem] text-ink-300 md:block">
      <div className="container-site flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="size-3.5 text-brand-400" aria-hidden="true" />
              {site.phone}
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="size-3.5 text-brand-400" aria-hidden="true" />
              {site.email}
            </a>
          )}
        </div>
        <div className="flex items-center gap-6">
          {site.topbarLocation && (
            <span className="hidden items-center gap-2 lg:inline-flex">
              <MapPin className="size-3.5 text-brand-400" aria-hidden="true" />
              {site.topbarLocation}
            </span>
          )}
          <span className="text-ink-400">{offices.map((o) => o.country).join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
