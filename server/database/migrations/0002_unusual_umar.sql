CREATE TABLE `langues` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`a1choix` text NOT NULL,
	`a1jour` text NOT NULL,
	`a2choix` text NOT NULL,
	`timestamp` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `langues_user_id_unique` ON `langues` (`user_id`);