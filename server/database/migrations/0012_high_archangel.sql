ALTER TABLE `langues` ADD `assignJ1atelier` integer REFERENCES ateliers(id);--> statement-breakpoint
ALTER TABLE `langues` ADD `assignJ2atelier` integer REFERENCES ateliers(id);--> statement-breakpoint
ALTER TABLE `langues` ADD `assignJ1jour` integer;--> statement-breakpoint
ALTER TABLE `langues` ADD `assignJ2jour` integer;