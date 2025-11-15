import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { signupSchema } from "$lib/schema/auth";
import z from "zod";

export const load: PageServerLoad = async ({ request, locals, params }) => {
    return {};
}

export const actions: Actions = {
    signup: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get("name")?.toString() ?? "";
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";
        // Validate input;
        const result = await signupSchema.safeParseAsync({ name, email, password });
        if (!result.success) {
            return {
                success: false,
                message: 'Validation failed',
                errors: z.treeifyError(result.error)?.properties
            }   // ZodError instance
        } else {
            return {
                message: 'Signup successful',
                success: true,
            }
        }

    }
};
