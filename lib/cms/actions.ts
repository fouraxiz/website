"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { and, asc, desc, eq, ne } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { db, hasDatabase } from "@/lib/db";
import { contentItems, contentVersions, media } from "@/lib/db/schema";
import { requireEditor } from "@/lib/auth/session";
import { getCollectionDef } from "./collections";
import { slugify, validateRecord } from "./fields";

export interface EditorItem {
  id: string;
  slug: string;
  status: "published" | "draft";
  sort: number;
  data: Record<string, unknown>;
  updatedAt: string;
}

function guard() {
  if (!hasDatabase) throw new Error("Editing needs a database (DATABASE_URL is not set).");
}

function refresh() {
  revalidateTag("content");
  revalidatePath("/", "layout");
}

const toEditorItem = (r: typeof contentItems.$inferSelect): EditorItem => ({
  id: r.id,
  slug: r.slug,
  status: r.status,
  sort: r.sort,
  data: r.data,
  updatedAt: r.updatedAt.toISOString(),
});

/** All items of a collection, including drafts, for the editor drawer. */
export async function loadCollection(collection: string): Promise<EditorItem[]> {
  guard();
  await requireEditor();
  getCollectionDef(collection);
  const rows = await db
    .select()
    .from(contentItems)
    .where(eq(contentItems.collection, collection))
    .orderBy(asc(contentItems.sort), asc(contentItems.createdAt));
  return rows.map(toEditorItem);
}

/** Items of a collection as {slug, title}, for the "pick from a list" fields in the edit forms. */
export async function loadOptions(collection: string): Promise<{ slug: string; title: string }[]> {
  guard();
  await requireEditor();
  const def = getCollectionDef(collection);
  const rows = await db
    .select({ slug: contentItems.slug, data: contentItems.data })
    .from(contentItems)
    .where(eq(contentItems.collection, collection))
    .orderBy(asc(contentItems.sort), asc(contentItems.createdAt));
  return rows.map((r) => ({ slug: r.slug, title: String(r.data[def.titleField] ?? r.slug) }));
}

async function uniqueSlug(collection: string, wanted: string, exceptId?: string) {
  const base = slugify(wanted) || "item";
  let candidate = base;
  for (let n = 2; n < 200; n++) {
    const clash = await db
      .select({ id: contentItems.id })
      .from(contentItems)
      .where(and(eq(contentItems.collection, collection), eq(contentItems.slug, candidate), exceptId ? ne(contentItems.id, exceptId) : undefined))
      .limit(1);
    if (clash.length === 0) return candidate;
    candidate = `${base}-${n}`;
  }
  return `${base}-${randomUUID().slice(0, 6)}`;
}

export type SaveResult = { ok: true; item: EditorItem } | { ok: false; errors: Record<string, string>; message?: string };

export async function saveItem(input: {
  collection: string;
  id?: string;
  slug?: string;
  data: Record<string, unknown>;
  status: "published" | "draft";
}): Promise<SaveResult> {
  guard();
  const user = await requireEditor();
  const def = getCollectionDef(input.collection);
  const { data, errors } = validateRecord(def.fields, input.data);
  if (Object.keys(errors).length) return { ok: false, errors, message: "Please fix the highlighted fields." };
  const status = input.status === "draft" ? "draft" : "published";

  if (input.id) {
    const [existing] = await db.select().from(contentItems).where(eq(contentItems.id, input.id)).limit(1);
    if (!existing || existing.collection !== input.collection) return { ok: false, errors: {}, message: "This item no longer exists." };
    let slug = existing.slug;
    if (def.routable && input.slug && slugify(input.slug) !== existing.slug) slug = await uniqueSlug(input.collection, input.slug, existing.id);
    await db.insert(contentVersions).values({
      itemId: existing.id,
      collection: existing.collection,
      slug: existing.slug,
      data: existing.data,
      status: existing.status,
      createdBy: user.id,
    });
    const [row] = await db
      .update(contentItems)
      .set({ data, status, slug, updatedAt: new Date(), updatedBy: user.id })
      .where(eq(contentItems.id, existing.id))
      .returning();
    refresh();
    return { ok: true, item: toEditorItem(row) };
  }

  if (def.kind === "single") return { ok: false, errors: {}, message: "This content can only be edited, not added." };
  const titleValue = String(data[def.slugField ?? def.titleField] ?? "");
  const slug = await uniqueSlug(input.collection, input.slug || titleValue);
  const [last] = await db
    .select({ sort: contentItems.sort })
    .from(contentItems)
    .where(eq(contentItems.collection, input.collection))
    .orderBy(desc(contentItems.sort))
    .limit(1);
  const [row] = await db
    .insert(contentItems)
    .values({ collection: input.collection, slug, data, status, sort: (last?.sort ?? 0) + 10, updatedBy: user.id })
    .returning();
  refresh();
  return { ok: true, item: toEditorItem(row) };
}

export async function deleteItem(id: string) {
  guard();
  const user = await requireEditor();
  const [existing] = await db.select().from(contentItems).where(eq(contentItems.id, id)).limit(1);
  if (!existing) return { ok: true };
  if (getCollectionDef(existing.collection).kind === "single") return { ok: false, message: "This content can't be deleted." };
  // Keep a final version so a deleted item can still be recovered from the database.
  await db.insert(contentVersions).values({
    itemId: existing.id,
    collection: existing.collection,
    slug: existing.slug,
    data: existing.data,
    status: "deleted",
    createdBy: user.id,
  });
  await db.delete(contentItems).where(eq(contentItems.id, id));
  refresh();
  return { ok: true };
}

export async function reorderItems(collection: string, ids: string[]) {
  guard();
  await requireEditor();
  getCollectionDef(collection);
  await db.transaction(async (tx) => {
    for (let i = 0; i < ids.length; i++) {
      await tx
        .update(contentItems)
        .set({ sort: i * 10 })
        .where(and(eq(contentItems.id, ids[i]), eq(contentItems.collection, collection)));
    }
  });
  refresh();
  return { ok: true };
}

export async function loadVersions(itemId: string) {
  guard();
  await requireEditor();
  const rows = await db
    .select({ id: contentVersions.id, createdAt: contentVersions.createdAt, status: contentVersions.status })
    .from(contentVersions)
    .where(eq(contentVersions.itemId, itemId))
    .orderBy(desc(contentVersions.createdAt))
    .limit(30);
  return rows.map((r) => ({ id: r.id, status: r.status, createdAt: r.createdAt.toISOString() }));
}

export async function restoreVersion(versionId: string): Promise<SaveResult> {
  guard();
  await requireEditor();
  const [v] = await db.select().from(contentVersions).where(eq(contentVersions.id, versionId)).limit(1);
  if (!v) return { ok: false, errors: {}, message: "Version not found." };
  return saveItem({ collection: v.collection, id: v.itemId, data: v.data, status: v.status === "draft" ? "draft" : "published" });
}

/* ---------------- Media uploads ---------------- */

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};
const MAX_BYTES = 8 * 1024 * 1024;

function uploadDir() {
  return path.resolve(process.env.UPLOAD_DIR || "./uploads");
}

export async function uploadImage(form: FormData): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  guard();
  const user = await requireEditor();
  const file = form.get("file");
  if (!(file instanceof File)) return { ok: false, message: "No file received." };
  const ext = ALLOWED[file.type];
  if (!ext) return { ok: false, message: "Use a JPG, PNG, WebP, GIF, AVIF or SVG image." };
  if (file.size > MAX_BYTES) return { ok: false, message: "Images must be 8 MB or smaller." };
  const now = new Date();
  const rel = path.posix.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, "0"), `${randomUUID()}${ext}`);
  const abs = path.join(uploadDir(), rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, Buffer.from(await file.arrayBuffer()));
  await db.insert(media).values({ path: rel, originalName: file.name.slice(0, 200), mime: file.type, size: file.size, createdBy: user.id });
  return { ok: true, url: `/uploads/${rel}` };
}
