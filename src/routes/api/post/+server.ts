import { db } from '$lib/server/db';
import { blogPost } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';

export const POST = async ({ request }): Promise<Response | null> => {
    try {
        const postData = await request.json();
        console.log('Received Post Data:', postData)
        const result = await db.insert(blogPost).values(postData).returning();
        console.log('Inserted Post:', result);
        if (result.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Failed to create post' }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        } else {
            return new Response(JSON.stringify(result), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (e) {
        error(500, "Error creating post");
    }
}

export const GET = async (): Promise<Response> => {
    try {
        const posts = await db.select().from(blogPost).orderBy(sql`${blogPost.createdAt} desc`);
        console.log('Fetched Posts:', posts)
        if (posts.length === 0) {
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
            return new Response(JSON.stringify(
                {
                    posts: posts
                }
            ), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (e) {
        error(500, 'Error fetching posts:');
    }
};
