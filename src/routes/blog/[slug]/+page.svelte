<script lang="ts">
  import type { PostWithMetadata } from "../../../app";
  let { data }: { data: { post: PostWithMetadata } } = $props();
</script>

<article class="prose">
  <h1>{data.post.metadata.title}</h1>
  <div class="meta">{new Date(data.post.metadata.createdAt).toLocaleString()}</div>
  <div class="content">
    {@html data.post.post}
  </div> 
</article>

<style>
  .prose { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
  .prose h1 { font-size: 2rem; line-height: 1.2; margin-bottom: .5rem; }
  .meta { color:#666; font-size:.9rem; margin-bottom:1.25rem; }
  .content :is(h2,h3){ margin-top:1.5rem; }
  .content p { line-height:1.7; margin:.75rem 0; }
  .content img { max-width:100%; height:auto; display:block; margin:1rem auto; border-radius:.5rem; }
  .content pre, .content code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  .content blockquote { border-left:4px solid #eee; padding-left:.75rem; color:#555; }
  .content ul, .content ol { padding-left:1.25rem; }
</style>
