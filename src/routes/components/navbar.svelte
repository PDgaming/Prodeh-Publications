<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let isHome: boolean = $state(true);

	$effect(() => {
		if ($page.url.pathname == '/') {
			isHome = true;
		} else {
			isHome = false;
		}
	});
</script>

{#if !isHome}
	<button
		onclick={() => {
			history.back();
		}}
		class="btn"
	>
		<Icon icon="ep:back" class="h-5 w-5" />
	</button>
{/if}

<a class="btn text-2xl font-bold text-yellow-950 btn-ghost" href="/">ProDeh Publications</a>
