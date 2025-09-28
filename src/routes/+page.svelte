<script lang="ts">
	let data = $props();
	const books = data.data.bookNames;
</script>

{#if books != undefined}
	<div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
		<ul>
			{#each books as book}
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
{:else}
	<p>There was an error loading the books...</p>
{/if}

<style>
	.prose {
		min-height: calc(100vh - 125px);
	}
	li:first-child {
		padding-top: 10px;
	}
</style>
