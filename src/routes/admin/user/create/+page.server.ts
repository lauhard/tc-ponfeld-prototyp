import { createUser } from "$lib/api/user.js";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ()=>{
}

export const actions =  {
    createUser: async ({ request, url }) => {
        const formData = await request.formData();
        const user = Object.fromEntries(formData);
        // write to database
        const response = await createUser(user);
        if(response.success && response.newUser){
            return { 
                success: response.success,
                message: 'User created successfully',
                user: response.newUser
            };
        }
        return { success: response.success, error: response.error || 'User could not be created' };
    }
}