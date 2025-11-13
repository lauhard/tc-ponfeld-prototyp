import { deletePost, getPosts } from "$lib/api/blog.js";
import { error } from "@sveltejs/kit";
import type { BlogPost, PostWithMetadata } from "../../../app";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad   = async ({ locals }) => {
    //TODO: get auth user from locals
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

export const actions =  {
    deletePost: async ({request}) => {
        const formData = await request.formData();
        const slug = formData.get("slug");
        const response= await deletePost(slug as string);
        console.log("Delete post action result:", response);
        if(response.success && response.post){
            return { 
                success: response.success,
                message: 'Post deleted successfully',
                slug: response.post.slug
            };
        }
        return { success: response.success, error: 'Post could not be deleted' };
    }
} satisfies Actions