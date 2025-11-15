import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    user: {
       additionalFields: {
          isAdmin: {
            type: "boolean",
            input: true,
            defaultValue: false,
          } 
        }
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: false
    },
    plugins: [
      sveltekitCookies(getRequestEvent) // make sure that cookies are properly set when calling signIn/signOut
    ]
  //...
});