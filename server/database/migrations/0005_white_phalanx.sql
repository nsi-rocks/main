PRAGMA defer_foreign_keys = on;

CREATE TABLE `ateliers` (
	`id` text PRIMARY KEY NOT NULL,
	`titre` text NOT NULL,
	`description` text,
	`max` integer NOT NULL,
	`jours` text NOT NULL,
	`isExcluding` integer DEFAULT false,
	`isCine` integer DEFAULT false
);


CREATE TABLE `__new_langues` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`a1choix` integer NOT NULL,
	`a1jour` integer NOT NULL,
	`a2choix` integer NOT NULL,
	`created_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`a1choix`) REFERENCES `ateliers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`a2choix`) REFERENCES `ateliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_langues`("id", "user_id", "a1choix", "a1jour", "a2choix", "created_at") SELECT "id", "user_id", "a1choix", "a1jour", "a2choix", "created_at" FROM `langues`;--> statement-breakpoint
DROP TABLE `langues`;--> statement-breakpoint
ALTER TABLE `__new_langues` RENAME TO `langues`;--> statement-breakpoint
PRAGMA defer_foreign_keys = off;
CREATE UNIQUE INDEX `langues_user_id_unique` ON `langues` (`user_id`);