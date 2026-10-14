"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { AiVisual, AppsVisual, ErpVisual } from "@/components/visuals/SlideVisuals";
import { cn } from "@/lib/utils";
import type { Slide } from "@/data/slides";
import Image from "next/image";

const visuals = { erp: ErpVisual, ai: AiVisual, apps: AppsVisual } as const;
const glows: Record<string, string> = {
  erp: "from-sky-200/70 via-violet-200/50",
  ai: "from-violet-200/70 via-fuchsia-200/40",
  apps: "from-emerald-200/60 via-sky-200/50",
  image: "from-amber-200/60 via-rose-200/40",
};

const INTERVAL = 7000;

export function HeroSlider({ slides: input, trust }: { slides: (Slide & { _id?: string; _status?: string })[]; trust?: React.ReactNode }) {
  const slides = input.map((sl, i) => ({ ...sl, key: sl._id ?? String(i) }));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const count = slides.length;
  const go = useCallback((i: number) => setIndex(count ? (i + count) % count : 0), [count]);

  useEffect(() => {
    if (paused || hovered || reduce || count < 2) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, hovered, reduce, go, count]);

  if (count === 0) return null;
  const s = slides[Math.min(index, count - 1)];
  const Visual = s.visual !== "image" ? visuals[s.visual] ?? ErpVisual : null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* Decorative background */}
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className={cn(
          "pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-gradient-to-br to-transparent blur-3xl transition-all duration-700",
          glows[s.visual] ?? glows.erp,
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-12rem] left-[-8rem] size-[30rem] rounded-full bg-brand-100/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-[38%] size-[18rem] rounded-full bg-amber-100/60 blur-3xl"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute top-24 right-[4%] hidden size-40 text-ink-300/70 xl:block"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {Array.from({ length: 49 }).map((_, i) => (
          <circle key={i} cx={6 + (i % 7) * 14.6} cy={6 + Math.floor(i / 7) * 14.6} r="1.8" fill="currentColor" />
        ))}
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80C240 120 480 120 720 90C960 60 1200 20 1440 40V120H0Z" fill="currentColor" />
      </svg>

      <h1 className="sr-only">4axiz IT Limited — ERP, AI and custom software development company</h1>
      <div className="container-site relative pt-12 pb-28 sm:pt-16 lg:pt-20 lg:pb-36">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${s.eyebrow}`}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid min-h-[32rem] items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
          >
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-ink-200">
                <span className="size-2 rounded-full bg-brand-500" aria-hidden="true" />
                {s.eyebrow}
              </p>
              <h2 className="mt-6 text-[2.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-ink-950 sm:text-[3.4rem] lg:text-[3.6rem]">
                {s.title}{" "}
                {s.highlight && <span className="bg-gradient-to-r from-brand-500 to-rose-500 bg-clip-text text-transparent">{s.highlight}</span>}
              </h2>
              {s.text && <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-600">{s.text}</p>}
              <div className="mt-9 flex flex-wrap gap-3">
                {s.primaryLabel && s.primaryHref && (
                  <Link href={s.primaryHref} className={buttonClasses("primary", "lg")}>
                    {s.primaryLabel} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
                {s.secondaryLabel && s.secondaryHref && (
                  <Link href={s.secondaryHref} className={buttonClasses("secondary", "lg")}>
                    {s.secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
            <div className="px-4 sm:px-8 lg:px-0">
              {Visual ? (
                <Visual />
              ) : s.image ? (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-[40rem] overflow-hidden rounded-2xl shadow-[0_40px_90px_-30px_rgb(18_21_23/0.35)] ring-1 ring-ink-200/70">
                  <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority unoptimized />
                </div>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 lg:mt-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white text-ink-700 shadow-sm ring-1 ring-ink-200 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
                <span className="sr-only">Previous slide</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white text-ink-700 shadow-sm ring-1 ring-ink-200 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
                <span className="sr-only">Next slide</span>
              </button>
            </div>
            <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
              {slides.map((sl, i) => (
                <button
                  key={sl.key}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? "true" : undefined}
                  className="group relative h-2.5 py-3"
                >
                  <span className="sr-only">
                    Slide {i + 1}: {sl.eyebrow}
                  </span>
                  <span
                    className={cn(
                      "relative block h-1.5 overflow-hidden rounded-full transition-all duration-300",
                      i === index ? "w-12 bg-brand-100" : "w-4 bg-ink-300 group-hover:bg-ink-400",
                    )}
                  >
                    {i === index && (
                      <span
                        key={`${index}-${paused || hovered || reduce ? "p" : "r"}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                        style={
                          paused || hovered || reduce ? { width: "100%" } : { animation: `hero-progress ${INTERVAL}ms linear forwards` }
                        }
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="ml-1 inline-flex size-9 items-center justify-center rounded-full text-ink-500 hover:bg-white hover:text-ink-900"
              >
                {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                <span className="sr-only">{paused ? "Play slideshow" : "Pause slideshow"}</span>
              </button>
            )}
          </div>
          {trust}
        </div>
      </div>
    </section>
  );
}
