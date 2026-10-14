import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { pool?: Pool };

export const hasDatabase = Boolean(process.env.DATABASE_URL);

function createPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });
}

const pool = hasDatabase ? (globalForDb.pool ?? createPool()) : undefined;
if (pool && process.env.NODE_ENV !== "production") globalForDb.pool = pool;

/** Drizzle client. Only use after checking `hasDatabase`. */
export const db = pool ? drizzle(pool, { schema }) : (undefined as unknown as ReturnType<typeof drizzle<typeof schema>>);
export { schema };
