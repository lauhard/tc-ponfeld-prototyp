import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import type { User } from "better-auth";

export const getUser = async (): Promise<{ success: boolean, users?: User[], error?:string }> => {
    try {
        const result: User[] = await db.select().from(user);
        return {
            "success": true,
            "users": result
        };
    } catch (e: any) {
        return {
            "success": false,
            "error": e instanceof Error ? e.message : "Error fetching user"
        };
    }
};

