"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { AiVisual, AppsVisual, ErpVisual } from "@/components/visuals/SlideVisuals";
import { cn } from "@/lib/utils";

const slides = [
  {
    key: "erp",
    eyebrow: "4axiz ERP",
    title: ["Run your entire business on", "one connected platform"],
    text: "Accounting, HRM & payroll, procurement, inventory, POS and reporting — modular ERP configured to the way your organisation works.",
    primary: { label: "Explore ERP", href: "/solutions/erp" },
    secondary: { label: "Book a demo", href: "/contact?interest=erp" },
    Visual: ErpVisual,
    glow: "from-sky-200/70 via-violet-200/50",
  },
  {
    key: "ai",
    eyebrow: "AI & Automation",
    title: ["Put practical AI", "to work in your business"],
    text: "AI assistants, intelligent document processing and predictive insight — integrated securely into the systems your teams already use.",
    primary: { label: "Explore AI solutions", href: "/solutions/ai" },
    secondary: { label: "Talk to an expert", href: "/contact?interest=ai" },
    Visual: AiVisual,
    glow: "from-violet-200/70 via-fuchsia-200/40",
  },
  {
    key: "apps",
    eyebrow: "Web & Mobile Development",
    title: ["Top-notch software,", "built with modern technology"],
    text: "Custom web applications, mobile apps and e-commerce platforms — designed, built and supported by one experienced team since 2010.",
    primary: { label: "Our services", href: "/services" },
    secondary: { label: "View projects", href: "/projects" },
    Visual: AppsVisual,
    glow: "from-emerald-200/60 via-sky-200/50",
  },
];

const INTERVAL = 7000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || hovered || reduce) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, hovered, reduce, go]);

  const s = slides[index];
  const Visual = s.Visual;

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
      <div className={cn("pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-gradient-to-br to-transparent blur-3xl transition-all duration-700", s.glow)} aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-12rem] left-[-8rem] size-[28rem] rounded-full bg-brand-100/60 blur-3xl" aria-hidden="true" />
      <svg className="pointer-events-none absolute bottom-0 left-0 w-full text-white" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
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
            className="grid min-h-[30rem] items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10"
          >
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-ink-200">
                <span className="size-2 rounded-full bg-brand-500" aria-hidden="true" />
                {s.eyebrow}
              </p>
              <h2 className="mt-6 text-[2.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-ink-950 sm:text-[3.4rem] lg:text-[3.6rem]">
                {s.title[0]} <span className="bg-gradient-to-r from-brand-500 to-rose-500 bg-clip-text text-transparent">{s.title[1]}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-600">{s.text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={s.primary.href} className={buttonClasses("primary", "lg")}>
                  {s.primary.label} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href={s.secondary.href} className={buttonClasses("secondary", "lg")}>
                  {s.secondary.label}
                </Link>
              </div>
            </div>
            <div className="px-4 sm:px-8 lg:px-0">
              <Visual />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex items-center gap-4 lg:mt-6">
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
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-10 bg-brand-500" : "w-4 bg-ink-300 group-hover:bg-ink-400",
                  )}
                />
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
      </div>
    </section>
  );
}
