PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`markdown` text,
	`html` text,
	`created_at` date NOT NULL,
	`updated_at` date NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blog_post`("id", "title", "slug", "markdown", "html", "created_at", "updated_at") SELECT "id", "title", "slug", "markdown", "html", "created_at", "updated_at" FROM `blog_post`;--> statement-breakpoint
DROP TABLE `blog_post`;--> statement-breakpoint
ALTER TABLE `__new_blog_post` RENAME TO `blog_post`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_post_slug_unique` ON `blog_post` (`slug`);