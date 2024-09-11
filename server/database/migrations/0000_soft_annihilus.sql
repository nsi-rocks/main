CREATE TABLE `logs` (
	`id` text PRIMARY KEY NOT NULL,
	`logType` text NOT NULL,
	`logData` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`teacher` integer NOT NULL,
	`birthdate` text NOT NULL,
	`created_at` text,
	`classes` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_firstName_unique` ON `users` (`firstName`);