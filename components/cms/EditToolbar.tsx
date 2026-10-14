"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, LayoutList, LogOut, PenLine, Users } from "lucide-react";
import { collections } from "@/lib/cms/collections";
import { logout } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { useEditMode, type EditTarget } from "./EditProvider";

export function EditToolbar({ user, onOpen, onUsers }: { user: { name: string; role: "admin" | "editor" }; onOpen: (t: EditTarget) => void; onUsers: () => void }) {
  const ctx = useEditMode()!;
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2" role="toolbar" aria-label="Website editing">
      {menu && (
        <div className="absolute bottom-full left-1/2 mb-2 max-h-[65vh] w-72 -translate-x-1/2 overflow-y-auto rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink-200">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-ink-400 uppercase">All content</p>
          <ul>
            {collections.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => {
                    setMenu(false);
                    onOpen({ collection: c.name, slug: c.kind === "single" ? "site" : undefined });
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink-800 hover:bg-ink-50"
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center gap-1 rounded-full bg-ink-950 p-1.5 pl-4 text-sm text-white shadow-2xl ring-1 ring-white/10">
        <span className="hidden pr-2 text-xs text-ink-400 sm:inline">
          {user.name} · {user.role}
        </span>
        <button
          type="button"
          onClick={() => ctx.setEnabled(!ctx.enabled)}
          aria-pressed={ctx.enabled}
          className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold transition-colors", ctx.enabled ? "bg-accent-600" : "bg-white/10 hover:bg-white/20")}
        >
          <PenLine className="size-4" aria-hidden="true" />
          Edit mode {ctx.enabled ? "on" : "off"}
        </button>
        <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold hover:bg-white/10">
          <LayoutList className="size-4" aria-hidden="true" /> Content <ChevronUp className={cn("size-3.5 transition-transform", !menu && "rotate-180")} aria-hidden="true" />
        </button>
        {user.role === "admin" && (
          <button type="button" onClick={onUsers} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold hover:bg-white/10">
            <Users className="size-4" aria-hidden="true" /> <span className="hidden sm:inline">Editors</span>
          </button>
        )}
        <form action={logout}>
          <button type="submit" title="Sign out" className="inline-flex size-8 items-center justify-center rounded-full hover:bg-white/10">
            <LogOut className="size-4" aria-hidden="true" />
            <span className="sr-only">Sign out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
