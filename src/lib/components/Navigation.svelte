<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    import type { Route } from "$lib/routes";
    import type { User } from "better-auth";
    import type { ExtendedUser } from "../../app";
    let {
        routes,
        user,
        className,
    }: { routes: Route[]; user?: ExtendedUser | null; className?: string } =
        $props();

    const signout = async () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: async () => {
                    await invalidateAll();
                    goto("/");
                },
            },
        });
    };
</script>

<nav class={className}>
    <div class="nav-user">
        Logged in as {user?.name ?? "Guest"}
    </div>
    <ul>
        {#each routes as route}
            {#if route.public === true}
                {@render subroute(route)}
            {:else if route.public === false && user?.id}
                {#if route.group === "admin" && user?.isAdmin === true}
                    {@render subroute(route)}
                {:else if route.group !== "admin"}
                    {@render subroute(route)}
                {/if}
            {/if}
        {/each}
    </ul>

    <ul>
        {#if user}
            <li>
                <button onclick={signout}>Sign Out</button>
            </li>
        {:else}
            <li>
                <a href="/auth/login">Login</a>
            </li>
        {/if}
    </ul>
</nav>


{#snippet subroute(route: Route)}
    <li
        data-subroute={`${route.name.toLowerCase()}=${route.subRoutes?.length ? true : false}`}
    >
        <a href={route.path}>{route.name}</a>
        {#if route.subRoutes}
            <div class="sub-routes-container">
                <ul class="sub-routes sub-routes-{route.name.toLowerCase()}">
                    {#each route.subRoutes as subRoute}
                        {#if subRoute.public === true}
                            {@render subroute(subRoute)}
                        {:else if subRoute.public === false && user?.id}
                            {#if subRoute.group === "admin" && user?.isAdmin === true}
                                {@render subroute(subRoute)}
                            {:else if subRoute.group !== "admin"}
                                {@render subroute(subRoute)}
                            {/if}
                        {/if}
                    {/each}
                </ul>
            </div>
        {/if}
    </li>
{/snippet}
