export const ssr=false;
import { renderHtml } from "$lib";
import slug from "slug";
import type { Actions, PageServerLoad } from "../$types";
import { redirect } from "@sveltejs/kit";
export const load:PageServerLoad = async ()=>{
}

export const actions: Actions =  {
    createPost: async ({ request, url }) => {
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
        if(response.status === 201){
            redirect(303, `/admin/posts/${post.slug}`);
           // return { success: true };
        } else {
            return { success: false, error: 'Failed to create post' };
        }
    }
}

