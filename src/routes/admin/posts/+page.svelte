<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import type { ActionResult, SubmitFunction } from "@sveltejs/kit";
    import type { PostWithMetadata } from "../../../app";
    import type { ActionData } from "./$types";
    
    let { data, form }: { data: { posts: PostWithMetadata[] }, form: ActionData } =$props();
    let posts = $state<PostWithMetadata[]>(data.posts);

    const submitFunction: SubmitFunction = (event) => {
        return async ({ result }:{result:ActionResult}) => {
            await applyAction(result);
            if(form?.success && result.type === "success"){
                posts = posts.filter((p) => p.metadata.slug !== event.formData.get("slug"));
            }
        }
    }
</script>
<h1>Posts</h1>
<p>Manage your posts here.</p>
{#if form?.success === false && form.error}
    <div class="alert alert-success">
        {form.error}
    </div>
{/if}
<li><a href="/admin/posts/create">Create New Post</a></li>
<ul>
    {#each posts as post}
        <li>
            <a href={`/admin/posts/${post.metadata.slug}`}>
                <h2>{post.metadata.title}</h2>
            </a>
        </li>
        <li>
            <a class="btn" href={`/admin/posts/${post.metadata.slug}/edit`}>
                Edit Post
            </a>
        </li>
        <li>
            <form
                action="?/deletePost"
                method="POST"
                use:enhance={(event) => submitFunction(event)}>
                <input type="hidden" name="slug" value={post.metadata.slug} />
                <button type="submit" class="btn btn-danger">Delete Post</button>
            </form>
        </li>
    {/each}
</ul>
