"use server";

import bcrypt from "bcryptjs";
import { asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db, hasDatabase } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createSession, destroySession, requireAdmin } from "./session";

// Simple in-memory brute-force protection (per server process).
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export interface LoginState {
  error?: string;
  email?: string;
}

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (!hasDatabase) return { error: "The database is not configured." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/");
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `${ip}|${email}`;
  const a = attempts.get(key);
  if (a && a.until > Date.now()) return { error: "Too many attempts. Please try again in 15 minutes.", email };

  const [u] = email ? await db.select().from(users).where(eq(users.email, email)).limit(1) : [];
  const ok = u && u.active && (await bcrypt.compare(password, u.passwordHash));
  if (!ok) {
    const count = (a?.count ?? 0) + 1;
    attempts.set(key, { count, until: count >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : 0 });
    return { error: "Incorrect email or password.", email };
  }
  attempts.delete(key);
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, u.id));
  await createSession(u.id);
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

/* ---------- Editor management (admins only) ---------- */

export async function listUsers() {
  await requireAdmin();
  return db
    .select({ id: users.id, email: users.email, name: users.name, role: users.role, active: users.active, lastLoginAt: users.lastLoginAt })
    .from(users)
    .orderBy(asc(users.createdAt));
}

export async function saveUser(input: { id?: string; email: string; name: string; role: "admin" | "editor"; password?: string; active?: boolean }) {
  const me = await requireAdmin();
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!input.name.trim()) return { error: "Enter a name." };
  if (input.role !== "admin" && input.role !== "editor") return { error: "Invalid role." };
  if (input.password && input.password.length < 10) return { error: "Password must be at least 10 characters." };
  if (input.id === me.id && (input.role !== "admin" || input.active === false)) return { error: "You can't remove your own admin access." };
  try {
    if (input.id) {
      await db
        .update(users)
        .set({
          email,
          name: input.name.trim(),
          role: input.role,
          active: input.active ?? true,
          ...(input.password ? { passwordHash: await bcrypt.hash(input.password, 12) } : {}),
        })
        .where(eq(users.id, input.id));
    } else {
      if (!input.password) return { error: "Set a password for the new user." };
      await db.insert(users).values({ email, name: input.name.trim(), role: input.role, passwordHash: await bcrypt.hash(input.password, 12) });
    }
  } catch (e) {
    if (String(e).includes("unique")) return { error: "A user with this email already exists." };
    throw e;
  }
  return { ok: true };
}
