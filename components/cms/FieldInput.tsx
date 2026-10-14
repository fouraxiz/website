"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { emptyRecord, type Field } from "@/lib/cms/fields";
import { uploadImage } from "@/lib/cms/actions";
import { Markdown } from "@/components/blog/Markdown";
import type { IconName } from "@/types";

export const inputCls =
  "block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none";

function move<T>(arr: T[], from: number, to: number) {
  const copy = [...arr];
  const [x] = copy.splice(from, 1);
  copy.splice(to, 0, x);
  return copy;
}

export function FieldInput({
  field,
  value,
  onChange,
  error,
  errors,
  path,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string;
  errors: Record<string, string>;
  path: string;
}) {
  const id = `f-${path.replace(/\./g, "-")}`;
  const label = (
    <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink-800">
      {field.label}
      {"required" in field && field.required && <span className="text-red-500">*</span>}
    </label>
  );
  const help = "help" in field && field.help ? <p className="mt-1 text-xs text-ink-500">{field.help}</p> : null;
  const err = error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null;
  const str = value === null || value === undefined ? "" : String(value);

  switch (field.type) {
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-brand-600" />
          {field.label}
        </label>
      );
    case "textarea":
      return (
        <div>
          {label}
          <textarea id={id} rows={4} value={str} onChange={(e) => onChange(e.target.value)} className={inputCls} />
          {help}
          {err}
        </div>
      );
    case "richtext":
      return <RichText id={id} label={label} value={str} onChange={onChange} err={err} />;
    case "number":
      return (
        <div>
          {label}
          <input id={id} type="number" value={str} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} className={inputCls} />
          {help}
          {err}
        </div>
      );
    case "date":
      return (
        <div>
          {label}
          <input id={id} type="date" value={str.slice(0, 10)} onChange={(e) => onChange(e.target.value)} className={inputCls} />
          {err}
        </div>
      );
    case "select":
      return (
        <div>
          {label}
          <div className="flex items-center gap-2">
            {field.name === "icon" && str && (
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 [&_svg]:size-4">
                <Icon name={str as IconName} />
              </span>
            )}
            <select id={id} value={str} onChange={(e) => onChange(e.target.value)} className={inputCls}>
              {field.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {help}
          {err}
        </div>
      );
    case "image":
      return <ImageInput id={id} label={label} value={str} onChange={onChange} err={err} help={help} />;
    case "strings":
      return <StringsInput field={field} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} label={label} help={help} err={err} />;
    case "list":
      return <ListInput field={field} value={Array.isArray(value) ? (value as Record<string, unknown>[]) : []} onChange={onChange} errors={errors} path={path} />;
    default:
      return (
        <div>
          {label}
          <input
            id={id}
            type={field.type === "url" ? "text" : "text"}
            inputMode={field.type === "url" ? "url" : undefined}
            placeholder={"placeholder" in field ? field.placeholder : field.type === "url" ? "https://… or /page" : undefined}
            value={str}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
          {help}
          {err}
        </div>
      );
  }
}

function ImageInput({ id, label, value, onChange, err, help }: { id: string; label: React.ReactNode; value: string; onChange: (v: unknown) => void; err: React.ReactNode; help: React.ReactNode }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  async function upload(file: File) {
    setBusy(true);
    setMessage(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.ok) onChange(res.url);
    else setMessage(res.message);
  }
  return (
    <div>
      {label}
      <div className="flex items-start gap-3">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-ink-300 bg-ink-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value ? <img src={value} alt="" className="size-full object-cover" /> : <ImagePlus className="size-6 text-ink-300" />}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} type="text" value={value} placeholder="/uploads/… or https://…" onChange={(e) => onChange(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : <ImagePlus className="size-3.5" />} Upload image
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-100">
                <X className="size-3.5" /> Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
          {message && <p className="text-xs font-medium text-red-600">{message}</p>}
        </div>
      </div>
      {help}
      {err}
    </div>
  );
}

function StringsInput({
  field,
  value,
  onChange,
  label,
  help,
  err,
}: {
  field: Extract<Field, { type: "strings" }>;
  value: string[];
  onChange: (v: unknown) => void;
  label: React.ReactNode;
  help: React.ReactNode;
  err: React.ReactNode;
}) {
  return (
    <div>
      {label}
      <ul className="space-y-1.5">
        {value.map((v, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <input
              value={v}
              placeholder={field.placeholder}
              onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))}
              className={inputCls}
              aria-label={`${field.label} ${i + 1}`}
            />
            <IconBtn label="Move up" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))}>
              <ArrowUp className="size-3.5" />
            </IconBtn>
            <IconBtn label="Move down" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))}>
              <ArrowDown className="size-3.5" />
            </IconBtn>
            <IconBtn label="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))} danger>
              <Trash2 className="size-3.5" />
            </IconBtn>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...value, ""])} className="mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50">
        <Plus className="size-3.5" /> Add
      </button>
      {help}
      {err}
    </div>
  );
}

function ListInput({
  field,
  value,
  onChange,
  errors,
  path,
}: {
  field: Extract<Field, { type: "list" }>;
  value: Record<string, unknown>[];
  onChange: (v: unknown) => void;
  errors: Record<string, string>;
  path: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <fieldset className="rounded-xl border border-ink-200 p-3">
      <legend className="px-1 text-sm font-medium text-ink-800">{field.label}</legend>
      {field.help && <p className="mb-2 text-xs text-ink-500">{field.help}</p>}
      <ul className="space-y-2">
        {value.map((row, i) => {
          const title = String(row[field.itemLabel ?? field.fields[0].name] ?? "") || `Item ${i + 1}`;
          const isOpen = open === i;
          return (
            <li key={i} className="rounded-lg border border-ink-200 bg-ink-50/50">
              <div className="flex items-center gap-1 px-2 py-1.5">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-medium text-ink-800">
                  <ChevronDown className={cn("size-4 shrink-0 text-ink-400 transition-transform", isOpen && "rotate-180")} />
                  <span className="truncate">{title}</span>
                </button>
                <IconBtn label="Move up" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))}>
                  <ArrowUp className="size-3.5" />
                </IconBtn>
                <IconBtn label="Move down" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))}>
                  <ArrowDown className="size-3.5" />
                </IconBtn>
                <IconBtn label="Remove" danger onClick={() => onChange(value.filter((_, j) => j !== i))}>
                  <Trash2 className="size-3.5" />
                </IconBtn>
              </div>
              {isOpen && (
                <div className="space-y-3 border-t border-ink-200 bg-white p-3">
                  {field.fields.map((f) => (
                    <FieldInput
                      key={f.name}
                      field={f}
                      value={row[f.name]}
                      onChange={(v) => onChange(value.map((r, j) => (j === i ? { ...r, [f.name]: v } : r)))}
                      error={errors[`${path}.${i}.${f.name}`]}
                      errors={errors}
                      path={`${path}.${i}.${f.name}`}
                    />
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => {
          onChange([...value, emptyRecord(field.fields)]);
          setOpen(value.length);
        }}
        className="mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50"
      >
        <Plus className="size-3.5" /> Add {field.label.toLowerCase().replace(/s$/, "")}
      </button>
    </fieldset>
  );
}

function RichText({ id, label, value, onChange, err }: { id: string; label: React.ReactNode; value: string; onChange: (v: unknown) => void; err: React.ReactNode }) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function wrap(before: string, after = before, placeholder = "text") {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = value.slice(s, e) || placeholder;
    onChange(value.slice(0, s) + before + sel + after + value.slice(e));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }
  function linePrefix(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    onChange(value.slice(0, lineStart) + prefix + value.slice(lineStart));
  }
  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.ok) wrap(`![${file.name.replace(/\.[^.]+$/, "")}](`, ")", res.url);
  }
  const tools: { l: string; a: () => void }[] = [
    { l: "B", a: () => wrap("**") },
    { l: "I", a: () => wrap("*") },
    { l: "H2", a: () => linePrefix("## ") },
    { l: "H3", a: () => linePrefix("### ") },
    { l: "• List", a: () => linePrefix("- ") },
    { l: "1. List", a: () => linePrefix("1. ") },
    { l: "Quote", a: () => linePrefix("> ") },
    { l: "Link", a: () => wrap("[", "](https://)", "link text") },
  ];
  return (
    <div>
      {label}
      <div className="overflow-hidden rounded-lg border border-ink-200">
        <div className="flex flex-wrap items-center gap-1 border-b border-ink-200 bg-ink-50 px-2 py-1.5">
          {tools.map((t) => (
            <button key={t.l} type="button" onClick={t.a} className="rounded-md px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-white">
              {t.l}
            </button>
          ))}
          <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-white">
            {busy ? <Loader2 className="size-3 animate-spin" /> : <ImagePlus className="size-3" />} Image
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <span className="ml-auto flex rounded-md bg-white p-0.5 ring-1 ring-ink-200">
            {(["write", "preview"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} className={cn("rounded px-2 py-0.5 text-xs font-medium capitalize", tab === t ? "bg-ink-900 text-white" : "text-ink-600")}>
                {t}
              </button>
            ))}
          </span>
        </div>
        {tab === "write" ? (
          <textarea id={id} ref={ref} rows={16} value={value} onChange={(e) => onChange(e.target.value)} className="block w-full resize-y border-0 px-3 py-2 font-mono text-sm focus:ring-0 focus:outline-none" />
        ) : (
          <div className="max-h-[28rem] overflow-y-auto p-4">
            <Markdown source={value} />
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-ink-500">Formatting: **bold**, *italic*, ## heading, - list, [link](url).</p>
      {err}
    </div>
  );
}

function IconBtn({ children, label, onClick, disabled, danger }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 disabled:opacity-30", danger && "hover:bg-red-50 hover:text-red-600")}
    >
      {children}
    </button>
  );
}
