/**
 * Seeds initial content. Only fills collections that are still empty, so it
 * never overwrites edits made on the website. Usage: npm run db:seed
 * Pass --reset to delete ALL content first (asks no questions — careful).
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { Pool } from "pg";
import { contentItems } from "../lib/db/schema";
import { buildSeed } from "../lib/cms/seed-data";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
  if (process.argv.includes("--reset")) {
    await db.delete(contentItems);
    console.log("! Deleted all content");
  }
  const seed = buildSeed();
  for (const [collection, items] of Object.entries(seed)) {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(contentItems).where(eq(contentItems.collection, collection));
    if (count > 0) {
      console.log(`• ${collection}: has ${count} items, skipped`);
      continue;
    }
    if (items.length === 0) continue;
    await db.insert(contentItems).values(items.map((it, i) => ({ collection, slug: it.slug, data: it.data, sort: i * 10, status: "published" as const })));
    console.log(`✔ ${collection}: ${items.length} items`);
  }
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
