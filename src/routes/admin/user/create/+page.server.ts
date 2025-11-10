import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ()=>{
}

export const actions =  {
    createUser: async ({ request, url }) => {
        const formData = await request.formData();
        const user = Object.fromEntries(formData);
        console.log('Form Data:', user);
        // write to database
        const response = await fetch(`${url.origin}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if(response.status === 201){
            return { success: true };
        } else {
            return { success: false, error: 'Failed to create user' };
        }
    }
}