<script lang="ts">
    import type { BlogPost } from '../../../app';

    let { data }: { data: { posts: BlogPost[] } } = $props();
    const posts = data?.posts ?? [];

    console.log('Posts (client):', posts);
</script>
<h1>Posts</h1>
<p>Manage your posts here.</p>
<li><a href="/admin/posts/create">Create New Post</a></li>
<ul>
    {#each posts as post}
        <li>
            <a href={`/admin/posts/${post.slug}`}>
                <h2>{post.title}</h2>
            </a>
        </li>
        <li>
            <a href={`/admin/posts/${post.slug}/edit`}>
                Edit Post
            </a>
        </li>
    {/each}
</ul>