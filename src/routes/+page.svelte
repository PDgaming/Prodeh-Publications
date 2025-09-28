<script lang="ts">
	let data = $props();
</script>

<div class="bg-base-200 prose prose-lg max-w-none rounded-xl pb-1">
	<ul>
		{#each data.data.bookNames as book}
			<li class="cursor-pointer border-b pb-3">
				<a
					href="/{book.replaceAll(' ', '_')}"
					class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
				>
					{book}
				</a>
			</li>
		{/each}
	</ul>
</div>
