<script lang="ts">
    import { onMount } from "svelte";
    import Quill from "quill";
    import DOMPurify from "dompurify";
    import "quill/dist/quill.snow.css";
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import type { BlogPost, PostWithMetadata } from "../../../../../app";
    import type { ActionData } from "./$types";

    let { data, form }: { data: { post: PostWithMetadata }, form: ActionData } = $props();

    let title = $state(data.post.metadata.title);
    let html = $state<string>("");
    let urlInput = $state("https://picsum.photos/200/300");

    let quill: Quill;
    let editorEl!: HTMLDivElement;
    let sanitize = $state<(s: string) => string>((s) => s);

    // live refresh
    function refresh() {
        if (!quill) return;
        html = quill.root.innerHTML;
    }

    onMount(() => {
        if (browser && window) {
            quill = new Quill(editorEl, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image", "code-block"], // removed "image"
                        ["clean"],
                    ],
                },
            });
            sanitize = (s) => DOMPurify.sanitize(s);

            // Change Toolbar Image-Handler:
            const toolbar = quill.getModule("toolbar");
            //toolbar.addHandler("image", (event) => {
            //    console.log("Custom image handler triggered", event);
            //    
            //	
            //});
            quill.root.innerHTML = data.post.post;
            refresh();
            quill.on("text-change", refresh);
        }
    });


    function insertImgByUrl(
        url: string,
        opts: { alt?: string; loading?: "lazy" | "eager" | "auto" } = {}
    ) {
        if (!quill) return;
        const index = quill.getSelection(true)?.index ?? quill.getLength();
        quill.insertEmbed(index, "image", url, "user"); // ergibt <img src="url">
        quill.setSelection(index + 1);
        // optionale Attribute setzen (dank erweitertem Blot)
        if (opts.alt) quill.formatText(index, 1, "alt", opts.alt);
        quill.formatText(index, 1, "loading", opts.loading ?? "lazy");
        refresh();
    }

    //function insertRawImgTag(url: string, alt = "") {
    //    if (!quill) return;
    //    const index = quill.getSelection(true)?.index ?? quill.getLength();
    //    const safeAlt = alt.replace(/"/g, "&quot;"); // kleine Absicherung
    //    const snippet = `<img src="${url}" alt="${safeAlt}" loading="lazy" decoding="async">`;
    //    quill.clipboard.dangerouslyPasteHTML(index, snippet, "user");
    //    quill.setSelection(index + 1);
    //    refresh();
    //}

    function insertFromInput(e: Event) {
        e.preventDefault();
        if (!urlInput.trim()) return;
        insertImgByUrl(urlInput.trim(), { loading: "lazy" });
        urlInput = "";
    }
</script>

<h1>Edit Post</h1>

<form onsubmit={insertFromInput} class="url-insert">
    <input placeholder="" bind:value={urlInput} type="url" required />
    <button type="submit">Bild per URL einfügen</button>
</form>
    {#if form?.success === false}
        <p class="error">Error: {form.error}</p>
    {/if}
    <form action="?/updatePost" method="POST" use:enhance>
        <label for="title">Post Name</label>
        <input name="title" type="text" bind:value={title} placeholder="blog post name" required />
        <div id="editor" bind:this={editorEl} class="editor"></div>
        <input type="hidden" name="slug" value={data.post.metadata.slug} />
        <input name="html" type="hidden" bind:value={html} />
        <button type="submit">Edit Post</button>
    </form>

<section class="preview">
    <h2>{title}</h2>
    <article class="prose content">{@html sanitize(html)}</article>
</section>

<style>
    #editor {
        min-height: 260px;
    }
    .preview {
        margin: 0 auto;
        max-width: 800px;
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 1px solid #e5e7eb;
    }

    /*Style editor */
    .content :global(img) {
        border-radius: 10px;
    }

    /*Style editor */
    #editor :global(img) {
        border-radius: 10px;
    }
</style>
