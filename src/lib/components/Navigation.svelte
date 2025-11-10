<script lang="ts">
    import type { Route } from "$lib/routes";

    let { routes, className }: { routes: Route[]; className?: string } = $props();
</script>

<nav class="{className}">
    <ul>
        {#each routes as route}
            <li data-subroute={route.subRoutes?.length ? true : false}><a href="{route.path}">{route.name}</a> 
                {#if route.subRoutes}
                    <div class="sub-routes-container">
                        <ul class="sub-routes sub-routes-{route.name.toLowerCase()}">
                            {#each route.subRoutes as subRoute}
                                <li><a href="{subRoute.path}">{subRoute.name}</a></li>
                            {/each}
                        </ul>
                    </div>
                {/if}
           </li>
        {/each}
    </ul>
</nav>