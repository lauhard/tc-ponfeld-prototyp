<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult, type SubmitFunction } from "@sveltejs/kit";
    import type { ActionData } from "./$types";
    import { authClient } from "$lib/auth-client";
    import { goto, invalidateAll } from "$app/navigation";

    let { form }: { form: ActionData } = $props();
    let email = $state<string>("");
    let password = $state<string>("");
    let betterAuthError = $state<string | null>(null);

    const submitFunction: SubmitFunction = (event) => {
        return async ({ result }: { result: ActionResult }) => {
            await applyAction(result);
            if (result.type === "success" && result.data?.success === true) {
                // handle successful signup, e.g., redirect or show a message
                await authClient.signIn.email({
                    password,
                    email,
                },{
                    onSuccess: async (data) => {
                        await invalidateAll();
                        goto("/admin");
                    },
                    onError: async (error) => {
                        betterAuthError = error instanceof Error ? error.error.code : String(error.error.code);
                    }
                });
            }
        };
    };
</script>

<h1>Login</h1>
{#if form?.errors}
    {@render error(form?.message)}
{/if}
{#if betterAuthError}
    {@render error(betterAuthError)}
{/if}

<form action="?/login" use:enhance={submitFunction} method="POST">
    <fieldset>
        <label for="email">email</label>
        <input
            type="email"
            bind:value={email}
            name="email"
            id="email"
            required
        />
        {@render fromError(form?.errors, "email")}   
        <label for="password">Password</label>
        <input
            type="password"
            bind:value={password}
            name="password"
            id="login_password"
            autocomplete="current-password"
            required
        />
        {@render fromError(form?.errors, "password")}   
        <button type="submit">Login</button>
    </fieldset>
</form>

{#snippet error(message: string)}
    <div class="alert alert-danger">
        {message}
    </div>
{/snippet}

{#snippet fromError(errors: any, field:string)}
    {#if errors && errors[field]}
        {#each errors[field].errors as message}
            <div class="alert alert-danger">
                {message}
            </div>
        {/each}
    {/if}
{/snippet}

<style>
</style>
