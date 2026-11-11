import "server-only";
import { z } from "zod";

// Schema = "contractul" pentru variabilele de mediu de care are nevoie aplicația.
const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .regex(/^postgres(ql)?:\/\//, "trebuie să înceapă cu postgresql://"),
});

// safeParse nu aruncă eroare; ne întoarce { success, data } sau { success, error }.
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(`❌ Variabile de mediu invalide:\n${problems}\nVerifică .env.local (sau setările Vercel).`);
}

// De aici încolo folosim `env.DATABASE_URL`, nu `process.env.DATABASE_URL`.
export const env = parsed.data;