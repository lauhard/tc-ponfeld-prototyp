import { db } from '$lib/server/db';
import { blogPost } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { sql, eq } from 'drizzle-orm';


export const GET = async ({ params }): Promise<Response | null> => {
    try {
        const slug = params.slug;
        const post = await db.select().from(blogPost).where(eq(blogPost.slug, slug)).limit(1);
        console.log('Fetched Post for slug', slug, ':', post)
        return new Response(JSON.stringify({ post: post[0] }
        ), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        error(500, "Error fetching post");
    }
};

export const DELETE = async ({ params }): Promise<Response | null> => {
    try {
        const slug = params.slug;
        const result = await db.delete(blogPost).where(eq(blogPost.slug, slug)).returning();
        console.log("Deleted Post [slug=", slug, "]: ", result);
        const response = new Response(
            JSON.stringify({}),
            {
                status: 204,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (e) {
        error(500, "Error deleting post");
    }
}

export const PUT = async ({ request, params }): Promise<Response | null> => {
    try {
        const slug = params.slug;
        const blogData = await request.json();
        const result = await db.update(blogPost).set(blogData).where(eq(blogPost.slug, slug)).returning();
        console.log("Updated Post [slug=", slug, "]: ", result);
        if (result.length === 0) {
            error(404, "No post found to update for slug: " + slug);
            return new Response(
                JSON.stringify({ error: 'Post not found' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        } else {
            return new Response(
                JSON.stringify({ post: result[0] }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
    } catch (e) {
        error(500, "Error updating post");
    }
}