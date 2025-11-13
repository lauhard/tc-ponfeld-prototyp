import { getPostBySlug, getPosts } from "$lib/api/blog";
import { error } from "console";
import type { PageServerLoad } from "./$types";
import type { PostWithMetadata } from "../../app";


export const load: PageServerLoad = async ({ params }) => {
    let response = await getPosts();
    if (!response.success) {
        throw error(404, 'Nicht gefunden');
    }

    let postsWithMeta: PostWithMetadata[] | undefined = [];
    if(response.posts && response.posts?.length >0) {
        postsWithMeta = response.posts?.map(post => {
            return {
                post: post.html as string,
                metadata: {
                    title: post.title as string,
                    createdAt: new Date(post.createdAt).toISOString(),
                    updatedAt: new Date(post.updatedAt).toISOString(),
                    slug: post.slug as string
                }
            }
        })
    }
    return {
        posts: postsWithMeta
    };
};