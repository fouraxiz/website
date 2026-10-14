"use client";

import { Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditMode, type EditTarget } from "./EditProvider";

export interface EditAction extends EditTarget {
  label: string;
}

/**
 * Outlines a region of the page in edit mode and shows buttons that open the
 * matching editor. Outside edit mode it renders only its children.
 */
export function Editable({ actions, children, className, inline = false }: { actions: EditAction[]; children: React.ReactNode; className?: string; inline?: boolean }) {
  const ctx = useEditMode();
  if (!ctx) return <>{children}</>;
  return (
    <div className={cn("group/edit relative", inline && "inline-block", ctx.enabled && "edit-outline", className)}>
      {children}
      {ctx.enabled && (
        <div className="pointer-events-none absolute top-2 right-2 z-30 flex flex-wrap justify-end gap-1.5 opacity-90 transition group-hover/edit:opacity-100">
          {actions.map((a) => (
            <button
              key={`${a.collection}-${a.slug ?? ""}-${a.label}`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                ctx.open(a);
              }}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg ring-2 ring-white hover:bg-accent-700"
            >
              {a.create ? <Plus className="size-3.5" aria-hidden="true" /> : <Pencil className="size-3.5" aria-hidden="true" />}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
