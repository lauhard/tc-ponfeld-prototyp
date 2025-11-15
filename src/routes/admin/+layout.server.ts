import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    console.log("Admin Layout load - user:", locals.user);
    if (locals.user == null || locals.user === undefined) {
        redirect(303, "/auth/login");
    }
    return {
        user: locals.user
    };
}