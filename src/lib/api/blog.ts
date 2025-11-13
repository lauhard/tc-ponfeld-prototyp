import { db } from "$lib/server/db";
import { blogPost } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
import type { BlogPost } from "../../app";

export const createPost = async (postData: BlogPost): Promise<{ success: boolean, post?: BlogPost, error?:string}> =>{
    try {
        const post: BlogPost[] = await db.insert(blogPost).values(postData).returning();
        return {
            success: true,
            post: post[0]
        }
    } catch (e: any) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Error creating post"
        }
    }
};

export const getPosts = async (): Promise<{success: boolean, posts?: BlogPost[], error?: string}> => {
    try{
        const posts: BlogPost[] = await db.select().from(blogPost).orderBy(sql`${blogPost.createdAt} desc`);
        return {
            success: true,
            posts: posts
        }
    } catch(e: any) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Error fetching posts'
        }
    }
};

export const getPostBySlug = async (slug: string): Promise<{success: boolean, post?: BlogPost, error?:string}> => {
    try {
        const post: BlogPost[]= await db.select().from(blogPost).where(eq(blogPost.slug, slug)).limit(1);
        if(post && post.length > 0) {

            return {
                success: true,
                post: post
            }
        } else { 
            return {
                success: false,
                error: 'Post not found with slug: ' + slug
            }
        }
    } catch(e: any) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Error fetching post"
        }
    }
}

export const deletePost = async (slug: string): Promise<{ success:boolean, post?: BlogPost, error?:string }> => {
    try {
        console.log("Deleting post with slug:", slug);
        const res: BlogPost[] = await db.delete(blogPost).where(eq(blogPost.slug, slug)).limit(1).returning();
       console.log("Delete post with slug:", slug, "Result:", res);
        if (res.length > 0 && res) {
            return {
                success: true,
                post:  res[0]
            };
        }
        else {
            return {
                success: false,
                error: "Error deleting post with slug: " + slug
            }
        }
    } catch (e: any) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Error deleting post"
        };
    }
};

export const editPost = async (slug: string, postData: Partial<BlogPost>): Promise<{ success:boolean, post?: BlogPost, error?:string }> => {
    try {
        console.log("Editing post with slug:", slug, "Data:", postData);
        const res: BlogPost[] = await db.update(blogPost).set({...postData, updated_at: new Date()}).where(eq(blogPost.slug, slug)).returning();
        if (res.length > 0 && res) {
            return {
                success: true,
                post:  res[0]
            };
        }
        else {
            return {
                success: false,
                error: "Error updating post with slug: " + slug
            }
        }
    } catch (e: any) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Error updating post"
        };
    }
}
         