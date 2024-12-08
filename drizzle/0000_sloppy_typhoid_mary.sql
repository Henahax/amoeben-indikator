CREATE TABLE `entr` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text DEFAULT (CURRENT_TIMESTAMP),
	`value` real DEFAULT 0,
	`name` text NOT NULL,
	`description` text NOT NULL
);
