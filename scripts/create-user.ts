/**
 * Creates (or resets the password of) a user who can edit the website.
 * Usage: npm run user:create -- <email> <password> "<Full name>" [admin|editor]
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { users } from "../lib/db/schema";

async function main() {
  const [email, password, name = "Administrator", role = "admin"] = process.argv.slice(2);
  if (!email || !password) throw new Error('Usage: npm run user:create -- <email> <password> "<Full name>" [admin|editor]');
  if (password.length < 10) throw new Error("Use a password of at least 10 characters");
  if (role !== "admin" && role !== "editor") throw new Error("Role must be admin or editor");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
  const passwordHash = await bcrypt.hash(password, 12);
  await db
    .insert(users)
    .values({ email: email.toLowerCase(), name, passwordHash, role })
    .onConflictDoUpdate({ target: users.email, set: { passwordHash, name, role, active: true } });
  await pool.end();
  console.log(`✔ ${role} ${email} ready`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
