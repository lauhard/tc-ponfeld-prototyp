import type { BlogPost } from "../../../app";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad   = async ({request, fetch}) => {
    const response = await fetch('/api/post');
    const { posts } = await response.json();
    console.log('Loaded posts for admin:', posts);
    return {
        posts: posts as BlogPost[]
    };
};
