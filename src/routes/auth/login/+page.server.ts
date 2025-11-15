import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { loginSchema, signupSchema } from "$lib/schema/auth";
import z from "zod";

export const load: PageServerLoad = async ({ request, locals, params }) => {
    return {};
}

export const actions: Actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";
        // Validate input;
        const result = await loginSchema.safeParseAsync({ email, password });
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
