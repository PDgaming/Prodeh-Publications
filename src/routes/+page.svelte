<script lang="ts">
	import { onMount } from 'svelte';

	let data = $props();
</script>

<div class="bg-base-200 prose prose-lg max-w-none rounded-xl pb-1">
	<ul>
		{#each data.data.bookNames as books}
			{console.log(books)}
			<li class="cursor-pointer border-b pb-3">
				<a
					href="/{books.replaceAll(' ', '-')}"
					class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
				>
					{books}
				</a>
			</li>
		{/each}
	</ul>
</div>
