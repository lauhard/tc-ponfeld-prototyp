import { db } from "$lib/server/db"
import { user } from "$lib/server/db/schema"
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    const userData = await request.json();
    console.log('Received user data:', userData);
    await db.insert(user).values(userData);
    const response = new Response("user created", { status: 201 });
    return response;
}

export const GET: RequestHandler = async () => {
    const users = await db.select().from(user);
    console.log('Fetched users:', users);
    const response = new Response(
        JSON.stringify(users),
        { 
            status: 200,
            headers: { 'Content-Type': 'application/json' } 
        }
    )
    return response;
}