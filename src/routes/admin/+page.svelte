<script lang="ts">
    import type { ExtendedUser } from "../../app";
    let { data }: { data: { user: ExtendedUser } } = $props();

</script>

<h1>Admin Page</h1>
<p>Manage your user and posts here.</p>

<nav>
    <ul>
        {#if data.user?.isAdmin === true}
            <p><strong>You have admin privileges.</strong></p>
            <li><a href="/admin/user">User Management</a></li>
            <li><a href="/admin/posts">Post Management</a></li>
        {:else}
            <p><strong>You do not have admin privileges.</strong></p>
            <li><a href="/admin/posts">Post Management</a></li>
        {/if}
        
        
    </ul>
    <ul>
        {#if data.user?.isAdmin === true}
            <li><a href="/admin/posts/create">Create New Post</a></li>
            <li><a href="/admin/user/create">Create New User</a></li>
          {:else}
             <li><a href="/admin/posts/create">Create New Post</a></li>
        {/if}
    </ul>
</nav>
