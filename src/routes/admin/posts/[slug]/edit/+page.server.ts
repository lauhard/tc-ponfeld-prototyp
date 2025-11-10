export const ssr = false;
import { renderHtml } from "$lib";
import slug from "slug";
import type { Actions, PageServerLoad } from "../$types";
import type { BlogPost } from "../../../../../app";
import { error } from "@sveltejs/kit";
export const load: PageServerLoad = async ({ params, url }) => {
    console.log('Admin Post Load Params:', params);
    console.log('Admin Post Load URL:', url);
    let { slug } = params as { slug: string };
    console.log('Post Slug:', slug);
    let response = await fetch(`${url.origin}/api/post/${slug}`);
    if (response.status === 404) {
        throw error(404, 'Nicht gefunden');
    }
    let responseData = await response.json() as BlogPost;
    console.log('Loaded Post:', responseData.post.html);

    if (!responseData.post) throw error(404, 'Nicht gefunden');
    //convert date to valid html date

    return {
        post: responseData.post.html,
        metadata: {
            title: responseData.post.title,
            createdAt: new Date(responseData.post.createdAt).toISOString(),
            updatedAt: new Date(responseData.post.updatedAt).toISOString(),
            slug: slug
        }
    };
}

export const actions: Actions = {
    updatePost: async ({ request, url }) => {
        const formData = await request.formData();
        console.log('Received form data for create post', formData);
        const editor = Object.fromEntries(formData);
        console.log('Editor:', editor);
        const post = {
            title: editor.title,
            slug: slug(editor.title as string, { lower: true }),
            html: editor.html,
            markdown: editor.markdown,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            authorId: '37b8ab71-6646-4138-ae5c-467518c58a86' // Replace with actual author ID
        }

        // write to database
        const response = await fetch(`${url.origin}/api/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        if (response.status === 201) {
            return { success: true };
        } else {
            return { success: false, error: 'Failed to create post' };
        }
    }
}

