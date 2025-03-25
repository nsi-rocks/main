import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  user: text('user').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  teacher: integer('teacher', { mode: 'boolean' }).notNull(),
  birthdate: text('birthdate').notNull(),
  createdAt: text('created_at').$defaultFn(() => Date.now().toString()),
  classes: text('classes').notNull(),
})

export const logs = sqliteTable('logs', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  logType: text('logType', { enum: ['login', 'first-login'] }).notNull(),
  logData: text('logData').notNull(),
  timestamp: text('created_at').$defaultFn(() => Date.now().toString()),
})

// export const langues = sqliteTable('langues', {
//   id: text('id').primaryKey().$defaultFn(() => createId()),
//   userId: text('user_id').references(() => users.id).unique().notNull(),
//   atelier1: text('atelier1').notNull(),
//   atelier2: text('atelier2').notNull(),
//   timestamp: text('timestamp').$defaultFn(() => Date.now().toString()),
// })