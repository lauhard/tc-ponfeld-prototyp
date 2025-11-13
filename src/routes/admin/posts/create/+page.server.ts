export const ssr=false;
import slug from "slug";
import type { Actions, PageServerLoad } from "../$types";
import { redirect } from "@sveltejs/kit";
import { createPost } from "$lib/api/blog";
export const load:PageServerLoad = async ()=>{
}

export const actions: Actions =  {
    createPost: async ({ request, url }) => {
        const formData = await request.formData();
        const html = formData.get('html') as string;
        const title = formData.get('title') as string;
        const _slug = slug(title, { lower: true });
        const post = {
            title: title,
            slug: _slug,
            html: html,
            markdown: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            authorId: '37b8ab71-6646-4138-ae5c-467518c58a86' // Replace with actual author ID
        }
        
        // write to database
        const response = await createPost(post);
        console.log("Create post action response:", response);
        if(response.success && response?.post){
            redirect(303, `/admin/posts`);
        } else {
            return { success: false, error: response.error };
        }
    }
}

