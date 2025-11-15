import { getUser } from "$lib/api/user";
import { error } from "console";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const result = await getUser();
    if(result.success) {
        return {
            user: locals.user,
            users: result.users
        };
    } else {
        error("Error loading user in admin page:", result.error);
    }
}