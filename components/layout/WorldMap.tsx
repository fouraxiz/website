import Image from "next/image";
import type { Office } from "@/types";

/*
 * Dotted world map (public/images/world-dots.svg, generated with dotted-map) with a
 * pin for every office that has latitude/longitude set. The constants convert
 * coordinates to the map's viewBox (-1 -1 127.5 61).
 */
const VIEW = { x: -1, y: -1, w: 127.5, h: 61 };
const project = (lat: number, lng: number) => {
  const x = 63.01 + 0.352 * lng;
  const y = 35.63 - 0.4173 * lat;
  return { left: ((x - VIEW.x) / VIEW.w) * 100, top: ((y - VIEW.y) / VIEW.h) * 100 };
};

export function WorldMap({ offices }: { offices: Office[] }) {
  const pins = offices.filter((o): o is Office & { lat: number; lng: number } => typeof o.lat === "number" && typeof o.lng === "number");
  return (
    <div className="relative mx-auto aspect-[127.5/61] w-full">
      <Image src="/images/world-dots.svg" alt="" fill className="pointer-events-none opacity-[0.16] select-none" unoptimized aria-hidden="true" />
      <ul aria-label="Our offices on the world map">
        {pins.map((o, i) => {
          const { left, top } = project(o.lat, o.lng);
          const labelLeft = left > 70;
          return (
            <li key={o.id} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
              <span className="absolute -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-brand-500/40" style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2.4s" }} aria-hidden="true" />
                <span className="relative block size-3 rounded-full bg-brand-500 ring-4 ring-brand-500/25" aria-hidden="true" />
              </span>
              <span
                className={`absolute top-0 hidden -translate-y-1/2 rounded-lg bg-white/95 sm:block px-2.5 py-1 text-[0.7rem] leading-tight font-semibold whitespace-nowrap text-ink-900 shadow-lg ${labelLeft ? "right-3" : "left-3"}`}
              >
                {o.country}
                {o.city && <span className="block font-normal text-ink-500">{o.city}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
