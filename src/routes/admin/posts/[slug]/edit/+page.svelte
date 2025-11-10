<script lang="ts">
    import { onMount } from "svelte";
    import Quill from "quill";
    import DOMPurify from "dompurify";
    import "quill/dist/quill.snow.css";
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import type { BlogPost } from "../../../../../app";

    let { data }: { data: { post: BlogPost, metadata: { title: string; createdAt: string; updatedAt: string, slug: string } } } = $props();

    let title = $state("Tennisturnier 2025");
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
                        ["link", "code-block"], // removed "image"
                        ["clean"],
                    ],
                },
            });
            sanitize = (s) => DOMPurify.sanitize(s);

            // Change Toolbar Image-Handler:
            const toolbar = quill.getModule("toolbar");
            //toolbar.addHandler("image", () => {
            //	const url = prompt("Bild-URL einfügen (https://...)");
            //	if (url) insertImgByUrl(url);
            //});
            quill.root.innerHTML = data.post;
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

<!-- einfache URL-Eingabe: fügt ein <img src="..."> ohne base64 ein -->
<form onsubmit={insertFromInput} class="url-insert">
    <input placeholder="" bind:value={urlInput} type="url" required />
    <button type="submit">Bild per URL einfügen</button>
</form>

    <form action="?/createPost" method="POST" use:enhance>
        <div id="editor" bind:this={editorEl} class="editor"></div>

        <input name="title" type="text" bind:value={title} placeholder="Post Title" required />
        <input name="html" type="hidden" bind:value={html} />
        <button type="submit">Create Post</button>
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
