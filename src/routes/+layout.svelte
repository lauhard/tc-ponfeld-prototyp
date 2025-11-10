<script lang="ts">
	import '../main.css';
	import favicon from '$lib/assets/favicon.svg';
    import Navigation from '$lib/components/Navigation.svelte';
	import { mainRoutes } from '$lib/routes';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="app">
	<main>
		<Navigation routes={mainRoutes} className="main-nav" />
		{@render children()}
	</main>
</div>
