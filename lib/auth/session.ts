import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { db, hasDatabase } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const SESSION_COOKIE = "fx_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be set to at least 32 characters");
  return new TextEncoder().encode(s);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** The signed-in editor for this request, or null. Re-checks the user is still active. */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  if (!hasDatabase || !process.env.SESSION_SECRET) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub) return null;
    const [u] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!u || !u.active) return null;
    return { id: u.id, email: u.email, name: u.name, role: u.role };
  } catch {
    return null;
  }
});

export async function requireEditor() {
  const s = await getSession();
  if (!s) throw new Error("Not signed in");
  return s;
}

export async function requireAdmin() {
  const s = await requireEditor();
  if (s.role !== "admin") throw new Error("Only administrators can do this");
  return s;
}
