<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ExtendedUser } from "../../../app";
    let {
        data,
        children,
    }: { data: { user: ExtendedUser }; children: Snippet } = $props();
</script>

{@render children()}
