import { auth } from "$lib/auth";
import { building } from "$app/environment";
import { svelteKitHandler } from "better-auth/svelte-kit";
export const handle = async ({ event, resolve }) => {
    // You can add custom logic here, e.g., logging, authentication, etc.
    console.log(`Received request for ${event.url.pathname}`);
    const session = await auth.api.getSession({
        headers: event.request.headers
    });
    if(session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }
    return svelteKitHandler({ event, resolve, auth, building });
}