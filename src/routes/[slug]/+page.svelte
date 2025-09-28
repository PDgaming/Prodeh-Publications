<script lang="ts">
	import { onMount } from 'svelte';

	let data = $props();

	onMount(() => {
		console.log(data.data);
	});
</script>

<div class="bg-base-200 prose prose-lg max-w-none rounded-xl pb-1">
	<ul>
		{#each data.data.chapters as chapter}
			<li class="cursor-pointer border-b pb-3">
				<a
					href="/{chapter.bookPath.replaceAll(' ', '_')}"
					class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
				>
					{chapter.chapterName}
				</a>
			</li>
		{/each}
	</ul>
</div>
