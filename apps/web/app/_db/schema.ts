import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const emails = pgTable('emails', {
  email: varchar('email', { length: 254 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Email = typeof emails.$inferSelect;
export type NewEmail = typeof emails.$inferInsert;
