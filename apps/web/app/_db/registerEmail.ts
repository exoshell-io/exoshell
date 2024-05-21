'use server';

import { db } from './index';
import { emails } from './schema';

export async function registerEmail(email: string) {
  await db
    .insert(emails)
    .values({
      email,
    })
    .onConflictDoNothing()
    .returning();
}
