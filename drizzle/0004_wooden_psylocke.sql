CREATE TABLE `blog_post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`markdown` text,
	`html` text,
	`created_at` date NOT NULL,
	`updated_at` date NOT NULL,
	`author_id` text NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_post_slug_unique` ON `blog_post` (`slug`);