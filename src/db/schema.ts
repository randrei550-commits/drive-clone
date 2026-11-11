import {
  pgTable,
  pgEnum,
  uuid,
  text,
  bigint,
  timestamp,
  index,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

// Enum în Postgres: coloana acceptă DOAR aceste valori.
export const fileStatus = pgEnum("file_status", ["pending", "ready"]);

export const folders = pgTable(
  "folders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // FK către `user` vine la T3, când Better Auth creează tabelul.
    ownerId: text("owner_id").notNull(),
    // NULL = folder în root. Referință către același tabel (arbore).
    parentId: uuid("parent_id").references((): AnyPgColumn => folders.id, {
      onDelete: "cascade",
    }),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("folders_owner_parent_idx").on(t.ownerId, t.parentId)],
);

export const files = pgTable(
  "files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: text("owner_id").notNull(),
    // NULL = fișier în root.
    folderId: uuid("folder_id").references(() => folders.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    mimeType: text("mime_type").notNull(),
    // Cheia obiectului în R2: `{userId}/{fileId}`.
    storageKey: text("storage_key").notNull().unique(),
    status: fileStatus("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("files_owner_folder_idx").on(t.ownerId, t.folderId)],
);