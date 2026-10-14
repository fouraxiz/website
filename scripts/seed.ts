/**
 * Seeds the initial content from /data.
 *
 *   npm run db:seed             Fill collections that are still empty (never touches existing content).
 *   npm run db:seed -- --sync   Bring content in line with /data while keeping every edit made on the
 *                               website: items nobody has edited are updated, new items are added, and
 *                               unedited items that no longer exist in /data are removed. Anything an
 *                               editor saved on the site (or created there) is left exactly as it is.
 *   npm run db:seed -- --reset  Delete ALL content first, then seed (asks no questions — careful).
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, isNull, sql } from "drizzle-orm";
import { Pool } from "pg";
import { contentItems } from "../lib/db/schema";
import { buildSeed } from "../lib/cms/seed-data";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
  const sync = process.argv.includes("--sync");
  if (process.argv.includes("--reset")) {
    await db.delete(contentItems);
    console.log("! Deleted all content");
  }
  const seed = buildSeed();
  for (const [collection, items] of Object.entries(seed)) {
    const existing = await db
      .select({ id: contentItems.id, slug: contentItems.slug, updatedBy: contentItems.updatedBy, sort: contentItems.sort })
      .from(contentItems)
      .where(eq(contentItems.collection, collection));

    if (existing.length === 0) {
      if (items.length === 0) continue;
      await db.insert(contentItems).values(items.map((it, i) => ({ collection, slug: it.slug, data: it.data, sort: i * 10, status: "published" as const })));
      console.log(`✔ ${collection}: ${items.length} items`);
      continue;
    }
    if (!sync) {
      console.log(`• ${collection}: has ${existing.length} items, skipped`);
      continue;
    }

    const bySlug = new Map(existing.map((e) => [e.slug, e]));
    const seedSlugs = new Set(items.map((i) => i.slug));
    let updated = 0;
    let added = 0;
    let removed = 0;
    let kept = 0;
    for (const [i, it] of items.entries()) {
      const row = bySlug.get(it.slug);
      if (!row) {
        await db.insert(contentItems).values({ collection, slug: it.slug, data: it.data, sort: i * 10, status: "published" });
        added++;
      } else if (row.updatedBy === null) {
        await db.update(contentItems).set({ data: it.data, sort: i * 10, updatedAt: new Date() }).where(eq(contentItems.id, row.id));
        updated++;
      } else {
        kept++;
      }
    }
    for (const row of existing) {
      if (!seedSlugs.has(row.slug) && row.updatedBy === null) {
        await db.delete(contentItems).where(and(eq(contentItems.id, row.id), isNull(contentItems.updatedBy)));
        removed++;
      }
    }
    console.log(`↻ ${collection}: ${updated} updated, ${added} added, ${removed} removed, ${kept} kept (edited on the site)`);
  }
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(contentItems);
  console.log(`Done — ${count} content items.`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
