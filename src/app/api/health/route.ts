import { connection } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { folders } from "@/db/schema";

export async function GET() {
  // Spune-i lui Next să ruleze asta la fiecare request, nu o singură dată la build.
  await connection();

  // SELECT count(*) FROM folders
  const [result] = await db.select({ value: count() }).from(folders);

  return Response.json({ ok: true, folders: result.value });
}