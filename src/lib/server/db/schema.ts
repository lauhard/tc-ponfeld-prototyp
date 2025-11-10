import { date } from 'drizzle-orm/mysql-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
});

export const blogPost = sqliteTable('blog_post', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	markdown: text('markdown'),
	html: text('html'),
	createdAt: date('created_at').notNull(),
	updatedAt: date('updated_at').notNull(),
	authorId: text('author_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});