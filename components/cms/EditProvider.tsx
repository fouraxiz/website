"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CollectionDrawer } from "./CollectionDrawer";
import { EditToolbar } from "./EditToolbar";
import { UsersDrawer } from "./UsersDrawer";

export interface EditTarget {
  collection: string;
  /** Open a specific item by slug; omit to open the collection list. */
  slug?: string;
  /** Start with a blank "add new" form. */
  create?: boolean;
}

interface Ctx {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  open: (t: EditTarget) => void;
}

const EditCtx = createContext<Ctx | null>(null);

export function useEditMode() {
  return useContext(EditCtx);
}

const STORAGE_KEY = "fx-edit-mode";

export function EditProvider({ user, children }: { user: { name: string; email: string; role: "admin" | "editor" }; children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const [target, setTarget] = useState<EditTarget | null>(null);
  const [usersOpen, setUsersOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v !== null) setEnabledState(v === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-edit-mode", enabled);
  }, [enabled]);

  return (
    <EditCtx.Provider value={{ enabled, setEnabled, open: setTarget }}>
      {children}
      <EditToolbar user={user} onOpen={setTarget} onUsers={() => setUsersOpen(true)} />
      {target && <CollectionDrawer key={`${target.collection}:${target.slug ?? ""}:${target.create ? 1 : 0}`} target={target} onClose={() => setTarget(null)} />}
      {usersOpen && user.role === "admin" && <UsersDrawer onClose={() => setUsersOpen(false)} />}
    </EditCtx.Provider>
  );
}
