<script lang="ts">
    import type { BlogPost } from "../../app";
    let { data }:{ data: { posts: BlogPost[]}} = $props();
</script>

<h1>Blog</h1>
<ul>
    {#each data.posts as post}
        <li>
            <a href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
            </a>
        </li>
    {/each}
</ul>