import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type User = typeof schema.users.$inferSelect
export type Log = typeof schema.logs.$inferSelect
export type Langue = typeof schema.langues.$inferSelect
export type Atelier = typeof schema.ateliers.$inferSelect
