"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, Sparkles, X } from "lucide-react";
import { Logo } from "./Logo";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { MenuKind } from "@/data/navigation";
import type { NavItem, NavLink } from "@/types";

type Item = NavItem & { menu?: MenuKind };

function isActive(pathname: string, item: Item) {
  if (item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))) return true;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header({ nav, erpLinks, phone }: { nav: Item[]; erpLinks: NavLink[]; phone: string | null }) {
  const mainNav = nav;
  const site = { phone };
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    if (mobileOpen && headerRef.current) setPanelTop(Math.max(0, headerRef.current.getBoundingClientRect().bottom));
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-lg transition-shadow duration-200",
          scrolled || mobileOpen ? "border-ink-200/70 shadow-[0_8px_30px_-12px_rgb(18_21_23/0.15)]" : "border-ink-100",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
        >
          Skip to content
        </a>
        <div ref={navRef} className="container-site relative flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {mainNav.map((item) =>
                item.children ? (
                  <DesktopMenu
                    key={item.label}
                    item={item}
                    erpLinks={erpLinks}
                    phone={phone}
                    active={isActive(pathname, item)}
                    open={open === item.label}
                    setOpen={(v) => setOpen(v ? item.label : null)}
                  />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item) ? "page" : undefined}
                      className={cn(navLinkClass, isActive(pathname, item) ? "text-brand-600 after:scale-x-100" : "text-ink-800 hover:text-brand-600")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group hidden items-center gap-2.5 xl:flex">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.7rem] text-ink-500">Hotline 24/7</span>
                  <span className="block text-sm font-semibold text-ink-900">{site.phone}</span>
                </span>
              </a>
            )}
            <Link href="/contact" className={buttonClasses("primary", "md", "hidden sm:inline-flex")}>
              Request a Quote
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg text-ink-800 ring-1 ring-ink-200 hover:bg-ink-50 lg:hidden"
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
      {/* Outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      <MobileNav open={mobileOpen} pathname={pathname} top={panelTop} nav={nav} phone={phone} />
    </>
  );
}

const navLinkClass =
  "relative inline-flex h-20 items-center gap-1 px-3.5 text-[0.92rem] font-semibold transition-colors after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-t-full after:bg-brand-500 after:transition-transform hover:after:scale-x-100";

function DesktopMenu({
  item,
  active,
  open,
  setOpen,
  erpLinks,
  phone,
}: {
  item: Item;
  active: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  erpLinks: NavLink[];
  phone: string | null;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mega = item.menu === "solutions" || item.menu === "services";

  const enter = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }, [setOpen]);
  const leave = useCallback(() => {
    timer.current = setTimeout(() => setOpen(false), 150);
  }, [setOpen]);

  return (
    <li
      className={mega ? "static" : "relative"}
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
        className={cn(navLinkClass, active || open ? "text-brand-600 after:scale-x-100" : "text-ink-800 hover:text-brand-600")}
      >
        {item.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn("absolute top-full z-50", mega ? "inset-x-4 sm:inset-x-6 lg:inset-x-8" : "left-1/2 w-[24rem] -translate-x-1/2")}
          >
            <div className="overflow-hidden rounded-b-2xl border border-t-0 border-ink-200 bg-white shadow-[0_30px_60px_-20px_rgb(18_21_23/0.3)]">
              <div className="h-[3px] bg-gradient-to-r from-brand-500 via-brand-400 to-ink-400" aria-hidden="true" />
              {item.menu === "solutions" && <SolutionsMenu links={item.children!} erpLinks={erpLinks} />}
              {item.menu === "services" && <ServicesMenu links={item.children!} />}
              {(item.menu === "products" || item.menu === "company" || !item.menu) && (
                <SimpleMenu links={item.children!} footer={item.menu ?? "products"} phone={phone} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MenuLink({ link, index, compact = false }: { link: NavLink; index: number; compact?: boolean }) {
  const h = hues[hueAt(index)];
  return (
    <Link href={link.href} className="group flex gap-3.5 rounded-xl p-3 transition-colors hover:bg-ink-50">
      {link.icon && (
        <span
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform group-hover:scale-105 [&_svg]:size-[1.15rem]",
            h.soft,
            h.text,
            h.ring,
          )}
        >
          <Icon name={link.icon} />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink-900 group-hover:text-brand-600">{link.label}</span>
        {link.description && !compact && <span className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug text-ink-500">{link.description}</span>}
      </span>
    </Link>
  );
}

function SolutionsMenu({ links, erpLinks }: { links: NavLink[]; erpLinks: NavLink[] }) {
  return (
    <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr]">
      <div className="p-5">
        <p className="px-3 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">Solutions</p>
        <ul className="mt-2 grid gap-0.5">
          {links.map((l, i) => (
            <li key={l.href}>
              <MenuLink link={l} index={i} />
            </li>
          ))}
        </ul>
      </div>
      <div className="border-x border-ink-100 bg-ink-50/60 p-5">
        <p className="px-3 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">ERP modules</p>
        <ul className="mt-2 grid grid-cols-2 gap-0.5">
          {erpLinks.map((m, i) => (
            <li key={m.href}>
              <Link href={m.href} className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-white hover:text-brand-600">
                {m.icon && <Icon name={m.icon} className={cn("size-4", hues[hueAt(i + 2)].text)} />}
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink-950 p-6">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-accent-500/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
            <Sparkles className="size-3.5 text-brand-300" aria-hidden="true" /> 4axiz ERP
          </span>
          <p className="relative mt-4 font-display text-lg leading-snug font-semibold text-white">Run your whole business on one connected platform.</p>
          <p className="relative mt-2 text-sm text-ink-300">Finance, HR, procurement, inventory and reporting — together.</p>
          <Link href="/contact?interest=erp" className={buttonClasses("primary", "sm", "relative mt-auto w-fit")}>
            Book a demo <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServicesMenu({ links }: { links: NavLink[] }) {
  return (
    <div className="grid grid-cols-[3fr_1fr]">
      <ul className="grid grid-cols-3 gap-0.5 p-5">
        {links.map((l, i) => (
          <li key={l.href}>
            <MenuLink link={l} index={i} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between border-l border-ink-100 bg-ink-50/60 p-6">
        <div>
          <p className="font-display text-lg font-semibold text-ink-900">Not sure where to start?</p>
          <p className="mt-2 text-sm text-ink-500">Tell us the problem — we&apos;ll recommend the right mix of services.</p>
        </div>
        <div className="space-y-2">
          <Link href="/services" className={buttonClasses("secondary", "sm", "w-full")}>
            All services
          </Link>
          <Link href="/contact" className={buttonClasses("primary", "sm", "w-full")}>
            Talk to an expert
          </Link>
        </div>
      </div>
    </div>
  );
}

function SimpleMenu({ links, footer, phone }: { links: NavLink[]; footer: MenuKind; phone: string | null }) {
  const site = { phone };
  return (
    <>
      <ul className="grid gap-0.5 p-3">
        {links.map((l, i) => (
          <li key={l.href}>
            <MenuLink link={l} index={i + (footer === "company" ? 3 : 0)} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-5 py-3 text-sm">
        {footer === "products" ? (
          <>
            <span className="text-ink-500">Including ERP modules</span>
            <Link href="/products" className="font-semibold text-brand-600 hover:text-brand-700">
              All products →
            </Link>
          </>
        ) : (
          <>
            <span className="text-ink-500">Hotline 24/7</span>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-600 hover:text-brand-700">
                {site.phone}
              </a>
            )}
          </>
        )}
      </div>
    </>
  );
}

function MobileNav({
  open,
  pathname,
  top,
  nav,
  phone,
}: {
  open: boolean;
  pathname: string;
  top: number;
  nav: Item[];
  phone: string | null;
}) {
  const mainNav = nav;
  const site = { phone };
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{ top }}
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-ink-200 bg-white lg:hidden"
        >
          <ul className="container-site divide-y divide-ink-100 py-2">
            <li>
              <Link href="/" className={cn("block py-4 text-base font-semibold", pathname === "/" ? "text-brand-600" : "text-ink-900")}>
                Home
              </Link>
            </li>
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-ink-900"
                    aria-expanded={expanded === item.label}
                    aria-controls={`m-${item.label}`}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-5 text-ink-400 transition-transform", expanded === item.label && "rotate-180 text-brand-500")} aria-hidden="true" />
                  </button>
                  {expanded === item.label && (
                    <ul id={`m-${item.label}`} className="grid gap-1 pb-4 sm:grid-cols-2">
                      {item.children.map((c, i) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-2 py-2.5 text-[0.95rem]",
                              pathname === c.href ? "bg-brand-50 text-brand-700" : "text-ink-700",
                            )}
                          >
                            {c.icon && (
                              <span className={cn("inline-flex size-8 items-center justify-center rounded-lg [&_svg]:size-4", hues[hueAt(i)].soft, hues[hueAt(i)].text)}>
                                <Icon name={c.icon} />
                              </span>
                            )}
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
                    className={cn("block py-4 text-base font-semibold", isActive(pathname, item) ? "text-brand-600" : "text-ink-900")}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="container-site space-y-3 pt-2 pb-10">
            <Link href="/contact" className={buttonClasses("primary", "lg", "w-full")}>
              Request a Quote
            </Link>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={buttonClasses("secondary", "lg", "w-full")}>
                <Phone className="size-4" aria-hidden="true" /> {site.phone}
              </a>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
