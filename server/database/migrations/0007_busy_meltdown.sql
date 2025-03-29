PRAGMA defer_foreign_keys = on;
CREATE TABLE `__new_ateliers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titre` text NOT NULL,
	`description` text,
	`max` integer NOT NULL,
	`jours` text NOT NULL,
	`isExcluding` integer DEFAULT false,
	`isCine` integer DEFAULT false
);
--> statement-breakpoint
INSERT INTO `__new_ateliers`("id", "titre", "description", "max", "jours", "isExcluding", "isCine") SELECT "id", "titre", "description", "max", "jours", "isExcluding", "isCine" FROM `ateliers`;--> statement-breakpoint
DROP TABLE `ateliers`;--> statement-breakpoint
ALTER TABLE `__new_ateliers` RENAME TO `ateliers`;--> statement-breakpoint
PRAGMA defer_foreign_keys = off;