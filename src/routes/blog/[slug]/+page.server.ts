import { getPostBySlug } from "$lib/api/blog";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostWithMetadata } from "../../../app";

export const load: PageServerLoad = async ({ params }) => {
    let { slug } = params as { slug: string };
    let response = await getPostBySlug(slug);
    if (!response.success || !response.post) {
        throw error(404, 'Nicht gefunden');
    }
    let post = response.post[0];
    let postWithMeta: PostWithMetadata | undefined = {
        post: post.html as string,
        metadata: {
            title: post.title as string,
            createdAt: new Date(post.createdAt).toISOString(),
            updatedAt: new Date(post.updatedAt).toISOString(),
            slug: post.slug as string
        }
    };
    return {
        post: postWithMeta
    };
};