export const ssr = false;
import slug from "slug";
import type { Actions, PageServerLoad } from "../$types";
import type { BlogPost, PostWithMetadata } from "../../../../../app";
import { error, redirect } from "@sveltejs/kit";
import { editPost, getPostBySlug } from "$lib/api/blog";

export const load: PageServerLoad = async ({ params, url }) => {
    let { slug } = params as { slug: string };
    let response = await getPostBySlug(slug);
    if (!response.success || !response.post) {
        throw error(404, 'Nicht gefunden');
    }
    const post = response.post[0];
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
}

export const actions: Actions = {
    updatePost: async ({ request, url }) => {
        const formData = await request.formData();
        const html = formData.get('html') as string;
        const title = formData.get('title') as string;
        const org_slug = formData.get('slug') as string;
        const new_slug = slug(title, { lower: true })
        const post = {
            title: title,
            slug: new_slug,
            html: html,
            authorId: '37b8ab71-6646-4138-ae5c-467518c58a86' // Replace with actual author ID
        }

        // write to database
        const response = await editPost(org_slug, post);
        if (response.success && response.post) {
            redirect(303, `/admin/posts/${post.slug}`);
        } else {
            return { success: false, error: response.error };
        }
    }
}

