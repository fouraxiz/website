import { sql } from "drizzle-orm";
import { db, hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Liveness/readiness check for Docker and uptime monitors. */
export async function GET() {
  try {
    if (hasDatabase) await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: hasDatabase });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
