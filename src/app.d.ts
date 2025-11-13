// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface BlogPost {
			title: string;
			slug: string;
			html: string;
			markdown: string;
			createdAt: number;
			updatedAt: number;
			authorId: string;
		}
		interface User {
			id: string;
			username: string;
			email: string;
			createdAt: number;
			updatedAt: number;
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

export { BlogPost, User, PostWithMetadata };
