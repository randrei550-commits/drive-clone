import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit rulează în terminal, în afara Next.js, deci nu citește singur .env.local.
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts", // aici vom defini tabelele (pasul 4)
  out: "./drizzle",             // aici se generează fișierele de migrare (SQL)
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});