/**
 * Seeds the initial content from /data.
 *
 *   npm run db:seed             Fill collections that are still empty (never touches existing content).
 *   npm run db:seed -- --sync   Bring content in line with /data while keeping every edit made on the
 *                               website: items nobody has edited are updated, new items are added, and
 *                               unedited items that no longer exist in /data are removed. Anything an
 *                               editor saved on the site (or created there) is left exactly as it is.
 *   npm run db:seed -- --reset  Delete ALL content first, then seed (asks no questions — careful).
 *
 * The website also runs the --sync step by itself the first time it starts with new /data content.
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { Pool } from "pg";
import { contentItems } from "../lib/db/schema";
import { buildSeed } from "../lib/cms/seed-data";
import { syncContent } from "../lib/cms/sync";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
  const sync = process.argv.includes("--sync");
  if (process.argv.includes("--reset")) {
    await db.delete(contentItems);
    console.log("! Deleted all content");
  }
  if (sync) {
    await syncContent(db, (line) => console.log(line));
  } else {
    const seed = buildSeed();
    for (const [collection, items] of Object.entries(seed)) {
      const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(contentItems).where(eq(contentItems.collection, collection));
      if (n > 0) {
        console.log(`• ${collection}: has ${n} items, skipped`);
        continue;
      }
      if (items.length === 0) continue;
      await db.insert(contentItems).values(items.map((it, i) => ({ collection, slug: it.slug, data: it.data, sort: i * 10, status: "published" as const })));
      console.log(`✔ ${collection}: ${items.length} items`);
    }
  }
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(contentItems);
  console.log(`Done — ${count} content items.`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
