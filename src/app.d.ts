// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session } from "better-auth";
import type { User } from "better-auth";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session,
			user: ExtendedUser
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface ExtendedUser extends User {
			isAdmin: boolean;
		}
		interface BlogPost {
			title: string;
			slug: string;
			html: string;
			markdown: string;
			createdAt: number;
			updatedAt: number;
			authorId: string;
		}
		interface PostWithMetadata {
			post: string;
			metadata: {
				title: string;
				createdAt: Date;
				updatedAt: Date;
				slug: string;
			}
		}
	}
}

export { BlogPost, ExtendedUser, PostWithMetadata };
