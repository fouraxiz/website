"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { erpNavLinks, mainNav } from "@/data/navigation";
import type { NavItem } from "@/types";

function isActive(pathname: string, item: NavItem) {
  if (item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))) return true;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus whenever the route changes.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200",
          scrolled || mobileOpen
            ? "border-ink-200/80 bg-white/90 shadow-[0_1px_0_rgb(18_23_38/0.02)] backdrop-blur-lg"
            : "border-transparent bg-white/70 backdrop-blur",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
        >
          Skip to content
        </a>
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Logo />

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    active={isActive(pathname, item)}
                    open={open === item.label}
                    setOpen={(v) => setOpen(v ? item.label : null)}
                  />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item) ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                        isActive(pathname, item) ? "text-brand-700" : "text-ink-600 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className={buttonClasses("primary", "sm", "hidden sm:inline-flex")}>
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      <MobileNav open={mobileOpen} pathname={pathname} />
    </>
  );
}

function DesktopDropdown({
  item,
  active,
  open,
  setOpen,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSolutions = item.label === "Solutions";

  const enter = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }, [setOpen]);
  const leave = useCallback(() => {
    timer.current = setTimeout(() => setOpen(false), 140);
  }, [setOpen]);

  return (
    <li
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors",
          active || open ? "text-brand-700" : "text-ink-600 hover:text-ink-900",
        )}
      >
        {item.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn("absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3", isSolutions ? "w-[44rem]" : "w-[22rem]")}
          >
            <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[var(--shadow-lift)]">
              <div className={cn("grid", isSolutions && "grid-cols-[1fr_15rem]")}>
                <ul className="p-2">
                  {item.children!.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-ink-50">
                        {c.icon && (
                          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100 ring-inset [&_svg]:size-4">
                            <Icon name={c.icon} />
                          </span>
                        )}
                        <span>
                          <span className="block text-sm font-semibold text-ink-900 group-hover:text-brand-700">{c.label}</span>
                          {c.description && <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-500">{c.description}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {isSolutions && (
                  <div className="border-l border-ink-100 bg-ink-50/70 p-5">
                    <p className="text-xs font-semibold tracking-[0.12em] text-ink-400 uppercase">ERP modules</p>
                    <ul className="mt-3 space-y-0.5">
                      {erpNavLinks.map((m) => (
                        <li key={m.href}>
                          <Link
                            href={m.href}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-600 hover:bg-white hover:text-brand-700"
                          >
                            {m.icon && <Icon name={m.icon} className="size-3.5 text-ink-400" />}
                            {m.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/solutions/erp"
                      className="mt-3 inline-flex items-center gap-1 px-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      All modules <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
              {isSolutions && (
                <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-sm">
                  <span className="text-ink-500">Not sure where to start?</span>
                  <Link href="/solutions" className="font-semibold text-brand-700 hover:text-brand-800">
                    Explore all solutions
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileNav({ open, pathname }: { open: boolean; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-ink-200 bg-white lg:hidden"
        >
          <ul className="container-site divide-y divide-ink-100 py-2">
            <li>
              <Link href="/" className={cn("block py-3.5 text-base font-semibold", pathname === "/" ? "text-brand-700" : "text-ink-900")}>
                Home
              </Link>
            </li>
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3.5 text-left text-base font-semibold text-ink-900"
                    aria-expanded={expanded === item.label}
                    aria-controls={`m-${item.label}`}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-5 text-ink-400 transition-transform", expanded === item.label && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded === item.label && (
                    <ul id={`m-${item.label}`} className="space-y-1 pb-4">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.95rem]",
                              pathname === c.href ? "bg-brand-50 text-brand-700" : "text-ink-600",
                            )}
                          >
                            {c.icon && <Icon name={c.icon} className="size-4 text-brand-600" />}
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item) ? "page" : undefined}
                    className={cn("block py-3.5 text-base font-semibold", isActive(pathname, item) ? "text-brand-700" : "text-ink-900")}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="container-site pt-2 pb-10">
            <Link href="/contact" className={buttonClasses("primary", "lg", "w-full")}>
              Book a Consultation
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
