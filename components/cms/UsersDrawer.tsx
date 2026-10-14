"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, UserRound, X } from "lucide-react";
import { listUsers, saveUser } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { inputCls } from "./FieldInput";

type U = Awaited<ReturnType<typeof listUsers>>[number];
type Form = { id?: string; email: string; name: string; role: "admin" | "editor"; password: string; active: boolean };

const blank: Form = { email: "", name: "", role: "editor", password: "", active: true };

export function UsersDrawer({ onClose }: { onClose: () => void }) {
  const [users, setUsers] = useState<U[] | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => listUsers().then(setUsers).catch((e) => setError(String(e.message ?? e)));
  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setError(null);
    const res = await saveUser({ ...form, password: form.password || undefined });
    setBusy(false);
    if ("error" in res && res.error) return setError(res.error);
    setForm(null);
    load();
  }

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label="Manage editors">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink-950/40" />
      <div className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">Access</p>
            <h2 className="text-lg font-semibold">Editors</h2>
          </div>
          <button type="button" onClick={onClose} className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-ink-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-sm text-ink-500">
            <strong>Admins</strong> can edit everything and manage editors. <strong>Editors</strong> can edit all website content.
          </p>
          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {form ? (
            <form onSubmit={submit} className="mt-5 space-y-4 rounded-xl p-4 ring-1 ring-ink-200">
              <h3 className="font-semibold">{form.id ? "Edit user" : "Add a user"}</h3>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="u-name">
                  Name
                </label>
                <input id="u-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="u-email">
                  Email
                </label>
                <input id="u-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="u-role">
                  Role
                </label>
                <select id="u-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Form["role"] })} className={inputCls}>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="u-pass">
                  {form.id ? "New password (leave blank to keep)" : "Password"}
                </label>
                <input
                  id="u-pass"
                  type="password"
                  autoComplete="new-password"
                  minLength={10}
                  required={!form.id}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={inputCls}
                />
                <p className="mt-1 text-xs text-ink-500">At least 10 characters. Share it with the person securely.</p>
              </div>
              {form.id && (
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="size-4 accent-brand-600" />
                  Access enabled
                </label>
              )}
              <div className="flex gap-2">
                <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60">
                  {busy && <Loader2 className="size-4 animate-spin" />} Save
                </button>
                <button type="button" onClick={() => setForm(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button type="button" onClick={() => setForm(blank)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">
              <Plus className="size-4" /> Add editor
            </button>
          )}
          <ul className="mt-5 divide-y divide-ink-100 rounded-xl ring-1 ring-ink-200">
            {!users && (
              <li className="p-4">
                <Loader2 className="size-5 animate-spin text-ink-400" />
              </li>
            )}
            {users?.map((u) => (
              <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink-100 text-ink-500">
                  <UserRound className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm font-medium", !u.active && "text-ink-400 line-through")}>{u.name}</p>
                  <p className="truncate text-xs text-ink-500">
                    {u.email} · {u.role}
                    {u.lastLoginAt ? ` · last sign-in ${new Date(u.lastLoginAt).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ id: u.id, email: u.email, name: u.name, role: u.role, password: "", active: u.active })}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
