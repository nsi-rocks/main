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
  logType: text('logType', { enum: ['login', 'first-login', 'langues'] }).notNull(),
  logData: text('logData').notNull(),
  userId: text('user_id').references(() => users.id),
  timestamp: text('created_at').$defaultFn(() => Date.now().toString()),
})

export const langues = sqliteTable('langues', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).unique().notNull(),
  a1choix: integer('a1choix').references(() => ateliers.id).notNull(),
  a1jour: integer('a1jour').notNull(),
  a2choix: integer('a2choix').references(() => ateliers.id).notNull(),
  commentaire: text('commentaire'),
  timestamp: text('created_at').$defaultFn(() => Date.now().toString()),
  toReset: integer('toReset', { mode: 'boolean' }).default(false),
  assignJ1atelier: integer('assignJ1atelier').references(() => ateliers.id),
  assignJ2atelier: integer('assignJ2atelier').references(() => ateliers.id),
  assignJ1jour: integer('assignJ1jour'),
  assignJ2jour: integer('assignJ2jour'),
})

export const ateliers = sqliteTable('ateliers', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  titre: text('titre').notNull(),
  description: text('description'),
  max: integer('max').notNull(),
  jours: text('jours', { mode: 'json' }).$type<number[]>().notNull(),
  isExcluding: integer('isExcluding', { mode: 'boolean' }).default(false),
  isCine: integer('isCine', { mode: 'boolean' }).default(false),
})

export const help = sqliteTable('help', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  eleve: text('eleve'),
  message: text('message'),
  date: text('date').$defaultFn(() => Date.now().toString()),
})
