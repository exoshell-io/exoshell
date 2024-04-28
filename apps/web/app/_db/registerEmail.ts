'use server';

import { db } from './index';
import { emails } from './schema';

export async function registerEmail(email: string) {
  console.log(process.env.POSTGRES_URL);
  await db
    .insert(emails)
    .values({
      email,
    })
    .onConflictDoNothing()
    .returning();
}
