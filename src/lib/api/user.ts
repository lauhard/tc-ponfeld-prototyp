import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import type { User } from "../../app";

export const createUser = async (userData: User): Promise<{ success: boolean, newUser?: User, error?:string }> => {
    try{
        const newUser: User[] = await db.insert(user).values(userData).returning();
        return {
            "success": true,
            "newUser": newUser[0]
        };
    } catch(e: any) {
        return {
            "success": false,
            "error": e instanceof Error ? e.message : "Error creating user"
        }
    }
};

