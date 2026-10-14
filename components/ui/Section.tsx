import { cn } from "@/lib/utils";

type Tone = "white" | "muted" | "dark" | "brand";

const tones: Record<Tone, string> = {
  white: "bg-white",
  muted: "bg-ink-50",
  dark: "bg-ink-950 text-ink-300",
  brand: "bg-brand-700 text-brand-100",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-24", tones[tone], className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  inverse = false,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", align === "center" && "justify-center", inverse && "text-brand-300")}>
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-3xl leading-[1.18] font-bold tracking-tight text-balance sm:text-[2.6rem]",
          inverse ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("mt-4 text-lg leading-relaxed text-pretty", inverse ? "text-ink-300" : "text-ink-500")}>{description}</p>
      )}
    </div>
  );
}

/** Highlighted word in a heading, e.g. "Who <Hl>We Are</Hl>". */
export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-brand-500">{children}</span>;
}
