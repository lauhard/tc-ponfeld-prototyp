<script lang="ts">
    import { getUserState } from "$lib/state/user.svelte";
    import type { User } from "better-auth";
    import type { ExtendedUser } from "../../../app";
    let { data }: { data: { users: User[], user: ExtendedUser } } = $props();
    let users = $state<User[]>(data.users);
    console.log("Current user in +page.svelte:", data.user);
</script>
<h1>User Management</h1>
<p>Manage your users here.</p>
{#if data.user?.isAdmin === true}
    <p><strong>You have admin privileges.</strong></p>
    <li><a href="/admin/user/create">Create New User</a></li>
{:else}
    <p><strong>You do not have admin privileges.</strong></p>
{/if}
<ul>
    {#each users as usr}
        <li>
            <h2>{usr.name} ({usr.email})</h2>
        </li>
    {/each}
</ul>