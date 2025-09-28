<script lang="ts">
	let data = $props();
</script>

<div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
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

<style>
	.prose {
		min-height: calc(100vh - 125px);
	}
	li:first-child {
		padding-top: 10px;
	}
</style>
