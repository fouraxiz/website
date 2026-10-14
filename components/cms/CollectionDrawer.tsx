"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, EyeOff, History, Loader2, Pencil, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { getCollectionDef } from "@/lib/cms/collections";
import { emptyRecord, slugify } from "@/lib/cms/fields";
import { deleteItem, loadCollection, loadVersions, reorderItems, restoreVersion, saveItem, type EditorItem } from "@/lib/cms/actions";
import { cn } from "@/lib/utils";
import { FieldInput, inputCls } from "./FieldInput";
import type { EditTarget } from "./EditProvider";

type View = { mode: "list" } | { mode: "edit"; item: EditorItem | null };

export function CollectionDrawer({ target, onClose }: { target: EditTarget; onClose: () => void }) {
  const def = getCollectionDef(target.collection);
  const router = useRouter();
  const [items, setItems] = useState<EditorItem[] | null>(null);
  const [view, setView] = useState<View>({ mode: "list" });
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const reload = useCallback(async () => {
    try {
      const list = await loadCollection(def.name);
      setItems(list);
      return list;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load content.");
      return [];
    }
  }, [def.name]);

  useEffect(() => {
    reload().then((list) => {
      if (target.create) setView({ mode: "edit", item: null });
      else if (target.slug) {
        const found = list.find((i) => i.slug === target.slug);
        if (found) setView({ mode: "edit", item: found });
      }
    });
  }, [reload, target.create, target.slug]);

  const close = useCallback(() => {
    if (dirty && !confirm("You have unsaved changes. Close without saving?")) return;
    onClose();
  }, [dirty, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  const title = (it: EditorItem) => String(it.data[def.titleField] ?? "") || it.slug;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label={`Edit ${def.label}`}>
      <button type="button" aria-label="Close editor" onClick={close} className="absolute inset-0 bg-ink-950/40 backdrop-blur-[2px]" />
      <div className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <header className="flex items-center gap-3 border-b border-ink-200 px-5 py-4">
          {view.mode === "edit" && def.kind === "list" && (
            <button
              type="button"
              onClick={() => {
                if (dirty && !confirm("Discard unsaved changes?")) return;
                setDirty(false);
                setView({ mode: "list" });
              }}
              className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-ink-100"
              aria-label="Back to list"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">Edit content</p>
            <h2 className="truncate text-lg font-semibold">
              {view.mode === "edit" ? (view.item ? title(view.item) : `New ${def.singular.toLowerCase()}`) : def.label}
            </h2>
          </div>
          <button type="button" onClick={close} className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-ink-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </header>

        {error && <p className="m-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!items && !error && (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-ink-400" />
          </div>
        )}

        {items && view.mode === "list" && (
          <ListView
            def={def}
            items={items}
            title={title}
            onEdit={(item) => setView({ mode: "edit", item })}
            onAdd={() => setView({ mode: "edit", item: null })}
            onChanged={async () => {
              await reload();
              router.refresh();
            }}
          />
        )}
        {items && view.mode === "edit" && (
          <ItemForm
            def={def}
            item={view.item}
            onDirty={setDirty}
            onSaved={async (saved) => {
              setDirty(false);
              await reload();
              setView({ mode: "edit", item: saved });
              router.refresh();
            }}
            onDeleted={async () => {
              setDirty(false);
              await reload();
              router.refresh();
              if (def.kind === "single") onClose();
              else setView({ mode: "list" });
            }}
          />
        )}
      </div>
    </div>
  );
}

function ListView({
  def,
  items,
  title,
  onEdit,
  onAdd,
  onChanged,
}: {
  def: ReturnType<typeof getCollectionDef>;
  items: EditorItem[];
  title: (i: EditorItem) => string;
  onEdit: (i: EditorItem) => void;
  onAdd: () => void;
  onChanged: () => Promise<void>;
}) {
  const [pending, start] = useTransition();
  const [order, setOrder] = useState(items);
  useEffect(() => setOrder(items), [items]);

  const moveItem = (i: number, dir: -1 | 1) => {
    const next = [...order];
    const [x] = next.splice(i, 1);
    next.splice(i + dir, 0, x);
    setOrder(next);
    start(async () => {
      await reorderItems(def.name, next.map((n) => n.id));
      await onChanged();
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-5">
      {def.description && <p className="mb-4 text-sm text-ink-500">{def.description}</p>}
      {!def.fixed && (
        <button type="button" onClick={onAdd} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">
          <Plus className="size-4" /> Add {def.singular.toLowerCase()}
        </button>
      )}
      {order.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500">Nothing here yet.</p>
      ) : (
        <ul className={cn("divide-y divide-ink-100 rounded-xl ring-1 ring-ink-200", pending && "opacity-60")}>
          {order.map((it, i) => (
            <li key={it.id} className="flex items-center gap-2 px-3 py-2.5">
              <div className="flex flex-col">
                <button type="button" disabled={i === 0 || pending} onClick={() => moveItem(i, -1)} className="rounded p-0.5 text-ink-400 hover:bg-ink-100 disabled:opacity-30" aria-label="Move up">
                  <ArrowUp className="size-3.5" />
                </button>
                <button type="button" disabled={i === order.length - 1 || pending} onClick={() => moveItem(i, 1)} className="rounded p-0.5 text-ink-400 hover:bg-ink-100 disabled:opacity-30" aria-label="Move down">
                  <ArrowDown className="size-3.5" />
                </button>
              </div>
              <button type="button" onClick={() => onEdit(it)} className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-medium text-ink-900">{title(it)}</span>
                <span className="block truncate text-xs text-ink-400">{def.name === "sections" ? it.slug : `/${it.slug}`}</span>
              </button>
              {it.status === "draft" && <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Draft</span>}
              {it.data.hidden === true && (
                <span className="inline-flex items-center gap-1 rounded-md bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-600">
                  <EyeOff className="size-3" /> Hidden
                </span>
              )}
              <button type="button" onClick={() => onEdit(it)} className="inline-flex size-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100" aria-label={`Edit ${title(it)}`}>
                <Pencil className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ItemForm({
  def,
  item,
  onDirty,
  onSaved,
  onDeleted,
}: {
  def: ReturnType<typeof getCollectionDef>;
  item: EditorItem | null;
  onDirty: (d: boolean) => void;
  onSaved: (i: EditorItem) => Promise<void>;
  onDeleted: () => Promise<void>;
}) {
  const initial = useMemo(() => {
    const base = emptyRecord(def.fields);
    // New items: default date fields to today.
    if (!item) for (const f of def.fields) if (f.type === "date") base[f.name] = new Date().toISOString().slice(0, 10);
    return { ...base, ...(item?.data ?? {}) };
  }, [def.fields, item]);
  const [data, setData] = useState<Record<string, unknown>>(initial);
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState<null | "published" | "draft" | "delete">(null);
  const [versions, setVersions] = useState<{ id: string; status: string; createdAt: string }[] | null>(null);

  const update = (name: string, v: unknown) => {
    setData((d) => ({ ...d, [name]: v }));
    onDirty(true);
    setMessage(null);
  };

  async function save(status: "published" | "draft") {
    setBusy(status);
    setMessage(null);
    try {
      const res = await saveItem({ collection: def.name, id: item?.id, slug: def.routable ? slug : undefined, data, status });
      if (res.ok) {
        setErrors({});
        setMessage({ type: "ok", text: status === "draft" ? "Saved as draft — only editors can see it." : "Published — the website is updated." });
        await onSaved(res.item);
      } else {
        setErrors(res.errors);
        setMessage({ type: "error", text: res.message ?? "Could not save." });
      }
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Could not save." });
    }
    setBusy(null);
  }

  async function remove() {
    if (!item || !confirm(`Delete "${String(data[def.titleField] ?? item.slug)}"? This removes it from the website.`)) return;
    setBusy("delete");
    const res = await deleteItem(item.id);
    setBusy(null);
    if (res.ok) await onDeleted();
    else setMessage({ type: "error", text: res.message ?? "Could not delete." });
  }

  const publicPath = def.pathPrefix && item ? `${def.pathPrefix}${item.slug}` : null;

  return (
    <>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {item?.status === "draft" && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">This item is a draft and is not visible to the public.</p>}
        {def.routable && (
          <div>
            <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ink-800">
              Page address
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-400">{def.pathPrefix}</span>
              <input
                id="slug"
                value={slug}
                placeholder={slugify(String(data[def.slugField ?? def.titleField] ?? "")) || "generated-from-title"}
                onChange={(e) => {
                  setSlug(e.target.value);
                  onDirty(true);
                }}
                className={inputCls}
              />
            </div>
            <p className="mt-1 text-xs text-ink-500">Changing the address of a published page breaks existing links to it.</p>
          </div>
        )}
        {def.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={data[f.name]} onChange={(v) => update(f.name, v)} error={errors[f.name]} errors={errors} path={f.name} />
        ))}

        {item && (
          <div className="border-t border-ink-100 pt-4">
            <button
              type="button"
              onClick={async () => setVersions(versions ? null : await loadVersions(item.id))}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-ink-900"
            >
              <History className="size-4" /> {versions ? "Hide history" : "Version history"}
            </button>
            {versions && (
              <ul className="mt-3 space-y-1.5">
                {versions.length === 0 && <li className="text-sm text-ink-500">No earlier versions yet.</li>}
                {versions.map((v) => (
                  <li key={v.id} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2 text-sm">
                    <span>
                      {new Date(v.createdAt).toLocaleString()} <span className="text-ink-400">· {v.status}</span>
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm("Restore this version? The current content will be kept in history.")) return;
                        const res = await restoreVersion(v.id);
                        if (res.ok) await onSaved(res.item);
                      }}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-white"
                    >
                      <RotateCcw className="size-3.5" /> Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <footer className="border-t border-ink-200 bg-ink-50 px-5 py-4">
        {message && (
          <p role="status" className={cn("mb-3 rounded-lg px-3 py-2 text-sm", message.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700")}>
            {message.text}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={!!busy} onClick={() => save("published")} className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60">
            {busy === "published" && <Loader2 className="size-4 animate-spin" />} Publish
          </button>
          {def.kind === "list" && (
            <button type="button" disabled={!!busy} onClick={() => save("draft")} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 hover:bg-ink-100 disabled:opacity-60">
              {busy === "draft" && <Loader2 className="size-4 animate-spin" />} Save as draft
            </button>
          )}
          {publicPath && item?.status === "published" && (
            <a href={publicPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-white">
              View page <ExternalLink className="size-3.5" />
            </a>
          )}
          {item && def.kind === "list" && !def.fixed && (
            <button type="button" disabled={!!busy} onClick={remove} className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60">
              {busy === "delete" ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />} Delete
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
