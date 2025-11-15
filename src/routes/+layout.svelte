<script lang="ts">
	import '../main.css';
	import favicon from '$lib/assets/favicon.svg';
    import Navigation from '$lib/components/Navigation.svelte';
	import { mainRoutes } from '$lib/routes';
    import { setUserState } from '$lib/state/user.svelte';
    import type { Snippet } from 'svelte';
    import type { ExtendedUser } from '../app';
	let { data, children }:{ data: { user: ExtendedUser}, children: Snippet} = $props();
	
	$effect(() => {
		setUserState(data.user);
	});
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="app">
	<main>
		<Navigation routes={mainRoutes} user={data.user} className="main-nav" />
		{@render children()}
	</main>
</div>
