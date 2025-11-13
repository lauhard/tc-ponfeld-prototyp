<script lang="ts">
    import type { PostWithMetadata } from "../../app";
    let { data }:{ data: { posts: PostWithMetadata[]}} = $props();
</script>

<h1>Blog</h1>
<ul>
    {#each data.posts as post}
        <li>
            <a href={`/blog/${post.metadata.slug}`}>
                <h2>{post.metadata.title}</h2>
            </a>
        </li>
    {/each}
</ul>