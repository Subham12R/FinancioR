import { pgTable, text } from "drizzle-orm/pg-core"

export const accounts = pgTable('accounts', {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("user_id").notNull(),
});
