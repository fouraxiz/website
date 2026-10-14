/**
 * Keeps the database in line with the initial content in /data without ever
 * touching what editors changed on the website.
 *
 * - Collections that are empty get the full initial content.
 * - Items nobody has edited on the site are updated to the latest /data content.
 * - New items in /data are added — unless an editor deleted that item on the site.
 * - Unedited items that no longer exist in /data are removed.
 * - Anything saved or created on the website is left exactly as it is.
 *
 * Used by `npm run db:seed -- --sync`, on every deploy, and automatically when
 * the site starts with a new version of the content (see `ensureContentSynced`).
 */
import { createHash } from "node:crypto";
import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { contentItems, contentVersions } from "@/lib/db/schema";
import { buildSeed } from "./seed-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = NodePgDatabase<any>;

const META = "_meta";
const HASH_SLUG = "seed-hash";

export function seedHash() {
  return createHash("sha1").update(JSON.stringify(buildSeed())).digest("hex").slice(0, 16);
}

export interface SyncReport {
  collection: string;
  inserted: number;
  updated: number;
  added: number;
  removed: number;
  kept: number;
}

export async function syncContent(db: Db, log: (line: string) => void = () => {}): Promise<SyncReport[]> {
  const seed = buildSeed();
  const reports: SyncReport[] = [];
  for (const [collection, items] of Object.entries(seed)) {
    const report: SyncReport = { collection, inserted: 0, updated: 0, added: 0, removed: 0, kept: 0 };
    const existing = await db
      .select({ id: contentItems.id, slug: contentItems.slug, updatedBy: contentItems.updatedBy, sort: contentItems.sort })
      .from(contentItems)
      .where(eq(contentItems.collection, collection));

    if (existing.length === 0) {
      const deleted = await deletedSlugs(db, collection);
      const fresh = items.filter((it) => !deleted.has(it.slug));
      if (fresh.length) {
        await db.insert(contentItems).values(fresh.map((it, i) => ({ collection, slug: it.slug, data: it.data, sort: i * 10, status: "published" as const })));
      }
      report.inserted = fresh.length;
      if (fresh.length) log(`✔ ${collection}: ${fresh.length} items`);
      reports.push(report);
      continue;
    }

    const bySlug = new Map(existing.map((e) => [e.slug, e]));
    const seedSlugs = new Set(items.map((i) => i.slug));
    const deleted = await deletedSlugs(db, collection);
    let nextSort = Math.max(0, ...existing.map((e) => e.sort)) + 10;
    for (const it of items) {
      const row = bySlug.get(it.slug);
      if (!row) {
        if (deleted.has(it.slug)) continue; // an editor deleted it on the site — don't bring it back
        await db.insert(contentItems).values({ collection, slug: it.slug, data: it.data, sort: nextSort, status: "published" });
        nextSort += 10;
        report.added++;
      } else if (row.updatedBy === null) {
        await db.update(contentItems).set({ data: it.data, updatedAt: new Date() }).where(eq(contentItems.id, row.id));
        report.updated++;
      } else {
        report.kept++;
      }
    }
    for (const row of existing) {
      if (!seedSlugs.has(row.slug) && row.updatedBy === null) {
        await db.delete(contentItems).where(and(eq(contentItems.id, row.id), isNull(contentItems.updatedBy)));
        report.removed++;
      }
    }
    log(`↻ ${collection}: ${report.updated} updated, ${report.added} added, ${report.removed} removed, ${report.kept} kept (edited on the site)`);
    reports.push(report);
  }
  await saveHash(db, seedHash());
  return reports;
}

async function deletedSlugs(db: Db, collection: string) {
  const rows = await db
    .selectDistinct({ slug: contentVersions.slug })
    .from(contentVersions)
    .where(and(eq(contentVersions.collection, collection), inArray(contentVersions.status, ["deleted"])));
  return new Set(rows.map((r) => r.slug));
}

async function saveHash(db: Db, hash: string) {
  await db
    .insert(contentItems)
    .values({ collection: META, slug: HASH_SLUG, data: { hash }, status: "draft", sort: 0 })
    .onConflictDoUpdate({ target: [contentItems.collection, contentItems.slug], set: { data: { hash }, updatedAt: new Date() } });
}

/** Runs the sync once per server process, only when the content in /data has changed since the last sync. */
let running: Promise<void> | null = null;
export function ensureContentSynced(db: Db): Promise<void> {
  running ??= (async () => {
    try {
      const [row] = await db
        .select({ data: contentItems.data })
        .from(contentItems)
        .where(and(eq(contentItems.collection, META), eq(contentItems.slug, HASH_SLUG)))
        .limit(1);
      if ((row?.data as { hash?: string } | undefined)?.hash === seedHash()) return;
      // Only one process syncs at a time.
      await db.transaction(async (tx) => {
        await tx.execute(sql`select pg_advisory_xact_lock(4242)`);
        await syncContent(tx as unknown as Db, (l) => console.log(`[content sync] ${l}`));
      });
    } catch (e) {
      console.error("[content sync] failed", e);
      running = null;
    }
  })();
  return running;
}
